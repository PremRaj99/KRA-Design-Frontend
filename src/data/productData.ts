import type { Product } from "@/components/custom/ProductCard";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    category: 'Living Room',
    subCategory: 'Sofas',
    title: 'Mid-Century Velvet Sofa',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    price: 1299,
    discountedPrice: 999,
    discountPercentage: 23,
    rating: 4.8,
    tag: 'Bestseller',
  },
  {
    id: 'p2',
    category: 'Bedroom',
    subCategory: 'Beds',
    title: 'Minimalist Platform Bed',
    image:
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800&auto=format&fit=crop',
    price: 899,
    rating: 4.5,
    tag: 'New Arrival',
  },
  {
    id: 'p3',
    category: 'Decor',
    subCategory: 'Lighting',
    title: 'Ceramic Table Lamp',
    image:
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop',
    price: 149,
    discountedPrice: 119,
    discountPercentage: 20,
    rating: 4.2,
  },
  {
    id: 'p4',
    category: 'Living Room',
    subCategory: 'Tables',
    title: 'Marble Coffee Table',
    image:
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=800&auto=format&fit=crop',
    price: 450,
    discountedPrice: 380,
    discountPercentage: 15,
    rating: 4.9,
    tag: 'Trending',
  },
  {
    id: 'p5',
    category: 'Kitchen',
    subCategory: 'Appliances',
    title: 'Matte Black Espresso Maker',
    image:
      'https://images.unsplash.com/photo-1517246286414-0466498b5849?q=80&w=800&auto=format&fit=crop',
    price: 599,
    rating: 4.7,
  },
  {
    id: 'p6',
    category: 'Decor',
    subCategory: 'Art',
    title: 'Abstract Canvas Art',
    image:
      'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop',
    price: 299,
    discountedPrice: 199,
    discountPercentage: 33,
    rating: 5.0,
    tag: 'Limited Edition',
  },
  {
    id: 'p7',
    category: 'Bedroom',
    subCategory: 'Bedding',
    title: 'Linen Duvet Cover Set',
    image:
      'https://images.unsplash.com/photo-1522771731478-4eb4f940a6b2?q=80&w=800&auto=format&fit=crop',
    price: 180,
    rating: 4.6,
  },
  {
    id: 'p8',
    category: 'Kitchen',
    subCategory: 'Dining',
    title: 'Ceramic Dining Set',
    image:
      'https://images.unsplash.com/photo-1616486028080-60b540f2f7d5?q=80&w=800&auto=format&fit=crop',
    price: 220,
    rating: 4.1,
  },
];