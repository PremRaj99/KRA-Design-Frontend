import reelVideo from '@/assets/reels/Video-524.mp4';

export interface Reel {
    id: string;
    videoUrl: string;
    title: string;
    price: number;
    discountedPrice?: number;
    discountPercentage?: number;
    tag?: string;
    link: string;
}

export const MOCK_REELS: Reel[] = [
    {
        id: 'reel-1',
        // Using placeholder MP4s for demonstration
        videoUrl: reelVideo,
        title: 'Smart Espresso Machine',
        price: 899,
        discountedPrice: 749,
        discountPercentage: 16,
        tag: '#CoffeeLover',
        link: '/collections/smart-espresso-machine',
    },
    {
        id: 'reel-2',
        videoUrl: reelVideo,
        title: 'Minimalist Humidifier',
        price: 120,
        tag: '#HomeDecor',
        link: '/collections/minimalist-humidifier',
    },
    {
        id: 'reel-3',
        videoUrl: reelVideo,
        title: 'Velvet Swivel Chair',
        price: 450,
        discountedPrice: 350,
        discountPercentage: 22,
        tag: '#Trending',
        link: '/collections/velvet-swivel-chair',
    },
    {
        id: 'reel-4',
        videoUrl: reelVideo,
        title: 'Air Purifier Pro',
        price: 299,
        discountedPrice: 249,
        discountPercentage: 16,
        tag: '#Wellness',
        link: '/collections/air-purifier-pro',
    },
];