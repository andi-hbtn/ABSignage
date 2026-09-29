"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, CheckCircle2, ShieldAlert, ArrowLeft, Mail, Building, Tv } from "lucide-react"
import confetti from "canvas-confetti"

export default function DataDeletionPage() {
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
        colors: ["#ef4444", "#00e5ff", "#ffffff"]
      })
    } catch (err) {}
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-44 sm:h-12 sm:w-52">
              <Image src="/ab-signage-3.png" alt="ABSignage Logo" fill className="object-contain" priority />
            </div>
          </Link>

          <Link href="/privacy" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Politika e Privatësisë</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <Badge variant="destructive" className="mb-3">
              Google Play User Data Compliance · Account Deletion
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Kërkesë për Fshirjen e Llogarisë & të Dhënave
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              Account & Associated Data Deletion Request (ABSignage Player & Console)
            </p>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Kërkesa u Regjistrua me Sukses</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Kemi dërguar një email konfirmimi në <strong className="text-cyan-400">{email}</strong>. Pas konfirmimit të pronësisë, llogaria dhe të gjitha të dhënat e pajisjes suaj do të fshihen përgjithmonë brenda 30 ditëve në përputhje me Rregulloren e Google Play.
                </p>
                <div className="pt-4">
                  <Link href="/">
                    <Button variant="outline" className="text-xs">Kthehu në Ballinë</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 space-y-1.5 leading-relaxed">
                  <strong className="text-white block font-semibold text-sm">Informacion Mbi Fshirjen:</strong>
                  <p>• Fshirja e llogarisë çaktivizon menjëherë të gjitha ekranet e lidhura.</p>
                  <p>• Të gjitha mediat, playlist-at dhe raportet e transmetimit fshihen përgjithmonë nga serveri.</p>
                  <p>• Kjo procedurë është e pakthyeshme.</p>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Email-i i Llogarisë / Operatorit</label>
                  <Input
                    type="email"
                    required
                    placeholder="operatori@kompania.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Emri i Biznesit / Organizatës</label>
                  <Input
                    required
                    placeholder="p.sh. Retail Chain Albania"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">ID e Pajisjes (Opsionale nëse dëshironi fshirje të vetëm një ekrani)</label>
                  <Input
                    placeholder="p.sh. 849-204"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Arsyeja e Fshirjes (Opsionale)</label>
                  <textarea
                    rows={3}
                    placeholder="Shpjegoni shkurtimisht arsyen..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <Button type="submit" variant="destructive" className="w-full mt-4 text-xs font-bold py-3">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Dërgo Kërkesën për Fshirje të Plotë
                </Button>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
