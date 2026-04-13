"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Plus, 
  Send, 
  Calendar,
  BarChart2,
  ThumbsUp,
  MessageCircle,
  Share2,
  Image as ImageIcon
} from "lucide-react"

export default function SocialMediaPage() {
  const [postContent, setPostContent] = useState("")
  const [connectedAccounts, setConnectedAccounts] = useState([
    { platform: "Facebook", username: "Miss Malawi Foundation", icon: Facebook, color: "text-blue-600" },
    { platform: "Instagram", username: "@missmalawiofficial", icon: Instagram, color: "text-pink-600" },
  ])

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-playfair text-[#7C3AED]xl font-bold text-gray-900">Social Media Management</h1>
          <p className="text-gray-600 mt-1">Connect your accounts and publish content across platforms.</p>
        </div>
        <Button className="bg-emerald-800 hover:bg-emerald-700">
          <Plus className="mr-2 h-4 w-4" /> Connect New Account
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Post Composer */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Create New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Post Content</Label>
              <Textarea 
                id="content" 
                placeholder="What's happening? #MissMalawi" 
                rows={5}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm">
                <ImageIcon className="mr-2 h-4 w-4" /> Add Media
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" /> Schedule
              </Button>
            </div>
            
            <div className="pt-4 border-t flex items-center justify-between">
              <div className="flex -space-x-2">
                {connectedAccounts.map((acc, i) => {
                  const Icon = acc.icon
                  return (
                    <div key={i} className={`w-8 h-8 rounded-full bg-white border flex items-center justify-center ${acc.color} shadow-sm`} title={acc.platform}>
                      <Icon className="h-4 w-4" />
                    </div>
                  )
                })}
              </div>
              <Button className="bg-emerald-800 hover:bg-emerald-700" disabled={!postContent}>
                <Send className="mr-2 h-4 w-4" /> Publish Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analytics & Metrics */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-[#7C3AED]xl font-bold">12.4K</div>
              <p className="text-xs text-emerald-600 mt-1">+8.2% from last month</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="text-[#7C3AED]enter">
                  <ThumbsUp className="h-4 w-4 mx-auto text-blue-500" />
                  <span className="text-xs font-semibold block mt-1">2.1K</span>
                </div>
                <div className="text-[#7C3AED]enter">
                  <MessageCircle className="h-4 w-4 mx-auto text-emerald-500" />
                  <span className="text-xs font-semibold block mt-1">458</span>
                </div>
                <div className="text-[#7C3AED]enter">
                  <Share2 className="h-4 w-4 mx-auto text-purple-500" />
                  <span className="text-xs font-semibold block mt-1">892</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {connectedAccounts.map((acc, i) => {
                const Icon = acc.icon
                return (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gray-50 ${acc.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{acc.platform}</p>
                        <p className="text-xs text-gray-500">{acc.username}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">Disconnect</Button>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

