import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/LanguageSelector"
import { i18n, type Locale } from "@/lib/i18n-config"
import { getDictionary } from "@/app/[locale]/dictionaries"
import {
  FileText,
  ShieldCheck,
  Tv,
  UploadCloud,
  CreditCard,
  Lock,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Scale,
  ArrowLeft,
  ExternalLink,
  HardDrive,
} from "lucide-react"

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.andibevapi.digitalsignageplayer&hl=en"

export default async function LocalizedTermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = (
    i18n.locales.includes(locale as Locale) ? locale : i18n.defaultLocale
  ) as Locale
  const dict = await getDictionary(validLocale)
  const t = dict.terms

  const s2Bullets = [
    { title: t.s2B1Title, text: t.s2B1Text },
    { title: t.s2B2Title, text: t.s2B2Text },
    { title: t.s2B3Title, text: t.s2B3Text },
  ]

  const s3Bullets = [
    { title: t.s3B1Title, text: t.s3B1Text },
    { title: t.s3B2Title, text: t.s3B2Text },
    { title: t.s3B3Title, text: t.s3B3Text },
  ]

  const s4Bullets = [
    { title: t.s4B1Title, text: t.s4B1Text },
    { title: t.s4B2Title, text: t.s4B2Text },
    { title: t.s4B3Title, text: t.s4B3Text },
  ]

  const s5Bullets = [
    { title: t.s5B1Title, text: t.s5B1Text },
    { title: t.s5B2Title, text: t.s5B2Text },
    { title: t.s5B3Title, text: t.s5B3Text },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <Link href={`/${validLocale}`} className="flex items-center gap-3 group">
            <div className="relative h-11 w-44 sm:h-12 sm:w-52 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/AB_Signage_Logo_Transparency.png"
                alt="ABSignage Logo"
                fill
                sizes="(max-width: 640px) 176px, 208px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector currentLocale={validLocale} />

            <Link
              href={`/${validLocale}`}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backHome}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="mb-12 border-b border-slate-800 pb-8">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <Badge variant="default">{t.badge}</Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t.title}
            </h1>
            <p className="text-sm text-slate-400 mt-3 font-mono">{t.updated}</p>
            <div className="mt-4 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed">
              <strong>{t.noticeLabel}</strong> {t.noticeText}
            </div>
          </div>

          {/* Terms Body */}
          <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
            {/* 1. Acceptance & Scope */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <FileText className="w-5 h-5" />
                <h2>{t.s1Title}</h2>
              </div>
              <p>{t.s1P1}</p>
              <p>{t.s1P2}</p>
            </section>

            {/* 2. License Grant & Google Play */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <Tv className="w-5 h-5" />
                <h2>{t.s2Title}</h2>
              </div>
              <p>{t.s2Intro}</p>
              <ul className="space-y-3 text-xs sm:text-sm">
                {s2Bullets.map((item) => (
                  <li key={item.title} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{item.title}</strong>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. Device Pairing, Offline Cache & Telemetry */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <HardDrive className="w-5 h-5" />
                <h2>{t.s3Title}</h2>
              </div>
              <p>{t.s3Intro}</p>
              <ul className="space-y-3 text-xs sm:text-sm">
                {s3Bullets.map((item) => (
                  <li key={item.title} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{item.title}</strong>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Customer Media & Acceptable Use */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <UploadCloud className="w-5 h-5" />
                <h2>{t.s4Title}</h2>
              </div>
              <p>{t.s4Intro}</p>
              <ul className="space-y-3 text-xs sm:text-sm">
                {s4Bullets.map((item) => (
                  <li key={item.title} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{item.title}</strong>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 5. Free Trial, Subscription Plans & Billing */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <CreditCard className="w-5 h-5" />
                <h2>{t.s5Title}</h2>
              </div>
              <p>{t.s5Intro}</p>
              <ul className="space-y-3 text-xs sm:text-sm">
                {s5Bullets.map((item) => (
                  <li key={item.title} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">{item.title}</strong>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 6. Service Availability, Hardware & Updates */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <ShieldCheck className="w-5 h-5" />
                <h2>{t.s6Title}</h2>
              </div>
              <p>{t.s6P1}</p>
              <p>{t.s6P2}</p>
            </section>

            {/* 7. Data Privacy, GDPR & Account Deletion */}
            <section className="rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <Lock className="w-5 h-5" />
                <h2>{t.s7Title}</h2>
              </div>
              <p>{t.s7P1}</p>
              <p>{t.s7P2}</p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/${validLocale}/privacy`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.privacyBtn}</span>
                </Link>

                <Link
                  href={`/${validLocale}/data-deletion`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold hover:bg-rose-500/30 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.deletionBtn}</span>
                </Link>

                <a
                  href={GOOGLE_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold hover:bg-slate-700 hover:text-white transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.googlePlayBtn}</span>
                </a>
              </div>
            </section>

            {/* 8. Limitation of Liability & Termination */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <Scale className="w-5 h-5" />
                <h2>{t.s8Title}</h2>
              </div>
              <p>{t.s8P1}</p>
              <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{t.s8P2}</span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
