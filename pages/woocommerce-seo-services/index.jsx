import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { n: '01', title: 'WooCommerce Technical SEO Audit', desc: 'Comprehensive audit of your WooCommerce store - duplicate content, faceted navigation, pagination, canonical tags, Core Web Vitals, plugin conflicts, and crawl budget analysis.' },
  { n: '02', title: 'WooCommerce Product Page SEO', desc: 'Unique product titles, meta descriptions, schema markup, heading structure, keyword targeting, and image alt text - optimised at scale across your full product catalogue.' },
  { n: '03', title: 'WooCommerce Category SEO', desc: 'Category and subcategory page optimisation - unique content, commercial keyword targeting, internal linking to products, and schema markup for breadcrumb-rich snippets.' },
  { n: '04', title: 'WooCommerce Faceted Navigation', desc: 'Fix the duplicate content and crawl budget waste that WooCommerce faceted navigation creates - canonical tags, robots directives, and selective indexation of commercially valuable filter combinations.' },
  { n: '05', title: 'WooCommerce Schema Markup', desc: 'Product, Offer, AggregateRating, BreadcrumbList, and FAQPage structured data - going beyond what Yoast WooCommerce SEO provides by default for maximum rich snippet coverage.' },
  { n: '06', title: 'WooCommerce Core Web Vitals', desc: 'LCP, CLS, and INP optimisation - WP Rocket configuration, image compression (WebP), unused plugin script removal, font optimisation, and server response improvements.' },
  { n: '07', title: 'WooCommerce Content Strategy', desc: 'Buying guides, product comparison content, category landing pages, and blog content strategy targeting top-of-funnel keywords and supporting commercial page authority.' },
  { n: '08', title: 'WooCommerce Link Building', desc: 'Niche-relevant link acquisition - product review placements, industry directories, digital PR, and competitor link gap analysis targeting your highest-revenue product categories.' },
];

const PLUGINS = ['Yoast WooCommerce SEO', 'Rank Math', 'WP Rocket', 'Imagify', 'WooCommerce Multilingual', 'WPML', 'Cloudflare', 'ShortPixel', 'WooCommerce Product Bundles', 'WooCommerce Subscriptions'];

const PROCESS = [
  { step: '01', title: 'WooCommerce SEO Audit', desc: 'Full crawl, GSC analysis, faceted navigation audit, duplicate content mapping, Core Web Vitals scores, and competitor benchmarking.' },
  { step: '02', title: 'Technical Fixes', desc: 'Canonical tag corrections, faceted navigation configuration, sitemap optimisation, schema implementation, and Core Web Vitals improvements.' },
  { step: '03', title: 'Product & Category Optimisation', desc: 'Bulk meta tag updates, unique product descriptions, category page content, heading hierarchy, and internal link architecture.' },
  { step: '04', title: 'Plugin Stack Audit', desc: 'Review plugin conflicts, remove SEO-damaging plugins, configure Yoast WooCommerce SEO or Rank Math for maximum coverage.' },
  { step: '05', title: 'Content & Authority', desc: 'Buying guides, category landing pages, and link acquisition targeting commercial and informational keywords.' },
  { step: '06', title: 'Monitor & Report', desc: 'Monthly reporting - organic revenue, keyword rankings, Core Web Vitals, crawl health, and conversion rate by channel.' },
];

const WHY = [
  { title: 'WooCommerce-Specific Expertise', desc: 'We know every WooCommerce SEO issue - from faceted navigation crawl waste to plugin conflicts that silently duplicate metadata across your catalogue.' },
  { title: 'WordPress & WooCommerce Combined', desc: 'WooCommerce SEO requires both WordPress SEO knowledge and ecommerce SEO strategy. Our team covers both - no handoffs or knowledge gaps between disciplines.' },
  { title: 'Revenue Attribution Included', desc: 'We connect WooCommerce organic traffic to revenue using GA4 ecommerce tracking - every monthly report shows organic sales, average order value, and conversion rate.' },
  { title: 'Scalable Processes', desc: 'From 50-product stores to 100,000+ SKU catalogues, we build scalable meta templates and optimisation workflows that maintain quality at every catalogue size.' },
  { title: 'Plugin Stack Optimisation', desc: 'We audit your plugin stack for SEO conflicts and performance impact - and configure the right combination of SEO plugins, caching, and image optimisation tools.' },
  { title: 'Proven WooCommerce Results', desc: '400+ WooCommerce stores optimised. Average 320% organic traffic increase over 12 months, with documented revenue attribution across our client base.' },
];

const FAQS = [
  { q: 'What are the most common WooCommerce SEO problems?', a: 'The most frequent WooCommerce SEO issues are: (1) Faceted navigation creating thousands of crawlable filter URLs - wasting crawl budget on low-value pages; (2) Products in multiple categories creating duplicate content; (3) Thin category pages with only a product grid and no unique content; (4) Plugin conflicts creating duplicate metadata or slowing page load; (5) Unoptimised product descriptions using manufacturer copy. We address all of these in our standard WooCommerce SEO engagement.' },
  { q: 'Should I use Yoast SEO or Rank Math for WooCommerce?', a: 'Both are strong options. Yoast SEO offers a dedicated WooCommerce SEO premium add-on that handles product breadcrumbs, carousel schema, and product review schema. Rank Math handles WooCommerce schema natively in the free version and is more flexible for custom schema configurations. We are proficient in both and configure whichever suits your existing setup - avoiding plugin migration risks when you already have one installed.' },
  { q: 'How do you handle faceted navigation SEO in WooCommerce?', a: 'WooCommerce faceted navigation (product filters for colour, size, price, etc.) creates URLs for every filter combination. The correct SEO approach depends on which filter combinations have commercial search intent and traffic potential. High-volume filter combinations (e.g., /product-category/dresses/colour/red/) may warrant indexation. Low-value combinations should be canonicalised or set to noindex. We map this out per store before implementing - preserving UX while eliminating crawl waste.' },
  { q: 'How do you fix WooCommerce duplicate content?', a: 'WooCommerce duplicate content typically comes from: products in multiple categories creating multiple accessible URLs; the shop page and category pages showing the same products; and tag/attribute archives duplicating category content. Fixes include: canonical tags on duplicate product URLs; consolidating product taxonomy to reduce duplication; robots noindex on low-value attribute pages; and ensuring each category has enough unique content to justify indexation.' },
  { q: 'Can you optimise WooCommerce product descriptions at scale?', a: 'Yes. For catalogues with hundreds or thousands of products, we use a tiered approach: (1) Immediate manual optimisation for your top 20% of revenue-generating products; (2) Template-based improvements for mid-tier products; (3) Automated quality scoring to identify the worst short/duplicate descriptions for prioritisation. We do not use AI-generated content that simply paraphrases manufacturer copy - every product description is written to provide genuine value to a buyer with purchase intent.' },
  { q: 'What impact does WooCommerce page speed have on SEO?', a: 'Core Web Vitals (LCP, CLS, INP) are confirmed Google ranking factors. Slow WooCommerce stores - particularly those with many plugins, large unoptimised product images, and no caching - consistently rank below faster competitors for equivalent keyword targets. We prioritise Core Web Vitals fixes early in our engagement because the ranking impact is often faster and more predictable than content or link building improvements.' },
  { q: 'Do you handle WooCommerce SEO for subscription-based stores?', a: 'Yes. WooCommerce Subscriptions stores have specific SEO considerations around product page content (clearly communicating the subscription model), FAQ schema for subscription terms, and retention-focused content strategy. We have optimised SEO for WooCommerce subscription boxes, SaaS billing through WooCommerce, and membership-based ecommerce stores.' },
  { q: 'How do you measure the ROI of WooCommerce SEO?', a: 'We configure GA4 ecommerce tracking to attribute revenue to organic search specifically - not just traffic. Monthly reports show: organic revenue and transactions; organic conversion rate vs other channels; average order value from organic; and top-performing organic landing pages by revenue. We also track keyword ranking movements for your highest-revenue product and category pages to show the relationship between SEO improvements and sales outcomes.' },
];

export default function WoocommerceSeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);

  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);

  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'WooCommerce SEO', item: 'https://www.1solutions.biz/woocommerce-seo-services/' }] }, { '@type': 'Service', name: 'WooCommerce SEO Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'WooCommerce SEO', url: 'https://www.1solutions.biz/woocommerce-seo-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };

  return (
    <>
      <Head>
        <title>WooCommerce SEO Services | 1Solutions</title>
        <meta name="description" content="WooCommerce SEO services - fix faceted navigation, duplicate content, and slow page load. Specialist WooCommerce SEO that drives organic revenue for" />
        <meta name="keywords" content="woocommerce seo services, woocommerce seo agency, woocommerce seo company, woocommerce technical seo, wordpress ecommerce seo" />
        <link rel="canonical" href="https://www.1solutions.biz/woocommerce-seo-services/" />
        <meta property="og:title" content="WooCommerce SEO Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/woocommerce-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .wcseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .wcseo-page *,.wcseo-page *::before,.wcseo-page *::after{box-sizing:border-box}
          .wcseo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}.wcseo-bc a:hover{color:#7E22CE}.wcseo-bc span{color:#d1d5db}
          .wcseo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#7E22CE;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(126,34,206,0.28)}
          .wcseo-btn-p:hover{background:#6D28D9;box-shadow:0 8px 32px rgba(126,34,206,0.38);transform:translateY(-2px)}
          .wcseo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .wcseo-btn-s:hover{border-color:#7E22CE;color:#7E22CE;transform:translateY(-2px)}
          .wcseo-svc{background:#f8fafd;padding:80px 40px}.wcseo-svc-in{max-width:1280px;margin:0 auto}
          .wcseo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7E22CE;margin-bottom:10px;display:block}
          .wcseo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .wcseo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .wcseo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .wcseo-card{background:linear-gradient(135deg,rgba(250,245,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(109,40,217,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .wcseo-card.visible{opacity:1;transform:translateY(0)}.wcseo-card:hover{transform:translateY(-6px);border-color:rgba(109,40,217,0.22);box-shadow:0 16px 48px rgba(109,40,217,0.09)}
          .wcseo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#7E22CE;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .wcseo-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .wcseo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .wcseo-plug{background:linear-gradient(135deg,#3B0764 0%,#7E22CE 100%);padding:60px 40px}
          .wcseo-plug-in{max-width:1280px;margin:0 auto;text-align:center}
          .wcseo-plug h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .wcseo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .wcseo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .wcseo-proc{background:linear-gradient(135deg,#faf5ff 0%,#fdf4ff 50%,#ede9fe 100%);padding:80px 40px}
          .wcseo-proc-in{max-width:900px;margin:0 auto}
          .wcseo-steps{display:flex;flex-direction:column;margin-top:44px}
          .wcseo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(109,40,217,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .wcseo-step:last-child{border-bottom:none}.wcseo-step.visible{opacity:1;transform:translateX(0)}
          .wcseo-snum{font-size:3rem;font-weight:900;color:rgba(109,40,217,0.15);line-height:1;letter-spacing:-2px}
          .wcseo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .wcseo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .wcseo-why{background:#fff;padding:80px 40px}.wcseo-why-in{max-width:1280px;margin:0 auto}
          .wcseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .wcseo-wcard{background:linear-gradient(135deg,#faf5ff 0%,#fff 60%,#ede9fe 100%);border:1px solid rgba(109,40,217,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .wcseo-wcard.visible{opacity:1;transform:translateY(0)}.wcseo-wcard:hover{border-color:rgba(109,40,217,0.20);box-shadow:0 8px 32px rgba(109,40,217,0.07)}
          .wcseo-dot{width:8px;height:8px;border-radius:50%;background:#7E22CE;margin-bottom:16px}
          .wcseo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .wcseo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .wcseo-faq{background:#f8fafd;padding:80px 40px}.wcseo-faq-in{max-width:860px;margin:0 auto}
          .wcseo-fitem{border-bottom:1px solid #e5e7eb}
          .wcseo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .wcseo-fq:hover{color:#7E22CE}
          .wcseo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .wcseo-fitem.open .wcseo-ficon{border-color:#7E22CE;color:#7E22CE;background:rgba(109,40,217,0.06)}
          .wcseo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .wcseo-fitem.open .wcseo-fa{max-height:500px;padding-bottom:22px}
          .wcseo-cta{background:linear-gradient(135deg,rgba(109,40,217,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(59,7,100,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .wcseo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(109,40,217,0.10) 0%,transparent 70%);pointer-events:none}
          .wcseo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(126,34,206,0.08) 0%,transparent 70%);pointer-events:none}
          .wcseo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .wcseo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .wcseo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .wcseo-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.wcseo-grid{grid-template-columns:repeat(2,1fr)}.wcseo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.wcseo-svc,.wcseo-plug,.wcseo-proc,.wcseo-why,.wcseo-faq,.wcseo-cta{padding:60px 24px}.wcseo-grid{grid-template-columns:1fr}.wcseo-why-grid{grid-template-columns:1fr}.wcseo-step{grid-template-columns:56px 1fr}}
        
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>
      <div className="wcseo-page">
        <ServiceHero
          eyebrow="WordPress · WooCommerce · Revenue-Focused"
          title={<>WooCommerce SEO Services That <AuroraText>Drive Organic Revenue</AuroraText></>}
          subtext="Fix faceted navigation, resolve duplicate content, and optimise every product and category page - specialist WooCommerce SEO that connects organic rankings directly to your store's revenue."
          primaryCta={{ label: 'Get a Free WooCommerce SEO Audit', href: '/contact-us/' }}
          secondaryCta={{ label: 'WooCommerce Development', href: '/woocommerce-development-company/' }}
          stats={[
            { label: 'WooCommerce Stores Optimised', value: '400', suffix: '+' },
            { label: 'Years Experience', value: '15', suffix: '+' },
            { label: 'Avg Organic Traffic Lift', value: '320', prefix: '+', suffix: '%' },
            { label: 'Client Retention', value: '95', suffix: '%' },
          ]}
        />
        <section className="wcseo-svc"><div className="wcseo-svc-in">
          <span className="wcseo-ey2">What We Do</span><h2 className="wcseo-ttl">WooCommerce SEO Services</h2>
          <p className="wcseo-desc">From fixing structural issues to building long-term organic authority - every WooCommerce SEO layer handled by specialists who know WordPress and ecommerce.</p>
          <div className="wcseo-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`wcseo-card${visibleCards.includes(i)?' visible':''}`}><div className="wcseo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="wcseo-plug"><div className="wcseo-plug-in">
          <h2>Plugins &amp; Tools We Work With</h2>
          <div className="wcseo-pills">{PLUGINS.map(c => <span key={c} className="wcseo-pill">{c}</span>)}</div>
        </div></section>
        <section className="wcseo-proc"><div className="wcseo-proc-in">
          <span className="wcseo-ey2">How We Work</span><h2 className="wcseo-ttl">Our WooCommerce SEO Process</h2>
          <p className="wcseo-desc">Technical fixes first, then product, category, and content optimisation - with monthly revenue attribution reporting throughout.</p>
          <div className="wcseo-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`wcseo-step${visibleSteps.includes(i)?' visible':''}`}><div className="wcseo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="wcseo-why"><div className="wcseo-why-in">
          <span className="wcseo-ey2">Why 1Solutions</span><h2 className="wcseo-ttl">WooCommerce SEO Specialists</h2>
          <p className="wcseo-desc">WooCommerce expertise, revenue attribution, and scalable processes for stores of any size - from 50 products to 100,000+ SKUs.</p>
          <div className="wcseo-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`wcseo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="wcseo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="wcseo-faq"><div className="wcseo-faq-in">
          <span className="wcseo-ey2">Got Questions?</span><h2 className="wcseo-ttl">WooCommerce SEO FAQs</h2>
          <p className="wcseo-desc">Answers to common questions about WooCommerce SEO.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`wcseo-fitem${openFaq===i?' open':''}`}><button className="wcseo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="wcseo-ficon">{openFaq===i?'−':'+'}</span></button><div className="wcseo-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="wcseo-cta"><div className="wcseo-cta-o1"/><div className="wcseo-cta-o2"/>
          <div className="wcseo-cta-in">
            <span className="wcseo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Grow Your WooCommerce Revenue?</span>
            <h2 className="wcseo-cta-t">Get Your Free WooCommerce SEO Audit</h2>
            <p className="wcseo-cta-s">We&rsquo;ll audit your store&rsquo;s faceted navigation, duplicate content, product page quality, and keyword gaps - free, with a prioritised action plan.</p>
            <div className="wcseo-cta-btns">
              <Link href="/contact-us/" className="wcseo-btn-p">Get Free WooCommerce SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/ecommerce-seo-services/" className="wcseo-btn-s">Ecommerce SEO Services</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
