"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Check, Tv, Cpu, Monitor, Radio } from "lucide-react"

export function HardwareMatrix() {
  const hardwareTypes = [
    {
      name: "Android TV & Google TV",
      desc: "Sony Bravia, TCL, Xiaomi Mi Box, Google Chromecast with Google TV, Philips Android TV",
      features: ["4K HDR 60fps", "Zero-Touch Pairing", "Auto-Launch on Boot", "Sleep/Wake Control"],
      status: "Native Official",
      badgeVariant: "success" as const,
    },
    {
      name: "Commercial SoC Displays",
      desc: "Vestel Commercial Prime, Philips Q-Line, Elo Touch, Hisense Commercial Signage",
      features: ["24/7 Continuous Run", "Lockdown Kiosk Mode", "Port & Button Disabling", "Remote Reboot"],
      status: "Enterprise Certified",
      badgeVariant: "default" as const,
    },
    {
      name: "Micro PC & Raspberry Pi",
      desc: "Raspberry Pi 4/5, Intel NUC, Khadas VIM4, Android Box Industrial",
      features: ["Dual-HDMI Output", "Ultra-Low Power (<10W)", "Industrial Heat Dissipation", "DIN Rail Mountable"],
      status: "Pro Fleet Ready",
      badgeVariant: "secondary" as const,
    },
  ]

  return (
    <section id="hardware" className="py-24 relative overflow-hidden bg-slate-950 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-4">
            Kompatibiliteti i Harduerit
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Funksionon me Ekrane Ekzistuese dhe Pajisje të Reja
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Nuk keni nevojë të blini pajisje të shtrenjta proprietare. ABSignage instalohet në çdo Android TV, Box ekonomik apo ekran komercial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hardwareTypes.map((hw) => (
            <div
              key={hw.name}
              className="rounded-3xl border border-white/[0.08] bg-slate-900/60 p-8 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Tv className="w-8 h-8 text-cyan-400" />
                  <Badge variant={hw.badgeVariant}>{hw.status}</Badge>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{hw.name}</h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">{hw.desc}</p>

                <div className="space-y-2.5">
                  {hw.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="p-0.5 rounded-full bg-cyan-500/20 text-cyan-400">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800 text-center">
                <span className="text-xs font-mono text-cyan-300">Shkarkoni APK nga Paneli me 1-Klick</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
