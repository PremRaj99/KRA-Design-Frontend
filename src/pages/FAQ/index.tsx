import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, Phone } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/custom/footer';
import { BulkOrderCTA } from '@/components/custom/BulkOrderCTA';

// --- Types & Data ---
interface FAQ {
  id: string;
  question: string;
  answer: React.ReactNode;
}

interface FAQCategory {
  id: string;
  name: string;
  faqs: FAQ[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    id: 'orders',
    name: 'Orders & Tracking',
    faqs: [
      {
        id: 'o1',
        question: 'How do I track my order?',
        answer:
          'Once your order has been dispatched, you will receive an email containing your tracking number and a link to monitor your delivery status. You can also view real-time updates by logging into your KRA Design account dashboard.',
      },
      {
        id: 'o2',
        question: 'Can I modify or cancel my order after placing it?',
        answer:
          'Because we begin processing orders immediately to ensure prompt delivery, modifications or cancellations are only accepted within 24 hours of placing your order. Please contact our concierge team immediately if you need to make changes.',
      },
      {
        id: 'o3',
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and offer financing options through Affirm for eligible purchases.',
      },
    ],
  },
  {
    id: 'shipping',
    name: 'Shipping & Delivery',
    faqs: [
      {
        id: 's1',
        question: 'What is White-Glove Delivery?',
        answer:
          'Our premium White-Glove Delivery service is available for large appliances and luxury furniture. It includes scheduled delivery to your room of choice, unboxing, minor assembly, and complete removal of all packaging materials.',
      },
      {
        id: 's2',
        question: 'Do you ship internationally?',
        answer:
          'Currently, KRA Design primarily services the contiguous United States and Canada. For international inquiries or shipments to Hawaii, Alaska, and US Territories, please contact our support team for a custom freight quote.',
      },
      {
        id: 's3',
        question: 'What happens if I miss my scheduled delivery?',
        answer:
          'If you miss a scheduled freight or white-glove delivery, our logistics partner will reach out to reschedule. Please note that a redelivery fee may apply if notice is not given at least 48 hours prior to the original appointment.',
      },
    ],
  },
  {
    id: 'returns',
    name: 'Returns & Warranties',
    faqs: [
      {
        id: 'r1',
        question: 'What is your return policy?',
        answer:
          'We offer a 30-day return window for eligible, unused items in their original packaging. Please note that custom, made-to-order, and clearance items are final sale. A restocking fee may apply for large appliances.',
      },
      {
        id: 'r2',
        question: 'How do I initiate a return?',
        answer:
          'To start a return, please email support@kradesign.com with your order number. Our team will provide a Return Merchandise Authorization (RMA) and instructions for shipping the item back to our facility.',
      },
      {
        id: 'r3',
        question: 'Do your appliances come with a warranty?',
        answer:
          'Yes, all KRA Design home appliances come with a standard 1-year manufacturer warranty covering defects in materials and workmanship. Extended 3-year and 5-year protection plans are available for purchase at checkout.',
      },
    ],
  },
  {
    id: 'products',
    name: 'Products & Trade',
    faqs: [
      {
        id: 'p1',
        question: 'Do you offer a trade program for interior designers?',
        answer:
          'Yes! The KRA Trade Program offers exclusive pricing, dedicated account management, and tax-exempt purchasing for qualified interior designers, architects, and real estate developers. Apply via our Trade page.',
      },
      {
        id: 'p2',
        question: 'Are color swatches or material samples available?',
        answer:
          'Absolutely. We highly recommend ordering material swatches for our custom upholstery and wood finishes to ensure they perfectly match your space. Swatches can be ordered directly from the product pages.',
      },
    ],
  },
];

// --- Animation Variants ---
const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 } as const,
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  } as const,
};

export default function FaqPage() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(FAQ_DATA[0].id);

  // Derive the currently active category data
  const activeCategory = useMemo(() => {
    return FAQ_DATA.find((cat) => cat.id === activeCategoryId) || FAQ_DATA[0];
  }, [activeCategoryId]);

  const pageTitle = 'Frequently Asked Questions | KRA Design';
  const pageDescription =
    'Find answers to common questions about KRA Design orders, white-glove shipping, returns, warranties, and our trade program.';

  return (
    <div className="bg-background min-h-screen w-full pt-12">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* 1. Header Section */}
        <motion.div
          className="mb-12 text-center sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="bg-muted border-border mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border">
            <MessageCircle className="text-foreground h-6 w-6" />
          </div>
          <h1 className="font-geist text-foreground mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            How can we help?
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl font-sans text-lg leading-relaxed">
            Everything you need to know about purchasing, shipping, and caring for your KRA Design
            pieces.
          </p>
        </motion.div>

        {/* 2. Interactive Category Filter */}
        <div className="no-scrollbar border-border mb-10 overflow-x-auto border-b">
          <div className="flex w-max min-w-full justify-center gap-2 px-1 pb-1">
            {FAQ_DATA.map((category) => {
              const isActive = activeCategoryId === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`focus-visible:ring-ring relative rounded-md px-4 py-3 font-sans text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 ${
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeFaqCategory"
                      className="bg-foreground absolute right-0 bottom-0 left-0 h-0.5"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. FAQ Accordion Content */}
        <div className="min-h-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              variants={listVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            >
              <h2 className="font-geist text-foreground mb-6 text-2xl font-bold">
                {activeCategory.name}
              </h2>

              <Accordion type="single" collapsible className="w-full font-sans">
                {activeCategory.faqs.map((faq) => (
                  <motion.div key={faq.id} variants={itemVariants}>
                    <AccordionItem value={faq.id} className="border-border">
                      <AccordionTrigger className="hover:text-primary py-5 text-left text-base font-semibold transition-colors hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pr-6 pb-6 text-base leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>
        </div>

        <Separator className="bg-border my-16" />

        {/* 4. Contact CTA Block */}
        <motion.div
          className="bg-muted/30 border-border flex flex-col items-center rounded-2xl border p-8 text-center sm:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-geist text-foreground mb-3 text-2xl font-bold">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mx-auto mb-8 max-w-md font-sans">
            Our dedicated concierge team is available to assist you with tailored support for your
            specific needs.
          </p>
          <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-8 font-sans font-medium">
              <a href="mailto:support@kradesign.com">
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 bg-transparent px-8 font-sans font-medium"
            >
              <a href="/contact">
                <Phone className="mr-2 h-4 w-4" />
                Contact Us
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
      <BulkOrderCTA />
      <Footer />
    </div>
  );
}
