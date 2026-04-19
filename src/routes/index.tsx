import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/rootLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/Not-Found';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import CollectionPage from '@/pages/Collections';
import ReelPage from '@/pages/Reel';
import BlogPage from '@/pages/Blog';
import ProductDetailPage from '@/pages/Collections/[id]';
import BlogDetailPage from '@/pages/Blog/[id]';
import TermsPage from '@/pages/Terms-Conditions';
import ShippingPolicy from '@/pages/Shipping-Policy';
import RefundPolicy from '@/pages/Refund-Policy';
import FAQ from '@/pages/FAQ';
import PrivacyPolicy from '@/pages/Privacy-Policy';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },

      { path: '/login', element: <Login /> },
      { path: '/collections', element: <CollectionPage /> },
      { path: '/collections/:id', element: <ProductDetailPage /> },
      { path: '/reels', element: <ReelPage /> },
      { path: '/blogs', element: <BlogPage /> },
      { path: '/blog/:id', element: <BlogDetailPage /> },
      { path: '/contact', element: <Contact /> },
      { path: '/about', element: <About /> },
      { path: '/terms', element: <TermsPage /> },
      { path: '/shipping', element: <ShippingPolicy /> },
      { path: '/refund', element: <RefundPolicy /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/privacy', element: <PrivacyPolicy /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]);
