import React, { useState, useEffect } from 'react';
import type { Book } from '../types';
import { getSimilarBooks } from '../services/geminiService';
import BookCard from './BookCard';

interface BookDetailPageProps {
  book: Book;
  onBuyNowClick: (book: Book) => void;
  onViewDetails: (book: Partial<Book>) => void;
}

const BookDetailPage: React.FC<BookDetailPageProps> = ({ book, onBuyNowClick, onViewDetails }) => {
  const [similarBooks, setSimilarBooks] = useState<Partial<Book>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Book Cover */}
        <div className="lg:col-span-1 flex justify-center">
          <div className="group w-full max-w-sm overflow-hidden rounded-lg shadow-xl">
            <img 
              src={book.coverImage} 
              alt={`Cover of ${book.title}`} 
              className="w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-110" 
            />
          </div>
        </div>

        {/* Book Details */}
        <div className="md:col-span-1 lg:col-span-2">
          <h1 className="text-4xl font-bold font-heading text-navy-blue">{book.title}</h1>
          <p className="text-xl text-gray-600 mt-2">লেখক: {book.author}</p>
          <p className="text-3xl font-bold text-navy-blue my-4">৳{book.price}</p>
          <button 
            onClick={() => onBuyNowClick(book)}
            className="w-full md:w-auto bg-soft-gold text-navy-blue font-bold py-3 px-10 rounded-md hover:bg-yellow-400 transition-colors text-lg"
          >
            এখনই কিনুন
          </button>
          <p className="text-sm text-gray-500 mt-2">শুধুমাত্র ক্যাশ অন ডেলিভারি | ৳১০০০ এর বেশি অর্ডারে ফ্রি ডেলিভারি</p>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold font-heading text-navy-blue mb-2">সারসংক্ষেপ</h2>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>

          <div className="mt-6 border-t pt-4">
             <p><strong className="text-gray-700">ধরণ:</strong> {book.genre}</p>
             <p><strong className="text-gray-700">ভাষা:</strong> {book.language}</p>
             <p><strong className="text-gray-700">প্রকাশক:</strong> {book.publisher}</p>
          </div>
        </div>
      </div>

      {/* Similar Books Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold font-heading text-center text-navy-blue mb-10">আপনার পছন্দের মতো বই</h2>
        {isLoading ? (
          <div className="text-center text-gray-500">সুপারিশ লোড হচ্ছে...</div>
        ) : similarBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarBooks.map((rec, index) => (
              <BookCard 
                key={`${rec.title}-${index}`}
                book={rec}
                onBuyNow={() => { alert('এই বইটি কেনার জন্য অনুগ্রহ করে বিস্তারিত দেখুন।'); }}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">সুপারিশ লোড করা যায়নি।</div>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;