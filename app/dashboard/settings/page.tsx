"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  UserPlus,
  Loader2,
  ShieldCheck,
  Mail,
  Key,
  Shield,
  Trash2,
  Award,
  Heart,
  Calendar,
  BarChart3
} from "lucide-react"
import { auth } from "@/lib/firebase"
import { getUserProfile } from "@/lib/firestore"
import { UserProfile, UserRole } from "@/types"
import toast from "react-hot-toast"

interface SiteStats {
  contestants: number
  queensCrowned: number
  yearsOfLegacy: number
  livesImpacted: number
}

export default function SettingsPage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [users, setUsers] = useState<UserProfile[]>([])
  const [isSuperadmin, setIsSuperadmin] = useState(false)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)

  // Site Stats state
  const [siteStats, setSiteStats] = useState<SiteStats>({
    contestants: 500,
    queensCrowned: 54,
    yearsOfLegacy: 27,
    livesImpacted: 25000,
  })
  const [isLoadingStats, setIsLoadingStats] = useState(false)
  const [isSavingStats, setIsSavingStats] = useState(false)

  // New user form state
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    displayName: '',
    role: 'editor' as UserRole
  })
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser
      if (user) {
        const profile = await getUserProfile(user.uid)
        setUserProfile(profile)
        if (profile?.role === 'superadmin') {
          setIsSuperadmin(true)
          fetchDashboardUsers()
        }
      }
    }
    loadProfile()
    loadSiteStats()
  }, [])

  const loadSiteStats = async () => {
    setIsLoadingStats(true)
    try {
      const res = await fetch('/api/site-stats')
      if (res.ok) {
        const data = await res.json()
        setSiteStats(data)
      }
    } catch (error) {
      console.error('Failed to load site stats', error)
    } finally {
      setIsLoadingStats(false)
    }
  }

  const handleSaveStats = async () => {
    setIsSavingStats(true)
    try {
      const token = await auth.currentUser?.getIdToken()
      const res = await fetch('/api/site-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(siteStats),
      })
      if (res.ok) {
        toast.success('Impact statistics updated successfully!')
      } else {
        toast.error('Failed to update statistics.')
      }
    } catch (error) {
      toast.error('An error occurred while saving.')
    } finally {
      setIsSavingStats(false)
    }
  }

  const fetchDashboardUsers = async () => {
    setIsLoadingUsers(true)
    try {
      const token = await auth.currentUser?.getIdToken()
      const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      }
    } catch (error) {
      console.error("Failed to fetch users", error)
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    try {
      const token = await auth.currentUser?.getIdToken()
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser)
      })

      if (res.ok) {
        toast.success('User created successfully')
        setNewUser({ email: '', password: '', displayName: '', role: 'editor' })
        fetchDashboardUsers()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to create user')
      }
    } catch (error) {
      toast.error('An error occurred while creating the user')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="font-playfair text-[#7C3AED]xl font-bold text-gray-900">Dashboard Settings</h1>
        <p className="text-gray-600 mt-1">Configure your administrative preferences and site-wide options.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Impact Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-emerald-800" />
                Impact Statistics
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">These values are displayed on the homepage counter section.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingStats ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-emerald-800" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stat-contestants" className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-emerald-700" />
                        Total Contestants
                      </Label>
                      <Input
                        id="stat-contestants"
                        type="number"
                        min={0}
                        value={siteStats.contestants}
                        onChange={(e) => setSiteStats({ ...siteStats, contestants: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stat-queens" className="flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 text-emerald-700" />
                        Queens Crowned
                      </Label>
                      <Input
                        id="stat-queens"
                        type="number"
                        min={0}
                        value={siteStats.queensCrowned}
                        onChange={(e) => setSiteStats({ ...siteStats, queensCrowned: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stat-years" className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-emerald-700" />
                        Years of Legacy
                      </Label>
                      <Input
                        id="stat-years"
                        type="number"
                        min={0}
                        value={siteStats.yearsOfLegacy}
                        onChange={(e) => setSiteStats({ ...siteStats, yearsOfLegacy: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stat-lives" className="flex items-center gap-1.5">
                        <Heart className="h-3.5 w-3.5 text-emerald-700" />
                        Lives Impacted
                      </Label>
                      <Input
                        id="stat-lives"
                        type="number"
                        min={0}
                        value={siteStats.livesImpacted}
                        onChange={(e) => setSiteStats({ ...siteStats, livesImpacted: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                  <Button
                    className="bg-emerald-800 hover:bg-emerald-700 w-full"
                    onClick={handleSaveStats}
                    disabled={isSavingStats}
                  >
                    {isSavingStats ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
                    ) : 'Save Impact Statistics'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

        </div>

        {/* User Management Section - Only for Superadmins */}
        {isSuperadmin && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-emerald-800" />
                  Add New Admin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Name</Label>
                      <Input
                        id="displayName"
                        placeholder="John Doe"
                        value={newUser.displayName}
                        onChange={(e) => setNewUser({ ...newUser, displayName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newRole">Role</Label>
                      <Select
                        value={newUser.role}
                        onValueChange={(val: UserRole) => setNewUser({ ...newUser, role: val })}
                      >
                        <SelectTrigger id="newRole">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="reviewer">Reviewer</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="newEmail"
                        type="email"
                        className="pl-9"
                        placeholder="email@example.com"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Password</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <Input
                        id="newPassword"
                        type="password"
                        className="pl-9"
                        placeholder="••••••••"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-800 hover:bg-emerald-700"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : 'Create Admin Account'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-emerald-800" />
                    Manage Users
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingUsers ? (
                  <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-800" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.uid} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{user.displayName}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <div className="mt-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                              {user.role}
                            </span>
                          </div>
                        </div>
                        {user.uid !== userProfile?.uid && (
                          <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {users.length === 0 && (
                      <p className="text-[#7C3AED]enter text-gray-500 text-sm py-4">No users found.</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}


