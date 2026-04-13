"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Calendar,
  Landmark,
  ShieldCheck,
  Trophy,
  ArrowUpRight,
  type LucideIcon,
  Users,
} from "lucide-react"
import type { Program } from "@/types"
import ParallaxSection from "@/components/parallax-section"
import CounterSection from "@/components/counter-section"
import TestimonialCarousel from "@/components/testimonial-carousel"
import ParallaxText from "@/components/parallax-text"
import NewsletterForm from "@/components/newsletter-form"
import UpcomingEventsCarousel from "@/components/upcoming-events-carousel"

export default function Home() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loadingPrograms, setLoadingPrograms] = useState(true)

  useEffect(() => {
    const programsRef = collection(db, "programs")
    const programsQuery = query(programsRef, orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(
      programsQuery,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => {
          const data = doc.data() as Record<string, any>
          return {
            id: doc.id,
            title: data.title || "",
            description: data.description || "",
            fullDescription: data.fullDescription || data.description || "",
            mission: data.mission || "",
            category: data.category || "",
            activities: Array.isArray(data.activities) ? data.activities : [],
            impact: Array.isArray(data.impact) ? data.impact : [],
            image: data.image || "/placeholder.svg?height=400&width=600",
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : undefined,
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : undefined,
          } as Program
        })
        setPrograms(items)
        setLoadingPrograms(false)
      },
      (error) => {
        console.error("Home programs snapshot error", error)
        setLoadingPrograms(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-24 min-h-screen overflow-hidden">
        <div className="absolute inset-0 h-full">
          <img
            src="/Miss Nyasa.png"
            alt="Miss Malawi 2025"
            className="w-full h-full object-cover object-top block"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2E0F4D]/80 via-[#3C1B6C]/60 to-black/75" />
        </div>
        <div className="relative z-20 container mx-auto flex min-h-[calc(100vh-96px)] items-center justify-center px-4 md:px-6 py-24">
          <div className="max-w-3xl text-center space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-200">Celebrate Culture, Confidence & Impact</p>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Empowering Malawian Women through Beauty, Leadership, and Service.
            </h1>
            <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto">
              A cultural and empowerment platform showcasing beauty, intelligence, and advocacy while promoting national development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/pageant/register">
                <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-md border border-white/80 bg-white/10 px-8 text-white transition duration-200 hover:bg-white/20 hover:text-white"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-[#7C3AED]enter mb-16">
            <h2 className="font-playfair text-xl md:text-4xl font-bold text-[#212224] mb-4 text-center">Our Core Values</h2>
            <div className="w-24 h-1 bg-purple mx-auto"></div>
          </ParallaxText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={ArrowUpRight}
              title="Empowerment"
              description="Miss Malawi is more than a title—it is a platform that uplifts and inspires young women to embrace their potential as leaders and change-makers. That break barriers, challenge societal norms, and drive progress in their communities and beyond."
            />
            <ValueCard
              icon={ShieldCheck}
              title="Integrity"
              description="At the heart of Miss Malawi is a commitment to fairness, transparency, and professionalism. The pageant upholds the highest ethical standards in its selection processes, judging criteria, and overall operations."
            />
            <ValueCard
              icon={Landmark}
              title="Heritage"
              description="Miss Malawi celebrates and preserves the nation's rich cultural heritage. It embraces and promotes Malawian identity, fostering national pride and cultural appreciation. The pageant serves as a platform for showcasing Malawi's diverse traditions on a national and global stage."
            />
            <ValueCard
              icon={Trophy}
              title="Excellence"
              description="Miss Malawi embodies the highest standards of performance, leadership, and representation. Excellence is reflected in the professionalism of the organizers, the calibre of the contestants, and the impact of the winner."
            />
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <ParallaxSection imageUrl="/nyauziyambo.png" height="500px">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Beauty with Purpose</h2>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90">
            Celebrating Malawian women who combine beauty with intelligence and a passion for positive change.
          </p>
        </div>
      </ParallaxSection>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-center mb-16">
            <h2 className="font-playfair text-xl md:text-4xl font-bold text-[#212224] mb-4 text-center">Our Programs</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-center">
              Discover how Miss Malawi is making a difference through our various initiatives and
              programs.
            </p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </ParallaxText>

          {loadingPrograms ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-3xl border border-slate-200 bg-white shadow-lg p-6 animate-pulse">
                  <div className="h-56 rounded-3xl bg-slate-200" />
                  <div className="mt-6 space-y-4">
                    <div className="h-6 rounded bg-slate-200" />
                    <div className="h-4 w-5/6 rounded bg-slate-200" />
                    <div className="h-4 w-3/4 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.slice(0, 3).map((program) => (
                <ProgramCard
                  key={program.id}
                  id={program.id}
                  image={program.image || "/placeholder.svg?height=400&width=600"}
                  title={program.title}
                  description={program.description}
                />
              ))}
            </div>
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-gray-300 bg-white/80 px-8 py-12 text-center text-gray-600">
              No programs are available yet. Please check back soon.
            </div>
          )}

          <div className="text-[#7C3AED] mt-12">
            <Link href="/programs">
              <Button className="bg-purple hover:bg-purple/90 text-white shadow-lg">
                View All Programs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Counter Section */}
      <CounterSection />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-[#7C3AED]enter mb-16">
            <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-[#212224] mb-4 text-center">Upcoming Events</h2>
            <div className="w-24 h-1 bg-purple mx-auto"></div>
          </ParallaxText>

          <UpcomingEventsCarousel />

          <div className="text-[#7C3AED]enter mt-12">
            <Link href="/events">
              <Button className="bg-purple hover:bg-purple/90 text-white shadow-lg">
                View Full Calendar <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <ParallaxSection imageUrl="/placeholder.svg?height=1080&width=1920" height="auto" overlayColor="bg-[#212224]/90">
        <div className="py-20">
          <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">
            Subscribe to our newsletter to receive updates about our programs, events, and success stories.
          </p>

          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </ParallaxSection>
    </div>
  )
}

interface ValueCardProps {
  icon: LucideIcon
  title: string
  description: string
}

function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 text-[#7C3AED]enter">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#212224]/5 text-[#212224] mb-6">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

interface ProgramCardProps {
  id?: string
  image: string
  title: string
  description: string
}

function ProgramCard({ id, image, title, description }: ProgramCardProps) {
  const href = id ? `/programs/${id}` : "#"
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative h-60">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4 h-20 line-clamp-3">{description}</p>
        <Link href={href} className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold duration-200 bg-purple hover:bg-purple/90 text-white shadow-lg">
          Apply <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

interface EventCardProps {
  date: string
  title: string
  location: string
}

function EventCard({ date, title, location }: EventCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="text-purple font-medium mb-2">{date}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <div className="flex items-center text-gray-600 mb-4">
        <Users className="h-4 w-4 mr-2" />
        {location}
      </div>
      <Button variant="link" className="p-0 h-auto text-[#212224] hover:text-[#212224]/80">
        Register Now <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  )
}

