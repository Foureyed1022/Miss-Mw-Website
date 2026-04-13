"use client";

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ContactMessages from '@/components/ContactMessages';
import { ContactMessage } from '@/types';
import { getContactMessages, updateMessageStatus, deleteContactMessage } from '@/lib/firestore';
import toast from 'react-hot-toast';

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await getContactMessages();
        setMessages(data);
      } catch (error) {
        console.error('Error loading messages:', error);
        toast.error('Failed to load contact messages');
      } finally {
        setIsLoading(false);
      }
    };
    loadMessages();
  }, []);

  const handleUpdateMessageStatus = async (id: string, status: ContactMessage['status']) => {
    const success = await updateMessageStatus(id, status);
    if (!success) {
      throw new Error('Unable to update message status');
    }
    setMessages(prev => prev.map(message => message.id === id ? { ...message, status } : message));
  };

  const handleDeleteMessage = async (id: string) => {
    const success = await deleteContactMessage(id);
    if (!success) {
      throw new Error('Unable to delete message');
    }
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center p-20">
        <Loader2 className="h-10 w-10 animate-spin text-[#7C3AED]" />
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

