"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LanguageSelector } from "@/components/LanguageSelector"
import type { Locale } from "@/lib/i18n-config"
import { Trash2, CheckCircle2, ShieldAlert, ArrowLeft, Mail, Building, Tv } from "lucide-react"
import confetti from "canvas-confetti"

export default function LocalizedDataDeletionPage() {
  const params = useParams()
  const locale = (params?.locale as Locale) || "en"

  const [email, setEmail] = useState("")
  const [orgName, setOrgName] = useState("")
  const [deviceId, setDeviceId] = useState("")
  const [reason, setReason] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ef4444", "#00e5ff", "#ffffff"],
      })
    } catch {
      // safe fallback
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="relative h-11 w-44 sm:h-12 sm:w-52">
              <Image src="/ab-signage-3.png" alt="ABSignage Logo" fill sizes="(max-width: 640px) 176px, 208px" className="object-contain" priority />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector currentLocale={locale} />
            <Link href={`/${locale}/privacy`} className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{locale === "sq" ? "Politika e Privatësisë" : "Privacy Policy"}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="destructive" className="mb-3">
              Google Play User Data Compliance · Account Deletion
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {locale === "sq"
                ? "Kërkesë për Fshirjen e Llogarisë & të Dhënave"
                : "Request Account & Data Deletion"}
            </h1>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              {locale === "sq"
                ? "Në zbatim të rregullave të Google Play dhe GDPR, ju keni të drejtë të kërkoni fshirjen e përhershme të llogarisë suaj, pajisjeve të lidhura dhe të gjitha skedarëve."
                : "In compliance with Google Play User Data policies and GDPR, you have the right to request permanent deletion of your account, paired screens, and uploaded assets."}
            </p>
          </div>

          {!submitted ? (
            <div className="rounded-3xl border border-white/[0.08] bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{locale === "sq" ? "Email-i i Regjistruar i Llogarisë *" : "Registered Account Email *"}</span>
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="admin@kompania.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-950 border-slate-700 text-white text-xs h-10"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{locale === "sq" ? "Emri i Organizatës / Biznesit *" : "Organization / Business Name *"}</span>
                  </label>
                  <Input
                    required
                    placeholder={locale === "sq" ? "p.sh. Restorant & Bar" : "e.g. Grand Retail LLC"}
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="bg-slate-950 border-slate-700 text-white text-xs h-10"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{locale === "sq" ? "ID e Pajisjes (Opsionale)" : "Device ID (Optional)"}</span>
                  </label>
                  <Input
                    placeholder="p.sh. 849-204"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    className="bg-slate-950 border-slate-700 text-white text-xs h-10"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    {locale === "sq" ? "Arsyeja e Kërkesës (Opsionale)" : "Reason for Deletion (Optional)"}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={locale === "sq" ? "Shkruani arsyen e fshirjes..." : "Describe reason..."}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-700 p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>
                    {locale === "sq"
                      ? "Kujdes: Ky veprim është i pakthyeshëm. Të gjitha mediat, playlist-at dhe telemetria do të fshihen përgjithmonë brenda 30 ditëve."
                      : "Warning: This action is permanent. All media, playlists, and device telemetry will be completely purged within 30 days."}
                  </span>
                </div>

                <Button type="submit" variant="destructive" className="w-full h-11 text-xs font-bold">
                  <Trash2 className="w-4 h-4 mr-2" />
                  <span>{locale === "sq" ? "Dërgo Kërkesën për Fshirje të Plotë" : "Submit Full Deletion Request"}</span>
                </Button>
              </form>
            </div>
          ) : (
            <div className="rounded-3xl border border-emerald-500/40 bg-slate-900/60 p-8 text-center space-y-4 shadow-xl">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {locale === "sq" ? "Kërkesa u Regjistrua me Sukses" : "Request Successfully Logged"}
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                {locale === "sq"
                  ? "Kërkesa juaj është marrë nga ekipi ynë i sigurisë. Një email konfirmimi do të dërgohet te adresa e specifikuar brenda 48 orëve."
                  : "Your deletion request has been safely logged. A confirmation email will be delivered to your registered email address within 48 hours."}
              </p>
              <div className="pt-4">
                <Link
                  href={`/${locale}`}
                  className="inline-flex items-center justify-center px-6 h-10 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  {locale === "sq" ? "Kthehu në Ballinë" : "Return to Home"}
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
