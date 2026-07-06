import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';

const STATS_HERO = [
  { val: '97%',  label: 'Homeowners search online for a plumber' },
  { val: '$350+',label: 'Average plumber job value' },
  { val: '68%',  label: 'Click Maps Pack for emergency searches' },
  { val: '3×',   label: 'More leads from local SEO vs paid ads' },
];

const SERVICES = [
  { icon:'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z', title:'Emergency Plumber Keyword Targeting', body:'Dedicated urgency-driven landing pages capturing "emergency plumber near me", "burst pipe repair", "plumber open 24 hours", and "blocked drain [city]" — built to convert panicked homeowners the moment they search.' },
  { icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title:'Google Business Profile Optimisation', body:'Complete GBP setup with plumbing-specific categories, emergency hours, service area configuration, before/after photos, Q&A management, and weekly posts that signal activity to Google and convert profile visitors into callers.' },
  { icon:'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title:'Local Citation Building', body:'Consistent NAP across Angi, HomeAdvisor, Thumbtack, Houzz, BBB, Yelp, and 40+ plumbing-specific directories — the citation foundation that drives map pack rankings and local authority.' },
  { icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'Service-Specific Landing Pages', body:'Dedicated optimised pages for drain cleaning, water heater installation, pipe relining, bathroom plumbing, gas fitting, and emergency services — each targeting its own keyword cluster for maximum coverage.' },
  { icon:'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title:'Review Generation System', body:'Automated post-job review requests via SMS and email, negative review response strategy, and active Google review building — the social proof engine that lifts your map pack ranking and conversion rate simultaneously.' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Competitor Gap Analysis', body:'We identify every keyword your local plumbing competitors rank for that you do not — from "24-hour plumber [suburb]" to "[city] blocked drain specialist" — and build a 90-day roadmap to capture that traffic.' },
  { icon:'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title:'Plumber Schema Markup', body:'LocalBusiness schema with the Plumber service type, emergency availability hours, service area geographic regions, and AggregateRating — giving Google the structured data it needs to feature your business in rich results.' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Monthly Plumber SEO Reporting', body:'Rank tracking for every target keyword, GBP call volume monitoring, map pack position history, organic vs paid lead split, and plain-English revenue attribution — so you always know exactly what SEO is returning.' },
];

const RESULTS = [
  { prefix:'#', target:1,   suffix:'',  decimals:0, label:'Maps Pack — "emergency plumber [city]"', detail:'US plumbing company — achieved in 5 months' },
  { prefix:'',  target:4.8, suffix:'×', decimals:1, label:'More GBP calls month-over-month',        detail:'US plumbing company — 6-month campaign' },
  { prefix:'',  target:320, suffix:'%', decimals:0, label:'Organic traffic growth',                  detail:'Multi-location plumber — 9 months' },
  { prefix:'',  target:90,  suffix:'d', decimals:0, label:'To page 1 for primary service keywords',  detail:'UK plumber — brand-new market entry' },
];

const PROCESS = [
  { n:'01', title:'Plumbing Website + GBP Audit', body:'Full audit of your website and Google Business Profile — identifying technical issues, missing service pages, GBP gaps, citation inconsistencies, and local competitor benchmarks before we touch a single page.' },
  { n:'02', title:'Keyword Strategy by Search Intent', body:'We map emergency-intent keywords (burst pipe, blocked drain now) separately from planned-service intent (water heater replacement quote) — different landing pages for different buyer mindsets, maximising conversion at every intent level.' },
  { n:'03', title:'On-Page + GBP Optimisation', body:'Title tags, meta descriptions, H1 structure, service page content, GBP categories, emergency hours, and photo strategy all aligned to your priority plumbing keywords — implemented within the first 30 days.' },
  { n:'04', title:'Local Citation Building', body:'Consistent NAP submissions across 40+ directories — Angi, HomeAdvisor, Thumbtack, Houzz, and local chamber directories — the backbone of map pack authority that most agencies skip or do poorly.' },
  { n:'05', title:'Review Acquisition Launch', body:'Automated post-job review request sequences via SMS and email, with response templates and a strategy to reach 50+ Google reviews in the first 90 days — the review velocity benchmark for competitive plumbing markets.' },
  { n:'06', title:'Ongoing Rank Monitoring & Growth', body:'Monthly rank tracking reports, GBP insights, call attribution, and a rolling 90-day action plan — continuous optimisation as your market evolves, competitors react, and Google updates its local ranking signals.' },
];

const WHY = [
  { title:'Emergency Search Specialists', body:'We understand the urgency mechanics of plumbing searches. Homeowners searching for emergency help behave differently — our landing pages and GBP profiles are tuned for that intent and convert panicked visitors into callers.' },
  { title:'Plumber Industry Expertise', body:'From gas fitting compliance to water heater regulations, we understand the plumbing trade and write content that builds trust with both homeowners and Google — not generic SEO copy adapted from another industry.' },
  { title:'Review Velocity Building', body:'Review count and recency are major local ranking signals. We implement automated post-job review systems to get your review count growing consistently — reaching the 50+ benchmark that competitive markets demand.' },
  { title:'Service-Area Page Creation', body:'We build geo-targeted pages for every suburb, city, or postcode you serve — so you rank for "[service] in [suburb]" across your entire coverage area, not just your home city.' },
  { title:'No Lock-In Contracts', body:'Month-to-month engagements only. We earn your business every month through results — not contractual obligations that keep you paying regardless of performance.' },
  { title:'Transparent Monthly Reporting', body:'Clear reports showing GBP call volume, organic lead count, keyword positions, and map pack rankings — all tied directly to the calls and jobs you care about, not vanity traffic metrics.' },
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
    <div ref={ref} className="pl-res-card">
      <div className="pl-res-metric">{prefix}{display}{suffix}</div>
      <div className="pl-res-label">{label}</div>
      <div className="pl-res-detail">{detail}</div>
    </div>
  );
}

function RazorpayButton({ buttonId }) {
  const formRef = useRef(null);
  const loaded = useRef(false);
  useEffect(() => { loaded.current = false; }, [buttonId]);
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const inject = () => {
      if (loaded.current) return;
      loaded.current = true;
      el.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.setAttribute('data-payment_button_id', buttonId);
      script.async = true;
      el.appendChild(script);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { inject(); observer.disconnect(); }
    }, { rootMargin: '300px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [buttonId]);
  return <form ref={formRef} className="pl-rzp-form"/>;
}

const PACKAGES = [
  {
    name: 'Starter', slug: 'starter', monthlyPrice: 499, yearlyPrice: 415, yearlySave: 1008,
    monthlyButtonId: 'pl_TAA38ObJcClDiz', yearlyButtonId: 'pl_TAAKS59mpGju0n',
    desc: 'For single-location plumbers starting local SEO.',
    popular: false,
    features: [
      '1 location',
      'GBP optimisation + 4 weekly posts',
      '5 service/location pages',
      '20 local citation submissions',
      '10 target plumbing keywords tracked',
      'Review monitoring & email alerts',
      'Basic schema markup (LocalBusiness)',
      'Monthly rank & GBP report',
    ],
  },
  {
    name: 'Growth', slug: 'growth', monthlyPrice: 899, yearlyPrice: 749, yearlySave: 1800,
    monthlyButtonId: 'pl_TAA58iiRuffFeI', yearlyButtonId: 'pl_TAAMloanIdNImN',
    desc: 'For established plumbers ready to dominate the Maps Pack.',
    popular: true,
    features: [
      '1 location',
      'GBP fully managed + Q&A + photo strategy',
      'Up to 12 service + suburb pages',
      '40 local citation submissions',
      'SMS + email review automation',
      '25 target plumbing keywords tracked',
      'Full schema markup suite',
      'Competitor gap analysis',
      'Emergency keyword strategy',
      'Monthly rank + call tracking report',
    ],
  },
  {
    name: 'Authority', slug: 'authority', monthlyPrice: 1499, yearlyPrice: 1249, yearlySave: 3000,
    monthlyButtonId: 'pl_TAA6WwLLSjqhoL', yearlyButtonId: 'pl_TAAT8Q8Qtp5Zmr',
    desc: 'For multi-location plumbers and highly competitive markets.',
    popular: false,
    features: [
      'Up to 3 locations',
      'Full GBP management all locations',
      'Unlimited service + suburb pages',
      '80+ local citations per month',
      'Advanced review velocity system',
      '50+ keywords tracked across locations',
      'Full schema suite + rich results',
      'Ongoing competitor monitoring',
      '2× monthly content pieces',
      'Weekly rank tracking',
      'Dedicated account manager',
    ],
  },
];

const KEYWORD_TYPES = [
  'Emergency Plumber [City]','Plumber Near Me','Blocked Drain [Suburb]','24 Hour Plumber',
  'Burst Pipe Repair','Water Heater Installation','Drain Cleaning Services','Pipe Relining [City]',
  'Gas Fitting Services','Hot Water System Repair','Bathroom Plumber [City]','Commercial Plumber [City]',
];

const TESTIMONIALS_ROW1 = [
  { initials:'MP', bg:'#0F3460', name:'Mike Patterson', role:'Owner, Patterson Plumbing — Dallas, TX', text:'"We went from page 4 to #1 in the Maps Pack for "emergency plumber Dallas" in 4 months. The phone rings every day now. Biggest ROI of anything I have tried in 12 years of running this business."' },
  { initials:'JW', bg:'#1D4ED8', name:'James Walsh', role:'Director, Walsh Plumbing Group — Sydney, AU', text:'"1Solutions built us 28 suburb-specific landing pages targeting every area we service. We now rank page 1 for 34 different location keywords. Our job board is consistently full without spending a dollar on ads."' },
  { initials:'SR', bg:'#7C3AED', name:'Sarah Reynolds', role:'Marketing Manager, Premier Plumbers — Chicago, IL', text:'"Our review count went from 12 to 87 Google reviews in 5 months using their post-job SMS system. That review velocity alone pushed us from position 7 to position 2 in the local pack. Brilliant execution."' },
  { initials:'TC', bg:'#0F766E', name:'Tom Crawford', role:'Owner, Crawford Plumbing Services — Manchester, UK', text:'"The emergency keyword strategy changed everything. Dedicated pages for burst pipe, blocked drain, and boiler emergency in every borough. Emergency call revenue is up 240% year-on-year."' },
  { initials:'AK', bg:'#BE185D', name:'Aaron Kumar', role:'Founder, FastFlow Plumbing — Toronto, CA', text:'"Citation cleanup and GBP optimisation done properly for the first time. We had 3 duplicate listings and inconsistent NAP data everywhere. Fixed in month 1, rankings moved in month 2. Professional and transparent throughout."' },
];
const TESTIMONIALS_ROW2 = [
  { initials:'DM', bg:'#1D4ED8', name:'David Morrison', role:'Owner, Morrison Drain Solutions — Houston, TX', text:'"The schema markup work generated rich results showing our emergency hours, rating, and service area directly in Google. Click-through rate on our listings went up 31%. Genuinely impressed by the technical depth."' },
  { initials:'LB', bg:'#047857', name:'Lisa Brennan', role:'Operations Director, Rapid Plumbers — Melbourne, AU', text:'"We expanded into 3 new suburbs using the service-area page strategy. All three reached page 1 within 6 months. We have since expanded to 8 suburbs and every single one is driving calls consistently."' },
  { initials:'RH', bg:'#B45309', name:'Rob Hargreaves', role:'Owner, H&H Plumbing — Phoenix, AZ', text:'"Organic leads now account for 58% of new business, up from 12% when we started. Monthly reporting is clear and shows exactly which keywords are driving calls. Well worth the investment."' },
  { initials:'CL', bg:'#0F3460', name:'Chris Lawson', role:'Founder, Lawson Gas & Plumbing — Bristol, UK', text:'"We had tried two other agencies before 1Solutions. The difference is they understand the plumbing trade — they know what emergency intent looks like and how to structure content that converts panicked homeowners."' },
  { initials:'NK', bg:'#9D174D', name:'Nadia Khan', role:'Marketing Lead, AquaPro Plumbing — Vancouver, CA', text:'"Competitor gap analysis showed we were missing 40+ keywords our rivals ranked for. 1Solutions built a content plan to capture all of them. We are now outranking two larger competitors on our core service keywords."' },
];
const ROW1 = [...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1];
const ROW2 = [...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2];

const FAQS = [
  { q:'How quickly can plumbing SEO generate phone calls?', a:'Google Business Profile optimisation typically starts generating additional calls within 2 to 4 weeks, as GBP is the fastest-moving local ranking signal. For organic website rankings, expect meaningful movement within 3 to 6 months. Emergency keyword positions in competitive markets may take 6 to 9 months to reach the top 3 — but the results compound and do not stop when your ad budget does.' },
  { q:'Should plumbers run Google Ads alongside SEO?', a:'Yes — especially in the first 6 months while organic rankings build. Google Ads cover emergency-intent searches immediately, ensuring you capture urgent calls while your SEO foundations mature. Once organic rankings are established, many plumbers reduce ad spend significantly. We advise on the right balance for your specific market and competition level.' },
  { q:'How important is review count for plumbing map pack rankings?', a:'Extremely important. Google uses review count, recency, and star rating as direct local ranking signals. The benchmark for competitive plumbing markets is 4.0+ stars with 50+ reviews. We implement automated post-job review request systems to get you to that benchmark faster than your competitors — typically within 90 days.' },
  { q:'Do you create separate landing pages for each plumbing service?', a:'Yes. Every major service — drain cleaning, water heater installation and repair, pipe relining, bathroom plumbing, gas fitting, emergency plumbing, and blocked drain clearing — gets its own dedicated, keyword-optimised landing page. This multi-page strategy dramatically increases the total number of keywords you rank for across both organic results and the Maps Pack.' },
  { q:'What directories matter most for plumbing businesses?', a:'The highest-impact directories for plumbers are Google Business Profile (by far), Yelp, Angi (formerly Angie\'s List), HomeAdvisor, Houzz, Thumbtack, and BBB. For local authority, citations in your city chamber of commerce and local business directories also matter. We manage all of these with consistent, verified NAP data across every listing.' },
  { q:'Can you help with multiple plumbing service areas?', a:'Yes. We build individual geo-targeted landing pages for every city, suburb, or postcode you want to rank in — for example, "emergency plumber [suburb A]", "drain cleaning [suburb B]". These service-area pages are one of the most effective ways to expand your ranking footprint across a large coverage area without running ads in each location.' },
  { q:'How do you measure ROI for plumber SEO?', a:'We track GBP calls with call tracking numbers, organic contact form submissions, keyword position changes for all target terms, and map pack position for emergency keywords. We also help set up Google Analytics 4 goals so you can see organic traffic converting into leads — giving you a clear cost-per-lead from SEO versus other channels for every month of the campaign.' },
];

const RELATED_TAGS = [
  { href:'/local-seo-services/',              label:'Local SEO Services',        cls:'pl-rtag-blue' },
  { href:'/seo-services-company/',            label:'SEO Services Company',      cls:'pl-rtag-violet' },
  { href:'/hvac-seo-services/',               label:'HVAC SEO Services',         cls:'pl-rtag-teal' },
  { href:'/dental-seo-services/',             label:'Dental SEO Services',       cls:'pl-rtag-indigo' },
  { href:'/local-seo-packages/',              label:'Local SEO Packages',        cls:'pl-rtag-amber' },
  { href:'/google-my-business-optimization/', label:'Google Business Profile',   cls:'pl-rtag-green' },
  { href:'/seo-audit-services/',              label:'SEO Audit Services',        cls:'pl-rtag-orange' },
  { href:'/link-building-services/',          label:'Link Building Services',    cls:'pl-rtag-rose' },
  { href:'/home-repair-seo-services/',        label:'Home Repair SEO',           cls:'pl-rtag-slate' },
  { href:'/content-marketing-services/',      label:'Content Marketing',         cls:'pl-rtag-cyan' },
];

export default function PlumbingSeoServices() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq]   = useState(0);
  const [formSt, setFormSt]     = useState('idle');
  const recaptchaLoaded         = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('pl-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.pl-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const contact = document.getElementById('pl-contact');
    if (!contact) return;
    const rcObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !recaptchaLoaded.current) {
        const s = document.createElement('script');
        s.src = 'https://www.google.com/recaptcha/api.js?render=6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';
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
    const name = (fd.get('pl-name') || '').trim();
    const email= (fd.get('pl-email') || '').trim();
    const phone= (fd.get('pl-phone') || '').trim();
    const biz  = (fd.get('pl-biz') || '').trim();
    const city = (fd.get('pl-city') || '').trim();
    const msg  = (fd.get('pl-msg') || '').trim();
    const consent = document.getElementById('pl-consent')?.checked;
    if (!name || !email || !phone || !biz || !city || !msg || !consent) { setFormSt('validation'); return; }
    setFormSt('loading');
    try {
      const token = await new Promise(resolve => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs', { action: 'contact' }).then(resolve);
        });
      });
      const cc  = fd.get('pl-cc') || '';
      const res = await fetch('/api/contact', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name, email, phone:(cc?cc+' ':'')+phone, company:biz,
          message:`Business: ${biz}\nCity/Area: ${city}\n\n${msg}`,
          source:'Plumbing SEO Services Page', consent:true, recaptchaToken:token }),
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
        { '@type':'ListItem', position:3, name:'Plumbing SEO Services', item:'https://www.1solutions.biz/plumbing-seo-services/' },
      ]},
      { '@type':'LocalBusiness', '@id':'https://www.1solutions.biz/#organization',
        name:'1Solutions', url:'https://www.1solutions.biz',
        logo:'https://www.1solutions.biz/images/1solutions-logo.png',
        description:'Full-service digital agency offering specialist plumbing SEO, emergency keyword targeting, GBP optimisation, and local SEO for plumbing businesses across the US, UK, Canada, and Australia.',
        address:{ '@type':'PostalAddress', addressLocality:'New Delhi', addressCountry:'IN' },
        aggregateRating:{ '@type':'AggregateRating', ratingValue:'4.9', reviewCount:'142', bestRating:'5' },
        sameAs:['https://www.linkedin.com/company/1solutions/','https://x.com/1solutionsbiz','https://www.facebook.com/1solutionsbiz'],
      },
      { '@type':'WebPage', '@id':'https://www.1solutions.biz/plumbing-seo-services/',
        url:'https://www.1solutions.biz/plumbing-seo-services/',
        name:'Plumbing SEO Services | Rank for Emergency Plumber Keywords | 1Solutions',
        description:'Specialist plumbing SEO that ranks your business for emergency plumber, drain cleaning, water heater, and pipe repair keywords. Map pack dominance, GBP optimisation, review velocity, and service-area pages for plumbing companies.',
        dateModified:'2026-07-06', inLanguage:'en-US',
        breadcrumb:{ '@type':'BreadcrumbList', itemListElement:[
          { '@type':'ListItem', position:1, name:'Home', item:'https://www.1solutions.biz/' },
          { '@type':'ListItem', position:2, name:'SEO Services', item:'https://www.1solutions.biz/seo-services-company/' },
          { '@type':'ListItem', position:3, name:'Plumbing SEO Services', item:'https://www.1solutions.biz/plumbing-seo-services/' },
        ]},
      },
      { '@type':'Service',
        name:'Plumbing SEO Services',
        provider:{ '@type':'Organization', name:'1Solutions', url:'https://www.1solutions.biz' },
        description:'Comprehensive plumbing SEO including emergency keyword targeting, Google Business Profile optimisation, local citation building, review generation, service-specific landing pages, and plumber schema markup.',
        serviceType:'Plumber Search Engine Optimisation',
        areaServed:[
          { '@type':'Country', name:'United States' },
          { '@type':'Country', name:'United Kingdom' },
          { '@type':'Country', name:'Canada' },
          { '@type':'Country', name:'Australia' },
        ],
        url:'https://www.1solutions.biz/plumbing-seo-services/',
        hasOfferCatalog:{ '@type':'OfferCatalog', name:'Plumbing SEO Services', itemListElement:[
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Emergency Plumber Keyword Targeting' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Google Business Profile Optimisation for Plumbers' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Plumber Local Citation Building' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Service-Specific Landing Pages' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Review Generation System' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Competitor Gap Analysis' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Plumber Schema Markup' }},
          { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Monthly Plumber SEO Reporting' }},
        ]},
      },
      { '@type':'HowTo', name:'Our 6-Step Plumbing SEO Process',
        description:'How 1Solutions delivers plumbing SEO from initial audit to ongoing call growth.',
        step: PROCESS.map(s => ({ '@type':'HowToStep', name:s.title, text:s.body })),
      },
      { '@type':'FAQPage', mainEntity: FAQS.map(f => ({ '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text:f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Plumbing SEO Services | Rank for Emergency Plumber Keywords | 1Solutions</title>
        <meta name="description" content="Specialist plumbing SEO that ranks your business for emergency plumber, drain cleaning, water heater, and pipe repair keywords. Map pack dominance, GBP optimisation, and review velocity for plumbing companies in the US, UK, Canada, and Australia. Free audit." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/plumbing-seo-services/" />
        <meta property="og:title" content="Plumbing SEO Services | 1Solutions" />
        <meta property="og:description" content="Rank for emergency plumber keywords, dominate the Maps Pack, and grow GBP calls with specialist plumbing SEO from 1Solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.1solutions.biz/plumbing-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          /* ── BASE ── */
          .pl-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);background-attachment:scroll;color:#0F1F40;line-height:1.6;overflow-x:hidden;position:relative}
          .pl-page *,.pl-page *::before,.pl-page *::after{box-sizing:border-box}

          /* ── FIXED ORBS ── */
          .pl-orb1{position:fixed;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.28) 0%,rgba(139,92,246,0.10) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px)}
          .pl-orb2{position:fixed;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.22) 0%,rgba(245,158,11,0.10) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px)}
          .pl-orb3{position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.16) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px)}

          /* ── REVEAL ── */
          .pl-reveal{opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}
          .pl-visible{opacity:1;transform:translateY(0)}

          /* ── SHARED ── */
          .pl-sec{padding:80px 40px;position:relative;z-index:1}
          .pl-in{max-width:1280px;margin:0 auto}
          .pl-white{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08)}
          .pl-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block}
          .pl-h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:10px}
          .pl-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}

          /* ── GLASS ── */
          .pl-glass{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color .22s,box-shadow .22s,transform .22s}
          .pl-glass:hover{border-color:rgba(217,119,6,0.25);box-shadow:0 8px 36px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px)}
          .pl-icon{width:44px;height:44px;background:linear-gradient(135deg,rgba(15,52,96,0.10),rgba(15,52,96,0.06));border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;flex-shrink:0}
          .pl-icon svg{width:20px;height:20px;color:#0F3460}
          .pl-card-h{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .pl-card-p{font-size:13px;color:#4A6080;line-height:1.65}
          .pl-nbadge{width:40px;height:40px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:800;margin-bottom:16px;box-shadow:0 4px 12px rgba(15,52,96,0.25)}

          /* ── GRIDS ── */
          .pl-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .pl-g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}

          /* ── HERO ── */
          .pl-hero{position:relative;z-index:1;padding:72px 40px 0;overflow:hidden}
          .pl-hero::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.10) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px)}
          .pl-hero::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.16) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px)}
          .pl-hero-inner{position:relative;z-index:2;text-align:center;max-width:920px;margin:0 auto}
          .pl-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .pl-bc a{color:#6b7280;text-decoration:none}.pl-bc a:hover{color:#D97706}.pl-bc-sep{color:#d1d5db}
          .pl-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px}
          .pl-h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:18px;color:#0F1F40}
          .pl-hero-sub{font-size:16px;color:#3A507A;line-height:1.65;max-width:660px;margin:0 auto 28px}
          .pl-btns{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:32px}
          .pl-btn-p{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);border-radius:50px;color:#fff;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,0.25)}
          .pl-btn-p:hover{background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,0.30)}
          .pl-btn-s{display:inline-flex;align-items:center;padding:14px 32px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .pl-btn-s:hover{background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);transform:translateY(-2px)}

          /* ── STATS BAR ── */
          .pl-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95)}
          .pl-stat{padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10)}
          .pl-stat:last-child{border-right:none}
          .pl-stat-v{font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1;margin-bottom:6px}
          .pl-stat-l{font-size:12px;color:#4A6080;font-weight:500}

          /* ── DARK SECTION ── */
          .pl-dark{padding:80px 40px;background:linear-gradient(135deg,#071e3d 0%,#0F3460 40%,#0a2549 100%);position:relative;z-index:1}
          .pl-dark-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.55);display:block;margin-bottom:10px}
          .pl-dark-h{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#fff;margin-bottom:10px}
          .pl-dark-lead{font-size:15px;color:rgba(255,255,255,0.65);line-height:1.7;max-width:640px;margin-bottom:40px}
          .pl-res-card{background:rgba(255,255,255,0.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:28px 20px;text-align:center;transition:border-color .2s}
          .pl-res-card:hover{border-color:rgba(217,119,6,0.50)}
          .pl-res-metric{font-size:clamp(2.2rem,4vw,3.2rem);font-weight:900;color:#D97706;letter-spacing:-1px;line-height:1;margin-bottom:8px}
          .pl-res-label{font-size:13px;font-weight:700;color:rgba(255,255,255,0.85);margin-bottom:6px}
          .pl-res-detail{font-size:11px;color:rgba(255,255,255,0.50);line-height:1.5}

          /* ── KEYWORD PILLS ── */
          .pl-pills{display:flex;flex-wrap:wrap;gap:10px}
          .pl-pill{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.85);border-radius:50px;padding:8px 16px;font-size:13px;font-weight:500;color:#0F1F40;box-shadow:0 2px 8px rgba(15,52,96,0.06)}
          .pl-pill-dot{width:6px;height:6px;border-radius:50%;background:#D97706;flex-shrink:0}

          /* ── TESTIMONIALS ── */
          .pl-testi{padding:72px 0;background:#f8fafd;overflow:hidden;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1}
          .pl-testi-hd{max-width:1280px;margin:0 auto 40px;padding:0 40px;text-align:center}
          @keyframes pl-marqL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          @keyframes pl-marqR{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
          .pl-trow{overflow:hidden;position:relative;margin-bottom:16px}
          .pl-trow:last-child{margin-bottom:0}
          .pl-tfade-l{position:absolute;left:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to right,#f8fafd,transparent);pointer-events:none}
          .pl-tfade-r{position:absolute;right:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to left,#f8fafd,transparent);pointer-events:none}
          .pl-ttrack{display:flex;gap:20px;width:max-content;padding-left:20px;animation:pl-marqL 44s linear infinite;will-change:transform}
          .pl-ttrack-rev{display:flex;gap:20px;width:max-content;padding-left:20px;animation:pl-marqR 44s linear infinite;will-change:transform}
          .pl-trow:hover .pl-ttrack,.pl-trow:hover .pl-ttrack-rev{animation-play-state:paused}
          .pl-tcard{width:400px;flex-shrink:0;background:#fff;border:1px solid rgba(15,52,96,0.08);border-radius:16px;padding:24px;box-shadow:0 2px 16px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:12px;user-select:none;transition:border-color .2s}
          .pl-tcard:hover{border-color:rgba(217,119,6,0.30)}
          .pl-tcard-stars{color:#F59E0B;font-size:14px}
          .pl-tcard-text{font-size:14px;color:#374151;line-height:1.75;margin:0;flex-grow:1}
          .pl-tcard-author{display:flex;align-items:center;gap:12px;border-top:1px solid #f3f4f6;padding-top:14px}
          .pl-tcard-av{width:38px;height:38px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:12px}
          .pl-tcard-name{font-weight:700;color:#111827;font-size:13px}
          .pl-tcard-role{color:#9ca3af;font-size:11px;margin-top:1px}

          /* ── CONTACT ── */
          .pl-contact-sec{padding:80px 40px;position:relative;z-index:1}
          .pl-contact-in{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:48px}
          .pl-contact-left h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.2;margin:0 0 16px;color:#0F1F40;letter-spacing:-0.5px}
          .pl-contact-left p{font-size:14px;color:#4A6080;line-height:1.65;margin:0 0 24px}
          .pl-trust-box{background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1.5px solid rgba(217,119,6,0.25);border-radius:16px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:14px}
          .pl-trust-row{display:flex;gap:12px;align-items:flex-start}
          .pl-trust-row svg{color:#D97706;flex-shrink:0;margin-top:2px}
          .pl-trust-row span{font-size:13px;color:#4A6080;line-height:1.55}
          .pl-cs{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:20px;border-top:1px solid rgba(15,52,96,0.10)}
          .pl-cs-num{font-size:32px;font-weight:900;color:#0F3460;line-height:1;margin-bottom:4px}
          .pl-cs-lbl{font-size:12px;color:#4A6080;font-weight:500;line-height:1.4}
          .pl-form-box{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .pl-form-box h3{font-size:20px;font-weight:700;margin:0 0 22px;color:#0F1F40;letter-spacing:-0.5px}
          .pl-form{display:flex;flex-direction:column;gap:14px}
          .pl-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .pl-fg{display:flex;flex-direction:column;gap:5px}
          .pl-fg label{font-size:12px;font-weight:600;color:#0F1F40}
          .pl-fg input,.pl-fg textarea,.pl-fg select{padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:8px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.60);transition:border-color .2s,background .2s;width:100%}
          .pl-fg input:focus,.pl-fg textarea:focus,.pl-fg select:focus{outline:none;border-color:#D97706;background:rgba(255,255,255,0.95);box-shadow:0 0 0 3px rgba(217,119,6,0.12)}
          .pl-fg textarea{resize:vertical}
          .pl-phone-wrap{display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:8px;overflow:hidden;background:rgba(255,255,255,0.60)}
          .pl-phone-wrap select{padding:10px;border:none;background:transparent;font-size:12px;width:auto!important;min-width:70px;max-width:90px;color:#0F1F40;font-family:inherit;flex-shrink:0}
          .pl-phone-wrap input{flex:1!important;width:auto!important;min-width:0!important;border:none!important;border-radius:0!important;padding:10px 14px!important;background:rgba(255,255,255,0.60)!important}
          .pl-phone-wrap input:focus{outline:none!important;box-shadow:none!important;background:rgba(255,255,255,0.95)!important}
          .pl-consent{display:flex;gap:8px;align-items:flex-start}
          .pl-consent input[type="checkbox"]{margin-top:3px;width:16px;height:16px;cursor:pointer;flex-shrink:0;accent-color:#D97706}
          .pl-consent label{font-size:11px;color:#4A6080;line-height:1.5;margin:0}
          .pl-consent a{color:#0F3460;text-decoration:none}
          .pl-submit{padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .3s;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25)}
          .pl-submit:hover:not(:disabled){background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px)}
          .pl-submit:disabled{opacity:.65;cursor:not-allowed}
          .pl-success{text-align:center;padding:32px 0}
          .pl-success-icon{width:60px;height:60px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;box-shadow:0 8px 24px rgba(15,52,96,0.25)}
          .pl-success-icon svg{width:28px;height:28px;stroke:#fff;fill:none}
          .pl-success h3{font-size:20px;font-weight:700;color:#0F1F40;margin:0 0 10px}
          .pl-success p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}
          .pl-val-err{background:rgba(220,38,38,0.06);border:1px solid rgba(220,38,38,0.20);border-radius:8px;padding:10px 14px;font-size:13px;color:#dc2626}

          /* ── FAQ ── */
          .pl-faq-list{display:flex;flex-direction:column;gap:12px}
          .pl-fitem{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color .2s,box-shadow .2s;position:relative}
          .pl-fitem.open{border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12)}
          .pl-fitem.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px}
          .pl-fq{width:100%;background:none;border:none;padding:20px 22px 20px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative}
          .pl-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.08);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background .2s,color .2s}
          .pl-fitem.open .pl-fq-badge{background:#D97706;color:#fff}
          .pl-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45}
          .pl-fitem.open .pl-fq-text{color:#D97706}
          .pl-fq-chev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .pl-fitem.open .pl-fq-chev{transform:rotate(180deg);color:#D97706}
          .pl-fa{font-size:14px;color:#4b5563;line-height:1.8;padding:0 22px 20px 60px}

          /* ── RELATED ── */
          .pl-related{background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px;position:relative;z-index:1}
          .pl-related-in{max-width:1280px;margin:0 auto;text-align:center}
          .pl-related-ey{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block}
          .pl-related-ttl{font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#111827;margin:0 0 16px}
          .pl-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px}
          .pl-related-divider{border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0}
          .pl-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}
          .pl-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .25s}
          .pl-rtag:hover{filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10)}
          .pl-rtag-blue{background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8}
          .pl-rtag-violet{background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9}
          .pl-rtag-teal{background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E}
          .pl-rtag-indigo{background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA}
          .pl-rtag-amber{background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309}
          .pl-rtag-green{background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D}
          .pl-rtag-orange{background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C}
          .pl-rtag-rose{background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C}
          .pl-rtag-slate{background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155}
          .pl-rtag-cyan{background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490}

          /* ── PACKAGES ── */
          .pl-tog-row{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:48px}
          .pl-tog-lbl{font-size:15px;font-weight:600;color:#9ca3af;transition:color .2s}
          .pl-tog-lbl.on{color:#0F1F40}
          .pl-tog-btn{width:50px;height:28px;background:#d1d5db;border-radius:100px;position:relative;cursor:pointer;border:none;padding:0;transition:background .25s;flex-shrink:0}
          .pl-tog-btn.active{background:#D97706}
          .pl-tog-knob{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .25s;box-shadow:0 1px 4px rgba(0,0,0,.18)}
          .pl-tog-btn.active .pl-tog-knob{transform:translateX(22px)}
          .pl-save-pill{display:inline-flex;align-items:center;background:rgba(217,119,6,.12);color:#B45309;font-size:11px;font-weight:700;padding:2px 9px;border-radius:100px;margin-left:6px}
          .pl-pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:stretch;padding-top:16px}
          .pl-card{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;position:relative;display:flex;flex-direction:column;transition:transform .22s,box-shadow .22s,border-color .22s;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .pl-card:hover{transform:translateY(-4px);border-color:rgba(217,119,6,.35);box-shadow:0 16px 48px rgba(15,52,96,.14),inset 0 1px 0 rgba(255,255,255,1)}
          .pl-card-pop{background:linear-gradient(180deg,rgba(217,119,6,.08) 0%,rgba(255,255,255,.82) 50%,rgba(219,234,254,.50) 100%);border-color:rgba(217,119,6,.50);box-shadow:0 0 80px rgba(217,119,6,.16),0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.98);transform:scale(1.03)}
          .pl-card-pop:hover{transform:scale(1.03) translateY(-4px)}
          .pl-pop-tag{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:linear-gradient(120deg,#D97706,#ea580c);color:#fff;font-size:11px;font-weight:700;padding:4px 14px;border-radius:999px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;display:inline-flex;align-items:center;gap:5px;box-shadow:0 4px 16px rgba(217,119,6,.45)}
          .pl-plan-name{font-family:'Courier New',ui-monospace,monospace;font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:#6b7280;font-weight:700;margin-bottom:10px}
          .pl-plan-desc{font-size:13px;color:#4A6080;line-height:1.55;margin:0 0 22px}
          .pl-price-row{display:flex;align-items:baseline;gap:4px;margin:8px 0 2px}
          .pl-currency{font-size:1.4rem;font-weight:700;color:#D97706}
          .pl-amount{font-size:44px;font-weight:800;letter-spacing:-.035em;color:#0F1F40;line-height:1}
          .pl-per{font-size:14px;color:#9ca3af;font-weight:500;margin-left:4px}
          .pl-billed{font-size:11px;color:#9ca3af;margin-bottom:4px}
          .pl-save-line{font-size:11px;font-weight:700;color:#16a34a;min-height:16px;margin-bottom:22px}
          .pl-card-div{height:1px;background:rgba(15,52,96,.10);margin:0 0 4px}
          .pl-card-pop .pl-card-div{background:rgba(217,119,6,.25)}
          .pl-feat-list{list-style:none;padding:0;margin:0 0 24px;flex:1}
          .pl-feat-list li{padding:9px 0;border-top:1px dashed rgba(15,52,96,.12);font-size:13px;color:#374151;line-height:1.4}
          .pl-feat-list li::before{content:"✓ ";color:#22c55e;font-weight:700}
          .pl-card-pop .pl-feat-list li{border-top-color:rgba(217,119,6,.22)}
          .pl-cta-card{display:block;width:100%;text-align:center;padding:12px;border-radius:50px;font-weight:700;font-size:.875rem;text-decoration:none;background:rgba(15,52,96,.85);color:#fff;transition:all .22s;box-shadow:0 4px 16px rgba(15,52,96,.20)}
          .pl-cta-card:hover{background:rgba(15,52,96,1);transform:translateY(-1px);box-shadow:0 6px 24px rgba(15,52,96,.30)}
          .pl-rzp-form{width:100%;display:flex;justify-content:flex-start}
          .pl-rzp-form button{width:auto !important;border-radius:50px !important;padding:12px 28px !important;font-weight:700 !important;font-size:.875rem !important;background:rgba(15,52,96,.85) !important;color:#fff !important;border:none !important;cursor:pointer !important;transition:all .22s !important;box-shadow:0 4px 16px rgba(15,52,96,.20) !important}
          .pl-pkg-trust{display:flex;justify-content:center;gap:28px;flex-wrap:wrap;margin-top:32px;padding-top:32px;border-top:1px solid rgba(15,52,96,.08)}
          .pl-pkg-trust span{font-size:13px;color:#6b7280;display:flex;align-items:center;gap:6px;font-weight:500}
          /* comparison table */
          .pl-tbl-wrap{overflow-x:auto;border-radius:16px;border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 20px rgba(15,52,96,.08)}
          .pl-tbl{width:100%;border-collapse:collapse;background:rgba(255,255,255,.75);min-width:600px}
          .pl-tbl th{background:linear-gradient(135deg,#0F3460 0%,#1a3a6e 100%);color:#fff;font-size:12px;font-weight:700;padding:13px 16px;text-align:center}
          .pl-tbl th:first-child{text-align:left;border-radius:12px 0 0 0}
          .pl-tbl th:last-child{border-radius:0 12px 0 0}
          .pl-tbl td{padding:12px 16px;font-size:12px;color:#374151;border-bottom:1px solid rgba(15,52,96,.06);text-align:center}
          .pl-tbl td:first-child{text-align:left;font-weight:600;color:#0F1F40}
          .pl-tbl tr:last-child td{border-bottom:none}
          .pl-tbl tr:hover td{background:rgba(217,119,6,.03)}
          .pl-tbl-y{color:#D97706;font-weight:700}
          .pl-tbl-n{color:#d1d5db}

          /* ── RESPONSIVE ── */
          @media(max-width:1024px){
            .pl-g3{grid-template-columns:repeat(2,1fr)}
            .pl-g4{grid-template-columns:repeat(2,1fr)}
            .pl-contact-in{grid-template-columns:1fr}
            .pl-pkg-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}
            .pl-card-pop{transform:none}.pl-card-pop:hover{transform:translateY(-4px)}
          }
          @media(max-width:768px){
            .pl-hero{padding:56px 24px 0}
            .pl-hero::before,.pl-hero::after{display:none}
            .pl-sec,.pl-dark,.pl-contact-sec,.pl-related,.pl-testi{padding-left:24px;padding-right:24px}
            .pl-testi-hd{padding:0 24px}
            .pl-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}
            .pl-stat:nth-child(2){border-right:none}
            .pl-stat:nth-child(3){border-top:1px solid rgba(15,52,96,0.10)}
            .pl-stat:nth-child(4){border-top:1px solid rgba(15,52,96,0.10);border-right:none}
            .pl-btns{flex-direction:column;align-items:center}
            .pl-g3{grid-template-columns:1fr}
            .pl-g4{grid-template-columns:repeat(2,1fr)}
            .pl-row2{grid-template-columns:1fr}
            .pl-tcard{width:300px}
            .pl-related-ttl{font-size:28px}
            /* ── MOBILE PERFORMANCE ── */
            .pl-orb1,.pl-orb2,.pl-orb3{display:none}
            .pl-glass,.pl-form-box,.pl-trust-box,.pl-stats,.pl-fitem{backdrop-filter:none;-webkit-backdrop-filter:none}
            .pl-btn-p,.pl-btn-s,.pl-submit{backdrop-filter:none;-webkit-backdrop-filter:none}
            .pl-res-card,.pl-pill{backdrop-filter:none;-webkit-backdrop-filter:none}
            .pl-related{backdrop-filter:none;-webkit-backdrop-filter:none}
            .pl-card{backdrop-filter:none;-webkit-backdrop-filter:none}
            .pl-trow:last-child{display:none}
          }
          @media(max-width:480px){
            .pl-tcard{width:270px;padding:18px}
            .pl-related-ttl{font-size:24px}
            .pl-g4{grid-template-columns:1fr 1fr}
          }
        `}</style>
      </Head>

      <div className="pl-page">
        <div className="pl-orb1"/><div className="pl-orb2"/><div className="pl-orb3"/>

        {/* ── HERO ── */}
        <section className="pl-hero">
          <div className="pl-hero-inner">
            <nav className="pl-bc" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="pl-bc-sep">/</span>
              <Link href="/seo-services-company/">SEO Services</Link>
              <span className="pl-bc-sep">/</span>
              <span style={{color:'#D97706'}}>Plumbing SEO Services</span>
            </nav>
            <span className="pl-eyebrow">Plumbing SEO · Emergency Keywords · Maps Pack · GBP Optimisation</span>
            <h1 className="pl-h1">Plumbing SEO That Fills Your Calendar<br/>with <AuroraText>Emergency Calls</AuroraText></h1>
            <p className="pl-hero-sub">1Solutions delivers targeted plumbing SEO that puts your business in front of homeowners at the exact moment they need a plumber — whether it is a burst pipe at midnight or a water heater quote next week. Map pack rankings, emergency keyword pages, and a review engine that keeps calls flowing.</p>
            <div className="pl-btns">
              <a href="#pl-contact" className="pl-btn-p">
                Get Your Free Plumbing SEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#packages" className="pl-btn-s">View Packages</a>
            </div>
            <div className="pl-stats">
              {STATS_HERO.map(s => (
                <div key={s.label} className="pl-stat">
                  <div className="pl-stat-v">{s.val}</div>
                  <div className="pl-stat-l">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KEYWORD TYPES ── */}
        <section className="pl-sec pl-white">
          <div className="pl-in">
            <div className="pl-reveal">
              <span className="pl-ey">Keywords We Rank You For</span>
              <h2 className="pl-h2">Every Search Intent Covered — <AuroraText>Emergency to Planned</AuroraText></h2>
              <p className="pl-lead">Plumbing searches fall into two intent categories. We build dedicated pages for both — emergency (call now) and planned (get a quote) — so you capture every type of potential customer.</p>
            </div>
            <div className="pl-pills pl-reveal">
              {KEYWORD_TYPES.map((k, i) => (
                <span key={k} className="pl-pill" style={{transitionDelay:`${i*40}ms`}}>
                  <span className="pl-pill-dot"/>
                  {k}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="pl-sec" id="services">
          <div className="pl-in">
            <div className="pl-reveal">
              <span className="pl-ey">What We Do</span>
              <h2 className="pl-h2">Full-Spectrum <AuroraText>Plumbing SEO Services</AuroraText></h2>
              <p className="pl-lead">Every component your plumbing business needs to dominate local search — from emergency keyword pages and GBP optimisation to citation building and review velocity systems.</p>
            </div>
            <div className="pl-g3">
              {SERVICES.map((s, i) => (
                <div key={s.title} className="pl-glass pl-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="pl-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon}/>
                    </svg>
                  </div>
                  <div className="pl-card-h">{s.title}</div>
                  <div className="pl-card-p">{s.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS DARK ── */}
        <section className="pl-dark">
          <div className="pl-in">
            <div className="pl-reveal" style={{textAlign:'center',marginBottom:48}}>
              <span className="pl-dark-ey">Proven Results</span>
              <h2 className="pl-dark-h"><AuroraText>Real Plumbing SEO Results</AuroraText> — Calls, Rankings, Revenue</h2>
              <p className="pl-dark-lead" style={{margin:'0 auto'}}>Real metrics from real plumbing businesses across the US, UK, Canada, and Australia.</p>
            </div>
            <div className="pl-g4 pl-reveal">
              {RESULTS.map(r => (
                <StatCard key={r.label} {...r}/>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="pl-sec pl-white" id="process">
          <div className="pl-in">
            <div className="pl-reveal">
              <span className="pl-ey">How It Works</span>
              <h2 className="pl-h2">Our <AuroraText>6-Step Plumbing SEO Process</AuroraText></h2>
              <p className="pl-lead">A structured, repeatable roadmap from initial audit to ongoing call growth — built specifically for plumbing businesses and their unique local search dynamics.</p>
            </div>
            <div className="pl-g3">
              {PROCESS.map((p, i) => (
                <div key={p.n} className="pl-glass pl-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="pl-nbadge">{p.n}</div>
                  <div className="pl-card-h">{p.title}</div>
                  <div className="pl-card-p">{p.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="pl-sec" id="why-us">
          <div className="pl-in">
            <div className="pl-reveal">
              <span className="pl-ey">Why 1Solutions</span>
              <h2 className="pl-h2">The Plumbing SEO Agency <AuroraText>Built for Local Dominance</AuroraText></h2>
              <p className="pl-lead">We specialise in the unique search behaviour of homeowners seeking plumbers — and we build every strategy around putting your number in their hand first.</p>
            </div>
            <div className="pl-g3">
              {WHY.map((w, i) => (
                <div key={w.title} className="pl-glass pl-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="pl-nbadge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div className="pl-card-h">{w.title}</div>
                  <div className="pl-card-p">{w.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section className="pl-sec pl-white" id="packages">
          <div className="pl-in">
            <div className="pl-reveal" style={{textAlign:'center'}}>
              <span className="pl-ey">Plumbing SEO Packages</span>
              <h2 className="pl-h2">Simple, Transparent <AuroraText>Plumbing SEO Pricing</AuroraText></h2>
              <p className="pl-lead" style={{margin:'0 auto 44px'}}>No setup fee. No lock-in contracts. Cancel any month. All packages include a kick-off call and onboarding.</p>
              <div className="pl-tog-row">
                <span className={`pl-tog-lbl${!isYearly ? ' on' : ''}`}>Monthly</span>
                <button
                  className={`pl-tog-btn${isYearly ? ' active' : ''}`}
                  onClick={() => setIsYearly(v => !v)}
                  aria-label="Toggle billing period"
                >
                  <span className="pl-tog-knob"/>
                </button>
                <span className={`pl-tog-lbl${isYearly ? ' on' : ''}`}>
                  Yearly <span className="pl-save-pill">Save 17%</span>
                </span>
              </div>
            </div>
            <div className="pl-pkg-grid pl-reveal">
              {PACKAGES.map(pkg => (
                <div key={pkg.slug} className={`pl-card${pkg.popular ? ' pl-card-pop' : ''}`}>
                  {pkg.popular && <span className="pl-pop-tag">✦ Most Popular</span>}
                  <div className="pl-plan-name">{pkg.name}</div>
                  <div className="pl-price-row">
                    <span className="pl-currency">$</span>
                    <span className="pl-amount">{isYearly ? pkg.yearlyPrice : pkg.monthlyPrice}</span>
                    <span className="pl-per">/mo</span>
                  </div>
                  <div className="pl-billed">{isYearly ? 'Billed annually' : 'Billed monthly'}</div>
                  <div className="pl-save-line">{isYearly ? `Save $${pkg.yearlySave.toLocaleString()} per year` : ' '}</div>
                  <p className="pl-plan-desc">{pkg.desc}</p>
                  {(isYearly ? pkg.yearlyButtonId : pkg.monthlyButtonId)
                    ? <RazorpayButton buttonId={isYearly ? pkg.yearlyButtonId : pkg.monthlyButtonId}/>
                    : <a href="#pl-contact" className="pl-cta-card">Get Started →</a>
                  }
                  <div className="pl-card-div"/>
                  <ul className="pl-feat-list">
                    {pkg.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="pl-pkg-trust pl-reveal">
              {['No setup fee','Cancel with 30 days notice','Custom plans for 4+ locations','Free kick-off audit included'].map(t => (
                <span key={t}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="pl-sec" id="compare">
          <div className="pl-in">
            <div className="pl-reveal">
              <span className="pl-ey">Feature Breakdown</span>
              <h2 className="pl-h2"><AuroraText>Package Comparison</AuroraText> at a Glance</h2>
              <p className="pl-lead">See exactly what is included at each tier before you choose.</p>
              <div className="pl-tbl-wrap">
                <table className="pl-tbl">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Starter — $499/mo</th>
                      <th>Growth — $899/mo</th>
                      <th>Authority — $1,499/mo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Locations covered','1','1','Up to 3'],
                      ['GBP posts per month','4','8','12 per location'],
                      ['Service + suburb pages','5 pages','Up to 12','Unlimited'],
                      ['Local citations per month','20','40','80+'],
                      ['Plumbing keywords tracked','10','25','50+'],
                      ['Review monitoring','Alerts only','Active management','Full management'],
                      ['SMS + email review automation','✗','✓','✓'],
                      ['Competitor gap analysis','✗','✓','✓'],
                      ['Emergency keyword strategy','✗','✓','✓'],
                      ['Schema markup','Basic','Full suite','Full suite + rich results'],
                      ['Monthly content pieces','✗','✗','2×/month'],
                      ['Dedicated account manager','✗','✗','✓'],
                      ['Reporting','Monthly','Monthly + call','Weekly tracking'],
                    ].map(([feat, ...cols]) => (
                      <tr key={feat}>
                        <td>{feat}</td>
                        {cols.map((v, i) => (
                          <td key={i} className={v === '✗' ? 'pl-tbl-n' : 'pl-tbl-y'}>{v}</td>
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
        <section className="pl-testi">
          <div className="pl-testi-hd pl-reveal">
            <span className="pl-ey">Client Reviews</span>
            <h2 className="pl-h2">What Our <AuroraText>Plumbing SEO Clients</AuroraText> Say</h2>
            <p style={{fontSize:15,color:'#4A6080',lineHeight:1.7,maxWidth:600,margin:'0 auto'}}>Trusted by plumbing businesses across the US, UK, Canada, and Australia for 15+ years.</p>
          </div>
          <div style={{marginTop:40}}>
            <div className="pl-trow">
              <div className="pl-tfade-l"/><div className="pl-tfade-r"/>
              <div className="pl-ttrack">
                {ROW1.map((t, i) => (
                  <div key={i} className="pl-tcard">
                    <div className="pl-tcard-stars">★★★★★</div>
                    <p className="pl-tcard-text">{t.text}</p>
                    <div className="pl-tcard-author">
                      <div className="pl-tcard-av" style={{background:t.bg}}>{t.initials}</div>
                      <div>
                        <div className="pl-tcard-name">{t.name}</div>
                        <div className="pl-tcard-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pl-trow">
              <div className="pl-tfade-l"/><div className="pl-tfade-r"/>
              <div className="pl-ttrack-rev">
                {ROW2.map((t, i) => (
                  <div key={i} className="pl-tcard">
                    <div className="pl-tcard-stars">★★★★★</div>
                    <p className="pl-tcard-text">{t.text}</p>
                    <div className="pl-tcard-author">
                      <div className="pl-tcard-av" style={{background:t.bg}}>{t.initials}</div>
                      <div>
                        <div className="pl-tcard-name">{t.name}</div>
                        <div className="pl-tcard-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section className="pl-contact-sec" id="pl-contact">
          <div className="pl-contact-in">
            <div className="pl-reveal">
              <span className="pl-ey">Free Plumbing SEO Audit</span>
              <div className="pl-contact-left">
                <h2>Get Your Free <AuroraText>Plumbing SEO Audit</AuroraText></h2>
                <p>We will audit your GBP, website, and local citations — identify every gap between you and your map pack competitors — and deliver a prioritised action plan completely free with no obligation.</p>
              </div>
              <div className="pl-trust-box">
                {[
                  'Reviewed by a plumbing SEO specialist — not a junior account manager',
                  'Covers your GBP, website, citations, and competitor benchmarks',
                  'Delivered within 48 hours of your request',
                  'No hard sell — honest expert advice on your actual gaps',
                ].map(b => (
                  <div key={b} className="pl-trust-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{b}</span>
                  </div>
                ))}
                <div className="pl-cs">
                  {[['150+','Plumbing Clients'],['15+','Years Experience'],['94%','Client Retention']].map(([n,l]) => (
                    <div key={l}><div className="pl-cs-num">{n}</div><div className="pl-cs-lbl">{l}</div></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pl-form-box pl-reveal">
              <h3>Request Your Free Audit</h3>
              {formSt === 'success' ? (
                <div className="pl-success">
                  <div className="pl-success-icon">
                    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>A plumbing SEO specialist will review your GBP and website and be in touch within 48 hours.</p>
                </div>
              ) : (
                <form className="pl-form" onSubmit={handleSubmit} noValidate>
                  {formSt === 'validation' && <p className="pl-val-err">Please complete all fields and accept the terms before submitting.</p>}
                  {formSt === 'error'      && <p className="pl-val-err">Something went wrong. Please try again or email us directly.</p>}
                  <div className="pl-row2">
                    <div className="pl-fg">
                      <label htmlFor="pl-name">Full Name *</label>
                      <input id="pl-name" name="pl-name" type="text" placeholder="John Smith" required/>
                    </div>
                    <div className="pl-fg">
                      <label htmlFor="pl-email">Business Email *</label>
                      <input id="pl-email" name="pl-email" type="email" placeholder="john@plumbingco.com" required/>
                    </div>
                  </div>
                  <div className="pl-row2">
                    <div className="pl-fg">
                      <label>Phone Number *</label>
                      <div className="pl-phone-wrap">
                        <select name="pl-cc" aria-label="Country code">
                          <option value="+1">+1 US</option>
                          <option value="+1">+1 CA</option>
                          <option value="+61">+61 AU</option>
                          <option value="+44">+44 GB</option>
                          <option value="+91">+91 IN</option>
                        </select>
                        <input name="pl-phone" type="tel" placeholder="Phone number" required aria-label="Phone number"/>
                      </div>
                    </div>
                    <div className="pl-fg">
                      <label htmlFor="pl-biz">Business Name *</label>
                      <input id="pl-biz" name="pl-biz" type="text" placeholder="Smith Plumbing Services" required/>
                    </div>
                  </div>
                  <div className="pl-fg">
                    <label htmlFor="pl-city">City / Service Area *</label>
                    <input id="pl-city" name="pl-city" type="text" placeholder="e.g. Dallas, TX or Manchester, UK" required/>
                  </div>
                  <div className="pl-fg">
                    <label htmlFor="pl-msg">Tell Us About Your Goals *</label>
                    <textarea id="pl-msg" name="pl-msg" rows={4} placeholder="Current GBP position, main competitors, services you want to rank for, monthly call target..." required/>
                  </div>
                  <div className="pl-consent">
                    <input type="checkbox" id="pl-consent"/>
                    <label htmlFor="pl-consent">
                      I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions storing my data to respond to this enquiry. *
                    </label>
                  </div>
                  <button type="submit" className="pl-submit" disabled={formSt === 'loading'}>
                    {formSt === 'loading' ? 'Sending...' : 'Send My Free Audit Request →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="pl-sec pl-white" id="faq">
          <div className="pl-in" style={{maxWidth:860,margin:'0 auto'}}>
            <div className="pl-reveal" style={{textAlign:'center',marginBottom:40}}>
              <span className="pl-ey">Got Questions?</span>
              <h2 className="pl-h2"><AuroraText>Plumbing SEO</AuroraText> FAQs</h2>
              <p className="pl-lead" style={{margin:'0 auto'}}>Everything you need to know before starting a plumbing SEO campaign.</p>
            </div>
            <div className="pl-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={'pl-fitem' + (openFaq === i ? ' open' : '')}>
                  <button className="pl-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="pl-fq-badge">{String(i+1).padStart(2,'0')}</span>
                    <span className="pl-fq-text">{f.q}</span>
                    <svg className="pl-fq-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFaq === i && <div className="pl-fa">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="pl-related">
          <div className="pl-related-in pl-reveal">
            <span className="pl-related-ey">EXPLORE RELATED SERVICES</span>
            <h2 className="pl-related-ttl">Related <AuroraText>SEO & Digital Marketing</AuroraText> Services</h2>
            <p className="pl-related-sub">Pair plumbing SEO with complementary services to dominate local search across every channel your customers use.</p>
            <hr className="pl-related-divider"/>
            <div className="pl-related-tags">
              {RELATED_TAGS.map(({href, label, cls}) => (
                <Link key={href} href={href} className={`pl-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
