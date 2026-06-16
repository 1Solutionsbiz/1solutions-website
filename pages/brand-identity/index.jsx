'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Logo Design', desc:'Wordmarks, lettermarks, emblems, and combination marks crafted with full usage guidelines, colour variations, and scalability from favicon to billboard.', featured:false },
  { n:'02', title:'Brand Colour Palette', desc:'Primary, secondary, and accent colour systems with accessibility contrast ratios, hex/RGB/CMYK values, and dark-mode variants for every platform.', featured:true },
  { n:'03', title:'Typography System', desc:'Font pairing, sizing scale, line-height hierarchy, and web/print usage rules — so every headline and body copy feels intentional and on-brand.', featured:false },
  { n:'04', title:'Brand Guidelines Document', desc:'Comprehensive 30–80 page PDF covering every usage scenario: logo clearspace, incorrect usage examples, colour on dark/light backgrounds, and tone of voice.', featured:false },
  { n:'05', title:'Business Card & Stationery', desc:'Letterhead, envelope, email signature, and business card designs that extend your brand into every physical touchpoint.', featured:false },
  { n:'06', title:'Social Media Brand Kit', desc:'Profile images, banner templates, and post templates sized for every platform — so your brand looks sharp across Instagram, LinkedIn, X, and beyond.', featured:false },
  { n:'07', title:'Packaging & Print Design', desc:'Labels, boxes, brochures, pull-up banners, and display materials that carry your brand identity into the physical world with print-ready files.', featured:false },
  { n:'08', title:'Brand Refresh & Evolution', desc:'Modernise an existing identity — refine the logo, update the palette, and elevate typography — while carefully preserving the brand equity you have built.', featured:false },
];

const FAQS = [
  { q:'What is included in a brand identity package?', a:'A full brand identity package from 1Solutions includes a logo suite (primary, secondary, and icon variants), brand colour palette with accessibility ratios, typography system, brand guidelines document, and social media brand kit. We can also extend the package to include stationery, packaging, and presentation templates. Every deliverable is provided in editable source files plus export-ready formats.' },
  { q:'How long does a brand identity project take?', a:'A standard brand identity project — logo through to brand guidelines — typically takes 4–6 weeks from kick-off to final delivery. Projects requiring packaging, stationery, or extensive print collateral can extend to 8–10 weeks. We share a detailed timeline in the proposal stage and provide progress updates at every milestone so you are never left wondering where things stand.' },
  { q:'Do you provide editable source files?', a:'Yes, always. Every deliverable is handed over in fully editable source files — Adobe Illustrator (.ai), Adobe InDesign (.indd), and Figma, depending on what was used during production. We also provide export packages in PNG, SVG, PDF, and JPEG in both RGB and CMYK colour modes, sized and named for common use cases.' },
  { q:'Can you refresh our existing logo without a full rebrand?', a:'Absolutely. A logo refresh — sometimes called an evolution — is one of our most common engagements. We analyse what is working in your current mark, identify what is holding it back, and refine it rather than replace it. This preserves the brand recognition you have already built while modernising the visual presentation. The scope and cost is typically 40–60% of a new identity project.' },
  { q:'What file formats do you deliver?', a:'We deliver a complete file package: vector formats (SVG, AI, EPS, PDF) for scalability, raster formats (PNG with transparent background, JPEG) at multiple resolutions (72 dpi web, 150 dpi screen, 300 dpi print), and Figma components for digital teams. All files are colour-separated into RGB, CMYK, and Pantone variants where applicable.' },
  { q:'Do you work with startups as well as established businesses?', a:'Yes — we work with clients at every stage, from pre-launch startups building their identity from scratch to established businesses with 20+ years of history looking to modernise. For startups, we offer focused brand starter packages that prioritise the essential deliverables. For established businesses, we offer comprehensive brand audits before recommending the most strategic path forward.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'Research-Led Strategy', desc:'Every brand decision is rooted in audience research, competitor analysis, and market positioning — not personal preference or aesthetic trends.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>, title:'Comprehensive Guidelines', desc:'We deliver brand guidelines that actually get used — clear, visual, and actionable enough that any designer, printer, or developer can apply them correctly.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'Multi-Industry Experience', desc:'300+ brand identities across 50+ industries — from B2B SaaS to consumer packaged goods to professional services. We know what works in your sector.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>, title:'Accessibility by Default', desc:'All colour palettes are tested for WCAG 2.2 AA contrast ratios at minimum. We ensure your brand works for every user, not just the majority.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'Collaborative Process', desc:'You are involved at every key milestone — mood board review, concept presentation, refinement rounds — so the final identity feels authentically yours.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership', desc:'Brand identity is never truly finished. We stay available for extensions, seasonal campaigns, and product launches as your business evolves.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'On-Time Delivery', desc:'Structured project phases with fixed milestone dates. You will always know what is happening, what is next, and when you will see it.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'One Team, End to End', desc:'Strategy, design, and guidelines all produced by the same team — so nothing gets lost in translation between brand thinking and visual execution.' },
];

const PROCESS_STEPS = [
  { title:'Discovery & Research', desc:'We start by deeply understanding your business, audience, competitors, and aspirations. Brand questionnaires, stakeholder interviews, and market analysis form the strategic foundation everything else is built upon.' },
  { title:'Mood Boarding', desc:'We translate strategic insights into visual direction through curated mood boards. Multiple creative directions are presented so you can guide the aesthetic path before a single logo concept is drawn.' },
  { title:'Concept Design', desc:'Our design team creates two or three distinct logo concepts, each accompanied by a rationale explaining the thinking behind the mark, typeface choice, and colour direction.' },
  { title:'Refinement', desc:'Your selected concept is refined across multiple rounds of feedback. We fine-tune proportions, spacing, weight, and colour until the mark is exactly right — then lock off the master logo suite.' },
  { title:'Guidelines & Delivery', desc:'We build the comprehensive brand guidelines document, produce the full file package, and hand everything over with a walk-through call to ensure your team can apply the brand with confidence from day one.' },
];

// Count-up hook
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
    <div className="bi-stat-col">
      <div className="bi-stat-label">{label}</div>
      <div className="bi-stat-value">{display}</div>
    </div>
  );
}

const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Brand Identity Design', item: 'https://www.1solutions.biz/brand-identity/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Brand Identity Design',
      provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
      description: 'Logo design, brand colour palettes, typography systems, and comprehensive brand guidelines. 300+ brands crafted across 50+ industries in 16+ years.',
      serviceType: 'Brand Identity Design',
      areaServed: ['IN', 'US', 'CA', 'GB', 'AU'],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '186', bestRating: '5' },
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

export default function BrandIdentityPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleServiceCards, setVisibleServiceCards] = useState([]);
  const stepRefs = useRef([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const whyGridRef = useRef(null);
  const serviceGridRef = useRef(null);

  // Process steps scroll-reveal
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

  // Stats count-up trigger
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Why cards staggered reveal
  useEffect(() => {
    if (!whyGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          WHY.forEach((_, i) => {
            setTimeout(() => setVisibleWhyCards(prev => prev.includes(i) ? prev : [...prev, i]), i * 90);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(whyGridRef.current);
    return () => obs.disconnect();
  }, []);

  // Service cards staggered reveal
  useEffect(() => {
    if (!serviceGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          SERVICES.forEach((_, i) => {
            setTimeout(() => setVisibleServiceCards(prev => prev.includes(i) ? prev : [...prev, i]), i * 80);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(serviceGridRef.current);
    return () => obs.disconnect();
  }, []);

  // Section heading fade-up
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

  return (
    <>
      <Head>
        <title>Brand Identity Design | Logo, Colours &amp; Typography Systems | 1Solutions</title>
        <meta name="description" content="1Solutions crafts brand identities that make you unmistakable — from logo mark to colour palette to typography system. 300+ brands, 16+ years, 97% client satisfaction." />
        <meta name="keywords" content="brand identity design, logo design, brand guidelines, typography system, colour palette design, brand refresh, brand design agency" />
        <link rel="canonical" href="https://www.1solutions.biz/brand-identity/" />
        <meta property="og:title" content="Brand Identity Design | Logo, Colours &amp; Typography Systems | 1Solutions" />
        <meta property="og:description" content="We craft brand identities that resonate — logo, colour palette, typography, and guidelines — so your audience recognises and trusts you instantly." />
        <meta property="og:url" content="https://www.1solutions.biz/brand-identity/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .bi-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #fce7f3 0%, #ede9fe 25%, #dbeafe 50%, #fef3c7 75%, #d1fae5 100%);
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
          }
          .bi-page *, .bi-page *::before, .bi-page *::after { box-sizing: border-box; }

          /* Orbs */
          .bi-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(217,70,239,0.22) 0%,rgba(139,92,246,0.10) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(30px); }
          .bi-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.22) 0%,rgba(245,158,11,0.10) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(30px); }
          .bi-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.15) 0%,transparent 70%);top:50%;left:30%;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(30px); }

          /* Hero */
          .bi-hero-block { background:transparent;position:relative;overflow:hidden; }
          .bi-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(217,70,239,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .bi-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.18) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .bi-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:60px 40px 44px; }
          .bi-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#7C3AED;margin-bottom:18px; }
          .bi-hero-content h1 { font-size:52px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:20px;background:linear-gradient(90deg,#0F3460 0%,#7C3AED 50%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .bi-hero-content p { font-size:17px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 auto 32px; }
          .bi-hero-badges { display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:32px; }
          .bi-badge { background:rgba(255,255,255,0.6);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.85);border-radius:40px;padding:6px 16px;font-size:13px;font-weight:600;color:#0F3460; }
          .bi-btn-hero { display:inline-block;padding:15px 44px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1);position:relative;overflow:hidden; }
          .bi-btn-hero::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:bi-shimmer 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes bi-shimmer { 0%{left:-120%} 35%,100%{left:160%} }
          .bi-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(124,58,237,0.5);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(124,58,237,0.18),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }

          /* Stats strip */
          .bi-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .bi-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .bi-stat-col:last-child { border-right:none; }
          .bi-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .bi-stat-value { font-size:26px;font-weight:900;color:#7C3AED;letter-spacing:-0.5px;line-height:1; }

          /* Clients bar */
          .bi-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .bi-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .bi-clients-logos { width:100%;overflow:hidden; }
          .bi-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:bi-marquee 28s linear infinite; }
          .bi-logos-track:hover { animation-play-state:paused; }
          @keyframes bi-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .bi-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .bi-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Shared section styles */
          .bi-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7C3AED;margin-bottom:12px;display:block; }
          .bi-section-title { font-size:44px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:12px; }
          .bi-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }

          /* Section reveal animation */
          .bi-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .bi-section-reveal.bi-revealed { opacity:1;transform:translateY(0); }

          /* Services section */
          .bi-services-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.12),0 -4px 16px rgba(15,52,96,0.08); }
          .bi-services-inner { max-width:1280px;margin:0 auto; }
          .bi-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:0; }
          .bi-service-card { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(252,231,243,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s,opacity 0.5s,translate 0.5s;opacity:0;translate:0 30px; }
          .bi-service-card.bi-card-visible { opacity:1;translate:0 0; }
          .bi-service-card:hover { transform:translateY(-6px);border-color:rgba(124,58,237,0.4);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .bi-service-card.featured { background:linear-gradient(135deg,rgba(237,233,254,0.65) 0%,rgba(255,255,255,0.90) 55%,rgba(252,231,243,0.50) 100%);border-color:rgba(124,58,237,0.20); }
          .bi-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#7C3AED,#a78bfa);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .bi-service-card:hover::before { transform:scaleY(1); }
          .bi-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#7C3AED;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .bi-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .bi-service-card:hover h3 { color:#7C3AED; }
          .bi-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }

          /* Why section */
          .bi-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .bi-why-inner { max-width:1280px;margin:0 auto; }
          .bi-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .bi-why-card { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(252,231,243,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;text-align:left;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s; }
          .bi-why-card.bi-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .bi-why-card:hover { transform:translateY(-5px) scale(1);border-color:rgba(124,58,237,0.35);box-shadow:0 14px 44px rgba(15,52,96,0.13),inset 0 1px 0 rgba(255,255,255,1); }
          .bi-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .bi-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .bi-why-icon svg { width:28px;height:28px;fill:#7C3AED; }
          .bi-why-card h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .bi-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* Process section */
          .bi-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .bi-process-top { max-width:1280px;margin:0 auto 52px; }
          .bi-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#7C3AED;margin:0 0 14px;display:block; }
          .bi-process-title { font-size:44px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .bi-process-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .bi-process-divider { border:none;border-top:1px solid rgba(15,52,96,0.15);margin:36px 0 0; }
          .bi-process-inner { max-width:1280px;margin:0 auto; }
          .bi-process-steps { display:flex;flex-direction:column;max-width:740px; }
          .bi-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .bi-pstep.visible { opacity:1;transform:translateY(0); }
          .bi-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .bi-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(124,58,237,0.25);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#7C3AED;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .bi-pstep:hover .bi-pstep-circle { background:rgba(124,58,237,0.15);border-color:#7C3AED;color:#7C3AED; }
          .bi-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:40px; }
          .bi-pstep-arrow::before { content:'';width:2px;flex:1;background:#7C3AED;opacity:0.20; }
          .bi-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #7C3AED;opacity:0.35;margin-top:-1px; }
          .bi-pstep:last-child .bi-pstep-arrow { display:none; }
          .bi-pstep-content { padding:4px 0 44px; }
          .bi-pstep:last-child .bi-pstep-content { padding-bottom:0; }
          .bi-pstep-title { font-size:20px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .bi-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }

          /* Testimonials */
          .bi-testi-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .bi-testi-inner { max-width:1280px;margin:0 auto; }
          .bi-section-center { text-align:center;margin-bottom:52px; }
          .bi-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px; }
          .bi-tcard { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(252,231,243,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .bi-tcard:hover { transform:translateY(-6px);border-color:rgba(124,58,237,0.35);box-shadow:0 16px 48px rgba(15,52,96,0.14); }
          .bi-tcard.featured { background:linear-gradient(135deg,rgba(237,233,254,0.70) 0%,rgba(255,255,255,0.90) 55%,rgba(252,231,243,0.55) 100%);border-color:rgba(124,58,237,0.20); }
          .bi-tcard-stars { font-size:18px;color:#7C3AED;letter-spacing:2px; }
          .bi-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .bi-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .bi-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .bi-tcard-name { font-size:14px;font-weight:700;color:#0F3460; }
          .bi-tcard-role { font-size:12px;color:#6b7280; }
          .bi-testi-stats { display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(237,233,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(252,231,243,0.40) 100%);backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.08); }
          .bi-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .bi-tstat-num { font-size:28px;font-weight:800;color:#0F3460; }
          .bi-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .bi-tstat-divider { width:1px;height:40px;background:rgba(15,52,96,0.15); }

          /* FAQ */
          .bi-faq-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .bi-faq-inner { max-width:1280px;margin:0 auto; }
          .bi-faq-heading { font-size:44px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .bi-faq-list { display:flex;flex-direction:column;gap:12px; }
          .bi-faq-item { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(252,231,243,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .bi-faq-item.open { border-color:rgba(124,58,237,0.35);box-shadow:0 8px 32px rgba(15,52,96,0.12); }
          .bi-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#7C3AED;border-radius:3px 0 0 3px; }
          .bi-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .bi-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(124,58,237,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .bi-faq-item.open .bi-faq-q-badge { background:#7C3AED;color:#fff; }
          .bi-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .bi-faq-item.open .bi-faq-question span { color:#7C3AED; }
          .bi-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .bi-faq-item.open .bi-faq-chevron { transform:rotate(180deg);color:#7C3AED; }
          .bi-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .bi-faq-item.open .bi-faq-answer-wrap { max-height:500px; }
          .bi-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .bi-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#0F3460;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Contact */
          .bi-contact-section { padding:80px 40px;background:linear-gradient(135deg,rgba(237,233,254,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(252,231,243,0.65) 100%);backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .bi-contact-container { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:40px; }
          .bi-contact-title { font-size:44px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .bi-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 28px; }
          .bi-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .bi-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .bi-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .bi-benefit-icon { width:20px;height:20px;color:#7C3AED;stroke:#7C3AED;stroke-width:1.75; }
          .bi-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .bi-stats-box { padding-top:28px;border-top:1px solid rgba(15,52,96,0.12); }
          .bi-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .bi-stat-number { font-size:36px;font-weight:900;color:#7C3AED;line-height:1;display:inline-block;margin-bottom:4px; }
          .bi-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .bi-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .bi-form-box h3 { font-size:24px;font-weight:700;margin:0 0 24px;color:#0F1F40;letter-spacing:-0.5px; }
          .bi-contact-form { display:flex;flex-direction:column;gap:16px; }
          .bi-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .bi-form-group { display:flex;flex-direction:column;gap:6px; }
          .bi-form-group.full { grid-column:1/-1; }
          .bi-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .bi-form-group input,.bi-form-group textarea,.bi-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .bi-form-group input:focus,.bi-form-group textarea:focus { outline:none;border-color:#7C3AED;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(124,58,237,0.12); }
          .bi-phone-input { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .bi-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .bi-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .bi-phone-input input:focus { outline:none; }
          .bi-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .bi-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .bi-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .bi-consent a { color:#7C3AED;text-decoration:none; }
          .bi-submit-btn { padding:14px 28px;background:rgba(124,58,237,0.88);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(124,58,237,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .bi-submit-btn:hover { background:rgba(124,58,237,1);transform:translateY(-2px);box-shadow:0 10px 32px rgba(124,58,237,0.35); }

          /* Related */
          .bi-related-section { background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .bi-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .bi-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .bi-related-title { font-size:44px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .bi-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:640px; }
          .bi-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0; }
          .bi-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .bi-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .bi-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .bi-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .bi-rtag-pink    { background:rgba(236,72,153,0.10);border-color:rgba(236,72,153,0.28);color:#9D174D; }
          .bi-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .bi-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .bi-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .bi-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .bi-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .bi-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }
          .bi-rtag-fuchsia { background:rgba(217,70,239,0.10);border-color:rgba(217,70,239,0.28);color:#86198F; }
          .bi-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }
          .bi-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .bi-rtag-slate   { background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155; }

          /* Mobile */
          @media (max-width:1024px) {
            .bi-hero-content h1 { font-size:40px; }
            .bi-services-grid { grid-template-columns:repeat(2,1fr); }
            .bi-why-grid { grid-template-columns:repeat(2,1fr); }
            .bi-testi-grid { grid-template-columns:repeat(2,1fr); }
          }
          @media (max-width:768px) {
            .bi-hero-content { padding:40px 20px 28px; }
            .bi-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .bi-hero-content p { font-size:15px; }
            .bi-hero-stats { grid-template-columns:1fr 1fr; }
            .bi-stat-col { padding:14px 12px; }
            .bi-stat-col:nth-child(2) { border-right:none; }
            .bi-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .bi-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .bi-stat-value { font-size:22px; }
            .bi-services-section { padding:48px 20px 40px; }
            .bi-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .bi-why-section { padding:60px 20px; }
            .bi-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .bi-why-card { padding:22px 18px; }
            .bi-process-section { padding:60px 20px; }
            .bi-testi-section { padding:60px 20px; }
            .bi-testi-grid { grid-template-columns:1fr; }
            .bi-testi-stats { flex-wrap:wrap;padding:24px 20px; }
            .bi-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(15,52,96,0.10); }
            .bi-tstat:nth-child(odd) { border-right:1px solid rgba(15,52,96,0.10); }
            .bi-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .bi-tstat-divider { display:none; }
            .bi-faq-section { padding:60px 20px; }
            .bi-faq-heading { font-size:26px; }
            .bi-faq-question { padding:18px 18px 18px 52px; }
            .bi-faq-question span { font-size:14px; }
            .bi-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .bi-faq-q-badge { left:14px; }
            .bi-contact-section { padding:48px 16px; }
            .bi-contact-container { grid-template-columns:1fr;gap:24px; }
            .bi-contact-title { font-size:28px; }
            .bi-form-row { grid-template-columns:1fr; }
            .bi-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .bi-stat-number { font-size:28px; }
            .bi-section-title,.bi-process-title,.bi-faq-heading,.bi-contact-title,.bi-related-title { font-size:28px; }
            .bi-related-section { padding:60px 20px; }
            .bi-clients-bar { padding:16px 20px 36px; }
          }
          @media (max-width:480px) {
            .bi-hero-content h1 { font-size:24px; }
            .bi-services-grid { grid-template-columns:1fr; }
            .bi-section-title,.bi-process-title,.bi-faq-heading,.bi-contact-title,.bi-related-title { font-size:22px; }
            .bi-tcard { padding:24px 18px; }
          }
        `}</style>
      </Head>

      <div className="bi-page">
        <div className="bi-orb-1" />
        <div className="bi-orb-2" />
        <div className="bi-orb-3" />

        {/* ── HERO ── */}
        <div className="bi-hero-block">
          <div className="bi-hero-content">
            <span className="bi-eyebrow">Brand Identity Design Agency — 16+ Years</span>
            <h1>Brand Identity Design That Makes You Unmistakable</h1>
            <p>We craft brand identities that resonate — from logo mark to colour palette to type system. Everything your audience needs to recognise and trust you instantly.</p>
            <div className="bi-hero-badges">
              <span className="bi-badge">&#10003; 300+ Brands Crafted</span>
              <span className="bi-badge">&#10003; 50+ Industries</span>
              <span className="bi-badge">&#10003; Full Source Files Delivered</span>
              <span className="bi-badge">&#10003; WCAG Accessibility Included</span>
            </div>
            <Link href="#contact" className="bi-btn-hero">Start Your Brand Identity Project</Link>
          </div>

          <div className="bi-hero-stats" ref={statsRef}>
            {[['Brands Crafted','300+'],['Years Experience','16+'],['Client Satisfaction','97%'],['Industries Served','50+']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="bi-clients-bar">
            <span className="bi-clients-label">Trusted by Leading Brands</span>
            <div className="bi-clients-logos">
              <div className="bi-logos-track">
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
                  <img key={alt} src={src} alt={alt.replace(/\d+$/, '')} className="bi-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="bi-services-section">
          <div className="bi-services-inner">
            <div className={`bi-section-reveal${visibleSections.has('services') ? ' bi-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="bi-section-eyebrow">What We Design</span>
              <h2 className="bi-section-title">Brand Identity Services We Offer</h2>
              <p className="bi-section-desc">From the first logo concept to a comprehensive brand system — everything your business needs to show up consistently and confidently across every platform and touchpoint.</p>
            </div>
            <div className="bi-services-grid" ref={serviceGridRef}>
              {SERVICES.map((s, i) => (
                <div key={s.n} className={`bi-service-card${s.featured ? ' featured' : ''}${visibleServiceCards.includes(i) ? ' bi-card-visible' : ''}`} style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="bi-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="bi-why-section">
          <div className="bi-why-inner">
            <div className={`bi-section-reveal${visibleSections.has('why') ? ' bi-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center' }}>
              <span className="bi-section-eyebrow">Why 1Solutions</span>
              <h2 className="bi-section-title">Why Businesses Choose Us For Brand Identity</h2>
              <p className="bi-section-desc" style={{ margin:'0 auto 0' }}>Strategy, design, and execution under one roof — with 16+ years of craft and a client retention rate that speaks for itself.</p>
            </div>
            <div className="bi-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`bi-why-card${visibleWhyCards.includes(i) ? ' bi-card-visible' : ''}`} key={w.title} style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="bi-why-card-header">
                    <div className="bi-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="bi-process-section">
          <div className="bi-process-top">
            <div className={`bi-section-reveal${visibleSections.has('process') ? ' bi-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <span className="bi-process-eyebrow">OUR CREATIVE PROCESS</span>
              <h2 className="bi-process-title">How We Build Brand Identities That Last</h2>
              <p className="bi-process-desc">Every brand identity we create follows a structured five-stage process — from deep discovery to final delivery. No shortcuts, no generic templates, no guesswork.</p>
            </div>
            <hr className="bi-process-divider" />
          </div>
          <div className="bi-process-inner">
            <div className="bi-process-steps">
              {PROCESS_STEPS.map(({ title, desc }, i) => (
                <div
                  className={`bi-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="bi-pstep-left">
                    <div className="bi-pstep-circle">{i + 1}</div>
                    {i < PROCESS_STEPS.length - 1 && <div className="bi-pstep-arrow" />}
                  </div>
                  <div className="bi-pstep-content">
                    <h3 className="bi-pstep-title">{title}</h3>
                    <p className="bi-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="bi-testi-section">
          <div className="bi-testi-inner">
            <div className={`bi-section-center bi-section-reveal${visibleSections.has('testi') ? ' bi-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="bi-section-eyebrow">Client Reviews</span>
              <h2 className="bi-section-title">What Our Brand Identity Clients Say</h2>
              <p style={{ fontSize:15,color:'#4A6080',margin:'0 auto',maxWidth:580 }}>Businesses across the US, Canada, Australia, and the UK trust 1Solutions to define their visual identity.</p>
            </div>
            <div className="bi-testi-grid">
              {[
                { initials:'LC', bg:'#7C3AED', text:'"1Solutions gave our startup an identity that looked like we\'d been around for 20 years. The logo is perfect, the colour system is so easy to apply, and the guidelines document has saved us hours on every new asset we create."', name:'Laura Chen', role:'Co-Founder, Elevate SaaS — Canada', featured:false },
                { initials:'RP', bg:'#0F3460', text:'"We came to 1Solutions for a brand refresh after 12 years with the same logo. They found the perfect balance — modernised the mark, updated the palette, and everything still feels unmistakably us. Clients noticed immediately."', name:'Robert Pierce', role:'CEO, Meridian Advisory — USA', featured:true },
                { initials:'AK', bg:'#5B21B6', text:'"The brand guidelines document they delivered is genuinely the best I\'ve seen — clear, visual, and comprehensive enough that our print supplier and our web team both work from the same document without any confusion."', name:'Aisha Khan', role:'Head of Marketing, NovaTech — Australia', featured:false },
              ].map((t, i) => (
                <div className={`bi-tcard${t.featured ? ' featured' : ''}`} key={t.name}>
                  <div className="bi-tcard-stars">★★★★★</div>
                  <p className="bi-tcard-text">{t.text}</p>
                  <div className="bi-tcard-author">
                    <div className="bi-tcard-avatar" style={{ background: t.bg }}>{t.initials}</div>
                    <div>
                      <div className="bi-tcard-name">{t.name}</div>
                      <div className="bi-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bi-testi-stats">
              {[['4.9/5','Average Rating'],['186+','Brand Projects'],['97%','Client Satisfaction'],['82%','Repeat Clients']].map(([num, label], i, arr) => (
                <>
                  <div className="bi-tstat" key={label}>
                    <span className="bi-tstat-num">{num}</span>
                    <span className="bi-tstat-label">{label}</span>
                  </div>
                  {i < arr.length - 1 && <div className="bi-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="bi-contact-section" id="contact">
          <div className="bi-contact-container">
            <div>
              <h2 className="bi-contact-title">Let&apos;s Build a Brand Identity That Works</h2>
              <p className="bi-contact-desc">Tell us about your business, your audience, and your goals. We&apos;ll come back within 24 hours with a tailored brand identity brief and project proposal.</p>
              <div className="bi-merged-box">
                <div>
                  {[
                    { icon:<svg className="bi-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'All project details are confidential — NDA available on request.' },
                    { icon:<svg className="bi-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A senior brand designer personally reviews every brief.' },
                    { icon:<svg className="bi-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Response within 24 business hours — no automated replies.' },
                    { icon:<svg className="bi-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:'No obligation to proceed — just a genuine conversation.' },
                  ].map((b, i) => (
                    <div className="bi-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="bi-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="bi-stats-box">
                  <div className="bi-stats-grid">
                    {[['300+','Brands Crafted'],['16+','Years of Craft'],['97%','Client Satisfaction']].map(([num, text]) => (
                      <div key={text}>
                        <div className="bi-stat-number">{num}</div>
                        <div className="bi-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bi-form-box">
                <h3>Get a Free Brand Identity Consultation</h3>
                <form className="bi-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="bi-form-row">
                    <div className="bi-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="bi-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email*" required /></div>
                  </div>
                  <div className="bi-form-row">
                    <div className="bi-form-group">
                      <label>Phone Number*</label>
                      <div className="bi-phone-input">
                        <select>
                          <option value="+91">&#127470;&#127475; +91</option>
                          <option value="+1">&#127482;&#127480; +1</option>
                          <option value="+44">&#127468;&#127463; +44</option>
                          <option value="+61">&#127462;&#127482; +61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="bi-form-group"><label>Company*</label><input type="text" placeholder="Company / Organisation*" required /></div>
                  </div>
                  <div className="bi-form-group full">
                    <label>Tell us about your project*</label>
                    <textarea placeholder="Describe your brand, your target audience, and what you need..." rows={5} required />
                  </div>
                  <div className="bi-consent">
                    <input type="checkbox" id="bi-consent" required />
                    <label htmlFor="bi-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="bi-submit-btn">Send My Brand Brief</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bi-faq-section" id="faq">
          <div className="bi-faq-inner">
            <h2 className="bi-faq-heading">Frequently Asked Questions</h2>
            <div className="bi-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`bi-faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                  <button className="bi-faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <div className="bi-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="bi-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="bi-faq-answer-wrap">
                    <div className="bi-faq-answer"><span className="bi-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="bi-related-section">
          <div className="bi-related-inner">
            <span className="bi-related-eyebrow">RELATED DESIGN SERVICES</span>
            <h2 className="bi-related-title">Explore Related Services</h2>
            <p className="bi-related-sub">Pair your brand identity with complementary services to create a complete, cohesive presence across every channel.</p>
            <hr className="bi-related-divider" />
            <div className="bi-related-tags">
              {[
                ['Design Systems','violet'],['UI/UX Design Services','pink'],['Website Redesign Services','blue'],
                ['WordPress Development','amber'],['Social Media Marketing','teal'],['Content Marketing','rose'],
                ['SEO Services','indigo'],['Packaging Design','emerald'],['Motion & Video Design','fuchsia'],
                ['Pitch Deck Design','sky'],['Email Marketing','orange'],['Digital Marketing Services','slate'],
              ].map(([label, color]) => (
                <Link href="#contact" className={`bi-rtag bi-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
