"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Users, HeartHandshake, Newspaper, Mail, Loader2, MousePointerClick } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts"
import {
  getStatistics,
  getRecentActivity,
  getDailyVisits,
  getMonthlyDonations,
  getTopPages,
  ActivityItem
} from "@/lib/firestore"
import { formatDistanceToNow } from "date-fns"

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [traffic, setTraffic] = useState<any[]>([])
  const [monthlyDonations, setMonthlyDonations] = useState<any[]>([])
  const [topPages, setTopPages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      try {
        // Parallel data loading
        const [sData, aData, tData, mData, tpData] = await Promise.all([
          getStatistics().catch(e => { console.error("Stats fail:", e); return null }),
          getRecentActivity(5).catch(e => { console.error("Activity fail:", e); return null }),
          getDailyVisits(7).catch(e => { console.error("Traffic fail:", e); return null }),
          getMonthlyDonations().catch(e => { console.error("Monthly donations fail:", e); return null }),
          getTopPages(5).catch(e => { console.error("Top pages fail:", e); return [] })
        ])

        if (sData) setStats(sData)
        if (aData) setActivity(aData)
        if (tData) setTraffic(tData)
        if (mData) setMonthlyDonations(mData)
        if (tpData) setTopPages(tpData)

      } catch (error) {
        console.error("Critical dashboard load error:", error)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-[#7C3AED]" />
          <p className="text-gray-500 font-medium">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-[#7C3AED] xl md:text-4xl font-bold text-[#212224]">Organization Dashboard</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Real-time view of how visitors are engaging with the Miss Malawi Organization website, programs, and campaigns.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Site Visits"
          value={stats?.totalVisits?.toLocaleString() || "0"}
          change="Live tracking"
          icon={<Users className="h-5 w-5 text-[#7C3AED]" />}
        />
        <StatCard
          title="Donations Tracked"
          value={stats?.donationsCount?.toString() || "0"}
          change="From website flow"
          icon={<HeartHandshake className="h-5 w-5 text-[#7C3AED]" />}
        />
        <StatCard
          title="Pageant Registrations"
          value={stats?.applicantsCount?.toString() || "0"}
          change="New applications"
          icon={<Newspaper className="h-5 w-5 text-[#7C3AED]" />}
        />
        <StatCard
          title="Newsletter Subscribers"
          value={stats?.subscribersCount?.toString() || "0"}
          change="Mailing list"
          icon={<Mail className="h-5 w-5 text-[#7C3AED]" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm rounded-2xl border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-bold">Website Traffic (Last 7 days)</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Page views across the entire site</p>
            </div>
          </CardHeader>
          <CardContent className="h-[260px]">
            {traffic.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={traffic}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#8329B7"
                    strokeWidth={2.4}
                    dot={{ r: 3, strokeWidth: 1.5, stroke: "#111827", fill: "#fef3c7" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">No traffic data yet</div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm rounded-2xl border-gray-100">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
            <p className="text-sm text-gray-500">Latest interactions from visitors.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {activity.length > 0 ? (
                activity.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-3 border-b border-gray-50 pb-3 last:border-0">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] mb-0.5">{item.type}</p>
                      <p className="text-sm font-medium text-gray-900">{item.description}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.meta}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 py-4 text-center">No recent activity detected</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm rounded-2xl border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-bold">Donations by Month</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Total revenue collected from the foundation website.</p>
            </div>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyDonations}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                />
                <Bar dataKey="amount" fill="#7C3AED" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Visited Pages Analytics */}
        <Card className="shadow-sm rounded-2xl border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-bold">Top Visited Pages</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Most frequently accessed routes by users.</p>
            </div>
          </CardHeader>
          <CardContent>
            {topPages.length > 0 ? (
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-gray-500 shadow-sm border border-gray-100">
                        {index + 1}
                      </div>
                      <div className="text-sm font-medium text-gray-800 font-mono">
                        {page.path}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-[#7C3AED]">
                      <MousePointerClick className="h-4 w-4" />
                      {page.visits} <span className="font-normal text-gray-500 text-xs">views</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center text-center">
                <div>
                  <MousePointerClick className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Not enough data to display top pages.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <Card className="shadow-sm rounded-2xl border-gray-100 transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold text-gray-500">{title}</CardTitle>
        <div className="rounded-full bg-[#7C3AED]/10 p-2 text-[#7C3AED]">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between mt-1">
          <div className="text-3xl font-bold text-[#212224]">{value}</div>
          <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
