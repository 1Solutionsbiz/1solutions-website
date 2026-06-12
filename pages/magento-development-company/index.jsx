'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Custom Magento Store Development', desc:'Fully bespoke Magento 2 stores built from the ground up — designed around your catalogue, brand, and business model for maximum conversion.', featured:false },
  { n:'02', title:'Magento 2 Theme Development', desc:'Pixel-perfect, responsive Magento 2 themes built for performance, brand alignment, and a frictionless shopping experience across all devices.', featured:true },
  { n:'03', title:'Magento Extension Development', desc:'Custom Magento extensions and modules built precisely for your requirements — functionality that off-the-shelf marketplace extensions simply can\'t deliver.', featured:false },
  { n:'04', title:'Adobe Commerce Development', desc:'Enterprise-grade Adobe Commerce (Magento Commerce) solutions including B2B modules, advanced segmentation, and cloud-hosted infrastructure setup.', featured:false },
  { n:'05', title:'Magento Migration & Upgrades', desc:'Seamless migration from Magento 1 to Magento 2, or from WooCommerce, Shopify, or BigCommerce to Magento — with zero data loss and full SEO preservation.', featured:false },
  { n:'06', title:'Magento SEO Optimization', desc:'Technical SEO, structured data, layered navigation optimisation, and Core Web Vitals improvements to rank your Magento store higher and drive organic revenue.', featured:false },
  { n:'07', title:'Magento Performance Optimization', desc:'Deep performance audits, full-page cache tuning, Varnish configuration, image optimisation, and CDN setup to achieve 90+ PageSpeed scores.', featured:false },
  { n:'08', title:'Payment & Shipping Integration', desc:'Integrate Stripe, PayPal, Braintree, Afterpay, Klarna, and 50+ payment gateways alongside UPS, FedEx, DHL, and custom shipping logic.', featured:false },
  { n:'09', title:'Magento PWA Development', desc:'Build lightning-fast Progressive Web App storefronts using Magento PWA Studio or Vue Storefront — app-like UX with Magento\'s powerful backend.', featured:false },
  { n:'10', title:'ERP, CRM & API Integration', desc:'Connect Magento with SAP, Oracle NetSuite, Salesforce, Microsoft Dynamics, and third-party platforms via REST and GraphQL APIs.', featured:false },
  { n:'11', title:'Magento Maintenance & Support', desc:'Proactive security patches, version upgrades, performance monitoring, bug fixes, and dedicated support to keep your Magento store running at peak performance.', featured:false },
  { n:'12', title:'Magento B2B Store Development', desc:'Build sophisticated B2B portals with company accounts, shared catalogues, quote management, purchase orders, and role-based pricing on Magento.', featured:false },
];

const FAQS = [
  { q:'How much does Magento development cost?', a:'A custom Magento 2 store typically starts from $5,000 for a standard build and ranges up to $50,000+ for complex Adobe Commerce implementations with custom extensions, B2B functionality, ERP integrations, and multi-store setups. Magento\'s higher entry cost reflects its enterprise-grade capabilities. We provide a detailed fixed-price quote after a free discovery call — no hidden costs, no surprises.' },
  { q:'What is the difference between Magento Open Source and Adobe Commerce?', a:'Magento Open Source (formerly Magento Community) is free to download and self-host, suitable for mid-market stores. Adobe Commerce (formerly Magento Commerce) is the paid enterprise edition with advanced B2B features, customer segmentation, content staging, reward points, and access to Adobe Commerce Cloud hosting. We work with both editions and will recommend the right one based on your scale, budget, and feature requirements.' },
  { q:'Can you migrate my WooCommerce or Shopify store to Magento?', a:'Absolutely. We handle migrations from WooCommerce, Shopify, BigCommerce, PrestaShop, Magento 1, and custom platforms to Magento 2. Our migration process preserves all products, customer records, order history, URLs, and SEO rankings using proven data migration tools and custom scripts. We test thoroughly on staging before going live to ensure zero data loss.' },
  { q:'How long does a Magento development project take?', a:'A standard Magento 2 store with a custom theme typically takes 6–10 weeks from kick-off to launch. Complex Adobe Commerce builds with custom extensions, ERP integrations, or B2B functionality can take 12–24 weeks. We share a detailed project timeline in the proposal stage and provide weekly progress updates throughout.' },
  { q:'Do you build custom Magento extensions?', a:'Yes. We build custom Magento 2 modules for virtually any requirement — custom product types, complex pricing rules, unique checkout flows, loyalty systems, ERP data sync, third-party API integrations, and more. All extensions follow Magento coding standards, are thoroughly tested, and come with full documentation.' },
  { q:'Is Magento suitable for large product catalogues and high traffic?', a:'Yes — Magento is purpose-built for scale. We\'ve built Magento stores with 500,000+ SKUs and configured infrastructure to handle peak traffic with Varnish full-page cache, Redis object cache, Elasticsearch for catalogues, CDN integration, and horizontal scaling via load balancers. For enterprise scale, Adobe Commerce Cloud handles auto-scaling natively.' },
  { q:'Will my Magento store be optimised for search engines?', a:'Yes — SEO is built into our development process from day one. Every Magento store we deliver includes proper heading structure, Product and BreadcrumbList schema, Open Graph tags, XML sitemaps, robots.txt, canonical tags, hreflang for multilingual stores, and Core Web Vitals optimisation. We also address Magento-specific SEO challenges like duplicate content from layered navigation and pagination.' },
  { q:'Do you offer Magento support and maintenance after launch?', a:'Yes. Our Magento maintenance plans include security patches and version upgrades, performance monitoring, uptime checks, bug fixes, and a set number of development hours per month. Plans start from $199/month. We also offer dedicated development retainers for stores that need ongoing feature development, CRO work, or infrastructure management.' },
  { q:'Do you work with clients in the US, Canada, and Australia remotely?', a:'Yes — 100% of our client work is delivered remotely. We have been working with US, Canadian, and Australian businesses since 2008. We schedule meetings in your time zone, collaborate via Slack, Notion, and Loom, and provide full project transparency throughout. Our experience with western market expectations means no communication gaps and no cultural mismatches.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V17H7v2h10v-2h-4v-1.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>, title:'15+ Years of Proven Experience', desc:'Since 2008, we\'ve delivered complex e-commerce projects for enterprise clients globally. Our depth means fewer surprises, better architectural decisions, and on-time delivery.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'US, Canada & Australia Focused', desc:'We understand the market standards, compliance needs, and customer expectations of English-speaking western markets — delivering enterprise-level work at competitive rates.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'On-Time, On-Budget Delivery', desc:'Our structured 4D process (Discover → Define → Develop → Deploy) ensures Magento projects are scoped accurately and delivered without overruns or scope creep.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'Enterprise-Grade Architecture', desc:'We design Magento infrastructure for scale — multi-store setups, microservices, headless frontends, ERP integrations, and high-availability cloud configurations.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Custom Extension Expertise', desc:'We build bespoke Magento 2 modules and extensions for any business requirement — from complex pricing engines to ERP sync and custom checkout flows.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Dedicated Point of Contact', desc:'No ticket queues. A dedicated project manager who understands your Magento project, speaks your language, and keeps you updated at every stage.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'SEO Built Into Every Build', desc:'Schema markup, Core Web Vitals, Magento-specific SEO fixes (layered nav, pagination), and structured data are baked into every store we deliver.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership', desc:'97% client retention rate. We stay invested in your success through maintenance plans, support retainers, and ongoing growth partnerships.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numTarget = parseInt(target.replace(/\D/g, ''), 10);
    if (!numTarget) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function AnimatedStat({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  const hasComma = val.includes(',');
  const display = started ? (hasComma ? num.toLocaleString() : num) + suffix : val;
  return (
    <div className="mag-stat-col">
      <div className="mag-stat-label">{label}</div>
      <div className="mag-stat-value">{display}</div>
    </div>
  );
}

export default function MagentoDevelopmentCompany() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const [visibleECards, setVisibleECards] = useState([]);
  const stepRefs = useRef([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);
  const eCardsRef = useRef(null);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleSteps(prev => prev.includes(i) ? prev : [...prev, i]), i * 150);
            obs.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!whyGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          WHY.forEach((_, i) => setTimeout(() => setVisibleWhyCards(prev => prev.includes(i) ? prev : [...prev, i]), i * 100));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(whyGridRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!testiGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0,1,2].forEach(i => setTimeout(() => setVisibleTestiCards(p => p.includes(i)?p:[...p,i]), i * 150));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(testiGridRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!eCardsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0,1,2,3].forEach(i => setTimeout(() => setVisibleECards(p => p.includes(i)?p:[...p,i]), i * 130));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(eCardsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, key]));
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const visibleServices = showAll ? SERVICES : SERVICES.slice(0, 8);

  return (
    <>
      <Head>
        <title>Magento Development Company | Expert Magento Development Services | 1Solutions</title>
        <meta name="description" content="1Solutions is a leading Magento development company with 15+ years experience. We build custom Magento 2 stores, Adobe Commerce solutions, and Magento extensions for US, Canada & Australia." />
        <meta name="keywords" content="magento development company, magento development services, magento 2 development, adobe commerce development, magento agency, magento extension development" />
        <link rel="canonical" href="https://www.1solutions.biz/magento-development-company/" />
        <meta property="og:title" content="Magento Development Company | 1Solutions" />
        <meta property="og:description" content="Build enterprise-grade Magento 2 and Adobe Commerce stores with 1Solutions' expert Magento development services for US, Canada & Australia." />
        <meta property="og:url" content="https://www.1solutions.biz/magento-development-company/" />
        <style>{`
          .mag-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 25%, #fef3c7 50%, #fff7ed 75%, #fed7aa 100%);
            background-attachment: scroll;
            color: #1c0a00;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .mag-page *, .mag-page *::before, .mag-page *::after { box-sizing: border-box; }

          /* Orbs */
          .mag-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(234,88,12,0.25) 0%,rgba(194,65,12,0.10) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .mag-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.20) 0%,rgba(180,83,9,0.08) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .mag-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* Hero */
          .mag-hero-block { background:transparent;position:relative;overflow:hidden; }
          .mag-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(234,88,12,0.10) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .mag-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.12) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .mag-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .mag-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#7c2d12;margin-bottom:18px; }
          .mag-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#9a3412 0%,#b45309 60%,#c2410c 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .mag-hero-content p { font-size:16px;color:#57340a;line-height:1.65;max-width:620px;margin:0 auto 28px; }
          .mag-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.60);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.90);border-radius:50px;color:#9a3412;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(194,65,12,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .mag-btn-hero:hover { background:rgba(255,255,255,0.90);border-color:rgba(194,65,12,0.50);box-shadow:0 12px 36px rgba(194,65,12,0.18),0 0 0 2px rgba(194,65,12,0.18),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#9a3412; }

          /* Stats */
          .mag-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.50);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.90);box-shadow:0 4px 24px rgba(194,65,12,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .mag-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(194,65,12,0.10); }
          .mag-stat-col:last-child { border-right:none; }
          .mag-stat-label { font-size:12px;color:#7c4a1e;font-weight:500;margin-bottom:6px; }
          .mag-stat-value { font-size:26px;font-weight:900;color:#c2410c;letter-spacing:-0.5px;line-height:1; }

          /* Clients */
          .mag-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .mag-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#92400e; }
          .mag-clients-logos { width:100%;overflow:hidden; }
          .mag-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .mag-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Sections shared */
          .mag-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c2410c;margin-bottom:12px;display:block; }
          .mag-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#9a3412 0%,#c2410c 60%,#b45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .mag-section-desc { font-size:15px;color:#57340a;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .mag-section-sub { font-size:16px;color:#57340a;margin:0; }

          /* Services */
          .mag-services-section { background:#fff7ed;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(194,65,12,0.10),0 -4px 16px rgba(194,65,12,0.06); }
          .mag-services-inner { max-width:1280px;margin:0 auto; }
          .mag-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .mag-service-card { background:linear-gradient(135deg,rgba(255,237,213,0.60) 0%,rgba(255,255,255,0.85) 60%,rgba(254,243,199,0.45) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.90);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(194,65,12,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .mag-service-card:hover { transform:translateY(-6px);border-color:rgba(194,65,12,0.40);box-shadow:0 16px 48px rgba(194,65,12,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .mag-service-card.featured { background:linear-gradient(135deg,rgba(254,243,199,0.60) 0%,rgba(255,255,255,0.90) 55%,rgba(255,237,213,0.50) 100%);border-color:rgba(194,65,12,0.20);box-shadow:0 6px 32px rgba(194,65,12,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .mag-service-card:hover .mag-card-num { color:#c2410c;opacity:0.12; }
          .mag-service-card:hover h3 { color:#c2410c; }
          .mag-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#9a3412;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .mag-service-card h3 { font-size:15px;font-weight:700;color:#1c0a00;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .mag-service-card p { font-size:13px;color:#57340a;line-height:1.6;position:relative;z-index:1; }
          .mag-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#c2410c,#ea580c);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .mag-service-card:hover::before { transform:scaleY(1); }
          .mag-services-footer { text-align:center;margin-top:20px; }
          .mag-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(194,65,12,0.25);color:#9a3412;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(194,65,12,0.08);font-family:inherit; }
          .mag-btn-show-more:hover { background:#9a3412;border-color:#9a3412;color:#ffffff;box-shadow:0 8px 28px rgba(194,65,12,0.22);transform:translateY(-2px); }

          /* Portfolio */
          .mag-portfolio-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .mag-portfolio-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.50);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.90);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(194,65,12,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .mag-portfolio-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;gap:24px; }
          .mag-portfolio-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#9a3412 0%,#c2410c 60%,#b45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0; }
          .mag-btn-portfolio-cta { display:inline-block;padding:13px 26px;background:rgba(255,255,255,0.60);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.90);border-radius:50px;color:#9a3412;font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap;transition:all 0.3s;box-shadow:0 4px 20px rgba(194,65,12,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .mag-btn-portfolio-cta:hover { background:rgba(255,255,255,0.90);border-color:rgba(194,65,12,0.45);transform:translateY(-2px);color:#9a3412; }
          .mag-portfolio-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .mag-pcard { display:flex;flex-direction:column;background:rgba(255,255,255,0.70);backdrop-filter:blur(10px);border:1px solid rgba(194,65,12,0.12);border-radius:12px;overflow:hidden;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .mag-pcard:hover { transform:translateY(-4px);border-color:rgba(194,65,12,0.45);box-shadow:0 12px 40px rgba(194,65,12,0.14); }
          .mag-pcard-thumb { width:100%;aspect-ratio:16/10;overflow:hidden;background:#fde8d0; }
          .mag-pcard-thumb img { width:100%;height:100%;object-fit:cover;display:block; }
          .mag-pcard-body { padding:18px 20px 20px;flex:1; }
          .mag-pcard-name { font-size:18px;font-weight:800;color:#9a3412;margin:0 0 5px; }
          .mag-pcard-tech { font-size:13px;color:#57340a;margin-bottom:5px;line-height:1.4; }
          .mag-pcard-cats { font-size:13px;font-weight:700;color:#c2410c; }

          /* Process */
          .mag-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .mag-process-top { max-width:1280px;margin:0 auto 56px; }
          .mag-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#c2410c;margin:0 0 14px; }
          .mag-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#9a3412 0%,#c2410c 60%,#b45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .mag-process-main-desc { font-size:15px;color:#57340a;line-height:1.7;margin:0; }
          .mag-process-divider { border:none;border-top:1px solid rgba(194,65,12,0.15);margin:36px 0 0;width:100%; }
          .mag-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .mag-process-steps { display:flex;flex-direction:column; }
          .mag-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .mag-pstep.visible { opacity:1;transform:translateY(0); }
          .mag-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .mag-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.70);backdrop-filter:blur(8px);border:2px solid rgba(194,65,12,0.20);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#9a3412;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .mag-pstep:hover .mag-pstep-circle { background:rgba(194,65,12,0.15);border-color:#c2410c;color:#c2410c; }
          .mag-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .mag-pstep-arrow::before { content:'';width:2px;flex:1;background:#c2410c;opacity:0.25; }
          .mag-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #c2410c;opacity:0.45;margin-top:-1px; }
          .mag-pstep:last-child .mag-pstep-arrow { display:none; }
          .mag-pstep-content { padding:4px 0 44px; }
          .mag-pstep:last-child .mag-pstep-content { padding-bottom:0; }
          .mag-pstep-title { font-size:22px;font-weight:700;color:#9a3412;margin:0 0 10px;line-height:1.2; }
          .mag-pstep-desc { font-size:15px;color:#57340a;line-height:1.75;margin:0; }
          .mag-process-image-col { position:sticky;top:100px;min-width:0; }
          .mag-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(194,65,12,0.15);aspect-ratio:4/5;background:#fde8d0; }
          .mag-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Testimonials */
          .mag-testi-section { background:#fff7ed;border-top:1px solid rgba(194,65,12,0.08);border-bottom:1px solid rgba(194,65,12,0.08);padding:80px 40px;position:relative;z-index:1; }
          .mag-testi-inner { max-width:1280px;margin:0 auto; }
          .mag-section-header-center { text-align:center;margin-bottom:52px; }
          .mag-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .mag-tcard { background:linear-gradient(135deg,rgba(255,237,213,0.60) 0%,rgba(255,255,255,0.85) 60%,rgba(254,243,199,0.45) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.90);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(194,65,12,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .mag-tcard.mag-tcard-visible { opacity:1;transform:translateY(0); }
          .mag-tcard:hover { transform:translateY(-6px)!important;border-color:rgba(194,65,12,0.35);box-shadow:0 16px 48px rgba(194,65,12,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .mag-tcard.featured { background:linear-gradient(135deg,rgba(254,243,199,0.60) 0%,rgba(255,255,255,0.90) 55%,rgba(255,237,213,0.50) 100%);border-color:rgba(194,65,12,0.18);box-shadow:0 6px 32px rgba(194,65,12,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .mag-tcard-stars { font-size:18px;color:#c2410c;letter-spacing:2px; }
          .mag-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .mag-tcard.featured .mag-tcard-text { color:#1f2937; }
          .mag-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .mag-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .mag-tcard-name { font-size:14px;font-weight:700;color:#9a3412; }
          .mag-tcard-role { font-size:12px;color:#6b7280; }
          .mag-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(255,237,213,0.55) 0%,rgba(255,255,255,0.80) 50%,rgba(254,243,199,0.45) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.90);box-shadow:0 4px 20px rgba(194,65,12,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .mag-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .mag-tstat-num { font-size:28px;font-weight:800;color:#9a3412; }
          .mag-tstat-label { font-size:13px;color:#57340a;font-weight:500; }
          .mag-tstat-divider { width:1px;height:40px;background:rgba(194,65,12,0.15); }

          /* Why */
          .mag-why-section { padding:80px 40px;background:#fff7ed;border-top:1px solid rgba(194,65,12,0.08);border-bottom:1px solid rgba(194,65,12,0.08);position:relative;z-index:1; }
          .mag-why-inner { max-width:1280px;margin:0 auto; }
          .mag-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .mag-why-card { background:linear-gradient(135deg,rgba(255,237,213,0.60) 0%,rgba(255,255,255,0.85) 60%,rgba(254,243,199,0.45) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.90);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(194,65,12,0.07),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s; }
          .mag-why-card.mag-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .mag-why-card:hover { transform:translateY(-6px) scale(1)!important;border-color:rgba(194,65,12,0.35);box-shadow:0 16px 48px rgba(194,65,12,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .mag-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .mag-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .mag-why-icon svg { width:28px;height:28px;fill:#c2410c; }
          .mag-why-card h3 { font-size:15px;font-weight:700;color:#1c0a00;margin:0;line-height:1.35; }
          .mag-why-card p { font-size:13px;color:#57340a;line-height:1.7;margin:0; }

          /* Engagement */
          .mag-engage-section { background:#fff7ed;border-top:1px solid rgba(194,65,12,0.08);border-bottom:1px solid rgba(194,65,12,0.08);padding:80px 40px;position:relative;z-index:1; }
          .mag-engage-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch; }
          .mag-engage-left { position:sticky;top:100px;display:flex;flex-direction:column; }
          .mag-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#9a3412 0%,#c2410c 60%,#b45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .mag-engage-desc { font-size:15px;color:#57340a;line-height:1.75;margin:0 0 32px; }
          .mag-engage-img-wrap { border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(194,65,12,0.14);flex:1;min-height:300px; }
          .mag-engage-img-wrap img { width:100%;height:100%;min-height:300px;object-fit:cover;display:block; }
          .mag-engage-right { display:flex;flex-direction:column;gap:16px; }
          .mag-ecard { background:linear-gradient(135deg,rgba(255,237,213,0.60) 0%,rgba(255,255,255,0.85) 60%,rgba(254,243,199,0.45) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(194,65,12,0.07),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.3s,box-shadow 0.3s; }
          .mag-ecard.mag-ecard-visible { opacity:1;transform:translateX(0); }
          .mag-ecard:hover { border-color:rgba(194,65,12,0.38);box-shadow:0 16px 48px rgba(194,65,12,0.14),inset 0 1px 0 rgba(255,255,255,1);transform:translateX(4px); }
          .mag-ecard-header { display:flex;align-items:center;gap:14px;margin-bottom:10px; }
          .mag-ecard-icon { width:44px;height:44px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .mag-ecard-icon svg { width:26px;height:26px;stroke:#c2410c;fill:none; }
          .mag-ecard-title { font-size:18px;font-weight:700;color:#9a3412;margin:0; }
          .mag-ecard-desc { font-size:14px;color:#57340a;line-height:1.65;margin:0 0 16px; }
          .mag-ecard-features { display:grid;grid-template-columns:1fr 1fr;gap:8px 16px; }
          .mag-efeat { display:flex;align-items:center;gap:8px;font-size:13px;color:#7c2d12;font-weight:500; }
          .mag-efeat-check { color:#c2410c;font-size:12px;flex-shrink:0; }

          /* Contact */
          .mag-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(255,237,213,0.75) 0%,rgba(255,255,255,0.65) 40%,rgba(254,243,199,0.70) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.85); }
          .mag-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .mag-contact-left { padding:0;align-self:start; }
          .mag-contact-right { align-self:start; }
          .mag-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#9a3412 0%,#c2410c 60%,#b45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .mag-contact-desc { font-size:14px;color:#57340a;line-height:1.6;margin:0 0 24px; }
          .mag-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.75) 0%,rgba(255,237,213,0.40) 100%);border:1px solid rgba(255,255,255,0.92);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .mag-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .mag-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .mag-benefit-icon { width:20px;height:20px;color:#c2410c;stroke:#c2410c;stroke-width:1.75; }
          .mag-benefit-item p { font-size:13px;color:#57340a;margin:0;line-height:1.5; }
          .mag-stats-box { padding-top:32px;border-top:1px solid rgba(194,65,12,0.12); }
          .mag-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .mag-stat-number { font-size:40px;font-weight:900;color:#9a3412;line-height:1;display:inline-block;margin-bottom:4px; }
          .mag-stat-text { font-size:13px;color:#57340a;line-height:1.4;font-weight:500; }
          .mag-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.92) 0%,rgba(255,237,213,0.20) 50%,rgba(255,255,255,0.88) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.95);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(194,65,12,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .mag-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#1c0a00;letter-spacing:-0.5px; }
          .mag-contact-form { display:flex;flex-direction:column;gap:16px; }
          .mag-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .mag-form-group { display:flex;flex-direction:column;gap:6px; }
          .mag-form-group.full { grid-column:1/-1; }
          .mag-form-group label { font-size:12px;font-weight:500;color:#1c0a00; }
          .mag-form-group input,.mag-form-group textarea,.mag-form-group select { padding:10px 14px;border:1px solid rgba(194,65,12,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#1c0a00;background:rgba(255,255,255,0.60);box-shadow:inset 0 1px 4px rgba(194,65,12,0.05);transition:border-color 0.2s,background 0.2s; }
          .mag-form-group input:focus,.mag-form-group textarea:focus { outline:none;border-color:#c2410c;background:rgba(255,255,255,0.95);box-shadow:0 0 0 3px rgba(194,65,12,0.10); }
          .mag-phone-input { display:flex;border:1px solid rgba(194,65,12,0.15);border-radius:6px;overflow:hidden; }
          .mag-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.15);font-size:12px;min-width:75px; }
          .mag-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .mag-phone-input input:focus { outline:none; }
          .mag-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .mag-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .mag-consent label { font-size:11px;color:#57340a;line-height:1.5;margin:0; }
          .mag-consent a { color:#9a3412;text-decoration:none; }
          .mag-submit-btn { padding:14px 28px;background:rgba(154,52,18,0.88);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.35);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(194,65,12,0.28),inset 0 1px 0 rgba(255,255,255,0.18); }
          .mag-submit-btn:hover { background:rgba(154,52,18,0.96);border-color:rgba(194,65,12,0.55);transform:translateY(-2px); }

          /* FAQ */
          .mag-faq-section { padding:80px 40px;background:#fff7ed;border-top:1px solid rgba(194,65,12,0.08);position:relative;z-index:1; }
          .mag-faq-inner { max-width:1280px;margin:0 auto; }
          .mag-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#9a3412 0%,#c2410c 60%,#b45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .mag-faq-list { display:flex;flex-direction:column;gap:12px; }
          .mag-faq-item { background:linear-gradient(135deg,rgba(255,237,213,0.60) 0%,rgba(255,255,255,0.85) 60%,rgba(254,243,199,0.45) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.90);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(194,65,12,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .mag-faq-item.open { border-color:rgba(194,65,12,0.35);box-shadow:0 8px 32px rgba(194,65,12,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .mag-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#c2410c;border-radius:3px 0 0 3px; }
          .mag-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .mag-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(194,65,12,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .mag-faq-item.open .mag-faq-q-badge { background:#c2410c;color:#fff; }
          .mag-faq-question span { font-size:16px;font-weight:600;color:#1c0a00;line-height:1.45; }
          .mag-faq-item.open .mag-faq-question span { color:#c2410c; }
          .mag-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .mag-faq-item.open .mag-faq-chevron { transform:rotate(180deg);color:#c2410c; }
          .mag-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .mag-faq-item.open .mag-faq-answer-wrap { max-height:500px; }
          .mag-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#57340a;line-height:1.8; }
          .mag-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#9a3412;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Related */
          .mag-related-section { background:rgba(255,237,213,0.25);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.65);padding:80px 40px; }
          .mag-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .mag-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#7c4a1e;margin:0 0 14px;display:block; }
          .mag-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#9a3412 0%,#c2410c 60%,#b45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .mag-related-sub { font-size:15px;color:#1c0a00;line-height:1.7;margin:0 auto;max-width:680px; }
          .mag-related-divider { border:none;border-top:1px solid rgba(194,65,12,0.12);margin:40px 0; }
          .mag-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .mag-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .mag-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .mag-rtag-orange  { background:rgba(234,88,12,0.10);border-color:rgba(234,88,12,0.30);color:#c2410c; }
          .mag-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#b45309; }
          .mag-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .mag-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .mag-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .mag-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .mag-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .mag-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .mag-rtag-cyan    { background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490; }
          .mag-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }
          .mag-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }
          .mag-rtag-slate   { background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155; }

          /* Shimmer */
          .mag-btn-hero-shimmer { position:relative;overflow:hidden; }
          .mag-btn-hero-shimmer::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.78) 45%,rgba(255,255,255,0.92) 50%,rgba(255,255,255,0.78) 55%,transparent 100%);animation:mag-shimmer-sweep 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes mag-shimmer-sweep { 0%{left:-120%} 35%,100%{left:160%} }

          /* Section reveal */
          .mag-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .mag-section-reveal.mag-revealed { opacity:1;transform:translateY(0); }

          /* Logo marquee */
          .mag-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:mag-marquee 28s linear infinite; }
          .mag-logos-track:hover { animation-play-state:paused; }
          @keyframes mag-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

          /* Responsive */
          @media (max-width:1024px) {
            .mag-hero-content h1 { font-size:40px; }
            .mag-services-grid { grid-template-columns:repeat(2,1fr); }
            .mag-why-grid { grid-template-columns:repeat(2,1fr); }
            .mag-portfolio-grid { grid-template-columns:repeat(2,1fr); }
            .mag-portfolio-wrap { padding:32px 28px 40px; }
            .mag-engage-inner { grid-template-columns:1fr; }
            .mag-engage-left { position:static; }
            .mag-process-inner { grid-template-columns:1fr; }
            .mag-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .mag-page { overflow-x:hidden; }
            .mag-hero-content { padding:36px 20px 24px; }
            .mag-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .mag-hero-content p { font-size:15px; }
            .mag-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .mag-stat-col { padding:14px 12px; }
            .mag-stat-col:nth-child(2) { border-right:none; }
            .mag-stat-col:nth-child(3) { border-top:1px solid rgba(194,65,12,0.10); }
            .mag-stat-col:nth-child(4) { border-top:1px solid rgba(194,65,12,0.10);border-right:none; }
            .mag-stat-value { font-size:22px; }
            .mag-clients-bar { padding:16px 20px 36px;gap:12px; }
            .mag-client-logo { height:20px; }
            .mag-services-section { padding:48px 20px 40px; }
            .mag-portfolio-section { padding:48px 16px; }
            .mag-portfolio-wrap { padding:24px 20px 32px;border-radius:16px; }
            .mag-portfolio-header { flex-direction:column;align-items:flex-start;gap:14px; }
            .mag-portfolio-title { font-size:26px; }
            .mag-process-section { padding:60px 20px; }
            .mag-process-top { margin-bottom:36px; }
            .mag-testi-section { padding:60px 20px; }
            .mag-testi-section .mag-section-header-center { text-align:left; }
            .mag-why-section { padding:60px 20px; }
            .mag-why-section .mag-section-header-center { text-align:left; }
            .mag-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .mag-why-card { padding:24px 20px; }
            .mag-engage-section { padding:60px 20px; }
            .mag-contact-section { padding:48px 16px; }
            .mag-contact-container { grid-template-columns:1fr;gap:20px; }
            .mag-contact-title { font-size:28px; }
            .mag-faq-section { padding:60px 20px; }
            .mag-faq-heading { font-size:26px; }
            .mag-faq-question { padding:18px 18px 18px 52px; }
            .mag-faq-question span { font-size:14px; }
            .mag-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .mag-faq-q-badge { left:14px; }
            .mag-related-section { padding:60px 20px; }
            .mag-related-tags { gap:8px; }
            .mag-rtag { padding:9px 16px;font-size:13px; }
            .mag-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .mag-testi-grid { grid-template-columns:1fr; }
            .mag-portfolio-grid { grid-template-columns:1fr; }
            .mag-section-title,.mag-engage-title,.mag-process-main-title,.mag-related-title { font-size:30px; }
            .mag-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .mag-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(194,65,12,0.10); }
            .mag-tstat:nth-child(odd) { border-right:1px solid rgba(194,65,12,0.10); }
            .mag-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .mag-tstat-divider { display:none; }
            .mag-form-row { grid-template-columns:1fr; }
            .mag-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .mag-stat-number { font-size:28px; }
          }
          @media (max-width:480px) {
            .mag-hero-content h1 { font-size:24px; }
            .mag-section-title,.mag-engage-title,.mag-process-main-title,.mag-related-title { font-size:26px; }
            .mag-services-grid { grid-template-columns:1fr; }
            .mag-service-card { padding:20px 18px 18px; }
            .mag-card-num { font-size:52px; }
            .mag-process-main-title { font-size:24px; }
            .mag-pstep-title { font-size:18px; }
            .mag-portfolio-title { font-size:22px; }
            .mag-contact-title { font-size:24px; }
            .mag-engage-title { font-size:26px; }
            .mag-tcard { padding:24px 20px; }
            .mag-ecard { padding:20px; }
            .mag-ecard-features { grid-template-columns:1fr; }
            .mag-merged-box { padding:18px; }
          }
        `}</style>
      </Head>

      <div className="mag-page">
        <div className="mag-orb-1" />
        <div className="mag-orb-2" />
        <div className="mag-orb-3" />

        {/* ── HERO ── */}
        <div className="mag-hero-block">
          <div className="mag-hero-content">
            <span className="mag-eyebrow">Expert Magento Development Company</span>
            <h1>Magento Development Services — Enterprise E-Commerce Built to Scale</h1>
            <p>Build powerful, scalable Magento 2 and Adobe Commerce stores with 1Solutions' expert development team. From custom extensions and B2B portals to platform migrations and PWA storefronts — we deliver enterprise e-commerce that drives serious revenue for US, Canadian, and Australian businesses.</p>
            <Link href="#contact" className="mag-btn-hero mag-btn-hero-shimmer">Get a Free Magento Consultation</Link>
          </div>

          <div className="mag-hero-stats" ref={statsRef}>
            {[['Magento Stores Built','150+'],['E-Commerce Experts','50+'],['Projects Delivered','1,200+'],['Years in Business','15+']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="mag-clients-bar">
            <span className="mag-clients-label">Trusted by Leading Brands</span>
            <div className="mag-clients-logos">
              <div className="mag-logos-track">
                {[
                  ['/logo/Indian_Express_Logo_full.png','Indian Express'],
                  ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],
                  ['/logo/Uniphore.jpg','Uniphore'],
                  ['/logo/ICCoLogo.png','ICC'],
                  ['/logo/Honor_Logo_(2020).svg.png','Honor'],
                  ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],
                  ['/logo/Indian_Express_Logo_full.png','Indian Express2'],
                  ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon2'],
                  ['/logo/Uniphore.jpg','Uniphore2'],
                  ['/logo/ICCoLogo.png','ICC2'],
                  ['/logo/Honor_Logo_(2020).svg.png','Honor2'],
                  ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv2'],
                ].map(([src,alt]) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="mag-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="mag-services-section">
          <div className="mag-services-inner">
            <div className={`mag-section-reveal${visibleSections.has('services') ? ' mag-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="mag-section-eyebrow">Our Services</span>
              <h2 className="mag-section-title">Magento Development Services We Offer</h2>
              <p className="mag-section-desc">From new Magento 2 builds to Adobe Commerce implementations, custom extensions, and platform migrations — our certified developers deliver enterprise e-commerce solutions engineered for performance, scalability, and growth.</p>
            </div>
            <div className="mag-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`mag-service-card${s.featured?' featured':''}`}>
                  <span className="mag-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="mag-services-footer">
              <button className="mag-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show More Magento Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="mag-portfolio-section" id="portfolio">
          <div className="mag-portfolio-wrap">
            <div className="mag-portfolio-header">
              <h2 className={`mag-portfolio-title mag-section-reveal${visibleSections.has('portfolio') ? ' mag-revealed' : ''}`} ref={el => { sectionRefs.current['portfolio'] = el; }}>150+ Magento Stores<br/>Designed &amp; Developed</h2>
              <Link href="#contact" className="mag-btn-portfolio-cta">Browse Our Portfolio</Link>
            </div>
            <div className="mag-portfolio-grid">
              {[
                { img:'https://placehold.co/800x500/9a3412/ffffff?text=EnterpriseTools+B2B', name:'EnterpriseTools B2B', tech:'Industrial / Magento 2, Adobe Commerce, SAP Integration', cats:'B2B Wholesale / Quote Management / 50,000+ SKUs' },
                { img:'https://placehold.co/800x500/c2410c/ffffff?text=LuxeHome+Interiors', name:'LuxeHome Interiors', tech:'Home Decor / Magento 2, Custom Theme, Stripe, Klevu', cats:'B2C / Product Configurator / Multi-currency / PWA' },
                { img:'https://placehold.co/800x500/b45309/ffffff?text=MediSupply+Global', name:'MediSupply Global', tech:'Healthcare / Magento 2, WPML, NetSuite ERP, Custom Module', cats:'Multi-language / Regulatory Compliance / B2B Portal' },
              ].map(p => (
                <div className="mag-pcard" key={p.name}>
                  <div className="mag-pcard-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} loading="lazy" />
                  </div>
                  <div className="mag-pcard-body">
                    <h3 className="mag-pcard-name">{p.name}</h3>
                    <div className="mag-pcard-tech">{p.tech}</div>
                    <div className="mag-pcard-cats">{p.cats}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="mag-process-section">
          <div className="mag-process-top">
            <div className={`mag-section-reveal${visibleSections.has('process') ? ' mag-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="mag-process-eyebrow">HOW WE WORK</p>
              <h2 className="mag-process-main-title">How We Build Your Magento Store</h2>
              <p className="mag-process-main-desc">Our certified Magento developers, with 15+ years of enterprise e-commerce experience serving US, Canadian, and Australian businesses, follow a rigorous process to deliver Magento stores that scale to millions of products and handle peak traffic without breaking a sweat.</p>
            </div>
            <hr className="mag-process-divider" />
          </div>
          <div className="mag-process-inner">
            <div className="mag-process-steps">
              {[
                ['Discover','We analyse your business model, catalogue complexity, traffic patterns, ERP landscape, and growth trajectory — recommending the right Magento edition, hosting environment, and extension stack before a line of code is written.'],
                ['Define','We produce a detailed technical specification — store architecture, theme approach, custom module requirements, integration points, data migration plan, and a realistic timeline — agreed and signed off before development begins.'],
                ['Develop','Our certified Magento developers build your custom theme, modules, and integrations following Adobe\'s coding standards — with staging environment access, sprint reviews, and weekly progress updates throughout.'],
                ['Deploy','We conduct full QA testing, performance benchmarking, security audits, and a controlled go-live — then provide post-launch monitoring, documentation, and ongoing support to keep your store performing at its best.'],
              ].map(([title, desc], i) => (
                <div
                  className={`mag-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="mag-pstep-left">
                    <div className="mag-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="mag-pstep-arrow" />}
                  </div>
                  <div className="mag-pstep-content">
                    <h3 className="mag-pstep-title">{title}</h3>
                    <p className="mag-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mag-process-image-col">
              <div className="mag-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/office.png" alt="1Solutions Magento development team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="mag-testi-section">
          <div className="mag-testi-inner">
            <div className={`mag-section-header-center mag-section-reveal${visibleSections.has('testi') ? ' mag-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="mag-section-eyebrow">Client Reviews</span>
              <h2 className="mag-section-title">What Our Magento Clients Say</h2>
              <p className="mag-section-sub">Trusted by enterprise e-commerce brands across the US, Canada, Australia, and beyond for 15+ years.</p>
            </div>
            <div className="mag-testi-grid" ref={testiGridRef}>
              {[
                { initials:'GW', bg:'#9a3412', text:'"1Solutions migrated our entire Magento 1 store — 80,000 SKUs, 5 years of order history, and a custom ERP integration — to Magento 2 without a single hour of downtime. Technically outstanding."', name:'Greg Wallace', role:'Head of E-Commerce, EnterpriseTools — USA', featured:false },
                { initials:'SN', bg:'#7c2d12', text:'"They built our Adobe Commerce B2B portal from scratch — company accounts, shared catalogues, and a custom quote workflow. The project came in on budget and our wholesale team saved 25 hours a week immediately."', name:'Sophie Nguyen', role:'COO, MediSupply Global — Australia', featured:true },
                { initials:'JH', bg:'#c2410c', text:'"The Magento PWA they built for our luxury furniture brand is stunning — sub-2-second load times, a bespoke product configurator, and a checkout conversion rate 34% higher than our old store. Exceptional."', name:'James Harris', role:'Founder, LuxeHome Interiors — Canada', featured:false },
              ].map((t,i) => (
                <div className={`mag-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' mag-tcard-visible':''}`} key={t.name}>
                  <div className="mag-tcard-stars">★★★★★</div>
                  <p className="mag-tcard-text">{t.text}</p>
                  <div className="mag-tcard-author">
                    <div className="mag-tcard-avatar" style={{ background:t.bg }}>{t.initials}</div>
                    <div>
                      <div className="mag-tcard-name">{t.name}</div>
                      <div className="mag-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mag-testi-stats">
              {[['4.9/5','Average Rating'],['200+','Verified Reviews'],['98%','Client Satisfaction'],['85%','Repeat Clients']].map(([num,label],i,arr) => (
                <>
                  <div className="mag-tstat" key={label}>
                    <span className="mag-tstat-num">{num}</span>
                    <span className="mag-tstat-label">{label}</span>
                  </div>
                  {i < arr.length-1 && <div className="mag-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="mag-why-section">
          <div className="mag-why-inner">
            <div className={`mag-section-reveal${visibleSections.has('why') ? ' mag-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center',marginBottom:0 }}>
              <span className="mag-section-eyebrow">Why 1Solutions</span>
              <h2 className="mag-section-title">Why Enterprises Choose Us for Magento Development</h2>
              <p className="mag-section-sub" style={{ maxWidth:680,margin:'0 auto' }}>We don't just build Magento stores — we architect enterprise e-commerce platforms built for scale. Here's what sets us apart from freelancers and generic Magento agencies.</p>
            </div>
            <div className="mag-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`mag-why-card${visibleWhyCards.includes(i) ? ' mag-card-visible' : ''}`} key={w.title}>
                  <div className="mag-why-card-header">
                    <div className="mag-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="mag-engage-section">
          <div className="mag-engage-inner">
            <div className="mag-engage-left">
              <div className={`mag-section-reveal${visibleSections.has('engage') ? ' mag-revealed' : ''}`} ref={el => { sectionRefs.current['engage'] = el; }}>
                <span className="mag-section-eyebrow">Engagement Models</span>
                <h2 className="mag-engage-title">Flexible Engagement Models Built Around You</h2>
                <p className="mag-engage-desc">Whether you need a full Magento build, a migration, an ongoing development partner, or a dedicated extension team — we offer engagement models that match your scale, timeline, and budget.</p>
              </div>
              <div className="mag-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Partner-with-us.jpg" alt="Partner With 1Solutions" />
              </div>
            </div>
            <div className="mag-engage-right" ref={eCardsRef}>
              {[
                { title:'Dedicated Team', desc:'Hire a full-time dedicated Magento development team — certified developers and a project manager working exclusively on your store for as long as you need.', features:['Full Magento Expertise','Dedicated Project Manager','Transparent Reporting','Scalable Team Size'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { title:'Fixed-Price Project', desc:'For well-defined Magento builds and migrations with a clear scope. We agree on deliverables, timeline, and cost upfront — no surprises, no overruns.', features:['Complete Budget Control','Defined Deliverables','No Hidden Costs','On-time Launch'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                { title:'Time & Material', desc:'For complex or evolving Magento projects where requirements emerge iteratively. Pay for hours worked with full sprint-level visibility into progress and spend.', features:['Maximum Flexibility','Iterative Development','Sprint Reviews','Transparent Billing'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                { title:'Managed Support Retainer', desc:'Ongoing monthly retainer covering security patches, performance monitoring, Magento upgrades, bug fixes, and new feature development for live stores.', features:['Priority Security Patches','Performance Monitoring','Monthly Development Hours','Dedicated SLA'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
              ].map((e,i) => (
                <div className={`mag-ecard${visibleECards.includes(i)?' mag-ecard-visible':''}`} key={e.title}>
                  <div className="mag-ecard-header">
                    <div className="mag-ecard-icon">{e.icon}</div>
                    <h3 className="mag-ecard-title">{e.title}</h3>
                  </div>
                  <p className="mag-ecard-desc">{e.desc}</p>
                  <div className="mag-ecard-features">
                    {e.features.map(f => (
                      <div className="mag-efeat" key={f}><span className="mag-efeat-check">✔</span>{f}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="mag-contact-section" id="contact">
          <div className="mag-contact-container">
            <div className="mag-contact-left">
              <h2 className="mag-contact-title">Let's Build Your Magento Store Together</h2>
              <p className="mag-contact-desc">Tell us about your project and we'll respond within 24 hours with a tailored Magento development plan and architecture recommendation.</p>
              <div className="mag-merged-box">
                <div>
                  {[
                    { icon:<svg className="mag-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'Your project details are confidential. We respect your privacy.' },
                    { icon:<svg className="mag-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A certified Magento developer reviews your requirements — not automated responses.' },
                    { icon:<svg className="mag-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Quick response within 24 business hours.' },
                    { icon:<svg className="mag-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:"No obligation to proceed. Let's just talk." },
                  ].map((b,i) => (
                    <div className="mag-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="mag-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mag-stats-box">
                  <div className="mag-stats-grid">
                    {[['150+','Magento Stores'],['16+','Years Experience'],['97%','Client Retention']].map(([num,text]) => (
                      <div key={text}>
                        <div className="mag-stat-number">{num}</div>
                        <div className="mag-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mag-contact-right">
              <div className="mag-form-box">
                <h3>Contact Us</h3>
                <form className="mag-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="mag-form-row">
                    <div className="mag-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="mag-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="mag-form-row">
                    <div className="mag-form-group">
                      <label>Phone Number*</label>
                      <div className="mag-phone-input">
                        <select>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="mag-form-group"><label>Organization*</label><input type="text" placeholder="Organization / Store Name*" required /></div>
                  </div>
                  <div className="mag-form-group full"><label>Message*</label><textarea placeholder="Tell us about your Magento project..." rows={6} required /></div>
                  <div className="mag-consent">
                    <input type="checkbox" id="mag-consent" required />
                    <label htmlFor="mag-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="mag-submit-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mag-faq-section" id="faq">
          <div className="mag-faq-inner">
            <h2 className="mag-faq-heading">Frequently Asked Questions</h2>
            <div className="mag-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`mag-faq-item${openFaq===i?' open':''}`} key={i}>
                  <button className="mag-faq-question" onClick={() => setOpenFaq(openFaq===i ? -1 : i)}>
                    <div className="mag-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="mag-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="mag-faq-answer-wrap">
                    <div className="mag-faq-answer"><span className="mag-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="mag-related-section">
          <div className="mag-related-inner">
            <span className="mag-related-eyebrow">MAGENTO RELATED OFFERINGS</span>
            <h2 className="mag-related-title">Explore Related Services &amp; Technologies</h2>
            <p className="mag-related-sub">Pair our Magento expertise with related services to build a complete, enterprise-grade e-commerce ecosystem.</p>
            <hr className="mag-related-divider" />
            <div className="mag-related-tags">
              {[
                ['Magento 2 Extension Development','orange'],['Adobe Commerce Development','amber'],['Magento to Magento 2 Migration','rose'],
                ['E-Commerce SEO Services','teal'],['Magento Performance Optimization','orange'],['Magento B2B Development','indigo'],
                ['Magento PWA Development','sky'],['ERP & CRM Integration','blue'],['WooCommerce Development','violet'],
                ['Shopify Store Development','green'],['UI/UX Design for E-Commerce','cyan'],['Digital Marketing Services','slate'],
                ['Headless Commerce Development','emerald'],['Magento Security & Maintenance','amber'],['WordPress Development Services','indigo'],
              ].map(([label,color]) => (
                <Link href="#contact" className={`mag-rtag mag-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
