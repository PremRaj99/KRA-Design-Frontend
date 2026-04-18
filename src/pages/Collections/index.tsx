import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Search, SlidersHorizontal, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { ProductCard, type Category } from '@/components/custom/ProductCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { BulkOrderCTA } from '@/components/custom/BulkOrderCTA';
import { Footer } from '@/components/custom/footer';
import { MOCK_PRODUCTS } from '@/data/productData';

const CATEGORY_SUMMARIES: Record<Category, { title: string; description: string }> = {
  All: {
    title: 'The Full Collection',
    description:
      'Discover our complete collection of premium home essentials, meticulously crafted for modern living and uncompromising comfort.',
  },
  'Living Room': {
    title: 'Living Room Essentials',
    description:
      'Elevate your gathering spaces with our curated selection of mid-century modern sofas, architectural coffee tables, and premium accent seating.',
  },
  Bedroom: {
    title: 'Luxury Bedroom',
    description:
      'Create your personal sanctuary with our luxurious bed frames, orthopedic mattresses, and calming textural decor.',
  },
  Kitchen: {
    title: 'Modern Kitchen',
    description:
      'Redefine culinary experiences with smart appliances, minimalist cookware, and elegant dining sets built for the modern chef.',
  },
  Decor: {
    title: 'Signature Decor',
    description:
      'Add the perfect finishing touches with our signature mirrors, abstract gallery art, and ambient lighting solutions.',
  },
};

// --- Animation Variants ---
const gridVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } },
} as const;

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Featured');

  // Filter States
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>([]);

  // Derived filter options based on current category
  const availableSubCats = useMemo(() => {
    const products =
      activeCategory === 'All'
        ? MOCK_PRODUCTS
        : MOCK_PRODUCTS.filter((p) => p.category === activeCategory);
    return Array.from(new Set(products.map((p) => p.subCategory)));
  }, [activeCategory]);

  // Main Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let products = MOCK_PRODUCTS;

    if (activeCategory !== 'All') {
      products = products.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      products = products.filter((p) => p.title.toLowerCase().includes(q));
    }

    // Apply Price Filter
    products = products.filter((p) => {
      const pPrice = p.discountedPrice || p.price;
      return pPrice >= priceRange[0] && pPrice <= priceRange[1];
    });

    // Apply Rating Filter
    if (selectedRatings.length > 0) {
      const minRating = Math.min(...selectedRatings);
      products = products.filter((p) => p.rating >= minRating);
    }

    // Apply SubCategory Filter
    if (selectedSubCats.length > 0) {
      products = products.filter((p) => selectedSubCats.includes(p.subCategory));
    }

    // Apply Sort
    if (sortBy === 'Price: Low to High') {
      products = [...products].sort(
        (a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price),
      );
    } else if (sortBy === 'Price: High to Low') {
      products = [...products].sort(
        (a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price),
      );
    }

    return products;
  }, [activeCategory, searchQuery, sortBy, priceRange, selectedRatings, selectedSubCats]);

  const clearFilters = () => {
    setPriceRange([0, 2000]);
    setSelectedRatings([]);
    setSelectedSubCats([]);
  };

  // --- HELMET / SEO FIX ---
  // Constructing a single string variable for the title prevents Helmet array errors
  const currentCategoryData = CATEGORY_SUMMARIES[activeCategory];
  const pageTitle = `${currentCategoryData.title} | KRA Design`;
  const pageDescription = currentCategoryData.description;

  const activeFiltersCount =
    selectedRatings.length +
    selectedSubCats.length +
    (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0);

  return (
    <div className="bg-background min-h-screen w-full pt-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
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
              <BreadcrumbLink href="/collections">Collections</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {activeCategory === 'All' ? 'All Products' : activeCategory}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* 2. Interactive Category Header */}
        <div className="mb-12 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <h1 className="font-geist text-foreground mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {CATEGORY_SUMMARIES[activeCategory].title}
              </h1>
              <p className="text-muted-foreground font-sans text-lg leading-relaxed sm:text-xl">
                {CATEGORY_SUMMARIES[activeCategory].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. Category Tabs */}
        <div className="no-scrollbar border-border mb-8 flex w-full overflow-x-auto border-b pb-px">
          <div className="flex gap-6 sm:gap-8">
            {(Object.keys(CATEGORY_SUMMARIES) as Category[]).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedSubCats([]); // Reset subcats on main category change
                }}
                className={`relative pb-4 font-sans text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground/80'
                } whitespace-nowrap`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div
                    layoutId="collection-tab-indicator"
                    className="bg-foreground absolute right-0 bottom-0 left-0 h-0.5"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Search, Filter & Sort Toolbar */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-muted/50 focus-visible:ring-primary focus-visible:bg-background border-transparent pl-9 font-sans transition-all"
            />
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Filter Sheet Integration */}
            <FilterSheet
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
              selectedSubCats={selectedSubCats}
              setSelectedSubCats={setSelectedSubCats}
              availableSubCats={availableSubCats}
              clearFilters={clearFilters}
              activeCount={activeFiltersCount}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="font-sans font-medium">
                  Sort by: {sortBy}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-50 font-sans">
                {['Featured', 'New Arrivals', 'Price: Low to High', 'Price: High to Low'].map(
                  (option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() => setSortBy(option)}
                      className="cursor-pointer"
                    >
                      {option}
                    </DropdownMenuItem>
                  ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* 5. Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            key={`${activeCategory}-${sortBy}-${searchQuery}-${priceRange}-${selectedRatings.length}-${selectedSubCats.length}`}
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={cardVariants} layout>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="bg-muted mb-4 rounded-full p-4">
              <Search className="text-muted-foreground h-8 w-8" />
            </div>
            <h3 className="font-geist text-foreground text-xl font-bold">No products found</h3>
            <p className="text-muted-foreground mt-2 font-sans">
              Adjust your filters or search query to find what you're looking for.
            </p>
            <Button variant="outline" className="mt-6 font-sans" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
      <BulkOrderCTA />
      <Footer />
    </div>
  );
}

// --- Sub-components ---

// Filter Sheet Component
const FilterSheet = ({
  priceRange,
  setPriceRange,
  selectedRatings,
  setSelectedRatings,
  selectedSubCats,
  setSelectedSubCats,
  availableSubCats,
  clearFilters,
  activeCount,
}: any) => {
  const toggleRating = (val: number) => {
    setSelectedRatings((prev: number[]) =>
      prev.includes(val) ? prev.filter((r) => r !== val) : [...prev, val],
    );
  };

  const toggleSubCat = (cat: string) => {
    setSelectedSubCats((prev: string[]) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative font-sans font-medium">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-background border-border flex w-full flex-col border-l p-0 font-sans sm:max-w-md">
        <SheetHeader className="border-border border-b p-6 text-left">
          <SheetTitle className="font-geist text-2xl font-bold">Filter Options</SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-10 overflow-y-auto p-6">
          {/* Price Range */}
          <div className="space-y-6">
            <h4 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
              Price Range
            </h4>
            <Slider
              defaultValue={priceRange}
              value={priceRange}
              max={2000}
              step={10}
              onValueChange={setPriceRange}
              className="w-full"
            />
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-full">
                <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                  $
                </span>
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="bg-muted/30 pl-7"
                />
              </div>
              <span className="text-muted-foreground">to</span>
              <div className="relative w-full">
                <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                  $
                </span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="bg-muted/30 pl-7"
                />
              </div>
            </div>
          </div>

          {/* Sub-categories */}
          {availableSubCats.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
                Categories
              </h4>
              <div className="space-y-3">
                {availableSubCats.map((cat: string) => (
                  <div key={cat} className="flex items-center space-x-3">
                    <Checkbox
                      id={`cat-${cat}`}
                      checked={selectedSubCats.includes(cat)}
                      onCheckedChange={() => toggleSubCat(cat)}
                      className="border-muted-foreground data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                    />
                    <Label
                      htmlFor={`cat-${cat}`}
                      className="cursor-pointer text-sm leading-none font-medium"
                    >
                      {cat}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ratings */}
          <div className="space-y-4">
            <h4 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
              Customer Rating
            </h4>
            <div className="space-y-3">
              {[4, 3].map((rating) => (
                <div key={rating} className="flex items-center space-x-3">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onCheckedChange={() => toggleRating(rating)}
                    className="border-muted-foreground data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="flex cursor-pointer items-center text-sm leading-none font-medium"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'} mr-1`}
                      />
                    ))}
                    <span className="ml-1">& Up</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="border-border bg-muted/10 grid grid-cols-2 gap-4 border-t p-6 sm:space-x-0">
          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear All
          </Button>
          <SheetClose asChild>
            <Button className="bg-foreground text-background hover:bg-primary w-full">
              View Results
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
