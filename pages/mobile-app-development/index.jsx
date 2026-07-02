'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Mobile App Development', item: 'https://www.1solutions.biz/mobile-app-development/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Mobile App Development',
      url: 'https://www.1solutions.biz/mobile-app-development/',
      description: 'End-to-end mobile app development for iOS and Android — native Swift, Kotlin, Flutter, and React Native. 180+ apps shipped across consumer, enterprise, and e-commerce verticals.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '143', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Should I build a native app or use a cross-platform framework like Flutter or React Native?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on your priorities. Native apps (Swift for iOS, Kotlin for Android) deliver the best possible performance, deepest platform API access, and most polished UX — ideal for apps with complex animations, AR, ML, health, or payment features. Cross-platform frameworks like Flutter and React Native let you target both iOS and Android from a single codebase, reducing development time and cost by 30–40% for apps that are primarily data-display, CRUD, or content-heavy. We recommend native when platform-specific UX or API depth matters most, and Flutter or React Native when speed-to-market and budget efficiency are the priority. We build all four and will recommend the right fit for your specific app.' } },
        { '@type': 'Question', name: 'How long does it take to build a mobile app?', acceptedAnswer: { '@type': 'Answer', text: 'An MVP covering authentication, 4–6 core screens, API integration, and App Store / Play Store submission typically takes 12–18 weeks. A mid-complexity app with real-time features, push notifications, in-app purchases, and third-party integrations typically takes 20–28 weeks. A full enterprise mobile app with offline capability, complex business logic, multi-role access, and extensive integrations typically takes 32–48 weeks. We work in two-week sprints with working builds on TestFlight (iOS) and Firebase App Distribution (Android) throughout development so you can test on real devices at every stage.' } },
        { '@type': 'Question', name: 'Do you build apps for both iOS and Android?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We build native iOS apps in Swift and SwiftUI, native Android apps in Kotlin and Jetpack Compose, and cross-platform apps in Flutter and React Native. For clients launching on both platforms simultaneously, Flutter is usually the most cost-effective choice — a single Dart codebase compiles to native ARM code on both iOS and Android. For clients with an existing user base strongly skewed to one platform, we often recommend starting with a native app on that platform and adding the second later.' } },
        { '@type': 'Question', name: 'What is your mobile app development process?', acceptedAnswer: { '@type': 'Answer', text: 'Our process runs in six phases. Discovery & scoping (1–2 weeks): we map your user journeys, define MVP scope, agree on tech stack, and produce a detailed project plan. UI/UX design (2–4 weeks): Figma wireframes, high-fidelity screens, interactive prototype, and design system. Development (8–32 weeks depending on scope): sprint-based development with biweekly TestFlight / App Distribution builds and a demo every sprint. QA & testing (2–4 weeks): functional, performance, accessibility, and device compatibility testing across 30+ real devices. Submission & launch: App Store and Play Store submission, metadata, screenshots, ASO, and review management. Post-launch support: crash monitoring, analytics, OS update maintenance, and feature roadmap.' } },
        { '@type': 'Question', name: 'Who owns the source code and IP?', acceptedAnswer: { '@type': 'Answer', text: 'You own 100% of the source code, design assets, and intellectual property from day one. We deliver the full codebase via a private GitHub or GitLab repository, and all third-party licences used are commercially permissive. We sign an NDA before the project begins, and the development contract explicitly assigns all IP to you. We have no ongoing dependency on 1Solutions code, infrastructure, or tools after handover.' } },
        { '@type': 'Question', name: 'Can you integrate third-party APIs, payment gateways, and push notifications?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Third-party integrations are a core part of every mobile project. Common integrations we handle include payment gateways (Stripe, Razorpay, PayPal, Apple Pay, Google Pay), push notifications (Firebase Cloud Messaging, APNs, OneSignal), social auth (Sign in with Apple, Google, Facebook), maps (Google Maps, Mapbox, Apple MapKit), analytics (Firebase Analytics, Mixpanel, Amplitude), CRM (HubSpot, Salesforce, Zoho), shipping (Shiprocket, FedEx, UPS), and live video/audio (Twilio, Agora, WebRTC). We also build custom REST and GraphQL API backends for apps that need their own server layer.' } },
      ],
    },
  ],
};

const SERVICES = [
  { n: '01', title: 'iOS App Development', desc: 'Native iPhone and iPad apps in Swift and SwiftUI — ARKit, Core ML, HealthKit, StoreKit 2, Apple Pay, and full App Store submission. Follows Apple Human Interface Guidelines for polished, review-compliant experiences.', feat: false },
  { n: '02', title: 'Android App Development', desc: 'Native Android apps in Kotlin and Jetpack Compose — Material Design 3, adaptive layouts for phones, tablets, and foldables, Google Play billing, Firebase integration, and full Play Store submission.', feat: false },
  { n: '03', title: 'Flutter App Development', desc: 'A single Flutter/Dart codebase that compiles to native ARM code on iOS and Android. Pixel-perfect custom UI, platform channel integrations, and 30–40% faster time-to-market vs. building two native apps.', feat: true },
  { n: '04', title: 'React Native Development', desc: 'JavaScript/TypeScript React Native apps sharing up to 90% of code between iOS and Android. Expo-managed or bare workflow, OTA updates via EAS, and native module bridges for platform-specific features.', feat: false },
  { n: '05', title: 'Mobile UI/UX Design', desc: 'Figma-based mobile UI/UX design: user research, information architecture, wireframes, high-fidelity screens, interaction design, and a reusable design system — all before a single line of code is written.', feat: false },
  { n: '06', title: 'App Backend & API Development', desc: 'Scalable backends for mobile apps — REST or GraphQL APIs, push notifications (FCM, APNs), real-time features (WebSockets, Socket.io), auth (JWT, OAuth, Sign in with Apple), and cloud hosting on AWS, GCP, or Firebase.', feat: false },
  { n: '07', title: 'E-Commerce Mobile Apps', desc: 'Feature-rich shopping apps with product catalogues, cart, wishlists, Stripe/Razorpay/Apple Pay checkout, order tracking, loyalty programmes, and deep Shopify, WooCommerce, or Magento integration.', feat: false },
  { n: '08', title: 'Enterprise Mobile Apps', desc: 'Secure enterprise apps with SSO (SAML, Okta, Azure AD), MDM compatibility (Intune, Jamf), offline-first architecture, role-based access, and deep ERP/CRM integration for field teams and operations.', feat: false },
  { n: '09', title: 'App Store Optimisation (ASO)', desc: 'Keyword research, title and subtitle optimisation, screenshot design, preview video, localisation, and rating strategy to maximise organic downloads on both the App Store and Google Play.', feat: false },
  { n: '10', title: 'App Maintenance & Modernisation', desc: 'Ongoing iOS and Android SDK upgrades, annual OS compatibility updates, crash monitoring via Crashlytics, dependency maintenance, legacy app rewrites, and continuous feature delivery post-launch.', feat: false },
];

const TECH_STACK = [
  {
    group: 'iOS',
    color: '#1d4ed8',
    items: ['Swift 5.x / 6.x', 'SwiftUI', 'UIKit', 'Xcode 16', 'Swift Package Manager', 'TestFlight'],
  },
  {
    group: 'Android',
    color: '#16a34a',
    items: ['Kotlin', 'Jetpack Compose', 'Android Studio', 'Gradle', 'Google Play SDK', 'Material Design 3'],
  },
  {
    group: 'Flutter',
    color: '#0ea5e9',
    items: ['Dart', 'Flutter 3.x', 'Riverpod / BLoC', 'Flutter Flavors', 'Platform Channels', 'FlutterFire'],
  },
  {
    group: 'React Native',
    color: '#7c3aed',
    items: ['React Native 0.73+', 'Expo / EAS', 'TypeScript', 'React Navigation', 'NativeWind', 'OTA Updates'],
  },
  {
    group: 'Backend & Auth',
    color: '#D97706',
    items: ['Node.js / Express', 'Firebase', 'Supabase', 'JWT / OAuth 2.0', 'GraphQL / REST', 'WebSockets'],
  },
  {
    group: 'Payments & Maps',
    color: '#f97316',
    items: ['Stripe', 'Razorpay', 'Apple Pay', 'Google Pay', 'Google Maps SDK', 'Mapbox'],
  },
  {
    group: 'Cloud & Storage',
    color: '#14b8a6',
    items: ['AWS (S3, Lambda, RDS)', 'Google Cloud', 'Firebase Storage', 'Cloudinary', 'CDN', 'SQLite / Realm'],
  },
  {
    group: 'CI/CD & Testing',
    color: '#a855f7',
    items: ['Fastlane', 'GitHub Actions', 'Bitrise', 'Detox / XCTest', 'Firebase App Distribution', 'Crashlytics'],
  },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'dedicated',
    name: 'Dedicated App Team',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'A dedicated mobile squad embedded in your team.',
    desc: 'A full-time offshore mobile team — iOS/Android/Flutter developer(s), UI/UX designer, QA engineer, and project manager — working as a seamless extension of your team at a fraction of US/UK/AU in-house cost. Two-week sprints with daily standups and biweekly device builds. 100% source code and IP ownership from day one.',
    bestFor: ['Full-featured app with ongoing feature roadmap', 'Long-term mobile product with monthly releases', 'Replacing or augmenting in-house mobile capacity', 'Simultaneous iOS + Android launch'],
    process: 'Team assembly → Discovery sprint → Biweekly device builds → Continuous roadmap',
    timeline: 'Ongoing — scale up or down each quarter',
  },
  {
    id: 'fixed',
    name: 'Fixed Price',
    badge: 'Well-defined scope',
    badgeColor: '#1d4ed8',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Predictable cost and timeline for scoped apps.',
    desc: 'Agreed scope, fixed price, and guaranteed delivery date — ideal for MVPs, v1 product launches, and clearly scoped apps. We handle discovery, design, development, QA, and App Store / Play Store submission. Payment in milestones tied to deliverables.',
    bestFor: ['MVP or v1 launch with a defined feature set', 'Startup with investor deadline', 'Internal enterprise tool with clear requirements', 'App redesign or feature addition'],
    process: 'Scope & estimate → Milestone payments → Delivery & launch',
    timeline: '12–28 weeks depending on complexity',
  },
  {
    id: 'tna',
    name: 'Time & Materials',
    badge: 'Flexible scope',
    badgeColor: '#14b8a6',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Maximum flexibility — pay only for hours worked.',
    desc: 'Hourly billing with full transparency — daily time logs, weekly summaries, and the ability to pivot scope at any sprint. Best for research-driven products where the roadmap evolves with user feedback, or for adding specific mobile engineers to your existing team.',
    bestFor: ['Iterative product discovery with rapid pivots', 'Staff augmentation — specific mobile skill needed', 'Long-running project with evolving requirements', 'Prototype to validate before full build'],
    process: 'Sprint planning → Daily logs → Weekly billing → Continuous delivery',
    timeline: 'Ongoing — start and pause anytime',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Scoping', desc: 'We map user journeys, define the feature set, agree on the technology stack, and produce a detailed project plan with sprint breakdown and delivery milestones. NDA signed before we begin.' },
  { num: '02', title: 'UI/UX Design', desc: 'Figma wireframes → high-fidelity screens → interactive prototype → design system. We follow Apple HIG and Material Design 3 guidelines so every screen is platform-native and review-ready.' },
  { num: '03', title: 'Sprint Development', desc: 'Two-week sprints with working builds on TestFlight and Firebase App Distribution throughout. You test on real iPhones and Android devices every sprint — no surprises at launch.' },
  { num: '04', title: 'QA & Device Testing', desc: 'Functional, regression, performance, and accessibility testing across 30+ real devices. We run automated tests (XCTest, Espresso, Detox) and manual exploratory testing on every sprint build.' },
  { num: '05', title: 'App Store & Play Store Submission', desc: 'We handle metadata, screenshots, preview video, privacy labels, App Review responses, and Play Store listing — plus ASO keyword strategy to maximise organic discovery from day one.' },
  { num: '06', title: 'Post-Launch Support', desc: 'Crash monitoring via Crashlytics, performance analytics, OS update maintenance (new iOS/Android releases each September/October), and a prioritised feature backlog for the next version.' },
];

const TESTIMONIALS = [
  { stars: 5, text: '1Solutions built our Flutter app for iOS and Android simultaneously. The code quality is exceptional — Riverpod architecture, full test coverage, and beautiful animations. Launched on time, within budget, and 4.8 stars on the App Store from week one.', name: 'James Whitfield', role: 'Founder, RetailSync UK', color: '#1d4ed8', feat: true },
  { stars: 5, text: 'Our enterprise Android app handles field inspections for 800+ technicians. 1Solutions delivered offline-first architecture with SQLite sync, barcode scanning, and MDM deployment via Jamf. Rock-solid.', name: 'Priya Nair', role: 'CTO, FieldOps India', color: '#16a34a', feat: false },
  { stars: 5, text: 'We replaced a slow React Native v0.63 app with a native Swift rewrite. 1Solutions phased the migration over 12 weeks with zero downtime to the existing user base. Launch time dropped from 4.2s to 0.9s.', name: 'Lena Schreiber', role: 'Product Lead, HealthTrack DE', color: '#7c3aed', feat: false },
];

const WHY_CARDS = [
  { dot: '#1d4ed8', title: '180+ Apps Shipped', body: 'Consumer, enterprise, and e-commerce apps across iOS, Android, Flutter, and React Native — with an average App Store rating of 4.8.' },
  { dot: '#16a34a', title: 'All Four Platforms', body: 'Native Swift, native Kotlin, Flutter, and React Native — in-house experts for each. We recommend the right stack for your app, not the one we prefer.' },
  { dot: '#D97706', title: '15+ Years Experience', body: 'Founded in 2008, we have built mobile products through every major platform shift: iOS 2 → 18, Android 1.5 → 15, hybrid → cross-platform.' },
  { dot: '#7c3aed', title: 'Biweekly Device Builds', body: 'You test on real iPhones and Android devices every two weeks. No 3-month blackbox — you see working screens throughout the entire build.' },
  { dot: '#0ea5e9', title: '100% IP Ownership', body: 'Full source code delivered via GitHub or GitLab from sprint one. NDA before discovery. All IP assigned to you contractually — no ongoing dependency on us.' },
  { dot: '#f97316', title: 'Western Market Expertise', body: 'US, UK, AU, and CA market expectations built-in: App Review compliance, GDPR/CCPA privacy manifests, accessibility (WCAG 2.2), and localisation.' },
  { dot: '#14b8a6', title: 'Transparent Communication', body: 'Daily standups, a shared project board (Jira/Linear), and a dedicated Slack channel. You always know what was shipped, what is in progress, and what is next.' },
  { dot: '#a855f7', title: 'Post-Launch Partnership', body: 'We handle OS updates, Crashlytics monitoring, App Store rating responses, and feature roadmap planning — not just the initial build.' },
];

function useCounter(target, started, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      setCount(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return count;
}

export default function MobileAppDevelopment() {
  const [showAllSvc, setShowAllSvc] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleSvcCards, setVisibleSvcCards] = useState([]);
  const [visibleEngCards, setVisibleEngCards] = useState([]);
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const [visibleStackCards, setVisibleStackCards] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', platform: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const svcGridRef = useRef(null);
  const engGridRef = useRef(null);
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);
  const stackGridRef = useRef(null);

  const c1 = useCounter(180, statsStarted);
  const c2 = useCounter(15, statsStarted);
  const c3 = useCounter(49, statsStarted);
  const c4 = useCounter(98, statsStarted);

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
        if (e.isIntersecting) {
          Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 80));
          obs.disconnect();
        }
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
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setVisibleSections(p => new Set([...p, key])); obs.disconnect(); }
      }, { threshold: 0.1 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const visibleServices = showAllSvc ? SERVICES : SERVICES.slice(0, 6);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, page: 'mobile-app-development' }),
      });
      setFormStatus(res.ok ? 'success' : 'error');
    } catch {
      setFormStatus('error');
    }
  }

  const FAQS = SCHEMA['@graph'][2].mainEntity;

  return (
    <>
      <Head>
        <title>Mobile App Development Company | iOS, Android, Flutter & React Native | 1Solutions</title>
        <meta name="description" content="End-to-end mobile app development — native iOS (Swift), Android (Kotlin), Flutter & React Native. 180+ apps shipped. App Store & Play Store experts. Free discovery call." />
        <link rel="canonical" href="https://www.1solutions.biz/mobile-app-development/" />
        <meta property="og:title" content="Mobile App Development Company | iOS, Android, Flutter & React Native | 1Solutions" />
        <meta property="og:description" content="Native iOS, Android, Flutter & React Native development. 180+ apps shipped. 15+ years experience. Biweekly device builds. 100% IP ownership." />
        <meta property="og:url" content="https://www.1solutions.biz/mobile-app-development/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .mob-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#dcfce7 25%,#e0f2fe 50%,#fef3c7 75%,#ede9fe 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .mob-page *,.mob-page *::before,.mob-page *::after{box-sizing:border-box}
          .mob-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .mob-orb-1{width:880px;height:880px;background:radial-gradient(circle,rgba(29,78,216,.20) 0%,rgba(59,130,246,.08) 40%,transparent 70%);top:-280px;right:-260px}
          .mob-orb-2{width:780px;height:780px;background:radial-gradient(circle,rgba(22,163,74,.18) 0%,rgba(34,197,94,.08) 40%,transparent 70%);bottom:0;left:-230px}
          .mob-orb-3{width:550px;height:550px;background:radial-gradient(circle,rgba(124,58,237,.14) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%)}
          .mob-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .mob-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .mob-breadcrumb li{display:flex;align-items:center;gap:6px}
          .mob-breadcrumb li::after{content:'/';opacity:.45}
          .mob-breadcrumb li:last-child::after{display:none}
          .mob-breadcrumb a{color:#0F3460;text-decoration:none}
          .mob-breadcrumb a:hover{text-decoration:underline}
          .mob-hero{position:relative;z-index:2;text-align:center;max-width:980px;margin:0 auto;padding:44px 40px 32px}
          .mob-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .mob-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#1d4ed8 50%,#16a34a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .mob-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:760px;margin:0 auto 24px}
          .mob-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .mob-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .mob-badge-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
          .mob-platform-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .mob-platform-pill{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.65);backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,.90);border-radius:50px;padding:8px 18px;font-size:13px;font-weight:700;color:#0F3460;box-shadow:0 2px 10px rgba(15,52,96,.08)}
          .mob-platform-pill svg{flex-shrink:0}
          .mob-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .mob-btn-primary{display:inline-block;padding:14px 36px;background:#1d4ed8;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(29,78,216,.30)}
          .mob-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .mob-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .mob-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(29,78,216,.5);transform:translateY(-2px)}
          .mob-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .mob-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .mob-stat-col:last-child{border-right:none}
          .mob-stat-val{font-size:28px;font-weight:900;color:#1d4ed8;letter-spacing:-.5px;line-height:1}
          .mob-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .mob-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .mob-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .mob-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .mob-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .mob-s-reveal.mob-revealed{opacity:1;transform:translateY(0)}
          .mob-inner{max-width:1300px;margin:0 auto}
          .mob-svc-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .mob-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .mob-svc-card{background:linear-gradient(135deg,rgba(219,234,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(220,252,231,.30) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s}
          .mob-svc-card.mob-cv{opacity:1;transform:translateY(0)}
          .mob-svc-card.mob-cv:hover{transform:translateY(-6px);border-color:rgba(29,78,216,.35);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .mob-svc-card.feat{border-color:rgba(22,163,74,.22)}
          .mob-svc-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .mob-svc-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .mob-svc-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .mob-svc-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#1d4ed8,#16a34a);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .mob-svc-card.mob-cv:hover::before{transform:scaleY(1)}
          .mob-svc-more{text-align:center;margin-top:22px}
          .mob-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .mob-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .mob-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .mob-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .mob-stack-card{background:linear-gradient(135deg,rgba(219,234,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(220,252,231,.30) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .mob-stack-card.mob-sv{opacity:1;transform:translateY(0)}
          .mob-stack-card.mob-sv:hover{border-color:rgba(29,78,216,.30);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .mob-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .mob-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .mob-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .mob-eng-section{padding:80px 40px;position:relative;z-index:1}
          .mob-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .mob-eng-card{background:linear-gradient(135deg,rgba(219,234,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(220,252,231,.30) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s}
          .mob-eng-card.mob-ev{opacity:1;transform:translateY(0)}
          .mob-eng-card.mob-ev:hover{border-color:rgba(29,78,216,.30);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .mob-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .mob-eng-card.feat.mob-ev{transform:translateY(-8px)}
          .mob-eng-card.feat.mob-ev:hover{transform:translateY(-12px)}
          .mob-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .mob-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s}
          .mob-eng-card.mob-ev:hover .mob-eng-icon{background:rgba(29,78,216,.10)}
          .mob-eng-card.feat .mob-eng-icon{background:rgba(217,119,6,.10)}
          .mob-eng-icon svg{fill:#0F3460;transition:fill .2s}
          .mob-eng-card.mob-ev:hover .mob-eng-icon svg{fill:#1d4ed8}
          .mob-eng-card.feat .mob-eng-icon svg{fill:#D97706}
          .mob-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .mob-eng-headline{font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px}
          .mob-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .mob-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .mob-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .mob-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .mob-eng-list li::before{content:'✓';font-weight:800;color:#1d4ed8;flex-shrink:0;margin-top:1px}
          .mob-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .mob-eng-process strong{color:#0F3460}
          .mob-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .mob-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18)}
          .mob-eng-cta:hover{background:#0F3460;color:#fff}
          .mob-eng-card.feat .mob-eng-cta{background:#1d4ed8;color:#fff;border-color:#1d4ed8}
          .mob-eng-card.feat .mob-eng-cta:hover{background:#0F3460;border-color:#0F3460}
          .mob-process-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .mob-psteps{display:flex;flex-direction:column;margin-top:52px}
          .mob-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .mob-pstep.mob-pv{opacity:1;transform:translateY(0)}
          .mob-pstep-l{display:flex;flex-direction:column;align-items:center}
          .mob-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s}
          .mob-pstep.mob-pv:hover .mob-pstep-circle{background:rgba(29,78,216,.12);border-color:#1d4ed8;color:#1d4ed8}
          .mob-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .mob-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .mob-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .mob-pstep:last-child .mob-pstep-connector{display:none}
          .mob-pstep-r{padding:4px 0 38px}
          .mob-pstep:last-child .mob-pstep-r{padding-bottom:0}
          .mob-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .mob-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .mob-testi{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .mob-center-head{text-align:center;margin-bottom:48px}
          .mob-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .mob-tcard{background:linear-gradient(135deg,rgba(219,234,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(220,252,231,.30) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s}
          .mob-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(219,234,254,.42) 100%);border-color:rgba(217,119,6,.22)}
          .mob-tcard.mob-tv{opacity:1;transform:translateY(0)}
          .mob-tcard.mob-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .mob-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .mob-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .mob-tauthor{display:flex;align-items:center;gap:12px}
          .mob-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .mob-tname{font-size:14px;font-weight:700;color:#0F3460}
          .mob-trole{font-size:12px;color:#6b7280}
          .mob-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .mob-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .mob-wcard{background:linear-gradient(135deg,rgba(219,234,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(220,252,231,.30) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .mob-wcard.mob-wv{opacity:1;transform:translateY(0) scale(1)}
          .mob-wcard.mob-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(29,78,216,.30);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .mob-wcard-dot{width:10px;height:10px;border-radius:50%;margin-bottom:12px}
          .mob-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .mob-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .mob-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.60) 40%,rgba(220,252,231,.45) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .mob-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .mob-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#1d4ed8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .mob-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .mob-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .mob-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .mob-cbenefit-icon{flex-shrink:0;color:#1d4ed8;font-weight:800;font-size:16px;margin-top:1px}
          .mob-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .mob-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(219,234,254,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .mob-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .mob-form{display:flex;flex-direction:column;gap:13px}
          .mob-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .mob-fg{display:flex;flex-direction:column;gap:5px}
          .mob-fg.full{grid-column:1/-1}
          .mob-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .mob-fg input,.mob-fg textarea,.mob-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .mob-fg input:focus,.mob-fg textarea:focus,.mob-fg select:focus{outline:none;border-color:#1d4ed8;box-shadow:0 0 0 3px rgba(29,78,216,.10)}
          .mob-consent{display:flex;gap:8px;align-items:flex-start}
          .mob-consent input{margin-top:3px;width:15px;height:15px}
          .mob-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .mob-consent a{color:#0F3460}
          .mob-submit{width:100%;padding:14px;background:#1d4ed8;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(29,78,216,.28)}
          .mob-submit:hover:not(:disabled){background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28)}
          .mob-submit:disabled{opacity:.65;cursor:not-allowed}
          .mob-form-success{text-align:center;padding:32px 20px;color:#16a34a;font-weight:600;font-size:15px}
          .mob-form-error{text-align:center;padding:10px;background:rgba(239,68,68,.08);border-radius:8px;color:#dc2626;font-size:13px;margin-top:6px}
          .mob-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .mob-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .mob-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .mob-faq-list{display:flex;flex-direction:column;gap:10px}
          .mob-fitem{background:linear-gradient(135deg,rgba(219,234,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(220,252,231,.30) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s}
          .mob-fitem.open{border-color:rgba(29,78,216,.35)}
          .mob-fitem.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#1d4ed8,#16a34a);border-radius:3px 3px 0 0}
          .mob-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .mob-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .mob-fitem.open .mob-fq-badge{background:#1d4ed8;color:#fff}
          .mob-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .mob-fitem.open .mob-fq span{color:#1e3a8a}
          .mob-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .mob-fitem.open .mob-fchev{transform:rotate(180deg);color:#1d4ed8}
          .mob-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .mob-fitem.open .mob-fanswer-wrap{max-height:600px}
          .mob-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .mob-related{padding:80px 40px;background:rgba(219,234,254,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .mob-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .mob-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .mob-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:580px}
          .mob-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .mob-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .mob-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .mob-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .mob-rtag-blue{background:rgba(29,78,216,.09);border-color:rgba(29,78,216,.28);color:#1e3a8a}
          .mob-rtag-green{background:rgba(22,163,74,.09);border-color:rgba(22,163,74,.28);color:#14532d}
          .mob-rtag-sky{background:rgba(14,165,233,.09);border-color:rgba(14,165,233,.28);color:#075985}
          .mob-rtag-violet{background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9}
          .mob-rtag-amber{background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309}
          .mob-rtag-teal{background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E}
          @media(max-width:1024px){.mob-hero h1,.mob-s-title,.mob-faq h2{font-size:36px}.mob-svc-grid{grid-template-columns:repeat(2,1fr)}.mob-stack-grid{grid-template-columns:repeat(2,1fr)}.mob-eng-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.mob-eng-card.feat{transform:none}.mob-eng-card.feat.mob-ev{transform:none}.mob-eng-card.feat.mob-ev:hover{transform:translateY(-4px)}.mob-why-grid{grid-template-columns:repeat(2,1fr)}.mob-tgrid{grid-template-columns:1fr}.mob-contact-grid{grid-template-columns:1fr}}
          @media(max-width:768px){.mob-breadcrumb{padding:12px 20px 0}.mob-hero{padding:28px 20px 20px}.mob-hero h1{font-size:26px;letter-spacing:-.3px}.mob-stats{grid-template-columns:1fr 1fr}.mob-stat-col:nth-child(2){border-right:none}.mob-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.mob-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.mob-svc-section,.mob-stack-section,.mob-eng-section,.mob-process-section,.mob-testi,.mob-why-section,.mob-faq,.mob-related{padding:52px 20px}.mob-contact{padding:48px 20px}.mob-svc-grid,.mob-stack-grid,.mob-why-grid{grid-template-columns:1fr}.mob-frow{grid-template-columns:1fr}.mob-ctitle{font-size:28px}.mob-s-title{font-size:28px}}
        `}</style>
      </Head>

      <div className="mob-page">
        <div className="mob-orb mob-orb-1" />
        <div className="mob-orb mob-orb-2" />
        <div className="mob-orb mob-orb-3" />

        {/* Breadcrumb */}
        <nav className="mob-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li>Mobile App Development</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mob-hero">
          <span className="mob-eyebrow">Mobile App Development Company</span>
          <h1>iOS · Android · Flutter · React&nbsp;Native</h1>
          <p className="mob-hero-desc">
            End-to-end mobile app development from idea to App Store. Native iOS in Swift, native Android in Kotlin, cross-platform Flutter and React Native — 180+ apps shipped, 15+ years experience, biweekly device builds.
          </p>

          <div className="mob-platform-pills">
            {[
              { label: 'iOS (Swift)', color: '#1d4ed8' },
              { label: 'Android (Kotlin)', color: '#16a34a' },
              { label: 'Flutter', color: '#0ea5e9' },
              { label: 'React Native', color: '#7c3aed' },
            ].map(({ label, color }) => (
              <span key={label} className="mob-platform-pill">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
                {label}
              </span>
            ))}
          </div>

          <div className="mob-trust-row">
            {[
              { dot: '#1d4ed8', text: '180+ Apps Shipped' },
              { dot: '#16a34a', text: '4.9/5 Client Rating' },
              { dot: '#D97706', text: '15+ Years Experience' },
              { dot: '#7c3aed', text: '100% IP Ownership' },
              { dot: '#0ea5e9', text: 'Biweekly Device Builds' },
            ].map(({ dot, text }) => (
              <span key={text} className="mob-badge">
                <span className="mob-badge-dot" style={{ background: dot }} />
                {text}
              </span>
            ))}
          </div>

          <div className="mob-ctas">
            <Link href="/book-consultation/" className="mob-btn-primary">Get a Free App Estimate</Link>
            <Link href="/portfolio/" className="mob-btn-ghost">View App Portfolio</Link>
          </div>
        </section>

        {/* Stats */}
        <div className="mob-stats" ref={statsRef}>
          <div className="mob-stat-col">
            <div className="mob-stat-val">{c1}+</div>
            <div className="mob-stat-label">Apps Shipped</div>
          </div>
          <div className="mob-stat-col">
            <div className="mob-stat-val">{c2}+</div>
            <div className="mob-stat-label">Years Experience</div>
          </div>
          <div className="mob-stat-col">
            <div className="mob-stat-val">4.{c3 > 49 ? 9 : Math.floor(c3 / 5)}/5</div>
            <div className="mob-stat-label">App Store Avg Rating</div>
          </div>
          <div className="mob-stat-col">
            <div className="mob-stat-val">{c4}%</div>
            <div className="mob-stat-label">On-Time Delivery</div>
          </div>
        </div>

        {/* Services */}
        <section className="mob-svc-section">
          <div className="mob-inner">
            <div
              className={`mob-s-reveal${visibleSections.has('svc') ? ' mob-revealed' : ''}`}
              ref={el => { sectionRefs.current['svc'] = el; }}
            >
              <span className="mob-s-eyebrow">What We Build</span>
              <h2 className="mob-s-title">Mobile App Development Services</h2>
              <p className="mob-s-desc">Native iOS, Android, Flutter, and React Native — plus backend APIs, UI/UX design, ASO, and ongoing maintenance.</p>
            </div>
            <div className="mob-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`mob-svc-card${visibleSvcCards.includes(i) ? ' mob-cv' : ''}${s.feat ? ' feat' : ''}`} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                  <span className="mob-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="mob-svc-more">
                <button className="mob-btn-more" onClick={() => setShowAllSvc(v => !v)}>
                  {showAllSvc ? 'Show Less' : `Show All ${SERVICES.length} Services`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mob-stack-section">
          <div className="mob-inner">
            <div
              className={`mob-s-reveal${visibleSections.has('stack') ? ' mob-revealed' : ''}`}
              ref={el => { sectionRefs.current['stack'] = el; }}
            >
              <span className="mob-s-eyebrow">Technology Stack</span>
              <h2 className="mob-s-title">Tools & Frameworks We Use</h2>
              <p className="mob-s-desc">Native platforms, cross-platform frameworks, backend services, CI/CD pipelines, and testing tools — all production-proven.</p>
            </div>
            <div className="mob-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((group, i) => (
                <div key={group.group} className={`mob-stack-card${visibleStackCards.includes(i) ? ' mob-sv' : ''}`} style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
                  <div className="mob-stack-group" style={{ color: group.color, borderColor: group.color }}>
                    {group.group}
                  </div>
                  <div className="mob-stack-pills">
                    {group.items.map(item => (
                      <span key={item} className="mob-pill" style={{ color: group.color, background: `${group.color}12`, borderColor: `${group.color}30` }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engagement Models */}
        <section className="mob-eng-section">
          <div className="mob-inner">
            <div
              className={`mob-s-reveal${visibleSections.has('eng') ? ' mob-revealed' : ''}`}
              ref={el => { sectionRefs.current['eng'] = el; }}
            >
              <span className="mob-s-eyebrow">Engagement Models</span>
              <h2 className="mob-s-title">How We Work Together</h2>
              <p className="mob-s-desc">Three flexible models — choose the one that fits your stage, budget, and how much control you want.</p>
            </div>
            <div className="mob-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`mob-eng-card${visibleEngCards.includes(i) ? ' mob-ev' : ''}${m.feat ? ' feat' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <span className="mob-eng-badge" style={{ color: m.badgeColor, background: `${m.badgeColor}14`, borderColor: `${m.badgeColor}35` }}>{m.badge}</span>
                  <div className="mob-eng-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24"><path d={m.icon} /></svg>
                  </div>
                  <h3 className="mob-eng-name">{m.name}</h3>
                  <p className="mob-eng-headline">{m.headline}</p>
                  <p className="mob-eng-desc">{m.desc}</p>
                  <div className="mob-eng-list-label">Best for</div>
                  <ul className="mob-eng-list">
                    {m.bestFor.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="mob-eng-process">
                    <strong>Process:</strong> {m.process}<br />
                    <span className="mob-eng-timeline">{m.timeline}</span>
                  </div>
                  <Link href="/book-consultation/" className="mob-eng-cta">Start a Conversation →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mob-process-section">
          <div className="mob-inner">
            <div
              className={`mob-s-reveal${visibleSections.has('proc') ? ' mob-revealed' : ''}`}
              ref={el => { sectionRefs.current['proc'] = el; }}
            >
              <span className="mob-s-eyebrow">Our Process</span>
              <h2 className="mob-s-title">From Idea to App Store in 6 Phases</h2>
              <p className="mob-s-desc">A proven delivery process — transparent, sprint-based, and always shipping working builds to real devices.</p>
            </div>
            <div className="mob-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className={`mob-pstep${visibleSections.has('proc') ? ' mob-pv' : ''}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="mob-pstep-l">
                    <div className="mob-pstep-circle">{step.num}</div>
                    <div className="mob-pstep-connector" />
                  </div>
                  <div className="mob-pstep-r">
                    <h3 className="mob-pstep-title">{step.title}</h3>
                    <p className="mob-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mob-testi">
          <div className="mob-inner">
            <div className="mob-center-head mob-s-reveal mob-revealed">
              <span className="mob-s-eyebrow">Client Stories</span>
              <h2 className="mob-s-title">What Our Clients Say</h2>
            </div>
            <div className="mob-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`mob-tcard${visibleTestiCards.includes(i) ? ' mob-tv' : ''}${t.feat ? ' feat' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="mob-stars">{'★'.repeat(t.stars)}</div>
                  <p className="mob-ttext">"{t.text}"</p>
                  <div className="mob-tauthor">
                    <div className="mob-tavatar" style={{ background: t.color }}>{t.name.charAt(0)}</div>
                    <div>
                      <div className="mob-tname">{t.name}</div>
                      <div className="mob-trole">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why 1Solutions */}
        <section className="mob-why-section">
          <div className="mob-inner">
            <div
              className={`mob-s-reveal${visibleSections.has('why') ? ' mob-revealed' : ''}`}
              ref={el => { sectionRefs.current['why'] = el; }}
            >
              <span className="mob-s-eyebrow">Why 1Solutions</span>
              <h2 className="mob-s-title">Why Clients Choose Us</h2>
              <p className="mob-s-desc">We have been building mobile apps since the App Store launched in 2008. Here is what makes the difference.</p>
            </div>
            <div className="mob-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={c.title} className={`mob-wcard${visibleWhyCards.includes(i) ? ' mob-wv' : ''}`} style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
                  <div className="mob-wcard-dot" style={{ background: c.dot }} />
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mob-contact">
          <div className="mob-contact-grid">
            <div>
              <span className="mob-s-eyebrow">Get Started</span>
              <h2 className="mob-ctitle">Tell Us About Your App</h2>
              <p className="mob-cdesc">Share your idea — platform, core features, target users — and we will send you a free technical estimate and recommended tech stack within 24 hours.</p>
              <div className="mob-cbenefits">
                {[
                  { icon: '✓', text: 'Free technical estimate — no obligation' },
                  { icon: '✓', text: 'NDA signed before discovery call' },
                  { icon: '✓', text: 'Platform recommendation included' },
                  { icon: '✓', text: 'Response within 24 hours, Monday–Friday' },
                  { icon: '✓', text: '15+ years building apps for US, UK, AU & CA markets' },
                ].map(b => (
                  <div key={b.text} className="mob-cbenefit">
                    <span className="mob-cbenefit-icon">{b.icon}</span>
                    <p>{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mob-form-box">
              {formStatus === 'success' ? (
                <div className="mob-form-success">
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
                  <div>Thank you! We will review your project details and get back to you within 24 hours.</div>
                </div>
              ) : (
                <>
                  <h3>Get Your Free App Estimate</h3>
                  <form className="mob-form" onSubmit={handleSubmit}>
                    <div className="mob-frow">
                      <div className="mob-fg">
                        <label htmlFor="mob-name">Full Name *</label>
                        <input id="mob-name" type="text" required placeholder="Jane Smith" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                      </div>
                      <div className="mob-fg">
                        <label htmlFor="mob-email">Work Email *</label>
                        <input id="mob-email" type="email" required placeholder="jane@company.com" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                      </div>
                    </div>
                    <div className="mob-frow">
                      <div className="mob-fg">
                        <label htmlFor="mob-phone">Phone / WhatsApp</label>
                        <input id="mob-phone" type="tel" placeholder="+1 555 000 0000" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
                      </div>
                      <div className="mob-fg">
                        <label htmlFor="mob-platform">Target Platform *</label>
                        <select id="mob-platform" required value={formData.platform} onChange={e => setFormData(p => ({ ...p, platform: e.target.value }))}>
                          <option value="">Select platform</option>
                          <option value="iOS only">iOS only</option>
                          <option value="Android only">Android only</option>
                          <option value="Both iOS & Android">Both iOS &amp; Android</option>
                          <option value="Flutter (iOS + Android)">Flutter (iOS + Android)</option>
                          <option value="React Native (iOS + Android)">React Native (iOS + Android)</option>
                          <option value="Not sure">Not sure — need guidance</option>
                        </select>
                      </div>
                    </div>
                    <div className="mob-fg full">
                      <label htmlFor="mob-message">Describe Your App Idea *</label>
                      <textarea id="mob-message" rows={4} required placeholder="Core features, target audience, any existing designs or tech..." value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
                    </div>
                    <div className="mob-consent">
                      <input type="checkbox" id="mob-consent" required />
                      <label htmlFor="mob-consent">I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to being contacted about my project.</label>
                    </div>
                    {formStatus === 'error' && <div className="mob-form-error">Something went wrong. Please try again or email us at hello@1solutions.biz</div>}
                    <button type="submit" className="mob-submit" disabled={formStatus === 'sending'}>
                      {formStatus === 'sending' ? 'Sending…' : 'Get My Free Estimate →'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mob-faq">
          <div className="mob-inner">
            <h2>Frequently Asked Questions</h2>
            <p className="mob-faq-sub">Everything you need to know about our mobile app development service.</p>
            <div className="mob-faq-list" itemScope itemType="https://schema.org/FAQPage">
              {FAQS.map((item, i) => (
                <div key={i} className={`mob-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="mob-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="mob-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.name}</span>
                    <svg className="mob-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="mob-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="mob-fanswer" itemProp="text">{item.acceptedAnswer.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="mob-related">
          <div className="mob-related-inner">
            <span className="mob-s-eyebrow">Explore More</span>
            <h2>Related Mobile & Software Services</h2>
            <p className="mob-related-sub">Go deeper into a specific platform, or pair mobile development with design, backend, and marketing.</p>
            <hr />
            <div className="mob-rtags">
              {[
                ['/ios-app-development-company/', 'iOS App Development', 'mob-rtag-blue'],
                ['/android-application-development-company/', 'Android App Development', 'mob-rtag-green'],
                ['/flutter-app-development-services/', 'Flutter Development', 'mob-rtag-sky'],
                ['/react-native-app-development/', 'React Native Development', 'mob-rtag-violet'],
                ['/app-ui-ux-design/', 'Mobile App UI/UX Design', 'mob-rtag-amber'],
                ['/hire-app-developer/', 'Hire App Developer', 'mob-rtag-blue'],
                ['/hire-ios-developer/', 'Hire iOS Developer', 'mob-rtag-sky'],
                ['/hire-android-developer/', 'Hire Android Developer', 'mob-rtag-green'],
                ['/app-store-optimization-services/', 'App Store Optimisation', 'mob-rtag-amber'],
                ['/app-maintenance-services/', 'App Maintenance', 'mob-rtag-teal'],
                ['/ecommerce-website-development-services/', 'E-Commerce Development', 'mob-rtag-violet'],
                ['/saas-application-development-company/', 'SaaS Development', 'mob-rtag-teal'],
              ].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`mob-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
