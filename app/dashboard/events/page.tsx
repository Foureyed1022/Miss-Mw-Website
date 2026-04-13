"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Calendar } from "lucide-react"

export default function EventsManagementPage() {
  const [events] = useState([
    { id: 1, title: "Annual Fundraising Gala", date: "Dec 15, 2025", location: "BICC, Lilongwe" },
    { id: 2, title: "Miss Malawi Grand Finale", date: "Oct 24, 2025", location: "Sunbird Mount Soche" },
    { id: 3, title: "Community Outreach", date: "Nov 02, 2025", location: "Blantyre" },
  ])

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-[#7C3AED]xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-1">Create, edit, and publish upcoming events.</p>
        </div>
        <Button className="bg-emerald-800 hover:bg-emerald-700">
          <Plus className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><Calendar className="mr-2 h-5 w-5"/> Scheduled Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-xl overflow-hidden divide-y">
              {events.map((evt) => (
                <div key={evt.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">{evt.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {evt.date}
                      </span>
                      <span className="text-xs text-gray-500">📍 {evt.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-emerald-700">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

