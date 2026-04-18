import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Data Constants ---
const TRADE_BENEFITS = [
  'Trade-Exclusive Pricing & Volume Discounts',
  'Dedicated Account Manager',
  'Priority White-Glove Delivery',
  'Custom Configurations & Sourcing',
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  },
} as const;

export const BulkOrderCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="bg-background w-full py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="border-border bg-card relative overflow-hidden rounded-[2rem] border shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Subtle Premium Background Glow */}
          <div className="bg-primary/10 pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-50 blur-[100px]" />
          <div className="bg-secondary/20 pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-50 blur-[100px]" />

          <div className="relative z-10 flex flex-col lg:flex-row">
            {/* Left Column: Typography & Imagery */}
            <div className="flex flex-1 flex-col justify-center p-8 sm:p-12 lg:p-16">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
              >
                <motion.div
                  variants={itemVariants}
                  className="bg-muted/50 ring-border mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ring-1"
                >
                  <Building2 className="text-foreground h-6 w-6" />
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  className="font-geist text-foreground mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
                >
                  Furnish Your Next <br className="hidden sm:block" />
                  <span className="text-muted-foreground">Big Project.</span>
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-muted-foreground mb-8 max-w-xl font-sans text-lg leading-relaxed"
                >
                  Partner with KRA Design for commercial spaces, real estate developments, and
                  boutique hotels. Experience uncompromising quality at scale.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-4 sm:flex-row sm:items-center"
                >
                  <Button size="lg" className="group font-sans font-medium">
                    Request a Quote
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent font-sans font-medium"
                  >
                    <PhoneCall className="mr-2 h-4 w-4" />
                    Contact Sales
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column: Benefits List */}
            <div className="bg-muted/30 lg:border-border flex flex-1 flex-col justify-center p-8 sm:p-12 lg:border-l lg:p-16">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
                className="max-w-md"
              >
                <motion.h3
                  variants={itemVariants}
                  className="font-geist text-foreground mb-6 text-xl font-semibold"
                >
                  The KRA Trade Advantage
                </motion.h3>

                <ul className="flex flex-col gap-5">
                  {TRADE_BENEFITS.map((benefit, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className="group flex items-start gap-3"
                    >
                      <div className="bg-background ring-border group-hover:bg-primary group-hover:ring-primary mt-0.5 flex shrink-0 items-center justify-center rounded-full p-1 ring-1 transition-colors">
                        <CheckCircle2 className="text-muted-foreground group-hover:text-primary-foreground h-4 w-4 transition-colors" />
                      </div>
                      <span className="text-foreground/90 group-hover:text-foreground font-sans text-base font-medium transition-colors">
                        {benefit}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
