import React, { useState, useEffect } from 'react';
import type { Book } from '../types';
import { CloseIcon } from './Icons';
import { getSimilarBooks } from '../services/geminiService';
import BookCard from './BookCard';

interface BookDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
  onBuyNow: (book: Partial<Book>) => void;
  onViewDetails: (book: Partial<Book>) => void;
}

const BookDetailModal: React.FC<BookDetailModalProps> = ({ isOpen, onClose, book, onBuyNow, onViewDetails }) => {
  const [similarBooks, setSimilarBooks] = useState<Partial<Book>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && book) {
      const fetchSimilarBooks = async () => {
        setIsLoading(true);
        const recommendations = await getSimilarBooks(book);
        setSimilarBooks(recommendations);
        setIsLoading(false);
      };

      fetchSimilarBooks();
    }
  }, [isOpen, book]);

  if (!isOpen || !book) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
        onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col relative animate-fade-in-up" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-detail-modal-title"
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10">
          <CloseIcon />
        </button>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 group overflow-hidden">
                  <img src={book.coverImage} alt={`Cover of ${book.title}`} className="rounded-lg shadow-lg w-full object-contain aspect-[2/3] transition-transform duration-300 ease-in-out group-hover:scale-110" />
              </div>
              <div className="md:col-span-2 flex flex-col">
                  <h2 id="book-detail-modal-title" className="text-3xl font-bold font-heading text-navy-blue">{book.title}</h2>
                  <p className="text-lg text-gray-600 mt-1">লেখক: {book.author}</p>
                  
                  <div className="my-4">
                      <p className="text-3xl font-bold text-navy-blue">৳{book.price}</p>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-700 leading-relaxed flex-grow">
                      <h3 className="font-semibold text-navy-blue mb-1">সারসংক্ষেপ</h3>
                      <p>{book.description}</p>
                  </div>

                  <div className="mt-6">
                      <button
                          onClick={() => onBuyNow(book)}
                          className="w-full bg-soft-gold text-navy-blue font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors text-lg"
                      >
                          এখনই কিনুন
                      </button>
                  </div>
              </div>
          </div>
          
          {/* Similar Books Section */}
          <div className="mt-10 pt-6 border-t">
            <h2 className="text-2xl font-bold font-heading text-center text-navy-blue mb-6">আপনার পছন্দের মতো বই</h2>
            {isLoading ? (
              <div className="text-center text-gray-500">সুপারিশ লোড হচ্ছে...</div>
            ) : similarBooks.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarBooks.map((rec, index) => (
                  <BookCard 
                    key={`${rec.title}-${index}`}
                    book={rec}
                    onBuyNow={onBuyNow}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">এই মুহূর্তে কোনো সুপারিশ পাওয়া যায়নি।</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
