"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ShieldCheck, Heart, ArrowUpRight, Lock, Trash2 } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/[0.08] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">

          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="relative h-12 w-48">
              <Image
                src="/ab-signage-3.png"
                alt="ABSignage Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Platforma enterprise e menaxhimit inteligjent të ekraneve dixhitale. Zero-black-screen, orkestrim në kohë reale dhe performancë pa kompromise.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Sistemet Operacionale 100%</span>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Platforma</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="/#simulator" className="hover:text-cyan-400 transition-colors">Simulatori Live</a></li>
              <li><a href="/#fleet-noc" className="hover:text-cyan-400 transition-colors">Fleet NOC & Monitorimi</a></li>
              <li><a href="/#architecture" className="hover:text-cyan-400 transition-colors">Arkitektura Teknike</a></li>
              <li><a href="/#hardware" className="hover:text-cyan-400 transition-colors">Hardueri & Android TV</a></li>
            </ul>
          </div>

          {/* Nav Column 2: Legal & Privacy */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Privatësia & Google Play</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/privacy" className="text-cyan-300 font-semibold hover:underline flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Privacy Policy (Politika e Privatësisë)</span>
                </Link>
              </li>
              <li>
                <Link href="/data-deletion" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Kërkesë për Fshirje të Dhënash</span>
                </Link>
              </li>
              <li><span className="text-slate-500">GDPR & COPPA Compliant</span></li>
              <li><span className="text-slate-500">Google Play User Data Policy</span></li>
            </ul>
          </div>

          {/* Nav Column 3: Security & Console */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">Siguria & Garancia</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Enkriptim AES-256 në Re</span>
              </div>
              <p>Proof-of-play i certifikuar për faturim reklamash.</p>
              <div className="pt-2">
                <a
                  href="http://localhost:5173"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
                >
                  <span>Hyr në Dashboard Console</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ABSignage Platform. Të gjitha të drejtat të rezervuara.</p>
          <div className="flex items-center gap-1">
            <span>Dizajnuar & Zhvilluar me</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>nga AB</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
