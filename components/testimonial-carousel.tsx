"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote:
      "Being Miss Malawi opened doors I never imagined possible. The platform allowed me to advocate for girls' education across the country and make a real difference in my community.",
    name: "Tionge Munthali",
    title: "Miss Malawi 2018",
    image: "/queens/Tiwonge.jpg?height=400&width=400",
  },
  {
    id: 2,
    quote:
      "The Miss Malawi Organization doesn't just crown queens; it builds leaders. The skills and confidence I gained during my reign continue to shape my career in public service.",
    name: "Cecelia Khofi",
    title: "Miss Malawi 2017",
    image: "/queens/cecelia.jpg?height=400&width=400",
  },
  {
    id: 3,
    quote:
      "Representing Malawi on the international stage was the highlight of my reign. I'm proud to have showcased our beautiful culture and traditions to the world.",
    name: "Faith Chibale",
    title: "Miss Malawi 2010",
    image: "/queens/Faith.jpeg?height=400&width=400",
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToNext = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  useEffect(() => {
    // Reset animation state after transition
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentIndex])

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Testimonials</h2>
          <div className="w-24 h-1 bg-purple mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple rounded-full p-3">
              <Quote className="h-6 w-6 text-white" />
            </div>

            <div className={`transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
              <blockquote className="text-xl md:text-2xl text-gray-700 text-center mb-8 italic">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center">
                <div className="relative h-16 w-16 rounded-full overflow-hidden mb-4">
                  <Image
                    src={currentTestimonial.image || "/placeholder.svg"}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-lg text-gray-900">{currentTestimonial.name}</h4>
                  <p className="text-purple">{currentTestimonial.title}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

