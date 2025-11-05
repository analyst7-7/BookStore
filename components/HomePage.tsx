import React from 'react';
import type { Book } from '../types';
import BookCard from './BookCard';

interface HomePageProps {
  books: Book[];
  onViewAllBooks: () => void;
  onBuyNow: (book: Book) => void;
  onViewDetails: (book: Book) => void;
}

const HomePage: React.FC<HomePageProps> = ({ books, onViewAllBooks, onBuyNow, onViewDetails }) => {
  const featuredBooks = books.filter(b => b.isFeatured).slice(0, 4);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-navy-blue text-white py-20 md:py-32 text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('https://picsum.photos/seed/library/1600/900')"}}
        ></div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">আপনার পরবর্তী প্রিয় বইটি খুঁজুন</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">সরাসরি আপনার দোরগোড়ায় পৌঁছে যাবে</p>
          <button 
            onClick={onViewAllBooks}
            className="bg-soft-gold text-navy-blue font-bold py-3 px-8 rounded-md hover:bg-yellow-400 transition-colors text-lg"
          >
            বই ব্রাউজ করুন
          </button>
          <p className="mt-4 text-gray-300 text-sm">সারা দেশে ক্যাশ অন ডেলিভারি উপলব্ধ।</p>
        </div>
      </section>

      {/* Featured Books */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading text-center text-navy-blue mb-10">বিশেষ বইসমূহ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                onBuyNow={onBuyNow} 
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;