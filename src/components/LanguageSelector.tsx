"use client"

import React, { useState, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Globe, ChevronDown, Check } from "lucide-react"
import { languages, type Locale } from "@/lib/i18n-config"

interface LanguageSelectorProps {
  currentLocale: Locale
  className?: string
  align?: "left" | "right"
}

export function LanguageSelector({
  currentLocale,
  className = "",
  align = "right",
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  const currentLang = languages.find((l) => l.code === currentLocale) || languages[0]

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSelectLanguage = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false)
      return
    }

    // Calculate new path while preserving subpages and query parameters
    let newPathname = pathname
    const segments = pathname.split("/").filter(Boolean)

    if (segments.length > 0 && languages.some((l) => l.code === segments[0])) {
      segments[0] = newLocale
      newPathname = `/${segments.join("/")}`
    } else {
      newPathname = `/${newLocale}${pathname === "/" ? "" : pathname}`
    }

    // Preserve any window hash like #pricing
    const currentHash = typeof window !== "undefined" ? window.location.hash : ""
    const targetUrl = `${newPathname}${currentHash}`

    setIsOpen(false)
    router.push(targetUrl)
    router.refresh()
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white hover:border-cyan-500/40 transition-all text-xs font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.nativeName}</span>
        <span className="sm:hidden uppercase">{currentLang.code}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-cyan-400" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Languages"
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-44 rounded-2xl bg-slate-950/95 border border-cyan-500/30 p-1.5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150`}
        >
          <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 border-b border-slate-800/80 mb-1 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>Select Language</span>
          </div>

          <div className="space-y-0.5">
            {languages.map((lang) => {
              const isSelected = lang.code === currentLocale
              return (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span className="text-left">
                      <span className="block">{lang.nativeName}</span>
                      <span className="block text-[10px] text-slate-500 font-normal">
                        {lang.name}
                      </span>
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
