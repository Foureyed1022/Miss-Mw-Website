"use client"

import { useEffect, useState, type ChangeEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, FolderOpen } from "lucide-react"

type DashboardProgram = {
  id: string
  title: string
  category: string
  description: string
  image: string
  createdAt?: string
}

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
  const [form, setForm] = useState(initialForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    void loadPrograms()
  }, [])

  const loadPrograms = async () => {
    try {
      const response = await fetch("/api/programs")
      if (!response.ok) {
        setMessage("Unable to load programs")
        return
      }
      const data = await response.json()
      if (Array.isArray(data)) {
        setPrograms(data)
      }
    } catch (error) {
      console.error(error)
      setMessage("Unable to load programs")
    }
  }

  const handleInput = (field: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setImageFile(file)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(null)

    if (!form.title.trim()) {
      setMessage("Program title is required")
      return
    }

    if (!imageFile) {
      setMessage("Please upload an image for the program")
      return
    }

    setSaving(true)

    try {
      const formData = new FormData()
      formData.append("title", form.title)
      formData.append("category", form.category)
      formData.append("description", form.description)
      formData.append("fullDescription", form.fullDescription)
      formData.append("mission", form.mission)
      formData.append("activities", form.activities)
      formData.append("impact", form.impact)
      formData.append("image", imageFile)

      const response = await fetch("/api/programs", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        setMessage(result.message || "Failed to create program")
        return
      }

      setForm(initialForm)
      setImageFile(null)
      setMessage("Program successfully added")
      await loadPrograms()
    } catch (error) {
      console.error(error)
      setMessage("Failed to create program")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Delete this program?")) return

    try {
      const response = await fetch("/api/programs", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, imageUrl }),
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        setMessage(result.message || "Failed to delete program")
        return
      }

      setMessage("Program deleted")
      await loadPrograms()
    } catch (error) {
      console.error(error)
      setMessage("Failed to delete program")
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-4xl font-bold text-[#7C3AED]">Programs</h1>
          <p className="text-gray-600 mt-1">Manage, add, and track the organization's programs.</p>
        </div>
        <Button onClick={loadPrograms} className="bg-[#7C3AED] hover:bg-purple-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><FolderOpen className="mr-2 h-5 w-5" /> Current Programs</CardTitle>
          </CardHeader>
          <CardContent>
            {programs.length === 0 ? (
              <div className="py-20 text-center text-gray-500">No programs found. Add a new program using the form on the right.</div>
            ) : (
              <div className="border rounded-xl overflow-hidden divide-y">
                {programs.map((program) => (
                  <div key={program.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 hover:bg-gray-50 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900">{program.title}</h4>
                      <p className="text-sm text-gray-500">{program.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => handleDelete(program.id, program.image)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Program</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  value={form.title}
                  onChange={(event) => handleInput("title", event.target.value)}
                  className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
                  placeholder="Program title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  list="program-category-options"
                  value={form.category}
                  onChange={(event) => handleInput("category", event.target.value)}
                  className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
                  placeholder="Category"
                />
                <datalist id="program-category-options">
                  <option value="Education" />
                  <option value="Health" />
                  <option value="Leadership" />
                  <option value="Culture" />
                  <option value="Community" />
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Short Description</label>
                <textarea
                  value={form.description}
                  onChange={(event) => handleInput("description", event.target.value)}
                  className="mt-2 block w-full min-h-[100px] rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
                  placeholder="One-sentence summary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Full Description</label>
                <textarea
                  value={form.fullDescription}
                  onChange={(event) => handleInput("fullDescription", event.target.value)}
                  className="mt-2 block w-full min-h-[140px] rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
                  placeholder="Detailed program description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mission</label>
                <textarea
                  value={form.mission}
                  onChange={(event) => handleInput("mission", event.target.value)}
                  className="mt-2 block w-full min-h-[100px] rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
                  placeholder="Program mission statement"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Key Activities</label>
                <textarea
                  value={form.activities}
                  onChange={(event) => handleInput("activities", event.target.value)}
                  className="mt-2 block w-full min-h-[100px] rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
                  placeholder="Separate items with commas or line breaks"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Impact Metrics</label>
                <textarea
                  value={form.impact}
                  onChange={(event) => handleInput("impact", event.target.value)}
                  className="mt-2 block w-full min-h-[100px] rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20"
                  placeholder="Separate items with commas or line breaks"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Program Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2 block w-full text-sm text-gray-600"
                />
              </div>

              {message ? <p className="text-sm text-red-600">{message}</p> : null}

              <Button type="submit" disabled={saving} className="bg-[#7C3AED] hover:bg-purple-700 text-white w-full">
                {saving ? "Saving..." : "Save Program"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

