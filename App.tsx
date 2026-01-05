import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppState, Product, Customer, Ticket, SiteConfig, CartItem, BlogPost, Order } from './types';
import { INITIAL_PRODUCTS, INITIAL_CONFIG, INITIAL_CUSTOMERS, INITIAL_TICKETS, INITIAL_BLOGS, INITIAL_REVIEWS } from './constants';
import { Chatbot } from './components/Chatbot';
import { HomePage, ProductListPage, ProductDetailPage, ContactPage, CartPage, BlogPage, BlogDetailPage, AboutPage } from './pages/PublicPages';
import { AdminDashboard, AdminCMS, AdminCRM } from './pages/AdminPages';
import { ShoppingCart, Menu, X, LayoutDashboard, Settings, Users, LogOut } from 'lucide-react';

// --- Global State ---
const StoreContext = createContext<AppState | null>(null);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const addToCart = (product: Product) => {
    setCart(prev => {
        const exist = prev.find(i => i.id === product.id);
        if (exist) return prev.map(i => i.id === product.id ? {...i, quantity: i.quantity + 1} : i);
        return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
      setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const updateProduct = (p: Product) => {
      setProducts(prev => prev.map(item => item.id === p.id ? p : item));
  };

  const addProduct = (p: Product) => {
      setProducts(prev => [p, ...prev]);
  };

  const deleteProduct = (id: string) => {
      setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addOrder = (order: Order) => {
      setOrders(prev => [order, ...prev]);
  };

  return (
    <StoreContext.Provider value={{
      products, customers, tickets, reviews: INITIAL_REVIEWS, siteConfig, cart, blogPosts: INITIAL_BLOGS, orders,
      addToCart, removeFromCart, clearCart, updateSiteConfig: setSiteConfig, 
      addCustomer: (c) => setCustomers(prev => [...prev, c]),
      addTicket: (t) => setTickets(prev => [...prev, t]),
      addOrder,
      updateProduct, addProduct, deleteProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};

// --- Layouts ---
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { cart, siteConfig } = useStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans flex flex-col">
            <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b dark:border-gray-800 shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-brand-700 flex items-center gap-2">
                        <span className="text-3xl">🏔️</span> ĐặcSảnTâyBắc
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 font-medium">
                        <Link to="/" className="hover:text-brand-600 transition">Trang Chủ</Link>
                        <Link to="/products" className="hover:text-brand-600 transition">Sản Phẩm</Link>
                        <Link to="/blog" className="hover:text-brand-600 transition">Blog</Link>
                        <Link to="/contact" className="hover:text-brand-600 transition">Liên Hệ</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link to="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link to="/admin" className="hidden md:block text-xs font-semibold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded">Admin</Link>
                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-900 border-t p-4 space-y-4">
                         <Link to="/" className="block py-2" onClick={() => setIsMenuOpen(false)}>Trang Chủ</Link>
                         <Link to="/products" className="block py-2" onClick={() => setIsMenuOpen(false)}>Sản Phẩm</Link>
                         <Link to="/blog" className="block py-2" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                         <Link to="/contact" className="block py-2" onClick={() => setIsMenuOpen(false)}>Liên Hệ</Link>
                         <Link to="/admin" className="block py-2 text-brand-600" onClick={() => setIsMenuOpen(false)}>Admin Portal</Link>
                    </div>
                )}
            </header>

            <main className="flex-1">
                {children}
            </main>

            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Về Chúng Tôi</h3>
                        <p className="text-sm leading-relaxed">Chuyên cung cấp các đặc sản vùng cao chính gốc, đảm bảo chất lượng và hương vị truyền thống.</p>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Liên Hệ</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Hotline: {siteConfig.phone}</li>
                            <li>Email: {siteConfig.email}</li>
                            <li>Đ/c: {siteConfig.address}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Chính Sách</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Giao hàng & Thanh toán</a></li>
                            <li><a href="#" className="hover:text-white">Đổi trả hàng</a></li>
                            <li><a href="#" className="hover:text-white">Bảo mật thông tin</a></li>
                        </ul>
                    </div>
                    <div>
                         <h3 className="text-white text-lg font-bold mb-4">Kết Nối</h3>
                         <div className="flex gap-4">
                             {siteConfig.social.facebook && <a href={`https://${siteConfig.social.facebook}`} target="_blank" rel="noreferrer" className="hover:text-blue-500">Facebook</a>}
                             {siteConfig.social.tiktok && <a href={`https://${siteConfig.social.tiktok}`} target="_blank" rel="noreferrer" className="hover:text-pink-500">TikTok</a>}
                         </div>
                    </div>
                </div>
                <div className="text-center mt-12 pt-8 border-t border-gray-800 text-sm">
                    © 2023 Đặc Sản Tây Bắc. All rights reserved.
                </div>
            </footer>
            
            <Chatbot />
        </div>
    );
};

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/cms', label: 'Quản lý Sản Phẩm/CMS', icon: Settings },
        { path: '/admin/crm', label: 'Khách Hàng & CSM', icon: Users },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col fixed h-full z-10 hidden md:flex">
                <div className="p-6 border-b dark:border-gray-700">
                    <Link to="/" className="text-xl font-bold text-brand-600">Admin Portal</Link>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map(item => (
                        <Link 
                            key={item.path} 
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                                location.pathname === item.path 
                                ? 'bg-brand-50 text-brand-700 dark:bg-gray-700 dark:text-white' 
                                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                            }`}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t dark:border-gray-700">
                    <Link to="/" className="flex items-center gap-2 text-red-500 font-medium p-2 hover:bg-red-50 rounded">
                        <LogOut size={20}/> Thoát về trang chủ
                    </Link>
                </div>
            </aside>
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/cms" element={<AdminLayout><AdminCMS /></AdminLayout>} />
            <Route path="/admin/crm" element={<AdminLayout><AdminCRM /></AdminLayout>} />
            
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/products" element={<PublicLayout><ProductListPage /></PublicLayout>} />
            <Route path="/products/:id" element={<PublicLayout><ProductDetailPage /></PublicLayout>} />
            <Route path="/cart" element={<PublicLayout><CartPage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
            <Route path="/blog/:id" element={<PublicLayout><BlogDetailPage /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        </Routes>
    )
}

function App() {
  return (
    <StoreProvider>
      <Router>
        <AppRoutes />
      </Router>
    </StoreProvider>
  );
}

export default App;