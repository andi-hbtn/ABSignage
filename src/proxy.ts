import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n, type Locale } from "./lib/i18n-config"

function getLocale(request: NextRequest): Locale {
  // 1. Check cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value as Locale | undefined
  if (cookieLocale && i18n.locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language")
  if (acceptLanguage) {
    const preferredLanguages = acceptLanguage
      .split(",")
      .map((lang) => {
        const [code, priority] = lang.trim().split(";q=")
        return {
          code: code.trim().toLowerCase().split("-")[0] as Locale,
          priority: priority ? parseFloat(priority) : 1.0,
        }
      })
      .sort((a, b) => b.priority - a.priority)

    for (const pref of preferredLanguages) {
      if (i18n.locales.includes(pref.code)) {
        return pref.code
      }
    }
  }

  return i18n.defaultLocale as Locale
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip static files, Next.js internal paths, and API routes
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") || // files like favicon.ico, images, logos
    pathname.startsWith("/public")
  ) {
    return NextResponse.next()
  }

  // Check if pathname already contains any supported locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // Redirect to localized path, preserving search params
    const redirectUrl = new URL(
      `/${locale}${pathname === "/" ? "" : pathname}${request.nextUrl.search}`,
      request.url
    )

    const response = NextResponse.redirect(redirectUrl)
    response.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 })
    return response
  }

  // If already localized, update/set the cookie with the active locale
  const activeLocale = pathname.split("/")[1] as Locale
  const response = NextResponse.next()
  if (i18n.locales.includes(activeLocale)) {
    response.cookies.set("NEXT_LOCALE", activeLocale, { path: "/", maxAge: 60 * 60 * 24 * 365 })
  }
  return response
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and static assets
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|.*\\..*).*)"],
}

export default proxy

