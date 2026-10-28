"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/get-dictionary"
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react"

interface CtaBannerProps {
  dict: Dictionary["ctaBanner"]
  onOpenDemo: () => void
}

export function CtaBanner({ dict, onOpenDemo }: CtaBannerProps) {
  return (
    <section className="py-20 relative overflow-hidden bg-slate-950 border-t border-white/[0.06]">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-60" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/80 border border-cyan-500/30 text-center shadow-[0_20px_60px_-15px_rgba(0,229,255,0.25)] relative overflow-hidden">
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABSignage Cloud Platform</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto leading-tight">
            {dict.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            {dict.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={onOpenDemo}
              className="w-full sm:w-auto h-12 px-8 text-sm sm:text-base font-bold shadow-[0_0_25px_rgba(0,229,255,0.4)]"
            >
              <span>{dict.primaryBtn}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <a
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-7 h-12 text-sm font-semibold text-slate-200 hover:text-white hover:border-cyan-500/40 transition-all"
            >
              <span>{dict.secondaryBtn}</span>
            </a>
          </div>

          <p className="mt-6 text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>{dict.disclaimer}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
