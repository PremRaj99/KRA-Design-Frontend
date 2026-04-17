import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/custom/header';
import { Providers } from '@/provider';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/custom/scroll-to-top';
// import FloatingMenu from "@/components/Footer/FloatingMenu";
// import FloatingWhatsapp from "@/components/Footer/FloatingWhatsapp";

export default function RootLayout() {
  return (
    <div className="bg-background text-foreground font-sans relative h-screen min-h-screen w-full overflow-hidden pb-20 md:pb-0">
      
      {/* Global Default SEO Metadata */}
      <Helmet>
        <title>KRA Design | Luxury Home Essentials & Appliances</title>
        <meta 
          name="description" 
          content="Discover our curated collection of premium home appliances, bedroom essentials, signature mirrors, and luxury gifting items at KRA Design." 
        />
        <meta property="og:title" content="KRA Design | Luxury Home Essentials & Appliances" />
        <meta property="og:description" content="Discover our curated collection of premium home appliances, bedroom essentials, signature mirrors, and luxury gifting items at KRA Design." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Providers>
        <ScrollToTop />
        <div id="main-scroll-container" className="relative z-10 h-screen overflow-y-auto">
          <Header />
          {/* Semantic main tag wrapping the router outlet */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
        <Toaster />
      </Providers>
    </div>
  );
}