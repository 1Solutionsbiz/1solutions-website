import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Ecommerce SEO', desc: 'Category page SEO, product page optimisation, schema markup for products and reviews, site architecture improvements, faceted navigation management, and long-tail keyword targeting for high-intent shoppers.' },
  { n: '02', title: 'Google Shopping & Performance Max', desc: 'Product feed optimisation, Google Shopping campaign management, Performance Max setup and optimisation, smart bidding strategies, and feed health monitoring across Google Merchant Centre.' },
  { n: '03', title: 'Paid Social for Ecommerce', desc: 'Facebook and Instagram Shopping campaigns, dynamic product ads (DPA), catalogue-based retargeting, and TikTok Shopping ads — targeting shoppers at every stage of the buying journey.' },
  { n: '04', title: 'Email & SMS Marketing', desc: 'Abandoned cart recovery, post-purchase sequences, win-back campaigns, browse abandonment flows, and promotional campaigns — automated revenue streams that run 24/7 without manual intervention.' },
  { n: '05', title: 'Conversion Rate Optimisation', desc: 'Product page CRO, checkout optimisation, A/B testing for CTAs and layouts, trust signal placement, and mobile checkout improvements — increasing revenue from your existing traffic.' },
  { n: '06', title: 'Marketplace Management', desc: 'Amazon, eBay, and Etsy listing optimisation — keyword-rich titles, enhanced content, competitive pricing strategy, review management, and advertising on marketplace platforms.' },
  { n: '07', title: 'Ecommerce Content Marketing', desc: 'Buying guides, product comparison content, how-to articles, and category-level content strategy — attracting high-intent organic traffic from shoppers in research mode before they buy.' },
  { n: '08', title: 'Analytics & Revenue Reporting', desc: 'GA4 ecommerce tracking setup, revenue attribution modelling, customer lifetime value analysis, channel ROI reporting, and monthly strategy reviews tied to actual sales performance.' },
];

const PLATFORMS = ['Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'OpenCart', 'PrestaShop', 'Google Shopping', 'Meta Shops', 'Amazon', 'eBay', 'TikTok Shop', 'Klaviyo', 'Mailchimp', 'GA4'];

const PROCESS = [
  { step: '01', title: 'Ecommerce Audit', desc: 'Technical SEO health, product feed quality, current channel performance, conversion funnel analysis, and competitor benchmarking — identifying the highest-ROI opportunities first.' },
  { step: '02', title: 'Revenue Growth Strategy', desc: 'Channel strategy, budget allocation, SEO roadmap, and campaign plan — all tied to revenue targets and agreed before any work begins.' },
  { step: '03', title: 'Technical & Feed Setup', desc: 'Google Merchant Centre feed optimisation, tracking verification, automation flows, and any technical ecommerce fixes identified in the audit.' },
  { step: '04', title: 'Campaign Activation', desc: 'Paid campaigns launched, SEO work begins, email flows activated — all channels coordinated for consistent customer experience across the buying journey.' },
  { step: '05', title: 'Optimisation & Scaling', desc: 'Continuous optimisation based on real revenue data — pausing underperforming campaigns, scaling winners, testing new audiences and creative, and expanding SEO content coverage.' },
  { step: '06', title: 'Monthly Revenue Review', desc: 'Full revenue report — channel attribution, ROAS, organic traffic, conversion rates, and customer metrics — with next month\'s priorities and budget recommendations.' },
];

const WHY = [
  { title: 'Revenue-Focused Reporting', desc: 'We do not report on vanity metrics — we report on revenue. Every strategy decision, budget allocation, and optimisation is evaluated against its actual contribution to sales and profitability.' },
  { title: 'Multi-Channel Coordination', desc: 'Ecommerce growth requires SEO, paid, email, and social working in coordination — not as separate silos. We manage all channels with a unified customer journey in mind.' },
  { title: 'Product Feed Expertise', desc: 'Google Shopping performance depends entirely on the quality of your product feed. We optimise feed titles, descriptions, images, and custom labels to maximise product visibility and click-through rates.' },
  { title: 'Ecommerce Platform Experience', desc: 'Shopify, Magento, WooCommerce, BigCommerce, OpenCart — we have platform-specific expertise across the major ecommerce systems, including technical SEO quirks specific to each platform.' },
  { title: 'Automated Revenue Streams', desc: 'Abandoned cart emails, browse abandonment, post-purchase upsells, and win-back flows are set up once and generate revenue continuously — we build these automations as a revenue foundation for every ecommerce client.' },
  { title: 'Scalable as You Grow', desc: 'Whether you are a £50K/year boutique or a £5M/year multi-brand operator, our ecommerce service scales to your stage — focused on the channels and tactics that deliver the best return at your current size.' },
];

const FAQS = [
  { q: 'What does ecommerce marketing include?', a: 'Ecommerce marketing encompasses all digital channels and tactics used to drive traffic to your online store and convert that traffic into sales: Ecommerce SEO (product and category page optimisation, technical SEO, content marketing for organic traffic); Google Shopping (product feed management, Shopping campaigns, Performance Max); Paid social (Facebook, Instagram, TikTok Shopping ads, retargeting, dynamic product ads); Email and SMS marketing (automated flows and campaign management); Conversion rate optimisation (product pages, checkout, mobile experience); Marketplace management (Amazon, eBay, Etsy); and Analytics and attribution (GA4 ecommerce tracking, revenue reporting). Our full-service ecommerce marketing packages manage all these channels in coordination.' },
  { q: 'How much does ecommerce marketing cost?', a: 'Ecommerce marketing costs depend on the scope of services, number of channels managed, ad spend budget, and store size. A focused two-channel service (ecommerce SEO plus Google Shopping management) for a small to mid-size store typically starts from £1,500 to £2,500 per month management fee. A full-service package (SEO, Google Shopping, paid social, email automation, CRO) for a growing ecommerce brand typically ranges from £3,500 to £8,000 per month depending on complexity. Ad spend is a separate budget managed on your behalf. We provide a custom quote based on your store, current performance, and growth targets.' },
  { q: 'How long before ecommerce marketing shows results?', a: 'Timeline depends heavily on the channels and starting point. Google Shopping and paid social: results are typically visible within the first 2 to 4 weeks as ad data accumulates and campaigns are optimised. Ecommerce SEO: category and product page optimisation typically shows ranking improvements within 4 to 12 weeks; content-led organic traffic growth compounds over 3 to 9 months. Email automation: abandoned cart and post-purchase flows generate incremental revenue from the week they are activated. Combining paid and organic channels typically delivers the fastest path to revenue growth — paid channels provide immediate traffic while SEO builds long-term organic volume.' },
  { q: 'Can you manage Google Shopping campaigns?', a: 'Yes. Google Shopping is one of our core ecommerce marketing capabilities. We manage: Google Merchant Centre setup and feed health monitoring; product feed optimisation (titles, descriptions, images, GTINs, custom labels); Standard Shopping campaign setup and management; Performance Max campaign setup, asset group creation, and audience signal configuration; smart bidding strategy selection and optimisation (Target ROAS, Maximise Conversions); negative keyword management; and monthly performance reporting with ROAS attribution. For large product catalogues, we also implement supplemental feed strategies and feed rules to ensure maximum product coverage and quality scores.' },
  { q: 'Which ecommerce platforms do you work with?', a: 'We work with all major ecommerce platforms: Shopify (including Shopify Plus); WooCommerce; Magento 2 (Adobe Commerce); BigCommerce; OpenCart; PrestaShop; Wix eCommerce; Squarespace Commerce; and custom-built ecommerce platforms. Each platform has different technical SEO considerations, Google Shopping feed export capabilities, and tracking implementation requirements. Our team has platform-specific experience across all major systems — we do not treat every platform the same, because they are not.' },
  { q: 'Do you manage email marketing for ecommerce?', a: 'Yes. Email and SMS marketing is a core part of our ecommerce service. Automated revenue flows we set up: abandoned cart recovery (typically 3 to 15% recovery rate depending on audience and product type); browse abandonment reminders; welcome and nurture sequences for new subscribers; post-purchase upsell and cross-sell flows; review request sequences; and win-back campaigns for lapsed customers. Campaign management includes promotional emails, seasonal campaigns, and new product launches. We work with Klaviyo, Mailchimp, Omnisend, and most major email platforms. Email automation typically becomes one of the highest-ROAS channels for ecommerce businesses within 90 days of activation.' },
  { q: 'Can you help with Amazon as well as our own website?', a: 'Yes. Amazon marketplace management is available as a standalone service or alongside your own website ecommerce marketing. Amazon services include: product listing optimisation (keyword-rich titles, bullet points, A+ content); backend keyword strategy; Amazon Ads management (Sponsored Products, Sponsored Brands, Sponsored Display); review management strategy; BSR monitoring; and competitive positioning analysis. Many ecommerce brands benefit from coordinating Amazon and own-website strategies — using Amazon for demand capture and brand discovery while owning the direct customer relationship and higher-margin sales through their own store.' },
  { q: 'How do you measure ecommerce marketing ROI?', a: 'We measure ecommerce marketing ROI through GA4 ecommerce tracking — attributing revenue to channels and campaigns with purchase event tracking, transaction IDs, and revenue data. Key metrics we report on: total revenue by channel; ROAS (return on ad spend) by campaign and channel; organic revenue from SEO (segmented from paid); email-attributed revenue; conversion rate by device, traffic source, and landing page; average order value trends; customer acquisition cost (CAC); and customer lifetime value (LTV) where data allows. We set up proper attribution modelling so you understand which channels are genuinely driving sales — not just getting the last click.' },
];

const STATS = [
  { label: 'Ecommerce Stores Managed', val: '180+' },
  { label: 'Avg Revenue Growth', val: '+62%' },
  { label: 'Years Ecommerce Experience', val: '12+' },
  { label: 'Client Retention', val: '92%' },
];

export default function EcommerceMarketingServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/digital-marketing-services/' }, { '@type': 'ListItem', position: 3, name: 'Ecommerce Marketing', item: 'https://www.1solutions.biz/ecommerce-marketing-services/' }] }, { '@type': 'Service', name: 'Ecommerce Marketing Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Ecommerce Marketing', url: 'https://www.1solutions.biz/ecommerce-marketing-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Ecommerce Marketing Services | Google Shopping, SEO & Email for Online Stores | 1Solutions</title>
        <meta name="description" content="Ecommerce marketing services — SEO, Google Shopping, paid social, email automation, and CRO for online stores. Revenue-focused ecommerce marketing across Shopify, WooCommerce, and Magento." />
        <meta name="keywords" content="ecommerce marketing services, ecommerce seo, google shopping management, ecommerce marketing agency, shopify marketing, woocommerce marketing, online store marketing" />
        <link rel="canonical" href="https://www.1solutions.biz/ecommerce-marketing-services/" />
        <meta property="og:title" content="Ecommerce Marketing Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/ecommerce-marketing-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .ecmkt-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .ecmkt-page *,.ecmkt-page *::before,.ecmkt-page *::after{box-sizing:border-box}
          .ecmkt-hero{background:linear-gradient(135deg,#f0fdfa 0%,#ccfbf1 25%,#99f6e4 60%,#f0fdfa 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .ecmkt-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(13,148,136,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .ecmkt-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(15,118,110,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .ecmkt-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .ecmkt-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .ecmkt-bc a{color:#6b7280;text-decoration:none}.ecmkt-bc a:hover{color:#0D9488}.ecmkt-bc span{color:#d1d5db}
          .ecmkt-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(13,148,136,0.08);border:1px solid rgba(13,148,136,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0D9488;margin-bottom:28px}
          .ecmkt-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#134E4A 0%,#0D9488 50%,#0F766E 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .ecmkt-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .ecmkt-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .ecmkt-btn-p{display:inline-flex;align-items:center;gap:8px;background:#0D9488;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(13,148,136,0.28)}
          .ecmkt-btn-p:hover{background:#0F766E;box-shadow:0 8px 32px rgba(13,148,136,0.38);transform:translateY(-2px)}
          .ecmkt-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .ecmkt-btn-s:hover{border-color:#0D9488;color:#0D9488;transform:translateY(-2px)}
          .ecmkt-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(13,148,136,0.07)}
          .ecmkt-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(13,148,136,0.08)}.ecmkt-stat:last-child{border-right:none}
          .ecmkt-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .ecmkt-stat-v{font-size:1.6rem;font-weight:900;color:#0D9488;letter-spacing:-0.5px}
          .ecmkt-svc{background:#f8fafd;padding:80px 40px}.ecmkt-svc-in{max-width:1280px;margin:0 auto}
          .ecmkt-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0D9488;margin-bottom:10px;display:block}
          .ecmkt-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#134E4A 0%,#0D9488 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .ecmkt-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .ecmkt-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .ecmkt-card{background:linear-gradient(135deg,rgba(240,253,250,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(204,251,241,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(13,148,136,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .ecmkt-card.visible{opacity:1;transform:translateY(0)}.ecmkt-card:hover{transform:translateY(-6px);border-color:rgba(13,148,136,0.22);box-shadow:0 16px 48px rgba(13,148,136,0.09)}
          .ecmkt-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0D9488;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .ecmkt-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .ecmkt-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .ecmkt-plat{background:linear-gradient(135deg,#134E4A 0%,#0D9488 100%);padding:60px 40px}
          .ecmkt-plat-in{max-width:1280px;margin:0 auto;text-align:center}
          .ecmkt-plat h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .ecmkt-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .ecmkt-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .ecmkt-proc{background:linear-gradient(135deg,#f0fdfa 0%,#f0fdfa 50%,#ccfbf1 100%);padding:80px 40px}
          .ecmkt-proc-in{max-width:900px;margin:0 auto}
          .ecmkt-steps{display:flex;flex-direction:column;margin-top:44px}
          .ecmkt-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(13,148,136,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .ecmkt-step:last-child{border-bottom:none}.ecmkt-step.visible{opacity:1;transform:translateX(0)}
          .ecmkt-snum{font-size:3rem;font-weight:900;color:rgba(13,148,136,0.15);line-height:1;letter-spacing:-2px}
          .ecmkt-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .ecmkt-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .ecmkt-why{background:#fff;padding:80px 40px}.ecmkt-why-in{max-width:1280px;margin:0 auto}
          .ecmkt-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .ecmkt-wcard{background:linear-gradient(135deg,#f0fdfa 0%,#fff 60%,#ccfbf1 100%);border:1px solid rgba(13,148,136,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .ecmkt-wcard.visible{opacity:1;transform:translateY(0)}.ecmkt-wcard:hover{border-color:rgba(13,148,136,0.20);box-shadow:0 8px 32px rgba(13,148,136,0.07)}
          .ecmkt-dot{width:8px;height:8px;border-radius:50%;background:#0D9488;margin-bottom:16px}
          .ecmkt-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .ecmkt-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .ecmkt-faq{background:#f8fafd;padding:80px 40px}.ecmkt-faq-in{max-width:860px;margin:0 auto}
          .ecmkt-fitem{border-bottom:1px solid #e5e7eb}
          .ecmkt-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .ecmkt-fq:hover{color:#0D9488}
          .ecmkt-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .ecmkt-fitem.open .ecmkt-ficon{border-color:#0D9488;color:#0D9488;background:rgba(13,148,136,0.06)}
          .ecmkt-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .ecmkt-fitem.open .ecmkt-fa{max-height:500px;padding-bottom:22px}
          .ecmkt-cta{background:linear-gradient(135deg,rgba(13,148,136,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(19,78,74,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .ecmkt-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(13,148,136,0.10) 0%,transparent 70%);pointer-events:none}
          .ecmkt-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(19,78,74,0.08) 0%,transparent 70%);pointer-events:none}
          .ecmkt-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .ecmkt-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#134E4A 0%,#0D9488 50%,#0F766E 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .ecmkt-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .ecmkt-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.ecmkt-grid{grid-template-columns:repeat(2,1fr)}.ecmkt-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.ecmkt-hero,.ecmkt-svc,.ecmkt-plat,.ecmkt-proc,.ecmkt-why,.ecmkt-faq,.ecmkt-cta{padding:60px 24px}.ecmkt-hero{padding-top:60px;padding-bottom:0}.ecmkt-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.ecmkt-stat:nth-child(2){border-right:none}.ecmkt-grid{grid-template-columns:1fr}.ecmkt-why-grid{grid-template-columns:1fr}.ecmkt-step{grid-template-columns:56px 1fr}.ecmkt-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="ecmkt-page">
        <section className="ecmkt-hero"><div className="ecmkt-o1"/><div className="ecmkt-o2"/>
          <div className="ecmkt-in">
            <nav className="ecmkt-bc"><Link href="/">Home</Link><span>/</span><Link href="/digital-marketing-services">Digital Marketing</Link><span>/</span><span style={{color:'#0D9488'}}>Ecommerce Marketing</span></nav>
            <span className="ecmkt-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#0D9488',display:'inline-block'}}/> SEO · Shopping · Paid Social · Email</span>
            <h1 className="ecmkt-h1">Ecommerce Marketing Services — More Traffic, More Revenue, More Repeat Customers</h1>
            <p className="ecmkt-sub">Full-service ecommerce marketing — SEO, Google Shopping, paid social, email automation, and CRO — all coordinated by one team with a single focus: growing your online store revenue.</p>
            <div className="ecmkt-btns">
              <Link href="/contact-us" className="ecmkt-btn-p">Get an Ecommerce Marketing Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/conversion-rate-optimization-services" className="ecmkt-btn-s">CRO Services</Link>
            </div>
            <div className="ecmkt-stats">{STATS.map(s => <div key={s.label} className="ecmkt-stat"><div className="ecmkt-stat-l">{s.label}</div><div className="ecmkt-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="ecmkt-svc"><div className="ecmkt-svc-in">
          <span className="ecmkt-ey2">What We Do</span><h2 className="ecmkt-ttl">Ecommerce Marketing Services</h2>
          <p className="ecmkt-desc">From organic search to paid ads, email flows to marketplace management — every channel an ecommerce store needs to grow revenue.</p>
          <div className="ecmkt-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`ecmkt-card${visibleCards.includes(i)?' visible':''}`}><div className="ecmkt-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="ecmkt-plat"><div className="ecmkt-plat-in">
          <h2>Platforms &amp; Tools We Work With</h2>
          <div className="ecmkt-pills">{PLATFORMS.map(c => <span key={c} className="ecmkt-pill">{c}</span>)}</div>
        </div></section>
        <section className="ecmkt-proc"><div className="ecmkt-proc-in">
          <span className="ecmkt-ey2">How We Work</span><h2 className="ecmkt-ttl">Our Ecommerce Marketing Process</h2>
          <p className="ecmkt-desc">Audit to activation to optimisation — a systematic process tied to revenue targets, not channel activity metrics.</p>
          <div className="ecmkt-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`ecmkt-step${visibleSteps.includes(i)?' visible':''}`}><div className="ecmkt-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="ecmkt-why"><div className="ecmkt-why-in">
          <span className="ecmkt-ey2">Why 1Solutions</span><h2 className="ecmkt-ttl">Multi-Channel Ecommerce Growth, Measured in Revenue</h2>
          <p className="ecmkt-desc">We manage every growth channel in coordination — SEO, Shopping, paid social, email — with revenue attribution that shows exactly what each pound spent is returning.</p>
          <div className="ecmkt-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`ecmkt-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="ecmkt-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="ecmkt-faq"><div className="ecmkt-faq-in">
          <span className="ecmkt-ey2">Got Questions?</span><h2 className="ecmkt-ttl">Ecommerce Marketing FAQs</h2>
          <p className="ecmkt-desc">Everything you need to know about our ecommerce marketing services.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`ecmkt-fitem${openFaq===i?' open':''}`}><button className="ecmkt-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="ecmkt-ficon">{openFaq===i?'−':'+'}</span></button><div className="ecmkt-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="ecmkt-cta"><div className="ecmkt-cta-o1"/><div className="ecmkt-cta-o2"/>
          <div className="ecmkt-cta-in">
            <span className="ecmkt-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Scale Your Online Store Revenue?</span>
            <h2 className="ecmkt-cta-t">Start Your Ecommerce Marketing Partnership</h2>
            <p className="ecmkt-cta-s">We&rsquo;ll audit your current ecommerce performance, identify the highest-ROI growth opportunities, and build a multi-channel strategy around your revenue targets.</p>
            <div className="ecmkt-cta-btns">
              <Link href="/contact-us" className="ecmkt-btn-p">Get an Ecommerce Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-services-company" className="ecmkt-btn-s">SEO Services</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
