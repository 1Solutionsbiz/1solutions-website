'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

/* ─── Schema ─────────────────────────────────────────────────── */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'eLearning Software Development Services', item: 'https://www.1solutions.biz/elearning-software-development-services/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'eLearning Software Development Services',
      url: 'https://www.1solutions.biz/elearning-software-development-services/',
      description: 'Custom eLearning software development — LMS platforms, SCORM/xAPI-compliant course engines, virtual classrooms, adaptive learning systems, gamification, mobile learning apps, and corporate training portals.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '108', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Do you build SCORM and xAPI-compliant eLearning platforms?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We develop eLearning platforms with full SCORM 1.2, SCORM 2004 (all editions), xAPI (Tin Can), and AICC compliance. Our LMS solutions support standard course packaging, runtime communication, and detailed learner tracking. We also implement LTI (Learning Tools Interoperability) for seamless integration with third-party tools, content providers, and institutional systems.' } },
        { '@type': 'Question', name: 'How long does it take to build a custom LMS?', acceptedAnswer: { '@type': 'Answer', text: 'A fully custom LMS with course management, user roles, SCORM runtime, progress tracking, assessment engine, and basic reporting typically takes 16–20 weeks. A more complex platform with live virtual classrooms, adaptive learning, gamification, and advanced analytics takes 24–36 weeks. We provide milestone-based estimates after a requirements discovery session.' } },
        { '@type': 'Question', name: 'Can you build a white-label eLearning platform we can sell to clients?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — multi-tenant, white-label LMS development is one of our core services. We build platforms with custom domain support, per-tenant branding (logo, colours, fonts), isolated data environments, subscription billing integration (Stripe, Razorpay), and a self-service onboarding flow. You retain full ownership of the platform and all source code.' } },
        { '@type': 'Question', name: 'Do you integrate live virtual classrooms into eLearning platforms?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We integrate live virtual classroom capabilities using WebRTC (for custom builds), Zoom SDK, Google Meet API, Jitsi, BigBlueButton, and Agora. Features include interactive whiteboards, screen sharing, breakout rooms, session recording, attendance tracking, and LMS activity log synchronisation. We also build fully custom video conferencing modules for platforms requiring data sovereignty.' } },
        { '@type': 'Question', name: 'Which engagement model suits eLearning platform development?', acceptedAnswer: { '@type': 'Answer', text: 'For a defined eLearning product — an LMS, a course marketplace, or a corporate training portal — Fixed Price works well and gives budget certainty. For a long-term product roadmap with evolving features, the Dedicated Team model gives you a full-stack team working exclusively on your platform. Time & Material suits early-stage startups building an MVP and iterating rapidly based on user feedback.' } },
        { '@type': 'Question', name: 'Can you migrate our existing Moodle or TalentLMS platform to a custom solution?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We handle full LMS migrations — from Moodle, TalentLMS, Docebo, Canvas, or other platforms — to a custom or open-source LMS. This includes course content migration (SCORM packages, AICC, and native formats), user data migration, gradebook and completion history migration, and integration re-mapping. We provide a parallel-run period to validate data integrity before cutover.' } },
      ],
    },
  ],
};

/* ─── Page data ──────────────────────────────────────────────── */
const SERVICES = [
  { n: '01', title: 'Custom LMS Development', desc: 'End-to-end Learning Management System development with course catalogue management, multi-role user hierarchy, SCORM/xAPI runtime, progress tracking, completion certificates, and branded learner portals.' },
  { n: '02', title: 'Online Course & Marketplace Platforms', desc: 'Course creation platforms and multi-instructor marketplaces with video hosting, drip content scheduling, coupon and pricing engines, affiliate programmes, and Stripe/PayPal payment integration.', feat: true },
  { n: '03', title: 'Virtual Classroom & Live Learning', desc: 'Live virtual classroom modules with WebRTC/Zoom/BigBlueButton integration, interactive whiteboards, breakout rooms, session recording, attendance tracking, and real-time polls and Q&A.' },
  { n: '04', title: 'Corporate Training & L&D Portals', desc: 'Enterprise learning and development platforms with onboarding workflows, role-based training paths, compliance training tracking, performance analytics, manager dashboards, and HRIS integration.' },
  { n: '05', title: 'Adaptive Learning Systems', desc: 'AI-driven adaptive learning engines that personalise content sequencing based on learner performance, knowledge gaps, and learning velocity — maximising knowledge retention and course completion rates.' },
  { n: '06', title: 'Mobile Learning (mLearning) Apps', desc: 'Native iOS and Android mobile learning apps with offline content sync, push notification reminders, micro-learning modules, in-app assessments, and seamless LMS backend synchronisation.' },
  { n: '07', title: 'Gamification & Learner Engagement', desc: 'Gamification layers with points, badges, leaderboards, learning streaks, achievement unlocks, and social learning feeds — proven to increase course completion rates by 30–40%.' },
  { n: '08', title: 'Assessment & Quiz Engines', desc: 'Flexible assessment tools supporting multiple choice, drag-and-drop, fill-in-the-blank, video response, and timed exams. Includes question banks, randomisation, anti-cheating controls, and detailed result analytics.' },
  { n: '09', title: 'Content Management & Authoring Tools', desc: 'Custom content authoring environments and SCORM packaging tools enabling instructional designers to create interactive modules, branching scenarios, H5P-compatible content, and multimedia lessons without code.' },
  { n: '10', title: 'eLearning Platform Integration & Migration', desc: 'Third-party integrations (CRM, HRIS, SSO, payment gateways, video platforms) and full LMS migrations from Moodle, TalentLMS, Docebo, or Canvas to a custom or modern open-source platform.' },
];

const TECH_STACK = [
  {
    group: 'Backend Development',
    color: '#7c3aed',
    items: ['Node.js / Express', 'Python / Django', 'PHP / Laravel', 'Java / Spring Boot', 'Ruby on Rails', 'GraphQL / REST APIs'],
  },
  {
    group: 'Frontend Development',
    color: '#6d28d9',
    items: ['React.js', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
  },
  {
    group: 'Mobile (iOS & Android)',
    color: '#0ea5e9',
    items: ['Flutter', 'React Native', 'Swift (iOS)', 'Kotlin (Android)', 'Expo', 'Offline-first sync'],
  },
  {
    group: 'eLearning Standards',
    color: '#D97706',
    items: ['SCORM 1.2 / 2004', 'xAPI / Tin Can', 'AICC', 'LTI 1.1 / 1.3', 'CMI5', 'IMS QTI'],
  },
  {
    group: 'Video & Live Learning',
    color: '#ec4899',
    items: ['WebRTC', 'HLS / DASH Streaming', 'Zoom SDK', 'BigBlueButton', 'Agora.io', 'Mux / Cloudflare Stream'],
  },
  {
    group: 'AI / ML & Personalisation',
    color: '#f97316',
    items: ['Adaptive Learning Engines', 'NLP (OpenAI / HuggingFace)', 'Recommendation Systems', 'Learning Analytics ML', 'Chatbot Tutors', 'Auto-grading AI'],
  },
  {
    group: 'Databases & Storage',
    color: '#14b8a6',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch', 'AWS S3 / CloudFront'],
  },
  {
    group: 'Cloud & DevOps',
    color: '#6366f1',
    items: ['AWS (EC2, RDS, Lambda)', 'Azure', 'Google Cloud', 'Docker / Kubernetes', 'CI/CD (GitHub Actions)', 'Terraform'],
  },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'fixed',
    name: 'Fixed Price',
    badge: 'Well-defined projects',
    badgeColor: '#0ea5e9',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Agreed price. Agreed scope. No surprises.',
    desc: 'Ideal for well-scoped eLearning products — an LMS MVP, a course marketplace, a corporate training portal, or a specific integration. We agree on deliverables, price, and timeline upfront with milestone-based delivery.',
    bestFor: ['Custom LMS MVP', 'Online course marketplace', 'Corporate training portal', 'Assessment engine or authoring tool'],
    process: 'Detailed spec → Fixed quote → Milestone delivery → Sign-off',
    timeline: 'Best for projects 8–24 weeks',
  },
  {
    id: 'dedicated',
    name: 'Dedicated Team',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'Your offshore eLearning engineering team. Full-time. Fully yours.',
    desc: 'A dedicated squad of eLearning specialists — full-stack developer, mobile engineer, instructional technology expert, QA, and DevOps — working exclusively on your platform at a fraction of US/UK hiring cost. Full IP ownership retained by you.',
    bestFor: ['Growing eLearning SaaS or LMS product', 'Long-term course platform roadmap', 'EdTech startup scaling its engineering team', 'Replacing or augmenting an in-house team'],
    process: 'Team assembly → Onboarding → Weekly sprint delivery → Continuous roadmap',
    timeline: 'Ongoing — scale up or down each quarter',
  },
  {
    id: 'tm',
    name: 'Time & Material',
    badge: 'Agile & flexible',
    badgeColor: '#7c3aed',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Pay for hours worked. Adapt as you go.',
    desc: 'Billed on actual time and resources used. Best for EdTech startups building an MVP and iterating quickly based on early user feedback, or for adding specific features to an existing platform.',
    bestFor: ['EdTech MVP with evolving scope', 'Adding adaptive learning or AI features', 'Integrating new video or virtual classroom tools', 'Rapid prototyping for investor demos'],
    process: 'Sprint planning → Biweekly delivery → Iterative refinement → Transparent timesheets',
    timeline: 'Start in 1 week — no lengthy onboarding',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Instructional Design Requirements', desc: 'We work with your team to map learner personas, course taxonomy, content formats, assessment types, completion criteria, and integration requirements (HRIS, SSO, payment gateways) before any development begins.' },
  { num: '02', title: 'Platform Architecture & UX Design', desc: 'Our architects design a scalable, multi-tenant-ready platform architecture. UX designers create learner-centric wireframes and prototypes covering the course player, dashboard, assessment flow, and instructor studio — reviewed and approved before development.' },
  { num: '03', title: 'Agile Development — Backend, Frontend & Mobile', desc: 'Parallel development streams: backend APIs and LMS core (course engine, user management, SCORM/xAPI runtime), frontend learner and instructor portals, and iOS/Android mobile apps — all progressing in 2-week sprint cycles.' },
  { num: '04', title: 'eLearning Standards Compliance Testing', desc: 'Rigorous SCORM 1.2/2004 and xAPI conformance testing using SCORM Cloud and Rustici Engine. Cross-browser and cross-device testing, accessibility audit (WCAG 2.1 AA), load testing for concurrent learner sessions, and video streaming quality validation.' },
  { num: '05', title: 'Content Migration & Integration Setup', desc: 'If migrating from an existing LMS, we handle course content migration, user data transfer, gradebook history, and integration re-mapping. For new platforms, we set up SSO (SAML 2.0 / OAuth2), payment gateways, CRM connectors, and video CDN configuration.' },
  { num: '06', title: 'Launch, Analytics & Ongoing Optimisation', desc: 'Zero-downtime production deployment with staging validation, CDN configuration for global video delivery, real-time learner analytics dashboards, and tiered SLA-backed post-launch support. Ongoing feature releases on a defined roadmap cadence.' },
];

const TESTIMONIALS = [
  {
    text: "1Solutions built our multi-tenant LMS from scratch — SCORM runtime, course marketplace, video streaming, and a gamification layer. They understood instructional design requirements as well as engineering ones, and the platform launched on schedule. Our learner engagement metrics doubled within 3 months.",
    name: 'Sarah K.', role: 'CEO, EdTech Platform (US)', init: 'SK', bg: '#4c1d95',
  },
  {
    text: "We needed a corporate training portal integrated with our HRIS and SSO across 12 countries and 8,000 employees. 1Solutions delivered a compliance-ready platform with role-based learning paths, manager dashboards, and detailed completion reporting. The implementation was seamless.",
    name: 'David M.', role: 'Head of L&D, Global Enterprise (UK)', init: 'DM', bg: '#1e3a5f', feat: true,
  },
  {
    text: "Our existing Moodle setup was painful to maintain and scale. 1Solutions migrated us to a custom Laravel + React platform with xAPI tracking, live virtual classrooms via BigBlueButton, and adaptive learning recommendations. Best technology decision we made this year.",
    name: 'Priya N.', role: 'CTO, Online Education Provider (AU)', init: 'PN', bg: '#134e4a',
  },
];

const WHY_CARDS = [
  { title: 'Deep eLearning Domain Expertise', desc: 'We understand SCORM, xAPI, LTI, adaptive learning, and instructional design — not just generic web development. We speak the language of learning technologists and L&D teams.' },
  { title: 'SCORM, xAPI & LTI Compliance', desc: 'Our LMS platforms are tested for SCORM 1.2/2004 and xAPI conformance using Rustici SCORM Cloud, and support LTI 1.3 for seamless integration with institutional and third-party tool ecosystems.' },
  { title: '15+ Years of Platform Delivery', desc: 'We have been building eLearning platforms, LMS solutions, and EdTech products since 2008 — for startups, universities, corporate L&D teams, and online course marketplaces worldwide.' },
  { title: 'Full-Stack eLearning Team', desc: 'Backend LMS core, SCORM runtime, frontend course player, mobile apps, video streaming, and AI personalisation — your entire eLearning platform delivered by a single accountable team.' },
  { title: 'Scalable Multi-Tenant Architecture', desc: 'We architect eLearning platforms to support thousands of concurrent learners and hundreds of tenants from day one — with per-tenant data isolation, custom branding, and independent billing.' },
  { title: 'AI-Powered Adaptive Learning', desc: 'We integrate adaptive learning engines, NLP-based chatbot tutors, intelligent content recommendations, and auto-grading AI to personalise the learning journey and improve knowledge retention.' },
  { title: 'US / UK / AU / Global Delivery', desc: 'We serve EdTech startups, universities, corporate L&D departments, and online training providers across North America, Europe, and Australia — adapting to FERPA, GDPR, and regional data compliance.' },
  { title: 'Transparent, Milestone-Based Delivery', desc: 'Fortnightly demos, weekly status reports, and full source code access from day one. No black boxes. Full IP ownership retained by the client. No surprise invoices.' },
];

const FAQS = [
  { q: 'Do you build SCORM and xAPI-compliant eLearning platforms?', a: 'Yes. We develop eLearning platforms with full SCORM 1.2, SCORM 2004 (all editions), xAPI (Tin Can API), and AICC compliance. Our LMS solutions support standard course packaging, runtime communication, and detailed learner tracking. We also implement LTI 1.1 and 1.3 for seamless integration with third-party tools, content providers, and institutional systems such as Canvas and Blackboard.' },
  { q: 'How long does it take to build a custom LMS?', a: 'A custom LMS with course management, user roles, SCORM/xAPI runtime, progress tracking, completion certificates, and basic reporting typically takes 16–20 weeks. A more complex platform with live virtual classrooms, adaptive learning, gamification, and advanced analytics takes 24–36 weeks. We provide milestone-based estimates after a technical discovery session at no charge.' },
  { q: 'Can you build a white-label eLearning platform for resale?', a: 'Yes — multi-tenant, white-label LMS development is one of our core specialisations. We build platforms with custom domain support, per-tenant branding (logo, colours, fonts), isolated data environments, subscription billing integration via Stripe or Razorpay, and a self-service tenant onboarding flow. You retain full ownership of the platform source code and all intellectual property.' },
  { q: 'Do you integrate live virtual classrooms into eLearning platforms?', a: 'Yes. We integrate live virtual classroom capabilities using WebRTC (for fully custom builds), Zoom SDK, Google Meet API, Jitsi Meet, BigBlueButton, and Agora.io. Features include interactive whiteboards, screen sharing, breakout rooms, session recording and playback, attendance tracking, and LMS activity synchronisation. We also build fully custom video conferencing modules for platforms with data sovereignty requirements.' },
  { q: 'Which engagement model suits eLearning platform development?', a: 'For a defined eLearning product — an LMS, a course marketplace, or a corporate training portal — Fixed Price gives budget certainty. For a long-term product roadmap with evolving features, the Dedicated Team model gives you a full-stack team working exclusively on your platform. Time and Material suits early-stage EdTech startups building an MVP and iterating rapidly based on learner feedback.' },
  { q: 'Can you migrate our existing LMS to a custom solution?', a: 'Yes. We handle full LMS migrations from Moodle, TalentLMS, Docebo, Canvas, and other platforms to custom or modern open-source solutions. This includes SCORM package migration, user and enrolment data transfer, gradebook and completion history migration, and integration re-mapping. We provide a parallel-run validation period to ensure data integrity before final cutover.' },
  { q: 'Do you build mobile learning apps with offline support?', a: 'Yes. We develop native iOS and Android mobile learning apps using Flutter or React Native, with offline-first architecture. Learners can download courses, complete assessments, and track progress without connectivity — with automatic sync when back online. Push notifications for reminders, streaks, and new content are also included.' },
  { q: 'Do you offer post-launch support and platform optimisation?', a: 'Yes — all projects include a 30-day hypercare period post-launch. We then offer tiered SLA-backed support plans covering bug fixes, security patches, performance optimisation, feature additions, and infrastructure scaling. Our Enterprise plan includes 24/7 monitoring and a 4-hour critical response SLA.' },
];

/* ─── Hooks ──────────────────────────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (!num) return;
    let t0 = null;
    const step = ts => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  return (
    <div className="el-stat-col">
      <div className="el-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="el-stat-label">{label}</div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */
export default function ElearningSoftwareDevelopment() {
  const [showAllSvc, setShowAllSvc] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleSvcCards, setVisibleSvcCards] = useState([]);
  const [visibleEngCards, setVisibleEngCards] = useState([]);
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const [visibleStackCards, setVisibleStackCards] = useState([]);

  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const svcGridRef = useRef(null);
  const engGridRef = useRef(null);
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);
  const stackGridRef = useRef(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const pairs = [
      [svcGridRef, SERVICES.length, setVisibleSvcCards],
      [engGridRef, 3, setVisibleEngCards],
      [whyGridRef, WHY_CARDS.length, setVisibleWhyCards],
      [testiGridRef, 3, setVisibleTestiCards],
      [stackGridRef, TECH_STACK.length, setVisibleStackCards],
    ];
    const observers = pairs.map(([ref, count, setter]) => {
      if (!ref.current) return null;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 80)); obs.disconnect(); }
      }, { threshold: 0.05 });
      obs.observe(ref.current);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisibleSections(p => new Set([...p, key])); obs.disconnect(); } }, { threshold: 0.1 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const visibleServices = showAllSvc ? SERVICES : SERVICES.slice(0, 6);

  return (
    <>
      <Head>
        <title>eLearning Software Development Services | Custom LMS & EdTech | 1Solutions</title>
        <meta name="description" content="Custom eLearning software development — LMS platforms, SCORM/xAPI-compliant course engines, virtual classrooms, gamification & corporate training portals. 15+ years | 80+ EdTech clients | Free discovery call." />
        <link rel="canonical" href="https://www.1solutions.biz/elearning-software-development-services/" />
        <meta property="og:title" content="eLearning Software Development Services | 1Solutions" />
        <meta property="og:description" content="Custom LMS, online course platforms, virtual classrooms, adaptive learning & corporate training portals. SCORM/xAPI compliant. 15+ years | 80+ EdTech clients." />
        <meta property="og:url" content="https://www.1solutions.biz/elearning-software-development-services/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .el-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; position:relative; overflow-x:hidden; }
          .el-page *,.el-page *::before,.el-page *::after { box-sizing:border-box; }

          /* Orbs */
          .el-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(20px); }
          .el-orb-1 { width:880px;height:880px;background:radial-gradient(circle,rgba(124,58,237,.22) 0%,rgba(139,92,246,.10) 40%,transparent 70%);top:-280px;right:-260px; }
          .el-orb-2 { width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px; }
          .el-orb-3 { width:550px;height:550px;background:radial-gradient(circle,rgba(14,165,233,.16) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%); }

          /* Breadcrumb */
          .el-breadcrumb { position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto; }
          .el-breadcrumb ol { display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0; }
          .el-breadcrumb li { display:flex;align-items:center;gap:6px; }
          .el-breadcrumb li::after { content:'/';opacity:.45; }
          .el-breadcrumb li:last-child::after { display:none; }
          .el-breadcrumb a { color:#0F3460;text-decoration:none; }
          .el-breadcrumb a:hover { text-decoration:underline; }

          /* Hero */
          .el-hero { position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto;padding:44px 40px 32px; }
          .el-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px; }
          .el-hero h1 { font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#7c3aed 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .el-hero-desc { font-size:16px;color:#3A507A;line-height:1.65;max-width:720px;margin:0 auto 24px; }
          .el-trust-row { display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px; }
          .el-badge { display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07); }
          .el-badge-dot { width:7px;height:7px;border-radius:50%;background:#7c3aed;flex-shrink:0; }
          .el-ctas { display:flex;flex-wrap:wrap;gap:12px;justify-content:center; }
          .el-btn-primary { display:inline-block;padding:14px 36px;background:#0F3460;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(15,52,96,.25); }
          .el-btn-primary:hover { background:#7c3aed;transform:translateY(-2px); }
          .el-btn-ghost { display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s; }
          .el-btn-ghost:hover { background:rgba(255,255,255,.85);border-color:rgba(124,58,237,.5);transform:translateY(-2px); }

          /* Stats */
          .el-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95); }
          .el-stat-col { padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10); }
          .el-stat-col:last-child { border-right:none; }
          .el-stat-val { font-size:28px;font-weight:900;color:#7c3aed;letter-spacing:-.5px;line-height:1; }
          .el-stat-label { font-size:11px;color:#4A6080;font-weight:500;margin-top:5px; }

          /* Logos */
          .el-logos { position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px; }
          .el-logos-label { font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0; }
          .el-logos-wrap { width:100%;overflow:hidden; }
          .el-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:el-marquee 28s linear infinite; }
          .el-logos-track:hover { animation-play-state:paused; }
          @keyframes el-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .el-clogo { height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s; }
          .el-clogo:hover { opacity:.85;filter:grayscale(0%); }

          /* Shared */
          .el-s-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block; }
          .el-s-title { font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px; }
          .el-s-desc { font-size:15px;color:#4A6080;line-height:1.7; }
          .el-s-reveal { opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1); }
          .el-s-reveal.el-revealed { opacity:1;transform:translateY(0); }
          .el-inner { max-width:1300px;margin:0 auto; }

          /* Services */
          .el-svc-section { background:transparent;padding:72px 40px 60px;position:relative;z-index:1; }
          .el-svc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px; }
          .el-svc-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s; }
          .el-svc-card.el-cv { opacity:1;transform:translateY(0); }
          .el-svc-card.el-cv:hover { transform:translateY(-6px);border-color:rgba(124,58,237,.35);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .el-svc-card.feat { background:linear-gradient(135deg,rgba(237,233,254,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(124,58,237,.20); }
          .el-svc-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .el-svc-card h3 { font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1; }
          .el-svc-card p { font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1; }
          .el-svc-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#7c3aed,#8b5cf6);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1); }
          .el-svc-card.el-cv:hover::before { transform:scaleY(1); }
          .el-svc-more { text-align:center;margin-top:22px; }
          .el-btn-more { display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit; }
          .el-btn-more:hover { background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px); }

          /* Tech Stack */
          .el-stack-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1; }
          .el-stack-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px; }
          .el-stack-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .el-stack-card.el-sv { opacity:1;transform:translateY(0); }
          .el-stack-card.el-sv:hover { border-color:rgba(124,58,237,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .el-stack-group { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid; }
          .el-stack-pills { display:flex;flex-wrap:wrap;gap:6px; }
          .el-pill { display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid; }

          /* Engagement Models */
          .el-eng-section { padding:80px 40px;position:relative;z-index:1; }
          .el-eng-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px; }
          .el-eng-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s; }
          .el-eng-card.el-ev { opacity:1;transform:translateY(0); }
          .el-eng-card.el-ev:hover { border-color:rgba(124,58,237,.30);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .el-eng-card.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px); }
          .el-eng-card.feat.el-ev { transform:translateY(-8px); }
          .el-eng-card.feat.el-ev:hover { transform:translateY(-12px); }
          .el-eng-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px; }
          .el-eng-icon { width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s; }
          .el-eng-card.el-ev:hover .el-eng-icon { background:rgba(124,58,237,.10); }
          .el-eng-card.feat .el-eng-icon { background:rgba(217,119,6,.10); }
          .el-eng-icon svg { fill:#0F3460;transition:fill .2s; }
          .el-eng-card.el-ev:hover .el-eng-icon svg { fill:#7c3aed; }
          .el-eng-card.feat .el-eng-icon svg { fill:#D97706; }
          .el-eng-name { font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px; }
          .el-eng-headline { font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px; }
          .el-eng-desc { font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px; }
          .el-eng-list-label { font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px; }
          .el-eng-list { list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px; }
          .el-eng-list li { display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5; }
          .el-eng-list li::before { content:'✓';font-weight:800;color:#7c3aed;flex-shrink:0;margin-top:1px; }
          .el-eng-process { font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08); }
          .el-eng-process strong { color:#0F3460; }
          .el-eng-timeline { display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px; }
          .el-eng-cta { display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18); }
          .el-eng-cta:hover { background:#0F3460;color:#fff; }
          .el-eng-card.feat .el-eng-cta { background:#0F3460;color:#fff; }
          .el-eng-card.feat .el-eng-cta:hover { background:#7c3aed;border-color:#7c3aed; }

          /* Process */
          .el-process-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .el-psteps { display:flex;flex-direction:column;margin-top:52px; }
          .el-pstep { display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1); }
          .el-pstep.el-pv { opacity:1;transform:translateY(0); }
          .el-pstep-l { display:flex;flex-direction:column;align-items:center; }
          .el-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s; }
          .el-pstep.el-pv:hover .el-pstep-circle { background:rgba(124,58,237,.12);border-color:#7c3aed;color:#7c3aed; }
          .el-pstep-connector { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px; }
          .el-pstep-connector::before { content:'';width:2px;flex:1;background:#0F3460;opacity:.22; }
          .el-pstep-connector::after { content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40; }
          .el-pstep:last-child .el-pstep-connector { display:none; }
          .el-pstep-r { padding:4px 0 38px; }
          .el-pstep:last-child .el-pstep-r { padding-bottom:0; }
          .el-pstep-title { font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px; }
          .el-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }

          /* Testimonials */
          .el-testi { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .el-center-head { text-align:center;margin-bottom:48px; }
          .el-tgrid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px; }
          .el-tcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s; }
          .el-tcard.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.22); }
          .el-tcard.el-tv { opacity:1;transform:translateY(0); }
          .el-tcard.el-tv:hover { transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .el-stars { font-size:16px;color:#D97706;letter-spacing:2px; }
          .el-ttext { font-size:14px;line-height:1.75;color:#374151;flex:1; }
          .el-tauthor { display:flex;align-items:center;gap:12px; }
          .el-tavatar { width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0; }
          .el-tname { font-size:14px;font-weight:700;color:#0F3460; }
          .el-trole { font-size:12px;color:#6b7280; }

          /* Why */
          .el-why-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .el-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px; }
          .el-wcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .el-wcard.el-wv { opacity:1;transform:translateY(0) scale(1); }
          .el-wcard.el-wv:hover { transform:translateY(-5px) scale(1);border-color:rgba(124,58,237,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .el-wcard-dot { width:10px;height:10px;border-radius:50%;background:#7c3aed;margin-bottom:12px; }
          .el-wcard h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35; }
          .el-wcard p { font-size:13px;color:#4A6080;line-height:1.65;margin:0; }

          /* Contact */
          .el-contact { padding:70px 40px;background:linear-gradient(135deg,rgba(237,233,254,.55) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1; }
          .el-contact-grid { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start; }
          .el-ctitle { font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#7c3aed 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .el-cdesc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px; }
          .el-cbenefits { background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px; }
          .el-cbenefit { display:flex;gap:10px;align-items:flex-start; }
          .el-cbenefit-icon { flex-shrink:0;color:#7c3aed;font-weight:800;font-size:16px;margin-top:1px; }
          .el-cbenefit p { font-size:13px;color:#4A6080;margin:0;line-height:1.55; }
          .el-form-box { background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(237,233,254,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1); }
          .el-form-box h3 { font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px; }
          .el-form { display:flex;flex-direction:column;gap:13px; }
          .el-frow { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .el-fg { display:flex;flex-direction:column;gap:5px; }
          .el-fg.full { grid-column:1/-1; }
          .el-fg label { font-size:12px;font-weight:500;color:#0F1F40; }
          .el-fg input,.el-fg textarea,.el-fg select { padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s; }
          .el-fg input:focus,.el-fg textarea:focus,.el-fg select:focus { outline:none;border-color:#7c3aed;box-shadow:0 0 0 3px rgba(124,58,237,.10); }
          .el-consent { display:flex;gap:8px;align-items:flex-start; }
          .el-consent input { margin-top:3px;width:15px;height:15px; }
          .el-consent label { font-size:11px;color:#4A6080;line-height:1.5; }
          .el-consent a { color:#0F3460; }
          .el-submit { width:100%;padding:14px;background:#0F3460;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(15,52,96,.22); }
          .el-submit:hover { background:#7c3aed;transform:translateY(-2px);box-shadow:0 10px 30px rgba(124,58,237,.28); }

          /* FAQ */
          .el-faq { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1; }
          .el-faq h2 { font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px; }
          .el-faq-sub { font-size:15px;color:#4A6080;margin:0 0 36px; }
          .el-faq-list { display:flex;flex-direction:column;gap:10px; }
          .el-fitem { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s; }
          .el-fitem.open { border-color:rgba(124,58,237,.30); }
          .el-fitem.open::before { content:'';display:block;height:3px;background:linear-gradient(90deg,#7c3aed,#8b5cf6);border-radius:3px 3px 0 0; }
          .el-fq { width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative; }
          .el-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s; }
          .el-fitem.open .el-fq-badge { background:#7c3aed;color:#fff; }
          .el-fq span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4; }
          .el-fitem.open .el-fq span { color:#4c1d95; }
          .el-fchev { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s; }
          .el-fitem.open .el-fchev { transform:rotate(180deg);color:#7c3aed; }
          .el-fanswer-wrap { overflow:hidden;transition:max-height .35s ease;max-height:0; }
          .el-fitem.open .el-fanswer-wrap { max-height:500px; }
          .el-fanswer { padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8; }

          /* Related */
          .el-related { padding:80px 40px;background:rgba(237,233,254,.18);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60); }
          .el-related-inner { max-width:1300px;margin:0 auto;text-align:center; }
          .el-related h2 { font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px; }
          .el-related-sub { font-size:14px;color:#4A6080;margin:0 auto;max-width:560px; }
          .el-related hr { border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0; }
          .el-rtags { display:flex;flex-wrap:wrap;justify-content:center;gap:10px; }
          .el-rtag { display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s; }
          .el-rtag:hover { transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09); }
          .el-rtag-blue   { background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8; }
          .el-rtag-violet { background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9; }
          .el-rtag-amber  { background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309; }
          .el-rtag-teal   { background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E; }
          .el-rtag-green  { background:rgba(16,185,129,.09);border-color:rgba(16,185,129,.26);color:#065f46; }
          .el-rtag-red    { background:rgba(220,38,38,.09);border-color:rgba(220,38,38,.28);color:#991b1b; }

          /* Responsive */
          @media(max-width:1024px){
            .el-hero h1,.el-s-title,.el-faq h2 { font-size:36px; }
            .el-svc-grid { grid-template-columns:repeat(2,1fr); }
            .el-stack-grid { grid-template-columns:repeat(2,1fr); }
            .el-eng-grid { grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto; }
            .el-eng-card.feat { transform:none; }
            .el-eng-card.feat.el-ev { transform:none; }
            .el-eng-card.feat.el-ev:hover { transform:translateY(-4px); }
            .el-why-grid { grid-template-columns:repeat(2,1fr); }
            .el-tgrid { grid-template-columns:1fr; }
            .el-contact-grid { grid-template-columns:1fr; }
          }
          @media(max-width:768px){
            .el-breadcrumb { padding:12px 20px 0; }
            .el-hero { padding:28px 20px 20px; }
            .el-hero h1 { font-size:26px;letter-spacing:-.3px; }
            .el-stats { grid-template-columns:1fr 1fr; }
            .el-stat-col:nth-child(2) { border-right:none; }
            .el-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,.10); }
            .el-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,.10);border-right:none; }
            .el-logos { padding:16px 20px 28px; }
            .el-svc-section,.el-stack-section,.el-eng-section,.el-process-section,.el-testi,.el-why-section,.el-faq,.el-related { padding:52px 20px; }
            .el-contact { padding:48px 20px; }
            .el-svc-grid,.el-stack-grid,.el-why-grid { grid-template-columns:1fr; }
            .el-frow { grid-template-columns:1fr; }
            .el-ctitle { font-size:28px; }
            .el-s-title { font-size:28px; }
          }
        `}</style>
      </Head>

      <div className="el-page">
        <div className="el-orb el-orb-1" />
        <div className="el-orb el-orb-2" />
        <div className="el-orb el-orb-3" />

        {/* ── BREADCRUMB ── */}
        <nav className="el-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">eLearning Software Development Services</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── HERO ── */}
        <section className="el-hero">
          <span className="el-eyebrow">eLearning Software Development Company</span>
          <h1>eLearning Software Development — Engaging, Scalable &amp; Standards-Compliant</h1>
          <p className="el-hero-desc">We build custom LMS platforms, SCORM/xAPI-compliant course engines, virtual classrooms, adaptive learning systems, and corporate training portals for EdTech startups, universities, enterprises, and online training providers across the US, UK, Australia, and beyond.</p>
          <div className="el-trust-row">
            {['SCORM & xAPI Compliant','LTI 1.3 Integration','15+ Years Experience','80+ EdTech Clients','Full-Stack Delivery'].map(b => (
              <div className="el-badge" key={b}><span className="el-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="el-ctas">
            <Link href="#contact" className="el-btn-primary">Start Your eLearning Project</Link>
            <Link href="#engagement" className="el-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="el-stats" ref={statsRef}>
          {[['80+','EdTech Clients'],['250+','Projects Delivered'],['15+','Years Experience'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        {/* ── CLIENT LOGOS ── */}
        <div className="el-logos">
          <span className="el-logos-label">Trusted by Leading Organisations</span>
          <div className="el-logos-wrap">
            <div className="el-logos-track">
              {[
                ['/logo/Indian_Express_Logo_full.png','Indian Express'],
                ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],
                ['/logo/Uniphore.jpg','Uniphore'],
                ['/logo/ICCoLogo.png','ICC'],
                ['/logo/Honor_Logo_(2020).svg.png','Honor'],
                ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],
                ['/logo/Indian_Express_Logo_full.png','Indian Express 2'],
                ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],
                ['/logo/Uniphore.jpg','Uniphore 2'],
                ['/logo/ICCoLogo.png','ICC 2'],
                ['/logo/Honor_Logo_(2020).svg.png','Honor 2'],
                ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2'],
              ].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="el-clogo" />
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="el-svc-section" aria-labelledby="el-svc-heading">
          <div className="el-inner">
            <div className={`el-s-reveal${visibleSections.has('svc') ? ' el-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="el-s-eyebrow">What We Build</span>
              <h2 id="el-svc-heading" className="el-s-title">eLearning Software Solutions We Deliver</h2>
              <p className="el-s-desc" style={{ maxWidth: 720 }}>From custom LMS platforms and SCORM-compliant course engines to live virtual classrooms, gamified learning apps, and enterprise L&D portals — we engineer the full spectrum of eLearning technology.</p>
            </div>
            <div className="el-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`el-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' el-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="el-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="el-svc-more">
                <button className="el-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section id="stack" className="el-stack-section" aria-labelledby="el-stack-heading">
          <div className="el-inner">
            <div className={`el-s-reveal${visibleSections.has('stk') ? ' el-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="el-s-eyebrow">The eLearning Tech Stack We Use</span>
              <h2 id="el-stack-heading" className="el-s-title">Technology That Powers Modern Learning Experiences</h2>
              <p className="el-s-desc" style={{ maxWidth: 680 }}>Every technology we use is chosen for scalability, learner experience, and standards compliance — from SCORM-tested LMS cores to AI-driven adaptive learning engines and WebRTC-powered virtual classrooms.</p>
            </div>
            <div className="el-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`el-stack-card${visibleStackCards.includes(i) ? ' el-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="el-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="el-stack-pills">
                    {grp.items.map(item => (
                      <span key={item} className="el-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section id="engagement" className="el-eng-section" aria-labelledby="el-eng-heading">
          <div className="el-inner">
            <div className={`el-s-reveal${visibleSections.has('eng') ? ' el-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="el-s-eyebrow">How We Work With You</span>
              <h2 id="el-eng-heading" className="el-s-title">Engagement Models for eLearning Development</h2>
              <p className="el-s-desc" style={{ maxWidth: 680 }}>Whether you need a fixed-price LMS build, a dedicated EdTech engineering team, or flexible sprint-based collaboration on a growing course platform — we adapt to your project stage and budget.</p>
            </div>
            <div className="el-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`el-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' el-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="el-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="el-eng-icon">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg>
                  </div>
                  <div className="el-eng-name">{m.name}</div>
                  <div className="el-eng-headline">{m.headline}</div>
                  <div className="el-eng-desc">{m.desc}</div>
                  <div className="el-eng-list-label">Best for</div>
                  <ul className="el-eng-list">
                    {m.bestFor.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="el-eng-process">
                    <strong>Process:</strong> {m.process}<br />
                    <span className="el-eng-timeline">{m.timeline}</span>
                  </div>
                  <Link href="#contact" className="el-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="el-process-section" aria-labelledby="el-proc-heading">
          <div className="el-inner" style={{ maxWidth: 760 }}>
            <div className={`el-s-reveal${visibleSections.has('proc') ? ' el-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="el-s-eyebrow">How We Deliver</span>
              <h2 id="el-proc-heading" className="el-s-title">Our eLearning Software Development Process</h2>
              <p className="el-s-desc">A structured six-stage process designed for learner-centric eLearning products — from instructional design requirements to standards-compliance testing and post-launch analytics optimisation.</p>
            </div>
            <div className="el-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`el-pstep${visibleSections.has('proc') ? ' el-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="el-pstep-l">
                    <div className="el-pstep-circle">{step.num}</div>
                    <div className="el-pstep-connector" />
                  </div>
                  <div className="el-pstep-r">
                    <div className="el-pstep-title">{step.title}</div>
                    <p className="el-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="el-testi" aria-labelledby="el-ts-heading">
          <div className="el-inner">
            <div className={`el-center-head el-s-reveal${visibleSections.has('ts') ? ' el-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="el-s-eyebrow">Client Results</span>
              <h2 id="el-ts-heading" className="el-s-title">What Our eLearning Clients Say</h2>
              <p className="el-s-desc">Trusted by EdTech startups, corporate L&amp;D teams, online course providers, and universities across the US, UK, and Australia.</p>
            </div>
            <div className="el-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`el-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' el-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}
                  itemScope itemType="https://schema.org/Review">
                  <div className="el-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="el-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="el-tauthor">
                    <div className="el-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div>
                      <div className="el-tname" itemProp="author">{t.name}</div>
                      <div className="el-trole">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="el-why-section" aria-labelledby="el-wy-heading">
          <div className="el-inner">
            <div className={`el-s-reveal${visibleSections.has('wy') ? ' el-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="el-s-eyebrow">Why 1Solutions</span>
              <h2 id="el-wy-heading" className="el-s-title">Why Choose Us for eLearning Software Development</h2>
              <p className="el-s-desc" style={{ maxWidth: 680 }}>15+ years building eLearning platforms, LMS solutions, and EdTech products — with deep expertise in SCORM/xAPI compliance, adaptive learning, video delivery, and enterprise L&D integration.</p>
            </div>
            <div className="el-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`el-wcard${visibleWhyCards.includes(i) ? ' el-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="el-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="el-contact" aria-labelledby="el-contact-heading">
          <div className="el-contact-grid">
            <div>
              <h2 id="el-contact-heading" className="el-ctitle">Start Your eLearning Software Project</h2>
              <p className="el-cdesc">Tell us about your platform and we will schedule a free 60-minute technical discovery call with a senior eLearning architect. No sales pitch — just clear guidance on the right LMS architecture, compliance approach, and tech stack for your specific learning product.</p>
              <div className="el-cbenefits">
                {[
                  ['✓', 'Free 60-minute discovery call with a senior eLearning software architect'],
                  ['✓', 'Preliminary SCORM/xAPI compliance scoping and LMS architecture advice at no charge'],
                  ['✓', 'Tech stack recommendation — LMS framework, video infrastructure, AI personalisation'],
                  ['✓', 'NDA available on request — your platform idea stays protected'],
                  ['✓', 'Response within 24 business hours from our EdTech engineering team'],
                ].map(([icon, text]) => (
                  <div className="el-cbenefit" key={text}>
                    <span className="el-cbenefit-icon">{icon}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="el-form-box">
              <h3>Tell Us About Your eLearning Project</h3>
              <form className="el-form" onSubmit={e => e.preventDefault()}>
                <div className="el-frow">
                  <div className="el-fg">
                    <label htmlFor="el-name">Full Name *</label>
                    <input id="el-name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="el-fg">
                    <label htmlFor="el-email">Work Email *</label>
                    <input id="el-email" type="email" placeholder="you@company.com" required />
                  </div>
                </div>
                <div className="el-frow">
                  <div className="el-fg">
                    <label htmlFor="el-company">Company / Organisation</label>
                    <input id="el-company" type="text" placeholder="Company name" />
                  </div>
                  <div className="el-fg">
                    <label htmlFor="el-phone">Phone / WhatsApp</label>
                    <input id="el-phone" type="tel" placeholder="+1 555 000 0000" />
                  </div>
                </div>
                <div className="el-fg full">
                  <label htmlFor="el-type">eLearning Project Type *</label>
                  <select id="el-type" required>
                    <option value="">Select project type...</option>
                    <option>Custom LMS Platform</option>
                    <option>Online Course Marketplace</option>
                    <option>Corporate Training Portal / L&D Platform</option>
                    <option>Virtual Classroom / Live Learning</option>
                    <option>Mobile Learning App</option>
                    <option>Adaptive Learning System</option>
                    <option>Gamification Layer / Learner Engagement</option>
                    <option>Assessment & Quiz Engine</option>
                    <option>Content Authoring Tool</option>
                    <option>LMS Migration (Moodle, TalentLMS, etc.)</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="el-fg full">
                  <label htmlFor="el-msg">Project Brief *</label>
                  <textarea id="el-msg" rows={4} placeholder="Describe your eLearning platform — target audience, content types, SCORM/xAPI requirements, integrations needed (HRIS, SSO, payment gateway), expected number of learners, and timeline..." required />
                </div>
                <div className="el-consent">
                  <input id="el-consent" type="checkbox" required />
                  <label htmlFor="el-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. An NDA is available on request to protect your platform idea before our first call.</label>
                </div>
                <button type="submit" className="el-submit">Get Free Discovery Call →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="el-faq" aria-labelledby="el-faq-heading">
          <div className="el-inner" style={{ maxWidth: 860 }}>
            <span className="el-s-eyebrow">FAQ</span>
            <h2 id="el-faq-heading">eLearning Software Development — Frequently Asked Questions</h2>
            <p className="el-faq-sub">Everything you need to know about building SCORM-compliant, scalable eLearning platforms with 1Solutions.</p>
            <div className="el-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`el-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="el-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="el-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="el-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="el-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="el-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="el-related">
          <div className="el-related-inner">
            <span className="el-s-eyebrow">Explore More</span>
            <h2>Related Services &amp; Industries</h2>
            <p className="el-related-sub">We also build software for healthcare, fintech, automotive, IoT, and on-demand platforms.</p>
            <hr />
            <div className="el-rtags">
              {[
                ['/healthcare-software-development/', 'Healthcare Software Development', 'el-rtag-green'],
                ['/fintech-software-development-company/', 'Fintech Software Development', 'el-rtag-violet'],
                ['/automotive-software-solutions/', 'Automotive Software Solutions', 'el-rtag-red'],
                ['/mobile-app-development/', 'Mobile App Development', 'el-rtag-blue'],
                ['/ai-ml-development/', 'AI / ML Development', 'el-rtag-amber'],
                ['/custom-software-development/', 'Custom Software Development', 'el-rtag-teal'],
                ['/react-js-development-company/', 'React.js Development', 'el-rtag-blue'],
                ['/python-development-company/', 'Python Development', 'el-rtag-violet'],
                ['/node-js-development-company/', 'Node.js Development', 'el-rtag-green'],
                ['/saas-development-company/', 'SaaS Development', 'el-rtag-amber'],
              ].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`el-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
