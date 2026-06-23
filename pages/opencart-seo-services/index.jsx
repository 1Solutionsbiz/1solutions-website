import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'OpenCart Technical SEO Audit', desc: 'Complete audit of your OpenCart store — duplicate URL issues, SEO URL configuration, crawlability, canonical tags, XML sitemap quality, robots.txt, and Core Web Vitals.' },
  { n: '02', title: 'OpenCart URL Structure Optimisation', desc: 'Configure OpenCart\'s SEO-friendly URL settings correctly, eliminate session ID and query string URLs from indexation, and establish a clean, keyword-rich URL structure.' },
  { n: '03', title: 'Product & Category Page SEO', desc: 'Bulk meta tag optimisation, heading structure, unique product descriptions, keyword targeting, and internal linking for OpenCart product and category pages.' },
  { n: '04', title: 'OpenCart Duplicate Content Fix', desc: 'Resolve product duplication across categories, fix pagination duplicate issues, and canonicalise currency/language switching parameters that create competing page versions.' },
  { n: '05', title: 'OpenCart Schema Markup', desc: 'Product, BreadcrumbList, Organisation, Offer, and AggregateRating structured data — implemented via OpenCart extensions or custom PHP for rich search result eligibility.' },
  { n: '06', title: 'OpenCart Page Speed', desc: 'Image optimisation, caching configuration, CDN setup, CSS/JS minification, and database query optimisation to improve Core Web Vitals scores and user experience.' },
  { n: '07', title: 'OpenCart Content Strategy', desc: 'Keyword research, category page content creation, buying guides, and blog strategy to capture top-of-funnel traffic and support commercial page authority.' },
  { n: '08', title: 'OpenCart Link Building', desc: 'Domain authority building through industry directories, product review sites, and digital PR — targeted to the keywords and pages that drive the most revenue for your store.' },
];

const EXTENSIONS = ['OpenCart 3.x', 'OpenCart 4.x', 'SEO Pack Extension', 'Journal Theme', 'Opencart SEO Module', 'Google Analytics Integration', 'Multi-Store', 'Multi-Language'];

const PROCESS = [
  { step: '01', title: 'OpenCart SEO Audit', desc: 'Full crawl, GSC analysis, URL structure review, duplicate content identification, and keyword baseline.' },
  { step: '02', title: 'Technical Fixes', desc: 'SEO URL configuration, canonical tags, robots.txt, sitemap clean-up, and schema implementation.' },
  { step: '03', title: 'On-Page Optimisation', desc: 'Bulk meta updates, product descriptions, heading structure, and internal link architecture.' },
  { step: '04', title: 'Speed Improvements', desc: 'Caching setup, image compression, CDN configuration, and Core Web Vitals improvements.' },
  { step: '05', title: 'Content Strategy', desc: 'Category page content, blog creation, and buying guides targeting top-of-funnel keywords.' },
  { step: '06', title: 'Monitor & Report', desc: 'Monthly keyword movement, organic revenue, crawl health, and Core Web Vitals reporting.' },
];

const WHY = [
  { title: 'OpenCart Platform Knowledge', desc: 'We have worked with OpenCart 2.x, 3.x, and 4.x — knowing the default SEO settings that need correcting and the extensions that genuinely help.' },
  { title: 'URL Structure Expertise', desc: 'OpenCart\'s default URL handling creates significant indexation problems. We configure it correctly from the start and clean up any existing URL debt.' },
  { title: 'Extension-Aware Approach', desc: 'We audit your OpenCart extension stack for conflicts and performance impact — recommending only what adds genuine SEO value.' },
  { title: 'Multi-Store & Multi-Language', desc: 'OpenCart multi-store and multi-language setups require specific hreflang, canonical, and geo-targeting configuration — we handle all of it.' },
  { title: 'Transparent Reporting', desc: 'Monthly reports with direct GSC and GA4 data — keyword rankings, organic traffic, and revenue attribution with no black-box metrics.' },
  { title: 'Proven Ecommerce Results', desc: '100+ OpenCart stores optimised. Average 190% organic traffic growth over 12 months, with documented revenue attribution.' },
];

const FAQS = [
  { q: 'What are the most common OpenCart SEO issues?', a: 'The most frequent OpenCart SEO problems are: (1) SEO URLs not enabled or incorrectly configured — generating query string URLs like ?route=product/product&product_id=123; (2) Duplicate product pages when products appear in multiple categories; (3) Thin category pages with no unique content; (4) No structured data for products; (5) Slow page load from unoptimised images and no caching. We address all of these as part of our standard OpenCart SEO engagement.' },
  { q: 'How do you configure OpenCart SEO URLs correctly?', a: 'OpenCart\'s SEO URL feature needs to be enabled in admin, the .htaccess file needs to be configured correctly for URL rewrites, and a unique SEO keyword must be set for every product and category page. We also ensure consistent trailing slash usage, configure 301 redirects from old URLs, and submit the updated sitemap to Google Search Console. This process often reveals previously uncrawled pages that start ranking once technical issues are resolved.' },
  { q: 'Can you optimise an OpenCart store with thousands of products?', a: 'Yes. For large OpenCart catalogues we use automated bulk meta generation (using product name + category templates as a baseline), prioritise manual optimisation for highest-revenue products, and implement a meta tag quality scoring system to identify pages needing immediate improvement. We have optimised OpenCart stores with 500 to 50,000+ products, building scalable processes that maintain quality across the full catalogue.' },
  { q: 'Does OpenCart have good native SEO features?', a: 'OpenCart has basic SEO functionality — SEO URL rewrites, editable meta tags, and XML sitemap generation. However, it does not automatically handle canonical tags for duplicate product URLs, does not generate structured data, has limited control over pagination SEO, and requires extensions for advanced features like schema markup and bulk meta editing. Our service fills these gaps with the right combination of extensions and custom implementation.' },
  { q: 'What OpenCart SEO extensions do you recommend?', a: 'For most OpenCart stores we recommend: a dedicated SEO extension for bulk meta management (SEO Pack or similar); an image optimisation extension; a caching module for speed; and a schema markup extension. We audit your existing extensions before recommending additions — because too many extensions slow your store and can conflict. Our goal is a lean extension stack that covers SEO requirements without creating new performance problems.' },
  { q: 'Can you migrate my OpenCart store to a different platform without losing SEO rankings?', a: 'Yes. Platform migrations require a comprehensive SEO redirect mapping (all existing URLs mapped to new URLs), pre-migration ranking baseline, GSC property update, and 90-day post-migration monitoring. We have managed OpenCart migrations to WooCommerce, Shopify, and Magento without ranking loss when the redirect strategy is implemented correctly. We provide a detailed migration SEO checklist and QA process.' },
  { q: 'How do you handle OpenCart multi-store SEO?', a: 'OpenCart multi-store configurations need separate GSC properties for each store domain, hreflang tags for international variants, and careful canonical configuration to prevent stores from competing with each other. We map the relationship between stores, configure canonical and hreflang correctly, and build a unified reporting view across all stores.' },
  { q: 'What results should I expect from OpenCart SEO?', a: 'Stores in low-to-medium competition categories typically see keyword ranking improvements within 8 to 12 weeks of technical and on-page work. Organic traffic growth of 100 to 200% over 12 months is realistic for stores with solid technical foundations and active content and link building. Highly competitive categories (consumer electronics, fashion) take longer and require sustained authority building. We provide realistic projections in your initial audit report.' },
];

const STATS = [
  { label: 'OpenCart Stores Optimised', val: '100+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Avg Traffic Growth', val: '+190%' },
  { label: 'Client Retention', val: '93%' },
];

export default function OpencartSeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);

  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);

  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'OpenCart SEO', item: 'https://www.1solutions.biz/opencart-seo-services/' }] }, { '@type': 'Service', name: 'OpenCart SEO Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'OpenCart SEO', url: 'https://www.1solutions.biz/opencart-seo-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };

  return (
    <>
      <Head>
        <title>OpenCart SEO Services | OpenCart Store SEO Specialists | 1Solutions</title>
        <meta name="description" content="OpenCart SEO services — fix URL structure, duplicate content, and slow page speed. Platform-specialist SEO for OpenCart 3.x and 4.x stores. Free audit available." />
        <meta name="keywords" content="opencart seo services, opencart seo agency, opencart seo company, opencart technical seo, opencart store optimisation" />
        <link rel="canonical" href="https://www.1solutions.biz/opencart-seo-services/" />
        <meta property="og:title" content="OpenCart SEO Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/opencart-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .ocseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .ocseo-page *,.ocseo-page *::before,.ocseo-page *::after{box-sizing:border-box}
          .ocseo-hero{background:linear-gradient(135deg,#ecfeff 0%,#cffafe 25%,#e0f7fa 60%,#f0fdff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .ocseo-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(8,145,178,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .ocseo-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(14,116,144,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .ocseo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .ocseo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .ocseo-bc a{color:#6b7280;text-decoration:none}.ocseo-bc a:hover{color:#0891B2}.ocseo-bc span{color:#d1d5db}
          .ocseo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(8,145,178,0.08);border:1px solid rgba(8,145,178,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0E7490;margin-bottom:28px}
          .ocseo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#164E63 0%,#0891B2 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .ocseo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .ocseo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .ocseo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#0891B2;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(8,145,178,0.28)}
          .ocseo-btn-p:hover{background:#0E7490;box-shadow:0 8px 32px rgba(8,145,178,0.38);transform:translateY(-2px)}
          .ocseo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .ocseo-btn-s:hover{border-color:#0891B2;color:#0891B2;transform:translateY(-2px)}
          .ocseo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(8,145,178,0.07)}
          .ocseo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(8,145,178,0.08)}.ocseo-stat:last-child{border-right:none}
          .ocseo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .ocseo-stat-v{font-size:1.6rem;font-weight:900;color:#0891B2;letter-spacing:-0.5px}
          .ocseo-svc{background:#f8fafd;padding:80px 40px}.ocseo-svc-in{max-width:1280px;margin:0 auto}
          .ocseo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0891B2;margin-bottom:10px;display:block}
          .ocseo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#164E63 0%,#0891B2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .ocseo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .ocseo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .ocseo-card{background:linear-gradient(135deg,rgba(236,254,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(207,250,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(8,145,178,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .ocseo-card.visible{opacity:1;transform:translateY(0)}.ocseo-card:hover{transform:translateY(-6px);border-color:rgba(8,145,178,0.22);box-shadow:0 16px 48px rgba(8,145,178,0.09)}
          .ocseo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0891B2;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .ocseo-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .ocseo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .ocseo-plat{background:linear-gradient(135deg,#164E63 0%,#0891B2 100%);padding:60px 40px}
          .ocseo-plat-in{max-width:1280px;margin:0 auto;text-align:center}
          .ocseo-plat h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .ocseo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .ocseo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .ocseo-proc{background:linear-gradient(135deg,#ecfeff 0%,#f0fdff 50%,#e0f7fa 100%);padding:80px 40px}
          .ocseo-proc-in{max-width:900px;margin:0 auto}
          .ocseo-steps{display:flex;flex-direction:column;margin-top:44px}
          .ocseo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(8,145,178,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .ocseo-step:last-child{border-bottom:none}.ocseo-step.visible{opacity:1;transform:translateX(0)}
          .ocseo-snum{font-size:3rem;font-weight:900;color:rgba(8,145,178,0.15);line-height:1;letter-spacing:-2px}
          .ocseo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .ocseo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .ocseo-why{background:#fff;padding:80px 40px}.ocseo-why-in{max-width:1280px;margin:0 auto}
          .ocseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .ocseo-wcard{background:linear-gradient(135deg,#ecfeff 0%,#fff 60%,#e0f7fa 100%);border:1px solid rgba(8,145,178,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .ocseo-wcard.visible{opacity:1;transform:translateY(0)}.ocseo-wcard:hover{border-color:rgba(8,145,178,0.20);box-shadow:0 8px 32px rgba(8,145,178,0.07)}
          .ocseo-dot{width:8px;height:8px;border-radius:50%;background:#0891B2;margin-bottom:16px}
          .ocseo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .ocseo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .ocseo-faq{background:#f8fafd;padding:80px 40px}.ocseo-faq-in{max-width:860px;margin:0 auto}
          .ocseo-fitem{border-bottom:1px solid #e5e7eb}
          .ocseo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .ocseo-fq:hover{color:#0891B2}
          .ocseo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .ocseo-fitem.open .ocseo-ficon{border-color:#0891B2;color:#0891B2;background:rgba(8,145,178,0.06)}
          .ocseo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .ocseo-fitem.open .ocseo-fa{max-height:500px;padding-bottom:22px}
          .ocseo-cta{background:linear-gradient(135deg,rgba(8,145,178,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(22,78,99,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .ocseo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(8,145,178,0.10) 0%,transparent 70%);pointer-events:none}
          .ocseo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(14,116,144,0.08) 0%,transparent 70%);pointer-events:none}
          .ocseo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .ocseo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#164E63 0%,#0891B2 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .ocseo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .ocseo-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.ocseo-grid{grid-template-columns:repeat(2,1fr)}.ocseo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.ocseo-hero,.ocseo-svc,.ocseo-plat,.ocseo-proc,.ocseo-why,.ocseo-faq,.ocseo-cta{padding:60px 24px}.ocseo-hero{padding-top:60px;padding-bottom:0}.ocseo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.ocseo-stat:nth-child(2){border-right:none}.ocseo-grid{grid-template-columns:1fr}.ocseo-why-grid{grid-template-columns:1fr}.ocseo-step{grid-template-columns:56px 1fr}.ocseo-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="ocseo-page">
        <section className="ocseo-hero"><div className="ocseo-o1"/><div className="ocseo-o2"/>
          <div className="ocseo-in">
            <nav className="ocseo-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO Services</Link><span>/</span><span style={{color:'#0891B2'}}>OpenCart SEO</span></nav>
            <span className="ocseo-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#0891B2',display:'inline-block'}}/> OpenCart 3.x · 4.x · Multi-Store</span>
            <h1 className="ocseo-h1">OpenCart SEO Services That Grow Your Store&rsquo;s Organic Traffic</h1>
            <p className="ocseo-sub">Fix URL structure issues, resolve duplicate content, and optimise product and category pages — platform-specialist SEO for OpenCart stores that drives measurable organic revenue growth.</p>
            <div className="ocseo-btns">
              <Link href="/contact-us" className="ocseo-btn-p">Get a Free OpenCart SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/opencart-development-company" className="ocseo-btn-s">OpenCart Development</Link>
            </div>
            <div className="ocseo-stats">{STATS.map(s => <div key={s.label} className="ocseo-stat"><div className="ocseo-stat-l">{s.label}</div><div className="ocseo-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="ocseo-svc"><div className="ocseo-svc-in">
          <span className="ocseo-ey2">What We Do</span><h2 className="ocseo-ttl">OpenCart SEO Services</h2>
          <p className="ocseo-desc">Every OpenCart SEO layer — from technical URL configuration to product page copy and link building — handled by specialists who know the platform.</p>
          <div className="ocseo-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`ocseo-card${visibleCards.includes(i)?' visible':''}`}><div className="ocseo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="ocseo-plat"><div className="ocseo-plat-in">
          <h2>OpenCart Platform Coverage</h2>
          <div className="ocseo-pills">{EXTENSIONS.map(c => <span key={c} className="ocseo-pill">{c}</span>)}</div>
        </div></section>
        <section className="ocseo-proc"><div className="ocseo-proc-in">
          <span className="ocseo-ey2">How We Work</span><h2 className="ocseo-ttl">Our OpenCart SEO Process</h2>
          <p className="ocseo-desc">Audit first, technical fixes second, then content and authority — monthly reporting on rankings and organic revenue throughout.</p>
          <div className="ocseo-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`ocseo-step${visibleSteps.includes(i)?' visible':''}`}><div className="ocseo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="ocseo-why"><div className="ocseo-why-in">
          <span className="ocseo-ey2">Why 1Solutions</span><h2 className="ocseo-ttl">OpenCart SEO Specialists</h2>
          <p className="ocseo-desc">Platform knowledge, scalable processes, and transparent reporting — built for OpenCart stores that want organic growth without agency fluff.</p>
          <div className="ocseo-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`ocseo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="ocseo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="ocseo-faq"><div className="ocseo-faq-in">
          <span className="ocseo-ey2">Got Questions?</span><h2 className="ocseo-ttl">OpenCart SEO FAQs</h2>
          <p className="ocseo-desc">Answers to common questions about OpenCart SEO.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`ocseo-fitem${openFaq===i?' open':''}`}><button className="ocseo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="ocseo-ficon">{openFaq===i?'−':'+'}</span></button><div className="ocseo-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="ocseo-cta"><div className="ocseo-cta-o1"/><div className="ocseo-cta-o2"/>
          <div className="ocseo-cta-in">
            <span className="ocseo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Rank Your OpenCart Store?</span>
            <h2 className="ocseo-cta-t">Get Your Free OpenCart SEO Audit</h2>
            <p className="ocseo-cta-s">We&rsquo;ll audit your URL structure, duplicate content, page speed, and keyword gaps — and send you a prioritised action plan, completely free.</p>
            <div className="ocseo-cta-btns">
              <Link href="/contact-us" className="ocseo-btn-p">Get Free OpenCart SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/ecommerce-seo-services" className="ocseo-btn-s">Ecommerce SEO Services</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
