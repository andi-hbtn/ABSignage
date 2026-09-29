import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "ABSignage · Enterprise Digital Signage Management Platform",
  description: "Platforma lider enterprise për orkestrimin e ekraneve dixhitale, monitorim në kohë reale pa ekran të zi, sinkronizim offline dhe riprodhim 4K në Android TV.",
  keywords: ["digital signage", "ABSignage", "screen management", "android tv signage", "reklama dixhitale", "video wall"],
  icons: {
    icon: "/ab-signage-3.png",
    shortcut: "/ab-signage-3.png",
    apple: "/ab-signage-3.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="sq"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-[#f8fafc]">
        {children}
      </body>
    </html>
  )
}
