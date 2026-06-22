import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const AUDIT_AREAS = [
  { n: '01', title: 'Technical SEO Audit', desc: 'Crawlability, indexation, canonical tags, redirect chains, Core Web Vitals, mobile usability, HTTPS, hreflang, and site architecture — a 150-point technical health check.' },
  { n: '02', title: 'On-Page SEO Audit', desc: 'Title tags, meta descriptions, heading structure, keyword targeting, internal linking, content quality, duplicate content, and E-E-A-T signals across all key pages.' },
  { n: '03', title: 'Backlink Profile Audit', desc: 'Full link profile analysis — toxic and spammy links, anchor text distribution, referring domain quality, link velocity, and competitor link gap identification.' },
  { n: '04', title: 'Keyword & Content Audit', desc: 'Ranking keyword analysis, content gap identification, cannibalisation issues, and prioritised content opportunities mapped to search intent and revenue potential.' },
  { n: '05', title: 'Page Speed & Core Web Vitals', desc: 'LCP, CLS, INP scoring for desktop and mobile — with specific, developer-ready fixes for render-blocking resources, image optimisation, font loading, and server response time.' },
  { n: '06', title: 'Structured Data Audit', desc: 'Schema markup validation — missing, incorrect, or outdated structured data for Article, Product, FAQ, BreadcrumbList, LocalBusiness, and Review types.' },
  { n: '07', title: 'Competitor Benchmarking', desc: 'Head-to-head analysis against your top 3 organic competitors — domain authority, keyword coverage, content strategy, backlink profile, and technical advantage gaps.' },
  { n: '08', title: 'Local SEO Audit', desc: 'Google Business Profile completeness, NAP consistency across directories, local citation coverage, review profile health, and local keyword ranking analysis.' },
];

const DELIVERABLES = [
  { n: '01', title: 'Executive Summary', desc: 'A plain-English overview of your site\'s SEO health, top issues, and the estimated traffic impact of fixing them — written for decision makers, not just developers.' },
  { n: '02', title: 'Prioritised Issue List', desc: 'Every issue ranked by impact (high / medium / low) with implementation effort noted — so you know exactly what to fix first for the fastest results.' },
  { n: '03', title: 'Developer-Ready Fix Specs', desc: 'Technical issues come with specific fix instructions — copy-paste code snippets, redirect maps, canonical tag examples — so your developers can implement without back-and-forth.' },
  { n: '04', title: 'Keyword Opportunity Report', desc: 'A prioritised list of keyword gaps and ranking opportunities, mapped to your existing pages or flagged as new content requirements.' },
  { n: '05', title: 'Competitor Gap Analysis', desc: 'Side-by-side comparison with your top 3 organic competitors — where they outrank you, why, and what it would take to close the gap.' },
  { n: '06', title: '90-Day SEO Roadmap', desc: 'A structured action plan with monthly milestones — giving your team or agency a clear sequence for implementing the audit findings.' },
];

const PROCESS = [
  { step: '01', title: 'Kickoff & Access', desc: 'We gather your Google Search Console, GA4, and Ahrefs/SEMrush access. You brief us on your goals, target markets, and known problem areas.' },
  { step: '02', title: 'Full Site Crawl', desc: 'We run a comprehensive crawl using Screaming Frog and Sitebulb — analysing every URL, redirect, canonical tag, and technical signal across your site.' },
  { step: '03', title: 'Data Analysis', desc: 'GSC performance data, ranking history, backlink profile, page speed scores, competitor benchmarks, and keyword gap analysis are all synthesised.' },
  { step: '04', title: 'Audit Report Creation', desc: 'Our senior SEO strategist writes the full audit document — prioritised issues, fix specifications, keyword opportunities, and 90-day roadmap.' },
  { step: '05', title: 'Presentation & Q&A', desc: 'We walk you through the findings in a 60-minute call — explaining every issue, answering questions, and adjusting priorities based on your team\'s capacity.' },
  { step: '06', title: 'Implementation Support', desc: 'Optionally, we manage implementation directly or provide ongoing support to your in-house team or development agency as they action the findings.' },
];

const FAQS = [
  {
    q: 'What is included in your SEO audit?',
    a: 'Our full SEO audit covers technical SEO (crawlability, indexation, speed, schema), on-page SEO (title tags, content, internal links), off-page SEO (backlink quality, toxic links), keyword analysis (rankings, gaps, cannibalisation), competitor benchmarking, and a 90-day prioritised roadmap. You receive a full written report — typically 20–40 pages — plus a dedicated presentation call where we walk you through every finding and answer questions.',
  },
  {
    q: 'How long does an SEO audit take?',
    a: 'For most business websites (under 500 pages), we deliver the complete audit report within 7 to 10 business days. Large ecommerce sites (1,000+ pages) typically take 10 to 14 business days due to the additional crawl analysis required. We confirm your expected delivery date at kickoff and keep you updated throughout the process.',
  },
  {
    q: 'Do I need to give you access to my website backend?',
    a: 'No backend access is required for the audit itself. We do need read-only access to Google Search Console and Google Analytics 4, plus your website URL. If you use Ahrefs or SEMrush, sharing access speeds up the process but is not required. All access is read-only — we never make changes to your site as part of the audit.',
  },
  {
    q: 'Can you audit a Shopify, WordPress, or Magento site?',
    a: 'Yes. We have platform-specific audit frameworks for Shopify (duplicate URL issues, theme speed, app conflicts), WordPress/WooCommerce (plugin conflicts, faceted navigation, bloat), and Magento/Adobe Commerce (large catalogue crawling, layered navigation, server response). Each platform has unique SEO quirks that we test for specifically — and our fix recommendations are practical, not generic.',
  },
  {
    q: 'Will the audit tell me why my traffic dropped?',
    a: 'Yes. If you\'ve experienced a traffic drop, we cross-reference your GSC data with known Google algorithm update dates (Core, Helpful Content, Product Reviews, Spam) and identify whether the drop is algorithmic, technical, or content-related — with a specific recovery plan. We\'ve helped dozens of businesses diagnose and recover from Google penalties and algorithm hits.',
  },
  {
    q: 'What is the difference between your free audit and a paid audit?',
    a: 'Our free SEO review (available with a consultation) is a high-level assessment covering the most critical technical signals — typically 5 to 10 priority issues. A full paid audit is a comprehensive 150-point analysis with detailed fix specifications, full keyword research, competitor benchmarking, and a 90-day roadmap document. The paid audit is a proper working document, not a sales pitch.',
  },
  {
    q: 'Do you implement the fixes or just provide recommendations?',
    a: 'Both options are available. We can deliver the audit as a standalone document your team implements, or we can manage implementation directly as part of an ongoing SEO retainer. We also offer a hybrid model where we oversee your developers\' implementation — reviewing pull requests, QA\'ing technical fixes, and validating that GSC confirms the improvements.',
  },
  {
    q: 'How much does an SEO audit cost?',
    a: 'SEO audit pricing depends on site size and depth required. A standard business website audit (under 500 pages) starts from $1,500–$3,000 and includes all 8 audit areas, the full report, and a presentation call. Large ecommerce or enterprise sites (1,000–50,000+ pages) are quoted individually based on crawl scope. We provide a fixed price quote with a clear scope — no surprise invoices after delivery.',
  },
];

const STATS = [
  { label: 'Audits Completed', val: '500+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Audit Checkpoints', val: '150+' },
  { label: 'Days to Delivery', val: '7–10' },
];

export default function SeoAuditServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleDeliv, setVisibleDeliv] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const stepRefs = useRef([]);
  const delivRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const obs = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120);
          o.disconnect();
        }
      }, { threshold: 0.2 });
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!delivRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        DELIVERABLES.forEach((_, i) => setTimeout(() => setVisibleDeliv(p => p.includes(i) ? p : [...p, i]), i * 80));
        o.disconnect();
      }
    }, { threshold: 0.1 });
    o.observe(delivRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        AUDIT_AREAS.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60));
        o.disconnect();
      }
    }, { threshold: 0.05 });
    o.observe(cardsRef.current);
    return () => o.disconnect();
  }, []);

  const jsonLd = {
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
        url: 'https://www.1solutions.biz/seo-audit-services/',
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
        <meta name="description" content="Comprehensive SEO audit from 1Solutions. Technical SEO, on-page, backlink, content gap & competitor analysis with a prioritised 90-day action plan. US, Canada & Australia." />
        <meta name="keywords" content="seo audit services, seo audit company, technical seo audit, website seo audit, seo audit agency, comprehensive seo audit" />
        <link rel="canonical" href="https://www.1solutions.biz/seo-audit-services/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SEO Audit Services | 1Solutions" />
        <meta property="og:description" content="150-point SEO audit — technical, on-page, backlinks, content gaps & competitor benchmarking. Prioritised 90-day roadmap + walkthrough call included." />
        <meta property="og:url" content="https://www.1solutions.biz/seo-audit-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .saud-page { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #0F1F40; line-height: 1.6; overflow-x: hidden; }
          .saud-page *, .saud-page *::before, .saud-page *::after { box-sizing: border-box; }

          .saud-hero { background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 25%, #e0e7ff 60%, #faf5ff 100%); position: relative; overflow: hidden; padding: 80px 40px 0; }
          .saud-hero-orb1 { position: absolute; top: -100px; right: -100px; width: 560px; height: 560px; border-radius: 50%; background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%); pointer-events: none; filter: blur(30px); }
          .saud-hero-orb2 { position: absolute; bottom: 0; left: -80px; width: 440px; height: 440px; border-radius: 50%; background: radial-gradient(circle, rgba(76,29,149,0.08) 0%, transparent 65%); pointer-events: none; filter: blur(30px); }
          .saud-hero-inner { max-width: 1280px; margin: 0 auto; position: relative; z-index: 2; text-align: center; }
          .saud-breadcrumb { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 6px; font-size: 12px; color: #6b7280; margin-bottom: 24px; font-weight: 500; }
          .saud-breadcrumb a { color: #6b7280; text-decoration: none; }
          .saud-breadcrumb a:hover { color: #7C3AED; }
          .saud-breadcrumb span { color: #d1d5db; }
          .saud-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.20); border-radius: 100px; padding: 5px 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #6D28D9; margin-bottom: 28px; }
          .saud-hero-h1 { font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 900; line-height: 1.1; letter-spacing: -1px; background: linear-gradient(90deg, #2E1065 0%, #7C3AED 50%, #0F3460 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 20px; max-width: 900px; margin-left: auto; margin-right: auto; }
          .saud-hero-sub { font-size: 1.08rem; color: #4A6080; line-height: 1.75; max-width: 660px; margin: 0 auto 36px; }
          .saud-hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
          .saud-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #7C3AED; color: #fff; padding: 14px 30px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: all 0.25s; box-shadow: 0 4px 20px rgba(124,58,237,0.28); }
          .saud-btn-primary:hover { background: #6D28D9; box-shadow: 0 8px 32px rgba(124,58,237,0.38); transform: translateY(-2px); }
          .saud-btn-secondary { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.65); backdrop-filter: blur(12px); border: 1.5px solid rgba(15,52,96,0.18); color: #0F3460; padding: 14px 30px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: all 0.25s; }
          .saud-btn-secondary:hover { border-color: #7C3AED; color: #7C3AED; transform: translateY(-2px); }
          .saud-stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 900px; margin: 0 auto; background: rgba(255,255,255,0.55); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.85); border-radius: 20px 20px 0 0; box-shadow: 0 4px 24px rgba(124,58,237,0.07); }
          .saud-stat { padding: 20px 24px; text-align: center; border-right: 1px solid rgba(124,58,237,0.08); }
          .saud-stat:last-child { border-right: none; }
          .saud-stat-label { font-size: 11px; color: #6b7280; font-weight: 500; margin-bottom: 4px; }
          .saud-stat-val { font-size: 1.6rem; font-weight: 900; color: #7C3AED; letter-spacing: -0.5px; }

          .saud-services-section { background: #f8fafd; padding: 80px 40px; box-shadow: 0 -20px 60px rgba(124,58,237,0.06); }
          .saud-services-inner { max-width: 1280px; margin: 0 auto; }
          .saud-section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #7C3AED; margin-bottom: 10px; display: block; }
          .saud-section-title { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; line-height: 1.15; letter-spacing: -1px; background: linear-gradient(90deg, #2E1065 0%, #7C3AED 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px; }
          .saud-section-desc { font-size: 15px; color: #4A6080; line-height: 1.7; max-width: 640px; margin-bottom: 44px; }
          .saud-services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
          .saud-service-card { background: linear-gradient(135deg, rgba(245,243,255,0.65) 0%, rgba(255,255,255,0.88) 60%, rgba(224,231,255,0.40) 100%); border: 1px solid rgba(255,255,255,0.85); border-radius: 20px; padding: 26px 22px 22px; position: relative; overflow: hidden; box-shadow: 0 4px 24px rgba(124,58,237,0.05); opacity: 0; transform: translateY(20px); transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.22s, border-color 0.22s; }
          .saud-service-card.visible { opacity: 1; transform: translateY(0); }
          .saud-service-card:hover { transform: translateY(-6px); border-color: rgba(124,58,237,0.25); box-shadow: 0 16px 48px rgba(124,58,237,0.10); }
          .saud-card-num { position: absolute; top: 8px; right: 14px; font-size: 72px; font-weight: 900; line-height: 1; color: #7C3AED; opacity: 0.05; letter-spacing: -4px; pointer-events: none; user-select: none; }
          .saud-service-card h3 { font-size: 15px; font-weight: 700; color: #0F1F40; line-height: 1.3; margin-bottom: 8px; position: relative; z-index: 1; }
          .saud-service-card p { font-size: 13px; color: #4A6080; line-height: 1.6; position: relative; z-index: 1; margin: 0; }

          .saud-deliv-section { background: linear-gradient(135deg, #2E1065 0%, #4C1D95 100%); padding: 80px 40px; }
          .saud-deliv-inner { max-width: 1280px; margin: 0 auto; }
          .saud-deliv-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(196,181,253,0.8); margin-bottom: 10px; display: block; text-align: center; }
          .saud-deliv-title { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 900; color: #fff; text-align: center; margin-bottom: 44px; line-height: 1.2; }
          .saud-deliv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .saud-deliv-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 28px; opacity: 0; transform: translateY(16px); transition: opacity 0.4s ease, transform 0.4s ease; }
          .saud-deliv-card.visible { opacity: 1; transform: translateY(0); }
          .saud-deliv-num { font-size: 2rem; font-weight: 900; color: rgba(196,181,253,0.4); line-height: 1; margin-bottom: 12px; }
          .saud-deliv-card h3 { font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 10px; }
          .saud-deliv-card p { font-size: 0.85rem; color: rgba(255,255,255,0.65); line-height: 1.7; margin: 0; }

          .saud-process-section { background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #e0e7ff 100%); padding: 80px 40px; }
          .saud-process-inner { max-width: 900px; margin: 0 auto; }
          .saud-process-steps { display: flex; flex-direction: column; margin-top: 44px; }
          .saud-process-step { display: grid; grid-template-columns: 80px 1fr; gap: 24px; align-items: flex-start; padding: 28px 0; border-bottom: 1px solid rgba(124,58,237,0.10); opacity: 0; transform: translateX(-20px); transition: opacity 0.45s ease, transform 0.45s ease; }
          .saud-process-step:last-child { border-bottom: none; }
          .saud-process-step.visible { opacity: 1; transform: translateX(0); }
          .saud-step-num { font-size: 3rem; font-weight: 900; color: rgba(124,58,237,0.15); line-height: 1; letter-spacing: -2px; }
          .saud-step-body h3 { font-size: 1.1rem; font-weight: 800; color: #0F1F40; margin-bottom: 6px; }
          .saud-step-body p { font-size: 0.9rem; color: #4A6080; line-height: 1.7; margin: 0; }

          .saud-faq-section { background: #f8fafd; padding: 80px 40px; }
          .saud-faq-inner { max-width: 860px; margin: 0 auto; }
          .saud-faq-list { margin-top: 44px; }
          .saud-faq-item { border-bottom: 1px solid #e5e7eb; }
          .saud-faq-q { width: 100%; background: none; border: none; text-align: left; padding: 22px 0; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; cursor: pointer; font-family: inherit; font-size: 1rem; font-weight: 700; color: #0F1F40; line-height: 1.4; }
          .saud-faq-q:hover { color: #7C3AED; }
          .saud-faq-icon { width: 22px; height: 22px; border: 2px solid #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; color: #9ca3af; transition: all 0.2s; margin-top: 2px; }
          .saud-faq-item.open .saud-faq-icon { border-color: #7C3AED; color: #7C3AED; background: rgba(124,58,237,0.06); }
          .saud-faq-a { font-size: 0.92rem; color: #4A6080; line-height: 1.8; overflow: hidden; max-height: 0; transition: max-height 0.35s ease, padding-bottom 0.35s ease; }
          .saud-faq-item.open .saud-faq-a { max-height: 500px; padding-bottom: 22px; }

          .saud-cta-section { background: linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(255,255,255,0.80) 40%, rgba(76,29,149,0.05) 100%); padding: 90px 40px; position: relative; overflow: hidden; }
          .saud-cta-orb1 { position: absolute; top: -80px; right: -80px; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%); pointer-events: none; }
          .saud-cta-orb2 { position: absolute; bottom: -60px; left: -60px; width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(76,29,149,0.08) 0%, transparent 70%); pointer-events: none; }
          .saud-cta-inner { max-width: 760px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
          .saud-cta-title { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900; background: linear-gradient(90deg, #2E1065 0%, #7C3AED 50%, #0F3460 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 16px; line-height: 1.2; }
          .saud-cta-sub { font-size: 1.05rem; color: #4A6080; line-height: 1.75; margin: 0 auto 36px; max-width: 520px; }
          .saud-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

          @media (max-width: 1024px) { .saud-services-grid { grid-template-columns: repeat(2, 1fr); } .saud-deliv-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 768px) {
            .saud-hero { padding: 60px 24px 0; }
            .saud-services-section, .saud-deliv-section, .saud-process-section, .saud-faq-section, .saud-cta-section { padding: 60px 24px; }
            .saud-stats-bar { grid-template-columns: repeat(2, 1fr); border-radius: 16px 16px 0 0; }
            .saud-stat:nth-child(2) { border-right: none; }
            .saud-services-grid { grid-template-columns: 1fr; }
            .saud-deliv-grid { grid-template-columns: 1fr; }
            .saud-process-step { grid-template-columns: 56px 1fr; }
            .saud-hero-btns { flex-direction: column; align-items: center; }
          }
        `}</style>
      </Head>

      <div className="saud-page">
        <section className="saud-hero">
          <div className="saud-hero-orb1" /><div className="saud-hero-orb2" />
          <div className="saud-hero-inner">
            <nav className="saud-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span>
              <Link href="/seo-services-company">SEO Services</Link><span>/</span>
              <span style={{ color: '#7C3AED' }}>SEO Audit</span>
            </nav>
            <span className="saud-eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED', display: 'inline-block' }} />
              150-Point Audit · US · Canada · Australia
            </span>
            <h1 className="saud-hero-h1">SEO Audit That Finds What Is Holding Your Site Back</h1>
            <p className="saud-hero-sub">Comprehensive 150-point SEO audit — technical health, on-page quality, backlink profile, content gaps, and competitor benchmarking — with a prioritised 90-day action plan and a live walkthrough call included.</p>
            <div className="saud-hero-btns">
              <Link href="/contact" className="saud-btn-primary">
                Request an SEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/affordable-seo-packages" className="saud-btn-secondary">View SEO Packages</Link>
            </div>
            <div className="saud-stats-bar">
              {STATS.map(s => (
                <div key={s.label} className="saud-stat">
                  <div className="saud-stat-label">{s.label}</div>
                  <div className="saud-stat-val">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="saud-services-section">
          <div className="saud-services-inner">
            <span className="saud-section-eyebrow">What We Audit</span>
            <h2 className="saud-section-title">8 Areas Covered in Every SEO Audit</h2>
            <p className="saud-section-desc">A complete diagnosis of every factor influencing your organic search performance — technical, content, authority, and competitive.</p>
            <div className="saud-services-grid" ref={cardsRef}>
              {AUDIT_AREAS.map((s, i) => (
                <div key={s.n} className={`saud-service-card${visibleCards.includes(i) ? ' visible' : ''}`}>
                  <div className="saud-card-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="saud-deliv-section">
          <div className="saud-deliv-inner">
            <span className="saud-deliv-eyebrow">What You Receive</span>
            <h2 className="saud-deliv-title">6 Deliverables in Your Audit Report</h2>
            <div className="saud-deliv-grid" ref={delivRef}>
              {DELIVERABLES.map((d, i) => (
                <div key={d.n} className={`saud-deliv-card${visibleDeliv.includes(i) ? ' visible' : ''}`}>
                  <div className="saud-deliv-num">{d.n}</div>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="saud-process-section">
          <div className="saud-process-inner">
            <span className="saud-section-eyebrow">How We Work</span>
            <h2 className="saud-section-title">Our 6-Step Audit Process</h2>
            <p className="saud-section-desc">From access to actionable report — a structured process that leaves nothing unchecked and delivers in 7 to 10 business days.</p>
            <div className="saud-process-steps">
              {PROCESS.map((p, i) => (
                <div key={p.step} ref={el => { stepRefs.current[i] = el; }} className={`saud-process-step${visibleSteps.includes(i) ? ' visible' : ''}`}>
                  <div className="saud-step-num">{p.step}</div>
                  <div className="saud-step-body"><h3>{p.title}</h3><p>{p.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="saud-faq-section">
          <div className="saud-faq-inner">
            <span className="saud-section-eyebrow">Got Questions?</span>
            <h2 className="saud-section-title">SEO Audit FAQs</h2>
            <p className="saud-section-desc">Everything you need to know before commissioning an SEO audit for your website.</p>
            <div className="saud-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`saud-faq-item${openFaq === i ? ' open' : ''}`}>
                  <button className="saud-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    {f.q}
                    <span className="saud-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="saud-faq-a" style={openFaq === i ? { maxHeight: 500, paddingBottom: 22 } : {}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="saud-cta-section">
          <div className="saud-cta-orb1" /><div className="saud-cta-orb2" />
          <div className="saud-cta-inner">
            <span className="saud-section-eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: 16 }}>Ready to Find What is Holding You Back?</span>
            <h2 className="saud-cta-title">Request Your Comprehensive SEO Audit</h2>
            <p className="saud-cta-sub">150-point analysis. Prioritised action plan. Live walkthrough call included. Delivered in 7 to 10 business days — fixed price, no surprises.</p>
            <div className="saud-cta-btns">
              <Link href="/contact" className="saud-btn-primary">
                Request an SEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/affordable-seo-packages" className="saud-btn-secondary">View SEO Packages</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
