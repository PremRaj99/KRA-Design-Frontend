import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- Types & Data ---
interface BentoItem {
  id: string;
  title: string;
  image: string;
  href: string;
  gridClass: string;
}

const BENTO_CATEGORIES: BentoItem[] = [
  {
    id: 'cat-1',
    title: 'Living Room Essentials',
    image:
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop',
    href: '/category/living-room',
    // Top Left: 3 cols wide, 1 row tall
    gridClass: 'md:col-span-2 lg:col-span-3 lg:row-span-1',
  },
  {
    id: 'cat-2',
    title: 'Signature Lighting',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    href: '/category/lighting',
    // Middle Vertical: 1 col wide, 2 rows tall
    gridClass: 'md:col-span-1 lg:col-span-1 lg:row-span-2',
  },
  {
    id: 'cat-3',
    title: 'Luxury Bedroom',
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop',
    href: '/category/bedroom',
    // Top Right: 2 cols wide, 2 rows tall
    gridClass: 'md:col-span-1 lg:col-span-2 lg:row-span-2',
  },
  {
    id: 'cat-4',
    title: 'Modern Kitchen',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
    href: '/category/kitchen',
    // Bottom Left: 3 cols wide, 1 row tall
    gridClass: 'md:col-span-2 lg:col-span-3 lg:row-span-1',
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
} as const;

export const BentoCategories: React.FC = () => {
  return (
    <section className="bg-background w-full py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-geist text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Popular Categories
          </h2>
          <p className="text-muted-foreground mt-4 font-sans text-lg">
            Curated collections to transform every room in your home.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          className="grid min-h-120 auto-rows-[250px] grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:auto-rows-[300px] lg:grid-cols-6 lg:grid-rows-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {BENTO_CATEGORIES.map((category) => (
            <BentoCard key={category.id} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- Sub-components ---

const BentoCard: React.FC<{ category: BentoItem }> = ({ category }) => {
  return (
    <motion.a
      href={category.href}
      variants={cardVariants}
      className={cn(
        `group bg-muted ring-primary relative overflow-hidden rounded-4xl transition-shadow outline-none focus-visible:ring-2`,
        category.gridClass,
      )}
    >
      {/* Background Image with Cinematic Scale */}
      <img
        src={category.image}
        alt={category.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Deep Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-500 group-hover:from-foreground/90" />

      {/* Content Area (Anchored Bottom Left) */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 sm:p-8">
        <h3 className="font-serif text-2xl font-medium tracking-tight text-white drop-shadow-sm sm:text-3xl">
          {category.title}
        </h3>

        {/* Animated CTA Button */}
        <div className="mt-4 overflow-hidden">
          <Button
            variant="secondary"
            className="border-border/50 bg-background/50 hover:bg-background rounded-full border font-sans text-sm font-semibold text-black backdrop-blur-sm transition-all"
          >
            Buy Now
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.a>
  );
};
