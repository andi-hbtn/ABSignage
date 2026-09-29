"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calculator, TrendingUp, Clock, HardDrive, DollarSign, Sparkles } from "lucide-react"

export function RoiCalculator({ onOpenDemo }: { onOpenDemo: () => void }) {
  const [screenCount, setScreenCount] = useState<number>(15)
  const [hoursPerDay, setHoursPerDay] = useState<number>(14)

  // Calculations
  const hoursSavedPerMonth = Math.round(screenCount * 4.5)
  const bandwidthSavedGb = Math.round(screenCount * 28.5)
  const adRevenueCapacityEur = Math.round(screenCount * hoursPerDay * 30 * 0.45)
  const estimatedCostPerScreen = screenCount > 50 ? 9 : screenCount > 20 ? 12 : 15
  const totalCost = screenCount * estimatedCostPerScreen

  return (
    <section id="roi-calculator" className="py-24 relative overflow-hidden bg-slate-950/70 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="default" className="mb-4">
            Kalkulatori Financiar
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Llogaritni Kthimin e Investimit (ROI) për Flotën Tuaj
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Zbuloni sa orë mirëmbajtjeje kurseni çdo muaj dhe sa vlerë komerciale çliron rrjeti juaj i ekraneve.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl border border-cyan-500/30 bg-slate-900/80 p-8 sm:p-12 shadow-[0_20px_60px_-15px_rgba(0,229,255,0.2)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-white">Numri i Ekraneve në Rrjet:</label>
                  <span className="text-xl font-mono font-bold text-cyan-400">{screenCount} Ekrane</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="150"
                  value={screenCount}
                  onChange={(e) => setScreenCount(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-800 accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>3 ekrane</span>
                  <span>50</span>
                  <span>100</span>
                  <span>150+ ekrane</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-white">Orë Transmetimi në Ditë:</label>
                  <span className="text-xl font-mono font-bold text-cyan-400">{hoursPerDay} Orë/Ditë</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="24"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-800 accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>6 orë (Pjesore)</span>
                  <span>14 orë (Mall)</span>
                  <span>24 orë (Non-Stop)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
                <span className="font-semibold text-slate-300 block">Kursim i Llogaritur nga:</span>
                <p>• Zero shkuarje fizike me USB në ekran</p>
                <p>• Parandalim i gjobave për mos-shfaqje të reklamave</p>
                <p>• Përditësim i menjëhershëm me 1 klik nga celulari apo laptopi</p>
              </div>
            </div>

            {/* Right Output Dashboard */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/20 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Koha e Kursyer e Stafit / Muaj
                  </span>
                  <strong className="text-lg font-mono font-bold text-white">{hoursSavedPerMonth} Orë</strong>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4 text-emerald-400" />
                    Bandwidth i Kursyer (Delta Cache)
                  </span>
                  <strong className="text-lg font-mono font-bold text-emerald-400">{bandwidthSavedGb} GB</strong>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    Kapaciteti i të Ardhurave / Muaj
                  </span>
                  <strong className="text-xl font-mono font-bold text-cyan-300">~{adRevenueCapacityEur.toLocaleString()} €</strong>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400">Kosto e Platformës ABSignage</span>
                  <strong className="text-sm font-mono text-slate-300">~{totalCost} €/muaj</strong>
                </div>
              </div>

              <Button onClick={onOpenDemo} className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Aktivizo Ofertën me Çmim të Personalizuar
              </Button>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
