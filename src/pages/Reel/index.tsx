import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Play, ShoppingBag } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { MOCK_REELS } from '@/data/reelData';

// Note: Ensure you import your actual video file if needed, or use URLs
// import reelVideo from '@/assets/reels/Video-524.mp4';

// --- Types & Mock Data ---
export interface Reel {
  id: string;
  videoUrl: string;
  title: string;
  price: number;
  discountedPrice?: number;
  discountPercentage?: number;
  tag?: string;
  link: string;
}

// --- Animation Variants ---
const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 280, damping: 24 } 
  },
} as const;

// --- Helper: Dynamic Bento Grid Classes ---
// This creates the asymmetrical magazine-style layout
const getBentoClass = (index: number) => {
  const position = index % 7;
  switch (position) {
    case 0: return 'md:col-span-2 md:row-span-2'; // Featured Large
    case 1: return 'md:col-span-1 md:row-span-1'; // Standard Small
    case 2: return 'md:col-span-1 md:row-span-2'; // Tall Portrait
    case 3: return 'md:col-span-1 md:row-span-1'; // Standard Small
    case 4: return 'md:col-span-2 md:row-span-1'; // Wide Landscape
    case 5: return 'md:col-span-1 md:row-span-1'; // Standard Small
    case 6: return 'md:col-span-1 md:row-span-1'; // Standard Small
    default: return 'md:col-span-1 md:row-span-1';
  }
};

export default function ReelsPage() {
  const pageTitle = "Shoppable Reels | KRA Design";
  const pageDescription = "Watch our best-selling home appliances and luxury furniture in action. Shop directly from our trending video feed.";

  return (
    <div className="bg-background min-h-screen w-full pt-8 pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-8 font-sans">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Watch & Shop</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="mb-12 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <h1 className="font-geist text-foreground mb-4 flex items-center gap-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                <Play className="text-primary h-8 w-8 sm:h-10 sm:w-10 fill-current" />
                Trending Reels
              </h1>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed sm:text-xl">
                {pageDescription}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="show"
          // Base: 1 col, 400px height. MD: 3 cols, 300px height. LG: 4 cols.
          className="grid grid-cols-1 auto-rows-[400px] gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 md:auto-rows-[300px]"
        >
          {MOCK_REELS.map((reel, index) => (
            <motion.div
              key={reel.id}
              variants={cardVariants}
              className={`h-full w-full ${getBentoClass(index)}`}
            >
              <ShoppableReelCard reel={reel} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}

// --- Sub-components ---

export const ShoppableReelCard: React.FC<{ reel: Reel }> = ({ reel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Silently catch autoplay restrictions on mobile
      });
    }
  }, []);

  return (
    <motion.div
      // Removed aspect-9/16 so it stretches seamlessly to the parent grid cell bounds
      className="group bg-muted relative h-full w-full cursor-pointer overflow-hidden rounded-[20px] shadow-sm transition-all duration-500 hover:shadow-xl"
      initial="initial"
      whileHover="hover"
    >
      {/* 1. Ultra-Minimalist Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col items-start gap-2">
        {reel.tag && (
          <Badge
            variant="secondary"
            className="border-border/40 bg-background/40 text-foreground rounded-full border px-3 py-1 font-sans text-[9px] font-bold tracking-widest uppercase backdrop-blur-md"
          >
            {reel.tag}
          </Badge>
        )}
        {reel.discountPercentage && (
          <Badge
            variant="destructive"
            className="bg-destructive/90 text-destructive-foreground rounded-full border-none px-2.5 py-1 font-sans text-[10px] font-bold shadow-sm backdrop-blur-sm"
          >
            -{reel.discountPercentage}%
          </Badge>
        )}
      </div>

      {/* 2. Cinematic Video Background */}
      <motion.video
        ref={videoRef}
        src={reel.videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.05 },
        }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      />

      {/* 3. Deep, Smooth Gradient (Ensures text contrast without drop-shadows) */}
      {/* Used pure black colors for the gradient to guarantee white text readability on any theme */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

      {/* 4. Content & CTA (Sliding up smoothly on hover) */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col px-5 pt-12 pb-5"
        variants={{
          initial: { y: 10, opacity: 0.9 },
          hover: { y: 0, opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h3 className="font-geist text-white line-clamp-2 text-lg sm:text-xl leading-snug font-medium tracking-tight">
          {reel.title}
        </h3>

        <div className="mt-3 flex items-end justify-between gap-4">
          {/* Pricing Stack */}
          <div className="flex flex-col">
            {reel.discountedPrice ? (
              <>
                <span className="text-white/60 font-sans text-[11px] font-semibold tracking-wider uppercase line-through">
                  ${reel.price.toLocaleString()}
                </span>
                <span className="text-white font-sans text-xl font-semibold">
                  ${reel.discountedPrice.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-white font-sans text-xl font-semibold">
                ${reel.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Premium Glassmorphic FAB (Floating Action Button) */}
          <Link
            to={reel.link}
            className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-black flex h-10 items-center justify-center gap-2 rounded-full border px-4 font-sans text-sm font-medium backdrop-blur-md transition-all duration-300 active:scale-95"
            aria-label={`Shop ${reel.title}`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline-block">Shop</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:hidden" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};