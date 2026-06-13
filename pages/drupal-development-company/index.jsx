'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Custom Drupal Development', desc:'Fully tailored Drupal websites and web applications built from scratch — structured for scale, security, and editorial flexibility.', featured:false },
  { n:'02', title:'Drupal CMS Development', desc:'Powerful content management systems with custom content types, taxonomies, views, and workflows that match how your team actually works.', featured:true },
  { n:'03', title:'Drupal Theme Development', desc:'Pixel-perfect, responsive Drupal themes built on modern front-end stacks — crafted to reflect your brand and deliver a superior user experience.', featured:false },
  { n:'04', title:'Custom Module Development', desc:'Extend Drupal with bespoke modules that add exactly the functionality your project requires — built to Drupal coding standards and best practices.', featured:false },
  { n:'05', title:'Drupal E-Commerce (Drupal Commerce)', desc:'Scalable online stores powered by Drupal Commerce with custom checkout flows, payment gateway integrations, and catalogue management.', featured:false },
  { n:'06', title:'Third-party API Integration', desc:'Connect Drupal with Salesforce, HubSpot, Marketo, payment gateways, ERPs, and external platforms using REST, JSON:API, and GraphQL.', featured:false },
  { n:'07', title:'Drupal Migration Services', desc:'Migrate from Drupal 7/8/9, WordPress, Joomla, or custom CMS to Drupal 10 with zero content loss and preserved SEO rankings.', featured:false },
  { n:'08', title:'Headless & Decoupled Drupal', desc:'Lightning-fast frontends with Next.js or React, powered by Drupal as a headless CMS via JSON:API or GraphQL — best of both worlds.', featured:false },
  { n:'09', title:'Drupal Multisite Development', desc:'Manage multiple Drupal websites from a single codebase — ideal for universities, enterprises, and media companies with distributed content teams.', featured:false },
  { n:'10', title:'Drupal Performance Optimisation', desc:'Boost page speed, implement CDN configuration, database query optimisation, Varnish caching, and Drupal-specific performance tuning.', featured:false },
  { n:'11', title:'Drupal Security & Maintenance', desc:'Proactive security audits, module updates, patch management, uptime monitoring, and 24/7 support to keep your Drupal site protected.', featured:false },
  { n:'12', title:'Drupal Support & Care Plans', desc:'Dedicated ongoing support retainers with SLA-backed response times — from minor content updates to complex feature development.', featured:false },
];

const FAQS = [
  { q:'What Drupal development services does 1Solutions offer?', a:'We offer end-to-end Drupal development including custom Drupal 10 websites, CMS configuration, custom module and theme development, Drupal Commerce stores, headless/decoupled Drupal with Next.js, Drupal migrations from version 7/8/9 and other platforms, multisite setups, API integrations, performance optimisation, and ongoing maintenance and support plans.' },
  { q:'How much does a custom Drupal website cost?', a:'Custom Drupal websites typically start from $5,000 for straightforward business sites and range to $50,000+ for complex enterprise platforms with custom workflows, multisite configurations, or large-scale migrations. Cost depends on scope, number of content types, integrations, and custom module requirements. We provide a fixed-price quote after a free discovery call — no hidden costs.' },
  { q:'How long does a Drupal project take?', a:'A standard Drupal business site typically takes 6–10 weeks from kick-off to launch. Complex enterprise builds with custom modules, migrations, or Drupal Commerce can take 12–24 weeks. We share a detailed milestone timeline in the proposal and provide weekly progress updates. Our structured 4D delivery process keeps projects on track.' },
  { q:'Do you work with clients in the US, Canada, and Australia?', a:'Yes — we have delivered Drupal projects remotely for clients across the US, Canada, and Australia since 2008. We operate in your time zone, use Slack and Loom for communication, and maintain full transparency with regular demos. Our 97% client retention rate speaks to the quality of our remote collaboration.' },
  { q:'Can you migrate our existing Drupal 7 or Drupal 9 site to Drupal 10?', a:'Absolutely. Drupal migration is one of our core specialisations. We handle Drupal 7-to-10, Drupal 8/9-to-10, and cross-platform migrations from WordPress, Joomla, and custom CMS platforms. Our process preserves all content, media, URLs, and SEO rankings. We test thoroughly on a staging environment before go-live to ensure zero data loss.' },
  { q:'What is headless Drupal and do you build decoupled Drupal sites?', a:"Headless or decoupled Drupal uses Drupal purely as a content management backend (via JSON:API or GraphQL) while the front-end is built with a modern JavaScript framework like Next.js or React. This delivers faster page loads, better security, and modern developer tooling while keeping content management familiar through Drupal's admin UI. Yes, we build fully decoupled Drupal solutions." },
  { q:'Do you build Drupal multisite networks?', a:"Yes. We design and build Drupal multisite architectures that allow you to manage multiple websites from a single Drupal codebase. This is ideal for universities, government agencies, media groups, and enterprises with multiple brands or regional sites. We configure shared modules and themes while allowing per-site customisation and independent content management." },
  { q:'What makes 1Solutions different from other Drupal agencies?', a:'Three things: depth of Drupal expertise, accountability, and long-term thinking. Our developers have worked with Drupal since version 6 — we understand its architecture deeply, not just the surface level. Unlike freelancers, we offer a dedicated team with a project manager so your project never stalls. And we design solutions that are maintainable and upgradeable, not just delivered and forgotten.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V17H7v2h10v-2h-4v-1.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>, title:'Drupal Experts Since Version 6', desc:'Our team has worked with Drupal since v6. We understand the architecture, the contrib ecosystem, and the upgrade paths — not just surface-level configuration.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'US, Canada & Australia Focused', desc:'We understand the compliance requirements, accessibility standards, and editorial workflows of English-speaking western markets — not just generic offshore delivery.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'On-Time, On-Budget Delivery', desc:'Our structured 4D process (Discover → Define → Develop → Deploy) ensures projects are scoped correctly and delivered without scope creep or budget surprises.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Enterprise-Grade Security', desc:'Drupal is the CMS of choice for governments and enterprises. We implement security hardening, two-factor auth, role-based access control, and regular security audits.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'Migration Specialists', desc:'We have migrated 100+ sites to Drupal 10 — from Drupal 7, WordPress, Joomla, and custom platforms — with zero content loss and fully preserved SEO rankings.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Dedicated Project Manager', desc:'No ticket queues. You get a single point of contact who understands your goals, speaks plain English, and keeps you updated throughout the project lifecycle.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'Full-Stack Drupal Capability', desc:'Custom modules, theming, API integrations, Drupal Commerce, headless architecture, performance tuning, and DevOps — all under one roof. No outsourcing.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership', desc:'97% client retention rate. We build Drupal sites that we maintain for years — with update plans, security patching, and ongoing development retainers.' },
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
    <div className="dr-stat-col">
      <div className="dr-stat-label">{label}</div>
      <div className="dr-stat-value">{display}</div>
    </div>
  );
}

export default function DrupalDevelopmentCompany() {
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
        <title>Drupal Development Company | Expert Drupal Development Services | 1Solutions</title>
        <meta name="description" content="1Solutions is a leading Drupal development company with 15+ years experience. We deliver custom Drupal 10 websites, headless Drupal, Drupal Commerce, and migrations for US, Canada & Australia." />
        <meta name="keywords" content="drupal development company, drupal development services, drupal 10 development, custom drupal development, drupal migration, headless drupal, drupal commerce, drupal agency" />
        <link rel="canonical" href="https://www.1solutions.biz/drupal-development-company/" />
        <meta property="og:title" content="Drupal Development Company | 1Solutions" />
        <meta property="og:description" content="Custom Drupal 10 websites, headless Drupal with Next.js, Drupal Commerce, and migrations. 15+ years of Drupal expertise for US, Canada & Australia." />
        <meta property="og:url" content="https://www.1solutions.biz/drupal-development-company/" />
        <style>{`
          .dr-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            background-attachment: scroll;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .dr-page *, .dr-page *::before, .dr-page *::after { box-sizing: border-box; }

          .dr-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.35) 0%,rgba(139,92,246,0.15) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .dr-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.30) 0%,rgba(245,158,11,0.15) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .dr-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.20) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          .dr-hero-block { background:transparent;position:relative;overflow:hidden; }
          .dr-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .dr-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .dr-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .dr-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .dr-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .dr-hero-content p { font-size:16px;color:#3A507A;line-height:1.65;max-width:620px;margin:0 auto 28px; }
          .dr-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .dr-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(245,158,11,0.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }

          .dr-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .dr-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .dr-stat-col:last-child { border-right:none; }
          .dr-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .dr-stat-value { font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1; }

          .dr-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .dr-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .dr-clients-logos { width:100%;overflow:hidden; }
          .dr-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .dr-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          .dr-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .dr-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .dr-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .dr-section-sub { font-size:16px;color:#4A6080;margin:0; }

          .dr-services-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.18),0 -4px 16px rgba(15,52,96,0.10); }
          .dr-services-inner { max-width:1280px;margin:0 auto; }
          .dr-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .dr-service-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .dr-service-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .dr-service-card.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .dr-service-card:hover .dr-card-num { color:#D97706;opacity:0.12; }
          .dr-service-card:hover h3 { color:#D97706; }
          .dr-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .dr-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .dr-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .dr-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#D97706,#f59e0b);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .dr-service-card:hover::before { transform:scaleY(1); }
          .dr-services-footer { text-align:center;margin-top:20px; }
          .dr-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(15,52,96,0.20);color:#0F3460;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(15,52,96,0.08);font-family:inherit; }
          .dr-btn-show-more:hover { background:#0F3460;border-color:#0F3460;color:#ffffff;box-shadow:0 8px 28px rgba(15,52,96,0.20);transform:translateY(-2px); }

          .dr-tech-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .dr-tech-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,0.95); }
          .dr-tech-header { margin-bottom:36px; }
          .dr-tech-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 12px; }
          .dr-tech-subtitle { font-size:15px;color:#4A6080;line-height:1.6;margin:0; }
          .dr-tech-groups { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .dr-tech-group { background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(15,52,96,0.12);border-radius:12px;padding:22px 24px; }
          .dr-tech-group-title { font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .dr-tech-tags { display:flex;flex-wrap:wrap;gap:8px; }
          .dr-tech-tag { display:inline-block;background:rgba(15,52,96,0.07);border:1px solid rgba(15,52,96,0.12);border-radius:6px;padding:5px 12px;font-size:13px;font-weight:500;color:#0F3460; }

          .dr-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .dr-process-top { max-width:1280px;margin:0 auto 56px; }
          .dr-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .dr-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .dr-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .dr-process-divider { border:none;border-top:1px solid rgba(15,52,96,0.15);margin:36px 0 0;width:100%; }
          .dr-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .dr-process-steps { display:flex;flex-direction:column; }
          .dr-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .dr-pstep.visible { opacity:1;transform:translateY(0); }
          .dr-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .dr-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .dr-pstep:hover .dr-pstep-circle { background:rgba(245,158,11,0.2);border-color:#D97706;color:#D97706; }
          .dr-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .dr-pstep-arrow::before { content:'';width:2px;flex:1;background:#0F3460;opacity:0.25; }
          .dr-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #0F3460;opacity:0.45;margin-top:-1px; }
          .dr-pstep:last-child .dr-pstep-arrow { display:none; }
          .dr-pstep-content { padding:4px 0 44px; }
          .dr-pstep:last-child .dr-pstep-content { padding-bottom:0; }
          .dr-pstep-title { font-size:22px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .dr-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .dr-process-image-col { position:sticky;top:100px;min-width:0; }
          .dr-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(15,52,96,0.15);aspect-ratio:4/5;background:#e8edf5; }
          .dr-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          .dr-testi-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .dr-testi-inner { max-width:1280px;margin:0 auto; }
          .dr-section-header-center { text-align:center;margin-bottom:52px; }
          .dr-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .dr-tcard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .dr-tcard.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .dr-tcard.dr-tcard-visible { opacity:1;transform:translateY(0); }
          .dr-tcard.dr-tcard-visible:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .dr-tcard-stars { font-size:18px;color:#D97706;letter-spacing:2px; }
          .dr-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .dr-tcard.featured .dr-tcard-text { color:#1f2937; }
          .dr-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .dr-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .dr-tcard-name { font-size:14px;font-weight:700;color:#0F3460; }
          .dr-tcard-role { font-size:12px;color:#6b7280; }
          .dr-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .dr-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .dr-tstat-num { font-size:28px;font-weight:800;color:#0F3460; }
          .dr-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .dr-tstat-divider { width:1px;height:40px;background:rgba(15,52,96,0.15); }

          .dr-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .dr-why-inner { max-width:1280px;margin:0 auto; }
          .dr-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .dr-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),background 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .dr-why-card:hover { transform:translateY(-6px) scale(1);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .dr-why-card.dr-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .dr-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .dr-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .dr-why-icon svg { width:28px;height:28px;fill:#D97706; }
          .dr-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .dr-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          .dr-engage-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .dr-engage-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch; }
          .dr-engage-left { position:sticky;top:100px;display:flex;flex-direction:column; }
          .dr-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .dr-engage-desc { font-size:15px;color:#3A507A;line-height:1.75;margin:0 0 32px; }
          .dr-engage-img-wrap { border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(15,52,96,0.15);flex:1;min-height:300px; }
          .dr-engage-img-wrap img { width:100%;height:100%;min-height:300px;object-fit:cover;display:block; }
          .dr-engage-right { display:flex;flex-direction:column;gap:16px; }
          .dr-ecard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),background 0.3s,border-color 0.3s; }
          .dr-ecard.dr-ecard-visible { opacity:1;transform:translateX(0); }
          .dr-ecard.dr-ecard-visible:hover { border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1);transform:translateX(4px); }
          .dr-ecard-header { display:flex;align-items:center;gap:14px;margin-bottom:10px; }
          .dr-ecard-icon { width:44px;height:44px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .dr-ecard-icon svg { width:26px;height:26px;stroke:#D97706;fill:none; }
          .dr-ecard-title { font-size:18px;font-weight:700;color:#0F3460;margin:0; }
          .dr-ecard-desc { font-size:14px;color:#3A507A;line-height:1.65;margin:0 0 16px; }
          .dr-ecard-features { display:grid;grid-template-columns:1fr 1fr;gap:8px 16px; }
          .dr-efeat { display:flex;align-items:center;gap:8px;font-size:13px;color:#2A3F6F;font-weight:500; }
          .dr-efeat-check { color:#D97706;font-size:12px;flex-shrink:0; }

          .dr-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .dr-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .dr-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .dr-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .dr-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .dr-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .dr-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .dr-benefit-icon { width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75; }
          .dr-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .dr-stats-box { padding-top:32px;border-top:1px solid rgba(15,52,96,0.12); }
          .dr-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .dr-stat-number { font-size:40px;font-weight:900;color:#0F3460;line-height:1;display:inline-block;margin-bottom:4px; }
          .dr-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .dr-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .dr-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .dr-contact-form { display:flex;flex-direction:column;gap:16px; }
          .dr-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .dr-form-group { display:flex;flex-direction:column;gap:6px; }
          .dr-form-group.full { grid-column:1/-1; }
          .dr-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .dr-form-group input,.dr-form-group textarea,.dr-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .dr-form-group input:focus,.dr-form-group textarea:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12); }
          .dr-phone-input { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .dr-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .dr-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .dr-phone-input input:focus { outline:none; }
          .dr-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .dr-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .dr-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .dr-consent a { color:#0F3460;text-decoration:none; }
          .dr-submit-btn { padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .dr-submit-btn:hover { background:rgba(15,52,96,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }

          .dr-faq-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .dr-faq-inner { max-width:1280px;margin:0 auto; }
          .dr-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .dr-faq-list { display:flex;flex-direction:column;gap:12px; }
          .dr-faq-item { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .dr-faq-item.open { border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .dr-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .dr-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .dr-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .dr-faq-item.open .dr-faq-q-badge { background:#D97706;color:#fff; }
          .dr-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .dr-faq-item.open .dr-faq-question span { color:#D97706; }
          .dr-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .dr-faq-item.open .dr-faq-chevron { transform:rotate(180deg);color:#D97706; }
          .dr-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .dr-faq-item.open .dr-faq-answer-wrap { max-height:400px; }
          .dr-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .dr-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#0F3460;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          .dr-related-section { background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .dr-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .dr-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .dr-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .dr-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .dr-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0; }
          .dr-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .dr-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .dr-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .dr-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .dr-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .dr-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .dr-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .dr-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .dr-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .dr-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .dr-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .dr-rtag-cyan    { background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490; }
          .dr-rtag-pink    { background:rgba(236,72,153,0.10);border-color:rgba(236,72,153,0.28);color:#9D174D; }
          .dr-rtag-slate   { background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155; }
          .dr-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }
          .dr-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }

          .dr-btn-hero-shimmer { position:relative;overflow:hidden; }
          .dr-btn-hero-shimmer::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:dr-shimmer-sweep 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes dr-shimmer-sweep { 0% { left:-120%; } 35%,100% { left:160%; } }

          .dr-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .dr-section-reveal.dr-revealed { opacity:1;transform:translateY(0); }

          .dr-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:dr-marquee 28s linear infinite; }
          .dr-logos-track:hover { animation-play-state:paused; }
          @keyframes dr-marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }

          @media (max-width:1024px) {
            .dr-hero-content h1 { font-size:40px; }
            .dr-services-grid { grid-template-columns:repeat(2,1fr); }
            .dr-why-grid { grid-template-columns:repeat(2,1fr); }
            .dr-tech-groups { grid-template-columns:repeat(2,1fr); }
            .dr-engage-inner { grid-template-columns:1fr; }
            .dr-engage-left { position:static; }
            .dr-process-inner { grid-template-columns:1fr; }
            .dr-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .dr-page { overflow-x:hidden; }
            .dr-hero-content { padding:36px 20px 24px; }
            .dr-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .dr-hero-content p { font-size:15px; }
            .dr-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .dr-stat-col { padding:14px 12px; }
            .dr-stat-col:nth-child(2) { border-right:none; }
            .dr-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .dr-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .dr-stat-value { font-size:22px; }
            .dr-clients-bar { padding:16px 20px 36px;gap:12px; }
            .dr-services-section { padding:48px 20px 40px; }
            .dr-tech-section { padding:48px 16px; }
            .dr-tech-wrap { padding:24px 20px 32px;border-radius:16px; }
            .dr-tech-groups { grid-template-columns:1fr; }
            .dr-process-section { padding:60px 20px; }
            .dr-process-top { margin-bottom:36px; }
            .dr-testi-section { padding:60px 20px; }
            .dr-testi-section .dr-section-header-center { text-align:left; }
            .dr-why-section { padding:60px 20px; }
            .dr-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .dr-why-card { padding:24px 20px; }
            .dr-engage-section { padding:60px 20px; }
            .dr-contact-section { padding:48px 16px; }
            .dr-contact-container { grid-template-columns:1fr;gap:20px; }
            .dr-contact-title { font-size:28px; }
            .dr-faq-section { padding:60px 20px; }
            .dr-faq-heading { font-size:26px; }
            .dr-faq-question { padding:18px 18px 18px 52px; }
            .dr-faq-question span { font-size:14px; }
            .dr-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .dr-faq-q-badge { left:14px; }
            .dr-related-section { padding:60px 20px; }
            .dr-related-tags { gap:8px; }
            .dr-rtag { padding:9px 16px;font-size:13px; }
            .dr-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .dr-testi-grid { grid-template-columns:1fr; }
            .dr-section-title,.dr-engage-title,.dr-process-main-title,.dr-related-title { font-size:30px; }
            .dr-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .dr-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(15,52,96,0.10); }
            .dr-tstat:nth-child(odd) { border-right:1px solid rgba(15,52,96,0.10); }
            .dr-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .dr-tstat-divider { display:none; }
            .dr-form-row { grid-template-columns:1fr; }
            .dr-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .dr-stat-number { font-size:28px; }
            .dr-tech-title { font-size:26px; }
          }
          @media (max-width:480px) {
            .dr-hero-content h1 { font-size:24px; }
            .dr-section-title,.dr-engage-title,.dr-process-main-title,.dr-related-title { font-size:26px; }
            .dr-services-grid { grid-template-columns:1fr; }
            .dr-service-card { padding:20px 18px 18px; }
            .dr-card-num { font-size:52px; }
            .dr-pstep-title { font-size:18px; }
            .dr-contact-title { font-size:24px; }
            .dr-engage-title { font-size:26px; }
            .dr-tcard { padding:24px 20px; }
            .dr-ecard { padding:20px; }
            .dr-ecard-features { grid-template-columns:1fr; }
            .dr-merged-box { padding:18px; }
          }
        `}</style>
      </Head>

      <div className="dr-page">
        <div className="dr-orb-1" />
        <div className="dr-orb-2" />
        <div className="dr-orb-3" />

        {/* ── HERO ── */}
        <div className="dr-hero-block">
          <div className="dr-hero-content">
            <span className="dr-eyebrow">Expert Drupal Development Company</span>
            <h1>Drupal Development Services — Enterprise CMS Built for Scale</h1>
            <p>From custom Drupal 10 websites and headless architectures to complex migrations and Drupal Commerce stores — 1Solutions delivers secure, scalable Drupal solutions for enterprises, governments, and fast-growing businesses across the US, Canada, and Australia.</p>
            <Link href="#contact" className="dr-btn-hero dr-btn-hero-shimmer">Get a Free Consultation Now</Link>
          </div>

          <div className="dr-hero-stats" ref={statsRef}>
            {[['Drupal Projects','150+'],['Drupal Experts','20+'],['Years in Business','15+'],['Client Retention','97%']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="dr-clients-bar">
            <span className="dr-clients-label">Trusted by Leading Brands</span>
            <div className="dr-clients-logos">
              <div className="dr-logos-track">
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
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="dr-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="dr-services-section">
          <div className="dr-services-inner">
            <div className={`dr-section-reveal${visibleSections.has('services') ? ' dr-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="dr-section-eyebrow">Our Services</span>
              <h2 className="dr-section-title">Drupal Development Services We Offer</h2>
              <p className="dr-section-desc">From custom builds and Drupal Commerce stores to enterprise migrations and headless architectures — our certified Drupal developers deliver end-to-end solutions designed for performance, security, and editorial excellence.</p>
            </div>
            <div className="dr-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`dr-service-card${s.featured?' featured':''}`}>
                  <span className="dr-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="dr-services-footer">
              <button className="dr-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show More Drupal Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="dr-tech-section">
          <div className="dr-tech-wrap">
            <div className={`dr-tech-header dr-section-reveal${visibleSections.has('tech') ? ' dr-revealed' : ''}`} ref={el => { sectionRefs.current['tech'] = el; }}>
              <h2 className="dr-tech-title">Our Drupal Technology Stack</h2>
              <p className="dr-tech-subtitle">We build on Drupal 10 core with battle-tested contrib modules, modern front-end tooling, and enterprise DevOps practices for reliable, maintainable platforms.</p>
            </div>
            <div className="dr-tech-groups">
              {[
                { label:'Drupal Core & Contrib', tags:['Drupal 10','Views','Paragraphs','Webform','Pathauto','Metatag','Token','Search API'] },
                { label:'Frontend & Theming', tags:['Twig','Olivero','Claro','Storybook','Tailwind CSS','React','Next.js','Gatsby'] },
                { label:'Commerce & Payments', tags:['Drupal Commerce','Commerce Stripe','Commerce PayPal','Commerce Shipping','Rules','Price'] },
                { label:'APIs & Integrations', tags:['JSON:API','GraphQL','REST API','Salesforce','HubSpot','Marketo','Mailchimp','SendGrid'] },
                { label:'DevOps & Hosting', tags:['Acquia','Pantheon','Platform.sh','AWS','Docker','Lando','DDEV','GitHub Actions','Drush'] },
                { label:'Performance & Security', tags:['Varnish','Redis','CDN','Memcached','Security Review','Paranoia','Two-factor Auth','GDPR'] },
              ].map(group => (
                <div className="dr-tech-group" key={group.label}>
                  <div className="dr-tech-group-title">{group.label}</div>
                  <div className="dr-tech-tags">
                    {group.tags.map(tag => <span className="dr-tech-tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="dr-process-section">
          <div className="dr-process-top">
            <div className={`dr-section-reveal${visibleSections.has('process') ? ' dr-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="dr-process-eyebrow">HOW WE WORK</p>
              <h2 className="dr-process-main-title">How We Deliver Drupal Development Projects</h2>
              <p className="dr-process-main-desc">Our Drupal developers follow a structured delivery process refined over 15+ years of remote project delivery for clients in the US, Canada, and Australia. Clear milestones, weekly demos, and full code ownership handed to you at launch.</p>
            </div>
            <hr className="dr-process-divider" />
          </div>
          <div className="dr-process-inner">
            <div className="dr-process-steps">
              {[
                ['Discover','We start with a free scoping call to understand your content strategy, editorial workflows, integration requirements, and technical constraints. Our senior Drupal architect maps out the right content model and module stack before development begins.'],
                ['Define','Together we define the full content architecture — content types, fields, taxonomies, views, user roles, and API contracts. You review and approve the technical specification before a single line of code is written.'],
                ['Develop','Our Drupal team builds in two-week sprints with weekly demos on a shared staging environment. We follow Drupal coding standards, write automated tests, and maintain CI/CD pipelines throughout.'],
                ['Deploy','We handle production deployment to Acquia, Pantheon, or your preferred cloud, configure caching and CDN, hand over full documentation, and provide post-launch support for a smooth go-live.'],
              ].map(([title, desc], i) => (
                <div
                  className={`dr-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="dr-pstep-left">
                    <div className="dr-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="dr-pstep-arrow" />}
                  </div>
                  <div className="dr-pstep-content">
                    <h3 className="dr-pstep-title">{title}</h3>
                    <p className="dr-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="dr-process-image-col">
              <div className="dr-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/office.png" alt="1Solutions Drupal development team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="dr-testi-section">
          <div className="dr-testi-inner">
            <div className={`dr-section-header-center dr-section-reveal${visibleSections.has('testi') ? ' dr-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="dr-section-eyebrow">Client Reviews</span>
              <h2 className="dr-section-title">What Our Clients Say</h2>
              <p className="dr-section-sub">Trusted by enterprises, universities, and fast-growing businesses across the US, Canada, and Australia for 15+ years.</p>
            </div>
            <div className="dr-testi-grid" ref={testiGridRef}>
              {[
                { initials:'RH', bg:'#1a4a7a', text:'"1Solutions migrated our entire Drupal 7 site — over 50,000 nodes — to Drupal 10 without losing a single piece of content or a single ranking. The project was delivered on time and the new site is dramatically faster."', name:'Robert Hughes', role:'Digital Director, StateUniversity.edu — USA', featured:false },
                { initials:'NK', bg:'#0F3460', text:'"We chose 1Solutions for our enterprise Drupal Commerce platform because of their deep module knowledge. They built a custom checkout workflow our team had been trying to solve for years. Outstanding technical depth."', name:'Nina Kowalski', role:'CTO, RetailGroup — Australia', featured:true },
                { initials:'MP', bg:'#2d5a8e', text:'"Their headless Drupal + Next.js build cut our page load times by 70%. The editorial team loves the Drupal admin and our front-end team loves the React flexibility. Best of both worlds, delivered on budget."', name:'Marcus Payne', role:'VP Engineering, MediaCorp — Canada', featured:false },
              ].map((t,i) => (
                <div className={`dr-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' dr-tcard-visible':''}`} key={t.name}>
                  <div className="dr-tcard-stars">★★★★★</div>
                  <p className="dr-tcard-text">{t.text}</p>
                  <div className="dr-tcard-author">
                    <div className="dr-tcard-avatar" style={{ background:t.bg }}>{t.initials}</div>
                    <div>
                      <div className="dr-tcard-name">{t.name}</div>
                      <div className="dr-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="dr-testi-stats">
              {[['4.9/5','Average Rating'],['200+','Verified Reviews'],['98%','Client Satisfaction'],['97%','Repeat Clients']].map(([num,label],i,arr) => (
                <>
                  <div className="dr-tstat" key={label}>
                    <span className="dr-tstat-num">{num}</span>
                    <span className="dr-tstat-label">{label}</span>
                  </div>
                  {i < arr.length-1 && <div className="dr-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="dr-why-section">
          <div className="dr-why-inner">
            <div className={`dr-section-reveal${visibleSections.has('why') ? ' dr-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center',marginBottom:0 }}>
              <span className="dr-section-eyebrow">Why 1Solutions</span>
              <h2 className="dr-section-title">Why Businesses Choose Us for Drupal Development</h2>
              <p className="dr-section-sub" style={{ maxWidth:680,margin:'0 auto' }}>We don't just configure Drupal — we architect scalable, secure, and maintainable platforms. Here's what sets us apart from freelancers and generic agencies.</p>
            </div>
            <div className="dr-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`dr-why-card${visibleWhyCards.includes(i) ? ' dr-card-visible' : ''}`} key={w.title}>
                  <div className="dr-why-card-header">
                    <div className="dr-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="dr-engage-section">
          <div className="dr-engage-inner">
            <div className="dr-engage-left">
              <div className={`dr-section-reveal${visibleSections.has('engage') ? ' dr-revealed' : ''}`} ref={el => { sectionRefs.current['engage'] = el; }}>
                <span className="dr-section-eyebrow">Engagement Models</span>
                <h2 className="dr-engage-title">Flexible Engagement Models Built Around You</h2>
                <p className="dr-engage-desc">We adapt to your project size, timeline, and budget. Whether you need a dedicated Drupal team, a fixed-price build, or ongoing T&M support, we offer full transparency at every stage.</p>
              </div>
              <div className="dr-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Partner-with-us.jpg" alt="Partner With 1Solutions" />
              </div>
            </div>
            <div className="dr-engage-right" ref={eCardsRef}>
              {[
                { title:'Dedicated Team', desc:'Hire a full-time dedicated Drupal team — a senior developer, front-end themer, and project manager working exclusively on your platform with weekly reporting.', features:['Cost-effective Approach','Less Admin Overhead','Rapid Feature Delivery','Timely Reporting'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { title:'Fixed-Price', desc:'Ideal for clearly scoped Drupal projects — new sites, theme builds, or migrations. We agree on deliverables, timeline, and cost upfront. No surprises, no hidden fees.', features:['Full Budget Control','Easy Management','No Hidden Costs','On-time Delivery'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                { title:'Time & Material', desc:'For evolving Drupal projects where requirements change. Perfect for ongoing development, new feature sprints, or long-term platform evolution. Pay only for hours worked.', features:['Maximum Flexibility','Reduced Risk','Iterative Development','Full Transparency'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                { title:'Offshore Development', desc:'Leverage our New Delhi-based Drupal team for significant cost savings without compromising quality. US/AU timezone overlap available with expert Drupal architects.', features:['Access to Expert Talent','Shared Responsibility','Managed Team','Cost-Efficient'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
              ].map((e,i) => (
                <div className={`dr-ecard${visibleECards.includes(i)?' dr-ecard-visible':''}`} key={e.title}>
                  <div className="dr-ecard-header">
                    <div className="dr-ecard-icon">{e.icon}</div>
                    <h3 className="dr-ecard-title">{e.title}</h3>
                  </div>
                  <p className="dr-ecard-desc">{e.desc}</p>
                  <div className="dr-ecard-features">
                    {e.features.map(f => (
                      <div className="dr-efeat" key={f}><span className="dr-efeat-check">✔</span>{f}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="dr-contact-section" id="contact">
          <div className="dr-contact-container">
            <div className="dr-contact-left">
              <h2 className="dr-contact-title">Let's Build Your Drupal Platform Together</h2>
              <p className="dr-contact-desc">Tell us about your project and we'll get back to you within 24 hours with a tailored technical plan.</p>
              <div className="dr-merged-box">
                <div>
                  {[
                    { icon:<svg className="dr-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'Your project details are confidential. We respect your privacy and sign NDAs on request.' },
                    { icon:<svg className="dr-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A senior Drupal architect reviews your requirements — not automated responses.' },
                    { icon:<svg className="dr-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Response within 24 business hours with a detailed technical assessment.' },
                    { icon:<svg className="dr-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:"Free scoping session — no obligation to proceed." },
                  ].map((b,i) => (
                    <div className="dr-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="dr-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="dr-stats-box">
                  <div className="dr-stats-grid">
                    {[['150+','Drupal Projects'],['15+','Years Experience'],['97%','Client Retention']].map(([num,text]) => (
                      <div key={text}>
                        <div className="dr-stat-number">{num}</div>
                        <div className="dr-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="dr-contact-right">
              <div className="dr-form-box">
                <h3>Contact Us</h3>
                <form className="dr-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="dr-form-row">
                    <div className="dr-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="dr-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="dr-form-row">
                    <div className="dr-form-group">
                      <label>Phone Number*</label>
                      <div className="dr-phone-input">
                        <select>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="dr-form-group"><label>Organization*</label><input type="text" placeholder="Organization / Institution*" required /></div>
                  </div>
                  <div className="dr-form-group full"><label>Message*</label><textarea placeholder="Describe your Drupal project requirements..." rows={6} required /></div>
                  <div className="dr-consent">
                    <input type="checkbox" id="dr-consent" required />
                    <label htmlFor="dr-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="dr-submit-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="dr-faq-section" id="faq">
          <div className="dr-faq-inner">
            <h2 className="dr-faq-heading">Frequently Asked Questions</h2>
            <div className="dr-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`dr-faq-item${openFaq===i?' open':''}`} key={i}>
                  <button className="dr-faq-question" onClick={() => setOpenFaq(openFaq===i ? -1 : i)}>
                    <div className="dr-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="dr-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="dr-faq-answer-wrap">
                    <div className="dr-faq-answer"><span className="dr-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="dr-related-section">
          <div className="dr-related-inner">
            <span className="dr-related-eyebrow">DRUPAL RELATED OFFERINGS</span>
            <h2 className="dr-related-title">Explore Related Services and Technologies</h2>
            <p className="dr-related-sub">Pair our Drupal expertise with related services to tackle your most important digital platform and business initiatives.</p>
            <hr className="dr-related-divider" />
            <div className="dr-related-tags">
              {[
                ['Drupal Commerce Development','blue'],['Headless Drupal Development','violet'],['Drupal Migration Services','teal'],
                ['Custom Module Development','amber'],['Drupal Theme Development','indigo'],['Drupal Multisite Development','sky'],
                ['Drupal Performance Optimisation','green'],['Drupal SEO Services','rose'],['Drupal Security Hardening','orange'],
                ['WordPress Development','cyan'],['PHP Development','emerald'],['React.js Development','slate'],
                ['Next.js Development','pink'],['UI/UX Design Services','violet'],['Digital Marketing Services','indigo'],
              ].map(([label,color]) => (
                <Link href="#contact" className={`dr-rtag dr-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
