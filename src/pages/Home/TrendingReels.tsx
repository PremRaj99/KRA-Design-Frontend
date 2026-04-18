import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, ShoppingBag, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import reelVideo from '@/assets/reels/Video-524.mp4'; 

// --- Types & Mock Data ---
interface Reel {
  id: string;
  videoUrl: string;
  title: string;
  price: number;
  discountedPrice?: number;
  discountPercentage?: number;
  tag?: string;
  link: string;
}

const MOCK_REELS: Reel[] = [
  {
    id: 'reel-1',
    // Using placeholder MP4s for demonstration
    videoUrl: reelVideo,
    title: 'Smart Espresso Machine',
    price: 899,
    discountedPrice: 749,
    discountPercentage: 16,
    tag: '#CoffeeLover',
    link: '/product/smart-espresso-machine',
  },
  {
    id: 'reel-2',
    videoUrl: reelVideo,
    title: 'Minimalist Humidifier',
    price: 120,
    tag: '#HomeDecor',
    link: '/product/minimalist-humidifier',
  },
  {
    id: 'reel-3',
    videoUrl: reelVideo,
    title: 'Velvet Swivel Chair',
    price: 450,
    discountedPrice: 350,
    discountPercentage: 22,
    tag: '#Trending',
    link: '/product/velvet-swivel-chair',
  },
  {
    id: 'reel-4',
    videoUrl: reelVideo,
    title: 'Air Purifier Pro',
    price: 299,
    discountedPrice: 249,
    discountPercentage: 16,
    tag: '#Wellness',
    link: '/product/air-purifier-pro',
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 20 } },
} as const;

export const TrendingReels: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="bg-background w-full overflow-hidden py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="font-geist text-foreground flex items-center justify-center gap-2 text-3xl font-bold tracking-tight sm:text-4xl md:justify-start">
              <Play className="text-primary h-8 w-8 fill-current" />
              Trending Reels
            </h2>
            <p className="text-muted-foreground mt-4 font-sans text-lg">
              See our best-selling appliances and furniture in action. Get inspired for your next
              home upgrade.
            </p>
          </div>
          <Button variant="ghost" className="text-primary hidden font-sans md:flex">
            Watch All Reels
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Reels Container: Horizontal snap scroll on Mobile, Grid on Desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-8 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {MOCK_REELS.map((reel) => (
            <motion.div
              key={reel.id}
              variants={itemVariants}
              className="w-[85vw] min-w-[280px] shrink-0 snap-center sm:min-w-[320px] lg:w-auto"
            >
              <ShoppableReelCard reel={reel} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All Button */}
        <div className="mt-6 flex justify-center md:hidden">
          <Button variant="outline" className="w-full font-sans">
            Watch All Reels
          </Button>
        </div>
      </div>
    </section>
  );
};

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
      className="group relative aspect-9/16 w-full cursor-pointer overflow-hidden rounded-[20px] bg-muted shadow-sm transition-all duration-500 hover:shadow-xl"
      initial="initial"
      whileHover="hover"
    >
      {/* 1. Ultra-Minimalist Badges */}
      <div className="absolute left-4 top-4 z-20 flex flex-col items-start gap-2">
        {reel.tag && (
          <span className="rounded-full border border-border/40 bg-background/40 px-3 py-1 font-sans text-[9px] font-bold tracking-widest text-foreground uppercase backdrop-blur-md">
            {reel.tag}
          </span>
        )}
        {reel.discountPercentage && (
          <span className="rounded-full bg-destructive/20 border border-destructive/50 px-2.5 py-1 font-sans text-[10px] font-bold text-destructive shadow-sm">
            -{reel.discountPercentage}%
          </span>
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
          hover: { scale: 1.07 },
        }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      />

      {/* 3. Deep, Smooth Gradient (Ensures text contrast without drop-shadows) */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-foreground/95 via-foreground/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      {/* 4. Content & CTA (Sliding up smoothly on hover) */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col px-5 pb-5 pt-12"
        variants={{
          initial: { y: 8 },
          hover: { y: 0 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h3 className="font-geist text-background line-clamp-2 text-lg font-medium leading-snug tracking-tight">
          {reel.title}
        </h3>

        <div className="mt-3 flex items-end justify-between gap-4">
          {/* Pricing Stack */}
          <div className="flex flex-col">
            {reel.discountedPrice ? (
              <>
                <span className="font-sans text-background/30 text-[11px] font-semibold uppercase tracking-wider line-through">
                  ${reel.price.toLocaleString()}
                </span>
                <span className="font-sans text-background text-xl font-semibold">
                  ${reel.discountedPrice.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="font-sans text-background text-xl font-semibold">
                ${reel.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Premium Glassmorphic FAB (Floating Action Button) */}
          <a
            href={reel.link}
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 font-sans text-sm font-medium text-foreground backdrop-blur-lg transition-all duration-300 hover:bg-foreground hover:text-primary hover:border-primary active:scale-95"
            aria-label={`Shop ${reel.title}`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline-block">Shop</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:hidden" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};
