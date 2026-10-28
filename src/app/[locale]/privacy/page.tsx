"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/LanguageSelector"
import type { Locale } from "@/lib/i18n-config"
import {
  ShieldCheck,
  Trash2,
  HardDrive,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react"

export default function LocalizedPrivacyPolicyPage() {
  const params = useParams()
  const locale = (params?.locale as Locale) || "en"
  const [lang, setLang] = useState<"en" | "sq">(locale === "sq" ? "sq" : "en")

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative h-11 w-44 sm:h-12 sm:w-52 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/ab-signage-3.png"
                alt="ABSignage Logo"
                fill
                sizes="(max-width: 640px) 176px, 208px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector currentLocale={locale} />

            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{locale === "sq" ? "Kthehu në Ballinë" : "Back to Home"}</span>
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
              <Badge variant="default">
                Google Play Policy Compliant · GDPR & COPPA Ready
              </Badge>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLang("en")}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${lang === "en" ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-400"
                    }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLang("sq")}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${lang === "sq" ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-400"
                    }`}
                >
                  Shqip
                </button>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {lang === "en"
                ? "Privacy Policy for ABSignage Player"
                : "Politika e Privatësisë për ABSignage Player"}
            </h1>
            <p className="text-sm text-slate-400 mt-3 font-mono">
              {lang === "en" ? "Last Updated: 2026" : "Përditësuar: 2026"} · Version 2.4.0
            </p>
            <div className="mt-4 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed">
              <strong>Official Application Notice:</strong> This Privacy Policy applies directly to the{" "}
              <strong>ABSignage Android TV Player</strong> application, the <strong>ABSignage Management Console</strong>, and associated backend cloud APIs developed by <strong>ABSignage</strong>.
            </div>
          </div>

          {/* Policy Body */}
          <div className="space-y-10 text-slate-300 text-sm leading-relaxed">

            {/* 1. Overview */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <ShieldCheck className="w-5 h-5" />
                <h2>1. {lang === "en" ? "Overview & Core Commitment" : "Përmbledhja & Angazhimi Ynë"}</h2>
              </div>
              <p>
                {lang === "en" ? (
                  <>
                    At <strong>ABSignage</strong>, we respect your privacy and are committed to full transparency in accordance with Google Play&apos;s User Data Policy, European Union GDPR, and applicable global privacy regulations.
                  </>
                ) : (
                  <>
                    Në <strong>ABSignage</strong>, ne respektojmë privatësinë tuaj dhe jemi të përkushtuar ndaj transparencës së plotë në përputhje me Rregullat e të Dhënave të Përdoruesve të Google Play, GDPR-në e Bashkimit Evropian dhe ligjet në fuqi.
                  </>
                )}
              </p>
              <p>
                {lang === "en" ? (
                  <>
                    <strong>ABSignage Player</strong> is a business-to-business (B2B) digital signage client designed for TV screens, digital menu boards, and commercial displays. We <strong>never sell personal data</strong> and only collect minimum technical data necessary for screen synchronization.
                  </>
                ) : (
                  <>
                    <strong>ABSignage Player</strong> është një aplikacion B2B për ekrane dixhitale televizive, tabela menysh dhe ekrane reklamimi. Ne <strong>nuk shesim kurrë të dhëna personale</strong> dhe mbledhim vetëm të dhënat minimale teknike të nevojshme për funksionimin e ekranit.
                  </>
                )}
              </p>
            </section>

            {/* 2. Data Collected */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <HardDrive className="w-5 h-5" />
                <h2>2. {lang === "en" ? "Data We Collect and How We Use It" : "Të Dhënat që Mbledhim dhe Përdorimi"}</h2>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>{lang === "en" ? "Device Identifier & Pairing Code: " : "Identifikuesi i Pajisjes & Kodi i Lidhjes: "}</strong>
                    {lang === "en"
                      ? "A pseudonymous ID generated during pairing to link the TV screen with your organization's dashboard."
                      : "Një kod pseudonim i krijuar gjatë lidhjes për të lidhur ekranin me panelin e administrimit."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>{lang === "en" ? "Heartbeat & Telemetry: " : "Statusi Periodik i Pajisjes (Heartbeat): "}</strong>
                    {lang === "en"
                      ? "Screen online status, frame rate, and cache storage size to ensure continuous playback without black screens."
                      : "Statusi online i ekranit, shpejtësia FPS dhe hapësira e memorjes për të garantuar transmetim pa ndërprerje."}
                  </span>
                </li>
              </ul>
            </section>

            {/* 3. Account Deletion & Contact */}
            <section className="rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <Trash2 className="w-5 h-5 text-rose-400" />
                <h2>3. {lang === "en" ? "Data Deletion & Rights" : "Fshirja e të Dhënave & Të Drejtat Tuaja"}</h2>
              </div>
              <p>
                {lang === "en"
                  ? "You have the right to request deletion of your account and all associated screens at any time."
                  : "Ju keni të drejtën të kërkoni fshirjen e llogarisë tuaj dhe të të gjithë ekraneve të lidhura në çdo kohë."}
              </p>
              <div className="pt-2">
                <Link
                  href={`/${locale}/data-deletion`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold hover:bg-rose-500/30 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{lang === "en" ? "Open Data Deletion Form" : "Hap Formularin e Fshirjes së të Dhënave"}</span>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  )
}
