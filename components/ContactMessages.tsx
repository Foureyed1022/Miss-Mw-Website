'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  MoreVertical,
  Trash2,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Reply,
  Archive,
  Clock,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Inbox,
  Eye,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { ContactMessage } from '@/types';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';

const PAGE_SIZE = 10;

interface ContactMessagesProps {
  messages: ContactMessage[];
  onUpdateMessageStatus: (id: string, status: ContactMessage['status']) => Promise<void>;
  onDeleteMessage: (id: string) => Promise<void>;
}

const STATUS_CONFIG: Record<
  ContactMessage['status'],
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  new: {
    label: 'New',
    color: 'text-violet-700',
    bg: 'bg-violet-100',
    icon: <AlertCircle className="h-3 w-3" />,
  },
  read: {
    label: 'Read',
    color: 'text-sky-700',
    bg: 'bg-sky-100',
    icon: <Eye className="h-3 w-3" />,
  },
  replied: {
    label: 'Replied',
    color: 'text-emerald-700',
    bg: 'bg-emerald-100',
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  archived: {
    label: 'Archived',
    color: 'text-gray-600',
    bg: 'bg-gray-100',
    icon: <Archive className="h-3 w-3" />,
  },
};

function StatCard({
  label,
  count,
  icon,
  accent,
  active,
  onClick,
}: {
  label: string;
  count: number;
  icon: React.ReactNode;
  accent: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col gap-2 p-5 rounded-2xl border transition-all text-left w-full
        ${active
          ? `${accent} border-current shadow-sm`
          : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm text-gray-600'
        }`}
    >
      <div className={`p-2 rounded-lg inline-flex ${active ? 'bg-white/40' : 'bg-gray-50'}`}>
        {icon}
      </div>
      <div>
        <p className={`text-2xl font-bold leading-none ${active ? '' : 'text-gray-800'}`}>{count}</p>
        <p className={`text-xs font-medium mt-1 ${active ? '' : 'text-gray-500'}`}>{label}</p>
      </div>
    </button>
  );
}

export default function ContactMessages({
  messages,
  onUpdateMessageStatus,
  onDeleteMessage,
}: ContactMessagesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ContactMessage['status']>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Stats
  const stats = useMemo(() => ({
    total: messages.length,
    new: messages.filter((m) => m.status === 'new').length,
    read: messages.filter((m) => m.status === 'read').length,
    replied: messages.filter((m) => m.status === 'replied').length,
    archived: messages.filter((m) => m.status === 'archived').length,
  }), [messages]);

  // Filtered messages — sorted newest first
  const filteredMessages = useMemo(() => {
    return messages
      .filter((message) => {
        const fullName = `${message.firstName} ${message.lastName}`.toLowerCase();
        const matchesSearch =
          fullName.includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [messages, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredMessages.length / PAGE_SIZE));
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleFilterChange = (filter: typeof statusFilter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = async (id: string, status: ContactMessage['status'], e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsUpdating(id);
    try {
      await onUpdateMessageStatus(id, status);
      if (selectedMessage?.id === id) {
        setSelectedMessage((prev) => prev ? { ...prev, status } : null);
      }
      toast.success(`Marked as ${STATUS_CONFIG[status].label}`);
    } catch {
      toast.error('Failed to update status');
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      await onDeleteMessage(id);
      if (selectedMessage?.id === id) setSelectedMessage(null);
      toast.success('Message deleted');
    } catch {
      toast.error('Failed to delete message');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleOpenMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    if (message.status === 'new') {
      await handleStatusChange(message.id, 'read');
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 min-h-screen bg-gray-50/50">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-playfair">Contact Messages</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage and respond to messages from website visitors.
          </p>
        </div>
        {stats.new > 0 && (
          <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-sm font-medium px-4 py-2 rounded-full">
            <span className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
            {stats.new} unread message{stats.new !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="All Messages"
          count={stats.total}
          icon={<MessageSquare className="h-4 w-4 text-gray-500" />}
          accent="bg-gray-100 text-gray-800"
          active={statusFilter === 'all'}
          onClick={() => handleFilterChange('all')}
        />
        <StatCard
          label="Unread"
          count={stats.new}
          icon={<Inbox className="h-4 w-4 text-violet-600" />}
          accent="bg-violet-50 text-violet-700 border-violet-200"
          active={statusFilter === 'new'}
          onClick={() => handleFilterChange('new')}
        />
        <StatCard
          label="Replied"
          count={stats.replied}
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
          accent="bg-emerald-50 text-emerald-700 border-emerald-200"
          active={statusFilter === 'replied'}
          onClick={() => handleFilterChange('replied')}
        />
        <StatCard
          label="Archived"
          count={stats.archived}
          icon={<Archive className="h-4 w-4 text-gray-500" />}
          accent="bg-gray-100 text-gray-700 border-gray-200"
          active={statusFilter === 'archived'}
          onClick={() => handleFilterChange('archived')}
        />
      </div>

      {/* Main Messages Panel */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b bg-white flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, email, or subject…"
              className="pl-10 h-10 text-sm bg-gray-50 border-gray-200 focus:bg-white"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v) => handleFilterChange(v as typeof statusFilter)}
          >
            <SelectTrigger className="w-[160px] h-10 text-sm">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Messages List */}
        <div className="divide-y divide-gray-50">
          {paginatedMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 border border-gray-100 mb-4">
                <Mail className="h-7 w-7 text-gray-300" />
              </div>
              <h3 className="text-base font-semibold text-gray-700">No messages found</h3>
              <p className="text-sm text-gray-400 mt-1">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter.'
                  : 'Contact form submissions will appear here.'}
              </p>
            </div>
          ) : (
            paginatedMessages.map((message) => {
              const cfg = STATUS_CONFIG[message.status];
              const isNew = message.status === 'new';
              const isBusy = isUpdating === message.id || isDeleting === message.id;

              return (
                <div
                  key={message.id}
                  onClick={() => handleOpenMessage(message)}
                  className={`group relative flex items-start gap-4 px-6 py-5 cursor-pointer transition-all
                    ${isNew ? 'bg-violet-50/60 hover:bg-violet-50' : 'hover:bg-gray-50/80'}
                    ${selectedMessage?.id === message.id ? 'bg-gray-100/70' : ''}
                  `}
                >
                  {/* Unread indicator */}
                  <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 transition-opacity
                    ${isNew ? 'bg-violet-500' : 'bg-transparent'}`}
                  />

                  {/* Avatar */}
                  <div className={`hidden sm:flex h-10 w-10 rounded-full items-center justify-center text-sm font-bold shrink-0 select-none
                    ${isNew ? 'bg-violet-100 text-violet-700' : 'bg-gray-100 text-gray-600'}`}>
                    {message.firstName?.[0]}{message.lastName?.[0]}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className={`font-semibold text-sm ${isNew ? 'text-gray-900' : 'text-gray-700'}`}>
                        {message.firstName} {message.lastName}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${cfg.bg} ${cfg.color}`}>
                        {cfg.icon} {cfg.label}
                      </span>
                    </div>
                    <p className={`text-sm truncate mb-0.5 ${isNew ? 'font-medium text-gray-800' : 'text-gray-700'}`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-400 truncate max-w-xl">
                      {message.message}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {message.email}
                      </span>
                      {message.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {message.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-end gap-2 shrink-0 ml-2">
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(message.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </span>
                    <span className="text-[10px] text-gray-300 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-1">
                      {message.status !== 'replied' && (
                        <button
                          title="Mark as Replied"
                          disabled={isBusy}
                          onClick={(e) => handleStatusChange(message.id, 'replied', e)}
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                        >
                          <Reply className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {message.status !== 'read' && message.status !== 'new' ? null : (
                        message.status === 'new' && (
                          <button
                            title="Mark as Read"
                            disabled={isBusy}
                            onClick={(e) => handleStatusChange(message.id, 'read', e)}
                            className="p-1.5 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        )
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="text-sm">
                          <DropdownMenuItem
                            className="flex gap-2 cursor-pointer"
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(message.id, 'read', e); }}
                          >
                            <Eye className="h-4 w-4 text-sky-500" /> Mark as Read
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex gap-2 cursor-pointer"
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(message.id, 'replied', e); }}
                          >
                            <Reply className="h-4 w-4 text-emerald-500" /> Mark as Replied
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex gap-2 cursor-pointer"
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(message.id, 'archived', e); }}
                          >
                            <Archive className="h-4 w-4 text-gray-400" /> Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="flex gap-2 cursor-pointer text-red-600 focus:text-red-600"
                            onClick={(e) => { e.stopPropagation(); handleDelete(message.id, e); }}
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Loading overlay */}
                  {isBusy && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-end pr-6">
                      <RefreshCw className="h-4 w-4 text-violet-500 animate-spin" />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {filteredMessages.length > PAGE_SIZE && (
          <div className="px-6 py-4 border-t bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-700">{(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filteredMessages.length)}</span> of{' '}
              <span className="font-medium text-gray-700">{filteredMessages.length}</span> messages
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .reduce<(number | '…')[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('…');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === '…' ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-sm">…</span>
                  ) : (
                    <Button
                      key={p}
                      variant={currentPage === p ? 'default' : 'outline'}
                      size="icon"
                      className={`h-8 w-8 text-sm ${currentPage === p ? 'bg-violet-600 border-violet-600 hover:bg-violet-700' : ''}`}
                      onClick={() => setCurrentPage(p as number)}
                    >
                      {p}
                    </Button>
                  )
                )}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl">
          {selectedMessage && (() => {
            const cfg = STATUS_CONFIG[selectedMessage.status];
            return (
              <>
                {/* Dialog Header */}
                <DialogHeader className="p-6 pb-4 border-b bg-gradient-to-br from-gray-50 to-white">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-lg shrink-0 select-none border-2 border-violet-200">
                      {selectedMessage.firstName?.[0]}{selectedMessage.lastName?.[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <DialogTitle className="text-lg font-bold text-gray-900">
                          {selectedMessage.firstName} {selectedMessage.lastName}
                        </DialogTitle>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${cfg.bg} ${cfg.color}`}>
                          {cfg.icon} {cfg.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-violet-600 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail className="h-3.5 w-3.5" />
                          {selectedMessage.email}
                        </a>
                        {selectedMessage.phone && (
                          <a
                            href={`tel:${selectedMessage.phone}`}
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-violet-600 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Phone className="h-3.5 w-3.5" />
                            {selectedMessage.phone}
                          </a>
                        )}
                        <span className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(selectedMessage.createdAt).toLocaleString('en-GB', {
                            day: 'numeric', month: 'long', year: 'numeric',
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                {/* Subject */}
                <div className="px-6 pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Subject</p>
                  <p className="text-xl font-bold text-gray-900 font-playfair leading-snug">
                    {selectedMessage.subject}
                  </p>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Message</p>
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 min-h-[120px] max-h-[280px] overflow-y-auto">
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 pb-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      className="gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm h-9"
                      onClick={() => (window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`)}
                    >
                      <Mail className="h-4 w-4" /> Reply via Email
                    </Button>
                    {selectedMessage.phone && (
                      <Button
                        variant="outline"
                        className="gap-2 text-sm h-9"
                        onClick={() => (window.location.href = `tel:${selectedMessage.phone}`)}
                      >
                        <Phone className="h-4 w-4" /> Call
                      </Button>
                    )}
                    {selectedMessage.status !== 'replied' && (
                      <Button
                        variant="outline"
                        className="gap-2 text-sm h-9 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        disabled={isUpdating === selectedMessage.id}
                        onClick={() => handleStatusChange(selectedMessage.id, 'replied')}
                      >
                        <CheckCircle2 className="h-4 w-4" /> Mark Replied
                      </Button>
                    )}
                    {selectedMessage.status !== 'archived' && (
                      <Button
                        variant="ghost"
                        className="gap-2 text-sm h-9 text-gray-500 hover:bg-gray-100"
                        disabled={isUpdating === selectedMessage.id}
                        onClick={() => handleStatusChange(selectedMessage.id, 'archived')}
                      >
                        <Archive className="h-4 w-4" /> Archive
                      </Button>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-red-400 hover:bg-red-50 hover:text-red-600"
                    disabled={isDeleting === selectedMessage.id}
                    onClick={() => handleDelete(selectedMessage.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
