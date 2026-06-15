'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.1solutions.biz/#industries' }, { '@type': 'ListItem', position: 3, name: 'Retail & eCommerce Software', item: 'https://www.1solutions.biz/retail-ecommerce-software-development/' }] },
    { '@type': 'Service', name: 'Retail & eCommerce Software Development', url: 'https://www.1solutions.biz/retail-ecommerce-software-development/', description: '1Solutions builds custom retail and eCommerce software — headless commerce platforms, D2C storefronts, marketplace development (multi-vendor), POS integration, inventory and order management systems, loyalty programmes, personalisation engines, and retail analytics. 15+ years, 150+ retail/eCommerce projects.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '112', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What retail and eCommerce software does 1Solutions develop?', acceptedAnswer: { '@type': 'Answer', text: '1Solutions develops custom eCommerce storefronts (headless and traditional), multi-vendor marketplace platforms, D2C (direct-to-consumer) stores, POS (point of sale) system integrations, inventory and order management systems, product information management (PIM), loyalty and rewards programmes, retail analytics dashboards, subscription commerce platforms, and omnichannel retail software connecting online and offline channels.' } },
      { '@type': 'Question', name: 'Do you build custom eCommerce platforms or work with Shopify/Magento?', acceptedAnswer: { '@type': 'Answer', text: 'Both. For retailers needing a fast go-to-market, we build on Shopify (custom themes, apps, headless Shopify with Next.js), Magento 2, WooCommerce, and BigCommerce. For retailers outgrowing platforms or needing proprietary technology, we build fully custom eCommerce platforms with React/Next.js frontends and Node.js or Python backends — ownership of the stack, no platform fees, and unlimited extensibility.' } },
      { '@type': 'Question', name: 'How long does it take to build a marketplace platform?', acceptedAnswer: { '@type': 'Answer', text: 'A multi-vendor marketplace with vendor onboarding, product listing, shopping cart, payment splitting, and order management typically takes 12–18 weeks for an MVP. A full-featured marketplace with advanced search, recommendation engine, vendor analytics, dispute management, and mobile app: 6–9 months. We recommend an MVP-first approach — launch with core buy/sell functionality, add features based on real user behaviour.' } },
    ] },
  ],
};

const SOLUTIONS = [
  { n: '01', title: 'Custom eCommerce Storefront', desc: 'Bespoke eCommerce platform — product catalogue and PIM integration, advanced search and filtering (Elasticsearch/Algolia), faceted navigation, product configurator, personalised homepage and category pages, multi-currency and multi-language, guest checkout and account, wishlist, recently viewed, cross-sell and upsell, and conversion-optimised checkout with Apple/Google Pay.' },
  { n: '02', title: 'Headless Commerce (Next.js + API)', desc: 'Headless architecture decoupling frontend from commerce backend — Next.js storefront with sub-second page loads, connected to Shopify, Magento, Commercetools, or a custom commerce API. Deliver rich content experiences (blogs, lookbooks, quizzes) alongside product pages, with a single unified cart and checkout. PWA capability for offline browsing and app-like UX.', feat: true },
  { n: '03', title: 'Multi-Vendor Marketplace', desc: 'Full marketplace platform — vendor onboarding and verification, individual vendor storefronts, multi-vendor cart and checkout, payment splitting and commission management (Stripe Connect), order routing by vendor, vendor dashboard (orders, inventory, payouts, reviews), dispute management, admin moderation tools, and consumer-facing marketplace with advanced search and recommendation.' },
  { n: '04', title: 'Order & Inventory Management System', desc: 'Unified commerce OMS/IMS — multi-channel order aggregation (website, marketplaces, POS, social), inventory sync across locations (warehouse, store, 3PL), real-time stock levels, purchase order management, demand forecasting, batch fulfilment, returns management (RMA), and integration with 3PL and carrier APIs (FedEx, UPS, DHL, Royal Mail, Australia Post).' },
  { n: '05', title: 'POS Integration & Omnichannel Retail', desc: 'Connect online and in-store commerce — POS integration (Square, Lightspeed, Shopify POS, EPOS Now), unified customer profile across channels, click-and-collect (BOPIS), in-store return of online orders, shared inventory view, staff lookup tools, loyalty integration at POS, and real-time sales and stock reporting across all retail locations and channels.' },
  { n: '06', title: 'Loyalty, Rewards & Subscription Commerce', desc: 'Customer retention technology — points-based loyalty engine (earn on purchase, redeem at checkout), tier management (Bronze/Silver/Gold), referral programme, subscription commerce (subscribe-and-save, box subscription, replenishment), digital loyalty card, loyalty app (iOS/Android), CRM segments for loyalty communications, and churn prediction to trigger retention offers.' },
  { n: '07', title: 'Product Information Management (PIM)', desc: 'Centralised product data management — single source of truth for product attributes, descriptions, images, pricing, and variants; multi-channel publishing (website, marketplaces, Google Shopping, social commerce); digital asset management (DAM); bulk import/export; automated feed generation for Google Shopping and Meta Shopping; and retailer-specific data formatting for wholesale portals.' },
  { n: '08', title: 'D2C & B2B eCommerce Portals', desc: 'D2C storefronts converting brand to direct sales channel — subscription model, post-purchase upsell, loyalty, customer portal. B2B eCommerce portals for wholesale — trade account registration, tiered pricing by customer group, minimum order quantities, credit terms and invoice payment, quick order (bulk SKU upload), quote management, and customer-specific catalogues.' },
  { n: '09', title: 'Personalisation & AI Recommendation Engine', desc: 'AI-powered retail personalisation — product recommendation engine (collaborative filtering, content-based, hybrid), personalised homepage banners and category sorting, dynamic pricing and promotion targeting, post-purchase email recommendation sequences, abandoned cart recovery with personalised product suggestions, and A/B testing framework for personalisation variants.' },
  { n: '10', title: 'Retail Analytics & Business Intelligence', desc: 'Retail analytics platform — sales performance dashboard (revenue, AOV, conversion, ROAS by channel), customer analytics (CLV, cohort retention, RFM segmentation), inventory analytics (sell-through rate, dead stock, reorder forecast), marketing attribution (first click, last click, data-driven), and automated insight reports delivered to merchandise and buying teams.' },
];

const TECH_STACK = [
  { group: 'Frontend & PWA', color: '#be185d', items: ['Next.js (headless)', 'React / TypeScript', 'Shopify Hydrogen', 'Progressive Web App', 'React Native (mobile)', 'Vue.js / Nuxt.js'] },
  { group: 'Commerce Backends', color: '#9d174d', items: ['Custom Node.js/NestJS', 'Shopify / Storefront API', 'Magento 2 / Adobe CC', 'Commercetools', 'BigCommerce', 'WooCommerce (headless)'] },
  { group: 'Search & Discovery', color: '#6d28d9', items: ['Elasticsearch', 'Algolia', 'Klevu (AI search)', 'Redis (session/cart)', 'Solr (catalog search)', 'Typesense'] },
  { group: 'Payments & Finance', color: '#b45309', items: ['Stripe / Stripe Connect', 'PayPal / Braintree', 'Klarna / Afterpay', 'Apple Pay / Google Pay', 'Adyen', 'Multi-currency FX'] },
  { group: 'Logistics & 3PL', color: '#059669', items: ['FedEx / UPS / DHL API', 'Royal Mail / AUS Post', 'ShipStation / ShipBob', 'Shippit / Starshipit', 'EasyPost', 'Returns management'] },
  { group: 'Marketing & CRM', color: '#0891b2', items: ['Klaviyo / Mailchimp', 'HubSpot CRM', 'Salesforce Commerce', 'Segment CDP', 'Attentive (SMS)', 'LoyaltyLion / Yotpo'] },
  { group: 'Cloud & DevOps', color: '#dc2626', items: ['AWS / GCP / Azure', 'Vercel / Netlify CDN', 'Kubernetes / EKS', 'GitHub Actions CI/CD', 'Terraform (IaC)', 'Cloudflare CDN'] },
  { group: 'Data & Analytics', color: '#0369a1', items: ['Google Analytics 4', 'Snowflake / BigQuery', 'Looker / Metabase', 'dbt (transformation)', 'Amplitude', 'Heap Analytics'] },
];

const ENGAGEMENT = [
  { id: 'platform', name: 'Custom eCommerce Platform', badge: 'Most Popular', bc: '#D97706', feat: true, icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', headline: 'Bespoke storefront or marketplace built to your spec.', desc: 'Full-cycle development of a custom eCommerce platform — storefront, checkout, OMS, inventory, payments, and mobile app. Discovery → architecture → agile sprints → launch → post-launch growth sprints.', best: ['Retailers outgrowing Shopify/Magento needing a custom platform', 'Brands building a D2C channel alongside wholesale/B2B', 'Entrepreneurs building a multi-vendor marketplace in a niche', 'Retailers needing omnichannel (online + POS + app) unification'], tl: 'MVP storefront live in 8–12 weeks; full platform 5–8 months' },
  { id: 'headless', name: 'Headless Commerce Migration', badge: 'Performance Upgrade', bc: '#be185d', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', headline: 'Sub-second storefronts on your existing commerce backend.', desc: 'Migration from a traditional monolithic storefront to a headless Next.js frontend — keeping Shopify, Magento, or custom backend, replacing the theme layer with a fast, SEO-optimised React storefront. Core Web Vitals improvement guaranteed.', best: ['Shopify stores with slow Liquid themes hurting conversion', 'Magento 2 stores with poor mobile UX and Core Web Vitals scores', 'Retailers wanting content-rich editorial pages alongside product pages', 'eCommerce brands prioritising sub-second page load and PWA capability'], tl: 'New headless storefront live in 8–14 weeks' },
  { id: 'integration', name: 'OMS & Integration Sprint', badge: 'Quick Win', bc: '#0369a1', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', headline: 'OMS, POS, and third-party integration fast.', desc: 'Fixed-scope integration of OMS, POS systems, 3PL carriers, ERP (SAP, NetSuite), or marketplace channels (Amazon, eBay, Google Shopping) into your existing eCommerce stack. Defined deliverables, fixed timeline.', best: ['Retailers manually managing orders across multiple channels', 'eCommerce brands connecting a new 3PL or fulfilment partner', 'Retailers adding click-and-collect or in-store return of online orders', 'Brands adding Amazon/eBay channel alongside their own store'], tl: 'Integration complete in 4–8 weeks' },
];

const TESTIMONIALS = [
  { text: "1Solutions rebuilt our eCommerce platform as a headless Next.js storefront on top of our Magento 2 backend. Page load time dropped from 6.2s to under 1s, Core Web Vitals went green across the board, and our checkout conversion rate improved by 34% in the first 90 days. Best technical investment we have made in three years of trading.", name: 'Emma T.', role: 'Head of eCommerce, Fashion Retailer (UK)', init: 'ET', bg: '#6d0d3f' },
  { text: "We hired 1Solutions to build our multi-vendor marketplace from scratch — vendor onboarding, product listing, Stripe Connect payment splitting, vendor dashboards, and a consumer app. MVP launched in 16 weeks. We now have 340 vendors and process $2.8M GMV per month. Their marketplace architecture expertise is genuinely rare.", name: 'Jason W.', role: 'Founder, Niche B2C Marketplace (AU)', init: 'JW', bg: '#5a1a0a', feat: true },
  { text: "1Solutions built our D2C subscription platform — subscribe-and-save, box subscription, loyalty programme, and a customer portal. Subscription revenue went from 0 to 28% of total revenue in 8 months. The loyalty app has a 4.8 rating in the App Store. Exceptional retail technology team — they understood our brand and our customers.", name: 'Claire B.', role: 'CEO, Health & Wellness D2C Brand (US)', init: 'CB', bg: '#1e3a5f' },
];

const WHY = [
  { t: '150+ Retail & eCommerce Projects', d: '1Solutions has built storefronts, marketplaces, PIM systems, loyalty platforms, OMS tools, and retail analytics for brands and retailers in the UK, US, Australia, and Canada over 15+ years.' },
  { t: 'Headless Commerce Specialists', d: 'Next.js headless storefronts on Shopify, Magento, Commercetools, and custom backends — sub-second page loads, Core Web Vitals 90+, PWA capability, and content-rich editorial experiences alongside product pages.' },
  { t: 'Conversion Rate Focus', d: 'We treat checkout conversion as the primary KPI. Every storefront we build is instrumented, A/B tested, and optimised — average 25–40% checkout conversion improvement in the first 90 days post-launch.' },
  { t: 'Stripe Connect Marketplace Expertise', d: 'Multi-vendor payment splitting, vendor onboarding (KYC), payout management, and dispute handling with Stripe Connect — the correct way to handle marketplace payments, not workarounds.' },
  { t: 'Omnichannel Retail Architecture', d: 'Connecting online, POS, mobile, and marketplace into a unified customer view — shared inventory, customer profiles, loyalty, and order history across every channel a shopper might use.' },
  { t: 'PIM & Feed Management', d: 'Centralised product data with multi-channel publishing to website, Amazon, eBay, Google Shopping, and Meta — automated feed generation, attribute mapping, and retailer-specific formatting for wholesale portals.' },
  { t: 'AI Personalisation & Recommendation', d: 'Product recommendation engines, personalised homepage and category sorting, dynamic pricing, and post-purchase sequences — retail AI that is measurably connected to revenue, not a vanity feature.' },
  { t: 'Post-Launch Growth Partnership', d: "Launch is the beginning, not the end. We offer sprint-based post-launch growth cycles — A/B testing, personalisation, new channel integrations, and performance monitoring — aligned to your trading calendar." },
];

const FAQS = [
  { q: 'What retail and eCommerce software does 1Solutions develop?', a: 'Custom eCommerce storefronts, headless commerce (Next.js), multi-vendor marketplaces, D2C and B2B portals, OMS and inventory management, POS integration, loyalty and subscription platforms, PIM systems, personalisation engines, and retail analytics dashboards.' },
  { q: 'Do you build on Shopify and Magento or only custom platforms?', a: 'Both. We build on Shopify (custom apps, themes, headless Hydrogen), Magento 2, WooCommerce, and BigCommerce. We also build fully custom eCommerce platforms for retailers that have outgrown SaaS platforms or need proprietary technology.' },
  { q: 'How long does it take to build a marketplace platform?', a: 'MVP marketplace (vendor onboarding, listing, checkout, payment splitting, order management): 12–18 weeks. Full-featured marketplace with AI search, recommendation, mobile app, and vendor analytics: 6–9 months. MVP-first approach recommended.' },
  { q: 'What is headless commerce and should we use it?', a: "Headless commerce separates the storefront (frontend) from the commerce backend (Shopify, Magento, custom). Benefits: sub-second page loads, Core Web Vitals 90+, content-rich pages, PWA capability. Trade-off: more complex than a standard theme, higher build cost. Recommended for retailers with $2M+ revenue where site speed directly affects conversion." },
  { q: 'Can you integrate our eCommerce platform with our ERP?', a: 'Yes — SAP, NetSuite, Microsoft Dynamics, Oracle, and custom ERP integration. Bidirectional sync of products, inventory, orders, customers, and pricing. We build integration layers (API middleware) that normalise data between systems and handle error retry, alerting, and reconciliation.' },
  { q: 'How do you handle multi-currency and multi-language?', a: 'Multi-currency: real-time FX rate feeds, currency switcher, currency-specific pricing rules, and localised payment methods. Multi-language: i18n framework (Next.js built-in or i18next), CMS-driven translation workflow, hreflang tags for SEO, and RTL support for Arabic/Hebrew where required.' },
  { q: 'Can you build a subscription commerce platform?', a: 'Yes — subscribe-and-save (variable product subscription), box subscription (curated recurring delivery), replenishment (auto-reorder when stock runs low), subscription portal (pause/skip/swap/cancel), and loyalty integration for subscribers. Built on Stripe Billing or Recharge, or custom-built for full ownership.' },
  { q: 'What technology stack do you use for eCommerce?', a: 'Frontend: Next.js (headless), React Native (mobile app). Commerce: Shopify, Magento 2, or custom Node.js. Search: Elasticsearch or Algolia. Payments: Stripe/Stripe Connect. Cloud: AWS/Vercel. CDN: Cloudflare. Emails: Klaviyo. Analytics: GA4, Segment, Snowflake.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => { if (!start) return; const n = parseInt(target.replace(/\D/g, ''), 10); if (!n) return; let t0 = null; const s = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) requestAnimationFrame(s); }; requestAnimationFrame(s); }, [start, target, duration]);
  return count;
}
function StatItem({ label, val, started }) {
  const n = useCountUp(val, 1800, started);
  const sfx = val.replace(/[\d,]/g, '');
  return (<div className="rce-sc"><div className="rce-sv">{started ? n + sfx : val}</div><div className="rce-sl">{label}</div></div>);
}

export default function RetailEcommerceSoftware() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [ss, setSs] = useState(false);
  const [vis, setVis] = useState(new Set());
  const [vSk, setVSk] = useState([]); const [vEn, setVEn] = useState([]); const [vWh, setVWh] = useState([]); const [vTe, setVTe] = useState([]); const [vSt, setVSt] = useState([]);
  const stR = useRef(null); const secR = useRef({});
  const skR = useRef(null); const enR = useRef(null); const whR = useRef(null); const teR = useRef(null); const stGr = useRef(null);
  useEffect(() => { if (!stR.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSs(true); o.disconnect(); } }, { threshold: 0.4 }); o.observe(stR.current); return () => o.disconnect(); }, []);
  useEffect(() => {
    const pairs = [[skR, SOLUTIONS.length, setVSk], [enR, 3, setVEn], [whR, WHY.length, setVWh], [teR, 3, setVTe], [stGr, TECH_STACK.length, setVSt]];
    const obs = pairs.map(([ref, count, setter]) => { if (!ref.current) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 75)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(ref.current); return o; });
    return () => obs.forEach(o => o?.disconnect());
  }, []);
  useEffect(() => { const ks = Object.keys(secR.current); const obs = ks.map(k => { const el = secR.current[k]; if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(p => new Set([...p, k])); o.disconnect(); } }, { threshold: 0.1 }); o.observe(el); return o; }); return () => obs.forEach(o => o?.disconnect()); }, []);
  const visS = showAll ? SOLUTIONS : SOLUTIONS.slice(0, 6);
  const ac = '#be185d'; const txt = '#500724'; const txt2 = '#831843';
  return (
    <>
      <Head>
        <title>Retail & eCommerce Software Development | Headless Commerce, Marketplace, OMS | 1Solutions</title>
        <meta name="description" content="Custom retail and eCommerce software development — headless commerce (Next.js), multi-vendor marketplaces, D2C storefronts, OMS, POS integration, loyalty programmes, and AI personalisation. 150+ retail/eCommerce projects. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/retail-ecommerce-software-development/" />
        <meta property="og:title" content="Retail & eCommerce Software Development | 1Solutions" />
        <meta property="og:description" content="Headless commerce, marketplace platforms, OMS, POS integration, loyalty, and AI personalisation. 150+ retail/eCommerce projects." />
        <meta property="og:url" content="https://www.1solutions.biz/retail-ecommerce-software-development/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .rce-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#fff0f6 0%,#fce7f3 20%,#fff5fb 50%,#fef3c7 75%,#f0fdf4 100%);color:${txt};line-height:1.6;position:relative;overflow-x:hidden}
          .rce-page *,.rce-page *::before,.rce-page *::after{box-sizing:border-box}
          .rce-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .rce-o1{width:800px;height:800px;background:radial-gradient(circle,rgba(190,24,93,.16) 0%,transparent 70%);top:-220px;right:-200px}
          .rce-o2{width:700px;height:700px;background:radial-gradient(circle,rgba(217,119,6,.13) 0%,transparent 70%);bottom:0;left:-200px}
          .rce-o3{width:480px;height:480px;background:radial-gradient(circle,rgba(5,150,105,.08) 0%,transparent 70%);top:42%;left:-90px}
          .rce-bc{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .rce-bc ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:${ac}}
          .rce-bc li{display:flex;align-items:center;gap:6px}.rce-bc li::after{content:'/';opacity:.45}.rce-bc li:last-child::after{display:none}
          .rce-bc a{color:${txt};text-decoration:none}
          .rce-hero{position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto;padding:44px 40px 28px}
          .rce-ey{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${ac};margin-bottom:14px}
          .rce-hero h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,${txt} 0%,${ac} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .rce-desc{font-size:16px;color:${txt2};line-height:1.65;max-width:720px;margin:0 auto 22px}
          .rce-tr{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin-bottom:24px}
          .rce-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:5px 13px;font-size:12px;font-weight:600;color:${txt};box-shadow:0 2px 8px rgba(190,24,93,.07)}
          .rce-dot{width:7px;height:7px;border-radius:50%;background:${ac};flex-shrink:0}
          .rce-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .rce-p{display:inline-block;padding:13px 34px;background:${ac};color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(190,24,93,.28)}
          .rce-p:hover{background:${txt};transform:translateY(-2px)}
          .rce-g{display:inline-block;padding:13px 34px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:${txt};font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .rce-g:hover{background:rgba(255,255,255,.85);border-color:rgba(190,24,93,.5);transform:translateY(-2px)}
          .rce-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:920px;margin:26px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(190,24,93,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .rce-sc{padding:18px 16px;text-align:center;border-right:1px solid rgba(190,24,93,.10)}.rce-sc:last-child{border-right:none}
          .rce-sv{font-size:28px;font-weight:900;color:${ac};letter-spacing:-.5px;line-height:1}
          .rce-sl{font-size:11px;color:${txt2};font-weight:500;margin-top:5px}
          .rce-sec{padding:72px 40px;position:relative;z-index:1}
          .rce-sec-alt{background:rgba(255,240,246,.55);border-top:1px solid rgba(190,24,93,.08);border-bottom:1px solid rgba(190,24,93,.08)}
          .rce-in{max-width:1300px;margin:0 auto}
          .rce-sey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .rce-sh{font-size:44px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .rce-sd{font-size:15px;color:${txt2};line-height:1.7;max-width:700px}
          .rce-rv{opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .rce-rv.rce-ok{opacity:1;transform:translateY(0)}
          .rce-sk-g{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
          .rce-card{background:linear-gradient(135deg,rgba(255,240,246,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(190,24,93,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1),border-color .2s}
          .rce-card.rce-cv{opacity:1;transform:translateY(0)}.rce-card.rce-cv:hover{transform:translateY(-5px);border-color:rgba(190,24,93,.25);box-shadow:0 14px 40px rgba(190,24,93,.12)}
          .rce-card.feat{border-color:rgba(190,24,93,.18)}
          .rce-cn{position:absolute;top:6px;right:12px;font-size:68px;font-weight:900;line-height:1;color:${ac};opacity:.05;pointer-events:none;user-select:none}
          .rce-card h3{font-size:15px;font-weight:700;color:${txt};margin:0 0 7px;position:relative;z-index:1}
          .rce-card p{font-size:13px;color:${txt2};line-height:1.65;margin:0;position:relative;z-index:1}
          .rce-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,${ac},#9d174d);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top;transition:transform .3s}
          .rce-card.rce-cv:hover::before{transform:scaleY(1)}
          .rce-sm{text-align:center;margin-top:20px}
          .rce-bm{display:inline-block;background:#fff;border:1.5px solid rgba(190,24,93,.18);color:${txt};padding:9px 28px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .rce-bm:hover{background:${ac};border-color:${ac};color:#fff;transform:translateY(-2px)}
          .rce-tec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
          .rce-tc2{background:linear-gradient(135deg,rgba(255,240,246,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:20px 18px;box-shadow:0 4px 24px rgba(190,24,93,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .rce-tc2.rce-sv2{opacity:1;transform:translateY(0)}.rce-tc2.rce-sv2:hover{border-color:rgba(190,24,93,.22);box-shadow:0 12px 36px rgba(190,24,93,.10)}
          .rce-tg{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:10px;padding-bottom:7px;border-bottom:2px solid}
          .rce-pills{display:flex;flex-wrap:wrap;gap:5px}
          .rce-pill{display:inline-block;font-size:11px;font-weight:500;padding:3px 9px;border-radius:100px;border:1px solid}
          .rce-en-g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
          .rce-en{background:linear-gradient(135deg,rgba(255,240,246,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(190,24,93,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1),border-color .2s}
          .rce-en.rce-ev{opacity:1;transform:translateY(0)}.rce-en.rce-ev:hover{border-color:rgba(190,24,93,.22);box-shadow:0 14px 44px rgba(190,24,93,.12)}
          .rce-en.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(255,240,246,.45) 100%);border-color:rgba(217,119,6,.26);transform:translateY(-6px)}
          .rce-en.feat.rce-ev{transform:translateY(-6px)}.rce-en.feat.rce-ev:hover{transform:translateY(-10px)}
          .rce-en-b{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:4px 11px;border-radius:100px;border:1px solid;margin-bottom:16px}
          .rce-en-i{width:44px;height:44px;background:rgba(190,24,93,.08);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
          .rce-en.feat .rce-en-i{background:rgba(217,119,6,.10)}
          .rce-en-n{font-size:20px;font-weight:900;color:${txt};margin:0 0 5px;letter-spacing:-.3px}
          .rce-en-h{font-size:13px;font-weight:600;color:${ac};margin-bottom:10px}
          .rce-en.feat .rce-en-h{color:#D97706}
          .rce-en-d{font-size:13px;color:${txt2};line-height:1.7;margin-bottom:14px}
          .rce-en-ll{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${ac};margin-bottom:7px}
          .rce-en-li{list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:6px}
          .rce-en-li li{display:flex;align-items:flex-start;gap:7px;font-size:13px;color:#374151;line-height:1.5}
          .rce-en-li li::before{content:'✓';font-weight:800;color:${ac};flex-shrink:0;margin-top:1px}
          .rce-en.feat .rce-en-li li::before{color:#D97706}
          .rce-en-tl{font-size:11px;font-weight:600;color:#D97706;display:block;padding-top:10px;border-top:1px solid rgba(190,24,93,.08)}
          .rce-en-a{display:block;margin-top:14px;padding:10px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(190,24,93,.09);color:${txt};border:1.5px solid rgba(190,24,93,.18)}
          .rce-en-a:hover{background:${txt};color:#fff}
          .rce-en.feat .rce-en-a{background:${ac};color:#fff;border-color:${ac}}
          .rce-en.feat .rce-en-a:hover{background:${txt};border-color:${txt}}
          .rce-tg2{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px}
          .rce-tc{background:linear-gradient(135deg,rgba(255,240,246,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:26px 22px;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 24px rgba(190,24,93,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
          .rce-tc.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(255,240,246,.42) 100%);border-color:rgba(217,119,6,.20)}
          .rce-tc.rce-tv{opacity:1;transform:translateY(0)}.rce-tc.rce-tv:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(190,24,93,.12)}
          .rce-stars{font-size:15px;color:#D97706;letter-spacing:2px}
          .rce-ttxt{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .rce-au{display:flex;align-items:center;gap:11px}
          .rce-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .rce-an{font-size:14px;font-weight:700;color:${txt}}
          .rce-ar{font-size:12px;color:#6b7280}
          .rce-wy-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:44px}
          .rce-wc{background:linear-gradient(135deg,rgba(255,240,246,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:22px 18px;box-shadow:0 4px 24px rgba(190,24,93,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px) scale(.97);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .rce-wc.rce-wv{opacity:1;transform:translateY(0) scale(1)}.rce-wc.rce-wv:hover{transform:translateY(-4px) scale(1);border-color:rgba(190,24,93,.22);box-shadow:0 12px 36px rgba(190,24,93,.10)}
          .rce-wd{width:9px;height:9px;border-radius:50%;background:${ac};margin-bottom:10px}
          .rce-wc h3{font-size:13px;font-weight:700;color:${txt};margin:0 0 7px;line-height:1.35}
          .rce-wc p{font-size:12px;color:${txt2};line-height:1.6;margin:0}
          .rce-ct{padding:64px 40px;background:linear-gradient(135deg,rgba(255,240,246,.55) 0%,rgba(255,255,255,.60) 40%,rgba(240,253,244,.50) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .rce-ct-g{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.1fr;gap:28px;align-items:start}
          .rce-cth{font-size:38px;font-weight:900;line-height:1.18;margin:0 0 12px;background:linear-gradient(90deg,${txt} 0%,${ac} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .rce-ctd{font-size:14px;color:${txt2};line-height:1.6;margin:0 0 18px}
          .rce-ben{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:12px}
          .rce-be{display:flex;gap:9px;align-items:flex-start}
          .rce-bi{flex-shrink:0;color:${ac};font-weight:800;font-size:15px;margin-top:1px}
          .rce-be p{font-size:13px;color:${txt2};margin:0;line-height:1.5}
          .rce-fb{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(255,240,246,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:18px;padding:30px;box-shadow:0 8px 40px rgba(190,24,93,.08),inset 0 1px 0 rgba(255,255,255,1)}
          .rce-fb h3{font-size:20px;font-weight:700;color:${txt};margin:0 0 20px}
          .rce-form{display:flex;flex-direction:column;gap:12px}
          .rce-fr{display:grid;grid-template-columns:1fr 1fr;gap:11px}
          .rce-fg{display:flex;flex-direction:column;gap:4px}
          .rce-fg.full{grid-column:1/-1}
          .rce-fg label{font-size:12px;font-weight:500;color:${txt}}
          .rce-fg input,.rce-fg textarea,.rce-fg select{padding:10px 12px;border:1px solid rgba(190,24,93,.14);border-radius:6px;font-size:13px;font-family:inherit;color:${txt};background:rgba(255,255,255,.55);transition:border-color .2s}
          .rce-fg input:focus,.rce-fg textarea:focus,.rce-fg select:focus{outline:none;border-color:${ac};box-shadow:0 0 0 3px rgba(190,24,93,.10)}
          .rce-co{display:flex;gap:8px;align-items:flex-start}
          .rce-co input{margin-top:3px;width:14px;height:14px}
          .rce-co label{font-size:11px;color:${txt2};line-height:1.5}.rce-co a{color:${txt}}
          .rce-sub{width:100%;padding:13px;background:${ac};border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(190,24,93,.25)}
          .rce-sub:hover{background:${txt};transform:translateY(-2px)}
          .rce-fq{padding:72px 40px;background:rgba(255,240,246,.55);border-top:1px solid rgba(190,24,93,.08);position:relative;z-index:1}
          .rce-fq h2{font-size:42px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,#9d174d 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .rce-fq-sub{font-size:15px;color:${txt2};margin:0 0 32px}
          .rce-fql{display:flex;flex-direction:column;gap:9px}
          .rce-fi{background:linear-gradient(135deg,rgba(255,240,246,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(190,24,93,.05);transition:border-color .2s}
          .rce-fi.open{border-color:rgba(190,24,93,.28)}.rce-fi.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,${ac},#9d174d);border-radius:3px 3px 0 0}
          .rce-fqb{width:100%;background:none;border:none;padding:18px 18px 18px 52px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:12px;font-family:inherit;position:relative}
          .rce-fqn{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:rgba(190,24,93,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:5px}
          .rce-fi.open .rce-fqn{background:${ac};color:#fff}
          .rce-fqb span{font-size:14px;font-weight:600;color:${txt};line-height:1.4}.rce-fi.open .rce-fqb span{color:${ac}}
          .rce-fch{width:20px;height:20px;flex-shrink:0;color:#9ca3af;transition:transform .3s}.rce-fi.open .rce-fch{transform:rotate(180deg);color:${ac}}
          .rce-faw{overflow:hidden;transition:max-height .35s ease;max-height:0}.rce-fi.open .rce-faw{max-height:400px}
          .rce-fa{padding:0 18px 18px 52px;font-size:14px;color:#4b5563;line-height:1.8}
          .rce-rel{padding:64px 40px;background:rgba(255,240,246,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .rce-ri{max-width:1300px;margin:0 auto;text-align:center}
          .rce-ri h2{font-size:30px;font-weight:900;background:linear-gradient(90deg,${txt} 0%,#9d174d 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 10px}
          .rce-ri hr{border:none;border-top:1px solid rgba(190,24,93,.10);margin:24px 0}
          .rce-rts{display:flex;flex-wrap:wrap;justify-content:center;gap:9px}
          .rce-rt{display:inline-block;padding:9px 18px;border:1.5px solid;border-radius:50px;font-size:13px;font-weight:500;text-decoration:none;transition:all .22s}
          .rce-rt:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.08)}
          .rce-ra{background:rgba(190,24,93,.09);border-color:rgba(190,24,93,.28);color:#9d174d}
          .rce-rb{background:rgba(12,74,110,.09);border-color:rgba(12,74,110,.28);color:#0c4a6e}
          .rce-rc{background:rgba(22,101,52,.09);border-color:rgba(22,101,52,.28);color:#14532d}
          .rce-rd{background:rgba(124,45,18,.09);border-color:rgba(124,45,18,.28);color:#7c2d12}
          @media(max-width:1024px){.rce-hero h1,.rce-sh,.rce-fq h2{font-size:34px}.rce-sk-g{grid-template-columns:repeat(2,1fr)}.rce-tec-g{grid-template-columns:repeat(2,1fr)}.rce-en-g{grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto}.rce-en.feat{transform:none}.rce-en.feat.rce-ev{transform:none}.rce-en.feat.rce-ev:hover{transform:translateY(-4px)}.rce-wy-g{grid-template-columns:repeat(2,1fr)}.rce-tg2{grid-template-columns:1fr}.rce-ct-g{grid-template-columns:1fr}}
          @media(max-width:768px){.rce-bc,.rce-hero,.rce-sec,.rce-ct,.rce-fq,.rce-rel{padding-left:20px;padding-right:20px}.rce-hero{padding-top:28px;padding-bottom:16px}.rce-hero h1{font-size:26px}.rce-stats{grid-template-columns:1fr 1fr}.rce-sc:nth-child(2){border-right:none}.rce-sc:nth-child(3),.rce-sc:nth-child(4){border-top:1px solid rgba(190,24,93,.10)}.rce-sc:nth-child(4){border-right:none}.rce-sk-g,.rce-tec-g,.rce-wy-g{grid-template-columns:1fr}.rce-fr{grid-template-columns:1fr}.rce-cth{font-size:26px}}
        `}</style>
      </Head>
      <div className="rce-page">
        <div className="rce-orb rce-o1" /><div className="rce-orb rce-o2" /><div className="rce-orb rce-o3" />
        <nav className="rce-bc" aria-label="Breadcrumb"><ol itemScope itemType="https://schema.org/BreadcrumbList"><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li><li><span>Industries</span></li><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">Retail & eCommerce</span><meta itemProp="position" content="3" /></li></ol></nav>
        <section className="rce-hero">
          <span className="rce-ey">Retail & eCommerce Industry</span>
          <h1>Retail & eCommerce Software Development — Headless Commerce, Marketplace & OMS</h1>
          <p className="rce-desc">Custom retail technology for brands, multi-vendor marketplaces, D2C businesses, and omnichannel retailers — headless commerce storefronts, OMS, POS integration, loyalty platforms, AI personalisation, and subscription commerce. 150+ retail/eCommerce projects. 15+ years.</p>
          <div className="rce-tr">{['Headless Commerce','Multi-Vendor Marketplace','Order Management (OMS)','Loyalty & Subscription','AI Personalisation'].map(b => (<div className="rce-badge" key={b}><span className="rce-dot" />{b}</div>))}</div>
          <div className="rce-ctas"><Link href="#contact" className="rce-p">Discuss Your eCommerce Platform</Link><Link href="#solutions" className="rce-g">View Solutions →</Link></div>
        </section>
        <div className="rce-stats" ref={stR}>{[['150+','Retail / eCommerce Projects'],['15+','Years Dev Experience'],['34%','Avg Conversion Rate Lift'],['99.9%','Platform Uptime SLA']].map(([v, l]) => <StatItem key={l} label={l} val={v} started={ss} />)}</div>
        <section id="solutions" className="rce-sec"><div className="rce-in"><div className={`rce-rv${vis.has('sk') ? ' rce-ok' : ''}`} ref={el => { secR.current['sk'] = el; }}><span className="rce-sey">Retail & eCommerce Solutions</span><h2 className="rce-sh">What We Build for Retail & eCommerce</h2><p className="rce-sd">Headless storefronts, multi-vendor marketplaces, OMS/IMS, POS integration, loyalty platforms, PIM, D2C and B2B portals, AI personalisation, and retail analytics.</p></div><div className="rce-sk-g" ref={skR}>{visS.map((s, i) => (<div key={s.n} className={`rce-card${s.feat ? ' feat' : ''}${vSk.includes(i) ? ' rce-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="rce-cn">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}</div>{SOLUTIONS.length > 6 && <div className="rce-sm"><button className="rce-bm" onClick={() => setShowAll(p => !p)}>{showAll ? 'Show fewer ↑' : `Show all ${SOLUTIONS.length} solutions ↓`}</button></div>}</div></section>
        <section className="rce-sec rce-sec-alt"><div className="rce-in"><div className={`rce-rv${vis.has('stk') ? ' rce-ok' : ''}`} ref={el => { secR.current['stk'] = el; }}><span className="rce-sey">Technology Stack</span><h2 className="rce-sh">Retail Technology We Work With</h2><p className="rce-sd">Next.js, Shopify, Magento 2, Elasticsearch, Stripe Connect, Klaviyo, Segment, AWS, and the modern commerce integration ecosystem.</p></div><div className="rce-tec-g" ref={stGr}>{TECH_STACK.map((g, i) => (<div key={g.group} className={`rce-tc2${vSt.includes(i) ? ' rce-sv2' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="rce-tg" style={{ color: g.color, borderBottomColor: g.color + '33' }}>{g.group}</div><div className="rce-pills">{g.items.map(it => <span key={it} className="rce-pill" style={{ color: g.color, background: g.color + '12', borderColor: g.color + '30' }}>{it}</span>)}</div></div>))}</div></div></section>
        <section className="rce-sec"><div className="rce-in"><div className={`rce-rv${vis.has('eng') ? ' rce-ok' : ''}`} ref={el => { secR.current['eng'] = el; }}><span className="rce-sey">Engagement Models</span><h2 className="rce-sh">How We Work with Retailers</h2><p className="rce-sd">Custom platform build, headless migration, or OMS/integration sprint — structured for your trading calendar and commercial model.</p></div><div className="rce-en-g" ref={enR}>{ENGAGEMENT.map((m, i) => (<div key={m.id} className={`rce-en${m.feat ? ' feat' : ''}${vEn.includes(i) ? ' rce-ev' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><span className="rce-en-b" style={{ color: m.bc, borderColor: m.bc + '44', background: m.bc + '14' }}>{m.badge}</span><div className="rce-en-i"><svg viewBox="0 0 24 24" width="24" height="24" fill={m.feat ? '#D97706' : ac}><path d={m.icon} /></svg></div><div className="rce-en-n">{m.name}</div><div className="rce-en-h">{m.headline}</div><div className="rce-en-d">{m.desc}</div><div className="rce-en-ll">Best for</div><ul className="rce-en-li">{m.best.map(b => <li key={b}>{b}</li>)}</ul><span className="rce-en-tl">{m.tl}</span><Link href="#contact" className="rce-en-a">Get a free estimate →</Link></div>))}</div></div></section>
        <section className="rce-sec rce-sec-alt"><div className="rce-in"><div className={`rce-rv${vis.has('ts') ? ' rce-ok' : ''}`} ref={el => { secR.current['ts'] = el; }}><span className="rce-sey">Client Outcomes</span><h2 className="rce-sh">Retail & eCommerce Clients</h2><p className="rce-sd">Fashion retailers, marketplace founders, and D2C brands on building eCommerce technology with 1Solutions.</p></div><div className="rce-tg2" ref={teR}>{TESTIMONIALS.map((t, i) => (<div key={i} className={`rce-tc${t.feat ? ' feat' : ''}${vTe.includes(i) ? ' rce-tv' : ''}`} style={{ transitionDelay: `${i * 90}ms` }} itemScope itemType="https://schema.org/Review"><div className="rce-stars">★★★★★</div><p className="rce-ttxt" itemProp="reviewBody">{t.text}</p><div className="rce-au"><div className="rce-av" style={{ background: t.bg }}>{t.init}</div><div><div className="rce-an" itemProp="author">{t.name}</div><div className="rce-ar">{t.role}</div></div></div></div>))}</div></div></section>
        <section className="rce-sec"><div className="rce-in"><div className={`rce-rv${vis.has('wy') ? ' rce-ok' : ''}`} ref={el => { secR.current['wy'] = el; }}><span className="rce-sey">Why 1Solutions</span><h2 className="rce-sh">Why Retailers Choose 1Solutions</h2><p className="rce-sd">Headless commerce specialists, conversion-rate focus, Stripe Connect marketplace expertise, omnichannel architecture, AI personalisation, and post-launch growth sprints.</p></div><div className="rce-wy-g" ref={whR}>{WHY.map((c, i) => (<div key={i} className={`rce-wc${vWh.includes(i) ? ' rce-wv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="rce-wd" /><h3>{c.t}</h3><p>{c.d}</p></div>))}</div></div></section>
        <section id="contact" className="rce-ct"><div className="rce-ct-g"><div><h2 className="rce-cth">Build Your eCommerce Platform</h2><p className="rce-ctd">Share your retail technology requirements — storefront, marketplace, OMS, or loyalty platform — and we will respond within 24 hours with a proposal, timeline, and team composition.</p><div className="rce-ben">{[['✓','Technical proposal within 24–48 hours'],['✓','Headless commerce and marketplace specialists'],['✓','NDA signed before any technical discussions'],['✓','150+ retail/eCommerce projects — storefronts, marketplaces, OMS'],['✓','Conversion-optimised, PCI-DSS compliant, SLA-backed delivery']].map(([ic, tx]) => (<div className="rce-be" key={tx}><span className="rce-bi">{ic}</span><p>{tx}</p></div>))}</div></div>
        <div className="rce-fb"><h3>Tell Us About Your Retail Platform</h3><form className="rce-form" onSubmit={e => e.preventDefault()}><div className="rce-fr"><div className="rce-fg"><label>Full Name *</label><input type="text" placeholder="Your name" required /></div><div className="rce-fg"><label>Work Email *</label><input type="email" placeholder="you@company.com" required /></div></div><div className="rce-fr"><div className="rce-fg"><label>Company</label><input type="text" placeholder="Your company" /></div><div className="rce-fg"><label>Phone / WhatsApp</label><input type="tel" placeholder="+1 555 000 0000" /></div></div><div className="rce-fg full"><label>Type of Retail Platform *</label><select required><option value="">Select...</option><option>Custom eCommerce Storefront</option><option>Headless Commerce Migration</option><option>Multi-Vendor Marketplace</option><option>Order Management System (OMS)</option><option>Loyalty / Subscription Platform</option><option>POS Integration / Omnichannel</option><option>Product Information Management (PIM)</option><option>D2C / B2B eCommerce Portal</option><option>AI Personalisation / Recommendation</option><option>Other</option></select></div><div className="rce-fg full"><label>Project Description *</label><textarea rows={4} placeholder="Describe your retail technology project — current platform (if any), key features needed, traffic scale, revenue target, and timeline..." required /></div><div className="rce-co"><input type="checkbox" required /><label>I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label></div><button type="submit" className="rce-sub">Get an eCommerce Proposal →</button></form></div></div></section>
        <section className="rce-fq"><div className="rce-in" style={{ maxWidth: 840 }}><span className="rce-sey">FAQ</span><h2>Retail & eCommerce Software — FAQ</h2><p className="rce-fq-sub">Headless commerce, marketplace platforms, OMS, loyalty, subscriptions, ERP integration, and more.</p><div className="rce-fql">{FAQS.map((f, i) => (<div key={i} className={`rce-fi${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="rce-fqb" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="rce-fqn">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{f.q}</span><svg className="rce-fch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="rce-faw"><div className="rce-fa" itemProp="text">{f.a}</div></div></div>))}</div></div></section>
        <section className="rce-rel"><div className="rce-ri"><span className="rce-sey">Related Services</span><h2>Related Industry & Technology Services</h2><hr /><div className="rce-rts">{[['/travel-and-tourism-software-solutions/','Travel & Tourism','rce-rb'],['/real-estate-software-development/','Real Estate Software','rce-rd'],['/manufacturing-software-development-services/','Manufacturing Software','rce-rc'],['/logistics-software-development-services/','Logistics Software','rce-rc'],['/fintech-software-development-company/','FinTech Software','rce-rb'],['/woocommerce-development-company/','WooCommerce','rce-ra'],['/magento-development-company/','Magento','rce-ra'],['/mobile-app-development/','Mobile Apps','rce-rd']].map(([hr, lb, cl]) => (<Link key={hr} href={hr} className={`rce-rt ${cl}`}>{lb}</Link>))}</div></div></section>
      </div>
    </>
  );
}
