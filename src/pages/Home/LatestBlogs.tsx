import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SectionHeading from '@/components/custom/SectionHeading';

// --- Types & Mock Data ---
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  imageUrl: string;
  href: string;
}

const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Art of Minimalist Living: Elevating Your Space',
    excerpt:
      'Discover how stripping back the excess can highlight the true beauty of your home architecture and signature furniture pieces.',
    category: 'Interior Design',
    readTime: '5 min read',
    date: 'April 12, 2026',
    imageUrl:
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1200&auto=format&fit=crop',
    href: '/blog/minimalist-living',
  },
  {
    id: 'blog-2',
    title: '5 Smart Appliances Redefining the Modern Kitchen',
    excerpt:
      'From AI-driven espresso makers to seamless integrated cooling, explore the tech upgrading our culinary spaces.',
    category: 'Smart Home',
    readTime: '4 min read',
    date: 'April 08, 2026',
    imageUrl:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
    href: '/blog/smart-kitchen-appliances',
  },
  {
    id: 'blog-3',
    title: 'Layered Lighting: The Secret to a Cozy Atmosphere',
    excerpt:
      'A comprehensive guide to mixing ambient, task, and accent lighting to completely transform your living room.',
    category: 'Guides',
    readTime: '7 min read',
    date: 'April 02, 2026',
    imageUrl:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    href: '/blog/layered-lighting-guide',
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 20 } },
} as const;

export const LatestBlogs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="bg-background w-full py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeading
          title="Journal & Insights"
          subtitle="Expert design tips, appliance reviews, and inspiration for curating your perfect home."
          ctaText="View All Articles"
          ctaHref='/blogs'
        />

        {/* 6-Column, 2-Row Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 gap-8 lg:grid-cols-6 lg:grid-rows-2 lg:gap-10"
        >
          {/* Main Featured Article (Left Side - 3 Cols, 2 Rows) */}
          <motion.div variants={itemVariants} className="lg:col-span-3 lg:row-span-2">
            <FeaturedArticleCard post={MOCK_BLOGS[0]} />
          </motion.div>

          {/* Secondary Articles (Right Side - 3 Cols, 1 Row Each) */}
          <motion.div variants={itemVariants} className="lg:col-span-3 lg:row-span-1">
            <SecondaryArticleCard post={MOCK_BLOGS[1]} />
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-3 lg:row-span-1">
            <SecondaryArticleCard post={MOCK_BLOGS[2]} />
          </motion.div>
        </motion.div>

        {/* Mobile View All CTA */}
        <div className="mt-10 flex justify-center md:hidden">
          <Button variant="outline" className="w-full font-sans">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

// --- Sub-components ---

const FeaturedArticleCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <a
      href={post.href}
      className="group focus-visible:ring-primary flex h-full flex-col rounded-2xl outline-none focus-visible:ring-2"
    >
      {/* Image Container */}
      <div className="bg-muted relative aspect-4/3 w-full overflow-hidden rounded-2xl sm:aspect-video lg:aspect-auto lg:h-84">
        <motion.img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 z-10">
          <Badge
            variant="secondary"
            className="bg-background/80 text-foreground border-none font-sans text-xs font-semibold tracking-widest uppercase backdrop-blur-md"
          >
            {post.category}
          </Badge>
        </div>
      </div>

      {/* Content Container */}
      <div className="mt-6 flex flex-1 flex-col justify-center px-2">
        <div className="text-muted-foreground mb-3 flex items-center gap-3 font-sans text-sm">
          <span>{post.date}</span>
          <span className="bg-border h-1 w-1 rounded-full" />
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>

        <h3 className="font-geist text-foreground group-hover:text-primary mb-3 text-2xl leading-tight font-bold tracking-tight transition-colors sm:text-3xl">
          {post.title}
        </h3>

        <p className="text-muted-foreground mb-6 line-clamp-3 font-sans text-base leading-relaxed">
          {post.excerpt}
        </p>

        <div className="text-primary mt-auto flex items-center font-sans text-sm font-semibold">
          Read Article
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </a>
  );
};

const SecondaryArticleCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <a
      href={post.href}
      className="group focus-visible:ring-primary flex h-full flex-col gap-6 rounded-2xl outline-none focus-visible:ring-2 md:flex-row md:items-center"
    >
      {/* Image Container - Shifts to side-by-side on tablet/desktop */}
      <div className="bg-muted relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl md:aspect-4/3 md:w-2/5 lg:w-[45%]">
        <motion.img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 z-10 md:hidden lg:block">
          <Badge
            variant="secondary"
            className="bg-background/80 text-foreground border-none font-sans text-[10px] font-semibold tracking-widest uppercase backdrop-blur-md"
          >
            {post.category}
          </Badge>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-center px-2 md:px-0">
        <Badge
          variant="outline"
          className="border-border text-muted-foreground mb-4 hidden w-fit font-sans text-[10px] font-semibold tracking-widest uppercase md:inline-flex lg:hidden"
        >
          {post.category}
        </Badge>

        <div className="text-muted-foreground mb-2.5 flex items-center gap-2.5 font-sans text-xs">
          <span>{post.date}</span>
          <span className="bg-border h-1 w-1 rounded-full" />
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>

        <h3 className="font-geist text-foreground group-hover:text-primary mb-2.5 line-clamp-2 text-xl leading-snug font-bold tracking-tight transition-colors">
          {post.title}
        </h3>

        <p className="text-muted-foreground line-clamp-2 font-sans text-sm leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </a>
  );
};
