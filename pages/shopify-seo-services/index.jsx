import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Shopify Technical SEO Audit', desc: 'Full audit of your Shopify store — duplicate content from URL parameters, canonical tag issues, collection/product URL structure, Shopify theme speed, and app-generated bloat.' },
  { n: '02', title: 'Shopify Duplicate Content Fix', desc: 'Shopify creates duplicate URLs for products in multiple collections (/collections/x/products/y vs /products/y). We canonicalise correctly and eliminate indexation waste.' },
  { n: '03', title: 'Product & Collection Page SEO', desc: 'Optimised title tags, meta descriptions, heading structure, product descriptions, and internal linking for every product and collection page at scale.' },
  { n: '04', title: 'Shopify Schema Markup', desc: 'Product, BreadcrumbList, Organisation, and FAQ schema — implemented via Liquid theme files or JSON-LD injection for rich snippet eligibility in Google Shopping and search results.' },
  { n: '05', title: 'Shopify Core Web Vitals', desc: 'LCP, CLS, and INP optimisation for Shopify themes — image compression, lazy loading, unused app script removal, font optimisation, and CDN configuration.' },
  { n: '06', title: 'Shopify App Conflict Audit', desc: 'Third-party Shopify apps frequently inject duplicate scripts, slow page load, and conflict with each other. We audit app impact on site speed and SEO and recommend consolidation.' },
  { n: '07', title: 'Shopify Content & Blog SEO', desc: 'Shopify blog content strategy, internal linking from blog to product/collection pages, keyword research for top-of-funnel content, and meta optimisation for articles.' },
  { n: '08', title: 'Shopify Link Building', desc: 'Niche-relevant link acquisition — product reviews, industry guides, supplier partnerships, and digital PR campaigns to build domain authority for your Shopify store.' },
];

const PLATFORMS = ['Shopify', 'Shopify Plus', 'Shopify Markets', 'Shopify Sections API', 'Liquid Templates', 'Shopify Hydrogen', 'Shopify Analytics', 'Google Merchant Centre'];

const PROCESS = [
  { step: '01', title: 'Shopify SEO Audit', desc: 'Full crawl, GSC analysis, duplicate URL identification, Core Web Vitals scores, app inventory review, and competitor benchmarking.' },
  { step: '02', title: 'Technical Fixes', desc: 'Canonical tag corrections, duplicate URL resolution, sitemap optimisation, robots.txt update, and schema implementation via Liquid.' },
  { step: '03', title: 'On-Page Optimisation', desc: 'Product and collection page title tags, meta descriptions, heading structure, image alt text, and internal link architecture.' },
  { step: '04', title: 'Speed & App Audit', desc: 'Core Web Vitals fixes — image compression, script consolidation, unused app removal, and theme code optimisation.' },
  { step: '05', title: 'Content Strategy', desc: 'Blog content calendar, buying guide creation, keyword-targeted collection page copy, and FAQ content for featured snippet capture.' },
  { step: '06', title: 'Monitor & Report', desc: 'Monthly Shopify SEO report — organic revenue, keyword rankings, crawl health, and Core Web Vitals trends.' },
];

const WHY = [
  { title: 'Shopify Platform Specialists', desc: 'We know Shopify\'s SEO quirks — from the /collections/x/products/y duplication issue to Liquid rendering limitations — and have built solutions for all of them.' },
  { title: 'App-Aware Optimisation', desc: 'We audit your Shopify app stack for speed and SEO conflicts — because many common Shopify apps slow your store and create indexation problems.' },
  { title: 'Revenue Attribution', desc: 'We connect organic traffic to Shopify revenue using GA4 ecommerce tracking — so you see exactly which keywords and pages are driving sales.' },
  { title: 'Google Shopping Integration', desc: 'Product schema and feed optimisation to support Google Shopping placements alongside organic rankings — a unified search presence strategy.' },
  { title: 'Shopify Plus Experience', desc: 'From standard Shopify to Shopify Plus with multiple storefronts, custom checkout, and B2B configurations — we handle the full range of Shopify complexity.' },
  { title: 'Proven Ecommerce Results', desc: '500+ Shopify stores optimised. Average 280% organic traffic increase over 12 months across our Shopify SEO client base.' },
];

const FAQS = [
  { q: 'What are the biggest SEO problems with Shopify?', a: 'The most common Shopify SEO issues are: (1) Duplicate product URLs — Shopify creates /collections/X/products/Y in addition to /products/Y, causing content duplication unless canonicalised correctly; (2) Thin collection pages with little content; (3) Slow theme speed from app scripts; (4) Limited control over URL structure (no subdirectories for products); (5) Blog content not being linked strategically to commercial pages. We fix all of these as part of our standard Shopify SEO engagement.' },
  { q: 'Does Shopify handle SEO automatically?', a: 'Shopify provides basic SEO functionality — editable title tags, meta descriptions, alt text, and XML sitemaps. However, it does not fix duplicate content issues, does not configure schema markup beyond basic product data, does not optimise Core Web Vitals, and does not build links or create content. The built-in tools are a foundation — they do not constitute a competitive SEO strategy.' },
  { q: 'How do I fix the Shopify duplicate product URL issue?', a: 'Shopify creates two accessible URLs for products assigned to collections — /products/handle and /collections/collection-handle/products/handle. The fix is to implement a canonical tag on the /collections/ version pointing to the /products/ canonical URL. In most themes, this is done via a Liquid edit to the product.liquid template. We handle this across your entire product catalogue as part of the technical SEO phase.' },
  { q: 'Which Shopify apps help with SEO?', a: 'The most valuable SEO-focused apps are: Plug In SEO or SEO Manager for bulk meta editing; TinyIMG or Crush.pics for image optimisation; Smart SEO for schema markup automation; and JSON-LD for SEO for advanced structured data. However, adding too many apps slows your store — we audit your app stack and recommend the minimum set needed to achieve your SEO goals.' },
  { q: 'Can you improve my Shopify store\'s Core Web Vitals?', a: 'Yes. Shopify Core Web Vitals improvements typically involve: compressing and converting product images to WebP; removing unused Shopify apps that inject scripts; deferring third-party scripts (chat widgets, analytics); optimising font loading; and fixing Cumulative Layout Shift from above-fold image dimensions. We identify your specific bottlenecks using PageSpeed Insights and implement targeted fixes rather than generic recommendations.' },
  { q: 'Do you optimise Shopify collection pages?', a: 'Yes. Collection pages are often the highest-converting entry points for commercial keywords and are frequently under-optimised. We write unique, keyword-targeted content for each collection page, optimise meta tags, implement schema, add internal links to subcategories and products, and build links specifically to collection page URLs. Collection page SEO is one of the highest-ROI improvements for Shopify stores.' },
  { q: 'How long does it take to rank a Shopify store?', a: 'For established Shopify stores with existing domain authority, technical fixes typically improve rankings within 6 to 12 weeks. New stores or stores with minimal authority targeting competitive keywords (e.g., "buy running shoes online") realistically take 6 to 12 months to achieve first-page positions. We provide a realistic timeline and keyword difficulty assessment in your initial audit.' },
  { q: 'Do you offer Shopify SEO for international stores using Shopify Markets?', a: 'Yes. Shopify Markets requires careful hreflang implementation, geo-targeting configuration in Google Search Console, and market-specific keyword strategy. We have optimised Shopify Markets setups for stores selling across US, UK, Canada, and Australia markets — handling both subdirectory and subdomain configurations.' },
];

const STATS = [
  { label: 'Shopify Stores Optimised', val: '500+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Avg Organic Traffic Lift', val: '+280%' },
  { label: 'Client Retention', val: '96%' },
];

export default function ShopifySeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);

  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);

  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Shopify SEO', item: 'https://www.1solutions.biz/shopify-seo-services/' }] }, { '@type': 'Service', name: 'Shopify SEO Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Shopify SEO', url: 'https://www.1solutions.biz/shopify-seo-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };

  return (
    <>
      <Head>
        <title>Shopify SEO Services | Shopify Store SEO Specialists | 1Solutions</title>
        <meta name="description" content="Shopify SEO services that fix duplicate URLs, optimise product & collection pages, improve Core Web Vitals, and drive organic revenue. 500+ Shopify stores ranked." />
        <meta name="keywords" content="shopify seo services, shopify seo agency, shopify store seo, shopify seo company, shopify product page seo, shopify technical seo" />
        <link rel="canonical" href="https://www.1solutions.biz/shopify-seo-services/" />
        <meta property="og:title" content="Shopify SEO Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/shopify-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .shseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .shseo-page *,.shseo-page *::before,.shseo-page *::after{box-sizing:border-box}
          .shseo-hero{background:linear-gradient(135deg,#ecfdf5 0%,#d1fae5 25%,#dcfce7 60%,#f0fdf4 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .shseo-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(0,128,96,0.13) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .shseo-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(4,120,87,0.08) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .shseo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .shseo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .shseo-bc a{color:#6b7280;text-decoration:none}.shseo-bc a:hover{color:#008060}.shseo-bc span{color:#d1d5db}
          .shseo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(0,128,96,0.08);border:1px solid rgba(0,128,96,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#006E52;margin-bottom:28px}
          .shseo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#004C3F 0%,#008060 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .shseo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .shseo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .shseo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#008060;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(0,128,96,0.28)}
          .shseo-btn-p:hover{background:#006E52;box-shadow:0 8px 32px rgba(0,128,96,0.38);transform:translateY(-2px)}
          .shseo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .shseo-btn-s:hover{border-color:#008060;color:#008060;transform:translateY(-2px)}
          .shseo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(0,128,96,0.08)}
          .shseo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(0,128,96,0.08)}.shseo-stat:last-child{border-right:none}
          .shseo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .shseo-stat-v{font-size:1.6rem;font-weight:900;color:#008060;letter-spacing:-0.5px}
          .shseo-svc{background:#f8fafd;padding:80px 40px}.shseo-svc-in{max-width:1280px;margin:0 auto}
          .shseo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#008060;margin-bottom:10px;display:block}
          .shseo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#004C3F 0%,#008060 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .shseo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .shseo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .shseo-card{background:linear-gradient(135deg,rgba(236,253,245,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(220,252,231,0.40) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(0,128,96,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s,border-color 0.22s}
          .shseo-card.visible{opacity:1;transform:translateY(0)}.shseo-card:hover{transform:translateY(-6px);border-color:rgba(0,128,96,0.25);box-shadow:0 16px 48px rgba(0,128,96,0.10)}
          .shseo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#008060;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .shseo-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .shseo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .shseo-plat{background:linear-gradient(135deg,#004C3F 0%,#008060 100%);padding:60px 40px}
          .shseo-plat-in{max-width:1280px;margin:0 auto;text-align:center}
          .shseo-plat h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .shseo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .shseo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .shseo-proc{background:linear-gradient(135deg,#ecfdf5 0%,#f0fdf4 50%,#dcfce7 100%);padding:80px 40px}
          .shseo-proc-in{max-width:900px;margin:0 auto}
          .shseo-steps{display:flex;flex-direction:column;margin-top:44px}
          .shseo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(0,128,96,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .shseo-step:last-child{border-bottom:none}.shseo-step.visible{opacity:1;transform:translateX(0)}
          .shseo-snum{font-size:3rem;font-weight:900;color:rgba(0,128,96,0.15);line-height:1;letter-spacing:-2px}
          .shseo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .shseo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .shseo-why{background:#fff;padding:80px 40px}.shseo-why-in{max-width:1280px;margin:0 auto}
          .shseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .shseo-wcard{background:linear-gradient(135deg,#ecfdf5 0%,#fff 60%,#dcfce7 100%);border:1px solid rgba(0,128,96,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .shseo-wcard.visible{opacity:1;transform:translateY(0)}.shseo-wcard:hover{border-color:rgba(0,128,96,0.22);box-shadow:0 8px 32px rgba(0,128,96,0.07)}
          .shseo-dot{width:8px;height:8px;border-radius:50%;background:#008060;margin-bottom:16px}
          .shseo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .shseo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .shseo-faq{background:#f8fafd;padding:80px 40px}.shseo-faq-in{max-width:860px;margin:0 auto}
          .shseo-fitem{border-bottom:1px solid #e5e7eb}
          .shseo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .shseo-fq:hover{color:#008060}
          .shseo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .shseo-fitem.open .shseo-ficon{border-color:#008060;color:#008060;background:rgba(0,128,96,0.06)}
          .shseo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .shseo-fitem.open .shseo-fa{max-height:500px;padding-bottom:22px}
          .shseo-cta{background:linear-gradient(135deg,rgba(0,128,96,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(0,76,63,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .shseo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(0,128,96,0.10) 0%,transparent 70%);pointer-events:none}
          .shseo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(4,120,87,0.08) 0%,transparent 70%);pointer-events:none}
          .shseo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .shseo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#004C3F 0%,#008060 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .shseo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .shseo-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.shseo-grid{grid-template-columns:repeat(2,1fr)}.shseo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.shseo-hero,.shseo-svc,.shseo-plat,.shseo-proc,.shseo-why,.shseo-faq,.shseo-cta{padding:60px 24px}.shseo-hero{padding-top:60px;padding-bottom:0}.shseo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.shseo-stat:nth-child(2){border-right:none}.shseo-grid{grid-template-columns:1fr}.shseo-why-grid{grid-template-columns:1fr}.shseo-step{grid-template-columns:56px 1fr}.shseo-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="shseo-page">
        <section className="shseo-hero">
          <div className="shseo-o1"/><div className="shseo-o2"/>
          <div className="shseo-in">
            <nav className="shseo-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO Services</Link><span>/</span><span style={{color:'#008060'}}>Shopify SEO</span></nav>
            <span className="shseo-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#008060',display:'inline-block'}}/> Shopify · Shopify Plus · Google Shopping</span>
            <h1 className="shseo-h1">Shopify SEO Services That Drive Organic Revenue</h1>
            <p className="shseo-sub">Fix Shopify&rsquo;s duplicate URL issues, optimise every product and collection page, and build the domain authority your store needs to outrank competitors on high-intent keywords.</p>
            <div className="shseo-btns">
              <Link href="/contact-us" className="shseo-btn-p">Get a Free Shopify SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/shopify-store-development" className="shseo-btn-s">Shopify Development</Link>
            </div>
            <div className="shseo-stats">{STATS.map(s => <div key={s.label} className="shseo-stat"><div className="shseo-stat-l">{s.label}</div><div className="shseo-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="shseo-svc"><div className="shseo-svc-in">
          <span className="shseo-ey2">What We Do</span><h2 className="shseo-ttl">Shopify SEO Services</h2>
          <p className="shseo-desc">Platform-specific SEO that fixes Shopify&rsquo;s structural issues first, then builds organic traffic and revenue through proven on-page and off-page strategy.</p>
          <div className="shseo-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`shseo-card${visibleCards.includes(i)?' visible':''}`}><div className="shseo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="shseo-plat"><div className="shseo-plat-in">
          <h2>Shopify Platform Coverage</h2>
          <div className="shseo-pills">{PLATFORMS.map(c => <span key={c} className="shseo-pill">{c}</span>)}</div>
        </div></section>
        <section className="shseo-proc"><div className="shseo-proc-in">
          <span className="shseo-ey2">How We Work</span><h2 className="shseo-ttl">Our Shopify SEO Process</h2>
          <p className="shseo-desc">Technical fixes first, then content and authority — a structured 6-step programme with monthly reporting on organic revenue impact.</p>
          <div className="shseo-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`shseo-step${visibleSteps.includes(i)?' visible':''}`}><div className="shseo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="shseo-why"><div className="shseo-why-in">
          <span className="shseo-ey2">Why 1Solutions</span><h2 className="shseo-ttl">Shopify SEO Specialists — Not Generalists</h2>
          <p className="shseo-desc">We know every Shopify SEO issue — from the /collections/products/ duplication problem to app script bloat — and have documented fixes for all of them.</p>
          <div className="shseo-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`shseo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="shseo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="shseo-faq"><div className="shseo-faq-in">
          <span className="shseo-ey2">Got Questions?</span><h2 className="shseo-ttl">Shopify SEO FAQs</h2>
          <p className="shseo-desc">Answers to what Shopify merchants ask most before starting an SEO campaign.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`shseo-fitem${openFaq===i?' open':''}`}><button className="shseo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="shseo-ficon">{openFaq===i?'−':'+'}</span></button><div className="shseo-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="shseo-cta"><div className="shseo-cta-o1"/><div className="shseo-cta-o2"/>
          <div className="shseo-cta-in">
            <span className="shseo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Rank Your Shopify Store?</span>
            <h2 className="shseo-cta-t">Get Your Free Shopify SEO Audit</h2>
            <p className="shseo-cta-s">We&rsquo;ll audit your store&rsquo;s technical health, duplicate URL issues, product page optimisation, and keyword gaps — free, with a clear action plan.</p>
            <div className="shseo-cta-btns">
              <Link href="/contact-us" className="shseo-btn-p">Get Free Shopify SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/ecommerce-seo-services" className="shseo-btn-s">Ecommerce SEO Services</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
