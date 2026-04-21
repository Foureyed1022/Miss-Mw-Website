"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import PageHeader from "@/components/page-header"
import { Mic, Loader2 } from "lucide-react"

type ImpactStoryType = {
  id: string
  name: string
  title: string
  story: string
  image: string
}

export default function ImpactStoriesPage() {
  const [stories, setStories] = useState<ImpactStoryType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storiesRef = collection(db, "impact_stories")
    const storiesQuery = query(storiesRef, orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(
      storiesQuery,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ImpactStoryType, 'id'>)
        }))
        setStories(items)
        setLoading(false)
      },
      (error) => {
        console.error("Error fetching impact stories", error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <PageHeader
        title="Impact Stories"
        description="Real stories of transformation, resilience, and empowerment from across Malawi."
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Voices of Change
            </h2>
            <div className="w-24 h-1 bg-purple mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              Through our initiatives, we've had the privilege of walking alongside incredible individuals who are rewriting their futures and uplifting their communities. Read their inspiring stories below.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-purple mb-4" />
              <p className="text-gray-500 font-medium">Loading stories...</p>
            </div>
          ) : stories.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <Mic className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Stories Yet</h3>
              <p className="text-gray-500">We are currently collecting more impact stories. Check back soon for inspiring updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story) => (
                <div key={story.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="relative h-20 w-20 rounded-full overflow-hidden mr-5 border-4 border-emerald-50 group-hover:border-emerald-100 transition-colors">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                      <span className="inline-block bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {story.title}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <Mic className="absolute -top-2 -left-2 h-6 w-6 text-emerald-200" />
                    <p className="text-gray-700 italic pl-4">"{story.story}"</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
