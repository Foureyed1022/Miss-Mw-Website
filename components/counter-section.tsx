"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Award, Calendar, Heart, Users } from "lucide-react"

interface SiteStats {
  contestants: number
  queensCrowned: number
  yearsOfLegacy: number
  livesImpacted: number
}

const DEFAULT_STATS: SiteStats = {
  contestants: 0,
  queensCrowned: 0,
  yearsOfLegacy: 0,
  livesImpacted: 0,
}

export default function CounterSection() {
  const [stats, setStats] = useState<SiteStats>(DEFAULT_STATS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const statsRef = doc(db, "settings", "site_stats")
    const unsubscribe = onSnapshot(
      statsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data()
          setStats({
            contestants: Number(data.contestants ?? 0),
            queensCrowned: Number(data.queensCrowned ?? 0),
            yearsOfLegacy: Number(data.yearsOfLegacy ?? 0),
            livesImpacted: Number(data.livesImpacted ?? 0),
          })
        } else {
          setStats(DEFAULT_STATS)
        }
        setIsLoading(false)
      },
      (error) => {
        console.error("Site stats snapshot error", error)
        setIsLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const counters = [
    {
      icon: <Users className="h-8 w-8" />,
      label: "Contestants",
      endValue: stats.contestants,
      suffix: "+",
    },
    {
      icon: <Award className="h-8 w-8" />,
      label: "Queens Crowned",
      endValue: stats.queensCrowned,
      suffix: "",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      label: "Years of Legacy",
      endValue: stats.yearsOfLegacy,
      suffix: "",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      label: "Lives Impacted",
      endValue: stats.livesImpacted,
      suffix: "+",
    },
  ]

  return (
    <section className="relative py-20 bg-[#121125] text-white overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 md:px-6">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="text-purple uppercase tracking-widest text-xs font-semibold mb-2">Our Impact</p>
          <h2 className="font-playfair text-xl md:text-4xl font-bold text-white">
            Numbers That Tell Our Story
          </h2>
          <div className="w-16 h-0.5 bg-purple mx-auto mt-4 opacity-80" />
        </div>

        {/* Counter grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {counters.map((c, i) => (
            <Counter
              key={i}
              icon={c.icon}
              label={c.label}
              endValue={isLoading ? 0 : c.endValue}
              suffix={c.suffix}
            />
          ))}
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

  // Reset animation when endValue changes (e.g. after data loads)
  useEffect(() => {
    countedRef.current = false
    setCount(0)
  }, [endValue])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !countedRef.current && endValue > 0) {
          countedRef.current = true

          const duration = 2000
          const frameDuration = 1000 / 60
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
      { threshold: 0.4 },
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
    <div
      ref={counterRef}
      className="flex flex-col items-center text-[#7C3AED]enter group"
    >
      {/* Icon ring */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-purple/20 text-purple mb-5 group-hover:bg-purple/10 group-hover:border-purple/50 transition-all duration-300">
        {icon}
      </div>

      {/* Number */}
      <div className="text-4xl md:text-[#7C3AED]xl font-bold font-playfair text-white leading-none mb-2 tabular-nums">
        {count.toLocaleString()}
        {suffix && <span className="text-purple">{suffix}</span>}
      </div>

      {/* Divider */}
      <div className="w-8 h-px bg-purple/40 my-3" />

      {/* Label */}
      <div className="text-sm md:text-base text-white/60 font-medium tracking-wide uppercase">
        {label}
      </div>
    </div>
  )
}

