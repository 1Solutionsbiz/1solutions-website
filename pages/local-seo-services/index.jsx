import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { n: '01', title: 'Google Business Profile Optimisation', desc: 'Full GBP setup or takeover — categories, attributes, photos, Q&A, weekly posts, and service menu — tuned to the signals that determine map pack position.' },
  { n: '02', title: 'Local Keyword Research', desc: 'Suburb-level, city-level, and "near me" keyword mapping matched to the exact pages most likely to rank for each intent and service area.' },
  { n: '03', title: 'Local Citations & NAP Consistency', desc: 'Audit, correct, and build consistent business listings across 50+ directories — Yelp, Apple Maps, Bing Places, Yellow Pages — eliminating the conflicting data that suppresses local rankings.' },
  { n: '04', title: 'Review Generation & Management', desc: 'Systematic review acquisition from satisfied customers, negative review response strategy, and reputation monitoring across Google, Yelp, and industry-specific platforms.' },
  { n: '05', title: 'Location Page Creation', desc: 'Unique, geo-targeted landing pages for every service area — written by humans, optimised for local intent, and structured with LocalBusiness schema for maximum relevance signals.' },
  { n: '06', title: 'Local Link Building', desc: 'Authority acquisition from local news, chambers of commerce, community sponsorships, and industry associations — the local prominence signals Google weighs most.' },
  { n: '07', title: 'Local Schema Markup', desc: 'LocalBusiness, Service, and Review schema implementation that tells Google exactly who you are, where you operate, and what customers think — reducing crawl ambiguity.' },
  { n: '08', title: 'Monthly Local SEO Reporting', desc: 'Reports tracking map pack positions, GBP calls and direction clicks, local keyword movements, and revenue attributed to local organic search — no vanity metrics.' },
];

const RESULTS = [
  { metric: '280%', label: 'Local organic traffic growth', sub: 'Canadian retail chain — 9 months' },
  { metric: '4.3×', label: 'Increase in GBP calls', sub: 'US home services business — 6 months' },
  { metric: '#1', label: 'Map pack position achieved', sub: 'Multi-location AU service business' },
  { metric: '62%', label: 'More direction requests', sub: 'US dental practice — 4 months' },
];

const PROCESS = [
  { n: '01', title: 'Local SEO Audit', desc: 'We analyse your GBP, existing map pack positions, citation consistency across 50+ directories, review profile velocity, on-page local signals, and the full competitive landscape in each target location.' },
  { n: '02', title: 'Location & Keyword Strategy', desc: 'We map every service area to specific keyword clusters and define which locations need dedicated landing pages, which need GBP content, and which need citation reinforcement to close gaps.' },
  { n: '03', title: 'On-Page & GBP Optimisation', desc: 'We fix NAP inconsistencies, update GBP categories and attributes, implement LocalBusiness schema, optimise meta data for local queries, and create or improve location pages.' },
  { n: '04', title: 'Citation & Directory Building', desc: 'We build and verify consistent citations across the top 50+ local directories most relevant to your industry and geography, with suppression of duplicate or incorrect listings.' },
  { n: '05', title: 'Review & Authority Building', desc: 'We deploy a review acquisition system and execute local link building — local press, sponsorships, associations — to build the prominence signals that compound map pack authority.' },
  { n: '06', title: 'Track, Report & Iterate', desc: 'Monthly local rank tracking, GBP insight reports, and call/lead attribution so you can see what local SEO is generating — and so we can adjust strategy based on real data.' },
];

const WHY = [
  { title: 'Maps Pack Specialists', desc: "We focus on the specific signals that influence Google's 3-pack — proximity, prominence, and relevance — not just general SEO metrics that look good on a spreadsheet." },
  { title: 'Multi-Location Experience', desc: 'From single-location SMBs to 80+ location franchises, we have built scalable local SEO systems that maintain citation accuracy and GBP quality at every location.' },
  { title: 'Review Strategy Built In', desc: 'Most agencies treat reviews as an afterthought. We integrate a structured review acquisition programme into every engagement because star rating directly impacts click-through rate.' },
  { title: 'US, Canada & Australia Expertise', desc: 'We understand the local search landscape in each market — from GBP category nuances to the specific directory ecosystems that carry the most weight in each country.' },
  { title: 'Month-to-Month Contracts', desc: 'Local SEO compounds over time, but we earn your business month by month. You stay because map pack rankings keep climbing — not because you are locked in.' },
  { title: 'Transparent Reporting', desc: 'Every monthly report shows map pack positions by keyword, GBP actions (calls, direction clicks, website visits), and local keyword movement — no smoke and mirrors.' },
];

const INDUSTRIES = [
  'Home Services & Trades', 'Dental & Healthcare', 'Legal & Law Firms', 'Restaurants & Cafes',
  'Real Estate Agencies', 'Auto Repair & Dealerships', 'Beauty & Wellness Salons', 'Retail Stores',
  'Financial Services', 'Contractors & Builders', 'Pet Services & Vets', 'Education & Tutoring',
];

const TESTIMONIALS = [
  { text: "We went from invisible in Google Maps to #1 for our main service in under 4 months. The GBP optimisation alone drove a 60% increase in calls.", name: 'James O.', role: 'Owner — HVAC Company, Texas', init: 'J', col: '#0F3460' },
  { text: "Our dental practice now shows in the top 3 map results for every suburb we target. Patient enquiries from Google are up significantly.", name: 'Dr. Priya S.', role: 'Principal Dentist, Sydney', init: 'P', col: '#065f46' },
  { text: "Managing local SEO across 18 locations used to be a nightmare. 1Solutions built us a system that keeps all locations ranking consistently.", name: 'Michelle T.', role: 'Marketing Director — Retail Chain, Canada', init: 'M', col: '#7c3aed' },
  { text: "The review acquisition process they set up was game-changing. We went from 40 reviews to over 200 in six months — and our map pack position improved noticeably.", name: 'Carlos R.', role: 'Owner — Auto Repair, California', init: 'C', col: '#D97706' },
  { text: "Honest reporting from day one. I always know exactly where we rank, what changed, and why. That transparency is rare in this industry.", name: 'Sarah B.', role: 'Director — Boutique Law Firm, Melbourne', init: 'S', col: '#0891B2' },
  { text: "Our local plumbing business now dominates the map pack in three different suburbs. The leads from Google Maps alone justify the investment twice over.", name: 'Kevin L.', role: 'Owner — Plumbing Business, Auckland', init: 'K', col: '#059669' },
];

const FAQS = [
  { q: 'How long does it take to rank in the Google Maps pack?', a: 'Most businesses see meaningful map pack movement within 2 to 4 months for low-to-medium competition local keywords. Highly competitive markets (lawyers, dentists, real estate in major cities) typically take 4 to 6 months. We set honest expectations in your initial audit — and provide monthly progress reports from day one.' },
  { q: 'Do I need a physical address to rank in Google Maps?', a: 'Yes, for traditional map pack rankings. However, service-area businesses (plumbers, electricians, cleaners) can set a service area without displaying a physical address and still appear in local results for covered areas. We help service-area businesses optimise their GBP so they appear in all relevant suburb and city searches within their coverage zone.' },
  { q: 'How important are Google reviews for local SEO?', a: 'Very important. Review quantity, recency, and rating directly influence map pack rankings. Our local SEO engagements include a review acquisition strategy to build consistent review velocity — because a burst of 20 old reviews is less powerful than 3 new reviews every month. We also advise on responding to reviews in ways that reinforce local authority.' },
  { q: 'What is NAP consistency and why does it matter?', a: 'NAP stands for Name, Address, and Phone number. If your business details are inconsistent across directories (different phone numbers, abbreviated vs full address), Google loses confidence in your business data and local rankings suffer. We audit and fix all major citation sources — typically 50+ directories — and maintain consistency going forward.' },
  { q: 'Do you create location pages for each suburb or city?', a: 'Yes, for multi-location businesses or service-area businesses covering multiple cities. Each location page is unique — not a template with the city name swapped — covering local landmarks, service descriptions, and location-specific trust signals. Unique, genuinely useful content is what Google rewards; templated pages can harm rankings.' },
  { q: 'Can you help if a competitor is outranking us with fake reviews?', a: 'Yes. We can report suspected fake reviews through the official Google Business Profile process, and we build your genuine review velocity so your profile becomes more authoritative regardless. We document evidence for the flag request to maximise removal likelihood. In our experience, building authentic review volume is the most reliable long-term defence.' },
  { q: 'Do you handle multi-location businesses?', a: 'Yes. We build scalable local SEO systems for franchises and chains — standardised GBP management protocols, location page frameworks with unique content, and centralised reporting across all locations. We have managed local SEO for businesses with 2 locations and for those with 80+ locations across the US, Canada, and Australia.' },
  { q: 'What results can I realistically expect from local SEO?', a: 'Realistic outcomes depend on your market competitiveness, current profile strength, and budget. Most businesses in low-to-medium competition markets see map pack appearances within 60 days, top-3 positions within 3 to 4 months, and measurable increases in GBP calls, direction requests, and website visits within 6 months. We share case studies from comparable businesses during your initial consultation.' },
];

const RELATED = [
  { href: '/local-seo-packages/', label: 'Local SEO Packages & Pricing' },
  { href: '/google-my-business-optimization/', label: 'Google My Business Optimisation' },
  { href: '/seo-services-company/', label: 'SEO Services' },
  { href: '/technical-seo-optimization/', label: 'Technical SEO' },
  { href: '/link-building-services/', label: 'Link Building' },
  { href: '/affordable-seo-packages/', label: 'Affordable SEO Packages' },
  { href: '/enterprise-seo-services/', label: 'Enterprise SEO' },
  { href: '/seo-audit-services/', label: 'SEO Audit Services' },
  { href: '/content-marketing-services/', label: 'Content Marketing' },
  { href: '/ecommerce-seo-services/', label: 'Ecommerce SEO' },
];

const CHECK = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{color:'#D97706',flexShrink:0,marginTop:2}} aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
);

export default function LocalSeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', business: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const sectionRefs = useRef({});
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setVisibleSections(p => new Set([...p, e.target.dataset.sec])); });
    }, { threshold: 0.12 });
    Object.values(sectionRefs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const rv = (id) => ({ 'data-sec': id, ref: el => { sectionRefs.current[id] = el; }, className: `lseo-reveal${visibleSections.has(id) ? ' lseo-vis' : ''}` });

  const handleForm = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formState, service: 'Local SEO Services', source: 'local-seo-services' }) });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Local SEO Services', item: 'https://www.1solutions.biz/local-seo-services/' },
      ]},
      { '@type': 'Service', name: 'Local SEO Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, description: 'Local SEO services that get your business into the Google Maps 3-pack. GBP optimisation, citation building, review management, and geo-targeted location pages for US, Canada & Australia.', areaServed: ['US', 'CA', 'AU'], serviceType: 'Local Search Engine Optimisation', url: 'https://www.1solutions.biz/local-seo-services/' },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Local SEO Services | Google Maps Pack Experts | 1Solutions</title>
        <meta name="description" content="Rank in the Google Maps 3-pack with 1Solutions local SEO. GBP optimisation, citation building, review management & geo-targeted location pages for US, Canada & Australia businesses." />
        <meta name="keywords" content="local seo services, local seo agency, google maps seo, google business profile optimisation, local seo company, local search optimisation, map pack seo" />
        <link rel="canonical" href="https://www.1solutions.biz/local-seo-services/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Local SEO Services | Google Maps Pack Experts | 1Solutions" />
        <meta property="og:description" content="Dominate the Google Maps 3-pack. GBP optimisation, citations, review strategy & location pages for US, Canada & Australia businesses." />
        <meta property="og:url" content="https://www.1solutions.biz/local-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .lseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .lseo-page *,.lseo-page *::before,.lseo-page *::after{box-sizing:border-box}
          .lseo-reveal{opacity:0;transform:translateY(36px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1)}
          .lseo-vis{opacity:1;transform:translateY(0)}

          /* ── ORBS ── */
          .lseo-orb1{position:fixed;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(15,52,96,0.10) 0%,transparent 70%);top:-100px;right:-200px;pointer-events:none;z-index:0;filter:blur(20px)}
          .lseo-orb2{position:fixed;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.08) 0%,transparent 70%);bottom:0;left:-100px;pointer-events:none;z-index:0;filter:blur(20px)}
          .lseo-orb3{position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(26,82,118,0.12) 0%,transparent 70%);top:45%;left:-150px;pointer-events:none;z-index:0;filter:blur(20px)}

          /* ── SHARED SECTION STYLES ── */
          .lseo-sec{padding:80px 40px;position:relative;z-index:1}
          .lseo-sec-in{max-width:1280px;margin:0 auto}
          .lseo-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .lseo-ttl{font-size:clamp(1.8rem,3.8vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:10px}
          .lseo-desc{font-size:15px;color:#4A6080;line-height:1.75;max-width:680px;margin-bottom:44px}
          .lseo-glass{background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.88);border-radius:20px;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95)}

          /* ── SERVICES ── */
          .lseo-svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
          .lseo-svc-card{padding:28px 24px;position:relative;overflow:hidden;transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s}
          .lseo-svc-card:hover{transform:translateY(-6px);border-color:rgba(217,119,6,0.40)!important;box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1)!important}
          .lseo-svc-n{position:absolute;top:8px;right:16px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;letter-spacing:-4px;pointer-events:none;user-select:none}
          .lseo-svc-title{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;line-height:1.3}
          .lseo-svc-body{font-size:13px;color:#4A6080;line-height:1.65;margin:0}

          /* ── RESULTS (DARK) ── */
          .lseo-dark{padding:80px 40px;background:linear-gradient(135deg,#071e3d 0%,#0F3460 40%,#0a2549 100%);position:relative;z-index:1;overflow:hidden}
          .lseo-dark-in{max-width:1280px;margin:0 auto}
          .lseo-dark-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.50);margin-bottom:10px;display:block;text-align:center}
          .lseo-dark-ttl{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;color:#fff;margin-bottom:10px;line-height:1.2;text-align:center}
          .lseo-dark-sub{font-size:15px;color:rgba(255,255,255,0.55);text-align:center;max-width:580px;margin:0 auto 48px}
          .lseo-res-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
          .lseo-res-card{background:rgba(255,255,255,0.06);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.10);border-radius:20px;padding:36px 24px;text-align:center;transition:border-color 0.2s,background 0.2s}
          .lseo-res-card:hover{background:rgba(255,255,255,0.09);border-color:rgba(217,119,6,0.40)}
          .lseo-res-metric{font-size:clamp(2.4rem,4vw,3.4rem);font-weight:900;color:#D97706;line-height:1;margin-bottom:10px;letter-spacing:-2px}
          .lseo-res-label{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
          .lseo-res-sub{font-size:12px;color:rgba(255,255,255,0.45);line-height:1.5}

          /* ── PROCESS ── */
          .lseo-proc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .lseo-proc-card{padding:32px 28px;transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s}
          .lseo-proc-card:hover{transform:translateY(-5px);border-color:rgba(217,119,6,0.40)!important;box-shadow:0 16px 48px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1)!important}
          .lseo-proc-n{font-size:2.8rem;font-weight:900;color:rgba(15,52,96,0.10);line-height:1;margin-bottom:12px;letter-spacing:-2px}
          .lseo-proc-t{font-size:17px;font-weight:800;color:#0F3460;margin-bottom:10px}
          .lseo-proc-d{font-size:13.5px;color:#4A6080;line-height:1.7;margin:0}

          /* ── WHY ── */
          .lseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .lseo-why-card{padding:28px 24px;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s}
          .lseo-why-card:hover{transform:translateY(-6px);border-color:rgba(217,119,6,0.45)!important;box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1)!important}
          .lseo-why-dot{width:9px;height:9px;border-radius:50%;background:linear-gradient(135deg,#D97706,#F59E0B);margin-bottom:16px;box-shadow:0 0 0 3px rgba(217,119,6,0.15)}
          .lseo-why-t{font-size:16px;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .lseo-why-d{font-size:13.5px;color:#4A6080;line-height:1.7;margin:0}

          /* ── INDUSTRIES ── */
          .lseo-ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
          .lseo-ind-pill{background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.88);border-radius:12px;padding:14px 16px;font-size:13px;font-weight:600;color:#374151;text-align:center;box-shadow:0 2px 10px rgba(15,52,96,0.06);transition:all 0.2s}
          .lseo-ind-pill:hover{background:rgba(255,255,255,0.90);border-color:rgba(217,119,6,0.45);color:#D97706;box-shadow:0 6px 20px rgba(15,52,96,0.10)}

          /* ── TESTIMONIALS ── */
          .lseo-testi{padding:72px 0;background:#f8fafd;overflow:hidden;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1}
          .lseo-testi-hd{max-width:1280px;margin:0 auto 32px;padding:0 40px;text-align:center}
          @keyframes lseo-marq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .lseo-trow{overflow:hidden;position:relative}
          .lseo-tfade-l{position:absolute;left:0;top:0;bottom:0;width:120px;z-index:1;background:linear-gradient(to right,#f8fafd,transparent);pointer-events:none}
          .lseo-tfade-r{position:absolute;right:0;top:0;bottom:0;width:120px;z-index:1;background:linear-gradient(to left,#f8fafd,transparent);pointer-events:none}
          .lseo-ttrack{display:flex;gap:20px;width:max-content;padding-left:20px;animation:lseo-marq 36s linear infinite;will-change:transform}
          .lseo-trow:hover .lseo-ttrack{animation-play-state:paused}
          .lseo-tcard{width:400px;flex-shrink:0;background:#fff;border:1px solid rgba(15,52,96,0.08);border-radius:16px;padding:28px;box-shadow:0 2px 16px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:14px;user-select:none;transition:border-color 0.2s}
          .lseo-tcard:hover{border-color:rgba(217,119,6,0.30)}
          .lseo-tcard-stars{color:#F59E0B;font-size:14px;letter-spacing:1px}
          .lseo-tcard-text{font-size:14px;color:#374151;line-height:1.75;flex-grow:1;font-style:italic}
          .lseo-tcard-foot{display:flex;align-items:center;gap:12px;border-top:1px solid #f3f4f6;padding-top:14px}
          .lseo-tcard-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;flex-shrink:0}
          .lseo-tcard-name{font-weight:700;color:#111827;font-size:13px}
          .lseo-tcard-role{color:#9ca3af;font-size:12px;margin-top:1px}

          /* ── FAQ ── */
          .lseo-faq-in{max-width:860px;margin:0 auto}
          .lseo-fitem{border-bottom:1px solid rgba(15,52,96,0.08)}
          .lseo-fq{width:100%;background:none;border:none;text-align:left;padding:20px 20px 20px 52px;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:15px;font-weight:700;color:#0F1F40;line-height:1.4;position:relative;transition:color 0.2s}
          .lseo-fq:hover{color:#D97706}
          .lseo-fnum{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,0.07);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s}
          .lseo-fitem.open .lseo-fnum{background:rgba(217,119,6,0.12);color:#D97706}
          .lseo-fchev{width:20px;height:20px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s;margin-top:3px}
          .lseo-fitem.open .lseo-fchev{transform:rotate(180deg);color:#D97706}
          .lseo-fa{font-size:14px;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease;padding:0 20px 0 52px}
          .lseo-fitem.open .lseo-fa{max-height:500px;padding-bottom:22px}

          /* ── CONTACT ── */
          .lseo-contact{background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.70) 40%,rgba(219,234,254,0.50) 100%);backdrop-filter:blur(20px);padding:80px 40px;position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.70)}
          .lseo-contact-in{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}
          .lseo-contact-left{}
          .lseo-contact-detail{display:flex;align-items:flex-start;gap:14px;margin-bottom:22px}
          .lseo-cd-icon{width:40px;height:40px;background:rgba(15,52,96,0.08);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
          .lseo-cd-label{font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px}
          .lseo-cd-val{font-size:14px;color:#0F1F40;font-weight:600}
          .lseo-form-box{background:rgba(255,255,255,0.85);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .lseo-form-ttl{font-size:20px;font-weight:800;color:#0F1F40;margin:0 0 22px}
          .lseo-form{display:flex;flex-direction:column;gap:14px}
          .lseo-form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .lseo-fg{display:flex;flex-direction:column;gap:5px}
          .lseo-fg.full{grid-column:1/-1}
          .lseo-fg label{font-size:12px;font-weight:600;color:#374151}
          .lseo-fg input,.lseo-fg textarea,.lseo-fg select{padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:8px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.70);box-shadow:inset 0 1px 4px rgba(15,52,96,0.05);transition:border-color 0.2s,background 0.2s}
          .lseo-fg input:focus,.lseo-fg textarea:focus,.lseo-fg select:focus{outline:none;border-color:#D97706;background:#fff;box-shadow:0 0 0 3px rgba(217,119,6,0.10)}
          .lseo-submit{padding:13px 28px;background:rgba(15,52,96,0.90);backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,0.20);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.22)}
          .lseo-submit:hover{background:#0F3460;border-color:rgba(217,119,6,0.50);transform:translateY(-2px)}
          .lseo-submit:disabled{opacity:0.65;cursor:not-allowed;transform:none}
          .lseo-sent{text-align:center;padding:32px 0;font-size:15px;color:#059669;font-weight:600}

          /* ── RELATED ── */
          .lseo-related-in{max-width:860px;margin:0 auto;text-align:center}
          .lseo-rtags{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .lseo-rtag{display:inline-flex;align-items:center;padding:8px 16px;background:rgba(255,255,255,0.85);backdrop-filter:blur(8px);border:1px solid rgba(15,52,96,0.12);border-radius:100px;font-size:13px;font-weight:600;color:#0F3460;text-decoration:none;transition:all 0.2s;box-shadow:0 2px 8px rgba(15,52,96,0.06)}
          .lseo-rtag:hover{background:#fff;border-color:rgba(217,119,6,0.45);color:#D97706;transform:translateY(-2px);box-shadow:0 6px 20px rgba(15,52,96,0.10)}

          /* ── RESPONSIVE ── */
          @media(max-width:1024px){
            .lseo-svc-grid{grid-template-columns:repeat(2,1fr)}
            .lseo-res-grid{grid-template-columns:repeat(2,1fr)}
            .lseo-why-grid{grid-template-columns:repeat(2,1fr)}
            .lseo-ind-grid{grid-template-columns:repeat(3,1fr)}
            .lseo-contact-in{grid-template-columns:1fr;gap:40px}
          }
          @media(max-width:768px){
            .lseo-sec{padding:60px 24px}
            .lseo-dark,.lseo-testi,.lseo-contact{padding:60px 24px}
            .lseo-svc-grid{grid-template-columns:1fr}
            .lseo-proc-grid{grid-template-columns:1fr}
            .lseo-why-grid{grid-template-columns:1fr}
            .lseo-res-grid{grid-template-columns:repeat(2,1fr)}
            .lseo-ind-grid{grid-template-columns:repeat(2,1fr)}
            .lseo-form-row{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <div className="lseo-page">
        <div className="lseo-orb1"/><div className="lseo-orb2"/><div className="lseo-orb3"/>

        {/* ── HERO ── */}
        <ServiceHero
          eyebrow="Google Maps Pack Experts · US · Canada · Australia"
          title={<>Rank in the <AuroraText>Google Maps Pack</AuroraText> and Dominate Local Search</>}
          subtext="GBP optimisation, citation building, review strategy, and geo-targeted location pages that drive real foot traffic, calls, and direction requests - not just rankings on a spreadsheet."
          primaryCta={{ label: 'Get a Free Local SEO Audit', href: '/contact-us/' }}
          secondaryCta={{ label: 'View Local SEO Packages', href: '/local-seo-packages/#pricing' }}
          stats={[
            { label: 'Local SEO Clients', value: '300', suffix: '+' },
            { label: 'Years Experience', value: '15', suffix: '+' },
            { label: 'Map Pack Rankings', value: '1', prefix: '#' },
            { label: 'Client Retention', value: '97', suffix: '%' },
          ]}
        />

        {/* ── SERVICES ── */}
        <section className="lseo-sec" style={{background:'#f8fafd'}}>
          <div className="lseo-sec-in">
            <div {...rv('services')}>
              <span className="lseo-sec-ey">What We Do</span>
              <h2 className="lseo-ttl">Complete Local SEO Services</h2>
              <p className="lseo-desc">Every signal Google uses for local rankings — covered in one integrated programme managed by a dedicated account team. No shortcuts. No templated work.</p>
            </div>
            <div className="lseo-svc-grid">
              {SERVICES.map(s => (
                <div key={s.n} className="lseo-glass lseo-svc-card">
                  <div className="lseo-svc-n">{s.n}</div>
                  <h3 className="lseo-svc-title">{s.title}</h3>
                  <p className="lseo-svc-body">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className="lseo-dark">
          <div className="lseo-dark-in">
            <div {...rv('results')}>
              <span className="lseo-dark-ey">Client Results</span>
              <h2 className="lseo-dark-ttl">Local SEO Results That Move the Needle</h2>
              <p className="lseo-dark-sub">Real numbers from real businesses. Local SEO compounds — results get stronger month over month as authority builds.</p>
            </div>
            <div className="lseo-res-grid">
              {RESULTS.map(r => (
                <div key={r.label} className="lseo-res-card">
                  <div className="lseo-res-metric">{r.metric}</div>
                  <div className="lseo-res-label">{r.label}</div>
                  <div className="lseo-res-sub">{r.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="lseo-sec">
          <div className="lseo-sec-in">
            <div {...rv('process')}>
              <span className="lseo-sec-ey">How We Work</span>
              <h2 className="lseo-ttl">Our 6-Step Local SEO Process</h2>
              <p className="lseo-desc">From initial audit to map pack dominance — a structured methodology built to compound authority and rankings over time.</p>
            </div>
            <div className="lseo-proc-grid">
              {PROCESS.map(p => (
                <div key={p.n} className="lseo-glass lseo-proc-card">
                  <div className="lseo-proc-n">{p.n}</div>
                  <div className="lseo-proc-t">{p.title}</div>
                  <p className="lseo-proc-d">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY 1SOLUTIONS ── */}
        <section className="lseo-sec" style={{background:'#f8fafd'}}>
          <div className="lseo-sec-in">
            <div {...rv('why')}>
              <span className="lseo-sec-ey">Why 1Solutions</span>
              <h2 className="lseo-ttl">The Local SEO Partner That Drives Calls &amp; Footfall</h2>
              <p className="lseo-desc">We measure success in map pack positions, GBP calls, and direction clicks — not just keyword rankings on a report nobody reads.</p>
            </div>
            <div className="lseo-why-grid">
              {WHY.map(w => (
                <div key={w.title} className="lseo-glass lseo-why-card">
                  <div className="lseo-why-dot"/>
                  <div className="lseo-why-t">{w.title}</div>
                  <p className="lseo-why-d">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="lseo-sec">
          <div className="lseo-sec-in">
            <div {...rv('industries')} style={{textAlign:'center',marginBottom:36}}>
              <span className="lseo-sec-ey">Industries We Serve</span>
              <h2 className="lseo-ttl" style={{maxWidth:600,margin:'0 auto 12px'}}>Local SEO for Every Service Business</h2>
              <p className="lseo-desc" style={{margin:'0 auto'}}>We have managed local SEO programmes across dozens of verticals — from single-location tradespeople to national franchise networks.</p>
            </div>
            <div className="lseo-ind-grid">
              {INDUSTRIES.map(ind => (
                <div key={ind} className="lseo-ind-pill">{ind}</div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="lseo-testi">
          <div className="lseo-testi-hd">
            <div {...rv('testi')}>
              <span className="lseo-sec-ey" style={{display:'block',marginBottom:6}}>What Clients Say</span>
              <h2 className="lseo-ttl" style={{maxWidth:580,margin:'0 auto'}}>Businesses That Found Their Map Pack Position</h2>
            </div>
          </div>
          <div className="lseo-trow">
            <div className="lseo-tfade-l"/><div className="lseo-tfade-r"/>
            <div className="lseo-ttrack">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i} className="lseo-tcard">
                  <div className="lseo-tcard-stars">★★★★★</div>
                  <p className="lseo-tcard-text">&ldquo;{t.text}&rdquo;</p>
                  <div className="lseo-tcard-foot">
                    <div className="lseo-tcard-av" style={{background:t.col}}>{t.init}</div>
                    <div>
                      <div className="lseo-tcard-name">{t.name}</div>
                      <div className="lseo-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="lseo-sec" style={{background:'#f8fafd'}}>
          <div className="lseo-faq-in">
            <div {...rv('faq')} style={{textAlign:'center',marginBottom:36}}>
              <span className="lseo-sec-ey">Got Questions?</span>
              <h2 className="lseo-ttl">Local SEO FAQs</h2>
              <p className="lseo-desc" style={{margin:'0 auto'}}>Straight answers to what business owners ask us most before starting a local SEO campaign.</p>
            </div>
            <div>
              {FAQS.map((f, i) => (
                <div key={i} className={`lseo-fitem${openFaq === i ? ' open' : ''}`}>
                  <button className="lseo-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <span className="lseo-fnum">{String(i+1).padStart(2,'0')}</span>
                    {f.q}
                    <svg className="lseo-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="lseo-fa" style={openFaq === i ? {maxHeight:500,paddingBottom:22} : {}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="lseo-contact" id="contact">
          <div className="lseo-contact-in">
            <div className="lseo-contact-left">
              <div {...rv('contact')}>
                <span className="lseo-sec-ey">Get in Touch</span>
                <h2 className="lseo-ttl" style={{maxWidth:480}}>Start Your Local SEO Campaign Today</h2>
                <p style={{fontSize:15,color:'#4A6080',lineHeight:1.75,marginBottom:36}}>Tell us your location, target areas, and goals. We&rsquo;ll run a free audit on your Google Business Profile, local rankings, and citation health — and come back with a clear action plan at no cost.</p>
              </div>
              <div className="lseo-contact-detail">
                <div className="lseo-cd-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <div className="lseo-cd-label">Phone / WhatsApp</div>
                  <div className="lseo-cd-val">+91-9810-045-499</div>
                </div>
              </div>
              <div className="lseo-contact-detail">
                <div className="lseo-cd-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <div className="lseo-cd-label">Email</div>
                  <div className="lseo-cd-val">info@1solutions.biz</div>
                </div>
              </div>
              <div className="lseo-contact-detail">
                <div className="lseo-cd-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <div className="lseo-cd-label">Response Time</div>
                  <div className="lseo-cd-val">Within 4 business hours</div>
                </div>
              </div>
              <div style={{marginTop:28,padding:'20px 24px',background:'rgba(255,255,255,0.60)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.88)',borderRadius:14,fontSize:14,color:'#4A6080',lineHeight:1.7}}>
                <strong style={{color:'#0F3460'}}>What happens next?</strong> After receiving your enquiry we run a complimentary audit of your GBP, local citation health, and top-3 competitor map pack profiles. You receive a clear action plan — no sales call required unless you want one.
              </div>
            </div>

            <div className="lseo-form-box">
              <h3 className="lseo-form-ttl">Request Your Free Local SEO Audit</h3>
              {sent ? (
                <div className="lseo-sent">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{margin:'0 auto 12px',display:'block'}}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Thank you! We&rsquo;ll run your audit and be in touch within 4 business hours.
                </div>
              ) : (
                <form className="lseo-form" onSubmit={handleForm}>
                  <div className="lseo-form-row">
                    <div className="lseo-fg">
                      <label htmlFor="lseo-name">Your Name *</label>
                      <input id="lseo-name" type="text" placeholder="Jane Smith" required value={formState.name} onChange={e=>setFormState(p=>({...p,name:e.target.value}))}/>
                    </div>
                    <div className="lseo-fg">
                      <label htmlFor="lseo-email">Email Address *</label>
                      <input id="lseo-email" type="email" placeholder="jane@business.com" required value={formState.email} onChange={e=>setFormState(p=>({...p,email:e.target.value}))}/>
                    </div>
                  </div>
                  <div className="lseo-form-row">
                    <div className="lseo-fg">
                      <label htmlFor="lseo-phone">Phone / WhatsApp</label>
                      <input id="lseo-phone" type="tel" placeholder="+1 555 000 0000" value={formState.phone} onChange={e=>setFormState(p=>({...p,phone:e.target.value}))}/>
                    </div>
                    <div className="lseo-fg">
                      <label htmlFor="lseo-biz">Business Name *</label>
                      <input id="lseo-biz" type="text" placeholder="My Business LLC" required value={formState.business} onChange={e=>setFormState(p=>({...p,business:e.target.value}))}/>
                    </div>
                  </div>
                  <div className="lseo-fg full">
                    <label htmlFor="lseo-msg">Target Locations &amp; Goals</label>
                    <textarea id="lseo-msg" rows={4} placeholder="e.g. We want to rank in Chicago's map pack for plumbing, HVAC and electrical. Currently not visible in any local results…" value={formState.message} onChange={e=>setFormState(p=>({...p,message:e.target.value}))}/>
                  </div>
                  <button type="submit" className="lseo-submit" disabled={sending}>
                    {sending ? 'Sending…' : 'Get My Free Local SEO Audit →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="lseo-sec">
          <div className="lseo-related-in">
            <div {...rv('related')}>
              <span className="lseo-sec-ey">Explore More</span>
              <h2 className="lseo-ttl" style={{marginBottom:12}}>Related SEO &amp; Digital Marketing Services</h2>
              <p className="lseo-desc" style={{margin:'0 auto 28px'}}>Local SEO is one part of a complete search strategy. Explore the services that complement your map pack campaign.</p>
            </div>
            <div className="lseo-rtags">
              {RELATED.map(({ href, label }) => (
                <Link key={href} href={href} className="lseo-rtag">{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
