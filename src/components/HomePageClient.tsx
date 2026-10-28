"use client"

import React, { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { CoreFeatures } from "@/components/CoreFeatures"
import { ScreenZonesShowcase } from "@/components/ScreenZonesShowcase"
import { HowItWorks } from "@/components/HowItWorks"
import { HardwareMatrix } from "@/components/HardwareMatrix"
import { PricingSection } from "@/components/PricingSection"
import { FaqSection } from "@/components/FaqSection"
import { CtaBanner } from "@/components/CtaBanner"
import { DemoBookingModal } from "@/components/DemoBookingModal"
import { Footer } from "@/components/Footer"
import type { Dictionary } from "@/lib/get-dictionary"
import type { Locale } from "@/lib/i18n-config"

interface HomePageClientProps {
  dict: Dictionary
  locale: Locale
}

export function HomePageClient({ dict, locale }: HomePageClientProps) {
  const [demoModalOpen, setDemoModalOpen] = useState(false)

  const handleOpenDemo = () => setDemoModalOpen(true)
  const handleCloseDemo = () => setDemoModalOpen(false)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Fixed Header with Language Selector & Nav */}
      <Navbar
        dict={dict.nav}
        locale={locale}
        onOpenDemo={handleOpenDemo}
      />

      {/* Main Narrative Flow */}
      <main className="flex-1">
        {/* 1. Hero: Core Value, Pairing Code, Live Multi-Zone Preview */}
        <Hero
          dict={dict.hero}
          statsDict={dict.stats}
          onOpenDemo={handleOpenDemo}
        />


        {/* 3. Core Product Capabilities & Benefits */}
        <CoreFeatures
          dict={dict.features}
        />

        {/* 4. Split-Screen & Up to 4 Zones Showcase */}
        <ScreenZonesShowcase
          dict={dict.layouts}
        />

        {/* 5. 4 Simple Steps to Connect & Publish */}
        <HowItWorks
          dict={dict.howItWorks}
        />

        {/* 6. Hardware Compatibility (Android TV, Budget TV Boxes, Commercial) */}
        <HardwareMatrix
          dict={dict.hardware}
        />


        {/* 9. Transparent Pricing (Start, Business 5, Business 10, Pro 20, Chain 50, Enterprise) */}
        <PricingSection
          dict={dict.pricing}
          onOpenDemo={handleOpenDemo}
        />

        {/* 10. Frequently Asked Questions */}
        <FaqSection
          dict={dict.faq}
        />

        {/* 11. Closing Conversion Banner */}
        <CtaBanner
          dict={dict.ctaBanner}
          onOpenDemo={handleOpenDemo}
        />
      </main>

      {/* Demo / 14-Day Free Trial Modal */}
      <DemoBookingModal
        dict={dict.modal}
        open={demoModalOpen}
        onClose={handleCloseDemo}
      />

      {/* Localized Footer */}
      <Footer
        dict={dict.footer}
        locale={locale}
      />
    </div>
  )
}
