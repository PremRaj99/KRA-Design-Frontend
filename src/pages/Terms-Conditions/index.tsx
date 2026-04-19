import { motion } from 'framer-motion';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';
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

const LAST_UPDATED = 'April 20, 2026';

const TERMS_SECTIONS = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: (
      <>
        <p>
          Welcome to KRA Design. By accessing or using our platform, you agree to be bound by these
          Terms and Conditions.
        </p>
        <p>
          These terms govern your use of our website, services, and products. If you do not agree,
          you should not use our platform.
        </p>
      </>
    ),
  },
  {
    id: 'eligibility',
    title: '2. Eligibility & Account Use',
    content: (
      <>
        <p>You must be at least 18 years old or have legal parental consent to use our services.</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>You are responsible for maintaining the confidentiality of your account.</li>
          <li>All activities under your account are your responsibility.</li>
          <li>Providing false or misleading information may result in account suspension.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'products',
    title: '3. Product Information & Pricing',
    content: (
      <>
        <p>
          We strive to ensure all product descriptions, pricing, and availability are accurate.
          However, errors may occur.
        </p>
        <p className="mt-4">
          KRA Design reserves the right to correct pricing errors, update product details, or cancel
          orders if inaccuracies are detected.
        </p>
      </>
    ),
  },
  {
    id: 'orders',
    title: '4. Orders & Payments',
    content: (
      <>
        <p>All orders placed through our platform are subject to acceptance and availability.</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Payments must be completed at checkout using supported methods.</li>
          <li>We reserve the right to cancel or refuse any order.</li>
          <li>Fraudulent transactions will be reported and blocked.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'shipping',
    title: '5. Shipping & Delivery',
    content: (
      <>
        <p>
          Delivery timelines are estimates and may vary depending on location, logistics, and
          product type.
        </p>
        <p className="mt-4">
          KRA Design is not liable for delays caused by third-party logistics providers or
          unforeseen circumstances.
        </p>
      </>
    ),
  },
  {
    id: 'returns',
    title: '6. Returns & Refunds',
    content: (
      <>
        <p>
          Returns and refunds are governed by our Refund Policy. Please review it carefully before
          making a purchase.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: '7. Limitation of Liability',
    content: (
      <>
        <p>
          KRA Design shall not be held liable for any indirect, incidental, or consequential damages
          arising from the use of our platform.
        </p>

        <div className="bg-destructive/10 border-destructive/20 text-destructive mt-4 flex items-start gap-3 rounded-xl border p-4 font-medium">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm leading-relaxed">
            Our total liability shall not exceed the amount paid by you for the specific product or
            service.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'changes',
    title: '8. Changes to Terms',
    content: (
      <>
        <p>
          We reserve the right to update these Terms at any time. Continued use of the platform
          after updates constitutes acceptance.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '9. Contact Information',
    content: (
      <>
        <p>For any questions regarding these Terms, please contact our support team.</p>
        <div className="bg-muted/50 border-border mt-6 rounded-xl border p-6">
          <p className="text-muted-foreground text-sm">support@kradesign.com</p>
        </div>
      </>
    ),
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 } as const,
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  } as const,
};

export default function TermsConditionsPage() {
  const [activeSection, setActiveSection] = useState(TERMS_SECTIONS[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = TERMS_SECTIONS.map((sec) => document.getElementById(sec.id));

      const scrollPosition = window.scrollY + 150;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(TERMS_SECTIONS[i].id);
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
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-background min-h-screen w-full pt-8">
      <Helmet>
        <title>Terms & Conditions | KRA Design</title>
        <meta
          name="description"
          content="Read the Terms and Conditions for using KRA Design's home essentials marketplace, including policies on usage, orders, and liability."
        />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
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
              <BreadcrumbPage>Terms & Conditions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-muted border-border flex h-10 w-10 items-center justify-center rounded-full border">
                <FileText className="text-foreground h-5 w-5" />
              </div>
              <Badge variant="outline" className="text-xs tracking-widest uppercase">
                Last Updated: {LAST_UPDATED}
              </Badge>
            </div>

            <h1 className="font-geist text-foreground mb-6 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
              Terms & Conditions
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl">
              These terms define how you interact with our platform, services, and products. Read
              them carefully before using KRA Design.
            </p>
          </motion.div>
        </div>

        <Separator className="mb-12" />

        <div className="flex flex-col lg:flex-row lg:gap-16">
          {/* Sidebar */}
          <div className="sticky top-32 hidden lg:block lg:w-1/4">
            <h4 className="mb-6 text-sm font-semibold uppercase">Contents</h4>

            <nav className="border-border relative flex flex-col gap-3 border-l pl-4">
              <motion.div
                className="bg-foreground absolute -left-px w-0.5"
                animate={{
                  y: TERMS_SECTIONS.findIndex((s) => s.id === activeSection) * 36,
                }}
              />

              {TERMS_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left text-sm ${
                    activeSection === section.id
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="w-full max-w-3xl lg:w-3/4">
            {TERMS_SECTIONS.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-16 scroll-mt-32"
              >
                <h2 className="mb-6 text-2xl font-bold">{section.title}</h2>
                <div className="text-muted-foreground space-y-4">{section.content}</div>
              </motion.section>
            ))}

            <Separator className="my-16" />

            {/* CTA */}
            <div className="bg-muted/30 border-border flex items-center justify-between rounded-2xl border p-8">
              <div>
                <h3 className="text-foreground font-bold">Have questions about our terms?</h3>
                <p className="text-muted-foreground text-sm">
                  Our team will clarify anything you’re unsure about.
                </p>
              </div>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-foreground text-background inline-flex h-10 items-center rounded-full px-6"
              >
                Contact Us
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
