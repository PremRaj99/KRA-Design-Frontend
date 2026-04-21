// --- Types & Mock Data ---
export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    date: string;
    imageUrl: string;
    href: string;
}

export const MOCK_BLOGS: BlogPost[] = [
    {
        id: 'blog-1',
        title: 'The Art of Minimalist Living: Elevating Your Space',
        excerpt:
            'Discover how stripping back the excess can highlight the true beauty of your home architecture and signature furniture pieces.',
        category: 'Interior Design',
        readTime: '5 min read',
        date: 'April 12, 2026',
        imageUrl:
            'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1200&auto=format&fit=crop',
        href: '/blog/minimalist-living',
    },
    {
        id: 'blog-2',
        title: '5 Smart Appliances Redefining the Modern Kitchen',
        excerpt:
            'From AI-driven espresso makers to seamless integrated cooling, explore the tech upgrading our culinary spaces.',
        category: 'Smart Home',
        readTime: '4 min read',
        date: 'April 08, 2026',
        imageUrl:
            'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
        href: '/blog/smart-kitchen-appliances',
    },
    {
        id: 'blog-3',
        title: 'Layered Lighting: The Secret to a Cozy Atmosphere',
        excerpt:
            'A comprehensive guide to mixing ambient, task, and accent lighting to completely transform your living room.',
        category: 'Guides',
        readTime: '7 min read',
        date: 'April 02, 2026',
        imageUrl:
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
        href: '/blog/layered-lighting-guide',
    },
];