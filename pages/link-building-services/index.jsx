'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ServiceHero from '../../components/sections/ServiceHero';

/* ── Aurora text ─────────────────────────────────────────────────────── */
function AuroraText({ children }) {
  return (
    <span style={{background:'linear-gradient(135deg,#f43f5e,#ec4899,#a855f7,#8b5cf6,#3b82f6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',backgroundSize:'200% auto',animation:'lbs-aurora 4s linear infinite'}}>{children}</span>
  );
}

const SERVICES = [
  { n:'01', icon:'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title:'Guest Post Placements', body:'Original content written in your niche, published on real DR40+ websites with contextual links back to your target pages. Full editorial control, niche-relevant anchor text, live links indexed within weeks.' },
  { n:'02', icon:'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title:'Niche Edits (Link Insertions)', body:'Your link placed within already-indexed, high-authority content on relevant websites. Faster indexing than new posts, strong topical relevance, and immediate authority transfer.' },
  { n:'03', icon:'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z', title:'Digital PR & Premium Placements', body:'Coverage and links from online publications, industry media, and news sites. High-DR60+ domains, powerful for competitive industries and brand authority. Available on the Authority plan.' },
];

const WHY = [
  { icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'White-Hat Only', body:'We never buy links from link farms, use PBNs, or run automated outreach tools. Every link is a real editorial placement from a real website.' },
  { icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title:'15+ Years of Outreach Relationships', body:"We've built relationships with thousands of editors and site owners across verticals — meaning faster placements and access to sites competitors can't reach through cold outreach." },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Minimum DR40+ Guarantee', body:'We set and enforce minimum Domain Rating thresholds per plan (DR40+, DR50+, DR60+) to ensure you only receive links from genuinely authoritative sites.' },
  { icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title:'Niche Relevance First', body:'Authority matters, but so does context. Every link we build comes from a site topically related to your industry — which sends the right signals to Google.' },
  { icon:'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title:'Full Transparency, No Black Boxes', body:'Your live link tracker is updated the moment a link goes live. You see every link, every domain, every metric — nothing is hidden in a summary report.' },
  { icon:'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', title:'Works With Any SEO Strategy', body:'Whether you have an in-house SEO team, a separate on-page agency, or just need link velocity, our standalone packages slot in without disruption.' },
];

const PROCESS = [
  { n:'01', icon:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', title:'Backlink Gap Analysis', body:'We audit your current link profile and your top 5 competitors to identify exactly which sites link to them but not you — your highest-priority acquisition targets.' },
  { n:'02', icon:'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title:'Prospect Research & Vetting', body:'We identify prospective link sites using DR, organic traffic, topical relevance, and editorial standards. No link farms, no PBNs — every site is manually reviewed.' },
  { n:'03', icon:'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title:'Outreach & Placement', body:'Our outreach team contacts editors, site owners, and publications with personalised pitches. We write all content or supply anchor text briefs based on your strategy.' },
  { n:'04', icon:'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'Reporting & Live Tracker', body:'Every link placed is logged: live URL, anchor text, DR, organic traffic of the linking page, target page. Full transparency on a live Google Sheets tracker or dashboard.' },
];

const INDUSTRIES = [
  { icon:'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', title:'eCommerce', body:'Category page links, product comparison placements, and niche-relevant editorial mentions for Shopify, WooCommerce, and Magento stores targeting buyers.' },
  { icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1', title:'SaaS & Tech', body:'Integration pages, developer blogs, software review sites, and product comparisons. DR50+ placements where your ICPs discover tools.' },
  { icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title:'Local Businesses', body:'Regional publications, local business directories, and geo-relevant editorial sites for law firms, dental practices, contractors, and service businesses.' },
  { icon:'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title:'B2B Services', body:'Industry publications, thought leadership placements, and guest posts on business, marketing, and professional services sites anchored to your service pages.' },
];

const WHAT_IS = [
  'Link building is the process of earning hyperlinks from other websites to your own. Each link acts as a vote of confidence — Google interprets backlinks from authoritative, relevant sites as a signal that your content is trustworthy and worth ranking highly.',
  'Not all links are equal. A single editorial link from a DR60+ industry publication can move rankings faster than 100 directory submissions. Quality, topical relevance, and the authority of the linking domain matter far more than raw link count.',
  'For competitive commercial keywords — "best SEO agency," "Shopify development company," "WordPress developer Toronto" — backlinks are the single biggest differentiator between page 1 results and page 5. On-page SEO gets you indexed; links get you ranked.',
];

const FAQS = [
  { q: 'How is link building services different from link building packages?', a: 'Link Building Services describes the methodology and deliverables — what we actually do to acquire your links (manual outreach, guest posts, niche edits, digital PR). Link Building Packages is the pricing and plan structure — how many links per month, at what DR, and at what price. Start here to understand what we do; visit the packages page to choose your plan.' },
  { q: 'What DR (Domain Rating) links do you build?', a: 'Our packages specify minimum DR thresholds: Starter (DR40+), Growth (DR50+), Authority (DR60+). In practice, many links we place exceed the floor — it is a minimum, not an average. We use DR alongside organic traffic and topical relevance to evaluate each prospective site before outreach begins.' },
  { q: 'How long before I see ranking improvements?', a: 'New backlinks are typically indexed within 2 to 6 weeks. Domain authority improvements become visible in 2 to 4 months. Ranking improvements for target keywords are usually observable between 3 and 6 months. Significant organic traffic growth follows 6 to 9 months into a consistent monthly programme. Link building compounds — month 12 results are exponentially better than month 3.' },
  { q: 'Do you build links for ecommerce and SaaS sites?', a: 'Yes. We build links for ecommerce stores (Shopify, WooCommerce, Magento), SaaS platforms, B2B service businesses, professional services, and content sites. ecommerce and SaaS often require specific placement types — product category page links, integration pages, feature comparison content — which our team is experienced with.' },
  { q: 'What is the difference between white-hat and black-hat link building?', a: 'White-hat link building uses manual outreach, original content, and genuine editorial relationships to earn links from real websites. Black-hat uses private blog networks (PBNs), automated tools, and paid link schemes. White-hat links are permanent and compound over time. Black-hat links risk Google manual penalties that can wipe out years of ranking progress overnight. We use white-hat methods exclusively.' },
  { q: 'How many links do I need per month?', a: 'The right volume depends on your current domain rating, the competitiveness of your target keywords, and how aggressively your competitors are building links. A local business may see strong results with 3 to 5 high-quality links per month. A national ecommerce brand may need 10 to 20 per month to close the authority gap. We run a backlink gap analysis before starting every engagement to recommend the right monthly volume.' },
  { q: 'Do you offer link building for specific target pages?', a: 'Yes. We build links to specific target URLs — your most important service pages, product category pages, location pages, or blog posts. You specify the target pages and preferred anchor text strategy, and we direct placements accordingly. Distributing link equity across deep pages is more effective for ranking individual service and product pages.' },
  { q: 'Can I see a sample link before committing?', a: 'Yes. We can share anonymised examples of recent placements — the type of site, DR range, and content format — before you begin. We cannot share live URLs of client placements without permission, but we can show you representative examples across our service tiers so you can assess quality before signing up.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',         item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Link Building Services', item: 'https://www.1solutions.biz/link-building-services/' },
      ],
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.1solutions.biz/#organization',
      name: '1Solutions',
      url: 'https://www.1solutions.biz',
      logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
      foundingDate: '2008',
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '127', bestRating: '5' },
    },
    {
      '@type': 'ProfessionalService',
      name: 'Link Building Services',
      provider: {
        '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
      },
      serviceType: 'Link Building',
      url: 'https://www.1solutions.biz/link-building-services/',
      description: 'Manual outreach link building services from 1Solutions — guest posts, niche edits, and digital PR from DR40+ to DR60+ websites. 50,000+ links built. 15+ years experience.',
      areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function LinkBuildingServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const revealRef = useRef([]);

  useEffect(() => {
    const els = document.querySelectorAll('.lbs-reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('lbs-vis'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Quality Link Building Services | DR40–DR60+ Backlinks | 1Solutions</title>
        <meta name="description" content="Manual outreach link building — guest posts on DR40+ sites, niche edits & digital PR. 50,000+ links built, 92% retention. White-hat only. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/link-building-services/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Link Building Services | 1Solutions" />
        <meta property="og:description" content="Manual outreach link building. Guest posts on DR40–DR60+ sites, niche edits, digital PR. 50,000+ links built over 15 years. White-hat only." />
        <meta property="og:url" content="https://www.1solutions.biz/link-building-services/" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-link-building-services.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta key="og-image-alt" property="og:image:alt" content="1Solutions Link Building Services — manual outreach, DR40–DR60+ backlinks" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-link-building-services.jpg" />
        <meta name="twitter:image:alt" content="1Solutions Link Building Services — manual outreach, DR40–DR60+ backlinks" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          @keyframes lbs-aurora{0%{background-position:0% center}100%{background-position:200% center}}
          /* ── Base ── */
          .lbs-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);background-attachment:scroll;color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .lbs-page *,.lbs-page *::before,.lbs-page *::after{box-sizing:border-box}
          /* ── Orbs ── */
          .lbs-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .lbs-orb1{width:900px;height:900px;background:radial-gradient(circle,rgba(99,130,255,.35) 0%,rgba(139,92,246,.15) 40%,transparent 70%);top:-300px;right:-300px}
          .lbs-orb2{width:800px;height:800px;background:radial-gradient(circle,rgba(251,146,60,.30) 0%,rgba(245,158,11,.15) 40%,transparent 70%);bottom:0;left:-250px}
          .lbs-orb3{width:600px;height:600px;background:radial-gradient(circle,rgba(20,184,166,.20) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%)}
          /* ── Reveal ── */
          .lbs-reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .lbs-reveal.lbs-vis{opacity:1;transform:translateY(0)}
          /* ── Breadcrumb ── */.lbs-bc a:hover{color:#D97706}
          /* ── Hero CTA buttons (reused in final CTA section) ── */
          .lbs-btns{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:32px}
          .lbs-btn-p{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);border-radius:50px;color:#fff;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,0.25)}
          .lbs-btn-p:hover{background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,0.30)}
          .lbs-btn-s{display:inline-flex;align-items:center;padding:14px 32px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .lbs-btn-s:hover{background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);transform:translateY(-2px)}
          /* ── Section ── */
          .lbs-sec{padding:80px 40px;position:relative;z-index:1}
          .lbs-white{background:#fff}
          .lbs-in{max-width:1280px;margin:0 auto}
          .lbs-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .lbs-h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:12px}
          .lbs-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}
          /* ── Glass card ── */
          .lbs-glass{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s,border-color .22s}
          .lbs-glass:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(15,52,96,.12);border-color:rgba(217,119,6,.30)}
          /* ── Grids ── */
          .lbs-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .lbs-g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
          .lbs-g2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
          /* ── Icon badge ── */
          .lbs-nbadge{width:40px;height:40px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:16px;box-shadow:0 4px 12px rgba(15,52,96,0.25);flex-shrink:0}
          .lbs-card-h{font-size:16px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .lbs-card-p{font-size:13px;color:#4A6080;line-height:1.65}
          /* ── Process steps ── */
          .lbs-step-num{font-family:'Courier New',ui-monospace,monospace;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#6b7280;margin-bottom:12px}
          /* ── FAQ ── */
          .lbs-faq-list{display:flex;flex-direction:column;gap:10px;margin-top:40px}
          .lbs-fitem{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06),inset 0 1px 0 rgba(255,255,255,.95);transition:border-color .2s}
          .lbs-fitem.lbs-open{border-color:rgba(217,119,6,.35)}
          .lbs-fitem.lbs-open::before{content:'';display:block;height:3px;background:#D97706;border-radius:3px 3px 0 0}
          .lbs-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .lbs-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .lbs-fitem.lbs-open .lbs-fq-badge{background:#D97706;color:#fff}
          .lbs-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .lbs-fitem.lbs-open .lbs-fq-text{color:#B45309}
          .lbs-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .lbs-fitem.lbs-open .lbs-fchev{transform:rotate(180deg);color:#D97706}
          .lbs-fanswer-wrap{overflow:hidden;max-height:0;transition:max-height .35s ease}
          .lbs-fitem.lbs-open .lbs-fanswer-wrap{max-height:500px}
          .lbs-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          /* ── CTA section ── */
          .lbs-cta-sec{padding:80px 40px;background:linear-gradient(135deg,rgba(254,243,199,.70) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1;text-align:center}
          .lbs-cta-h{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:14px}
          .lbs-cta-p{font-size:15px;color:#4A6080;line-height:1.7;max-width:580px;margin:0 auto 32px}
          /* ── What Is text section ── */
          .lbs-prose p{font-size:15px;color:#4A6080;line-height:1.8;margin-bottom:18px}
          /* ── Responsive ── */
          @media(max-width:1024px){
            .lbs-g3{grid-template-columns:repeat(2,1fr)}
            .lbs-g4{grid-template-columns:repeat(2,1fr)}
          }
          @media(max-width:768px){
            .lbs-sec{padding:52px 20px}
            .lbs-cta-sec{padding:52px 20px}
            .lbs-glass,.lbs-fitem{backdrop-filter:none;-webkit-backdrop-filter:none}
            .lbs-g3,.lbs-g4,.lbs-g2{grid-template-columns:1fr}
            .lbs-fq{padding:18px 18px 18px 52px}
            .lbs-fanswer{padding:0 18px 18px 52px}
            .lbs-fq-badge{left:12px}
          }
        `}</style>
      </Head>

      <div className="lbs-page">
        <div className="lbs-orb lbs-orb1"/><div className="lbs-orb lbs-orb2"/><div className="lbs-orb lbs-orb3"/>

        {/* ── HERO ── */}
        <ServiceHero
          eyebrow="Link Building · DR40–DR60+ · Manual Outreach · White-Hat Only"
          title={<>Link Building Services That Move Rankings with <AuroraText>Real Authority</AuroraText></>}
          subtext="We build high-authority backlinks through 100% manual outreach — guest posts on niche-relevant DR40+ sites, niche edits in existing indexed content, and digital PR placements. Every link reported, every placement tracked live."
          primaryCta={{ label: 'View Packages', href: '/link-building-packages/#pricing' }}
          secondaryCta={{ label: 'Talk to a Specialist', href: '/contact-us/' }}
          stats={[
            { label: 'Links Built', value: '50,000', suffix: '+' },
            { label: 'Avg DR', value: '50', prefix: 'DR', suffix: '+' },
            { label: 'Years', value: '15', suffix: '+' },
            { label: 'Retention', value: '92', suffix: '%' },
          ]}
        />

        {/* ── SERVICES ── */}
        <section className="lbs-sec" id="services">
          <div className="lbs-in">
            <div className="lbs-reveal">
              <span className="lbs-ey">What We Build</span>
              <h2 className="lbs-h2">Three Types of <AuroraText>High-Authority Backlinks</AuroraText></h2>
              <p className="lbs-lead">Every link we build is a genuine editorial placement — no shortcuts, no automation, no link farms.</p>
            </div>
            <div className="lbs-g3">
              {SERVICES.map((s, i) => (
                <div key={s.title} className="lbs-glass lbs-reveal" style={{transitionDelay:`${i*80}ms`,display:'flex',flexDirection:'column'}}>
                  <div className="lbs-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                  </div>
                  <div className="lbs-step-num">{s.n}</div>
                  <div className="lbs-card-h">{s.title}</div>
                  <p className="lbs-card-p">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY 1SOLUTIONS ── */}
        <section className="lbs-sec lbs-white" id="why-us">
          <div className="lbs-in">
            <div className="lbs-reveal">
              <span className="lbs-ey">Why 1Solutions</span>
              <h2 className="lbs-h2">What Makes Our Link Building <AuroraText>Different</AuroraText></h2>
              <p className="lbs-lead">Fifteen years of outreach relationships, strict quality standards, and zero tolerance for tactics that risk your site.</p>
            </div>
            <div className="lbs-g3">
              {WHY.map((w, i) => (
                <div key={w.title} className="lbs-glass lbs-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="lbs-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  </div>
                  <div className="lbs-card-h">{w.title}</div>
                  <p className="lbs-card-p">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="lbs-sec" id="process">
          <div className="lbs-in">
            <div className="lbs-reveal">
              <span className="lbs-ey">Our Process</span>
              <h2 className="lbs-h2">How We Build Your <AuroraText>Backlinks</AuroraText></h2>
              <p className="lbs-lead">A repeatable four-stage process that delivers high-quality links at scale — with full visibility at every step.</p>
            </div>
            <div className="lbs-g4">
              {PROCESS.map((p, i) => (
                <div key={p.n} className="lbs-glass lbs-reveal" style={{transitionDelay:`${i*80}ms`}}>
                  <div className="lbs-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon}/></svg>
                  </div>
                  <div className="lbs-step-num">{p.n}</div>
                  <div className="lbs-card-h">{p.title}</div>
                  <p className="lbs-card-p">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT IS LINK BUILDING ── */}
        <section className="lbs-sec lbs-white">
          <div className="lbs-in" style={{maxWidth:900}}>
            <div className="lbs-reveal">
              <span className="lbs-ey">The Fundamentals</span>
              <h2 className="lbs-h2">What Is <AuroraText>Link Building?</AuroraText></h2>
            </div>
            <div className="lbs-prose lbs-reveal">
              {WHAT_IS.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="lbs-sec" id="industries">
          <div className="lbs-in">
            <div className="lbs-reveal">
              <span className="lbs-ey">Industries We Serve</span>
              <h2 className="lbs-h2">Link Building for <AuroraText>Every Business Type</AuroraText></h2>
              <p className="lbs-lead">Our outreach relationships span a wide range of verticals — so your links always come from sites your audience actually reads.</p>
            </div>
            <div className="lbs-g2" style={{maxWidth:900}}>
              {INDUSTRIES.map((ind, i) => (
                <div key={ind.title} className="lbs-glass lbs-reveal" style={{transitionDelay:`${i*80}ms`}}>
                  <div className="lbs-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={ind.icon}/></svg>
                  </div>
                  <div className="lbs-card-h">{ind.title}</div>
                  <p className="lbs-card-p">{ind.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="lbs-sec lbs-white" id="faq">
          <div className="lbs-in" style={{maxWidth:900}}>
            <div className="lbs-reveal">
              <span className="lbs-ey">Common Questions</span>
              <h2 className="lbs-h2">Link Building Services <AuroraText>FAQs</AuroraText></h2>
              <p className="lbs-lead">Answers to the most common questions before getting started. Ready for pricing? See our <Link href="/link-building-packages/">link building packages</Link> for plan details.</p>
            </div>
            <div className="lbs-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`lbs-fitem${openFaq === i ? ' lbs-open' : ''}`}>
                  <button className="lbs-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="lbs-fq-badge">{String(i + 1).padStart(2, '0')}</span>
                    <span className="lbs-fq-text">{f.q}</span>
                    <svg className="lbs-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <div className="lbs-fanswer-wrap">
                    <div className="lbs-fanswer">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="lbs-cta-sec">
          <div className="lbs-in">
            <div className="lbs-reveal">
              <span className="lbs-ey" style={{display:'block',textAlign:'center',marginBottom:12}}>Free Backlink Gap Analysis</span>
              <h2 className="lbs-cta-h">Ready to Build Backlinks <AuroraText>That Matter?</AuroraText></h2>
              <p className="lbs-cta-p">Share your domain and target keywords — we&rsquo;ll run a free backlink gap analysis and recommend the right plan and monthly volume for your site.</p>
              <div className="lbs-btns">
                <Link href="/link-building-packages/#pricing" className="lbs-btn-p">
                  View Packages
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link href="/contact-us/" className="lbs-btn-s">Talk to a Specialist</Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
