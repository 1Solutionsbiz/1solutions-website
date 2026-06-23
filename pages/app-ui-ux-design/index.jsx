import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'User Research & Persona Development', desc: 'We interview real users, analyse behavioural data, and build evidence-based personas — so design decisions are grounded in how your users actually think and behave.' },
  { n: '02', title: 'UX Strategy & Information Architecture', desc: 'App structure, navigation systems, feature hierarchy, and user flow maps — establishing the skeleton of the experience before any visual design begins.' },
  { n: '03', title: 'Wireframing & User Flow Mapping', desc: 'Low-fidelity wireframes and clickable user flows that prove the experience works before committing to high-fidelity design — cheap to change, expensive to skip.' },
  { n: '04', title: 'High-Fidelity UI Design', desc: 'Pixel-perfect screen designs for iOS and Android — following platform conventions (HIG, Material Design) while expressing your brand identity through every pixel.' },
  { n: '05', title: 'Interactive Prototyping', desc: 'Realistic clickable prototypes in Figma that stakeholders can navigate, investors can demo, and developers can reference — before a single line of code is written.' },
  { n: '06', title: 'Design System & Component Library', desc: 'A documented, reusable component library that ensures visual consistency across every screen, speeds up development, and scales with your product over time.' },
  { n: '07', title: 'Usability Testing & Iteration', desc: 'Moderated and unmoderated usability sessions with real users — identifying friction, confusion, and drop-off points before launch when fixes are still cheap.' },
  { n: '08', title: 'Developer Handoff & Design QA', desc: 'Structured Figma handoff with annotations, spacing specs, and asset exports — plus design QA during development to ensure the built app matches the designs.' },
];

const TOOLS = [
  'Figma', 'FigJam', 'Principle', 'ProtoPie', 'Maze',
  'UserTesting', 'Hotjar', 'iOS Human Interface Guidelines',
  'Material Design 3', 'Accessibility (WCAG 2.1)',
];

const PROCESS = [
  { step: '01', title: 'Discovery & User Research', desc: 'Stakeholder workshops, competitive analysis, and user interviews to understand your audience, their goals, and the jobs your app needs to do for them.' },
  { step: '02', title: 'Information Architecture & Flows', desc: 'We map app structure, navigation patterns, and core user journeys — validated in low-fidelity before any visual design investment is made.' },
  { step: '03', title: 'Wireframes & Concept Testing', desc: 'Grey-box wireframes for every screen, clickable in Figma, tested with real users to validate assumptions and surface UX issues early.' },
  { step: '04', title: 'High-Fidelity Design & Prototype', desc: 'Full-colour, pixel-perfect screen designs and an interactive prototype — reviewed against your brand guidelines, accessibility standards, and platform conventions.' },
  { step: '05', title: 'Handoff, QA & Iteration', desc: 'Structured developer handoff with all specs and assets, followed by design QA during development sprints to ensure the build matches the intent.' },
];

const WHY = [
  { title: 'Design Rooted in Research', desc: 'We don\'t design by gut. Every major design decision is supported by user research, data, or validated assumption — reducing the risk of building beautiful features nobody uses.' },
  { title: 'iOS & Android Native Expertise', desc: 'We design natively for each platform — following Apple\'s Human Interface Guidelines for iOS and Material Design for Android — so apps feel right, not just look right.' },
  { title: 'Accessibility as Standard', desc: 'WCAG 2.1 AA compliance is built into every design. Proper contrast ratios, touch target sizes, readable typography, and screen reader annotations — included, not optional.' },
  { title: 'Design-to-Development Alignment', desc: 'Our design team works closely with our React Native and mobile developers — producing handoff files that translate cleanly to code, not designs that look good in Figma but break in builds.' },
  { title: 'Measurable Outcomes', desc: 'We tie design to metrics: task completion rate, time-on-task, session length, and conversion rate. Good UX is measurable — and we help you measure it.' },
  { title: 'Long-Term Design Partnership', desc: 'Most of our design clients work with us across multiple feature releases, not just the initial build. We become an embedded design partner who knows your product deeply.' },
];

const FAQS = [
  {
    q: 'What is app UI/UX design and why does it matter?',
    a: 'App UI/UX design is the discipline of designing how a mobile application looks (UI — User Interface) and how it works from the user\'s perspective (UX — User Experience). Good UI creates visual clarity and brand expression. Good UX ensures the app is intuitive, efficient, and enjoyable to use. Together, they directly impact your app\'s retention rate, conversion rate, App Store rating, and user satisfaction. Poor UX is the #1 reason users abandon apps — typically within the first three sessions. Investing in UX design before development prevents expensive rework after launch.',
  },
  {
    q: 'What is the difference between UI design and UX design?',
    a: 'UX design focuses on the structure, flow, and usability of an app — how users navigate, what information appears where, and how efficiently they can complete tasks. UX deliverables include user research, wireframes, user flows, and usability testing. UI design focuses on the visual execution — typography, colour, spacing, iconography, animation, and the overall aesthetic. Both are equally important: beautiful UI on a poorly structured UX leads to frustrated users; well-structured UX with poor UI leads to users who don\'t trust the app. The best results come from teams where both disciplines inform each other.',
  },
  {
    q: 'How much does app UI/UX design cost?',
    a: 'App design costs depend on the scope and complexity. A focused UX/UI design engagement for a simple app (10–20 screens) typically starts from $8,000–$15,000. A mid-complexity app with custom interactions, design system creation, and usability testing rounds ranges from $15,000–$35,000. Full-scale design for a complex product with research, multiple user roles, and iterative testing can exceed $50,000. We provide a scoped quote after understanding your app\'s requirements — and design can be phased to match budget and timeline.',
  },
  {
    q: 'Do you design for both iOS and Android?',
    a: 'Yes — we design for both platforms, following the respective platform conventions: Apple\'s Human Interface Guidelines (HIG) for iOS and Google\'s Material Design 3 for Android. While many apps share a common design language, we adapt navigation patterns, iconography, typography, and interaction behaviours to feel native on each platform. If you\'re building a cross-platform app in React Native or Flutter, we can design a unified system that respects both platforms\' conventions while maintaining visual consistency.',
  },
  {
    q: 'What tools do you use for app UI/UX design?',
    a: 'Figma is our primary design tool for all UI/UX work — wireframes, high-fidelity designs, prototypes, component libraries, and developer handoff. We use FigJam for collaborative workshops and user flow mapping. For advanced interactions and motion design, we use Principle or ProtoPie. For usability testing, we use Maze (unmoderated) and UserTesting (moderated). For post-launch analytics, we can integrate with Hotjar, Mixpanel, or Amplitude to inform ongoing design iteration based on real user behaviour.',
  },
  {
    q: 'What is a design system and do I need one?',
    a: 'A design system is a library of reusable UI components — buttons, inputs, cards, navigation, typography scales, colour tokens, spacing rules, and icons — documented and ready to use. It ensures visual consistency across every screen, dramatically speeds up both design and development time, and scales with your product as it grows. For apps with multiple screens or a roadmap of future features, a design system is a significant long-term investment. For very simple apps with a fixed scope, it may not be necessary — we\'ll advise based on your specific situation.',
  },
  {
    q: 'Do you conduct usability testing?',
    a: 'Yes — usability testing is part of our standard UX process. We conduct both moderated sessions (live video calls where we observe users navigating the prototype and ask questions in real time) and unmoderated sessions (users complete tasks independently and we review recordings). Testing typically happens at the wireframe or prototype stage, before development begins — this is when changes are cheapest. We recruit participants matching your actual user profile, write task-based test scripts, and deliver a findings report with prioritised recommendations.',
  },
  {
    q: 'Can you redesign an existing app rather than design from scratch?',
    a: 'Yes — app redesigns are a common engagement for us. The process starts with a UX audit of your existing app: reviewing analytics, conducting user interviews, and running a heuristic evaluation against established UX principles. This gives us a clear picture of what\'s working, what\'s not, and why. We then design improvements in prioritised phases — focusing on the highest-impact UX issues first. We can redesign the full app, specific user journeys, or individual feature areas depending on your budget and priorities.',
  },
];

const STATS = [
  { label: 'Apps Designed', val: '200+' },
  { label: 'Avg App Store Rating', val: '4.7★' },
  { label: 'Avg Retention Improvement', val: '+35%' },
  { label: 'Years of Product Design', val: '15+' },
];

export default function AppUiUxDesign() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const stepRefs = useRef([]);
  const whyRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const obs = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120);
          o.disconnect();
        }
      }, { threshold: 0.2 });
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!whyRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90));
        o.disconnect();
      }
    }, { threshold: 0.1 });
    o.observe(whyRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60));
        o.disconnect();
      }
    }, { threshold: 0.05 });
    o.observe(cardsRef.current);
    return () => o.disconnect();
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'App UI/UX Design Services',
        description: 'Mobile app UI/UX design — user research, wireframing, high-fidelity design, prototyping, design systems, and usability testing for iOS and Android apps.',
        provider: {
          '@type': 'Organization',
          name: '1Solutions',
          url: 'https://www.1solutions.biz',
          areaServed: ['US', 'CA', 'AU'],
        },
        serviceType: 'UI/UX Design',
        url: 'https://www.1solutions.biz/app-ui-ux-design',
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
        <title>App UI/UX Design Services | Mobile App Design Agency | 1Solutions</title>
        <meta name="description" content="Expert mobile app UI/UX design — user research, wireframing, high-fidelity design, prototyping & usability testing for iOS & Android. US, Canada & Australia." />
        <meta name="keywords" content="app ui ux design, mobile app design, ios app design, android app design, ux design agency, mobile app ux design, app design services" />
        <link rel="canonical" href="https://www.1solutions.biz/app-ui-ux-design" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="App UI/UX Design Services | 1Solutions" />
        <meta property="og:description" content="Research-driven mobile app design for iOS & Android — wireframes, high-fidelity UI, prototypes & design systems. Design that converts users into loyal customers." />
        <meta property="og:url" content="https://www.1solutions.biz/app-ui-ux-design" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style>{`
          .ux-page { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #0F1F40; line-height: 1.6; overflow-x: hidden; }
          .ux-page *, .ux-page *::before, .ux-page *::after { box-sizing: border-box; }

          .ux-hero { background: linear-gradient(135deg, #fff1f2 0%, #fce7f3 30%, #fdf4ff 65%, #faf5ff 100%); position: relative; overflow: hidden; padding: 80px 40px 0; }
          .ux-hero-orb1 { position: absolute; top: -100px; right: -100px; width: 560px; height: 560px; border-radius: 50%; background: radial-gradient(circle, rgba(225,29,72,0.11) 0%, transparent 65%); pointer-events: none; filter: blur(30px); }
          .ux-hero-orb2 { position: absolute; bottom: 0; left: -80px; width: 440px; height: 440px; border-radius: 50%; background: radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 65%); pointer-events: none; filter: blur(30px); }
          .ux-hero-inner { max-width: 1280px; margin: 0 auto; position: relative; z-index: 2; text-align: center; }
          .ux-breadcrumb { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 6px; font-size: 12px; color: #6b7280; margin-bottom: 24px; font-weight: 500; }
          .ux-breadcrumb a { color: #6b7280; text-decoration: none; }
          .ux-breadcrumb a:hover { color: #E11D48; }
          .ux-breadcrumb span { color: #d1d5db; }
          .ux-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(225,29,72,0.07); border: 1px solid rgba(225,29,72,0.18); border-radius: 100px; padding: 5px 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #BE123C; margin-bottom: 28px; }
          .ux-hero-h1 { font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 900; line-height: 1.1; letter-spacing: -1px; background: linear-gradient(90deg, #0F3460 0%, #E11D48 50%, #A855F7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 20px; max-width: 920px; margin-left: auto; margin-right: auto; }
          .ux-hero-sub { font-size: 1.08rem; color: #4A6080; line-height: 1.75; max-width: 660px; margin: 0 auto 36px; }
          .ux-hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
          .ux-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #E11D48; color: #fff; padding: 14px 30px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: all 0.25s; box-shadow: 0 4px 20px rgba(225,29,72,0.28); }
          .ux-btn-primary:hover { background: #BE123C; box-shadow: 0 8px 32px rgba(225,29,72,0.38); transform: translateY(-2px); }
          .ux-btn-secondary { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.65); backdrop-filter: blur(12px); border: 1.5px solid rgba(15,52,96,0.18); color: #0F3460; padding: 14px 30px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: all 0.25s; }
          .ux-btn-secondary:hover { border-color: #E11D48; color: #E11D48; transform: translateY(-2px); }
          .ux-stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 900px; margin: 0 auto; background: rgba(255,255,255,0.55); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.85); border-radius: 20px 20px 0 0; box-shadow: 0 4px 24px rgba(225,29,72,0.07); }
          .ux-stat { padding: 20px 24px; text-align: center; border-right: 1px solid rgba(225,29,72,0.08); }
          .ux-stat:last-child { border-right: none; }
          .ux-stat-label { font-size: 11px; color: #6b7280; font-weight: 500; margin-bottom: 4px; }
          .ux-stat-val { font-size: 1.6rem; font-weight: 900; color: #E11D48; letter-spacing: -0.5px; }

          .ux-services-section { background: #f8fafd; padding: 80px 40px; box-shadow: 0 -20px 60px rgba(225,29,72,0.05); }
          .ux-services-inner { max-width: 1280px; margin: 0 auto; }
          .ux-section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #E11D48; margin-bottom: 10px; display: block; }
          .ux-section-title { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; line-height: 1.15; letter-spacing: -1px; background: linear-gradient(90deg, #0F3460 0%, #E11D48 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px; }
          .ux-section-desc { font-size: 15px; color: #4A6080; line-height: 1.7; max-width: 640px; margin-bottom: 44px; }
          .ux-services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
          .ux-service-card { background: linear-gradient(135deg, rgba(255,241,242,0.65) 0%, rgba(255,255,255,0.88) 60%, rgba(250,245,255,0.45) 100%); border: 1px solid rgba(255,255,255,0.85); border-radius: 20px; padding: 26px 22px 22px; position: relative; overflow: hidden; box-shadow: 0 4px 24px rgba(225,29,72,0.04); opacity: 0; transform: translateY(20px); transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.22s, border-color 0.22s; }
          .ux-service-card.visible { opacity: 1; transform: translateY(0); }
          .ux-service-card:hover { transform: translateY(-6px); border-color: rgba(225,29,72,0.22); box-shadow: 0 16px 48px rgba(225,29,72,0.09); }
          .ux-card-num { position: absolute; top: 8px; right: 14px; font-size: 72px; font-weight: 900; line-height: 1; color: #E11D48; opacity: 0.05; letter-spacing: -4px; pointer-events: none; user-select: none; }
          .ux-service-card h3 { font-size: 15px; font-weight: 700; color: #0F1F40; line-height: 1.3; margin-bottom: 8px; position: relative; z-index: 1; }
          .ux-service-card p { font-size: 13px; color: #4A6080; line-height: 1.6; position: relative; z-index: 1; margin: 0; }

          .ux-tools-section { background: #fff; padding: 70px 40px; }
          .ux-tools-inner { max-width: 1280px; margin: 0 auto; }
          .ux-tools-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 36px; }
          .ux-tool-pill { background: #fff1f2; border: 1.5px solid rgba(225,29,72,0.16); border-radius: 50px; padding: 8px 18px; font-size: 13px; font-weight: 600; color: #9F1239; transition: all 0.2s; }
          .ux-tool-pill:hover { background: #fce7f3; border-color: #E11D48; transform: translateY(-2px); }

          .ux-process-section { background: linear-gradient(135deg, #fff1f2 0%, #fce7f3 50%, #faf5ff 100%); padding: 80px 40px; }
          .ux-process-inner { max-width: 900px; margin: 0 auto; }
          .ux-process-steps { display: flex; flex-direction: column; margin-top: 44px; }
          .ux-process-step { display: grid; grid-template-columns: 80px 1fr; gap: 24px; align-items: flex-start; padding: 28px 0; border-bottom: 1px solid rgba(225,29,72,0.10); opacity: 0; transform: translateX(-20px); transition: opacity 0.45s ease, transform 0.45s ease; }
          .ux-process-step:last-child { border-bottom: none; }
          .ux-process-step.visible { opacity: 1; transform: translateX(0); }
          .ux-step-num { font-size: 3rem; font-weight: 900; color: rgba(225,29,72,0.13); line-height: 1; letter-spacing: -2px; }
          .ux-step-body h3 { font-size: 1.1rem; font-weight: 800; color: #0F1F40; margin-bottom: 6px; }
          .ux-step-body p { font-size: 0.9rem; color: #4A6080; line-height: 1.7; margin: 0; }

          .ux-why-section { background: #fff; padding: 80px 40px; }
          .ux-why-inner { max-width: 1280px; margin: 0 auto; }
          .ux-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 44px; }
          .ux-why-card { background: linear-gradient(135deg, #fff1f2 0%, #fff 60%, #faf5ff 100%); border: 1px solid rgba(225,29,72,0.09); border-radius: 16px; padding: 28px; opacity: 0; transform: translateY(16px); transition: opacity 0.4s ease, transform 0.4s ease; }
          .ux-why-card.visible { opacity: 1; transform: translateY(0); }
          .ux-why-card:hover { border-color: rgba(225,29,72,0.20); box-shadow: 0 8px 32px rgba(225,29,72,0.07); }
          .ux-why-dot { width: 8px; height: 8px; border-radius: 50%; background: #E11D48; margin-bottom: 16px; }
          .ux-why-card h3 { font-size: 1rem; font-weight: 800; color: #0F1F40; margin-bottom: 10px; }
          .ux-why-card p { font-size: 0.88rem; color: #4A6080; line-height: 1.7; margin: 0; }

          .ux-faq-section { background: #f8fafd; padding: 80px 40px; }
          .ux-faq-inner { max-width: 860px; margin: 0 auto; }
          .ux-faq-list { margin-top: 44px; }
          .ux-faq-item { border-bottom: 1px solid #e5e7eb; }
          .ux-faq-q { width: 100%; background: none; border: none; text-align: left; padding: 22px 0; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; cursor: pointer; font-family: inherit; font-size: 1rem; font-weight: 700; color: #0F1F40; line-height: 1.4; }
          .ux-faq-q:hover { color: #E11D48; }
          .ux-faq-icon { width: 22px; height: 22px; border: 2px solid #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; color: #9ca3af; transition: all 0.2s; margin-top: 2px; }
          .ux-faq-item.open .ux-faq-icon { border-color: #E11D48; color: #E11D48; background: rgba(225,29,72,0.06); }
          .ux-faq-a { font-size: 0.92rem; color: #4A6080; line-height: 1.8; overflow: hidden; max-height: 0; transition: max-height 0.35s ease, padding-bottom 0.35s ease; }
          .ux-faq-item.open .ux-faq-a { max-height: 500px; padding-bottom: 22px; }

          .ux-cta-section { background: linear-gradient(135deg, rgba(225,29,72,0.05) 0%, rgba(255,255,255,0.80) 40%, rgba(168,85,247,0.05) 100%); padding: 90px 40px; position: relative; overflow: hidden; }
          .ux-cta-orb1 { position: absolute; top: -80px; right: -80px; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(225,29,72,0.09) 0%, transparent 70%); pointer-events: none; }
          .ux-cta-orb2 { position: absolute; bottom: -60px; left: -60px; width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%); pointer-events: none; }
          .ux-cta-inner { max-width: 760px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
          .ux-cta-title { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900; background: linear-gradient(90deg, #0F3460 0%, #E11D48 50%, #A855F7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 16px; line-height: 1.2; }
          .ux-cta-sub { font-size: 1.05rem; color: #4A6080; line-height: 1.75; margin: 0 auto 36px; max-width: 520px; }
          .ux-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

          @media (max-width: 1024px) { .ux-services-grid { grid-template-columns: repeat(2, 1fr); } .ux-why-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 768px) {
            .ux-hero { padding: 60px 24px 0; }
            .ux-services-section, .ux-tools-section, .ux-process-section, .ux-why-section, .ux-faq-section, .ux-cta-section { padding: 60px 24px; }
            .ux-stats-bar { grid-template-columns: repeat(2, 1fr); border-radius: 16px 16px 0 0; }
            .ux-stat:nth-child(2) { border-right: none; }
            .ux-services-grid { grid-template-columns: 1fr; }
            .ux-why-grid { grid-template-columns: 1fr; }
            .ux-process-step { grid-template-columns: 56px 1fr; }
            .ux-hero-btns { flex-direction: column; align-items: center; }
          }
        `}</style>
      </Head>

      <div className="ux-page">
        <section className="ux-hero">
          <div className="ux-hero-orb1" /><div className="ux-hero-orb2" />
          <div className="ux-hero-inner">
            <nav className="ux-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span>
              <span>Services</span><span>/</span>
              <span>Mobile Development</span><span>/</span>
              <span style={{ color: '#E11D48' }}>App UI/UX Design</span>
            </nav>
            <span className="ux-eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E11D48', display: 'inline-block' }} />
              Mobile Development
            </span>
            <h1 className="ux-hero-h1">App UI/UX Design Services That Turn Users Into Loyal Customers</h1>
            <p className="ux-hero-sub">Research-driven mobile app design for iOS and Android — from user flows and wireframes to pixel-perfect UI, prototypes, and design systems. Built for engagement, retention, and conversion.</p>
            <div className="ux-hero-btns">
              <Link href="/contact-us" className="ux-btn-primary">
                Start a Design Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/react-native-app-development" className="ux-btn-secondary">See React Native Services</Link>
            </div>
            <div className="ux-stats-bar">
              {STATS.map(s => (
                <div key={s.label} className="ux-stat">
                  <div className="ux-stat-label">{s.label}</div>
                  <div className="ux-stat-val">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ux-services-section">
          <div className="ux-services-inner">
            <span className="ux-section-eyebrow">What We Deliver</span>
            <h2 className="ux-section-title">App UI/UX Design Services</h2>
            <p className="ux-section-desc">From first-session research through to developer handoff — complete mobile app design services that cover every stage of the product design process.</p>
            <div className="ux-services-grid" ref={cardsRef}>
              {SERVICES.map((s, i) => (
                <div key={s.n} className={`ux-service-card${visibleCards.includes(i) ? ' visible' : ''}`}>
                  <div className="ux-card-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ux-tools-section">
          <div className="ux-tools-inner">
            <span className="ux-section-eyebrow">Tools &amp; Standards</span>
            <h2 className="ux-section-title">Design Tools &amp; Frameworks</h2>
            <p className="ux-section-desc">We use industry-standard tools and design against established platform guidelines — producing handoff files that translate cleanly into production code.</p>
            <div className="ux-tools-grid">
              {TOOLS.map(t => <span key={t} className="ux-tool-pill">{t}</span>)}
            </div>
          </div>
        </section>

        <section className="ux-process-section">
          <div className="ux-process-inner">
            <span className="ux-section-eyebrow">How We Design</span>
            <h2 className="ux-section-title">Our App Design Process</h2>
            <p className="ux-section-desc">A structured, validated design process that reduces risk — every phase produces artefacts that inform the next, with user feedback built in throughout.</p>
            <div className="ux-process-steps">
              {PROCESS.map((p, i) => (
                <div key={p.step} ref={el => { stepRefs.current[i] = el; }} className={`ux-process-step${visibleSteps.includes(i) ? ' visible' : ''}`}>
                  <div className="ux-step-num">{p.step}</div>
                  <div className="ux-step-body"><h3>{p.title}</h3><p>{p.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ux-why-section">
          <div className="ux-why-inner">
            <span className="ux-section-eyebrow">Why 1Solutions</span>
            <h2 className="ux-section-title">Why Choose Us for App Design</h2>
            <p className="ux-section-desc">Good design is not just beautiful screens — it&rsquo;s measurable impact on retention, conversion, and user satisfaction. Here&rsquo;s how we deliver that.</p>
            <div className="ux-why-grid" ref={whyRef}>
              {WHY.map((w, i) => (
                <div key={w.title} className={`ux-why-card${visibleWhy.includes(i) ? ' visible' : ''}`}>
                  <div className="ux-why-dot" />
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ux-faq-section">
          <div className="ux-faq-inner">
            <span className="ux-section-eyebrow">Got Questions?</span>
            <h2 className="ux-section-title">App UI/UX Design FAQs</h2>
            <p className="ux-section-desc">Answers to the questions we hear most before starting a mobile app design project.</p>
            <div className="ux-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`ux-faq-item${openFaq === i ? ' open' : ''}`}>
                  <button className="ux-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    {f.q}
                    <span className="ux-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="ux-faq-a" style={openFaq === i ? { maxHeight: 500, paddingBottom: 22 } : {}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ux-cta-section">
          <div className="ux-cta-orb1" /><div className="ux-cta-orb2" />
          <div className="ux-cta-inner">
            <span className="ux-section-eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: 16 }}>Start Designing</span>
            <h2 className="ux-cta-title">Ready to Design an App Your Users Actually Love?</h2>
            <p className="ux-cta-sub">Book a free 30-minute design consultation. We&rsquo;ll review your app concept, identify the highest UX risks, and outline a design approach — no obligation.</p>
            <div className="ux-cta-btns">
              <Link href="/contact-us" className="ux-btn-primary">
                Book a Free Design Consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/react-native-app-development" className="ux-btn-secondary">Build the App Too</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
