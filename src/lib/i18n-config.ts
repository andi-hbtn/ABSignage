export const i18n = {
  defaultLocale: "en",
  locales: ["en", "sq", "it", "de"] as const,
}

export type Locale = (typeof i18n.locales)[number]

export interface LanguageOption {
  code: Locale
  name: string
  nativeName: string
  flag: string
  /** Flamuri si SVG te /public/flags — Windows (Chrome/Edge) nuk i shfaq emoji-t e flamujve, por shkronja (GB, AL...). */
  flagSrc: string
}

export const languages: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", flagSrc: "/flags/gb.svg" },
  { code: "sq", name: "Albanian", nativeName: "Shqip", flag: "🇦🇱", flagSrc: "/flags/al.svg" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹", flagSrc: "/flags/it.svg" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", flagSrc: "/flags/de.svg" },
]
