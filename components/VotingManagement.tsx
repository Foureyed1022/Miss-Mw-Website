'use client';

import { useState, useEffect } from 'react';
import {
  Award,
  Users,
  TrendingUp,
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  UserPlus,
  Coins,
  ShieldCheck,
  Zap,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Contestant, Transaction } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface VotingManagementProps {
  contestants: Contestant[];
  transactions: Transaction[];
}

export default function VotingManagement({ contestants, transactions }: VotingManagementProps) {
  const [activeTab, setActiveTab] = useState<'contestants' | 'transactions'>('contestants');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddContestantOpen, setIsAddContestantOpen] = useState(false);

  // Data is now fetched continuously via props from Firestore

  const totalVotes = contestants.reduce((acc, curr) => acc + curr.votes, 0);
  const totalRevenue = transactions.reduce((acc, curr) => acc + curr.amountPaid, 0);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-[#3D3B48]">Voting System Management</h1>
          <p className="text-gray-500 mt-1">Manage contestants, track votes, and monitor payment transactions.</p>
        </div>
      </div>

      {/* Voting Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-gradient-to-br from-[#9C8653] to-[#8A7542] text-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Award className="h-8 w-8 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Total Votes Cast</p>
              <h3 className="text-3xl font-bold mt-1">{totalVotes.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Revenue (MWK)</p>
              <h3 className="text-3xl font-bold mt-1 text-[#3D3B48]">{totalRevenue.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active Contestants</p>
              <h3 className="text-3xl font-bold mt-1 text-[#3D3B48]">{contestants.length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab('contestants')}
          className={`pb-4 px-2 font-bold text-sm transition-all ${activeTab === 'contestants' ? 'text-[#9C8653] border-b-2 border-[#9C8653]' : 'text-gray-400 border-b-2 border-transparent'}`}
        >
          CONTESTANTS
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`pb-4 px-2 font-bold text-sm transition-all ${activeTab === 'transactions' ? 'text-[#9C8653] border-b-2 border-[#9C8653]' : 'text-gray-400 border-b-2 border-transparent'}`}
        >
          TRANSACTIONS
        </button>
      </div>

      {activeTab === 'contestants' ? (
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search contestants..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <Button onClick={() => setIsAddContestantOpen(true)} className="bg-[#9C8653] hover:bg-[#8A7542] text-white gap-2">
                <UserPlus className="h-4 w-4" /> Add Contestant
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contestants.map((contestant) => (
                <div key={contestant.id} className="border rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[4/5] bg-gray-100 relative">
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-white/90 text-[#9C8653] font-bold border-none backdrop-blur shadow-sm">
                        {contestant.votes.toLocaleString()} VOTES
                      </Badge>
                    </div>
                    {/* Placeholder or Image */}
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Award className="h-20 w-20 opacity-20" />
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-xl text-gray-800">{contestant.name}</h3>
                        <p className="text-gray-500 text-sm font-medium">{contestant.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Rank</p>
                        <p className="text-xl font-black text-[#9C8653]">#01</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 bg-gray-50 p-3 rounded-xl">
                      <div className="flex flex-col gap-0.5">
                        <span className="uppercase tracking-widest text-[9px]">Age</span>
                        <span className="text-gray-700">{contestant.age}</span>
                      </div>
                      <div className="w-px h-6 bg-gray-200" />
                      <div className="flex flex-col gap-0.5">
                        <span className="uppercase tracking-widest text-[9px]">Occupation</span>
                        <span className="text-gray-700">{contestant.occupation}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" className="flex-1 text-[#9C8653] border-[#9C8653]/20 hover:bg-[#9C8653] hover:text-white transition-colors">
                        <Edit2 className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      <Button variant="ghost" className="text-red-400 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search transactions..." className="pl-10" />
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-600 uppercase text-[11px] font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Transaction Ref</th>
                    <th className="px-6 py-4">Contestant</th>
                    <th className="px-6 py-4">Votes</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-mono text-gray-500 font-bold">{transaction.paymentReference}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-800">{transaction.contestantName}</p>
                        <p className="text-[10px] text-gray-400">ID: {transaction.contestantId}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-bold text-[#9C8653]">
                          <Award className="h-3 w-3" /> {transaction.votesCount}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">MWK {transaction.amountPaid.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none capitalize font-bold text-[10px]">
                          {transaction.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs">
                        <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {transaction.createdAt.toLocaleString()}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Contestant Dialog Placeholder */}
      <Dialog open={isAddContestantOpen} onOpenChange={setIsAddContestantOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair font-bold text-[#3D3B48]">Add New Contestant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-gray-500 text-sm">Contestant creation involves uploading a profile photo and providing basic bio information.</p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>Full Name</Label>
                  <Input placeholder="e.g. Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input placeholder="e.g. Lilongwe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Biography</Label>
                <Input className="h-20" placeholder="Short description..." />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddContestantOpen(false)}>Cancel</Button>
            <Button className="bg-[#9C8653] hover:bg-[#8A7542] text-white">Create Contestant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
