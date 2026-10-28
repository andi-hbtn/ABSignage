"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import type { Dictionary } from "@/lib/get-dictionary"
import { Layers, Maximize2, Columns, LayoutGrid, Clock, QrCode } from "lucide-react"

interface ScreenZonesShowcaseProps {
  dict: Dictionary["layouts"]
}

export function ScreenZonesShowcase({ dict }: ScreenZonesShowcaseProps) {
  const [selectedMode, setSelectedMode] = useState<1 | 2 | 3 | 4>(4)

  const modes = [
    {
      id: 1,
      title: dict.mode1Title,
      desc: dict.mode1Desc,
      icon: Maximize2,
      tag: "Fullscreen",
    },
    {
      id: 2,
      title: dict.mode2Title,
      desc: dict.mode2Desc,
      icon: Columns,
      tag: "2 Zones",
    },
    {
      id: 3,
      title: dict.mode3Title,
      desc: dict.mode3Desc,
      icon: Layers,
      tag: "3 Zones",
    },
    {
      id: 4,
      title: dict.mode4Title,
      desc: dict.mode4Desc,
      icon: LayoutGrid,
      tag: "4 Zones",
    },
  ]

  return (
    <section id="layouts" className="py-24 relative overflow-hidden bg-slate-950/70 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {dict.title}
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            {dict.subtitle}
          </p>
        </div>

        {/* Layout Mode Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {modes.map((mode) => {
            const Icon = mode.icon
            const isSelected = selectedMode === mode.id
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedMode(mode.id as 1 | 2 | 3 | 4)}
                className={`text-left p-5 rounded-2xl border transition-all duration-200 relative ${isSelected
                    ? "bg-slate-900 border-cyan-400 ring-2 ring-cyan-400/20 shadow-[0_0_25px_rgba(0,229,255,0.2)]"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl border ${isSelected
                      ? "bg-cyan-500 text-slate-950 border-cyan-400"
                      : "bg-slate-800 text-slate-300 border-slate-700"
                    }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${isSelected ? "bg-cyan-500/20 text-cyan-300" : "bg-slate-800 text-slate-400"
                    }`}>
                    {mode.tag}
                  </span>
                </div>
                <h4 className="font-bold text-white text-base leading-snug">{mode.title}</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{mode.desc}</p>
              </button>
            )
          })}
        </div>

        {/* Dynamic TV Screen Preview */}
        <div className="max-w-5xl mx-auto rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-cyan-500/30 shadow-[0_20px_60px_-15px_rgba(0,229,255,0.25)]">
          <div className="flex items-center justify-between px-2 pb-3 mb-3 border-b border-slate-800 text-xs">
            <span className="font-mono text-cyan-300 font-bold">{dict.activeLayout}</span>
            <Badge variant="default" className="text-[10px]">
              Mode: {selectedMode === 1 ? "Fullscreen" : `${selectedMode} Independent Zones`}
            </Badge>
          </div>

          <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 border border-cyan-500/20 p-4 sm:p-6 shadow-inner flex flex-col justify-between overflow-hidden">

            {/* MODE 1: FULLSCREEN */}
            {selectedMode === 1 && (
              <div className="h-full rounded-xl bg-gradient-to-r from-blue-900/40 via-cyan-900/30 to-indigo-900/40 border border-cyan-400/40 p-8 flex flex-col justify-between animate-in fade-in duration-300">
                <div className="flex justify-between items-center text-xs">
                  <Badge variant="default">FULLSCREEN 4K (ZONE 1 ONLY)</Badge>
                  <span className="text-cyan-300 font-mono">100% Display Area</span>
                </div>
                <div className="my-auto text-center py-6">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                    MAXIMUM COMMERCIAL IMPACT
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    HIGH-DEFINITION BRAND SPOTLIGHT
                  </h3>
                  <p className="text-sm sm:text-lg text-slate-300 max-w-xl mx-auto mt-3">
                    Full-bleed 4K playback ideal for showcase retail windows, video walls, and luxury hospitality.
                  </p>
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-mono">
                  <span>Seamless 60fps Loop</span>
                  <span className="text-emerald-400">Offline Cache Valid</span>
                </div>
              </div>
            )}

            {/* MODE 2: DUAL SPLIT (70/30) */}
            {selectedMode === 2 && (
              <div className="h-full grid grid-cols-1 md:grid-cols-12 gap-3.5 animate-in fade-in duration-300">
                <div className="md:col-span-8 rounded-xl bg-cyan-950/40 border border-cyan-500/40 p-6 flex flex-col justify-between">
                  <div className="flex justify-between text-xs">
                    <span className="font-mono text-cyan-300 font-bold uppercase">Zone 1 · 70% Video Screen</span>
                    <span className="text-slate-400">60 FPS</span>
                  </div>
                  <div className="my-auto py-4">
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-white">4K VIDEO CAMPAIGN</h4>
                    <p className="text-xs sm:text-sm text-cyan-100/80 mt-1">
                      Plays high-resolution commercials and brand videos continuously.
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Auto-loops every 30 seconds</span>
                </div>

                <div className="md:col-span-4 rounded-xl bg-slate-900 border border-slate-700 p-5 flex flex-col justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Zone 2 · 30% Live Menu</span>
                  <div className="space-y-2 text-xs my-auto">
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                      <span className="text-white">Cappuccino Grande</span>
                      <strong className="text-cyan-300 font-mono">220 lek</strong>
                    </div>
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                      <span className="text-white">Avocado Toast Supreme</span>
                      <strong className="text-cyan-300 font-mono">450 lek</strong>
                    </div>
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between">
                      <span className="text-white">Matcha Green Latte</span>
                      <strong className="text-cyan-300 font-mono">320 lek</strong>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">Real-time menu sync</span>
                </div>
              </div>
            )}

            {/* MODE 3: TRIPLE ZONE (3 ZONES) */}
            {selectedMode === 3 && (
              <div className="h-full flex flex-col justify-between gap-3 animate-in fade-in duration-300">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-8 rounded-xl bg-cyan-950/40 border border-cyan-500/40 p-5 flex flex-col justify-between">
                    <span className="text-xs font-mono text-cyan-300 font-bold uppercase">Zone 1 · Main Video</span>
                    <h4 className="text-2xl font-black text-white my-auto">SEASONAL PRODUCT HIGHLIGHTS</h4>
                    <span className="text-[11px] text-slate-400 font-mono">Continuous smooth playback</span>
                  </div>
                  <div className="md:col-span-4 rounded-xl bg-slate-900 border border-slate-700 p-4 flex flex-col justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Zone 2 · Daily Specials</span>
                    <div className="space-y-2 text-xs my-auto">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                        <span className="text-white">Lunch Burger Deal</span>
                        <strong className="text-cyan-300">750 lek</strong>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                        <span className="text-white">House Lemonade</span>
                        <strong className="text-cyan-300">200 lek</strong>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">Updates instantly</span>
                  </div>
                </div>

                <div className="rounded-xl bg-black/60 border border-cyan-500/30 p-2.5 flex items-center gap-3 text-xs text-cyan-200">
                  <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold uppercase text-[10px]">
                    Zone 3 · Ticker
                  </span>
                  <span className="truncate">Special Flash Offer: Show this screen to receive a free coffee with any lunch menu order!</span>
                </div>
              </div>
            )}

            {/* MODE 4: QUAD ZONE (4 ZONES) */}
            {selectedMode === 4 && (
              <div className="h-full flex flex-col justify-between gap-3 animate-in fade-in duration-300">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3">
                  {/* Zone 1 */}
                  <div className="md:col-span-7 rounded-xl bg-cyan-950/40 border border-cyan-500/40 p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-xs font-mono text-cyan-300 font-bold uppercase">Zone 1 · 4K Video</span>
                      <span className="text-emerald-400 font-mono text-[10px]">60 FPS</span>
                    </div>
                    <div className="my-auto py-2">
                      <h4 className="text-2xl font-black text-white">NEW SUMMER ARRIVALS</h4>
                      <p className="text-xs text-cyan-100/80 mt-1">Latest fashion styles and accessories now in all stores.</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Loop duration: 25s</span>
                  </div>

                  {/* Zone 2 */}
                  <div className="md:col-span-5 rounded-xl bg-slate-900 border border-slate-700 p-4 flex flex-col justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Zone 2 · Price List</span>
                    <div className="space-y-1.5 text-xs my-auto">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                        <span className="text-white">Linen Shirts</span>
                        <strong className="text-cyan-300">3,900 lek</strong>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                        <span className="text-white">Cotton Blazers</span>
                        <strong className="text-cyan-300">7,500 lek</strong>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                        <span className="text-white">Summer Shoes</span>
                        <strong className="text-cyan-300">5,200 lek</strong>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">Available in Stock</span>
                  </div>
                </div>

                {/* Bottom Row: Zone 3 and Zone 4 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  {/* Zone 3 */}
                  <div className="md:col-span-9 rounded-xl bg-black/60 border border-cyan-500/30 p-2.5 flex items-center gap-3 text-xs text-cyan-200">
                    <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold uppercase text-[10px]">
                      Zone 3 · Ticker
                    </span>
                    <span className="truncate">VIP Club Alert: Double loyalty points on all purchases today · Ask our cashier to join!</span>
                  </div>

                  {/* Zone 4 */}
                  <div className="md:col-span-3 rounded-xl bg-black/60 border border-slate-800 p-2.5 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-1 font-mono text-[11px] text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>12:45 PM</span>
                    </div>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-cyan-300 font-mono">
                      <QrCode className="w-3 h-3 text-cyan-400" />
                      <span>Scan Menu</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  )
}
