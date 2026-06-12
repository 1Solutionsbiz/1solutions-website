'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Custom WooCommerce Store Development', desc:'Fully bespoke WooCommerce stores built from scratch — tailored to your brand, product catalogue, and conversion goals.', featured:false },
  { n:'02', title:'WooCommerce Theme Development', desc:'Pixel-perfect, high-performance WooCommerce themes crafted for your brand with seamless product browsing and checkout UX.', featured:true },
  { n:'03', title:'WooCommerce Plugin Development', desc:'Custom WooCommerce plugins and extensions built to add precisely the functionality your store needs — beyond what off-the-shelf plugins offer.', featured:false },
  { n:'04', title:'Payment Gateway Integration', desc:'Integrate Stripe, PayPal, Afterpay, Klarna, Razorpay, Square, and 50+ payment gateways for a seamless global checkout experience.', featured:false },
  { n:'05', title:'WooCommerce Migration', desc:'Seamless migration from Shopify, Magento, BigCommerce, PrestaShop, or any platform to WooCommerce with zero data loss and full SEO preservation.', featured:false },
  { n:'06', title:'WooCommerce SEO Optimization', desc:'Technical SEO, schema markup, Core Web Vitals optimisation, and product page SEO to rank your WooCommerce store and drive organic traffic.', featured:false },
  { n:'07', title:'WooCommerce Speed Optimization', desc:'Audit and optimise your store\'s performance — faster page loads, 90+ PageSpeed scores, lower bounce rates, and higher conversion rates.', featured:false },
  { n:'08', title:'Multi-Currency & WPML Integration', desc:'Expand globally with multi-currency checkout, currency switchers, and WPML multilingual support for international markets.', featured:false },
  { n:'09', title:'Subscriptions & Memberships', desc:'Build recurring revenue with WooCommerce Subscriptions, WooCommerce Memberships, and custom subscription management for your products or services.', featured:false },
  { n:'10', title:'Third-Party API & ERP Integration', desc:'Connect your WooCommerce store with CRMs, ERPs, inventory systems, shipping providers, and marketing platforms via REST API.', featured:false },
  { n:'11', title:'WooCommerce Maintenance & Support', desc:'Ongoing maintenance, security updates, performance monitoring, bug fixes, and priority support so your store never misses a sale.', featured:false },
  { n:'12', title:'WooCommerce B2B Store Development', desc:'Build powerful B2B wholesale portals with role-based pricing, bulk ordering, quote systems, and custom approval workflows on WooCommerce.', featured:false },
];

const FAQS = [
  { q:'How much does WooCommerce store development cost?', a:'A custom WooCommerce store typically starts from $2,000 for a standard branded store and ranges up to $20,000+ for complex builds with custom plugins, B2B portals, ERP integrations, and multi-language support. The cost depends on design complexity, number of products, required plugins, and integrations. We provide a detailed fixed-price quote after a free discovery call — no hidden costs, no surprises.' },
  { q:'How long does it take to build a WooCommerce store?', a:'A standard WooCommerce store with a custom theme typically takes 3–6 weeks from kick-off to launch. Complex builds with custom plugins, multi-currency support, or ERP integrations can take 8–16 weeks. We share a detailed timeline in the proposal and provide weekly progress updates throughout, following our structured 4D process.' },
  { q:'Can you migrate my Shopify or Magento store to WooCommerce?', a:'Absolutely. We migrate stores from Shopify, Magento, BigCommerce, PrestaShop, OpenCart, and other platforms to WooCommerce. Our migration process preserves all products, customer records, order history, URLs, and SEO rankings. We test thoroughly on a staging environment before going live to ensure zero data loss and minimal downtime.' },
  { q:'Do you build custom WooCommerce plugins?', a:'Yes. We build custom WooCommerce extensions for virtually any requirement — custom product types, unique checkout flows, B2B pricing engines, custom shipping methods, loyalty programmes, ERP sync integrations, and more. All plugins are built to WooCommerce coding standards, fully tested, and documented.' },
  { q:'Is WooCommerce suitable for large product catalogues?', a:'Yes, when properly configured and optimised. We\'ve built WooCommerce stores with 50,000+ SKUs. Key factors include a well-configured hosting environment (WP Engine, Kinsta, or Cloudways), product table optimisations, lazy loading, persistent object caching (Redis), and a CDN. We handle all of this as part of our performance optimisation service.' },
  { q:'What is included in your WooCommerce maintenance plans?', a:'Our WooCommerce maintenance plans include WordPress core, WooCommerce, plugin, and theme updates; daily backups with offsite storage; uptime monitoring; security scanning and malware removal; performance checks; and a set number of content and product update hours per month. Plans start from $99/month. Dedicated development retainers are also available.' },
  { q:'Will my WooCommerce store be optimised for search engines?', a:'Yes — SEO is built into our development process from day one. Every WooCommerce store we deliver includes proper heading structure, Product schema markup, Open Graph tags, breadcrumbs, XML sitemap, robots.txt, canonical tags, and Core Web Vitals optimisation. We also offer ongoing e-commerce SEO services covering content strategy, category page optimisation, and technical audits.' },
  { q:'Do you work with clients in the US, Canada, and Australia remotely?', a:'Yes — 100% of our client work is delivered remotely. We have been working with clients across the US, Canada, and Australia since 2008. We schedule meetings in your time zone, use Slack, Notion, and Loom for transparent collaboration, and provide full project visibility at every stage.' },
  { q:'What makes 1Solutions different from other WooCommerce agencies?', a:'Three things: accountability, specialisation, and market focus. Unlike freelancers, we offer a full team — designer, developer, and project manager. Unlike generic agencies, we specialise in WordPress and WooCommerce, so your project benefits from deep platform expertise. And unlike large offshore firms, every engagement stays personal, with a single dedicated point of contact who understands western market expectations.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V17H7v2h10v-2h-4v-1.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>, title:'15+ Years of Proven Experience', desc:'Since 2008, we\'ve delivered 500+ WordPress and WooCommerce projects. Our depth means fewer surprises, faster delivery, and better results for your e-commerce store.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'US, Canada & Australia Focused', desc:'We understand the market nuances, compliance requirements, and customer expectations of English-speaking western markets — not just generic offshore delivery.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'On-Time, On-Budget Delivery', desc:'Our structured 4D process (Discover → Define → Develop → Deploy) ensures projects are scoped accurately and delivered without cost overruns or scope creep.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'Conversion-First Development', desc:'Every design and development decision is made with revenue in mind — from product page layout to checkout flow, upsells, and abandoned cart recovery.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Custom Plugin Expertise', desc:'Beyond themes — we build bespoke WooCommerce plugins, custom extensions, and ERP integrations that off-the-shelf solutions simply cannot deliver.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Dedicated Point of Contact', desc:'No ticket queues. A dedicated project manager who speaks your language, understands your goals, and keeps you updated throughout.' },
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
  const display = started ? (hasComma ? num.toLocaleString() : num) + suffix : val;
  return (
    <div className="woo-stat-col">
      <div className="woo-stat-label">{label}</div>
      <div className="woo-stat-value">{display}</div>
    </div>
  );
}

export default function WooCommerceDevelopmentCompany() {
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
        <title>WooCommerce Development Company | Expert WooCommerce Development Services | 1Solutions</title>
        <meta name="description" content="1Solutions is a leading WooCommerce development company with 15+ years experience. We build custom WooCommerce stores, plugins, and B2B solutions for US, Canada & Australia." />
        <meta name="keywords" content="woocommerce development company, woocommerce development services, custom woocommerce store, woocommerce plugin development, woocommerce agency" />
        <link rel="canonical" href="https://www.1solutions.biz/woocommerce-development-company/" />
        <meta property="og:title" content="WooCommerce Development Company | 1Solutions" />
        <meta property="og:description" content="Build high-converting, scalable WooCommerce stores with 1Solutions' expert WooCommerce development services for US, Canada & Australia." />
        <meta property="og:url" content="https://www.1solutions.biz/woocommerce-development-company/" />
        <style>{`
          .woo-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #ede9fe 0%, #dbeafe 25%, #fae8ff 50%, #ede9fe 75%, #ddd6fe 100%);
            background-attachment: scroll;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .woo-page *, .woo-page *::before, .woo-page *::after { box-sizing: border-box; }

          /* Orbs */
          .woo-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.28) 0%,rgba(109,40,217,0.10) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .woo-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(217,70,239,0.22) 0%,rgba(168,85,247,0.10) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .woo-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.18) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* Hero */
          .woo-hero-block { background:transparent;position:relative;overflow:hidden; }
          .woo-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .woo-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(217,70,239,0.12) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .woo-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .woo-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .woo-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#5b21b6 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .woo-hero-content p { font-size:16px;color:#3A507A;line-height:1.65;max-width:620px;margin:0 auto 28px; }
          .woo-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#5b21b6;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(91,33,182,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .woo-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);box-shadow:0 12px 36px rgba(91,33,182,0.15),0 0 0 2px rgba(245,158,11,0.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#5b21b6; }

          /* Stats */
          .woo-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(91,33,182,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .woo-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(91,33,182,0.10); }
          .woo-stat-col:last-child { border-right:none; }
          .woo-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .woo-stat-value { font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1; }

          /* Clients */
          .woo-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .woo-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .woo-clients-logos { width:100%;overflow:hidden; }
          .woo-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .woo-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Sections shared */
          .woo-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .woo-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#5b21b6 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .woo-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .woo-section-sub { font-size:16px;color:#4A6080;margin:0; }

          /* Services */
          .woo-services-section { background:#faf5ff;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(91,33,182,0.10),0 -4px 16px rgba(91,33,182,0.06); }
          .woo-services-inner { max-width:1280px;margin:0 auto; }
          .woo-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .woo-service-card { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(250,232,255,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(91,33,182,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .woo-service-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(91,33,182,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .woo-service-card.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(237,233,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .woo-service-card:hover .woo-card-num { color:#D97706;opacity:0.12; }
          .woo-service-card:hover h3 { color:#D97706; }
          .woo-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#5b21b6;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .woo-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .woo-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .woo-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#D97706,#f59e0b);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .woo-service-card:hover::before { transform:scaleY(1); }
          .woo-services-footer { text-align:center;margin-top:20px; }
          .woo-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(91,33,182,0.20);color:#5b21b6;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(91,33,182,0.08);font-family:inherit; }
          .woo-btn-show-more:hover { background:#5b21b6;border-color:#5b21b6;color:#ffffff;box-shadow:0 8px 28px rgba(91,33,182,0.20);transform:translateY(-2px); }

          /* Portfolio */
          .woo-portfolio-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .woo-portfolio-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(91,33,182,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .woo-portfolio-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;gap:24px; }
          .woo-portfolio-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#5b21b6 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0; }
          .woo-btn-portfolio-cta { display:inline-block;padding:13px 26px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#5b21b6;font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap;transition:all 0.3s;box-shadow:0 4px 20px rgba(91,33,182,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .woo-btn-portfolio-cta:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);color:#5b21b6; }
          .woo-portfolio-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .woo-pcard { display:flex;flex-direction:column;background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(91,33,182,0.12);border-radius:12px;overflow:hidden;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .woo-pcard:hover { transform:translateY(-4px);border-color:rgba(217,119,6,0.5);box-shadow:0 12px 40px rgba(0,0,0,0.12); }
          .woo-pcard-thumb { width:100%;aspect-ratio:16/10;overflow:hidden;background:#eee; }
          .woo-pcard-thumb img { width:100%;height:100%;object-fit:cover;display:block; }
          .woo-pcard-body { padding:18px 20px 20px;flex:1; }
          .woo-pcard-name { font-size:18px;font-weight:800;color:#5b21b6;margin:0 0 5px; }
          .woo-pcard-tech { font-size:13px;color:#4A6080;margin-bottom:5px;line-height:1.4; }
          .woo-pcard-cats { font-size:13px;font-weight:700;color:#D97706; }

          /* Process */
          .woo-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .woo-process-top { max-width:1280px;margin:0 auto 56px; }
          .woo-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .woo-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#5b21b6 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .woo-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .woo-process-divider { border:none;border-top:1px solid rgba(91,33,182,0.15);margin:36px 0 0;width:100%; }
          .woo-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .woo-process-steps { display:flex;flex-direction:column; }
          .woo-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .woo-pstep.visible { opacity:1;transform:translateY(0); }
          .woo-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .woo-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(91,33,182,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#5b21b6;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .woo-pstep:hover .woo-pstep-circle { background:rgba(245,158,11,0.2);border-color:#D97706;color:#D97706; }
          .woo-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .woo-pstep-arrow::before { content:'';width:2px;flex:1;background:#5b21b6;opacity:0.25; }
          .woo-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #5b21b6;opacity:0.45;margin-top:-1px; }
          .woo-pstep:last-child .woo-pstep-arrow { display:none; }
          .woo-pstep-content { padding:4px 0 44px; }
          .woo-pstep:last-child .woo-pstep-content { padding-bottom:0; }
          .woo-pstep-title { font-size:22px;font-weight:700;color:#5b21b6;margin:0 0 10px;line-height:1.2; }
          .woo-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .woo-process-image-col { position:sticky;top:100px;min-width:0; }
          .woo-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(91,33,182,0.15);aspect-ratio:4/5;background:#f3e8ff; }
          .woo-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Testimonials */
          .woo-testi-section { background:#faf5ff;border-top:1px solid rgba(91,33,182,0.08);border-bottom:1px solid rgba(91,33,182,0.08);padding:80px 40px;position:relative;z-index:1; }
          .woo-testi-inner { max-width:1280px;margin:0 auto; }
          .woo-section-header-center { text-align:center;margin-bottom:52px; }
          .woo-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .woo-tcard { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(250,232,255,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(91,33,182,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .woo-tcard.woo-tcard-visible { opacity:1;transform:translateY(0); }
          .woo-tcard:hover { transform:translateY(-6px)!important;border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(91,33,182,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .woo-tcard.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(237,233,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .woo-tcard-stars { font-size:18px;color:#D97706;letter-spacing:2px; }
          .woo-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .woo-tcard.featured .woo-tcard-text { color:#1f2937; }
          .woo-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .woo-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .woo-tcard-name { font-size:14px;font-weight:700;color:#5b21b6; }
          .woo-tcard-role { font-size:12px;color:#6b7280; }
          .woo-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(237,233,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(250,232,255,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(91,33,182,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .woo-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .woo-tstat-num { font-size:28px;font-weight:800;color:#5b21b6; }
          .woo-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .woo-tstat-divider { width:1px;height:40px;background:rgba(91,33,182,0.15); }

          /* Why */
          .woo-why-section { padding:80px 40px;background:#faf5ff;border-top:1px solid rgba(91,33,182,0.08);border-bottom:1px solid rgba(91,33,182,0.08);position:relative;z-index:1; }
          .woo-why-inner { max-width:1280px;margin:0 auto; }
          .woo-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .woo-why-card { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(250,232,255,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(91,33,182,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s; }
          .woo-why-card.woo-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .woo-why-card:hover { transform:translateY(-6px) scale(1)!important;border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(91,33,182,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .woo-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .woo-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .woo-why-icon svg { width:28px;height:28px;fill:#D97706; }
          .woo-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .woo-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* Engagement */
          .woo-engage-section { background:#faf5ff;border-top:1px solid rgba(91,33,182,0.08);border-bottom:1px solid rgba(91,33,182,0.08);padding:80px 40px;position:relative;z-index:1; }
          .woo-engage-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch; }
          .woo-engage-left { position:sticky;top:100px;display:flex;flex-direction:column; }
          .woo-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#5b21b6 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .woo-engage-desc { font-size:15px;color:#3A507A;line-height:1.75;margin:0 0 32px; }
          .woo-engage-img-wrap { border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(91,33,182,0.12);flex:1;min-height:300px; }
          .woo-engage-img-wrap img { width:100%;height:100%;min-height:300px;object-fit:cover;display:block; }
          .woo-engage-right { display:flex;flex-direction:column;gap:16px; }
          .woo-ecard { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(250,232,255,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(91,33,182,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.3s,box-shadow 0.3s; }
          .woo-ecard.woo-ecard-visible { opacity:1;transform:translateX(0); }
          .woo-ecard:hover { border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(91,33,182,0.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateX(4px); }
          .woo-ecard-header { display:flex;align-items:center;gap:14px;margin-bottom:10px; }
          .woo-ecard-icon { width:44px;height:44px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .woo-ecard-icon svg { width:26px;height:26px;stroke:#D97706;fill:none; }
          .woo-ecard-title { font-size:18px;font-weight:700;color:#5b21b6;margin:0; }
          .woo-ecard-desc { font-size:14px;color:#3A507A;line-height:1.65;margin:0 0 16px; }
          .woo-ecard-features { display:grid;grid-template-columns:1fr 1fr;gap:8px 16px; }
          .woo-efeat { display:flex;align-items:center;gap:8px;font-size:13px;color:#2A3F6F;font-weight:500; }
          .woo-efeat-check { color:#D97706;font-size:12px;flex-shrink:0; }

          /* Contact */
          .woo-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(237,233,254,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(250,232,255,0.65) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .woo-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .woo-contact-left { padding:0;align-self:start; }
          .woo-contact-right { align-self:start; }
          .woo-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#5b21b6 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .woo-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .woo-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .woo-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .woo-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .woo-benefit-icon { width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75; }
          .woo-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .woo-stats-box { padding-top:32px;border-top:1px solid rgba(91,33,182,0.12); }
          .woo-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .woo-stat-number { font-size:40px;font-weight:900;color:#5b21b6;line-height:1;display:inline-block;margin-bottom:4px; }
          .woo-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .woo-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(91,33,182,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .woo-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .woo-contact-form { display:flex;flex-direction:column;gap:16px; }
          .woo-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .woo-form-group { display:flex;flex-direction:column;gap:6px; }
          .woo-form-group.full { grid-column:1/-1; }
          .woo-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .woo-form-group input,.woo-form-group textarea,.woo-form-group select { padding:10px 14px;border:1px solid rgba(91,33,182,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(91,33,182,0.06);transition:border-color 0.2s,background 0.2s; }
          .woo-form-group input:focus,.woo-form-group textarea:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12); }
          .woo-phone-input { display:flex;border:1px solid rgba(91,33,182,0.15);border-radius:6px;overflow:hidden; }
          .woo-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .woo-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .woo-phone-input input:focus { outline:none; }
          .woo-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .woo-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .woo-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .woo-consent a { color:#5b21b6;text-decoration:none; }
          .woo-submit-btn { padding:14px 28px;background:rgba(91,33,182,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(91,33,182,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .woo-submit-btn:hover { background:rgba(91,33,182,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }

          /* FAQ */
          .woo-faq-section { padding:80px 40px;background:#faf5ff;border-top:1px solid rgba(91,33,182,0.08);position:relative;z-index:1; }
          .woo-faq-inner { max-width:1280px;margin:0 auto; }
          .woo-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#5b21b6 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .woo-faq-list { display:flex;flex-direction:column;gap:12px; }
          .woo-faq-item { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(250,232,255,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(91,33,182,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .woo-faq-item.open { border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(91,33,182,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .woo-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .woo-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .woo-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(91,33,182,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .woo-faq-item.open .woo-faq-q-badge { background:#D97706;color:#fff; }
          .woo-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .woo-faq-item.open .woo-faq-question span { color:#D97706; }
          .woo-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .woo-faq-item.open .woo-faq-chevron { transform:rotate(180deg);color:#D97706; }
          .woo-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .woo-faq-item.open .woo-faq-answer-wrap { max-height:500px; }
          .woo-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .woo-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#5b21b6;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Related */
          .woo-related-section { background:rgba(237,233,254,0.20);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .woo-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .woo-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .woo-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#5b21b6 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .woo-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .woo-related-divider { border:none;border-top:1px solid rgba(91,33,182,0.12);margin:40px 0; }
          .woo-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .woo-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .woo-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .woo-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .woo-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .woo-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .woo-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .woo-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .woo-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .woo-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .woo-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .woo-rtag-cyan    { background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490; }
          .woo-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }
          .woo-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }
          .woo-rtag-fuchsia { background:rgba(217,70,239,0.10);border-color:rgba(217,70,239,0.28);color:#86198F; }
          .woo-rtag-slate   { background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155; }

          /* Shimmer */
          .woo-btn-hero-shimmer { position:relative;overflow:hidden; }
          .woo-btn-hero-shimmer::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:woo-shimmer-sweep 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes woo-shimmer-sweep { 0%{left:-120%} 35%,100%{left:160%} }

          /* Section reveal */
          .woo-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .woo-section-reveal.woo-revealed { opacity:1;transform:translateY(0); }

          /* Logo marquee */
          .woo-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:woo-marquee 28s linear infinite; }
          .woo-logos-track:hover { animation-play-state:paused; }
          @keyframes woo-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

          /* Responsive */
          @media (max-width:1024px) {
            .woo-hero-content h1 { font-size:40px; }
            .woo-services-grid { grid-template-columns:repeat(2,1fr); }
            .woo-why-grid { grid-template-columns:repeat(2,1fr); }
            .woo-portfolio-grid { grid-template-columns:repeat(2,1fr); }
            .woo-portfolio-wrap { padding:32px 28px 40px; }
            .woo-engage-inner { grid-template-columns:1fr; }
            .woo-engage-left { position:static; }
            .woo-process-inner { grid-template-columns:1fr; }
            .woo-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .woo-page { overflow-x:hidden; }
            .woo-hero-content { padding:36px 20px 24px; }
            .woo-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .woo-hero-content p { font-size:15px; }
            .woo-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .woo-stat-col { padding:14px 12px; }
            .woo-stat-col:nth-child(2) { border-right:none; }
            .woo-stat-col:nth-child(3) { border-top:1px solid rgba(91,33,182,0.10); }
            .woo-stat-col:nth-child(4) { border-top:1px solid rgba(91,33,182,0.10);border-right:none; }
            .woo-stat-value { font-size:22px; }
            .woo-clients-bar { padding:16px 20px 36px;gap:12px; }
            .woo-client-logo { height:20px; }
            .woo-services-section { padding:48px 20px 40px; }
            .woo-portfolio-section { padding:48px 16px; }
            .woo-portfolio-wrap { padding:24px 20px 32px;border-radius:16px; }
            .woo-portfolio-header { flex-direction:column;align-items:flex-start;gap:14px; }
            .woo-portfolio-title { font-size:26px; }
            .woo-process-section { padding:60px 20px; }
            .woo-process-top { margin-bottom:36px; }
            .woo-testi-section { padding:60px 20px; }
            .woo-testi-section .woo-section-header-center { text-align:left; }
            .woo-why-section { padding:60px 20px; }
            .woo-why-section .woo-section-header-center { text-align:left; }
            .woo-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .woo-why-card { padding:24px 20px; }
            .woo-engage-section { padding:60px 20px; }
            .woo-contact-section { padding:48px 16px; }
            .woo-contact-container { grid-template-columns:1fr;gap:20px; }
            .woo-contact-title { font-size:28px; }
            .woo-faq-section { padding:60px 20px; }
            .woo-faq-heading { font-size:26px; }
            .woo-faq-question { padding:18px 18px 18px 52px; }
            .woo-faq-question span { font-size:14px; }
            .woo-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .woo-faq-q-badge { left:14px; }
            .woo-related-section { padding:60px 20px; }
            .woo-related-tags { gap:8px; }
            .woo-rtag { padding:9px 16px;font-size:13px; }
            .woo-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .woo-testi-grid { grid-template-columns:1fr; }
            .woo-portfolio-grid { grid-template-columns:1fr; }
            .woo-section-title,.woo-engage-title,.woo-process-main-title,.woo-related-title { font-size:30px; }
            .woo-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .woo-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(91,33,182,0.10); }
            .woo-tstat:nth-child(odd) { border-right:1px solid rgba(91,33,182,0.10); }
            .woo-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .woo-tstat-divider { display:none; }
            .woo-form-row { grid-template-columns:1fr; }
            .woo-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .woo-stat-number { font-size:28px; }
          }
          @media (max-width:480px) {
            .woo-hero-content h1 { font-size:24px; }
            .woo-section-title,.woo-engage-title,.woo-process-main-title,.woo-related-title { font-size:26px; }
            .woo-services-grid { grid-template-columns:1fr; }
            .woo-service-card { padding:20px 18px 18px; }
            .woo-card-num { font-size:52px; }
            .woo-process-main-title { font-size:24px; }
            .woo-pstep-title { font-size:18px; }
            .woo-portfolio-title { font-size:22px; }
            .woo-contact-title { font-size:24px; }
            .woo-engage-title { font-size:26px; }
            .woo-tcard { padding:24px 20px; }
            .woo-ecard { padding:20px; }
            .woo-ecard-features { grid-template-columns:1fr; }
            .woo-merged-box { padding:18px; }
          }
        `}</style>
      </Head>

      <div className="woo-page">
        <div className="woo-orb-1" />
        <div className="woo-orb-2" />
        <div className="woo-orb-3" />

        {/* ── HERO ── */}
        <div className="woo-hero-block">
          <div className="woo-hero-content">
            <span className="woo-eyebrow">Expert WooCommerce Development Company</span>
            <h1>WooCommerce Development Services — Build a Scalable, High-Converting Online Store</h1>
            <p>Build powerful, SEO-optimised WooCommerce stores with 1Solutions' expert development services. From custom themes and bespoke plugins to B2B portals and platform migrations — we deliver WooCommerce solutions that drive real revenue for businesses across the US, Canada, and Australia.</p>
            <Link href="#contact" className="woo-btn-hero woo-btn-hero-shimmer">Get a Free WooCommerce Consultation</Link>
          </div>

          <div className="woo-hero-stats" ref={statsRef}>
            {[['WooCommerce Stores','300+'],['E-Commerce Experts','50+'],['Projects Delivered','1,200+'],['Years in Business','15+']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="woo-clients-bar">
            <span className="woo-clients-label">Trusted by Leading Brands</span>
            <div className="woo-clients-logos">
              <div className="woo-logos-track">
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
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="woo-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="woo-services-section">
          <div className="woo-services-inner">
            <div className={`woo-section-reveal${visibleSections.has('services') ? ' woo-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="woo-section-eyebrow">Our Services</span>
              <h2 className="woo-section-title">WooCommerce Development Services We Offer</h2>
              <p className="woo-section-desc">From brand-new WooCommerce stores to complex migrations, custom plugin development, and B2B portals — our experts deliver end-to-end e-commerce solutions built for performance, scalability, and conversions.</p>
            </div>
            <div className="woo-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`woo-service-card${s.featured?' featured':''}`}>
                  <span className="woo-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="woo-services-footer">
              <button className="woo-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show More WooCommerce Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="woo-portfolio-section" id="portfolio">
          <div className="woo-portfolio-wrap">
            <div className="woo-portfolio-header">
              <h2 className={`woo-portfolio-title woo-section-reveal${visibleSections.has('portfolio') ? ' woo-revealed' : ''}`} ref={el => { sectionRefs.current['portfolio'] = el; }}>300+ WooCommerce Stores<br/>Designed &amp; Developed</h2>
              <Link href="#contact" className="woo-btn-portfolio-cta">Browse Our Portfolio</Link>
            </div>
            <div className="woo-portfolio-grid">
              {[
                { img:'https://placehold.co/800x500/5b21b6/ffffff?text=StyleHouse+Fashion', name:'StyleHouse Fashion', tech:'Fashion / WordPress, WooCommerce, Custom Theme, Klaviyo', cats:'E-Commerce / B2C / Wishlist / Product Bundles' },
                { img:'https://placehold.co/800x500/D97706/ffffff?text=NutriVital+Wholesale', name:'NutriVital Wholesale', tech:'Health & Nutrition / WooCommerce, B2B Kit, WholesaleX', cats:'B2B Wholesale / Role-Based Pricing / Bulk Orders' },
                { img:'https://placehold.co/800x500/0F3460/ffffff?text=AutoParts+Direct', name:'AutoParts Direct', tech:'Automotive / WooCommerce, Custom Plugin, ShipStation API', cats:'10,000+ SKUs / ERP Sync / Multi-Warehouse' },
              ].map(p => (
                <div className="woo-pcard" key={p.name}>
                  <div className="woo-pcard-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} loading="lazy" />
                  </div>
                  <div className="woo-pcard-body">
                    <h3 className="woo-pcard-name">{p.name}</h3>
                    <div className="woo-pcard-tech">{p.tech}</div>
                    <div className="woo-pcard-cats">{p.cats}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="woo-process-section">
          <div className="woo-process-top">
            <div className={`woo-section-reveal${visibleSections.has('process') ? ' woo-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="woo-process-eyebrow">HOW WE WORK</p>
              <h2 className="woo-process-main-title">How We Build Your WooCommerce Store</h2>
              <p className="woo-process-main-desc">Our WooCommerce development experts, with 15+ years of experience serving clients across the US, Canada, and Australia, follow a structured process to deliver stores that convert visitors into buyers and scale as your business grows.</p>
            </div>
            <hr className="woo-process-divider" />
          </div>
          <div className="woo-process-inner">
            <div className="woo-process-steps">
              {[
                ['Discover','We start by understanding your business model, product catalogue, target audience, and growth objectives — identifying the right WooCommerce setup, plugins, and integrations to power your store.'],
                ['Define','We collaborate with your team to define the store architecture, design direction, feature set, and integration requirements — aligning every decision with your brand identity and revenue goals.'],
                ['Develop','Our certified WordPress and WooCommerce developers build your custom theme, configure plugins, integrate payment gateways and shipping providers, and optimise for speed and SEO — with regular updates throughout.'],
                ['Deploy','We run thorough QA testing, performance audits, and a staged launch — then hand over full training, documentation, and ongoing support to keep your store growing after go-live.'],
              ].map(([title, desc], i) => (
                <div
                  className={`woo-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="woo-pstep-left">
                    <div className="woo-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="woo-pstep-arrow" />}
                  </div>
                  <div className="woo-pstep-content">
                    <h3 className="woo-pstep-title">{title}</h3>
                    <p className="woo-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="woo-process-image-col">
              <div className="woo-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/office.png" alt="1Solutions WooCommerce development team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="woo-testi-section">
          <div className="woo-testi-inner">
            <div className={`woo-section-header-center woo-section-reveal${visibleSections.has('testi') ? ' woo-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="woo-section-eyebrow">Client Reviews</span>
              <h2 className="woo-section-title">What Our WooCommerce Clients Say</h2>
              <p className="woo-section-sub">Trusted by e-commerce brands across the US, Canada, Australia, and beyond for 15+ years.</p>
            </div>
            <div className="woo-testi-grid" ref={testiGridRef}>
              {[
                { initials:'RK', bg:'#5b21b6', text:'"1Solutions built our WooCommerce B2B wholesale portal from scratch — custom pricing engine, bulk order forms, and QuickBooks sync. Saved us 30 hours a week in manual processing. Exceptional work."', name:'Rachel Kim', role:'Operations Director, NutriVital — USA', featured:false },
                { initials:'MP', bg:'#0F3460', text:'"We migrated from Shopify to WooCommerce with zero downtime and no SEO drop. They handled everything — 8,000 products, customer data, redirects, and a completely new custom theme. Flawless."', name:'Mark Patterson', role:'Founder, StyleHouse Fashion — Australia', featured:true },
                { initials:'BT', bg:'#7c3aed', text:'"The custom WooCommerce plugin they built for our variable pricing model works perfectly. We\'ve been working with 1Solutions for 4 years — consistent quality, always on time, always honest."', name:'Brian Thompson', role:'CTO, AutoParts Direct — Canada', featured:false },
              ].map((t,i) => (
                <div className={`woo-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' woo-tcard-visible':''}`} key={t.name}>
                  <div className="woo-tcard-stars">★★★★★</div>
                  <p className="woo-tcard-text">{t.text}</p>
                  <div className="woo-tcard-author">
                    <div className="woo-tcard-avatar" style={{ background:t.bg }}>{t.initials}</div>
                    <div>
                      <div className="woo-tcard-name">{t.name}</div>
                      <div className="woo-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="woo-testi-stats">
              {[['4.9/5','Average Rating'],['200+','Verified Reviews'],['98%','Client Satisfaction'],['85%','Repeat Clients']].map(([num,label],i,arr) => (
                <>
                  <div className="woo-tstat" key={label}>
                    <span className="woo-tstat-num">{num}</span>
                    <span className="woo-tstat-label">{label}</span>
                  </div>
                  {i < arr.length-1 && <div className="woo-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="woo-why-section">
          <div className="woo-why-inner">
            <div className={`woo-section-reveal${visibleSections.has('why') ? ' woo-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center',marginBottom:0 }}>
              <span className="woo-section-eyebrow">Why 1Solutions</span>
              <h2 className="woo-section-title">Why Brands Choose Us for WooCommerce Development</h2>
              <p className="woo-section-sub" style={{ maxWidth:680,margin:'0 auto' }}>We don't just build WooCommerce stores — we build revenue-generating assets. Here's what sets us apart from freelancers and generic e-commerce agencies.</p>
            </div>
            <div className="woo-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`woo-why-card${visibleWhyCards.includes(i) ? ' woo-card-visible' : ''}`} key={w.title}>
                  <div className="woo-why-card-header">
                    <div className="woo-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="woo-engage-section">
          <div className="woo-engage-inner">
            <div className="woo-engage-left">
              <div className={`woo-section-reveal${visibleSections.has('engage') ? ' woo-revealed' : ''}`} ref={el => { sectionRefs.current['engage'] = el; }}>
                <span className="woo-section-eyebrow">Engagement Models</span>
                <h2 className="woo-engage-title">Flexible Engagement Models Built Around You</h2>
                <p className="woo-engage-desc">We offer flexible engagement models so you can choose the approach that best fits your WooCommerce project, timeline, and budget — with full transparency at every step.</p>
              </div>
              <div className="woo-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Partner-with-us.jpg" alt="Partner With 1Solutions" />
              </div>
            </div>
            <div className="woo-engage-right" ref={eCardsRef}>
              {[
                { title:'Dedicated Team', desc:'Hire a full-time dedicated WooCommerce development team for long-term projects. We deploy a project manager and certified developers who work exclusively on your store.', features:['Cost-effective Approach','Less Administrative Overhead','Quick-paced Development','Timely Reporting'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { title:'Fixed-Price Project', desc:'Ideal for well-defined WooCommerce builds with a clear scope. We agree on deliverables, timeline, and cost upfront — no surprises, no hidden fees.', features:['Complete Budget Control','Ease of Management','No Hidden Costs','On-time Delivery'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                { title:'Time & Material', desc:'Perfect for evolving WooCommerce projects where requirements change. Pay only for hours worked with full visibility into progress and spend.', features:['Maximum Flexibility','Reduced Risk','Iterative Development','Transparent Billing'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                { title:'Maintenance Retainer', desc:'Ongoing monthly retainer for continuous WooCommerce improvements, security updates, performance monitoring, and new feature development.', features:['Priority Support','Security Updates','Monthly Reporting','Dedicated Capacity'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
              ].map((e,i) => (
                <div className={`woo-ecard${visibleECards.includes(i)?' woo-ecard-visible':''}`} key={e.title}>
                  <div className="woo-ecard-header">
                    <div className="woo-ecard-icon">{e.icon}</div>
                    <h3 className="woo-ecard-title">{e.title}</h3>
                  </div>
                  <p className="woo-ecard-desc">{e.desc}</p>
                  <div className="woo-ecard-features">
                    {e.features.map(f => (
                      <div className="woo-efeat" key={f}><span className="woo-efeat-check">✔</span>{f}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="woo-contact-section" id="contact">
          <div className="woo-contact-container">
            <div className="woo-contact-left">
              <h2 className="woo-contact-title">Let's Build Your WooCommerce Store Together</h2>
              <p className="woo-contact-desc">Tell us about your project and we'll respond within 24 hours with a tailored WooCommerce development plan.</p>
              <div className="woo-merged-box">
                <div>
                  {[
                    { icon:<svg className="woo-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'Your project details are confidential. We respect your privacy.' },
                    { icon:<svg className="woo-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A certified WooCommerce expert reviews your requirements — not automated responses.' },
                    { icon:<svg className="woo-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Quick response within 24 business hours.' },
                    { icon:<svg className="woo-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:"No obligation to proceed. Let's just talk." },
                  ].map((b,i) => (
                    <div className="woo-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="woo-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="woo-stats-box">
                  <div className="woo-stats-grid">
                    {[['300+','WooCommerce Stores'],['16+','Years Experience'],['97%','Client Retention']].map(([num,text]) => (
                      <div key={text}>
                        <div className="woo-stat-number">{num}</div>
                        <div className="woo-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="woo-contact-right">
              <div className="woo-form-box">
                <h3>Contact Us</h3>
                <form className="woo-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="woo-form-row">
                    <div className="woo-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="woo-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="woo-form-row">
                    <div className="woo-form-group">
                      <label>Phone Number*</label>
                      <div className="woo-phone-input">
                        <select>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="woo-form-group"><label>Organization*</label><input type="text" placeholder="Organization / Store Name*" required /></div>
                  </div>
                  <div className="woo-form-group full"><label>Message*</label><textarea placeholder="Tell us about your WooCommerce project..." rows={6} required /></div>
                  <div className="woo-consent">
                    <input type="checkbox" id="woo-consent" required />
                    <label htmlFor="woo-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="woo-submit-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="woo-faq-section" id="faq">
          <div className="woo-faq-inner">
            <h2 className="woo-faq-heading">Frequently Asked Questions</h2>
            <div className="woo-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`woo-faq-item${openFaq===i?' open':''}`} key={i}>
                  <button className="woo-faq-question" onClick={() => setOpenFaq(openFaq===i ? -1 : i)}>
                    <div className="woo-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="woo-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="woo-faq-answer-wrap">
                    <div className="woo-faq-answer"><span className="woo-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="woo-related-section">
          <div className="woo-related-inner">
            <span className="woo-related-eyebrow">WOOCOMMERCE RELATED OFFERINGS</span>
            <h2 className="woo-related-title">Explore Related Services &amp; Technologies</h2>
            <p className="woo-related-sub">Pair our WooCommerce expertise with related services to build a complete, high-performing e-commerce ecosystem.</p>
            <hr className="woo-related-divider" />
            <div className="woo-related-tags">
              {[
                ['WordPress Development Services','violet'],['WooCommerce Plugin Development','blue'],['WooCommerce Theme Development','indigo'],
                ['E-Commerce SEO Services','amber'],['WooCommerce Speed Optimization','orange'],['Payment Gateway Integration','teal'],
                ['WooCommerce B2B Development','fuchsia'],['Shopify to WooCommerce Migration','rose'],['Shopify Store Development','green'],
                ['Headless WooCommerce','sky'],['UI/UX Design for E-Commerce','cyan'],['Digital Marketing Services','slate'],
                ['Email Marketing & CRM Integration','violet'],['WooCommerce Subscriptions','emerald'],['WordPress Security & Maintenance','blue'],
              ].map(([label,color]) => (
                <Link href="#contact" className={`woo-rtag woo-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
