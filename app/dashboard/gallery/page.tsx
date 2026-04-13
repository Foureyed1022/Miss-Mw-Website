"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  Upload, 
  Filter,
  MoreVertical,
  Play
} from "lucide-react"
import Image from "next/image"

type GalleryItem = { id: number; title: string; src: string; category: string; type: "image" | "video" }

export default function GalleryManagementPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/gallery")
      const data = await res.json()
      // Transform old data format to the new unified format
      const unified: GalleryItem[] = []
      Object.entries(data).forEach(([cat, list]: [string, any]) => {
        list.forEach((item: any) => {
          unified.push({ 
            ...item, 
            category: cat.charAt(0).toUpperCase() + cat.slice(1),
            type: item.src.endsWith(".mp4") ? "video" : "image"
          })
        })
      })
      setItems(unified)
      setLoading(false)
    }
    load()
  }, [])

  const filteredItems = items.filter(item => 
    (filter === "All" || item.category === filter) &&
    (item.title.toLowerCase().includes(search.toLowerCase()))
  )

  const categories = ["All", ...new Set(items.map(i => i.category))]

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-[#7C3AED]xl font-bold text-gray-900">Media Gallery</h1>
          <p className="text-gray-600 mt-1">Upload and manage images and videos for the foundation.</p>
        </div>
        <Button className="bg-emerald-800 hover:bg-emerald-700">
          <Upload className="mr-2 h-4 w-4" /> Upload New Media
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search media..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select 
            className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array(8).fill(0).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-lg" />
          ))
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-gray-100 hover:shadow-lg transition-all">
              <div className="relative aspect-square">
                <Image src={item.src} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white">
                      <Play className="h-6 w-6 fill-current" />
                    </div>
                  </div>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white rounded-md shadow-md p-1 flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-emerald-700">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-[10px] uppercase font-bold rounded backdrop-blur-sm">
                  {item.category}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold truncate text-gray-900">{item.title}</h3>
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{item.type}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-[#7C3AED]enter text-gray-500">
            No media found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}

