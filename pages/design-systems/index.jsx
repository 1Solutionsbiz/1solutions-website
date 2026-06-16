'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Design Token Architecture', desc:'Spacing, colour, typography, shadow, and motion tokens structured for multi-platform output — web, iOS, Android, and beyond — using a single source of truth.', featured:false },
  { n:'02', title:'Component Library (Figma)', desc:'Auto-layout components with variants, properties, states, and interactive prototypes. Every component documented with usage notes and do/don\'t examples.', featured:true },
  { n:'03', title:'Code Component Library', desc:'React, Vue, or Angular components matching Figma 1:1, with Storybook documentation, TypeScript support, and automated visual regression testing.', featured:false },
  { n:'04', title:'Icon System', desc:'Consistent iconography library with sizing grid, style guide, stroke/fill variants, and SVG exports optimised for web and native applications.', featured:false },
  { n:'05', title:'Design System Audit', desc:'Review existing systems for consistency gaps, deprecated patterns, redundant components, and scalability issues — with a prioritised remediation roadmap.', featured:false },
  { n:'06', title:'Accessibility (WCAG 2.2)', desc:'AA/AAA colour contrast checks, focus states, ARIA annotations, keyboard navigation patterns, and screen reader compatibility built into every component.', featured:false },
  { n:'07', title:'Documentation & Governance', desc:'Contribution guidelines, versioning strategy, component deprecation workflow, and change management process to keep your system healthy as it grows.', featured:false },
  { n:'08', title:'Design System Migration', desc:'Migrate from legacy UI to a modern design system with a structured rollout plan — component by component, zero regression, full team alignment.', featured:false },
];

const FAQS = [
  { q:'What is a design system and why does my product need one?', a:'A design system is a shared library of design decisions — tokens, components, patterns, and guidelines — that enables your design and engineering teams to build product interfaces faster and with perfect consistency. Without one, every team member makes independent decisions that lead to visual inconsistency, duplicated effort, and technical debt. With one, a designer can hand off a component to a developer and know it will be implemented identically every time — across every screen, every release.' },
  { q:'Do you build design systems in Figma only, or in code too?', a:'Both. We build the Figma component library (with auto-layout, variants, and interactive prototypes) and the code component library (React, Vue, or Angular with Storybook). The two are kept in sync so what designers see in Figma maps 1:1 to what engineers ship in production. We can also build the Figma layer only, or the code layer only, depending on where you are in your process.' },
  { q:'How long does it take to build a design system?', a:'A foundation design system — tokens, core components (button, input, typography, colour, spacing), and documentation — typically takes 6–10 weeks. A comprehensive system covering 40–80+ components with full Storybook documentation, accessibility annotations, and governance processes typically takes 3–5 months. We provide a phased delivery plan so your teams get value from week one, not just at the end.' },
  { q:'Can you integrate with our existing codebase?', a:'Yes. We work within your existing tech stack, version control system, CI/CD pipeline, and package management approach. We can publish your component library as a private npm package, integrate it into your Storybook instance, and set up automated visual regression tests using tools like Chromatic or Percy. We work with what you have, not what we prefer.' },
  { q:'What is the cost of a design system project?', a:'Design system projects vary significantly based on scope — the number of components, whether you need Figma only or Figma plus code, the complexity of your token architecture, and the level of documentation and governance. Foundation systems typically start from $8,000. Comprehensive production-grade systems for enterprise products range from $20,000 to $60,000+. We provide a detailed fixed-price quote after a free scoping call.' },
  { q:'How do you handle ongoing maintenance of the design system?', a:'We offer three paths: a one-time build with knowledge transfer to your internal team; a retainer model where we own ongoing additions and maintenance; or a hybrid where we build and train a design system champion on your team. We also offer quarterly audits to identify drift, deprecated patterns, and new requirements as your product evolves.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg>, title:'Token-First Architecture', desc:'We design token systems that work across platforms from day one — web, iOS, Android — using a single structured source of truth that scales as your product grows.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'Figma + Code, In Sync', desc:'Our design and development teams work in parallel — so your Figma library and code component library are always in perfect 1:1 alignment, not aspirationally aligned.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M1 21L12 2l11 19H1zm3.45-2h15.1L12 5.99 4.45 19zM11 16v2h2v-2h-2zm0-6v4h2v-4h-2z"/></svg>, title:'Accessibility by Default', desc:'WCAG 2.2 AA compliance is built into every component, not audited after the fact — contrast ratios, focus states, ARIA annotations, and keyboard patterns included.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'3× Faster Development', desc:'Teams using a mature design system ship new features significantly faster — less decision-making, less rework, less QA time on visual inconsistencies.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'Documentation That Gets Used', desc:'We write component documentation that developers actually read — clear usage guidelines, code examples, do/don\'t patterns, and prop tables in Storybook.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Governance & Versioning', desc:'We build the contribution process, versioning strategy, and change management workflow so your system stays healthy and evolves without becoming a maintenance burden.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Works With Your Stack', desc:'We integrate into your existing codebase, CI/CD pipeline, and toolchain — publishing as an npm package, connecting to your Storybook, and fitting your release process.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Team Enablement Included', desc:'Every engagement ends with a structured handoff and training session so your team can maintain, contribute to, and extend the system confidently without us.' },
];

const PROCESS_STEPS = [
  { title:'Audit & Discovery', desc:'We start by auditing your existing UI — cataloguing every component, pattern, and visual inconsistency. For new products, we run a discovery workshop to understand your product roadmap, tech stack, team structure, and the scale of what you need to build.' },
  { title:'Token Definition', desc:'We define your design token taxonomy — naming conventions, semantic layers, tier structure, and platform targets. Tokens are the foundation everything else is built on, so getting this right before touching any components is essential.' },
  { title:'Component Architecture', desc:'We map every component your product needs, establish a priority order based on usage frequency and complexity, and define the API — variants, properties, states, and responsive behaviour — before any design or code work begins.' },
  { title:'Build & Document', desc:'Design and engineering build in parallel. Figma components are built with auto-layout and variants; code components are built with Storybook stories, TypeScript types, accessibility attributes, and visual regression tests. Every component ships with usage documentation.' },
  { title:'Handoff & Training', desc:'We run a structured handoff session with your design and engineering leads — walking through the token system, component API, contribution process, and versioning strategy. We also provide recorded walkthroughs and written governance documentation for future reference.' },
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
    <div className="ds-stat-col">
      <div className="ds-stat-label">{label}</div>
      <div className="ds-stat-value">{display}</div>
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
        { '@type': 'ListItem', position: 2, name: 'Design Systems', item: 'https://www.1solutions.biz/design-systems/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Design Systems Agency',
      provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
      description: 'We build structured, documented design systems — from atomic tokens to full component libraries — so your team ships faster with pixel-perfect consistency. 80+ design systems built.',
      serviceType: 'Design System Development',
      areaServed: ['IN', 'US', 'CA', 'GB', 'AU'],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '94', bestRating: '5' },
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

export default function DesignSystemsPage() {
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
        <title>Design Systems Agency | Scalable Component Libraries | 1Solutions</title>
        <meta name="description" content="1Solutions builds structured, documented design systems — from atomic tokens to full component libraries — so your team ships faster with pixel-perfect consistency. 80+ design systems built." />
        <meta name="keywords" content="design systems agency, component library, design tokens, Figma component library, Storybook, WCAG accessibility, design system audit, React component library" />
        <link rel="canonical" href="https://www.1solutions.biz/design-systems/" />
        <meta property="og:title" content="Design Systems Agency | Scalable Component Libraries | 1Solutions" />
        <meta property="og:description" content="We build structured, documented design systems — from atomic tokens to full component libraries — so your team ships faster with pixel-perfect consistency." />
        <meta property="og:url" content="https://www.1solutions.biz/design-systems/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .ds-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 25%, #ede9fe 55%, #d1fae5 80%, #fef3c7 100%);
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
          }
          .ds-page *, .ds-page *::before, .ds-page *::after { box-sizing: border-box; }

          /* Orbs */
          .ds-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,0.22) 0%,rgba(99,102,241,0.10) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(30px); }
          .ds-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.18) 0%,rgba(6,182,212,0.08) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(30px); }
          .ds-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%);top:45%;right:10%;pointer-events:none;z-index:0;filter:blur(35px); }

          /* Hero */
          .ds-hero-block { background:transparent;position:relative;overflow:hidden; }
          .ds-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,0.14) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .ds-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.16) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .ds-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:60px 40px 44px; }
          .ds-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#0369A1;margin-bottom:18px; }
          .ds-hero-content h1 { font-size:52px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:20px;background:linear-gradient(90deg,#0F3460 0%,#0369A1 40%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .ds-hero-content p { font-size:17px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 auto 32px; }
          .ds-hero-badges { display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:32px; }
          .ds-badge { background:rgba(255,255,255,0.6);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.85);border-radius:40px;padding:6px 16px;font-size:13px;font-weight:600;color:#0F3460; }
          .ds-btn-hero { display:inline-block;padding:15px 44px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1);position:relative;overflow:hidden; }
          .ds-btn-hero::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:ds-shimmer 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes ds-shimmer { 0%{left:-120%} 35%,100%{left:160%} }
          .ds-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(3,105,161,0.5);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(3,105,161,0.18),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }

          /* Stats strip */
          .ds-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .ds-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .ds-stat-col:last-child { border-right:none; }
          .ds-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .ds-stat-value { font-size:26px;font-weight:900;color:#0369A1;letter-spacing:-0.5px;line-height:1; }

          /* Clients bar */
          .ds-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .ds-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .ds-clients-logos { width:100%;overflow:hidden; }
          .ds-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:ds-marquee 28s linear infinite; }
          .ds-logos-track:hover { animation-play-state:paused; }
          @keyframes ds-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .ds-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .ds-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Shared section styles */
          .ds-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0369A1;margin-bottom:12px;display:block; }
          .ds-section-title { font-size:44px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#0369A1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:12px; }
          .ds-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }

          /* Section reveal animation */
          .ds-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .ds-section-reveal.ds-revealed { opacity:1;transform:translateY(0); }

          /* Services section */
          .ds-services-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.12),0 -4px 16px rgba(15,52,96,0.08); }
          .ds-services-inner { max-width:1280px;margin:0 auto; }
          .ds-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .ds-service-card { background:linear-gradient(135deg,rgba(224,242,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(209,250,229,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s,opacity 0.5s,translate 0.5s;opacity:0;translate:0 30px; }
          .ds-service-card.ds-card-visible { opacity:1;translate:0 0; }
          .ds-service-card:hover { transform:translateY(-6px);border-color:rgba(3,105,161,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .ds-service-card.featured { background:linear-gradient(135deg,rgba(224,242,254,0.65) 0%,rgba(255,255,255,0.90) 55%,rgba(209,250,229,0.50) 100%);border-color:rgba(3,105,161,0.18); }
          .ds-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#0369A1,#38bdf8);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .ds-service-card:hover::before { transform:scaleY(1); }
          .ds-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0369A1;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .ds-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .ds-service-card:hover h3 { color:#0369A1; }
          .ds-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }

          /* Why section */
          .ds-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .ds-why-inner { max-width:1280px;margin:0 auto; }
          .ds-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .ds-why-card { background:linear-gradient(135deg,rgba(224,242,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(209,250,229,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s; }
          .ds-why-card.ds-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .ds-why-card:hover { transform:translateY(-5px) scale(1);border-color:rgba(3,105,161,0.30);box-shadow:0 14px 44px rgba(15,52,96,0.13); }
          .ds-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .ds-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .ds-why-icon svg { width:28px;height:28px;fill:#0369A1; }
          .ds-why-card h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .ds-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* Process section */
          .ds-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .ds-process-top { max-width:1280px;margin:0 auto 52px; }
          .ds-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#0369A1;margin:0 0 14px;display:block; }
          .ds-process-title { font-size:44px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#0369A1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .ds-process-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .ds-process-divider { border:none;border-top:1px solid rgba(15,52,96,0.15);margin:36px 0 0; }
          .ds-process-inner { max-width:1280px;margin:0 auto; }
          .ds-process-steps { display:flex;flex-direction:column;max-width:740px; }
          .ds-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .ds-pstep.visible { opacity:1;transform:translateY(0); }
          .ds-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .ds-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(3,105,161,0.25);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#0369A1;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .ds-pstep:hover .ds-pstep-circle { background:rgba(3,105,161,0.12);border-color:#0369A1; }
          .ds-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:40px; }
          .ds-pstep-arrow::before { content:'';width:2px;flex:1;background:#0369A1;opacity:0.20; }
          .ds-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #0369A1;opacity:0.35;margin-top:-1px; }
          .ds-pstep:last-child .ds-pstep-arrow { display:none; }
          .ds-pstep-content { padding:4px 0 44px; }
          .ds-pstep:last-child .ds-pstep-content { padding-bottom:0; }
          .ds-pstep-title { font-size:20px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .ds-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }

          /* Testimonials */
          .ds-testi-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .ds-testi-inner { max-width:1280px;margin:0 auto; }
          .ds-section-center { text-align:center;margin-bottom:52px; }
          .ds-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px; }
          .ds-tcard { background:linear-gradient(135deg,rgba(224,242,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(209,250,229,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .ds-tcard:hover { transform:translateY(-6px);border-color:rgba(3,105,161,0.30);box-shadow:0 16px 48px rgba(15,52,96,0.14); }
          .ds-tcard.featured { background:linear-gradient(135deg,rgba(224,242,254,0.70) 0%,rgba(255,255,255,0.90) 55%,rgba(209,250,229,0.55) 100%);border-color:rgba(3,105,161,0.18); }
          .ds-tcard-stars { font-size:18px;color:#0369A1;letter-spacing:2px; }
          .ds-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .ds-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .ds-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .ds-tcard-name { font-size:14px;font-weight:700;color:#0F3460; }
          .ds-tcard-role { font-size:12px;color:#6b7280; }
          .ds-testi-stats { display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(224,242,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(209,250,229,0.40) 100%);backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.08); }
          .ds-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .ds-tstat-num { font-size:28px;font-weight:800;color:#0F3460; }
          .ds-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .ds-tstat-divider { width:1px;height:40px;background:rgba(15,52,96,0.15); }

          /* Feature callout strip */
          .ds-callout-strip { background:linear-gradient(90deg,#0369A1 0%,#0F3460 100%);padding:52px 40px;position:relative;z-index:1;overflow:hidden; }
          .ds-callout-strip::before { content:'';position:absolute;top:-50%;right:-10%;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.08) 0%,transparent 70%);pointer-events:none; }
          .ds-callout-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:32px; }
          .ds-callout-item { text-align:center;color:#fff;position:relative;z-index:1; }
          .ds-callout-num { font-size:42px;font-weight:900;color:#38bdf8;line-height:1;margin-bottom:6px; }
          .ds-callout-label { font-size:13px;color:rgba(255,255,255,0.80);font-weight:500;line-height:1.4; }

          /* FAQ */
          .ds-faq-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .ds-faq-inner { max-width:1280px;margin:0 auto; }
          .ds-faq-heading { font-size:44px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#0369A1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .ds-faq-list { display:flex;flex-direction:column;gap:12px; }
          .ds-faq-item { background:linear-gradient(135deg,rgba(224,242,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(209,250,229,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .ds-faq-item.open { border-color:rgba(3,105,161,0.35);box-shadow:0 8px 32px rgba(15,52,96,0.12); }
          .ds-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#0369A1;border-radius:3px 0 0 3px; }
          .ds-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .ds-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(3,105,161,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .ds-faq-item.open .ds-faq-q-badge { background:#0369A1;color:#fff; }
          .ds-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .ds-faq-item.open .ds-faq-question span { color:#0369A1; }
          .ds-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .ds-faq-item.open .ds-faq-chevron { transform:rotate(180deg);color:#0369A1; }
          .ds-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .ds-faq-item.open .ds-faq-answer-wrap { max-height:500px; }
          .ds-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .ds-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#0F3460;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Contact */
          .ds-contact-section { padding:80px 40px;background:linear-gradient(135deg,rgba(224,242,254,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(209,250,229,0.65) 100%);backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .ds-contact-container { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:40px; }
          .ds-contact-title { font-size:44px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#0369A1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .ds-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 28px; }
          .ds-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(224,242,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .ds-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .ds-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .ds-benefit-icon { width:20px;height:20px;color:#0369A1;stroke:#0369A1;stroke-width:1.75; }
          .ds-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .ds-stats-box { padding-top:28px;border-top:1px solid rgba(15,52,96,0.12); }
          .ds-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .ds-stat-number { font-size:36px;font-weight:900;color:#0369A1;line-height:1;display:inline-block;margin-bottom:4px; }
          .ds-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .ds-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(224,242,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .ds-form-box h3 { font-size:24px;font-weight:700;margin:0 0 24px;color:#0F1F40;letter-spacing:-0.5px; }
          .ds-contact-form { display:flex;flex-direction:column;gap:16px; }
          .ds-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .ds-form-group { display:flex;flex-direction:column;gap:6px; }
          .ds-form-group.full { grid-column:1/-1; }
          .ds-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .ds-form-group input,.ds-form-group textarea,.ds-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .ds-form-group input:focus,.ds-form-group textarea:focus { outline:none;border-color:#0369A1;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(3,105,161,0.12); }
          .ds-phone-input { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .ds-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .ds-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .ds-phone-input input:focus { outline:none; }
          .ds-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .ds-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .ds-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .ds-consent a { color:#0369A1;text-decoration:none; }
          .ds-submit-btn { padding:14px 28px;background:rgba(3,105,161,0.90);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(3,105,161,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .ds-submit-btn:hover { background:rgba(3,105,161,1);transform:translateY(-2px);box-shadow:0 10px 32px rgba(3,105,161,0.35); }

          /* Related */
          .ds-related-section { background:rgba(224,242,254,0.18);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .ds-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .ds-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .ds-related-title { font-size:44px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#0369A1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .ds-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:640px; }
          .ds-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0; }
          .ds-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .ds-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .ds-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .ds-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .ds-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }
          .ds-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .ds-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .ds-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }
          .ds-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .ds-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .ds-rtag-pink    { background:rgba(236,72,153,0.10);border-color:rgba(236,72,153,0.28);color:#9D174D; }
          .ds-rtag-slate   { background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155; }
          .ds-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .ds-rtag-cyan    { background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490; }

          /* Mobile */
          @media (max-width:1024px) {
            .ds-hero-content h1 { font-size:40px; }
            .ds-services-grid { grid-template-columns:repeat(2,1fr); }
            .ds-why-grid { grid-template-columns:repeat(2,1fr); }
            .ds-testi-grid { grid-template-columns:repeat(2,1fr); }
            .ds-callout-inner { grid-template-columns:repeat(2,1fr);gap:24px; }
          }
          @media (max-width:768px) {
            .ds-hero-content { padding:40px 20px 28px; }
            .ds-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .ds-hero-content p { font-size:15px; }
            .ds-hero-stats { grid-template-columns:1fr 1fr; }
            .ds-stat-col { padding:14px 12px; }
            .ds-stat-col:nth-child(2) { border-right:none; }
            .ds-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .ds-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .ds-stat-value { font-size:22px; }
            .ds-services-section { padding:48px 20px 40px; }
            .ds-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .ds-why-section { padding:60px 20px; }
            .ds-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .ds-why-card { padding:22px 18px; }
            .ds-process-section { padding:60px 20px; }
            .ds-testi-section { padding:60px 20px; }
            .ds-testi-grid { grid-template-columns:1fr; }
            .ds-testi-stats { flex-wrap:wrap;padding:24px 20px; }
            .ds-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(15,52,96,0.10); }
            .ds-tstat:nth-child(odd) { border-right:1px solid rgba(15,52,96,0.10); }
            .ds-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .ds-tstat-divider { display:none; }
            .ds-callout-strip { padding:40px 20px; }
            .ds-callout-inner { grid-template-columns:1fr 1fr;gap:24px; }
            .ds-callout-num { font-size:32px; }
            .ds-faq-section { padding:60px 20px; }
            .ds-faq-heading { font-size:26px; }
            .ds-faq-question { padding:18px 18px 18px 52px; }
            .ds-faq-question span { font-size:14px; }
            .ds-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .ds-faq-q-badge { left:14px; }
            .ds-contact-section { padding:48px 16px; }
            .ds-contact-container { grid-template-columns:1fr;gap:24px; }
            .ds-contact-title { font-size:28px; }
            .ds-form-row { grid-template-columns:1fr; }
            .ds-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .ds-stat-number { font-size:28px; }
            .ds-section-title,.ds-process-title,.ds-faq-heading,.ds-contact-title,.ds-related-title { font-size:28px; }
            .ds-related-section { padding:60px 20px; }
            .ds-clients-bar { padding:16px 20px 36px; }
          }
          @media (max-width:480px) {
            .ds-hero-content h1 { font-size:24px; }
            .ds-services-grid { grid-template-columns:1fr; }
            .ds-callout-inner { grid-template-columns:1fr; }
            .ds-section-title,.ds-process-title,.ds-faq-heading,.ds-contact-title,.ds-related-title { font-size:22px; }
          }
        `}</style>
      </Head>

      <div className="ds-page">
        <div className="ds-orb-1" />
        <div className="ds-orb-2" />
        <div className="ds-orb-3" />

        {/* ── HERO ── */}
        <div className="ds-hero-block">
          <div className="ds-hero-content">
            <span className="ds-eyebrow">Design Systems Agency — 16+ Years Experience</span>
            <h1>Design Systems That Scale With Your Product</h1>
            <p>We build structured, documented design systems — from atomic tokens to full component libraries — so your team ships faster with pixel-perfect consistency.</p>
            <div className="ds-hero-badges">
              <span className="ds-badge">&#10003; Figma + Code Libraries</span>
              <span className="ds-badge">&#10003; WCAG 2.2 Accessibility</span>
              <span className="ds-badge">&#10003; Storybook Documentation</span>
              <span className="ds-badge">&#10003; Token Architecture Included</span>
            </div>
            <Link href="#contact" className="ds-btn-hero">Start Your Design System Project</Link>
          </div>

          <div className="ds-hero-stats" ref={statsRef}>
            {[['Design Systems Built','80+'],['Faster Development','3×'],['Years Experience','16+'],['Consistency Score','99%']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="ds-clients-bar">
            <span className="ds-clients-label">Trusted by Leading Brands</span>
            <div className="ds-clients-logos">
              <div className="ds-logos-track">
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
                ].map(([src, alt]) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/, '')} className="ds-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="ds-services-section">
          <div className="ds-services-inner">
            <div className={`ds-section-reveal${visibleSections.has('services') ? ' ds-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="ds-section-eyebrow">What We Build</span>
              <h2 className="ds-section-title">Design System Services We Offer</h2>
              <p className="ds-section-desc">From a first-time token architecture to a complete multi-platform component library — we scope and build exactly what your product and team need at your stage of growth.</p>
            </div>
            <div className="ds-services-grid" ref={serviceGridRef}>
              {SERVICES.map((s, i) => (
                <div key={s.n} className={`ds-service-card${s.featured ? ' featured' : ''}${visibleServiceCards.includes(i) ? ' ds-card-visible' : ''}`} style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="ds-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CALLOUT STRIP ── */}
        <div className="ds-callout-strip">
          <div className="ds-callout-inner">
            {[
              { num:'80+', label:'Design Systems Built' },
              { num:'3×', label:'Average Development Speed Increase' },
              { num:'99%', label:'Cross-Platform Consistency Score' },
              { num:'16+', label:'Years of UI/UX Expertise' },
            ].map(item => (
              <div className="ds-callout-item" key={item.num}>
                <div className="ds-callout-num">{item.num}</div>
                <div className="ds-callout-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHY US ── */}
        <section className="ds-why-section">
          <div className="ds-why-inner">
            <div className={`ds-section-reveal${visibleSections.has('why') ? ' ds-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center' }}>
              <span className="ds-section-eyebrow">Why 1Solutions</span>
              <h2 className="ds-section-title">Why Product Teams Choose Us For Design Systems</h2>
              <p className="ds-section-desc" style={{ margin:'0 auto 0' }}>We don&apos;t just build component libraries — we build the processes, governance, and culture that make design systems actually work inside your organisation.</p>
            </div>
            <div className="ds-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`ds-why-card${visibleWhyCards.includes(i) ? ' ds-card-visible' : ''}`} key={w.title} style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="ds-why-card-header">
                    <div className="ds-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="ds-process-section">
          <div className="ds-process-top">
            <div className={`ds-section-reveal${visibleSections.has('process') ? ' ds-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <span className="ds-process-eyebrow">OUR METHODOLOGY</span>
              <h2 className="ds-process-title">How We Build Design Systems That Scale</h2>
              <p className="ds-process-desc">Our five-stage methodology takes you from a scattered UI to a structured, documented, governance-ready design system — without disrupting your in-flight product development.</p>
            </div>
            <hr className="ds-process-divider" />
          </div>
          <div className="ds-process-inner">
            <div className="ds-process-steps">
              {PROCESS_STEPS.map(({ title, desc }, i) => (
                <div
                  className={`ds-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="ds-pstep-left">
                    <div className="ds-pstep-circle">{i + 1}</div>
                    {i < PROCESS_STEPS.length - 1 && <div className="ds-pstep-arrow" />}
                  </div>
                  <div className="ds-pstep-content">
                    <h3 className="ds-pstep-title">{title}</h3>
                    <p className="ds-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="ds-testi-section">
          <div className="ds-testi-inner">
            <div className={`ds-section-center ds-section-reveal${visibleSections.has('testi') ? ' ds-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="ds-section-eyebrow">Client Reviews</span>
              <h2 className="ds-section-title">What Our Design System Clients Say</h2>
              <p style={{ fontSize:15,color:'#4A6080',margin:'0 auto',maxWidth:580 }}>Product teams across US, UK, Canada, and Australia rely on 1Solutions to build and maintain their design infrastructure.</p>
            </div>
            <div className="ds-testi-grid">
              {[
                { initials:'MH', bg:'#0369A1', text:'"1Solutions built our entire design system from scratch — Figma library, React component library, Storybook, and governance docs. Our dev time on new features dropped by more than half within the first quarter of adoption."', name:'Marcus Hughes', role:'VP of Product, Finstack — USA', featured:false },
                { initials:'SB', bg:'#0F3460', text:'"The token architecture they designed is exactly what we needed to scale across web and mobile without duplication. Every designer and every engineer now works from the same source of truth. The quality of what we ship has never been higher."', name:'Sophie Beaumont', role:'Design Lead, PulseApp — UK', featured:true },
                { initials:'JT', bg:'#0E7490', text:'"We had a messy legacy UI with hundreds of inconsistent components. 1Solutions audited everything, built a clean migration plan, and delivered a new design system without a single regression. Genuinely impressive execution."', name:'James Tran', role:'CTO, MedCore — Australia', featured:false },
              ].map((t, i) => (
                <div className={`ds-tcard${t.featured ? ' featured' : ''}`} key={t.name}>
                  <div className="ds-tcard-stars">★★★★★</div>
                  <p className="ds-tcard-text">{t.text}</p>
                  <div className="ds-tcard-author">
                    <div className="ds-tcard-avatar" style={{ background: t.bg }}>{t.initials}</div>
                    <div>
                      <div className="ds-tcard-name">{t.name}</div>
                      <div className="ds-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="ds-testi-stats">
              {[['4.9/5','Average Rating'],['80+','Systems Built'],['99%','Consistency Score'],['78%','Repeat Clients']].map(([num, label], i, arr) => (
                <>
                  <div className="ds-tstat" key={label}>
                    <span className="ds-tstat-num">{num}</span>
                    <span className="ds-tstat-label">{label}</span>
                  </div>
                  {i < arr.length - 1 && <div className="ds-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="ds-contact-section" id="contact">
          <div className="ds-contact-container">
            <div>
              <h2 className="ds-contact-title">Let&apos;s Build Your Design System</h2>
              <p className="ds-contact-desc">Tell us about your product, your team structure, and your current pain points. We&apos;ll respond within 24 hours with a scoping approach and rough timeline.</p>
              <div className="ds-merged-box">
                <div>
                  {[
                    { icon:<svg className="ds-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'All project details are confidential — NDA available on request.' },
                    { icon:<svg className="ds-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A senior design systems specialist personally reviews your brief.' },
                    { icon:<svg className="ds-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Response within 24 business hours — no automated replies.' },
                    { icon:<svg className="ds-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:'No obligation — just a clear, expert conversation about your needs.' },
                  ].map((b, i) => (
                    <div className="ds-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="ds-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="ds-stats-box">
                  <div className="ds-stats-grid">
                    {[['80+','Systems Built'],['16+','Years Experience'],['3×','Faster Dev'],].map(([num, text]) => (
                      <div key={text}>
                        <div className="ds-stat-number">{num}</div>
                        <div className="ds-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="ds-form-box">
                <h3>Get a Free Design System Consultation</h3>
                <form className="ds-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="ds-form-row">
                    <div className="ds-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="ds-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email*" required /></div>
                  </div>
                  <div className="ds-form-row">
                    <div className="ds-form-group">
                      <label>Phone Number*</label>
                      <div className="ds-phone-input">
                        <select>
                          <option value="+91">&#127470;&#127475; +91</option>
                          <option value="+1">&#127482;&#127480; +1</option>
                          <option value="+44">&#127468;&#127463; +44</option>
                          <option value="+61">&#127462;&#127482; +61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="ds-form-group"><label>Company*</label><input type="text" placeholder="Company / Organisation*" required /></div>
                  </div>
                  <div className="ds-form-group full">
                    <label>Tell us about your project*</label>
                    <textarea placeholder="Describe your product, your tech stack, and what you are trying to solve with a design system..." rows={5} required />
                  </div>
                  <div className="ds-consent">
                    <input type="checkbox" id="ds-consent" required />
                    <label htmlFor="ds-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="ds-submit-btn">Send My Design System Brief</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="ds-faq-section" id="faq">
          <div className="ds-faq-inner">
            <h2 className="ds-faq-heading">Frequently Asked Questions</h2>
            <div className="ds-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`ds-faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                  <button className="ds-faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <div className="ds-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="ds-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="ds-faq-answer-wrap">
                    <div className="ds-faq-answer"><span className="ds-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="ds-related-section">
          <div className="ds-related-inner">
            <span className="ds-related-eyebrow">RELATED DESIGN & DEVELOPMENT SERVICES</span>
            <h2 className="ds-related-title">Explore Related Services</h2>
            <p className="ds-related-sub">Extend your design system investment with services that amplify its value across every product touchpoint.</p>
            <hr className="ds-related-divider" />
            <div className="ds-related-tags">
              {[
                ['Brand Identity Design','sky'],['UI/UX Design Services','violet'],['React Development','blue'],
                ['Next.js Development','indigo'],['Accessibility Audits','teal'],['WordPress Development','amber'],
                ['Frontend Development','cyan'],['Figma to Code','emerald'],['Mobile App Development','rose'],
                ['Website Redesign','pink'],['Code Review Services','slate'],['Digital Product Strategy','indigo'],
              ].map(([label, color]) => (
                <Link href="#contact" className={`ds-rtag ds-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
