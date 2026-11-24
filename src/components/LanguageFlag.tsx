import Image from "next/image"
import type { LanguageOption } from "@/lib/i18n-config"

interface LanguageFlagProps {
  lang: LanguageOption
  /** Gjerësia në px; lartësia mbahet në raportin e flamurit (≈ 3:2). */
  width?: number
}

/** Flamuri i gjuhës nga `languages` te i18n-config — shfaqet njësoj në çdo shfletues dhe sistem. */
export function LanguageFlag({ lang, width = 20 }: LanguageFlagProps) {
  const height = Math.round((width * 2) / 3)

  return (
    <Image
      src={lang.flagSrc}
      alt={lang.flag}
      width={width}
      height={height}
      unoptimized
      className="shrink-0 rounded-[3px] object-cover ring-1 ring-white/15"
      style={{ width, height }}
    />
  )
}
