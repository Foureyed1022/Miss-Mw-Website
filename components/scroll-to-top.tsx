"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 h-12 w-12 transition-all duration-300 ${isVisible
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 translate-y-4 pointer-events-none"
        }`}
    >
      {/* Ping ring — sits behind the button, animates outward */}
      {isVisible && (
        <span className="absolute inset-0 rounded-full bg-purple opacity-60 animate-ping" />
      )}

      {/* Actual button — always solid, never affected by ping */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="relative h-12 w-12 rounded-full bg-purple shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:bg-purple/90 hover:scale-110 hover:shadow-purple/40 hover:shadow-xl"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    </div>
  )
}