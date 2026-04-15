"use client"

import { useEffect, useState, useMemo, type ChangeEvent } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Trash2,
  Search,
  Filter,
  Pencil,
  Upload,
  Loader2,
  Image as ImageIcon,
  Clock,
  Layers,
  ChevronLeft,
  ChevronRight
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
import { ConfirmationDialog } from "@/components/ConfirmationDialog"
import toast from "react-hot-toast"

type DashboardProgram = {
  id: string
  title: string
  category: string
  description: string
  fullDescription: string
  mission: string
  activities: string[] | string
  impact: string[] | string
  image: string
  createdAt?: string
  updatedAt?: string
}

const CATEGORIES = ["Education", "Health", "Leadership", "Culture", "Community"]

const initialForm = {
  title: "",
  category: "Education",
  description: "",
  fullDescription: "",
  mission: "",
  activities: "",
  impact: "",
}

export default function ProgramsManagementPage() {
  const [programs, setPrograms] = useState<DashboardProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<DashboardProgram | null>(null)
  const [programToDelete, setProgramToDelete] = useState<DashboardProgram | null>(null)

  // Form states
  const [form, setForm] = useState(initialForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    void loadPrograms()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, filter])

  const loadPrograms = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/programs")
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setPrograms(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error("Unable to load programs")
    } finally {
      setLoading(false)
    }
  }

  const handleInput = (field: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setImageFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const openAddModal = () => {
    setEditingProgram(null)
    setForm(initialForm)
    setImageFile(null)
    setImagePreview(null)
    setIsModalOpen(true)
  }

  const openEditModal = (program: DashboardProgram) => {
    setEditingProgram(program)
    setForm({
      title: program.title,
      category: program.category,
      description: program.description,
      fullDescription: program.fullDescription,
      mission: program.mission,
      activities: Array.isArray(program.activities) ? program.activities.join("\n") : program.activities,
      impact: Array.isArray(program.impact) ? program.impact.join("\n") : program.impact,
    })
    setImageFile(null)
    setImagePreview(program.image)
    setIsModalOpen(true)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.title.trim()) return toast.error("Title is required")
    if (!editingProgram && !imageFile) return toast.error("Please upload an image")

    setSaving(true)
    try {
      const formData = new FormData()
      if (editingProgram) formData.append("id", editingProgram.id)
      formData.append("title", form.title)
      formData.append("category", form.category)
      formData.append("description", form.description)
      formData.append("fullDescription", form.fullDescription)
      formData.append("mission", form.mission)
      formData.append("activities", form.activities)
      formData.append("impact", form.impact)
      if (imageFile) formData.append("image", imageFile)
      if (editingProgram) formData.append("imageUrl", editingProgram.image)

      const response = await fetch("/api/programs", {
        method: editingProgram ? "PUT" : "POST",
        body: formData,
      })

      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message || "Failed to save")

      toast.success(editingProgram ? "Program updated" : "Program added")
      setIsModalOpen(false)
      loadPrograms()
    } catch (error: any) {
      toast.error(error.message || "Failed to save program")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteClick = (program: DashboardProgram) => {
    setProgramToDelete(program)
    setIsConfirmOpen(true)
  }

  const handleDelete = async () => {
    if (!programToDelete) return
    try {
      const response = await fetch("/api/programs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: programToDelete.id, imageUrl: programToDelete.image }),
      })
      if (!response.ok) throw new Error("Delete failed")
      toast.success("Program removed")
      loadPrograms()
    } catch (error) {
      toast.error("Failed to delete program")
    } finally {
      setIsConfirmOpen(false)
      setProgramToDelete(null)
    }
  }

  const filteredPrograms = useMemo(() => {
    return programs.filter(p =>
      (filter === "All" || p.category === filter) &&
      (p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    )
  }, [programs, filter, search])

  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage)
  const paginatedPrograms = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredPrograms.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredPrograms, currentPage])

  return (
    <div className="p-6 md:p-8 space-y-8 min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-[#3D3B48]">Foundation Programs</h1>
          <p className="text-gray-500 mt-1">Manage and track the initiatives empowering Malawi's youth.</p>
        </div>
        <Button
          onClick={openAddModal}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex gap-2 rounded-full px-6 shadow-lg transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" /> Add New Program
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search programs..."
            className="pl-12 pr-4 py-6 rounded-2xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/20 transition-all outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <Filter className="h-4 w-4 text-gray-400 shrink-0 ml-2" />
          {["All", ...CATEGORIES].map(cat => (
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <Card key={i} className="h-[400px] animate-pulse rounded-[2.5rem] bg-gray-100/50 border-none" />
          ))
        ) : paginatedPrograms.length > 0 ? (
          paginatedPrograms.map((program) => (
            <Card key={program.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2.5rem] bg-white flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/95 text-[#7C3AED] border-none font-black text-[10px] tracking-wider uppercase backdrop-blur-md px-3 py-1">
                    {program.category}
                  </Badge>
                </div>
                {/* Actions */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-[-10px] group-hover:translate-y-0 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-10 w-10 rounded-full shadow-lg bg-white/90 hover:bg-white hover:text-[#7C3AED]"
                    onClick={() => openEditModal(program)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-10 w-10 rounded-full shadow-lg"
                    onClick={() => handleDeleteClick(program)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#7C3AED] transition-colors line-clamp-1">
                  {program.title}
                </h3>
                <p className="text-sm text-gray-500 mt-3 line-clamp-3 leading-relaxed flex-1">
                  {program.description}
                </p>
                <div className="pt-6 mt-auto border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <Clock className="h-3 w-3" />
                    {program.createdAt ? new Date(program.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Recent'}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#7C3AED] font-black uppercase tracking-widest">
                    <Layers className="h-3 w-3" />
                    Details
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200">
              <Plus className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No programs found</h3>
            <p className="text-gray-500">Add your first foundation program to get started.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 border-gray-100"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                className={`w-12 h-12 rounded-full font-bold ${currentPage === page ? 'bg-[#7C3AED] text-white shadow-xl' : 'text-gray-500'}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 border-gray-100"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl rounded-[2.5rem] max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair font-bold text-[#3D3B48]">
              {editingProgram ? "Edit Program" : "Add New Program"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Title</Label>
                  <Input
                    placeholder="Program name"
                    value={form.title}
                    onChange={(e) => handleInput("title", e.target.value)}
                    className="rounded-2xl border-gray-100 bg-gray-50 py-6"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(val) => handleInput("category", val)}
                  >
                    <SelectTrigger className="rounded-2xl border-gray-100 bg-gray-50 py-6">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Short Description</Label>
                  <Textarea
                    placeholder="One-sentence hook..."
                    value={form.description}
                    onChange={(e) => handleInput("description", e.target.value)}
                    className="rounded-2xl border-gray-100 bg-gray-50 min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Program Image</Label>
                  <div className="mt-2">
                    {imagePreview ? (
                      <div className="relative aspect-video rounded-3xl border overflow-hidden bg-gray-100 group">
                        <Image src={imagePreview} className="object-cover" fill alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              setImageFile(null)
                              setImagePreview(null)
                            }}
                            className="rounded-full h-12 w-12"
                          >
                            <Trash2 className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center aspect-video rounded-3xl border-2 border-dashed border-gray-100 cursor-pointer hover:border-[#7C3AED] hover:bg-violet-50 transition-all">
                        <Upload className="h-8 w-8 text-gray-300 mb-2" />
                        <span className="text-sm font-bold text-gray-500">Upload Banner</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Full Detailed Description</Label>
                  <Textarea
                    placeholder="Tell the full story..."
                    value={form.fullDescription}
                    onChange={(e) => handleInput("fullDescription", e.target.value)}
                    className="rounded-2xl border-gray-100 bg-gray-50 min-h-[120px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Mission Statement</Label>
                  <Textarea
                    placeholder="What are we aiming for?"
                    value={form.mission}
                    onChange={(e) => handleInput("mission", e.target.value)}
                    className="rounded-2xl border-gray-100 bg-gray-50 min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Activities (One per line)</Label>
                  <Textarea
                    placeholder="Mentorship sessions&#10;Community workshops..."
                    value={form.activities}
                    onChange={(e) => handleInput("activities", e.target.value)}
                    className="rounded-2xl border-gray-100 bg-gray-50 min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Impact Metrics (One per line)</Label>
                  <Textarea
                    placeholder="500+ students reached&#10;10 communities served..."
                    value={form.impact}
                    onChange={(e) => handleInput("impact", e.target.value)}
                    className="rounded-2xl border-gray-100 bg-gray-50 min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-6 border-t border-gray-50">
              <Button
                type="button"
                variant="ghost"
                className="rounded-full px-8"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full min-w-[160px] shadow-xl"
                disabled={saving}
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : editingProgram ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                {editingProgram ? "Update Program" : "Create Program"}
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
        title="Remove Program?"
        description={`This will permanently delete the "${programToDelete?.title}" program and its associated content. This action cannot be undone.`}
        confirmText="Remove Program"
      />
    </div>
  )
}
