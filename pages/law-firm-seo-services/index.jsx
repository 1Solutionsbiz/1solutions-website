import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Practice Area Keyword Targeting', desc: 'In-depth keyword mapping for personal injury, car accident lawyer, medical malpractice, family law attorney, DUI defense, criminal lawyer, immigration attorney, estate planning, bankruptcy attorney, and workers compensation — targeting every case type at every stage of the search funnel.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Attorney Google Business Profile', desc: 'Law firm GBP setup with the correct legal service categories, office hours, virtual consultation option, headshot and office photos, consultation booking link, and review management — the first impression for most prospective clients searching for an attorney.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Practice Area Landing Pages', desc: 'Dedicated, individually optimised pages for every legal specialty — personal injury, medical malpractice, workers compensation, divorce and family law, child custody, DUI defense, criminal defense, estate planning, immigration, and bankruptcy — each ranking its own keyword cluster.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Legal Content Authority Building', desc: 'In-depth legal guides and FAQ pages targeting the research queries prospective clients type before hiring an attorney — "what to do after a car accident", "how is child custody determined", "what is the statute of limitations for personal injury" — building topical authority that lifts all practice area pages.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Law Firm Citation Building', desc: 'Attorney and law firm listings across Avvo, FindLaw, Justia, Martindale-Hubbell, Super Lawyers, Lawyers.com, Nolo, and state bar association directories — the legal-specific citation profile that builds both authority and trust signals for prospective clients.' },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Legal Schema Markup', desc: 'LegalService, Attorney, and LawFirm schema types with practice areas, jurisdictions served, bar admissions, attorney credentials, and case type schema — structured data that enhances your Google Knowledge Panel and eligibility for legal rich results.' },
  { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title: 'Reputation and Review Strategy', desc: 'Google and Avvo review generation with bar association compliance in mind — ethical review request workflows, response templates for negative reviews, and a strategy to build the review profile that prospective clients trust when making high-stakes legal decisions.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Competitor Gap Analysis', desc: 'Detailed analysis of which cases your local competitors rank for that you do not — from "slip and fall attorney [city]" to "[state] DUI lawyer" — with a prioritised keyword capture roadmap targeting the highest-value case-type queries in your market.' },
];

const RESULTS = [
  { metric: '#1', label: 'For personal injury lawyer [city]', sub: 'Boutique PI firm — 6 months', color: '#FFD080' },
  { metric: '7.4×', label: 'Increase in consultation requests', sub: 'Family law firm — 8 months', color: '#80D4FF' },
  { metric: '440%', label: 'Growth in qualified organic traffic', sub: 'Criminal defense firm — 12 months', color: '#B0FFB0' },
];

const PROCESS = [
  { n: '01', title: 'Law Firm Audit + Competitor Analysis', desc: 'Full audit of your website, GBP, citation profile, and competitor keyword landscape — identifying exactly which case types your competitors rank for and which represent the fastest opportunity for your firm.' },
  { n: '02', title: 'Practice Area Keyword Mapping', desc: 'We map every case type you handle to its own keyword cluster — separating personal injury intent from family law intent, criminal defense from DUI — building a keyword architecture that leaves no practice area uncovered.' },
  { n: '03', title: 'Attorney Pages + GBP Setup', desc: 'Individual attorney bio pages, dedicated practice area landing pages, and GBP optimised with legal categories and consultation booking. All content reviewed for bar association advertising compliance.' },
  { n: '04', title: 'Citation + Legal Directory Building', desc: 'Law firm listed and verified across Avvo, FindLaw, Justia, Martindale-Hubbell, Super Lawyers, Lawyers.com, and state bar directories — building the legal-specific authority profile that ranks for high-competition legal keywords.' },
  { n: '05', title: 'Content Authority Programme', desc: 'Monthly publication of in-depth legal guides and FAQ content targeting research-phase queries — building the topical authority that lifts all practice area pages and establishes your firm as the trusted source in your legal specialty.' },
  { n: '06', title: 'Monthly Case Lead Reporting', desc: 'Monthly rank tracking for all practice area keywords, consultation request volume, GBP call tracking, and case lead attribution — with a 90-day forward roadmap tied to your highest-value case types.' },
];

const WHY = [
  { title: 'Legal Industry SEO Specialists', desc: 'We understand legal search intent, bar association advertising rules, and the competitive dynamics of legal markets — from boutique personal injury firms to multi-practice-area regional law firms.' },
  { title: 'High-Value Case Keyword Focus', desc: 'We prioritise the case types that generate the highest fees — personal injury, medical malpractice, complex family law, white-collar criminal defense — ensuring SEO effort is directed at the most valuable client acquisition opportunities.' },
  { title: 'Practice Area Page Expertise', desc: 'Every practice area your firm handles gets its own keyword-optimised page — maximising the total number of case-type searches your firm appears for without cannibalising rankings between specialties.' },
  { title: 'Avvo + Legal Directory Mastery', desc: 'Avvo, FindLaw, and Justia are not just citation sources — they are lead generation platforms in their own right. We optimise your profiles on each to generate direct enquiries, not just citation authority.' },
  { title: 'No Lock-in Contracts', desc: 'Month-to-month engagements. You continue because the consultation requests keep growing — not because a long-term contract requires it.' },
  { title: 'Case Lead Attribution Reporting', desc: 'Monthly reporting tied to consultation requests, GBP calls, and keyword ranking movement — with clear attribution showing which practice area pages and keywords are generating the highest-value client enquiries.' },
];

const FAQS = [
  { q: 'How long does law firm SEO take to generate consultation requests?', a: 'GBP optimisation for law firms typically produces measurable additional calls within 4 to 8 weeks. Practice area landing pages typically achieve meaningful ranking movement within 3 to 5 months. For highly competitive legal keywords like "personal injury lawyer [major city]", top-3 organic positions typically take 9 to 18 months of consistent content authority building and link acquisition.' },
  { q: 'Are personal injury and family law keywords very different to target?', a: 'Yes, significantly. Personal injury keywords have extremely high commercial intent — searchers have already experienced an injury and need representation now. Family law keywords often have more research intent — people are weighing their options. These different intent profiles require different landing page structures, different content angles, and different conversion optimisation approaches. We build separate strategies for each practice area.' },
  { q: 'How important are Avvo and legal directories for law firm SEO?', a: 'Very important — in two distinct ways. First, Avvo and FindLaw rank highly in Google for legal search terms, so appearing prominently on these platforms drives direct client enquiries. Second, citations from legal directories are strong authority signals that help your own website rank for competitive legal keywords. We optimise your presence on all major legal platforms for both of these benefits.' },
  { q: 'How do you handle bar association advertising compliance in legal content?', a: 'All law firm content we create is reviewed for compliance with ABA Model Rules on attorney advertising — avoiding unsubstantiated superlatives, misleading outcome guarantees, and testimonial language that violates state bar rules. We work with your team to ensure all content passes your bar association requirements before publication.' },
  { q: 'Should law firms use local SEO or national SEO?', a: 'Most law firms should prioritise local SEO — the majority of clients hire attorneys within their city or state, and local search delivers the highest-intent traffic. However, practice areas like immigration law, entertainment law, or niche federal practice areas may benefit from national content strategies. We build the right mix based on your practice areas, case values, and client geography.' },
  { q: 'Do you work with multi-attorney law firms?', a: 'Yes. Multi-attorney firms benefit from individual attorney bio pages that rank for attorney-name + practice area searches, in addition to the firm-level practice area pages. We build out the full page architecture — firm homepage, practice area pages, attorney bio pages, city-specific pages, and blog content — ensuring every attorney and every practice area has strong organic visibility.' },
  { q: 'How do you measure ROI for law firm SEO?', a: 'We track consultation requests from organic search (form submissions and call tracking), GBP call volume, keyword ranking positions for all practice area terms, and map pack positions for attorney-related searches. For firms using CRM systems, we can help correlate organic leads to signed retainers — giving you a true cost-per-signed-client from your SEO investment.' },
];

export default function LawFirmSeoServices() {
  const [openFaq, setOpenFaq] = useState(null);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'Law Firm SEO Services', item: 'https://www.1solutions.biz/law-firm-seo-services/' },
        ],
      },
      {
        '@type': 'Service',
        name: 'Law Firm SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Law firm SEO for attorneys and legal practices. Rank for personal injury, family law, criminal defense, and DUI keywords to generate high-value consultation requests.',
        areaServed: ['US', 'CA', 'AU'],
        serviceType: 'Attorney and Law Firm Search Engine Optimisation',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '89', bestRating: '5' },
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
        <title>Law Firm SEO Services | Attorney and Lawyer SEO Marketing | 1Solutions</title>
        <meta name="description" content="Dominate legal search with 1Solutions law firm SEO. Rank for personal injury lawyer, family law attorney, criminal defense, DUI, and divorce lawyer keywords." />
        <link rel="canonical" href="https://www.1solutions.biz/law-firm-seo-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          * { box-sizing: border-box; }
          .lwseo-hero { position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(10,26,61,0.10) 0%,rgba(255,255,255,0.72) 50%,rgba(10,26,61,0.06) 100%); }
          .lwseo-orb1 { position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(10,26,61,0.14) 0%,transparent 70%);pointer-events:none;filter:blur(10px); }
          .lwseo-orb2 { position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(30,70,150,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px); }
          .lwseo-inner { max-width:1200px;margin:0 auto;position:relative;z-index:1; }
          .lwseo-eyebrow { display:inline-flex;align-items:center;gap:8px;background:rgba(10,26,61,0.10);border:1px solid rgba(10,26,61,0.22);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#0a1a3d;margin-bottom:24px; }
          .lwseo-h1 { font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#0a1a3d 0%,#1a3a7a 50%,#0a1a3d 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .lwseo-desc { font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px; }
          .lwseo-btns { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px; }
          .lwseo-btn-p { display:inline-flex;align-items:center;gap:8px;background:#0a1a3d;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(10,26,61,0.30); }
          .lwseo-btn-p:hover { background:#1a3a7a;transform:translateY(-2px); }
          .lwseo-btn-s { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#0a1a3d;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(10,26,61,0.20);transition:all 0.25s;backdrop-filter:blur(8px); }
          .lwseo-btn-s:hover { background:#fff;transform:translateY(-2px); }
          .lwseo-trust { display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px; }
          .lwseo-badge { display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500; }
          .lwseo-stats-bar { display:flex;border:1px solid rgba(10,26,61,0.12);border-radius:16px;background:rgba(255,255,255,0.75);backdrop-filter:blur(12px);overflow:hidden;max-width:720px; }
          .lwseo-stat-item { flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(10,26,61,0.08); }
          .lwseo-stat-item:last-child { border-right:none; }
          .lwseo-stat-num { font-size:1.4rem;font-weight:900;color:#0a1a3d;line-height:1;letter-spacing:-1px; }
          .lwseo-stat-lbl { font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px; }
          .lwseo-bc { background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px; }
          .lwseo-bc-inner { max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280; }
          .lwseo-bc a { color:#6b7280;text-decoration:none; }
          .lwseo-bc a:hover { color:#0a1a3d; }
          .lwseo-bc-sep { color:#d1d5db; }
          .lwseo-bc-cur { color:#0a1a3d;font-weight:500; }
          .lwseo-sec { padding:80px 40px; }
          .lwseo-sec-inner { max-width:1200px;margin:0 auto; }
          .lwseo-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#0a1a3d;margin-bottom:12px; }
          .lwseo-h2 { font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px; }
          .lwseo-h2 span { background:linear-gradient(90deg,#0a1a3d,#1a3a7a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .lwseo-lead { font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px; }
          .lwseo-bg { background:#f0f2f8; }
          .lwseo-grid3 { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .lwseo-card { background:linear-gradient(135deg,rgba(10,26,61,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(10,26,61,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(10,26,61,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .lwseo-card:hover { transform:translateY(-6px);border-color:rgba(10,26,61,0.22);box-shadow:0 16px 48px rgba(10,26,61,0.12); }
          .lwseo-icon { width:48px;height:48px;border-radius:14px;background:rgba(10,26,61,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px; }
          .lwseo-icon svg { width:22px;height:22px;color:#0a1a3d; }
          .lwseo-card-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3; }
          .lwseo-card-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .lwseo-results { background:linear-gradient(135deg,#030812 0%,#0a1a3d 100%);padding:64px 40px; }
          .lwseo-results-inner { max-width:1200px;margin:0 auto; }
          .lwseo-res-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(150,180,255,0.85);margin-bottom:12px;text-align:center; }
          .lwseo-res-h { font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2; }
          .lwseo-res-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .lwseo-res-card { background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center; }
          .lwseo-res-metric { font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px; }
          .lwseo-res-label { font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px; }
          .lwseo-res-sub { font-size:12.5px;color:rgba(255,255,255,0.50); }
          .lwseo-why-card { background:linear-gradient(135deg,rgba(10,26,61,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(10,26,61,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(10,26,61,0.07); }
          .lwseo-why-check { width:36px;height:36px;border-radius:10px;background:rgba(10,26,61,0.09);display:flex;align-items:center;justify-content:center;margin-bottom:16px; }
          .lwseo-why-check svg { width:18px;height:18px;color:#0a1a3d; }
          .lwseo-why-h { font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px; }
          .lwseo-why-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .lwseo-proc-num { font-size:3.5rem;font-weight:900;color:rgba(10,26,61,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px; }
          .lwseo-proc-line { width:40px;height:3px;background:linear-gradient(90deg,#0a1a3d,rgba(10,26,61,0.2));border-radius:2px;margin-bottom:16px; }
          .lwseo-proc-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px; }
          .lwseo-proc-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .lwseo-faq-list { display:flex;flex-direction:column;gap:10px; }
          .lwseo-faq-item { background:linear-gradient(135deg,rgba(10,26,61,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(10,26,61,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(10,26,61,0.06); }
          .lwseo-faq-item.open { border-color:rgba(10,26,61,0.28); }
          .lwseo-faq-btn { display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit; }
          .lwseo-faq-qt { font-size:15px;font-weight:600;color:#0A1628;line-height:1.4; }
          .lwseo-faq-icon { width:28px;height:28px;border-radius:50%;background:rgba(10,26,61,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s; }
          .lwseo-faq-item.open .lwseo-faq-icon { background:rgba(10,26,61,0.14);transform:rotate(45deg); }
          .lwseo-faq-icon svg { width:14px;height:14px;color:#0a1a3d; }
          .lwseo-faq-a { padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.75; }
          .lwseo-cta { background:linear-gradient(135deg,rgba(10,26,61,0.10) 0%,rgba(255,255,255,0.65) 40%,rgba(10,26,61,0.08) 100%);padding:90px 40px;text-align:center;position:relative;overflow:hidden; }
          .lwseo-cta-h { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;margin:0 0 18px;background:linear-gradient(90deg,#030812 0%,#0a1a3d 50%,#1a3a7a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .lwseo-cta-p { font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px; }
          @media (max-width:900px) { .lwseo-grid3,.lwseo-res-grid { grid-template-columns:1fr 1fr; } }
          @media (max-width:600px) {
            .lwseo-hero,.lwseo-sec,.lwseo-results,.lwseo-cta { padding-left:20px;padding-right:20px; }
            .lwseo-hero { padding-top:60px;padding-bottom:50px; }
            .lwseo-grid3,.lwseo-res-grid { grid-template-columns:1fr; }
            .lwseo-bc { padding:12px 20px; }
          }
        `}</style>
      </Head>

      <nav className="lwseo-bc" aria-label="Breadcrumb">
        <div className="lwseo-bc-inner">
          <Link href="/">Home</Link>
          <span className="lwseo-bc-sep">›</span>
          <Link href="/seo-services-company/">SEO Services</Link>
          <span className="lwseo-bc-sep">›</span>
          <span className="lwseo-bc-cur">Law Firm SEO Services</span>
        </div>
      </nav>

      <section className="lwseo-hero">
        <div className="lwseo-orb1" /><div className="lwseo-orb2" />
        <div className="lwseo-inner">
          <span className="lwseo-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Law Firm SEO — Personal Injury · Family Law · Criminal Defense
          </span>
          <h1 className="lwseo-h1">Law Firm SEO That Generates<br/>High-Value Client Cases</h1>
          <p className="lwseo-desc">1Solutions builds law firm SEO strategies that rank for the highest-value legal keywords in your market — putting your firm in front of potential clients at the exact moment they need legal representation. Practice area pages, authority content, and legal directory dominance for attorneys who want to grow.</p>
          <div className="lwseo-btns">
            <a href="#contact" className="lwseo-btn-p">
              Get Your Free Law Firm SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/affordable-seo-packages/" className="lwseo-btn-s">View SEO Packages</Link>
          </div>
          <div className="lwseo-trust">
            {['Legal Industry Specialists','Practice Area Page Experts','Avvo + Directory Mastery','No Lock-in Contracts'].map(t => (
              <span key={t} className="lwseo-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a1a3d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="lwseo-stats-bar">
            {[
              { num:'$54–$300', lbl:'avg CPC for legal keywords — highest of any vertical' },
              { num:'96%', lbl:'of people seeking legal advice start with search' },
              { num:'$40B+', lbl:'personal injury legal fees generated annually (US)' },
              { num:'12:1', lbl:'avg ROI for law firm SEO investment' },
            ].map(s => (
              <div key={s.lbl} className="lwseo-stat-item">
                <span className="lwseo-stat-num">{s.num}</span>
                <span className="lwseo-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lwseo-sec lwseo-bg" id="services">
        <div className="lwseo-sec-inner">
          <span className="lwseo-tag">What We Do</span>
          <h2 className="lwseo-h2">Full-Spectrum <span>Law Firm SEO Services</span></h2>
          <p className="lwseo-lead">From practice area pages to legal directory authority — every component your law firm needs to rank for high-value case-type keywords and grow consultation requests.</p>
          <div className="lwseo-grid3">
            {SERVICES.map(s => (
              <div key={s.title} className="lwseo-card">
                <div className="lwseo-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg></div>
                <h3 className="lwseo-card-h">{s.title}</h3>
                <p className="lwseo-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lwseo-results">
        <div className="lwseo-results-inner">
          <span className="lwseo-res-tag">Client Results</span>
          <h2 className="lwseo-res-h">Law Firm SEO Results That Grow Case Volumes</h2>
          <div className="lwseo-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="lwseo-res-card">
                <div className="lwseo-res-metric" style={{ color: r.color }}>{r.metric}</div>
                <div className="lwseo-res-label">{r.label}</div>
                <div className="lwseo-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lwseo-sec" id="why-us">
        <div className="lwseo-sec-inner">
          <span className="lwseo-tag">Why 1Solutions</span>
          <h2 className="lwseo-h2">The Legal SEO Agency <span>That Thinks in Case Values</span></h2>
          <p className="lwseo-lead">We prioritise the case types that generate the highest revenue for your firm — and build SEO strategies that attract those clients consistently.</p>
          <div className="lwseo-grid3">
            {WHY.map(w => (
              <div key={w.title} className="lwseo-why-card">
                <div className="lwseo-why-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <h3 className="lwseo-why-h">{w.title}</h3>
                <p className="lwseo-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lwseo-sec lwseo-bg" id="process">
        <div className="lwseo-sec-inner">
          <span className="lwseo-tag">How We Work</span>
          <h2 className="lwseo-h2">Our <span>6-Step Law Firm SEO Process</span></h2>
          <p className="lwseo-lead">From competitive audit to ongoing consultation lead growth — a structured process for law firms that want to dominate legal search in their market.</p>
          <div className="lwseo-grid3">
            {PROCESS.map(p => (
              <div key={p.n}>
                <div className="lwseo-proc-num">{p.n}</div>
                <div className="lwseo-proc-line" />
                <h3 className="lwseo-proc-h">{p.title}</h3>
                <p className="lwseo-proc-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lwseo-sec" id="faq">
        <div className="lwseo-sec-inner">
          <span className="lwseo-tag">Got Questions?</span>
          <h2 className="lwseo-h2">Law Firm SEO <span>FAQs</span></h2>
          <div className="lwseo-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={'lwseo-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="lwseo-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="lwseo-faq-qt">{f.q}</span>
                  <span className="lwseo-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                </button>
                {openFaq === i && <div className="lwseo-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lwseo-cta" id="contact">
        <div className="lwseo-sec-inner">
          <span className="lwseo-tag" style={{ display:'block', textAlign:'center', marginBottom:12 }}>Ready to Grow Your Practice?</span>
          <h2 className="lwseo-cta-h">Get Your Free Law Firm SEO Audit</h2>
          <p className="lwseo-cta-p">We will audit your website, GBP, legal directory presence, and competitor keyword landscape — and deliver a prioritised plan for growing your consultation requests from organic search. Free, no obligation.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="lwseo-btn-p">
              Request Free Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/affordable-seo-packages/" className="lwseo-btn-s">View SEO Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
