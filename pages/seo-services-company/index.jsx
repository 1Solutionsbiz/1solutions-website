import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Technical SEO', desc: 'Site architecture, crawlability, Core Web Vitals, schema markup, and indexation — we fix the foundations Google rewards.' },
  { icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', title: 'Local SEO', desc: 'Dominate Google Maps and local packs in your city or suburb. Perfect for US, Canadian and Australian businesses.' },
  { icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'eCommerce SEO', desc: 'Product, category and collection page optimisation that drives qualified buyers — not just traffic.' },
  { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', title: 'International SEO', desc: 'Hreflang, geo-targeting and market-specific keyword strategies for US, Canada and Australia.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Content Strategy & SEO Writing', desc: 'E-E-A-T-compliant blog posts, landing pages and pillar content that ranks and converts.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Link Building', desc: 'White-hat authority link acquisition from relevant, high-DR publications — no PBNs, no spam.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'SEO Audits', desc: 'Comprehensive 200-point audits covering technical, on-page, off-page and competitor benchmarking.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Enterprise SEO', desc: 'Scalable SEO operations for large sites — automated auditing, log file analysis, and CMS integration.' },
  { icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'SEO Reporting & Analytics', desc: 'Monthly transparent reporting — rankings, traffic, conversions, and ROI — in plain English.' },
];

const RESULTS = [
  { metric: '312%', label: 'Organic traffic growth', sub: 'US SaaS client — 8 months', color: '#FE9700' },
  { metric: '#1', label: 'Google ranking achieved', sub: 'Competitive AU retail keyword', color: '#7C3AED' },
  { metric: '4.1×', label: 'Return on SEO investment', sub: 'Canadian eCommerce brand', color: '#0F3460' },
];

const PROCESS = [
  { n: '01', title: 'Discovery & Audit', desc: 'Deep-dive into your site, competitors, and market. We identify every opportunity and obstacle before writing a single word.' },
  { n: '02', title: 'Strategy Blueprint', desc: 'A custom roadmap — keyword clusters, content gaps, technical priorities, and link targets — mapped to your revenue goals.' },
  { n: '03', title: 'Technical Fixes', desc: 'Our devs fix crawl errors, speed issues, schema, canonicals, and indexation problems. The work that 90% of agencies skip.' },
  { n: '04', title: 'Content & On-Page', desc: 'We create or optimise pages with E-E-A-T best practices, semantic HTML, and conversion-focused copy.' },
  { n: '05', title: 'Authority Building', desc: 'Outreach-driven link acquisition from relevant, high-authority publications — building trust with Google over time.' },
  { n: '06', title: 'Measure & Scale', desc: 'Monthly reporting on rankings, traffic, and revenue impact. We double down on what works and adjust what does not.' },
];

const WHY = [
  { title: '15+ Years of SEO Experience', desc: 'We have been optimising websites since before Google Panda. We have seen every algorithm change and adapted accordingly.' },
  { title: 'US, Canada & Australia Focus', desc: 'We understand English-language search behaviour, local intent, and the competitive landscape in your market.' },
  { title: 'No Lock-in Contracts', desc: 'We earn your business every month. Month-to-month engagements — you stay because results speak for themselves.' },
  { title: 'Full-Stack SEO Team', desc: 'Technical SEOs, content strategists, developers and link builders working as one cohesive unit on your account.' },
  { title: 'Transparent Reporting', desc: 'No vanity metrics. Every report ties SEO activity directly to traffic, leads and revenue — the numbers that matter.' },
  { title: 'White-Hat Only', desc: 'Every tactic we use aligns with Google guidelines. Your rankings are built to last, not to disappear after the next update.' },
];

const FAQS = [
  { q: 'How long does SEO take to show results?', a: 'Most clients see meaningful movement in rankings and organic traffic within 3 to 6 months. Competitive industries or technically complex sites may take longer. We set honest expectations upfront and show you progress every step of the way.' },
  { q: 'Do you work with businesses in the US, Canada and Australia?', a: 'Yes — these are our primary markets. We understand the search landscape, local intent signals, and competitive dynamics in each region. We also have clients across the UK and Europe.' },
  { q: 'What makes 1Solutions different from other SEO agencies?', a: 'Three things: we are a full-stack team (technical + content + links), we have 15+ years of real results, and we give you complete transparency on what we are doing and why. No black-box tactics, no lock-in contracts.' },
  { q: 'Do you offer SEO packages or custom plans?', a: 'Both. We have structured monthly SEO packages for SMBs, and fully custom enterprise SEO programmes for larger websites. Every engagement starts with an audit so we only recommend what you actually need.' },
  { q: 'Can you recover a site hit by a Google penalty or algorithm update?', a: 'Yes. We have successfully recovered dozens of sites from manual penalties (link schemes, thin content) and algorithmic drops (Panda, Penguin, HCU). Recovery starts with a forensic audit to identify the root cause.' },
  { q: 'Do you provide SEO for eCommerce websites?', a: 'Absolutely. eCommerce SEO is one of our specialities — from product and category page optimisation to faceted navigation, structured data, and Google Shopping feeds. We work with Shopify, WooCommerce, Magento and custom platforms.' },
  { q: 'How do you measure SEO success?', a: 'We track keyword rankings, organic sessions, bounce rate, conversion rate, and ultimately revenue attributed to organic search. You get a clear monthly report with plain-English commentary — no spreadsheet dumps.' },
  { q: 'What does your onboarding process look like?', a: 'After signing, we begin with a comprehensive technical and content audit (week 1 to 2), followed by strategy presentation (week 3). Active SEO work begins in week 4. You will have a dedicated account manager from day one.' },
];

export default function SeoServices() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Head>
        <title>SEO Services Company | Rank #1 on Google - 1Solutions</title>
        <meta name="description" content="1Solutions is a results-driven SEO company serving US, Canada and Australia. Technical SEO, content strategy, link building and eCommerce SEO — all under one roof. 15+ years experience." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/seo-services-company/" />
        <meta property="og:title" content="SEO Services Company | Rank #1 on Google - 1Solutions" />
        <meta property="og:description" content="15+ years of SEO expertise. Technical SEO, local SEO, eCommerce SEO, link building and content strategy for US, Canada and Australia businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.1solutions.biz/seo-services-company/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "SEO Services",
          provider: { "@type": "Organization", name: "1Solutions", url: "https://www.1solutions.biz" },
          description: "Full-service SEO company offering technical SEO, content strategy, link building and local SEO for businesses in US, Canada and Australia.",
          areaServed: ["US", "CA", "AU"],
          serviceType: "Search Engine Optimisation",
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        })}} />
        <style>{`
          * { box-sizing: border-box; }
          .seo-hero { position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(254,243,199,0.55) 0%,rgba(255,255,255,0.70) 50%,rgba(219,234,254,0.45) 100%); }
          .seo-hero-orb1 { position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(254,151,0,0.13) 0%,transparent 70%);pointer-events:none;filter:blur(10px); }
          .seo-hero-orb2 { position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.09) 0%,transparent 70%);pointer-events:none;filter:blur(8px); }
          .seo-hero-inner { max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 400px;gap:60px;align-items:center;position:relative;z-index:1; }
          .seo-eyebrow { display:inline-flex;align-items:center;gap:8px;background:rgba(254,151,0,0.10);border:1px solid rgba(254,151,0,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#D97706;margin-bottom:24px; }
          .seo-h1 { font-size:clamp(2.2rem,4vw,3.4rem);font-weight:900;line-height:1.15;letter-spacing:-1.5px;margin:0 0 22px;background:linear-gradient(90deg,#0F3460 0%,#F59E0B 50%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .seo-hero-desc { font-size:1.05rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:560px; }
          .seo-hero-btns { display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px; }
          .seo-btn-primary { display:inline-flex;align-items:center;gap:8px;background:#0F3460;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(15,52,96,0.25); }
          .seo-btn-primary:hover { background:#0a2448;transform:translateY(-2px);box-shadow:0 10px 32px rgba(15,52,96,0.32); }
          .seo-btn-secondary { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);color:#0F3460;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(15,52,96,0.18);transition:all 0.25s;backdrop-filter:blur(8px); }
          .seo-btn-secondary:hover { background:#fff;transform:translateY(-2px);border-color:rgba(254,151,0,0.4); }
          .seo-trust-row { display:flex;flex-wrap:wrap;gap:20px;align-items:center; }
          .seo-trust-badge { display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500; }
          .seo-trust-badge svg { color:#FE9700; }
          .seo-hero-card { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:24px;padding:36px;box-shadow:0 8px 48px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .seo-hero-card-title { font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;margin:0 0 24px; }
          .seo-stat-grid { display:grid;grid-template-columns:1fr 1fr;gap:24px 20px; }
          .seo-stat-item { display:flex;flex-direction:column;gap:4px; }
          .seo-stat-num { font-size:2.2rem;font-weight:900;color:#0F3460;line-height:1;letter-spacing:-1px; }
          .seo-stat-lbl { font-size:12px;color:#6b7280;font-weight:500;line-height:1.4; }
          .seo-stat-item:nth-child(1) .seo-stat-num { color:#FE9700; }
          .seo-stat-item:nth-child(3) .seo-stat-num { color:#7C3AED; }
          .seo-hero-divider { border:none;border-top:1px solid rgba(15,52,96,0.08);margin:24px 0; }
          .seo-hero-note { font-size:12.5px;color:#6b7280;line-height:1.6;margin:0; }
          .seo-hero-note strong { color:#0F3460; }
          .seo-breadcrumb { background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px; }
          .seo-breadcrumb-inner { max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280; }
          .seo-breadcrumb a { color:#6b7280;text-decoration:none; }
          .seo-breadcrumb a:hover { color:#FE9700; }
          .seo-breadcrumb-sep { color:#d1d5db; }
          .seo-breadcrumb-current { color:#0F3460;font-weight:500; }
          .seo-section { padding:80px 40px; }
          .seo-section-inner { max-width:1200px;margin:0 auto; }
          .seo-section-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#D97706;margin-bottom:12px; }
          .seo-section-h2 { font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px; }
          .seo-section-h2 span { background:linear-gradient(90deg,#0F3460,#F59E0B);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .seo-section-desc { font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px; }
          .seo-bg-light { background:#f8fafd; }
          .seo-services-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .seo-svc-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .seo-svc-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.35);box-shadow:0 16px 48px rgba(15,52,96,0.13),inset 0 1px 0 rgba(255,255,255,1); }
          .seo-svc-icon { width:48px;height:48px;border-radius:14px;background:rgba(15,52,96,0.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px;transition:background 0.2s; }
          .seo-svc-card:hover .seo-svc-icon { background:rgba(254,151,0,0.12); }
          .seo-svc-icon svg { width:22px;height:22px;color:#0F3460;transition:color 0.2s; }
          .seo-svc-card:hover .seo-svc-icon svg { color:#D97706; }
          .seo-svc-title { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3; }
          .seo-svc-desc { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .seo-results-band { background:linear-gradient(135deg,#0A1628 0%,#0F3460 100%);padding:64px 40px; }
          .seo-results-inner { max-width:1200px;margin:0 auto; }
          .seo-results-tag { display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(254,151,0,0.8);margin-bottom:12px;text-align:center; }
          .seo-results-h2 { font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2; }
          .seo-results-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .seo-result-card { background:rgba(255,255,255,0.06);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.10);border-radius:20px;padding:36px 28px;text-align:center;transition:background 0.2s,border-color 0.2s; }
          .seo-result-card:hover { background:rgba(255,255,255,0.10);border-color:rgba(254,151,0,0.25); }
          .seo-result-metric { font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px; }
          .seo-result-label { font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px; }
          .seo-result-sub { font-size:12.5px;color:rgba(255,255,255,0.50); }
          .seo-why-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .seo-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .seo-why-card:hover { transform:translateY(-5px);border-color:rgba(217,119,6,0.35);box-shadow:0 14px 44px rgba(15,52,96,0.12); }
          .seo-why-check { width:36px;height:36px;border-radius:10px;background:rgba(254,151,0,0.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px; }
          .seo-why-check svg { width:18px;height:18px;color:#D97706; }
          .seo-why-title { font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px; }
          .seo-why-desc { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .seo-process-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:32px; }
          .seo-process-num { font-size:3.5rem;font-weight:900;color:rgba(15,52,96,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px; }
          .seo-process-line { width:40px;height:3px;background:linear-gradient(90deg,#FE9700,rgba(254,151,0,0.3));border-radius:2px;margin-bottom:16px; }
          .seo-process-title { font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px; }
          .seo-process-desc { font-size:13.5px;color:#4b5563;line-height:1.7;margin:0; }
          .seo-tools-wrap { display:flex;flex-wrap:wrap;gap:12px; }
          .seo-tool-pill { display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.7);border:1px solid rgba(15,52,96,0.12);border-radius:50px;padding:8px 16px;font-size:13px;font-weight:500;color:#374151;transition:border-color 0.2s,color 0.2s; }
          .seo-tool-pill:hover { border-color:rgba(254,151,0,0.4);color:#D97706; }
          .seo-tool-dot { width:8px;height:8px;border-radius:50%;background:#FE9700;flex-shrink:0; }
          .seo-ind-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:12px; }
          .seo-ind-pill { background:rgba(255,255,255,0.7);border:1px solid rgba(15,52,96,0.12);border-radius:10px;padding:14px 16px;font-size:13px;font-weight:600;color:#374151;text-align:center;transition:all 0.2s; }
          .seo-ind-pill:hover { background:rgba(254,151,0,0.07);border-color:rgba(254,151,0,0.35);color:#D97706; }
          .seo-faq-list { display:flex;flex-direction:column;gap:10px; }
          .seo-faq-item { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.06),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s; }
          .seo-faq-item.open { border-color:rgba(217,119,6,0.35);box-shadow:0 8px 32px rgba(15,52,96,0.10); }
          .seo-faq-q { display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit; }
          .seo-faq-q-text { font-size:15px;font-weight:600;color:#0A1628;line-height:1.4; }
          .seo-faq-icon { width:28px;height:28px;border-radius:50%;background:rgba(15,52,96,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s; }
          .seo-faq-item.open .seo-faq-icon { background:rgba(254,151,0,0.12);transform:rotate(45deg); }
          .seo-faq-icon svg { width:14px;height:14px;color:#0F3460; }
          .seo-faq-item.open .seo-faq-icon svg { color:#D97706; }
          .seo-faq-a { padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8; }
          .wp-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .wp-contact-container { max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:48px; }
          .wp-contact-title { font-size:clamp(2rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .wp-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 28px; }
          .wp-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .wp-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .wp-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .wp-benefit-icon { width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75; }
          .wp-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .wp-stats-box { padding-top:24px;border-top:1px solid rgba(15,52,96,0.12); }
          .wp-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .wp-stat-number { font-size:36px;font-weight:900;color:#0F3460;line-height:1;margin-bottom:4px; }
          .wp-stat-text { font-size:12px;color:#4A6080;line-height:1.4;font-weight:500; }
          .wp-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .wp-form-box h3 { font-size:24px;font-weight:700;margin:0 0 24px;color:#0F1F40;letter-spacing:-0.5px; }
          .wp-contact-form { display:flex;flex-direction:column;gap:16px; }
          .wp-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .wp-form-group { display:flex;flex-direction:column;gap:6px; }
          .wp-form-group.full { grid-column:1/-1; }
          .wp-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .wp-form-group input,.wp-form-group textarea,.wp-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .wp-form-group input:focus,.wp-form-group textarea:focus,.wp-form-group select:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12); }
          .wp-phone-input { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .wp-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .wp-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .wp-phone-input input:focus { outline:none; }
          .wp-consent { display:flex;gap:8px;align-items:flex-start;margin-top:4px; }
          .wp-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .wp-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .wp-consent a { color:#0F3460;text-decoration:none; }
          .wp-submit-btn { padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .wp-submit-btn:hover { background:rgba(15,52,96,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }
          .seo-cta-band { background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);padding:90px 40px;position:relative;overflow:hidden;border-top:1px solid rgba(255,255,255,0.80); }
          .seo-cta-orb1 { position:absolute;top:-80px;right:-80px;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(254,151,0,0.12) 0%,transparent 70%);pointer-events:none; }
          .seo-cta-orb2 { position:absolute;bottom:-60px;left:-60px;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(15,52,96,0.07) 0%,transparent 70%);pointer-events:none; }
          .seo-cta-inner { max-width:800px;margin:0 auto;text-align:center;position:relative;z-index:1; }
          .seo-cta-h2 { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;margin:0 0 18px;background:linear-gradient(90deg,#0F3460 0%,#F59E0B 50%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .seo-cta-desc { font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px; }
          @media (max-width:900px) {
            .seo-hero-inner { grid-template-columns:1fr; }
            .seo-hero-card { display:none; }
            .seo-services-grid,.seo-why-grid { grid-template-columns:1fr 1fr; }
            .seo-results-grid { grid-template-columns:1fr; }
            .seo-process-grid { grid-template-columns:1fr 1fr; }
            .seo-ind-grid { grid-template-columns:repeat(2,1fr); }
            .wp-contact-container { grid-template-columns:1fr; }
            .wp-form-row { grid-template-columns:1fr; }
          }
          @media (max-width:600px) {
            .seo-hero,.seo-section,.seo-results-band,.wp-contact-section,.seo-cta-band { padding-left:20px;padding-right:20px; }
            .seo-hero { padding-top:60px;padding-bottom:50px; }
            .seo-section { padding-top:56px;padding-bottom:56px; }
            .seo-services-grid,.seo-why-grid,.seo-process-grid { grid-template-columns:1fr; }
            .seo-ind-grid { grid-template-columns:1fr 1fr; }
            .seo-breadcrumb { padding:12px 20px; }
          }
        `}</style>
      </Head>

      {/* BREADCRUMB */}
      <nav className="seo-breadcrumb" aria-label="Breadcrumb">
        <div className="seo-breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="seo-breadcrumb-sep">›</span>
          <Link href="/#services">Digital Marketing</Link>
          <span className="seo-breadcrumb-sep">›</span>
          <span className="seo-breadcrumb-current">SEO Services</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="seo-hero">
        <div className="seo-hero-orb1" />
        <div className="seo-hero-orb2" />
        <div className="seo-hero-inner">
          <div>
            <span className="seo-eyebrow">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Trusted SEO Company — US · Canada · Australia
            </span>
            <h1 className="seo-h1">SEO That Ranks Your Business<br/>at the Top of Google</h1>
            <p className="seo-hero-desc">1Solutions is a 15-year-old SEO agency delivering measurable, sustainable organic growth for businesses across the US, Canada, and Australia. From technical foundations to authority links — we cover every dimension of modern search.</p>
            <div className="seo-hero-btns">
              <a href="#contact" className="seo-btn-primary">
                Get My Free SEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="/affordable-seo-packages/" className="seo-btn-secondary">View SEO Packages</a>
            </div>
            <div className="seo-trust-row">
              {['No lock-in contracts','White-hat only','Monthly reporting','24h response'].map(t => (
                <span key={t} className="seo-trust-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="seo-hero-card">
            <p className="seo-hero-card-title">Proven Track Record</p>
            <div className="seo-stat-grid">
              {[
                { num: '500+', lbl: 'SEO Projects Delivered' },
                { num: '15+',  lbl: 'Years of SEO Experience' },
                { num: '97%',  lbl: 'Client Retention Rate' },
                { num: '3x',   lbl: 'Avg. Traffic Growth in 6 Mo.' },
              ].map(s => (
                <div key={s.lbl} className="seo-stat-item">
                  <span className="seo-stat-num">{s.num}</span>
                  <span className="seo-stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>
            <hr className="seo-hero-divider" />
            <p className="seo-hero-note"><strong>Serving clients across</strong> the US, Canada &amp; Australia with market-specific SEO strategies built for English-language search.</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="seo-section seo-bg-light" id="services">
        <div className="seo-section-inner">
          <span className="seo-section-tag">What We Do</span>
          <h2 className="seo-section-h2">Full-Spectrum <span>SEO Services</span></h2>
          <p className="seo-section-desc">Every ranking signal, covered. We combine technical excellence, strategic content, and authoritative link building to deliver durable results across every type of business and industry.</p>
          <div className="seo-services-grid">
            {SERVICES.map(s => (
              <div key={s.title} className="seo-svc-card">
                <div className="seo-svc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                </div>
                <h3 className="seo-svc-title">{s.title}</h3>
                <p className="seo-svc-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS BAND */}
      <section className="seo-results-band">
        <div className="seo-results-inner">
          <span className="seo-results-tag">Client Results</span>
          <h2 className="seo-results-h2">Real Numbers. Real Businesses.</h2>
          <div className="seo-results-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="seo-result-card">
                <div className="seo-result-metric" style={{ color: r.color }}>{r.metric}</div>
                <div className="seo-result-label">{r.label}</div>
                <div className="seo-result-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="seo-section" id="why-us">
        <div className="seo-section-inner">
          <span className="seo-section-tag">Why 1Solutions</span>
          <h2 className="seo-section-h2">The SEO Agency That <span>Holds Itself Accountable</span></h2>
          <p className="seo-section-desc">We do not chase vanity rankings. We tie every action to your bottom line and show you the evidence every single month.</p>
          <div className="seo-why-grid">
            {WHY.map(w => (
              <div key={w.title} className="seo-why-card">
                <div className="seo-why-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="seo-why-title">{w.title}</h3>
                <p className="seo-why-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="seo-section seo-bg-light" id="process">
        <div className="seo-section-inner">
          <span className="seo-section-tag">How We Work</span>
          <h2 className="seo-section-h2">Our <span>6-Step SEO Process</span></h2>
          <p className="seo-section-desc">A structured, repeatable methodology that delivers compounding results — month after month, year after year.</p>
          <div className="seo-process-grid">
            {PROCESS.map(p => (
              <div key={p.n} className="seo-process-card">
                <div className="seo-process-num">{p.n}</div>
                <div className="seo-process-line" />
                <h3 className="seo-process-title">{p.title}</h3>
                <p className="seo-process-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="seo-section" id="tools">
        <div className="seo-section-inner">
          <span className="seo-section-tag">Our Toolkit</span>
          <h2 className="seo-section-h2">Tools &amp; <span>Technology We Use</span></h2>
          <p className="seo-section-desc">We invest in enterprise-grade SEO tooling so every decision is backed by data — not guesswork.</p>
          <div className="seo-tools-wrap">
            {['Google Search Console','Google Analytics 4','Ahrefs','SEMrush','Screaming Frog','Surfer SEO','Moz Pro','Majestic','Sitebulb','Looker Studio','BrightEdge','Hotjar'].map(t => (
              <span key={t} className="seo-tool-pill"><span className="seo-tool-dot" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="seo-section seo-bg-light" id="industries">
        <div className="seo-section-inner">
          <span className="seo-section-tag">Industries We Serve</span>
          <h2 className="seo-section-h2">SEO for <span>Every Industry</span></h2>
          <p className="seo-section-desc">We have delivered SEO results across a wide range of industries and business models — from early-stage startups to large enterprises.</p>
          <div className="seo-ind-grid">
            {['eCommerce','SaaS & Software','Healthcare','Real Estate','Legal & Law Firms','Finance & BFSI','Education & EdTech','Travel & Hospitality','Retail','Manufacturing','Automotive','Wellness & Fitness'].map(ind => (
              <div key={ind} className="seo-ind-pill">{ind}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="wp-contact-section" id="contact">
        <div className="wp-contact-container">
          <div>
            <h2 className="wp-contact-title">Get Your Free<br/>SEO Audit Today</h2>
            <p className="wp-contact-desc">Tell us about your website and goals. We will analyse your current SEO performance and share a clear, actionable roadmap — completely free, no obligations.</p>
            <div className="wp-merged-box">
              <div>
                {[
                  { icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', text:'Your details are 100% confidential. We never share your information.' },
                  { icon:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', text:'A senior SEO strategist personally reviews your site — not an automated tool.' },
                  { icon:'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-6v-4m0-4h.01', text:'We respond within 24 business hours with your custom audit findings.' },
                  { icon:'M20 6 9 17l-5-5', text:"No hard sell. If we are not the right fit, we will tell you honestly." },
                ].map((b, i) => (
                  <div className="wp-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                    <div className="wp-benefit-icon-wrap">
                      <svg className="wp-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={b.icon} /></svg>
                    </div>
                    <p>{b.text}</p>
                  </div>
                ))}
              </div>
              <div className="wp-stats-box">
                <div className="wp-stats-grid">
                  {[['500+','Projects Delivered'],['15+','Years Experience'],['97%','Client Retention']].map(([num,text]) => (
                    <div key={text}>
                      <div className="wp-stat-number">{num}</div>
                      <div className="wp-stat-text">{text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="wp-form-box">
              <h3>Request Free SEO Audit</h3>
              <form className="wp-contact-form" onSubmit={e => e.preventDefault()}>
                <div className="wp-form-row">
                  <div className="wp-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                  <div className="wp-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required /></div>
                </div>
                <div className="wp-form-row">
                  <div className="wp-form-group">
                    <label>Phone Number*</label>
                    <div className="wp-phone-input">
                      <select>
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+61">+61</option>
                      </select>
                      <input type="tel" placeholder="Phone Number*" required />
                    </div>
                  </div>
                  <div className="wp-form-group"><label>Website URL*</label><input type="url" placeholder="https://yourwebsite.com" required /></div>
                </div>
                <div className="wp-form-group full">
                  <label>Current SEO Challenge*</label>
                  <select required>
                    <option value="">Select your main SEO challenge</option>
                    <option>My site does not rank on Google</option>
                    <option>I lost rankings after a Google update</option>
                    <option>I need more organic traffic</option>
                    <option>I want to outrank competitors</option>
                    <option>I need a full SEO strategy</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="wp-form-group full"><label>Tell Us More*</label><textarea placeholder="Describe your goals, target market, or any SEO challenges you are facing..." rows={5} required /></div>
                <div className="wp-consent">
                  <input type="checkbox" id="seo-consent" required />
                  <label htmlFor="seo-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                </div>
                <button type="submit" className="wp-submit-btn">Get My Free SEO Audit</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="seo-section seo-bg-light" id="faq">
        <div className="seo-section-inner">
          <span className="seo-section-tag">Got Questions?</span>
          <h2 className="seo-section-h2">Frequently Asked <span>SEO Questions</span></h2>
          <div className="seo-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={"seo-faq-item" + (openFaq === i ? " open" : "")}>
                <button className="seo-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="seo-faq-q-text">{f.q}</span>
                  <span className="seo-faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </span>
                </button>
                {openFaq === i && <div className="seo-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="seo-cta-band">
        <div className="seo-cta-orb1" />
        <div className="seo-cta-orb2" />
        <div className="seo-cta-inner">
          <span className="seo-section-tag" style={{ display:'block',marginBottom:12 }}>Ready to Rank?</span>
          <h2 className="seo-cta-h2">Start Growing Your Organic Traffic Today</h2>
          <p className="seo-cta-desc">Join 500+ businesses that trust 1Solutions for their SEO. No lock-in contracts. Just results.</p>
          <div className="seo-hero-btns" style={{ justifyContent:'center' }}>
            <a href="#contact" className="seo-btn-primary">
              Get My Free SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/affordable-seo-packages/" className="seo-btn-secondary">View SEO Packages</a>
          </div>
        </div>
      </section>
    </>
  );
}
