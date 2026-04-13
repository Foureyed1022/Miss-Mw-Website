'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle2,
  Reply,
  Archive,
  Clock,
  User,
  X
} from 'lucide-react';
import { ContactMessage } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from 'react-hot-toast';

interface ContactMessagesProps {
  messages: ContactMessage[];
  onUpdateMessageStatus: (id: string, status: ContactMessage['status']) => Promise<void>;
  onDeleteMessage: (id: string) => Promise<void>;
}

export default function ContactMessages({ 
  messages, 
  onUpdateMessageStatus, 
  onDeleteMessage 
}: ContactMessagesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const filteredMessages = messages.filter(message => {
    const fullName = `${message.firstName} ${message.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, status: ContactMessage['status']) => {
    try {
      await onUpdateMessageStatus(id, status);
      toast.success(`Message marked as ${status}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    setIsDeleting(id);
    try {
      await onDeleteMessage(id);
      toast.success('Message deleted');
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error) {
      toast.error('Failed to delete message');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#7C3AED]xl font-playfair font-bold text-[#3D3B48]">Contact Messages</h1>
          <p className="text-gray-500 mt-1">View and respond to inquiries from website visitors.</p>
        </div>
      </div>

      <Card className="border-none shadow-sm h-[calc(100vh-200px)] flex flex-col overflow-hidden">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Header Controls */}
          <div className="p-6 border-b bg-gray-50/30 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search by name, email, or subject..." 
                className="pl-10 h-11"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] h-11">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Messages List Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y">
              {filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`
                    p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-all cursor-pointer border-l-4
                    ${message.status === 'new' ? 'border-[#7C3AED] bg-[#7C3AED]/5' : 'border-transparent'}
                    ${selectedMessage?.id === message.id ? 'bg-gray-100/50' : ''}
                  `}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (message.status === 'new') handleStatusChange(message.id, 'read');
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold ${message.status === 'new' ? 'text-gray-900' : 'text-gray-700'}`}>
                        {message.firstName} {message.lastName}
                      </h3>
                      {message.status === 'new' && (
                        <Badge className="bg-[#7C3AED] text-white text-[9px] uppercase h-4">NEW</Badge>
                      )}
                    </div>
                    <p className="text-gray-800 font-semibold truncate text-sm mb-1">{message.subject}</p>
                    <p className="text-gray-500 text-xs truncate max-w-xl">{message.message}</p>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="hidden lg:flex flex-col items-end">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="h-3 w-3" />
                        {new Date(message.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">
                        <Clock className="h-3 w-3" />
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-200">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex gap-2" onClick={() => handleStatusChange(message.id, 'replied')}>
                          <Reply className="h-4 w-4" /> Mark as Replied
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-2" onClick={() => handleStatusChange(message.id, 'archived')}>
                          <Archive className="h-4 w-4" /> Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="flex gap-2 text-red-600 focus:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(message.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              {filteredMessages.length === 0 && (
                <div className="p-20 text-[#7C3AED]enter text-gray-500">
                  <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-full mb-4">
                    <Mail className="h-8 w-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">No matching messages</h3>
                  <p className="text-sm">Try adjusting your search or status filter</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Message Reader Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader className="border-b pb-4">
            <div className="flex items-center justify-between pr-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] font-bold border border-[#7C3AED]/20">
                  {selectedMessage?.firstName[0]}{selectedMessage?.lastName[0]}
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-[#3D3B48]">{selectedMessage?.firstName} {selectedMessage?.lastName}</DialogTitle>
                  <p className="text-sm text-gray-500">{selectedMessage?.email} {selectedMessage?.phone ? `• ${selectedMessage.phone}` : ''}</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <p className="text-xs text-gray-400">{selectedMessage ? new Date(selectedMessage.createdAt).toLocaleString() : ''}</p>
                <Badge variant="outline" className="mt-1 capitalize">{selectedMessage?.status}</Badge>
              </div>
            </div>
          </DialogHeader>
          
          <div className="py-6 space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Subject</h4>
              <p className="text-lg font-bold text-gray-800 font-playfair">{selectedMessage?.subject}</p>
            </div>
            
            <div className="min-h-[150px] text-gray-700 leading-relaxed whitespace-pre-wrap px-1">
              {selectedMessage?.message}
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between items-center bg-gray-50/50 -mx-6 -mb-6 p-6">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="gap-2 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white"
                onClick={() => window.location.href = `mailto:${selectedMessage?.email}`}
              >
                <Mail className="h-4 w-4" /> Reply via Email
              </Button>
              {selectedMessage?.phone && (
                <Button variant="ghost" className="gap-2 text-gray-500" onClick={() => window.location.href = `tel:${selectedMessage?.phone}`}>
                  <Phone className="h-4 w-4" /> Call
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => selectedMessage && handleDelete(selectedMessage.id)}>
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

