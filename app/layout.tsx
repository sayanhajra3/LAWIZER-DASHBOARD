import type { Metadata, Viewport } from "next"
import { Inter, Instrument_Serif } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Lawizer — Global Legal Business Registration",
  description:
    "Lawizer command center: register companies, hire vetted lawyer freelancers, and book legal services for international clients.",
}

export const viewport: Viewport = {
  themeColor: "#0a0418",
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} antialiased bg-background`}
    >
      <body className="bg-background font-sans text-foreground">
        <div className="aurora-bg" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
