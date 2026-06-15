import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Keyword Research & Strategy', desc: 'In-depth analysis of how Delhi customers search for your services — high-intent buying queries, local neighbourhood terms, and competitive gaps your rivals are missing.' },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Technical SEO', desc: 'Core Web Vitals optimisation, mobile speed, crawl error fixes, structured data, and site architecture — the technical foundation that lets every other SEO effort compound.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'On-Page SEO', desc: 'Title tags, meta descriptions, heading structure, internal linking, and content optimisation for every key page — written for Delhi buyers, tuned for Google ranking signals.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Local SEO Delhi', desc: 'Google Business Profile optimisation, Google Maps 3-pack strategy, Delhi-specific citation building, and NAP consistency management to dominate local search results in Delhi NCR.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Link Building', desc: 'Quality backlinks from Indian authority websites, Delhi business publications, industry directories, and digital PR — building the domain authority that sustains Page 1 positions.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Content Marketing', desc: 'SEO-driven blog articles, service page copy, and landing pages built around what Delhi customers are searching for — content that ranks and converts, not just fills word counts.' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'eCommerce SEO', desc: 'Product and category page optimisation for Delhi-based online stores on Shopify, WooCommerce, Magento, and custom platforms — more organic visibility, lower customer acquisition cost.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'SEO Reporting & Analytics', desc: 'Monthly reports showing keyword ranking movement, organic traffic growth, lead attribution, and ROI — clear numbers that show exactly what your Delhi SEO investment is generating.' },
];

const RESULTS = [
  { metric: '310%', label: 'Organic traffic growth', sub: 'Delhi real estate portal — 10 months', color: '#0c2461' },
  { metric: 'Top 3', label: 'Google positions for 80+ keywords', sub: 'Delhi B2B manufacturer — 9 months', color: '#FE9700' },
  { metric: '4.8×', label: 'Increase in organic leads', sub: 'Delhi healthcare services — 7 months', color: '#059669' },
];

const PROCESS = [
  { n: '01', title: 'Free Delhi SEO Audit', desc: 'We audit your website for technical health, current keyword rankings, backlink profile, competitor positions, and the specific gaps holding your Delhi business back from Page 1.' },
  { n: '02', title: 'Keyword & Market Research', desc: 'Deep analysis of how Delhi customers search for your services — mapping every high-intent query, local modifier, and competitor keyword gap into a prioritised ranking roadmap.' },
  { n: '03', title: 'Technical Optimisation', desc: 'We fix the technical foundations first — Core Web Vitals, mobile performance, crawl errors, schema markup, and site structure — so every subsequent effort builds on solid ground.' },
  { n: '04', title: 'On-Page & Content', desc: 'Optimising every key page for target keywords and creating new content that captures Delhi buyer demand across the full search intent spectrum — informational to transactional.' },
  { n: '05', title: 'Authority & Link Building', desc: 'Building quality backlinks from relevant Indian authority sites, Delhi publications, and business directories — compounding domain authority that holds rankings through algorithm updates.' },
  { n: '06', title: 'Monthly Reporting & Scale', desc: 'Clear monthly reports with ranking movement, traffic growth, and lead data — plus a forward roadmap so you always know what is happening and what we are prioritising next.' },
];

const WHY = [
  { title: 'Delhi Market Expertise', desc: "We understand Delhi's competitive digital landscape — from the startup density in Gurugram to the retail concentration in Connaught Place. Our strategy is built on real Delhi search data, not generic templates." },
  { title: '15+ Years SEO Experience', desc: "Founded in 2009, 1Solutions has navigated every major Google update — Panda, Penguin, Hummingbird, BERT, and Helpful Content — delivering consistent rankings for clients across Delhi NCR." },
  { title: 'Dedicated Account Manager', desc: 'Every Delhi client has one point of contact who understands your business, reports to you monthly, and is reachable when you need answers — no rotating account teams, no offshore handoffs.' },
  { title: 'White-Hat SEO Only', desc: "No shortcuts. We build rankings through technical excellence, content quality, and genuine authority building — methods that last well beyond the next algorithm update and never put your domain at risk." },
  { title: 'Transparent Reporting', desc: 'You see exactly what we did, what moved, and what it generated. Keyword rankings, organic sessions, and lead attribution in a clear monthly report — no smoke and mirrors.' },
  { title: 'No Lock-In Contracts', desc: "Month-to-month engagements because our results earn your continued business. You stay because your Delhi rankings keep climbing — not because a contract traps you." },
];

const INDUSTRIES = [
  { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', name: 'Real Estate & Property' },
  { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', name: 'Healthcare & Clinics' },
  { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', name: 'Education & Coaching' },
  { icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', name: 'Legal Services' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', name: 'Retail & eCommerce' },
  { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', name: 'IT & SaaS Companies' },
  { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', name: 'Hospitality & Hotels' },
  { icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', name: 'Manufacturing & B2B' },
];

const AREAS = [
  'Connaught Place', 'Karol Bagh', 'Saket', 'Hauz Khas', 'Lajpat Nagar',
  'Greater Kailash', 'Nehru Place', 'Pitampura', 'Rohini', 'Dwarka',
  'Janakpuri', 'Rajouri Garden', 'Laxmi Nagar', 'Preet Vihar', 'Mayur Vihar',
  'Malviya Nagar', 'Vasant Kunj', 'Patel Nagar', 'Shalimar Bagh', 'Patparganj',
  'Gurugram (DLF, Cyber City)', 'Noida (Sector 18, 62, 63)', 'Faridabad',
  'Ghaziabad', 'Greater Noida',
];

const FAQS = [
  { q: "How much does SEO cost in Delhi?", a: "Our Delhi SEO packages start at INR 15,000 per month for small businesses and local SEO. Comprehensive packages for competitive industries range from INR 30,000 to INR 1,00,000 per month depending on industry competition, keyword volume, and growth targets. We provide a tailored quote after your free SEO audit — no guesswork." },
  { q: "How long does it take to rank on Google in Delhi?", a: "Low-competition local keywords typically show ranking movement within 2 to 3 months. Mid-competition terms take 3 to 5 months. High-competition Delhi categories like real estate, legal, and healthcare usually require 6 to 9 months of consistent work. We give honest timelines in your free audit based on real competitor data — not optimistic promises to win the sale." },
  { q: "Is 1Solutions based in Delhi?", a: "Yes. 1Solutions has a team dedicated to the Delhi NCR market with SEO specialists who understand Delhi's competitive digital environment. We work with clients across Central Delhi, South Delhi, Gurugram, Noida, Faridabad, and Ghaziabad — both in person and fully remotely." },
  { q: "What industries do you serve in Delhi?", a: "We work across Delhi's major sectors: real estate, healthcare, education and coaching institutes, legal services, retail and eCommerce, IT companies, hospitality, and B2B manufacturing. Our keyword and content strategies are always built from actual Delhi search volume data for your specific industry — not repurposed from other markets." },
  { q: "Do you provide local SEO for Delhi businesses?", a: "Yes. Local SEO for Delhi businesses is a core service — Google Business Profile optimisation, Delhi-specific directory citations, NAP consistency audits, and Google Maps 3-pack ranking strategy. If you serve customers in specific Delhi areas or have a physical location, local SEO is the highest-ROI channel for driving calls and footfall." },
  { q: "Can you help a Delhi startup with limited SEO budget?", a: "Absolutely. We work with Delhi startups at multiple stages — pre-revenue companies building organic foundations early and growth-stage startups scaling their inbound channel. For limited budgets, we focus on keyword gap opportunities and content strategies that generate organic traction within 3 to 4 months without a large initial investment." },
  { q: "How do you measure and report SEO results?", a: "We track keyword ranking movement for all target terms, organic sessions from Google Analytics, organic goal completions (leads, calls, form fills), and revenue attributed to organic search where measurable. Monthly reports are delivered in the first week of each month with a clear summary of changes, wins, and the next quarter roadmap." },
];

export default function SeoCompanyDelhi() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '', industry: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'SEO Company in Delhi', item: 'https://1solutions.biz/seo-company-delhi/' },
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://1solutions.biz/#organization',
        name: '1Solutions — SEO Company in Delhi',
        url: 'https://1solutions.biz',
        telephone: '+918881SOLUTIONS',
        email: 'info@1solutions.biz',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'New Delhi',
          addressRegion: 'Delhi',
          addressCountry: 'IN',
        },
        areaServed: [
          { '@type': 'City', name: 'New Delhi' },
          { '@type': 'City', name: 'Gurugram' },
          { '@type': 'City', name: 'Noida' },
          { '@type': 'City', name: 'Faridabad' },
          { '@type': 'City', name: 'Ghaziabad' },
        ],
        description: 'Top SEO company in Delhi offering keyword research, technical SEO, local SEO, link building, and content strategy for Delhi NCR businesses.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '142', bestRating: '5' },
        priceRange: '₹₹',
        openingHours: 'Mo-Fr 09:00-18:00',
      },
      {
        '@type': 'Service',
        name: 'SEO Services in Delhi',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://1solutions.biz' },
        description: 'Comprehensive SEO services for Delhi businesses — technical SEO, on-page optimisation, local SEO, link building, and content strategy to achieve Page 1 Google rankings.',
        areaServed: { '@type': 'City', name: 'New Delhi' },
        serviceType: 'Search Engine Optimisation',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Head>
        <title>SEO Company in Delhi | Best SEO Agency Delhi NCR | 1Solutions</title>
        <meta name="description" content="Looking for the best SEO company in Delhi? 1Solutions delivers Page 1 rankings for Delhi businesses — technical SEO, local SEO, link building, and content strategy. Get a free SEO audit today." />
        <meta name="keywords" content="SEO company in Delhi, SEO agency Delhi, SEO services Delhi, best SEO company Delhi, SEO company Delhi NCR, search engine optimization Delhi" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://1solutions.biz/seo-company-delhi/" />
        <meta property="og:title" content="SEO Company in Delhi | Best SEO Agency Delhi NCR | 1Solutions" />
        <meta property="og:description" content="Top SEO company in Delhi with 15+ years experience. We help Delhi businesses rank on Page 1 of Google through ethical, data-driven SEO strategies." />
        <meta property="og:url" content="https://1solutions.biz/seo-company-delhi/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box;}
          body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
          .dsel-hero{position:relative;overflow:hidden;padding:90px 40px 80px;background:linear-gradient(135deg,rgba(224,231,255,0.60) 0%,rgba(255,255,255,0.75) 50%,rgba(219,234,254,0.55) 100%);}
          .dsel-orb1{position:absolute;top:-100px;right:-100px;width:580px;height:580px;border-radius:50%;background:radial-gradient(circle,rgba(12,36,97,0.10) 0%,transparent 70%);pointer-events:none;filter:blur(12px);}
          .dsel-orb2{position:absolute;bottom:-80px;left:-80px;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(29,86,208,0.07) 0%,transparent 70%);pointer-events:none;filter:blur(10px);}
          .dsel-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;}
          .dsel-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(12,36,97,0.08);border:1px solid rgba(12,36,97,0.18);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#0c2461;margin-bottom:24px;}
          .dsel-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:#1d56d0;display:inline-block;}
          .dsel-h1{font-size:clamp(2.2rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;color:#0A1628;}
          .dsel-h1 span{background:linear-gradient(90deg,#0c2461 0%,#1d56d0 55%,#FE9700 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .dsel-desc{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:680px;}
          .dsel-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px;}
          .dsel-btn-p{display:inline-flex;align-items:center;gap:8px;background:#0c2461;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(12,36,97,0.28);}
          .dsel-btn-p:hover{background:#0f2d78;transform:translateY(-2px);}
          .dsel-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.75);color:#0c2461;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(12,36,97,0.18);transition:all 0.25s;backdrop-filter:blur(8px);}
          .dsel-btn-s:hover{background:#fff;transform:translateY(-2px);}
          .dsel-trust{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px;}
          .dsel-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500;}
          .dsel-stats-bar{display:flex;border:1px solid rgba(12,36,97,0.10);border-radius:16px;background:rgba(255,255,255,0.80);backdrop-filter:blur(12px);overflow:hidden;max-width:700px;}
          .dsel-stat-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(12,36,97,0.08);}
          .dsel-stat-item:last-child{border-right:none;}
          .dsel-stat-num{font-size:1.9rem;font-weight:900;color:#0c2461;line-height:1;letter-spacing:-1px;}
          .dsel-stat-lbl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px;}
          .dsel-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px;}
          .dsel-bc-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280;}
          .dsel-bc a{color:#6b7280;text-decoration:none;}.dsel-bc a:hover{color:#0c2461;}
          .dsel-bc-sep{color:#d1d5db;}.dsel-bc-cur{color:#0c2461;font-weight:500;}
          .dsel-sec{padding:80px 40px;}
          .dsel-bg{background:#f8fafd;}
          .dsel-sec-inner{max-width:1200px;margin:0 auto;}
          .dsel-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#1d56d0;margin-bottom:12px;}
          .dsel-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px;}
          .dsel-h2 span{background:linear-gradient(90deg,#0c2461,#1d56d0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .dsel-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px;}
          .dsel-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
          .dsel-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .dsel-grid2{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .dsel-card{background:linear-gradient(135deg,rgba(224,231,255,0.45) 0%,rgba(255,255,255,0.90) 60%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(12,36,97,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;}
          .dsel-card:hover{transform:translateY(-6px);border-color:rgba(29,86,208,0.25);box-shadow:0 16px 48px rgba(12,36,97,0.12);}
          .dsel-icon{width:48px;height:48px;border-radius:14px;background:rgba(12,36,97,0.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
          .dsel-icon svg{width:22px;height:22px;color:#0c2461;}
          .dsel-card-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3;}
          .dsel-card-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .dsel-results{background:linear-gradient(135deg,#060d2e 0%,#0c2461 100%);padding:64px 40px;}
          .dsel-results-inner{max-width:1200px;margin:0 auto;}
          .dsel-res-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(147,197,253,0.80);margin-bottom:12px;text-align:center;}
          .dsel-res-h{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2;}
          .dsel-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .dsel-res-card{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center;}
          .dsel-res-metric{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px;}
          .dsel-res-label{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;}
          .dsel-res-sub{font-size:12.5px;color:rgba(255,255,255,0.50);}
          .dsel-why-card{background:linear-gradient(135deg,rgba(224,231,255,0.45) 0%,rgba(255,255,255,0.90) 60%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(12,36,97,0.07);}
          .dsel-why-check{width:36px;height:36px;border-radius:10px;background:rgba(12,36,97,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
          .dsel-why-check svg{width:18px;height:18px;color:#0c2461;}
          .dsel-why-h{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px;}
          .dsel-why-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .dsel-proc-num{font-size:3.5rem;font-weight:900;color:rgba(12,36,97,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px;}
          .dsel-proc-line{width:40px;height:3px;background:linear-gradient(90deg,#0c2461,rgba(29,86,208,0.30));border-radius:2px;margin-bottom:16px;}
          .dsel-proc-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .dsel-proc-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .dsel-ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
          .dsel-ind-card{background:#fff;border:1px solid #edf0f5;border-radius:14px;padding:20px 16px;display:flex;align-items:center;gap:12px;transition:border-color 0.2s,box-shadow 0.2s;}
          .dsel-ind-card:hover{border-color:rgba(12,36,97,0.20);box-shadow:0 4px 16px rgba(12,36,97,0.08);}
          .dsel-ind-icon{width:36px;height:36px;border-radius:10px;background:rgba(12,36,97,0.06);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .dsel-ind-icon svg{width:18px;height:18px;color:#0c2461;}
          .dsel-ind-name{font-size:13.5px;font-weight:600;color:#0A1628;line-height:1.3;}
          .dsel-areas-wrap{display:flex;flex-wrap:wrap;gap:10px;}
          .dsel-area-tag{background:rgba(12,36,97,0.06);border:1px solid rgba(12,36,97,0.12);border-radius:50px;padding:6px 16px;font-size:13px;font-weight:500;color:#0c2461;}
          .dsel-faq-list{display:flex;flex-direction:column;gap:10px;}
          .dsel-faq-item{background:linear-gradient(135deg,rgba(224,231,255,0.40) 0%,rgba(255,255,255,0.88) 60%,rgba(219,234,254,0.30) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(12,36,97,0.06);position:relative;transition:border-color 0.2s;}
          .dsel-faq-item.open{border-color:rgba(29,86,208,0.28);}
          .dsel-faq-item.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#0c2461;border-radius:3px 0 0 3px;}
          .dsel-faq-btn{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px 20px 28px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit;}
          .dsel-faq-qt{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4;}
          .dsel-faq-item.open .dsel-faq-qt{color:#0c2461;}
          .dsel-faq-icon{width:28px;height:28px;border-radius:50%;background:rgba(12,36,97,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s;}
          .dsel-faq-item.open .dsel-faq-icon{background:rgba(12,36,97,0.12);transform:rotate(45deg);}
          .dsel-faq-icon svg{width:14px;height:14px;color:#0c2461;}
          .dsel-faq-a{padding:0 24px 20px 28px;font-size:14px;color:#4b5563;line-height:1.8;}
          .dsel-contact-sec{padding:80px 40px;background:linear-gradient(135deg,rgba(224,231,255,0.55) 0%,rgba(255,255,255,0.70) 50%,rgba(219,234,254,0.50) 100%);}
          .dsel-contact-inner{max-width:1200px;margin:0 auto;}
          .dsel-contact-grid{display:grid;grid-template-columns:1fr 1.25fr;gap:60px;align-items:start;}
          .dsel-contact-info-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:900;color:#0A1628;margin:0 0 16px;line-height:1.25;}
          .dsel-contact-info-h span{background:linear-gradient(90deg,#0c2461,#1d56d0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .dsel-contact-info-p{font-size:1rem;color:#4b5563;line-height:1.75;margin:0 0 28px;}
          .dsel-contact-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:18px;}
          .dsel-contact-item-icon{width:40px;height:40px;border-radius:12px;background:rgba(12,36,97,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .dsel-contact-item-icon svg{width:18px;height:18px;color:#0c2461;}
          .dsel-contact-item-text strong{display:block;font-size:13px;font-weight:700;color:#0A1628;margin-bottom:2px;}
          .dsel-contact-item-text a,.dsel-contact-item-text span{font-size:13.5px;color:#4b5563;text-decoration:none;}
          .dsel-trust-list{display:flex;flex-direction:column;gap:10px;margin-top:28px;}
          .dsel-trust-item{display:flex;align-items:center;gap:10px;font-size:13.5px;color:#4b5563;}
          .dsel-trust-item svg{flex-shrink:0;color:#059669;}
          .dsel-form-wrap{background:#fff;border-radius:24px;padding:40px;box-shadow:0 4px 40px rgba(0,0,0,0.09);}
          .dsel-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
          .dsel-field label{font-size:13px;font-weight:600;color:#374151;}
          .dsel-field input,.dsel-field select,.dsel-field textarea{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;outline:none;transition:border-color 0.2s;background:#fff;}
          .dsel-field input:focus,.dsel-field select:focus,.dsel-field textarea:focus{border-color:#0c2461;}
          .dsel-field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
          .dsel-sent{text-align:center;padding:48px 24px;}
          .dsel-sent-icon{width:64px;height:64px;border-radius:50%;background:#0c2461;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
          .dsel-sent-icon svg{width:28px;height:28px;color:#fff;}
          .dsel-sent h3{font-size:1.5rem;font-weight:800;color:#0A1628;margin:0 0 10px;}
          .dsel-sent p{color:#4b5563;font-size:1rem;line-height:1.7;margin:0;}
          .dsel-submit-btn{width:100%;padding:14px;background:#0c2461;color:#fff;border:none;border-radius:50px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity 0.2s;margin-top:4px;}
          .dsel-submit-btn:hover{opacity:0.88;}
          .dsel-cta{background:linear-gradient(135deg,#060d2e 0%,#0c2461 100%);padding:80px 40px;text-align:center;}
          .dsel-cta h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;margin:0 0 16px;line-height:1.2;}
          .dsel-cta p{font-size:1rem;color:rgba(255,255,255,0.80);margin:0 0 32px;max-width:560px;margin-left:auto;margin-right:auto;}
          .dsel-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
          .dsel-cta-btn-p{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#0c2461;padding:14px 32px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;}
          .dsel-cta-btn-p:hover{transform:translateY(-2px);opacity:0.95;}
          .dsel-cta-btn-s{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:2px solid rgba(255,255,255,0.35);transition:all 0.25s;}
          .dsel-cta-btn-s:hover{border-color:rgba(255,255,255,0.70);background:rgba(255,255,255,0.08);}
          @media(max-width:900px){
            .dsel-grid4{grid-template-columns:1fr 1fr;}
            .dsel-grid3,.dsel-grid2{grid-template-columns:1fr 1fr;}
            .dsel-res-grid{grid-template-columns:1fr 1fr;}
            .dsel-ind-grid{grid-template-columns:1fr 1fr;}
            .dsel-contact-grid{grid-template-columns:1fr;gap:40px;}
          }
          @media(max-width:600px){
            .dsel-hero,.dsel-sec,.dsel-results,.dsel-cta,.dsel-contact-sec{padding-left:20px;padding-right:20px;}
            .dsel-hero{padding-top:60px;padding-bottom:50px;}
            .dsel-grid4,.dsel-grid3,.dsel-grid2,.dsel-res-grid,.dsel-ind-grid{grid-template-columns:1fr;}
            .dsel-bc{padding:12px 20px;}
            .dsel-field-row{grid-template-columns:1fr;}
            .dsel-form-wrap{padding:24px 20px;}
          }
        `}</style>
      </Head>

      {/* Breadcrumb */}
      <nav className="dsel-bc" aria-label="Breadcrumb">
        <div className="dsel-bc-inner">
          <Link href="/">Home</Link>
          <span className="dsel-bc-sep">›</span>
          <Link href="/seo-services-company/">SEO Services</Link>
          <span className="dsel-bc-sep">›</span>
          <span className="dsel-bc-cur">SEO Company in Delhi</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="dsel-hero">
        <div className="dsel-orb1" /><div className="dsel-orb2" />
        <div className="dsel-inner">
          <span className="dsel-eyebrow">
            <span className="dsel-eyebrow-dot" />
            SEO Company in Delhi &amp; NCR
          </span>
          <h1 className="dsel-h1">
            Top-Ranked <span>SEO Company in Delhi</span><br />
            That Delivers Page 1 Rankings
          </h1>
          <p className="dsel-desc">
            1Solutions is a results-driven SEO company in Delhi with 15+ years of experience helping Delhi NCR businesses rank on Page 1 of Google. From technical SEO and local search to link building and content strategy — we build organic visibility that generates leads, not just traffic.
          </p>
          <div className="dsel-btns">
            <a href="#contact" className="dsel-btn-p">
              Get a Free SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/affordable-seo-packages/" className="dsel-btn-s">View SEO Packages →</Link>
          </div>
          <div className="dsel-trust">
            {['Delhi NCR team', 'White-hat SEO only', 'No lock-in contracts', 'Monthly ranking reports'].map(t => (
              <span key={t} className="dsel-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0c2461" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
          <div className="dsel-stats-bar">
            {[
              { num: '500+', lbl: 'SEO Clients Served' },
              { num: '15+', lbl: 'Years Experience' },
              { num: 'Page 1', lbl: 'Rankings Delivered' },
              { num: '97%', lbl: 'Client Retention' },
            ].map(s => (
              <div key={s.lbl} className="dsel-stat-item">
                <span className="dsel-stat-num">{s.num}</span>
                <span className="dsel-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Services */}
      <section className="dsel-sec dsel-bg" id="services">
        <div className="dsel-sec-inner">
          <span className="dsel-tag">Our Delhi SEO Services</span>
          <h2 className="dsel-h2">Complete <span>SEO Services in Delhi</span></h2>
          <p className="dsel-lead">Every component of a winning SEO strategy — delivered by a dedicated team that understands the Delhi market and your growth goals.</p>
          <div className="dsel-grid4">
            {SERVICES.map(s => (
              <div key={s.title} className="dsel-card">
                <div className="dsel-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg></div>
                <h3 className="dsel-card-h">{s.title}</h3>
                <p className="dsel-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="dsel-results">
        <div className="dsel-results-inner">
          <span className="dsel-res-tag">Proven Delhi SEO Results</span>
          <h2 className="dsel-res-h">What Our SEO Delivers for Delhi Businesses</h2>
          <div className="dsel-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="dsel-res-card">
                <div className="dsel-res-metric" style={{ color: r.color }}>{r.metric}</div>
                <div className="dsel-res-label">{r.label}</div>
                <div className="dsel-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why 1Solutions */}
      <section className="dsel-sec" id="why-us">
        <div className="dsel-sec-inner">
          <span className="dsel-tag">Why Choose 1Solutions</span>
          <h2 className="dsel-h2">The Delhi SEO Agency <span>That Makes Rankings Last</span></h2>
          <p className="dsel-lead">We build SEO foundations that outlast algorithm updates and deliver compounding organic growth — not short-term spikes that disappear when Google updates.</p>
          <div className="dsel-grid2">
            {WHY.map(w => (
              <div key={w.title} className="dsel-why-card">
                <div className="dsel-why-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <h3 className="dsel-why-h">{w.title}</h3>
                <p className="dsel-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="dsel-sec dsel-bg" id="process">
        <div className="dsel-sec-inner">
          <span className="dsel-tag">How We Work</span>
          <h2 className="dsel-h2">Our <span>6-Step Delhi SEO Process</span></h2>
          <p className="dsel-lead">A structured, transparent methodology that compounds organic growth over time — from your first free audit to sustained Page 1 dominance.</p>
          <div className="dsel-grid3">
            {PROCESS.map(p => (
              <div key={p.n}>
                <div className="dsel-proc-num">{p.n}</div>
                <div className="dsel-proc-line" />
                <h3 className="dsel-proc-h">{p.title}</h3>
                <p className="dsel-proc-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="dsel-sec">
        <div className="dsel-sec-inner">
          <span className="dsel-tag">Delhi Industries We Serve</span>
          <h2 className="dsel-h2">SEO for <span>Every Delhi Business Sector</span></h2>
          <p className="dsel-lead">From Connaught Place retail to Gurugram tech startups — we deliver SEO strategies built around the specific competitive landscape of your Delhi industry.</p>
          <div className="dsel-ind-grid">
            {INDUSTRIES.map(ind => (
              <div key={ind.name} className="dsel-ind-card">
                <div className="dsel-ind-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={ind.icon} /></svg></div>
                <span className="dsel-ind-name">{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="dsel-sec dsel-bg">
        <div className="dsel-sec-inner">
          <span className="dsel-tag">Areas We Cover</span>
          <h2 className="dsel-h2">SEO Services Across <span>Delhi &amp; NCR</span></h2>
          <p className="dsel-lead">We serve businesses throughout the Delhi National Capital Region — from the central business districts to the growing satellite cities of the NCR corridor.</p>
          <div className="dsel-areas-wrap">
            {AREAS.map(area => (
              <span key={area} className="dsel-area-tag">{area}</span>
            ))}
          </div>
          <p style={{ marginTop: 32, fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.7, maxWidth: 720 }}>
            Whether your business is headquartered in South Delhi, operates out of a Gurugram tech park, or serves customers across the entire NCR region — our Delhi SEO strategies are built around your specific geographic target market and local competition intensity.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="dsel-sec" id="faq">
        <div className="dsel-sec-inner">
          <span className="dsel-tag">Frequently Asked Questions</span>
          <h2 className="dsel-h2">SEO Company Delhi <span>FAQs</span></h2>
          <p className="dsel-lead" style={{ marginBottom: 32 }}>Honest answers to the questions Delhi businesses ask most before starting their SEO journey.</p>
          <div className="dsel-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={'dsel-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="dsel-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="dsel-faq-qt">{f.q}</span>
                  <span className="dsel-faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </span>
                </button>
                {openFaq === i && <div className="dsel-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="dsel-contact-sec" id="contact">
        <div className="dsel-contact-inner">
          <div className="dsel-contact-grid">
            <div>
              <h2 className="dsel-contact-info-h">Get Your Free <span>Delhi SEO Audit</span></h2>
              <p className="dsel-contact-info-p">Tell us about your Delhi business and we will prepare a detailed SEO audit — covering your current rankings, technical health, competitor gaps, and a clear roadmap to Page 1. Completely free, no commitment.</p>
              <div className="dsel-contact-item">
                <div className="dsel-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="dsel-contact-item-text">
                  <strong>Email</strong>
                  <a href="mailto:info@1solutions.biz">info@1solutions.biz</a>
                </div>
              </div>
              <div className="dsel-contact-item">
                <div className="dsel-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/></svg>
                </div>
                <div className="dsel-contact-item-text">
                  <strong>WhatsApp / Call</strong>
                  <a href="tel:+918881SOLUTIONS">+91 888 1SOLUTIONS</a>
                </div>
              </div>
              <div className="dsel-contact-item">
                <div className="dsel-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="dsel-contact-item-text">
                  <strong>Response Time</strong>
                  <span>Within 24 hours</span>
                </div>
              </div>
              <div className="dsel-trust-list">
                {['Free audit — no credit card, no commitment', 'Dedicated Delhi SEO specialist assigned', 'Honest timelines based on real competitor data', 'White-hat strategies only — no ranking risk'].map(t => (
                  <span key={t} className="dsel-trust-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="dsel-form-wrap">
              {sent ? (
                <div className="dsel-sent">
                  <div className="dsel-sent-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3>Audit Request Received</h3>
                  <p>Thank you! Our Delhi SEO team will review your website and be in touch within 24 hours with your free audit findings.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="dsel-field-row">
                    <div className="dsel-field">
                      <label>Your Name *</label>
                      <input required type="text" placeholder="Rahul Sharma" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="dsel-field">
                      <label>Email Address *</label>
                      <input required type="email" placeholder="rahul@company.in" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="dsel-field-row">
                    <div className="dsel-field">
                      <label>Phone Number</label>
                      <input type="tel" placeholder="+91 98xxxxxxxx" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    </div>
                    <div className="dsel-field">
                      <label>Your Website URL *</label>
                      <input required type="url" placeholder="https://yourcompany.in" value={form.website} onChange={e => setForm({...form, website: e.target.value})} />
                    </div>
                  </div>
                  <div className="dsel-field">
                    <label>Business Industry</label>
                    <select value={form.industry} onChange={e => setForm({...form, industry: e.target.value})}>
                      <option>Select your industry</option>
                      <option>Real Estate & Property</option>
                      <option>Healthcare & Clinics</option>
                      <option>Education & Coaching</option>
                      <option>Legal Services</option>
                      <option>Retail & eCommerce</option>
                      <option>IT & SaaS</option>
                      <option>Hospitality & Hotels</option>
                      <option>Manufacturing & B2B</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="dsel-field">
                    <label>What are your main SEO goals?</label>
                    <textarea rows={4} placeholder="More organic leads, better rankings for specific keywords, faster website, etc." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  </div>
                  <button type="submit" className="dsel-submit-btn">Request Free Delhi SEO Audit →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="dsel-cta">
        <div className="dsel-sec-inner">
          <h2>Ready to Rank Above Your Delhi Competitors?</h2>
          <p>Join 500+ businesses across India that trust 1Solutions to build and sustain Page 1 organic rankings on Google.</p>
          <div className="dsel-cta-btns">
            <a href="#contact" className="dsel-cta-btn-p">
              Get Free SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <Link href="/affordable-seo-packages/" className="dsel-cta-btn-s">View SEO Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
