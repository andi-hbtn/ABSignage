import type { Locale } from "./i18n-config"

const dictionaries = {
  en: () => import("../../messages/en.json").then((m) => m.default),
  sq: () => import("../../messages/sq.json").then((m) => m.default),
  it: () => import("../../messages/it.json").then((m) => m.default),
  de: () => import("../../messages/de.json").then((m) => m.default),
}

export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loader = dictionaries[locale] || dictionaries.en
  return loader()
}
