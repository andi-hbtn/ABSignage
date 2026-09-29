"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, ArrowRight } from "lucide-react"

export function PricingSection({ onOpenDemo }: { onOpenDemo: () => void }) {
  const [annual, setAnnual] = useState(true)

  const plans = [
    {
      name: "Starter Fleet",
      desc: "Ideale për biznese lokale, bare, restorante ose klinika me pak ekrane.",
      screens: "Deri në 5 Ekrane",
      price: annual ? 12 : 15,
      features: [
        "Transmetim 1080p & 4K",
        "100% Offline Playback Cache",
        "Ndryshime të pakufizuara playliste",
        "Sub-second Heartbeat Telemetry",
        "Mbështetje me Email brenda 24h",
      ],
      popular: false,
    },
    {
      name: "Business Pro",
      desc: "Zgjidhja më e preferuar për rrjete dyqanesh, qendra tregtare dhe supermarkete.",
      screens: "6 deri në 30 Ekrane",
      price: annual ? 10 : 13,
      features: [
        "Çdo gjë në Starter Fleet",
        "Planifikim i avancuar (Day-Parting)",
        "Parashikim Defektesh Zero-Black-Screen",
        "Proof-of-Play Kriptografik për Reklama",
        "Multi-User & Role Management (RBAC)",
        "Mbështetje me WhatsApp & Telefon",
      ],
      popular: true,
    },
    {
      name: "Enterprise & Global",
      desc: "Për aeroporte, rrjete kombëtare billboard-esh dhe korporata të mëdha.",
      screens: "30+ Ekrane të Pakufizuara",
      price: annual ? 8 : 10,
      features: [
        "Çdo gjë në Business Pro",
        "SLA e Garantuar 99.99% Uptime",
        "Mundësi instalimi On-Premise / Private Cloud",
        "API Dedicated & Webhooks",
        "Menaxher Llogarie i Përkushtuar 24/7",
        "Backup & Restore me Drill Test të rregullt",
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-4">
            Çmimet Transparente
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Planet e Thjeshta që Rriten bashkë me Biznesin Tuaj
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Nuk ka kosto të fshehura. Çmimi llogaritet për ekran në muaj, me ulje speciale për pagesë vjetore.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-900 border border-slate-800">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                !annual ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              Mujore
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                annual ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Vjetore</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-950 text-cyan-300 font-bold">
                -20% Ulje
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? "bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 border-cyan-400 shadow-[0_0_40px_rgba(0,229,255,0.2)] md:-translate-y-2"
                  : "bg-slate-900/50 border border-white/[0.08] hover:border-slate-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-bold text-[11px] uppercase tracking-wider shadow-md">
                  Më i zgjedhuri për biznese
                </div>
              )}

              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-2">
                  {plan.screens}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">{plan.desc}</p>

                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">{plan.price}€</span>
                  <span className="text-xs text-slate-400">/ ekran / muaj</span>
                </div>

                <div className="space-y-3 pb-8 border-t border-slate-800/80 pt-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant={plan.popular ? "default" : "outline"}
                onClick={onOpenDemo}
                className="w-full text-xs font-bold"
              >
                <span>Fillo me {plan.name}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
