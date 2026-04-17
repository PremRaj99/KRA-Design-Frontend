import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, ShoppingBag, ArrowRight } from 'lucide-react';
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

const ShoppableReelCard: React.FC<{ reel: Reel }> = ({ reel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video on hover for desktop, or keep it autoplaying natively.
  // Using native autoPlay muted playsInline ensures it works automatically on mobile browsers.
  useEffect(() => {
    if (videoRef.current) {
      // Force play to ensure mobile browsers kick off the video if autoplay was blocked
      videoRef.current.play().catch(() => {
        // Silently catch autoplay restrictions
      });
    }
  }, []);

  return (
    <motion.div
      className="group bg-muted relative aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-2xl transition-transform duration-300"
      whileHover={{ y: -8 }}
    >
      {/* Top Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col items-start gap-2">
        {reel.tag && (
          <Badge
            variant="secondary"
            className="bg-background/60 text-foreground border-none font-sans text-xs font-semibold tracking-wider backdrop-blur-md"
          >
            {reel.tag}
          </Badge>
        )}
        {reel.discountPercentage && (
          <Badge
            variant="destructive"
            className="border-none font-sans text-xs font-bold shadow-sm"
          >
            -{reel.discountPercentage}%
          </Badge>
        )}
      </div>

      {/* Video Background */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark Gradient Overlay for Text Readability */}
      <div className="from-background/95 via-background/40 group-hover:from-background pointer-events-none absolute inset-0 z-10 bg-gradient-to-t to-transparent transition-opacity duration-300" />

      {/* Product Info & CTA overlay (Bottom Anchored) */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col p-5">
        <h3 className="text-foreground font-geist line-clamp-2 text-lg leading-tight font-bold drop-shadow-md">
          {reel.title}
        </h3>

        <div className="mt-2 mb-4 flex items-center gap-2">
          {reel.discountedPrice ? (
            <>
              <span className="text-primary font-sans text-xl font-extrabold drop-shadow-sm">
                ${reel.discountedPrice.toLocaleString()}
              </span>
              <span className="text-muted-foreground font-sans text-sm font-medium line-through">
                ${reel.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-foreground font-sans text-xl font-bold drop-shadow-sm">
              ${reel.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Shoppable CTA */}
        <Button
          asChild
          className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground w-full font-sans transition-all active:scale-[0.98]"
        >
          <a href={reel.link}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Shop Now
          </a>
        </Button>
      </div>
    </motion.div>
  );
};
