import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'California Local SEO', desc: 'Google Business Profile optimisation, local citation building, and geo-targeted content for every California market — from Los Angeles to Sacramento, San Diego to the Bay Area.' },
  { n: '02', title: 'Technical SEO Audits', desc: 'Core Web Vitals, crawlability, site architecture, duplicate content, canonical tags, structured data, and mobile performance — fixing every technical issue holding your California rankings back.' },
  { n: '03', title: 'Keyword Research & Strategy', desc: 'California-specific keyword research mapping high-intent commercial queries to the right pages — targeting buyers in your exact service area, not generic statewide traffic.' },
  { n: '04', title: 'On-Page SEO Optimisation', desc: 'Title tags, meta descriptions, header structure, internal linking, schema markup, and content optimisation — every on-page signal tuned to rank for competitive California search queries.' },
  { n: '05', title: 'Content Marketing & SEO Copywriting', desc: 'Long-form SEO content, location pages, blog strategy, and pillar page architecture — building topical authority that earns organic traffic and backlinks in the California market.' },
  { n: '06', title: 'Link Building for California', desc: 'Authority link acquisition from California news outlets, local directories, chambers of commerce, industry associations, and relevant regional publishers — the signals that move competitive rankings.' },
  { n: '07', title: 'eCommerce SEO', desc: 'Product page optimisation, category architecture, Google Shopping feeds, and ecommerce schema for California-based online retailers competing in the US market.' },
  { n: '08', title: 'SEO Reporting & Analytics', desc: 'Monthly ranking reports, Google Search Console analysis, traffic attribution, and conversion tracking — clear visibility into what your California SEO investment is producing.' },
];

const CITIES = [
  'Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento',
  'Fresno', 'Oakland', 'Long Beach', 'Bakersfield', 'Anaheim',
  'Santa Ana', 'Riverside', 'Irvine', 'Stockton', 'Chula Vista',
  'Fremont', 'San Bernardino', 'Modesto', 'Fontana', 'Moreno Valley',
];

const INDUSTRIES = [
  'Technology & SaaS', 'Real Estate', 'Legal Services', 'Healthcare & Medical',
  'Hospitality & Restaurants', 'Finance & Insurance', 'Retail & eCommerce',
  'Home Services', 'Construction & Contracting', 'Education',
];

const PROCESS = [
  { step: '01', title: 'California SEO Audit', desc: 'We audit your current rankings, technical health, backlink profile, content gaps, and Google Business Profile — benchmarked against the top competitors in your specific California market.' },
  { step: '02', title: 'Keyword & Market Strategy', desc: 'Mapping high-intent California search queries to your service pages — city-level, county-level, and industry-specific keyword targets prioritised by search volume, competition, and commercial value.' },
  { step: '03', title: 'Technical & On-Page Fixes', desc: 'Resolving crawl errors, page speed issues, duplicate content, and thin pages — implementing schema markup, internal linking architecture, and on-page optimisation across your key landing pages.' },
  { step: '04', title: 'Content & Location Pages', desc: 'Building or optimising location-specific content for the California cities and service areas most valuable to your business — unique, useful content that earns rankings, not thin templates.' },
  { step: '05', title: 'Authority & Link Building', desc: 'Earning high-quality backlinks from California-relevant sources — local press, industry publications, directories, and digital PR — the authority signals that separate page-one rankings from page two.' },
  { step: '06', title: 'Monthly Reporting & Iteration', desc: 'Transparent monthly reports showing keyword movements, organic traffic growth, conversion attribution, and priority actions for the next 30 days — measurable progress every month.' },
];

const WHY = [
  { title: '15+ Years of SEO Experience', desc: 'Active in SEO since 2009 — through every major Google algorithm update, the Panda, Penguin, Hummingbird, BERT, and Helpful Content updates. We have survived every shake-up because we build SEO on fundamentals that hold, not tactics that expire.' },
  { title: 'California Market Knowledge', desc: 'We understand the competitive dynamics of the California search landscape — from the hyper-competitive Los Angeles and Bay Area markets to emerging opportunities in Central Valley cities and Southern California suburbs.' },
  { title: 'Integrated SEO + Content', desc: 'Rankings require both technical optimisation and content that deserves to rank. We build both in-house — technical SEO, keyword strategy, and content production are all delivered by the same team, not outsourced to generalists.' },
  { title: 'Business Outcomes First', desc: 'We track leads, enquiries, and revenue attributed to organic search — not just keyword positions. If rankings are climbing but calls are not, we diagnose and fix the conversion gap, not just report the numbers.' },
  { title: 'Transparent Month-by-Month', desc: 'No lock-in contracts. We work month-to-month and provide full reporting access — Google Search Console, keyword rank tracker, and traffic analytics — so you always see exactly what your California SEO programme is producing.' },
  { title: 'Multi-Industry Experience', desc: 'We have delivered California SEO results in legal, real estate, healthcare, SaaS, home services, hospitality, finance, and retail — sector experience that means we understand your buyers, your compliance requirements, and your competitive environment.' },
];

const FAQS = [
  { q: 'How long does SEO take to produce results in California?', a: 'For most California businesses, meaningful organic ranking improvements appear within 3 to 6 months for low-to-medium competition keywords, and 6 to 12 months for competitive markets like Los Angeles, San Francisco, and San Diego. California\'s major city markets are among the most competitive in the US, so realistic timelines depend heavily on your specific keywords, current domain authority, and the strength of existing competitors. We provide honest timeline estimates in your initial audit based on your specific competitive landscape — not generic promises.' },
  { q: 'Do you specialise in specific California cities?', a: 'We serve businesses across the entire state of California — Los Angeles, San Francisco, San Diego, San Jose, Sacramento, the East Bay, Orange County, the Inland Empire, Central Valley, and beyond. For businesses with multiple California locations, we build geo-targeted strategies covering every service area with dedicated location content, city-specific keyword targeting, and GBP optimisation for each location.' },
  { q: 'What industries do you serve for California SEO?', a: 'We have worked across most California industries — technology and SaaS, real estate, legal services, healthcare and medical practices, hospitality and restaurants, home services (HVAC, plumbing, landscaping), construction and contracting, finance and insurance, retail and ecommerce, and education. Industry experience matters in SEO because different sectors have different search behaviour, content requirements, and competitive dynamics. We apply sector-specific knowledge, not generic SEO templates.' },
  { q: 'How much does California SEO cost?', a: 'California SEO pricing depends on your market competitiveness, the number of target keywords and locations, and the scope of technical and content work required. As a guide: local SEO for a single-location California business typically ranges from $800 to $2,500 per month; multi-location or statewide programmes range from $2,500 to $6,000+ per month; highly competitive markets (law, real estate, healthcare in LA or SF) require more investment to be competitive. We provide a custom scope and pricing after your initial audit — we do not quote without understanding your specific situation.' },
  { q: 'Can you help with both local and national SEO from California?', a: 'Yes. Many California businesses need both local visibility (Google Maps, near-me searches) and national organic rankings (broad industry terms). We build integrated strategies that cover both — local SEO for foot traffic and city-specific leads, and national SEO for expanding reach beyond California. This is especially common for California-based SaaS companies, ecommerce businesses, and professional services firms serving clients across the US.' },
  { q: 'Do you work with California businesses remotely?', a: 'Yes, entirely remotely. All our SEO work is delivered remotely — strategy, implementation, content, reporting, and communication. We work across time zones with California clients through asynchronous updates and monthly or bi-weekly calls. The majority of our US client base is managed remotely with no impact on quality or communication. Most clients find that monthly reporting calls and a shared tracking dashboard provide all the visibility they need.' },
  { q: 'What makes California SEO different from SEO in other states?', a: 'California is the most competitive state for SEO in several industries — technology, legal, real estate, and healthcare in particular. The LA and SF Bay Area markets are among the most contested local search environments in the country. At the same time, California\'s diverse geography creates significant opportunity in less contested markets — Central Valley cities, Inland Empire, and North California — where quality SEO produces faster results. We tailor strategy to your specific California market, not a one-size-fits-all approach.' },
  { q: 'Do you offer SEO audits for California businesses?', a: 'Yes. We offer comprehensive SEO audits covering technical health, on-page optimisation, backlink profile, keyword gap analysis, competitor benchmarking, and local SEO signals — tailored to your California market and industry. Audits are available as a standalone service or as the first phase of an ongoing programme. The audit provides a prioritised action plan so you can see exactly what is holding your California rankings back and what the highest-impact fixes are.' },
];

const STATS = [
  { label: 'SEO Clients Served', val: '500+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Industries Covered', val: '40+' },
  { label: 'Client Retention', val: '97%' },
];

const RESULTS = [
  { metric: '340%', label: 'Organic traffic growth', sub: 'California legal services firm — 12 months' },
  { metric: '4.1×', label: 'Leads from organic search', sub: 'LA real estate client — 8 months' },
  { metric: '#1', label: 'Google ranking achieved', sub: 'San Diego home services business' },
];

export default function SeoServicesCalifornia() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null);
  const stepRefs = useRef([]);
  const whyRef = useRef(null);

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'SEO Services California', item: 'https://www.1solutions.biz/seo-services-california/' },
        ],
      },
      {
        '@type': 'Service',
        name: 'SEO Services California',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'SEO services for California businesses — local SEO, technical SEO, content marketing, and link building across Los Angeles, San Francisco, San Diego, and all major California markets.',
        areaServed: { '@type': 'State', name: 'California', sameAs: 'https://en.wikipedia.org/wiki/California' },
        serviceType: 'Search Engine Optimisation',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '87', bestRating: '5' },
        url: 'https://www.1solutions.biz/seo-services-california/',
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
        <title>SEO Services California | Los Angeles, San Francisco, San Diego | 1Solutions</title>
        <meta name="description" content="SEO services for California businesses. Local SEO, technical SEO, content marketing & link building across Los Angeles, San Francisco, San Diego & all California markets. 15+ years experience." />
        <meta name="keywords" content="seo services california, california seo company, los angeles seo, san francisco seo, san diego seo, seo agency california, california seo services" />
        <link rel="canonical" href="https://www.1solutions.biz/seo-services-california/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SEO Services California | 1Solutions" />
        <meta property="og:description" content="SEO services for California businesses across Los Angeles, San Francisco, San Diego & beyond. 15+ years experience, 500+ clients." />
        <meta property="og:url" content="https://www.1solutions.biz/seo-services-california/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .calseo-page { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #0F1F40; line-height: 1.6; overflow-x: hidden; }
          .calseo-page *, .calseo-page *::before, .calseo-page *::after { box-sizing: border-box; }

          .calseo-hero { background: linear-gradient(135deg, #0F1F40 0%, #1a2e5a 40%, #114171 80%, #0a1628 100%); position: relative; overflow: hidden; padding: 80px 40px 0; }
          .calseo-orb1 { position: absolute; top: -100px; right: -100px; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(17,65,113,0.60) 0%, transparent 65%); pointer-events: none; filter: blur(40px); }
          .calseo-orb2 { position: absolute; bottom: 0; left: -80px; width: 440px; height: 440px; border-radius: 50%; background: radial-gradient(circle, rgba(254,151,0,0.08) 0%, transparent 65%); pointer-events: none; filter: blur(40px); }
          .calseo-hero-in { max-width: 1280px; margin: 0 auto; position: relative; z-index: 2; text-align: center; }
          .calseo-bc { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 6px; font-size: 12px; color: rgba(255,255,255,0.5); margin-bottom: 24px; font-weight: 500; }
          .calseo-bc a { color: rgba(255,255,255,0.5); text-decoration: none; } .calseo-bc a:hover { color: #FE9700; } .calseo-bc span { color: rgba(255,255,255,0.25); }
          .calseo-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(254,151,0,0.12); border: 1px solid rgba(254,151,0,0.28); border-radius: 100px; padding: 5px 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #FE9700; margin-bottom: 28px; }
          .calseo-h1 { font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 900; line-height: 1.08; letter-spacing: -1.5px; color: #fff; margin-bottom: 20px; max-width: 900px; margin-left: auto; margin-right: auto; }
          .calseo-h1 span { background: linear-gradient(90deg, #FE9700 0%, #FFC14D 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .calseo-sub { font-size: 1.08rem; color: rgba(255,255,255,0.70); line-height: 1.75; max-width: 660px; margin: 0 auto 36px; }
          .calseo-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
          .calseo-btn-p { display: inline-flex; align-items: center; gap: 8px; background: #FE9700; color: #fff; padding: 15px 32px; border-radius: 50px; font-weight: 800; font-size: 0.95rem; text-decoration: none; transition: all 0.25s; box-shadow: 0 4px 20px rgba(254,151,0,0.35); }
          .calseo-btn-p:hover { background: #e08700; box-shadow: 0 8px 36px rgba(254,151,0,0.50); transform: translateY(-2px); }
          .calseo-btn-s { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.08); border: 1.5px solid rgba(255,255,255,0.22); color: #fff; padding: 15px 28px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: all 0.25s; }
          .calseo-btn-s:hover { border-color: rgba(254,151,0,0.60); background: rgba(254,151,0,0.10); transform: translateY(-2px); }
          .calseo-stats { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 900px; margin: 0 auto; background: rgba(255,255,255,0.06); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.10); border-radius: 20px 20px 0 0; }
          .calseo-stat { padding: 20px 24px; text-align: center; border-right: 1px solid rgba(255,255,255,0.07); } .calseo-stat:last-child { border-right: none; }
          .calseo-stat-l { font-size: 11px; color: rgba(255,255,255,0.45); font-weight: 500; margin-bottom: 4px; }
          .calseo-stat-v { font-size: 1.6rem; font-weight: 900; color: #FE9700; letter-spacing: -0.5px; }

          .calseo-svc { background: #f8fafd; padding: 80px 40px; }
          .calseo-svc-in { max-width: 1280px; margin: 0 auto; }
          .calseo-ey { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #114171; margin-bottom: 10px; display: block; }
          .calseo-ttl { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; line-height: 1.15; letter-spacing: -1px; background: linear-gradient(90deg, #0F1F40 0%, #114171 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px; }
          .calseo-dsc { font-size: 15px; color: #4A6080; line-height: 1.7; max-width: 640px; margin-bottom: 44px; }
          .calseo-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
          .calseo-card { background: linear-gradient(135deg, rgba(219,234,254,0.55) 0%, rgba(255,255,255,0.88) 60%, rgba(224,242,254,0.35) 100%); border: 1px solid rgba(255,255,255,0.85); border-radius: 20px; padding: 26px 22px 22px; position: relative; overflow: hidden; box-shadow: 0 4px 24px rgba(17,65,113,0.05); opacity: 0; transform: translateY(20px); transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.22s, border-color 0.22s; }
          .calseo-card.visible { opacity: 1; transform: translateY(0); }
          .calseo-card:hover { transform: translateY(-6px); border-color: rgba(17,65,113,0.20); box-shadow: 0 16px 48px rgba(17,65,113,0.09); }
          .calseo-card-n { position: absolute; top: 8px; right: 14px; font-size: 72px; font-weight: 900; line-height: 1; color: #114171; opacity: 0.05; letter-spacing: -4px; pointer-events: none; user-select: none; }
          .calseo-card h3 { font-size: 15px; font-weight: 700; color: #0F1F40; line-height: 1.3; margin-bottom: 8px; position: relative; z-index: 1; }
          .calseo-card p { font-size: 13px; color: #4A6080; line-height: 1.6; position: relative; z-index: 1; margin: 0; }

          .calseo-cities { background: linear-gradient(135deg, #0F1F40 0%, #114171 100%); padding: 70px 40px; }
          .calseo-cities-in { max-width: 1280px; margin: 0 auto; }
          .calseo-cities-ey { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(254,151,0,0.75); margin-bottom: 12px; display: block; text-align: center; }
          .calseo-cities-ttl { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 900; color: #fff; text-align: center; margin-bottom: 40px; line-height: 1.2; }
          .calseo-cities-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; max-width: 900px; margin: 0 auto 40px; }
          .calseo-city-tag { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 100px; padding: 9px 18px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.80); text-align: center; transition: all 0.2s; }
          .calseo-city-tag:hover { background: rgba(254,151,0,0.12); border-color: rgba(254,151,0,0.35); color: #FE9700; }
          .calseo-ind-ttl { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.45); text-align: center; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
          .calseo-ind-wrap { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; max-width: 900px; margin: 0 auto; }
          .calseo-ind-tag { background: rgba(254,151,0,0.10); border: 1px solid rgba(254,151,0,0.22); border-radius: 100px; padding: 7px 16px; font-size: 12px; font-weight: 600; color: rgba(254,151,0,0.85); }

          .calseo-results { background: #fff; padding: 80px 40px; }
          .calseo-results-in { max-width: 1280px; margin: 0 auto; }
          .calseo-results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 44px; }
          .calseo-result-card { background: linear-gradient(135deg, #f0f9ff 0%, #fff 60%, #f0fdf4 100%); border: 1px solid #e5e7eb; border-radius: 20px; padding: 40px 32px; text-align: center; }
          .calseo-result-m { font-size: 3.5rem; font-weight: 900; color: #114171; line-height: 1; margin-bottom: 10px; letter-spacing: -2px; }
          .calseo-result-l { font-size: 1rem; font-weight: 700; color: #0F1F40; margin-bottom: 8px; }
          .calseo-result-s { font-size: 12.5px; color: #9ca3af; }

          .calseo-proc { background: linear-gradient(135deg, #f0f9ff 0%, #f8fafd 50%, #e0f2fe 100%); padding: 80px 40px; }
          .calseo-proc-in { max-width: 900px; margin: 0 auto; }
          .calseo-steps { display: flex; flex-direction: column; margin-top: 44px; }
          .calseo-step { display: grid; grid-template-columns: 80px 1fr; gap: 24px; align-items: flex-start; padding: 28px 0; border-bottom: 1px solid rgba(17,65,113,0.08); opacity: 0; transform: translateX(-20px); transition: opacity 0.45s ease, transform 0.45s ease; }
          .calseo-step:last-child { border-bottom: none; }
          .calseo-step.visible { opacity: 1; transform: translateX(0); }
          .calseo-step-n { font-size: 3rem; font-weight: 900; color: rgba(17,65,113,0.13); line-height: 1; letter-spacing: -2px; }
          .calseo-step-b h3 { font-size: 1.1rem; font-weight: 800; color: #0F1F40; margin-bottom: 6px; }
          .calseo-step-b p { font-size: 0.9rem; color: #4A6080; line-height: 1.7; margin: 0; }

          .calseo-why { background: #fff; padding: 80px 40px; }
          .calseo-why-in { max-width: 1280px; margin: 0 auto; }
          .calseo-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 44px; }
          .calseo-why-card { background: linear-gradient(135deg, #dbeafe 0%, #fff 60%, #ede9fe 100%); border: 1px solid rgba(17,65,113,0.08); border-radius: 16px; padding: 28px; opacity: 0; transform: translateY(16px); transition: opacity 0.4s ease, transform 0.4s ease; }
          .calseo-why-card.visible { opacity: 1; transform: translateY(0); }
          .calseo-why-card:hover { border-color: rgba(17,65,113,0.20); box-shadow: 0 8px 32px rgba(17,65,113,0.07); }
          .calseo-why-dot { width: 8px; height: 8px; border-radius: 50%; background: #114171; margin-bottom: 16px; }
          .calseo-why-card h3 { font-size: 1rem; font-weight: 800; color: #0F1F40; margin-bottom: 10px; }
          .calseo-why-card p { font-size: 0.88rem; color: #4A6080; line-height: 1.7; margin: 0; }

          .calseo-faq { background: #f8fafd; padding: 80px 40px; }
          .calseo-faq-in { max-width: 860px; margin: 0 auto; }
          .calseo-faq-list { margin-top: 44px; }
          .calseo-faq-item { border-bottom: 1px solid #e5e7eb; }
          .calseo-faq-q { width: 100%; background: none; border: none; text-align: left; padding: 22px 0; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; cursor: pointer; font-family: inherit; font-size: 1rem; font-weight: 700; color: #0F1F40; line-height: 1.4; }
          .calseo-faq-q:hover { color: #114171; }
          .calseo-faq-icon { width: 22px; height: 22px; border: 2px solid #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; color: #9ca3af; transition: all 0.2s; margin-top: 2px; }
          .calseo-faq-item.open .calseo-faq-icon { border-color: #114171; color: #114171; background: rgba(17,65,113,0.06); }
          .calseo-faq-a { font-size: 0.92rem; color: #4A6080; line-height: 1.8; overflow: hidden; max-height: 0; transition: max-height 0.35s ease, padding-bottom 0.35s ease; }
          .calseo-faq-item.open .calseo-faq-a { max-height: 500px; padding-bottom: 22px; }

          .calseo-cta { background: linear-gradient(135deg, #0F1F40 0%, #114171 60%, #0a1628 100%); padding: 90px 40px; position: relative; overflow: hidden; }
          .calseo-cta-o1 { position: absolute; top: -80px; right: -80px; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(254,151,0,0.12) 0%, transparent 70%); pointer-events: none; }
          .calseo-cta-o2 { position: absolute; bottom: -60px; left: -60px; width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%); pointer-events: none; }
          .calseo-cta-in { max-width: 760px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
          .calseo-cta-ttl { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900; color: #fff; margin-bottom: 16px; line-height: 1.2; }
          .calseo-cta-ttl span { background: linear-gradient(90deg, #FE9700 0%, #FFC14D 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .calseo-cta-sub { font-size: 1.05rem; color: rgba(255,255,255,0.70); line-height: 1.75; margin: 0 auto 36px; max-width: 520px; }
          .calseo-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

          @media (max-width: 1024px) { .calseo-grid { grid-template-columns: repeat(2, 1fr); } .calseo-why-grid { grid-template-columns: repeat(2, 1fr); } .calseo-results-grid { grid-template-columns: repeat(2, 1fr); } .calseo-cities-grid { grid-template-columns: repeat(4, 1fr); } }
          @media (max-width: 768px) {
            .calseo-hero { padding: 60px 24px 0; }
            .calseo-svc, .calseo-cities, .calseo-results, .calseo-proc, .calseo-why, .calseo-faq, .calseo-cta { padding: 60px 24px; }
            .calseo-stats { grid-template-columns: repeat(2, 1fr); border-radius: 16px 16px 0 0; }
            .calseo-stat:nth-child(2) { border-right: none; }
            .calseo-grid { grid-template-columns: 1fr; }
            .calseo-why-grid { grid-template-columns: 1fr; }
            .calseo-results-grid { grid-template-columns: 1fr; }
            .calseo-cities-grid { grid-template-columns: repeat(2, 1fr); }
            .calseo-step { grid-template-columns: 56px 1fr; }
            .calseo-btns { flex-direction: column; align-items: center; }
          }
        `}</style>
      </Head>

      <div className="calseo-page">
        <section className="calseo-hero">
          <div className="calseo-orb1" /><div className="calseo-orb2" />
          <div className="calseo-hero-in">
            <nav className="calseo-bc" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span>
              <Link href="/seo-services-company">SEO Services</Link><span>/</span>
              <span style={{ color: '#FE9700' }}>California</span>
            </nav>
            <span className="calseo-badge">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FE9700', display: 'inline-block' }} />
              SEO Services — California
            </span>
            <h1 className="calseo-h1">SEO Services for <span>California Businesses</span></h1>
            <p className="calseo-sub">Rank higher on Google across Los Angeles, San Francisco, San Diego, and every California market that matters to your business. 15+ years of SEO experience, 500+ clients, no lock-in contracts.</p>
            <div className="calseo-btns">
              <Link href="/contact-us" className="calseo-btn-p">
                Get a Free SEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/affordable-seo-packages" className="calseo-btn-s">View SEO Packages</Link>
            </div>
            <div className="calseo-stats">
              {STATS.map(s => (
                <div key={s.label} className="calseo-stat">
                  <div className="calseo-stat-l">{s.label}</div>
                  <div className="calseo-stat-v">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="calseo-svc">
          <div className="calseo-svc-in">
            <span className="calseo-ey">What We Do</span>
            <h2 className="calseo-ttl">Complete California SEO Services</h2>
            <p className="calseo-dsc">Every SEO discipline under one roof — from technical audits and on-page optimisation to content strategy and link building, tailored to California markets.</p>
            <div className="calseo-grid" ref={cardsRef}>
              {SERVICES.map((s, i) => (
                <div key={s.n} className={`calseo-card${visibleCards.includes(i) ? ' visible' : ''}`}>
                  <div className="calseo-card-n">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="calseo-cities">
          <div className="calseo-cities-in">
            <span className="calseo-cities-ey">Coverage</span>
            <h2 className="calseo-cities-ttl">California Cities We Serve</h2>
            <div className="calseo-cities-grid">
              {CITIES.map(c => (
                <div key={c} className="calseo-city-tag">{c}</div>
              ))}
            </div>
            <p className="calseo-ind-ttl">Industries We Serve in California</p>
            <div className="calseo-ind-wrap">
              {INDUSTRIES.map(ind => (
                <span key={ind} className="calseo-ind-tag">{ind}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="calseo-results">
          <div className="calseo-results-in">
            <span className="calseo-ey">Client Results</span>
            <h2 className="calseo-ttl">California SEO Results</h2>
            <p className="calseo-dsc">Real outcomes from real California businesses — measured in traffic, leads, and revenue, not just keyword rankings.</p>
            <div className="calseo-results-grid">
              {RESULTS.map(r => (
                <div key={r.label} className="calseo-result-card">
                  <div className="calseo-result-m">{r.metric}</div>
                  <div className="calseo-result-l">{r.label}</div>
                  <div className="calseo-result-s">{r.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="calseo-proc">
          <div className="calseo-proc-in">
            <span className="calseo-ey">How We Work</span>
            <h2 className="calseo-ttl">Our California SEO Process</h2>
            <p className="calseo-dsc">A structured, transparent approach from audit to rankings — built around your specific California market, competitive landscape, and business goals.</p>
            <div className="calseo-steps">
              {PROCESS.map((p, i) => (
                <div key={p.step} ref={el => { stepRefs.current[i] = el; }} className={`calseo-step${visibleSteps.includes(i) ? ' visible' : ''}`}>
                  <div className="calseo-step-n">{p.step}</div>
                  <div className="calseo-step-b"><h3>{p.title}</h3><p>{p.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="calseo-why">
          <div className="calseo-why-in">
            <span className="calseo-ey">Why 1Solutions</span>
            <h2 className="calseo-ttl">The California SEO Partner That Delivers Results</h2>
            <p className="calseo-dsc">We measure success in organic leads and revenue — not just rankings. Here is why California businesses choose 1Solutions.</p>
            <div className="calseo-why-grid" ref={whyRef}>
              {WHY.map((w, i) => (
                <div key={w.title} className={`calseo-why-card${visibleWhy.includes(i) ? ' visible' : ''}`}>
                  <div className="calseo-why-dot" />
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="calseo-faq">
          <div className="calseo-faq-in">
            <span className="calseo-ey">Got Questions?</span>
            <h2 className="calseo-ttl">California SEO FAQs</h2>
            <p className="calseo-dsc">Straight answers to what California businesses ask us most before starting an SEO programme.</p>
            <div className="calseo-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`calseo-faq-item${openFaq === i ? ' open' : ''}`}>
                  <button className="calseo-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    {f.q}
                    <span className="calseo-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="calseo-faq-a" style={openFaq === i ? { maxHeight: 500, paddingBottom: 22 } : {}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="calseo-cta">
          <div className="calseo-cta-o1" /><div className="calseo-cta-o2" />
          <div className="calseo-cta-in">
            <span className="calseo-ey" style={{ color: 'rgba(254,151,0,0.75)', textAlign: 'center', display: 'block', marginBottom: 16 }}>Ready to Rank in California?</span>
            <h2 className="calseo-cta-ttl">Get Your Free <span>California SEO Audit</span></h2>
            <p className="calseo-cta-sub">We&rsquo;ll audit your current rankings, technical health, backlink profile, and competitors — and deliver a clear action plan for growing your California organic search presence.</p>
            <div className="calseo-cta-btns">
              <Link href="/contact-us" className="calseo-btn-p">
                Request Free SEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/affordable-seo-packages" className="calseo-btn-s">View SEO Packages</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
