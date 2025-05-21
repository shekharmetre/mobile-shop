import { Product, CategoryInfo } from "./types";

export const products: Product[] = [
  {
    id: "charger-standard-01",
    name: "Samsung C To C Adapter",
    description: "Reliable and efficient charging for everyday use. Compatible with most Android devices.",
    price: 12.99,
    images: [
      "/products-images/samsung-c.png",
    ],
    category: "chargers",
    subcategory: "standard",
    compatibility: ["Samsung", "Xiaomi", "Oppo"],
    features: ["80 w Output", "Compact Design", "LED Indicator"],
    rating: 4.2,
    reviews: 125,
    inStock: true
  },
  {
    id: "charger-original-01",
    name: "Original Samsung Fast Charger",
    description: "Genuine Samsung charger designed specifically for Samsung devices to provide optimal charging performance.",
    price: 34.99,
    images: [
      "https://images.pexels.com/photos/1229456/pexels-photo-1229456.jpeg",
      "https://images.pexels.com/photos/12642256/pexels-photo-12642256.jpeg"
    ],
    category: "chargers",
    subcategory: "original",
    compatibility: ["Samsung"],
    features: ["25W Super Fast Charging", "Adaptive Fast Charging", "Official Samsung Product", "1-Year Warranty"],
    rating: 4.9,
    reviews: 425,
    inStock: true
  },
  {
    id: "headphones-wired-01",
    name: "Premium Wired Headphones",
    description: "High-fidelity wired headphones with balanced sound profile and comfortable over-ear design.",
    price: 24.99,
    images: [
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg",
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg"
    ],
    category: "audio",
    subcategory: "headphones",
    compatibility: ["Universal 3.5mm Jack"],
    features: ["High-Quality Sound", "Noise Isolation", "Comfortable Ear Cushions", "In-line Microphone"],
    rating: 4.5,
    reviews: 215,
    inStock: true
  },
  {
    id: "earphones-wireless-01",
    name: "True Wireless Earbuds",
    description: "Compact true wireless earbuds with premium sound quality and long battery life.",
    price: 49.99,
    discountPrice: 39.99,
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
      "https://images.pexels.com/photos/3394660/pexels-photo-3394660.jpeg"
    ],
    category: "audio",
    subcategory: "wireless",
    compatibility: ["Universal Bluetooth"],
    features: ["Bluetooth 5.0", "Touch Controls", "20H Battery Life", "IPX4 Water Resistance"],
    rating: 4.7,
    reviews: 320,
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: "screen-dplus-01",
    name: "D+ Premium Screen Protector",
    description: "Advanced D+ screen protector with anti-blue light and privacy features.",
    price: 19.99,
    images: [
      "https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg",
      "https://images.pexels.com/photos/2643698/pexels-photo-2643698.jpeg"
    ],
    category: "protection",
    subcategory: "screen-protector",
    compatibility: ["iPhone", "Samsung Galaxy", "Google Pixel"],
    features: ["Privacy Filter", "Blue Light Filter", "Anti-Fingerprint", "Ultra-Clear"],
    rating: 4.8,
    reviews: 175,
    inStock: true,
    isNew: true
  },
  {
    id: "accessory-popsocket-01",
    name: "Premium PopSocket Grip",
    description: "Stylish and functional phone grip and stand for secure handling of your device.",
    price: 9.99,
    images: [
      "https://images.pexels.com/photos/4846436/pexels-photo-4846436.jpeg",
      "https://images.pexels.com/photos/5386198/pexels-photo-5386198.jpeg"
    ],
    category: "accessories",
    subcategory: "grips",
    compatibility: ["Universal"],
    features: ["Collapsible Design", "Strong Adhesive", "Customizable Top", "Washable"],
    rating: 4.4,
    reviews: 230,
    inStock: true
  },
  {
    id: "accessory-holder-01",
    name: "Car Phone Holder",
    description: "Versatile car mount holder for secure placement of your phone while driving.",
    price: 15.99,
    images: [
      "https://images.pexels.com/photos/3068059/pexels-photo-3068059.jpeg",
      "https://images.pexels.com/photos/6647367/pexels-photo-6647367.jpeg"
    ],
    category: "accessories",
    subcategory: "holders",
    compatibility: ["Universal"],
    features: ["Adjustable Grip", "Suction Cup Base", "360° Rotation", "One-Touch Operation"],
    rating: 4.5,
    reviews: 195,
    inStock: true
  },
    {
    id: "og-red-80w-charger",
    name: "OG Red 80W Charger",
    description: "High-power fast charger with 80W output for rapid device charging.",
    price: 29.99,
    images: [
      "/products-images/80w.png"
    ],
    category: "chargers",
    subcategory: "high-power",
    compatibility: ["Samsung", "OnePlus", "Xiaomi"],
    features: ["80W Fast Charging", "Overcharge Protection", "Sleek Design"],
    rating: 4.7,
    reviews: 320,
    inStock: true,
    isFeatured: true
  },
  {
    id: "samsung-c-adapter",
    name: "Samsung C Adapter",
    description: "Official Samsung Type-C adapter for reliable and efficient charging.",
    price: 24.99,
    images: [
     "/products-images/samsung-c.png"
    ],
    category: "adapters",
    subcategory: "type-c",
    compatibility: ["Samsung", "Google Pixel", "OnePlus"],
    features: ["Fast Charge Compatible", "Durable Build", "Compact Size"],
    rating: 4.6,
    reviews: 185,
    inStock: true,
    isFeatured: true
  },
  {
    id: "iphone-pd-adapter",
    name: "iPhone PD Adapter",
    description: "Power Delivery (PD) adapter for iPhone devices. Fast and safe charging.",
    price: 34.99,
    images: [
      "/products-images/iphone.png"
    ],
    category: "adapters",
    subcategory: "pd",
    compatibility: ["iPhone 8+", "iPhone X", "iPhone 11", "iPhone 12"],
    features: ["20W PD Charging", "Safe Charging Chip", "Lightweight Design"],
    rating: 4.8,
    reviews: 270,
    inStock: true,
    isFeatured: true
  },
  {
    id: "3in1-magnetic-cable",
    name: "3-in-1 Magnetic Charging Cable",
    description: "Universal magnetic charging cable compatible with Type-C, Micro USB, and Lightning devices.",
    price: 14.99,
    images: [
      "/products-images/magnetic.png"
    ],
    category: "cables",
    subcategory: "multi",
    compatibility: ["iPhone", "Samsung", "Huawei", "Oppo"],
    features: ["Magnetic Connector", "3-in-1 Compatibility", "Durable Nylon Braid"],
    rating: 4.4,
    reviews: 150,
    inStock: true,
    isFeatured: true
  },
  {
    id: "powerbank-2000w",
    name: "Power Bank 2000 Watt",
    description: "Ultra high-capacity power bank capable of powering laptops and high-wattage devices.",
    price: 149.99,
    images: [
      "/products-images/powerbank.png"
    ],
    category: "powerbanks",
    subcategory: "high-capacity",
    compatibility: ["Laptops", "Tablets", "Phones", "USB Devices"],
    features: ["2000W Output", "Multiple Ports", "Fast Charge Technology"],
    rating: 4.9,
    reviews: 98,
    inStock: true,
    isFeatured: true
  },
  {
    id: "selfie-stick",
    name: "Selfie Stick",
    description: "Extendable selfie stick with Bluetooth remote for capturing perfect shots.",
    price: 9.99,
    images: [
      "/products-images/selfie.png"
    ],
    category: "accessories",
    subcategory: "selfie",
    compatibility: ["iPhone", "Samsung", "Android Phones"],
    features: ["Bluetooth Remote", "Adjustable Angle", "Compact Folding"],
    rating: 4.3,
    reviews: 220,
    inStock: true,
    isFeatured: true
  },
  {
    id: "white-border-glass",
    name: "White Border Glass",
    description: "Premium tempered glass with white border design for full-screen protection.",
    price: 7.99,
    images: [
      "/products-images/white-glass.png"
    ],
    category: "protection",
    subcategory: "tempered-glass",
    compatibility: ["iPhone", "Samsung", "OnePlus"],
    features: ["9H Hardness", "White Border Design", "Anti-Scratch"],
    rating: 4.2,
    reviews: 310,
    inStock: true,
    isFeatured: true
  },
  // latest one
  {
    id: "pubg-fingertips",
    name: "PUBG Fingertips",
    description: "Sweat-proof and sensitive gaming fingertips for precise control in PUBG and other mobile games.",
    price: 4.99,
    images: [
      "/products-images/fingertips.png"
    ],
    category: "gaming",
    subcategory: "accessories",
    compatibility: ["All Smartphones"],
    features: ["Sweat-Proof", "High Sensitivity", "Breathable Fabric"],
    rating: 4.6,
    reviews: 145,
    inStock: true,
    isLatest: true
  },
  {
    id: "3-4a-car-charger",
    name: "3.4A Car Charger",
    description: "Fast charging car charger with dual USB ports delivering up to 3.4A output.",
    price: 11.99,
    images: [
      "/products-images/car-charger.png"
    ],
    category: "chargers",
    subcategory: "car",
    compatibility: ["Samsung", "iPhone", "Xiaomi", "OnePlus"],
    features: ["Dual USB Ports", "3.4A Fast Charging", "LED Indicator"],
    rating: 4.4,
    reviews: 180,
    inStock: true,
    isLatest: true
  },
  {
    id: "car-bluetooth-reader",
    name: "Car Bluetooth Reader",
    description: "Car Bluetooth receiver and audio adapter for wireless music and hands-free calls.",
    price: 15.99,
    images: [
      "/products-images/car-bluetooth.png"
    ],
    category: "accessories",
    subcategory: "bluetooth",
    compatibility: ["All Bluetooth-enabled Devices"],
    features: ["Wireless Audio", "Hands-Free Calls", "Plug & Play"],
    rating: 4.5,
    reviews: 210,
    inStock: true,
    isLatest: true
  },
  {
    id: "samsung-og-earphones",
    name: "Samsung OG Earphones",
    description: "Original Samsung in-ear wired earphones with clear sound and deep bass.",
    price: 12.99,
    images: [
      "/products-images/samsung-og-earphone.png"
    ],
    category: "audio",
    subcategory: "earphones",
    compatibility: ["Samsung", "All 3.5mm Jack Devices"],
    features: ["Original Sound Quality", "In-line Mic", "Comfortable Fit"],
    rating: 4.7,
    reviews: 250,
    inStock: true,
    isLatest: true
  },
  {
    id: "edge-matte-glass",
    name: "Edge Matte Glass",
    description: "Premium matte tempered glass with full edge protection and anti-glare finish.",
    price: 9.99,
    images: [
      "/products-images/edge-glass.png"
    ],
    category: "protection",
    subcategory: "matte",
    compatibility: ["iPhone", "Samsung", "OnePlus"],
    features: ["Matte Finish", "Full Edge Protection", "Anti-Fingerprint"],
    rating: 4.3,
    reviews: 195,
    inStock: true,
    isLatest: true
  },
  {
    id: "c-to-iphone-connector",
    name: "C to iPhone Connector/Cable",
    description: "Type-C to Lightning connector for fast charging and data transfer for iPhone devices.",
    price: 14.99,
    images: [
      "/products-images/iphone-c-cable.png"
    ],
    category: "cables",
    subcategory: "type-c-to-lightning",
    compatibility: ["iPhone", "iPad"],
    features: ["Fast Charge", "Durable Build", "Data Sync"],
    rating: 4.6,
    reviews: 160,
    inStock: true,
    isLatest: true
  },
  {
    id: "boat-og-headphone",
    name: "Boat OG Headphone",
    description: "Original Boat wired headphones with powerful bass and clear sound quality.",
    price: 19.99,
    images: [
      "/products-images/boat-og.png"
    ],
    category: "audio",
    subcategory: "headphones",
    compatibility: ["All 3.5mm Jack Devices"],
    features: ["Powerful Bass", "Comfortable Ear Cushions", "Built-in Mic"],
    rating: 4.5,
    reviews: 230,
    inStock: true,
    isLatest: true
  }
];

export const categories: CategoryInfo[] = [
  {
    name: "Chargers",
    slug: "chargers",
    description: "High-quality chargers from standard to original",
    image: "/category/chargers.png",
  },
  {
    name: "Cables",
    slug: "cables",
    description: "Durable cables for all your devices",
    image: "/category/cables.png"
  },
  {
    name: "Audio",
    slug: "audio",
    description: "Premium headphones and wireless earbuds",
    image: "/category/audio.png"
  },
  {
    name: "Protection",
    slug: "protection",
    description: "Screen protectors and cases for ultimate device safety",
    image: "/category/protection.png"
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Essential accessories to enhance your mobile experience",
    image: "/category/accessories.png",
  },
  {
    name: "Mobile Parts",
    slug: "accessories",
    description: "Original spare parts for phone repairs and replacements",
    image: "/category/repair.png"
  },
  {
    name: "SIM & Recharge Services",
    slug: "sim",
    description: "Buy new SIM cards and recharge your mobile easily",
    image: "/category/sim.png"
  },
  {
    name: "Used / Exchange Phones",
    slug: "mobile",
    description: "Affordable pre-owned phones and great exchange offers",
    image: "/category/refurbished.png"
  },
  {
    name: "Repair & Services",
    slug: "accessories",
    description: "Expert mobile phone repairs and maintenance services",
    image: "/category/repair.png"
  }
];


export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "iPhone User",
    content: "The premium screen protector saved my phone during a nasty drop. Worth every penny!",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Samsung Galaxy Owner",
    content: "These wireless earbuds have amazing sound quality and battery life. Better than the big brands!",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  },
  {
    id: 3,
    name: "Emma Watson",
    role: "Tech Enthusiast",
    content: "I've tried many chargers, and the premium fast charger is by far the best. My phone charges in minutes!",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
  }
];