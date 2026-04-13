'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Shield, 
  Bell, 
  Globe, 
  Camera, 
  Save, 
  LogOut,
  ChevronRight,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { signOut } from '@/lib/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || 'Admin User',
    email: user?.email || 'admin@missmalawi.mw',
    role: 'Super Administrator',
    notifications: true,
    twoFactor: false
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock save delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success('Profile settings updated successfully');
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-[#7C3AED]xl font-playfair font-bold text-[#3D3B48]">Admin Profile & Settings</h1>
        <p className="text-gray-500 mt-1">Manage your administrator account and dashboard preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="h-24 bg-gradient-to-br from-[#7C3AED] to-[#6D28D9]" />
            <CardContent className="px-6 pb-6 pt-0 flex flex-col items-center -mt-12">
              <div className="relative group">
                <div className="h-24 w-24 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-[#7C3AED]xl font-bold text-[#7C3AED] shadow-lg">
                  {profileData.displayName[0]}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-[#7C3AED] border transition-colors opacity-0 group-hover:opacity-100">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 text-[#7C3AED]enter">
                <h3 className="font-bold text-xl text-[#3D3B48]">{profileData.displayName}</h3>
                <p className="text-sm text-[#7C3AED] font-medium uppercase tracking-widest">{profileData.role}</p>
                <div className="mt-6 pt-6 border-t w-full">
                   <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>Status</span>
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-[10px] uppercase font-bold tracking-widest border-none">Active Account</Badge>
                   </div>
                   <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Last Login</span>
                      <span className="text-gray-800 font-medium">Today, 09:42 AM</span>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleSignOut}
            variant="outline" 
            className="w-full justify-between group border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all font-bold"
          >
            Sign Out of Account
            <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Right Column - Forms */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="bg-gray-100/50 p-1 w-full justify-start h-12 rounded-xl mb-6">
              <TabsTrigger value="account" className="px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#7C3AED] data-[state=active]:shadow-sm">Account Settings</TabsTrigger>
              <TabsTrigger value="security" className="px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#7C3AED] data-[state=active]:shadow-sm">Security</TabsTrigger>
              <TabsTrigger value="notifications" className="px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#7C3AED] data-[state=active]:shadow-sm">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-[#3D3B48]">Personal Information</CardTitle>
                  <CardDescription>Update your public information and email address.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input 
                          id="displayName" 
                          value={profileData.displayName}
                          onChange={e => setProfileData(p => ({ ...p, displayName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profileData.email}
                          onChange={e => setProfileData(p => ({ ...p, email: e.target.value }))}
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white gap-2 font-bold min-w-[140px]"
                      disabled={isSaving}
                    >
                      {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
               <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-[#3D3B48]">Password Management</CardTitle>
                  <CardDescription>Secure your account with a strong, unique password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" />
                  </div>
                  <div className="gap-4 grid grid-cols-2">
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input type="password" />
                    </div>
                  </div>
                  <Button variant="outline" className="text-[#7C3AED] border-[#7C3AED]/20 hover:bg-[#7C3AED] hover:text-white font-bold">Update Password</Button>
                </CardContent>
              </Card>

              <Card className="border-[#7C3AED]/20 bg-[#7C3AED]/5 shadow-sm">
                 <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-white rounded-xl text-[#7C3AED] border border-[#7C3AED]/10">
                          <ShieldAlert className="h-6 w-6" />
                       </div>
                       <div>
                          <p className="font-bold text-gray-800">Two-Factor Authentication</p>
                          <p className="text-xs text-gray-500">Add an extra layer of security to your admin account.</p>
                       </div>
                    </div>
                    <Switch 
                      checked={profileData.twoFactor}
                      onCheckedChange={(val) => setProfileData(p => ({ ...p, twoFactor: val }))}
                    />
                 </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
               <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-[#3D3B48]">Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive dashboard updates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                         <p className="font-bold text-gray-800">Email Notifications</p>
                         <p className="text-xs text-gray-500">Receive alerts when new applicants register or messages arrive.</p>
                      </div>
                      <Switch 
                        checked={profileData.notifications}
                        onCheckedChange={(val) => setProfileData(p => ({ ...p, notifications: val }))}
                      />
                   </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function Tabs({ children, defaultValue, className = "" }: { children: React.ReactNode, defaultValue: string, className?: string }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className={className}>
      {/* Search for children with matching value */}
      {/* This is a simple mock of Radix UI Tabs for demonstration */}
      {React.Children.map(children, (child: any) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (child.type === TabsContent && child.props.value === activeTab) {
          return child;
        }
        return null;
      })}
    </div>
  );
}

function TabsList({ children, activeTab, setActiveTab, className = "" }: { children: React.ReactNode, activeTab?: string, setActiveTab?: (v: string) => void, className?: string }) {
  return (
    <div className={className}>
      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </div>
  );
}

function TabsTrigger({ children, value, activeTab, setActiveTab, className = "" }: { children: React.ReactNode, value: string, activeTab?: string, setActiveTab?: (v: string) => void, className?: string }) {
  const isActive = activeTab === value;
  return (
    <button 
      onClick={() => setActiveTab && setActiveTab(value)}
      className={`${className} ${isActive ? 'bg-white shadow-sm' : ''}`}
      data-state={isActive ? "active" : "inactive"}
    >
      {children}
    </button>
  );
}

function TabsContent({ children, value, className = "" }: { children: React.ReactNode, value: string, className?: string }) {
  return <div className={className}>{children}</div>;
}

function Badge({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>{children}</span>;
}

import React from 'react';

