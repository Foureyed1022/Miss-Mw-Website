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
  UserPlus,
  Building2,
  MoreHorizontal
} from "lucide-react"
import Image from "next/image"

type TeamMember = {
  id: number
  name: string
  role: string
  photo: string
  bio: string
  department: string
  hierarchy: number
}

export default function TeamManagementPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/team")
      const data = await res.json()
      setTeam(data)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-[#7C3AED]xl font-bold text-gray-900">Team & Organization</h1>
          <p className="text-gray-600 mt-1">Manage profiles and the organizational structure of the foundation.</p>
        </div>
        <Button className="bg-emerald-800 hover:bg-emerald-700">
          <UserPlus className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Organizational Hierarchy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {Array(4).fill(0).map((_, i) => (
                    <div key={i} className="h-20 bg-gray-50 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="border rounded-xl overflow-hidden divide-y">
                  {team.sort((a, b) => a.hierarchy - b.hierarchy).map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                          <Image src={member.photo} alt={member.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{member.name}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                              {member.role}
                            </span>
                            <span className="text-[10px] text-gray-400 flex items-center">
                              <Building2 className="h-2.5 w-2.5 mr-1" /> {member.department}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-emerald-700">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-red-500 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

