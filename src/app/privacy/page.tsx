"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Trash2, 
  Server, 
  HardDrive, 
  Tv, 
  Mail, 
  FileText, 
  CheckCircle2, 
  ArrowLeft,
  Globe2
} from "lucide-react"

export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState<"en" | "sq">("en")

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-11 w-44 sm:h-12 sm:w-52 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/ab-signage-3.png"
                alt="ABSignage Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "sq" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-semibold text-cyan-300 hover:border-cyan-400 transition-all"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Gjuha: Shqip" : "Language: English"}</span>
            </button>

            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Back to Home" : "Kthehu në Ballinë"}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="mb-12 border-b border-slate-800 pb-8">
            <Badge variant="default" className="mb-4">
              Google Play Policy Compliant · GDPR & COPPA Ready
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {lang === "en"
                ? "Privacy Policy for ABSignage Player"
                : "Politika e Privatësisë për ABSignage Player"}
            </h1>
            <p className="text-sm text-slate-400 mt-3 font-mono">
              {lang === "en" ? "Last Updated: September 28, 2026" : "Përditësuar së fundmi: 28 Shtator 2026"} · Version 2.4.0
            </p>
            <div className="mt-4 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed">
              <strong>Official Application Notice:</strong> This Privacy Policy applies directly to the{" "}
              <strong>ABSignage Android TV Player</strong> application, the <strong>ABSignage Management Console</strong>, and associated backend cloud APIs developed by <strong>Antigravity Labs / ABSignage</strong>.
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
                    At <strong>ABSignage</strong> (developed by <strong>Antigravity Labs</strong>), we respect your privacy and are committed to full transparency in accordance with Google Play's User Data Policy, European Union GDPR, and applicable global privacy regulations.
                    <br /><br />
                    ABSignage is an enterprise digital signage solution designed for commercial displays, Android TV screens, and signage management. <strong>We do not sell personal data, nor do we track individuals across apps or websites for targeted advertising.</strong>
                  </>
                ) : (
                  <>
                    Në <strong>ABSignage</strong> (zhvilluar nga <strong>Antigravity Labs</strong>), ne respektojmë privatësinë tuaj dhe jemi të përkushtuar ndaj transparencës së plotë në përputhje me Rregullat e të Dhënave të Përdoruesit të Google Play, GDPR të Bashkimit Evropian dhe ligjet ndërkombëtare të privatësisë.
                    <br /><br />
                    ABSignage është një zgjidhje enterprise për menaxhimin e ekraneve dixhitale komerciale dhe Android TV. <strong>Ne nuk shesim të dhëna personale dhe nuk gjurmojmë individë për qëllime reklamimi të synuar.</strong>
                  </>
                )}
              </p>
            </section>

            {/* 2. Data We Collect */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <Server className="w-5 h-5" />
                <h2>2. {lang === "en" ? "Data Accessed, Collected & Handled" : "Të Dhënat që Aksesohen, Mblidhen & Përpunohen"}</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <h3 className="font-bold text-white text-base mb-1">
                    A. {lang === "en" ? "Device Telemetry & Hardware Identifiers" : "Telemetria e Pajisjes & Identifikuesit Harduerikë"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === "en"
                      ? "To connect screens, maintain pairing, and prevent screen blackouts (Zero-Black-Screen Resilience), the ABSignage Android TV Player communicates the following operational parameters:"
                      : "Për të lidhur ekranet, mbajtur pairing-un dhe parandaluar ekranin e zi, aplikacioni Android TV transmeton këto të dhëna operacionale:"}
                  </p>
                  <ul className="list-disc list-inside mt-2 text-xs space-y-1 text-slate-300">
                    <li><strong>Device Pairing Token / ID:</strong> {lang === "en" ? "Generated during pairing to identify the specific display screen." : "Gjenerohet gjatë pairing-ut për identifikimin e ekranit specifik."}</li>
                    <li><strong>Hardware Model & OS:</strong> {lang === "en" ? "e.g., Sony Bravia, Philips Q-Line, Android 11/12/13 version." : "p.sh. modeli i ekranit dhe versioni i sistemit operativ."}</li>
                    <li><strong>Display Metrics:</strong> {lang === "en" ? "Screen resolution (e.g. 4K, 1080p), current frame-rate (FPS), and display orientation." : "Rezolucioni i ekranit, FPS dhe orientimi."}</li>
                    <li><strong>Storage & Memory Status:</strong> {lang === "en" ? "Available storage capacity to ensure offline media caching succeeds." : "Hapësira e lirë për sigurimin e cache-it të mediave lokale."}</li>
                    <li><strong>Network & Heartbeat:</strong> {lang === "en" ? "IP address, network connectivity type (Wi-Fi / Ethernet), and periodic 60-second heartbeat timestamp." : "Lloji i lidhjes së rrjetit dhe ping-u periodik çdo 60 sekonda."}</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <h3 className="font-bold text-white text-base mb-1">
                    B. {lang === "en" ? "Proof-of-Play & Audit Records" : "Regjistrimet e Transmetimit (Proof-of-Play)"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === "en"
                      ? "The application logs the start and completion timestamps of scheduled media files and campaigns to generate cryptographic proof-of-play reports for enterprise advertising verification."
                      : "Aplikacioni regjistron orën dhe kohëzgjatjen e shfaqjes së mediave për raportet e certifikuara të faturimit të reklamave."}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <h3 className="font-bold text-white text-base mb-1">
                    C. {lang === "en" ? "Account Credentials (Management Console Only)" : "Të Dhënat e Llogarisë (Vetëm në Panelin Web)"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === "en"
                      ? "For human operators using the administrative web console: Business email address, hashed passwords, organization name, and role permission levels. The Android TV player does not require human user credential login."
                      : "Për operatorët administrativë: Email profesional, fjalëkalim i kriptuar me hash dhe roli i autorizuar. Ekrani Android TV nuk kërkon logim manual nga njerëz."}
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Sensitive Data NOT Collected */}
            <section className="rounded-2xl border border-emerald-500/20 bg-slate-900/50 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-lg">
                <EyeOff className="w-5 h-5" />
                <h2>3. {lang === "en" ? "Personal & Sensitive Data We DO NOT Collect" : "Të Dhëna të Ndjeshme që NE NUK i Mbledhim"}</h2>
              </div>
              <p>
                {lang === "en"
                  ? "In strict adherence to Google Play's User Data Policy:"
                  : "Në përputhje të rreptë me politikat e Google Play:"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === "en" ? "NO Precise GPS Location tracking" : "NUK mblidhet lokacioni GPS"}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === "en" ? "NO Contacts or Phonebook access" : "NUK aksesohen kontaktet"}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === "en" ? "NO Microphone or Audio Recording" : "NUK regjistrohet audio apo mikrofon"}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === "en" ? "NO Camera or Biometric scanning" : "NUK përdoret kamera apo biometria"}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === "en" ? "NO Financial Card or SMS access" : "NUK aksesohen SMS ose karta bankare"}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === "en" ? "NO Personal Photo library access" : "NUK aksesohen fotot personale"}</span>
                </div>
              </div>
            </section>

            {/* 4. No Sale of User Data */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <Lock className="w-5 h-5" />
                <h2>4. {lang === "en" ? "Prohibition on Sale of Data" : "Ndalimi Absolut i Shitjes së të Dhënave"}</h2>
              </div>
              <p>
                {lang === "en" ? (
                  <>
                    <strong>We do not sell, rent, release, disclose, disseminate, make available, or transfer personal or sensitive user data or device identifiers to any third party for monetary or other valuable consideration.</strong>
                  </>
                ) : (
                  <>
                    <strong>Ne nuk shesim, japim me qira, publikojmë apo transferojmë të dhëna personale ose identifikues të pajisjeve te asnjë palë e tretë për përfitime monetare apo materiale.</strong>
                  </>
                )}
              </p>
            </section>

            {/* 5. Security & Encryption */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <HardDrive className="w-5 h-5" />
                <h2>5. {lang === "en" ? "Data Security & Cryptography" : "Siguria dhe Kriptimi i të Dhënave"}</h2>
              </div>
              <p>
                {lang === "en" ? (
                  <>
                    All communications between the Android TV Player application and the ABSignage cloud servers are transmitted over secure, encrypted channels using <strong>Transport Layer Security (TLS 1.3 / HTTPS)</strong>. Offline media files are cached within the application's private, sandboxed internal storage protected by Android operating system permissions.
                  </>
                ) : (
                  <>
                    Çdo komunikim midis aplikacionit Android TV dhe serverave cloud transmetohet përmes kanaleve të enkriptuara me <strong>TLS 1.3 / HTTPS</strong>. Mediat offline ruhen në memorien private të izoluar të aplikacionit sipas standardeve të sigurisë së sistemit Android.
                  </>
                )}
              </p>
            </section>

            {/* 6. Account & Data Deletion */}
            <section id="deletion" className="rounded-2xl border border-rose-500/30 bg-slate-900/70 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-rose-400 font-bold text-lg">
                <Trash2 className="w-5 h-5" />
                <h2>6. {lang === "en" ? "Account & Data Deletion Policy" : "Politika e Fshirjes së Llogarisë dhe të Dhënave"}</h2>
              </div>
              <p>
                {lang === "en" ? (
                  <>
                    In full compliance with Google Play's <strong>Account Deletion Requirement</strong>, users and organization administrators have the right to request the complete deletion of their account and all associated data.
                  </>
                ) : (
                  <>
                    Në përputhje të plotë me rregulloren e Google Play për <strong>Fshirjen e Llogarisë</strong>, çdo përdorues dhe administrator ka të drejtë të kërkojë fshirjen e plotë të llogarisë dhe të gjitha të dhënave të lidhura.
                  </>
                )}
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <span className="font-bold text-white block">
                  {lang === "en" ? "How to Request Deletion:" : "Si të kërkoni fshirjen e të dhënave:"}
                </span>
                <p>
                  {lang === "en"
                    ? "1. In-App: Go to Console → Account / Settings → Delete Account."
                    : "1. Brenda Panelit: Shkoni te Paneli → Llogaria / Cilësimet → Fshi Llogarinë."}
                </p>
                <p>
                  {lang === "en"
                    ? "2. Web Resource: Submit a request directly via our web deletion portal at:"
                    : "2. Portali Web: Dërgoni kërkesën drejtpërdrejt përmes faqes:"}
                </p>
                <div className="pt-1">
                  <Link
                    href="/data-deletion"
                    className="inline-flex items-center gap-2 text-cyan-400 underline font-semibold hover:text-cyan-300"
                  >
                    <span>{lang === "en" ? "Visit Dedicated Account & Data Deletion Portal →" : "Vizito Portalin e Fshirjes së Llogarisë →"}</span>
                  </Link>
                </div>
                <p className="text-slate-400 pt-2 border-t border-slate-800">
                  {lang === "en"
                    ? "Upon receiving a verified request, all associated device telemetry, authentication records, and uploaded media are permanently purged within 30 days."
                    : "Pas verifikimit të kërkesës, të gjitha të dhënat dhe mediat fshihen përgjithmonë brenda 30 ditëve."}
                </p>
              </div>
            </section>

            {/* 7. Children's Privacy */}
            <section className="rounded-2xl border border-white/[0.08] bg-slate-900/50 p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <Tv className="w-5 h-5" />
                <h2>7. {lang === "en" ? "Children's Privacy" : "Privatësia e Fëmijëve"}</h2>
              </div>
              <p>
                {lang === "en" ? (
                  <>
                    ABSignage is an enterprise B2B service intended exclusively for commercial business operations. Our service does not target, market to, or knowingly collect any personal information from children under the age of 13 (or under 16 in the European Economic Area).
                  </>
                ) : (
                  <>
                    ABSignage është një shërbim komercial B2B i destinuar vetëm për biznese. Shërbimi ynë nuk synon dhe nuk mbledh me vetëdije të dhëna personale nga fëmijë nën moshën 13 vjeç (ose nën 16 vjeç në Zonën Ekonomike Evropiane).
                  </>
                )}
              </p>
            </section>

            {/* 8. Contact Information */}
            <section className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-lg">
                <Mail className="w-5 h-5" />
                <h2>8. {lang === "en" ? "Developer Information & Privacy Inquiries" : "Informacioni i Zhvilluesit & Kontaktet"}</h2>
              </div>
              <p>
                {lang === "en"
                  ? "For any inquiries regarding this Privacy Policy or your data protection rights, please contact our Data Protection Officer:"
                  : "Për çdo pyetje në lidhje me këtë Politikë Privatësie ose të drejtat tuaja, ju lutemi kontaktoni Zyrtarin e Mbrojtjes së të Dhënave:"}
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <p><strong>Platform:</strong> ABSignage Platform</p>
                <p><strong>Developer:</strong> Antigravity Labs</p>
                <p><strong>Privacy Contact Email:</strong> <a href="mailto:privacy@absignage.com" className="text-cyan-400 underline">privacy@absignage.com</a></p>
                <p><strong>Web Resource:</strong> <a href="https://absignage.com" className="text-cyan-400 underline">https://absignage.com</a></p>
              </div>
            </section>

          </div>

          <div className="mt-12 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:underline">
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === "en" ? "Return to ABSignage Home" : "Kthehu në Faqen Kryesore"}</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
