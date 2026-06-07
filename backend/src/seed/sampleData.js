/* ─── NEXUS Sample Data ─── */

/* ------------------------------------------------------------------ */
/*  USERS                                                               */
/* ------------------------------------------------------------------ */
const users = [
  /* Admins */
  {
    name: 'Nexus Admin',
    email: 'admin@nexus.shop',
    password: 'Admin123!',
    role: 'admin',
    phone: '+92-300-0000001',
    address: {
      line1: '1 Admin Plaza',
      city: 'Karachi',
      state: 'Sindh',
      postalCode: '74000',
      country: 'Pakistan',
    },
  },
  {
    name: 'Sara Malik',
    email: 'sara@nexus.shop',
    password: 'Admin123!',
    role: 'admin',
    phone: '+92-321-0000002',
    address: {
      line1: '12 Manager Lane',
      city: 'Lahore',
      state: 'Punjab',
      postalCode: '54000',
      country: 'Pakistan',
    },
  },

  /* Customers */
  {
    name: 'Ahmed Khan',
    email: 'ahmed@example.com',
    password: 'Customer123!',
    role: 'customer',
    phone: '+92-333-1111111',
    address: {
      line1: '45 Gulshan Block 13',
      city: 'Karachi',
      state: 'Sindh',
      postalCode: '75300',
      country: 'Pakistan',
    },
  },
  {
    name: 'Fatima Zahra',
    email: 'fatima@example.com',
    password: 'Customer123!',
    role: 'customer',
    phone: '+92-311-2222222',
    address: {
      line1: '7 DHA Phase 5',
      city: 'Lahore',
      state: 'Punjab',
      postalCode: '54792',
      country: 'Pakistan',
    },
  },
  {
    name: 'Bilal Chaudhry',
    email: 'bilal@example.com',
    password: 'Customer123!',
    role: 'customer',
    phone: '+92-345-3333333',
    address: {
      line1: '23 F-7 Markaz',
      city: 'Islamabad',
      state: 'ICT',
      postalCode: '44000',
      country: 'Pakistan',
    },
  },
  {
    name: 'Ayesha Siddiqui',
    email: 'ayesha@example.com',
    password: 'Customer123!',
    role: 'customer',
    phone: '+92-301-4444444',
    address: {
      line1: '9 Hayatabad Phase 3',
      city: 'Peshawar',
      state: 'KPK',
      postalCode: '25000',
      country: 'Pakistan',
    },
  },
  {
    name: 'Usman Tariq',
    email: 'usman@example.com',
    password: 'Customer123!',
    role: 'customer',
    phone: '+92-315-5555555',
    address: {
      line1: '3 Satellite Town',
      city: 'Rawalpindi',
      state: 'Punjab',
      postalCode: '46000',
      country: 'Pakistan',
    },
  },
];

/* ------------------------------------------------------------------ */
/*  PRODUCTS                                                            */
/* ------------------------------------------------------------------ */
const products = [
  /* ═══════════════════════ BAGS (8 items) ═══════════════════════ */
  {
    name: 'Aurora Leather Backpack',
    slug: 'aurora-leather-backpack',
    description:
      'Handcrafted full-grain leather backpack with a padded 15" laptop sleeve, anti-theft back pocket, and ergonomic shoulder straps. Perfect for work or weekend escapes.',
    price: 18999,
    salePrice: 15999,
    category: 'Bags',
    tags: ['new', 'bestseller', 'leather'],
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 24,
    rating: 4.7,
    numReviews: 38,
    isFeatured: true,
  },
  {
    name: 'Voyager Canvas Tote',
    slug: 'voyager-canvas-tote',
    description:
      'Eco-friendly heavy-duty canvas tote with reinforced handles and an inner zip pocket. Ideal for grocery runs, beach trips, or daily commutes.',
    price: 5999,
    category: 'Bags',
    tags: ['eco', 'casual'],
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 60,
    rating: 4.4,
    numReviews: 22,
    isFeatured: false,
  },
  {
    name: 'Atlas Travel Duffel',
    slug: 'atlas-travel-duffel',
    description:
      'Water-resistant 50L duffel with a detachable shoulder strap, U-shape opening, and shoe compartment. Your perfect weekend warrior bag.',
    price: 12999,
    salePrice: 10999,
    category: 'Bags',
    tags: ['travel', 'weekend'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 18,
    rating: 4.5,
    numReviews: 17,
    isFeatured: true,
  },
  {
    name: 'Metro Slim Messenger',
    slug: 'metro-slim-messenger',
    description:
      'Urban messenger bag crafted from waxed canvas with multiple organizer pockets, a padded tablet slot, and a magnetic closure flap.',
    price: 7999,
    category: 'Bags',
    tags: ['office', 'urban'],
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 40,
    rating: 4.3,
    numReviews: 29,
    isFeatured: false,
  },
  {
    name: 'Sahara Adventure Pack',
    slug: 'sahara-adventure-pack',
    description:
      '30L outdoor backpack with a hydration bladder compartment, trekking pole loops, and breathable mesh back panel.',
    price: 14999,
    category: 'Bags',
    tags: ['outdoor', 'hiking'],
    images: [
      'https://images.unsplash.com/photo-1622260614927-5f18027826b2?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 20,
    rating: 4.6,
    numReviews: 14,
    isFeatured: false,
  },
  {
    name: 'Ember Crossbody Bag',
    slug: 'ember-crossbody-bag',
    description:
      'Compact vegan leather crossbody with an adjustable strap, RFID-blocking card slots, and a secure zip top.',
    price: 4999,
    category: 'Bags',
    tags: ['compact', 'everyday'],
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4b4b7c?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 50,
    rating: 4.2,
    numReviews: 41,
    isFeatured: false,
  },
  {
    name: 'Obsidian Laptop Briefcase',
    slug: 'obsidian-laptop-briefcase',
    description:
      'Professional 16" laptop briefcase in genuine leather with a trolley sleeve, brass hardware, and pen organizer.',
    price: 22999,
    salePrice: 19999,
    category: 'Bags',
    tags: ['professional', 'leather', 'office'],
    images: [
      'https://images.unsplash.com/photo-1565774967-2b1b3a6b4b36?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 12,
    rating: 4.8,
    numReviews: 9,
    isFeatured: true,
  },
  {
    name: 'Dune Mini Backpack',
    slug: 'dune-mini-backpack',
    description:
      'Trendy mini backpack in soft suede-feel fabric with gold zippers and a front utility pocket.',
    price: 3999,
    category: 'Bags',
    tags: ['casual', 'trendy'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 35,
    rating: 4.1,
    numReviews: 55,
    isFeatured: false,
  },

  /* ═══════════════════════ ELECTRONICS (8 items) ════════════════ */
  {
    name: 'Solstice Wireless Headphones',
    slug: 'solstice-wireless-headphones',
    description:
      'Premium over-ear ANC headphones with 35-hour battery life, aptX HD audio, fast charging (10 min = 3 hrs), and foldable design.',
    price: 24999,
    salePrice: 19999,
    category: 'Electronics',
    tags: ['audio', 'anc', 'bestseller'],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 42,
    rating: 4.8,
    numReviews: 74,
    isFeatured: true,
  },
  {
    name: 'Nebula Bluetooth Speaker',
    slug: 'nebula-bluetooth-speaker',
    description:
      'IPX7-rated portable speaker with 360° sound, deep bass radiator, and 12-hour playtime. Pairs two units for stereo mode.',
    price: 8999,
    category: 'Electronics',
    tags: ['audio', 'portable', 'waterproof'],
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 50,
    rating: 4.5,
    numReviews: 63,
    isFeatured: false,
  },
  {
    name: 'Orion Smartwatch',
    slug: 'orion-smartwatch',
    description:
      'AMOLED fitness smartwatch with health tracking, GPS, SpO2, 100+ sport modes, and 7-day battery. Compatible with Android & iOS.',
    price: 19999,
    salePrice: 16999,
    category: 'Electronics',
    tags: ['wearable', 'fitness', 'gps'],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 33,
    rating: 4.6,
    numReviews: 48,
    isFeatured: true,
  },
  {
    name: 'Nova Wireless Earbuds',
    slug: 'nova-wireless-earbuds',
    description:
      'True wireless earbuds with 6-mic ENC, 28-hour total battery, wireless charging case, and IPX5 water resistance.',
    price: 6999,
    category: 'Electronics',
    tags: ['audio', 'tws', 'enc'],
    images: [
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 80,
    rating: 4.4,
    numReviews: 92,
    isFeatured: true,
  },
  {
    name: 'Helix Gaming Mouse',
    slug: 'helix-gaming-mouse',
    description:
      'High-precision 25600 DPI gaming mouse with 9 programmable buttons, RGB lighting, and 70-hour wireless battery life.',
    price: 5999,
    category: 'Electronics',
    tags: ['gaming', 'rgb'],
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 25,
    rating: 4.5,
    numReviews: 36,
    isFeatured: false,
  },
  {
    name: 'Pixel 4K Webcam',
    slug: 'pixel-4k-webcam',
    description:
      '4K 30fps webcam with autofocus, dual noise-cancelling mics, and HDR support. Plug-and-play for Windows, Mac & Linux.',
    price: 11999,
    salePrice: 9999,
    category: 'Electronics',
    tags: ['video', 'streaming', 'work-from-home'],
    images: [
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 30,
    rating: 4.3,
    numReviews: 27,
    isFeatured: false,
  },
  {
    name: 'Titan Mechanical Keyboard',
    slug: 'titan-mechanical-keyboard',
    description:
      'TKL mechanical keyboard with hot-swap switches, per-key RGB, PBT double-shot keycaps, and USB-C detachable cable.',
    price: 13999,
    category: 'Electronics',
    tags: ['keyboard', 'gaming', 'mechanical'],
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 18,
    rating: 4.7,
    numReviews: 31,
    isFeatured: true,
  },
  {
    name: 'Charge Pro Wireless Pad',
    slug: 'charge-pro-wireless-pad',
    description:
      '3-in-1 wireless charging pad for phone, earbuds & watch simultaneously. 15W max output, non-slip surface.',
    price: 3999,
    category: 'Electronics',
    tags: ['charging', 'accessories'],
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 65,
    rating: 4.2,
    numReviews: 58,
    isFeatured: false,
  },

  /* ═══════════════════════ HOME (8 items) ════════════════════════ */
  {
    name: 'Lumen Smart Lamp',
    slug: 'lumen-smart-lamp',
    description:
      'Wi-Fi enabled smart desk lamp with tunable white/colour light, voice assistant compatibility, and a USB-C charging port in the base.',
    price: 12999,
    salePrice: 10999,
    category: 'Home',
    tags: ['smart-home', 'lighting'],
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 15,
    rating: 4.5,
    numReviews: 21,
    isFeatured: true,
  },
  {
    name: 'Breeze Air Purifier',
    slug: 'breeze-air-purifier',
    description:
      'True HEPA + activated carbon air purifier with real-time AQI display, auto mode, sleep mode, and filter change indicator.',
    price: 14999,
    category: 'Home',
    tags: ['clean-air', 'hepa', 'appliance'],
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 22,
    rating: 4.7,
    numReviews: 33,
    isFeatured: true,
  },
  {
    name: 'Zen Aroma Diffuser',
    slug: 'zen-aroma-diffuser',
    description:
      '400ml ultrasonic essential oil diffuser with 7 ambient LED colours, intermittent/continuous mist modes, and auto shutoff.',
    price: 3999,
    category: 'Home',
    tags: ['wellness', 'aromatherapy'],
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 60,
    rating: 4.4,
    numReviews: 47,
    isFeatured: false,
  },
  {
    name: 'CloudSoft Throw Blanket',
    slug: 'cloudsoft-throw-blanket',
    description:
      'Ultra-soft double-sided sherpa throw blanket (130×150 cm). Machine washable, anti-pilling, available in 6 colours.',
    price: 2999,
    category: 'Home',
    tags: ['comfort', 'cozy'],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 70,
    rating: 4.6,
    numReviews: 82,
    isFeatured: false,
  },
  {
    name: 'Harbor Ceramic Vase Set',
    slug: 'harbor-ceramic-vase-set',
    description:
      'Set of 3 hand-thrown matte ceramic vases in earthy tones. Sizes: 8", 6", and 4". Food-safe glaze, watertight.',
    price: 4499,
    category: 'Home',
    tags: ['decor', 'ceramic'],
    images: [
      'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b5?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 40,
    rating: 4.3,
    numReviews: 19,
    isFeatured: false,
  },
  {
    name: 'NordCook Cast Iron Skillet',
    slug: 'nordcook-cast-iron-skillet',
    description:
      '10" pre-seasoned cast iron skillet compatible with all heat sources including induction. Built to last generations.',
    price: 7999,
    salePrice: 6499,
    category: 'Home',
    tags: ['kitchen', 'cookware'],
    images: [
      'https://images.unsplash.com/photo-1574783930038-5c5b7e578a64?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 28,
    rating: 4.8,
    numReviews: 61,
    isFeatured: true,
  },
  {
    name: 'Foam Comfort Pillow',
    slug: 'foam-comfort-pillow',
    description:
      'Adaptive memory foam pillow with cooling gel layer and hypoallergenic bamboo cover. Supports all sleep positions.',
    price: 3499,
    category: 'Home',
    tags: ['sleep', 'comfort'],
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 55,
    rating: 4.5,
    numReviews: 76,
    isFeatured: false,
  },
  {
    name: 'RoboSweep Robot Vacuum',
    slug: 'robosweep-robot-vacuum',
    description:
      'Smart robot vacuum with LiDAR mapping, 3000 Pa suction, auto-recharge, app scheduling, and voice assistant control.',
    price: 34999,
    salePrice: 28999,
    category: 'Home',
    tags: ['smart-home', 'appliance', 'robot'],
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 10,
    rating: 4.7,
    numReviews: 44,
    isFeatured: true,
  },

  /* ═══════════════════════ SHOES (8 items) ═══════════════════════ */
  {
    name: 'Polar Trail Runners',
    slug: 'polar-trail-runners',
    description:
      'Aggressive-lug trail running shoe with rock plate, waterproof upper, and responsive TPU midsole. For wet or dry trails.',
    price: 11999,
    category: 'Shoes',
    tags: ['outdoor', 'trail', 'waterproof'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 60,
    rating: 4.6,
    numReviews: 39,
    isFeatured: true,
  },
  {
    name: 'AeroFlex Running Shoes',
    slug: 'aeroflex-running-shoes',
    description:
      'Daily trainer with engineered knit upper, heel-to-toe 10mm drop, and nitrogen-infused foam midsole for long-run cushioning.',
    price: 8999,
    salePrice: 7499,
    category: 'Shoes',
    tags: ['sports', 'running'],
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 48,
    rating: 4.4,
    numReviews: 53,
    isFeatured: true,
  },
  {
    name: 'UrbanStep Leather Sneakers',
    slug: 'urbanstep-leather-sneakers',
    description:
      'Premium cupsole sneaker with full-grain leather upper, memory foam insole, and vulcanised rubber outsole.',
    price: 10999,
    category: 'Shoes',
    tags: ['casual', 'leather'],
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 35,
    rating: 4.5,
    numReviews: 28,
    isFeatured: false,
  },
  {
    name: 'Nimbus Comfort Slides',
    slug: 'nimbus-comfort-slides',
    description:
      'One-piece EVA slides with contoured footbed and adjustable single strap. Perfect for home, gym, and pool.',
    price: 2999,
    category: 'Shoes',
    tags: ['comfort', 'slides'],
    images: [
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 75,
    rating: 4.3,
    numReviews: 67,
    isFeatured: false,
  },
  {
    name: 'Summit Trekking Boots',
    slug: 'summit-trekking-boots',
    description:
      'Mid-cut waterproof hiking boot with GORE-TEX lining, Vibram outsole, and ankle support system.',
    price: 15999,
    salePrice: 13499,
    category: 'Shoes',
    tags: ['outdoor', 'hiking', 'waterproof'],
    images: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 28,
    rating: 4.7,
    numReviews: 24,
    isFeatured: true,
  },
  {
    name: 'Blaze Basketball Shoes',
    slug: 'blaze-basketball-shoes',
    description:
      'High-top basketball shoe with zoom air forefoot cushioning, herringbone outsole, and ankle foam collar.',
    price: 13999,
    category: 'Shoes',
    tags: ['sports', 'basketball'],
    images: [
      'https://images.unsplash.com/photo-1571601624827-5b0e8a14e9b8?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 20,
    rating: 4.5,
    numReviews: 18,
    isFeatured: false,
  },
  {
    name: 'Cloud Loafers',
    slug: 'cloud-loafers',
    description:
      'Slip-on loafer in hand-burnished leather with a cushioned latex insole and leather-lined footbed.',
    price: 9499,
    category: 'Shoes',
    tags: ['formal', 'casual', 'leather'],
    images: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 30,
    rating: 4.4,
    numReviews: 35,
    isFeatured: false,
  },
  {
    name: 'Drift Skate Shoes',
    slug: 'drift-skate-shoes',
    description:
      'Vulc-construction skate shoe with double-stitched canvas upper, ollie pad reinforcement, and foxing stripe.',
    price: 5999,
    category: 'Shoes',
    tags: ['skate', 'casual'],
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    ],
    stock: 45,
    rating: 4.2,
    numReviews: 43,
    isFeatured: false,
  },
];

/* ------------------------------------------------------------------ */
/*  ORDERS  (generated in seed.js after users + products are inserted) */
/* ------------------------------------------------------------------ */
// Order templates — seed.js maps real user/product IDs into these
const orderTemplates = [
  {
    userIndex: 2, // Ahmed
    items: [
      { productSlug: 'solstice-wireless-headphones', quantity: 1 },
      { productSlug: 'nova-wireless-earbuds', quantity: 2 },
    ],
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: {
      line1: '45 Gulshan Block 13',
      city: 'Karachi',
      state: 'Sindh',
      postalCode: '75300',
      country: 'Pakistan',
    },
    trackingNumber: 'NXS-TRK-001',
    daysAgo: 15,
  },
  {
    userIndex: 3, // Fatima
    items: [
      { productSlug: 'aurora-leather-backpack', quantity: 1 },
      { productSlug: 'ember-crossbody-bag', quantity: 1 },
    ],
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: {
      line1: '7 DHA Phase 5',
      city: 'Lahore',
      state: 'Punjab',
      postalCode: '54792',
      country: 'Pakistan',
    },
    trackingNumber: 'NXS-TRK-002',
    daysAgo: 5,
  },
  {
    userIndex: 4, // Bilal
    items: [
      { productSlug: 'orion-smartwatch', quantity: 1 },
      { productSlug: 'charge-pro-wireless-pad', quantity: 1 },
    ],
    status: 'confirmed',
    paymentStatus: 'paid',
    shippingAddress: {
      line1: '23 F-7 Markaz',
      city: 'Islamabad',
      state: 'ICT',
      postalCode: '44000',
      country: 'Pakistan',
    },
    trackingNumber: 'NXS-TRK-003',
    daysAgo: 2,
  },
  {
    userIndex: 5, // Ayesha
    items: [
      { productSlug: 'lumen-smart-lamp', quantity: 2 },
      { productSlug: 'zen-aroma-diffuser', quantity: 1 },
      { productSlug: 'cloudsoft-throw-blanket', quantity: 1 },
    ],
    status: 'pending',
    paymentStatus: 'pending',
    shippingAddress: {
      line1: '9 Hayatabad Phase 3',
      city: 'Peshawar',
      state: 'KPK',
      postalCode: '25000',
      country: 'Pakistan',
    },
    trackingNumber: null,
    daysAgo: 0,
  },
  {
    userIndex: 6, // Usman
    items: [
      { productSlug: 'polar-trail-runners', quantity: 1 },
      { productSlug: 'summit-trekking-boots', quantity: 1 },
    ],
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: {
      line1: '3 Satellite Town',
      city: 'Rawalpindi',
      state: 'Punjab',
      postalCode: '46000',
      country: 'Pakistan',
    },
    trackingNumber: 'NXS-TRK-005',
    daysAgo: 20,
  },
  {
    userIndex: 2, // Ahmed (second order)
    items: [
      { productSlug: 'titan-mechanical-keyboard', quantity: 1 },
      { productSlug: 'helix-gaming-mouse', quantity: 1 },
    ],
    status: 'packed',
    paymentStatus: 'paid',
    shippingAddress: {
      line1: '45 Gulshan Block 13',
      city: 'Karachi',
      state: 'Sindh',
      postalCode: '75300',
      country: 'Pakistan',
    },
    trackingNumber: 'NXS-TRK-006',
    daysAgo: 3,
  },
  {
    userIndex: 3, // Fatima (second order)
    items: [
      { productSlug: 'robosweep-robot-vacuum', quantity: 1 },
    ],
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: {
      line1: '7 DHA Phase 5',
      city: 'Lahore',
      state: 'Punjab',
      postalCode: '54792',
      country: 'Pakistan',
    },
    trackingNumber: 'NXS-TRK-007',
    daysAgo: 7,
  },
  {
    userIndex: 5, // Ayesha (second order)
    items: [
      { productSlug: 'aeroflex-running-shoes', quantity: 1 },
      { productSlug: 'nimbus-comfort-slides', quantity: 2 },
    ],
    status: 'cancelled',
    paymentStatus: 'refunded',
    shippingAddress: {
      line1: '9 Hayatabad Phase 3',
      city: 'Peshawar',
      state: 'KPK',
      postalCode: '25000',
      country: 'Pakistan',
    },
    trackingNumber: null,
    daysAgo: 10,
  },
];

module.exports = { products, users, orderTemplates };
