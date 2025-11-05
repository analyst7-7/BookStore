// Created types for the application
export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  genre: string;
  tagline: string;
  language: string;
  publisher: string;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  bookTitle: string;
  bookId: number;
  status: 'ডেলিভারি হয়েছে' | 'প্রক্রিয়াধীন' | 'বাতিল হয়েছে';
  date: string;
}

export type View = 'home' | 'allBooks' | 'bookDetail' | 'contact' | 'privacy' | 'admin';

export interface ContactInfo {
    addressLines: string[];
    email: string;
    phone: string;
    hours: string;
}

export interface PrivacyPolicyContent {
    title: string;
    lastUpdated: string;
    sections: { title: string; content: string }[];
}