"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
  width?: number
  height?: number
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.2,
  className = "",
  width = 500,
  height = 500,
}: ParallaxImageProps) {
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return

      const scrollPosition = window.scrollY
      const elementTop = imageRef.current.offsetTop
      const elementHeight = imageRef.current.offsetHeight
      const windowHeight = window.innerHeight

      // Check if element is in viewport
      if (scrollPosition + windowHeight >= elementTop && scrollPosition <= elementTop + elementHeight + windowHeight) {
        // Calculate distance from the middle of the viewport
        const distanceFromCenter = elementTop - scrollPosition - windowHeight / 2 + elementHeight / 2
        const translateY = distanceFromCenter * speed

        // Apply transform
        imageRef.current.style.transform = `translateY(${translateY}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={imageRef} className={`relative overflow-hidden ${className}`}>
      <Image src={src || "/placeholder.svg"} alt={alt} width={width} height={height} className="object-cover" />
    </div>
  )
}
