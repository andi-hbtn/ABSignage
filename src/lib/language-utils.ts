import { languages, type Locale } from "@/lib/i18n-config"

/**
 * Navigates to the same page in the target locale while:
 * 1. Preserving exact current vertical scroll position.
 * 2. Removing any stale anchor hash (e.g. #features, #pricing) so the browser
 *    doesn't jump to an unintended section.
 * 3. Instructing Next.js router not to auto-scroll to the top ({ scroll: false }).
 */
export function switchLanguage(
  newLocale: Locale,
  currentLocale: Locale,
  pathname: string,
  router: { push: (url: string, options?: { scroll?: boolean }) => void }
) {
  if (newLocale === currentLocale) return

  if (typeof window !== "undefined") {
    // 1. Memorize exact current scroll position in pixels
    const currentScroll = window.scrollY
    sessionStorage.setItem("ab_saved_scroll", currentScroll.toString())

    // 2. Set NEXT_LOCALE cookie for consistent server/proxy locale detection
    document.cookie = `NEXT_LOCALE=${newLocale}; Path=/; max-age=31536000; SameSite=Lax`

    // 3. Clear any active anchor hash from the URL history
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search)
    }
  }

  // 3. Compute clean target pathname without hash
  let newPathname = pathname
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length > 0 && languages.some((l) => l.code === segments[0])) {
    segments[0] = newLocale
    newPathname = `/${segments.join("/")}`
  } else {
    newPathname = `/${newLocale}${pathname === "/" ? "" : pathname}`
  }

  // 4. Smooth client transition without Next.js scrolling to top
  router.push(newPathname, { scroll: false })
}
