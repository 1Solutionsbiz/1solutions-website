'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Custom eCommerce Development', desc:'Bespoke online stores built from scratch — designed around your brand, your catalogue, and your customers\' buying journey.', featured:true },
  { n:'02', title:'Shopify & Shopify Plus Development', desc:'High-converting Shopify stores and advanced Shopify Plus builds with custom apps, checkout extensions, and multi-store architecture.', featured:false },
  { n:'03', title:'WooCommerce Development', desc:'Flexible, SEO-friendly WooCommerce stores with custom plugins, payment gateways, and subscription or membership functionality.', featured:false },
  { n:'04', title:'Magento / Adobe Commerce', desc:'Enterprise-grade Magento builds for large catalogues, B2B pricing tiers, multi-store management, and complex fulfilment logic.', featured:false },
  { n:'05', title:'Headless Commerce', desc:'Decouple your storefront from your commerce engine — Next.js or React frontend with Shopify, Medusa, or BigCommerce as the backend.', featured:false },
  { n:'06', title:'B2B eCommerce Portals', desc:'Customer-specific pricing, quote management, bulk ordering, credit terms, and account hierarchies built for wholesale and trade buyers.', featured:false },
  { n:'07', title:'Marketplace Development', desc:'Multi-vendor marketplace platforms with seller onboarding, commission management, product listings, and dispute resolution workflows.', featured:false },
  { n:'08', title:'Payment Gateway Integration', desc:'Stripe, PayPal, Afterpay, Klarna, Razorpay, and 30+ other gateways integrated with full PCI-DSS compliance and fraud protection.', featured:false },
  { n:'09', title:'eCommerce Migration', desc:'Platform-to-platform migrations — Magento to Shopify, WooCommerce to Shopify Plus, BigCommerce to headless — with zero data loss.', featured:false },
  { n:'10', title:'Performance Optimisation', desc:'Core Web Vitals tuning, image optimisation, CDN configuration, and lazy loading that cuts load times and lifts conversion rates.', featured:false },
  { n:'11', title:'ERP & 3PL Integration', desc:'Connect your store to NetSuite, SAP, Xero, ShipBob, ShipStation, and inventory management systems for real-time sync.', featured:false },
  { n:'12', title:'eCommerce SEO & CRO', desc:'Technical SEO, schema markup, A/B testing, and checkout funnel optimisation that turns more browsers into buyers.', featured:false },
];

const FAQS = [
  { q:'How much does a custom eCommerce store cost?', a:'A Shopify or WooCommerce store with custom design starts from $5,000 and ranges to $25,000+ depending on catalogue size, custom functionality, and integrations. Headless commerce builds and enterprise Magento projects start from $30,000. We provide fixed-price proposals after scoping — so you know the exact cost before development begins. No hourly billing, no change-order surprises.' },
  { q:'How long does an eCommerce project take?', a:'A custom Shopify or WooCommerce store typically takes 6–10 weeks. A headless commerce build takes 12–20 weeks. Enterprise Magento or marketplace platforms take 4–9 months. We deliver in 2-week sprints so you see working functionality early and can redirect before costs compound. Full timelines are agreed in the scoping phase before any development starts.' },
  { q:'Which platform should I choose — Shopify, WooCommerce, or headless?', a:'It depends on your scale and requirements. Shopify is the fastest to market and lowest maintenance for most DTC brands. WooCommerce suits content-heavy stores already on WordPress. Headless is right for high-traffic brands needing sub-second performance and full design control. We give you an honest recommendation in a free consultation — not the platform we happen to prefer.' },
  { q:'Can you migrate my existing store to a new platform?', a:'Yes. We migrate stores between all major platforms — Magento to Shopify, WooCommerce to Shopify Plus, BigCommerce to headless. Our migration process preserves product data, customer records, order history, and URL structure. We test on a staging environment before cutover and manage the DNS changeover to minimise downtime.' },
  { q:'Do you work with clients in the US, Canada, and Australia?', a:'Yes — all delivery is remote. We\'ve been partnering with eCommerce brands across the US, Canada, and Australia since 2008. We schedule calls in your time zone, use Slack for async updates, and assign a dedicated project manager throughout the engagement.' },
  { q:'Can you integrate my store with our ERP, 3PL, or inventory system?', a:'Yes. We integrate Shopify, WooCommerce, and Magento with NetSuite, SAP, Xero, DEAR Inventory, Cin7, ShipBob, ShipStation, and most major 3PLs. Custom API integrations are also available for proprietary systems. We build middleware layers where needed to handle data transformation and error recovery.' },
  { q:'What is headless commerce and do I need it?', a:'Headless commerce means your storefront (the frontend your customers see) is decoupled from your commerce engine (cart, checkout, product data). This gives you faster page loads, full design freedom, and the ability to push the same product data to multiple channels. You need it if your store has high traffic (50k+ monthly visitors), complex UX requirements, or sells across multiple storefronts.' },
  { q:'Do you offer ongoing support after launch?', a:'Yes. Every project includes a 30-day post-launch support period. After that, we offer monthly retainers covering bug fixes, Shopify app updates, plugin maintenance, performance monitoring, and feature development. Most clients stay on retainer because ongoing optimisation — CRO, speed improvements, new integrations — consistently grows revenue after launch.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'300+ eCommerce Stores Delivered', desc:'From single-product DTC brands to 100,000-SKU enterprise catalogues — across fashion, health, electronics, and B2B wholesale.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>, title:'Conversion-First Design', desc:'Every design decision is backed by eCommerce CRO research. We build stores that convert — not just stores that look good.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'Fixed Price, On Time', desc:'Detailed scoping before development means you know the exact cost and go-live date before we write a single line of code.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'Multi-Market Experience', desc:'Stores selling in the US, Canada, and Australia with multi-currency, local payment methods, and region-specific tax/shipping.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'PCI-DSS Compliant Builds', desc:'Every payment integration is implemented to PCI-DSS standards — with tokenisation, fraud protection, and 3DS authentication built in.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>, title:'SEO Built Into Every Build', desc:'URL structure, schema markup, Core Web Vitals, and on-page SEO baked into the development process — not an afterthought.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Dedicated Project Team', desc:'PM, designer, frontend and backend developers, and QA — fully allocated to your project, not juggling 20 accounts.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Post-Launch Growth Partnership', desc:'CRO testing, speed optimisation, new feature rollouts, and seasonal campaign support keep your store growing after launch day.' },
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
    <div className="ec-stat-col">
      <div className="ec-stat-label">{label}</div>
      <div className="ec-stat-value">{display}</div>
    </div>
  );
}

export default function EcommerceDevelopmentPage() {
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
        ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i)?p:[...p,i]), i*150); obs.disconnect(); } },
        { threshold: 0.25 }
      );
      obs.observe(el); return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(statsRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!whyGridRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_,i) => setTimeout(() => setVisibleWhyCards(p => p.includes(i)?p:[...p,i]), i*100)); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(whyGridRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!testiGridRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { [0,1,2].forEach(i => setTimeout(() => setVisibleTestiCards(p => p.includes(i)?p:[...p,i]), i*150)); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(testiGridRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!eCardsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { [0,1,2,3].forEach(i => setTimeout(() => setVisibleECards(p => p.includes(i)?p:[...p,i]), i*130)); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(eCardsRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key]; if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisibleSections(p => new Set([...p, key])); obs.disconnect(); } }, { threshold: 0.15 });
      obs.observe(el); return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const visibleServices = showAll ? SERVICES : SERVICES.slice(0, 8);

  return (
    <>
      <Head>
        <title>eCommerce Development Company | Shopify, WooCommerce & Headless Commerce | 1Solutions</title>
        <meta name="description" content="1Solutions builds high-converting eCommerce stores on Shopify, WooCommerce, Magento, and headless commerce stacks. 300+ stores delivered for US, Canada & Australia brands." />
        <meta name="keywords" content="ecommerce development, shopify development, woocommerce development, magento development, headless commerce, online store development" />
        <link rel="canonical" href="https://www.1solutions.biz/ecommerce-development/" />
        <meta property="og:title" content="eCommerce Development Company | 1Solutions" />
        <meta property="og:description" content="300+ eCommerce stores delivered. Shopify, WooCommerce, Magento, and headless commerce for US, Canada & Australia brands." />
        <meta property="og:url" content="https://www.1solutions.biz/ecommerce-development/" />
        <style>{`
          .ec-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#fff7ed 0%,#fef3c7 25%,#fef9c3 55%,#ecfdf5 80%,#eff6ff 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden;overflow-y:clip;}
          .ec-page *,.ec-page *::before,.ec-page *::after{box-sizing:border-box;}
          .ec-orb-1{position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.28) 0%,rgba(245,158,11,0.12) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px);}
          .ec-orb-2{position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.20) 0%,rgba(59,130,246,0.10) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px);}
          .ec-orb-3{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,0.16) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px);}

          .ec-hero-block{background:transparent;position:relative;overflow:hidden;}
          .ec-hero-block::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.14) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px);}
          .ec-hero-block::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.14) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px);}
          .ec-hero-content{position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px;}
          .ec-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#B45309;margin-bottom:18px;}
          .ec-hero-content h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#92400E 0%,#059669 60%,#1D4ED8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .ec-hero-content p{font-size:16px;color:#374151;line-height:1.65;max-width:640px;margin:0 auto 28px;}
          .ec-btn-hero{display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#92400E;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(146,64,14,0.12),inset 0 1px 0 rgba(255,255,255,1);position:relative;overflow:hidden;}
          .ec-btn-hero::after{content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:ec-shimmer 2.5s ease-in-out infinite;pointer-events:none;}
          @keyframes ec-shimmer{0%{left:-120%;}35%,100%{left:160%;}}
          .ec-btn-hero:hover{background:rgba(255,255,255,0.85);border-color:rgba(5,150,105,0.5);box-shadow:0 12px 36px rgba(146,64,14,0.18),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#92400E;}

          .ec-hero-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(146,64,14,0.08),inset 0 1px 0 rgba(255,255,255,0.95);}
          .ec-stat-col{padding:18px 20px;text-align:center;border-right:1px solid rgba(146,64,14,0.10);}
          .ec-stat-col:last-child{border-right:none;}
          .ec-stat-label{font-size:12px;color:#374151;font-weight:500;margin-bottom:6px;}
          .ec-stat-value{font-size:26px;font-weight:900;color:#059669;letter-spacing:-0.5px;line-height:1;}

          .ec-clients-bar{position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px;}
          .ec-clients-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0;}
          .ec-clients-logos{width:100%;overflow:hidden;}
          .ec-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:ec-marquee 28s linear infinite;}
          .ec-logos-track:hover{animation-play-state:paused;}
          @keyframes ec-marquee{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
          .ec-client-logo{height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s;}
          .ec-client-logo:hover{opacity:0.85;filter:grayscale(0%);}

          .ec-section-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block;}
          .ec-section-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#92400E 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px;}
          .ec-section-desc{font-size:15px;color:#374151;line-height:1.7;max-width:680px;margin-bottom:36px;}

          .ec-services-section{background:#fffbeb;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(146,64,14,0.08),0 -4px 16px rgba(146,64,14,0.05);}
          .ec-services-inner{max-width:1280px;margin:0 auto;}
          .ec-services-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
          .ec-service-card{background:linear-gradient(135deg,rgba(254,243,199,0.60) 0%,rgba(255,255,255,0.88) 60%,rgba(209,250,229,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(146,64,14,0.06),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default;}
          .ec-service-card:hover{transform:translateY(-6px);border-color:rgba(5,150,105,0.45);box-shadow:0 16px 48px rgba(146,64,14,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .ec-service-card.featured{border-color:rgba(217,119,6,0.20);}
          .ec-service-card:hover h3{color:#059669;}
          .ec-card-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#92400E;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none;}
          .ec-service-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1;}
          .ec-service-card p{font-size:13px;color:#374151;line-height:1.6;position:relative;z-index:1;}
          .ec-service-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#D97706,#f59e0b);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1);}
          .ec-service-card:hover::before{transform:scaleY(1);}
          .ec-services-footer{text-align:center;margin-top:20px;}
          .ec-btn-show-more{display:inline-block;background:#ffffff;border:1.5px solid rgba(146,64,14,0.20);color:#92400E;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(146,64,14,0.08);font-family:inherit;}
          .ec-btn-show-more:hover{background:#92400E;border-color:#92400E;color:#ffffff;box-shadow:0 8px 28px rgba(146,64,14,0.20);transform:translateY(-2px);}

          .ec-platforms-section{background:transparent;padding:80px 40px;position:relative;z-index:1;}
          .ec-platforms-wrap{max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(146,64,14,0.07),inset 0 1px 0 rgba(255,255,255,0.95);}
          .ec-platforms-title{font-size:38px;font-weight:900;line-height:1.15;letter-spacing:-0.8px;background:linear-gradient(90deg,#92400E 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 12px;}
          .ec-platforms-sub{font-size:15px;color:#374151;line-height:1.7;max-width:580px;margin:0 0 36px;}
          .ec-platforms-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
          .ec-plat-card{background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(146,64,14,0.12);border-radius:14px;padding:28px 24px;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s;}
          .ec-plat-card:hover{transform:translateY(-4px);border-color:rgba(5,150,105,0.45);box-shadow:0 12px 40px rgba(0,0,0,0.08);}
          .ec-plat-badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:14px;}
          .ec-plat-card h3{font-size:17px;font-weight:700;color:#92400E;margin:0 0 8px;}
          .ec-plat-card p{font-size:13px;color:#374151;line-height:1.6;margin:0 0 16px;}
          .ec-plat-tags{display:flex;flex-wrap:wrap;gap:6px;}
          .ec-plat-tag{font-size:11px;font-weight:600;padding:3px 10px;border-radius:12px;background:rgba(146,64,14,0.08);color:#92400E;}

          .ec-process-section{background:transparent;padding:80px 40px;position:relative;z-index:1;}
          .ec-process-top{max-width:1280px;margin:0 auto 56px;}
          .ec-process-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px;}
          .ec-process-main-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#92400E 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .ec-process-main-desc{font-size:15px;color:#374151;line-height:1.7;margin:0;}
          .ec-process-divider{border:none;border-top:1px solid rgba(146,64,14,0.15);margin:36px 0 0;width:100%;}
          .ec-process-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start;}
          .ec-process-steps{display:flex;flex-direction:column;}
          .ec-pstep{display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1);}
          .ec-pstep.visible{opacity:1;transform:translateY(0);}
          .ec-pstep-left{display:flex;flex-direction:column;align-items:center;}
          .ec-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(146,64,14,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#92400E;flex-shrink:0;transition:background 0.3s,border-color 0.3s;}
          .ec-pstep:hover .ec-pstep-circle{background:rgba(5,150,105,0.12);border-color:#059669;color:#059669;}
          .ec-pstep-arrow{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px;}
          .ec-pstep-arrow::before{content:'';width:2px;flex:1;background:#92400E;opacity:0.25;}
          .ec-pstep-arrow::after{content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #92400E;opacity:0.45;margin-top:-1px;}
          .ec-pstep:last-child .ec-pstep-arrow{display:none;}
          .ec-pstep-content{padding:4px 0 44px;}
          .ec-pstep:last-child .ec-pstep-content{padding-bottom:0;}
          .ec-pstep-title{font-size:22px;font-weight:700;color:#92400E;margin:0 0 10px;line-height:1.2;}
          .ec-pstep-desc{font-size:15px;color:#374151;line-height:1.75;margin:0;}
          .ec-process-image-col{position:sticky;top:100px;min-width:0;}
          .ec-process-img-wrap{width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(146,64,14,0.15);aspect-ratio:4/5;background:#fef3c7;}
          .ec-process-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;}

          .ec-testi-section{background:#fffbeb;border-top:1px solid rgba(146,64,14,0.08);border-bottom:1px solid rgba(146,64,14,0.08);padding:80px 40px;position:relative;z-index:1;}
          .ec-testi-inner{max-width:1280px;margin:0 auto;}
          .ec-section-header-center{text-align:center;margin-bottom:52px;}
          .ec-testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px;}
          .ec-tcard{background:linear-gradient(135deg,rgba(254,243,199,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(209,250,229,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(146,64,14,0.06),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s;}
          .ec-tcard.ec-tcard-visible{opacity:1;transform:translateY(0);}
          .ec-tcard:hover{transform:translateY(-6px);border-color:rgba(5,150,105,0.40);box-shadow:0 16px 48px rgba(146,64,14,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .ec-tcard.featured{border-color:rgba(217,119,6,0.25);}
          .ec-tcard-stars{font-size:18px;color:#D97706;letter-spacing:2px;}
          .ec-tcard-text{font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1;}
          .ec-tcard-author{display:flex;align-items:center;gap:12px;margin-top:4px;}
          .ec-tcard-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0;}
          .ec-tcard-name{font-size:14px;font-weight:700;color:#92400E;}
          .ec-tcard-role{font-size:12px;color:#6b7280;}
          .ec-testi-stats{display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(209,250,229,0.35) 100%);backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(146,64,14,0.06),inset 0 1px 0 rgba(255,255,255,0.95);}
          .ec-tstat{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;}
          .ec-tstat-num{font-size:28px;font-weight:800;color:#92400E;}
          .ec-tstat-label{font-size:13px;color:#374151;font-weight:500;}
          .ec-tstat-divider{width:1px;height:40px;background:rgba(146,64,14,0.15);}

          .ec-why-section{padding:80px 40px;background:#fffbeb;border-top:1px solid rgba(146,64,14,0.08);border-bottom:1px solid rgba(146,64,14,0.08);position:relative;z-index:1;}
          .ec-why-inner{max-width:1280px;margin:0 auto;}
          .ec-why-grid{display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px;}
          .ec-why-card{background:linear-gradient(135deg,rgba(254,243,199,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(209,250,229,0.35) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(146,64,14,0.06),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s;}
          .ec-why-card.ec-card-visible{opacity:1;transform:translateY(0) scale(1);}
          .ec-why-card:hover{transform:translateY(-6px);border-color:rgba(5,150,105,0.40);box-shadow:0 16px 48px rgba(146,64,14,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .ec-why-card-header{display:flex;align-items:center;gap:12px;margin-bottom:10px;}
          .ec-why-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;}
          .ec-why-icon svg{width:28px;height:28px;fill:#D97706;}
          .ec-why-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35;}
          .ec-why-card p{font-size:13px;color:#374151;line-height:1.7;margin:0;}

          .ec-engage-section{background:#fffbeb;border-top:1px solid rgba(146,64,14,0.08);padding:80px 40px;position:relative;z-index:1;}
          .ec-engage-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch;}
          .ec-engage-left{position:sticky;top:100px;display:flex;flex-direction:column;}
          .ec-engage-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#92400E 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .ec-engage-desc{font-size:15px;color:#374151;line-height:1.75;margin:0 0 32px;}
          .ec-engage-img-wrap{border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(146,64,14,0.15);flex:1;min-height:300px;}
          .ec-engage-img-wrap img{width:100%;height:100%;min-height:300px;object-fit:cover;display:block;}
          .ec-engage-right{display:flex;flex-direction:column;gap:16px;}
          .ec-ecard{background:linear-gradient(135deg,rgba(254,243,199,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(209,250,229,0.35) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(146,64,14,0.06),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.3s,box-shadow 0.3s;}
          .ec-ecard.ec-ecard-visible{opacity:1;transform:translateX(0);}
          .ec-ecard:hover{border-color:rgba(5,150,105,0.45);box-shadow:0 16px 48px rgba(146,64,14,0.10);transform:translateX(4px);}
          .ec-ecard-header{display:flex;align-items:center;gap:14px;margin-bottom:10px;}
          .ec-ecard-icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;}
          .ec-ecard-icon svg{width:26px;height:26px;stroke:#D97706;fill:none;}
          .ec-ecard-title{font-size:18px;font-weight:700;color:#92400E;margin:0;}
          .ec-ecard-desc{font-size:14px;color:#374151;line-height:1.65;margin:0 0 16px;}
          .ec-ecard-features{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;}
          .ec-efeat{display:flex;align-items:center;gap:8px;font-size:13px;color:#92400E;font-weight:500;}
          .ec-efeat-check{color:#D97706;font-size:12px;flex-shrink:0;}

          .ec-contact-section{padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.65) 0%,rgba(255,255,255,0.60) 40%,rgba(209,250,229,0.55) 100%);backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80);}
          .ec-contact-container{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px;}
          .ec-contact-left{padding:0;align-self:start;}
          .ec-contact-title{font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#92400E 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;}
          .ec-contact-desc{font-size:14px;color:#374151;line-height:1.6;margin:0 0 24px;}
          .ec-merged-box{background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(254,243,199,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px;}
          .ec-benefit-item{display:flex;gap:10px;align-items:flex-start;}
          .ec-benefit-icon-wrap{width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .ec-benefit-icon{width:20px;height:20px;stroke:#D97706;stroke-width:1.75;}
          .ec-benefit-item p{font-size:13px;color:#374151;margin:0;line-height:1.5;}
          .ec-stats-box{padding-top:32px;border-top:1px solid rgba(146,64,14,0.12);}
          .ec-stats-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}
          .ec-stat-number{font-size:40px;font-weight:900;color:#92400E;line-height:1;display:inline-block;margin-bottom:4px;}
          .ec-stat-text{font-size:13px;color:#374151;line-height:1.4;font-weight:500;}
          .ec-contact-right{align-self:start;}
          .ec-form-box{background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(254,243,199,0.22) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(146,64,14,0.07),inset 0 1px 0 rgba(255,255,255,1);}
          .ec-form-box h3{font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px;}
          .ec-contact-form{display:flex;flex-direction:column;gap:16px;}
          .ec-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
          .ec-form-group{display:flex;flex-direction:column;gap:6px;}
          .ec-form-group.full{grid-column:1/-1;}
          .ec-form-group label{font-size:12px;font-weight:500;color:#0F1F40;}
          .ec-form-group input,.ec-form-group textarea,.ec-form-group select{padding:10px 14px;border:1px solid rgba(146,64,14,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(146,64,14,0.06);transition:border-color 0.2s,background 0.2s;}
          .ec-form-group input:focus,.ec-form-group textarea:focus{outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12);}
          .ec-phone-input{display:flex;border:1px solid rgba(146,64,14,0.15);border-radius:6px;overflow:hidden;}
          .ec-phone-input select{padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px;}
          .ec-phone-input input{flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none;}
          .ec-phone-input input:focus{outline:none;}
          .ec-consent{display:flex;gap:8px;align-items:flex-start;margin-top:8px;}
          .ec-consent input[type="checkbox"]{margin-top:3px;width:16px;height:16px;cursor:pointer;}
          .ec-consent label{font-size:11px;color:#374151;line-height:1.5;margin:0;}
          .ec-consent a{color:#92400E;text-decoration:none;}
          .ec-submit-btn{padding:14px 28px;background:rgba(146,64,14,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(146,64,14,0.25),inset 0 1px 0 rgba(255,255,255,0.15);}
          .ec-submit-btn:hover{background:rgba(146,64,14,0.95);border-color:rgba(5,150,105,0.5);transform:translateY(-2px);}

          .ec-faq-section{padding:80px 40px;background:#fffbeb;border-top:1px solid rgba(146,64,14,0.08);position:relative;z-index:1;}
          .ec-faq-inner{max-width:1280px;margin:0 auto;}
          .ec-faq-heading{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#92400E 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px;}
          .ec-faq-list{display:flex;flex-direction:column;gap:12px;}
          .ec-faq-item{background:linear-gradient(135deg,rgba(254,243,199,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(209,250,229,0.35) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(146,64,14,0.05),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s;}
          .ec-faq-item.open{border-color:rgba(217,119,6,0.35);box-shadow:0 8px 32px rgba(146,64,14,0.08);}
          .ec-faq-item.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px;}
          .ec-faq-question{width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative;}
          .ec-faq-q-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(146,64,14,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s;}
          .ec-faq-item.open .ec-faq-q-badge{background:#D97706;color:#fff;}
          .ec-faq-question span{font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45;}
          .ec-faq-item.open .ec-faq-question span{color:#D97706;}
          .ec-faq-chevron{width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s;}
          .ec-faq-item.open .ec-faq-chevron{transform:rotate(180deg);color:#D97706;}
          .ec-faq-answer-wrap{overflow:hidden;transition:max-height 0.35s ease;max-height:0;}
          .ec-faq-item.open .ec-faq-answer-wrap{max-height:400px;}
          .ec-faq-answer{padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8;}

          .ec-related-section{background:rgba(254,243,199,0.20);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px;}
          .ec-related-inner{max-width:1280px;margin:0 auto;text-align:center;}
          .ec-related-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#374151;margin:0 0 14px;display:block;}
          .ec-related-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#92400E 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .ec-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px;}
          .ec-related-divider{border:none;border-top:1px solid rgba(146,64,14,0.12);margin:40px 0;}
          .ec-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;}
          .ec-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s;}
          .ec-rtag:hover{filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10);}
          .ec-rtag-amber{background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309;}
          .ec-rtag-green{background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.30);color:#065F46;}
          .ec-rtag-blue{background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8;}
          .ec-rtag-orange{background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C;}
          .ec-rtag-violet{background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9;}
          .ec-rtag-teal{background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E;}
          .ec-rtag-rose{background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C;}

          .ec-section-reveal{opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1);}
          .ec-section-reveal.ec-revealed{opacity:1;transform:translateY(0);}

          @media(max-width:900px){.ec-page{background:linear-gradient(160deg,#fff7ed 0%,#fef3c7 30%,#ecfdf5 60%,#eff6ff 100%) !important;}}
          @media(max-width:1024px){
            .ec-hero-content h1{font-size:40px;}
            .ec-services-grid{grid-template-columns:repeat(2,1fr);}
            .ec-why-grid{grid-template-columns:repeat(2,1fr);}
            .ec-platforms-grid{grid-template-columns:repeat(2,1fr);}
            .ec-engage-inner{grid-template-columns:1fr;}
            .ec-engage-left{position:static;}
            .ec-process-inner{grid-template-columns:1fr;}
            .ec-process-image-col{display:none;}
          }
          @media(max-width:768px){
            .ec-page{overflow-x:hidden;}
            .ec-hero-content{padding:36px 20px 24px;}
            .ec-hero-content h1{font-size:28px;letter-spacing:-0.3px;}
            .ec-hero-content p{font-size:15px;}
            .ec-hero-stats{grid-template-columns:1fr 1fr;max-width:100%;}
            .ec-stat-col{padding:14px 12px;}
            .ec-stat-col:nth-child(2){border-right:none;}
            .ec-stat-col:nth-child(3){border-top:1px solid rgba(146,64,14,0.10);}
            .ec-stat-col:nth-child(4){border-top:1px solid rgba(146,64,14,0.10);border-right:none;}
            .ec-stat-value{font-size:22px;}
            .ec-clients-bar{padding:16px 20px 36px;gap:12px;}
            .ec-services-section,.ec-why-section,.ec-engage-section,.ec-faq-section,.ec-testi-section{padding:48px 20px 40px;}
            .ec-platforms-section{padding:48px 16px;}
            .ec-platforms-wrap{padding:24px 20px 32px;border-radius:16px;}
            .ec-platforms-grid{grid-template-columns:1fr;}
            .ec-process-section{padding:60px 20px;}
            .ec-contact-section{padding:48px 16px;}
            .ec-contact-container{grid-template-columns:1fr;gap:20px;}
            .ec-contact-title,.ec-section-title,.ec-engage-title,.ec-process-main-title,.ec-related-title{font-size:28px;}
            .ec-faq-heading{font-size:26px;}
            .ec-faq-question{padding:18px 18px 18px 52px;}
            .ec-faq-question span{font-size:14px;}
            .ec-faq-answer{padding:0 18px 18px 52px;font-size:14px;}
            .ec-faq-q-badge{left:14px;}
            .ec-related-section{padding:60px 20px;}
            .ec-related-tags{gap:8px;}
            .ec-rtag{padding:9px 16px;font-size:13px;}
            .ec-services-grid{grid-template-columns:1fr 1fr;gap:10px;}
            .ec-testi-grid{grid-template-columns:1fr;}
            .ec-why-grid{grid-template-columns:1fr;margin-top:40px;}
            .ec-testi-stats{flex-wrap:wrap;gap:0;padding:24px 20px;}
            .ec-tstat{flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(146,64,14,0.10);}
            .ec-tstat:nth-child(odd){border-right:1px solid rgba(146,64,14,0.10);}
            .ec-tstat:nth-last-child(-n+2){border-bottom:none;}
            .ec-tstat-divider{display:none;}
            .ec-form-row{grid-template-columns:1fr;}
            .ec-stats-grid{grid-template-columns:1fr 1fr 1fr;}
            .ec-stat-number{font-size:28px;}
          }
          @media(max-width:480px){
            .ec-hero-content h1{font-size:24px;}
            .ec-services-grid{grid-template-columns:1fr;}
            .ec-service-card{padding:20px 18px 18px;}
            .ec-card-num{font-size:52px;}
            .ec-ecard{padding:20px;}
            .ec-ecard-features{grid-template-columns:1fr;}
            .ec-merged-box{padding:18px;}
          }
        `}</style>
      </Head>

      <div className="ec-page">
        <div className="ec-orb-1"/><div className="ec-orb-2"/><div className="ec-orb-3"/>

        {/* HERO */}
        <div className="ec-hero-block">
          <div className="ec-hero-content">
            <span className="ec-eyebrow">eCommerce Development Agency — 300+ Stores Delivered</span>
            <h1>eCommerce Development Services — Build Stores That Convert and Scale</h1>
            <p>From custom Shopify builds and WooCommerce stores to headless commerce and enterprise Magento — 1Solutions builds eCommerce experiences that turn browsers into buyers and buyers into repeat customers.</p>
            <Link href="#contact" className="ec-btn-hero">Get a Free Store Consultation</Link>
          </div>
          <div className="ec-hero-stats" ref={statsRef}>
            {[['Stores Delivered','300+'],['Avg. Conversion Lift','42%'],['Years Experience','15+'],['Client Retention','97%']].map(([label,val])=>(
              <AnimatedStat key={label} label={label} val={val} started={statsStarted}/>
            ))}
          </div>
          <div className="ec-clients-bar">
            <span className="ec-clients-label">Trusted by Leading Brands</span>
            <div className="ec-clients-logos">
              <div className="ec-logos-track">
                {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon2'],['/logo/Uniphore.jpg','Uniphore2'],['/logo/ICCoLogo.png','ICC2'],['/logo/Honor_Logo_(2020).svg.png','Honor2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv2']].map(([src,alt])=>(
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="ec-client-logo"/>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <section className="ec-services-section">
          <div className="ec-services-inner">
            <div className={`ec-section-reveal${visibleSections.has('services')?' ec-revealed':''}`} ref={el=>{sectionRefs.current['services']=el;}}>
              <span className="ec-section-eyebrow">What We Build</span>
              <h2 className="ec-section-title">eCommerce Development Services We Offer</h2>
              <p className="ec-section-desc">Every store we build is designed to convert, built to scale, and optimised to rank — from launch day through every growth phase.</p>
            </div>
            <div className="ec-services-grid">
              {visibleServices.map(s=>(
                <div key={s.n} className={`ec-service-card${s.featured?' featured':''}`}>
                  <span className="ec-card-num">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="ec-services-footer">
              <button className="ec-btn-show-more" onClick={()=>setShowAll(v=>!v)}>{showAll?'Show Less ↑':'Show More Services ↓'}</button>
            </div>
          </div>
        </section>

        {/* PLATFORMS */}
        <section className="ec-platforms-section">
          <div className="ec-platforms-wrap">
            <h2 className={`ec-platforms-title ec-section-reveal${visibleSections.has('platforms')?' ec-revealed':''}`} ref={el=>{sectionRefs.current['platforms']=el;}}>
              We Build on Every Major Platform
            </h2>
            <p className="ec-platforms-sub">We recommend the right platform for your business — not the one we happen to prefer. Here is where we have the deepest expertise.</p>
            <div className="ec-platforms-grid">
              {[
                { badge:'Most Popular', badgeBg:'#fef3c7', badgeColor:'#92400E', title:'Shopify & Shopify Plus', desc:'The fastest path to a high-converting store. Ideal for DTC brands, lifestyle products, and merchants scaling from $0 to $10M+ in annual revenue.', tags:['Custom themes','Shopify apps','Checkout extensions','Multi-store'] },
                { badge:'Most Flexible', badgeBg:'#ecfdf5', badgeColor:'#065F46', title:'WooCommerce', desc:'Maximum content flexibility on WordPress. Perfect for stores that need deep SEO control, complex product types, or tight WordPress integration.', tags:['Custom plugins','Subscriptions','Membership','SEO-optimised'] },
                { badge:'Enterprise', badgeBg:'#eff6ff', badgeColor:'#1D4ED8', title:'Magento / Adobe Commerce', desc:'Built for complexity — large catalogues, B2B pricing, multi-store management, and sophisticated fulfilment logic at enterprise scale.', tags:['B2B pricing','Multi-store','ERP integration','Custom modules'] },
                { badge:'Performance', badgeBg:'#fdf4ff', badgeColor:'#7C3AED', title:'Headless Commerce', desc:'Decouple the frontend for sub-second load times and full design freedom. Next.js frontend with Shopify, Medusa, or BigCommerce as the backend.', tags:['Next.js frontend','API-first','Multi-channel','Sub-second loads'] },
                { badge:'Marketplaces', badgeBg:'#fff7ed', badgeColor:'#C2410C', title:'Custom Marketplace', desc:'Multi-vendor platforms with seller onboarding, commission management, escrow payments, and dispute resolution built for scale.', tags:['Multi-vendor','Commission engine','Seller portal','Payment escrow'] },
                { badge:'DTC Brands', badgeBg:'#f0fdf4', badgeColor:'#15803D', title:'BigCommerce', desc:'SaaS commerce for mid-market and enterprise brands needing Shopify-level simplicity with more native B2B and multi-currency features.', tags:['B2B built-in','Multi-currency','Open API','No transaction fees'] },
              ].map(p=>(
                <div className="ec-plat-card" key={p.title}>
                  <span className="ec-plat-badge" style={{background:p.badgeBg,color:p.badgeColor}}>{p.badge}</span>
                  <h3>{p.title}</h3><p>{p.desc}</p>
                  <div className="ec-plat-tags">{p.tags.map(t=><span key={t} className="ec-plat-tag">{t}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="ec-process-section">
          <div className="ec-process-top">
            <div className={`ec-section-reveal${visibleSections.has('process')?' ec-revealed':''}`} ref={el=>{sectionRefs.current['process']=el;}}>
              <p className="ec-process-eyebrow">HOW WE BUILD</p>
              <h2 className="ec-process-main-title">Our eCommerce Build Process</h2>
              <p className="ec-process-main-desc">Every store we build goes through the same structured process — from strategy through to a conversion-optimised launch — so nothing important gets missed.</p>
            </div>
            <hr className="ec-process-divider"/>
          </div>
          <div className="ec-process-inner">
            <div className="ec-process-steps">
              {[
                ['Discovery & Strategy','We audit your existing store (or research your market if starting fresh), map the customer journey, identify conversion blockers, and define the platform, feature set, and design direction.'],
                ['Design & UX','Wireframes and high-fidelity designs reviewed and approved before development starts. Every design decision is grounded in eCommerce CRO data — not just aesthetics.'],
                ['Build & Integrate','Custom development with your chosen platform, payment gateways, ERP, 3PL, and any other integrations. 2-week sprints with live previews so you see the store taking shape.'],
                ['Launch & Grow','UAT on staging, performance testing, SEO audit, and go-live. Followed by post-launch CRO analysis, A/B testing, and ongoing optimisation to keep improving conversion rates.'],
              ].map(([title,desc],i)=>(
                <div className={`ec-pstep${visibleSteps.includes(i)?' visible':''}`} key={title} ref={el=>{stepRefs.current[i]=el;}}>
                  <div className="ec-pstep-left"><div className="ec-pstep-circle">{i+1}</div>{i<3&&<div className="ec-pstep-arrow"/>}</div>
                  <div className="ec-pstep-content"><h3 className="ec-pstep-title">{title}</h3><p className="ec-pstep-desc">{desc}</p></div>
                </div>
              ))}
            </div>
            <div className="ec-process-image-col">
              <div className="ec-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://placehold.co/480x600/92400E/ffffff?text=eCommerce+Build+Process" alt="eCommerce build process" loading="lazy"/>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="ec-testi-section">
          <div className="ec-testi-inner">
            <div className={`ec-section-header-center ec-section-reveal${visibleSections.has('testi')?' ec-revealed':''}`} ref={el=>{sectionRefs.current['testi']=el;}}>
              <span className="ec-section-eyebrow">Client Results</span>
              <h2 className="ec-section-title">Real Stores, Real Revenue Growth</h2>
              <p className="ec-section-desc" style={{margin:'0 auto 0'}}>eCommerce brands that chose 1Solutions to build or rebuild their stores.</p>
            </div>
            <div className="ec-testi-grid" ref={testiGridRef}>
              {[
                { stars:'★★★★★',featured:true, text:'"1Solutions rebuilt our Shopify store from scratch — new design, new checkout flow, custom loyalty integration. Our conversion rate went from 1.4% to 3.1% and we added $2.3M in annual revenue in the first 12 months."', name:'Claire Donovan', role:'Founder, LumineStore — Portland, OR', initials:'CD', color:'#92400E' },
                { stars:'★★★★★',featured:false, text:'"We migrated from Magento 1 to Shopify Plus — 80,000 SKUs, 6 years of order history, and 14 payment integrations. Zero data loss, zero downtime. The team managed every detail."', name:'Steve Park', role:'Head of eCommerce, TradeCo — Vancouver, BC', initials:'SP', color:'#059669' },
                { stars:'★★★★★',featured:false, text:'"Our headless Shopify build loads in under 1.2 seconds on mobile. Organic traffic is up 67% since launch and our Google Shopping ROAS improved from 2.1x to 5.4x. Best investment we\'ve made."', name:'Natalie Brooks', role:'CMO, PureForm Active — Melbourne, AU', initials:'NB', color:'#1D4ED8' },
              ].map((t,i)=>(
                <div key={t.name} className={`ec-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' ec-tcard-visible':''}`}>
                  <div className="ec-tcard-stars">{t.stars}</div>
                  <p className="ec-tcard-text">{t.text}</p>
                  <div className="ec-tcard-author"><div className="ec-tcard-avatar" style={{background:t.color}}>{t.initials}</div><div><div className="ec-tcard-name">{t.name}</div><div className="ec-tcard-role">{t.role}</div></div></div>
                </div>
              ))}
            </div>
            <div className="ec-testi-stats">
              {[['300+','Stores Delivered'],null,['42%','Avg. Conversion Lift'],null,['97%','Client Retention'],null,['15+','Years Experience']].map((item,i)=>
                item===null?<div key={i} className="ec-tstat-divider"/>:<div key={item[0]} className="ec-tstat"><span className="ec-tstat-num">{item[0]}</span><span className="ec-tstat-label">{item[1]}</span></div>
              )}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="ec-why-section">
          <div className="ec-why-inner">
            <div className={`ec-section-header-center ec-section-reveal${visibleSections.has('why')?' ec-revealed':''}`} ref={el=>{sectionRefs.current['why']=el;}}>
              <span className="ec-section-eyebrow">Why 1Solutions</span>
              <h2 className="ec-section-title">Why Brands Choose Us</h2>
              <p className="ec-section-desc" style={{margin:'0 auto 0'}}>We have built 300+ eCommerce stores. Here is what makes our approach different from a generic web agency.</p>
            </div>
            <div className="ec-why-grid" ref={whyGridRef}>
              {WHY.map((w,i)=>(
                <div key={w.title} className={`ec-why-card${visibleWhyCards.includes(i)?' ec-card-visible':''}`} style={{transitionDelay:`${i*80}ms`}}>
                  <div className="ec-why-card-header"><div className="ec-why-icon">{w.icon}</div><h3>{w.title}</h3></div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENGAGEMENT */}
        <section className="ec-engage-section">
          <div className="ec-engage-inner">
            <div className="ec-engage-left">
              <div className={`ec-section-reveal${visibleSections.has('engage')?' ec-revealed':''}`} ref={el=>{sectionRefs.current['engage']=el;}}>
                <span className="ec-section-eyebrow">How We Engage</span>
                <h2 className="ec-engage-title">Engagement Models for Every Stage</h2>
                <p className="ec-engage-desc">Whether you are launching your first store or re-platforming a $10M business, we have a model that fits.</p>
              </div>
              <div className="ec-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://placehold.co/560x420/92400E/ffffff?text=eCommerce+Partnership" alt="eCommerce engagement models" loading="lazy"/>
              </div>
            </div>
            <div className="ec-engage-right" ref={eCardsRef}>
              {[
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>, title:'New Store Build', desc:'End-to-end store build — strategy, design, development, integrations, and launch. Fixed price, fixed timeline. Your store, your brand, done right.', features:['Platform selection advice','Custom design','Full integrations','SEO-ready launch'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Platform Migration', desc:'Move from your old platform to a new one — with full data migration, URL preservation, and a zero-downtime cutover. We have done this 80+ times.', features:['Full data migration','URL redirects','SEO preservation','Zero downtime'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, title:'Conversion Rate Optimisation', desc:'A structured CRO programme — heatmaps, session recordings, A/B tests, and checkout audits — that lifts your conversion rate from your existing traffic.', features:['Heatmap analysis','A/B testing','Checkout optimisation','Monthly reporting'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, title:'Ongoing Retainer & Growth', desc:'Post-launch support, feature development, speed optimisation, and seasonal campaign builds — on a monthly retainer from $800/month.', features:['Bug fixes & updates','New feature builds','Speed optimisation','Seasonal campaigns'] },
              ].map((ec,i)=>(
                <div key={ec.title} className={`ec-ecard${visibleECards.includes(i)?' ec-ecard-visible':''}`} style={{transitionDelay:`${i*100}ms`}}>
                  <div className="ec-ecard-header"><div className="ec-ecard-icon">{ec.icon}</div><h3 className="ec-ecard-title">{ec.title}</h3></div>
                  <p className="ec-ecard-desc">{ec.desc}</p>
                  <div className="ec-ecard-features">{ec.features.map(f=><div key={f} className="ec-efeat"><span className="ec-efeat-check">✔</span>{f}</div>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="ec-contact-section" id="contact">
          <div className="ec-contact-container">
            <div className="ec-contact-left">
              <div className={`ec-section-reveal${visibleSections.has('contact')?' ec-revealed':''}`} ref={el=>{sectionRefs.current['contact']=el;}}>
                <h2 className="ec-contact-title">Ready to Build a Store That Converts?</h2>
                <p className="ec-contact-desc">Tell us about your store and goals. We will respond within 24 hours with an honest recommendation and a clear next step.</p>
              </div>
              <div className="ec-merged-box">
                {[
                  { label:'Free Store Consultation', desc:'A 30-minute call with a senior eCommerce developer — we review your current store or project brief and give honest recommendations on platform and approach.' },
                  { label:'Fixed-Price Proposal in 48 Hours', desc:'A detailed proposal covering platform, features, integrations, design approach, timeline, and a fixed price — no hourly billing surprises.' },
                  { label:'Conversion-Focused from Day One', desc:'Every decision — from URL structure to checkout flow — is made with conversion rate in mind. We build stores that sell, not just stores that look good.' },
                ].map(b=>(
                  <div key={b.label} className="ec-benefit-item">
                    <div className="ec-benefit-icon-wrap">
                      <svg className="ec-benefit-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.75"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p><strong>{b.label}</strong> — {b.desc}</p>
                  </div>
                ))}
                <div className="ec-stats-box">
                  <div className="ec-stats-grid">
                    {[['300+','Stores delivered'],['42%','Avg. conversion lift'],['15+','Years experience']].map(([n,t])=>(
                      <div key={t}><div className="ec-stat-number">{n}</div><div className="ec-stat-text">{t}</div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="ec-contact-right">
              <div className="ec-form-box">
                <h3>Tell Us About Your Store</h3>
                <form className="ec-contact-form" onSubmit={e=>e.preventDefault()}>
                  <div className="ec-form-row">
                    <div className="ec-form-group"><label htmlFor="ec-fname">First Name *</label><input id="ec-fname" type="text" placeholder="Jane" required/></div>
                    <div className="ec-form-group"><label htmlFor="ec-lname">Last Name *</label><input id="ec-lname" type="text" placeholder="Smith" required/></div>
                  </div>
                  <div className="ec-form-row">
                    <div className="ec-form-group"><label htmlFor="ec-email">Work Email *</label><input id="ec-email" type="email" placeholder="jane@company.com" required/></div>
                    <div className="ec-form-group">
                      <label htmlFor="ec-phone">Phone</label>
                      <div className="ec-phone-input">
                        <select aria-label="Country code"><option>+1</option><option>+61</option><option>+44</option><option>+91</option></select>
                        <input id="ec-phone" type="tel" placeholder="(555) 000-0000"/>
                      </div>
                    </div>
                  </div>
                  <div className="ec-form-row">
                    <div className="ec-form-group">
                      <label htmlFor="ec-platform">Preferred Platform</label>
                      <select id="ec-platform">
                        <option value="">Select…</option>
                        <option>Shopify</option><option>Shopify Plus</option><option>WooCommerce</option>
                        <option>Magento / Adobe Commerce</option><option>Headless Commerce</option>
                        <option>BigCommerce</option><option>Not sure — need advice</option>
                      </select>
                    </div>
                    <div className="ec-form-group">
                      <label htmlFor="ec-budget">Estimated Budget</label>
                      <select id="ec-budget">
                        <option value="">Select range…</option>
                        <option>Under $5,000</option><option>$5,000 – $15,000</option>
                        <option>$15,000 – $30,000</option><option>$30,000 – $60,000</option><option>$60,000+</option>
                      </select>
                    </div>
                  </div>
                  <div className="ec-form-group full">
                    <label htmlFor="ec-msg">Tell Us About Your Store *</label>
                    <textarea id="ec-msg" rows={4} placeholder="e.g. We sell skincare products and need to migrate from Wix to Shopify. We have 200 SKUs and use ShipBob for fulfilment…" required/>
                  </div>
                  <div className="ec-consent">
                    <input type="checkbox" id="ec-consent" required/>
                    <label htmlFor="ec-consent">I agree to 1Solutions&apos; <Link href="/privacy-policy">Privacy Policy</Link> and consent to being contacted about my enquiry.</label>
                  </div>
                  <button type="submit" className="ec-submit-btn">Send My Store Brief →</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="ec-faq-section">
          <div className="ec-faq-inner">
            <div className={`ec-section-reveal${visibleSections.has('faq')?' ec-revealed':''}`} ref={el=>{sectionRefs.current['faq']=el;}}>
              <h2 className="ec-faq-heading">Frequently Asked Questions</h2>
            </div>
            <div className="ec-faq-list">
              {FAQS.map((faq,i)=>(
                <div key={i} className={`ec-faq-item${openFaq===i?' open':''}`}>
                  <button className="ec-faq-question" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                    <span className="ec-faq-q-badge">{String.fromCharCode(65+i)}</span>
                    <span>{faq.q}</span>
                    <svg className="ec-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="ec-faq-answer-wrap"><div className="ec-faq-answer">{faq.a}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED */}
        <section className="ec-related-section">
          <div className="ec-related-inner">
            <span className="ec-related-eyebrow">Explore Related Services</span>
            <h2 className="ec-related-title">More Ways We Can Help</h2>
            <p className="ec-related-sub">Great eCommerce stores need great marketing and support. Explore what works alongside your new store.</p>
            <hr className="ec-related-divider"/>
            <div className="ec-related-tags">
              {[
                ['/shopify-store-development','Shopify Development','ec-rtag-amber'],
                ['/woocommerce-development-company','WooCommerce Development','ec-rtag-green'],
                ['/magento-development-company','Magento Development','ec-rtag-orange'],
                ['/ecommerce-seo-services','eCommerce SEO','ec-rtag-blue'],
                ['/ppc-management-services','Google Shopping Ads','ec-rtag-violet'],
                ['/digital-marketing','Digital Marketing','ec-rtag-teal'],
                ['/website-support-maintenance-services','Website Maintenance','ec-rtag-rose'],
                ['/analytics-cro-services','Analytics & CRO','ec-rtag-amber'],
                ['/content-marketing-services','Content Marketing','ec-rtag-green'],
                ['/email-marketing-services','Email Marketing','ec-rtag-blue'],
                ['/digital-transformation','Custom Development','ec-rtag-violet'],
                ['/hire-dedicated-resources','Hire Developers','ec-rtag-teal'],
              ].map(([href,label,cls])=>(
                <Link key={href} href={href} className={`ec-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
