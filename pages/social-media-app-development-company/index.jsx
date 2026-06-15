'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.1solutions.biz/#industries' }, { '@type': 'ListItem', position: 3, name: 'Social Media App Development', item: 'https://www.1solutions.biz/social-media-app-development-company/' }] },
    { '@type': 'Service', name: 'Social Media App Development Company', url: 'https://www.1solutions.biz/social-media-app-development-company/', description: '1Solutions builds custom social media and community apps — short-form video platforms, niche social networks, creator monetisation tools, fan community apps, social commerce, content moderation systems, real-time messaging, and social analytics. 15+ years, 55+ social app projects.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '52', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What social media apps does 1Solutions build?', acceptedAnswer: { '@type': 'Answer', text: '1Solutions builds custom social media and community platforms — niche social networks (industry-specific, interest-based, creator communities), short-form video apps (TikTok-style feed with reels and Stories), fan community and engagement apps, creator monetisation platforms (subscriptions, tips, paid content), social commerce (shoppable posts, influencer marketplace), real-time messaging and group chat, content moderation systems, and social analytics dashboards.' } },
      { '@type': 'Question', name: 'How do you build a scalable social media feed?', acceptedAnswer: { '@type': 'Answer', text: 'A scalable social feed requires a fan-out architecture where posts are pushed to follower feeds asynchronously via a message queue (Kafka or RabbitMQ). We store the feed in Redis for sub-millisecond read performance. For large accounts (celebrities, brands) we use fan-out-on-read (pull) instead of fan-out-on-write to avoid write amplification. Media (images, video) is stored in S3 and served via CDN. Video is processed through a transcoding pipeline for multiple resolutions and HLS streaming.' } },
    ] },
  ],
};

const SOLUTIONS = [
  { n: '01', title: 'Niche Social Network Platform', desc: 'Custom social network for a specific audience — user profiles and follow/connect system, timeline feed (fan-out architecture with Redis), post types (text, image, video, poll, event), reactions and nested comments, hashtag and topic discovery, trending content algorithm, groups and communities, direct messaging, notifications (push and in-app), and privacy controls (public/followers/private).', feat: true },
  { n: '02', title: 'Short-Form Video App (Reels / Stories)', desc: 'TikTok / Instagram Reels-style platform — camera capture (in-app filters, AR effects, text overlays), video processing pipeline (FFmpeg, multi-resolution HLS), algorithm-ranked For You Page (engagement signals: watch time, completion, shares, comments), creator profile and followers, duet and stitching, trending sounds / audio clips, and full-screen vertical scroll feed.' },
  { n: '03', title: 'Creator Monetisation Platform', desc: 'Revenue tools for content creators — subscription tiers (monthly and annual) with exclusive content access, pay-per-view content, creator tips and virtual gifting, direct brand partnership marketplace, affiliate product integration, creator dashboard (earnings, subscriber analytics, content performance), payout management (Stripe Connect), tax form generation (1099/W-9 for US, equivalent for AU/UK), and audience segmentation.' },
  { n: '04', title: 'Fan Engagement & Community App', desc: 'Brand or creator fan community — exclusive content feed (text, photo, video, audio), fan challenges and UGC campaigns, polls and live Q&A sessions, fan tier levels and gamification (points, badges, achievement unlocks), exclusive event access and early ticket sales, virtual meet-and-greet scheduler, push notifications, and integration with Discord or Slack for external community spillover.', feat: true },
  { n: '05', title: 'Social Commerce Platform', desc: 'Shoppable social feed — product tagging in posts and stories, in-app storefront, influencer seeding and UGC product reviews, influencer marketplace (brand-to-creator matching, campaign management, performance tracking), affiliate commission tracking, checkout within the app (Stripe or payment SDK), returns and order tracking, and seller analytics dashboard (reach, clicks, conversion, GMV).' },
  { n: '06', title: 'Real-Time Messaging & Group Chat', desc: 'Scalable real-time messaging — 1:1 and group chat (WebSocket, Socket.io or Matrix protocol), message types (text, image, video, audio, file, emoji reactions, GIF), read receipts and typing indicators, end-to-end encryption (Signal protocol), message search and history, group roles (admin, moderator, member), disappearing messages, threaded replies, and push notifications for offline users (APNs / FCM).' },
  { n: '07', title: 'Content Moderation System', desc: 'AI-assisted content moderation — automated image and video moderation (AWS Rekognition, Google Vision AI, OpenAI moderation endpoint) for NSFW, violence, and hate symbol detection; text moderation (toxic language classifier, PII detection); human review queue with moderator tooling; user reporting and appeals workflow; strike and ban management; CSAM detection integration (PhotoDNA); and trust and safety analytics dashboard.' },
  { n: '08', title: 'Live Streaming & Rooms', desc: 'Social live streaming — creator RTMP / SRT ingest, WebRTC-based interactive rooms for small groups (Clubhouse-style audio rooms, Twitter Spaces equivalent), live comment stream with moderation, virtual gifting and tipping during live, replay recording and VOD, scheduled live events, co-host invites, screen sharing for watch parties, and creator monetisation of lives (subscription or PPV gating).' },
  { n: '09', title: 'Social Graph & Recommendation Engine', desc: 'Personalisation and discovery — social graph storage (Neo4j or PostgreSQL adjacency list), friend-of-friend suggestions (collaborative filtering), interest-based content recommendations (topic modelling, content-based filtering), trending algorithm (decaying time-weighted engagement score), search across users, hashtags, and content, and A/B testing framework for feed ranking experiments.' },
  { n: '10', title: 'Social Analytics & Creator Dashboard', desc: 'Analytics for creators and platform operators — profile and content performance (impressions, reach, engagement rate, follower growth), follower demographics (age, location, device), best time to post analysis, content type performance (video vs photo vs text), revenue analytics (subscriptions, tips, affiliate), platform-level growth KPIs, virality tracking, and cohort retention analysis.' },
];

const TECH_STACK = [
  { group: 'Frontend & Mobile', color: '#701a75', items: ['React / Next.js', 'React Native', 'TypeScript', 'WebRTC (live rooms)', 'Socket.io (real-time)', 'React Navigation'] },
  { group: 'Video & Media', color: '#7c3aed', items: ['FFmpeg (transcoding)', 'HLS / adaptive stream', 'AWS S3 + CloudFront', 'AWS Elemental MediaConvert', 'Video.js / hls.js', 'ImageKit / Cloudinary'] },
  { group: 'Backend & API', color: '#4338ca', items: ['Node.js / NestJS', 'GraphQL (Apollo)', 'REST / tRPC', 'Python / FastAPI', 'Socket.io / ws', 'Kafka / RabbitMQ'] },
  { group: 'Feed & Realtime', color: '#2d1b69', items: ['Redis (feed cache)', 'Fan-out on write/read', 'Kafka (event stream)', 'Celery (async tasks)', 'WebSocket clusters', 'Notification queues'] },
  { group: 'Auth & Moderation', color: '#9333ea', items: ['Auth0 / Firebase Auth', 'Social login (G/FB/Apple)', 'AWS Rekognition (NSFW)', 'OpenAI Moderation API', 'PhotoDNA (CSAM)', 'Signal protocol (E2EE)'] },
  { group: 'Payments & Creator', color: '#a21caf', items: ['Stripe Connect (payouts)', 'Subscription billing', 'Virtual currency / gifts', 'Affiliate tracking', 'Tax form generation', 'Revenue analytics'] },
  { group: 'Cloud & DevOps', color: '#dc2626', items: ['AWS / GCP / Firebase', 'Kubernetes / ECS', 'Terraform (IaC)', 'GitHub Actions CI/CD', 'CDN (CloudFront)', 'APNs / FCM (push)'] },
  { group: 'Search & Analytics', color: '#b45309', items: ['Elasticsearch / Typesense', 'Amplitude / Mixpanel', 'Segment CDP', 'ClickHouse (analytics)', 'Hashtag search engine', 'Virality tracking'] },
];

const ENGAGEMENT = [
  { id: 'platform', name: 'Custom Social Platform', badge: 'Most Popular', bc: '#D97706', feat: true, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', headline: 'Full social platform from feed to monetisation.', desc: 'End-to-end social app development — social graph, timeline feed, posts, messaging, creator monetisation, content moderation, and analytics. Mobile-first React Native app with a scalable Node.js/Redis backend.', best: ['Startups building a niche social network for a specific community', 'Creator economy platforms building a subscription + content hub', 'Fan engagement platforms for sports clubs, musicians, or brands', 'Media companies building a social layer for their content'], tl: 'Social MVP in 12–16 weeks; full platform 6–9 months' },
  { id: 'video', name: 'Short-Form Video & Reels', badge: 'High Growth', bc: '#701a75', icon: 'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', headline: 'TikTok-style vertical video with discovery algorithm.', desc: 'Short-form video feature build — in-app camera with filters, video transcoding pipeline, algorithm-ranked For You Page, creator profiles, duets and stitching, trending sounds, and engagement features.', best: ['Social apps adding a Reels or TikTok-style feed to an existing platform', 'Creator platforms wanting a video-first content format', 'Entertainment apps adding social video to complement editorial content', 'Gen Z-targeted consumer apps where video is the primary content type'], tl: 'Video MVP feature in 8–12 weeks' },
  { id: 'moderation', name: 'Content Moderation System', badge: 'Trust & Safety', bc: '#a21caf', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', headline: 'AI-assisted moderation at scale.', desc: 'Content moderation system — automated detection (NSFW, violence, hate symbols, toxic text, PII), human moderator review queue, user reporting and appeals, ban and strike management, CSAM detection, and trust and safety analytics.', best: ['Social platforms approaching scale where manual moderation is unmanageable', 'Platforms with UGC content that face regulatory obligations (DSA, CSAM)', 'Children-facing apps requiring strict safe environment compliance (COPPA)', 'Gaming and community platforms with high chat toxicity incidence'], tl: 'Moderation system live in 6–10 weeks' },
];

const TESTIMONIALS = [
  { text: "1Solutions built our niche social network for independent musicians — artist profiles, fan follow system, a timeline feed with music post types (tracks, lyrics, tour dates), direct messaging, and subscription-based exclusive content access. 220,000 registered users in 14 months. The creator monetisation dashboard is what convinced artists to move from Instagram.", name: 'Sarah J.', role: 'CEO, Music Creator Social Platform (UK)', init: 'SJ', bg: '#3d0d50' },
  { text: "We commissioned 1Solutions to add a short-form video feature to our existing lifestyle community app. In-app recording with filters, FFmpeg transcoding pipeline, algorithm-ranked video feed, and duets. Daily active user time increased by 61% within 60 days of launch — the video feature became the primary engagement driver for the entire platform.", name: 'Alex W.', role: 'CPO, Lifestyle Community App (AU)', init: 'AW', bg: '#2d0d45', feat: true },
  { text: "1Solutions built our influencer marketplace and social commerce platform — brand-to-creator matching, campaign brief management, content approval workflow, affiliate link tracking, and GMV attribution. We have processed over $4M in influencer campaign spend through the platform. The trust and safety moderation system keeps the quality of creators high.", name: 'Nicole T.', role: 'Founder, Influencer Marketing Platform (US)', init: 'NT', bg: '#1e3a5f' },
];

const WHY = [
  { t: '55+ Social App Projects', d: '1Solutions has built niche social networks, short-form video platforms, creator monetisation tools, fan community apps, social commerce platforms, live streaming apps, and content moderation systems over 15+ years.' },
  { t: 'Feed Architecture at Scale', d: 'Fan-out-on-write and fan-out-on-read architecture, Redis feed caching, Kafka event streaming, and background job processing — we design social feeds that stay fast as follower counts and post volumes scale to millions.' },
  { t: 'Video Pipeline Expertise', d: 'In-app camera with filter SDKs, FFmpeg transcoding for multi-resolution delivery, HLS streaming via CDN, and AWS Elemental MediaConvert for high-volume processing — real video engineering for creator-driven platforms.' },
  { t: 'Creator Monetisation Depth', d: 'Stripe Connect for creator payouts, subscription billing (monthly, annual, tiered), virtual currency and gifting systems, affiliate tracking, and tax form generation — we have built creator economy infrastructure for platforms across multiple markets.' },
  { t: 'Trust & Safety Engineering', d: 'AI-assisted moderation (AWS Rekognition, Google Vision, OpenAI), human review queues, CSAM detection (PhotoDNA), user reporting and appeals, and regulatory compliance with DSA (EU), CSAM legislation, and COPPA — not just a content flag button.' },
  { t: 'Real-Time Architecture', d: 'WebSocket clusters for real-time messaging, Socket.io for live features, WebRTC for peer-to-peer audio/video rooms (Clubhouse-style), RTMP ingest for creator live streams, and sub-second notification delivery via APNs/FCM.' },
  { t: 'Social Graph & Recommendation', d: 'Neo4j or PostgreSQL adjacency list for graph storage, collaborative filtering for friend suggestions, topic modelling for interest-based recommendations, and A/B testing of feed ranking algorithms — personalisation that increases session time.' },
  { t: 'Mobile-First, Performance-Obsessed', d: 'Social apps live and die by scroll performance. We build React Native apps with FlashList for virtualised feeds, lazy image loading, skeleton screens, and offline caching — so the feed feels instant even on slower connections.' },
];

const FAQS = [
  { q: 'What social media apps does 1Solutions build?', a: 'Niche social networks, short-form video platforms, fan engagement and creator community apps, creator monetisation platforms, social commerce and influencer marketplaces, real-time messaging systems, content moderation systems, live streaming apps, and social analytics dashboards.' },
  { q: 'How do you build a scalable social media feed?', a: 'Fan-out-on-write for accounts with low follower counts (posts pushed to Redis feeds asynchronously via Kafka) and fan-out-on-read for large accounts (posts pulled at read time to avoid write amplification). Redis stores materialised feeds for sub-millisecond reads. Media served from S3 via CDN. Video processed through HLS transcoding pipeline.' },
  { q: 'Can you build a TikTok-style short-form video app?', a: 'Yes — in-app camera with filter SDKs, video transcoding (FFmpeg/AWS Elemental), multi-resolution HLS delivery via CDN, algorithm-ranked For You Page (engagement signals: watch time, completions, shares, comments), creator profiles, duets and stitching, trending sounds, and vertical scroll feed.' },
  { q: 'Can you build creator subscription and monetisation features?', a: 'Yes — Stripe Connect for creator payouts, subscription tiers (monthly/annual) with exclusive content access, pay-per-view content, virtual gifting, affiliate product integration, creator earnings dashboard, and tax form generation (1099/W-9 US, equivalent AU/UK).' },
  { q: 'How do you handle content moderation at scale?', a: 'Automated detection (AWS Rekognition for NSFW/violence images, Google Vision for text extraction, OpenAI moderation for toxic text), human review queue with moderator tooling, user reporting and appeals workflow, ban and strike management, CSAM detection via PhotoDNA, and trust and safety analytics dashboard.' },
  { q: 'Can you build real-time messaging for a social app?', a: 'Yes — 1:1 and group chat via WebSocket (Socket.io or Matrix), message types (text, image, video, audio, reactions, GIF), read receipts and typing indicators, end-to-end encryption (Signal protocol), message search, and push notifications via APNs/FCM for offline users.' },
  { q: 'How long does it take to build a social media app?', a: 'A focused social app MVP — core social graph, feed, posts, profiles, follow/connect, messaging — typically takes 12–16 weeks. Full platform with short-form video, creator monetisation, live streaming, and content moderation: 6–9 months.' },
  { q: 'What tech stack do you use for social media apps?', a: 'Frontend: React Native (iOS/Android) and Next.js (web). Backend: Node.js/NestJS, GraphQL, Kafka, Redis. Video: FFmpeg, AWS Elemental, HLS. Real-time: Socket.io, WebRTC. Payments: Stripe Connect. Moderation: AWS Rekognition, OpenAI. Cloud: AWS or GCP with Kubernetes.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => { if (!start) return; const n = parseInt(target.replace(/\D/g, ''), 10); if (!n) return; let t0 = null; const s = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) requestAnimationFrame(s); }; requestAnimationFrame(s); }, [start, target, duration]);
  return count;
}
function StatItem({ label, val, started }) {
  const n = useCountUp(val, 1800, started);
  const sfx = val.replace(/[\d,]/g, '');
  return (<div className="socm-sc"><div className="socm-sv">{started ? n + sfx : val}</div><div className="socm-sl">{label}</div></div>);
}

export default function SocialMediaAppDevelopment() {
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
  const ac = '#701a75'; const ac2 = '#9333ea'; const txt = '#3b0764'; const txt2 = '#581c87';
  return (
    <>
      <Head>
        <title>Social Media App Development Company | Niche Social Network, Creator Platform | 1Solutions</title>
        <meta name="description" content="Custom social media app development — niche social networks, short-form video platforms, creator monetisation apps, fan community platforms, social commerce, real-time messaging, and content moderation. 55+ social app projects. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/social-media-app-development-company/" />
        <meta property="og:title" content="Social Media App Development Company | 1Solutions" />
        <meta property="og:description" content="Niche social networks, short-form video, creator monetisation, fan communities, social commerce, and content moderation. 55+ social app projects." />
        <meta property="og:url" content="https://www.1solutions.biz/social-media-app-development-company/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .socm-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#fdf4ff 0%,#fae8ff 20%,#f3e8ff 50%,#fce7f3 75%,#fff7ed 100%);color:${txt};line-height:1.6;position:relative;overflow-x:hidden}
          .socm-page *,.socm-page *::before,.socm-page *::after{box-sizing:border-box}
          .socm-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .socm-o1{width:800px;height:800px;background:radial-gradient(circle,rgba(112,26,117,.16) 0%,transparent 70%);top:-220px;right:-200px}
          .socm-o2{width:700px;height:700px;background:radial-gradient(circle,rgba(162,28,175,.12) 0%,transparent 70%);bottom:0;left:-200px}
          .socm-o3{width:480px;height:480px;background:radial-gradient(circle,rgba(217,119,6,.08) 0%,transparent 70%);top:42%;left:-90px}
          .socm-bc{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .socm-bc ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:${ac2}}
          .socm-bc li{display:flex;align-items:center;gap:6px}.socm-bc li::after{content:'/';opacity:.45}.socm-bc li:last-child::after{display:none}
          .socm-bc a{color:${txt};text-decoration:none}
          .socm-hero{position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto;padding:44px 40px 28px}
          .socm-ey{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${ac2};margin-bottom:14px}
          .socm-hero h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .socm-desc{font-size:16px;color:${txt2};line-height:1.65;max-width:720px;margin:0 auto 22px}
          .socm-tr{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin-bottom:24px}
          .socm-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:5px 13px;font-size:12px;font-weight:600;color:${txt};box-shadow:0 2px 8px rgba(112,26,117,.07)}
          .socm-dot{width:7px;height:7px;border-radius:50%;background:${ac2};flex-shrink:0}
          .socm-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .socm-p{display:inline-block;padding:13px 34px;background:${ac};color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(112,26,117,.28)}
          .socm-p:hover{background:${txt};transform:translateY(-2px)}
          .socm-g{display:inline-block;padding:13px 34px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:${txt};font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .socm-g:hover{background:rgba(255,255,255,.85);border-color:rgba(112,26,117,.5);transform:translateY(-2px)}
          .socm-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:920px;margin:26px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(112,26,117,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .socm-sc{padding:18px 16px;text-align:center;border-right:1px solid rgba(112,26,117,.10)}.socm-sc:last-child{border-right:none}
          .socm-sv{font-size:28px;font-weight:900;color:${ac2};letter-spacing:-.5px;line-height:1}
          .socm-sl{font-size:11px;color:${txt2};font-weight:500;margin-top:5px}
          .socm-sec{padding:72px 40px;position:relative;z-index:1}
          .socm-sec-alt{background:rgba(253,244,255,.55);border-top:1px solid rgba(112,26,117,.08);border-bottom:1px solid rgba(112,26,117,.08)}
          .socm-in{max-width:1300px;margin:0 auto}
          .socm-sey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .socm-sh{font-size:44px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .socm-sd{font-size:15px;color:${txt2};line-height:1.7;max-width:700px}
          .socm-rv{opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .socm-rv.socm-ok{opacity:1;transform:translateY(0)}
          .socm-sk-g{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
          .socm-card{background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(250,232,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(112,26,117,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1),border-color .2s}
          .socm-card.socm-cv{opacity:1;transform:translateY(0)}.socm-card.socm-cv:hover{transform:translateY(-5px);border-color:rgba(112,26,117,.25);box-shadow:0 14px 40px rgba(112,26,117,.12)}
          .socm-card.feat{border-color:rgba(112,26,117,.18)}
          .socm-cn{position:absolute;top:6px;right:12px;font-size:68px;font-weight:900;line-height:1;color:${ac2};opacity:.05;pointer-events:none;user-select:none}
          .socm-card h3{font-size:15px;font-weight:700;color:${txt};margin:0 0 7px;position:relative;z-index:1}
          .socm-card p{font-size:13px;color:${txt2};line-height:1.65;margin:0;position:relative;z-index:1}
          .socm-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,${ac},${ac2});border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top;transition:transform .3s}
          .socm-card.socm-cv:hover::before{transform:scaleY(1)}
          .socm-sm{text-align:center;margin-top:20px}
          .socm-bm{display:inline-block;background:#fff;border:1.5px solid rgba(112,26,117,.18);color:${txt};padding:9px 28px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .socm-bm:hover{background:${ac};border-color:${ac};color:#fff;transform:translateY(-2px)}
          .socm-tec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
          .socm-tc2{background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(250,232,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:20px 18px;box-shadow:0 4px 24px rgba(112,26,117,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .socm-tc2.socm-sv2{opacity:1;transform:translateY(0)}.socm-tc2.socm-sv2:hover{border-color:rgba(112,26,117,.22);box-shadow:0 12px 36px rgba(112,26,117,.10)}
          .socm-tg{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:10px;padding-bottom:7px;border-bottom:2px solid}
          .socm-pills{display:flex;flex-wrap:wrap;gap:5px}
          .socm-pill{display:inline-block;font-size:11px;font-weight:500;padding:3px 9px;border-radius:100px;border:1px solid}
          .socm-en-g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
          .socm-en{background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(250,232,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(112,26,117,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1),border-color .2s}
          .socm-en.socm-ev{opacity:1;transform:translateY(0)}.socm-en.socm-ev:hover{border-color:rgba(112,26,117,.22);box-shadow:0 14px 44px rgba(112,26,117,.12)}
          .socm-en.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(253,244,255,.45) 100%);border-color:rgba(217,119,6,.26);transform:translateY(-6px)}
          .socm-en.feat.socm-ev{transform:translateY(-6px)}.socm-en.feat.socm-ev:hover{transform:translateY(-10px)}
          .socm-en-b{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:4px 11px;border-radius:100px;border:1px solid;margin-bottom:16px}
          .socm-en-i{width:44px;height:44px;background:rgba(112,26,117,.08);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
          .socm-en.feat .socm-en-i{background:rgba(217,119,6,.10)}
          .socm-en-n{font-size:20px;font-weight:900;color:${txt};margin:0 0 5px;letter-spacing:-.3px}
          .socm-en-h{font-size:13px;font-weight:600;color:${ac};margin-bottom:10px}
          .socm-en.feat .socm-en-h{color:#D97706}
          .socm-en-d{font-size:13px;color:${txt2};line-height:1.7;margin-bottom:14px}
          .socm-en-ll{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${ac};margin-bottom:7px}
          .socm-en-li{list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:6px}
          .socm-en-li li{display:flex;align-items:flex-start;gap:7px;font-size:13px;color:#374151;line-height:1.5}
          .socm-en-li li::before{content:'✓';font-weight:800;color:${ac2};flex-shrink:0;margin-top:1px}
          .socm-en.feat .socm-en-li li::before{color:#D97706}
          .socm-en-tl{font-size:11px;font-weight:600;color:#D97706;display:block;padding-top:10px;border-top:1px solid rgba(112,26,117,.08)}
          .socm-en-a{display:block;margin-top:14px;padding:10px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(112,26,117,.09);color:${txt};border:1.5px solid rgba(112,26,117,.18)}
          .socm-en-a:hover{background:${txt};color:#fff}
          .socm-en.feat .socm-en-a{background:${ac};color:#fff;border-color:${ac}}
          .socm-en.feat .socm-en-a:hover{background:${txt};border-color:${txt}}
          .socm-tg2{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px}
          .socm-tc{background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(250,232,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:26px 22px;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 24px rgba(112,26,117,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
          .socm-tc.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(253,244,255,.42) 100%);border-color:rgba(217,119,6,.20)}
          .socm-tc.socm-tv{opacity:1;transform:translateY(0)}.socm-tc.socm-tv:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(112,26,117,.12)}
          .socm-stars{font-size:15px;color:#D97706;letter-spacing:2px}
          .socm-ttxt{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .socm-au{display:flex;align-items:center;gap:11px}
          .socm-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .socm-an{font-size:14px;font-weight:700;color:${txt}}
          .socm-ar{font-size:12px;color:#6b7280}
          .socm-wy-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:44px}
          .socm-wc{background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(250,232,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:22px 18px;box-shadow:0 4px 24px rgba(112,26,117,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px) scale(.97);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .socm-wc.socm-wv{opacity:1;transform:translateY(0) scale(1)}.socm-wc.socm-wv:hover{transform:translateY(-4px) scale(1);border-color:rgba(112,26,117,.22);box-shadow:0 12px 36px rgba(112,26,117,.10)}
          .socm-wd{width:9px;height:9px;border-radius:50%;background:${ac2};margin-bottom:10px}
          .socm-wc h3{font-size:13px;font-weight:700;color:${txt};margin:0 0 7px;line-height:1.35}
          .socm-wc p{font-size:12px;color:${txt2};line-height:1.6;margin:0}
          .socm-ct{padding:64px 40px;background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.60) 40%,rgba(250,232,255,.50) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .socm-ct-g{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.1fr;gap:28px;align-items:start}
          .socm-cth{font-size:38px;font-weight:900;line-height:1.18;margin:0 0 12px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .socm-ctd{font-size:14px;color:${txt2};line-height:1.6;margin:0 0 18px}
          .socm-ben{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:12px}
          .socm-be{display:flex;gap:9px;align-items:flex-start}
          .socm-bi{flex-shrink:0;color:${ac2};font-weight:800;font-size:15px;margin-top:1px}
          .socm-be p{font-size:13px;color:${txt2};margin:0;line-height:1.5}
          .socm-fb{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(253,244,255,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:18px;padding:30px;box-shadow:0 8px 40px rgba(112,26,117,.08),inset 0 1px 0 rgba(255,255,255,1)}
          .socm-fb h3{font-size:20px;font-weight:700;color:${txt};margin:0 0 20px}
          .socm-form{display:flex;flex-direction:column;gap:12px}
          .socm-fr{display:grid;grid-template-columns:1fr 1fr;gap:11px}
          .socm-fg{display:flex;flex-direction:column;gap:4px}
          .socm-fg.full{grid-column:1/-1}
          .socm-fg label{font-size:12px;font-weight:500;color:${txt}}
          .socm-fg input,.socm-fg textarea,.socm-fg select{padding:10px 12px;border:1px solid rgba(112,26,117,.14);border-radius:6px;font-size:13px;font-family:inherit;color:${txt};background:rgba(255,255,255,.55);transition:border-color .2s}
          .socm-fg input:focus,.socm-fg textarea:focus,.socm-fg select:focus{outline:none;border-color:${ac2};box-shadow:0 0 0 3px rgba(147,51,234,.10)}
          .socm-co{display:flex;gap:8px;align-items:flex-start}
          .socm-co input{margin-top:3px;width:14px;height:14px}
          .socm-co label{font-size:11px;color:${txt2};line-height:1.5}.socm-co a{color:${txt}}
          .socm-sub{width:100%;padding:13px;background:${ac};border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(112,26,117,.25)}
          .socm-sub:hover{background:${txt};transform:translateY(-2px)}
          .socm-fq{padding:72px 40px;background:rgba(253,244,255,.55);border-top:1px solid rgba(112,26,117,.08);position:relative;z-index:1}
          .socm-fq h2{font-size:42px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .socm-fq-sub{font-size:15px;color:${txt2};margin:0 0 32px}
          .socm-fql{display:flex;flex-direction:column;gap:9px}
          .socm-fi{background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(250,232,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(112,26,117,.05);transition:border-color .2s}
          .socm-fi.open{border-color:rgba(112,26,117,.28)}.socm-fi.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,${ac},${ac2});border-radius:3px 3px 0 0}
          .socm-fqb{width:100%;background:none;border:none;padding:18px 18px 18px 52px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:12px;font-family:inherit;position:relative}
          .socm-fqn{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:rgba(112,26,117,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:5px}
          .socm-fi.open .socm-fqn{background:${ac};color:#fff}
          .socm-fqb span{font-size:14px;font-weight:600;color:${txt};line-height:1.4}.socm-fi.open .socm-fqb span{color:${ac2}}
          .socm-fch{width:20px;height:20px;flex-shrink:0;color:#9ca3af;transition:transform .3s}.socm-fi.open .socm-fch{transform:rotate(180deg);color:${ac2}}
          .socm-faw{overflow:hidden;transition:max-height .35s ease;max-height:0}.socm-fi.open .socm-faw{max-height:400px}
          .socm-fa{padding:0 18px 18px 52px;font-size:14px;color:#4b5563;line-height:1.8}
          .socm-rel{padding:64px 40px;background:rgba(253,244,255,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .socm-ri{max-width:1300px;margin:0 auto;text-align:center}
          .socm-ri h2{font-size:30px;font-weight:900;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 10px}
          .socm-ri hr{border:none;border-top:1px solid rgba(112,26,117,.10);margin:24px 0}
          .socm-rts{display:flex;flex-wrap:wrap;justify-content:center;gap:9px}
          .socm-rt{display:inline-block;padding:9px 18px;border:1.5px solid;border-radius:50px;font-size:13px;font-weight:500;text-decoration:none;transition:all .22s}
          .socm-rt:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.08)}
          .socm-ra{background:rgba(112,26,117,.09);border-color:rgba(112,26,117,.28);color:#701a75}
          .socm-rb{background:rgba(45,27,105,.09);border-color:rgba(45,27,105,.28);color:#2d1b69}
          .socm-rc{background:rgba(120,53,15,.09);border-color:rgba(120,53,15,.28);color:#78350f}
          .socm-rd{background:rgba(20,83,45,.09);border-color:rgba(20,83,45,.28);color:#14532d}
          @media(max-width:1024px){.socm-hero h1,.socm-sh,.socm-fq h2{font-size:34px}.socm-sk-g{grid-template-columns:repeat(2,1fr)}.socm-tec-g{grid-template-columns:repeat(2,1fr)}.socm-en-g{grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto}.socm-en.feat{transform:none}.socm-en.feat.socm-ev{transform:none}.socm-en.feat.socm-ev:hover{transform:translateY(-4px)}.socm-wy-g{grid-template-columns:repeat(2,1fr)}.socm-tg2{grid-template-columns:1fr}.socm-ct-g{grid-template-columns:1fr}}
          @media(max-width:768px){.socm-bc,.socm-hero,.socm-sec,.socm-ct,.socm-fq,.socm-rel{padding-left:20px;padding-right:20px}.socm-hero{padding-top:28px;padding-bottom:16px}.socm-hero h1{font-size:26px}.socm-stats{grid-template-columns:1fr 1fr}.socm-sc:nth-child(2){border-right:none}.socm-sc:nth-child(3),.socm-sc:nth-child(4){border-top:1px solid rgba(112,26,117,.10)}.socm-sc:nth-child(4){border-right:none}.socm-sk-g,.socm-tec-g,.socm-wy-g{grid-template-columns:1fr}.socm-fr{grid-template-columns:1fr}.socm-cth{font-size:26px}}
        `}</style>
      </Head>
      <div className="socm-page">
        <div className="socm-orb socm-o1" /><div className="socm-orb socm-o2" /><div className="socm-orb socm-o3" />
        <nav className="socm-bc" aria-label="Breadcrumb"><ol itemScope itemType="https://schema.org/BreadcrumbList"><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li><li><span>Industries</span></li><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">Social Media App Development</span><meta itemProp="position" content="3" /></li></ol></nav>
        <section className="socm-hero">
          <span className="socm-ey">Social Media Industry</span>
          <h1>Social Media App Development Company — Niche Social Networks, Creator Platforms & Community Apps</h1>
          <p className="socm-desc">Custom social media and community app development — niche social networks, short-form video platforms (Reels/TikTok-style), creator monetisation tools, fan engagement apps, social commerce, real-time messaging, and AI-assisted content moderation. 55+ social app projects. 15+ years.</p>
          <div className="socm-tr">{['Niche Social Network','Short-Form Video','Creator Monetisation','Social Commerce','Content Moderation'].map(b => (<div className="socm-badge" key={b}><span className="socm-dot" />{b}</div>))}</div>
          <div className="socm-ctas"><Link href="#contact" className="socm-p">Discuss Your Social Platform</Link><Link href="#solutions" className="socm-g">View Solutions →</Link></div>
        </section>
        <div className="socm-stats" ref={stR}>{[['55+','Social App Projects'],['15+','Years Dev Experience'],['61%','Avg DAU Time Increase'],['99.9%','Platform Uptime SLA']].map(([v, l]) => <StatItem key={l} label={l} val={v} started={ss} />)}</div>
        <section id="solutions" className="socm-sec"><div className="socm-in"><div className={`socm-rv${vis.has('sk') ? ' socm-ok' : ''}`} ref={el => { secR.current['sk'] = el; }}><span className="socm-sey">Social Media Solutions</span><h2 className="socm-sh">What We Build for Social Platforms</h2><p className="socm-sd">Niche social networks, short-form video, creator monetisation, fan engagement, social commerce, messaging, content moderation, live streaming, social graph, and analytics dashboards.</p></div><div className="socm-sk-g" ref={skR}>{visS.map((s, i) => (<div key={s.n} className={`socm-card${s.feat ? ' feat' : ''}${vSk.includes(i) ? ' socm-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="socm-cn">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}</div>{SOLUTIONS.length > 6 && <div className="socm-sm"><button className="socm-bm" onClick={() => setShowAll(p => !p)}>{showAll ? 'Show fewer ↑' : `Show all ${SOLUTIONS.length} solutions ↓`}</button></div>}</div></section>
        <section className="socm-sec socm-sec-alt"><div className="socm-in"><div className={`socm-rv${vis.has('stk') ? ' socm-ok' : ''}`} ref={el => { secR.current['stk'] = el; }}><span className="socm-sey">Technology Stack</span><h2 className="socm-sh">Social Media Technology We Use</h2><p className="socm-sd">React Native, Redis fan-out feed architecture, Kafka event streaming, FFmpeg video pipeline, Stripe Connect creator payouts, AWS Rekognition moderation, and the full social tech stack.</p></div><div className="socm-tec-g" ref={stGr}>{TECH_STACK.map((g, i) => (<div key={g.group} className={`socm-tc2${vSt.includes(i) ? ' socm-sv2' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="socm-tg" style={{ color: g.color, borderBottomColor: g.color + '33' }}>{g.group}</div><div className="socm-pills">{g.items.map(it => <span key={it} className="socm-pill" style={{ color: g.color, background: g.color + '12', borderColor: g.color + '30' }}>{it}</span>)}</div></div>))}</div></div></section>
        <section className="socm-sec"><div className="socm-in"><div className={`socm-rv${vis.has('eng') ? ' socm-ok' : ''}`} ref={el => { secR.current['eng'] = el; }}><span className="socm-sey">Engagement Models</span><h2 className="socm-sh">How We Work with Social Platforms</h2><p className="socm-sd">Full social platform build, short-form video feature addition, or content moderation system — matched to your stage and growth ambitions.</p></div><div className="socm-en-g" ref={enR}>{ENGAGEMENT.map((m, i) => (<div key={m.id} className={`socm-en${m.feat ? ' feat' : ''}${vEn.includes(i) ? ' socm-ev' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><span className="socm-en-b" style={{ color: m.bc, borderColor: m.bc + '44', background: m.bc + '14' }}>{m.badge}</span><div className="socm-en-i"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={m.feat ? '#D97706' : ac2} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={m.icon} /></svg></div><div className="socm-en-n">{m.name}</div><div className="socm-en-h">{m.headline}</div><div className="socm-en-d">{m.desc}</div><div className="socm-en-ll">Best for</div><ul className="socm-en-li">{m.best.map(b => <li key={b}>{b}</li>)}</ul><span className="socm-en-tl">{m.tl}</span><Link href="#contact" className="socm-en-a">Get a free estimate →</Link></div>))}</div></div></section>
        <section className="socm-sec socm-sec-alt"><div className="socm-in"><div className={`socm-rv${vis.has('ts') ? ' socm-ok' : ''}`} ref={el => { secR.current['ts'] = el; }}><span className="socm-sey">Client Outcomes</span><h2 className="socm-sh">Social Media Clients</h2><p className="socm-sd">Founders and product leaders on building social platforms with 1Solutions.</p></div><div className="socm-tg2" ref={teR}>{TESTIMONIALS.map((t, i) => (<div key={i} className={`socm-tc${t.feat ? ' feat' : ''}${vTe.includes(i) ? ' socm-tv' : ''}`} style={{ transitionDelay: `${i * 90}ms` }} itemScope itemType="https://schema.org/Review"><div className="socm-stars">★★★★★</div><p className="socm-ttxt" itemProp="reviewBody">{t.text}</p><div className="socm-au"><div className="socm-av" style={{ background: t.bg }}>{t.init}</div><div><div className="socm-an" itemProp="author">{t.name}</div><div className="socm-ar">{t.role}</div></div></div></div>))}</div></div></section>
        <section className="socm-sec"><div className="socm-in"><div className={`socm-rv${vis.has('wy') ? ' socm-ok' : ''}`} ref={el => { secR.current['wy'] = el; }}><span className="socm-sey">Why 1Solutions</span><h2 className="socm-sh">Why Social Platforms Choose 1Solutions</h2><p className="socm-sd">55+ social projects — feed architecture at scale, video pipeline depth, creator monetisation, trust and safety engineering, real-time messaging, and mobile-first performance.</p></div><div className="socm-wy-g" ref={whR}>{WHY.map((c, i) => (<div key={i} className={`socm-wc${vWh.includes(i) ? ' socm-wv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="socm-wd" /><h3>{c.t}</h3><p>{c.d}</p></div>))}</div></div></section>
        <section id="contact" className="socm-ct"><div className="socm-ct-g"><div><h2 className="socm-cth">Build Your Social Media App</h2><p className="socm-ctd">Share your social platform requirements and we will respond within 24 hours with a proposal, architecture recommendation, and team composition.</p><div className="socm-ben">{[['✓','Technical proposal within 24–48 hours'],['✓','Social feed, video, and creator economy specialists'],['✓','NDA signed before any technical discussions'],['✓','55+ social apps — networks, video, communities, commerce'],['✓','Mobile-first, scalable feed architecture, SLA-backed']].map(([ic, tx]) => (<div className="socm-be" key={tx}><span className="socm-bi">{ic}</span><p>{tx}</p></div>))}</div></div>
        <div className="socm-fb"><h3>Tell Us About Your Social Platform</h3><form className="socm-form" onSubmit={e => e.preventDefault()}><div className="socm-fr"><div className="socm-fg"><label>Full Name *</label><input type="text" placeholder="Your name" required /></div><div className="socm-fg"><label>Work Email *</label><input type="email" placeholder="you@company.com" required /></div></div><div className="socm-fr"><div className="socm-fg"><label>Company</label><input type="text" placeholder="Company name" /></div><div className="socm-fg"><label>Phone / WhatsApp</label><input type="tel" placeholder="+1 555 000 0000" /></div></div><div className="socm-fg full"><label>Type of Social Platform *</label><select required><option value="">Select...</option><option>Niche Social Network</option><option>Short-Form Video App (Reels/TikTok-style)</option><option>Creator Monetisation Platform</option><option>Fan Engagement & Community App</option><option>Social Commerce Platform</option><option>Real-Time Messaging / Group Chat</option><option>Content Moderation System</option><option>Live Streaming & Rooms</option><option>Social Graph & Recommendation Engine</option><option>Social Analytics Dashboard</option><option>Other</option></select></div><div className="socm-fg full"><label>Project Description *</label><textarea rows={4} placeholder="Describe your social platform — target community or audience, core features, monetisation model, expected user scale, and go-live timeline..." required /></div><div className="socm-co"><input type="checkbox" required /><label>I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label></div><button type="submit" className="socm-sub">Get a Social Platform Proposal →</button></form></div></div></section>
        <section className="socm-fq"><div className="socm-in" style={{ maxWidth: 840 }}><span className="socm-sey">FAQ</span><h2>Social Media App — FAQ</h2><p className="socm-fq-sub">Social feed architecture, short-form video, creator monetisation, content moderation, and real-time messaging questions answered.</p><div className="socm-fql">{FAQS.map((f, i) => (<div key={i} className={`socm-fi${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="socm-fqb" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="socm-fqn">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{f.q}</span><svg className="socm-fch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="socm-faw"><div className="socm-fa" itemProp="text">{f.a}</div></div></div>))}</div></div></section>
        <section className="socm-rel"><div className="socm-ri"><span className="socm-sey">Related Services</span><h2>Related Industry & Technology Services</h2><hr /><div className="socm-rts">{[['/entertainment-software-development/','Entertainment Software','socm-ra'],['/mobile-app-development/','Mobile App Development','socm-rb'],['/retail-ecommerce-software-development/','Retail & eCommerce','socm-rc'],['/saas-application-development-company/','SaaS Development','socm-rd'],['/it-outsourcing-services/','IT Outsourcing','socm-ra'],['/offshore-development-company/','Offshore Development','socm-rb'],['/ai-ml-development/','AI/ML Development','socm-rc'],['/web-development/','Web Development','socm-rd']].map(([hr, lb, cl]) => (<Link key={hr} href={hr} className={`socm-rt ${cl}`}>{lb}</Link>))}</div></div></section>
      </div>
    </>
  );
}
