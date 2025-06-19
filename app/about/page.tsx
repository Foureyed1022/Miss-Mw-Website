import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import PageHeader from "@/components/page-header"
import TeamMember from "@/components/team-member"
import ParallaxSection from "@/components/parallax-section"
import ParallaxText from "@/components/parallax-text"
import ParallaxImage from "@/components/parallax-image"

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="About Us"
        description="Learn about our mission, vision, and the team behind Miss Malawi Foundation"
      />

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ParallaxText speed={0.2}>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-6">Our Mission</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  To provide a platform for Malawian women to develop leadership skills, confidence, and advocacy,
                  promoting social impact initiatives that align with Malawi's development agenda.
                </p>

                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-6 mt-12">Our Vision</h2>
                <p className="text-gray-700 text-lg">
                  To empower young Malawian women as ambassadors of intelligence, culture, beauty, and national
                  development while showcasing Malawi's rich heritage on local and international platforms.
                </p>
              </ParallaxText>
            </div>

            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <ParallaxImage
                src="/placeholder.svg?height=1000&width=800"
                alt="Miss Malawi contestants"
                className="h-[500px] w-full"
                width={800}
                height={1000}
              />
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Our History</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </ParallaxText>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gold">The Beginning (1998)</h3>
                <p className="text-gray-700">
                  Miss Malawi was established in 1998 as a platform for young Malawian women to showcase their beauty,
                  intelligence, and professional talents, while advocating for social causes. Since its founding, it has
                  been an integral part of Malawian culture.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gold">Evolution & Growth (1980s-2000s)</h3>
                <p className="text-gray-700">
                  Throughout the decades, the pageant evolved from a simple beauty contest to a comprehensive program
                  focused on intelligence, talent, and advocacy. During this period, Miss Malawi began participating in
                  international pageants, including Miss World, bringing global recognition to Malawian beauty and
                  culture.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gold">Foundation Establishment (2010)</h3>
                <p className="text-gray-700">
                  In 2010, the Miss Malawi Foundation was officially established to oversee the pageant and expand its
                  impact through various community programs and initiatives. This marked a significant shift toward
                  using the platform for social change and development.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-gold">Present Day</h3>
                <p className="text-gray-700">
                  Today, the Miss Malawi Foundation stands as a premier organization for female empowerment in the
                  country. Beyond the annual pageant, we run educational programs, health initiatives, and cultural
                  preservation projects that impact thousands of lives across Malawi.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button className="bg-emerald-800 hover:bg-emerald-700">
                Explore Our Legacy <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Quote Section */}
      <ParallaxSection
        imageUrl="/placeholder.svg?height=800&width=1920"
        height="400px"
        overlayColor="bg-emerald-900/70"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl font-playfair italic">
            "Beauty with a purpose is about using your platform to create positive change in society."
          </p>
          <p className="mt-4 text-gold font-medium">Miss Malawi Foundation</p>
        </div>
      </ParallaxSection>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The dedicated individuals who work tirelessly to uphold our mission and create opportunities for young
              Malawian women.
            </p>
            <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
          </ParallaxText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember
              image="/placeholder.svg?height=400&width=400"
              name="Grace Mwambi"
              position="Executive Director"
            />
            <TeamMember
              image="/placeholder.svg?height=400&width=400"
              name="Chimwemwe Banda"
              position="Programs Coordinator"
            />
            <TeamMember
              image="/placeholder.svg?height=400&width=400"
              name="Thokozani Nyirenda"
              position="Events Manager"
            />
            <TeamMember
              image="/placeholder.svg?height=400&width=400"
              name="Mphatso Kamanga"
              position="Communications Director"
            />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Our Partners</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We collaborate with organizations that share our vision for empowering Malawian women and promoting
              national development.
            </p>
            <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
          </ParallaxText>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-32">
                <Image
                  src="/placeholder-logo.svg"
                  alt={`Partner ${i}`}
                  width={120}
                  height={60}
                  className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
