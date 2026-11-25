import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/LanguageSelector"
import { i18n, type Locale } from "@/lib/i18n-config"
import { getDictionary } from "@/app/[locale]/dictionaries"
import { ShieldCheck, Trash2, HardDrive, CheckCircle2, ArrowLeft, FileText, } from "lucide-react"

export default async function LocalizedPrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = (
    i18n.locales.includes(locale as Locale) ? locale : i18n.defaultLocale
  ) as Locale
  const dict = await getDictionary(validLocale)
  const t = dict.privacy

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

          {/* Policy Body */}
          <div className="space-y-10 text-slate-300 text-sm leading-relaxed">
            {/* 1. Overview */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <ShieldCheck className="w-5 h-5" />
                <h2>{t.s1Title}</h2>
              </div>
              <p>{t.s1P1}</p>
              <p>{t.s1P2}</p>
            </section>

            {/* 2. Data Collected */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <HardDrive className="w-5 h-5" />
                <h2>{t.s2Title}</h2>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">{t.b1Title}</strong>
                    {t.b1Text}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">{t.b2Title}</strong>
                    {t.b2Text}
                  </span>
                </li>
              </ul>
            </section>

            {/* 3. Account Deletion & Contact */}
            <section className="rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <Trash2 className="w-5 h-5 text-rose-400" />
                <h2>{t.s3Title}</h2>
              </div>
              <p>{t.s3Desc}</p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/${validLocale}/data-deletion`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold hover:bg-rose-500/30 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.deletionBtn}</span>
                </Link>
                <Link
                  href={`/${validLocale}/terms`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t.termsBtn}</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}