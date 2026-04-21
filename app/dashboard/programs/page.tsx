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
  ChevronRight,
  BookOpen
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import toast from "react-hot-toast"
import { ImpactStory } from "@/types"

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

const initialProgramForm = {
  title: "",
  category: "Education",
  description: "",
  fullDescription: "",
  mission: "",
  activities: "",
  impact: "",
}

const initialStoryForm = {
  name: "",
  title: "",
  story: "",
}

export default function ProgramsManagementPage() {
  const [activeTab, setActiveTab] = useState("programs")

  // --- PROGRAMS STATE ---
  const [programs, setPrograms] = useState<DashboardProgram[]>([])
  const [loadingPrograms, setLoadingPrograms] = useState(true)
  const [searchPrograms, setSearchPrograms] = useState("")
  const [filterPrograms, setFilterPrograms] = useState("All")

  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false)
  const [isProgramConfirmOpen, setIsProgramConfirmOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<DashboardProgram | null>(null)
  const [programToDelete, setProgramToDelete] = useState<DashboardProgram | null>(null)

  const [programForm, setProgramForm] = useState(initialProgramForm)
  const [programImageFile, setProgramImageFile] = useState<File | null>(null)
  const [programImagePreview, setProgramImagePreview] = useState<string | null>(null)
  const [savingProgram, setSavingProgram] = useState(false)

  const [currentProgramPage, setCurrentProgramPage] = useState(1)

  // --- STORIES STATE ---
  const [stories, setStories] = useState<ImpactStory[]>([])
  const [loadingStories, setLoadingStories] = useState(true)
  const [searchStories, setSearchStories] = useState("")

  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  const [isStoryConfirmOpen, setIsStoryConfirmOpen] = useState(false)
  const [editingStory, setEditingStory] = useState<ImpactStory | null>(null)
  const [storyToDelete, setStoryToDelete] = useState<ImpactStory | null>(null)

  const [storyForm, setStoryForm] = useState(initialStoryForm)
  const [storyImageFile, setStoryImageFile] = useState<File | null>(null)
  const [storyImagePreview, setStoryImagePreview] = useState<string | null>(null)
  const [savingStory, setSavingStory] = useState(false)

  const [currentStoryPage, setCurrentStoryPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    void loadPrograms()
    void loadStories()
  }, [])

  useEffect(() => {
    setCurrentProgramPage(1)
  }, [searchPrograms, filterPrograms])

  useEffect(() => {
    setCurrentStoryPage(1)
  }, [searchStories])

  // --- PROGRAMS LOGIC ---
  const loadPrograms = async () => {
    setLoadingPrograms(true)
    try {
      const response = await fetch("/api/programs")
      if (!response.ok) {
        const errText = await response.text();
        console.error("API Error Response Body:", errText);
        throw new Error("Failed to fetch")
      }
      const data = await response.json()
      setPrograms(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error("Unable to load programs")
    } finally {
      setLoadingPrograms(false)
    }
  }

  const handleProgramInput = (field: keyof typeof initialProgramForm, value: string) => {
    setProgramForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleProgramImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setProgramImageFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setProgramImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setProgramImagePreview(null)
    }
  }

  const openProgramAddModal = () => {
    setEditingProgram(null)
    setProgramForm(initialProgramForm)
    setProgramImageFile(null)
    setProgramImagePreview(null)
    setIsProgramModalOpen(true)
  }

  const openProgramEditModal = (program: DashboardProgram) => {
    setEditingProgram(program)
    setProgramForm({
      title: program.title,
      category: program.category,
      description: program.description,
      fullDescription: program.fullDescription,
      mission: program.mission,
      activities: Array.isArray(program.activities) ? program.activities.join("\n") : program.activities,
      impact: Array.isArray(program.impact) ? program.impact.join("\n") : program.impact,
    })
    setProgramImageFile(null)
    setProgramImagePreview(program.image)
    setIsProgramModalOpen(true)
  }

  const handleProgramSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!programForm.title.trim()) return toast.error("Title is required")
    if (!editingProgram && !programImageFile) return toast.error("Please upload an image")

    setSavingProgram(true)
    try {
      const formData = new FormData()
      if (editingProgram) formData.append("id", editingProgram.id)
      formData.append("title", programForm.title)
      formData.append("category", programForm.category)
      formData.append("description", programForm.description)
      formData.append("fullDescription", programForm.fullDescription)
      formData.append("mission", programForm.mission)
      formData.append("activities", programForm.activities)
      formData.append("impact", programForm.impact)
      if (programImageFile) formData.append("image", programImageFile)
      if (editingProgram) formData.append("imageUrl", editingProgram.image)

      const response = await fetch("/api/programs", {
        method: editingProgram ? "PUT" : "POST",
        body: formData,
      })

      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message || "Failed to save")

      toast.success(editingProgram ? "Program updated" : "Program added")
      setIsProgramModalOpen(false)
      loadPrograms()
    } catch (error: any) {
      toast.error(error.message || "Failed to save program")
    } finally {
      setSavingProgram(false)
    }
  }

  const handleProgramDelete = async () => {
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
      setIsProgramConfirmOpen(false)
      setProgramToDelete(null)
    }
  }

  const filteredPrograms = useMemo(() => {
    return programs.filter(p =>
      (filterPrograms === "All" || p.category === filterPrograms) &&
      (p.title.toLowerCase().includes(searchPrograms.toLowerCase()) || p.description.toLowerCase().includes(searchPrograms.toLowerCase()))
    )
  }, [programs, filterPrograms, searchPrograms])

  const programTotalPages = Math.ceil(filteredPrograms.length / itemsPerPage)
  const paginatedPrograms = useMemo(() => {
    const startIndex = (currentProgramPage - 1) * itemsPerPage
    return filteredPrograms.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredPrograms, currentProgramPage])


  // --- STORIES LOGIC ---
  const loadStories = async () => {
    setLoadingStories(true)
    try {
      const response = await fetch("/api/impact-stories")
      if (!response.ok) {
        const errText = await response.text();
        console.error("Impact Stories API Error:", errText);
        throw new Error("Failed to fetch")
      }
      const data = await response.json()
      setStories(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error("Unable to load impact stories")
    } finally {
      setLoadingStories(false)
    }
  }

  const handleStoryInput = (field: keyof typeof initialStoryForm, value: string) => {
    setStoryForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleStoryImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setStoryImageFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setStoryImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setStoryImagePreview(null)
    }
  }

  const openStoryAddModal = () => {
    setEditingStory(null)
    setStoryForm(initialStoryForm)
    setStoryImageFile(null)
    setStoryImagePreview(null)
    setIsStoryModalOpen(true)
  }

  const openStoryEditModal = (story: ImpactStory) => {
    setEditingStory(story)
    setStoryForm({
      name: story.name,
      title: story.title,
      story: story.story,
    })
    setStoryImageFile(null)
    setStoryImagePreview(story.image)
    setIsStoryModalOpen(true)
  }

  const handleStorySubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!storyForm.name.trim() || !storyForm.story.trim()) return toast.error("Name and story are required")
    if (!editingStory && !storyImageFile) return toast.error("Please upload an image")

    setSavingStory(true)
    try {
      const formData = new FormData()
      if (editingStory) formData.append("id", editingStory.id)
      formData.append("name", storyForm.name)
      formData.append("title", storyForm.title)
      formData.append("story", storyForm.story)
      if (storyImageFile) formData.append("image", storyImageFile)
      if (editingStory) formData.append("imageUrl", editingStory.image)

      const response = await fetch("/api/impact-stories", {
        method: editingStory ? "PUT" : "POST",
        body: formData,
      })

      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message || "Failed to save")

      toast.success(editingStory ? "Story updated" : "Story added")
      setIsStoryModalOpen(false)
      loadStories()
    } catch (error: any) {
      toast.error(error.message || "Failed to save impact story")
    } finally {
      setSavingStory(false)
    }
  }

  const handleStoryDelete = async () => {
    if (!storyToDelete) return
    try {
      const response = await fetch("/api/impact-stories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: storyToDelete.id, imageUrl: storyToDelete.image }),
      })
      if (!response.ok) throw new Error("Delete failed")
      toast.success("Story removed")
      loadStories()
    } catch (error) {
      toast.error("Failed to delete impact story")
    } finally {
      setIsStoryConfirmOpen(false)
      setStoryToDelete(null)
    }
  }

  const filteredStories = useMemo(() => {
    return stories.filter(s =>
      s.name.toLowerCase().includes(searchStories.toLowerCase()) ||
      s.title.toLowerCase().includes(searchStories.toLowerCase()) ||
      s.story.toLowerCase().includes(searchStories.toLowerCase())
    )
  }, [stories, searchStories])

  const storyTotalPages = Math.ceil(filteredStories.length / itemsPerPage)
  const paginatedStories = useMemo(() => {
    const startIndex = (currentStoryPage - 1) * itemsPerPage
    return filteredStories.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredStories, currentStoryPage])


  return (
    <div className="p-6 md:p-8 space-y-8 min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-[#3D3B48]">Programs & Impact</h1>
          <p className="text-gray-500 mt-1">Manage Organization programs and inspiring impact stories.</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between shrink-0 gap-4 mb-6">
          <TabsList className="bg-white border rounded-full p-1 h-auto flex gap-1 shadow-sm w-full sm:w-auto overflow-x-auto">
            <TabsTrigger
              value="programs"
              className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white transition-all whitespace-nowrap"
            >
              Programs
            </TabsTrigger>
            <TabsTrigger
              value="impact"
              className="rounded-full px-6 py-2.5 text-sm font-medium data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white transition-all whitespace-nowrap"
            >
              Impact Stories
            </TabsTrigger>
          </TabsList>

          <Button
            onClick={activeTab === "programs" ? openProgramAddModal : openStoryAddModal}
            className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white shrink-0 shadow-lg rounded-full px-6"
          >
            <Plus className="h-4 w-4 mr-2" />
            {activeTab === "programs" ? "Add Program" : "Add Story"}
          </Button>
        </div>

        {/* PROGRAMS TAB */}
        <TabsContent value="programs" className="space-y-6 animate-in fade-in-50 duration-500">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search programs..."
                className="pl-12 pr-4 py-6 rounded-2xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/20 transition-all outline-none"
                value={searchPrograms}
                onChange={(e) => setSearchPrograms(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <Filter className="h-4 w-4 text-gray-400 shrink-0 ml-2" />
              {["All", ...CATEGORIES].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterPrograms(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${filterPrograms === cat
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
            {loadingPrograms ? (
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
                        onClick={() => openProgramEditModal(program)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-10 w-10 rounded-full shadow-lg"
                        onClick={() => {
                          setProgramToDelete(program)
                          setIsProgramConfirmOpen(true)
                        }}
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
                        {program.createdAt ? new Date(program.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' }) : 'Recent'}
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
          {programTotalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-gray-100"
                onClick={() => setCurrentProgramPage(p => Math.max(1, p - 1))}
                disabled={currentProgramPage === 1}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: programTotalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentProgramPage === page ? "default" : "ghost"}
                    className={`w-12 h-12 rounded-full font-bold ${currentProgramPage === page ? 'bg-[#7C3AED] text-white shadow-xl' : 'text-gray-500'}`}
                    onClick={() => setCurrentProgramPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-gray-100"
                onClick={() => setCurrentProgramPage(p => Math.min(programTotalPages, p + 1))}
                disabled={currentProgramPage === programTotalPages}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </TabsContent>

        {/* IMPACT STORIES TAB */}
        <TabsContent value="impact" className="space-y-6 animate-in fade-in-50 duration-500">
          <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search impact stories..."
                className="pl-12 pr-4 py-6 rounded-2xl border-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/20 transition-all outline-none"
                value={searchStories}
                onChange={(e) => setSearchStories(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingStories ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="h-[400px] animate-pulse rounded-[2.5rem] bg-gray-100/50 border-none" />
              ))
            ) : paginatedStories.length > 0 ? (
              paginatedStories.map((story) => (
                <Card key={story.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2.5rem] bg-white flex flex-col">
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-[-10px] group-hover:translate-y-0 flex gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 rounded-full shadow-lg bg-white/90 hover:bg-white hover:text-[#7C3AED]"
                        onClick={() => openStoryEditModal(story)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-10 w-10 rounded-full shadow-lg"
                        onClick={() => {
                          setStoryToDelete(story)
                          setIsStoryConfirmOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 mb-3 w-fit tracking-widest text-[10px] uppercase font-bold border-none">
                      {story.title}
                    </Badge>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                      {story.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-4 leading-relaxed flex-1 italic">
                      "{story.story}"
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200">
                  <BookOpen className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No impact stories found</h3>
                <p className="text-gray-500">Record a new story to showcase your outreach impact.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {storyTotalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-gray-100"
                onClick={() => setCurrentStoryPage(p => Math.max(1, p - 1))}
                disabled={currentStoryPage === 1}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: storyTotalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentStoryPage === page ? "default" : "ghost"}
                    className={`w-12 h-12 rounded-full font-bold ${currentStoryPage === page ? 'bg-[#7C3AED] text-white shadow-xl' : 'text-gray-500'}`}
                    onClick={() => setCurrentStoryPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-gray-100"
                onClick={() => setCurrentStoryPage(p => Math.min(storyTotalPages, p + 1))}
                disabled={currentStoryPage === storyTotalPages}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* --- MODALS --- */}

      {/* Program Add/Edit Modal */}
      <Dialog open={isProgramModalOpen} onOpenChange={setIsProgramModalOpen}>
        <DialogContent className="max-w-3xl rounded-[2.5rem] max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair font-bold text-[#3D3B48]">
              {editingProgram ? "Edit Program" : "Add New Program"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProgramSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Title</Label>
                  <Input
                    placeholder="Program name"
                    value={programForm.title}
                    onChange={(e) => handleProgramInput("title", e.target.value)}
                    className="rounded-2xl border-gray-100 bg-gray-50 py-6"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Category</Label>
                  <Select
                    value={programForm.category}
                    onValueChange={(val) => handleProgramInput("category", val)}
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
                    value={programForm.description}
                    onChange={(e) => handleProgramInput("description", e.target.value)}
                    className="rounded-2xl border-gray-100 bg-gray-50 min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Program Image</Label>
                  <div className="mt-2">
                    {programImagePreview ? (
                      <div className="relative aspect-video rounded-3xl border overflow-hidden bg-gray-100 group">
                        <Image src={programImagePreview} className="object-cover" fill alt="Preview" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              setProgramImageFile(null)
                              setProgramImagePreview(null)
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
                        <input type="file" className="hidden" accept="image/*" onChange={handleProgramImageChange} />
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
                    value={programForm.fullDescription}
                    onChange={(e) => handleProgramInput("fullDescription", e.target.value)}
                    className="rounded-2xl border-gray-100 bg-gray-50 min-h-[120px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Mission Statement</Label>
                  <Textarea
                    placeholder="What are we aiming for?"
                    value={programForm.mission}
                    onChange={(e) => handleProgramInput("mission", e.target.value)}
                    className="rounded-2xl border-gray-100 bg-gray-50 min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Activities (One per line)</Label>
                  <Textarea
                    placeholder="Mentorship sessions&#10;Community workshops..."
                    value={programForm.activities}
                    onChange={(e) => handleProgramInput("activities", e.target.value)}
                    className="rounded-2xl border-gray-100 bg-gray-50 min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Impact Metrics (One per line)</Label>
                  <Textarea
                    placeholder="500+ students reached&#10;10 communities served..."
                    value={programForm.impact}
                    onChange={(e) => handleProgramInput("impact", e.target.value)}
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
                onClick={() => setIsProgramModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full min-w-[160px] shadow-xl"
                disabled={savingProgram}
              >
                {savingProgram ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : editingProgram ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                {editingProgram ? "Update Program" : "Create Program"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Story Add/Edit Modal */}
      <Dialog open={isStoryModalOpen} onOpenChange={setIsStoryModalOpen}>
        <DialogContent className="max-w-[500px] rounded-[2.5rem]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair font-bold text-[#3D3B48]">
              {editingStory ? "Edit Impact Story" : "Add Impact Story"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleStorySubmit} className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Person's Name</Label>
                <Input
                  placeholder="e.g. Ruth Chiwaula"
                  value={storyForm.name}
                  onChange={(e) => handleStoryInput("name", e.target.value)}
                  className="rounded-2xl border-gray-100 bg-gray-50 py-6"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Achievement / Title</Label>
                <Input
                  placeholder="e.g. Scholarship Recipient"
                  value={storyForm.title}
                  onChange={(e) => handleStoryInput("title", e.target.value)}
                  className="rounded-2xl border-gray-100 bg-gray-50 py-6"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Their Story</Label>
                <Textarea
                  placeholder="Share their impact story..."
                  value={storyForm.story}
                  onChange={(e) => handleStoryInput("story", e.target.value)}
                  className="rounded-2xl border-gray-100 bg-gray-50 min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-[#7C3AED]">Profile Picture</Label>
                <div className="mt-2">
                  {storyImagePreview ? (
                    <div className="relative aspect-square w-32 rounded-3xl border overflow-hidden bg-gray-100 group">
                      <Image src={storyImagePreview} className="object-cover" fill alt="Preview" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            setStoryImageFile(null)
                            setStoryImagePreview(null)
                          }}
                          className="rounded-full h-10 w-10"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center aspect-square w-32 rounded-3xl border-2 border-dashed border-gray-100 cursor-pointer hover:border-[#7C3AED] hover:bg-violet-50 transition-all">
                      <Upload className="h-6 w-6 text-gray-300 mb-2" />
                      <span className="text-xs font-bold text-gray-500">Upload Photo</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleStoryImageChange} />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="pt-6 border-t border-gray-50">
              <Button
                type="button"
                variant="ghost"
                className="rounded-full px-8"
                onClick={() => setIsStoryModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full min-w-[140px] shadow-xl"
                disabled={savingStory}
              >
                {savingStory ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : editingStory ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                {editingStory ? "Update" : "Save Story"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmations */}
      <ConfirmationDialog
        isOpen={isProgramConfirmOpen}
        onOpenChange={setIsProgramConfirmOpen}
        onConfirm={handleProgramDelete}
        title="Remove Program?"
        description={`This will permanently delete the "${programToDelete?.title}" program and its associated content. This action cannot be undone.`}
        confirmText="Remove Program"
      />
      <ConfirmationDialog
        isOpen={isStoryConfirmOpen}
        onOpenChange={setIsStoryConfirmOpen}
        onConfirm={handleStoryDelete}
        title="Remove Impact Story?"
        description={`This will permanently delete the story for "${storyToDelete?.name}". This action cannot be undone.`}
        confirmText="Remove Story"
      />
    </div>
  )
}
