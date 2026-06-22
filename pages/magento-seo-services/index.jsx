import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Magento Technical SEO Audit', desc: 'In-depth audit covering crawl budget, layered navigation, duplicate content from faceted URLs, canonical tags, XML sitemaps, robots.txt, and Core Web Vitals on Magento 2 and Adobe Commerce.' },
  { n: '02', title: 'Layered Navigation Optimisation', desc: 'Magento\'s layered navigation creates thousands of crawlable faceted URLs. We configure canonical tags, robots directives, and URL parameter handling to eliminate indexation waste without breaking UX.' },
  { n: '03', title: 'Magento Duplicate Content Fix', desc: 'Resolve product duplication across multiple categories, pagination duplicate issues, and URL suffix variations (.html, /) that create competing versions of the same page.' },
  { n: '04', title: 'Product & Category Page SEO', desc: 'Bulk meta tag optimisation, heading structure, unique product descriptions, internal link architecture, and structured data for Magento product and category pages at scale.' },
  { n: '05', title: 'Magento Schema Markup', desc: 'Product, BreadcrumbList, Organisation, AggregateRating, and Offer schema — implemented via Magento modules or custom extensions for rich snippet eligibility.' },
  { n: '06', title: 'Magento Page Speed Optimisation', desc: 'Full-page cache configuration, Varnish setup, image optimisation, JS/CSS bundling, CDN integration, and Magento-specific Core Web Vitals improvements.' },
  { n: '07', title: 'International Magento SEO', desc: 'Hreflang implementation for Magento multi-store setups, store view SEO configuration, and geo-targeting strategy for international Magento and Adobe Commerce deployments.' },
  { n: '08', title: 'Magento Link Building', desc: 'Authority link acquisition targeting commercial ecommerce keywords — product review placements, industry directory submissions, digital PR, and competitor link gap campaigns.' },
];

const PLATFORMS = ['Magento 2', 'Adobe Commerce', 'Magento Open Source', 'PWA Studio', 'Hyva Theme', 'Luma Theme', 'B2B Module', 'Multi-Store Setup'];

const PROCESS = [
  { step: '01', title: 'Magento SEO Audit', desc: 'Full crawl with Screaming Frog, GSC data analysis, layered navigation URL audit, duplicate content mapping, and competitor benchmarking.' },
  { step: '02', title: 'Technical Fixes', desc: 'Canonical tag corrections, robots.txt update, layered navigation configuration, sitemap clean-up, and schema implementation via Magento modules.' },
  { step: '03', title: 'On-Page Optimisation', desc: 'Bulk meta tag updates, heading hierarchy, product description quality review, image alt text, and internal link architecture at catalogue scale.' },
  { step: '04', title: 'Speed Improvements', desc: 'Full-page cache, Varnish, image optimisation, CDN configuration, and Core Web Vitals fixes specific to your Magento theme.' },
  { step: '05', title: 'Content & Authority', desc: 'Category page content, buying guides, and link acquisition targeting your highest-value commercial keywords.' },
  { step: '06', title: 'Monitor & Report', desc: 'Monthly reporting on organic revenue, keyword rankings, crawl health, and Core Web Vitals — with GSC and GA4 attribution.' },
];

const WHY = [
  { title: 'Magento-Certified Expertise', desc: 'Our team includes Magento-certified developers and SEO specialists who understand the platform at code level — not just admin settings.' },
  { title: 'Large Catalogue Experience', desc: 'We have optimised Magento catalogues with 5,000 to 500,000+ SKUs — building scalable, template-based SEO processes that maintain quality at every level.' },
  { title: 'Layered Nav Mastery', desc: 'Magento\'s layered navigation is the #1 crawl budget destroyer for large stores. We fix it correctly — preserving filter UX while eliminating indexation waste.' },
  { title: 'Adobe Commerce Ready', desc: 'We work across Magento Open Source and Adobe Commerce cloud deployments — including B2B module configurations and PWA Studio headless setups.' },
  { title: 'Revenue-Focused Reporting', desc: 'We connect organic rankings to Magento revenue using GA4 ecommerce tracking — every report shows sales impact, not just keyword positions.' },
  { title: 'Proven Results at Scale', desc: '150+ Magento stores optimised. Average 285% organic traffic increase over 12 months across our Magento client base.' },
];

const FAQS = [
  { q: 'What are the biggest SEO issues specific to Magento?', a: 'Magento\'s most significant SEO challenges are: (1) Layered navigation creating thousands of crawlable faceted URLs that waste crawl budget; (2) Product duplication across multiple categories creating competing URLs; (3) URL suffix inconsistencies (.html vs no suffix); (4) Slow page load due to default Magento rendering; (5) Thin category pages with limited unique content. All of these are addressable and we fix them as part of our standard Magento SEO engagement.' },
  { q: 'How do you handle Magento layered navigation for SEO?', a: 'Layered navigation in Magento generates a URL for every combination of filter selections. For a catalogue with 10 filters and 5 options each, this can generate millions of URLs. The correct approach combines: (1) canonical tags on filtered pages pointing to the unfiltered category URL; (2) robots noindex on low-value filter combinations; (3) Google Search Console parameter configuration; and (4) selective indexation of commercially valuable filtered pages (e.g., /women/tops/colour-red/ if it has sufficient search volume). We map this out per store before implementing.' },
  { q: 'Does Magento 2 have better SEO than Magento 1?', a: 'Yes significantly. Magento 2 has native URL rewrites, improved canonical tag handling, better XML sitemap generation, and cleaner URL structures than Magento 1. However, Magento 2 still has the layered navigation problem, can generate duplicate content from category/product URL combinations, and requires proper configuration to achieve optimal SEO performance. If you are still on Magento 1, migrating to Magento 2 or Adobe Commerce is a strong SEO recommendation — along with a comprehensive redirect mapping exercise.' },
  { q: 'Can you optimise Magento for Google Shopping alongside organic?', a: 'Yes. Magento product schema (Product, Offer, AggregateRating) supports both organic rich snippets and Google Shopping feed quality. We implement structured data that enhances your organic listings while aligning with Google Merchant Centre feed requirements — giving your products a presence in both Shopping ads and organic results.' },
  { q: 'How do you improve Magento page speed for SEO?', a: 'Magento speed improvements follow a priority order: (1) Enable full-page cache and Varnish; (2) Configure a CDN (Fastly for Adobe Commerce, Cloudflare for open source); (3) Compress and convert images to WebP; (4) Enable JS/CSS bundling and minification; (5) Defer non-critical third-party scripts; (6) Address render-blocking resources in the theme. We use PageSpeed Insights and Chrome DevTools to identify your specific bottlenecks before implementing changes.' },
  { q: 'Do you handle Magento multi-store SEO?', a: 'Yes. Magento multi-store setups — multiple websites, stores, and store views — require careful hreflang implementation, separate GSC properties for each domain or subdomain, and store-view-level canonical tag configuration. We have managed international Magento multi-store SEO across US, UK, Canada, and Australian markets, including currency and language variations.' },
  { q: 'What is the difference between Magento Open Source and Adobe Commerce for SEO?', a: 'Adobe Commerce (formerly Magento Commerce) includes Fastly CDN, Elasticsearch, and the Page Builder — all of which can impact SEO. Fastly provides better Core Web Vitals for high-traffic stores. Elasticsearch improves site search (which affects crawlability). Page Builder can introduce layout-driven rendering issues that need specific SEO attention. Our audit covers the specific version you are running and adjusts recommendations accordingly.' },
  { q: 'How long does Magento SEO take to show results?', a: 'Technical fixes on Magento stores typically show crawl and indexation improvements within 3 to 6 weeks. Keyword ranking improvements for existing pages usually appear within 8 to 16 weeks following on-page optimisation. Large catalogues take longer because Googlebot needs time to re-crawl and re-index pages after changes. We track GSC crawl stats weekly post-implementation so you can see progress building from the first month.' },
];

const STATS = [
  { label: 'Magento Stores Optimised', val: '150+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Avg Traffic Growth', val: '+285%' },
  { label: 'Client Retention', val: '94%' },
];

export default function MagentoSeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);

  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);

  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Magento SEO', item: 'https://www.1solutions.biz/magento-seo-services/' }] }, { '@type': 'Service', name: 'Magento SEO Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Magento SEO', url: 'https://www.1solutions.biz/magento-seo-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };

  const AC = '#C2410C';
  return (
    <>
      <Head>
        <title>Magento SEO Services | Adobe Commerce SEO Experts | 1Solutions</title>
        <meta name="description" content="Magento SEO services that fix layered navigation, duplicate content, and Core Web Vitals. Specialists in Magento 2 and Adobe Commerce SEO for large ecommerce catalogues." />
        <meta name="keywords" content="magento seo services, magento seo agency, magento 2 seo, adobe commerce seo, magento technical seo, magento seo company" />
        <link rel="canonical" href="https://www.1solutions.biz/magento-seo-services/" />
        <meta property="og:title" content="Magento SEO Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/magento-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .mgseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .mgseo-page *,.mgseo-page *::before,.mgseo-page *::after{box-sizing:border-box}
          .mgseo-hero{background:linear-gradient(135deg,#fff7ed 0%,#fed7aa 25%,#fde8d0 60%,#fffbf5 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .mgseo-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(194,65,12,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .mgseo-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(234,88,12,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .mgseo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .mgseo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .mgseo-bc a{color:#6b7280;text-decoration:none}.mgseo-bc a:hover{color:#C2410C}.mgseo-bc span{color:#d1d5db}
          .mgseo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(194,65,12,0.08);border:1px solid rgba(194,65,12,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#9A3412;margin-bottom:28px}
          .mgseo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#7C2D12 0%,#C2410C 50%,#0F1F40 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .mgseo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .mgseo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .mgseo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#C2410C;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(194,65,12,0.28)}
          .mgseo-btn-p:hover{background:#9A3412;box-shadow:0 8px 32px rgba(194,65,12,0.38);transform:translateY(-2px)}
          .mgseo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .mgseo-btn-s:hover{border-color:#C2410C;color:#C2410C;transform:translateY(-2px)}
          .mgseo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(194,65,12,0.07)}
          .mgseo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(194,65,12,0.08)}.mgseo-stat:last-child{border-right:none}
          .mgseo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .mgseo-stat-v{font-size:1.6rem;font-weight:900;color:#C2410C;letter-spacing:-0.5px}
          .mgseo-svc{background:#f8fafd;padding:80px 40px}.mgseo-svc-in{max-width:1280px;margin:0 auto}
          .mgseo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#C2410C;margin-bottom:10px;display:block}
          .mgseo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#7C2D12 0%,#C2410C 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .mgseo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .mgseo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .mgseo-card{background:linear-gradient(135deg,rgba(255,247,237,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(254,215,170,0.30) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(194,65,12,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .mgseo-card.visible{opacity:1;transform:translateY(0)}.mgseo-card:hover{transform:translateY(-6px);border-color:rgba(194,65,12,0.22);box-shadow:0 16px 48px rgba(194,65,12,0.09)}
          .mgseo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#C2410C;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .mgseo-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .mgseo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .mgseo-plat{background:linear-gradient(135deg,#7C2D12 0%,#C2410C 100%);padding:60px 40px}
          .mgseo-plat-in{max-width:1280px;margin:0 auto;text-align:center}
          .mgseo-plat h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .mgseo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .mgseo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .mgseo-proc{background:linear-gradient(135deg,#fff7ed 0%,#fffbf5 50%,#fde8d0 100%);padding:80px 40px}
          .mgseo-proc-in{max-width:900px;margin:0 auto}
          .mgseo-steps{display:flex;flex-direction:column;margin-top:44px}
          .mgseo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(194,65,12,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .mgseo-step:last-child{border-bottom:none}.mgseo-step.visible{opacity:1;transform:translateX(0)}
          .mgseo-snum{font-size:3rem;font-weight:900;color:rgba(194,65,12,0.15);line-height:1;letter-spacing:-2px}
          .mgseo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .mgseo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .mgseo-why{background:#fff;padding:80px 40px}.mgseo-why-in{max-width:1280px;margin:0 auto}
          .mgseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .mgseo-wcard{background:linear-gradient(135deg,#fff7ed 0%,#fff 60%,#fde8d0 100%);border:1px solid rgba(194,65,12,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .mgseo-wcard.visible{opacity:1;transform:translateY(0)}.mgseo-wcard:hover{border-color:rgba(194,65,12,0.20);box-shadow:0 8px 32px rgba(194,65,12,0.07)}
          .mgseo-dot{width:8px;height:8px;border-radius:50%;background:#C2410C;margin-bottom:16px}
          .mgseo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .mgseo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .mgseo-faq{background:#f8fafd;padding:80px 40px}.mgseo-faq-in{max-width:860px;margin:0 auto}
          .mgseo-fitem{border-bottom:1px solid #e5e7eb}
          .mgseo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .mgseo-fq:hover{color:#C2410C}
          .mgseo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .mgseo-fitem.open .mgseo-ficon{border-color:#C2410C;color:#C2410C;background:rgba(194,65,12,0.06)}
          .mgseo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .mgseo-fitem.open .mgseo-fa{max-height:500px;padding-bottom:22px}
          .mgseo-cta{background:linear-gradient(135deg,rgba(194,65,12,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(124,45,18,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .mgseo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(194,65,12,0.10) 0%,transparent 70%);pointer-events:none}
          .mgseo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(124,45,18,0.08) 0%,transparent 70%);pointer-events:none}
          .mgseo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .mgseo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#7C2D12 0%,#C2410C 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .mgseo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .mgseo-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.mgseo-grid{grid-template-columns:repeat(2,1fr)}.mgseo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.mgseo-hero,.mgseo-svc,.mgseo-plat,.mgseo-proc,.mgseo-why,.mgseo-faq,.mgseo-cta{padding:60px 24px}.mgseo-hero{padding-top:60px;padding-bottom:0}.mgseo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.mgseo-stat:nth-child(2){border-right:none}.mgseo-grid{grid-template-columns:1fr}.mgseo-why-grid{grid-template-columns:1fr}.mgseo-step{grid-template-columns:56px 1fr}.mgseo-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="mgseo-page">
        <section className="mgseo-hero">
          <div className="mgseo-o1"/><div className="mgseo-o2"/>
          <div className="mgseo-in">
            <nav className="mgseo-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO Services</Link><span>/</span><span style={{color:'#C2410C'}}>Magento SEO</span></nav>
            <span className="mgseo-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#C2410C',display:'inline-block'}}/> Magento 2 · Adobe Commerce · PWA Studio</span>
            <h1 className="mgseo-h1">Magento SEO Services for Large Ecommerce Catalogues</h1>
            <p className="mgseo-sub">Fix layered navigation, resolve duplicate content, and drive organic revenue growth on Magento 2 and Adobe Commerce — with platform-native technical expertise and scalable processes.</p>
            <div className="mgseo-btns">
              <Link href="/contact" className="mgseo-btn-p">Get a Free Magento SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/magento-development-company" className="mgseo-btn-s">Magento Development</Link>
            </div>
            <div className="mgseo-stats">{STATS.map(s => <div key={s.label} className="mgseo-stat"><div className="mgseo-stat-l">{s.label}</div><div className="mgseo-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="mgseo-svc"><div className="mgseo-svc-in">
          <span className="mgseo-ey2">What We Do</span><h2 className="mgseo-ttl">Magento SEO Services</h2>
          <p className="mgseo-desc">Every Magento SEO layer — technical, on-page, content, and authority — handled by specialists who know the platform at code level.</p>
          <div className="mgseo-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`mgseo-card${visibleCards.includes(i)?' visible':''}`}><div className="mgseo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="mgseo-plat"><div className="mgseo-plat-in">
          <h2>Magento Platform Coverage</h2>
          <div className="mgseo-pills">{PLATFORMS.map(c => <span key={c} className="mgseo-pill">{c}</span>)}</div>
        </div></section>
        <section className="mgseo-proc"><div className="mgseo-proc-in">
          <span className="mgseo-ey2">How We Work</span><h2 className="mgseo-ttl">Our Magento SEO Process</h2>
          <p className="mgseo-desc">Platform audit first, scalable fixes second, then content and authority — monthly reporting on organic revenue throughout.</p>
          <div className="mgseo-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`mgseo-step${visibleSteps.includes(i)?' visible':''}`}><div className="mgseo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="mgseo-why"><div className="mgseo-why-in">
          <span className="mgseo-ey2">Why 1Solutions</span><h2 className="mgseo-ttl">Magento SEO Specialists at Scale</h2>
          <p className="mgseo-desc">Magento-certified expertise, large catalogue experience, and a revenue-focused reporting model that connects SEO to sales, not just rankings.</p>
          <div className="mgseo-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`mgseo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="mgseo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="mgseo-faq"><div className="mgseo-faq-in">
          <span className="mgseo-ey2">Got Questions?</span><h2 className="mgseo-ttl">Magento SEO FAQs</h2>
          <p className="mgseo-desc">Answers to the most common questions about Magento SEO.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`mgseo-fitem${openFaq===i?' open':''}`}><button className="mgseo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="mgseo-ficon">{openFaq===i?'−':'+'}</span></button><div className="mgseo-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="mgseo-cta"><div className="mgseo-cta-o1"/><div className="mgseo-cta-o2"/>
          <div className="mgseo-cta-in">
            <span className="mgseo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Rank Your Magento Store?</span>
            <h2 className="mgseo-cta-t">Get Your Free Magento SEO Audit</h2>
            <p className="mgseo-cta-s">We&rsquo;ll audit your layered navigation, duplicate content issues, page speed, and organic keyword gaps — free, with a prioritised action plan.</p>
            <div className="mgseo-cta-btns">
              <Link href="/contact" className="mgseo-btn-p">Get Free Magento SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/ecommerce-seo-services" className="mgseo-btn-s">Ecommerce SEO Services</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
