'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Search Engine Optimisation (SEO)', desc:'Technical SEO, on-page optimisation, link building, and content strategy to rank on page one and drive compounding organic traffic.', featured:true },
  { n:'02', title:'Google Ads / PPC Management', desc:'Data-driven paid search campaigns with continuous A/B testing, negative keyword pruning, and ROAS-focused bid strategies.', featured:false },
  { n:'03', title:'Meta Ads (Facebook & Instagram)', desc:'Audience-first social advertising — from prospecting campaigns to retargeting funnels — built to maximise reach and conversion.', featured:false },
  { n:'04', title:'LinkedIn Ads Management', desc:'B2B lead generation via sponsored content, InMail campaigns, and account-based targeting to reach decision-makers at scale.', featured:false },
  { n:'05', title:'Content Marketing', desc:'Long-form articles, pillar pages, infographics, and thought-leadership content engineered to earn rankings and build authority.', featured:false },
  { n:'06', title:'Email Marketing & Automation', desc:'Lifecycle email campaigns, drip sequences, and marketing automation that nurture leads and drive repeat revenue.', featured:false },
  { n:'07', title:'Conversion Rate Optimisation (CRO)', desc:'Heatmaps, session recordings, A/B tests, and UX audits that turn existing traffic into more leads and sales.', featured:false },
  { n:'08', title:'Social Media Marketing', desc:'Organic social strategy, content calendars, community management, and performance reporting across all major platforms.', featured:false },
  { n:'09', title:'Local SEO & Google Business Profile', desc:'Dominate local search with citation building, GBP optimisation, review management, and hyperlocal content strategies.', featured:false },
  { n:'10', title:'eCommerce Marketing', desc:'Google Shopping, Performance Max, Amazon DSP, and marketplace SEO tailored for DTC and multi-channel eCommerce brands.', featured:false },
  { n:'11', title:'Analytics & Performance Reporting', desc:'GA4 setup, conversion tracking, custom dashboards, and monthly executive reports that tie marketing spend to revenue.', featured:false },
  { n:'12', title:'Remarketing & Retargeting', desc:'Cross-channel retargeting on Google, Meta, and programmatic networks to re-engage visitors and reduce cart abandonment.', featured:false },
];

const FAQS = [
  { q:'How much does digital marketing cost?', a:'Our digital marketing packages start from $800/month for focused single-channel campaigns (e.g. SEO or Google Ads) and scale to $5,000+/month for full-funnel, multi-channel programmes. Pricing depends on channels, ad spend managed, content volume, and reporting complexity. We provide a custom proposal after a free discovery call — no lock-in contracts for the first 3 months.' },
  { q:'How long before I see results from SEO?', a:'SEO is a compounding channel. Most clients see measurable ranking improvements within 90 days, meaningful traffic lifts within 4–6 months, and strong ROI by month 8–12. Paid channels (Google Ads, Meta) can drive traffic within days of launch. We set realistic timelines upfront and provide monthly reports so you always know exactly where you stand.' },
  { q:'Do you work with clients in the US, Canada, and Australia?', a:'Yes — 100% of our delivery is remote. We've been partnering with businesses in the US, Canada, and Australia since 2008. We schedule calls in your time zone, use Slack and Loom for async updates, and assign a dedicated account manager as your single point of contact throughout the engagement.' },
  { q:'What makes your approach different from other digital marketing agencies?', a:'Three things: data obsession, channel integration, and full transparency. Every recommendation we make is backed by data — we never rely on gut feel. We integrate channels (SEO + content + paid + email) so they compound rather than run in silos. And we share every metric — GA4 dashboards, ad account access, and honest monthly reports — so you always own your data.' },
  { q:'Can you manage both organic and paid channels together?', a:'Yes, and we actively recommend it. Our strongest results come when SEO content informs paid keyword strategy, high-performing ads feed CRO insights, and email nurtures the leads paid channels generate. We offer integrated growth programmes that connect all channels under one strategy and one reporting view.' },
  { q:'Do you offer one-off audits or only retainer services?', a:'Both. We offer standalone SEO audits, Google Ads account audits, and analytics audits as fixed-price engagements. These are ideal if you want an independent expert review before committing to a retainer, or if you have an internal team that needs strategic direction. Audits start from $500 and are delivered within 10 business days.' },
  { q:'What reporting do clients receive?', a:'Monthly executive reports covering traffic, rankings, leads, cost-per-acquisition, and revenue attribution. Paid campaigns get weekly performance summaries. All clients get access to a live GA4 + Looker Studio dashboard. We also hold monthly strategy calls to review results and plan the next sprint — no passive reporting, active optimisation.' },
  { q:'Will you work with our existing website or do we need a redesign?', a:'We work with your existing site in most cases. Our process starts with a technical audit to identify CRO and SEO blockers. Minor fixes are handled within the retainer; larger development changes are quoted separately. If a redesign is genuinely needed for performance, we'll say so clearly — we won't push unnecessary work.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'15+ Years of Digital Marketing Experience', desc:'Since 2008, we\'ve run campaigns for 300+ businesses across US, Canada, and Australia — from funded startups to Fortune 500 brands.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>, title:'Dedicated Account Manager', desc:'One expert who owns your account, knows your business, and proactively brings ideas — not a ticket queue or rotating junior team.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'Integrated Multi-Channel Strategy', desc:'SEO, paid, content, and email working together under one strategy — not siloed services that contradict each other.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'Western Market Specialists', desc:'We understand US, Canadian, and Australian buyer behaviour, compliance expectations, and platform nuances — not generic global delivery.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>, title:'Full Funnel Attribution', desc:'GA4, conversion tracking, and custom Looker Studio dashboards that show exactly which channels drive revenue — no vanity metrics.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Your Data, Always Yours', desc:'You own all ad accounts, analytics properties, and content assets. We never hold data hostage if you decide to part ways.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'No Long-Term Lock-In', desc:'Month-to-month engagements after the initial 3-month onboarding. We earn your renewal every month with results, not contracts.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'Always-On Optimisation', desc:'We don\'t set and forget. Campaigns are reviewed weekly, content is updated monthly, and strategies adapt to algorithm changes in real time.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numTarget = parseInt(target.replace(/\D/g, ''), 10);
    if (!numTarget) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function AnimatedStat({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  const hasComma = val.includes(',');
  const display = started ? (hasComma ? num.toLocaleString() : num) + suffix : val;
  return (
    <div className="dm-stat-col">
      <div className="dm-stat-label">{label}</div>
      <div className="dm-stat-value">{display}</div>
    </div>
  );
}

export default function DigitalMarketingPage() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const [visibleECards, setVisibleECards] = useState([]);
  const stepRefs = useRef([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);
  const eCardsRef = useRef(null);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleSteps(prev => prev.includes(i) ? prev : [...prev, i]), i * 150);
            obs.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!whyGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          WHY.forEach((_, i) => {
            setTimeout(() => setVisibleWhyCards(prev => prev.includes(i) ? prev : [...prev, i]), i * 100);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(whyGridRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!testiGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0,1,2].forEach(i => setTimeout(() => setVisibleTestiCards(p => p.includes(i)?p:[...p,i]), i * 150));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(testiGridRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!eCardsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0,1,2,3].forEach(i => setTimeout(() => setVisibleECards(p => p.includes(i)?p:[...p,i]), i * 130));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(eCardsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, key]));
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const visibleServices = showAll ? SERVICES : SERVICES.slice(0, 8);

  return (
    <>
      <Head>
        <title>Digital Marketing Agency | SEO, PPC & Social Media Marketing | 1Solutions</title>
        <meta name="description" content="1Solutions is a results-driven digital marketing agency with 15+ years experience. We deliver SEO, Google Ads, Meta Ads, content marketing, and email automation for US, Canada & Australia businesses." />
        <meta name="keywords" content="digital marketing agency, SEO services, PPC management, Google Ads, Meta Ads, content marketing, email marketing, social media marketing" />
        <link rel="canonical" href="https://www.1solutions.biz/digital-marketing/" />
        <meta property="og:title" content="Digital Marketing Agency | 1Solutions" />
        <meta property="og:description" content="Data-driven SEO, PPC, and content strategies that deliver measurable growth. We maximise your ROI across every digital channel." />
        <meta property="og:url" content="https://www.1solutions.biz/digital-marketing/" />
        <style>{`
          .dm-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #ecfdf5 0%, #dbeafe 25%, #fef3c7 55%, #fce7f3 80%, #ede9fe 100%);
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .dm-page *, .dm-page *::before, .dm-page *::after { box-sizing: border-box; }

          /* Orbs */
          .dm-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.28) 0%,rgba(99,130,255,0.12) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .dm-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.28) 0%,rgba(245,158,11,0.12) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .dm-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,0.18) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* Hero */
          .dm-hero-block { background:transparent;position:relative;overflow:hidden; }
          .dm-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.14) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .dm-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.16) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .dm-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .dm-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#065F46;margin-bottom:18px; }
          .dm-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#065F46 0%,#D97706 60%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .dm-hero-content p { font-size:16px;color:#374151;line-height:1.65;max-width:640px;margin:0 auto 28px; }
          .dm-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#065F46;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(6,95,70,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .dm-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);box-shadow:0 12px 36px rgba(6,95,70,0.18),0 0 0 2px rgba(245,158,11,0.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#065F46; }

          /* Stats bar */
          .dm-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(6,95,70,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .dm-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(6,95,70,0.10); }
          .dm-stat-col:last-child { border-right:none; }
          .dm-stat-label { font-size:12px;color:#374151;font-weight:500;margin-bottom:6px; }
          .dm-stat-value { font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1; }

          /* Clients */
          .dm-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .dm-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .dm-clients-logos { width:100%;overflow:hidden; }
          .dm-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:dm-marquee 28s linear infinite; }
          .dm-logos-track:hover { animation-play-state:paused; }
          @keyframes dm-marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
          .dm-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .dm-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Shared section styles */
          .dm-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#059669;margin-bottom:12px;display:block; }
          .dm-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#065F46 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .dm-section-desc { font-size:15px;color:#374151;line-height:1.7;max-width:680px;margin-bottom:36px; }

          /* Services */
          .dm-services-section { background:#f0fdf4;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(6,95,70,0.10),0 -4px 16px rgba(6,95,70,0.06); }
          .dm-services-inner { max-width:1280px;margin:0 auto; }
          .dm-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .dm-service-card { background:linear-gradient(135deg,rgba(209,250,229,0.55) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(6,95,70,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .dm-service-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(6,95,70,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .dm-service-card.featured { background:linear-gradient(135deg,rgba(209,250,229,0.60) 0%,rgba(255,255,255,0.90) 55%,rgba(254,243,199,0.40) 100%);border-color:rgba(5,150,105,0.20);box-shadow:0 6px 32px rgba(5,150,105,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .dm-service-card:hover .dm-card-num { color:#D97706;opacity:0.12; }
          .dm-service-card:hover h3 { color:#059669; }
          .dm-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#065F46;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .dm-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .dm-service-card p { font-size:13px;color:#374151;line-height:1.6;position:relative;z-index:1; }
          .dm-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#059669,#34d399);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .dm-service-card:hover::before { transform:scaleY(1); }
          .dm-services-footer { text-align:center;margin-top:20px; }
          .dm-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(6,95,70,0.20);color:#065F46;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(6,95,70,0.08);font-family:inherit; }
          .dm-btn-show-more:hover { background:#065F46;border-color:#065F46;color:#ffffff;box-shadow:0 8px 28px rgba(6,95,70,0.20);transform:translateY(-2px); }

          /* Channels section */
          .dm-channels-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .dm-channels-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(6,95,70,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .dm-channels-header { display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:40px;gap:24px;flex-wrap:wrap; }
          .dm-channels-title { font-size:38px;font-weight:900;line-height:1.15;letter-spacing:-0.8px;background:linear-gradient(90deg,#065F46 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0; }
          .dm-channels-sub { font-size:15px;color:#374151;line-height:1.7;max-width:480px;margin:0; }
          .dm-channels-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
          .dm-channel-card { background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(6,95,70,0.12);border-radius:14px;padding:24px 22px;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .dm-channel-card:hover { transform:translateY(-4px);border-color:rgba(217,119,6,0.5);box-shadow:0 12px 40px rgba(0,0,0,0.10); }
          .dm-channel-icon { width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:14px; }
          .dm-channel-icon svg { width:24px;height:24px; }
          .dm-channel-card h3 { font-size:16px;font-weight:700;color:#065F46;margin:0 0 8px; }
          .dm-channel-card p { font-size:13px;color:#374151;line-height:1.6;margin:0; }

          /* Process */
          .dm-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .dm-process-top { max-width:1280px;margin:0 auto 56px; }
          .dm-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#059669;margin:0 0 14px; }
          .dm-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#065F46 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .dm-process-main-desc { font-size:15px;color:#374151;line-height:1.7;margin:0; }
          .dm-process-divider { border:none;border-top:1px solid rgba(6,95,70,0.15);margin:36px 0 0;width:100%; }
          .dm-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .dm-process-steps { display:flex;flex-direction:column; }
          .dm-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .dm-pstep.visible { opacity:1;transform:translateY(0); }
          .dm-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .dm-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(6,95,70,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#065F46;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .dm-pstep:hover .dm-pstep-circle { background:rgba(5,150,105,0.15);border-color:#059669;color:#059669; }
          .dm-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .dm-pstep-arrow::before { content:'';width:2px;flex:1;background:#065F46;opacity:0.25; }
          .dm-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #065F46;opacity:0.45;margin-top:-1px; }
          .dm-pstep:last-child .dm-pstep-arrow { display:none; }
          .dm-pstep-content { padding:4px 0 44px; }
          .dm-pstep:last-child .dm-pstep-content { padding-bottom:0; }
          .dm-pstep-title { font-size:22px;font-weight:700;color:#065F46;margin:0 0 10px;line-height:1.2; }
          .dm-pstep-desc { font-size:15px;color:#374151;line-height:1.75;margin:0; }
          .dm-process-image-col { position:sticky;top:100px;min-width:0; }
          .dm-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(6,95,70,0.15);aspect-ratio:4/5;background:#d1fae5; }
          .dm-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Testimonials */
          .dm-testi-section { background:#f0fdf4;border-top:1px solid rgba(6,95,70,0.08);border-bottom:1px solid rgba(6,95,70,0.08);padding:80px 40px;position:relative;z-index:1; }
          .dm-testi-inner { max-width:1280px;margin:0 auto; }
          .dm-section-header-center { text-align:center;margin-bottom:52px; }
          .dm-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .dm-tcard { background:linear-gradient(135deg,rgba(209,250,229,0.55) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(6,95,70,0.07),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .dm-tcard.dm-tcard-visible { opacity:1;transform:translateY(0); }
          .dm-tcard:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(6,95,70,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .dm-tcard.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.88) 55%,rgba(209,250,229,0.40) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .dm-tcard-stars { font-size:18px;color:#D97706;letter-spacing:2px; }
          .dm-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .dm-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .dm-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .dm-tcard-name { font-size:14px;font-weight:700;color:#065F46; }
          .dm-tcard-role { font-size:12px;color:#6b7280; }
          .dm-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(209,250,229,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(219,234,254,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(6,95,70,0.07),inset 0 1px 0 rgba(255,255,255,0.95); }
          .dm-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .dm-tstat-num { font-size:28px;font-weight:800;color:#065F46; }
          .dm-tstat-label { font-size:13px;color:#374151;font-weight:500; }
          .dm-tstat-divider { width:1px;height:40px;background:rgba(6,95,70,0.15); }

          /* Why */
          .dm-why-section { padding:80px 40px;background:#f0fdf4;border-top:1px solid rgba(6,95,70,0.08);border-bottom:1px solid rgba(6,95,70,0.08);position:relative;z-index:1; }
          .dm-why-inner { max-width:1280px;margin:0 auto; }
          .dm-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .dm-why-card { background:linear-gradient(135deg,rgba(209,250,229,0.55) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(6,95,70,0.07),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s; }
          .dm-why-card.dm-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .dm-why-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(6,95,70,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .dm-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .dm-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .dm-why-icon svg { width:28px;height:28px;fill:#059669; }
          .dm-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .dm-why-card p { font-size:13px;color:#374151;line-height:1.7;margin:0; }

          /* Engagement models */
          .dm-engage-section { background:#f0fdf4;border-top:1px solid rgba(6,95,70,0.08);border-bottom:1px solid rgba(6,95,70,0.08);padding:80px 40px;position:relative;z-index:1; }
          .dm-engage-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch; }
          .dm-engage-left { position:sticky;top:100px;display:flex;flex-direction:column; }
          .dm-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#065F46 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .dm-engage-desc { font-size:15px;color:#374151;line-height:1.75;margin:0 0 32px; }
          .dm-engage-img-wrap { border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(6,95,70,0.15);flex:1;min-height:300px; }
          .dm-engage-img-wrap img { width:100%;height:100%;min-height:300px;object-fit:cover;display:block; }
          .dm-engage-right { display:flex;flex-direction:column;gap:16px; }
          .dm-ecard { background:linear-gradient(135deg,rgba(209,250,229,0.55) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(6,95,70,0.07),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.3s,box-shadow 0.3s; }
          .dm-ecard.dm-ecard-visible { opacity:1;transform:translateX(0); }
          .dm-ecard:hover { border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(6,95,70,0.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateX(4px); }
          .dm-ecard-header { display:flex;align-items:center;gap:14px;margin-bottom:10px; }
          .dm-ecard-icon { width:44px;height:44px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .dm-ecard-icon svg { width:26px;height:26px;stroke:#059669;fill:none; }
          .dm-ecard-title { font-size:18px;font-weight:700;color:#065F46;margin:0; }
          .dm-ecard-desc { font-size:14px;color:#374151;line-height:1.65;margin:0 0 16px; }
          .dm-ecard-features { display:grid;grid-template-columns:1fr 1fr;gap:8px 16px; }
          .dm-efeat { display:flex;align-items:center;gap:8px;font-size:13px;color:#065F46;font-weight:500; }
          .dm-efeat-check { color:#059669;font-size:12px;flex-shrink:0; }

          /* Contact */
          .dm-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(209,250,229,0.65) 0%,rgba(255,255,255,0.60) 40%,rgba(254,243,199,0.60) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .dm-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .dm-contact-left { padding:0;align-self:start; }
          .dm-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#065F46 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .dm-contact-desc { font-size:14px;color:#374151;line-height:1.6;margin:0 0 24px; }
          .dm-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(209,250,229,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .dm-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .dm-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .dm-benefit-icon { width:20px;height:20px;color:#059669;stroke:#059669;stroke-width:1.75; }
          .dm-benefit-item p { font-size:13px;color:#374151;margin:0;line-height:1.5; }
          .dm-stats-box { padding-top:32px;border-top:1px solid rgba(6,95,70,0.12); }
          .dm-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .dm-stat-number { font-size:40px;font-weight:900;color:#065F46;line-height:1;display:inline-block;margin-bottom:4px; }
          .dm-stat-text { font-size:13px;color:#374151;line-height:1.4;font-weight:500; }
          .dm-contact-right { align-self:start; }
          .dm-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(209,250,229,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(6,95,70,0.08),inset 0 1px 0 rgba(255,255,255,1); }
          .dm-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .dm-contact-form { display:flex;flex-direction:column;gap:16px; }
          .dm-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .dm-form-group { display:flex;flex-direction:column;gap:6px; }
          .dm-form-group.full { grid-column:1/-1; }
          .dm-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .dm-form-group input,.dm-form-group textarea,.dm-form-group select { padding:10px 14px;border:1px solid rgba(6,95,70,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(6,95,70,0.06);transition:border-color 0.2s,background 0.2s; }
          .dm-form-group input:focus,.dm-form-group textarea:focus { outline:none;border-color:#059669;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(5,150,105,0.12); }
          .dm-phone-input { display:flex;border:1px solid rgba(6,95,70,0.15);border-radius:6px;overflow:hidden; }
          .dm-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .dm-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .dm-phone-input input:focus { outline:none; }
          .dm-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .dm-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .dm-consent label { font-size:11px;color:#374151;line-height:1.5;margin:0; }
          .dm-consent a { color:#065F46;text-decoration:none; }
          .dm-submit-btn { padding:14px 28px;background:rgba(6,95,70,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(6,95,70,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .dm-submit-btn:hover { background:rgba(6,95,70,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }

          /* FAQ */
          .dm-faq-section { padding:80px 40px;background:#f0fdf4;border-top:1px solid rgba(6,95,70,0.08);position:relative;z-index:1; }
          .dm-faq-inner { max-width:1280px;margin:0 auto; }
          .dm-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#065F46 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .dm-faq-list { display:flex;flex-direction:column;gap:12px; }
          .dm-faq-item { background:linear-gradient(135deg,rgba(209,250,229,0.55) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(6,95,70,0.06),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .dm-faq-item.open { border-color:rgba(5,150,105,0.35);box-shadow:0 8px 32px rgba(6,95,70,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .dm-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#059669;border-radius:3px 0 0 3px; }
          .dm-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .dm-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(6,95,70,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .dm-faq-item.open .dm-faq-q-badge { background:#059669;color:#fff; }
          .dm-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .dm-faq-item.open .dm-faq-question span { color:#059669; }
          .dm-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .dm-faq-item.open .dm-faq-chevron { transform:rotate(180deg);color:#059669; }
          .dm-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .dm-faq-item.open .dm-faq-answer-wrap { max-height:400px; }
          .dm-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }

          /* Related */
          .dm-related-section { background:rgba(209,250,229,0.20);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .dm-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .dm-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#374151;margin:0 0 14px;display:block; }
          .dm-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#065F46 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .dm-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .dm-related-divider { border:none;border-top:1px solid rgba(6,95,70,0.12);margin:40px 0; }
          .dm-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .dm-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .dm-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .dm-rtag-green   { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.30);color:#065F46; }
          .dm-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .dm-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .dm-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .dm-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .dm-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .dm-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .dm-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }

          /* Shimmer CTA */
          .dm-btn-hero-shimmer { position:relative;overflow:hidden; }
          .dm-btn-hero-shimmer::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:dm-shimmer-sweep 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes dm-shimmer-sweep { 0% { left:-120%; } 35%,100% { left:160%; } }

          /* Section fade-up */
          .dm-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .dm-section-reveal.dm-revealed { opacity:1;transform:translateY(0); }

          /* Mobile */
          @media (max-width:900px) {
            .dm-page { background:linear-gradient(160deg,#ecfdf5 0%,#dbeafe 30%,#fef3c7 60%,#fce7f3 85%,#ede9fe 100%) !important; }
          }
          @media (max-width:1024px) {
            .dm-hero-content h1 { font-size:40px; }
            .dm-services-grid { grid-template-columns:repeat(2,1fr); }
            .dm-why-grid { grid-template-columns:repeat(2,1fr); }
            .dm-channels-grid { grid-template-columns:repeat(2,1fr); }
            .dm-engage-inner { grid-template-columns:1fr; }
            .dm-engage-left { position:static; }
            .dm-process-inner { grid-template-columns:1fr; }
            .dm-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .dm-page { overflow-x:hidden; }
            .dm-hero-content { padding:36px 20px 24px; }
            .dm-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .dm-hero-content p { font-size:15px; }
            .dm-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .dm-stat-col { padding:14px 12px; }
            .dm-stat-col:nth-child(2) { border-right:none; }
            .dm-stat-col:nth-child(3) { border-top:1px solid rgba(6,95,70,0.10); }
            .dm-stat-col:nth-child(4) { border-top:1px solid rgba(6,95,70,0.10);border-right:none; }
            .dm-stat-value { font-size:22px; }
            .dm-clients-bar { padding:16px 20px 36px;gap:12px; }
            .dm-client-logo { height:20px; }
            .dm-services-section { padding:48px 20px 40px; }
            .dm-channels-section { padding:48px 16px; }
            .dm-channels-wrap { padding:24px 20px 32px;border-radius:16px; }
            .dm-channels-header { flex-direction:column;gap:14px; }
            .dm-channels-title { font-size:26px; }
            .dm-channels-grid { grid-template-columns:1fr; }
            .dm-process-section { padding:60px 20px; }
            .dm-process-top { margin-bottom:36px; }
            .dm-testi-section { padding:60px 20px; }
            .dm-testi-section .dm-section-header-center { text-align:left; }
            .dm-why-section { padding:60px 20px; }
            .dm-why-section .dm-section-header-center { text-align:left; }
            .dm-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .dm-why-card { padding:24px 20px; }
            .dm-engage-section { padding:60px 20px; }
            .dm-contact-section { padding:48px 16px; }
            .dm-contact-container { grid-template-columns:1fr;gap:20px; }
            .dm-contact-title { font-size:28px; }
            .dm-faq-section { padding:60px 20px; }
            .dm-faq-heading { font-size:26px; }
            .dm-faq-question { padding:18px 18px 18px 52px; }
            .dm-faq-question span { font-size:14px; }
            .dm-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .dm-faq-q-badge { left:14px; }
            .dm-related-section { padding:60px 20px; }
            .dm-related-tags { gap:8px; }
            .dm-rtag { padding:9px 16px;font-size:13px; }
            .dm-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .dm-testi-grid { grid-template-columns:1fr; }
            .dm-section-title,.dm-engage-title,.dm-process-main-title,.dm-related-title { font-size:30px; }
            .dm-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .dm-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(6,95,70,0.10); }
            .dm-tstat:nth-child(odd) { border-right:1px solid rgba(6,95,70,0.10); }
            .dm-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .dm-tstat-divider { display:none; }
            .dm-form-row { grid-template-columns:1fr; }
            .dm-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .dm-stat-number { font-size:28px; }
          }
          @media (max-width:480px) {
            .dm-hero-content h1 { font-size:24px; }
            .dm-section-title,.dm-engage-title,.dm-process-main-title,.dm-related-title { font-size:26px; }
            .dm-services-grid { grid-template-columns:1fr; }
            .dm-service-card { padding:20px 18px 18px; }
            .dm-card-num { font-size:52px; }
            .dm-process-main-title { font-size:24px; }
            .dm-pstep-title { font-size:18px; }
            .dm-channels-title { font-size:22px; }
            .dm-contact-title { font-size:24px; }
            .dm-engage-title { font-size:26px; }
            .dm-tcard { padding:24px 20px; }
            .dm-ecard { padding:20px; }
            .dm-ecard-features { grid-template-columns:1fr; }
            .dm-merged-box { padding:18px; }
          }
        `}</style>
      </Head>

      <div className="dm-page">
        <div className="dm-orb-1" />
        <div className="dm-orb-2" />
        <div className="dm-orb-3" />

        {/* ── HERO ── */}
        <div className="dm-hero-block">
          <div className="dm-hero-content">
            <span className="dm-eyebrow">Award-Winning Digital Marketing Agency</span>
            <h1>Digital Marketing Services — Data-Driven Growth Across Every Channel</h1>
            <p>From SEO and Google Ads to content marketing and email automation, 1Solutions builds integrated digital marketing strategies that drive measurable revenue growth for businesses in the US, Canada, and Australia.</p>
            <Link href="#contact" className="dm-btn-hero dm-btn-hero-shimmer">Get a Free Growth Strategy Call</Link>
          </div>

          <div className="dm-hero-stats" ref={statsRef}>
            {[['Campaigns Managed','300+'],['Avg. ROI Improvement','3.8x'],['Years Experience','15+'],['Client Retention','97%']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="dm-clients-bar">
            <span className="dm-clients-label">Trusted by Leading Brands</span>
            <div className="dm-clients-logos">
              <div className="dm-logos-track">
                {[
                  ['/logo/Indian_Express_Logo_full.png','Indian Express'],
                  ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],
                  ['/logo/Uniphore.jpg','Uniphore'],
                  ['/logo/ICCoLogo.png','ICC'],
                  ['/logo/Honor_Logo_(2020).svg.png','Honor'],
                  ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],
                  ['/logo/Indian_Express_Logo_full.png','Indian Express2'],
                  ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon2'],
                  ['/logo/Uniphore.jpg','Uniphore2'],
                  ['/logo/ICCoLogo.png','ICC2'],
                  ['/logo/Honor_Logo_(2020).svg.png','Honor2'],
                  ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv2'],
                ].map(([src,alt]) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="dm-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="dm-services-section">
          <div className="dm-services-inner">
            <div className={`dm-section-reveal${visibleSections.has('services') ? ' dm-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="dm-section-eyebrow">What We Do</span>
              <h2 className="dm-section-title">Digital Marketing Services We Offer</h2>
              <p className="dm-section-desc">From organic search to paid media and conversion optimisation — every service we offer is designed to grow your revenue, not just your traffic.</p>
            </div>
            <div className="dm-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`dm-service-card${s.featured?' featured':''}`}>
                  <span className="dm-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="dm-services-footer">
              <button className="dm-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show More Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── CHANNELS ── */}
        <section className="dm-channels-section" id="channels">
          <div className="dm-channels-wrap">
            <div className="dm-channels-header">
              <div>
                <h2 className={`dm-channels-title dm-section-reveal${visibleSections.has('channels') ? ' dm-revealed' : ''}`} ref={el => { sectionRefs.current['channels'] = el; }}>
                  Integrated Across<br/>Every Growth Channel
                </h2>
              </div>
              <p className="dm-channels-sub">We don't run channels in isolation. Our strategies connect search, social, content, and email so every touchpoint compounds your results.</p>
            </div>
            <div className="dm-channels-grid">
              {[
                {
                  bg:'#ecfdf5',
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" width="24" height="24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>,
                  title:'Organic Search (SEO)',
                  desc:'Technical audits, keyword strategy, content creation, and authority link building that compounds over time.',
                },
                {
                  bg:'#eff6ff',
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" width="24" height="24"><path d="M3 3h18v18H3z"/><path d="M3 9h18M9 21V9" strokeLinecap="round"/></svg>,
                  title:'Paid Search (Google Ads)',
                  desc:'Search, Display, Performance Max, and Shopping campaigns optimised for maximum return on ad spend.',
                },
                {
                  bg:'#fef3c7',
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" width="24" height="24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
                  title:'Social Media Ads',
                  desc:'Meta (Facebook & Instagram), LinkedIn, TikTok, and Pinterest ad campaigns built around audience-first creative strategy.',
                },
                {
                  bg:'#fdf4ff',
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" width="24" height="24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                  title:'Email & Automation',
                  desc:'Welcome sequences, lifecycle nurture flows, abandoned cart recovery, and re-engagement campaigns that run 24/7.',
                },
                {
                  bg:'#fff7ed',
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" width="24" height="24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
                  title:'Content Marketing',
                  desc:'SEO-optimised blog posts, pillar pages, case studies, and thought leadership that build authority and earn rankings.',
                },
                {
                  bg:'#f0fdf4',
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" width="24" height="24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
                  title:'Analytics & CRO',
                  desc:'GA4 setup, conversion tracking, heatmaps, A/B testing, and data-driven UX improvements that lift conversion rates.',
                },
              ].map(ch => (
                <div className="dm-channel-card" key={ch.title}>
                  <div className="dm-channel-icon" style={{ background: ch.bg }}>
                    {ch.icon}
                  </div>
                  <h3>{ch.title}</h3>
                  <p>{ch.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="dm-process-section">
          <div className="dm-process-top">
            <div className={`dm-section-reveal${visibleSections.has('process') ? ' dm-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="dm-process-eyebrow">HOW WE WORK</p>
              <h2 className="dm-process-main-title">Our 4-Phase Digital Marketing Process</h2>
              <p className="dm-process-main-desc">Our digital marketing specialists have helped 300+ businesses across US, Canada, and Australia grow their revenue online. Every engagement follows a structured process that connects strategy to execution to measurable results.</p>
            </div>
            <hr className="dm-process-divider" />
          </div>
          <div className="dm-process-inner">
            <div className="dm-process-steps">
              {[
                ['Audit & Discovery', 'We conduct a full audit of your current digital presence — SEO health, paid account structure, analytics tracking, content gaps, and competitor landscape — to identify your biggest growth levers.'],
                ['Strategy & Roadmap', 'We build a custom 90-day growth roadmap with channel priorities, budget allocations, content calendar, and KPI targets aligned to your specific revenue goals — not a generic template.'],
                ['Execute & Optimise', 'Our specialists implement across every agreed channel — launching campaigns, publishing content, building links, and setting up automation — with weekly optimisation cycles to improve performance continuously.'],
                ['Measure & Scale', 'Monthly reporting covers every metric that matters: traffic, rankings, leads, ROAS, and revenue attribution. What\'s working gets scaled; what\'s not gets replaced with a better hypothesis.'],
              ].map(([title, desc], i) => (
                <div
                  className={`dm-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="dm-pstep-left">
                    <div className="dm-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="dm-pstep-arrow" />}
                  </div>
                  <div className="dm-pstep-content">
                    <h3 className="dm-pstep-title">{title}</h3>
                    <p className="dm-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="dm-process-image-col">
              <div className="dm-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://placehold.co/480x600/065F46/ffffff?text=Digital+Marketing+Process" alt="Digital marketing process" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="dm-testi-section">
          <div className="dm-testi-inner">
            <div className={`dm-section-header-center dm-section-reveal${visibleSections.has('testi') ? ' dm-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="dm-section-eyebrow">Client Success Stories</span>
              <h2 className="dm-section-title">Real Results From Real Clients</h2>
              <p className="dm-section-desc" style={{ margin: '0 auto 0' }}>From funded startups to established brands — here's what our clients say about their digital marketing results.</p>
            </div>
            <div className="dm-testi-grid" ref={testiGridRef}>
              {[
                {
                  stars:'★★★★★', featured:true,
                  text:'"1Solutions took our eCommerce store from $40k/month to $180k/month in organic revenue in 14 months. Their SEO and content strategy was unlike anything we\'d experienced with previous agencies — they actually understood our customers."',
                  name:'James Whitfield', role:'CEO, RetailLoop — Austin, TX', initials:'JW', color:'#059669',
                },
                {
                  stars:'★★★★★', featured:false,
                  text:'"Our Google Ads ROAS went from 1.8x to 4.6x in six months. They restructured our entire account, cut wasted spend in half, and then scaled what was working. The reporting is crystal clear — no smoke and mirrors."',
                  name:'Sarah Chen', role:'Marketing Director, TrueNorth SaaS — Toronto, ON', initials:'SC', color:'#2563eb',
                },
                {
                  stars:'★★★★★', featured:false,
                  text:'"We tried two other agencies before 1Solutions. The difference is their integrated approach — SEO, Ads, and email all working together under one strategy. Our lead volume doubled and cost-per-lead dropped 38%."',
                  name:'David Hargreaves', role:'Founder, HomeFirst Legal — Sydney, AU', initials:'DH', color:'#7c3aed',
                },
              ].map((t, i) => (
                <div key={t.name} className={`dm-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' dm-tcard-visible':''}`}>
                  <div className="dm-tcard-stars">{t.stars}</div>
                  <p className="dm-tcard-text">{t.text}</p>
                  <div className="dm-tcard-author">
                    <div className="dm-tcard-avatar" style={{ background: t.color }}>{t.initials}</div>
                    <div>
                      <div className="dm-tcard-name">{t.name}</div>
                      <div className="dm-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="dm-testi-stats">
              {[['300+','Campaigns Managed'],null,['97%','Client Retention Rate'],null,['3.8x','Avg. ROI Improvement'],null,['15+','Years of Experience']].map((item, i) =>
                item === null
                  ? <div key={i} className="dm-tstat-divider" />
                  : <div key={item[0]} className="dm-tstat"><span className="dm-tstat-num">{item[0]}</span><span className="dm-tstat-label">{item[1]}</span></div>
              )}
            </div>
          </div>
        </section>

        {/* ── WHY ── */}
        <section className="dm-why-section">
          <div className="dm-why-inner">
            <div className={`dm-section-header-center dm-section-reveal${visibleSections.has('why') ? ' dm-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }}>
              <span className="dm-section-eyebrow">Why 1Solutions</span>
              <h2 className="dm-section-title">Why Businesses Choose Us</h2>
              <p className="dm-section-desc" style={{ margin: '0 auto 0' }}>Not another agency that promises rankings and disappears. Here's what makes our approach different.</p>
            </div>
            <div className="dm-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div key={w.title} className={`dm-why-card${visibleWhyCards.includes(i)?' dm-card-visible':''}`} style={{ transitionDelay: `${i*80}ms` }}>
                  <div className="dm-why-card-header">
                    <div className="dm-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="dm-engage-section">
          <div className="dm-engage-inner">
            <div className="dm-engage-left">
              <div className={`dm-section-reveal${visibleSections.has('engage') ? ' dm-revealed' : ''}`} ref={el => { sectionRefs.current['engage'] = el; }}>
                <span className="dm-section-eyebrow">How We Engage</span>
                <h2 className="dm-engage-title">Flexible Engagement Models Built Around Your Goals</h2>
                <p className="dm-engage-desc">Whether you need a full-service growth partner or targeted expertise in a single channel, we have an engagement model that fits your stage and budget.</p>
              </div>
              <div className="dm-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://placehold.co/560x420/065F46/ffffff?text=Flexible+Engagement" alt="Flexible digital marketing engagement models" loading="lazy" />
              </div>
            </div>
            <div className="dm-engage-right" ref={eCardsRef}>
              {[
                {
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                  title:'Full-Service Growth Retainer',
                  desc:'We own your entire digital marketing programme — strategy, execution, reporting — across SEO, paid, content, and email. One team, one strategy, one monthly report.',
                  features:['SEO + Paid + Content + Email','Dedicated account manager','Weekly optimisation','Monthly executive report'],
                },
                {
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                  title:'Single-Channel Specialist Retainer',
                  desc:'Focused expertise in one channel — SEO, Google Ads, or Meta Ads — with monthly retainers starting from $800/month. Ideal if you have internal marketing capacity.',
                  features:['Channel-specific strategy','Weekly performance reviews','Transparent ad account access','Scalable as results grow'],
                },
                {
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
                  title:'One-Off Audits & Strategy',
                  desc:'Fixed-price SEO, Google Ads, or analytics audits delivered in 10 business days. Perfect for a second opinion or pre-retainer due diligence.',
                  features:['SEO / Ads / Analytics audits','No ongoing commitment','Delivered in 10 business days','Actionable priority roadmap'],
                },
                {
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
                  title:'Embedded Marketing Consultant',
                  desc:'A senior 1Solutions strategist embedded part-time in your internal team — guiding your in-house team on strategy, tooling, and campaign direction without full outsourcing.',
                  features:['Part-time senior strategist','Team training & mentorship','Strategic oversight only','Flexible hours model'],
                },
              ].map((ec, i) => (
                <div key={ec.title} className={`dm-ecard${visibleECards.includes(i)?' dm-ecard-visible':''}`} style={{ transitionDelay: `${i*100}ms` }}>
                  <div className="dm-ecard-header">
                    <div className="dm-ecard-icon">{ec.icon}</div>
                    <h3 className="dm-ecard-title">{ec.title}</h3>
                  </div>
                  <p className="dm-ecard-desc">{ec.desc}</p>
                  <div className="dm-ecard-features">
                    {ec.features.map(f => (
                      <div key={f} className="dm-efeat"><span className="dm-efeat-check">✔</span>{f}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="dm-contact-section" id="contact">
          <div className="dm-contact-container">
            <div className="dm-contact-left">
              <div className={`dm-section-reveal${visibleSections.has('contact') ? ' dm-revealed' : ''}`} ref={el => { sectionRefs.current['contact'] = el; }}>
                <h2 className="dm-contact-title">Ready to Grow Your Digital Revenue?</h2>
                <p className="dm-contact-desc">Tell us about your business and goals. We'll come back with a free 30-minute growth strategy call and a no-obligation proposal — usually within 24 hours.</p>
              </div>
              <div className="dm-merged-box">
                {[
                  { label:'Free Growth Strategy Call', desc:'A 30-minute call with a senior strategist — no sales pitch, just a candid view of your biggest growth opportunities.' },
                  { label:'Custom Proposal in 24 Hours', desc:'A tailored proposal with channel recommendations, projected outcomes, and transparent pricing sent within one business day.' },
                  { label:'No Lock-In Contracts', desc:'Month-to-month after the initial 3-month onboarding. We earn your renewal every month through results.' },
                ].map(b => (
                  <div key={b.label} className="dm-benefit-item">
                    <div className="dm-benefit-icon-wrap">
                      <svg className="dm-benefit-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.75"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p><strong>{b.label}</strong> — {b.desc}</p>
                  </div>
                ))}
                <div className="dm-stats-box">
                  <div className="dm-stats-grid">
                    {[['300+','Campaigns managed'],['97%','Client retention'],['3.8x','Avg. ROI lift']].map(([n,t]) => (
                      <div key={t}><div className="dm-stat-number">{n}</div><div className="dm-stat-text">{t}</div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="dm-contact-right">
              <div className="dm-form-box">
                <h3>Get Your Free Growth Strategy</h3>
                <form className="dm-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="dm-form-row">
                    <div className="dm-form-group">
                      <label htmlFor="dm-fname">First Name *</label>
                      <input id="dm-fname" type="text" placeholder="John" required />
                    </div>
                    <div className="dm-form-group">
                      <label htmlFor="dm-lname">Last Name *</label>
                      <input id="dm-lname" type="text" placeholder="Smith" required />
                    </div>
                  </div>
                  <div className="dm-form-row">
                    <div className="dm-form-group">
                      <label htmlFor="dm-email">Work Email *</label>
                      <input id="dm-email" type="email" placeholder="john@company.com" required />
                    </div>
                    <div className="dm-form-group">
                      <label htmlFor="dm-phone">Phone</label>
                      <div className="dm-phone-input">
                        <select aria-label="Country code">
                          <option>+1</option><option>+61</option><option>+44</option><option>+91</option>
                        </select>
                        <input id="dm-phone" type="tel" placeholder="(555) 000-0000" />
                      </div>
                    </div>
                  </div>
                  <div className="dm-form-row">
                    <div className="dm-form-group">
                      <label htmlFor="dm-website">Website URL</label>
                      <input id="dm-website" type="url" placeholder="https://yoursite.com" />
                    </div>
                    <div className="dm-form-group">
                      <label htmlFor="dm-budget">Monthly Budget</label>
                      <select id="dm-budget">
                        <option value="">Select range…</option>
                        <option>Under $1,000/mo</option>
                        <option>$1,000 – $3,000/mo</option>
                        <option>$3,000 – $5,000/mo</option>
                        <option>$5,000 – $10,000/mo</option>
                        <option>$10,000+/mo</option>
                      </select>
                    </div>
                  </div>
                  <div className="dm-form-group full">
                    <label htmlFor="dm-service">Primary Service Needed</label>
                    <select id="dm-service">
                      <option value="">Select service…</option>
                      <option>SEO</option>
                      <option>Google Ads / PPC</option>
                      <option>Meta Ads</option>
                      <option>LinkedIn Ads</option>
                      <option>Content Marketing</option>
                      <option>Email Marketing</option>
                      <option>Full-Service Growth</option>
                      <option>Analytics / CRO Audit</option>
                    </select>
                  </div>
                  <div className="dm-form-group full">
                    <label htmlFor="dm-msg">Tell Us About Your Goals *</label>
                    <textarea id="dm-msg" rows={4} placeholder="e.g. We want to grow organic traffic from 5k to 20k/month and reduce our cost-per-lead from Google Ads..." required />
                  </div>
                  <div className="dm-consent">
                    <input type="checkbox" id="dm-consent" required />
                    <label htmlFor="dm-consent">I agree to 1Solutions' <Link href="/privacy-policy">Privacy Policy</Link> and consent to being contacted about my enquiry.</label>
                  </div>
                  <button type="submit" className="dm-submit-btn">Send My Free Strategy Request →</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="dm-faq-section">
          <div className="dm-faq-inner">
            <div className={`dm-section-reveal${visibleSections.has('faq') ? ' dm-revealed' : ''}`} ref={el => { sectionRefs.current['faq'] = el; }}>
              <h2 className="dm-faq-heading">Frequently Asked Questions</h2>
            </div>
            <div className="dm-faq-list">
              {FAQS.map((faq, i) => (
                <div key={i} className={`dm-faq-item${openFaq === i ? ' open' : ''}`}>
                  <button className="dm-faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="dm-faq-q-badge">{String.fromCharCode(65+i)}</span>
                    <span>{faq.q}</span>
                    <svg className="dm-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="dm-faq-answer-wrap">
                    <div className="dm-faq-answer">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="dm-related-section">
          <div className="dm-related-inner">
            <span className="dm-related-eyebrow">Explore Related Services</span>
            <h2 className="dm-related-title">More Ways We Can Help</h2>
            <p className="dm-related-sub">Digital marketing works best when it's connected to great technology. Explore our related services.</p>
            <hr className="dm-related-divider" />
            <div className="dm-related-tags">
              {[
                ['/seo-services-company','SEO Services','dm-rtag-green'],
                ['/ppc-management-services','PPC Management','dm-rtag-blue'],
                ['/social-media-marketing-services','Social Media Marketing','dm-rtag-violet'],
                ['/content-marketing-services','Content Marketing','dm-rtag-amber'],
                ['/email-marketing-services','Email Marketing','dm-rtag-orange'],
                ['/analytics-cro-services','Analytics & CRO','dm-rtag-teal'],
                ['/local-seo-services','Local SEO','dm-rtag-rose'],
                ['/ecommerce-seo-services','eCommerce SEO','dm-rtag-indigo'],
                ['/google-my-business-optimization','Google My Business','dm-rtag-green'],
                ['/remarketing-services','Remarketing','dm-rtag-blue'],
                ['/seo-audit-services','SEO Audit','dm-rtag-amber'],
                ['/meta-ads-management','Meta Ads','dm-rtag-violet'],
                ['/ppc-audit-services','PPC Audit','dm-rtag-teal'],
                ['/linkedin-ads-management','LinkedIn Ads','dm-rtag-indigo'],
              ].map(([href,label,cls]) => (
                <Link key={href} href={href} className={`dm-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
