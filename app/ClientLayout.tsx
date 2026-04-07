'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/header'
import Image from "next/image"
import logo from "@/public/logo.png";
import { ChevronRight, Facebook, Instagram } from "lucide-react"
import Link from "next/link"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  return (
    <>
      <div className="relative">
        {!isAdmin && <Header className="absolute top-0 left-0 right-0 z-50" />}
        {children}
      </div>
      {!isAdmin &&  
        <footer className="bg-[#3D3B48] text-white py-12 px-6">
            <div className="container mx-auto">
                {/* Top Section - Logo on left, content on right */}
                <div className="flex flex-col md:flex-row">
                
                {/* Logo - left aligned with proper spacing */}
                <div className="md:mr-24 mb-8 md:mb-0 flex-shrink-0"> 
                    <Link 
                        href="/" 
                        className="block" // Ensures proper spacing and removes underline
                        title="Miss Malawi Homepage" // Optional tooltip
                    >
                        <Image 
                        src={logo} 
                        alt="Miss Malawi Logo" 
                        width={100}
                        height={100}
                        className="mx-auto md:mx-0 hover:opacity-80 transition-opacity" 
                        />
                    </Link>
                </div>

                {/* Links Grid - pushed to right with more spacing */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
                    
                    {/* Pages Column - moved right with margin */}
                    <div className="text-left ml-0 md:ml-8"> {/* Added left margin on desktop */}
                    <nav>
                        <h3 className="text-[#8329B7] font-bold mb-4">Quick Links</h3>
                        <div className="space-y-3">
                        {[
                            { href: "/", label: "Home" },
                            // { href: "/road-to-crown", label: "Road to the Crown" },
                            { href: "/registration", label: "Registration" },
                            { href: "/news", label: "News" },
                            { href: "/contact", label: "Contact" }
                        ].map((item) => (
                            <a 
                            key={item.href} 
                            href={item.href} 
                            className="flex items-center hover:text-[#8329B7] transition-colors group"
                            >
                            <ChevronRight className="w-4 h-4 mr-2 text-[#8329B7] opacity-80 group-hover:opacity-100" />
                            {item.label}
                            </a>
                        ))}
                        </div>
                    </nav>
                    </div>

                    {/* Partners Column */}
                    <div className="text-left">
                    <nav>
                        <h3 className="text-[#8329B7] font-bold mb-4">Partners</h3>
                        <div className="space-y-3">
                        <a 
                            href="/partners" 
                            className="flex items-center hover:text-[#8329B7] transition-colors group"
                        >
                            <ChevronRight className="w-4 h-4 mr-2 text-[#8329B7] opacity-80 group-hover:opacity-100" />
                            Our Sponsors
                        </a>
                        </div>
                    </nav>
                    </div>

                    {/* Social Media Column */}
                    <div className="text-left">
                    <nav>
                        <h3 className="text-[#8329B7] font-bold mb-4">Get in Touch</h3>
                        <div className="flex space-x-4">
                        <a
                            href="https://web.facebook.com/mismalawi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-100"
                        >
                            <Facebook className="w-4 h-4 text-blue-600" />
                        </a>
                        <a
                            href="https://www.instagram.com/miss_malawi_org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-100"
                        >
                            <Instagram className="w-4 h-4 text-pink-500" />
                        </a>
                        <a
                            href="https://x.com/MissMwOrg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            aria-label="Visit our X profile"
                        >
                            <Image 
                            src="/X.png" 
                            alt="X logo"
                            width={16}
                            height={16}
                            className="w-4 h-4 object-contain"
                            />
                        </a>
                        <a
                            href="https://www.tiktok.com/@missmw25?is_from_webapp=1&sender_device=pc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            aria-label="Visit our Tiktok profile"
                        >
                            <Image 
                            src="/tiktok.png" 
                            alt="Tiktok logo"
                            width={15}
                            height={15}
                            className="w-4 h-4 object-contain"
                            />
                        </a>
                        
                        </div>
                    </nav>
                    </div>
                </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#8329B7] mt-12 w-full"></div>

                {/* Copyright */}
                <p className="text-center mt-8">
                &copy; 2026 <a href="/" className="text-[#8329B7] hover:underline">MISS MALAWI.</a> All Rights Reserved. Developed by SenLain Systems
                </p>
            </div>
        </footer>
      }
    </>
  )
}