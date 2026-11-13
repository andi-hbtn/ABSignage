"use server"

import { randomUUID } from "node:crypto"
import { headers } from "next/headers"
import { renderDemoRequestEmail } from "@/lib/email-templates/demo-request"
import { MailConfigError, sendMail } from "@/lib/mailer"
import { createRateLimiter, getClientIp } from "@/lib/rate-limit"
import {
  HONEYPOT_FIELD,
  getInvalidFields,
  parseDemoRequest,
  type DemoRequestState,
} from "@/lib/validations/demo-request"

const MINUTE = 60_000

/** Për një IP: 5 kërkesa në 15 minuta — mjafton për gabime shtypi dhe riprovime. */
const perIpLimit = createRateLimiter({ limit: 5, windowMs: 15 * MINUTE })

/**
 * Tavan për krejt faqen: edhe nëse dikush ndërron IP pa fund, kutia postare dhe llogaria
 * SMTP (Gmail lejon rreth 500 email në ditë) nuk vërshohen.
 */
const globalLimit = createRateLimiter({ limit: 50, windowMs: 60 * MINUTE })

/**
 * Server Action e formularit «Provë 14-ditore» — modeli zyrtar i Next.js për format:
 * `useActionState` në klient + validim me Zod në server.
 *
 * Next.js e bën këtë funksion endpoint POST publik (me kontroll CSRF Origin/Host dhe kufi
 * 1 MB për trupin), ndaj gjithçka që vjen nga klienti trajtohet si e pabesueshme.
 */
export async function submitDemoRequest(formData: FormData): Promise<DemoRequestState> {
  // Një thirrje e falsifikuar mund të dërgojë çfarëdo; pa FormData kërkesa del e pavlefshme.
  const data = formData instanceof FormData ? formData : new FormData()

  // Boti plotësoi fushën e fshehur: i kthejmë «sukses» që të mos riprovojë, por s'dërgojmë gjë.
  if (data.get(HONEYPOT_FIELD)) {
    return { status: "success" }
  }

  const parsed = parseDemoRequest(data)
  if (!parsed.success) {
    return { status: "invalid", fields: getInvalidFields(parsed.error) }
  }

  if (!perIpLimit(getClientIp(await headers())) || !globalLimit("all")) {
    return { status: "error", reason: "rateLimited" }
  }

  const requestId = randomUUID()
  try {
    await sendMail({
      ...renderDemoRequestEmail(parsed.data, { requestId }),
      replyTo: parsed.data.email,
    })
    console.info("[demo-request] Email sent", { requestId })
    return { status: "success" }
  } catch (error) {
    if (error instanceof MailConfigError) {
      console.error("[demo-request] SMTP is not configured", { requestId, details: error.message })
      return { status: "error", reason: "unavailable" }
    }
    console.error("[demo-request] Email delivery failed", { requestId, error })
    return { status: "error", reason: "failed" }
  }
}
