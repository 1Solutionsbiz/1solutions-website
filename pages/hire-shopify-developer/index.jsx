'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire Shopify Developer', item: 'https://www.1solutions.biz/hire-shopify-developer/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Hire Shopify Developer',
      url: 'https://www.1solutions.biz/hire-shopify-developer/',
      description: 'Hire expert Shopify developers — custom Shopify theme development, Shopify Plus customisation, Liquid templating, Shopify App development, Shopify headless (Hydrogen), API integrations, migration to Shopify, and ongoing Shopify maintenance and support.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '96', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What can a Shopify developer do for my store?', acceptedAnswer: { '@type': 'Answer', text: 'A Shopify developer can build a custom Shopify theme from scratch or modify an existing theme using Liquid (Shopify\'s templating language), JavaScript, CSS, and the Shopify Theme API. They can develop custom Shopify apps (public or private) using Shopify\'s App Bridge, Admin API, Storefront API, and GraphQL. They can configure and extend Shopify Plus features (Scripts, Flows, Launchpad, B2B, Markets), integrate Shopify with external systems (ERP, CRM, PIM, 3PL, email platforms), migrate products, customers, and orders from another platform to Shopify, and set up Headless Shopify with Hydrogen/Remix for maximum front-end performance.' } },
        { '@type': 'Question', name: 'What is the difference between Shopify and Shopify Plus?', acceptedAnswer: { '@type': 'Answer', text: 'Shopify is the standard merchant plan suited to small and medium eCommerce businesses. Shopify Plus is the enterprise tier — it adds Shopify Scripts (custom pricing/discount logic at checkout), Shopify Flow (automated workflow engine), Launchpad (scheduled sale campaigns), multi-currency and multi-locale Markets, B2B wholesale portal, unlimited staff accounts, 99.99% SLA uptime, a dedicated merchant success manager, and higher API rate limits. Our Shopify developers work across both tiers, with specialist Shopify Plus experience for high-volume merchants with complex pricing, multi-store, or wholesale requirements.' } },
        { '@type': 'Question', name: 'Can you migrate our store from WooCommerce / Magento to Shopify?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We handle migrations to Shopify and Shopify Plus from WooCommerce, Magento, BigCommerce, PrestaShop, OpenCart, Volusion, custom PHP stores, and other platforms. Migration covers: product catalogue (titles, descriptions, images, variants, SKUs, metafields), customer accounts and password hashes, historical orders, blog content, SEO URL structure with 301 redirects to preserve search equity, navigation rebuild, payment gateway and shipping configuration on the new Shopify store, and a parallel testing period before DNS cutover.' } },
        { '@type': 'Question', name: 'Can you build a custom Shopify app?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We build public Shopify apps (listed on the Shopify App Store) and private custom Shopify apps for merchants. App development uses Shopify CLI, Remix framework, Shopify App Bridge, the Admin REST and GraphQL APIs, the Storefront API, and Shopify Functions for checkout extensibility (replacing the deprecated Shopify Scripts for new builds). We also build Shopify Theme App Extensions, Admin UI Extensions, and Checkout UI Extensions. All apps follow Shopify\'s app review guidelines and security requirements.' } },
        { '@type': 'Question', name: 'What is Shopify Headless and do you build it?', acceptedAnswer: { '@type': 'Answer', text: 'Shopify Headless (or "composable commerce") separates the Shopify backend (inventory, checkout, payments, orders) from the frontend presentation layer. Instead of a Liquid theme, the storefront is built with a custom framework — Shopify\'s own Hydrogen/Remix, Next.js with the Shopify Storefront API, or another React/Vue framework. Headless Shopify enables faster page loads, full design freedom, and progressive web app capabilities, but it is more complex and expensive to build and maintain. We build Hydrogen/Remix storefronts and Next.js + Storefront API storefronts for merchants who need performance or design capabilities beyond standard Shopify themes.' } },
        { '@type': 'Question', name: 'How long does it take to build a Shopify store?', acceptedAnswer: { '@type': 'Answer', text: 'Timeline depends on scope. A Shopify store using a premium theme (like Dawn, Prestige, or Impulse) with customisation, product upload, and configuration takes 3–5 weeks. A custom Shopify theme built from scratch typically takes 8–16 weeks. A Shopify Plus implementation with custom checkout, Scripts/Flows, and ERP integration takes 12–20 weeks. A migration from WooCommerce or Magento adds 2–4 weeks for the data migration and SEO redirect work. We provide a detailed project timeline in our scope document before any work begins.' } },
        { '@type': 'Question', name: 'Can you improve the performance and conversion rate of our existing Shopify store?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our Shopify CRO and performance optimisation services cover: Shopify theme performance audit (Lighthouse / Core Web Vitals), removing unused apps and scripts that slow down the store, image optimisation and lazy loading, Largest Contentful Paint (LCP) improvements, checkout flow UX audit and redesign, mobile conversion optimisation, A/B testing setup via native Shopify or third-party tools, product page optimisation (reviews, trust signals, variant selectors), and cart abandonment recovery via email and Shopify Inbox.' } },
        { '@type': 'Question', name: 'Do you offer ongoing Shopify support after launch?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We offer post-launch Shopify support under a retainer or time-and-materials arrangement: Shopify theme updates when Dawn/OS 2.0 updates break customisations, app updates and conflict resolution, new feature development, product catalogue management, Shopify Payments and shipping zone updates, SEO and metadata management, Google Merchant Center and Shopping feed maintenance, and performance monitoring. Our Shopify developers are available for a fixed monthly retainer or on an ad hoc basis for businesses that need occasional help without a full retainer commitment.' } },
      ],
    },
  ],
};

const SERVICES = [
  { n: '01', title: 'Custom Shopify Theme Development', desc: 'Bespoke Shopify themes built from scratch using Liquid, JavaScript (ES6+), SCSS, and the Shopify Theme API — pixel-perfect implementation of your brand design system, fully responsive, WCAG 2.1 AA accessible, and optimised for Lighthouse performance. No off-the-shelf themes modified with hacks.' },
  { n: '02', title: 'Shopify Plus Customisation', desc: 'Shopify Plus implementation and customisation — Shopify Scripts and Functions for custom pricing, discount, and checkout logic; Shopify Flow automation; Launchpad campaign scheduling; B2B wholesale portal setup; Shopify Markets for multi-region/multi-currency; and custom checkout extensions via Checkout UI Extensions API.', feat: true },
  { n: '03', title: 'Shopify App Development', desc: 'Public and private custom Shopify app development using Shopify CLI, Remix/Node.js, App Bridge, Admin REST and GraphQL APIs, Storefront API, Checkout UI Extensions, Theme App Extensions, and Admin UI Extensions — following Shopify app review guidelines for App Store submission or private merchant use.' },
  { n: '04', title: 'Shopify Headless (Hydrogen / Next.js)', desc: 'Headless Shopify storefronts built with Hydrogen/Remix or Next.js + Shopify Storefront API — for merchants needing maximum front-end performance (Core Web Vitals), full design freedom beyond Liquid constraints, or Progressive Web App capabilities. Hosted on Oxygen (Shopify native) or Vercel/Netlify.' },
  { n: '05', title: 'Migration to Shopify / Shopify Plus', desc: 'End-to-end migrations to Shopify from WooCommerce, Magento, BigCommerce, PrestaShop, OpenCart, and custom PHP stores — products, variants, metafields, customers, historical orders, blog content, SEO URL mapping with 301 redirects, navigation rebuild, and payment gateway configuration on the new store.' },
  { n: '06', title: 'Shopify Theme Customisation', desc: 'Customisation of purchased Shopify themes (Dawn, Prestige, Impulse, Turbo, Ella, and others) — modifying existing sections, building new custom Liquid sections and blocks, fixing mobile responsiveness issues, adding custom JavaScript functionality, and integrating third-party widgets without slowing page load.' },
  { n: '07', title: 'Shopify ERP, CRM & 3PL Integrations', desc: 'Integration of Shopify with external systems — ERP (SAP, Odoo, NetSuite, DEAR), CRM (Salesforce, HubSpot, Klaviyo), PIM (Akeneo), 3PL/fulfilment (ShipBob, ShipStation, Linnworks), ERP inventory sync, real-time stock webhooks, order routing, and multi-warehouse fulfilment logic via Shopify webhooks and the Admin API.' },
  { n: '08', title: 'Shopify Performance & CRO Optimisation', desc: 'Shopify store performance audit (Lighthouse / Core Web Vitals), removing performance-killing apps, image optimisation (WebP, lazy loading), LCP improvements, mobile conversion optimisation, checkout flow UX audit, product page trust signal optimisation, cart abandonment recovery, and A/B testing setup.' },
  { n: '09', title: 'Shopify SEO & Google Shopping', desc: 'Shopify SEO technical implementation — canonical URLs, hreflang for international stores, structured data (Product, Breadcrumb, FAQ schema), sitemap configuration, duplicate page removal (collection/tag pagination), image alt text, meta title/description management, Google Merchant Center product feed, and Google Shopping Ads integration.' },
  { n: '10', title: 'Shopify Maintenance & Ongoing Support', desc: 'Ongoing Shopify support retainers — theme updates when Shopify OS 2.0 changes break customisations, app conflict resolution, new feature additions, product catalogue management, Shopify Payments and shipping configuration, SEO and metadata updates, and emergency support for store outages or checkout failures.' },
];

const TECH_STACK = [
  { group: 'Shopify Core', color: '#5a8a00', items: ['Shopify 2.0 / OS 2.0', 'Shopify Plus', 'Liquid Templating', 'Shopify CLI 3.x', 'Shopify Theme Inspector', 'Dawn / Debut Themes'] },
  { group: 'Checkout & Commerce', color: '#00b5ad', items: ['Checkout UI Extensions', 'Shopify Functions', 'Shopify Scripts (Plus)', 'Shopify Flow', 'Shopify Markets', 'B2B Wholesale Portal'] },
  { group: 'APIs & Apps', color: '#D97706', items: ['Admin GraphQL API', 'Storefront API', 'App Bridge 3.x', 'Shopify Webhooks', 'REST Admin API', 'Shopify App Store'] },
  { group: 'Headless / Frontend', color: '#6366f1', items: ['Hydrogen / Remix', 'Next.js + Storefront API', 'React 18', 'Shopify Oxygen', 'Vercel / Netlify', 'Vite / Webpack'] },
  { group: 'Integrations', color: '#f97316', items: ['Klaviyo / Mailchimp', 'Salesforce / HubSpot', 'NetSuite / SAP', 'ShipBob / ShipStation', 'Linnworks / Brightpearl', 'Google Merchant Center'] },
  { group: 'Performance & SEO', color: '#0891b2', items: ['Core Web Vitals', 'Lighthouse Audit', 'Image Compression (WebP)', 'Lazy Loading', 'Structured Data', 'Hreflang / Markets SEO'] },
  { group: 'Payments & Checkout', color: '#a855f7', items: ['Shopify Payments', 'Stripe / PayPal', 'Afterpay / Klarna', 'Apple Pay / Google Pay', 'Multi-currency', 'Shop Pay Installments'] },
  { group: 'Analytics & CRO', color: '#e11d48', items: ['Google Analytics 4', 'Google Tag Manager', 'Shopify Analytics', 'A/B Testing', 'Hotjar / Microsoft Clarity', 'Facebook CAPI'] },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'dedicated',
    name: 'Dedicated Shopify Developer',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'A full-time Shopify developer working exclusively on your store.',
    desc: 'A dedicated offshore Shopify developer — or a team with a designer and QA — working as an extension of your eCommerce team. Full access to Liquid, Apps, and Shopify Plus APIs. You own all code. Significantly lower monthly cost than a local Shopify agency retainer or a full-time in-house hire.',
    bestFor: ['Shopify Plus merchants with ongoing roadmap', 'Fast-growing DTC brands needing constant feature work', 'Agencies needing a white-label Shopify development team', 'Replacing an expensive local Shopify agency at lower cost'],
    process: 'Discovery → Developer matching → Sprint delivery → Ongoing roadmap',
    timeline: 'Developer available within 5–7 business days',
  },
  {
    id: 'fixed',
    name: 'Fixed Price Project',
    badge: 'Defined scope',
    badgeColor: '#5a8a00',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Agreed price, agreed scope, delivered on a fixed schedule.',
    desc: 'Best for a well-defined Shopify project — custom theme build, WooCommerce to Shopify migration, custom Shopify app, or Shopify Plus checkout customisation with a clear specification. Fixed price covering design, development, testing, and launch. No scope creep, no surprise invoices.',
    bestFor: ['New Shopify store or custom theme from existing designs', 'WooCommerce / Magento migration to Shopify', 'Custom Shopify private app development', 'Shopify Plus checkout or Scripts customisation'],
    process: 'Detailed spec → Fixed quote → Milestone delivery → UAT → Launch',
    timeline: 'Best for 6–20 week projects',
  },
  {
    id: 'retainer',
    name: 'Monthly Retainer',
    badge: 'Flexible ongoing',
    badgeColor: '#a855f7',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Monthly Shopify dev hours for ongoing changes and support.',
    desc: 'A monthly bank of Shopify developer hours for feature additions, theme tweaks, app updates, product catalogue changes, conversion optimisation work, integration maintenance, and emergency support — without a full dedicated team. Transparent hours reporting each month.',
    bestFor: ['Established Shopify stores needing regular feature work', 'Shopify stores after custom theme launch needing updates', 'App conflict resolution and Shopify update compatibility', 'Flexible support without a full-time development commitment'],
    process: 'Monthly hours bank → Ticket-based prioritisation → Hours report → Rolling rollover',
    timeline: 'Start within 3–5 business days',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Shopify Requirements Discovery', desc: 'We review your Shopify store goals, current platform (if migrating), product catalogue complexity, required integrations, Shopify vs Shopify Plus requirements, design direction, and conversion optimisation priorities. For migrations, we perform a URL and SEO audit of your existing store before the project begins. You receive a written scope document before any work starts.' },
  { num: '02', title: 'Developer / Team Matching', desc: 'Based on your project requirements — theme development, app development, Shopify Plus, or headless — we assign the right Shopify developer(s). For dedicated engagement models, you meet your assigned developer, review their Shopify portfolio, and have the option to conduct a technical interview before the engagement begins.' },
  { num: '03', title: 'Design & Theme Architecture', desc: 'For custom Shopify theme projects: high-fidelity Figma mockups of all page templates (homepage, collection, product, cart, checkout, blog, and key landing pages). Shopify section and block architecture design — planning which elements are editable by your merchandising team in the theme editor without developer involvement.' },
  { num: '04', title: 'Shopify Development & Integration', desc: 'Liquid theme development, app development, Shopify Plus configuration, or migration execution — all in a Shopify development store first. Weekly demo of completed work. Product data migration and redirect mapping (for platform migrations). Third-party integration development and testing. Performance testing (Lighthouse / Core Web Vitals).' },
  { num: '05', title: 'QA, UAT & Pre-Launch Checklist', desc: 'Cross-device and cross-browser testing, checkout flow testing across all payment methods (including Shopify Payments, PayPal Express, Afterpay/Klarna), order notification email testing, Google Analytics 4 event tracking verification, Merchant Center product feed validation, SEO redirect verification (for migrations), and Shopify pre-launch checklist completion.' },
  { num: '06', title: 'Launch, Training & Post-Launch Support', desc: 'DNS/domain transfer or theme publish, Shopify Payments and shipping activation on the live store, post-launch monitoring (uptime, Shopify status page, error tracking), Google Search Console resubmission (for migrations), team training on the Shopify admin and theme editor, and a post-launch support period before transitioning to a maintenance retainer.' },
];

const TESTIMONIALS = [
  {
    text: "We migrated from a heavily customised WooCommerce store with 8,000 SKUs to Shopify Plus. 1Solutions managed the entire migration — product data, customer accounts, order history, blog content, and SEO redirects. Not a single ranking dropped in the three months post-launch. The Shopify Plus checkout customisation they built for us increased our average order value by 18%.",
    name: 'Olivia R.', role: 'Head of eCommerce, Fashion Brand (UK)', init: 'OR', bg: '#0F3460',
  },
  {
    text: "We needed a dedicated Shopify developer to work alongside our internal team building new features every sprint. 1Solutions matched us with a senior Liquid and App development specialist within a week. He has been with us for two years, joins our daily stand-up, and is indistinguishable from an in-house team member — at a third of the cost of a local UK developer. The quality of the code is excellent.",
    name: 'Tom A.', role: 'CTO, DTC Homeware Brand (AU)', init: 'TA', bg: '#14532d', feat: true,
  },
  {
    text: "1Solutions built our custom Shopify app for wholesale order management — it integrates with our Salesforce CRM and SAP ERP, allows our B2B buyers to log in and place orders at their contracted prices, and syncs inventory in real time. The App Bridge integration is clean and our warehouse team adopted it within a day. Six months in, it has handled over $4M in wholesale orders without a single incident.",
    name: 'Sarah K.', role: 'VP Operations, Wholesale Manufacturer (US)', init: 'SK', bg: '#1e3a5f',
  },
];

const WHY_CARDS = [
  { title: '15+ Years eCommerce & Shopify Experience', desc: 'We have been building eCommerce stores since before Shopify existed — and have grown with the Shopify platform from its early days through Shopify 2.0, Online Store 2.0, Shopify Plus, Checkout Extensibility, and Hydrogen. Our Shopify developers hold Shopify Partner and Shopify Plus certifications.' },
  { title: 'Shopify Plus Specialists', desc: "Shopify Plus is not just a higher plan — it has a completely different feature set: Scripts, Flow, Launchpad, B2B, Markets, and Checkout UI Extensions. We have specialist experience with Shopify Plus merchants' complex pricing, multi-region, multi-currency, and wholesale requirements that standard Shopify developers rarely encounter." },
  { title: 'Custom Code — No Theme Hack Workarounds', desc: 'We write clean, maintainable Liquid and JavaScript — not CSS overrides on top of a purchased theme that break on every Dawn update. Our custom themes are built to last and to be owned and modified by your team. We document every custom section and block we build.' },
  { title: 'Migration Expertise — SEO Preserved', desc: 'A Shopify migration is not a data transfer — it is an SEO project. We audit every URL, map every redirect, verify hreflang, and confirm redirect coverage before DNS cutover. We monitor Search Console for crawl errors in the weeks after migration. We have never lost significant organic traffic in a Shopify migration.' },
  { title: 'Custom App Development — Not Just Themes', desc: 'Most Shopify development agencies only do themes. We build custom Shopify apps — from private merchant apps that fill gaps in the App Store, to Shopify Functions for checkout extensibility, to Checkout UI Extensions, to full public apps submitted to the App Store. App development is a core service, not an occasional side project.' },
  { title: 'Headless Shopify — When You Need It', desc: 'Headless Shopify is the right choice for some merchants, and over-engineering for most. We give you an honest assessment of whether Hydrogen, Next.js Storefront API, or a well-optimised Liquid theme is the right choice for your specific performance and design requirements — and build whichever is genuinely right.' },
  { title: 'Transparent Pricing — Predictable Monthly Cost', desc: 'Offshore Shopify developer costs are significantly lower than US/UK/AU agency rates. Our dedicated developer and retainer models give you a fixed monthly cost you can budget against. No hourly billing surprises. No project overruns. You know what you are spending each month.' },
  { title: 'Post-Launch Support — Not Just at Go-Live', desc: 'Shopify stores need ongoing attention — new features, app conflicts, Shopify platform updates that break customisations, SEO changes, and conversion optimisation work. Our post-launch retainers give you ongoing access to your Shopify developer team without renegotiating a new project each time you need something done.' },
];

const FAQS = [
  { q: 'What can a Shopify developer do for my store?', a: "A Shopify developer can build a custom theme using Liquid, JavaScript, and the Shopify Theme API; develop custom private or public Shopify apps; configure and extend Shopify Plus features (Scripts, Flow, Markets, B2B); integrate Shopify with ERP, CRM, 3PL, and email platforms; migrate your existing store to Shopify with full SEO redirect mapping; build a Headless Shopify storefront with Hydrogen/Remix or Next.js; and optimise store performance and conversion rate. They're eCommerce specialists who know Shopify's platform constraints and capabilities — not just general web developers." },
  { q: 'What is the difference between Shopify and Shopify Plus?', a: "Shopify Plus is the enterprise tier adding: Shopify Scripts and Functions for custom checkout pricing/discount logic; Shopify Flow for automated workflows; Launchpad for scheduled campaigns; multi-locale Markets for international commerce; B2B wholesale portal; unlimited staff accounts; 99.99% SLA uptime; and higher API rate limits. Our developers work across both tiers, with specialist Shopify Plus experience for high-volume merchants with complex pricing, multi-store, or wholesale requirements." },
  { q: 'Can you migrate our store from WooCommerce or Magento to Shopify?', a: "Yes. We handle full migrations to Shopify from WooCommerce, Magento, BigCommerce, PrestaShop, OpenCart, and custom PHP stores. Migration covers: products (with variants, metafields, images), customer accounts, historical orders, blog content, SEO URL mapping with 301 redirects to preserve search equity, navigation rebuild, and payment and shipping configuration on the new store. We run a parallel testing period before DNS cutover and monitor Search Console post-migration." },
  { q: 'Can you build a custom Shopify app?', a: "Yes. We build public Shopify apps (for App Store listing) and private custom apps for individual merchants. App development uses Shopify CLI, Remix/Node.js, App Bridge 3.x, Admin GraphQL and REST APIs, Storefront API, Shopify Functions (for checkout extensibility), Checkout UI Extensions, Theme App Extensions, and Admin UI Extensions. All apps meet Shopify's review guidelines and security requirements for embedded app architecture." },
  { q: 'What is Shopify Headless and when should I use it?', a: "Shopify Headless decouples the Shopify backend (checkout, payments, inventory) from the storefront, replaced with a custom framework — Shopify's Hydrogen/Remix, Next.js with the Storefront API, or similar. It enables maximum front-end performance and full design freedom, but is more expensive to build and maintain. It's the right choice for merchants who need sub-second LCP scores, PWA capabilities, or design freedom beyond Liquid constraints. For most merchants, a well-optimised Liquid theme is faster and cheaper to maintain." },
  { q: 'How long does it take to build a Shopify store?', a: 'Timeline depends on scope. A Shopify store using a purchased theme with customisation takes 3–5 weeks. A custom Shopify theme from scratch takes 8–16 weeks. Shopify Plus with custom checkout and ERP integration takes 12–20 weeks. A migration from WooCommerce or Magento adds 2–4 weeks for data migration and SEO redirect work. We provide a detailed project timeline in our scope document before work begins — no open-ended engagements.' },
  { q: 'Can you improve performance and conversions on our existing Shopify store?', a: "Yes. Our Shopify CRO and performance work covers: Lighthouse and Core Web Vitals audit, removing slow apps and scripts, image optimisation (WebP, lazy load), LCP improvements, mobile conversion UX audit, checkout flow redesign, product page trust signal optimisation, A/B testing setup, and cart abandonment recovery. Many stores we audit have significant performance drag from accumulated apps — removing and consolidating these often yields a 40–60% PageSpeed improvement before any code changes." },
  { q: 'Do you offer ongoing Shopify support after launch?', a: "Yes. Post-launch Shopify support is available as a monthly retainer (fixed hours bank) or time-and-materials. Work covered: theme updates when Shopify OS 2.0 changes break customisations, app conflict resolution, new feature additions, product catalogue management, SEO and metadata updates, Google Merchant Center feed maintenance, and emergency support for checkout or store outages. We also offer dedicated Shopify developer retainers for merchants who need a developer available part-time or full-time on an ongoing basis." },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (!num) return;
    let t0 = null;
    const step = ts => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  return (
    <div className="sh-stat-col">
      <div className="sh-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="sh-stat-label">{label}</div>
    </div>
  );
}

export default function HireShopifyDeveloper() {
  const [showAllSvc, setShowAllSvc] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleSvcCards, setVisibleSvcCards] = useState([]);
  const [visibleEngCards, setVisibleEngCards] = useState([]);
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const [visibleStackCards, setVisibleStackCards] = useState([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const svcGridRef = useRef(null);
  const engGridRef = useRef(null);
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);
  const stackGridRef = useRef(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const pairs = [[svcGridRef, SERVICES.length, setVisibleSvcCards],[engGridRef, 3, setVisibleEngCards],[whyGridRef, WHY_CARDS.length, setVisibleWhyCards],[testiGridRef, 3, setVisibleTestiCards],[stackGridRef, TECH_STACK.length, setVisibleStackCards]];
    const observers = pairs.map(([ref, count, setter]) => {
      if (!ref.current) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 80)); obs.disconnect(); } }, { threshold: 0.05 });
      obs.observe(ref.current);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisibleSections(p => new Set([...p, key])); obs.disconnect(); } }, { threshold: 0.1 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const visibleServices = showAllSvc ? SERVICES : SERVICES.slice(0, 6);

  return (
    <>
      <Head>
        <title>Hire Shopify Developer | Custom Themes, Shopify Plus, Apps & Headless | 1Solutions</title>
        <meta name="description" content="Hire expert Shopify developers — custom Liquid themes, Shopify Plus customisation, private app development, WooCommerce to Shopify migration, Headless Shopify (Hydrogen), and ongoing Shopify support. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-shopify-developer/" />
        <meta property="og:title" content="Hire Shopify Developer | 1Solutions" />
        <meta property="og:description" content="Dedicated Shopify developers — custom themes, Shopify Plus, private app development, platform migration, Headless Shopify, ERP integrations, and monthly retainers." />
        <meta property="og:url" content="https://www.1solutions.biz/hire-shopify-developer/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .sh-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#f0fdf4 0%,#dcfce7 20%,#f0f9ff 50%,#fef9c3 75%,#f0fdf4 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .sh-page *,.sh-page *::before,.sh-page *::after{box-sizing:border-box}
          .sh-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .sh-orb-1{width:880px;height:880px;background:radial-gradient(circle,rgba(90,138,0,.20) 0%,rgba(150,191,71,.08) 40%,transparent 70%);top:-280px;right:-260px}
          .sh-orb-2{width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px}
          .sh-orb-3{width:550px;height:550px;background:radial-gradient(circle,rgba(0,181,173,.14) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%)}
          .sh-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .sh-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .sh-breadcrumb li{display:flex;align-items:center;gap:6px}
          .sh-breadcrumb li::after{content:'/';opacity:.45}
          .sh-breadcrumb li:last-child::after{display:none}
          .sh-breadcrumb a{color:#0F3460;text-decoration:none}
          .sh-breadcrumb a:hover{text-decoration:underline}
          .sh-hero{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px}
          .sh-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .sh-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#5a8a00 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .sh-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px}
          .sh-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .sh-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .sh-badge-dot{width:7px;height:7px;border-radius:50%;background:#5a8a00;flex-shrink:0}
          .sh-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .sh-btn-primary{display:inline-block;padding:14px 36px;background:#5a8a00;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(90,138,0,.28)}
          .sh-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .sh-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .sh-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(90,138,0,.5);transform:translateY(-2px)}
          .sh-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .sh-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .sh-stat-col:last-child{border-right:none}
          .sh-stat-val{font-size:28px;font-weight:900;color:#5a8a00;letter-spacing:-.5px;line-height:1}
          .sh-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .sh-logos{position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .sh-logos-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0}
          .sh-logos-wrap{width:100%;overflow:hidden}
          .sh-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:sh-marquee 28s linear infinite}
          .sh-logos-track:hover{animation-play-state:paused}
          @keyframes sh-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .sh-clogo{height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .sh-clogo:hover{opacity:.85;filter:grayscale(0%)}
          .sh-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .sh-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .sh-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .sh-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .sh-s-reveal.sh-revealed{opacity:1;transform:translateY(0)}
          .sh-inner{max-width:1300px;margin:0 auto}
          .sh-svc-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .sh-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .sh-svc-card{background:linear-gradient(135deg,rgba(240,253,244,.50) 0%,rgba(255,255,255,.85) 55%,rgba(254,252,232,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s}
          .sh-svc-card.sh-cv{opacity:1;transform:translateY(0)}
          .sh-svc-card.sh-cv:hover{transform:translateY(-6px);border-color:rgba(90,138,0,.30);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .sh-svc-card.feat{border-color:rgba(90,138,0,.20)}
          .sh-svc-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .sh-svc-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .sh-svc-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .sh-svc-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#5a8a00,#96bf47);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .sh-svc-card.sh-cv:hover::before{transform:scaleY(1)}
          .sh-svc-more{text-align:center;margin-top:22px}
          .sh-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .sh-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .sh-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .sh-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .sh-stack-card{background:linear-gradient(135deg,rgba(240,253,244,.50) 0%,rgba(255,255,255,.85) 55%,rgba(254,252,232,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .sh-stack-card.sh-sv{opacity:1;transform:translateY(0)}
          .sh-stack-card.sh-sv:hover{border-color:rgba(90,138,0,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .sh-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .sh-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .sh-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .sh-eng-section{padding:80px 40px;position:relative;z-index:1}
          .sh-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .sh-eng-card{background:linear-gradient(135deg,rgba(240,253,244,.50) 0%,rgba(255,255,255,.85) 55%,rgba(254,252,232,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s}
          .sh-eng-card.sh-ev{opacity:1;transform:translateY(0)}
          .sh-eng-card.sh-ev:hover{border-color:rgba(90,138,0,.25);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .sh-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(240,253,244,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .sh-eng-card.feat.sh-ev{transform:translateY(-8px)}
          .sh-eng-card.feat.sh-ev:hover{transform:translateY(-12px)}
          .sh-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .sh-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s}
          .sh-eng-card.sh-ev:hover .sh-eng-icon{background:rgba(90,138,0,.10)}
          .sh-eng-card.feat .sh-eng-icon{background:rgba(217,119,6,.10)}
          .sh-eng-icon svg{fill:#0F3460;transition:fill .2s}
          .sh-eng-card.sh-ev:hover .sh-eng-icon svg{fill:#5a8a00}
          .sh-eng-card.feat .sh-eng-icon svg{fill:#D97706}
          .sh-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .sh-eng-headline{font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px}
          .sh-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .sh-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .sh-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .sh-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .sh-eng-list li::before{content:'✓';font-weight:800;color:#5a8a00;flex-shrink:0;margin-top:1px}
          .sh-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .sh-eng-process strong{color:#0F3460}
          .sh-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .sh-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18)}
          .sh-eng-cta:hover{background:#0F3460;color:#fff}
          .sh-eng-card.feat .sh-eng-cta{background:#5a8a00;color:#fff;border-color:#5a8a00}
          .sh-eng-card.feat .sh-eng-cta:hover{background:#0F3460;border-color:#0F3460}
          .sh-process-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .sh-psteps{display:flex;flex-direction:column;margin-top:52px}
          .sh-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .sh-pstep.sh-pv{opacity:1;transform:translateY(0)}
          .sh-pstep-l{display:flex;flex-direction:column;align-items:center}
          .sh-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s}
          .sh-pstep.sh-pv:hover .sh-pstep-circle{background:rgba(90,138,0,.10);border-color:#5a8a00;color:#5a8a00}
          .sh-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .sh-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .sh-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .sh-pstep:last-child .sh-pstep-connector{display:none}
          .sh-pstep-r{padding:4px 0 38px}
          .sh-pstep:last-child .sh-pstep-r{padding-bottom:0}
          .sh-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .sh-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .sh-testi{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .sh-center-head{text-align:center;margin-bottom:48px}
          .sh-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .sh-tcard{background:linear-gradient(135deg,rgba(240,253,244,.50) 0%,rgba(255,255,255,.85) 55%,rgba(254,252,232,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s}
          .sh-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(240,253,244,.42) 100%);border-color:rgba(217,119,6,.22)}
          .sh-tcard.sh-tv{opacity:1;transform:translateY(0)}
          .sh-tcard.sh-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .sh-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .sh-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .sh-tauthor{display:flex;align-items:center;gap:12px}
          .sh-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .sh-tname{font-size:14px;font-weight:700;color:#0F3460}
          .sh-trole{font-size:12px;color:#6b7280}
          .sh-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .sh-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .sh-wcard{background:linear-gradient(135deg,rgba(240,253,244,.50) 0%,rgba(255,255,255,.85) 55%,rgba(254,252,232,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .sh-wcard.sh-wv{opacity:1;transform:translateY(0) scale(1)}
          .sh-wcard.sh-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(90,138,0,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .sh-wcard-dot{width:10px;height:10px;border-radius:50%;background:#5a8a00;margin-bottom:12px}
          .sh-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .sh-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .sh-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(240,253,244,.55) 0%,rgba(255,255,255,.60) 40%,rgba(254,252,232,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .sh-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .sh-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#5a8a00 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .sh-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .sh-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .sh-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .sh-cbenefit-icon{flex-shrink:0;color:#5a8a00;font-weight:800;font-size:16px;margin-top:1px}
          .sh-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .sh-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(240,253,244,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .sh-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .sh-form{display:flex;flex-direction:column;gap:13px}
          .sh-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .sh-fg{display:flex;flex-direction:column;gap:5px}
          .sh-fg.full{grid-column:1/-1}
          .sh-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .sh-fg input,.sh-fg textarea,.sh-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .sh-fg input:focus,.sh-fg textarea:focus,.sh-fg select:focus{outline:none;border-color:#5a8a00;box-shadow:0 0 0 3px rgba(90,138,0,.10)}
          .sh-consent{display:flex;gap:8px;align-items:flex-start}
          .sh-consent input{margin-top:3px;width:15px;height:15px}
          .sh-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .sh-consent a{color:#0F3460}
          .sh-submit{width:100%;padding:14px;background:#5a8a00;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(90,138,0,.26)}
          .sh-submit:hover{background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28)}
          .sh-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .sh-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .sh-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .sh-faq-list{display:flex;flex-direction:column;gap:10px}
          .sh-fitem{background:linear-gradient(135deg,rgba(240,253,244,.50) 0%,rgba(255,255,255,.85) 55%,rgba(254,252,232,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s}
          .sh-fitem.open{border-color:rgba(90,138,0,.30)}
          .sh-fitem.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#5a8a00,#96bf47);border-radius:3px 3px 0 0}
          .sh-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .sh-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .sh-fitem.open .sh-fq-badge{background:#5a8a00;color:#fff}
          .sh-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .sh-fitem.open .sh-fq span{color:#365314}
          .sh-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .sh-fitem.open .sh-fchev{transform:rotate(180deg);color:#5a8a00}
          .sh-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .sh-fitem.open .sh-fanswer-wrap{max-height:500px}
          .sh-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .sh-related{padding:80px 40px;background:rgba(240,253,244,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .sh-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .sh-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .sh-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .sh-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .sh-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .sh-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .sh-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .sh-rtag-blue{background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8}
          .sh-rtag-violet{background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9}
          .sh-rtag-amber{background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309}
          .sh-rtag-teal{background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E}
          .sh-rtag-green{background:rgba(90,138,0,.09);border-color:rgba(90,138,0,.28);color:#365314}
          .sh-rtag-rose{background:rgba(225,29,72,.09);border-color:rgba(225,29,72,.28);color:#9f1239}
          @media(max-width:1024px){.sh-hero h1,.sh-s-title,.sh-faq h2{font-size:36px}.sh-svc-grid{grid-template-columns:repeat(2,1fr)}.sh-stack-grid{grid-template-columns:repeat(2,1fr)}.sh-eng-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.sh-eng-card.feat{transform:none}.sh-eng-card.feat.sh-ev{transform:none}.sh-eng-card.feat.sh-ev:hover{transform:translateY(-4px)}.sh-why-grid{grid-template-columns:repeat(2,1fr)}.sh-tgrid{grid-template-columns:1fr}.sh-contact-grid{grid-template-columns:1fr}}
          @media(max-width:768px){.sh-breadcrumb{padding:12px 20px 0}.sh-hero{padding:28px 20px 20px}.sh-hero h1{font-size:26px;letter-spacing:-.3px}.sh-stats{grid-template-columns:1fr 1fr}.sh-stat-col:nth-child(2){border-right:none}.sh-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.sh-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.sh-logos{padding:16px 20px 28px}.sh-svc-section,.sh-stack-section,.sh-eng-section,.sh-process-section,.sh-testi,.sh-why-section,.sh-faq,.sh-related{padding:52px 20px}.sh-contact{padding:48px 20px}.sh-svc-grid,.sh-stack-grid,.sh-why-grid{grid-template-columns:1fr}.sh-frow{grid-template-columns:1fr}.sh-ctitle{font-size:28px}.sh-s-title{font-size:28px}}
        `}</style>
      </Head>

      <div className="sh-page">
        <div className="sh-orb sh-orb-1" /><div className="sh-orb sh-orb-2" /><div className="sh-orb sh-orb-3" />

        <nav className="sh-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Hire Shopify Developer</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <section className="sh-hero">
          <span className="sh-eyebrow">Hire Shopify Developer</span>
          <h1>Hire Expert Shopify Developers — Custom Themes, Shopify Plus, Apps & Headless</h1>
          <p className="sh-hero-desc">Dedicated Shopify developers for custom Liquid theme development, Shopify Plus customisation, private app development, WooCommerce to Shopify migration, Headless Shopify with Hydrogen, and ERP/CRM integrations. Shopify Partner with 15+ years of eCommerce expertise.</p>
          <div className="sh-trust-row">
            {['Shopify Partner','Shopify Plus Specialists','Custom App Development','Headless / Hydrogen','15+ Years eCommerce'].map(b => (
              <div className="sh-badge" key={b}><span className="sh-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="sh-ctas">
            <Link href="#contact" className="sh-btn-primary">Hire a Shopify Developer</Link>
            <Link href="#engagement" className="sh-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        <div className="sh-stats" ref={statsRef}>
          {[['80+','Shopify Stores Built'],['15+','Years eCommerce'],['50M+','Revenue Processed'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        <div className="sh-logos">
          <span className="sh-logos-label">Trusted by Leading eCommerce Brands</span>
          <div className="sh-logos-wrap">
            <div className="sh-logos-track">
              {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express 2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],['/logo/Uniphore.jpg','Uniphore 2'],['/logo/ICCoLogo.png','ICC 2'],['/logo/Honor_Logo_(2020).svg.png','Honor 2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2']].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="sh-clogo" />
              ))}
            </div>
          </div>
        </div>

        <section className="sh-svc-section" aria-labelledby="sh-svc-heading">
          <div className="sh-inner">
            <div className={`sh-s-reveal${visibleSections.has('svc') ? ' sh-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="sh-s-eyebrow">Shopify Development Services</span>
              <h2 id="sh-svc-heading" className="sh-s-title">What Our Shopify Developers Build</h2>
              <p className="sh-s-desc" style={{ maxWidth: 720 }}>Custom Liquid themes, Shopify Plus checkout extensions, private app development, platform migrations with SEO preserved, Headless Shopify with Hydrogen, ERP and CRM integrations, CRO and performance optimisation, and ongoing Shopify retainers.</p>
            </div>
            <div className="sh-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`sh-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' sh-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="sh-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="sh-svc-more">
                <button className="sh-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="stack" className="sh-stack-section" aria-labelledby="sh-stack-heading">
          <div className="sh-inner">
            <div className={`sh-s-reveal${visibleSections.has('stk') ? ' sh-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="sh-s-eyebrow">Shopify Tech Stack</span>
              <h2 id="sh-stack-heading" className="sh-s-title">Shopify 2.0, Plus, Hydrogen & the Integration Ecosystem</h2>
              <p className="sh-s-desc" style={{ maxWidth: 680 }}>Liquid, Shopify Plus (Scripts, Flow, Launchpad, Markets, B2B), Admin and Storefront GraphQL APIs, Hydrogen/Remix headless, Checkout UI Extensions, Shopify Functions, Klaviyo, Salesforce, NetSuite, and Google Shopping integrations.</p>
            </div>
            <div className="sh-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`sh-stack-card${visibleStackCards.includes(i) ? ' sh-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="sh-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="sh-stack-pills">
                    {grp.items.map(item => <span key={item} className="sh-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="engagement" className="sh-eng-section" aria-labelledby="sh-eng-heading">
          <div className="sh-inner">
            <div className={`sh-s-reveal${visibleSections.has('eng') ? ' sh-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="sh-s-eyebrow">How to Hire</span>
              <h2 id="sh-eng-heading" className="sh-s-title">Engagement Models for Shopify Development</h2>
              <p className="sh-s-desc" style={{ maxWidth: 680 }}>Hire a dedicated Shopify developer for an ongoing roadmap, engage on a fixed-price project for a defined Shopify build or migration, or take out a monthly retainer for ongoing changes and support — whichever matches your project and budget.</p>
            </div>
            <div className="sh-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`sh-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' sh-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="sh-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="sh-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div>
                  <div className="sh-eng-name">{m.name}</div>
                  <div className="sh-eng-headline">{m.headline}</div>
                  <div className="sh-eng-desc">{m.desc}</div>
                  <div className="sh-eng-list-label">Best for</div>
                  <ul className="sh-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                  <div className="sh-eng-process"><strong>Process:</strong> {m.process}<br /><span className="sh-eng-timeline">{m.timeline}</span></div>
                  <Link href="#contact" className="sh-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sh-process-section" aria-labelledby="sh-proc-heading">
          <div className="sh-inner" style={{ maxWidth: 760 }}>
            <div className={`sh-s-reveal${visibleSections.has('proc') ? ' sh-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="sh-s-eyebrow">How We Work</span>
              <h2 id="sh-proc-heading" className="sh-s-title">Our Shopify Development Process</h2>
              <p className="sh-s-desc">From requirements discovery and developer matching through design, development on a Shopify dev store, QA and UAT, launch, team training, and post-launch support — with stakeholder review at every stage.</p>
            </div>
            <div className="sh-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`sh-pstep${visibleSections.has('proc') ? ' sh-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="sh-pstep-l">
                    <div className="sh-pstep-circle">{step.num}</div>
                    <div className="sh-pstep-connector" />
                  </div>
                  <div className="sh-pstep-r">
                    <div className="sh-pstep-title">{step.title}</div>
                    <p className="sh-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sh-testi" aria-labelledby="sh-ts-heading">
          <div className="sh-inner">
            <div className={`sh-center-head sh-s-reveal${visibleSections.has('ts') ? ' sh-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="sh-s-eyebrow">Client Results</span>
              <h2 id="sh-ts-heading" className="sh-s-title">What Our Shopify Clients Say</h2>
              <p className="sh-s-desc">Trusted by fashion brands, DTC businesses, B2B wholesalers, and eCommerce merchants in the US, UK, and Australia who rely on us for serious Shopify development work.</p>
            </div>
            <div className="sh-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`sh-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' sh-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} itemScope itemType="https://schema.org/Review">
                  <div className="sh-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="sh-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="sh-tauthor">
                    <div className="sh-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div><div className="sh-tname" itemProp="author">{t.name}</div><div className="sh-trole">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sh-why-section" aria-labelledby="sh-wy-heading">
          <div className="sh-inner">
            <div className={`sh-s-reveal${visibleSections.has('wy') ? ' sh-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="sh-s-eyebrow">Why 1Solutions</span>
              <h2 id="sh-wy-heading" className="sh-s-title">Why Hire Our Shopify Developers</h2>
              <p className="sh-s-desc" style={{ maxWidth: 680 }}>Shopify Partner certification, 15+ years of eCommerce expertise, Shopify Plus specialist experience, custom app development capability, SEO-safe migrations, honest headless guidance, and transparent predictable monthly pricing.</p>
            </div>
            <div className="sh-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`sh-wcard${visibleWhyCards.includes(i) ? ' sh-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="sh-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="sh-contact" aria-labelledby="sh-contact-heading">
          <div className="sh-contact-grid">
            <div>
              <h2 id="sh-contact-heading" className="sh-ctitle">Hire a Shopify Developer</h2>
              <p className="sh-cdesc">Tell us about your Shopify project and we will match you with the right developer or team. Whether you need a custom Liquid theme, Shopify Plus customisation, a platform migration, a private app, or Headless Shopify — our Shopify specialists will scope your project and give you a transparent quote within 24 hours.</p>
              <div className="sh-cbenefits">
                {[['✓','Free Shopify project scoping call with a senior Shopify developer'],['✓','Shopify Plus capability — Scripts, Flow, B2B, Markets, Checkout Extensions'],['✓','Migration scoping includes free SEO URL audit for your existing store'],['✓','Custom app and Headless Shopify development — not just theme work'],['✓','Response within 24 business hours from our Shopify team']].map(([icon, text]) => (
                  <div className="sh-cbenefit" key={text}><span className="sh-cbenefit-icon">{icon}</span><p>{text}</p></div>
                ))}
              </div>
            </div>
            <div className="sh-form-box">
              <h3>Tell Us About Your Shopify Project</h3>
              <form className="sh-form" onSubmit={e => e.preventDefault()}>
                <div className="sh-frow">
                  <div className="sh-fg"><label htmlFor="sh-name">Full Name *</label><input id="sh-name" type="text" placeholder="Your name" required /></div>
                  <div className="sh-fg"><label htmlFor="sh-email">Work Email *</label><input id="sh-email" type="email" placeholder="you@company.com" required /></div>
                </div>
                <div className="sh-frow">
                  <div className="sh-fg"><label htmlFor="sh-url">Shopify Store URL</label><input id="sh-url" type="url" placeholder="https://yourstore.myshopify.com" /></div>
                  <div className="sh-fg"><label htmlFor="sh-phone">Phone / WhatsApp</label><input id="sh-phone" type="tel" placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="sh-fg full">
                  <label htmlFor="sh-type">Project Type *</label>
                  <select id="sh-type" required>
                    <option value="">Select project type...</option>
                    <option>Custom Shopify Theme Development</option>
                    <option>Shopify Plus Customisation</option>
                    <option>Custom Shopify App Development</option>
                    <option>Headless Shopify (Hydrogen / Next.js)</option>
                    <option>Migration to Shopify (from WooCommerce / Magento / other)</option>
                    <option>Shopify Theme Customisation</option>
                    <option>Shopify ERP / CRM Integration</option>
                    <option>Shopify Performance & CRO</option>
                    <option>Shopify SEO & Google Shopping</option>
                    <option>Ongoing Shopify Maintenance / Retainer</option>
                    <option>Dedicated Shopify Developer (ongoing team)</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="sh-fg full">
                  <label htmlFor="sh-msg">Project Brief *</label>
                  <textarea id="sh-msg" rows={4} placeholder="Describe your Shopify project — current platform if migrating, number of products, required integrations, whether you need Shopify or Shopify Plus, design brief, and your launch timeline..." required />
                </div>
                <div className="sh-consent">
                  <input id="sh-consent" type="checkbox" required />
                  <label htmlFor="sh-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. We treat all project details confidentially.</label>
                </div>
                <button type="submit" className="sh-submit">Get Free Shopify Consultation →</button>
              </form>
            </div>
          </div>
        </section>

        <section className="sh-faq" aria-labelledby="sh-faq-heading">
          <div className="sh-inner" style={{ maxWidth: 860 }}>
            <span className="sh-s-eyebrow">FAQ</span>
            <h2 id="sh-faq-heading">Hire Shopify Developer — Frequently Asked Questions</h2>
            <p className="sh-faq-sub">Everything you need to know about hiring a Shopify developer from 1Solutions — what we build, Shopify vs Shopify Plus, migrations, custom apps, Headless Shopify, timelines, and ongoing support.</p>
            <div className="sh-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`sh-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="sh-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="sh-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="sh-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="sh-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="sh-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sh-related">
          <div className="sh-related-inner">
            <span className="sh-s-eyebrow">Explore More</span>
            <h2>Related eCommerce & Hire Developer Services</h2>
            <p className="sh-related-sub">We also build WooCommerce, Magento, and custom eCommerce stores — and hire dedicated developers across all major frameworks and platforms.</p>
            <hr />
            <div className="sh-rtags">
              {[['/woocommerce-development-company/','WooCommerce Development','sh-rtag-violet'],['/magento-development-company/','Magento Development','sh-rtag-amber'],['/openCart-development-company/','OpenCart Development','sh-rtag-teal'],['/ecommerce-website-development-services/','eCommerce Development','sh-rtag-amber'],['/hire-wordpress-developer/','Hire WordPress Developer','sh-rtag-blue'],['/react-js-development-company/','React.js Development','sh-rtag-blue'],['/next-js-development-company/','Next.js Development','sh-rtag-violet'],['/website-support-maintenance-services/','Website Maintenance','sh-rtag-teal'],['/seo-services/','SEO Services','sh-rtag-green'],['/wordpress-support-and-maintenance-services/','WordPress Maintenance','sh-rtag-green']].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`sh-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
