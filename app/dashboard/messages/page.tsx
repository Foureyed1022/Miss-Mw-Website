"use client";

import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import ContactMessages from '@/components/ContactMessages';
import { ContactMessage } from '@/types';
import { ConfirmationDialog } from '@/components/ConfirmationDialog';
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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteClick = async (id: string) => {
    setMessageToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteMessage = async () => {
    if (!messageToDelete) return;
    setIsDeleting(true);
    try {
      const success = await deleteContactMessage(messageToDelete);
      if (success) {
        toast.success('Message deleted successfully');
      } else {
        throw new Error('Unable to delete message');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete message');
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
      setMessageToDelete(null);
    }
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
    <>
      <ContactMessages
        messages={messages}
        onUpdateMessageStatus={handleUpdateMessageStatus}
        onDeleteMessage={handleDeleteClick}
      />
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={handleDeleteMessage}
        title="Delete Message"
        description="Are you sure you want to permanently delete this message? This action cannot be undone."
        isLoading={isDeleting}
        confirmText="Delete"
      />
    </>
  );
}
