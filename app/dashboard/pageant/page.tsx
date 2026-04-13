"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Eye, UserX, UserCheck } from "lucide-react"

export default function PageantManagementPage() {
  const [entrants] = useState([
    { id: 1, name: "Grace Banda", region: "Central", status: "Pending", date: "Oct 12, 2025" },
    { id: 2, name: "Chikondi Phiri", region: "Southern", status: "Approved", date: "Oct 15, 2025" },
    { id: 3, name: "Esther Mwanza", region: "Northern", status: "Rejected", date: "Nov 01, 2025" },
  ])

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-[#7C3AED]xl font-bold text-gray-900">Pageant Entries</h1>
          <p className="text-gray-600 mt-1">Review entrants, registrations, and track applications.</p>
        </div>
        <Button className="bg-emerald-800 hover:bg-emerald-700">
          Export List
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><Crown className="mr-2 h-5 w-5"/> Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-xl overflow-hidden divide-y">
              {entrants.map((ent) => (
                <div key={ent.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-gray-900">{ent.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">Region: {ent.region}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">Applied: {ent.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-md mr-4 ${
                      ent.status === 'Approved' ? 'bg-emerald-50 text-emerald-800' : 
                      ent.status === 'Pending' ? 'bg-amber-50 text-amber-800' : 'bg-red-50 text-red-800'
                    }`}>
                      {ent.status}
                    </span>
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-emerald-700">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-emerald-600 hover:bg-emerald-50">
                      <UserCheck className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                      <UserX className="h-4 w-4" />
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

