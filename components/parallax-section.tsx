"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface ParallaxSectionProps {
  imageUrl: string
  height?: string
  overlayColor?: string
  children: React.ReactNode
  reversed?: boolean
}

export default function ParallaxSection({
  imageUrl,
  height = "500px",
  overlayColor = "bg-emerald-900/60",
  children,
  reversed = false,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current) return

      const scrollPosition = window.scrollY
      const sectionTop = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight

      // Check if section is in viewport
      if (scrollPosition + window.innerHeight >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
        // Calculate parallax effect
        const distance = scrollPosition - sectionTop
        const parallaxValue = distance * (reversed ? -0.4 : 0.4)

        // Apply transform
        imageRef.current.style.transform = `translateY(${parallaxValue}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [reversed])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black" style={{ height }}>
      <div ref={imageRef} className="absolute inset-0 -top-28 -bottom-28">
        <Image src={imageUrl || "/placeholder.svg"} alt="Parallax background" fill className="object-cover object-[center_15%] block" />
      </div>
      <div className={`absolute inset-0 ${overlayColor} flex items-center justify-center`}>
        <div className="text-[#7C3AED]enter text-white px-4 md:px-6 w-full">{children}</div>
      </div>
    </section>
  )
}





