import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where, 
  limit,
  Timestamp,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { NewsArticle, Applicant, ContactMessage } from '@/types';
import toast from 'react-hot-toast';

// Categories Management
export const getCategories = async (): Promise<string[]> => {
  try {
    const categoriesRef = collection(db, 'categories');
    const snapshot = await getDocs(categoriesRef);
    
    if (snapshot.empty) {
      // Return default categories if none exist
      return ['Pageant', 'Community', 'Fashion', 'Events', 'Winners'];
    }
    
    return snapshot.docs.map(doc => doc.data().name);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ['Pageant', 'Community', 'Fashion', 'Events', 'Winners'];
  }
};

export const addCategory = async (categoryName: string): Promise<boolean> => {
  try {
    const categoriesRef = collection(db, 'categories');
    await addDoc(categoriesRef, {
      name: categoryName,
      createdAt: Timestamp.now(),
    });
    toast.success('Category added successfully');
    return true;
  } catch (error) {
    console.error('Error adding category:', error);
    toast.error('Failed to add category');
    return false;
  }
};

export const deleteCategory = async (categoryName: string): Promise<boolean> => {
  try {
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, where('name', '==', categoryName));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      await deleteDoc(snapshot.docs[0].ref);
      toast.success('Category deleted successfully');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting category:', error);
    toast.error('Failed to delete category');
    return false;
  }
};

// News Articles
export const getNewsArticles = async (): Promise<NewsArticle[]> => {
  try {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as NewsArticle[];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const addNewsArticle = async (article: Omit<NewsArticle, 'id'>): Promise<string | null> => {
  try {
    const articlesRef = collection(db, 'articles');
    const docRef = await addDoc(articlesRef, {
      ...article,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding article:', error);
    toast.error('Failed to add article');
    return null;
  }
};

export const updateNewsArticle = async (id: string, updates: Partial<NewsArticle>): Promise<boolean> => {
  try {
    const articleRef = doc(db, 'articles', id);
    await updateDoc(articleRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error('Error updating article:', error);
    toast.error('Failed to update article');
    return false;
  }
};

export const deleteNewsArticle = async (id: string): Promise<boolean> => {
  try {
    const articleRef = doc(db, 'articles', id);
    await deleteDoc(articleRef);
    return true;
  } catch (error) {
    console.error('Error deleting article:', error);
    toast.error('Failed to delete article');
    return false;
  }
};

// Applicants
export const getApplicants = async (): Promise<Applicant[]> => {
  try {
    const applicantsRef = collection(db, 'applicant');
    const q = query(applicantsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Applicant[];
  } catch (error) {
    console.error('Error fetching applicants:', error);
    return [];
  }
};

export const getApplicant = async (id: string): Promise<Applicant | null> => {
  try {
    const applicantRef = doc(db, 'applicant', id);
    const snapshot = await getDoc(applicantRef);
    
    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...snapshot.data(),
        createdAt: snapshot.data().createdAt?.toDate() || new Date(),
        updatedAt: snapshot.data().updatedAt?.toDate() || new Date(),
      } as Applicant;
    }
    return null;
  } catch (error) {
    console.error('Error fetching applicant:', error);
    return null;
  }
};

// Contact Messages
export const getContactMessages = async (): Promise<ContactMessage[]> => {
  if (!auth.currentUser) return [];

  try {
    const messagesRef = collection(db, 'contact_messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      let createdAt: string;

      // Handle all possible timestamp formats
      if (data.createdAt?.toDate) {
        // Firestore Timestamp object
        createdAt = data.createdAt.toDate().toISOString();
      } else if (data.createdAt?.seconds) {
        // Raw Firestore timestamp {seconds, nanoseconds}
        createdAt = new Date(data.createdAt.seconds * 1000).toISOString();
      } else if (data.createdAt instanceof Date) {
        // Already a Date object
        createdAt = data.createdAt.toISOString();
      } else if (typeof data.createdAt === 'string') {
        // ISO string (validate format)
        createdAt = new Date(data.createdAt).toISOString();
      } else {
        // Fallback to current date
        createdAt = new Date().toISOString();
      }

      return {
        id: doc.id,
        ...data,
        createdAt
      } as ContactMessage;
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export const updateMessageStatus = async (id: string, status: ContactMessage['status']): Promise<boolean> => {
  try {
    const messageRef = doc(db, 'contact_messages', id);
    await updateDoc(messageRef, { status });
    return true;
  } catch (error) {
    console.error('Error updating message status:', error);
    toast.error('Failed to update message status');
    return false;
  }
};

export const deleteContactMessage = async (id: string): Promise<boolean> => {
  try {
    const messageRef = doc(db, 'contact_messages', id);
    await deleteDoc(messageRef);
    return true;
  } catch (error) {
    console.error('Error deleting message:', error);
    toast.error('Failed to delete message');
    return false;
  }
};

// Statistics
export const getStatistics = async () => {
  // Add auth check
  if (!auth.currentUser) {
    console.warn('Attempted to fetch statistics without authentication');
    return {
      articlesCount: 0,
      applicantsCount: 0,
      messagesCount: 0,
      newMessagesCount: 0
    };
  }

  try {
    const [articlesSnapshot, applicantsSnapshot, messagesSnapshot] = await Promise.all([
      getDocs(collection(db, 'articles')),
      getDocs(collection(db, 'applicant')),
      getDocs(collection(db, 'contact_messages'))
    ]);

    const newMessagesQuery = query(
      collection(db, 'contact_messages'), 
      where('status', '==', 'new')
    );
    const newMessagesSnapshot = await getDocs(newMessagesQuery);

    return {
      articlesCount: articlesSnapshot.size,
      applicantsCount: applicantsSnapshot.size,
      messagesCount: messagesSnapshot.size,
      newMessagesCount: newMessagesSnapshot.size,
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw new Error('Failed to fetch statistics');
  }
};