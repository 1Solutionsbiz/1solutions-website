import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const PLANS = [
  { name:'Starter', slug:'starter', monthlyPrice:599, yearlyPrice:499, yearlySave:1200, desc:'For small ecommerce stores ready to start building organic visibility.', popular:false,
    features:['Up to 50 products/SKUs optimised','Technical SEO audit (quarterly)','10 target keywords tracked','Product & category page optimisation','Google Merchant Centre audit','Basic schema markup (Product)','Monthly rank tracking report','Email support (48hr response)'] },
  { name:'Growth', slug:'growth', monthlyPrice:999, yearlyPrice:829, yearlySave:2040, desc:'For growing stores that need SEO, content, and link building working together.', popular:true,
    features:['Up to 200 products/SKUs optimised','Full technical SEO (monthly)','30 target keywords tracked','Product & category page optimisation','Schema markup (Product, Review, Breadcrumb)','2 SEO blog posts per month','5 link placements per month','Google Shopping feed optimisation','Monthly competitor analysis','Conversion rate recommendations','Fortnightly reporting','Priority support (24hr response)'] },
  { name:'Pro', slug:'pro', monthlyPrice:1799, yearlyPrice:1499, yearlySave:3600, desc:'For established stores scaling SEO across large catalogues and multiple markets.', popular:false,
    features:['Unlimited products/SKUs','Advanced technical SEO (weekly monitoring)','60+ keywords tracked','Full content strategy & execution','Full schema suite','4 SEO blog posts per month','12 link placements per month','Google Shopping + Performance Max','International SEO (up to 3 markets)','Quarterly CRO audit','Dedicated account manager','Weekly reporting','Phone + priority support'] },
];

const FAQS = [
  { q:'What is ecommerce SEO and why does it matter?', a:'Ecommerce SEO is the process of optimising your online store to rank higher in Google\'s organic search results - attracting shoppers who are actively searching for the products you sell. Unlike paid ads which stop generating traffic when you stop paying, organic rankings from ecommerce SEO compound over time: the more authority and content you build, the more traffic you attract for free. For an ecommerce business, ranking page 1 for high-intent product keywords can be the difference between a profitable business and one dependent entirely on paid traffic.' },
  { q:'How long before ecommerce SEO starts working?', a:'Ecommerce SEO results follow a predictable curve: Technical fixes and on-page optimisations can improve crawling and indexing within 2 to 4 weeks. Meaningful ranking improvements for targeted keywords typically appear within 3 to 6 months. Significant organic traffic and revenue growth is usually visible by month 6 to 12. New domains with no authority take longer; established stores with existing rankings see improvements faster. We set specific, realistic milestones during onboarding based on your current organic performance baseline.' },
  { q:'What is the difference between ecommerce SEO and regular SEO?', a:'Ecommerce SEO has several distinct challenges that general SEO does not: large numbers of product and category pages that need to be individually optimised; duplicate content risks from product variants, filters, and pagination; complex faceted navigation that can create crawl budget issues; schema markup requirements (Product, Review, Offer) that affect how Google displays your results; Google Shopping and Merchant Centre feed optimisation; and the need to balance informational content (blog) with transactional category and product pages. Our ecommerce SEO packages are built specifically around these challenges - not adapted from a generic SEO framework.' },
  { q:'Do you optimise individual product pages?', a:'Yes. Product page optimisation is a core component of every package tier. This includes: keyword-optimised product titles and meta titles; compelling, keyword-rich product descriptions written for both search engines and human readers; schema markup (Product, Offer, Review) to enable rich results in Google; image alt text and file naming; URL structure recommendations; and internal linking from category pages. The number of products optimised per month scales with your package tier - from 50 SKUs on Starter to unlimited on Pro.' },
  { q:'Is link building included in ecommerce SEO packages?', a:'Link building is included in the Growth and Pro packages. Growth includes 5 link placements per month and Pro includes 12 per month - all from DR50+ niche-relevant sites using manual outreach (no link farms, PBNs, or spammy directories). The Starter package does not include active link building as the focus is on technical and on-page foundations, though it includes a Google Merchant Centre audit and the infrastructure needed before link building is effective. Starter clients can add standalone link building from our link building packages.' },
  { q:'Do I need to give you access to my website?', a:'Yes - we need read and write access to implement on-page optimisations, technical fixes, and content changes. We work with Shopify, WooCommerce, Magento, BigCommerce, and most major ecommerce platforms. For platforms where direct access is not possible or desired, we can provide detailed implementation instructions for your development team to action. We also need Google Search Console and Google Analytics 4 access to monitor performance - we will request these during onboarding.' },
  { q:'Can I switch plans or cancel?', a:'Yes. You can upgrade your plan at any time and the change takes effect from the next billing cycle. Downgrades are processed at the next renewal date. Monthly contracts can be cancelled with 30 days notice. Annual contracts can be cancelled at the end of the annual term. There are no long-term lock-in requirements beyond the billing period you choose. We find that clients who stick with SEO for 12+ months see substantially compounding returns, which is why we offer a significant discount on annual packages.' },
  { q:'What ecommerce platforms do you support?', a:'We work with all major ecommerce platforms: Shopify and Shopify Plus; WooCommerce; Magento 2 (Adobe Commerce); BigCommerce; OpenCart; PrestaShop; Wix eCommerce; Squarespace Commerce; and custom-built platforms. Each platform has different technical SEO considerations - for example, Shopify\'s canonical URL handling, Magento\'s faceted navigation configuration, and WooCommerce\'s WordPress-specific optimisations. We apply platform-specific knowledge to every account rather than treating all sites the same.' },
];

const TESTIMONIALS_ROW1 = [
  { initials:'AR', bg:'#1D4ED8', name:'Alex Reynolds', role:'CEO, HomeStyled — WooCommerce store, UK', text:'"Within 6 months of starting the Growth plan, our organic sessions tripled and we attributed £180k in revenue directly to SEO. The product page optimisations alone moved us from page 3 to page 1 for our top 5 category keywords. Genuinely transformative for our business."' },
  { initials:'NK', bg:'#1E3A8A', name:'Natasha Kim', role:'Head of Growth, FreshThreads — Shopify Plus, Australia', text:'"Our Shopify store had canonical issues that had been killing our rankings for 2 years. 1Solutions found them in the first technical audit and fixed them in week 3. Organic traffic went up 40% in the next 90 days. The team genuinely understands Shopify\'s quirks."' },
  { initials:'MV', bg:'#7C3AED', name:'Marco Visconti', role:'Founder, PetPremium — Magento 2, Italy/UK', text:'"Magento\'s faceted navigation was creating thousands of duplicate pages and wasting our crawl budget. The Pro plan fixed the technical architecture, then the content and link building started compounding. We now rank top 3 for 34 high-value pet product category terms."' },
  { initials:'SL', bg:'#0F766E', name:'Sophie Laurent', role:'E-Commerce Director, HealthBox — BigCommerce, France', text:'"The schema markup work alone improved our click-through rate by 22%. Seeing star ratings and price in the Google results before the click made a huge difference. We\'re at a 3.2x return on our SEO investment in 12 months."' },
  { initials:'JW', bg:'#BE185D', name:'James Whitmore', role:'Owner, GearUpDirect — WooCommerce, Canada', text:'"We\'d tried two other SEO agencies before 1Solutions. The difference is they actually understand ecommerce — not just generic SEO applied to a shop. The crawl budget optimisation and category page strategy were unlike anything the other agencies had proposed."' },
];
const TESTIMONIALS_ROW2 = [
  { initials:'PC', bg:'#1D4ED8', name:'Priya Chandran', role:'Marketing Manager, SpiceRoute — Shopify, UAE', text:'"International SEO was the game changer for us. The Pro plan expanded us into 3 markets with hreflang correctly implemented and market-specific content. Organic revenue from our UAE, UK, and US stores combined grew 2.8x in the first year."' },
  { initials:'TB', bg:'#047857', name:'Tom Brennan', role:'CTO, CycleKit Pro — Custom headless, UK', text:'"We run a custom Next.js storefront which most SEO agencies don\'t know how to handle. 1Solutions had experience with headless ecommerce SEO and knew exactly how to implement schema, handle canonical tags, and structure our sitemap correctly. Great technical depth."' },
  { initials:'LF', bg:'#B45309', name:'Lena Fischer', role:'CEO, GlassworksCo — PrestaShop, Germany', text:'"The Starter plan was exactly what a small glass art store needed to prove SEO works before a bigger commitment. Within 4 months we moved from page 4 to page 1 for our main product keywords. We\'ve since upgraded to Growth and the results keep improving."' },
  { initials:'RS', bg:'#0F3460', name:'Raj Sharma', role:'Founder, TechGadgetHub — Magento 2, India/UK', text:'"The Google Shopping feed optimisation brought us into the shopping tab for 200+ product queries we weren\'t appearing in at all. Combined with the product schema, our CTR from search results increased significantly."' },
  { initials:'EM', bg:'#9D174D', name:'Emily Morgan', role:'Digital Director, LittleWonders — Shopify, US', text:'"Baby product SEO is incredibly competitive. The Growth plan\'s content strategy — 2 posts per month targeting parent search intent — built our topical authority systematically. We went from zero blog traffic to 18k monthly organic sessions in 9 months."' },
];

const ROW1 = [...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1];
const ROW2 = [...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2];

const WHY_REASONS = [
  { n:'01', title:'Organic listings convert 6x better', body:'Purchase-ready shoppers who find you via organic search convert at far higher rates than paid traffic — they\'re actively looking, not being interrupted.' },
  { n:'02', title:'Google Shopping rich results', body:'Schema markup displays your price, rating, and image directly in search results — increasing click-through before the visitor even lands on your site.' },
  { n:'03', title:'Category pages drive long-tail at scale', body:'A single optimised category page can rank for hundreds of long-tail product queries simultaneously, multiplying your organic reach without proportional effort.' },
  { n:'04', title:'Technical SEO boosts conversions', body:'Core Web Vitals improvements reduce bounce rates. A faster, better-structured store ranks higher and converts more visitors into buyers.' },
  { n:'05', title:'SEO compounds over time', body:'Content and authority built in month 3 still generates revenue in month 30 — unlike paid ads which stop the moment you stop spending.' },
  { n:'06', title:'International expansion built in', body:'The Pro plan covers up to 3 markets with hreflang, market-specific content, and international keyword strategy — one monthly plan, multiple revenue streams.' },
];

const AI_CARDS = [
  { title:'Google AI Overviews & Product Recommendations', body:'Google\'s AI now surfaces product recommendations directly in search results. We optimise your product content, schema, and authority signals to appear in these AI-generated answers.' },
  { title:'Google Shopping Graph & Merchant Centre', body:'The Shopping Graph connects product data across the web. A clean, structured Merchant Centre feed with correct pricing and availability signals feeds directly into AI-powered Shopping results.' },
  { title:'E-E-A-T for Product Trustworthiness', body:'Google evaluates Experience, Expertise, Authoritativeness, and Trustworthiness for ecommerce. We build brand authority through reviews, structured data, and expert product content.' },
  { title:'Perplexity & ChatGPT Product Discovery', body:'AI assistants increasingly recommend specific products and stores. We structure your brand signals, reviews, and content so AI systems cite your store when users ask for product recommendations.' },
];

const INCLUDED = [
  { title:'Product & Category Page Optimisation', body:'Keyword-optimised titles, meta descriptions, H1s, product copy, image alt text, and internal linking — scaled across your full catalogue.' },
  { title:'Technical SEO at Scale', body:'Crawl budget optimisation, Core Web Vitals, indexation audits, duplicate content from variants/filters, XML sitemap, and structured site architecture.' },
  { title:'Schema Markup Suite', body:'Product, Offer, Review, Breadcrumb, and FAQ schema for rich results in Google — increasing CTR before the visitor clicks.' },
  { title:'Google Merchant Centre Audit', body:'Feed quality checks, structured data alignment, and Shopping tab visibility — so your products appear in Google Shopping results.' },
  { title:'Monthly Rank Tracking & Reporting', body:'Keyword position tracking, organic traffic trends, revenue attribution, and a plain-English report showing exactly what moved and why.' },
  { title:'Dedicated Account Manager', body:'A named contact who knows your store, understands your goals, and is available to answer questions — not a rotating support queue.' },
];

const PROCESS_STEPS = [
  { n:'01', title:'Technical Audit', body:'We crawl your entire store to identify crawlability issues, duplicate content, indexation problems, Core Web Vitals failures, and structural weaknesses before anything else.' },
  { n:'02', title:'Keyword & Competitor Research', body:'We map product, category, and informational keywords to your exact catalogue — identifying the highest-revenue opportunities your competitors are already capturing.' },
  { n:'03', title:'Product & Category Optimisation', body:'We optimise titles, meta, H1s, descriptions, schema, image alt text, and internal linking across your priority pages — starting with your highest-revenue categories.' },
  { n:'04', title:'Content & Link Building', body:'Blog posts targeting informational queries build topical authority. Link placements from DR50+ niche-relevant sites build domain authority. Both compound over time.' },
  { n:'05', title:'Google Shopping & Merchant Centre', body:'We audit and optimise your product feed, fix structured data errors, and ensure your products appear correctly in the Shopping tab and AI-powered shopping results.' },
  { n:'06', title:'Monthly Review & Strategy Call', body:'You receive a clear report on rank changes, organic traffic, and revenue attribution — plus a strategy call to review priorities and plan the next month.' },
];

const DIFFERENT = [
  { title:'Platform-Native Expertise', body:'We know Shopify\'s canonical URL quirks, Magento\'s faceted navigation, and WooCommerce\'s plugin conflicts. Platform-specific knowledge, not generic SEO templates.' },
  { title:'Revenue-First KPIs', body:'We track organic revenue, not just rankings. GA4 and Search Console are integrated from day one — you always know what SEO is actually contributing to your bottom line.' },
  { title:'White-Hat Link Building Only', body:'DR50+ manual outreach from niche-relevant sites. No PBNs, no link farms, no spammy directories. Links that build real authority and withstand algorithm updates.' },
  { title:'Schema Markup Specialists', body:'Product, Review, Offer, Breadcrumb, FAQ rich results increase click-through rates before the visitor even arrives on your site. Few agencies do this as thoroughly as we do.' },
  { title:'AI Overview Optimisation', body:'We structure your product content, feeds, and brand signals specifically to appear in Google\'s AI-generated shopping answers — the next frontier of ecommerce traffic.' },
  { title:'No Lock-In Contracts', body:'Cancel monthly plans with 30 days notice. We earn your business month by month through results — not by trapping you in long-term contracts.' },
];

const PLATFORMS = [
  { name:'Shopify & Shopify Plus', note:'Canonical URL handling, duplicate collection issues, Shopify app conflicts, and Shopify-specific schema implementation.' },
  { name:'WooCommerce', note:'WordPress plugin optimisation, Yoast/RankMath configuration, WooCommerce-specific schema, and WordPress core web vitals.' },
  { name:'Magento 2 / Adobe Commerce', note:'Faceted navigation, layered filter crawl budget control, Varnish caching, and Magento-specific technical optimisations.' },
  { name:'BigCommerce', note:'URL structure optimisation, headless support, built-in schema enhancement, and BigCommerce-specific crawl configuration.' },
  { name:'PrestaShop & OpenCart', note:'Custom technical implementations, module-level SEO configuration, and bespoke crawl budget management for open-source platforms.' },
  { name:'Custom & Headless Ecommerce', note:'Next.js, Nuxt, custom React, and any headless storefront. We handle schema, sitemaps, canonical tags, and rendering SEO for any tech stack.' },
];

const RESULTS = [
  { metric:'+340%', label:'Organic Sessions in 6 Months', detail:'Fashion retailer, WooCommerce, UK — product category page strategy + technical fixes' },
  { metric:'3.2x', label:'Organic Revenue Year-over-Year', detail:'Home goods Shopify store, Australia — content + link building compounding over 12 months' },
  { metric:'#1', label:'Rankings for 47 Category Keywords', detail:'Electronics retailer, Magento 2, US — faceted navigation fix + schema + category optimisation' },
  { metric:'50k', label:'Monthly Organic Visitors in 8 Months', detail:'D2C supplement brand, BigCommerce, UK — content strategy + DR50+ link building from launch' },
];

const WHY_CHOOSE = [
  { title:'15+ Years Ecommerce SEO', body:'We have been optimising online stores since before schema markup existed. Deep platform knowledge built from hundreds of ecommerce engagements.' },
  { title:'Revenue Attribution from Day 1', body:'GA4 and Search Console connected during onboarding. You always know exactly which keywords and pages are driving revenue — not just traffic.' },
  { title:'Multi-Platform Specialist Team', body:'Dedicated specialists for Shopify, Magento, WooCommerce, BigCommerce, and headless — not generalists who learn your platform on your budget.' },
  { title:'Content + Links + Technical in One Plan', body:'Most agencies do one well and neglect the others. Our packages coordinate all three in a single strategy — no gaps, no finger-pointing between teams.' },
  { title:'Transparent Monthly Reporting', body:'Plain-English reports showing keyword movements, organic sessions, revenue, and what was done that month — no vanity metrics, no jargon.' },
  { title:'Real Dedicated Account Managers', body:'A named person who knows your store and your goals — not a shared support inbox. Available for calls, emails, and questions when you need them.' },
];

const RELATED_TAGS = [
  {href:'/seo-services-company/',label:'SEO Services Company',cls:'esp-rtag-blue'},
  {href:'/link-building-packages/',label:'Link Building Packages',cls:'esp-rtag-violet'},
  {href:'/local-seo-packages/',label:'Local SEO Packages',cls:'esp-rtag-teal'},
  {href:'/ecommerce-seo-services/',label:'Ecommerce SEO Services',cls:'esp-rtag-indigo'},
  {href:'/technical-seo-optimization/',label:'Technical SEO Audit',cls:'esp-rtag-amber'},
  {href:'/content-marketing-services/',label:'Content Marketing',cls:'esp-rtag-green'},
  {href:'/ppc-management-services/',label:'Google Ads Management',cls:'esp-rtag-orange'},
  {href:'/shopify-seo-services/',label:'Shopify SEO Services',cls:'esp-rtag-rose'},
  {href:'/woocommerce-seo-services/',label:'WooCommerce SEO',cls:'esp-rtag-slate'},
  {href:'/ecommerce-website-development-services/',label:'Ecommerce Development',cls:'esp-rtag-cyan'},
];

const CHECK = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:2}}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function EcommerceSeoPackages() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [auditSt, setAuditSt] = useState('idle');
  const recaptchaLoaded = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('esp-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.esp-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const contact = document.getElementById('contact');
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

  const _auditSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = (fd.get('ea-name') || '').trim();
    const email = (fd.get('ea-email') || '').trim();
    const phone = (fd.get('ea-phone') || '').trim();
    const url = (fd.get('ea-url') || '').trim();
    const platform = (fd.get('ea-platform') || '').trim();
    const challenge = (fd.get('ea-challenge') || '').trim();
    const goals = (fd.get('ea-goals') || '').trim();
    const consent = document.getElementById('esp-consent') ? document.getElementById('esp-consent').checked : false;
    if (!name || !email || !phone || !url || !platform || !challenge || !goals || !consent) {
      setAuditSt('validation'); return;
    }
    setAuditSt('loading');
    try {
      const token = await new Promise(function(resolve) {
        window.grecaptcha.ready(function() {
          window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs', { action: 'contact' }).then(resolve);
        });
      });
      const cc = fd.get('ea-cc') || '';
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email,
          phone: (cc ? cc + ' ' : '') + phone,
          company: url,
          message: 'Store URL: ' + url + '\n\nPlatform: ' + platform + '\n\nMain Challenge: ' + challenge + '\n\nGoals / Details: ' + goals,
          source: 'Ecommerce SEO Packages - Free Audit',
          consent: true, recaptchaToken: token,
        }),
      });
      if (res.ok) { setAuditSt('success'); e.target.reset(); }
      else { setAuditSt('error'); }
    } catch(err) { setAuditSt('error'); }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Ecommerce SEO Packages', item: 'https://www.1solutions.biz/ecommerce-seo-packages/' },
      ]},
      { '@type': 'LocalBusiness', name: '1Solutions', url: 'https://www.1solutions.biz',
        logo: 'https://www.1solutions.biz/images/1solutions-logo.png',
        sameAs: ['https://www.linkedin.com/company/1solutions/','https://x.com/1solutionsbiz','https://www.facebook.com/1solutionsbiz'],
        address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '142', bestRating: '5' },
      },
      { '@type': 'WebPage',
        '@id': 'https://www.1solutions.biz/ecommerce-seo-packages/',
        url: 'https://www.1solutions.biz/ecommerce-seo-packages/',
        name: 'Ecommerce SEO Packages & Pricing | 1Solutions — Shopify, WooCommerce, Magento',
        description: 'Ecommerce SEO packages from $599/mo. Specialist SEO for Shopify, WooCommerce, and Magento stores — product page optimisation, technical SEO, schema markup, content, and link building.',
        dateModified: '2026-07-06', inLanguage: 'en-US',
      },
      { '@type': 'ProfessionalService', name: 'Ecommerce SEO Packages', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Ecommerce SEO', areaServed: 'Worldwide', url: 'https://www.1solutions.biz/ecommerce-seo-packages/',
        hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Ecommerce SEO Plans', itemListElement: PLANS.map(p => ({ '@type': 'Offer', name: p.name + ' Ecommerce SEO Package', price: p.monthlyPrice, priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: p.monthlyPrice, priceCurrency: 'USD', unitText: 'month' } })) },
      },
      { '@type': 'HowTo', name: 'Our Ecommerce SEO Process', description: 'A 6-step systematic ecommerce SEO process from audit to monthly growth.',
        step: PROCESS_STEPS.map(s => ({ '@type': 'HowToStep', name: s.title, text: s.body })),
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Ecommerce SEO Packages &amp; Pricing | 1Solutions — Shopify, WooCommerce, Magento</title>
        <meta name="description" content="Ecommerce SEO packages from $599/mo. Specialist SEO for Shopify, WooCommerce, and Magento stores — product page optimisation, technical SEO, schema markup, content, and link building." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/ecommerce-seo-packages/" />
        <meta property="og:title" content="Ecommerce SEO Packages &amp; Pricing | 1Solutions" />
        <meta property="og:description" content="Ecommerce SEO packages for Shopify, WooCommerce, and Magento stores. Transparent monthly pricing from $599/mo." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.1solutions.biz/ecommerce-seo-packages/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          /* ── BASE ── */
          .esp-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);background-attachment:scroll;color:#0F1F40;line-height:1.6;overflow-x:hidden;position:relative}
          .esp-page *,.esp-page *::before,.esp-page *::after{box-sizing:border-box}

          /* ── FIXED ORBS ── */
          .esp-orb1{position:fixed;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.30) 0%,rgba(139,92,246,0.12) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px)}
          .esp-orb2{position:fixed;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.25) 0%,rgba(245,158,11,0.12) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px)}
          .esp-orb3{position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.18) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px)}

          /* ── REVEAL ── */
          .esp-reveal{opacity:0;transform:translateY(28px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1)}
          .esp-visible{opacity:1;transform:translateY(0)}

          /* ── SHARED SECTION ── */
          .esp-sec{padding:80px 40px;position:relative;z-index:1}
          .esp-sec-in{max-width:1280px;margin:0 auto}
          .esp-white{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08)}
          .esp-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block}
          .esp-ttl{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:10px}
          .esp-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}

          /* ── GLASS CARD ── */
          .esp-glass{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95)}
          .esp-glass:hover{border-color:rgba(217,119,6,0.25);box-shadow:0 8px 36px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px)}
          .esp-glass{transition:border-color 0.22s,box-shadow 0.22s,transform 0.22s}
          .esp-card-ttl{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .esp-card-body{font-size:13px;color:#4A6080;line-height:1.65}
          .esp-num-badge{width:40px;height:40px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:800;margin-bottom:16px;box-shadow:0 4px 12px rgba(15,52,96,0.25)}

          /* ── GRIDS ── */
          .esp-3grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .esp-4grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
          .esp-2grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}

          .esp-bc a:hover{color:#D97706}.esp-bc-sep{color:#d1d5db}

          /* ── PRICING ── */
          .esp-pricing-sec{padding:80px 40px;position:relative;z-index:1}
          .esp-pricing-in{max-width:1280px;margin:0 auto}
          .esp-tog-row{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:48px}
          .esp-tog-lbl{font-size:15px;font-weight:600;color:#6b7280;transition:color 0.2s}
          .esp-tog-lbl.active{color:#0F1F40}
          .esp-tog-btn{width:50px;height:28px;background:#d1d5db;border-radius:100px;position:relative;cursor:pointer;border:none;padding:0;transition:background 0.25s;flex-shrink:0}
          .esp-tog-btn.on{background:#D97706}
          .esp-tog-knob{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform 0.25s;box-shadow:0 1px 4px rgba(0,0,0,0.18)}
          .esp-tog-btn.on .esp-tog-knob{transform:translateX(22px)}
          .esp-save-badge{display:inline-flex;align-items:center;background:rgba(217,119,6,0.12);color:#B45309;font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;margin-left:6px;letter-spacing:0.5px}
          .esp-plan-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start;padding-top:20px}
          .esp-plan-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:24px;padding:32px 28px;position:relative;transition:box-shadow 0.22s,transform 0.22s,border-color 0.22s;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95)}
          .esp-plan-card:hover{box-shadow:0 16px 48px rgba(15,52,96,0.14);transform:translateY(-4px)}
          .esp-plan-card-pop{background:linear-gradient(135deg,rgba(255,251,235,0.92) 0%,rgba(255,255,255,0.98) 50%,rgba(255,249,219,0.85) 100%);border-color:rgba(217,119,6,0.55);transform:scale(1.03);box-shadow:0 20px 60px rgba(217,119,6,0.16),0 0 0 2px rgba(217,119,6,0.14);overflow:visible}
          .esp-plan-card-pop:hover{transform:scale(1.03) translateY(-4px);box-shadow:0 28px 72px rgba(217,119,6,0.22),0 0 0 2px rgba(217,119,6,0.20)}
          .esp-pop-tag{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#D97706,#F59E0B);color:#fff;font-size:11px;font-weight:700;padding:4px 14px;border-radius:100px;letter-spacing:0.5px;white-space:nowrap;box-shadow:0 4px 12px rgba(217,119,6,0.30)}
          .esp-plan-name{font-size:22px;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .esp-plan-desc{font-size:13px;color:#4A6080;line-height:1.55;margin-bottom:24px}
          .esp-price-row{display:flex;align-items:baseline;gap:4px;margin-bottom:4px}
          .esp-currency{font-size:1.4rem;font-weight:700;color:#D97706}
          .esp-amount{font-size:3rem;font-weight:900;letter-spacing:-2px;color:#0F1F40;line-height:1}
          .esp-per{font-size:13px;color:#9ca3af;font-weight:500;margin-left:2px}
          .esp-billed{font-size:12px;color:#9ca3af;margin-bottom:4px}
          .esp-save-line{font-size:12px;font-weight:700;color:#D97706;margin-bottom:20px;min-height:18px}
          .esp-plan-card-pop .esp-save-line{color:#D97706}
          .esp-cta-plan{display:block;width:100%;text-align:center;padding:13px;border-radius:50px;font-weight:700;font-size:0.9rem;text-decoration:none;background:rgba(15,52,96,0.85);color:#fff;border:1.5px solid rgba(255,255,255,0.20);transition:all 0.22s;margin-bottom:24px}
          .esp-cta-plan:hover{background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-1px)}
          .esp-plan-card-pop .esp-cta-plan{background:linear-gradient(135deg,#D97706,#F59E0B);border-color:transparent;color:#fff;box-shadow:0 6px 20px rgba(217,119,6,0.35)}
          .esp-plan-card-pop .esp-cta-plan:hover{background:linear-gradient(135deg,#B45309,#D97706);box-shadow:0 8px 28px rgba(217,119,6,0.45)}
          .esp-plan-divider{height:1px;background:rgba(15,52,96,0.10);margin-bottom:20px}
          .esp-plan-card-pop .esp-plan-divider{background:rgba(217,119,6,0.15)}
          .esp-feat-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
          .esp-feat-list li{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#374151;line-height:1.4}
          .esp-feat-list li svg{color:#D97706;flex-shrink:0;margin-top:2px}
          .esp-trust{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin-top:32px;padding-top:32px;border-top:1px solid rgba(15,52,96,0.12)}
          .esp-trust-item{font-size:13px;color:#6b7280;display:flex;align-items:center;gap:6px;font-weight:500}
          .esp-trust-item svg{color:#D97706}

          /* ── DARK SECTION ── */
          .esp-dark-sec{padding:80px 40px;background:linear-gradient(135deg,#071e3d 0%,#0F3460 40%,#0a2549 100%);position:relative;z-index:1}
          .esp-dark-in{max-width:1280px;margin:0 auto}
          .esp-dark-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.55);display:block;margin-bottom:10px}
          .esp-dark-ttl{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#fff;margin-bottom:10px}
          .esp-dark-desc{font-size:15px;color:rgba(255,255,255,0.65);line-height:1.7;max-width:640px;margin-bottom:40px}
          .esp-dark-card{background:rgba(255,255,255,0.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:28px 24px;transition:border-color 0.2s,background 0.2s}
          .esp-dark-card:hover{background:rgba(255,255,255,0.10);border-color:rgba(217,119,6,0.40)}
          .esp-dark-card-num{width:36px;height:36px;background:rgba(217,119,6,0.20);border:1px solid rgba(217,119,6,0.40);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fbbf24;margin-bottom:14px}
          .esp-dark-card-ttl{font-size:15px;font-weight:700;color:#fff;margin-bottom:8px}
          .esp-dark-card-body{font-size:13px;color:rgba(255,255,255,0.65);line-height:1.65}

          /* ── RESULTS ── */
          .esp-results-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:40px}
          .esp-result-card{background:rgba(255,255,255,0.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:28px 20px;text-align:center;transition:border-color 0.2s}
          .esp-result-card:hover{border-color:rgba(217,119,6,0.50)}
          .esp-result-metric{font-size:clamp(2.2rem,4vw,3.2rem);font-weight:900;color:#D97706;letter-spacing:-1px;line-height:1;margin-bottom:8px}
          .esp-result-label{font-size:13px;font-weight:700;color:rgba(255,255,255,0.85);margin-bottom:8px}
          .esp-result-detail{font-size:11px;color:rgba(255,255,255,0.50);line-height:1.5}

          /* ── PLATFORM CARDS ── */
          .esp-platform-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:24px;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s}
          .esp-platform-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(15,52,96,0.12);border-color:rgba(217,119,6,0.30)}
          .esp-platform-dot{width:10px;height:10px;border-radius:50%;background:#D97706;margin-bottom:14px;box-shadow:0 0 0 3px rgba(217,119,6,0.15)}
          .esp-platform-name{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .esp-platform-note{font-size:12px;color:#4A6080;line-height:1.6}

          /* ── COMPARISON TABLE ── */
          .esp-table-wrap{overflow-x:auto;border-radius:16px;border:1px solid rgba(15,52,96,0.12);box-shadow:0 4px 24px rgba(15,52,96,0.06)}
          .esp-table{width:100%;border-collapse:collapse;font-size:13px}
          .esp-table th{padding:14px 20px;text-align:center;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7280;background:#f8fafd;border-bottom:1px solid rgba(15,52,96,0.10)}
          .esp-table th:first-child{text-align:left;color:#0F1F40}
          .esp-th-pop{background:linear-gradient(135deg,#0F3460,#1a4b82)!important;color:#fff!important}
          .esp-table td{padding:12px 20px;text-align:center;border-bottom:1px solid rgba(15,52,96,0.06);color:#374151}
          .esp-table td:first-child{text-align:left;font-weight:600;color:#0F1F40}
          .esp-table tr:last-child td{border-bottom:none}
          .esp-table tr:hover td{background:rgba(15,52,96,0.02)}
          .esp-td-pop{background:rgba(15,52,96,0.04)!important}
          .esp-dash-cell{color:#d1d5db}

          /* ── TESTIMONIALS ── */
          .esp-testi-sec{padding:72px 0;background:#f8fafd;overflow:hidden;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1}
          .esp-testi-hd{max-width:1280px;margin:0 auto 0;padding:0 40px;text-align:center}
          @keyframes esp-marq-l{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          @keyframes esp-marq-r{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
          .esp-trow{overflow:hidden;position:relative;margin-bottom:16px}
          .esp-trow:last-child{margin-bottom:0}
          .esp-tfade-l{position:absolute;left:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to right,#f8fafd,transparent);pointer-events:none}
          .esp-tfade-r{position:absolute;right:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to left,#f8fafd,transparent);pointer-events:none}
          .esp-ttrack{display:flex;gap:20px;width:max-content;padding-left:20px;animation:esp-marq-l 42s linear infinite;will-change:transform}
          .esp-ttrack-rev{display:flex;gap:20px;width:max-content;padding-left:20px;animation:esp-marq-r 42s linear infinite;will-change:transform}
          .esp-trow:hover .esp-ttrack,.esp-trow:hover .esp-ttrack-rev{animation-play-state:paused}
          .esp-tcard{width:400px;flex-shrink:0;background:#fff;border:1px solid rgba(15,52,96,0.08);border-radius:16px;padding:24px;box-shadow:0 2px 16px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:12px;user-select:none;transition:border-color 0.2s}
          .esp-tcard:hover{border-color:rgba(217,119,6,0.30)}
          .esp-tcard-star{color:#F59E0B;font-size:14px}
          .esp-tcard-text{font-size:14px;color:#374151;line-height:1.75;margin:0;flex-grow:1}
          .esp-tcard-author{display:flex;align-items:center;gap:12px;border-top:1px solid #f3f4f6;padding-top:16px}
          .esp-tcard-avatar{width:40px;height:40px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px}
          .esp-tcard-name{font-weight:700;color:#111827;font-size:13px}
          .esp-tcard-role{color:#9ca3af;font-size:12px;margin-top:1px}

          /* ── CONTACT FORM ── */
          .esp-contact-sec{padding:80px 40px;position:relative;z-index:1}
          .esp-contact-in{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:48px}
          .esp-contact-left h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.2;margin:0 0 16px;color:#0F1F40;letter-spacing:-0.5px}
          .esp-contact-left p{font-size:14px;color:#4A6080;line-height:1.65;margin:0 0 24px}
          .esp-trust-box{background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1.5px solid rgba(217,119,6,0.25);border-radius:16px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:14px}
          .esp-trust-row{display:flex;gap:12px;align-items:flex-start}
          .esp-trust-row svg{color:#D97706;flex-shrink:0;margin-top:2px}
          .esp-trust-row span{font-size:13px;color:#4A6080;line-height:1.55}
          .esp-contact-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:20px;border-top:1px solid rgba(15,52,96,0.10)}
          .esp-cs-num{font-size:32px;font-weight:900;color:#0F3460;line-height:1;margin-bottom:4px}
          .esp-cs-lbl{font-size:12px;color:#4A6080;font-weight:500;line-height:1.4}
          .esp-form-box{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .esp-form-box h3{font-size:22px;font-weight:700;margin:0 0 24px;color:#0F1F40;letter-spacing:-0.5px}
          .esp-form{display:flex;flex-direction:column;gap:16px}
          .esp-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
          .esp-fg{display:flex;flex-direction:column;gap:6px}
          .esp-fg label{font-size:12px;font-weight:600;color:#0F1F40}
          .esp-fg input,.esp-fg textarea,.esp-fg select{padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:8px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.60);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s;box-sizing:border-box;width:100%}
          .esp-fg input:focus,.esp-fg textarea:focus,.esp-fg select:focus{outline:none;border-color:#D97706;background:rgba(255,255,255,0.95);box-shadow:0 0 0 3px rgba(217,119,6,0.12)}
          .esp-fg textarea{resize:vertical}
          .esp-phone-wrap{display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:8px;overflow:hidden;background:rgba(255,255,255,0.60)}
          .esp-phone-wrap select{padding:10px;border:none;background:transparent;font-size:12px;width:auto!important;min-width:70px;max-width:90px;color:#0F1F40;font-family:inherit;flex-shrink:0}
          .esp-phone-wrap input{flex:1!important;width:auto!important;min-width:0!important;border:none!important;border-radius:0!important;padding:10px 14px!important;box-shadow:none!important;background:rgba(255,255,255,0.60)!important;color:#0F1F40!important}
          .esp-phone-wrap input:focus{outline:none!important;box-shadow:none!important;background:rgba(255,255,255,0.95)!important;border-color:transparent!important}
          .esp-consent-row{display:flex;gap:8px;align-items:flex-start}
          .esp-consent-row input[type="checkbox"]{margin-top:3px;width:16px;height:16px;cursor:pointer;flex-shrink:0;accent-color:#D97706}
          .esp-consent-row label{font-size:11px;color:#4A6080;line-height:1.5;margin:0}
          .esp-consent-row a{color:#0F3460;text-decoration:none}
          .esp-submit{padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25),inset 0 1px 0 rgba(255,255,255,0.15)}
          .esp-submit:hover:not(:disabled){background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px)}
          .esp-submit:disabled{opacity:0.65;cursor:not-allowed}
          .esp-success-wrap{text-align:center;padding:32px 0}
          .esp-success-icon{width:64px;height:64px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 8px 24px rgba(15,52,96,0.25)}
          .esp-success-icon svg{width:30px;height:30px;stroke:#fff;fill:none}
          .esp-success-wrap h3{font-size:20px;font-weight:700;color:#0F1F40;margin:0 0 10px}
          .esp-success-wrap p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}
          .esp-val-err{background:rgba(220,38,38,0.06);border:1px solid rgba(220,38,38,0.20);border-radius:8px;padding:10px 14px;font-size:13px;color:#dc2626;margin-bottom:4px}

          /* ── FAQ ── */
          .esp-faq-list{display:flex;flex-direction:column;gap:12px}
          .esp-fitem{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s}
          .esp-fitem.open{border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1)}
          .esp-fitem.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px}
          .esp-fq{width:100%;background:none;border:none;padding:20px 22px 20px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative}
          .esp-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.08);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s}
          .esp-fitem.open .esp-fq-badge{background:#D97706;color:#fff}
          .esp-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45}
          .esp-fitem.open .esp-fq-text{color:#D97706}
          .esp-fq-chevron{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s}
          .esp-fitem.open .esp-fq-chevron{transform:rotate(180deg);color:#D97706}
          .esp-fa{font-size:14px;color:#4b5563;line-height:1.8;padding:0 22px 20px 60px}

          /* ── RELATED ── */
          .esp-related-sec{background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px;position:relative;z-index:1}
          .esp-related-in{max-width:1280px;margin:0 auto;text-align:center}
          .esp-related-ey{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block}
          .esp-related-ttl{font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#111827;margin:0 0 16px}
          .esp-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px}
          .esp-related-divider{border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0}
          .esp-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}
          .esp-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s}
          .esp-rtag:hover{filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10)}
          .esp-rtag-blue{background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8}
          .esp-rtag-violet{background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9}
          .esp-rtag-amber{background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309}
          .esp-rtag-teal{background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E}
          .esp-rtag-rose{background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C}
          .esp-rtag-green{background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D}
          .esp-rtag-indigo{background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA}
          .esp-rtag-orange{background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C}
          .esp-rtag-cyan{background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490}
          .esp-rtag-slate{background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155}

          /* ── RESPONSIVE ── */
          @media(max-width:1024px){
            .esp-plan-cards{grid-template-columns:1fr;max-width:480px;margin:0 auto}
            .esp-plan-card-pop{transform:none}.esp-plan-card-pop:hover{transform:translateY(-4px)}
            .esp-3grid{grid-template-columns:repeat(2,1fr)}
            .esp-2grid{grid-template-columns:1fr}
            .esp-4grid{grid-template-columns:repeat(2,1fr)}
            .esp-results-grid{grid-template-columns:repeat(2,1fr)}
            .esp-contact-in{grid-template-columns:1fr}
          }
          @media(max-width:768px){
            .esp-sec,.esp-pricing-sec,.esp-dark-sec,.esp-contact-sec,.esp-related-sec,.esp-testi-sec{padding-left:24px;padding-right:24px}
            .esp-testi-hd{padding:0 24px}
            .esp-3grid{grid-template-columns:1fr}
            .esp-results-grid{grid-template-columns:1fr}
            .esp-form-row{grid-template-columns:1fr}
            .esp-tcard{width:320px}
            .esp-related-ttl{font-size:28px}
            .esp-trust{gap:12px}
            /* ── MOBILE PERFORMANCE: disable expensive GPU effects ── */
            .esp-orb1,.esp-orb2,.esp-orb3{display:none}
            .esp-glass,.esp-plan-card,.esp-fitem,.esp-form-box,.esp-trust-box,.esp-platform-card{backdrop-filter:none;-webkit-backdrop-filter:none}
            .esp-submit{backdrop-filter:none;-webkit-backdrop-filter:none}
            .esp-dark-card{backdrop-filter:none;-webkit-backdrop-filter:none}
            .esp-related-sec{backdrop-filter:none;-webkit-backdrop-filter:none}
            .esp-trow:last-child{display:none}
          }
          @media(max-width:480px){
            .esp-tcard{width:280px;padding:18px}
            .esp-related-ttl{font-size:24px}
            .esp-contact-stats{grid-template-columns:1fr 1fr 1fr}
          }
        `}</style>
      </Head>

      <div className="esp-page">
        <div className="esp-orb1"/><div className="esp-orb2"/><div className="esp-orb3"/>

        {/* ── HERO ── */}
        <ServiceHero
          eyebrow="Ecommerce SEO Packages · Shopify · WooCommerce · Magento"
          title={<>Ecommerce SEO Packages — <AuroraText>Grow Organic Revenue</AuroraText>, Not Just Rankings</>}
          subtext="Transparent monthly ecommerce SEO packages for Shopify, WooCommerce, Magento, and BigCommerce stores — covering technical SEO, product page optimisation, link building, and content. All in one plan."
          primaryCta={{ label: 'Get a Free Store Audit', href: '#contact' }}
          secondaryCta={{ label: 'Compare Plans', href: '#plans' }}
          stats={[
            { label: 'Ecommerce Stores', value: '180', suffix: '+' },
            { label: 'Avg Revenue Growth', value: '62', prefix: '+', suffix: '%' },
            { label: 'Years Experience', value: '15', suffix: '+' },
            { label: 'Client Retention', value: '94', suffix: '%' },
          ]}
        />

        {/* ── PRICING PLANS ── */}
        <section className="esp-pricing-sec" id="plans">
          <div className="esp-pricing-in">
            <div className="esp-reveal" style={{textAlign:'center',marginBottom:8}}>
              <span className="esp-ey">Pricing Plans</span>
              <h2 className="esp-ttl" style={{maxWidth:700,margin:'0 auto 12px'}}>Choose Your <AuroraText>Ecommerce SEO Package</AuroraText></h2>
              <p className="esp-desc" style={{margin:'0 auto 44px',textAlign:'center',maxWidth:700}}>All packages include a dedicated account manager, monthly reporting, and a 30-day onboarding plan. No setup fee. Cancel anytime on monthly.</p>
            </div>
            <div className="esp-tog-row">
              <span className={'esp-tog-lbl' + (!isYearly ? ' active' : '')}>Monthly</span>
              <button className={'esp-tog-btn' + (isYearly ? ' on' : '')} onClick={() => setIsYearly(!isYearly)} aria-label="Toggle billing period">
                <span className="esp-tog-knob"/>
              </button>
              <span className={'esp-tog-lbl' + (isYearly ? ' active' : '')}>Yearly <span className="esp-save-badge">Save 17%</span></span>
            </div>
            <div className="esp-plan-cards">
              {PLANS.map(plan => (
                <div key={plan.slug} className={'esp-plan-card' + (plan.popular ? ' esp-plan-card-pop' : '')}>
                  {plan.popular && <span className="esp-pop-tag">Most Popular</span>}
                  <div className="esp-plan-name">{plan.name}</div>
                  <p className="esp-plan-desc">{plan.desc}</p>
                  <div className="esp-price-row">
                    <span className="esp-currency">$</span>
                    <span className="esp-amount">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                    <span className="esp-per">/mo</span>
                  </div>
                  <div className="esp-billed">{isYearly ? 'Billed annually' : 'Billed monthly'}</div>
                  <div className="esp-save-line">{isYearly ? 'Save $' + plan.yearlySave.toLocaleString() + ' per year' : ' '}</div>
                  <a href="#contact" className="esp-cta-plan">Get Started →</a>
                  <div className="esp-plan-divider"/>
                  <ul className="esp-feat-list">
                    {plan.features.map(f => <li key={f}>{CHECK}<span>{f}</span></li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="esp-trust">
              {['No setup fee','Cancel with 30 days notice','Dedicated account manager on all plans','Custom Enterprise plans available'].map(t => (
                <span key={t} className="esp-trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ── */}
        <section className="esp-sec esp-white">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-ey">Core Deliverables</span>
              <h2 className="esp-ttl">{"What's Included in Every"} <AuroraText>Ecommerce SEO Plan</AuroraText></h2>
              <p className="esp-desc">Every package tier — from Starter to Pro — includes these core deliverables. The scale, depth, and frequency increases with each plan.</p>
            </div>
            <div className="esp-3grid">
              {INCLUDED.map((c, i) => (
                <div key={c.title} className="esp-glass esp-reveal" style={{transitionDelay: `${i * 60}ms`}}>
                  <div className="esp-num-badge">{String(i+1).padStart(2,'0')}</div>
                  <div className="esp-card-ttl">{c.title}</div>
                  <div className="esp-card-body">{c.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY ECOMMERCE SEO MATTERS ── */}
        <section className="esp-sec">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-ey">Why It Works</span>
              <h2 className="esp-ttl">Why <AuroraText>Ecommerce SEO</AuroraText> Delivers Better ROI Than Paid Ads</h2>
              <p className="esp-desc">Paid ads stop the moment you stop paying. SEO builds a compounding asset that generates organic revenue month after month.</p>
            </div>
            <div className="esp-3grid">
              {WHY_REASONS.map((r, i) => (
                <div key={r.n} className="esp-glass esp-reveal" style={{transitionDelay: `${i * 60}ms`}}>
                  <div className="esp-num-badge">{r.n}</div>
                  <div className="esp-card-ttl">{r.title}</div>
                  <div className="esp-card-body">{r.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS — DARK ── */}
        <section className="esp-dark-sec">
          <div className="esp-dark-in">
            <div className="esp-reveal" style={{textAlign:'center',marginBottom:48}}>
              <span className="esp-dark-ey">Proven Results</span>
              <h2 className="esp-dark-ttl"><AuroraText>Ecommerce SEO Results</AuroraText>: Real Organic Revenue Growth</h2>
              <p className="esp-dark-desc" style={{margin:'0 auto'}}>Real metrics from real ecommerce stores — across platforms, regions, and verticals.</p>
            </div>
            <div className="esp-results-grid esp-reveal">
              {RESULTS.map(r => (
                <div key={r.metric} className="esp-result-card">
                  <div className="esp-result-metric">{r.metric}</div>
                  <div className="esp-result-label">{r.label}</div>
                  <div className="esp-result-detail">{r.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR PROCESS ── */}
        <section className="esp-sec esp-white">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-ey">How It Works</span>
              <h2 className="esp-ttl">Our <AuroraText>Ecommerce SEO Process</AuroraText></h2>
              <p className="esp-desc">A systematic, repeatable process that coordinates technical fixes, on-page optimisation, content, and link building into one coherent strategy.</p>
            </div>
            <div className="esp-3grid">
              {PROCESS_STEPS.map((s, i) => (
                <div key={s.n} className="esp-glass esp-reveal" style={{transitionDelay: `${i * 60}ms`}}>
                  <div className="esp-num-badge">{s.n}</div>
                  <div className="esp-card-ttl">{s.title}</div>
                  <div className="esp-card-body">{s.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLATFORMS ── */}
        <section className="esp-sec">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-ey">Platform Support</span>
              <h2 className="esp-ttl">Ecommerce SEO for <AuroraText>Every Major Platform</AuroraText></h2>
              <p className="esp-desc">Each ecommerce platform has unique technical SEO characteristics. We apply platform-specific knowledge — not one-size-fits-all tactics.</p>
            </div>
            <div className="esp-3grid">
              {PLATFORMS.map((p, i) => (
                <div key={p.name} className="esp-platform-card esp-reveal" style={{transitionDelay: `${i * 60}ms`}}>
                  <div className="esp-platform-dot"/>
                  <div className="esp-platform-name">{p.name}</div>
                  <div className="esp-platform-note">{p.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI & GEO DARK ── */}
        <section className="esp-dark-sec">
          <div className="esp-dark-in">
            <div className="esp-reveal" style={{textAlign:'center',marginBottom:48}}>
              <span className="esp-dark-ey">AI & GEO Optimisation</span>
              <h2 className="esp-dark-ttl">Built for <AuroraText>Google AI Overviews</AuroraText> &amp; the Next Era of Search</h2>
              <p className="esp-dark-desc" style={{margin:'0 auto'}}>{"Google's AI is reshaping how shoppers discover products. We optimise your store to appear in AI-generated shopping answers — not just traditional search results."}</p>
            </div>
            <div className="esp-2grid esp-reveal">
              {AI_CARDS.map(c => (
                <div key={c.title} className="esp-dark-card">
                  <div className="esp-dark-card-num">AI</div>
                  <div className="esp-dark-card-ttl">{c.title}</div>
                  <div className="esp-dark-card-body">{c.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="esp-sec esp-white">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-ey">Feature Breakdown</span>
              <h2 className="esp-ttl"><AuroraText>Package Comparison</AuroraText> at a Glance</h2>
              <p className="esp-desc">A side-by-side breakdown of what each ecommerce SEO plan includes — so you can choose with confidence.</p>
            </div>
            <div className="esp-table-wrap esp-reveal">
              <table className="esp-table">
                <thead>
                  <tr>
                    <th style={{textAlign:'left'}}>Feature</th>
                    <th>Starter</th>
                    <th className="esp-th-pop">Growth</th>
                    <th>Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Products/SKUs optimised','Up to 50','Up to 200','Unlimited'],
                    ['Technical SEO','Quarterly','Monthly','Weekly'],
                    ['Keywords tracked','10','30','60+'],
                    ['Blog posts/month','—','2','4'],
                    ['Link placements/month','—','5','12'],
                    ['Google Shopping','Audit only','Full optimisation','+ Performance Max'],
                    ['International SEO','—','—','Up to 3 markets'],
                    ['Competitor analysis','—','Monthly','Monthly'],
                    ['CRO audit','—','Recommendations','Quarterly full audit'],
                    ['Account manager','—','✓','✓ (dedicated)'],
                    ['Reporting','Monthly','Fortnightly','Weekly'],
                    ['Support','Email 48hr','Priority 24hr','Phone + Priority'],
                  ].map((row, i) => (
                    <tr key={i}>
                      <td>{row[0]}</td>
                      <td className={row[1]==='—'?'esp-dash-cell':''}>{row[1]}</td>
                      <td className={'esp-td-pop' + (row[2]==='—'?' esp-dash-cell':'')}>{row[2]}</td>
                      <td className={row[3]==='—'?'esp-dash-cell':''}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── WHY DIFFERENT ── */}
        <section className="esp-sec">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-ey">Why 1Solutions</span>
              <h2 className="esp-ttl">Platform-Native <AuroraText>Ecommerce SEO Expertise</AuroraText></h2>
              <p className="esp-desc">Not all ecommerce SEO agencies are equal. Here is what separates our approach from generic digital marketing.</p>
            </div>
            <div className="esp-3grid">
              {DIFFERENT.map((c, i) => (
                <div key={c.title} className="esp-glass esp-reveal" style={{transitionDelay: `${i * 60}ms`}}>
                  <div className="esp-card-ttl">{c.title}</div>
                  <div className="esp-card-body">{c.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="esp-testi-sec">
          <div className="esp-testi-hd esp-reveal" style={{marginBottom:40}}>
            <span className="esp-ey">Client Reviews</span>
            <h2 className="esp-ttl">What Our <AuroraText>Ecommerce SEO Clients</AuroraText> Say</h2>
            <p style={{fontSize:15,color:'#4A6080',lineHeight:1.7,maxWidth:600,margin:'0 auto'}}>Trusted by 180+ ecommerce stores across the US, Canada, Australia, and Europe for 15+ years.</p>
          </div>
          <div style={{marginTop:40}}>
            <div className="esp-trow">
              <div className="esp-tfade-l"/><div className="esp-tfade-r"/>
              <div className="esp-ttrack">
                {ROW1.map((t, i) => (
                  <div key={i} className="esp-tcard">
                    <div className="esp-tcard-star">★★★★★</div>
                    <p className="esp-tcard-text">{t.text}</p>
                    <div className="esp-tcard-author">
                      <div className="esp-tcard-avatar" style={{background:t.bg}}>{t.initials}</div>
                      <div>
                        <div className="esp-tcard-name">{t.name}</div>
                        <div className="esp-tcard-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="esp-trow">
              <div className="esp-tfade-l"/><div className="esp-tfade-r"/>
              <div className="esp-ttrack-rev">
                {ROW2.map((t, i) => (
                  <div key={i} className="esp-tcard">
                    <div className="esp-tcard-star">★★★★★</div>
                    <p className="esp-tcard-text">{t.text}</p>
                    <div className="esp-tcard-author">
                      <div className="esp-tcard-avatar" style={{background:t.bg}}>{t.initials}</div>
                      <div>
                        <div className="esp-tcard-name">{t.name}</div>
                        <div className="esp-tcard-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section className="esp-contact-sec" id="contact">
          <div className="esp-contact-in">
            <div className="esp-reveal">
              <span className="esp-ey">Free Store Audit</span>
              <h2 className="esp-contact-left" style={{fontSize:'clamp(1.8rem,3.5vw,2.6rem)',fontWeight:900,lineHeight:1.2,margin:'0 0 16px',color:'#0F1F40',letterSpacing:-0.5}}>Get Your Free <AuroraText>Ecommerce SEO Audit</AuroraText></h2>
              <p style={{fontSize:14,color:'#4A6080',lineHeight:1.65,margin:'0 0 24px'}}>Tell us about your store and we will review your current SEO health, identify your biggest growth blockers, and recommend the right package — completely free.</p>
              <div className="esp-trust-box">
                {[
                  'Confidential & no-obligation — your data stays with us',
                  'Reviewed by a senior ecommerce SEO strategist, not a junior',
                  'Audit delivered within 48 hours of your request',
                  'No hard sell — just honest expert advice on your store',
                ].map(b => (
                  <div key={b} className="esp-trust-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{b}</span>
                  </div>
                ))}
                <div className="esp-contact-stats">
                  {[['180+','Ecommerce Stores'],['15+','Years Experience'],['94%','Client Retention']].map(([n,l]) => (
                    <div key={l}>
                      <div className="esp-cs-num">{n}</div>
                      <div className="esp-cs-lbl">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="esp-form-box esp-reveal">
              <h3>Request Your Free Audit</h3>
              {auditSt === 'success' ? (
                <div className="esp-success-wrap">
                  <div className="esp-success-icon">
                    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>Thank you. A senior ecommerce SEO strategist will review your store and be in touch within 48 hours.</p>
                </div>
              ) : (
                <form className="esp-form" onSubmit={_auditSubmit} noValidate>
                  {auditSt === 'validation' && <p className="esp-val-err">Please complete all fields and accept the terms before submitting.</p>}
                  {auditSt === 'error' && <p className="esp-val-err">Something went wrong. Please try again or email us directly.</p>}
                  <div className="esp-form-row">
                    <div className="esp-fg">
                      <label htmlFor="ea-name">Full Name *</label>
                      <input id="ea-name" name="ea-name" type="text" placeholder="Jane Smith" required/>
                    </div>
                    <div className="esp-fg">
                      <label htmlFor="ea-email">Business Email *</label>
                      <input id="ea-email" name="ea-email" type="email" placeholder="jane@mystore.com" required/>
                    </div>
                  </div>
                  <div className="esp-form-row">
                    <div className="esp-fg">
                      <label>Phone Number *</label>
                      <div className="esp-phone-wrap">
                        <select name="ea-cc" aria-label="Country code">
                          <option value="+1">+1 US</option>
                          <option value="+1">+1 CA</option>
                          <option value="+61">+61 AU</option>
                          <option value="+44">+44 GB</option>
                          <option value="+91">+91 IN</option>
                          <option value="+971">+971</option>
                          <option value="+65">+65</option>
                        </select>
                        <input name="ea-phone" type="tel" placeholder="Phone number" required aria-label="Phone number"/>
                      </div>
                    </div>
                    <div className="esp-fg">
                      <label htmlFor="ea-url">Store URL *</label>
                      <input id="ea-url" name="ea-url" type="url" placeholder="https://mystore.com" required/>
                    </div>
                  </div>
                  <div className="esp-fg">
                    <label htmlFor="ea-platform">Ecommerce Platform *</label>
                    <select id="ea-platform" name="ea-platform" required defaultValue="">
                      <option value="" disabled>Select your platform...</option>
                      <option>Shopify</option><option>Shopify Plus</option><option>WooCommerce</option>
                      <option>Magento 2</option><option>BigCommerce</option><option>PrestaShop</option>
                      <option>OpenCart</option><option>Custom / Headless</option><option>Other</option>
                    </select>
                  </div>
                  <div className="esp-fg">
                    <label htmlFor="ea-challenge">Main SEO Challenge *</label>
                    <select id="ea-challenge" name="ea-challenge" required defaultValue="">
                      <option value="" disabled>Select your main challenge...</option>
                      <option>Low organic traffic</option><option>Poor product page rankings</option>
                      <option>Duplicate content issues</option><option>Google Shopping not converting</option>
                      <option>Technical site issues</option><option>Competitor outranking me</option>
                      <option>International expansion</option><option>Other</option>
                    </select>
                  </div>
                  <div className="esp-fg">
                    <label htmlFor="ea-goals">Goals &amp; Details *</label>
                    <textarea id="ea-goals" name="ea-goals" rows={4} placeholder="Monthly organic revenue target, current issues, catalogue size..." required/>
                  </div>
                  <div className="esp-consent-row">
                    <input type="checkbox" id="esp-consent"/>
                    <label htmlFor="esp-consent">
                      I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions storing my data to respond to this enquiry. *
                    </label>
                  </div>
                  <button type="submit" className="esp-submit" disabled={auditSt === 'loading'}>
                    {auditSt === 'loading' ? 'Sending...' : 'Send My Free Audit Request →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="esp-sec esp-white">
          <div className="esp-sec-in" style={{maxWidth:860,margin:'0 auto'}}>
            <div className="esp-reveal" style={{textAlign:'center',marginBottom:40}}>
              <span className="esp-ey">Got Questions?</span>
              <h2 className="esp-ttl"><AuroraText>Ecommerce SEO Package</AuroraText> FAQs</h2>
              <p className="esp-desc" style={{margin:'0 auto'}}>Everything you need to know before choosing an ecommerce SEO package.</p>
            </div>
            <div className="esp-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={'esp-fitem' + (openFaq === i ? ' open' : '')}>
                  <button className="esp-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="esp-fq-badge">{String(i+1).padStart(2,'0')}</span>
                    <span className="esp-fq-text">{f.q}</span>
                    <svg className="esp-fq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFaq === i && <div className="esp-fa">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="esp-related-sec">
          <div className="esp-related-in esp-reveal">
            <span className="esp-related-ey">ECOMMERCE SEO RELATED OFFERINGS</span>
            <h2 className="esp-related-ttl">Explore <AuroraText>Related Services</AuroraText> and Technologies</h2>
            <p className="esp-related-sub">Pair ecommerce SEO with complementary services to maximise organic revenue across your full digital marketing funnel.</p>
            <hr className="esp-related-divider"/>
            <div className="esp-related-tags">
              {RELATED_TAGS.map(({href, label, cls}) => (
                <Link key={href} href={href} className={`esp-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
