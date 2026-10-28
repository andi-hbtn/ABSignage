import type { Metadata, Viewport } from "next"
import { i18n, type Locale } from "@/lib/i18n-config"
import { getDictionary } from "@/lib/get-dictionary"
import "../globals.css"

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (i18n.locales.includes(locale as Locale) ? locale : i18n.defaultLocale) as Locale
  const dict = await getDictionary(validLocale)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://absignage.com"

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: dict.metadata.keywords.split(",").map((k) => k.trim()),
    alternates: {
      canonical: `${baseUrl}/${validLocale}`,
      languages: {
        en: `${baseUrl}/en`,
        sq: `${baseUrl}/sq`,
        it: `${baseUrl}/it`,
        de: `${baseUrl}/de`,
        "x-default": `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: validLocale,
      alternateLocale: i18n.locales.filter((l) => l !== validLocale),
      siteName: "ABSignage",
      type: "website",
    },
    icons: {
      icon: "/ab-signage-3.png",
      shortcut: "/ab-signage-3.png",
      apple: "/ab-signage-3.png",
    },
  }
}

export default async function RootLocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = (i18n.locales.includes(locale as Locale) ? locale : i18n.defaultLocale) as Locale

  return (
    <html lang={validLocale} className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#030712] text-[#f8fafc]">
        {children}
      </body>
    </html>
  )
}
