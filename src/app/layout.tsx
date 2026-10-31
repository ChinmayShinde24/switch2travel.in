import type { Metadata } from "next"
import "./globals.css"
import {
  Amarante,
  Cormorant_Garamond,
  Geist,
  Lato,
  Open_Sans,
  Roboto_Condensed,
} from "next/font/google"
import { Providers } from "@/components/layout/providers"
import { cn } from "@/lib/utils"

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const amarante = Amarante({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-editorial",
  display: "swap",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Switch2Travel",
  description: "Travel made easier",
  icons: {
    icon: [
      {
        url: "/favicon-white.png",
        type: "image/png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-32-black.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-16-black.png",
        type: "image/png",
        sizes: "16x16",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans",
        robotoCondensed.variable,
        geist.variable,
        cormorantGaramond.variable,
        amarante.variable,
        lato.variable,
        openSans.variable
      )}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
