'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Custom OpenCart Store Development', desc:'Fully bespoke OpenCart stores built from the ground up — designed around your catalogue, brand, and business goals for maximum performance and conversion.', featured:false },
  { n:'02', title:'OpenCart Theme Development', desc:'Pixel-perfect, mobile-first OpenCart themes crafted for your brand — fast-loading, fully responsive, and built to deliver a seamless shopping experience.', featured:true },
  { n:'03', title:'OpenCart Extension Development', desc:'Custom OpenCart modules and extensions built precisely for your requirements — functionality that goes beyond what the marketplace offers out of the box.', featured:false },
  { n:'04', title:'OpenCart Multi-Store Setup', desc:'Configure and manage multiple storefronts from a single OpenCart installation — different domains, languages, currencies, and catalogues from one admin panel.', featured:false },
  { n:'05', title:'OpenCart Migration Services', desc:'Seamless migration from WooCommerce, Shopify, Magento, PrestaShop, or any platform to OpenCart with zero data loss and full SEO preservation.', featured:false },
  { n:'06', title:'OpenCart SEO Optimization', desc:'Technical SEO, schema markup, URL structure fixes, sitemap configuration, and Core Web Vitals improvements to rank your OpenCart store and drive organic traffic.', featured:false },
  { n:'07', title:'OpenCart Speed Optimization', desc:'Performance audits, image optimisation, caching configuration, CDN integration, and database tuning to achieve fast load times and higher PageSpeed scores.', featured:false },
  { n:'08', title:'Payment Gateway Integration', desc:'Integrate Stripe, PayPal, Authorize.Net, Razorpay, Klarna, Afterpay, and 40+ payment gateways for a smooth, trustworthy checkout experience.', featured:false },
  { n:'09', title:'OpenCart Version Upgrade', desc:'Upgrade from OpenCart 1.x or 2.x to OpenCart 3.x or 4.x — data migration, theme rebuild, extension compatibility, and thorough testing included.', featured:false },
  { n:'10', title:'Third-Party API Integration', desc:'Connect your OpenCart store with ERPs, CRMs, inventory management systems, shipping carriers, and marketing platforms via REST API or custom connectors.', featured:false },
  { n:'11', title:'OpenCart Maintenance & Support', desc:'Proactive security updates, performance monitoring, bug fixes, extension updates, and dedicated support to keep your OpenCart store secure and running smoothly.', featured:false },
  { n:'12', title:'OpenCart B2B Store Development', desc:'Build B2B-ready OpenCart stores with customer group pricing, quote request systems, wholesale catalogues, and approval workflows tailored to your business model.', featured:false },
];

const FAQS = [
  { q:'How much does OpenCart store development cost?', a:'A custom OpenCart store typically starts from $1,500 for a standard build with a custom theme and ranges up to $10,000+ for complex multi-store setups, custom extensions, and ERP integrations. OpenCart is one of the most cost-effective enterprise-capable e-commerce platforms available. We provide a detailed fixed-price quote after a free discovery call — no hidden costs, no surprises.' },
  { q:'Is OpenCart the right platform for my business?', a:'OpenCart is an excellent choice for small to mid-size businesses that need a powerful, lightweight, and cost-effective e-commerce platform without the overhead of Magento or the ongoing subscription costs of Shopify. It handles thousands of products well, supports multiple stores and currencies natively, and has a large extension marketplace. For very large enterprises with complex ERP needs, Magento or Adobe Commerce may be more appropriate — we\'ll give you an honest recommendation after learning about your requirements.' },
  { q:'Can you migrate my existing store to OpenCart?', a:'Yes. We migrate stores from WooCommerce, Shopify, Magento, PrestaShop, osCommerce, VirtueMart, and other platforms to OpenCart. Our migration process preserves all products, customer records, order history, URLs, and SEO rankings. We perform a complete data audit before migration and test thoroughly on a staging environment before going live.' },
  { q:'How long does an OpenCart development project take?', a:'A standard OpenCart store with a custom theme typically takes 2–5 weeks from kick-off to launch. More complex builds with custom extensions, multi-store configuration, or platform migrations can take 6–12 weeks. We share a detailed project timeline in the proposal stage and provide regular progress updates throughout.' },
  { q:'Do you build custom OpenCart extensions?', a:'Yes. We build custom OpenCart modules for virtually any requirement — custom shipping methods, unique pricing rules, loyalty programmes, product configurators, ERP data sync, custom checkout flows, and more. All extensions are built to OpenCart coding standards, thoroughly tested across versions, and fully documented.' },
  { q:'Can you upgrade my old OpenCart 1.x or 2.x store to the latest version?', a:'Yes. We handle OpenCart upgrades from any older version to OpenCart 3.x or 4.x. The process involves data migration, rebuilding or replacing the theme for the new version, checking extension compatibility, migrating custom modules, and running full regression testing before launch. We always use a staging environment to ensure zero disruption to your live store.' },
  { q:'Will my OpenCart store be optimised for search engines?', a:'Yes — SEO is built into our development process from day one. Every OpenCart store we deliver includes clean URL configuration, proper meta structures, Product schema markup, Open Graph tags, XML sitemap, robots.txt, canonical URLs, and Core Web Vitals optimisation. We also address common OpenCart-specific SEO issues like duplicate content from pagination and filter parameters.' },
  { q:'Do you work with clients in the US, Canada, and Australia remotely?', a:'Yes — 100% of our client work is delivered remotely. We have been working with US, Canadian, and Australian businesses since 2008. We schedule meetings in your time zone, collaborate via Slack, Notion, and Loom, and provide full project transparency at every stage. No communication gaps, no cultural mismatches.' },
  { q:'What makes 1Solutions different from other OpenCart agencies?', a:'Three things: depth, accountability, and western market focus. Unlike freelancers, we offer a full team — designer, developer, and project manager. Unlike generic agencies, we have hands-on OpenCart experience across dozens of industries and versions. And unlike large offshore firms, your project stays personal with a single point of contact who understands your market expectations and delivers accordingly.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V17H7v2h10v-2h-4v-1.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>, title:'15+ Years of Proven Experience', desc:'Since 2008, we\'ve delivered e-commerce solutions for businesses across dozens of industries. Our platform breadth — including deep OpenCart expertise — means better decisions from day one.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'US, Canada & Australia Focused', desc:'We understand the market standards, compliance requirements, and customer expectations of English-speaking western markets — delivering quality work at competitive offshore rates.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'On-Time, On-Budget Delivery', desc:'Our structured 4D process (Discover → Define → Develop → Deploy) ensures projects are scoped accurately and delivered without overruns or last-minute surprises.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'Conversion-First Development', desc:'Every design and development decision is made with revenue in mind — from category page layout to checkout flow optimisation and upsell placement.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Custom Extension Expertise', desc:'We build bespoke OpenCart modules for any business need — from complex pricing logic and ERP sync to custom shipping rules and loyalty programmes.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Dedicated Point of Contact', desc:'No ticket queues. A dedicated project manager keeps you informed at every step, schedules meetings in your time zone, and ensures nothing slips through the cracks.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'SEO Built Into Every Build', desc:'Schema markup, clean URL structures, Core Web Vitals, and on-page SEO are baked in from day one — not treated as an afterthought or optional add-on.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership', desc:'97% client retention rate. We remain invested in your success beyond launch through maintenance plans, support retainers, and ongoing growth partnerships.' },
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
    <div className="oc-stat-col">
      <div className="oc-stat-label">{label}</div>
      <div className="oc-stat-value">{display}</div>
    </div>
  );
}

export default function OpenCartDevelopmentCompany() {
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
        <title>OpenCart Development Company | Expert OpenCart Development Services | 1Solutions</title>
        <meta name="description" content="1Solutions is a leading OpenCart development company with 15+ years experience. We build custom OpenCart stores, extensions, and multi-store setups for US, Canada & Australia." />
        <meta name="keywords" content="opencart development company, opencart development services, custom opencart store, opencart extension development, opencart agency, opencart developer" />
        <link rel="canonical" href="https://www.1solutions.biz/opencart-development-company/" />
        <meta property="og:title" content="OpenCart Development Company | 1Solutions" />
        <meta property="og:description" content="Build fast, scalable, and SEO-optimised OpenCart stores with 1Solutions' expert OpenCart development services for US, Canada & Australia." />
        <meta property="og:url" content="https://www.1solutions.biz/opencart-development-company/" />
        <style>{`
          .oc-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #ecfeff 0%, #cffafe 25%, #e0f2fe 55%, #f0fdfa 80%, #ecfeff 100%);
            background-attachment: scroll;
            color: #0c1a2e;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .oc-page *, .oc-page *::before, .oc-page *::after { box-sizing: border-box; }

          /* Orbs */
          .oc-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(6,182,212,0.28) 0%,rgba(8,145,178,0.10) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .oc-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.22) 0%,rgba(13,148,136,0.08) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .oc-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* Hero */
          .oc-hero-block { background:transparent;position:relative;overflow:hidden; }
          .oc-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(6,182,212,0.10) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .oc-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.12) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .oc-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .oc-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#164e63;margin-bottom:18px; }
          .oc-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#0e7490 0%,#0891b2 55%,#0d9488 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .oc-hero-content p { font-size:16px;color:#1e4a5c;line-height:1.65;max-width:620px;margin:0 auto 28px; }
          .oc-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.58);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.88);border-radius:50px;color:#0e7490;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(6,182,212,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .oc-btn-hero:hover { background:rgba(255,255,255,0.90);border-color:rgba(6,182,212,0.50);box-shadow:0 12px 36px rgba(6,182,212,0.18),0 0 0 2px rgba(6,182,212,0.18),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0e7490; }

          /* Stats */
          .oc-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.48);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.88);box-shadow:0 4px 24px rgba(6,182,212,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .oc-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(6,182,212,0.12); }
          .oc-stat-col:last-child { border-right:none; }
          .oc-stat-label { font-size:12px;color:#164e63;font-weight:500;margin-bottom:6px; }
          .oc-stat-value { font-size:26px;font-weight:900;color:#0891b2;letter-spacing:-0.5px;line-height:1; }

          /* Clients */
          .oc-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .oc-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#155e75; }
          .oc-clients-logos { width:100%;overflow:hidden; }
          .oc-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .oc-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Sections shared */
          .oc-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0891b2;margin-bottom:12px;display:block; }
          .oc-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0e7490 0%,#0891b2 55%,#0d9488 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .oc-section-desc { font-size:15px;color:#1e4a5c;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .oc-section-sub { font-size:16px;color:#1e4a5c;margin:0; }

          /* Services */
          .oc-services-section { background:#ecfeff;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(6,182,212,0.10),0 -4px 16px rgba(6,182,212,0.06); }
          .oc-services-inner { max-width:1280px;margin:0 auto; }
          .oc-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .oc-service-card { background:linear-gradient(135deg,rgba(207,250,254,0.58) 0%,rgba(255,255,255,0.82) 60%,rgba(204,251,241,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(6,182,212,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .oc-service-card:hover { transform:translateY(-6px);border-color:rgba(6,182,212,0.40);box-shadow:0 16px 48px rgba(6,182,212,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .oc-service-card.featured { background:linear-gradient(135deg,rgba(204,251,241,0.55) 0%,rgba(255,255,255,0.88) 55%,rgba(207,250,254,0.48) 100%);border-color:rgba(6,182,212,0.20);box-shadow:0 6px 32px rgba(6,182,212,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .oc-service-card:hover .oc-card-num { color:#0891b2;opacity:0.12; }
          .oc-service-card:hover h3 { color:#0891b2; }
          .oc-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0e7490;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .oc-service-card h3 { font-size:15px;font-weight:700;color:#0c1a2e;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .oc-service-card p { font-size:13px;color:#1e4a5c;line-height:1.6;position:relative;z-index:1; }
          .oc-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#0891b2,#06b6d4);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .oc-service-card:hover::before { transform:scaleY(1); }
          .oc-services-footer { text-align:center;margin-top:20px; }
          .oc-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(6,182,212,0.25);color:#0e7490;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(6,182,212,0.08);font-family:inherit; }
          .oc-btn-show-more:hover { background:#0e7490;border-color:#0e7490;color:#ffffff;box-shadow:0 8px 28px rgba(6,182,212,0.22);transform:translateY(-2px); }

          /* Portfolio */
          .oc-portfolio-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .oc-portfolio-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.48);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.88);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(6,182,212,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .oc-portfolio-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;gap:24px; }
          .oc-portfolio-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0e7490 0%,#0891b2 55%,#0d9488 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0; }
          .oc-btn-portfolio-cta { display:inline-block;padding:13px 26px;background:rgba(255,255,255,0.58);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.88);border-radius:50px;color:#0e7490;font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap;transition:all 0.3s;box-shadow:0 4px 20px rgba(6,182,212,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .oc-btn-portfolio-cta:hover { background:rgba(255,255,255,0.90);border-color:rgba(6,182,212,0.45);transform:translateY(-2px);color:#0e7490; }
          .oc-portfolio-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .oc-pcard { display:flex;flex-direction:column;background:rgba(255,255,255,0.68);backdrop-filter:blur(10px);border:1px solid rgba(6,182,212,0.12);border-radius:12px;overflow:hidden;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .oc-pcard:hover { transform:translateY(-4px);border-color:rgba(6,182,212,0.42);box-shadow:0 12px 40px rgba(6,182,212,0.14); }
          .oc-pcard-thumb { width:100%;aspect-ratio:16/10;overflow:hidden;background:#cffafe; }
          .oc-pcard-thumb img { width:100%;height:100%;object-fit:cover;display:block; }
          .oc-pcard-body { padding:18px 20px 20px;flex:1; }
          .oc-pcard-name { font-size:18px;font-weight:800;color:#0e7490;margin:0 0 5px; }
          .oc-pcard-tech { font-size:13px;color:#1e4a5c;margin-bottom:5px;line-height:1.4; }
          .oc-pcard-cats { font-size:13px;font-weight:700;color:#0891b2; }

          /* Process */
          .oc-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .oc-process-top { max-width:1280px;margin:0 auto 56px; }
          .oc-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#0891b2;margin:0 0 14px; }
          .oc-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0e7490 0%,#0891b2 55%,#0d9488 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .oc-process-main-desc { font-size:15px;color:#1e4a5c;line-height:1.7;margin:0; }
          .oc-process-divider { border:none;border-top:1px solid rgba(6,182,212,0.18);margin:36px 0 0;width:100%; }
          .oc-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .oc-process-steps { display:flex;flex-direction:column; }
          .oc-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .oc-pstep.visible { opacity:1;transform:translateY(0); }
          .oc-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .oc-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.68);backdrop-filter:blur(8px);border:2px solid rgba(6,182,212,0.22);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0e7490;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .oc-pstep:hover .oc-pstep-circle { background:rgba(6,182,212,0.15);border-color:#0891b2;color:#0891b2; }
          .oc-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .oc-pstep-arrow::before { content:'';width:2px;flex:1;background:#0891b2;opacity:0.25; }
          .oc-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #0891b2;opacity:0.45;margin-top:-1px; }
          .oc-pstep:last-child .oc-pstep-arrow { display:none; }
          .oc-pstep-content { padding:4px 0 44px; }
          .oc-pstep:last-child .oc-pstep-content { padding-bottom:0; }
          .oc-pstep-title { font-size:22px;font-weight:700;color:#0e7490;margin:0 0 10px;line-height:1.2; }
          .oc-pstep-desc { font-size:15px;color:#1e4a5c;line-height:1.75;margin:0; }
          .oc-process-image-col { position:sticky;top:100px;min-width:0; }
          .oc-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(6,182,212,0.15);aspect-ratio:4/5;background:#cffafe; }
          .oc-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Testimonials */
          .oc-testi-section { background:#ecfeff;border-top:1px solid rgba(6,182,212,0.10);border-bottom:1px solid rgba(6,182,212,0.10);padding:80px 40px;position:relative;z-index:1; }
          .oc-testi-inner { max-width:1280px;margin:0 auto; }
          .oc-section-header-center { text-align:center;margin-bottom:52px; }
          .oc-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .oc-tcard { background:linear-gradient(135deg,rgba(207,250,254,0.58) 0%,rgba(255,255,255,0.82) 60%,rgba(204,251,241,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(6,182,212,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .oc-tcard.oc-tcard-visible { opacity:1;transform:translateY(0); }
          .oc-tcard:hover { transform:translateY(-6px)!important;border-color:rgba(6,182,212,0.38);box-shadow:0 16px 48px rgba(6,182,212,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .oc-tcard.featured { background:linear-gradient(135deg,rgba(204,251,241,0.55) 0%,rgba(255,255,255,0.88) 55%,rgba(207,250,254,0.45) 100%);border-color:rgba(6,182,212,0.18);box-shadow:0 6px 32px rgba(6,182,212,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .oc-tcard-stars { font-size:18px;color:#0891b2;letter-spacing:2px; }
          .oc-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .oc-tcard.featured .oc-tcard-text { color:#1f2937; }
          .oc-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .oc-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .oc-tcard-name { font-size:14px;font-weight:700;color:#0e7490; }
          .oc-tcard-role { font-size:12px;color:#6b7280; }
          .oc-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(207,250,254,0.55) 0%,rgba(255,255,255,0.78) 50%,rgba(204,251,241,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.88);box-shadow:0 4px 20px rgba(6,182,212,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .oc-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .oc-tstat-num { font-size:28px;font-weight:800;color:#0e7490; }
          .oc-tstat-label { font-size:13px;color:#1e4a5c;font-weight:500; }
          .oc-tstat-divider { width:1px;height:40px;background:rgba(6,182,212,0.18); }

          /* Why */
          .oc-why-section { padding:80px 40px;background:#ecfeff;border-top:1px solid rgba(6,182,212,0.10);border-bottom:1px solid rgba(6,182,212,0.10);position:relative;z-index:1; }
          .oc-why-inner { max-width:1280px;margin:0 auto; }
          .oc-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .oc-why-card { background:linear-gradient(135deg,rgba(207,250,254,0.58) 0%,rgba(255,255,255,0.82) 60%,rgba(204,251,241,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(6,182,212,0.07),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s; }
          .oc-why-card.oc-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .oc-why-card:hover { transform:translateY(-6px) scale(1)!important;border-color:rgba(6,182,212,0.38);box-shadow:0 16px 48px rgba(6,182,212,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .oc-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .oc-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .oc-why-icon svg { width:28px;height:28px;fill:#0891b2; }
          .oc-why-card h3 { font-size:15px;font-weight:700;color:#0c1a2e;margin:0;line-height:1.35; }
          .oc-why-card p { font-size:13px;color:#1e4a5c;line-height:1.7;margin:0; }

          /* Engagement */
          .oc-engage-section { background:#ecfeff;border-top:1px solid rgba(6,182,212,0.10);border-bottom:1px solid rgba(6,182,212,0.10);padding:80px 40px;position:relative;z-index:1; }
          .oc-engage-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch; }
          .oc-engage-left { position:sticky;top:100px;display:flex;flex-direction:column; }
          .oc-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0e7490 0%,#0891b2 55%,#0d9488 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .oc-engage-desc { font-size:15px;color:#1e4a5c;line-height:1.75;margin:0 0 32px; }
          .oc-engage-img-wrap { border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(6,182,212,0.14);flex:1;min-height:300px; }
          .oc-engage-img-wrap img { width:100%;height:100%;min-height:300px;object-fit:cover;display:block; }
          .oc-engage-right { display:flex;flex-direction:column;gap:16px; }
          .oc-ecard { background:linear-gradient(135deg,rgba(207,250,254,0.58) 0%,rgba(255,255,255,0.82) 60%,rgba(204,251,241,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(6,182,212,0.07),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.3s,box-shadow 0.3s; }
          .oc-ecard.oc-ecard-visible { opacity:1;transform:translateX(0); }
          .oc-ecard:hover { border-color:rgba(6,182,212,0.40);box-shadow:0 16px 48px rgba(6,182,212,0.14),inset 0 1px 0 rgba(255,255,255,1);transform:translateX(4px); }
          .oc-ecard-header { display:flex;align-items:center;gap:14px;margin-bottom:10px; }
          .oc-ecard-icon { width:44px;height:44px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .oc-ecard-icon svg { width:26px;height:26px;stroke:#0891b2;fill:none; }
          .oc-ecard-title { font-size:18px;font-weight:700;color:#0e7490;margin:0; }
          .oc-ecard-desc { font-size:14px;color:#1e4a5c;line-height:1.65;margin:0 0 16px; }
          .oc-ecard-features { display:grid;grid-template-columns:1fr 1fr;gap:8px 16px; }
          .oc-efeat { display:flex;align-items:center;gap:8px;font-size:13px;color:#164e63;font-weight:500; }
          .oc-efeat-check { color:#0891b2;font-size:12px;flex-shrink:0; }

          /* Contact */
          .oc-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(207,250,254,0.72) 0%,rgba(255,255,255,0.65) 40%,rgba(204,251,241,0.68) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.85); }
          .oc-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .oc-contact-left { padding:0;align-self:start; }
          .oc-contact-right { align-self:start; }
          .oc-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0e7490 0%,#0891b2 55%,#0d9488 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .oc-contact-desc { font-size:14px;color:#1e4a5c;line-height:1.6;margin:0 0 24px; }
          .oc-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.75) 0%,rgba(207,250,254,0.38) 100%);border:1px solid rgba(255,255,255,0.92);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .oc-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .oc-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .oc-benefit-icon { width:20px;height:20px;color:#0891b2;stroke:#0891b2;stroke-width:1.75; }
          .oc-benefit-item p { font-size:13px;color:#1e4a5c;margin:0;line-height:1.5; }
          .oc-stats-box { padding-top:32px;border-top:1px solid rgba(6,182,212,0.14); }
          .oc-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .oc-stat-number { font-size:40px;font-weight:900;color:#0e7490;line-height:1;display:inline-block;margin-bottom:4px; }
          .oc-stat-text { font-size:13px;color:#1e4a5c;line-height:1.4;font-weight:500; }
          .oc-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.92) 0%,rgba(207,250,254,0.20) 50%,rgba(255,255,255,0.88) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.95);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(6,182,212,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .oc-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0c1a2e;letter-spacing:-0.5px; }
          .oc-contact-form { display:flex;flex-direction:column;gap:16px; }
          .oc-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .oc-form-group { display:flex;flex-direction:column;gap:6px; }
          .oc-form-group.full { grid-column:1/-1; }
          .oc-form-group label { font-size:12px;font-weight:500;color:#0c1a2e; }
          .oc-form-group input,.oc-form-group textarea,.oc-form-group select { padding:10px 14px;border:1px solid rgba(6,182,212,0.18);border-radius:6px;font-size:13px;font-family:inherit;color:#0c1a2e;background:rgba(255,255,255,0.60);box-shadow:inset 0 1px 4px rgba(6,182,212,0.05);transition:border-color 0.2s,background 0.2s; }
          .oc-form-group input:focus,.oc-form-group textarea:focus { outline:none;border-color:#0891b2;background:rgba(255,255,255,0.95);box-shadow:0 0 0 3px rgba(6,182,212,0.12); }
          .oc-phone-input { display:flex;border:1px solid rgba(6,182,212,0.18);border-radius:6px;overflow:hidden; }
          .oc-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.15);font-size:12px;min-width:75px; }
          .oc-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .oc-phone-input input:focus { outline:none; }
          .oc-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .oc-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .oc-consent label { font-size:11px;color:#1e4a5c;line-height:1.5;margin:0; }
          .oc-consent a { color:#0e7490;text-decoration:none; }
          .oc-submit-btn { padding:14px 28px;background:rgba(14,116,144,0.88);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.35);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(6,182,212,0.28),inset 0 1px 0 rgba(255,255,255,0.18); }
          .oc-submit-btn:hover { background:rgba(14,116,144,0.96);border-color:rgba(6,182,212,0.55);transform:translateY(-2px); }

          /* FAQ */
          .oc-faq-section { padding:80px 40px;background:#ecfeff;border-top:1px solid rgba(6,182,212,0.10);position:relative;z-index:1; }
          .oc-faq-inner { max-width:1280px;margin:0 auto; }
          .oc-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0e7490 0%,#0891b2 55%,#0d9488 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .oc-faq-list { display:flex;flex-direction:column;gap:12px; }
          .oc-faq-item { background:linear-gradient(135deg,rgba(207,250,254,0.58) 0%,rgba(255,255,255,0.82) 60%,rgba(204,251,241,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(6,182,212,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .oc-faq-item.open { border-color:rgba(6,182,212,0.38);box-shadow:0 8px 32px rgba(6,182,212,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .oc-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#0891b2;border-radius:3px 0 0 3px; }
          .oc-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .oc-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(6,182,212,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .oc-faq-item.open .oc-faq-q-badge { background:#0891b2;color:#fff; }
          .oc-faq-question span { font-size:16px;font-weight:600;color:#0c1a2e;line-height:1.45; }
          .oc-faq-item.open .oc-faq-question span { color:#0891b2; }
          .oc-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .oc-faq-item.open .oc-faq-chevron { transform:rotate(180deg);color:#0891b2; }
          .oc-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .oc-faq-item.open .oc-faq-answer-wrap { max-height:500px; }
          .oc-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#1e4a5c;line-height:1.8; }
          .oc-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#0e7490;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Related */
          .oc-related-section { background:rgba(207,250,254,0.22);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.65);padding:80px 40px; }
          .oc-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .oc-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#155e75;margin:0 0 14px;display:block; }
          .oc-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0e7490 0%,#0891b2 55%,#0d9488 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .oc-related-sub { font-size:15px;color:#0c1a2e;line-height:1.7;margin:0 auto;max-width:680px; }
          .oc-related-divider { border:none;border-top:1px solid rgba(6,182,212,0.14);margin:40px 0; }
          .oc-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .oc-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .oc-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .oc-rtag-cyan    { background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.30);color:#0e7490; }
          .oc-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .oc-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .oc-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .oc-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .oc-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .oc-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .oc-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .oc-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .oc-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }
          .oc-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }
          .oc-rtag-slate   { background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155; }

          /* Shimmer */
          .oc-btn-hero-shimmer { position:relative;overflow:hidden; }
          .oc-btn-hero-shimmer::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.78) 45%,rgba(255,255,255,0.92) 50%,rgba(255,255,255,0.78) 55%,transparent 100%);animation:oc-shimmer-sweep 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes oc-shimmer-sweep { 0%{left:-120%} 35%,100%{left:160%} }

          /* Section reveal */
          .oc-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .oc-section-reveal.oc-revealed { opacity:1;transform:translateY(0); }

          /* Logo marquee */
          .oc-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:oc-marquee 28s linear infinite; }
          .oc-logos-track:hover { animation-play-state:paused; }
          @keyframes oc-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

          /* Responsive */
          @media (max-width:1024px) {
            .oc-hero-content h1 { font-size:40px; }
            .oc-services-grid { grid-template-columns:repeat(2,1fr); }
            .oc-why-grid { grid-template-columns:repeat(2,1fr); }
            .oc-portfolio-grid { grid-template-columns:repeat(2,1fr); }
            .oc-portfolio-wrap { padding:32px 28px 40px; }
            .oc-engage-inner { grid-template-columns:1fr; }
            .oc-engage-left { position:static; }
            .oc-process-inner { grid-template-columns:1fr; }
            .oc-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .oc-page { overflow-x:hidden; }
            .oc-hero-content { padding:36px 20px 24px; }
            .oc-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .oc-hero-content p { font-size:15px; }
            .oc-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .oc-stat-col { padding:14px 12px; }
            .oc-stat-col:nth-child(2) { border-right:none; }
            .oc-stat-col:nth-child(3) { border-top:1px solid rgba(6,182,212,0.12); }
            .oc-stat-col:nth-child(4) { border-top:1px solid rgba(6,182,212,0.12);border-right:none; }
            .oc-stat-value { font-size:22px; }
            .oc-clients-bar { padding:16px 20px 36px;gap:12px; }
            .oc-client-logo { height:20px; }
            .oc-services-section { padding:48px 20px 40px; }
            .oc-portfolio-section { padding:48px 16px; }
            .oc-portfolio-wrap { padding:24px 20px 32px;border-radius:16px; }
            .oc-portfolio-header { flex-direction:column;align-items:flex-start;gap:14px; }
            .oc-portfolio-title { font-size:26px; }
            .oc-process-section { padding:60px 20px; }
            .oc-process-top { margin-bottom:36px; }
            .oc-testi-section { padding:60px 20px; }
            .oc-testi-section .oc-section-header-center { text-align:left; }
            .oc-why-section { padding:60px 20px; }
            .oc-why-section .oc-section-header-center { text-align:left; }
            .oc-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .oc-why-card { padding:24px 20px; }
            .oc-engage-section { padding:60px 20px; }
            .oc-contact-section { padding:48px 16px; }
            .oc-contact-container { grid-template-columns:1fr;gap:20px; }
            .oc-contact-title { font-size:28px; }
            .oc-faq-section { padding:60px 20px; }
            .oc-faq-heading { font-size:26px; }
            .oc-faq-question { padding:18px 18px 18px 52px; }
            .oc-faq-question span { font-size:14px; }
            .oc-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .oc-faq-q-badge { left:14px; }
            .oc-related-section { padding:60px 20px; }
            .oc-related-tags { gap:8px; }
            .oc-rtag { padding:9px 16px;font-size:13px; }
            .oc-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .oc-testi-grid { grid-template-columns:1fr; }
            .oc-portfolio-grid { grid-template-columns:1fr; }
            .oc-section-title,.oc-engage-title,.oc-process-main-title,.oc-related-title { font-size:30px; }
            .oc-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .oc-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(6,182,212,0.12); }
            .oc-tstat:nth-child(odd) { border-right:1px solid rgba(6,182,212,0.12); }
            .oc-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .oc-tstat-divider { display:none; }
            .oc-form-row { grid-template-columns:1fr; }
            .oc-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .oc-stat-number { font-size:28px; }
          }
          @media (max-width:480px) {
            .oc-hero-content h1 { font-size:24px; }
            .oc-section-title,.oc-engage-title,.oc-process-main-title,.oc-related-title { font-size:26px; }
            .oc-services-grid { grid-template-columns:1fr; }
            .oc-service-card { padding:20px 18px 18px; }
            .oc-card-num { font-size:52px; }
            .oc-process-main-title { font-size:24px; }
            .oc-pstep-title { font-size:18px; }
            .oc-portfolio-title { font-size:22px; }
            .oc-contact-title { font-size:24px; }
            .oc-engage-title { font-size:26px; }
            .oc-tcard { padding:24px 20px; }
            .oc-ecard { padding:20px; }
            .oc-ecard-features { grid-template-columns:1fr; }
            .oc-merged-box { padding:18px; }
          }
        `}</style>
      </Head>

      <div className="oc-page">
        <div className="oc-orb-1" />
        <div className="oc-orb-2" />
        <div className="oc-orb-3" />

        {/* ── HERO ── */}
        <div className="oc-hero-block">
          <div className="oc-hero-content">
            <span className="oc-eyebrow">Expert OpenCart Development Company</span>
            <h1>OpenCart Development Services — Fast, Affordable, and Built to Sell</h1>
            <p>Build powerful, lightweight, and SEO-optimised OpenCart stores with 1Solutions' expert development team. From custom themes and bespoke extensions to platform migrations and multi-store setups — we deliver OpenCart solutions that drive real results for businesses across the US, Canada, and Australia.</p>
            <Link href="#contact" className="oc-btn-hero oc-btn-hero-shimmer">Get a Free OpenCart Consultation</Link>
          </div>

          <div className="oc-hero-stats" ref={statsRef}>
            {[['OpenCart Stores Built','100+'],['E-Commerce Experts','50+'],['Projects Delivered','1,200+'],['Years in Business','15+']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="oc-clients-bar">
            <span className="oc-clients-label">Trusted by Leading Brands</span>
            <div className="oc-clients-logos">
              <div className="oc-logos-track">
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
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="oc-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="oc-services-section">
          <div className="oc-services-inner">
            <div className={`oc-section-reveal${visibleSections.has('services') ? ' oc-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="oc-section-eyebrow">Our Services</span>
              <h2 className="oc-section-title">OpenCart Development Services We Offer</h2>
              <p className="oc-section-desc">From new OpenCart stores to multi-store setups, custom module development, version upgrades, and platform migrations — our experts deliver end-to-end OpenCart solutions built for speed, reliability, and sales growth.</p>
            </div>
            <div className="oc-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`oc-service-card${s.featured?' featured':''}`}>
                  <span className="oc-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="oc-services-footer">
              <button className="oc-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show More OpenCart Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="oc-portfolio-section" id="portfolio">
          <div className="oc-portfolio-wrap">
            <div className="oc-portfolio-header">
              <h2 className={`oc-portfolio-title oc-section-reveal${visibleSections.has('portfolio') ? ' oc-revealed' : ''}`} ref={el => { sectionRefs.current['portfolio'] = el; }}>100+ OpenCart Stores<br/>Designed &amp; Developed</h2>
              <Link href="#contact" className="oc-btn-portfolio-cta">Browse Our Portfolio</Link>
            </div>
            <div className="oc-portfolio-grid">
              {[
                { img:'https://placehold.co/800x500/0e7490/ffffff?text=SportZone+Equipment', name:'SportZone Equipment', tech:'Sports & Outdoors / OpenCart 3, Custom Theme, Stripe', cats:'B2C / Product Variants / Multi-currency / Wishlist' },
                { img:'https://placehold.co/800x500/0891b2/ffffff?text=PrintPro+Wholesale', name:'PrintPro Wholesale', tech:'Print & Stationery / OpenCart 3, WholesaleX Module, PayPal', cats:'B2B / Customer Groups / Bulk Pricing / Quote System' },
                { img:'https://placehold.co/800x500/0d9488/ffffff?text=ElectroMart+Global', name:'ElectroMart Global', tech:'Electronics / OpenCart 4, Custom Extension, FedEx API', cats:'Multi-store / Multi-language / ERP Integration / 5,000+ SKUs' },
              ].map(p => (
                <div className="oc-pcard" key={p.name}>
                  <div className="oc-pcard-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} loading="lazy" />
                  </div>
                  <div className="oc-pcard-body">
                    <h3 className="oc-pcard-name">{p.name}</h3>
                    <div className="oc-pcard-tech">{p.tech}</div>
                    <div className="oc-pcard-cats">{p.cats}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="oc-process-section">
          <div className="oc-process-top">
            <div className={`oc-section-reveal${visibleSections.has('process') ? ' oc-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="oc-process-eyebrow">HOW WE WORK</p>
              <h2 className="oc-process-main-title">How We Build Your OpenCart Store</h2>
              <p className="oc-process-main-desc">Our OpenCart development experts, with 15+ years of experience serving clients across the US, Canada, and Australia, follow a proven process to deliver fast, reliable stores that are easy to manage and built to grow with your business.</p>
            </div>
            <hr className="oc-process-divider" />
          </div>
          <div className="oc-process-inner">
            <div className="oc-process-steps">
              {[
                ['Discover','We start by understanding your product catalogue, business model, target audience, and integration requirements — recommending the right OpenCart version, extension stack, and hosting setup before development begins.'],
                ['Define','We create a detailed project specification — store architecture, theme design, custom module requirements, payment and shipping setup, and data migration plan — agreed and signed off before a single line of code is written.'],
                ['Develop','Our OpenCart developers build your custom theme and modules, configure extensions, integrate payment gateways and shipping carriers, and optimise for speed and SEO — with staging environment access and regular progress updates.'],
                ['Deploy','We run thorough QA testing across devices and browsers, conduct a performance audit, and manage a controlled go-live — then provide post-launch support, documentation, and a handover training session.'],
              ].map(([title, desc], i) => (
                <div
                  className={`oc-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="oc-pstep-left">
                    <div className="oc-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="oc-pstep-arrow" />}
                  </div>
                  <div className="oc-pstep-content">
                    <h3 className="oc-pstep-title">{title}</h3>
                    <p className="oc-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="oc-process-image-col">
              <div className="oc-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/office.png" alt="1Solutions OpenCart development team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="oc-testi-section">
          <div className="oc-testi-inner">
            <div className={`oc-section-header-center oc-section-reveal${visibleSections.has('testi') ? ' oc-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="oc-section-eyebrow">Client Reviews</span>
              <h2 className="oc-section-title">What Our OpenCart Clients Say</h2>
              <p className="oc-section-sub">Trusted by e-commerce businesses across the US, Canada, Australia, and beyond for 15+ years.</p>
            </div>
            <div className="oc-testi-grid" ref={testiGridRef}>
              {[
                { initials:'PF', bg:'#0e7490', text:'"1Solutions built our OpenCart multi-store setup — three regional storefronts, different currencies, and a shared inventory system — all from one admin panel. Delivered on time and exactly to spec. Brilliant work."', name:'Peter Forsyth', role:'E-Commerce Manager, SportZone — Australia', featured:false },
                { initials:'LC', bg:'#0891b2', text:'"We upgraded from OpenCart 2.x to OpenCart 4 with a full theme rebuild and zero downtime. They migrated every product, order, and customer record without a single issue. Communication was excellent throughout."', name:'Linda Chen', role:'Founder, PrintPro Wholesale — USA', featured:true },
                { initials:'MO', bg:'#0d9488', text:'"The custom OpenCart extension they built for our B2B customer group pricing saves us hours every week. Exactly what we needed — no bloat, no unnecessary features. They understood the brief perfectly."', name:'Marcus O\'Brien', role:'Operations Director, ElectroMart — Canada', featured:false },
              ].map((t,i) => (
                <div className={`oc-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' oc-tcard-visible':''}`} key={t.name}>
                  <div className="oc-tcard-stars">★★★★★</div>
                  <p className="oc-tcard-text">{t.text}</p>
                  <div className="oc-tcard-author">
                    <div className="oc-tcard-avatar" style={{ background:t.bg }}>{t.initials}</div>
                    <div>
                      <div className="oc-tcard-name">{t.name}</div>
                      <div className="oc-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="oc-testi-stats">
              {[['4.9/5','Average Rating'],['200+','Verified Reviews'],['98%','Client Satisfaction'],['85%','Repeat Clients']].map(([num,label],i,arr) => (
                <>
                  <div className="oc-tstat" key={label}>
                    <span className="oc-tstat-num">{num}</span>
                    <span className="oc-tstat-label">{label}</span>
                  </div>
                  {i < arr.length-1 && <div className="oc-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="oc-why-section">
          <div className="oc-why-inner">
            <div className={`oc-section-reveal${visibleSections.has('why') ? ' oc-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center',marginBottom:0 }}>
              <span className="oc-section-eyebrow">Why 1Solutions</span>
              <h2 className="oc-section-title">Why Businesses Choose Us for OpenCart Development</h2>
              <p className="oc-section-sub" style={{ maxWidth:680,margin:'0 auto' }}>We don't just build OpenCart stores — we build online revenue channels. Here's what sets us apart from freelancers and generic e-commerce agencies.</p>
            </div>
            <div className="oc-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`oc-why-card${visibleWhyCards.includes(i) ? ' oc-card-visible' : ''}`} key={w.title}>
                  <div className="oc-why-card-header">
                    <div className="oc-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="oc-engage-section">
          <div className="oc-engage-inner">
            <div className="oc-engage-left">
              <div className={`oc-section-reveal${visibleSections.has('engage') ? ' oc-revealed' : ''}`} ref={el => { sectionRefs.current['engage'] = el; }}>
                <span className="oc-section-eyebrow">Engagement Models</span>
                <h2 className="oc-engage-title">Flexible Engagement Models Built Around You</h2>
                <p className="oc-engage-desc">Whether you need a new OpenCart store, a version upgrade, an ongoing development partner, or a dedicated extension builder — we offer engagement models that match your project, timeline, and budget.</p>
              </div>
              <div className="oc-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Partner-with-us.jpg" alt="Partner With 1Solutions" />
              </div>
            </div>
            <div className="oc-engage-right" ref={eCardsRef}>
              {[
                { title:'Dedicated Team', desc:'Hire a full-time dedicated OpenCart development team for long-term or ongoing projects. Certified developers and a project manager work exclusively on your store.', features:['Dedicated Developers','Project Manager Included','Weekly Progress Reports','Scalable on Demand'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { title:'Fixed-Price Project', desc:'For well-defined OpenCart builds, upgrades, or migrations with a clear scope. Agree on deliverables, timeline, and cost upfront — no surprises, no hidden fees.', features:['Full Budget Certainty','Defined Deliverables','No Hidden Costs','On-time Launch'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                { title:'Time & Material', desc:'For evolving projects where scope changes. Pay only for hours worked with full sprint-level visibility into what\'s being built and how budget is being spent.', features:['Maximum Flexibility','No Scope Lock-in','Iterative Delivery','Transparent Billing'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                { title:'Maintenance Retainer', desc:'Ongoing monthly retainer for security updates, OpenCart version patches, performance monitoring, bug fixes, and new feature development for your live store.', features:['Security Patching','Performance Monitoring','Monthly Dev Hours','Priority Support'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
              ].map((e,i) => (
                <div className={`oc-ecard${visibleECards.includes(i)?' oc-ecard-visible':''}`} key={e.title}>
                  <div className="oc-ecard-header">
                    <div className="oc-ecard-icon">{e.icon}</div>
                    <h3 className="oc-ecard-title">{e.title}</h3>
                  </div>
                  <p className="oc-ecard-desc">{e.desc}</p>
                  <div className="oc-ecard-features">
                    {e.features.map(f => (
                      <div className="oc-efeat" key={f}><span className="oc-efeat-check">✔</span>{f}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="oc-contact-section" id="contact">
          <div className="oc-contact-container">
            <div className="oc-contact-left">
              <h2 className="oc-contact-title">Let's Build Your OpenCart Store Together</h2>
              <p className="oc-contact-desc">Tell us about your project and we'll respond within 24 hours with a tailored OpenCart development plan.</p>
              <div className="oc-merged-box">
                <div>
                  {[
                    { icon:<svg className="oc-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'Your project details are confidential. We respect your privacy.' },
                    { icon:<svg className="oc-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'An experienced OpenCart developer reviews your requirements — not automated responses.' },
                    { icon:<svg className="oc-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Quick response within 24 business hours.' },
                    { icon:<svg className="oc-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:"No obligation to proceed. Let's just talk." },
                  ].map((b,i) => (
                    <div className="oc-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="oc-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="oc-stats-box">
                  <div className="oc-stats-grid">
                    {[['100+','OpenCart Stores'],['16+','Years Experience'],['97%','Client Retention']].map(([num,text]) => (
                      <div key={text}>
                        <div className="oc-stat-number">{num}</div>
                        <div className="oc-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="oc-contact-right">
              <div className="oc-form-box">
                <h3>Contact Us</h3>
                <form className="oc-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="oc-form-row">
                    <div className="oc-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="oc-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="oc-form-row">
                    <div className="oc-form-group">
                      <label>Phone Number*</label>
                      <div className="oc-phone-input">
                        <select>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="oc-form-group"><label>Organization*</label><input type="text" placeholder="Organization / Store Name*" required /></div>
                  </div>
                  <div className="oc-form-group full"><label>Message*</label><textarea placeholder="Tell us about your OpenCart project..." rows={6} required /></div>
                  <div className="oc-consent">
                    <input type="checkbox" id="oc-consent" required />
                    <label htmlFor="oc-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="oc-submit-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="oc-faq-section" id="faq">
          <div className="oc-faq-inner">
            <h2 className="oc-faq-heading">Frequently Asked Questions</h2>
            <div className="oc-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`oc-faq-item${openFaq===i?' open':''}`} key={i}>
                  <button className="oc-faq-question" onClick={() => setOpenFaq(openFaq===i ? -1 : i)}>
                    <div className="oc-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="oc-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="oc-faq-answer-wrap">
                    <div className="oc-faq-answer"><span className="oc-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="oc-related-section">
          <div className="oc-related-inner">
            <span className="oc-related-eyebrow">OPENCART RELATED OFFERINGS</span>
            <h2 className="oc-related-title">Explore Related Services &amp; Technologies</h2>
            <p className="oc-related-sub">Pair our OpenCart expertise with related services to build a complete, high-performing e-commerce ecosystem for your business.</p>
            <hr className="oc-related-divider" />
            <div className="oc-related-tags">
              {[
                ['OpenCart Extension Development','cyan'],['OpenCart Theme Development','teal'],['OpenCart Multi-Store Setup','sky'],
                ['E-Commerce SEO Services','amber'],['OpenCart Speed Optimization','orange'],['Payment Gateway Integration','blue'],
                ['OpenCart to WooCommerce Migration','violet'],['WooCommerce Development','indigo'],['Shopify Store Development','green'],
                ['Magento Development','rose'],['UI/UX Design for E-Commerce','cyan'],['Digital Marketing Services','slate'],
                ['WordPress Development Services','teal'],['ERP & CRM Integration','blue'],['OpenCart Maintenance & Support','emerald'],
              ].map(([label,color]) => (
                <Link href="#contact" className={`oc-rtag oc-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
