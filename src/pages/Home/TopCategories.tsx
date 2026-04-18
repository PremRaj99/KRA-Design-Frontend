import { ProductCard, type Category, } from '@/components/custom/ProductCard';
import SectionHeading from '@/components/custom/SectionHeading';
import { Button } from '@/components/ui/button';
import { MOCK_PRODUCTS } from '@/data/productData';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';

// --- Types & Mock Data ---

const CATEGORIES: Category[] = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Decor'];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
} as const;

export const TopCategories: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>('All');

  // Filter products based on selected tab
  const filteredProducts = useMemo(() => {
    if (activeTab === 'All') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <section className="bg-background w-full py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeading
          title="Shop Top Categories"
          subtitle="Explore our handpicked selection of premium home essentials, designed to elevate every corner of your space."
          ctaText="View All Products"
          ctaHref="/products"
        />

        {/* Animated Tabs */}
        <div className="no-scrollbar border-border/50 mb-10 flex w-full overflow-x-auto border-b pb-px">
          <div className="flex gap-6 sm:gap-8">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`relative pb-4 font-sans text-base font-medium transition-colors ${
                  activeTab === category
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground/80'
                } whitespace-nowrap`}
              >
                {category}
                {activeTab === category && (
                  <motion.div
                    layoutId="category-tab-indicator"
                    className="bg-primary absolute right-0 bottom-0 left-0 h-0.5"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          key={activeTab} // Force re-render of animation when tab changes
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants} layout>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mobile View All Button */}
        <div className="mt-10 flex justify-center md:hidden">
          <Button variant="outline" className="w-full font-sans sm:w-auto">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};
