'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ── Services mega menu — 3-column SparxIT structure ────────────── */
const SVC_PILLARS = [
  {
    id: 'web',
    label: 'Web & App Development',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    subcats: [
      {
        id: 'web-dev', label: 'Web Development',
        services: [
          { name: 'WordPress Development',   desc: 'Custom themes, plugins & CMS',       href: '/wordpress-development-company/' },
          { name: 'Laravel Development',     desc: 'Robust PHP Laravel solutions',        href: '/laravel-development-company/' },
          { name: 'Python Development',      desc: 'Django & Flask web applications',     href: '/python-development-services/' },
          { name: 'PHP Development',         desc: 'Bespoke PHP web applications',        href: '/#services' },
          { name: 'CodeIgniter Development', desc: 'Lightweight PHP web apps',            href: '/codeigniter-development-company/' },
          { name: 'Drupal Development',      desc: 'Enterprise CMS platforms',            href: '/drupal-development-company/' },
          { name: 'Next.js Development',     desc: 'Fast, SEO-optimised React apps',      href: '/nextjs-development-services/' },
          { name: 'Joomla Development',      desc: 'Flexible Joomla CMS solutions',       href: '/joomla-development-company/' },
        ],
      },
      {
        id: 'mobile', label: 'Mobile App Development',
        services: [
          { name: 'iOS App Development',     desc: 'Native Swift & Xcode apps',           href: '/ios-app-development-company/' },
          { name: 'Android Development',     desc: 'Native Kotlin applications',           href: '/android-application-development-company/' },
          { name: 'React Native',            desc: 'Cross-platform mobile apps',           href: '/#services' },
          { name: 'Flutter Development',     desc: 'Beautiful cross-platform UIs',         href: '/flutter-app-development-services/' },
          { name: 'App UI/UX Design',        desc: 'Intuitive mobile experiences',         href: '/#services' },
          { name: 'App Maintenance',         desc: 'Ongoing updates & support',            href: '/#services' },
        ],
      },
      {
        id: 'design', label: 'UI/UX Design',
        services: [
          { name: 'Website Design',          desc: 'Conversion-focused web design',        href: '/website-design/' },
          { name: 'Mobile App Design',       desc: 'iOS & Android UI design',              href: '/mobile-app-design/' },
          { name: 'Brand Identity',          desc: 'Logo, colours & typography systems',   href: '/brand-identity/' },
          { name: 'Design Systems',          desc: 'Scalable component libraries',         href: '/design-systems/' },
          { name: 'Prototyping',             desc: 'Interactive wireframes & flows',       href: '/prototyping-services/' },
          { name: 'UX Research',             desc: 'User testing & journey mapping',       href: '/ux-research/' },
        ],
      },
    ],
  },
  {
    id: 'marketing',
    label: 'Digital Marketing & SEO',
    icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    subcats: [
      {
        id: 'seo', label: 'SEO Services',
        services: [
          { name: 'SEO Services',            desc: 'Full-service search optimisation',     href: '/seo-services/' },
          { name: 'Technical SEO',           desc: 'Site speed, crawlability & schema',    href: '/seo-services-company/' },
          { name: 'Local SEO',               desc: 'Dominate local search results',        href: '/seo-services-company/' },
          { name: 'eCommerce SEO',           desc: 'Product & category page rankings',     href: '/seo-services-company/' },
          { name: 'SEO Audit',               desc: 'Comprehensive site health check',      href: '/seo-services-company/' },
          { name: 'SEO Packages',            desc: 'Affordable monthly SEO plans',         href: '/affordable-seo-packages/' },
        ],
      },
      {
        id: 'paid', label: 'Paid Advertising',
        services: [
          { name: 'Google Ads (PPC)',        desc: 'Search & display campaign management', href: '/#services' },
          { name: 'Meta Ads',                desc: 'Facebook & Instagram advertising',     href: '/#services' },
          { name: 'LinkedIn Ads',            desc: 'B2B lead generation campaigns',        href: '/#services' },
          { name: 'Google Shopping',         desc: 'eCommerce product listing ads',        href: '/#services' },
          { name: 'Remarketing',             desc: 'Retarget and convert lost visitors',   href: '/#services' },
          { name: 'PPC Audit',               desc: 'Optimise your existing ad spend',      href: '/#services' },
        ],
      },
      {
        id: 'content', label: 'Content & Social',
        services: [
          { name: 'Content Marketing',       desc: 'SEO content that ranks & converts',   href: '/content-marketing-services/' },
          { name: 'Social Media Marketing',  desc: 'Brand growth on social platforms',    href: '/social-media-marketing-services/' },
          { name: 'Email Marketing',         desc: 'Automated drip campaigns',            href: '/email-marketing-services/' },
          { name: 'Analytics & CRO',         desc: 'Data-driven growth optimisation',     href: '/analytics-cro-services/' },
          { name: 'Reputation Management',   desc: 'Monitor & protect your brand online', href: '/reputation-management-services/' },
          { name: 'Video Marketing',         desc: 'YouTube & short-form video strategy', href: '/video-marketing-services/' },
        ],
      },
    ],
  },
  {
    id: 'ecommerce',
    label: 'eCommerce Solutions',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    subcats: [
      {
        id: 'platforms', label: 'Platform Development',
        services: [
          { name: 'Shopify Development',     desc: 'Custom Shopify stores & apps',         href: '/shopify-store-development/' },
          { name: 'WooCommerce Development', desc: 'WordPress-powered online stores',      href: '/woocommerce-development-company/' },
          { name: 'Magento Development',     desc: 'Enterprise Magento 2 solutions',       href: '/magento-development-company/' },
          { name: 'OpenCart Development',    desc: 'Scalable OpenCart storefronts',        href: '/opencart-development-company/' },
          { name: 'eCommerce Development',   desc: 'Custom end-to-end store builds',       href: '/ecommerce-website-development-services/' },
          { name: 'B2B eCommerce',           desc: 'Wholesale & trade portal solutions',   href: '/#services' },
        ],
      },
      {
        id: 'store-opt', label: 'Store Optimization',
        services: [
          { name: 'Conversion Rate Optimization', desc: 'Turn visitors into buyers',       href: '/#services' },
          { name: 'Site Speed Optimization', desc: 'Faster stores, better conversions',    href: '/#services' },
          { name: 'Product Page SEO',        desc: 'Rank product pages on Google',         href: '/#services' },
          { name: 'Checkout Optimization',   desc: 'Reduce cart abandonment',              href: '/#services' },
          { name: 'UX Audit',                desc: 'Identify and fix friction points',     href: '/#services' },
          { name: 'A/B Testing',             desc: 'Data-driven design experiments',       href: '/#services' },
        ],
      },
      {
        id: 'ecom-mkt', label: 'eCommerce Marketing',
        services: [
          { name: 'Google Shopping Ads',     desc: 'Product listing campaign management',  href: '/google-shopping-management/' },
          { name: 'Amazon Marketing',        desc: 'Amazon SEO & sponsored ads',           href: '/amazon-account-management-services/' },
          { name: 'eCommerce SEO',           desc: 'Organic traffic for your store',       href: '/ecommerce-seo-services/' },
          { name: 'Email Automation',        desc: 'Cart recovery & lifecycle emails',     href: '/email-marketing-services/' },
          { name: 'Social Commerce',         desc: 'Sell on Instagram & Facebook',         href: '/social-media-marketing-services/' },
          { name: 'Influencer Marketing',    desc: 'Build brand trust at scale',           href: '/#services' },
        ],
      },
      {
        id: 'marketplace', label: 'Marketplace Management',
        services: [
          { name: 'Amazon Management',             desc: 'Seller Central, PPC & Brand Registry',      href: '/amazon-account-management-services/' },
          { name: 'Walmart Marketplace',           desc: 'Seller Center, WFS & Walmart Ads',          href: '/walmart-account-management-services/' },
          { name: 'eBay Management',               desc: 'Store, listings & Promoted Listings',        href: '/ebay-account-management-services/' },
          { name: 'Etsy Shop Management',          desc: 'SEO, Etsy Ads & Star Seller strategy',      href: '/etsy-account-management-services/' },
          { name: 'Wayfair Supplier',              desc: 'Partner Home & CastleGate fulfilment',       href: '/wayfair-account-management-services/' },
          { name: 'Temu Marketplace',              desc: 'GMV growth & US market strategy',            href: '/temu-account-management-services/' },
          { name: 'Amazon FBA Reconciliation',     desc: 'Recover lost FBA inventory & fees',         href: '/amazon-fba-shipment-reconciliation-services/' },
          { name: 'Flipkart Management',           desc: 'F-Assured, FBF & Flipkart Ads',             href: '/flipkart-account-management-services/' },
          { name: 'Home Depot Marketplace',        desc: 'Supplier accounts & DSV setup',              href: '/home-depot-account-management-services/' },
          { name: 'Houzz Listings',                desc: 'Product listings for design professionals',  href: '/houzz-product-listing-services/' },
        ],
      },
    ],
  },
  {
    id: 'hire',
    label: 'Hire On Demand',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    subcats: [
      {
        id: 'hire-app', label: 'Hire App Developer',
        services: [
          { name: 'iOS Developer',         desc: 'Expert iOS devs building user-centric Swift & Objective-C apps.',         href: '/hire-ios-developer/' },
          { name: 'Android Developer',     desc: 'Skilled Android devs crafting high-quality apps for any device.',         href: '/hire-android-developer/' },
          { name: 'App Developer',         desc: 'Experienced app developers who bring your mobile ideas to life.',         href: '/hire-app-developer/' },
          { name: 'Swift Developer',       desc: 'Swift specialists for fast, modern & secure iOS development.',            href: '/hire-swift-developer/' },
          { name: 'React Native Developer',desc: 'Cross-platform experts building performant apps with React Native.',      href: '/hire-react-native-developer/' },
          { name: 'Flutter Developer',     desc: 'Flutter pros delivering stunning native-like apps on every platform.',    href: '/hire-flutter-developer/' },
          { name: 'PWA Developer',         desc: 'PWA specialists delivering app-like web experiences on any device.',      href: '/hire-pwa-developer/' },
        ],
      },
      {
        id: 'hire-js', label: 'Hire JS Developer',
        services: [
          { name: 'Node.js Developer',     desc: 'Node.js experts building scalable, event-driven backend systems.',       href: '/hire-nodejs-developer/' },
          { name: 'React.js Developer',    desc: 'React specialists creating fast, dynamic & interactive UIs.',            href: '/hire-reactjs-developer/' },
          { name: 'Angular Developer',     desc: 'Angular engineers building robust enterprise-grade web apps.',           href: '/hire-angularjs-developer/' },
          { name: 'JavaScript Developer',  desc: 'Versatile JS developers proficient across the full stack.',             href: '/hire-javascript-developer/' },
        ],
      },
      {
        id: 'hire-design', label: 'Hire UI/UX Designer',
        services: [
          { name: 'Web Designer',          desc: 'Creative designers crafting visually stunning digital experiences.',     href: '/hire-web-designer/' },
          { name: 'UI/UX Designer',        desc: 'User experience experts delivering intuitive, conversion-focused design.',href: '/hire-ui-ux-designer/' },
        ],
      },
      {
        id: 'hire-fullstack', label: 'Hire Full Stack Developer',
        services: [
          { name: 'MERN Stack Developer',  desc: 'Full-stack MERN specialists for end-to-end modern web solutions.',      href: '/hire-mern-stack-developer/' },
          { name: 'MEAN Stack Developer',  desc: 'MEAN stack experts for versatile, scalable web applications.',          href: '/hire-mean-stack-developer/' },
          { name: 'Full Stack Developer',  desc: 'Versatile full-stack devs covering your entire project needs.',         href: '/hire-full-stack-developer/' },
        ],
      },
      {
        id: 'offshore', label: 'Offshore Development',
        services: [
          { name: 'Offshore Developer',    desc: 'Top-tier offshore developers for global projects at competitive rates.', href: '/offshore-development-company/' },
          { name: 'Team Outsourcing',      desc: 'Dedicated outsourced teams aligned with your processes and goals.',     href: '/it-outsourcing-services/' },
          { name: 'Staff Augmentation',    desc: 'Scale your team instantly with vetted, on-demand developers.',          href: '/it-staff-augmentation-services/' },
          { name: 'Virtual CTO',           desc: 'Strategic technology leadership without the full-time commitment.',     href: '/virtual-cto-services/' },
          { name: 'Cost Optimization',     desc: 'Significant development savings with smart resource planning.',         href: '/software-development-cost-optimization/' },
        ],
      },
      {
        id: 'hire-web', label: 'Hire Web Developer',
        services: [
          { name: 'Shopify Developer',     desc: 'Shopify experts building high-converting custom online stores.',        href: '/hire-shopify-developer/' },
          { name: 'WordPress Developer',   desc: 'WordPress specialists for flexible, SEO-ready websites.',              href: '/hire-wordpress-developer/' },
          { name: 'Magento Developer',     desc: 'Magento pros delivering robust, feature-rich eCommerce platforms.',    href: '/hire-magento-developer/' },
          { name: 'PrestaShop Developer',  desc: 'PrestaShop devs building tailored, scalable online storefronts.',      href: '/hire-prestashop-developer/' },
          { name: 'Drupal Developer',      desc: 'Drupal specialists for powerful CMS and content-driven platforms.',    href: '/hire-drupal-developer/' },
          { name: 'PHP Developer',         desc: 'PHP veterans building dynamic, high-performance web applications.',    href: '/hire-php-developer/' },
          { name: 'Python Developer',      desc: 'Python experts creating clean, maintainable & scalable web apps.',     href: '/hire-python-developer/' },
          { name: 'Web Developer',         desc: 'Top-tier web talent matched to your stack and project requirements.',  href: '/hire-web-developer/' },
        ],
      },
      {
        id: 'hire-trending', label: 'Hire Trending Developer',
        services: [
          { name: 'AR Developer',          desc: 'AR specialists creating immersive augmented reality apps and games.',   href: '/hire-ar-developer/' },
          { name: 'VR Developer',          desc: 'VR engineers building phenomenal virtual reality experiences.',        href: '/hire-vr-developer/' },
          { name: 'ML Developer',          desc: 'Machine learning engineers building intelligent, data-driven models.',  href: '/hire-ml-developer/' },
          { name: 'Salesforce Developer',  desc: 'Salesforce experts customising CRM platforms for maximum ROI.',        href: '/hire-salesforce-developer/' },
          { name: 'Data Scientist',        desc: 'Data scientists extracting actionable insights from complex datasets.', href: '/hire-data-scientist/' },
          { name: 'Trending Tech Expert',  desc: 'Pioneers in AR/VR, ML, AI & next-gen technology stacks.',            href: '/hire-trending-developer/' },
        ],
      },
      {
        id: 'hire-blockchain', label: 'Hire Blockchain Developer',
        services: [
          { name: 'Blockchain Developer',  desc: 'Blockchain engineers building secure, decentralised smart solutions.',  href: '/hire-blockchain-developer/' },
        ],
      },
      {
        id: 'hire-ai', label: 'Hire AI Developer',
        services: [
          { name: 'AI Developer',          desc: 'Top AI talent driving your next tech breakthrough with cutting-edge ML.',href: '/hire-ai-developer/' },
        ],
      },
    ],
  },
  {
    id: 'enterprise',
    label: 'Cloud & Enterprise',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    subcats: [
      {
        id: 'cloud', label: 'Cloud & DevOps',
        services: [
          { name: 'Cloud Migration',          desc: 'Seamless migration to AWS, GCP & Azure.',              href: '/cloud-migration-services/' },
          { name: 'Cloud-Native Development', desc: 'Microservices, containers & Kubernetes solutions.',     href: '/cloud-native-services/' },
          { name: 'DevOps Services',          desc: 'CI/CD pipelines & infrastructure automation.',          href: '/devops-services-company/' },
        ],
      },
      {
        id: 'enterprise-apps', label: 'Enterprise Applications',
        services: [
          { name: 'CRM Development',          desc: 'Custom CRM systems for customer relationship management.', href: '/crm-application-development-company/' },
          { name: 'ERP Development',          desc: 'Integrated ERP solutions for business automation.',     href: '/erp-application-development-company/' },
          { name: 'TIBCO Development',        desc: 'TIBCO integration & middleware development services.',   href: '/tibco-development-services/' },
        ],
      },
      {
        id: 'support', label: 'Support & Maintenance',
        services: [
          { name: 'Website Maintenance',      desc: 'Ongoing support, updates & performance monitoring.',    href: '/website-support-maintenance-services/' },
          { name: 'WordPress Maintenance',    desc: 'Dedicated WordPress support & maintenance plans.',      href: '/wordpress-support-and-maintenance-services/' },
        ],
      },
    ],
  },
];

/* ── Industries mega menu data ───────────────────────────────────── */
const INDUSTRIES = [
  { name: 'Healthcare',          desc: 'Improve patient care with streamlined digital health solutions.',            href: '/healthcare-software-development/',              icon: 'M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z' },
  { name: 'Finance & BFSI',      desc: 'Optimise financial processes, reduce costs, and enhance security.',          href: '/fintech-software-development-company/',         icon: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z' },
  { name: 'Retail & eCommerce',  desc: 'Drive sales and improve customer engagement using AI/ML.',                   href: '/retail-ecommerce-software-development/',        icon: 'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.9 18 9 18h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z' },
  { name: 'Automotive',          desc: 'Enhance safety, streamline operations, and enable smart mobility.',          href: '/automotive-software-solutions/',                icon: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z' },
  { name: 'Manufacturing',       desc: 'Get intelligent manufacturing solutions to optimise productivity.',          href: '/manufacturing-software-development-services/', icon: 'M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h2v2h-2zM6 7h5v5H6zm6 3h2v2h-2zm0 3h2v4h-2z' },
  { name: 'Supply Chain',        desc: 'Improve sustainability with real-time supply chain monitoring.',             href: '/logistics-software-development-services/',     icon: 'M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z' },
  { name: 'Education',           desc: 'Technology-driven education solutions for improving student engagement.',    href: '/elearning-software-development-services/',     icon: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z' },
  { name: 'Real Estate',         desc: 'Boost sales, improve valuations, and personalise buyer experiences.',        href: '/real-estate-software-development/',             icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
  { name: 'Travel',              desc: 'Enhance customer journeys with personalised travel solutions.',              href: '/travel-and-tourism-software-solutions/',        icon: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z' },
  { name: 'Agriculture',        desc: 'Precision farming, IoT sensors, crop monitoring, and agri-marketplace platforms.', href: '/agriculture-software-development/',          icon: 'M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8m3.5 3c.28 0 .5.22.5.5v5c0 .28-.22.5-.5.5H13v1h2v1H9v-1h2v-1H8.5c-.28 0-.5-.22-.5-.5v-5c0-.28.22-.5.5-.5h7z' },
  { name: 'Entertainment',      desc: 'OTT streaming, music platforms, digital ticketing, and media tech solutions.',   href: '/entertainment-software-development/',        icon: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z' },
  { name: 'SaaS',               desc: 'Multi-tenant SaaS products with Stripe billing, SSO, and SOC 2 compliance.',    href: '/saas-application-development-company/',      icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5v-7l5 3.5-5 3.5z' },
  { name: 'Electric Vehicle',   desc: 'OCPP charging networks, fleet electrification, EMS, and V2G integration.',     href: '/ev-software-development-company/',           icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { name: 'Social Media',       desc: 'Niche social networks, short-form video, creator monetisation, and community apps.', href: '/social-media-app-development-company/',  icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
  { name: 'Wellness',           desc: 'Mental health apps, fitness coaching, corporate wellness, and wearable integration.', href: '/wellness-software-development/',         icon: 'M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z' },
];

/* ── About Us mega menu data ─────────────────────────────────────── */
const ABOUT_ITEMS = [
  { name: 'Who We Are',    desc: 'Our story, mission, values & the team behind 1Solutions.',      href: '/who-we-are',     icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { name: 'Work Culture',  desc: 'What makes 1Solutions a great place to work and grow.',         href: '/work-culture',   icon: 'M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' },
  { name: 'Open Positions',desc: 'Explore current openings and join our growing team.',           href: '/open-positions', icon: 'M21 13.255A23.931 23.931 0 0 1 12 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m4 6h.01M5 20h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z' },
  { name: 'Apply Online',  desc: 'Submit your application and start your journey with us.',       href: '/apply-online',   icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z' },
  { name: 'Privacy Policy',desc: 'How we collect, use, and protect your personal data.',          href: '/privacy-policy', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { name: 'Terms of Use',  desc: 'Read our terms and conditions of service.',                     href: '/terms-of-use',   icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0-2-2h2a2 2 0 0 0 2 2m-3 7h6m-6 4h4' },
  { name: 'Cookie Policy', desc: 'How we use cookies to improve your experience.',                href: '/cookie-policy',  icon: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-9a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-7-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' },
  { name: 'Refund Policy', desc: 'Our refund, cancellation and dispute resolution policy.',       href: '/refund-policy',  icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3z' },
];

export default function BlogHeader() {
  const [open,            setOpen]            = useState(false);
  const [scrolled,        setScrolled]        = useState(false);
  const [megaOpen,        setMegaOpen]        = useState(false);
  const [activePillar,    setActivePillar]    = useState('web');
  const [activeSubcat,    setActiveSubcat]    = useState('web-dev');
  const [indOpen,          setIndOpen]          = useState(false);
  const [aboutOpen,        setAboutOpen]        = useState(false);
  const [mobServicesOpen,  setMobServicesOpen]  = useState(false);
  const [mobIndOpen,       setMobIndOpen]       = useState(false);
  const [mobAboutOpen,     setMobAboutOpen]     = useState(false);

  const closeTimer      = useRef(null);
  const indCloseTimer   = useRef(null);
  const aboutCloseTimer = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const close = () => {
    setOpen(false);
    setMobServicesOpen(false);
    setMobIndOpen(false);
    setMobAboutOpen(false);
    setMegaOpen(false);
    setIndOpen(false);
    setAboutOpen(false);
    document.body.style.overflow = '';
  };

  /* Services mega handlers */
  const openMega   = () => { clearTimeout(closeTimer.current); setMegaOpen(true); setIndOpen(false); };
  const delayClose = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 160); };

  /* Industries mega handlers */
  const openInd       = () => { clearTimeout(indCloseTimer.current); setIndOpen(true); setMegaOpen(false); setAboutOpen(false); };
  const delayCloseInd = () => { indCloseTimer.current = setTimeout(() => setIndOpen(false), 160); };

  /* About mega handlers */
  const openAbout       = () => { clearTimeout(aboutCloseTimer.current); setAboutOpen(true); setMegaOpen(false); setIndOpen(false); };
  const delayCloseAbout = () => { aboutCloseTimer.current = setTimeout(() => setAboutOpen(false), 160); };

  const activePillarData = SVC_PILLARS.find(p => p.id === activePillar) || SVC_PILLARS[0];
  const activeSubcatData = activePillarData.subcats.find(s => s.id === activeSubcat) || activePillarData.subcats[0];

  return (
    <>
      {/* ── MAIN HEADER ── */}
      <header className={`bh-header${scrolled ? ' bh-scrolled' : ''}`}>
        <div className="bh-inner">

          <Link href="/" className="bh-logo" onClick={close}>
            <Image
              src="/images/1solutions-logo.png"
              alt="1Solutions Logo"
              width={216} height={60} priority
              style={{ height: '60px', width: 'auto', maxWidth: '216px' }}
            />
          </Link>

          <nav>
            <ul className="bh-nav">

              {/* ── Services ── */}
              <li className="bh-services-item" onMouseEnter={openMega} onMouseLeave={delayClose}>
                <button
                  className={`bh-services-btn${megaOpen ? ' bh-services-btn-on' : ''}`}
                  onClick={() => { setMegaOpen(v => !v); setIndOpen(false); }}
                  aria-haspopup="true" aria-expanded={megaOpen}
                >
                  Services
                  <svg className={`bh-services-caret${megaOpen ? ' bh-caret-up' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </li>

              {/* ── Industries ── */}
              <li className="bh-services-item" onMouseEnter={openInd} onMouseLeave={delayCloseInd}>
                <button
                  className={`bh-services-btn${indOpen ? ' bh-services-btn-on' : ''}`}
                  onClick={() => { setIndOpen(v => !v); setMegaOpen(false); }}
                  aria-haspopup="true" aria-expanded={indOpen}
                >
                  Industries
                  <svg className={`bh-services-caret${indOpen ? ' bh-caret-up' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </li>

              <li><Link href="/portfolio"    onClick={close}>Portfolio</Link></li>
              <li><Link href="/case-studies" onClick={close}>Case Studies</Link></li>
              <li><Link href="/blog"         onClick={close}>Insights</Link></li>

              {/* ── About Us ── */}
              <li className="bh-services-item" onMouseEnter={openAbout} onMouseLeave={delayCloseAbout}>
                <button
                  className={`bh-services-btn${aboutOpen ? ' bh-services-btn-on' : ''}`}
                  onClick={() => { setAboutOpen(v => !v); setMegaOpen(false); setIndOpen(false); }}
                  aria-haspopup="true" aria-expanded={aboutOpen}
                >
                  About Us
                  <svg className={`bh-services-caret${aboutOpen ? ' bh-caret-up' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="13" height="13">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>

          <div className="bh-cta-wrap">
            <Link href="/contact" className="bh-cta" onClick={close}>Contact Us →</Link>
          </div>

          <button
            className={`bh-hamburger${open ? ' bh-open' : ''}`}
            onClick={toggle}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>

        </div>

        {/* ── SERVICES MEGA PANEL (3-column SparxIT style) ── */}
        {megaOpen && (
          <div
            className="bh-svc-mega"
            onMouseEnter={openMega}
            onMouseLeave={delayClose}
            role="dialog"
            aria-label="Services mega menu"
          >
            <div className="bh-svc-inner">

              {/* Column 1: Pillars */}
              <div className="bh-svc-pillars">
                <p className="bh-svc-col-heading">SERVICE PILLARS</p>
                {SVC_PILLARS.map(pillar => (
                  <button
                    key={pillar.id}
                    className={`bh-svc-pillar${activePillar === pillar.id ? ' bh-svc-pillar-on' : ''}`}
                    onMouseEnter={() => {
                      setActivePillar(pillar.id);
                      setActiveSubcat(pillar.subcats[0].id);
                    }}
                    onClick={() => {
                      setActivePillar(pillar.id);
                      setActiveSubcat(pillar.subcats[0].id);
                    }}
                  >
                    <span className="bh-ind-icon-wrap" style={{ flexShrink: 0 }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={pillar.icon} />
                      </svg>
                    </span>
                    <span className="bh-svc-pillar-label">{pillar.label}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="12" height="12" className="bh-svc-pillar-arrow" aria-hidden="true">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                ))}
                <div className="bh-svc-view-all">
                  <Link href="/#services" onClick={close}>View all services →</Link>
                </div>
              </div>

              {/* Column 2: Sub-categories */}
              <div className="bh-svc-subcats">
                <p className="bh-svc-col-heading">{activePillarData.label.toUpperCase()}</p>
                {activePillarData.subcats.map(sub => (
                  <button
                    key={sub.id}
                    className={`bh-svc-subcat${activeSubcat === sub.id ? ' bh-svc-subcat-on' : ''}`}
                    onMouseEnter={() => setActiveSubcat(sub.id)}
                    onClick={() => setActiveSubcat(sub.id)}
                  >
                    {sub.label}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="11" height="11" aria-hidden="true">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                ))}
              </div>

              {/* Column 3: Services grid (2 cols) */}
              <div className="bh-svc-grid-col">
                <p className="bh-svc-col-heading">{activeSubcatData.label.toUpperCase()}</p>
                <div className="bh-svc-grid-2col">
                  {activeSubcatData.services.map(svc => (
                    <Link key={svc.name} href={svc.href} className="bh-svc-item" onClick={close}>
                      <span className="bh-ind-name">{svc.name}</span>
                      <span className="bh-ind-desc">{svc.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
            <div className="bh-ind-footer">
              <div className="bh-ind-footer-left">
                <span className="bh-ind-footer-text">Not sure which service fits your needs?</span>
                <Link href="/contact" className="bh-ind-footer-cta" onClick={close}>Talk to our team →</Link>
              </div>
              <div className="bh-ind-footer-right">
                <a href="mailto:info@1solutions.biz" className="bh-ind-footer-contact">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  info@1solutions.biz
                </a>
                <span className="bh-ind-footer-sep" />
                <a href="tel:+919654327900" className="bh-ind-footer-contact">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  +91 9654327900
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── INDUSTRIES MEGA PANEL (SparxIT style) ── */}
        {indOpen && (
          <div
            className="bh-ind-mega"
            onMouseEnter={openInd}
            onMouseLeave={delayCloseInd}
            role="dialog"
            aria-label="Industries mega menu"
          >
            <div className="bh-ind-inner">
              <div className="bh-ind-grid">
                {INDUSTRIES.map(ind => (
                  <Link key={ind.name} href={ind.href} className="bh-ind-item" onClick={close}>
                    <span className="bh-ind-icon-wrap">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                        <path d={ind.icon} />
                      </svg>
                    </span>
                    <span>
                      <span className="bh-ind-name">{ind.name}</span>
                      <span className="bh-ind-desc">{ind.desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="bh-ind-footer">
              <div className="bh-ind-footer-left">
                <span className="bh-ind-footer-text">Ready to get started?</span>
                <Link href="/contact" className="bh-ind-footer-cta" onClick={close}>Let&apos;s Talk →</Link>
              </div>
              <div className="bh-ind-footer-right">
                <a href="mailto:info@1solutions.biz" className="bh-ind-footer-contact">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  info@1solutions.biz
                </a>
                <span className="bh-ind-footer-sep" />
                <a href="tel:+919654327900" className="bh-ind-footer-contact">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  +91 9654327900
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── ABOUT US MEGA PANEL ── */}
        {aboutOpen && (
          <div
            className="bh-ind-mega"
            onMouseEnter={openAbout}
            onMouseLeave={delayCloseAbout}
            role="dialog"
            aria-label="About Us mega menu"
          >
            <div className="bh-ind-inner">
              <p className="bh-about-label">WHO WE ARE</p>
              <div className="bh-about-grid">
                {ABOUT_ITEMS.map(item => (
                  <Link key={item.name} href={item.href} className="bh-about-item" onClick={close}>
                    <span className="bh-ind-icon-wrap">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon}/></svg>
                    </span>
                    <span style={{display:'flex',flexDirection:'column'}}>
                      <span className="bh-ind-name">{item.name}</span>
                      <span className="bh-ind-desc">{item.desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="bh-ind-footer">
              <div className="bh-ind-footer-left">
                <span className="bh-ind-footer-text">Ready to get started?</span>
                <Link href="/contact" className="bh-ind-footer-cta" onClick={close}>Let&apos;s Talk →</Link>
              </div>
              <div className="bh-ind-footer-right">
                <a href="mailto:info@1solutions.biz" className="bh-ind-footer-contact">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  info@1solutions.biz
                </a>
                <span className="bh-ind-footer-sep" />
                <a href="tel:+919654327900" className="bh-ind-footer-contact">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  +91 9654327900
                </a>
              </div>
            </div>
          </div>
        )}

      </header>

      {/* ── MOBILE NAV ── */}
      <nav className={`bh-mobile${open ? ' bh-open' : ''}`} aria-hidden={!open}>

        {/* Services accordion */}
        <div className="bh-mob-services">
          <button className="bh-mob-svc-btn" onClick={() => setMobServicesOpen(v => !v)}>
            Services
            <svg className={`bh-mob-caret${mobServicesOpen ? ' bh-caret-up' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {mobServicesOpen && (
            <div className="bh-mob-svc-panel">
              {SVC_PILLARS.map(pillar => (
                <div key={pillar.id} className="bh-mob-cat">
                  <span className="bh-mob-cat-label" style={{ color: '#FE9700' }}>{pillar.label}</span>
                  {pillar.subcats.map(sub => (
                    <div key={sub.id}>
                      <span className="bh-mob-subcat-label">{sub.label}</span>
                      {sub.services.map(svc => (
                        <Link key={svc.name} href={svc.href} className="bh-mob-svc-link" onClick={close}>{svc.name}</Link>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Industries accordion */}
        <div className="bh-mob-services">
          <button className="bh-mob-svc-btn" onClick={() => setMobIndOpen(v => !v)}>
            Industries
            <svg className={`bh-mob-caret${mobIndOpen ? ' bh-caret-up' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {mobIndOpen && (
            <div className="bh-mob-svc-panel">
              <div className="bh-mob-ind-grid">
                {INDUSTRIES.map(ind => (
                  <Link key={ind.name} href={ind.href} className="bh-mob-ind-link" onClick={close}>
                    {ind.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link href="/portfolio"    onClick={close}>Portfolio</Link>
        <Link href="/case-studies" onClick={close}>Case Studies</Link>
        <Link href="/blog"         onClick={close}>Insights</Link>

        {/* About Us accordion */}
        <div className="bh-mob-services">
          <button className="bh-mob-svc-btn" onClick={() => setMobAboutOpen(v => !v)}>
            About Us
            <svg className={`bh-mob-caret${mobAboutOpen ? ' bh-caret-up' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          {mobAboutOpen && (
            <div className="bh-mob-svc-panel">
              <div className="bh-mob-ind-grid">
                {ABOUT_ITEMS.map(item => (
                  <Link key={item.name} href={item.href} className="bh-mob-ind-link" onClick={close}>{item.name}</Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile contact info */}
        <div className="bh-mob-contact">
          <a href="mailto:info@1solutions.biz" className="bh-mob-contact-link">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            info@1solutions.biz
          </a>
          <a href="tel:+919654327900" className="bh-mob-contact-link">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            +91 9654327900
          </a>
        </div>

        <Link href="/contact" className="bh-mob-cta" onClick={close}>Contact Us →</Link>
      </nav>
    </>
  );
}
