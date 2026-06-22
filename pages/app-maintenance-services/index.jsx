import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Bug Fixing & Crash Resolution', desc: 'Rapid identification and resolution of bugs, crashes, and functional defects — with root cause analysis to prevent recurrence, not just one-time patches.' },
  { n: '02', title: 'iOS & Android OS Update Compatibility', desc: 'Proactive compatibility testing and updates for every major Apple and Google OS release — so your app never breaks after a platform update.' },
  { n: '03', title: 'Performance Monitoring & Optimisation', desc: 'Continuous APM monitoring for crashes, slow responses, memory leaks, and ANRs — with regular optimisation cycles to keep your app fast and stable.' },
  { n: '04', title: 'Security Patches & Vulnerability Management', desc: 'Regular security audits, dependency vulnerability scanning, and prompt patching of identified risks before they become exploits or store rejections.' },
  { n: '05', title: 'Feature Enhancements & Minor Updates', desc: 'Iterative feature improvements, UI tweaks, copy changes, and workflow enhancements — delivered in regular sprints without disrupting app stability.' },
  { n: '06', title: 'Third-Party Integration Updates', desc: 'Keeping your payment gateways, analytics SDKs, social auth, push notification services, and APIs up-to-date as providers release breaking changes.' },
  { n: '07', title: 'App Store Compliance & Re-submission', desc: 'Monitoring and responding to App Store and Google Play policy changes, updating metadata, and managing re-submissions to keep your app live and compliant.' },
  { n: '08', title: 'Database & Backend Maintenance', desc: 'Database optimisation, query performance improvements, server patching, and backend dependency updates to support reliable app performance at scale.' },
];

const PLAN_FEATURES = [
  { label: 'Bug fixes & crash resolution', all: true },
  { label: 'OS update compatibility (iOS & Android)', all: true },
  { label: 'App Store compliance monitoring', all: true },
  { label: 'Monthly performance report', all: true },
  { label: 'Security patches & dependency updates', all: true },
  { label: 'Minor feature enhancements', standard: true, pro: true },
  { label: 'Dedicated account manager', standard: true, pro: true },
  { label: 'SLA-backed response time', pro: true },
  { label: 'Priority bug queue', pro: true },
  { label: 'Quarterly roadmap review', pro: true },
];

const PROCESS = [
  { step: '01', title: 'Onboarding & App Audit', desc: 'We review your codebase, dependencies, CI/CD setup, monitoring tools, and App Store account to establish a full health baseline for your app.' },
  { step: '02', title: 'Monitoring & Alert Setup', desc: 'We instrument crash reporting (Sentry/Firebase), uptime monitoring, and performance baselines — so we know about issues before your users do.' },
  { step: '03', title: 'Scheduled Maintenance Cycles', desc: 'Regular dependency updates, security patches, and OS compatibility checks are batched into planned maintenance windows to minimise disruption.' },
  { step: '04', title: 'Rapid Response for Critical Issues', desc: 'For critical bugs and crashes, we initiate investigation within your SLA window, provide status updates throughout, and push fixes with expedited review.' },
  { step: '05', title: 'Monthly Reporting & Planning', desc: 'A monthly report covering issues resolved, performance trends, upcoming risks, and recommended improvements — keeping you informed and in control.' },
];

const WHY = [
  { title: 'Proactive, Not Reactive', desc: 'We monitor your app continuously and flag emerging issues before they become user-facing problems — not just fix things after customers complain.' },
  { title: 'Original-Code Familiarity', desc: 'If we built your app, we know the codebase inside out. If we\'re taking over an existing app, we conduct a thorough audit before making any changes.' },
  { title: 'No Handoff, No Re-Briefing', desc: 'One dedicated team manages your app throughout its lifetime. No rotating contractors, no re-explaining your context every ticket — just consistent, informed support.' },
  { title: 'Transparent Monthly Reporting', desc: 'You receive a monthly report covering every issue resolved, performance metric, security scan result, and upcoming risk — full visibility, no guesswork.' },
  { title: 'App Store Compliance Experts', desc: 'We track Apple and Google policy changes proactively. When their requirements shift — and they do, regularly — your app is updated before it risks removal.' },
  { title: 'Flexible Plans, No Lock-In', desc: 'Monthly and annual maintenance plans scaled to your app\'s complexity and update frequency. Cancel or adjust at any time — no punitive contracts.' },
];

const FAQS = [
  {
    q: 'What does app maintenance actually include?',
    a: 'App maintenance covers the ongoing work required to keep a live mobile or web application running correctly, securely, and in compliance with platform requirements. This includes: fixing bugs and crashes as they emerge, updating the app for new iOS and Android OS versions, patching third-party dependencies with security vulnerabilities, updating for App Store and Google Play policy changes, monitoring performance and resolving degradations, and making minor functional improvements. Without regular maintenance, apps accumulate technical debt, become vulnerable to security exploits, and risk removal from app stores.',
  },
  {
    q: 'How much does app maintenance cost?',
    a: 'App maintenance costs depend on the app\'s complexity, technology stack, and how many updates are required each month. Simple apps with minimal dependencies typically cost $500–$1,500/month. Mid-complexity apps with integrations, regular feature requests, and backend dependencies range from $1,500–$5,000/month. Enterprise apps with SLA requirements and large codebases can cost $5,000–$15,000/month or more. We offer structured monthly retainer plans based on a standard block of hours — with a clear scope of what\'s included and transparent additional rates for out-of-scope work.',
  },
  {
    q: 'What happens if I don\'t maintain my app?',
    a: 'Neglecting app maintenance has predictable and serious consequences. New iOS and Android versions frequently introduce breaking changes — unattended apps stop working correctly or crash on updated devices. Third-party libraries accumulate known security vulnerabilities that can be exploited. Apple and Google regularly update their review guidelines; apps that don\'t comply are removed from stores without warning. Performance degrades as usage grows and backend dependencies drift. Most critically, user trust erodes rapidly when an app is buggy, slow, or missing from the store entirely.',
  },
  {
    q: 'Can you maintain an app you didn\'t build?',
    a: 'Yes — we regularly take over maintenance of apps built by other developers or agencies. Our onboarding process begins with a thorough technical audit: we review the codebase, identify technical debt, document the architecture, map all third-party integrations, and establish a baseline health score. We then create a remediation plan for any critical issues before moving to ongoing maintenance. We work with React Native, Flutter, native iOS (Swift/Objective-C), native Android (Kotlin/Java), and web apps (React, Next.js, Node.js, Laravel).',
  },
  {
    q: 'What is your response time for critical bugs?',
    a: 'Response times depend on your plan tier. Our Standard plan guarantees acknowledgement within one business day for critical issues. Our Pro plan includes a 4-hour response SLA for critical bugs and crashes — with status updates every 2 hours until resolved. For app-breaking issues that make your app unusable or cause it to be removed from stores, we treat these as P0 emergencies regardless of plan, initiating immediate response and communication. All response time commitments are documented in our service agreement.',
  },
  {
    q: 'How do you handle iOS and Android OS updates?',
    a: 'When Apple or Google announces a major OS release (typically 4–8 weeks before launch), we begin compatibility testing on beta versions. We identify any breaking changes, test the full app functionality on the new OS, and prepare a compatibility update. We aim to have fully compatible updates submitted to app stores before or within the first week of the OS public release. We track Apple\'s SDK deprecation timelines and Google\'s target API level requirements to ensure no compliance-related store removal risks.',
  },
  {
    q: 'Do you provide maintenance for web apps as well as mobile apps?',
    a: 'Yes — we maintain web applications built on React, Next.js, Vue, Angular, Node.js, Laravel, WordPress, and other major frameworks. Web app maintenance includes: dependency updates and security patching, performance monitoring and Core Web Vitals optimisation, server and infrastructure updates, SSL certificate management, database optimisation, and bug fixing. We can maintain both the front-end and back-end of full-stack web applications, and handle both the app and its supporting API if relevant.',
  },
  {
    q: 'Can I scale up my maintenance plan if my needs change?',
    a: 'Yes — our maintenance plans are designed to flex with your needs. You can upgrade your plan at any time if your app grows in complexity, you launch new features, or you need a faster SLA. You can also add one-off development hours outside your monthly block when you have a larger feature request. We review your usage with you monthly and proactively recommend adjustments if your actual needs are consistently above or below your current plan scope. There are no lock-in periods — you can cancel with 30 days\' notice.',
  },
];

const STATS = [
  { label: 'Apps Actively Maintained', val: '200+' },
  { label: 'Uptime SLA', val: '99.9%' },
  { label: 'Avg Response (Critical)', val: '<4 hrs' },
  { label: 'Avg Client Partnership', val: '5+ yrs' },
];

export default function AppMaintenanceServices() {
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
        name: 'App Maintenance & Support Services',
        description: 'Ongoing mobile and web app maintenance — bug fixing, OS updates, security patching, performance monitoring, and App Store compliance. Serving US, Canada & Australia.',
        provider: {
          '@type': 'Organization',
          name: '1Solutions',
          url: 'https://www.1solutions.biz',
          areaServed: ['US', 'CA', 'AU'],
        },
        serviceType: 'Application Maintenance',
        url: 'https://www.1solutions.biz/app-maintenance-services',
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
        <title>App Maintenance & Support Services | Mobile & Web App Maintenance | 1Solutions</title>
        <meta name="description" content="Professional app maintenance services for mobile & web apps. Bug fixes, OS updates, security patches, performance monitoring & App Store compliance. US, Canada & Australia." />
        <meta name="keywords" content="app maintenance services, mobile app maintenance, app support services, react native maintenance, ios android app maintenance, web app maintenance" />
        <link rel="canonical" href="https://www.1solutions.biz/app-maintenance-services" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="App Maintenance & Support Services | 1Solutions" />
        <meta property="og:description" content="Keep your mobile and web apps running flawlessly. Bug fixes, OS compatibility, security patches & App Store compliance — ongoing managed maintenance." />
        <meta property="og:url" content="https://www.1solutions.biz/app-maintenance-services" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style>{`
          .am-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #0F1F40;
            line-height: 1.6;
            overflow-x: hidden;
          }
          .am-page *, .am-page *::before, .am-page *::after { box-sizing: border-box; }

          /* ── Hero ── */
          .am-hero {
            background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 25%, #e0e7ff 55%, #f0f9ff 100%);
            position: relative;
            overflow: hidden;
            padding: 80px 40px 0;
          }
          .am-hero-orb1 {
            position: absolute; top: -100px; right: -100px;
            width: 560px; height: 560px; border-radius: 50%;
            background: radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 65%);
            pointer-events: none; filter: blur(30px);
          }
          .am-hero-orb2 {
            position: absolute; bottom: 0; left: -80px;
            width: 440px; height: 440px; border-radius: 50%;
            background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%);
            pointer-events: none; filter: blur(30px);
          }
          .am-hero-inner {
            max-width: 1280px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            text-align: center;
          }
          .am-breadcrumb {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 6px;
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 24px;
            font-weight: 500;
          }
          .am-breadcrumb a { color: #6b7280; text-decoration: none; }
          .am-breadcrumb a:hover { color: #6D28D9; }
          .am-breadcrumb span { color: #d1d5db; }
          .am-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(109,40,217,0.07);
            border: 1px solid rgba(109,40,217,0.18);
            border-radius: 100px;
            padding: 5px 14px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #6D28D9;
            margin-bottom: 28px;
          }
          .am-hero-h1 {
            font-size: clamp(2.2rem, 5vw, 3.5rem);
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: -1px;
            background: linear-gradient(90deg, #0F3460 0%, #6D28D9 50%, #4F46E5 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
          }
          .am-hero-sub {
            font-size: 1.08rem;
            color: #4A6080;
            line-height: 1.75;
            max-width: 660px;
            margin: 0 auto 36px;
          }
          .am-hero-btns {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 56px;
          }
          .am-btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #6D28D9;
            color: #fff;
            padding: 14px 30px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.25s;
            box-shadow: 0 4px 20px rgba(109,40,217,0.28);
          }
          .am-btn-primary:hover {
            background: #5B21B6;
            box-shadow: 0 8px 32px rgba(109,40,217,0.38);
            transform: translateY(-2px);
          }
          .am-btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.65);
            backdrop-filter: blur(12px);
            border: 1.5px solid rgba(15,52,96,0.18);
            color: #0F3460;
            padding: 14px 30px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.25s;
          }
          .am-btn-secondary:hover { border-color: #6D28D9; color: #6D28D9; transform: translateY(-2px); }
          .am-stats-bar {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            max-width: 900px;
            margin: 0 auto;
            background: rgba(255,255,255,0.55);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.85);
            border-radius: 20px 20px 0 0;
            box-shadow: 0 4px 24px rgba(109,40,217,0.07);
          }
          .am-stat { padding: 20px 24px; text-align: center; border-right: 1px solid rgba(109,40,217,0.08); }
          .am-stat:last-child { border-right: none; }
          .am-stat-label { font-size: 11px; color: #6b7280; font-weight: 500; margin-bottom: 4px; }
          .am-stat-val { font-size: 1.6rem; font-weight: 900; color: #6D28D9; letter-spacing: -0.5px; }

          /* ── Services ── */
          .am-services-section { background: #f8fafd; padding: 80px 40px; box-shadow: 0 -20px 60px rgba(109,40,217,0.06); }
          .am-services-inner { max-width: 1280px; margin: 0 auto; }
          .am-section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #6D28D9; margin-bottom: 10px; display: block; }
          .am-section-title { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; line-height: 1.15; letter-spacing: -1px; background: linear-gradient(90deg, #0F3460 0%, #6D28D9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px; }
          .am-section-desc { font-size: 15px; color: #4A6080; line-height: 1.7; max-width: 640px; margin-bottom: 44px; }
          .am-services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
          .am-service-card {
            background: linear-gradient(135deg, rgba(245,243,255,0.65) 0%, rgba(255,255,255,0.88) 60%, rgba(224,231,255,0.45) 100%);
            border: 1px solid rgba(255,255,255,0.85);
            border-radius: 20px;
            padding: 26px 22px 22px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(109,40,217,0.05);
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.22s, border-color 0.22s;
          }
          .am-service-card.visible { opacity: 1; transform: translateY(0); }
          .am-service-card:hover { transform: translateY(-6px); border-color: rgba(109,40,217,0.25); box-shadow: 0 16px 48px rgba(109,40,217,0.10); }
          .am-card-num { position: absolute; top: 8px; right: 14px; font-size: 72px; font-weight: 900; line-height: 1; color: #6D28D9; opacity: 0.05; letter-spacing: -4px; pointer-events: none; user-select: none; }
          .am-service-card h3 { font-size: 15px; font-weight: 700; color: #0F1F40; line-height: 1.3; margin-bottom: 8px; position: relative; z-index: 1; }
          .am-service-card p { font-size: 13px; color: #4A6080; line-height: 1.6; position: relative; z-index: 1; margin: 0; }

          /* ── Process ── */
          .am-process-section { background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 40%, #e0e7ff 100%); padding: 80px 40px; }
          .am-process-inner { max-width: 900px; margin: 0 auto; }
          .am-process-steps { display: flex; flex-direction: column; margin-top: 44px; }
          .am-process-step {
            display: grid;
            grid-template-columns: 80px 1fr;
            gap: 24px;
            align-items: flex-start;
            padding: 28px 0;
            border-bottom: 1px solid rgba(109,40,217,0.10);
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.45s ease, transform 0.45s ease;
          }
          .am-process-step:last-child { border-bottom: none; }
          .am-process-step.visible { opacity: 1; transform: translateX(0); }
          .am-step-num { font-size: 3rem; font-weight: 900; color: rgba(109,40,217,0.15); line-height: 1; letter-spacing: -2px; }
          .am-step-body h3 { font-size: 1.1rem; font-weight: 800; color: #0F1F40; margin-bottom: 6px; }
          .am-step-body p { font-size: 0.9rem; color: #4A6080; line-height: 1.7; margin: 0; }

          /* ── Why Us ── */
          .am-why-section { background: #fff; padding: 80px 40px; }
          .am-why-inner { max-width: 1280px; margin: 0 auto; }
          .am-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 44px; }
          .am-why-card {
            background: linear-gradient(135deg, #f5f3ff 0%, #fff 60%, #e0e7ff 100%);
            border: 1px solid rgba(109,40,217,0.10);
            border-radius: 16px;
            padding: 28px;
            opacity: 0;
            transform: translateY(16px);
            transition: opacity 0.4s ease, transform 0.4s ease;
          }
          .am-why-card.visible { opacity: 1; transform: translateY(0); }
          .am-why-card:hover { border-color: rgba(109,40,217,0.22); box-shadow: 0 8px 32px rgba(109,40,217,0.07); }
          .am-why-dot { width: 8px; height: 8px; border-radius: 50%; background: #6D28D9; margin-bottom: 16px; }
          .am-why-card h3 { font-size: 1rem; font-weight: 800; color: #0F1F40; margin-bottom: 10px; }
          .am-why-card p { font-size: 0.88rem; color: #4A6080; line-height: 1.7; margin: 0; }

          /* ── FAQs ── */
          .am-faq-section { background: #f8fafd; padding: 80px 40px; }
          .am-faq-inner { max-width: 860px; margin: 0 auto; }
          .am-faq-list { margin-top: 44px; }
          .am-faq-item { border-bottom: 1px solid #e5e7eb; }
          .am-faq-q { width: 100%; background: none; border: none; text-align: left; padding: 22px 0; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; cursor: pointer; font-family: inherit; font-size: 1rem; font-weight: 700; color: #0F1F40; line-height: 1.4; }
          .am-faq-q:hover { color: #6D28D9; }
          .am-faq-icon { width: 22px; height: 22px; border: 2px solid #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; color: #9ca3af; transition: all 0.2s; margin-top: 2px; }
          .am-faq-item.open .am-faq-icon { border-color: #6D28D9; color: #6D28D9; background: rgba(109,40,217,0.06); }
          .am-faq-a { font-size: 0.92rem; color: #4A6080; line-height: 1.8; overflow: hidden; max-height: 0; transition: max-height 0.35s ease, padding-bottom 0.35s ease; }
          .am-faq-item.open .am-faq-a { max-height: 500px; padding-bottom: 22px; }

          /* ── CTA ── */
          .am-cta-section { background: linear-gradient(135deg, rgba(109,40,217,0.06) 0%, rgba(255,255,255,0.80) 40%, rgba(99,102,241,0.05) 100%); padding: 90px 40px; position: relative; overflow: hidden; }
          .am-cta-orb1 { position: absolute; top: -80px; right: -80px; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(109,40,217,0.10) 0%, transparent 70%); pointer-events: none; }
          .am-cta-orb2 { position: absolute; bottom: -60px; left: -60px; width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%); pointer-events: none; }
          .am-cta-inner { max-width: 760px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
          .am-cta-title { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900; background: linear-gradient(90deg, #0F3460 0%, #6D28D9 50%, #4F46E5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 16px; line-height: 1.2; }
          .am-cta-sub { font-size: 1.05rem; color: #4A6080; line-height: 1.75; margin: 0 auto 36px; max-width: 520px; }
          .am-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

          /* ── Responsive ── */
          @media (max-width: 1024px) {
            .am-services-grid { grid-template-columns: repeat(2, 1fr); }
            .am-why-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 768px) {
            .am-hero { padding: 60px 24px 0; }
            .am-services-section, .am-process-section, .am-why-section,
            .am-faq-section, .am-cta-section { padding: 60px 24px; }
            .am-stats-bar { grid-template-columns: repeat(2, 1fr); border-radius: 16px 16px 0 0; }
            .am-stat:nth-child(2) { border-right: none; }
            .am-services-grid { grid-template-columns: 1fr; }
            .am-why-grid { grid-template-columns: 1fr; }
            .am-process-step { grid-template-columns: 56px 1fr; }
            .am-hero-btns { flex-direction: column; align-items: center; }
          }
        `}</style>
      </Head>

      <div className="am-page">

        {/* ── HERO ── */}
        <section className="am-hero">
          <div className="am-hero-orb1" />
          <div className="am-hero-orb2" />
          <div className="am-hero-inner">
            <nav className="am-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span>Mobile Development</span>
              <span>/</span>
              <span style={{ color: '#6D28D9' }}>App Maintenance</span>
            </nav>
            <span className="am-eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6D28D9', display: 'inline-block' }} />
              Mobile Development
            </span>
            <h1 className="am-hero-h1">
              App Maintenance &amp; Support Services That Keep Your App Running Flawlessly
            </h1>
            <p className="am-hero-sub">
              Proactive maintenance plans for mobile and web apps — bug fixing, OS compatibility, security patching, performance monitoring, and App Store compliance. Built for businesses that can&rsquo;t afford downtime.
            </p>
            <div className="am-hero-btns">
              <Link href="/contact" className="am-btn-primary">
                Get a Maintenance Plan
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/website-support-maintenance-services" className="am-btn-secondary">
                See Website Maintenance
              </Link>
            </div>
            <div className="am-stats-bar">
              {STATS.map(s => (
                <div key={s.label} className="am-stat">
                  <div className="am-stat-label">{s.label}</div>
                  <div className="am-stat-val">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="am-services-section">
          <div className="am-services-inner">
            <span className="am-section-eyebrow">What&apos;s Covered</span>
            <h2 className="am-section-title">App Maintenance Services</h2>
            <p className="am-section-desc">
              Every aspect of ongoing app health — from critical bug fixes and security patches to feature improvements and App Store compliance — managed under one retainer.
            </p>
            <div className="am-services-grid" ref={cardsRef}>
              {SERVICES.map((s, i) => (
                <div key={s.n} className={`am-service-card${visibleCards.includes(i) ? ' visible' : ''}`}>
                  <div className="am-card-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="am-process-section">
          <div className="am-process-inner">
            <span className="am-section-eyebrow">How We Work</span>
            <h2 className="am-section-title">Our Maintenance Process</h2>
            <p className="am-section-desc">
              A structured onboarding process, ongoing monitoring, and a predictable monthly rhythm — so your app gets consistent care, not just reactive fixes.
            </p>
            <div className="am-process-steps">
              {PROCESS.map((p, i) => (
                <div
                  key={p.step}
                  ref={el => { stepRefs.current[i] = el; }}
                  className={`am-process-step${visibleSteps.includes(i) ? ' visible' : ''}`}
                >
                  <div className="am-step-num">{p.step}</div>
                  <div className="am-step-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="am-why-section">
          <div className="am-why-inner">
            <span className="am-section-eyebrow">Why 1Solutions</span>
            <h2 className="am-section-title">Why Businesses Trust Us With Their Apps</h2>
            <p className="am-section-desc">
              App maintenance is a long-term partnership — not a ticket queue. Here&rsquo;s what makes our approach different.
            </p>
            <div className="am-why-grid" ref={whyRef}>
              {WHY.map((w, i) => (
                <div key={w.title} className={`am-why-card${visibleWhy.includes(i) ? ' visible' : ''}`}>
                  <div className="am-why-dot" />
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className="am-faq-section">
          <div className="am-faq-inner">
            <span className="am-section-eyebrow">Common Questions</span>
            <h2 className="am-section-title">App Maintenance FAQs</h2>
            <p className="am-section-desc">
              Everything you need to know about keeping your app healthy, compliant, and growing long after launch.
            </p>
            <div className="am-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`am-faq-item${openFaq === i ? ' open' : ''}`}>
                  <button className="am-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    {f.q}
                    <span className="am-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="am-faq-a" style={openFaq === i ? { maxHeight: 500, paddingBottom: 22 } : {}}>
                    {f.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="am-cta-section">
          <div className="am-cta-orb1" />
          <div className="am-cta-orb2" />
          <div className="am-cta-inner">
            <span className="am-section-eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: 16 }}>Get Protected</span>
            <h2 className="am-cta-title">
              Don&rsquo;t Let Your App Go Dark After Launch
            </h2>
            <p className="am-cta-sub">
              Get a free app health audit — we&rsquo;ll review your current app, identify risks, and recommend the right maintenance plan for your needs. No commitment required.
            </p>
            <div className="am-cta-btns">
              <Link href="/contact" className="am-btn-primary">
                Get a Free App Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/react-native-app-development" className="am-btn-secondary">
                Build a New App
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
