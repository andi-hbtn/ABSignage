"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Dictionary } from "@/lib/get-dictionary"
import {
  ArrowRight,
  CheckCircle2,
  Play,
  Radio,
  Clock,
  QrCode,
  Flame,
} from "lucide-react"

interface HeroProps {
  dict: Dictionary["hero"]
  statsDict: Dictionary["stats"]
  onOpenDemo: () => void
}

export function Hero({ dict, statsDict, onOpenDemo }: HeroProps) {
  const [activePreset, setActivePreset] = useState<number>(0)

  const presets = [
    {
      title: "Restaurant & Bar Menu",
      location: "Tirana Downtown Lounge",
      pairingCode: "749-204",
      headline: "SUMMER SPECIALS & COCKTAILS",
      sub: "Happy Hour 17:00 - 20:00 · 30% OFF All Signature Drinks",
      menuItem1: "Gourmet Angus Burger — 850 lek",
      menuItem2: "Truffle Fries & Dip — 420 lek",
      menuItem3: "Passion Fruit Mojito — 600 lek",
      ticker: "Live Order Status: Table #12 Ready · Try our chef's special homemade tiramisu today!",
      gradient: "from-blue-950 via-slate-900 to-slate-950",
    },
    {
      title: "Retail Fashion Promo",
      location: "City Mall Flagship Store",
      pairingCode: "812-409",
      headline: "NEW SUMMER COLLECTION 2026",
      sub: "Exclusive in-store launch · Buy 2 items and get 25% discount",
      menuItem1: "Italian Linen Shirts — 3,900 lek",
      menuItem2: "Classic Casual Blazers — 7,500 lek",
      menuItem3: "Summer Leather Sneakers — 5,200 lek",
      ticker: "Flash Sale Alert: VIP Club members receive double bonus points at checkout today!",
      gradient: "from-indigo-950 via-slate-900 to-slate-950",
    },
    {
      title: "Clinic & Reception",
      location: "Medical Care Center",
      pairingCode: "305-618",
      headline: "WELCOME TO CARE CLINIC",
      sub: "Please take a ticket at reception · Free consultations for card holders",
      menuItem1: "Dr. A. Hoxha — Room 04 (Available)",
      menuItem2: "Dr. E. Krasniqi — Room 07 (In Session)",
      menuItem3: "Pharmacy Desk — Ground Floor",
      ticker: "Health Tip: Schedule your annual general health checkup at our front desk today.",
      gradient: "from-teal-950 via-slate-900 to-slate-950",
    },
  ]

  const current = presets[activePreset]

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Neon Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[380px] bg-blue-600/12 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute inset-0 grid-pattern opacity-30 -z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Pitch */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {dict.titlePart1}{" "}
            <span className="text-gradient-cyan-blue block sm:inline">
              {dict.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {dict.subtitle}
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button
              onClick={onOpenDemo}
              className="w-full sm:w-auto text-xs sm:text-sm h-10 px-5 font-bold group shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            >
              <span>{dict.ctaPrimary}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>

            <a
              href="#layouts"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 h-10 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:border-cyan-500/40 hover:bg-slate-800 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              <span>{dict.ctaSecondary}</span>
            </a>
          </div>

        </div>

        {/* Hero Interactive Split-Screen & Pairing Code Showcase */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="rounded-3xl p-2.5 sm:p-4 bg-gradient-to-b from-cyan-500/25 via-slate-800/40 to-slate-950 border border-cyan-500/30 shadow-[0_20px_60px_-15px_rgba(0,229,255,0.25)]">

            {/* Top Toolbar: Switcher & Pairing Code Indicator */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-3 px-2 border-b border-white/[0.08] gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-bold">
                  <span>{dict.pairingCodeLabel}:</span>
                  <span className="text-white tracking-widest">{current.pairingCode}</span>
                </div>
              </div>

              {/* Sample Preset Switcher */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {presets.map((p, idx) => (
                  <button
                    key={p.title}
                    onClick={() => setActivePreset(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${activePreset === idx
                        ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30"
                        : "text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                      }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Commercial TV Frame */}
            <div className={`mt-3 rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-br ${current.gradient} p-4 sm:p-6 shadow-inner relative`}>

              {/* TV Status Overlay Header */}
              <div className="flex items-center justify-between text-xs mb-4">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-semibold">{dict.activeScreen}</span>
                  <span className="text-white/40">|</span>
                  <span className="text-cyan-300 font-mono">{current.location}</span>
                </div>

                <Badge variant="default" className="text-[11px] font-mono">
                  4-ZONE SPLIT-SCREEN
                </Badge>
              </div>

              {/* Multi-Zone TV Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">

                {/* ZONE 1 (Left 7 Cols): Video / Brand Promo */}
                <div className="lg:col-span-7 rounded-xl bg-black/40 border border-cyan-500/30 p-5 sm:p-7 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden min-h-[220px]">
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold uppercase">
                    Zone 1 · 4K Video
                  </div>

                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-xs font-bold tracking-wider uppercase mb-2.5">
                      <Flame className="w-3.5 h-3.5" />
                      FEATURED PROMO
                    </span>
                    <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                      {current.headline}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-cyan-100/90 leading-relaxed max-w-md">
                      {current.sub}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                    <span className="truncate max-w-[200px]">{dict.activePlaylist}</span>
                    <span className="font-mono text-cyan-400">1080p 60FPS</span>
                  </div>
                </div>

                {/* ZONE 2 (Right 5 Cols): Menu / Price List / Announcements */}
                <div className="lg:col-span-5 rounded-xl bg-slate-950/70 border border-slate-800 p-4 sm:p-5 flex flex-col justify-between backdrop-blur-sm relative">
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px] font-bold uppercase">
                    Zone 2 · Live Menu
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-3">
                      DAILY SELECTION & PRICING
                    </span>
                    <div className="space-y-2.5 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                        <span className="font-medium text-white">{current.menuItem1.split("—")[0]}</span>
                        <strong className="font-mono text-cyan-300 font-bold">{current.menuItem1.split("—")[1]}</strong>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                        <span className="font-medium text-white">{current.menuItem2.split("—")[0]}</span>
                        <strong className="font-mono text-cyan-300 font-bold">{current.menuItem2.split("—")[1]}</strong>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                        <span className="font-medium text-white">{current.menuItem3.split("—")[0]}</span>
                        <strong className="font-mono text-cyan-300 font-bold">{current.menuItem3.split("—")[1]}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Auto-sync with POS</span>
                    <span className="text-emerald-400 font-semibold">100% Offline Valid</span>
                  </div>
                </div>
              </div>

              {/* ZONE 3 & 4 (Bottom Ticker & QR/Clock) */}
              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-12 gap-3">
                {/* Zone 3: Live Ticker */}
                <div className="sm:col-span-9 bg-black/50 border border-cyan-500/20 backdrop-blur-md rounded-xl p-2.5 flex items-center gap-3 text-xs text-cyan-200 overflow-hidden">
                  <div className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-mono text-[10px] font-black uppercase flex-shrink-0">
                    Zone 3 · Ticker
                  </div>
                  <span className="truncate font-medium">{current.ticker}</span>
                </div>

                {/* Zone 4: QR & Clock */}
                <div className="sm:col-span-3 bg-black/50 border border-slate-800 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>12:45 PM</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 text-cyan-300 text-[10px] font-mono border border-slate-800">
                    <QrCode className="w-3 h-3 text-cyan-400" />
                    <span>Scan Menu</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Micro Caption */}
            <div className="mt-3 flex items-center justify-between px-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{dict.refreshed}</span>
              </span>
              <span
                onClick={() => setActivePreset((activePreset + 1) % presets.length)}
                className="text-cyan-400 hover:underline cursor-pointer font-medium"
              >
                Next Example Screen →
              </span>
            </div>
          </div>
        </div>

        {/* 4 Proof Numbers Bar */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/[0.08]">
          <div className="text-center p-3 rounded-2xl bg-slate-900/30 border border-white/[0.04]">
            <strong className="block text-2xl sm:text-3xl font-extrabold text-white font-mono">{statsDict.stat1Val}</strong>
            <span className="text-xs text-slate-400 mt-1 block">{statsDict.stat1Label}</span>
          </div>
          <div className="text-center p-3 rounded-2xl bg-slate-900/30 border border-white/[0.04]">
            <strong className="block text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">{statsDict.stat2Val}</strong>
            <span className="text-xs text-slate-400 mt-1 block">{statsDict.stat2Label}</span>
          </div>
          <div className="text-center p-3 rounded-2xl bg-slate-900/30 border border-white/[0.04]">
            <strong className="block text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">{statsDict.stat3Val}</strong>
            <span className="text-xs text-slate-400 mt-1 block">{statsDict.stat3Label}</span>
          </div>
          <div className="text-center p-3 rounded-2xl bg-slate-900/30 border border-white/[0.04]">
            <strong className="block text-2xl sm:text-3xl font-extrabold text-white font-mono">{statsDict.stat4Val}</strong>
            <span className="text-xs text-slate-400 mt-1 block">{statsDict.stat4Label}</span>
          </div>
        </div>

      </div>
    </section>
  )
}
