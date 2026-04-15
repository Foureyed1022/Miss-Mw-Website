"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, GraduationCap, Heart, Lightbulb, Mic, Users } from "lucide-react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Program } from "@/types"
import PageHeader from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ParallaxSection from "@/components/parallax-section"
import ParallaxText from "@/components/parallax-text"
import ParallaxImage from "@/components/parallax-image"

const programIcon = (category: string) => {
  const key = category?.toString().toLowerCase()
  switch (key) {
    case "education":
      return <GraduationCap className="h-8 w-8" />
    case "health":
      return <Heart className="h-8 w-8" />
    case "leadership":
      return <BookOpen className="h-8 w-8" />
    case "culture":
      return <Users className="h-8 w-8" />
    case "community":
      return <Mic className="h-8 w-8" />
    default:
      return <Lightbulb className="h-8 w-8" />
  }
}

function buildProgramGroups(programs: Program[]) {
  const categories = Array.from(
    new Set(programs.map((program) => program.category?.trim() || "General"))
  )

  return categories.reduce<Record<string, Program[]>>((groups, category) => {
    groups[category] = programs.filter(
      (program) => (program.category?.trim() || "General") === category
    )
    return groups
  }, {})
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

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
            image: data.image || "/placeholder.svg",
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : undefined,
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : undefined,
          } as Program
        })
        setPrograms(items)
        setLoading(false)
      },
      (error) => {
        console.error("Programs snapshot error", error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="Programs & Projects"
        description="Empowering Malawian women through impactful initiatives and community engagement"
      />

      {/* Programs Overview */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="overflow-hidden rounded-[2rem] border border-purple-100 bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 py-10 md:px-12 md:py-14">
              <div>
                <span className="inline-flex rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-purple-700">
                  Programs Overview
                </span>
                <ParallaxText speed={0.2}>
                  <h2 className="font-playfair text-[#7C3AED] text-4xl md:text-5xl font-bold text-emerald-800 mb-6">
                    Making a Difference in Malawi
                  </h2>
                  <p className="text-gray-700 mb-6 text-lg">
                    Miss Malawi is committed to creating meaningful impact through various programs and
                    projects that address key challenges facing Malawian women and communities. Our initiatives focus on
                    education, health awareness, cultural preservation, leadership development, and community service.
                  </p>
                  <p className="text-gray-700 mb-6 text-lg">
                    Each program is designed to align with our mission of empowering young Malawian women as ambassadors
                    of intelligence, culture, beauty, and national development. Through these initiatives, we strive to
                    create lasting change and contribute to Malawi's development agenda.
                  </p>
                </ParallaxText>
              </div>

              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/misi.png"
                  alt="Miss Malawi community program"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Quote Section */}
      <ParallaxSection
        imageUrl="/nyauziyambo.png?height=800&width=1920"
        height="400px"
        overlayColor="bg-purple-900/70"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl text-[white] font-playfair italic">
            "Our programs are designed to create lasting impact and empower the next generation of Malawian women
            leaders."
          </p>
          <p className="mt-4 text-purple-200 font-medium">Miss Malawi Organization</p>
        </div>
      </ParallaxSection>

      {/* Featured Programs */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-700 font-semibold">Featured Programs</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mt-4">
              Discover programs that empower women and strengthen communities.
            </h2>
            <p className="text-slate-600 mt-4">
              Browse the latest initiatives from the Miss Malawi Organization. Each program is built to create long-term impact across Malawi.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-[1.75rem] border border-slate-200 bg-white shadow-lg p-6 animate-pulse">
                  <div className="h-56 rounded-3xl bg-slate-200" />
                  <div className="mt-6 space-y-4">
                    <div className="h-6 rounded bg-slate-200" />
                    <div className="h-4 rounded bg-slate-200 w-5/6" />
                    <div className="h-4 rounded bg-slate-200 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : programs.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.slice(0, 3).map((program) => (
                <ProgramCard
                  key={program.id}
                  id={program.id}
                  icon={programIcon(program.category)}
                  category={program.category}
                  title={program.title}
                  description={program.description}
                  image={program.image || "/placeholder.svg"}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 px-8 py-12 text-center text-slate-600">
              No programs available yet. Please add programs from the dashboard to display them here.
            </div>
          )}
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-700 font-semibold">Program Categories</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mt-4">
              Explore programs by area of impact
            </h2>
            <p className="text-slate-600 mt-4">
              Select a category to see the current initiatives driving education, health, leadership, culture, and community development.
            </p>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-8 py-12 text-center text-slate-600">
              Loading programs...
            </div>
          ) : programs.length > 0 ? (
            <Tabs defaultValue={programs[0]?.category || "General"} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 rounded-full bg-purple-100 p-1">
                {Array.from(new Set(programs.map((program) => program.category?.trim() || "General"))).map(
                  (category) => (
                    <TabsTrigger key={category} value={category} className="rounded-full text-sm font-semibold text-slate-700">
                      {category}
                    </TabsTrigger>
                  )
                )}
              </TabsList>

              {Object.entries(buildProgramGroups(programs)).map(([category, categoryPrograms]) => (
                <TabsContent key={category} value={category} className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryPrograms.slice(0, 6).map((program) => (
                      <CompactProgramCard
                        key={program.id}
                        id={program.id}
                        icon={programIcon(program.category)}
                        category={program.category}
                        title={program.title}
                        description={program.description}
                        image={program.image || "/placeholder.svg"}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-8 py-12 text-center text-slate-600">
              No program categories are available yet. Add programs from the dashboard to populate this section.
            </div>
          )}
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-[#7C3AED] mb-12 text-center">
            <h2 className="font-playfair text-[#7C3AED] text-4xl md:text-5xl font-bold text-emerald-800 mb-4">Impact Stories</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Real stories of transformation and empowerment through our programs
            </p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </ParallaxText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ImpactStory
              image="/impact/ruth.jpg?height=400&width=400"
              name="Ruth Chiwaula"
              title="Scholarship Recipient"
              story="Thanks to the Miss Malawi Scholarship Fund, I was able to complete my degree in Environmental Science. Now I'm working on conservation projects in my community and mentoring other young women."
            />
            <ImpactStory
              image="/placeholder.svg?height=400&width=400"
              name="Tadala Mwale"
              title="Entrepreneurship Program Graduate"
              story="The entrepreneurship training gave me the skills and confidence to start my own tailoring business. I now employ five other women and provide for my family with dignity."
            />
            <ImpactStory
              image="/placeholder.svg?height=400&width=400"
              name="Grace Phiri"
              title="Health Ambassador"
              story="As a health ambassador trained by Miss Malawi Organization, I've helped hundreds of women in my village access vital health information and services, improving maternal health outcomes."
            />
          </div>

          <div className="text-[#7C3AED] mt-12">
            <Button className="bg-emerald-800 hover:bg-emerald-700">
              Read More Stories <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <ParallaxSection
        imageUrl="/placeholder.svg?height=1080&width=1920"
        height="auto"
        overlayColor="bg-emerald-900/90"
      >
        <div className="py-16 max-w-3xl mx-auto">
          <h2 className="font-playfair text-[#7C3AED] text-4xl md:text-5xl font-bold mb-4">Get Involved</h2>
          <p className="mb-8 text-lg">
            There are many ways to support our programs and make a difference in the lives of Malawian women and
            communities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-[#7C3AED]">
            <div className="bg-white/10 p-6 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple text-black mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Donate</h3>
              <p className="text-white/80 mb-4">Support our programs with a one-time or monthly donation.</p>
              <Link href="/donate">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Donate Now
                </Button>
              </Link>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple text-black mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Volunteer</h3>
              <p className="text-white/80 mb-4">Share your time and skills to help implement our programs.</p>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Join Us
                </Button>
              </Link>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple text-black mb-4">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Partner</h3>
              <p className="text-white/80 mb-4">Collaborate with us as an organization or business.</p>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Partner With Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ParallaxSection>
    </div>
  )
}

interface ProgramCardProps {
  id?: string
  icon: React.ReactNode
  category?: string
  title: string
  description: string
  image: string
}

function ProgramCard({ id, icon, category, title, description, image }: ProgramCardProps) {
  const href = id ? `/programs/${id}` : "#"
  return (
    <div className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-56 overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-800 shadow-sm">
          <span className="inline-flex items-center justify-center rounded-full bg-purple-100 p-1 text-purple-700">{icon}</span>
          {category || "General"}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-3 truncate">{title}</h3>
        <p className="text-slate-600 mb-6 min-h-[5rem] text-sm leading-relaxed line-clamp-3">{description}</p>
        <Link href={href} className="inline-flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900">
          Learn more <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

function CompactProgramCard({ id, icon, category, title, description, image }: ProgramCardProps) {
  const href = id ? `/programs/${id}` : "#"
  return (
    <div className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-60 overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-800 shadow-sm">
          <span className="inline-flex items-center justify-center rounded-full bg-purple-100 p-1 text-purple-700">
            <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
          </span>
          {category || "General"}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">{title}</h3>
        <p className="text-slate-600 mb-4 text-sm leading-relaxed line-clamp-2">{description}</p>
        <Link href={href} className="inline-flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900 text-sm">
          Learn more <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

interface ProgramItemProps {
  title: string
  description: string
}

function ProgramItem({ title, description }: ProgramItemProps) {
  return (
    <div className="border-l-4 border-purple pl-4 py-2">
      <h4 className="text-lg font-bold text-gray-900">{title}</h4>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}

interface ImpactStoryProps {
  image: string
  name: string
  title: string
  story: string
}

function ImpactStory({ image, name, title, story }: ImpactStoryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          <p className="text-purple">{title}</p>
        </div>
      </div>
      <div className="relative">
        <Mic className="absolute -top-2 -left-2 h-6 w-6 text-emerald-200" />
        <p className="text-gray-700 italic pl-4">{story}</p>
      </div>
    </div>
  )
}