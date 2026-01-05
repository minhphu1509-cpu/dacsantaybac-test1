import { Product, SiteConfig, BlogPost, Customer, Ticket, Review } from './types';

export const INITIAL_CONFIG: SiteConfig = {
  phone: "0987654321",
  email: "lienhe@dacsan-taybac.vn",
  address: "Sapa, Lào Cai, Việt Nam",
  website: "dacsan-taybac.vn",
  social: {
    facebook: "facebook.com/dacsantaybac",
    youtube: "youtube.com/dacsantaybac",
    tiktok: "tiktok.com/@taybacfood",
    zalo: "zalo.me/0987654321"
  }
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Thịt Trâu Gác Bếp Sơn La",
    price: 850000,
    category: "Thịt Khô",
    image: "https://picsum.photos/400/400?random=1",
    description: "Thịt trâu tươi được tẩm ướp gia vị mắc khén, hạt dổi đặc trưng, hun khói tự nhiên.",
    rating: 4.8,
    sold: 1200,
    featured: true
  },
  {
    id: "p2",
    name: "Mật Ong Rừng Mù Cang Chải",
    price: 450000,
    category: "Đồ Ngọt",
    image: "https://picsum.photos/400/400?random=2",
    description: "Mật ong rừng nguyên chất, thu hoạch thủ công từ rừng già.",
    rating: 5.0,
    sold: 540,
    featured: true
  },
  {
    id: "p3",
    name: "Gạo Séng Cù Mường Khương",
    price: 35000,
    category: "Gạo & Ngũ Cốc",
    image: "https://picsum.photos/400/400?random=3",
    description: "Hạt gạo dài, trong, cơm thơm dẻo, đậm vị núi rừng.",
    rating: 4.7,
    sold: 2300,
    featured: false
  },
  {
    id: "p4",
    name: "Chẩm Chéo Khô",
    price: 50000,
    category: "Gia Vị",
    image: "https://picsum.photos/400/400?random=4",
    description: "Gia vị chấm truyền thống không thể thiếu cho các món nướng, luộc.",
    rating: 4.9,
    sold: 5000,
    featured: true
  },
  {
    id: "p5",
    name: "Nấm Hương Rừng Sapa",
    price: 380000,
    category: "Đồ Khô",
    image: "https://picsum.photos/400/400?random=5",
    description: "Nấm hương rừng cánh nhỏ, mùi thơm ngào ngạt đặc trưng.",
    rating: 4.6,
    sold: 890,
    featured: false
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "b1",
    title: "Cách chọn thịt trâu gác bếp chuẩn vị",
    excerpt: "Hướng dẫn phân biệt thịt trâu gác bếp thật và giả, cách bảo quản...",
    content: "Nội dung chi tiết về cách chọn thịt trâu...",
    author: "Lò Văn Páo",
    date: "2023-10-15",
    image: "https://picsum.photos/800/400?random=10"
  },
  {
    id: "b2",
    title: "Mùa lúa chín Mù Cang Chải",
    excerpt: "Vẻ đẹp ngỡ ngàng của ruộng bậc thang vào mùa gặt...",
    content: "Nội dung bài viết du lịch...",
    author: "Nguyễn Lan",
    date: "2023-09-20",
    image: "https://picsum.photos/800/400?random=11"
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: "c1", name: "Nguyễn Văn A", phone: "0909090909", source: "Order", status: "Customer", lastInteraction: "2023-10-25", totalSpent: 1500000 },
  { id: "c2", name: "Trần Thị B", phone: "0912345678", source: "Chatbot", status: "Lead", lastInteraction: "2023-10-26", totalSpent: 0 },
];

export const INITIAL_TICKETS: Ticket[] = [
  { id: "t1", customerId: "c1", customerName: "Nguyễn Văn A", subject: "Hỏi về cách bảo quản mật ong", status: "Open", priority: "Medium", date: "2023-10-26" }
];

export const INITIAL_REVIEWS: Review[] = [
  { id: "r1", user: "Nguyễn Văn A", productId: "p1", rating: 5, comment: "Thịt rất thơm, ngon hơn siêu thị nhiều!", date: "2023-10-20" }
];
