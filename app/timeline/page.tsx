"use client"

import Image from "next/image"
import { useState } from "react"
import PageHeader from "@/components/page-header"

export default function TimelinePage() {
  const [selectedImage, setSelectedImage] = useState<{ image: string; name: string; year: string } | null>(null)

  const handleImageClick = (image: string, name: string, year: string) => {
    setSelectedImage({ image, name, year })
  }

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
                image="/Misi.png?height=500&width=400"
                isLeft={true}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2000"
                name="Elizabeth Pulu"
                image="/queens/Elizabeth.jpeg?height=500&width=400"
                isLeft={false}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2001"
                name="Linda Longwe"
                image="/Misi.png?height=500&width=400"
                isLeft={true}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2002"
                name="Blandina Mlenga"
                image="/queens/Blandina.jpeg?height=500&width=400"
                isLeft={false}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2003"
                name="Florence Zeka"
                image="/Misi.png?height=500&width=400"
                isLeft={true}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2004"
                name="Perth Msiska"
                image="/queens/Perth.png?height=500&width=400"
                isLeft={false}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2005"
                name="Mable Pulu"
                image="/Misi.png?height=500&width=400"
                isLeft={true}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2007"
                name="Rachel Landson"
                image="/queens/rachel.png?height=500&width=400"
                isLeft={false}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2009"
                name="Joyce Mphande"
                image="/queens/joyce.png?height=500&width=400"
                isLeft={true}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2010"
                name="Susan Mtegha"
                image="/queens/Susan.png?height=500&width=400"
                isLeft={false}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2011"
                name="Faith Chibale"
                image="/queens/Faith.jpeg?height=500&width=400"
                isLeft={true}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2012"
                name="Ella Kabambe"
                image="/queens/ella.png?height=500&width=400"
                isLeft={false}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2017"
                name="Cecelia Khofi"
                image="/queens/cecelia.jpg?height=500&width=400"
                isLeft={true}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2018"
                name="Tiwonge Munthali"
                image="/queens/Tiwonge.jpg?height=500&width=400"
                isLeft={false}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2022"
                name="Jescar Mponda"
                image="/queens/Jesca.jpeg?height=500&width=400"
                isLeft={true}
                onImageClick={handleImageClick}
              />

              <TimelineItem
                year="2025"
                name="Thandie Chisi"
                image="/queens/Thandie.jpeg?height=500&width=400"
                isLeft={false}
                onImageClick={handleImageClick}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
              aria-label="Close image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-900"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage.image || "/placeholder.svg"}
                alt={`Miss Malawi ${selectedImage.year} - ${selectedImage.name}`}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-2xl font-bold text-white">{selectedImage.name}</h3>
              <p className="text-lg text-purple-200">Miss Malawi {selectedImage.year}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface TimelineItemProps {
  year: string
  name: string
  image: string
  isLeft: boolean
  onImageClick: (image: string, name: string, year: string) => void
}

function TimelineItem({ year, name, image, isLeft, onImageClick }: TimelineItemProps) {
  return (
    <div className="relative z-10 mb-12">
      <div className={`flex flex-col items-center justify-center md:flex-row ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}`}>
        <div className={`w-full md:w-5/12 ${isLeft ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
          <div className="bg-emerald-50 p-4 rounded-lg mb-4 md:mb-0 w-full">
            <span className="text-2xl font-bold text-emerald-800">{year}</span>
          </div>
        </div>

        <div className="w-full flex items-center justify-center my-4 md:absolute md:left-1/2 md:top-0 md:transform md:-translate-x-1/2 md:h-full md:my-0">
          <div className="h-8 w-8 rounded-full bg-purple border-4 border-white shadow"></div>
        </div>

        <div className={`w-full md:w-5/12 ${isLeft ? "md:text-left md:pl-8" : "md:text-right md:pr-8"}`}>
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div
              className="relative h-80 mb-4 overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => onImageClick(image, name, year)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Miss Malawi ${year} - ${name}`}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <p className="text-purple font-medium">Miss Malawi {year}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
