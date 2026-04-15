"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Search,
  Trash2,
  Upload,
  Filter,
  Play,
  Image as ImageIcon,
  Loader2,
  Video,
  X,
  Plus,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Clock
} from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { GalleryItem } from "@/types"
import { subscribeToGallery, addGalleryItem, deleteGalleryItem, updateGalleryItem } from "@/lib/firestore"
import { ConfirmationDialog } from "@/components/ConfirmationDialog"
import toast from "react-hot-toast"
import { useMemo } from "react"

const CATEGORIES = ["Events", "Queens", "Programs", "International"]

export default function GalleryManagementPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: CATEGORIES[0] as GalleryItem['category'],
    type: "image" as "image" | "video",
    src: "",
  })
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const unsub = subscribeToGallery((data) => {
      setItems(data)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, filter])

  const getYoutubeEmbedUrl = (url: string) => {
    let videoId = ""
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
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const uploadData = new FormData()
    uploadData.append('image', file)

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: uploadData
      })
      const data = await response.json()
      if (data.success) {
        setFormData(prev => ({ ...prev, src: data.url }))
        toast.success('Image uploaded')
      } else {
        throw new Error(data.message)
      }
    } catch (error: any) {
      toast.error(error.message || 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.src) {
      toast.error(formData.type === "image" ? "Please upload an image" : "Please enter a video link")
      return
    }

    setIsSubmitting(true)
    try {
      if (editingItem) {
        await updateGalleryItem(editingItem.id, {
          title: formData.title,
          category: formData.category,
          type: formData.type,
          src: formData.src
        })
      } else {
        await addGalleryItem({
          title: formData.title,
          category: formData.category,
          type: formData.type,
          src: formData.src
        })
      }
      setIsAddModalOpen(false)
      setEditingItem(null)
      setFormData({
        title: "",
        category: CATEGORIES[0] as GalleryItem['category'],
        type: "image",
        src: "",
      })
    } catch (error) {
      toast.error(editingItem ? "Failed to update" : "Failed to add")
    } finally {
      setIsSubmitting(false)
    }
  }

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      category: item.category,
      type: item.type,
      src: item.src
    })
    setIsAddModalOpen(true)
  }

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id)
    setIsConfirmOpen(true)
  }

  const handleDelete = async () => {
    if (!itemToDelete) return
    const item = items.find(i => i.id === itemToDelete)

    try {
      // 1. Cleanup local file if it's an image
      if (item && item.type === 'image' && item.src.startsWith('/uploads/gallery')) {
        await fetch('/api/gallery', {
          method: 'DELETE',
          body: JSON.stringify({ imageUrl: item.src })
        })
      }

      // 2. Remove from Firestore
      await deleteGalleryItem(itemToDelete)
    } catch (error) {
      toast.error("Failed to delete")
    } finally {
      setIsConfirmOpen(false)
      setItemToDelete(null)
    }
  }

  const filteredItems = useMemo(() => items.filter(item =>
    (filter === "All" || item.category === filter) &&
    (item.title.toLowerCase().includes(search.toLowerCase()))
  ), [items, filter, search])

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredItems.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredItems, currentPage])

  const activeCategories = ["All", ...CATEGORIES]

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-[#3D3B48]">Media Gallery</h1>
          <p className="text-gray-500 mt-1">Upload and manage images and videos for the site gallery.</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex gap-2 rounded-full px-6 shadow-lg transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" /> Add New Media
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search media..."
            className="pl-12 pr-4 py-6 rounded-2xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/20 transition-all outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <Filter className="h-4 w-4 text-gray-400 shrink-0 ml-2" />
          {activeCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${filter === cat
                ? 'bg-[#7C3AED] text-white shadow-md'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array(8).fill(0).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-[2rem]" />
          ))
        ) : paginatedItems.length > 0 ? (
          paginatedItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-white">
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                {item.type === "video" ? (
                  <iframe
                    src={getYoutubeEmbedUrl(item.src)}
                    title={item.title}
                    className="absolute inset-0 w-full h-full border-0 pointer-events-none group-hover:pointer-events-auto"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-contain bg-gray-50 transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  <Badge className="bg-white/90 text-[#7C3AED] border-none font-black text-[10px] tracking-wider uppercase backdrop-blur-md">
                    {item.category}
                  </Badge>
                </div>

                {/* Actions Overlay */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-[-10px] group-hover:translate-y-0 flex gap-2 z-10">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-9 w-9 rounded-full shadow-lg bg-white/90 hover:bg-white"
                    onClick={() => openEditModal(item)}
                  >
                    <Pencil className="h-3.5 w-3.5 text-gray-700" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-9 w-9 rounded-full shadow-lg"
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#7C3AED] transition-colors truncate">
                  {item.title}
                </h3>
                <div className="flex flex-col gap-1 mt-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    {item.type === 'video' ? <Video className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                    {item.type === 'video' ? 'YouTube Content' : 'Image Asset'}
                  </p>
                  <p className="text-[9px] text-gray-400 flex items-center gap-1 font-medium">
                    <Clock className="h-2.5 w-2.5" />
                    {item.createdAt?.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No media found</h3>
            <p className="text-gray-500">Your gallery items will appear here once uploaded.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 border-gray-100"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                className={`w-10 h-10 rounded-full font-bold ${currentPage === page ? 'bg-[#7C3AED] text-white shadow-md' : 'text-gray-500'}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 border-gray-100"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Add Media Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-xl rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair font-bold text-[#3D3B48]">
              {editingItem ? "Edit Media Asset" : "Add New Media"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveMedia} className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">Title</Label>
                <Input
                  placeholder="E.g. Crowning Moment at BICC"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="rounded-xl border-gray-100 bg-gray-50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(val: any) => setFormData(prev => ({ ...prev, category: val }))}
                  >
                    <SelectTrigger className="rounded-xl border-gray-100 bg-gray-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(val: any) => setFormData(prev => ({ ...prev, type: val, src: "" }))}
                  >
                    <SelectTrigger className="rounded-xl border-gray-100 bg-gray-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">YouTube Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {formData.type === "image" ? "Upload Image" : "YouTube Link"}
                </Label>

                {formData.type === "image" ? (
                  <div className="mt-2">
                    {formData.src ? (
                      <div className="relative aspect-video rounded-2xl border overflow-hidden bg-gray-50 group">
                        <Image src={formData.src} className="object-contain" fill alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, src: "" }))}
                            className="bg-red-500 text-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className={`
                        flex flex-col items-center justify-center aspect-video rounded-2xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-[#7C3AED] hover:bg-violet-50 transition-all
                        ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
                      `}>
                        {isUploading ? (
                          <Loader2 className="h-8 w-8 animate-spin text-[#7C3AED]" />
                        ) : (
                          <>
                            <Upload className="h-8 w-8 text-gray-300 mb-2" />
                            <span className="text-sm font-bold text-gray-500">Click to upload image</span>
                            <span className="text-[10px] text-gray-400 mt-1">PNG, JPG up to 10MB</span>
                          </>
                        )}
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                      </label>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Input
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="rounded-xl border-gray-100 bg-gray-50"
                      value={formData.src}
                      onChange={(e) => setFormData(prev => ({ ...prev, src: e.target.value }))}
                      required
                    />
                    <p className="text-[10px] text-gray-400 italic">Supports regular and short links (youtu.be)</p>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="pt-6">
              <Button
                type="button"
                variant="ghost"
                className="rounded-xl"
                onClick={() => {
                  setIsAddModalOpen(false)
                  setEditingItem(null)
                  setFormData({
                    title: "",
                    category: CATEGORIES[0] as GalleryItem['category'],
                    type: "image",
                    src: "",
                  })
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl min-w-[120px] shadow-lg shadow-purple/20"
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : editingItem ? <Pencil className="h-4 w-4 mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                {editingItem ? "Update Media" : "Add to Gallery"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleDelete}
        title="Remove Media"
        description="Are you sure you want to remove this item from the gallery? This action can be undone by uploading it again."
        confirmText="Remove"
      />
    </div>
  )
}
