import React, { useState, useEffect } from 'react';
import type { Book, Category, Order, View, ContactInfo, PrivacyPolicyContent } from './types';
import { books as mockBooks, categories as mockCategories, orders as mockOrders } from './data/mockData';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AllBooksPage from './components/AllBooksPage';
import BookDetailPage from './components/BookDetailPage';
import ContactPage from './components/ContactPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';
import OrderModal from './components/OrderModal';
import BookEditModal from './components/BookEditModal';


const initialContactInfo: ContactInfo = {
    addressLines: ["আয়ান বুক স্টোর", "১২৩ বাংলাবাজার", "ঢাকা, বাংলাদেশ"],
    email: "themarufkhan.data@gmail.com",
    phone: "+8801739115752",
    hours: "শনি - বৃহস্পতি, সকাল ১০টা - রাত ৮টা",
};

const initialPrivacyPolicy: PrivacyPolicyContent = {
    title: "গোপনীয়তা নীতি",
    lastUpdated: "অক্টোবর ২৬, ২০২৩",
    sections: [
        { title: "তথ্য সংগ্রহ", content: "আমরা আপনার অর্ডার প্রক্রিয়া করার জন্য নাম, ঠিকানা, এবং ফোন নম্বরের মতো ব্যক্তিগত তথ্য সংগ্রহ করি।" },
        { title: "তথ্যের ব্যবহার", content: "আপনার তথ্য শুধুমাত্র অর্ডার পূরণ এবং গ্রাহক পরিষেবা প্রদানের জন্য ব্যবহার করা হয়। আমরা তৃতীয় পক্ষের কাছে আপনার তথ্য বিক্রয় বা শেয়ার করি না।" },
        { title: "নিরাপত্তা", content: "আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখতে আমরা শিল্প-মানের নিরাপত্তা ব্যবস্থা ব্যবহার করি।" },
        { title: "যোগাযোগ", content: "গোপনীয়তা নীতি সম্পর্কে আপনার কোনো প্রশ্ন থাকলে, অনুগ্রহ করে themarufkhan.data@gmail.com এ আমাদের সাথে যোগাযোগ করুন।" },
    ],
};

const getInitialView = (): View => {
    const hash = window.location.hash.substring(1);
    // Valid views that can be accessed via hash
    const validViews: View[] = ['home', 'allBooks', 'contact', 'privacy', 'admin'];
    if (validViews.includes(hash as View)) {
        return hash as View;
    }
    return 'home';
};


const App: React.FC = () => {
    const [view, setView] = useState<View>(getInitialView());
    const [books, setBooks] = useState<Book[]>(mockBooks);
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [categories] = useState<Category[]>(mockCategories);
    
    const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo);
    const [privacyPolicy, setPrivacyPolicy] = useState<PrivacyPolicyContent>(initialPrivacyPolicy);

    const [selectedBookForOrder, setSelectedBookForOrder] = useState<Book | null>(null);
    const [selectedBookForDetail, setSelectedBookForDetail] = useState<Book | null>(null);
    const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isBookEditModalOpen, setIsBookEditModalOpen] = useState(false);
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Update hash to reflect view changes, except for admin to keep it private
        if(view !== 'admin' && view !== 'bookDetail'){
             window.location.hash = view;
        }
    }, [view]);

    const handleNavigate = (newView: View) => {
        setView(newView);
    };

    const handleViewDetails = (book: Book | Partial<Book>) => {
        let fullBook = books.find(b => b.id === book.id);
        
        if (!fullBook && book.title && book.author) {
            const tempBook: Book = {
                id: book.id ?? Date.now(),
                title: book.title,
                author: book.author,
                price: book.price ?? 500,
                coverImage: book.coverImage ?? `https://picsum.photos/seed/${encodeURIComponent(book.title)}/400/600`,
                description: book.description ?? 'বিস্তারিত তথ্য শীঘ্রই যোগ করা হবে।',
                genre: book.genre ?? 'সুপারিশকৃত',
                tagline: book.tagline ?? 'একটি আকর্ষণীয় বই।',
                language: book.language ?? 'বাংলা',
                publisher: book.publisher ?? 'বিভিন্ন',
                isFeatured: book.isFeatured ?? false
            };
            setBooks(prev => [...prev, tempBook]);
            fullBook = tempBook;
        }

        if (fullBook) {
            setSelectedBookForDetail(fullBook);
            setView('bookDetail');
        } else {
            alert(`দুঃখিত, "${book.title}" বইটির বিস্তারিত তথ্য এই মুহূর্তে পাওয়া যাচ্ছে না।`);
        }
    };
    
    const handleBuyNow = (book: Book | Partial<Book>) => {
        let fullBook = books.find(b => b.id === book.id);
        if (!fullBook && book.title && book.author) {
             const tempBook: Book = {
                id: book.id ?? Date.now(),
                title: book.title,
                author: book.author,
                price: book.price ?? 500,
                coverImage: book.coverImage ?? `https://picsum.photos/seed/${encodeURIComponent(book.title)}/400/600`,
                description: book.description ?? 'বিস্তারিত তথ্য শীঘ্রই যোগ করা হবে।',
                genre: book.genre ?? 'সুপারিশকৃত',
                tagline: book.tagline ?? 'একটি আকর্ষণীয় বই।',
                language: book.language ?? 'বাংলা',
                publisher: book.publisher ?? 'বিভিন্ন',
                isFeatured: book.isFeatured ?? false
            };
            setBooks(prev => [...prev, tempBook]);
            fullBook = tempBook;
        }

        if(fullBook){
            setSelectedBookForOrder(fullBook);
            setIsOrderModalOpen(true);
        } else {
             alert(`দুঃখিত, "${book.title}" বইটি এই মুহূর্তে কেনা যাচ্ছে না।`);
        }
    };

    const handleOrderSubmit = (orderData: Omit<Order, 'id' | 'status' | 'date'>) => {
        const newOrder: Order = {
            ...orderData,
            id: `ORD-${String(Date.now()).slice(-4)}`,
            status: 'প্রক্রিয়াধীন',
            date: new Date().toISOString().split('T')[0],
        };
        setOrders(prev => [newOrder, ...prev]);
    };

    const handleLogin = (username: string, password: string): boolean => {
        if (username === 'themarufkhancreation' && password === 'ayanstore$') {
            setIsAuthenticated(true);
            setView('admin');
            return true;
        }
        return false;
    };
    
    const handleLogout = () => {
        setIsAuthenticated(false);
        setView('home');
    }

    const handleAddBook = () => {
        setBookToEdit(null);
        setIsBookEditModalOpen(true);
    };

    const handleEditBook = (book: Book) => {
        setBookToEdit(book);
        setIsBookEditModalOpen(true);
    };

    const handleDeleteBook = (bookId: number) => {
        if(window.confirm("আপনি কি নিশ্চিতভাবে এই বইটি ডিলিট করতে চান?")) {
            setBooks(prev => prev.filter(b => b.id !== bookId));
        }
    };

    const handleSaveBook = (bookData: Omit<Book, 'id'> | Book) => {
        if ('id' in bookData) {
            setBooks(prev => prev.map(b => b.id === bookData.id ? bookData : b));
        } else {
            const newBook: Book = { ...bookData, id: Date.now() };
            setBooks(prev => [newBook, ...prev]);
        }
        setIsBookEditModalOpen(false);
        setBookToEdit(null);
    };

    const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders(prev => prev.map(o => o.id === orderId ? {...o, status} : o));
    };

    const handleDeleteOrder = (orderId: string) => {
        if(window.confirm("আপনি কি নিশ্চিতভাবে এই অর্ডারটি ডিলিট করতে চান?")) {
            setOrders(prev => prev.filter(o => o.id !== orderId));
        }
    };

    const renderContent = () => {
        if (view === 'admin') {
            return isAuthenticated ? 
                <AdminDashboard 
                    books={books} 
                    orders={orders} 
                    contactInfo={contactInfo}
                    privacyPolicy={privacyPolicy}
                    onAddBook={handleAddBook} 
                    onEditBook={handleEditBook} 
                    onDeleteBook={handleDeleteBook} 
                    onUpdateOrderStatus={handleUpdateOrderStatus}
                    onDeleteOrder={handleDeleteOrder}
                    onSaveContactInfo={setContactInfo}
                    onSavePrivacyPolicy={setPrivacyPolicy}
                    onLogout={handleLogout} 
                /> : 
                <LoginPage onLogin={handleLogin} />;
        }
        
        switch (view) {
            case 'home':
                return <HomePage books={books} onViewAllBooks={() => setView('allBooks')} onBuyNow={handleBuyNow} onViewDetails={handleViewDetails} />;
            case 'allBooks':
                return <AllBooksPage books={books} categories={categories} onBuyNow={handleBuyNow} onViewDetails={handleViewDetails}/>;
            case 'bookDetail':
                return selectedBookForDetail ? <BookDetailPage book={selectedBookForDetail} onBuyNowClick={handleBuyNow} onViewDetails={handleViewDetails} /> : <HomePage books={books} onViewAllBooks={() => setView('allBooks')} onBuyNow={handleBuyNow} onViewDetails={handleViewDetails} />;
            case 'contact':
                return <ContactPage info={contactInfo} />;
            case 'privacy':
                return <PrivacyPolicyPage content={privacyPolicy} />;
            default:
                return <HomePage books={books} onViewAllBooks={() => setView('allBooks')} onBuyNow={handleBuyNow} onViewDetails={handleViewDetails} />;
        }
    };

    return (
        <div className="bg-off-white font-body text-gray-800 min-h-screen flex flex-col">
            <Header onNavigate={handleNavigate} />
            <main className="flex-grow">
                {renderContent()}
            </main>
            <Footer onNavigate={handleNavigate} />

            {isOrderModalOpen && (
                <OrderModal
                    isOpen={isOrderModalOpen}
                    onClose={() => setIsOrderModalOpen(false)}
                    book={selectedBookForOrder}
                    onSubmit={handleOrderSubmit}
                />
            )}

            {isBookEditModalOpen && (
                <BookEditModal
                    isOpen={isBookEditModalOpen}
                    onClose={() => setIsBookEditModalOpen(false)}
                    book={bookToEdit}
                    onSave={handleSaveBook}
                    categories={categories}
                />
            )}
        </div>
    );
};

export default App;