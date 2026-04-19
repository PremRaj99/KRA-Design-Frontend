import { motion, useInView } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa';
import React, { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

// --- Types & Data Constants ---
interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FOOTER_NAVIGATION: FooterSection[] = [
  {
    title: 'Shop',
    links: [
      { label: 'Living Room', href: '/collections/living-room' },
      { label: 'Bedroom', href: '/collections/bedroom' },
      { label: 'Kitchen & Dining', href: '/collections/kitchen' },
      { label: 'Signature Mirrors', href: '/collections/signature-mirrors' },
      { label: 'New Arrivals', href: '/new-arrivals' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Design Services', href: '/design-services' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Shipping & Returns', href: '/shipping' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Track Order', href: '/track-order' },
      { label: 'Returns & Refunds', href: '/refund' },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaFacebook, href: '#', label: 'Facebook' },
  { icon: FaSquareXTwitter, href: '#', label: 'Twitter' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } },
} as const;

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });

  return (
    <footer
      ref={footerRef}
      className="bg-muted/30 border-border w-full border-t pt-16 sm:pt-24 lg:pt-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8"
        >
          {/* Left Column: Brand & Newsletter (Spans 4 cols) */}
          <motion.div variants={itemVariants} className="flex flex-col lg:col-span-4 lg:pr-8">
            <a href="/" className="font-geist text-foreground text-2xl font-bold tracking-tight">
              KRA Design
            </a>
            <p className="text-muted-foreground mt-4 max-w-sm font-sans text-sm leading-relaxed">
              Curating exceptional home appliances and signature furniture pieces to elevate your
              daily living experience.
            </p>

            <div className="mt-8">
              <h4 className="font-geist text-foreground mb-3 text-sm font-semibold">
                Join our Inner Circle
              </h4>
              <p className="text-muted-foreground mb-4 font-sans text-xs">
                Subscribe for exclusive launches, early access to sales, and design inspiration.
              </p>
              <form
                className="flex w-full max-w-sm items-center gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder="Email address"
                  className="bg-background border-border focus-visible:ring-primary h-11 rounded-full px-4 font-sans text-sm"
                  required
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-11 w-11 shrink-0 rounded-full transition-transform active:scale-95"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Right Columns: Navigation Links (Spans 8 cols) */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {FOOTER_NAVIGATION.map((section) => (
              <motion.div key={section.title} variants={itemVariants} className="flex flex-col">
                <h3 className="font-geist text-foreground mb-5 text-sm font-semibold tracking-wider uppercase">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group text-muted-foreground hover:text-foreground inline-flex items-center font-sans text-sm transition-colors"
                      >
                        {/* Micro-interaction: Tiny translation on hover */}
                        <motion.span
                          whileHover={{ x: 4 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        >
                          {link.label}
                        </motion.span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar: Socials, Copyright, Legal */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mt-16 pb-8 sm:mt-24"
        >
          <Separator className="bg-border mb-8" />
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Contact Quick Links */}
            <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-4 font-sans text-xs sm:gap-6">
              <a
                href="mailto:hello@kradesign.com"
                className="hover:text-foreground flex items-center transition-colors"
              >
                <Mail className="mr-2 h-3.5 w-3.5" />
                hello@kradesign.com
              </a>
              <span className="bg-border hidden h-1 w-1 rounded-full sm:inline-block" />
              <a
                href="tel:+1234567890"
                className="hover:text-foreground flex items-center transition-colors"
              >
                <Phone className="mr-2 h-3.5 w-3.5" />
                1-800-KRA-HOME
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-background border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="text-muted-foreground mt-8 flex flex-col items-center justify-between gap-4 font-sans text-xs md:flex-row">
            <p>© {new Date().getFullYear()} KRA Design. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
