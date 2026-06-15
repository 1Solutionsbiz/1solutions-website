import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SERVICES = [
  { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z', title: 'Emergency Plumber Keyword Targeting', desc: 'We capture high-urgency searches like "emergency plumber near me", "plumber open 24 hours", "burst pipe repair", and "blocked drain [city]" with dedicated urgency-driven landing pages built to convert panicked homeowners immediately.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Google Business Profile for Plumbers', desc: 'Complete GBP optimisation with plumbing-specific categories, service area configuration, emergency hours, before/after job photos, Q&A management, and weekly posts that signal activity to Google and convert profile visitors into callers.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Plumber Local Citations', desc: 'Consistent NAP (name, address, phone) across Angi, HomeAdvisor, Thumbtack, Houzz, BBB, Yelp, and 40+ plumbing-specific and local directories — the citation foundation that powers map pack rankings.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Service-Specific Landing Pages', desc: 'Dedicated, fully optimised pages for drain cleaning, water heater installation, pipe relining, bathroom plumbing, gas fitting, hot water systems, and emergency services — each targeting its own keyword cluster for maximum coverage.' },
  { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title: 'Review Generation System', desc: 'Automated post-job review requests via SMS and email, a negative review response strategy, and active Yelp and Google review building — the social proof engine that lifts your map pack ranking and conversion rate simultaneously.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Competitor Gap Analysis', desc: 'We identify every keyword your local plumbing competitors rank for that you do not — from "24-hour plumber [suburb]" to "[city] blocked drain specialist" — and build a prioritised roadmap to capture that traffic within 90 days.' },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Plumber Schema Markup', desc: 'LocalBusiness schema with the Plumber service type, emergency availability hours, service area geographic regions, and review aggregate schema — giving Google the structured data it needs to feature your business in rich results.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Monthly Plumber SEO Reporting', desc: 'Rank tracking for every target plumbing keyword, GBP call volume tracking, map pack position monitoring, organic vs paid lead split, and revenue attribution — so you always know exactly what your SEO investment is returning.' },
];

const RESULTS = [
  { metric: '#1', label: 'Map Pack for emergency plumber [city]', sub: 'US plumbing company — 5 months', color: '#FFA500' },
  { metric: '4.8×', label: 'More GBP calls month-over-month', sub: 'US plumbing company — 6 months', color: '#60CFFF' },
  { metric: '320%', label: 'Organic traffic growth', sub: 'Multi-location plumber — 9 months', color: '#7DFFB3' },
];

const PROCESS = [
  { n: '01', title: 'Plumbing Website + GBP Audit', desc: 'Full audit of your website and Google Business Profile — identifying technical issues, missing service pages, GBP gaps, citation inconsistencies, and competitor benchmarks.' },
  { n: '02', title: 'Keyword Strategy by Intent', desc: 'We map emergency intent keywords (burst pipe, blocked drain now) separately from planned service intent (water heater replacement quote) — different landing pages for different buyer mindsets.' },
  { n: '03', title: 'On-Page + GBP Optimisation', desc: 'Title tags, meta descriptions, H1 structure, service page content, GBP categories, emergency hours, and photo strategy all aligned to priority plumbing keywords.' },
  { n: '04', title: 'Local Citation Building', desc: 'Consistent NAP submissions across 40+ directories — Angi, HomeAdvisor, Thumbtack, Houzz, and local chamber directories — the backbone of local map pack authority.' },
  { n: '05', title: 'Review Acquisition Launch', desc: 'Automated post-job review request sequences via SMS and email, with review response templates and a strategy to reach 50+ Google reviews in the first 90 days.' },
  { n: '06', title: 'Ongoing Rank Monitoring', desc: 'Monthly rank tracking reports, GBP insights, call attribution, and a rolling 90-day action plan — continuous optimisation as your market evolves.' },
];

const WHY = [
  { title: 'Emergency Search Specialists', desc: 'We understand the urgency mechanics of plumbing searches — homeowners searching for emergency help behave differently, and our landing pages and GBP profiles are tuned for that intent.' },
  { title: 'Plumber Industry Expertise', desc: 'From gas fitting compliance to water heater regulations, we understand the plumbing trade and write content that builds trust with both homeowners and Google.' },
  { title: 'Review Velocity Building', desc: 'Review count and recency are major local ranking signals. We implement systems to get your review count growing consistently — reaching the 50+ Google reviews benchmark fast.' },
  { title: 'Service-Area Page Creation', desc: 'We build optimised location pages for every suburb and city you serve — so you rank for "[service] in [suburb]" across your entire coverage area, not just your home city.' },
  { title: 'No Lock-in Contracts', desc: 'Month-to-month engagements only. We earn your business every month with results — not contractual obligations that trap you regardless of performance.' },
  { title: 'Transparent Monthly Reporting', desc: 'Clear monthly reports showing GBP call volume, organic lead count, keyword position changes, and map pack rankings — tied directly to the calls and jobs you care about.' },
];

const FAQS = [
  { q: 'How quickly can plumbing SEO generate phone calls?', a: 'Google Business Profile optimisation typically starts generating additional calls within 2 to 4 weeks, as GBP is the fastest-moving local ranking signal. For organic website rankings, expect meaningful movement within 3 to 6 months. Emergency keyword positions in competitive markets may take 6 to 9 months to reach the top 3.' },
  { q: 'Should plumbers run Google Ads alongside SEO?', a: 'Yes — especially in the first 6 months while organic rankings build. Google Ads cover emergency-intent searches immediately, ensuring you capture urgent calls while your SEO foundations mature. Once organic rankings are established, many plumbers reduce ad spend significantly. We advise on the right balance for your market.' },
  { q: 'How important is review count for plumbing map pack rankings?', a: 'Extremely important. Google uses review count, recency, and star rating as direct local ranking signals. The benchmark for competitive plumbing markets is 4.0+ stars with 50+ reviews. We implement automated post-job review request systems to get you to that benchmark faster than your competitors.' },
  { q: 'Do you create separate landing pages for each plumbing service?', a: 'Yes. Every major service — drain cleaning, water heater installation and repair, pipe relining, bathroom plumbing, gas fitting, emergency plumbing, and blocked drain clearing — gets its own dedicated, keyword-optimised landing page. This multi-page strategy dramatically increases the total number of keywords you rank for.' },
  { q: 'What directories matter most for plumbing businesses?', a: 'The highest-impact directories for plumbers are Google Business Profile (by far), Yelp, Angi (formerly Angie\'s List), HomeAdvisor, Houzz, Thumbtack, and BBB. For local authority, citations in your city chamber of commerce and local business directories also matter. We manage all of these with consistent NAP data.' },
  { q: 'Can you help with multiple plumbing service areas?', a: 'Yes. We build individual service-area landing pages for every city, suburb, or postcode you want to rank in — for example, "emergency plumber [suburb A]", "drain cleaning [suburb B]". These geo-targeted pages are one of the most effective ways to expand your ranking footprint across a large coverage area.' },
  { q: 'How do you measure ROI for plumber SEO?', a: 'We track GBP calls (with call tracking numbers), organic contact form submissions, keyword position changes for all target terms, and map pack position for emergency keywords. We also help set up Google Analytics 4 goals so you can see organic traffic converting into leads — giving you a clear cost-per-lead from SEO vs other channels.' },
];

export default function PlumbingSeoServices() {
  const [openFaq, setOpenFaq] = useState(null);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'Plumbing SEO Services', item: 'https://www.1solutions.biz/plumbing-seo-services/' },
        ],
      },
      {
        '@type': 'Service',
        name: 'Plumbing SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Plumbing SEO services that rank plumbers for emergency and planned service keywords, grow Google Business Profile calls, and build map pack dominance.',
        areaServed: ['US', 'CA', 'AU'],
        serviceType: 'Plumber Search Engine Optimisation',
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
        <title>Plumbing SEO Services | Rank #1 for Emergency Plumber Searches | 1Solutions</title>
        <meta name="description" content="Dominate plumbing searches with 1Solutions. Rank for emergency plumber, drain cleaning, pipe repair, and water heater keywords. Local SEO + Google Ads + GBP for plumbers." />
        <link rel="canonical" href="https://www.1solutions.biz/plumbing-seo-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          * { box-sizing: border-box; }
          .plseo-hero { position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(0,61,130,0.10) 0%,rgba(255,255,255,0.70) 50%,rgba(0,61,130,0.06) 100%); }
          .plseo-orb1 { position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(0,61,130,0.13) 0%,transparent 70%);pointer-events:none;filter:blur(10px); }
          .plseo-orb2 { position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(0,120,255,0.07) 0%,transparent 70%);pointer-events:none;filter:blur(8px); }
          .plseo-inner { max-width:1200px;margin:0 auto;position:relative;z-index:1; }
          .plseo-eyebrow { display:inline-flex;align-items:center;gap:8px;background:rgba(0,61,130,0.10);border:1px solid rgba(0,61,130,0.22);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#003d82;margin-bottom:24px; }
          .plseo-h1 { font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#003d82 0%,#0066cc 50%,#004fa3 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .plseo-desc { font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px; }
          .plseo-btns { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px; }
          .plseo-btn-p { display:inline-flex;align-items:center;gap:8px;background:#003d82;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(0,61,130,0.28); }
          .plseo-btn-p:hover { background:#004fa3;transform:translateY(-2px); }
          .plseo-btn-s { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#003d82;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(0,61,130,0.20);transition:all 0.25s;backdrop-filter:blur(8px); }
          .plseo-btn-s:hover { background:#fff;transform:translateY(-2px); }
          .plseo-trust { display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px; }
          .plseo-badge { display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500; }
          .plseo-stats-bar { display:flex;border:1px solid rgba(0,61,130,0.12);border-radius:16px;background:rgba(255,255,255,0.75);backdrop-filter:blur(12px);overflow:hidden;max-width:720px; }
          .plseo-stat-item { flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(0,61,130,0.08); }
          .plseo-stat-item:last-child { border-right:none; }
          .plseo-stat-num { font-size:1.6rem;font-weight:900;color:#003d82;line-height:1;letter-spacing:-1px; }
          .plseo-stat-lbl { font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px; }
          .plseo-bc { background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px; }
          .plseo-bc-inner { max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280; }
          .plseo-bc a { color:#6b7280;text-decoration:none; }
          .plseo-bc a:hover { color:#003d82; }
          .plseo-bc-sep { color:#d1d5db; }
          .plseo-bc-cur { color:#003d82;font-weight:500; }
          .plseo-sec { padding:80px 40px; }
          .plseo-sec-inner { max-width:1200px;margin:0 auto; }
          .plseo-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#003d82;margin-bottom:12px; }
          .plseo-h2 { font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px; }
          .plseo-h2 span { background:linear-gradient(90deg,#003d82,#0066cc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .plseo-lead { font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px; }
          .plseo-bg { background:#f0f5ff; }
          .plseo-grid3 { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .plseo-card { background:linear-gradient(135deg,rgba(0,61,130,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(0,61,130,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(0,61,130,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .plseo-card:hover { transform:translateY(-6px);border-color:rgba(0,61,130,0.22);box-shadow:0 16px 48px rgba(0,61,130,0.12); }
          .plseo-icon { width:48px;height:48px;border-radius:14px;background:rgba(0,61,130,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px; }
          .plseo-icon svg { width:22px;height:22px;color:#003d82; }
          .plseo-card-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3; }
          .plseo-card-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .plseo-results { background:linear-gradient(135deg,#001a3d 0%,#003d82 100%);padding:64px 40px; }
          .plseo-results-inner { max-width:1200px;margin:0 auto; }
          .plseo-res-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(150,200,255,0.85);margin-bottom:12px;text-align:center; }
          .plseo-res-h { font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2; }
          .plseo-res-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .plseo-res-card { background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center; }
          .plseo-res-metric { font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px; }
          .plseo-res-label { font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px; }
          .plseo-res-sub { font-size:12.5px;color:rgba(255,255,255,0.50); }
          .plseo-why-card { background:linear-gradient(135deg,rgba(0,61,130,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(0,61,130,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(0,61,130,0.07); }
          .plseo-why-check { width:36px;height:36px;border-radius:10px;background:rgba(0,61,130,0.09);display:flex;align-items:center;justify-content:center;margin-bottom:16px; }
          .plseo-why-check svg { width:18px;height:18px;color:#003d82; }
          .plseo-why-h { font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px; }
          .plseo-why-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .plseo-proc-num { font-size:3.5rem;font-weight:900;color:rgba(0,61,130,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px; }
          .plseo-proc-line { width:40px;height:3px;background:linear-gradient(90deg,#003d82,rgba(0,61,130,0.2));border-radius:2px;margin-bottom:16px; }
          .plseo-proc-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px; }
          .plseo-proc-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .plseo-faq-list { display:flex;flex-direction:column;gap:10px; }
          .plseo-faq-item { background:linear-gradient(135deg,rgba(0,61,130,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(0,61,130,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,61,130,0.06); }
          .plseo-faq-item.open { border-color:rgba(0,61,130,0.28); }
          .plseo-faq-btn { display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit; }
          .plseo-faq-qt { font-size:15px;font-weight:600;color:#0A1628;line-height:1.4; }
          .plseo-faq-icon { width:28px;height:28px;border-radius:50%;background:rgba(0,61,130,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s; }
          .plseo-faq-item.open .plseo-faq-icon { background:rgba(0,61,130,0.14);transform:rotate(45deg); }
          .plseo-faq-icon svg { width:14px;height:14px;color:#003d82; }
          .plseo-faq-a { padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.75; }
          .plseo-cta { background:linear-gradient(135deg,rgba(0,61,130,0.10) 0%,rgba(255,255,255,0.65) 40%,rgba(0,61,130,0.08) 100%);padding:90px 40px;text-align:center;position:relative;overflow:hidden; }
          .plseo-cta-h { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;margin:0 0 18px;background:linear-gradient(90deg,#001a3d 0%,#003d82 50%,#0066cc 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .plseo-cta-p { font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px; }
          @media (max-width:900px) { .plseo-grid3,.plseo-res-grid { grid-template-columns:1fr 1fr; } }
          @media (max-width:600px) {
            .plseo-hero,.plseo-sec,.plseo-results,.plseo-cta { padding-left:20px;padding-right:20px; }
            .plseo-hero { padding-top:60px;padding-bottom:50px; }
            .plseo-grid3,.plseo-res-grid { grid-template-columns:1fr; }
            .plseo-bc { padding:12px 20px; }
          }
        `}</style>
      </Head>

      <nav className="plseo-bc" aria-label="Breadcrumb">
        <div className="plseo-bc-inner">
          <Link href="/">Home</Link>
          <span className="plseo-bc-sep">›</span>
          <Link href="/seo-services-company/">SEO Services</Link>
          <span className="plseo-bc-sep">›</span>
          <span className="plseo-bc-cur">Plumbing SEO Services</span>
        </div>
      </nav>

      <section className="plseo-hero">
        <div className="plseo-orb1" /><div className="plseo-orb2" />
        <div className="plseo-inner">
          <span className="plseo-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
            Plumbing SEO — Emergency + Local + GBP
          </span>
          <h1 className="plseo-h1">Plumbing SEO That Fills Your<br/>Calendar with Emergency Calls</h1>
          <p className="plseo-desc">1Solutions delivers targeted plumbing SEO that puts your business in front of homeowners at the exact moment they need a plumber — whether it is a burst pipe at midnight or a water heater quote next week. Map pack rankings, emergency keyword pages, and a review engine that keeps calls flowing.</p>
          <div className="plseo-btns">
            <a href="#contact" className="plseo-btn-p">
              Get Your Free Plumbing SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/affordable-seo-packages/" className="plseo-btn-s">View SEO Packages</Link>
          </div>
          <div className="plseo-trust">
            {['Emergency Search Specialists','GBP Optimisation','Review Velocity System','No Lock-in Contracts'].map(t => (
              <span key={t} className="plseo-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#003d82" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="plseo-stats-bar">
            {[
              { num:'97%', lbl:'of homeowners search online for plumbers' },
              { num:'$350+', lbl:'average plumber job value' },
              { num:'68%', lbl:'click maps pack for emergencies' },
              { num:'3×', lbl:'more leads from local SEO vs ads' },
            ].map(s => (
              <div key={s.lbl} className="plseo-stat-item">
                <span className="plseo-stat-num">{s.num}</span>
                <span className="plseo-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="plseo-sec plseo-bg" id="services">
        <div className="plseo-sec-inner">
          <span className="plseo-tag">What We Do</span>
          <h2 className="plseo-h2">Full-Spectrum <span>Plumbing SEO Services</span></h2>
          <p className="plseo-lead">From emergency keyword pages to citation building and review systems — every component your plumbing business needs to dominate local search.</p>
          <div className="plseo-grid3">
            {SERVICES.map(s => (
              <div key={s.title} className="plseo-card">
                <div className="plseo-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg></div>
                <h3 className="plseo-card-h">{s.title}</h3>
                <p className="plseo-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="plseo-results">
        <div className="plseo-results-inner">
          <span className="plseo-res-tag">Client Results</span>
          <h2 className="plseo-res-h">Real Plumbing SEO Results That Drive Calls</h2>
          <div className="plseo-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="plseo-res-card">
                <div className="plseo-res-metric" style={{ color: r.color }}>{r.metric}</div>
                <div className="plseo-res-label">{r.label}</div>
                <div className="plseo-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="plseo-sec" id="why-us">
        <div className="plseo-sec-inner">
          <span className="plseo-tag">Why 1Solutions</span>
          <h2 className="plseo-h2">The Plumbing SEO Agency <span>Built for Local Dominance</span></h2>
          <p className="plseo-lead">We specialise in the unique search behaviour of homeowners seeking plumbers — and we build every strategy around putting your number in their hand first.</p>
          <div className="plseo-grid3">
            {WHY.map(w => (
              <div key={w.title} className="plseo-why-card">
                <div className="plseo-why-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <h3 className="plseo-why-h">{w.title}</h3>
                <p className="plseo-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="plseo-sec plseo-bg" id="process">
        <div className="plseo-sec-inner">
          <span className="plseo-tag">How We Work</span>
          <h2 className="plseo-h2">Our <span>6-Step Plumbing SEO Process</span></h2>
          <p className="plseo-lead">A structured roadmap from audit to ongoing call growth — built specifically for plumbing businesses.</p>
          <div className="plseo-grid3">
            {PROCESS.map(p => (
              <div key={p.n}>
                <div className="plseo-proc-num">{p.n}</div>
                <div className="plseo-proc-line" />
                <h3 className="plseo-proc-h">{p.title}</h3>
                <p className="plseo-proc-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="plseo-sec" id="faq">
        <div className="plseo-sec-inner">
          <span className="plseo-tag">Got Questions?</span>
          <h2 className="plseo-h2">Plumbing SEO <span>FAQs</span></h2>
          <div className="plseo-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={'plseo-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="plseo-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="plseo-faq-qt">{f.q}</span>
                  <span className="plseo-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                </button>
                {openFaq === i && <div className="plseo-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="plseo-cta" id="contact">
        <div className="plseo-sec-inner">
          <span className="plseo-tag" style={{ display:'block', textAlign:'center', marginBottom:12 }}>Ready to Dominate Plumbing Searches?</span>
          <h2 className="plseo-cta-h">Get Your Free Plumbing SEO Audit</h2>
          <p className="plseo-cta-p">We will audit your GBP, website, and local citations — identify the gaps between you and your map pack competitors — and deliver a prioritised action plan. Free, with no obligation.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="plseo-btn-p">
              Request Free Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/affordable-seo-packages/" className="plseo-btn-s">View SEO Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
