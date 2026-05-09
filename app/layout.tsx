import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Lawizer - Legal Service Dashboard",
  description: "Track all your active and completed legal filings in one place",
}

export const viewport: Viewport = {
  themeColor: "#1e293b",
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased bg-background`}>
      <body className="bg-background font-sans text-foreground">
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
