'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.1solutions.biz/#industries' }, { '@type': 'ListItem', position: 3, name: 'Travel & Tourism Software', item: 'https://www.1solutions.biz/travel-and-tourism-software-solutions/' }] },
    { '@type': 'Service', name: 'Travel & Tourism Software Development', url: 'https://www.1solutions.biz/travel-and-tourism-software-solutions/', description: '1Solutions builds custom travel and tourism software — online booking platforms, OTA development, hotel management systems, tour operator software, flight and GDS integration, travel CRM, dynamic pricing engines, and mobile travel apps. 15+ years, 120+ travel projects, clients in US, UK, AU, CA.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '96', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What travel and tourism software does 1Solutions develop?', acceptedAnswer: { '@type': 'Answer', text: '1Solutions develops the full spectrum of travel technology: online booking engines (flights, hotels, packages, activities), OTA (Online Travel Agency) platforms, hotel and resort property management systems, tour operator and DMC software, travel CRM and loyalty platforms, GDS/NDC integration (Amadeus, Sabre, Travelport), dynamic pricing and revenue management engines, travel mobile apps (iOS and Android), visa and documentation portals, and group travel management platforms.' } },
      { '@type': 'Question', name: 'Can you integrate GDS systems like Amadeus and Sabre?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — GDS and travel API integration is core to our travel development practice. We integrate Amadeus (travel APIs, NDC), Sabre (SynXis, Web Services), Travelport (Galileo, Worldspan), NDC-enabled airline direct connect APIs, hotel channel managers (SiteMinder, RateGain), car rental APIs (Hertz, Avis), and activities/excursion APIs (Viator, GetYourGuide). We also build custom API aggregation layers that normalise responses across multiple suppliers into a single booking flow.' } },
      { '@type': 'Question', name: 'How long does it take to build an OTA platform?', acceptedAnswer: { '@type': 'Answer', text: 'An OTA (Online Travel Agency) platform typically takes 4–9 months depending on scope: MVP with flight + hotel search, booking, payment, and itinerary management: 4–5 months. Full-featured OTA with packages, activities, GDS integration, B2B portal, and white-label capability: 7–10 months. We use an MVP-first approach — core booking flow is live and generating revenue before all features are complete. Discovery phase (weeks 1–3) defines exact scope and timeline.' } },
      { '@type': 'Question', name: 'Do you build mobile apps for travel companies?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — mobile app development for travel is one of our most common engagements. We build iOS and Android travel apps using React Native (shared codebase, faster delivery) or native Swift/Kotlin for performance-critical features like offline maps, real-time notifications, and push-based flight status updates. Typical features: trip itinerary management, mobile check-in, push notifications for flight changes, offline access to bookings, in-app support chat, loyalty points tracking, and mobile payment (Apple Pay, Google Pay, Stripe).' } },
      { '@type': 'Question', name: 'What technology stack do you use for travel platforms?', acceptedAnswer: { '@type': 'Answer', text: 'Our travel platform stack: Frontend — React/Next.js for web, React Native for mobile. Backend — Node.js or Python FastAPI for high-throughput booking APIs; Go for real-time availability search. Database — PostgreSQL for bookings and customer data; Redis for availability caching and session management; Elasticsearch for destination and property search. Payments — Stripe, PayPal, Braintree, Adyen; multi-currency support. Search — Elasticsearch for accommodation search, Algolia for fast destination autocomplete. Cloud — AWS (Lambda, ECS, CloudFront, ElastiCache) or GCP; CDN for global performance; multi-region deployment for low-latency search.' } },
      { '@type': 'Question', name: 'Can you build a white-label travel booking platform?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — white-label travel platforms are one of our specialties. We build fully brandable booking engines that travel agencies, airlines, hotel chains, and corporate travel managers can deploy under their own brand. Features include: configurable UI theming (logo, colours, fonts), custom domain deployment, B2B agent portal with commission management, corporate travel policy enforcement, multi-currency and multi-language, and API access for resellers. White-label platforms can be ready in 10–16 weeks.' } },
    ] },
  ],
};

const SOLUTIONS = [
  { n: '01', title: 'Online Booking Engine & OTA Platform', desc: 'Custom OTA development — multi-product booking engine (flights, hotels, car hire, packages, activities), real-time availability search, dynamic packaging, itinerary builder, mobile-first booking flow, multi-currency and multi-language, GDS/NDC integration, payment gateway, post-booking management, and agent portal. Built for conversion at scale.' },
  { n: '02', title: 'Hotel & Property Management System', desc: 'End-to-end hotel PMS — reservations management, front desk operations, housekeeping scheduling, room inventory and rate management, guest profile CRM, group booking management, channel manager integration (SiteMinder, RateGain, Cloudbeds), OTA connectivity (Booking.com, Expedia, Airbnb), revenue reporting, and finance module. Cloud-native and mobile-accessible.', feat: true },
  { n: '03', title: 'Tour Operator & DMC Software', desc: 'Tour operator management platform — product catalogue (tours, excursions, transfers, accommodations), itinerary builder with day-by-day schedule, supplier and contract management, group booking and passenger manifest, real-time availability, B2B agent booking portal, commission management, voucher generation, and customer-facing booking website with live inventory.' },
  { n: '04', title: 'GDS & Travel API Integration', desc: 'Third-party travel API integration — Amadeus Travel APIs (NDC, IATA), Sabre Web Services, Travelport (Galileo, Worldspan), hotel channel managers, car rental APIs (Hertz, Avis, Enterprise), cruise line APIs, activities/excursions (Viator, GetYourGuide, Rezdy), transfers, and insurance APIs. Custom aggregation layer normalising multi-supplier responses into a unified booking flow.' },
  { n: '05', title: 'Dynamic Pricing & Revenue Management', desc: 'AI-powered pricing engine — demand forecasting, competitor rate monitoring, yield management rules, seasonal pricing automation, last-minute deal engine, package pricing optimisation, channel-specific pricing strategies, and real-time revenue dashboards. Integrates with PMS, OTA channels, and booking engines to maximise RevPAR and package margin.' },
  { n: '06', title: 'Travel CRM & Loyalty Platform', desc: 'Travel-specific CRM — 360-degree customer profile (booking history, preferences, loyalty tier), automated pre-travel and post-travel communication workflows, loyalty points engine (earn/burn), tier management (Silver/Gold/Platinum), partner programme integration, customer satisfaction surveys, win-back campaigns, and a B2C app with digital loyalty card.' },
  { n: '07', title: 'Travel Mobile App (iOS & Android)', desc: 'React Native or native iOS/Android travel app — trip itinerary management, mobile check-in (hotel and airline), real-time flight status notifications, offline itinerary access, in-app customer support (chat/callback), loyalty points tracker, destination guides, push notifications for deals and alerts, mobile payment (Apple Pay, Google Pay), and trip sharing.' },
  { n: '08', title: 'Corporate & B2B Travel Management', desc: 'Corporate travel management platform — travel policy enforcement (booking class restrictions, preferred suppliers, approval workflows), self-booking tool, expense integration (SAP Concur, Expensify), duty-of-care tracking, traveller profiles and document management, consolidated invoicing, spend analytics by department, and travel arranger multi-traveller booking.' },
  { n: '09', title: 'Destination Management Platform', desc: 'DMO and destination management system — destination content management, attraction and event database, tourism business directory, visitor information portal, itinerary inspiration engine, tourism analytics (visitor volume, origin markets, spend patterns), digital visitor guide (web and mobile), and partner management portal for local tourism businesses.' },
  { n: '10', title: 'Travel Platform Modernisation & API Strategy', desc: 'Legacy travel system modernisation — audit of existing booking platform, migration from monolith to microservices, API-first architecture redesign, performance optimisation (search response time, booking completion rate), mobile responsiveness upgrade, payment stack modernisation (SCA compliance, multi-currency), and cloud migration for global performance.' },
];

const TECH_STACK = [
  { group: 'Frontend & Mobile', color: '#0c4a6e', items: ['React / Next.js (SSR)', 'React Native / Expo', 'Swift / SwiftUI (iOS)', 'Kotlin / Jetpack Compose', 'TypeScript', 'Progressive Web App'] },
  { group: 'Backend & APIs', color: '#0369a1', items: ['Node.js / NestJS', 'Python / FastAPI', 'Go (availability search)', 'REST & GraphQL APIs', 'gRPC (microservices)', 'WebSocket (real-time)'] },
  { group: 'GDS & Travel APIs', color: '#0f766e', items: ['Amadeus Travel APIs', 'Sabre Web Services', 'Travelport / Galileo', 'NDC Airline APIs', 'SiteMinder / RateGain', 'Viator / GetYourGuide'] },
  { group: 'Payments', color: '#b45309', items: ['Stripe / Braintree', 'PayPal / Adyen', 'Multi-currency FX', 'SCA / 3DS2', 'Klarna / Afterpay', 'Apple Pay / Google Pay'] },
  { group: 'Search & Performance', color: '#6d28d9', items: ['Elasticsearch', 'Algolia (autocomplete)', 'Redis (caching)', 'Solr (property search)', 'CDN / CloudFront', 'Multi-region deployment'] },
  { group: 'AI & Personalisation', color: '#dc2626', items: ['Recommendation engine', 'Dynamic pricing ML', 'Demand forecasting', 'NLP chatbot (travel)', 'Sentiment analysis', 'Fraud detection ML'] },
  { group: 'Cloud & DevOps', color: '#059669', items: ['AWS / GCP / Azure', 'Kubernetes / EKS', 'Terraform (IaC)', 'GitHub Actions CI/CD', 'Datadog / New Relic', 'Multi-region HA'] },
  { group: 'Database & Storage', color: '#0891b2', items: ['PostgreSQL / MySQL', 'MongoDB (content)', 'Redis / ElastiCache', 'S3 / GCS (media)', 'DynamoDB (sessions)', 'Snowflake (analytics)'] },
];

const ENGAGEMENT = [
  { id: 'platform', name: 'Custom Platform Build', badge: 'Most Popular', bc: '#D97706', feat: true, icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', headline: 'End-to-end travel platform built to your spec.', desc: 'Full-cycle development of a custom travel platform — booking engine, supplier integration, back-office, and mobile app. Discovery → architecture → agile sprints → launch → post-launch support.', best: ['OTAs, tour operators, DMOs building a new digital product', 'Travel companies replacing a legacy platform with modern technology', 'Hospitality groups building a direct booking and PMS platform', 'Travel startups building an MVP to raise seed or Series A funding'], tl: 'MVP live in 12–16 weeks; full platform 6–10 months' },
  { id: 'integration', name: 'API Integration & Connectivity', badge: 'Quick Win', bc: '#0c4a6e', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', headline: 'GDS, channel manager, and API connectivity fast.', desc: 'Rapid integration of GDS (Amadeus, Sabre, Travelport), channel managers, OTA extranets, payment gateways, and third-party APIs into your existing platform. Fixed-scope engagements with defined deliverables.', best: ['Travel companies adding new supplier APIs to an existing platform', 'Hotels needing channel manager and OTA connectivity', 'Tour operators adding flight and transfer booking to a tours-only platform', 'Travel apps adding payment methods, loyalty, or communication APIs'], tl: 'Integration complete in 4–10 weeks' },
  { id: 'modernisation', name: 'Platform Modernisation', badge: 'Legacy Upgrade', bc: '#0369a1', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', headline: 'Modernise your existing travel platform without disruption.', desc: 'Incremental modernisation of legacy booking platforms — API-first architecture, mobile responsiveness, payment stack upgrade, search performance, cloud migration, and microservices decomposition. Strangler fig pattern to avoid big-bang rewrites.', best: ['Travel companies on aging platforms with performance issues', 'OTAs with slow search, poor mobile UX, or high cart abandonment', 'Hospitality groups on legacy PMS needing cloud migration', 'Tour operators on manual/spreadsheet-based operations needing digitisation'], tl: 'First modernised capability in 6–8 weeks' },
];

const TESTIMONIALS = [
  { text: "1Solutions built our OTA platform from scratch — flight and hotel search, GDS integration (Amadeus + SiteMinder), booking flow, payment, and a mobile app. The MVP was live in 14 weeks and we processed our first booking in week 15. 18 months later the platform does $4M monthly GMV. Their travel domain knowledge was as valuable as their technical skill.", name: 'James R.', role: 'CEO, Online Travel Agency (UK)', init: 'JR', bg: '#0c2340' },
  { text: "We were running our hotel group on a 12-year-old PMS that couldn't integrate with OTAs. 1Solutions built a modern cloud PMS with SiteMinder channel manager integration, a direct booking engine, and a loyalty app. RevPAR increased 28% in the first year as direct bookings went from 18% to 41% of revenue. Exceptional travel technology expertise.", name: 'Lisa C.', role: 'COO, Boutique Hotel Group (AU)', init: 'LC', bg: '#163f5a', feat: true },
  { text: "We hired 1Solutions to build the booking platform for our adventure travel brand — tour packages, activity booking, transfers, and accommodation, all bookable in one flow. They integrated Viator for activities and built a custom tour operator back-end for our team. Platform launched in 5 months. Our online booking conversion rate is 6.2%, above industry average.", name: 'Marcus T.', role: 'Founder, Adventure Travel Brand (US)', init: 'MT', bg: '#1e3a5f' },
];

const WHY = [
  { t: '120+ Travel Projects Delivered', d: '1Solutions has built OTAs, hotel PMS platforms, tour operator systems, travel apps, and GDS integrations for travel companies in the UK, US, Australia, and Canada over 15+ years.' },
  { t: 'GDS & Travel API Specialists', d: 'Amadeus, Sabre, Travelport, NDC airline APIs, hotel channel managers (SiteMinder, RateGain), and activities APIs (Viator, GetYourGuide) — deep integration expertise across the travel API ecosystem.' },
  { t: 'Conversion-Optimised Booking Flows', d: 'Our travel UX team designs booking flows validated against industry benchmarks. We track and improve search-to-booking conversion rate as a primary KPI, not just feature delivery.' },
  { t: 'Multi-Currency & Multi-Language', d: 'All travel platforms we build support multi-currency pricing, FX rate updates, and multi-language content — critical for travel companies with international customer bases.' },
  { t: 'Mobile-First Development', d: 'Every travel platform is built mobile-first. Native iOS and Android apps or high-performance React Native — with offline itinerary access, push notifications, and mobile payment.' },
  { t: 'PCI-DSS Compliant Payment Integration', d: 'Payment security is non-negotiable in travel. All platforms include PCI-DSS compliant payment integration, 3DS2/SCA implementation, and fraud detection for card-not-present transactions.' },
  { t: 'AI-Powered Pricing & Personalisation', d: 'Dynamic pricing engines (yield management, demand forecasting, competitor monitoring) and personalisation engines (recommendation, content, email) increase revenue per booking and repeat rate.' },
  { t: 'Post-Launch Support & SLAs', d: 'Travel platforms cannot go down during peak booking periods. We offer SLA-backed post-launch support with P1 response under 2 hours, proactive monitoring, and on-call DevOps during peak seasons.' },
];

const FAQS = [
  { q: 'What travel and tourism software does 1Solutions develop?', a: 'Online booking engines (OTA), hotel PMS, tour operator and DMC software, GDS/NDC integration, travel CRM and loyalty, dynamic pricing engines, travel mobile apps, corporate travel management, and destination management platforms.' },
  { q: 'Can you integrate GDS systems like Amadeus and Sabre?', a: 'Yes — GDS and travel API integration is core to our practice. We integrate Amadeus (NDC, Travel APIs), Sabre (SynXis, Web Services), Travelport (Galileo, Worldspan), hotel channel managers (SiteMinder, RateGain), and activities APIs (Viator, GetYourGuide, Rezdy).' },
  { q: 'How long does it take to build an OTA platform?', a: 'MVP OTA (flight + hotel search, booking, payment, itinerary): 4–5 months. Full-featured OTA with packages, activities, B2B portal, and GDS integration: 7–10 months. We use an MVP-first approach so you start generating bookings before all features are complete.' },
  { q: 'Do you build mobile apps for travel companies?', a: 'Yes — iOS and Android travel apps using React Native (shared codebase) or native Swift/Kotlin. Common features: trip itinerary management, mobile check-in, flight status push notifications, offline booking access, in-app support, loyalty tracker, and mobile payment.' },
  { q: 'Can you build a white-label travel booking platform?', a: 'Yes — fully brandable booking engines for travel agencies, airlines, hotel chains, and corporate travel managers. Configurable UI theming, custom domain, B2B agent portal with commission management, multi-currency and multi-language. Ready in 10–16 weeks.' },
  { q: 'What technology stack do you use for travel platforms?', a: 'Frontend: React/Next.js (web), React Native (mobile). Backend: Node.js or Python FastAPI. Search: Elasticsearch + Redis caching. Payments: Stripe, Adyen, PayPal. Cloud: AWS or GCP, multi-region for global performance. Database: PostgreSQL for bookings, MongoDB for content.' },
  { q: 'How do you handle peak traffic during holiday booking periods?', a: 'Auto-scaling infrastructure on AWS/GCP, Redis caching for availability results, CDN for static assets, load testing before peak seasons, read replicas for database queries, and a war room protocol with on-call DevOps during Black Friday and peak booking windows.' },
  { q: 'Can you modernise our existing travel platform?', a: 'Yes — we modernise legacy booking platforms using a strangler fig approach: API layer first, then incremental migration of modules (search, booking, payment, back-office) without a big-bang rewrite. First modernised capability typically live in 6–8 weeks.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => { if (!start) return; const n = parseInt(target.replace(/\D/g, ''), 10); if (!n) return; let t0 = null; const s = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) requestAnimationFrame(s); }; requestAnimationFrame(s); }, [start, target, duration]);
  return count;
}
function StatItem({ label, val, started }) {
  const n = useCountUp(val, 1800, started);
  const sfx = val.replace(/[\d,]/g, '');
  return (<div className="tt-sc"><div className="tt-sv">{started ? n + sfx : val}</div><div className="tt-sl">{label}</div></div>);
}

export default function TravelTourismSoftware() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [ss, setSs] = useState(false);
  const [vis, setVis] = useState(new Set());
  const [vSk, setVSk] = useState([]); const [vEn, setVEn] = useState([]); const [vWh, setVWh] = useState([]); const [vTe, setVTe] = useState([]); const [vSt, setVSt] = useState([]);
  const stR = useRef(null); const secR = useRef({});
  const skR = useRef(null); const enR = useRef(null); const whR = useRef(null); const teR = useRef(null); const stGr = useRef(null);
  useEffect(() => { if (!stR.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSs(true); o.disconnect(); } }, { threshold: 0.4 }); o.observe(stR.current); return () => o.disconnect(); }, []);
  useEffect(() => {
    const pairs = [[skR, SOLUTIONS.length, setVSk], [enR, 3, setVEn], [whR, WHY.length, setVWh], [teR, 3, setVTe], [stGr, TECH_STACK.length, setVSt]];
    const obs = pairs.map(([ref, count, setter]) => { if (!ref.current) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 75)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(ref.current); return o; });
    return () => obs.forEach(o => o?.disconnect());
  }, []);
  useEffect(() => { const ks = Object.keys(secR.current); const obs = ks.map(k => { const el = secR.current[k]; if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(p => new Set([...p, k])); o.disconnect(); } }, { threshold: 0.1 }); o.observe(el); return o; }); return () => obs.forEach(o => o?.disconnect()); }, []);
  const visS = showAll ? SOLUTIONS : SOLUTIONS.slice(0, 6);
  const ac = '#0c4a6e'; const txt = '#0c2340'; const txt2 = '#164e63';
  return (
    <>
      <Head>
        <title>Travel & Tourism Software Development | OTA, Hotel PMS, GDS Integration | 1Solutions</title>
        <meta name="description" content="Custom travel and tourism software development — OTA platforms, hotel PMS, tour operator software, GDS integration (Amadeus, Sabre, Travelport), travel apps, dynamic pricing, and travel CRM. 120+ travel projects. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/travel-and-tourism-software-solutions/" />
        <meta property="og:title" content="Travel & Tourism Software Development | 1Solutions" />
        <meta property="og:description" content="OTA platforms, hotel PMS, GDS integration, travel apps, and dynamic pricing. 120+ travel projects. 15+ years." />
        <meta property="og:url" content="https://www.1solutions.biz/travel-and-tourism-software-solutions/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .tt-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#f0f9ff 0%,#e0f2fe 20%,#ecfeff 50%,#fef3c7 75%,#f0fdf4 100%);color:${txt};line-height:1.6;position:relative;overflow-x:hidden}
          .tt-page *,.tt-page *::before,.tt-page *::after{box-sizing:border-box}
          .tt-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .tt-o1{width:800px;height:800px;background:radial-gradient(circle,rgba(12,74,110,.18) 0%,transparent 70%);top:-220px;right:-200px}
          .tt-o2{width:700px;height:700px;background:radial-gradient(circle,rgba(217,119,6,.14) 0%,transparent 70%);bottom:0;left:-200px}
          .tt-o3{width:480px;height:480px;background:radial-gradient(circle,rgba(20,83,45,.10) 0%,transparent 70%);top:42%;left:-90px}
          .tt-bc{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .tt-bc ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:${ac}}
          .tt-bc li{display:flex;align-items:center;gap:6px}.tt-bc li::after{content:'/';opacity:.45}.tt-bc li:last-child::after{display:none}
          .tt-bc a{color:${txt};text-decoration:none}
          .tt-hero{position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto;padding:44px 40px 28px}
          .tt-ey{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${ac};margin-bottom:14px}
          .tt-hero h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,${txt} 0%,${ac} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .tt-desc{font-size:16px;color:${txt2};line-height:1.65;max-width:720px;margin:0 auto 22px}
          .tt-tr{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin-bottom:24px}
          .tt-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:5px 13px;font-size:12px;font-weight:600;color:${txt};box-shadow:0 2px 8px rgba(12,74,110,.07)}
          .tt-dot{width:7px;height:7px;border-radius:50%;background:${ac};flex-shrink:0}
          .tt-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .tt-p{display:inline-block;padding:13px 34px;background:${ac};color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(12,74,110,.28)}
          .tt-p:hover{background:${txt};transform:translateY(-2px)}
          .tt-g{display:inline-block;padding:13px 34px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:${txt};font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .tt-g:hover{background:rgba(255,255,255,.85);border-color:rgba(12,74,110,.5);transform:translateY(-2px)}
          .tt-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:920px;margin:26px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(12,74,110,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .tt-sc{padding:18px 16px;text-align:center;border-right:1px solid rgba(12,74,110,.10)}.tt-sc:last-child{border-right:none}
          .tt-sv{font-size:28px;font-weight:900;color:${ac};letter-spacing:-.5px;line-height:1}
          .tt-sl{font-size:11px;color:${txt2};font-weight:500;margin-top:5px}
          .tt-sec{padding:72px 40px;position:relative;z-index:1}
          .tt-sec-alt{background:rgba(240,249,255,.55);border-top:1px solid rgba(12,74,110,.08);border-bottom:1px solid rgba(12,74,110,.08)}
          .tt-in{max-width:1300px;margin:0 auto}
          .tt-sey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .tt-sh{font-size:44px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .tt-sd{font-size:15px;color:${txt2};line-height:1.7;max-width:700px}
          .tt-rv{opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .tt-rv.tt-ok{opacity:1;transform:translateY(0)}
          .tt-sk-g{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
          .tt-card{background:linear-gradient(135deg,rgba(240,249,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(236,254,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(12,74,110,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1),border-color .2s}
          .tt-card.tt-cv{opacity:1;transform:translateY(0)}.tt-card.tt-cv:hover{transform:translateY(-5px);border-color:rgba(12,74,110,.25);box-shadow:0 14px 40px rgba(12,74,110,.12)}
          .tt-card.feat{border-color:rgba(12,74,110,.18)}
          .tt-cn{position:absolute;top:6px;right:12px;font-size:68px;font-weight:900;line-height:1;color:${ac};opacity:.05;pointer-events:none;user-select:none}
          .tt-card h3{font-size:15px;font-weight:700;color:${txt};margin:0 0 7px;position:relative;z-index:1}
          .tt-card p{font-size:13px;color:${txt2};line-height:1.65;margin:0;position:relative;z-index:1}
          .tt-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,${ac},#0284c7);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top;transition:transform .3s}
          .tt-card.tt-cv:hover::before{transform:scaleY(1)}
          .tt-sm{text-align:center;margin-top:20px}
          .tt-bm{display:inline-block;background:#fff;border:1.5px solid rgba(12,74,110,.18);color:${txt};padding:9px 28px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .tt-bm:hover{background:${ac};border-color:${ac};color:#fff;transform:translateY(-2px)}
          .tt-tec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
          .tt-tc2{background:linear-gradient(135deg,rgba(240,249,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(236,254,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:20px 18px;box-shadow:0 4px 24px rgba(12,74,110,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .tt-tc2.tt-sv2{opacity:1;transform:translateY(0)}.tt-tc2.tt-sv2:hover{border-color:rgba(12,74,110,.22);box-shadow:0 12px 36px rgba(12,74,110,.10)}
          .tt-tg{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:10px;padding-bottom:7px;border-bottom:2px solid}
          .tt-pills{display:flex;flex-wrap:wrap;gap:5px}
          .tt-pill{display:inline-block;font-size:11px;font-weight:500;padding:3px 9px;border-radius:100px;border:1px solid}
          .tt-en-g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
          .tt-en{background:linear-gradient(135deg,rgba(240,249,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(236,254,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(12,74,110,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1),border-color .2s}
          .tt-en.tt-ev{opacity:1;transform:translateY(0)}.tt-en.tt-ev:hover{border-color:rgba(12,74,110,.22);box-shadow:0 14px 44px rgba(12,74,110,.12)}
          .tt-en.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.45) 100%);border-color:rgba(217,119,6,.26);transform:translateY(-6px)}
          .tt-en.feat.tt-ev{transform:translateY(-6px)}.tt-en.feat.tt-ev:hover{transform:translateY(-10px)}
          .tt-en-b{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:4px 11px;border-radius:100px;border:1px solid;margin-bottom:16px}
          .tt-en-i{width:44px;height:44px;background:rgba(12,74,110,.08);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
          .tt-en.feat .tt-en-i{background:rgba(217,119,6,.10)}
          .tt-en-n{font-size:20px;font-weight:900;color:${txt};margin:0 0 5px;letter-spacing:-.3px}
          .tt-en-h{font-size:13px;font-weight:600;color:${ac};margin-bottom:10px}
          .tt-en.feat .tt-en-h{color:#D97706}
          .tt-en-d{font-size:13px;color:${txt2};line-height:1.7;margin-bottom:14px}
          .tt-en-ll{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${ac};margin-bottom:7px}
          .tt-en-li{list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:6px}
          .tt-en-li li{display:flex;align-items:flex-start;gap:7px;font-size:13px;color:#374151;line-height:1.5}
          .tt-en-li li::before{content:'✓';font-weight:800;color:${ac};flex-shrink:0;margin-top:1px}
          .tt-en.feat .tt-en-li li::before{color:#D97706}
          .tt-en-tl{font-size:11px;font-weight:600;color:#D97706;display:block;padding-top:10px;border-top:1px solid rgba(12,74,110,.08)}
          .tt-en-a{display:block;margin-top:14px;padding:10px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(12,74,110,.09);color:${txt};border:1.5px solid rgba(12,74,110,.18)}
          .tt-en-a:hover{background:${txt};color:#fff}
          .tt-en.feat .tt-en-a{background:${ac};color:#fff;border-color:${ac}}
          .tt-en.feat .tt-en-a:hover{background:${txt};border-color:${txt}}
          .tt-tg2{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px}
          .tt-tc{background:linear-gradient(135deg,rgba(240,249,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(236,254,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:26px 22px;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 24px rgba(12,74,110,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
          .tt-tc.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.42) 100%);border-color:rgba(217,119,6,.20)}
          .tt-tc.tt-tv{opacity:1;transform:translateY(0)}.tt-tc.tt-tv:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(12,74,110,.12)}
          .tt-stars{font-size:15px;color:#D97706;letter-spacing:2px}
          .tt-ttxt{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .tt-au{display:flex;align-items:center;gap:11px}
          .tt-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .tt-an{font-size:14px;font-weight:700;color:${txt}}
          .tt-ar{font-size:12px;color:#6b7280}
          .tt-wy-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:44px}
          .tt-wc{background:linear-gradient(135deg,rgba(240,249,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(236,254,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:22px 18px;box-shadow:0 4px 24px rgba(12,74,110,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px) scale(.97);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .tt-wc.tt-wv{opacity:1;transform:translateY(0) scale(1)}.tt-wc.tt-wv:hover{transform:translateY(-4px) scale(1);border-color:rgba(12,74,110,.22);box-shadow:0 12px 36px rgba(12,74,110,.10)}
          .tt-wd{width:9px;height:9px;border-radius:50%;background:${ac};margin-bottom:10px}
          .tt-wc h3{font-size:13px;font-weight:700;color:${txt};margin:0 0 7px;line-height:1.35}
          .tt-wc p{font-size:12px;color:${txt2};line-height:1.6;margin:0}
          .tt-ct{padding:64px 40px;background:linear-gradient(135deg,rgba(240,249,255,.55) 0%,rgba(255,255,255,.60) 40%,rgba(224,242,254,.50) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .tt-ct-g{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.1fr;gap:28px;align-items:start}
          .tt-cth{font-size:38px;font-weight:900;line-height:1.18;margin:0 0 12px;background:linear-gradient(90deg,${txt} 0%,${ac} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .tt-ctd{font-size:14px;color:${txt2};line-height:1.6;margin:0 0 18px}
          .tt-ben{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:12px}
          .tt-be{display:flex;gap:9px;align-items:flex-start}
          .tt-bi{flex-shrink:0;color:${ac};font-weight:800;font-size:15px;margin-top:1px}
          .tt-be p{font-size:13px;color:${txt2};margin:0;line-height:1.5}
          .tt-fb{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(240,249,255,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:18px;padding:30px;box-shadow:0 8px 40px rgba(12,74,110,.08),inset 0 1px 0 rgba(255,255,255,1)}
          .tt-fb h3{font-size:20px;font-weight:700;color:${txt};margin:0 0 20px}
          .tt-form{display:flex;flex-direction:column;gap:12px}
          .tt-fr{display:grid;grid-template-columns:1fr 1fr;gap:11px}
          .tt-fg{display:flex;flex-direction:column;gap:4px}
          .tt-fg.full{grid-column:1/-1}
          .tt-fg label{font-size:12px;font-weight:500;color:${txt}}
          .tt-fg input,.tt-fg textarea,.tt-fg select{padding:10px 12px;border:1px solid rgba(12,74,110,.14);border-radius:6px;font-size:13px;font-family:inherit;color:${txt};background:rgba(255,255,255,.55);transition:border-color .2s}
          .tt-fg input:focus,.tt-fg textarea:focus,.tt-fg select:focus{outline:none;border-color:${ac};box-shadow:0 0 0 3px rgba(12,74,110,.10)}
          .tt-co{display:flex;gap:8px;align-items:flex-start}
          .tt-co input{margin-top:3px;width:14px;height:14px}
          .tt-co label{font-size:11px;color:${txt2};line-height:1.5}.tt-co a{color:${txt}}
          .tt-sub{width:100%;padding:13px;background:${ac};border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(12,74,110,.25)}
          .tt-sub:hover{background:${txt};transform:translateY(-2px)}
          .tt-fq{padding:72px 40px;background:rgba(240,249,255,.55);border-top:1px solid rgba(12,74,110,.08);position:relative;z-index:1}
          .tt-fq h2{font-size:42px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .tt-fq-sub{font-size:15px;color:${txt2};margin:0 0 32px}
          .tt-fql{display:flex;flex-direction:column;gap:9px}
          .tt-fi{background:linear-gradient(135deg,rgba(240,249,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(236,254,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(12,74,110,.05);transition:border-color .2s}
          .tt-fi.open{border-color:rgba(12,74,110,.28)}.tt-fi.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,${ac},#0284c7);border-radius:3px 3px 0 0}
          .tt-fqb{width:100%;background:none;border:none;padding:18px 18px 18px 52px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:12px;font-family:inherit;position:relative}
          .tt-fqn{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:rgba(12,74,110,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:5px}
          .tt-fi.open .tt-fqn{background:${ac};color:#fff}
          .tt-fqb span{font-size:14px;font-weight:600;color:${txt};line-height:1.4}.tt-fi.open .tt-fqb span{color:${ac}}
          .tt-fch{width:20px;height:20px;flex-shrink:0;color:#9ca3af;transition:transform .3s}.tt-fi.open .tt-fch{transform:rotate(180deg);color:${ac}}
          .tt-faw{overflow:hidden;transition:max-height .35s ease;max-height:0}.tt-fi.open .tt-faw{max-height:400px}
          .tt-fa{padding:0 18px 18px 52px;font-size:14px;color:#4b5563;line-height:1.8}
          .tt-rel{padding:64px 40px;background:rgba(240,249,255,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .tt-ri{max-width:1300px;margin:0 auto;text-align:center}
          .tt-ri h2{font-size:30px;font-weight:900;background:linear-gradient(90deg,${txt} 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 10px}
          .tt-ri hr{border:none;border-top:1px solid rgba(12,74,110,.10);margin:24px 0}
          .tt-rts{display:flex;flex-wrap:wrap;justify-content:center;gap:9px}
          .tt-rt{display:inline-block;padding:9px 18px;border:1.5px solid;border-radius:50px;font-size:13px;font-weight:500;text-decoration:none;transition:all .22s}
          .tt-rt:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.08)}
          .tt-ra{background:rgba(12,74,110,.09);border-color:rgba(12,74,110,.28);color:#0c4a6e}
          .tt-rb{background:rgba(190,18,60,.09);border-color:rgba(190,18,60,.28);color:#9f1239}
          .tt-rc{background:rgba(22,101,52,.09);border-color:rgba(22,101,52,.28);color:#14532d}
          .tt-rd{background:rgba(146,64,14,.09);border-color:rgba(146,64,14,.28);color:#92400e}
          @media(max-width:1024px){.tt-hero h1,.tt-sh,.tt-fq h2{font-size:34px}.tt-sk-g{grid-template-columns:repeat(2,1fr)}.tt-tec-g{grid-template-columns:repeat(2,1fr)}.tt-en-g{grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto}.tt-en.feat{transform:none}.tt-en.feat.tt-ev{transform:none}.tt-en.feat.tt-ev:hover{transform:translateY(-4px)}.tt-wy-g{grid-template-columns:repeat(2,1fr)}.tt-tg2{grid-template-columns:1fr}.tt-ct-g{grid-template-columns:1fr}}
          @media(max-width:768px){.tt-bc,.tt-hero,.tt-sec,.tt-ct,.tt-fq,.tt-rel{padding-left:20px;padding-right:20px}.tt-hero{padding-top:28px;padding-bottom:16px}.tt-hero h1{font-size:26px}.tt-stats{grid-template-columns:1fr 1fr}.tt-sc:nth-child(2){border-right:none}.tt-sc:nth-child(3),.tt-sc:nth-child(4){border-top:1px solid rgba(12,74,110,.10)}.tt-sc:nth-child(4){border-right:none}.tt-sk-g,.tt-tec-g,.tt-wy-g{grid-template-columns:1fr}.tt-fr{grid-template-columns:1fr}.tt-cth{font-size:26px}}
        `}</style>
      </Head>
      <div className="tt-page">
        <div className="tt-orb tt-o1" /><div className="tt-orb tt-o2" /><div className="tt-orb tt-o3" />
        <nav className="tt-bc" aria-label="Breadcrumb"><ol itemScope itemType="https://schema.org/BreadcrumbList"><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li><li><span>Industries</span></li><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">Travel & Tourism</span><meta itemProp="position" content="3" /></li></ol></nav>
        <section className="tt-hero">
          <span className="tt-ey">Travel & Tourism Industry</span>
          <h1>Travel & Tourism Software Development — OTA, Hotel PMS & GDS Integration</h1>
          <p className="tt-desc">Custom travel technology for OTAs, hotel groups, tour operators, DMOs, and travel startups — online booking engines, GDS integration (Amadeus, Sabre, Travelport), hotel PMS, travel CRM, dynamic pricing, and mobile apps. 120+ travel projects. 15+ years.</p>
          <div className="tt-tr">{['OTA & Booking Platform','Hotel PMS Development','GDS / NDC Integration','Dynamic Pricing Engine','Travel Mobile Apps'].map(b => (<div className="tt-badge" key={b}><span className="tt-dot" />{b}</div>))}</div>
          <div className="tt-ctas"><Link href="#contact" className="tt-p">Discuss Your Travel Platform</Link><Link href="#solutions" className="tt-g">View Solutions →</Link></div>
        </section>
        <div className="tt-stats" ref={stR}>{[['120+','Travel Projects'],['15+','Years Dev Experience'],['99.9%','Platform Uptime SLA'],['40%','Avg Booking Conversion Lift']].map(([v, l]) => <StatItem key={l} label={l} val={v} started={ss} />)}</div>
        <section id="solutions" className="tt-sec"><div className="tt-in"><div className={`tt-rv${vis.has('sk') ? ' tt-ok' : ''}`} ref={el => { secR.current['sk'] = el; }}><span className="tt-sey">Travel Technology Solutions</span><h2 className="tt-sh">What We Build for Travel & Tourism</h2><p className="tt-sd">Booking engines, hotel PMS, GDS integration, tour operator software, travel CRM, dynamic pricing, mobile apps, and corporate travel management — the complete travel tech stack.</p></div><div className="tt-sk-g" ref={skR}>{visS.map((s, i) => (<div key={s.n} className={`tt-card${s.feat ? ' feat' : ''}${vSk.includes(i) ? ' tt-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="tt-cn">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}</div>{SOLUTIONS.length > 6 && <div className="tt-sm"><button className="tt-bm" onClick={() => setShowAll(p => !p)}>{showAll ? 'Show fewer ↑' : `Show all ${SOLUTIONS.length} solutions ↓`}</button></div>}</div></section>
        <section className="tt-sec tt-sec-alt"><div className="tt-in"><div className={`tt-rv${vis.has('stk') ? ' tt-ok' : ''}`} ref={el => { secR.current['stk'] = el; }}><span className="tt-sey">Technology Stack</span><h2 className="tt-sh">Travel Technology We Work With</h2><p className="tt-sd">React/Next.js, Node.js, Elasticsearch, Redis, Amadeus, Sabre, Stripe, AWS, and the full modern travel API ecosystem.</p></div><div className="tt-tec-g" ref={stGr}>{TECH_STACK.map((g, i) => (<div key={g.group} className={`tt-tc2${vSt.includes(i) ? ' tt-sv2' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="tt-tg" style={{ color: g.color, borderBottomColor: g.color + '33' }}>{g.group}</div><div className="tt-pills">{g.items.map(it => <span key={it} className="tt-pill" style={{ color: g.color, background: g.color + '12', borderColor: g.color + '30' }}>{it}</span>)}</div></div>))}</div></div></section>
        <section className="tt-sec"><div className="tt-in"><div className={`tt-rv${vis.has('eng') ? ' tt-ok' : ''}`} ref={el => { secR.current['eng'] = el; }}><span className="tt-sey">Engagement Models</span><h2 className="tt-sh">How We Work with Travel Companies</h2><p className="tt-sd">Custom platform build, rapid API integration, or legacy modernisation — structured for your timeline and commercial model.</p></div><div className="tt-en-g" ref={enR}>{ENGAGEMENT.map((m, i) => (<div key={m.id} className={`tt-en${m.feat ? ' feat' : ''}${vEn.includes(i) ? ' tt-ev' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><span className="tt-en-b" style={{ color: m.bc, borderColor: m.bc + '44', background: m.bc + '14' }}>{m.badge}</span><div className="tt-en-i"><svg viewBox="0 0 24 24" width="24" height="24" fill={m.feat ? '#D97706' : ac}><path d={m.icon} /></svg></div><div className="tt-en-n">{m.name}</div><div className="tt-en-h">{m.headline}</div><div className="tt-en-d">{m.desc}</div><div className="tt-en-ll">Best for</div><ul className="tt-en-li">{m.best.map(b => <li key={b}>{b}</li>)}</ul><span className="tt-en-tl">{m.tl}</span><Link href="#contact" className="tt-en-a">Get a free estimate →</Link></div>))}</div></div></section>
        <section className="tt-sec tt-sec-alt"><div className="tt-in"><div className={`tt-rv${vis.has('ts') ? ' tt-ok' : ''}`} ref={el => { secR.current['ts'] = el; }}><span className="tt-sey">Client Outcomes</span><h2 className="tt-sh">Travel Technology Clients</h2><p className="tt-sd">OTAs, hotel groups, and tour operators across the UK, AU, and US on building travel platforms with 1Solutions.</p></div><div className="tt-tg2" ref={teR}>{TESTIMONIALS.map((t, i) => (<div key={i} className={`tt-tc${t.feat ? ' feat' : ''}${vTe.includes(i) ? ' tt-tv' : ''}`} style={{ transitionDelay: `${i * 90}ms` }} itemScope itemType="https://schema.org/Review"><div className="tt-stars">★★★★★</div><p className="tt-ttxt" itemProp="reviewBody">{t.text}</p><div className="tt-au"><div className="tt-av" style={{ background: t.bg }}>{t.init}</div><div><div className="tt-an" itemProp="author">{t.name}</div><div className="tt-ar">{t.role}</div></div></div></div>))}</div></div></section>
        <section className="tt-sec"><div className="tt-in"><div className={`tt-rv${vis.has('wy') ? ' tt-ok' : ''}`} ref={el => { secR.current['wy'] = el; }}><span className="tt-sey">Why 1Solutions</span><h2 className="tt-sh">Why Travel Companies Choose 1Solutions</h2><p className="tt-sd">GDS specialists, conversion-optimised booking flows, mobile-first development, PCI-DSS compliance, AI-powered pricing, and 24/7 SLA support during peak booking seasons.</p></div><div className="tt-wy-g" ref={whR}>{WHY.map((c, i) => (<div key={i} className={`tt-wc${vWh.includes(i) ? ' tt-wv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="tt-wd" /><h3>{c.t}</h3><p>{c.d}</p></div>))}</div></div></section>
        <section id="contact" className="tt-ct"><div className="tt-ct-g"><div><h2 className="tt-cth">Build Your Travel Platform</h2><p className="tt-ctd">Share your travel technology requirements — booking engine, GDS integration, PMS, or mobile app — and we will respond within 24 hours with a proposal, timeline, and team composition.</p><div className="tt-ben">{[['✓','Technical proposal within 24–48 hours'],['✓','GDS/API integration specialists on every travel project'],['✓','NDA signed before any technical discussions'],['✓','120+ travel projects — OTAs, hotel groups, tour operators'],['✓','Mobile-first, PCI-DSS compliant, SLA-backed delivery']].map(([ic, tx]) => (<div className="tt-be" key={tx}><span className="tt-bi">{ic}</span><p>{tx}</p></div>))}</div></div>
        <div className="tt-fb"><h3>Tell Us About Your Travel Platform</h3><form className="tt-form" onSubmit={e => e.preventDefault()}><div className="tt-fr"><div className="tt-fg"><label>Full Name *</label><input type="text" placeholder="Your name" required /></div><div className="tt-fg"><label>Work Email *</label><input type="email" placeholder="you@company.com" required /></div></div><div className="tt-fr"><div className="tt-fg"><label>Company</label><input type="text" placeholder="Your company" /></div><div className="tt-fg"><label>Phone / WhatsApp</label><input type="tel" placeholder="+1 555 000 0000" /></div></div><div className="tt-fg full"><label>Type of Travel Platform *</label><select required><option value="">Select...</option><option>OTA / Online Booking Engine</option><option>Hotel PMS / Property Management System</option><option>Tour Operator / DMC Software</option><option>Travel Mobile App</option><option>Corporate / B2B Travel Management</option><option>Dynamic Pricing Engine</option><option>Travel CRM / Loyalty Platform</option><option>GDS / API Integration</option><option>Other</option></select></div><div className="tt-fg full"><label>Project Description *</label><textarea rows={4} placeholder="Describe your travel technology project — type of platform, current system (if any), key features needed, target markets, and timeline..." required /></div><div className="tt-co"><input type="checkbox" required /><label>I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label></div><button type="submit" className="tt-sub">Get a Travel Platform Proposal →</button></form></div></div></section>
        <section className="tt-fq"><div className="tt-in" style={{ maxWidth: 840 }}><span className="tt-sey">FAQ</span><h2>Travel & Tourism Software — FAQ</h2><p className="tt-fq-sub">OTA development, GDS integration, hotel PMS, mobile apps, tech stack, white-label platforms, and modernisation.</p><div className="tt-fql">{FAQS.map((f, i) => (<div key={i} className={`tt-fi${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="tt-fqb" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="tt-fqn">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{f.q}</span><svg className="tt-fch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="tt-faw"><div className="tt-fa" itemProp="text">{f.a}</div></div></div>))}</div></div></section>
        <section className="tt-rel"><div className="tt-ri"><span className="tt-sey">Related Services</span><h2>Related Industry & Technology Services</h2><hr /><div className="tt-rts">{[['/real-estate-software-development/','Real Estate Software','tt-rd'],['/retail-ecommerce-software-development/','Retail & eCommerce','tt-rb'],['/logistics-software-development-services/','Logistics Software','tt-rc'],['/manufacturing-software-development-services/','Manufacturing Software','tt-ra'],['/fintech-software-development-company/','FinTech Software','tt-ra'],['/it-outsourcing-services/','IT Outsourcing','tt-rc'],['/offshore-development-company/','Offshore Development','tt-rb'],['/mobile-app-development/','Mobile Apps','tt-rd']].map(([hr, lb, cl]) => (<Link key={hr} href={hr} className={`tt-rt ${cl}`}>{lb}</Link>))}</div></div></section>
      </div>
    </>
  );
}
