import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Armchair, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-foreground flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      {/* SEO Integration */}
      <Helmet>
        <title>404 - Page Not Found | KRA Design</title>
        <meta
          name="description"
          content="The page or product you are looking for does not exist or has been moved."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex max-w-md flex-col items-center text-center"
      >
        {/* Animated Illustration */}
        <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, -2, 2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: 'easeInOut',
            }}
            className="bg-muted flex h-32 w-32 items-center justify-center rounded-lg"
          >
            <Armchair className="text-muted-foreground size-18" />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
            className="bg-background border-border absolute right-0 bottom-0 flex size-12 items-center justify-center rounded-full border shadow-lg"
          >
            <SearchX className="text-destructive size-6" />
          </motion.div>
        </div>

        {/* Typography & Messaging */}
        <h1 className="font-geist text-primary/20 text-8xl font-black tracking-tighter select-none">
          404
        </h1>
        <h2 className="font-geist mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Looks like you're lost.
        </h2>
        <p className="text-muted-foreground mt-4 mb-8 font-sans text-base">
          We can't seem to find the page you're looking for. It might have been moved, deleted, or
          perhaps the URL is incorrect.
        </p>

        {/* Navigation Actions */}
        <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
            className="w-full font-sans sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button asChild size="lg" className="w-full font-sans sm:w-auto">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
