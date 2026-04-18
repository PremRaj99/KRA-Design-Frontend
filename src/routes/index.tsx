import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/rootLayout';
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import NotFound from '@/pages/Not-Found';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import CollectionPage from '@/pages/Collections';
import ReelPage from '@/pages/Reel';
import BlogPage from '@/pages/Blog';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },

      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/collections', element: <CollectionPage /> },
      { path: '/reels', element: <ReelPage /> },
      { path: '/blogs', element: <BlogPage /> },
      { path: '/contact', element: <Contact /> },
      { path: '/about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
