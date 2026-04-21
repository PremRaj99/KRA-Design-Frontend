import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Minus, Plus, RotateCcw, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { BulkOrderCTA } from '@/components/custom/BulkOrderCTA';
import { ProductCard, type Product } from '@/components/custom/ProductCard'; // Adjust import path as needed
import { Footer } from '@/components/custom/footer';

// --- Mock Data ---
const MOCK_PRODUCT = {
  id: 'p1',
  title: 'Mid-Century Velvet Sofa',
  price: 1299,
  discountedPrice: 999,
  discountPercentage: 23,
  rating: 4.8,
  reviewsCount: 124,
  category: 'Living Room',
  subCategory: 'Sofas',
  tag: 'Bestseller',
  description:
    'Elevate your living space with our signature Mid-Century Velvet Sofa. Featuring clean architectural lines, premium high-density foam cushioning, and upholstered in spill-resistant, ultra-soft performance velvet. Bench-made by master artisans to ensure lasting durability and uncompromising comfort.',
  features: [
    'Kiln-dried hardwood frame with mortise-and-tenon joinery',
    'High-resiliency polyurethane foam core',
    'Spill-resistant luxury performance velvet',
    'Solid brass or matte black tapered legs',
  ],
  dimensions: '84" W x 35" D x 32" H',
  care: 'Vacuum regularly. Blot spills immediately with a clean, colorfast towel. Do not use harsh chemicals or detergents.',
  images: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop', // Main
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop', // Detail 1
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1200&auto=format&fit=crop', // Detail 2
    'https://images.unsplash.com/photo-1540574163026-643ea20d25b5?q=80&w=1200&auto=format&fit=crop', // Detail 3
  ],
  colors: [
    { name: 'Olive Green', hex: '#556B2F' },
    { name: 'Burnt Orange', hex: '#CC5500' },
    { name: 'Navy Blue', hex: '#000080' },
    { name: 'Charcoal', hex: '#36454F' },
  ],
};

const RELATED_PRODUCTS: Product[] = [
  {
    id: 'r1',
    category: 'Decor',
    subCategory: 'Lighting',
    title: 'Ceramic Table Lamp',
    image:
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop',
    price: 149,
    rating: 4.2,
  },
  {
    id: 'r2',
    category: 'Living Room',
    subCategory: 'Tables',
    title: 'Marble Coffee Table',
    image:
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=800&auto=format&fit=crop',
    price: 450,
    rating: 4.9,
    tag: 'Trending',
  },
  {
    id: 'r3',
    category: 'Decor',
    subCategory: 'Art',
    title: 'Abstract Canvas Art',
    image:
      'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop',
    price: 299,
    rating: 5.0,
  },
  {
    id: 'r4',
    category: 'Decor',
    subCategory: 'Textiles',
    title: 'Cashmere Throw Blanket',
    image:
      'https://images.unsplash.com/photo-1580828369019-22204c1c9818?q=80&w=800&auto=format&fit=crop',
    price: 120,
    rating: 4.7,
  },
];

export default function ProductDetailPage() {
  const product = MOCK_PRODUCT;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const pageTitle = `${product.title} | KRA Design`;

  return (
    <div className="bg-background min-h-screen w-full pt-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Breadcrumbs */}
        <Breadcrumb className="mb-8 font-sans">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/collections">Collections</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/collections/${product.category.toLowerCase().replace(' ', '-')}`}
              >
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* 2. Main Product Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Image Gallery (Spans 7 cols) */}
          <div className="flex flex-col-reverse gap-4 lg:col-span-7 lg:flex-row lg:items-start">
            {/* Thumbnails (Vertical on Desktop, Horizontal on Mobile) */}
            <div className="no-scrollbar flex w-full gap-3 overflow-x-auto lg:w-24 lg:flex-col lg:overflow-y-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all lg:w-full ${
                    activeImageIndex === idx
                      ? 'border-primary'
                      : 'hover:border-border border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Featured Image */}
            <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden rounded-xl lg:aspect-[4/5]">
              {product.tag && (
                <Badge
                  variant="secondary"
                  className="bg-background/80 absolute top-4 left-4 z-10 border-none font-sans text-xs tracking-widest uppercase backdrop-blur-md"
                >
                  {product.tag}
                </Badge>
              )}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={product.images[activeImageIndex]}
                  alt={product.title}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Product Details & Actions (Spans 5 cols) */}
          <div className="flex flex-col lg:sticky lg:top-24 lg:col-span-5 lg:h-max">
            <p className="text-muted-foreground mb-2 font-sans text-xs font-semibold tracking-widest uppercase">
              {product.subCategory}
            </p>
            <h1 className="font-geist text-foreground mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {product.title}
            </h1>

            {/* Ratings */}
            <div className="mb-6 flex items-center gap-2 font-sans text-sm">
              <div className="text-primary flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-muted'}`}
                  />
                ))}
              </div>
              <span className="text-foreground font-semibold">{product.rating}</span>
              <span className="text-muted-foreground decoration-border hover:decoration-foreground cursor-pointer underline transition-colors">
                ({product.reviewsCount} Reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="mb-8 flex items-end gap-3">
              {product.discountedPrice ? (
                <>
                  <span className="text-foreground font-sans text-3xl font-bold">
                    ${product.discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground mb-1 font-sans text-lg font-medium line-through">
                    ${product.price.toLocaleString()}
                  </span>
                  <Badge
                    variant="destructive"
                    className="mb-1.5 ml-2 border-none font-sans font-bold shadow-sm"
                  >
                    Save {product.discountPercentage}%
                  </Badge>
                </>
              ) : (
                <span className="text-foreground font-sans text-3xl font-bold">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-8 font-sans text-base leading-relaxed">
              {product.description}
            </p>

            <Separator className="bg-border mb-8" />

            {/* Color Selector */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-foreground font-sans text-sm font-semibold">Color</span>
                <span className="text-muted-foreground font-sans text-sm">
                  {selectedColor.name}
                </span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? 'border-primary scale-110'
                        : 'hover:border-border border-transparent'
                    }`}
                    aria-label={`Select ${color.name}`}
                  >
                    <span
                      className="h-8 w-8 rounded-full border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="mb-10 flex flex-col gap-4 sm:flex-row">
              <div className="border-border bg-background flex h-12 w-full items-center justify-between rounded-md border px-4 sm:w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-foreground font-sans font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <motion.div whileTap={{ scale: 0.98 }} className="flex-1">
                <Button className="h-12 w-full font-sans text-base font-semibold" size="lg">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart • ${(product.discountedPrice || product.price) * quantity}
                </Button>
              </motion.div>

              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border text-foreground hover:bg-muted h-12 w-12 shrink-0"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>

            {/* Guarantees */}
            <div className="bg-muted/50 mb-10 grid grid-cols-1 gap-4 rounded-xl p-5 font-sans sm:grid-cols-2">
              <div className="text-foreground flex items-center gap-3 text-sm font-medium">
                <Truck className="text-muted-foreground h-5 w-5" /> Free White-Glove Delivery
              </div>
              <div className="text-foreground flex items-center gap-3 text-sm font-medium">
                <RotateCcw className="text-muted-foreground h-5 w-5" /> 30-Day Hassle-Free Returns
              </div>
              <div className="text-foreground flex items-center gap-3 text-sm font-medium sm:col-span-2">
                <ShieldCheck className="text-muted-foreground h-5 w-5" /> 10-Year Comprehensive
                Warranty
              </div>
            </div>

            {/* Accordion Details */}
            <Accordion type="single" collapsible className="w-full font-sans">
              <AccordionItem value="features">
                <AccordionTrigger className="text-base font-semibold">
                  Features & Materials
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  <ul className="ml-1 list-inside list-disc space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="dimensions">
                <AccordionTrigger className="text-base font-semibold">Dimensions</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Overall: {product.dimensions}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care">
                <AccordionTrigger className="text-base font-semibold">
                  Care Instructions
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {product.care}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* 3. Cross-Sell / Related Products */}
        <div className="border-border mt-24 border-t pt-16">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-geist text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              Complete the Look
            </h2>
            <Button variant="ghost" className="hidden font-sans sm:flex">
              Shop Collection
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {RELATED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <BulkOrderCTA />
      <Footer />
    </div>
  );
}
