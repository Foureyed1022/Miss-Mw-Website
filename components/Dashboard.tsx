'use client';

import { 
  FileText, 
  Users, 
  MessageSquare, 
  ArrowUpRight, 
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { NewsArticle, Applicant, ContactMessage } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  articlesCount: number;
  messagesCount: number;
  newMessagesCount: number;
  onTabChange: (tab: string) => void;
  articles: NewsArticle[];
  messages: ContactMessage[];
  applicants: Applicant[];
}

export default function Dashboard({
  articlesCount,
  messagesCount,
  newMessagesCount,
  onTabChange,
  articles,
  messages,
  applicants
}: DashboardProps) {
  
  const stats = [
    { 
      label: 'News Articles', 
      value: articlesCount, 
      icon: FileText, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      tab: 'news'
    },
    { 
      label: 'Total Applicants', 
      value: applicants.length, 
      icon: Users, 
      color: 'text-[#7C3AED]', 
      bg: 'bg-[#7C3AED]/10',
      tab: 'applicants'
    },
    { 
      label: 'Total Messages', 
      value: messagesCount, 
      icon: MessageSquare, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50',
      tab: 'messages'
    },
    { 
      label: 'New Messages', 
      value: newMessagesCount, 
      icon: AlertCircle, 
      color: 'text-red-600', 
      bg: 'bg-red-50',
      tab: 'messages'
    },
  ];

  return (
    <div className="p-4 lg:p-8 space-y-8">
      <div>
        <h1 className="text-[#7C3AED]xl font-playfair font-bold text-[#3D3B48]">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-400 hover:text-[#7C3AED]"
                    onClick={() => onTabChange(stat.tab)}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <h3 className="text-[#7C3AED]xl font-bold text-[#3D3B48] mt-1">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applicants */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-gray-50/50 rounded-t-xl py-4">
            <CardTitle className="text-lg font-bold text-[#3D3B48]">Recent Applicants</CardTitle>
            <Button variant="ghost" className="text-sm text-[#7C3AED]" onClick={() => onTabChange('applicants')}>View All</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {applicants.slice(0, 5).map((applicant) => (
                <div key={applicant.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                      {applicant.firstName[0]}{applicant.lastName[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{applicant.firstName} {applicant.lastName}</p>
                      <p className="text-xs text-gray-500">{applicant.city}, {applicant.age} years old</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    applicant.applicationStatus === 'approved' ? 'bg-purple-100 text-purple-700' :
                    applicant.applicationStatus === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {applicant.applicationStatus}
                  </div>
                </div>
              ))}
              {applicants.length === 0 && (
                <div className="p-8 text-[#7C3AED]enter text-gray-500">No applicants yet</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity / News */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-gray-50/50 rounded-t-xl py-4">
            <CardTitle className="text-lg font-bold text-[#3D3B48]">Recent News</CardTitle>
            <Button variant="ghost" className="text-sm text-[#7C3AED]" onClick={() => onTabChange('news')}>Manage News</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {articles.slice(0, 5).map((article) => (
                <div key={article.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <Clock className="h-3 w-3" />
                    {new Date(article.createdAt || '').toLocaleDateString()}
                    <span className="mx-1">•</span>
                    <span className="text-[#7C3AED] font-medium">{article.category}</span>
                  </div>
                  <p className="font-semibold text-gray-800 line-clamp-1">{article.title}</p>
                </div>
              ))}
              {articles.length === 0 && (
                <div className="p-8 text-[#7C3AED]enter text-gray-500">No news articles yet</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

