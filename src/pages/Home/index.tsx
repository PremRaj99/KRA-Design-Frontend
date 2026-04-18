import { Helmet } from 'react-helmet-async';
import { HeroSlider } from './HeroSlider'; // Adjust path
import { TopCategories } from './TopCategories';
import { TrendingReels } from './TrendingReels';
import { BentoCategories } from './BentoCategories';
import { LatestBlogs } from './LatestBlogs';
// import { FeaturedCategories } from '@/components/custom/FeaturedCategories';

export default function HomePage() {
  return (
    <main className="bg-background min-h-body flex w-full flex-col">
      {/* Page-Specific SEO */}
      <Helmet>
        <title>Home Essentials & Luxury Appliances | KRA Design</title>
        <meta
          name="description"
          content="Transform your home with KRA Design. Shop premium home appliances, exclusive living room furniture, signature mirrors, and luxury gifting."
        />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>

      {/* Hero Section */}
      <HeroSlider />
      <TopCategories />
      <TrendingReels />
      <BentoCategories />
      <LatestBlogs />
      {/* Subsequent Page Sections can go here */}
      {/* <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <FeaturedCategories />
      </div> */}
    </main>
  );
}
