"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Youtube } from "lucide-react"
import toast from "react-hot-toast"

export default function Footer() {
  const pathname = usePathname()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Hide footer on dashboard routes
  if (pathname?.startsWith("/dashboard")) {
    return null
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "footer" }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Successfully subscribed to newsletter!")
        setEmail("")
      } else {
        toast.error(data.error || "Failed to subscribe. Please try again.")
      }
    } catch (error) {
      console.error("Subscription error:", error)
      toast.error("An error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="relative overflow-hidden bg-[#121125] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#7C3AED]/10" />
      </div>
      <div className="relative container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Image
              src="/logo_white.png"
              alt="Miss Malawi Logo"
              width={80}
              height={26}
              className="h-auto mb-4"
            />
            <p className="text-white/80 mb-6">
              Empowering young Malawian women through beauty, intelligence, and advocacy since 1970.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://web.facebook.com/missmworg" icon={<Facebook className="h-5 w-5" />} />
              <SocialLink href="https://www.instagram.com/miss_malawi_org/" icon={<Instagram className="h-5 w-5" />} />
              <SocialLink
                href="https://x.com/MissMwOrg"
                icon={
                  <Image
                    src="/X_white.png"
                    alt="X"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                }
              />
              <SocialLink
                href="https://www.tiktok.com/@missmw25?is_from_webapp=1&sender_device=pc"
                icon={
                  <Image
                    src="/tictoc.png"
                    alt="TikTok"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                }
              />
              <SocialLink href="https://www.youtube.com/@MissMalawiOfficial" icon={<Youtube className="h-5 w-5" />} />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/80 hover:text-purple transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-white/80 hover:text-purple transition-colors">
                  Programs & Projects
                </Link>
              </li>
              <li>
                <Link href="/pageant" className="text-white/80 hover:text-purple transition-colors">
                  Pageant Information
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-white/80 hover:text-purple transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-white/80 hover:text-purple transition-colors">
                  News & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-purple transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact Information</h4>
            <address className="not-italic text-white/80 space-y-3">
              <p>HewKam House, Area 43, Plot 43/1314</p>
              <p>Miss Malawi, P.O Box 143</p>
              <p>Lilongwe, Malawi</p>
              <p className="pt-2">Phone: +265 996 263 843 / +265 882 922 062</p>
              <p>Email: info@missmw.org</p>
            </address>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter for updates on events, programs, and success stories.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                disabled={isLoading}
                required
              />
              <Button
                type="submit"
                className="w-full bg-purple hover:bg-purple/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-16 pt-8 text-[#7C3AED]enter flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p className="mb-4 md:mb-0">
            © {new Date().getFullYear()} <span className="text-[#8329B7] font-bold">MISS MALAWI.</span> All Rights Reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="hidden md:block">|</span>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
            <span className="hidden md:block ml-4">|</span>
            <p className="md:ml-4">
              Developed by <Link href="https://senlainsystems.com" className="hover:text-white transition-colors">SenLain Systems</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <Link
      href={href}
      className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple hover:text-black transition-colors"
    >
      {icon}
    </Link>
  )
}

