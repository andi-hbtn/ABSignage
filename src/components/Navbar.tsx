"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/LanguageSelector"
import type { Locale } from "@/lib/i18n-config"
import type { Dictionary } from "@/lib/get-dictionary"
import {
  Menu,
  X,
  Layers,
  Sparkles,
  HelpCircle,
  CreditCard,
} from "lucide-react"

interface NavbarProps {
  dict: Dictionary["nav"]
  locale: Locale
  onOpenDemo: () => void
}

export function Navbar({ dict, locale, onOpenDemo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: dict.features, href: `/${locale}#features`, icon: Sparkles },
    { name: dict.layouts, href: `/${locale}#layouts`, icon: Layers },
    { name: dict.pricing, href: `/${locale}#pricing`, icon: CreditCard },
    { name: dict.faq, href: `/${locale}#faq`, icon: HelpCircle },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-b border-white/[0.05]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <div className="relative h-11 w-44 sm:h-12 sm:w-52 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/ab-digital-signage.png"
              alt="ABSignage Logo"
              fill
              sizes="(max-width: 640px) 176px, 208px"
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            return (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:bg-slate-900/60 rounded-xl transition-all"
              >
                <span>{link.name}</span>
              </a>
            )
          })}
        </nav>

        {/* Right Action Controls: Language Switcher + CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <LanguageSelector currentLocale={locale} />

          <Button
            size="sm"
            onClick={onOpenDemo}
            className="text-xs h-9 px-4 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-slate-950 hover:brightness-110 font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
          >
            {dict.requestDemo}
          </Button>
        </div>

        {/* Mobile Hamburger & Language Selector */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSelector currentLocale={locale} />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 border-b border-cyan-500/30 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="grid gap-1 pt-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 hover:border-cyan-500/40 hover:bg-slate-900 transition-all text-sm font-medium"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.name}</span>
                </a>
              )
            })}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <Button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenDemo()
              }}
              className="w-full text-xs h-10 font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20"
            >
              {dict.requestDemo}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
