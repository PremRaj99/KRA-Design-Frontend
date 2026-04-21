// --- Types & Data ---
export interface FAQ {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export interface FAQCategory {
  id: string;
  name: string;
  faqs: FAQ[];
}

export const FAQ_DATA: FAQCategory[] = [
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