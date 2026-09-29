"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tv,
  Activity,
  Layers,
  Cpu,
  Calculator,
  CreditCard,
  Menu,
  X,
  ArrowRight,
  ChevronRight
} from "lucide-react"

interface NavbarProps {
  onOpenDemo: () => void
}

export function Navbar({ onOpenDemo }: NavbarProps) {
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
    { name: "Simulatori Live", href: "#simulator", icon: Activity },
    { name: "Fleet NOC", href: "#fleet-noc", icon: Tv },
    { name: "Arkitektura", href: "#architecture", icon: Layers },
    { name: "Hardueri & TV", href: "#hardware", icon: Cpu },
    { name: "Kalkulatori ROI", href: "#roi-calculator", icon: Calculator },
    { name: "Çmimet", href: "#pricing", icon: CreditCard },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
        : "bg-transparent border-b border-white/[0.05]"
        }`}
    >
      <div className="w-full h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-11 w-44 sm:h-12 sm:w-52 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/ab-signage-3.png"
              alt="ABSignage Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60 rounded-lg transition-all"
              >
                <Icon className="w-4 h-4 text-cyan-400/80" />
                <span>{link.name}</span>
              </a>
            )
          })}
        </nav>

        {/* Action Controls & Status */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenDemo}
            className="border-cyan-500/40 hover:border-cyan-400 text-cyan-300"
          >
            Kërko Demo
          </Button>

          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 h-9 px-4 bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
          >
            <span>Hyr në Panel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-cyan-500/30 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Fleet NOC 99.99% Operacional</span>
            </div>
            <Badge variant="default">v2.4 Enterprise</Badge>
          </div>

          <div className="grid gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-200 hover:border-cyan-500/40 hover:bg-slate-900 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span className="font-medium text-sm">{link.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              )
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenDemo()
              }}
              className="w-full text-xs"
            >
              Kërko Demo
            </Button>
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-bold text-xs py-2"
            >
              <span>Hyr në Panel</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
