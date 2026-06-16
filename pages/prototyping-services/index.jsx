'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Low-Fidelity Wireframes', desc: 'Rapid hand-sketch-style wireframes to explore layout options and user flows before any commitment to visual design.' },
  { n: '02', title: 'Mid-Fidelity Wireframes', desc: 'Greyscale annotated wireframes with component placeholders and copy guidance — perfect for stakeholder alignment.' },
  { n: '03', title: 'High-Fidelity Prototypes', desc: 'Pixel-perfect, branded interactive prototypes with real micro-interactions that mirror the final product experience.' },
  { n: '04', title: 'User Flow Mapping', desc: 'End-to-end task flows showing every screen state, error path, and empty state so nothing falls through the cracks.' },
  { n: '05', title: 'Clickable Prototype (Figma)', desc: 'Shareable prototype links for stakeholder demos, investor presentations, and remote user testing sessions.', featured: true },
  { n: '06', title: 'Micro-Interaction Design', desc: 'Transitions, loading states, gesture responses, and motion specifications that communicate quality and delight users.' },
  { n: '07', title: 'Prototype Usability Testing', desc: 'Moderated and unmoderated testing sessions with recorded findings that feed directly into prototype iterations.' },
  { n: '08', title: 'Developer Handoff Prototype', desc: 'Annotated Figma prototype with redlines, specs, tokens, and inspection mode so dev teams build exactly what was designed.' },
];

const PROCESS = [
  { title: 'Brief & Goals', desc: 'We start with a structured discovery session to understand your product vision, target users, business goals, and success metrics. This brief becomes the north star for every decision.' },
  { title: 'Information Architecture', desc: 'Before drawing a single screen, we define the site map, navigation structure, and content hierarchy — ensuring the prototype reflects real user mental models, not assumptions.' },
  { title: 'Low-Fi Wireframes', desc: 'Rapid greyscale wireframes explore layout options, content hierarchy, and flow logic. This is where ideas are tested cheaply — before any visual polish is applied.' },
  { title: 'High-Fi Prototype', desc: 'Wireframes evolve into pixel-perfect, on-brand interactive prototypes with clickable flows, component libraries, and motion specifications in Figma.' },
  { title: 'Test & Iterate', desc: 'We run usability sessions on the prototype — moderated or unmoderated — gather quantitative and qualitative findings, and iterate based on evidence, not opinion.' },
  { title: 'Handoff', desc: 'The final prototype is annotated with developer specs, redlines, design tokens, and interaction notes. Your engineering team can build from day one without back-and-forth guesswork.' },
];

const WHY = [
  { icon: <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, title: '400+ Prototypes Delivered', desc: 'Across SaaS, fintech, healthcare, e-commerce, and enterprise software — we have seen every edge case and know how to navigate complexity quickly.' },
  { icon: <svg viewBox="0 0 24 24"><path d="M9 11H7a5 5 0 0 1 0-10h1m7 10h2a5 5 0 0 0 0-10h-1m-5 10v2m0-12v2m-4 4h8"/></svg>, title: 'Figma-Native Workflow', desc: 'We work exclusively in Figma — the industry standard tool — so prototypes are shareable via URL, inspectable by developers, and version-controlled from day one.' },
  { icon: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: 'Cross-Functional Team', desc: 'Our UX researchers, interaction designers, and product strategists collaborate on every prototype — bringing research-backed decisions to every screen.' },
  { icon: <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, title: '60% Faster Stakeholder Sign-Off', desc: 'An interactive prototype communicates intent 10x better than static mocks. Stakeholders approve confidently because they can experience the product, not just imagine it.' },
  { icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: '90% Fewer Development Revisions', desc: 'Every ambiguity resolved in the prototype phase costs a fraction of what it costs in development. Our clients routinely report dramatically fewer dev-phase change requests.' },
  { icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: 'On-Time, Fixed-Scope Delivery', desc: 'Prototyping projects are scoped precisely. You receive a clear timeline with milestone reviews at wireframe, prototype, and handoff stages — no open-ended engagements.' },
  { icon: <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, title: 'Native App & Web Expertise', desc: 'We prototype iOS, Android, and web applications — including complex multi-role systems like dashboards, marketplaces, and SaaS admin panels.' },
  { icon: <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, title: 'US, Canada & Australia Focused', desc: 'We align working hours with your timezone so iteration cycles stay tight. Reviews, feedback sessions, and handoffs happen on your schedule — not ours.' },
];

const FAQS = [
  {
    q: 'What is the difference between a wireframe and a prototype?',
    a: 'A wireframe is a static, low-detail layout sketch that shows content placement and structure without visual design or interactivity. A prototype is an interactive, clickable simulation of the product — it can range from simple click-through screens to fully animated, high-fidelity experiences that feel like the real application. Wireframes are faster to produce and great for early-stage exploration; prototypes are essential for usability testing, stakeholder demos, and developer handoff.',
  },
  {
    q: 'What tools do you use for prototyping?',
    a: 'We work primarily in Figma for all wireframing and interactive prototyping. Figma allows us to create shareable links that anyone can view and interact with in a browser — no software installation required for stakeholders. For advanced animations and motion design, we also use Principle and ProtoPie. All deliverables are handed off in Figma with developer inspection mode enabled.',
  },
  {
    q: 'Can stakeholders interact with the prototype without design tools?',
    a: 'Yes. Figma prototypes are shared via a URL that opens in any modern browser. Stakeholders, clients, and investors can click through the flows, experience interactions, and leave comments directly on specific frames — without needing a Figma account or any software installation. This makes remote reviews, async feedback, and investor demos seamless.',
  },
  {
    q: 'How many rounds of revisions are included?',
    a: 'Our standard prototyping engagement includes two full revision rounds at the wireframe stage and two revision rounds at the high-fidelity prototype stage. Additional revision rounds can be added on a time-and-materials basis. In practice, most projects require fewer revisions when we front-load the discovery and information architecture work, which is why we never skip those stages.',
  },
  {
    q: 'How long does a prototyping project take?',
    a: 'Timeline depends on scope: a focused user flow for a single feature (e.g., onboarding) typically takes 1–2 weeks. A complete app prototype covering multiple roles and screens (e.g., a SaaS product with user, admin, and super-admin views) typically takes 3–6 weeks from brief to final handoff. We share a detailed project timeline after the brief — and we stick to it.',
  },
  {
    q: 'Can you prototype a native mobile app as well as a web app?',
    a: 'Yes — we prototype for iOS, Android, and responsive web, as well as complex multi-platform products. Our Figma prototypes can be configured to mirror device frames (iPhone, Android, tablet, desktop) and we test interactive prototypes directly on real devices using Figma Mirror for accurate experience validation.',
  },
];

const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Prototyping Services', item: 'https://www.1solutions.biz/prototyping-services' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Prototyping Services',
      provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
      description: 'Interactive wireframes, clickable prototypes, and developer-ready Figma handoffs. We help product teams validate ideas, align stakeholders, and ship with confidence.',
      serviceType: 'UX Prototyping',
      areaServed: ['IN', 'US', 'CA', 'GB', 'AU'],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '87', bestRating: '5' },
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

// Count-up hook
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numTarget = parseInt(String(target).replace(/\D/g, ''), 10);
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
  const suffix = String(val).replace(/[\d,]/g, '');
  const display = started ? num + suffix : val;
  return (
    <div className="ps-stat-col">
      <div className="ps-stat-value">{display}</div>
      <div className="ps-stat-label">{label}</div>
    </div>
  );
}

export default function PrototypingServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleSections, setVisibleSections] = useState(new Set());

  const statsRef = useRef(null);
  const stepRefs = useRef([]);
  const whyGridRef = useRef(null);
  const sectionRefs = useRef({});

  // Count-up trigger
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Process steps reveal
  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleSteps(prev => prev.includes(i) ? prev : [...prev, i]), i * 140);
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  // Why cards stagger
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
        <title>Prototyping Services | Interactive Wireframes & User Flows | 1Solutions</title>
        <meta name="description" content="From low-fi wireframes to pixel-perfect interactive prototypes, 1Solutions helps you test concepts, align stakeholders, and ship with confidence. 400+ prototypes delivered." />
        <meta name="keywords" content="prototyping services, interactive wireframes, figma prototype, UX prototyping, clickable prototype, wireframing agency, product design prototyping" />
        <link rel="canonical" href="https://www.1solutions.biz/prototyping-services" />
        <meta property="og:title" content="Prototyping Services | Interactive Wireframes & User Flows | 1Solutions" />
        <meta property="og:description" content="Validate ideas before writing a line of code. 400+ prototypes delivered. 60% faster stakeholder sign-off. Figma-native workflow." />
        <meta property="og:url" content="https://www.1solutions.biz/prototyping-services" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .ps-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #e0f2fe 0%, #dbeafe 25%, #ede9fe 55%, #fef3c7 80%, #dcfce7 100%);
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
          }
          .ps-page *, .ps-page *::before, .ps-page *::after { box-sizing: border-box; }

          /* Orbs */
          .ps-orb-1 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.30) 0%,rgba(139,92,246,0.12) 40%,transparent 70%);top:-280px;right:-250px;pointer-events:none;z-index:0;filter:blur(22px); }
          .ps-orb-2 { position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.25) 0%,rgba(234,179,8,0.10) 40%,transparent 70%);bottom:100px;left:-220px;pointer-events:none;z-index:0;filter:blur(22px); }
          .ps-orb-3 { position:absolute;width:550px;height:550px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.18) 0%,transparent 70%);top:50%;right:-120px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(22px); }

          /* ── HERO ── */
          .ps-hero { position:relative;overflow:hidden;padding:0; }
          .ps-hero-content { position:relative;z-index:2;text-align:center;max-width:880px;margin:0 auto;padding:64px 40px 44px; }
          .ps-eyebrow { display:inline-block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:20px;background:rgba(255,255,255,0.55);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.70);padding:6px 18px;border-radius:40px; }
          .ps-hero-content h1 { font-size:52px;font-weight:900;line-height:1.08;letter-spacing:-1.5px;margin-bottom:18px;background:linear-gradient(100deg,#0F3460 0%,#6366f1 50%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .ps-hero-content p { font-size:17px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 auto 32px; }
          .ps-hero-btns { display:flex;gap:14px;justify-content:center;flex-wrap:wrap; }
          .ps-btn-primary { display:inline-block;padding:15px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1);position:relative;overflow:hidden; }
          .ps-btn-primary::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:ps-shimmer 2.8s ease-in-out infinite;pointer-events:none; }
          @keyframes ps-shimmer { 0%{left:-120%} 35%,100%{left:160%} }
          .ps-btn-primary:hover { background:rgba(255,255,255,0.85);border-color:rgba(99,102,241,0.5);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(99,102,241,0.18),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }
          .ps-btn-secondary { display:inline-block;padding:14px 36px;border:1.5px solid rgba(15,52,96,0.22);border-radius:50px;color:#0F3460;font-weight:600;font-size:15px;text-decoration:none;transition:all 0.3s; }
          .ps-btn-secondary:hover { background:rgba(255,255,255,0.60);border-color:#0F3460;transform:translateY(-2px); }

          /* Stats bar */
          .ps-stats-bar { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:0 auto;background:rgba(255,255,255,0.50);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.90);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,1); }
          .ps-stat-col { padding:20px 24px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .ps-stat-col:last-child { border-right:none; }
          .ps-stat-value { font-size:28px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1;margin-bottom:5px; }
          .ps-stat-label { font-size:12px;color:#4A6080;font-weight:500; }

          /* Trust badges */
          .ps-trust-bar { position:relative;z-index:2;display:flex;gap:20px;justify-content:center;flex-wrap:wrap;padding:24px 40px 56px; }
          .ps-trust-badge { display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.55);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.75);border-radius:40px;padding:8px 18px;font-size:13px;font-weight:600;color:#2A3F6F; }
          .ps-trust-badge svg { width:16px;height:16px;fill:#44973D;flex-shrink:0; }

          /* ── SERVICES ── */
          .ps-services-section { background:#f8fafd;padding:80px 40px 64px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.14),0 -4px 16px rgba(15,52,96,0.08); }
          .ps-services-inner { max-width:1280px;margin:0 auto; }
          .ps-section-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px; }
          .ps-section-title { font-size:44px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:12px; }
          .ps-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:40px; }
          .ps-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
          .ps-service-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px 24px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .ps-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#6366f1,#D97706);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .ps-service-card:hover::before { transform:scaleY(1); }
          .ps-service-card:hover { transform:translateY(-6px);border-color:rgba(99,102,241,0.35);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .ps-service-card.featured { background:linear-gradient(135deg,rgba(238,242,255,0.60) 0%,rgba(255,255,255,0.88) 55%,rgba(254,243,199,0.40) 100%);border-color:rgba(99,102,241,0.20);box-shadow:0 6px 32px rgba(99,102,241,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .ps-card-num { position:absolute;top:8px;right:14px;font-size:68px;font-weight:900;line-height:1;color:#0F3460;opacity:0.05;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .ps-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:9px;position:relative;z-index:1; }
          .ps-service-card p { font-size:13px;color:#4A6080;line-height:1.65;position:relative;z-index:1;margin:0; }
          .ps-service-card:hover h3 { color:#6366f1; }

          /* Section reveal */
          .ps-section-reveal { opacity:0;transform:translateY(44px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .ps-section-reveal.ps-revealed { opacity:1;transform:translateY(0); }

          /* ── WHY US ── */
          .ps-why-section { padding:80px 40px;background:transparent;position:relative;z-index:1; }
          .ps-why-inner { max-width:1280px;margin:0 auto; }
          .ps-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:52px; }
          .ps-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:30px 26px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.25s,box-shadow 0.25s; }
          .ps-why-card.ps-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .ps-why-card:hover { border-color:rgba(99,102,241,0.35);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-5px) scale(1); }
          .ps-why-icon { width:42px;height:42px;display:flex;align-items:center;justify-content:center;margin-bottom:12px; }
          .ps-why-icon svg { width:26px;height:26px;fill:#6366f1; }
          .ps-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35; }
          .ps-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* ── PROCESS ── */
          .ps-process-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .ps-process-inner { max-width:1280px;margin:0 auto; }
          .ps-process-layout { display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start;margin-top:52px; }
          .ps-process-steps { display:flex;flex-direction:column; }
          .ps-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .ps-pstep.visible { opacity:1;transform:translateY(0); }
          .ps-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .ps-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .ps-pstep:hover .ps-pstep-circle { background:rgba(99,102,241,0.18);border-color:#6366f1;color:#6366f1; }
          .ps-pstep-line { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:44px; }
          .ps-pstep-line::before { content:'';width:2px;flex:1;background:#0F3460;opacity:0.2; }
          .ps-pstep-line::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:0.35;margin-top:-1px; }
          .ps-pstep:last-child .ps-pstep-line { display:none; }
          .ps-pstep-content { padding:4px 0 42px; }
          .ps-pstep:last-child .ps-pstep-content { padding-bottom:0; }
          .ps-pstep-title { font-size:21px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .ps-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .ps-process-aside { position:sticky;top:100px; }
          .ps-process-card { background:linear-gradient(135deg,rgba(238,242,255,0.65) 0%,rgba(255,255,255,0.90) 55%,rgba(254,243,199,0.40) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.90);border-radius:20px;padding:36px 32px;box-shadow:0 12px 48px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .ps-process-card h3 { font-size:22px;font-weight:800;color:#0F3460;margin:0 0 18px;line-height:1.2; }
          .ps-deliverable-list { display:flex;flex-direction:column;gap:12px; }
          .ps-deliverable-item { display:flex;align-items:flex-start;gap:12px; }
          .ps-deliverable-icon { width:28px;height:28px;border-radius:8px;background:rgba(99,102,241,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px; }
          .ps-deliverable-item p { font-size:13px;color:#374151;line-height:1.55;margin:0; }
          .ps-deliverable-item strong { color:#0F3460;font-weight:600; }
          .ps-process-cta { margin-top:28px;display:block;width:100%;text-align:center;padding:14px 20px;background:linear-gradient(90deg,#6366f1,#D97706);color:#fff;font-weight:700;font-size:15px;text-decoration:none;border-radius:50px;transition:opacity 0.2s,transform 0.2s;box-shadow:0 6px 24px rgba(99,102,241,0.30); }
          .ps-process-cta:hover { opacity:0.90;transform:translateY(-2px); }

          /* ── FAQ ── */
          .ps-faq-section { padding:80px 40px;background:transparent;position:relative;z-index:1; }
          .ps-faq-inner { max-width:1280px;margin:0 auto; }
          .ps-faq-layout { display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start; }
          .ps-faq-left { position:sticky;top:100px; }
          .ps-faq-heading { font-size:44px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .ps-faq-intro { font-size:15px;color:#4A6080;line-height:1.75;margin:0 0 28px; }
          .ps-faq-contact-nudge { display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:rgba(255,255,255,0.55);backdrop-filter:blur(10px);border:1.5px solid rgba(255,255,255,0.80);border-radius:50px;color:#0F3460;font-weight:600;font-size:14px;text-decoration:none;transition:all 0.3s; }
          .ps-faq-contact-nudge:hover { background:rgba(255,255,255,0.80);transform:translateY(-2px); }
          .ps-faq-list { display:flex;flex-direction:column;gap:10px; }
          .ps-faq-item { background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s;position:relative; }
          .ps-faq-item.open { border-color:rgba(99,102,241,0.35);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .ps-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#6366f1;border-radius:3px 0 0 3px; }
          .ps-faq-question { width:100%;background:none;border:none;padding:20px 20px 20px 56px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative; }
          .ps-faq-q-badge { position:absolute;left:14px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .ps-faq-item.open .ps-faq-q-badge { background:#6366f1;color:#fff; }
          .ps-faq-question span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .ps-faq-item.open .ps-faq-question span { color:#6366f1; }
          .ps-faq-chevron { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .ps-faq-item.open .ps-faq-chevron { transform:rotate(180deg);color:#6366f1; }
          .ps-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .ps-faq-item.open .ps-faq-answer-wrap { max-height:420px; }
          .ps-faq-answer { padding:0 20px 20px 56px;font-size:14px;color:#4b5563;line-height:1.8; }

          /* ── TESTIMONIALS ── */
          .ps-testi-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .ps-testi-inner { max-width:1280px;margin:0 auto; }
          .ps-section-center { text-align:center;margin-bottom:48px; }
          .ps-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .ps-tcard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.82) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .ps-tcard:hover { transform:translateY(-6px);border-color:rgba(99,102,241,0.35);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .ps-tcard-stars { font-size:17px;color:#D97706;letter-spacing:2px; }
          .ps-tcard-text { font-size:14px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .ps-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .ps-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .ps-tcard-name { font-size:14px;font-weight:700;color:#0F3460; }
          .ps-tcard-role { font-size:12px;color:#6b7280; }

          /* ── CONTACT CTA ── */
          .ps-contact-section { padding:72px 40px;background:linear-gradient(135deg,rgba(238,242,255,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .ps-contact-container { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.1fr;align-items:start;gap:36px; }
          .ps-contact-title { font-size:44px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .ps-contact-desc { font-size:14px;color:#4A6080;line-height:1.65;margin:0 0 24px; }
          .ps-contact-perks { display:flex;flex-direction:column;gap:14px;margin-bottom:28px; }
          .ps-perk { display:flex;align-items:flex-start;gap:10px; }
          .ps-perk-check { width:22px;height:22px;border-radius:50%;background:rgba(99,102,241,0.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px;color:#6366f1;font-weight:800;margin-top:1px; }
          .ps-perk p { font-size:13px;color:#4A6080;margin:0;line-height:1.55; }
          .ps-contact-stats { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:24px;border-top:1px solid rgba(15,52,96,0.10); }
          .ps-cstat-num { font-size:32px;font-weight:900;color:#0F3460;line-height:1;margin-bottom:4px; }
          .ps-cstat-text { font-size:12px;color:#4A6080;font-weight:500;line-height:1.4; }
          .ps-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(238,242,255,0.25) 50%,rgba(255,255,255,0.86) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .ps-form-box h3 { font-size:24px;font-weight:700;margin:0 0 26px;color:#0F1F40;letter-spacing:-0.4px; }
          .ps-contact-form { display:flex;flex-direction:column;gap:14px; }
          .ps-form-row { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .ps-form-group { display:flex;flex-direction:column;gap:5px; }
          .ps-form-group.full { grid-column:1/-1; }
          .ps-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .ps-form-group input,.ps-form-group textarea,.ps-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .ps-form-group input:focus,.ps-form-group textarea:focus { outline:none;border-color:#6366f1;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(99,102,241,0.12); }
          .ps-phone-row { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .ps-phone-row select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:78px;font-family:inherit; }
          .ps-phone-row input { flex:1;border:none;border-radius:0;padding:10px 14px;font-family:inherit;font-size:13px;color:#0F1F40;background:transparent; }
          .ps-phone-row input:focus { outline:none; }
          .ps-consent { display:flex;gap:8px;align-items:flex-start;margin-top:4px; }
          .ps-consent input[type="checkbox"] { margin-top:3px;width:15px;height:15px;cursor:pointer; }
          .ps-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .ps-consent a { color:#6366f1;text-decoration:none; }
          .ps-submit-btn { padding:14px 28px;background:linear-gradient(90deg,#6366f1,#4f46e5);color:white;border:none;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:6px;width:100%;box-shadow:0 6px 24px rgba(99,102,241,0.30); }
          .ps-submit-btn:hover { background:linear-gradient(90deg,#4f46e5,#4338ca);transform:translateY(-2px);box-shadow:0 10px 32px rgba(99,102,241,0.40); }

          /* ── RELATED SERVICES ── */
          .ps-related-section { background:rgba(237,233,254,0.20);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:72px 40px; }
          .ps-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .ps-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .ps-related-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 14px; }
          .ps-related-sub { font-size:15px;color:#4A6080;line-height:1.7;margin:0 auto 40px;max-width:620px; }
          .ps-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.10);margin:0 0 36px; }
          .ps-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:10px; }
          .ps-rtag { display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:13px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .ps-rtag:hover { transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10);filter:brightness(0.92); }
          .ps-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .ps-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .ps-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .ps-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .ps-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .ps-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .ps-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .ps-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }

          /* ── RESPONSIVE ── */
          @media (max-width:1024px) {
            .ps-services-grid { grid-template-columns:repeat(2,1fr); }
            .ps-why-grid { grid-template-columns:repeat(2,1fr); }
            .ps-process-layout { grid-template-columns:1fr; }
            .ps-process-aside { position:static; }
            .ps-faq-layout { grid-template-columns:1fr; }
            .ps-faq-left { position:static; }
            .ps-contact-container { grid-template-columns:1fr; }
          }
          @media (max-width:768px) {
            .ps-page { overflow-x:hidden; }
            .ps-hero-content { padding:44px 20px 28px; }
            .ps-hero-content h1 { font-size:30px;letter-spacing:-0.4px; }
            .ps-hero-content p { font-size:15px; }
            .ps-stats-bar { grid-template-columns:1fr 1fr; }
            .ps-stat-col:nth-child(2) { border-right:none; }
            .ps-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .ps-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .ps-trust-bar { padding:16px 20px 36px;gap:10px; }
            .ps-services-section { padding:52px 20px 44px; }
            .ps-why-section { padding:60px 20px; }
            .ps-why-grid { grid-template-columns:1fr;margin-top:36px; }
            .ps-process-section { padding:60px 20px; }
            .ps-faq-section { padding:60px 20px; }
            .ps-testi-section { padding:60px 20px; }
            .ps-testi-grid { grid-template-columns:1fr; }
            .ps-contact-section { padding:52px 20px; }
            .ps-section-title,.ps-faq-heading,.ps-contact-title,.ps-related-title { font-size:28px; }
            .ps-form-row { grid-template-columns:1fr; }
            .ps-related-section { padding:60px 20px; }
            .ps-related-tags { gap:8px; }
          }
          @media (max-width:480px) {
            .ps-hero-content h1 { font-size:24px; }
            .ps-services-grid { grid-template-columns:1fr; }
            .ps-section-title,.ps-faq-heading,.ps-contact-title,.ps-related-title { font-size:24px; }
            .ps-contact-stats { grid-template-columns:1fr 1fr; }
            .ps-hero-btns { flex-direction:column;align-items:center; }
          }
          @media (max-width:900px) {
            .ps-page { background-attachment:scroll !important; }
          }
        `}</style>
      </Head>

      <div className="ps-page">
        <div className="ps-orb-1" />
        <div className="ps-orb-2" />
        <div className="ps-orb-3" />

        {/* ── HERO ── */}
        <div className="ps-hero">
          <div className="ps-hero-content">
            <span className="ps-eyebrow">UX Prototyping Agency — 16+ Years Experience</span>
            <h1>Prototyping That Validates Ideas Before You Write a Line of Code</h1>
            <p>From low-fi wireframes to pixel-perfect interactive prototypes, we help you test concepts, align stakeholders, and ship with confidence — not guesswork.</p>
            <div className="ps-hero-btns">
              <Link href="#contact" className="ps-btn-primary">Get a Free Prototype Consultation</Link>
              <Link href="/portfolio" className="ps-btn-secondary">View Our Work →</Link>
            </div>
          </div>

          <div className="ps-stats-bar" ref={statsRef}>
            {[
              ['400+ Prototypes Delivered', '400+'],
              ['60% Faster Sign-Off', '60%'],
              ['16+ Years Experience', '16+'],
              ['90% Fewer Revisions', '90%'],
            ].map(([label, val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="ps-trust-bar">
            {[
              'Figma-Native Workflow',
              'Clickable Prototypes via URL',
              'Moderated Usability Testing',
              'Developer-Ready Handoff',
              'Fixed-Price Engagements',
            ].map(badge => (
              <div className="ps-trust-badge" key={badge}>
                <svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="ps-services-section" id="services">
          <div className="ps-services-inner">
            <div
              className={`ps-section-reveal${visibleSections.has('services') ? ' ps-revealed' : ''}`}
              ref={el => { sectionRefs.current['services'] = el; }}
            >
              <span className="ps-section-eyebrow">What We Deliver</span>
              <h2 className="ps-section-title">Prototyping Services We Offer</h2>
              <p className="ps-section-desc">Every deliverable is designed to reduce risk, accelerate sign-off, and give your engineering team a single source of truth from day one.</p>
            </div>
            <div className="ps-services-grid">
              {SERVICES.map(s => (
                <div key={s.n} className={`ps-service-card${s.featured ? ' featured' : ''}`}>
                  <span className="ps-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="ps-why-section">
          <div className="ps-why-inner">
            <div
              className={`ps-section-reveal${visibleSections.has('why') ? ' ps-revealed' : ''}`}
              ref={el => { sectionRefs.current['why'] = el; }}
              style={{ textAlign: 'center', marginBottom: 0 }}
            >
              <span className="ps-section-eyebrow">Why 1Solutions</span>
              <h2 className="ps-section-title">Why Product Teams Choose Us for Prototyping</h2>
              <p className="ps-section-desc" style={{ maxWidth: 680, margin: '0 auto 0' }}>We combine research rigour with design craft to build prototypes that don't just look right — they work right.</p>
            </div>
            <div className="ps-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div
                  key={w.title}
                  className={`ps-why-card${visibleWhyCards.includes(i) ? ' ps-card-visible' : ''}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="ps-why-icon">{w.icon}</div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="ps-process-section" id="process">
          <div className="ps-process-inner">
            <div
              className={`ps-section-reveal${visibleSections.has('process') ? ' ps-revealed' : ''}`}
              ref={el => { sectionRefs.current['process'] = el; }}
            >
              <span className="ps-section-eyebrow">Our Process</span>
              <h2 className="ps-section-title">How We Build Prototypes That Ship</h2>
              <p className="ps-section-desc">A structured 6-stage process ensures nothing is left to assumption — from initial brief through developer handoff.</p>
            </div>
            <div className="ps-process-layout">
              <div className="ps-process-steps">
                {PROCESS.map((step, i) => (
                  <div
                    key={step.title}
                    className={`ps-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                    ref={el => { stepRefs.current[i] = el; }}
                  >
                    <div className="ps-pstep-left">
                      <div className="ps-pstep-circle">{i + 1}</div>
                      {i < PROCESS.length - 1 && <div className="ps-pstep-line" />}
                    </div>
                    <div className="ps-pstep-content">
                      <h3 className="ps-pstep-title">{step.title}</h3>
                      <p className="ps-pstep-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ps-process-aside">
                <div className="ps-process-card">
                  <h3>What You Receive</h3>
                  <div className="ps-deliverable-list">
                    {[
                      ['📐', 'Annotated wireframes', 'Low and mid-fidelity frames with layout rationale and copy guidance notes'],
                      ['🎨', 'High-fidelity prototype', 'Pixel-perfect, on-brand interactive prototype in Figma with real component library'],
                      ['🔗', 'Shareable prototype URL', 'Accessible to anyone via browser — no Figma account or software required'],
                      ['📋', 'Usability test report', 'Recorded session findings, task completion rates, and ranked friction points'],
                      ['📦', 'Developer handoff file', 'Figma file with inspection mode, redlines, spacing specs, and design tokens'],
                      ['♻️', 'Component library', 'Reusable design system components your engineering team can build and maintain'],
                    ].map(([icon, title, desc]) => (
                      <div className="ps-deliverable-item" key={title}>
                        <div className="ps-deliverable-icon">{icon}</div>
                        <p><strong>{title}</strong> — {desc}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="#contact" className="ps-process-cta">Start Your Prototyping Project →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="ps-testi-section">
          <div className="ps-testi-inner">
            <div
              className={`ps-section-center ps-section-reveal${visibleSections.has('testi') ? ' ps-revealed' : ''}`}
              ref={el => { sectionRefs.current['testi'] = el; }}
            >
              <span className="ps-section-eyebrow">Client Reviews</span>
              <h2 className="ps-section-title">What Our Clients Say</h2>
              <p style={{ fontSize: 15, color: '#4A6080', margin: 0 }}>Trusted by product teams across the US, Canada, Australia, and the UK.</p>
            </div>
            <div className="ps-testi-grid">
              {[
                { initials: 'RK', bg: '#4f46e5', text: '"1Solutions delivered a high-fidelity prototype for our SaaS dashboard in under 3 weeks. Stakeholders were blown away by the quality — we got immediate sign-off and the dev team had zero questions during build."', name: 'Rachel Kim', role: 'Head of Product, TechVault — USA' },
                { initials: 'BT', bg: '#0F3460', text: '"We\'d been stuck in design purgatory for months. 1Solutions structured the project properly, mapped our user flows, and delivered an interactive prototype that made the path forward crystal clear. Best investment we made this year."', name: 'Ben Turner', role: 'CTO, Finbridge — Australia' },
                { initials: 'AL', bg: '#6366f1', text: '"The Figma prototype they produced was so detailed that our engineers barely had to ask any questions during development. That alone saved us weeks. Would absolutely work with them again."', name: 'Amara Lawson', role: 'VP Design, CloudScale — Canada' },
              ].map(t => (
                <div className="ps-tcard" key={t.name}>
                  <div className="ps-tcard-stars">★★★★★</div>
                  <p className="ps-tcard-text">{t.text}</p>
                  <div className="ps-tcard-author">
                    <div className="ps-tcard-avatar" style={{ background: t.bg }}>{t.initials}</div>
                    <div>
                      <div className="ps-tcard-name">{t.name}</div>
                      <div className="ps-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="ps-faq-section" id="faq">
          <div className="ps-faq-inner">
            <div className="ps-faq-layout">
              <div className="ps-faq-left">
                <span className="ps-section-eyebrow">FAQ</span>
                <h2 className="ps-faq-heading">Frequently Asked Questions</h2>
                <p className="ps-faq-intro">Everything you need to know before starting a prototyping project with 1Solutions. Can't find your answer? Let's talk.</p>
                <Link href="#contact" className="ps-faq-contact-nudge">
                  Ask Us Anything →
                </Link>
              </div>
              <div className="ps-faq-list">
                {FAQS.map((faq, i) => (
                  <div key={i} className={`ps-faq-item${openFaq === i ? ' open' : ''}`}>
                    <button className="ps-faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                      <div className="ps-faq-q-badge">Q</div>
                      <span>{faq.q}</span>
                      <svg className="ps-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <div className="ps-faq-answer-wrap">
                      <div className="ps-faq-answer">{faq.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="ps-contact-section" id="contact">
          <div className="ps-contact-container">
            <div>
              <h2 className="ps-contact-title">Let's Build Your Prototype Together</h2>
              <p className="ps-contact-desc">Tell us about your product and we'll respond within 24 business hours with a scoped proposal — no fluff, no obligation.</p>
              <div className="ps-contact-perks">
                {[
                  'Your project brief is kept confidential — NDA available on request.',
                  'A senior UX designer reviews every enquiry personally.',
                  'We respond within 24 business hours, not 5 business days.',
                  'Free 30-minute discovery call to scope your project before you commit.',
                ].map((perk, i) => (
                  <div className="ps-perk" key={i}>
                    <div className="ps-perk-check">✓</div>
                    <p>{perk}</p>
                  </div>
                ))}
              </div>
              <div className="ps-contact-stats">
                {[['400+', 'Prototypes Delivered'], ['16+', 'Years Experience'], ['97%', 'Client Retention']].map(([num, text]) => (
                  <div key={text}>
                    <div className="ps-cstat-num">{num}</div>
                    <div className="ps-cstat-text">{text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="ps-form-box">
                <h3>Request a Free Consultation</h3>
                <form className="ps-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="ps-form-row">
                    <div className="ps-form-group">
                      <label>Full Name*</label>
                      <input type="text" placeholder="Full Name*" required />
                    </div>
                    <div className="ps-form-group">
                      <label>Business Email*</label>
                      <input type="email" placeholder="Business Email*" required />
                    </div>
                  </div>
                  <div className="ps-form-row">
                    <div className="ps-form-group">
                      <label>Phone Number*</label>
                      <div className="ps-phone-row">
                        <select>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+1-CA">🇨🇦 +1</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="ps-form-group">
                      <label>Organization*</label>
                      <input type="text" placeholder="Company / Startup*" required />
                    </div>
                  </div>
                  <div className="ps-form-group full">
                    <label>Project Brief*</label>
                    <textarea
                      placeholder="Describe your product, what you need prototyped, and your timeline..."
                      rows={5}
                      required
                    />
                  </div>
                  <div className="ps-consent">
                    <input type="checkbox" id="ps-consent" required />
                    <label htmlFor="ps-consent">
                      I consent to 1Solutions processing my data in accordance with their{' '}
                      <Link href="/privacy-policy">Privacy Policy</Link>.
                    </label>
                  </div>
                  <button type="submit" className="ps-submit-btn">Send My Brief →</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="ps-related-section">
          <div className="ps-related-inner">
            <span className="ps-related-eyebrow">Related UX & Design Offerings</span>
            <h2 className="ps-related-title">Explore Related Services</h2>
            <p className="ps-related-sub">Pair our prototyping expertise with complementary services to take your product from concept to market.</p>
            <hr className="ps-related-divider" />
            <div className="ps-related-tags">
              {[
                ['UX Research Services', 'violet', '/ux-research'],
                ['UI/UX Design Services', 'blue', '/hire-ui-ux-designer'],
                ['Web Application Development', 'teal', '/ecommerce-website-development-services'],
                ['Mobile App Development', 'indigo', '/flutter-app-development-services'],
                ['WordPress Development', 'amber', '/wordpress-development-company'],
                ['Hire UI/UX Designer', 'rose', '/hire-ui-ux-designer'],
                ['Digital Marketing Services', 'green', '/seo-services-company'],
                ['Website Redesign', 'sky', '/wordpress-development-company'],
              ].map(([label, color, href]) => (
                <Link href={href} className={`ps-rtag ps-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
