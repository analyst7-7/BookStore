import React from 'react';
import type { PrivacyPolicyContent } from '../types';

interface PrivacyPolicyPageProps {
  content: PrivacyPolicyContent;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ content }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold font-heading text-navy-blue text-center">{content.title}</h1>
        <p className="text-center text-gray-500 mt-2 mb-8">সর্বশেষ আপডেট: {content.lastUpdated}</p>
        
        <div className="space-y-6">
          {content.sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold font-heading text-navy-blue mb-2">{section.title}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;