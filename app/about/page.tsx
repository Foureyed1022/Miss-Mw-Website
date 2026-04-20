"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import PageHeader from "@/components/page-header"
import TeamMember from "@/components/team-member"
import ParallaxSection from "@/components/parallax-section"
import ParallaxText from "@/components/parallax-text"
import SponsorCarousel from "@/components/sponsor-carousel"
import sponsorData from "@/data/sponsors.json"
import Link from "next/link"

type TeamMemberData = {
  id: number
  name: string
  role: string
  photo: string
  bio: string
  department: string
  hierarchy: number
}

type Sponsor = {
  id: number
  name: string
  logo: string
  website: string
  tier?: string
}

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMemberData[]>([])
  const [partners, setPartners] = useState<Sponsor[]>([])

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch("/api/team")
      const data = await res.json()
      setTeam(data)
    }
    fetchTeam()
    setPartners(sponsorData.partners)
  }, [])

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="About Us"
        description="Learn about our mission, vision, and the team behind Miss Malawi."
      />

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ParallaxText speed={0.2}>
                <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-emerald-800 mb-6">Our Mission</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  We enter 2026 with clear eyes about where we are and a bold vision for where we are going. Last year demonstrated that this organisation can generate significant revenue MWK 200 million and above. But revenue alone is not enough. In 2026, we are building the foundations that will sustain, grow, and protect Miss Malawi for the next 50 years..
                </p>

                <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-emerald-800 mb-6 mt-12">Our Vision</h2>
                <p className="text-gray-700 text-lg">
                  Miss Malawi has been a part of this nation’s soul for over 50 years. At its best, it has been a source of national pride, a platform for extraordinary young women, and a commercially vibrant institution that commands respect from corporations, government, and the public alike..
                </p>
              </ParallaxText>
            </div>

            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/Misi.png"
                alt="Miss Malawi Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-center mb-12">
            <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-emerald-800 mb-4">Our History</h2>
            <div className="w-24 h-1 bg-purple mx-auto"></div>
          </ParallaxText>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-purple">The Beginning (1998)</h3>
                <p className="text-gray-700">
                  Miss Malawi was established in 1998 as a platform for young Malawian women to showcase their beauty,
                  intelligence, and professional talents, while advocating for social causes. Since its founding, it has
                  been an integral part of Malawian culture.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-purple">Evolution (1970s-2000s)</h3>
                <p className="text-gray-700">
                  Throughout the decades, the pageant evolved from a simple beauty contest to a comprehensive program
                  focused on intelligence, talent, and advocacy. During this period, Miss Malawi began participating in
                  international pageants, including Miss World, bringing global recognition to Malawian beauty and
                  culture.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-purple">Growth (2010s)</h3>
                <p className="text-gray-700">
                  In 2010, the Miss Malawi Organization had grown to oversee the pageant and expand its
                  impact through various community programs and initiatives. This marked a significant shift toward
                  using the platform for social change and development.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-purple">Present Day</h3>
                <p className="text-gray-700">
                  Today, the Miss Malawi Organization stands as a premier organization for female empowerment in the
                  country. Beyond the annual pageant, we run educational programs, health initiatives, and cultural
                  preservation projects that impact thousands of lives across Malawi.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button className="bg-emerald-800 hover:bg-emerald-700">
                <Link href="/timeline" className="flex items-center">
                  Explore Our Legacy <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Quote Section */}
      <ParallaxSection
        imageUrl="/nyauziyambo.png"
        height="400px"
        overlayColor="bg-emerald-900/70"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl md:text-[#7C3AED]xl font-playfair italic">
            "Beauty with a purpose is about using your platform to create positive change in society."
          </p>
          <p className="mt-4 text-white font-medium">Miss Malawi Organization</p>
        </div>
      </ParallaxSection>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-center mb-12">
            <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-emerald-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The dedicated individuals who work tirelessly to uphold our mission and create opportunities for young
              Malawian women.
            </p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </ParallaxText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.sort((a, b) => a.hierarchy - b.hierarchy).map((member) => (
              <TeamMember
                key={member.id}
                image={member.photo}
                name={member.name}
                position={member.role}
              />
            ))}
            {team.length === 0 && (
              <div className="col-span-full text-[#7C3AED]enter py-12 text-gray-500">
                Loading team members...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-center mb-12">
            <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-emerald-800 mb-4">Our Partners</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We collaborate with organizations that share our vision for empowering Malawian women and promoting
              national development.
            </p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </ParallaxText>

          <SponsorCarousel
            sponsors={partners}
            height="h-32"
            logoWidth={120}
            logoHeight={60}
          />
        </div>
      </section>
    </div>
  )
}

