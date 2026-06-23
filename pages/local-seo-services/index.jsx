import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Google Business Profile Optimisation', desc: 'Complete GBP setup, category optimisation, photo strategy, Q&A management, and weekly post publishing to dominate the local pack.' },
  { n: '02', title: 'Local Keyword Research', desc: 'Hyperlocal keyword mapping — suburb-level, city-level, and near-me queries — matched to the pages most likely to rank for each intent.' },
  { n: '03', title: 'Local Citations & NAP Consistency', desc: 'Audit and clean up your business listings across 50+ directories — Yelp, Yellow Pages, Apple Maps, Bing Places — eliminating conflicting NAP data.' },
  { n: '04', title: 'Review Generation & Management', desc: 'Systematic review acquisition from happy customers, negative review response strategy, and reputation monitoring across Google, Yelp, and Trustpilot.' },
  { n: '05', title: 'Location Page Creation', desc: 'Unique, geo-targeted landing pages for every service area — written by humans, optimised for local intent, and structured for Google Maps relevance.' },
  { n: '06', title: 'Local Link Building', desc: 'Authority link acquisition from local news outlets, chambers of commerce, sponsorships, and community organisations — the signals Google trusts most for local rankings.' },
  { n: '07', title: 'Local Schema Markup', desc: 'LocalBusiness, Service, and Review schema implementation — structured data that tells Google exactly who you are, where you operate, and what customers think.' },
  { n: '08', title: 'Local SEO Reporting', desc: 'Monthly reports tracking map pack positions, local keyword rankings, GBP calls and direction clicks, and revenue attributed to local organic search.' },
];

const RESULTS = [
  { metric: '#1', label: 'Map Pack position achieved', sub: 'Multi-location AU service business', color: '#059669' },
  { metric: '4.3×', label: 'Increase in GBP calls', sub: 'US home services client — 6 months', color: '#059669' },
  { metric: '280%', label: 'Local organic traffic growth', sub: 'Canadian retail chain — 9 months', color: '#059669' },
];

const PROCESS = [
  { step: '01', title: 'Local SEO Audit', desc: 'We audit your GBP, existing rankings, citation consistency, review profile, on-page local signals, and competitor map pack positions.' },
  { step: '02', title: 'Location & Keyword Strategy', desc: 'We map every service area to specific keyword clusters and identify which locations need dedicated landing pages versus GBP optimisation alone.' },
  { step: '03', title: 'On-Page & GBP Fixes', desc: 'We fix NAP inconsistencies, update GBP categories and attributes, implement LocalBusiness schema, and create or optimise location pages.' },
  { step: '04', title: 'Citation Building', desc: 'We build and verify consistent citations across the top 50+ local directories relevant to your industry and geography.' },
  { step: '05', title: 'Review & Authority Building', desc: 'We deploy a review acquisition system and execute local link building to grow your map pack authority month over month.' },
  { step: '06', title: 'Monitor & Report', desc: 'Monthly local rank tracking, GBP insight reports, and call/lead attribution so you can see exactly what local SEO is generating.' },
];

const WHY = [
  { title: 'Maps Pack Specialists', desc: 'We focus specifically on the signals that influence Google\'s 3-pack — proximity, prominence, and relevance — not just general SEO metrics.' },
  { title: 'Multi-Location Experience', desc: 'From single-location SMBs to 50+ location franchises, we have built scalable local SEO systems that maintain quality at every location.' },
  { title: 'Review Strategy Included', desc: 'Most agencies ignore reviews. We build systematic review generation into every engagement because star rating directly impacts click-through rate.' },
  { title: 'US, Canada & Australia Focus', desc: 'We understand the local search landscape in each market — from GBP categories to the directory ecosystems that carry most weight in each country.' },
  { title: 'No Lock-In Contracts', desc: 'Local SEO takes time, but we earn your business every month. You stay because the map pack rankings keep climbing — not because of a contract.' },
  { title: 'Transparent Monthly Reporting', desc: 'Every report shows map pack positions, GBP actions (calls, direction clicks, website visits), and local keyword movement — no smoke and mirrors.' },
];

const FAQS = [
  {
    q: 'How long does it take to rank in the Google Maps pack?',
    a: 'Most businesses see meaningful map pack movement within 2 to 4 months for low-to-medium competition local keywords. Highly competitive markets (lawyers, dentists, real estate in major cities) typically take 4 to 6 months. We set honest expectations in your initial audit — and provide monthly progress reports from day one so you can see movement building.',
  },
  {
    q: 'Do I need a physical address to rank in Google Maps?',
    a: 'Yes for traditional map pack rankings. However, service-area businesses (plumbers, electricians, cleaners) can set a service area without displaying a physical address and still appear in local results for the covered areas. We help service-area businesses optimise their GBP correctly so they appear in all relevant suburb and city searches within their coverage zone.',
  },
  {
    q: 'How important are Google reviews for local SEO?',
    a: 'Very important. Review quantity, recency, and rating directly influence map pack rankings. Our local SEO packages include a review acquisition strategy to build a consistent review velocity — because a burst of 20 old reviews is less powerful than 3 new reviews every month. We also advise on responding to reviews (positive and negative) in ways that reinforce your local authority.',
  },
  {
    q: 'What is NAP consistency and why does it matter?',
    a: 'NAP stands for Name, Address, and Phone number. If your business details are inconsistent across directories (different phone numbers, abbreviated vs full address), Google loses confidence in your business data and your local rankings suffer. We audit and fix all major citation sources — typically 50+ directories — and maintain consistency going forward.',
  },
  {
    q: 'Do you create location pages for each suburb or city?',
    a: 'Yes, for multi-location businesses or service-area businesses covering multiple cities. Each location page is unique — not a template with the city name swapped — covering local landmarks, service descriptions, and location-specific trust signals. Unique, genuinely useful content is what Google rewards; templated pages can actually harm rankings.',
  },
  {
    q: 'Can you help if a competitor is outranking us with fake reviews?',
    a: 'Yes. We can report suspected fake reviews through the official Google Business Profile process, and we build your genuine review velocity so your profile becomes more authoritative regardless. We document evidence for the flag request to maximise removal likelihood. In our experience, building authentic review volume is the most reliable long-term defence.',
  },
  {
    q: 'Do you handle multi-location businesses?',
    a: 'Yes. We build scalable local SEO systems for franchises and chains — standardised GBP management protocols, location page templates with unique content, and centralised reporting across all locations in one dashboard. We have managed local SEO for businesses with 2 locations and for those with 80+ locations across the US, Canada, and Australia.',
  },
  {
    q: 'What results can I realistically expect from local SEO?',
    a: 'Realistic outcomes depend on your market competitiveness, current profile strength, and budget. Most businesses in low-to-medium competition markets see map pack appearances within 60 days, top-3 map pack positions within 3 to 4 months, and measurable increases in GBP calls, direction requests, and website visits within 6 months. We provide case studies from comparable businesses in your industry during our initial consultation so expectations are grounded in real-world data.',
  },
];

const STATS = [
  { label: 'Local SEO Clients', val: '300+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Map Pack Rankings', val: '#1' },
  { label: 'Client Retention', val: '97%' },
];

export default function LocalSeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const stepRefs = useRef([]);
  const whyRef = useRef(null);
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
    if (!whyRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90));
        o.disconnect();
      }
    }, { threshold: 0.1 });
    o.observe(whyRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60));
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
          { '@type': 'ListItem', position: 3, name: 'Local SEO Services', item: 'https://www.1solutions.biz/local-seo-services/' },
        ],
      },
      {
        '@type': 'Service',
        name: 'Local SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Local SEO services that get your business into the Google Maps pack. GBP optimisation, citations, review management, and location pages.',
        areaServed: ['US', 'CA', 'AU'],
        serviceType: 'Local Search Engine Optimisation',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '94', bestRating: '5' },
        url: 'https://www.1solutions.biz/local-seo-services/',
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
        <title>Local SEO Services | Google Maps Pack & GBP Experts | 1Solutions</title>
        <meta name="description" content="Rank in the Google Maps 3-pack with 1Solutions local SEO. GBP optimisation, citation building, review management & location pages for US, Canada & Australia." />
        <meta name="keywords" content="local seo services, local seo agency, google maps seo, google business profile optimisation, local seo company, local search optimisation" />
        <link rel="canonical" href="https://www.1solutions.biz/local-seo-services/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Local SEO Services | 1Solutions" />
        <meta property="og:description" content="Dominate the Google Maps pack. GBP optimisation, citations, review strategy & location pages for US, Canada & Australia businesses." />
        <meta property="og:url" content="https://www.1solutions.biz/local-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .lseo-page { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #0F1F40; line-height: 1.6; overflow-x: hidden; }
          .lseo-page *, .lseo-page *::before, .lseo-page *::after { box-sizing: border-box; }

          .lseo-hero { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 25%, #e0f2fe 60%, #f0fdf4 100%); position: relative; overflow: hidden; padding: 80px 40px 0; }
          .lseo-hero-orb1 { position: absolute; top: -100px; right: -100px; width: 560px; height: 560px; border-radius: 50%; background: radial-gradient(circle, rgba(5,150,105,0.13) 0%, transparent 65%); pointer-events: none; filter: blur(30px); }
          .lseo-hero-orb2 { position: absolute; bottom: 0; left: -80px; width: 440px; height: 440px; border-radius: 50%; background: radial-gradient(circle, rgba(6,95,70,0.08) 0%, transparent 65%); pointer-events: none; filter: blur(30px); }
          .lseo-hero-inner { max-width: 1280px; margin: 0 auto; position: relative; z-index: 2; text-align: center; }
          .lseo-breadcrumb { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 6px; font-size: 12px; color: #6b7280; margin-bottom: 24px; font-weight: 500; }
          .lseo-breadcrumb a { color: #6b7280; text-decoration: none; }
          .lseo-breadcrumb a:hover { color: #059669; }
          .lseo-breadcrumb span { color: #d1d5db; }
          .lseo-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(5,150,105,0.08); border: 1px solid rgba(5,150,105,0.20); border-radius: 100px; padding: 5px 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #047857; margin-bottom: 28px; }
          .lseo-hero-h1 { font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 900; line-height: 1.1; letter-spacing: -1px; background: linear-gradient(90deg, #064E3B 0%, #059669 50%, #0F3460 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 20px; max-width: 900px; margin-left: auto; margin-right: auto; }
          .lseo-hero-sub { font-size: 1.08rem; color: #4A6080; line-height: 1.75; max-width: 660px; margin: 0 auto 36px; }
          .lseo-hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
          .lseo-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #059669; color: #fff; padding: 14px 30px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: all 0.25s; box-shadow: 0 4px 20px rgba(5,150,105,0.28); }
          .lseo-btn-primary:hover { background: #047857; box-shadow: 0 8px 32px rgba(5,150,105,0.38); transform: translateY(-2px); }
          .lseo-btn-secondary { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.65); backdrop-filter: blur(12px); border: 1.5px solid rgba(15,52,96,0.18); color: #0F3460; padding: 14px 30px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: all 0.25s; }
          .lseo-btn-secondary:hover { border-color: #059669; color: #059669; transform: translateY(-2px); }
          .lseo-stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 900px; margin: 0 auto; background: rgba(255,255,255,0.55); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.85); border-radius: 20px 20px 0 0; box-shadow: 0 4px 24px rgba(5,150,105,0.08); }
          .lseo-stat { padding: 20px 24px; text-align: center; border-right: 1px solid rgba(5,150,105,0.08); }
          .lseo-stat:last-child { border-right: none; }
          .lseo-stat-label { font-size: 11px; color: #6b7280; font-weight: 500; margin-bottom: 4px; }
          .lseo-stat-val { font-size: 1.6rem; font-weight: 900; color: #059669; letter-spacing: -0.5px; }

          .lseo-services-section { background: #f8fafd; padding: 80px 40px; box-shadow: 0 -20px 60px rgba(5,150,105,0.07); }
          .lseo-services-inner { max-width: 1280px; margin: 0 auto; }
          .lseo-section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #059669; margin-bottom: 10px; display: block; }
          .lseo-section-title { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; line-height: 1.15; letter-spacing: -1px; background: linear-gradient(90deg, #064E3B 0%, #059669 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px; }
          .lseo-section-desc { font-size: 15px; color: #4A6080; line-height: 1.7; max-width: 640px; margin-bottom: 44px; }
          .lseo-services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
          .lseo-service-card { background: linear-gradient(135deg, rgba(236,253,245,0.65) 0%, rgba(255,255,255,0.88) 60%, rgba(224,242,254,0.40) 100%); border: 1px solid rgba(255,255,255,0.85); border-radius: 20px; padding: 26px 22px 22px; position: relative; overflow: hidden; box-shadow: 0 4px 24px rgba(5,150,105,0.05); opacity: 0; transform: translateY(20px); transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.22s, border-color 0.22s; }
          .lseo-service-card.visible { opacity: 1; transform: translateY(0); }
          .lseo-service-card:hover { transform: translateY(-6px); border-color: rgba(5,150,105,0.28); box-shadow: 0 16px 48px rgba(5,150,105,0.10); }
          .lseo-card-num { position: absolute; top: 8px; right: 14px; font-size: 72px; font-weight: 900; line-height: 1; color: #059669; opacity: 0.05; letter-spacing: -4px; pointer-events: none; user-select: none; }
          .lseo-service-card h3 { font-size: 15px; font-weight: 700; color: #0F1F40; line-height: 1.3; margin-bottom: 8px; position: relative; z-index: 1; }
          .lseo-service-card p { font-size: 13px; color: #4A6080; line-height: 1.6; position: relative; z-index: 1; margin: 0; }

          .lseo-results-section { background: linear-gradient(135deg, #052e16 0%, #065f46 100%); padding: 70px 40px; }
          .lseo-results-inner { max-width: 1280px; margin: 0 auto; text-align: center; }
          .lseo-results-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(52,211,153,0.8); margin-bottom: 12px; display: block; }
          .lseo-results-title { font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 900; color: #fff; margin-bottom: 48px; line-height: 1.2; }
          .lseo-results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 900px; margin: 0 auto; }
          .lseo-result-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 36px 28px; }
          .lseo-result-metric { font-size: 3.5rem; font-weight: 900; color: #34D399; line-height: 1; margin-bottom: 10px; letter-spacing: -2px; }
          .lseo-result-label { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 8px; }
          .lseo-result-sub { font-size: 12.5px; color: rgba(255,255,255,0.50); }

          .lseo-process-section { background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #e0f2fe 100%); padding: 80px 40px; }
          .lseo-process-inner { max-width: 900px; margin: 0 auto; }
          .lseo-process-steps { display: flex; flex-direction: column; margin-top: 44px; }
          .lseo-process-step { display: grid; grid-template-columns: 80px 1fr; gap: 24px; align-items: flex-start; padding: 28px 0; border-bottom: 1px solid rgba(5,150,105,0.10); opacity: 0; transform: translateX(-20px); transition: opacity 0.45s ease, transform 0.45s ease; }
          .lseo-process-step:last-child { border-bottom: none; }
          .lseo-process-step.visible { opacity: 1; transform: translateX(0); }
          .lseo-step-num { font-size: 3rem; font-weight: 900; color: rgba(5,150,105,0.15); line-height: 1; letter-spacing: -2px; }
          .lseo-step-body h3 { font-size: 1.1rem; font-weight: 800; color: #0F1F40; margin-bottom: 6px; }
          .lseo-step-body p { font-size: 0.9rem; color: #4A6080; line-height: 1.7; margin: 0; }

          .lseo-why-section { background: #fff; padding: 80px 40px; }
          .lseo-why-inner { max-width: 1280px; margin: 0 auto; }
          .lseo-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 44px; }
          .lseo-why-card { background: linear-gradient(135deg, #ecfdf5 0%, #fff 60%, #e0f2fe 100%); border: 1px solid rgba(5,150,105,0.10); border-radius: 16px; padding: 28px; opacity: 0; transform: translateY(16px); transition: opacity 0.4s ease, transform 0.4s ease; }
          .lseo-why-card.visible { opacity: 1; transform: translateY(0); }
          .lseo-why-card:hover { border-color: rgba(5,150,105,0.22); box-shadow: 0 8px 32px rgba(5,150,105,0.07); }
          .lseo-why-dot { width: 8px; height: 8px; border-radius: 50%; background: #059669; margin-bottom: 16px; }
          .lseo-why-card h3 { font-size: 1rem; font-weight: 800; color: #0F1F40; margin-bottom: 10px; }
          .lseo-why-card p { font-size: 0.88rem; color: #4A6080; line-height: 1.7; margin: 0; }

          .lseo-faq-section { background: #f8fafd; padding: 80px 40px; }
          .lseo-faq-inner { max-width: 860px; margin: 0 auto; }
          .lseo-faq-list { margin-top: 44px; }
          .lseo-faq-item { border-bottom: 1px solid #e5e7eb; }
          .lseo-faq-q { width: 100%; background: none; border: none; text-align: left; padding: 22px 0; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; cursor: pointer; font-family: inherit; font-size: 1rem; font-weight: 700; color: #0F1F40; line-height: 1.4; }
          .lseo-faq-q:hover { color: #059669; }
          .lseo-faq-icon { width: 22px; height: 22px; border: 2px solid #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; color: #9ca3af; transition: all 0.2s; margin-top: 2px; }
          .lseo-faq-item.open .lseo-faq-icon { border-color: #059669; color: #059669; background: rgba(5,150,105,0.06); }
          .lseo-faq-a { font-size: 0.92rem; color: #4A6080; line-height: 1.8; overflow: hidden; max-height: 0; transition: max-height 0.35s ease, padding-bottom 0.35s ease; }
          .lseo-faq-item.open .lseo-faq-a { max-height: 500px; padding-bottom: 22px; }

          .lseo-cta-section { background: linear-gradient(135deg, rgba(5,150,105,0.06) 0%, rgba(255,255,255,0.80) 40%, rgba(15,52,96,0.04) 100%); padding: 90px 40px; position: relative; overflow: hidden; }
          .lseo-cta-orb1 { position: absolute; top: -80px; right: -80px; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(5,150,105,0.10) 0%, transparent 70%); pointer-events: none; }
          .lseo-cta-orb2 { position: absolute; bottom: -60px; left: -60px; width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(15,52,96,0.06) 0%, transparent 70%); pointer-events: none; }
          .lseo-cta-inner { max-width: 760px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
          .lseo-cta-title { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900; background: linear-gradient(90deg, #064E3B 0%, #059669 50%, #0F3460 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 16px; line-height: 1.2; }
          .lseo-cta-sub { font-size: 1.05rem; color: #4A6080; line-height: 1.75; margin: 0 auto 36px; max-width: 520px; }
          .lseo-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

          @media (max-width: 1024px) { .lseo-services-grid { grid-template-columns: repeat(2, 1fr); } .lseo-why-grid { grid-template-columns: repeat(2, 1fr); } .lseo-results-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 768px) {
            .lseo-hero { padding: 60px 24px 0; }
            .lseo-services-section, .lseo-results-section, .lseo-process-section, .lseo-why-section, .lseo-faq-section, .lseo-cta-section { padding: 60px 24px; }
            .lseo-stats-bar { grid-template-columns: repeat(2, 1fr); border-radius: 16px 16px 0 0; }
            .lseo-stat:nth-child(2) { border-right: none; }
            .lseo-services-grid { grid-template-columns: 1fr; }
            .lseo-why-grid { grid-template-columns: 1fr; }
            .lseo-results-grid { grid-template-columns: 1fr; }
            .lseo-process-step { grid-template-columns: 56px 1fr; }
            .lseo-hero-btns { flex-direction: column; align-items: center; }
          }
        `}</style>
      </Head>

      <div className="lseo-page">
        <section className="lseo-hero">
          <div className="lseo-hero-orb1" /><div className="lseo-hero-orb2" />
          <div className="lseo-hero-inner">
            <nav className="lseo-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span>
              <Link href="/seo-services-company">SEO Services</Link><span>/</span>
              <span style={{ color: '#059669' }}>Local SEO</span>
            </nav>
            <span className="lseo-eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
              US · Canada · Australia
            </span>
            <h1 className="lseo-hero-h1">Rank in the Google Maps Pack and Dominate Local Search</h1>
            <p className="lseo-hero-sub">GBP optimisation, citation building, review strategy, and geo-targeted location pages that drive real foot traffic, calls, and direction requests — not just rankings.</p>
            <div className="lseo-hero-btns">
              <Link href="/contact-us" className="lseo-btn-primary">
                Get a Free Local SEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/affordable-seo-packages" className="lseo-btn-secondary">View SEO Packages</Link>
            </div>
            <div className="lseo-stats-bar">
              {STATS.map(s => (
                <div key={s.label} className="lseo-stat">
                  <div className="lseo-stat-label">{s.label}</div>
                  <div className="lseo-stat-val">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lseo-services-section">
          <div className="lseo-services-inner">
            <span className="lseo-section-eyebrow">What We Do</span>
            <h2 className="lseo-section-title">Complete Local SEO Services</h2>
            <p className="lseo-section-desc">Every signal that Google uses for local rankings — covered in one integrated programme, managed by a dedicated account team.</p>
            <div className="lseo-services-grid" ref={cardsRef}>
              {SERVICES.map((s, i) => (
                <div key={s.n} className={`lseo-service-card${visibleCards.includes(i) ? ' visible' : ''}`}>
                  <div className="lseo-card-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lseo-results-section">
          <div className="lseo-results-inner">
            <span className="lseo-results-eyebrow">Client Results</span>
            <h2 className="lseo-results-title">Local SEO Results That Move the Needle</h2>
            <div className="lseo-results-grid">
              {RESULTS.map(r => (
                <div key={r.label} className="lseo-result-card">
                  <div className="lseo-result-metric">{r.metric}</div>
                  <div className="lseo-result-label">{r.label}</div>
                  <div className="lseo-result-sub">{r.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lseo-process-section">
          <div className="lseo-process-inner">
            <span className="lseo-section-eyebrow">How We Work</span>
            <h2 className="lseo-section-title">Our 6-Step Local SEO Process</h2>
            <p className="lseo-section-desc">From audit to map pack dominance — a structured methodology that compounds authority and rankings over time.</p>
            <div className="lseo-process-steps">
              {PROCESS.map((p, i) => (
                <div key={p.step} ref={el => { stepRefs.current[i] = el; }} className={`lseo-process-step${visibleSteps.includes(i) ? ' visible' : ''}`}>
                  <div className="lseo-step-num">{p.step}</div>
                  <div className="lseo-step-body"><h3>{p.title}</h3><p>{p.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lseo-why-section">
          <div className="lseo-why-inner">
            <span className="lseo-section-eyebrow">Why 1Solutions</span>
            <h2 className="lseo-section-title">The Local SEO Partner That Drives Calls &amp; Footfall</h2>
            <p className="lseo-section-desc">We measure success in map pack positions, GBP calls, and direction clicks — not just keyword rankings on a spreadsheet.</p>
            <div className="lseo-why-grid" ref={whyRef}>
              {WHY.map((w, i) => (
                <div key={w.title} className={`lseo-why-card${visibleWhy.includes(i) ? ' visible' : ''}`}>
                  <div className="lseo-why-dot" />
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lseo-faq-section">
          <div className="lseo-faq-inner">
            <span className="lseo-section-eyebrow">Got Questions?</span>
            <h2 className="lseo-section-title">Local SEO FAQs</h2>
            <p className="lseo-section-desc">Straight answers to what businesses ask us most before starting a local SEO campaign.</p>
            <div className="lseo-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`lseo-faq-item${openFaq === i ? ' open' : ''}`}>
                  <button className="lseo-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    {f.q}
                    <span className="lseo-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="lseo-faq-a" style={openFaq === i ? { maxHeight: 500, paddingBottom: 22 } : {}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lseo-cta-section">
          <div className="lseo-cta-orb1" /><div className="lseo-cta-orb2" />
          <div className="lseo-cta-inner">
            <span className="lseo-section-eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: 16 }}>Ready to Rank Locally?</span>
            <h2 className="lseo-cta-title">Get Your Free Local SEO Audit</h2>
            <p className="lseo-cta-sub">We&rsquo;ll review your Google Business Profile, local rankings, citation health, and competitor map pack positions — and share a clear action plan, completely free.</p>
            <div className="lseo-cta-btns">
              <Link href="/contact-us" className="lseo-btn-primary">
                Request Free Local SEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/affordable-seo-packages" className="lseo-btn-secondary">View SEO Packages</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
