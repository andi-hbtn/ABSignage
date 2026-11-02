"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/get-dictionary"
import {
  Check,
  ArrowRight,
  Tv,
  Layers,
  Zap,
  Building2,
  ShieldCheck,
  Crown,
  Sparkles,
  CheckCircle2,
} from "lucide-react"

interface PricingSectionProps {
  dict: Dictionary["pricing"]
  onOpenDemo: () => void
}

interface PricingPlan {
  id: string
  name: string
  tvCount: string
  monthlyPrice: number
  annualPricePerMonth: number
  effectiveMonthly: string
  effectiveAnnual: string
  savingsPercentage?: string
  desc: string
  popular?: boolean
  bestValue?: boolean
  enterprise?: boolean
  icon: React.ElementType
  features: string[]
  ctaText: string
}

export function PricingSection({ dict, onOpenDemo }: PricingSectionProps) {
  const [annual, setAnnual] = useState(false)

  const plans: PricingPlan[] = [
    {
      id: "start",
      name: "Start",
      tvCount: "1 TV",
      monthlyPrice: 500,
      annualPricePerMonth: 417,
      effectiveMonthly: "500 lek",
      effectiveAnnual: "417 lek",
      desc: dict.planStartDesc,
      icon: Tv,
      popular: false,
      features: [
        dict.startF1,
        dict.startF2,
        dict.startF3,
        dict.startF4,
        dict.startF5,
        dict.startF6,
      ],
      ctaText: `${dict.startPlan} Start`,
    },
    {
      id: "business-5",
      name: "Business 5",
      tvCount: `${dict.upTo} 5 TV`,
      monthlyPrice: 1900,
      annualPricePerMonth: 1583,
      effectiveMonthly: "380 lek",
      effectiveAnnual: "317 lek",
      savingsPercentage: `${dict.savePercent} 24%`,
      desc: dict.planB5Desc,
      icon: Layers,
      popular: false,
      features: [
        dict.b5F1,
        dict.b5F2,
        dict.b5F3,
        dict.b5F4,
        dict.b5F5,
        dict.b5F6,
      ],
      ctaText: `${dict.startPlan} Business 5`,
    },
    {
      id: "business-10",
      name: "Business 10",
      tvCount: `${dict.upTo} 10 TV`,
      monthlyPrice: 3300,
      annualPricePerMonth: 2750,
      effectiveMonthly: "330 lek",
      effectiveAnnual: "275 lek",
      savingsPercentage: `${dict.savePercent} 34%`,
      desc: dict.planB10Desc,
      icon: Zap,
      popular: true,
      features: [
        dict.b10F1,
        dict.b10F2,
        dict.b10F3,
        dict.b10F4,
        dict.b10F5,
        dict.b10F6,
      ],
      ctaText: `${dict.startPlan} Business 10`,
    },
    {
      id: "pro-20",
      name: "Pro 20",
      tvCount: `${dict.upTo} 20 TV`,
      monthlyPrice: 6000,
      annualPricePerMonth: 5000,
      effectiveMonthly: "300 lek",
      effectiveAnnual: "250 lek",
      savingsPercentage: `${dict.savePercent} 40%`,
      desc: dict.planP20Desc,
      icon: Building2,
      popular: false,
      features: [
        dict.p20F1,
        dict.p20F2,
        dict.p20F3,
        dict.p20F4,
        dict.p20F5,
        dict.p20F6,
      ],
      ctaText: `${dict.startPlan} Pro 20`,
    },
    {
      id: "chain-50",
      name: "Chain 50",
      tvCount: `${dict.upTo} 50 TV`,
      monthlyPrice: 12500,
      annualPricePerMonth: 10417,
      effectiveMonthly: "250 lek",
      effectiveAnnual: "208 lek",
      savingsPercentage: `${dict.savePercent} 50%`,
      bestValue: true,
      desc: dict.planC50Desc,
      icon: ShieldCheck,
      popular: false,
      features: [
        dict.c50F1,
        dict.c50F2,
        dict.c50F3,
        dict.c50F4,
        dict.c50F5,
        dict.c50F6,
      ],
      ctaText: `${dict.startPlan} Chain 50`,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tvCount: dict.unlimitedTv,
      monthlyPrice: 18000,
      annualPricePerMonth: 15000,
      effectiveMonthly: "-",
      effectiveAnnual: "-",
      enterprise: true,
      desc: dict.planEntDesc,
      icon: Crown,
      popular: false,
      features: [
        dict.entF1,
        dict.entF2,
        dict.entF3,
        dict.entF4,
        dict.entF5,
        dict.entF6,
      ],
      ctaText: `${dict.startPlan} Enterprise`,
    },
  ]

  const formatPrice = (val: number) => val.toLocaleString("en-US")

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-14">
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

          {/* Monthly / Annual Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-inner">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                !annual
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {dict.monthlyToggle}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                annual
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>{dict.annualToggle}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                annual
                  ? "bg-slate-950 text-cyan-300"
                  : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              }`}>
                {dict.twoMonthsFree}
              </span>
            </button>
          </div>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-16">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            const displayedPrice = annual ? plan.annualPricePerMonth : plan.monthlyPrice
            const displayedEffective = annual ? plan.effectiveAnnual : plan.effectiveMonthly

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative group ${
                  plan.popular
                    ? "bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-cyan-400 shadow-[0_0_40px_rgba(0,229,255,0.22)] lg:-translate-y-2 z-10"
                    : plan.bestValue
                    ? "bg-slate-900/70 border border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.1)]"
                    : plan.enterprise
                    ? "bg-slate-900/70 border border-sky-500/40 hover:border-sky-400 shadow-[0_0_25px_rgba(14,165,233,0.1)]"
                    : "bg-slate-900/50 border border-white/[0.08] hover:border-slate-700"
                }`}
              >
                {/* Floating Badges */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                    {dict.mostPopular}
                  </div>
                )}
                {plan.bestValue && !plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-600 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-slate-950" />
                    {dict.bestValue}
                  </div>
                )}
                {plan.enterprise && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-400 to-indigo-600 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <Crown className="w-3.5 h-3.5 fill-slate-950" />
                    {dict.enterpriseBadge}
                  </div>
                )}

                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2.5 rounded-xl border ${
                        plan.popular
                          ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-300"
                          : plan.bestValue
                          ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
                          : plan.enterprise
                          ? "bg-sky-500/20 border-sky-400/40 text-sky-300"
                          : "bg-slate-800 border-slate-700 text-slate-300"
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">{plan.name}</h3>
                    </div>

                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-cyan-300">
                      {plan.tvCount}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-6 leading-relaxed min-h-[36px]">
                    {plan.desc}
                  </p>

                  {/* Price Box */}
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                        {formatPrice(displayedPrice)}
                      </span>
                      <span className="text-sm font-semibold text-cyan-300">lek</span>
                      <span className="text-xs text-slate-400 font-medium">{dict.monthPer}</span>
                    </div>

                    {annual && (
                      <p className="text-[11px] text-cyan-400 mt-1 font-mono">
                        {formatPrice(displayedPrice * 12)} lek {dict.yearUnit}
                      </p>
                    )}

                    {/* Effective Price Highlight */}
                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{dict.effectivePerTv}</span>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-white font-mono font-bold">
                          {displayedEffective !== "-" ? `${displayedEffective} / TV` : dict.unlimited}
                        </strong>
                        {plan.savingsPercentage && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
                            {plan.savingsPercentage}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 pb-8 border-t border-slate-800/80 pt-6">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <Button
                  variant={plan.popular ? "default" : plan.bestValue ? "secondary" : "outline"}
                  onClick={onOpenDemo}
                  className={`w-full text-xs font-bold ${
                    plan.bestValue && !plan.popular
                      ? "border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40"
                      : ""
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            )
          })}
        </div>



      </div>
    </section>
  )
}
