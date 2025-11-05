import React, { useState } from 'react';
import type { ContactInfo } from '../types';

interface ContactPageProps {
  info: ContactInfo;
}

const ContactPage: React.FC<ContactPageProps> = ({ info }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formState.name) newErrors.name = "নাম প্রয়োজন।";
    if (!formState.email) {
      newErrors.email = "ইমেইল প্রয়োজন।";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "সঠিক ইমেইল দিন।";
    }
    if (!formState.message) newErrors.message = "বার্তা প্রয়োজন।";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
        console.log("Form Submitted:", formState);
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold font-heading text-navy-blue">যোগাযোগ করুন</h1>
        <p className="mt-4 text-lg text-gray-600">
          যেকোনো প্রশ্ন, পরামর্শ বা সহায়তার জন্য আমাদের সাথে যোগাযোগ করতে দ্বিধা করবেন না।
        </p>
      </div>

      <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
          <div>
            <h2 className="text-2xl font-bold font-heading text-navy-blue mb-2">আমাদের ঠিকানা</h2>
            {info.addressLines.map((line, index) => (
              <p key={index} className="text-gray-700">{line}</p>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading text-navy-blue mb-2">যোগাযোগের তথ্য</h2>
            <p className="text-gray-700"><strong>ইমেইল:</strong> {info.email}</p>
            <p className="text-gray-700 mt-2"><strong>ফোন:</strong> {info.phone}</p>
            <p className="text-gray-500 mt-2 text-sm">({info.hours})</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
            {isSubmitted ? (
                <div className="text-center py-10">
                    <h2 className="text-2xl font-bold text-navy-blue">ধন্যবাদ!</h2>
                    <p className="text-gray-600 mt-2">আপনার বার্তা পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} noValidate>
                    <h2 className="text-2xl font-bold font-heading text-navy-blue mb-4">একটি বার্তা পাঠান</h2>
                    <div className="mb-4">
                        <label htmlFor="name" className={`block text-sm font-medium mb-1 ${errors.name ? 'text-red-600' : 'text-gray-700'}`}>আপনার নাম</label>
                        <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white text-gray-800 ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-navy-blue'}`} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                     <div className="mb-4">
                        <label htmlFor="email" className={`block text-sm font-medium mb-1 ${errors.email ? 'text-red-600' : 'text-gray-700'}`}>আপনার ইমেইল</label>
                        <input type="email" name="email" id="email" value={formState.email} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white text-gray-800 ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-navy-blue'}`} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                     <div className="mb-4">
                        <label htmlFor="message" className={`block text-sm font-medium mb-1 ${errors.message ? 'text-red-600' : 'text-gray-700'}`}>আপনার বার্তা</label>
                        <textarea name="message" id="message" value={formState.message} onChange={handleChange} rows={4} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white text-gray-800 ${errors.message ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-navy-blue'}`}></textarea>
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" className="w-full bg-soft-gold text-navy-blue font-bold py-3 rounded-md hover:bg-yellow-400 transition-colors">বার্তা পাঠান</button>
                </form>
            )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;