import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';

const STATS_HERO = [
  { val: '92%',  label: 'NYC consumers research online before visiting a local business' },
  { val: '35M+', label: 'Monthly local searches across Greater New York' },
  { val: '#1',   label: 'Most competitive local SEO market in the United States' },
  { val: '6×',   label: 'Average ROI from organic SEO vs paid ads in NYC' },
];

const SERVICES = [
  { icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title:'Local SEO New York', body:'Dominate the Google Maps Pack and local 3-pack for every high-intent neighbourhood search across the five boroughs — Manhattan, Brooklyn, Queens, the Bronx, and Staten Island — plus Long Island and the greater tri-state area. GBP optimisation, citation building, and geo-targeted landing pages included.' },
  { icon:'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title:'Technical SEO Audits', body:'Full crawl-level audits fixing Core Web Vitals, page speed, mobile usability, structured data errors, duplicate content, and site architecture — the technical foundation every NYC business needs before keyword rankings can compound in America\'s most competitive search market.' },
  { icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'On-Page SEO Optimization', body:'Title tags, meta descriptions, H1–H3 structure, internal linking architecture, and content optimisation across every priority page — written for New York buyers and tuned for Google ranking signals in one of the most competitive search markets on the planet.' },
  { icon:'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title:'Content Marketing for NYC', body:'SEO-driven blog articles, service pages, and neighbourhood landing pages built around what New Yorkers search for — content that earns first-page rankings across Manhattan, Brooklyn, Queens and the tri-state area and converts that traffic into calls, appointments, and sales.' },
  { icon:'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title:'Link Building & Digital PR', body:'High-authority backlinks from NY media (New York Times, NY Post, Crain\'s New York, Gothamist), New York business directories, and industry-specific publications. Genuine digital PR that builds domain authority and holds rankings through every algorithm update.' },
  { icon:'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title:'E-commerce SEO New York', body:'Product page, category, and site architecture optimisation for NYC-based online stores on Shopify, WooCommerce, Magento, and BigCommerce — more organic visibility and lower customer acquisition cost across the most lucrative e-commerce market in North America.' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Schema Markup & Rich Snippets', body:'LocalBusiness, Organization, Product, Review, FAQPage, and HowTo schema implementation — giving Google the structured data it needs to feature your New York business in rich results, knowledge panels, and People Also Ask boxes for maximum SERP real estate.' },
  { icon:'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z', title:'Monthly Reporting & Analytics', body:'Clear monthly reports showing keyword ranking movement across all target NYC terms, organic traffic growth, lead attribution, conversion rates, and revenue tied to organic search — so you know exactly what your New York SEO investment is returning every single month.' },
];

const RESULTS = [
  { prefix:'',  target:4.8, suffix:'×', decimals:1, label:'Organic traffic growth',               detail:'NYC law firm — 9-month campaign' },
  { prefix:'',  target:340, suffix:'%', decimals:0, label:'Increase in qualified organic leads',   detail:'Manhattan healthcare group — 11 months' },
  { prefix:'#', target:1,   suffix:'',  decimals:0, label:'Rank for 80+ target NYC keywords',      detail:'Brooklyn e-commerce brand — 8 months' },
  { prefix:'',  target:68,  suffix:'d', decimals:0, label:'To page 1 for primary service keywords', detail:'Queens service business, new domain' },
];

const PROCESS = [
  { n:'01', title:'NYC Market & Competitor Analysis', body:'We start with a full audit of your website, Google Business Profile, and the competitive landscape specific to your borough, neighbourhood, and industry vertical — identifying every technical gap, keyword opportunity, and competitor weakness before writing a single line of content.' },
  { n:'02', title:'NYC Keyword Strategy', body:'We map every high-intent search query your New York customers use — borough and neighbourhood modifiers (Midtown, Williamsburg, Astoria, Flushing), service intent (buy now vs research), and industry-specific long-tail — then assign each cluster to the right page type for maximum ranking efficiency.' },
  { n:'03', title:'Technical SEO Foundation', body:'Core Web Vitals, mobile performance, crawl architecture, internal linking, and structured data all locked down in the first 30 days — because no amount of content or links will overcome a slow, technically broken website in New York\'s hyper-competitive search landscape.' },
  { n:'04', title:'On-Page & Content Optimisation', body:'Every priority page rewritten and re-structured for its target keyword cluster. New service pages, neighbourhood landing pages for every NYC borough, and a content calendar targeting the top-of-funnel queries your ideal New York customers search before they are ready to buy.' },
  { n:'05', title:'Authority Building for NYC', body:'Quality backlinks from New York authority publications, borough-specific business directories, local chambers of commerce, and strategic digital PR campaigns — compounding domain authority that holds your rankings through every Google algorithm update.' },
  { n:'06', title:'Monthly Reporting & Growth', body:'Clear monthly reports with keyword position changes, organic session growth, and lead attribution, plus a rolling 90-day action plan. You always know what we are doing, what moved, and what is next — with a dedicated account manager you can actually reach when you need them.' },
];

const WHY = [
  { icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title:'Deep New York Market Knowledge', body:'We understand the hyper-local nature of NYC search — the difference between ranking in Midtown Manhattan vs Williamsburg vs Flushing vs Forest Hills. Our NYC SEO strategies reflect the city\'s extraordinary diversity, five-borough geography, and unmatched competitive intensity.' },
  { icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title:'15+ Years of SEO Experience', body:'Founded in 2009 and still active through every major Google update — Panda, Penguin, BERT, Helpful Content, and the AI Overviews rollout. We adapt strategy before algorithm changes hit rankings, and our NYC clients maintain page 1 positions through every shift.' },
  { icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'White-Hat Techniques Only', body:'No black-hat link schemes, no keyword stuffing, no shortcuts that put your domain at risk. We build New York rankings through technical excellence, quality content, and genuine authority — methods that outlast algorithm updates and compound over time without penalty risk.' },
  { icon:'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', title:'Dedicated Account Manager', body:'Every NYC client has one point of contact who understands your business, calls you monthly, and is reachable when you need answers. No rotating teams, no offshore handoffs, no junior account managers learning on your budget in the world\'s most demanding business environment.' },
  { icon:'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z', title:'No Lock-In Contracts', body:'Month-to-month engagements only. We earn your continued business every month through rankings, traffic, and leads — not through contractual obligations that keep you paying regardless of performance. In NYC, results speak for themselves.' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Transparent Monthly Reporting', body:'You see exactly what we did, what moved, and what it generated — keyword rankings, organic sessions, and lead attribution in a clear monthly report. No vanity metrics, no smoke and mirrors, just numbers tied directly to your New York business revenue.' },
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
    <div ref={ref} className="ny-res-card">
      <div className="ny-res-metric">{prefix}{display}{suffix}</div>
      <div className="ny-res-label">{label}</div>
      <div className="ny-res-detail">{detail}</div>
    </div>
  );
}

const PACKAGES = [
  {
    name: 'Starter', slug: 'starter', monthlyPrice: 599, yearlyPrice: 499, yearlySave: 1200,
    desc: 'For single-location NYC businesses starting SEO or trying to break onto page 1 in their borough.',
    popular: false,
    features: [
      '1 borough / neighbourhood focus',
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
    name: 'Growth', slug: 'growth', monthlyPrice: 999, yearlyPrice: 832, yearlySave: 2004,
    desc: 'For established NYC businesses ready to dominate their category across multiple boroughs.',
    popular: true,
    features: [
      '1–2 locations / boroughs',
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
    name: 'Authority', slug: 'authority', monthlyPrice: 1799, yearlyPrice: 1499, yearlySave: 3600,
    desc: 'For multi-borough NYC businesses or highly competitive categories like law, finance, and healthcare.',
    popular: false,
    features: [
      'Up to 3 locations across all 5 boroughs',
      'Full GBP management all locations',
      'Unlimited service + neighbourhood pages',
      '80+ local citations per month',
      '50+ keywords tracked across boroughs',
      'Full schema suite + rich results',
      'Ongoing competitor monitoring',
      '4× monthly content pieces',
      '10+ quality backlinks per month',
      'Digital PR for NYC media coverage',
      'Weekly rank tracking',
      'Dedicated account manager',
    ],
  },
];

const KEYWORD_TYPES = [
  'SEO Services New York',
  'NYC SEO Agency',
  'SEO Company New York City',
  'Local SEO Manhattan',
  'Brooklyn SEO Services',
  'Queens SEO Company',
  'Technical SEO NYC',
  'E-commerce SEO New York',
  'Google Business Profile NYC',
  'Content Marketing New York',
  'Link Building NYC',
  'Enterprise SEO New York',
];

const TESTIMONIALS_ROW1 = [
  { initials:'MB', bg:'#0F3460', name:'Marcus Bernstein', role:'Partner, Bernstein & Cole Law, Midtown Manhattan', text:'"We went from page 4 to top 3 organic results for "personal injury lawyer Manhattan" in under 7 months. Case enquiries from organic search have quadrupled. The NYC market is brutally competitive and 1Solutions delivered where two previous agencies failed."' },
  { initials:'JL', bg:'#1D4ED8', name:'Jennifer Lin', role:'CEO, LinTech Ventures, Brooklyn, NY', text:'"1Solutions rebuilt our entire content strategy around NYC-specific keywords our competitors were sleeping on. Organic traffic is up 4.8× in 10 months and our enterprise leads from New York clients are genuinely higher quality than anything we generated from PPC."' },
  { initials:'DR', bg:'#7C3AED', name:'Daniel Rodriguez', role:'Director of Marketing, Rivera Health Group, Queens, NY', text:'"Three clinics across Queens, all ranking in the top 3 maps pack for their neighbourhood within 5 months. The borough-specific landing pages now drive 65% of our new patient enquiries from Astoria, Jackson Heights, and Forest Hills. Exceptional results."' },
  { initials:'SG', bg:'#0F766E', name:'Sarah Goldman', role:'Founder, Goldman Real Estate Group, Upper East Side, NY', text:'"The competitive SEO landscape in Manhattan real estate is unlike anything else. 1Solutions did a competitor gap analysis revealing 50+ keywords we were completely missing. We now outrank agencies 10× our size on our core neighbourhood terms."' },
  { initials:'KP', bg:'#BE185D', name:'Kevin Park', role:'Head of Growth, ParkBite Foods, Williamsburg, NY', text:'"E-commerce SEO for our Shopify store went from an afterthought to our biggest revenue channel. Organic now drives 58% of New York revenue, up from 9%. Their technical SEO audit found crawl issues that had been hurting our rankings for over a year."' },
];

const TESTIMONIALS_ROW2 = [
  { initials:'AC', bg:'#1D4ED8', name:'Amanda Chen', role:'Owner, Chen Architecture, SoHo, Manhattan', text:'"The schema markup and structured data work generated rich results showing our reviews and services directly in Google. Our organic CTR jumped 42% without any change in position. The technical depth 1Solutions brings to NYC projects is genuinely impressive."' },
  { initials:'BW', bg:'#047857', name:'Brian Walsh', role:'VP Marketing, Walsh Property Group, Long Island City, NY', text:'"We expanded our ranking footprint from just LIC to cover 9 NYC neighbourhoods using their service-area page strategy. All 9 now rank on page 1. Lead volume has tripled without any increase in ad spend. Best ROI decision I\'ve made in marketing."' },
  { initials:'NR', bg:'#B45309', name:'Nicole Rivera', role:'Founder, Rivera Dental Group, the Bronx, NY', text:'"Organic leads now account for 67% of new patients, up from 12% before we started. Monthly reporting is crystal clear and shows exactly which keywords and pages are driving appointments. Well worth every dollar of the investment in our competitive NYC borough market."' },
  { initials:'TK', bg:'#0F3460', name:'Thomas Kim', role:'CMO, KimCommerce, Downtown Manhattan', text:'"1Solutions understood the NYC e-commerce market immediately. Their Shopify SEO strategy combined with borough-specific content now outranks national competitors on NYC local modifiers. Revenue from organic grew from $95k to $410k per month in under a year."' },
  { initials:'PS', bg:'#9D174D', name:'Priya Shah', role:'Marketing Director, ShahCare Health, Staten Island, NY', text:'"Content strategy, technical SEO, and link building all working together for the first time in our Staten Island practice. We went from page 5 to page 1 in 8 months. The team understood our healthcare compliance constraints and delivered results within every boundary."' },
];

const ROW1 = [...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1];
const ROW2 = [...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2];

const FAQS = [
  { q:'How long does SEO take to show results for New York businesses?', a:'In the NYC market — the most competitive local SEO environment in the US — expect measurable ranking movement within 3 to 5 months, meaningful traffic growth by month 6 to 7, and strong ROI by month 9 to 14. Local SEO and Google Business Profile optimisation can show additional calls and visits within 6 to 10 weeks. Timelines depend on your industry, current domain authority, and the competitiveness of your target keywords — a new domain in saturated categories like Manhattan personal injury law or financial advisory will take longer than an established site in a niche B2B vertical.' },
  { q:'What makes the New York City SEO market so uniquely competitive?', a:'New York City is the largest US metropolitan area and the financial, media, legal, and cultural capital of the world. The concentration of businesses competing for the same search terms is unprecedented — a "plumber Manhattan" search is contested by hundreds of providers, each investing in SEO. The five-borough geography and the sheer density of the population also create a complex local search environment where borough-level and neighbourhood-level targeting strategies matter enormously. Effective NYC SEO demands more technical sophistication, more content depth, more authoritative backlinks, and more borough-specific targeting than virtually any other US market.' },
  { q:'Do you target specific NYC boroughs and neighbourhoods like Midtown, Williamsburg, or Flushing?', a:'Yes, borough and neighbourhood-level targeting is the cornerstone of effective NYC local SEO. We build individual geo-targeted landing pages for every neighbourhood, borough, or area within Greater New York that your business wants to rank in — for example "divorce lawyer Midtown Manhattan", "dentist Williamsburg Brooklyn", "plumber Flushing Queens". These neighbourhood pages dramatically expand your organic ranking footprint across the city without requiring paid ads in each area, and they capture the highest-intent local searches at the moment people are ready to act.' },
  { q:'Which NYC industries do you serve?', a:'We work across all major New York City industries including legal services (personal injury, family law, immigration, corporate), healthcare and medical practices, financial services and wealth management, real estate (residential and commercial), technology and SaaS, media and entertainment, hospitality and restaurants, retail and e-commerce, professional services, construction, and home services. Each NYC industry has distinct keyword dynamics and buyer behaviour, and we bring sector-specific content knowledge to every campaign rather than applying generic templates.' },
  { q:'Should I run Google Ads alongside SEO in New York?', a:"Yes, particularly in the first 9 to 12 months while organic rankings build in NYC's intensely competitive environment. Google Ads cover your most valuable commercial keywords immediately, ensuring you capture high-intent searches while your SEO foundations mature. Many NYC businesses maintain a targeted PPC spend even after organic rankings are established to capture incremental traffic above the organic fold in the most competitive keyword categories. We advise on the right balance for your specific NYC market, competition level, and budget." },
  { q:'How do you measure and report SEO ROI for NYC businesses?', a:'We track keyword position changes for every target New York term, organic session growth, conversion events (form fills, calls, bookings), and where available, revenue attributed to organic search via Google Analytics 4. We use call tracking numbers for phone-based businesses to give you a clear cost-per-lead from SEO versus paid channels. Monthly reports are written in plain English with all the metrics that matter to your New York business — not industry jargon — so you can tie every SEO dollar to real business outcomes.' },
  { q:'Do you work with multi-location businesses across the five boroughs?', a:'Yes. Our Authority package is specifically designed for multi-location NYC businesses — up to 3 locations with individual GBP management, borough and neighbourhood landing pages, and citation building for each location. For larger multi-borough or tri-state operations (4+ locations across NYC, Long Island, and New Jersey), we offer custom enterprise plans with dedicated account management, cross-location reporting, and coordinated content strategies that cover the full Greater New York market.' },
];

const RELATED_TAGS = [
  { href:'/local-seo-services/',               label:'Local SEO Services',           cls:'ny-rtag-blue' },
  { href:'/seo-services-company/',             label:'SEO Services Company',         cls:'ny-rtag-violet' },
  { href:'/technical-seo-optimization/',       label:'Technical SEO',                cls:'ny-rtag-teal' },
  { href:'/enterprise-seo-services/',          label:'Enterprise SEO',               cls:'ny-rtag-indigo' },
  { href:'/local-seo-packages/',               label:'Local SEO Packages',           cls:'ny-rtag-amber' },
  { href:'/seo-company-los-angeles/',          label:'SEO Company Los Angeles',      cls:'ny-rtag-green' },
  { href:'/seo-audit-services/',               label:'SEO Audit Services',           cls:'ny-rtag-orange' },
  { href:'/link-building-services/',           label:'Link Building Services',       cls:'ny-rtag-rose' },
  { href:'/seo-services-california/',          label:'SEO Services California',      cls:'ny-rtag-slate' },
  { href:'/content-marketing-services/',       label:'Content Marketing',            cls:'ny-rtag-cyan' },
];

export default function SeoServicesNewYork() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq]   = useState(0);
  const [formSt, setFormSt]     = useState('idle');
  const recaptchaLoaded         = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('ny-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.ny-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const contact = document.getElementById('ny-contact');
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
    const name = (fd.get('ny-name') || '').trim();
    const email= (fd.get('ny-email') || '').trim();
    const phone= (fd.get('ny-phone') || '').trim();
    const biz  = (fd.get('ny-biz') || '').trim();
    const boro = (fd.get('ny-boro') || '').trim();
    const msg  = (fd.get('ny-msg') || '').trim();
    const consent = document.getElementById('ny-consent')?.checked;
    if (!name || !email || !phone || !biz || !boro || !msg || !consent) { setFormSt('validation'); return; }
    setFormSt('loading');
    try {
      const token = await new Promise(resolve => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwh3S8-3Ex-PthvyTRs', { action: 'contact' }).then(resolve);
        });
      });
      const cc  = fd.get('ny-cc') || '';
      const res = await fetch('/api/contact', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name, email, phone:(cc?cc+' ':'')+phone, company:biz,
          message:`Business: ${biz}\nBorough/Area: ${boro}\n\n${msg}`,
          source:'SEO Services New York Page', consent:true, recaptchaToken:token }),
      });
      if (res.ok) { setFormSt('success'); e.target.reset(); } else { setFormSt('error'); }
    } catch { setFormSt('error'); }
  };

  const jsonLd = {
    '@context':'https://schema.org',
    '@graph':[
      { '@type':'Organization', '@id':'https://www.1solutions.biz/#organization',
        name:'1Solutions', url:'https://www.1solutions.biz',
        logo:{ '@type':'ImageObject', url:'https://www.1solutions.biz/images/1solutions-logo.png' },
        description:'Full-service SEO agency serving New York City businesses with local SEO, technical SEO, content marketing, link building, and e-commerce SEO. 15+ years of experience delivering first-page Google rankings across all five boroughs.',
        address:{ '@type':'PostalAddress', addressLocality:'New Delhi', addressCountry:'IN' },
        aggregateRating:{ '@type':'AggregateRating', ratingValue:'4.9', reviewCount:'214', bestRating:'5' },
        sameAs:['https://www.linkedin.com/company/1solutions/','https://x.com/1solutionsbiz','https://www.facebook.com/1solutionsbiz'],
      },
      { '@type':'WebPage', '@id':'https://www.1solutions.biz/seo-services-new-york/',
        url:'https://www.1solutions.biz/seo-services-new-york/',
        name:'SEO Services New York | #1 NYC SEO Agency | 1Solutions',
        description:'Top-rated SEO company in New York City. We help NYC businesses rank on page 1 of Google with local SEO, technical SEO, content marketing, and link building across all five boroughs. Free SEO audit.',
        dateModified:'2026-07-17', inLanguage:'en-US',
      },
      { '@type':'ProfessionalService',
        '@id':'https://www.1solutions.biz/seo-services-new-york/#service',
        name:'1Solutions — SEO Services New York',
        url:'https://www.1solutions.biz/seo-services-new-york/',
        description:'New York City SEO agency delivering local SEO, technical SEO, content marketing, link building, and e-commerce SEO for businesses across all five boroughs, Long Island, and the tri-state area.',
        serviceType:'Search Engine Optimisation',
        provider:{ '@type':'Organization', name:'1Solutions', url:'https://www.1solutions.biz' },
        areaServed:[
          { '@type':'City', name:'New York City', sameAs:'https://www.wikidata.org/wiki/Q60' },
          { '@type':'City', name:'Manhattan' },
          { '@type':'City', name:'Brooklyn' },
          { '@type':'City', name:'Queens' },
          { '@type':'City', name:'The Bronx' },
          { '@type':'City', name:'Staten Island' },
          { '@type':'City', name:'Long Island' },
          { '@type':'AdministrativeArea', name:'Greater New York' },
          { '@type':'AdministrativeArea', name:'Tri-State Area' },
        ],
        hasOfferCatalog:{ '@type':'OfferCatalog', name:'New York SEO Services', itemListElement:[
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Local SEO New York City' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Technical SEO Audit New York' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'On-Page SEO Optimization NYC' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Content Marketing New York' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Link Building NYC' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'E-commerce SEO New York' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Schema Markup & Rich Snippets NYC' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Monthly SEO Reporting New York' }},
        ]},
        priceRange:'$599 - $1,799/month',
      },
      { '@type':'HowTo', name:'How Our NYC SEO Process Works',
        description:'1Solutions 6-step SEO process for New York City businesses — from initial market analysis to ongoing ranking growth across all five boroughs.',
        step: PROCESS.map(s => ({ '@type':'HowToStep', name:s.title, text:s.body })),
      },
      { '@type':'FAQPage', mainEntity: FAQS.map(f => ({ '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text:f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>SEO Services New York | #1 NYC SEO Agency | 1Solutions</title>
        <meta name="description" content="Top-rated SEO agency in New York City. 1Solutions helps NYC businesses rank on page 1 of Google with local SEO, technical SEO, content marketing, and link building across all five boroughs. Trusted by 200+ NYC businesses. Free SEO audit." />
        <meta name="keywords" content="SEO services New York, NYC SEO agency, SEO company New York City, local SEO New York, SEO services NYC, digital marketing New York, SEO consultant NYC, Manhattan SEO, Brooklyn SEO, Queens SEO" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/seo-services-new-york/" />
        <meta property="og:title" content="SEO Services New York | #1 NYC SEO Agency | 1Solutions" />
        <meta property="og:description" content="Top-rated NYC SEO agency. We help New York businesses rank on page 1 of Google. Local SEO, technical SEO, content marketing, and link building across all five boroughs. Free audit." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.1solutions.biz/seo-services-new-york/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/og-seo-new-york.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SEO Services New York | 1Solutions" />
        <meta name="twitter:description" content="Top-rated SEO agency in New York City. Page 1 rankings for NYC businesses through local SEO, technical SEO, and content marketing across all five boroughs." />
        <meta name="geo.region" content="US-NY" />
        <meta name="geo.placename" content="New York City" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .ny-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);background-attachment:scroll;color:#0F1F40;line-height:1.6;overflow-x:hidden;position:relative}
          .ny-page *,.ny-page *::before,.ny-page *::after{box-sizing:border-box}
          .ny-orb1{position:fixed;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.28) 0%,rgba(139,92,246,0.10) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px)}
          .ny-orb2{position:fixed;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.22) 0%,rgba(245,158,11,0.10) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px)}
          .ny-orb3{position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.16) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px)}
          .ny-reveal{opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}
          .ny-visible{opacity:1;transform:translateY(0)}
          .ny-sec{padding:80px 40px;position:relative;z-index:1}
          .ny-in{max-width:1280px;margin:0 auto}
          .ny-white{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08)}
          .ny-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block}
          .ny-h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:10px}
          .ny-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}
          .ny-glass{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color .22s,box-shadow .22s,transform .22s}
          .ny-glass:hover{border-color:rgba(217,119,6,0.25);box-shadow:0 8px 36px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px)}
          .ny-icon{width:44px;height:44px;background:linear-gradient(135deg,rgba(15,52,96,0.10),rgba(15,52,96,0.06));border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;flex-shrink:0}
          .ny-icon svg{width:20px;height:20px;color:#0F3460}
          .ny-card-h{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .ny-card-p{font-size:13px;color:#4A6080;line-height:1.65}
          .ny-nbadge{width:40px;height:40px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:800;margin-bottom:16px;box-shadow:0 4px 12px rgba(15,52,96,0.25)}
          .ny-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .ny-g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
          .ny-hero{position:relative;z-index:1;padding:72px 40px 0;overflow:hidden}
          .ny-hero::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.10) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px)}
          .ny-hero::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.16) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px)}
          .ny-hero-inner{position:relative;z-index:2;text-align:center;max-width:920px;margin:0 auto}
          .ny-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px}
          .ny-h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:18px;color:#0F1F40}
          .ny-hero-sub{font-size:16px;color:#3A507A;line-height:1.65;max-width:660px;margin:0 auto 28px}
          .ny-btns{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:32px}
          .ny-btn-p{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);border-radius:50px;color:#fff;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,0.25)}
          .ny-btn-p:hover{background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,0.30)}
          .ny-btn-s{display:inline-flex;align-items:center;padding:14px 32px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .ny-btn-s:hover{background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);transform:translateY(-2px)}
          .ny-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95)}
          .ny-stat{padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10)}
          .ny-stat:last-child{border-right:none}
          .ny-stat-v{font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1;margin-bottom:6px}
          .ny-stat-l{font-size:12px;color:#4A6080;font-weight:500}
          .ny-dark{padding:80px 40px;background:#fff;position:relative;z-index:1}
          .ny-dark-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:10px}
          .ny-dark-h{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:10px}
          .ny-dark-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}
          .ny-res-card{background:linear-gradient(135deg,rgba(240,253,244,.90) 0%,rgba(255,255,255,1) 50%,rgba(254,252,232,.80) 100%);border:1px solid rgba(34,197,94,.18);border-radius:20px;padding:36px 24px;text-align:center;box-shadow:0 4px 24px rgba(34,197,94,.10),0 1px 0 rgba(255,255,255,.95) inset;transition:transform .22s,box-shadow .25s}
          .ny-res-card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(34,197,94,.18),0 0 0 1px rgba(34,197,94,.25),0 1px 0 rgba(255,255,255,1) inset}
          .ny-res-metric{font-size:clamp(2.6rem,4.5vw,3.6rem);font-weight:900;letter-spacing:-0.04em;line-height:1;margin-bottom:10px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-variant-numeric:tabular-nums}
          .ny-res-label{font-size:13px;font-weight:700;color:#0F1F40;margin-bottom:6px}
          .ny-res-detail{font-size:11px;color:#6b7280;line-height:1.5}
          .ny-pills{display:flex;flex-wrap:wrap;gap:10px}
          .ny-pill{display:inline-flex;align-items:center;gap:7px;border-radius:50px;padding:8px 16px;font-size:13px;font-weight:600;box-shadow:0 2px 10px rgba(0,0,0,0.07)}
          .ny-pill-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;opacity:.8}
          .ny-testi{padding:72px 0;background:#f8fafd;overflow:hidden;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1}
          .ny-testi-hd{max-width:1280px;margin:0 auto 40px;padding:0 40px;text-align:center}
          @keyframes ny-marqL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          @keyframes ny-marqR{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
          .ny-trow{overflow:hidden;position:relative;margin-bottom:16px}
          .ny-trow:last-child{margin-bottom:0}
          .ny-tfade-l{position:absolute;left:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to right,#f8fafd,transparent);pointer-events:none}
          .ny-tfade-r{position:absolute;right:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to left,#f8fafd,transparent);pointer-events:none}
          .ny-ttrack{display:flex;gap:20px;width:max-content;padding-left:20px;animation:ny-marqL 44s linear infinite;will-change:transform}
          .ny-ttrack-rev{display:flex;gap:20px;width:max-content;padding-left:20px;animation:ny-marqR 44s linear infinite;will-change:transform}
          .ny-trow:hover .ny-ttrack,.ny-trow:hover .ny-ttrack-rev{animation-play-state:paused}
          .ny-tcard{width:400px;flex-shrink:0;background:#fff;border:1px solid rgba(15,52,96,0.08);border-radius:16px;padding:24px;box-shadow:0 2px 16px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:12px;user-select:none;transition:border-color .2s}
          .ny-tcard:hover{border-color:rgba(217,119,6,0.30)}
          .ny-tcard-stars{color:#F59E0B;font-size:14px}
          .ny-tcard-text{font-size:14px;color:#374151;line-height:1.75;margin:0;flex-grow:1}
          .ny-tcard-author{display:flex;align-items:center;gap:12px;border-top:1px solid #f3f4f6;padding-top:14px}
          .ny-tcard-av{width:38px;height:38px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:12px}
          .ny-tcard-name{font-weight:700;color:#111827;font-size:13px}
          .ny-tcard-role{color:#9ca3af;font-size:11px;margin-top:1px}
          .ny-contact-sec{padding:80px 40px;position:relative;z-index:1}
          .ny-contact-in{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:48px}
          .ny-contact-left h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.2;margin:0 0 16px;color:#0F1F40;letter-spacing:-0.5px}
          .ny-contact-left p{font-size:14px;color:#4A6080;line-height:1.65;margin:0 0 24px}
          .ny-trust-box{background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1.5px solid rgba(217,119,6,0.25);border-radius:16px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:14px}
          .ny-trust-row{display:flex;gap:12px;align-items:flex-start}
          .ny-trust-row svg{color:#D97706;flex-shrink:0;margin-top:2px}
          .ny-trust-row span{font-size:13px;color:#4A6080;line-height:1.55}
          .ny-cs{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:20px;border-top:1px solid rgba(15,52,96,0.10)}
          .ny-cs-num{font-size:32px;font-weight:900;color:#0F3460;line-height:1;margin-bottom:4px}
          .ny-cs-lbl{font-size:12px;color:#4A6080;font-weight:500;line-height:1.4}
          .ny-form-box{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .ny-form-box h3{font-size:20px;font-weight:700;margin:0 0 22px;color:#0F1F40;letter-spacing:-0.5px}
          .ny-form{display:flex;flex-direction:column;gap:14px}
          .ny-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .ny-fg{display:flex;flex-direction:column;gap:5px}
          .ny-fg label{font-size:12px;font-weight:600;color:#0F1F40}
          .ny-fg input,.ny-fg textarea,.ny-fg select{padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:8px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.60);transition:border-color .2s,background .2s;width:100%}
          .ny-fg input:focus,.ny-fg textarea:focus,.ny-fg select:focus{outline:none;border-color:#D97706;background:rgba(255,255,255,0.95);box-shadow:0 0 0 3px rgba(217,119,6,0.12)}
          .ny-fg textarea{resize:vertical}
          .ny-phone-wrap{display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:8px;overflow:hidden;background:rgba(255,255,255,0.60)}
          .ny-phone-wrap select{padding:10px;border:none;background:transparent;font-size:12px;width:auto!important;min-width:70px;max-width:90px;color:#0F1F40;font-family:inherit;flex-shrink:0}
          .ny-phone-wrap input{flex:1!important;width:auto!important;min-width:0!important;border:none!important;border-radius:0!important;padding:10px 14px!important;background:rgba(255,255,255,0.60)!important}
          .ny-phone-wrap input:focus{outline:none!important;box-shadow:none!important;background:rgba(255,255,255,0.95)!important}
          .ny-consent{display:flex;gap:8px;align-items:flex-start}
          .ny-consent input[type="checkbox"]{margin-top:3px;width:16px;height:16px;cursor:pointer;flex-shrink:0;accent-color:#D97706}
          .ny-consent label{font-size:11px;color:#4A6080;line-height:1.5;margin:0}
          .ny-consent a{color:#0F3460;text-decoration:none}
          .ny-submit{padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .3s;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25)}
          .ny-submit:hover:not(:disabled){background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px)}
          .ny-submit:disabled{opacity:.65;cursor:not-allowed}
          .ny-success{text-align:center;padding:32px 0}
          .ny-success-icon{width:60px;height:60px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;box-shadow:0 8px 24px rgba(15,52,96,0.25)}
          .ny-success-icon svg{width:28px;height:28px;stroke:#fff;fill:none}
          .ny-success h3{font-size:20px;font-weight:700;color:#0F1F40;margin:0 0 10px}
          .ny-success p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}
          .ny-val-err{background:rgba(220,38,38,0.06);border:1px solid rgba(220,38,38,0.20);border-radius:8px;padding:10px 14px;font-size:13px;color:#dc2626}
          .ny-faq-list{display:flex;flex-direction:column;gap:12px}
          .ny-fitem{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color .2s,box-shadow .2s;position:relative}
          .ny-fitem.open{border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12)}
          .ny-fitem.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px}
          .ny-fq{width:100%;background:none;border:none;padding:20px 22px 20px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative}
          .ny-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.08);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background .2s,color .2s}
          .ny-fitem.open .ny-fq-badge{background:#D97706;color:#fff}
          .ny-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45}
          .ny-fitem.open .ny-fq-text{color:#D97706}
          .ny-fq-chev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .ny-fitem.open .ny-fq-chev{transform:rotate(180deg);color:#D97706}
          .ny-fa{font-size:14px;color:#4b5563;line-height:1.8;padding:0 22px 20px 60px}
          .ny-related{background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px;position:relative;z-index:1}
          .ny-related-in{max-width:1280px;margin:0 auto;text-align:center}
          .ny-related-ey{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block}
          .ny-related-ttl{font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#111827;margin:0 0 16px}
          .ny-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px}
          .ny-related-divider{border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0}
          .ny-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}
          .ny-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .25s}
          .ny-rtag:hover{filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10)}
          .ny-rtag-blue{background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8}
          .ny-rtag-violet{background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9}
          .ny-rtag-teal{background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E}
          .ny-rtag-indigo{background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA}
          .ny-rtag-amber{background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309}
          .ny-rtag-green{background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D}
          .ny-rtag-orange{background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C}
          .ny-rtag-rose{background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C}
          .ny-rtag-slate{background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155}
          .ny-rtag-cyan{background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490}
          .ny-tog-row{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:48px}
          .ny-tog-lbl{font-size:15px;font-weight:600;color:#9ca3af;transition:color .2s}
          .ny-tog-lbl.on{color:#0F1F40}
          .ny-tog-btn{width:50px;height:28px;background:#d1d5db;border-radius:100px;position:relative;cursor:pointer;border:none;padding:0;transition:background .25s;flex-shrink:0}
          .ny-tog-btn.active{background:#D97706}
          .ny-tog-knob{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .25s;box-shadow:0 1px 4px rgba(0,0,0,.18)}
          .ny-tog-btn.active .ny-tog-knob{transform:translateX(22px)}
          .ny-save-pill{display:inline-flex;align-items:center;background:rgba(217,119,6,.12);color:#B45309;font-size:11px;font-weight:700;padding:2px 9px;border-radius:100px;margin-left:6px}
          .ny-pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:stretch;padding-top:16px}
          .ny-card{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;position:relative;display:flex;flex-direction:column;transition:transform .22s,box-shadow .22s,border-color .22s;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .ny-card:hover{transform:translateY(-4px);border-color:rgba(217,119,6,.35);box-shadow:0 16px 48px rgba(15,52,96,.14),inset 0 1px 0 rgba(255,255,255,1)}
          .ny-card-pop{background:linear-gradient(180deg,rgba(217,119,6,.08) 0%,rgba(255,255,255,.82) 50%,rgba(219,234,254,.50) 100%);border-color:rgba(217,119,6,.50);box-shadow:0 0 80px rgba(217,119,6,.16),0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.98);transform:scale(1.03)}
          .ny-card-pop:hover{transform:scale(1.03) translateY(-4px)}
          .ny-pop-tag{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(120deg,#D97706,#ea580c);color:#fff;font-size:11px;font-weight:700;padding:4px 14px;border-radius:999px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;display:inline-flex;align-items:center;gap:5px;box-shadow:0 4px 16px rgba(217,119,6,.45)}
          .ny-plan-name{font-family:'Courier New',ui-monospace,monospace;font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#6b7280;font-weight:700;margin-bottom:10px}
          .ny-plan-desc{font-size:13px;color:#4A6080;line-height:1.55;margin:0 0 22px}
          .ny-price-row{display:flex;align-items:baseline;gap:4px;margin:8px 0 2px}
          .ny-currency{font-size:1.4rem;font-weight:700;color:#D97706}
          .ny-amount{font-size:44px;font-weight:800;letter-spacing:-.035em;color:#0F1F40;line-height:1}
          .ny-per{font-size:14px;color:#9ca3af;font-weight:500;margin-left:4px}
          .ny-billed{font-size:11px;color:#9ca3af;margin-bottom:4px}
          .ny-save-line{font-size:11px;font-weight:700;color:#16a34a;min-height:16px;margin-bottom:22px}
          .ny-card-div{height:1px;background:rgba(15,52,96,.10);margin:0 0 4px}
          .ny-card-pop .ny-card-div{background:rgba(217,119,6,.25)}
          .ny-feat-list{list-style:none;padding:0;margin:0 0 24px;flex:1}
          .ny-feat-list li{padding:9px 0;border-top:1px dashed rgba(15,52,96,.12);font-size:13px;color:#374151;line-height:1.4}
          .ny-feat-list li::before{content:"✓ ";color:#22c55e;font-weight:700}
          .ny-card-pop .ny-feat-list li{border-top-color:rgba(217,119,6,.22)}
          .ny-cta-card{display:block;width:100%;text-align:center;padding:12px;border-radius:50px;font-weight:700;font-size:.875rem;text-decoration:none;background:rgba(15,52,96,.85);color:#fff;transition:all .22s;box-shadow:0 4px 16px rgba(15,52,96,.20)}
          .ny-cta-card:hover{background:rgba(15,52,96,1);transform:translateY(-1px);box-shadow:0 6px 24px rgba(15,52,96,.30)}
          .ny-pkg-trust{display:flex;justify-content:center;gap:28px;flex-wrap:wrap;margin-top:32px;padding-top:32px;border-top:1px solid rgba(15,52,96,.08)}
          .ny-pkg-trust span{font-size:13px;color:#6b7280;display:flex;align-items:center;gap:6px;font-weight:500}
          @media(max-width:1024px){.ny-g3{grid-template-columns:repeat(2,1fr)}.ny-g4{grid-template-columns:repeat(2,1fr)}.ny-contact-in{grid-template-columns:1fr}.ny-pkg-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.ny-card-pop{transform:none}.ny-card-pop:hover{transform:translateY(-4px)}}
          @media(max-width:768px){.ny-hero{padding:56px 24px 0}.ny-hero::before,.ny-hero::after{display:none}.ny-sec,.ny-dark,.ny-contact-sec,.ny-related,.ny-testi{padding-left:24px;padding-right:24px}.ny-testi-hd{padding:0 24px}.ny-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.ny-stat:nth-child(2){border-right:none}.ny-stat:nth-child(3){border-top:1px solid rgba(15,52,96,0.10)}.ny-stat:nth-child(4){border-top:1px solid rgba(15,52,96,0.10);border-right:none}.ny-btns{flex-direction:column;align-items:center}.ny-g3{grid-template-columns:1fr}.ny-g4{grid-template-columns:repeat(2,1fr)}.ny-row2{grid-template-columns:1fr}.ny-tcard{width:300px}.ny-related-ttl{font-size:28px}.ny-orb1,.ny-orb2,.ny-orb3{display:none}.ny-glass,.ny-form-box,.ny-trust-box,.ny-stats,.ny-fitem{backdrop-filter:none;-webkit-backdrop-filter:none}.ny-btn-p,.ny-btn-s,.ny-submit{backdrop-filter:none;-webkit-backdrop-filter:none}.ny-res-card,.ny-pill{backdrop-filter:none;-webkit-backdrop-filter:none}.ny-related{backdrop-filter:none;-webkit-backdrop-filter:none}.ny-card{backdrop-filter:none;-webkit-backdrop-filter:none}.ny-trow:last-child{display:none}}
          @media(max-width:480px){.ny-tcard{width:270px;padding:18px}.ny-related-ttl{font-size:24px}.ny-g4{grid-template-columns:1fr 1fr}}
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>

      <div className="ny-page">
        <div className="ny-orb1"/><div className="ny-orb2"/><div className="ny-orb3"/>

        {/* ── HERO ── */}
        <section className="ny-hero">
          <div className="ny-hero-inner">
            <span className="ny-eyebrow">SEO Services New York · NYC SEO Agency · Local SEO · Technical SEO</span>
            <h1 className="ny-h1">The SEO Agency New York<br/>Businesses Choose to <AuroraText>Own Page 1</AuroraText></h1>
            <p className="ny-hero-sub">1Solutions is a specialist NYC SEO agency with 15+ years ranking businesses across all five boroughs — Manhattan, Brooklyn, Queens, the Bronx, and Staten Island — plus Long Island and the tri-state area. We deliver local SEO, technical SEO, and content strategies built for the most competitive search market in America.</p>
            <div className="ny-btns">
              <a href="#ny-contact" className="ny-btn-p">
                Get Your Free NYC SEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#packages" className="ny-btn-s">View Packages</a>
            </div>
            <div className="ny-stats">
              {STATS_HERO.map(s => (
                <div key={s.label} className="ny-stat">
                  <div className="ny-stat-v">{s.val}</div>
                  <div className="ny-stat-l">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KEYWORD TYPES ── */}
        <section className="ny-sec ny-white">
          <div className="ny-in">
            <div className="ny-reveal">
              <span className="ny-ey">Keywords We Rank You For</span>
              <h2 className="ny-h2">Every NYC Search Intent: <AuroraText>Borough to Enterprise</AuroraText></h2>
              <p className="ny-lead">From neighbourhood-level local searches in Williamsburg or Astoria to competitive citywide commercial terms, we build dedicated strategies for every search intent across New York City.</p>
            </div>
            <div className="ny-pills ny-reveal">
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
                  <span key={k} className="ny-pill" style={{transitionDelay:`${i*40}ms`,background:c.bg,border:`1px solid ${c.border}`,color:c.color}}>
                    <span className="ny-pill-dot" style={{background:c.dot}}/>
                    {k}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="ny-sec" id="services">
          <div className="ny-in">
            <div className="ny-reveal">
              <span className="ny-ey">What We Do</span>
              <h2 className="ny-h2">Full-Spectrum <AuroraText>New York SEO Services</AuroraText></h2>
              <p className="ny-lead">Every SEO component your NYC business needs to dominate Google — from technical foundations and local pack rankings to content marketing and authority link building across all five boroughs.</p>
            </div>
            <div className="ny-g3">
              {SERVICES.map((s, i) => (
                <div key={s.title} className="ny-glass ny-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="ny-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon}/>
                    </svg>
                  </div>
                  <div className="ny-card-h">{s.title}</div>
                  <div className="ny-card-p">{s.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className="ny-dark">
          <div className="ny-in">
            <div className="ny-reveal" style={{textAlign:'center',marginBottom:48}}>
              <span className="ny-dark-ey">Proven Results</span>
              <h2 className="ny-dark-h"><AuroraText>Real Results from NYC SEO Campaigns</AuroraText></h2>
              <p className="ny-dark-lead" style={{margin:'0 auto'}}>Real metrics from real New York businesses across legal, healthcare, retail, real estate, and financial services.</p>
            </div>
            <div className="ny-g4 ny-reveal">
              {RESULTS.map(r => (
                <StatCard key={r.label} {...r}/>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="ny-sec ny-white" id="process">
          <div className="ny-in">
            <div className="ny-reveal">
              <span className="ny-ey">How It Works</span>
              <h2 className="ny-h2">Our <AuroraText>6-Step NYC SEO Process</AuroraText></h2>
              <p className="ny-lead">A structured, repeatable roadmap from initial New York market analysis to ongoing ranking growth — built for the competitive realities of the most demanding search landscape in the US.</p>
            </div>
            <div className="ny-g3">
              {PROCESS.map((p, i) => (
                <div key={p.n} className="ny-glass ny-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="ny-nbadge">{p.n}</div>
                  <div className="ny-card-h">{p.title}</div>
                  <div className="ny-card-p">{p.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="ny-sec" id="why-us">
          <div className="ny-in">
            <div className="ny-reveal">
              <span className="ny-ey">Why 1Solutions</span>
              <h2 className="ny-h2">The NYC SEO Agency <AuroraText>Built for First-Page Results</AuroraText></h2>
              <p className="ny-lead">We understand the unique competitive dynamics of New York City search — the five boroughs, the industries, the buyer behaviour — and we build every strategy around putting your business at the very top.</p>
            </div>
            <div className="ny-g3">
              {WHY.map((w, i) => (
                <div key={w.title} className="ny-glass ny-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="ny-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  </div>
                  <div className="ny-card-h">{w.title}</div>
                  <div className="ny-card-p">{w.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section className="ny-sec ny-white" id="packages">
          <div className="ny-in">
            <div className="ny-reveal" style={{textAlign:'center'}}>
              <span className="ny-ey">NYC SEO Packages</span>
              <h2 className="ny-h2">Simple, Transparent <AuroraText>New York SEO Pricing</AuroraText></h2>
              <p className="ny-lead" style={{margin:'0 auto 44px'}}>No setup fee. No lock-in contracts. Cancel any month. All packages include a kick-off call, onboarding, and a free NYC SEO audit.</p>
              <div className="ny-tog-row">
                <span className={`ny-tog-lbl${!isYearly ? ' on' : ''}`}>Monthly</span>
                <button className={`ny-tog-btn${isYearly ? ' active' : ''}`} onClick={() => setIsYearly(v => !v)} aria-label="Toggle billing period">
                  <span className="ny-tog-knob"/>
                </button>
                <span className={`ny-tog-lbl${isYearly ? ' on' : ''}`}>Yearly <span className="ny-save-pill">Save 17%</span></span>
              </div>
            </div>
            <div className="ny-pkg-grid ny-reveal">
              {PACKAGES.map(pkg => (
                <div key={pkg.slug} className={`ny-card${pkg.popular ? ' ny-card-pop' : ''}`}>
                  {pkg.popular && <span className="ny-pop-tag">✦ Most Popular</span>}
                  <div className="ny-plan-name">{pkg.name}</div>
                  <div className="ny-price-row">
                    <span className="ny-currency">$</span>
                    <span className="ny-amount">{isYearly ? pkg.yearlyPrice : pkg.monthlyPrice}</span>
                    <span className="ny-per">/mo</span>
                  </div>
                  <div className="ny-billed">{isYearly ? 'Billed annually' : 'Billed monthly'}</div>
                  <div className="ny-save-line">{isYearly ? `Save $${pkg.yearlySave.toLocaleString()} per year` : ' '}</div>
                  <p className="ny-plan-desc">{pkg.desc}</p>
                  <a href="#ny-contact" className="ny-cta-card">Get Started →</a>
                  <div className="ny-card-div"/>
                  <ul className="ny-feat-list">{pkg.features.map(f => <li key={f}>{f}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="ny-pkg-trust ny-reveal">
              {['No setup fee','Cancel with 30 days notice','Custom plans for 4+ NYC locations','Free kick-off NYC SEO audit'].map(t => (
                <span key={t}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="ny-testi">
          <div className="ny-testi-hd ny-reveal">
            <span className="ny-ey">Client Reviews</span>
            <h2 className="ny-h2">What NYC Businesses Say <AuroraText>About Our SEO Results</AuroraText></h2>
            <p className="ny-lead" style={{margin:'0 auto'}}>Hear from businesses across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island who have grown through organic search with 1Solutions.</p>
          </div>
          <div className="ny-trow">
            <div className="ny-tfade-l"/><div className="ny-tfade-r"/>
            <div className="ny-ttrack">
              {ROW1.map((t, i) => (
                <div key={i} className="ny-tcard">
                  <div className="ny-tcard-stars">★★★★★</div>
                  <p className="ny-tcard-text">{t.text}</p>
                  <div className="ny-tcard-author">
                    <div className="ny-tcard-av" style={{background:t.bg}}>{t.initials}</div>
                    <div><div className="ny-tcard-name">{t.name}</div><div className="ny-tcard-role">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ny-trow">
            <div className="ny-tfade-l"/><div className="ny-tfade-r"/>
            <div className="ny-ttrack-rev">
              {ROW2.map((t, i) => (
                <div key={i} className="ny-tcard">
                  <div className="ny-tcard-stars">★★★★★</div>
                  <p className="ny-tcard-text">{t.text}</p>
                  <div className="ny-tcard-author">
                    <div className="ny-tcard-av" style={{background:t.bg}}>{t.initials}</div>
                    <div><div className="ny-tcard-name">{t.name}</div><div className="ny-tcard-role">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="ny-contact-sec" id="ny-contact">
          <div className="ny-contact-in">
            <div className="ny-contact-left">
              <span className="ny-ey">Free NYC SEO Audit</span>
              <h2>Get a Free New York SEO Audit — No Commitment Required</h2>
              <p>Tell us about your New York business and we will send you a detailed SEO audit covering your current rankings, technical issues, keyword gaps, and a roadmap for getting to page 1 — completely free, no sales pressure.</p>
              <div className="ny-trust-box">
                {[
                  { icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', text:'Response within 1 business day. We read every submission personally.' },
                  { icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text:'Free 30-minute NYC SEO strategy call with a senior SEO specialist.' },
                  { icon:'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z', text:'No lock-in contracts. Month-to-month engagements only.' },
                  { icon:'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', text:'Honest assessment — we will tell you if SEO is not the right move for your NYC business right now.' },
                ].map((row, i) => (
                  <div key={i} className="ny-trust-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={row.icon}/></svg>
                    <span>{row.text}</span>
                  </div>
                ))}
                <div className="ny-cs">
                  {[['200+','NYC Clients Served'],['15+','Years of SEO Experience'],['4.9★','Average Client Rating']].map(([n,l]) => (
                    <div key={l}><div className="ny-cs-num">{n}</div><div className="ny-cs-lbl">{l}</div></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ny-form-box">
              <h3>Request Your Free NYC SEO Audit</h3>
              {formSt === 'success' ? (
                <div className="ny-success">
                  <div className="ny-success-icon">
                    <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>Thank you — we will review your New York business details and send your free SEO audit within 1 business day. Watch your inbox.</p>
                </div>
              ) : (
                <form className="ny-form" onSubmit={handleSubmit} noValidate>
                  <div className="ny-row2">
                    <div className="ny-fg"><label htmlFor="ny-name">Full Name *</label><input id="ny-name" name="ny-name" type="text" placeholder="Your name" required/></div>
                    <div className="ny-fg"><label htmlFor="ny-email">Email Address *</label><input id="ny-email" name="ny-email" type="email" placeholder="you@company.com" required/></div>
                  </div>
                  <div className="ny-fg">
                    <label htmlFor="ny-phone">Phone Number *</label>
                    <div className="ny-phone-wrap">
                      <select name="ny-cc" aria-label="Country code">
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+61">🇦🇺 +61</option>
                      </select>
                      <input id="ny-phone" name="ny-phone" type="tel" placeholder="(212) 555-0100" required/>
                    </div>
                  </div>
                  <div className="ny-row2">
                    <div className="ny-fg"><label htmlFor="ny-biz">Business Name *</label><input id="ny-biz" name="ny-biz" type="text" placeholder="Your business name" required/></div>
                    <div className="ny-fg">
                      <label htmlFor="ny-boro">Borough / Area *</label>
                      <select id="ny-boro" name="ny-boro" required>
                        <option value="">Select your area</option>
                        <option>Manhattan</option>
                        <option>Brooklyn</option>
                        <option>Queens</option>
                        <option>The Bronx</option>
                        <option>Staten Island</option>
                        <option>Long Island</option>
                        <option>New Jersey (Tri-State)</option>
                        <option>Other NYC Area</option>
                      </select>
                    </div>
                  </div>
                  <div className="ny-fg">
                    <label htmlFor="ny-msg">Tell Us About Your NYC SEO Goals *</label>
                    <textarea id="ny-msg" name="ny-msg" rows={4} placeholder="What keywords do you want to rank for? What's your industry? Any current rankings or traffic issues?" required/>
                  </div>
                  {formSt === 'validation' && <div className="ny-val-err">Please fill in all required fields and accept the privacy policy to continue.</div>}
                  {formSt === 'error' && <div className="ny-val-err">Something went wrong. Please try again or email us directly at hello@1solutions.biz</div>}
                  <div className="ny-consent">
                    <input type="checkbox" id="ny-consent" name="ny-consent"/>
                    <label htmlFor="ny-consent">I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions contacting me about SEO services for my New York business.</label>
                  </div>
                  <button type="submit" className="ny-submit" disabled={formSt==='loading'}>
                    {formSt === 'loading' ? 'Sending…' : 'Request Free NYC SEO Audit →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="ny-sec ny-white">
          <div className="ny-in">
            <div className="ny-reveal" style={{textAlign:'center',marginBottom:40}}>
              <span className="ny-ey">Frequently Asked Questions</span>
              <h2 className="ny-h2">NYC SEO Questions <AuroraText>Answered Honestly</AuroraText></h2>
              <p className="ny-lead" style={{margin:'0 auto'}}>Straight answers to the questions New York business owners ask us most often before starting an SEO campaign.</p>
            </div>
            <div className="ny-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`ny-fitem${openFaq === i ? ' open' : ''}`}>
                  <button className="ny-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <span className="ny-fq-badge">{String(i+1).padStart(2,'0')}</span>
                    <span className="ny-fq-text">{f.q}</span>
                    <svg className="ny-fq-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFaq === i && <div className="ny-fa">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="ny-related">
          <div className="ny-related-in">
            <span className="ny-related-ey">Explore More</span>
            <h2 className="ny-related-ttl">Related <AuroraText>SEO & Digital Marketing Services</AuroraText></h2>
            <p className="ny-related-sub">Explore the full range of SEO and digital marketing services 1Solutions delivers for businesses across New York and beyond.</p>
            <hr className="ny-related-divider"/>
            <div className="ny-related-tags">
              {RELATED_TAGS.map(tag => (
                <Link key={tag.href} href={tag.href} className={`ny-rtag ${tag.cls}`}>{tag.label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
