import React, { useState } from 'react';
import type { Book, Order, ContactInfo, PrivacyPolicyContent } from '../types';

interface AdminDashboardProps {
  books: Book[];
  orders: Order[];
  contactInfo: ContactInfo;
  privacyPolicy: PrivacyPolicyContent;
  onAddBook: () => void;
  onEditBook: (book: Book) => void;
  onDeleteBook: (bookId: number) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onDeleteOrder: (orderId: string) => void;
  onSaveContactInfo: (info: ContactInfo) => void;
  onSavePrivacyPolicy: (policy: PrivacyPolicyContent) => void;
  onLogout: () => void;
}

type AdminTab = 'books' | 'orders' | 'settings';

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const { 
    books, orders, contactInfo, privacyPolicy,
    onAddBook, onEditBook, onDeleteBook,
    onUpdateOrderStatus, onDeleteOrder,
    onSaveContactInfo, onSavePrivacyPolicy,
    onLogout 
  } = props;
  
  const [activeTab, setActiveTab] = useState<AdminTab>('books');

  const TabButton: React.FC<{ tab: AdminTab; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
        activeTab === tab ? 'bg-white text-navy-blue' : 'bg-navy-blue/80 text-white hover:bg-navy-blue'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-heading text-navy-blue">অ্যাডমিন ড্যাশবোর্ড</h1>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          লগ আউট
        </button>
      </div>

      <div className="bg-gray-200 p-2 rounded-t-lg">
        <TabButton tab="books" label="বই ম্যানেজ করুন" />
        <TabButton tab="orders" label="অর্ডার ম্যানেজ করুন" />
        <TabButton tab="settings" label="সাইট সেটিংস" />
      </div>

      <div className="bg-white p-6 rounded-b-lg shadow-md">
        {activeTab === 'books' && (
          <BooksPanel books={books} onAddBook={onAddBook} onEditBook={onEditBook} onDeleteBook={onDeleteBook} />
        )}
        {activeTab === 'orders' && (
          <OrdersPanel orders={orders} onUpdateStatus={onUpdateOrderStatus} onDeleteOrder={onDeleteOrder} />
        )}
        {activeTab === 'settings' && (
            <SettingsPanel 
                contactInfo={contactInfo}
                privacyPolicy={privacyPolicy}
                onSaveContactInfo={onSaveContactInfo}
                onSavePrivacyPolicy={onSavePrivacyPolicy}
            />
        )}
      </div>
    </div>
  );
};

// Books Panel
const BooksPanel: React.FC<{ books: Book[]; onAddBook: () => void; onEditBook: (book: Book) => void; onDeleteBook: (id: number) => void; }> = ({ books, onAddBook, onEditBook, onDeleteBook }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-navy-blue">বইয়ের তালিকা</h2>
        <button onClick={onAddBook} className="bg-soft-gold text-navy-blue font-bold py-2 px-4 rounded">নতুন বই যোগ করুন</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">শিরোনাম</th>
              <th className="py-2 px-4 border-b text-left">লেখক</th>
              <th className="py-2 px-4 border-b text-left">মূল্য</th>
              <th className="py-2 px-4 border-b text-left">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td className="py-2 px-4 border-b">{book.title}</td>
                <td className="py-2 px-4 border-b">{book.author}</td>
                <td className="py-2 px-4 border-b">৳{book.price}</td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => onEditBook(book)} className="text-blue-600 hover:underline mr-4">এডিট</button>
                  <button onClick={() => onDeleteBook(book.id)} className="text-red-600 hover:underline">ডিলিট</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Orders Panel
const OrdersPanel: React.FC<{ orders: Order[]; onUpdateStatus: (id: string, status: Order['status']) => void; onDeleteOrder: (id: string) => void; }> = ({ orders, onUpdateStatus, onDeleteOrder }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-blue mb-4">অর্ডারসমূহ</h2>
       <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">অর্ডার আইডি</th>
              <th className="py-2 px-4 border-b text-left">ক্রেতা</th>
              <th className="py-2 px-4 border-b text-left">বই</th>
              <th className="py-2 px-4 border-b text-left">স্ট্যাটাস</th>
              <th className="py-2 px-4 border-b text-left">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.customerName}<br/><span className="text-sm text-gray-500">{order.address}</span></td>
                <td className="py-2 px-4 border-b">{order.bookTitle}</td>
                <td className="py-2 px-4 border-b">
                  <select value={order.status} onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])} className="border p-1 rounded bg-white text-gray-800">
                    <option value="প্রক্রিয়াধীন">প্রক্রিয়াধীন</option>
                    <option value="ডেলিভারি হয়েছে">ডেলিভারি হয়েছে</option>
                    <option value="বাতিল হয়েছে">বাতিল হয়েছে</option>
                  </select>
                </td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => onDeleteOrder(order.id)} className="text-red-600 hover:underline">ডিলিট</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Settings Panel
const SettingsPanel: React.FC<{
    contactInfo: ContactInfo;
    privacyPolicy: PrivacyPolicyContent;
    onSaveContactInfo: (info: ContactInfo) => void;
    onSavePrivacyPolicy: (policy: PrivacyPolicyContent) => void;
}> = ({ contactInfo, privacyPolicy, onSaveContactInfo, onSavePrivacyPolicy }) => {
    const [currentContact, setCurrentContact] = useState(contactInfo);
    const [currentPolicy, setCurrentPolicy] = useState(privacyPolicy);

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'addressLines') {
            setCurrentContact(prev => ({ ...prev, addressLines: value.split('\\n') }));
        } else {
            setCurrentContact(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handlePolicyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('section-title-')) {
            const index = parseInt(name.split('-')[2]);
            const newSections = [...currentPolicy.sections];
            newSections[index].title = value;
            setCurrentPolicy(prev => ({...prev, sections: newSections}));
        } else if (name.startsWith('section-content-')) {
             const index = parseInt(name.split('-')[2]);
            const newSections = [...currentPolicy.sections];
            newSections[index].content = value;
            setCurrentPolicy(prev => ({...prev, sections: newSections}));
        } else {
            setCurrentPolicy(prev => ({...prev, [name]: value}));
        }
    };
    
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-navy-blue mb-4">যোগাযোগের তথ্য</h2>
                <div className="space-y-3">
                    <div><label className="block text-sm">ঠিকানা (লাইন আলাদা করতে '\n' ব্যবহার করুন)</label><input name="addressLines" value={currentContact.addressLines.join('\\n')} onChange={handleContactChange} className="w-full border p-2 rounded bg-white text-gray-800" /></div>
                    <div><label className="block text-sm">ইমেইল</label><input name="email" value={currentContact.email} onChange={handleContactChange} className="w-full border p-2 rounded bg-white text-gray-800" /></div>
                    <div><label className="block text-sm">ফোন</label><input name="phone" value={currentContact.phone} onChange={handleContactChange} className="w-full border p-2 rounded bg-white text-gray-800" /></div>
                    <div><label className="block text-sm">কার্যঘন্টা</label><input name="hours" value={currentContact.hours} onChange={handleContactChange} className="w-full border p-2 rounded bg-white text-gray-800" /></div>
                </div>
                 <button onClick={() => onSaveContactInfo(currentContact)} className="mt-4 bg-soft-gold text-navy-blue font-bold py-2 px-4 rounded">যোগাযোগ তথ্য সংরক্ষণ</button>
            </div>
            
            <div className="border-t pt-8">
                 <h2 className="text-2xl font-bold text-navy-blue mb-4">প্রাইভেসি পলিসি</h2>
                 <div className="space-y-3">
                    <div><label className="block text-sm">শিরোনাম</label><input name="title" value={currentPolicy.title} onChange={handlePolicyChange} className="w-full border p-2 rounded bg-white text-gray-800" /></div>
                    <div><label className="block text-sm">শেষ আপডেট</label><input name="lastUpdated" value={currentPolicy.lastUpdated} onChange={handlePolicyChange} className="w-full border p-2 rounded bg-white text-gray-800" /></div>
                    <h3 className="text-lg font-semibold pt-2">সেকশন</h3>
                    {currentPolicy.sections.map((section, index) => (
                        <div key={index} className="p-2 border rounded space-y-2">
                             <div><label className="block text-sm">সেকশন শিরোনাম</label><input name={`section-title-${index}`} value={section.title} onChange={handlePolicyChange} className="w-full border p-1 rounded bg-white text-gray-800" /></div>
                             <div><label className="block text-sm">সেকশন বিষয়বস্তু</label><textarea name={`section-content-${index}`} value={section.content} onChange={handlePolicyChange} rows={3} className="w-full border p-1 rounded bg-white text-gray-800" /></div>
                        </div>
                    ))}
                </div>
                 <button onClick={() => onSavePrivacyPolicy(currentPolicy)} className="mt-4 bg-soft-gold text-navy-blue font-bold py-2 px-4 rounded">পলিসি সংরক্ষণ</button>
            </div>
        </div>
    );
};

export default AdminDashboard;
