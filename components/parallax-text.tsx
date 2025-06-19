"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ParallaxTextProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export default function ParallaxText({ children, speed = 0.3, className = "" }: ParallaxTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return

      const scrollPosition = window.scrollY
      const elementTop = textRef.current.offsetTop
      const elementHeight = textRef.current.offsetHeight
      const windowHeight = window.innerHeight

      // Check if element is in viewport
      if (scrollPosition + windowHeight >= elementTop && scrollPosition <= elementTop + elementHeight + windowHeight) {
        // Calculate distance from the middle of the viewport
        const distanceFromCenter = elementTop - scrollPosition - windowHeight / 2 + elementHeight / 2
        const translateY = distanceFromCenter * speed

        // Apply transform
        textRef.current.style.transform = `translateY(${translateY}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}
