import { motion } from 'framer-motion';
import { ArrowRight, Mail, RefreshCcw, ShieldAlert } from 'lucide-react';
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
    id: 'overview',
    title: '1. Overview & Return Window',
    content: (
      <>
        <p>
          At KRA Design, we curate our home appliances and furniture with uncompromising standards
          of quality. However, we understand that sometimes a piece may not perfectly suit your
          space.
        </p>
        <p>
          We offer a <strong>30-day return window</strong> from the date of delivery for eligible
          items. To ensure a smooth process, please review our eligibility criteria and return
          procedures below.
        </p>
      </>
    ),
  },
  {
    id: 'eligibility',
    title: '2. Return Eligibility',
    content: (
      <>
        <p>
          To be eligible for a return and full refund, the item must meet the following conditions:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>The item must be in its original, unused, and uninstalled condition.</li>
          <li>
            It must be returned in its original packaging, including all manuals, accessories, and
            protective materials.
          </li>
          <li>The item must be free from scratches, blemishes, or signs of wear.</li>
        </ul>
        <p className="mt-4">
          Items that do not meet these criteria may be subject to a restocking fee or may be
          declined for return at our discretion.
        </p>
      </>
    ),
  },
  {
    id: 'non-returnable',
    title: '3. Non-Returnable Items',
    content: (
      <>
        <p>
          For hygiene, customization, and safety reasons, the following items are considered final
          sale and cannot be returned:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Custom, bespoke, or made-to-order furniture.</li>
          <li>Opened bedding, mattresses, and linens.</li>
          <li>Clearance, open-box, or final-sale showroom items.</li>
          <li>Gift cards and design consultation fees.</li>
          <li>Installed or used kitchen and home appliances.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'return-process',
    title: '4. The Return Process',
    content: (
      <>
        <p>To initiate a return, please follow these steps:</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>
            <strong>Request a Return:</strong> Contact our concierge team at support@kradesign.com
            with your order number and reason for return.
          </li>
          <li>
            <strong>Approval & Authorization:</strong> Once approved, we will provide a Return
            Merchandise Authorization (RMA) number and detailed shipping instructions.
          </li>
          <li>
            <strong>Packaging:</strong> Securely pack the item in its original packaging. Ensure the
            RMA number is clearly visible on the shipping label (do not write directly on the
            original box).
          </li>
          <li>
            <strong>Shipping:</strong> For large furniture and heavy appliances, our white-glove
            logistics team will coordinate a pickup. Standard shipping fees apply and will be
            deducted from your refund.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 'refunds',
    title: '5. Processing Your Refund',
    content: (
      <>
        <p>
          Once your returned item is received and inspected at our facility, we will notify you of
          the approval or rejection of your refund.
        </p>
        <p className="mt-4">
          Approved refunds will be processed automatically to your original method of payment within{' '}
          <strong>5 to 7 business days</strong>. Please note that original shipping and white-glove
          delivery charges are non-refundable. A restocking fee of up to 15% may apply for large
          appliances and freight items.
        </p>
      </>
    ),
  },
  {
    id: 'damaged-items',
    title: '6. Damaged or Defective Items',
    content: (
      <>
        <p>
          Our white-glove delivery team conducts thorough inspections prior to delivery. However, we
          ask that you immediately inspect your items upon receipt.
        </p>
        <div className="bg-destructive/10 border-destructive/20 text-destructive mt-4 flex items-start gap-3 rounded-xl border p-4 font-medium">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm leading-relaxed">
            If an item arrives damaged or defective, you must report it to our support team within{' '}
            <strong>48 hours of delivery</strong>. Please include clear photographs of the damage
            and the packaging. We will expedite a replacement or repair at no additional cost to
            you.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'contact-support',
    title: '7. Contact Support',
    content: (
      <>
        <p>
          If you have any questions regarding our return policy or need assistance with an existing
          order, our dedicated concierge team is ready to help.
        </p>
        <div className="bg-muted/50 border-border mt-6 rounded-xl border p-6">
          <div className="text-foreground mb-2 flex items-center gap-3 font-medium">
            <Mail className="text-muted-foreground h-5 w-5" />
            support@kradesign.com
          </div>
          <p className="text-muted-foreground ml-8 text-sm">
            Available Monday - Friday
            <br />
            9:00 AM - 6:00 PM (EST)
          </p>
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

export default function RefundPolicyPage() {
  const [activeSection, setActiveSection] = useState(POLICY_SECTIONS[0].id);

  const pageTitle = 'Refund & Return Policy | KRA Design';
  const pageDescription =
    'Review the KRA Design return window, eligibility criteria, and refund process for our luxury home appliances and furniture.';

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
              <BreadcrumbPage>Refund Policy</BreadcrumbPage>
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
                <RefreshCcw className="text-foreground h-5 w-5" />
              </div>
              <Badge
                variant="outline"
                className="text-muted-foreground border-border font-sans text-xs tracking-widest uppercase"
              >
                Last Updated: {LAST_UPDATED}
              </Badge>
            </div>

            <h1 className="font-geist text-foreground mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Refund & Return Policy
            </h1>
            <p className="text-muted-foreground font-sans text-lg leading-relaxed sm:text-xl">
              We stand behind the craftsmanship of every piece we sell. If your selection isn't the
              perfect fit, we are here to help guide you through a seamless return process.
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

            {/* CTA Block */}
            <div className="bg-muted/30 border-border flex flex-col justify-between gap-6 rounded-2xl border p-8 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-geist text-foreground mb-1 text-lg font-bold">
                  Need to start a return?
                </h3>
                <p className="text-muted-foreground font-sans text-sm">
                  Our concierge team will assist you with scheduling and logistics.
                </p>
              </div>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-foreground text-background hover:bg-primary inline-flex h-10 items-center justify-center rounded-full px-6 font-sans text-sm font-medium transition-colors"
              >
                Contact Concierge
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
      <BulkOrderCTA />
      <Footer />
    </div>
  );
}
