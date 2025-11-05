import React, { useState, useMemo } from 'react';
import type { Book, Category } from '../types';
import BookCard from './BookCard';

interface AllBooksPageProps {
  books: Book[];
  categories: Category[];
  onBuyNow: (book: Book | Partial<Book>) => void;
  onViewDetails: (book: Book | Partial<Book>) => void;
}

const AllBooksPage: React.FC<AllBooksPageProps> = ({ books, categories, onBuyNow, onViewDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        const categoryMatch = selectedCategory === 'all' || book.genre === categories.find(c => c.id === selectedCategory)?.name;
        const searchMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
      });
  }, [books, categories, selectedCategory, searchTerm]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-heading text-navy-blue">আমাদের বইয়ের সংগ্রহ</h1>
        <p className="text-lg text-gray-600 mt-2">আপনার পড়ার আগ্রহ মেটাতে বইয়ের বিশাল সম্ভার অন্বেষণ করুন।</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${selectedCategory === 'all' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            সব
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${selectedCategory === category.id ? 'bg-navy-blue text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {category.name}
            </button>
          ))}
        </div>
        {/* Search Bar */}
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="বই বা লেখক খুঁজুন..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-navy-blue bg-white text-gray-800"
          />
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onBuyNow={onBuyNow}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">দুঃখিত, কোনো বই পাওয়া যায়নি।</p>
          <p className="text-gray-400 mt-2">অনুগ্রহ করে আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
        </div>
      )}
    </div>
  );
};

export default AllBooksPage;