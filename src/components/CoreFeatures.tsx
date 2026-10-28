"use client"

import type { Dictionary } from "@/lib/get-dictionary"
import {
  KeyRound,
  Tv,
  Film,
  CalendarClock,
  Layers,
  HardDrive,
} from "lucide-react"

interface CoreFeaturesProps {
  dict: Dictionary["features"]
}

export function CoreFeatures({ dict }: CoreFeaturesProps) {
  const items = [
    {
      icon: KeyRound,
      title: dict.f1Title,
      desc: dict.f1Desc,
      tag: "30 Seconds",
      color: "from-cyan-500/20 to-blue-600/20",
    },
    {
      icon: Tv,
      title: dict.f2Title,
      desc: dict.f2Desc,
      tag: "Central Cloud",
      color: "from-blue-500/20 to-indigo-600/20",
    },
    {
      icon: Film,
      title: dict.f3Title,
      desc: dict.f3Desc,
      tag: "Drag & Drop",
      color: "from-sky-500/20 to-cyan-600/20",
    },
    {
      icon: CalendarClock,
      title: dict.f4Title,
      desc: dict.f4Desc,
      tag: "Day-Parting",
      color: "from-emerald-500/20 to-teal-600/20",
    },
    {
      icon: Layers,
      title: dict.f5Title,
      desc: dict.f5Desc,
      tag: "Up to 4 Zones",
      color: "from-cyan-500/20 to-teal-600/20",
    },
    {
      icon: HardDrive,
      title: dict.f6Title,
      desc: dict.f6Desc,
      tag: "100% Offline",
      color: "from-indigo-500/20 to-blue-600/20",
    },
  ]

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {dict.title}
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((feat) => {
            const Icon = feat.icon
            return (
              <div
                key={feat.title}
                className="rounded-3xl border border-white/[0.08] bg-slate-900/50 p-8 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-300 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
