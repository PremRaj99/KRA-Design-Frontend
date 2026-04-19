import { motion } from 'framer-motion';
import { Globe, Mail, MapPin, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/custom/footer';
import { BulkOrderCTA } from '@/components/custom/BulkOrderCTA';

// --- Data Constants ---
const LAST_UPDATED = 'April 20, 2026';

const POLICY_SECTIONS = [
  {
    id: 'delivery-methods',
    title: '1. Delivery Methods & Tiers',
    content: (
      <>
        <p>
          At KRA Design, we believe the final step of your purchase should be as seamless as the
          first. We offer several delivery tiers to accommodate the diverse needs of our clients,
          from small decor items to large architectural furniture.
        </p>
        <ul className="mt-6 list-none space-y-4">
          <li className="bg-muted/30 border-border rounded-xl border p-5">
            <strong className="text-foreground mb-1 block">Standard Parcel Delivery</strong>
            <p className="text-sm">
              For smaller items (decor, lighting, textiles). Delivered via standard couriers (FedEx,
              UPS). Usually arrives within 3-5 business days after processing.
            </p>
          </li>
          <li className="bg-muted/30 border-border rounded-xl border p-5">
            <strong className="text-foreground mb-1 block">Threshold Freight Delivery</strong>
            <p className="text-sm">
              For medium-to-large furniture. Items are delivered to the first dry area of your
              residence (garage, covered porch, or apartment lobby). Signature required.
            </p>
          </li>
          <li className="bg-primary/5 border-primary/20 rounded-xl border p-5">
            <strong className="text-foreground mb-1 flex items-center gap-2">
              <span className="bg-primary h-2 w-2 rounded-full" />
              White-Glove Delivery Service
            </strong>
            <p className="text-sm">
              Our premium service for luxury appliances and large furniture. Includes scheduled
              delivery, placement in the room of your choice, unpacking, minor assembly, and removal
              of all packaging materials.
            </p>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'processing-times',
    title: '2. Order Processing Times',
    content: (
      <>
        <p>
          We strive to dispatch your selections promptly. Processing times vary based on the item
          type and availability:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>
            <strong>In-Stock Items:</strong> Processed and prepared for shipment within 1-2 business
            days.
          </li>
          <li>
            <strong>Made-to-Order & Custom Pieces:</strong> Please allow 4-8 weeks for craftsmanship
            and preparation. Specific lead times are noted on the individual product pages.
          </li>
          <li>
            <strong>Backordered Items:</strong> We will notify you immediately with an estimated
            restock and shipping date.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'shipping-rates',
    title: '3. Shipping Rates',
    content: (
      <>
        <p>
          Shipping costs are calculated dynamically at checkout based on the delivery destination,
          total weight, and selected delivery tier.
        </p>
        <p className="mt-4">
          <strong>Complimentary Standard Shipping</strong> is automatically applied to all orders
          exceeding $500 (excluding oversized items requiring freight or white-glove service).
        </p>
      </>
    ),
  },
  {
    id: 'international-shipping',
    title: '4. International Shipping',
    content: (
      <>
        <p>Currently, KRA Design primarily serves the contiguous United States and Canada.</p>
        <div className="bg-muted/50 border-border mt-4 flex items-start gap-3 rounded-xl border p-4">
          <Globe className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm leading-relaxed">
            For international inquiries or deliveries to Hawaii, Alaska, and US Territories, please
            contact our concierge team before placing your order to receive a custom freight quote.
            International customers are responsible for all applicable customs duties, taxes, and
            import fees.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'tracking',
    title: '5. Tracking Your Order',
    content: (
      <>
        <p>
          Upon dispatch, you will receive a shipping confirmation email containing your tracking
          number and a link to monitor your delivery's progress.
        </p>
        <p className="mt-4">
          For White-Glove and Freight deliveries, our logistics partner will contact you directly
          via phone or email to schedule a specific delivery window that fits your schedule.
        </p>
      </>
    ),
  },
  {
    id: 'receiving-inspecting',
    title: '6. Receiving & Inspecting',
    content: (
      <>
        <p>
          We request that you or an authorized adult (18 years or older) be present to receive and
          sign for all Freight and White-Glove deliveries.
        </p>
        <p className="mt-4">
          <strong>Crucial Step:</strong> Please inspect your items immediately upon receipt. If you
          notice any external damage to the packaging or the item itself, you must note "Damaged" on
          the delivery receipt before signing and contact our support team within 48 hours.
        </p>
      </>
    ),
  },
  {
    id: 'contact-logistics',
    title: '7. Logistics Support',
    content: (
      <>
        <p>
          If you need to change a delivery address, update contact information, or have questions
          about a pending shipment, our logistics team is ready to assist.
        </p>
        <div className="bg-muted/50 border-border mt-6 rounded-xl border p-6">
          <div className="text-foreground mb-2 flex items-center gap-3 font-medium">
            <Mail className="text-muted-foreground h-5 w-5" />
            logistics@kradesign.com
          </div>
          <div className="text-foreground flex items-center gap-3 font-medium">
            <MapPin className="text-muted-foreground h-5 w-5" />
            Track via your KRA Account Dashboard
          </div>
        </div>
      </>
    ),
  },
];

// --- Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 30 } as const,
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  } as const,
};

export default function ShippingPolicyPage() {
  const [activeSection, setActiveSection] = useState(POLICY_SECTIONS[0].id);

  const pageTitle = 'Shipping & Delivery Policy | KRA Design';
  const pageDescription =
    "Learn about KRA Design's shipping methods, white-glove delivery services, processing times, and logistics policies.";

  // Scroll Spy Logic for Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = POLICY_SECTIONS.map((sec) => document.getElementById(sec.id));
      const scrollPosition = window.scrollY + 150; // Offset for sticky header/spacing

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(POLICY_SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // 100px top offset
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background min-h-screen w-full pt-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
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
              <BreadcrumbLink href="/legal">Legal</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Shipping Policy</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* 2. Page Header */}
        <div className="mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-muted border-border flex h-10 w-10 items-center justify-center rounded-full border">
                <Truck className="text-foreground h-5 w-5" />
              </div>
              <Badge
                variant="outline"
                className="text-muted-foreground border-border font-sans text-xs tracking-widest uppercase"
              >
                Last Updated: {LAST_UPDATED}
              </Badge>
            </div>

            <h1 className="font-geist text-foreground mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Shipping & Delivery
            </h1>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed sm:text-xl">
              From our studio to your sanctuary. We partner with specialized logistics providers to
              ensure your selections arrive safely and on time.
            </p>
          </motion.div>
        </div>

        <Separator className="bg-border mb-12" />

        {/* 3. Main Content Area with Sticky Sidebar */}
        <div className="flex flex-col items-start lg:flex-row lg:gap-16">
          {/* Table of Contents Sidebar (Sticky on Desktop) */}
          <div className="sticky top-32 hidden shrink-0 lg:block lg:w-1/4">
            <h4 className="font-geist text-foreground mb-6 text-sm font-semibold tracking-widest uppercase">
              Contents
            </h4>
            <nav className="border-border relative flex flex-col gap-3 border-l pl-4">
              {/* Animated active indicator line */}
              <motion.div
                className="bg-foreground absolute top-0 -left-px w-0.5 transition-all duration-300 ease-out"
                initial={false}
                animate={{
                  height: 24, // Approximate height of a link
                  y: POLICY_SECTIONS.findIndex((s) => s.id === activeSection) * 36, // 36px is roughly the height + gap
                }}
              />

              {POLICY_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`group flex items-center py-1 text-left font-sans text-sm transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground/80'
                  }`}
                >
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    {section.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Policy Content (Narrow readable column) */}
          <div className="w-full max-w-3xl lg:w-3/4">
            {POLICY_SECTIONS.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="mb-16 scroll-mt-32" // scroll-mt offsets the sticky header
              >
                <h2 className="font-geist text-foreground mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
                  {section.title}
                </h2>
                <div className="text-muted-foreground space-y-4 font-sans text-base leading-relaxed">
                  {section.content}
                </div>
              </motion.section>
            ))}

            <Separator className="bg-border my-16" />

            {/* Contextual Help Block */}
            <div className="bg-muted/30 border-border flex flex-col justify-between gap-6 rounded-2xl border p-8 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-geist text-foreground mb-1 text-lg font-bold">
                  Questions about an existing order?
                </h3>
                <p className="text-muted-foreground font-sans text-sm">
                  Log in to your account to view real-time tracking updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BulkOrderCTA />
      <Footer />
    </div>
  );
}
