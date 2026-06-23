import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Technical SEO Audit', desc: 'Comprehensive 150-point technical audit — crawlability, indexation, site architecture, canonical tags, hreflang, Core Web Vitals, JavaScript rendering, and security signals.' },
  { n: '02', title: 'Crawl Budget Optimisation', desc: 'Analyse Google\'s crawl patterns through log file analysis, identify crawl waste from parameters, faceted navigation, and thin pages, and redirect Googlebot to your highest-value URLs.' },
  { n: '03', title: 'Core Web Vitals (LCP, CLS, INP)', desc: 'Fix Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint — with developer-ready specifications for your specific tech stack and hosting environment.' },
  { n: '04', title: 'JavaScript SEO', desc: 'Rendering audits for React, Vue, Angular, Next.js, and Nuxt — fixing pre-rendering gaps, dynamic rendering issues, and JavaScript-dependent content that Googlebot cannot index.' },
  { n: '05', title: 'Site Architecture & Internal Linking', desc: 'Flat information architecture design, internal link equity distribution, orphan page identification, and crawl depth analysis to ensure every important page is reachable within 3 clicks.' },
  { n: '06', title: 'Structured Data & Schema', desc: 'Schema markup implementation for all relevant types — Article, Product, FAQ, LocalBusiness, BreadcrumbList, HowTo, Event — validated and deployed at scale via Liquid, GTM, or CMS.' },
  { n: '07', title: 'Duplicate Content Elimination', desc: 'Canonical tag audit, parameter URL management, pagination SEO (rel=prev/next), and URL consolidation to eliminate competing page versions wasting crawl budget and diluting authority.' },
  { n: '08', title: 'International SEO (Hreflang)', desc: 'Hreflang implementation, x-default configuration, ccTLD vs subdirectory vs subdomain strategy, and geo-targeting setup in Google Search Console for international sites.' },
];

const STACK = ['Screaming Frog', 'Sitebulb', 'Botify', 'Log File Analyser', 'Chrome DevTools', 'Lighthouse', 'PageSpeed Insights', 'WebPageTest', 'GSC', 'Cloudflare', 'Next.js', 'Nuxt'];

const PROCESS = [
  { step: '01', title: 'Technical Audit', desc: 'Full crawl, log file analysis, GSC data review, Core Web Vitals assessment, and rendering audit — a complete picture of your technical SEO health.' },
  { step: '02', title: 'Priority Mapping', desc: 'Every issue ranked by traffic impact and implementation effort — so your dev team works on what moves rankings first.' },
  { step: '03', title: 'Developer Specifications', desc: 'Ticket-ready fix specifications — code snippets, Liquid examples, htaccess rules, and configuration instructions your engineers can implement without ambiguity.' },
  { step: '04', title: 'Implementation QA', desc: 'Post-implementation validation — re-crawl, GSC coverage monitoring, and CWV score verification to confirm every fix landed correctly.' },
  { step: '05', title: 'Ongoing Monitoring', desc: 'Weekly crawl anomaly alerts, Core Web Vitals trend tracking, and pre-deployment SEO review for every major release.' },
];

const WHY = [
  { title: 'Engineering-Level Expertise', desc: 'Our technical SEOs read log files, write regex, review pull requests, and understand rendering pipelines — not just Google\'s beginner documentation.' },
  { title: 'Platform Agnostic', desc: 'AEM, Sitecore, Shopify, WooCommerce, Magento, Next.js, Nuxt, custom builds — we have optimised technical SEO across all major platforms and frameworks.' },
  { title: 'Developer-Ready Specs', desc: 'Every recommendation comes with exact implementation instructions — no vague "fix this" directives that leave developers guessing.' },
  { title: 'Log File Analysis Capability', desc: 'We go beyond crawl tools — actual server log analysis shows us exactly how Googlebot is behaving on your site, revealing issues no crawler can find.' },
  { title: 'Pre-Deploy SEO Review', desc: 'We join your deployment process as a standing SEO reviewer — catching ranking-damaging changes before they go live, not after rankings drop.' },
  { title: '15+ Years Technical SEO', desc: 'From the early days of robots.txt to modern Core Web Vitals and INP — we have been solving technical SEO problems across every major Google algorithm era.' },
];

const FAQS = [
  { q: 'What is technical SEO and why does it matter?', a: 'Technical SEO is the practice of optimising the infrastructure of a website so that search engines can efficiently crawl, render, understand, and index its content. Without a sound technical foundation — clean URLs, fast page load, correct canonical tags, renderable JavaScript, efficient crawl budget — even the best content and strongest backlinks will underperform. Technical SEO is the foundation everything else is built on.' },
  { q: 'What does a technical SEO audit cover?', a: 'Our technical SEO audits cover: crawlability and indexation (robots.txt, sitemaps, noindex tags, canonical tags); site architecture (crawl depth, internal linking, URL structure); page speed and Core Web Vitals (LCP, CLS, INP); JavaScript rendering (Googlebot\'s ability to process your JS framework); structured data (schema markup validity and completeness); duplicate content (canonical issues, parameter URLs, pagination); international SEO (hreflang implementation); and security (HTTPS, mixed content). Each issue is prioritised by ranking impact.' },
  { q: 'How do you fix Core Web Vitals?', a: 'Core Web Vitals fixes depend on which metric is failing and why. LCP (Largest Contentful Paint) fixes typically involve: server response time improvements, preloading critical resources, optimising the LCP image/element. CLS (Cumulative Layout Shift) fixes involve: setting explicit dimensions on images and embeds, avoiding dynamically injected content above the fold. INP (Interaction to Next Paint) fixes involve: reducing JavaScript execution time, code splitting, and deferring non-critical scripts. We diagnose your specific issues before prescribing fixes.' },
  { q: 'What is crawl budget and how do you optimise it?', a: 'Crawl budget is the number of pages Googlebot will crawl on your site within a given time period. It matters most for large sites (10,000+ pages). Crawl budget waste comes from: faceted navigation URLs, paginated duplicates, URL parameters creating thin variants, crawlable 404 pages, and orphan pages with no internal links. We use server log file analysis to see exactly how Googlebot is spending its crawl budget and build a prioritised plan to redirect that crawl activity to your highest-value pages.' },
  { q: 'Can you fix JavaScript SEO issues?', a: 'Yes. JavaScript SEO requires understanding how different rendering approaches (client-side rendering, server-side rendering, static site generation, hybrid) affect Googlebot\'s ability to index content. We conduct rendering audits using Google\'s URL Inspection tool, Rendertron, and Chrome DevTools to identify content that is visible to users but invisible to Googlebot. Fixes may include implementing pre-rendering, switching to SSR for key pages, or adding noindex to pages that cannot be rendered correctly.' },
  { q: 'How long does it take to see results from technical SEO?', a: 'Technical SEO results depend on the type of fix. Crawlability improvements (fixing robots.txt blocks, removing noindex tags) can show GSC coverage improvements within 1 to 2 weeks. Canonical tag fixes typically resolve indexation issues within 2 to 4 weeks as Googlebot recrawls affected pages. Core Web Vitals improvements reflect in the CrUX data set after 28 days of improved field data collection. Crawl budget optimisation on large sites shows measurable ranking improvements over 1 to 3 months as more high-value pages get recrawled more frequently.' },
  { q: 'Do you provide implementation support for technical SEO fixes?', a: 'Yes. We offer three levels of technical SEO engagement: (1) Audit and specifications only — we deliver the audit and ticket-ready specs for your team to implement; (2) Audit plus implementation oversight — we write specs, join sprint planning, review PRs, and QA deployed changes; (3) Full implementation — we implement technical fixes directly via CMS, Liquid, or code changes on agreed platforms. Most enterprise clients use model 2; SMBs often use model 3.' },
  { q: 'What is the difference between technical SEO and on-page SEO?', a: 'Technical SEO covers the infrastructure layer — how search engines access, render, and index your site. On-page SEO covers the content layer — title tags, headings, keyword targeting, internal links. Both matter, but technical issues must be fixed first because on-page optimisation on pages that cannot be crawled or indexed has zero impact. Our standard process is technical audit and fixes before on-page work — because fixing a crawlability block can unlock more ranking improvement than months of on-page optimisation.' },
];

const STATS = [
  { label: 'Technical Audits Completed', val: '600+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Audit Checkpoints', val: '150+' },
  { label: 'Client Retention', val: '96%' },
];

export default function TechnicalSeoOptimization() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);

  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);

  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Technical SEO', item: 'https://www.1solutions.biz/technical-seo-optimization/' }] }, { '@type': 'Service', name: 'Technical SEO Optimisation', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Technical SEO', url: 'https://www.1solutions.biz/technical-seo-optimization/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };

  return (
    <>
      <Head>
        <title>Technical SEO Optimisation | Core Web Vitals, Crawl & JS SEO | 1Solutions</title>
        <meta name="description" content="Technical SEO services — Core Web Vitals, crawl budget, JavaScript SEO, structured data, and site architecture fixes. Engineering-level technical SEO from 1Solutions." />
        <meta name="keywords" content="technical seo optimization, technical seo services, core web vitals optimisation, crawl budget optimisation, javascript seo, technical seo audit" />
        <link rel="canonical" href="https://www.1solutions.biz/technical-seo-optimization/" />
        <meta property="og:title" content="Technical SEO Optimisation | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/technical-seo-optimization/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .tseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .tseo-page *,.tseo-page *::before,.tseo-page *::after{box-sizing:border-box}
          .tseo-hero{background:linear-gradient(135deg,#f0f4ff 0%,#dbe4ff 25%,#e8ecff 60%,#f5f7ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .tseo-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .tseo-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(30,58,95,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .tseo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .tseo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .tseo-bc a{color:#6b7280;text-decoration:none}.tseo-bc a:hover{color:#2563EB}.tseo-bc span{color:#d1d5db}
          .tseo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(37,99,235,0.08);border:1px solid rgba(37,99,235,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#1D4ED8;margin-bottom:28px}
          .tseo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#1E3A5F 0%,#2563EB 50%,#0F1F40 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .tseo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .tseo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .tseo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#2563EB;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(37,99,235,0.28)}
          .tseo-btn-p:hover{background:#1D4ED8;box-shadow:0 8px 32px rgba(37,99,235,0.38);transform:translateY(-2px)}
          .tseo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .tseo-btn-s:hover{border-color:#2563EB;color:#2563EB;transform:translateY(-2px)}
          .tseo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(37,99,235,0.07)}
          .tseo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(37,99,235,0.08)}.tseo-stat:last-child{border-right:none}
          .tseo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .tseo-stat-v{font-size:1.6rem;font-weight:900;color:#2563EB;letter-spacing:-0.5px}
          .tseo-svc{background:#f8fafd;padding:80px 40px}.tseo-svc-in{max-width:1280px;margin:0 auto}
          .tseo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#2563EB;margin-bottom:10px;display:block}
          .tseo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#1E3A5F 0%,#2563EB 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .tseo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .tseo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .tseo-card{background:linear-gradient(135deg,rgba(240,244,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(219,228,255,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(37,99,235,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .tseo-card.visible{opacity:1;transform:translateY(0)}.tseo-card:hover{transform:translateY(-6px);border-color:rgba(37,99,235,0.22);box-shadow:0 16px 48px rgba(37,99,235,0.09)}
          .tseo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#2563EB;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .tseo-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .tseo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .tseo-stack{background:linear-gradient(135deg,#1E3A5F 0%,#2563EB 100%);padding:60px 40px}
          .tseo-stack-in{max-width:1280px;margin:0 auto;text-align:center}
          .tseo-stack h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .tseo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .tseo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .tseo-proc{background:linear-gradient(135deg,#f0f4ff 0%,#f5f7ff 50%,#dbe4ff 100%);padding:80px 40px}
          .tseo-proc-in{max-width:900px;margin:0 auto}
          .tseo-steps{display:flex;flex-direction:column;margin-top:44px}
          .tseo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(37,99,235,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .tseo-step:last-child{border-bottom:none}.tseo-step.visible{opacity:1;transform:translateX(0)}
          .tseo-snum{font-size:3rem;font-weight:900;color:rgba(37,99,235,0.15);line-height:1;letter-spacing:-2px}
          .tseo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .tseo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .tseo-why{background:#fff;padding:80px 40px}.tseo-why-in{max-width:1280px;margin:0 auto}
          .tseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .tseo-wcard{background:linear-gradient(135deg,#f0f4ff 0%,#fff 60%,#dbe4ff 100%);border:1px solid rgba(37,99,235,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .tseo-wcard.visible{opacity:1;transform:translateY(0)}.tseo-wcard:hover{border-color:rgba(37,99,235,0.20);box-shadow:0 8px 32px rgba(37,99,235,0.07)}
          .tseo-dot{width:8px;height:8px;border-radius:50%;background:#2563EB;margin-bottom:16px}
          .tseo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .tseo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .tseo-faq{background:#f8fafd;padding:80px 40px}.tseo-faq-in{max-width:860px;margin:0 auto}
          .tseo-fitem{border-bottom:1px solid #e5e7eb}
          .tseo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .tseo-fq:hover{color:#2563EB}
          .tseo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .tseo-fitem.open .tseo-ficon{border-color:#2563EB;color:#2563EB;background:rgba(37,99,235,0.06)}
          .tseo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .tseo-fitem.open .tseo-fa{max-height:500px;padding-bottom:22px}
          .tseo-cta{background:linear-gradient(135deg,rgba(37,99,235,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(30,58,95,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .tseo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,0.10) 0%,transparent 70%);pointer-events:none}
          .tseo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(30,58,95,0.08) 0%,transparent 70%);pointer-events:none}
          .tseo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .tseo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#1E3A5F 0%,#2563EB 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .tseo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .tseo-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.tseo-grid{grid-template-columns:repeat(2,1fr)}.tseo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.tseo-hero,.tseo-svc,.tseo-stack,.tseo-proc,.tseo-why,.tseo-faq,.tseo-cta{padding:60px 24px}.tseo-hero{padding-top:60px;padding-bottom:0}.tseo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.tseo-stat:nth-child(2){border-right:none}.tseo-grid{grid-template-columns:1fr}.tseo-why-grid{grid-template-columns:1fr}.tseo-step{grid-template-columns:56px 1fr}.tseo-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="tseo-page">
        <section className="tseo-hero"><div className="tseo-o1"/><div className="tseo-o2"/>
          <div className="tseo-in">
            <nav className="tseo-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO Services</Link><span>/</span><span style={{color:'#2563EB'}}>Technical SEO</span></nav>
            <span className="tseo-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#2563EB',display:'inline-block'}}/> Core Web Vitals · Crawl · JS SEO</span>
            <h1 className="tseo-h1">Technical SEO Optimisation That Fixes What Blocks Your Rankings</h1>
            <p className="tseo-sub">Engineering-level technical SEO — crawl budget analysis, Core Web Vitals fixes, JavaScript rendering, structured data, and site architecture — the foundation every high-performing SEO strategy is built on.</p>
            <div className="tseo-btns">
              <Link href="/contact-us" className="tseo-btn-p">Get a Technical SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-audit-services" className="tseo-btn-s">Full SEO Audit</Link>
            </div>
            <div className="tseo-stats">{STATS.map(s => <div key={s.label} className="tseo-stat"><div className="tseo-stat-l">{s.label}</div><div className="tseo-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="tseo-svc"><div className="tseo-svc-in">
          <span className="tseo-ey2">What We Fix</span><h2 className="tseo-ttl">Technical SEO Services</h2>
          <p className="tseo-desc">Every technical layer that influences how Google crawls, renders, and ranks your website — diagnosed and fixed with developer-ready specifications.</p>
          <div className="tseo-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`tseo-card${visibleCards.includes(i)?' visible':''}`}><div className="tseo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="tseo-stack"><div className="tseo-stack-in">
          <h2>Tools &amp; Technology Stack</h2>
          <div className="tseo-pills">{STACK.map(c => <span key={c} className="tseo-pill">{c}</span>)}</div>
        </div></section>
        <section className="tseo-proc"><div className="tseo-proc-in">
          <span className="tseo-ey2">How We Work</span><h2 className="tseo-ttl">Our Technical SEO Process</h2>
          <p className="tseo-desc">Audit to implementation QA — a structured process that integrates with your engineering workflow and delivers developer-ready specifications from day one.</p>
          <div className="tseo-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`tseo-step${visibleSteps.includes(i)?' visible':''}`}><div className="tseo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="tseo-why"><div className="tseo-why-in">
          <span className="tseo-ey2">Why 1Solutions</span><h2 className="tseo-ttl">Engineering-Grade Technical SEO</h2>
          <p className="tseo-desc">We go beyond crawl reports — log file analysis, rendering audits, PR reviews, and pre-deployment checks that prevent ranking-damaging releases.</p>
          <div className="tseo-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`tseo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="tseo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="tseo-faq"><div className="tseo-faq-in">
          <span className="tseo-ey2">Got Questions?</span><h2 className="tseo-ttl">Technical SEO FAQs</h2>
          <p className="tseo-desc">Answers to the most common technical SEO questions.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`tseo-fitem${openFaq===i?' open':''}`}><button className="tseo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="tseo-ficon">{openFaq===i?'−':'+'}</span></button><div className="tseo-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="tseo-cta"><div className="tseo-cta-o1"/><div className="tseo-cta-o2"/>
          <div className="tseo-cta-in">
            <span className="tseo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Fix Your Technical SEO Foundation?</span>
            <h2 className="tseo-cta-t">Get Your Technical SEO Audit</h2>
            <p className="tseo-cta-s">150-point technical audit — crawl health, Core Web Vitals, JS rendering, structured data, and architecture — with a prioritised, developer-ready action plan.</p>
            <div className="tseo-cta-btns">
              <Link href="/contact-us" className="tseo-btn-p">Get Technical SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-services-company" className="tseo-btn-s">SEO Services Overview</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
