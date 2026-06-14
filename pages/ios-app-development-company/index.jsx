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
        { '@type': 'ListItem', position: 2, name: 'iOS App Development Company', item: 'https://www.1solutions.biz/ios-app-development-company/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'iOS App Development',
      url: 'https://www.1solutions.biz/ios-app-development-company/',
      description: 'Native iOS app development in Swift and SwiftUI — iPhone, iPad, Apple Watch, Apple TV, and Mac Catalyst. App Store-ready, performance-optimised, and built with clean architecture for long-term maintainability.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '109', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Should I build a native iOS app in Swift or use a cross-platform framework?', acceptedAnswer: { '@type': 'Answer', text: 'Native Swift development gives you the best possible iOS performance, the deepest access to Apple platform APIs (ARKit, Core ML, HealthKit, WatchKit, HomeKit, VisionKit), the most polished Apple Human Interface Guideline-compliant UX, and seamless Apple ecosystem integration (iCloud, Apple Pay, Sign in with Apple, Siri, Shortcuts). Cross-platform frameworks like Flutter and React Native work well for apps that are primarily data-display and need simultaneous Android launch. For premium iOS user experiences, complex animations, Apple Watch or Apple TV targets, or apps that heavily rely on Apple-specific APIs, native Swift is the right choice.' } },
        { '@type': 'Question', name: 'How long does it take to build an iOS app?', acceptedAnswer: { '@type': 'Answer', text: 'A native iOS MVP covering authentication, 4–6 core screens, API integration, and App Store submission typically takes 10–16 weeks. A mid-complexity iOS app with SwiftUI animations, real-time features, in-app purchases, and Apple platform integrations typically takes 18–26 weeks. A full enterprise iOS app with offline capability, Core Data sync, complex business logic, and multiple user roles typically takes 28–40 weeks. We distribute working TestFlight builds on a biweekly sprint cycle so you can test on real iPhones and iPads throughout development.' } },
        { '@type': 'Question', name: 'Do you build iOS apps in Swift or Objective-C?', acceptedAnswer: { '@type': 'Answer', text: 'All new iOS development we do is in Swift with SwiftUI for the UI layer — this is the Apple-recommended approach for all new iOS development. We also maintain and extend existing Objective-C codebases, and handle Objective-C to Swift migration projects, including introducing SwiftUI views incrementally alongside UIKit using UIHostingController. For legacy Objective-C codebases we produce a phased migration plan that modernises the codebase without a disruptive full rewrite, while improving performance and long-term maintainability.' } },
        { '@type': 'Question', name: 'Can you build apps for iPhone, iPad, and Apple Watch simultaneously?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We build multi-target Apple platform apps from a shared Swift codebase — iPhone, iPad (with adaptive split-view layouts), Apple Watch (watchOS with complications and always-on display), Apple TV (tvOS with focus-based navigation), and Mac (Mac Catalyst or native macOS SwiftUI). Shared business logic is factored into framework targets that compile across platforms, with platform-specific UI layers in SwiftUI targeting each device idiom. This maximises code reuse while delivering a native-quality experience on each platform.' } },
        { '@type': 'Question', name: 'Do you integrate Apple platform APIs like ARKit, Core ML, HealthKit, and Apple Pay?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Apple platform API integration is a core speciality. We have built iOS apps using ARKit and RealityKit for augmented reality, Core ML for on-device machine learning inference (image classification, natural language processing, pose estimation), HealthKit for fitness and health data, HomeKit for smart home control, StoreKit 2 for in-app purchases and subscriptions, Apple Pay for payment flows, Sign in with Apple, MapKit, Core Location, AVFoundation for camera and media, and VisionKit for document scanning and text recognition.' } },
        { '@type': 'Question', name: 'Can you migrate our Objective-C or UIKit app to Swift and SwiftUI?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. iOS modernisation is a common engagement. Our phased approach first introduces Swift modules and Swift Package Manager alongside Objective-C, migrates the data layer (Codable models, async/await networking, Core Data), then migrates the UI from UIKit to SwiftUI screen by screen using UIHostingController interop — allowing SwiftUI and UIKit views to coexist during the transition. This avoids a big-bang rewrite and allows continuous feature delivery. Outcomes include faster build times, reduced crash rates, modern concurrency (Swift Concurrency async/await), and compliance with the latest iOS SDK requirements.' } },
      ],
    },
  ],
};

const SERVICES = [
  { n: '01', title: 'Custom iOS App Development', desc: 'End-to-end native iOS app development in Swift and SwiftUI — from architecture, UI implementation, and Apple platform API integration through App Store submission and post-launch maintenance. Consumer apps, B2B tools, and enterprise iOS solutions for iPhone, iPad, and Apple Watch.' },
  { n: '02', title: 'iOS MVP & Rapid Prototyping', desc: 'A production-quality iOS MVP on the App Store in 10–16 weeks. We scope the core user journeys, design a polished SwiftUI interface following Apple HIG, integrate backend APIs, and distribute TestFlight builds throughout development — ready for real user feedback and investor demos.', feat: true },
  { n: '03', title: 'Swift & SwiftUI Development', desc: 'Modern native iOS development using Swift 5.x, SwiftUI declarative UI, Swift Concurrency (async/await and Structured Concurrency), Combine for reactive streams, and Swift Package Manager — with clean MVVM or TCA architecture and a comprehensive test suite.' },
  { n: '04', title: 'iPad & Universal App Development', desc: 'iPad-first and universal iOS apps with adaptive layouts using SwiftUI Layout, split-view navigation, drag-and-drop, Apple Pencil support (PencilKit), multi-window for iPadOS, Stage Manager compatibility, and keyboard/pointer support for productivity-focused tablet apps.' },
  { n: '05', title: 'Apple Watch & watchOS Apps', desc: 'Native watchOS apps with complications, always-on display support, WidgetKit for Smart Stacks, background workout sessions via HealthKit, WatchConnectivity for iPhone sync, and high-performance watch UI built with SwiftUI for the always-on Retina display.' },
  { n: '06', title: 'Objective-C → Swift & UIKit → SwiftUI Migration', desc: 'Phased iOS modernisation: migrate Objective-C to Swift with interop bridging, introduce SwiftUI alongside UIKit using UIHostingController, adopt Swift Concurrency in place of callbacks and Combine, and upgrade deprecated APIs — without stopping feature delivery.' },
  { n: '07', title: 'Apple Platform API Integration', desc: 'Deep iOS platform integration: ARKit and RealityKit (AR experiences), Core ML (on-device ML inference), HealthKit, StoreKit 2 (in-app purchases and subscriptions), Apple Pay, Sign in with Apple, MapKit, AVFoundation, VisionKit, HomeKit, and Siri App Intents.' },
  { n: '08', title: 'iOS App Performance Optimisation', desc: 'Xcode Instruments profiling — Time Profiler for CPU, Allocations for memory leaks and retain cycles, Core Data batch performance, SwiftUI render profiling, energy impact analysis, and app launch time optimisation to hit under 400ms time-to-interactive on current devices.' },
  { n: '09', title: 'iOS Enterprise & MDM Applications', desc: 'Enterprise iOS apps compatible with Mobile Device Management (Intune, Jamf Pro, Workspace ONE), MDM-provisioned distribution outside the App Store, SSO with SAML/OAuth (Okta, Azure AD), certificate-based auth, and managed app configuration via MDM profiles.' },
  { n: '10', title: 'App Store Optimisation & Maintenance', desc: 'Ongoing iOS maintenance — yearly iOS SDK and minimum version updates, App Store Review Guideline compliance, privacy manifest and required reasons API declarations, Xcode version upgrades, dependency updates, and App Store Connect metadata and screenshot management.' },
];

const TECH_STACK = [
  {
    group: 'iOS Core',
    color: '#1d4ed8',
    items: ['Swift 5.x / 6.x', 'Objective-C (legacy)', 'iOS SDK 17/18', 'Xcode 16', 'Swift Package Manager', 'Simulator & Instruments'],
  },
  {
    group: 'UI — SwiftUI & UIKit',
    color: '#1e40af',
    items: ['SwiftUI', 'UIKit (legacy / interop)', 'UIHostingController', 'SwiftUI Animations', 'PencilKit', 'Adaptive Layouts (SizeClass)'],
  },
  {
    group: 'Architecture & Concurrency',
    color: '#D97706',
    items: ['MVVM / TCA', 'Swift Concurrency (async/await)', 'Structured Concurrency', 'Combine', 'The Composable Architecture', 'Swift Observation (@Observable)'],
  },
  {
    group: 'Data & Local Storage',
    color: '#0ea5e9',
    items: ['Core Data / SwiftData', 'Realm', 'UserDefaults / Keychain', 'CloudKit', 'File Provider', 'SQLite (GRDB)'],
  },
  {
    group: 'Networking & Backend',
    color: '#14b8a6',
    items: ['URLSession / async-await', 'Alamofire', 'Firebase (Auth, Firestore, FCM)', 'GraphQL (Apollo iOS)', 'Supabase', 'WebSockets / SignalR'],
  },
  {
    group: 'Apple Platform APIs',
    color: '#f97316',
    items: ['ARKit / RealityKit', 'Core ML / Vision', 'HealthKit / WorkoutKit', 'StoreKit 2 (IAP)', 'Apple Pay / PassKit', 'MapKit / Core Location'],
  },
  {
    group: 'CI/CD & Distribution',
    color: '#7c3aed',
    items: ['Fastlane', 'GitHub Actions', 'Xcode Cloud', 'TestFlight', 'App Store Connect API', 'Firebase App Distribution'],
  },
  {
    group: 'Testing, Analytics & Security',
    color: '#a855f7',
    items: ['XCTest / XCTestUI', 'Swift Testing (new framework)', 'Firebase Crashlytics', 'Firebase Analytics', 'Amplitude / Mixpanel', 'App Attest / DeviceCheck'],
  },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'dedicated',
    name: 'Dedicated iOS Team',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'A dedicated iOS squad working exclusively on your app.',
    desc: 'A full-time offshore iOS team — Swift developer(s), UI/UX designer, QA engineer, and backend developer — working as a seamless extension of your team at a fraction of US/UK/AU in-house cost. Sprint-based delivery with daily standups and biweekly TestFlight builds. Full source code and IP ownership yours from day one.',
    bestFor: ['Full-featured native iOS app with ongoing roadmap', 'Long-term iOS product with monthly feature releases', 'Replacing in-house iOS capacity at lower cost', 'iOS app spanning iPhone, iPad, and Apple Watch'],
    process: 'Team assembly → Discovery sprint → Biweekly TestFlight releases → Continuous roadmap',
    timeline: 'Ongoing — scale up or down per quarter',
  },
  {
    id: 'fixed',
    name: 'Fixed Price',
    badge: 'Well-defined scope',
    badgeColor: '#1d4ed8',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Agreed scope. Agreed price. App delivered on time.',
    desc: 'Best for a well-scoped iOS MVP or a feature set with agreed user stories and screen designs. We quote a fixed price covering design, Swift development, testing, and App Store submission — with milestone TestFlight releases throughout. No scope creep, no surprise invoices.',
    bestFor: ['iOS MVP with defined screens and user stories', 'Objective-C to Swift migration with agreed scope', 'Specific iOS feature (Apple Pay, ARKit, StoreKit)', 'Legacy iOS app upgrade to current iOS SDK'],
    process: 'Detailed spec → Fixed quote → Milestone TestFlight → App Store launch',
    timeline: 'Best for projects 10–26 weeks',
  },
  {
    id: 'tm',
    name: 'Time & Material',
    badge: 'Agile & flexible',
    badgeColor: '#a855f7',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Pay for hours worked. Adapt as the product evolves.',
    desc: 'Billed on actual time and resources used. Ideal for iOS discovery sprints, iterative consumer apps where UX is validated with real users before scope is locked, or extending an existing Swift codebase with new features or Apple platform integrations.',
    bestFor: ['iOS architecture audit and modernisation planning', 'Iterative consumer app with user-research-driven scope', 'Adding ARKit, Core ML, or HealthKit to existing app', 'iOS performance profiling and optimisation engagement'],
    process: 'Sprint planning → Biweekly TestFlight → Iterative refinement → Transparent timesheets',
    timeline: 'Start in 1 week — no lengthy onboarding',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery, Architecture & Swift Stack Decision', desc: 'We begin with a structured discovery of your app concept, target Apple devices (iPhone, iPad, Apple Watch, Apple TV), Apple platform API requirements (HealthKit, ARKit, StoreKit), backend and API design, and App Store strategy. We define the Swift architecture (MVVM, TCA, or feature-first), data layer (Core Data, SwiftData, or Realm), navigation structure, and concurrency model before sprint planning begins.' },
  { num: '02', title: 'UI/UX Design — Apple HIG & SwiftUI Prototyping', desc: 'Our designers produce high-fidelity Figma prototypes following Apple Human Interface Guidelines — SF Symbols, system fonts, native iOS navigation patterns (NavigationStack, Tab Bar, sheets), and Dynamic Type support. We define a SwiftUI component library with design tokens (colour, typography, spacing) before development so sprint velocity is maximised from day one.' },
  { num: '03', title: 'Agile Sprint Development — Biweekly TestFlight Builds', desc: 'iOS development runs in two-week sprints. Every sprint you receive a working TestFlight build covering the sprint scope — install it on your own iPhone or iPad and test the real app throughout development. Sprint reviews include a live demo with screen recording for async stakeholder review. No waiting until the end to see the product.' },
  { num: '04', title: 'Backend & Apple Platform API Integration', desc: 'Backend integrations are built in parallel with iOS development — URLSession async/await REST or Apollo GraphQL clients, Firebase Auth and Firestore/FCM configuration, StoreKit 2 subscription and in-app purchase setup, Apple Pay payment flows, Sign in with Apple, MapKit and Core Location, HealthKit read/write permissions, and third-party SDK setup.' },
  { num: '05', title: 'QA, Instruments Profiling & App Store Review Compliance', desc: 'Comprehensive QA across physical iPhone and iPad devices covering multiple iOS versions (iOS 16–18). Xcode Instruments profiling for CPU, memory allocations, leaks, and energy impact. SwiftUI render profiling. App Store Review Guidelines compliance check — privacy manifests, required reasons APIs, data collection declarations in App Store Connect, and content rating submission.' },
  { num: '06', title: 'App Store Launch, Monitoring & Ongoing Roadmap', desc: 'Managed App Store Connect submission — phased release, App Store listing optimisation (title, subtitle, keywords, screenshots, preview video), and response management if Apple Review requests changes. Post-launch monitoring via Firebase Crashlytics, App Store Connect analytics, and Firebase Analytics. Defined sprint cadence for ongoing feature delivery and yearly iOS SDK updates.' },
];

const TESTIMONIALS = [
  {
    text: "We had a legacy Objective-C app with a 2.1 App Store rating and constant crash reports on new iOS versions. 1Solutions migrated it to Swift and SwiftUI in phased sprints while shipping new features simultaneously. The rating climbed to 4.8 and our monthly active users doubled in six months post-launch.",
    name: 'Laura H.', role: 'Head of Product, Consumer App (UK)', init: 'LH', bg: '#0F3460',
  },
  {
    text: "1Solutions built our iOS app for healthcare practitioners — HealthKit integration, HIPAA-aware data handling, offline Core Data sync, and Apple Watch support. The App Store review process was smooth and they handled every compliance requirement correctly. Our practitioners call it the best clinical app they have ever used.",
    name: 'Dr. Jason W.', role: 'Founder, HealthTech Startup (US)', init: 'JW', bg: '#1e3a5f', feat: true,
  },
  {
    text: "We needed an ARKit-powered iOS app for retail product visualisation — placing furniture in a room at scale. 1Solutions delivered a pixel-perfect SwiftUI app with smooth ARKit anchoring in 14 weeks. Our conversion rate on product pages with the AR feature is 3x higher than without it.",
    name: 'Sophie C.', role: 'Digital Director, Retail Brand (AU)', init: 'SC', bg: '#312e81',
  },
];

const WHY_CARDS = [
  { title: '120+ Native iOS Apps Shipped', desc: 'We have shipped 120+ native iOS apps to the App Store across consumer, enterprise, healthtech, fintech, AR, and retail verticals — from solo founder MVPs to apps with millions of downloads and enterprise deployments across thousands of managed Apple devices.' },
  { title: 'Swift-First, SwiftUI-First Since Swift 5', desc: 'We adopted Swift early and have built production SwiftUI apps since SwiftUI 2.0. Our engineers understand SwiftUI view identity, state management, animations, and the SwiftUI-UIKit boundary at a depth that comes from shipping real apps, not watching WWDC sessions.' },
  { title: 'Apple HIG Fluency — Apps that Feel Right', desc: 'We build iOS apps that feel genuinely native — correct use of NavigationStack, sheet presentation, SF Symbols, Dynamic Type, Dark Mode, haptic feedback, and system gestures. Apple reviewers notice the difference, and so do your users. Our App Store approval rate on first submission is over 95%.' },
  { title: 'Apple Platform API Specialists', desc: 'Deep expertise in ARKit and RealityKit, Core ML and Vision, HealthKit, StoreKit 2, Apple Pay, MapKit and Core Location, AVFoundation, VisionKit, HomeKit, and Siri App Intents — the APIs that make iOS apps genuinely differentiated from web and Android experiences.' },
  { title: 'Performance Profiled on Real Devices', desc: 'We profile every iOS app with Xcode Instruments before release — checking CPU traces, memory allocations, retain cycles, energy impact, and launch time on the oldest supported device target. We target under 400ms time-to-interactive and 60fps scroll performance on iPhone SE as a baseline.' },
  { title: 'End-to-End — App + Backend + DevOps', desc: 'We build everything your iOS app needs — the Swift front-end, the backend API (Node.js, Python, Firebase/Supabase), Fastlane/Xcode Cloud CI/CD, TestFlight management, and App Store Connect maintenance. One partner, full accountability, no gaps between teams.' },
  { title: 'US / UK / AU Timezone Overlap', desc: 'Our iOS engineers maintain scheduled daily standup windows overlapping US EST, UK GMT, and Australian AEST business hours. You get real-time communication with your Swift development team — not 24-hour email delays on critical architecture or design decisions.' },
  { title: 'Transparent Delivery. Full IP Ownership.', desc: 'Biweekly TestFlight builds you can install on your own devices, a shared sprint board, direct access to your iOS lead engineer, and weekly progress reports. All source code, assets, and intellectual property are 100% yours from day one — no vendor lock-in.' },
];

const FAQS = [
  { q: 'Should I build a native iOS app in Swift or use a cross-platform framework?', a: 'Native Swift gives you the best iOS performance, deepest Apple platform API access (ARKit, Core ML, HealthKit, WatchKit, HomeKit, StoreKit 2), the most polished Apple HIG-compliant UX, and seamless Apple ecosystem integration. Cross-platform frameworks like Flutter work well for apps that are primarily data-display and need simultaneous Android launch. For premium iOS experiences, complex animations, Apple Watch/Apple TV targets, or apps that rely heavily on Apple-specific APIs, native Swift is the right choice and what we recommend.' },
  { q: 'How long does it take to build a native iOS app?', a: 'A native iOS MVP covering authentication, 4–6 core screens, API integration, and App Store submission typically takes 10–16 weeks. A mid-complexity app with SwiftUI animations, real-time features, in-app purchases, and Apple platform integrations typically takes 18–26 weeks. A full enterprise iOS app with offline capability, Core Data sync, complex business logic, and multiple user roles typically takes 28–40 weeks. We distribute working TestFlight builds on a biweekly sprint cycle throughout development.' },
  { q: 'Do you build iOS apps in Swift or Objective-C?', a: 'All new iOS development is in Swift with SwiftUI — the Apple-recommended approach. We also maintain Objective-C codebases and handle Objective-C-to-Swift migrations, introducing SwiftUI alongside UIKit using UIHostingController interop. For legacy Objective-C apps we produce a phased migration plan that modernises the codebase without a disruptive full rewrite, while delivering improved performance, Swift Concurrency, and compliance with current App Store requirements.' },
  { q: 'Can you build for iPhone, iPad, and Apple Watch at the same time?', a: 'Yes. We build multi-target Apple platform apps from a shared Swift codebase — iPhone, iPad with adaptive split-view layouts, Apple Watch with complications and always-on display, Apple TV with focus-based tvOS navigation, and Mac via Mac Catalyst or native macOS SwiftUI. Shared business logic is factored into framework targets compiled across platforms, with platform-specific SwiftUI UI layers targeting each device idiom. This maximises code reuse while delivering a native-quality experience on each platform.' },
  { q: 'Do you integrate Apple APIs like ARKit, Core ML, HealthKit, and Apple Pay?', a: 'Yes. Apple platform API integration is a core speciality. We have shipped iOS apps using ARKit and RealityKit for augmented reality, Core ML for on-device machine learning (image classification, pose estimation, NLP), HealthKit for fitness data and clinical records, StoreKit 2 for subscriptions and in-app purchases, Apple Pay for payment flows, Sign in with Apple, MapKit, AVFoundation for camera and media, VisionKit for document scanning, HomeKit for smart home, and Siri App Intents for voice-driven workflows.' },
  { q: 'Can you migrate our Objective-C or UIKit app to Swift and SwiftUI?', a: 'Yes. iOS modernisation is a common engagement. Our phased approach introduces Swift modules alongside Objective-C, migrates the data layer to Swift (Codable, async/await networking, Core Data or SwiftData), then migrates the UI from UIKit to SwiftUI screen by screen using UIHostingController interop. This allows SwiftUI and UIKit to coexist throughout the migration, enabling continuous feature delivery. Outcomes include faster Xcode build times, reduced crash rates, modern async/await concurrency, and App Store compliance.' },
  { q: 'How do you handle App Store review and submission?', a: 'We manage the full App Store submission process — provisioning profiles, code signing, App Store Connect setup, app metadata (title, subtitle, keywords, description), screenshot and preview video production, privacy nutrition label and data collection declarations, required reasons API declarations in the privacy manifest, content rating and age-appropriate design compliance, and TestFlight external testing group setup. Our first-submission App Store approval rate is over 95% because we do a compliance review before every submission.' },
  { q: 'Do you build iOS enterprise apps distributed outside the App Store?', a: 'Yes. We build enterprise iOS apps distributed via Apple Business Manager (formerly DEP) and Mobile Device Management platforms including Jamf Pro, Microsoft Intune, and VMware Workspace ONE. Enterprise distribution uses an Apple Enterprise Developer Programme certificate for in-house apps, or custom apps distributed privately through the App Store to specific organisations. We implement managed app configuration via MDM profiles, SAML and OAuth SSO, certificate-based authentication, and MDM-managed VPN connectivity.' },
];

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
    <div className="io-stat-col">
      <div className="io-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="io-stat-label">{label}</div>
    </div>
  );
}

export default function IosAppDevelopment() {
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
        <title>iOS App Development Company | Swift & SwiftUI | iPhone, iPad & Apple Watch | 1Solutions</title>
        <meta name="description" content="Native iOS app development in Swift & SwiftUI — iPhone, iPad, Apple Watch, Apple TV. ARKit, Core ML, HealthKit & StoreKit 2. 120+ apps shipped. Free discovery call." />
        <link rel="canonical" href="https://www.1solutions.biz/ios-app-development-company/" />
        <meta property="og:title" content="iOS App Development Company | Swift & SwiftUI | 1Solutions" />
        <meta property="og:description" content="Native iOS development in Swift & SwiftUI — iPhone, iPad, Apple Watch & Apple TV. ARKit, Core ML, HealthKit, Apple Pay. 120+ apps. 15+ years experience." />
        <meta property="og:url" content="https://www.1solutions.biz/ios-app-development-company/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .io-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .io-page *,.io-page *::before,.io-page *::after{box-sizing:border-box}
          .io-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .io-orb-1{width:880px;height:880px;background:radial-gradient(circle,rgba(29,78,216,.22) 0%,rgba(59,130,246,.10) 40%,transparent 70%);top:-280px;right:-260px}
          .io-orb-2{width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px}
          .io-orb-3{width:550px;height:550px;background:radial-gradient(circle,rgba(168,85,247,.16) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%)}
          .io-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .io-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .io-breadcrumb li{display:flex;align-items:center;gap:6px}
          .io-breadcrumb li::after{content:'/';opacity:.45}
          .io-breadcrumb li:last-child::after{display:none}
          .io-breadcrumb a{color:#0F3460;text-decoration:none}
          .io-breadcrumb a:hover{text-decoration:underline}
          .io-hero{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px}
          .io-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .io-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#1d4ed8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .io-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px}
          .io-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .io-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .io-badge-dot{width:7px;height:7px;border-radius:50%;background:#1d4ed8;flex-shrink:0}
          .io-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .io-btn-primary{display:inline-block;padding:14px 36px;background:#1d4ed8;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(29,78,216,.30)}
          .io-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .io-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .io-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(29,78,216,.5);transform:translateY(-2px)}
          .io-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .io-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .io-stat-col:last-child{border-right:none}
          .io-stat-val{font-size:28px;font-weight:900;color:#1d4ed8;letter-spacing:-.5px;line-height:1}
          .io-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .io-logos{position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .io-logos-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0}
          .io-logos-wrap{width:100%;overflow:hidden}
          .io-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:io-marquee 28s linear infinite}
          .io-logos-track:hover{animation-play-state:paused}
          @keyframes io-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .io-clogo{height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .io-clogo:hover{opacity:.85;filter:grayscale(0%)}
          .io-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .io-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .io-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .io-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .io-s-reveal.io-revealed{opacity:1;transform:translateY(0)}
          .io-inner{max-width:1300px;margin:0 auto}
          .io-svc-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .io-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .io-svc-card{background:linear-gradient(135deg,rgba(219,234,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s}
          .io-svc-card.io-cv{opacity:1;transform:translateY(0)}
          .io-svc-card.io-cv:hover{transform:translateY(-6px);border-color:rgba(29,78,216,.35);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .io-svc-card.feat{border-color:rgba(29,78,216,.22)}
          .io-svc-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .io-svc-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .io-svc-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .io-svc-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#1d4ed8,#3b82f6);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .io-svc-card.io-cv:hover::before{transform:scaleY(1)}
          .io-svc-more{text-align:center;margin-top:22px}
          .io-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .io-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .io-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .io-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .io-stack-card{background:linear-gradient(135deg,rgba(219,234,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .io-stack-card.io-sv{opacity:1;transform:translateY(0)}
          .io-stack-card.io-sv:hover{border-color:rgba(29,78,216,.30);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .io-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .io-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .io-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .io-eng-section{padding:80px 40px;position:relative;z-index:1}
          .io-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .io-eng-card{background:linear-gradient(135deg,rgba(219,234,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s}
          .io-eng-card.io-ev{opacity:1;transform:translateY(0)}
          .io-eng-card.io-ev:hover{border-color:rgba(29,78,216,.30);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .io-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .io-eng-card.feat.io-ev{transform:translateY(-8px)}
          .io-eng-card.feat.io-ev:hover{transform:translateY(-12px)}
          .io-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .io-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s}
          .io-eng-card.io-ev:hover .io-eng-icon{background:rgba(29,78,216,.10)}
          .io-eng-card.feat .io-eng-icon{background:rgba(217,119,6,.10)}
          .io-eng-icon svg{fill:#0F3460;transition:fill .2s}
          .io-eng-card.io-ev:hover .io-eng-icon svg{fill:#1d4ed8}
          .io-eng-card.feat .io-eng-icon svg{fill:#D97706}
          .io-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .io-eng-headline{font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px}
          .io-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .io-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .io-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .io-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .io-eng-list li::before{content:'✓';font-weight:800;color:#1d4ed8;flex-shrink:0;margin-top:1px}
          .io-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .io-eng-process strong{color:#0F3460}
          .io-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .io-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18)}
          .io-eng-cta:hover{background:#0F3460;color:#fff}
          .io-eng-card.feat .io-eng-cta{background:#1d4ed8;color:#fff;border-color:#1d4ed8}
          .io-eng-card.feat .io-eng-cta:hover{background:#0F3460;border-color:#0F3460}
          .io-process-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .io-psteps{display:flex;flex-direction:column;margin-top:52px}
          .io-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .io-pstep.io-pv{opacity:1;transform:translateY(0)}
          .io-pstep-l{display:flex;flex-direction:column;align-items:center}
          .io-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s}
          .io-pstep.io-pv:hover .io-pstep-circle{background:rgba(29,78,216,.12);border-color:#1d4ed8;color:#1d4ed8}
          .io-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .io-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .io-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .io-pstep:last-child .io-pstep-connector{display:none}
          .io-pstep-r{padding:4px 0 38px}
          .io-pstep:last-child .io-pstep-r{padding-bottom:0}
          .io-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .io-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .io-testi{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .io-center-head{text-align:center;margin-bottom:48px}
          .io-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .io-tcard{background:linear-gradient(135deg,rgba(219,234,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s}
          .io-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(219,234,254,.42) 100%);border-color:rgba(217,119,6,.22)}
          .io-tcard.io-tv{opacity:1;transform:translateY(0)}
          .io-tcard.io-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .io-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .io-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .io-tauthor{display:flex;align-items:center;gap:12px}
          .io-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .io-tname{font-size:14px;font-weight:700;color:#0F3460}
          .io-trole{font-size:12px;color:#6b7280}
          .io-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .io-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .io-wcard{background:linear-gradient(135deg,rgba(219,234,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .io-wcard.io-wv{opacity:1;transform:translateY(0) scale(1)}
          .io-wcard.io-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(29,78,216,.30);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .io-wcard-dot{width:10px;height:10px;border-radius:50%;background:#1d4ed8;margin-bottom:12px}
          .io-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .io-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .io-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.60) 40%,rgba(237,233,254,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .io-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .io-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#1d4ed8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .io-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .io-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .io-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .io-cbenefit-icon{flex-shrink:0;color:#1d4ed8;font-weight:800;font-size:16px;margin-top:1px}
          .io-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .io-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(219,234,254,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .io-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .io-form{display:flex;flex-direction:column;gap:13px}
          .io-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .io-fg{display:flex;flex-direction:column;gap:5px}
          .io-fg.full{grid-column:1/-1}
          .io-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .io-fg input,.io-fg textarea,.io-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .io-fg input:focus,.io-fg textarea:focus,.io-fg select:focus{outline:none;border-color:#1d4ed8;box-shadow:0 0 0 3px rgba(29,78,216,.10)}
          .io-consent{display:flex;gap:8px;align-items:flex-start}
          .io-consent input{margin-top:3px;width:15px;height:15px}
          .io-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .io-consent a{color:#0F3460}
          .io-submit{width:100%;padding:14px;background:#1d4ed8;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(29,78,216,.28)}
          .io-submit:hover{background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28)}
          .io-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .io-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .io-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .io-faq-list{display:flex;flex-direction:column;gap:10px}
          .io-fitem{background:linear-gradient(135deg,rgba(219,234,254,.40) 0%,rgba(255,255,255,.82) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s}
          .io-fitem.open{border-color:rgba(29,78,216,.35)}
          .io-fitem.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#1d4ed8,#3b82f6);border-radius:3px 3px 0 0}
          .io-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .io-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .io-fitem.open .io-fq-badge{background:#1d4ed8;color:#fff}
          .io-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .io-fitem.open .io-fq span{color:#1e3a8a}
          .io-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .io-fitem.open .io-fchev{transform:rotate(180deg);color:#1d4ed8}
          .io-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .io-fitem.open .io-fanswer-wrap{max-height:500px}
          .io-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .io-related{padding:80px 40px;background:rgba(219,234,254,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .io-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .io-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .io-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .io-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .io-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .io-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .io-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .io-rtag-blue{background:rgba(29,78,216,.09);border-color:rgba(29,78,216,.28);color:#1e3a8a}
          .io-rtag-violet{background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9}
          .io-rtag-amber{background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309}
          .io-rtag-teal{background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E}
          .io-rtag-green{background:rgba(22,163,74,.09);border-color:rgba(22,163,74,.28);color:#14532d}
          .io-rtag-sky{background:rgba(14,165,233,.09);border-color:rgba(14,165,233,.28);color:#075985}
          @media(max-width:1024px){.io-hero h1,.io-s-title,.io-faq h2{font-size:36px}.io-svc-grid{grid-template-columns:repeat(2,1fr)}.io-stack-grid{grid-template-columns:repeat(2,1fr)}.io-eng-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.io-eng-card.feat{transform:none}.io-eng-card.feat.io-ev{transform:none}.io-eng-card.feat.io-ev:hover{transform:translateY(-4px)}.io-why-grid{grid-template-columns:repeat(2,1fr)}.io-tgrid{grid-template-columns:1fr}.io-contact-grid{grid-template-columns:1fr}}
          @media(max-width:768px){.io-breadcrumb{padding:12px 20px 0}.io-hero{padding:28px 20px 20px}.io-hero h1{font-size:26px;letter-spacing:-.3px}.io-stats{grid-template-columns:1fr 1fr}.io-stat-col:nth-child(2){border-right:none}.io-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.io-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.io-logos{padding:16px 20px 28px}.io-svc-section,.io-stack-section,.io-eng-section,.io-process-section,.io-testi,.io-why-section,.io-faq,.io-related{padding:52px 20px}.io-contact{padding:48px 20px}.io-svc-grid,.io-stack-grid,.io-why-grid{grid-template-columns:1fr}.io-frow{grid-template-columns:1fr}.io-ctitle{font-size:28px}.io-s-title{font-size:28px}}
        `}</style>
      </Head>

      <div className="io-page">
        <div className="io-orb io-orb-1" /><div className="io-orb io-orb-2" /><div className="io-orb io-orb-3" />

        <nav className="io-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">iOS App Development Company</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <section className="io-hero">
          <span className="io-eyebrow">iOS App Development Company</span>
          <h1>Native iOS Apps in Swift — Built for the App Store, iPhone, iPad & Apple Watch</h1>
          <p className="io-hero-desc">We build production-quality native iOS applications in Swift and SwiftUI — from consumer MVPs to enterprise mobility platforms. iPhone, iPad, Apple Watch, and Apple TV. App Store-ready, Human Interface Guideline-compliant, and architectured for long-term maintainability.</p>
          <div className="io-trust-row">
            {['120+ iOS Apps Shipped','Swift & SwiftUI','iPhone · iPad · Watch · TV','15+ Years Experience','App Store Ready'].map(b => (
              <div className="io-badge" key={b}><span className="io-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="io-ctas">
            <Link href="#contact" className="io-btn-primary">Start Your iOS Project</Link>
            <Link href="#engagement" className="io-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        <div className="io-stats" ref={statsRef}>
          {[['120+','iOS Apps Shipped'],['15+','Years Experience'],['200M+','App Downloads'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        <div className="io-logos">
          <span className="io-logos-label">Trusted by Leading Organisations</span>
          <div className="io-logos-wrap">
            <div className="io-logos-track">
              {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express 2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],['/logo/Uniphore.jpg','Uniphore 2'],['/logo/ICCoLogo.png','ICC 2'],['/logo/Honor_Logo_(2020).svg.png','Honor 2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2']].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="io-clogo" />
              ))}
            </div>
          </div>
        </div>

        <section className="io-svc-section" aria-labelledby="io-svc-heading">
          <div className="io-inner">
            <div className={`io-s-reveal${visibleSections.has('svc') ? ' io-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="io-s-eyebrow">What We Build</span>
              <h2 id="io-svc-heading" className="io-s-title">iOS App Development Services We Deliver</h2>
              <p className="io-s-desc" style={{ maxWidth: 720 }}>From Swift MVPs and SwiftUI consumer apps through Objective-C migrations, Apple Watch and Apple TV development, ARKit/Core ML integrations, and enterprise MDM iOS apps — our iOS engineers cover every dimension of the Apple platform.</p>
            </div>
            <div className="io-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`io-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' io-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="io-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="io-svc-more">
                <button className="io-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="stack" className="io-stack-section" aria-labelledby="io-stack-heading">
          <div className="io-inner">
            <div className={`io-s-reveal${visibleSections.has('stk') ? ' io-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="io-s-eyebrow">The iOS Tech Stack We Use</span>
              <h2 id="io-stack-heading" className="io-s-title">Swift, SwiftUI & the Full Apple Platform Ecosystem</h2>
              <p className="io-s-desc" style={{ maxWidth: 680 }}>From Swift Concurrency and SwiftUI through Core Data, ARKit, Core ML, StoreKit 2, HealthKit, and Fastlane/Xcode Cloud CI/CD — every modern iOS and Apple platform technology, architected for performance and maintainability.</p>
            </div>
            <div className="io-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`io-stack-card${visibleStackCards.includes(i) ? ' io-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="io-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="io-stack-pills">
                    {grp.items.map(item => (
                      <span key={item} className="io-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="engagement" className="io-eng-section" aria-labelledby="io-eng-heading">
          <div className="io-inner">
            <div className={`io-s-reveal${visibleSections.has('eng') ? ' io-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="io-s-eyebrow">How We Work With You</span>
              <h2 id="io-eng-heading" className="io-s-title">Engagement Models for iOS Development</h2>
              <p className="io-s-desc" style={{ maxWidth: 680 }}>Whether you need a dedicated iOS team for a long-term app roadmap, a fixed-price Swift MVP, or flexible T&M sprints for an iterative consumer app — we structure the engagement to match your product stage and budget.</p>
            </div>
            <div className="io-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`io-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' io-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="io-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="io-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div>
                  <div className="io-eng-name">{m.name}</div>
                  <div className="io-eng-headline">{m.headline}</div>
                  <div className="io-eng-desc">{m.desc}</div>
                  <div className="io-eng-list-label">Best for</div>
                  <ul className="io-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                  <div className="io-eng-process"><strong>Process:</strong> {m.process}<br /><span className="io-eng-timeline">{m.timeline}</span></div>
                  <Link href="#contact" className="io-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="io-process-section" aria-labelledby="io-proc-heading">
          <div className="io-inner" style={{ maxWidth: 760 }}>
            <div className={`io-s-reveal${visibleSections.has('proc') ? ' io-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="io-s-eyebrow">How We Deliver</span>
              <h2 id="io-proc-heading" className="io-s-title">Our iOS App Development Process</h2>
              <p className="io-s-desc">Six stages from Swift architecture and Apple HIG design through biweekly TestFlight builds, Apple platform API integration, Instruments profiling, and managed App Store launch — with a working app on your iPhone from sprint one.</p>
            </div>
            <div className="io-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`io-pstep${visibleSections.has('proc') ? ' io-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="io-pstep-l">
                    <div className="io-pstep-circle">{step.num}</div>
                    <div className="io-pstep-connector" />
                  </div>
                  <div className="io-pstep-r">
                    <div className="io-pstep-title">{step.title}</div>
                    <p className="io-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="io-testi" aria-labelledby="io-ts-heading">
          <div className="io-inner">
            <div className={`io-center-head io-s-reveal${visibleSections.has('ts') ? ' io-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="io-s-eyebrow">Client Results</span>
              <h2 id="io-ts-heading" className="io-s-title">What Our iOS App Clients Say</h2>
              <p className="io-s-desc">Trusted by consumer app founders, healthcare and fintech product teams, and enterprise mobility leaders across the US, UK, and Australia.</p>
            </div>
            <div className="io-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`io-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' io-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} itemScope itemType="https://schema.org/Review">
                  <div className="io-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="io-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="io-tauthor">
                    <div className="io-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div><div className="io-tname" itemProp="author">{t.name}</div><div className="io-trole">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="io-why-section" aria-labelledby="io-wy-heading">
          <div className="io-inner">
            <div className={`io-s-reveal${visibleSections.has('wy') ? ' io-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="io-s-eyebrow">Why 1Solutions</span>
              <h2 id="io-wy-heading" className="io-s-title">Why Choose Us for iOS App Development</h2>
              <p className="io-s-desc" style={{ maxWidth: 680 }}>120+ native iOS apps shipped across consumer, enterprise, healthtech, fintech, AR, and retail verticals — with Swift-first development, Apple HIG fluency, deep Apple platform API expertise, and performance profiling on real Apple devices before every release.</p>
            </div>
            <div className="io-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`io-wcard${visibleWhyCards.includes(i) ? ' io-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="io-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="io-contact" aria-labelledby="io-contact-heading">
          <div className="io-contact-grid">
            <div>
              <h2 id="io-contact-heading" className="io-ctitle">Start Your iOS App Project</h2>
              <p className="io-cdesc">Tell us about your iOS app and we will schedule a free 60-minute discovery call with a senior Swift architect. We will review your requirements, recommend the right architecture, and give you a realistic scope, timeline, and cost estimate at no charge.</p>
              <div className="io-cbenefits">
                {[['✓','Free 60-minute iOS discovery and architecture review call'],['✓','App scope, screen inventory, and Swift tech stack recommendation at no charge'],['✓','Native iOS vs Flutter vs React Native analysis for your specific use case'],['✓','NDA available on request — your app concept stays fully confidential'],['✓','Response within 24 business hours from our iOS engineering lead']].map(([icon, text]) => (
                  <div className="io-cbenefit" key={text}><span className="io-cbenefit-icon">{icon}</span><p>{text}</p></div>
                ))}
              </div>
            </div>
            <div className="io-form-box">
              <h3>Tell Us About Your iOS App</h3>
              <form className="io-form" onSubmit={e => e.preventDefault()}>
                <div className="io-frow">
                  <div className="io-fg"><label htmlFor="io-name">Full Name *</label><input id="io-name" type="text" placeholder="Your name" required /></div>
                  <div className="io-fg"><label htmlFor="io-email">Work Email *</label><input id="io-email" type="email" placeholder="you@company.com" required /></div>
                </div>
                <div className="io-frow">
                  <div className="io-fg"><label htmlFor="io-company">Company / App Name</label><input id="io-company" type="text" placeholder="Company or app name" /></div>
                  <div className="io-fg"><label htmlFor="io-phone">Phone / WhatsApp</label><input id="io-phone" type="tel" placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="io-fg full">
                  <label htmlFor="io-type">Project Type *</label>
                  <select id="io-type" required>
                    <option value="">Select project type...</option>
                    <option>New Native iOS App (Swift / SwiftUI)</option>
                    <option>iOS MVP / Proof of Concept</option>
                    <option>Objective-C to Swift / SwiftUI Migration</option>
                    <option>iPad & Universal App</option>
                    <option>Apple Watch / watchOS App</option>
                    <option>Apple TV / tvOS App</option>
                    <option>ARKit / RealityKit App</option>
                    <option>Core ML / AI-Powered iOS App</option>
                    <option>HealthKit / Fitness App</option>
                    <option>iOS Enterprise / MDM App</option>
                    <option>iOS App Maintenance & SDK Updates</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="io-fg full">
                  <label htmlFor="io-msg">App Brief *</label>
                  <textarea id="io-msg" rows={4} placeholder="Describe your iOS app — target users, core features, target devices (iPhone/iPad/Watch), Apple APIs needed (ARKit, HealthKit, StoreKit), existing backend, current stage, and go-live timeline..." required />
                </div>
                <div className="io-consent">
                  <input id="io-consent" type="checkbox" required />
                  <label htmlFor="io-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. An NDA is available on request before we discuss your app concept or review existing code.</label>
                </div>
                <button type="submit" className="io-submit">Get Free iOS Discovery Call →</button>
              </form>
            </div>
          </div>
        </section>

        <section className="io-faq" aria-labelledby="io-faq-heading">
          <div className="io-inner" style={{ maxWidth: 860 }}>
            <span className="io-s-eyebrow">FAQ</span>
            <h2 id="io-faq-heading">iOS App Development — Frequently Asked Questions</h2>
            <p className="io-faq-sub">Everything you need to know about building a native iOS application with 1Solutions — from Swift vs Objective-C to Apple platform APIs, enterprise MDM, and App Store submission.</p>
            <div className="io-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`io-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="io-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="io-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="io-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="io-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="io-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="io-related">
          <div className="io-related-inner">
            <span className="io-s-eyebrow">Explore More</span>
            <h2>Related Mobile & Software Development Services</h2>
            <p className="io-related-sub">We also build Android apps, Flutter cross-platform apps, React Native apps, SaaS platforms, and enterprise mobile backends.</p>
            <hr />
            <div className="io-rtags">
              {[['/android-application-development-company/','Android App Development','io-rtag-green'],['/flutter-app-development-services/','Flutter App Development','io-rtag-sky'],['/react-native-app-development/','React Native Development','io-rtag-violet'],['/mobile-app-development/','Mobile App Development','io-rtag-blue'],['/saas-development-company/','SaaS Development Company','io-rtag-amber'],['/ui-ux-design-services/','UI/UX Design Services','io-rtag-violet'],['/erp-application-development-company/','ERP Application Development','io-rtag-amber'],['/crm-application-development-company/','CRM Application Development','io-rtag-teal'],['/api-development-company/','API Development & Integration','io-rtag-sky'],['/hire-ios-developer/','Hire iOS Developer','io-rtag-blue']].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`io-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
