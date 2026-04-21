// --- Types & Mock Data ---
export type Blog = {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    readTime: string;
    date: string;
    author: string;
    authorRole: string;
    authorImage: string;
    imageUrl: string;
};

export const MOCK_BLOGS: Blog[] = [
    {
        id: 'blog-2',
        title: 'Modern Luxury: Blending Comfort with Elegance',
        excerpt:
            'Luxury interiors today are no longer about excess—they are about precision, comfort, and intentional design choices that elevate everyday living.',
        content: `
    <p>Modern luxury is defined by restraint. Instead of overloading a space with expensive items, it focuses on curating fewer but higher-quality elements that deliver both comfort and visual appeal.</p>

    <h2>Comfort as the New Luxury</h2>
    <p>True luxury is how a space feels. Soft seating, breathable fabrics, and ergonomic layouts define high-end interiors today.</p>

    <blockquote>"Luxury must be comfortable, otherwise it is not luxury." — Coco Chanel</blockquote>

    <h2>Material Matters</h2>
    <ul>
      <li><strong>Marble & Stone:</strong> Timeless and durable.</li>
      <li><strong>Velvet & Linen:</strong> Adds softness and depth.</li>
      <li><strong>Metal Accents:</strong> Brass and matte black for contrast.</li>
    </ul>

    <p>When done right, modern luxury becomes timeless rather than trendy.</p>
  `,
        category: 'Interior Design',
        readTime: '4 min read',
        date: 'April 10, 2026',
        author: 'Sophia Bennett',
        authorRole: 'Luxury Design Consultant',
        authorImage:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
        imageUrl:
            'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=2000&auto=format&fit=crop',
    },
    {
        id: 'blog-3',
        title: 'Small Spaces, Big Impact: Smart Design Tips',
        excerpt:
            'Learn how to transform compact living areas into stylish, functional spaces without sacrificing comfort or aesthetics.',
        content: `
    <p>Small spaces demand smarter thinking. The key lies in maximizing utility while maintaining a sense of openness.</p>

    <h2>Multi-Functional Furniture</h2>
    <p>Opt for pieces that serve more than one purpose, such as storage beds or foldable desks.</p>

    <h2>Visual Expansion Techniques</h2>
    <ul>
      <li><strong>Mirrors:</strong> Reflect light and create depth.</li>
      <li><strong>Light Colors:</strong> Make spaces feel larger.</li>
      <li><strong>Vertical Storage:</strong> Use wall space efficiently.</li>
    </ul>

    <p>A well-designed small space can feel more intentional than a large one.</p>
  `,
        category: 'Home Styling',
        readTime: '3 min read',
        date: 'April 8, 2026',
        author: 'Liam Carter',
        authorRole: 'Space Optimization Expert',
        authorImage:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        imageUrl:
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2000&auto=format&fit=crop',
    },
    {
        id: 'blog-4',
        title: 'Choosing the Perfect Sofa: A Complete Guide',
        excerpt:
            'From fabric to frame, discover what really matters when investing in the centerpiece of your living room.',
        content: `
    <p>The sofa is more than just seating—it's the anchor of your living space.</p>

    <h2>Key Factors to Consider</h2>
    <ul>
      <li><strong>Frame:</strong> Hardwood frames last longer.</li>
      <li><strong>Fabric:</strong> Choose based on lifestyle.</li>
      <li><strong>Comfort:</strong> Test cushioning and depth.</li>
    </ul>

    <h2>Style vs Function</h2>
    <p>Balance aesthetics with practicality to ensure long-term satisfaction.</p>

    <p>A good sofa is an investment, not an expense.</p>
  `,
        category: 'Buying Guide',
        readTime: '5 min read',
        date: 'April 6, 2026',
        author: 'Emma Wilson',
        authorRole: 'Furniture Specialist',
        authorImage:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
        imageUrl:
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2000&auto=format&fit=crop',
    },
    {
        id: 'blog-5',
        title: 'The Rise of Sustainable Furniture',
        excerpt:
            'Eco-conscious living is shaping the future of furniture design. Here’s what you need to know.',
        content: `
    <p>Sustainability is no longer optional—it’s a responsibility.</p>

    <h2>Eco-Friendly Materials</h2>
    <ul>
      <li><strong>Reclaimed Wood</strong></li>
      <li><strong>Bamboo</strong></li>
      <li><strong>Recycled Metals</strong></li>
    </ul>

    <h2>Why It Matters</h2>
    <p>Choosing sustainable furniture reduces environmental impact and promotes ethical production.</p>

    <p>Design can be both beautiful and responsible.</p>
  `,
        category: 'Sustainability',
        readTime: '4 min read',
        date: 'April 5, 2026',
        author: 'Noah Green',
        authorRole: 'Sustainability Advocate',
        authorImage:
            'https://images.unsplash.com/photo-1502767089025-6572583495b0?q=80&w=200&auto=format&fit=crop',
        imageUrl:
            'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=2000&auto=format&fit=crop',
    },
    {
        id: 'blog-6',
        title: 'Lighting Design: Transforming Mood and Space',
        excerpt:
            'Lighting isn’t just functional—it’s one of the most powerful tools in interior design.',
        content: `
    <p>Lighting defines how a space is experienced. It influences mood, perception, and functionality.</p>

    <h2>Layered Lighting</h2>
    <ul>
      <li>Ambient lighting</li>
      <li>Task lighting</li>
      <li>Accent lighting</li>
    </ul>

    <h2>Warm vs Cool Light</h2>
    <p>Warm light creates coziness, while cool light enhances focus.</p>

    <p>Good lighting turns a house into a home.</p>
  `,
        category: 'Interior Design',
        readTime: '3 min read',
        date: 'April 3, 2026',
        author: 'Olivia Parker',
        authorRole: 'Lighting Designer',
        authorImage:
            'https://images.unsplash.com/photo-1491349174775-aaafddd81942?q=80&w=200&auto=format&fit=crop',
        imageUrl:
            'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=2000&auto=format&fit=crop',
    },
    {
        id: 'blog-7',
        title: 'Declutter Like a Pro: Practical Home Organization',
        excerpt:
            'A clutter-free home isn’t about perfection—it’s about systems that actually work in daily life.',
        content: `
    <p>Decluttering is about making space for what truly matters.</p>

    <h2>Start Small</h2>
    <p>Focus on one area at a time to avoid overwhelm.</p>

    <h2>Smart Storage</h2>
    <ul>
      <li>Use hidden storage</li>
      <li>Label everything</li>
      <li>Adopt a one-in, one-out rule</li>
    </ul>

    <p>Consistency beats intensity when it comes to organization.</p>
  `,
        category: 'Home Organization',
        readTime: '4 min read',
        date: 'April 2, 2026',
        author: 'James Miller',
        authorRole: 'Organization Expert',
        authorImage:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        imageUrl:
            'https://images.unsplash.com/photo-1582582494700-2c2b9a3f0d3b?q=80&w=2000&auto=format&fit=crop',
    },
    {
        id: 'blog-8',
        title: 'Color Psychology in Interior Design',
        excerpt:
            'Colors influence emotions more than you think. Learn how to use them strategically in your home.',
        content: `
    <p>Color is a powerful design tool that affects mood and perception.</p>

    <h2>Common Color Effects</h2>
    <ul>
      <li><strong>Blue:</strong> Calm and focus</li>
      <li><strong>Yellow:</strong> Energy and warmth</li>
      <li><strong>Green:</strong> Balance and freshness</li>
    </ul>

    <h2>Choosing the Right Palette</h2>
    <p>Balance bold tones with neutrals to avoid overwhelming the space.</p>

    <p>Color is not decoration—it’s communication.</p>
  `,
        category: 'Design Theory',
        readTime: '4 min read',
        date: 'March 30, 2026',
        author: 'Ava Johnson',
        authorRole: 'Color Consultant',
        authorImage:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        imageUrl:
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2000&auto=format&fit=crop',
    },
    {
        id: 'blog-9',
        title: 'Creating a Cozy Bedroom Retreat',
        excerpt:
            'Turn your bedroom into a relaxing sanctuary with simple but effective design changes.',
        content: `
    <p>Your bedroom should be the most calming space in your home.</p>

    <h2>Layering Textures</h2>
    <p>Combine soft fabrics like cotton, wool, and linen.</p>

    <h2>Lighting Matters</h2>
    <p>Use warm bedside lamps instead of harsh overhead lighting.</p>

    <p>A cozy bedroom improves both sleep and overall well-being.</p>
  `,
        category: 'Bedroom Design',
        readTime: '3 min read',
        date: 'March 28, 2026',
        author: 'Mia Thompson',
        authorRole: 'Interior Stylist',
        authorImage:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
        imageUrl:
            'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=2000&auto=format&fit=crop',
    },
    {
        id: 'blog-10',
        title: 'Open Concept Living: Pros and Cons',
        excerpt:
            'Open layouts are popular, but are they right for you? Let’s break down the advantages and trade-offs.',
        content: `
    <p>Open concept living creates a sense of space but comes with its own challenges.</p>

    <h2>Advantages</h2>
    <ul>
      <li>Better natural light</li>
      <li>Improved social interaction</li>
      <li>Flexible layouts</li>
    </ul>

    <h2>Drawbacks</h2>
    <ul>
      <li>Less privacy</li>
      <li>Noise issues</li>
      <li>Harder to maintain organization</li>
    </ul>

    <p>Choose based on your lifestyle, not trends.</p>
  `,
        category: 'Home Planning',
        readTime: '5 min read',
        date: 'March 25, 2026',
        author: 'Ethan Brown',
        authorRole: 'Architect',
        authorImage:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        imageUrl:
            'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=2000&auto=format&fit=crop',
    },
    {
        id: 'blog-11',
        title: 'Furniture Trends That Will Dominate 2026',
        excerpt:
            'Stay ahead of the curve with the latest furniture trends shaping modern homes this year.',
        content: `
    <p>Furniture trends are evolving toward comfort, sustainability, and personalization.</p>

    <h2>Top Trends</h2>
    <ul>
      <li>Curved furniture</li>
      <li>Earthy tones</li>
      <li>Multi-functional designs</li>
    </ul>

    <h2>What to Avoid</h2>
    <p>Overly trendy designs that lack longevity.</p>

    <p>Invest in pieces that age well with your space.</p>
  `,
        category: 'Trends',
        readTime: '4 min read',
        date: 'March 22, 2026',
        author: 'Lucas White',
        authorRole: 'Trend Analyst',
        authorImage:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
        imageUrl:
            'https://images.unsplash.com/photo-1588854337119-9f95e5d8d8dc?q=80&w=2000&auto=format&fit=crop',
    }
];;