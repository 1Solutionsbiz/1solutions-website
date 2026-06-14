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
        { '@type': 'ListItem', position: 2, name: 'Android Application Development Company', item: 'https://www.1solutions.biz/android-application-development-company/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Android Application Development',
      url: 'https://www.1solutions.biz/android-application-development-company/',
      description: 'Native Android application development in Kotlin and Jetpack Compose — from consumer apps and Android MVPs to enterprise mobility solutions, Android TV, Wear OS, and large-screen tablet experiences. Play Store-ready, performant, and built with clean architecture.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '118', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Should I build a native Android app or use a cross-platform framework like Flutter or React Native?', acceptedAnswer: { '@type': 'Answer', text: 'Native Android development in Kotlin gives you the best possible performance, the deepest access to Android device capabilities, the most idiomatic Android UX, and no framework abstraction layer between your code and the OS. This matters most for apps with complex UI, intensive background processing, Bluetooth/BLE, camera or media manipulation, Android enterprise MDM requirements, or Android TV/Wear OS targets. Cross-platform (Flutter, React Native) is a strong choice when you need simultaneous iOS launch and your app is primarily data-display and form-based. For Android-first businesses, or apps requiring platform-specific hardware integration, native Kotlin is the right choice.' } },
        { '@type': 'Question', name: 'How long does it take to develop an Android app?', acceptedAnswer: { '@type': 'Answer', text: 'A native Android MVP covering authentication, 3–6 core screens, API integration, and Play Store submission typically takes 10–16 weeks. A mid-complexity Android app with custom UI (Jetpack Compose), real-time features, payments, and background services typically takes 18–26 weeks. A full enterprise Android app with offline capability, complex data sync, MDM integration, multiple user roles, and a companion admin dashboard typically takes 28–40 weeks. We deliver working APK builds to Firebase App Distribution on a biweekly sprint cycle so you can test on real devices throughout development.' } },
        { '@type': 'Question', name: 'Do you build Android apps in Kotlin or Java?', acceptedAnswer: { '@type': 'Answer', text: 'All new Android development we do is in Kotlin with Jetpack Compose for the UI layer — this is the current Google-recommended approach and the direction of the entire Android ecosystem. We also maintain and extend existing Java Android codebases, and handle Java-to-Kotlin migration projects, including introducing Compose UI incrementally alongside existing XML Views. For legacy Java codebases we produce a migration plan that phases in Kotlin and Compose without a full rewrite, protecting your existing investment while modernising the codebase for the long term.' } },
        { '@type': 'Question', name: 'Can you migrate our existing Java Android app to Kotlin and Jetpack Compose?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Android modernisation migrations are a speciality. The typical approach is phased: first introduce Kotlin interoperability and migrate the data and domain layers (ViewModel, Repository, Use Cases) to Kotlin with Coroutines and Flow, then migrate the UI layer from XML Views to Jetpack Compose screen by screen — using the ComposeView interop bridge to run Compose and Views side by side during the transition. This avoids a big-bang rewrite and allows continuous feature delivery while the migration progresses. We deliver improved performance, reduced boilerplate, and a modern testable architecture as tangible outcomes of the migration.' } },
        { '@type': 'Question', name: 'Do you build Android apps for tablets and large screens?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Android large-screen support (tablets, foldables, and Chromebook/desktop modes) is a first-class capability in our Android development. We implement adaptive layouts using WindowSizeClass, multi-pane navigation (list-detail), drag-and-drop support, stylus input handling, and display cutout/hinge-aware layouts for foldable devices. We also run full device compatibility testing on tablet emulators and physical large-screen devices to ensure Play Store large-screen quality badges. Many of our clients specifically require Android tablet apps for field operations, healthcare, and logistics workflows.' } },
        { '@type': 'Question', name: 'Can you build Android apps for enterprise with MDM and SSO support?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Enterprise Android development is a core capability. We build Android Enterprise-compatible apps supporting managed configurations (for EMM/MDM deployment via Google Play), Android Work Profile, DPC (device policy controller) integration, SAML and OAuth SSO (Okta, Azure AD, Google Workspace), certificate-based authentication, VPN-bound networking, and app signing for enterprise distribution channels. We have built enterprise Android apps deployed to 10,000+ managed devices across logistics, healthcare, and field service sectors.' } },
      ],
    },
  ],
};

/* ─── Page data ──────────────────────────────────────────────── */
const SERVICES = [
  { n: '01', title: 'Custom Android App Development', desc: 'End-to-end native Android app development in Kotlin and Jetpack Compose — from architecture design and UI implementation through Play Store submission and post-launch maintenance. Consumer apps, B2B tools, and enterprise mobility solutions for phones, tablets, and foldables.' },
  { n: '02', title: 'Android MVP & Rapid Prototyping', desc: 'A production-quality Android MVP on Google Play in 10–16 weeks. We scope the core user journeys, design a polished Compose UI, integrate essential backend APIs, and deliver an APK via Firebase App Distribution throughout development — ready for real user feedback before your full launch.', feat: true },
  { n: '03', title: 'Kotlin & Jetpack Compose Development', desc: 'Modern native Android development using Kotlin (the Google-recommended language), Jetpack Compose (declarative UI), Coroutines and Flow for async, Hilt for dependency injection, and the full Jetpack suite — Room, Navigation, WorkManager, Paging 3, and DataStore.' },
  { n: '04', title: 'Android Tablet & Large-Screen Apps', desc: 'Adaptive Android layouts for tablets, foldables, and Chromebooks — WindowSizeClass-based responsive design, multi-pane list-detail navigation, stylus input, hinge-aware layouts for foldable devices, and Play Store large-screen quality badge compliance testing.' },
  { n: '05', title: 'Android TV & Wear OS Apps', desc: 'Specialised Android platform development for Android TV (Leanback library, D-pad navigation, content recommendations), Wear OS (health and fitness apps, complication providers, Tiles), and Android Auto — extending your brand across every Google surface.' },
  { n: '06', title: 'Java → Kotlin & Legacy App Modernisation', desc: 'Phased Android modernisation: migrate existing Java codebases to Kotlin with Coroutines/Flow, introduce Jetpack Compose UI alongside existing XML Views using ComposeView interop, adopt clean architecture (MVVM/MVI), and upgrade deprecated APIs — without stopping feature delivery.' },
  { n: '07', title: 'Android Backend Integration & API Development', desc: 'REST and GraphQL API integration with Retrofit/OkHttp, Firebase (Realtime Database, Firestore, Auth, FCM push notifications), Supabase, WebSockets for real-time data, payment gateway SDKs (Stripe, Razorpay), and Google Maps/Places API integration.' },
  { n: '08', title: 'Android Performance Optimisation', desc: 'Deep Android performance work — reducing UI jank with Compose stability analysis and recomposition profiling, optimising battery consumption (WorkManager, Doze-mode compliance), reducing APK/AAB size (R8, resource shrinking), fixing memory leaks (LeakCanary), and improving cold-start time.' },
  { n: '09', title: 'Android Enterprise & MDM Applications', desc: 'Enterprise Android apps with managed configuration, Android Work Profile, EMM/MDM compatibility (Intune, VMware Workspace ONE, SOTI), SAML/OAuth SSO, certificate-based auth, VPN-bound networking, and silent enterprise distribution via managed Google Play.' },
  { n: '10', title: 'Android App Maintenance & Play Store Support', desc: 'Ongoing Android maintenance — target SDK updates (mandatory yearly for Play Store compliance), dependency upgrades, Google Play policy compliance reviews, ANR and crash investigation via Play Console and Firebase Crashlytics, and feature sprint delivery post-launch.' },
];

const TECH_STACK = [
  {
    group: 'Android Core',
    color: '#16a34a',
    items: ['Kotlin', 'Java (legacy)', 'Android SDK', 'Android Studio', 'Gradle / KTS', 'Android Emulator'],
  },
  {
    group: 'UI — Jetpack Compose',
    color: '#15803d',
    items: ['Jetpack Compose', 'Material Design 3', 'XML Views (legacy)', 'ComposeView Interop', 'Compose Animation', 'Adaptive Layouts (WindowSizeClass)'],
  },
  {
    group: 'Architecture & DI',
    color: '#D97706',
    items: ['MVVM / MVI', 'Clean Architecture', 'Hilt (DI)', 'Dagger 2', 'Jetpack Navigation', 'ViewModel / LiveData / StateFlow'],
  },
  {
    group: 'Async & Local Data',
    color: '#0ea5e9',
    items: ['Kotlin Coroutines', 'Kotlin Flow', 'Room (SQLite ORM)', 'DataStore (Preferences / Proto)', 'WorkManager', 'Paging 3'],
  },
  {
    group: 'Backend & Networking',
    color: '#14b8a6',
    items: ['Retrofit / OkHttp', 'Firebase (Auth, Firestore, FCM)', 'GraphQL (Apollo Android)', 'Supabase', 'WebSockets', 'Google Maps / Places API'],
  },
  {
    group: 'Device & Native Features',
    color: '#f97316',
    items: ['CameraX / Camera2', 'GPS / FusedLocationProvider', 'Biometrics (BiometricPrompt)', 'Bluetooth / BLE', 'NFC', 'Background Services / Foreground'],
  },
  {
    group: 'CI/CD & Distribution',
    color: '#6366f1',
    items: ['Fastlane', 'GitHub Actions', 'Firebase App Distribution', 'Google Play Console', 'Gradle build flavours', 'App Bundle (AAB)'],
  },
  {
    group: 'Testing, Analytics & Security',
    color: '#a855f7',
    items: ['JUnit 5 / Mockito', 'Espresso / UI Automator', 'Firebase Crashlytics', 'Firebase Analytics', 'ProGuard / R8 (obfuscation)', 'Google Play Integrity API'],
  },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'dedicated',
    name: 'Dedicated Android Team',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'A dedicated Android squad working exclusively on your app.',
    desc: 'A full-time offshore Android team — Kotlin developer(s), UI/UX designer, QA engineer, and backend developer — working as a seamless extension of your team at a fraction of US/UK/AU in-house cost. Sprint-based delivery, daily standups, biweekly APK builds. Full source code and IP ownership yours from day one.',
    bestFor: ['Full-featured native Android app with ongoing roadmap', 'Long-term Android product with monthly feature releases', 'Replacing in-house Android capacity at lower cost', 'Android enterprise app deployed across a managed device fleet'],
    process: 'Team assembly → Discovery sprint → Biweekly APK releases → Continuous roadmap',
    timeline: 'Ongoing — scale up or down per quarter',
  },
  {
    id: 'fixed',
    name: 'Fixed Price',
    badge: 'Well-defined scope',
    badgeColor: '#16a34a',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Agreed scope. Agreed price. App delivered on time.',
    desc: 'Best for a clearly defined Android MVP or a feature set with agreed user stories and screen designs. We quote a fixed price covering design, Kotlin development, testing, and Play Store submission — with milestone APK releases throughout. No scope creep, no surprise invoices.',
    bestFor: ['Android MVP with defined screens and user stories', 'Java-to-Kotlin migration with agreed scope', 'New Android feature module with defined requirements', 'Legacy Android app upgrade to target SDK 35+'],
    process: 'Detailed spec → Fixed quote → Milestone APK delivery → Play Store launch',
    timeline: 'Best for projects 10–24 weeks',
  },
  {
    id: 'tm',
    name: 'Time & Material',
    badge: 'Agile & flexible',
    badgeColor: '#a855f7',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Pay for hours worked. Adapt as the product evolves.',
    desc: 'Billed on actual time and resources used. Ideal for Android discovery sprints, iterative consumer apps where UX is validated with real users before scope is locked, or adding new Compose screens and Kotlin features to an existing Android codebase.',
    bestFor: ['Android architecture audit and modernisation planning', 'Iterative consumer app driven by user research', 'Adding Jetpack Compose to an existing XML/Java codebase', 'Android performance profiling and optimisation engagement'],
    process: 'Sprint planning → Biweekly APK → Iterative refinement → Transparent timesheets',
    timeline: 'Start in 1 week — no lengthy onboarding',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery, Architecture & Android Stack Decision', desc: 'We start with a structured discovery of your app concept, target Android devices (phones, tablets, foldables, TV, Wear OS), performance requirements, backend and API design, and Play Store strategy. We define the architecture (MVVM or MVI, Clean Architecture layering), DI approach (Hilt), navigation graph, and the full Jetpack component set before sprint planning begins.' },
  { num: '02', title: 'UI/UX Design — Material Design 3 & Compose Prototyping', desc: 'Our designers produce high-fidelity Figma prototypes following Material Design 3 guidelines with adaptive layouts for phone and tablet. We define the Compose component library — theming tokens (color scheme, typography, shapes), reusable Composable functions, and animation specs — before development so sprint velocity is maximised from day one.' },
  { num: '03', title: 'Agile Sprint Development — Biweekly APK Builds', desc: 'Android development runs in two-week sprints. Every sprint you receive a working APK/AAB via Firebase App Distribution covering the sprint scope — install it on any Android device and test the real app. No waiting until the end to see the product. Sprint reviews include a live demo with screen recording for async stakeholder review.' },
  { num: '04', title: 'Backend & API Integration', desc: 'Backend integrations are built in parallel with Android development — Retrofit REST or Apollo GraphQL clients, Firebase Auth and Firestore/FCM configuration, payment gateway SDK integration (Stripe, Razorpay, Google Pay), Google Maps and Places integration, third-party SDK setup, and WebSocket or Server-Sent Events for real-time features.' },
  { num: '05', title: 'QA, Performance Profiling & Play Store Compliance', desc: 'Comprehensive QA across physical Android devices covering a range of manufacturers (Samsung, Pixel, OnePlus) and API levels (Android 10–15). Android Studio Profiler for CPU, memory, and network analysis. Compose recomposition profiler to eliminate unnecessary rebuilds. Play Store pre-launch report review, data safety form completion, and content rating submission.' },
  { num: '06', title: 'Play Store Launch, Monitoring & Ongoing Roadmap', desc: 'Managed Google Play Console submission — production release, staged rollout (10% → 50% → 100%), release notes, and store listing optimisation. Post-launch monitoring via Firebase Crashlytics, Play Console vitals (ANR rate, crash rate), and Firebase Analytics. A defined sprint cadence for ongoing feature delivery, yearly target SDK updates, and Play Store policy compliance maintenance.' },
];

const TESTIMONIALS = [
  {
    text: "We had an old Java Android app that was crashing constantly and failing Play Store target SDK requirements. 1Solutions migrated it to Kotlin with Jetpack Compose, fixed the architecture, and got our crash rate from 4.8% down to 0.3%. The app feels completely new — our users noticed immediately and our Play Store rating went from 3.4 to 4.6.",
    name: 'Richard P.', role: 'Head of Product, SaaS Company (UK)', init: 'RP', bg: '#0F3460',
  },
  {
    text: "1Solutions built our Android field operations app for 3,500 logistics drivers — offline-first, GPS tracking, barcode scanning, digital proof-of-delivery signatures, and real-time dispatch sync. It works flawlessly on the mix of Samsung and Zebra devices our fleet uses. The ROI was visible within two months of launch.",
    name: 'Michelle O.', role: 'CTO, Logistics Company (AU)', init: 'MO', bg: '#14532d', feat: true,
  },
  {
    text: "We needed a native Android app fast — investors were waiting and we had a 12-week window. 1Solutions delivered a polished Kotlin/Compose MVP to the Play Store in 11 weeks. The Compose animations and performance were noticeably better than competitors' React Native apps. We closed our seed round two weeks after launch.",
    name: 'Alex F.', role: 'Founder, Consumer App Startup (US)', init: 'AF', bg: '#1e1b4b',
  },
];

const WHY_CARDS = [
  { title: '150+ Native Android Apps Shipped', desc: 'We have shipped 150+ native Android apps across consumer, B2B, enterprise, logistics, healthcare, fintech, and field-service verticals — from solo MVP launches to apps deployed across 10,000+ managed enterprise devices on the Play Store.' },
  { title: 'Kotlin-First, Compose-First Since Day One', desc: 'We adopted Kotlin and Jetpack Compose early and have shipped production Compose UIs since Compose 1.0 stable. Our engineers understand Compose recomposition, state hoisting, side effects, and Compose performance profiling at a depth that comes from building real apps — not tutorials.' },
  { title: 'Clean Architecture — Maintainable & Testable', desc: 'Every Android app we build uses a clean layered architecture (presentation / domain / data), Hilt for dependency injection, Kotlin Flow for reactive state, and a full unit and integration test suite. Future developers — yours or ours — can understand and extend the codebase immediately.' },
  { title: 'Material Design 3 & Adaptive UI Expertise', desc: 'Our designers and developers are fluent in Material Design 3 — dynamic colour, typography scale, elevation, motion — and implement adaptive layouts for the full Android device spectrum: phones, tablets, foldables, and Chromebooks. Your app earns Play Store quality badges.' },
  { title: 'Performance at the Core, Not an Afterthought', desc: 'We profile every Android app with Android Studio Profiler before release — checking CPU traces, memory allocations, jank frame counts, and battery consumption. We run Compose recomposition analysis, LeakCanary for memory leaks, and cold-start timing on mid-range Android devices.' },
  { title: 'Enterprise Android & MDM Expertise', desc: 'We build Android Enterprise-compatible apps with managed configurations, Work Profile support, MDM platform compatibility (Intune, Workspace ONE, SOTI), SAML/OAuth SSO, and silent enterprise distribution via managed Google Play. Deployed to enterprise fleets of 1,000–50,000 devices.' },
  { title: 'End-to-End — App + Backend + DevOps', desc: 'We build the full stack your Android app needs — the Kotlin front-end, the backend API (Node.js, Python, Firebase/Supabase), Fastlane/GitHub Actions CI/CD pipeline, Firebase App Distribution for internal testing, and Play Store management. One partner, full accountability.' },
  { title: 'Transparent Delivery. Full IP Ownership.', desc: 'Biweekly APK builds you can install and test on your own devices, a shared sprint board, direct access to your Android lead engineer, and weekly progress reports. All source code, assets, and intellectual property are 100% yours from day one — no lock-in.' },
];

const FAQS = [
  { q: 'Should I build a native Android app or use a cross-platform framework like Flutter?', a: 'Native Android (Kotlin/Compose) gives you the best performance, deepest device hardware access, most idiomatic Android UX, and no framework abstraction layer. This matters most for apps with complex UI animation, intensive background processing, Bluetooth/BLE/NFC, camera or media pipelines, enterprise MDM requirements, or Android TV/Wear OS targets. Flutter is a strong choice when you need simultaneous iOS launch and your app is primarily data-display and form-based. For Android-first products or apps requiring deep hardware integration, native Kotlin is the right choice.' },
  { q: 'How long does it take to build a native Android app?', a: 'A native Android MVP covering authentication, 3–6 core screens, API integration, and Play Store submission typically takes 10–16 weeks. A mid-complexity app with Compose UI, real-time features, payments, and background services typically takes 18–26 weeks. A full enterprise Android app with offline capability, complex data sync, MDM integration, multiple user roles, and admin dashboard typically takes 28–40 weeks. We deliver working APK builds via Firebase App Distribution on a biweekly sprint cycle throughout development.' },
  { q: 'Do you build Android apps in Kotlin or Java?', a: 'All new Android development we do is in Kotlin with Jetpack Compose — the current Google-recommended approach. We also maintain and extend existing Java codebases, and handle Java-to-Kotlin migration projects including introducing Compose UI incrementally alongside existing XML Views using ComposeView interop. For legacy Java codebases, we produce a phased migration plan that modernises the codebase without a full rewrite, protecting your existing investment while delivering a Kotlin-first architecture for long-term maintainability.' },
  { q: 'Can you migrate our Java Android app to Kotlin and Jetpack Compose?', a: 'Yes. Android modernisation is a speciality. Our phased approach first migrates the data and domain layers to Kotlin with Coroutines and Flow, then migrates the UI from XML Views to Jetpack Compose screen by screen using the ComposeView bridge — allowing Compose and Views to coexist during the transition. This avoids a big-bang rewrite and allows continuous feature delivery. Outcomes include improved performance, reduced boilerplate, a modern testable architecture, and compliance with the latest Play Store target SDK requirements.' },
  { q: 'Do you build Android apps for tablets and large screens?', a: 'Yes. Android large-screen support is a first-class capability. We implement adaptive layouts using WindowSizeClass, multi-pane list-detail navigation, drag-and-drop, stylus input handling, and hinge-aware layouts for foldable devices. We test on tablet emulators and physical large-screen devices and ensure compliance with Play Store large-screen quality guidelines — earning the large-screen badge where applicable. Many clients specifically need Android tablet apps for field operations, healthcare, warehouse, and logistics workflows.' },
  { q: 'Can you build enterprise Android apps with MDM and SSO support?', a: 'Yes. Enterprise Android is a core speciality. We build apps supporting managed configurations for EMM/MDM deployment (Intune, Workspace ONE, SOTI), Android Work Profile, device policy controller integration, SAML and OAuth 2.0 SSO (Okta, Azure AD, Google Workspace), certificate-based authentication, VPN-bound networking, and silent enterprise distribution via managed Google Play. We have built enterprise Android apps deployed across fleets of 1,000 to 50,000+ managed devices.' },
  { q: 'How do you handle Play Store target SDK updates and policy compliance?', a: 'Google requires Android apps to target the latest or near-latest API level annually (currently API 35 for new apps). We handle all mandatory target SDK updates as part of our maintenance plans — reviewing deprecated API usage, updating permissions declarations, completing data safety form updates, reviewing Play Store policy changes that affect your app category, and managing the release of compliant updates before Google deadlines. This is included in our ongoing support retainer for all Android apps we build.' },
  { q: 'Do you build for Android TV and Wear OS as well as phones?', a: 'Yes. We develop for the full Android platform spectrum: Android TV (Leanback library, D-pad navigation, content recommendations, Android TV channels), Wear OS (health and fitness apps, watch face complications, Tiles for glanceable content, Wear Compose UI), and Android Auto (media and messaging apps via the Android for Cars App Library). We also build for Android tablets and foldables. If your product needs to span multiple Google surfaces, we build all of them from a shared Kotlin codebase with platform-specific UI layers.' },
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
    <div className="an-stat-col">
      <div className="an-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="an-stat-label">{label}</div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */
export default function AndroidAppDevelopment() {
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
        <title>Android Application Development Company | Kotlin & Jetpack Compose | 1Solutions</title>
        <meta name="description" content="Native Android app development in Kotlin & Jetpack Compose — phones, tablets, foldables, Android TV & Wear OS. 150+ apps shipped, Play Store-ready. Free discovery call." />
        <link rel="canonical" href="https://www.1solutions.biz/android-application-development-company/" />
        <meta property="og:title" content="Android Application Development Company | 1Solutions" />
        <meta property="og:description" content="Native Android development in Kotlin & Jetpack Compose — from MVP to enterprise mobility. 150+ apps shipped, 15+ years experience. Phone, tablet, foldable, TV & Wear OS." />
        <meta property="og:url" content="https://www.1solutions.biz/android-application-development-company/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .an-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dcfce7 0%,#dbeafe 25%,#f0fdf4 50%,#fef9c3 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; position:relative; overflow-x:hidden; }
          .an-page *,.an-page *::before,.an-page *::after { box-sizing:border-box; }

          /* Orbs */
          .an-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(20px); }
          .an-orb-1 { width:880px;height:880px;background:radial-gradient(circle,rgba(22,163,74,.22) 0%,rgba(34,197,94,.10) 40%,transparent 70%);top:-280px;right:-260px; }
          .an-orb-2 { width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px; }
          .an-orb-3 { width:550px;height:550px;background:radial-gradient(circle,rgba(59,130,246,.16) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%); }

          /* Breadcrumb */
          .an-breadcrumb { position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto; }
          .an-breadcrumb ol { display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0; }
          .an-breadcrumb li { display:flex;align-items:center;gap:6px; }
          .an-breadcrumb li::after { content:'/';opacity:.45; }
          .an-breadcrumb li:last-child::after { display:none; }
          .an-breadcrumb a { color:#0F3460;text-decoration:none; }
          .an-breadcrumb a:hover { text-decoration:underline; }

          /* Hero */
          .an-hero { position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px; }
          .an-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px; }
          .an-hero h1 { font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#16a34a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .an-hero-desc { font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px; }
          .an-trust-row { display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px; }
          .an-badge { display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07); }
          .an-badge-dot { width:7px;height:7px;border-radius:50%;background:#16a34a;flex-shrink:0; }
          .an-ctas { display:flex;flex-wrap:wrap;gap:12px;justify-content:center; }
          .an-btn-primary { display:inline-block;padding:14px 36px;background:#16a34a;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(22,163,74,.30); }
          .an-btn-primary:hover { background:#0F3460;transform:translateY(-2px); }
          .an-btn-ghost { display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s; }
          .an-btn-ghost:hover { background:rgba(255,255,255,.85);border-color:rgba(22,163,74,.5);transform:translateY(-2px); }

          /* Stats */
          .an-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95); }
          .an-stat-col { padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10); }
          .an-stat-col:last-child { border-right:none; }
          .an-stat-val { font-size:28px;font-weight:900;color:#16a34a;letter-spacing:-.5px;line-height:1; }
          .an-stat-label { font-size:11px;color:#4A6080;font-weight:500;margin-top:5px; }

          /* Logos */
          .an-logos { position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px; }
          .an-logos-label { font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0; }
          .an-logos-wrap { width:100%;overflow:hidden; }
          .an-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:an-marquee 28s linear infinite; }
          .an-logos-track:hover { animation-play-state:paused; }
          @keyframes an-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .an-clogo { height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s; }
          .an-clogo:hover { opacity:.85;filter:grayscale(0%); }

          /* Shared */
          .an-s-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block; }
          .an-s-title { font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px; }
          .an-s-desc { font-size:15px;color:#4A6080;line-height:1.7; }
          .an-s-reveal { opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1); }
          .an-s-reveal.an-revealed { opacity:1;transform:translateY(0); }
          .an-inner { max-width:1300px;margin:0 auto; }

          /* Services */
          .an-svc-section { background:transparent;padding:72px 40px 60px;position:relative;z-index:1; }
          .an-svc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px; }
          .an-svc-card { background:linear-gradient(135deg,rgba(220,252,231,.40) 0%,rgba(255,255,255,.82) 55%,rgba(219,234,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s; }
          .an-svc-card.an-cv { opacity:1;transform:translateY(0); }
          .an-svc-card.an-cv:hover { transform:translateY(-6px);border-color:rgba(22,163,74,.35);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .an-svc-card.feat { background:linear-gradient(135deg,rgba(220,252,231,.55) 0%,rgba(255,255,255,.87) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(22,163,74,.22); }
          .an-svc-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .an-svc-card h3 { font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1; }
          .an-svc-card p { font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1; }
          .an-svc-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#16a34a,#22c55e);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1); }
          .an-svc-card.an-cv:hover::before { transform:scaleY(1); }
          .an-svc-more { text-align:center;margin-top:22px; }
          .an-btn-more { display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit; }
          .an-btn-more:hover { background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px); }

          /* Tech Stack */
          .an-stack-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1; }
          .an-stack-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px; }
          .an-stack-card { background:linear-gradient(135deg,rgba(220,252,231,.40) 0%,rgba(255,255,255,.82) 55%,rgba(219,234,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .an-stack-card.an-sv { opacity:1;transform:translateY(0); }
          .an-stack-card.an-sv:hover { border-color:rgba(22,163,74,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .an-stack-group { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid; }
          .an-stack-pills { display:flex;flex-wrap:wrap;gap:6px; }
          .an-pill { display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid; }

          /* Engagement */
          .an-eng-section { padding:80px 40px;position:relative;z-index:1; }
          .an-eng-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px; }
          .an-eng-card { background:linear-gradient(135deg,rgba(220,252,231,.40) 0%,rgba(255,255,255,.82) 55%,rgba(219,234,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s; }
          .an-eng-card.an-ev { opacity:1;transform:translateY(0); }
          .an-eng-card.an-ev:hover { border-color:rgba(22,163,74,.30);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .an-eng-card.feat { background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(220,252,231,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px); }
          .an-eng-card.feat.an-ev { transform:translateY(-8px); }
          .an-eng-card.feat.an-ev:hover { transform:translateY(-12px); }
          .an-eng-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px; }
          .an-eng-icon { width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s; }
          .an-eng-card.an-ev:hover .an-eng-icon { background:rgba(22,163,74,.10); }
          .an-eng-card.feat .an-eng-icon { background:rgba(217,119,6,.10); }
          .an-eng-icon svg { fill:#0F3460;transition:fill .2s; }
          .an-eng-card.an-ev:hover .an-eng-icon svg { fill:#16a34a; }
          .an-eng-card.feat .an-eng-icon svg { fill:#D97706; }
          .an-eng-name { font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px; }
          .an-eng-headline { font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px; }
          .an-eng-desc { font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px; }
          .an-eng-list-label { font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px; }
          .an-eng-list { list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px; }
          .an-eng-list li { display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5; }
          .an-eng-list li::before { content:'✓';font-weight:800;color:#16a34a;flex-shrink:0;margin-top:1px; }
          .an-eng-process { font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08); }
          .an-eng-process strong { color:#0F3460; }
          .an-eng-timeline { display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px; }
          .an-eng-cta { display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18); }
          .an-eng-cta:hover { background:#0F3460;color:#fff; }
          .an-eng-card.feat .an-eng-cta { background:#16a34a;color:#fff;border-color:#16a34a; }
          .an-eng-card.feat .an-eng-cta:hover { background:#0F3460;border-color:#0F3460; }

          /* Process */
          .an-process-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .an-psteps { display:flex;flex-direction:column;margin-top:52px; }
          .an-pstep { display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1); }
          .an-pstep.an-pv { opacity:1;transform:translateY(0); }
          .an-pstep-l { display:flex;flex-direction:column;align-items:center; }
          .an-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s; }
          .an-pstep.an-pv:hover .an-pstep-circle { background:rgba(22,163,74,.12);border-color:#16a34a;color:#16a34a; }
          .an-pstep-connector { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px; }
          .an-pstep-connector::before { content:'';width:2px;flex:1;background:#0F3460;opacity:.22; }
          .an-pstep-connector::after { content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40; }
          .an-pstep:last-child .an-pstep-connector { display:none; }
          .an-pstep-r { padding:4px 0 38px; }
          .an-pstep:last-child .an-pstep-r { padding-bottom:0; }
          .an-pstep-title { font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px; }
          .an-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }

          /* Testimonials */
          .an-testi { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .an-center-head { text-align:center;margin-bottom:48px; }
          .an-tgrid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px; }
          .an-tcard { background:linear-gradient(135deg,rgba(220,252,231,.40) 0%,rgba(255,255,255,.82) 55%,rgba(219,234,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s; }
          .an-tcard.feat { background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(220,252,231,.42) 100%);border-color:rgba(217,119,6,.22); }
          .an-tcard.an-tv { opacity:1;transform:translateY(0); }
          .an-tcard.an-tv:hover { transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .an-stars { font-size:16px;color:#D97706;letter-spacing:2px; }
          .an-ttext { font-size:14px;line-height:1.75;color:#374151;flex:1; }
          .an-tauthor { display:flex;align-items:center;gap:12px; }
          .an-tavatar { width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0; }
          .an-tname { font-size:14px;font-weight:700;color:#0F3460; }
          .an-trole { font-size:12px;color:#6b7280; }

          /* Why */
          .an-why-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .an-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px; }
          .an-wcard { background:linear-gradient(135deg,rgba(220,252,231,.40) 0%,rgba(255,255,255,.82) 55%,rgba(219,234,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .an-wcard.an-wv { opacity:1;transform:translateY(0) scale(1); }
          .an-wcard.an-wv:hover { transform:translateY(-5px) scale(1);border-color:rgba(22,163,74,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .an-wcard-dot { width:10px;height:10px;border-radius:50%;background:#16a34a;margin-bottom:12px; }
          .an-wcard h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35; }
          .an-wcard p { font-size:13px;color:#4A6080;line-height:1.65;margin:0; }

          /* Contact */
          .an-contact { padding:70px 40px;background:linear-gradient(135deg,rgba(220,252,231,.55) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1; }
          .an-contact-grid { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start; }
          .an-ctitle { font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#16a34a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .an-cdesc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px; }
          .an-cbenefits { background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px; }
          .an-cbenefit { display:flex;gap:10px;align-items:flex-start; }
          .an-cbenefit-icon { flex-shrink:0;color:#16a34a;font-weight:800;font-size:16px;margin-top:1px; }
          .an-cbenefit p { font-size:13px;color:#4A6080;margin:0;line-height:1.55; }
          .an-form-box { background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(220,252,231,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1); }
          .an-form-box h3 { font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px; }
          .an-form { display:flex;flex-direction:column;gap:13px; }
          .an-frow { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .an-fg { display:flex;flex-direction:column;gap:5px; }
          .an-fg.full { grid-column:1/-1; }
          .an-fg label { font-size:12px;font-weight:500;color:#0F1F40; }
          .an-fg input,.an-fg textarea,.an-fg select { padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s; }
          .an-fg input:focus,.an-fg textarea:focus,.an-fg select:focus { outline:none;border-color:#16a34a;box-shadow:0 0 0 3px rgba(22,163,74,.10); }
          .an-consent { display:flex;gap:8px;align-items:flex-start; }
          .an-consent input { margin-top:3px;width:15px;height:15px; }
          .an-consent label { font-size:11px;color:#4A6080;line-height:1.5; }
          .an-consent a { color:#0F3460; }
          .an-submit { width:100%;padding:14px;background:#16a34a;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(22,163,74,.28); }
          .an-submit:hover { background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28); }

          /* FAQ */
          .an-faq { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1; }
          .an-faq h2 { font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px; }
          .an-faq-sub { font-size:15px;color:#4A6080;margin:0 0 36px; }
          .an-faq-list { display:flex;flex-direction:column;gap:10px; }
          .an-fitem { background:linear-gradient(135deg,rgba(220,252,231,.40) 0%,rgba(255,255,255,.82) 55%,rgba(219,234,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s; }
          .an-fitem.open { border-color:rgba(22,163,74,.35); }
          .an-fitem.open::before { content:'';display:block;height:3px;background:linear-gradient(90deg,#16a34a,#22c55e);border-radius:3px 3px 0 0; }
          .an-fq { width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative; }
          .an-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s; }
          .an-fitem.open .an-fq-badge { background:#16a34a;color:#fff; }
          .an-fq span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4; }
          .an-fitem.open .an-fq span { color:#14532d; }
          .an-fchev { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s; }
          .an-fitem.open .an-fchev { transform:rotate(180deg);color:#16a34a; }
          .an-fanswer-wrap { overflow:hidden;transition:max-height .35s ease;max-height:0; }
          .an-fitem.open .an-fanswer-wrap { max-height:500px; }
          .an-fanswer { padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8; }

          /* Related */
          .an-related { padding:80px 40px;background:rgba(220,252,231,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60); }
          .an-related-inner { max-width:1300px;margin:0 auto;text-align:center; }
          .an-related h2 { font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px; }
          .an-related-sub { font-size:14px;color:#4A6080;margin:0 auto;max-width:560px; }
          .an-related hr { border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0; }
          .an-rtags { display:flex;flex-wrap:wrap;justify-content:center;gap:10px; }
          .an-rtag { display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s; }
          .an-rtag:hover { transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09); }
          .an-rtag-blue   { background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8; }
          .an-rtag-violet { background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9; }
          .an-rtag-amber  { background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309; }
          .an-rtag-teal   { background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E; }
          .an-rtag-green  { background:rgba(22,163,74,.09);border-color:rgba(22,163,74,.28);color:#14532d; }
          .an-rtag-sky    { background:rgba(14,165,233,.09);border-color:rgba(14,165,233,.28);color:#075985; }

          /* Responsive */
          @media(max-width:1024px){
            .an-hero h1,.an-s-title,.an-faq h2 { font-size:36px; }
            .an-svc-grid { grid-template-columns:repeat(2,1fr); }
            .an-stack-grid { grid-template-columns:repeat(2,1fr); }
            .an-eng-grid { grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto; }
            .an-eng-card.feat { transform:none; }
            .an-eng-card.feat.an-ev { transform:none; }
            .an-eng-card.feat.an-ev:hover { transform:translateY(-4px); }
            .an-why-grid { grid-template-columns:repeat(2,1fr); }
            .an-tgrid { grid-template-columns:1fr; }
            .an-contact-grid { grid-template-columns:1fr; }
          }
          @media(max-width:768px){
            .an-breadcrumb { padding:12px 20px 0; }
            .an-hero { padding:28px 20px 20px; }
            .an-hero h1 { font-size:26px;letter-spacing:-.3px; }
            .an-stats { grid-template-columns:1fr 1fr; }
            .an-stat-col:nth-child(2) { border-right:none; }
            .an-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,.10); }
            .an-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,.10);border-right:none; }
            .an-logos { padding:16px 20px 28px; }
            .an-svc-section,.an-stack-section,.an-eng-section,.an-process-section,.an-testi,.an-why-section,.an-faq,.an-related { padding:52px 20px; }
            .an-contact { padding:48px 20px; }
            .an-svc-grid,.an-stack-grid,.an-why-grid { grid-template-columns:1fr; }
            .an-frow { grid-template-columns:1fr; }
            .an-ctitle { font-size:28px; }
            .an-s-title { font-size:28px; }
          }
        `}</style>
      </Head>

      <div className="an-page">
        <div className="an-orb an-orb-1" />
        <div className="an-orb an-orb-2" />
        <div className="an-orb an-orb-3" />

        {/* ── BREADCRUMB ── */}
        <nav className="an-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Android Application Development Company</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── HERO ── */}
        <section className="an-hero">
          <span className="an-eyebrow">Android Application Development Company</span>
          <h1>Native Android Apps in Kotlin — Built for Performance, Scale & the Play Store</h1>
          <p className="an-hero-desc">We build production-quality native Android applications in Kotlin and Jetpack Compose — from consumer MVPs to enterprise mobility platforms. Phone, tablet, foldable, Android TV, and Wear OS. Play Store-ready, pixel-perfect, and architected to scale.</p>
          <div className="an-trust-row">
            {['150+ Android Apps Shipped','Kotlin & Jetpack Compose','Phone · Tablet · TV · Wear OS','15+ Years Experience','Play Store Ready'].map(b => (
              <div className="an-badge" key={b}><span className="an-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="an-ctas">
            <Link href="#contact" className="an-btn-primary">Start Your Android Project</Link>
            <Link href="#engagement" className="an-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="an-stats" ref={statsRef}>
          {[['150+','Android Apps Shipped'],['15+','Years Experience'],['500M+','App Installs'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        {/* ── CLIENT LOGOS ── */}
        <div className="an-logos">
          <span className="an-logos-label">Trusted by Leading Organisations</span>
          <div className="an-logos-wrap">
            <div className="an-logos-track">
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
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="an-clogo" />
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="an-svc-section" aria-labelledby="an-svc-heading">
          <div className="an-inner">
            <div className={`an-s-reveal${visibleSections.has('svc') ? ' an-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="an-s-eyebrow">What We Build</span>
              <h2 id="an-svc-heading" className="an-s-title">Android App Development Services We Deliver</h2>
              <p className="an-s-desc" style={{ maxWidth: 720 }}>From native Kotlin and Jetpack Compose development through Java-to-Kotlin modernisation, Android TV, Wear OS, enterprise MDM apps, and Play Store optimisation — our Android engineers cover every dimension of the Android platform.</p>
            </div>
            <div className="an-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`an-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' an-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="an-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="an-svc-more">
                <button className="an-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section id="stack" className="an-stack-section" aria-labelledby="an-stack-heading">
          <div className="an-inner">
            <div className={`an-s-reveal${visibleSections.has('stk') ? ' an-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="an-s-eyebrow">The Android Tech Stack We Use</span>
              <h2 id="an-stack-heading" className="an-s-title">Kotlin, Compose & the Full Jetpack Ecosystem</h2>
              <p className="an-s-desc" style={{ maxWidth: 680 }}>From Kotlin with Coroutines and Flow through Jetpack Compose UI, Hilt DI, Room, WorkManager, CameraX, and Firebase — every modern Android Jetpack component, combined with Fastlane and GitHub Actions CI/CD for rapid, reliable releases.</p>
            </div>
            <div className="an-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`an-stack-card${visibleStackCards.includes(i) ? ' an-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="an-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="an-stack-pills">
                    {grp.items.map(item => (
                      <span key={item} className="an-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section id="engagement" className="an-eng-section" aria-labelledby="an-eng-heading">
          <div className="an-inner">
            <div className={`an-s-reveal${visibleSections.has('eng') ? ' an-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="an-s-eyebrow">How We Work With You</span>
              <h2 id="an-eng-heading" className="an-s-title">Engagement Models for Android Development</h2>
              <p className="an-s-desc" style={{ maxWidth: 680 }}>Whether you need a dedicated Android team for a long-term product roadmap, a fixed-price MVP, or flexible sprint-based development for an evolving app — we structure the engagement to fit your product stage and budget.</p>
            </div>
            <div className="an-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`an-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' an-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="an-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="an-eng-icon">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg>
                  </div>
                  <div className="an-eng-name">{m.name}</div>
                  <div className="an-eng-headline">{m.headline}</div>
                  <div className="an-eng-desc">{m.desc}</div>
                  <div className="an-eng-list-label">Best for</div>
                  <ul className="an-eng-list">
                    {m.bestFor.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="an-eng-process">
                    <strong>Process:</strong> {m.process}<br />
                    <span className="an-eng-timeline">{m.timeline}</span>
                  </div>
                  <Link href="#contact" className="an-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="an-process-section" aria-labelledby="an-proc-heading">
          <div className="an-inner" style={{ maxWidth: 760 }}>
            <div className={`an-s-reveal${visibleSections.has('proc') ? ' an-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="an-s-eyebrow">How We Deliver</span>
              <h2 id="an-proc-heading" className="an-s-title">Our Android App Development Process</h2>
              <p className="an-s-desc">Six stages from architecture and Material Design 3 prototyping through biweekly APK builds, backend integration, performance profiling, and managed Play Store launch — with a working app on your physical Android device from sprint one.</p>
            </div>
            <div className="an-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`an-pstep${visibleSections.has('proc') ? ' an-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="an-pstep-l">
                    <div className="an-pstep-circle">{step.num}</div>
                    <div className="an-pstep-connector" />
                  </div>
                  <div className="an-pstep-r">
                    <div className="an-pstep-title">{step.title}</div>
                    <p className="an-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="an-testi" aria-labelledby="an-ts-heading">
          <div className="an-inner">
            <div className={`an-center-head an-s-reveal${visibleSections.has('ts') ? ' an-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="an-s-eyebrow">Client Results</span>
              <h2 id="an-ts-heading" className="an-s-title">What Our Android App Clients Say</h2>
              <p className="an-s-desc">Trusted by startup founders, enterprise mobility teams, and product leaders across the US, UK, and Australia who needed an Android partner that ships production-quality Kotlin apps on time.</p>
            </div>
            <div className="an-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`an-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' an-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}
                  itemScope itemType="https://schema.org/Review">
                  <div className="an-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="an-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="an-tauthor">
                    <div className="an-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div>
                      <div className="an-tname" itemProp="author">{t.name}</div>
                      <div className="an-trole">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="an-why-section" aria-labelledby="an-wy-heading">
          <div className="an-inner">
            <div className={`an-s-reveal${visibleSections.has('wy') ? ' an-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="an-s-eyebrow">Why 1Solutions</span>
              <h2 id="an-wy-heading" className="an-s-title">Why Choose Us for Android App Development</h2>
              <p className="an-s-desc" style={{ maxWidth: 680 }}>150+ native Android apps shipped across consumer, enterprise, logistics, healthcare, and fintech verticals — with Kotlin-first development, clean architecture, Material Design 3 expertise, and performance profiling on real Android devices before every release.</p>
            </div>
            <div className="an-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`an-wcard${visibleWhyCards.includes(i) ? ' an-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="an-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="an-contact" aria-labelledby="an-contact-heading">
          <div className="an-contact-grid">
            <div>
              <h2 id="an-contact-heading" className="an-ctitle">Start Your Android App Project</h2>
              <p className="an-cdesc">Tell us about your Android app and we will schedule a free 60-minute discovery call with a senior Android architect. We will review your requirements, recommend the right architecture and tech stack, and give you a realistic scope, timeline, and cost estimate at no charge.</p>
              <div className="an-cbenefits">
                {[
                  ['✓', 'Free 60-minute Android discovery and architecture review call'],
                  ['✓', 'App scope, screen inventory, and Jetpack tech stack recommendation at no charge'],
                  ['✓', 'Native Android vs Flutter vs React Native analysis for your specific use case'],
                  ['✓', 'NDA available on request — your app concept stays fully confidential'],
                  ['✓', 'Response within 24 business hours from our Android engineering lead'],
                ].map(([icon, text]) => (
                  <div className="an-cbenefit" key={text}>
                    <span className="an-cbenefit-icon">{icon}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="an-form-box">
              <h3>Tell Us About Your Android App</h3>
              <form className="an-form" onSubmit={e => e.preventDefault()}>
                <div className="an-frow">
                  <div className="an-fg">
                    <label htmlFor="an-name">Full Name *</label>
                    <input id="an-name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="an-fg">
                    <label htmlFor="an-email">Work Email *</label>
                    <input id="an-email" type="email" placeholder="you@company.com" required />
                  </div>
                </div>
                <div className="an-frow">
                  <div className="an-fg">
                    <label htmlFor="an-company">Company / App Name</label>
                    <input id="an-company" type="text" placeholder="Company or app name" />
                  </div>
                  <div className="an-fg">
                    <label htmlFor="an-phone">Phone / WhatsApp</label>
                    <input id="an-phone" type="tel" placeholder="+1 555 000 0000" />
                  </div>
                </div>
                <div className="an-fg full">
                  <label htmlFor="an-type">Project Type *</label>
                  <select id="an-type" required>
                    <option value="">Select project type...</option>
                    <option>New Native Android App (Kotlin / Compose)</option>
                    <option>Android MVP / Proof of Concept</option>
                    <option>Java to Kotlin / Compose Migration</option>
                    <option>Android Tablet & Large-Screen App</option>
                    <option>Android TV App</option>
                    <option>Wear OS App</option>
                    <option>Android Enterprise / MDM App</option>
                    <option>Android Backend Integration</option>
                    <option>Android Performance Optimisation</option>
                    <option>Android App Maintenance & SDK Updates</option>
                    <option>Dedicated Android Team (ongoing)</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="an-fg full">
                  <label htmlFor="an-msg">App Brief *</label>
                  <textarea id="an-msg" rows={4} placeholder="Describe your Android app — target users, core features, target devices (phone/tablet/TV/Wear OS), existing backend or API, current state (idea/legacy app/live app), and go-live timeline..." required />
                </div>
                <div className="an-consent">
                  <input id="an-consent" type="checkbox" required />
                  <label htmlFor="an-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. An NDA is available on request before we discuss your app concept or review any existing code.</label>
                </div>
                <button type="submit" className="an-submit">Get Free Android Discovery Call →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="an-faq" aria-labelledby="an-faq-heading">
          <div className="an-inner" style={{ maxWidth: 860 }}>
            <span className="an-s-eyebrow">FAQ</span>
            <h2 id="an-faq-heading">Android App Development — Frequently Asked Questions</h2>
            <p className="an-faq-sub">Everything you need to know about building a native Android application with 1Solutions — from Kotlin vs Java to timelines, enterprise MDM, large screens, and Play Store compliance.</p>
            <div className="an-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`an-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="an-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="an-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="an-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="an-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="an-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="an-related">
          <div className="an-related-inner">
            <span className="an-s-eyebrow">Explore More</span>
            <h2>Related Mobile & Software Development Services</h2>
            <p className="an-related-sub">We also build iOS apps, Flutter cross-platform apps, React Native apps, SaaS platforms, and enterprise mobile backends.</p>
            <hr />
            <div className="an-rtags">
              {[
                ['/flutter-app-development-services/', 'Flutter App Development', 'an-rtag-sky'],
                ['/ios-app-development/', 'iOS App Development', 'an-rtag-violet'],
                ['/react-native-app-development/', 'React Native Development', 'an-rtag-blue'],
                ['/mobile-app-development/', 'Mobile App Development', 'an-rtag-green'],
                ['/saas-development-company/', 'SaaS Development Company', 'an-rtag-amber'],
                ['/erp-application-development-company/', 'ERP Application Development', 'an-rtag-amber'],
                ['/crm-application-development-company/', 'CRM Application Development', 'an-rtag-teal'],
                ['/ui-ux-design-services/', 'UI/UX Design Services', 'an-rtag-violet'],
                ['/api-development-company/', 'API Development & Integration', 'an-rtag-sky'],
                ['/hire-android-developer/', 'Hire Android Developer', 'an-rtag-green'],
              ].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`an-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
