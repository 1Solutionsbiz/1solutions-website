'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const RC_KEY = '6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';

const SERVICES = [
  { n: '01', title: 'AI Visibility Audit for Delhi Businesses', desc: 'Test how your brand currently appears across ChatGPT, Perplexity, Google AI Overviews, and Gemini for the queries your Delhi customers actually search - with a gap analysis showing where competitors are cited instead of you.', bg: 'linear-gradient(135deg,#ede9fe 0%,#ddd6fe 100%)', border: 'rgba(139,92,246,.35)' },
  { n: '02', title: 'Citation-Ready Content Restructuring', desc: 'Restructure existing pages for AI citation - clear entity definitions, factual density, and structured claim formats that LLMs prefer to cite over vague marketing copy.', bg: 'linear-gradient(135deg,#eff6ff 0%,#bfdbfe 100%)', border: 'rgba(59,130,246,.35)' },
  { n: '03', title: 'Schema & Entity Markup for AI Engines', desc: 'FAQ, HowTo, Article, and Organization schema that signals content structure to AI crawlers - properly marked-up pages get parsed and cited more reliably by generative models.', bg: 'linear-gradient(135deg,#ecfdf5 0%,#a7f3d0 100%)', border: 'rgba(16,185,129,.35)' },
  { n: '04', title: 'Multi-Platform Brand Mention Tracking', desc: "Monthly (or weekly, on higher plans) tracking of your brand's appearance in AI-generated responses across ChatGPT, Perplexity, Gemini, and Google AI Overviews - citation frequency, sentiment, and accuracy.", bg: 'linear-gradient(135deg,#fefce8 0%,#fde68a 100%)', border: 'rgba(217,119,6,.35)' },
  { n: '05', title: 'E-E-A-T Authority Building', desc: 'Build the experience, expertise, authoritativeness, and trust signals that Google AI Overviews and third-party LLMs use to decide which sources are credible enough to cite.', bg: 'linear-gradient(135deg,#fff7ed 0%,#fed7aa 100%)', border: 'rgba(249,115,22,.35)' },
  { n: '06', title: 'Competitor AI-Visibility Benchmarking', desc: 'See exactly which Delhi competitors are being cited for your target topics, why AI engines prefer their content, and the specific gaps to close to take their place.', bg: 'linear-gradient(135deg,#fdf2f8 0%,#fbcfe8 100%)', border: 'rgba(236,72,153,.35)' },
  { n: '07', title: 'Local + AI Search Integration', desc: 'GEO and local SEO reinforce each other - we tie Google Business Profile, local citations, and location-specific content into your AI-visibility strategy so Delhi-intent queries surface your brand in both.', bg: 'linear-gradient(135deg,#f0fdfa 0%,#99f6e4 100%)', border: 'rgba(20,184,166,.35)' },
  { n: '08', title: 'Monthly GEO Reporting & Analytics', desc: 'A monthly report covering citation appearances, AI Overview presence, brand mention sentiment, and Perplexity/ChatGPT citation frequency alongside your traditional SEO metrics.', bg: 'linear-gradient(135deg,#eef2ff 0%,#c7d2fe 100%)', border: 'rgba(99,102,241,.35)' },
];

const PLATFORMS = ['Google AI Overviews', 'ChatGPT Search', 'Perplexity AI', 'Gemini', 'Bing Copilot', 'Claude AI', 'Llama', 'Grok'];

const PLANS = [
  {
    name: 'Starter',
    slug: 'starter',
    price: 29999,
    desc: 'For Delhi businesses starting to build AI search visibility.',
    popular: false,
    elite: false,
    features: [
      'AI visibility audit across 4 platforms',
      '2 content pieces optimised for AI citation / mo',
      'Basic schema markup (FAQ, Article)',
      'Monthly brand mention tracking',
      'Google AI Overviews focus',
      'Email support',
      'Monthly performance report',
    ],
  },
  {
    name: 'Growth',
    slug: 'growth',
    price: 49999,
    desc: 'For growing Delhi brands ready to compete for AI citations.',
    popular: true,
    elite: false,
    features: [
      'AI visibility audit across 6 platforms',
      '5 content pieces optimised for AI citation / mo',
      'Full schema markup (FAQ, HowTo, Article, Speakable)',
      'Weekly brand mention tracking',
      'ChatGPT, Perplexity, Gemini & Google AI Overviews',
      'Competitor AI-visibility benchmarking',
      'Priority email + WhatsApp support',
      'Dedicated GEO strategist',
      'Monthly strategy call',
    ],
  },
  {
    name: 'Professional',
    slug: 'professional',
    price: 79999,
    desc: 'For established Delhi businesses scaling AI search authority.',
    popular: false,
    elite: false,
    features: [
      'AI visibility audit across all 8 major platforms',
      '10 content pieces optimised for AI citation / mo',
      'Advanced schema + entity markup',
      'Daily brand mention & citation tracking',
      'E-E-A-T authority building campaign',
      'Competitor gap analysis (up to 5 competitors)',
      'Dedicated GEO strategist + content team',
      'Bi-weekly strategy calls',
      'Priority support - 24hr response',
    ],
  },
  {
    name: 'Enterprise',
    slug: 'enterprise',
    price: 99999,
    desc: 'For Delhi enterprises and multi-location brands needing full AI search dominance.',
    popular: false,
    elite: true,
    features: [
      'Unlimited AI visibility monitoring, all platforms',
      '20+ content pieces optimised for AI citation / mo',
      'Full technical + entity + schema overhaul',
      'Real-time citation & brand mention alerts',
      'Multi-location / multi-brand GEO strategy',
      'Unlimited competitor benchmarking',
      'Dedicated account manager + strategist team',
      'Weekly strategy calls',
      'Custom AI-visibility dashboard',
      '24/7 priority support',
    ],
  },
];

const PROCESS = [
  { step: '01', title: 'AI Visibility Audit for Your Delhi Business', desc: 'We test your brand and content across major AI engines for the queries your Delhi customers actually use. You get a written report showing where you appear, where competitors appear instead, and what content types are being cited in your niche.' },
  { step: '02', title: 'Citation Gap & Competitor Analysis', desc: 'We map your content against the questions and topics where AI engines are citing Delhi competitors - identifying the highest-value gaps to close first, ranked by business impact.' },
  { step: '03', title: 'Content Optimisation for AI Citation', desc: 'Existing pages are restructured for citation-friendliness - clearer claims, better entity definitions, authoritative sourcing, and the E-E-A-T signals AI models reward.' },
  { step: '04', title: 'Schema & Technical Implementation', desc: 'FAQ, HowTo, Article, and Organization schema is implemented across priority pages, giving AI crawlers a structured, unambiguous read on your content.' },
  { step: '05', title: 'Authority & Local Signal Building', desc: 'We build the third-party credibility signals AI engines use to evaluate source authority - editorial coverage, expert citations, and local Delhi NCR signals that reinforce both GEO and local search.' },
  { step: '06', title: 'Monitor & Report Monthly', desc: 'Ongoing AI visibility reporting - citation frequency across platforms, brand mention tracking, and AI presence compared against your traditional SEO metrics, delivered on your plan\'s reporting cadence.' },
];

const TESTIMONIALS = [
  {
    text: 'We kept losing "best CRM for small business" style queries to competitors inside ChatGPT and AI Overviews, even though we outranked them traditionally. 1Solutions restructured our content and within two months we started showing up as a cited source.',
    name: 'Rohan K.', role: 'Marketing Head, B2B SaaS (New Delhi)', init: 'RK', bg: '#0F3460', feat: true,
  },
  {
    text: 'Being a Delhi-based team that also understood the AI search side made the difference - they tied our Google Business Profile and local content straight into the GEO strategy instead of treating it as a separate project.',
    name: 'Ananya S.', role: 'Founder, D2C Retail Brand (South Delhi)', init: 'AS', bg: '#0F3460',
  },
  {
    text: 'The monthly reports actually show which AI platforms we are cited on and which competitors show up instead - something none of the "SEO" agencies we spoke to in Delhi could explain, let alone measure.',
    name: 'Vikram M.', role: 'Director, Professional Services (Gurugram/NCR)', init: 'VM', bg: '#1e3a5f',
  },
];
const TESTIMONIALS_ROW2 = [TESTIMONIALS[1], TESTIMONIALS[2], TESTIMONIALS[0]];

const WHY = [
  { title: 'Delhi + AI-Search Dual Expertise', desc: 'We combine 15+ years of Delhi NCR SEO experience with early, hands-on GEO expertise - most Delhi agencies offer one or the other, not both integrated into a single strategy.' },
  { title: 'Multi-Platform Approach', desc: 'GEO is not just Google. We optimise for citation across ChatGPT, Perplexity, Gemini, Bing Copilot, and emerging AI search engines simultaneously.' },
  { title: 'SEO + GEO Combined', desc: 'GEO works best alongside traditional SEO - not instead of it. We integrate both so your content performs across keyword searches and AI-generated answers.' },
  { title: 'Measurable Metrics', desc: 'We track concrete AI visibility metrics - citation appearances, AI Overview presence, Perplexity source frequency - so progress is measurable, not theoretical.' },
  { title: 'Content-First Execution', desc: 'GEO requires high-quality, authoritative content, not technical tricks. Our content specialists write citation-worthy material that earns AI mentions through genuine expertise.' },
  { title: 'Transparent Monthly Reporting', desc: "Every report names the platforms tested, citations found, and competitors still winning - giving you a complete picture of your brand's AI search presence, not a vague summary." },
];

const FAQS = [
  { q: 'What is Generative Search Optimization (GEO)?', a: 'Generative Search Optimization (GEO) is the practice of optimising content to appear in AI-generated search responses - Google AI Overviews, ChatGPT Search, Perplexity, Gemini, and similar systems. As AI engines increasingly generate direct answers rather than just listing links, the goal shifts from ranking in position 1 to being cited as a source in AI-generated responses.' },
  { q: 'Is 1Solutions based in Delhi?', a: 'Yes. 1Solutions has a team dedicated to the Delhi NCR market, with GEO and SEO specialists who understand Delhi\'s competitive digital environment. We work with clients across Central Delhi, South Delhi, Gurugram, Noida, Faridabad, and Ghaziabad - both in person and fully remotely.' },
  { q: 'How is GEO different from traditional SEO?', a: 'Traditional SEO optimises for keyword rankings in blue-link search results. GEO optimises for citation in AI-generated answers. The two overlap significantly - high-quality, authoritative content with strong E-E-A-T signals performs well in both - but GEO adds focus on structured information, comprehensive topic coverage, factual accuracy, and entity clarity that AI models specifically reward.' },
  { q: 'What does the pricing include, and is there a setup fee?', a: 'Every plan - Starter (₹29,999/mo), Growth (₹49,999/mo), Professional (₹79,999/mo), and Enterprise (₹99,999/mo) - includes AI visibility auditing, content optimisation, and monthly reporting at a scope matched to the tier. There is no setup fee, and every engagement starts with a free AI visibility audit so you can see the current gap before committing.' },
  { q: 'Can I measure GEO performance?', a: 'Yes. Key metrics include Google Search Console AI Overview impressions and clicks, manual and automated testing of brand/topic queries across ChatGPT, Perplexity, and Gemini, and brand mention monitoring across AI platforms. We provide monthly GEO visibility reports on every plan, at a frequency matched to your tier.' },
  { q: 'What types of content are most likely to be cited by AI engines?', a: 'AI engines favour content that is factually dense (specific claims, statistics, named entities), clearly structured (headers, lists, tables), from authoritative sources, comprehensive (covers a topic from multiple angles), and freshly updated. Long-form guides, original research, and definition/explanation content attract more AI citations than thin promotional pages.' },
  { q: 'Do you serve businesses outside Delhi NCR?', a: 'Our Delhi NCR-focused GEO plans are built around the local competitive landscape, but the underlying GEO methodology works for any market. If you are outside Delhi NCR, our national GEO service page covers the same work without the local-market framing.' },
  { q: 'Is GEO replacing SEO?', a: 'No. GEO extends SEO, it does not replace it. Traditional keyword rankings remain valuable for transactional and local queries where AI Overviews are rarely shown. The most effective strategy - and the one we run - combines both: maintain strong traditional SEO rankings while building the content depth and authority signals that earn AI citations.' },
  { q: 'How long does it take to see GEO results?', a: 'AI visibility improvements are typically faster to observe than traditional SEO ranking movements. New or restructured content can begin appearing in Google AI Overviews within 2-4 weeks of indexation. Full GEO impact - consistent citation across multiple AI platforms for priority topics - typically takes 3-6 months of sustained content and authority building.' },
  { q: 'Can I upgrade or downgrade my plan later?', a: 'Yes. All plans run month-to-month with no long-term lock-in - 30 days notice to change tiers or cancel. Most clients start on Starter or Growth after their free audit and move up as AI-visibility gains compound.' },
];

const RELATED = [
  { href: '/seo-company-delhi/', label: 'SEO Company in Delhi', cls: 'gsd-rtag-blue' },
  { href: '/generative-engine-optimization-services/', label: 'GEO Services (National)', cls: 'gsd-rtag-indigo' },
  { href: '/ai-search-services/', label: 'AI Search Services', cls: 'gsd-rtag-violet' },
  { href: '/local-seo-packages/', label: 'Local SEO Packages', cls: 'gsd-rtag-green' },
  { href: '/technical-seo-optimization/', label: 'Technical SEO', cls: 'gsd-rtag-rose' },
  { href: '/content-marketing-services/', label: 'Content Marketing', cls: 'gsd-rtag-amber' },
  { href: '/link-building-services/', label: 'Link Building Services', cls: 'gsd-rtag-teal' },
  { href: '/seo-audit-services/', label: 'SEO Audit Services', cls: 'gsd-rtag-blue' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'SEO Company in Delhi', item: 'https://www.1solutions.biz/seo-company-delhi/' },
        { '@type': 'ListItem', position: 3, name: 'Generative Search Optimization Services (GEO) Delhi', item: 'https://www.1solutions.biz/generative-search-optimization-services-geo-delhi/' },
      ],
    },
    {
      '@type': 'ProfessionalService',
      name: 'Generative Search Optimization (GEO) Services Delhi',
      url: 'https://www.1solutions.biz/generative-search-optimization-services-geo-delhi/',
      description: 'Generative Search Optimization (GEO) services for Delhi NCR businesses - get cited in Google AI Overviews, ChatGPT Search, Perplexity, and Gemini. Plans from ₹29,999/month.',
      provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
      areaServed: { '@type': 'City', name: 'New Delhi' },
      address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressRegion: 'Delhi', addressCountry: 'IN' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '96', bestRating: '5' },
      offers: PLANS.map(p => ({
        '@type': 'Offer',
        name: `${p.name} GEO Delhi Package`,
        price: p.price,
        priceCurrency: 'INR',
        priceSpecification: { '@type': 'UnitPriceSpecification', price: p.price, priceCurrency: 'INR', unitText: 'month' },
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@type': 'HowTo',
      name: 'How Generative Search Optimization Works for Delhi Businesses',
      step: PROCESS.map((p, i) => ({ '@type': 'HowToStep', position: i + 1, name: p.title, text: p.desc })),
    },
  ],
};

export default function GenerativeSearchOptimizationServicesGeoDelhi() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visCards, setVisCards] = useState([]);
  const [visSteps, setVisSteps] = useState([]);
  const [visWhy, setVisWhy] = useState([]);
  const [formSt, setFormSt] = useState('idle');
  const cardsRef = useRef(null);
  const stepRefs = useRef([]);
  const whyRef = useRef(null);
  const rcLoaded = useRef(false);

  useEffect(() => {
    if (!cardsRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); }
    }, { threshold: 0.05 });
    o.observe(cardsRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const obs = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setTimeout(() => setVisSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); }
      }, { threshold: 0.2 });
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!whyRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); }
    }, { threshold: 0.1 });
    o.observe(whyRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const contact = document.getElementById('gsd-contact');
    if (!contact) return;
    const rcObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !rcLoaded.current) {
        const s = document.createElement('script');
        s.src = `https://www.google.com/recaptcha/api.js?render=${RC_KEY}`;
        s.async = true;
        document.head.appendChild(s);
        rcLoaded.current = true;
        rcObs.disconnect();
      }
    }, { rootMargin: '300px' });
    rcObs.observe(contact);
    return () => rcObs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = (fd.get('gsd-name') || '').trim();
    const email = (fd.get('gsd-email') || '').trim();
    const phone = (fd.get('gsd-phone') || '').trim();
    const company = (fd.get('gsd-company') || '').trim();
    const website = (fd.get('gsd-website') || '').trim();
    const msg = (fd.get('gsd-msg') || '').trim();
    const consent = document.getElementById('gsd-consent')?.checked;
    if (!name || !email || !phone || !company || !msg || !consent) { setFormSt('validation'); return; }
    setFormSt('loading');
    try {
      const token = await new Promise(resolve => {
        window.grecaptcha.ready(() => { window.grecaptcha.execute(RC_KEY, { action: 'gsd_contact' }).then(resolve); });
      });
      const cc = fd.get('gsd-cc') || '';
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email,
          phone: (cc ? cc + ' ' : '') + phone,
          company,
          message: `Website: ${website || 'Not provided'}\n\n${msg}`,
          service: 'Generative Search Optimization (GEO) - Delhi',
          source: 'GEO Delhi Services Page',
          consent: true,
          recaptchaToken: token,
        }),
      });
      if (res.ok) { setFormSt('success'); e.target.reset(); } else { setFormSt('error'); }
    } catch { setFormSt('error'); }
  };

  return (
    <>
      <Head>
        <title>Generative Search Optimization (GEO) Services in Delhi | 1Solutions</title>
        <meta name="description" content="Generative Search Optimization (GEO) services for Delhi NCR businesses - get cited in Google AI Overviews, ChatGPT, Perplexity & Gemini. Plans from ₹29,999/mo." />
        <meta name="keywords" content="generative search optimization Delhi, GEO services Delhi, AI search optimization Delhi, GEO company Delhi NCR, AI visibility Delhi" />
        <link rel="canonical" href="https://www.1solutions.biz/generative-search-optimization-services-geo-delhi/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Generative Search Optimization (GEO) Services in Delhi | 1Solutions" />
        <meta property="og:description" content="Get your Delhi business cited in Google AI Overviews, ChatGPT, Perplexity & Gemini. GEO plans from ₹29,999/mo." />
        <meta property="og:url" content="https://www.1solutions.biz/generative-search-optimization-services-geo-delhi/" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions Generative Search Optimization (GEO) Services Delhi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <meta name="twitter:image:alt" content="1Solutions Generative Search Optimization (GEO) Services Delhi" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .gsd-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .gsd-page *,.gsd-page *::before,.gsd-page *::after{box-sizing:border-box}

          .gsd-white{background:#fff;padding:80px 40px}
          .gsd-light{background:#f8fafd;padding:80px 40px}
          .gsd-indigo{background:linear-gradient(135deg,#eef2ff 0%,#e8eeff 50%,#eef2ff 100%);padding:80px 40px}
          .gsd-sec-in{max-width:1280px;margin:0 auto}
          .gsd-sec-in-sm{max-width:900px;margin:0 auto}
          .gsd-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#4f46e5;margin-bottom:10px;display:block}
          .gsd-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .gsd-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:44px}

          /* Services cards */
          .gsd-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .gsd-card{border:1px solid transparent;border-radius:18px;padding:24px 22px;position:relative;overflow:hidden;opacity:0;transform:translateY(20px);transition:opacity .4s ease,transform .4s ease}
          .gsd-card.vis{opacity:1;transform:translateY(0)}
          .gsd-card.vis:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(15,52,96,.14)}
          .gsd-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin:0 0 8px}
          .gsd-card p{font-size:12.5px;color:#3A4A66;line-height:1.65;margin:0}

          /* AI platforms pills */
          .gsd-plat{background:linear-gradient(135deg,#3730a3 0%,#4f46e5 100%);padding:60px 40px}
          .gsd-plat-in{max-width:1280px;margin:0 auto;text-align:center}
          .gsd-plat h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .gsd-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .gsd-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}

          /* Pricing — modeled on link-building-packages #pricing */
          .gsd-price-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;align-items:start;padding-top:20px}
          .gsd-price-card{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:28px 24px;position:relative;transition:transform .22s,box-shadow .22s,border-color .22s;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .gsd-price-card.pop{background:linear-gradient(135deg,rgba(255,251,235,0.92) 0%,rgba(255,255,255,0.98) 50%,rgba(255,249,219,0.85) 100%);border-color:rgba(217,119,6,0.55);transform:scale(1.03);box-shadow:0 20px 60px rgba(217,119,6,0.16),0 0 0 2px rgba(217,119,6,0.14);overflow:visible}
          .gsd-price-card.pop:hover{transform:scale(1.03) translateY(-4px);box-shadow:0 28px 72px rgba(217,119,6,0.22),0 0 0 2px rgba(217,119,6,0.20)}
          .gsd-price-card.elite{background:linear-gradient(135deg,rgba(237,233,254,.55) 0%,rgba(255,255,255,.85) 55%,rgba(243,232,255,.45) 100%);border:1px solid rgba(139,92,246,.35);box-shadow:0 4px 24px rgba(139,92,246,.14),inset 0 1px 0 rgba(255,255,255,.95);overflow:visible}
          .gsd-price-card.elite:hover{border-color:rgba(139,92,246,.60);box-shadow:0 16px 48px rgba(139,92,246,.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-4px)}
          .gsd-pop-tag{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#D97706,#F59E0B);color:#fff;font-size:10px;font-weight:700;padding:3px 12px;border-radius:100px;letter-spacing:.5px;white-space:nowrap;box-shadow:0 4px 12px rgba(217,119,6,0.30)}
          .gsd-elite-tag{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;font-size:10px;font-weight:700;padding:3px 12px;border-radius:100px;letter-spacing:.5px;white-space:nowrap;box-shadow:0 4px 12px rgba(124,58,237,0.30)}
          .gsd-plan-name{font-size:20px;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .gsd-plan-desc{font-size:12px;color:#6b7280;line-height:1.55;margin-bottom:20px}
          .gsd-price-row{display:flex;align-items:baseline;gap:4px;margin-bottom:4px}
          .gsd-currency{font-size:1.3rem;font-weight:700;color:#D97706}
          .gsd-amount{font-size:2.6rem;font-weight:900;letter-spacing:-2px;color:#0F1F40;line-height:1}
          .gsd-price-card.elite .gsd-currency{color:#7c3aed}
          .gsd-per{font-size:12px;color:#9ca3af;font-weight:500;margin-left:2px}
          .gsd-billed{font-size:11px;color:#9ca3af;margin-bottom:20px}
          .gsd-cta-card{display:block;width:100%;text-align:center;padding:12px;border-radius:50px;font-weight:700;font-size:.875rem;text-decoration:none;background:rgba(15,52,96,.85);color:#fff;transition:all .22s;margin-bottom:20px;box-shadow:0 4px 16px rgba(15,52,96,.20)}
          .gsd-cta-card:hover{transform:translateY(-2px)}
          .gsd-price-card.pop .gsd-cta-card{background:linear-gradient(135deg,#D97706,#F59E0B);border:none;color:#fff;box-shadow:0 6px 20px rgba(217,119,6,0.35)}
          .gsd-price-card.pop .gsd-cta-card:hover{background:linear-gradient(135deg,#B45309,#D97706);box-shadow:0 8px 28px rgba(217,119,6,0.45)}
          .gsd-price-card.elite .gsd-cta-card{background:linear-gradient(135deg,#7c3aed,#4f46e5);border:none;color:#fff;box-shadow:0 4px 16px rgba(124,58,237,.40)}
          .gsd-price-card.elite .gsd-cta-card:hover{background:linear-gradient(135deg,#6d28d9,#4338ca);box-shadow:0 8px 28px rgba(124,58,237,.55)}
          .gsd-price-divider{height:1px;background:rgba(15,52,96,.08);margin-bottom:18px}
          .gsd-price-card.elite .gsd-price-divider{background:rgba(139,92,246,.18)}
          .gsd-feat-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:9px}
          .gsd-feat-list li{display:flex;align-items:flex-start;gap:9px;font-size:12px;color:#374151;line-height:1.4}
          .gsd-feat-list li svg{color:#D97706;flex-shrink:0;margin-top:2px}
          .gsd-price-card.elite .gsd-feat-list li svg{color:#7c3aed}
          .gsd-trust{display:flex;justify-content:center;gap:24px;flex-wrap:wrap;margin-top:32px;padding-top:28px;border-top:1px solid rgba(15,52,96,.08)}
          .gsd-trust span{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:#374151;font-weight:500}
          .gsd-trust svg{color:#16a34a;flex-shrink:0}

          /* Process */
          .gsd-steps{display:flex;flex-direction:column;margin-top:44px}
          .gsd-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(79,70,229,0.10);opacity:0;transform:translateX(-20px);transition:opacity .45s ease,transform .45s ease}
          .gsd-step:last-child{border-bottom:none}.gsd-step.vis{opacity:1;transform:translateX(0)}
          .gsd-snum{font-size:3rem;font-weight:900;color:rgba(79,70,229,0.15);line-height:1;letter-spacing:-2px}
          .gsd-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .gsd-step p{font-size:.9rem;color:#4A6080;line-height:1.7;margin:0}

          /* Testimonials — two-row marquee */
          .gsd-testi{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 0;position:relative;overflow:hidden}
          .gsd-testi .gsd-sec-in{padding:0 40px}
          .gsd-center-head{text-align:center;margin-bottom:44px}
          .gsd-testi-marquee-outer{position:relative}
          .gsd-testi-marquee-wrap{overflow:hidden;margin-bottom:20px}
          .gsd-testi-marquee-wrap:last-child{margin-bottom:0}
          .gsd-testi-track{display:flex;gap:20px;width:max-content;animation:gsdTestiScroll 32s linear infinite}
          .gsd-testi-track--rev{animation-name:gsdTestiScrollRev}
          .gsd-testi-marquee-wrap:hover .gsd-testi-track{animation-play-state:paused}
          @keyframes gsdTestiScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
          @keyframes gsdTestiScrollRev{from{transform:translateX(-50%)}to{transform:translateX(0)}}
          @media(prefers-reduced-motion:reduce){.gsd-testi-track{animation:none !important}}
          .gsd-testi-fade{position:absolute;top:0;bottom:0;width:120px;z-index:1;pointer-events:none}
          .gsd-testi-fade--l{left:0;background:linear-gradient(to right,#f8fafd,transparent)}
          .gsd-testi-fade--r{right:0;background:linear-gradient(to left,#f8fafd,transparent)}
          @media(max-width:600px){.gsd-testi-fade{width:48px}}
          .gsd-tcard{width:400px;flex-shrink:0;user-select:none;background:linear-gradient(135deg,rgba(219,234,254,.50) 0%,rgba(255,255,255,.85) 55%,rgba(253,244,255,.40) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .gsd-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(219,234,254,.42) 100%);border-color:rgba(217,119,6,.22)}
          .gsd-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .gsd-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .gsd-tauthor{display:flex;align-items:center;gap:12px}
          .gsd-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .gsd-tname{font-size:14px;font-weight:700;color:#0F3460}
          .gsd-trole{font-size:12px;color:#6b7280}

          /* Why */
          .gsd-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .gsd-wcard{background:linear-gradient(135deg,#eef2ff 0%,#fff 60%,#e0e7ff 100%);border:1px solid rgba(79,70,229,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity .4s ease,transform .4s ease}
          .gsd-wcard.vis{opacity:1;transform:translateY(0)}.gsd-wcard:hover{border-color:rgba(79,70,229,0.22);box-shadow:0 8px 32px rgba(79,70,229,0.07)}
          .gsd-dot{width:8px;height:8px;border-radius:50%;background:#4f46e5;margin-bottom:16px}
          .gsd-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .gsd-wcard p{font-size:.88rem;color:#4A6080;line-height:1.7;margin:0}

          /* FAQ */
          .gsd-fitem{border-bottom:1px solid #e5e7eb}
          .gsd-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .gsd-fq:hover{color:#4f46e5}
          .gsd-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all .2s;margin-top:2px}
          .gsd-fitem.open .gsd-ficon{border-color:#4f46e5;color:#4f46e5;background:rgba(79,70,229,0.06)}
          .gsd-fa{font-size:.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height .35s ease,padding-bottom .35s ease}
          .gsd-fitem.open .gsd-fa{max-height:600px;padding-bottom:22px}

          /* Contact */
          .gsd-contact{background:linear-gradient(135deg,rgba(79,70,229,0.05) 0%,rgba(255,255,255,0.92) 50%,rgba(238,242,255,0.40) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .gsd-co1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(79,70,229,0.10) 0%,transparent 70%);pointer-events:none}
          .gsd-co2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%);pointer-events:none}
          .gsd-cg{max-width:1200px;margin:0 auto;position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
          .gsd-cl h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 16px;line-height:1.15;letter-spacing:-0.5px}
          .gsd-cl p{font-size:1rem;color:#4A6080;line-height:1.75;margin:0 0 32px}
          .gsd-perks{display:flex;flex-direction:column;gap:12px}
          .gsd-perk{display:flex;align-items:center;gap:10px;font-size:14px;color:#374151;font-weight:500}
          .gsd-perk svg{flex-shrink:0;color:#4f46e5}
          .gsd-form-box{background:rgba(255,255,255,0.90);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.96);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(79,70,229,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .gsd-form-box h3{font-size:18px;font-weight:800;color:#0F1F40;margin:0 0 22px;letter-spacing:-0.3px}
          .gsd-form{display:flex;flex-direction:column;gap:14px}
          .gsd-r2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
          .gsd-fg{display:flex;flex-direction:column;gap:5px}
          .gsd-fg label{font-size:12px;font-weight:700;color:#374151;letter-spacing:.02em;text-transform:uppercase}
          .gsd-fg input,.gsd-fg textarea,.gsd-fg select{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;background:#fff;outline:none;transition:border-color .2s,box-shadow .2s;width:100%}
          .gsd-fg input:focus,.gsd-fg textarea:focus,.gsd-fg select:focus{border-color:#4f46e5;box-shadow:0 0 0 3px rgba(79,70,229,0.10)}
          .gsd-fg textarea{resize:vertical;min-height:110px}
          .gsd-pw{display:flex;gap:8px}
          .gsd-pw select{width:110px;flex-shrink:0}
          .gsd-pw input{flex:1}
          .gsd-ck{display:flex;align-items:flex-start;gap:10px;font-size:12px;color:#6b7280;line-height:1.55}
          .gsd-ck input[type="checkbox"]{width:16px;height:16px;margin-top:1px;accent-color:#4f46e5;flex-shrink:0}
          .gsd-ck a{color:#4f46e5;text-decoration:none}
          .gsd-sub{padding:14px 28px;background:linear-gradient(135deg,#4f46e5,#6366f1);border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;width:100%;box-shadow:0 6px 24px rgba(79,70,229,0.25)}
          .gsd-sub:hover:not(:disabled){background:linear-gradient(135deg,#3730a3,#4f46e5);transform:translateY(-2px);box-shadow:0 8px 32px rgba(79,70,229,0.35)}
          .gsd-sub:disabled{opacity:.65;cursor:not-allowed}
          .gsd-err{font-size:13px;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px 14px;margin:0}
          .gsd-ok{text-align:center;padding:24px 0}
          .gsd-ok-ic{width:56px;height:56px;background:rgba(79,70,229,0.10);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .gsd-ok-ic svg{width:28px;height:28px;stroke:#4f46e5;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
          .gsd-ok h3{font-size:20px;font-weight:800;color:#0F1F40;margin:0 0 8px}
          .gsd-ok p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}

          /* Related */
          .gsd-related{background:linear-gradient(135deg,rgba(238,242,255,0.60) 0%,rgba(255,255,255,0.90) 50%,rgba(224,231,255,0.30) 100%);padding:80px 40px;border-top:1px solid rgba(79,70,229,0.10)}
          .gsd-ri{max-width:1280px;margin:0 auto;text-align:center}
          .gsd-ri .gsd-ey2{color:#6b7280}
          .gsd-related-ttl{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-0.5px;color:#0F1F40;margin:0 0 14px}
          .gsd-related-sub{font-size:15px;color:#4A6080;line-height:1.7;margin:0 auto 36px;max-width:640px}
          .gsd-divider{border:none;border-top:1px solid rgba(79,70,229,0.12);margin:0 0 32px}
          .gsd-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .gsd-rtag{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;transition:all .22s;border:1.5px solid}
          .gsd-rtag-indigo{background:rgba(79,70,229,0.07);border-color:rgba(79,70,229,0.20);color:#3730a3}.gsd-rtag-indigo:hover{background:rgba(79,70,229,0.14);border-color:#4f46e5;transform:translateY(-2px)}
          .gsd-rtag-blue{background:rgba(59,130,246,0.07);border-color:rgba(59,130,246,0.20);color:#1d4ed8}.gsd-rtag-blue:hover{background:rgba(59,130,246,0.14);border-color:#3b82f6;transform:translateY(-2px)}
          .gsd-rtag-violet{background:rgba(139,92,246,0.07);border-color:rgba(139,92,246,0.20);color:#5b21b6}.gsd-rtag-violet:hover{background:rgba(139,92,246,0.14);border-color:#8b5cf6;transform:translateY(-2px)}
          .gsd-rtag-teal{background:rgba(20,184,166,0.07);border-color:rgba(20,184,166,0.20);color:#0f766e}.gsd-rtag-teal:hover{background:rgba(20,184,166,0.14);border-color:#14b8a6;transform:translateY(-2px)}
          .gsd-rtag-amber{background:rgba(217,119,6,0.07);border-color:rgba(217,119,6,0.20);color:#92400e}.gsd-rtag-amber:hover{background:rgba(217,119,6,0.14);border-color:#d97706;transform:translateY(-2px)}
          .gsd-rtag-green{background:rgba(34,197,94,0.07);border-color:rgba(34,197,94,0.20);color:#166534}.gsd-rtag-green:hover{background:rgba(34,197,94,0.14);border-color:#22c55e;transform:translateY(-2px)}
          .gsd-rtag-rose{background:rgba(244,63,94,0.07);border-color:rgba(244,63,94,0.20);color:#be123c}.gsd-rtag-rose:hover{background:rgba(244,63,94,0.14);border-color:#f43f5e;transform:translateY(-2px)}

          @media(max-width:1280px){.gsd-price-cards{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:1024px){
            .gsd-grid{grid-template-columns:repeat(2,1fr)}
            .gsd-why-grid{grid-template-columns:repeat(2,1fr)}
            .gsd-cg{grid-template-columns:1fr}
          }
          @media(max-width:768px){
            .gsd-white,.gsd-light,.gsd-indigo,.gsd-plat,.gsd-contact,.gsd-related,.gsd-testi{padding:60px 24px}
            .gsd-testi .gsd-sec-in{padding:0 24px}
            .gsd-grid,.gsd-why-grid{grid-template-columns:1fr}
            .gsd-price-cards{grid-template-columns:1fr;max-width:440px;margin-left:auto;margin-right:auto}
            .gsd-price-card.pop{transform:none}.gsd-price-card.pop:hover{transform:translateY(-4px)}
            .gsd-step{grid-template-columns:56px 1fr}
            .gsd-r2{grid-template-columns:1fr}
          }

          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>

      <div className="gsd-page">

        <ServiceHero
          eyebrow="Generative Search Optimization Services - Delhi"
          title={<><AuroraText>Get Your Delhi Business Cited</AuroraText> in AI Search Answers</>}
          subtext="Generative Search Optimization (GEO) for Delhi NCR businesses - optimise your content to appear in Google AI Overviews, ChatGPT Search, Perplexity, and Gemini, where being cited replaces being ranked."
          primaryCta={{ label: 'Start Your Free AI Visibility Audit', href: '#gsd-contact' }}
          secondaryCta={{ label: 'View Pricing', href: '#pricing' }}
          showLogos={false}
          stats={[
            { label: 'AI Platforms Monitored', value: '8', suffix: '+' },
            { label: 'GEO Clients Served', value: '80', suffix: '+' },
            { label: 'AI Citations Tracked', value: '5', suffix: 'K+' },
            { label: 'Years SEO Experience', value: '15', suffix: '+' },
          ]}
        />

        {/* Services */}
        <section className="gsd-light">
          <div className="gsd-sec-in">
            <span className="gsd-ey2">What We Do</span>
            <h2 className="gsd-ttl">Generative Search Optimization Services for Delhi</h2>
            <p className="gsd-desc">AI visibility auditing, citation-ready content, and schema work for Delhi NCR businesses that want to be the source AI engines actually cite - not just another page on the results list.</p>
            <div className="gsd-grid" ref={cardsRef}>
              {SERVICES.map((s, i) => (
                <div key={s.n} className={`gsd-card${visCards.includes(i) ? ' vis' : ''}`} style={{ background: s.bg, borderColor: s.border }}>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Platforms */}
        <section className="gsd-plat">
          <div className="gsd-plat-in">
            <h2>AI Platforms We Optimise For</h2>
            <div className="gsd-pills">{PLATFORMS.map(p => <span key={p} className="gsd-pill">{p}</span>)}</div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="gsd-white" aria-labelledby="pricing-title">
          <div className="gsd-sec-in">
            <div style={{ textAlign: 'center' }}>
              <span className="gsd-ey2">Transparent Pricing</span>
              <h2 className="gsd-ttl" id="pricing-title">Generative Search Optimization <AuroraText>Packages for Delhi</AuroraText></h2>
              <p className="gsd-desc" style={{ margin: '0 auto 44px' }}>Every plan starts with a free AI visibility audit. No setup fee, no long-term lock-in - 30 days notice to change tiers or cancel.</p>
            </div>
            <div className="gsd-price-cards">
              {PLANS.map(plan => (
                <div key={plan.slug} className={`gsd-price-card${plan.popular ? ' pop' : ''}${plan.elite ? ' elite' : ''}`}>
                  {plan.popular && <span className="gsd-pop-tag">✦ Most Popular</span>}
                  {plan.elite && <span className="gsd-elite-tag">✦ AI+GEO Leader</span>}
                  <div className="gsd-plan-name">{plan.name}</div>
                  <p className="gsd-plan-desc">{plan.desc}</p>
                  <div className="gsd-price-row">
                    <span className="gsd-currency">₹</span>
                    <span className="gsd-amount">{plan.price.toLocaleString('en-IN')}</span>
                    <span className="gsd-per">/mo</span>
                  </div>
                  <div className="gsd-billed">Billed monthly</div>
                  <a href="#gsd-contact" className="gsd-cta-card">Get Started</a>
                  <div className="gsd-price-divider" />
                  <ul className="gsd-feat-list">
                    {plan.features.map(f => (
                      <li key={f}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="gsd-trust">
              {['Free AI visibility audit before you commit', 'Delhi-based team', 'No setup fee', 'Monthly transparent reporting', 'Cancel monthly with 30 days notice'].map(t => (
                <span key={t}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="gsd-indigo">
          <div className="gsd-sec-in-sm">
            <span className="gsd-ey2">How We Work</span>
            <h2 className="gsd-ttl">Our GEO Process for Delhi Businesses</h2>
            <p className="gsd-desc">Audit AI visibility, identify citation gaps, optimise content, build authority - and track progress monthly across all major AI search platforms.</p>
            <div className="gsd-steps">
              {PROCESS.map((p, i) => (
                <div key={p.step} ref={el => { stepRefs.current[i] = el; }} className={`gsd-step${visSteps.includes(i) ? ' vis' : ''}`}>
                  <div className="gsd-snum">{p.step}</div>
                  <div><h3>{p.title}</h3><p>{p.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="gsd-testi" aria-labelledby="gsd-ts-heading">
          <div className="gsd-sec-in">
            <div className="gsd-center-head">
              <span className="gsd-ey2">Client Results</span>
              <h2 className="gsd-ttl" id="gsd-ts-heading">What Our Delhi GEO Clients Say</h2>
              <p className="gsd-desc" style={{ margin: '0 auto' }}>Trusted by SaaS companies, D2C brands, and professional services firms across Delhi NCR building AI search visibility.</p>
            </div>
          </div>
          <div className="gsd-testi-marquee-outer">
            <div className="gsd-testi-fade gsd-testi-fade--l" />
            <div className="gsd-testi-fade gsd-testi-fade--r" />
            <div className="gsd-testi-marquee-wrap">
              <div className="gsd-testi-track">
                {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                  <div key={`row1-${t.name}-${i}`} className={`gsd-tcard${t.feat ? ' feat' : ''}`}>
                    <div className="gsd-stars" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="gsd-ttext">{t.text}</p>
                    <div className="gsd-tauthor">
                      <div className="gsd-tavatar" style={{ background: t.bg }}>{t.init}</div>
                      <div><div className="gsd-tname">{t.name}</div><div className="gsd-trole">{t.role}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="gsd-testi-marquee-wrap">
              <div className="gsd-testi-track gsd-testi-track--rev">
                {[...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2].map((t, i) => (
                  <div key={`row2-${t.name}-${i}`} className={`gsd-tcard${t.feat ? ' feat' : ''}`}>
                    <div className="gsd-stars" aria-label="5 out of 5 stars">★★★★★</div>
                    <p className="gsd-ttext">{t.text}</p>
                    <div className="gsd-tauthor">
                      <div className="gsd-tavatar" style={{ background: t.bg }}>{t.init}</div>
                      <div><div className="gsd-tname">{t.name}</div><div className="gsd-trole">{t.role}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="gsd-white">
          <div className="gsd-sec-in">
            <span className="gsd-ey2">Why 1Solutions</span>
            <h2 className="gsd-ttl">GEO Experts, Delhi-Based, SEO Foundation Included</h2>
            <p className="gsd-desc">We integrate GEO with your existing SEO and local search strategy - not as a replacement, but as the natural evolution that keeps your Delhi business visible as search changes.</p>
            <div className="gsd-why-grid" ref={whyRef}>
              {WHY.map((w, i) => (
                <div key={w.title} className={`gsd-wcard${visWhy.includes(i) ? ' vis' : ''}`}>
                  <div className="gsd-dot" />
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="gsd-light">
          <div className="gsd-sec-in-sm">
            <span className="gsd-ey2">Got Questions?</span>
            <h2 className="gsd-ttl">GEO Delhi Services FAQs</h2>
            <p className="gsd-desc" style={{ marginBottom: 44 }}>Everything you need to know about Generative Search Optimization for your Delhi business.</p>
            <div>
              {FAQS.map((f, i) => (
                <div key={i} className={`gsd-fitem${openFaq === i ? ' open' : ''}`}>
                  <button className="gsd-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {f.q}
                    <span className="gsd-ficon">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="gsd-fa" style={openFaq === i ? { maxHeight: 600, paddingBottom: 22 } : {}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="gsd-contact" id="gsd-contact">
          <div className="gsd-co1" /><div className="gsd-co2" />
          <div className="gsd-cg">
            <div className="gsd-cl">
              <span className="gsd-ey2">Free AI Visibility Audit</span>
              <h2>Start Getting Cited in AI Search Answers</h2>
              <p>Tell us your Delhi business and target topics - we&rsquo;ll run a free AI visibility audit and show you exactly where competitors are being cited instead of you, and what it takes to change that.</p>
              <div className="gsd-perks">
                {[
                  'AI visibility audit across major platforms',
                  'Competitor citation gap analysis',
                  'E-E-A-T readiness assessment',
                  'Content restructuring recommendations',
                  'Free, no-obligation report',
                ].map(perk => (
                  <div key={perk} className="gsd-perk">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    {perk}
                  </div>
                ))}
              </div>
            </div>

            <div className="gsd-form-box">
              <h3>Request a Free GEO Audit</h3>
              {formSt === 'success' ? (
                <div className="gsd-ok">
                  <div className="gsd-ok-ic">
                    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>We&rsquo;ll review your AI visibility and reply with a free assessment within one business day.</p>
                </div>
              ) : (
                <form className="gsd-form" onSubmit={handleSubmit} noValidate>
                  {formSt === 'validation' && <p className="gsd-err">Please complete all required fields and accept the privacy policy before submitting.</p>}
                  {formSt === 'error' && <p className="gsd-err">Something went wrong. Please try again or email us at info@1solutions.biz</p>}
                  <div className="gsd-r2">
                    <div className="gsd-fg">
                      <label htmlFor="gsd-name">Full Name *</label>
                      <input id="gsd-name" name="gsd-name" type="text" placeholder="Your name" required />
                    </div>
                    <div className="gsd-fg">
                      <label htmlFor="gsd-email">Business Email *</label>
                      <input id="gsd-email" name="gsd-email" type="email" placeholder="you@company.com" required />
                    </div>
                  </div>
                  <div className="gsd-r2">
                    <div className="gsd-fg">
                      <label>Phone Number *</label>
                      <div className="gsd-pw">
                        <select name="gsd-cc" aria-label="Country code" defaultValue="+91">
                          <option value="+91">+91 IN</option>
                          <option value="+1">+1 US</option>
                          <option value="+44">+44 GB</option>
                          <option value="+61">+61 AU</option>
                        </select>
                        <input name="gsd-phone" type="tel" placeholder="Phone number" required aria-label="Phone number" />
                      </div>
                    </div>
                    <div className="gsd-fg">
                      <label htmlFor="gsd-company">Company Name *</label>
                      <input id="gsd-company" name="gsd-company" type="text" placeholder="Your company name" required />
                    </div>
                  </div>
                  <div className="gsd-fg">
                    <label htmlFor="gsd-website">Website URL</label>
                    <input id="gsd-website" name="gsd-website" type="url" placeholder="https://yoursite.com" />
                  </div>
                  <div className="gsd-fg">
                    <label htmlFor="gsd-msg">What would you like help with? *</label>
                    <textarea id="gsd-msg" name="gsd-msg" rows={4} placeholder="Current AI visibility concerns, target topics, AI Overviews you want to appear in, competitors you want to outrank..." required />
                  </div>
                  <div className="gsd-ck">
                    <input type="checkbox" id="gsd-consent" />
                    <label htmlFor="gsd-consent">
                      I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions storing my data to respond to this enquiry. *
                    </label>
                  </div>
                  <button type="submit" className="gsd-sub" disabled={formSt === 'loading'}>
                    {formSt === 'loading' ? 'Sending...' : 'Request My Free GEO Audit →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="gsd-related">
          <div className="gsd-ri">
            <span className="gsd-ey2">Explore Related Services</span>
            <h2 className="gsd-related-ttl">Related SEO &amp; Visibility Services</h2>
            <p className="gsd-related-sub">GEO works best as part of a broader search visibility strategy. Need full-service SEO for Delhi too, or GEO support beyond Delhi NCR? These services integrate directly.</p>
            <hr className="gsd-divider" />
            <div className="gsd-tags">
              {RELATED.map(({ href, label, cls }) => (
                <Link key={href} href={href} className={`gsd-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
