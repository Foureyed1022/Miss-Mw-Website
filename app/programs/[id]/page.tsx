import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Heart, Users, Lightbulb, TrendingUp } from "lucide-react"
import PageHeader from "@/components/page-header"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export const dynamic = "force-dynamic"

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

async function getProgram(id: string): Promise<Program | null> {
  try {
    const docRef = doc(db, "programs", id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) return null
    
    const data = docSnap.data() as Record<string, any>
    return {
      id: docSnap.id,
      title: data.title || "",
      description: data.description || "",
      fullDescription: data.fullDescription || data.description || "",
      mission: data.mission || "",
      category: data.category || "",
      activities: Array.isArray(data.activities) ? data.activities : [],
      impact: Array.isArray(data.impact) ? data.impact : [],
      image: data.image || "/placeholder.svg",
    }
  } catch (error) {
    console.error("Error fetching program from Firestore SDK:", error)
    return null
  }
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const program = await getProgram(id)

  if (!program) {
    notFound()
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <PageHeader title={program.title} description={program.category + " Initiative"} />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <Link href="/programs">
              <Button variant="ghost" className="text-[#7C3AED] hover:text-[#6D28D9] font-bold group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Programs
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div>
                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#3D3B48] mb-8 relative">
                  The Vision
                  <div className="absolute -bottom-2 left-0 w-16 h-1.5 bg-[#7C3AED] rounded-full"></div>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">{program.fullDescription}</p>
              </div>

              <div className="bg-[#7C3AED]/5 p-8 rounded-[2.5rem] border border-[#7C3AED]/10 shadow-sm">
                <h3 className="text-2xl font-bold text-[#3D3B48] mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#7C3AED] flex items-center justify-center text-white">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  Core Mission
                </h3>
                <p className="text-gray-600 italic leading-relaxed text-lg">"{program.mission}"</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#3D3B48] mb-8">Program Initiatives</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {program.activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm group hover:border-[#7C3AED]/30 transition-all">
                      <div className="w-8 h-8 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-gray-600 font-medium">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-10 lg:sticky lg:top-24">
              <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image 
                  src={program.image} 
                  alt={program.title} 
                  fill 
                  className="object-contain bg-gray-50" 
                  priority
                />
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <h3 className="text-2xl font-bold text-[#3D3B48] mb-8 flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-[#7C3AED]" /> Impact & Outcomes
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {program.impact.map((stat, index) => (
                    <div key={index} className="bg-gray-50/50 p-6 rounded-2xl border-l-4 border-[#7C3AED] hover:bg-white hover:shadow-md transition-all">
                      <p className="text-gray-700 font-bold">{stat}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#3D3B48] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                <h3 className="text-2xl font-bold mb-4">Partner with Us</h3>
                <p className="mb-8 text-gray-400 leading-relaxed">Your support enables us to expand this initiative and touch more lives across Malawi.</p>
                <div className="flex flex-col gap-4">
                  <Link href="/donate">
                    <Button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full py-7 font-bold text-lg shadow-xl shadow-purple-900/20">
                      <Heart className="mr-2 h-5 w-5 fill-current" /> Donate to Program
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-full py-7 font-bold">
                      <Users className="mr-2 h-5 w-5" /> Volunteer / Partner
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
