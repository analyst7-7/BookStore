// Fix: Provide full content for components/AdminDashboard.tsx
import React, { useState } from 'react';
import type { Book, Order, Category } from '../types';
import BookEditModal from './BookEditModal';

interface AdminDashboardProps {
  books: Book[];
  orders: Order[];
  categories: Category[];
  onSaveBook: (book: Omit<Book, 'id'> | Book) => void;
  onDeleteBook: (bookId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ books, orders, categories, onSaveBook, onDeleteBook, onUpdateOrderStatus, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'books' | 'orders'>('books');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleAddNewBook = () => {
    setEditingBook(null);
    setIsEditModalOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setIsEditModalOpen(true);
  };

  const handleSaveBook = (bookData: Omit<Book, 'id'> | Book) => {
    onSaveBook(bookData);
    setIsEditModalOpen(false);
  };

  const handleStatusChange = (orderId: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateOrderStatus(orderId, e.target.value as Order['status']);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-heading text-navy-blue">অ্যাডমিন ড্যাশবোর্ড</h1>
        <button onClick={onLogout} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">লগ আউট</button>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-4">
          <button onClick={() => setActiveTab('books')} className={`py-2 px-4 font-semibold ${activeTab === 'books' ? 'border-b-2 border-navy-blue text-navy-blue' : 'text-gray-500 hover:text-gray-700'}`}>বই ম্যানেজমেন্ট</button>
          <button onClick={() => setActiveTab('orders')} className={`py-2 px-4 font-semibold ${activeTab === 'orders' ? 'border-b-2 border-navy-blue text-navy-blue' : 'text-gray-500 hover:text-gray-700'}`}>অর্ডার ম্যানেজমেন্ট</button>
        </nav>
      </div>

      {activeTab === 'books' && (
        <div>
          <div className="flex justify-end mb-4">
            <button onClick={handleAddNewBook} className="bg-soft-gold text-navy-blue font-bold py-2 px-4 rounded">নতুন বই যোগ করুন</button>
          </div>
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">শিরোনাম</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">লেখক</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">মূল্য</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map(book => (
                  <tr key={book.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">৳{book.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEditBook(book)} className="text-indigo-600 hover:text-indigo-900 mr-4">এডিট</button>
                      <button onClick={() => onDeleteBook(book.id)} className="text-red-600 hover:text-red-900">ডিলিট</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">অর্ডার আইডি</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">বইয়ের নাম</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ক্রেতা</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ঠিকানা</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.bookTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName} ({order.phone})</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                     <select value={order.status} onChange={(e) => handleStatusChange(order.id, e)} className="border p-1 rounded bg-white text-gray-800">
                         <option value="Pending">Pending</option>
                         <option value="Shipped">Shipped</option>
                         <option value="Delivered">Delivered</option>
                         <option value="Cancelled">Cancelled</option>
                     </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <BookEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        book={editingBook}
        onSave={handleSaveBook}
        categories={categories}
      />
    </div>
  );
};

export default AdminDashboard;
