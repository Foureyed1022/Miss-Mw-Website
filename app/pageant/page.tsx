import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin, Trophy } from "lucide-react"
import PageHeader from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function PageantPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader
        title="Miss Malawi Pageant"
        description="Celebrating beauty, intelligence, and advocacy on Malawi's premier platform"
      />

      {/* Current Pageant */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-emerald-50 text-emerald-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
                Miss Malawi 2025
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-6">
                The Search for the Next Queen
              </h2>
              <p className="text-gray-700 mb-6">
                The Miss Malawi 2026 pageant is now open for applications. We are looking for intelligent, passionate,
                and confident young women who are ready to represent Malawi on the national and international stage.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-purple mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900">Key Dates</h3>
                    <p className="text-gray-700">Applications: March 1 - May 30, 2026</p>
                    <p className="text-gray-700">Regional Auditions: May - June 2026</p>
                    <p className="text-gray-700">Boot Camp: July 15-30, 2026</p>
                    <p className="text-gray-700">Grand Finale: December 5, 2026</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-purple mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900">Venue</h3>
                    <p className="text-gray-700">Bingu International Convention Centre, Lilongwe</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Trophy className="h-5 w-5 text-purple mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900">Prizes</h3>
                    <p className="text-gray-700">
                      K30  million cash prize, a brand new car, international travel opportunities, and a year-long
                      advocacy platform.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/pageant/register">
                <Button className="bg-purple hover:bg-purple/90 text-black">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=1000&width=800"
                alt="Miss Malawi 2025"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="eligibility" className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <TabsList className="inline-flex">
                <TabsTrigger value="eligibility">Eligibility Criteria</TabsTrigger>
                <TabsTrigger value="process">Selection Process</TabsTrigger>
                <TabsTrigger value="rules">Competition Rules</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="eligibility" className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6">Eligibility Criteria</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-bold">Nationality:</span> Must be a Malawian citizen by birth or
                    naturalization.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-bold">Age:</span> Between 18 and 26 years old as of January 1, 2025.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-bold">Education:</span> Minimum of a Malawi School Certificate of Education
                    (MSCE) or equivalent.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-bold">Marital Status:</span> Never married and without children.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-sm font-bold">5</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-bold">Character:</span> Good moral character and no criminal record.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-sm font-bold">6</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-bold">Availability:</span> Must be available for the entire pageant period
                    and, if crowned, for the full year of reign.
                  </p>
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="process" className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6">Selection Process</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">1. Application Phase</h4>
                  <p className="text-gray-700">
                    Candidates submit their applications online or at designated centers. Applications are reviewed for
                    eligibility and completeness.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">2. Regional Auditions</h4>
                  <p className="text-gray-700">
                    Qualified applicants participate in regional auditions held in the Northern, Central, and Southern
                    regions of Malawi. Judges select the top candidates from each region.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">3. Boot Camp</h4>
                  <p className="text-gray-700">
                    Selected contestants attend a two-week boot camp where they receive training in public speaking,
                    etiquette, runway walking, cultural awareness, and advocacy skills.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">4. Preliminary Competitions</h4>
                  <p className="text-gray-700">
                    Contestants participate in preliminary competitions including talent showcase, intelligence
                    assessment, and cultural presentation.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">5. Grand Finale</h4>
                  <p className="text-gray-700">
                    The top finalists compete in the grand finale event, which includes evening gown, traditional
                    attire, and Q&A segments. The winner is crowned based on overall performance.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rules" className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6">Competition Rules</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-gray-900">Code of Conduct</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    All contestants must maintain professional behavior throughout the competition. This includes
                    respectful interaction with other contestants, judges, and staff. Any form of misconduct, including
                    bullying, discrimination, or defamation, will result in immediate disqualification.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-gray-900">Social Media Guidelines</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Contestants must maintain appropriate social media presence during the competition. All posts
                    related to the pageant must be positive and align with the values of the Miss Malawi Foundation.
                    Contestants are encouraged to share their journey but must refrain from posting confidential
                    information about the competition.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-gray-900">Attendance & Punctuality</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Attendance at all scheduled events, rehearsals, and activities is mandatory. Contestants must arrive
                    at least 15 minutes before the scheduled time. Absence or tardiness without prior approval from the
                    organizers may result in point deductions or disqualification.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-gray-900">Judging Criteria</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Contestants will be judged on beauty, intelligence, talent, communication skills, cultural
                    awareness, and advocacy potential. The judging panel's decision is final and not subject to appeal.
                    Detailed scoring breakdowns will be provided to contestants after the competition.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-gray-900">Winner's Obligations</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    The crowned Miss Malawi must fulfill all contractual obligations during her reign, including
                    appearances at events, participation in community projects, and representation at international
                    pageants. Failure to meet these obligations may result in the revocation of the title and associated
                    benefits.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Past Queens */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Past Queens</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Celebrating the legacy of exceptional women who have worn the Miss Malawi crown and their contributions to
              our nation.
            </p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <QueenCard
              image="/placeholder.svg?height=600&width=400"
              name="Tiwonge Munthali"
              year="2018"
              achievement="Miss Malawi"
            />
            <QueenCard
              image="/placeholder.svg?height=600&width=400"
              name="Cecelia Khofi"
              year="2017"
              achievement="Miss Malawi"
            />
            <QueenCard
              image="/placeholder.svg?height=600&width=400"
              name="Jescar Mponda"
              year="2022"
              achievement="Miss Malawi"
            />
            <QueenCard
              image="/placeholder.svg?height=600&width=400"
              name="Faith Chibale"
              year="2012"
              achievement="Miss Malawi"
            />
            <QueenCard
              image="/placeholder.svg?height=600&width=400"
              name="Ella Kabambe"
              year="2012"
              achievement="Miss Malawi"
            />
            <QueenCard
              image="/placeholder.svg?height=600&width=400"
              name="Susan Mtegha"
              year="2011"
              achievement="Miss Malawi"
            />
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-emerald-800 text-emerald-800 hover:bg-emerald-50">
              View All Past Queens
            </Button>
          </div>
        </div>
      </section>

      {/* Miss World Participation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-4">Malawi at Miss World</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Miss Malawi has fronted some of its winners to shape a lasting legacy by representing Malawi at the Miss
              World beauty pageant.
            </p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                <Image src="/placeholder.svg?height=600&width=400" alt="Elizabeth Pulu" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Elizabeth Pulu</h3>
              <p className="text-purple font-medium mb-3">Miss Malawi 2001</p>
              <p className="text-gray-700">
                She made history as the first Miss Malawi to represent the country at the Miss World pageant, paving the
                way for future queens to compete on international platforms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                <Image src="/placeholder.svg?height=600&width=400" alt="Susan Mtegha" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Susan Mtegha</h3>
              <p className="text-purple font-medium mb-3">Miss Malawi 2011</p>
              <p className="text-gray-700">
                Her participation in the Miss World pageant not only showcased Malawian beauty, culture, and talent on
                an international platform but also demonstrated the potential for local pageantry to serve as a gateway
                for global recognition.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                <Image src="/placeholder.svg?height=600&width=400" alt="Ella Kabambe" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Ella Kabambe</h3>
              <p className="text-purple font-medium mb-3">Miss Malawi 2012</p>
              <p className="text-gray-700">
                Followed in Elizabeth Pulu's footsteps by representing Malawi at the Miss World pageant, bringing
                international recognition to the country's beauty industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-purple mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I apply for Miss Malawi?</AccordionTrigger>
                <AccordionContent>
                  You can apply online through our official website or visit one of our designated application centers
                  in major cities. The application form requires personal information, educational background, and a
                  brief statement about why you want to be Miss Malawi.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Is there an application fee?</AccordionTrigger>
                <AccordionContent>
                  Yes, there is a non-refundable application fee of K15,000. This fee helps cover the administrative
                  costs of processing applications and organizing the preliminary events.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What should I prepare for the auditions?</AccordionTrigger>
                <AccordionContent>
                  For the auditions, you should prepare a brief introduction about yourself, a talent showcase (optional
                  but recommended), and be ready to answer questions about current affairs and your personal goals.
                  Dress professionally and bring your application confirmation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can I participate if I have tattoos or piercings?</AccordionTrigger>
                <AccordionContent>
                  Yes, contestants with tattoos and piercings are welcome to participate. However, excessive or
                  offensive tattoos may need to be covered during certain segments of the competition, and extreme body
                  modifications may be evaluated on a case-by-case basis.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What are the responsibilities of Miss Malawi?</AccordionTrigger>
                <AccordionContent>
                  The crowned Miss Malawi serves as a cultural ambassador and advocate for social causes.
                  Responsibilities include attending official events, participating in community service projects,
                  representing Malawi at international pageants, and implementing a personal impact project during the
                  reign.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Still have questions? Contact our team for more information.</p>
              <Button className="bg-emerald-800 hover:bg-emerald-700">Contact Us</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

interface QueenCardProps {
  image: string
  name: string
  year: string
  achievement: string
}

function QueenCard({ image, name, year, achievement }: QueenCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
      <div className="relative h-80">
        <Image
          src={image || "/placeholder.svg"}
          alt={`Miss Malawi ${year} - ${name}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <p className="font-medium">{achievement}</p>
          </div>
        </div>
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-purple font-medium">Miss Malawi {year}</p>
      </div>
    </div>
  )
}
