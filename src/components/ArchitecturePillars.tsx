"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { 
  Database, 
  Server, 
  Smartphone, 
  FileCheck2, 
  Users2, 
  CalendarRange,
  ArrowRight
} from "lucide-react"

export function ArchitecturePillars() {
  const pillars = [
    {
      title: "Backend me NestJS & MySQL",
      desc: "Performancë e lartë enterprise me TypeORM migrations, pooling lidhjesh dhe API OpenAPI të gjeneruar automatikisht për integritet të plotë kontratash.",
      icon: Server,
      stat: "10,000+ Req/sec",
    },
    {
      title: "Android TV Native Player",
      desc: "Aplikacion nativ i dedikuar për Android TV me Exoplayer, mbështetje për video 4K 60FPS, sinkronizim në sfond dhe rikuperim të menjëhershëm pas ristartimit.",
      icon: Smartphone,
      stat: "Native Android 8-14",
    },
    {
      title: "Kriptim Proof-of-Play",
      desc: "Çdo transmetim reklame regjistrohet me vulë kohore kriptografike dhe dërgohet në server për auditim të saktë financiar ndaj klientëve reklamues.",
      icon: FileCheck2,
      stat: "100% Audit Trail",
    },
    {
      title: "Orkestrim Day-Parting & Orar",
      desc: "Fushatat mund të planifikohen me saktësi sekondash sipas ditëve të javës, orës së pikut, dhe rregullave të përjashtimit gjeografik.",
      icon: CalendarRange,
      stat: "Smart Scheduler",
    },
    {
      title: "Siguri Multi-Tenant & RBAC",
      desc: "Ndarje e rreptë e të dhënave sipas organizatave. Role të paracaktuara: Super Admin, Pronar Biznesi, Operator dhe Shikues vetëm-lexim.",
      icon: Users2,
      stat: "4 Nivele Rolesh",
    },
    {
      title: "Backup & Restore Automatike",
      desc: "Skripta të integruara të provës së rikthimit të të dhënave (ADR-016 restore-drill) që garantojnë mbrojtje absolute nga humbja e të dhënave.",
      icon: Database,
      stat: "Automated Drill",
    },
  ]

  return (
    <section id="architecture" className="py-24 relative overflow-hidden bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-4">
            Arkitektura Teknike
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ndërtuar për Shkallëzim Global dhe Stabilitet Absolut
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Teknologji e pastër, pa kompromise, e strukturuar me arkitekturë mikroshembullore dhe kontrata OpenAPI të garantuara.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="rounded-3xl border border-white/[0.08] bg-slate-900/60 p-7 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-md"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-cyan-300">
                    {pillar.stat}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
