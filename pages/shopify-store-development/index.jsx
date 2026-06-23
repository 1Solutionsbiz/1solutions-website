'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Custom Shopify Store Development', desc:'Fully bespoke Shopify stores built from the ground up — tailored to your brand, products, and conversion goals.', featured:false },
  { n:'02', title:'Shopify Theme Development', desc:'Pixel-perfect, high-performance Shopify themes crafted to reflect your brand and deliver an outstanding shopping experience.', featured:true },
  { n:'03', title:'Shopify App Development', desc:'Custom Shopify apps and private integrations built to extend your store\'s functionality beyond what off-the-shelf apps offer.', featured:false },
  { n:'04', title:'Shopify Plus Development', desc:'Enterprise-grade Shopify Plus solutions with advanced automation, B2B portals, checkout customisations, and multi-store setups.', featured:false },
  { n:'05', title:'WooCommerce to Shopify Migration', desc:'Seamless migration from WooCommerce, Magento, BigCommerce, or any platform to Shopify with zero data loss and full SEO preservation.', featured:false },
  { n:'06', title:'Shopify SEO Optimization', desc:'Technical SEO, structured data, Core Web Vitals, and content optimisation to rank your Shopify store higher and drive organic traffic.', featured:false },
  { n:'07', title:'Shopify Speed Optimization', desc:'Audit and optimise your store\'s performance — faster load times, higher PageSpeed scores, and lower bounce rates.', featured:false },
  { n:'08', title:'Payment Gateway Integration', desc:'Integrate Stripe, PayPal, Afterpay, Klarna, Razorpay, and 100+ payment gateways for seamless global checkout.', featured:false },
  { n:'09', title:'Shopify Dropshipping Setup', desc:'End-to-end dropshipping store setup including supplier integrations, product importing, pricing rules, and automated order fulfilment.', featured:false },
  { n:'10', title:'Third-Party API Integration', desc:'Connect your Shopify store with ERPs, CRMs, inventory management systems, shipping providers, and marketing platforms.', featured:false },
  { n:'11', title:'Shopify Maintenance & Support', desc:'Ongoing maintenance, updates, performance monitoring, bug fixes, and dedicated support so your store never misses a sale.', featured:false },
  { n:'12', title:'Conversion Rate Optimization', desc:'Data-driven CRO — A/B testing, UX improvements, cart abandonment recovery, and checkout optimisation to maximise revenue.', featured:false },
];

const FAQS = [
  { q:'How much does custom Shopify store development cost?', a:'A custom Shopify store typically starts from $2,500 for a basic branded store and ranges up to $20,000+ for complex Shopify Plus builds with custom apps, multi-currency, multi-language support, and ERP integrations. The cost depends on design complexity, number of products, required functionality, and third-party integrations. We provide a detailed fixed-price quote after a free discovery call — no hidden costs, no surprises.' },
  { q:'How long does it take to build a Shopify store?', a:'A standard Shopify store with a custom theme typically takes 3–6 weeks from project kick-off to launch. Complex Shopify Plus builds or stores requiring custom app development can take 8–16 weeks. We share a detailed project timeline in the proposal stage, provide weekly progress updates, and use our structured 4D process to ensure on-time delivery.' },
  { q:'Can you migrate my WooCommerce or Magento store to Shopify?', a:'Absolutely. We migrate stores from WooCommerce, Magento, BigCommerce, PrestaShop, OpenCart, and custom-built platforms to Shopify. Our migration process preserves all products, customer records, order history, URLs, and SEO rankings. We test thoroughly on a staging environment before going live to ensure zero data loss and minimal downtime.' },
  { q:'Do you offer Shopify Plus development?', a:'Yes. We have extensive experience building Shopify Plus stores including custom checkout experiences (via Checkout Extensibility), B2B wholesale portals, Shopify Flow automation, Launchpad campaign scheduling, multi-currency and multi-language setups, and headless Shopify architectures using Hydrogen or Next.js.' },
  { q:'What is included in your Shopify maintenance plans?', a:'Our Shopify maintenance plans include theme and app updates, performance monitoring, security reviews, uptime monitoring, bug fixes, and a set number of content/product update hours per month. Plans start from $99/month. We also offer dedicated retainers for businesses needing ongoing development work or CRO improvements.' },
  { q:'Can you build custom Shopify apps?', a:'Yes. We build custom public apps, private apps, and embedded apps using Shopify\'s App Bridge, GraphQL Admin API, and Storefront API. Whether you need a custom loyalty programme, a bespoke product configurator, a B2B pricing engine, or an ERP sync — we can build it.' },
  { q:'Will my Shopify store be optimised for search engines?', a:'Yes — SEO is built into our development process from day one. Every store we deliver includes proper heading structure, schema markup (Product, BreadcrumbList, Organisation), Open Graph tags, sitemap, robots.txt, canonical tags, and Core Web Vitals optimisation. We also offer ongoing Shopify SEO services covering content strategy, link building, and technical audits.' },
  { q:'What makes 1Solutions different from other Shopify agencies?', a:'Three things: accountability, depth, and focus on western markets. Unlike freelancers, we offer a dedicated team — designers, developers, and a project manager — so your project never stalls. Unlike large agencies, engagements stay personal with a single point of contact. And unlike generic offshore firms, we\'ve spent 16+ years building for US, Canadian, and Australian businesses — we understand your market, compliance needs, and customer expectations.' },
  { q:'Do you work with international clients remotely?', a:'Yes — 100% of our client work is delivered remotely. We have been working with clients across the US, Canada, Australia, and the UK since 2008. We schedule meetings in your time zone, use tools like Slack, Notion, and Loom for transparent communication, and maintain full project visibility throughout.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V17H7v2h10v-2h-4v-1.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>, title:'15+ Years of Proven Experience', desc:'Since 2008, we\'ve delivered 500+ e-commerce projects. Our depth means fewer surprises, faster delivery, and better outcomes for your store.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'US, Canada & Australia Focused', desc:'We understand the market nuances, compliance needs, and consumer expectations of English-speaking western markets — not just generic offshore delivery.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'On-Time, On-Budget Delivery', desc:'Our structured 4D process (Discover → Define → Develop → Deploy) ensures projects are scoped correctly and delivered without cost overruns.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'Conversion-Focused Development', desc:'Every design and development decision is made with conversion in mind — from product page layout to checkout flow optimisation.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Custom App & Integration Expertise', desc:'Beyond themes — we build custom Shopify apps, ERP integrations, and bespoke automation that off-the-shelf solutions cannot deliver.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Dedicated Point of Contact', desc:'No ticket queues. A dedicated project manager speaks your language, understands your goals, and keeps you informed throughout.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'SEO Built Into Every Build', desc:'Schema markup, Core Web Vitals, and on-page SEO are baked in from day one — not as an afterthought or an expensive add-on.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership', desc:'97% client retention rate. We don\'t disappear after launch — maintenance plans, support retainers, and growth partnerships keep us invested in your success.' },
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
  const display = started
    ? (hasComma ? num.toLocaleString() : num) + suffix
    : val;
  return (
    <div className="shopify-stat-col">
      <div className="shopify-stat-label">{label}</div>
      <div className="shopify-stat-value">{display}</div>
    </div>
  );
}

export default function ShopifyStoreDevelopment() {
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
          WHY.forEach((_, i) => {
            setTimeout(() => setVisibleWhyCards(prev => prev.includes(i) ? prev : [...prev, i]), i * 100);
          });
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
        <title>Shopify Store Development Company | Expert Shopify Development Services | 1Solutions</title>
        <meta name="description" content="1Solutions is a leading Shopify store development company with 15+ years experience. We build custom Shopify stores, Shopify Plus solutions, and Shopify apps for US, Canada & Australia." />
        <meta name="keywords" content="shopify store development, shopify development company, shopify development services, custom shopify store, shopify plus development, shopify agency" />
        <link rel="canonical" href="https://www.1solutions.biz/shopify-store-development/" />
        <meta property="og:title" content="Shopify Store Development Company | 1Solutions" />
        <meta property="og:description" content="Build high-converting, fast, and SEO-optimized Shopify stores with 1Solutions' expert Shopify development services." />
        <meta property="og:url" content="https://www.1solutions.biz/shopify-store-development/" />
        <style>{`
          .shopify-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #EEF3FB 0%, #dbeafe 30%, #ede9fe 60%, #EEF3FB 100%);
            background-attachment: scroll;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .shopify-page *, .shopify-page *::before, .shopify-page *::after { box-sizing: border-box; }

          /* Orbs */
          .shopify-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(17,65,113,0.30) 0%,rgba(17,65,113,0.12) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .shopify-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.25) 0%,rgba(139,92,246,0.12) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .shopify-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(254,151,0,0.18) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* Hero */
          .shopify-hero-block { background:transparent;position:relative;overflow:hidden; }
          .shopify-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(17,65,113,0.10) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .shopify-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .shopify-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .shopify-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .shopify-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#114171 0%,#FE9700 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .shopify-hero-content p { font-size:16px;color:#3A507A;line-height:1.65;max-width:620px;margin:0 auto 28px; }
          .shopify-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#114171;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(17,65,113,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .shopify-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(254,151,0,0.6);box-shadow:0 12px 36px rgba(17,65,113,0.15),0 0 0 2px rgba(254,151,0,0.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#114171; }

          /* Stats */
          .shopify-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(17,65,113,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .shopify-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(17,65,113,0.10); }
          .shopify-stat-col:last-child { border-right:none; }
          .shopify-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .shopify-stat-value { font-size:26px;font-weight:900;color:#FE9700;letter-spacing:-0.5px;line-height:1; }

          /* Clients */
          .shopify-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .shopify-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .shopify-clients-logos { width:100%;overflow:hidden; }
          .shopify-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .shopify-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Sections shared */
          .shopify-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#FE9700;margin-bottom:12px;display:block; }
          .shopify-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#114171 0%,#FE9700 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .shopify-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .shopify-section-sub { font-size:16px;color:#4A6080;margin:0; }

          /* Services */
          .shopify-services-section { background:#EEF3FB;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(17,65,113,0.12),0 -4px 16px rgba(17,65,113,0.08); }
          .shopify-services-inner { max-width:1280px;margin:0 auto; }
          .shopify-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .shopify-service-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(219,234,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(17,65,113,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .shopify-service-card:hover { transform:translateY(-6px);border-color:rgba(254,151,0,0.45);box-shadow:0 16px 48px rgba(17,65,113,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .shopify-service-card.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(254,151,0,0.25);box-shadow:0 6px 32px rgba(254,151,0,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .shopify-service-card:hover .shopify-card-num { color:#FE9700;opacity:0.12; }
          .shopify-service-card:hover h3 { color:#FE9700; }
          .shopify-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#114171;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .shopify-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .shopify-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .shopify-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#FE9700,#FE9700);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .shopify-service-card:hover::before { transform:scaleY(1); }
          .shopify-services-footer { text-align:center;margin-top:20px; }
          .shopify-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(17,65,113,0.20);color:#114171;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(17,65,113,0.08);font-family:inherit; }
          .shopify-btn-show-more:hover { background:#114171;border-color:#114171;color:#ffffff;box-shadow:0 8px 28px rgba(17,65,113,0.20);transform:translateY(-2px); }

          /* Portfolio */
          .shopify-portfolio-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .shopify-portfolio-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(17,65,113,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .shopify-portfolio-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;gap:24px; }
          .shopify-portfolio-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#114171 0%,#FE9700 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0; }
          .shopify-btn-portfolio-cta { display:inline-block;padding:13px 26px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#114171;font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap;transition:all 0.3s;box-shadow:0 4px 20px rgba(17,65,113,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .shopify-btn-portfolio-cta:hover { background:rgba(255,255,255,0.85);border-color:rgba(254,151,0,0.6);transform:translateY(-2px);color:#114171; }
          .shopify-portfolio-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .shopify-pcard { display:flex;flex-direction:column;background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(17,65,113,0.12);border-radius:12px;overflow:hidden;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .shopify-pcard:hover { transform:translateY(-4px);border-color:rgba(254,151,0,0.5);box-shadow:0 12px 40px rgba(0,0,0,0.12); }
          .shopify-pcard-thumb { width:100%;aspect-ratio:16/10;overflow:hidden;background:#eee; }
          .shopify-pcard-thumb img { width:100%;height:100%;object-fit:cover;display:block; }
          .shopify-pcard-body { padding:18px 20px 20px;flex:1; }
          .shopify-pcard-name { font-size:18px;font-weight:800;color:#114171;margin:0 0 5px; }
          .shopify-pcard-tech { font-size:13px;color:#4A6080;margin-bottom:5px;line-height:1.4; }
          .shopify-pcard-cats { font-size:13px;font-weight:700;color:#FE9700; }

          /* Process */
          .shopify-process-section { background:#EEF3FB;border-top:1px solid rgba(17,65,113,0.08);border-bottom:1px solid rgba(17,65,113,0.08);padding:80px 40px;position:relative;z-index:1; }
          .shopify-process-top { max-width:1280px;margin:0 auto 56px; }
          .shopify-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#FE9700;margin:0 0 14px; }
          .shopify-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#114171 0%,#FE9700 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .shopify-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .shopify-process-divider { border:none;border-top:1px solid rgba(17,65,113,0.15);margin:36px 0 0;width:100%; }
          .shopify-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .shopify-process-steps { display:flex;flex-direction:column; }
          .shopify-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .shopify-pstep.visible { opacity:1;transform:translateY(0); }
          .shopify-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .shopify-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(17,65,113,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#114171;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .shopify-pstep:hover .shopify-pstep-circle { background:rgba(254,151,0,0.2);border-color:#FE9700;color:#FE9700; }
          .shopify-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .shopify-pstep-arrow::before { content:'';width:2px;flex:1;background:#114171;opacity:0.25; }
          .shopify-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #114171;opacity:0.45;margin-top:-1px; }
          .shopify-pstep:last-child .shopify-pstep-arrow { display:none; }
          .shopify-pstep-content { padding:4px 0 44px; }
          .shopify-pstep:last-child .shopify-pstep-content { padding-bottom:0; }
          .shopify-pstep-title { font-size:22px;font-weight:700;color:#114171;margin:0 0 10px;line-height:1.2; }
          .shopify-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .shopify-process-image-col { position:sticky;top:100px;min-width:0; }
          .shopify-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(17,65,113,0.15);aspect-ratio:4/5;background:#e8effc; }
          .shopify-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Testimonials */
          .shopify-testi-section { background:#EEF3FB;border-top:1px solid rgba(17,65,113,0.08);border-bottom:1px solid rgba(17,65,113,0.08);padding:80px 40px;position:relative;z-index:1; }
          .shopify-testi-inner { max-width:1280px;margin:0 auto; }
          .shopify-section-header-center { text-align:center;margin-bottom:52px; }
          .shopify-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .shopify-tcard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(219,234,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(17,65,113,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .shopify-tcard.shopify-tcard-visible { opacity:1;transform:translateY(0); }
          .shopify-tcard:hover { transform:translateY(-6px);border-color:rgba(254,151,0,0.40);box-shadow:0 16px 48px rgba(17,65,113,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .shopify-tcard.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(254,151,0,0.25);box-shadow:0 6px 32px rgba(254,151,0,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .shopify-tcard-stars { font-size:18px;color:#FE9700;letter-spacing:2px; }
          .shopify-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .shopify-tcard.featured .shopify-tcard-text { color:#1f2937; }
          .shopify-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .shopify-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .shopify-tcard-name { font-size:14px;font-weight:700;color:#114171; }
          .shopify-tcard-role { font-size:12px;color:#6b7280; }
          .shopify-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(219,234,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(17,65,113,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .shopify-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .shopify-tstat-num { font-size:28px;font-weight:800;color:#114171; }
          .shopify-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .shopify-tstat-divider { width:1px;height:40px;background:rgba(17,65,113,0.15); }

          /* Why */
          .shopify-why-section { padding:80px 40px;background:#EEF3FB;border-top:1px solid rgba(17,65,113,0.08);border-bottom:1px solid rgba(17,65,113,0.08);position:relative;z-index:1; }
          .shopify-why-inner { max-width:1280px;margin:0 auto; }
          .shopify-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .shopify-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(219,234,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(17,65,113,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),background 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .shopify-why-card.shopify-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .shopify-why-card:hover { transform:translateY(-6px) scale(1)!important;border-color:rgba(254,151,0,0.40);box-shadow:0 16px 48px rgba(17,65,113,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .shopify-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .shopify-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .shopify-why-icon svg { width:28px;height:28px;fill:#FE9700; }
          .shopify-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .shopify-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* Engagement */
          .shopify-engage-section { background:#EEF3FB;border-top:1px solid rgba(17,65,113,0.08);border-bottom:1px solid rgba(17,65,113,0.08);padding:80px 40px;position:relative;z-index:1; }
          .shopify-engage-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch; }
          .shopify-engage-left { position:sticky;top:100px;display:flex;flex-direction:column; }
          .shopify-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#114171 0%,#FE9700 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .shopify-engage-desc { font-size:15px;color:#3A507A;line-height:1.75;margin:0 0 32px; }
          .shopify-engage-img-wrap { border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(17,65,113,0.12);flex:1;min-height:300px; }
          .shopify-engage-img-wrap img { width:100%;height:100%;min-height:300px;object-fit:cover;display:block; }
          .shopify-engage-right { display:flex;flex-direction:column;gap:16px; }
          .shopify-ecard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(219,234,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(17,65,113,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.3s,box-shadow 0.3s; }
          .shopify-ecard.shopify-ecard-visible { opacity:1;transform:translateX(0); }
          .shopify-ecard:hover { border-color:rgba(254,151,0,0.45);box-shadow:0 16px 48px rgba(17,65,113,0.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateX(4px); }
          .shopify-ecard-header { display:flex;align-items:center;gap:14px;margin-bottom:10px; }
          .shopify-ecard-icon { width:44px;height:44px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .shopify-ecard-icon svg { width:26px;height:26px;stroke:#FE9700;fill:none; }
          .shopify-ecard-title { font-size:18px;font-weight:700;color:#114171;margin:0; }
          .shopify-ecard-desc { font-size:14px;color:#3A507A;line-height:1.65;margin:0 0 16px; }
          .shopify-ecard-features { display:grid;grid-template-columns:1fr 1fr;gap:8px 16px; }
          .shopify-efeat { display:flex;align-items:center;gap:8px;font-size:13px;color:#2A3F6F;font-weight:500; }
          .shopify-efeat-check { color:#FE9700;font-size:12px;flex-shrink:0; }

          /* Contact */
          .shopify-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(219,234,254,0.60) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.55) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .shopify-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .shopify-contact-left { padding:0;align-self:start; }
          .shopify-contact-right { align-self:start; }
          .shopify-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#114171 0%,#FE9700 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .shopify-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .shopify-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .shopify-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .shopify-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .shopify-benefit-icon { width:20px;height:20px;color:#FE9700;stroke:#FE9700;stroke-width:1.75; }
          .shopify-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .shopify-stats-box { padding-top:32px;border-top:1px solid rgba(17,65,113,0.12); }
          .shopify-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .shopify-stat-number { font-size:40px;font-weight:900;color:#114171;line-height:1;display:inline-block;margin-bottom:4px; }
          .shopify-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .shopify-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(219,234,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(17,65,113,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .shopify-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .shopify-contact-form { display:flex;flex-direction:column;gap:16px; }
          .shopify-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .shopify-form-group { display:flex;flex-direction:column;gap:6px; }
          .shopify-form-group.full { grid-column:1/-1; }
          .shopify-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .shopify-form-group input,.shopify-form-group textarea,.shopify-form-group select { padding:10px 14px;border:1px solid rgba(17,65,113,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(17,65,113,0.06);transition:border-color 0.2s,background 0.2s; }
          .shopify-form-group input:focus,.shopify-form-group textarea:focus { outline:none;border-color:#FE9700;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(254,151,0,0.12); }
          .shopify-phone-input { display:flex;border:1px solid rgba(17,65,113,0.15);border-radius:6px;overflow:hidden; }
          .shopify-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .shopify-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .shopify-phone-input input:focus { outline:none; }
          .shopify-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .shopify-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .shopify-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .shopify-consent a { color:#114171;text-decoration:none; }
          .shopify-submit-btn { padding:14px 28px;background:rgba(17,65,113,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(17,65,113,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .shopify-submit-btn:hover { background:rgba(17,65,113,0.95);border-color:rgba(254,151,0,0.6);transform:translateY(-2px); }

          /* FAQ */
          .shopify-faq-section { padding:80px 40px;background:#EEF3FB;border-top:1px solid rgba(17,65,113,0.08);position:relative;z-index:1; }
          .shopify-faq-inner { max-width:1280px;margin:0 auto; }
          .shopify-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#114171 0%,#FE9700 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .shopify-faq-list { display:flex;flex-direction:column;gap:12px; }
          .shopify-faq-item { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(219,234,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(17,65,113,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .shopify-faq-item.open { border-color:rgba(254,151,0,0.40);box-shadow:0 8px 32px rgba(17,65,113,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .shopify-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#FE9700;border-radius:3px 0 0 3px; }
          .shopify-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .shopify-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(17,65,113,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .shopify-faq-item.open .shopify-faq-q-badge { background:#FE9700;color:#fff; }
          .shopify-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .shopify-faq-item.open .shopify-faq-question span { color:#FE9700; }
          .shopify-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .shopify-faq-item.open .shopify-faq-chevron { transform:rotate(180deg);color:#FE9700; }
          .shopify-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .shopify-faq-item.open .shopify-faq-answer-wrap { max-height:500px; }
          .shopify-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .shopify-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#114171;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Related */
          .shopify-related-section { background:rgba(219,234,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .shopify-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .shopify-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .shopify-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#114171 0%,#FE9700 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .shopify-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .shopify-related-divider { border:none;border-top:1px solid rgba(17,65,113,0.12);margin:40px 0; }
          .shopify-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .shopify-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .shopify-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .shopify-rtag-green   { background:rgba(17,65,113,0.10);border-color:rgba(17,65,113,0.30);color:#114171; }
          .shopify-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .shopify-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .shopify-rtag-amber   { background:rgba(254,151,0,0.12);border-color:rgba(254,151,0,0.35);color:#B45309; }
          .shopify-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .shopify-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .shopify-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .shopify-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .shopify-rtag-cyan    { background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490; }
          .shopify-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }
          .shopify-rtag-emerald { background:rgba(17,65,113,0.10);border-color:rgba(17,65,113,0.28);color:#114171; }
          .shopify-rtag-slate   { background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155; }

          /* Shimmer CTA */
          .shopify-btn-hero-shimmer { position:relative;overflow:hidden; }
          .shopify-btn-hero-shimmer::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:shopify-shimmer-sweep 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes shopify-shimmer-sweep { 0%{left:-120%} 35%,100%{left:160%} }

          /* Section reveal */
          .shopify-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .shopify-section-reveal.shopify-revealed { opacity:1;transform:translateY(0); }

          /* Logo marquee */
          .shopify-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:shopify-marquee 28s linear infinite; }
          .shopify-logos-track:hover { animation-play-state:paused; }
          @keyframes shopify-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

          /* Responsive */
          @media (max-width:1024px) {
            .shopify-hero-content h1 { font-size:40px; }
            .shopify-services-grid { grid-template-columns:repeat(2,1fr); }
            .shopify-why-grid { grid-template-columns:repeat(2,1fr); }
            .shopify-portfolio-grid { grid-template-columns:repeat(2,1fr); }
            .shopify-portfolio-wrap { padding:32px 28px 40px; }
            .shopify-engage-inner { grid-template-columns:1fr; }
            .shopify-engage-left { position:static; }
            .shopify-process-inner { grid-template-columns:1fr; }
            .shopify-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .shopify-page { overflow-x:hidden; }
            .shopify-hero-content { padding:36px 20px 24px; }
            .shopify-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .shopify-hero-content p { font-size:15px; }
            .shopify-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .shopify-stat-col { padding:14px 12px; }
            .shopify-stat-col:nth-child(2) { border-right:none; }
            .shopify-stat-col:nth-child(3) { border-top:1px solid rgba(17,65,113,0.10); }
            .shopify-stat-col:nth-child(4) { border-top:1px solid rgba(17,65,113,0.10);border-right:none; }
            .shopify-stat-value { font-size:22px; }
            .shopify-clients-bar { padding:16px 20px 36px;gap:12px; }
            .shopify-client-logo { height:20px; }
            .shopify-services-section { padding:48px 20px 40px; }
            .shopify-portfolio-section { padding:48px 16px; }
            .shopify-portfolio-wrap { padding:24px 20px 32px;border-radius:16px; }
            .shopify-portfolio-header { flex-direction:column;align-items:flex-start;gap:14px; }
            .shopify-portfolio-title { font-size:26px; }
            .shopify-process-section { padding:60px 20px; }
            .shopify-process-top { margin-bottom:36px; }
            .shopify-testi-section { padding:60px 20px; }
            .shopify-testi-section .shopify-section-header-center { text-align:left; }
            .shopify-why-section { padding:60px 20px; }
            .shopify-why-section .shopify-section-header-center { text-align:left; }
            .shopify-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .shopify-why-card { padding:24px 20px; }
            .shopify-engage-section { padding:60px 20px; }
            .shopify-contact-section { padding:48px 16px; }
            .shopify-contact-container { grid-template-columns:1fr;gap:20px; }
            .shopify-contact-title { font-size:28px; }
            .shopify-faq-section { padding:60px 20px; }
            .shopify-faq-heading { font-size:26px; }
            .shopify-faq-question { padding:18px 18px 18px 52px; }
            .shopify-faq-question span { font-size:14px; }
            .shopify-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .shopify-faq-q-badge { left:14px; }
            .shopify-related-section { padding:60px 20px; }
            .shopify-related-tags { gap:8px; }
            .shopify-rtag { padding:9px 16px;font-size:13px; }
            .shopify-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .shopify-testi-grid { grid-template-columns:1fr; }
            .shopify-portfolio-grid { grid-template-columns:1fr; }
            .shopify-section-title,.shopify-engage-title,.shopify-process-main-title,.shopify-related-title { font-size:30px; }
            .shopify-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .shopify-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(17,65,113,0.10); }
            .shopify-tstat:nth-child(odd) { border-right:1px solid rgba(17,65,113,0.10); }
            .shopify-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .shopify-tstat-divider { display:none; }
            .shopify-form-row { grid-template-columns:1fr; }
            .shopify-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .shopify-stat-number { font-size:28px; }
          }
          @media (max-width:480px) {
            .shopify-hero-content h1 { font-size:24px; }
            .shopify-section-title,.shopify-engage-title,.shopify-process-main-title,.shopify-related-title { font-size:26px; }
            .shopify-services-grid { grid-template-columns:1fr; }
            .shopify-service-card { padding:20px 18px 18px; }
            .shopify-card-num { font-size:52px; }
            .shopify-process-main-title { font-size:24px; }
            .shopify-pstep-title { font-size:18px; }
            .shopify-portfolio-title { font-size:22px; }
            .shopify-contact-title { font-size:24px; }
            .shopify-engage-title { font-size:26px; }
            .shopify-tcard { padding:24px 20px; }
            .shopify-ecard { padding:20px; }
            .shopify-ecard-features { grid-template-columns:1fr; }
            .shopify-merged-box { padding:18px; }
          }
        `}</style>
      </Head>

      <div className="shopify-page">
        <div className="shopify-orb-1" />
        <div className="shopify-orb-2" />
        <div className="shopify-orb-3" />

        {/* ── HERO ── */}
        <div className="shopify-hero-block">
          <div className="shopify-hero-content">
            <span className="shopify-eyebrow">Expert Shopify Store Development Company</span>
            <h1>Shopify Store Development Services — Launch, Grow & Scale Your Online Store</h1>
            <p>Build high-converting, lightning-fast Shopify stores with 1Solutions' expert Shopify development services. From custom themes to Shopify Plus and bespoke app development — we deliver stores that drive real revenue for businesses across the US, Canada, and Australia.</p>
            <Link href="#contact" className="shopify-btn-hero shopify-btn-hero-shimmer">Get a Free Shopify Consultation</Link>
          </div>

          <div className="shopify-hero-stats" ref={statsRef}>
            {[['Shopify Stores Built','200+'],['E-Commerce Experts','50+'],['Projects Delivered','1,200+'],['Years in Business','15+']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="shopify-clients-bar">
            <span className="shopify-clients-label">Trusted by Leading Brands</span>
            <div className="shopify-clients-logos">
              <div className="shopify-logos-track">
                {[
                  ['/logo/Indian_Express_Logo_full.png','Indian Express'],
                  ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],
                  ['/logo/Uniphore.jpg','Uniphore'],
                  ['/logo/ICCoLogo.png','ICC'],
                  ['/logo/Honor_Logo_(2020).svg.png','Honor'],
                  ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],
                  ['/logo/amarujala-print-logo_60e03f7d5b4a8.webp','Amar Ujala'],
                  ['/logo/Nuance-Symbol-500x281.png','Nuance'],
                  ['/logo/PHDCCI-Logo-2024.png','PHD Chamber'],
                  ['/logo/Wilson-logo.svg.png','Wilson'],
                  ['/logo/977be174b7bcc8708254a2163b534cbe_fgraphic.png','Client'],
                  ['/logo/india-madeaismartphone2-1747658691.webp','India Made'],
                  /* duplicate for seamless loop */
                  ['/logo/Indian_Express_Logo_full.png','Indian Express2'],
                  ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon2'],
                  ['/logo/Uniphore.jpg','Uniphore2'],
                  ['/logo/ICCoLogo.png','ICC2'],
                  ['/logo/Honor_Logo_(2020).svg.png','Honor2'],
                  ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv2'],
                  ['/logo/amarujala-print-logo_60e03f7d5b4a8.webp','Amar Ujala2'],
                  ['/logo/Nuance-Symbol-500x281.png','Nuance2'],
                  ['/logo/PHDCCI-Logo-2024.png','PHD Chamber2'],
                  ['/logo/Wilson-logo.svg.png','Wilson2'],
                  ['/logo/977be174b7bcc8708254a2163b534cbe_fgraphic.png','Client2'],
                  ['/logo/india-madeaismartphone2-1747658691.webp','India Made2'],
                ].map(([src,alt]) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="shopify-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="shopify-services-section">
          <div className="shopify-services-inner">
            <div className={`shopify-section-reveal${visibleSections.has('services') ? ' shopify-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="shopify-section-eyebrow">Our Services</span>
              <h2 className="shopify-section-title">Shopify Development Services We Offer</h2>
              <p className="shopify-section-desc">From brand-new Shopify stores to complex Shopify Plus migrations and custom app development — our certified experts deliver end-to-end solutions built for performance, scalability, and conversions.</p>
            </div>
            <div className="shopify-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`shopify-service-card${s.featured?' featured':''}`}>
                  <span className="shopify-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="shopify-services-footer">
              <button className="shopify-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show More Shopify Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="shopify-portfolio-section" id="portfolio">
          <div className="shopify-portfolio-wrap">
            <div className="shopify-portfolio-header">
              <h2 className={`shopify-portfolio-title shopify-section-reveal${visibleSections.has('portfolio') ? ' shopify-revealed' : ''}`} ref={el => { sectionRefs.current['portfolio'] = el; }}>200+ Shopify Stores<br/>Designed &amp; Developed</h2>
              <Link href="/portfolio" className="shopify-btn-portfolio-cta">Browse Our Portfolio</Link>
            </div>
            <div className="shopify-portfolio-grid">
              {[
                { img:'/images/portfolio/aiplusstore.jpg', name:'AI+ Store — Shopify eCommerce', tech:'Consumer Electronics / Shopify, Liquid, UI/UX Design', cats:'eCommerce / Smartphones / Product Catalogue / DTC', url:'https://aiplusstore.com/' },
                { img:'/images/portfolio/keiyura.jpg', name:'Keiyura — Artisanal Jewellery', tech:'Fashion & Jewellery / Shopify, Liquid, UI/UX Design', cats:'eCommerce / Handcrafted / Lookbook / Collections', url:'https://keiyura.com/' },
                { img:'/images/portfolio/305aerosupplies.jpg', name:'305 Aero Supplies', tech:'Electronics & IT / Shopify, Liquid, eCommerce', cats:'eCommerce / Hardware / Software / IT Solutions', url:'https://305aerosupplies.com/' },
              ].map(p => (
                <a className="shopify-pcard" key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none',color:'inherit'}}>
                  <div className="shopify-pcard-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} loading="lazy" />
                  </div>
                  <div className="shopify-pcard-body">
                    <h3 className="shopify-pcard-name">{p.name}</h3>
                    <div className="shopify-pcard-tech">{p.tech}</div>
                    <div className="shopify-pcard-cats">{p.cats}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="shopify-process-section">
          <div className="shopify-process-top">
            <div className={`shopify-section-reveal${visibleSections.has('process') ? ' shopify-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="shopify-process-eyebrow">HOW WE WORK</p>
              <h2 className="shopify-process-main-title">How We Build Your Shopify Store</h2>
              <p className="shopify-process-main-desc">Our Shopify development experts, with 15+ years of experience delivering e-commerce solutions for clients across the US, Canada, and Australia, follow a proven process to build stores that convert visitors into loyal customers and scale with your business.</p>
            </div>
            <hr className="shopify-process-divider" />
          </div>
          <div className="shopify-process-inner">
            <div className="shopify-process-steps">
              {[
                ['Discover','We start by understanding your business model, target audience, product catalogue, and growth goals — identifying the right Shopify plan, apps, and integrations to power your store.'],
                ['Define','We collaborate with your team to define the store architecture, design direction, feature set, and integration requirements — aligning every decision with your brand and revenue objectives.'],
                ['Develop','Our certified Shopify developers build your custom theme, configure apps, integrate payment gateways and fulfilment systems, and optimise for speed and SEO — with regular progress updates throughout.'],
                ['Deploy','We run thorough QA testing, performance audits, and a staged launch — then hand over training, documentation, and ongoing support to keep your store growing after go-live.'],
              ].map(([title, desc], i) => (
                <div
                  className={`shopify-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="shopify-pstep-left">
                    <div className="shopify-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="shopify-pstep-arrow" />}
                  </div>
                  <div className="shopify-pstep-content">
                    <h3 className="shopify-pstep-title">{title}</h3>
                    <p className="shopify-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="shopify-process-image-col">
              <div className="shopify-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Shopify-Store-Development.png" alt="1Solutions Shopify development team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="shopify-testi-section">
          <div className="shopify-testi-inner">
            <div className={`shopify-section-header-center shopify-section-reveal${visibleSections.has('testi') ? ' shopify-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="shopify-section-eyebrow">Client Reviews</span>
              <h2 className="shopify-section-title">What Our Shopify Clients Say</h2>
              <p className="shopify-section-sub">Trusted by e-commerce brands across the US, Canada, Australia, and beyond for 15+ years.</p>
            </div>
            <div className="shopify-testi-grid" ref={testiGridRef}>
              {[
                { initials:'AM', bg:'#114171', text:'"1Solutions built our entire Shopify store from scratch — custom theme, Recharge subscriptions, and Klaviyo integration. Revenue was up 55% within the first quarter. Exceptional work."', name:'Amanda Morrison', role:'Founder, GreenLeaf Organics — USA', featured:false },
                { initials:'TR', bg:'#0F3460', text:'"We migrated from WooCommerce to Shopify Plus with zero downtime and no SEO loss. The team handled everything — product data, redirects, custom checkout — flawlessly. Highly recommend."', name:'Tom Reynolds', role:'Head of Digital, RetailEdge — Australia', featured:true },
                { initials:'CL', bg:'#1D4ED8', text:'"The custom Shopify app they built for our B2B portal saved us 20+ hours a week in manual order processing. Brilliant developers, clear communication, delivered ahead of schedule."', name:'Christine Lee', role:'COO, TechSupply Co. — Canada', featured:false },
              ].map((t,i) => (
                <div className={`shopify-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' shopify-tcard-visible':''}`} key={t.name}>
                  <div className="shopify-tcard-stars">★★★★★</div>
                  <p className="shopify-tcard-text">{t.text}</p>
                  <div className="shopify-tcard-author">
                    <div className="shopify-tcard-avatar" style={{ background:t.bg }}>{t.initials}</div>
                    <div>
                      <div className="shopify-tcard-name">{t.name}</div>
                      <div className="shopify-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="shopify-testi-stats">
              {[['4.9/5','Average Rating'],['200+','Verified Reviews'],['98%','Client Satisfaction'],['85%','Repeat Clients']].map(([num,label],i,arr) => (
                <>
                  <div className="shopify-tstat" key={label}>
                    <span className="shopify-tstat-num">{num}</span>
                    <span className="shopify-tstat-label">{label}</span>
                  </div>
                  {i < arr.length-1 && <div className="shopify-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="shopify-why-section">
          <div className="shopify-why-inner">
            <div className={`shopify-section-reveal${visibleSections.has('why') ? ' shopify-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center',marginBottom:0 }}>
              <span className="shopify-section-eyebrow">Why 1Solutions</span>
              <h2 className="shopify-section-title">Why Brands Choose Us for Shopify Development</h2>
              <p className="shopify-section-sub" style={{ maxWidth:680,margin:'0 auto' }}>We don't just build Shopify stores — we build revenue-generating assets. Here's what sets us apart from freelancers and generic Shopify agencies.</p>
            </div>
            <div className="shopify-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`shopify-why-card${visibleWhyCards.includes(i) ? ' shopify-card-visible' : ''}`} key={w.title}>
                  <div className="shopify-why-card-header">
                    <div className="shopify-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="shopify-engage-section">
          <div className="shopify-engage-inner">
            <div className="shopify-engage-left">
              <div className={`shopify-section-reveal${visibleSections.has('engage') ? ' shopify-revealed' : ''}`} ref={el => { sectionRefs.current['engage'] = el; }}>
                <span className="shopify-section-eyebrow">Engagement Models</span>
                <h2 className="shopify-engage-title">Flexible Engagement Models Built Around You</h2>
                <p className="shopify-engage-desc">We offer flexible engagement models so you can choose the approach that best fits your Shopify project, timeline, and budget — with full transparency at every step.</p>
              </div>
              <div className="shopify-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Partner-with-us.jpg" alt="Partner With 1Solutions" />
              </div>
            </div>
            <div className="shopify-engage-right" ref={eCardsRef}>
              {[
                { title:'Dedicated Team', desc:'Hire a full-time dedicated Shopify development team for long-term projects. We deploy a project manager and certified developers who work exclusively on your store.', features:['Cost-effective Approach','Less Administrative Overhead','Quick-paced Development','Timely Reporting'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { title:'Fixed-Price Project', desc:'Ideal for well-defined Shopify builds with a clear scope. We agree on deliverables, timeline, and cost upfront — no surprises, no hidden fees.', features:['Complete Budget Control','Ease of Management','No Hidden Costs','On-time Delivery'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                { title:'Time & Material', desc:'Perfect for evolving Shopify projects where requirements change. Pay only for the hours worked with full visibility into progress and spend.', features:['Maximum Flexibility','Reduced Risk','Iterative Development','Transparent Billing'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                { title:'Shopify Retainer', desc:'Ongoing monthly retainer for continuous improvements, CRO testing, new features, and maintenance. Ideal for growing stores that need a reliable dev partner.', features:['Priority Support','Ongoing CRO','Monthly Reporting','Dedicated Capacity'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
              ].map((e,i) => (
                <div className={`shopify-ecard${visibleECards.includes(i)?' shopify-ecard-visible':''}`} key={e.title}>
                  <div className="shopify-ecard-header">
                    <div className="shopify-ecard-icon">{e.icon}</div>
                    <h3 className="shopify-ecard-title">{e.title}</h3>
                  </div>
                  <p className="shopify-ecard-desc">{e.desc}</p>
                  <div className="shopify-ecard-features">
                    {e.features.map(f => (
                      <div className="shopify-efeat" key={f}><span className="shopify-efeat-check">✔</span>{f}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="shopify-contact-section" id="contact">
          <div className="shopify-contact-container">
            <div className="shopify-contact-left">
              <h2 className="shopify-contact-title">Let's Build Your Shopify Store Together</h2>
              <p className="shopify-contact-desc">Tell us about your project and we'll get back to you within 24 hours with a tailored Shopify development plan.</p>
              <div className="shopify-merged-box">
                <div>
                  {[
                    { icon:<svg className="shopify-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'Your project details are confidential. We respect your privacy.' },
                    { icon:<svg className="shopify-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A certified Shopify expert reviews your requirements — not automated responses.' },
                    { icon:<svg className="shopify-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Quick response within 24 business hours.' },
                    { icon:<svg className="shopify-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:"No obligation to proceed. Let's just talk." },
                  ].map((b,i) => (
                    <div className="shopify-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="shopify-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="shopify-stats-box">
                  <div className="shopify-stats-grid">
                    {[['200+','Shopify Stores'],['16+','Years Experience'],['97%','Client Retention']].map(([num,text]) => (
                      <div key={text}>
                        <div className="shopify-stat-number">{num}</div>
                        <div className="shopify-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="shopify-contact-right">
              <div className="shopify-form-box">
                <h3>Contact Us</h3>
                <form className="shopify-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="shopify-form-row">
                    <div className="shopify-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="shopify-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="shopify-form-row">
                    <div className="shopify-form-group">
                      <label>Phone Number*</label>
                      <div className="shopify-phone-input">
                        <select>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="shopify-form-group"><label>Organization*</label><input type="text" placeholder="Organization / Store Name*" required /></div>
                  </div>
                  <div className="shopify-form-group full"><label>Message*</label><textarea placeholder="Tell us about your Shopify project..." rows={6} required /></div>
                  <div className="shopify-consent">
                    <input type="checkbox" id="shopify-consent" required />
                    <label htmlFor="shopify-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="shopify-submit-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="shopify-faq-section" id="faq">
          <div className="shopify-faq-inner">
            <h2 className="shopify-faq-heading">Frequently Asked Questions</h2>
            <div className="shopify-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`shopify-faq-item${openFaq===i?' open':''}`} key={i}>
                  <button className="shopify-faq-question" onClick={() => setOpenFaq(openFaq===i ? -1 : i)}>
                    <div className="shopify-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="shopify-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="shopify-faq-answer-wrap">
                    <div className="shopify-faq-answer"><span className="shopify-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="shopify-related-section">
          <div className="shopify-related-inner">
            <span className="shopify-related-eyebrow">SHOPIFY RELATED OFFERINGS</span>
            <h2 className="shopify-related-title">Explore Related Services &amp; Technologies</h2>
            <p className="shopify-related-sub">Pair our Shopify development expertise with related services to build a complete, scalable e-commerce ecosystem.</p>
            <hr className="shopify-related-divider" />
            <div className="shopify-related-tags">
              {[
                ['WooCommerce to Shopify Migration', 'amber',  '/shopify-migration-services'],
                ['E-Commerce SEO Services',          'teal',   '/ecommerce-seo-services'],
                ['Shopify CRO Services',             'rose',   '/conversion-rate-optimization-services'],
                ['UI/UX Design for E-Commerce',      'cyan',   '/website-design'],
                ['Digital Marketing Services',       'slate',  '/digital-marketing-services'],
                ['Email Marketing & Klaviyo',        'green',  '/klaviyo-email-marketing-agency'],
                ['ERP & CRM Integration',            'blue',   '/erp-application-development-company'],
                ['WordPress Development Services',   'indigo', '/wordpress-development-company'],
              ].map(([label,color,href]) => (
                <Link href={href} className={`shopify-rtag shopify-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
