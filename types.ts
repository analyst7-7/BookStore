// Fix: Provide full content for types.ts
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  genre: string;
  tagline: string;
  language: string;
  publisher: string;
  isFeatured: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Order {
  id: string;
  bookId: string;
  bookTitle: string;
  customerName: string;
  phone: string;
  address: string;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface PrivacyPolicyContent {
  title: string;
  lastUpdated: string;
  sections: {
    title: string;
    content: string;
  }[];
}
