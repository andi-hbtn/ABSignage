import "server-only"

import type { Locale } from "@/lib/i18n-config"
import type en from "./dictionaries/en.json"

/**
 * Përkthimet sipas udhëzuesit zyrtar të Next.js (App Router → Internationalization):
 * çdo gjuhë ka skedarin e vet te `./dictionaries/<gjuha>.json`.
 *
 * Skedarët ngarkohen vetëm në server — teksti i gjuhëve të tjera nuk shkon kurrë në
 * paketën JavaScript të klientit. Komponentët e klientit e marrin vetëm pjesën që u
 * duhet përmes props (`dict.nav`, `dict.footer`, ...).
 */
export type Dictionary = typeof en

/**
 * `Record<Locale, …>` + `Dictionary` = TypeScript kontrollon që çdo gjuhë të ketë
 * saktësisht të njëjtat çelësa si `en.json`. Një çelës që mungon del si gabim në build.
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  sq: () => import("./dictionaries/sq.json").then((module) => module.default),
  it: () => import("./dictionaries/it.json").then((module) => module.default),
  de: () => import("./dictionaries/de.json").then((module) => module.default),
}

/** Ngushton `string` → `Locale`; përdoret me `notFound()` për gjuhë të panjohura. */
export const hasLocale = (locale: string): locale is Locale =>
  Object.hasOwn(dictionaries, locale)

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]()
