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
  title: "Miss Malawi 2026 | Beauty, Leadership, and Service",
  description: "Miss Malawi Organization empowers young Malawian women through culture, intelligence, and grace. Join us in celebrating our heritage and making a real impact in our communities.",
  keywords: ["Miss Malawi", "Pageant", "Malawi Women", "Empowerment", "Leadership", "Malawi Beauty Pageant", "Miss Malawi 2026"],
  authors: [{ name: "Miss Malawi Organization" }],
  openGraph: {
    title: "Miss Malawi 2026 | Empowering Women",
    description: "Empowering Malawian Women through Beauty, Leadership, and Service.",
    url: "https://missmw.org",
    siteName: "Miss Malawi",
    images: [
      {
        url: "/Misi.png",
        width: 800,
        height: 600,
        alt: "Miss Malawi Logo",
      },
    ],
    locale: "en_MW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miss Malawi 2026",
    description: "Celebrating Culture, Confidence & Impact with Miss Malawi.",
    images: ["/Misi.png"],
  },
  icons: {
    icon: "/Misi.png",
    apple: "/Misi.png",
  },
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
