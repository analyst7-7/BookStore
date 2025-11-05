import React, { useState, useMemo } from 'react';
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

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'books' | 'pages'>('orders');

  // State for Orders filters
  const [orderSearchTerm, setOrderSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');

  const filteredOrders = useMemo(() => {
    return props.orders.filter(order => {
      const searchMatch = order.customerName.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
                          order.bookTitle.toLowerCase().includes(orderSearchTerm.toLowerCase());
      const statusMatch = statusFilter === 'all' || order.status === statusFilter;
      return searchMatch && statusMatch;
    });
  }, [props.orders, orderSearchTerm, statusFilter]);

  // State for Pages CMS
  const [editableContactInfo, setEditableContactInfo] = useState(props.contactInfo);
  const [editablePolicy, setEditablePolicy] = useState(props.privacyPolicy);

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "addressLines") {
        setEditableContactInfo(prev => ({...prev, addressLines: value.split('\n')}));
    } else {
        setEditableContactInfo(prev => ({...prev, [name]: value}));
    }
  };

  const handlePolicySectionChange = (index: number, field: 'title' | 'content', value: string) => {
    const updatedSections = [...editablePolicy.sections];
    updatedSections[index] = {...updatedSections[index], [field]: value};
    setEditablePolicy(prev => ({...prev, sections: updatedSections}));
  }

  const handleSavePages = () => {
    props.onSaveContactInfo(editableContactInfo);
    props.onSavePrivacyPolicy(editablePolicy);
    alert("Page content saved!");
  }


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-heading text-navy-blue">অ্যাডমিন ড্যাশবোর্ড</h1>
        <button onClick={props.onLogout} className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition-colors">
          লগ আউট
        </button>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button onClick={() => setActiveTab('orders')} className={`${activeTab === 'orders' ? 'border-navy-blue text-navy-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>অর্ডার</button>
          <button onClick={() => setActiveTab('books')} className={`${activeTab === 'books' ? 'border-navy-blue text-navy-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>বই</button>
          <button onClick={() => setActiveTab('pages')} className={`${activeTab === 'pages' ? 'border-navy-blue text-navy-blue' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>পেইজ</button>
        </nav>
      </div>

      {activeTab === 'orders' && (
        <div>
          <h2 className="text-2xl font-bold font-heading text-navy-blue mb-4">অর্ডার ম্যানেজমেন্ট</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <input type="text" placeholder="ক্রেতা বা বই খুঁজুন..." value={orderSearchTerm} onChange={e => setOrderSearchTerm(e.target.value)} className="p-2 border rounded bg-white text-gray-800"/>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className="p-2 border rounded bg-white text-gray-800">
                  <option value="all">সকল স্ট্যাটাস</option>
                  <option value="প্রক্রিয়াধীন">প্রক্রিয়াধীন</option>
                  <option value="ডেলিভারি হয়েছে">ডেলিভারি হয়েছে</option>
                  <option value="বাতিল হয়েছে">বাতিল হয়েছে</option>
              </select>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">তারিখ</th>
                  <th scope="col" className="px-6 py-3">ক্রেতা</th>
                  <th scope="col" className="px-6 py-3">ফোন ও ঠিকানা</th>
                  <th scope="col" className="px-6 py-3">বই</th>
                  <th scope="col" className="px-6 py-3">স্ট্যাটাস</th>
                  <th scope="col" className="px-6 py-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">{order.customerName}</td>
                    <td className="px-6 py-4">{order.phone}<br/>{order.address}</td>
                    <td className="px-6 py-4">{order.bookTitle}</td>
                    <td className="px-6 py-4">
                      <select value={order.status} onChange={(e) => props.onUpdateOrderStatus(order.id, e.target.value as Order['status'])} className={`text-xs font-semibold border-none rounded-md p-2 focus:ring-0 ${order.status === 'ডেলিভারি হয়েছে' ? 'bg-green-100 text-green-800' : order.status === 'প্রক্রিয়াধীন' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          <option value="প্রক্রিয়াধীন">প্রক্রিয়াধীন</option>
                          <option value="ডেলিভারি হয়েছে">ডেলিভারি হয়েছে</option>
                          <option value="বাতিল হয়েছে">বাতিল হয়েছে</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                       <button onClick={() => props.onDeleteOrder(order.id)} className="font-medium text-red-600 hover:underline">ডিলিট</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'books' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-heading text-navy-blue">বই ম্যানেজমেন্ট</h2>
            <button onClick={props.onAddBook} className="bg-soft-gold text-navy-blue font-bold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors">নতুন বই যোগ করুন</button>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
               <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">শিরোনাম</th>
                  <th scope="col" className="px-6 py-3">লেখক</th>
                  <th scope="col" className="px-6 py-3">মূল্য</th>
                  <th scope="col" className="px-6 py-3">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {props.books.map(book => (
                  <tr key={book.id} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{book.title}</th>
                    <td className="px-6 py-4">{book.author}</td>
                    <td className="px-6 py-4">৳{book.price}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button onClick={() => props.onEditBook(book)} className="font-medium text-blue-600 hover:underline">এডিট</button>
                      <button onClick={() => props.onDeleteBook(book.id)} className="font-medium text-red-600 hover:underline">ডিলিট</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'pages' && (
        <div>
          <div className="flex justify-between items-center mb-4">
             <h2 className="text-2xl font-bold font-heading text-navy-blue">পেইজ কন্টেন্ট ম্যানেজমেন্ট</h2>
             <button onClick={handleSavePages} className="bg-soft-gold text-navy-blue font-bold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors">পরিবর্তন সেভ করুন</button>
          </div>
          <div className="space-y-8">
            {/* Contact Page Editor */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-navy-blue mb-4">যোগাযোগ পেইজ</h3>
                <div className="space-y-4">
                    <div><label className="block text-sm font-medium">ঠিকানা (প্রতি লাইনে একটি)</label><textarea name="addressLines" value={editableContactInfo.addressLines.join('\n')} onChange={handleContactInfoChange} rows={3} className="w-full border p-2 rounded bg-white text-gray-800"/></div>
                    <div><label className="block text-sm font-medium">ইমেইল</label><input name="email" value={editableContactInfo.email} onChange={handleContactInfoChange} className="w-full border p-2 rounded bg-white text-gray-800"/></div>
                    <div><label className="block text-sm font-medium">ফোন</label><input name="phone" value={editableContactInfo.phone} onChange={handleContactInfoChange} className="w-full border p-2 rounded bg-white text-gray-800"/></div>
                    <div><label className="block text-sm font-medium">কার্যক্রমের সময়</label><input name="hours" value={editableContactInfo.hours} onChange={handleContactInfoChange} className="w-full border p-2 rounded bg-white text-gray-800"/></div>
                </div>
            </div>
            {/* Privacy Policy Editor */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-navy-blue mb-4">প্রাইভেসি পলিসি পেইজ</h3>
                <div className="space-y-4">
                  {editablePolicy.sections.map((section, index) => (
                    <div key={index} className="p-3 border rounded">
                      <label className="block text-sm font-medium">শাখার শিরোনাম</label>
                      <input value={section.title} onChange={(e) => handlePolicySectionChange(index, 'title', e.target.value)} className="w-full border p-2 rounded mb-2 bg-white text-gray-800"/>
                      <label className="block text-sm font-medium">শাখার বিষয়বস্তু</label>
                      <textarea value={section.content} onChange={(e) => handlePolicySectionChange(index, 'content', e.target.value)} rows={4} className="w-full border p-2 rounded bg-white text-gray-800"/>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;