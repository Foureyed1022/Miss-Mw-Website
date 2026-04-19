"use client"

import * as React from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  { src: "/queens/than.jpg", alt: "Thandie Chisi Miss Malawi 2025" },
  { src: "/queens/Tha.jpg", alt: "Thandie Chisi Profile" },
  { src: "/queens/queen.jpg", alt: "Thandie Chisi Initiatives" },
  { src: "/queens/Thandiee.PNG", alt: "Thandie Chisi Crowned" },
]

export function QueenCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = React.useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-2xl bg-white aspect-[3/4] w-full max-w-full mx-auto">
      {/* Viewport */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] h-full relative min-w-0">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 z-10 shadow-lg active:scale-95"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 z-10 shadow-lg active:scale-95"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 p-2 rounded-full bg-black/10 backdrop-blur-sm shadow-inner group-hover:scale-110 transition-transform duration-300">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? "bg-white w-4 shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-white/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Paging Text (Top Right) */}
      <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10 shadow-sm">
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  )
}
