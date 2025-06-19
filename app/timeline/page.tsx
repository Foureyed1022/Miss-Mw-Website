import Image from "next/image"
import PageHeader from "@/components/page-header"

export default function TimelinePage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Pageant History Timeline" description="A journey through the legacy of Miss Malawi" />

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-100"></div>

              <TimelineItem
                year="1999"
                name="Irene Nkhwazi"
                image="/placeholder.svg?height=400&width=300"
                isLeft={true}
              />

              <TimelineItem
                year="2000"
                name="Elizabeth Pulu"
                image="/placeholder.svg?height=400&width=300"
                isLeft={false}
              />

              <TimelineItem
                year="2001"
                name="Linda Longwe"
                image="/placeholder.svg?height=400&width=300"
                isLeft={true}
              />

              <TimelineItem
                year="2002"
                name="Blandina Mlenga"
                image="/placeholder.svg?height=400&width=300"
                isLeft={false}
              />

              <TimelineItem
                year="2003"
                name="Florence Zeka"
                image="/placeholder.svg?height=400&width=300"
                isLeft={true}
              />

              <TimelineItem
                year="2004"
                name="Perth Msiska"
                image="/placeholder.svg?height=400&width=300"
                isLeft={false}
              />

              <TimelineItem year="2005" name="Mable Pulu" image="/placeholder.svg?height=400&width=300" isLeft={true} />

              <TimelineItem
                year="2007"
                name="Rachel Landson"
                image="/placeholder.svg?height=400&width=300"
                isLeft={false}
              />

              <TimelineItem
                year="2009"
                name="Joyce Mphande"
                image="/placeholder.svg?height=400&width=300"
                isLeft={true}
              />

              <TimelineItem
                year="2010"
                name="Susan Mtegha"
                image="/placeholder.svg?height=400&width=300"
                isLeft={false}
              />

              <TimelineItem
                year="2011"
                name="Faith Chibale"
                image="/placeholder.svg?height=400&width=300"
                isLeft={true}
              />

              <TimelineItem
                year="2012"
                name="Ella Kabambe"
                image="/placeholder.svg?height=400&width=300"
                isLeft={false}
              />

              <TimelineItem
                year="2017"
                name="Cecelia Khofi"
                image="/placeholder.svg?height=400&width=300"
                isLeft={true}
              />

              <TimelineItem
                year="2018"
                name="Tiwonge Munthali"
                image="/placeholder.svg?height=400&width=300"
                isLeft={false}
              />

              <TimelineItem
                year="2022"
                name="Jescar Mponda"
                image="/placeholder.svg?height=400&width=300"
                isLeft={true}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

interface TimelineItemProps {
  year: string
  name: string
  image: string
  isLeft: boolean
}

function TimelineItem({ year, name, image, isLeft }: TimelineItemProps) {
  return (
    <div className="relative z-10 mb-12">
      <div className={`flex items-center justify-center ${isLeft ? "flex-row-reverse" : "flex-row"}`}>
        <div className={`w-5/12 ${isLeft ? "text-right pr-8" : "text-left pl-8"}`}>
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Miss Malawi ${year} - ${name}`}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <p className="text-gold font-medium">Miss Malawi {year}</p>
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-gold border-4 border-white shadow"></div>
        </div>

        <div className={`w-5/12 ${isLeft ? "text-left pl-8" : "text-right pr-8"}`}>
          <div className="bg-emerald-50 p-4 rounded-lg">
            <span className="text-2xl font-bold text-emerald-800">{year}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
