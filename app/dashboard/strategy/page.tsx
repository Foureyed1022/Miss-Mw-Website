"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Plus, Edit } from "lucide-react"

export default function StrategyManagementPage() {
  const milestones = [
    { id: 1, phase: "Phase 1: Foundation", description: "Establish organizational structure and recruit core team.", status: "Completed" },
    { id: 2, phase: "Phase 2: Outreach", description: "Launch initial community programs and secure first sponsors.", status: "In Progress" },
    { id: 3, phase: "Phase 3: Scale", description: "Expand reach to all major regions and host national pageant.", status: "Upcoming" },
  ]

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-[#7C3AED]xl font-bold text-gray-900">Strategy & Timeline</h1>
          <p className="text-gray-600 mt-1">Manage organizational goals, phases, and key milestones.</p>
        </div>
        <Button className="bg-emerald-800 hover:bg-emerald-700">
          <Plus className="mr-2 h-4 w-4" /> Add Milestone
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><Target className="mr-2 h-5 w-5"/> Strategic Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-xl overflow-hidden divide-y">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="p-4 hover:bg-gray-50 transition-colors flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{milestone.phase}</h4>
                    <p className="text-sm text-gray-600 mt-1 max-w-2xl">{milestone.description}</p>
                    <span className={`inline-block mt-3 text-xs font-medium px-2 py-1 rounded-md ${
                      milestone.status === 'Completed' ? 'bg-emerald-50 text-emerald-800' :
                      milestone.status === 'In Progress' ? 'bg-blue-50 text-blue-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {milestone.status}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-emerald-700">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

