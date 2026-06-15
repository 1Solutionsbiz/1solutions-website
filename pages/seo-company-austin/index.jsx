import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Keyword Research & Strategy', desc: "In-depth analysis of how Austin customers search for your services — high-intent buying queries, Texas-specific local modifiers, and competitive keyword gaps your Austin rivals are missing." },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Technical SEO', desc: 'Core Web Vitals optimisation, mobile speed, crawl error fixes, structured data, and site architecture — the technical foundation every Austin business needs before other SEO efforts can compound.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'On-Page SEO', desc: 'Title tags, meta descriptions, heading structure, internal linking, and content optimisation across every key page — written for Austin buyers, tuned for Google ranking signals in a competitive Texas market.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Local SEO Austin', desc: 'Google Business Profile optimisation, Google Maps 3-pack strategy, Austin-specific citation building, and NAP consistency management to dominate local search across the Greater Austin metro area.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Link Building', desc: 'Quality backlinks from US authority sites, Austin and Texas business media, industry directories, and digital PR — building the domain authority that sustains Page 1 positions long-term.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Content Marketing', desc: 'SEO-driven blog articles, service pages, and landing pages built around what Austin customers are searching for — content that ranks and converts, built for the Austin and Texas audience.' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'eCommerce SEO', desc: 'Product and category page optimisation for Austin online stores on Shopify, WooCommerce, Magento, and custom platforms — more organic visibility and lower customer acquisition costs.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'SEO Reporting & Analytics', desc: 'Monthly reports showing keyword ranking movement, organic traffic growth, lead attribution, and ROI — clear numbers so you know exactly what your Austin SEO investment is generating each month.' },
];

const RESULTS = [
  { metric: '320%', label: 'Organic traffic growth', sub: 'Austin SaaS company — 9 months', color: '#7a2000' },
  { metric: 'Top 3', label: 'Google rankings for 75+ keywords', sub: 'Austin law firm — 8 months', color: '#FE9700' },
  { metric: '4.2×', label: 'Increase in organic leads', sub: 'Austin real estate agency — 7 months', color: '#059669' },
];

const PROCESS = [
  { n: '01', title: 'Free Austin SEO Audit', desc: 'We audit your website for technical health, current keyword rankings, backlink profile, competitor positions, and the specific gaps holding your Austin business back from Page 1 on Google.' },
  { n: '02', title: 'Keyword & Market Research', desc: 'Deep analysis of how Austin and Greater Austin customers search for your services — mapping every high-intent query, local modifier, and competitor keyword gap into a prioritised roadmap.' },
  { n: '03', title: 'Technical Optimisation', desc: 'We fix the technical foundations first — Core Web Vitals, mobile performance, crawl errors, schema markup, and site structure — so every subsequent SEO effort builds on solid ground.' },
  { n: '04', title: 'On-Page & Content', desc: 'Optimising every key page for target keywords and creating new content that captures Austin buyer demand across the full search intent spectrum — informational through to high-intent transactional.' },
  { n: '05', title: 'Authority & Link Building', desc: 'Building quality backlinks from relevant US authority sites, Austin and Texas business publications, and local directories — compounding domain authority that holds rankings long-term.' },
  { n: '06', title: 'Monthly Reporting & Scale', desc: 'Clear monthly reports with ranking movement, traffic growth, and lead data — plus a forward roadmap so you always know what is happening and what we are prioritising next.' },
];

const WHY = [
  { title: 'Austin Market Expertise', desc: "We understand Austin's hyper-competitive SEO landscape — from the Silicon Hills tech cluster to the tourism economy on Sixth Street. Strategy built on real Austin search data, not generic templates." },
  { title: '15+ Years SEO Experience', desc: "Founded in 2009, 1Solutions has navigated every major Google update — Panda, Penguin, BERT, and Helpful Content — delivering consistent Page 1 rankings for clients in competitive US markets." },
  { title: 'Dedicated Account Manager', desc: 'Every Austin client has one point of contact who understands your business, reports monthly, and is reachable when you need answers — no rotating teams, no offshore handoffs.' },
  { title: 'White-Hat SEO Only', desc: 'No shortcuts. We build rankings through technical excellence, quality content, and genuine authority building — methods that outlast algorithm updates and never put your domain at risk.' },
  { title: 'Transparent Reporting', desc: 'You see exactly what we did, what moved, and what it generated. Keyword rankings, organic sessions, and lead attribution in a clear monthly report — no smoke and mirrors.' },
  { title: 'No Lock-In Contracts', desc: 'Month-to-month engagements because our results earn your continued business. You stay because your Austin rankings keep climbing — not because a contract forces you to.' },
];

const INDUSTRIES = [
  { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', name: 'Tech & SaaS (Silicon Hills)' },
  { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', name: 'Real Estate & Property' },
  { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', name: 'Healthcare & Medical' },
  { icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', name: 'Legal Services' },
  { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', name: 'Hospitality & Food & Beverage' },
  { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', name: 'Education & Higher Ed' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', name: 'Retail & eCommerce' },
  { icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', name: 'Manufacturing & B2B' },
];

const AREAS = [
  'Downtown Austin', 'South Congress (SoCo)', 'East Austin', 'The Domain',
  'Westlake Hills', 'Tarrytown', 'Hyde Park', 'Mueller', 'North Loop',
  'Cedar Park', 'Round Rock', 'Georgetown', 'Pflugerville', 'Kyle',
  'Buda', 'Lakeway', 'Bee Cave', 'Manor', 'Leander', 'Hutto',
  'San Marcos', 'New Braunfels', 'Bastrop', 'Dripping Springs', 'Wimberley',
];

const FAQS = [
  { q: "How much does SEO cost in Austin?", a: "Austin SEO packages from 1Solutions start at USD 800 per month for small business and local SEO. Comprehensive packages for competitive Austin sectors like tech, real estate, and legal range from USD 1,500 to USD 6,000+ per month depending on competition intensity and growth targets. We provide a custom quote after your free Austin SEO audit — based on your actual competitive landscape, not a generic pricing sheet." },
  { q: "How long does it take to rank on Google in Austin?", a: "Austin is one of the most competitive SEO markets in Texas — driven by the rapid influx of tech companies and population growth. Lower-competition local keywords typically show movement within 8 to 12 weeks. Mid-competition Austin terms take 3 to 5 months. High-competition verticals like SaaS, real estate, legal, and healthcare in Austin usually require 5 to 9 months of consistent work. We set honest, audit-based timelines." },
  { q: "Do you specialise in SEO for Austin tech companies?", a: "Yes. The Silicon Hills tech cluster makes Austin one of the most competitive SaaS and B2B tech SEO markets in the US. We have extensive experience with SaaS SEO — optimising for product keywords, comparison pages, integration content, and the full B2B buyer research journey. We understand the Austin tech ecosystem and the search behaviour of the buyers these companies target." },
  { q: "What Austin industries do you serve?", a: "We work with Austin businesses across tech and SaaS, real estate, healthcare and medical, legal services, hospitality and food and beverage, education and higher education, retail and eCommerce, and manufacturing and B2B. Every strategy is built from actual Austin and Greater Austin search volume data for your specific industry — not content repurposed from other markets." },
  { q: "Do you provide local SEO for Austin businesses?", a: "Yes. Local SEO for Austin is a core service — Google Business Profile optimisation for the Greater Austin metro, Texas-specific citation building (Austin Chamber directories, Texas business listings), Google Maps 3-pack strategy, and neighbourhood-level targeting across Austin, Cedar Park, Round Rock, Georgetown, Kyle, Pflugerville, and the broader Central Texas region." },
  { q: "What makes Austin SEO different from other US cities?", a: "Austin is one of the fastest-growing metro areas in the US, which means search competition intensifies every quarter as new businesses enter the market. The tech-forward audience skews toward mobile search and voice search. The short-term rental and hospitality market is unusually competitive. And the local media landscape — Austin American-Statesman, Austin Business Journal, KXAN — offers link building opportunities unique to the Austin market that we actively target." },
  { q: "How do you measure and report SEO results?", a: "We track keyword ranking movement for all target terms, organic sessions from Google Analytics, organic goal completions (leads, calls, form fills), and revenue attributed to organic search where measurable. Monthly reports are sent in the first week of each month with a clear summary of what changed, what drove it, and the priority roadmap for next quarter." },
];

export default function SeoCompanyAustin() {
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
          { '@type': 'ListItem', position: 3, name: 'SEO Company in Austin', item: 'https://1solutions.biz/seo-company-austin/' },
        ],
      },
      {
        '@type': 'LocalBusiness',
        name: '1Solutions — SEO Company in Austin',
        url: 'https://1solutions.biz',
        email: 'info@1solutions.biz',
        address: { '@type': 'PostalAddress', addressLocality: 'Austin', addressRegion: 'TX', addressCountry: 'US' },
        areaServed: [
          { '@type': 'City', name: 'Austin' },
          { '@type': 'City', name: 'Cedar Park' },
          { '@type': 'City', name: 'Round Rock' },
          { '@type': 'City', name: 'Georgetown' },
          { '@type': 'City', name: 'Kyle' },
          { '@type': 'City', name: 'Pflugerville' },
        ],
        description: 'Top SEO company in Austin TX offering keyword research, technical SEO, local SEO, link building, and content strategy for Greater Austin businesses.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '74', bestRating: '5' },
      },
      {
        '@type': 'Service',
        name: 'SEO Services in Austin TX',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://1solutions.biz' },
        description: 'Comprehensive SEO services for Austin Texas businesses — technical SEO, on-page optimisation, local SEO, link building, and content strategy to achieve Page 1 Google rankings.',
        areaServed: { '@type': 'City', name: 'Austin' },
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
        <title>SEO Company in Austin TX | Best Austin SEO Agency | 1Solutions</title>
        <meta name="description" content="Looking for the best SEO company in Austin TX? 1Solutions delivers Page 1 Google rankings for Austin businesses — technical SEO, local SEO, link building & content strategy. Free audit." />
        <meta name="keywords" content="SEO company in Austin, SEO agency Austin, SEO services Austin TX, best SEO company Austin, Austin SEO, search engine optimization Austin Texas" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://1solutions.biz/seo-company-austin/" />
        <meta property="og:title" content="SEO Company in Austin TX | Best Austin SEO Agency | 1Solutions" />
        <meta property="og:description" content="Top SEO company in Austin TX with 15+ years experience. We help Austin businesses rank on Page 1 of Google. Get your free SEO audit today." />
        <meta property="og:url" content="https://1solutions.biz/seo-company-austin/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box;}
          body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
          .aust-hero{position:relative;overflow:hidden;padding:90px 40px 80px;background:linear-gradient(135deg,rgba(254,226,214,0.65) 0%,rgba(255,255,255,0.78) 50%,rgba(255,237,213,0.55) 100%);}
          .aust-orb1{position:absolute;top:-100px;right:-100px;width:580px;height:580px;border-radius:50%;background:radial-gradient(circle,rgba(122,32,0,0.10) 0%,transparent 70%);pointer-events:none;filter:blur(12px);}
          .aust-orb2{position:absolute;bottom:-80px;left:-80px;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(196,64,16,0.07) 0%,transparent 70%);pointer-events:none;filter:blur(10px);}
          .aust-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;}
          .aust-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(122,32,0,0.08);border:1px solid rgba(122,32,0,0.18);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#7a2000;margin-bottom:24px;}
          .aust-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:#c44010;display:inline-block;}
          .aust-h1{font-size:clamp(2.2rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;color:#0A1628;}
          .aust-h1 span{background:linear-gradient(90deg,#7a2000 0%,#c44010 55%,#FE9700 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .aust-desc{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:680px;}
          .aust-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px;}
          .aust-btn-p{display:inline-flex;align-items:center;gap:8px;background:#7a2000;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(122,32,0,0.28);}
          .aust-btn-p:hover{background:#952600;transform:translateY(-2px);}
          .aust-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.75);color:#7a2000;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(122,32,0,0.18);transition:all 0.25s;backdrop-filter:blur(8px);}
          .aust-btn-s:hover{background:#fff;transform:translateY(-2px);}
          .aust-trust{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px;}
          .aust-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500;}
          .aust-stats-bar{display:flex;border:1px solid rgba(122,32,0,0.10);border-radius:16px;background:rgba(255,255,255,0.80);backdrop-filter:blur(12px);overflow:hidden;max-width:700px;}
          .aust-stat-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(122,32,0,0.08);}
          .aust-stat-item:last-child{border-right:none;}
          .aust-stat-num{font-size:1.9rem;font-weight:900;color:#7a2000;line-height:1;letter-spacing:-1px;}
          .aust-stat-lbl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px;}
          .aust-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px;}
          .aust-bc-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280;}
          .aust-bc a{color:#6b7280;text-decoration:none;}.aust-bc a:hover{color:#7a2000;}
          .aust-bc-sep{color:#d1d5db;}.aust-bc-cur{color:#7a2000;font-weight:500;}
          .aust-sec{padding:80px 40px;}.aust-bg{background:#f8fafd;}
          .aust-sec-inner{max-width:1200px;margin:0 auto;}
          .aust-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#c44010;margin-bottom:12px;}
          .aust-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px;}
          .aust-h2 span{background:linear-gradient(90deg,#7a2000,#c44010);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .aust-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px;}
          .aust-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
          .aust-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .aust-grid2{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .aust-card{background:linear-gradient(135deg,rgba(254,226,214,0.48) 0%,rgba(255,255,255,0.92) 60%,rgba(255,237,213,0.36) 100%);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(122,32,0,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;}
          .aust-card:hover{transform:translateY(-6px);border-color:rgba(196,64,16,0.25);box-shadow:0 16px 48px rgba(122,32,0,0.12);}
          .aust-icon{width:48px;height:48px;border-radius:14px;background:rgba(122,32,0,0.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
          .aust-icon svg{width:22px;height:22px;color:#7a2000;}
          .aust-card-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3;}
          .aust-card-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .aust-results{background:linear-gradient(135deg,#2a0900 0%,#7a2000 100%);padding:64px 40px;}
          .aust-results-inner{max-width:1200px;margin:0 auto;}
          .aust-res-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(253,186,116,0.85);margin-bottom:12px;text-align:center;}
          .aust-res-h{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2;}
          .aust-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .aust-res-card{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center;}
          .aust-res-metric{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px;}
          .aust-res-label{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;}
          .aust-res-sub{font-size:12.5px;color:rgba(255,255,255,0.50);}
          .aust-why-card{background:linear-gradient(135deg,rgba(254,226,214,0.48) 0%,rgba(255,255,255,0.90) 60%,rgba(255,237,213,0.35) 100%);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(122,32,0,0.07);}
          .aust-why-check{width:36px;height:36px;border-radius:10px;background:rgba(122,32,0,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
          .aust-why-check svg{width:18px;height:18px;color:#7a2000;}
          .aust-why-h{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px;}
          .aust-why-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .aust-proc-num{font-size:3.5rem;font-weight:900;color:rgba(122,32,0,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px;}
          .aust-proc-line{width:40px;height:3px;background:linear-gradient(90deg,#7a2000,rgba(196,64,16,0.30));border-radius:2px;margin-bottom:16px;}
          .aust-proc-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .aust-proc-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .aust-ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
          .aust-ind-card{background:#fff;border:1px solid #edf0f5;border-radius:14px;padding:20px 16px;display:flex;align-items:center;gap:12px;transition:border-color 0.2s,box-shadow 0.2s;}
          .aust-ind-card:hover{border-color:rgba(122,32,0,0.20);box-shadow:0 4px 16px rgba(122,32,0,0.08);}
          .aust-ind-icon{width:36px;height:36px;border-radius:10px;background:rgba(122,32,0,0.06);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .aust-ind-icon svg{width:18px;height:18px;color:#7a2000;}
          .aust-ind-name{font-size:13.5px;font-weight:600;color:#0A1628;line-height:1.3;}
          .aust-areas-wrap{display:flex;flex-wrap:wrap;gap:10px;}
          .aust-area-tag{background:rgba(122,32,0,0.06);border:1px solid rgba(122,32,0,0.12);border-radius:50px;padding:6px 16px;font-size:13px;font-weight:500;color:#7a2000;}
          .aust-faq-list{display:flex;flex-direction:column;gap:10px;}
          .aust-faq-item{background:linear-gradient(135deg,rgba(254,226,214,0.42) 0%,rgba(255,255,255,0.88) 60%,rgba(255,237,213,0.30) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(122,32,0,0.06);position:relative;transition:border-color 0.2s;}
          .aust-faq-item.open{border-color:rgba(196,64,16,0.28);}
          .aust-faq-item.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#7a2000;border-radius:3px 0 0 3px;}
          .aust-faq-btn{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px 20px 28px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit;}
          .aust-faq-qt{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4;}
          .aust-faq-item.open .aust-faq-qt{color:#7a2000;}
          .aust-faq-icon{width:28px;height:28px;border-radius:50%;background:rgba(122,32,0,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s;}
          .aust-faq-item.open .aust-faq-icon{background:rgba(122,32,0,0.14);transform:rotate(45deg);}
          .aust-faq-icon svg{width:14px;height:14px;color:#7a2000;}
          .aust-faq-a{padding:0 24px 20px 28px;font-size:14px;color:#4b5563;line-height:1.8;}
          .aust-contact-sec{padding:80px 40px;background:linear-gradient(135deg,rgba(254,226,214,0.60) 0%,rgba(255,255,255,0.72) 50%,rgba(255,237,213,0.55) 100%);}
          .aust-contact-inner{max-width:1200px;margin:0 auto;}
          .aust-contact-grid{display:grid;grid-template-columns:1fr 1.25fr;gap:60px;align-items:start;}
          .aust-info-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:900;color:#0A1628;margin:0 0 16px;line-height:1.25;}
          .aust-info-h span{background:linear-gradient(90deg,#7a2000,#c44010);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .aust-info-p{font-size:1rem;color:#4b5563;line-height:1.75;margin:0 0 28px;}
          .aust-ci{display:flex;align-items:flex-start;gap:14px;margin-bottom:18px;}
          .aust-ci-icon{width:40px;height:40px;border-radius:12px;background:rgba(122,32,0,0.09);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .aust-ci-icon svg{width:18px;height:18px;color:#7a2000;}
          .aust-ci-text strong{display:block;font-size:13px;font-weight:700;color:#0A1628;margin-bottom:2px;}
          .aust-ci-text a,.aust-ci-text span{font-size:13.5px;color:#4b5563;text-decoration:none;}
          .aust-trust-list{display:flex;flex-direction:column;gap:10px;margin-top:28px;}
          .aust-trust-item{display:flex;align-items:center;gap:10px;font-size:13.5px;color:#4b5563;}
          .aust-trust-item svg{flex-shrink:0;color:#059669;}
          .aust-form-wrap{background:#fff;border-radius:24px;padding:40px;box-shadow:0 4px 40px rgba(0,0,0,0.09);}
          .aust-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
          .aust-field label{font-size:13px;font-weight:600;color:#374151;}
          .aust-field input,.aust-field select,.aust-field textarea{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;outline:none;transition:border-color 0.2s;background:#fff;}
          .aust-field input:focus,.aust-field select:focus,.aust-field textarea:focus{border-color:#7a2000;}
          .aust-field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
          .aust-sent{text-align:center;padding:48px 24px;}
          .aust-sent-icon{width:64px;height:64px;border-radius:50%;background:#7a2000;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
          .aust-sent-icon svg{width:28px;height:28px;color:#fff;}
          .aust-sent h3{font-size:1.5rem;font-weight:800;color:#0A1628;margin:0 0 10px;}
          .aust-sent p{color:#4b5563;font-size:1rem;line-height:1.7;margin:0;}
          .aust-submit-btn{width:100%;padding:14px;background:#7a2000;color:#fff;border:none;border-radius:50px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity 0.2s;margin-top:4px;}
          .aust-submit-btn:hover{opacity:0.88;}
          .aust-cta{background:linear-gradient(135deg,#2a0900 0%,#7a2000 100%);padding:80px 40px;text-align:center;}
          .aust-cta h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;margin:0 0 16px;line-height:1.2;}
          .aust-cta p{font-size:1rem;color:rgba(255,255,255,0.80);margin:0 0 32px;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7;}
          .aust-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
          .aust-cta-btn-p{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#7a2000;padding:14px 32px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;}
          .aust-cta-btn-p:hover{transform:translateY(-2px);opacity:0.95;}
          .aust-cta-btn-s{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:2px solid rgba(255,255,255,0.35);transition:all 0.25s;}
          .aust-cta-btn-s:hover{border-color:rgba(255,255,255,0.70);background:rgba(255,255,255,0.08);}
          @media(max-width:900px){.aust-grid4{grid-template-columns:1fr 1fr;}.aust-grid3,.aust-grid2,.aust-res-grid{grid-template-columns:1fr 1fr;}.aust-ind-grid{grid-template-columns:1fr 1fr;}.aust-contact-grid{grid-template-columns:1fr;gap:40px;}}
          @media(max-width:600px){.aust-hero,.aust-sec,.aust-results,.aust-cta,.aust-contact-sec{padding-left:20px;padding-right:20px;}.aust-hero{padding-top:60px;padding-bottom:50px;}.aust-grid4,.aust-grid3,.aust-grid2,.aust-res-grid,.aust-ind-grid{grid-template-columns:1fr;}.aust-bc{padding:12px 20px;}.aust-field-row{grid-template-columns:1fr;}.aust-form-wrap{padding:24px 20px;}}
        `}</style>
      </Head>

      <nav className="aust-bc" aria-label="Breadcrumb">
        <div className="aust-bc-inner">
          <Link href="/">Home</Link><span className="aust-bc-sep">›</span>
          <Link href="/seo-services-company/">SEO Services</Link><span className="aust-bc-sep">›</span>
          <span className="aust-bc-cur">SEO Company in Austin</span>
        </div>
      </nav>

      <section className="aust-hero">
        <div className="aust-orb1" /><div className="aust-orb2" />
        <div className="aust-inner">
          <span className="aust-eyebrow"><span className="aust-eyebrow-dot" />SEO Company in Austin, Texas</span>
          <h1 className="aust-h1">Top-Ranked <span>SEO Company in Austin</span><br />That Delivers Page 1 Rankings</h1>
          <p className="aust-desc">1Solutions is a results-driven SEO company in Austin with 15+ years of experience helping Austin and Greater Austin businesses rank on Page 1 of Google. From technical SEO and local search to link building and content strategy — we build organic visibility that generates leads in one of the most competitive markets in the US.</p>
          <div className="aust-btns">
            <a href="#contact" className="aust-btn-p">Get a Free SEO Audit<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <Link href="/affordable-seo-packages/" className="aust-btn-s">View SEO Packages →</Link>
          </div>
          <div className="aust-trust">
            {['Greater Austin area specialists','White-hat SEO only','No lock-in contracts','Monthly ranking reports'].map(t => (
              <span key={t} className="aust-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a2000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>
            ))}
          </div>
          <div className="aust-stats-bar">
            {[{num:'500+',lbl:'Clients Served'},{num:'15+',lbl:'Years Experience'},{num:'Page 1',lbl:'Rankings'},{num:'97%',lbl:'Retention Rate'}].map(s => (
              <div key={s.lbl} className="aust-stat-item"><span className="aust-stat-num">{s.num}</span><span className="aust-stat-lbl">{s.lbl}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="aust-sec aust-bg" id="services">
        <div className="aust-sec-inner">
          <span className="aust-tag">Our Austin SEO Services</span>
          <h2 className="aust-h2">Complete <span>SEO Services in Austin TX</span></h2>
          <p className="aust-lead">Every component of a winning SEO strategy — delivered by a team that understands the Austin and Greater Austin market and your growth goals.</p>
          <div className="aust-grid4">
            {SERVICES.map(s => (
              <div key={s.title} className="aust-card">
                <div className="aust-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div>
                <h3 className="aust-card-h">{s.title}</h3><p className="aust-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aust-results">
        <div className="aust-results-inner">
          <span className="aust-res-tag">Proven Austin SEO Results</span>
          <h2 className="aust-res-h">What Our SEO Delivers for Austin Businesses</h2>
          <div className="aust-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="aust-res-card">
                <div className="aust-res-metric" style={{color:r.color}}>{r.metric}</div>
                <div className="aust-res-label">{r.label}</div><div className="aust-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aust-sec" id="why-us">
        <div className="aust-sec-inner">
          <span className="aust-tag">Why Choose 1Solutions</span>
          <h2 className="aust-h2">The Austin SEO Agency <span>That Makes Rankings Last</span></h2>
          <p className="aust-lead">We build SEO foundations that outlast algorithm updates and deliver compounding organic growth — not short-term spikes that vanish when Google changes its algorithm.</p>
          <div className="aust-grid2">
            {WHY.map(w => (
              <div key={w.title} className="aust-why-card">
                <div className="aust-why-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <h3 className="aust-why-h">{w.title}</h3><p className="aust-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aust-sec aust-bg" id="process">
        <div className="aust-sec-inner">
          <span className="aust-tag">How We Work</span>
          <h2 className="aust-h2">Our <span>6-Step Austin SEO Process</span></h2>
          <p className="aust-lead">A structured, transparent methodology that compounds organic growth over time — from your first free audit to sustained Page 1 dominance in Austin search results.</p>
          <div className="aust-grid3">
            {PROCESS.map(p => (
              <div key={p.n}><div className="aust-proc-num">{p.n}</div><div className="aust-proc-line"/><h3 className="aust-proc-h">{p.title}</h3><p className="aust-proc-p">{p.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="aust-sec">
        <div className="aust-sec-inner">
          <span className="aust-tag">Austin Industries We Serve</span>
          <h2 className="aust-h2">SEO for <span>Every Austin Business Sector</span></h2>
          <p className="aust-lead">From Silicon Hills tech companies to South Congress retailers — we deliver SEO strategies built around the specific competitive landscape of your Austin industry.</p>
          <div className="aust-ind-grid">
            {INDUSTRIES.map(ind => (
              <div key={ind.name} className="aust-ind-card">
                <div className="aust-ind-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={ind.icon}/></svg></div>
                <span className="aust-ind-name">{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aust-sec aust-bg">
        <div className="aust-sec-inner">
          <span className="aust-tag">Areas We Cover</span>
          <h2 className="aust-h2">SEO Services Across <span>Greater Austin</span></h2>
          <p className="aust-lead">We serve businesses throughout the Greater Austin metro area — from the urban core to the rapidly growing suburbs of Central Texas.</p>
          <div className="aust-areas-wrap">
            {AREAS.map(a => <span key={a} className="aust-area-tag">{a}</span>)}
          </div>
        </div>
      </section>

      <section className="aust-sec" id="faq">
        <div className="aust-sec-inner">
          <span className="aust-tag">Frequently Asked Questions</span>
          <h2 className="aust-h2">Austin SEO <span>FAQs</span></h2>
          <p className="aust-lead" style={{marginBottom:32}}>Honest answers to the questions Austin businesses ask most before starting their SEO journey.</p>
          <div className="aust-faq-list">
            {FAQS.map((f,i) => (
              <div key={i} className={'aust-faq-item'+(openFaq===i?' open':'')}>
                <button className="aust-faq-btn" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                  <span className="aust-faq-qt">{f.q}</span>
                  <span className="aust-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                </button>
                {openFaq===i && <div className="aust-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aust-contact-sec" id="contact">
        <div className="aust-contact-inner">
          <div className="aust-contact-grid">
            <div>
              <h2 className="aust-info-h">Get Your Free <span>Austin SEO Audit</span></h2>
              <p className="aust-info-p">Tell us about your Austin business and we will prepare a detailed SEO audit covering your current rankings, technical health, competitor gaps, and a clear roadmap to Page 1. Completely free, no commitment.</p>
              <div className="aust-ci"><div className="aust-ci-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div><div className="aust-ci-text"><strong>Email</strong><a href="mailto:info@1solutions.biz">info@1solutions.biz</a></div></div>
              <div className="aust-ci"><div className="aust-ci-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><div className="aust-ci-text"><strong>Response Time</strong><span>Within 24 hours</span></div></div>
              <div className="aust-trust-list">
                {['Free audit — no credit card, no commitment','Dedicated Austin SEO specialist assigned','Honest timelines based on real competitor data','White-hat only — no ranking risk'].map(t => (
                  <span key={t} className="aust-trust-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>
                ))}
              </div>
            </div>
            <div className="aust-form-wrap">
              {sent ? (
                <div className="aust-sent"><div className="aust-sent-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg></div><h3>Audit Request Received</h3><p>Our Austin SEO team will review your website and be in touch within 24 hours with your free audit findings.</p></div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="aust-field-row">
                    <div className="aust-field"><label>Your Name *</label><input required type="text" placeholder="Sarah Williams" value={form.name} onChange={e => setForm({...form,name:e.target.value})}/></div>
                    <div className="aust-field"><label>Email Address *</label><input required type="email" placeholder="sarah@company.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})}/></div>
                  </div>
                  <div className="aust-field-row">
                    <div className="aust-field"><label>Phone Number</label><input type="tel" placeholder="+1 512 000 0000" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})}/></div>
                    <div className="aust-field"><label>Your Website URL *</label><input required type="url" placeholder="https://yourcompany.com" value={form.website} onChange={e => setForm({...form,website:e.target.value})}/></div>
                  </div>
                  <div className="aust-field"><label>Business Industry</label>
                    <select value={form.industry} onChange={e => setForm({...form,industry:e.target.value})}>
                      <option>Select your industry</option>
                      <option>Tech & SaaS</option><option>Real Estate</option><option>Healthcare & Medical</option>
                      <option>Legal Services</option><option>Hospitality & F&B</option><option>Education</option>
                      <option>Retail & eCommerce</option><option>Manufacturing & B2B</option><option>Other</option>
                    </select>
                  </div>
                  <div className="aust-field"><label>What are your main SEO goals?</label><textarea rows={4} placeholder="More organic leads, better rankings for specific keywords, outrank Austin competitors..." value={form.message} onChange={e => setForm({...form,message:e.target.value})}/></div>
                  <button type="submit" className="aust-submit-btn">Request Free Austin SEO Audit →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="aust-cta">
        <div className="aust-sec-inner">
          <h2>Ready to Outrank Your Austin Competitors?</h2>
          <p>Join 500+ businesses that trust 1Solutions to build and sustain Page 1 organic rankings on Google across Austin and Greater Texas.</p>
          <div className="aust-cta-btns">
            <a href="#contact" className="aust-cta-btn-p">Get Free SEO Audit<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <Link href="/affordable-seo-packages/" className="aust-cta-btn-s">View SEO Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
