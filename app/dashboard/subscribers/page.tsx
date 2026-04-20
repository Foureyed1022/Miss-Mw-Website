"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Mail, Loader2, Download, Search } from "lucide-react"
import { getSubscribers, deleteSubscriber } from "@/lib/firestore"
import { Subscriber } from "@/types"
import { ConfirmationDialog } from "@/components/ConfirmationDialog"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [subToDelete, setSubToDelete] = useState<Subscriber | null>(null)

  useEffect(() => {
    void loadSubscribers()
  }, [])

  const loadSubscribers = async () => {
    setLoading(true)
    try {
      const data = await getSubscribers()
      setSubscribers(data)
    } catch (error) {
      toast.error("Failed to load subscribers")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!subToDelete) return
    try {
      const success = await deleteSubscriber(subToDelete.id)
      if (success) {
        toast.success("Subscriber removed")
        setSubscribers((prev) => prev.filter(s => s.id !== subToDelete.id))
      }
    } catch (error) {
      toast.error("Failed to delete subscriber")
    } finally {
      setIsConfirmOpen(false)
      setSubToDelete(null)
    }
  }

  const exportCSV = () => {
    if (subscribers.length === 0) return toast.error("No subscribers to export")

    let csv = "Email,Source,SubscribedOn\n"
    subscribers.forEach(sub => {
      const date = sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : ""
      csv += `"${sub.email}","${sub.source}","${date}"\n`
    })

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', 'subscribers.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const filtered = subscribers.filter(s => s.email.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6 md:p-8 space-y-8 min-h-screen bg-gray-50/30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-[#3D3B48]">Newsletter Subscribers</h1>
          <p className="text-gray-500 mt-1">Manage individuals who have opted in to receive updates.</p>
        </div>
        <Button
          onClick={exportCSV}
          variant="outline"
          className="flex gap-2 rounded-full px-6 transition-all hover:bg-gray-100"
        >
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      <Card className="rounded-[2.5rem] shadow-sm border-gray-100 overflow-hidden">
        <CardHeader className="bg-white border-b px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#7C3AED]" />
              Subscriber Database
            </CardTitle>
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search emails..."
                className="pl-9 rounded-full bg-gray-50 border-transparent focus:bg-white transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#7C3AED]" />
            </div>
          ) : filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 text-xs uppercase tracking-widest text-gray-400 font-bold">
                    <th className="px-8 py-4 font-medium">Email Address</th>
                    <th className="px-8 py-4 font-medium">Source</th>
                    <th className="px-8 py-4 font-medium">Subscribed Date</th>
                    <th className="px-8 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-4 text-sm font-medium text-gray-900">{sub.email}</td>
                      <td className="px-8 py-4 text-sm text-gray-500 capitalize">{sub.source || 'Website'}</td>
                      <td className="px-8 py-4 text-sm text-gray-500">
                        {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        }) : 'N/A'}
                      </td>
                      <td className="px-8 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                          onClick={() => {
                            setSubToDelete(sub)
                            setIsConfirmOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <Mail className="h-8 w-8" />
              </div>
              <p className="text-gray-500">No subscribers found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleDelete}
        title="Remove Subscriber?"
        description={`This will permanently remove "${subToDelete?.email}" from the mailing list. They will need to resubscribe to receive updates.`}
        confirmText="Remove Subscriber"
      />
    </div>
  )
}
