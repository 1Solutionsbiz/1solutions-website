import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Insurance Keyword Strategy', desc: 'Comprehensive keyword mapping across auto insurance, home insurance, life insurance quotes, health insurance broker, commercial insurance, business liability, renters insurance, and umbrella policies — segmented by buyer intent stage so each page attracts the right prospect at the right moment.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Insurance Agent Google Business Profile', desc: 'Full GBP optimisation with the insurance agent category, office hours, virtual consultation option, professional photo strategy, and review management — ensuring your agency appears prominently in map pack results for insurance searches in your area.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Product-Specific Landing Pages', desc: 'Dedicated, individually optimised pages for every insurance line your agency offers — auto, home, life, health, commercial, umbrella, specialty, and renters insurance — each targeting its own keyword cluster to maximise the total search surface of your agency.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Quote Comparison Content', desc: 'Educational content targeting high buyer-intent research queries — "how much does home insurance cost", "best auto insurance [state]", "life insurance vs term life", "what does commercial liability cover" — capturing prospective policyholders in the research phase before they request a quote.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Insurance Citation Building', desc: 'Agency listed across Yelp, BBB, Alignable, local chamber of commerce directories, and insurance-specific directories — building consistent NAP data that anchors your local rankings and builds trust with prospective clients researching your agency.' },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Insurance Schema Markup', desc: 'InsuranceAgency LocalBusiness schema, FinancialService type, products offered, geographic area served, and review aggregate schema — the structured data that gives Google the signals needed to feature your agency in rich results and enhances your Knowledge Panel.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Technical SEO for Insurance Sites', desc: 'Fast page load times, HTTPS security, mobile optimisation, and Core Web Vitals compliance — all critical for insurance sites falling under Google\'s YMYL (Your Money Your Life) standards, where technical quality directly influences ranking ability.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Lead Attribution Reporting', desc: 'Monthly tracking of organic quote requests, GBP calls, keyword ranking positions across all insurance product lines, and revenue per keyword cluster — giving your agency complete visibility into which insurance products your SEO is selling most effectively.' },
];

const RESULTS = [
  { metric: '#1', label: 'For auto insurance agent [city]', sub: 'Independent insurance agency — 5 months', color: '#FFD080' },
  { metric: '5.1×', label: 'Increase in online quote requests', sub: 'Multi-line insurance agency — 7 months', color: '#80D0FF' },
  { metric: '370%', label: 'Growth in organic leads', sub: 'Life insurance broker — 9 months', color: '#B0FFD0' },
];

const PROCESS = [
  { n: '01', title: 'Insurance Site Audit', desc: 'Full technical and content audit of your insurance agency website — evaluating YMYL compliance, page speed, product page coverage, GBP status, citation consistency, and competitor keyword gaps.' },
  { n: '02', title: 'Keyword + Product Mapping', desc: 'We map search demand to every insurance product you offer, segmenting by buyer intent — research queries, comparison queries, and direct quote-request queries — then build a keyword architecture that addresses all three.' },
  { n: '03', title: 'GBP + Product Pages', desc: 'Google Business Profile optimised for insurance agent category. Dedicated product landing pages built for auto, home, life, health, and commercial insurance — each with schema markup, conversion copy, and quote request CTAs.' },
  { n: '04', title: 'Citation Building', desc: 'Insurance agency listed across BBB, Yelp, Alignable, local chamber directories, and insurance-specific directories with consistent NAP data — building the local authority that drives map pack rankings.' },
  { n: '05', title: 'YMYL Content Authority', desc: 'Monthly publication of high-quality insurance educational content — coverage guides, cost explainers, comparison articles — meeting the Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) standards that YMYL content requires to rank.' },
  { n: '06', title: 'Monthly Lead Reporting', desc: 'Monthly rank tracking for all insurance product keywords, organic quote request volume, GBP call volume, and revenue attribution by keyword cluster — complete transparency into what your SEO is generating.' },
];

const WHY = [
  { title: 'Insurance SEO Authority', desc: 'We understand the specific ranking challenges of insurance websites — YMYL classification, high competition, and strict E-E-A-T requirements — and build strategies that meet Google\'s elevated standards for financial service content.' },
  { title: 'YMYL Best Practices', desc: 'Insurance is a "Your Money Your Life" category, meaning Google scrutinises content quality, author expertise, and site trustworthiness more heavily. Our content and technical standards are built for YMYL compliance from the ground up.' },
  { title: 'Product-Level Keyword Depth', desc: 'Auto, home, life, health, and commercial insurance each have distinct search audiences and keyword ecosystems. We build deep, separate keyword strategies for every product your agency offers.' },
  { title: 'High-Intent Buyer Content', desc: 'We produce content that targets buyers in the research and comparison phase — when they are actively evaluating insurers and most likely to request a quote. This content converts at significantly higher rates than brand-awareness traffic.' },
  { title: 'No Lock-in Contracts', desc: 'Month-to-month engagements. You continue because your organic quote requests are growing — not because a long-term contract requires it.' },
  { title: 'Quote-to-Close Attribution', desc: 'We track organic leads from first click through to quote request — and can integrate with your CRM to give you full visibility into which insurance products and keyword clusters are generating your highest-value closed policies.' },
];

const FAQS = [
  { q: 'Is insurance SEO better than Google Ads for agencies?', a: 'Insurance keywords are among the most expensive in Google Ads — averaging $50 to $140 per click. SEO builds organic visibility that, once established, generates quote requests without a per-click cost. Most successful insurance agencies use both: Ads for immediate visibility while SEO builds, then shift budget toward SEO as organic rankings mature. Within 12 to 18 months, most agencies find SEO delivers a significantly lower cost per acquired client than Ads alone.' },
  { q: 'What YMYL content requirements apply to insurance websites?', a: 'Google classifies insurance as "Your Money Your Life" content, applying stricter quality standards. This means your site needs clear author credentials or company qualifications displayed, transparent business information (address, license number, contact details), factually accurate and up-to-date policy information, and a professional, trustworthy site experience. We ensure all content we create meets Google\'s E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) standards for insurance.' },
  { q: 'How long does insurance SEO take to produce results?', a: 'GBP optimisation for insurance agents typically produces additional local calls within 4 to 8 weeks. Product-specific landing pages for moderate-competition terms — like "renters insurance [city]" or "small business insurance [state]" — typically achieve top-10 rankings within 3 to 5 months. Highly competitive terms like "auto insurance [major city]" may take 9 to 15 months for top-5 positions, depending on the existing domain authority of your site.' },
  { q: 'Does SEO work differently for independent vs captive insurance agents?', a: 'Yes. Independent agents have a significant SEO advantage: they can create content comparing multiple carriers on price and coverage — something captive agents (tied to one carrier) cannot do honestly. This comparison content attracts high-intent buyers researching their options and often has lower keyword competition than direct carrier terms. We build content strategies that leverage the independent agent advantage fully.' },
  { q: 'Should you focus on life insurance or auto insurance keywords first?', a: 'Auto insurance keywords have higher search volume but extreme competition from major carriers with enormous domain authority. Life insurance keywords, particularly term life and whole life comparison queries, often represent better early-win opportunities for independent agencies. We analyse your specific market, existing domain authority, and product mix to determine which insurance lines to prioritise for the fastest ROI.' },
  { q: 'Can insurance SEO work for a local agent competing against national carriers?', a: 'Yes — and local agents have a genuine SEO advantage in geographic searches. A national carrier like State Farm does not have locally optimised GBP profiles, service-area-specific landing pages, or local community trust signals for your specific city. Local agents who invest in GBP, local citations, and service-area content consistently outrank national carriers in map pack results for city-specific searches. That is where we focus.' },
  { q: 'How do you measure insurance SEO ROI?', a: 'We track organic quote request form submissions (with form tracking), GBP calls (with call tracking numbers), keyword ranking positions across all insurance product lines, and map pack positions for local insurance agent searches. For agencies using CRM systems, we integrate organic lead data to show you cost-per-acquired-policy from SEO — the most meaningful ROI metric for an insurance business.' },
];

export default function InsuranceSeoServices() {
  const [openFaq, setOpenFaq] = useState(null);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'Insurance SEO Services', item: 'https://www.1solutions.biz/insurance-seo-services/' },
        ],
      },
      {
        '@type': 'Service',
        name: 'Insurance SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Insurance SEO for agents and brokers. Rank for auto insurance, home insurance, life insurance, health insurance, and commercial insurance keywords that drive qualified buyer traffic.',
        areaServed: ['US', 'CA', 'AU'],
        serviceType: 'Insurance Agent and Broker Search Engine Optimisation',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '82', bestRating: '5' },
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
        <title>Insurance SEO Services | Insurance Agent and Broker SEO | 1Solutions</title>
        <meta name="description" content="Rank higher and win more clients with 1Solutions insurance SEO. We target auto, home, life, health, and commercial insurance keywords that drive qualified buyer traffic." />
        <link rel="canonical" href="https://www.1solutions.biz/insurance-seo-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          * { box-sizing: border-box; }
          .inseo-hero { position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(0,24,51,0.10) 0%,rgba(255,255,255,0.72) 50%,rgba(0,24,51,0.06) 100%); }
          .inseo-orb1 { position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(0,24,51,0.14) 0%,transparent 70%);pointer-events:none;filter:blur(10px); }
          .inseo-orb2 { position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(0,60,120,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px); }
          .inseo-inner { max-width:1200px;margin:0 auto;position:relative;z-index:1; }
          .inseo-eyebrow { display:inline-flex;align-items:center;gap:8px;background:rgba(0,24,51,0.10);border:1px solid rgba(0,24,51,0.22);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#001833;margin-bottom:24px; }
          .inseo-h1 { font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#001833 0%,#003366 50%,#001833 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .inseo-desc { font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px; }
          .inseo-btns { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px; }
          .inseo-btn-p { display:inline-flex;align-items:center;gap:8px;background:#001833;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(0,24,51,0.30); }
          .inseo-btn-p:hover { background:#003366;transform:translateY(-2px); }
          .inseo-btn-s { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#001833;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(0,24,51,0.20);transition:all 0.25s;backdrop-filter:blur(8px); }
          .inseo-btn-s:hover { background:#fff;transform:translateY(-2px); }
          .inseo-trust { display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px; }
          .inseo-badge { display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500; }
          .inseo-stats-bar { display:flex;border:1px solid rgba(0,24,51,0.12);border-radius:16px;background:rgba(255,255,255,0.75);backdrop-filter:blur(12px);overflow:hidden;max-width:720px; }
          .inseo-stat-item { flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(0,24,51,0.08); }
          .inseo-stat-item:last-child { border-right:none; }
          .inseo-stat-num { font-size:1.4rem;font-weight:900;color:#001833;line-height:1;letter-spacing:-1px; }
          .inseo-stat-lbl { font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px; }
          .inseo-bc { background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px; }
          .inseo-bc-inner { max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280; }
          .inseo-bc a { color:#6b7280;text-decoration:none; }
          .inseo-bc a:hover { color:#001833; }
          .inseo-bc-sep { color:#d1d5db; }
          .inseo-bc-cur { color:#001833;font-weight:500; }
          .inseo-sec { padding:80px 40px; }
          .inseo-sec-inner { max-width:1200px;margin:0 auto; }
          .inseo-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#001833;margin-bottom:12px; }
          .inseo-h2 { font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px; }
          .inseo-h2 span { background:linear-gradient(90deg,#001833,#003366);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .inseo-lead { font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px; }
          .inseo-bg { background:#f0f3f8; }
          .inseo-grid3 { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .inseo-card { background:linear-gradient(135deg,rgba(0,24,51,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(0,24,51,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(0,24,51,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .inseo-card:hover { transform:translateY(-6px);border-color:rgba(0,24,51,0.22);box-shadow:0 16px 48px rgba(0,24,51,0.12); }
          .inseo-icon { width:48px;height:48px;border-radius:14px;background:rgba(0,24,51,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:18px; }
          .inseo-icon svg { width:22px;height:22px;color:#001833; }
          .inseo-card-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3; }
          .inseo-card-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .inseo-results { background:linear-gradient(135deg,#000810 0%,#001833 100%);padding:64px 40px; }
          .inseo-results-inner { max-width:1200px;margin:0 auto; }
          .inseo-res-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(120,170,255,0.85);margin-bottom:12px;text-align:center; }
          .inseo-res-h { font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2; }
          .inseo-res-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .inseo-res-card { background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center; }
          .inseo-res-metric { font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px; }
          .inseo-res-label { font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px; }
          .inseo-res-sub { font-size:12.5px;color:rgba(255,255,255,0.50); }
          .inseo-why-card { background:linear-gradient(135deg,rgba(0,24,51,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(0,24,51,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(0,24,51,0.07); }
          .inseo-why-check { width:36px;height:36px;border-radius:10px;background:rgba(0,24,51,0.09);display:flex;align-items:center;justify-content:center;margin-bottom:16px; }
          .inseo-why-check svg { width:18px;height:18px;color:#001833; }
          .inseo-why-h { font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px; }
          .inseo-why-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .inseo-proc-num { font-size:3.5rem;font-weight:900;color:rgba(0,24,51,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px; }
          .inseo-proc-line { width:40px;height:3px;background:linear-gradient(90deg,#001833,rgba(0,24,51,0.2));border-radius:2px;margin-bottom:16px; }
          .inseo-proc-h { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px; }
          .inseo-proc-p { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .inseo-faq-list { display:flex;flex-direction:column;gap:10px; }
          .inseo-faq-item { background:linear-gradient(135deg,rgba(0,24,51,0.06) 0%,rgba(255,255,255,0.88) 60%,rgba(0,24,51,0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,24,51,0.06); }
          .inseo-faq-item.open { border-color:rgba(0,24,51,0.28); }
          .inseo-faq-btn { display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit; }
          .inseo-faq-qt { font-size:15px;font-weight:600;color:#0A1628;line-height:1.4; }
          .inseo-faq-icon { width:28px;height:28px;border-radius:50%;background:rgba(0,24,51,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s; }
          .inseo-faq-item.open .inseo-faq-icon { background:rgba(0,24,51,0.14);transform:rotate(45deg); }
          .inseo-faq-icon svg { width:14px;height:14px;color:#001833; }
          .inseo-faq-a { padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.75; }
          .inseo-cta { background:linear-gradient(135deg,rgba(0,24,51,0.10) 0%,rgba(255,255,255,0.65) 40%,rgba(0,24,51,0.08) 100%);padding:90px 40px;text-align:center;position:relative;overflow:hidden; }
          .inseo-cta-h { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;margin:0 0 18px;background:linear-gradient(90deg,#000810 0%,#001833 50%,#003366 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .inseo-cta-p { font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px; }
          @media (max-width:900px) { .inseo-grid3,.inseo-res-grid { grid-template-columns:1fr 1fr; } }
          @media (max-width:600px) {
            .inseo-hero,.inseo-sec,.inseo-results,.inseo-cta { padding-left:20px;padding-right:20px; }
            .inseo-hero { padding-top:60px;padding-bottom:50px; }
            .inseo-grid3,.inseo-res-grid { grid-template-columns:1fr; }
            .inseo-bc { padding:12px 20px; }
          }
        `}</style>
      </Head>

      <nav className="inseo-bc" aria-label="Breadcrumb">
        <div className="inseo-bc-inner">
          <Link href="/">Home</Link>
          <span className="inseo-bc-sep">›</span>
          <Link href="/seo-services-company/">SEO Services</Link>
          <span className="inseo-bc-sep">›</span>
          <span className="inseo-bc-cur">Insurance SEO Services</span>
        </div>
      </nav>

      <section className="inseo-hero">
        <div className="inseo-orb1" /><div className="inseo-orb2" />
        <div className="inseo-inner">
          <span className="inseo-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            Insurance SEO — Auto · Home · Life · Health · Commercial
          </span>
          <h1 className="inseo-h1">Insurance SEO That Drives Qualified<br/>Policy Buyers to Your Agency</h1>
          <p className="inseo-desc">1Solutions builds insurance SEO strategies that attract high-intent buyers researching auto, home, life, health, and commercial insurance — putting your agency in front of qualified prospects before they request a quote. YMYL-compliant content, GBP optimisation, and product-level keyword depth for independent and captive agents.</p>
          <div className="inseo-btns">
            <a href="#contact" className="inseo-btn-p">
              Get Your Free Insurance SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/affordable-seo-packages/" className="inseo-btn-s">View SEO Packages</Link>
          </div>
          <div className="inseo-trust">
            {['Insurance SEO Authority','YMYL Best Practices','Product-Level Keyword Depth','No Lock-in Contracts'].map(t => (
              <span key={t} className="inseo-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#001833" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="inseo-stats-bar">
            {[
              { num:'$50–$140', lbl:'avg CPC for insurance keywords — #1 most expensive vertical' },
              { num:'74%', lbl:'of insurance buyers start with an online search' },
              { num:'3×', lbl:'more inbound leads for agents using SEO' },
              { num:'$1,200+', lbl:'avg lifetime value per insured client' },
            ].map(s => (
              <div key={s.lbl} className="inseo-stat-item">
                <span className="inseo-stat-num">{s.num}</span>
                <span className="inseo-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inseo-sec inseo-bg" id="services">
        <div className="inseo-sec-inner">
          <span className="inseo-tag">What We Do</span>
          <h2 className="inseo-h2">Full-Spectrum <span>Insurance SEO Services</span></h2>
          <p className="inseo-lead">From auto insurance keyword strategy to YMYL content authority — every component your agency needs to rank and convert high-intent insurance buyers.</p>
          <div className="inseo-grid3">
            {SERVICES.map(s => (
              <div key={s.title} className="inseo-card">
                <div className="inseo-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg></div>
                <h3 className="inseo-card-h">{s.title}</h3>
                <p className="inseo-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inseo-results">
        <div className="inseo-results-inner">
          <span className="inseo-res-tag">Client Results</span>
          <h2 className="inseo-res-h">Insurance SEO Results That Grow Policy Sales</h2>
          <div className="inseo-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="inseo-res-card">
                <div className="inseo-res-metric" style={{ color: r.color }}>{r.metric}</div>
                <div className="inseo-res-label">{r.label}</div>
                <div className="inseo-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inseo-sec" id="why-us">
        <div className="inseo-sec-inner">
          <span className="inseo-tag">Why 1Solutions</span>
          <h2 className="inseo-h2">The Insurance SEO Agency <span>That Understands YMYL</span></h2>
          <p className="inseo-lead">We build insurance SEO strategies that meet Google\'s elevated content standards for financial services — and attract the qualified buyer traffic that converts into policy sales.</p>
          <div className="inseo-grid3">
            {WHY.map(w => (
              <div key={w.title} className="inseo-why-card">
                <div className="inseo-why-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <h3 className="inseo-why-h">{w.title}</h3>
                <p className="inseo-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inseo-sec inseo-bg" id="process">
        <div className="inseo-sec-inner">
          <span className="inseo-tag">How We Work</span>
          <h2 className="inseo-h2">Our <span>6-Step Insurance SEO Process</span></h2>
          <p className="inseo-lead">From YMYL-compliant audit to ongoing quote request growth — a structured process for insurance agencies that want to compete and win online.</p>
          <div className="inseo-grid3">
            {PROCESS.map(p => (
              <div key={p.n}>
                <div className="inseo-proc-num">{p.n}</div>
                <div className="inseo-proc-line" />
                <h3 className="inseo-proc-h">{p.title}</h3>
                <p className="inseo-proc-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inseo-sec" id="faq">
        <div className="inseo-sec-inner">
          <span className="inseo-tag">Got Questions?</span>
          <h2 className="inseo-h2">Insurance SEO <span>FAQs</span></h2>
          <div className="inseo-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={'inseo-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="inseo-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="inseo-faq-qt">{f.q}</span>
                  <span className="inseo-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                </button>
                {openFaq === i && <div className="inseo-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inseo-cta" id="contact">
        <div className="inseo-sec-inner">
          <span className="inseo-tag" style={{ display:'block', textAlign:'center', marginBottom:12 }}>Ready to Grow Your Policy Sales?</span>
          <h2 className="inseo-cta-h">Get Your Free Insurance Agency SEO Audit</h2>
          <p className="inseo-cta-p">We will audit your website, GBP, product page coverage, and citation profile — and deliver a prioritised action plan for growing your organic quote requests. Free, no obligation.</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" className="inseo-btn-p">
              Request Free Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/affordable-seo-packages/" className="inseo-btn-s">View SEO Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
