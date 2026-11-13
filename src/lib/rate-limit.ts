interface RateLimitOptions {
  /** Sa kërkesa lejohen brenda një dritareje. */
  limit: number
  /** Gjatësia e dritares, në milisekonda. */
  windowMs: number
  /** Sa çelësa mbahen në memorie njëherësh — kufi për memorien gjatë një sulmi me shumë IP. */
  maxKeys?: number
}

/**
 * Kufizues kërkesash në memorie, me dritare fikse.
 *
 * Mjafton për një instancë të vetme (kontejneri në Easypanel). Me disa instanca numëruesi
 * duhet të jetë i përbashkët (p.sh. Redis), përndryshe secila numëron më vete.
 *
 * Kthen `allow(key)`: `true` = kërkesa lejohet dhe numërohet, `false` = kufiri u arrit.
 */
export function createRateLimiter({ limit, windowMs, maxKeys = 5_000 }: RateLimitOptions) {
  const windows = new Map<string, { count: number; resetAt: number }>()

  return function allow(key: string): boolean {
    const now = Date.now()
    const current = windows.get(key)

    if (current && current.resetAt > now) {
      if (current.count >= limit) return false
      current.count += 1
      return true
    }

    if (!current && windows.size >= maxKeys) {
      for (const [storedKey, window] of windows) {
        if (window.resetAt <= now) windows.delete(storedKey)
      }
      // Ende plot (shumë IP aktive njëherësh): hiq më të vjetrat — `Map` ruan rendin e futjes.
      for (const storedKey of windows.keys()) {
        if (windows.size < maxKeys) break
        windows.delete(storedKey)
      }
    }

    // `delete` + `set` e çon çelësin në fund, që rendi i `Map`-it të mbetet «më i vjetri përpara».
    windows.delete(key)
    windows.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
}

/**
 * IP-ja e klientit, për kufizimin e kërkesave.
 *
 * - `x-real-ip`: e vendos reverse proxy-ja (Traefik në Easypanel), duke mbishkruar atë që dërgon klienti.
 * - përndryshe hopi i FUNDIT i `x-forwarded-for`: e shton proxy-ja jonë ose vetë Next.js (adresa e
 *   socket-it). I PARI është ai që shkruan klienti, ndaj mund të falsifikohet.
 * - `cf-connecting-ip` nuk përdoret: pa Cloudflare përpara, kushdo mund ta dërgojë.
 */
export function getClientIp(headers: Pick<Headers, "get">): string {
  const realIp = headers.get("x-real-ip")?.trim()
  if (realIp) return realIp

  const lastHop = headers
    .get("x-forwarded-for")
    ?.split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .at(-1)

  return lastHop || "unknown"
}
