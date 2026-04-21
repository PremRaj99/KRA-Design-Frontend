import { Button } from '@/components/ui/button';
import { SLIDES_DATA } from '@/data/heroBannerData';
import { useAutoSlider } from '@/hooks/useAutoSlider';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

export const HeroSlider: React.FC = () => {
  const { currentIndex, nextSlide, prevSlide, goToSlide, setIsPaused } = useAutoSlider({
    totalSlides: SLIDES_DATA.length,
    intervalMs: 5000,
  });

  return (
    <section
      className="h-body bg-muted relative max-h-200 min-h-150 w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Image Layer (z-0) */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          <img
            src={SLIDES_DATA[currentIndex].image}
            alt={SLIDES_DATA[currentIndex].title}
            className="h-full w-full mask-b-to-200 object-cover"
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
          />
        </motion.div>
      </AnimatePresence>

      {/* 2. Gradient Overlay (z-10) - Darkened significantly to replace the glass box */}
      <div className="pointer-events-none absolute inset-0 z-10" />

      {/* 3. Content Overlay (z-20) - Pure text, no background box */}
      <div className="pointer-events-none absolute inset-0 z-20 mx-auto flex w-full max-w-7xl flex-col items-start justify-end px-8 pb-12 sm:pl-16 lg:pb-24">
        <div className="pointer-events-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-start text-left"
            >
              <h1 className="font-geist text-foreground mb-4 text-3xl font-extrabold tracking-tight drop-shadow-xl sm:text-5xl lg:text-6xl">
                {SLIDES_DATA[currentIndex].title}
              </h1>
              <p className="text-foreground/90 mb-4 max-w-xl font-sans text-base drop-shadow-md sm:text-lg md:mb-8 lg:text-xl">
                {SLIDES_DATA[currentIndex].subtitle}
              </p>
              <Button asChild size="lg" className="px-8 py-6 font-sans text-base shadow-lg">
                <a href={SLIDES_DATA[currentIndex].link}>{SLIDES_DATA[currentIndex].cta}</a>
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 4. Controls & Indicators (z-30) */}
      <SliderControls onNext={nextSlide} onPrev={prevSlide} />

      <SliderIndicators total={SLIDES_DATA.length} current={currentIndex} onSelect={goToSlide} />
    </section>
  );
};

// --- Modular Sub-components ---

const SliderControls = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => (
  <div className="pointer-events-none absolute inset-y-0 right-0 left-0 z-30 flex items-center justify-between px-4">
    <Button
      variant="outline"
      size="icon"
      onClick={onPrev}
      className="bg-background/20 hover:bg-background border-border/30 text-foreground pointer-events-auto h-12 w-12 rounded-full backdrop-blur transition-all"
      aria-label="Previous slide"
    >
      <ChevronLeft className="h-6 w-6" />
    </Button>
    <Button
      variant="outline"
      size="icon"
      onClick={onNext}
      className="bg-background/20 hover:bg-background border-border/30 text-foreground pointer-events-auto h-12 w-12 rounded-full backdrop-blur transition-all"
      aria-label="Next slide"
    >
      <ChevronRight className="h-6 w-6" />
    </Button>
  </div>
);

const SliderIndicators = ({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}) => (
  <div className="absolute right-0 bottom-6 left-0 z-30 flex justify-center gap-3">
    {Array.from({ length: total }).map((_, idx) => (
      <button
        key={idx}
        onClick={() => onSelect(idx)}
        aria-label={`Go to slide ${idx + 1}`}
        className="group relative h-2 w-12 overflow-hidden rounded-full transition-all focus:outline-none"
      >
        <div className="bg-primary/20 group-hover:bg-primary/40 absolute inset-0 h-full w-full transition-colors" />
        {current === idx && (
          <motion.div
            layoutId="active-slide-indicator"
            className="bg-primary absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </button>
    ))}
  </div>
);
