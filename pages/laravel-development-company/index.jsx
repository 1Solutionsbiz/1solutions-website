'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Custom Laravel Development', desc:'Fully bespoke Laravel applications built from scratch — clean architecture, test-driven, and designed to scale with your business from day one.', featured:false },
  { n:'02', title:'Laravel Web Application Development', desc:'Feature-rich SaaS platforms, internal tools, and business portals built on Laravel — with elegant code, robust security, and rapid development velocity.', featured:true },
  { n:'03', title:'Laravel REST API Development', desc:'Secure, versioned, and well-documented REST APIs built with Laravel — powering mobile apps, SPAs, and third-party integrations at any scale.', featured:false },
  { n:'04', title:'Laravel E-Commerce Development', desc:'Scalable online stores built with Laravel and Shopware or custom cart solutions — with flexible catalogues, payment integrations, and order management.', featured:false },
  { n:'05', title:'Laravel CMS Development', desc:'Content-driven platforms with custom admin panels using Laravel Nova or Filament — giving your team full editorial control without complexity.', featured:false },
  { n:'06', title:'Laravel Package Development', desc:'Reusable, well-tested Laravel packages and service providers — built to Composer standards and published or kept private for your internal ecosystem.', featured:false },
  { n:'07', title:'Third-party API Integration', desc:'Seamlessly connect Laravel with Stripe, PayPal, Salesforce, HubSpot, Twilio, AWS, and other platforms using clean service layer architecture.', featured:false },
  { n:'08', title:'Laravel Migration & Upgrade', desc:'Migrate legacy PHP codebases or older Laravel versions to the latest release — with full test coverage, zero downtime, and modernised architecture.', featured:false },
  { n:'09', title:'Headless Laravel with Vue/React', desc:'Decouple your backend from the frontend — Laravel as a powerful API backend paired with Vue.js, React, or Next.js for a blazing-fast SPA experience.', featured:false },
  { n:'10', title:'Laravel Microservices', desc:'Break monolithic applications into maintainable Laravel microservices with event-driven communication via queues, Redis, and message brokers.', featured:false },
  { n:'11', title:'Laravel Performance Optimisation', desc:'Query optimisation, caching with Redis/Memcached, queue tuning, Horizon monitoring, and Octane integration for sub-100ms response times.', featured:false },
  { n:'12', title:'Laravel Support & Maintenance', desc:'Dedicated support plans with SLA-backed response times — security patches, dependency updates, bug fixes, and ongoing feature development.', featured:false },
];

const FAQS = [
  { q:'What Laravel development services does 1Solutions offer?', a:'We offer end-to-end Laravel development including custom web applications, REST API development, SaaS platform builds, Laravel Nova / Filament admin panels, e-commerce solutions, third-party API integrations, microservices architecture, headless Laravel backends with Vue.js or React, legacy PHP migrations to Laravel, performance optimisation, and ongoing support and maintenance plans.' },
  { q:'How much does a custom Laravel application cost?', a:'Custom Laravel projects typically start from $4,000 for straightforward CRUD applications or APIs, and range to $60,000+ for complex multi-tenant SaaS platforms or enterprise systems with integrations and advanced workflows. Cost depends on scope, feature complexity, integrations, and timeline. We provide a fixed-price quote after a free scoping call — no surprises and no hidden costs.' },
  { q:'How long does a Laravel project take to deliver?', a:'A standard Laravel web application or API takes 4–8 weeks from kick-off to deployment. Complex SaaS platforms with multi-tenancy, payment systems, or ML integrations can take 12–20 weeks. We share a detailed milestone timeline in the proposal and provide weekly demos on a shared staging environment. Our structured delivery process keeps every project on track.' },
  { q:'Do you work with clients in the US, Canada, and Australia?', a:'Yes — we have delivered Laravel projects remotely for clients across the US, Canada, and Australia since 2008. We operate in your time zone, communicate via Slack, Notion, and Loom, and maintain full transparency with regular progress updates. Our 97% client retention rate reflects the quality of our remote delivery.' },
  { q:'Can you migrate our existing PHP or CodeIgniter application to Laravel?', a:'Absolutely. Laravel migration is one of our specialisations. We migrate legacy PHP apps, CodeIgniter, CakePHP, Symfony, and older Laravel (5.x/6.x/7.x/8.x/9.x) codebases to Laravel 11 — rewriting business logic into service classes, introducing Eloquent ORM, implementing proper testing, and deploying with zero downtime. We preserve all data and maintain URL structure for SEO.' },
  { q:'Do you build multi-tenant SaaS applications with Laravel?', a:"Yes. Multi-tenant SaaS is a core Laravel specialisation for us. We implement both single-database (row-level tenancy with packages like Tenancy for Laravel) and multi-database tenancy depending on your isolation and scaling requirements. We handle subdomain routing, tenant onboarding flows, billing with Stripe (via Laravel Cashier), and tenant-scoped queues and notifications." },
  { q:'What is your approach to Laravel security?', a:'Security is built into every layer. We implement CSRF protection, SQL injection prevention via Eloquent, XSS mitigation, rate limiting with Laravel Throttle, API authentication with Laravel Sanctum or Passport, encrypted secrets via .env and AWS Secrets Manager, two-factor authentication, and regular dependency audits with Composer audit. We follow OWASP Top 10 guidelines on every project.' },
  { q:'What makes 1Solutions different from freelance Laravel developers?', a:'Accountability, team depth, and long-term thinking. Unlike freelancers, we provide a dedicated team — a senior Laravel developer, front-end engineer, and project manager — so your project never stalls. We write comprehensive PHPUnit and Pest tests, maintain CI/CD pipelines from day one, document every API endpoint, and offer post-launch maintenance plans so your application stays secure and up to date.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V17H7v2h10v-2h-4v-1.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>, title:'Laravel Specialists Since 2013', desc:'We have shipped 200+ Laravel applications since version 4. We know every version, every breaking change, and every upgrade path — not just the happy path.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'US, Canada & Australia Focused', desc:'We understand the compliance needs, SLA expectations, and product culture of English-speaking western markets — delivering western-standard quality at offshore efficiency.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'On-Time, On-Budget Delivery', desc:'Our Agile process (Discover → Define → Develop → Deploy) ensures projects are scoped tightly and delivered on schedule — with weekly demos and no scope creep.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Security-First Development', desc:'CSRF, XSS, SQL injection, rate limiting, Sanctum/Passport auth, encrypted secrets — OWASP Top 10 compliance is standard, not optional, on every project we ship.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'Test-Driven Development', desc:'Every project ships with PHPUnit and Pest test suites, feature tests, and CI pipelines. Our code is production-ready before it leaves staging — not after.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Dedicated Project Manager', desc:'No ticket queues. You get a single point of contact who speaks plain English, tracks blockers daily, and keeps you informed without requiring you to chase updates.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'Full-Stack Laravel Capability', desc:'Laravel backend, Vue.js / React frontend, MySQL / PostgreSQL, Redis, Docker, AWS — a complete stack under one roof. No handoffs, no finger-pointing, no surprises.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership', desc:'97% client retention rate. We maintain Laravel applications for years after launch — security patches, version upgrades, and dedicated development retainers.' },
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
    <div className="lv-stat-col">
      <div className="lv-stat-label">{label}</div>
      <div className="lv-stat-value">{display}</div>
    </div>
  );
}

export default function LaravelDevelopmentCompany() {
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
        <title>Laravel Development Company | Expert Laravel Development Services | 1Solutions</title>
        <meta name="description" content="1Solutions is a leading Laravel development company with 15+ years experience. We build custom Laravel web apps, SaaS platforms, REST APIs, and e-commerce solutions for US, Canada & Australia." />
        <meta name="keywords" content="laravel development company, laravel development services, custom laravel development, laravel web application development, laravel api development, laravel saas development, laravel agency" />
        <link rel="canonical" href="https://www.1solutions.biz/laravel-development-company/" />
        <meta property="og:title" content="Laravel Development Company | 1Solutions" />
        <meta property="og:description" content="Custom Laravel web applications, SaaS platforms, REST APIs, and e-commerce solutions. 15+ years of PHP & Laravel expertise for US, Canada & Australia." />
        <meta property="og:url" content="https://www.1solutions.biz/laravel-development-company/" />
        <style>{`
          .lv-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            background-attachment: scroll;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .lv-page *, .lv-page *::before, .lv-page *::after { box-sizing: border-box; }

          .lv-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.35) 0%,rgba(139,92,246,0.15) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .lv-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.30) 0%,rgba(245,158,11,0.15) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .lv-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.20) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          .lv-hero-block { background:transparent;position:relative;overflow:hidden; }
          .lv-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .lv-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .lv-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .lv-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .lv-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .lv-hero-content p { font-size:16px;color:#3A507A;line-height:1.65;max-width:620px;margin:0 auto 28px; }
          .lv-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .lv-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(245,158,11,0.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }

          .lv-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .lv-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .lv-stat-col:last-child { border-right:none; }
          .lv-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .lv-stat-value { font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1; }

          .lv-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .lv-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .lv-clients-logos { width:100%;overflow:hidden; }
          .lv-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .lv-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          .lv-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .lv-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .lv-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .lv-section-sub { font-size:16px;color:#4A6080;margin:0; }

          .lv-services-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.18),0 -4px 16px rgba(15,52,96,0.10); }
          .lv-services-inner { max-width:1280px;margin:0 auto; }
          .lv-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .lv-service-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .lv-service-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .lv-service-card.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .lv-service-card:hover .lv-card-num { color:#D97706;opacity:0.12; }
          .lv-service-card:hover h3 { color:#D97706; }
          .lv-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .lv-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .lv-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .lv-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#D97706,#f59e0b);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .lv-service-card:hover::before { transform:scaleY(1); }
          .lv-services-footer { text-align:center;margin-top:20px; }
          .lv-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(15,52,96,0.20);color:#0F3460;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(15,52,96,0.08);font-family:inherit; }
          .lv-btn-show-more:hover { background:#0F3460;border-color:#0F3460;color:#ffffff;box-shadow:0 8px 28px rgba(15,52,96,0.20);transform:translateY(-2px); }

          .lv-tech-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .lv-tech-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,0.95); }
          .lv-tech-header { margin-bottom:36px; }
          .lv-tech-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 12px; }
          .lv-tech-subtitle { font-size:15px;color:#4A6080;line-height:1.6;margin:0; }
          .lv-tech-groups { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .lv-tech-group { background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(15,52,96,0.12);border-radius:12px;padding:22px 24px; }
          .lv-tech-group-title { font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .lv-tech-tags { display:flex;flex-wrap:wrap;gap:8px; }
          .lv-tech-tag { display:inline-block;background:rgba(15,52,96,0.07);border:1px solid rgba(15,52,96,0.12);border-radius:6px;padding:5px 12px;font-size:13px;font-weight:500;color:#0F3460; }

          .lv-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .lv-process-top { max-width:1280px;margin:0 auto 56px; }
          .lv-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .lv-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .lv-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .lv-process-divider { border:none;border-top:1px solid rgba(15,52,96,0.15);margin:36px 0 0;width:100%; }
          .lv-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .lv-process-steps { display:flex;flex-direction:column; }
          .lv-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .lv-pstep.visible { opacity:1;transform:translateY(0); }
          .lv-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .lv-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .lv-pstep:hover .lv-pstep-circle { background:rgba(245,158,11,0.2);border-color:#D97706;color:#D97706; }
          .lv-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .lv-pstep-arrow::before { content:'';width:2px;flex:1;background:#0F3460;opacity:0.25; }
          .lv-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #0F3460;opacity:0.45;margin-top:-1px; }
          .lv-pstep:last-child .lv-pstep-arrow { display:none; }
          .lv-pstep-content { padding:4px 0 44px; }
          .lv-pstep:last-child .lv-pstep-content { padding-bottom:0; }
          .lv-pstep-title { font-size:22px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .lv-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .lv-process-image-col { position:sticky;top:100px;min-width:0; }
          .lv-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(15,52,96,0.15);aspect-ratio:4/5;background:#e8edf5; }
          .lv-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          .lv-testi-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .lv-testi-inner { max-width:1280px;margin:0 auto; }
          .lv-section-header-center { text-align:center;margin-bottom:52px; }
          .lv-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .lv-tcard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .lv-tcard.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .lv-tcard.lv-tcard-visible { opacity:1;transform:translateY(0); }
          .lv-tcard.lv-tcard-visible:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .lv-tcard-stars { font-size:18px;color:#D97706;letter-spacing:2px; }
          .lv-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .lv-tcard.featured .lv-tcard-text { color:#1f2937; }
          .lv-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .lv-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .lv-tcard-name { font-size:14px;font-weight:700;color:#0F3460; }
          .lv-tcard-role { font-size:12px;color:#6b7280; }
          .lv-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .lv-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .lv-tstat-num { font-size:28px;font-weight:800;color:#0F3460; }
          .lv-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .lv-tstat-divider { width:1px;height:40px;background:rgba(15,52,96,0.15); }

          .lv-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .lv-why-inner { max-width:1280px;margin:0 auto; }
          .lv-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .lv-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),background 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .lv-why-card:hover { transform:translateY(-6px) scale(1);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .lv-why-card.lv-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .lv-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .lv-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .lv-why-icon svg { width:28px;height:28px;fill:#D97706; }
          .lv-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .lv-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          .lv-engage-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .lv-engage-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch; }
          .lv-engage-left { position:sticky;top:100px;display:flex;flex-direction:column; }
          .lv-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .lv-engage-desc { font-size:15px;color:#3A507A;line-height:1.75;margin:0 0 32px; }
          .lv-engage-img-wrap { border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(15,52,96,0.15);flex:1;min-height:300px; }
          .lv-engage-img-wrap img { width:100%;height:100%;min-height:300px;object-fit:cover;display:block; }
          .lv-engage-right { display:flex;flex-direction:column;gap:16px; }
          .lv-ecard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),background 0.3s,border-color 0.3s; }
          .lv-ecard.lv-ecard-visible { opacity:1;transform:translateX(0); }
          .lv-ecard.lv-ecard-visible:hover { border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1);transform:translateX(4px); }
          .lv-ecard-header { display:flex;align-items:center;gap:14px;margin-bottom:10px; }
          .lv-ecard-icon { width:44px;height:44px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .lv-ecard-icon svg { width:26px;height:26px;stroke:#D97706;fill:none; }
          .lv-ecard-title { font-size:18px;font-weight:700;color:#0F3460;margin:0; }
          .lv-ecard-desc { font-size:14px;color:#3A507A;line-height:1.65;margin:0 0 16px; }
          .lv-ecard-features { display:grid;grid-template-columns:1fr 1fr;gap:8px 16px; }
          .lv-efeat { display:flex;align-items:center;gap:8px;font-size:13px;color:#2A3F6F;font-weight:500; }
          .lv-efeat-check { color:#D97706;font-size:12px;flex-shrink:0; }

          .lv-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .lv-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .lv-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .lv-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .lv-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .lv-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .lv-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .lv-benefit-icon { width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75; }
          .lv-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .lv-stats-box { padding-top:32px;border-top:1px solid rgba(15,52,96,0.12); }
          .lv-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .lv-stat-number { font-size:40px;font-weight:900;color:#0F3460;line-height:1;display:inline-block;margin-bottom:4px; }
          .lv-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .lv-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .lv-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .lv-contact-form { display:flex;flex-direction:column;gap:16px; }
          .lv-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .lv-form-group { display:flex;flex-direction:column;gap:6px; }
          .lv-form-group.full { grid-column:1/-1; }
          .lv-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .lv-form-group input,.lv-form-group textarea,.lv-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .lv-form-group input:focus,.lv-form-group textarea:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12); }
          .lv-phone-input { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .lv-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .lv-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .lv-phone-input input:focus { outline:none; }
          .lv-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .lv-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .lv-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .lv-consent a { color:#0F3460;text-decoration:none; }
          .lv-submit-btn { padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .lv-submit-btn:hover { background:rgba(15,52,96,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }

          .lv-faq-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .lv-faq-inner { max-width:1280px;margin:0 auto; }
          .lv-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .lv-faq-list { display:flex;flex-direction:column;gap:12px; }
          .lv-faq-item { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .lv-faq-item.open { border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .lv-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .lv-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .lv-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .lv-faq-item.open .lv-faq-q-badge { background:#D97706;color:#fff; }
          .lv-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .lv-faq-item.open .lv-faq-question span { color:#D97706; }
          .lv-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .lv-faq-item.open .lv-faq-chevron { transform:rotate(180deg);color:#D97706; }
          .lv-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .lv-faq-item.open .lv-faq-answer-wrap { max-height:400px; }
          .lv-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .lv-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#0F3460;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          .lv-related-section { background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .lv-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .lv-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .lv-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .lv-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .lv-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0; }
          .lv-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .lv-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .lv-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .lv-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .lv-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .lv-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .lv-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .lv-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .lv-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .lv-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .lv-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .lv-rtag-cyan    { background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490; }
          .lv-rtag-pink    { background:rgba(236,72,153,0.10);border-color:rgba(236,72,153,0.28);color:#9D174D; }
          .lv-rtag-slate   { background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155; }
          .lv-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }
          .lv-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }

          .lv-btn-hero-shimmer { position:relative;overflow:hidden; }
          .lv-btn-hero-shimmer::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:lv-shimmer-sweep 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes lv-shimmer-sweep { 0% { left:-120%; } 35%,100% { left:160%; } }

          .lv-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .lv-section-reveal.lv-revealed { opacity:1;transform:translateY(0); }

          .lv-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:lv-marquee 28s linear infinite; }
          .lv-logos-track:hover { animation-play-state:paused; }
          @keyframes lv-marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }

          @media (max-width:1024px) {
            .lv-hero-content h1 { font-size:40px; }
            .lv-services-grid { grid-template-columns:repeat(2,1fr); }
            .lv-why-grid { grid-template-columns:repeat(2,1fr); }
            .lv-tech-groups { grid-template-columns:repeat(2,1fr); }
            .lv-engage-inner { grid-template-columns:1fr; }
            .lv-engage-left { position:static; }
            .lv-process-inner { grid-template-columns:1fr; }
            .lv-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .lv-page { overflow-x:hidden; }
            .lv-hero-content { padding:36px 20px 24px; }
            .lv-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .lv-hero-content p { font-size:15px; }
            .lv-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .lv-stat-col { padding:14px 12px; }
            .lv-stat-col:nth-child(2) { border-right:none; }
            .lv-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .lv-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .lv-stat-value { font-size:22px; }
            .lv-clients-bar { padding:16px 20px 36px;gap:12px; }
            .lv-services-section { padding:48px 20px 40px; }
            .lv-tech-section { padding:48px 16px; }
            .lv-tech-wrap { padding:24px 20px 32px;border-radius:16px; }
            .lv-tech-groups { grid-template-columns:1fr; }
            .lv-process-section { padding:60px 20px; }
            .lv-process-top { margin-bottom:36px; }
            .lv-testi-section { padding:60px 20px; }
            .lv-testi-section .lv-section-header-center { text-align:left; }
            .lv-why-section { padding:60px 20px; }
            .lv-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .lv-why-card { padding:24px 20px; }
            .lv-engage-section { padding:60px 20px; }
            .lv-contact-section { padding:48px 16px; }
            .lv-contact-container { grid-template-columns:1fr;gap:20px; }
            .lv-contact-title { font-size:28px; }
            .lv-faq-section { padding:60px 20px; }
            .lv-faq-heading { font-size:26px; }
            .lv-faq-question { padding:18px 18px 18px 52px; }
            .lv-faq-question span { font-size:14px; }
            .lv-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .lv-faq-q-badge { left:14px; }
            .lv-related-section { padding:60px 20px; }
            .lv-related-tags { gap:8px; }
            .lv-rtag { padding:9px 16px;font-size:13px; }
            .lv-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .lv-testi-grid { grid-template-columns:1fr; }
            .lv-section-title,.lv-engage-title,.lv-process-main-title,.lv-related-title { font-size:30px; }
            .lv-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .lv-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(15,52,96,0.10); }
            .lv-tstat:nth-child(odd) { border-right:1px solid rgba(15,52,96,0.10); }
            .lv-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .lv-tstat-divider { display:none; }
            .lv-form-row { grid-template-columns:1fr; }
            .lv-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .lv-stat-number { font-size:28px; }
            .lv-tech-title { font-size:26px; }
          }
          @media (max-width:480px) {
            .lv-hero-content h1 { font-size:24px; }
            .lv-section-title,.lv-engage-title,.lv-process-main-title,.lv-related-title { font-size:26px; }
            .lv-services-grid { grid-template-columns:1fr; }
            .lv-service-card { padding:20px 18px 18px; }
            .lv-card-num { font-size:52px; }
            .lv-pstep-title { font-size:18px; }
            .lv-contact-title { font-size:24px; }
            .lv-engage-title { font-size:26px; }
            .lv-tcard { padding:24px 20px; }
            .lv-ecard { padding:20px; }
            .lv-ecard-features { grid-template-columns:1fr; }
            .lv-merged-box { padding:18px; }
          }
        `}</style>
      </Head>

      <div className="lv-page">
        <div className="lv-orb-1" />
        <div className="lv-orb-2" />
        <div className="lv-orb-3" />

        {/* ── HERO ── */}
        <div className="lv-hero-block">
          <div className="lv-hero-content">
            <span className="lv-eyebrow">Expert Laravel Development Company</span>
            <h1>Laravel Development Services — Build Powerful PHP Applications, Faster</h1>
            <p>From SaaS platforms and REST APIs to multi-tenant applications and e-commerce backends — 1Solutions delivers production-grade Laravel solutions for businesses across the US, Canada, and Australia. Clean code, full tests, on-time delivery.</p>
            <Link href="#contact" className="lv-btn-hero lv-btn-hero-shimmer">Get a Free Consultation Now</Link>
          </div>

          <div className="lv-hero-stats" ref={statsRef}>
            {[['Laravel Projects','200+'],['PHP/Laravel Experts','25+'],['Years in Business','15+'],['Client Retention','97%']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="lv-clients-bar">
            <span className="lv-clients-label">Trusted by Leading Brands</span>
            <div className="lv-clients-logos">
              <div className="lv-logos-track">
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
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="lv-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="lv-services-section">
          <div className="lv-services-inner">
            <div className={`lv-section-reveal${visibleSections.has('services') ? ' lv-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="lv-section-eyebrow">Our Services</span>
              <h2 className="lv-section-title">Laravel Development Services We Offer</h2>
              <p className="lv-section-desc">From rapid prototypes and REST APIs to complex multi-tenant SaaS platforms and microservices — our senior Laravel developers deliver clean, tested, and maintainable code built for the long term.</p>
            </div>
            <div className="lv-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`lv-service-card${s.featured?' featured':''}`}>
                  <span className="lv-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="lv-services-footer">
              <button className="lv-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show More Laravel Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="lv-tech-section">
          <div className="lv-tech-wrap">
            <div className={`lv-tech-header lv-section-reveal${visibleSections.has('tech') ? ' lv-revealed' : ''}`} ref={el => { sectionRefs.current['tech'] = el; }}>
              <h2 className="lv-tech-title">Our Laravel Technology Stack</h2>
              <p className="lv-tech-subtitle">We use the latest Laravel ecosystem tools — chosen for stability, community support, and production readiness on every project we ship.</p>
            </div>
            <div className="lv-tech-groups">
              {[
                { label:'Laravel Core', tags:['Laravel 11','Eloquent ORM','Artisan','Blade','Laravel Sanctum','Laravel Passport','Laravel Horizon','Laravel Octane'] },
                { label:'Admin & CMS', tags:['Laravel Nova','Filament','Backpack for Laravel','Laravel Jetstream','Laravel Breeze','Spatie Media Library'] },
                { label:'Frontend', tags:['Vue.js 3','React','Inertia.js','Livewire','Alpine.js','Vite','Tailwind CSS','Next.js'] },
                { label:'Database & Cache', tags:['MySQL','PostgreSQL','SQLite','Redis','Memcached','Elasticsearch','MongoDB','PlanetScale'] },
                { label:'DevOps & Cloud', tags:['AWS','Laravel Forge','Laravel Vapor','Docker','GitHub Actions','Nginx','Supervisor','Cloudflare'] },
                { label:'Testing & Quality', tags:['PHPUnit','Pest','Laravel Dusk','Mockery','PHPStan','Larastan','PHPCS','Composer Audit'] },
              ].map(group => (
                <div className="lv-tech-group" key={group.label}>
                  <div className="lv-tech-group-title">{group.label}</div>
                  <div className="lv-tech-tags">
                    {group.tags.map(tag => <span className="lv-tech-tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="lv-process-section">
          <div className="lv-process-top">
            <div className={`lv-section-reveal${visibleSections.has('process') ? ' lv-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="lv-process-eyebrow">HOW WE WORK</p>
              <h2 className="lv-process-main-title">How We Deliver Laravel Development Projects</h2>
              <p className="lv-process-main-desc">Our Laravel developers follow an Agile delivery process refined over 15+ years of remote project delivery for clients in the US, Canada, and Australia. Clear milestones, weekly demos on staging, and full code ownership transferred to you at launch.</p>
            </div>
            <hr className="lv-process-divider" />
          </div>
          <div className="lv-process-inner">
            <div className="lv-process-steps">
              {[
                ['Discover','We begin with a free scoping call to understand your business logic, user flows, integration requirements, and technical constraints. Our senior Laravel architect maps out the right data model, API contracts, and service architecture before a single line of code is written.'],
                ['Define','Together we produce a full technical specification — database schema, Eloquent models, API endpoints, authentication flow, queue jobs, and third-party integrations. You approve the spec before development begins — no scope creep, no surprises.'],
                ['Develop','We build in two-week Agile sprints with weekly demos on a shared staging environment. All code is peer-reviewed, covered by PHPUnit/Pest tests, and deployed via CI/CD pipelines. You see real progress every week.'],
                ['Deploy','We handle production deployment via Laravel Forge or Vapor, configure queues, caching, and monitoring, hand over full documentation and runbooks, then provide post-launch support to ensure everything runs smoothly.'],
              ].map(([title, desc], i) => (
                <div
                  className={`lv-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="lv-pstep-left">
                    <div className="lv-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="lv-pstep-arrow" />}
                  </div>
                  <div className="lv-pstep-content">
                    <h3 className="lv-pstep-title">{title}</h3>
                    <p className="lv-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lv-process-image-col">
              <div className="lv-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/office.png" alt="1Solutions Laravel development team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="lv-testi-section">
          <div className="lv-testi-inner">
            <div className={`lv-section-header-center lv-section-reveal${visibleSections.has('testi') ? ' lv-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="lv-section-eyebrow">Client Reviews</span>
              <h2 className="lv-section-title">What Our Clients Say</h2>
              <p className="lv-section-sub">Trusted by SaaS founders, enterprises, and agencies across the US, Canada, and Australia for 15+ years.</p>
            </div>
            <div className="lv-testi-grid" ref={testiGridRef}>
              {[
                { initials:'TK', bg:'#1a4a7a', text:'"1Solutions rebuilt our legacy PHP monolith as a multi-tenant Laravel SaaS in 14 weeks. The code quality is exceptional — well-structured, fully tested, and easy for our in-house team to extend. Worth every dollar."', name:'Tyler Kwan', role:'CTO, ProjectFlow SaaS — USA', featured:false },
                { initials:'JF', bg:'#0F3460', text:'"They built our Laravel REST API from scratch — 80+ endpoints, Stripe billing, Sanctum auth, and a Filament admin panel. Delivered on time, zero bugs in production. The best PHP team we have ever worked with."', name:'Jessica Foster', role:'Founder, LegalTrack — Australia', featured:true },
                { initials:'BM', bg:'#2d5a8e', text:'"We had a critical CodeIgniter app that needed migrating to Laravel 10 urgently. 1Solutions completed the migration in 6 weeks with zero downtime and full test coverage. Incredibly professional and responsive."', name:'Ben McAllister', role:'Engineering Lead, OpsCentral — Canada', featured:false },
              ].map((t,i) => (
                <div className={`lv-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' lv-tcard-visible':''}`} key={t.name}>
                  <div className="lv-tcard-stars">★★★★★</div>
                  <p className="lv-tcard-text">{t.text}</p>
                  <div className="lv-tcard-author">
                    <div className="lv-tcard-avatar" style={{ background:t.bg }}>{t.initials}</div>
                    <div>
                      <div className="lv-tcard-name">{t.name}</div>
                      <div className="lv-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lv-testi-stats">
              {[['4.9/5','Average Rating'],['200+','Verified Reviews'],['98%','Client Satisfaction'],['97%','Repeat Clients']].map(([num,label],i,arr) => (
                <>
                  <div className="lv-tstat" key={label}>
                    <span className="lv-tstat-num">{num}</span>
                    <span className="lv-tstat-label">{label}</span>
                  </div>
                  {i < arr.length-1 && <div className="lv-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="lv-why-section">
          <div className="lv-why-inner">
            <div className={`lv-section-reveal${visibleSections.has('why') ? ' lv-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center',marginBottom:0 }}>
              <span className="lv-section-eyebrow">Why 1Solutions</span>
              <h2 className="lv-section-title">Why Businesses Choose Us for Laravel Development</h2>
              <p className="lv-section-sub" style={{ maxWidth:680,margin:'0 auto' }}>We don't just write Laravel code — we engineer reliable, scalable applications. Here's what sets us apart from freelancers and generic PHP shops.</p>
            </div>
            <div className="lv-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`lv-why-card${visibleWhyCards.includes(i) ? ' lv-card-visible' : ''}`} key={w.title}>
                  <div className="lv-why-card-header">
                    <div className="lv-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="lv-engage-section">
          <div className="lv-engage-inner">
            <div className="lv-engage-left">
              <div className={`lv-section-reveal${visibleSections.has('engage') ? ' lv-revealed' : ''}`} ref={el => { sectionRefs.current['engage'] = el; }}>
                <span className="lv-section-eyebrow">Engagement Models</span>
                <h2 className="lv-engage-title">Flexible Engagement Models Built Around You</h2>
                <p className="lv-engage-desc">We adapt to your project size, timeline, and budget. Whether you need a dedicated Laravel team, a fixed-price build, or flexible T&M, we provide full transparency and accountability at every step.</p>
              </div>
              <div className="lv-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Partner-with-us.jpg" alt="Partner With 1Solutions" />
              </div>
            </div>
            <div className="lv-engage-right" ref={eCardsRef}>
              {[
                { title:'Dedicated Team', desc:'Hire a full-time dedicated Laravel team — a senior developer, front-end engineer, and project manager working exclusively on your application with weekly reporting and demos.', features:['Cost-effective Approach','Less Admin Overhead','Rapid Feature Velocity','Timely Reporting'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { title:'Fixed-Price', desc:'Ideal for clearly scoped Laravel projects — new applications, API builds, or migrations. Agreed deliverables, timeline, and cost upfront. No surprises, no hidden fees.', features:['Full Budget Control','Easy Management','No Hidden Costs','On-time Delivery'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                { title:'Time & Material', desc:'For evolving Laravel products where requirements change over time. Perfect for SaaS startups in discovery or ongoing feature development. Pay only for hours worked.', features:['Maximum Flexibility','Reduced Risk','Iterative Development','Full Transparency'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                { title:'Offshore Development', desc:'Leverage our New Delhi-based Laravel team for significant cost savings without quality compromise. Senior developers at offshore rates with US/AU timezone overlap available.', features:['Access to Expert Talent','Shared Responsibility','Managed Team','Cost-Efficient'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
              ].map((e,i) => (
                <div className={`lv-ecard${visibleECards.includes(i)?' lv-ecard-visible':''}`} key={e.title}>
                  <div className="lv-ecard-header">
                    <div className="lv-ecard-icon">{e.icon}</div>
                    <h3 className="lv-ecard-title">{e.title}</h3>
                  </div>
                  <p className="lv-ecard-desc">{e.desc}</p>
                  <div className="lv-ecard-features">
                    {e.features.map(f => (
                      <div className="lv-efeat" key={f}><span className="lv-efeat-check">✔</span>{f}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="lv-contact-section" id="contact">
          <div className="lv-contact-container">
            <div className="lv-contact-left">
              <h2 className="lv-contact-title">Let's Build Your Laravel Application Together</h2>
              <p className="lv-contact-desc">Tell us about your project and we'll get back to you within 24 hours with a tailored technical plan.</p>
              <div className="lv-merged-box">
                <div>
                  {[
                    { icon:<svg className="lv-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'Your project details are confidential. We respect your privacy and sign NDAs on request.' },
                    { icon:<svg className="lv-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A senior Laravel architect reviews your requirements — not automated responses.' },
                    { icon:<svg className="lv-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Response within 24 business hours with a detailed technical assessment.' },
                    { icon:<svg className="lv-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:"Free scoping session — no obligation to proceed." },
                  ].map((b,i) => (
                    <div className="lv-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="lv-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="lv-stats-box">
                  <div className="lv-stats-grid">
                    {[['200+','Laravel Projects'],['15+','Years Experience'],['97%','Client Retention']].map(([num,text]) => (
                      <div key={text}>
                        <div className="lv-stat-number">{num}</div>
                        <div className="lv-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="lv-contact-right">
              <div className="lv-form-box">
                <h3>Contact Us</h3>
                <form className="lv-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="lv-form-row">
                    <div className="lv-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="lv-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="lv-form-row">
                    <div className="lv-form-group">
                      <label>Phone Number*</label>
                      <div className="lv-phone-input">
                        <select>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="lv-form-group"><label>Organization*</label><input type="text" placeholder="Organization / Institution*" required /></div>
                  </div>
                  <div className="lv-form-group full"><label>Message*</label><textarea placeholder="Describe your Laravel project requirements..." rows={6} required /></div>
                  <div className="lv-consent">
                    <input type="checkbox" id="lv-consent" required />
                    <label htmlFor="lv-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="lv-submit-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="lv-faq-section" id="faq">
          <div className="lv-faq-inner">
            <h2 className="lv-faq-heading">Frequently Asked Questions</h2>
            <div className="lv-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`lv-faq-item${openFaq===i?' open':''}`} key={i}>
                  <button className="lv-faq-question" onClick={() => setOpenFaq(openFaq===i ? -1 : i)}>
                    <div className="lv-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="lv-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="lv-faq-answer-wrap">
                    <div className="lv-faq-answer"><span className="lv-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="lv-related-section">
          <div className="lv-related-inner">
            <span className="lv-related-eyebrow">LARAVEL RELATED OFFERINGS</span>
            <h2 className="lv-related-title">Explore Related Services and Technologies</h2>
            <p className="lv-related-sub">Pair our Laravel expertise with related services to build complete, production-ready digital products.</p>
            <hr className="lv-related-divider" />
            <div className="lv-related-tags">
              {[
                ['Laravel SaaS Development','blue'],['Laravel REST API Development','violet'],['Laravel Nova / Filament','teal'],
                ['Multi-tenant Laravel Apps','amber'],['Laravel E-Commerce','indigo'],['Laravel Microservices','sky'],
                ['PHP Migration to Laravel','green'],['Laravel Performance Optimisation','rose'],['Laravel Security Hardening','orange'],
                ['Vue.js Development','cyan'],['React.js Development','emerald'],['WordPress Development','slate'],
                ['Node.js Development','pink'],['UI/UX Design Services','violet'],['Digital Marketing Services','indigo'],
              ].map(([label,color]) => (
                <Link href="#contact" className={`lv-rtag lv-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
