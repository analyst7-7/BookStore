// Fix: Provide full content for App.tsx
import React, { useState, useEffect } from 'react';
import type { Book, Order, Category } from './types';
import { mockBooks, mockCategories, mockOrders, privacyPolicyContent } from './data/mockData';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AllBooksPage from './components/AllBooksPage';
import BookDetailPage from './components/BookDetailPage';
import ContactPage from './components/ContactPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import OrderModal from './components/OrderModal';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import BookDetailModal from './components/BookDetailModal';

type View = 'home' | 'allBooks' | 'contact' | 'privacy' | 'admin' | 'bookDetail';

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [books, setBooks] = useState<Book[]>(mockBooks);
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [categories] = useState<Category[]>(mockCategories);

    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isBookDetailModalOpen, setIsBookDetailModalOpen] = useState(false);

    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [orderingBook, setOrderingBook] = useState<Book | null>(null);

    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (hash === 'admin') {
                setView('admin');
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);


    const handleNavigate = (newView: any) => { // Changed type to any to accommodate footer's 'privacy'
        window.scrollTo(0, 0);
        setView(newView);
        setSelectedBook(null);
    };
    
    const handleBuyNow = (book: Partial<Book>) => {
        const fullBook = books.find(b => b.id === book.id) || book as Book;
        if(fullBook && fullBook.price) {
            setOrderingBook(fullBook);
            setIsOrderModalOpen(true);
            setIsBookDetailModalOpen(false);
        }
    };
    
    const handleViewDetails = (book: Partial<Book>) => {
        const fullBook = books.find(b => b.id === book.id);
        if (fullBook) {
            setSelectedBook(fullBook);
            if (view === 'allBooks' || view === 'home') {
                 setIsBookDetailModalOpen(true);
            } else {
                 setView('bookDetail');
            }
        } else {
             setSelectedBook(book as Book);
             setIsBookDetailModalOpen(true);
        }
    };
    
    const handleViewDetailsFromPage = (book: Partial<Book>) => {
        const fullBook = books.find(b => b.id === book.id);
        if (fullBook) {
             setSelectedBook(fullBook);
             setView('bookDetail');
             setIsBookDetailModalOpen(false);
        } else {
            // If book details are not in mockBooks (e.g., from Gemini), open modal
            setSelectedBook(book as Book);
            setIsBookDetailModalOpen(true);
            setView('allBooks'); // Fallback to a list view
        }
    }


    const handleOrderSubmit = (orderData: Omit<Order, 'id' | 'status' | 'date'>) => {
        const newOrder: Order = {
            ...orderData,
            id: `order-${Date.now()}`,
            date: new Date().toISOString(),
            status: 'Pending',
        };
        setOrders(prevOrders => [...prevOrders, newOrder]);
    };
    
    const handleLogin = (user: string, pass: string): boolean => {
        if (user === 'admin' && pass === 'password') {
            setIsAdminLoggedIn(true);
            return true;
        }
        return false;
    };
    
    const handleLogout = () => {
        setIsAdminLoggedIn(false);
        setView('home');
        window.location.hash = '';
    }

    const handleSaveBook = (bookData: Omit<Book, 'id'> | Book) => {
        if ('id' in bookData) {
            setBooks(books.map(b => b.id === bookData.id ? bookData : b));
        } else {
            const newBook: Book = { ...bookData, id: `book-${Date.now()}` };
            setBooks([...books, newBook]);
        }
    };

    const handleDeleteBook = (bookId: string) => {
        setBooks(books.filter(b => b.id !== bookId));
    };

    const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    };


    const renderContent = () => {
        if (view === 'admin') {
            if (!isAdminLoggedIn) {
                return <LoginPage onLogin={handleLogin} />;
            }
            return <AdminDashboard 
                books={books} 
                orders={orders} 
                categories={categories}
                onSaveBook={handleSaveBook}
                onDeleteBook={handleDeleteBook}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onLogout={handleLogout}
            />;
        }

        switch (view) {
            case 'home':
                return <HomePage books={books} onViewAllBooks={() => handleNavigate('allBooks')} onBuyNow={handleBuyNow} onViewDetails={handleViewDetails} />;
            case 'allBooks':
                return <AllBooksPage books={books} categories={categories} onBuyNow={handleBuyNow} onViewDetails={handleViewDetails} />;
            case 'bookDetail':
                return selectedBook ? <BookDetailPage book={selectedBook} onBuyNowClick={handleBuyNow} onViewDetails={handleViewDetailsFromPage} /> : <AllBooksPage books={books} categories={categories} onBuyNow={handleBuyNow} onViewDetails={handleViewDetails}/>;
            case 'contact':
                return <ContactPage />;
            case 'privacy':
                return <PrivacyPolicyPage content={privacyPolicyContent} />;
            default:
                return <HomePage books={books} onViewAllBooks={() => handleNavigate('allBooks')} onBuyNow={handleBuyNow} onViewDetails={handleViewDetails}/>;
        }
    };

    return (
        <div className="bg-off-white font-sans text-gray-800">
            {view !== 'admin' || isAdminLoggedIn ? <Header onNavigate={handleNavigate} /> : null}
            
            {renderContent()}

            {view !== 'admin' || isAdminLoggedIn ? <Footer onNavigate={handleNavigate} /> : null}

            {orderingBook && (
                <OrderModal
                    isOpen={isOrderModalOpen}
                    onClose={() => setIsOrderModalOpen(false)}
                    book={orderingBook}
                    onSubmit={handleOrderSubmit}
                />
            )}
            
            {selectedBook && (
                <BookDetailModal
                    isOpen={isBookDetailModalOpen}
                    onClose={() => setIsBookDetailModalOpen(false)}
                    book={selectedBook}
                    onBuyNow={handleBuyNow}
                    onViewDetails={handleViewDetailsFromPage}
                />
            )}
        </div>
    );
};

export default App;
