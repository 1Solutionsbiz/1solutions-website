import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'WordPress Technical SEO Audit', desc: 'Complete audit of your WordPress site — crawlability, indexation, Core Web Vitals, URL structure, canonical tags, redirect chains, and plugin conflicts affecting rankings.' },
  { n: '02', title: 'Yoast & Rank Math Configuration', desc: 'Expert setup of Yoast SEO or Rank Math — XML sitemaps, breadcrumbs, Open Graph, schema markup, robots directives, and Search Console integration.' },
  { n: '03', title: 'WordPress Core Web Vitals', desc: 'LCP, CLS, and INP optimisation — image compression, lazy loading, caching (WP Rocket, W3 Total Cache), CDN configuration, and render-blocking resource elimination.' },
  { n: '04', title: 'WordPress On-Page Optimisation', desc: 'Title tags, meta descriptions, heading hierarchy, keyword targeting, internal link architecture, and content structure across all key pages and post types.' },
  { n: '05', title: 'WordPress Schema Markup', desc: 'Custom schema implementation for Article, LocalBusiness, FAQ, BreadcrumbList, Product, and Review types — beyond what default plugin settings provide.' },
  { n: '06', title: 'WordPress Plugin Audit', desc: 'Identify plugins that conflict with SEO, slow your site, duplicate metadata, or generate canonical issues — and replace or reconfigure for clean technical health.' },
  { n: '07', title: 'WordPress Content Strategy', desc: 'Keyword research, topical gap analysis, content calendar, and on-page briefs tailored to WordPress — including category, tag, and archive page optimisation.' },
  { n: '08', title: 'WordPress Security & Speed', desc: 'Security hardening, malware scan, broken link cleanup, database optimisation, and server configuration improvements that directly support crawlability and speed scores.' },
];

const PLUGINS = ['Yoast SEO', 'Rank Math', 'WP Rocket', 'W3 Total Cache', 'Elementor', 'WooCommerce', 'Imagify', 'ShortPixel', 'Cloudflare', 'Wordfence', 'GeneratePress', 'Divi'];

const PROCESS = [
  { step: '01', title: 'WordPress SEO Audit', desc: 'Full site crawl, GSC data review, plugin conflict analysis, Core Web Vitals scores, and keyword ranking baseline.' },
  { step: '02', title: 'Technical Fixes', desc: 'We fix crawl errors, canonical issues, plugin conflicts, sitemap problems, and speed issues — with developer-ready specifications.' },
  { step: '03', title: 'Plugin Configuration', desc: 'Yoast or Rank Math setup, schema templates, Open Graph configuration, and robots.txt optimisation.' },
  { step: '04', title: 'On-Page Optimisation', desc: 'Title tags, meta descriptions, heading structure, internal links, and image alt text across priority pages.' },
  { step: '05', title: 'Content & Keywords', desc: 'Content gap analysis, new page briefs, category/tag page optimisation, and blog content strategy.' },
  { step: '06', title: 'Monitor & Report', desc: 'Monthly WordPress SEO report — keyword movements, Core Web Vitals trends, crawl health, and traffic attribution.' },
];

const WHY = [
  { title: 'WordPress-Only Expertise', desc: 'We know every common WordPress SEO issue — from duplicate archive pages to Elementor rendering delays — and have documented fixes for all of them.' },
  { title: 'Plugin-Aware Optimisation', desc: 'We work with your existing plugin stack, not against it. We know which plugins conflict, which slow your site, and which add SEO value.' },
  { title: 'WooCommerce SEO Included', desc: 'If your WordPress site runs WooCommerce, our team handles the additional product, category, and faceted navigation SEO requirements automatically.' },
  { title: 'Developer-Ready Specs', desc: 'Every technical recommendation comes with exact code, settings screenshots, or WP admin path — no ambiguous "fix this" instructions.' },
  { title: 'No Black-Box Tools', desc: 'We share our Screaming Frog crawls, GSC data exports, and ranking reports with you directly — full transparency into what we find and fix.' },
  { title: 'Proven WordPress Results', desc: '800+ WordPress sites optimised across 15+ years. From personal blogs to enterprise WordPress multisite networks with 50+ sites.' },
];

const FAQS = [
  { q: 'Do I need Yoast SEO or is Rank Math better?', a: 'Both are strong plugins and the best choice depends on your site. Yoast SEO has a longer track record and is slightly more conservative — good for large editorial sites. Rank Math has more built-in features at no cost and handles schema more flexibly — good for business and ecommerce sites. We are certified in both and configure whichever suits your setup best. If you already have one installed with existing settings, we optimise that rather than migrate.' },
  { q: 'Why is my WordPress site slow and how does it affect SEO?', a: 'WordPress sites slow down due to unoptimised images, too many plugins, no caching, poor hosting, render-blocking scripts, and large page builders (Elementor, Divi). Core Web Vitals — LCP, CLS, INP — are confirmed Google ranking factors. We audit your specific bottlenecks using PageSpeed Insights and Chrome DevTools, and implement targeted fixes rather than generic speed tips.' },
  { q: 'Can you fix the duplicate content problems WordPress creates?', a: 'Yes. WordPress creates duplicate content risks through category/tag/author/date archives, paginated archives, ?replytocom URL parameters, and the homepage vs /page/1/. We configure canonical tags, adjust robots directives for archive pages, and suppress parameter URLs from indexation — eliminating duplicate content signals without removing useful pages.' },
  { q: 'Will SEO work affect my WordPress theme or page builder?', a: 'Most SEO changes — meta tags, schema, canonical tags, robots directives — are handled by SEO plugins and do not touch your theme. Speed optimisations may require theme or page builder changes (e.g., converting Elementor CSS to external files, replacing Google Fonts with system fonts). We always document changes, stage test where possible, and provide rollback instructions.' },
  { q: 'How do you handle WordPress multisite SEO?', a: 'WordPress multisite networks need site-by-site canonical configuration, separate GSC properties for each subsite or subdomain, unified XML sitemap management, and careful internal linking strategy to avoid cross-site content cannibalisation. We have managed multisite SEO for publishers, franchise networks, and multi-brand portfolios.' },
  { q: 'Do you handle link building for WordPress sites?', a: 'Yes. Our WordPress SEO packages can include link building — digital PR, niche edits, guest posts, and resource link acquisition. Link building is scoped separately based on your domain authority, industry, and target keyword competitiveness. We include a link gap analysis comparing your backlink profile to top-ranking competitors in your initial audit.' },
  { q: 'How long before I see results from WordPress SEO?', a: 'Technical fixes typically show crawl and indexation improvements within 2 to 4 weeks. Keyword ranking improvements for existing pages usually appear within 6 to 12 weeks of on-page optimisation. New content can take 3 to 6 months to rank competitively depending on keyword difficulty. We show you baseline metrics from week one so progress is visible and attributable from the start.' },
  { q: 'What if my WordPress site was penalised by Google?', a: 'We diagnose whether the traffic drop is algorithmic (Core update, Helpful Content), manual (Google Search Console manual action), or technical (accidental noindex, migration issue). For manual penalties, we audit the cause, clean up the violation, and submit a reconsideration request. For algorithmic recoveries, we rebuild E-E-A-T signals, remove thin content, and improve content quality at scale.' },
];

const STATS = [
  { label: 'WordPress Sites Optimised', val: '800+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Avg Organic Traffic Lift', val: '+240%' },
  { label: 'Client Retention', val: '95%' },
];

export default function WordPressSeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null);
  const stepRefs = useRef([]);
  const whyRef = useRef(null);

  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);

  const A = '#0073AA', D = '#005177';
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'WordPress SEO', item: 'https://www.1solutions.biz/wordpress-seo-services/' }] }, { '@type': 'Service', name: 'WordPress SEO Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'WordPress SEO', url: 'https://www.1solutions.biz/wordpress-seo-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };

  return (
    <>
      <Head>
        <title>WordPress SEO Services | Yoast, Rank Math & Core Web Vitals Experts | 1Solutions</title>
        <meta name="description" content="Expert WordPress SEO services — technical audits, Yoast/Rank Math setup, Core Web Vitals, plugin optimisation, and content strategy to grow organic traffic." />
        <meta name="keywords" content="wordpress seo services, wordpress seo agency, wordpress seo company, wordpress technical seo, yoast seo setup, rank math configuration" />
        <link rel="canonical" href="https://www.1solutions.biz/wordpress-seo-services/" />
        <meta property="og:title" content="WordPress SEO Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/wordpress-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .wpseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .wpseo-page *,.wpseo-page *::before,.wpseo-page *::after{box-sizing:border-box}
          .wpseo-hero{background:linear-gradient(135deg,#eff8ff 0%,#dbeeff 25%,#e8f4fd 60%,#f0f9ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .wpseo-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(0,115,170,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .wpseo-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(0,81,119,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .wpseo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .wpseo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .wpseo-bc a{color:#6b7280;text-decoration:none}.wpseo-bc a:hover{color:#0073AA}.wpseo-bc span{color:#d1d5db}
          .wpseo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(0,115,170,0.08);border:1px solid rgba(0,115,170,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#005177;margin-bottom:28px}
          .wpseo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#003D5C 0%,#0073AA 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .wpseo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .wpseo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .wpseo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#0073AA;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(0,115,170,0.28)}
          .wpseo-btn-p:hover{background:#005177;box-shadow:0 8px 32px rgba(0,115,170,0.38);transform:translateY(-2px)}
          .wpseo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .wpseo-btn-s:hover{border-color:#0073AA;color:#0073AA;transform:translateY(-2px)}
          .wpseo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(0,115,170,0.08)}
          .wpseo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(0,115,170,0.08)}.wpseo-stat:last-child{border-right:none}
          .wpseo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .wpseo-stat-v{font-size:1.6rem;font-weight:900;color:#0073AA;letter-spacing:-0.5px}
          .wpseo-svc{background:#f8fafd;padding:80px 40px}.wpseo-svc-in{max-width:1280px;margin:0 auto}
          .wpseo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0073AA;margin-bottom:10px;display:block}
          .wpseo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#003D5C 0%,#0073AA 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .wpseo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .wpseo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .wpseo-card{background:linear-gradient(135deg,rgba(239,248,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(219,238,255,0.40) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(0,115,170,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s,border-color 0.22s}
          .wpseo-card.visible{opacity:1;transform:translateY(0)}.wpseo-card:hover{transform:translateY(-6px);border-color:rgba(0,115,170,0.25);box-shadow:0 16px 48px rgba(0,115,170,0.10)}
          .wpseo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0073AA;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .wpseo-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .wpseo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .wpseo-plug{background:linear-gradient(135deg,#003D5C 0%,#0073AA 100%);padding:60px 40px}
          .wpseo-plug-in{max-width:1280px;margin:0 auto;text-align:center}
          .wpseo-plug h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .wpseo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .wpseo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .wpseo-proc{background:linear-gradient(135deg,#eff8ff 0%,#f0f9ff 50%,#e8f4fd 100%);padding:80px 40px}
          .wpseo-proc-in{max-width:900px;margin:0 auto}
          .wpseo-steps{display:flex;flex-direction:column;margin-top:44px}
          .wpseo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(0,115,170,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .wpseo-step:last-child{border-bottom:none}.wpseo-step.visible{opacity:1;transform:translateX(0)}
          .wpseo-snum{font-size:3rem;font-weight:900;color:rgba(0,115,170,0.15);line-height:1;letter-spacing:-2px}
          .wpseo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .wpseo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .wpseo-why{background:#fff;padding:80px 40px}.wpseo-why-in{max-width:1280px;margin:0 auto}
          .wpseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .wpseo-wcard{background:linear-gradient(135deg,#eff8ff 0%,#fff 60%,#e8f4fd 100%);border:1px solid rgba(0,115,170,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .wpseo-wcard.visible{opacity:1;transform:translateY(0)}.wpseo-wcard:hover{border-color:rgba(0,115,170,0.22);box-shadow:0 8px 32px rgba(0,115,170,0.07)}
          .wpseo-dot{width:8px;height:8px;border-radius:50%;background:#0073AA;margin-bottom:16px}
          .wpseo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .wpseo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .wpseo-faq{background:#f8fafd;padding:80px 40px}.wpseo-faq-in{max-width:860px;margin:0 auto}
          .wpseo-fitem{border-bottom:1px solid #e5e7eb}
          .wpseo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .wpseo-fq:hover{color:#0073AA}
          .wpseo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .wpseo-fitem.open .wpseo-ficon{border-color:#0073AA;color:#0073AA;background:rgba(0,115,170,0.06)}
          .wpseo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .wpseo-fitem.open .wpseo-fa{max-height:500px;padding-bottom:22px}
          .wpseo-cta{background:linear-gradient(135deg,rgba(0,115,170,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(0,61,92,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .wpseo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(0,115,170,0.10) 0%,transparent 70%);pointer-events:none}
          .wpseo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(0,81,119,0.08) 0%,transparent 70%);pointer-events:none}
          .wpseo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .wpseo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#003D5C 0%,#0073AA 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .wpseo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .wpseo-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.wpseo-grid{grid-template-columns:repeat(2,1fr)}.wpseo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.wpseo-hero,.wpseo-svc,.wpseo-plug,.wpseo-proc,.wpseo-why,.wpseo-faq,.wpseo-cta{padding:60px 24px}.wpseo-hero{padding-top:60px;padding-bottom:0}.wpseo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.wpseo-stat:nth-child(2){border-right:none}.wpseo-grid{grid-template-columns:1fr}.wpseo-why-grid{grid-template-columns:1fr}.wpseo-step{grid-template-columns:56px 1fr}.wpseo-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="wpseo-page">
        <section className="wpseo-hero">
          <div className="wpseo-o1"/><div className="wpseo-o2"/>
          <div className="wpseo-in">
            <nav className="wpseo-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO Services</Link><span>/</span><span style={{color:'#0073AA'}}>WordPress SEO</span></nav>
            <span className="wpseo-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#0073AA',display:'inline-block'}}/> Yoast · Rank Math · Core Web Vitals</span>
            <h1 className="wpseo-h1">WordPress SEO Services That Grow Organic Traffic</h1>
            <p className="wpseo-sub">Technical audits, plugin configuration, Core Web Vitals optimisation, and content strategy — specialist WordPress SEO that fixes the platform-specific issues holding your site back.</p>
            <div className="wpseo-btns">
              <Link href="/contact-us" className="wpseo-btn-p">Get a Free WordPress SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/wordpress-development-company" className="wpseo-btn-s">WordPress Development</Link>
            </div>
            <div className="wpseo-stats">{STATS.map(s => <div key={s.label} className="wpseo-stat"><div className="wpseo-stat-l">{s.label}</div><div className="wpseo-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="wpseo-svc"><div className="wpseo-svc-in">
          <span className="wpseo-ey2">What We Do</span><h2 className="wpseo-ttl">WordPress SEO Services</h2>
          <p className="wpseo-desc">Every SEO layer of your WordPress site — from plugin configuration to server-level speed — handled by specialists who know the platform inside out.</p>
          <div className="wpseo-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`wpseo-card${visibleCards.includes(i)?' visible':''}`}><div className="wpseo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="wpseo-plug"><div className="wpseo-plug-in">
          <h2>Plugins &amp; Tools We Work With</h2>
          <div className="wpseo-pills">{PLUGINS.map(c => <span key={c} className="wpseo-pill">{c}</span>)}</div>
        </div></section>
        <section className="wpseo-proc"><div className="wpseo-proc-in">
          <span className="wpseo-ey2">How We Work</span><h2 className="wpseo-ttl">Our WordPress SEO Process</h2>
          <p className="wpseo-desc">Audit to optimisation in a structured 6-step programme — fixing platform issues first, then building organic growth month over month.</p>
          <div className="wpseo-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`wpseo-step${visibleSteps.includes(i)?' visible':''}`}><div className="wpseo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="wpseo-why"><div className="wpseo-why-in">
          <span className="wpseo-ey2">Why 1Solutions</span><h2 className="wpseo-ttl">WordPress SEO Specialists — Not Generalists</h2>
          <p className="wpseo-desc">We know every WordPress SEO gotcha — from archive page duplication to page builder render delays — and have documented solutions for all of them.</p>
          <div className="wpseo-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`wpseo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="wpseo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="wpseo-faq"><div className="wpseo-faq-in">
          <span className="wpseo-ey2">Got Questions?</span><h2 className="wpseo-ttl">WordPress SEO FAQs</h2>
          <p className="wpseo-desc">Answers to the most common questions about WordPress SEO.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`wpseo-fitem${openFaq===i?' open':''}`}><button className="wpseo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="wpseo-ficon">{openFaq===i?'−':'+'}</span></button><div className="wpseo-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="wpseo-cta"><div className="wpseo-cta-o1"/><div className="wpseo-cta-o2"/>
          <div className="wpseo-cta-in">
            <span className="wpseo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Grow Your WordPress Traffic?</span>
            <h2 className="wpseo-cta-t">Get Your Free WordPress SEO Audit</h2>
            <p className="wpseo-cta-s">We&rsquo;ll review your WordPress site&rsquo;s technical health, plugin setup, Core Web Vitals, and keyword rankings — and send you a priority action plan free.</p>
            <div className="wpseo-cta-btns">
              <Link href="/contact-us" className="wpseo-btn-p">Get Free WordPress SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/affordable-seo-packages" className="wpseo-btn-s">View SEO Packages</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
