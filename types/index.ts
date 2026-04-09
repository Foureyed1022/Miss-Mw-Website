export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  dob: string;
  height: number;
  address: string;
  city: string;
  country: string;
  education: string;
  occupation: string;
  languages: string;
  talents: string;
  communityService: string;
  previousPageants: string;
  whyJoin: string;
  paymentMethod: string;
  termsAccepted: boolean;
  headshotPhoto: string;
  fullLengthPhoto: string;
  idProof: string;
  consentletter: string;
  paymentProof: string;
  applicationStatus: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

// Voting System Types
export interface Contestant {
  id: string;
  name: string;
  age: number;
  location: string;
  occupation: string;
  image: string;
  votes: number;
  createdAt: Date;
  bio?: string;
  paymentLink?: string;
}

export interface Transaction {
  id: string;
  contestantId: string;
  contestantName: string;
  amountPaid: number;
  votesCount: number;
  paymentReference: string;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  payerFirstName?: string;
  payerLastName?: string;
  payerEmail?: string;
  payerPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoteBundle {
  votes: number;
  price: number;
  label: string;
  savings?: number;
  popular?: boolean;
}

export interface PayChanguPaymentRequest {
  tx_ref: string;
  amount: string; // PayChangu expects amount as string
  currency: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string; // Optional phone number
  callback_url?: string; // PayChangu uses callback_url for success redirect
  return_url?: string; // PayChangu uses return_url for failed payments
  meta?: string[]; // PayChangu expects meta as array of strings
  customization?: {
    title?: string;
    description?: string;
    logo?: string;
  };
}

export interface PayChanguWebhookPayload {
  event: string;
  data: {
    tx_ref: string;
    amount: number;
    currency: string;
    status: string;
    customer_email: string;
    customer_phone_number: string;
    meta: string[]; // PayChangu sends meta as array of strings
  };
}

export interface Donation {
  id: string;
  amount: number;
  allocation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  paymentMethod: string;
  comments?: string;
  isMonthly: boolean;
  status: 'pending' | 'success' | 'failed';
  transactionId?: string;
  createdAt: Date;
}

export interface Subscriber {
  id: string;
  email: string;
  source: string;
  createdAt: Date;
}

export interface AnalyticsEvent {
  id: string;
  name: string;
  source?: string;
  path: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}