import React, { useState, useEffect } from 'react';
import type { Book } from '../types';
import { getSimilarBooks } from '../services/geminiService';
import BookCard from './BookCard';

interface BookDetailPageProps {
  book: Book;
  onBuyNowClick: (book: Partial<Book>) => void;
  onViewDetails: (book: Partial<Book>) => void;
}

const BookDetailPage: React.FC<BookDetailPageProps> = ({ book, onBuyNowClick, onViewDetails }) => {
  const [similarBooks, setSimilarBooks] = useState<Partial<Book>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchSimilarBooks = async () => {
      setIsLoading(true);
      const recommendations = await getSimilarBooks(book);
      setSimilarBooks(recommendations);
      setIsLoading(false);
    };

    fetchSimilarBooks();
  }, [book]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img src={book.coverImage} alt={`Cover of ${book.title}`} className="rounded-lg shadow-md w-full object-contain aspect-[2/3]" />
          </div>
          <div className="md:col-span-2 flex flex-col">
            <h1 className="text-4xl font-bold font-heading text-navy-blue">{book.title}</h1>
            <p className="text-xl text-gray-600 mt-2">লেখক: {book.author}</p>
            <p className="text-gray-500 text-sm mt-1">প্রকাশক: {book.publisher} | ভাষা: {book.language}</p>

            <div className="my-6">
              <p className="text-4xl font-bold text-navy-blue">৳{book.price}</p>
            </div>
            
            <div className="mt-4 text-gray-700 leading-relaxed flex-grow space-y-4">
              <h3 className="font-semibold text-xl text-navy-blue mb-2 border-b-2 border-navy-blue/20 pb-2">সারসংক্ষেপ</h3>
              <p>{book.description}</p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => onBuyNowClick(book)}
                className="w-full bg-soft-gold text-navy-blue font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors text-lg"
              >
                এখনই কিনুন
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Books Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold font-heading text-center text-navy-blue mb-10">আপনার পছন্দের মতো বই</h2>
        {isLoading ? (
          <div className="text-center text-gray-500 py-8">সুপারিশ লোড হচ্ছে...</div>
        ) : similarBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarBooks.map((rec, index) => (
              <BookCard 
                key={`${rec.title}-${index}`}
                book={rec}
                onBuyNow={onBuyNowClick}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">এই মুহূর্তে কোনো সুপারিশ পাওয়া যায়নি।</div>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;
