import React, { useState, useEffect } from 'react';
import type { Book, Category } from '../types';
import { CloseIcon } from './Icons';

interface BookEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onSave: (bookData: Omit<Book, 'id'> | Book) => void;
  categories: Category[];
}

const BookEditModal: React.FC<BookEditModalProps> = ({ isOpen, onClose, book, onSave, categories }) => {
  const [formData, setFormData] = useState<Omit<Book, 'id'>>({
    title: '', author: '', price: 0, coverImage: '', description: '', genre: categories[0]?.name || '', tagline: '', language: 'বাংলা', publisher: '', isFeatured: false
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    } else {
      // Reset for new book
      setFormData({
        title: '', author: '', price: 0, coverImage: '', description: '', genre: categories[0]?.name || '', tagline: '', language: 'বাংলা', publisher: '', isFeatured: false
      });
    }
  }, [book, isOpen, categories]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (book) {
        onSave({ ...formData, id: book.id });
    } else {
        onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-navy-blue">{book ? 'বই এডিট করুন' : 'নতুন বই যোগ করুন'}</h2>
          <button onClick={onClose}><CloseIcon /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm">শিরোনাম</label><input name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded bg-white text-gray-800" required /></div>
                <div><label className="block text-sm">লেখক</label><input name="author" value={formData.author} onChange={handleChange} className="w-full border p-2 rounded bg-white text-gray-800" required /></div>
                <div><label className="block text-sm">মূল্য</label><input name="price" type="number" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded bg-white text-gray-800" required /></div>
                <div><label className="block text-sm">ধরণ</label><select name="genre" value={formData.genre} onChange={handleChange} className="w-full border p-2 rounded bg-white text-gray-800">{categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select></div>
            </div>
            <div><label className="block text-sm">কভার ছবি URL</label><input name="coverImage" value={formData.coverImage} onChange={handleChange} className="w-full border p-2 rounded bg-white text-gray-800" required /></div>
            <div><label className="block text-sm">ট্যাগলাইন</label><input name="tagline" value={formData.tagline} onChange={handleChange} className="w-full border p-2 rounded bg-white text-gray-800" /></div>
            <div><label className="block text-sm">সারসংক্ষেপ</label><textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full border p-2 rounded bg-white text-gray-800" required></textarea></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm">ভাষা</label><input name="language" value={formData.language} onChange={handleChange} className="w-full border p-2 rounded bg-white text-gray-800" /></div>
                <div><label className="block text-sm">প্রকাশক</label><input name="publisher" value={formData.publisher} onChange={handleChange} className="w-full border p-2 rounded bg-white text-gray-800" /></div>
            </div>
             <div className="flex items-center">
                <input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="h-4 w-4 text-navy-blue focus:ring-navy-blue border-gray-300 rounded" />
                <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">বিশেষ বই হিসেবে দেখান</label>
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded">বাতিল করুন</button>
              <button type="submit" className="bg-soft-gold text-navy-blue font-bold py-2 px-4 rounded">সংরক্ষণ করুন</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default BookEditModal;