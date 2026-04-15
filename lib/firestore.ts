import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  where,
  limit,
  Timestamp,
  DocumentData,
  QuerySnapshot,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { NewsArticle, Applicant, ContactMessage, Donation, FinanceTransaction, Subscriber, AnalyticsEvent, UserProfile, SiteStats } from '@/types';
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

export const saveApplicant = async (applicant: Omit<Applicant, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> => {
  try {
    const applicantsRef = collection(db, 'applicant');
    const docRef = await addDoc(applicantsRef, {
      ...applicant,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving applicant:', error);
    return null;
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

export const updateApplicantStatus = async (
  id: string,
  status: Applicant['applicationStatus']
): Promise<boolean> => {
  try {
    const applicantRef = doc(db, 'applicant', id);
    await updateDoc(applicantRef, {
      applicationStatus: status,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error('Error updating applicant status:', error);
    toast.error('Failed to update applicant status');
    return false;
  }
};

export const deleteApplicant = async (id: string): Promise<boolean> => {
  try {
    const applicantRef = doc(db, 'applicant', id);
    await deleteDoc(applicantRef);
    toast.success('Applicant deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting applicant:', error);
    toast.error('Failed to delete applicant');
    return false;
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

export const saveContactMessage = async (
  data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>
): Promise<string | null> => {
  try {
    const messagesRef = collection(db, 'contact_messages');
    const docRef = await addDoc(messagesRef, {
      ...data,
      status: 'new',
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving contact message:', error);
    return null;
  }
};

// Donations
export const saveDonation = async (donation: Omit<Donation, 'id' | 'createdAt'>): Promise<string | null> => {
  try {
    const donationsRef = collection(db, 'donations');
    const donationRef = doc(donationsRef);
    await setDoc(donationRef, {
      ...donation,
      transactionId: donationRef.id,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return donationRef.id;
  } catch (error) {
    console.error('Error saving donation:', error);
    return null;
  }
};

export const updateDonation = async (id: string, updates: Partial<Donation>): Promise<boolean> => {
  try {
    const donationRef = doc(db, 'donations', id);
    await updateDoc(donationRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error('Error updating donation:', error);
    return false;
  }
};

export const getDonations = async (): Promise<Donation[]> => {
  try {
    const donationsRef = collection(db, 'donations');
    const q = query(donationsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Donation[];
  } catch (error) {
    console.error('Error fetching donations:', error);
    return [];
  }
};

export const saveFinanceTransaction = async (transaction: Omit<FinanceTransaction, 'id' | 'createdAt'>): Promise<string | null> => {
  try {
    const transactionsRef = collection(db, 'finance_transactions');
    const txRef = doc(transactionsRef);
    await setDoc(txRef, {
      ...transaction,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return txRef.id;
  } catch (error) {
    console.error('Error saving finance transaction:', error);
    return null;
  }
};

export const updateFinanceTransaction = async (id: string, updates: Partial<FinanceTransaction>): Promise<boolean> => {
  try {
    const txRef = doc(db, 'finance_transactions', id);
    await updateDoc(txRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error('Error updating finance transaction:', error);
    return false;
  }
};

export const getFinanceTransactions = async (): Promise<FinanceTransaction[]> => {
  try {
    const transactionsRef = collection(db, 'finance_transactions');
    const q = query(transactionsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as FinanceTransaction[];
  } catch (error) {
    console.error('Error fetching finance transactions:', error);
    return [];
  }
};

// Subscribers
export const saveSubscriber = async (email: string, source: string): Promise<boolean> => {
  try {
    const subscribersRef = collection(db, 'subscribers');
    // Check if duplicate
    const q = query(subscribersRef, where('email', '==', email));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) return true;

    await addDoc(subscribersRef, {
      email,
      source,
      createdAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error('Error saving subscriber:', error);
    throw error;
  }
};

export const getSubscribers = async (): Promise<Subscriber[]> => {
  try {
    const subscribersRef = collection(db, 'subscribers');
    const q = query(subscribersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Subscriber[];
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return [];
  }
};

export const deleteSubscriber = async (id: string): Promise<boolean> => {
  try {
    const subscriberRef = doc(db, 'subscribers', id);
    await deleteDoc(subscriberRef);
    return true;
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    return false;
  }
};

// Analytics
export const saveAnalyticsEvent = async (event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> => {
  try {
    const eventsRef = collection(db, 'analytics_events');
    await addDoc(eventsRef, {
      ...event,
      metadata: event.metadata || {},
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error saving analytics event:', error);
  }
};

// Unified Activity Feed
export type ActivityItem = {
  id: string;
  type: 'Donation' | 'Registration' | 'Newsletter' | 'Message' | 'Event';
  description: string;
  meta: string;
  time: string;
  timestamp: Date;
}

export const getRecentActivity = async (limitCount = 10): Promise<ActivityItem[]> => {
  try {
    const [donations, applicants, messages, subscribers] = await Promise.all([
      getDonations(),
      getApplicants(),
      getContactMessages(),
      getDocs(query(collection(db, 'subscribers'), orderBy('createdAt', 'desc'), limit(limitCount)))
    ]);

    const activities: ActivityItem[] = [];

    // Map donations
    donations.forEach(d => {
      activities.push({
        id: d.id,
        type: 'Donation',
        description: `New donation from ${d.firstName}`,
        meta: `MWK ${d.amount}`,
        time: '', // Will be calculated on frontend or via simple format
        timestamp: d.createdAt
      });
    });

    // Map applicants
    applicants.forEach(a => {
      activities.push({
        id: a.id,
        type: 'Registration',
        description: `Pageant registration: ${a.firstName}`,
        meta: a.city,
        time: '',
        timestamp: a.createdAt
      });
    });

    // Map messages
    messages.forEach(m => {
      activities.push({
        id: m.id,
        type: 'Message',
        description: `New message from ${m.firstName}`,
        meta: m.subject,
        time: '',
        timestamp: new Date(m.createdAt)
      });
    });

    // Map subscribers
    subscribers.docs.forEach(doc => {
      const data = doc.data();
      activities.push({
        id: doc.id,
        type: 'Newsletter',
        description: `New subscriber`,
        meta: data.email,
        time: '',
        timestamp: data.createdAt?.toDate() || new Date()
      });
    });

    // Sort and limit
    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limitCount);
  } catch (error) {
    console.error('Error fetching activity feed:', error);
    return [];
  }
};

// Chart Data Fetchers
export const getDailyVisits = async (days = 7) => {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    const q = query(
      collection(db, 'analytics_events'),
      where('name', '==', 'page_view'),
      where('timestamp', '>=', Timestamp.fromDate(cutoff)),
      orderBy('timestamp', 'asc')
    );
    const snapshot = await getDocs(q);

    const visitsByDay: Record<string, number> = {};
    const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Initialize last 7 days
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = labels[d.getDay()];
      visitsByDay[label] = 0;
    }

    snapshot.docs.forEach(doc => {
      const date = doc.data().timestamp.toDate() as Date;
      const label = labels[date.getDay()];
      if (visitsByDay[label] !== undefined) {
        visitsByDay[label]++;
      }
    });

    // Convert back to sorted array (matching trafficData format)
    const today = new Date().getDay();
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = labels[d.getDay()];
      result.push({ label, visits: visitsByDay[label] });
    }
    return result;
  } catch (error) {
    console.error('Error fetching daily visits:', error);
    return [];
  }
};

export const getMonthlyDonations = async () => {
  try {
    const q = query(collection(db, 'donations'), orderBy('createdAt', 'asc'));
    const snapshot = await getDocs(q);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const donationsByMonth: Record<string, number> = {};

    months.forEach(m => donationsByMonth[m] = 0);

    snapshot.docs.forEach(doc => {
      const date = doc.data().createdAt.toDate() as Date;
      const month = months[date.getMonth()];
      donationsByMonth[month] += Number(doc.data().amount || 0);
    });

    return months.map(label => ({ label, amount: donationsByMonth[label] }));
  } catch (error) {
    console.error('Error fetching monthly donations:', error);
    return [];
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
      newMessagesCount: 0,
      donationsCount: 0,
      subscribersCount: 0,
      totalVisits: 0
    };
  }

  try {
    const [
      articlesSnapshot,
      applicantsSnapshot,
      messagesSnapshot,
      donationsSnapshot,
      subscribersSnapshot,
      visitsSnapshot
    ] = await Promise.all([
      getDocs(collection(db, 'articles')),
      getDocs(collection(db, 'applicant')),
      getDocs(collection(db, 'contact_messages')),
      getDocs(collection(db, 'donations')),
      getDocs(collection(db, 'subscribers')),
      getDocs(query(collection(db, 'analytics_events'), where('name', '==', 'page_view')))
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
      donationsCount: donationsSnapshot.size,
      subscribersCount: subscribersSnapshot.size,
      totalVisits: visitsSnapshot.size
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw new Error('Failed to fetch statistics');
  }
};

// User Profile Management
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        uid: snapshot.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (uid: string, profile: Partial<UserProfile>): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...profile,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update profile');
  }
};

export const createUserProfile = async (uid: string, profile: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      await setDoc(userRef, {
        ...profile,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw new Error('Failed to create user profile');
  }
};

export const getAllUsers = async (): Promise<UserProfile[]> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as UserProfile[];
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
};

// Default stats fallback
const DEFAULT_STATS: SiteStats = {
  contestants: 0,
  queensCrowned: 0,
  yearsOfLegacy: 0,
  livesImpacted: 0,
};

// Site Statistics (Impact Counters)
export const getSiteStats = async (): Promise<SiteStats> => {
  try {
    const statsRef = doc(db, 'settings', 'site_stats');
    const snapshot = await getDoc(statsRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        ...DEFAULT_STATS,
        ...data,
        updatedAt: data.updatedAt?.toDate() || undefined,
      } as SiteStats;
    }
    // If doc doesn't exist yet, seed it with defaults
    await setDoc(statsRef, {
      ...DEFAULT_STATS,
      updatedAt: Timestamp.now(),
    });
    return DEFAULT_STATS;
  } catch (error) {
    console.error('Error fetching site stats:', error);
    return DEFAULT_STATS;
  }
};

export const updateSiteStats = async (stats: Partial<SiteStats>): Promise<boolean> => {
  try {
    const statsRef = doc(db, 'settings', 'site_stats');
    await setDoc(
      statsRef,
      {
        ...stats,
        updatedAt: Timestamp.now(),
      },
      { merge: true }
    );
    toast.success('Impact statistics updated successfully!');
    return true;
  } catch (error) {
    console.error('Error updating site stats:', error);
    toast.error('Failed to update statistics.');
    return false;
  }
};

// ─────────────────────────────────────────────
// REAL-TIME SNAPSHOT LISTENERS
// Each returns an Unsubscribe function — call it on component unmount.
// ─────────────────────────────────────────────

/** Real-time listener for contact_messages (auth required) */
export const subscribeToContactMessages = (
  callback: (messages: ContactMessage[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  if (!auth.currentUser) {
    callback([]);
    return () => { };
  }
  const q = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const messages = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        let createdAt: string;
        if (data.createdAt?.toDate) {
          createdAt = data.createdAt.toDate().toISOString();
        } else if (data.createdAt?.seconds) {
          createdAt = new Date(data.createdAt.seconds * 1000).toISOString();
        } else if (data.createdAt instanceof Date) {
          createdAt = data.createdAt.toISOString();
        } else if (typeof data.createdAt === 'string') {
          createdAt = new Date(data.createdAt).toISOString();
        } else {
          createdAt = new Date().toISOString();
        }
        return { id: docSnap.id, ...data, createdAt } as ContactMessage;
      });
      callback(messages);
    },
    (error) => {
      console.error('subscribeToContactMessages error:', error);
      onError?.(error);
    }
  );
};

/** Real-time listener for applicants (public read) */
export const subscribeToApplicants = (
  callback: (applicants: Applicant[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  const q = query(collection(db, 'applicant'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const applicants = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      })) as Applicant[];
      callback(applicants);
    },
    (error) => {
      console.error('subscribeToApplicants error:', error);
      onError?.(error);
    }
  );
};

/** Real-time listener for news articles (public read) */
export const subscribeToNewsArticles = (
  callback: (articles: NewsArticle[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const articles = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      })) as NewsArticle[];
      callback(articles);
    },
    (error) => {
      console.error('subscribeToNewsArticles error:', error);
      onError?.(error);
    }
  );
};

/** Real-time listener for subscribers (auth required) */
export const subscribeToSubscribers = (
  callback: (subscribers: Subscriber[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  if (!auth.currentUser) {
    callback([]);
    return () => { };
  }
  const q = query(collection(db, 'subscribers'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const subscribers = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
      })) as Subscriber[];
      callback(subscribers);
    },
    (error) => {
      console.error('subscribeToSubscribers error:', error);
      onError?.(error);
    }
  );
};

/** Real-time listener for donations (auth required) */
export const subscribeToDonations = (
  callback: (donations: Donation[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  if (!auth.currentUser) {
    callback([]);
    return () => { };
  }
  const q = query(collection(db, 'donations'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const donations = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
      })) as Donation[];
      callback(donations);
    },
    (error) => {
      console.error('subscribeToDonations error:', error);
      onError?.(error);
    }
  );
};

/** Real-time listener for finance transactions (auth required) */
export const subscribeToFinanceTransactions = (
  callback: (transactions: FinanceTransaction[]) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  if (!auth.currentUser) {
    callback([]);
    return () => { };
  }
  const q = query(collection(db, 'finance_transactions'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const transactions = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
      })) as FinanceTransaction[];
      callback(transactions);
    },
    (error) => {
      console.error('subscribeToFinanceTransactions error:', error);
      onError?.(error);
    }
  );
};

/** Real-time listener for site stats (public read) */
export const subscribeToSiteStats = (
  callback: (stats: SiteStats) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  const statsRef = doc(db, 'settings', 'site_stats');
  return onSnapshot(
    statsRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        callback({
          contestants: 0,
          queensCrowned: 0,
          yearsOfLegacy: 0,
          livesImpacted: 0,
          ...data,
          updatedAt: data.updatedAt?.toDate() || undefined,
        } as SiteStats);
      }
    },
    (error) => {
      console.error('subscribeToSiteStats error:', error);
      onError?.(error);
    }
  );
};

/**
 * Real-time listener for dashboard statistics.
 * Auth required — returns zeroed stats if not authenticated.
 */
export const subscribeToStatistics = (
  callback: (stats: {
    articlesCount: number;
    applicantsCount: number;
    messagesCount: number;
    newMessagesCount: number;
    donationsCount: number;
    subscribersCount: number;
  }) => void,
  onError?: (error: Error) => void
): Unsubscribe => {
  const zero = {
    articlesCount: 0, applicantsCount: 0, messagesCount: 0,
    newMessagesCount: 0, donationsCount: 0, subscribersCount: 0,
  };

  if (!auth.currentUser) {
    callback(zero);
    return () => { };
  }

  // We listen to contact_messages as the primary driver (most volatile)
  // and do a one-off read for the other counts to keep listener count manageable.
  const messagesQ = query(collection(db, 'contact_messages'));
  const newMessagesQ = query(collection(db, 'contact_messages'), where('status', '==', 'new'));

  let messagesCount = 0;
  let newMessagesCount = 0;

  const refreshOtherCounts = async () => {
    try {
      const [articles, applicants, donations, subscribers] = await Promise.all([
        getDocs(collection(db, 'articles')),
        getDocs(collection(db, 'applicant')),
        getDocs(collection(db, 'donations')),
        getDocs(collection(db, 'subscribers')),
      ]);
      callback({
        articlesCount: articles.size,
        applicantsCount: applicants.size,
        messagesCount,
        newMessagesCount,
        donationsCount: donations.size,
        subscribersCount: subscribers.size,
      });
    } catch (error) {
      console.error('subscribeToStatistics refreshOtherCounts error:', error);
    }
  };

  const unsubMessages = onSnapshot(
    messagesQ,
    (snapshot) => { messagesCount = snapshot.size; refreshOtherCounts(); },
    (error) => { console.error('subscribeToStatistics messages error:', error); onError?.(error); }
  );

  const unsubNew = onSnapshot(
    newMessagesQ,
    (snapshot) => { newMessagesCount = snapshot.size; refreshOtherCounts(); },
    (error) => { console.error('subscribeToStatistics newMessages error:', error); onError?.(error); }
  );

  // Trigger an initial read
  refreshOtherCounts();

  return () => {
    unsubMessages();
    unsubNew();
  };
};
