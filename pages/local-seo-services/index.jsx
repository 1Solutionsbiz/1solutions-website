import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SERVICES = [
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Google Business Profile Optimisation', desc: 'Complete GBP setup, category optimisation, photo strategy, Q&A management, and weekly post publishing to dominate the local pack.' },
  { icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', title: 'Local Keyword Research', desc: 'Hyperlocal keyword mapping — suburb-level, city-level, and near-me queries — matched to the pages most likely to rank for each intent.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Local Citations & NAP Consistency', desc: 'Audit and clean up your business listings across 50+ directories — Yelp, Yellow Pages, Apple Maps, Bing Places — eliminating conflicting NAP data.' },
  { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title: 'Review Generation & Management', desc: 'Systematic review acquisition from happy customers, negative review response strategy, and reputation monitoring across Google, Yelp, and Trustpilot.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Location Page Creation', desc: 'Unique, geo-targeted landing pages for every service area — written by humans, optimised for local intent, and structured for Google Maps relevance.' },
  { icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0', title: 'Local Link Building', desc: 'Authority link acquisition from local news outlets, chambers of commerce, sponsorships, and community organisations — the signals Google trusts most for local rankings.' },
  { icon: 'M12 18h.01M8 21h8a2 2 0 002-2v-2H6v2a2 2 0 002 2zM14 2H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2V4l-6-2z', title: 'Local Schema Markup', desc: 'LocalBusiness, Service, and Review schema implementation — structured data that tells Google exactly who you are, where you operate, and what customers think.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Local SEO Reporting', desc: 'Monthly reports tracking map pack positions, local keyword rankings, GBP calls and direction clicks, and revenue attributed to local organic search.' },
];

const RESULTS = [
  { metric: '#1', label: 'Map Pack position achieved', sub: 'Multi-location AU service business', color: '#FE9700' },
  { metric: '4.3×', label: 'Increase in GBP calls', sub: 'US home services client — 6 months', color: '#7C3AED' },
  { metric: '280%', label: 'Local organic traffic growth', sub: 'Canadian retail chain — 9 months', color: '#0F3460' },
];

const PROCESS = [
  { n: '01', title: 'Local SEO Audit', desc: 'We audit your GBP, existing rankings, citation consistency, review profile, on-page local signals, and competitor map pack positions.' },
  { n: '02', title: 'Location & Keyword Strategy', desc: 'We map every service area to specific keyword clusters and identify which locations need dedicated landing pages versus GBP optimisation alone.' },
  { n: '03', title: 'On-Page & GBP Fixes', desc: 'We fix NAP inconsistencies, update GBP categories and attributes, implement LocalBusiness schema, and create or optimise location pages.' },
  { n: '04', title: 'Citation Building', desc: 'We build and verify consistent citations across the top 50+ local directories relevant to your industry and geography.' },
  { n: '05', title: 'Review & Authority Building', desc: 'We deploy a review acquisition system and execute local link building to grow your map pack authority month over month.' },
  { n: '06', title: 'Monitor & Report', desc: 'Monthly local rank tracking, GBP insight reports, and call/lead attribution so you can see exactly what local SEO is generating.' },
];

const WHY = [
  { title: 'Maps Pack Specialists', desc: 'We focus specifically on the signals that influence Google\'s 3-pack — proximity, prominence, and relevance — not just general SEO metrics.' },
  { title: 'Multi-Location Experience', desc: 'From single-location SMBs to 50+ location franchises, we have built scalable local SEO systems that maintain quality at every location.' },
  { title: 'Review Strategy Included', desc: 'Most agencies ignore reviews. We build systematic review generation into every local SEO engagement because star rating directly impacts click-through.' },
  { title: 'US, Canada & Australia Focus', desc: 'We understand the local search landscape in each market — from Google Business categories to the directory ecosystems that carry most weight.' },
  { title: 'No Lock-in Contracts', desc: 'Local SEO takes time, but we earn your business every month. You stay because the map pack rankings keep climbing.' },
  { title: 'Transparent Monthly Reporting', desc: 'Every report shows map pack positions, GBP actions (calls, direction clicks, website visits), and local keyword movement — no smoke and mirrors.' },
];

const FAQS = [
  { q: 'How long does it take to rank in the Google Maps pack?', a: 'Most businesses see meaningful map pack movement within 2 to 4 months for low-to-medium competition local keywords. Highly competitive markets (lawyers, dentists, real estate in major cities) typically take 4 to 6 months. We set honest expectations in your initial audit.' },
  { q: 'Do I need a physical address to rank in Google Maps?', a: 'Yes for traditional map pack rankings. However, service-area businesses (plumbers, electricians, cleaners) can set a service area without displaying a physical address and still appear in local results for the covered areas.' },
  { q: 'How important are Google reviews for local SEO?', a: 'Very important. Review quantity, recency, and rating directly influence map pack rankings. Our local SEO packages include a review acquisition strategy to build a consistent review velocity — because a burst of 20 old reviews is less powerful than 3 new reviews every month.' },
  { q: 'What is NAP consistency and why does it matter?', a: 'NAP stands for Name, Address, and Phone number. If your business details are inconsistent across directories (different phone numbers, abbreviated vs full address), Google loses confidence in your business data and your local rankings suffer. We audit and fix all major citation sources.' },
  { q: 'Do you create location pages for each suburb or city?', a: 'Yes, for multi-location businesses or service-area businesses covering multiple cities. Each location page is unique — not a template with the city name swapped — covering local landmarks, service descriptions, and location-specific trust signals.' },
  { q: 'Can you help if a competitor is outranking us with fake reviews?', a: 'Yes. We can report suspected fake reviews through the official Google Business Profile process, and we build your genuine review velocity so your profile becomes more authoritative regardless. We document evidence for the flag request to maximise removal likelihood.' },
  { q: 'Do you handle multi-location businesses?', a: 'Yes. We build scalable local SEO systems for franchises and chains — standardised GBP management protocols, location page templates with unique content, and centralised reporting across all locations in one dashboard.' },
];

export default function LocalSeoServices() {
  const [openFaq, setOpenFaq] = useState(null);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'Local SEO Services', item: 'https://www.1solutions.biz/local-seo-services/' },
        ],
      },
      {
        '@type': 'Service',
        name: 'Local SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Local SEO services that get your business into the Google Maps pack. GBP optimisation, citations, review management, and location pages.',
        areaServed: ['US', 'CA', 'AU'],
        serviceType: 'Local Search Engine Optimisation',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '94', bestRating: '5' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Local SEO Services | Google Maps Pack & GBP Experts | 1Solutions</title>
        <meta name="description" content="Rank in the Google Maps 3-pack with 1Solutions local SEO. GBP optimisation, citation building, review management, and location pages for US, Canada & Australia." />
        <link rel="canonical" href="https://www.1solutions.biz/local-seo-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          * { box-sizing: border-box; }
          .lseo-hero { position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(209,250,229,0.55) 0%,rgba(255,255,255,0.70) 50%,rgba(219,234,254,0.45) 100%); }
          .lseo-orb1 { position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px); }
          .lseo-orb2 { position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(15,52,96,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px); }
          .lseo-inner { max-width:1200px;margin:0 auto;position:relative;z-index:1; }
          .lseo-eyebrow { display:inline-flex;align-items:center;gap:8px;background:rgba(16,185,129,0.10);border:1px solid rgba(16,185,129,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#059669;margin-bottom:24px; }
          .lseo-h1 { font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#065f46 0%,#FE9700 45%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .lseo-desc { font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px; }
          .lseo-btns { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px; }
          .lseo-btn-p { display:inline-flex;align-items:center;gap:8px;background:#065f46;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(6,95,70,0.25); }
          .lseo-btn-p:hover { background:#047857;transform:translateY(-2px); }
          .lseo-btn-s { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#065f46;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(6,95,70,0.18);transition:all 0.25s;backdrop-filter:blur(8px); }
          .lseo-btn-s:hover { background:#fff;transform:translateY(-2px); }
          .lseo-trust { display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px; }
          .lseo-badge { display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500; }
          .lseo-stats-bar { display:flex;border:1px solid rgba(6,95,70,0.10);border-radius:16px;background:rgba(255,255,255,0.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px; }
          .lseo-stat-item { flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(6,95,70,0.08); }
          .lseo-stat-item:last-child { border-right:none; }
          .lseo-stat-num { font-size:1.9rem;font-weight:900;color:#065f46;line-height:1;letter-spacing:-1px; }
          .lseo-stat-lbl { font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px; }
          .lseo-bc { background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px; }
          .lseo-bc-inner { max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280; }
          .lseo-bc a { color:#6b7280;text-decoration:none; }
          .lseo-bc a:hover { color:#059669; }
          .lseo-bc-sep { color:#d1d5db; }
          .lseo-bc-cur { color:#065f46;font-weight:500; }
          .lseo-sec { padding:80px 40px; }
          .lseo-sec-inner { max-width:1200px;margin:0 auto; }
          .lseo-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#059669;margin-bottom:12px; }
          .lseo-h2 { font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px; }
          .lseo-h2 span { background:linear-gradient(90deg,#065f46,#FE9700);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .lseo-lead { font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px; }
          .lseo-bg { background:#f8fafd; }
          .lseo-grid3 { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .lseo-grid2 { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .lseo-card { background:linear-gradient(135deg,rgba(209,250,229,0.45) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(6,95,70,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .lseo-card:hover { transform:translateY(-6px);border-color:rgba(16,185,129,0.30);box-shadow:0 16px 48px rgba(6,95,70,0.12); }
          .lseo-icon { width:48px;height:48px;border-radius:14px;background:rgba(6,95,70,0.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px; }
          .lseo-icon svg { width:22px;height:22px;color:#065f46; }
          .lseo-card-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3; }
          .lseo-card-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .lseo-results { background:linear-gradient(135deg,#052e16 0%,#065f46 100%);padding:64px 40px; }
          .lseo-results-inner { max-width:1200px;margin:0 auto; }
          .lseo-res-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(52,211,153,0.8);margin-bottom:12px;text-align:center; }
          .lseo-res-h { font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2; }
          .lseo-res-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .lseo-res-card { background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center; }
          .lseo-res-metric { font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px; }
          .lseo-res-label { font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px; }
          .lseo-res-sub { font-size:12.5px;color:rgba(255,255,255,0.50); }
          .lseo-why-card { background:linear-gradient(135deg,rgba(209,250,229,0.45) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(6,95,70,0.07); }
          .lseo-why-check { width:36px;height:36px;border-radius:10px;background:rgba(16,185,129,0.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px; }
          .lseo-why-check svg { width:18px;height:18px;color:#059669; }
          .lseo-why-h { font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px; }
          .lseo-why-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .lseo-proc-num { font-size:3.5rem;font-weight:900;color:rgba(6,95,70,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px; }
          .lseo-proc-line { width:40px;height:3px;background:linear-gradient(90deg,#059669,rgba(16,185,129,0.3));border-radius:2px;margin-bottom:16px; }
          .lseo-proc-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px; }
          .lseo-proc-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .lseo-faq-list { display:flex;flex-direction:column;gap:10px; }
          .lseo-faq-item { background:linear-gradient(135deg,rgba(209,250,229,0.45) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(6,95,70,0.06); }
          .lseo-faq-item.open { border-color:rgba(16,185,129,0.35); }
          .lseo-faq-btn { display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit; }
          .lseo-faq-qt { font-size:15px;font-weight:600;color:#0A1628;line-height:1.4; }
          .lseo-faq-icon { width:28px;height:28px;border-radius:50%;background:rgba(6,95,70,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s; }
          .lseo-faq-item.open .lseo-faq-icon { background:rgba(16,185,129,0.12);transform:rotate(45deg); }
          .lseo-faq-icon svg { width:14px;height:14px;color:#065f46; }
          .lseo-faq-a { padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8; }
          .lseo-cta { background:linear-gradient(135deg,rgba(209,250,229,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);padding:90px 40px;text-align:center;position:relative;overflow:hidden; }
          .lseo-cta-h { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;margin:0 0 18px;background:linear-gradient(90deg,#065f46 0%,#F59E0B 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .lseo-cta-p { font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px; }
          @media (max-width:900px) {
            .lseo-grid3,.lseo-grid2,.lseo-res-grid { grid-template-columns:1fr 1fr; }
          }
          @media (max-width:600px) {
            .lseo-hero,.lseo-sec,.lseo-results,.lseo-cta { padding-left:20px;padding-right:20px; }
            .lseo-hero { padding-top:60px;padding-bottom:50px; }
            .lseo-grid3,.lseo-grid2,.lseo-res-grid { grid-template-columns:1fr; }
            .lseo-bc { padding:12px 20px; }
          }
        `}</style>
      </Head>

      <nav className="lseo-bc" aria-label="Breadcrumb">
        <div className="lseo-bc-inner">
          <Link href="/">Home</Link>
          <span className="lseo-bc-sep">›</span>
          <Link href="/seo-services-company/">SEO Services</Link>
          <span className="lseo-bc-sep">›</span>
          <span className="lseo-bc-cur">Local SEO</span>
        </div>
      </nav>

      <section className="lseo-hero">
        <div className="lseo-orb1" /><div className="lseo-orb2" />
        <div className="lseo-inner">
          <span className="lseo-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            Local SEO — US · Canada · Australia
          </span>
          <h1 className="lseo-h1">Rank in the Google Maps Pack<br/>and Dominate Local Search</h1>
          <p className="lseo-desc">1Solutions helps local businesses appear at the top of Google Maps and local search results — through GBP optimisation, citation building, review strategy, and location page creation that drives real foot traffic and calls.</p>
          <div className="lseo-btns">
            <a href="#contact" className="lseo-btn-p">
              Get a Free Local SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/affordable-seo-packages/" className="lseo-btn-s">View SEO Packages</Link>
          </div>
          <div className="lseo-trust">
            {['GBP certified team','White-hat only','No lock-in contracts','Monthly reporting'].map(t => (
              <span key={t} className="lseo-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="lseo-stats-bar">
            {[{ num:'300+', lbl:'Local SEO Clients' },{ num:'15+', lbl:'Years Experience' },{ num:'#1', lbl:'Map Pack Rankings' },{ num:'97%', lbl:'Client Retention' }].map(s => (
              <div key={s.lbl} className="lseo-stat-item">
                <span className="lseo-stat-num">{s.num}</span>
                <span className="lseo-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lseo-sec lseo-bg" id="services">
        <div className="lseo-sec-inner">
          <span className="lseo-tag">What We Do</span>
          <h2 className="lseo-h2">Complete <span>Local SEO Services</span></h2>
          <p className="lseo-lead">Every signal that Google uses for local rankings — covered in one integrated programme.</p>
          <div className="lseo-grid3">
            {SERVICES.map(s => (
              <div key={s.title} className="lseo-card">
                <div className="lseo-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg></div>
                <h3 className="lseo-card-h">{s.title}</h3>
                <p className="lseo-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lseo-results">
        <div className="lseo-results-inner">
          <span className="lseo-res-tag">Client Results</span>
          <h2 className="lseo-res-h">Local SEO Results That Move the Needle</h2>
          <div className="lseo-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="lseo-res-card">
                <div className="lseo-res-metric" style={{ color: r.color }}>{r.metric}</div>
                <div className="lseo-res-label">{r.label}</div>
                <div className="lseo-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lseo-sec" id="why-us">
        <div className="lseo-sec-inner">
          <span className="lseo-tag">Why 1Solutions</span>
          <h2 className="lseo-h2">The Local SEO Partner <span>That Drives Calls & Footfall</span></h2>
          <p className="lseo-lead">We measure success in map pack positions, GBP calls, and direction clicks — not just keyword rankings.</p>
          <div className="lseo-grid2">
            {WHY.map(w => (
              <div key={w.title} className="lseo-why-card">
                <div className="lseo-why-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <h3 className="lseo-why-h">{w.title}</h3>
                <p className="lseo-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lseo-sec lseo-bg" id="process">
        <div className="lseo-sec-inner">
          <span className="lseo-tag">How We Work</span>
          <h2 className="lseo-h2">Our <span>6-Step Local SEO Process</span></h2>
          <p className="lseo-lead">From audit to map pack dominance — a structured methodology that compounds over time.</p>
          <div className="lseo-grid3">
            {PROCESS.map(p => (
              <div key={p.n}>
                <div className="lseo-proc-num">{p.n}</div>
                <div className="lseo-proc-line" />
                <h3 className="lseo-proc-h">{p.title}</h3>
                <p className="lseo-proc-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lseo-sec" id="faq">
        <div className="lseo-sec-inner">
          <span className="lseo-tag">Got Questions?</span>
          <h2 className="lseo-h2">Local SEO <span>FAQs</span></h2>
          <div className="lseo-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={'lseo-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="lseo-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="lseo-faq-qt">{f.q}</span>
                  <span className="lseo-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                </button>
                {openFaq === i && <div className="lseo-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lseo-cta" id="contact">
        <div className="lseo-sec-inner">
          <span className="lseo-tag" style={{ display:'block', textAlign:'center', marginBottom:12 }}>Ready to Rank Locally?</span>
          <h2 className="lseo-cta-h">Get Your Free Local SEO Audit</h2>
          <p className="lseo-cta-p">We will review your Google Business Profile, local rankings, citation health, and competitor map pack positions — and share a clear action plan, completely free.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="lseo-btn-p">
              Request Free Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/affordable-seo-packages/" className="lseo-btn-s">View SEO Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
