'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'WordPress as Headless CMS', desc:'Decouple your WordPress CMS from the presentation layer. Use the familiar WP admin for content while serving it via API to any frontend framework.', featured:false },
  { n:'02', title:'Next.js + WPGraphQL Development', desc:'The gold-standard headless stack. WordPress powers content, WPGraphQL exposes a typed API, and Next.js renders blazing-fast pages with ISR and SSG.', featured:true },
  { n:'03', title:'WordPress REST API Development', desc:'Custom WordPress REST API endpoints, authentication, and data transformations to connect WordPress content with web and mobile applications.', featured:false },
  { n:'04', title:'Custom WPGraphQL Schema', desc:'Extend WPGraphQL with custom post types, ACF fields, and bespoke resolvers so your frontend queries exactly the data it needs, nothing more.', featured:false },
  { n:'05', title:'Headless WooCommerce', desc:'Decouple WooCommerce for blazing-fast storefronts. We build headless commerce experiences using WooCommerce as the backend and Next.js or React as the frontend.', featured:false },
  { n:'06', title:'Static Site Generation and ISR', desc:'Generate static pages from WordPress content at build time with Incremental Static Regeneration, delivering sub-second load times and perfect Core Web Vitals scores.', featured:false },
  { n:'07', title:'Headless WordPress Migration', desc:'Migrate your existing WordPress site to a headless architecture without losing content, SEO rankings, or URLs. We handle the full transition with minimal downtime.', featured:false },
  { n:'08', title:'React and Vue Frontend Development', desc:'Bespoke frontend UIs built with React, Next.js, or Vue, consuming WordPress content via GraphQL or REST with pixel-perfect design and smooth animations.', featured:false },
  { n:'09', title:'Vercel and Edge Deployment', desc:'Deploy your headless WordPress frontend on Vercel, Netlify, or AWS CloudFront for global CDN delivery, automatic preview environments, and zero-config CI/CD.', featured:false },
  { n:'10', title:'Preview Mode and Live Editing', desc:'Real-time content preview for editors: draft posts, live preview, and instant feedback loops so your content team can work confidently in WordPress.', featured:false },
  { n:'11', title:'Headless Multisite Architecture', desc:'Manage content across multiple brands, regions, or microsites from a single WordPress Multisite installation, served to separate headless frontends.', featured:false },
  { n:'12', title:'Ongoing Support and Maintenance', desc:'Dedicated post-launch support covering WPGraphQL updates, dependency management, performance monitoring, and SLA-backed response times.', featured:false },
];

const FAQS = [
  { q:'What is headless WordPress development?', a:'Headless WordPress separates the CMS backend from the frontend presentation layer. WordPress manages content via its familiar dashboard, but instead of rendering pages itself, it exposes content through REST API or WPGraphQL. A modern JavaScript framework, typically Next.js or React, fetches that data and renders the frontend. The result is a faster, more secure, and highly flexible website that still gives editors the WordPress admin experience they know.' },
  { q:'What frontend frameworks do you use with headless WordPress?', a:'Our primary recommendation is Next.js paired with WPGraphQL. This combination delivers the best balance of developer experience, performance, and SEO capability. We also work with React (SPA and SSR), Gatsby, Astro, and Vue depending on project requirements. For eCommerce, we use Next.js with headless WooCommerce via the WooCommerce Store API or GraphQL.' },
  { q:'Is headless WordPress better than traditional WordPress?', a:'Headless is better for performance-critical applications, enterprise platforms, and projects requiring omnichannel content delivery (web, mobile app, digital signage, etc.). Traditional WordPress is better for content-heavy sites where editorial flexibility and plugin ecosystem breadth matter most. We help you evaluate which approach fits your specific goals. There is no one-size-fits-all answer, and we will never recommend headless just for its own sake.' },
  { q:'How much does headless WordPress development cost?', a:'Headless WordPress projects typically start from $5,000 for a basic business site migration and range up to $30,000+ for complex headless WooCommerce stores, enterprise platforms, or multi-site architectures. The cost depends on frontend complexity, number of content types, integrations, and performance requirements. We provide a detailed fixed-price quote after a free discovery call.' },
  { q:'How long does a headless WordPress project take?', a:'A standard headless WordPress build typically takes 6 to 10 weeks from kick-off to launch. Complex headless WooCommerce stores or enterprise multisite architectures can take 12 to 20 weeks. We share a detailed project timeline at the proposal stage and provide weekly progress updates via Slack and Loom.' },
  { q:'Can I still edit content in the WordPress admin with a headless setup?', a:'Yes, this is one of the biggest advantages of headless WordPress. Your content editors continue to use the same familiar WordPress dashboard, Gutenberg editor, and ACF fields they already know. The only change is on the frontend. Editors will not notice a difference in their day-to-day workflow, but your website visitors will experience a dramatically faster, more modern site.' },
  { q:'Do you support WooCommerce in headless architectures?', a:'Yes. We build headless WooCommerce storefronts using the WooCommerce REST API or the WooCommerce GraphQL extension. Your product catalogue, cart, checkout, and customer accounts are managed in WooCommerce, while the storefront is a fast Next.js application. This approach delivers significantly better performance than a traditional WooCommerce theme while retaining the full power of WooCommerce as a commerce engine.' },
  { q:'What is WPGraphQL and why should I use it over the REST API?', a:'WPGraphQL is a WordPress plugin that adds a fully-typed GraphQL API to WordPress. Compared to the REST API, GraphQL lets your frontend request exactly the fields it needs in a single query, eliminating over-fetching and under-fetching. It supports custom post types, ACF fields, and complex relational queries out of the box. For Next.js frontends, WPGraphQL is significantly more efficient and developer-friendly than the REST API.' },
  { q:'Will a headless WordPress site rank well on Google?', a:'Yes, when built correctly, headless WordPress sites rank extremely well. Since Next.js supports server-side rendering (SSR) and static site generation (SSG), Google can index your pages just as effectively as a traditional site. We build every headless frontend with Core Web Vitals optimisation, schema markup, semantic HTML, canonical tags, and XML sitemaps, covering all the technical SEO foundations that drive rankings.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V17H7v2h10v-2h-4v-1.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>, title:'15+ Years of WordPress Expertise', desc:'We have been building WordPress solutions since 2008 and headless architectures since Next.js launched. That depth of experience means fewer surprises and faster delivery on every project.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'Global Client Experience', desc:'We understand the performance expectations, compliance requirements, and UX standards of English-speaking western markets. Every headless build is tuned to meet your audience\'s expectations.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'On-Time, On-Budget Delivery', desc:'Our structured 4D process (Discover, Define, Develop, Deploy) ensures headless projects are scoped correctly and delivered without cost overruns or scope creep.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'Performance-Obsessed', desc:'We build headless WordPress frontends that score 90+ on Google PageSpeed. Core Web Vitals, image optimisation, edge caching, and ISR are built in from day one, not added later.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Full-Stack Capability', desc:'Design, WPGraphQL API development, Next.js frontend, WooCommerce headless, Vercel deployment, and ongoing SEO, all under one roof. No handoffs, no finger-pointing.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Dedicated Point of Contact', desc:'No ticket queues. You get a dedicated project manager and a lead developer who communicate daily, understand your goals, and keep your project moving forward.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'SEO Built Into Every Build', desc:'Server-side rendering, schema markup, Core Web Vitals, and canonical tags are built into every headless frontend we ship. Rankings are never sacrificed for speed.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership', desc:'97% client retention rate. We don\'t disappear after launch. Our maintenance plans, support retainers, and growth partnerships keep us invested in your success.' },
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
    <div className="hwp-stat-col">
      <div className="hwp-stat-label">{label}</div>
      <div className="hwp-stat-value">{display}</div>
    </div>
  );
}

export default function HeadlessWordPressDevelopment() {
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Headless WordPress Development',
    description: 'Expert headless WordPress development services using Next.js, WPGraphQL, and modern JavaScript frameworks. Build blazing-fast, SEO-optimized decoupled WordPress websites.',
    provider: {
      '@type': 'Organization',
      name: '1Solutions',
      url: 'https://www.1solutions.biz',
    },
    areaServed: ['US', 'CA', 'AU'],
    serviceType: 'Headless CMS Development',
  };

  return (
    <>
      <Head>
        <title>Headless WordPress Development Company | WPGraphQL and Next.js Experts | 1Solutions</title>
        <meta name="description" content="1Solutions is a leading headless WordPress development company. We build blazing-fast decoupled WordPress websites using Next.js, WPGraphQL, and React for clients worldwide." />
        <meta name="keywords" content="headless wordpress development, headless wordpress development company, headless CMS wordpress, decoupled wordpress, wordpress next.js development, wpgraphql development, headless wordpress agency" />
        <link rel="canonical" href="https://www.1solutions.biz/headless-wordpress-development/" />
        <meta property="og:title" content="Headless WordPress Development Company | WPGraphQL and Next.js | 1Solutions" />
        <meta property="og:description" content="Build blazing-fast, SEO-optimized headless WordPress websites with 1Solutions. Expert Next.js and WPGraphQL development for global clients." />
        <meta property="og:url" content="https://www.1solutions.biz/headless-wordpress-development/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Headless WordPress Development | 1Solutions" />
        <meta name="twitter:description" content="Expert headless WordPress development using Next.js and WPGraphQL. Blazing fast, fully SEO-optimized decoupled CMS solutions." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <style>{`
          .hwp-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #ede9fe 0%, #dbeafe 25%, #e0f2fe 50%, #f3e8ff 75%, #ede9fe 100%);
            background-attachment: scroll;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .hwp-page *, .hwp-page *::before, .hwp-page *::after { box-sizing: border-box; }

          /* Orbs */
          .hwp-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,0.28) 0%,rgba(109,40,217,0.10) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .hwp-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,0.22) 0%,rgba(37,99,235,0.10) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .hwp-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.16) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* Hero */
          .hwp-hero-block { background:transparent;position:relative;overflow:hidden; }
          .hwp-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,0.10) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .hwp-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,0.13) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .hwp-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .hwp-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .hwp-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#4C1D95 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .hwp-hero-content p { font-size:16px;color:#3A507A;line-height:1.65;max-width:620px;margin:0 auto 28px; }
          .hwp-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#4C1D95;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(76,29,149,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .hwp-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);box-shadow:0 12px 36px rgba(76,29,149,0.15),0 0 0 2px rgba(245,158,11,0.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#4C1D95; }
          .hwp-btn-hero-shimmer { animation:hwp-shimmer 2.8s ease-in-out infinite; }
          @keyframes hwp-shimmer { 0%,100%{box-shadow:0 4px 20px rgba(76,29,149,0.10),inset 0 1px 0 rgba(255,255,255,1);} 50%{box-shadow:0 4px 32px rgba(76,29,149,0.22),0 0 0 3px rgba(245,158,11,0.18),inset 0 1px 0 rgba(255,255,255,1);} }

          /* Stats */
          .hwp-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(76,29,149,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .hwp-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(76,29,149,0.10); }
          .hwp-stat-col:last-child { border-right:none; }
          .hwp-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .hwp-stat-value { font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1; }

          /* Client logo marquee */
          .hwp-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .hwp-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .hwp-clients-logos { width:100%;overflow:hidden; }
          .hwp-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:hwp-marquee 28s linear infinite; }
          .hwp-logos-track:hover { animation-play-state:paused; }
          @keyframes hwp-marquee { 0%{transform:translateX(0);} 100%{transform:translateX(-50%);} }
          .hwp-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .hwp-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Shared sections */
          .hwp-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .hwp-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#4C1D95 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .hwp-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .hwp-section-sub { font-size:16px;color:#4A6080;margin:0; }

          /* Section reveal animation */
          .hwp-section-reveal { opacity:0;transform:translateY(32px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .hwp-section-reveal.hwp-revealed { opacity:1;transform:translateY(0); }

          /* Services */
          .hwp-services-section { background:rgba(237,233,254,0.55);padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(76,29,149,0.10),0 -4px 16px rgba(76,29,149,0.06); }
          .hwp-services-inner { max-width:1280px;margin:0 auto; }
          .hwp-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .hwp-service-card { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(219,234,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(76,29,149,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .hwp-service-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(76,29,149,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .hwp-service-card.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(237,233,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .hwp-service-card:hover .hwp-card-num { color:#D97706;opacity:0.12; }
          .hwp-service-card:hover h3 { color:#D97706; }
          .hwp-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#4C1D95;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .hwp-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .hwp-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .hwp-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#D97706,#f59e0b);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .hwp-service-card:hover::before { transform:scaleY(1); }
          .hwp-services-footer { text-align:center;margin-top:20px; }
          .hwp-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(76,29,149,0.20);color:#4C1D95;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(76,29,149,0.08);font-family:inherit; }
          .hwp-btn-show-more:hover { background:#4C1D95;border-color:#4C1D95;color:#ffffff;box-shadow:0 8px 28px rgba(76,29,149,0.20);transform:translateY(-2px); }

          /* Portfolio */
          .hwp-portfolio-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .hwp-portfolio-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(76,29,149,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .hwp-portfolio-header { display:flex;align-items:center;justify-content:space-between;margin-bottom:36px;gap:24px; }
          .hwp-portfolio-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#4C1D95 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0; }
          .hwp-btn-portfolio-cta { display:inline-block;padding:13px 26px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#4C1D95;font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap;transition:all 0.3s;box-shadow:0 4px 20px rgba(76,29,149,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .hwp-btn-portfolio-cta:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);color:#4C1D95; }
          .hwp-portfolio-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .hwp-pcard { display:flex;flex-direction:column;background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(76,29,149,0.12);border-radius:12px;overflow:hidden;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .hwp-pcard:hover { transform:translateY(-4px);border-color:rgba(217,119,6,0.5);box-shadow:0 12px 40px rgba(0,0,0,0.12); }
          .hwp-pcard-thumb { width:100%;aspect-ratio:16/10;overflow:hidden;background:#eee; }
          .hwp-pcard-thumb img { width:100%;height:100%;object-fit:cover;display:block; }
          .hwp-pcard-body { padding:18px 20px 20px;flex:1; }
          .hwp-pcard-name { font-size:18px;font-weight:800;color:#4C1D95;margin:0 0 5px; }
          .hwp-pcard-tech { font-size:13px;color:#4A6080;margin-bottom:5px;line-height:1.4; }
          .hwp-pcard-cats { font-size:13px;font-weight:700;color:#D97706; }

          /* Process */
          .hwp-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .hwp-process-top { max-width:1280px;margin:0 auto 56px; }
          .hwp-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .hwp-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#4C1D95 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .hwp-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .hwp-process-divider { border:none;border-top:1px solid rgba(76,29,149,0.15);margin:36px 0 0;width:100%; }
          .hwp-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .hwp-process-steps { display:flex;flex-direction:column; }
          .hwp-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .hwp-pstep.visible { opacity:1;transform:translateY(0); }
          .hwp-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .hwp-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(76,29,149,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#4C1D95;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .hwp-pstep:hover .hwp-pstep-circle { background:rgba(245,158,11,0.2);border-color:#D97706;color:#D97706; }
          .hwp-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .hwp-pstep-arrow::before { content:'';width:2px;flex:1;background:#4C1D95;opacity:0.25; }
          .hwp-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #4C1D95;opacity:0.45;margin-top:-1px; }
          .hwp-pstep:last-child .hwp-pstep-arrow { display:none; }
          .hwp-pstep-content { padding:4px 0 44px; }
          .hwp-pstep:last-child .hwp-pstep-content { padding-bottom:0; }
          .hwp-pstep-title { font-size:22px;font-weight:700;color:#4C1D95;margin:0 0 10px;line-height:1.2; }
          .hwp-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .hwp-process-image-col { position:sticky;top:100px;min-width:0; }
          .hwp-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(76,29,149,0.15);aspect-ratio:4/5;background:#ede9fe; }
          .hwp-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Testimonials */
          .hwp-testi-section { background:rgba(237,233,254,0.45);border-top:1px solid rgba(76,29,149,0.08);border-bottom:1px solid rgba(76,29,149,0.08);padding:80px 40px;position:relative;z-index:1; }
          .hwp-testi-inner { max-width:1280px;margin:0 auto; }
          .hwp-section-header-center { text-align:center;margin-bottom:52px; }
          .hwp-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .hwp-tcard { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(219,234,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(76,29,149,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .hwp-tcard.hwp-tcard-visible { opacity:1;transform:translateY(0); }
          .hwp-tcard:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(76,29,149,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .hwp-tcard.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(237,233,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .hwp-tcard-stars { display:flex;gap:3px; }
          .hwp-tcard-star { color:#F59E0B;font-size:17px;line-height:1; }
          .hwp-tcard-quote { font-size:14px;color:#3A507A;line-height:1.75;flex:1; }
          .hwp-tcard-author { display:flex;flex-direction:column;gap:3px;border-top:1px solid rgba(76,29,149,0.10);padding-top:16px; }
          .hwp-tcard-name { font-weight:700;font-size:14px;color:#0F1F40; }
          .hwp-tcard-role { font-size:12px;color:#6A80A0; }

          /* Why */
          .hwp-why-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .hwp-why-inner { max-width:1280px;margin:0 auto; }
          .hwp-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:52px; }
          .hwp-why-card { background:rgba(255,255,255,0.55);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 22px;box-shadow:0 4px 20px rgba(76,29,149,0.06),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;opacity:0;transform:translateY(36px); }
          .hwp-why-card.hwp-card-visible { opacity:1;transform:translateY(0);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.22s,border-color 0.22s; }
          .hwp-why-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 44px rgba(76,29,149,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .hwp-why-card-header { display:flex;align-items:center;gap:14px;margin-bottom:12px; }
          .hwp-why-icon { width:40px;height:40px;flex-shrink:0;background:linear-gradient(135deg,rgba(237,233,254,0.80) 0%,rgba(255,255,255,0.90) 100%);border-radius:12px;border:1px solid rgba(76,29,149,0.15);display:flex;align-items:center;justify-content:center;padding:8px;color:#4C1D95; }
          .hwp-why-icon svg { width:22px;height:22px;fill:currentColor; }
          .hwp-why-card h3 { font-size:14px;font-weight:700;color:#0F1F40;line-height:1.35;margin:0; }
          .hwp-why-card p { font-size:13px;color:#4A6080;line-height:1.65;margin:0; }

          /* Engagement */
          .hwp-engage-section { padding:80px 40px;position:relative;z-index:1; }
          .hwp-engage-inner { max-width:1280px;margin:0 auto; }
          .hwp-engage-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-0.8px;background:linear-gradient(90deg,#4C1D95 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .hwp-engage-desc { font-size:15px;color:#4A6080;line-height:1.75;max-width:680px; }
          .hwp-eng-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px; }
          .hwp-eng-card { background:linear-gradient(135deg,rgba(237,233,254,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(254,252,232,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(76,29,149,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(44px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1),border-color 0.2s,box-shadow 0.25s; }
          .hwp-eng-card.hwp-eng-ev { opacity:1;transform:translateY(0); }
          .hwp-eng-card.hwp-eng-ev:hover { border-color:rgba(76,29,149,0.25);box-shadow:0 16px 48px rgba(76,29,149,0.14); }
          .hwp-eng-card.feat { background:linear-gradient(135deg,rgba(254,243,199,0.52) 0%,rgba(255,255,255,0.87) 55%,rgba(237,233,254,0.45) 100%);border-color:rgba(217,119,6,0.28);box-shadow:0 8px 32px rgba(217,119,6,0.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px); }
          .hwp-eng-card.feat.hwp-eng-ev { transform:translateY(-8px); }
          .hwp-eng-card.feat.hwp-eng-ev:hover { transform:translateY(-12px); }
          .hwp-eng-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px; }
          .hwp-eng-icon { width:48px;height:48px;background:rgba(76,29,149,0.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background 0.2s; }
          .hwp-eng-card.hwp-eng-ev:hover .hwp-eng-icon { background:rgba(76,29,149,0.14); }
          .hwp-eng-card.feat .hwp-eng-icon { background:rgba(217,119,6,0.10); }
          .hwp-eng-icon svg { fill:#4C1D95;transition:fill 0.2s; }
          .hwp-eng-card.feat .hwp-eng-icon svg { fill:#D97706; }
          .hwp-eng-name { font-size:22px;font-weight:900;color:#4C1D95;margin:0 0 6px;letter-spacing:-0.3px; }
          .hwp-eng-headline { font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px; }
          .hwp-eng-desc { font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px; }
          .hwp-eng-list-label { font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px; }
          .hwp-eng-list { list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px; }
          .hwp-eng-list li { display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5; }
          .hwp-eng-list li::before { content:'✓';font-weight:800;color:#4C1D95;flex-shrink:0;margin-top:1px; }
          .hwp-eng-process { font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(76,29,149,0.08); }
          .hwp-eng-process strong { color:#4C1D95; }
          .hwp-eng-timeline { display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px; }
          .hwp-eng-cta { display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all 0.22s;background:rgba(76,29,149,0.09);color:#4C1D95;border:1.5px solid rgba(76,29,149,0.18); }
          .hwp-eng-cta:hover { background:#4C1D95;color:#fff; }
          .hwp-eng-card.feat .hwp-eng-cta { background:#7C3AED;color:#fff;border-color:#7C3AED; }
          .hwp-eng-card.feat .hwp-eng-cta:hover { background:#4C1D95;border-color:#4C1D95; }

          /* Contact */
          .hwp-contact-section { background:linear-gradient(135deg,#4C1D95 0%,#312E81 60%,#1E1B4B 100%);padding:80px 40px;position:relative;z-index:2;overflow:hidden; }
          .hwp-contact-section::before { content:'';position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.06) 0%,transparent 70%);top:-200px;right:-200px;pointer-events:none; }
          .hwp-contact-container { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,45%) minmax(0,55%);gap:60px;align-items:start; }
          .hwp-contact-title { font-size:42px;font-weight:900;line-height:1.15;letter-spacing:-0.8px;color:#ffffff;margin:0 0 16px; }
          .hwp-contact-desc { font-size:15px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 28px; }
          .hwp-merged-box { background:rgba(255,255,255,0.08);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.15);border-radius:16px;padding:24px; }
          .hwp-benefit-item { display:flex;align-items:flex-start;gap:12px;margin-bottom:14px; }
          .hwp-benefit-item:last-child { margin-bottom:0; }
          .hwp-benefit-icon-wrap { width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .hwp-benefit-icon { width:16px;height:16px;color:rgba(255,255,255,0.85); }
          .hwp-benefit-item p { font-size:14px;color:rgba(255,255,255,0.80);margin:0;line-height:1.6;padding-top:6px; }
          .hwp-stats-box { margin-top:20px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:12px;padding:20px; }
          .hwp-stats-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:12px;text-align:center; }
          .hwp-stat-number { font-size:28px;font-weight:900;color:#F59E0B;line-height:1; }
          .hwp-stat-text { font-size:11px;color:rgba(255,255,255,0.65);margin-top:4px;font-weight:500; }
          .hwp-form-box { background:rgba(255,255,255,0.95);border-radius:20px;padding:36px 32px;box-shadow:0 20px 60px rgba(0,0,0,0.18); }
          .hwp-form-box h3 { font-size:20px;font-weight:800;color:#0F1F40;margin:0 0 22px; }
          .hwp-contact-form { display:flex;flex-direction:column;gap:14px; }
          .hwp-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .hwp-form-group { display:flex;flex-direction:column;gap:5px; }
          .hwp-form-group.full { grid-column:1/-1; }
          .hwp-form-group label { font-size:12px;font-weight:600;color:#4A6080; }
          .hwp-form-group input,.hwp-form-group select,.hwp-form-group textarea { width:100%;padding:10px 14px;border:1.5px solid rgba(76,29,149,0.18);border-radius:10px;font-size:14px;color:#0F1F40;background:#fff;outline:none;transition:border-color 0.2s;font-family:inherit; }
          .hwp-form-group input:focus,.hwp-form-group select:focus,.hwp-form-group textarea:focus { border-color:#7C3AED; }
          .hwp-phone-input { display:flex;gap:8px; }
          .hwp-phone-input select { flex-shrink:0;width:100px; }
          .hwp-phone-input input { flex:1; }
          .hwp-form-group textarea { resize:vertical;min-height:120px; }
          .hwp-consent { display:flex;align-items:flex-start;gap:10px;font-size:12px;color:#6A80A0;line-height:1.5; }
          .hwp-consent input { margin-top:2px;flex-shrink:0; }
          .hwp-consent a { color:#4C1D95;text-decoration:none; }
          .hwp-submit-btn { padding:13px 28px;background:linear-gradient(90deg,#4C1D95,#7C3AED);color:#fff;border:none;border-radius:50px;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.3s;box-shadow:0 4px 20px rgba(76,29,149,0.30);font-family:inherit; }
          .hwp-submit-btn:hover { background:linear-gradient(90deg,#3B0764,#6D28D9);box-shadow:0 8px 32px rgba(76,29,149,0.40);transform:translateY(-2px); }

          /* FAQ */
          .hwp-faq-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .hwp-faq-inner { max-width:900px;margin:0 auto; }
          .hwp-faq-heading { font-size:40px;font-weight:900;letter-spacing:-0.8px;background:linear-gradient(90deg,#4C1D95 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 44px;text-align:center; }
          .hwp-faq-list { display:flex;flex-direction:column;gap:12px; }
          .hwp-faq-item { background:rgba(255,255,255,0.55);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(76,29,149,0.06);transition:box-shadow 0.2s,border-color 0.2s; }
          .hwp-faq-item.open { border-color:rgba(76,29,149,0.25);box-shadow:0 6px 24px rgba(76,29,149,0.10); }
          .hwp-faq-question { width:100%;display:flex;align-items:center;gap:14px;padding:20px 22px;background:none;border:none;cursor:pointer;font-family:inherit;text-align:left; }
          .hwp-faq-q-badge { flex-shrink:0;width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#4C1D95,#7C3AED);color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center; }
          .hwp-faq-question span { flex:1;font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4; }
          .hwp-faq-chevron { width:18px;height:18px;flex-shrink:0;color:#4C1D95;transition:transform 0.3s; }
          .hwp-faq-item.open .hwp-faq-chevron { transform:rotate(180deg); }
          .hwp-faq-answer-wrap { max-height:0;overflow:hidden;transition:max-height 0.45s cubic-bezier(0.22,1,0.36,1); }
          .hwp-faq-item.open .hwp-faq-answer-wrap { max-height:400px; }
          .hwp-faq-answer { display:flex;gap:14px;padding:0 22px 22px; }
          .hwp-faq-a-badge { flex-shrink:0;width:26px;height:26px;border-radius:50%;background:rgba(245,158,11,0.15);color:#D97706;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;margin-top:1px; }
          .hwp-faq-answer p,.hwp-faq-answer { font-size:14px;color:#4A6080;line-height:1.75; }

          /* Related services */
          .hwp-related-section { background:rgba(237,233,254,0.45);border-top:1px solid rgba(76,29,149,0.08);padding:72px 40px 80px;position:relative;z-index:1; }
          .hwp-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .hwp-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px; }
          .hwp-related-title { font-size:40px;font-weight:900;letter-spacing:-0.8px;background:linear-gradient(90deg,#4C1D95 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 12px; }
          .hwp-related-sub { font-size:15px;color:#4A6080;max-width:560px;margin:0 auto; }
          .hwp-related-divider { border:none;border-top:1px solid rgba(76,29,149,0.12);margin:28px 0 32px; }
          .hwp-related-tags { display:flex;flex-wrap:wrap;gap:10px;justify-content:center; }
          .hwp-rtag { display:inline-block;padding:10px 20px;border-radius:50px;font-size:13px;font-weight:600;border:1px solid;text-decoration:none;transition:all 0.25s; }
          .hwp-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .hwp-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .hwp-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .hwp-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .hwp-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .hwp-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .hwp-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .hwp-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .hwp-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .hwp-rtag-slate   { background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155; }
          .hwp-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }
          .hwp-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.30);color:#0369A1; }

          /* Responsive */
          @media (max-width:1200px) {
            .hwp-services-grid { grid-template-columns:repeat(3,1fr); }
            .hwp-why-grid { grid-template-columns:repeat(3,1fr); }
          }
          @media (max-width:1024px) {
            .hwp-portfolio-grid { grid-template-columns:repeat(2,1fr); }
            .hwp-portfolio-wrap { padding:32px 28px 40px; }
            .hwp-engage-grid { grid-template-columns:1fr; }
            .hwp-process-inner { grid-template-columns:1fr; }
            .hwp-process-image-col { display:none; }
            .hwp-contact-container { grid-template-columns:1fr; }
          }
          @media (max-width:900px) {
            .hwp-services-grid { grid-template-columns:repeat(2,1fr); }
            .hwp-why-grid { grid-template-columns:repeat(2,1fr); }
            .hwp-testi-grid { grid-template-columns:1fr; }
          }
          @media (max-width:768px) {
            .hwp-portfolio-section { padding:48px 16px; }
            .hwp-portfolio-wrap { padding:24px 20px 32px;border-radius:16px; }
            .hwp-portfolio-header { flex-direction:column;align-items:flex-start;gap:14px; }
            .hwp-portfolio-title { font-size:26px; }
            .hwp-hero-content { padding:40px 20px 28px; }
            .hwp-hero-content h1 { font-size:32px; }
            .hwp-hero-stats { grid-template-columns:repeat(2,1fr); }
            .hwp-services-section { padding:52px 20px 40px; }
            .hwp-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .hwp-section-title,.hwp-engage-title,.hwp-process-main-title,.hwp-related-title { font-size:30px; }
            .hwp-form-row { grid-template-columns:1fr; }
            .hwp-contact-section { padding:52px 20px; }
            .hwp-clients-bar { padding:16px 20px 36px;gap:12px; }
            .hwp-client-logo { height:20px; }
          }
          @media (max-width:540px) {
            .hwp-portfolio-grid { grid-template-columns:1fr; }
            .hwp-hero-stats { grid-template-columns:repeat(2,1fr); }
            .hwp-services-grid { grid-template-columns:1fr; }
            .hwp-why-grid { grid-template-columns:1fr; }
            .hwp-engage-grid { grid-template-columns:1fr; }
            .hwp-section-title,.hwp-engage-title,.hwp-process-main-title,.hwp-related-title { font-size:26px; }
            .hwp-faq-heading { font-size:28px; }
            .hwp-portfolio-title { font-size:22px; }
          }
        `}</style>
      </Head>

      <div className="hwp-page">
        <div className="hwp-orb-1" aria-hidden="true" />
        <div className="hwp-orb-2" aria-hidden="true" />
        <div className="hwp-orb-3" aria-hidden="true" />

        {/* ── HERO ── */}
        <section className="hwp-hero-block">
          <div className="hwp-hero-content">
            <span className="hwp-eyebrow">Headless CMS · WPGraphQL · Next.js · React</span>
            <h1>Headless WordPress<br/>Development Company</h1>
            <p>We build lightning-fast, fully decoupled WordPress websites using Next.js and WPGraphQL, delivering 90+ PageSpeed scores, perfect Core Web Vitals, and unlimited frontend flexibility for businesses worldwide.</p>
            <Link href="#contact" className="hwp-btn-hero hwp-btn-hero-shimmer">Get a Free Consultation Now</Link>
          </div>
          <div className="hwp-hero-stats" ref={statsRef}>
            {[
              { label:'WordPress Projects', val:'500+' },
              { label:'Headless Builds', val:'80+' },
              { label:'Client Retention', val:'97%' },
              { label:'Years Experience', val:'15+' },
            ].map(s => <AnimatedStat key={s.label} label={s.label} val={s.val} started={statsStarted} />)}
          </div>
          <div className="hwp-clients-bar">
            <span className="hwp-clients-label">Trusted by Leading Brands</span>
            <div className="hwp-clients-logos">
              <div className="hwp-logos-track">
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
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="hwp-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="hwp-services-section">
          <div className="hwp-services-inner">
            <div className={`hwp-section-reveal${visibleSections.has('services') ? ' hwp-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="hwp-section-eyebrow">What We Build</span>
              <h2 className="hwp-section-title">Headless WordPress Development Services</h2>
              <p className="hwp-section-desc">From decoupled CMS architecture and WPGraphQL API development to blazing-fast Next.js frontends and headless WooCommerce stores. We cover every layer of your headless stack.</p>
            </div>
            <div className="hwp-services-grid">
              {visibleServices.map(s => (
                <div className={`hwp-service-card${s.featured ? ' featured' : ''}`} key={s.n}>
                  <span className="hwp-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 8 && (
              <div className="hwp-services-footer">
                <button className="hwp-btn-show-more" onClick={() => setShowAll(v => !v)}>
                  {showAll ? 'Show Less' : `Show All ${SERVICES.length} Services`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="hwp-portfolio-section" id="portfolio">
          <div className="hwp-portfolio-wrap">
            <div className="hwp-portfolio-header">
              <h2 className={`hwp-portfolio-title hwp-section-reveal${visibleSections.has('portfolio') ? ' hwp-revealed' : ''}`} ref={el => { sectionRefs.current['portfolio'] = el; }}>WordPress Projects<br/>Delivered</h2>
              <Link href="/portfolio" className="hwp-btn-portfolio-cta">Browse Our Portfolio</Link>
            </div>
            <div className="hwp-portfolio-grid">
              {[
                { img:'/images/portfolio/comtradesol.webp', name:'Comtradesol Financial Advisory', tech:'Financial Services / WordPress, WPGraphQL, Next.js', cats:'Headless CMS / Corporate Website / Financial', url:'https://www.comtradesol.com/' },
                { img:'/images/portfolio/mountsystems.png', name:'Mount Systems IT and Security', tech:'IT and Security / WordPress, Custom Theme, UI/UX Design', cats:'Corporate Website / IT Services / Security Solutions', url:'https://www.mount-systems.com.ki/' },
                { img:'/images/portfolio/charlespuma.webp', name:'Charles Puma Fine Art Gallery', tech:'Art and Culture / WordPress, Custom Theme, UI/UX Design', cats:'Art Gallery / Multi-location / Portfolio', url:'https://www.charlespuma.com/' },
              ].map(p => (
                <a className="hwp-pcard" key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none',color:'inherit'}}>
                  <div className="hwp-pcard-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} loading="lazy" />
                  </div>
                  <div className="hwp-pcard-body">
                    <h3 className="hwp-pcard-name">{p.name}</h3>
                    <div className="hwp-pcard-tech">{p.tech}</div>
                    <div className="hwp-pcard-cats">{p.cats}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="hwp-process-section">
          <div className="hwp-process-top">
            <div className={`hwp-section-reveal${visibleSections.has('process') ? ' hwp-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="hwp-process-eyebrow">HOW WE WORK</p>
              <h2 className="hwp-process-main-title">How We Deliver Headless WordPress Development</h2>
              <p className="hwp-process-main-desc">Our headless WordPress experts bring 15+ years of WordPress experience and deep Next.js and WPGraphQL expertise to every project. We follow a proven four-phase process to deliver decoupled WordPress solutions that are fast, scalable, and SEO-ready from day one.</p>
            </div>
            <hr className="hwp-process-divider" />
          </div>
          <div className="hwp-process-inner">
            <div className="hwp-process-steps">
              {[
                ['Discover', 'We audit your existing WordPress setup, content model, and performance goals, identifying the ideal headless architecture, frontend framework, and API strategy for your specific use case.'],
                ['Define', 'We design the WPGraphQL schema, content types, and frontend component architecture, mapping every content relationship and defining the data fetching strategy (SSG, ISR, or SSR) before writing a line of code.'],
                ['Develop', 'Our engineers build and configure WPGraphQL, develop the Next.js frontend, wire preview mode for editors, and integrate third-party services, with full progress visibility via GitHub and weekly Loom updates.'],
                ['Deploy', 'We deploy to Vercel or your preferred edge platform, configure CDN caching and ISR revalidation, run Lighthouse audits, and hand over documentation and editorial training, ensuring your team is ready for launch.'],
              ].map(([title, desc], i) => (
                <div className={`hwp-pstep${visibleSteps.includes(i) ? ' visible' : ''}`} key={title} ref={el => { stepRefs.current[i] = el; }}>
                  <div className="hwp-pstep-left">
                    <div className="hwp-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="hwp-pstep-arrow" />}
                  </div>
                  <div className="hwp-pstep-content">
                    <h3 className="hwp-pstep-title">{title}</h3>
                    <p className="hwp-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="hwp-process-image-col">
              <div className="hwp-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/office.png" alt="1Solutions headless WordPress development team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="hwp-testi-section">
          <div className="hwp-testi-inner">
            <div className={`hwp-section-header-center hwp-section-reveal${visibleSections.has('testi') ? ' hwp-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="hwp-section-eyebrow">Client Reviews</span>
              <h2 className="hwp-section-title">What Our Clients Say</h2>
              <p className="hwp-section-sub">Trusted by businesses worldwide for 15+ years of consistent delivery.</p>
            </div>
            <div className="hwp-testi-grid" ref={testiGridRef}>
              {[
                { name:'Michael R.', role:'CTO, Tech Startup, Austin TX', quote:'The team at 1Solutions delivered our headless WordPress and Next.js rebuild three weeks ahead of schedule. Our PageSpeed score went from 42 to 96 overnight. Outstanding technical depth.', featured:true },
                { name:'Sarah K.', role:'Marketing Director, Toronto', quote:'We needed our WordPress content team to keep using the WP admin while moving to a modern frontend. 1Solutions nailed the WPGraphQL setup and our editors barely noticed the change.', featured:false },
                { name:'James T.', role:'Founder, eCommerce Brand, Sydney', quote:'Headless WooCommerce was intimidating. The 1Solutions team made the architecture clear, the migration painless, and the performance improvements were dramatic. Highly recommend.', featured:false },
              ].map((t, i) => (
                <div className={`hwp-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' hwp-tcard-visible':''}`} key={t.name}>
                  <div className="hwp-tcard-stars">{[...Array(5)].map((_,j) => <span key={j} className="hwp-tcard-star">★</span>)}</div>
                  <p className="hwp-tcard-quote">"{t.quote}"</p>
                  <div className="hwp-tcard-author">
                    <span className="hwp-tcard-name">{t.name}</span>
                    <span className="hwp-tcard-role">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="hwp-why-section">
          <div className="hwp-why-inner">
            <div className={`hwp-section-reveal${visibleSections.has('why') ? ' hwp-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center',marginBottom:0 }}>
              <span className="hwp-section-eyebrow">Why 1Solutions</span>
              <h2 className="hwp-section-title">Why Choose Us for Headless WordPress</h2>
              <p className="hwp-section-sub" style={{ maxWidth:680,margin:'0 auto' }}>We don't just add a Next.js layer on top of WordPress. We architect headless solutions that are performant, maintainable, and built to scale with your business.</p>
            </div>
            <div className="hwp-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`hwp-why-card${visibleWhyCards.includes(i) ? ' hwp-card-visible' : ''}`} key={w.title}>
                  <div className="hwp-why-card-header">
                    <div className="hwp-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="hwp-engage-section">
          <div className="hwp-engage-inner">
            <div className={`hwp-section-reveal${visibleSections.has('engage') ? ' hwp-revealed' : ''}`} ref={el => { sectionRefs.current['engage'] = el; }}>
              <span className="hwp-section-eyebrow">How to Hire</span>
              <h2 className="hwp-engage-title">Engagement Models for Headless WordPress</h2>
              <p className="hwp-engage-desc">Hire a dedicated headless developer for an ongoing roadmap, engage on a fixed-price project for a complete decoupled build, or take out a monthly retainer for ongoing improvements and support, whichever matches your project and budget.</p>
            </div>
            <div className="hwp-eng-grid" ref={eCardsRef}>
              {[
                {
                  id:'dedicated', feat:true,
                  badge:'Most Popular', badgeColor:'#D97706',
                  iconPath:'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
                  name:'Dedicated Developer',
                  headline:'A full-time headless WordPress developer working exclusively on your project.',
                  desc:'A dedicated Next.js and WPGraphQL developer working as an extension of your team. Full access to your codebase, Vercel deployments, and WordPress admin. Significantly lower cost than a local agency retainer or a full-time in-house hire.',
                  bestFor:['Ongoing headless WordPress roadmap','Agencies needing a white-label Next.js developer','Performance-critical platforms needing continuous work','Replacing an expensive local agency at lower cost'],
                  process:'Discovery, developer matching, sprint delivery, ongoing roadmap',
                  timeline:'Developer available within 5 to 7 business days',
                },
                {
                  id:'fixed', feat:false,
                  badge:'Defined Scope', badgeColor:'#7C3AED',
                  iconPath:'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
                  name:'Fixed-Price Project',
                  headline:'Agreed price, agreed scope, delivered on a fixed schedule.',
                  desc:'Best for a well-defined headless WordPress build with a clear specification. Fixed price covering WPGraphQL setup, Next.js frontend, Vercel deployment, and launch. No scope creep, no surprise invoices.',
                  bestFor:['New headless WordPress build from scratch','Traditional WordPress to headless migration','Headless WooCommerce storefront build','One-time performance and architecture overhaul'],
                  process:'Detailed spec, fixed quote, milestone delivery, UAT, launch',
                  timeline:'Best for 6 to 20 week projects',
                },
                {
                  id:'retainer', feat:false,
                  badge:'Flexible Ongoing', badgeColor:'#a855f7',
                  iconPath:'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
                  name:'Monthly Retainer',
                  headline:'Monthly headless dev hours for ongoing changes and improvements.',
                  desc:'A monthly bank of Next.js and WPGraphQL developer hours for feature additions, content model changes, performance work, dependency updates, and emergency support, without a full dedicated team. Transparent hours reporting each month.',
                  bestFor:['Live headless sites needing regular feature work','WPGraphQL schema updates and ACF changes','Core Web Vitals and performance monitoring','Flexible support without a full-time commitment'],
                  process:'Monthly hours bank, ticket-based prioritisation, hours report, rolling rollover',
                  timeline:'Start within 3 to 5 business days',
                },
              ].map((m, i) => (
                <div key={m.id} className={`hwp-eng-card${m.feat ? ' feat' : ''}${visibleECards.includes(i) ? ' hwp-eng-ev' : ''}`} style={{ transitionDelay:`${i * 100}ms` }}>
                  <span className="hwp-eng-badge" style={{ color:m.badgeColor, borderColor:m.badgeColor+'44', background:m.badgeColor+'14' }}>{m.badge}</span>
                  <div className="hwp-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.iconPath} /></svg></div>
                  <div className="hwp-eng-name">{m.name}</div>
                  <div className="hwp-eng-headline">{m.headline}</div>
                  <div className="hwp-eng-desc">{m.desc}</div>
                  <div className="hwp-eng-list-label">Best for</div>
                  <ul className="hwp-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                  <div className="hwp-eng-process"><strong>Process:</strong> {m.process}<br /><span className="hwp-eng-timeline">{m.timeline}</span></div>
                  <Link href="#contact" className="hwp-eng-cta">Get a free estimate</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="hwp-contact-section" id="contact">
          <div className="hwp-contact-container">
            <div className="hwp-contact-left">
              <h2 className="hwp-contact-title">Let's Build Your Headless WordPress Site Together</h2>
              <p className="hwp-contact-desc">Tell us about your project and we'll get back to you within 24 hours with a tailored headless WordPress development plan.</p>
              <div className="hwp-merged-box">
                <div>
                  {[
                    { icon:<svg className="hwp-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'Your project details are confidential. We respect your privacy.' },
                    { icon:<svg className="hwp-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A senior headless WordPress architect reviews your requirements personally.' },
                    { icon:<svg className="hwp-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Response within 24 business hours. No automated replies.' },
                    { icon:<svg className="hwp-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:"No obligation to proceed. Let's just talk about your project." },
                  ].map((b,i) => (
                    <div className="hwp-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="hwp-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="hwp-stats-box">
                  <div className="hwp-stats-grid">
                    {[['500+','WordPress Projects'],['16+','Years Experience'],['97%','Client Retention']].map(([num,text]) => (
                      <div key={text}>
                        <div className="hwp-stat-number">{num}</div>
                        <div className="hwp-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="hwp-contact-right">
              <div className="hwp-form-box">
                <h3>Contact Us</h3>
                <form className="hwp-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="hwp-form-row">
                    <div className="hwp-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="hwp-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="hwp-form-row">
                    <div className="hwp-form-group">
                      <label>Phone Number*</label>
                      <div className="hwp-phone-input">
                        <select>
                          <option value="+91">+91</option>
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+61">+61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="hwp-form-group"><label>Organization*</label><input type="text" placeholder="Organization / Company Name*" required /></div>
                  </div>
                  <div className="hwp-form-group full"><label>Message*</label><textarea placeholder="Tell us about your headless WordPress project..." rows={6} required /></div>
                  <div className="hwp-consent">
                    <input type="checkbox" id="hwp-consent" required />
                    <label htmlFor="hwp-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="hwp-submit-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="hwp-faq-section" id="faq">
          <div className="hwp-faq-inner">
            <h2 className="hwp-faq-heading">Frequently Asked Questions</h2>
            <div className="hwp-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`hwp-faq-item${openFaq===i?' open':''}`} key={i}>
                  <button className="hwp-faq-question" onClick={() => setOpenFaq(openFaq===i ? -1 : i)}>
                    <div className="hwp-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="hwp-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="hwp-faq-answer-wrap">
                    <div className="hwp-faq-answer"><span className="hwp-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="hwp-related-section">
          <div className="hwp-related-inner">
            <span className="hwp-related-eyebrow">RELATED OFFERINGS</span>
            <h2 className="hwp-related-title">Explore Related Services and Technologies</h2>
            <p className="hwp-related-sub">Pair headless WordPress with our broader development and marketing services to build a complete digital platform.</p>
            <hr className="hwp-related-divider" />
            <div className="hwp-related-tags">
              {[
                ['WordPress Development',          'violet',  '/wordpress-development-company'],
                ['Next.js Development',             'blue',    '/nextjs-development-services'],
                ['WooCommerce Development',         'green',   '/woocommerce-development-company'],
                ['WordPress Maintenance and Support', 'teal',  '/wordpress-support-and-maintenance-services'],
                ['WordPress SEO Services',          'rose',    '/wordpress-seo-services'],
                ['E-Commerce Development',          'amber',   '/ecommerce-website-development-services'],
                ['UI/UX Design Services',           'indigo',  '/website-design'],
                ['PHP Development',                 'slate',   '/php-development-services'],
                ['Digital Marketing Services',      'emerald', '/digital-marketing-services'],
                ['SEO Services',                    'orange',  '/seo-services-company'],
              ].map(([label,color,href]) => (
                <Link href={href} className={`hwp-rtag hwp-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
