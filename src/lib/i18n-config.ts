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
}

export const languages: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "sq", name: "Albanian", nativeName: "Shqip", flag: "🇦🇱" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
]
