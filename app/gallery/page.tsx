"use client"

import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, Play, Maximize2, Video, Images, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import PageHeader from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GalleryItem } from "@/types"
import { subscribeToGallery } from "@/lib/firestore"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog"

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  useEffect(() => {
    const unsub = subscribeToGallery((data) => {
      setItems(data)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  // Derived data
  const images = useMemo(() => items.filter(i => i.type === 'image'), [items])
  const videos = useMemo(() => items.filter(i => i.type === 'video'), [items])

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return images
    return images.filter(i => i.category.toLowerCase() === activeCategory.toLowerCase())
  }, [images, activeCategory])

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredItems.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredItems, currentPage])

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  if (loading) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-gray-50">
        <PageHeader title="Gallery" description="Capturing moments of beauty, empowerment, and impact" />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Media...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full bg-white font-sans">
      <PageHeader title="Gallery" description="Capturing moments of beauty, empowerment, and impact" />

      {/* Gallery Tabs (Images) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#3D3B48] mb-6">Media Collections</h2>
            <p className="text-gray-500 max-w-2xl text-lg leading-relaxed">
              Explore our curated collections capturing the essence of Malawian beauty and cultural leadership.
            </p>
          </div>

          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="h-auto p-2 bg-gray-50/50 backdrop-blur-md rounded-3xl border border-gray-100 flex-wrap justify-center gap-2">
                <TabsTrigger value="all" className="rounded-2xl px-8 py-3 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white data-[state=active]:shadow-xl transition-all font-bold text-sm">All Photos</TabsTrigger>
                <TabsTrigger value="events" className="rounded-2xl px-8 py-3 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white data-[state=active]:shadow-xl transition-all font-bold text-sm text-gray-500">Events</TabsTrigger>
                <TabsTrigger value="queens" className="rounded-2xl px-8 py-3 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white data-[state=active]:shadow-xl transition-all font-bold text-sm text-gray-500">Queens</TabsTrigger>
                <TabsTrigger value="programs" className="rounded-2xl px-8 py-3 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white data-[state=active]:shadow-xl transition-all font-bold text-sm text-gray-500">Programs</TabsTrigger>
                <TabsTrigger value="international" className="rounded-2xl px-8 py-3 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white data-[state=active]:shadow-xl transition-all font-bold text-sm text-gray-500">International</TabsTrigger>
              </TabsList>
            </div>

            <div className="relative">
              <TabsContent value={activeCategory} className="mt-0 focus-visible:outline-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {paginatedItems.map((image) => (
                    <GalleryItemCard key={image.id} image={image} onClick={() => openLightbox(image)} />
                  ))}
                </div>
                {paginatedItems.length === 0 && <EmptyState text={`No photos found in this collection.`} />}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-16">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full w-12 h-12 border-gray-200"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "ghost"}
                          className={`w-12 h-12 rounded-full font-bold ${currentPage === page ? 'bg-[#7C3AED] text-white' : 'text-gray-500 hover:text-[#7C3AED]'}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full w-12 h-12 border-gray-200"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Video Gallery */}
      <section className="py-24 bg-[#FAFAFA] border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#3D3B48] mb-6">Video Highlights</h2>
            <p className="text-gray-500 max-w-2xl text-lg leading-relaxed">
              Experience the journey through our official highlights and event coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {videos.length === 0 && (
            <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
              <Video className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Stay tuned for video updates</p>
            </div>
          )}

          <div className="text-center mt-20">
            <Button asChild variant="outline" className="rounded-full px-12 py-7 border-2 border-gray-100 hover:border-[#7C3AED] hover:text-[#7C3AED] font-black tracking-widest uppercase text-xs shadow-xl hover:shadow-2xl transition-all bg-white">
              <a href="https://www.youtube.com/@MissMalawiOfficial" target="_blank" rel="noopener noreferrer">
                Explore YouTube Channel
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-6xl p-0 border-none bg-black/95 shadow-none rounded-none sm:rounded-[3rem] overflow-hidden">
          {selectedImage && (
            <div className="flex flex-col relative">
              <DialogTitle className="sr-only">{selectedImage.title}</DialogTitle>
              <div className="relative h-[75vh] w-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              {/* <div className="p-8 bg-white/5 backdrop-blur-md absolute bottom-0 left-0 right-0 border-t border-white/10 hidden md:block">
                <div className="flex justify-between items-center max-w-4xl mx-auto">
                  <div>
                    <span className="text-[10px] font-black text-[#7C3AED] uppercase tracking-[0.3em] mb-2 block">
                      {selectedImage.category}
                    </span>
                    <h3 className="text-2xl font-playfair font-bold text-white leading-tight">
                      {selectedImage.title}
                    </h3>
                  </div>
                  <Button onClick={closeLightbox} variant="ghost" className="text-white bg-white/10 hover:bg-white/20 rounded-2xl">
                    Close View
                  </Button>
                </div>
              </div> */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all z-50 border border-white/10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function GalleryItemCard({ image, onClick }: { image: GalleryItem, onClick: () => void }) {
  return (
    <div
      className="group relative aspect-square rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 bg-gray-50 border border-gray-100"
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={image.title}
        fill
        className="object-contain transition-all duration-1000 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 flex flex-col justify-end p-8">
        <span className="text-[8px] font-black text-white/60 uppercase tracking-[0.3em] mb-2">
          {image.category}
        </span>
        <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 mb-4">
          {image.title}
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
            <Maximize2 className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Category Badge (Standard) */}
      <div className="absolute top-6 left-6 opacity-100 group-hover:opacity-0 transition-opacity">
        <div className="bg-white/90 backdrop-blur-md py-1.5 px-4 rounded-full text-[9px] font-black text-[#7C3AED] uppercase tracking-widest shadow-lg">
          {image.category}
        </div>
      </div>
    </div>
  )
}

function VideoCard({ video }: { video: GalleryItem }) {
  const embedUrl = useMemo(() => {
    let videoId = ""
    const url = video.src
    if (!url) return ""

    try {
      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0]
      } else if (url.includes("youtube.com/watch")) {
        const urlObj = new URL(url)
        videoId = urlObj.searchParams.get("v") || ""
      } else if (url.includes("youtube.com/embed/")) {
        videoId = url.split("embed/")[1]?.split("?")[0]
      }
    } catch (e) {
      return ""
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : ""
  }, [video.src])

  return (
    <div className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col h-full">
      <div className="relative aspect-video w-full bg-gray-100">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <Video className="h-10 w-10 opacity-20" />
          </div>
        )}
      </div>
      <div className="p-10 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-[#3D3B48] leading-snug group-hover:text-[#7C3AED] transition-colors line-clamp-2">
          {video.title}
        </h3>
        <div className="mt-auto pt-8 flex items-center justify-between">
          <Badge className="bg-gray-100 text-gray-500 border-none font-bold text-[9px] px-3 py-1 rounded-full uppercase tracking-widest">
            {video.category}
          </Badge>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="py-32 text-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-100">
      <Images className="h-12 w-12 text-gray-200 mx-auto mb-4" />
      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{text}</p>
    </div>
  )
}
