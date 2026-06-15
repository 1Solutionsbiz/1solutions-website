'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.1solutions.biz/#industries' }, { '@type': 'ListItem', position: 3, name: 'Entertainment Software', item: 'https://www.1solutions.biz/entertainment-software-development/' }] },
    { '@type': 'Service', name: 'Entertainment Software Development', url: 'https://www.1solutions.biz/entertainment-software-development/', description: '1Solutions builds custom entertainment and media software — OTT streaming platforms, media asset management, music streaming apps, gaming platforms, content recommendation engines, digital ticketing, fan engagement apps, and broadcasting tech. 15+ years, 70+ media projects.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '61', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What entertainment software does 1Solutions build?', acceptedAnswer: { '@type': 'Answer', text: '1Solutions builds OTT video streaming platforms, media asset management systems, music and podcast streaming apps, gaming platforms and portals, content recommendation engines (AI/ML), digital ticketing and event management, fan engagement and community apps, broadcasting and live streaming tools, rights and royalty management, and media analytics dashboards.' } },
      { '@type': 'Question', name: 'Can you build a Netflix-style OTT streaming platform?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — 1Solutions builds OTT streaming platforms with adaptive bitrate video delivery (HLS/DASH), CDN integration, multi-DRM content protection (Widevine, PlayReady, FairPlay), subscription and pay-per-view billing, multi-device apps (web, iOS, Android, Smart TV, Roku, Fire TV), content CMS and ingest pipeline, personalised recommendations, and real-time analytics dashboard.' } },
    ] },
  ],
};

const SOLUTIONS = [
  { n: '01', title: 'OTT Video Streaming Platform', desc: 'End-to-end OTT platform — video ingest and transcoding pipeline (FFmpeg, AWS Elemental), adaptive bitrate delivery (HLS/DASH), CDN integration (CloudFront, Akamai), multi-DRM (Widevine, PlayReady, FairPlay), subscription/PPV/TVOD billing, smart TV and Roku apps, offline downloads, continue-watching, watchlist, and real-time viewer analytics.', feat: true },
  { n: '02', title: 'Music & Podcast Streaming Platform', desc: 'Spotify/Apple Music-style audio streaming — audio ingest and encoding, adaptive audio streaming, royalty calculation engine, artist and label CMS, playlist management, curated and algorithmic playlist generation, podcast hosting and RSS feeds, social sharing, offline playback, cross-platform SDK (web, iOS, Android), and label/distributor rights management.' },
  { n: '03', title: 'Media Asset Management (MAM)', desc: 'Centralised digital asset management for media companies — video/audio/image ingest and cataloguing, metadata tagging (manual and AI-automated), format conversion and proxy generation, content search and retrieval, rights and licence tracking, multi-user access control, integration with Avid, Adobe Premiere and editing workflows, and CDN publishing automation.' },
  { n: '04', title: 'Content Recommendation Engine', desc: 'AI-powered personalisation — collaborative filtering and content-based recommendation models, real-time user behaviour signals (watch time, skips, ratings, searches), contextual recommendations (time-of-day, device, location), editorial override capability, A/B testing framework, cold-start handling for new users, and uplift tracking dashboards.', feat: true },
  { n: '05', title: 'Gaming Platform & Portal', desc: 'Gaming web portal and platform — game catalogue management, user account and profile system, leaderboards and achievement badges, in-app purchase and wallet, multiplayer lobby and matchmaking API integration, game analytics dashboard, developer API for indie game publishers, social features (friends list, share scores), and age-gating compliance.' },
  { n: '06', title: 'Digital Ticketing & Event Management', desc: 'End-to-end digital ticketing — event creation and seat map management, dynamic pricing and early-bird tiers, barcode/QR ticket generation, mobile wallet integration (Apple Wallet, Google Wallet), fraud prevention (ticket transfer restrictions, unique barcode per entry), gate scanner app, post-event analytics, and fan CRM integration.' },
  { n: '07', title: 'Live Streaming & Broadcasting Platform', desc: 'Live streaming technology — RTMP/SRT ingest, cloud transcoding for multi-bitrate delivery, DVR and catch-up TV, live chat and audience interaction (polls, Q&A), tipping and virtual gifting, broadcast-quality latency targets (<3s), multi-CDN failover, concurrent viewer monitoring, and branded OBS plugin for content creators.' },
  { n: '08', title: 'Fan Engagement & Community App', desc: 'Fan community platform — profile and following system, exclusive content feed, fan challenges and UGC campaigns, live Q&A and polls, virtual meet-and-greet scheduler, NFT-based fan collectibles, branded fan token marketplace, push notifications, gamification (points, badges, fan tier levels), and integration with social platforms and CRM.' },
  { n: '09', title: 'Rights & Royalty Management System', desc: 'Rights intelligence platform — rights ownership database, territory and medium licencing tracking, royalty calculation engine (mechanical, performance, sync, streaming), statement generation and partner portal, DDEX and CWR ingestion, dispute management workflow, rights clearance for samples, and integration with music PROs (ASCAP, BMI, APRA, PRS).' },
  { n: '10', title: 'Media Analytics & Audience Intelligence', desc: 'Audience and content performance analytics — streaming analytics (plays, completions, drop-off curves, buffering events), audience segmentation (age, location, device, genre preferences), content ROI dashboards, subscriber churn prediction, cohort retention analysis, ad revenue attribution, and integration with Chartbeat, Comscore, and Nielsen.' },
];

const TECH_STACK = [
  { group: 'Video & Streaming', color: '#2d1b69', items: ['HLS / MPEG-DASH', 'FFmpeg / AWS Elemental', 'CloudFront / Akamai CDN', 'Widevine / FairPlay DRM', 'Video.js / Shaka Player', 'Mux Video API'] },
  { group: 'Frontend & Mobile', color: '#5b21b6', items: ['React / Next.js', 'React Native', 'tvOS / Android TV', 'Roku / Fire TV', 'TypeScript', 'WebRTC (live)'] },
  { group: 'Backend & APIs', color: '#4338ca', items: ['Node.js / NestJS', 'Python / Django', 'GraphQL / REST', 'WebSocket (live chat)', 'Redis Pub/Sub', 'Kafka (event stream)'] },
  { group: 'AI & Recommendations', color: '#7c3aed', items: ['TensorFlow / PyTorch', 'Collaborative filtering', 'Content-based models', 'Pinecone / Weaviate', 'A/B experimentation', 'Real-time personalisation'] },
  { group: 'Auth & Payments', color: '#9333ea', items: ['Auth0 / Firebase Auth', 'Stripe / Braintree', 'Subscription billing', 'Apple / Google Pay', 'Recurly / Chargebee', 'PCI-DSS compliance'] },
  { group: 'Music & Audio', color: '#a21caf', items: ['DDEX / CWR ingest', 'Royalty calc engine', 'Podcast RSS / Apple', 'Liquidsoap (radio)', 'Audio fingerprinting', 'PRO integrations'] },
  { group: 'Cloud & DevOps', color: '#dc2626', items: ['AWS / GCP / Azure', 'Kubernetes / ECS', 'Terraform (IaC)', 'GitHub Actions CI/CD', 'CloudFront / multi-CDN', 'Auto-scaling (load)'] },
  { group: 'Analytics & Data', color: '#b45309', items: ['Snowflake / BigQuery', 'dbt / Fivetran', 'Amplitude / Mixpanel', 'Looker / Metabase', 'Segment CDP', 'Real-time dashboards'] },
];

const ENGAGEMENT = [
  { id: 'ott', name: 'OTT / Streaming Platform', badge: 'Most Popular', bc: '#D97706', feat: true, icon: 'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', headline: 'Full OTT stack from ingest to audience analytics.', desc: 'End-to-end OTT or media platform development — video/audio ingest pipeline, DRM, CDN, multi-device apps (web, iOS, Android, Smart TV), billing, recommendation engine, and analytics. Delivered in agile sprints.', best: ['Media companies launching an OTT challenger to broadcast', 'Broadcasters adding a direct-to-consumer digital subscription', 'Sports rights holders building a dedicated streaming app', 'Studios launching a SVOD/AVOD platform globally'], tl: 'MVP streaming platform in 12–16 weeks; full launch 6–9 months' },
  { id: 'feature', name: 'Feature / Integration Build', badge: 'Fast Delivery', bc: '#2d1b69', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4', headline: 'Add recommendation engine, DRM, or billing fast.', desc: 'Targeted feature delivery for existing entertainment platforms — content recommendation engine, DRM integration, subscription billing, live chat, ticketing module, royalty engine, or media analytics dashboard bolted into your current system.', best: ['Streaming platforms needing AI-powered personalisation added', 'Music platforms integrating DDEX and royalty calculations', 'Event companies adding digital ticketing to their website', 'Media companies adding live streaming to an existing VOD platform'], tl: 'First feature shipped in 4–8 weeks' },
  { id: 'scale', name: 'Performance & Scale Audit', badge: 'For Growing Platforms', bc: '#a21caf', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', headline: 'Make your platform handle 10x the load.', desc: 'Architecture review and re-engineering for entertainment platforms hitting scale bottlenecks — CDN strategy, video origin optimisation, database query tuning, real-time event pipeline scaling, and load testing to production-equivalent levels.', best: ['OTT platforms ahead of a major content launch or live event', 'Ticketing platforms ahead of a high-demand on-sale event', 'Music platforms before a major artist release drop', 'Gaming portals expecting viral traffic spikes'], tl: 'Audit and plan in 2 weeks; fixes in 4–6 weeks' },
];

const TESTIMONIALS = [
  { text: "1Solutions built our OTT streaming platform from scratch — video ingest, adaptive bitrate HLS, Widevine DRM, web and mobile apps, subscription billing, and a recommendation engine. We went from concept to 50,000 paying subscribers in 14 months. The recommendation engine alone increased average session length by 38%. Exceptional media tech team.", name: 'Rachel M.', role: 'CTO, Independent Streaming Platform (UK)', init: 'RM', bg: '#1a0d40' },
  { text: "We commissioned 1Solutions to build our digital ticketing platform for live music venues. Seat map management, dynamic pricing, QR ticket generation, Apple Wallet integration, gate scanner app — all delivered on time for our busiest season. Zero downtime on 14 sell-out events. The fraud prevention features reduced counterfeit tickets by 94%.", name: 'Daniel F.', role: 'CEO, Live Music Ticketing Company (AU)', init: 'DF', bg: '#2d1040', feat: true },
  { text: "1Solutions built our music royalty management system to replace an error-prone spreadsheet process. DDEX ingest, royalty calculation for 1.2M tracks, monthly statement generation, and a partner portal for labels and distributors. Calculation time dropped from 3 weeks to 4 hours. Dispute rate dropped by 71%.", name: 'Simone W.', role: 'Head of Technology, Independent Music Label Group (US)', init: 'SW', bg: '#1e3a5f' },
];

const WHY = [
  { t: '70+ Media & Entertainment Projects', d: '1Solutions has built OTT platforms, music streaming apps, digital ticketing systems, royalty management tools, fan engagement platforms, and media analytics dashboards for studios, broadcasters, labels, and event companies globally.' },
  { t: 'Video Streaming Architecture Depth', d: 'HLS/DASH adaptive streaming, multi-CDN strategy (CloudFront, Akamai, Fastly), origin shielding, multi-DRM (Widevine, PlayReady, FairPlay), video transcoding pipelines (FFmpeg, AWS Elemental), and smart TV SDK development — real streaming expertise.' },
  { t: 'AI Recommendation Engine Capability', d: 'Collaborative filtering, content-based models, session-aware recommendations, cold-start handling, and A/B testing frameworks — we build recommendation systems that measurably increase engagement and reduce churn, not just install third-party widgets.' },
  { t: 'Music Industry Standards', d: 'DDEX, CWR, and PRO integration (ASCAP, BMI, APRA, PRS), mechanical and performance royalty calculation logic, and ISRC/ISWC management — we understand music industry data standards, not just audio streaming tech.' },
  { t: 'Live Event & High-Concurrency Experience', d: 'Building for concert ticket on-sales and live sport streams means handling enormous concurrent spikes. We load-test to production-equivalent levels, implement queue-based traffic shaping, and use auto-scaling architectures that handle 100x normal traffic without degradation.' },
  { t: 'Multi-Device Publishing', d: 'Web (React), iOS (Swift/React Native), Android (Kotlin/React Native), Smart TV (Samsung Tizen, LG webOS), Roku, and Fire TV — we build and maintain native or cross-platform apps across all entertainment consumption surfaces.' },
  { t: 'Rights & Licensing Complexity', d: 'Entertainment software is unusually complex around rights — territory restrictions, window management, exclusive licencing periods, format rights (cinema, SVOD, AVOD, DVD). We understand these business rules and build flexible rights engines rather than simple flags.' },
  { t: 'Post-Launch Growth Support', d: 'We track content performance, recommendation model accuracy, and subscriber retention metrics post-launch and iterate. Entertainment products need ongoing tuning — we stay involved beyond the go-live day.' },
];

const FAQS = [
  { q: 'What entertainment software does 1Solutions build?', a: 'OTT video streaming platforms, music and podcast streaming apps, media asset management systems, content recommendation engines, gaming portals, digital ticketing and event management, live streaming platforms, fan engagement apps, rights and royalty management, and media analytics dashboards.' },
  { q: 'Can you build a Netflix-style OTT streaming platform?', a: 'Yes — adaptive bitrate delivery (HLS/DASH), CDN integration, multi-DRM (Widevine, PlayReady, FairPlay), subscription/PPV billing, web and multi-device apps (iOS, Android, Smart TV, Roku, Fire TV), personalised recommendations, and real-time viewer analytics.' },
  { q: 'How long does it take to build an OTT platform?', a: 'MVP with web app, video playback, subscription billing, and basic CMS: 12–16 weeks. Full platform with Smart TV apps, AI recommendations, advanced analytics, and multi-DRM: 6–9 months. Timeline depends on feature scope and integrations required.' },
  { q: 'Can you integrate DRM content protection into an existing platform?', a: 'Yes — Widevine (Android/Chrome), PlayReady (Microsoft/Edge), and FairPlay (Apple Safari/iOS) can be integrated into an existing streaming platform. We implement the key server, licence server, packaging pipeline (Shaka Packager or Bento4), and player-side licence acquisition.' },
  { q: 'Can you build a music royalty management system?', a: 'Yes — royalty calculation for mechanical, performance, sync, and streaming revenue; DDEX and CWR ingest; statement generation and partner portal; PRO integration (ASCAP, BMI, APRA, PRS); ISRC/ISWC management; and dispute workflow.' },
  { q: 'Do you build digital ticketing platforms with fraud prevention?', a: 'Yes — unique barcode per ticket, one-time scan validation, transfer restrictions with identity verification, dynamic QR refresh on mobile, fan-name ticket personalisation, and integration with entry management gate scanners.' },
  { q: 'Can you add a recommendation engine to an existing OTT platform?', a: 'Yes — we integrate recommendation engines into existing platforms via API. Collaborative filtering + content-based hybrid models, A/B testing, cold-start handling for new users, and real-time signal ingestion from your existing event pipeline.' },
  { q: 'What video player technology do you use?', a: 'Video.js, Shaka Player, and hls.js for web; AVFoundation / AVPlayer for iOS; ExoPlayer for Android; and custom SDKs for Smart TV (Samsung Tizen, LG webOS). Choice depends on your DRM requirements and target devices.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => { if (!start) return; const n = parseInt(target.replace(/\D/g, ''), 10); if (!n) return; let t0 = null; const s = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) requestAnimationFrame(s); }; requestAnimationFrame(s); }, [start, target, duration]);
  return count;
}
function StatItem({ label, val, started }) {
  const n = useCountUp(val, 1800, started);
  const sfx = val.replace(/[\d,]/g, '');
  return (<div className="ent-sc"><div className="ent-sv">{started ? n + sfx : val}</div><div className="ent-sl">{label}</div></div>);
}

export default function EntertainmentSoftware() {
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
  const ac = '#2d1b69'; const ac2 = '#5b21b6'; const txt = '#1a0e3f'; const txt2 = '#3730a3';
  return (
    <>
      <Head>
        <title>Entertainment Software Development | OTT Streaming, Media Tech, Ticketing | 1Solutions</title>
        <meta name="description" content="Custom entertainment software development — OTT streaming platforms, media asset management, music streaming, AI recommendation engines, digital ticketing, fan engagement, and live streaming. 70+ media projects. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/entertainment-software-development/" />
        <meta property="og:title" content="Entertainment Software Development | OTT, Media & Ticketing | 1Solutions" />
        <meta property="og:description" content="OTT streaming platforms, music streaming apps, digital ticketing, fan engagement, and royalty management. 70+ media and entertainment projects." />
        <meta property="og:url" content="https://www.1solutions.biz/entertainment-software-development/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .ent-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#f5f3ff 0%,#ede9fe 20%,#f3f0ff 50%,#fdf4ff 75%,#fff7ed 100%);color:${txt};line-height:1.6;position:relative;overflow-x:hidden}
          .ent-page *,.ent-page *::before,.ent-page *::after{box-sizing:border-box}
          .ent-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .ent-o1{width:800px;height:800px;background:radial-gradient(circle,rgba(45,27,105,.16) 0%,transparent 70%);top:-220px;right:-200px}
          .ent-o2{width:700px;height:700px;background:radial-gradient(circle,rgba(162,28,175,.12) 0%,transparent 70%);bottom:0;left:-200px}
          .ent-o3{width:480px;height:480px;background:radial-gradient(circle,rgba(217,119,6,.08) 0%,transparent 70%);top:42%;left:-90px}
          .ent-bc{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .ent-bc ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:${ac2}}
          .ent-bc li{display:flex;align-items:center;gap:6px}.ent-bc li::after{content:'/';opacity:.45}.ent-bc li:last-child::after{display:none}
          .ent-bc a{color:${txt};text-decoration:none}
          .ent-hero{position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto;padding:44px 40px 28px}
          .ent-ey{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${ac2};margin-bottom:14px}
          .ent-hero h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .ent-desc{font-size:16px;color:${txt2};line-height:1.65;max-width:720px;margin:0 auto 22px}
          .ent-tr{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin-bottom:24px}
          .ent-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:5px 13px;font-size:12px;font-weight:600;color:${txt};box-shadow:0 2px 8px rgba(45,27,105,.07)}
          .ent-dot{width:7px;height:7px;border-radius:50%;background:${ac2};flex-shrink:0}
          .ent-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .ent-p{display:inline-block;padding:13px 34px;background:${ac};color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(45,27,105,.28)}
          .ent-p:hover{background:${txt};transform:translateY(-2px)}
          .ent-g{display:inline-block;padding:13px 34px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:${txt};font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .ent-g:hover{background:rgba(255,255,255,.85);border-color:rgba(45,27,105,.5);transform:translateY(-2px)}
          .ent-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:920px;margin:26px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(45,27,105,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .ent-sc{padding:18px 16px;text-align:center;border-right:1px solid rgba(45,27,105,.10)}.ent-sc:last-child{border-right:none}
          .ent-sv{font-size:28px;font-weight:900;color:${ac2};letter-spacing:-.5px;line-height:1}
          .ent-sl{font-size:11px;color:${txt2};font-weight:500;margin-top:5px}
          .ent-sec{padding:72px 40px;position:relative;z-index:1}
          .ent-sec-alt{background:rgba(245,243,255,.55);border-top:1px solid rgba(45,27,105,.08);border-bottom:1px solid rgba(45,27,105,.08)}
          .ent-in{max-width:1300px;margin:0 auto}
          .ent-sey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .ent-sh{font-size:44px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .ent-sd{font-size:15px;color:${txt2};line-height:1.7;max-width:700px}
          .ent-rv{opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .ent-rv.ent-ok{opacity:1;transform:translateY(0)}
          .ent-sk-g{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
          .ent-card{background:linear-gradient(135deg,rgba(245,243,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(45,27,105,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1),border-color .2s}
          .ent-card.ent-cv{opacity:1;transform:translateY(0)}.ent-card.ent-cv:hover{transform:translateY(-5px);border-color:rgba(45,27,105,.25);box-shadow:0 14px 40px rgba(45,27,105,.12)}
          .ent-card.feat{border-color:rgba(45,27,105,.18)}
          .ent-cn{position:absolute;top:6px;right:12px;font-size:68px;font-weight:900;line-height:1;color:${ac2};opacity:.05;pointer-events:none;user-select:none}
          .ent-card h3{font-size:15px;font-weight:700;color:${txt};margin:0 0 7px;position:relative;z-index:1}
          .ent-card p{font-size:13px;color:${txt2};line-height:1.65;margin:0;position:relative;z-index:1}
          .ent-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,${ac},${ac2});border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top;transition:transform .3s}
          .ent-card.ent-cv:hover::before{transform:scaleY(1)}
          .ent-sm{text-align:center;margin-top:20px}
          .ent-bm{display:inline-block;background:#fff;border:1.5px solid rgba(45,27,105,.18);color:${txt};padding:9px 28px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .ent-bm:hover{background:${ac};border-color:${ac};color:#fff;transform:translateY(-2px)}
          .ent-tec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
          .ent-tc2{background:linear-gradient(135deg,rgba(245,243,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:20px 18px;box-shadow:0 4px 24px rgba(45,27,105,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .ent-tc2.ent-sv2{opacity:1;transform:translateY(0)}.ent-tc2.ent-sv2:hover{border-color:rgba(45,27,105,.22);box-shadow:0 12px 36px rgba(45,27,105,.10)}
          .ent-tg{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:10px;padding-bottom:7px;border-bottom:2px solid}
          .ent-pills{display:flex;flex-wrap:wrap;gap:5px}
          .ent-pill{display:inline-block;font-size:11px;font-weight:500;padding:3px 9px;border-radius:100px;border:1px solid}
          .ent-en-g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
          .ent-en{background:linear-gradient(135deg,rgba(245,243,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(45,27,105,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1),border-color .2s}
          .ent-en.ent-ev{opacity:1;transform:translateY(0)}.ent-en.ent-ev:hover{border-color:rgba(45,27,105,.22);box-shadow:0 14px 44px rgba(45,27,105,.12)}
          .ent-en.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(245,243,255,.45) 100%);border-color:rgba(217,119,6,.26);transform:translateY(-6px)}
          .ent-en.feat.ent-ev{transform:translateY(-6px)}.ent-en.feat.ent-ev:hover{transform:translateY(-10px)}
          .ent-en-b{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:4px 11px;border-radius:100px;border:1px solid;margin-bottom:16px}
          .ent-en-i{width:44px;height:44px;background:rgba(45,27,105,.08);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
          .ent-en.feat .ent-en-i{background:rgba(217,119,6,.10)}
          .ent-en-n{font-size:20px;font-weight:900;color:${txt};margin:0 0 5px;letter-spacing:-.3px}
          .ent-en-h{font-size:13px;font-weight:600;color:${ac2};margin-bottom:10px}
          .ent-en.feat .ent-en-h{color:#D97706}
          .ent-en-d{font-size:13px;color:${txt2};line-height:1.7;margin-bottom:14px}
          .ent-en-ll{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${ac2};margin-bottom:7px}
          .ent-en-li{list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:6px}
          .ent-en-li li{display:flex;align-items:flex-start;gap:7px;font-size:13px;color:#374151;line-height:1.5}
          .ent-en-li li::before{content:'✓';font-weight:800;color:${ac2};flex-shrink:0;margin-top:1px}
          .ent-en.feat .ent-en-li li::before{color:#D97706}
          .ent-en-tl{font-size:11px;font-weight:600;color:#D97706;display:block;padding-top:10px;border-top:1px solid rgba(45,27,105,.08)}
          .ent-en-a{display:block;margin-top:14px;padding:10px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(45,27,105,.09);color:${txt};border:1.5px solid rgba(45,27,105,.18)}
          .ent-en-a:hover{background:${txt};color:#fff}
          .ent-en.feat .ent-en-a{background:${ac};color:#fff;border-color:${ac}}
          .ent-en.feat .ent-en-a:hover{background:${txt};border-color:${txt}}
          .ent-tg2{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px}
          .ent-tc{background:linear-gradient(135deg,rgba(245,243,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:26px 22px;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 24px rgba(45,27,105,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
          .ent-tc.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(245,243,255,.42) 100%);border-color:rgba(217,119,6,.20)}
          .ent-tc.ent-tv{opacity:1;transform:translateY(0)}.ent-tc.ent-tv:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(45,27,105,.12)}
          .ent-stars{font-size:15px;color:#D97706;letter-spacing:2px}
          .ent-ttxt{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .ent-au{display:flex;align-items:center;gap:11px}
          .ent-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .ent-an{font-size:14px;font-weight:700;color:${txt}}
          .ent-ar{font-size:12px;color:#6b7280}
          .ent-wy-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:44px}
          .ent-wc{background:linear-gradient(135deg,rgba(245,243,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:22px 18px;box-shadow:0 4px 24px rgba(45,27,105,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px) scale(.97);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .ent-wc.ent-wv{opacity:1;transform:translateY(0) scale(1)}.ent-wc.ent-wv:hover{transform:translateY(-4px) scale(1);border-color:rgba(45,27,105,.22);box-shadow:0 12px 36px rgba(45,27,105,.10)}
          .ent-wd{width:9px;height:9px;border-radius:50%;background:${ac2};margin-bottom:10px}
          .ent-wc h3{font-size:13px;font-weight:700;color:${txt};margin:0 0 7px;line-height:1.35}
          .ent-wc p{font-size:12px;color:${txt2};line-height:1.6;margin:0}
          .ent-ct{padding:64px 40px;background:linear-gradient(135deg,rgba(245,243,255,.55) 0%,rgba(255,255,255,.60) 40%,rgba(253,244,255,.50) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .ent-ct-g{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.1fr;gap:28px;align-items:start}
          .ent-cth{font-size:38px;font-weight:900;line-height:1.18;margin:0 0 12px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .ent-ctd{font-size:14px;color:${txt2};line-height:1.6;margin:0 0 18px}
          .ent-ben{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:12px}
          .ent-be{display:flex;gap:9px;align-items:flex-start}
          .ent-bi{flex-shrink:0;color:${ac2};font-weight:800;font-size:15px;margin-top:1px}
          .ent-be p{font-size:13px;color:${txt2};margin:0;line-height:1.5}
          .ent-fb{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(245,243,255,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:18px;padding:30px;box-shadow:0 8px 40px rgba(45,27,105,.08),inset 0 1px 0 rgba(255,255,255,1)}
          .ent-fb h3{font-size:20px;font-weight:700;color:${txt};margin:0 0 20px}
          .ent-form{display:flex;flex-direction:column;gap:12px}
          .ent-fr{display:grid;grid-template-columns:1fr 1fr;gap:11px}
          .ent-fg{display:flex;flex-direction:column;gap:4px}
          .ent-fg.full{grid-column:1/-1}
          .ent-fg label{font-size:12px;font-weight:500;color:${txt}}
          .ent-fg input,.ent-fg textarea,.ent-fg select{padding:10px 12px;border:1px solid rgba(45,27,105,.14);border-radius:6px;font-size:13px;font-family:inherit;color:${txt};background:rgba(255,255,255,.55);transition:border-color .2s}
          .ent-fg input:focus,.ent-fg textarea:focus,.ent-fg select:focus{outline:none;border-color:${ac2};box-shadow:0 0 0 3px rgba(91,33,182,.10)}
          .ent-co{display:flex;gap:8px;align-items:flex-start}
          .ent-co input{margin-top:3px;width:14px;height:14px}
          .ent-co label{font-size:11px;color:${txt2};line-height:1.5}.ent-co a{color:${txt}}
          .ent-sub{width:100%;padding:13px;background:${ac};border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(45,27,105,.25)}
          .ent-sub:hover{background:${txt};transform:translateY(-2px)}
          .ent-fq{padding:72px 40px;background:rgba(245,243,255,.55);border-top:1px solid rgba(45,27,105,.08);position:relative;z-index:1}
          .ent-fq h2{font-size:42px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .ent-fq-sub{font-size:15px;color:${txt2};margin:0 0 32px}
          .ent-fql{display:flex;flex-direction:column;gap:9px}
          .ent-fi{background:linear-gradient(135deg,rgba(245,243,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(253,244,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(45,27,105,.05);transition:border-color .2s}
          .ent-fi.open{border-color:rgba(45,27,105,.28)}.ent-fi.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,${ac},${ac2});border-radius:3px 3px 0 0}
          .ent-fqb{width:100%;background:none;border:none;padding:18px 18px 18px 52px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:12px;font-family:inherit;position:relative}
          .ent-fqn{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:rgba(45,27,105,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:5px}
          .ent-fi.open .ent-fqn{background:${ac};color:#fff}
          .ent-fqb span{font-size:14px;font-weight:600;color:${txt};line-height:1.4}.ent-fi.open .ent-fqb span{color:${ac2}}
          .ent-fch{width:20px;height:20px;flex-shrink:0;color:#9ca3af;transition:transform .3s}.ent-fi.open .ent-fch{transform:rotate(180deg);color:${ac2}}
          .ent-faw{overflow:hidden;transition:max-height .35s ease;max-height:0}.ent-fi.open .ent-faw{max-height:400px}
          .ent-fa{padding:0 18px 18px 52px;font-size:14px;color:#4b5563;line-height:1.8}
          .ent-rel{padding:64px 40px;background:rgba(245,243,255,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .ent-ri{max-width:1300px;margin:0 auto;text-align:center}
          .ent-ri h2{font-size:30px;font-weight:900;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 10px}
          .ent-ri hr{border:none;border-top:1px solid rgba(45,27,105,.10);margin:24px 0}
          .ent-rts{display:flex;flex-wrap:wrap;justify-content:center;gap:9px}
          .ent-rt{display:inline-block;padding:9px 18px;border:1.5px solid;border-radius:50px;font-size:13px;font-weight:500;text-decoration:none;transition:all .22s}
          .ent-rt:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.08)}
          .ent-ra{background:rgba(45,27,105,.09);border-color:rgba(45,27,105,.28);color:#2d1b69}
          .ent-rb{background:rgba(162,28,175,.09);border-color:rgba(162,28,175,.28);color:#7c2d8b}
          .ent-rc{background:rgba(120,53,15,.09);border-color:rgba(120,53,15,.28);color:#78350f}
          .ent-rd{background:rgba(20,83,45,.09);border-color:rgba(20,83,45,.28);color:#14532d}
          @media(max-width:1024px){.ent-hero h1,.ent-sh,.ent-fq h2{font-size:34px}.ent-sk-g{grid-template-columns:repeat(2,1fr)}.ent-tec-g{grid-template-columns:repeat(2,1fr)}.ent-en-g{grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto}.ent-en.feat{transform:none}.ent-en.feat.ent-ev{transform:none}.ent-en.feat.ent-ev:hover{transform:translateY(-4px)}.ent-wy-g{grid-template-columns:repeat(2,1fr)}.ent-tg2{grid-template-columns:1fr}.ent-ct-g{grid-template-columns:1fr}}
          @media(max-width:768px){.ent-bc,.ent-hero,.ent-sec,.ent-ct,.ent-fq,.ent-rel{padding-left:20px;padding-right:20px}.ent-hero{padding-top:28px;padding-bottom:16px}.ent-hero h1{font-size:26px}.ent-stats{grid-template-columns:1fr 1fr}.ent-sc:nth-child(2){border-right:none}.ent-sc:nth-child(3),.ent-sc:nth-child(4){border-top:1px solid rgba(45,27,105,.10)}.ent-sc:nth-child(4){border-right:none}.ent-sk-g,.ent-tec-g,.ent-wy-g{grid-template-columns:1fr}.ent-fr{grid-template-columns:1fr}.ent-cth{font-size:26px}}
        `}</style>
      </Head>
      <div className="ent-page">
        <div className="ent-orb ent-o1" /><div className="ent-orb ent-o2" /><div className="ent-orb ent-o3" />
        <nav className="ent-bc" aria-label="Breadcrumb"><ol itemScope itemType="https://schema.org/BreadcrumbList"><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li><li><span>Industries</span></li><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">Entertainment Software</span><meta itemProp="position" content="3" /></li></ol></nav>
        <section className="ent-hero">
          <span className="ent-ey">Entertainment & Media Industry</span>
          <h1>Entertainment Software Development — OTT Streaming, Media Tech & Digital Ticketing</h1>
          <p className="ent-desc">Custom software for studios, broadcasters, labels, event companies, and gaming platforms — OTT video streaming, music and podcast apps, media asset management, AI recommendation engines, digital ticketing, and fan engagement. 70+ media projects. 15+ years.</p>
          <div className="ent-tr">{['OTT Streaming Platform','AI Recommendations','Music & Royalties','Digital Ticketing','Live Streaming'].map(b => (<div className="ent-badge" key={b}><span className="ent-dot" />{b}</div>))}</div>
          <div className="ent-ctas"><Link href="#contact" className="ent-p">Discuss Your Entertainment Project</Link><Link href="#solutions" className="ent-g">View Solutions →</Link></div>
        </section>
        <div className="ent-stats" ref={stR}>{[['70+','Media & Entertainment Projects'],['15+','Years Dev Experience'],['38%','Avg Session Length Increase'],['99.9%','Platform Uptime SLA']].map(([v, l]) => <StatItem key={l} label={l} val={v} started={ss} />)}</div>
        <section id="solutions" className="ent-sec"><div className="ent-in"><div className={`ent-rv${vis.has('sk') ? ' ent-ok' : ''}`} ref={el => { secR.current['sk'] = el; }}><span className="ent-sey">Media & Entertainment Solutions</span><h2 className="ent-sh">What We Build for Entertainment</h2><p className="ent-sd">OTT streaming, music streaming, media asset management, recommendation engines, gaming portals, digital ticketing, live streaming, fan engagement, rights management, and media analytics.</p></div><div className="ent-sk-g" ref={skR}>{visS.map((s, i) => (<div key={s.n} className={`ent-card${s.feat ? ' feat' : ''}${vSk.includes(i) ? ' ent-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="ent-cn">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}</div>{SOLUTIONS.length > 6 && <div className="ent-sm"><button className="ent-bm" onClick={() => setShowAll(p => !p)}>{showAll ? 'Show fewer ↑' : `Show all ${SOLUTIONS.length} solutions ↓`}</button></div>}</div></section>
        <section className="ent-sec ent-sec-alt"><div className="ent-in"><div className={`ent-rv${vis.has('stk') ? ' ent-ok' : ''}`} ref={el => { secR.current['stk'] = el; }}><span className="ent-sey">Technology Stack</span><h2 className="ent-sh">Entertainment Technology We Use</h2><p className="ent-sd">HLS/DASH streaming, multi-DRM, FFmpeg, CDN, React Native, WebRTC, AI recommendation models, DDEX, and the full entertainment tech ecosystem.</p></div><div className="ent-tec-g" ref={stGr}>{TECH_STACK.map((g, i) => (<div key={g.group} className={`ent-tc2${vSt.includes(i) ? ' ent-sv2' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="ent-tg" style={{ color: g.color, borderBottomColor: g.color + '33' }}>{g.group}</div><div className="ent-pills">{g.items.map(it => <span key={it} className="ent-pill" style={{ color: g.color, background: g.color + '12', borderColor: g.color + '30' }}>{it}</span>)}</div></div>))}</div></div></section>
        <section className="ent-sec"><div className="ent-in"><div className={`ent-rv${vis.has('eng') ? ' ent-ok' : ''}`} ref={el => { secR.current['eng'] = el; }}><span className="ent-sey">Engagement Models</span><h2 className="ent-sh">How We Work with Entertainment Companies</h2><p className="ent-sd">Full OTT platform build, targeted feature delivery, or pre-launch performance and scale engineering — matched to your project stage and timeline.</p></div><div className="ent-en-g" ref={enR}>{ENGAGEMENT.map((m, i) => (<div key={m.id} className={`ent-en${m.feat ? ' feat' : ''}${vEn.includes(i) ? ' ent-ev' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><span className="ent-en-b" style={{ color: m.bc, borderColor: m.bc + '44', background: m.bc + '14' }}>{m.badge}</span><div className="ent-en-i"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={m.feat ? '#D97706' : ac2} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={m.icon} /></svg></div><div className="ent-en-n">{m.name}</div><div className="ent-en-h">{m.headline}</div><div className="ent-en-d">{m.desc}</div><div className="ent-en-ll">Best for</div><ul className="ent-en-li">{m.best.map(b => <li key={b}>{b}</li>)}</ul><span className="ent-en-tl">{m.tl}</span><Link href="#contact" className="ent-en-a">Get a free estimate →</Link></div>))}</div></div></section>
        <section className="ent-sec ent-sec-alt"><div className="ent-in"><div className={`ent-rv${vis.has('ts') ? ' ent-ok' : ''}`} ref={el => { secR.current['ts'] = el; }}><span className="ent-sey">Client Outcomes</span><h2 className="ent-sh">Entertainment Clients</h2><p className="ent-sd">Streaming platforms, ticketing companies, and music groups on building entertainment technology with 1Solutions.</p></div><div className="ent-tg2" ref={teR}>{TESTIMONIALS.map((t, i) => (<div key={i} className={`ent-tc${t.feat ? ' feat' : ''}${vTe.includes(i) ? ' ent-tv' : ''}`} style={{ transitionDelay: `${i * 90}ms` }} itemScope itemType="https://schema.org/Review"><div className="ent-stars">★★★★★</div><p className="ent-ttxt" itemProp="reviewBody">{t.text}</p><div className="ent-au"><div className="ent-av" style={{ background: t.bg }}>{t.init}</div><div><div className="ent-an" itemProp="author">{t.name}</div><div className="ent-ar">{t.role}</div></div></div></div>))}</div></div></section>
        <section className="ent-sec"><div className="ent-in"><div className={`ent-rv${vis.has('wy') ? ' ent-ok' : ''}`} ref={el => { secR.current['wy'] = el; }}><span className="ent-sey">Why 1Solutions</span><h2 className="ent-sh">Why Entertainment Companies Choose 1Solutions</h2><p className="ent-sd">OTT architecture depth, AI recommendation capability, music industry standards, live event scalability, multi-device publishing, and rights management complexity.</p></div><div className="ent-wy-g" ref={whR}>{WHY.map((c, i) => (<div key={i} className={`ent-wc${vWh.includes(i) ? ' ent-wv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="ent-wd" /><h3>{c.t}</h3><p>{c.d}</p></div>))}</div></div></section>
        <section id="contact" className="ent-ct"><div className="ent-ct-g"><div><h2 className="ent-cth">Build Your Entertainment Platform</h2><p className="ent-ctd">Share your entertainment software requirements and we will respond within 24 hours with a proposal, timeline, and team composition.</p><div className="ent-ben">{[['✓','Technical proposal within 24–48 hours'],['✓','OTT, media, music, and gaming specialists'],['✓','NDA signed before any technical discussions'],['✓','70+ entertainment projects — streaming, ticketing, royalties'],['✓','Multi-device, DRM-ready, SLA-backed delivery']].map(([ic, tx]) => (<div className="ent-be" key={tx}><span className="ent-bi">{ic}</span><p>{tx}</p></div>))}</div></div>
        <div className="ent-fb"><h3>Tell Us About Your Entertainment Project</h3><form className="ent-form" onSubmit={e => e.preventDefault()}><div className="ent-fr"><div className="ent-fg"><label>Full Name *</label><input type="text" placeholder="Your name" required /></div><div className="ent-fg"><label>Work Email *</label><input type="email" placeholder="you@company.com" required /></div></div><div className="ent-fr"><div className="ent-fg"><label>Company</label><input type="text" placeholder="Company name" /></div><div className="ent-fg"><label>Phone / WhatsApp</label><input type="tel" placeholder="+1 555 000 0000" /></div></div><div className="ent-fg full"><label>Type of Entertainment Platform *</label><select required><option value="">Select...</option><option>OTT Video Streaming Platform</option><option>Music / Podcast Streaming</option><option>Media Asset Management (MAM)</option><option>AI Content Recommendation Engine</option><option>Gaming Platform / Portal</option><option>Digital Ticketing & Events</option><option>Live Streaming / Broadcasting</option><option>Fan Engagement & Community</option><option>Rights & Royalty Management</option><option>Media Analytics</option><option>Other</option></select></div><div className="ent-fg full"><label>Project Description *</label><textarea rows={4} placeholder="Describe your entertainment platform — type of content, target audience, existing systems, scale targets, and go-live timeline..." required /></div><div className="ent-co"><input type="checkbox" required /><label>I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label></div><button type="submit" className="ent-sub">Get an Entertainment Tech Proposal →</button></form></div></div></section>
        <section className="ent-fq"><div className="ent-in" style={{ maxWidth: 840 }}><span className="ent-sey">FAQ</span><h2>Entertainment Software — FAQ</h2><p className="ent-fq-sub">OTT streaming, DRM, music royalties, ticketing, and media tech questions answered.</p><div className="ent-fql">{FAQS.map((f, i) => (<div key={i} className={`ent-fi${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="ent-fqb" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="ent-fqn">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{f.q}</span><svg className="ent-fch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="ent-faw"><div className="ent-fa" itemProp="text">{f.a}</div></div></div>))}</div></div></section>
        <section className="ent-rel"><div className="ent-ri"><span className="ent-sey">Related Services</span><h2>Related Industry & Technology Services</h2><hr /><div className="ent-rts">{[['/social-media-app-development-company/','Social Media App Development','ent-ra'],['/mobile-app-development/','Mobile App Development','ent-rb'],['/retail-ecommerce-software-development/','Retail & eCommerce','ent-rc'],['/saas-application-development-company/','SaaS Development','ent-rd'],['/it-outsourcing-services/','IT Outsourcing','ent-ra'],['/offshore-development-company/','Offshore Development','ent-rb'],['/web-development/','Web Development','ent-rc'],['/ai-ml-development/','AI/ML Development','ent-rd']].map(([hr, lb, cl]) => (<Link key={hr} href={hr} className={`ent-rt ${cl}`}>{lb}</Link>))}</div></div></section>
      </div>
    </>
  );
}
