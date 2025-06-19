import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, GraduationCap, Heart, Lightbulb, Mic, Users } from "lucide-react"
import PageHeader from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ParallaxSection from "@/components/parallax-section"
import ParallaxText from "@/components/parallax-text"
import ParallaxImage from "@/components/parallax-image"

export default function ProgramsPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="Programs & Projects"
        description="Empowering Malawian women through impactful initiatives and community engagement"
      />

      {/* Programs Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ParallaxText speed={0.2}>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-6">
                  Making a Difference in Malawi
                </h2>
                <p className="text-gray-700 mb-6 text-lg">
                  Miss Malawi Foundation is committed to creating meaningful impact through various programs and
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
              <ParallaxImage
                src="/placeholder.svg?height=1000&width=800"
                alt="Miss Malawi community program"
                className="h-[500px] w-full"
                width={800}
                height={1000}
              />
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
            "Our programs are designed to create lasting impact and empower the next generation of Malawian women
            leaders."
          </p>
          <p className="mt-4 text-gold font-medium">Miss Malawi Foundation</p>
        </div>
      </ParallaxSection>

      {/* Featured Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Featured Programs</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our signature initiatives that create meaningful impact across Malawi
            </p>
            <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
          </ParallaxText>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProgramCard
              icon={<GraduationCap className="h-8 w-8" />}
              title="Girls Education Initiative"
              description="Providing scholarships, mentorship, and resources to support girls' education across Malawi, with a focus on rural communities."
              image="/placeholder.svg?height=400&width=600"
            />
            <ProgramCard
              icon={<Heart className="h-8 w-8" />}
              title="Women's Health Awareness"
              description="Campaigns and outreach programs focused on reproductive health, maternal care, and general wellness for women of all ages."
              image="/placeholder.svg?height=400&width=600"
            />
            <ProgramCard
              icon={<BookOpen className="h-8 w-8" />}
              title="Cultural Heritage Preservation"
              description="Projects dedicated to celebrating and preserving Malawian cultural traditions, arts, and practices for future generations."
              image="/placeholder.svg?height=400&width=600"
            />
          </div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="education" className="w-full">
            <div className="text-center mb-8">
              <TabsList className="inline-flex">
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
                <TabsTrigger value="leadership">Leadership</TabsTrigger>
                <TabsTrigger value="culture">Cultural</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="education" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <ParallaxImage
                    src="/placeholder.svg?height=800&width=600"
                    alt="Education programs"
                    className="h-[400px] w-full"
                    width={600}
                    height={800}
                  />
                </div>
                <div>
                  <ParallaxText speed={0.2}>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4">Education Programs</h3>
                    <p className="text-gray-700 mb-6">
                      Our education initiatives aim to increase access to quality education for girls and young women
                      across Malawi. We believe that education is the foundation for empowerment and sustainable
                      development.
                    </p>
                    <div className="space-y-4">
                      <ProgramItem
                        title="Miss Malawi Scholarship Fund"
                        description="Providing financial support to young women pursuing higher education in various fields."
                      />
                      <ProgramItem
                        title="Rural Schools Outreach"
                        description="Improving educational resources and infrastructure in underserved rural communities."
                      />
                      <ProgramItem
                        title="Literacy Campaign"
                        description="Promoting reading and writing skills through book donations and reading clubs."
                      />
                      <ProgramItem
                        title="STEM for Girls"
                        description="Encouraging girls to pursue careers in science, technology, engineering, and mathematics."
                      />
                    </div>
                  </ParallaxText>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="health" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <ParallaxImage
                    src="/placeholder.svg?height=800&width=600"
                    alt="Health programs"
                    className="h-[400px] w-full"
                    width={600}
                    height={800}
                  />
                </div>
                <div>
                  <ParallaxText speed={0.2}>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4">Health Programs</h3>
                    <p className="text-gray-700 mb-6">
                      Our health initiatives focus on improving access to healthcare information and services for women
                      and girls. We work to address key health challenges facing Malawian women through awareness,
                      education, and advocacy.
                    </p>
                    <div className="space-y-4">
                      <ProgramItem
                        title="Reproductive Health Education"
                        description="Providing accurate information about reproductive health to young women across Malawi."
                      />
                      <ProgramItem
                        title="Maternal Health Campaign"
                        description="Supporting expectant mothers with resources and information for healthy pregnancies."
                      />
                      <ProgramItem
                        title="Mental Health Awareness"
                        description="Breaking stigma around mental health issues and promoting wellbeing."
                      />
                      <ProgramItem
                        title="Health Screening Initiatives"
                        description="Facilitating access to preventive health screenings in partnership with healthcare providers."
                      />
                    </div>
                  </ParallaxText>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="leadership" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <ParallaxImage
                    src="/placeholder.svg?height=800&width=600"
                    alt="Leadership programs"
                    className="h-[400px] w-full"
                    width={600}
                    height={800}
                  />
                </div>
                <div>
                  <ParallaxText speed={0.2}>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4">Leadership Development</h3>
                    <p className="text-gray-700 mb-6">
                      Our leadership programs aim to nurture the next generation of Malawian female leaders. We provide
                      training, mentorship, and opportunities for young women to develop their leadership potential and
                      make a positive impact in their communities.
                    </p>
                    <div className="space-y-4">
                      <ProgramItem
                        title="Young Leaders Mentorship"
                        description="Connecting aspiring young leaders with established professionals for guidance and support."
                      />
                      <ProgramItem
                        title="Public Speaking Workshop"
                        description="Building confidence and communication skills through structured training sessions."
                      />
                      <ProgramItem
                        title="Entrepreneurship Training"
                        description="Equipping young women with business skills and knowledge to start their own ventures."
                      />
                      <ProgramItem
                        title="Civic Engagement Initiative"
                        description="Encouraging participation in community decision-making and governance processes."
                      />
                    </div>
                  </ParallaxText>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="culture" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <ParallaxImage
                    src="/placeholder.svg?height=800&width=600"
                    alt="Cultural programs"
                    className="h-[400px] w-full"
                    width={600}
                    height={800}
                  />
                </div>
                <div>
                  <ParallaxText speed={0.2}>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4">Cultural Programs</h3>
                    <p className="text-gray-700 mb-6">
                      Our cultural initiatives celebrate and preserve Malawi's rich heritage. We promote cultural
                      awareness, appreciation, and expression through various activities and events that showcase
                      Malawian traditions, arts, and practices.
                    </p>
                    <div className="space-y-4">
                      <ProgramItem
                        title="Traditional Arts Showcase"
                        description="Exhibitions and performances highlighting Malawi's diverse artistic traditions."
                      />
                      <ProgramItem
                        title="Cultural Heritage Documentation"
                        description="Recording and preserving traditional knowledge, practices, and oral histories."
                      />
                      <ProgramItem
                        title="Indigenous Language Promotion"
                        description="Supporting the use and preservation of Malawi's indigenous languages."
                      />
                      <ProgramItem
                        title="Cultural Exchange Programs"
                        description="Facilitating cultural exchange between different regions of Malawi and internationally."
                      />
                    </div>
                  </ParallaxText>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="community" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <ParallaxImage
                    src="/placeholder.svg?height=800&width=600"
                    alt="Community programs"
                    className="h-[400px] w-full"
                    width={600}
                    height={800}
                  />
                </div>
                <div>
                  <ParallaxText speed={0.2}>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-4">Community Service</h3>
                    <p className="text-gray-700 mb-6">
                      Our community service initiatives focus on addressing local needs and challenges. We engage in
                      various projects that improve living conditions, promote sustainable development, and foster
                      community cohesion across Malawi.
                    </p>
                    <div className="space-y-4">
                      <ProgramItem
                        title="Clean Water Projects"
                        description="Improving access to clean water in rural communities through well construction and maintenance."
                      />
                      <ProgramItem
                        title="Environmental Conservation"
                        description="Tree planting and environmental education to combat deforestation and climate change."
                      />
                      <ProgramItem
                        title="Food Security Initiative"
                        description="Supporting sustainable agriculture and nutrition education in vulnerable communities."
                      />
                      <ProgramItem
                        title="Community Infrastructure"
                        description="Building and renovating community facilities such as schools, clinics, and markets."
                      />
                    </div>
                  </ParallaxText>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <ParallaxText className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Impact Stories</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Real stories of transformation and empowerment through our programs
            </p>
            <div className="w-24 h-1 bg-gold mx-auto mt-4"></div>
          </ParallaxText>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ImpactStory
              image="/placeholder.svg?height=400&width=400"
              name="Chimwemwe Banda"
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
              story="As a health ambassador trained by Miss Malawi Foundation, I've helped hundreds of women in my village access vital health information and services, improving maternal health outcomes."
            />
          </div>

          <div className="text-center mt-12">
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
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Get Involved</h2>
          <p className="mb-8 text-lg">
            There are many ways to support our programs and make a difference in the lives of Malawian women and
            communities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 p-6 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold text-black mb-4">
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
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold text-black mb-4">
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
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold text-black mb-4">
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
  icon: React.ReactNode
  title: string
  description: string
  image: string
}

function ProgramCard({ icon, title, description, image }: ProgramCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold text-black mb-2">
              {icon}
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-4">{description}</p>
        <Link href="#" className="text-emerald-800 font-medium inline-flex items-center hover:text-emerald-700">
          Learn more <ArrowRight className="ml-1 h-4 w-4" />
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
    <div className="border-l-4 border-gold pl-4 py-2">
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
          <p className="text-gold">{title}</p>
        </div>
      </div>
      <div className="relative">
        <Mic className="absolute -top-2 -left-2 h-6 w-6 text-emerald-200" />
        <p className="text-gray-700 italic pl-4">{story}</p>
      </div>
    </div>
  )
}
