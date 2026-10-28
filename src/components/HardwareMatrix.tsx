"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import type { Dictionary } from "@/lib/get-dictionary"
import { Tv, Sparkles, Check, CheckCircle2 } from "lucide-react"

interface HardwareMatrixProps {
  dict: Dictionary["hardware"]
}

export function HardwareMatrix({ dict }: HardwareMatrixProps) {
  const hardware = [
    {
      name: dict.h1Title,
      desc: dict.h1Desc,
      tag: dict.h1Tag,
      badgeVariant: "success" as const,
      features: [
        "Native Android TV / Google TV App",
        "4K UHD & Full HD Hardware Decoding",
        "Auto-launch on TV power-on",
        "Remote reboot & power-off controls",
      ],
    },
    {
      name: dict.h2Title,
      desc: dict.h2Desc,
      tag: dict.h2Tag,
      badgeVariant: "default" as const,
      features: [
        "Converts ANY standard TV with HDMI",
        "Affordable setup (devices cost ~$30)",
        "Zero-touch auto-restart on power loss",
        "Wi-Fi and Ethernet LAN support",
      ],
    },
    {
      name: dict.h3Title,
      desc: dict.h3Desc,
      tag: dict.h3Tag,
      badgeVariant: "secondary" as const,
      features: [
        "Certified for continuous 24/7 retail run",
        "Lockdown Kiosk Mode security",
        "Port & physical button disabling",
        "Designed for heavy commercial traffic",
      ],
    },
  ]

  return (
    <section id="hardware" className="py-24 relative overflow-hidden bg-slate-950/80 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-4">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            {dict.badge}
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {dict.title}
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* 3 Hardware Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {hardware.map((hw) => (
            <div
              key={hw.name}
              className="rounded-3xl border border-white/[0.08] bg-slate-900/60 p-8 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 group-hover:scale-110 transition-transform">
                    <Tv className="w-6 h-6" />
                  </div>
                  <Badge variant={hw.badgeVariant}>{hw.tag}</Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {hw.name}
                </h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed min-h-[36px]">
                  {hw.desc}
                </p>

                <div className="space-y-2.5 pb-6 border-t border-slate-800/80 pt-5">
                  {hw.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="p-0.5 rounded-full bg-cyan-500/20 text-cyan-400 flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-center">
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  Zero Special Cables · Plug & Play
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Callout Banner */}
        <div className="mt-12 max-w-3xl mx-auto rounded-2xl bg-slate-900/80 border border-cyan-500/30 p-5 text-center flex items-center justify-center gap-3 text-xs sm:text-sm text-cyan-200">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <span>{dict.callout}</span>
        </div>

      </div>
    </section>
  )
}
