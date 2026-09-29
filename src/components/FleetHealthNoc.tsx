"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  WifiOff, 
  Zap, 
  RotateCcw, 
  Layers, 
  Eye, 
  Lock,
  HardDrive
} from "lucide-react"

export function FleetHealthNoc() {
  const problems = [
    {
      title: "Parashikim Defektesh Para Klientit",
      desc: "Algoritmi i telemetrisë dallon devijimin e orës (untrusted clock drift), bllokimin e shkarkimit të mediave apo rënien e frame-rate-it përpara se ekrani të bëhet i zi.",
      icon: Eye,
      tag: "Proactive NOC",
      color: "from-cyan-500/20 to-blue-600/20"
    },
    {
      title: "100% Fail-Safe Offline Playback",
      desc: "Të gjitha videot dhe grafikat ruhen në bazën lokale SQLite me enkriptim. Edhe nëse interneti shkëputet për ditë të tëra, ekrani vazhdon pa ndërprerje.",
      icon: HardDrive,
      tag: "Zero Downtime",
      color: "from-emerald-500/20 to-teal-600/20"
    },
    {
      title: "Sub-Second Heartbeat & Diagnostics",
      desc: "Pajisjet raportojnë çdo 60 sekonda statusin shëndetësor. Pas dy pings të humbura, serveri njofton menjëherë operatorin përgjegjës.",
      icon: Zap,
      tag: "Sub-Second Ping",
      color: "from-blue-500/20 to-indigo-600/20"
    },
    {
      title: "Re-Pairing në Distancë me 1 Klik",
      desc: "Në rast zëvendësimi të televizorit apo hardware-it, operatori gjeneron kod të ri pairing nga paneli pa pasur nevojë të shkojë fizikisht në dyqan.",
      icon: RotateCcw,
      tag: "Zero On-Site Cost",
      color: "from-purple-500/20 to-pink-600/20"
    }
  ]

  return (
    <section id="fleet-noc" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <Badge variant="default" className="mb-4">
              Filozofia Zero-Black-Screen
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Një ekran i zi në biznes nuk duhet të ndodhë kurrë
            </h2>
            <p className="mt-4 text-slate-300 text-base sm:text-lg">
              ABSignage u ndërtua me parimin arkitekturor: nëse rrjeti bie, serveri përditësohet, apo drita luhatet, ekrani yt vazhdon transmetimin me media lokale të verifikuara.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900 border border-cyan-500/30 p-3 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">SLA e Garantuar Enterprise</span>
              <span className="text-slate-400">99.99% Uptime me Kompensim Financiar</span>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="relative rounded-3xl border border-white/[0.08] bg-slate-900/50 backdrop-blur-xl p-8 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-300 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
