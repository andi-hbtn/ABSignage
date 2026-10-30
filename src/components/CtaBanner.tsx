"use client"

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
        <h2 className="text-center text-3xl sm:text-5xl font-black text-white tracking-tight max-w-1xl mx-auto leading-tight">
          {dict.title}
        </h2>

        <p className="text-center mt-4 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
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
    </section>
  )
}
