import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Keyword Research & Strategy', desc: "In-depth analysis of how Vancouver customers search for your services — high-intent buying queries, neighbourhood-level terms, and competitive keyword gaps your Vancouver rivals are missing." },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Technical SEO', desc: 'Core Web Vitals optimisation, mobile speed, crawl error fixes, structured data, and site architecture — the technical foundation every Vancouver business needs before other SEO efforts can compound.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'On-Page SEO', desc: 'Title tags, meta descriptions, heading structure, internal linking, and content optimisation across every key page — written for Vancouver buyers, tuned for Google ranking signals.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Local SEO Vancouver', desc: 'Google Business Profile optimisation, Google Maps 3-pack strategy, Vancouver-specific citation building, and NAP consistency management to dominate local search across Metro Vancouver.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Link Building', desc: 'Quality backlinks from Canadian authority sites, Vancouver business media, industry directories, and digital PR — building the domain authority that sustains Page 1 positions through algorithm updates.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Content Marketing', desc: 'SEO-driven blog articles, service pages, and landing pages built around what Vancouver customers are actively searching for — content that ranks and converts, not just fills word counts.' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'eCommerce SEO', desc: 'Product and category page optimisation for Vancouver online stores on Shopify, WooCommerce, Magento, and custom platforms — more organic visibility, lower customer acquisition costs.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'SEO Reporting & Analytics', desc: 'Monthly reports showing keyword ranking movement, organic traffic growth, lead attribution, and ROI — clear numbers so you know exactly what your Vancouver SEO investment is generating.' },
];

const RESULTS = [
  { metric: '280%', label: 'Organic traffic growth', sub: 'Vancouver real estate brokerage — 8 months', color: '#0a4268' },
  { metric: 'Top 3', label: 'Google rankings for 60+ keywords', sub: 'Metro Vancouver tech company — 7 months', color: '#FE9700' },
  { metric: '3.9×', label: 'Increase in organic leads', sub: 'Vancouver healthcare clinic — 6 months', color: '#059669' },
];

const PROCESS = [
  { n: '01', title: 'Free Vancouver SEO Audit', desc: 'We audit your website for technical health, current keyword rankings, backlink profile, competitor positions, and the specific gaps holding your Vancouver business back from Page 1 on Google.' },
  { n: '02', title: 'Keyword & Market Research', desc: 'Deep analysis of how Vancouver and Metro Vancouver customers search for your services — mapping every high-intent query, local modifier, and competitor keyword gap into a prioritised roadmap.' },
  { n: '03', title: 'Technical Optimisation', desc: 'We fix the technical foundations first — Core Web Vitals, mobile performance, crawl errors, schema markup, and site structure — so every subsequent SEO effort builds on solid ground.' },
  { n: '04', title: 'On-Page & Content', desc: 'Optimising every key page for target keywords and creating new content that captures Vancouver buyer demand across the full search intent spectrum — informational to transactional.' },
  { n: '05', title: 'Authority & Link Building', desc: 'Building quality backlinks from relevant Canadian authority sites, Vancouver business publications, and local directories — compounding domain authority that holds rankings long-term.' },
  { n: '06', title: 'Monthly Reporting & Scale', desc: 'Clear monthly reports with ranking movement, traffic growth, and lead data — plus a forward roadmap so you always know what is happening and what we are prioritising next.' },
];

const WHY = [
  { title: 'Vancouver Market Expertise', desc: "We understand Metro Vancouver's competitive digital landscape — from the tech density in Yaletown to the tourism-driven search behaviour in Gastown. Strategy built on real Vancouver search data." },
  { title: '15+ Years SEO Experience', desc: "Founded in 2009, 1Solutions has navigated every major Google algorithm update — Panda, Penguin, Hummingbird, BERT, and Helpful Content — consistently delivering Page 1 rankings." },
  { title: 'Dedicated Account Manager', desc: 'Every Vancouver client has one point of contact who understands your business, reports monthly, and is reachable when you need answers — no rotating teams, no offshore handoffs.' },
  { title: 'White-Hat SEO Only', desc: 'No shortcuts. We build rankings through technical excellence, quality content, and genuine authority building — methods that outlast algorithm updates and never put your domain at risk.' },
  { title: 'Transparent Reporting', desc: 'You see exactly what we did, what moved, and what it generated. Keyword rankings, organic sessions, and lead attribution in a clear monthly report — no smoke and mirrors.' },
  { title: 'No Lock-In Contracts', desc: 'Month-to-month engagements because our results earn your continued business. You stay because your Vancouver rankings keep climbing — not because a contract forces you to.' },
];

const INDUSTRIES = [
  { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', name: 'Real Estate & Property' },
  { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', name: 'Tech & SaaS Companies' },
  { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', name: 'Healthcare & Wellness' },
  { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', name: 'Hospitality & Tourism' },
  { icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', name: 'Legal Services' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', name: 'Retail & eCommerce' },
  { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', name: 'Education & Schools' },
  { icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', name: 'Professional Services' },
];

const AREAS = [
  'Downtown Vancouver', 'Yaletown', 'Gastown', 'Kitsilano', 'Mount Pleasant',
  'Fairview', 'Kerrisdale', 'Marpole', 'Riley Park', 'Hastings-Sunrise',
  'Burnaby', 'Richmond', 'Surrey', 'North Vancouver', 'West Vancouver',
  'Coquitlam', 'Port Coquitlam', 'New Westminster', 'Langley', 'Delta',
  'Abbotsford', 'Maple Ridge', 'Pitt Meadows', 'Port Moody', 'White Rock',
];

const FAQS = [
  { q: "How much does SEO cost in Vancouver?", a: "Vancouver SEO packages from 1Solutions start at CAD 800 per month for small business and local SEO. Comprehensive packages for competitive Vancouver industries like real estate, legal, and tech range from CAD 1,500 to CAD 5,000+ per month depending on competition level and growth goals. We provide a custom quote after your free Vancouver SEO audit — no guesswork, no surprises." },
  { q: "How long does it take to rank on Google in Vancouver?", a: "Lower-competition local keywords in Vancouver typically show ranking movement within 8 to 12 weeks. Mid-competition terms take 3 to 5 months. Highly competitive Vancouver categories — real estate, lawyers, dentists, and tech SaaS — usually require 5 to 8 months of consistent work. We give honest, audit-based timelines, not optimistic promises designed to win your business." },
  { q: "Is 1Solutions based in Vancouver?", a: "1Solutions has dedicated SEO specialists with deep expertise in the Metro Vancouver market and the Canadian search landscape. We work with Vancouver clients both remotely and through direct account management — with full understanding of BC-specific business directories, Canadian backlink sources, and Metro Vancouver search competition across every major industry." },
  { q: "What Vancouver industries do you work with?", a: "We work with Vancouver businesses across real estate, tech and SaaS, healthcare and wellness, legal services, hospitality and tourism, retail and eCommerce, education, and professional services. Every strategy is built from actual Vancouver and Metro Vancouver search volume data for your specific industry — not repurposed content from other markets." },
  { q: "Do you provide local SEO for Vancouver businesses?", a: "Yes. Local SEO for Vancouver is a core service — Google Business Profile optimisation for Metro Vancouver, BC-specific citation building (Yellow Pages Canada, Yelp Canada, Better Business Bureau), Google Maps 3-pack strategy, and neighbourhood-level targeting across Vancouver, Burnaby, Richmond, Surrey, North Vancouver, Coquitlam, and the broader Metro Vancouver region." },
  { q: "Can you help a Vancouver startup with a limited SEO budget?", a: "Absolutely. We work with Vancouver startups from early-stage companies building organic foundations pre-launch to growth-stage companies scaling their inbound channel. For limited budgets, we prioritise keyword gap opportunities and content strategies that generate organic traction within 3 to 4 months without requiring a large initial investment." },
  { q: "How do you measure and report SEO results?", a: "We track keyword ranking movement for all target terms, organic sessions from Google Analytics, organic goal completions (leads, calls, form fills), and revenue attributed to organic search where measurable. Monthly reports are sent in the first week of each month with a clear summary of what changed, what drove it, and the priority roadmap for next quarter." },
];

export default function SeoCompanyVancouver() {
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
          { '@type': 'ListItem', position: 3, name: 'SEO Company in Vancouver', item: 'https://1solutions.biz/seo-company-vancouver/' },
        ],
      },
      {
        '@type': 'LocalBusiness',
        name: '1Solutions — SEO Company in Vancouver',
        url: 'https://1solutions.biz',
        email: 'info@1solutions.biz',
        address: { '@type': 'PostalAddress', addressLocality: 'Vancouver', addressRegion: 'BC', addressCountry: 'CA' },
        areaServed: [
          { '@type': 'City', name: 'Vancouver' },
          { '@type': 'City', name: 'Burnaby' },
          { '@type': 'City', name: 'Richmond' },
          { '@type': 'City', name: 'Surrey' },
          { '@type': 'City', name: 'North Vancouver' },
          { '@type': 'City', name: 'Coquitlam' },
        ],
        description: 'Top SEO company in Vancouver offering keyword research, technical SEO, local SEO, link building, and content strategy for Metro Vancouver businesses.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '86', bestRating: '5' },
      },
      {
        '@type': 'Service',
        name: 'SEO Services in Vancouver',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://1solutions.biz' },
        description: 'Comprehensive SEO services for Vancouver businesses — technical SEO, on-page optimisation, local SEO, link building, and content strategy to achieve Page 1 Google rankings.',
        areaServed: { '@type': 'City', name: 'Vancouver' },
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
        <title>SEO Company in Vancouver | Best SEO Agency Metro Vancouver | 1Solutions</title>
        <meta name="description" content="Looking for the best SEO company in Vancouver? 1Solutions delivers Page 1 Google rankings for Vancouver businesses — technical SEO, local SEO, link building & content strategy. Free SEO audit." />
        <meta name="keywords" content="SEO company in Vancouver, SEO agency Vancouver, SEO services Vancouver, best SEO company Vancouver, Vancouver SEO, search engine optimization Vancouver BC" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://1solutions.biz/seo-company-vancouver/" />
        <meta property="og:title" content="SEO Company in Vancouver | Best SEO Agency Metro Vancouver | 1Solutions" />
        <meta property="og:description" content="Top SEO company in Vancouver with 15+ years experience. We help Vancouver businesses rank on Page 1 of Google. Get your free SEO audit today." />
        <meta property="og:url" content="https://1solutions.biz/seo-company-vancouver/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box;}
          body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
          .vanc-hero{position:relative;overflow:hidden;padding:90px 40px 80px;background:linear-gradient(135deg,rgba(219,234,254,0.65) 0%,rgba(255,255,255,0.78) 50%,rgba(207,250,254,0.55) 100%);}
          .vanc-orb1{position:absolute;top:-100px;right:-100px;width:580px;height:580px;border-radius:50%;background:radial-gradient(circle,rgba(10,66,104,0.10) 0%,transparent 70%);pointer-events:none;filter:blur(12px);}
          .vanc-orb2{position:absolute;bottom:-80px;left:-80px;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(26,114,176,0.07) 0%,transparent 70%);pointer-events:none;filter:blur(10px);}
          .vanc-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1;}
          .vanc-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(10,66,104,0.08);border:1px solid rgba(10,66,104,0.18);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#0a4268;margin-bottom:24px;}
          .vanc-eyebrow-dot{width:7px;height:7px;border-radius:50%;background:#1a72b0;display:inline-block;}
          .vanc-h1{font-size:clamp(2.2rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;color:#0A1628;}
          .vanc-h1 span{background:linear-gradient(90deg,#0a4268 0%,#1a72b0 55%,#FE9700 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .vanc-desc{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:680px;}
          .vanc-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px;}
          .vanc-btn-p{display:inline-flex;align-items:center;gap:8px;background:#0a4268;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 6px 24px rgba(10,66,104,0.28);}
          .vanc-btn-p:hover{background:#0d5280;transform:translateY(-2px);}
          .vanc-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.75);color:#0a4268;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:1.5px solid rgba(10,66,104,0.18);transition:all 0.25s;backdrop-filter:blur(8px);}
          .vanc-btn-s:hover{background:#fff;transform:translateY(-2px);}
          .vanc-trust{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px;}
          .vanc-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500;}
          .vanc-stats-bar{display:flex;border:1px solid rgba(10,66,104,0.10);border-radius:16px;background:rgba(255,255,255,0.80);backdrop-filter:blur(12px);overflow:hidden;max-width:700px;}
          .vanc-stat-item{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(10,66,104,0.08);}
          .vanc-stat-item:last-child{border-right:none;}
          .vanc-stat-num{font-size:1.9rem;font-weight:900;color:#0a4268;line-height:1;letter-spacing:-1px;}
          .vanc-stat-lbl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px;}
          .vanc-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px;}
          .vanc-bc-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280;}
          .vanc-bc a{color:#6b7280;text-decoration:none;}.vanc-bc a:hover{color:#0a4268;}
          .vanc-bc-sep{color:#d1d5db;}.vanc-bc-cur{color:#0a4268;font-weight:500;}
          .vanc-sec{padding:80px 40px;}
          .vanc-bg{background:#f8fafd;}
          .vanc-sec-inner{max-width:1200px;margin:0 auto;}
          .vanc-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#1a72b0;margin-bottom:12px;}
          .vanc-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px;}
          .vanc-h2 span{background:linear-gradient(90deg,#0a4268,#1a72b0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .vanc-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px;}
          .vanc-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
          .vanc-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .vanc-grid2{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .vanc-card{background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.92) 60%,rgba(207,250,254,0.38) 100%);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(10,66,104,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;}
          .vanc-card:hover{transform:translateY(-6px);border-color:rgba(26,114,176,0.25);box-shadow:0 16px 48px rgba(10,66,104,0.12);}
          .vanc-icon{width:48px;height:48px;border-radius:14px;background:rgba(10,66,104,0.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
          .vanc-icon svg{width:22px;height:22px;color:#0a4268;}
          .vanc-card-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3;}
          .vanc-card-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .vanc-results{background:linear-gradient(135deg,#041e3a 0%,#0a4268 100%);padding:64px 40px;}
          .vanc-results-inner{max-width:1200px;margin:0 auto;}
          .vanc-res-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(147,210,253,0.80);margin-bottom:12px;text-align:center;}
          .vanc-res-h{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2;}
          .vanc-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .vanc-res-card{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center;}
          .vanc-res-metric{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px;}
          .vanc-res-label{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;}
          .vanc-res-sub{font-size:12.5px;color:rgba(255,255,255,0.50);}
          .vanc-why-card{background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.90) 60%,rgba(207,250,254,0.35) 100%);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(10,66,104,0.07);}
          .vanc-why-check{width:36px;height:36px;border-radius:10px;background:rgba(10,66,104,0.08);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
          .vanc-why-check svg{width:18px;height:18px;color:#0a4268;}
          .vanc-why-h{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px;}
          .vanc-why-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .vanc-proc-num{font-size:3.5rem;font-weight:900;color:rgba(10,66,104,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px;}
          .vanc-proc-line{width:40px;height:3px;background:linear-gradient(90deg,#0a4268,rgba(26,114,176,0.30));border-radius:2px;margin-bottom:16px;}
          .vanc-proc-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .vanc-proc-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .vanc-ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
          .vanc-ind-card{background:#fff;border:1px solid #edf0f5;border-radius:14px;padding:20px 16px;display:flex;align-items:center;gap:12px;transition:border-color 0.2s,box-shadow 0.2s;}
          .vanc-ind-card:hover{border-color:rgba(10,66,104,0.20);box-shadow:0 4px 16px rgba(10,66,104,0.08);}
          .vanc-ind-icon{width:36px;height:36px;border-radius:10px;background:rgba(10,66,104,0.06);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .vanc-ind-icon svg{width:18px;height:18px;color:#0a4268;}
          .vanc-ind-name{font-size:13.5px;font-weight:600;color:#0A1628;line-height:1.3;}
          .vanc-areas-wrap{display:flex;flex-wrap:wrap;gap:10px;}
          .vanc-area-tag{background:rgba(10,66,104,0.06);border:1px solid rgba(10,66,104,0.12);border-radius:50px;padding:6px 16px;font-size:13px;font-weight:500;color:#0a4268;}
          .vanc-faq-list{display:flex;flex-direction:column;gap:10px;}
          .vanc-faq-item{background:linear-gradient(135deg,rgba(219,234,254,0.42) 0%,rgba(255,255,255,0.88) 60%,rgba(207,250,254,0.30) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(10,66,104,0.06);position:relative;transition:border-color 0.2s;}
          .vanc-faq-item.open{border-color:rgba(26,114,176,0.28);}
          .vanc-faq-item.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#0a4268;border-radius:3px 0 0 3px;}
          .vanc-faq-btn{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px 20px 28px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit;}
          .vanc-faq-qt{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4;}
          .vanc-faq-item.open .vanc-faq-qt{color:#0a4268;}
          .vanc-faq-icon{width:28px;height:28px;border-radius:50%;background:rgba(10,66,104,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s;}
          .vanc-faq-item.open .vanc-faq-icon{background:rgba(10,66,104,0.14);transform:rotate(45deg);}
          .vanc-faq-icon svg{width:14px;height:14px;color:#0a4268;}
          .vanc-faq-a{padding:0 24px 20px 28px;font-size:14px;color:#4b5563;line-height:1.8;}
          .vanc-contact-sec{padding:80px 40px;background:linear-gradient(135deg,rgba(219,234,254,0.60) 0%,rgba(255,255,255,0.72) 50%,rgba(207,250,254,0.55) 100%);}
          .vanc-contact-inner{max-width:1200px;margin:0 auto;}
          .vanc-contact-grid{display:grid;grid-template-columns:1fr 1.25fr;gap:60px;align-items:start;}
          .vanc-info-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:900;color:#0A1628;margin:0 0 16px;line-height:1.25;}
          .vanc-info-h span{background:linear-gradient(90deg,#0a4268,#1a72b0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .vanc-info-p{font-size:1rem;color:#4b5563;line-height:1.75;margin:0 0 28px;}
          .vanc-ci{display:flex;align-items:flex-start;gap:14px;margin-bottom:18px;}
          .vanc-ci-icon{width:40px;height:40px;border-radius:12px;background:rgba(10,66,104,0.09);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .vanc-ci-icon svg{width:18px;height:18px;color:#0a4268;}
          .vanc-ci-text strong{display:block;font-size:13px;font-weight:700;color:#0A1628;margin-bottom:2px;}
          .vanc-ci-text a,.vanc-ci-text span{font-size:13.5px;color:#4b5563;text-decoration:none;}
          .vanc-trust-list{display:flex;flex-direction:column;gap:10px;margin-top:28px;}
          .vanc-trust-item{display:flex;align-items:center;gap:10px;font-size:13.5px;color:#4b5563;}
          .vanc-trust-item svg{flex-shrink:0;color:#059669;}
          .vanc-form-wrap{background:#fff;border-radius:24px;padding:40px;box-shadow:0 4px 40px rgba(0,0,0,0.09);}
          .vanc-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
          .vanc-field label{font-size:13px;font-weight:600;color:#374151;}
          .vanc-field input,.vanc-field select,.vanc-field textarea{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;outline:none;transition:border-color 0.2s;background:#fff;}
          .vanc-field input:focus,.vanc-field select:focus,.vanc-field textarea:focus{border-color:#0a4268;}
          .vanc-field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
          .vanc-sent{text-align:center;padding:48px 24px;}
          .vanc-sent-icon{width:64px;height:64px;border-radius:50%;background:#0a4268;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
          .vanc-sent-icon svg{width:28px;height:28px;color:#fff;}
          .vanc-sent h3{font-size:1.5rem;font-weight:800;color:#0A1628;margin:0 0 10px;}
          .vanc-sent p{color:#4b5563;font-size:1rem;line-height:1.7;margin:0;}
          .vanc-submit-btn{width:100%;padding:14px;background:#0a4268;color:#fff;border:none;border-radius:50px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity 0.2s;margin-top:4px;}
          .vanc-submit-btn:hover{opacity:0.88;}
          .vanc-cta{background:linear-gradient(135deg,#041e3a 0%,#0a4268 100%);padding:80px 40px;text-align:center;}
          .vanc-cta h2{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;margin:0 0 16px;line-height:1.2;}
          .vanc-cta p{font-size:1rem;color:rgba(255,255,255,0.80);margin:0 0 32px;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.7;}
          .vanc-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}
          .vanc-cta-btn-p{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#0a4268;padding:14px 32px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;}
          .vanc-cta-btn-p:hover{transform:translateY(-2px);opacity:0.95;}
          .vanc-cta-btn-s{display:inline-flex;align-items:center;gap:8px;background:transparent;color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;border:2px solid rgba(255,255,255,0.35);transition:all 0.25s;}
          .vanc-cta-btn-s:hover{border-color:rgba(255,255,255,0.70);background:rgba(255,255,255,0.08);}
          @media(max-width:900px){.vanc-grid4{grid-template-columns:1fr 1fr;}.vanc-grid3,.vanc-grid2,.vanc-res-grid{grid-template-columns:1fr 1fr;}.vanc-ind-grid{grid-template-columns:1fr 1fr;}.vanc-contact-grid{grid-template-columns:1fr;gap:40px;}}
          @media(max-width:600px){.vanc-hero,.vanc-sec,.vanc-results,.vanc-cta,.vanc-contact-sec{padding-left:20px;padding-right:20px;}.vanc-hero{padding-top:60px;padding-bottom:50px;}.vanc-grid4,.vanc-grid3,.vanc-grid2,.vanc-res-grid,.vanc-ind-grid{grid-template-columns:1fr;}.vanc-bc{padding:12px 20px;}.vanc-field-row{grid-template-columns:1fr;}.vanc-form-wrap{padding:24px 20px;}}
        `}</style>
      </Head>

      <nav className="vanc-bc" aria-label="Breadcrumb">
        <div className="vanc-bc-inner">
          <Link href="/">Home</Link><span className="vanc-bc-sep">›</span>
          <Link href="/seo-services-company/">SEO Services</Link><span className="vanc-bc-sep">›</span>
          <span className="vanc-bc-cur">SEO Company in Vancouver</span>
        </div>
      </nav>

      <section className="vanc-hero">
        <div className="vanc-orb1" /><div className="vanc-orb2" />
        <div className="vanc-inner">
          <span className="vanc-eyebrow"><span className="vanc-eyebrow-dot" />SEO Company in Vancouver, BC</span>
          <h1 className="vanc-h1">Top-Ranked <span>SEO Company in Vancouver</span><br />That Delivers Page 1 Rankings</h1>
          <p className="vanc-desc">1Solutions is a results-driven SEO company in Vancouver with 15+ years of experience helping Metro Vancouver businesses rank on Page 1 of Google. From technical SEO and local search to link building and content strategy — we build organic visibility that generates qualified leads, not just traffic numbers.</p>
          <div className="vanc-btns">
            <a href="#contact" className="vanc-btn-p">Get a Free SEO Audit<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <Link href="/affordable-seo-packages/" className="vanc-btn-s">View SEO Packages →</Link>
          </div>
          <div className="vanc-trust">
            {['Metro Vancouver specialists','White-hat SEO only','No lock-in contracts','Monthly ranking reports'].map(t => (
              <span key={t} className="vanc-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a4268" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>
            ))}
          </div>
          <div className="vanc-stats-bar">
            {[{num:'500+',lbl:'Clients Served'},{num:'15+',lbl:'Years Experience'},{num:'Page 1',lbl:'Rankings'},{num:'97%',lbl:'Retention Rate'}].map(s => (
              <div key={s.lbl} className="vanc-stat-item"><span className="vanc-stat-num">{s.num}</span><span className="vanc-stat-lbl">{s.lbl}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="vanc-sec vanc-bg" id="services">
        <div className="vanc-sec-inner">
          <span className="vanc-tag">Our Vancouver SEO Services</span>
          <h2 className="vanc-h2">Complete <span>SEO Services in Vancouver</span></h2>
          <p className="vanc-lead">Every component of a winning SEO strategy — delivered by a dedicated team that understands the Metro Vancouver market and your growth goals.</p>
          <div className="vanc-grid4">
            {SERVICES.map(s => (
              <div key={s.title} className="vanc-card">
                <div className="vanc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div>
                <h3 className="vanc-card-h">{s.title}</h3><p className="vanc-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vanc-results">
        <div className="vanc-results-inner">
          <span className="vanc-res-tag">Proven Vancouver SEO Results</span>
          <h2 className="vanc-res-h">What Our SEO Delivers for Vancouver Businesses</h2>
          <div className="vanc-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="vanc-res-card">
                <div className="vanc-res-metric" style={{color:r.color}}>{r.metric}</div>
                <div className="vanc-res-label">{r.label}</div><div className="vanc-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vanc-sec" id="why-us">
        <div className="vanc-sec-inner">
          <span className="vanc-tag">Why Choose 1Solutions</span>
          <h2 className="vanc-h2">The Vancouver SEO Agency <span>That Makes Rankings Last</span></h2>
          <p className="vanc-lead">We build SEO foundations that outlast algorithm updates and deliver compounding organic growth — not short-term spikes that vanish when Google changes its algorithm.</p>
          <div className="vanc-grid2">
            {WHY.map(w => (
              <div key={w.title} className="vanc-why-card">
                <div className="vanc-why-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
                <h3 className="vanc-why-h">{w.title}</h3><p className="vanc-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vanc-sec vanc-bg" id="process">
        <div className="vanc-sec-inner">
          <span className="vanc-tag">How We Work</span>
          <h2 className="vanc-h2">Our <span>6-Step Vancouver SEO Process</span></h2>
          <p className="vanc-lead">A structured, transparent methodology that compounds organic growth over time — from your first free audit to sustained Page 1 dominance in Metro Vancouver search results.</p>
          <div className="vanc-grid3">
            {PROCESS.map(p => (
              <div key={p.n}><div className="vanc-proc-num">{p.n}</div><div className="vanc-proc-line"/><h3 className="vanc-proc-h">{p.title}</h3><p className="vanc-proc-p">{p.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="vanc-sec">
        <div className="vanc-sec-inner">
          <span className="vanc-tag">Vancouver Industries We Serve</span>
          <h2 className="vanc-h2">SEO for <span>Every Vancouver Business Sector</span></h2>
          <p className="vanc-lead">From Yaletown tech startups to Gastown tourism businesses — we deliver SEO strategies built around the specific competitive landscape of your Vancouver industry.</p>
          <div className="vanc-ind-grid">
            {INDUSTRIES.map(ind => (
              <div key={ind.name} className="vanc-ind-card">
                <div className="vanc-ind-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={ind.icon}/></svg></div>
                <span className="vanc-ind-name">{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vanc-sec vanc-bg">
        <div className="vanc-sec-inner">
          <span className="vanc-tag">Areas We Cover</span>
          <h2 className="vanc-h2">SEO Services Across <span>Metro Vancouver</span></h2>
          <p className="vanc-lead">We serve businesses throughout the Metro Vancouver region — from Vancouver neighbourhoods to the surrounding cities of the Lower Mainland.</p>
          <div className="vanc-areas-wrap">
            {AREAS.map(a => <span key={a} className="vanc-area-tag">{a}</span>)}
          </div>
        </div>
      </section>

      <section className="vanc-sec" id="faq">
        <div className="vanc-sec-inner">
          <span className="vanc-tag">Frequently Asked Questions</span>
          <h2 className="vanc-h2">Vancouver SEO <span>FAQs</span></h2>
          <p className="vanc-lead" style={{marginBottom:32}}>Honest answers to the questions Vancouver businesses ask most before starting their SEO journey.</p>
          <div className="vanc-faq-list">
            {FAQS.map((f,i) => (
              <div key={i} className={'vanc-faq-item'+(openFaq===i?' open':'')}>
                <button className="vanc-faq-btn" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                  <span className="vanc-faq-qt">{f.q}</span>
                  <span className="vanc-faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
                </button>
                {openFaq===i && <div className="vanc-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vanc-contact-sec" id="contact">
        <div className="vanc-contact-inner">
          <div className="vanc-contact-grid">
            <div>
              <h2 className="vanc-info-h">Get Your Free <span>Vancouver SEO Audit</span></h2>
              <p className="vanc-info-p">Tell us about your Vancouver business and we will prepare a detailed SEO audit covering your current rankings, technical health, competitor gaps, and a clear roadmap to Page 1. Completely free, no commitment.</p>
              <div className="vanc-ci"><div className="vanc-ci-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></div><div className="vanc-ci-text"><strong>Email</strong><a href="mailto:info@1solutions.biz">info@1solutions.biz</a></div></div>
              <div className="vanc-ci"><div className="vanc-ci-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><div className="vanc-ci-text"><strong>Response Time</strong><span>Within 24 hours</span></div></div>
              <div className="vanc-trust-list">
                {['Free audit — no credit card, no commitment','Dedicated Vancouver SEO specialist assigned','Honest timelines based on real competitor data','White-hat only — no ranking risk'].map(t => (
                  <span key={t} className="vanc-trust-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>
                ))}
              </div>
            </div>
            <div className="vanc-form-wrap">
              {sent ? (
                <div className="vanc-sent"><div className="vanc-sent-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg></div><h3>Audit Request Received</h3><p>Our Vancouver SEO team will review your website and be in touch within 24 hours with your free audit findings.</p></div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="vanc-field-row">
                    <div className="vanc-field"><label>Your Name *</label><input required type="text" placeholder="Alex Johnson" value={form.name} onChange={e => setForm({...form,name:e.target.value})}/></div>
                    <div className="vanc-field"><label>Email Address *</label><input required type="email" placeholder="alex@company.ca" value={form.email} onChange={e => setForm({...form,email:e.target.value})}/></div>
                  </div>
                  <div className="vanc-field-row">
                    <div className="vanc-field"><label>Phone Number</label><input type="tel" placeholder="+1 604 000 0000" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})}/></div>
                    <div className="vanc-field"><label>Your Website URL *</label><input required type="url" placeholder="https://yourcompany.ca" value={form.website} onChange={e => setForm({...form,website:e.target.value})}/></div>
                  </div>
                  <div className="vanc-field"><label>Business Industry</label>
                    <select value={form.industry} onChange={e => setForm({...form,industry:e.target.value})}>
                      <option>Select your industry</option>
                      <option>Real Estate & Property</option><option>Tech & SaaS</option><option>Healthcare & Wellness</option>
                      <option>Legal Services</option><option>Retail & eCommerce</option><option>Hospitality & Tourism</option>
                      <option>Education</option><option>Professional Services</option><option>Other</option>
                    </select>
                  </div>
                  <div className="vanc-field"><label>What are your main SEO goals?</label><textarea rows={4} placeholder="More organic leads, better rankings for specific keywords, faster website..." value={form.message} onChange={e => setForm({...form,message:e.target.value})}/></div>
                  <button type="submit" className="vanc-submit-btn">Request Free Vancouver SEO Audit →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="vanc-cta">
        <div className="vanc-sec-inner">
          <h2>Ready to Outrank Your Vancouver Competitors?</h2>
          <p>Join 500+ businesses that trust 1Solutions to build and sustain Page 1 organic rankings on Google across Metro Vancouver and beyond.</p>
          <div className="vanc-cta-btns">
            <a href="#contact" className="vanc-cta-btn-p">Get Free SEO Audit<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            <Link href="/affordable-seo-packages/" className="vanc-cta-btn-s">View SEO Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
