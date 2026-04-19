import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Clock, Link as LinkIcon } from 'lucide-react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaFacebook } from 'react-icons/fa';
import { FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6';
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
import { Separator } from '@/components/ui/separator';
import { BulkOrderCTA } from '@/components/custom/BulkOrderCTA';
import { Footer } from '@/components/custom/footer';

// --- Mock Data ---
// In a real app, this would be fetched based on the URL parameter (e.g., useParams)
const MOCK_ARTICLE = {
  id: 'blog-1',
  title: 'The Art of Minimalist Living: Elevating Your Space',
  excerpt:
    'Discover how stripping back the excess can highlight the true beauty of your home architecture and signature furniture pieces. We explore the philosophy of "less but better".',
  content: `
    <p>Minimalism isn't just about having less; it's about making room for more of what matters. In the context of interior design, it’s a deliberate curation of space, light, and objects to create an environment that feels both expansive and deeply personal.</p>
    
    <h2>The Philosophy of "Less but Better"</h2>
    <p>The core tenet of minimalist design is intentionality. Every piece of furniture, every light fixture, and every decorative object must serve a purpose—whether functional, aesthetic, or emotional. When we strip away the superfluous, we allow the foundational elements of a room to breathe.</p>
    
    <blockquote>"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry</blockquote>
    
    <h2>Focusing on Form and Material</h2>
    <p>In a minimalist space, the eye isn't distracted by clutter. Therefore, the objects that do remain must carry the visual weight. This is why high-quality materials and strong geometric forms are vital. A solid oak dining table or a sculpted velvet armchair becomes the hero of the room.</p>
    <ul>
      <li><strong>Natural Textures:</strong> Incorporate wood, stone, and linen to add warmth.</li>
      <li><strong>Negative Space:</strong> Allow areas of your room to remain empty. This is crucial for balance.</li>
      <li><strong>Statement Lighting:</strong> Use architectural lighting fixtures as functional art.</li>
    </ul>

    <h2>Color Palettes that Calm</h2>
    <p>While minimalism is often associated with stark white, a modern minimalist palette is much richer. Think warm greys, muted earthy tones, and deep, saturated accents like navy or charcoal to ground the space without overwhelming it.</p>
    
    <p>By embracing these principles, you don't just change how your home looks; you change how it feels. A minimalist home is a sanctuary—a quiet retreat from the noise of the outside world.</p>
  `,
  category: 'Interior Design',
  readTime: '5 min read',
  date: 'April 12, 2026',
  author: 'Elena Rodriguez',
  authorRole: 'Lead Interior Designer',
  authorImage:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  imageUrl:
    'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=2000&auto=format&fit=crop',
};

const RELATED_ARTICLES = [
  {
    id: 'blog-4',
    title: 'The Return of Mid-Century Modern',
    excerpt:
      'Why clean lines, organic curves, and mixed materials are making a massive comeback in 2026.',
    category: 'Interior Design',
    readTime: '6 min read',
    date: 'March 28, 2026',
    imageUrl:
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop',
    href: '/blog/mid-century-modern-return',
  },
  {
    id: 'blog-3',
    title: 'Layered Lighting: The Secret to a Cozy Atmosphere',
    excerpt: 'A comprehensive guide to mixing ambient, task, and accent lighting.',
    category: 'Guides',
    readTime: '7 min read',
    date: 'April 02, 2026',
    imageUrl:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    href: '/blog/layered-lighting-guide',
  },
];

export default function BlogDetailPage() {
  const article = MOCK_ARTICLE;
  const pageTitle = `${article.title} | KRA Design Journal`;

  // Scroll animation for the hero image parallax effect
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, 150]);
  const imageOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <div className="bg-background min-h-screen w-full">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* 1. Cinematic Hero Image (Parallax) */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden sm:h-[60vh] lg:h-[70vh]">
        <motion.img
          src={article.imageUrl}
          alt={article.title}
          style={{ y: imageY, opacity: imageOpacity }}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {/* Subtle gradient to ensure breadcrumb readability if placed over image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl"
            >
              <Badge className="bg-primary text-primary-foreground mb-4 border-none font-sans text-xs font-semibold tracking-widest uppercase">
                {article.category}
              </Badge>
              <h1 className="font-geist text-4xl leading-tight font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                {article.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-12 sm:px-6 lg:px-8">
        {/* 2. Breadcrumbs & Meta */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Breadcrumb className="font-sans">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[200px]">
                  {article.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-muted-foreground flex items-center gap-4 font-sans text-sm">
            <span className="flex items-center gap-2">
              <img
                src={article.authorImage}
                alt={article.author}
                className="border-border h-6 w-6 rounded-full border object-cover"
              />
              {article.author}
            </span>
            <span className="bg-border h-1 w-1 rounded-full" />
            <span>{article.date}</span>
            <span className="bg-border h-1 w-1 rounded-full" />
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* 3. Main Content Layout */}
        <div className="flex flex-col lg:flex-row lg:gap-16">
          {/* Left Sidebar (Sticky Share Links) */}
          <div className="hidden shrink-0 lg:block lg:w-16">
            <div className="sticky top-32 flex flex-col items-center gap-6">
              <span className="text-muted-foreground mb-2 rotate-180 font-sans text-xs font-semibold tracking-widest uppercase [writing-mode:vertical-lr]">
                Share
              </span>
              <Separator orientation="vertical" className="bg-border h-12" />
              <ShareButton icon={FaSquareXTwitter} ariaLabel="Share on Twitter" />
              <ShareButton icon={FaFacebook} ariaLabel="Share on Facebook" />
              <ShareButton icon={FaLinkedin} ariaLabel="Share on LinkedIn" />
              <ShareButton icon={LinkIcon} ariaLabel="Copy Link" />
            </div>
          </div>

          {/* Center: Article Body (Typography highly optimized for reading) */}
          <article className="prose prose-neutral dark:prose-invert prose-lg text-muted-foreground prose-headings:font-geist prose-headings:font-bold prose-headings:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:font-geist prose-blockquote:text-xl prose-blockquote:italic prose-blockquote:text-foreground/90 max-w-3xl font-sans">
            {/* In a real app with a CMS, use a library like html-react-parser instead of dangerouslySetInnerHTML */}
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>
        </div>

        {/* Mobile Share (Visible only on small screens) */}
        <div className="border-border mt-12 flex items-center gap-4 border-t pt-8 lg:hidden">
          <span className="text-foreground font-sans text-sm font-semibold">Share:</span>
          <ShareButton icon={FaSquareXTwitter} ariaLabel="Share on Twitter" />
          <ShareButton icon={FaFacebook} ariaLabel="Share on Facebook" />
          <ShareButton icon={FaLinkedin} ariaLabel="Share on LinkedIn" />
          <ShareButton icon={LinkIcon} ariaLabel="Copy Link" />
        </div>

        {/* 4. Author Bio Box */}
        <div className="bg-muted/50 border-border mt-16 max-w-3xl rounded-2xl border p-8">
          <div className="flex items-center gap-6">
            <img
              src={article.authorImage}
              alt={article.author}
              className="border-border h-20 w-20 rounded-full border object-cover"
            />
            <div>
              <h4 className="font-geist text-foreground mb-1 text-lg font-bold">
                {article.author}
              </h4>
              <p className="text-primary mb-2 font-sans text-sm font-medium">
                {article.authorRole}
              </p>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                Elena brings over a decade of experience curating luxury spaces across the globe.
                She believes that thoughtful design is the foundation of a life well-lived.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Related Articles */}
        <div className="border-border mt-24 border-t pt-16">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-geist text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              More to Explore
            </h2>
            <Button asChild variant="ghost" className="group hidden font-sans sm:flex">
              <Link to="/blogs">
                View All Journals
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
            {RELATED_ARTICLES.map((post) => (
              <GridArticleCard key={post.id} post={post as any} />
            ))}
          </div>
        </div>
      </div>
      <BulkOrderCTA />
      <Footer />
    </div>
  );
}

// --- Sub-components ---

const ShareButton: React.FC<{ icon: React.ElementType; ariaLabel: string }> = ({
  icon: Icon,
  ariaLabel,
}) => (
  <motion.button
    aria-label={ariaLabel}
    whileHover={{ y: -3, scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-colors"
  >
    <Icon className="h-4 w-4" />
  </motion.button>
);

// Re-using the GridArticleCard from your previous setup
const GridArticleCard: React.FC<{ post: any }> = ({ post }) => {
  return (
    <Link
      to={post.href}
      className="group focus-visible:ring-primary flex h-full flex-col rounded-2xl outline-none focus-visible:ring-2"
    >
      <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-[16/9]">
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
      </div>
    </Link>
  );
};
