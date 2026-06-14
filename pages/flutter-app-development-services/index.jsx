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
        { '@type': 'ListItem', position: 2, name: 'Flutter App Development Services', item: 'https://www.1solutions.biz/flutter-app-development-services/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Flutter App Development Services',
      url: 'https://www.1solutions.biz/flutter-app-development-services/',
      description: 'Cross-platform Flutter app development for iOS, Android, web, and desktop — a single Dart codebase delivering native performance, pixel-perfect UI, and 60fps animations. Custom Flutter apps from MVP to enterprise-scale, built and deployed faster than separate native development.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '97', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why choose Flutter over React Native or native iOS/Android development?', acceptedAnswer: { '@type': 'Answer', text: 'Flutter compiles directly to native ARM code — unlike React Native, which uses a JavaScript bridge. This gives Flutter near-native performance with smooth 60/120fps animations. A single Dart codebase targets iOS, Android, web, and desktop simultaneously, so development time and cost are typically 40–60% lower than building separate native apps. Flutter also provides pixel-perfect UI consistency across platforms — your app looks identical on iOS and Android without platform-specific workarounds. Google uses Flutter internally for apps like Google Pay, and major brands including BMW, Alibaba, and eBay have shipped Flutter apps at scale.' } },
        { '@type': 'Question', name: 'How long does it take to build a Flutter app?', acceptedAnswer: { '@type': 'Answer', text: 'A Flutter MVP with core screens (authentication, 3–5 main screens, API integration, and basic state management) typically takes 8–14 weeks. A mid-complexity app with custom UI components, real-time features (chat, notifications), payments, and backend integrations typically takes 16–24 weeks. A full enterprise Flutter app with offline capability, complex state management, multiple user roles, admin dashboard, and CI/CD pipeline typically takes 24–36 weeks. We deliver functional builds to a TestFlight/Play Console staging environment on a biweekly sprint cycle throughout development.' } },
        { '@type': 'Question', name: 'Can Flutter apps access native device features?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Flutter has a rich ecosystem of packages providing access to native device features: camera, GPS and location services, biometric authentication (Face ID, Touch ID, fingerprint), push notifications (Firebase Cloud Messaging), Bluetooth and BLE, NFC, local storage, contacts and calendar, in-app purchases, social login (Google, Apple, Facebook), and platform-specific capabilities through platform channels. Where a package does not exist, we write native platform channel code in Swift/Kotlin to expose device capabilities to the Flutter layer.' } },
        { '@type': 'Question', name: 'Can you migrate our existing React Native or Ionic app to Flutter?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We handle full framework migrations from React Native, Ionic, Xamarin, and Cordova to Flutter. The migration process starts with a codebase audit, then a feature-by-feature rewrite in Dart/Flutter using the same backend APIs. We typically phase the migration — running Flutter alongside the existing app on a feature-by-feature basis — to reduce risk and allow A/B testing of new Flutter screens before full cutover. Most React Native to Flutter migrations see 30–50% performance improvements at the UI layer and significant reduction in JS bundle size and bridge overhead.' } },
        { '@type': 'Question', name: 'Does Flutter support offline functionality and local data storage?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Flutter has excellent offline support. We use Hive (fast, lightweight NoSQL), Isar (schema-based, high performance), SQLite via the drift or sqflite package, or Realm depending on data complexity. Offline-first architecture uses a local-first data model with background sync to the server when connectivity is restored, conflict resolution strategies for concurrent edits, and optimistic UI updates so the app feels instant even on slow connections. We have built offline-capable Flutter apps for field inspection, logistics, healthcare, and retail use cases.' } },
        { '@type': 'Question', name: 'What Flutter state management approach do you use?', acceptedAnswer: { '@type': 'Answer', text: "State management choice depends on app complexity. For simple apps we use Provider or Riverpod. For medium complexity apps with clear separation of business logic and UI we use BLoC/Cubit — it's testable, predictable, and scalable. For highly reactive apps we use Riverpod (code-gen variant) for compile-safe, boilerplate-free state. We avoid GetX in production apps due to its opinionated conventions and difficulty in testing. All our Flutter apps include a full unit and widget test suite targeting the state management layer." } },
      ],
    },
  ],
};

/* ─── Page data ──────────────────────────────────────────────── */
const SERVICES = [
  { n: '01', title: 'Custom Flutter App Development', desc: 'End-to-end custom Flutter app development for iOS and Android from a single Dart codebase — architecture design, UI implementation, API integration, state management, app store submission, and ongoing roadmap delivery for consumer, B2B, and enterprise apps.' },
  { n: '02', title: 'Flutter MVP & Rapid Prototyping', desc: 'Launch a market-validated Flutter MVP in 8–14 weeks. We scope core user journeys, design a minimal but polished UI, integrate essential backend APIs, and deliver a TestFlight/Play Console build ready for real user testing and investor demonstrations.', feat: true },
  { n: '03', title: 'Flutter iOS & Android Apps', desc: 'Production-quality Flutter apps that pass App Store and Google Play review on first submission — platform-specific design conventions (Material 3 / Cupertino), adaptive layouts, deep linking, background services, push notifications, and in-app purchases implemented correctly.' },
  { n: '04', title: 'Flutter Web & Desktop Apps', desc: 'Extend your Flutter mobile app to web browsers and Windows/macOS/Linux desktops from the same codebase. Adaptive layouts that reflow from mobile to tablet to desktop, SEO-friendly web rendering (CanvasKit / HTML renderer), and OS-level integrations for desktop.' },
  { n: '05', title: 'Flutter UI/UX Design & Animations', desc: 'Pixel-perfect custom Flutter UIs with 60fps animations — hero transitions, Rive and Lottie animation integration, custom implicit and explicit animation curves, shader-based visual effects, and micro-interactions that make your app feel premium and responsive.' },
  { n: '06', title: 'Flutter App Migration (RN / Ionic → Flutter)', desc: 'Full framework migrations from React Native, Ionic, Xamarin, or Cordova to Flutter — with feature parity audit, phased rewrite strategy, performance benchmarking before and after, and zero data loss migration of local storage and user preferences.' },
  { n: '07', title: 'Flutter Backend Integration & API Development', desc: 'REST API, GraphQL, Firebase, Supabase, and WebSocket integrations. We also design and build the backend (Node.js, Python, or Dart/Shelf) alongside the Flutter app for end-to-end ownership — with real-time sync, offline queue, and push notification infrastructure.' },
  { n: '08', title: 'Flutter Performance Optimisation', desc: 'Profiling and optimisation of existing Flutter apps — reducing jank, fixing memory leaks, optimising build methods, lazy loading, image caching, reducing rebuild scope with efficient state management, and reducing app bundle size for faster download and install.' },
  { n: '09', title: 'Flutter Enterprise & B2B Applications', desc: 'Complex Flutter apps for enterprise use cases — field workforce apps, logistics and fleet management, inspection and audit tools, HRMS employee portals, and B2B SaaS mobile clients. Offline-first architecture, RBAC, SSO (SAML/OAuth), MDM compatibility, and enterprise security compliance.' },
  { n: '10', title: 'Flutter App Maintenance & Support', desc: 'Ongoing Flutter app maintenance — OS version compatibility updates (new iOS/Android SDK requirements), dependency upgrades, bug triage and hotfix releases, App Store and Play Store re-submissions, performance monitoring, and feature sprint cadence post-launch.' },
];

const TECH_STACK = [
  {
    group: 'Flutter & Dart Core',
    color: '#0ea5e9',
    items: ['Flutter 3.x (Stable)', 'Dart 3.x (Sound Null Safety)', 'Material 3 Design', 'Cupertino Widgets', 'Custom Widget Library', 'Flutter DevTools'],
  },
  {
    group: 'State Management',
    color: '#0284c7',
    items: ['BLoC / Cubit', 'Riverpod (code-gen)', 'Provider', 'GetX (simple apps)', 'MobX', 'Redux Toolkit'],
  },
  {
    group: 'Backend & APIs',
    color: '#D97706',
    items: ['REST API (Dio / http)', 'GraphQL (Ferry, graphql_flutter)', 'Firebase (Firestore, Auth, FCM)', 'Supabase', 'WebSockets / STOMP', 'gRPC'],
  },
  {
    group: 'Native & Device Features',
    color: '#14b8a6',
    items: ['Camera / Image Picker', 'GPS / Location', 'Biometrics (Face ID / FP)', 'Bluetooth / BLE / NFC', 'Platform Channels (Swift/Kotlin)', 'Background Services'],
  },
  {
    group: 'Local Storage & Offline',
    color: '#f97316',
    items: ['Hive (NoSQL, fast)', 'Isar (schema-based)', 'SQLite / Drift / sqflite', 'Realm', 'SharedPreferences', 'Offline-first sync'],
  },
  {
    group: 'UI / Animation',
    color: '#a855f7',
    items: ['Rive (interactive animation)', 'Lottie', 'Custom Paint / Shaders', 'Hero Transitions', 'Staggered Animations', 'Shimmer & Skeleton'],
  },
  {
    group: 'CI/CD & App Distribution',
    color: '#6366f1',
    items: ['Codemagic', 'Fastlane', 'GitHub Actions', 'Firebase App Distribution', 'TestFlight', 'Google Play Console'],
  },
  {
    group: 'Analytics, Testing & Monetisation',
    color: '#ec4899',
    items: ['Firebase Analytics', 'Mixpanel / Amplitude', 'RevenueCat (in-app purchase)', 'AdMob', 'Flutter Test (unit / widget)', 'Firebase Test Lab'],
  },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'dedicated',
    name: 'Dedicated Flutter Team',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'A dedicated Flutter squad working exclusively on your app.',
    desc: 'A full-time offshore Flutter team — Flutter developer(s), UI/UX designer, QA, and backend engineer — working as a seamless extension of your team at a fraction of US/UK/AU hiring cost. Sprint-based delivery, daily standups, biweekly demos. Full source code and IP ownership yours from day one.',
    bestFor: ['Full-featured consumer or enterprise Flutter app', 'Long-term app product with ongoing feature roadmap', 'Replacing in-house Flutter capacity at lower cost', 'Multi-platform Flutter app (mobile + web + desktop)'],
    process: 'Team assembly → Discovery sprint → Biweekly releases → Continuous roadmap',
    timeline: 'Ongoing — scale up or down per quarter',
  },
  {
    id: 'fixed',
    name: 'Fixed Price',
    badge: 'Well-defined scope',
    badgeColor: '#0ea5e9',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Agreed price. Agreed scope. App delivered on time.',
    desc: 'Best for a clearly scoped Flutter MVP or a defined app with agreed user stories. We quote a fixed price covering design, development, testing, and store submission — with milestone releases throughout. No scope creep, no surprise invoices.',
    bestFor: ['Flutter MVP (8–14 weeks, defined screens)', 'Migration from React Native / Ionic to Flutter', 'New feature set with well-defined user stories', 'Flutter app for a specific platform (iOS or Android)'],
    process: 'Detailed spec → Fixed quote → Milestone delivery → Store launch',
    timeline: 'Best for projects 8–24 weeks',
  },
  {
    id: 'tm',
    name: 'Time & Material',
    badge: 'Agile & flexible',
    badgeColor: '#a855f7',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Pay for hours worked. Adapt as the product evolves.',
    desc: 'Billed on actual time and resources used. Ideal for exploratory development, iterative design-led builds, or adding new modules to an existing Flutter app where requirements are still being defined or validated with real users.',
    bestFor: ['Flutter discovery sprint and architecture design', 'Iterative consumer app with user-research-driven scope', 'Adding new features to an existing Flutter codebase', 'Performance profiling and optimisation of an existing app'],
    process: 'Sprint planning → Weekly demos → Iterative refinement → Transparent timesheets',
    timeline: 'Start in 1 week — no lengthy onboarding',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery, Architecture & Tech Stack Decision', desc: 'We start with a deep-dive discovery of your app concept, target users, platform requirements, backend needs, and monetisation model. We define the Flutter architecture (clean architecture or feature-first), choose state management approach, design the data model, and map all API and third-party integrations before sprint planning begins.' },
  { num: '02', title: 'UI/UX Design — Figma to Flutter Component Library', desc: 'Our designers produce high-fidelity Figma prototypes with interactive flows for stakeholder sign-off. We then build a Flutter component library matching the design system — custom widgets, typography scale, colour tokens, and animation specs — so development velocity is maximised from sprint one.' },
  { num: '03', title: 'Agile Sprint Development — Biweekly App Builds', desc: 'Flutter development runs in two-week sprints. Every two weeks you receive a working build on TestFlight (iOS) and Firebase App Distribution / Play Console (Android) covering the sprint scope. You can install and test the real app throughout development — no "big bang" delivery at the end.' },
  { num: '04', title: 'Backend & API Integration', desc: 'All backend integrations are built and tested in parallel with frontend Flutter development — REST endpoints, Firebase Firestore/Auth/FCM, third-party APIs, payment gateways (Stripe, Razorpay), social login, push notification infrastructure, and real-time WebSocket or Firestore listeners.' },
  { num: '05', title: 'QA, Performance Profiling & Store Compliance', desc: 'Comprehensive QA across physical iOS and Android devices and screen sizes — unit tests, widget tests, integration tests, and manual exploratory testing. Flutter DevTools performance profiling to eliminate jank, reduce rebuild counts, and optimise memory usage. App Store and Google Play submission compliance review and metadata preparation.' },
  { num: '06', title: 'Store Launch, Analytics & Ongoing Roadmap', desc: 'Managed App Store and Google Play submissions, including review response if required. Post-launch monitoring via Firebase Analytics, Crashlytics, and Sentry. A defined release cadence for ongoing feature sprints, OS compatibility updates (new iOS/Android SDK requirements), and dependency maintenance keeps your Flutter app healthy long after launch.' },
];

const TESTIMONIALS = [
  {
    text: "We had a React Native app that was slow, frequently crashed on Android, and cost us a fortune in platform-specific fixes. 1Solutions migrated it to Flutter in 16 weeks with full feature parity. The new app is smooth, the Play Store rating jumped from 3.1 to 4.7, and our engineering costs dropped significantly.",
    name: 'James T.', role: 'CTO, Consumer App Startup (UK)', init: 'JT', bg: '#0F3460',
  },
  {
    text: "1Solutions built our Flutter field inspection app from scratch — offline-first, GPS tracking, photo capture, digital signatures, and real-time sync. Our field teams use it on both iOS and Android with zero issues. The offline capability alone saved us from the connectivity problems we had with our old web app.",
    name: 'Sarah M.', role: 'VP Operations, Infrastructure Company (AU)', init: 'SM', bg: '#064e3b', feat: true,
  },
  {
    text: "The Flutter MVP 1Solutions built for us was live on both app stores in 11 weeks. We used it to raise our seed round — investors were impressed with how polished it looked and how fast it performed. We are now 18 months post-launch with 200K active users and still on the same Flutter codebase.",
    name: 'David K.', role: 'Founder & CEO, HealthTech Startup (US)', init: 'DK', bg: '#312e81',
  },
];

const WHY_CARDS = [
  { title: '100+ Flutter Apps Shipped to the App Stores', desc: 'We have shipped 100+ Flutter applications across consumer, B2B, enterprise, healthcare, fintech, logistics, and field-service verticals — on iOS, Android, and Flutter web. We know what makes a Flutter app pass review and retain users.' },
  { title: 'Cross-Platform Done Right — Not Just a Cost Cut', desc: 'We architect Flutter apps for real cross-platform quality — adaptive layouts for each platform, platform-specific UX conventions where they matter, and platform channels for native capabilities not yet covered by packages. Your iOS app feels like iOS; your Android app feels like Android.' },
  { title: 'Clean Architecture & Testable Codebase', desc: 'Every Flutter app we build uses clean architecture (or feature-first for smaller apps), a clearly separated domain/data/presentation layer, comprehensive unit and widget test coverage, and documentation-ready code. You can hand it to any Flutter developer and they will understand it immediately.' },
  { title: 'Design-Led Flutter Development', desc: 'We have in-house UI/UX designers who produce Figma prototypes before development starts, build a Flutter design system (component library), and collaborate with developers through the full build. Your Flutter app is not just functional — it is visually polished and on-brand.' },
  { title: 'End-to-End — App + Backend + DevOps', desc: 'We build everything your Flutter app needs — the Flutter front-end, the backend API (Node.js, Python, or Firebase/Supabase), CI/CD pipeline (Codemagic/Fastlane), App Store and Play Store management, and ongoing maintenance. One partner, full accountability.' },
  { title: 'Performance Obsessed', desc: 'We profile every Flutter app with DevTools before release — measuring frame render times, rebuild counts, memory allocations, and GPU raster thread performance. We target 60fps on mid-range Android devices as a standard, not a premium. Jank is a bug.' },
  { title: 'US / UK / AU Timezone Overlap', desc: 'Our Flutter engineers are available across IST, EST, GMT, and AEST time zones with scheduled daily standup windows that overlap with US, UK, and Australian business hours — so you get real-time collaboration, not overnight delays on critical decisions.' },
  { title: 'Transparent Delivery. Full IP Ownership.', desc: 'Biweekly demo builds you can install and test, shared sprint board (Linear or Jira), direct access to your Flutter lead engineer, and weekly progress reports. All source code, assets, and intellectual property are 100% yours from day one.' },
];

const FAQS = [
  { q: 'Why choose Flutter over React Native or native iOS/Android development?', a: 'Flutter compiles directly to native ARM code — unlike React Native, which uses a JavaScript bridge. This gives Flutter near-native performance with smooth 60/120fps animations. A single Dart codebase targets iOS, Android, web, and desktop simultaneously, so development cost is typically 40–60% lower than building separate native apps. Flutter also delivers pixel-perfect UI consistency across platforms without platform-specific workarounds. Google, BMW, Alibaba, and eBay have all shipped Flutter apps at scale.' },
  { q: 'How long does it take to build a Flutter app?', a: 'A Flutter MVP with core screens (authentication, 3–5 main screens, API integration, and state management) typically takes 8–14 weeks. A mid-complexity app with custom UI, real-time features, payments, and backend integrations typically takes 16–24 weeks. A full enterprise Flutter app with offline capability, complex state management, multiple user roles, admin dashboard, and CI/CD pipeline typically takes 24–36 weeks. We deliver working builds to TestFlight and Play Console on a biweekly sprint cycle throughout development.' },
  { q: 'Can Flutter apps access native device features like camera, GPS, and biometrics?', a: 'Yes. Flutter has a rich package ecosystem for native device features: camera, GPS and location services, biometric authentication (Face ID, Touch ID, fingerprint), push notifications (Firebase Cloud Messaging), Bluetooth and BLE, NFC, local storage, contacts, calendar, in-app purchases, and social login (Google, Apple, Facebook). Where a package does not exist, we write native platform channel code in Swift or Kotlin to expose device capabilities to the Flutter layer.' },
  { q: 'Can you migrate our React Native or Ionic app to Flutter?', a: 'Yes. We handle full framework migrations from React Native, Ionic, Xamarin, and Cordova to Flutter. The migration starts with a codebase audit, then a feature-by-feature rewrite in Dart/Flutter using the same backend APIs. We typically phase the migration — running Flutter alongside the existing app on a feature-by-feature basis — to reduce risk and allow A/B testing before full cutover. Most React Native to Flutter migrations see 30–50% UI performance improvements and a significant reduction in crash rates.' },
  { q: 'Does Flutter support offline functionality?', a: 'Yes. Flutter has excellent offline support. We use Hive (lightweight NoSQL), Isar (schema-based, high performance), SQLite via Drift or sqflite, or Realm depending on data complexity. Our offline-first architecture uses a local-first data model with background sync to the server when connectivity is restored, conflict resolution for concurrent edits, and optimistic UI updates so the app feels instant even on slow or no connection. We have built offline-capable Flutter apps for field inspection, logistics, healthcare, and retail use cases.' },
  { q: 'What state management approach do you use in Flutter?', a: "State management choice depends on app complexity. For simple apps we use Provider or Riverpod. For medium and large apps with clear separation of business logic and UI, we use BLoC/Cubit — it is testable, predictable, and scales well. For highly reactive apps, we use Riverpod (code-gen variant) for compile-safe, boilerplate-free state. All our Flutter apps include a full unit and widget test suite targeting the state management layer, ensuring state transitions are verifiable and regression-safe." },
  { q: 'Can Flutter apps be submitted to both the App Store and Google Play?', a: 'Yes. Flutter produces fully native iOS and Android binaries that meet all App Store and Google Play submission requirements. We handle the full submission process — provisioning profiles, signing certificates, App Store Connect metadata, Google Play Console setup, privacy policy and data safety forms, and screenshot/preview video production. We also manage responses to reviewer rejections, which are uncommon in our submissions because we do a compliance review before every store submission.' },
  { q: 'Do you build Flutter web apps as well as mobile?', a: 'Yes. Flutter supports web deployment using either the CanvasKit renderer (best visual fidelity and animation quality) or the HTML renderer (better SEO and initial load speed for content-heavy pages). We build adaptive Flutter apps that reflow intelligently from mobile to tablet to desktop breakpoints. Flutter web works particularly well for dashboard-style web apps, internal tools, and admin panels that share a codebase with an existing Flutter mobile app — eliminating the need for a separate React or Vue web frontend.' },
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
    <div className="fl-stat-col">
      <div className="fl-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="fl-stat-label">{label}</div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */
export default function FlutterAppDevelopment() {
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
        <title>Flutter App Development Services | Cross-Platform Mobile Apps | 1Solutions</title>
        <meta name="description" content="Expert Flutter app development for iOS, Android, web & desktop — one Dart codebase, native performance, pixel-perfect UI. MVP in 8–14 weeks. 100+ Flutter apps shipped. Free discovery call." />
        <link rel="canonical" href="https://www.1solutions.biz/flutter-app-development-services/" />
        <meta property="og:title" content="Flutter App Development Services | 1Solutions" />
        <meta property="og:description" content="Cross-platform Flutter app development — iOS, Android, web & desktop from a single Dart codebase. Native performance, 60fps UI, 100+ apps shipped. 15+ years experience." />
        <meta property="og:url" content="https://www.1solutions.biz/flutter-app-development-services/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .fl-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; position:relative; overflow-x:hidden; }
          .fl-page *,.fl-page *::before,.fl-page *::after { box-sizing:border-box; }

          /* Orbs */
          .fl-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(20px); }
          .fl-orb-1 { width:880px;height:880px;background:radial-gradient(circle,rgba(14,165,233,.22) 0%,rgba(56,189,248,.10) 40%,transparent 70%);top:-280px;right:-260px; }
          .fl-orb-2 { width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px; }
          .fl-orb-3 { width:550px;height:550px;background:radial-gradient(circle,rgba(168,85,247,.16) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%); }

          /* Breadcrumb */
          .fl-breadcrumb { position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto; }
          .fl-breadcrumb ol { display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0; }
          .fl-breadcrumb li { display:flex;align-items:center;gap:6px; }
          .fl-breadcrumb li::after { content:'/';opacity:.45; }
          .fl-breadcrumb li:last-child::after { display:none; }
          .fl-breadcrumb a { color:#0F3460;text-decoration:none; }
          .fl-breadcrumb a:hover { text-decoration:underline; }

          /* Hero */
          .fl-hero { position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px; }
          .fl-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px; }
          .fl-hero h1 { font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#0ea5e9 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .fl-hero-desc { font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px; }
          .fl-trust-row { display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px; }
          .fl-badge { display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07); }
          .fl-badge-dot { width:7px;height:7px;border-radius:50%;background:#0ea5e9;flex-shrink:0; }
          .fl-ctas { display:flex;flex-wrap:wrap;gap:12px;justify-content:center; }
          .fl-btn-primary { display:inline-block;padding:14px 36px;background:#0ea5e9;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(14,165,233,.30); }
          .fl-btn-primary:hover { background:#0F3460;transform:translateY(-2px); }
          .fl-btn-ghost { display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s; }
          .fl-btn-ghost:hover { background:rgba(255,255,255,.85);border-color:rgba(14,165,233,.5);transform:translateY(-2px); }

          /* Stats */
          .fl-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95); }
          .fl-stat-col { padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10); }
          .fl-stat-col:last-child { border-right:none; }
          .fl-stat-val { font-size:28px;font-weight:900;color:#0ea5e9;letter-spacing:-.5px;line-height:1; }
          .fl-stat-label { font-size:11px;color:#4A6080;font-weight:500;margin-top:5px; }

          /* Logos */
          .fl-logos { position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px; }
          .fl-logos-label { font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0; }
          .fl-logos-wrap { width:100%;overflow:hidden; }
          .fl-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:fl-marquee 28s linear infinite; }
          .fl-logos-track:hover { animation-play-state:paused; }
          @keyframes fl-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .fl-clogo { height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s; }
          .fl-clogo:hover { opacity:.85;filter:grayscale(0%); }

          /* Shared */
          .fl-s-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block; }
          .fl-s-title { font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px; }
          .fl-s-desc { font-size:15px;color:#4A6080;line-height:1.7; }
          .fl-s-reveal { opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1); }
          .fl-s-reveal.fl-revealed { opacity:1;transform:translateY(0); }
          .fl-inner { max-width:1300px;margin:0 auto; }

          /* Services */
          .fl-svc-section { background:transparent;padding:72px 40px 60px;position:relative;z-index:1; }
          .fl-svc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px; }
          .fl-svc-card { background:linear-gradient(135deg,rgba(224,242,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s; }
          .fl-svc-card.fl-cv { opacity:1;transform:translateY(0); }
          .fl-svc-card.fl-cv:hover { transform:translateY(-6px);border-color:rgba(14,165,233,.35);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .fl-svc-card.feat { background:linear-gradient(135deg,rgba(224,242,254,.55) 0%,rgba(255,255,255,.87) 55%,rgba(237,233,254,.45) 100%);border-color:rgba(14,165,233,.22); }
          .fl-svc-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .fl-svc-card h3 { font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1; }
          .fl-svc-card p { font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1; }
          .fl-svc-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#0ea5e9,#38bdf8);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1); }
          .fl-svc-card.fl-cv:hover::before { transform:scaleY(1); }
          .fl-svc-more { text-align:center;margin-top:22px; }
          .fl-btn-more { display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit; }
          .fl-btn-more:hover { background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px); }

          /* Tech Stack */
          .fl-stack-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1; }
          .fl-stack-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px; }
          .fl-stack-card { background:linear-gradient(135deg,rgba(224,242,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .fl-stack-card.fl-sv { opacity:1;transform:translateY(0); }
          .fl-stack-card.fl-sv:hover { border-color:rgba(14,165,233,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .fl-stack-group { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid; }
          .fl-stack-pills { display:flex;flex-wrap:wrap;gap:6px; }
          .fl-pill { display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid; }

          /* Engagement Models */
          .fl-eng-section { padding:80px 40px;position:relative;z-index:1; }
          .fl-eng-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px; }
          .fl-eng-card { background:linear-gradient(135deg,rgba(224,242,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s; }
          .fl-eng-card.fl-ev { opacity:1;transform:translateY(0); }
          .fl-eng-card.fl-ev:hover { border-color:rgba(14,165,233,.30);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .fl-eng-card.feat { background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(224,242,254,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px); }
          .fl-eng-card.feat.fl-ev { transform:translateY(-8px); }
          .fl-eng-card.feat.fl-ev:hover { transform:translateY(-12px); }
          .fl-eng-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px; }
          .fl-eng-icon { width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s; }
          .fl-eng-card.fl-ev:hover .fl-eng-icon { background:rgba(14,165,233,.10); }
          .fl-eng-card.feat .fl-eng-icon { background:rgba(217,119,6,.10); }
          .fl-eng-icon svg { fill:#0F3460;transition:fill .2s; }
          .fl-eng-card.fl-ev:hover .fl-eng-icon svg { fill:#0ea5e9; }
          .fl-eng-card.feat .fl-eng-icon svg { fill:#D97706; }
          .fl-eng-name { font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px; }
          .fl-eng-headline { font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px; }
          .fl-eng-desc { font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px; }
          .fl-eng-list-label { font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px; }
          .fl-eng-list { list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px; }
          .fl-eng-list li { display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5; }
          .fl-eng-list li::before { content:'✓';font-weight:800;color:#0ea5e9;flex-shrink:0;margin-top:1px; }
          .fl-eng-process { font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08); }
          .fl-eng-process strong { color:#0F3460; }
          .fl-eng-timeline { display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px; }
          .fl-eng-cta { display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18); }
          .fl-eng-cta:hover { background:#0F3460;color:#fff; }
          .fl-eng-card.feat .fl-eng-cta { background:#0ea5e9;color:#fff;border-color:#0ea5e9; }
          .fl-eng-card.feat .fl-eng-cta:hover { background:#0F3460;border-color:#0F3460; }

          /* Process */
          .fl-process-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .fl-psteps { display:flex;flex-direction:column;margin-top:52px; }
          .fl-pstep { display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1); }
          .fl-pstep.fl-pv { opacity:1;transform:translateY(0); }
          .fl-pstep-l { display:flex;flex-direction:column;align-items:center; }
          .fl-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s; }
          .fl-pstep.fl-pv:hover .fl-pstep-circle { background:rgba(14,165,233,.12);border-color:#0ea5e9;color:#0ea5e9; }
          .fl-pstep-connector { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px; }
          .fl-pstep-connector::before { content:'';width:2px;flex:1;background:#0F3460;opacity:.22; }
          .fl-pstep-connector::after { content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40; }
          .fl-pstep:last-child .fl-pstep-connector { display:none; }
          .fl-pstep-r { padding:4px 0 38px; }
          .fl-pstep:last-child .fl-pstep-r { padding-bottom:0; }
          .fl-pstep-title { font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px; }
          .fl-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }

          /* Testimonials */
          .fl-testi { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .fl-center-head { text-align:center;margin-bottom:48px; }
          .fl-tgrid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px; }
          .fl-tcard { background:linear-gradient(135deg,rgba(224,242,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s; }
          .fl-tcard.feat { background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(224,242,254,.42) 100%);border-color:rgba(217,119,6,.22); }
          .fl-tcard.fl-tv { opacity:1;transform:translateY(0); }
          .fl-tcard.fl-tv:hover { transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .fl-stars { font-size:16px;color:#D97706;letter-spacing:2px; }
          .fl-ttext { font-size:14px;line-height:1.75;color:#374151;flex:1; }
          .fl-tauthor { display:flex;align-items:center;gap:12px; }
          .fl-tavatar { width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0; }
          .fl-tname { font-size:14px;font-weight:700;color:#0F3460; }
          .fl-trole { font-size:12px;color:#6b7280; }

          /* Why */
          .fl-why-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .fl-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px; }
          .fl-wcard { background:linear-gradient(135deg,rgba(224,242,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .fl-wcard.fl-wv { opacity:1;transform:translateY(0) scale(1); }
          .fl-wcard.fl-wv:hover { transform:translateY(-5px) scale(1);border-color:rgba(14,165,233,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .fl-wcard-dot { width:10px;height:10px;border-radius:50%;background:#0ea5e9;margin-bottom:12px; }
          .fl-wcard h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35; }
          .fl-wcard p { font-size:13px;color:#4A6080;line-height:1.65;margin:0; }

          /* Contact */
          .fl-contact { padding:70px 40px;background:linear-gradient(135deg,rgba(224,242,254,.55) 0%,rgba(255,255,255,.60) 40%,rgba(237,233,254,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1; }
          .fl-contact-grid { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start; }
          .fl-ctitle { font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#0ea5e9 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .fl-cdesc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px; }
          .fl-cbenefits { background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px; }
          .fl-cbenefit { display:flex;gap:10px;align-items:flex-start; }
          .fl-cbenefit-icon { flex-shrink:0;color:#0ea5e9;font-weight:800;font-size:16px;margin-top:1px; }
          .fl-cbenefit p { font-size:13px;color:#4A6080;margin:0;line-height:1.55; }
          .fl-form-box { background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(224,242,254,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1); }
          .fl-form-box h3 { font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px; }
          .fl-form { display:flex;flex-direction:column;gap:13px; }
          .fl-frow { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .fl-fg { display:flex;flex-direction:column;gap:5px; }
          .fl-fg.full { grid-column:1/-1; }
          .fl-fg label { font-size:12px;font-weight:500;color:#0F1F40; }
          .fl-fg input,.fl-fg textarea,.fl-fg select { padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s; }
          .fl-fg input:focus,.fl-fg textarea:focus,.fl-fg select:focus { outline:none;border-color:#0ea5e9;box-shadow:0 0 0 3px rgba(14,165,233,.10); }
          .fl-consent { display:flex;gap:8px;align-items:flex-start; }
          .fl-consent input { margin-top:3px;width:15px;height:15px; }
          .fl-consent label { font-size:11px;color:#4A6080;line-height:1.5; }
          .fl-consent a { color:#0F3460; }
          .fl-submit { width:100%;padding:14px;background:#0ea5e9;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(14,165,233,.28); }
          .fl-submit:hover { background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28); }

          /* FAQ */
          .fl-faq { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1; }
          .fl-faq h2 { font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px; }
          .fl-faq-sub { font-size:15px;color:#4A6080;margin:0 0 36px; }
          .fl-faq-list { display:flex;flex-direction:column;gap:10px; }
          .fl-fitem { background:linear-gradient(135deg,rgba(224,242,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s; }
          .fl-fitem.open { border-color:rgba(14,165,233,.35); }
          .fl-fitem.open::before { content:'';display:block;height:3px;background:linear-gradient(90deg,#0ea5e9,#38bdf8);border-radius:3px 3px 0 0; }
          .fl-fq { width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative; }
          .fl-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s; }
          .fl-fitem.open .fl-fq-badge { background:#0ea5e9;color:#fff; }
          .fl-fq span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4; }
          .fl-fitem.open .fl-fq span { color:#075985; }
          .fl-fchev { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s; }
          .fl-fitem.open .fl-fchev { transform:rotate(180deg);color:#0ea5e9; }
          .fl-fanswer-wrap { overflow:hidden;transition:max-height .35s ease;max-height:0; }
          .fl-fitem.open .fl-fanswer-wrap { max-height:500px; }
          .fl-fanswer { padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8; }

          /* Related */
          .fl-related { padding:80px 40px;background:rgba(224,242,254,.18);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60); }
          .fl-related-inner { max-width:1300px;margin:0 auto;text-align:center; }
          .fl-related h2 { font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px; }
          .fl-related-sub { font-size:14px;color:#4A6080;margin:0 auto;max-width:560px; }
          .fl-related hr { border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0; }
          .fl-rtags { display:flex;flex-wrap:wrap;justify-content:center;gap:10px; }
          .fl-rtag { display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s; }
          .fl-rtag:hover { transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09); }
          .fl-rtag-blue   { background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8; }
          .fl-rtag-violet { background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9; }
          .fl-rtag-amber  { background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309; }
          .fl-rtag-teal   { background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E; }
          .fl-rtag-green  { background:rgba(16,185,129,.09);border-color:rgba(16,185,129,.26);color:#065f46; }
          .fl-rtag-sky    { background:rgba(14,165,233,.09);border-color:rgba(14,165,233,.28);color:#075985; }

          /* Responsive */
          @media(max-width:1024px){
            .fl-hero h1,.fl-s-title,.fl-faq h2 { font-size:36px; }
            .fl-svc-grid { grid-template-columns:repeat(2,1fr); }
            .fl-stack-grid { grid-template-columns:repeat(2,1fr); }
            .fl-eng-grid { grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto; }
            .fl-eng-card.feat { transform:none; }
            .fl-eng-card.feat.fl-ev { transform:none; }
            .fl-eng-card.feat.fl-ev:hover { transform:translateY(-4px); }
            .fl-why-grid { grid-template-columns:repeat(2,1fr); }
            .fl-tgrid { grid-template-columns:1fr; }
            .fl-contact-grid { grid-template-columns:1fr; }
          }
          @media(max-width:768px){
            .fl-breadcrumb { padding:12px 20px 0; }
            .fl-hero { padding:28px 20px 20px; }
            .fl-hero h1 { font-size:26px;letter-spacing:-.3px; }
            .fl-stats { grid-template-columns:1fr 1fr; }
            .fl-stat-col:nth-child(2) { border-right:none; }
            .fl-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,.10); }
            .fl-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,.10);border-right:none; }
            .fl-logos { padding:16px 20px 28px; }
            .fl-svc-section,.fl-stack-section,.fl-eng-section,.fl-process-section,.fl-testi,.fl-why-section,.fl-faq,.fl-related { padding:52px 20px; }
            .fl-contact { padding:48px 20px; }
            .fl-svc-grid,.fl-stack-grid,.fl-why-grid { grid-template-columns:1fr; }
            .fl-frow { grid-template-columns:1fr; }
            .fl-ctitle { font-size:28px; }
            .fl-s-title { font-size:28px; }
          }
        `}</style>
      </Head>

      <div className="fl-page">
        <div className="fl-orb fl-orb-1" />
        <div className="fl-orb fl-orb-2" />
        <div className="fl-orb fl-orb-3" />

        {/* ── BREADCRUMB ── */}
        <nav className="fl-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Flutter App Development Services</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── HERO ── */}
        <section className="fl-hero">
          <span className="fl-eyebrow">Flutter App Development Services</span>
          <h1>Cross-Platform Flutter Apps — Built Once, Shipped Everywhere</h1>
          <p className="fl-hero-desc">We build production-quality Flutter applications for iOS, Android, web, and desktop from a single Dart codebase — delivering native performance, 60fps animations, and pixel-perfect UI at 40–60% lower cost than separate native development. From MVP to enterprise-scale Flutter apps.</p>
          <div className="fl-trust-row">
            {['100+ Flutter Apps Shipped','iOS + Android + Web + Desktop','60fps Native Performance','15+ Years Experience','App Store & Play Store Ready'].map(b => (
              <div className="fl-badge" key={b}><span className="fl-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="fl-ctas">
            <Link href="#contact" className="fl-btn-primary">Start Your Flutter Project</Link>
            <Link href="#engagement" className="fl-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="fl-stats" ref={statsRef}>
          {[['100+','Flutter Apps Shipped'],['15+','Years Experience'],['50M+','App Downloads'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        {/* ── CLIENT LOGOS ── */}
        <div className="fl-logos">
          <span className="fl-logos-label">Trusted by Leading Organisations</span>
          <div className="fl-logos-wrap">
            <div className="fl-logos-track">
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
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="fl-clogo" />
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="fl-svc-section" aria-labelledby="fl-svc-heading">
          <div className="fl-inner">
            <div className={`fl-s-reveal${visibleSections.has('svc') ? ' fl-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="fl-s-eyebrow">What We Build</span>
              <h2 id="fl-svc-heading" className="fl-s-title">Flutter App Development Services We Deliver</h2>
              <p className="fl-s-desc" style={{ maxWidth: 720 }}>From consumer apps and Flutter MVPs to enterprise mobile platforms, offline-first field apps, and React Native migrations — our Flutter engineers cover every stage of the app development lifecycle.</p>
            </div>
            <div className="fl-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`fl-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' fl-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="fl-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="fl-svc-more">
                <button className="fl-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section id="stack" className="fl-stack-section" aria-labelledby="fl-stack-heading">
          <div className="fl-inner">
            <div className={`fl-s-reveal${visibleSections.has('stk') ? ' fl-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="fl-s-eyebrow">The Flutter Tech Stack We Use</span>
              <h2 id="fl-stack-heading" className="fl-s-title">Flutter & Dart Expertise Across the Full Stack</h2>
              <p className="fl-s-desc" style={{ maxWidth: 680 }}>From Flutter 3.x with Dart sound null safety and BLoC state management through Firebase, Supabase, Rive animations, Codemagic CI/CD, and Firebase Analytics — every layer of the modern Flutter app ecosystem.</p>
            </div>
            <div className="fl-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`fl-stack-card${visibleStackCards.includes(i) ? ' fl-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="fl-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="fl-stack-pills">
                    {grp.items.map(item => (
                      <span key={item} className="fl-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section id="engagement" className="fl-eng-section" aria-labelledby="fl-eng-heading">
          <div className="fl-inner">
            <div className={`fl-s-reveal${visibleSections.has('eng') ? ' fl-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="fl-s-eyebrow">How We Work With You</span>
              <h2 id="fl-eng-heading" className="fl-s-title">Engagement Models for Flutter Development</h2>
              <p className="fl-s-desc" style={{ maxWidth: 680 }}>Whether you need a dedicated Flutter team for a long-term app roadmap, a fixed-price MVP build, or flexible T&M sprints for iterative development — we structure the engagement around your product stage and budget.</p>
            </div>
            <div className="fl-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`fl-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' fl-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="fl-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="fl-eng-icon">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg>
                  </div>
                  <div className="fl-eng-name">{m.name}</div>
                  <div className="fl-eng-headline">{m.headline}</div>
                  <div className="fl-eng-desc">{m.desc}</div>
                  <div className="fl-eng-list-label">Best for</div>
                  <ul className="fl-eng-list">
                    {m.bestFor.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="fl-eng-process">
                    <strong>Process:</strong> {m.process}<br />
                    <span className="fl-eng-timeline">{m.timeline}</span>
                  </div>
                  <Link href="#contact" className="fl-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="fl-process-section" aria-labelledby="fl-proc-heading">
          <div className="fl-inner" style={{ maxWidth: 760 }}>
            <div className={`fl-s-reveal${visibleSections.has('proc') ? ' fl-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="fl-s-eyebrow">How We Deliver</span>
              <h2 id="fl-proc-heading" className="fl-s-title">Our Flutter App Development Process</h2>
              <p className="fl-s-desc">A six-stage process from architecture and Figma design through biweekly sprint builds, backend integration, QA profiling, and managed store launch — with a working app build in your hands from week two, not week twenty.</p>
            </div>
            <div className="fl-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`fl-pstep${visibleSections.has('proc') ? ' fl-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="fl-pstep-l">
                    <div className="fl-pstep-circle">{step.num}</div>
                    <div className="fl-pstep-connector" />
                  </div>
                  <div className="fl-pstep-r">
                    <div className="fl-pstep-title">{step.title}</div>
                    <p className="fl-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="fl-testi" aria-labelledby="fl-ts-heading">
          <div className="fl-inner">
            <div className={`fl-center-head fl-s-reveal${visibleSections.has('ts') ? ' fl-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="fl-s-eyebrow">Client Results</span>
              <h2 id="fl-ts-heading" className="fl-s-title">What Our Flutter App Clients Say</h2>
              <p className="fl-s-desc">Trusted by startup founders, enterprise engineering teams, and product leaders across the US, UK, and Australia who needed a Flutter partner they could rely on to ship.</p>
            </div>
            <div className="fl-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`fl-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' fl-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}
                  itemScope itemType="https://schema.org/Review">
                  <div className="fl-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="fl-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="fl-tauthor">
                    <div className="fl-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div>
                      <div className="fl-tname" itemProp="author">{t.name}</div>
                      <div className="fl-trole">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="fl-why-section" aria-labelledby="fl-wy-heading">
          <div className="fl-inner">
            <div className={`fl-s-reveal${visibleSections.has('wy') ? ' fl-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="fl-s-eyebrow">Why 1Solutions</span>
              <h2 id="fl-wy-heading" className="fl-s-title">Why Choose Us for Flutter App Development</h2>
              <p className="fl-s-desc" style={{ maxWidth: 680 }}>100+ Flutter apps shipped across consumer, enterprise, fintech, healthtech, logistics, and field-service verticals — with clean architecture, design-led development, end-to-end delivery, and a performance obsession that shows in every frame rate metric.</p>
            </div>
            <div className="fl-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`fl-wcard${visibleWhyCards.includes(i) ? ' fl-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="fl-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="fl-contact" aria-labelledby="fl-contact-heading">
          <div className="fl-contact-grid">
            <div>
              <h2 id="fl-contact-heading" className="fl-ctitle">Start Your Flutter App Project</h2>
              <p className="fl-cdesc">Tell us about your app idea and we will schedule a free 60-minute Flutter discovery call with a senior mobile architect. We will review your requirements, recommend an architecture, and give you a realistic scope, timeline, and cost estimate at no charge.</p>
              <div className="fl-cbenefits">
                {[
                  ['✓', 'Free 60-minute Flutter discovery and architecture review call'],
                  ['✓', 'App scope, screen list, and high-level tech stack recommendation at no charge'],
                  ['✓', 'Build-vs-buy analysis — Flutter vs React Native vs native iOS/Android'],
                  ['✓', 'NDA available on request — your app concept stays confidential'],
                  ['✓', 'Response within 24 business hours from our Flutter engineering lead'],
                ].map(([icon, text]) => (
                  <div className="fl-cbenefit" key={text}>
                    <span className="fl-cbenefit-icon">{icon}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="fl-form-box">
              <h3>Tell Us About Your Flutter App</h3>
              <form className="fl-form" onSubmit={e => e.preventDefault()}>
                <div className="fl-frow">
                  <div className="fl-fg">
                    <label htmlFor="fl-name">Full Name *</label>
                    <input id="fl-name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="fl-fg">
                    <label htmlFor="fl-email">Work Email *</label>
                    <input id="fl-email" type="email" placeholder="you@company.com" required />
                  </div>
                </div>
                <div className="fl-frow">
                  <div className="fl-fg">
                    <label htmlFor="fl-company">Company / App Name</label>
                    <input id="fl-company" type="text" placeholder="Company or app name" />
                  </div>
                  <div className="fl-fg">
                    <label htmlFor="fl-phone">Phone / WhatsApp</label>
                    <input id="fl-phone" type="tel" placeholder="+1 555 000 0000" />
                  </div>
                </div>
                <div className="fl-fg full">
                  <label htmlFor="fl-type">Project Type *</label>
                  <select id="fl-type" required>
                    <option value="">Select project type...</option>
                    <option>New Flutter App (iOS + Android)</option>
                    <option>Flutter MVP / Proof of Concept</option>
                    <option>Flutter + Web + Desktop (Multi-platform)</option>
                    <option>Migration from React Native to Flutter</option>
                    <option>Migration from Ionic / Cordova to Flutter</option>
                    <option>Flutter Enterprise / B2B App</option>
                    <option>Flutter UI/UX Design & Animation</option>
                    <option>Flutter Backend Integration</option>
                    <option>Flutter Performance Optimisation</option>
                    <option>Flutter App Maintenance & Support</option>
                    <option>Flutter Dedicated Team (ongoing)</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="fl-fg full">
                  <label htmlFor="fl-msg">App Brief *</label>
                  <textarea id="fl-msg" rows={4} placeholder="Describe your app — target users, core features, platforms needed (iOS/Android/web/desktop), existing backend or API, current stage (idea/MVP/live), and go-live timeline..." required />
                </div>
                <div className="fl-consent">
                  <input id="fl-consent" type="checkbox" required />
                  <label htmlFor="fl-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. An NDA is available on request before we discuss your app concept or review any existing code.</label>
                </div>
                <button type="submit" className="fl-submit">Get Free Flutter Discovery Call →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="fl-faq" aria-labelledby="fl-faq-heading">
          <div className="fl-inner" style={{ maxWidth: 860 }}>
            <span className="fl-s-eyebrow">FAQ</span>
            <h2 id="fl-faq-heading">Flutter App Development — Frequently Asked Questions</h2>
            <p className="fl-faq-sub">Everything you need to know about building a production-quality Flutter app with 1Solutions — from framework choice and timelines to state management, offline support, and store submission.</p>
            <div className="fl-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`fl-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="fl-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="fl-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="fl-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="fl-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="fl-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="fl-related">
          <div className="fl-related-inner">
            <span className="fl-s-eyebrow">Explore More</span>
            <h2>Related Mobile & Software Development Services</h2>
            <p className="fl-related-sub">We also build React Native apps, native iOS and Android apps, SaaS platforms, and enterprise mobile backends.</p>
            <hr />
            <div className="fl-rtags">
              {[
                ['/mobile-app-development/', 'Mobile App Development', 'fl-rtag-sky'],
                ['/react-native-app-development/', 'React Native Development', 'fl-rtag-blue'],
                ['/ios-app-development/', 'iOS App Development', 'fl-rtag-violet'],
                ['/android-app-development/', 'Android App Development', 'fl-rtag-green'],
                ['/saas-development-company/', 'SaaS Development Company', 'fl-rtag-amber'],
                ['/ui-ux-design-services/', 'UI/UX Design Services', 'fl-rtag-violet'],
                ['/erp-application-development-company/', 'ERP Application Development', 'fl-rtag-amber'],
                ['/crm-application-development-company/', 'CRM Application Development', 'fl-rtag-teal'],
                ['/api-development-company/', 'API Development & Integration', 'fl-rtag-sky'],
                ['/hire-react-native-developer/', 'Hire React Native Developer', 'fl-rtag-blue'],
              ].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`fl-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
