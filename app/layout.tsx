import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "./ClientLayout"
import { ThemeProvider } from "@/components/theme-provider"
import { AnalyticsTracker } from "../components/analytics-tracker"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Miss Malawi",
  description: "Cultural and empowerment platform supporting young Malawian women",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <AnalyticsTracker />
            <ClientLayout>
              <main className="flex-1">{children}</main>
            </ClientLayout>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
