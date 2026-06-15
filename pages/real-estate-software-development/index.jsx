'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.1solutions.biz/#industries' }, { '@type': 'ListItem', position: 3, name: 'Real Estate Software', item: 'https://www.1solutions.biz/real-estate-software-development/' }] },
    { '@type': 'Service', name: 'Real Estate Software Development', url: 'https://www.1solutions.biz/real-estate-software-development/', description: '1Solutions builds custom real estate software — property listing portals, CRM for real estate agents, MLS/IDX integration, property management systems (PMS), virtual tour platforms, mortgage calculators, agent marketplace software, and PropTech apps. 15+ years, 110+ real estate projects, clients in US, UK, AU, CA.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '88', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What real estate software does 1Solutions develop?', acceptedAnswer: { '@type': 'Answer', text: '1Solutions develops property listing portals, MLS/IDX integration platforms, real estate CRM, property management systems (PMS), virtual tour and 3D walkthrough platforms, mortgage and affordability calculators, agent marketplace and lead routing software, commercial real estate deal management, PropTech mobile apps, and tenant/landlord portals.' } },
      { '@type': 'Question', name: 'Can you integrate MLS and IDX feeds?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — MLS/IDX integration is a core capability. We integrate RETS feeds, RESO Web API (the modern MLS standard), and IDX data feeds from all major US MLS systems. We build property search engines with real-time MLS data, map-based search (Google Maps, Mapbox), saved search and listing alerts, and IDX-compliant display rules. We also integrate UK property portals (Rightmove, Zoopla data feeds) and Australian platforms (REI API).' } },
      { '@type': 'Question', name: 'How long does it take to build a real estate portal?', acceptedAnswer: { '@type': 'Answer', text: 'A real estate listing portal with property search, agent profiles, contact forms, and basic CRM typically takes 10–16 weeks. A full-featured portal with MLS/IDX integration, map search, virtual tours, mortgage calculator, agent marketplace, and mobile app: 5–9 months. We use a phased approach — portal live and generating leads in 10–14 weeks, with advanced features added in subsequent sprints.' } },
      { '@type': 'Question', name: 'Do you build property management software?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — property management system (PMS) development is one of our most common real estate engagements. We build systems for residential and commercial property managers: tenant onboarding, lease management, online rent payment, maintenance request portal, inspection reports, owner statements and financial reporting, document management, vacancy tracking, and tenant communication tools.' } },
    ] },
  ],
};

const SOLUTIONS = [
  { n: '01', title: 'Property Listing Portal & Search Engine', desc: 'Custom real estate portal — advanced property search with filters (location, price, bedrooms, property type, amenities), map-based search (Google Maps/Mapbox), saved searches and listing alerts, agent profiles and listings, lead capture forms, neighbourhood data integration, comparable sales data, and mobile-responsive design optimised for property search conversion.' },
  { n: '02', title: 'MLS / IDX Integration Platform', desc: 'Full MLS/IDX integration — RESO Web API and RETS feed integration, real-time property data sync, IDX-compliant search and display pages, map search with MLS boundaries, agent rosters, open house calendar, recently sold listings, and back-office tools for MLS administrators. US MLS systems, UK Rightmove/Zoopla, and AU REI API integrations.', feat: true },
  { n: '03', title: 'Real Estate CRM & Lead Management', desc: 'Real estate specific CRM — lead capture from portal, Zillow, Realtor.com, and social ads; intelligent lead routing to agents by geography, price range, and property type; automated nurture sequences (email + SMS); pipeline management (prospect → viewing → offer → close); agent performance dashboard; and broker management tools with team lead assignment.' },
  { n: '04', title: 'Property Management System (PMS)', desc: 'Residential and commercial PMS — tenant onboarding and lease management, online rent payment (ACH/card), automated late fee calculation, maintenance request portal with photo upload, property inspection app, vacancy tracking, owner statement generation, financial reporting (income/expense), document storage, and tenant portal with self-service lease renewal.' },
  { n: '05', title: 'Virtual Tour & 3D Property Showcase', desc: 'Immersive property viewing platform — 360-degree virtual tour integration (Matterport, Kuula, custom-built), floor plan viewer, photo gallery with deep zoom, video walkthrough hosting, augmented reality furniture placement, remote showing scheduler with agent video call, and embeddable virtual tour widgets for property listing pages.' },
  { n: '06', title: 'Commercial Real Estate (CRE) Platform', desc: 'Commercial real estate deal management — CRE listing platform with LoopNet/CoStar data integration, lease comparables database, deal pipeline and underwriting tools, investor reporting portal, rent roll management, cap rate and NOI calculators, NDA and document sharing, and asset management dashboard for multi-property portfolios.' },
  { n: '07', title: 'PropTech Mobile App', desc: 'iOS and Android PropTech app — property search with map view, push notifications for new listings and price changes, saved favourites, mortgage calculator, agent contact (call/message/chat), neighbourhood insights (school ratings, commute time, crime data), AR property overlay (point camera to see listing info), and mortgage pre-qualification flow.' },
  { n: '08', title: 'Mortgage & Affordability Calculator', desc: 'Advanced mortgage calculator — monthly payment estimator (principal, interest, taxes, insurance), affordability calculator based on income and debts, amortisation schedule, side-by-side loan comparison, first-time buyer stamp duty / closing cost calculator, refinance calculator, and embedded widget for real estate portals and bank websites.' },
  { n: '09', title: 'Agent Marketplace & Commission Platform', desc: 'Agent marketplace platform — agent search and ratings, buyer/seller matching, commission negotiation tools, performance leaderboard, referral fee management, agent review and endorsement system, territory management, leads marketplace (buy/sell), digital business card, open house management, and agent onboarding and verification portal.' },
  { n: '10', title: 'Real Estate Investment & Analytics Platform', desc: 'PropTech investment tools — rental yield calculator, ROI projector, market trend analysis, comparable sales analytics, rental market data, development feasibility calculator, portfolio tracking dashboard, deal pipeline for investors, cap rate database, and data-driven property scoring to identify under-valued opportunities in target markets.' },
];

const TECH_STACK = [
  { group: 'Frontend & Mobile', color: '#7c2d12', items: ['React / Next.js', 'React Native (iOS/Android)', 'TypeScript', 'Mapbox GL JS', 'Google Maps API', 'Progressive Web App'] },
  { group: 'Backend & APIs', color: '#9a3412', items: ['Node.js / NestJS', 'Python / FastAPI', 'REST & GraphQL APIs', 'WebSocket (real-time)', 'RESO Web API', 'RETS / IDX Integration'] },
  { group: 'Property Data & Maps', color: '#c2410c', items: ['MLS / IDX Feed Integration', 'RESO Web API', 'Rightmove / Zoopla API', 'Google Maps / Mapbox', 'Matterport Virtual Tours', 'CoreLogic / Attom Data'] },
  { group: 'Payments & Finance', color: '#b45309', items: ['Stripe (rent payment)', 'ACH / Plaid', 'PayPal / Braintree', 'Mortgage calculator API', 'Currency conversion', 'PCI-DSS compliant'] },
  { group: 'Search & AI', color: '#6d28d9', items: ['Elasticsearch', 'Algolia (property search)', 'Redis (caching)', 'AI-based pricing', 'Recommendation engine', 'Image recognition (property)'] },
  { group: 'Cloud & DevOps', color: '#059669', items: ['AWS / GCP / Azure', 'Kubernetes / EKS', 'Terraform (IaC)', 'GitHub Actions CI/CD', 'CloudFront CDN', 'Multi-region HA'] },
  { group: 'Database & Storage', color: '#0891b2', items: ['PostgreSQL / PostGIS', 'MongoDB (listings)', 'Redis / ElastiCache', 'S3 (media storage)', 'Elasticsearch (search)', 'Snowflake (analytics)'] },
  { group: 'Integrations', color: '#dc2626', items: ['DocuSign / HelloSign', 'Twilio SMS', 'SendGrid email', 'Zapier / Make', 'Salesforce CRM', 'QuickBooks / Xero'] },
];

const ENGAGEMENT = [
  { id: 'portal', name: 'Real Estate Portal Build', badge: 'Most Popular', bc: '#D97706', feat: true, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', headline: 'Custom property portal with MLS/IDX and CRM.', desc: 'Full-cycle development of a real estate portal — property search, MLS/IDX integration, agent CRM, lead management, virtual tours, mortgage calculator, and mobile app. Discovery → architecture → agile sprints → launch.', best: ['Property portals competing with Zillow/Rightmove in a niche or geography', 'Real estate agencies replacing a generic CMS with a purpose-built platform', 'PropTech startups building a Marketplace or listing aggregator', 'Real estate investment platforms needing deal management and analytics'], tl: 'MVP portal live in 10–14 weeks; full platform 5–8 months' },
  { id: 'pms', name: 'Property Management System', badge: 'Growing Fast', bc: '#7c2d12', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', headline: 'Tenant, lease, and rent management platform.', desc: 'Property management system for residential or commercial property managers — tenant portal, online rent payment, lease management, maintenance tickets, inspection app, owner statements, and vacancy tracking.', best: ['Property management companies replacing spreadsheets or dated software', 'Residential landlords with 50+ units needing an end-to-end PMS', 'Commercial property managers needing lease and rent roll management', 'Build-to-rent operators needing a branded tenant app and portal'], tl: 'Core PMS live in 8–12 weeks' },
  { id: 'integration', name: 'MLS/IDX Integration Sprint', badge: 'Fast Delivery', bc: '#0369a1', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', headline: 'MLS data integration for your existing platform.', desc: 'Rapid MLS/IDX integration for real estate portals that already exist — RESO Web API or RETS feed ingestion, real-time property sync, search page rebuild, map integration, and IDX compliance. Fixed-scope delivery.', best: ['Real estate portals needing live MLS data for the first time', 'Agencies using a WordPress site needing proper MLS-connected search', 'PropTech companies extending an existing platform with property data', 'Brokers building an IDX-compliant agent website network'], tl: 'Integration complete in 4–8 weeks' },
];

const TESTIMONIALS = [
  { text: "1Solutions built our real estate portal from scratch — property search, MLS integration, agent CRM, lead routing, and a consumer iOS app. Platform launched in 4 months and we had 800 agent subscribers within 6 months of launch. Their RESO Web API expertise saved us weeks that agencies spending on IDX workarounds. Excellent technical team.", name: 'David K.', role: 'CEO, Regional Real Estate Portal (US)', init: 'DK', bg: '#3d1a0a' },
  { text: "We hired 1Solutions to build our property management system — tenant portal, online rent collection, maintenance ticketing, and owner reporting. What used to take our team 3 days per month in manual reporting now runs automatically. Tenant satisfaction scores went up 40% because of the self-service maintenance portal. World-class PropTech development.", name: 'Sarah M.', role: 'COO, Property Management Company (AU)', init: 'SM', bg: '#5a1a0a', feat: true },
  { text: "1Solutions built the deal management platform for our commercial real estate investment firm — LoopNet/CoStar data integration, cap rate calculators, investor reporting, and document sharing. The underwriting workflow alone saves our analysts 12 hours per deal. We closed a $40M portfolio acquisition using the platform in the second month.", name: 'Robert L.', role: 'Managing Director, CRE Investment Firm (UK)', init: 'RL', bg: '#1e3a5f' },
];

const WHY = [
  { t: '110+ Real Estate Projects', d: '1Solutions has built property portals, MLS platforms, PMS systems, PropTech apps, and CRE tools for real estate companies in the US, UK, Australia, and Canada over 15+ years.' },
  { t: 'MLS/IDX & RESO Specialists', d: 'Deep expertise in US MLS ecosystems (RESO Web API, RETS), UK property feeds (Rightmove, Zoopla), and AU property data (REI API). We know the compliance requirements, data formats, and display rules inside out.' },
  { t: 'GeoSpatial Search at Scale', d: 'PostgreSQL/PostGIS for geo queries, Elasticsearch for full-text property search, Mapbox/Google Maps for interactive map-based search — all tuned for sub-200ms response on large property datasets.' },
  { t: 'Lead Conversion Focus', d: 'Real estate portals succeed or fail on lead conversion. We instrument every funnel stage, A/B test listing page layouts, optimise search-to-enquiry flows, and track lead-to-close conversion in the CRM.' },
  { t: 'Mobile-First PropTech Apps', d: 'React Native apps with real-time listing alerts, AR property overlay, map search, offline favourites, agent contact, and mortgage calculator — built to perform on the devices buyers actually use.' },
  { t: 'DocuSign & eSignature Integration', d: 'Digital document workflows are table stakes in modern real estate. We integrate DocuSign, HelloSign, and Adobe Sign for lease execution, offer submission, and disclosure management.' },
  { t: 'Property Data & Analytics', d: 'CoreLogic, ATTOM, and public records integration for comparable sales data, rental yield analytics, market trend charts, and AI-driven property valuation models — turning raw data into purchase decisions.' },
  { t: 'Post-Launch SLA Support', d: 'Real estate platforms need to stay live during peak market periods. SLA-backed post-launch support with P1 response under 2 hours, proactive monitoring, and automated alerting for data feed failures.' },
];

const FAQS = [
  { q: 'What real estate software does 1Solutions develop?', a: 'Property listing portals, MLS/IDX integration platforms, real estate CRM, property management systems (PMS), virtual tour platforms, mortgage calculators, agent marketplaces, CRE deal management tools, PropTech mobile apps, and rental investment analytics platforms.' },
  { q: 'Can you integrate MLS and IDX feeds?', a: 'Yes — RESO Web API, RETS, and IDX integration is a core capability. US MLS systems, UK Rightmove/Zoopla data feeds, and AU REI API. We build IDX-compliant property search with real-time data sync, map-based search, saved listings, and listing alert emails.' },
  { q: 'How long does it take to build a real estate portal?', a: 'Portal with search, agent profiles, and CRM: 10–14 weeks. Full-featured portal with MLS/IDX, map search, virtual tours, and mobile app: 5–9 months. We phase delivery so the portal goes live and starts generating leads before all features are complete.' },
  { q: 'Do you build property management software?', a: 'Yes — tenant portal, lease management, online rent payment (ACH/card), maintenance ticketing with photo upload, property inspection app, owner financial statements, document storage, and vacancy tracking. Residential and commercial PMS.' },
  { q: 'Can you build a PropTech mobile app?', a: 'Yes — React Native iOS and Android apps with property map search, push listing alerts, saved favourites, agent contact, AR property overlay (camera view), mortgage calculator, and offline access to favourites and open house schedules.' },
  { q: 'Do you integrate virtual tour platforms like Matterport?', a: 'Yes — Matterport 3D virtual tour embedding, Kuula 360-degree photo integration, floor plan viewer, deep-zoom photo gallery, video walkthrough hosting, and remote showing scheduler with embedded video call. Custom virtual tour players are also available.' },
  { q: 'What technology stack do you use for real estate platforms?', a: 'Frontend: React/Next.js (portal), React Native (app). Backend: Node.js or Python. Database: PostgreSQL with PostGIS for geo queries; Elasticsearch for property search. Maps: Google Maps or Mapbox. Storage: AWS S3 for media. Cloud: AWS or GCP. Payments: Stripe or Plaid for ACH.' },
  { q: 'Can you modernise a legacy real estate platform?', a: 'Yes — we modernise legacy portals and PMS platforms using an incremental approach: API-first redesign, mobile responsiveness upgrade, MLS data pipeline modernisation, payment stack upgrade, and cloud migration. First modernised capability typically live in 6–8 weeks.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => { if (!start) return; const n = parseInt(target.replace(/\D/g, ''), 10); if (!n) return; let t0 = null; const s = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) requestAnimationFrame(s); }; requestAnimationFrame(s); }, [start, target, duration]);
  return count;
}
function StatItem({ label, val, started }) {
  const n = useCountUp(val, 1800, started);
  const sfx = val.replace(/[\d,]/g, '');
  return (<div className="re-sc"><div className="re-sv">{started ? n + sfx : val}</div><div className="re-sl">{label}</div></div>);
}

export default function RealEstateSoftware() {
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
  const ac = '#7c2d12'; const txt = '#3d1a0a'; const txt2 = '#5c2a1a';
  return (
    <>
      <Head>
        <title>Real Estate Software Development | Property Portal, MLS/IDX, PMS | 1Solutions</title>
        <meta name="description" content="Custom real estate software development — property listing portals, MLS/IDX integration, real estate CRM, property management systems, PropTech mobile apps, virtual tours, and CRE platforms. 110+ real estate projects. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/real-estate-software-development/" />
        <meta property="og:title" content="Real Estate Software Development | 1Solutions" />
        <meta property="og:description" content="Property portals, MLS/IDX integration, PMS, PropTech apps, and CRE platforms. 110+ real estate projects." />
        <meta property="og:url" content="https://www.1solutions.biz/real-estate-software-development/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .re-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#fdf6f0 0%,#fef3e2 20%,#fdf4ee 50%,#f0f9e8 75%,#e8f4f8 100%);color:${txt};line-height:1.6;position:relative;overflow-x:hidden}
          .re-page *,.re-page *::before,.re-page *::after{box-sizing:border-box}
          .re-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .re-o1{width:800px;height:800px;background:radial-gradient(circle,rgba(124,45,18,.16) 0%,transparent 70%);top:-220px;right:-200px}
          .re-o2{width:700px;height:700px;background:radial-gradient(circle,rgba(180,83,9,.13) 0%,transparent 70%);bottom:0;left:-200px}
          .re-o3{width:480px;height:480px;background:radial-gradient(circle,rgba(5,150,105,.08) 0%,transparent 70%);top:42%;left:-90px}
          .re-bc{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .re-bc ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:${ac}}
          .re-bc li{display:flex;align-items:center;gap:6px}.re-bc li::after{content:'/';opacity:.45}.re-bc li:last-child::after{display:none}
          .re-bc a{color:${txt};text-decoration:none}
          .re-hero{position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto;padding:44px 40px 28px}
          .re-ey{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${ac};margin-bottom:14px}
          .re-hero h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,${txt} 0%,${ac} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .re-desc{font-size:16px;color:${txt2};line-height:1.65;max-width:720px;margin:0 auto 22px}
          .re-tr{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin-bottom:24px}
          .re-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:5px 13px;font-size:12px;font-weight:600;color:${txt};box-shadow:0 2px 8px rgba(124,45,18,.07)}
          .re-dot{width:7px;height:7px;border-radius:50%;background:${ac};flex-shrink:0}
          .re-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .re-p{display:inline-block;padding:13px 34px;background:${ac};color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(124,45,18,.28)}
          .re-p:hover{background:${txt};transform:translateY(-2px)}
          .re-g{display:inline-block;padding:13px 34px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:${txt};font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .re-g:hover{background:rgba(255,255,255,.85);border-color:rgba(124,45,18,.5);transform:translateY(-2px)}
          .re-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:920px;margin:26px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(124,45,18,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .re-sc{padding:18px 16px;text-align:center;border-right:1px solid rgba(124,45,18,.10)}.re-sc:last-child{border-right:none}
          .re-sv{font-size:28px;font-weight:900;color:${ac};letter-spacing:-.5px;line-height:1}
          .re-sl{font-size:11px;color:${txt2};font-weight:500;margin-top:5px}
          .re-sec{padding:72px 40px;position:relative;z-index:1}
          .re-sec-alt{background:rgba(253,244,238,.55);border-top:1px solid rgba(124,45,18,.08);border-bottom:1px solid rgba(124,45,18,.08)}
          .re-in{max-width:1300px;margin:0 auto}
          .re-sey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .re-sh{font-size:44px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,#c2410c 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .re-sd{font-size:15px;color:${txt2};line-height:1.7;max-width:700px}
          .re-rv{opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .re-rv.re-ok{opacity:1;transform:translateY(0)}
          .re-sk-g{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
          .re-card{background:linear-gradient(135deg,rgba(253,244,238,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,230,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(124,45,18,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1),border-color .2s}
          .re-card.re-cv{opacity:1;transform:translateY(0)}.re-card.re-cv:hover{transform:translateY(-5px);border-color:rgba(124,45,18,.25);box-shadow:0 14px 40px rgba(124,45,18,.12)}
          .re-card.feat{border-color:rgba(124,45,18,.18)}
          .re-cn{position:absolute;top:6px;right:12px;font-size:68px;font-weight:900;line-height:1;color:${ac};opacity:.05;pointer-events:none;user-select:none}
          .re-card h3{font-size:15px;font-weight:700;color:${txt};margin:0 0 7px;position:relative;z-index:1}
          .re-card p{font-size:13px;color:${txt2};line-height:1.65;margin:0;position:relative;z-index:1}
          .re-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,${ac},#c2410c);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top;transition:transform .3s}
          .re-card.re-cv:hover::before{transform:scaleY(1)}
          .re-sm{text-align:center;margin-top:20px}
          .re-bm{display:inline-block;background:#fff;border:1.5px solid rgba(124,45,18,.18);color:${txt};padding:9px 28px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .re-bm:hover{background:${ac};border-color:${ac};color:#fff;transform:translateY(-2px)}
          .re-tec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
          .re-tc2{background:linear-gradient(135deg,rgba(253,244,238,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,230,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:20px 18px;box-shadow:0 4px 24px rgba(124,45,18,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .re-tc2.re-sv2{opacity:1;transform:translateY(0)}.re-tc2.re-sv2:hover{border-color:rgba(124,45,18,.22);box-shadow:0 12px 36px rgba(124,45,18,.10)}
          .re-tg{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:10px;padding-bottom:7px;border-bottom:2px solid}
          .re-pills{display:flex;flex-wrap:wrap;gap:5px}
          .re-pill{display:inline-block;font-size:11px;font-weight:500;padding:3px 9px;border-radius:100px;border:1px solid}
          .re-en-g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
          .re-en{background:linear-gradient(135deg,rgba(253,244,238,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,230,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(124,45,18,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1),border-color .2s}
          .re-en.re-ev{opacity:1;transform:translateY(0)}.re-en.re-ev:hover{border-color:rgba(124,45,18,.22);box-shadow:0 14px 44px rgba(124,45,18,.12)}
          .re-en.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(253,244,238,.45) 100%);border-color:rgba(217,119,6,.26);transform:translateY(-6px)}
          .re-en.feat.re-ev{transform:translateY(-6px)}.re-en.feat.re-ev:hover{transform:translateY(-10px)}
          .re-en-b{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:4px 11px;border-radius:100px;border:1px solid;margin-bottom:16px}
          .re-en-i{width:44px;height:44px;background:rgba(124,45,18,.08);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
          .re-en.feat .re-en-i{background:rgba(217,119,6,.10)}
          .re-en-n{font-size:20px;font-weight:900;color:${txt};margin:0 0 5px;letter-spacing:-.3px}
          .re-en-h{font-size:13px;font-weight:600;color:${ac};margin-bottom:10px}
          .re-en.feat .re-en-h{color:#D97706}
          .re-en-d{font-size:13px;color:${txt2};line-height:1.7;margin-bottom:14px}
          .re-en-ll{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${ac};margin-bottom:7px}
          .re-en-li{list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:6px}
          .re-en-li li{display:flex;align-items:flex-start;gap:7px;font-size:13px;color:#374151;line-height:1.5}
          .re-en-li li::before{content:'✓';font-weight:800;color:${ac};flex-shrink:0;margin-top:1px}
          .re-en.feat .re-en-li li::before{color:#D97706}
          .re-en-tl{font-size:11px;font-weight:600;color:#D97706;display:block;padding-top:10px;border-top:1px solid rgba(124,45,18,.08)}
          .re-en-a{display:block;margin-top:14px;padding:10px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(124,45,18,.09);color:${txt};border:1.5px solid rgba(124,45,18,.18)}
          .re-en-a:hover{background:${txt};color:#fff}
          .re-en.feat .re-en-a{background:${ac};color:#fff;border-color:${ac}}
          .re-en.feat .re-en-a:hover{background:${txt};border-color:${txt}}
          .re-tg2{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px}
          .re-tc{background:linear-gradient(135deg,rgba(253,244,238,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,230,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:26px 22px;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 24px rgba(124,45,18,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
          .re-tc.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(253,244,238,.42) 100%);border-color:rgba(217,119,6,.20)}
          .re-tc.re-tv{opacity:1;transform:translateY(0)}.re-tc.re-tv:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(124,45,18,.12)}
          .re-stars{font-size:15px;color:#D97706;letter-spacing:2px}
          .re-ttxt{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .re-au{display:flex;align-items:center;gap:11px}
          .re-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .re-an{font-size:14px;font-weight:700;color:${txt}}
          .re-ar{font-size:12px;color:#6b7280}
          .re-wy-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:44px}
          .re-wc{background:linear-gradient(135deg,rgba(253,244,238,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,230,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:22px 18px;box-shadow:0 4px 24px rgba(124,45,18,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px) scale(.97);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .re-wc.re-wv{opacity:1;transform:translateY(0) scale(1)}.re-wc.re-wv:hover{transform:translateY(-4px) scale(1);border-color:rgba(124,45,18,.22);box-shadow:0 12px 36px rgba(124,45,18,.10)}
          .re-wd{width:9px;height:9px;border-radius:50%;background:${ac};margin-bottom:10px}
          .re-wc h3{font-size:13px;font-weight:700;color:${txt};margin:0 0 7px;line-height:1.35}
          .re-wc p{font-size:12px;color:${txt2};line-height:1.6;margin:0}
          .re-ct{padding:64px 40px;background:linear-gradient(135deg,rgba(253,244,238,.55) 0%,rgba(255,255,255,.60) 40%,rgba(240,249,230,.50) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .re-ct-g{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.1fr;gap:28px;align-items:start}
          .re-cth{font-size:38px;font-weight:900;line-height:1.18;margin:0 0 12px;background:linear-gradient(90deg,${txt} 0%,${ac} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .re-ctd{font-size:14px;color:${txt2};line-height:1.6;margin:0 0 18px}
          .re-ben{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:12px}
          .re-be{display:flex;gap:9px;align-items:flex-start}
          .re-bi{flex-shrink:0;color:${ac};font-weight:800;font-size:15px;margin-top:1px}
          .re-be p{font-size:13px;color:${txt2};margin:0;line-height:1.5}
          .re-fb{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(253,244,238,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:18px;padding:30px;box-shadow:0 8px 40px rgba(124,45,18,.08),inset 0 1px 0 rgba(255,255,255,1)}
          .re-fb h3{font-size:20px;font-weight:700;color:${txt};margin:0 0 20px}
          .re-form{display:flex;flex-direction:column;gap:12px}
          .re-fr{display:grid;grid-template-columns:1fr 1fr;gap:11px}
          .re-fg{display:flex;flex-direction:column;gap:4px}
          .re-fg.full{grid-column:1/-1}
          .re-fg label{font-size:12px;font-weight:500;color:${txt}}
          .re-fg input,.re-fg textarea,.re-fg select{padding:10px 12px;border:1px solid rgba(124,45,18,.14);border-radius:6px;font-size:13px;font-family:inherit;color:${txt};background:rgba(255,255,255,.55);transition:border-color .2s}
          .re-fg input:focus,.re-fg textarea:focus,.re-fg select:focus{outline:none;border-color:${ac};box-shadow:0 0 0 3px rgba(124,45,18,.10)}
          .re-co{display:flex;gap:8px;align-items:flex-start}
          .re-co input{margin-top:3px;width:14px;height:14px}
          .re-co label{font-size:11px;color:${txt2};line-height:1.5}.re-co a{color:${txt}}
          .re-sub{width:100%;padding:13px;background:${ac};border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(124,45,18,.25)}
          .re-sub:hover{background:${txt};transform:translateY(-2px)}
          .re-fq{padding:72px 40px;background:rgba(253,244,238,.55);border-top:1px solid rgba(124,45,18,.08);position:relative;z-index:1}
          .re-fq h2{font-size:42px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,#c2410c 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .re-fq-sub{font-size:15px;color:${txt2};margin:0 0 32px}
          .re-fql{display:flex;flex-direction:column;gap:9px}
          .re-fi{background:linear-gradient(135deg,rgba(253,244,238,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,230,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(124,45,18,.05);transition:border-color .2s}
          .re-fi.open{border-color:rgba(124,45,18,.28)}.re-fi.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,${ac},#c2410c);border-radius:3px 3px 0 0}
          .re-fqb{width:100%;background:none;border:none;padding:18px 18px 18px 52px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:12px;font-family:inherit;position:relative}
          .re-fqn{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:rgba(124,45,18,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:5px}
          .re-fi.open .re-fqn{background:${ac};color:#fff}
          .re-fqb span{font-size:14px;font-weight:600;color:${txt};line-height:1.4}.re-fi.open .re-fqb span{color:${ac}}
          .re-fch{width:20px;height:20px;flex-shrink:0;color:#9ca3af;transition:transform .3s}.re-fi.open .re-fch{transform:rotate(180deg);color:${ac}}
          .re-faw{overflow:hidden;transition:max-height .35s ease;max-height:0}.re-fi.open .re-faw{max-height:400px}
          .re-fa{padding:0 18px 18px 52px;font-size:14px;color:#4b5563;line-height:1.8}
          .re-rel{padding:64px 40px;background:rgba(253,244,238,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .re-ri{max-width:1300px;margin:0 auto;text-align:center}
          .re-ri h2{font-size:30px;font-weight:900;background:linear-gradient(90deg,${txt} 0%,#c2410c 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 10px}
          .re-ri hr{border:none;border-top:1px solid rgba(124,45,18,.10);margin:24px 0}
          .re-rts{display:flex;flex-wrap:wrap;justify-content:center;gap:9px}
          .re-rt{display:inline-block;padding:9px 18px;border:1.5px solid;border-radius:50px;font-size:13px;font-weight:500;text-decoration:none;transition:all .22s}
          .re-rt:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.08)}
          .re-ra{background:rgba(124,45,18,.09);border-color:rgba(124,45,18,.28);color:#7c2d12}
          .re-rb{background:rgba(12,74,110,.09);border-color:rgba(12,74,110,.28);color:#0c4a6e}
          .re-rc{background:rgba(22,101,52,.09);border-color:rgba(22,101,52,.28);color:#14532d}
          .re-rd{background:rgba(146,64,14,.09);border-color:rgba(146,64,14,.28);color:#92400e}
          @media(max-width:1024px){.re-hero h1,.re-sh,.re-fq h2{font-size:34px}.re-sk-g{grid-template-columns:repeat(2,1fr)}.re-tec-g{grid-template-columns:repeat(2,1fr)}.re-en-g{grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto}.re-en.feat{transform:none}.re-en.feat.re-ev{transform:none}.re-en.feat.re-ev:hover{transform:translateY(-4px)}.re-wy-g{grid-template-columns:repeat(2,1fr)}.re-tg2{grid-template-columns:1fr}.re-ct-g{grid-template-columns:1fr}}
          @media(max-width:768px){.re-bc,.re-hero,.re-sec,.re-ct,.re-fq,.re-rel{padding-left:20px;padding-right:20px}.re-hero{padding-top:28px;padding-bottom:16px}.re-hero h1{font-size:26px}.re-stats{grid-template-columns:1fr 1fr}.re-sc:nth-child(2){border-right:none}.re-sc:nth-child(3),.re-sc:nth-child(4){border-top:1px solid rgba(124,45,18,.10)}.re-sc:nth-child(4){border-right:none}.re-sk-g,.re-tec-g,.re-wy-g{grid-template-columns:1fr}.re-fr{grid-template-columns:1fr}.re-cth{font-size:26px}}
        `}</style>
      </Head>
      <div className="re-page">
        <div className="re-orb re-o1" /><div className="re-orb re-o2" /><div className="re-orb re-o3" />
        <nav className="re-bc" aria-label="Breadcrumb"><ol itemScope itemType="https://schema.org/BreadcrumbList"><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li><li><span>Industries</span></li><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">Real Estate Software</span><meta itemProp="position" content="3" /></li></ol></nav>
        <section className="re-hero">
          <span className="re-ey">Real Estate Industry</span>
          <h1>Real Estate Software Development — Property Portals, MLS/IDX & PropTech Apps</h1>
          <p className="re-desc">Custom PropTech for property portals, real estate agencies, PMS providers, and CRE firms — MLS/IDX integration, property search engines, real estate CRM, property management systems, virtual tours, and mobile apps. 110+ real estate projects. 15+ years.</p>
          <div className="re-tr">{['Property Listing Portal','MLS / IDX Integration','Real Estate CRM','Property Management (PMS)','PropTech Mobile Apps'].map(b => (<div className="re-badge" key={b}><span className="re-dot" />{b}</div>))}</div>
          <div className="re-ctas"><Link href="#contact" className="re-p">Discuss Your Real Estate Platform</Link><Link href="#solutions" className="re-g">View Solutions →</Link></div>
        </section>
        <div className="re-stats" ref={stR}>{[['110+','Real Estate Projects'],['15+','Years Dev Experience'],['99.9%','Platform Uptime SLA'],['35%','Avg Lead Conversion Lift']].map(([v, l]) => <StatItem key={l} label={l} val={v} started={ss} />)}</div>
        <section id="solutions" className="re-sec"><div className="re-in"><div className={`re-rv${vis.has('sk') ? ' re-ok' : ''}`} ref={el => { secR.current['sk'] = el; }}><span className="re-sey">PropTech Solutions</span><h2 className="re-sh">What We Build for Real Estate</h2><p className="re-sd">Property portals, MLS/IDX integration, CRM, PMS, virtual tours, CRE deal management, PropTech mobile apps, mortgage calculators, and investment analytics.</p></div><div className="re-sk-g" ref={skR}>{visS.map((s, i) => (<div key={s.n} className={`re-card${s.feat ? ' feat' : ''}${vSk.includes(i) ? ' re-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="re-cn">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}</div>{SOLUTIONS.length > 6 && <div className="re-sm"><button className="re-bm" onClick={() => setShowAll(p => !p)}>{showAll ? 'Show fewer ↑' : `Show all ${SOLUTIONS.length} solutions ↓`}</button></div>}</div></section>
        <section className="re-sec re-sec-alt"><div className="re-in"><div className={`re-rv${vis.has('stk') ? ' re-ok' : ''}`} ref={el => { secR.current['stk'] = el; }}><span className="re-sey">Technology Stack</span><h2 className="re-sh">Real Estate Technology We Work With</h2><p className="re-sd">React/Next.js, PostgreSQL/PostGIS, Elasticsearch, MLS/RESO APIs, Mapbox, Stripe ACH, AWS, and the modern PropTech integration ecosystem.</p></div><div className="re-tec-g" ref={stGr}>{TECH_STACK.map((g, i) => (<div key={g.group} className={`re-tc2${vSt.includes(i) ? ' re-sv2' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="re-tg" style={{ color: g.color, borderBottomColor: g.color + '33' }}>{g.group}</div><div className="re-pills">{g.items.map(it => <span key={it} className="re-pill" style={{ color: g.color, background: g.color + '12', borderColor: g.color + '30' }}>{it}</span>)}</div></div>))}</div></div></section>
        <section className="re-sec"><div className="re-in"><div className={`re-rv${vis.has('eng') ? ' re-ok' : ''}`} ref={el => { secR.current['eng'] = el; }}><span className="re-sey">Engagement Models</span><h2 className="re-sh">How We Work with Real Estate Companies</h2><p className="re-sd">Custom portal build, property management system, or MLS/IDX integration sprint — structured for your budget and timeline.</p></div><div className="re-en-g" ref={enR}>{ENGAGEMENT.map((m, i) => (<div key={m.id} className={`re-en${m.feat ? ' feat' : ''}${vEn.includes(i) ? ' re-ev' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><span className="re-en-b" style={{ color: m.bc, borderColor: m.bc + '44', background: m.bc + '14' }}>{m.badge}</span><div className="re-en-i"><svg viewBox="0 0 24 24" width="24" height="24" fill={m.feat ? '#D97706' : ac}><path d={m.icon} /></svg></div><div className="re-en-n">{m.name}</div><div className="re-en-h">{m.headline}</div><div className="re-en-d">{m.desc}</div><div className="re-en-ll">Best for</div><ul className="re-en-li">{m.best.map(b => <li key={b}>{b}</li>)}</ul><span className="re-en-tl">{m.tl}</span><Link href="#contact" className="re-en-a">Get a free estimate →</Link></div>))}</div></div></section>
        <section className="re-sec re-sec-alt"><div className="re-in"><div className={`re-rv${vis.has('ts') ? ' re-ok' : ''}`} ref={el => { secR.current['ts'] = el; }}><span className="re-sey">Client Outcomes</span><h2 className="re-sh">Real Estate Technology Clients</h2><p className="re-sd">Property portals, PMS providers, and CRE firms on building real estate technology with 1Solutions.</p></div><div className="re-tg2" ref={teR}>{TESTIMONIALS.map((t, i) => (<div key={i} className={`re-tc${t.feat ? ' feat' : ''}${vTe.includes(i) ? ' re-tv' : ''}`} style={{ transitionDelay: `${i * 90}ms` }} itemScope itemType="https://schema.org/Review"><div className="re-stars">★★★★★</div><p className="re-ttxt" itemProp="reviewBody">{t.text}</p><div className="re-au"><div className="re-av" style={{ background: t.bg }}>{t.init}</div><div><div className="re-an" itemProp="author">{t.name}</div><div className="re-ar">{t.role}</div></div></div></div>))}</div></div></section>
        <section className="re-sec"><div className="re-in"><div className={`re-rv${vis.has('wy') ? ' re-ok' : ''}`} ref={el => { secR.current['wy'] = el; }}><span className="re-sey">Why 1Solutions</span><h2 className="re-sh">Why Real Estate Companies Choose 1Solutions</h2><p className="re-sd">MLS/IDX specialists, geospatial search expertise, lead conversion focus, mobile-first PropTech, DocuSign integration, and 24/7 SLA support.</p></div><div className="re-wy-g" ref={whR}>{WHY.map((c, i) => (<div key={i} className={`re-wc${vWh.includes(i) ? ' re-wv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="re-wd" /><h3>{c.t}</h3><p>{c.d}</p></div>))}</div></div></section>
        <section id="contact" className="re-ct"><div className="re-ct-g"><div><h2 className="re-cth">Build Your Real Estate Platform</h2><p className="re-ctd">Share your PropTech requirements — portal, MLS integration, PMS, or CRE platform — and we will respond within 24 hours with a proposal, timeline, and team composition.</p><div className="re-ben">{[['✓','Technical proposal within 24–48 hours'],['✓','MLS/IDX and RESO Web API specialists on every project'],['✓','NDA signed before any technical discussions'],['✓','110+ real estate projects — portals, PMS, PropTech apps'],['✓','Mobile-first, geospatial-optimised, SLA-backed delivery']].map(([ic, tx]) => (<div className="re-be" key={tx}><span className="re-bi">{ic}</span><p>{tx}</p></div>))}</div></div>
        <div className="re-fb"><h3>Tell Us About Your Real Estate Project</h3><form className="re-form" onSubmit={e => e.preventDefault()}><div className="re-fr"><div className="re-fg"><label>Full Name *</label><input type="text" placeholder="Your name" required /></div><div className="re-fg"><label>Work Email *</label><input type="email" placeholder="you@company.com" required /></div></div><div className="re-fr"><div className="re-fg"><label>Company</label><input type="text" placeholder="Your company" /></div><div className="re-fg"><label>Phone / WhatsApp</label><input type="tel" placeholder="+1 555 000 0000" /></div></div><div className="re-fg full"><label>Type of Real Estate Platform *</label><select required><option value="">Select...</option><option>Property Listing Portal</option><option>MLS / IDX Integration</option><option>Real Estate CRM</option><option>Property Management System (PMS)</option><option>Commercial Real Estate Platform</option><option>PropTech Mobile App</option><option>Virtual Tour Platform</option><option>Mortgage Calculator / Affordability Tool</option><option>Other</option></select></div><div className="re-fg full"><label>Project Description *</label><textarea rows={4} placeholder="Describe your real estate software project — type of platform, current system (if any), key features needed, target markets, and timeline..." required /></div><div className="re-co"><input type="checkbox" required /><label>I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label></div><button type="submit" className="re-sub">Get a PropTech Proposal →</button></form></div></div></section>
        <section className="re-fq"><div className="re-in" style={{ maxWidth: 840 }}><span className="re-sey">FAQ</span><h2>Real Estate Software — FAQ</h2><p className="re-fq-sub">Property portals, MLS/IDX integration, PMS, PropTech mobile apps, tech stack, virtual tours, and CRE platforms.</p><div className="re-fql">{FAQS.map((f, i) => (<div key={i} className={`re-fi${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="re-fqb" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="re-fqn">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{f.q}</span><svg className="re-fch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="re-faw"><div className="re-fa" itemProp="text">{f.a}</div></div></div>))}</div></div></section>
        <section className="re-rel"><div className="re-ri"><span className="re-sey">Related Services</span><h2>Related Industry & Technology Services</h2><hr /><div className="re-rts">{[['/travel-and-tourism-software-solutions/','Travel & Tourism','re-rb'],['/retail-ecommerce-software-development/','Retail & eCommerce','re-ra'],['/fintech-software-development-company/','FinTech Software','re-rb'],['/manufacturing-software-development-services/','Manufacturing Software','re-rc'],['/logistics-software-development-services/','Logistics Software','re-rc'],['/it-outsourcing-services/','IT Outsourcing','re-rd'],['/offshore-development-company/','Offshore Development','re-ra'],['/mobile-app-development/','Mobile Apps','re-rd']].map(([hr, lb, cl]) => (<Link key={hr} href={hr} className={`re-rt ${cl}`}>{lb}</Link>))}</div></div></section>
      </div>
    </>
  );
}
