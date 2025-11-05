import React, { useState, useEffect } from 'react';
import type { Book, Order } from '../types';
import { CloseIcon, CheckCircleIcon } from './Icons';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onSubmit: (orderData: Omit<Order, 'id' | 'status' | 'date'>) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, book, onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});

  useEffect(() => {
    if (!isOpen) {
      // Reset form on close
      setTimeout(() => {
        setCustomerName('');
        setPhone('');
        setAddress('');
        setIsSubmitted(false);
        setErrors({});
      }, 300); // Wait for closing animation
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string; address?: string } = {};
    if (!customerName.trim()) newErrors.name = 'নাম প্রয়োজন।';
    if (!phone.trim()) newErrors.phone = 'ফোন নম্বর প্রয়োজন।';
    else if (!/^[0-9\+]+$/.test(phone)) newErrors.phone = 'সঠিক ফোন নম্বর দিন।';
    if (!address.trim()) newErrors.address = 'ঠিকানা প্রয়োজন।';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!book || !validateForm()) return;
    
    onSubmit({
      customerName,
      phone,
      address,
      bookTitle: book.title,
      bookId: book.id,
    });
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onClose();
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
        handleClose();
    }
  };


  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
        onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md relative animate-fade-in-up" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button onClick={handleClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
            <CloseIcon />
        </button>
        
        {isSubmitted ? (
            <div className="p-8 text-center">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold font-heading text-navy-blue mt-4">অর্ডার সম্পন্ন হয়েছে!</h2>
                <p className="text-gray-600 mt-2">আপনার অর্ডার সফলভাবে গৃহীত হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                <button onClick={handleClose} className="mt-6 bg-navy-blue text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors">
                    বন্ধ করুন
                </button>
            </div>
        ) : (
            <div className="p-8">
                <h2 className="text-2xl font-bold font-heading text-navy-blue mb-2">অর্ডার ফর্ম</h2>
                <p className="text-gray-600 mb-4">অর্ডারটি নিশ্চিত করতে অনুগ্রহ করে আপনার বিবরণ দিন।</p>
                
                {book && (
                    <div className="mb-4 p-3 bg-gray-100 rounded-md border">
                        <p className="font-semibold text-navy-blue">{book.title}</p>
                        <p className="text-sm text-gray-600">লেখক: {book.author}</p>
                        <p className="font-bold text-navy-blue mt-1">মূল্য: ৳{book.price}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label htmlFor="name" className={`block text-sm font-medium mb-1 ${errors.name ? 'text-red-600' : 'text-gray-700'}`}>আপনার নাম</label>
                        <input type="text" id="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white text-gray-800 ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-navy-blue'}`} required />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className={`block text-sm font-medium mb-1 ${errors.phone ? 'text-red-600' : 'text-gray-700'}`}>ফোন নম্বর</label>
                        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white text-gray-800 ${errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-navy-blue'}`} required />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className={`block text-sm font-medium mb-1 ${errors.address ? 'text-red-600' : 'text-gray-700'}`}>ডেলিভারি ঠিকানা</label>
                        <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white text-gray-800 ${errors.address ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-navy-blue'}`} required></textarea>
                         {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>
                    <p className="text-xs text-gray-500 mb-4">পেমেন্ট মেথড: ক্যাশ অন ডেলিভারি।</p>
                    <button type="submit" className="w-full bg-soft-gold text-navy-blue font-bold py-3 rounded-md hover:bg-yellow-400 transition-colors">
                        অর্ডার নিশ্চিত করুন
                    </button>
                </form>
            </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;