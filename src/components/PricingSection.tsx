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
  TableProperties,
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
      tvCount: "1",
      monthlyPrice: 500,
      annualPricePerMonth: 417,
      effectiveMonthly: "500 lek",
      effectiveAnnual: "417 lek",
      desc: "Ideale për 1 ekran të vetëm – kafene, recepsion, zyrë ose butik lokal.",
      icon: Tv,
      popular: false,
      features: [
        "1 TV / Screen Connected",
        "Full HD & 4K Ultra-HD Playback",
        "100% Offline Playback Cache",
        "Unlimited Playlist Modifications",
        "Instant Remote Cloud Updates",
        "Standard Email & Chat Support",
      ],
      ctaText: `${dict.startPlan} Start`,
    },
    {
      id: "business-5",
      name: "Business 5",
      tvCount: "deri 5",
      monthlyPrice: 1900,
      annualPricePerMonth: 1583,
      effectiveMonthly: "380 lek",
      effectiveAnnual: "317 lek",
      savingsPercentage: `${dict.savePercent} 24%`,
      desc: "E përkryer për bare, restorante, klinika dhe biznese me disa ekrane.",
      icon: Layers,
      popular: false,
      features: [
        "Up to 5 Active Managed TVs",
        "Effective only 380 lek / TV",
        "Day-Parting Automated Timetable",
        "Zero-Black-Screen Diagnostics",
        "Rapid Cloud Synchronization",
        "Same-Day Technical Support",
      ],
      ctaText: `${dict.startPlan} Business 5`,
    },
    {
      id: "business-10",
      name: "Business 10",
      tvCount: "deri 10",
      monthlyPrice: 3300,
      annualPricePerMonth: 2750,
      effectiveMonthly: "330 lek",
      effectiveAnnual: "275 lek",
      savingsPercentage: `${dict.savePercent} 34%`,
      desc: "Zgjedhja kryesore për rrjete dyqanesh, supermarkete dhe qendra fitnesi.",
      icon: Zap,
      popular: true,
      features: [
        "Up to 10 Synchronized Screens",
        "Effective only 330 lek / TV",
        "Multi-Zone & Split-Screen Control",
        "Multi-User & Role Management (RBAC)",
        "Proof-of-Play Audit Verification",
        "Priority WhatsApp & Phone Support",
      ],
      ctaText: `${dict.startPlan} Business 10`,
    },
    {
      id: "pro-20",
      name: "Pro 20",
      tvCount: "deri 20",
      monthlyPrice: 6000,
      annualPricePerMonth: 5000,
      effectiveMonthly: "300 lek",
      effectiveAnnual: "250 lek",
      savingsPercentage: `${dict.savePercent} 40%`,
      desc: "Për biznese me disa degë, qendra tregtare dhe ambiente me trafik të lartë.",
      icon: Building2,
      popular: false,
      features: [
        "Up to 20 Screens in Continuous Broadcast",
        "Effective only 300 lek / TV",
        "Sub-second Heartbeat Telemetry & NOC",
        "Advanced Promotional Campaign Tagging",
        "Detailed Analytics & Playback Reports",
        "24/7 Priority Engineering Assistance",
      ],
      ctaText: `${dict.startPlan} Pro 20`,
    },
    {
      id: "chain-50",
      name: "Chain 50",
      tvCount: "deri 50",
      monthlyPrice: 12500,
      annualPricePerMonth: 10417,
      effectiveMonthly: "250 lek",
      effectiveAnnual: "208 lek",
      savingsPercentage: `${dict.savePercent} 50%`,
      bestValue: true,
      desc: "Për zinxhirë kombëtarë dyqanesh, rrjete farmacish, hotele dhe fast-food.",
      icon: ShieldCheck,
      popular: false,
      features: [
        "Up to 50 Screens Managed Centrally",
        "Lowest Cost: 250 lek / TV",
        "Geographic Branch & City Segmentation",
        "Comprehensive Staff Action Audit Logs",
        "Dual Automatic Cloud Backups",
        "Dedicated Account Success Manager",
      ],
      ctaText: `${dict.startPlan} Chain 50`,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      tvCount: "Pa limit",
      monthlyPrice: 18000,
      annualPricePerMonth: 15000,
      effectiveMonthly: "-",
      effectiveAnnual: "-",
      enterprise: true,
      desc: "Për korporata të mëdha, aeroporte, billboard-e digjitale kombëtare dhe stadiume.",
      icon: Crown,
      popular: false,
      features: [
        "Unlimited Screens (No Screen Cap)",
        "Fixed Flat Cap: 18,000 lek / month",
        "Guaranteed 99.99% SLA Uptime",
        "On-Premise / Private Cloud Option",
        "Dedicated API & Webhooks Integration",
        "24/7 VIP Success Manager & Staff Training",
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
                      {plan.tvCount === "1" ? "1 TV" : plan.tvCount === "Pa limit" ? "Pa Limit TV" : `${plan.tvCount} TV`}
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
                      <span className="text-xs text-slate-400 font-medium">/ muaj</span>
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

        {/* Comparison Table */}
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <TableProperties className="w-5 h-5 text-cyan-400" />
                {dict.comparisonTable}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {dict.comparisonDesc}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Pricing 2026</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-semibold">{dict.colPackage}</th>
                  <th className="py-3 px-4 font-semibold">{dict.colCapacity}</th>
                  <th className="py-3 px-4 font-semibold">{dict.colMonthly}</th>
                  <th className="py-3 px-4 font-semibold">{dict.colEffective}</th>
                  <th className="py-3 px-4 font-semibold">{dict.colSavings}</th>
                  <th className="py-3 px-4 font-semibold text-right">{dict.colAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                {plans.map((p) => {
                  const displayedMonthly = annual ? p.annualPricePerMonth : p.monthlyPrice
                  const displayedEffective = annual ? p.effectiveAnnual : p.effectiveMonthly

                  return (
                    <tr
                      key={`table-${p.id}`}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        p.popular ? "bg-cyan-500/[0.04]" : ""
                      }`}
                    >
                      <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                        <span>{p.name}</span>
                        {p.popular && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                            {dict.mostPopular}
                          </span>
                        )}
                        {p.bestValue && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                            {dict.bestValue}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-mono font-medium text-slate-200">
                        {p.tvCount === "1" ? "1 TV" : p.tvCount === "Pa limit" ? dict.unlimited : `${p.tvCount} TV`}
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-white">
                        {formatPrice(displayedMonthly)} lek
                        <span className="text-[10px] text-slate-400 font-normal"> / muaj</span>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-cyan-300">
                        {displayedEffective !== "-" ? `${displayedEffective}` : "-"}
                      </td>
                      <td className="py-4 px-4">
                        {p.savingsPercentage ? (
                          <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                            {p.savingsPercentage} / TV
                          </span>
                        ) : p.enterprise ? (
                          <span className="text-[11px] font-mono text-sky-400 font-semibold">
                            {dict.fixedPrice}
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-500">
                            {dict.basePrice}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button
                          size="sm"
                          variant={p.popular ? "default" : "outline"}
                          onClick={onOpenDemo}
                          className="h-8 text-xs font-semibold"
                        >
                          {dict.selectBtn}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Guarantees */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{dict.guarantee1}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{dict.guarantee2}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{dict.guarantee3}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
