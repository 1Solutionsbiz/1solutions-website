import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Wix Technical SEO Audit', desc: 'Full audit of your Wix site — indexation settings, URL structure, canonical tags, sitemap quality, robots.txt, mobile performance, Core Web Vitals, and Wix-specific SEO limitations.' },
  { n: '02', title: 'Wix SEO Setup & Configuration', desc: 'Complete Wix SEO settings configuration — site verification, Google Search Console and Analytics connection, XML sitemap submission, structured data, and Wix SEO Wiz review.' },
  { n: '03', title: 'On-Page SEO Optimisation', desc: 'Title tags, meta descriptions, heading structure (H1–H3), alt text, keyword targeting, and URL slug optimisation for every key page on your Wix site.' },
  { n: '04', title: 'Wix Page Speed Improvement', desc: 'Image compression, lazy loading configuration, font loading optimisation, and Wix-compatible speed improvements to improve Core Web Vitals and user experience.' },
  { n: '05', title: 'Wix Schema Markup', desc: 'Structured data implementation for LocalBusiness, Article, FAQ, Product, and Service schema — using Wix\'s native structured data tools and custom JSON-LD where needed.' },
  { n: '06', title: 'Wix Blog SEO', desc: 'Blog post keyword targeting, meta optimisation, internal linking strategy, category structure, and content calendar to build topical authority through Wix blog content.' },
  { n: '07', title: 'Local SEO for Wix', desc: 'Google Business Profile optimisation, local keyword targeting, NAP consistency, local citations, and review strategy for Wix sites targeting local customers.' },
  { n: '08', title: 'Wix Link Building', desc: 'Domain authority building through relevant link acquisition — local directories, industry sites, digital PR, and competitor link gap analysis for Wix site rankings.' },
];

const FEATURES = ['Wix Editor', 'Wix Studio', 'Editor X', 'Wix SEO Wiz', 'Wix Analytics', 'Wix Stores', 'Wix Blog', 'Wix Bookings', 'Wix Restaurant', 'Google Search Console'];

const PROCESS = [
  { step: '01', title: 'Wix SEO Audit', desc: 'Full crawl using Screaming Frog, GSC data analysis, Core Web Vitals assessment, on-page audit, and keyword ranking baseline.' },
  { step: '02', title: 'Technical Setup', desc: 'Google Search Console verification, sitemap submission, robots.txt review, canonical tag setup, and schema markup configuration.' },
  { step: '03', title: 'On-Page Optimisation', desc: 'Title tags, meta descriptions, headings, alt text, URL slugs, and internal link structure across all key pages.' },
  { step: '04', title: 'Content Strategy', desc: 'Keyword research, page content improvement, blog content calendar, and FAQ content for featured snippet opportunities.' },
  { step: '05', title: 'Local SEO', desc: 'Google Business Profile optimisation, citation building, and local keyword strategy if relevant to your business.' },
  { step: '06', title: 'Monitor & Report', desc: 'Monthly keyword movement, organic traffic, GSC performance, and Core Web Vitals trend reporting.' },
];

const WHY = [
  { title: 'Wix Platform Experience', desc: 'We know the SEO capabilities and limitations of Wix — what can be configured in-platform, what requires workarounds, and what needs to be handled via Google Search Console.' },
  { title: 'Realistic Expectations', desc: 'We are honest about what Wix SEO can achieve. For most local service businesses and SMBs, Wix can rank effectively. We tell you upfront if your goals require a platform migration.' },
  { title: 'Local SEO Focus', desc: 'Many Wix sites are local service businesses. Our local SEO expertise — Google Business Profile, citations, review strategy — is built into our Wix SEO service.' },
  { title: 'No Platform Lock-In Advice', desc: 'If migrating from Wix to WordPress or another platform would significantly improve your SEO outcomes, we will tell you — with the data to back the recommendation.' },
  { title: 'GSC & Analytics Integration', desc: 'We ensure your Wix site has proper Google Search Console and GA4 integration — without which you have no visibility into what is actually working.' },
  { title: 'Transparent Monthly Reporting', desc: 'Monthly reports covering keyword rankings, organic traffic, GSC clicks and impressions, and Core Web Vitals trends — in plain English, not SEO jargon.' },
];

const FAQS = [
  { q: 'Can a Wix website rank on Google?', a: 'Yes. Wix sites can rank on Google, and many do — particularly for local service keywords, niche informational content, and less competitive commercial terms. Wix has improved significantly since 2020, adding proper canonical tag control, improved sitemap generation, and structured data tools. The platform still has limitations (URL structure constraints, speed benchmarks lower than custom-built sites) but these are not prohibitive for the majority of SMB use cases.' },
  { q: 'What are the SEO limitations of Wix?', a: 'The main Wix SEO limitations are: (1) URL structure — Wix adds a default /page-name/ structure that cannot always be fully customised; (2) Page speed — Wix sites typically score lower on Core Web Vitals than custom-built WordPress or Next.js sites due to platform overhead; (3) Limited server-side rendering for JavaScript-heavy pages; (4) Less granular control over robots.txt and htaccess than self-hosted platforms. For most local and SMB sites, these limitations do not prevent ranking. For enterprise sites or highly competitive national keywords, we recommend evaluating whether a platform migration would provide meaningful SEO advantage.' },
  { q: 'Is Wix SEO Wiz enough to rank my website?', a: 'Wix SEO Wiz provides a useful starting checklist — GSC connection, basic meta tag setup, and sitemap submission. However, it does not cover keyword research, competitive analysis, content strategy, link building, Core Web Vitals optimisation, structured data, or ongoing monitoring. It is a setup tool, not a strategy. Our service builds on what SEO Wiz initiates and addresses the full ranking picture.' },
  { q: 'Does Wix support structured data / schema markup?', a: 'Yes. Wix supports structured data through its native schema markup tools (for LocalBusiness, Restaurant, Event, Article, and Product types) and allows custom JSON-LD to be injected via the Advanced SEO section. Wix Stores automatically generates Product schema. We review and enhance the native schema and add custom schema types that Wix does not generate automatically — particularly FAQ, BreadcrumbList, and Service schema.' },
  { q: 'How do I improve my Wix site\'s page speed for SEO?', a: 'Wix page speed improvements include: (1) Compressing and resizing images before uploading — Wix does compress images but starting with optimised files helps significantly; (2) Using Wix\'s lazy loading features for off-screen images; (3) Minimising third-party apps (each Wix app adds script weight); (4) Choosing a lightweight Wix template rather than feature-heavy ones; (5) Using system fonts or Wix\'s font service rather than multiple custom fonts. Note that Wix\'s rendering architecture means Core Web Vitals scores will typically be lower than on self-hosted platforms — but for local and SMB keywords, this is rarely a decisive ranking factor.' },
  { q: 'Should I migrate from Wix to WordPress for better SEO?', a: 'Not necessarily. For local service businesses, professional services, and SMBs targeting moderate-competition keywords, a well-optimised Wix site can rank effectively and migration may not provide enough ranking uplift to justify the cost and risk. We assess this honestly by looking at your current rankings, target keywords, and competitors. Where we do recommend migration, we provide a clear business case with traffic and revenue impact projections — not just a general statement that "WordPress is better for SEO."' },
  { q: 'Can you handle SEO for a Wix ecommerce store?', a: 'Yes. Wix Stores has specific SEO considerations — product page meta optimisation, product schema, category page content, and site architecture for ecommerce. Wix Stores is suitable for small-to-medium ecommerce operations. For stores with hundreds of products or competing in highly competitive categories (electronics, fashion), we assess whether Wix Stores can realistically rank for target keywords versus alternatives like WooCommerce or Shopify.' },
  { q: 'Do you offer one-time Wix SEO setup or ongoing monthly SEO?', a: 'Both options are available. A one-time Wix SEO setup includes a full technical audit, on-page optimisation, GSC and Analytics configuration, schema markup, and a keyword and content strategy document. Ongoing monthly SEO adds link building, content creation, monitoring, and reporting — compounding organic growth over time. We recommend at least a 6-month engagement for meaningful organic traffic growth, but offer one-time setup for businesses that want to self-manage after an initial professional optimisation.' },
];

const STATS = [
  { label: 'Wix Sites Optimised', val: '200+' },
  { label: 'Years Experience', val: '10+' },
  { label: 'Avg Organic Traffic Lift', val: '+160%' },
  { label: 'Client Retention', val: '90%' },
];

export default function WixSeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);

  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);

  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Wix SEO', item: 'https://www.1solutions.biz/wix-seo-services/' }] }, { '@type': 'Service', name: 'Wix SEO Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Wix SEO', url: 'https://www.1solutions.biz/wix-seo-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };

  return (
    <>
      <Head>
        <title>Wix SEO Services | Wix Website SEO Specialists | 1Solutions</title>
        <meta name="description" content="Wix SEO services that get your Wix website ranking on Google. Technical setup, on-page optimisation, local SEO, and content strategy from Wix SEO specialists." />
        <meta name="keywords" content="wix seo services, wix seo agency, wix website seo, wix seo company, wix seo expert, wix local seo" />
        <link rel="canonical" href="https://www.1solutions.biz/wix-seo-services/" />
        <meta property="og:title" content="Wix SEO Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/wix-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .wixs-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .wixs-page *,.wixs-page *::before,.wixs-page *::after{box-sizing:border-box}
          .wixs-hero{background:linear-gradient(135deg,#fffbeb 0%,#fef3c7 25%,#fde68a 40%,#fffdf0 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .wixs-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(180,83,9,0.11) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .wixs-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .wixs-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .wixs-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .wixs-bc a{color:#6b7280;text-decoration:none}.wixs-bc a:hover{color:#B45309}.wixs-bc span{color:#d1d5db}
          .wixs-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(180,83,9,0.08);border:1px solid rgba(180,83,9,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#92400E;margin-bottom:28px}
          .wixs-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#78350F 0%,#B45309 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .wixs-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .wixs-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .wixs-btn-p{display:inline-flex;align-items:center;gap:8px;background:#B45309;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(180,83,9,0.28)}
          .wixs-btn-p:hover{background:#92400E;box-shadow:0 8px 32px rgba(180,83,9,0.38);transform:translateY(-2px)}
          .wixs-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .wixs-btn-s:hover{border-color:#B45309;color:#B45309;transform:translateY(-2px)}
          .wixs-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(180,83,9,0.07)}
          .wixs-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(180,83,9,0.08)}.wixs-stat:last-child{border-right:none}
          .wixs-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .wixs-stat-v{font-size:1.6rem;font-weight:900;color:#B45309;letter-spacing:-0.5px}
          .wixs-svc{background:#f8fafd;padding:80px 40px}.wixs-svc-in{max-width:1280px;margin:0 auto}
          .wixs-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#B45309;margin-bottom:10px;display:block}
          .wixs-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#78350F 0%,#B45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .wixs-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .wixs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .wixs-card{background:linear-gradient(135deg,rgba(255,251,235,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(254,243,199,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(180,83,9,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .wixs-card.visible{opacity:1;transform:translateY(0)}.wixs-card:hover{transform:translateY(-6px);border-color:rgba(180,83,9,0.20);box-shadow:0 16px 48px rgba(180,83,9,0.08)}
          .wixs-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#B45309;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .wixs-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .wixs-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .wixs-feat{background:linear-gradient(135deg,#78350F 0%,#B45309 100%);padding:60px 40px}
          .wixs-feat-in{max-width:1280px;margin:0 auto;text-align:center}
          .wixs-feat h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .wixs-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .wixs-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .wixs-proc{background:linear-gradient(135deg,#fffbeb 0%,#fffdf0 50%,#fef3c7 100%);padding:80px 40px}
          .wixs-proc-in{max-width:900px;margin:0 auto}
          .wixs-steps{display:flex;flex-direction:column;margin-top:44px}
          .wixs-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(180,83,9,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .wixs-step:last-child{border-bottom:none}.wixs-step.visible{opacity:1;transform:translateX(0)}
          .wixs-snum{font-size:3rem;font-weight:900;color:rgba(180,83,9,0.15);line-height:1;letter-spacing:-2px}
          .wixs-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .wixs-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .wixs-why{background:#fff;padding:80px 40px}.wixs-why-in{max-width:1280px;margin:0 auto}
          .wixs-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .wixs-wcard{background:linear-gradient(135deg,#fffbeb 0%,#fff 60%,#fef3c7 100%);border:1px solid rgba(180,83,9,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .wixs-wcard.visible{opacity:1;transform:translateY(0)}.wixs-wcard:hover{border-color:rgba(180,83,9,0.18);box-shadow:0 8px 32px rgba(180,83,9,0.07)}
          .wixs-dot{width:8px;height:8px;border-radius:50%;background:#B45309;margin-bottom:16px}
          .wixs-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .wixs-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .wixs-faq{background:#f8fafd;padding:80px 40px}.wixs-faq-in{max-width:860px;margin:0 auto}
          .wixs-fitem{border-bottom:1px solid #e5e7eb}
          .wixs-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .wixs-fq:hover{color:#B45309}
          .wixs-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .wixs-fitem.open .wixs-ficon{border-color:#B45309;color:#B45309;background:rgba(180,83,9,0.06)}
          .wixs-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .wixs-fitem.open .wixs-fa{max-height:500px;padding-bottom:22px}
          .wixs-cta{background:linear-gradient(135deg,rgba(180,83,9,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(120,53,15,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .wixs-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(180,83,9,0.10) 0%,transparent 70%);pointer-events:none}
          .wixs-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(120,53,15,0.08) 0%,transparent 70%);pointer-events:none}
          .wixs-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .wixs-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#78350F 0%,#B45309 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .wixs-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .wixs-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.wixs-grid{grid-template-columns:repeat(2,1fr)}.wixs-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.wixs-hero,.wixs-svc,.wixs-feat,.wixs-proc,.wixs-why,.wixs-faq,.wixs-cta{padding:60px 24px}.wixs-hero{padding-top:60px;padding-bottom:0}.wixs-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.wixs-stat:nth-child(2){border-right:none}.wixs-grid{grid-template-columns:1fr}.wixs-why-grid{grid-template-columns:1fr}.wixs-step{grid-template-columns:56px 1fr}.wixs-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="wixs-page">
        <section className="wixs-hero"><div className="wixs-o1"/><div className="wixs-o2"/>
          <div className="wixs-in">
            <nav className="wixs-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO Services</Link><span>/</span><span style={{color:'#B45309'}}>Wix SEO</span></nav>
            <span className="wixs-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#B45309',display:'inline-block'}}/> Wix Editor · Wix Studio · Wix Stores</span>
            <h1 className="wixs-h1">Wix SEO Services That Get Your Website Ranking on Google</h1>
            <p className="wixs-sub">Technical setup, on-page optimisation, local SEO, and content strategy — specialist SEO for Wix websites that drives real organic traffic, not just impressions.</p>
            <div className="wixs-btns">
              <Link href="/contact-us" className="wixs-btn-p">Get a Free Wix SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/local-seo-services/" className="wixs-btn-s">Local SEO Services</Link>
            </div>
            <div className="wixs-stats">{STATS.map(s => <div key={s.label} className="wixs-stat"><div className="wixs-stat-l">{s.label}</div><div className="wixs-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="wixs-svc"><div className="wixs-svc-in">
          <span className="wixs-ey2">What We Do</span><h2 className="wixs-ttl">Wix SEO Services</h2>
          <p className="wixs-desc">Every SEO layer your Wix site needs — from technical configuration to content strategy — handled by specialists who know the platform&rsquo;s capabilities and limitations.</p>
          <div className="wixs-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`wixs-card${visibleCards.includes(i)?' visible':''}`}><div className="wixs-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="wixs-feat"><div className="wixs-feat-in">
          <h2>Wix Platform Coverage</h2>
          <div className="wixs-pills">{FEATURES.map(c => <span key={c} className="wixs-pill">{c}</span>)}</div>
        </div></section>
        <section className="wixs-proc"><div className="wixs-proc-in">
          <span className="wixs-ey2">How We Work</span><h2 className="wixs-ttl">Our Wix SEO Process</h2>
          <p className="wixs-desc">Audit to optimisation in 6 structured steps — with monthly reporting on keyword movements and organic traffic throughout.</p>
          <div className="wixs-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`wixs-step${visibleSteps.includes(i)?' visible':''}`}><div className="wixs-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="wixs-why"><div className="wixs-why-in">
          <span className="wixs-ey2">Why 1Solutions</span><h2 className="wixs-ttl">Honest Wix SEO — No Overpromising</h2>
          <p className="wixs-desc">We know what Wix can and cannot do for SEO. We set realistic expectations, deliver measurable results, and tell you when a platform change would make strategic sense.</p>
          <div className="wixs-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`wixs-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="wixs-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="wixs-faq"><div className="wixs-faq-in">
          <span className="wixs-ey2">Got Questions?</span><h2 className="wixs-ttl">Wix SEO FAQs</h2>
          <p className="wixs-desc">Honest answers to the most common questions about SEO for Wix websites.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`wixs-fitem${openFaq===i?' open':''}`}><button className="wixs-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="wixs-ficon">{openFaq===i?'−':'+'}</span></button><div className="wixs-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="wixs-cta"><div className="wixs-cta-o1"/><div className="wixs-cta-o2"/>
          <div className="wixs-cta-in">
            <span className="wixs-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Rank Your Wix Website?</span>
            <h2 className="wixs-cta-t">Get Your Free Wix SEO Audit</h2>
            <p className="wixs-cta-s">We&rsquo;ll review your Wix site&rsquo;s technical setup, on-page quality, local signals, and keyword rankings — and send you a prioritised action plan free.</p>
            <div className="wixs-cta-btns">
              <Link href="/contact-us" className="wixs-btn-p">Get Free Wix SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/affordable-seo-packages" className="wixs-btn-s">View SEO Packages</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
