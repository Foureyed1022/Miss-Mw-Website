"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Users, HeartHandshake, Newspaper, Mail, Loader2 } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts"
import { 
  getStatistics, 
  getRecentActivity, 
  getDailyVisits, 
  getMonthlyDonations,
  ActivityItem
} from "@/lib/firestore"
import { formatDistanceToNow } from "date-fns"

export default function DashboardPage() {
  const [gallery, setGallery] = useState<any | null>(null)
  const [news, setNews] = useState<any | null>(null)
  const [isSavingGallery, setIsSavingGallery] = useState(false)
  const [isSavingNews, setIsSavingNews] = useState(false)
  
  const [stats, setStats] = useState<any>(null)
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [traffic, setTraffic] = useState<any[]>([])
  const [donations, setDonations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [gRes, nRes, sData, aData, tData, dData] = await Promise.all([
          fetch("/api/gallery"), 
          fetch("/api/news"),
          getStatistics(),
          getRecentActivity(5),
          getDailyVisits(7),
          getMonthlyDonations()
        ])
        
        setGallery(await gRes.json())
        setNews(await nRes.json())
        setStats(sData)
        setActivity(aData)
        setTraffic(tData)
        setDonations(dData)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
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
          <Loader2 className="h-8 w-8 animate-spin text-purple" />
          <p className="text-gray-500 font-medium">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#212224]">Foundation Dashboard</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Real-time view of how visitors are engaging with the Miss Malawi Foundation website, programs, and campaigns.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Site Visits"
          value={stats?.totalVisits?.toLocaleString() || "0"}
          change="Live tracking"
          icon={<Users className="h-5 w-5 text-purple" />}
        />
        <StatCard
          title="Donations Tracked"
          value={stats?.donationsCount?.toString() || "0"}
          change="From website flow"
          icon={<HeartHandshake className="h-5 w-5 text-purple" />}
        />
        <StatCard
          title="Pageant Registrations"
          value={stats?.applicantsCount?.toString() || "0"}
          change="New applications"
          icon={<Newspaper className="h-5 w-5 text-purple" />}
        />
        <StatCard
          title="Newsletter Subscribers"
          value={stats?.subscribersCount?.toString() || "0"}
          change="Mailing list"
          icon={<Mail className="h-5 w-5 text-purple" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">Website Traffic (Last 7 days)</CardTitle>
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

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <p className="text-sm text-gray-500">Latest interactions from visitors.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {activity.length > 0 ? (
                activity.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-3 border-b border-gray-50 pb-3 last:border-0">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-purple">{item.type}</p>
                      <p className="text-sm font-medium text-gray-900">{item.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.meta}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No recent activity detected</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-lg font-semibold">Donations by Month</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Total revenue collected from the foundation website.</p>
            </div>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donations}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                />
                <Bar dataKey="amount" fill="#111827" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Content Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <section className="space-y-3">
              <h3 className="font-semibold text-gray-900">Gallery (Events)</h3>
              {!gallery ? (
                <p className="text-sm text-gray-500">Loading gallery…</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Edit titles for event photos. Changes update the public gallery immediately.
                  </p>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {gallery.events?.map((item: any, index: number) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-10">#{item.id}</span>
                        <input
                          className="flex-1 rounded-md border border-gray-200 px-2 py-1 text-sm"
                          value={item.title}
                          onChange={(e) => {
                            const updated = { ...gallery }
                            updated.events[index] = { ...item, title: e.target.value }
                            setGallery(updated)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!gallery) return
                      setIsSavingGallery(true)
                      await fetch("/api/gallery", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(gallery),
                      })
                      setIsSavingGallery(false)
                    }}
                    className="inline-flex items-center rounded-md bg-[#212224] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#111827]"
                  >
                    {isSavingGallery ? "Saving…" : "Save Gallery Titles"}
                  </button>
                </div>
              )}
            </section>

            <section className="space-y-3">
              <h3 className="font-semibold text-gray-900">News Articles</h3>
              {!news ? (
                <p className="text-sm text-gray-500">Loading news…</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Update headlines and excerpts for the main news list and recent posts.
                  </p>
                  <div className="max-h-60 overflow-y-auto space-y-3">
                    {news.articles?.map((article: any, index: number) => (
                      <div key={article.id} className="space-y-1 border-b border-gray-100 pb-2">
                        <input
                          className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm font-medium"
                          value={article.title}
                          onChange={(e) => {
                            const updated = { ...news }
                            updated.articles[index] = { ...article, title: e.target.value }
                            setNews(updated)
                          }}
                        />
                        <textarea
                          className="w-full rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-700"
                          rows={3}
                          value={article.excerpt}
                          onChange={(e) => {
                            const updated = { ...news }
                            updated.articles[index] = { ...article, excerpt: e.target.value }
                            setNews(updated)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      if (!news) return
                      setIsSavingNews(true)
                      await fetch("/api/news", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(news),
                      })
                      setIsSavingNews(false)
                    }}
                    className="inline-flex items-center rounded-md bg-[#212224] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#111827]"
                  >
                    {isSavingNews ? "Saving…" : "Save News Content"}
                  </button>
                </div>
              )}
            </section>
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
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className="rounded-full bg-[#212224]/5 p-2">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between mt-1">
          <div className="text-2xl font-semibold text-[#212224]">{value}</div>
          <div className="flex items-center text-xs text-emerald-600">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            {change}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
