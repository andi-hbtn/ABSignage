"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Dictionary } from "@/lib/get-dictionary"
import { X, CheckCircle2, Sparkles, Building, Mail, Phone, User, Loader2, AlertCircle } from "lucide-react"
import confetti from "canvas-confetti"

interface DemoBookingModalProps {
  dict: Dictionary["modal"]
  open: boolean
  onClose: () => void
}

export function DemoBookingModal({ dict, open, onClose }: DemoBookingModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [screens, setScreens] = useState("2 - 5 Screens")
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

      // 1. Try internal API endpoint (/api/send-demo)
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
        } else {
          console.warn("API route failed, trying direct formsubmit fallback...", data)
        }
      } catch (apiErr) {
        console.warn("API route error, trying direct fallback...", apiErr)
      }

      // 2. Direct Fallback if needed
      if (!isSuccess) {
        const fallbackRes = await fetch("https://formsubmit.co/ajax/andi.bevapi@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            "Full Name": name,
            "Client Email": email,
            "Phone Number": phone,
            "Company Name": company,
            "TV Screens": screens,
            _subject: `Trial Request: ABSignage - ${company} (${name})`,
            _template: "table",
            _captcha: "false",
          }),
        })

        if (fallbackRes.ok) {
          isSuccess = true
        }
      }

      if (isSuccess) {
        setSubmitted(true)
        try {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#00e5ff", "#0052ff", "#ffffff"],
          })
        } catch {
          // confetti fallback safe
        }
      } else {
        throw new Error("Could not deliver the request. Please contact us directly.")
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred. Please try again."
      setErrorMsg(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,229,255,0.3)] animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <Badge variant="default" className="mb-2">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                ABSignage 14-Day Trial
              </Badge>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {dict.title}
              </h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                {dict.subtitle}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{dict.fullName} *</span>
                </label>
                <Input
                  required
                  placeholder={dict.fullNamePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-950 border-slate-700 text-white text-xs h-10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{dict.email} *</span>
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder={dict.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-950 border-slate-700 text-white text-xs h-10"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{dict.phone} *</span>
                  </label>
                  <Input
                    required
                    type="tel"
                    placeholder={dict.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-slate-950 border-slate-700 text-white text-xs h-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{dict.company} *</span>
                </label>
                <Input
                  required
                  placeholder={dict.companyPlaceholder}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="bg-slate-950 border-slate-700 text-white text-xs h-10"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  {dict.screenCount}
                </label>
                <select
                  value={screens}
                  onChange={(e) => setScreens(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="1 Screen">{dict.screenOptions.opt1}</option>
                  <option value="2-5 Screens">{dict.screenOptions.opt2}</option>
                  <option value="6-10 Screens">{dict.screenOptions.opt3}</option>
                  <option value="11-20 Screens">{dict.screenOptions.opt4}</option>
                  <option value="21-50 Screens">{dict.screenOptions.opt5}</option>
                  <option value="50+ Screens">{dict.screenOptions.opt6}</option>
                </select>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-xs font-bold h-11"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {dict.submitting}
                    </span>
                  ) : (
                    <span>{dict.submitBtn}</span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              {dict.successTitle}
            </h3>

            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              {dict.successMessage}
            </p>

            <div className="pt-4">
              <Button
                variant="outline"
                onClick={handleModalClose}
                className="w-full text-xs h-10"
              >
                {dict.closeBtn}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
