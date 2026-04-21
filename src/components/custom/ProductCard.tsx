import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import type { MockProduct } from '@/data/productData';
// Note: Ensure your Product interface is imported/available here
// interface Product { ... }

export type Category = 'All' | 'Living Room' | 'Bedroom' | 'Kitchen' | 'Decor';

export const ProductCard: React.FC<{ product: MockProduct }> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="group flex h-full cursor-pointer flex-col"
      initial="initial"
      whileHover="hover"
      onClick={() => navigate(`/collections/${product.id}`)}
    >
      {/* 1. Image & Badges Container (The Hero) */}
      <div className="bg-muted/50 relative aspect-square w-full overflow-hidden rounded-xl transition-all duration-300">
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 z-20 flex flex-col items-start gap-2">
          {product.tag && (
            <Badge
              variant="secondary"
              className="bg-background/80 text-foreground border-none font-sans text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md"
            >
              {product.tag}
            </Badge>
          )}
          {product.discountPercentage && (
            <Badge
              variant="destructive"
              className="border-none font-sans text-[10px] font-bold shadow-sm"
            >
              -{product.discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Product Image with smooth scale on hover */}
        <motion.img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover"
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.05 },
          }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          loading="lazy"
        />

        {/* Premium Floating "Quick Add" Button */}
        <motion.div
          className="pointer-events-none absolute right-0 bottom-4 left-0 z-20 flex justify-center px-4"
          variants={{
            initial: { opacity: 0, y: 15 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Button
            className="bg-background/95 text-foreground hover:bg-primary hover:text-primary-foreground pointer-events-auto w-full rounded-full font-sans shadow-xl backdrop-blur-md transition-colors sm:w-auto"
            size="sm"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </motion.div>

        {/* Subtle Dark Gradient Overlay at the bottom to ensure the button pops */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* 2. Content Area (Tight, minimal, editorial typography) */}
      <div className="mt-4 flex flex-col px-1">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-muted-foreground font-sans text-[10px] font-semibold tracking-widest uppercase">
            {product.subCategory}
          </p>
          <div className="text-foreground flex items-center gap-1 text-xs font-semibold">
            <Star className="fill-primary text-primary h-3 w-3" />
            {product.rating}
          </div>
        </div>

        <h3 className="text-foreground font-geist line-clamp-1 text-base leading-snug font-medium">
          {product.title}
        </h3>

        <div className="mt-1.5 flex items-center gap-2.5">
          {product.discountedPrice ? (
            <>
              <span className="text-foreground font-sans text-sm font-bold">
                ${product.discountedPrice.toLocaleString()}
              </span>
              <span className="text-muted-foreground font-sans text-xs font-medium line-through">
                ${product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-foreground font-sans text-sm font-semibold">
              ${product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
