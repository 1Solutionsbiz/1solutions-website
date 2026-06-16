'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'iOS App UI Design', desc: 'Native iOS interfaces following Apple Human Interface Guidelines — SF Symbols, fluid transitions, and haptic-aware interactions that feel unmistakably at home on iPhone and iPad.' },
  { n: '02', title: 'Android App UI Design', desc: 'Material Design 3 compliant interfaces with adaptive layouts, dynamic colour, and motion specifications that meet Google Play quality standards from day one.' },
  { n: '03', title: 'Cross-Platform App Design', desc: 'Unified design systems that feel native on both iOS and Android — shared component libraries with platform-specific variants to ensure nothing feels like a port.' },
  { n: '04', title: 'App Onboarding Design', desc: 'First-run experiences that communicate value instantly, reduce drop-off during sign-up, and accelerate feature adoption so users reach their "aha moment" faster.' },
  { n: '05', title: 'App Redesign / Refresh', desc: 'Modernise legacy apps with current design patterns, improved accessibility, and better usability — without losing the familiarity your existing users depend on.' },
  { n: '06', title: 'Interactive Prototyping', desc: 'High-fidelity Figma prototypes with realistic micro-interactions for stakeholder sign-off, investor demos, and moderated user testing sessions.' },
  { n: '07', title: 'Design System Creation', desc: 'Scalable component libraries with tokens, variants, states, and documentation — so your design and engineering teams move faster and stay in sync at scale.' },
  { n: '08', title: 'App Store Creatives', desc: 'Screenshots, preview videos, and feature graphics engineered to maximise browse-to-install conversion rates on both the App Store and Google Play.' },
];

const FAQS = [
  {
    q: 'Do you design for both iOS and Android?',
    a: 'Yes — we design for both platforms as standard. We create platform-specific Figma files for iOS (following Apple Human Interface Guidelines with SF Symbols, iOS navigation patterns, and native interaction models) and Android (following Material Design 3 with adaptive colour, dynamic theming, and Google Play standards). If you need a unified cross-platform design, we build a shared design system with platform-specific variant components so the experience feels native on both operating systems.',
  },
  {
    q: 'What tools do you use for mobile app design?',
    a: 'Our primary tool is Figma for all UI design, component systems, and interactive prototyping. We use Principle or Figma Smart Animate for micro-interaction prototyping, and ProtoPie for complex conditional interactions and sensor-based demos. Motion specs are documented as Lottie files or CSS animation references. Final deliverables include fully organised Figma files with shared team access, a component library, design tokens, and developer-ready export annotations.',
  },
  {
    q: 'How do you ensure designs follow platform guidelines?',
    a: 'Our designers hold Apple HIG and Material Design 3 documentation as the baseline for every iOS and Android project. During design review we run a platform compliance checklist covering navigation patterns, minimum tap target sizes (44×44pt iOS / 48×48dp Android), gesture conventions, safe area handling, notch/Dynamic Island accommodation, and accessibility contrast ratios (WCAG AA minimum). We also test interactive Figma prototypes on real devices before handoff.',
  },
  {
    q: 'Can you design an app without a developer?',
    a: 'Yes — our design deliverables are self-contained. You receive fully annotated Figma files, a component library, design tokens, interactive prototypes, and a detailed design specification document. This package gives any development team — whether in-house, freelance, or an agency — everything needed to build accurately without interpretation gaps. If you need development as well, our sister team at 1Solutions offers full-stack iOS, Android, Flutter, and React Native development.',
  },
  {
    q: 'What does a mobile app design project cost?',
    a: 'Mobile app design pricing depends on scope. A focused MVP design (5–8 core screens with a component library) typically starts from $3,000–$6,000. A full-featured consumer or B2B app (20–40+ screens across iOS and Android) ranges from $8,000–$25,000. Complex enterprise apps with design systems, multiple user roles, and platform-specific variants start from $25,000+. We provide a fixed-price quote after a free scoping call — no hidden costs, no milestone surprises.',
  },
  {
    q: 'Do you offer usability testing?',
    a: 'Yes. We offer moderated and unmoderated usability testing as part of our design process. For moderated testing we facilitate live sessions with your target users using Figma or ProtoPie prototypes and provide a written findings report with prioritised recommendations. For unmoderated testing we set up studies using Maze or UserTesting.com and analyse task completion rates, error rates, and qualitative feedback. Testing can be added to any project phase — pre-design, mid-design, or post-launch audit.',
  },
];

const WHY = [
  {
    icon: <svg viewBox="0 0 24 24"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-5 20c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-4H7V4h10v13z"/></svg>,
    title: 'Platform Guideline Experts',
    desc: 'Deep fluency in Apple HIG and Material Design 3. Every component, spacing value, and interaction pattern is correct for its platform from the first draft.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>,
    title: 'Developer-Ready Figma Handoff',
    desc: 'Annotated Figma files with design tokens, component variants, and Dev Mode specs — so your engineers build accurately without back-and-forth.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>,
    title: 'Retention-Focused Design',
    desc: 'We design for Day 1, Day 7, and Day 30 retention — mapping the full user journey from onboarding to advanced feature discovery to long-term habit formation.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>,
    title: '16+ Years of Experience',
    desc: 'Since 2008 we have designed 200+ apps across fintech, health, retail, social, and enterprise — bringing cross-industry pattern recognition to every new project.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>,
    title: 'Accessibility Built In',
    desc: 'WCAG AA contrast ratios, minimum touch target compliance, Dynamic Type support, and VoiceOver/TalkBack-friendly layouts — not retrofitted, built in from day one.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>,
    title: 'Interactive Prototypes',
    desc: 'We deliver working Figma prototypes you can tap through on a real device — perfect for stakeholder buy-in, investor demos, and user testing before a single line of code is written.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
    title: 'Dedicated Mobile Design Team',
    desc: 'A dedicated mobile UI/UX designer, motion specialist, and a creative director on your project — with a single project manager keeping communication clear.',
  },
  {
    icon: <svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>,
    title: 'Post-Launch Design Support',
    desc: 'App design is never truly done. We offer ongoing design retainers to support new feature sprints, A/B test variants, and design system evolution as your product grows.',
  },
];

const PROCESS_STEPS = [
  {
    title: 'Research & Discovery',
    desc: 'We analyse your target users, competitive landscape, platform conventions, and business goals. This phase produces user personas, a competitive audit, and a design brief that grounds every subsequent decision in real evidence.',
  },
  {
    title: 'Information Architecture',
    desc: 'We map out the full app structure — navigation hierarchy, user flows, and screen inventory — before any visual design begins. A clear IA prevents costly structural rework later in the project.',
  },
  {
    title: 'Wireframes',
    desc: 'Low-fidelity wireframes define layout, content priority, and interaction logic on each screen. Platform-specific navigation patterns (tab bar, bottom sheet, drawer) are resolved at this stage — not during visual design.',
  },
  {
    title: 'Visual Design',
    desc: 'We apply your brand identity to the approved wireframes — colour system, typography scale, iconography, imagery, and motion specifications. High-fidelity mockups are delivered at correct points (1x, 2x, 3x) for both platforms.',
  },
  {
    title: 'Prototype & Test',
    desc: 'Interactive Figma or ProtoPie prototypes are built for user testing. We validate key flows — onboarding, core task, conversion — with real users and feed findings back into the designs before finalising.',
  },
  {
    title: 'Handoff',
    desc: 'Final Figma files are delivered with a component library, design tokens (colour, type, spacing, radius), motion specs, asset exports, and Dev Mode annotations. We support your engineering team throughout the build phase.',
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
  const suffix = String(val).replace(/[\d,.★]/g, '');
  const display = started ? num + suffix : val;
  return (
    <div className="mad-stat-col">
      <div className="mad-stat-label">{label}</div>
      <div className="mad-stat-value">{val.includes('★') ? val : display}</div>
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
        { '@type': 'ListItem', position: 2, name: 'Mobile App Design', item: 'https://www.1solutions.biz/mobile-app-design' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Mobile App Design Services',
      provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
      description: 'iOS and Android mobile app UI/UX design by 1Solutions. Platform-native interfaces, interactive prototypes, design systems, and developer-ready Figma handoff.',
      serviceType: 'Mobile App Design',
      areaServed: ['IN', 'US', 'CA', 'GB', 'AU'],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '134', bestRating: '5' },
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

export default function MobileAppDesign() {
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
        <title>Mobile App Design Company | iOS &amp; Android UI/UX Design | 1Solutions</title>
        <meta name="description" content="1Solutions is a mobile app design company with 16+ years experience. We design intuitive iOS and Android UI/UX — from concept to pixel-perfect Figma handoff. 200+ apps delivered, 4.8 avg App Store rating." />
        <meta name="keywords" content="mobile app design company, iOS app design, Android app design, UI UX design, app design services, Figma app design, mobile UI design" />
        <link rel="canonical" href="https://www.1solutions.biz/mobile-app-design" />
        <meta property="og:title" content="Mobile App Design Company | iOS &amp; Android UI/UX Design | 1Solutions" />
        <meta property="og:description" content="Intuitive, beautiful iOS and Android app designs rooted in platform guidelines and user psychology. From concept to pixel-perfect Figma handoff." />
        <meta property="og:url" content="https://www.1solutions.biz/mobile-app-design" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .mad-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #e0e7ff 0%, #ede9fe 25%, #dbeafe 50%, #fef3c7 75%, #fce7f3 100%);
            background-attachment: scroll;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
          }
          .mad-page *, .mad-page *::before, .mad-page *::after { box-sizing: border-box; }

          /* Orbs */
          .mad-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,0.28) 0%,rgba(99,102,241,0.12) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .mad-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.26) 0%,rgba(245,158,11,0.12) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .mad-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.16) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* Hero */
          .mad-hero-block { background:transparent;position:relative;overflow:hidden; }
          .mad-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .mad-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.16) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .mad-hero-content { position:relative;z-index:2;text-align:center;max-width:880px;margin:0 auto;padding:60px 40px 40px; }
          .mad-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .mad-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#7C3AED 60%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .mad-hero-content p { font-size:16px;color:#3A507A;line-height:1.65;max-width:640px;margin:0 auto 28px; }
          .mad-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1);position:relative;overflow:hidden; }
          .mad-btn-hero::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:mad-shimmer 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes mad-shimmer { 0%{left:-120%} 35%,100%{left:160%} }
          .mad-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(124,58,237,0.5);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(124,58,237,0.18),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }

          /* Hero platform badges */
          .mad-platform-badges { display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:28px; }
          .mad-badge { display:inline-flex;align-items:center;gap:6px;padding:6px 16px;background:rgba(255,255,255,0.50);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.80);border-radius:40px;font-size:12px;font-weight:600;color:#0F3460; }

          /* Stats bar */
          .mad-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .mad-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .mad-stat-col:last-child { border-right:none; }
          .mad-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .mad-stat-value { font-size:26px;font-weight:900;color:#7C3AED;letter-spacing:-0.5px;line-height:1; }

          /* Clients strip */
          .mad-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .mad-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .mad-clients-logos { width:100%;overflow:hidden; }
          .mad-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:mad-marquee 30s linear infinite; }
          .mad-logos-track:hover { animation-play-state:paused; }
          @keyframes mad-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .mad-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .mad-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Shared section styles */
          .mad-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7C3AED;margin-bottom:12px;display:block; }
          .mad-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#7C3AED 55%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .mad-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }

          /* Section reveal animation */
          .mad-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .mad-section-reveal.mad-revealed { opacity:1;transform:translateY(0); }

          /* Services */
          .mad-services-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.18),0 -4px 16px rgba(15,52,96,0.10); }
          .mad-services-inner { max-width:1280px;margin:0 auto; }
          .mad-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .mad-service-card { background:linear-gradient(135deg,rgba(224,231,255,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .mad-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#7C3AED,#a855f7);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .mad-service-card:hover::before { transform:scaleY(1); }
          .mad-service-card:hover { transform:translateY(-6px);border-color:rgba(124,58,237,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .mad-service-card:hover h3 { color:#7C3AED; }
          .mad-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .mad-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .mad-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }

          /* Platform cards */
          .mad-platforms-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .mad-platforms-inner { max-width:1280px;margin:0 auto; }
          .mad-platform-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:40px; }
          .mad-platform-card { background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.88);border-radius:24px;padding:40px 36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1);transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .mad-platform-card:hover { transform:translateY(-6px);box-shadow:0 20px 60px rgba(15,52,96,0.16),inset 0 1px 0 rgba(255,255,255,1); }
          .mad-platform-card.ios { border-color:rgba(99,102,241,0.20); }
          .mad-platform-card.ios:hover { border-color:rgba(99,102,241,0.50); }
          .mad-platform-card.android { border-color:rgba(16,185,129,0.20); }
          .mad-platform-card.android:hover { border-color:rgba(16,185,129,0.50); }
          .mad-platform-icon { font-size:40px;margin-bottom:16px;display:block; }
          .mad-platform-card h3 { font-size:22px;font-weight:800;color:#0F3460;margin:0 0 12px; }
          .mad-platform-card p { font-size:14px;color:#4A6080;line-height:1.75;margin:0 0 20px; }
          .mad-platform-specs { display:flex;flex-direction:column;gap:8px; }
          .mad-spec-item { display:flex;align-items:center;gap:10px;font-size:13px;color:#2A3F6F;font-weight:500; }
          .mad-spec-check { width:18px;height:18px;border-radius:50%;background:rgba(124,58,237,0.12);color:#7C3AED;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0; }
          .mad-platform-card.android .mad-spec-check { background:rgba(16,185,129,0.12);color:#059669; }

          /* Process */
          .mad-process-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .mad-process-top { max-width:1280px;margin:0 auto 56px; }
          .mad-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#7C3AED;margin:0 0 14px; }
          .mad-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#7C3AED 55%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .mad-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .mad-process-divider { border:none;border-top:1px solid rgba(15,52,96,0.15);margin:36px 0 0;width:100%; }
          .mad-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .mad-process-steps { display:flex;flex-direction:column; }
          .mad-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .mad-pstep.visible { opacity:1;transform:translateY(0); }
          .mad-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .mad-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(124,58,237,0.22);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#7C3AED;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .mad-pstep:hover .mad-pstep-circle { background:rgba(124,58,237,0.15);border-color:#7C3AED; }
          .mad-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .mad-pstep-arrow::before { content:'';width:2px;flex:1;background:#7C3AED;opacity:0.25; }
          .mad-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #7C3AED;opacity:0.45;margin-top:-1px; }
          .mad-pstep:last-child .mad-pstep-arrow { display:none; }
          .mad-pstep-content { padding:4px 0 44px; }
          .mad-pstep:last-child .mad-pstep-content { padding-bottom:0; }
          .mad-pstep-title { font-size:22px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .mad-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .mad-process-image-col { position:sticky;top:100px;min-width:0; }
          .mad-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(15,52,96,0.15);aspect-ratio:4/5;background:linear-gradient(135deg,#e0e7ff 0%,#ede9fe 100%);display:flex;align-items:center;justify-content:center; }
          .mad-process-img-placeholder { text-align:center;color:#4A6080;padding:40px; }
          .mad-process-img-placeholder svg { width:80px;height:80px;fill:#7C3AED;opacity:0.5;margin-bottom:16px; }
          .mad-process-img-placeholder p { font-size:14px;line-height:1.6;margin:0; }

          /* Testimonials */
          .mad-testi-section { background:transparent;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .mad-testi-inner { max-width:1280px;margin:0 auto; }
          .mad-section-header-center { text-align:center;margin-bottom:52px; }
          .mad-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .mad-tcard { background:linear-gradient(135deg,rgba(224,231,255,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .mad-tcard.mad-tcard-visible { opacity:1;transform:translateY(0); }
          .mad-tcard:hover { transform:translateY(-6px);border-color:rgba(124,58,237,0.35);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .mad-tcard.featured { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.85) 55%,rgba(224,231,255,0.45) 100%);border-color:rgba(124,58,237,0.22);box-shadow:0 6px 32px rgba(124,58,237,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .mad-tcard-stars { font-size:18px;color:#7C3AED;letter-spacing:2px; }
          .mad-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .mad-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .mad-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .mad-tcard-name { font-size:14px;font-weight:700;color:#0F3460; }
          .mad-tcard-role { font-size:12px;color:#6b7280; }
          .mad-testi-stats { display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(224,231,255,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .mad-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .mad-tstat-num { font-size:28px;font-weight:800;color:#0F3460; }
          .mad-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .mad-tstat-divider { width:1px;height:40px;background:rgba(15,52,96,0.15); }

          /* Why Us */
          .mad-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .mad-why-inner { max-width:1280px;margin:0 auto; }
          .mad-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .mad-why-card { background:linear-gradient(135deg,rgba(224,231,255,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.25s,box-shadow 0.25s; }
          .mad-why-card.mad-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .mad-why-card:hover { transform:translateY(-6px) scale(1);border-color:rgba(124,58,237,0.35);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .mad-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .mad-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .mad-why-icon svg { width:28px;height:28px;fill:#7C3AED; }
          .mad-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .mad-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* FAQ */
          .mad-faq-section { padding:80px 40px;background:transparent;border-top:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .mad-faq-inner { max-width:1280px;margin:0 auto; }
          .mad-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#7C3AED 55%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .mad-faq-list { display:flex;flex-direction:column;gap:12px; }
          .mad-faq-item { background:linear-gradient(135deg,rgba(224,231,255,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .mad-faq-item.open { border-color:rgba(124,58,237,0.38);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .mad-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#7C3AED;border-radius:3px 0 0 3px; }
          .mad-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .mad-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .mad-faq-item.open .mad-faq-q-badge { background:#7C3AED;color:#fff; }
          .mad-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .mad-faq-item.open .mad-faq-question span { color:#7C3AED; }
          .mad-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .mad-faq-item.open .mad-faq-chevron { transform:rotate(180deg);color:#7C3AED; }
          .mad-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .mad-faq-item.open .mad-faq-answer-wrap { max-height:500px; }
          .mad-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .mad-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#0F3460;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Contact */
          .mad-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(237,233,254,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(224,231,255,0.65) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .mad-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .mad-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#7C3AED 55%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .mad-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .mad-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .mad-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .mad-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .mad-benefit-icon { width:20px;height:20px;color:#7C3AED;stroke:#7C3AED;stroke-width:1.75; }
          .mad-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .mad-stats-box { padding-top:32px;border-top:1px solid rgba(15,52,96,0.12); }
          .mad-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .mad-stat-number { font-size:40px;font-weight:900;color:#0F3460;line-height:1;display:inline-block;margin-bottom:4px; }
          .mad-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .mad-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.28) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .mad-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .mad-contact-form { display:flex;flex-direction:column;gap:16px; }
          .mad-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .mad-form-group { display:flex;flex-direction:column;gap:6px; }
          .mad-form-group.full { grid-column:1/-1; }
          .mad-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .mad-form-group input,.mad-form-group textarea,.mad-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .mad-form-group input:focus,.mad-form-group textarea:focus { outline:none;border-color:#7C3AED;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(124,58,237,0.12); }
          .mad-phone-input { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .mad-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .mad-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .mad-phone-input input:focus { outline:none; }
          .mad-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .mad-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .mad-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .mad-consent a { color:#0F3460;text-decoration:none; }
          .mad-submit-btn { padding:14px 28px;background:rgba(124,58,237,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(124,58,237,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .mad-submit-btn:hover { background:rgba(109,40,217,0.95);border-color:rgba(245,158,11,0.5);transform:translateY(-2px); }

          /* Related services */
          .mad-related-section { background:rgba(237,233,254,0.22);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .mad-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .mad-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .mad-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#7C3AED 55%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .mad-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .mad-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0; }
          .mad-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .mad-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .mad-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .mad-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .mad-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .mad-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .mad-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .mad-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .mad-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .mad-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .mad-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .mad-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }
          .mad-rtag-fuchsia { background:rgba(217,70,239,0.10);border-color:rgba(217,70,239,0.28);color:#86198F; }
          .mad-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }
          .mad-rtag-cyan    { background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490; }

          /* Responsive */
          @media (max-width:1024px) {
            .mad-hero-content h1 { font-size:40px; }
            .mad-services-grid { grid-template-columns:repeat(2,1fr); }
            .mad-why-grid { grid-template-columns:repeat(2,1fr); }
            .mad-platform-grid { grid-template-columns:1fr; }
            .mad-process-inner { grid-template-columns:1fr; }
            .mad-process-image-col { display:none; }
            .mad-contact-container { grid-template-columns:1fr; }
          }
          @media (max-width:768px) {
            .mad-page { overflow-x:hidden; }
            .mad-hero-content { padding:36px 20px 24px; }
            .mad-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .mad-hero-content p { font-size:15px; }
            .mad-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .mad-stat-col { padding:14px 12px; }
            .mad-stat-col:nth-child(2) { border-right:none; }
            .mad-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .mad-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .mad-stat-value { font-size:22px; }
            .mad-clients-bar { padding:16px 20px 36px;gap:12px; }
            .mad-services-section { padding:48px 20px 40px; }
            .mad-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .mad-platforms-section { padding:48px 20px; }
            .mad-platform-card { padding:28px 24px; }
            .mad-process-section { padding:60px 20px; }
            .mad-process-top { margin-bottom:36px; }
            .mad-testi-section { padding:60px 20px; }
            .mad-testi-section .mad-section-header-center { text-align:left; }
            .mad-testi-grid { grid-template-columns:1fr; }
            .mad-testi-stats { flex-wrap:wrap;padding:24px 20px; }
            .mad-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(15,52,96,0.10); }
            .mad-tstat:nth-child(odd) { border-right:1px solid rgba(15,52,96,0.10); }
            .mad-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .mad-tstat-divider { display:none; }
            .mad-why-section { padding:60px 20px; }
            .mad-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .mad-why-card { padding:24px 20px; }
            .mad-faq-section { padding:60px 20px; }
            .mad-faq-heading { font-size:26px; }
            .mad-faq-question { padding:18px 18px 18px 52px; }
            .mad-faq-question span { font-size:14px; }
            .mad-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .mad-faq-q-badge { left:14px; }
            .mad-contact-section { padding:48px 16px; }
            .mad-contact-title { font-size:28px; }
            .mad-form-row { grid-template-columns:1fr; }
            .mad-related-section { padding:60px 20px; }
            .mad-related-tags { gap:8px; }
            .mad-rtag { padding:9px 16px;font-size:13px; }
            .mad-section-title,.mad-process-main-title,.mad-related-title { font-size:30px; }
          }
          @media (max-width:480px) {
            .mad-hero-content h1 { font-size:24px; }
            .mad-section-title,.mad-process-main-title,.mad-related-title { font-size:26px; }
            .mad-services-grid { grid-template-columns:1fr; }
            .mad-service-card { padding:20px 18px 18px; }
            .mad-card-num { font-size:52px; }
            .mad-pstep-title { font-size:18px; }
            .mad-contact-title { font-size:24px; }
            .mad-merged-box { padding:18px; }
            .mad-tcard { padding:24px 20px; }
            .mad-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .mad-faq-heading { font-size:22px; }
          }
        `}</style>
      </Head>

      <div className="mad-page">
        {/* Orbs */}
        <div className="mad-orb-1" />
        <div className="mad-orb-2" />
        <div className="mad-orb-3" />

        {/* ── HERO ── */}
        <div className="mad-hero-block">
          <div className="mad-hero-content">
            <span className="mad-eyebrow">Mobile App Design Company — iOS &amp; Android</span>
            <h1>Mobile App Design That Delights Users and Drives Retention</h1>
            <p>Intuitive, beautiful iOS and Android app designs rooted in platform guidelines and user psychology. From concept to pixel-perfect Figma handoff.</p>
            <div className="mad-platform-badges">
              <span className="mad-badge">Apple HIG Certified</span>
              <span className="mad-badge">Material Design 3</span>
              <span className="mad-badge">Figma Handoff</span>
              <span className="mad-badge">WCAG AA Accessible</span>
            </div>
            <Link href="#contact" className="mad-btn-hero">Get a Free App Design Consultation</Link>
          </div>

          <div className="mad-hero-stats" ref={statsRef}>
            {[
              ['Apps Designed', '200+'],
              ['Avg App Store Rating', '4.8★'],
              ['Years Experience', '16+'],
              ['Higher Retention', '35%'],
            ].map(([label, val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="mad-clients-bar">
            <span className="mad-clients-label">Trusted by Leading Brands</span>
            <div className="mad-clients-logos">
              <div className="mad-logos-track">
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
                  <img key={alt} src={src} alt={alt.replace(/\d+$/, '')} className="mad-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="mad-services-section">
          <div className="mad-services-inner">
            <div className={`mad-section-reveal${visibleSections.has('services') ? ' mad-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="mad-section-eyebrow">Our Services</span>
              <h2 className="mad-section-title">Mobile App Design Services We Offer</h2>
              <p className="mad-section-desc">From onboarding flows to full design systems — every deliverable is built for the platform it lives on, the users who interact with it, and the business outcomes that matter.</p>
            </div>
            <div className="mad-services-grid">
              {SERVICES.map(s => (
                <div key={s.n} className="mad-service-card">
                  <span className="mad-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLATFORM CARDS ── */}
        <section className="mad-platforms-section">
          <div className="mad-platforms-inner">
            <div className={`mad-section-reveal${visibleSections.has('platforms') ? ' mad-revealed' : ''}`} ref={el => { sectionRefs.current['platforms'] = el; }}>
              <span className="mad-section-eyebrow">Platform Expertise</span>
              <h2 className="mad-section-title">Native Design for Every Platform</h2>
              <p className="mad-section-desc">We don&apos;t apply a one-size-fits-all template. Each platform has its own language, conventions, and user expectations — and we design to those standards.</p>
            </div>
            <div className="mad-platform-grid">
              <div className="mad-platform-card ios">
                <span className="mad-platform-icon"> </span>
                <h3>iOS App Design</h3>
                <p>We follow Apple Human Interface Guidelines to produce interfaces that feel unmistakably native — correct navigation models (tab bar, navigation stack, sheet), SF Symbols iconography, Dynamic Type support, and fluid spring animations that match iOS motion physics.</p>
                <div className="mad-platform-specs">
                  {['Apple Human Interface Guidelines', 'SF Symbols & SF Pro typeface', 'Dynamic Island & notch accommodation', 'iPadOS adaptive layouts', 'SwiftUI animation documentation', 'WCAG AA accessibility compliance'].map(s => (
                    <div className="mad-spec-item" key={s}>
                      <div className="mad-spec-check">✓</div>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mad-platform-card android">
                <span className="mad-platform-icon"> </span>
                <h3>Android App Design</h3>
                <p>We design to Material Design 3 specifications — dynamic colour theming with tonal palettes, adaptive layouts for phones, tablets, and foldables, bottom navigation, gesture navigation support, and motion specs that align with the Android animation system.</p>
                <div className="mad-platform-specs">
                  {['Material Design 3 compliance', 'Dynamic Color & tonal palette', 'Adaptive layouts for foldables & tablets', 'Gesture navigation support', 'Jetpack Compose component mapping', 'TalkBack accessibility support'].map(s => (
                    <div className="mad-spec-item" key={s}>
                      <div className="mad-spec-check">✓</div>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="mad-process-section">
          <div className="mad-process-top">
            <div className={`mad-section-reveal${visibleSections.has('process') ? ' mad-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="mad-process-eyebrow">OUR DESIGN PROCESS</p>
              <h2 className="mad-process-main-title">How We Design Mobile Apps That Users Love</h2>
              <p className="mad-process-main-desc">Our six-phase process moves from research to a production-ready Figma handoff — with user validation at the midpoint to catch assumptions before they become expensive code. Every phase has defined outputs so you always know exactly where your project stands.</p>
            </div>
            <hr className="mad-process-divider" />
          </div>
          <div className="mad-process-inner">
            <div className="mad-process-steps">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  className={`mad-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={step.title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="mad-pstep-left">
                    <div className="mad-pstep-circle">{i + 1}</div>
                    {i < PROCESS_STEPS.length - 1 && <div className="mad-pstep-arrow" />}
                  </div>
                  <div className="mad-pstep-content">
                    <h3 className="mad-pstep-title">{step.title}</h3>
                    <p className="mad-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mad-process-image-col">
              <div className="mad-process-img-wrap">
                <div className="mad-process-img-placeholder">
                  <svg viewBox="0 0 24 24"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-5 20c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-4H7V4h10v13z"/></svg>
                  <p>Research to pixel-perfect handoff — six structured phases that eliminate guesswork and validate with real users before a single line of code is written.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="mad-testi-section">
          <div className="mad-testi-inner">
            <div className={`mad-section-header-center mad-section-reveal${visibleSections.has('testi') ? ' mad-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="mad-section-eyebrow">Client Reviews</span>
              <h2 className="mad-section-title">What Our Clients Say</h2>
              <p style={{ fontSize: '16px', color: '#4A6080', margin: 0 }}>App founders, product teams, and enterprise clients across the US, Canada, and Australia trust us to design their mobile experiences.</p>
            </div>
            <div className="mad-testi-grid" ref={testiGridRef}>
              {[
                {
                  initials: 'RN', bg: '#3730a3',
                  text: '"The 1Solutions team redesigned our fintech app from scratch. Our Day 30 retention jumped 41% and the App Store rating went from 3.8 to 4.7 within two months of the new design going live."',
                  name: 'Rahul Nair', role: 'CEO, FinPay App — USA', featured: false,
                },
                {
                  initials: 'SW', bg: '#5b21b6',
                  text: '"Exceptional mobile design work. They understood Material Design 3 deeply, delivered both iOS and Android files that our dev team could build from without any back-and-forth, and hit every deadline."',
                  name: 'Sophie Williams', role: 'Product Director, RetailTech — Australia', featured: true,
                },
                {
                  initials: 'AM', bg: '#4338ca',
                  text: '"We had a complex B2B app with 5 user roles. 1Solutions designed a navigation architecture that made sense of all the complexity. Our enterprise clients now describe the app as \'the most intuitive tool they use\'."',
                  name: 'Alex Moreau', role: 'CTO, SaaS platform — Canada', featured: false,
                },
              ].map((t, i) => (
                <div className={`mad-tcard${t.featured ? ' featured' : ''}${visibleTestiCards.includes(i) ? ' mad-tcard-visible' : ''}`} key={t.name}>
                  <div className="mad-tcard-stars">★★★★★</div>
                  <p className="mad-tcard-text">{t.text}</p>
                  <div className="mad-tcard-author">
                    <div className="mad-tcard-avatar" style={{ background: t.bg }}>{t.initials}</div>
                    <div>
                      <div className="mad-tcard-name">{t.name}</div>
                      <div className="mad-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mad-testi-stats">
              {[['4.9/5', 'Our Design Rating'], ['200+', 'Apps Designed'], ['4.8★', 'Avg App Store Rating'], ['35%', 'Higher Retention']].map(([num, label], i, arr) => (
                <div key={label} style={{ display: 'contents' }}>
                  <div className="mad-tstat">
                    <span className="mad-tstat-num">{num}</span>
                    <span className="mad-tstat-label">{label}</span>
                  </div>
                  {i < arr.length - 1 && <div className="mad-tstat-divider" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="mad-why-section">
          <div className="mad-why-inner">
            <div className={`mad-section-header-center mad-section-reveal${visibleSections.has('why') ? ' mad-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign: 'center', marginBottom: 0 }}>
              <span className="mad-section-eyebrow">Why 1Solutions</span>
              <h2 className="mad-section-title">Why App Teams Choose Us to Design Their Mobile Experience</h2>
              <p style={{ fontSize: '16px', color: '#4A6080', margin: '0 auto', maxWidth: 680 }}>Platform expertise, production-quality deliverables, and a design process that validates with real users — not just internal assumptions.</p>
            </div>
            <div className="mad-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`mad-why-card${visibleWhyCards.includes(i) ? ' mad-card-visible' : ''}`} key={w.title}>
                  <div className="mad-why-card-header">
                    <div className="mad-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="mad-contact-section" id="contact">
          <div className="mad-contact-container">
            <div>
              <h2 className="mad-contact-title">Let&apos;s Design Your App Together</h2>
              <p className="mad-contact-desc">Tell us about your app and we&apos;ll respond within 24 hours with a project brief, scoping questions, and a ballpark investment — no commitment required.</p>
              <div className="mad-merged-box">
                <div>
                  {[
                    { text: 'All project details kept confidential under NDA before we talk.' },
                    { text: 'A senior mobile designer reviews your brief personally.' },
                    { text: 'Free scoping call — we ask the right questions before quoting.' },
                    { text: 'Fixed-price quotes with phased milestone payments available.' },
                  ].map((b, i) => (
                    <div className="mad-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="mad-benefit-icon-wrap">
                        <svg className="mad-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mad-stats-box">
                  <div className="mad-stats-grid">
                    {[['200+', 'Apps Designed'], ['16+', 'Years Experience'], ['4.8★', 'App Store Rating']].map(([num, text]) => (
                      <div key={text}>
                        <div className="mad-stat-number">{num}</div>
                        <div className="mad-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="mad-form-box">
                <h3>Start Your App Design Project</h3>
                <form className="mad-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="mad-form-row">
                    <div className="mad-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="mad-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="mad-form-row">
                    <div className="mad-form-group">
                      <label>Phone Number*</label>
                      <div className="mad-phone-input">
                        <select>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="mad-form-group">
                      <label>Platform*</label>
                      <select required>
                        <option value="">Select platform...</option>
                        <option value="ios">iOS only</option>
                        <option value="android">Android only</option>
                        <option value="both">Both iOS &amp; Android</option>
                        <option value="unsure">Not sure yet</option>
                      </select>
                    </div>
                  </div>
                  <div className="mad-form-group full"><label>Organisation*</label><input type="text" placeholder="Company / Organisation*" required /></div>
                  <div className="mad-form-group full"><label>Tell us about your app*</label><textarea placeholder="Describe your mobile app concept, current challenges, target audience, and goals..." rows={5} required /></div>
                  <div className="mad-consent">
                    <input type="checkbox" id="mad-consent" required />
                    <label htmlFor="mad-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="mad-submit-btn">Request Free App Design Consultation</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mad-faq-section" id="faq">
          <div className="mad-faq-inner">
            <h2 className="mad-faq-heading">Frequently Asked Questions</h2>
            <div className="mad-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`mad-faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                  <button className="mad-faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <div className="mad-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="mad-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="mad-faq-answer-wrap">
                    <div className="mad-faq-answer"><span className="mad-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="mad-related-section">
          <div className="mad-related-inner">
            <span className="mad-related-eyebrow">RELATED DESIGN &amp; DEVELOPMENT SERVICES</span>
            <h2 className="mad-related-title">Explore Related Services</h2>
            <p className="mad-related-sub">Pair our mobile app design expertise with development, marketing, and strategy services to take your app from concept to launch and growth.</p>
            <hr className="mad-related-divider" />
            <div className="mad-related-tags">
              {[
                ['Website Design', 'violet', '/website-design'],
                ['iOS App Development', 'indigo', '/ios-app-development-company'],
                ['Android App Development', 'green', '/android-application-development-company'],
                ['Flutter App Development', 'sky', '/flutter-app-development-services'],
                ['React Native Development', 'blue', '/hire-react-native-developer'],
                ['UI/UX Design Services', 'fuchsia', '/hire-ui-ux-designer'],
                ['App Store Optimisation', 'amber', '#contact'],
                ['Design System Creation', 'teal', '#contact'],
                ['Cross-Platform App Design', 'orange', '#contact'],
                ['Social Media App Development', 'rose', '/social-media-app-development-company'],
                ['Hire a Flutter Developer', 'emerald', '/hire-flutter-developer'],
                ['Hire iOS Developer', 'cyan', '/hire-ios-developer'],
              ].map(([label, color, href]) => (
                <Link href={href} className={`mad-rtag mad-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
