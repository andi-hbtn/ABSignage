"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/LanguageSelector"
import { languages, type Locale } from "@/lib/i18n-config"
import { switchLanguage } from "@/lib/language-utils"
import type { Dictionary } from "@/lib/get-dictionary"
import {
  Menu,
  X,
  Layers,
  Sparkles,
  HelpCircle,
  CreditCard,
  Globe,
  Check,
  ChevronDown,
} from "lucide-react"

interface NavbarProps {
  dict: Dictionary["nav"]
  locale: Locale
  onOpenDemo: () => void
}

export function Navbar({ dict, locale, onOpenDemo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileLangOpen, setMobileLangOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const currentLang = languages.find((l) => l.code === locale) || languages[0]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile sheet on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileLangOpen(false)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const navLinks = [
    { name: dict.features, href: `/${locale}#features`, icon: Sparkles },
    { name: dict.layouts, href: `/${locale}#layouts`, icon: Layers },
    { name: dict.pricing, href: `/${locale}#pricing`, icon: CreditCard },
    { name: dict.faq, href: `/${locale}#faq`, icon: HelpCircle },
  ]

  const handleMobileSelectLanguage = (newLocale: Locale) => {
    setMobileLangOpen(false)
    setMobileMenuOpen(false)
    switchLanguage(newLocale, locale, pathname, router)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
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
                src="/AB_Signage_Logo_Transparency.png"
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

          {/* Right Action Controls (Desktop): Language Switcher + CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <LanguageSelector currentLocale={locale} />

            <Button
              size="sm"
              onClick={onOpenDemo}
              className="text-xs h-9 px-4 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-slate-950 hover:brightness-110 font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all cursor-pointer"
            >
              {dict.requestDemo}
            </Button>
          </div>

          {/* Right Action Controls (Mobile): Language Trigger + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                setMobileLangOpen(true)
              }}
              aria-label="Select language"
              className="flex items-center gap-1.5 px-3 py-2 min-h-[38px] rounded-xl border border-slate-700/80 bg-slate-900/90 text-slate-200 hover:text-white hover:border-cyan-500/40 text-xs font-semibold shadow-sm touch-manipulation active:scale-[0.98] cursor-pointer"
            >
              <span className="text-base leading-none">{currentLang.flag}</span>
              <span className="uppercase tracking-wide font-bold">{currentLang.code}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileLangOpen(false)
                setMobileMenuOpen(!mobileMenuOpen)
              }}
              className="p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 touch-manipulation active:scale-95 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Menu Drawer */}
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

            {/* Language Switcher inside Mobile Hamburger Menu */}
            <div className="pt-3 pb-1 border-t border-slate-800/80">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5 px-1">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Gjuha / Language</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => {
                  const isSelected = lang.code === locale
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleMobileSelectLanguage(lang.code)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer touch-manipulation active:scale-[0.98] ${
                        isSelected
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.15)]"
                          : "bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700"
                      }`}
                    >
                      <span className="text-base leading-none">{lang.flag}</span>
                      <span className="truncate">{lang.nativeName}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 ml-auto flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenDemo()
                }}
                className="w-full text-xs h-10 font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                {dict.requestDemo}
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Dedicated Mobile Language Bottom Sheet Modal */}
      {mobileLangOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Dark Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={() => setMobileLangOpen(false)}
            aria-hidden="true"
          />

          {/* Bottom Sheet Drawer */}
          <div className="relative z-10 w-full bg-slate-950 border-t border-cyan-500/40 rounded-t-3xl p-5 pb-8 shadow-2xl animate-in slide-in-from-bottom-8 duration-200">
            {/* Drag Handle Indicator */}
            <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white tracking-wide">
                  Zgjidhni Gjuhën / Select Language
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileLangOpen(false)}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white cursor-pointer active:scale-95 transition-all"
                aria-label="Close language selector"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Large, Comfortable Touch Rows */}
            <div className="space-y-2.5">
              {languages.map((lang) => {
                const isSelected = lang.code === locale
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleMobileSelectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-sm font-semibold transition-all touch-manipulation cursor-pointer active:scale-[0.98] ${
                      isSelected
                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                        : "bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl leading-none">{lang.flag}</span>
                      <div className="text-left">
                        <span className="block font-bold text-white">{lang.nativeName}</span>
                        <span className="block text-xs text-slate-400 font-normal">
                          {lang.name}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
