"use client"

import React from "react"
import type { Dictionary } from "@/lib/get-dictionary"
import { Tv, KeyRound, UploadCloud, Rocket, ArrowRight } from "lucide-react"

interface HowItWorksProps {
  dict: Dictionary["howItWorks"]
}

export function HowItWorks({ dict }: HowItWorksProps) {
  const steps = [
    {
      num: dict.s1Num,
      title: dict.s1Title,
      desc: dict.s1Desc,
      icon: Tv,
      color: "from-cyan-500/20 to-blue-600/20",
    },
    {
      num: dict.s2Num,
      title: dict.s2Title,
      desc: dict.s2Desc,
      icon: KeyRound,
      color: "from-blue-500/20 to-indigo-600/20",
    },
    {
      num: dict.s3Num,
      title: dict.s3Title,
      desc: dict.s3Desc,
      icon: UploadCloud,
      color: "from-sky-500/20 to-cyan-600/20",
    },
    {
      num: dict.s4Num,
      title: dict.s4Title,
      desc: dict.s4Desc,
      icon: Rocket,
      color: "from-emerald-500/20 to-teal-600/20",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-slate-950">
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

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div
                key={step.num}
                className="rounded-3xl border border-white/[0.08] bg-slate-900/50 p-7 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-cyan-400/40 group-hover:text-cyan-300 transition-colors">
                      {step.num}
                    </span>
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-300 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-cyan-500/30" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
