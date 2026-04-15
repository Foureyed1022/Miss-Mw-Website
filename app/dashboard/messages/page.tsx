"use client";

import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import ContactMessages from '@/components/ContactMessages';
import { ContactMessage } from '@/types';
import {
  subscribeToContactMessages,
  updateMessageStatus,
  deleteContactMessage,
} from '@/lib/firestore';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Subscribe to real-time updates — unsubscribe on unmount
    const unsubscribe = subscribeToContactMessages(
      (data) => {
        setMessages(data);
        setIsLoading(false);
      },
      (err) => {
        console.error('Messages listener error:', err);
        setError('Failed to load messages. Check your connection and try again.');
        setIsLoading(false);
        toast.error('Failed to load contact messages');
      }
    );

    return () => unsubscribe();
  }, []);

  const handleUpdateMessageStatus = async (
    id: string,
    status: ContactMessage['status']
  ) => {
    const success = await updateMessageStatus(id, status);
    if (!success) throw new Error('Unable to update message status');
    // No local state update needed — snapshot listener will push the change automatically
  };

  const handleDeleteMessage = async (id: string) => {
    const success = await deleteContactMessage(id);
    if (!success) throw new Error('Unable to delete message');
    // Snapshot listener will remove it automatically
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-20 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-violet-600" />
        <p className="text-sm text-gray-400">Connecting to live messages…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-20 gap-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 border border-red-100">
          <AlertCircle className="h-7 w-7 text-red-400" />
        </div>
        <div>
          <p className="text-base font-semibold text-gray-700">Could not load messages</p>
          <p className="text-sm text-gray-400 mt-1">{error}</p>
        </div>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="gap-2 mt-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <ContactMessages
      messages={messages}
      onUpdateMessageStatus={handleUpdateMessageStatus}
      onDeleteMessage={handleDeleteMessage}
    />
  );
}
