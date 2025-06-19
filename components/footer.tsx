import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#212224] text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4">Miss Malawi</h3>
            <p className="text-white/80 mb-6">
              Empowering young Malawian women through beauty, intelligence, and advocacy since 1968.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Youtube className="h-5 w-5" />} />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/80 hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-white/80 hover:text-gold transition-colors">
                  Programs & Projects
                </Link>
              </li>
              <li>
                <Link href="/pageant" className="text-white/80 hover:text-gold transition-colors">
                  Pageant Information
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-white/80 hover:text-gold transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-white/80 hover:text-gold transition-colors">
                  News & Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact Information</h4>
            <address className="not-italic text-white/80 space-y-3">
              <p>Miss Malawi Foundation</p>
              <p>P.O. Box 1234</p>
              <p>Lilongwe, Malawi</p>
              <p className="pt-2">Phone: +265 1 234 5678</p>
              <p>Email: info@missmalawi.org</p>
            </address>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter for updates on events, programs, and success stories.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button className="w-full bg-gold hover:bg-gold/90 text-black">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Miss Malawi Foundation. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-white/60 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
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
      className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
    >
      {icon}
    </Link>
  )
}
