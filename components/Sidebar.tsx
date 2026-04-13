'use client';

import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  MessageSquare, 
  Award, 
  User as UserIcon, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: SidebarProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'news', label: 'News Management', icon: FileText },
    { id: 'applicants', label: 'Applicants', icon: Users },
    { id: 'messages', label: 'Contact Messages', icon: MessageSquare },
    { id: 'voting', label: 'Voting System', icon: Award },
    { id: 'profile', label: 'Admin Profile', icon: UserIcon },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-[#3D3B48] text-white sticky top-0 z-40">
        <span className="font-playfair font-bold text-xl text-[#7C3AED]">Admin Portal</span>
        <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-[#3D3B48] text-white w-64 z-50 transition-transform duration-300 transform
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full bg-slate-900	">
          <div className="p-6">
            <h2 className="font-playfair font-bold text-2xl text-[#7C3AED]">MISS MALAWI</h2>
            <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">Admin Portal</p>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4 ">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-[#7C3AED] text-white shadow-lg' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'}
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5 space-y-2">
            <Link href="/" className="block">
              <Button variant="outline" className="w-full justify-start gap-2 border-white/10 text-gray-300 hover:bg-white/5 hover:text-white">
                <ChevronLeft className="h-4 w-4" />
                View Website
              </Button>
            </Link>
            <Button 
              onClick={handleSignOut}
              variant="outline" 
              className="w-full justify-start gap-2 border-white/10 text-red-400 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

