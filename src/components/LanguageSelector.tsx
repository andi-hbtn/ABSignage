"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Globe, ChevronDown, Check } from "lucide-react"
import { languages, type Locale } from "@/lib/i18n-config"
import { switchLanguage } from "@/lib/language-utils"

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

  const closeDropdown = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside, { passive: true })
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [closeDropdown])

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDropdown()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [closeDropdown])

  const handleSelectLanguage = (newLocale: Locale) => {
    closeDropdown()
    switchLanguage(newLocale, currentLocale, pathname, router)
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
        className="flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-xl border border-slate-700/80 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white hover:border-cyan-500/40 transition-all text-xs font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 touch-manipulation active:scale-[0.98] cursor-pointer"
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.nativeName}</span>
        <span className="sm:hidden uppercase tracking-wide">{currentLang.code}</span>
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
          } mt-2 w-48 rounded-2xl bg-slate-950/98 border border-cyan-500/40 p-1.5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150`}
        >
          <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 mb-1 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>Select Language</span>
          </div>

          <div className="space-y-0.5">
            {languages.map((lang) => {
              const isSelected = lang.code === currentLocale
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer touch-manipulation active:scale-[0.98] ${
                    isSelected
                      ? "bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <span className="text-left">
                      <span className="block text-slate-100 font-semibold">{lang.nativeName}</span>
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {lang.name}
                      </span>
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
