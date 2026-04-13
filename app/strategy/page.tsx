import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, BarChart3, Briefcase, Coins } from "lucide-react"
import PageHeader from "@/components/page-header"

export default function StrategyPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Crowning The Future" description="Miss Malawi's Pageant Strategy" />

      {/* Strategy Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-[#7C3AED]enter">
            <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-emerald-800 mb-6">
              A commitment to nurturing a new generation of influential Malawian female leaders who will leave a lasting
              legacy.
            </h2>
            <div className="w-24 h-1 bg-purple mx-auto mb-8"></div>

            <div className="text-left space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Why A Need For A Strategy?</h3>
                <p className="text-gray-700">
                  Since its founding Miss Malawi has been a platform for young Malawian women to showcase their beauty,
                  intelligence, and professional talents while advocating for social causes. However, in recent years,
                  several challenges have emerged, such as limited funding constraints, ineffective efforts in bridging
                  the gap between modern pageant ideals and traditional values, complexity of countering negative press
                  and public misconceptions of the pageant's image, and limitations in ensuring sustained post-event
                  support for winners to effectively fulfil their formal duties. These issues underscore the need for a
                  well-structured strategic plan to ensure the sustainability, credibility, and impact of the event.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Plan</h3>
                <p className="text-gray-700">
                  The future of Miss Malawi is poised for transformation with a revitalized structure that focuses on a
                  forward-thinking approach aimed at positioning Miss Malawi as a prestigious and impactful platform for
                  empowerment, innovation, and national representation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Focus Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-[#7C3AED]enter mb-12">
            <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-emerald-800 mb-4">Strategic Focus</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Crowning the future will focus on four strategic areas:</p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StrategyCard
              number="1"
              title="Strategic Leadership"
              icon={<Award className="h-8 w-8 text-emerald-800" />}
              description="Establishing a visionary leadership approach that fosters innovation, accountability, strengthening governance structures, and sustainable growth."
              points={[
                "Appoint experienced professionals in event management, fashion, marketing, and governance to oversee operations.",
                "Provide training and mentorship programs for contestants in leadership, public speaking, and social advocacy.",
                "Foster partnerships with government agencies, NGOs, and the private sector to amplify the pageant's impact.",
              ]}
            />

            <StrategyCard
              number="2"
              title="Policy"
              icon={<BarChart3 className="h-8 w-8 text-emerald-800" />}
              description="Developing and implementing policies that align with industry standards, legal requirements, and organizational objectives to enhance internal controls, efficiency and compliance."
              points={[
                "Maintain strict guidelines on ethical conduct, contestant eligibility, and judging criteria to ensure credibility.",
                "Implement policies that promote inclusivity, gender equality, and professionalism.",
                "Invest in training to promote professional talents, skills and achievements beyond physical beauty.",
                "Focus on contestants with clear strategies to uphold Malawian culture and modern society values that uplifts the voices of Malawians as a means of countering negative press and stereotypes.",
              ]}
            />

            <StrategyCard
              number="3"
              title="Financial Management"
              icon={<Coins className="h-8 w-8 text-emerald-800" />}
              description="Ensuring prudent financial planning, revenue diversification, resource allocation, risk management, and reporting to maintain fiscal stability and drive growth."
              points={[
                "Diversify revenue streams through sponsorships, merchandise sales, and ticketed events.",
                "Ensure robust financial management systems, internal controls, and compliance measures will enhance transparency and long-term sustainability.",
                "Allocate funds effectively towards contestant development, branding, and corporate social responsibility initiatives.",
                "Provide economic opportunities for contestants based on their strengths and aspirations rather than a one-size fits all approach.",
              ]}
            />

            <StrategyCard
              number="4"
              title="Branding"
              icon={<Briefcase className="h-8 w-8 text-emerald-800" />}
              description="Building a strong, recognizable brand identity that resonates with target audiences, enhance visibility, engagement and fosters fan base loyalty."
              points={[
                "Position Miss Malawi as a prestigious, influential platform for young women's empowerment.",
                "Establish strong partnerships with corporate sponsors, media houses, and cultural institutions.",
                "Use digital platforms, storytelling, and creative campaigns to enhance public engagement.",
                "Incorporate Malawi's culture, tourism, and developmental themes into branding efforts.",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-[#7C3AED]enter">
            <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold mb-6">A Legacy of Greatness</h2>
            <p className="text-lg mb-8">
              Join us in shaping the future of Miss Malawi and empowering the next generation of Malawian women leaders.
            </p>
            <Button className="bg-purple hover:bg-purple/90 text-black">
              Get Involved <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-xl mx-auto text-[#7C3AED]enter">
            <h3 className="font-playfair text-2xl font-bold text-emerald-800 mb-6">Contact Us</h3>
            <address className="not-italic text-gray-700 space-y-2">
              <p>Miss Malawi crown office</p>
              <p>P.O Box X407,</p>
              <p>Crossroads, Lilongwe</p>
              <p className="pt-2">+265 996 263 843 / +265 882 922 062</p>
              <p>info@missmalawi.com</p>
            </address>
          </div>
        </div>
      </section>
    </div>
  )
}

interface StrategyCardProps {
  number: string
  title: string
  icon: React.ReactNode
  description: string
  points: string[]
}

function StrategyCard({ number, title, icon, description, points }: StrategyCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center mr-4">{icon}</div>
        <div>
          <div className="text-purple font-bold text-lg">{number}</div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
      </div>

      <p className="text-gray-700 mb-6">{description}</p>

      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-bold">•</span>
            </div>
            <p className="text-gray-700">{point}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

