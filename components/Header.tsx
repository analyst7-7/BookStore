import React, { useState } from 'react';
import { MenuIcon, CloseIcon } from './Icons';

interface HeaderProps {
    onNavigate: (view: 'home' | 'allBooks' | 'contact') => void;
}

const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <button onClick={onClick} className="text-gray-600 hover:text-navy-blue transition-colors duration-200">{children}</button>
);

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNav = (view: 'home' | 'allBooks' | 'contact') => {
        onNavigate(view);
        setIsMenuOpen(false);
    }

    return (
        <header className="bg-off-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <button onClick={() => handleNav('home')} className="text-3xl font-bold font-heading text-navy-blue">
                            আয়ান বুক স্টোর
                        </button>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLink onClick={() => handleNav('home')}>হোম</NavLink>
                        <NavLink onClick={() => handleNav('allBooks')}>সকল বই</NavLink>
                        <NavLink onClick={() => handleNav('contact')}>যোগাযোগ</NavLink>
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-off-white pb-4">
                    <nav className="flex flex-col items-center space-y-4">
                        <NavLink onClick={() => handleNav('home')}>হোম</NavLink>
                        <NavLink onClick={() => handleNav('allBooks')}>সকল বই</NavLink>
                        <NavLink onClick={() => handleNav('contact')}>যোগাযোগ</NavLink>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;