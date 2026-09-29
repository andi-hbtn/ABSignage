"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  Sparkles, 
  Tv, 
  Wifi, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Radio,
  Clock
} from "lucide-react"

interface HeroProps {
  onOpenDemo: () => void
}

export function Hero({ onOpenDemo }: HeroProps) {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0)

  const screens = [
    {
      title: "Flagship Retail 4K Video Wall",
      location: "Tirana City Center Mall · Ekrani #01",
      resolution: "3840 x 2160 (4K UHD)",
      fps: "60 FPS",
      status: "ONLINE · SYNCED",
      content: {
        headline: "KOLAKSIONI I RI VEROR 2026",
        sub: "Ulje Ekskluzive deri në 50% në të gjitha dyqanet partnere",
        tag: "KAMPANJË DINAMIKE",
        bgGradient: "from-blue-900 via-indigo-950 to-slate-950",
      }
    },
    {
      title: "Airport Flight Schedule & Ads",
      location: "Durrës Terminal A · Ekrani #07",
      resolution: "1920 x 1080 (FHD 60Hz)",
      fps: "60 FPS",
      status: "ONLINE · SYNCED",
      content: {
        headline: "NISJET NDËRKOMBËTARE · LIVE SCHEDULE",
        sub: "Fluturimi AB-402 drejt Mynihut: Nisi Boarding në Portën 04",
        tag: "SCHEDULE REAL-TIME",
        bgGradient: "from-cyan-950 via-slate-900 to-slate-950",
      }
    },
    {
      title: "Corporate HQ Interactive Lobby",
      location: "Prishtina Tech Campus · Ekrani #12",
      resolution: "3840 x 1080 (Ultra-Wide)",
      fps: "59.9 FPS",
      status: "ONLINE · CACHED",
      content: {
        headline: "MIRË SE VINI NË ANTIGRAVITY INNOVATION SUMMIT",
        sub: "Konferenca kryesore nis në orën 10:00 në Sallën e Madhe",
        tag: "BROADCAST KOMPANIE",
        bgGradient: "from-emerald-950 via-slate-900 to-slate-950",
      }
    },
    {
      title: "QSR Digital Menu Board",
      location: "Vlorë Waterfront Drive-Thru · Ekrani #03",
      resolution: "1920 x 1080 (FHD 60Hz)",
      fps: "60 FPS",
      status: "ONLINE · SYNCED",
      content: {
        headline: "MENYJA DITORE & OFERTA GOURMET",
        sub: "Përditësim automatik i çmimeve sipas stokut dhe orës",
        tag: "DAY-PARTING MENU",
        bgGradient: "from-amber-950 via-stone-900 to-slate-950",
      }
    }
  ]

  const currentScreen = screens[activeScreenIndex]

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Gradients & Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute inset-0 grid-pattern opacity-40 -z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow Badge */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold mb-8 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Platforma Enterprise e Menaxhimit të Ekraneve Dixhitale</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-slate-400 font-normal">Next-Gen Architecture</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.1]">
            Shndërroni çdo ekran në një{" "}
            <span className="text-gradient-cyan-blue block sm:inline">
              Rrjet Inteligjent Reklamimi
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Orkestrim pa vonesë në re, parashikim i defekteve para se ekrani të bëhet i zi, sinkronizim inteligjent dhe riprodhim pa ndërprerje në qindra pajisje Android TV e ekrane profesionale.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              onClick={onOpenDemo}
              className="w-full sm:w-auto text-base group"
            >
              <span>Nis Provën Falas (14 Ditë)</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <a
              href="#simulator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl border border-cyan-500/40 bg-slate-900/80 px-7 h-12 text-base font-semibold text-cyan-300 hover:bg-cyan-950/40 hover:border-cyan-400 transition-all shadow-[0_0_20px_rgba(0,229,255,0.1)]"
            >
              <Play className="w-4 h-4 fill-cyan-400 text-cyan-400" />
              <span>Provo Simulatorin Live</span>
            </a>
          </div>

          {/* Trust Metrics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl w-full pt-8 border-t border-white/[0.08]">
            <div className="text-center">
              <strong className="block text-2xl sm:text-3xl font-bold text-white tracking-tight">0.00 sekonda</strong>
              <span className="text-xs sm:text-sm text-slate-400">Kohë ekrani të zi (Fail-safe)</span>
            </div>
            <div className="text-center">
              <strong className="block text-2xl sm:text-3xl font-bold text-cyan-400 tracking-tight">99.99%</strong>
              <span className="text-xs sm:text-sm text-slate-400">Disponueshmëri e Flotës</span>
            </div>
            <div className="text-center">
              <strong className="block text-2xl sm:text-3xl font-bold text-white tracking-tight">6-Shifror</strong>
              <span className="text-xs sm:text-sm text-slate-400">Pairing i menjëhershëm</span>
            </div>
            <div className="text-center">
              <strong className="block text-2xl sm:text-3xl font-bold text-cyan-400 tracking-tight">100% Offline</strong>
              <span className="text-xs sm:text-sm text-slate-400">Cache lokal i pavarur</span>
            </div>
          </div>
        </div>

        {/* Interactive Hero Visual Showcase */}
        <div className="mt-16 relative">
          <div className="relative mx-auto max-w-5xl rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-slate-950 border border-cyan-500/30 shadow-[0_20px_60px_-15px_rgba(0,229,255,0.3)]">
            
            {/* Screen Selector Tabs */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-white/[0.08] flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                  ABSignage Enterprise Display Controller · ID: 409-TV
                </span>
              </div>

              {/* Selector Pills */}
              <div className="flex items-center gap-1 overflow-x-auto py-1">
                {screens.map((scr, idx) => (
                  <button
                    key={scr.title}
                    onClick={() => setActiveScreenIndex(idx)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                      activeScreenIndex === idx
                        ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    Ekrani {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Display Screen Frame */}
            <div className={`mt-3 relative rounded-2xl overflow-hidden border border-cyan-500/30 aspect-[16/9] bg-gradient-to-br ${currentScreen.content.bgGradient} p-6 sm:p-10 flex flex-col justify-between shadow-inner`}>
              
              {/* Screen Top Status Bar */}
              <div className="flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="font-semibold text-emerald-400">{currentScreen.status}</span>
                  <span className="text-white/40">|</span>
                  <span>{currentScreen.fps}</span>
                  <span className="text-white/40">|</span>
                  <span>{currentScreen.resolution}</span>
                </div>

                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <Tv className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-cyan-300 font-medium">{currentScreen.location}</span>
                </div>
              </div>

              {/* Active Broadcast Content Graphic */}
              <div className="my-auto py-6">
                <span className="inline-block px-3 py-1 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold tracking-widest uppercase mb-3">
                  {currentScreen.content.tag}
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl drop-shadow-md">
                  {currentScreen.content.headline}
                </h2>
                <p className="mt-3 text-sm sm:text-lg text-cyan-100/90 max-w-2xl font-normal leading-relaxed">
                  {currentScreen.content.sub}
                </p>
              </div>

              {/* Bottom Playback Ticker & Progress */}
              <div className="bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-slate-300 font-medium truncate">
                    Playlista Aktive: "Verë 2026 - Prime Time Loop (00:45s)"
                  </span>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Rifreskuar para 3 sekondash</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono">
                    HASH #a8f9c2
                  </span>
                </div>
              </div>
            </div>

            {/* Micro Device Bar */}
            <div className="mt-3 flex items-center justify-between px-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Kriptuar me AES-256 · Proof-of-Play i verifikuar</span>
              </span>
              <span className="text-cyan-400 hover:underline cursor-pointer" onClick={() => setActiveScreenIndex((activeScreenIndex + 1) % screens.length)}>
                Ndërro ekranin tjetër →
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
