import { i18n, type Locale } from "@/lib/i18n-config"
import { getDictionary } from "@/lib/get-dictionary"
import { HomePageClient } from "@/components/HomePageClient"

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = (i18n.locales.includes(locale as Locale) ? locale : i18n.defaultLocale) as Locale
  const dict = await getDictionary(validLocale)

  return <HomePageClient dict={dict} locale={validLocale} />
}
