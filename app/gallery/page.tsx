"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import PageHeader from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type GalleryItemType = { id: number; title: string; src: string }
type GalleryData = {
  events: GalleryItemType[]
  queens: GalleryItemType[]
  programs: GalleryItemType[]
  international: GalleryItemType[]
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryItemType | null>(null)
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/gallery")
      const data = (await res.json()) as GalleryData
      setGalleryData(data)
    }
    load()
  }, [])

  const openLightbox = (image: { id: number; title: string; src: string }) => {
    setSelectedImage(image)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  return (
    <div className="flex flex-col w-full">
      <PageHeader title="Gallery" description="Capturing moments of beauty, empowerment, and impact" />

      {/* Gallery Tabs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {!galleryData ? (
            <p className="text-[#7C3AED]enter text-gray-500">Loading gallery...</p>
          ) : (
          <Tabs defaultValue="all" className="w-full">
            <div className="text-[#7C3AED]enter mb-8">
              <TabsList className="inline-flex">
                <TabsTrigger value="all">All Photos</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="queens">Queens</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="international">International</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...galleryData.events, ...galleryData.queens, ...galleryData.programs, ...galleryData.international]
                  .slice(0, 16)
                  .map((image) => (
                    <GalleryItem key={image.id} image={image} onClick={() => openLightbox(image)} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryData.events.map((image) => (
                  <GalleryItem key={image.id} image={image} onClick={() => openLightbox(image)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="queens">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryData.queens.map((image) => (
                  <GalleryItem key={image.id} image={image} onClick={() => openLightbox(image)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="programs">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryData.programs.map((image) => (
                  <GalleryItem key={image.id} image={image} onClick={() => openLightbox(image)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="international">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryData.international.map((image) => (
                  <GalleryItem key={image.id} image={image} onClick={() => openLightbox(image)} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          )}

          <div className="text-[#7C3AED]enter mt-12">
            <Button className="bg-emerald-800 hover:bg-emerald-700">Load More Photos</Button>
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-[#7C3AED]enter mb-12">
            <h2 className="font-playfair text-[#7C3AED]xl md:text-4xl font-bold text-emerald-800 mb-4">Video Gallery</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Watch highlights from our pageants, programs, and special events
            </p>
            <div className="w-24 h-1 bg-purple mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <VideoItem
              title="Miss Malawi 2022 Grand Finale Highlights"
              thumbnail="/placeholder.svg?height=400&width=600"
              duration="5:24"
            />
            <VideoItem
              title="Behind the Scenes: Boot Camp Training"
              thumbnail="/placeholder.svg?height=400&width=600"
              duration="3:47"
            />
            <VideoItem
              title="Girls Education Initiative Documentary"
              thumbnail="/placeholder.svg?height=400&width=600"
              duration="8:12"
            />
            <VideoItem
              title="Interview with Jescar Mponda - Miss Malawi 2022"
              thumbnail="/placeholder.svg?height=400&width=600"
              duration="4:35"
            />
            <VideoItem
              title="Cultural Heritage Showcase"
              thumbnail="/placeholder.svg?height=400&width=600"
              duration="6:18"
            />
            <VideoItem
              title="Miss Malawi at Miss World 2012"
              thumbnail="/placeholder.svg?height=400&width=600"
              duration="7:02"
            />
          </div>

          <div className="text-[#7C3AED]enter mt-12">
            <Button className="bg-emerald-800 hover:bg-emerald-700">View All Videos</Button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/10 z-10"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
            <div className="relative h-[70vh]">
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
            <div className="bg-white p-4 text-[#7C3AED]enter">
              <h3 className="text-xl font-bold text-gray-900">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface GalleryItemProps {
  image: {
    id: number
    title: string
    src: string
  }
  onClick: () => void
}

function GalleryItem({ image, onClick }: GalleryItemProps) {
  return (
    <div
      className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${image.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick()
        }
      }}
    >
      <Image
        src={image.src || "/placeholder.svg"}
        alt={image.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-4 w-full">
          <h3 className="text-white font-medium text-sm truncate">{image.title}</h3>
        </div>
      </div>
    </div>
  )
}

interface VideoItemProps {
  title: string
  thumbnail: string
  duration: string
}

function VideoItem({ title, thumbnail, duration }: VideoItemProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer">
      <div className="relative h-48">
        <Image src={thumbnail || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
          <div className="h-16 w-16 rounded-full bg-white/30 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-purple flex items-center justify-center">
              <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{duration}</div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{title}</h3>
      </div>
    </div>
  )
}

