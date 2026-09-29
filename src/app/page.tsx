"use client"

import React, { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { LiveSimulator } from "@/components/LiveSimulator"
import { FleetHealthNoc } from "@/components/FleetHealthNoc"
import { ArchitecturePillars } from "@/components/ArchitecturePillars"
import { HardwareMatrix } from "@/components/HardwareMatrix"
import { RoiCalculator } from "@/components/RoiCalculator"
import { PricingSection } from "@/components/PricingSection"
import { DemoBookingModal } from "@/components/DemoBookingModal"
import { Footer } from "@/components/Footer"

export default function HomePage() {
  const [demoModalOpen, setDemoModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Fixed Header */}
      <Navbar onOpenDemo={() => setDemoModalOpen(true)} />

      {/* Main Body */}
      <main className="flex-1">
        <Hero onOpenDemo={() => setDemoModalOpen(true)} />
        <LiveSimulator />
        <FleetHealthNoc />
        <ArchitecturePillars />
        <HardwareMatrix />
        <RoiCalculator onOpenDemo={() => setDemoModalOpen(true)} />
        <PricingSection onOpenDemo={() => setDemoModalOpen(true)} />
      </main>

      {/* Global Interactive Modal */}
      <DemoBookingModal
        open={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}
