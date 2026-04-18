import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';

import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Footer } from '@/components/custom/footer';

// --- Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  },
} as const;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  const pageTitle = 'Contact Us | KRA Design';
  const pageDescription =
    "Get in touch with the KRA Design team for inquiries, bulk orders, or support. We're here to help elevate your space.";

  return (
    <div className="bg-background min-h-screen w-full pt-12">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="font-geist text-foreground mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Let's Start a <br className="hidden sm:block" />
            <span className="text-muted-foreground">Conversation.</span>
          </h1>
          <p className="text-muted-foreground font-sans text-lg leading-relaxed sm:text-xl">
            Whether you have a question about our collections, need assistance with an order, or
            want to discuss a large-scale project, our concierges are ready to assist.
          </p>
        </motion.div>

        {/* Main Grid: Info (Left) & Form (Right) */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Contact Information */}
          <motion.div
            className="order-2 flex flex-col lg:order-1 lg:col-span-5 xl:col-span-4 border-r"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <div className="space-y-8">
              <InfoRow icon={MapPin} title="Visit Our Studio">
                123 Design Avenue, Suite 400
                <br />
                New York, NY 10001
              </InfoRow>

              <InfoRow icon={Mail} title="Email Us">
                <a
                  href="mailto:hello@kradesign.com"
                  className="hover:text-foreground transition-colors"
                >
                  hello@kradesign.com
                </a>
                <br />
                <a
                  href="mailto:support@kradesign.com"
                  className="hover:text-foreground transition-colors"
                >
                  support@kradesign.com
                </a>
              </InfoRow>

              <InfoRow icon={Phone} title="Call Us">
                <a href="tel:+18005550199" className="hover:text-foreground transition-colors">
                  +1 (800) 555-0199
                </a>
              </InfoRow>

              <InfoRow icon={Clock} title="Business Hours">
                Monday - Friday
                <br />
                9:00 AM - 6:00 PM (EST)
              </InfoRow>
            </div>

            <motion.div variants={fadeUpVariant} className="border-border mt-12 border-t pt-10">
              <h3 className="font-geist text-foreground mb-6 text-sm font-semibold tracking-widest uppercase">
                Follow Our Journey
              </h3>
              <div className="flex gap-4">
                <SocialLink icon={FaInstagram} href="#" ariaLabel="Instagram" />
                <SocialLink icon={FaSquareXTwitter} href="#" ariaLabel="Twitter" />
                <SocialLink icon={FaFacebook} href="#" ariaLabel="Facebook" />
                <SocialLink icon={FaYoutube} href="#" ariaLabel="YouTube" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            className="order-1 lg:order-2 lg:col-span-7 xl:col-span-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="bg-card/50 rounded-3xl p-6 backdrop-blur-sm sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-muted-foreground font-sans">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      required
                      placeholder="Jane Doe"
                      className="bg-background border-border focus-visible:ring-primary h-12 font-sans transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-muted-foreground font-sans">
                      Mobile Number
                    </Label>
                    <Input
                      id="mobile"
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      className="bg-background border-border focus-visible:ring-primary h-12 font-sans transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-muted-foreground font-sans">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="bg-background border-border focus-visible:ring-primary h-12 font-sans transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-muted-foreground font-sans">
                    Shipping Address (Optional)
                  </Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, City, Country"
                    className="bg-background border-border focus-visible:ring-primary h-12 font-sans transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-muted-foreground font-sans">
                    Inquiry Type
                  </Label>
                  <Select required defaultValue="general">
                    <SelectTrigger className="bg-background border-border focus-visible:ring-primary h-12 font-sans transition-all">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent className="border-border bg-popover font-sans">
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="order">Order Support</SelectItem>
                      <SelectItem value="bulk">Bulk Order / Trade</SelectItem>
                      <SelectItem value="press">Press & Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-muted-foreground font-sans">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    required
                    placeholder="How can we help you today?"
                    className="bg-background border-border focus-visible:ring-primary min-h-37.5 resize-none font-sans transition-all"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="mt-4 h-12 w-full px-8 font-sans text-base transition-all sm:w-auto"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="border-primary-foreground mr-2 h-4 w-4 rounded-full border-2 border-t-transparent"
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="my-12"></div>
      <Footer />
    </div>
  );
}

// --- Modular Sub-components ---

const InfoRow: React.FC<{ icon: React.ElementType; title: string; children: React.ReactNode }> = ({
  icon: Icon,
  title,
  children,
}) => (
  <motion.div variants={fadeUpVariant} className="group flex items-start gap-4">
    <div className="bg-muted border-border text-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors">
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex flex-col pt-1">
      <h3 className="font-geist text-foreground mb-1 text-base font-semibold">{title}</h3>
      <p className="text-muted-foreground font-sans text-sm leading-relaxed">{children}</p>
    </div>
  </motion.div>
);

const SocialLink: React.FC<{ icon: React.ElementType; href: string; ariaLabel: string }> = ({
  icon: Icon,
  href,
  ariaLabel,
}) => (
  <motion.a
    href={href}
    aria-label={ariaLabel}
    whileHover={{ y: -4, scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:shadow-md"
  >
    <Icon className="h-4 w-4" />
  </motion.a>
);
