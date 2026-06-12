'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Custom CodeIgniter Application Development', desc:'Bespoke web applications built from the ground up on CodeIgniter — fast, secure, and architected for maintainability. No bloated frameworks, no unnecessary overhead.', featured:false },
  { n:'02', title:'CodeIgniter REST API Development', desc:'Robust, versioned REST APIs built on CodeIgniter for web apps, mobile apps, and third-party integrations — with JWT/OAuth authentication, rate limiting, and full documentation.', featured:true },
  { n:'03', title:'CodeIgniter CMS Development', desc:'Custom content management systems tailored to your editorial workflow — flexible schemas, role-based access control, and clean admin interfaces built on CodeIgniter.', featured:false },
  { n:'04', title:'CodeIgniter eCommerce Development', desc:'Lightweight, fast e-commerce platforms on CodeIgniter for businesses that need a custom checkout, unique pricing logic, or a product catalogue that no off-the-shelf platform handles well.', featured:false },
  { n:'05', title:'CodeIgniter Web Portal Development', desc:'B2B portals, client dashboards, vendor management systems, and membership platforms — complex multi-role web applications built on CodeIgniter\'s clean MVC architecture.', featured:false },
  { n:'06', title:'Legacy CodeIgniter Upgrades', desc:'Upgrade ageing CodeIgniter 2.x or 3.x applications to CodeIgniter 4 — modernising architecture, fixing security vulnerabilities, and improving performance without rebuilding from scratch.', featured:false },
  { n:'07', title:'CodeIgniter to Laravel Migration', desc:'Migrate mature CodeIgniter applications to Laravel when your project needs advanced tooling — Eloquent ORM, artisan CLI, queues, and the broader Laravel ecosystem.', featured:false },
  { n:'08', title:'Third-Party API & Integration', desc:'Connect your CodeIgniter application with payment gateways, CRMs, ERPs, SMS gateways, social login providers, shipping APIs, and any third-party service via REST or SOAP.', featured:false },
  { n:'09', title:'CodeIgniter Performance Optimization', desc:'Profiling, query optimisation, caching (file, Redis, Memcached), code refactoring, and server-level tuning to dramatically improve response times and handle higher traffic loads.', featured:false },
  { n:'10', title:'CodeIgniter Security Audits', desc:'Comprehensive security reviews covering SQL injection, XSS, CSRF, session hijacking, and privilege escalation vulnerabilities — with a detailed remediation report and fix implementation.', featured:false },
  { n:'11', title:'Plugin & Library Development', desc:'Custom CodeIgniter libraries, helpers, and hooks built to your exact requirements — reusable, well-documented, and following CI\'s conventions for easy team adoption.', featured:false },
  { n:'12', title:'Maintenance & Ongoing Support', desc:'Proactive maintenance, security patches, bug fixes, dependency updates, and dedicated support plans to keep your CodeIgniter application running reliably and securely.', featured:false },
];

const FAQS = [
  { q:'Is CodeIgniter still a good choice for new projects in 2024?', a:'Yes — CodeIgniter 4 is a modern, actively maintained framework with a clean architecture, excellent performance, and a very low learning curve. It\'s an ideal choice for projects that need to move fast without the configuration overhead of larger frameworks. It\'s particularly well-suited for APIs, admin panels, lightweight SaaS applications, and projects where simplicity and performance matter more than a large ecosystem. For larger applications that need a full ORM, job queues, and broadcasting, Laravel is often the better choice — and we\'ll give you an honest recommendation.' },
  { q:'How much does CodeIgniter development cost?', a:'A simple CodeIgniter web application or API typically starts from $2,000–$5,000. A more complex custom portal, multi-role SaaS platform, or legacy upgrade project can range from $8,000 to $30,000+. Cost drivers include: application complexity, number of integrations, database design complexity, and whether legacy code needs to be analysed and refactored. We provide a detailed fixed-price quote after a free discovery call.' },
  { q:'How long does a CodeIgniter project take to build?', a:'A straightforward CodeIgniter REST API or admin panel typically takes 2–4 weeks. A more complex multi-module application, legacy upgrade, or B2B portal can take 6–16 weeks depending on scope. We always share a detailed milestone timeline in the proposal stage so you know exactly what to expect — no vague "it depends" answers.' },
  { q:'Can you upgrade our existing CodeIgniter 2.x or 3.x application?', a:'Yes. We regularly upgrade CodeIgniter 2.x and 3.x applications to CodeIgniter 4. Our process includes a full code audit, dependency analysis, architecture assessment, incremental refactoring, and thorough regression testing. We use staging environments throughout so your live application is never at risk. Where a full upgrade is too costly, we can also implement targeted security patches on older versions.' },
  { q:'Can you migrate our CodeIgniter app to Laravel?', a:'Yes. Migration from CodeIgniter to Laravel is a common project for us — particularly when a growing application needs Eloquent ORM, artisan tooling, job queues, event broadcasting, or the richer testing infrastructure that Laravel provides. We migrate incrementally where possible, starting with the most business-critical modules, and handle database migrations, authentication, and third-party integration re-wiring.' },
  { q:'Do you provide CodeIgniter REST API development for mobile apps?', a:'Yes. Building JWT-authenticated REST APIs on CodeIgniter for iOS and Android apps is one of our most frequent project types. We follow RESTful conventions, implement versioning, handle rate limiting and CORS, and provide full Postman/Swagger documentation. Every API is load-tested before delivery.' },
  { q:'How do you ensure our CodeIgniter application is secure?', a:'Security is built into our development process from day one. We follow OWASP guidelines for every CodeIgniter project: parameterised queries (no raw SQL), output escaping, CSRF token validation, session security hardening, input validation, and secure file upload handling. For existing applications, we offer dedicated security audits with a full vulnerability report and fix implementation.' },
  { q:'Can you integrate our CodeIgniter application with third-party services?', a:'Yes. We integrate CodeIgniter applications with virtually any third-party service — Stripe, PayPal, Razorpay, Salesforce, HubSpot, SAP, Twilio, SendGrid, AWS S3, social login (Google, Facebook), shipping carriers (FedEx, UPS, DHL), and custom enterprise systems via REST or SOAP APIs. We also build custom middleware where direct integration isn\'t feasible.' },
  { q:'Do you work with clients in the US, Canada, Australia, and the UK?', a:'Yes — 100% of our development is delivered remotely. We have been working with US, Canadian, Australian, and UK businesses since 2008. We schedule calls in your time zone, collaborate via Slack, Notion, and Loom, and provide full project transparency at every stage. Our 97% client retention rate is a direct result of this communication-first approach.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V17H7v2h10v-2h-4v-1.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z"/></svg>, title:'15+ Years of PHP Expertise', desc:'Since 2008, we\'ve built hundreds of PHP web applications across CodeIgniter, Laravel, Symfony, and custom MVC frameworks. Deep platform knowledge means fewer surprises, faster delivery, and better architectural decisions from day one.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'Western Market Specialists', desc:'We understand the delivery standards, code quality expectations, and communication style that US, Canadian, and Australian clients expect. Offshore rates, western-market quality.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'On-Time, On-Budget Delivery', desc:'Our structured 4D process (Discover → Define → Develop → Deploy) ensures every project is scoped precisely and delivered on schedule — no surprise invoices for scope we should have caught at the start.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Security-First Development', desc:'Every CodeIgniter application we build follows OWASP guidelines from day one — parameterised queries, CSRF protection, output escaping, session hardening, and thorough input validation as standard.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'Clean, Documented Code', desc:'We write clean, well-structured CodeIgniter code following MVC conventions — fully documented, easy for your in-house team to extend, and built for long-term maintainability.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'Honest Technology Advice', desc:"We won't push CodeIgniter when Laravel or a different framework better fits your project's scale. We recommend what's right for you — not what's easiest for us to bill." },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Dedicated Project Manager', desc:'A single point of contact who manages your project end-to-end — schedules calls in your time zone, provides regular updates, and ensures nothing slips between development and delivery.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership', desc:'97% client retention rate. We build long-term relationships — not one-shot projects. Post-launch, we remain your CodeIgniter partner for maintenance, upgrades, and new features.' },
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
    <div className="ci-stat-col">
      <div className="ci-stat-label">{label}</div>
      <div className="ci-stat-value">{display}</div>
    </div>
  );
}

export default function CodeIgniterDevelopmentCompany() {
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
        <title>CodeIgniter Development Company | Expert CodeIgniter Development Services | 1Solutions</title>
        <meta name="description" content="1Solutions is a leading CodeIgniter development company with 15+ years experience. We build custom CodeIgniter web applications, REST APIs, portals, and legacy upgrades for US, Canada & Australia." />
        <meta name="keywords" content="codeigniter development company, codeigniter development services, codeigniter web application, codeigniter rest api, codeigniter developer, codeigniter agency" />
        <link rel="canonical" href="https://www.1solutions.biz/codeigniter-development-company/" />
        <meta property="og:title" content="CodeIgniter Development Company | 1Solutions" />
        <meta property="og:description" content="Build fast, secure, and maintainable CodeIgniter web applications with 1Solutions' expert PHP development team for US, Canada & Australia." />
        <meta property="og:url" content="https://www.1solutions.biz/codeigniter-development-company/" />
        <style>{`
          .ci-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #e8f0fa 0%, #d6e4f7 25%, #e8edf8 55%, #f0f4fb 80%, #e8f0fa 100%);
            background-attachment: scroll;
            color: #0a1628;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .ci-page *, .ci-page *::before, .ci-page *::after { box-sizing: border-box; }

          /* Orbs */
          .ci-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(17,65,113,0.22) 0%,rgba(15,52,96,0.08) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .ci-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.18) 0%,rgba(180,83,9,0.06) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .ci-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(17,65,113,0.12) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* Hero */
          .ci-hero-block { background:transparent;position:relative;overflow:hidden; }
          .ci-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(17,65,113,0.09) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .ci-hero-block::after  { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.11) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .ci-hero-content { position:relative;z-index:2;text-align:center;max-width:880px;margin:0 auto;padding:56px 40px 40px; }
          .ci-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#114171;margin-bottom:18px; }
          .ci-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#114171 55%,#1a5a9a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .ci-hero-content p { font-size:16px;color:#1a3050;line-height:1.65;max-width:640px;margin:0 auto 28px; }
          .ci-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.58);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.88);border-radius:50px;color:#114171;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(17,65,113,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .ci-btn-hero:hover { background:rgba(255,255,255,0.90);border-color:rgba(17,65,113,0.45);box-shadow:0 12px 36px rgba(17,65,113,0.18),0 0 0 2px rgba(17,65,113,0.14),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#114171; }

          /* Stats */
          .ci-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.48);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.88);box-shadow:0 4px 24px rgba(17,65,113,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .ci-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(17,65,113,0.12); }
          .ci-stat-col:last-child { border-right:none; }
          .ci-stat-label { font-size:12px;color:#1a3050;font-weight:500;margin-bottom:6px; }
          .ci-stat-value { font-size:26px;font-weight:900;color:#114171;letter-spacing:-0.5px;line-height:1; }

          /* Clients */
          .ci-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .ci-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#114171; }
          .ci-clients-logos { width:100%;overflow:hidden; }
          .ci-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .ci-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Shared section tokens */
          .ci-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#114171;margin-bottom:12px;display:block; }
          .ci-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#114171 55%,#1a5a9a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .ci-section-desc { font-size:15px;color:#1a3050;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .ci-section-sub  { font-size:16px;color:#1a3050;margin:0; }

          /* Services */
          .ci-services-section { background:#eef3fa;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(17,65,113,0.10),0 -4px 16px rgba(17,65,113,0.06); }
          .ci-services-inner { max-width:1280px;margin:0 auto; }
          .ci-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .ci-service-card { background:linear-gradient(135deg,rgba(214,228,247,0.58) 0%,rgba(255,255,255,0.82) 60%,rgba(232,237,248,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(17,65,113,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .ci-service-card:hover { transform:translateY(-6px);border-color:rgba(17,65,113,0.35);box-shadow:0 16px 48px rgba(17,65,113,0.13),inset 0 1px 0 rgba(255,255,255,1); }
          .ci-service-card.featured { background:linear-gradient(135deg,rgba(254,241,214,0.55) 0%,rgba(255,255,255,0.88) 55%,rgba(214,228,247,0.48) 100%);border-color:rgba(217,119,6,0.18);box-shadow:0 6px 32px rgba(217,119,6,0.09),inset 0 1px 0 rgba(255,255,255,1); }
          .ci-service-card:hover .ci-card-num { color:#114171;opacity:0.10; }
          .ci-service-card:hover h3 { color:#114171; }
          .ci-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.05;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .ci-service-card h3 { font-size:15px;font-weight:700;color:#0a1628;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .ci-service-card p  { font-size:13px;color:#1a3050;line-height:1.6;position:relative;z-index:1; }
          .ci-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#114171,#D97706);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .ci-service-card:hover::before { transform:scaleY(1); }
          .ci-services-footer { text-align:center;margin-top:20px; }
          .ci-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(17,65,113,0.22);color:#114171;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(17,65,113,0.07);font-family:inherit; }
          .ci-btn-show-more:hover { background:#114171;border-color:#114171;color:#ffffff;box-shadow:0 8px 28px rgba(17,65,113,0.22);transform:translateY(-2px); }

          /* Portfolio */
          .ci-portfolio-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .ci-portfolio-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.48);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.88);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(17,65,113,0.07),inset 0 1px 0 rgba(255,255,255,0.95); }
          .ci-portfolio-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;gap:24px; }
          .ci-portfolio-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#114171 55%,#1a5a9a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0; }
          .ci-btn-portfolio-cta { display:inline-block;padding:13px 26px;background:rgba(255,255,255,0.58);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.88);border-radius:50px;color:#114171;font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap;transition:all 0.3s;box-shadow:0 4px 20px rgba(17,65,113,0.09),inset 0 1px 0 rgba(255,255,255,1); }
          .ci-btn-portfolio-cta:hover { background:rgba(255,255,255,0.90);border-color:rgba(17,65,113,0.40);transform:translateY(-2px);color:#114171; }
          .ci-portfolio-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .ci-pcard { display:flex;flex-direction:column;background:rgba(255,255,255,0.68);backdrop-filter:blur(10px);border:1px solid rgba(17,65,113,0.10);border-radius:12px;overflow:hidden;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .ci-pcard:hover { transform:translateY(-4px);border-color:rgba(17,65,113,0.38);box-shadow:0 12px 40px rgba(17,65,113,0.12); }
          .ci-pcard-thumb { width:100%;aspect-ratio:16/10;overflow:hidden;background:#d6e4f7; }
          .ci-pcard-thumb img { width:100%;height:100%;object-fit:cover;display:block; }
          .ci-pcard-body  { padding:18px 20px 20px;flex:1; }
          .ci-pcard-name  { font-size:18px;font-weight:800;color:#114171;margin:0 0 5px; }
          .ci-pcard-tech  { font-size:13px;color:#1a3050;margin-bottom:5px;line-height:1.4; }
          .ci-pcard-cats  { font-size:13px;font-weight:700;color:#D97706; }

          /* Process */
          .ci-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .ci-process-top { max-width:1280px;margin:0 auto 56px; }
          .ci-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#114171;margin:0 0 14px; }
          .ci-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#114171 55%,#1a5a9a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .ci-process-main-desc { font-size:15px;color:#1a3050;line-height:1.7;margin:0; }
          .ci-process-divider { border:none;border-top:1px solid rgba(17,65,113,0.15);margin:36px 0 0;width:100%; }
          .ci-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .ci-process-steps { display:flex;flex-direction:column; }
          .ci-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .ci-pstep.visible { opacity:1;transform:translateY(0); }
          .ci-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .ci-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.68);backdrop-filter:blur(8px);border:2px solid rgba(17,65,113,0.20);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#114171;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .ci-pstep:hover .ci-pstep-circle { background:rgba(17,65,113,0.12);border-color:#114171; }
          .ci-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .ci-pstep-arrow::before { content:'';width:2px;flex:1;background:#114171;opacity:0.22; }
          .ci-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #114171;opacity:0.40;margin-top:-1px; }
          .ci-pstep:last-child .ci-pstep-arrow { display:none; }
          .ci-pstep-content { padding:4px 0 44px; }
          .ci-pstep:last-child .ci-pstep-content { padding-bottom:0; }
          .ci-pstep-title { font-size:22px;font-weight:700;color:#114171;margin:0 0 10px;line-height:1.2; }
          .ci-pstep-desc  { font-size:15px;color:#1a3050;line-height:1.75;margin:0; }
          .ci-process-image-col { position:sticky;top:100px;min-width:0; }
          .ci-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(17,65,113,0.13);aspect-ratio:4/5;background:#d6e4f7; }
          .ci-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Testimonials */
          .ci-testi-section { background:#eef3fa;border-top:1px solid rgba(17,65,113,0.09);border-bottom:1px solid rgba(17,65,113,0.09);padding:80px 40px;position:relative;z-index:1; }
          .ci-testi-inner { max-width:1280px;margin:0 auto; }
          .ci-section-header-center { text-align:center;margin-bottom:52px; }
          .ci-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .ci-tcard { background:linear-gradient(135deg,rgba(214,228,247,0.58) 0%,rgba(255,255,255,0.82) 60%,rgba(232,237,248,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(17,65,113,0.07),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .ci-tcard.ci-tcard-visible { opacity:1;transform:translateY(0); }
          .ci-tcard:hover { transform:translateY(-6px)!important;border-color:rgba(17,65,113,0.32);box-shadow:0 16px 48px rgba(17,65,113,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .ci-tcard.featured { background:linear-gradient(135deg,rgba(254,241,214,0.50) 0%,rgba(255,255,255,0.88) 55%,rgba(214,228,247,0.45) 100%);border-color:rgba(217,119,6,0.18);box-shadow:0 6px 32px rgba(217,119,6,0.09),inset 0 1px 0 rgba(255,255,255,1); }
          .ci-tcard-stars { font-size:18px;color:#D97706;letter-spacing:2px; }
          .ci-tcard-text  { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .ci-tcard.featured .ci-tcard-text { color:#1f2937; }
          .ci-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .ci-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .ci-tcard-name  { font-size:14px;font-weight:700;color:#114171; }
          .ci-tcard-role  { font-size:12px;color:#6b7280; }
          .ci-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(214,228,247,0.55) 0%,rgba(255,255,255,0.78) 50%,rgba(232,237,248,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.88);box-shadow:0 4px 20px rgba(17,65,113,0.07),inset 0 1px 0 rgba(255,255,255,0.95); }
          .ci-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .ci-tstat-num   { font-size:28px;font-weight:800;color:#114171; }
          .ci-tstat-label { font-size:13px;color:#1a3050;font-weight:500; }
          .ci-tstat-divider { width:1px;height:40px;background:rgba(17,65,113,0.16); }

          /* Why */
          .ci-why-section { padding:80px 40px;background:#eef3fa;border-top:1px solid rgba(17,65,113,0.09);border-bottom:1px solid rgba(17,65,113,0.09);position:relative;z-index:1; }
          .ci-why-inner { max-width:1280px;margin:0 auto; }
          .ci-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .ci-why-card { background:linear-gradient(135deg,rgba(214,228,247,0.58) 0%,rgba(255,255,255,0.82) 60%,rgba(232,237,248,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(17,65,113,0.06),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s; }
          .ci-why-card.ci-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .ci-why-card:hover { transform:translateY(-6px) scale(1)!important;border-color:rgba(17,65,113,0.32);box-shadow:0 16px 48px rgba(17,65,113,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .ci-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .ci-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .ci-why-icon svg { width:28px;height:28px;fill:#114171; }
          .ci-why-card h3 { font-size:15px;font-weight:700;color:#0a1628;margin:0;line-height:1.35; }
          .ci-why-card p  { font-size:13px;color:#1a3050;line-height:1.7;margin:0; }

          /* Engagement */
          .ci-engage-section { background:#eef3fa;border-top:1px solid rgba(17,65,113,0.09);border-bottom:1px solid rgba(17,65,113,0.09);padding:80px 40px;position:relative;z-index:1; }
          .ci-engage-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch; }
          .ci-engage-left { position:sticky;top:100px;display:flex;flex-direction:column; }
          .ci-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#114171 55%,#1a5a9a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .ci-engage-desc { font-size:15px;color:#1a3050;line-height:1.75;margin:0 0 32px; }
          .ci-engage-img-wrap { border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(17,65,113,0.12);flex:1;min-height:300px; }
          .ci-engage-img-wrap img { width:100%;height:100%;min-height:300px;object-fit:cover;display:block; }
          .ci-engage-right { display:flex;flex-direction:column;gap:16px; }
          .ci-ecard { background:linear-gradient(135deg,rgba(214,228,247,0.58) 0%,rgba(255,255,255,0.82) 60%,rgba(232,237,248,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(17,65,113,0.06),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.3s,box-shadow 0.3s; }
          .ci-ecard.ci-ecard-visible { opacity:1;transform:translateX(0); }
          .ci-ecard:hover { border-color:rgba(17,65,113,0.35);box-shadow:0 16px 48px rgba(17,65,113,0.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateX(4px); }
          .ci-ecard-header { display:flex;align-items:center;gap:14px;margin-bottom:10px; }
          .ci-ecard-icon  { width:44px;height:44px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .ci-ecard-icon svg { width:26px;height:26px;stroke:#114171;fill:none; }
          .ci-ecard-title { font-size:18px;font-weight:700;color:#114171;margin:0; }
          .ci-ecard-desc  { font-size:14px;color:#1a3050;line-height:1.65;margin:0 0 16px; }
          .ci-ecard-features { display:grid;grid-template-columns:1fr 1fr;gap:8px 16px; }
          .ci-efeat { display:flex;align-items:center;gap:8px;font-size:13px;color:#1a3050;font-weight:500; }
          .ci-efeat-check { color:#D97706;font-size:12px;flex-shrink:0; }

          /* Contact */
          .ci-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(214,228,247,0.72) 0%,rgba(255,255,255,0.65) 40%,rgba(232,237,248,0.68) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.85); }
          .ci-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .ci-contact-left  { padding:0;align-self:start; }
          .ci-contact-right { align-self:start; }
          .ci-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#114171 55%,#1a5a9a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .ci-contact-desc  { font-size:14px;color:#1a3050;line-height:1.6;margin:0 0 24px; }
          .ci-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.75) 0%,rgba(214,228,247,0.38) 100%);border:1px solid rgba(255,255,255,0.92);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .ci-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .ci-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .ci-benefit-icon { width:20px;height:20px;color:#114171;stroke:#114171;stroke-width:1.75; }
          .ci-benefit-item p { font-size:13px;color:#1a3050;margin:0;line-height:1.5; }
          .ci-stats-box  { padding-top:32px;border-top:1px solid rgba(17,65,113,0.12); }
          .ci-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .ci-stat-number { font-size:40px;font-weight:900;color:#114171;line-height:1;display:inline-block;margin-bottom:4px; }
          .ci-stat-text   { font-size:13px;color:#1a3050;line-height:1.4;font-weight:500; }
          .ci-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.92) 0%,rgba(214,228,247,0.20) 50%,rgba(255,255,255,0.88) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.95);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(17,65,113,0.09),inset 0 1px 0 rgba(255,255,255,1); }
          .ci-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0a1628;letter-spacing:-0.5px; }
          .ci-contact-form { display:flex;flex-direction:column;gap:16px; }
          .ci-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .ci-form-group { display:flex;flex-direction:column;gap:6px; }
          .ci-form-group.full { grid-column:1/-1; }
          .ci-form-group label { font-size:12px;font-weight:500;color:#0a1628; }
          .ci-form-group input,.ci-form-group textarea,.ci-form-group select { padding:10px 14px;border:1px solid rgba(17,65,113,0.16);border-radius:6px;font-size:13px;font-family:inherit;color:#0a1628;background:rgba(255,255,255,0.60);box-shadow:inset 0 1px 4px rgba(17,65,113,0.04);transition:border-color 0.2s,background 0.2s; }
          .ci-form-group input:focus,.ci-form-group textarea:focus { outline:none;border-color:#114171;background:rgba(255,255,255,0.95);box-shadow:0 0 0 3px rgba(17,65,113,0.10); }
          .ci-phone-input { display:flex;border:1px solid rgba(17,65,113,0.16);border-radius:6px;overflow:hidden; }
          .ci-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.15);font-size:12px;min-width:75px; }
          .ci-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .ci-phone-input input:focus { outline:none; }
          .ci-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .ci-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .ci-consent label { font-size:11px;color:#1a3050;line-height:1.5;margin:0; }
          .ci-consent a { color:#114171;text-decoration:none; }
          .ci-submit-btn { padding:14px 28px;background:rgba(15,52,96,0.88);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(17,65,113,0.26),inset 0 1px 0 rgba(255,255,255,0.16); }
          .ci-submit-btn:hover { background:rgba(15,52,96,0.98);border-color:rgba(17,65,113,0.50);transform:translateY(-2px); }

          /* FAQ */
          .ci-faq-section { padding:80px 40px;background:#eef3fa;border-top:1px solid rgba(17,65,113,0.09);position:relative;z-index:1; }
          .ci-faq-inner  { max-width:1280px;margin:0 auto; }
          .ci-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#114171 55%,#1a5a9a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .ci-faq-list { display:flex;flex-direction:column;gap:12px; }
          .ci-faq-item { background:linear-gradient(135deg,rgba(214,228,247,0.58) 0%,rgba(255,255,255,0.82) 60%,rgba(232,237,248,0.42) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(17,65,113,0.06),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .ci-faq-item.open { border-color:rgba(17,65,113,0.32);box-shadow:0 8px 32px rgba(17,65,113,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .ci-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#114171,#D97706);border-radius:3px 0 0 3px; }
          .ci-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .ci-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(17,65,113,0.08);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .ci-faq-item.open .ci-faq-q-badge { background:#114171;color:#fff; }
          .ci-faq-question span { font-size:16px;font-weight:600;color:#0a1628;line-height:1.45; }
          .ci-faq-item.open .ci-faq-question span { color:#114171; }
          .ci-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .ci-faq-item.open .ci-faq-chevron { transform:rotate(180deg);color:#D97706; }
          .ci-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .ci-faq-item.open .ci-faq-answer-wrap { max-height:500px; }
          .ci-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#1a3050;line-height:1.8; }
          .ci-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#D97706;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Related */
          .ci-related-section { background:rgba(214,228,247,0.22);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.65);padding:80px 40px; }
          .ci-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .ci-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#114171;margin:0 0 14px;display:block; }
          .ci-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#114171 55%,#1a5a9a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .ci-related-sub { font-size:15px;color:#0a1628;line-height:1.7;margin:0 auto;max-width:680px; }
          .ci-related-divider { border:none;border-top:1px solid rgba(17,65,113,0.12);margin:40px 0; }
          .ci-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .ci-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .ci-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .ci-rtag-navy   { background:rgba(17,65,113,0.08); border-color:rgba(17,65,113,0.25); color:#114171; }
          .ci-rtag-orange { background:rgba(217,119,6,0.10); border-color:rgba(217,119,6,0.30); color:#B45309; }
          .ci-rtag-blue   { background:rgba(59,130,246,0.10); border-color:rgba(59,130,246,0.30); color:#1D4ED8; }
          .ci-rtag-violet { background:rgba(139,92,246,0.10); border-color:rgba(139,92,246,0.30); color:#6D28D9; }
          .ci-rtag-green  { background:rgba(34,197,94,0.10); border-color:rgba(34,197,94,0.28); color:#15803D; }
          .ci-rtag-teal   { background:rgba(20,184,166,0.10); border-color:rgba(20,184,166,0.30); color:#0F766E; }
          .ci-rtag-rose   { background:rgba(244,63,94,0.10); border-color:rgba(244,63,94,0.28); color:#BE123C; }
          .ci-rtag-indigo { background:rgba(99,102,241,0.10); border-color:rgba(99,102,241,0.28); color:#4338CA; }
          .ci-rtag-sky    { background:rgba(14,165,233,0.10); border-color:rgba(14,165,233,0.28); color:#0369A1; }
          .ci-rtag-amber  { background:rgba(245,158,11,0.12); border-color:rgba(245,158,11,0.35); color:#B45309; }
          .ci-rtag-slate  { background:rgba(100,116,139,0.10); border-color:rgba(100,116,139,0.28); color:#334155; }
          .ci-rtag-emerald{ background:rgba(16,185,129,0.10); border-color:rgba(16,185,129,0.28); color:#065F46; }

          /* Shimmer */
          .ci-btn-hero-shimmer { position:relative;overflow:hidden; }
          .ci-btn-hero-shimmer::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.78) 45%,rgba(255,255,255,0.92) 50%,rgba(255,255,255,0.78) 55%,transparent 100%);animation:ci-shimmer-sweep 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes ci-shimmer-sweep { 0%{left:-120%} 35%,100%{left:160%} }

          /* Section reveal */
          .ci-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .ci-section-reveal.ci-revealed { opacity:1;transform:translateY(0); }

          /* Logo marquee */
          .ci-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:ci-marquee 28s linear infinite; }
          .ci-logos-track:hover { animation-play-state:paused; }
          @keyframes ci-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

          /* Responsive */
          @media (max-width:1024px) {
            .ci-hero-content h1 { font-size:40px; }
            .ci-services-grid { grid-template-columns:repeat(2,1fr); }
            .ci-why-grid { grid-template-columns:repeat(2,1fr); }
            .ci-portfolio-grid { grid-template-columns:repeat(2,1fr); }
            .ci-portfolio-wrap { padding:32px 28px 40px; }
            .ci-engage-inner { grid-template-columns:1fr; }
            .ci-engage-left { position:static; }
            .ci-process-inner { grid-template-columns:1fr; }
            .ci-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .ci-page { overflow-x:hidden; }
            .ci-hero-content { padding:36px 20px 24px; }
            .ci-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .ci-hero-content p { font-size:15px; }
            .ci-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .ci-stat-col { padding:14px 12px; }
            .ci-stat-col:nth-child(2) { border-right:none; }
            .ci-stat-col:nth-child(3) { border-top:1px solid rgba(17,65,113,0.10); }
            .ci-stat-col:nth-child(4) { border-top:1px solid rgba(17,65,113,0.10);border-right:none; }
            .ci-stat-value { font-size:22px; }
            .ci-clients-bar { padding:16px 20px 36px;gap:12px; }
            .ci-client-logo { height:20px; }
            .ci-services-section { padding:48px 20px 40px; }
            .ci-portfolio-section { padding:48px 16px; }
            .ci-portfolio-wrap { padding:24px 20px 32px;border-radius:16px; }
            .ci-portfolio-header { flex-direction:column;align-items:flex-start;gap:14px; }
            .ci-portfolio-title { font-size:26px; }
            .ci-process-section { padding:60px 20px; }
            .ci-process-top { margin-bottom:36px; }
            .ci-testi-section { padding:60px 20px; }
            .ci-testi-section .ci-section-header-center { text-align:left; }
            .ci-why-section { padding:60px 20px; }
            .ci-why-section .ci-section-header-center { text-align:left; }
            .ci-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .ci-why-card { padding:24px 20px; }
            .ci-engage-section { padding:60px 20px; }
            .ci-contact-section { padding:48px 16px; }
            .ci-contact-container { grid-template-columns:1fr;gap:20px; }
            .ci-contact-title { font-size:28px; }
            .ci-faq-section { padding:60px 20px; }
            .ci-faq-heading { font-size:26px; }
            .ci-faq-question { padding:18px 18px 18px 52px; }
            .ci-faq-question span { font-size:14px; }
            .ci-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .ci-faq-q-badge { left:14px; }
            .ci-related-section { padding:60px 20px; }
            .ci-related-tags { gap:8px; }
            .ci-rtag { padding:9px 16px;font-size:13px; }
            .ci-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .ci-testi-grid { grid-template-columns:1fr; }
            .ci-portfolio-grid { grid-template-columns:1fr; }
            .ci-section-title,.ci-engage-title,.ci-process-main-title,.ci-related-title { font-size:30px; }
            .ci-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .ci-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(17,65,113,0.10); }
            .ci-tstat:nth-child(odd) { border-right:1px solid rgba(17,65,113,0.10); }
            .ci-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .ci-tstat-divider { display:none; }
            .ci-form-row { grid-template-columns:1fr; }
            .ci-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .ci-stat-number { font-size:28px; }
          }
          @media (max-width:480px) {
            .ci-hero-content h1 { font-size:24px; }
            .ci-section-title,.ci-engage-title,.ci-process-main-title,.ci-related-title { font-size:26px; }
            .ci-services-grid { grid-template-columns:1fr; }
            .ci-service-card { padding:20px 18px 18px; }
            .ci-card-num { font-size:52px; }
            .ci-process-main-title { font-size:24px; }
            .ci-pstep-title { font-size:18px; }
            .ci-portfolio-title { font-size:22px; }
            .ci-contact-title { font-size:24px; }
            .ci-engage-title { font-size:26px; }
            .ci-tcard { padding:24px 20px; }
            .ci-ecard { padding:20px; }
            .ci-ecard-features { grid-template-columns:1fr; }
            .ci-merged-box { padding:18px; }
          }
        `}</style>
      </Head>

      <div className="ci-page">
        <div className="ci-orb-1" />
        <div className="ci-orb-2" />
        <div className="ci-orb-3" />

        {/* ── HERO ── */}
        <div className="ci-hero-block">
          <div className="ci-hero-content">
            <span className="ci-eyebrow">Expert CodeIgniter Development Company</span>
            <h1>CodeIgniter Development Services — Fast, Lean PHP Applications That Scale</h1>
            <p>Build robust, high-performance web applications, REST APIs, and custom portals on CodeIgniter with 1Solutions' expert PHP development team. 15+ years of CodeIgniter expertise serving US, Canada, and Australia businesses — on-time, on-budget, and built to last.</p>
            <Link href="#contact" className="ci-btn-hero ci-btn-hero-shimmer">Get a Free CodeIgniter Consultation</Link>
          </div>

          <div className="ci-hero-stats" ref={statsRef}>
            {[['PHP Applications Built','300+'],['PHP Experts','50+'],['Projects Delivered','1,200+'],['Years in Business','15+']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="ci-clients-bar">
            <span className="ci-clients-label">Trusted by Leading Brands</span>
            <div className="ci-clients-logos">
              <div className="ci-logos-track">
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
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="ci-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="ci-services-section">
          <div className="ci-services-inner">
            <div className={`ci-section-reveal${visibleSections.has('services') ? ' ci-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="ci-section-eyebrow">Our Services</span>
              <h2 className="ci-section-title">CodeIgniter Development Services We Offer</h2>
              <p className="ci-section-desc">From new CodeIgniter applications to legacy upgrades, REST API development, security hardening, and migrations to Laravel — our PHP experts cover every aspect of the CodeIgniter development lifecycle.</p>
            </div>
            <div className="ci-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`ci-service-card${s.featured?' featured':''}`}>
                  <span className="ci-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="ci-services-footer">
              <button className="ci-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show More CodeIgniter Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="ci-portfolio-section" id="portfolio">
          <div className="ci-portfolio-wrap">
            <div className="ci-portfolio-header">
              <h2 className={`ci-portfolio-title ci-section-reveal${visibleSections.has('portfolio') ? ' ci-revealed' : ''}`} ref={el => { sectionRefs.current['portfolio'] = el; }}>300+ PHP Applications<br/>Built &amp; Delivered</h2>
              <Link href="#contact" className="ci-btn-portfolio-cta">Browse Our Portfolio</Link>
            </div>
            <div className="ci-portfolio-grid">
              {[
                { img:'https://placehold.co/800x500/114171/ffffff?text=FleetTrack+Portal', name:'FleetTrack Portal', tech:'Logistics / CodeIgniter 4, REST API, MySQL, JWT Auth, Redis cache', cats:'B2B / Multi-role Dashboard / Real-time Fleet Tracking / API' },
                { img:'https://placehold.co/800x500/0F3460/ffffff?text=MedRecord+Pro', name:'MedRecord Pro', tech:'Healthcare / CodeIgniter 3 → 4 Upgrade, HIPAA-aware, PDF reports', cats:'Legacy Upgrade / Security Hardening / Role-based Access / Audit Logs' },
                { img:'https://placehold.co/800x500/1a5a9a/ffffff?text=PropertyDesk+CRM', name:'PropertyDesk CRM', tech:'Real Estate / CodeIgniter 4, REST API, Twilio, Google Maps, MySQL', cats:'Custom CRM / API Integrations / Lead Management / Mobile App Backend' },
              ].map(p => (
                <div className="ci-pcard" key={p.name}>
                  <div className="ci-pcard-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} loading="lazy" />
                  </div>
                  <div className="ci-pcard-body">
                    <h3 className="ci-pcard-name">{p.name}</h3>
                    <div className="ci-pcard-tech">{p.tech}</div>
                    <div className="ci-pcard-cats">{p.cats}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="ci-process-section">
          <div className="ci-process-top">
            <div className={`ci-section-reveal${visibleSections.has('process') ? ' ci-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="ci-process-eyebrow">HOW WE WORK</p>
              <h2 className="ci-process-main-title">How We Build Your CodeIgniter Application</h2>
              <p className="ci-process-main-desc">Our proven 4D delivery framework, used across 300+ PHP projects, ensures every CodeIgniter application is scoped precisely, built securely, and launched without surprises — on time and on budget.</p>
            </div>
            <hr className="ci-process-divider" />
          </div>
          <div className="ci-process-inner">
            <div className="ci-process-steps">
              {[
                ['Discover','We map your application requirements, user roles, data models, integration needs, and security requirements — recommending the right CodeIgniter version, architecture pattern, and database design before any code is written.'],
                ['Define','We produce a detailed technical specification: module architecture, API contracts, database schema, third-party integration plan, and security model — reviewed and signed off before development begins to prevent costly mid-project changes.'],
                ['Develop','Our CodeIgniter developers build your application in iterative sprints with staging environment access from week one. Code is peer-reviewed, security-tested, and covered by unit and integration tests before it ever reaches your review.'],
                ['Deploy','We manage a controlled production deployment: environment configuration, database migration, performance testing, security hardening checks, and post-launch monitoring — with full documentation and a handover session for your team.'],
              ].map(([title, desc], i) => (
                <div
                  className={`ci-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="ci-pstep-left">
                    <div className="ci-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="ci-pstep-arrow" />}
                  </div>
                  <div className="ci-pstep-content">
                    <h3 className="ci-pstep-title">{title}</h3>
                    <p className="ci-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="ci-process-image-col">
              <div className="ci-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/office.png" alt="1Solutions CodeIgniter development team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="ci-testi-section">
          <div className="ci-testi-inner">
            <div className={`ci-section-header-center ci-section-reveal${visibleSections.has('testi') ? ' ci-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="ci-section-eyebrow">Client Reviews</span>
              <h2 className="ci-section-title">What Our CodeIgniter Clients Say</h2>
              <p className="ci-section-sub">Trusted by web application businesses across the US, Canada, Australia, and beyond for 15+ years.</p>
            </div>
            <div className="ci-testi-grid" ref={testiGridRef}>
              {[
                { initials:'RT', bg:'#114171', text:'"1Solutions built our entire fleet management portal on CodeIgniter 4 — multi-role dashboards, real-time API integration, and a Redis-backed caching layer for 50,000+ daily requests. Delivered ahead of schedule and the code quality was exceptional."', name:'Ryan Thompson', role:'CTO, FleetTrack Systems — USA', featured:false },
                { initials:'AB', bg:'#D97706', text:'"We had a CodeIgniter 3 healthcare application that was years out of date and full of security gaps. 1Solutions upgraded it to CI4, refactored the authentication system, and hardened everything to meet our HIPAA requirements. Thorough, professional, and completely transparent throughout."', name:'Amanda Burns', role:'Head of Technology, MedRecord Pro — Australia', featured:true },
                { initials:'KM', bg:'#1a5a9a', text:'"The custom CodeIgniter CRM they built for our real estate business replaced three separate tools we were stitching together. Twilio SMS, Google Maps, and our existing lead database were all integrated seamlessly. Excellent work."', name:'Kevin Morris', role:'Director, PropertyDesk — Canada', featured:false },
              ].map((t,i) => (
                <div className={`ci-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' ci-tcard-visible':''}`} key={t.name}>
                  <div className="ci-tcard-stars">★★★★★</div>
                  <p className="ci-tcard-text">{t.text}</p>
                  <div className="ci-tcard-author">
                    <div className="ci-tcard-avatar" style={{ background:t.bg }}>{t.initials}</div>
                    <div>
                      <div className="ci-tcard-name">{t.name}</div>
                      <div className="ci-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="ci-testi-stats">
              {[['4.9/5','Average Rating'],['300+','PHP Applications'],['98%','Client Satisfaction'],['97%','Retention Rate']].map(([num,label],i,arr) => (
                <>
                  <div className="ci-tstat" key={label}>
                    <span className="ci-tstat-num">{num}</span>
                    <span className="ci-tstat-label">{label}</span>
                  </div>
                  {i < arr.length-1 && <div className="ci-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="ci-why-section">
          <div className="ci-why-inner">
            <div className={`ci-section-reveal${visibleSections.has('why') ? ' ci-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center',marginBottom:0 }}>
              <span className="ci-section-eyebrow">Why 1Solutions</span>
              <h2 className="ci-section-title">Why Businesses Choose 1Solutions for CodeIgniter Development</h2>
              <p className="ci-section-sub" style={{ maxWidth:680,margin:'0 auto' }}>We don't just write CodeIgniter code — we build reliable, secure, and maintainable PHP applications that solve real business problems.</p>
            </div>
            <div className="ci-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`ci-why-card${visibleWhyCards.includes(i) ? ' ci-card-visible' : ''}`} key={w.title}>
                  <div className="ci-why-card-header">
                    <div className="ci-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="ci-engage-section">
          <div className="ci-engage-inner">
            <div className="ci-engage-left">
              <div className={`ci-section-reveal${visibleSections.has('engage') ? ' ci-revealed' : ''}`} ref={el => { sectionRefs.current['engage'] = el; }}>
                <span className="ci-section-eyebrow">Engagement Models</span>
                <h2 className="ci-engage-title">Flexible Engagement Models to Fit Your Project</h2>
                <p className="ci-engage-desc">Whether you need a new CodeIgniter application, a legacy upgrade, a dedicated PHP team, or ongoing maintenance — we offer engagement models structured around your project type and budget.</p>
              </div>
              <div className="ci-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Partner-with-us.jpg" alt="Partner With 1Solutions" />
              </div>
            </div>
            <div className="ci-engage-right" ref={eCardsRef}>
              {[
                { title:'Dedicated PHP Team', desc:'A full-time dedicated team of CodeIgniter developers and a project manager working exclusively on your application — ideal for long-term products and growing platforms.', features:['Dedicated Developers','PM Included','Weekly Reports','Scalable Team'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { title:'Fixed-Price Project', desc:'For new builds, legacy upgrades, or migrations with a well-defined scope. Agree on deliverables, timeline, and total cost before work begins — no surprise invoices.', features:['Full Budget Certainty','Clear Deliverables','Milestone Payments','On-time Delivery'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                { title:'Time & Material', desc:'For evolving applications where requirements are likely to change. Full sprint-level transparency — pay only for hours worked with maximum flexibility to reprioritise as needed.', features:['Maximum Flexibility','No Scope Lock-in','Sprint Reviews','Transparent Billing'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                { title:'Maintenance Retainer', desc:'Ongoing monthly retainer for security patches, CodeIgniter version updates, performance monitoring, bug fixes, and new feature development for live applications.', features:['Security Patching','Bug Fix SLA','Monthly Dev Hours','Priority Support'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
              ].map((e,i) => (
                <div className={`ci-ecard${visibleECards.includes(i)?' ci-ecard-visible':''}`} key={e.title}>
                  <div className="ci-ecard-header">
                    <div className="ci-ecard-icon">{e.icon}</div>
                    <h3 className="ci-ecard-title">{e.title}</h3>
                  </div>
                  <p className="ci-ecard-desc">{e.desc}</p>
                  <div className="ci-ecard-features">
                    {e.features.map(f => (
                      <div className="ci-efeat" key={f}><span className="ci-efeat-check">✔</span>{f}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="ci-contact-section" id="contact">
          <div className="ci-contact-container">
            <div className="ci-contact-left">
              <h2 className="ci-contact-title">Let's Build Your CodeIgniter Application Together</h2>
              <p className="ci-contact-desc">Tell us about your project and we'll respond within 24 hours with a tailored CodeIgniter development plan — architecture recommendation, timeline, and fixed-price quote.</p>
              <div className="ci-merged-box">
                <div>
                  {[
                    { icon:<svg className="ci-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'Your project details are kept strictly confidential. We respect your privacy.' },
                    { icon:<svg className="ci-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A senior CodeIgniter developer personally reviews your requirements — no automated responses.' },
                    { icon:<svg className="ci-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Response within 24 business hours, guaranteed.' },
                    { icon:<svg className="ci-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:"No obligation to proceed. We'll give honest advice even if we're not the right fit." },
                  ].map((b,i) => (
                    <div className="ci-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="ci-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="ci-stats-box">
                  <div className="ci-stats-grid">
                    {[['300+','PHP Applications'],['16+','Years Experience'],['97%','Client Retention']].map(([num,text]) => (
                      <div key={text}>
                        <div className="ci-stat-number">{num}</div>
                        <div className="ci-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="ci-contact-right">
              <div className="ci-form-box">
                <h3>Contact Us</h3>
                <form className="ci-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="ci-form-row">
                    <div className="ci-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="ci-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="ci-form-row">
                    <div className="ci-form-group">
                      <label>Phone Number*</label>
                      <div className="ci-phone-input">
                        <select>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="ci-form-group"><label>Organization*</label><input type="text" placeholder="Organization / Company Name*" required /></div>
                  </div>
                  <div className="ci-form-group full"><label>Message*</label><textarea placeholder="Describe your CodeIgniter project — what you're building, any existing codebase details, integrations needed, and your timeline..." rows={6} required /></div>
                  <div className="ci-consent">
                    <input type="checkbox" id="ci-consent" required />
                    <label htmlFor="ci-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="ci-submit-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="ci-faq-section" id="faq">
          <div className="ci-faq-inner">
            <h2 className="ci-faq-heading">Frequently Asked Questions</h2>
            <div className="ci-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`ci-faq-item${openFaq===i?' open':''}`} key={i}>
                  <button className="ci-faq-question" onClick={() => setOpenFaq(openFaq===i ? -1 : i)}>
                    <div className="ci-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="ci-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="ci-faq-answer-wrap">
                    <div className="ci-faq-answer"><span className="ci-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="ci-related-section">
          <div className="ci-related-inner">
            <span className="ci-related-eyebrow">RELATED PHP & WEB DEVELOPMENT SERVICES</span>
            <h2 className="ci-related-title">Explore Related Services &amp; Technologies</h2>
            <p className="ci-related-sub">Pair our CodeIgniter expertise with related PHP frameworks, front-end development, and digital services to build a complete web application ecosystem.</p>
            <hr className="ci-related-divider" />
            <div className="ci-related-tags">
              {[
                ['Laravel Development','orange'],['WordPress Development','navy'],['PHP Development Services','blue'],
                ['REST API Development','indigo'],['Web Application Development','violet'],['MySQL & Database Design','teal'],
                ['CodeIgniter to Laravel Migration','amber'],['Legacy PHP Upgrade','slate'],['eCommerce Development','green'],
                ['Custom CRM Development','navy'],['B2B Portal Development','sky'],['Third-Party API Integration','blue'],
                ['Security Audit & Hardening','rose'],['Performance Optimization','emerald'],['Maintenance & Support','orange'],
              ].map(([label,color]) => (
                <Link href="#contact" className={`ci-rtag ci-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
