import React from 'react';
import type { Book } from '../types';

interface BookCardProps {
  book: Partial<Book>;
  onBuyNow: (book: Partial<Book>) => void;
  onViewDetails: (book: Partial<Book>) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onBuyNow, onViewDetails }) => {
  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    onBuyNow(book);
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer group"
      onClick={() => onViewDetails(book)}
    >
      <div className="relative overflow-hidden h-64">
        <img src={book.coverImage} alt={`Cover of ${book.title}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold font-heading text-navy-blue truncate">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">লেখক: {book.author}</p>
        <p className="text-gray-500 text-xs flex-grow">{book.tagline}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold text-navy-blue">{book.price ? `৳${book.price}` : ''}</p>
          {book.price && (
            <button
                onClick={handleBuyNowClick}
                className="bg-soft-gold text-navy-blue font-bold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors transform hover:scale-105 duration-200"
            >
                এখনই কিনুন
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;