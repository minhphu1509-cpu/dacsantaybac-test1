export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  sold: number;
  featured?: boolean;
}

export interface SiteConfig {
  phone: string;
  email: string;
  address: string;
  website: string;
  social: {
    facebook: string;
    youtube: string;
    tiktok: string;
    zalo: string;
  };
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  source: 'Chatbot' | 'Form' | 'Order';
  status: 'Lead' | 'Customer' | 'VIP';
  lastInteraction: string;
  totalSpent: number;
}

export interface Ticket {
  id: string;
  customerId: string;
  customerName: string;
  subject: string;
  status: 'Open' | 'Pending' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  date: string;
}

export interface Review {
  id: string;
  user: string;
  productId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}

export interface AppState {
  products: Product[];
  customers: Customer[];
  tickets: Ticket[];
  reviews: Review[];
  orders: Order[];
  siteConfig: SiteConfig;
  cart: CartItem[];
  blogPosts: BlogPost[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateSiteConfig: (config: SiteConfig) => void;
  addCustomer: (customer: Customer) => void;
  addTicket: (ticket: Ticket) => void;
  addOrder: (order: Order) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}