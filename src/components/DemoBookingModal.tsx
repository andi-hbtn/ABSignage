"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, CheckCircle2, Sparkles, Building, Mail, Phone, User, Loader2, AlertCircle } from "lucide-react"
import confetti from "canvas-confetti"

interface DemoBookingModalProps {
  open: boolean
  onClose: () => void
}

export function DemoBookingModal({ open, onClose }: DemoBookingModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [screens, setScreens] = useState("5-20 ekrane")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  if (!open) return null

  const handleModalClose = () => {
    setErrorMsg(null)
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const payload = {
      name,
      email,
      phone,
      company,
      screens,
    }

    try {
      let isSuccess = false

      // 1. Provo API endpoint-in e brendshëm (/api/send-demo)
      try {
        const res = await fetch("/api/send-demo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        const data = await res.json()
        if (res.ok && data.success) {
          isSuccess = true
        }
      } catch (apiErr) {
        console.warn("API route internal error, provojmë dërgimin e drejtpërdrejtë:", apiErr)
      }

      // 2. Nëse rruga e brendshme dështon, fallback direkt te FormSubmit nga browser-i
      if (!isSuccess) {
        const directRes = await fetch("https://formsubmit.co/ajax/andi.bevapi@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            "Emri dhe Mbiemri": name,
            "Email Klienti": email,
            "Numri i Telefonit": phone,
            "Kompania / Biznesi": company,
            "Numri i Ekraneve": screens,
            _subject: `Kërkesë për Provë 14-Ditore ABSignage - ${company} (${name})`,
            _template: "table",
            _captcha: "false",
          }),
        })

        const directData = await directRes.json()
        if (directRes.ok && (directData.success === "true" || directData.success === true || directData.message)) {
          isSuccess = true
        } else {
          throw new Error(directData.message || "Dërgimi i email-it nuk u krye dot. Ju lutem provoni sërish.")
        }
      }

      setSubmitted(true)

      // Shfaq konfeti festimi
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#00e5ff", "#0052ff", "#ffffff", "#10b981"],
        })
      } catch (err) {
        console.log(err)
      }
    } catch (err: unknown) {
      console.error("Gabim gjatë dërgimit:", err)
      const message = err instanceof Error ? err.message : "Ndodhi një gabim i papritur gjatë dërgimit. Ju lutemi provoni sërish."
      setErrorMsg(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-cyan-500/40 bg-slate-950 p-6 sm:p-8 shadow-[0_25px_70px_-15px_rgba(0,229,255,0.4)]">
        
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Kërkesa u Dërgua me Sukses!</h3>
            <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
              Faleminderit <strong className="text-cyan-400">{name}</strong>. Detajet e kërkesës suaj u dërguan tek ekipi ynë. Eksperti ynë i ABSignage do t&apos;ju kontaktojë brenda 30 minutash për konfigurimin e provës 14-ditore.
            </p>
            <div className="pt-4">
              <Button onClick={handleModalClose} className="w-full">
                Mbyll Dritaren
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <Badge variant="default" className="mb-2">Provë Pa Detyrim</Badge>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Kërkoni Demonstrim të ABSignage
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Zbuloni si të transformoni rrjetin tuaj të ekraneve me zero kosto paraprake.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Emri & Mbiemri</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                  <Input
                    required
                    disabled={loading}
                    placeholder="p.sh. Alban Berisha"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Email Profesional</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    <Input
                      type="email"
                      required
                      disabled={loading}
                      placeholder="emri@kompania.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Numri i Telefonit</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    <Input
                      type="tel"
                      required
                      disabled={loading}
                      placeholder="+355 69 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Kompania / Biznesi</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    <Input
                      required
                      disabled={loading}
                      placeholder="Emri i biznesit"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Numri i Ekraneve</label>
                  <select
                    disabled={loading}
                    value={screens}
                    onChange={(e) => setScreens(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 text-sm text-white focus:border-cyan-400 focus:outline-none disabled:opacity-50"
                  >
                    <option value="1-4 ekrane">1 - 4 Ekrane (Starter)</option>
                    <option value="5-20 ekrane">5 - 20 Ekrane (Business)</option>
                    <option value="21-50 ekrane">21 - 50 Ekrane (Scale)</option>
                    <option value="50+ ekrane">50+ Ekrane (Enterprise)</option>
                  </select>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full mt-4 text-sm font-bold">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Duke dërguar kërkesën...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Dërgo Kërkesën & Merr Provë 14-Ditore
                  </>
                )}
              </Button>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}
