import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Globe, Heart, type LucideIcon, Medal, Sparkles, Users } from "lucide-react"
import ParallaxSection from "@/components/parallax-section"
import CounterSection from "@/components/counter-section"
import TestimonialCarousel from "@/components/testimonial-carousel"
import { Counter } from "@/components/counter-section"
import ParallaxText from "@/components/parallax-text"
import NewsletterForm from "@/components/newsletter-form"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#212224]/70 to-black/50 z-10" />
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Miss Malawi contestants"
          fill
          priority
          className="object-cover"
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4 md:px-6">
          <div className="max-w-3xl space-y-4">
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="text-gold">Empowering</span> Malawian Women
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              A cultural and empowerment platform showcasing beauty, intelligence, and advocacy while promoting national
              development.
            </p>
            {/* Update the "Get Involved" button in the hero section */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/donate">
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-black">
                  Get Involved <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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
          <ParallaxText className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </ParallaxText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={Sparkles}
              title="Empowerment"
              description="Miss Malawi is more than a title—it is a platform that uplifts and inspires young women to embrace their potential as leaders and change-makers. That break barriers, challenge societal norms, and drive progress in their communities and beyond."
            />
            <ValueCard
              icon={Medal}
              title="Integrity"
              description="At the heart of Miss Malawi is a commitment to fairness, transparency, and professionalism. The pageant upholds the highest ethical standards in its selection processes, judging criteria, and overall operations."
            />
            <ValueCard
              icon={Heart}
              title="Heritage"
              description="Miss Malawi celebrates and preserves the nation's rich cultural heritage. It embraces and promotes Malawian identity, fostering national pride and cultural appreciation. The pageant serves as a platform for showcasing Malawi's diverse traditions on a national and global stage."
            />
            <ValueCard
              icon={Globe}
              title="Excellence"
              description="Miss Malawi embodies the highest standards of performance, leadership, and representation. Excellence is reflected in the professionalism of the organizers, the calibre of the contestants, and the impact of the winner."
            />
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <ParallaxSection imageUrl="/placeholder.svg?height=1080&width=1920" height="500px">
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Beauty with Purpose</h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl">
          Celebrating Malawian women who combine beauty with intelligence and a passion for positive change.
        </p>
      </ParallaxSection>

      {/* Programs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-4">Our Programs</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover how the Miss Malawi Foundation is making a difference through our various initiatives and
              programs.
            </p>
            <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
          </ParallaxText>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProgramCard
              image="/placeholder.svg?height=400&width=600"
              title="Education Initiatives"
              description="Scholarships and educational programs for young women across Malawi."
            />
            <ProgramCard
              image="/placeholder.svg?height=400&width=600"
              title="Health Awareness"
              description="Campaigns and outreach programs focused on women's health and wellbeing."
            />
            <ProgramCard
              image="/placeholder.svg?height=400&width=600"
              title="Cultural Preservation"
              description="Projects dedicated to celebrating and preserving Malawian cultural heritage."
            />
          </div>

          <div className="text-center mt-12">
            <Button className="bg-[#212224] hover:bg-[#212224]/90">
              View All Programs <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Counter Section */}
      <CounterSection />
      <Counter icon={<Calendar className="h-10 w-10 text-gold" />} label="Years of Legacy" endValue={27} />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224] mb-4">Upcoming Events</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </ParallaxText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EventCard
              date="May 15, 2025"
              title="Miss Malawi Auditions - Northern Region"
              location="Mzuzu University Auditorium"
            />
            <EventCard
              date="June 2, 2025"
              title="Miss Malawi Auditions - Central Region"
              location="Bingu International Convention Centre"
            />
            <EventCard
              date="June 20, 2025"
              title="Miss Malawi Auditions - Southern Region"
              location="Mount Soche Hotel, Blantyre"
            />
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-[#212224] text-[#212224] hover:bg-[#212224]/5">
              View Full Calendar <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <ParallaxSection imageUrl="/placeholder.svg?height=1080&width=1920" height="auto" overlayColor="bg-[#212224]/90">
        <div className="py-20">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
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
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#212224]/5 text-[#212224] mb-6">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

interface ProgramCardProps {
  image: string
  title: string
  description: string
}

function ProgramCard({ image, title, description }: ProgramCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative h-60">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link href="#" className="text-[#212224] font-medium inline-flex items-center hover:text-[#212224]/80">
          Learn more <ArrowRight className="ml-1 h-4 w-4" />
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
      <div className="text-gold font-medium mb-2">{date}</div>
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
