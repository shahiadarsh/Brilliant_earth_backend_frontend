import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "sonner"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Luxury Engagement Rings & Fine Jewelry | Ritzin",
  description:
    "Ethically sourced diamonds, lab-grown diamonds, and gemstone engagement rings. Design your own ring or shop ready-to-ship collections. 20+ years of diamond innovation.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ritzin.com",
    siteName: "Ritzin",
    title: "Luxury Engagement Rings & Fine Jewelry",
    description: "Ethically sourced diamonds and fine jewelry with expert craftsmanship.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  generator: 'v0.app'
}

import { ReduxProvider } from "@/lib/redux/ReduxProvider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col overflow-x-hidden bg-white text-gray-900">
        <ReduxProvider>
          {children}
          <Analytics />
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  )
}
