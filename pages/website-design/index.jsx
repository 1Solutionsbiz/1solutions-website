'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Landing Page Design', desc: 'High-converting pages built around a single compelling call to action — crafted to capture leads and drive purchases.' },
  { n: '02', title: 'Corporate Website Design', desc: 'Professional multi-page sites that establish credibility, tell your brand story, and drive qualified enquiries.' },
  { n: '03', title: 'eCommerce Website Design', desc: 'Product-first layouts engineered to reduce friction, increase basket size, and turn browsers into repeat buyers.' },
  { n: '04', title: 'WordPress Theme Design', desc: 'Bespoke WordPress themes built for speed, SEO, and editorial ease — no bloat, no compromises.' },
  { n: '05', title: 'Responsive / Mobile-First Design', desc: 'Pixel-perfect on every device from 320px to 5K displays — your site looks exceptional everywhere it\'s seen.' },
  { n: '06', title: 'UI/UX Audit & Redesign', desc: 'Identify friction points with heuristic analysis and heatmap data, then redesign with data-backed improvements.' },
  { n: '07', title: 'Design to Development Handoff', desc: 'Figma files with component specs, design tokens, spacing grids, and annotated developer notes for zero-ambiguity handoffs.' },
  { n: '08', title: 'Conversion Rate Optimisation', desc: 'A/B-tested design variations, optimised CTAs, and persuasive page layouts that lift sales and lead capture rates.' },
];

const FAQS = [
  {
    q: 'How much does a professional website design cost?',
    a: 'Website design pricing varies by project scope. A focused landing page design typically starts from $800–$1,500. A full corporate multi-page website design ranges from $2,500–$8,000. Complex eCommerce or enterprise portal designs start from $10,000+. We provide a detailed fixed-price quote after a free discovery call — no hidden costs and no surprises. Every quote includes Figma source files and developer-ready specs.',
  },
  {
    q: 'What design tools do you use?',
    a: 'Our primary design tool is Figma for wireframing, UI design, prototyping, and handoff. We use FigJam for workshops and collaborative discovery sessions. For illustrations and iconography we use Adobe Illustrator. Animations are prototyped in Figma using advanced interactions, and documented as Lottie files or CSS keyframe specs for developers. All final deliverables are provided as organised Figma files with shared access to your team.',
  },
  {
    q: 'Do you design in Figma?',
    a: 'Yes — 100%. Figma is our end-to-end design tool. You receive a well-organised Figma file with a component library, design tokens (colours, typography, spacing), all page frames, interactive prototypes, and developer annotations. We use Figma\'s Dev Mode so your developers can inspect CSS values, download assets, and measure spacing directly — making handoff seamless and reducing back-and-forth.',
  },
  {
    q: 'How long does website design take?',
    a: 'Timelines depend on scope. A single landing page takes 5–10 business days. A full corporate website (6–12 pages) typically takes 3–5 weeks from discovery to final Figma delivery. eCommerce site designs (with product listing, PDP, cart, and checkout pages) usually take 6–10 weeks. We share a detailed project timeline in the proposal stage and provide weekly progress updates throughout the engagement.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Absolutely. Redesign projects are one of our specialities. We begin with a UX audit of your current site — reviewing heatmaps, analytics, user feedback, and competitor benchmarks — to identify exactly what\'s costing you conversions. We then design an improved experience that preserves your brand equity while eliminating friction. We can also work alongside your existing development team or handle the complete design-to-development process.',
  },
  {
    q: 'Do you provide mobile-responsive designs?',
    a: 'Yes — every design we deliver is mobile-first and fully responsive. We design breakpoints for mobile (375px), tablet (768px), and desktop (1440px) as standard. For high-traffic or mobile-heavy audiences we also provide additional breakpoints at 320px and 1280px. All Figma files include responsive frames so developers have clear guidance at every screen width. We do not deliver desktop-only designs.',
  },
];

const WHY = [
  {
    icon: <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>,
    title: 'Conversion-First Philosophy',
    desc: 'Every design decision is evaluated against a single question: will this convert? We combine aesthetic excellence with proven persuasion principles.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>,
    title: 'Figma-First Workflow',
    desc: 'Clean, well-organised Figma files with components, tokens, and Dev Mode annotations — so your developers can build without guesswork.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>,
    title: '16+ Years Experience',
    desc: 'Since 2008 we have designed 500+ websites across every major industry. Our experience means fewer revisions and faster time to launch.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>,
    title: 'Data-Backed Design Decisions',
    desc: 'We use heatmaps, session recordings, and A/B test results to guide every redesign — not opinions, not guesswork, not trends for their own sake.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>,
    title: 'Mobile-First by Default',
    desc: 'Over 65% of web traffic is mobile. We design for the smallest screen first and scale up — ensuring your site excels where it matters most.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
    title: 'Dedicated Design Team',
    desc: 'Your project gets a dedicated UI/UX designer, a creative director, and a project manager — not a one-person freelancer juggling ten clients.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>,
    title: 'SEO-Compatible Architecture',
    desc: 'We design with technical SEO in mind — semantic heading hierarchy, Core Web Vitals-friendly layouts, and page structures built for Google.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>,
    title: 'Unlimited Revisions Until Perfect',
    desc: 'We work in structured review rounds but will not stop until you are 100% satisfied. Your approval, not a revision count, marks the end of a phase.',
  },
];

const PROCESS_STEPS = [
  {
    title: 'Discovery & Strategy',
    desc: 'We deep-dive into your business goals, audience, competitors, and brand identity. This phase produces a design brief, sitemap, and content strategy that align creative decisions with commercial outcomes.',
  },
  {
    title: 'Wireframing',
    desc: 'Low-fidelity wireframes define the layout, information hierarchy, and user flow before a single colour or font is chosen. This keeps structural decisions separate from visual decisions — saving time and revision cycles.',
  },
  {
    title: 'Visual Design',
    desc: 'We apply your brand identity to the approved wireframes — colour palettes, typography, imagery, micro-interactions, and component styles. You review high-fidelity Figma mockups for all key pages and breakpoints.',
  },
  {
    title: 'Review & Iterate',
    desc: 'Structured feedback rounds with clear annotations. We consolidate your feedback, update designs, and present revised versions until every section is exactly right. No ambiguity, no lost comments in email threads.',
  },
  {
    title: 'Handoff / Launch',
    desc: 'Final Figma files are delivered with organised layers, a component library, design tokens, and developer annotations. We remain available during the development phase to answer questions and review the built output.',
  },
];

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
  const hasComma = String(val).includes(',');
  const display = started ? (hasComma ? num.toLocaleString() : num) + suffix : val;
  return (
    <div className="wd-stat-col">
      <div className="wd-stat-label">{label}</div>
      <div className="wd-stat-value">{display}</div>
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
        { '@type': 'ListItem', position: 2, name: 'Website Design', item: 'https://www.1solutions.biz/website-design' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Website Design Services',
      provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
      description: 'Conversion-focused website design services by 1Solutions. Landing pages, corporate websites, eCommerce design, UI/UX audits, and Figma handoff.',
      serviceType: 'Website Design',
      areaServed: ['IN', 'US', 'CA', 'GB', 'AU'],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '178', bestRating: '5' },
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

export default function WebsiteDesign() {
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
        { threshold: 0.2 }
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
      { threshold: 0.08 }
    );
    obs.observe(whyGridRef.current);
    return () => obs.disconnect();
  }, []);

  // Testimonial cards reveal
  useEffect(() => {
    if (!testiGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0, 1, 2].forEach(i => setTimeout(() => setVisibleTestiCards(p => p.includes(i) ? p : [...p, i]), i * 150));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(testiGridRef.current);
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
        <title>Website Design Company | Conversion-Focused Web Design | 1Solutions</title>
        <meta name="description" content="1Solutions is a conversion-focused website design company with 16+ years experience. We design landing pages, corporate sites, eCommerce stores, and UI/UX audits that turn visitors into customers." />
        <meta name="keywords" content="website design company, web design services, conversion-focused web design, landing page design, UI UX design, responsive web design, Figma design" />
        <link rel="canonical" href="https://www.1solutions.biz/website-design" />
        <meta property="og:title" content="Website Design Company | Conversion-Focused Web Design | 1Solutions" />
        <meta property="og:description" content="We design websites that don't just look great — they convert. From landing pages to enterprise portals, every pixel is crafted for performance." />
        <meta property="og:url" content="https://www.1solutions.biz/website-design" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .wd-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            background-attachment: scroll;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
          }
          .wd-page *, .wd-page *::before, .wd-page *::after { box-sizing: border-box; }

          /* Orbs */
          .wd-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.32) 0%,rgba(139,92,246,0.14) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .wd-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.28) 0%,rgba(245,158,11,0.14) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .wd-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.18) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* Hero */
          .wd-hero-block { background:transparent;position:relative;overflow:hidden; }
          .wd-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.11) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .wd-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.16) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .wd-hero-content { position:relative;z-index:2;text-align:center;max-width:880px;margin:0 auto;padding:60px 40px 40px; }
          .wd-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .wd-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .wd-hero-content p { font-size:16px;color:#3A507A;line-height:1.65;max-width:640px;margin:0 auto 28px; }
          .wd-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1);position:relative;overflow:hidden; }
          .wd-btn-hero::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:wd-shimmer 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes wd-shimmer { 0%{left:-120%} 35%,100%{left:160%} }
          .wd-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(245,158,11,0.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }

          /* Stats bar */
          .wd-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .wd-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .wd-stat-col:last-child { border-right:none; }
          .wd-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .wd-stat-value { font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1; }

          /* Clients strip */
          .wd-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .wd-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .wd-clients-logos { width:100%;overflow:hidden; }
          .wd-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:wd-marquee 28s linear infinite; }
          .wd-logos-track:hover { animation-play-state:paused; }
          @keyframes wd-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .wd-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .wd-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Shared section styles */
          .wd-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .wd-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .wd-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }

          /* Section reveal animation */
          .wd-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .wd-section-reveal.wd-revealed { opacity:1;transform:translateY(0); }

          /* Services */
          .wd-services-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.18),0 -4px 16px rgba(15,52,96,0.10); }
          .wd-services-inner { max-width:1280px;margin:0 auto; }
          .wd-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .wd-service-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .wd-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#D97706,#f59e0b);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .wd-service-card:hover::before { transform:scaleY(1); }
          .wd-service-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .wd-service-card:hover h3 { color:#D97706; }
          .wd-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .wd-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .wd-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }

          /* Process */
          .wd-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .wd-process-top { max-width:1280px;margin:0 auto 56px; }
          .wd-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .wd-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .wd-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .wd-process-divider { border:none;border-top:1px solid rgba(15,52,96,0.15);margin:36px 0 0;width:100%; }
          .wd-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .wd-process-steps { display:flex;flex-direction:column; }
          .wd-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .wd-pstep.visible { opacity:1;transform:translateY(0); }
          .wd-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .wd-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .wd-pstep:hover .wd-pstep-circle { background:rgba(245,158,11,0.2);border-color:#D97706;color:#D97706; }
          .wd-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .wd-pstep-arrow::before { content:'';width:2px;flex:1;background:#0F3460;opacity:0.25; }
          .wd-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #0F3460;opacity:0.45;margin-top:-1px; }
          .wd-pstep:last-child .wd-pstep-arrow { display:none; }
          .wd-pstep-content { padding:4px 0 44px; }
          .wd-pstep:last-child .wd-pstep-content { padding-bottom:0; }
          .wd-pstep-title { font-size:22px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .wd-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .wd-process-image-col { position:sticky;top:100px;min-width:0; }
          .wd-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(15,52,96,0.15);aspect-ratio:4/5;background:#e8edf5;display:flex;align-items:center;justify-content:center; }
          .wd-process-img-placeholder { text-align:center;color:#4A6080;padding:40px; }
          .wd-process-img-placeholder svg { width:80px;height:80px;fill:#D97706;opacity:0.5;margin-bottom:16px; }
          .wd-process-img-placeholder p { font-size:14px;line-height:1.6;margin:0; }

          /* Testimonials */
          .wd-testi-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .wd-testi-inner { max-width:1280px;margin:0 auto; }
          .wd-section-header-center { text-align:center;margin-bottom:52px; }
          .wd-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .wd-tcard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .wd-tcard.wd-tcard-visible { opacity:1;transform:translateY(0); }
          .wd-tcard:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .wd-tcard.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wd-tcard-stars { font-size:18px;color:#D97706;letter-spacing:2px; }
          .wd-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .wd-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .wd-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .wd-tcard-name { font-size:14px;font-weight:700;color:#0F3460; }
          .wd-tcard-role { font-size:12px;color:#6b7280; }
          .wd-testi-stats { display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .wd-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .wd-tstat-num { font-size:28px;font-weight:800;color:#0F3460; }
          .wd-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .wd-tstat-divider { width:1px;height:40px;background:rgba(15,52,96,0.15); }

          /* Why Us */
          .wd-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .wd-why-inner { max-width:1280px;margin:0 auto; }
          .wd-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .wd-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.25s,box-shadow 0.25s; }
          .wd-why-card.wd-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .wd-why-card:hover { transform:translateY(-6px) scale(1);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .wd-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .wd-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .wd-why-icon svg { width:28px;height:28px;fill:#D97706; }
          .wd-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .wd-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* FAQ */
          .wd-faq-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .wd-faq-inner { max-width:1280px;margin:0 auto; }
          .wd-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .wd-faq-list { display:flex;flex-direction:column;gap:12px; }
          .wd-faq-item { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .wd-faq-item.open { border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .wd-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .wd-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .wd-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .wd-faq-item.open .wd-faq-q-badge { background:#D97706;color:#fff; }
          .wd-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .wd-faq-item.open .wd-faq-question span { color:#D97706; }
          .wd-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .wd-faq-item.open .wd-faq-chevron { transform:rotate(180deg);color:#D97706; }
          .wd-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .wd-faq-item.open .wd-faq-answer-wrap { max-height:400px; }
          .wd-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .wd-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#0F3460;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Contact */
          .wd-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .wd-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .wd-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .wd-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .wd-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .wd-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .wd-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .wd-benefit-icon { width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75; }
          .wd-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .wd-stats-box { padding-top:32px;border-top:1px solid rgba(15,52,96,0.12); }
          .wd-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .wd-stat-number { font-size:40px;font-weight:900;color:#0F3460;line-height:1;display:inline-block;margin-bottom:4px; }
          .wd-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .wd-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wd-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .wd-contact-form { display:flex;flex-direction:column;gap:16px; }
          .wd-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .wd-form-group { display:flex;flex-direction:column;gap:6px; }
          .wd-form-group.full { grid-column:1/-1; }
          .wd-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .wd-form-group input,.wd-form-group textarea,.wd-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .wd-form-group input:focus,.wd-form-group textarea:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12); }
          .wd-phone-input { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .wd-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .wd-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .wd-phone-input input:focus { outline:none; }
          .wd-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .wd-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .wd-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .wd-consent a { color:#0F3460;text-decoration:none; }
          .wd-submit-btn { padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .wd-submit-btn:hover { background:rgba(15,52,96,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }

          /* Related services */
          .wd-related-section { background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .wd-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .wd-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .wd-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .wd-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .wd-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0; }
          .wd-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .wd-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .wd-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .wd-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .wd-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .wd-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .wd-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .wd-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .wd-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .wd-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .wd-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .wd-rtag-cyan    { background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490; }
          .wd-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }
          .wd-rtag-fuchsia { background:rgba(217,70,239,0.10);border-color:rgba(217,70,239,0.28);color:#86198F; }
          .wd-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }

          /* Responsive */
          @media (max-width:1024px) {
            .wd-hero-content h1 { font-size:40px; }
            .wd-services-grid { grid-template-columns:repeat(2,1fr); }
            .wd-why-grid { grid-template-columns:repeat(2,1fr); }
            .wd-process-inner { grid-template-columns:1fr; }
            .wd-process-image-col { display:none; }
            .wd-contact-container { grid-template-columns:1fr; }
          }
          @media (max-width:768px) {
            .wd-page { overflow-x:hidden; }
            .wd-hero-content { padding:36px 20px 24px; }
            .wd-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .wd-hero-content p { font-size:15px; }
            .wd-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .wd-stat-col { padding:14px 12px; }
            .wd-stat-col:nth-child(2) { border-right:none; }
            .wd-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .wd-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .wd-stat-value { font-size:22px; }
            .wd-clients-bar { padding:16px 20px 36px;gap:12px; }
            .wd-services-section { padding:48px 20px 40px; }
            .wd-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .wd-process-section { padding:60px 20px; }
            .wd-process-top { margin-bottom:36px; }
            .wd-testi-section { padding:60px 20px; }
            .wd-testi-section .wd-section-header-center { text-align:left; }
            .wd-testi-grid { grid-template-columns:1fr; }
            .wd-testi-stats { flex-wrap:wrap;padding:24px 20px; }
            .wd-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(15,52,96,0.10); }
            .wd-tstat:nth-child(odd) { border-right:1px solid rgba(15,52,96,0.10); }
            .wd-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .wd-tstat-divider { display:none; }
            .wd-why-section { padding:60px 20px; }
            .wd-why-section .wd-section-header-center { text-align:left; }
            .wd-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .wd-why-card { padding:24px 20px; }
            .wd-faq-section { padding:60px 20px; }
            .wd-faq-heading { font-size:26px; }
            .wd-faq-question { padding:18px 18px 18px 52px; }
            .wd-faq-question span { font-size:14px; }
            .wd-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .wd-faq-q-badge { left:14px; }
            .wd-contact-section { padding:48px 16px; }
            .wd-contact-title { font-size:28px; }
            .wd-form-row { grid-template-columns:1fr; }
            .wd-related-section { padding:60px 20px; }
            .wd-related-tags { gap:8px; }
            .wd-rtag { padding:9px 16px;font-size:13px; }
            .wd-section-title,.wd-process-main-title,.wd-related-title { font-size:30px; }
          }
          @media (max-width:480px) {
            .wd-hero-content h1 { font-size:24px; }
            .wd-section-title,.wd-process-main-title,.wd-related-title { font-size:26px; }
            .wd-services-grid { grid-template-columns:1fr; }
            .wd-service-card { padding:20px 18px 18px; }
            .wd-card-num { font-size:52px; }
            .wd-pstep-title { font-size:18px; }
            .wd-contact-title { font-size:24px; }
            .wd-merged-box { padding:18px; }
            .wd-tcard { padding:24px 20px; }
            .wd-stats-grid { grid-template-columns:1fr 1fr 1fr; }
          }
        `}</style>
      </Head>

      <div className="wd-page">
        {/* Orbs */}
        <div className="wd-orb-1" />
        <div className="wd-orb-2" />
        <div className="wd-orb-3" />

        {/* ── HERO ── */}
        <div className="wd-hero-block">
          <div className="wd-hero-content">
            <span className="wd-eyebrow">Conversion-Focused Website Design Company</span>
            <h1>Conversion-Focused Website Design That Turns Visitors Into Customers</h1>
            <p>We design websites that don&apos;t just look great — they convert. From landing pages to enterprise portals, every pixel is crafted for performance.</p>
            <Link href="#contact" className="wd-btn-hero">Get a Free Design Consultation</Link>
          </div>

          <div className="wd-hero-stats" ref={statsRef}>
            {[
              ['Websites Designed', '500+'],
              ['Client Satisfaction', '97%'],
              ['Years Experience', '16+'],
              ['Avg Conversion Lift', '40%'],
            ].map(([label, val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="wd-clients-bar">
            <span className="wd-clients-label">Trusted by Leading Brands</span>
            <div className="wd-clients-logos">
              <div className="wd-logos-track">
                {[
                  ['/logo/Indian_Express_Logo_full.png', 'Indian Express'],
                  ['/logo/Verizon_2015_logo_-vector.svg.png', 'Verizon'],
                  ['/logo/Uniphore.jpg', 'Uniphore'],
                  ['/logo/ICCoLogo.png', 'ICC'],
                  ['/logo/Honor_Logo_(2020).svg.png', 'Honor'],
                  ['/logo/Zuari-Finserv-logo-new.png', 'Zuari Finserv'],
                  ['/logo/Indian_Express_Logo_full.png', 'Indian Express2'],
                  ['/logo/Verizon_2015_logo_-vector.svg.png', 'Verizon2'],
                  ['/logo/Uniphore.jpg', 'Uniphore2'],
                  ['/logo/ICCoLogo.png', 'ICC2'],
                  ['/logo/Honor_Logo_(2020).svg.png', 'Honor2'],
                  ['/logo/Zuari-Finserv-logo-new.png', 'Zuari Finserv2'],
                ].map(([src, alt]) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/, '')} className="wd-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="wd-services-section">
          <div className="wd-services-inner">
            <div className={`wd-section-reveal${visibleSections.has('services') ? ' wd-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="wd-section-eyebrow">Our Services</span>
              <h2 className="wd-section-title">Website Design Services We Offer</h2>
              <p className="wd-section-desc">From first-impression landing pages to full eCommerce platforms — every design we deliver is rooted in user psychology, brand strategy, and measurable conversion metrics.</p>
            </div>
            <div className="wd-services-grid">
              {SERVICES.map(s => (
                <div key={s.n} className="wd-service-card">
                  <span className="wd-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="wd-process-section">
          <div className="wd-process-top">
            <div className={`wd-section-reveal${visibleSections.has('process') ? ' wd-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="wd-process-eyebrow">OUR DESIGN PROCESS</p>
              <h2 className="wd-process-main-title">How We Deliver Conversion-Ready Designs</h2>
              <p className="wd-process-main-desc">Our structured five-phase process eliminates guesswork, reduces revision cycles, and ensures every design decision traces back to a business objective. Here&apos;s exactly how a project unfolds from brief to launch.</p>
            </div>
            <hr className="wd-process-divider" />
          </div>
          <div className="wd-process-inner">
            <div className="wd-process-steps">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  className={`wd-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={step.title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="wd-pstep-left">
                    <div className="wd-pstep-circle">{i + 1}</div>
                    {i < PROCESS_STEPS.length - 1 && <div className="wd-pstep-arrow" />}
                  </div>
                  <div className="wd-pstep-content">
                    <h3 className="wd-pstep-title">{step.title}</h3>
                    <p className="wd-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="wd-process-image-col">
              <div className="wd-process-img-wrap">
                <div className="wd-process-img-placeholder">
                  <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                  <p>From discovery to Figma handoff — our structured process keeps every design decision aligned with your commercial goals.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="wd-testi-section">
          <div className="wd-testi-inner">
            <div className={`wd-section-header-center wd-section-reveal${visibleSections.has('testi') ? ' wd-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="wd-section-eyebrow">Client Reviews</span>
              <h2 className="wd-section-title">What Our Clients Say</h2>
              <p style={{ fontSize: '16px', color: '#4A6080', margin: 0 }}>Businesses across the US, Canada, and Australia trust 1Solutions to design experiences that drive results.</p>
            </div>
            <div className="wd-testi-grid" ref={testiGridRef}>
              {[
                {
                  initials: 'KL', bg: '#1a4a7a',
                  text: '"Our new landing page design from 1Solutions increased our lead conversion rate by 52% in the first 60 days. The wireframing process alone surfaced UX problems we\'d been blind to for years."',
                  name: 'Karen Liu', role: 'VP Marketing, SaaS platform — USA', featured: false,
                },
                {
                  initials: 'MJ', bg: '#0F3460',
                  text: '"Every screen they designed was thoughtful, on-brand, and tested against real user behaviour. The Figma files were so clean our dev team commented it was the best handoff they\'d ever received."',
                  name: 'Mark Jensen', role: 'Founder, eCommerce brand — Australia', featured: true,
                },
                {
                  initials: 'TP', bg: '#2d5a8e',
                  text: '"1Solutions redesigned our corporate website from the ground up. Time on site doubled, bounce rate dropped 38%, and we now regularly get compliments from prospects on how professional we look."',
                  name: 'Theresa Park', role: 'CEO, Consulting firm — Canada', featured: false,
                },
              ].map((t, i) => (
                <div className={`wd-tcard${t.featured ? ' featured' : ''}${visibleTestiCards.includes(i) ? ' wd-tcard-visible' : ''}`} key={t.name}>
                  <div className="wd-tcard-stars">★★★★★</div>
                  <p className="wd-tcard-text">{t.text}</p>
                  <div className="wd-tcard-author">
                    <div className="wd-tcard-avatar" style={{ background: t.bg }}>{t.initials}</div>
                    <div>
                      <div className="wd-tcard-name">{t.name}</div>
                      <div className="wd-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="wd-testi-stats">
              {[['4.9/5', 'Average Rating'], ['178+', 'Verified Reviews'], ['97%', 'Client Satisfaction'], ['40%', 'Avg Conversion Lift']].map(([num, label], i, arr) => (
                <div key={label} style={{ display: 'contents' }}>
                  <div className="wd-tstat">
                    <span className="wd-tstat-num">{num}</span>
                    <span className="wd-tstat-label">{label}</span>
                  </div>
                  {i < arr.length - 1 && <div className="wd-tstat-divider" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="wd-why-section">
          <div className="wd-why-inner">
            <div className={`wd-section-header-center wd-section-reveal${visibleSections.has('why') ? ' wd-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign: 'center', marginBottom: 0 }}>
              <span className="wd-section-eyebrow">Why 1Solutions</span>
              <h2 className="wd-section-title">Why Businesses Choose Us to Design Their Website</h2>
              <p style={{ fontSize: '16px', color: '#4A6080', margin: '0 auto', maxWidth: 680 }}>We combine creative excellence with commercial rigour — producing designs that look world-class and perform even better.</p>
            </div>
            <div className="wd-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`wd-why-card${visibleWhyCards.includes(i) ? ' wd-card-visible' : ''}`} key={w.title}>
                  <div className="wd-why-card-header">
                    <div className="wd-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="wd-contact-section" id="contact">
          <div className="wd-contact-container">
            <div>
              <h2 className="wd-contact-title">Let&apos;s Design Something That Converts</h2>
              <p className="wd-contact-desc">Tell us about your project and we&apos;ll come back within 24 hours with a tailored design brief and ballpark investment.</p>
              <div className="wd-merged-box">
                <div>
                  {[
                    { text: 'Your project details are kept strictly confidential under NDA.' },
                    { text: 'A senior designer reviews your brief — not an automated bot.' },
                    { text: 'Free discovery call to scope your project with no obligation.' },
                    { text: 'Fixed-price quotes with no hidden costs or scope surprises.' },
                  ].map((b, i) => (
                    <div className="wd-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="wd-benefit-icon-wrap">
                        <svg className="wd-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="wd-stats-box">
                  <div className="wd-stats-grid">
                    {[['500+', 'Websites Designed'], ['16+', 'Years Experience'], ['97%', 'Client Satisfaction']].map(([num, text]) => (
                      <div key={text}>
                        <div className="wd-stat-number">{num}</div>
                        <div className="wd-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="wd-form-box">
                <h3>Start Your Design Project</h3>
                <form className="wd-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="wd-form-row">
                    <div className="wd-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="wd-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="wd-form-row">
                    <div className="wd-form-group">
                      <label>Phone Number*</label>
                      <div className="wd-phone-input">
                        <select>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="wd-form-group"><label>Organisation*</label><input type="text" placeholder="Company / Organisation*" required /></div>
                  </div>
                  <div className="wd-form-group full"><label>Tell us about your project*</label><textarea placeholder="Describe your website design project, current challenges, and goals..." rows={6} required /></div>
                  <div className="wd-consent">
                    <input type="checkbox" id="wd-consent" required />
                    <label htmlFor="wd-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="wd-submit-btn">Request Free Design Consultation</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="wd-faq-section" id="faq">
          <div className="wd-faq-inner">
            <h2 className="wd-faq-heading">Frequently Asked Questions</h2>
            <div className="wd-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`wd-faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                  <button className="wd-faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <div className="wd-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="wd-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="wd-faq-answer-wrap">
                    <div className="wd-faq-answer"><span className="wd-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="wd-related-section">
          <div className="wd-related-inner">
            <span className="wd-related-eyebrow">RELATED DESIGN &amp; DEVELOPMENT SERVICES</span>
            <h2 className="wd-related-title">Explore Related Services</h2>
            <p className="wd-related-sub">Pair our website design expertise with complementary services to build, launch, and grow your digital presence end-to-end.</p>
            <hr className="wd-related-divider" />
            <div className="wd-related-tags">
              {[
                ['Mobile App Design', 'violet', '/mobile-app-design'],
                ['WordPress Development', 'blue', '/wordpress-development-company'],
                ['eCommerce Development', 'amber', '/ecommerce-website-development-services'],
                ['UI/UX Design Services', 'fuchsia', '/hire-ui-ux-designer'],
                ['Landing Page Optimisation', 'rose', '#contact'],
                ['SEO Services', 'green', '/seo-services-company'],
                ['Next.js Development', 'sky', '/nextjs-development-services'],
                ['Conversion Rate Optimisation', 'orange', '#contact'],
                ['WordPress Theme Development', 'teal', '/wordpress-development-company'],
                ['Digital Marketing Services', 'emerald', '/content-marketing-services'],
                ['Brand Identity Design', 'indigo', '#contact'],
                ['Hire a UI/UX Designer', 'cyan', '/hire-ui-ux-designer'],
              ].map(([label, color, href]) => (
                <Link href={href} className={`wd-rtag wd-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
