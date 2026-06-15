import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Handyman Keyword Research', desc: 'Comprehensive keyword mapping covering handyman near me, home repair, odd jobs, fixture installation, drywall repair, tile work, and seasonal maintenance terms — so every search that leads to a job booking lands on your site first.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Google Business Profile Optimisation', desc: 'Full GBP setup and ongoing optimisation with the correct home improvement categories, service area configuration, before/after project photos, weekly posting cadence, and Q&A management that turns profile views into booked appointments.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Service-Area Landing Pages', desc: 'Unique, individually optimised pages for every trade (carpentry, painting, flooring, tile work, pressure washing, drywall) and every geographic area you serve — the fastest path to ranking across your full coverage zone.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Local Citation Building', desc: 'NAP-consistent citations across HomeAdvisor, Angi, Houzz, Thumbtack, TaskRabbit, Porch, and 35+ home services directories — the citation profile that anchors your local map pack rankings.' },
  { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Seasonal SEO Campaigns', desc: 'Targeted content campaigns aligned to demand spikes — gutter cleaning and leaf removal in autumn, deck repair and painting in spring, weatherproofing and draught-proofing in winter — so you rank when homeowners need you most.' },
  { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title: 'Review and Reputation Management', desc: 'Systematic review collection after every job via SMS and email, active Google, Houzz, and Angi review building, and professional negative review response — the social proof engine that converts searchers into enquiries.' },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'On-Page Technical SEO', desc: 'Structured URL architecture, LocalBusiness schema markup, optimised meta tags, mobile speed improvements, and Core Web Vitals fixes — the technical foundation that lets your content rank to its full potential.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Competitor Benchmarking and Gap Analysis', desc: 'Monthly analysis of your top local competitors — identifying every keyword they rank for that you do not, and a rolling keyword capture roadmap targeting the highest-value job-type and location terms.' },
];

const RESULTS = [
  { metric: '3.9×', label: 'Increase in booked jobs', sub: 'Handyman company, Southeast US — 7 months', color: '#FFB347' },
  { metric: '#1', label: 'For handyman [city]', sub: 'Home services business — 4 months', color: '#7DFFE0' },
  { metric: '260%', label: 'More organic leads', sub: 'Home renovation contractor — 8 months', color: '#FFA0C0' },
];

const PROCESS = [
  { n: '01', title: 'Home Services Audit', desc: 'Full audit of your website, GBP, citation profile, and competitor landscape — identifying every gap between your current rankings and the top map pack position.' },
  { n: '02', title: 'Keyword + Service-Area Mapping', desc: 'We map search demand to every trade service and every suburb you cover — building a full keyword architecture that leaves no local opportunity uncaptured.' },
  { n: '03', title: 'GBP + On-Page Fixes', desc: 'Google Business Profile categories, service descriptions, photos, and hours are optimised. Website title tags, meta descriptions, and service page content are rewritten for target keywords.' },
  { n: '04', title: 'Citation Building', desc: 'Consistent NAP submissions across all major home services directories — HomeAdvisor, Angi, Houzz, Thumbtack, and 35+ more — building the local authority signal that powers map pack rankings.' },
  { n: '05', title: 'Review Launch', desc: 'Automated post-job review request sequences go live via SMS and email, with templates and follow-up cadence designed to rapidly build your Google review count and star rating.' },
  { n: '06', title: 'Monthly Reporting', desc: 'Monthly rank tracking, GBP call volume, organic lead count, seasonal campaign performance, and a 90-day forward roadmap — complete visibility into your SEO investment.' },
];

const WHY = [
  { title: 'Home Services Niche Expertise', desc: 'We understand the unique search behaviour of homeowners researching contractors — from impulse repair searches to considered renovation quotes — and build content for every stage of that journey.' },
  { title: 'Seasonal Strategy Built-In', desc: 'Unlike generic SEO agencies, we plan seasonal content campaigns months in advance — ensuring you rank for spring, summer, autumn, and winter service peaks before the demand arrives.' },
  { title: 'Trade-Specific Landing Pages', desc: 'Every trade you offer gets its own optimised landing page. Carpentry, painting, flooring, tiling, pressure washing — each page targets its own keyword cluster for maximum search coverage.' },
  { title: 'Multi-Service Keyword Coverage', desc: 'We map and track rankings across every service type and every service area — giving you full visibility into which trades and locations are generating the most organic leads.' },
  { title: 'No Long-Term Contracts', desc: 'Month-to-month engagements only. You continue because the booked jobs keep increasing — not because a contract forces you to.' },
  { title: 'Full Transparency in Reporting', desc: 'Monthly reports in plain language — call volume from GBP, organic leads from website, keyword positions, and which service areas are growing fastest.' },
];

const FAQS = [
  { q: 'How long does home repair SEO take to generate leads?', a: 'Google Business Profile improvements typically start showing results within 2 to 4 weeks. Service area and trade-specific landing pages typically see ranking movement within 8 to 12 weeks. Full lead volume impact is usually measurable within 4 to 6 months. Competitive markets like major metro areas may take 6 to 9 months for top-3 positions.' },
  { q: 'What is a realistic SEO budget for a handyman business?', a: 'For a single-operator handyman business covering one city, a local SEO programme starts from a few hundred dollars per month covering GBP optimisation, citations, and core service pages. Multi-trade businesses covering multiple suburbs require a larger investment to build out the full page and citation infrastructure. We tailor the scope and budget to your revenue targets.' },
  { q: 'Can you do SEO for multiple trades under one business?', a: 'Yes — this is where our trade-specific landing page strategy delivers the most value. If you offer carpentry, painting, tiling, and pressure washing, each trade gets its own keyword-optimised page. This dramatically increases the total number of searches your site is visible for, without cannibalising rankings between services.' },
  { q: 'How do service-area pages work for home repair businesses?', a: 'A service-area page is a unique, optimised page for a specific combination of service and location — for example, "handyman services in [suburb]" or "deck repair [city]". These pages rank for highly specific local searches that larger generic competitors ignore. We build these pages for every trade and every suburb you cover.' },
  { q: 'How many reviews does a home repair business need to rank well?', a: 'For most competitive local markets, reaching 30 to 50 Google reviews with a 4.5+ star average puts you in a strong position for map pack rankings. Review recency also matters — consistent new reviews signal to Google that your business is active. Our automated post-job review system keeps the review velocity high.' },
  { q: 'Do you work with seasonal home repair businesses?', a: 'Yes. Seasonal businesses — for example, gutter cleaners or snow removal services — need SEO campaigns that build ranking authority in the months before their peak season, not during it. We plan content and GBP campaigns on a seasonal calendar so you appear at the top when demand spikes.' },
  { q: 'How do you measure SEO success for a home repair company?', a: 'We track GBP calls (using call tracking numbers), organic contact form and quote request submissions, keyword ranking positions for all target service and location terms, and map pack positions. For clients with job management software, we can correlate organic leads directly to booked job revenue, giving you a true cost-per-job from SEO.' },
];

export default function HomeRepairSeoServices() {
  const [openFaq, setOpenFaq] = useState(null);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'Home Repair SEO Services', item: 'https://www.1solutions.biz/home-repair-seo-services/' },
        ],
      },
      {
        '@type': 'Service',
        name: 'Home Repair SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Home repair SEO services for handymen, contractors, and renovation businesses. Local SEO, GBP optimisation, trade-specific landing pages, and review management.',
        areaServed: ['US', 'CA', 'AU'],
        serviceType: 'Home Repair Search Engine Optimisation',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '87', bestRating: '5' },
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
        <title>Home Repair SEO Services | Handyman and Home Services SEO | 1Solutions</title>
        <meta name="description" content="Grow your home repair business with SEO from 1Solutions. Rank for handyman, home services, contractor, renovation, and repair keywords in your local market." />
        <link rel="canonical" href="https://www.1solutions.biz/home-repair-seo-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          * { box-sizing: border-box; }
          .hrseo-hero { position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(74,40,0,0.10) 0%,rgba(255,255,255,0.72) 50%,rgba(74,40,0,0.06) 100%); }
          .hrseo-orb1 { position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(74,40,0,0.13) 0%,transparent 70%);pointer-events:none;filter:blur(10px); }
          .hrseo-orb2 { position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(180,100,0,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px); }
          .hrseo-inner { max-width:1200px;margin:0 auto;position:relative;z-index:1; }
          .hrseo-eyebrow { display:inline-flex;align-items:center;gap:8px;background:rgba(74,40,0,0.10);border:1px solid rgba(74,40,0,0.22);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#4a2800;margin-bottom:24px; }
          .hrseo-h1 { font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#4a2800 0%,#7a4400 50%,#4a2800 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .hrseo-desc { font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px; }
          .hrseo-btns { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px; }
          .hrseo-btn-p { display:inline-flex;align-items:center;gap:8px;background:#4a2800;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(74,40,0,0.28); }
          .hrseo-btn-p:hover { background:#6a3a00;transform:translateY(-2px); }
          .hrseo-btn-s { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#4a2800;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(74,40,0,0.20);transition:all 0.25s;backdrop-filter:blur(8px); }
          .hrseo-btn-s:hover { background:#fff;transform:translateY(-2px); }
          .hrseo-trust { display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px; }
          .hrseo-badge { display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500; }
          .hrseo-stats-bar { display:flex;border:1px solid rgba(74,40,0,0.12);border-radius:16px;background:rgba(255,255,255,0.75);backdrop-filter:blur(12px);overflow:hidden;max-width:720px; }
          .hrseo-stat-item { flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(74,40,0,0.08); }
          .hrseo-stat-item:last-child { border-right:none; }
          .hrseo-stat-num { font-size:1.6rem;font-weight:900;color:#4a2800;line-height:1;letter-spacing:-1px; }
          .hrseo-stat-lbl { font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px; }
          .hrseo-bc { background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px; }
          .hrseo-bc-inner { max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280; }
          .hrseo-bc a { color:#6b7280;text-decoration:none; }
          .hrseo-bc a:hover { color:#4a2800; }
          .hrseo-bc-sep { color:#d1d5db; }
          .hrseo-bc-cur { color:#4a2800;font-weight:500; }
          .hrseo-sec { padding:80px 40px; }
          .hrseo-sec-inner { max-width:1200px;margin:0 auto; }
          .hrseo-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#4a2800;margin-bottom:12px; }
          .hrseo-h2 { font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px; }
          .hrseo-h2 span { background:linear-gradient(90deg,#4a2800,#7a4400);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .hrseo-lead { font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px; }
          .hrseo-bg { background:#fdf8f4; }
          .hrseo-grid3 { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .hrseo-card { background:linear-gradient(135deg,rgba(74,40,0,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(74,40,0,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(74,40,0,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .hrseo-card:hover { transform:translateY(-6px);border-color:rgba(74,40,0,0.22);box-shadow:0 16px 48px rgba(74,40,0,0.12); }
          .hrseo-icon { width:48px;height:48px;border-radius:14px;background:rgba(74,40,0,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px; }
          .hrseo-icon svg { width:22px;height:22px;color:#4a2800; }
          .hrseo-card-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3; }
          .hrseo-card-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .hrseo-results { background:linear-gradient(135deg,#1e1000 0%,#4a2800 100%);padding:64px 40px; }
          .hrseo-results-inner { max-width:1200px;margin:0 auto; }
          .hrseo-res-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,190,100,0.85);margin-bottom:12px;text-align:center; }
          .hrseo-res-h { font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2; }
          .hrseo-res-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .hrseo-res-card { background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center; }
          .hrseo-res-metric { font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px; }
          .hrseo-res-label { font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px; }
          .hrseo-res-sub { font-size:12.5px;color:rgba(255,255,255,0.50); }
          .hrseo-why-card { background:linear-gradient(135deg,rgba(74,40,0,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(74,40,0,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(74,40,0,0.07); }
          .hrseo-why-check { width:36px;height:36px;border-radius:10px;background:rgba(74,40,0,0.09);display:flex;align-items:center;justify-content:center;margin-bottom:16px; }
          .hrseo-why-check svg { width:18px;height:18px;color:#4a2800; }
          .hrseo-why-h { font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px; }
          .hrseo-why-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .hrseo-proc-num { font-size:3.5rem;font-weight:900;color:rgba(74,40,0,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px; }
          .hrseo-proc-line { width:40px;height:3px;background:linear-gradient(90deg,#4a2800,rgba(74,40,0,0.2));border-radius:2px;margin-bottom:16px; }
          .hrseo-proc-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px; }
          .hrseo-proc-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .hrseo-faq-list { display:flex;flex-direction:column;gap:10px; }
          .hrseo-faq-item { background:linear-gradient(135deg,rgba(74,40,0,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(74,40,0,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(74,40,0,0.06); }
          .hrseo-faq-item.open { border-color:rgba(74,40,0,0.28); }
          .hrseo-faq-btn { display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit; }
          .hrseo-faq-qt { font-size:15px;font-weight:600;color:#0A1628;line-height:1.4; }
          .hrseo-faq-icon { width:28px;height:28px;border-radius:50%;background:rgba(74,40,0,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s; }
          .hrseo-faq-item.open .hrseo-faq-icon { background:rgba(74,40,0,0.14);transform:rotate(45deg); }
          .hrseo-faq-icon svg { width:14px;height:14px;color:#4a2800; }
          .hrseo-faq-a { padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.75; }
          .hrseo-cta { background:linear-gradient(135deg,rgba(74,40,0,0.10) 0%,rgba(255,255,255,0.65) 40%,rgba(74,40,0,0.08) 100%);padding:90px 40px;text-align:center;position:relative;overflow:hidden; }
          .hrseo-cta-h { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;margin:0 0 18px;background:linear-gradient(90deg,#1e1000 0%,#4a2800 50%,#7a4400 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .hrseo-cta-p { font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px; }
          @media (max-width:900px) { .hrseo-grid3,.hrseo-res-grid { grid-template-columns:1fr 1fr; } }
          @media (max-width:600px) {
            .hrseo-hero,.hrseo-sec,.hrseo-results,.hrseo-cta { padding-left:20px;padding-right:20px; }
            .hrseo-hero { padding-top:60px;padding-bottom:50px; }
            .hrseo-grid3,.hrseo-res-grid { grid-template-columns:1fr; }
            .hrseo-bc { padding:12px 20px; }
          }
        `}</style>
      </Head>

      <nav className="hrseo-bc" aria-label="Breadcrumb">
        <div className="hrseo-bc-inner">
          <Link href="/">Home</Link>
          <span className="hrseo-bc-sep">›</span>
          <Link href="/seo-services-company/">SEO Services</Link>
          <span className="hrseo-bc-sep">›</span>
          <span className="hrseo-bc-cur">Home Repair SEO Services</span>
        </div>
      </nav>

      <section className="hrseo-hero">
        <div className="hrseo-orb1" /><div className="hrseo-orb2" />
        <div className="hrseo-inner">
          <span className="hrseo-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            Home Repair SEO — Handyman · Contractor · Renovation
          </span>
          <h1 className="hrseo-h1">Home Repair SEO That Turns<br/>Local Searches Into Booked Jobs</h1>
          <p className="hrseo-desc">1Solutions builds home repair SEO strategies that put your business in front of homeowners at every stage — from the first Google search to the moment they pick up the phone. Trade-specific pages, GBP optimisation, and seasonal campaigns built for the home services industry.</p>
          <div className="hrseo-btns">
            <a href="#contact" className="hrseo-btn-p">
              Get Your Free Home Services SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/affordable-seo-packages/" className="hrseo-btn-s">View SEO Packages</Link>
          </div>
          <div className="hrseo-trust">
            {['Home Services Niche Expertise','Seasonal Campaigns Built-In','Trade-Specific Landing Pages','No Lock-in Contracts'].map(t => (
              <span key={t} className="hrseo-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a2800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="hrseo-stats-bar">
            {[
              { num:'86%', lbl:'of homeowners use search to find contractors' },
              { num:'$1,200', lbl:'avg home repair project value' },
              { num:'78%', lbl:'of home services leads from local search' },
              { num:'72%', lbl:'of searchers call within 5 minutes' },
            ].map(s => (
              <div key={s.lbl} className="hrseo-stat-item">
                <span className="hrseo-stat-num">{s.num}</span>
                <span className="hrseo-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hrseo-sec hrseo-bg" id="services">
        <div className="hrseo-sec-inner">
          <span className="hrseo-tag">What We Do</span>
          <h2 className="hrseo-h2">Full-Spectrum <span>Home Repair SEO Services</span></h2>
          <p className="hrseo-lead">From handyman keyword research to seasonal campaigns and reputation management — every tool a home services business needs to fill its calendar.</p>
          <div className="hrseo-grid3">
            {SERVICES.map(s => (
              <div key={s.title} className="hrseo-card">
                <div className="hrseo-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg></div>
                <h3 className="hrseo-card-h">{s.title}</h3>
                <p className="hrseo-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hrseo-results">
        <div className="hrseo-results-inner">
          <span className="hrseo-res-tag">Client Results</span>
          <h2 className="hrseo-res-h">Home Repair SEO Results That Fill Calendars</h2>
          <div className="hrseo-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="hrseo-res-card">
                <div className="hrseo-res-metric" style={{ color: r.color }}>{r.metric}</div>
                <div className="hrseo-res-label">{r.label}</div>
                <div className="hrseo-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hrseo-sec" id="why-us">
        <div className="hrseo-sec-inner">
          <span className="hrseo-tag">Why 1Solutions</span>
          <h2 className="hrseo-h2">The Home Services SEO Agency <span>That Thinks in Booked Jobs</span></h2>
          <p className="hrseo-lead">We build home repair SEO programmes with one goal in mind — more booked jobs, more revenue, from every trade and every suburb you serve.</p>
          <div className="hrseo-grid3">
            {WHY.map(w => (
              <div key={w.title} className="hrseo-why-card">
                <div className="hrseo-why-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <h3 className="hrseo-why-h">{w.title}</h3>
                <p className="hrseo-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hrseo-sec hrseo-bg" id="process">
        <div className="hrseo-sec-inner">
          <span className="hrseo-tag">How We Work</span>
          <h2 className="hrseo-h2">Our <span>6-Step Home Repair SEO Process</span></h2>
          <p className="hrseo-lead">A systematic process from audit to ongoing lead growth — built for multi-trade home services businesses.</p>
          <div className="hrseo-grid3">
            {PROCESS.map(p => (
              <div key={p.n}>
                <div className="hrseo-proc-num">{p.n}</div>
                <div className="hrseo-proc-line" />
                <h3 className="hrseo-proc-h">{p.title}</h3>
                <p className="hrseo-proc-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hrseo-sec" id="faq">
        <div className="hrseo-sec-inner">
          <span className="hrseo-tag">Got Questions?</span>
          <h2 className="hrseo-h2">Home Repair SEO <span>FAQs</span></h2>
          <div className="hrseo-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={'hrseo-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="hrseo-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="hrseo-faq-qt">{f.q}</span>
                  <span className="hrseo-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                </button>
                {openFaq === i && <div className="hrseo-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hrseo-cta" id="contact">
        <div className="hrseo-sec-inner">
          <span className="hrseo-tag" style={{ display:'block', textAlign:'center', marginBottom:12 }}>Ready to Fill Your Job Calendar?</span>
          <h2 className="hrseo-cta-h">Get Your Free Home Repair SEO Audit</h2>
          <p className="hrseo-cta-p">We will audit your GBP, website, citations, and competitor landscape — and deliver a prioritised action plan for growing your booked jobs from local search. Free, with no obligation.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="hrseo-btn-p">
              Request Free Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/affordable-seo-packages/" className="hrseo-btn-s">View SEO Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
