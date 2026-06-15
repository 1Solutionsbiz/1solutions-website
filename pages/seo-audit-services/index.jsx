import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const AUDIT_AREAS = [
  { icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18', title: 'Technical SEO Audit', desc: 'Crawlability, indexation, canonical tags, redirect chains, Core Web Vitals, mobile usability, HTTPS, hreflang, and site architecture — a 150-point technical health check.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'On-Page SEO Audit', desc: 'Title tags, meta descriptions, heading structure, keyword targeting, internal linking, content quality, duplicate content, and E-E-A-T signals across all key pages.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Backlink Profile Audit', desc: 'Full link profile analysis — toxic and spammy links, anchor text distribution, referring domain quality, link velocity, and competitor link gap identification.' },
  { icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', title: 'Keyword & Content Audit', desc: 'Ranking keyword analysis, content gap identification, cannibalisation issues, and prioritised content opportunities mapped to search intent and revenue potential.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Page Speed & Core Web Vitals', desc: 'LCP, CLS, INP scoring for desktop and mobile — with specific, developer-ready fixes for render-blocking resources, image optimisation, font loading, and server response time.' },
  { icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', title: 'Structured Data Audit', desc: 'Schema markup validation — missing, incorrect, or outdated structured data for Article, Product, FAQ, BreadcrumbList, LocalBusiness, and Review types.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Competitor Benchmarking', desc: 'Head-to-head analysis against your top 3 organic competitors — domain authority, keyword coverage, content strategy, backlink profile, and technical advantage gaps.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Local SEO Audit', desc: 'Google Business Profile completeness, NAP consistency across directories, local citation coverage, review profile health, and local keyword ranking analysis.' },
];

const DELIVERABLES = [
  { icon: '📋', title: 'Executive Summary', desc: 'A plain-English overview of your site\'s SEO health, top issues, and the estimated traffic impact of fixing them — written for decision makers, not just developers.' },
  { icon: '🔧', title: 'Prioritised Issue List', desc: 'Every issue ranked by impact (high / medium / low) with implementation effort noted — so you know exactly what to fix first for the fastest results.' },
  { icon: '💻', title: 'Developer-Ready Fix Specs', desc: 'Technical issues come with specific fix instructions — copy-paste code snippets, redirect maps, canonical tag examples — so your developers can implement without back-and-forth.' },
  { icon: '📈', title: 'Keyword Opportunity Report', desc: 'A prioritised list of keyword gaps and ranking opportunities, mapped to your existing pages or flagged as new content requirements.' },
  { icon: '🏆', title: 'Competitor Gap Analysis', desc: 'Side-by-side comparison with your top 3 organic competitors — where they outrank you, why, and what it would take to close the gap.' },
  { icon: '🗓️', title: '90-Day SEO Roadmap', desc: 'A structured action plan with monthly milestones — giving your team or agency a clear sequence for implementing the audit findings.' },
];

const PROCESS = [
  { n: '01', title: 'Kickoff & Access', desc: 'We gather your Google Search Console, GA4, and Ahrefs/SEMrush access. You brief us on your goals, target markets, and known problem areas.' },
  { n: '02', title: 'Full Site Crawl', desc: 'We run a comprehensive crawl using Screaming Frog and Sitebulb — analysing every URL, redirect, canonical tag, and technical signal across your site.' },
  { n: '03', title: 'Data Analysis', desc: 'GSC performance data, ranking history, backlink profile, page speed scores, competitor benchmarks, and keyword gap analysis are all synthesised.' },
  { n: '04', title: 'Audit Report Creation', desc: 'Our senior SEO strategist writes the full audit document — prioritised issues, fix specifications, keyword opportunities, and 90-day roadmap.' },
  { n: '05', title: 'Presentation & Q&A', desc: 'We walk you through the findings in a 60-minute call — explaining every issue, answering questions, and adjusting priorities based on your team\'s capacity.' },
  { n: '06', title: 'Implementation Support', desc: 'Optionally, we manage implementation directly or provide ongoing support to your in-house team or development agency as they action the findings.' },
];

const FAQS = [
  { q: 'What is included in your SEO audit?', a: 'Our full SEO audit covers technical SEO (crawlability, indexation, speed, schema), on-page SEO (title tags, content, internal links), off-page SEO (backlink quality, toxic links), keyword analysis (rankings, gaps, cannibalisation), competitor benchmarking, and a 90-day prioritised roadmap. You receive a written report plus a presentation call.' },
  { q: 'How long does an SEO audit take?', a: 'For most business websites (under 500 pages), we deliver the complete audit report within 7 to 10 business days. Large eCommerce sites (1,000+ pages) typically take 10 to 14 business days due to the additional crawl analysis required.' },
  { q: 'Do I need to give you access to my website backend?', a: 'No backend access is required for the audit itself. We do need read-only access to Google Search Console and Google Analytics 4, plus your website URL. If you use Ahrefs or SEMrush, sharing access speeds up the process but is not required.' },
  { q: 'Can you audit a Shopify, WordPress, or Magento site?', a: 'Yes. We have platform-specific audit frameworks for Shopify (duplicate URL issues, theme speed), WordPress/WooCommerce (plugin conflicts, faceted navigation), and Magento (large catalogue crawling, layered navigation). Each platform has unique SEO quirks that we test for specifically.' },
  { q: 'Will the audit tell me why my traffic dropped?', a: 'Yes. If you\'ve experienced a traffic drop, we cross-reference your GSC data with known Google algorithm update dates (Core, Helpful Content, Product Reviews) and identify whether the drop is algorithmic, technical, or content-related — with a specific recovery plan.' },
  { q: 'What is the difference between your free audit and a paid audit?', a: 'Our free SEO audit (available with a consultation) is a high-level review covering the most critical technical signals. A full paid audit is a comprehensive 150-point analysis with detailed fix specifications, keyword research, competitor benchmarking, and a 90-day roadmap document — typically 20 to 40 pages.' },
  { q: 'Do you implement the fixes or just provide recommendations?', a: 'Both options are available. We can deliver the audit as a standalone document your team implements, or we can manage implementation directly as part of an ongoing SEO retainer. We also offer a hybrid model where we oversee your developers\' implementation.' },
];

export default function SeoAuditServices() {
  const [openFaq, setOpenFaq] = useState(null);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'SEO Audit', item: 'https://www.1solutions.biz/seo-audit-services/' },
        ],
      },
      {
        '@type': 'Service',
        name: 'SEO Audit Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Comprehensive SEO audits covering technical SEO, on-page, backlinks, content gaps, and competitor analysis — with a 90-day prioritised roadmap.',
        areaServed: ['US', 'CA', 'AU'],
        serviceType: 'SEO Audit',
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
        <title>SEO Audit Services | 150-Point Technical & Content SEO Audit | 1Solutions</title>
        <meta name="description" content="Comprehensive SEO audit from 1Solutions. Technical SEO, on-page, backlink, content gap, and competitor analysis — with a prioritised 90-day action plan. US, Canada & Australia." />
        <link rel="canonical" href="https://www.1solutions.biz/seo-audit-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          * { box-sizing: border-box; }
          .saud-hero { position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.70) 50%,rgba(219,234,254,0.45) 100%); }
          .saud-orb1 { position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px); }
          .saud-orb2 { position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(15,52,96,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px); }
          .saud-inner { max-width:1200px;margin:0 auto;position:relative;z-index:1; }
          .saud-eyebrow { display:inline-flex;align-items:center;gap:8px;background:rgba(124,58,237,0.10);border:1px solid rgba(124,58,237,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#7C3AED;margin-bottom:24px; }
          .saud-h1 { font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 45%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .saud-desc { font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px; }
          .saud-btns { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px; }
          .saud-btn-p { display:inline-flex;align-items:center;gap:8px;background:#4C1D95;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(76,29,149,0.25); }
          .saud-btn-p:hover { background:#5B21B6;transform:translateY(-2px); }
          .saud-btn-s { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#4C1D95;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(76,29,149,0.18);transition:all 0.25s;backdrop-filter:blur(8px); }
          .saud-btn-s:hover { background:#fff;transform:translateY(-2px); }
          .saud-trust { display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px; }
          .saud-badge { display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500; }
          .saud-stats-bar { display:flex;border:1px solid rgba(76,29,149,0.10);border-radius:16px;background:rgba(255,255,255,0.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px; }
          .saud-stat-item { flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(76,29,149,0.08); }
          .saud-stat-item:last-child { border-right:none; }
          .saud-stat-num { font-size:1.9rem;font-weight:900;color:#4C1D95;line-height:1;letter-spacing:-1px; }
          .saud-stat-lbl { font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px; }
          .saud-bc { background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px; }
          .saud-bc-inner { max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280; }
          .saud-bc a { color:#6b7280;text-decoration:none; }
          .saud-bc a:hover { color:#7C3AED; }
          .saud-bc-sep { color:#d1d5db; }
          .saud-bc-cur { color:#4C1D95;font-weight:500; }
          .saud-sec { padding:80px 40px; }
          .saud-sec-inner { max-width:1200px;margin:0 auto; }
          .saud-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#7C3AED;margin-bottom:12px; }
          .saud-h2 { font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px; }
          .saud-h2 span { background:linear-gradient(90deg,#4C1D95,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .saud-lead { font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px; }
          .saud-bg { background:#f8fafd; }
          .saud-grid3 { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .saud-card { background:linear-gradient(135deg,rgba(237,233,254,0.45) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(76,29,149,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .saud-card:hover { transform:translateY(-6px);border-color:rgba(124,58,237,0.30);box-shadow:0 16px 48px rgba(76,29,149,0.12); }
          .saud-icon { width:48px;height:48px;border-radius:14px;background:rgba(76,29,149,0.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px; }
          .saud-icon svg { width:22px;height:22px;color:#4C1D95; }
          .saud-card-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3; }
          .saud-card-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .saud-deliv { background:linear-gradient(135deg,#2E1065 0%,#4C1D95 100%);padding:64px 40px; }
          .saud-deliv-inner { max-width:1200px;margin:0 auto; }
          .saud-deliv-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(196,181,253,0.8);margin-bottom:12px;text-align:center; }
          .saud-deliv-h { font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2; }
          .saud-deliv-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .saud-deliv-card { background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:32px 24px; }
          .saud-deliv-icon { font-size:2rem;margin-bottom:14px; }
          .saud-deliv-h3 { font-size:1rem;font-weight:700;color:#fff;margin:0 0 10px; }
          .saud-deliv-p { font-size:13.5px;color:rgba(255,255,255,0.65);line-height:1.7;margin:0; }
          .saud-why-card { background:linear-gradient(135deg,rgba(237,233,254,0.45) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(76,29,149,0.07); }
          .saud-why-check { width:36px;height:36px;border-radius:10px;background:rgba(124,58,237,0.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px; }
          .saud-why-check svg { width:18px;height:18px;color:#7C3AED; }
          .saud-proc-num { font-size:3.5rem;font-weight:900;color:rgba(76,29,149,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px; }
          .saud-proc-line { width:40px;height:3px;background:linear-gradient(90deg,#7C3AED,rgba(124,58,237,0.3));border-radius:2px;margin-bottom:16px; }
          .saud-proc-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px; }
          .saud-proc-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .saud-faq-list { display:flex;flex-direction:column;gap:10px; }
          .saud-faq-item { background:linear-gradient(135deg,rgba(237,233,254,0.45) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(76,29,149,0.06); }
          .saud-faq-item.open { border-color:rgba(124,58,237,0.35); }
          .saud-faq-btn { display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit; }
          .saud-faq-qt { font-size:15px;font-weight:600;color:#0A1628;line-height:1.4; }
          .saud-faq-icon { width:28px;height:28px;border-radius:50%;background:rgba(76,29,149,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s; }
          .saud-faq-item.open .saud-faq-icon { background:rgba(124,58,237,0.12);transform:rotate(45deg); }
          .saud-faq-icon svg { width:14px;height:14px;color:#4C1D95; }
          .saud-faq-a { padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8; }
          .saud-cta { background:linear-gradient(135deg,rgba(237,233,254,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);padding:90px 40px;text-align:center;position:relative;overflow:hidden; }
          .saud-cta-h { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;margin:0 0 18px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .saud-cta-p { font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px; }
          @media (max-width:900px) { .saud-grid3,.saud-deliv-grid { grid-template-columns:1fr 1fr; } }
          @media (max-width:600px) {
            .saud-hero,.saud-sec,.saud-deliv,.saud-cta { padding-left:20px;padding-right:20px; }
            .saud-hero { padding-top:60px;padding-bottom:50px; }
            .saud-grid3,.saud-deliv-grid { grid-template-columns:1fr; }
            .saud-bc { padding:12px 20px; }
          }
        `}</style>
      </Head>

      <nav className="saud-bc" aria-label="Breadcrumb">
        <div className="saud-bc-inner">
          <Link href="/">Home</Link>
          <span className="saud-bc-sep">›</span>
          <Link href="/seo-services-company/">SEO Services</Link>
          <span className="saud-bc-sep">›</span>
          <span className="saud-bc-cur">SEO Audit</span>
        </div>
      </nav>

      <section className="saud-hero">
        <div className="saud-orb1" /><div className="saud-orb2" />
        <div className="saud-inner">
          <span className="saud-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
            150-Point SEO Audit — US · Canada · Australia
          </span>
          <h1 className="saud-h1">SEO Audit That Finds What Is<br/>Holding Your Site Back</h1>
          <p className="saud-desc">1Solutions delivers comprehensive SEO audits covering technical health, on-page quality, backlink profile, content gaps, and competitor benchmarking — with a prioritised 90-day action plan and a live walkthrough call included.</p>
          <div className="saud-btns">
            <a href="#contact" className="saud-btn-p">
              Request an SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/affordable-seo-packages/" className="saud-btn-s">View SEO Packages</Link>
          </div>
          <div className="saud-trust">
            {['150-point audit framework','Delivered in 7–10 days','Walkthrough call included','No lock-in commitment'].map(t => (
              <span key={t} className="saud-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="saud-stats-bar">
            {[{ num:'500+', lbl:'Audits Completed' },{ num:'15+', lbl:'Years Experience' },{ num:'150+', lbl:'Audit Checkpoints' },{ num:'7–10', lbl:'Days to Delivery' }].map(s => (
              <div key={s.lbl} className="saud-stat-item">
                <span className="saud-stat-num">{s.num}</span>
                <span className="saud-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="saud-sec saud-bg" id="audit-areas">
        <div className="saud-sec-inner">
          <span className="saud-tag">What We Audit</span>
          <h2 className="saud-h2">8 Areas Covered in <span>Every SEO Audit</span></h2>
          <p className="saud-lead">A complete diagnosis of every factor influencing your organic search performance — technical, content, and authority.</p>
          <div className="saud-grid3">
            {AUDIT_AREAS.map(s => (
              <div key={s.title} className="saud-card">
                <div className="saud-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg></div>
                <h3 className="saud-card-h">{s.title}</h3>
                <p className="saud-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="saud-deliv">
        <div className="saud-deliv-inner">
          <span className="saud-deliv-tag">What You Receive</span>
          <h2 className="saud-deliv-h">6 Deliverables in Your Audit Report</h2>
          <div className="saud-deliv-grid">
            {DELIVERABLES.map(d => (
              <div key={d.title} className="saud-deliv-card">
                <div className="saud-deliv-icon">{d.icon}</div>
                <h3 className="saud-deliv-h3">{d.title}</h3>
                <p className="saud-deliv-p">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="saud-sec" id="process">
        <div className="saud-sec-inner">
          <span className="saud-tag">How We Work</span>
          <h2 className="saud-h2">Our <span>6-Step Audit Process</span></h2>
          <p className="saud-lead">From access to actionable report — a structured process that leaves nothing unchecked.</p>
          <div className="saud-grid3">
            {PROCESS.map(p => (
              <div key={p.n}>
                <div className="saud-proc-num">{p.n}</div>
                <div className="saud-proc-line" />
                <h3 className="saud-proc-h">{p.title}</h3>
                <p className="saud-proc-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="saud-sec saud-bg" id="faq">
        <div className="saud-sec-inner">
          <span className="saud-tag">Got Questions?</span>
          <h2 className="saud-h2">SEO Audit <span>FAQs</span></h2>
          <div className="saud-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={'saud-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="saud-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="saud-faq-qt">{f.q}</span>
                  <span className="saud-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                </button>
                {openFaq === i && <div className="saud-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="saud-cta" id="contact">
        <div className="saud-sec-inner">
          <span className="saud-tag" style={{ display:'block', textAlign:'center', marginBottom:12 }}>Ready to Find What is Holding You Back?</span>
          <h2 className="saud-cta-h">Request Your Comprehensive SEO Audit</h2>
          <p className="saud-cta-p">150-point analysis. Prioritised action plan. Live walkthrough call included. Delivered in 7 to 10 business days.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="saud-btn-p">
              Request an SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/affordable-seo-packages/" className="saud-btn-s">View SEO Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
