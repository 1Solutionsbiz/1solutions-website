'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    tag: null,
    price: { monthly: 299, annual: 239 },
    desc: 'For small businesses and local brands ready to be found online.',
    features: [
      { label: 'Keywords Targeted', value: 'Up to 10' },
      { label: 'On-Page Optimisation', value: '10 pages' },
      { label: 'Monthly Backlinks', value: '5–8' },
      { label: 'Blog / Content Articles', value: '2 / month' },
      { label: 'Technical SEO Audit', yes: true },
      { label: 'Google Analytics & Search Console Setup', yes: true },
      { label: 'XML Sitemap & Robots.txt', yes: true },
      { label: 'Local SEO (Google Business Profile)', yes: true },
      { label: 'Schema Markup', yes: false },
      { label: 'Competitor Analysis', yes: false },
      { label: 'Dedicated Account Manager', yes: false },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    tag: 'Most Popular',
    price: { monthly: 599, annual: 479 },
    desc: 'For growing businesses that need consistent rankings and traffic.',
    featured: true,
    features: [
      { label: 'Keywords Targeted', value: 'Up to 25' },
      { label: 'On-Page Optimisation', value: '25 pages' },
      { label: 'Monthly Backlinks', value: '15–20' },
      { label: 'Blog / Content Articles', value: '4 / month' },
      { label: 'Technical SEO Audit', yes: true },
      { label: 'Google Analytics & Search Console Setup', yes: true },
      { label: 'XML Sitemap & Robots.txt', yes: true },
      { label: 'Local SEO (Google Business Profile)', yes: true },
      { label: 'Schema Markup', yes: true },
      { label: 'Competitor Analysis', yes: true },
      { label: 'Dedicated Account Manager', yes: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tag: 'Best Results',
    price: { monthly: 999, annual: 799 },
    desc: 'For established brands targeting competitive national or global keywords.',
    features: [
      { label: 'Keywords Targeted', value: 'Up to 60' },
      { label: 'On-Page Optimisation', value: 'Unlimited' },
      { label: 'Monthly Backlinks', value: '35–50' },
      { label: 'Blog / Content Articles', value: '8 / month' },
      { label: 'Technical SEO Audit', yes: true },
      { label: 'Google Analytics & Search Console Setup', yes: true },
      { label: 'XML Sitemap & Robots.txt', yes: true },
      { label: 'Local SEO (Google Business Profile)', yes: true },
      { label: 'Schema Markup', yes: true },
      { label: 'Competitor Analysis', yes: true },
      { label: 'Dedicated Account Manager', yes: true },
    ],
  },
];

const INCLUDED = [
  { n:'01', title:'Technical SEO', desc:'Core Web Vitals, crawlability, site architecture, XML sitemaps, robots.txt, HTTPS, canonical tags, and structured data markup.', featured: false },
  { n:'02', title:'On-Page Optimisation', desc:'Title tags, meta descriptions, H1–H6 hierarchy, keyword placement, internal linking, and image alt text optimisation.', featured: true },
  { n:'03', title:'Link Building', desc:'Manual outreach for genuine editorial backlinks from authoritative, niche-relevant websites. No spam, no PBNs, no shortcuts.', featured: false },
  { n:'04', title:'SEO Content Writing', desc:'In-house writers create keyword-optimised blog posts and landing pages that rank in Google and convert visitors into leads.', featured: false },
  { n:'05', title:'Local SEO', desc:'Google Business Profile optimisation, local citations, NAP consistency, and review management for local search visibility.', featured: false },
  { n:'06', title:'Analytics & Reporting', desc:'GA4 and Search Console setup, monthly keyword rank tracking, traffic analysis, and a plain-English performance report.', featured: false },
];

const FAQS = [
  { q: 'How long does SEO take to show results?', a: 'Most clients see meaningful ranking improvements within 3–6 months. SEO is a long-term investment — the compounding results over 12+ months are where the real ROI sits. We set realistic timelines from day one and provide monthly reports so you can see progress at every stage.' },
  { q: 'Do you guarantee first-page rankings?', a: "No ethical SEO agency can guarantee specific rankings — Google's algorithm is not within anyone's control. What we guarantee is transparent, white-hat SEO work done to the highest standard, with measurable progress every month. We've ranked 500+ businesses across 50+ industries over 15 years." },
  { q: 'Can I upgrade my package later?', a: 'Yes — you can upgrade to a higher package at any time. Your existing work and keyword progress carry forward with no penalty. There is no long-term lock-in; we earn your business month by month through results.' },
  { q: 'Do you work with businesses outside India?', a: 'Yes. The majority of our SEO clients are in the US, Canada, and Australia. We work across all time zones with async communication and regular video check-ins. Our reporting is adapted to your local market and search landscape.' },
  { q: 'Is content writing included in the package?', a: 'Yes. All packages include SEO blog articles written by our in-house content team, fully researched and optimised for your target keywords. The Starter plan includes 2 articles per month, Professional 4, and Enterprise 8.' },
  { q: 'What is the difference between monthly and annual billing?', a: 'Annual billing gives you a 20% discount across all packages. The saving is significant — for the Professional plan that\'s $1,440 per year saved. Annual billing is paid upfront for the full 12 months and is non-refundable after month one.' },
  { q: 'What makes 1Solutions different from other SEO agencies?', a: '15+ years of SEO experience, 500+ projects delivered, and a team that has navigated every major algorithm update since 2008. We combine deep technical expertise with genuine content quality — no shortcuts, no grey-hat tactics, no opaque reporting.' },
  { q: 'Do you do local SEO and Google Business Profile optimisation?', a: 'Yes — Local SEO is included in all three packages. We optimise your Google Business Profile, build local citations, ensure NAP consistency across directories, and manage review strategy. For multi-location businesses, we offer custom local SEO packages — contact us to discuss.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'15+ Years of SEO Experience', desc:'We have navigated every major Google algorithm update since 2008 — Panda, Penguin, Hummingbird, BERT, Helpful Content. Our strategies are future-proof, not built around current loopholes.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'10,000+ Keywords Ranked', desc:"Across 500+ clients in 50+ industries. Whether it's competitive national keywords or hyper-local searches, we know how to build rankings that drive real business." },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>, title:'White-Hat Only', desc:'We build rankings that last. No black-hat tactics, no PBN links, no keyword stuffing. Every strategy we implement is aligned with Google Webmaster Guidelines and will withstand future algorithm updates.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'Transparent Monthly Reports', desc:"You receive a clear report every month — keyword movements, organic traffic trends, backlinks earned, and what we're doing next. No vanity metrics, no fluff — just the data that matters." },
  { icon:<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>, title:'In-House Content Team', desc:'Our SEO writers are not freelancers hired per article — they are full-time specialists who understand search intent, E-E-A-T requirements, and how to write content that earns links naturally.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>, title:'US, Canada & Australia Specialists', desc:'We understand the local search landscape of English-speaking western markets. Our strategies account for regional differences in search behaviour, competitor intensity, and SERP features.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'Full-Stack SEO Capability', desc:'Technical SEO, on-page, link building, content, local SEO, and analytics — all under one roof. You never have to coordinate between multiple agencies or freelancers.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'97% Client Retention Rate', desc:"We don't win clients and move on. Our average client relationship is 3+ years — because when SEO compounds over time, the results get better every month and clients stick around." },
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
    <div className="sp-stat-col">
      <div className="sp-stat-label">{label}</div>
      <div className="sp-stat-value">{display}</div>
    </div>
  );
}

export default function AffordableSeoPackages() {
  const [billing, setBilling] = useState('monthly');
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visiblePkgCards, setVisiblePkgCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const whyGridRef = useRef(null);
  const pkgGridRef = useRef(null);
  const testiGridRef = useRef(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!whyGridRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhyCards(p => p.includes(i) ? p : [...p, i]), i * 100)); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(whyGridRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!pkgGridRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { [0,1,2].forEach(i => setTimeout(() => setVisiblePkgCards(p => p.includes(i) ? p : [...p, i]), i * 150)); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(pkgGridRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!testiGridRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { [0,1,2].forEach(i => setTimeout(() => setVisibleTestiCards(p => p.includes(i) ? p : [...p, i]), i * 150)); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(testiGridRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisibleSections(p => new Set([...p, key])); obs.disconnect(); } }, { threshold: 0.15 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const visibleIncluded = showAll ? INCLUDED : INCLUDED.slice(0, 4);

  return (
    <>
      <Head>
        <title>Affordable SEO Packages | Starting at $299/month | 1Solutions</title>
        <meta name="description" content="Affordable SEO packages from 1Solutions — Starter $299/mo, Professional $599/mo, Enterprise $999/mo. 15+ years of white-hat SEO, 10,000+ keywords ranked, monthly reports." />
        <link rel="canonical" href="https://www.1solutions.biz/affordable-seo-packages/" />
        <meta property="og:title" content="Affordable SEO Packages | 1Solutions" />
        <meta property="og:description" content="White-hat SEO packages starting at $299/month. 15+ years of experience, 500+ clients, 10,000+ keywords ranked." />
        <style>{`
          .sp-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            background-attachment: scroll;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .sp-page *, .sp-page *::before, .sp-page *::after { box-sizing: border-box; }

          .sp-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.35) 0%,rgba(139,92,246,0.15) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .sp-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.30) 0%,rgba(245,158,11,0.15) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .sp-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.20) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* ── Hero ── */
          .sp-hero-block { background:transparent;position:relative;overflow:hidden; }
          .sp-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .sp-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .sp-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .sp-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .sp-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .sp-hero-content p { font-size:16px;color:#3A507A;line-height:1.65;max-width:640px;margin:0 auto 28px; }
          .sp-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .sp-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(245,158,11,0.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }
          .sp-btn-hero-shimmer { position:relative;overflow:hidden; }
          .sp-btn-hero-shimmer::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:sp-shimmer 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes sp-shimmer { 0% { left:-120%; } 35%,100% { left:160%; } }

          /* ── Stats bar ── */
          .sp-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .sp-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .sp-stat-col:last-child { border-right:none; }
          .sp-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .sp-stat-value { font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1; }

          /* ── Client logos ── */
          .sp-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .sp-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .sp-clients-logos { width:100%;overflow:hidden; }
          .sp-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:sp-marquee 28s linear infinite; }
          .sp-logos-track:hover { animation-play-state:paused; }
          @keyframes sp-marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
          .sp-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .sp-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* ── Shared section styles ── */
          .sp-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .sp-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .sp-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .sp-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .sp-section-reveal.sp-revealed { opacity:1;transform:translateY(0); }

          /* ── Billing toggle ── */
          .sp-billing-wrap { text-align:center;padding:60px 40px 0; position:relative;z-index:2; }
          .sp-billing-label { font-size:14px;color:#4A6080;margin-bottom:14px;font-weight:500; }
          .sp-billing-toggle { display:inline-flex;background:rgba(255,255,255,0.55);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.85);border-radius:100px;padding:4px;box-shadow:0 2px 12px rgba(15,52,96,0.08); }
          .sp-billing-btn { padding:9px 28px;border-radius:100px;border:none;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.2s;color:#4A6080;background:transparent;font-family:inherit; }
          .sp-billing-btn.active { background:#0F3460;color:#fff;box-shadow:0 2px 12px rgba(15,52,96,0.25); }
          .sp-save-badge { display:inline-flex;align-items:center;gap:5px;background:rgba(217,119,6,0.12);color:#B45309;border:1px solid rgba(217,119,6,0.25);font-size:12px;font-weight:700;padding:4px 12px;border-radius:100px;margin-left:12px;vertical-align:middle; }

          /* ── Package cards ── */
          .sp-packages-section { background:transparent;padding:32px 40px 72px;position:relative;z-index:2; }
          .sp-packages-inner { max-width:1280px;margin:0 auto; }
          .sp-packages-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start; }
          .sp-pkg { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .sp-pkg.sp-pkg-visible { opacity:1;transform:translateY(0); }
          .sp-pkg.sp-pkg-visible:hover { box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1);border-color:rgba(217,119,6,0.40); }
          .sp-pkg.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.30);box-shadow:0 8px 32px rgba(217,119,6,0.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px); }
          .sp-pkg.featured.sp-pkg-visible { transform:translateY(-8px); }
          .sp-pkg.featured.sp-pkg-visible:hover { transform:translateY(-12px); }
          .sp-pkg-tag { display:block;background:linear-gradient(90deg,#0F3460,#D97706);color:#fff;text-align:center;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;padding:8px; }
          .sp-pkg-head { padding:28px 26px 22px; }
          .sp-pkg-name { font-size:22px;font-weight:900;color:#0F3460;margin-bottom:6px; }
          .sp-pkg-desc { font-size:13px;color:#4A6080;line-height:1.55;margin-bottom:20px; }
          .sp-pkg-price-row { display:flex;align-items:flex-end;gap:4px;margin-bottom:4px; }
          .sp-pkg-price { font-size:44px;font-weight:900;color:#0F3460;line-height:1;letter-spacing:-2px; }
          .sp-pkg-price-meta { font-size:13px;color:#6A80A0;padding-bottom:6px; }
          .sp-pkg-annual-note { font-size:12px;color:#D97706;font-weight:600;min-height:18px;margin-bottom:16px; }
          .sp-pkg-cta { display:block;width:100%;padding:13px;border-radius:50px;font-size:14px;font-weight:700;text-align:center;text-decoration:none;transition:all 0.25s;background:rgba(15,52,96,0.10);color:#0F3460;border:1.5px solid rgba(15,52,96,0.20); }
          .sp-pkg-cta:hover { background:#0F3460;color:#fff;border-color:#0F3460; }
          .sp-pkg.featured .sp-pkg-cta { background:#0F3460;color:#fff;border-color:#0F3460;box-shadow:0 6px 20px rgba(15,52,96,0.25); }
          .sp-pkg.featured .sp-pkg-cta:hover { background:#D97706;border-color:#D97706; }
          .sp-pkg-divider { height:1px;background:rgba(15,52,96,0.08); }
          .sp-pkg-features { padding:20px 26px 26px; }
          .sp-pkg-features-title { font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#6A80A0;margin-bottom:12px; }
          .sp-feature-row { display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid rgba(15,52,96,0.06); }
          .sp-feature-row:last-child { border-bottom:none; }
          .sp-feature-check { flex-shrink:0;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center; }
          .sp-feature-check-yes { background:rgba(217,119,6,0.12); }
          .sp-feature-check-no  { background:rgba(15,52,96,0.06); }
          .sp-feature-label { font-size:13px;color:#374151;flex:1; }
          .sp-feature-label.muted { color:#9ca3af; }
          .sp-feature-val { font-size:12px;font-weight:700;color:#0F3460;white-space:nowrap; }

          /* ── Included section ── */
          .sp-included-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.18),0 -4px 16px rgba(15,52,96,0.10); }
          .sp-included-inner { max-width:1280px;margin:0 auto; }
          .sp-included-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .sp-inc-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .sp-inc-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .sp-inc-card.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25); }
          .sp-inc-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .sp-inc-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .sp-inc-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .sp-inc-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#D97706,#f59e0b);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .sp-inc-card:hover::before { transform:scaleY(1); }
          .sp-included-footer { text-align:center;margin-top:20px; }
          .sp-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(15,52,96,0.20);color:#0F3460;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(15,52,96,0.08);font-family:inherit; }
          .sp-btn-show-more:hover { background:#0F3460;border-color:#0F3460;color:#ffffff;box-shadow:0 8px 28px rgba(15,52,96,0.20);transform:translateY(-2px); }

          /* ── Process ── */
          .sp-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .sp-process-top { max-width:1280px;margin:0 auto 56px; }
          .sp-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .sp-process-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .sp-process-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .sp-process-divider { border:none;border-top:1px solid rgba(15,52,96,0.15);margin:36px 0 0;width:100%; }
          .sp-process-steps { max-width:1280px;margin:0 auto;display:flex;flex-direction:column; }
          .sp-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .sp-pstep.visible { opacity:1;transform:translateY(0); }
          .sp-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .sp-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .sp-pstep:hover .sp-pstep-circle { background:rgba(245,158,11,0.2);border-color:#D97706;color:#D97706; }
          .sp-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .sp-pstep-arrow::before { content:'';width:2px;flex:1;background:#0F3460;opacity:0.25; }
          .sp-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #0F3460;opacity:0.45;margin-top:-1px; }
          .sp-pstep:last-child .sp-pstep-arrow { display:none; }
          .sp-pstep-content { padding:4px 0 44px; }
          .sp-pstep:last-child .sp-pstep-content { padding-bottom:0; }
          .sp-pstep-title { font-size:22px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .sp-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }

          /* ── Testimonials ── */
          .sp-testi-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .sp-testi-inner { max-width:1280px;margin:0 auto; }
          .sp-section-header-center { text-align:center;margin-bottom:52px; }
          .sp-section-sub { font-size:16px;color:#4A6080;margin:0; }
          .sp-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .sp-tcard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .sp-tcard.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25); }
          .sp-tcard.sp-tcard-visible { opacity:1;transform:translateY(0); }
          .sp-tcard.sp-tcard-visible:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .sp-tcard-stars { font-size:18px;color:#D97706;letter-spacing:2px; }
          .sp-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .sp-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .sp-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0; }
          .sp-tcard-name { font-size:14px;font-weight:700;color:#0F3460; }
          .sp-tcard-role { font-size:12px;color:#6b7280; }
          .sp-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .sp-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .sp-tstat-num { font-size:28px;font-weight:800;color:#0F3460; }
          .sp-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .sp-tstat-divider { width:1px;height:40px;background:rgba(15,52,96,0.15); }

          /* ── Why section ── */
          .sp-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .sp-why-inner { max-width:1280px;margin:0 auto; }
          .sp-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .sp-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.25s,box-shadow 0.25s; }
          .sp-why-card:hover { transform:translateY(-6px) scale(1);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .sp-why-card.sp-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .sp-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .sp-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .sp-why-icon svg { width:28px;height:28px;fill:#D97706; }
          .sp-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .sp-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* ── Contact & form ── */
          .sp-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .sp-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .sp-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .sp-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .sp-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .sp-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .sp-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .sp-benefit-icon { width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75;fill:none; }
          .sp-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .sp-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .sp-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .sp-contact-form { display:flex;flex-direction:column;gap:16px; }
          .sp-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .sp-form-group { display:flex;flex-direction:column;gap:6px; }
          .sp-form-group.full { grid-column:1/-1; }
          .sp-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .sp-form-group input,.sp-form-group textarea,.sp-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .sp-form-group input:focus,.sp-form-group textarea:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12); }
          .sp-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .sp-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .sp-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .sp-consent a { color:#0F3460;text-decoration:none; }
          .sp-submit-btn { padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .sp-submit-btn:hover { background:rgba(15,52,96,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }

          /* ── FAQ ── */
          .sp-faq-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .sp-faq-inner { max-width:1280px;margin:0 auto; }
          .sp-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .sp-faq-list { display:flex;flex-direction:column;gap:12px; }
          .sp-faq-item { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .sp-faq-item.open { border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .sp-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .sp-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .sp-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .sp-faq-item.open .sp-faq-q-badge { background:#D97706;color:#fff; }
          .sp-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .sp-faq-item.open .sp-faq-question span { color:#D97706; }
          .sp-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .sp-faq-item.open .sp-faq-chevron { transform:rotate(180deg);color:#D97706; }
          .sp-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .sp-faq-item.open .sp-faq-answer-wrap { max-height:400px; }
          .sp-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }

          /* ── Related ── */
          .sp-related-section { background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .sp-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .sp-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .sp-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .sp-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .sp-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0; }
          .sp-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .sp-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .sp-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .sp-rtag-blue   { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .sp-rtag-violet { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .sp-rtag-amber  { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .sp-rtag-teal   { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .sp-rtag-green  { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .sp-rtag-indigo { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .sp-rtag-orange { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }

          @media (max-width:1024px) {
            .sp-hero-content h1 { font-size:40px; }
            .sp-packages-grid { grid-template-columns:1fr; max-width:480px; margin:0 auto; }
            .sp-pkg.featured { transform:none; }
            .sp-pkg.featured.sp-pkg-visible { transform:none; }
            .sp-pkg.featured.sp-pkg-visible:hover { transform:translateY(-4px); }
            .sp-included-grid { grid-template-columns:repeat(2,1fr); }
            .sp-why-grid { grid-template-columns:repeat(2,1fr); }
            .sp-contact-container { grid-template-columns:1fr; }
          }
          @media (max-width:768px) {
            .sp-hero-content { padding:36px 20px 24px; }
            .sp-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .sp-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .sp-stat-col { padding:14px 12px; }
            .sp-stat-col:nth-child(2) { border-right:none; }
            .sp-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .sp-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .sp-packages-section { padding:24px 20px 56px; }
            .sp-billing-wrap { padding:44px 20px 0; }
            .sp-included-section { padding:48px 20px 40px; }
            .sp-included-grid { grid-template-columns:1fr; }
            .sp-process-section { padding:60px 20px; }
            .sp-testi-section { padding:60px 20px; }
            .sp-testi-grid { grid-template-columns:1fr; }
            .sp-why-section { padding:60px 20px; }
            .sp-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .sp-contact-section { padding:48px 20px; }
            .sp-contact-title { font-size:30px; }
            .sp-faq-section { padding:60px 20px; }
            .sp-faq-heading { font-size:28px; }
            .sp-faq-question { padding:18px 18px 18px 52px; }
            .sp-faq-question span { font-size:14px; }
            .sp-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .sp-faq-q-badge { left:14px; }
            .sp-related-section { padding:60px 20px; }
            .sp-section-title,.sp-process-title,.sp-related-title { font-size:30px; }
            .sp-form-row { grid-template-columns:1fr; }
            .sp-testi-stats { flex-wrap:wrap;padding:24px 20px; }
            .sp-tstat { flex:0 0 50%;padding:12px 8px;border-bottom:1px solid rgba(15,52,96,0.10); }
            .sp-tstat:nth-child(odd) { border-right:1px solid rgba(15,52,96,0.10); }
            .sp-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .sp-tstat-divider { display:none; }
            .sp-clients-bar { padding:16px 20px 36px; }
          }
        `}</style>
      </Head>

      <div className="sp-page">
        <div className="sp-orb-1" /><div className="sp-orb-2" /><div className="sp-orb-3" />

        {/* ── HERO ── */}
        <div className="sp-hero-block">
          <div className="sp-hero-content">
            <span className="sp-eyebrow">Affordable SEO Packages — White-Hat Only</span>
            <h1>SEO Packages That Rank Your Business &amp; Drive Real Growth</h1>
            <p>15+ years of SEO expertise, 10,000+ keywords ranked, and 500+ clients across the US, Canada, and Australia. No contracts. No grey-hat tricks. Measurable results every month.</p>
            <Link href="#contact" className="sp-btn-hero sp-btn-hero-shimmer">Get a Free SEO Audit</Link>
          </div>

          <div className="sp-hero-stats" ref={statsRef}>
            {[['SEO Projects','500+'],['Keywords Ranked','10,000+'],['Years in SEO','15+'],['Client Retention','97%']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="sp-clients-bar">
            <span className="sp-clients-label">Trusted by Leading Brands</span>
            <div className="sp-clients-logos">
              <div className="sp-logos-track">
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
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="sp-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BILLING TOGGLE ── */}
        <div className="sp-billing-wrap">
          <div className="sp-billing-label">Choose your billing cycle</div>
          <div className="sp-billing-toggle">
            <button className={`sp-billing-btn${billing==='monthly'?' active':''}`} onClick={()=>setBilling('monthly')}>Monthly</button>
            <button className={`sp-billing-btn${billing==='annual'?' active':''}`} onClick={()=>setBilling('annual')}>Annual</button>
          </div>
          {billing==='annual' && <span className="sp-save-badge">✓ Save 20% with annual billing</span>}
        </div>

        {/* ── PACKAGES ── */}
        <section className="sp-packages-section" id="packages">
          <div className="sp-packages-inner">
            <div className="sp-packages-grid" ref={pkgGridRef}>
              {PACKAGES.map((pkg,i) => (
                <div
                  key={pkg.id}
                  className={`sp-pkg${pkg.featured?' featured':''}${visiblePkgCards.includes(i)?' sp-pkg-visible':''}`}
                  style={{ transitionDelay:`${i*120}ms` }}
                >
                  {pkg.tag && <span className="sp-pkg-tag">{pkg.tag}</span>}
                  <div className="sp-pkg-head">
                    <div className="sp-pkg-name">{pkg.name}</div>
                    <div className="sp-pkg-desc">{pkg.desc}</div>
                    <div className="sp-pkg-price-row">
                      <div className="sp-pkg-price">${pkg.price[billing]}</div>
                      <div className="sp-pkg-price-meta">/mo{billing==='annual'?', billed annually':''}</div>
                    </div>
                    <div className="sp-pkg-annual-note">
                      {billing==='annual' ? `Save $${(pkg.price.monthly - pkg.price.annual)*12}/year` : ' '}
                    </div>
                    <Link href="#contact" className="sp-pkg-cta">Get Started</Link>
                  </div>
                  <div className="sp-pkg-divider" />
                  <div className="sp-pkg-features">
                    <div className="sp-pkg-features-title">What&apos;s included</div>
                    {pkg.features.map(f => (
                      <div key={f.label} className="sp-feature-row">
                        <div className={`sp-feature-check ${f.yes===false?'sp-feature-check-no':'sp-feature-check-yes'}`}>
                          {f.yes===false
                            ? <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" width="10" height="10"><path d="M18 6L6 18M6 6l12 12"/></svg>
                            : <svg viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" width="10" height="10"><path d="M5 13l4 4L19 7"/></svg>
                          }
                        </div>
                        <div className={`sp-feature-label${f.yes===false?' muted':''}`}>{f.label}</div>
                        {f.value && <div className="sp-feature-val">{f.value}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ── */}
        <section className="sp-included-section">
          <div className="sp-included-inner">
            <div className={`sp-section-reveal${visibleSections.has('included')?' sp-revealed':''}`} ref={el=>{sectionRefs.current['included']=el;}}>
              <span className="sp-section-eyebrow">Every Package Includes</span>
              <h2 className="sp-section-title">Full-Stack SEO — Nothing Left Out</h2>
              <p className="sp-section-desc">Every 1Solutions SEO engagement covers the complete spectrum of modern SEO — technical, on-page, off-page, and content. Nothing is a paid add-on.</p>
            </div>
            <div className="sp-included-grid">
              {visibleIncluded.map(s => (
                <div key={s.n} className={`sp-inc-card${s.featured?' featured':''}`}>
                  <span className="sp-inc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="sp-included-footer">
              <button className="sp-btn-show-more" onClick={()=>setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show All Included Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="sp-process-section">
          <div className="sp-process-top">
            <div className={`sp-section-reveal${visibleSections.has('process')?' sp-revealed':''}`} ref={el=>{sectionRefs.current['process']=el;}}>
              <p className="sp-process-eyebrow">HOW WE WORK</p>
              <h2 className="sp-process-title">How We Grow Your Search Rankings</h2>
              <p className="sp-process-desc">A structured, repeatable SEO process refined over 15+ years and 500+ projects. Clear milestones, monthly reporting, and full transparency at every stage.</p>
            </div>
            <hr className="sp-process-divider" />
          </div>
          <div className="sp-process-steps">
            {[
              ['SEO Audit','We analyse your website — technical health, on-page quality, backlink profile, and current keyword rankings. You receive a full audit report within 5 business days of sign-up.'],
              ['Keyword Strategy','We identify high-intent, achievable keywords your buyers are actually searching for — not just high-volume vanity terms. We map keywords to pages and identify content gaps.'],
              ['On-Page & Technical Optimisation','We optimise title tags, meta descriptions, headings, content, internal links, page speed, Core Web Vitals, structured data, and crawlability for every target page.'],
              ['Content & Link Building','We publish authoritative blog content and build genuine backlinks from relevant, high-DA websites through manual outreach. No PBNs, no directory spam.'],
              ['Monthly Reporting','You receive a clear report every month: keyword rank movements, organic traffic trends, backlinks earned, and the full action plan for next month. No surprises.'],
            ].map(([title, desc], i) => (
              <div
                className={`sp-pstep${visibleSections.has('process') ? ' visible' : ''}`}
                key={title}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="sp-pstep-left">
                  <div className="sp-pstep-circle">{i+1}</div>
                  {i < 4 && <div className="sp-pstep-arrow" />}
                </div>
                <div className="sp-pstep-content">
                  <h3 className="sp-pstep-title">{title}</h3>
                  <p className="sp-pstep-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="sp-testi-section">
          <div className="sp-testi-inner">
            <div className={`sp-section-header-center sp-section-reveal${visibleSections.has('testi')?' sp-revealed':''}`} ref={el=>{sectionRefs.current['testi']=el;}}>
              <span className="sp-section-eyebrow">Client Reviews</span>
              <h2 className="sp-section-title">What Our SEO Clients Say</h2>
              <p className="sp-section-sub">Trusted by 500+ businesses across the US, Canada, and Australia for SEO that drives measurable revenue growth.</p>
            </div>
            <div className="sp-testi-grid" ref={testiGridRef}>
              {[
                { initials:'JW', bg:'#1a4a7a', text:'"1Solutions grew our organic traffic by 340% in 9 months. We moved from page 3 to the top 3 results for our most competitive keywords. The monthly reports are clear and the team is proactive — they flag issues before we notice them."', name:'Jason Wheeler', role:'CEO, HomeServices Direct — USA', featured:false },
                { initials:'SB', bg:'#0F3460', text:'"We tried two other SEO agencies before 1Solutions. The difference is in the depth — they understand our industry, write content that actually converts, and build links that move the needle. We signed up for the Professional plan and upgraded to Enterprise within 4 months."', name:'Sophie Brennan', role:'Marketing Director, LegalEdge — Australia', featured:true },
                { initials:'RC', bg:'#2d5a8e', text:'"Our local SEO went from invisible to dominant. Google Business Profile reviews up, map pack appearances up, and phone calls from organic search up 60%. The team treats our business like their own."', name:'Ravi Chandra', role:'Owner, MedicalSupply Plus — Canada', featured:false },
              ].map((t,i) => (
                <div className={`sp-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' sp-tcard-visible':''}`} key={t.name} style={{transitionDelay:`${i*120}ms`}}>
                  <div className="sp-tcard-stars">★★★★★</div>
                  <p className="sp-tcard-text">{t.text}</p>
                  <div className="sp-tcard-author">
                    <div className="sp-tcard-avatar" style={{background:t.bg}}>{t.initials}</div>
                    <div>
                      <div className="sp-tcard-name">{t.name}</div>
                      <div className="sp-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="sp-testi-stats">
              {[['4.9/5','Average Rating'],['300+','SEO Clients'],['10,000+','Keywords Ranked'],['97%','Client Retention']].map(([num,label],i,arr)=>(
                <span key={label+i} style={{display:'contents'}}>
                  <div className="sp-tstat"><span className="sp-tstat-num">{num}</span><span className="sp-tstat-label">{label}</span></div>
                  {i<arr.length-1 && <div className="sp-tstat-divider" />}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="sp-why-section">
          <div className="sp-why-inner">
            <div className={`sp-section-reveal${visibleSections.has('why')?' sp-revealed':''}`} ref={el=>{sectionRefs.current['why']=el;}} style={{textAlign:'center',marginBottom:0}}>
              <span className="sp-section-eyebrow">Why 1Solutions</span>
              <h2 className="sp-section-title">Why Businesses Choose Us for SEO</h2>
              <p className="sp-section-sub" style={{maxWidth:680,margin:'0 auto'}}>We don&apos;t sell SEO — we build rankings that drive revenue. Here&apos;s what sets us apart from freelancers and generic agencies.</p>
            </div>
            <div className="sp-why-grid" ref={whyGridRef}>
              {WHY.map((w,i)=>(
                <div key={w.title} className={`sp-why-card${visibleWhyCards.includes(i)?' sp-card-visible':''}`} style={{transitionDelay:`${i*80}ms`}}>
                  <div className="sp-why-card-header">
                    <div className="sp-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section className="sp-contact-section" id="contact">
          <div className="sp-contact-container">
            <div>
              <h2 className="sp-contact-title">Get a Free SEO Audit &amp; Proposal</h2>
              <p className="sp-contact-desc">Tell us about your business and we will send you a free technical SEO audit with a personalised package recommendation — usually within 24 hours.</p>
              <div className="sp-merged-box">
                {[
                  ['Free SEO audit of your website','We audit your site\'s technical health, on-page optimisation, and backlink profile — at no cost, no commitment.'],
                  ['Package recommendation matched to your goals','We suggest the right plan based on your industry, competition level, and growth targets — not just our highest-priced option.'],
                  ['No lock-in contracts','Cancel any time. We earn your business every month through results, not paperwork.'],
                  ['Response within 24 hours','Our team acknowledges every enquiry within 24 hours and aims to deliver your audit within 2 business days.'],
                ].map(([title, desc])=>(
                  <div className="sp-benefit-item" key={title}>
                    <div className="sp-benefit-icon-wrap">
                      <svg className="sp-benefit-icon" viewBox="0 0 24 24" width="20" height="20"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p><strong>{title}</strong> — {desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="sp-form-box">
              <h3>Request Your Free SEO Audit</h3>
              <form className="sp-contact-form" onSubmit={e=>e.preventDefault()}>
                <div className="sp-form-row">
                  <div className="sp-form-group"><label>Your Name *</label><input type="text" placeholder="Jane Smith" required /></div>
                  <div className="sp-form-group"><label>Work Email *</label><input type="email" placeholder="jane@company.com" required /></div>
                </div>
                <div className="sp-form-row">
                  <div className="sp-form-group"><label>Phone</label><input type="tel" placeholder="+1 (555) 000-0000" /></div>
                  <div className="sp-form-group"><label>Website URL</label><input type="url" placeholder="https://yoursite.com" /></div>
                </div>
                <div className="sp-form-group full">
                  <label>Package Interested In</label>
                  <select>
                    <option value="">Select a package…</option>
                    <option>Starter ($299/mo)</option>
                    <option>Professional ($599/mo)</option>
                    <option>Enterprise ($999/mo)</option>
                    <option>Not sure — send me a recommendation</option>
                  </select>
                </div>
                <div className="sp-form-group full">
                  <label>Tell us about your SEO goals</label>
                  <textarea rows="3" placeholder="e.g. We sell XYZ products and want to rank for ABC keywords in the US market…" />
                </div>
                <div className="sp-consent">
                  <input type="checkbox" id="sp-consent" required />
                  <label htmlFor="sp-consent">I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions contacting me about SEO services.</label>
                </div>
                <button type="submit" className="sp-submit-btn">Send My Free Audit Request →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="sp-faq-section">
          <div className="sp-faq-inner">
            <h2 className="sp-faq-heading">Frequently Asked Questions</h2>
            <div className="sp-faq-list">
              {FAQS.map((faq,i)=>(
                <div key={i} className={`sp-faq-item${openFaq===i?' open':''}`}>
                  <button className="sp-faq-question" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                    <span className="sp-faq-q-badge">{String(i+1).padStart(2,'0')}</span>
                    <span>{faq.q}</span>
                    <svg className="sp-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <div className="sp-faq-answer-wrap">
                    <div className="sp-faq-answer">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="sp-related-section">
          <div className="sp-related-inner">
            <span className="sp-related-eyebrow">Explore More Services</span>
            <h2 className="sp-related-title">More Ways We Can Grow Your Business</h2>
            <p className="sp-related-sub">SEO works best alongside great web development and eCommerce. Explore our full range of services.</p>
            <hr className="sp-related-divider" />
            <div className="sp-related-tags">
              {[
                ['/ecommerce-website-development/','eCommerce Development','sp-rtag-amber'],
                ['/magento-development-company/','Magento Development','sp-rtag-orange'],
                ['/woocommerce-development-company/','WooCommerce Development','sp-rtag-violet'],
                ['/opencart-development-company/','OpenCart Development','sp-rtag-blue'],
                ['/laravel-development-company/','Laravel Development','sp-rtag-teal'],
                ['/drupal-development-company/','Drupal Development','sp-rtag-indigo'],
                ['/codeigniter-development-company/','CodeIgniter Development','sp-rtag-green'],
                ['/python-development-services/','Python Development','sp-rtag-blue'],
                ['/portfolio/','View Our Portfolio','sp-rtag-amber'],
                ['/contact/','Contact 1Solutions','sp-rtag-orange'],
              ].map(([href,label,cls])=>(
                <Link key={href} href={href} className={`sp-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
