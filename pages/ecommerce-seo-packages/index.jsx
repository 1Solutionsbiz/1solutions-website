import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';

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

const STATS = [
  { label:'Ecommerce Stores', val:'180+' },
  { label:'Avg Revenue Growth', val:'+62%' },
  { label:'Years Experience', val:'15+' },
  { label:'Client Retention', val:'94%' },
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
  {href:'/seo-services-company',label:'SEO Services Company',cls:'esp-rtag-blue'},
  {href:'/link-building-packages',label:'Link Building Packages',cls:'esp-rtag-violet'},
  {href:'/local-seo-packages',label:'Local SEO Packages',cls:'esp-rtag-teal'},
  {href:'/ecommerce-seo-services',label:'Ecommerce SEO Services',cls:'esp-rtag-indigo'},
  {href:'/technical-seo-audit',label:'Technical SEO Audit',cls:'esp-rtag-amber'},
  {href:'/content-marketing-services',label:'Content Marketing',cls:'esp-rtag-green'},
  {href:'/google-ads-management',label:'Google Ads Management',cls:'esp-rtag-orange'},
  {href:'/shopify-seo-services',label:'Shopify SEO Services',cls:'esp-rtag-rose'},
  {href:'/woocommerce-seo-services',label:'WooCommerce SEO',cls:'esp-rtag-slate'},
  {href:'/ecommerce-website-development-services',label:'Ecommerce Development',cls:'esp-rtag-cyan'},
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

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('esp-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.esp-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
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
      { '@type': 'Service', name: 'Ecommerce SEO Packages', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Ecommerce SEO', areaServed: 'Worldwide', url: 'https://www.1solutions.biz/ecommerce-seo-packages/',
        offers: PLANS.map(function(p) { return { '@type': 'Offer', name: p.name + ' Ecommerce SEO Package', price: p.monthlyPrice, priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: p.monthlyPrice, priceCurrency: 'USD', unitText: 'month' } }; })
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(function(f) { return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }; }) },
    ],
  };

  return (
    <>
      <Head>
        <title>Ecommerce SEO Packages &amp; Pricing | 1Solutions — Shopify, WooCommerce, Magento</title>
        <meta name="description" content="Ecommerce SEO packages from $599/mo. Specialist SEO for Shopify, WooCommerce, and Magento stores — product page optimisation, technical SEO, schema markup, content, and link building." />
        <meta name="keywords" content="ecommerce seo packages, ecommerce seo pricing, shopify seo packages, woocommerce seo pricing, magento seo packages, ecommerce seo plans" />
        <link rel="canonical" href="https://www.1solutions.biz/ecommerce-seo-packages/" />
        <meta property="og:title" content="Ecommerce SEO Packages &amp; Pricing | 1Solutions" />
        <meta property="og:description" content="Ecommerce SEO packages for Shopify, WooCommerce, and Magento stores. Transparent monthly pricing from $599/mo." />
        <meta property="og:url" content="https://www.1solutions.biz/ecommerce-seo-packages/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .esp-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .esp-page *,.esp-page *::before,.esp-page *::after{box-sizing:border-box}
          .esp-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .esp-visible{opacity:1;transform:none}
          .esp-sec{padding:80px 40px;position:relative;z-index:1}
          .esp-sec-in{max-width:1280px;margin:0 auto}
          .esp-white-sec{background:#fff}
          .esp-light-sec{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08)}
          .esp-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1D4ED8;display:block;margin-bottom:10px}
          .esp-sec-ttl{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#111827;margin:0 0 16px}
          .esp-sec-sub{font-size:15px;color:#4A6080;line-height:1.7;max-width:700px;margin:0 0 48px}
          .esp-dark-sec{padding:80px 40px;background:linear-gradient(135deg,#071e3d 0%,#0c1c44 40%,#0a2549 100%);position:relative;z-index:1}
          .esp-dark-in{max-width:1280px;margin:0 auto}
          .esp-dark-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.55);display:block;margin-bottom:10px}
          .esp-dark-ttl{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#fff;margin:0 0 16px}
          .esp-dark-sub{font-size:15px;color:rgba(255,255,255,.65);line-height:1.7;max-width:700px;margin:0 0 48px}

          /* Hero */
          .esp-hero{background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 30%,#e0f2fe 60%,#ede9fe 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .esp-hero-orb1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(29,78,216,.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .esp-hero-orb2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(30,58,138,.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .esp-hero-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .esp-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .esp-bc a{color:#6b7280;text-decoration:none}.esp-bc a:hover{color:#1D4ED8}.esp-bc-sep{color:#d1d5db}
          .esp-ey-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(29,78,216,.08);border:1px solid rgba(29,78,216,.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#1D4ED8;margin-bottom:28px}
          .esp-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;color:#0F1F40;margin:0 0 20px;max-width:920px;margin-left:auto;margin-right:auto}
          .esp-hero-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:640px;margin:0 auto 36px}
          .esp-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .esp-btn-p{display:inline-flex;align-items:center;gap:8px;background:#1D4ED8;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(29,78,216,.28)}
          .esp-btn-p:hover{background:#1E3A8A;box-shadow:0 8px 32px rgba(29,78,216,.38);transform:translateY(-2px)}
          .esp-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s}
          .esp-btn-s:hover{border-color:#1D4ED8;color:#1D4ED8;transform:translateY(-2px)}
          .esp-stats-bar{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(29,78,216,.07)}
          .esp-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(29,78,216,.08)}.esp-stat:last-child{border-right:none}
          .esp-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .esp-stat-v{font-size:1.6rem;font-weight:900;color:#1D4ED8;letter-spacing:-.5px}

          /* Pricing */
          .esp-pricing-sec{background:#f8fafd;padding:80px 40px}
          .esp-pricing-in{max-width:1280px;margin:0 auto}
          .esp-tog-row{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:48px}
          .esp-tog-lbl{font-size:15px;font-weight:600;color:#6b7280;transition:color .2s}
          .esp-tog-lbl.active{color:#0F1F40}
          .esp-tog-btn{width:50px;height:28px;background:#d1d5db;border-radius:100px;position:relative;cursor:pointer;border:none;padding:0;transition:background .25s;flex-shrink:0}
          .esp-tog-btn.on{background:#1D4ED8}
          .esp-tog-knob{position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .25s;box-shadow:0 1px 4px rgba(0,0,0,.18)}
          .esp-tog-btn.on .esp-tog-knob{transform:translateX(22px)}
          .esp-save-badge{display:inline-flex;align-items:center;background:rgba(29,78,216,.10);color:#1D4ED8;font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;margin-left:6px;letter-spacing:.5px}
          .esp-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start}
          .esp-card{background:#fff;border:1.5px solid #e5e9f0;border-radius:24px;padding:32px 28px;position:relative;transition:box-shadow .22s,transform .22s;overflow:hidden}
          .esp-card:hover{box-shadow:0 12px 40px rgba(29,78,216,.08)}
          .esp-card-pop{background:linear-gradient(135deg,#1E3A8A 0%,#1D4ED8 100%);border-color:transparent;transform:scale(1.04);box-shadow:0 20px 60px rgba(29,78,216,.25)}
          .esp-card-pop:hover{transform:scale(1.04) translateY(-4px)}
          .esp-pop-tag{position:absolute;top:20px;right:20px;background:rgba(255,255,255,.20);color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;letter-spacing:.5px;border:1px solid rgba(255,255,255,.30)}
          .esp-plan-name{font-size:22px;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .esp-card-pop .esp-plan-name{color:#fff}
          .esp-plan-desc{font-size:13px;color:#6b7280;line-height:1.55;margin-bottom:24px}
          .esp-card-pop .esp-plan-desc{color:rgba(255,255,255,.75)}
          .esp-price-row{display:flex;align-items:baseline;gap:4px;margin-bottom:4px}
          .esp-currency{font-size:1.4rem;font-weight:700;color:#1D4ED8}
          .esp-card-pop .esp-currency{color:rgba(255,255,255,.85)}
          .esp-amount{font-size:3rem;font-weight:900;letter-spacing:-2px;color:#0F1F40;line-height:1}
          .esp-card-pop .esp-amount{color:#fff}
          .esp-per{font-size:13px;color:#9ca3af;font-weight:500;margin-left:2px}
          .esp-card-pop .esp-per{color:rgba(255,255,255,.65)}
          .esp-billed{font-size:12px;color:#9ca3af;margin-bottom:4px}
          .esp-card-pop .esp-billed{color:rgba(255,255,255,.60)}
          .esp-save-line{font-size:12px;font-weight:700;color:#16a34a;margin-bottom:20px;min-height:18px}
          .esp-card-pop .esp-save-line{color:#86efac}
          .esp-cta-card{display:block;width:100%;text-align:center;padding:13px;border-radius:50px;font-weight:700;font-size:.9rem;text-decoration:none;background:#1D4ED8;color:#fff;transition:all .22s;margin-bottom:24px}
          .esp-cta-card:hover{background:#1E3A8A;transform:translateY(-1px);box-shadow:0 6px 24px rgba(29,78,216,.28)}
          .esp-card-pop .esp-cta-card{background:#fff;color:#1D4ED8}
          .esp-card-pop .esp-cta-card:hover{background:#eff6ff}
          .esp-divider{height:1px;background:#f1f5f9;margin-bottom:20px}
          .esp-card-pop .esp-divider{background:rgba(255,255,255,.15)}
          .esp-feat-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
          .esp-feat-list li{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#374151;line-height:1.4}
          .esp-card-pop .esp-feat-list li{color:rgba(255,255,255,.88)}
          .esp-feat-list li svg{color:#1D4ED8;flex-shrink:0;margin-top:2px}
          .esp-card-pop .esp-feat-list li svg{color:#93c5fd}
          .esp-trust{display:flex;justify-content:center;gap:32px;flex-wrap:wrap;margin-top:32px;padding-top:32px;border-top:1px solid #e5e9f0}
          .esp-trust-item{font-size:13px;color:#6b7280;display:flex;align-items:center;gap:6px;font-weight:500}

          /* Cards grid */
          .esp-3grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .esp-2grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
          .esp-glass{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,.07),inset 0 1px 0 rgba(255,255,255,.95)}
          .esp-card-icon{width:44px;height:44px;background:rgba(29,78,216,.10);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .esp-card-icon svg{width:22px;height:22px;stroke:#1D4ED8;fill:none}
          .esp-card-ttl{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .esp-card-body{font-size:13px;color:#4A6080;line-height:1.65}
          .esp-num-badge{width:40px;height:40px;background:linear-gradient(135deg,#1E3A8A,#1D4ED8);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:800;margin-bottom:16px;box-shadow:0 4px 12px rgba(29,78,216,.25)}
          .esp-eyenum{font-size:11px;font-weight:800;letter-spacing:2px;color:#1D4ED8;margin-bottom:10px}

          /* Dark cards */
          .esp-dark-card{background:rgba(255,255,255,.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:28px 24px}
          .esp-dark-card-icon{width:44px;height:44px;background:rgba(255,255,255,.12);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .esp-dark-card-icon svg{width:22px;height:22px;stroke:rgba(255,255,255,.85);fill:none}
          .esp-dark-card-ttl{font-size:16px;font-weight:700;color:#fff;margin-bottom:8px}
          .esp-dark-card-body{font-size:13px;color:rgba(255,255,255,.65);line-height:1.65}

          /* Platform cards */
          .esp-platform-card{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;text-align:center;box-shadow:0 4px 24px rgba(15,52,96,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .25s,box-shadow .25s}
          .esp-platform-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(29,78,216,.12)}
          .esp-platform-icon{width:48px;height:48px;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;background:rgba(29,78,216,.10);border-radius:12px}
          .esp-platform-icon svg{width:24px;height:24px;stroke:#1D4ED8;fill:none}
          .esp-platform-name{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .esp-platform-note{font-size:12px;color:#6b7280;line-height:1.55}

          /* Comparison table */
          .esp-table-wrap{overflow-x:auto;border-radius:16px;border:1px solid rgba(15,52,96,.12);box-shadow:0 4px 24px rgba(15,52,96,.06)}
          .esp-table{width:100%;border-collapse:collapse;font-size:13px}
          .esp-table th{padding:14px 20px;text-align:center;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7280;background:#f8fafd;border-bottom:1px solid rgba(15,52,96,.10)}
          .esp-table th:first-child{text-align:left;color:#0F1F40}
          .esp-th-pop{background:linear-gradient(135deg,#1E3A8A,#1D4ED8)!important;color:#fff!important}
          .esp-table td{padding:12px 20px;text-align:center;border-bottom:1px solid rgba(15,52,96,.06);color:#374151}
          .esp-table td:first-child{text-align:left;font-weight:600;color:#0F1F40}
          .esp-table tr:last-child td{border-bottom:none}
          .esp-table tr:hover td{background:rgba(29,78,216,.02)}
          .esp-td-pop{background:rgba(29,78,216,.04)!important}
          .esp-chk{color:#16a34a;font-weight:700}
          .esp-dash-cell{color:#d1d5db}

          /* Results */
          .esp-results-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-bottom:48px}
          .esp-result-card{background:rgba(255,255,255,.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:28px 24px;text-align:center}
          .esp-result-metric{font-size:clamp(2.2rem,4vw,3.5rem);font-weight:900;color:#fff;letter-spacing:-1px;line-height:1;margin-bottom:8px}
          .esp-result-label{font-size:13px;font-weight:700;color:rgba(255,255,255,.85);margin-bottom:8px}
          .esp-result-detail{font-size:11px;color:rgba(255,255,255,.50);line-height:1.5}
          .esp-results-cta{text-align:center}
          .esp-results-cta a{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.12);backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,.25);color:#fff;padding:14px 32px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s}
          .esp-results-cta a:hover{background:rgba(255,255,255,.20);border-color:rgba(255,255,255,.45);transform:translateY(-2px)}

          /* Testimonials */
          .esp-testi-sec{padding:72px 0;background:linear-gradient(135deg,#faf8ff 0%,#f7f4ff 50%,#f3f8ff 100%);overflow:hidden}
          .esp-testi-hd{max-width:1280px;margin:0 auto 40px;padding:0 40px;text-align:center}
          .esp-trow{overflow:hidden;position:relative}
          .esp-trow+.esp-trow{margin-top:16px}
          .esp-tfade-l{position:absolute;left:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to right,#faf8ff,transparent);pointer-events:none}
          .esp-tfade-r{position:absolute;right:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to left,#faf8ff,transparent);pointer-events:none}
          .esp-ttrack{display:flex;gap:20px;width:max-content;padding-left:20px;animation:esp-marq-l 42s linear infinite}
          .esp-ttrack-rev{display:flex;gap:20px;width:max-content;padding-left:20px;animation:esp-marq-r 42s linear infinite}
          .esp-trow:hover .esp-ttrack,.esp-trow:hover .esp-ttrack-rev{animation-play-state:paused}
          @keyframes esp-marq-l{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          @keyframes esp-marq-r{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
          .esp-tcard{width:440px;flex-shrink:0;background:#fff;border:1px solid rgba(15,52,96,.08);border-radius:16px;padding:20px 24px;box-shadow:0 2px 16px rgba(0,0,0,.05);display:flex;flex-direction:column;gap:12px;user-select:none}
          .esp-tcard-star{color:#F59E0B;font-size:14px}
          .esp-tcard-text{font-size:14px;color:#374151;line-height:1.75;margin:0;flex-grow:1}
          .esp-tcard-author{display:flex;align-items:center;gap:12px;border-top:1px solid #f3f4f6;padding-top:16px}
          .esp-tcard-avatar{width:40px;height:40px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px}
          .esp-tcard-name{font-weight:700;color:#111827;font-size:13px}
          .esp-tcard-role{color:#9ca3af;font-size:12px;margin-top:1px}

          /* Audit form */
          .esp-audit-sec{padding:72px 40px;background:linear-gradient(135deg,rgba(254,243,199,.70) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,.80)}
          .esp-audit-in{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:48px}
          .esp-audit-ttl{font-size:clamp(2rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;margin:0 0 16px;color:#111827}
          .esp-audit-desc{font-size:14px;color:#4A6080;line-height:1.65;margin:0 0 24px}
          .esp-audit-benefits-box{background:linear-gradient(135deg,rgba(255,255,255,.70) 0%,rgba(219,234,254,.35) 100%);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:16px}
          .esp-audit-ben{display:flex;gap:12px;align-items:flex-start}
          .esp-audit-ben-icon{width:20px;height:20px;stroke:#D97706;fill:none;flex-shrink:0;margin-top:2px}
          .esp-audit-ben-text{font-size:13px;color:#4A6080;line-height:1.55}
          .esp-audit-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:20px;border-top:1px solid rgba(15,52,96,.10)}
          .esp-audit-stat-num{font-size:36px;font-weight:900;color:#0F3460;line-height:1;margin-bottom:4px}
          .esp-audit-stat-txt{font-size:12px;color:#4A6080;font-weight:500;line-height:1.4}
          .esp-audit-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(237,233,254,.25) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .esp-audit-form-box h3{font-size:24px;font-weight:700;margin:0 0 24px;color:#0F1F40;letter-spacing:-.5px}
          .esp-af-form{display:flex;flex-direction:column;gap:16px}
          .esp-af-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
          .esp-fg{display:flex;flex-direction:column;gap:6px}
          .esp-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .esp-fg input,.esp-fg textarea,.esp-fg select{padding:10px 14px;border:1px solid rgba(15,52,96,.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);box-shadow:inset 0 1px 4px rgba(15,52,96,.06);transition:border-color .2s,background .2s;box-sizing:border-box;width:100%}
          .esp-fg input:focus,.esp-fg textarea:focus,.esp-fg select:focus{outline:none;border-color:#D97706;background:rgba(255,255,255,.90);box-shadow:0 0 0 3px rgba(217,119,6,.12)}
          .esp-fg textarea{resize:vertical}
          .esp-af-phone-wrap{display:flex;border:1px solid rgba(15,52,96,.15);border-radius:6px;overflow:hidden;background:rgba(255,255,255,.55)}
          .esp-af-phone-wrap select{padding:10px;border:none;background:transparent;font-size:12px;width:auto!important;min-width:70px;max-width:90px;color:#0F1F40;font-family:inherit;flex-shrink:0}
          .esp-af-phone-wrap input{flex:1!important;width:auto!important;min-width:0!important;border:none!important;border-radius:0!important;padding:10px 14px!important;box-shadow:none!important;background:rgba(255,255,255,.55)!important;color:#0F1F40!important}
          .esp-af-phone-wrap input:focus{outline:none!important;box-shadow:none!important;background:rgba(255,255,255,.90)!important;border-color:transparent!important}
          .esp-af-consent{display:flex;gap:8px;align-items:flex-start}
          .esp-af-consent input[type="checkbox"]{margin-top:3px;width:16px;height:16px;cursor:pointer;flex-shrink:0}
          .esp-af-consent label{font-size:11px;color:#4A6080;line-height:1.5;margin:0}
          .esp-af-consent a{color:#0F3460;text-decoration:none}
          .esp-audit-submit{padding:14px 28px;background:rgba(15,52,96,.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.30);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .3s;width:100%;box-shadow:0 6px 24px rgba(15,52,96,.25),inset 0 1px 0 rgba(255,255,255,.15)}
          .esp-audit-submit:hover:not(:disabled){background:rgba(15,52,96,.95);border-color:rgba(245,158,11,.6);transform:translateY(-2px)}
          .esp-audit-submit:disabled{opacity:.65;cursor:not-allowed}
          .esp-audit-success-wrap{text-align:center;padding:32px 0}
          .esp-audit-success-icon{width:64px;height:64px;background:linear-gradient(135deg,#1E3A8A,#1D4ED8);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 8px 24px rgba(29,78,216,.25)}
          .esp-audit-success-icon svg{width:30px;height:30px;stroke:#fff;fill:none}
          .esp-audit-success-wrap h3{font-size:20px;font-weight:700;color:#0F1F40;margin:0 0 10px}
          .esp-audit-success-wrap p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}
          .esp-val-err{background:rgba(220,38,38,.06);border:1px solid rgba(220,38,38,.20);border-radius:8px;padding:10px 14px;font-size:13px;color:#dc2626;margin-bottom:4px}

          /* FAQ */
          .esp-faq-list{display:flex;flex-direction:column;gap:12px}
          .esp-fitem{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:border-color .2s,box-shadow .2s}
          .esp-fitem.open{border-color:rgba(29,78,216,.40);box-shadow:0 8px 32px rgba(15,52,96,.12),inset 0 1px 0 rgba(255,255,255,1)}
          .esp-fitem.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#1D4ED8;border-radius:3px 0 0 3px}
          .esp-fq{width:100%;background:none;border:none;padding:20px 22px 20px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative}
          .esp-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,.08);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background .2s,color .2s}
          .esp-fitem.open .esp-fq-badge{background:#1D4ED8;color:#fff}
          .esp-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45}
          .esp-fitem.open .esp-fq-text{color:#1D4ED8}
          .esp-fq-chevron{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .esp-fitem.open .esp-fq-chevron{transform:rotate(180deg);color:#1D4ED8}
          .esp-fa{font-size:14px;color:#4b5563;line-height:1.8;padding:0 22px 20px 60px}

          /* Related */
          .esp-related-sec{background:rgba(237,233,254,.18);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60);padding:80px 40px}
          .esp-related-in{max-width:1280px;margin:0 auto;text-align:center}
          .esp-related-ey{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block}
          .esp-related-ttl{font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#111827;margin:0 0 16px}
          .esp-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px}
          .esp-related-divider{border:none;border-top:1px solid rgba(15,52,96,.12);margin:40px 0}
          .esp-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}
          .esp-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .25s}
          .esp-rtag:hover{filter:brightness(.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.10)}
          .esp-rtag-blue{background:rgba(59,130,246,.10);border-color:rgba(59,130,246,.30);color:#1D4ED8}
          .esp-rtag-violet{background:rgba(139,92,246,.10);border-color:rgba(139,92,246,.30);color:#6D28D9}
          .esp-rtag-amber{background:rgba(245,158,11,.12);border-color:rgba(245,158,11,.35);color:#B45309}
          .esp-rtag-teal{background:rgba(20,184,166,.10);border-color:rgba(20,184,166,.30);color:#0F766E}
          .esp-rtag-rose{background:rgba(244,63,94,.10);border-color:rgba(244,63,94,.30);color:#BE123C}
          .esp-rtag-green{background:rgba(34,197,94,.10);border-color:rgba(34,197,94,.30);color:#15803D}
          .esp-rtag-indigo{background:rgba(99,102,241,.10);border-color:rgba(99,102,241,.30);color:#4338CA}
          .esp-rtag-orange{background:rgba(249,115,22,.10);border-color:rgba(249,115,22,.30);color:#C2410C}
          .esp-rtag-cyan{background:rgba(6,182,212,.10);border-color:rgba(6,182,212,.30);color:#0E7490}
          .esp-rtag-slate{background:rgba(100,116,139,.10);border-color:rgba(100,116,139,.30);color:#334155}

          /* Responsive */
          @media(max-width:1024px){
            .esp-cards{grid-template-columns:1fr;max-width:480px;margin:0 auto}
            .esp-card-pop{transform:none}.esp-card-pop:hover{transform:translateY(-4px)}
            .esp-3grid{grid-template-columns:repeat(2,1fr)}
            .esp-2grid{grid-template-columns:1fr}
            .esp-results-grid{grid-template-columns:repeat(2,1fr)}
            .esp-audit-in{grid-template-columns:1fr}
          }
          @media(max-width:768px){
            .esp-hero{padding:60px 24px 0}
            .esp-sec{padding:60px 24px}
            .esp-pricing-sec{padding:60px 24px}
            .esp-dark-sec{padding:60px 24px}
            .esp-audit-sec{padding:56px 24px}
            .esp-related-sec{padding:60px 24px}
            .esp-testi-hd{padding:0 24px}
            .esp-stats-bar{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}
            .esp-stat:nth-child(2){border-right:none}
            .esp-btns{flex-direction:column;align-items:center}
            .esp-trust{gap:16px}
            .esp-3grid{grid-template-columns:1fr}
            .esp-results-grid{grid-template-columns:1fr}
            .esp-af-row{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <div className="esp-page">

        {/* 1. Hero */}
        <section className="esp-hero">
          <div className="esp-hero-orb1"/><div className="esp-hero-orb2"/>
          <div className="esp-hero-in">
            <nav className="esp-bc">
              <Link href="/">Home</Link>
              <span className="esp-bc-sep">/</span>
              <Link href="/seo-services-company">SEO Services</Link>
              <span className="esp-bc-sep">/</span>
              <span style={{color:'#1D4ED8'}}>Ecommerce SEO Packages</span>
            </nav>
            <div className="esp-ey-pill">
              <span style={{width:6,height:6,borderRadius:'50%',background:'#1D4ED8',display:'inline-block'}}/>
              Shopify · WooCommerce · Magento · BigCommerce
            </div>
            <h1 className="esp-h1">
              Ecommerce SEO Packages That <AuroraText>Grow Organic Revenue</AuroraText> From Your Online Store
            </h1>
            <p className="esp-hero-sub">Complete ecommerce SEO for Shopify, WooCommerce, and Magento stores — product page optimisation, technical SEO, schema markup, content, and link building in one transparent monthly plan.</p>
            <div className="esp-btns">
              <a href="#free-audit" className="esp-btn-p">
                Get a Free Store SEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#pricing" className="esp-btn-s">See Pricing</a>
            </div>
            <div className="esp-stats-bar">
              {STATS.map(function(s) { return (
                <div key={s.label} className="esp-stat">
                  <div className="esp-stat-l">{s.label}</div>
                  <div className="esp-stat-v">{s.val}</div>
                </div>
              ); })}
            </div>
          </div>
        </section>

        {/* 2. Pricing */}
        <section className="esp-pricing-sec" id="pricing">
          <div className="esp-pricing-in">
            <div className="esp-reveal" style={{textAlign:'center',marginBottom:8}}>
              <span className="esp-sec-ey">Pricing Plans</span>
              <h2 className="esp-sec-ttl" style={{maxWidth:700,margin:'0 auto 12px'}}>Choose Your <AuroraText>Ecommerce SEO Package</AuroraText></h2>
              <p className="esp-sec-sub" style={{margin:'0 auto 44px',textAlign:'center'}}>All packages include a dedicated account manager, monthly reporting, and a 30-day onboarding plan. No setup fee. Cancel anytime on monthly.</p>
            </div>
            <div className="esp-tog-row">
              <span className={'esp-tog-lbl' + (!isYearly ? ' active' : '')}>Monthly</span>
              <button className={'esp-tog-btn' + (isYearly ? ' on' : '')} onClick={function(){setIsYearly(!isYearly)}} aria-label="Toggle billing period">
                <span className="esp-tog-knob"/>
              </button>
              <span className={'esp-tog-lbl' + (isYearly ? ' active' : '')}>Yearly <span className="esp-save-badge">Save 17%</span></span>
            </div>
            <div className="esp-cards">
              {PLANS.map(function(plan) { return (
                <div key={plan.slug} className={'esp-card' + (plan.popular ? ' esp-card-pop' : '')}>
                  {plan.popular && <span className="esp-pop-tag">Most Popular</span>}
                  <div className="esp-plan-name">{plan.name}</div>
                  <p className="esp-plan-desc">{plan.desc}</p>
                  <div className="esp-price-row">
                    <span className="esp-currency">$</span>
                    <span className="esp-amount">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                    <span className="esp-per">/mo</span>
                  </div>
                  <div className="esp-billed">{isYearly ? 'Billed annually' : 'Billed monthly'}</div>
                  <div className="esp-save-line">{isYearly ? 'Save $' + plan.yearlySave.toLocaleString() + ' per year' : ' '}</div>
                  <Link href="/contact-us" className="esp-cta-card">Get Started →</Link>
                  <div className="esp-divider"/>
                  <ul className="esp-feat-list">
                    {plan.features.map(function(f) { return <li key={f}>{CHECK}<span>{f}</span></li>; })}
                  </ul>
                </div>
              ); })}
            </div>
            <div className="esp-trust">
              {['No setup fee','Cancel with 30 days notice','Dedicated account manager on all plans','Custom Enterprise plans available'].map(function(t) { return (
                <span key={t} className="esp-trust-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </span>
              ); })}
            </div>
          </div>
        </section>

        {/* 3. What is Ecommerce SEO */}
        <section className="esp-sec esp-light-sec">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-sec-ey">Understanding Ecommerce SEO</span>
              <h2 className="esp-sec-ttl">What Are <AuroraText>Ecommerce SEO Packages</AuroraText>?</h2>
              <p className="esp-sec-sub">Ecommerce SEO is the discipline of ranking your product and category pages for buying-intent search queries. Unlike generic SEO, it must solve challenges unique to online stores: crawl budget allocation across thousands of SKUs, duplicate content from product variants and faceted navigation, structured data for rich Shopping results, Google Merchant Centre feed optimisation, and category page architecture to capture long-tail demand at scale.</p>
            </div>
            <div className="esp-3grid" style={{marginTop:40}}>
              {[
                { title:'Product & Category Pages', body:'Every product page is a potential landing page for a buying-intent query. We optimise titles, descriptions, schema, images, and internal linking across your full catalogue.' },
                { title:'Technical SEO at Scale', body:'Crawl budget management, Core Web Vitals, duplicate content from variants and filters, XML sitemaps, and faceted navigation configuration — at any catalogue size.' },
                { title:'Shopping & Schema', body:'Product, Review, Offer, and Breadcrumb schema enables rich Google results — star ratings, price, availability — improving CTR before the visitor even clicks.' },
              ].map(function(c) { return (
                <div key={c.title} className="esp-glass esp-reveal">
                  <div className="esp-card-ttl">{c.title}</div>
                  <div className="esp-card-body">{c.body}</div>
                </div>
              ); })}
            </div>
          </div>
        </section>

        {/* 4. Why Ecommerce SEO */}
        <section className="esp-sec esp-white-sec">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-sec-ey">Why It Works</span>
              <h2 className="esp-sec-ttl">Why <AuroraText>Ecommerce SEO</AuroraText> Delivers Better ROI Than Paid Ads</h2>
              <p className="esp-sec-sub">Paid ads stop the moment you stop paying. SEO builds a compounding asset that generates organic revenue month after month.</p>
            </div>
            <div className="esp-3grid">
              {WHY_REASONS.map(function(r) { return (
                <div key={r.n} className="esp-glass esp-reveal">
                  <div className="esp-eyenum">{r.n}</div>
                  <div className="esp-card-ttl">{r.title}</div>
                  <div className="esp-card-body">{r.body}</div>
                </div>
              ); })}
            </div>
          </div>
        </section>

        {/* 5. AI Overviews — Dark */}
        <section className="esp-dark-sec">
          <div className="esp-dark-in">
            <div className="esp-reveal" style={{textAlign:'center',marginBottom:48}}>
              <span className="esp-dark-ey">Future-Proof SEO</span>
              <h2 className="esp-dark-ttl">Ecommerce SEO for <AuroraText>Google AI Overviews</AuroraText> &amp; AI Shopping</h2>
              <p className="esp-dark-sub" style={{margin:'0 auto'}}>{"Google's AI is reshaping how shoppers discover products. We optimise your store to appear in AI-generated shopping answers — not just traditional search results."}</p>
            </div>
            <div className="esp-2grid esp-reveal">
              {AI_CARDS.map(function(c) { return (
                <div key={c.title} className="esp-dark-card">
                  <div className="esp-dark-card-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:22,height:22}}>
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                  </div>
                  <div className="esp-dark-card-ttl">{c.title}</div>
                  <div className="esp-dark-card-body">{c.body}</div>
                </div>
              ); })}
            </div>
          </div>
        </section>

        {/* 6. What Every Package Includes */}
        <section className="esp-sec esp-light-sec">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-sec-ey">Core Deliverables</span>
              <h2 className="esp-sec-ttl">{"What's Included in Every"} <AuroraText>Ecommerce SEO Plan</AuroraText></h2>
              <p className="esp-sec-sub">Every package tier — from Starter to Pro — includes these core deliverables. The scale, depth, and frequency increases with each plan.</p>
            </div>
            <div className="esp-3grid">
              {INCLUDED.map(function(c) { return (
                <div key={c.title} className="esp-glass esp-reveal">
                  <div className="esp-card-ttl">{c.title}</div>
                  <div className="esp-card-body">{c.body}</div>
                </div>
              ); })}
            </div>
          </div>
        </section>

        {/* 7. Comparison Table */}
        <section className="esp-sec esp-white-sec">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-sec-ey">Feature Breakdown</span>
              <h2 className="esp-sec-ttl"><AuroraText>Package Comparison</AuroraText> at a Glance</h2>
              <p className="esp-sec-sub">A side-by-side breakdown of what each ecommerce SEO plan includes — so you can choose with confidence.</p>
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
                  ].map(function(row, i) { return (
                    <tr key={i}>
                      <td>{row[0]}</td>
                      <td className={row[1]==='—'?'esp-dash-cell':''}>{row[1]}</td>
                      <td className={'esp-td-pop' + (row[2]==='—'?' esp-dash-cell':'')}>{row[2]}</td>
                      <td className={row[3]==='—'?'esp-dash-cell':''}>{row[3]}</td>
                    </tr>
                  ); })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 8. Process */}
        <section className="esp-sec esp-light-sec">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-sec-ey">How It Works</span>
              <h2 className="esp-sec-ttl">Our <AuroraText>Ecommerce SEO Process</AuroraText> — Step by Step</h2>
              <p className="esp-sec-sub">A systematic, repeatable process that coordinates technical fixes, on-page optimisation, content, and link building into one coherent strategy.</p>
            </div>
            <div className="esp-3grid">
              {PROCESS_STEPS.map(function(s) { return (
                <div key={s.n} className="esp-glass esp-reveal">
                  <div className="esp-num-badge">{s.n}</div>
                  <div className="esp-card-ttl">{s.title}</div>
                  <div className="esp-card-body">{s.body}</div>
                </div>
              ); })}
            </div>
          </div>
        </section>

        {/* 9. What Makes Us Different */}
        <section className="esp-sec esp-white-sec">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-sec-ey">The 1Solutions Difference</span>
              <h2 className="esp-sec-ttl">What Makes Our <AuroraText>Ecommerce SEO</AuroraText> Different</h2>
              <p className="esp-sec-sub">Not all ecommerce SEO agencies are equal. Here is what separates our approach from generic digital marketing.</p>
            </div>
            <div className="esp-3grid">
              {DIFFERENT.map(function(c) { return (
                <div key={c.title} className="esp-glass esp-reveal">
                  <div className="esp-card-ttl">{c.title}</div>
                  <div className="esp-card-body">{c.body}</div>
                </div>
              ); })}
            </div>
          </div>
        </section>

        {/* 10. Platforms */}
        <section className="esp-sec esp-light-sec">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-sec-ey">Platform Support</span>
              <h2 className="esp-sec-ttl">Ecommerce SEO for <AuroraText>Every Major Platform</AuroraText></h2>
              <p className="esp-sec-sub">Each ecommerce platform has unique technical SEO characteristics. We apply platform-specific knowledge — not one-size-fits-all tactics.</p>
            </div>
            <div className="esp-3grid">
              {PLATFORMS.map(function(p) { return (
                <div key={p.name} className="esp-platform-card esp-reveal">
                  <div className="esp-platform-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:24,height:24}}>
                      <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/>
                    </svg>
                  </div>
                  <div className="esp-platform-name">{p.name}</div>
                  <div className="esp-platform-note">{p.note}</div>
                </div>
              ); })}
            </div>
          </div>
        </section>

        {/* 11. Results — Dark */}
        <section className="esp-dark-sec">
          <div className="esp-dark-in">
            <div className="esp-reveal" style={{textAlign:'center',marginBottom:48}}>
              <span className="esp-dark-ey">Proven Results</span>
              <h2 className="esp-dark-ttl"><AuroraText>Ecommerce SEO Results</AuroraText>: Real Organic Revenue Growth</h2>
              <p className="esp-dark-sub" style={{margin:'0 auto'}}>Real metrics from real ecommerce stores — across platforms, regions, and verticals.</p>
            </div>
            <div className="esp-results-grid esp-reveal">
              {RESULTS.map(function(r) { return (
                <div key={r.metric} className="esp-result-card">
                  <div className="esp-result-metric">{r.metric}</div>
                  <div className="esp-result-label">{r.label}</div>
                  <div className="esp-result-detail">{r.detail}</div>
                </div>
              ); })}
            </div>
            <div className="esp-results-cta esp-reveal">
              <a href="#free-audit">
                Get Similar Results
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* 12. Why Choose Us */}
        <section className="esp-sec esp-white-sec">
          <div className="esp-sec-in">
            <div className="esp-reveal">
              <span className="esp-sec-ey">Why Choose Us</span>
              <h2 className="esp-sec-ttl">Why Choose Our <AuroraText>Ecommerce SEO</AuroraText> Service</h2>
              <p className="esp-sec-sub">180+ ecommerce stores trust 1Solutions with their organic revenue. Here is why they chose us and why they stay.</p>
            </div>
            <div className="esp-3grid">
              {WHY_CHOOSE.map(function(c) { return (
                <div key={c.title} className="esp-glass esp-reveal">
                  <div className="esp-card-ttl">{c.title}</div>
                  <div className="esp-card-body">{c.body}</div>
                </div>
              ); })}
            </div>
          </div>
        </section>

        {/* 13. Testimonials */}
        <section className="esp-testi-sec">
          <div className="esp-testi-hd esp-reveal">
            <span className="esp-sec-ey">Client Results</span>
            <h2 className="esp-sec-ttl">What Our <AuroraText>Ecommerce SEO Clients</AuroraText> Say</h2>
          </div>
          {[TESTIMONIALS_ROW1, TESTIMONIALS_ROW2].map(function(row, ri) { return (
            <div key={ri} className="esp-trow">
              <div className="esp-tfade-l"/><div className="esp-tfade-r"/>
              <div className={ri===0?'esp-ttrack':'esp-ttrack-rev'}>
                {[].concat(row,row).map(function(t,i) { return (
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
                ); })}
              </div>
            </div>
          ); })}
        </section>

        {/* 14. Free Audit Form */}
        <section className="esp-audit-sec" id="free-audit">
          <div className="esp-audit-in">
            <div className="esp-reveal">
              <h2 className="esp-audit-ttl">Get Your Free<br/><AuroraText>Ecommerce SEO Audit</AuroraText></h2>
              <p className="esp-audit-desc">Tell us about your store and we will review your current SEO health, identify your biggest growth blockers, and recommend the right package — completely free.</p>
              <div className="esp-audit-benefits-box">
                {[
                  'Confidential & no-obligation — your data stays with us',
                  'Reviewed by a senior ecommerce SEO strategist, not a junior',
                  'Audit delivered within 48 hours of your request',
                  'No hard sell — just honest expert advice on your store',
                ].map(function(b) { return (
                  <div key={b} className="esp-audit-ben">
                    <svg className="esp-audit-ben-icon" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="esp-audit-ben-text">{b}</span>
                  </div>
                ); })}
                <div className="esp-audit-stats">
                  {[['180+','Ecommerce Stores'],['15+','Years Experience'],['94%','Client Retention']].map(function(item) { return (
                    <div key={item[1]}>
                      <div className="esp-audit-stat-num">{item[0]}</div>
                      <div className="esp-audit-stat-txt">{item[1]}</div>
                    </div>
                  ); })}
                </div>
              </div>
            </div>
            <div className="esp-audit-form-box esp-reveal">
              <h3>Request Your Free Audit</h3>
              {auditSt==='success' ? (
                <div className="esp-audit-success-wrap">
                  <div className="esp-audit-success-icon">
                    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>Thank you. A senior ecommerce SEO strategist will review your store and be in touch within 48 hours.</p>
                </div>
              ) : (
                <form className="esp-af-form" onSubmit={_auditSubmit} noValidate>
                  {auditSt==='validation' && <p className="esp-val-err">Please complete all fields and accept the terms before submitting.</p>}
                  {auditSt==='error' && <p className="esp-val-err">Something went wrong. Please try again or email us directly.</p>}
                  <div className="esp-af-row">
                    <div className="esp-fg">
                      <label htmlFor="ea-name">Full Name *</label>
                      <input id="ea-name" name="ea-name" type="text" placeholder="Jane Smith" required/>
                    </div>
                    <div className="esp-fg">
                      <label htmlFor="ea-email">Email Address *</label>
                      <input id="ea-email" name="ea-email" type="email" placeholder="jane@mystore.com" required/>
                    </div>
                  </div>
                  <div className="esp-af-row">
                    <div className="esp-fg">
                      <label>Phone Number *</label>
                      <div className="esp-af-phone-wrap">
                        <select name="ea-cc" aria-label="Country code">
                          <option value="+1">+1</option><option value="+44">+44</option><option value="+61">+61</option>
                          <option value="+91">+91</option><option value="+971">+971</option><option value="+65">+65</option>
                          <option value="+49">+49</option><option value="+33">+33</option><option value="+64">+64</option>
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
                  <div className="esp-af-consent">
                    <input type="checkbox" id="esp-consent"/>
                    <label htmlFor="esp-consent">
                      I agree to the <Link href="/privacy-policy">Privacy Policy</Link> and consent to 1Solutions storing my data to respond to this enquiry. *
                    </label>
                  </div>
                  <button type="submit" className="esp-audit-submit" disabled={auditSt==='loading'}>
                    {auditSt==='loading' ? 'Sending...' : 'Send My Free Audit Request →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* 15. FAQ */}
        <section className="esp-sec esp-white-sec">
          <div className="esp-sec-in" style={{maxWidth:900}}>
            <div className="esp-reveal">
              <span className="esp-sec-ey">Common Questions</span>
              <h2 className="esp-sec-ttl"><AuroraText>Ecommerce SEO Package</AuroraText> FAQs</h2>
              <p className="esp-sec-sub">Everything you need to know before choosing an ecommerce SEO package.</p>
            </div>
            <div className="esp-faq-list">
              {FAQS.map(function(f, i) { return (
                <div key={i} className={'esp-fitem' + (openFaq===i?' open':'')}>
                  <button className="esp-fq" onClick={function(){setOpenFaq(openFaq===i?-1:i)}}>
                    <span className="esp-fq-badge">{String(i+1).padStart(2,'0')}</span>
                    <span className="esp-fq-text">{f.q}</span>
                    <svg className="esp-fq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFaq===i && <div className="esp-fa">{f.a}</div>}
                </div>
              ); })}
            </div>
          </div>
        </section>

        {/* 16. Related Services */}
        <section className="esp-related-sec">
          <div className="esp-related-in esp-reveal">
            <span className="esp-related-ey">Explore More</span>
            <h2 className="esp-related-ttl">Explore <AuroraText>Related Services</AuroraText> and Technologies</h2>
            <p className="esp-related-sub">Ecommerce SEO works best when combined with complementary services. Explore the full 1Solutions digital marketing ecosystem.</p>
            <hr className="esp-related-divider"/>
            <div className="esp-related-tags">
              {RELATED_TAGS.map(function(t) { return (
                <Link key={t.href} href={t.href} className={'esp-rtag ' + t.cls}>{t.label}</Link>
              ); })}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
