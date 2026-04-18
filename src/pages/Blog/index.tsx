import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import React, { useMemo, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { BulkOrderCTA } from '@/components/custom/BulkOrderCTA';
import { Footer } from '@/components/custom/footer';

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
      'Discover how stripping back the excess can highlight the true beauty of your home architecture and signature furniture pieces. We explore the philosophy of "less but better".',
    category: 'Interior Design',
    readTime: '5 min read',
    date: 'April 12, 2026',
    imageUrl:
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1200&auto=format&fit=crop',
    href: '/journal/minimalist-living',
  },
  {
    id: 'blog-2',
    title: '5 Smart Appliances Redefining the Modern Kitchen',
    excerpt:
      'From AI-driven espresso makers to seamless integrated cooling, explore the tech upgrading our culinary spaces and making daily routines effortless.',
    category: 'Smart Home',
    readTime: '4 min read',
    date: 'April 08, 2026',
    imageUrl:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
    href: '/journal/smart-kitchen-appliances',
  },
  {
    id: 'blog-3',
    title: 'Layered Lighting: The Secret to a Cozy Atmosphere',
    excerpt:
      'A comprehensive guide to mixing ambient, task, and accent lighting to completely transform your living room into a warm, inviting sanctuary.',
    category: 'Guides',
    readTime: '7 min read',
    date: 'April 02, 2026',
    imageUrl:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    href: '/journal/layered-lighting-guide',
  },
  {
    id: 'blog-4',
    title: 'The Return of Mid-Century Modern',
    excerpt:
      'Why clean lines, organic curves, and mixed materials are making a massive comeback in 2026, and how to incorporate them without looking retro.',
    category: 'Interior Design',
    readTime: '6 min read',
    date: 'March 28, 2026',
    imageUrl:
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop',
    href: '/journal/mid-century-modern-return',
  },
  {
    id: 'blog-5',
    title: 'Sustainable Materials in Luxury Furniture',
    excerpt:
      'How top designers are utilizing reclaimed woods, recycled metals, and ethical fabrics to create stunning pieces that respect the planet.',
    category: 'Sustainability',
    readTime: '5 min read',
    date: 'March 21, 2026',
    imageUrl:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop',
    href: '/journal/sustainable-materials',
  },
];

const CATEGORIES = ['All', 'Interior Design', 'Smart Home', 'Guides', 'Sustainability'];

// --- Animation Variants ---
const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 20 } },
} as const;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Filter Logic
  const filteredBlogs = useMemo(() => {
    if (activeCategory === 'All') return MOCK_BLOGS;
    return MOCK_BLOGS.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  const featuredPost = filteredBlogs[0];
  const remainingPosts = filteredBlogs.slice(1);

  const pageTitle =
    activeCategory === 'All'
      ? 'Journal & Insights | KRA Design'
      : `${activeCategory} Articles | KRA Design`;

  const pageDescription =
    'Expert design tips, appliance reviews, and inspiration for curating your perfect home.';

  return (
    <div className="bg-background min-h-screen w-full pt-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Breadcrumbs */}
        <Breadcrumb className="mb-8 font-sans">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Journal</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* 2. Page Header */}
        <div className="mb-12 max-w-3xl">
          <h1 className="font-geist text-foreground mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Journal & Insights
          </h1>
          <p className="text-muted-foreground font-sans text-lg leading-relaxed sm:text-xl">
            {pageDescription}
          </p>
        </div>

        {/* 3. Interactive Category Filter */}
        <div className="no-scrollbar border-border mb-12 flex w-full overflow-x-auto border-b pb-px">
          <div className="flex gap-6 sm:gap-8">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative pb-4 font-sans text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground/80'
                } whitespace-nowrap`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div
                    layoutId="blog-tab-indicator"
                    className="bg-foreground absolute right-0 bottom-0 left-0 h-0.5"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Blog Content */}
        {filteredBlogs.length > 0 ? (
          <motion.div
            key={activeCategory} // Force re-render animation on category change
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-12 sm:gap-16"
          >
            {/* Featured Post (Hero Layout) */}
            {featuredPost && (
              <motion.div variants={cardVariants}>
                <HeroArticleCard post={featuredPost} />
              </motion.div>
            )}

            {/* Grid Posts */}
            {remainingPosts.length > 0 && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {remainingPosts.map((post) => (
                  <motion.div key={post.id} variants={cardVariants} className="h-full">
                    <GridArticleCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <h3 className="font-geist text-foreground text-2xl font-bold">No articles found</h3>
            <p className="text-muted-foreground mt-2 font-sans">
              Check back soon for more content in the {activeCategory} category.
            </p>
            <Button
              variant="outline"
              className="mt-6 font-sans"
              onClick={() => setActiveCategory('All')}
            >
              View All Articles
            </Button>
          </motion.div>
        )}

        {/* 5. Pagination / Load More */}
        {filteredBlogs.length > 0 && (
          <div className="mt-16 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-muted group font-sans font-medium"
            >
              Load More Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
      <BulkOrderCTA />
      <Footer />
    </div>
  );
}

// --- Sub-components ---

// Hero style for the most recent/featured post
const HeroArticleCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <Link
      to={post.href}
      className="group focus-visible:ring-primary flex flex-col gap-8 rounded-2xl outline-none focus-visible:ring-2 lg:flex-row lg:items-center"
    >
      {/* Image Container (Spans 60% on Desktop) */}
      <div className="bg-muted relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl lg:aspect-16/10 lg:w-[60%]">
        <motion.img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="eager" // Eager load the hero image
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

      {/* Content Container (Spans 40% on Desktop) */}
      <div className="flex flex-1 flex-col justify-center lg:py-8">
        <div className="text-muted-foreground mb-4 flex items-center gap-3 font-sans text-sm">
          <span>{post.date}</span>
          <span className="bg-border h-1 w-1 rounded-full" />
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readTime}
          </span>
        </div>

        <h2 className="font-geist text-foreground group-hover:text-primary mb-4 text-3xl leading-tight font-bold tracking-tight transition-colors sm:text-4xl lg:text-5xl">
          {post.title}
        </h2>

        <p className="text-muted-foreground mb-8 line-clamp-3 font-sans text-lg leading-relaxed lg:line-clamp-4">
          {post.excerpt}
        </p>

        <div className="text-primary mt-auto flex items-center font-sans text-base font-semibold">
          Read Full Article
          <ArrowUpRight className="ml-1.5 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </Link>
  );
};

// Standard vertical card for the grid
const GridArticleCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <Link
      to={post.href}
      className="group focus-visible:ring-primary flex h-full flex-col rounded-2xl outline-none focus-visible:ring-2"
    >
      {/* Image Container */}
      <div className="bg-muted relative aspect-4/3 w-full overflow-hidden rounded-2xl">
        <motion.img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 z-10">
          <Badge
            variant="secondary"
            className="bg-background/80 text-foreground border-none font-sans text-[10px] font-semibold tracking-widest uppercase backdrop-blur-md"
          >
            {post.category}
          </Badge>
        </div>
      </div>

      {/* Content Container */}
      <div className="mt-5 flex flex-1 flex-col px-1">
        <div className="text-muted-foreground mb-2.5 flex items-center gap-2.5 font-sans text-xs">
          <span>{post.date}</span>
          <span className="bg-border h-1 w-1 rounded-full" />
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>

        <h3 className="font-geist text-foreground group-hover:text-primary mb-2.5 text-xl leading-snug font-bold tracking-tight transition-colors">
          {post.title}
        </h3>

        <p className="text-muted-foreground mb-6 line-clamp-2 font-sans text-sm leading-relaxed">
          {post.excerpt}
        </p>

        <div className="text-primary mt-auto flex items-center font-sans text-sm font-semibold">
          Read Article
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </Link>
  );
};
