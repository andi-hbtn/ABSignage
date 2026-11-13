import { z } from "zod"

/**
 * Formulari «Provë 14-ditore falas».
 *
 * E njëjta skemë Zod ekzekutohet dy herë:
 *  1. në klient — gabimet dalin menjëherë, pa vajtje-ardhje te serveri;
 *  2. në Server Action — burimi i vetëm i së vërtetës, sepse klienti mund të anashkalohet.
 *
 * Mesazhet e Zod nuk i shfaqen përdoruesit: UI-ja di vetëm CILA fushë është e gabuar dhe
 * e merr tekstin në gjuhën e faqes nga `messages/<locale>.json` → `modal.errors`.
 */

/** Vlerat e `<select>`-it — dalin edhe te email-i që merr ekipi. */
export const SCREEN_TIERS = [
  "1 Screen",
  "2-5 Screens",
  "6-10 Screens",
  "11-20 Screens",
  "21-50 Screens",
  "50+ Screens",
] as const

export type ScreenTier = (typeof SCREEN_TIERS)[number]

export const DEFAULT_SCREEN_TIER: ScreenTier = "2-5 Screens"

/** Kufijtë e gjatësisë — të njëjtët shkojnë te `maxLength` i inputeve. */
export const MAX_LENGTH = {
  name: 100,
  email: 254,
  phone: 32,
  company: 120,
} as const

/**
 * Fushë e fshehur kundër botëve: njeriu nuk e sheh, ndaj e lë bosh; boti e plotëson.
 * Emri s'duhet të jetë nga ata që shfletuesi ose menaxheri i fjalëkalimeve i plotëson vetë
 * (p.sh. `website`), përndryshe kërkesa e një klienti të vërtetë do të hidhej në heshtje.
 */
export const HONEYPOT_FIELD = "_hp"

const CONTROL_CHARACTERS = /\p{Cc}/u

/**
 * Tekst njëreshësh: çdo varg hapësirash (përfshirë \r \n \t) bëhet një hapësirë e vetme dhe
 * hiqen hapësirat anash — kështu `\r\n` s'arrin dot te subjekti i email-it (header injection).
 */
function singleLine(max: number) {
  return z
    .string()
    .overwrite((value) => value.replace(/\s+/g, " ").trim())
    .max(max)
    .refine((value) => !CONTROL_CHARACTERS.test(value))
}

export const demoRequestSchema = z.object({
  /** Min. 2 karaktere, me të paktën një shkronjë (çdo alfabet: ë, ç, ä, ß…). */
  name: singleLine(MAX_LENGTH.name).min(2).regex(/\p{L}/u),
  email: z.string().trim().max(MAX_LENGTH.email).pipe(z.email()),
  /** Shifra, hapësira, `+` vetëm në fillim, `( ) . / -` — dhe 6 deri 20 shifra gjithsej. */
  phone: singleLine(MAX_LENGTH.phone)
    .regex(/^\+?[\d ()./-]+$/)
    .refine((value) => {
      const digits = value.replace(/\D/g, "").length
      return digits >= 6 && digits <= 20
    }),
  /** Të paktën një shkronjë ose shifër: «3M», «X» dhe «absignage.com» janë të vlefshme. */
  company: singleLine(MAX_LENGTH.company).regex(/[\p{L}\p{N}]/u),
  screens: z.enum(SCREEN_TIERS),
})

export type DemoRequest = z.infer<typeof demoRequestSchema>
export type DemoField = keyof DemoRequest

/** Fushat sipas rendit në formular — fokusi shkon te e para e gabuar. */
export const DEMO_FIELDS = demoRequestSchema.keyof().options

/** Dështimet që s'lidhen me një fushë të caktuar. */
export type DemoErrorReason = "rateLimited" | "unavailable" | "failed" | "network"

/** Gjendja e formularit; është edhe vlera që kthen Server Action-i, ndaj duhet të jetë e serializueshme. */
export type DemoRequestState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; fields: DemoField[] }
  | { status: "error"; reason: DemoErrorReason }

/** Validon `FormData`-n e formularit. Fushat e panjohura (honeypot, `$ACTION_*`) hidhen poshtë. */
export function parseDemoRequest(formData: FormData) {
  return demoRequestSchema.safeParse(Object.fromEntries(formData))
}

/** Fushat e gabuara, në rendin e formularit (`z.flattenError` — zëvendësuesi i `error.flatten()` në Zod v4). */
export function getInvalidFields(error: z.ZodError<DemoRequest>): DemoField[] {
  const { fieldErrors } = z.flattenError(error)
  return DEMO_FIELDS.filter((field) => fieldErrors[field] !== undefined)
}
