"use client"

import { useEffect, useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Heart, Users, Lightbulb, TrendingUp } from "lucide-react"
import PageHeader from "@/components/page-header"

type Program = {
  id: string
  title: string
  description: string
  fullDescription: string
  image: string
  mission: string
  impact: string[]
  activities: string[]
  category: string
}

export default function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [program, setProgram] = useState<Program | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await fetch("/api/programs")
        const data = await res.json()
        const found = data.find((p: Program) => p.id === id)
        setProgram(found || null)
      } catch (error) {
        console.error("Error fetching program details:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProgram()
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <PageHeader title="Loading..." description="" />
        <div className="container mx-auto py-20 text-[#7C3AED]enter">Loading program details...</div>
      </div>
    )
  }

  if (!program) {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <PageHeader title="Program Not Found" description="The requested program could not be found." />
        <div className="container mx-auto py-20 text-[#7C3AED]enter">
          <Link href="/programs">
            <Button className="bg-emerald-800">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <PageHeader title={program.title} description={program.category + " Initiative"} />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/programs" className="inline-flex items-center text-emerald-800 font-medium mb-8 hover:text-emerald-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Programs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-emerald-800 mb-6">About the Program</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{program.fullDescription}</p>
              
              <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-purple mb-8">
                <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-purple" /> Our Mission
                </h3>
                <p className="text-gray-700 italic">{program.mission}</p>
              </div>

              <h2 className="font-playfair text-[#7C3AED]xl font-bold text-emerald-800 mb-6">Key Activities</h2>
              <ul className="space-y-4 mb-8">
                {program.activities.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
                <Image src={program.image} alt={program.title} fill className="object-cover" />
              </div>

              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center">
                  <TrendingUp className="mr-2 h-6 w-6 text-purple" /> Impact & Reach
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {program.impact.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-emerald-600">
                      <p className="font-medium text-gray-800">{stat}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-900 text-white p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Support This Initiative</h3>
                <p className="mb-6 opacity-90">Your contribution helps us expand the reach of this program and impact more lives across Malawi.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/donate" className="flex-1">
                    <Button className="w-full bg-purple hover:bg-purple/90 text-black">
                      <Heart className="mr-2 h-4 w-4" /> Donate Now
                    </Button>
                  </Link>
                  <Link href="/contact" className="flex-1">
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white/10">
                      <Users className="mr-2 h-4 w-4" /> Partner With Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
