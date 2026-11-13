"use client"

import { startTransition, useActionState, useEffect, useId, useRef, type FormEvent } from "react"
import type Confetti from "canvas-confetti"
import {
  AlertCircle,
  Building,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  User,
  X,
  type LucideIcon,
} from "lucide-react"
import { submitDemoRequest } from "@/app/actions/demo-request"
import { Button } from "@/components/ui/button"
import { Input, type InputProps } from "@/components/ui/input"
import type { Dictionary } from "@/lib/get-dictionary"
import { cn } from "@/lib/utils"
import {
  DEFAULT_SCREEN_TIER,
  HONEYPOT_FIELD,
  MAX_LENGTH,
  SCREEN_TIERS,
  getInvalidFields,
  parseDemoRequest,
  type DemoField,
  type DemoRequestState,
  type ScreenTier,
} from "@/lib/validations/demo-request"

interface DemoBookingModalProps {
  dict: Dictionary["modal"]
  /** Thirret pasi dialogu mbyllet (X, Escape, «Mbyll»); prindi e heq modalin nga faqja. */
  onClose: () => void
}

const INITIAL_STATE: DemoRequestState = { status: "idle" }

const CONFETTI_COLORS = ["#00e5ff", "#0052ff", "#ffffff"]

/**
 * Veprimi i `useActionState`:
 * 1. validon në klient me të njëjtën skemë Zod si serveri — gabimet dalin pa vajtje-ardhje;
 * 2. thërret Server Action-in, që validon sërish (klientit s'i besohet);
 * 3. rrjeti i rënë ose një deploy i ri (ID e vjetër e veprimit) bëhen mesazh, jo crash i faqes.
 */
async function sendDemoRequest(
  _previous: DemoRequestState,
  formData: FormData
): Promise<DemoRequestState> {
  const parsed = parseDemoRequest(formData)
  if (!parsed.success) {
    return { status: "invalid", fields: getInvalidFields(parsed.error) }
  }

  try {
    return await submitDemoRequest(formData)
  } catch {
    return { status: "error", reason: "network" }
  }
}

function focusField(form: HTMLFormElement | null, field: DemoField | undefined) {
  const element = field ? form?.elements.namedItem(field) : null
  if (element instanceof HTMLElement) element.focus()
}

export function DemoBookingModal({ dict, onClose }: DemoBookingModalProps) {
  const [state, dispatch, pending] = useActionState(sendDemoRequest, INITIAL_STATE)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const confettiRef = useRef<HTMLCanvasElement>(null)
  const doneButtonRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const successMessageId = useId()

  // Dialog modal nativ: fokusi mbetet brenda, Escape e mbyll, pjesa tjetër e faqes bëhet
  // `inert` (edhe për lexuesit e ekranit) dhe mbyllja e kthen fokusin te butoni që e hapi.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (!dialog.open) dialog.showModal()
    focusField(formRef.current, "name")

    const root = document.documentElement
    const { overflow, scrollbarGutter } = root.style
    root.style.overflow = "hidden"
    root.style.scrollbarGutter = "stable" // faqja s'"kërcen" kur zhduket shiriti i scroll-it
    return () => {
      root.style.overflow = overflow
      root.style.scrollbarGutter = scrollbarGutter
    }
  }, [])

  useEffect(() => {
    if (state.status === "invalid") focusField(formRef.current, state.fields[0])
  }, [state])

  useEffect(() => {
    if (state.status !== "success") return
    doneButtonRef.current?.focus()

    // Konfeti në kanavacën brenda dialogut: dialogu rri në "top layer", ndaj kanavaca globale
    // e canvas-confetti do të mbetej poshtë sfondit të tij.
    const canvas = confettiRef.current
    if (!canvas) return
    let cancelled = false
    let fire: Confetti.CreateTypes | undefined
    import("canvas-confetti")
      .then(({ default: confetti }) => {
        if (cancelled) return
        fire = confetti.create(canvas, { resize: true, disableForReducedMotion: true })
        void fire({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: CONFETTI_COLORS })
      })
      .catch(() => {
        // Vetëm dekor: dështimi i tij s'prek kërkesën që sapo u dërgua.
      })

    return () => {
      cancelled = true
      fire?.reset()
    }
  }, [state.status])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // `onSubmit` + `startTransition` në vend të `<form action>`: React 19 e boshatis formën pas
    // çdo `action`, edhe kur ka gabime. Kështu vlerat e shkruara mbeten.
    event.preventDefault()
    if (pending) return
    const formData = new FormData(event.currentTarget)
    startTransition(() => dispatch(formData))
  }

  const close = () => dialogRef.current?.close()

  const invalidFields = new Set(state.status === "invalid" ? state.fields : [])
  const errorFor = (field: DemoField) => (invalidFields.has(field) ? dict.errors[field] : undefined)

  const screenLabels: Record<ScreenTier, string> = {
    "1 Screen": dict.screenOptions.opt1,
    "2-5 Screens": dict.screenOptions.opt2,
    "6-10 Screens": dict.screenOptions.opt3,
    "11-20 Screens": dict.screenOptions.opt4,
    "21-50 Screens": dict.screenOptions.opt5,
    "50+ Screens": dict.screenOptions.opt6,
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        // Gjatë dërgimit Escape s'e mbyll: përdoruesi duhet të shohë nëse kërkesa shkoi.
        if (pending) event.preventDefault()
      }}
      onClose={onClose}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto overscroll-contain rounded-3xl border border-cyan-500/30 bg-slate-900 p-6 text-slate-100 shadow-[0_25px_60px_-15px_rgba(0,229,255,0.3)] transition-opacity duration-200 backdrop:bg-slate-950/80 backdrop:backdrop-blur-md starting:opacity-0 sm:p-8"
    >
      <button
        type="button"
        onClick={close}
        disabled={pending}
        aria-label={dict.closeBtn}
        className="absolute right-5 top-5 rounded-full bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-40"
      >
        <X className="h-5 w-5" />
      </button>

      {state.status === "success" ? (
        <div className="space-y-4 py-8 text-center">
          <canvas
            ref={confettiRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 size-full"
          />
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/20 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 id={titleId} className="text-2xl font-bold tracking-tight text-white">
            {dict.successTitle}
          </h2>
          <p id={successMessageId} className="mx-auto max-w-sm text-xs leading-relaxed text-slate-300">
            {dict.successMessage}
          </p>
          <div className="pt-4">
            <Button
              ref={doneButtonRef}
              type="button"
              variant="outline"
              onClick={close}
              aria-describedby={successMessageId}
              className="h-10 w-full text-xs"
            >
              {dict.closeBtn}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 pr-10">
            <h2 id={titleId} className="text-2xl font-bold tracking-tight text-white">
              {dict.title}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-400">{dict.subtitle}</p>
          </div>

          {state.status === "error" && (
            <div
              role="alert"
              className="mb-4 flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/60 p-3 text-xs text-rose-300"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{dict.errors[state.reason]}</span>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Honeypot kundër botëve — i padukshëm dhe i paarritshëm me Tab për njerëzit. */}
            <div aria-hidden="true" className="hidden">
              <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
            </div>

            <TextField
              name="name"
              label={dict.fullName}
              icon={User}
              error={errorFor("name")}
              autoComplete="name"
              maxLength={MAX_LENGTH.name}
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <TextField
                name="email"
                type="email"
                label={dict.email}
                icon={Mail}
                error={errorFor("email")}
                autoComplete="email"
                spellCheck={false}
                maxLength={MAX_LENGTH.email}
              />
              <TextField
                name="phone"
                type="tel"
                label={dict.phone}
                icon={Phone}
                error={errorFor("phone")}
                autoComplete="tel"
                maxLength={MAX_LENGTH.phone}
              />
            </div>

            <TextField
              name="company"
              label={dict.company}
              icon={Building}
              error={errorFor("company")}
              autoComplete="organization"
              maxLength={MAX_LENGTH.company}
            />

            <ScreensField
              label={dict.screenCount}
              options={SCREEN_TIERS.map((tier) => ({ value: tier, label: screenLabels[tier] }))}
              error={errorFor("screens")}
            />

            <div className="pt-2">
              {/* `aria-disabled` dhe jo `disabled`: butoni s'e humb fokusin gjatë dërgimit;
                  dërgimi i dytë bllokohet te `handleSubmit`. */}
              <Button
                type="submit"
                aria-disabled={pending}
                className="h-11 w-full text-xs font-bold aria-disabled:cursor-progress aria-disabled:opacity-70"
              >
                {pending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {dict.submitting}
                  </>
                ) : (
                  dict.submitBtn
                )}
              </Button>
            </div>
          </form>
        </>
      )}
    </dialog>
  )
}

interface TextFieldProps extends Omit<InputProps, "id" | "name" | "required" | "className"> {
  name: Exclude<DemoField, "screens">
  label: string
  icon: LucideIcon
  error?: string
}

function TextField({ name, label, icon: Icon, error, ...inputProps }: TextFieldProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300"
      >
        <Icon className="h-3.5 w-3.5 text-cyan-400" />
        <span>
          {label} <span aria-hidden="true">*</span>
        </span>
      </label>
      <Input
        {...inputProps}
        id={id}
        name={name}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "h-10 bg-slate-950 text-xs text-white",
          error ? "border-rose-500/70 focus:border-rose-400 focus:ring-rose-500/20" : "border-slate-700"
        )}
      />
      <FieldError id={errorId} message={error} />
    </div>
  )
}

interface ScreensFieldProps {
  label: string
  options: { value: ScreenTier; label: string }[]
  error?: string
}

function ScreensField({ label, options, error }: ScreensFieldProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-slate-300">
        {label}
      </label>
      <select
        id={id}
        name="screens"
        defaultValue={DEFAULT_SCREEN_TIER}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "h-10 w-full rounded-lg border bg-slate-950 px-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400",
          error ? "border-rose-500/70" : "border-slate-700"
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldError id={errorId} message={error} />
    </div>
  )
}

function FieldError({ id, message }: { id: string; message: string | undefined }) {
  if (!message) return null

  return (
    <p id={id} className="mt-1 text-[11px] text-rose-400">
      {message}
    </p>
  )
}
