import React from 'react';

interface FooterProps {
    onNavigate: (view: 'home' | 'allBooks' | 'contact' | 'privacy') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-navy-blue text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-2xl font-bold font-heading">আয়ান বুক স্টোর</h3>
                        <p className="text-gray-400 text-sm">আপনার জ্ঞানের বিশ্বস্ত সঙ্গী</p>
                    </div>
                    <nav className="flex flex-wrap justify-center space-x-6 mb-4 md:mb-0">
                        <button onClick={() => onNavigate('home')} className="hover:text-soft-gold transition-colors">হোম</button>
                        <button onClick={() => onNavigate('allBooks')} className="hover:text-soft-gold transition-colors">সকল বই</button>
                        <button onClick={() => onNavigate('contact')} className="hover:text-soft-gold transition-colors">যোগাযোগ</button>
                        <button onClick={() => onNavigate('privacy')} className="hover:text-soft-gold transition-colors">প্রাইভেসি পলিসি</button>
                    </nav>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} আয়ান বুক স্টোর। সর্বস্বত্ব সংরক্ষিত।</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;