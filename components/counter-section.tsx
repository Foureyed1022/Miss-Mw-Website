"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Award, Calendar, Heart, Users } from "lucide-react"

export default function CounterSection() {
  return (
    <section className="py-16 bg-[#212224] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Counter icon={<Users className="h-10 w-10 text-gold" />} label="Contestants" endValue={500} suffix="+" />
          <Counter icon={<Award className="h-10 w-10 text-gold" />} label="Queens Crowned" endValue={54} />
          <Counter icon={<Calendar className="h-10 w-10 text-gold" />} label="Years of Legacy" endValue={27} />
          <Counter
            icon={<Heart className="h-10 w-10 text-gold" />}
            label="Lives Impacted"
            endValue={25000}
            suffix="+"
          />
        </div>
      </div>
    </section>
  )
}

interface CounterProps {
  icon: React.ReactNode
  label: string
  endValue: number
  suffix?: string
}

export function Counter({ icon, label, endValue, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const counterRef = useRef<HTMLDivElement>(null)
  const countedRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !countedRef.current) {
          countedRef.current = true

          const duration = 2000 // ms
          const frameDuration = 1000 / 60 // 60fps
          const totalFrames = Math.round(duration / frameDuration)
          const increment = endValue / totalFrames

          let currentFrame = 0

          const counter = setInterval(() => {
            currentFrame++
            const newCount = Math.ceil(increment * currentFrame)

            if (currentFrame === totalFrames || newCount >= endValue) {
              setCount(endValue)
              clearInterval(counter)
            } else {
              setCount(newCount)
            }
          }, frameDuration)
        }
      },
      { threshold: 0.5 },
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [endValue])

  return (
    <div ref={counterRef} className="text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <div className="text-4xl md:text-5xl font-bold mb-2 font-playfair">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-white/80">{label}</div>
    </div>
  )
}
