import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Custom React Native App Development', desc: 'Fully bespoke iOS and Android apps from a single codebase — built to your exact specification with native look, feel, and performance.' },
  { n: '02', title: 'Cross-Platform App Strategy & Architecture', desc: 'Platform selection, component architecture, state management patterns, and navigation design scoped before a line of code is written.' },
  { n: '03', title: 'iOS & Android Simultaneous Deployment', desc: 'One codebase, two stores. We develop, test, and submit to both the Apple App Store and Google Play in a single development cycle.' },
  { n: '04', title: 'React Native UI/UX Design', desc: 'Mobile-first interfaces designed around touch interaction, platform conventions, and accessibility — not desktop layouts shrunk to a screen.' },
  { n: '05', title: 'Legacy App Migration to React Native', desc: 'Migrate your existing native iOS or Android app — or web app — to React Native, preserving features while dramatically reducing future maintenance cost.' },
  { n: '06', title: 'Third-Party API & SDK Integration', desc: 'Payments (Stripe, PayPal), maps, analytics, social auth, push notifications, CRMs — we connect your app to the services your users expect.' },
  { n: '07', title: 'Performance Optimisation', desc: 'Profiling, render optimisation, lazy loading, memory management, and bundle size reduction to ensure your app feels fast on every device.' },
  { n: '08', title: 'App Store Submission & Publishing', desc: 'Full App Store and Google Play submission — screenshots, metadata, ratings optimisation, compliance review, and rejection resolution.' },
];

const CAPABILITIES = [
  'React Native CLI & Expo', 'iOS (Swift/Obj-C bridges)', 'Android (Kotlin/Java bridges)',
  'Redux & Zustand', 'React Navigation', 'REST & GraphQL APIs',
  'Firebase', 'Push Notifications', 'Offline-First Architecture',
  'Biometric Auth', 'Stripe & PayPal', 'App Store Optimisation',
];

const PROCESS = [
  { step: '01', title: 'Discovery & Product Definition', desc: 'We map your user journeys, define core features, agree on tech stack, and produce a detailed functional specification before development begins.' },
  { step: '02', title: 'UI/UX Design & Prototype', desc: 'High-fidelity mobile designs reviewed and approved before engineering starts — ensuring the build matches expectations and reducing costly rework.' },
  { step: '03', title: 'Agile Development in Sprints', desc: 'Two-week sprints with demo-ready builds at each milestone. You see working software early and often — not just at the end.' },
  { step: '04', title: 'QA, Device Testing & Beta', desc: 'Testing on real iOS and Android devices across screen sizes, OS versions, and edge-case user flows before any public release.' },
  { step: '05', title: 'Launch, Monitor & Iterate', desc: 'App store submission, post-launch monitoring, crash reporting, and a structured iteration cycle to improve based on real user behaviour.' },
];

const WHY = [
  { title: 'React Native Specialists', desc: 'We\'ve been building React Native apps since the framework\'s early days. Our team lives in the ecosystem — we know its strengths, its edge cases, and how to get the best out of it.' },
  { title: '40% Lower Cost Than Dual Native', desc: 'A single React Native codebase covering iOS and Android typically costs 40–60% less than building two separate native apps — without compromising on performance or UX quality.' },
  { title: 'Design & Engineering Under One Roof', desc: 'UI/UX design and React Native development both sit within our team. No third-party handoffs, no design-dev translation loss — faster delivery, better results.' },
  { title: 'US, Canada & Australia Focused', desc: 'We know the App Store and Google Play requirements, WCAG accessibility standards, and user expectations of western markets. Not generic global output.' },
  { title: 'Post-Launch Support Included', desc: 'Every app we build includes a 30-day hypercare period post-launch. Bug fixes, monitoring, and minor adjustments — at no extra cost while you stabilise.' },
  { title: '15+ Years of Product Delivery', desc: 'Since 2008, we\'ve shipped 500+ digital products. Our project management, communication cadence, and quality controls are battle-tested across hundreds of client engagements.' },
];

const FAQS = [
  {
    q: 'What is React Native and why is it a good choice for mobile app development?',
    a: 'React Native is an open-source framework by Meta that lets developers build iOS and Android apps from a single JavaScript codebase. Unlike hybrid webview apps (Cordova, Ionic), React Native renders truly native UI components — so the app feels and performs like a native app on both platforms. The key advantages for businesses: significantly lower development and maintenance cost compared to building two separate native apps, faster time to market, and a large talent pool. It\'s used in production by Facebook, Instagram, Microsoft, Shopify, and thousands of other companies.',
  },
  {
    q: 'How much does React Native app development cost?',
    a: 'React Native app costs vary based on complexity. A simple utility app (5–10 screens, basic API integration) typically starts from $15,000–$30,000. A mid-complexity app with user accounts, real-time features, payment integration, and admin dashboard ranges from $30,000–$80,000. Complex apps with marketplace features, AR/ML, or extensive third-party integrations can exceed $100,000. We provide a detailed fixed-price quote after a free discovery call — with full scope documentation so there are no surprises.',
  },
  {
    q: 'How long does it take to build a React Native app?',
    a: 'A simple React Native app takes 8–14 weeks from kick-off to App Store submission. Mid-complexity apps with social features, payments, and custom backend take 16–24 weeks. Complex apps take 6–12 months. We use two-week sprints with demo-ready builds at each milestone — so you see working software early and can provide feedback throughout. App Store review itself takes 1–3 business days for first submissions, longer if changes are requested.',
  },
  {
    q: 'Can React Native apps access native device features like camera, GPS, and biometrics?',
    a: 'Yes — React Native provides access to all major native device APIs via modules: camera, GPS/location, biometric authentication (Face ID, Touch ID), push notifications, accelerometer, Bluetooth, NFC, and more. For capabilities not covered by the React Native core, we use well-maintained community libraries or write custom native modules in Swift (iOS) and Kotlin (Android) that bridge to the React Native layer. There is effectively no native device capability that React Native cannot access.',
  },
  {
    q: 'What is the difference between React Native CLI and Expo?',
    a: 'Expo is a toolset built on top of React Native that simplifies setup and provides managed workflows — great for simpler apps and rapid prototyping. React Native CLI gives full control over native code, which is necessary for custom native modules, complex integrations, and performance-critical apps. For most production-quality apps with third-party SDK integrations (payments, analytics, custom cameras), we use React Native CLI. We choose the right approach based on your app\'s requirements during the discovery phase.',
  },
  {
    q: 'Can you migrate my existing native iOS or Android app to React Native?',
    a: 'Yes — we have specific experience in React Native migrations. We assess your existing app\'s feature set, identify which screens and functionality are good candidates for cross-platform migration, and plan a phased approach that lets you maintain your current app for existing users while the new React Native version is built. We preserve your app\'s existing App Store and Google Play presence, ratings, and reviews. Most migrations are delivered in 3–6 months depending on app complexity.',
  },
  {
    q: 'Do you handle App Store and Google Play submission?',
    a: 'Yes — we manage the full submission process for both platforms. This includes preparing screenshots and preview videos for each device size, writing App Store descriptions and keyword-optimised metadata, setting age ratings and content categories, creating privacy policy links and data usage declarations, and resolving any rejection issues with Apple or Google\'s review teams. We also advise on App Store Optimisation (ASO) strategies to improve organic discovery after launch.',
  },
  {
    q: 'Do you provide ongoing support and maintenance after the app launches?',
    a: 'Yes — we offer structured post-launch support through our App Maintenance retainer plans. All new apps include a complimentary 30-day hypercare period for bug fixes and minor adjustments. Beyond that, our maintenance plans cover: iOS and Android OS update compatibility, React Native version upgrades, bug fixing, performance monitoring, third-party library updates, and App Store compliance as Apple and Google update their requirements. Maintenance is recommended for all live apps — platform requirements change frequently and unattended apps can be removed from stores.',
  },
];

const STATS = [
  { label: 'Apps Built & Shipped', val: '100+' },
  { label: 'Avg App Store Rating', val: '4.8★' },
  { label: 'Cost Saving vs Dual Native', val: '~40%' },
  { label: 'On-Time Delivery Rate', val: '96%' },
];

export default function ReactNativeAppDevelopment() {
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
        name: 'React Native App Development Services',
        description: 'Custom cross-platform iOS and Android app development using React Native. From concept to App Store — UI/UX design, development, integration, and launch.',
        provider: {
          '@type': 'Organization',
          name: '1Solutions',
          url: 'https://www.1solutions.biz',
          areaServed: ['US', 'CA', 'AU'],
        },
        serviceType: 'Mobile App Development',
        url: 'https://www.1solutions.biz/react-native-app-development',
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
        <title>React Native App Development Services | Cross-Platform iOS & Android | 1Solutions</title>
        <meta name="description" content="Expert React Native app development for iOS & Android from a single codebase. Custom cross-platform mobile apps — design, development, integration & App Store launch. US, Canada & Australia." />
        <meta name="keywords" content="react native app development, react native development company, cross platform app development, react native ios android, react native agency, mobile app development" />
        <link rel="canonical" href="https://www.1solutions.biz/react-native-app-development" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="React Native App Development Services | 1Solutions" />
        <meta property="og:description" content="Custom iOS & Android apps from a single React Native codebase. 40% lower cost, same native performance. US, Canada & Australia." />
        <meta property="og:url" content="https://www.1solutions.biz/react-native-app-development" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style>{`
          .rn-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #0F1F40;
            line-height: 1.6;
            overflow-x: hidden;
          }
          .rn-page *, .rn-page *::before, .rn-page *::after { box-sizing: border-box; }

          /* ── Hero ── */
          .rn-hero {
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 25%, #fff7ed 55%, #eff6ff 100%);
            position: relative;
            overflow: hidden;
            padding: 80px 40px 0;
          }
          .rn-hero-orb1 {
            position: absolute; top: -100px; right: -100px;
            width: 560px; height: 560px; border-radius: 50%;
            background: radial-gradient(circle, rgba(245,158,11,0.14) 0%, transparent 65%);
            pointer-events: none; filter: blur(30px);
          }
          .rn-hero-orb2 {
            position: absolute; bottom: 0; left: -80px;
            width: 440px; height: 440px; border-radius: 50%;
            background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 65%);
            pointer-events: none; filter: blur(30px);
          }
          .rn-hero-inner {
            max-width: 1280px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            text-align: center;
          }
          .rn-breadcrumb {
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
          .rn-breadcrumb a { color: #6b7280; text-decoration: none; }
          .rn-breadcrumb a:hover { color: #D97706; }
          .rn-breadcrumb span { color: #d1d5db; }
          .rn-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(245,158,11,0.08);
            border: 1px solid rgba(245,158,11,0.22);
            border-radius: 100px;
            padding: 5px 14px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #D97706;
            margin-bottom: 28px;
          }
          .rn-hero-h1 {
            font-size: clamp(2.2rem, 5vw, 3.6rem);
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: -1px;
            background: linear-gradient(90deg, #0F3460 0%, #D97706 50%, #3B82F6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            max-width: 920px;
            margin-left: auto;
            margin-right: auto;
          }
          .rn-hero-sub {
            font-size: 1.08rem;
            color: #4A6080;
            line-height: 1.75;
            max-width: 660px;
            margin: 0 auto 36px;
          }
          .rn-hero-btns {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 56px;
          }
          .rn-btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #D97706;
            color: #fff;
            padding: 14px 30px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.25s;
            box-shadow: 0 4px 20px rgba(217,119,6,0.28);
          }
          .rn-btn-primary:hover {
            background: #B45309;
            box-shadow: 0 8px 32px rgba(217,119,6,0.38);
            transform: translateY(-2px);
          }
          .rn-btn-secondary {
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
          .rn-btn-secondary:hover {
            border-color: #D97706;
            color: #D97706;
            transform: translateY(-2px);
          }
          .rn-stats-bar {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            max-width: 900px;
            margin: 0 auto;
            background: rgba(255,255,255,0.55);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.85);
            border-radius: 20px 20px 0 0;
            box-shadow: 0 4px 24px rgba(217,119,6,0.07);
          }
          .rn-stat { padding: 20px 24px; text-align: center; border-right: 1px solid rgba(217,119,6,0.08); }
          .rn-stat:last-child { border-right: none; }
          .rn-stat-label { font-size: 11px; color: #6b7280; font-weight: 500; margin-bottom: 4px; }
          .rn-stat-val { font-size: 1.6rem; font-weight: 900; color: #D97706; letter-spacing: -0.5px; }

          /* ── Services ── */
          .rn-services-section { background: #f8fafd; padding: 80px 40px; box-shadow: 0 -20px 60px rgba(217,119,6,0.06); }
          .rn-services-inner { max-width: 1280px; margin: 0 auto; }
          .rn-section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #D97706; margin-bottom: 10px; display: block; }
          .rn-section-title { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; line-height: 1.15; letter-spacing: -1px; background: linear-gradient(90deg, #0F3460 0%, #D97706 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px; }
          .rn-section-desc { font-size: 15px; color: #4A6080; line-height: 1.7; max-width: 640px; margin-bottom: 44px; }
          .rn-services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
          .rn-service-card {
            background: linear-gradient(135deg, rgba(255,251,235,0.65) 0%, rgba(255,255,255,0.88) 60%, rgba(239,246,255,0.45) 100%);
            border: 1px solid rgba(255,255,255,0.85);
            border-radius: 20px;
            padding: 26px 22px 22px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(217,119,6,0.05);
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.22s, border-color 0.22s;
          }
          .rn-service-card.visible { opacity: 1; transform: translateY(0); }
          .rn-service-card:hover { transform: translateY(-6px); border-color: rgba(217,119,6,0.28); box-shadow: 0 16px 48px rgba(217,119,6,0.10); }
          .rn-card-num { position: absolute; top: 8px; right: 14px; font-size: 72px; font-weight: 900; line-height: 1; color: #D97706; opacity: 0.05; letter-spacing: -4px; pointer-events: none; user-select: none; }
          .rn-service-card h3 { font-size: 15px; font-weight: 700; color: #0F1F40; line-height: 1.3; margin-bottom: 8px; position: relative; z-index: 1; }
          .rn-service-card p { font-size: 13px; color: #4A6080; line-height: 1.6; position: relative; z-index: 1; margin: 0; }

          /* ── Capabilities ── */
          .rn-cap-section { background: #fff; padding: 70px 40px; }
          .rn-cap-inner { max-width: 1280px; margin: 0 auto; }
          .rn-cap-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 36px; }
          .rn-cap-pill {
            background: #fffbeb;
            border: 1.5px solid rgba(217,119,6,0.18);
            border-radius: 50px;
            padding: 8px 18px;
            font-size: 13px;
            font-weight: 600;
            color: #92400E;
            transition: all 0.2s;
          }
          .rn-cap-pill:hover { background: #fef3c7; border-color: #D97706; transform: translateY(-2px); }

          /* ── Process ── */
          .rn-process-section { background: linear-gradient(135deg, #fffbeb 0%, #fff7ed 50%, #eff6ff 100%); padding: 80px 40px; }
          .rn-process-inner { max-width: 900px; margin: 0 auto; }
          .rn-process-steps { display: flex; flex-direction: column; margin-top: 44px; }
          .rn-process-step {
            display: grid;
            grid-template-columns: 80px 1fr;
            gap: 24px;
            align-items: flex-start;
            padding: 28px 0;
            border-bottom: 1px solid rgba(217,119,6,0.10);
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.45s ease, transform 0.45s ease;
          }
          .rn-process-step:last-child { border-bottom: none; }
          .rn-process-step.visible { opacity: 1; transform: translateX(0); }
          .rn-step-num { font-size: 3rem; font-weight: 900; color: rgba(217,119,6,0.15); line-height: 1; letter-spacing: -2px; }
          .rn-step-body h3 { font-size: 1.1rem; font-weight: 800; color: #0F1F40; margin-bottom: 6px; }
          .rn-step-body p { font-size: 0.9rem; color: #4A6080; line-height: 1.7; margin: 0; }

          /* ── Why Us ── */
          .rn-why-section { background: #fff; padding: 80px 40px; }
          .rn-why-inner { max-width: 1280px; margin: 0 auto; }
          .rn-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 44px; }
          .rn-why-card {
            background: linear-gradient(135deg, #fffbeb 0%, #fff 60%, #eff6ff 100%);
            border: 1px solid rgba(217,119,6,0.10);
            border-radius: 16px;
            padding: 28px;
            opacity: 0;
            transform: translateY(16px);
            transition: opacity 0.4s ease, transform 0.4s ease;
          }
          .rn-why-card.visible { opacity: 1; transform: translateY(0); }
          .rn-why-card:hover { border-color: rgba(217,119,6,0.25); box-shadow: 0 8px 32px rgba(217,119,6,0.08); }
          .rn-why-dot { width: 8px; height: 8px; border-radius: 50%; background: #D97706; margin-bottom: 16px; }
          .rn-why-card h3 { font-size: 1rem; font-weight: 800; color: #0F1F40; margin-bottom: 10px; }
          .rn-why-card p { font-size: 0.88rem; color: #4A6080; line-height: 1.7; margin: 0; }

          /* ── FAQs ── */
          .rn-faq-section { background: #f8fafd; padding: 80px 40px; }
          .rn-faq-inner { max-width: 860px; margin: 0 auto; }
          .rn-faq-list { margin-top: 44px; }
          .rn-faq-item { border-bottom: 1px solid #e5e7eb; }
          .rn-faq-q { width: 100%; background: none; border: none; text-align: left; padding: 22px 0; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; cursor: pointer; font-family: inherit; font-size: 1rem; font-weight: 700; color: #0F1F40; line-height: 1.4; }
          .rn-faq-q:hover { color: #D97706; }
          .rn-faq-icon { width: 22px; height: 22px; border: 2px solid #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; color: #9ca3af; transition: all 0.2s; margin-top: 2px; }
          .rn-faq-item.open .rn-faq-icon { border-color: #D97706; color: #D97706; background: rgba(217,119,6,0.06); }
          .rn-faq-a { font-size: 0.92rem; color: #4A6080; line-height: 1.8; overflow: hidden; max-height: 0; transition: max-height 0.35s ease, padding-bottom 0.35s ease; }
          .rn-faq-item.open .rn-faq-a { max-height: 500px; padding-bottom: 22px; }

          /* ── CTA ── */
          .rn-cta-section { background: linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(255,255,255,0.80) 40%, rgba(59,130,246,0.04) 100%); padding: 90px 40px; position: relative; overflow: hidden; }
          .rn-cta-orb1 { position: absolute; top: -80px; right: -80px; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%); pointer-events: none; }
          .rn-cta-orb2 { position: absolute; bottom: -60px; left: -60px; width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%); pointer-events: none; }
          .rn-cta-inner { max-width: 760px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
          .rn-cta-title { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900; background: linear-gradient(90deg, #0F3460 0%, #D97706 50%, #3B82F6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 16px; line-height: 1.2; }
          .rn-cta-sub { font-size: 1.05rem; color: #4A6080; line-height: 1.75; margin: 0 auto 36px; max-width: 520px; }
          .rn-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

          /* ── Responsive ── */
          @media (max-width: 1024px) {
            .rn-services-grid { grid-template-columns: repeat(2, 1fr); }
            .rn-why-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 768px) {
            .rn-hero { padding: 60px 24px 0; }
            .rn-services-section, .rn-cap-section, .rn-process-section,
            .rn-why-section, .rn-faq-section, .rn-cta-section { padding: 60px 24px; }
            .rn-stats-bar { grid-template-columns: repeat(2, 1fr); border-radius: 16px 16px 0 0; }
            .rn-stat:nth-child(2) { border-right: none; }
            .rn-services-grid { grid-template-columns: 1fr; }
            .rn-why-grid { grid-template-columns: 1fr; }
            .rn-process-step { grid-template-columns: 56px 1fr; }
            .rn-hero-btns { flex-direction: column; align-items: center; }
          }
        `}</style>
      </Head>

      <div className="rn-page">

        {/* ── HERO ── */}
        <section className="rn-hero">
          <div className="rn-hero-orb1" />
          <div className="rn-hero-orb2" />
          <div className="rn-hero-inner">
            <nav className="rn-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span>Mobile Development</span>
              <span>/</span>
              <span style={{ color: '#D97706' }}>React Native</span>
            </nav>
            <span className="rn-eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D97706', display: 'inline-block' }} />
              Cross-Platform Mobile Apps
            </span>
            <h1 className="rn-hero-h1">
              React Native App Development for iOS &amp; Android
            </h1>
            <p className="rn-hero-sub">
              One codebase, two platforms, native performance. We build custom React Native apps for startups and established businesses across the US, Canada, and Australia — from concept to App Store launch.
            </p>
            <div className="rn-hero-btns">
              <Link href="/contact-us" className="rn-btn-primary">
                Get a Free App Consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/ios-app-development-company" className="rn-btn-secondary">
                Explore Mobile Services
              </Link>
            </div>
            <div className="rn-stats-bar">
              {STATS.map(s => (
                <div key={s.label} className="rn-stat">
                  <div className="rn-stat-label">{s.label}</div>
                  <div className="rn-stat-val">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="rn-services-section">
          <div className="rn-services-inner">
            <span className="rn-section-eyebrow">What We Deliver</span>
            <h2 className="rn-section-title">React Native Development Services</h2>
            <p className="rn-section-desc">
              Everything from initial architecture through to App Store submission — handled by a single team that specialises in React Native cross-platform development.
            </p>
            <div className="rn-services-grid" ref={cardsRef}>
              {SERVICES.map((s, i) => (
                <div key={s.n} className={`rn-service-card${visibleCards.includes(i) ? ' visible' : ''}`}>
                  <div className="rn-card-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CAPABILITIES ── */}
        <section className="rn-cap-section">
          <div className="rn-cap-inner">
            <span className="rn-section-eyebrow">Tech Stack</span>
            <h2 className="rn-section-title">Technologies &amp; Capabilities</h2>
            <p className="rn-section-desc">
              Our React Native team works with the full ecosystem of tools, libraries, and native integrations needed to build production-quality mobile apps.
            </p>
            <div className="rn-cap-grid">
              {CAPABILITIES.map(c => (
                <span key={c} className="rn-cap-pill">{c}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="rn-process-section">
          <div className="rn-process-inner">
            <span className="rn-section-eyebrow">How We Work</span>
            <h2 className="rn-section-title">Our App Development Process</h2>
            <p className="rn-section-desc">
              A transparent, milestone-driven process that keeps you in control of the build — with working software at every stage, not just at the end.
            </p>
            <div className="rn-process-steps">
              {PROCESS.map((p, i) => (
                <div
                  key={p.step}
                  ref={el => { stepRefs.current[i] = el; }}
                  className={`rn-process-step${visibleSteps.includes(i) ? ' visible' : ''}`}
                >
                  <div className="rn-step-num">{p.step}</div>
                  <div className="rn-step-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="rn-why-section">
          <div className="rn-why-inner">
            <span className="rn-section-eyebrow">Why 1Solutions</span>
            <h2 className="rn-section-title">Why Choose Us for React Native</h2>
            <p className="rn-section-desc">
              React Native development is only as good as the team behind it. Here&rsquo;s what makes us a safe choice for your mobile app investment.
            </p>
            <div className="rn-why-grid" ref={whyRef}>
              {WHY.map((w, i) => (
                <div key={w.title} className={`rn-why-card${visibleWhy.includes(i) ? ' visible' : ''}`}>
                  <div className="rn-why-dot" />
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className="rn-faq-section">
          <div className="rn-faq-inner">
            <span className="rn-section-eyebrow">Got Questions?</span>
            <h2 className="rn-section-title">React Native Development FAQs</h2>
            <p className="rn-section-desc">
              Straight answers to the questions businesses ask us most before starting a React Native project.
            </p>
            <div className="rn-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`rn-faq-item${openFaq === i ? ' open' : ''}`}>
                  <button className="rn-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    {f.q}
                    <span className="rn-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="rn-faq-a" style={openFaq === i ? { maxHeight: 500, paddingBottom: 22 } : {}}>
                    {f.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="rn-cta-section">
          <div className="rn-cta-orb1" />
          <div className="rn-cta-orb2" />
          <div className="rn-cta-inner">
            <span className="rn-section-eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: 16 }}>Start Your App Project</span>
            <h2 className="rn-cta-title">Ready to Build Your Cross-Platform App?</h2>
            <p className="rn-cta-sub">
              Book a free consultation call. We&rsquo;ll review your app idea, scope the core features, and give you a ballpark cost and timeline — no obligation.
            </p>
            <div className="rn-cta-btns">
              <Link href="/contact-us" className="rn-btn-primary">
                Book a Free Consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/app-maintenance-services" className="rn-btn-secondary">
                See App Maintenance Services
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
