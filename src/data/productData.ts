// --- Mock Data ---
export type MockProduct = {
  id: string;
  title: string;
  price: number;
  discountedPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  subCategory: string;
  tag?: string;
  description: string;
  features: string[];
  dimensions: string;
  care: string;
  images: string[];
  colors: { name: string; hex: string }[];
};

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 'p2',
    title: 'Scandinavian Fabric Armchair',
    price: 699,
    discountedPrice: 549,
    discountPercentage: 21,
    rating: 4.6,
    reviewsCount: 89,
    category: 'Living Room',
    subCategory: 'Chairs',
    tag: 'Popular',
    description:
      'A minimalist Scandinavian armchair designed for comfort and style. Features ergonomic support, breathable fabric upholstery, and solid oak legs.',
    features: [
      'Solid oak wood legs',
      'High-density foam cushioning',
      'Breathable linen fabric',
      'Ergonomic back support',
    ],
    dimensions: '32" W x 30" D x 34" H',
    care: 'Vacuum fabric regularly. Spot clean with mild detergent.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616627454818-8f9d7c59ef0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300053653-8d6c9d4c1c0b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Beige', hex: '#F5F5DC' },
      { name: 'Light Grey', hex: '#D3D3D3' },
      { name: 'Dusty Blue', hex: '#6A8EAE' },
    ],
  },
  {
    id: 'p3',
    title: 'Modern Glass Coffee Table',
    price: 399,
    discountedPrice: 299,
    discountPercentage: 25,
    rating: 4.5,
    reviewsCount: 64,
    category: 'Living Room',
    subCategory: 'Tables',
    tag: 'Trending',
    description:
      'Sleek glass coffee table with a tempered glass top and sturdy metal base, perfect for modern interiors.',
    features: [
      'Tempered safety glass top',
      'Rust-resistant steel frame',
      'Minimalist modern design',
      'Easy assembly',
    ],
    dimensions: '48" W x 24" D x 18" H',
    care: 'Clean glass with a microfiber cloth. Avoid abrasive cleaners.',
    images: [
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300053747-bb1cbb0c44c7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588854337119-9f95e5d8d8dc?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Chrome', hex: '#D3D3D3' },
    ],
  },
  {
    id: 'p4',
    title: 'King Size Platform Bed',
    price: 1599,
    discountedPrice: 1299,
    discountPercentage: 19,
    rating: 4.9,
    reviewsCount: 210,
    category: 'Bedroom',
    subCategory: 'Beds',
    tag: 'Bestseller',
    description:
      'Premium platform bed with upholstered headboard and strong wooden frame designed for durability and luxury.',
    features: [
      'Solid wood frame',
      'Padded fabric headboard',
      'Noise-free construction',
      'No box spring required',
    ],
    dimensions: '78" W x 82" D x 45" H',
    care: 'Dust frame regularly. Spot clean upholstery.',
    images: [
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616627454825-0c5b7a7c3b6d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Dark Grey', hex: '#4F4F4F' },
      { name: 'Cream', hex: '#FFFDD0' },
    ],
  },
  {
    id: 'p5',
    title: 'Industrial Bookshelf Rack',
    price: 499,
    discountedPrice: 379,
    discountPercentage: 24,
    rating: 4.4,
    reviewsCount: 52,
    category: 'Office',
    subCategory: 'Storage',
    tag: 'Hot Deal',
    description:
      'Industrial-style bookshelf with metal frame and wooden shelves for a rustic-modern aesthetic.',
    features: [
      'Powder-coated steel frame',
      'Engineered wood shelves',
      'Anti-tip safety kit',
      'Multi-purpose usage',
    ],
    dimensions: '30" W x 14" D x 72" H',
    care: 'Wipe with dry cloth. Avoid water exposure.',
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582582494700-2c2b9a3f0d3b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592078615343-4e6e8f92f218?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Walnut', hex: '#5D4037' },
      { name: 'Black', hex: '#000000' },
    ],
  },
  {
    id: 'p6',
    title: 'Ergonomic Office Chair',
    price: 899,
    discountedPrice: 699,
    discountPercentage: 22,
    rating: 4.7,
    reviewsCount: 143,
    category: 'Office',
    subCategory: 'Chairs',
    tag: 'Recommended',
    description:
      'Ergonomic office chair with lumbar support, breathable mesh, and adjustable height for long work sessions.',
    features: [
      'Adjustable lumbar support',
      'Breathable mesh back',
      '360-degree swivel',
      'Height adjustable',
    ],
    dimensions: '26" W x 26" D x 45" H',
    care: 'Clean mesh with soft brush. Avoid harsh chemicals.',
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300053741-dc1d98a62d58?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582582429416-2a6b6c8b0c0c?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Grey', hex: '#808080' },
    ],
  },
  {
    id: 'p7',
    title: 'Luxury Dining Table Set',
    price: 1999,
    discountedPrice: 1599,
    discountPercentage: 20,
    rating: 4.8,
    reviewsCount: 97,
    category: 'Dining',
    subCategory: 'Dining Sets',
    tag: 'Premium',
    description:
      'Elegant 6-seater dining table set crafted from solid wood with a polished finish for a luxurious dining experience.',
    features: [
      'Solid wood construction',
      'Comfortable cushioned chairs',
      'Scratch-resistant finish',
      'Seats up to 6 people',
    ],
    dimensions: '72" W x 36" D x 30" H',
    care: 'Wipe with soft cloth. Avoid moisture.',
    images: [
      'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616627454823-4bb2b4d3f2c1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588854337151-9d7d7d5f0fdf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300053711-1f9f7c4e27c7?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Teak', hex: '#8B4513' },
      { name: 'Mahogany', hex: '#C04000' },
    ],
  },
  {
    id: 'p8',
    title: 'Minimalist Wall Shelf',
    price: 199,
    discountedPrice: 149,
    discountPercentage: 25,
    rating: 4.3,
    reviewsCount: 38,
    category: 'Decor',
    subCategory: 'Wall Decor',
    tag: 'Budget Pick',
    description:
      'Simple and elegant wall shelf ideal for displaying decor items, books, or plants.',
    features: [
      'Space-saving design',
      'Strong wall mount support',
      'Lightweight yet durable',
      'Easy installation',
    ],
    dimensions: '24" W x 8" D x 6" H',
    care: 'Dust regularly with dry cloth.',
    images: [
      'https://images.unsplash.com/photo-1588854337082-8a5dcbcf0c3f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300053739-dc2c0c6c9507?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582582429400-5c63b3c2cbb6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300053681-7d3b1c4e4f65?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Oak', hex: '#C19A6B' },
    ],
  },
  {
    id: 'p9',
    title: 'Smart LED Floor Lamp',
    price: 299,
    discountedPrice: 219,
    discountPercentage: 27,
    rating: 4.6,
    reviewsCount: 76,
    category: 'Lighting',
    subCategory: 'Lamps',
    tag: 'New',
    description:
      'Modern smart LED floor lamp with adjustable brightness and app control for ambiance lighting.',
    features: [
      'App and remote control',
      'Energy-efficient LED',
      'Adjustable brightness levels',
      'Minimalist design',
    ],
    dimensions: '10" W x 10" D x 60" H',
    care: 'Wipe with dry cloth. Avoid water.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300053668-ffb61a1d0b8b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582582429327-4c8b4b4c4d0f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300053701-0a4f6c2b2d8f?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
    ],
  },
  {
    id: 'p10',
    title: 'Luxury Memory Foam Mattress',
    price: 1199,
    discountedPrice: 899,
    discountPercentage: 25,
    rating: 4.9,
    reviewsCount: 188,
    category: 'Bedroom',
    subCategory: 'Mattresses',
    tag: 'Top Rated',
    description:
      'Premium memory foam mattress offering superior comfort, pressure relief, and motion isolation.',
    features: [
      'High-density memory foam',
      'Breathable cooling layer',
      'Motion isolation technology',
      'Hypoallergenic materials',
    ],
    dimensions: '78" W x 60" D x 10" H',
    care: 'Use mattress protector. Rotate every 3 months.',
    images: [
      'https://images.unsplash.com/photo-1582582429272-6c8c8c8c8c8c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300053743-9c9d9d9d9d9d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582582429301-4d4d4d4d4d4d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300053755-7c7c7c7c7c7c?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Grey', hex: '#808080' },
    ],
  },
  {
    id: 'p11',
    title: 'Compact Study Desk',
    price: 349,
    discountedPrice: 259,
    discountPercentage: 26,
    rating: 4.4,
    reviewsCount: 61,
    category: 'Office',
    subCategory: 'Desks',
    tag: 'Value',
    description:
      'Compact study desk with modern design, ideal for small spaces and home offices.',
    features: [
      'Space-saving design',
      'Engineered wood top',
      'Strong metal frame',
      'Cable management hole',
    ],
    dimensions: '40" W x 20" D x 30" H',
    care: 'Wipe with dry cloth.',
    images: [
      'https://images.unsplash.com/photo-1598300053725-bc1c1c1c1c1c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582582429330-aaaaaaa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598300053761-bbbbbbb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582582429355-ccccccc?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [
      { name: 'Walnut', hex: '#5D4037' },
      { name: 'Black', hex: '#000000' },
    ],
  }
];