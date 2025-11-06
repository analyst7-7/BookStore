// Fix: Provide full content for components/ContactPage.tsx
import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold font-heading text-navy-blue text-center mb-4">যোগাযোগ করুন</h1>
        <p className="text-center text-gray-600 mb-10">আপনার যেকোনো প্রশ্ন বা মতামতের জন্য আমরা এখানে আছি।</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-navy-blue">ঠিকানা</h3>
              <p className="text-gray-700">১২৩/৪, বুক স্ট্রিট, জ্ঞানপুর, ঢাকা-১২০৫, বাংলাদেশ</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-navy-blue">ফোন</h3>
              <p className="text-gray-700">+৮৮০ ১৭০০ ০০০০০০</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-navy-blue">ইমেইল</h3>
              <p className="text-gray-700">info@ayanbookstore.com</p>
            </div>
             <div>
              <h3 className="text-xl font-semibold text-navy-blue">কার্যক্রমের সময়</h3>
              <p className="text-gray-700">শনিবার - বৃহস্পতিবার: সকাল ১০টা - রাত ৮টা</p>
              <p className="text-gray-700">শুক্রবার: বন্ধ</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">আপনার নাম</label>
              <input type="text" id="name" name="name" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue bg-white text-gray-800" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">আপনার ইমেইল</label>
              <input type="email" id="email" name="email" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue bg-white text-gray-800" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">আপনার বার্তা</label>
              <textarea id="message" name="message" rows={4} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-blue bg-white text-gray-800"></textarea>
            </div>
            <button type="submit" className="w-full bg-soft-gold text-navy-blue font-bold py-3 rounded-md hover:bg-yellow-400 transition-colors">
              বার্তা পাঠান
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
