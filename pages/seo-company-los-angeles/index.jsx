import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title:'Local SEO Los Angeles', body:'Dominate the Google Maps Pack and local 3-pack for every high-intent neighbourhood search across LA County, from Hollywood and West Hollywood to Santa Monica, Pasadena, and Long Beach. GBP optimisation, citation building, and geo-targeted landing pages included.' },
  { icon:'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title:'Technical SEO Audits', body:'Full crawl-level audits fixing Core Web Vitals, page speed, mobile usability, structured data errors, duplicate content, and site architecture — the technical foundation every LA business must get right before keyword rankings can compound.' },
  { icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'On-Page SEO Optimization', body:'Title tags, meta descriptions, H1–H3 structure, internal linking architecture, and content optimisation across every key page — written for LA buyers and tuned for Google ranking signals in one of the most competitive US markets.' },
  { icon:'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title:'Content Marketing for LA', body:'SEO-driven blog articles, service pages, and landing pages built around what Los Angeles customers are searching for — content that earns first-page rankings and converts that traffic into enquiries, calls, and sales for your LA business.' },
  { icon:'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title:'Link Building & Digital PR', body:'High-authority backlinks from LA media (LA Times, LA Business Journal, Eater LA), California directories, and industry-specific publications. Genuine digital PR that builds domain authority and holds rankings through algorithm updates.' },
  { icon:'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title:'E-commerce SEO Los Angeles', body:'Product page, category, and site architecture optimisation for LA-based online stores on Shopify, WooCommerce, Magento, and BigCommerce — more organic visibility and lower customer acquisition cost across the full LA consumer market.' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Schema Markup & Rich Snippets', body:'LocalBusiness, Organization, Product, Review, FAQPage, and HowTo schema implementation — giving Google the structured data it needs to feature your LA business in rich results, knowledge panels, and People Also Ask boxes.' },
  { icon:'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z', title:'Monthly SEO Reporting & Analytics', body:'Clear monthly reports showing keyword ranking movement across all LA target terms, organic traffic growth, lead attribution, conversion rates, and revenue tied to organic search — so you know exactly what your LA SEO investment is returning every month.' },
];

const RESULTS = [
  { prefix:'',  target:4.1, suffix:'×', decimals:1, label:'Organic traffic growth',               detail:'LA retail brand — 8-month campaign' },
  { prefix:'',  target:310, suffix:'%', decimals:0, label:'Increase in qualified organic leads',   detail:'LA healthcare group — 10 months' },
  { prefix:'#', target:1,   suffix:'',  decimals:0, label:'Rank for 60+ target LA keywords',       detail:'LA law firm — 7 months' },
  { prefix:'',  target:75,  suffix:'d', decimals:0, label:'To page 1 for primary service keywords', detail:'LA service business, brand-new domain' },
];

const PROCESS = [
  { n:'01', title:'LA Market & Competitor Analysis', body:'We start with a full audit of your website, Google Business Profile, and the competitive landscape specific to your LA neighbourhood and industry vertical — identifying every technical gap, keyword opportunity, and competitor weakness before writing a single line of content.' },
  { n:'02', title:'LA Keyword Strategy', body:'We map every high-intent search query your LA customers use — neighbourhood modifiers (Culver City, Burbank, Glendale), service intent (buy now vs research), and industry-specific long-tail — then assign each cluster to the right page type for maximum ranking efficiency.' },
  { n:'03', title:'Technical SEO Foundation', body:'Core Web Vitals, mobile performance, crawl architecture, internal linking, and structured data all locked down in the first 30 days — because no amount of content or links will overcome a slow, technically broken website in the LA market.' },
  { n:'04', title:'On-Page & Content Optimisation', body:'Every priority page rewritten and re-structured for its target keyword cluster. New service pages, location landing pages for key LA neighbourhoods, and a content calendar targeting the top-of-funnel queries your ideal LA customers search before they are ready to buy.' },
  { n:'05', title:'Authority Building for LA', body:'Quality backlinks from California authority publications, LA-specific business directories, local chambers of commerce, and strategic digital PR — compounding domain authority that holds your rankings through Google algorithm updates.' },
  { n:'06', title:'Monthly Reporting & Growth', body:'Clear monthly reports with keyword position changes, organic session growth, and lead attribution, plus a rolling 90-day action plan. You always know what we are doing, what moved, and what the next focus is — with a dedicated account manager you can actually reach.' },
];

const WHY = [
  { icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title:'Deep Los Angeles Market Knowledge', body:'We understand the hyper-local nature of LA search — the difference between ranking in Beverly Hills vs East LA vs the South Bay. Our LA SEO strategies reflect the city\'s diverse neighbourhoods, demographics, and competitive intensity.' },
  { icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title:'15+ Years of SEO Experience', body:'Founded in 2009 and still active through every major Google update — Panda, Penguin, BERT, Helpful Content, and the AI Overviews rollout. We adapt, not react, and our LA clients maintain Page 1 positions through every shift.' },
  { icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'White-Hat Techniques Only', body:'No black-hat link schemes, no keyword stuffing, no shortcuts that put your domain at risk. We build LA rankings through technical excellence, quality content, and genuine authority — methods that outlast algorithm updates and compound over time.' },
  { icon:'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', title:'Dedicated Account Manager', body:'Every LA client has one point of contact who understands your business, calls you monthly, and is reachable when you need answers. No rotating teams, no offshore handoffs, no junior account managers learning on your budget.' },
  { icon:'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z', title:'No Lock-In Contracts', body:'Month-to-month engagements only. We earn your continued business every month through rankings, traffic, and leads — not through contractual obligations that keep you paying regardless of performance.' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Transparent Monthly Reporting', body:'You see exactly what we did, what moved, and what it generated — keyword rankings, organic sessions, and lead attribution in a clear monthly report. No vanity metrics, no smoke and mirrors, just the numbers tied to your LA business revenue.' },
];

function useCountUp(target, duration, started) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf;
    const start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    const step = now => {
      const t = Math.min(1, (now - start) / duration);
      setValue(target * ease(t));
      if (t < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started]);
  return value;
}

function StatCard({ prefix, target, suffix, decimals, label, detail }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const value = useCountUp(target, 1800, started);
  const display = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
  return (
    <div ref={ref} className="la-res-card">
      <div className="la-res-metric">{prefix}{display}{suffix}</div>
      <div className="la-res-label">{label}</div>
      <div className="la-res-detail">{detail}</div>
    </div>
  );
}

const PACKAGES = [
  {
    name: 'Starter', slug: 'starter', monthlyPrice: 499, yearlyPrice: 415, yearlySave: 1008,
    desc: 'For single-location LA businesses starting SEO or trying to break onto page 1.',
    popular: false,
    features: [
      '1 location / neighbourhood focus',
      'Google Business Profile optimisation',
      '5 service or location landing pages',
      '20 local citation submissions',
      '10 target keywords tracked',
      'Basic schema markup (LocalBusiness)',
      'Technical SEO audit & fixes',
      'Monthly rank & traffic report',
    ],
  },
  {
    name: 'Growth', slug: 'growth', monthlyPrice: 899, yearlyPrice: 749, yearlySave: 1800,
    desc: 'For established LA businesses ready to dominate their category across the city.',
    popular: true,
    features: [
      '1–2 locations',
      'Full GBP management + Q&A + photos',
      'Up to 12 service + neighbourhood pages',
      '40 local citation submissions',
      '25 target keywords tracked',
      'Full schema markup suite',
      'Competitor gap analysis',
      'Content calendar (2 pieces/month)',
      'Link building (5 quality backlinks/month)',
      'Monthly rank + lead tracking report',
    ],
  },
  {
    name: 'Authority', slug: 'authority', monthlyPrice: 1499, yearlyPrice: 1249, yearlySave: 3000,
    desc: 'For multi-location LA businesses or highly competitive categories like law, healthcare, and finance.',
    popular: false,
    features: [
      'Up to 3 locations across LA County',
      'Full GBP management all locations',
      'Unlimited service + neighbourhood pages',
      '80+ local citations per month',
      '50+ keywords tracked across locations',
      'Full schema suite + rich results',
      'Ongoing competitor monitoring',
      '4× monthly content pieces',
      '10+ quality backlinks per month',
      'Digital PR for LA media coverage',
      'Weekly rank tracking',
      'Dedicated account manager',
    ],
  },
];

const KEYWORD_TYPES = [
  'SEO Company Los Angeles',
  'LA SEO Agency',
  'Local SEO Los Angeles',
  'Technical SEO LA',
  'E-commerce SEO Los Angeles',
  'Digital Marketing LA',
  'Google Business Profile LA',
  'Content Marketing Los Angeles',
  'Link Building LA',
  'SEO Audit Los Angeles',
  'Enterprise SEO LA',
  'SEO Consultant Los Angeles',
];

const TESTIMONIALS_ROW1 = [
  { initials:'RV', bg:'#0F3460', name:'Rachel Vargas', role:'Owner, Vargas Law Group, Los Angeles, CA', text:'"We went from page 4 to the top 3 organic results for "personal injury lawyer Los Angeles" in 6 months. Case enquiries from organic search have tripled. Best investment I\'ve made in 8 years of running this firm."' },
  { initials:'JK', bg:'#1D4ED8', name:'Jason Kim', role:'CEO, KimTech Solutions, West LA', text:'"1Solutions rebuilt our entire content strategy around LA-specific keywords our competitors were ignoring. Organic traffic is up 4× in 9 months and our enterprise leads are genuinely higher quality than anything we got from PPC."' },
  { initials:'ML', bg:'#7C3AED', name:'Maria Lopez', role:'Director of Marketing, Sunset Health Group, Hollywood, CA', text:'"Three clinics across LA, all ranking in the top 3 maps pack for their neighbourhood within 5 months. The neighbourhood-specific landing pages they built for us now drive 60% of our new patient enquiries. Brilliant work."' },
  { initials:'DH', bg:'#0F766E', name:'David Harrison', role:'Founder, Harrison & Co Real Estate, Beverly Hills, CA', text:'"The competitive SEO landscape in Beverly Hills real estate is fierce. 1Solutions did a competitor gap analysis that revealed 40+ keywords we weren\'t targeting at all. We\'re now outranking agencies twice our size on core terms."' },
  { initials:'SN', bg:'#BE185D', name:'Sophie Nguyen', role:'Head of Growth, NovaBite Foods, Culver City, CA', text:'"E-commerce SEO for our Shopify store went from an afterthought to our biggest revenue channel. Organic now drives 52% of revenue, up from 11%. Their technical SEO audit alone identified issues costing us thousands in lost rankings."' },
];

const TESTIMONIALS_ROW2 = [
  { initials:'MC', bg:'#1D4ED8', name:'Marcus Chen', role:'Owner, Chen Architecture, Santa Monica, CA', text:'"The schema markup and structured data work generated rich results showing our reviews, services, and location directly in Google. Our organic CTR went up 38% without any change in position. The technical depth here is genuinely impressive."' },
  { initials:'LW', bg:'#047857', name:'Laura Walsh', role:'VP Marketing, Walsh Property Group, Pasadena, CA', text:'"We expanded our ranking footprint from just Pasadena to cover 8 LA neighbourhoods using their service-area page strategy. All 8 now rank on page 1. Lead volume has doubled without any increase in ad spend."' },
  { initials:'AR', bg:'#B45309', name:'Alex Reyes', role:'Founder, Reyes Dental Group, Long Beach, CA', text:'"Organic leads now account for 61% of new patients, up from 14% before we started. Monthly reporting is clear and shows exactly which keywords and pages are driving appointments. Well worth the investment."' },
  { initials:'TW', bg:'#0F3460', name:'Thomas Wu', role:'CMO, WuCommerce, Downtown LA', text:'"1Solutions understood the LA e-commerce market immediately. Their Shopify SEO strategy combined with LA-specific content outranking national competitors on local modifiers. Revenue from organic grew from $80k to $340k per month."' },
  { initials:'PR', bg:'#9D174D', name:'Priya Raj', role:'Marketing Director, RajCare Health, Burbank, CA', text:'"Content strategy, technical SEO, and link building all working together for the first time. We went from a Google penalty to page 1 in under a year. The team understood our healthcare compliance constraints and worked around them perfectly."' },
];

const ROW1 = [...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1];
const ROW2 = [...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2];

const FAQS = [
  { q:'How long does SEO take to show results for Los Angeles businesses?', a:'In the LA market, expect measurable ranking movement within 3 to 4 months, meaningful traffic growth by month 5 to 6, and strong ROI by month 8 to 12. Local SEO and Google Business Profile optimisation can show additional calls within 4 to 8 weeks. LA is an extremely competitive market, so timelines depend heavily on your industry, current domain authority, and the competitiveness of your target keywords — a new domain in a saturated category like LA personal injury law will take longer than an established site in a niche B2B vertical.' },
  { q:'What makes the Los Angeles SEO market so competitive?', a:'Los Angeles is the second-largest US city and one of the most diverse economies in the world — finance, entertainment, tech, healthcare, real estate, fashion, and tourism all compete intensely for organic rankings. The city also spans a huge geographic area with distinct neighbourhoods each having their own competitive landscape. Successful LA SEO requires hyper-local keyword strategies, neighbourhood-specific landing pages, and significantly more domain authority than most other US markets to reach page 1 for competitive commercial terms.' },
  { q:'Do you target specific LA neighbourhoods like Hollywood, Santa Monica, or Beverly Hills?', a:'Yes, neighbourhood-level targeting is central to effective LA SEO. We build individual geo-targeted landing pages for every neighbourhood or city within LA County that you want to rank in — for example "personal injury lawyer Santa Monica", "dentist Beverly Hills", "plumber Burbank". These neighbourhood pages dramatically expand your ranking footprint across LA without requiring paid ads in each area, and they attract the highest-intent local searches.' },
  { q:'Which industries do you serve in Los Angeles?', a:'We work across all major LA industries including legal services, healthcare and medical practices, real estate, financial services, technology and SaaS, entertainment and media, hospitality and restaurants, retail and e-commerce, home services, construction, and professional services. Each industry has different keyword dynamics in the LA market and we bring sector-specific content knowledge to every campaign rather than applying generic SEO templates.' },
  { q:'Should I run Google Ads alongside SEO in Los Angeles?', a:'Yes, particularly in the first 6 to 9 months while organic rankings build. Google Ads cover your most valuable commercial keywords immediately, ensuring you capture conversion-ready searches while your SEO foundations mature. Many LA businesses maintain a smaller PPC spend even after organic rankings are established to capture the incremental traffic above the organic fold. We advise on the right balance for your specific market competition and budget.' },
  { q:'How do you measure and report SEO ROI for LA businesses?', a:'We track keyword position changes for every target LA term, organic session growth, conversion events (form fills, calls, bookings), and where available, revenue attributed to organic search via Google Analytics 4. We use call tracking numbers for phone-based businesses to give you a clear cost-per-lead from SEO versus paid channels. Monthly reports are sent in plain English with all the metrics that matter to your business, not industry jargon.' },
  { q:'Do you work with multi-location businesses across LA County?', a:'Yes. Our Authority package is specifically designed for multi-location LA businesses — up to 3 locations with individual GBP management, neighbourhood landing pages, and citation building for each location. For larger multi-location operations (4+ locations or county-wide coverage), we offer custom enterprise plans with dedicated account management and monthly reporting across all locations.' },
];

const RELATED_TAGS = [
  { href:'/local-seo-services/',              label:'Local SEO Services',        cls:'la-rtag-blue' },
  { href:'/seo-services-company/',            label:'SEO Services Company',      cls:'la-rtag-violet' },
  { href:'/technical-seo-optimization/',     label:'Technical SEO',             cls:'la-rtag-teal' },
  { href:'/seo-services-california/',        label:'SEO Services California',   cls:'la-rtag-indigo' },
  { href:'/local-seo-packages/',              label:'Local SEO Packages',        cls:'la-rtag-amber' },
  { href:'/seo-company-austin/',             label:'SEO Company Austin',        cls:'la-rtag-green' },
  { href:'/seo-audit-services/',             label:'SEO Audit Services',        cls:'la-rtag-orange' },
  { href:'/link-building-services/',         label:'Link Building Services',    cls:'la-rtag-rose' },
  { href:'/enterprise-seo-services/',        label:'Enterprise SEO',            cls:'la-rtag-slate' },
  { href:'/content-marketing-services/',     label:'Content Marketing',         cls:'la-rtag-cyan' },
];

export default function SeoCompanyLosAngeles() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq]   = useState(0);
  const [formSt, setFormSt]     = useState('idle');
  const recaptchaLoaded         = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('la-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.la-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const contact = document.getElementById('la-contact');
    if (!contact) return;
    const rcObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !recaptchaLoaded.current) {
        const s = document.createElement('script');
        s.src = 'https://www.google.com/recaptcha/api.js?render=6LcOMz8tAAAAAFahNxnljLwh3S8-3Ex-PthvyTRs';
        s.async = true;
        document.head.appendChild(s);
        recaptchaLoaded.current = true;
        rcObs.disconnect();
      }
    }, { rootMargin: '300px' });
    rcObs.observe(contact);
    return () => rcObs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd   = new FormData(e.target);
    const name = (fd.get('la-name') || '').trim();
    const email= (fd.get('la-email') || '').trim();
    const phone= (fd.get('la-phone') || '').trim();
    const biz  = (fd.get('la-biz') || '').trim();
    const city = (fd.get('la-city') || '').trim();
    const msg  = (fd.get('la-msg') || '').trim();
    const consent = document.getElementById('la-consent')?.checked;
    if (!name || !email || !phone || !biz || !city || !msg || !consent) { setFormSt('validation'); return; }
    setFormSt('loading');
    try {
      const token = await new Promise(resolve => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwh3S8-3Ex-PthvyTRs', { action: 'contact' }).then(resolve);
        });
      });
      const cc  = fd.get('la-cc') || '';
      const res = await fetch('/api/contact', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name, email, phone:(cc?cc+' ':'')+phone, company:biz,
          message:`Business: ${biz}\nCity/Area: ${city}\n\n${msg}`,
          source:'SEO Company Los Angeles Page', consent:true, recaptchaToken:token }),
      });
      if (res.ok) { setFormSt('success'); e.target.reset(); } else { setFormSt('error'); }
    } catch { setFormSt('error'); }
  };

  const jsonLd = {
    '@context':'https://schema.org',
    '@graph':[
      { '@type':'BreadcrumbList', itemListElement:[
        { '@type':'ListItem', position:1, name:'Home',        item:'https://www.1solutions.biz/' },
        { '@type':'ListItem', position:2, name:'SEO Services', item:'https://www.1solutions.biz/seo-services-company/' },
        { '@type':'ListItem', position:3, name:'SEO Company Los Angeles', item:'https://www.1solutions.biz/seo-company-los-angeles/' },
      ]},
      { '@type':'Organization', '@id':'https://www.1solutions.biz/#organization',
        name:'1Solutions', url:'https://www.1solutions.biz',
        logo:{ '@type':'ImageObject', url:'https://www.1solutions.biz/images/1solutions-logo.png' },
        description:'Full-service SEO agency serving Los Angeles businesses with local SEO, technical SEO, content marketing, link building, and e-commerce SEO. 15+ years of experience delivering first-page Google rankings.',
        address:{ '@type':'PostalAddress', addressLocality:'New Delhi', addressCountry:'IN' },
        aggregateRating:{ '@type':'AggregateRating', ratingValue:'4.9', reviewCount:'186', bestRating:'5' },
        sameAs:['https://www.linkedin.com/company/1solutions/','https://x.com/1solutionsbiz','https://www.facebook.com/1solutionsbiz'],
      },
      { '@type':'WebPage', '@id':'https://www.1solutions.biz/seo-company-los-angeles/',
        url:'https://www.1solutions.biz/seo-company-los-angeles/',
        name:'SEO Company Los Angeles | #1 LA SEO Agency | 1Solutions',
        description:'Top-rated SEO company in Los Angeles. We help LA businesses rank on page 1 of Google with local SEO, technical SEO, content marketing, and link building. Free SEO audit for LA businesses.',
        dateModified:'2026-07-07', inLanguage:'en-US',
        breadcrumb:{ '@type':'BreadcrumbList', itemListElement:[
          { '@type':'ListItem', position:1, name:'Home', item:'https://www.1solutions.biz/' },
          { '@type':'ListItem', position:2, name:'SEO Services', item:'https://www.1solutions.biz/seo-services-company/' },
          { '@type':'ListItem', position:3, name:'SEO Company Los Angeles', item:'https://www.1solutions.biz/seo-company-los-angeles/' },
        ]},
      },
      { '@type':'ProfessionalService',
        '@id':'https://www.1solutions.biz/seo-company-los-angeles/#service',
        name:'1Solutions — SEO Company Los Angeles',
        url:'https://www.1solutions.biz/seo-company-los-angeles/',
        description:'Los Angeles SEO agency delivering local SEO, technical SEO, content marketing, link building, and e-commerce SEO for LA businesses across all industries and neighbourhoods.',
        serviceType:'Search Engine Optimisation',
        provider:{ '@type':'Organization', name:'1Solutions', url:'https://www.1solutions.biz' },
        areaServed:[
          { '@type':'City', name:'Los Angeles', sameAs:'https://www.wikidata.org/wiki/Q65' },
          { '@type':'City', name:'Santa Monica' },
          { '@type':'City', name:'Beverly Hills' },
          { '@type':'City', name:'Hollywood' },
          { '@type':'City', name:'Pasadena' },
          { '@type':'City', name:'Long Beach' },
          { '@type':'City', name:'Burbank' },
          { '@type':'City', name:'Culver City' },
          { '@type':'AdministrativeArea', name:'Los Angeles County' },
        ],
        hasOfferCatalog:{ '@type':'OfferCatalog', name:'Los Angeles SEO Services', itemListElement:[
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Local SEO Los Angeles' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Technical SEO Audit Los Angeles' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'On-Page SEO Optimization Los Angeles' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Content Marketing Los Angeles' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Link Building Los Angeles' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'E-commerce SEO Los Angeles' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Schema Markup & Rich Snippets' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Monthly SEO Reporting Los Angeles' }},
        ]},
        priceRange:'$499 - $1,499/month',
      },
      { '@type':'HowTo', name:'How Our LA SEO Process Works',
        description:'1Solutions 6-step SEO process for Los Angeles businesses — from initial market analysis to ongoing ranking growth.',
        step: PROCESS.map(s => ({ '@type':'HowToStep', name:s.title, text:s.body })),
      },
      { '@type':'FAQPage', mainEntity: FAQS.map(f => ({ '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text:f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>SEO Company Los Angeles | #1 LA SEO Agency | 1Solutions</title>
        <meta name="description" content="Top-rated SEO company in Los Angeles. 1Solutions helps LA businesses rank on page 1 of Google with local SEO, technical SEO, content marketing, and link building. Trusted by 150+ LA businesses. Free SEO audit." />
        <meta name="keywords" content="SEO company Los Angeles, LA SEO agency, SEO company in Los Angeles, local SEO Los Angeles, SEO services LA, digital marketing Los Angeles, SEO consultant LA" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/seo-company-los-angeles/" />
        <meta property="og:title" content="SEO Company Los Angeles | #1 LA SEO Agency | 1Solutions" />
        <meta property="og:description" content="Top-rated LA SEO agency. We help Los Angeles businesses rank on page 1 of Google. Local SEO, technical SEO, content marketing, and link building. Free audit." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.1solutions.biz/seo-company-los-angeles/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/og-seo-los-angeles.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SEO Company Los Angeles | 1Solutions" />
        <meta name="twitter:description" content="Top-rated SEO company in Los Angeles. Page 1 rankings for LA businesses through local SEO, technical SEO, and content marketing." />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Los Angeles" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          /* ── BASE ── */
          .la-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);background-attachment:scroll;color:#0F1F40;line-height:1.6;overflow-x:hidden;position:relative}
          .la-page *,.la-page *::before,.la-page *::after{box-sizing:border-box}

          /* ── FIXED ORBS ── */
          .la-orb1{position:fixed;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.28) 0%,rgba(139,92,246,0.10) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px)}
          .la-orb2{position:fixed;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.22) 0%,rgba(245,158,11,0.10) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px)}
          .la-orb3{position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.16) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px)}

          /* ── REVEAL ── */
          .la-reveal{opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}
          .la-visible{opacity:1;transform:translateY(0)}

          /* ── SHARED ── */
          .la-sec{padding:80px 40px;position:relative;z-index:1}
          .la-in{max-width:1280px;margin:0 auto}
          .la-white{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08)}
          .la-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block}
          .la-h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:10px}
          .la-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}

          /* ── GLASS ── */
          .la-glass{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color .22s,box-shadow .22s,transform .22s}
          .la-glass:hover{border-color:rgba(217,119,6,0.25);box-shadow:0 8px 36px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px)}
          .la-icon{width:44px;height:44px;background:linear-gradient(135deg,rgba(15,52,96,0.10),rgba(15,52,96,0.06));border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;flex-shrink:0}
          .la-icon svg{width:20px;height:20px;color:#0F3460}
          .la-card-h{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .la-card-p{font-size:13px;color:#4A6080;line-height:1.65}
          .la-nbadge{width:40px;height:40px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:800;margin-bottom:16px;box-shadow:0 4px 12px rgba(15,52,96,0.25)}

          /* ── GRIDS ── */
          .la-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .la-g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}

          .la-bc a:hover{color:#D97706}.la-bc-sep{color:#d1d5db}

          /* ── DARK SECTION ── */
          .la-dark{padding:80px 40px;background:#fff;position:relative;z-index:1}
          .la-dark-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:10px}
          .la-dark-h{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:10px}
          .la-dark-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}
          .la-res-card{background:linear-gradient(135deg,rgba(240,253,244,.90) 0%,rgba(255,255,255,1) 50%,rgba(254,252,232,.80) 100%);border:1px solid rgba(34,197,94,.18);border-radius:20px;padding:36px 24px;text-align:center;box-shadow:0 4px 24px rgba(34,197,94,.10),0 1px 0 rgba(255,255,255,.95) inset;transition:transform .22s,box-shadow .25s}
          .la-res-card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(34,197,94,.18),0 0 0 1px rgba(34,197,94,.25),0 1px 0 rgba(255,255,255,1) inset}
          .la-res-metric{font-size:clamp(2.6rem,4.5vw,3.6rem);font-weight:900;letter-spacing:-0.04em;line-height:1;margin-bottom:10px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-variant-numeric:tabular-nums}
          .la-res-label{font-size:13px;font-weight:700;color:#0F1F40;margin-bottom:6px}
          .la-res-detail{font-size:11px;color:#6b7280;line-height:1.5}

          /* ── KEYWORD PILLS ── */
          .la-pills{display:flex;flex-wrap:wrap;gap:10px}
          .la-pill{display:inline-flex;align-items:center;gap:7px;border-radius:50px;padding:8px 16px;font-size:13px;font-weight:600;box-shadow:0 2px 10px rgba(0,0,0,0.07)}
          .la-pill-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;opacity:.8}

          /* ── TESTIMONIALS ── */
          .la-testi{padding:72px 0;background:#f8fafd;overflow:hidden;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1}
          .la-testi-hd{max-width:1280px;margin:0 auto 40px;padding:0 40px;text-align:center}
          @keyframes la-marqL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          @keyframes la-marqR{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
          .la-trow{overflow:hidden;position:relative;margin-bottom:16px}
          .la-trow:last-child{margin-bottom:0}
          .la-tfade-l{position:absolute;left:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to right,#f8fafd,transparent);pointer-events:none}
          .la-tfade-r{position:absolute;right:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to left,#f8fafd,transparent);pointer-events:none}
          .la-ttrack{display:flex;gap:20px;width:max-content;padding-left:20px;animation:la-marqL 44s linear infinite;will-change:transform}
          .la-ttrack-rev{display:flex;gap:20px;width:max-content;padding-left:20px;animation:la-marqR 44s linear infinite;will-change:transform}
          .la-trow:hover .la-ttrack,.la-trow:hover .la-ttrack-rev{animation-play-state:paused}
          .la-tcard{width:400px;flex-shrink:0;background:#fff;border:1px solid rgba(15,52,96,0.08);border-radius:16px;padding:24px;box-shadow:0 2px 16px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:12px;user-select:none;transition:border-color .2s}
          .la-tcard:hover{border-color:rgba(217,119,6,0.30)}
          .la-tcard-stars{color:#F59E0B;font-size:14px}
          .la-tcard-text{font-size:14px;color:#374151;line-height:1.75;margin:0;flex-grow:1}
          .la-tcard-author{display:flex;align-items:center;gap:12px;border-top:1px solid #f3f4f6;padding-top:14px}
          .la-tcard-av{width:38px;height:38px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:12px}
          .la-tcard-name{font-weight:700;color:#111827;font-size:13px}
          .la-tcard-role{color:#9ca3af;font-size:11px;margin-top:1px}

          /* ── CONTACT ── */
          .la-contact-sec{padding:80px 40px;position:relative;z-index:1}
          .la-contact-in{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:48px}
          .la-contact-left h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.2;margin:0 0 16px;color:#0F1F40;letter-spacing:-0.5px}
          .la-contact-left p{font-size:14px;color:#4A6080;line-height:1.65;margin:0 0 24px}
          .la-trust-box{background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1.5px solid rgba(217,119,6,0.25);border-radius:16px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:14px}
          .la-trust-row{display:flex;gap:12px;align-items:flex-start}
          .la-trust-row svg{color:#D97706;flex-shrink:0;margin-top:2px}
          .la-trust-row span{font-size:13px;color:#4A6080;line-height:1.55}
          .la-cs{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:20px;border-top:1px solid rgba(15,52,96,0.10)}
          .la-cs-num{font-size:32px;font-weight:900;color:#0F3460;line-height:1;margin-bottom:4px}
          .la-cs-lbl{font-size:12px;color:#4A6080;font-weight:500;line-height:1.4}
          .la-form-box{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .la-form-box h3{font-size:20px;font-weight:700;margin:0 0 22px;color:#0F1F40;letter-spacing:-0.5px}
          .la-form{display:flex;flex-direction:column;gap:14px}
          .la-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .la-fg{display:flex;flex-direction:column;gap:5px}
          .la-fg label{font-size:12px;font-weight:600;color:#0F1F40}
          .la-fg input,.la-fg textarea,.la-fg select{padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:8px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.60);transition:border-color .2s,background .2s;width:100%}
          .la-fg input:focus,.la-fg textarea:focus,.la-fg select:focus{outline:none;border-color:#D97706;background:rgba(255,255,255,0.95);box-shadow:0 0 0 3px rgba(217,119,6,0.12)}
          .la-fg textarea{resize:vertical}
          .la-phone-wrap{display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:8px;overflow:hidden;background:rgba(255,255,255,0.60)}
          .la-phone-wrap select{padding:10px;border:none;background:transparent;font-size:12px;width:auto!important;min-width:70px;max-width:90px;color:#0F1F40;font-family:inherit;flex-shrink:0}
          .la-phone-wrap input{flex:1!important;width:auto!important;min-width:0!important;border:none!important;border-radius:0!important;padding:10px 14px!important;background:rgba(255,255,255,0.60)!important}
          .la-phone-wrap input:focus{outline:none!important;box-shadow:none!important;background:rgba(255,255,255,0.95)!important}
          .la-consent{display:flex;gap:8px;align-items:flex-start}
          .la-consent input[type="checkbox"]{margin-top:3px;width:16px;height:16px;cursor:pointer;flex-shrink:0;accent-color:#D97706}
          .la-consent label{font-size:11px;color:#4A6080;line-height:1.5;margin:0}
          .la-consent a{color:#0F3460;text-decoration:none}
          .la-submit{padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .3s;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25)}
          .la-submit:hover:not(:disabled){background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px)}
          .la-submit:disabled{opacity:.65;cursor:not-allowed}
          .la-success{text-align:center;padding:32px 0}
          .la-success-icon{width:60px;height:60px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;box-shadow:0 8px 24px rgba(15,52,96,0.25)}
          .la-success-icon svg{width:28px;height:28px;stroke:#fff;fill:none}
          .la-success h3{font-size:20px;font-weight:700;color:#0F1F40;margin:0 0 10px}
          .la-success p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}
          .la-val-err{background:rgba(220,38,38,0.06);border:1px solid rgba(220,38,38,0.20);border-radius:8px;padding:10px 14px;font-size:13px;color:#dc2626}

          /* ── FAQ ── */
          .la-faq-list{display:flex;flex-direction:column;gap:12px}
          .la-fitem{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color .2s,box-shadow .2s;position:relative}
          .la-fitem.open{border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12)}
          .la-fitem.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px}
          .la-fq{width:100%;background:none;border:none;padding:20px 22px 20px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative}
          .la-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.08);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background .2s,color .2s}
          .la-fitem.open .la-fq-badge{background:#D97706;color:#fff}
          .la-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45}
          .la-fitem.open .la-fq-text{color:#D97706}
          .la-fq-chev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .la-fitem.open .la-fq-chev{transform:rotate(180deg);color:#D97706}
          .la-fa{font-size:14px;color:#4b5563;line-height:1.8;padding:0 22px 20px 60px}

          /* ── RELATED ── */
          .la-related{background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px;position:relative;z-index:1}
          .la-related-in{max-width:1280px;margin:0 auto;text-align:center}
          .la-related-ey{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block}
          .la-related-ttl{font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#111827;margin:0 0 16px}
          .la-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px}
          .la-related-divider{border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0}
          .la-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}
          .la-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .25s}
          .la-rtag:hover{filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10)}
          .la-rtag-blue{background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8}
          .la-rtag-violet{background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9}
          .la-rtag-teal{background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E}
          .la-rtag-indigo{background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA}
          .la-rtag-amber{background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309}
          .la-rtag-green{background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D}
          .la-rtag-orange{background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C}
          .la-rtag-rose{background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C}
          .la-rtag-slate{background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155}
          .la-rtag-cyan{background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490}

          /* ── PACKAGES ── */
          .la-tog-row{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:48px}
          .la-tog-lbl{font-size:15px;font-weight:600;color:#9ca3af;transition:color .2s}
          .la-tog-lbl.on{color:#0F1F40}
          .la-tog-btn{width:50px;height:28px;background:#d1d5db;border-radius:100px;position:relative;cursor:pointer;border:none;padding:0;transition:background .25s;flex-shrink:0}
          .la-tog-btn.active{background:#D97706}
          .la-tog-knob{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .25s;box-shadow:0 1px 4px rgba(0,0,0,.18)}
          .la-tog-btn.active .la-tog-knob{transform:translateX(22px)}
          .la-save-pill{display:inline-flex;align-items:center;background:rgba(217,119,6,.12);color:#B45309;font-size:11px;font-weight:700;padding:2px 9px;border-radius:100px;margin-left:6px}
          .la-pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:stretch;padding-top:16px}
          .la-card{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;position:relative;display:flex;flex-direction:column;transition:transform .22s,box-shadow .22s,border-color .22s;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .la-card:hover{transform:translateY(-4px);border-color:rgba(217,119,6,.35);box-shadow:0 16px 48px rgba(15,52,96,.14),inset 0 1px 0 rgba(255,255,255,1)}
          .la-card-pop{background:linear-gradient(180deg,rgba(217,119,6,.08) 0%,rgba(255,255,255,.82) 50%,rgba(219,234,254,.50) 100%);border-color:rgba(217,119,6,.50);box-shadow:0 0 80px rgba(217,119,6,.16),0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.98);transform:scale(1.03)}
          .la-card-pop:hover{transform:scale(1.03) translateY(-4px)}
          .la-pop-tag{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(120deg,#D97706,#ea580c);color:#fff;font-size:11px;font-weight:700;padding:4px 14px;border-radius:999px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;display:inline-flex;align-items:center;gap:5px;box-shadow:0 4px 16px rgba(217,119,6,.45)}
          .la-plan-name{font-family:'Courier New',ui-monospace,monospace;font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#6b7280;font-weight:700;margin-bottom:10px}
          .la-plan-desc{font-size:13px;color:#4A6080;line-height:1.55;margin:0 0 22px}
          .la-price-row{display:flex;align-items:baseline;gap:4px;margin:8px 0 2px}
          .la-currency{font-size:1.4rem;font-weight:700;color:#D97706}
          .la-amount{font-size:44px;font-weight:800;letter-spacing:-.035em;color:#0F1F40;line-height:1}
          .la-per{font-size:14px;color:#9ca3af;font-weight:500;margin-left:4px}
          .la-billed{font-size:11px;color:#9ca3af;margin-bottom:4px}
          .la-save-line{font-size:11px;font-weight:700;color:#16a34a;min-height:16px;margin-bottom:22px}
          .la-card-div{height:1px;background:rgba(15,52,96,.10);margin:0 0 4px}
          .la-card-pop .la-card-div{background:rgba(217,119,6,.25)}
          .la-feat-list{list-style:none;padding:0;margin:0 0 24px;flex:1}
          .la-feat-list li{padding:9px 0;border-top:1px dashed rgba(15,52,96,.12);font-size:13px;color:#374151;line-height:1.4}
          .la-feat-list li::before{content:"✓ ";color:#22c55e;font-weight:700}
          .la-card-pop .la-feat-list li{border-top-color:rgba(217,119,6,.22)}
          .la-cta-card{display:block;width:100%;text-align:center;padding:12px;border-radius:50px;font-weight:700;font-size:.875rem;text-decoration:none;background:rgba(15,52,96,.85);color:#fff;transition:all .22s;box-shadow:0 4px 16px rgba(15,52,96,.20)}
          .la-cta-card:hover{background:rgba(15,52,96,1);transform:translateY(-1px);box-shadow:0 6px 24px rgba(15,52,96,.30)}
          .la-pkg-trust{display:flex;justify-content:center;gap:28px;flex-wrap:wrap;margin-top:32px;padding-top:32px;border-top:1px solid rgba(15,52,96,.08)}
          .la-pkg-trust span{font-size:13px;color:#6b7280;display:flex;align-items:center;gap:6px;font-weight:500}
          /* comparison table */
          .la-tbl-wrap{overflow-x:auto;border-radius:16px;border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 20px rgba(15,52,96,.08)}
          .la-tbl{width:100%;border-collapse:collapse;background:rgba(255,255,255,.75);min-width:600px}
          .la-tbl th{background:linear-gradient(135deg,#0F3460 0%,#1a3a6e 100%);color:#fff;font-size:12px;font-weight:700;padding:13px 16px;text-align:center}
          .la-tbl th:first-child{text-align:left;border-radius:12px 0 0 0}
          .la-tbl th:last-child{border-radius:0 12px 0 0}
          .la-tbl td{padding:12px 16px;font-size:12px;color:#374151;border-bottom:1px solid rgba(15,52,96,.06);text-align:center}
          .la-tbl td:first-child{text-align:left;font-weight:600;color:#0F1F40}
          .la-tbl tr:last-child td{border-bottom:none}
          .la-tbl tr:hover td{background:rgba(217,119,6,.03)}
          .la-tbl-y{color:#D97706;font-weight:700}
          .la-tbl-n{color:#d1d5db}

          /* ── RESPONSIVE ── */
          @media(max-width:1024px){
            .la-g3{grid-template-columns:repeat(2,1fr)}
            .la-g4{grid-template-columns:repeat(2,1fr)}
            .la-contact-in{grid-template-columns:1fr}
            .la-pkg-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}
            .la-card-pop{transform:none}.la-card-pop:hover{transform:translateY(-4px)}
          }
          @media(max-width:768px){
            .la-sec,.la-dark,.la-contact-sec,.la-related,.la-testi{padding-left:24px;padding-right:24px}
            .la-testi-hd{padding:0 24px}
            .la-g3{grid-template-columns:1fr}
            .la-g4{grid-template-columns:repeat(2,1fr)}
            .la-row2{grid-template-columns:1fr}
            .la-tcard{width:300px}
            .la-related-ttl{font-size:28px}
            /* ── MOBILE PERFORMANCE ── */
            .la-orb1,.la-orb2,.la-orb3{display:none}
            .la-glass,.la-form-box,.la-trust-box,.la-fitem{backdrop-filter:none;-webkit-backdrop-filter:none}
            .la-submit{backdrop-filter:none;-webkit-backdrop-filter:none}
            .la-res-card,.la-pill{backdrop-filter:none;-webkit-backdrop-filter:none}
            .la-related{backdrop-filter:none;-webkit-backdrop-filter:none}
            .la-card{backdrop-filter:none;-webkit-backdrop-filter:none}
            .la-trow:last-child{display:none}
          }
          @media(max-width:480px){
            .la-tcard{width:270px;padding:18px}
            .la-related-ttl{font-size:24px}
            .la-g4{grid-template-columns:1fr 1fr}
          }
        
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>

      <div className="la-page">
        <div className="la-orb1"/><div className="la-orb2"/><div className="la-orb3"/>

        {/* ── HERO ── */}
        <ServiceHero
          eyebrow="SEO Company Los Angeles · LA SEO Agency · Local SEO · Technical SEO"
          title={<>The SEO Company Los Angeles Businesses Choose to <AuroraText>Own Page 1</AuroraText></>}
          subtext="1Solutions is a specialist LA SEO agency with 15+ years ranking businesses across Los Angeles — from Hollywood and Beverly Hills to Santa Monica and Long Beach. We deliver local SEO, technical SEO, and content strategies built specifically for the competitive LA market, with transparent reporting and no lock-in contracts."
          primaryCta={{ label: 'Get Your Free LA SEO Audit', href: '#la-contact' }}
          secondaryCta={{ label: 'View Packages', href: '#packages' }}
          stats={[
            { label: 'LA consumers search online before buying locally', value: '93', suffix: '%' },
            { label: 'Monthly searches in Greater Los Angeles', value: '18', suffix: 'M+' },
            { label: 'Clicks go to the top 3 organic results', value: '67', suffix: '%' },
            { label: 'Average ROI from organic SEO vs paid ads', value: '5', suffix: '×' },
          ]}
        />

        {/* ── KEYWORD TYPES ── */}
        <section className="la-sec la-white">
          <div className="la-in">
            <div className="la-reveal">
              <span className="la-ey">Keywords We Rank You For</span>
              <h2 className="la-h2">Every LA Search Intent: <AuroraText>Local to Enterprise</AuroraText></h2>
              <p className="la-lead">From neighbourhood-level local searches to competitive citywide commercial terms, we build dedicated strategies for every search intent across the Los Angeles market.</p>
            </div>
            <div className="la-pills la-reveal">
              {KEYWORD_TYPES.map((k, i) => {
                const palette = [
                  {bg:'rgba(239,68,68,.10)',border:'rgba(239,68,68,.35)',color:'#991b1b',dot:'#ef4444'},
                  {bg:'rgba(217,119,6,.10)',border:'rgba(217,119,6,.35)',color:'#92400e',dot:'#D97706'},
                  {bg:'rgba(34,197,94,.10)',border:'rgba(34,197,94,.35)',color:'#14532d',dot:'#16a34a'},
                  {bg:'rgba(59,130,246,.10)',border:'rgba(59,130,246,.35)',color:'#1e3a8a',dot:'#3b82f6'},
                  {bg:'rgba(124,58,237,.10)',border:'rgba(124,58,237,.35)',color:'#4c1d95',dot:'#7c3aed'},
                  {bg:'rgba(20,184,166,.10)',border:'rgba(20,184,166,.35)',color:'#134e4a',dot:'#14b8a6'},
                ];
                const c = palette[i % palette.length];
                return (
                  <span key={k} className="la-pill" style={{transitionDelay:`${i*40}ms`,background:c.bg,border:`1px solid ${c.border}`,color:c.color}}>
                    <span className="la-pill-dot" style={{background:c.dot}}/>
                    {k}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="la-sec" id="services">
          <div className="la-in">
            <div className="la-reveal">
              <span className="la-ey">What We Do</span>
              <h2 className="la-h2">Full-Spectrum <AuroraText>Los Angeles SEO Services</AuroraText></h2>
              <p className="la-lead">Every SEO component your LA business needs to dominate Google — from technical foundations and local pack rankings to content marketing and authority link building.</p>
            </div>
            <div className="la-g3">
              {SERVICES.map((s, i) => (
                <div key={s.title} className="la-glass la-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="la-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon}/>
                    </svg>
                  </div>
                  <div className="la-card-h">{s.title}</div>
                  <div className="la-card-p">{s.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className="la-dark">
          <div className="la-in">
            <div className="la-reveal" style={{textAlign:'center',marginBottom:48}}>
              <span className="la-dark-ey">Proven Results</span>
              <h2 className="la-dark-h"><AuroraText>Real Results from LA SEO Campaigns</AuroraText></h2>
              <p className="la-dark-lead" style={{margin:'0 auto'}}>Real metrics from real Los Angeles businesses across legal, healthcare, retail, real estate, and technology.</p>
            </div>
            <div className="la-g4 la-reveal">
              {RESULTS.map(r => (
                <StatCard key={r.label} {...r}/>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="la-sec la-white" id="process">
          <div className="la-in">
            <div className="la-reveal">
              <span className="la-ey">How It Works</span>
              <h2 className="la-h2">Our <AuroraText>6-Step LA SEO Process</AuroraText></h2>
              <p className="la-lead">A structured, repeatable roadmap from initial LA market analysis to ongoing ranking growth — built for the competitive realities of the Los Angeles search landscape.</p>
            </div>
            <div className="la-g3">
              {PROCESS.map((p, i) => (
                <div key={p.n} className="la-glass la-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="la-nbadge">{p.n}</div>
                  <div className="la-card-h">{p.title}</div>
                  <div className="la-card-p">{p.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="la-sec" id="why-us">
          <div className="la-in">
            <div className="la-reveal">
              <span className="la-ey">Why 1Solutions</span>
              <h2 className="la-h2">The LA SEO Agency <AuroraText>Built for First-Page Results</AuroraText></h2>
              <p className="la-lead">We understand the unique competitive dynamics of Los Angeles search — the neighbourhoods, the industries, the buyer behaviour — and we build every strategy around putting your business at the top.</p>
            </div>
            <div className="la-g3">
              {WHY.map((w, i) => (
                <div key={w.title} className="la-glass la-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="la-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  </div>
                  <div className="la-card-h">{w.title}</div>
                  <div className="la-card-p">{w.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section className="la-sec la-white" id="packages">
          <div className="la-in">
            <div className="la-reveal" style={{textAlign:'center'}}>
              <span className="la-ey">LA SEO Packages</span>
              <h2 className="la-h2">Simple, Transparent <AuroraText>LA SEO Pricing</AuroraText></h2>
              <p className="la-lead" style={{margin:'0 auto 44px'}}>No setup fee. No lock-in contracts. Cancel any month. All packages include a kick-off call, onboarding, and a free LA SEO audit.</p>
              <div className="la-tog-row">
                <span className={`la-tog-lbl${!isYearly ? ' on' : ''}`}>Monthly</span>
                <button
                  className={`la-tog-btn${isYearly ? ' active' : ''}`}
                  onClick={() => setIsYearly(v => !v)}
                  aria-label="Toggle billing period"
                >
                  <span className="la-tog-knob"/>
                </button>
                <span className={`la-tog-lbl${isYearly ? ' on' : ''}`}>
                  Yearly <span className="la-save-pill">Save 17%</span>
                </span>
              </div>
            </div>
            <div className="la-pkg-grid la-reveal">
              {PACKAGES.map(pkg => (
                <div key={pkg.slug} className={`la-card${pkg.popular ? ' la-card-pop' : ''}`}>
                  {pkg.popular && <span className="la-pop-tag">✦ Most Popular</span>}
                  <div className="la-plan-name">{pkg.name}</div>
                  <div className="la-price-row">
                    <span className="la-currency">$</span>
                    <span className="la-amount">{isYearly ? pkg.yearlyPrice : pkg.monthlyPrice}</span>
                    <span className="la-per">/mo</span>
                  </div>
                  <div className="la-billed">{isYearly ? 'Billed annually' : 'Billed monthly'}</div>
                  <div className="la-save-line">{isYearly ? `Save $${pkg.yearlySave.toLocaleString()} per year` : ' '}</div>
                  <p className="la-plan-desc">{pkg.desc}</p>
                  <a href="#la-contact" className="la-cta-card">Get Started →</a>
                  <div className="la-card-div"/>
                  <ul className="la-feat-list">
                    {pkg.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="la-pkg-trust la-reveal">
              {['No setup fee','Cancel with 30 days notice','Custom plans for 4+ locations','Free kick-off LA SEO audit'].map(t => (
                <span key={t}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="la-sec" id="compare">
          <div className="la-in">
            <div className="la-reveal">
              <span className="la-ey">Feature Breakdown</span>
              <h2 className="la-h2"><AuroraText>Package Comparison</AuroraText> at a Glance</h2>
              <p className="la-lead">See exactly what is included at each tier before choosing your Los Angeles SEO plan.</p>
              <div className="la-tbl-wrap">
                <table className="la-tbl">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Starter · $499/mo</th>
                      <th>Growth · $899/mo</th>
                      <th>Authority · $1,499/mo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['LA locations covered','1','1–2','Up to 3'],
                      ['GBP optimisation + posts','4 posts/mo','8 posts/mo','12 per location'],
                      ['Service + neighbourhood pages','5 pages','Up to 12','Unlimited'],
                      ['Local citations per month','20','40','80+'],
                      ['Target keywords tracked','10','25','50+'],
                      ['Technical SEO audit & fixes','One-time','Quarterly','Monthly'],
                      ['Content pieces per month','✗','2','4'],
                      ['Link building','✗','5/month','10+/month'],
                      ['Competitor gap analysis','✗','✓','✓'],
                      ['Schema markup','Basic','Full suite','Full suite + rich results'],
                      ['Digital PR for LA media','✗','✗','✓'],
                      ['Dedicated account manager','✗','✗','✓'],
                      ['Reporting','Monthly','Monthly + calls','Weekly tracking'],
                    ].map(([feat, ...cols]) => (
                      <tr key={feat}>
                        <td>{feat}</td>
                        {cols.map((v, i) => (
                          <td key={i} className={v === '✗' ? 'la-tbl-n' : 'la-tbl-y'}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="la-testi">
          <div className="la-testi-hd la-reveal">
            <span className="la-ey">Client Reviews</span>
            <h2 className="la-h2">What Our <AuroraText>Los Angeles SEO Clients</AuroraText> Say</h2>
            <p style={{fontSize:15,color:'#4A6080',lineHeight:1.7,maxWidth:600,margin:'0 auto'}}>Trusted by businesses across Los Angeles — from law firms and healthcare groups to retail brands and tech companies.</p>
          </div>
          <div style={{marginTop:40}}>
            <div className="la-trow">
              <div className="la-tfade-l"/><div className="la-tfade-r"/>
              <div className="la-ttrack">
                {ROW1.map((t, i) => (
                  <div key={i} className="la-tcard">
                    <div className="la-tcard-stars">★★★★★</div>
                    <p className="la-tcard-text">{t.text}</p>
                    <div className="la-tcard-author">
                      <div className="la-tcard-av" style={{background:t.bg}}>{t.initials}</div>
                      <div>
                        <div className="la-tcard-name">{t.name}</div>
                        <div className="la-tcard-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="la-trow">
              <div className="la-tfade-l"/><div className="la-tfade-r"/>
              <div className="la-ttrack-rev">
                {ROW2.map((t, i) => (
                  <div key={i} className="la-tcard">
                    <div className="la-tcard-stars">★★★★★</div>
                    <p className="la-tcard-text">{t.text}</p>
                    <div className="la-tcard-author">
                      <div className="la-tcard-av" style={{background:t.bg}}>{t.initials}</div>
                      <div>
                        <div className="la-tcard-name">{t.name}</div>
                        <div className="la-tcard-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section className="la-contact-sec" id="la-contact">
          <div className="la-contact-in">
            <div className="la-reveal">
              <span className="la-ey">Free LA SEO Audit</span>
              <div className="la-contact-left">
                <h2>Get Your Free <AuroraText>Los Angeles SEO Audit</AuroraText></h2>
                <p>We will audit your website, Google Business Profile, and backlink profile — identify every gap between you and your Los Angeles competitors, and deliver a prioritised action plan completely free with no obligation.</p>
              </div>
              <div className="la-trust-box">
                {[
                  'Reviewed by a senior LA SEO specialist, not a junior account manager',
                  'Covers your website, GBP, citations, and top LA competitor benchmarks',
                  'Delivered within 48 hours of your request',
                  'No hard sell — honest expert advice on your actual gaps',
                ].map(b => (
                  <div key={b} className="la-trust-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{b}</span>
                  </div>
                ))}
                <div className="la-cs">
                  {[['150+','LA Clients Served'],['15+','Years SEO Experience'],['94%','Client Retention']].map(([n,l]) => (
                    <div key={l}><div className="la-cs-num">{n}</div><div className="la-cs-lbl">{l}</div></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="la-form-box la-reveal">
              <h3>Request Your Free LA Audit</h3>
              {formSt === 'success' ? (
                <div className="la-success">
                  <div className="la-success-icon">
                    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>A Los Angeles SEO specialist will review your website and GBP and be in touch within 48 hours.</p>
                </div>
              ) : (
                <form className="la-form" onSubmit={handleSubmit} noValidate>
                  {formSt === 'validation' && <p className="la-val-err">Please complete all fields and accept the terms before submitting.</p>}
                  {formSt === 'error'      && <p className="la-val-err">Something went wrong. Please try again or email us directly.</p>}
                  <div className="la-row2">
                    <div className="la-fg">
                      <label htmlFor="la-name">Full Name *</label>
                      <input id="la-name" name="la-name" type="text" placeholder="Jane Smith" required/>
                    </div>
                    <div className="la-fg">
                      <label htmlFor="la-email">Business Email *</label>
                      <input id="la-email" name="la-email" type="email" placeholder="jane@yourbusiness.com" required/>
                    </div>
                  </div>
                  <div className="la-row2">
                    <div className="la-fg">
                      <label>Phone Number *</label>
                      <div className="la-phone-wrap">
                        <select name="la-cc" aria-label="Country code">
                          <option value="+1">+1 US</option>
                          <option value="+1">+1 CA</option>
                          <option value="+61">+61 AU</option>
                          <option value="+44">+44 GB</option>
                          <option value="+91">+91 IN</option>
                        </select>
                        <input name="la-phone" type="tel" placeholder="Phone number" required aria-label="Phone number"/>
                      </div>
                    </div>
                    <div className="la-fg">
                      <label htmlFor="la-biz">Business Name *</label>
                      <input id="la-biz" name="la-biz" type="text" placeholder="Your LA Business Name" required/>
                    </div>
                  </div>
                  <div className="la-fg">
                    <label htmlFor="la-city">City / LA Neighbourhood *</label>
                    <input id="la-city" name="la-city" type="text" placeholder="e.g. Hollywood, Santa Monica, Pasadena" required/>
                  </div>
                  <div className="la-fg">
                    <label htmlFor="la-msg">Tell Us About Your SEO Goals *</label>
                    <textarea id="la-msg" name="la-msg" rows={4} placeholder="Current rankings, main LA competitors, services or products you want to rank for, monthly lead or revenue target..." required/>
                  </div>
                  <div className="la-consent">
                    <input type="checkbox" id="la-consent"/>
                    <label htmlFor="la-consent">
                      I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions storing my data to respond to this enquiry. *
                    </label>
                  </div>
                  <button type="submit" className="la-submit" disabled={formSt === 'loading'}>
                    {formSt === 'loading' ? 'Sending...' : 'Send My Free LA SEO Audit Request →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="la-sec la-white" id="faq">
          <div className="la-in" style={{maxWidth:860,margin:'0 auto'}}>
            <div className="la-reveal" style={{textAlign:'center',marginBottom:40}}>
              <span className="la-ey">Got Questions?</span>
              <h2 className="la-h2"><AuroraText>Los Angeles SEO</AuroraText> FAQs</h2>
              <p className="la-lead" style={{margin:'0 auto'}}>Everything you need to know before starting an SEO campaign for your Los Angeles business.</p>
            </div>
            <div className="la-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={'la-fitem' + (openFaq === i ? ' open' : '')}>
                  <button className="la-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="la-fq-badge">{String(i+1).padStart(2,'0')}</span>
                    <span className="la-fq-text">{f.q}</span>
                    <svg className="la-fq-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFaq === i && <div className="la-fa">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="la-related">
          <div className="la-related-in la-reveal">
            <span className="la-related-ey">EXPLORE RELATED SERVICES</span>
            <h2 className="la-related-ttl">Related <AuroraText>SEO & Digital Marketing</AuroraText> Services</h2>
            <p className="la-related-sub">Pair Los Angeles SEO with complementary services to dominate search across every channel your LA customers use.</p>
            <hr className="la-related-divider"/>
            <div className="la-related-tags">
              {RELATED_TAGS.map(({href, label, cls}) => (
                <Link key={href} href={href} className={`la-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

export function getStaticProps() {
  return { props: {} };
}
