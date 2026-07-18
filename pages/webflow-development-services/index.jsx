'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Custom Webflow Website Design', desc:'Bespoke, pixel-perfect Webflow websites designed from a Figma prototype — responsive, fast-loading, and crafted to reflect your brand identity.', featured:false },
  { n:'02', title:'Webflow CMS Development', desc:'Content-managed Webflow sites with structured Collections — empowering your team to publish blogs, case studies, and product pages without touching code.', featured:true },
  { n:'03', title:'Webflow E-Commerce Development', desc:'Full-featured online stores on Webflow Commerce — custom product pages, cart flows, checkout customisation, and Stripe payment integration.', featured:false },
  { n:'04', title:'Webflow Membership & Client Portals', desc:'Gated member areas with Memberstack or Outseta — subscription billing, protected content, and custom onboarding flows built inside Webflow.', featured:false },
  { n:'05', title:'WordPress to Webflow Migration', desc:'Migrate your WordPress site to Webflow cleanly — preserving SEO rankings, redirecting all URLs, and importing CMS content with zero downtime.', featured:false },
  { n:'06', title:'Webflow Interactions & Animations', desc:'Cinematic scroll-triggered animations, parallax effects, and micro-interactions using Webflow Interactions and GSAP for a premium user experience.', featured:false },
  { n:'07', title:'Webflow SEO Optimisation', desc:'Technical SEO built into every Webflow project — semantic HTML, schema markup, Core Web Vitals tuning, canonical tags, and sitemap configuration.', featured:false },
  { n:'08', title:'Webflow API Integrations', desc:'Connect Webflow to your existing tools — HubSpot, Mailchimp, Zapier, Make, Stripe, Airtable, and custom REST APIs via Webflow Logic or middleware.', featured:false },
  { n:'09', title:'Webflow Landing Page Development', desc:'High-converting landing pages for campaigns, product launches, and lead generation — A/B-test-ready, fast to iterate, and optimised for conversion.', featured:false },
  { n:'10', title:'Webflow Redesign & Refresh', desc:'Revamp an existing Webflow site with updated branding, improved layout, better mobile experience, and enhanced page speed — without starting from scratch.', featured:false },
  { n:'11', title:'Webflow Maintenance & Support', desc:'Ongoing Webflow support plans — content updates, bug fixes, new section builds, plugin upgrades, and monthly performance reviews.', featured:false },
  { n:'12', title:'Webflow for SaaS & Startups', desc:'Marketing sites and product landing pages purpose-built for SaaS companies — fast to launch, easy for non-technical teams to update, and structured for growth.', featured:false },
];

const FAQS = [
  { q:'What Webflow development services does 1Solutions offer?', a:'We offer end-to-end Webflow development — custom website design and build, CMS setup and content migration, e-commerce stores, membership portals with Memberstack or Outseta, scroll animations with GSAP, API integrations, SEO optimisation, WordPress-to-Webflow migrations, and ongoing maintenance retainers. Whether you need a single landing page or a fully CMS-powered marketing site, we scope and deliver the right solution.' },
  { q:'How much does a custom Webflow website cost?', a:'A typical Webflow marketing site with 8–15 pages and a blog CMS costs between $4,000 and $12,000. E-commerce builds start from $6,000. Complex membership portals or multi-template CMS projects with animations range from $10,000 to $25,000+. Cost depends on page count, animation complexity, integrations, and content migration requirements. We provide a detailed fixed-price quote after a free scoping call.' },
  { q:'How long does a Webflow project take?', a:'A standard 8–12 page marketing site with CMS typically takes 4–6 weeks from approved Figma designs to launch. E-commerce and membership builds take 6–10 weeks. Landing pages can be turned around in 1–2 weeks. We share a milestone timeline in every proposal and provide weekly demos so you always know where things stand.' },
  { q:'Can you migrate our WordPress site to Webflow?', a:'Yes — WordPress-to-Webflow migration is one of our most requested services. We export and restructure your CMS content into Webflow Collections, set up 301 redirects for all existing URLs to preserve your SEO rankings, replicate your design, and test every page before cutover. You retain your domain and typically see faster load times after the migration.' },
  { q:'Will our team be able to update the site after launch?', a:'Absolutely — that is one of Webflow\'s greatest strengths. We build your CMS Collections and page templates so your marketing team can add blog posts, update team members, publish case studies, and edit copy directly in the Webflow Editor — no developer needed. We provide a walkthrough video and documentation as part of every handoff.' },
  { q:'Do you build Webflow animations and interactions?', a:'Yes. We build scroll-triggered reveals, parallax backgrounds, sticky navigation, hover micro-interactions, and page-load sequences using Webflow\'s native Interactions panel. For more advanced animations — counters, staggered reveals, SVG path animations — we layer in GSAP and Lottie. Every animation is tested for smooth 60fps performance on mobile.' },
  { q:'Is Webflow good for SEO?', a:'Yes — Webflow gives developers and SEO practitioners full control over title tags, meta descriptions, Open Graph tags, canonical URLs, schema markup, XML sitemaps, and 301 redirects. Unlike WordPress, there are no plugin conflicts or bloated themes slowing things down. We configure all of these correctly on every build and optimise Core Web Vitals (LCP, CLS, FID) during the performance review phase.' },
  { q:'What makes 1Solutions different from a Webflow freelancer?', a:'Depth, accountability, and continuity. Unlike a solo freelancer, we offer a dedicated team — a Webflow designer, developer, and QA reviewer — so your project never stalls when someone is unavailable. We follow a documented Discover → Design → Build → Launch process, provide comprehensive handoff documentation, and offer monthly support retainers. We are a long-term partner, not a one-off contractor.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, title:'Certified Webflow Experts', desc:'Our Webflow team holds official Webflow Partner and Expert certifications. We have shipped 200+ Webflow sites across SaaS, e-commerce, healthcare, and professional services.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'US, Canada & Australia Focused', desc:'We understand the UX expectations, compliance considerations, and conversion standards of western markets — not just generic offshore delivery with poor communication.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>, title:'Figma-to-Webflow in One Team', desc:'We design and build under one roof — your Figma prototype is translated to Webflow with pixel precision, so there are no handoff gaps or fidelity loss between design and code.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'SEO-First Every Time', desc:'Every site we build includes proper semantic HTML, schema markup, canonical URLs, XML sitemaps, and Core Web Vitals optimisation — not a plugin-dependent afterthought.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'Fast Delivery, Fixed Price', desc:'Our scoped fixed-price process means you know the cost and timeline upfront. Most marketing sites go from approved design to live in 4–6 weeks with weekly demo checkpoints.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Client-Editable CMS Handoff', desc:'We build your CMS so your non-technical team can update content, add blog posts, and publish new pages in the Webflow Editor — with a video walkthrough and documentation on handoff.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Security & Reliability', desc:'Webflow\'s enterprise hosting includes free SSL, CDN delivery via Fastly, automatic backups, 99.99% uptime SLA, and DDoS protection — all included in the Webflow plan.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership', desc:'96% client retention rate. We maintain your Webflow site after launch with monthly support retainers, content updates, new section builds, and performance monitoring.' },
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
    <div className="wf-stat-col">
      <div className="wf-stat-label">{label}</div>
      <div className="wf-stat-value">{display}</div>
    </div>
  );
}

export default function WebflowDevelopmentServices() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const stepRefs = useRef([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);

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

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.1solutions.biz/#organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: 'https://www.1solutions.biz/images/1solutions-logo.png',
        contactPoint: { '@type': 'ContactPoint', telephone: '+1-800-1SOLUTIONS', contactType: 'customer service' },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.1solutions.biz/webflow-development-services/#webpage',
        url: 'https://www.1solutions.biz/webflow-development-services/',
        name: 'Webflow Development Services | Expert Webflow Agency | 1Solutions',
        description: 'Award-winning Webflow development agency. Custom Webflow websites, CMS, e-commerce, animations & migrations for US, Canada & Australia businesses.',
        isPartOf: { '@id': 'https://www.1solutions.biz/#organization' },
        dateModified: '2026-07-18',
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfessionalService',
        name: '1Solutions — Webflow Development Agency',
        url: 'https://www.1solutions.biz/webflow-development-services/',
        description: 'Expert Webflow development company delivering custom websites, CMS builds, e-commerce stores, membership portals, and WordPress-to-Webflow migrations.',
        priceRange: '$4,000 - $25,000+',
        areaServed: ['United States', 'Canada', 'Australia', 'United Kingdom'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Webflow Development Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Webflow Website Design' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webflow CMS Development' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webflow E-Commerce Development' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WordPress to Webflow Migration' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webflow Membership Sites' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Webflow Interactions & Animations' } },
          ],
        },
      },
      {
        '@type': 'HowTo',
        name: 'How We Deliver Webflow Projects',
        step: [
          { '@type': 'HowToStep', name: 'Discover', text: 'Scoping call to define goals, pages, CMS structure, and integrations.' },
          { '@type': 'HowToStep', name: 'Design', text: 'Pixel-perfect Figma prototype reviewed and approved before any Webflow build begins.' },
          { '@type': 'HowToStep', name: 'Build', text: 'Webflow development with weekly demos, CMS setup, animations, and integrations.' },
          { '@type': 'HowToStep', name: 'Launch', text: 'QA testing, SEO configuration, domain cutover, and post-launch handoff with training.' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Webflow Development Services | Expert Webflow Agency | 1Solutions</title>
        <meta name="description" content="1Solutions is a certified Webflow development agency with 200+ sites delivered. Custom Webflow design, CMS, e-commerce, animations & WordPress migrations for US, Canada & Australia." />
        <meta name="keywords" content="webflow development services, webflow development company, webflow agency, webflow designer, webflow cms development, webflow ecommerce, wordpress to webflow migration, webflow expert" />
        <link rel="canonical" href="https://www.1solutions.biz/webflow-development-services/" />
        <meta property="og:title" content="Webflow Development Services | Expert Webflow Agency | 1Solutions" />
        <meta property="og:description" content="Certified Webflow agency delivering custom websites, CMS, e-commerce, and animations for US, Canada & Australia businesses. 200+ Webflow sites delivered." />
        <meta property="og:url" content="https://www.1solutions.biz/webflow-development-services/" />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <style>{`
          .wf-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            background-attachment: scroll;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .wf-page *, .wf-page *::before, .wf-page *::after { box-sizing: border-box; }

          /* Orbs */
          .wf-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.35) 0%,rgba(139,92,246,0.15) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .wf-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.30) 0%,rgba(245,158,11,0.15) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .wf-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.20) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* Hero */
          .wf-hero-block { background:transparent;position:relative;overflow:hidden; }
          .wf-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .wf-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .wf-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .wf-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .wf-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .wf-hero-content p { font-size:16px;color:#3A507A;line-height:1.65;max-width:620px;margin:0 auto 28px; }
          .wf-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wf-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(245,158,11,0.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }

          /* Stats */
          .wf-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .wf-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .wf-stat-col:last-child { border-right:none; }
          .wf-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .wf-stat-value { font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1; }

          /* Clients */
          .wf-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .wf-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .wf-clients-logos { width:100%;overflow:hidden; }
          .wf-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .wf-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Sections shared */
          .wf-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .wf-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .wf-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .wf-section-sub { font-size:16px;color:#4A6080;margin:0; }

          /* Services */
          .wf-services-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.18),0 -4px 16px rgba(15,52,96,0.10); }
          .wf-services-inner { max-width:1280px;margin:0 auto; }
          .wf-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .wf-service-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .wf-service-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .wf-service-card.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wf-service-card:hover .wf-card-num { color:#D97706;opacity:0.12; }
          .wf-service-card:hover h3 { color:#D97706; }
          .wf-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .wf-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .wf-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .wf-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#D97706,#f59e0b);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .wf-service-card:hover::before { transform:scaleY(1); }
          .wf-services-footer { text-align:center;margin-top:20px; }
          .wf-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(15,52,96,0.20);color:#0F3460;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(15,52,96,0.08);font-family:inherit; }
          .wf-btn-show-more:hover { background:#0F3460;border-color:#0F3460;color:#ffffff;box-shadow:0 8px 28px rgba(15,52,96,0.20);transform:translateY(-2px); }

          /* Tech Stack */
          .wf-tech-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .wf-tech-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,0.95); }
          .wf-tech-header { margin-bottom:36px; }
          .wf-tech-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 12px; }
          .wf-tech-subtitle { font-size:15px;color:#4A6080;line-height:1.6;margin:0; }
          .wf-tech-groups { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .wf-tech-group { background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(15,52,96,0.12);border-radius:12px;padding:22px 24px; }
          .wf-tech-group-title { font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .wf-tech-tags { display:flex;flex-wrap:wrap;gap:8px; }
          .wf-tech-tag { display:inline-block;background:rgba(15,52,96,0.07);border:1px solid rgba(15,52,96,0.12);border-radius:6px;padding:5px 12px;font-size:13px;font-weight:500;color:#0F3460; }

          /* Process */
          .wf-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .wf-process-top { max-width:1280px;margin:0 auto 56px; }
          .wf-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .wf-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .wf-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .wf-process-divider { border:none;border-top:1px solid rgba(15,52,96,0.15);margin:36px 0 0;width:100%; }
          .wf-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .wf-process-steps { display:flex;flex-direction:column; }
          .wf-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .wf-pstep.visible { opacity:1;transform:translateY(0); }
          .wf-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .wf-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .wf-pstep:hover .wf-pstep-circle { background:rgba(245,158,11,0.2);border-color:#D97706;color:#D97706; }
          .wf-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .wf-pstep-arrow::before { content:'';width:2px;flex:1;background:#0F3460;opacity:0.25; }
          .wf-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #0F3460;opacity:0.45;margin-top:-1px; }
          .wf-pstep:last-child .wf-pstep-arrow { display:none; }
          .wf-pstep-content { padding:4px 0 44px; }
          .wf-pstep:last-child .wf-pstep-content { padding-bottom:0; }
          .wf-pstep-title { font-size:22px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .wf-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .wf-process-image-col { position:sticky;top:100px;min-width:0; }
          .wf-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(15,52,96,0.15);aspect-ratio:4/5;background:#e8edf5; }
          .wf-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Testimonials */
          .wf-testi-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .wf-testi-inner { max-width:1280px;margin:0 auto; }
          .wf-section-header-center { text-align:center;margin-bottom:52px; }
          .wf-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .wf-tcard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .wf-tcard:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .wf-tcard.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wf-tcard.wf-tcard-visible { opacity:1;transform:translateY(0); }
          .wf-tcard.wf-tcard-visible:hover { transform:translateY(-6px); }
          .wf-tcard-stars { font-size:18px;color:#D97706;letter-spacing:2px; }
          .wf-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .wf-tcard.featured .wf-tcard-text { color:#1f2937; }
          .wf-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .wf-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .wf-tcard-name { font-size:14px;font-weight:700;color:#0F3460; }
          .wf-tcard-role { font-size:12px;color:#6b7280; }
          .wf-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .wf-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .wf-tstat-num { font-size:28px;font-weight:800;color:#0F3460; }
          .wf-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .wf-tstat-divider { width:1px;height:40px;background:rgba(15,52,96,0.15); }

          /* Why */
          .wf-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .wf-why-inner { max-width:1280px;margin:0 auto; }
          .wf-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .wf-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),background 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .wf-why-card:hover { transform:translateY(-6px) scale(1);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .wf-why-card.wf-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .wf-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .wf-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .wf-why-icon svg { width:28px;height:28px;fill:#D97706; }
          .wf-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .wf-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* Engagement Table */
          .wf-engage-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .wf-engage-inner { max-width:1280px;margin:0 auto; }
          .wf-engage-header { text-align:center;margin-bottom:52px; }
          .wf-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 14px; }
          .wf-engage-desc { font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 auto; }
          .wf-table-wrap { background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,0.95);overflow-x:auto; }
          .wf-cmp-table { width:100%;border-collapse:collapse;min-width:680px; }
          .wf-cmp-table thead tr { border-bottom:2px solid rgba(15,52,96,0.10); }
          .wf-cmp-th { padding:30px 20px 26px;text-align:center;vertical-align:top; }
          .wf-cmp-th:first-child { text-align:left;padding-left:32px;min-width:180px; }
          .wf-cmp-th.wf-th-feat { background:linear-gradient(180deg,rgba(254,243,199,0.55) 0%,rgba(255,255,255,0.20) 100%);border-left:1px solid rgba(217,119,6,0.20);border-right:1px solid rgba(217,119,6,0.20); }
          .wf-popular-badge { display:inline-block;font-size:9px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;background:#D97706;color:#fff;padding:3px 10px;border-radius:20px;margin-bottom:10px; }
          .wf-plan-badge { display:inline-block;font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:3px 10px;border-radius:20px;margin-bottom:10px;background:rgba(15,52,96,0.08);color:#4A6080; }
          .wf-cmp-plan-name { display:block;font-size:15px;font-weight:800;color:#0F3460;margin-bottom:4px;line-height:1.3; }
          .wf-cmp-th.wf-th-feat .wf-cmp-plan-name { color:#D97706; }
          .wf-cmp-plan-price { display:block;font-size:12px;color:#6B7280;font-weight:500; }
          .wf-cmp-table tbody tr { border-bottom:1px solid rgba(15,52,96,0.06);transition:background 0.15s; }
          .wf-cmp-table tbody tr:last-child { border-bottom:none; }
          .wf-cmp-table tbody tr:nth-child(odd) { background:rgba(15,52,96,0.018); }
          .wf-cmp-table tbody tr:hover { background:rgba(99,130,255,0.05); }
          .wf-cmp-td { padding:15px 20px;text-align:center;vertical-align:middle;font-size:13px;color:#4A6080; }
          .wf-cmp-td:first-child { text-align:left;padding-left:32px;font-size:13px;font-weight:600;color:#1e293b; }
          .wf-cmp-td.wf-th-feat { background:rgba(254,243,199,0.22);border-left:1px solid rgba(217,119,6,0.15);border-right:1px solid rgba(217,119,6,0.15); }
          .wf-tick { color:#16a34a;font-size:17px;line-height:1; }
          .wf-cross { color:#d1d5db;font-size:16px;line-height:1; }
          .wf-addon { display:inline-block;font-size:11px;color:#D97706;font-weight:600;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.28);border-radius:4px;padding:2px 8px;white-space:nowrap; }
          .wf-td-text { font-size:12px;color:#4A6080;white-space:nowrap; }
          .wf-td-text.hi { color:#0F3460;font-weight:600; }

          /* Contact */
          .wf-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .wf-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .wf-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .wf-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .wf-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .wf-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .wf-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .wf-benefit-icon { width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75; }
          .wf-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .wf-stats-box { padding-top:32px;border-top:1px solid rgba(15,52,96,0.12); }
          .wf-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .wf-stat-number { font-size:40px;font-weight:900;color:#0F3460;line-height:1;display:inline-block;margin-bottom:4px; }
          .wf-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .wf-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wf-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .wf-contact-form { display:flex;flex-direction:column;gap:16px; }
          .wf-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .wf-form-group { display:flex;flex-direction:column;gap:6px; }
          .wf-form-group.full { grid-column:1/-1; }
          .wf-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .wf-form-group input,.wf-form-group textarea,.wf-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .wf-form-group input:focus,.wf-form-group textarea:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12); }
          .wf-phone-input { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .wf-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .wf-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .wf-phone-input input:focus { outline:none; }
          .wf-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .wf-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .wf-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .wf-consent a { color:#0F3460;text-decoration:none; }
          .wf-submit-btn { padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .wf-submit-btn:hover { background:rgba(15,52,96,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }

          /* FAQ */
          .wf-faq-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .wf-faq-inner { max-width:1280px;margin:0 auto; }
          .wf-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .wf-faq-list { display:flex;flex-direction:column;gap:12px; }
          .wf-faq-item { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .wf-faq-item.open { border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .wf-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .wf-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .wf-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .wf-faq-item.open .wf-faq-q-badge { background:#D97706;color:#fff; }
          .wf-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .wf-faq-item.open .wf-faq-question span { color:#D97706; }
          .wf-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .wf-faq-item.open .wf-faq-chevron { transform:rotate(180deg);color:#D97706; }
          .wf-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .wf-faq-item.open .wf-faq-answer-wrap { max-height:400px; }
          .wf-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .wf-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#0F3460;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Related */
          .wf-related-section { background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .wf-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .wf-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .wf-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .wf-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .wf-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0; }
          .wf-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .wf-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .wf-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .wf-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .wf-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .wf-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .wf-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .wf-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .wf-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .wf-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .wf-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .wf-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }
          .wf-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }

          /* CTA shimmer */
          .wf-btn-hero-shimmer { position:relative;overflow:hidden; }
          .wf-btn-hero-shimmer::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:wf-shimmer-sweep 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes wf-shimmer-sweep { 0% { left:-120%; } 35%,100% { left:160%; } }

          /* Section fade-up */
          .wf-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .wf-section-reveal.wf-revealed { opacity:1;transform:translateY(0); }

          /* Logo marquee */
          .wf-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:wf-marquee 28s linear infinite; }
          .wf-logos-track:hover { animation-play-state:paused; }
          @keyframes wf-marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }

          /* Responsive */
          @media (max-width:1024px) {
            .wf-hero-content h1 { font-size:40px; }
            .wf-services-grid { grid-template-columns:repeat(2,1fr); }
            .wf-why-grid { grid-template-columns:repeat(2,1fr); }
            .wf-tech-groups { grid-template-columns:repeat(2,1fr); }
            .wf-engage-inner { grid-template-columns:1fr; }
            .wf-engage-left { position:static; }
            .wf-process-inner { grid-template-columns:1fr; }
            .wf-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .wf-page { overflow-x:hidden; }
            .wf-hero-content { padding:36px 20px 24px; }
            .wf-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .wf-hero-content p { font-size:15px; }
            .wf-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .wf-stat-col { padding:14px 12px; }
            .wf-stat-col:nth-child(2) { border-right:none; }
            .wf-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .wf-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .wf-stat-value { font-size:22px; }
            .wf-clients-bar { padding:16px 20px 36px;gap:12px; }
            .wf-services-section { padding:48px 20px 40px; }
            .wf-tech-section { padding:48px 16px; }
            .wf-tech-wrap { padding:24px 20px 32px;border-radius:16px; }
            .wf-tech-groups { grid-template-columns:1fr; }
            .wf-process-section { padding:60px 20px; }
            .wf-process-top { margin-bottom:36px; }
            .wf-testi-section { padding:60px 20px; }
            .wf-testi-section .wf-section-header-center { text-align:left; }
            .wf-why-section { padding:60px 20px; }
            .wf-why-section .wf-section-header-center { text-align:left; }
            .wf-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .wf-why-card { padding:24px 20px; }
            .wf-engage-section { padding:60px 20px; }
            .wf-contact-section { padding:48px 16px; }
            .wf-contact-container { grid-template-columns:1fr;gap:20px; }
            .wf-contact-title { font-size:28px; }
            .wf-faq-section { padding:60px 20px; }
            .wf-faq-heading { font-size:26px; }
            .wf-faq-question { padding:18px 18px 18px 52px; }
            .wf-faq-question span { font-size:14px; }
            .wf-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .wf-faq-q-badge { left:14px; }
            .wf-related-section { padding:60px 20px; }
            .wf-related-tags { gap:8px; }
            .wf-rtag { padding:9px 16px;font-size:13px; }
            .wf-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .wf-testi-grid { grid-template-columns:1fr; }
            .wf-section-title,.wf-engage-title,.wf-process-main-title,.wf-related-title { font-size:30px; }
            .wf-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .wf-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(15,52,96,0.10); }
            .wf-tstat:nth-child(odd) { border-right:1px solid rgba(15,52,96,0.10); }
            .wf-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .wf-tstat-divider { display:none; }
            .wf-form-row { grid-template-columns:1fr; }
            .wf-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .wf-stat-number { font-size:28px; }
            .wf-tech-title { font-size:26px; }
          }
          @media (max-width:480px) {
            .wf-hero-content h1 { font-size:24px; }
            .wf-section-title,.wf-engage-title,.wf-process-main-title,.wf-related-title { font-size:26px; }
            .wf-services-grid { grid-template-columns:1fr; }
            .wf-service-card { padding:20px 18px 18px; }
            .wf-card-num { font-size:52px; }
            .wf-pstep-title { font-size:18px; }
            .wf-contact-title { font-size:24px; }
            .wf-engage-title { font-size:26px; }
            .wf-tcard { padding:24px 20px; }
            .wf-ecard { padding:20px; }
            .wf-ecard-features { grid-template-columns:1fr; }
            .wf-merged-box { padding:18px; }
          }
        `}</style>
      </Head>

      <div className="wf-page">
        <div className="wf-orb-1" />
        <div className="wf-orb-2" />
        <div className="wf-orb-3" />

        {/* ── HERO ── */}
        <div className="wf-hero-block">
          <div className="wf-hero-content">
            <span className="wf-eyebrow">Certified Webflow Development Agency</span>
            <h1>Webflow Development Services — Beautiful Sites, Zero Compromise</h1>
            <p>Custom Webflow websites, CMS builds, e-commerce stores, and pixel-perfect animations — delivered by certified Webflow experts for businesses across the US, Canada, and Australia.</p>
            <Link href="#contact" className="wf-btn-hero wf-btn-hero-shimmer">Get a Free Webflow Consultation</Link>
          </div>

          <div className="wf-hero-stats" ref={statsRef}>
            {[['Webflow Sites','200+'],['Webflow Experts','20+'],['Years in Business','15+'],['Client Retention','96%']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="wf-clients-bar">
            <span className="wf-clients-label">Trusted by Leading Brands</span>
            <div className="wf-clients-logos">
              <div className="wf-logos-track">
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
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="wf-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="wf-services-section">
          <div className="wf-services-inner">
            <div className={`wf-section-reveal${visibleSections.has('services') ? ' wf-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="wf-section-eyebrow">Our Services</span>
              <h2 className="wf-section-title">Webflow Development Services We Offer</h2>
              <p className="wf-section-desc">From straightforward marketing sites to complex CMS platforms, e-commerce stores, and membership portals — our Webflow team delivers end-to-end solutions built for speed, beauty, and client editability.</p>
            </div>
            <div className="wf-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`wf-service-card${s.featured?' featured':''}`}>
                  <span className="wf-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="wf-services-footer">
              <button className="wf-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show More Webflow Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="wf-tech-section">
          <div className="wf-tech-wrap">
            <div className={`wf-tech-header wf-section-reveal${visibleSections.has('tech') ? ' wf-revealed' : ''}`} ref={el => { sectionRefs.current['tech'] = el; }}>
              <h2 className="wf-tech-title">Our Webflow Technology Stack</h2>
              <p className="wf-tech-subtitle">We combine Webflow's visual-first platform with the best third-party tools to deliver sites that are fast, scalable, and easy for your team to manage.</p>
            </div>
            <div className="wf-tech-groups">
              {[
                { label:'Design & Prototyping', tags:['Figma','Adobe XD','Webflow Designer','Spline 3D','Lottie Files'] },
                { label:'CMS & Content', tags:['Webflow CMS','Finsweet Attributes','CMS Nest','Webflow Logic','Jetboost'] },
                { label:'Memberships & Auth', tags:['Memberstack','Outseta','Wized','Xano','Firebase Auth'] },
                { label:'Animations', tags:['Webflow Interactions','GSAP','ScrollTrigger','Lottie','Spline'] },
                { label:'Integrations', tags:['Zapier','Make (Integromat)','HubSpot','Mailchimp','Stripe','Airtable','Twilio'] },
                { label:'SEO & Performance', tags:['Webflow SEO Panel','Semrush','Ahrefs','Cloudflare','PageSpeed Insights','Schema Markup'] },
              ].map(group => (
                <div className="wf-tech-group" key={group.label}>
                  <div className="wf-tech-group-title">{group.label}</div>
                  <div className="wf-tech-tags">
                    {group.tags.map(tag => <span className="wf-tech-tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="wf-process-section">
          <div className="wf-process-top">
            <div className={`wf-section-reveal${visibleSections.has('process') ? ' wf-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="wf-process-eyebrow">HOW WE WORK</p>
              <h2 className="wf-process-main-title">How We Deliver Webflow Projects</h2>
              <p className="wf-process-main-desc">Our Webflow team follows a four-stage process refined over 200+ projects. You approve design before any development begins — no surprises, no scope creep, and a fully editable site handed to you at launch.</p>
            </div>
            <hr className="wf-process-divider" />
          </div>
          <div className="wf-process-inner">
            <div className="wf-process-steps">
              {[
                ['Discover','We start with a free scoping call to map your goals, target audience, page count, CMS structure, required integrations, and brand guidelines. Our Webflow strategist documents the full site architecture before a single design frame is opened.'],
                ['Design','We build a pixel-perfect Figma prototype — desktop and mobile — covering every page state and interaction. You review, provide feedback, and sign off before Webflow development begins. Design-approved means no surprises in build.'],
                ['Build','Our Webflow developers translate the approved Figma into a clean, semantic Webflow project — with CMS Collections configured, animations implemented, integrations wired, and all content migrated. Weekly demo links keep you in the loop.'],
                ['Launch','We run a full QA pass (mobile, cross-browser, forms, CMS, performance), configure SEO settings, set up 301 redirects, connect your domain, and hand over a recorded walkthrough so your team can manage content independently from day one.'],
              ].map(([title, desc], i) => (
                <div
                  className={`wf-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="wf-pstep-left">
                    <div className="wf-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="wf-pstep-arrow" />}
                  </div>
                  <div className="wf-pstep-content">
                    <h3 className="wf-pstep-title">{title}</h3>
                    <p className="wf-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="wf-process-image-col">
              <div className="wf-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/office.png" alt="1Solutions Webflow development team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="wf-testi-section">
          <div className="wf-testi-inner">
            <div className={`wf-section-header-center wf-section-reveal${visibleSections.has('testi') ? ' wf-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="wf-section-eyebrow">Client Reviews</span>
              <h2 className="wf-section-title">What Our Clients Say</h2>
              <p className="wf-section-sub">Trusted by SaaS companies, agencies, and professional services firms across the US, Canada, and Australia.</p>
            </div>
            <div className="wf-testi-grid" ref={testiGridRef}>
              {[
                { initials:'SR', bg:'#1a4a7a', text:'"1Solutions rebuilt our entire marketing site in Webflow — from a sluggish WordPress install to a 98 PageSpeed score. The CMS handoff was brilliant; our content team updates everything without us. Incredible value."', name:'Sarah Rutherford', role:'VP Marketing, Stackify SaaS — USA', featured:false },
                { initials:'JM', bg:'#0F3460', text:'"They migrated our 180-page WordPress site to Webflow with zero ranking loss. Every redirect was handled correctly and the new site loads in under 1.5 seconds. Best investment we made this year."', name:'James Mitchell', role:'SEO Director, LegalEdge — Australia', featured:true },
                { initials:'LC', bg:'#2d5a8e', text:'"The Webflow animations they built for our product launch were stunning. Clients kept mentioning the website on discovery calls. 1Solutions understood our brand better than agencies we\'d paid 5× more."', name:'Laura Chen', role:'Founder, Prism Creative Studio — Canada', featured:false },
              ].map((t,i) => (
                <div className={`wf-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' wf-tcard-visible':''}`} key={t.name}>
                  <div className="wf-tcard-stars">★★★★★</div>
                  <p className="wf-tcard-text">{t.text}</p>
                  <div className="wf-tcard-author">
                    <div className="wf-tcard-avatar" style={{ background:t.bg }}>{t.initials}</div>
                    <div>
                      <div className="wf-tcard-name">{t.name}</div>
                      <div className="wf-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="wf-testi-stats">
              {[['4.9/5','Average Rating'],['150+','Verified Reviews'],['98%','Client Satisfaction'],['96%','Repeat Clients']].map(([num,label],i,arr) => (
                <>
                  <div className="wf-tstat" key={label}>
                    <span className="wf-tstat-num">{num}</span>
                    <span className="wf-tstat-label">{label}</span>
                  </div>
                  {i < arr.length-1 && <div className="wf-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="wf-why-section">
          <div className="wf-why-inner">
            <div className={`wf-section-reveal${visibleSections.has('why') ? ' wf-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center',marginBottom:0 }}>
              <span className="wf-section-eyebrow">Why 1Solutions</span>
              <h2 className="wf-section-title">Why Businesses Choose Us for Webflow Development</h2>
              <p className="wf-section-sub" style={{ maxWidth:680,margin:'0 auto' }}>We don't just build Webflow sites — we build revenue-generating digital platforms. Here's what makes us different from freelancers and generic web agencies.</p>
            </div>
            <div className="wf-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`wf-why-card${visibleWhyCards.includes(i) ? ' wf-card-visible' : ''}`} key={w.title} style={{ transitionDelay:`${i * 0.05}s` }}>
                  <div className="wf-why-card-header">
                    <div className="wf-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="wf-engage-section" id="engagement">
          <div className="wf-engage-inner">
            <div className="wf-engage-header">
              <span className="wf-section-eyebrow">How We Engage</span>
              <h2 className="wf-engage-title">Flexible Webflow Engagement Models</h2>
              <p className="wf-engage-desc">Whether you need a one-time build, a WordPress migration, or an ongoing Webflow partner — pick the model that fits your team and budget.</p>
            </div>

            <div className="wf-table-wrap">
              <table className="wf-cmp-table">
                <thead>
                  <tr>
                    <th className="wf-cmp-th"><span style={{fontSize:'12px',fontWeight:600,color:'#6B7280',textTransform:'uppercase',letterSpacing:'1px'}}>Feature</span></th>
                    <th className="wf-cmp-th">
                      <span className="wf-plan-badge">One-time</span>
                      <span className="wf-cmp-plan-name">Fixed-Price Project</span>
                      <span className="wf-cmp-plan-price">From $4,000</span>
                    </th>
                    <th className="wf-cmp-th">
                      <span className="wf-plan-badge">Ongoing</span>
                      <span className="wf-cmp-plan-name">Monthly Retainer</span>
                      <span className="wf-cmp-plan-price">From $1,200/mo</span>
                    </th>
                    <th className="wf-cmp-th wf-th-feat">
                      <span className="wf-popular-badge">Most Popular</span>
                      <span className="wf-cmp-plan-name">Dedicated Developer</span>
                      <span className="wf-cmp-plan-price">From $3,500/mo</span>
                    </th>
                    <th className="wf-cmp-th">
                      <span className="wf-plan-badge">Advisory</span>
                      <span className="wf-cmp-plan-name">Webflow Consulting</span>
                      <span className="wf-cmp-plan-price">From $500/session</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Best For',          'New builds & migrations', 'Growing businesses', 'SaaS marketing teams', 'In-house dev teams'],
                    ['Timeline',          '4–8 weeks', 'Ongoing', 'Ongoing', '1–2 weeks'],
                    ['Custom Figma Design', '✓', 'add-on', '✓', '✕'],
                    ['Webflow Development','✓', '✓', '✓', '✕'],
                    ['CMS Setup & Training','✓', '✓', '✓', '✕'],
                    ['SEO Configuration',  '✓', '✓', '✓', '✕'],
                    ['Priority Support',   '✕', '✓', '✓', '✕'],
                    ['Dedicated Developer','✕', '✕', '✓', '✕'],
                    ['Monthly Dev Hours',  '✕', '✓', '✓', '✕'],
                    ['Flexible Scope',     '✕', '✓', '✓', '✕'],
                    ['Architecture Review','✕', '✕', '✕', '✓'],
                    ['Team Training',      '✕', '✕', '✕', '✓'],
                  ].map(([label, ...cols]) => (
                    <tr key={label}>
                      <td className="wf-cmp-td">{label}</td>
                      {cols.map((v, ci) => {
                        const featured = ci === 2;
                        let cell;
                        if (v === '✓')      cell = <span className="wf-tick">✓</span>;
                        else if (v === '✕') cell = <span className="wf-cross">—</span>;
                        else if (v === 'add-on') cell = <span className="wf-addon">Add-on</span>;
                        else                cell = <span className="wf-td-text hi">{v}</span>;
                        return <td key={ci} className={`wf-cmp-td${featured ? ' wf-th-feat' : ''}`}>{cell}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="wf-contact-section" id="contact">
          <div className="wf-contact-container">
            <div>
              <h2 className="wf-contact-title">Start Your Webflow Project Today</h2>
              <p className="wf-contact-desc">Tell us about your project and we'll get back to you within one business day with a scoping questionnaire and free consultation slot.</p>
              <div className="wf-merged-box">
                {[
                  { label:'Free scoping consultation', desc:'30-minute call to define your goals, timeline, and budget — no obligation.' },
                  { label:'Detailed fixed-price quote', desc:'Clear scope, milestones, and deliverables with no hidden costs.' },
                  { label:'Figma prototype before build', desc:'You approve every design detail before a single Webflow element is created.' },
                  { label:'Full CMS handoff with training', desc:'Your team edits content independently — no developer dependency after launch.' },
                ].map(b => (
                  <div className="wf-benefit-item" key={b.label}>
                    <div className="wf-benefit-icon-wrap">
                      <svg className="wf-benefit-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p><strong>{b.label}</strong> — {b.desc}</p>
                  </div>
                ))}
                <div className="wf-stats-box">
                  <div className="wf-stats-grid">
                    {[['200+','Webflow sites delivered'],['15+','Years in business'],['96%','Client retention']].map(([n,t]) => (
                      <div key={t}>
                        <div className="wf-stat-number">{n}</div>
                        <div className="wf-stat-text">{t}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="wf-form-box">
              <h3>Tell Us About Your Webflow Project</h3>
              <form
                className="wf-contact-form"
                onSubmit={async e => {
                  e.preventDefault();
                  const fd = new FormData(e.target);
                  await fetch('/api/contact', {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify({
                      name:`${fd.get('fname')} ${fd.get('lname')}`,
                      email:fd.get('email'),
                      phone:`${fd.get('countryCode')} ${fd.get('phone')}`,
                      company:fd.get('company'),
                      message:fd.get('message'),
                      source:'Webflow Development Services',
                      consent:fd.get('consent') === 'on',
                    }),
                  });
                  e.target.reset();
                  alert('Thank you! We\'ll be in touch within one business day.');
                }}
              >
                <div className="wf-form-row">
                  <div className="wf-form-group">
                    <label>First Name *</label>
                    <input name="fname" type="text" placeholder="John" required />
                  </div>
                  <div className="wf-form-group">
                    <label>Last Name *</label>
                    <input name="lname" type="text" placeholder="Smith" required />
                  </div>
                </div>
                <div className="wf-form-group full">
                  <label>Work Email *</label>
                  <input name="email" type="email" placeholder="john@company.com" required />
                </div>
                <div className="wf-form-group full">
                  <label>Phone Number</label>
                  <div className="wf-phone-input">
                    <select name="countryCode" defaultValue="+1">
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+1-CA">🇨🇦 +1</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+91">🇮🇳 +91</option>
                    </select>
                    <input name="phone" type="tel" placeholder="(555) 000-0000" />
                  </div>
                </div>
                <div className="wf-form-group full">
                  <label>Company / Website URL</label>
                  <input name="company" type="text" placeholder="Acme Inc. or acme.com" />
                </div>
                <div className="wf-form-group full">
                  <label>Tell Us About Your Project *</label>
                  <textarea name="message" rows={4} placeholder="E.g. 'We need a Webflow site with a blog CMS, animations, and HubSpot integration. Currently on WordPress.'" required style={{ resize:'vertical' }} />
                </div>
                <div className="wf-consent">
                  <input type="checkbox" name="consent" id="wf-consent" required />
                  <label htmlFor="wf-consent">
                    I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to being contacted about my enquiry.
                  </label>
                </div>
                <button type="submit" className="wf-submit-btn">Send My Project Brief →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="wf-faq-section">
          <div className="wf-faq-inner">
            <div className={`wf-section-reveal${visibleSections.has('faq') ? ' wf-revealed' : ''}`} ref={el => { sectionRefs.current['faq'] = el; }}>
              <h2 className="wf-faq-heading">Webflow Development — Frequently Asked Questions</h2>
            </div>
            <div className="wf-faq-list">
              {FAQS.map((f, i) => (
                <div className={`wf-faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                  <button className="wf-faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="wf-faq-q-badge">{i + 1}</span>
                    <span>{f.q}</span>
                    <svg className="wf-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="wf-faq-answer-wrap">
                    <div className="wf-faq-answer">
                      <span className="wf-faq-a-badge">A</span>{f.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="wf-related-section">
          <div className="wf-related-inner">
            <span className="wf-related-eyebrow">Explore More Services</span>
            <h2 className="wf-related-title">Related Web & Digital Services</h2>
            <p className="wf-related-sub">1Solutions offers a full spectrum of web development and digital marketing services to complement your Webflow site.</p>
            <hr className="wf-related-divider" />
            <div className="wf-related-tags">
              {[
                ['/web-development-services/','Web Development Services','wf-rtag-blue'],
                ['/website-design/','Website Design','wf-rtag-violet'],
                ['/wordpress-development-company/','WordPress Development','wf-rtag-amber'],
                ['/shopify-store-development/','Shopify Development','wf-rtag-teal'],
                ['/nextjs-development-services/','Next.js Development','wf-rtag-rose'],
                ['/ecommerce-website-development-services/','E-Commerce Development','wf-rtag-green'],
                ['/seo-services-company/','SEO Services','wf-rtag-indigo'],
                ['/conversion-rate-optimization-services/','CRO Services','wf-rtag-orange'],
                ['/content-marketing-services/','Content Marketing','wf-rtag-sky'],
                ['/hire-dedicated-ui-ux-designer/','UI/UX Design','wf-rtag-emerald'],
                ['/website-support-maintenance-services/','Website Support','wf-rtag-blue'],
                ['/hire-full-stack-developer/','Hire Full-Stack Developer','wf-rtag-violet'],
              ].map(([href,label,cls]) => (
                <Link key={href} href={href} className={`wf-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
