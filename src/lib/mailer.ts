import nodemailer from "nodemailer"
import { z } from "zod"

/** Konfigurimi SMTP mungon ose është i gabuar — problem i serverit, jo i përdoruesit. */
export class MailConfigError extends Error {
  override name = "MailConfigError"
}

/** Nëse SMTP s'mbaron brenda kësaj kohe, lidhja ndërpritet — përdoruesi s'pret pafundësisht. */
const SEND_TIMEOUT_MS = 20_000

/**
 * Variablat e mjedisit për SMTP, të validuara me Zod.
 * Të detyrueshme: MAIL_HOST, MAIL_FROM, MAIL_PASSWORD.
 * Opsionale: MAIL_PORT (465), MAIL_SECURE (vetë `true` te porta 465), MAIL_USER (= MAIL_FROM),
 * MAIL_TO (= MAIL_FROM; disa adresa me presje).
 */
const mailEnvSchema = z.object({
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number().int().min(1).max(65_535).default(465),
  MAIL_SECURE: z.enum(["true", "false"]).optional(),
  MAIL_USER: z.string().optional(),
  MAIL_PASSWORD: z.string(),
  MAIL_FROM: z.email(),
  MAIL_TO: z
    .string()
    .transform((value) => value.split(",").map((address) => address.trim()).filter(Boolean))
    .pipe(z.array(z.email()).min(1))
    .optional(),
})

function readMailConfig() {
  // Vlerat bosh (`MAIL_TO=`) dhe hapësirat anash trajtohen si mungesë.
  const env = Object.fromEntries(
    Object.keys(mailEnvSchema.shape).map((key) => [key, process.env[key]?.trim() || undefined])
  )

  const parsed = mailEnvSchema.safeParse(env)
  if (!parsed.success) {
    // Mesazhet e Zod tregojnë vetëm emrin e variablës dhe problemin, kurrë vlerën (fjalëkalimin).
    throw new MailConfigError(z.prettifyError(parsed.error))
  }

  const { MAIL_HOST, MAIL_PORT, MAIL_SECURE, MAIL_USER, MAIL_PASSWORD, MAIL_FROM, MAIL_TO } =
    parsed.data

  return {
    transport: {
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: MAIL_SECURE ? MAIL_SECURE === "true" : MAIL_PORT === 465,
      auth: { user: MAIL_USER ?? MAIL_FROM, pass: MAIL_PASSWORD },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    },
    from: { name: "ABSignage", address: MAIL_FROM },
    to: MAIL_TO ?? [MAIL_FROM],
  }
}

export interface MailMessage {
  subject: string
  text: string
  html: string
  replyTo?: string
}

/**
 * Dërgon një email te ekipi (MAIL_TO).
 * Hedh `MailConfigError` kur SMTP s'është konfiguruar; çdo gabim tjetër vjen nga dërgimi.
 */
export async function sendMail(message: MailMessage): Promise<void> {
  const { transport, from, to } = readMailConfig()

  // Lidhje e re për çdo email, pa pool: për pak email në ditë s'mbeten lidhje të vjetra
  // që serveri SMTP i mbyll në heshtje dhe që dështojnë te dërgimi tjetër.
  await nodemailer.createTransport(transport).sendMail({
    ...message,
    from,
    to,
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
  })
}
