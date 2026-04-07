'use client';

import { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import NewsManagement from '@/components/NewsManagement';
import ApplicantsView from '@/components/ApplicantsView';
import ContactMessages from '@/components/ContactMessages';
import VotingManagement from '@/components/VotingManagement';
import { NewsArticle, Applicant, ContactMessage } from '@/types';
import { 
  getNewsArticles, 
  addNewsArticle, 
  updateNewsArticle, 
  deleteNewsArticle,
  getApplicants,
  getContactMessages,
  updateMessageStatus,
  deleteContactMessage,
  getStatistics
} from '@/lib/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import ProfilePage from '@/components/ProfilePage';

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Data states
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [statistics, setStatistics] = useState({
    articlesCount: 0,
    applicantsCount: 0,
    messagesCount: 0,
    newMessagesCount: 0,
  });

useEffect(() => {
  let isMounted = true;
  
  const loadData = async () => {
    if (!auth.currentUser) return; // Critical check
    
    setLoading(true);
    try {
      const [articlesData, applicantsData, messagesData, statsData] = await Promise.all([
        getNewsArticles(),
        getApplicants(),
        getContactMessages(),
        getStatistics()
      ]);

      if (isMounted) {
        setArticles(articlesData);
        setApplicants(applicantsData);
        setMessages(messagesData);
        setStatistics(statsData);
      }
    } catch (error) {
      if (isMounted) {
        console.error('Error loading data:', error);
        // Consider adding user feedback here
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  // Add auth state listener
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user && isMounted) {
      loadData();
    }
  });

  return () => {
    isMounted = false;
    unsubscribe();
  };
}, []);                              

  // Article management functions
  const handleAddArticle = async (articleData: Omit<NewsArticle, 'id'>) => {
    const id = await addNewsArticle(articleData);
    if (id) {
      const newArticle = { ...articleData, id };
      setArticles([newArticle, ...articles]);
      setStatistics(prev => ({ ...prev, articlesCount: prev.articlesCount + 1 }));
    }
  };

  const handleUpdateArticle = async (id: string, updates: Partial<NewsArticle>) => {
    const success = await updateNewsArticle(id, updates);
    if (success) {
      setArticles(articles.map(article => 
        article.id === id ? { ...article, ...updates } : article
      ));
    }
  };

  const handleDeleteArticle = async (id: string) => {
    const success = await deleteNewsArticle(id);
    if (success) {
      setArticles(articles.filter(article => article.id !== id));
      setStatistics(prev => ({ ...prev, articlesCount: prev.articlesCount - 1 }));
    }
  };

  // Message management functions
  const handleUpdateMessageStatus = async (id: string, status: ContactMessage['status']) => {
    const success = await updateMessageStatus(id, status);
    if (success) {
      setMessages(messages.map(message =>
        message.id === id ? { ...message, status } : message
      ));
      // Update new messages count
      const newMessagesCount = messages.filter(m => 
        m.id === id ? status === 'new' : m.status === 'new'
      ).length;
      setStatistics(prev => ({ ...prev, newMessagesCount }));
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const success = await deleteContactMessage(id);
    if (success) {
      const messageToDelete = messages.find(m => m.id === id);
      setMessages(messages.filter(message => message.id !== id));
      setStatistics(prev => ({
        ...prev,
        messagesCount: prev.messagesCount - 1,
        newMessagesCount: messageToDelete?.status === 'new' ? prev.newMessagesCount - 1 : prev.newMessagesCount
      }));
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3D3B48 0%, #2D2B36 100%)' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#9C8653' }}></div>
            <p className="text-white">Loading admin data...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#3D3B48',
            border: '1px solid #9C8653',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#9C8653',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        {/* Main Content */}
        <div className="lg:ml-64 min-h-screen">
          {activeTab === 'dashboard' && (
            <Dashboard  
              articlesCount={statistics.articlesCount}
              messagesCount={statistics.messagesCount}
              newMessagesCount={statistics.newMessagesCount}
              onTabChange={setActiveTab}
              articles={articles}
              messages={messages}
              applicants={applicants}
            />
          )}
          
          {activeTab === 'news' && (
            <NewsManagement
              articles={articles}
              onAddArticle={handleAddArticle}
              onUpdateArticle={handleUpdateArticle}
              onDeleteArticle={handleDeleteArticle}
            />
          )}
          
          {activeTab === 'applicants' && (
            <ApplicantsView applicants={applicants} />
          )}
          
          {activeTab === 'messages' && (
            <ContactMessages
              messages={messages}
              onUpdateMessageStatus={handleUpdateMessageStatus}
              onDeleteMessage={handleDeleteMessage}
            />
          )}
          
          {activeTab === 'voting' && (
            <VotingManagement />
          )}
          
          {activeTab === 'profile' && (
            <ProfilePage />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}