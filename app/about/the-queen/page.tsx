"use client"

import Image from "next/image"
import ParallaxSection from "@/components/parallax-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { QueenCarousel } from "@/components/queen-carousel"

export default function TheQueenPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/queens/Thandie.jpeg"
            alt="Miss Malawi 2025 Thandie Chisi"
            fill
            className="object-cover object-top brightness-75 scale-105 transition-transform duration-[10000ms] hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-center text-white">
          <p className="text-xl md:text-2xl font-medium tracking-widest uppercase mb-4 opacity-90">
            Miss Malawi 2025
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold mb-6 drop-shadow-lg tracking-tight">
            Thandie Chisi
          </h1>
          <p className="text-2xl md:text-3xl font-playfair italic border-y border-white/30 py-4 inline-block px-8">
            "Crowned in Purpose, Reigning in Service"
          </p>
        </div>
      </section>

      {/* Intro Bio Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 mb-8 relative">
                  A Queen of Substance
                  <div className="absolute -bottom-4 left-0 w-20 h-1 bg-purple" />
                </h2>
                <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                  <p>
                    A crown is only as powerful as the person who wears it, and in Thandie Chisi, Malawi has found a queen who wears hers with both grace and great purpose. As the reigning Miss Malawi 2025, Thandie is not simply a titleholder.
                  </p>
                  <p>
                    She is a living embodiment of what this crown was always meant to represent: beauty paired with substance, visibility paired with responsibility, and ambition paired with a deeply rooted love for the people of this nation.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <QueenCarousel />
              </div>
            </div>

            <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed space-y-8">
              <p>
                Long before she stepped onto the Miss Malawi stage, Thandie was already quietly transforming lives. She is the founder of the <strong>Sustainable Fashion and Women Empowerment Initiative (SFWE)</strong>, a grassroots movement born out of her unwavering conviction that every woman deserves the tools to build a life of dignity and independence.
              </p>
              <p>
                Through SFWE, she has championed sustainable fashion not merely as creative expression but as a deliberate and strategic path toward economic freedom for adolescent girls and young women across Malawi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-playfair italic leading-tight mb-8">
              "Fashion is not just what you wear. It is what you believe about your own worth."
            </h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto" />
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-purple pl-4">Impact Beyond the Crown</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  What makes her work remarkable is how deeply people-centered it is. She does not design programmes from a distance or speak about communities she has never truly entered. She builds from within, walking alongside the women she serves and listening before she leads.
                </p>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <p className="text-3xl font-bold text-purple mb-1">400+</p>
                  <p className="text-slate-600">Girls and women directly impacted across multiple communities through SFWE.</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-emerald-500 pl-4">The SHIFT Campaign</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Thandie serves as Creative Lead for the SHIFT Campaign in Malawi, where she works across <strong>seven districts</strong> to guide young people in naming the social issues that affect their communities most.
                </p>
                <p className="text-slate-700">
                  In a world that too often speaks for young people rather than with them, Thandie insists on a different approach, one where youth are not the audience for change but its authors.
                </p>
              </div>
            </div>

            <div className="mt-20 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 text-center">
              <h3 className="text-2xl md:text-3xl font-playfair font-bold text-slate-900 mb-6">A Legacy in the Making</h3>
              <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-8">
                "These qualities, her compassion, her courage, her creative intelligence, and her commitment to participatory leadership are precisely what distinguish her as a queen worthy of this title. She leads not by standing above her people but by standing among them, and that is the rarest kind of leadership there is."
              </p>
              <Link href="https://sfweinitiative.org/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-purple hover:bg-purple/90 text-white px-8 h-14 rounded-full text-lg shadow-lg">
                  Support Her Initiatives
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery CTA */}
      <ParallaxSection imageUrl="/Miss Nyasa.png" height="400px" overlayColor="bg-gradient-to-r from-[#2E0F4D]/80 via-[#3C1B6C]/60 to-black/75">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Follow her journey</h2>
          <Link href="/gallery">
            <Button variant="outline" size="lg" className="border-white text-purple hover:bg-white/10 rounded-full px-8">
              View Photo Gallery
            </Button>
          </Link>
        </div>
      </ParallaxSection>
    </div>
  )
}
