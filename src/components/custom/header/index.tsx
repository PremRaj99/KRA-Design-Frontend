import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  MapPin,
  Package,
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  Home,
  Grid,
  PlaySquare,
  FileText,
  Phone,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

// --- Data Constants ---
const PRIMARY_NAV = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Collection', href: '/collection', icon: Grid },
  { label: 'Reel', href: '/reel', icon: PlaySquare },
  { label: 'Blog', href: '/blog', icon: FileText },
  { label: 'Contact', href: '/contact', icon: Phone },
];

const CATEGORY_NAV = [
  { title: 'Home Living', sub: ['Sofas & Lounges', 'Coffee Tables', 'TV Units'] },
  { title: 'Bedroom', sub: ['Beds', 'Mattresses', 'Wardrobes', 'Nightstands'] },
  { title: 'Dining', sub: ['Dining Tables', 'Dining Chairs', 'Bar Stools'] },
  { title: 'Office', sub: ['Desks', 'Office Chairs', 'Bookshelves'] },
  { title: 'Signature Mirrors', sub: ['Wall Mirrors', 'Floor Mirrors', 'Vanity'] },
  { title: 'Bar Essentials', sub: ['Bar Cabinets', 'Wine Racks', 'Trolleys'] },
  { title: 'Limited Edition', sub: ['Exclusive Art', 'Designer Collabs'] },
  { title: 'Luxury Gifting', sub: ['For Him', 'For Her', 'Corporate'] },
  { title: 'New Arrivals', sub: [] },
  { title: 'Collections', sub: ["Summer '26", 'Minimalist Series'] },
];

const PROFILE_MENU = [
  { label: 'My Profile', icon: User },
  { label: 'My Address', icon: MapPin },
  { label: 'My Orders', icon: Package },
  { label: 'My Credits', icon: CreditCard },
  { label: 'Settings', icon: Settings },
];

// --- Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const slideInItem = {
  hidden: { opacity: 0, x: -15 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
} as const;

export const Header: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/80 sticky top-0 z-50 flex w-full flex-col backdrop-blur">
      {/* --- TOP BAR --- */}
      <div className="border-border border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Mobile Trigger */}
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <MobileNav />
            </div>
            <a
              href="/"
              className="font-geist text-foreground shrink-0 text-xl font-bold tracking-tight sm:text-2xl"
            >
              KRA Design
            </a>
          </div>

          {/* Desktop Primary Nav */}
          <nav className="hidden flex-1 items-center justify-center px-6 lg:flex">
            <ul className="flex items-center gap-4">
              {PRIMARY_NAV.map((link) => (
                <motion.li
                  key={link.label}
                  className="relative inline-block"
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground relative z-30 flex items-center gap-1.5 p-2 font-sans text-sm font-semibold transition-colors"
                  >
                    <link.icon className="h-4 w-4 opacity-70 mix-blend-difference" />
                    <span className="mix-blend-difference">{link.label}</span>
                  </Link>

                  {/* AnimatePresence is required for conditionally rendered motion components */}
                  <AnimatePresence>
                    {hoveredLink === link.label && (
                      <motion.div
                        layoutId="primary-nav-underline"
                        className="bg-primary/30 border-primary absolute inset-0 z-10 rounded-md border"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Action Icons with Micro-interactions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" aria-label="Search" asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-foreground hover:bg-muted hover:text-primary"
              >
                <Search className="h-5 w-5" />
              </motion.button>
            </Button>

            <Button variant="ghost" size="icon" aria-label="Cart" asChild>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-foreground hover:bg-muted hover:text-primary relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-primary text-primary-foreground absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full font-sans text-[10px] font-bold"
                >
                  3
                </motion.span>
              </motion.button>
            </Button>

            <ProfileDropdown />
          </div>
        </div>
      </div>

      {/* --- SECONDARY BAR (Categories) --- */}
      <div className="border-border bg-muted/10 hidden border-b lg:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2">
            {CATEGORY_NAV.map((category) => (
              <li
                key={category.title}
                className="relative"
                // 1. React handles the hover state now, not CSS
                onMouseEnter={() => setActiveCategory(category.title)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  to={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1 py-2 font-sans text-[13px] font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category.title ? 'text-foreground' : ''
                  }`}
                >
                  {category.title}
                  {category.sub.length > 0 && (
                    <ChevronDown
                      className={`h-3 w-3 transition-transform ${
                        activeCategory === category.title ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>

                {/* 2. AnimatePresence sits OUTSIDE the conditional render */}
                <AnimatePresence mode="popLayout">
                  {activeCategory === category.title && category.sub.length > 0 && (
                    <div className="absolute top-full left-0 z-50 pt-2">
                      <motion.div
                        // 3. Shared layoutId makes the box glide and morph between categories
                        layoutId="dropdown-bottom-nav"
                        // initial={{ opacity: 0, y: -10 }}
                        // animate={{ opacity: 1, y: 0 }}
                        // exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
                        // transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        className="border-border bg-popover text-popover-foreground flex min-w-50 flex-col overflow-hidden rounded-md border p-2 shadow-md"
                      >
                        {/* Optional: Add a subtle fade to the text so it doesn't look messy while the box is resizing */}
                        <motion.div
                          initial={{ y: -5, filter: 'blur(4px)' }}
                          animate={{ y: 0, filter: 'blur(0px)', transition: { delay: 0.1 } }}
                          // exit={{ y: -5, transition: { duration: 0.1 } }}
                          className="flex flex-col"
                        >
                          {category.sub.map((subItem) => (
                            <Link
                              key={subItem}
                              to={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-sm px-3 py-2 text-sm whitespace-nowrap transition-colors"
                            >
                              {subItem}
                            </Link>
                          ))}
                        </motion.div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

// --- Sub-components ---

const MobileNav = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="Open Menu" asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-foreground hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
        </motion.button>
      </Button>
    </SheetTrigger>
    <SheetContent
      side="left"
      className="bg-background flex w-75 flex-col overflow-y-auto p-4 sm:w-100"
    >
      <SheetHeader className="border-border shrink-0 border-b pb-4">
        <SheetTitle className="font-geist text-foreground text-left text-xl font-bold">
          KRA Design
        </SheetTitle>
      </SheetHeader>

      <div className="no-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto py-6">
        {/* Animated Primary Links */}
        <motion.nav
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-2"
        >
          {PRIMARY_NAV.map((link) => (
            <motion.a
              variants={slideInItem}
              whileHover={{ x: 6, color: 'var(--color-primary)' }} // Uses OKLCH root variable natively
              key={link.label}
              href={link.href}
              className="text-foreground flex items-center gap-4 rounded-md px-2 py-2 font-sans text-lg font-medium transition-colors"
            >
              <div className="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-md">
                <link.icon className="h-4 w-4" />
              </div>
              {link.label}
            </motion.a>
          ))}
        </motion.nav>

        <div className="bg-border h-px w-full" />

        {/* Categories Accordion */}
        <div className="flex flex-col">
          <p className="text-muted-foreground mb-2 px-2 text-xs font-bold tracking-wider uppercase">
            Shop by Category
          </p>
          <Accordion type="single" collapsible className="w-full">
            {CATEGORY_NAV.map((category) => (
              <AccordionItem
                key={category.title}
                value={category.title}
                className="border-b-0 px-2"
              >
                {category.sub.length > 0 ? (
                  <>
                    <AccordionTrigger className="text-muted-foreground hover:text-foreground py-3 font-sans text-base font-medium hover:no-underline">
                      {category.title}
                    </AccordionTrigger>
                    <AccordionContent className="border-border/50 mt-1 ml-2 flex flex-col gap-3 border-l pb-4 pl-4">
                      <motion.a
                        whileHover={{ x: 4 }}
                        href={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-foreground text-sm font-semibold"
                      >
                        View All {category.title}
                      </motion.a>
                      {category.sub.map((sub) => (
                        <motion.a
                          whileHover={{ x: 4 }}
                          key={sub}
                          href={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-muted-foreground hover:text-foreground font-sans text-sm transition-colors"
                        >
                          {sub}
                        </motion.a>
                      ))}
                    </AccordionContent>
                  </>
                ) : (
                  <motion.a
                    whileHover={{ x: 4 }}
                    href={`/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-muted-foreground hover:text-foreground flex flex-1 items-center justify-between py-3 font-sans text-base font-medium"
                  >
                    {category.title}
                  </motion.a>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

const ProfileDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="Profile" asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-foreground hover:bg-muted hover:text-primary"
        >
          <User className="h-5 w-5" />
        </motion.button>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      className="bg-popover text-popover-foreground border-border w-56"
      align="end"
      forceMount
    >
      <DropdownMenuLabel className="font-geist font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-foreground text-sm leading-none font-medium">John Doe</p>
          <p className="text-muted-foreground text-xs leading-none">john.doe@example.com</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-border" />
      <DropdownMenuGroup>
        {PROFILE_MENU.map((item) => (
          <DropdownMenuItem
            key={item.label}
            className="focus:bg-accent focus:text-accent-foreground cursor-pointer font-sans"
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
      <DropdownMenuSeparator className="bg-border" />
      <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer font-sans">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
