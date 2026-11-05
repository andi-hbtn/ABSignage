"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { Dictionary } from "@/lib/get-dictionary"
import {
  Maximize2,
  Columns2,
  Columns3,
  Rows2,
  Rows3,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react"

interface ScreenZonesShowcaseProps {
  dict: Dictionary["layouts"]
}

const ZONE_IMAGES = {
  fullscreen: {
    src: "/images/product-demo-references/idea_10.jpeg",
    alt: "High-Definition Brand Spotlight Commercial Campaign",
    position: "object-center",
  },
  dualVertical: {
    left: {
      src: "/images/product-demo-references/promo.jpg",
      alt: "Restaurant Combo Meal Commercial Promotion",
      position: "object-center",
    },
    right: {
      src: "/images/product-demo-references/drinks.jpg",
      alt: "Specialty Cold Brew & Handcrafted Beverages Display",
      position: "object-center",
    },
  },
  dualHorizontal: {
    top: {
      src: "/images/product-demo-references/platter.jpg",
      alt: "Chef's Signature Steak & Pasta Promotion",
      position: "object-[center_60%]",
    },
    bottom: {
      src: "/images/product-demo-references/sandwich.jpg",
      alt: "Artisan Grilled Club Sandwich Showcase",
      position: "object-[center_55%]",
    },
  },
  tripleHorizontal: {
    top: {
      src: "/images/product-demo-references/pizza.jpg",
      alt: "Wood-Fired Artisan Pizza Horizontal Banner",
      position: "object-[center_55%]",
    },
    middle: {
      src: "/images/product-demo-references/platter.jpg",
      alt: "Signature Gourmet Platter Horizontal Banner",
      position: "object-[center_60%]",
    },
    bottom: {
      src: "/images/product-demo-references/sandwich.jpg",
      alt: "Fresh Toasted Brioche Horizontal Banner",
      position: "object-[center_55%]",
    },
  },
  tripleVertical: {
    left: {
      src: "/images/product-demo-references/promo.jpg",
      alt: "Featured Restaurant Combo Vertical Promotion",
      position: "object-center",
    },
    center: {
      src: "/images/product-demo-references/drinks.jpg",
      alt: "Iced Coffee & Cocktails Vertical Showcase",
      position: "object-center",
    },
    right: {
      src: "/images/product-demo-references/burger.jpg",
      alt: "Gourmet Double Cheeseburger Vertical Showcase",
      position: "object-[58%_center]",
    },
  },
} as const

function ZoneBackgroundImage({
  src,
  alt,
  position = "object-center",
  overlayClassName = "bg-gradient-to-b from-slate-950/80 via-slate-950/15 to-slate-950/85",
}: {
  src: string
  alt: string
  position?: string
  overlayClassName?: string
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 1024px"
        className={`object-cover ${position} pointer-events-none select-none`}
      />
      <div className={`absolute inset-0 ${overlayClassName} pointer-events-none`} />
    </>
  )
}

export function ScreenZonesShowcase({ dict }: ScreenZonesShowcaseProps) {
  const [selectedMode, setSelectedMode] = useState<1 | 2 | 3 | 4>(2)
  const [dualOrientation, setDualOrientation] = useState<"vertical" | "horizontal">("vertical")

  const modes = [
    {
      id: 1,
      title: dict.mode1Title,
      desc: dict.mode1Desc,
      icon: Maximize2,
      tag: dict.mode1Tag ?? "Fullscreen 100%",
      type: "fullscreen",
    },
    {
      id: 2,
      title: dict.mode2Title,
      desc: dict.mode2Desc,
      icon: Columns2,
      tag: dict.mode2Tag ?? "Dual Split 50/50",
      type: "dual",
    },
    {
      id: 3,
      title: dict.mode3Title,
      desc: dict.mode3Desc,
      icon: Rows3,
      tag: dict.mode3Tag ?? "33% × 3 Rows",
      type: "triple-horizontal",
    },
    {
      id: 4,
      title: dict.mode4Title,
      desc: dict.mode4Desc,
      icon: Columns3,
      tag: dict.mode4Tag ?? "33% × 3 Cols",
      type: "triple-vertical",
    },
  ]

  return (
    <section id="layouts" className="py-24 relative overflow-hidden bg-slate-950/70 border-t border-white/[0.06]">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{dict.sectionBadge ?? "DISPLAY LAYOUT ARCHITECTURE"}</span>
          </div>
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
                className={`text-left p-5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between group ${
                  isSelected
                    ? "bg-slate-900 border-cyan-400 ring-2 ring-cyan-400/20 shadow-[0_0_30px_rgba(0,229,255,0.22)]"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div
                      className={`p-2.5 rounded-xl border transition-colors ${
                        isSelected
                          ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                          : "bg-slate-800 text-slate-300 border-slate-700 group-hover:text-cyan-300"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                        isSelected
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                          : "bg-slate-800 text-slate-400 border-slate-700/60"
                      }`}
                    >
                      {mode.tag}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-base leading-snug">{mode.title}</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{mode.desc}</p>
                </div>

                {/* Wireframe Preview Box */}
                <div className="mt-5 pt-4 border-t border-slate-800/80">
                  <div
                    className={`h-11 rounded-lg border p-1 transition-all flex ${
                      isSelected
                        ? "bg-slate-950 border-cyan-500/40 shadow-inner"
                        : "bg-slate-950/60 border-slate-800"
                    }`}
                  >
                    {mode.id === 1 && (
                      <div
                        className={`w-full h-full rounded flex items-center justify-center text-[10px] font-mono font-bold ${
                          isSelected
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                            : "bg-slate-800/40 text-slate-500 border border-slate-800"
                        }`}
                      >
                        100% FULLSCREEN
                      </div>
                    )}

                    {mode.id === 2 && (
                      <div className="w-full h-full grid grid-cols-2 gap-1 text-[9px] font-mono font-bold text-center">
                        <div
                          className={`rounded flex items-center justify-center ${
                            isSelected
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                              : "bg-slate-800/40 text-slate-500 border border-slate-800"
                          }`}
                        >
                          50%
                        </div>
                        <div
                          className={`rounded flex items-center justify-center ${
                            isSelected
                              ? "bg-slate-800 text-slate-300 border border-slate-700"
                              : "bg-slate-800/40 text-slate-500 border border-slate-800"
                          }`}
                        >
                          50%
                        </div>
                      </div>
                    )}

                    {mode.id === 3 && (
                      <div className="w-full h-full grid grid-rows-3 gap-0.5 text-[8px] font-mono font-bold text-center">
                        <div
                          className={`rounded-sm flex items-center justify-center ${
                            isSelected
                              ? "bg-cyan-500/20 text-cyan-300"
                              : "bg-slate-800/40 text-slate-500"
                          }`}
                        >
                          33.3% ROW 1
                        </div>
                        <div
                          className={`rounded-sm flex items-center justify-center ${
                            isSelected
                              ? "bg-slate-800 text-slate-300"
                              : "bg-slate-800/40 text-slate-500"
                          }`}
                        >
                          33.3% ROW 2
                        </div>
                        <div
                          className={`rounded-sm flex items-center justify-center ${
                            isSelected
                              ? "bg-slate-800/60 text-slate-400"
                              : "bg-slate-800/40 text-slate-500"
                          }`}
                        >
                          33.3% ROW 3
                        </div>
                      </div>
                    )}

                    {mode.id === 4 && (
                      <div className="w-full h-full grid grid-cols-3 gap-1 text-[8px] font-mono font-bold text-center">
                        <div
                          className={`rounded flex items-center justify-center ${
                            isSelected
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                              : "bg-slate-800/40 text-slate-500 border border-slate-800"
                          }`}
                        >
                          33%
                        </div>
                        <div
                          className={`rounded flex items-center justify-center ${
                            isSelected
                              ? "bg-slate-800 text-slate-300 border border-slate-700"
                              : "bg-slate-800/40 text-slate-500 border border-slate-800"
                          }`}
                        >
                          33%
                        </div>
                        <div
                          className={`rounded flex items-center justify-center ${
                            isSelected
                              ? "bg-slate-800 text-slate-300 border border-slate-700"
                              : "bg-slate-800/40 text-slate-500 border border-slate-800"
                          }`}
                        >
                          33%
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Dynamic TV Screen Preview */}
        <div className="max-w-8xl mx-auto rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-cyan-500/30 shadow-[0_20px_60px_-15px_rgba(0,229,255,0.25)] relative">
          
          {/* TV Top Header Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-3 mb-3 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {dict.liveEngine ?? "Live Player Engine"}
              </span>
              <span className="text-slate-400 font-mono hidden sm:inline">|</span>
              <span className="font-mono text-cyan-300 font-bold hidden sm:inline">
                {dict.activeLayout}
              </span>
            </div>

            {/* Interactive Orientation Switcher for Dual Split */}
            {selectedMode === 2 && (
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/90 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 px-2 hidden sm:inline">
                  {dict.orientationLabel ?? "Orientation"}:
                </span>
                <button
                  type="button"
                  onClick={() => setDualOrientation("vertical")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    dualOrientation === "vertical"
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Columns2 className="w-3.5 h-3.5" />
                  <span>{dict.vertical ?? "Vertical (50/50)"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDualOrientation("horizontal")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    dualOrientation === "horizontal"
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Rows2 className="w-3.5 h-3.5" />
                  <span>{dict.horizontal ?? "Horizontal (50/50)"}</span>
                </button>
              </div>
            )}

            {/* Interactive Switcher between Triple Horizontal and Triple Vertical */}
            {(selectedMode === 3 || selectedMode === 4) && (
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/90 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 px-2 hidden sm:inline">
                  {dict.orientationLabel ?? "Orientation"}:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedMode(3)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    selectedMode === 3
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Rows3 className="w-3.5 h-3.5" />
                  <span>{dict.horizontal ?? "Horizontal (3 Rows)"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMode(4)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    selectedMode === 4
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Columns3 className="w-3.5 h-3.5" />
                  <span>{dict.vertical ?? "Vertical (3 Cols)"}</span>
                </button>
              </div>
            )}

            <Badge variant="default" className="text-[10px] font-mono">
              {selectedMode === 1 && "Mode: Fullscreen (100%)"}
              {selectedMode === 2 &&
                (dualOrientation === "vertical"
                  ? "Mode: Dual Split (50/50 Columns)"
                  : "Mode: Dual Split (50/50 Rows)")}
              {selectedMode === 3 && "Mode: Triple Split (33% Horizontal Rows)"}
              {selectedMode === 4 && "Mode: Triple Split (33% Vertical Columns)"}
            </Badge>
          </div>

          {/* TV Display Area (16:9 Aspect Ratio) */}
          <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-900 border border-cyan-500/20 p-3 sm:p-5 shadow-inner overflow-hidden flex flex-col justify-between">

            {/* ========================================================= */}
            {/* MODE 1: FULLSCREEN (100% DISPLAY AREA)                    */}
            {/* ========================================================= */}
            {selectedMode === 1 && (
              <div className="h-full rounded-xl bg-gradient-to-br from-blue-950/80 via-slate-950 to-cyan-950/60 border border-cyan-400/40 p-6 sm:p-10 flex flex-col justify-between animate-in fade-in duration-300 relative overflow-hidden">
                <ZoneBackgroundImage
                  src={ZONE_IMAGES.fullscreen.src}
                  alt={ZONE_IMAGES.fullscreen.alt}
                  position={ZONE_IMAGES.fullscreen.position}
                  overlayClassName="bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-950/75"
                />

                <div className="flex justify-between items-center text-xs relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm text-cyan-300 font-mono text-[11px] font-bold border border-cyan-400/30 flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5" />
                      ZONE 1 · 100% FULLSCREEN
                    </span>
                  </div>
                </div>

                <div className="my-auto text-center py-4 sm:py-6 relative z-10">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/75 backdrop-blur-sm border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest mb-3 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
                    ★ MAXIMUM COMMERCIAL IMPACT
                  </span>
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                    HIGH-DEFINITION BRAND SPOTLIGHT
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-3 border-t border-white/15 text-xs text-slate-300 font-mono relative z-10">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="h-1.5 w-28 bg-slate-800/90 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-cyan-400 rounded-full animate-pulse" />
                    </div>
                    <span className="text-[11px]">Timeline: 00:24 / 00:30</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Single Zone Active · Zero Glitch Playback</span>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODE 2: DUAL SPLIT 50/50 (VERTICAL OR HORIZONTAL)          */}
            {/* ========================================================= */}
            {selectedMode === 2 && dualOrientation === "vertical" && (
              <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-3 animate-in fade-in duration-300">
                {/* Zone 1: Left 50% - Video / Promo */}
                <div className="rounded-xl bg-gradient-to-br from-cyan-950/50 via-slate-900/80 to-blue-950/40 border border-cyan-500/40 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden">
                  <ZoneBackgroundImage
                    src={ZONE_IMAGES.dualVertical.left.src}
                    alt={ZONE_IMAGES.dualVertical.left.alt}
                    position={ZONE_IMAGES.dualVertical.left.position}
                  />
                  <div className="flex justify-between items-center text-xs relative z-10">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm text-cyan-300 font-mono font-bold text-[10px] border border-cyan-500/30">
                      ZONE 1 · 50% VERTICAL
                    </span>
                    <span className="text-emerald-400 font-mono text-[10px] font-bold drop-shadow">
                      4K VIDEO · 60 FPS
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-300 font-mono pt-2 border-t border-cyan-500/20 relative z-10">
                    <span>Left Column · 50% Display Width</span>
                    <span className="text-emerald-400">Synced Real-Time</span>
                  </div>
                </div>

                {/* Zone 2: Right 50% - Digital Menu Board */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-700/80 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden">
                  <ZoneBackgroundImage
                    src={ZONE_IMAGES.dualVertical.right.src}
                    alt={ZONE_IMAGES.dualVertical.right.alt}
                    position={ZONE_IMAGES.dualVertical.right.position}
                  />
                  <div className="flex justify-between items-center text-xs relative z-10">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm text-cyan-300 font-mono font-bold text-[10px] border border-slate-700">
                      ZONE 2 · 50% VERTICAL
                    </span>
                    <span className="text-cyan-400 font-mono text-[10px] font-bold drop-shadow">
                      LIVE MENU BOARD
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-300 font-mono pt-2 border-t border-white/15 relative z-10">
                    <span>Right Column · 50% Display Width</span>
                    <span className="text-cyan-300 font-medium">Auto-Updates via Cloud</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mode 2: Horizontal Variant (Top/Bottom 50/50) */}
            {selectedMode === 2 && dualOrientation === "horizontal" && (
              <div className="h-full grid grid-rows-2 gap-3 animate-in fade-in duration-300">
                {/* Zone 1: Top 50% Height - Wide Commercial Banner */}
                <div className="rounded-xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-cyan-950/50 border border-cyan-500/40 p-4 flex flex-col justify-between relative overflow-hidden">
                  <ZoneBackgroundImage
                    src={ZONE_IMAGES.dualHorizontal.top.src}
                    alt={ZONE_IMAGES.dualHorizontal.top.alt}
                    position={ZONE_IMAGES.dualHorizontal.top.position}
                  />
                  <div className="flex justify-between items-center text-xs relative z-10">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm text-cyan-300 font-mono font-bold text-[10px] border border-cyan-500/30">
                      ZONE 1 · 50% HORIZONTAL (TOP ROW)
                    </span>
                    <span className="text-emerald-400 font-mono text-[10px] font-bold drop-shadow">
                      VIDEO BILLBOARD · 60 FPS
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-300 font-mono pt-1.5 border-t border-cyan-500/20 relative z-10">
                    <span>Top Row · 50% Screen Height</span>
                    <span className="text-emerald-400">Hardware Video Decode</span>
                  </div>
                </div>

                {/* Zone 2: Bottom 50% Height - Wide Product Showcase */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-700/80 p-4 flex flex-col justify-between relative overflow-hidden">
                  <ZoneBackgroundImage
                    src={ZONE_IMAGES.dualHorizontal.bottom.src}
                    alt={ZONE_IMAGES.dualHorizontal.bottom.alt}
                    position={ZONE_IMAGES.dualHorizontal.bottom.position}
                  />
                  <div className="flex justify-between items-center text-xs relative z-10">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm text-cyan-300 font-mono font-bold text-[10px] border border-slate-700">
                      ZONE 2 · 50% HORIZONTAL (BOTTOM ROW)
                    </span>
                    <span className="text-cyan-300 font-mono text-[10px] font-bold drop-shadow">
                      FEATURED SPECIALS GRID
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-300 font-mono pt-1.5 border-t border-white/15 relative z-10">
                    <span>Bottom Row · 50% Screen Height</span>
                    <span className="text-cyan-300">Live Menu Feed</span>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODE 3: TRIPLE SPLIT HORIZONTAL (33% / 33% / 33% ROWS)    */}
            {/* ========================================================= */}
            {selectedMode === 3 && (
              <div className="h-full grid grid-rows-3 gap-2.5 animate-in fade-in duration-300">
                {/* Zone 1: Top 33.3% Height */}
                <div className="rounded-xl bg-gradient-to-r from-blue-950/70 via-cyan-950/40 to-slate-900 border border-cyan-500/40 px-4 py-2.5 flex items-center justify-between relative overflow-hidden">
                  <ZoneBackgroundImage
                    src={ZONE_IMAGES.tripleHorizontal.top.src}
                    alt={ZONE_IMAGES.tripleHorizontal.top.alt}
                    position={ZONE_IMAGES.tripleHorizontal.top.position}
                    overlayClassName="bg-gradient-to-r from-slate-950/75 via-slate-950/20 to-slate-950/75"
                  />
                  <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-cyan-300 font-mono font-bold text-[10px] border border-cyan-400/30 flex-shrink-0 relative z-10">
                    ZONE 1 · 33.3% TOP
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold relative z-10 drop-shadow">
                    4K PROMO
                  </span>
                </div>

                {/* Zone 2: Middle 33.3% Height */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-700/80 px-4 py-2 flex items-center justify-between relative overflow-hidden">
                  <ZoneBackgroundImage
                    src={ZONE_IMAGES.tripleHorizontal.middle.src}
                    alt={ZONE_IMAGES.tripleHorizontal.middle.alt}
                    position={ZONE_IMAGES.tripleHorizontal.middle.position}
                    overlayClassName="bg-gradient-to-r from-slate-950/75 via-slate-950/20 to-slate-950/75"
                  />
                  <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-cyan-300 font-mono font-bold text-[10px] border border-slate-700 flex-shrink-0 relative z-10">
                    ZONE 2 · 33.3% MID
                  </span>
                  <span className="text-[10px] text-cyan-300 font-mono font-bold relative z-10 drop-shadow">
                    LIVE MENU
                  </span>
                </div>

                {/* Zone 3: Bottom 33.3% Height */}
                <div className="rounded-xl bg-black/60 border border-cyan-500/30 px-4 py-2.5 flex items-center justify-between text-xs relative overflow-hidden">
                  <ZoneBackgroundImage
                    src={ZONE_IMAGES.tripleHorizontal.bottom.src}
                    alt={ZONE_IMAGES.tripleHorizontal.bottom.alt}
                    position={ZONE_IMAGES.tripleHorizontal.bottom.position}
                    overlayClassName="bg-gradient-to-r from-slate-950/75 via-slate-950/20 to-slate-950/75"
                  />
                  <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-mono font-bold text-[10px] uppercase flex-shrink-0 relative z-10">
                    ZONE 3 · 33.3% BOTTOM
                  </span>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-slate-200 flex-shrink-0 ml-3 relative z-10 drop-shadow">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>12:45 PM</span>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODE 4: TRIPLE SPLIT VERTICAL (33% / 33% / 33% COLUMNS)   */}
            {/* ========================================================= */}
            {selectedMode === 4 && (
              <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in duration-300">
                {/* Column 1: Left 33.3% Width */}
                <div className="rounded-xl bg-gradient-to-b from-cyan-950/50 via-slate-900 to-blue-950/40 border border-cyan-500/40 p-4 flex flex-col justify-between relative overflow-hidden">
                  <ZoneBackgroundImage
                    src={ZONE_IMAGES.tripleVertical.left.src}
                    alt={ZONE_IMAGES.tripleVertical.left.alt}
                    position={ZONE_IMAGES.tripleVertical.left.position}
                  />
                  <div className="flex justify-between items-center text-xs relative z-10">
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-cyan-300 font-mono font-bold text-[10px] border border-cyan-500/30">
                      ZONE 1 · 33.3% COL
                    </span>
                    <span className="text-emerald-400 font-mono text-[10px] font-bold drop-shadow">
                      VIDEO 60FPS
                    </span>
                  </div>
                  <div className="pt-2 border-t border-cyan-500/20 text-[10px] font-mono text-slate-300 flex justify-between relative z-10">
                    <span>Left Column</span>
                    <span className="text-emerald-400">Active</span>
                  </div>
                </div>

                {/* Column 2: Center 33.3% Width */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-700/80 p-4 flex flex-col justify-between relative overflow-hidden">
                  <ZoneBackgroundImage
                    src={ZONE_IMAGES.tripleVertical.center.src}
                    alt={ZONE_IMAGES.tripleVertical.center.alt}
                    position={ZONE_IMAGES.tripleVertical.center.position}
                  />
                  <div className="flex justify-between items-center text-xs relative z-10">
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-cyan-300 font-mono font-bold text-[10px] border border-slate-700">
                      ZONE 2 · 33.3% COL
                    </span>
                    <span className="text-cyan-400 font-mono text-[10px] font-bold drop-shadow">
                      BEVERAGES
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/15 text-[10px] font-mono text-slate-300 flex justify-between relative z-10">
                    <span>Center Column</span>
                    <span className="text-cyan-300">Live Menu</span>
                  </div>
                </div>

                {/* Column 3: Right 33.3% Width */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-700/80 p-4 flex flex-col justify-between relative overflow-hidden">
                  <ZoneBackgroundImage
                    src={ZONE_IMAGES.tripleVertical.right.src}
                    alt={ZONE_IMAGES.tripleVertical.right.alt}
                    position={ZONE_IMAGES.tripleVertical.right.position}
                  />
                  <div className="flex justify-between items-center text-xs relative z-10">
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-cyan-300 font-mono font-bold text-[10px] border border-slate-700">
                      ZONE 3 · 33.3% COL
                    </span>
                    <span className="text-cyan-400 font-mono text-[10px] font-bold drop-shadow">
                      FOOD & BITES
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/15 text-[10px] font-mono text-slate-300 flex justify-between relative z-10">
                    <span>Right Column</span>
                    <span className="text-emerald-400">In Stock</span>
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
