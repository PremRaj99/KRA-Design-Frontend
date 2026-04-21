import SectionHeading from '@/components/custom/SectionHeading';
import { Button } from '@/components/ui/button';
import { MOCK_REELS } from '@/data/reelData';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Play, ShoppingBag } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Reel } from '../Reel';


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
        <SectionHeading
          title={
            <span className="flex items-center gap-2">
              <Play className="text-primary h-8 w-8 fill-current" />
              Trending Reels
            </span>
          }
          subtitle="See our best-selling appliances and furniture in action. Get inspired for your next home upgrade."
          ctaText="Watch All Reels"
          ctaHref='/reels'
        />

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
              className="w-[85vw] min-w-70 shrink-0 snap-center sm:min-w-[320px] lg:w-auto"
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
      className="group bg-muted relative aspect-9/16 w-full cursor-pointer overflow-hidden rounded-[20px] shadow-sm transition-all duration-500 hover:shadow-xl"
      initial="initial"
      whileHover="hover"
    >
      {/* 1. Ultra-Minimalist Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col items-start gap-2">
        {reel.tag && (
          <span className="border-border/40 bg-background/40 text-foreground rounded-full border px-3 py-1 font-sans text-[9px] font-bold tracking-widest uppercase backdrop-blur-md">
            {reel.tag}
          </span>
        )}
        {reel.discountPercentage && (
          <span className="bg-destructive/20 border-destructive/50 text-destructive rounded-full border px-2.5 py-1 font-sans text-[10px] font-bold shadow-sm">
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
      <div className="from-foreground/95 via-foreground/20 pointer-events-none absolute inset-0 z-10 bg-linear-to-t to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      {/* 4. Content & CTA (Sliding up smoothly on hover) */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col px-5 pt-12 pb-5"
        variants={{
          initial: { y: 8 },
          hover: { y: 0 },
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h3 className="font-geist text-background line-clamp-2 text-lg leading-snug font-medium tracking-tight">
          {reel.title}
        </h3>

        <div className="mt-3 flex items-end justify-between gap-4">
          {/* Pricing Stack */}
          <div className="flex flex-col">
            {reel.discountedPrice ? (
              <>
                <span className="text-background/30 font-sans text-[11px] font-semibold tracking-wider uppercase line-through">
                  ${reel.price.toLocaleString()}
                </span>
                <span className="text-background font-sans text-xl font-semibold">
                  ${reel.discountedPrice.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-background font-sans text-xl font-semibold">
                ${reel.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Premium Glassmorphic FAB (Floating Action Button) */}
          <Link
            to={reel.link}
            className="border-border/50 bg-background/50 text-foreground hover:bg-background flex h-10 items-center justify-center gap-2 rounded-full border px-4 font-sans text-sm font-medium backdrop-blur-lg transition-all duration-300 active:scale-95"
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
