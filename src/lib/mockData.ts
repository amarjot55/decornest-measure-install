// Mock data for frontend development

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  images: string[];
  materials: string[];
  colors: string[];
  styles: string[];
  customSizingEnabled: boolean;
  minSize?: { width: number; height: number };
  maxSize?: { width: number; height: number };
  stockQuantity: number;
  featured: boolean;
  rating: number;
  reviews: number;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Luxury Persian Floor Mat",
    description: "Handcrafted Persian-style floor mat with intricate geometric patterns. Made from premium materials for durability and comfort.",
    category: "floor-decor",
    basePrice: 2499,
    images: [
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=800&fit=crop"
    ],
    materials: ["Cotton", "Polyester", "Jute"],
    colors: ["Beige", "Brown", "Red", "Blue"],
    styles: ["Traditional", "Classic"],
    customSizingEnabled: true,
    minSize: { width: 100, height: 100 },
    maxSize: { width: 500, height: 500 },
    stockQuantity: 45,
    featured: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: "2",
    name: "Modern Geometric Wallpaper",
    description: "Contemporary geometric wallpaper design perfect for modern spaces. Easy to install and maintain.",
    category: "wall-decor",
    basePrice: 1899,
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1615529162924-f83c3f8f4e60?w=800&h=800&fit=crop"
    ],
    materials: ["Vinyl", "Paper"],
    colors: ["White", "Grey", "Gold"],
    styles: ["Modern", "Minimal"],
    customSizingEnabled: true,
    minSize: { width: 50, height: 100 },
    maxSize: { width: 300, height: 400 },
    stockQuantity: 89,
    featured: true,
    rating: 4.9,
    reviews: 87
  },
  {
    id: "3",
    name: "Premium Artificial Grass",
    description: "Realistic artificial grass for indoor and outdoor use. UV resistant and weather-proof.",
    category: "green-decor",
    basePrice: 3299,
    images: [
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=800&fit=crop"
    ],
    materials: ["Synthetic Fiber"],
    colors: ["Green", "Olive"],
    styles: ["Natural", "Eco-Friendly"],
    customSizingEnabled: true,
    minSize: { width: 100, height: 100 },
    maxSize: { width: 1000, height: 1000 },
    stockQuantity: 34,
    featured: true,
    rating: 4.7,
    reviews: 56
  },
  {
    id: "4",
    name: "Designer LED Wall Lamp",
    description: "Contemporary LED wall lamp with adjustable brightness. Energy efficient and elegant design.",
    category: "lighting",
    basePrice: 1599,
    images: [
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop"
    ],
    materials: ["Metal", "Glass"],
    colors: ["Black", "White", "Gold"],
    styles: ["Modern", "Minimal"],
    customSizingEnabled: false,
    stockQuantity: 67,
    featured: true,
    rating: 4.6,
    reviews: 98
  },
  {
    id: "5",
    name: "Velvet Floor Runner",
    description: "Soft velvet floor runner for hallways and corridors. Anti-slip backing included.",
    category: "floor-decor",
    basePrice: 1799,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop"
    ],
    materials: ["Velvet", "Rubber"],
    colors: ["Navy", "Burgundy", "Grey"],
    styles: ["Luxury", "Modern"],
    customSizingEnabled: true,
    minSize: { width: 60, height: 200 },
    maxSize: { width: 120, height: 600 },
    stockQuantity: 23,
    featured: false,
    rating: 4.5,
    reviews: 34
  },
  {
    id: "6",
    name: "3D Brick Wall Panels",
    description: "Self-adhesive 3D brick wall panels for instant wall transformation. Waterproof and easy to clean.",
    category: "wall-decor",
    basePrice: 2199,
    images: [
      "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=800&h=800&fit=crop"
    ],
    materials: ["PVC", "Foam"],
    colors: ["White", "Grey", "Red"],
    styles: ["Industrial", "Modern"],
    customSizingEnabled: false,
    stockQuantity: 156,
    featured: false,
    rating: 4.4,
    reviews: 67
  },
  {
    id: "7",
    name: "Green Shade Net",
    description: "UV stabilized green shade net for balconies and gardens. Provides 70% shade coverage.",
    category: "green-decor",
    basePrice: 899,
    images: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=800&fit=crop"
    ],
    materials: ["HDPE"],
    colors: ["Green", "Dark Green"],
    styles: ["Functional", "Eco-Friendly"],
    customSizingEnabled: true,
    minSize: { width: 100, height: 100 },
    maxSize: { width: 800, height: 400 },
    stockQuantity: 78,
    featured: false,
    rating: 4.3,
    reviews: 45
  },
  {
    id: "8",
    name: "Smart LED Ceiling Light",
    description: "WiFi-enabled smart LED ceiling light with color changing features. Compatible with Alexa and Google Home.",
    category: "lighting",
    basePrice: 2799,
    images: [
      "https://images.unsplash.com/photo-1534105415428-f0f7a2e6e2e6?w=800&h=800&fit=crop"
    ],
    materials: ["Aluminum", "LED"],
    colors: ["White", "RGB"],
    styles: ["Smart", "Modern"],
    customSizingEnabled: false,
    stockQuantity: 42,
    featured: false,
    rating: 4.7,
    reviews: 89
  }
];

export const categories = [
  { id: "all", name: "All Products", count: mockProducts.length },
  { id: "wall-decor", name: "Wall Décor", count: mockProducts.filter(p => p.category === "wall-decor").length },
  { id: "floor-decor", name: "Floor Décor", count: mockProducts.filter(p => p.category === "floor-decor").length },
  { id: "green-decor", name: "Green Décor", count: mockProducts.filter(p => p.category === "green-decor").length },
  { id: "lighting", name: "Lighting & More", count: mockProducts.filter(p => p.category === "lighting").length }
];

export interface CartItem extends Product {
  quantity: number;
  customSize?: { width: number; height: number };
  totalPrice: number;
}

export interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: CartItem[];
  total: number;
  shippingAddress: string;
  measurementRequested: boolean;
  installationRequested: boolean;
}

export interface LaborBooking {
  id: string;
  orderId: string;
  serviceType: "measurement" | "installation";
  scheduledDate: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  address: string;
  notes: string;
}

export const mockOrders: Order[] = [
  {
    id: "ORD-2025-001",
    date: "2025-01-15",
    status: "delivered",
    items: [
      {
        ...mockProducts[0],
        quantity: 1,
        customSize: { width: 200, height: 300 },
        totalPrice: 2499
      }
    ],
    total: 2499,
    shippingAddress: "123 MG Road, Mumbai, Maharashtra 400001",
    measurementRequested: true,
    installationRequested: true
  },
  {
    id: "ORD-2025-002",
    date: "2025-01-20",
    status: "processing",
    items: [
      {
        ...mockProducts[1],
        quantity: 2,
        totalPrice: 3798
      }
    ],
    total: 3798,
    shippingAddress: "456 Park Street, Kolkata, West Bengal 700016",
    measurementRequested: false,
    installationRequested: true
  }
];

export const mockBookings: LaborBooking[] = [
  {
    id: "BK-001",
    orderId: "ORD-2025-001",
    serviceType: "measurement",
    scheduledDate: "2025-01-18T10:00:00",
    status: "completed",
    address: "123 MG Road, Mumbai, Maharashtra 400001",
    notes: "Please bring measuring tape"
  },
  {
    id: "BK-002",
    orderId: "ORD-2025-002",
    serviceType: "installation",
    scheduledDate: "2025-01-25T14:00:00",
    status: "confirmed",
    address: "456 Park Street, Kolkata, West Bengal 700016",
    notes: "Wall preparation needed"
  }
];
