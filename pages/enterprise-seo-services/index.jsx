import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Enterprise Technical SEO', desc: 'Crawl budget management, log file analysis, JavaScript rendering, Core Web Vitals at scale, and site architecture for sites with 100K to 10M+ URLs.' },
  { n: '02', title: 'International & Multilingual SEO', desc: 'Hreflang implementation, ccTLD vs subdirectory strategy, geo-targeting in Search Console, and international content planning for global enterprise brands.' },
  { n: '03', title: 'Enterprise Content Strategy', desc: 'Topical authority mapping across thousands of pages, content gap analysis at scale, pillar-cluster architecture, and E-E-A-T optimisation for YMYL industries.' },
  { n: '04', title: 'Enterprise Link Authority', desc: 'Strategic digital PR, analyst relations, thought leadership placements, and link acquisition from tier-1 publications that move domain authority at enterprise scale.' },
  { n: '05', title: 'JavaScript SEO', desc: 'Rendering audits for React, Angular, Vue, Next.js, and Nuxt applications. Fix pre-rendering gaps, dynamic rendering configurations, and lazy-load indexation issues.' },
  { n: '06', title: 'Crawl Budget Optimisation', desc: 'Identify and resolve crawl waste from faceted navigation, pagination, session IDs, and parameter URLs — ensuring Googlebot prioritises your highest-value pages.' },
  { n: '07', title: 'Structured Data at Scale', desc: 'Templated schema deployment across product, article, FAQ, breadcrumb, and organisation types — managed via GTM or CMS integration for zero-dev-overhead maintenance.' },
  { n: '08', title: 'SEO Analytics & BI Integration', desc: 'GSC and GA4 data piped into Looker, Tableau, or Power BI. Custom dashboards tracking revenue, rankings, and share-of-voice for C-suite and board reporting.' },
];

const CAPABILITIES = ['Sites 100K–10M+ URLs', 'JS Framework SEO', 'Log File Analysis', 'Crawl Budget Control', 'Core Web Vitals', 'International SEO', 'Hreflang at Scale', 'AEM / Sitecore', 'Salesforce Commerce', 'SAP Commerce', 'Custom CMS', 'BI Integration'];

const PROCESS = [
  { step: '01', title: 'Enterprise SEO Audit', desc: 'Full technical audit, content audit, link profile analysis, and competitor benchmarking. We map your full organic search landscape before touching anything.' },
  { step: '02', title: 'Strategy & Roadmap', desc: 'Priority-ranked roadmap aligned to your engineering sprints, content calendar, and business objectives — with clear revenue impact estimates for each initiative.' },
  { step: '03', title: 'Technical Implementation', desc: 'We work directly with your engineering and platform teams to implement technical fixes — not just recommendations. Our specs are developer-ready from day one.' },
  { step: '04', title: 'Content & Authority', desc: 'Scaled content production and editorial strategy, combined with proactive link acquisition through digital PR and thought leadership channels.' },
  { step: '05', title: 'QA & Monitoring', desc: 'Post-deployment SEO QA on every major release, continuous rank tracking across thousands of keywords, and weekly anomaly alerts.' },
  { step: '06', title: 'Executive Reporting', desc: 'Monthly performance reviews with board-ready reporting: organic revenue attribution, share-of-voice movements, and roadmap progress against KPIs.' },
];

const WHY = [
  { title: 'Enterprise-Only Focus', desc: 'We do not mix enterprise clients with SMB accounts. Your engagement is handled by a dedicated senior team with enterprise platform experience.' },
  { title: 'Engineering-Level Technical SEO', desc: 'Our technical SEOs can read log files, write regex, review pull requests, and configure render pipelines — not just fill out recommendation templates.' },
  { title: 'Platform Agnostic', desc: 'AEM, Sitecore, Salesforce Commerce, SAP Commerce, custom builds — we have worked across all major enterprise CMS and commerce platforms.' },
  { title: 'Revenue Attribution', desc: 'We connect organic search performance to pipeline and revenue using GA4, CRM integration, and assisted conversion modelling — not just rankings.' },
  { title: 'Global Delivery Capability', desc: 'Covering US, UK, Canada, Australia, and APAC markets with native-language content partners and local market SEO expertise.' },
  { title: 'C-Suite Communication', desc: 'Monthly briefings structured for CTO, CMO, and CFO audiences. We translate SEO data into business impact language that resonates at board level.' },
];

const FAQS = [
  { q: 'What makes enterprise SEO different from standard SEO?', a: 'Enterprise SEO involves managing organic search for sites with thousands to millions of pages, complex technical environments (JavaScript frameworks, headless CMS, custom platforms), large cross-functional teams, and significant investment decisions. The technical complexity, stakeholder management, content governance, and reporting requirements are fundamentally different from SMB SEO — requiring specialist tools, experience, and delivery models.' },
  { q: 'How do you handle SEO during major platform migrations?', a: 'Platform migrations are one of the highest-risk SEO events for enterprise sites. We conduct a full pre-migration SEO audit, create a comprehensive redirect map (often 50K+ URLs), define pre- and post-launch QA protocols, and monitor rankings, crawl behaviour, and organic traffic daily for 90 days post-migration. We have managed zero-traffic-loss migrations for enterprise clients moving between AEM, Sitecore, Salesforce Commerce, and custom platforms.' },
  { q: 'How do you integrate with our existing engineering sprints?', a: 'We adapt to your development workflow — whether Agile, SAFe, or waterfall. Our SEO specifications are written in ticket-ready format (Jira, Linear, Asana), we attend relevant sprint planning sessions, review PRs for SEO impact, and maintain a backlog of approved technical work ready for your next sprint cycle. We are a functional SEO partner, not an external vendor delivering PDFs.' },
  { q: 'What tools do you use for enterprise-scale SEO?', a: 'Primary: Screaming Frog (large crawl), Sitebulb, DeepCrawl, Botify (for very large crawls), Ahrefs, SEMrush, Moz Pro, Google Search Console, GA4, Looker Studio. For log file analysis: Splunk, ELK Stack, custom SQL. For rendering audits: Chrome DevTools, Rendertron, Puppeteer. For international: hreflang.org, Merkle hreflang checker. We adapt to your existing tech stack where possible.' },
  { q: 'Can you manage SEO for multi-domain or multi-brand enterprise portfolios?', a: 'Yes. We manage SEO across enterprise portfolios covering multiple brands, domains, languages, and regions. We build unified reporting dashboards, establish consistent governance frameworks, and ensure cross-domain cannibalisation is proactively managed. Our largest portfolio engagement covers 14 domains across 6 countries.' },
  { q: 'How do you measure the ROI of enterprise SEO?', a: 'We build organic revenue attribution models using GA4 assisted conversions, CRM data matching (where available), and pipeline influence analysis. For ecommerce, we track direct organic-attributed revenue. For lead gen, we model organic-to-pipeline contribution. All reporting ties back to business value — not just keywords and traffic.' },
  { q: 'Do you provide dedicated account management?', a: 'Yes. Every enterprise engagement includes a dedicated Senior SEO Strategist (your primary point of contact), a Technical SEO Lead, and access to specialist resources (content, digital PR, analytics) as required. You have direct access — not an account manager who relays messages.' },
  { q: 'What is the minimum engagement for enterprise SEO?', a: 'Enterprise SEO engagements start at a 6-month initial term, with monthly retainer pricing based on site complexity, keyword footprint, and deliverable scope. We provide a detailed scoping document and fixed monthly pricing at proposal stage — no ambiguous "as-needed" billing.' },
];

const STATS = [
  { label: 'Enterprise Clients', val: '200+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Keywords Tracked', val: '10M+' },
  { label: 'Client Retention', val: '96%' },
];

export default function EnterpriseSeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null);
  const stepRefs = useRef([]);
  const whyRef = useRef(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 });
    o.observe(cardsRef.current); return () => o.disconnect();
  }, []);

  useEffect(() => {
    const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; });
    return () => obs.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!whyRef.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 });
    o.observe(whyRef.current); return () => o.disconnect();
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Enterprise SEO', item: 'https://www.1solutions.biz/enterprise-seo-services/' }] },
      { '@type': 'Service', name: 'Enterprise SEO Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, description: 'Enterprise SEO services for large-scale websites — technical SEO, international, content strategy, and BI reporting for 100K+ page sites.', serviceType: 'Enterprise SEO', url: 'https://www.1solutions.biz/enterprise-seo-services/' },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Enterprise SEO Services | Large-Scale SEO for Complex Sites | 1Solutions</title>
        <meta name="description" content="Enterprise SEO services from 1Solutions — technical SEO at scale, international SEO, JavaScript SEO, crawl budget optimisation, and BI-integrated reporting for 100K+ page sites." />
        <meta name="keywords" content="enterprise seo services, enterprise seo agency, large scale seo, enterprise seo company, technical seo enterprise, international seo services" />
        <link rel="canonical" href="https://www.1solutions.biz/enterprise-seo-services/" />
        <meta property="og:title" content="Enterprise SEO Services | 1Solutions" />
        <meta property="og:description" content="SEO built for complexity — technical SEO at scale, international SEO, JS framework audits, and C-suite reporting for enterprise websites." />
        <meta property="og:url" content="https://www.1solutions.biz/enterprise-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .eseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .eseo-page *,.eseo-page *::before,.eseo-page *::after{box-sizing:border-box}
          .eseo-hero{background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 25%,#e0e7ff 60%,#f0f9ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .eseo-orb1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(30,58,138,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .eseo-orb2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(29,78,216,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .eseo-inner{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .eseo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .eseo-bc a{color:#6b7280;text-decoration:none}.eseo-bc a:hover{color:#1D4ED8}.eseo-bc span{color:#d1d5db}
          .eseo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(30,58,138,0.08);border:1px solid rgba(30,58,138,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#1E3A8A;margin-bottom:28px}
          .eseo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#1E3A8A 0%,#2563EB 50%,#0F1F40 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .eseo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .eseo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .eseo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#1D4ED8;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(29,78,216,0.28)}
          .eseo-btn-p:hover{background:#1E40AF;box-shadow:0 8px 32px rgba(29,78,216,0.38);transform:translateY(-2px)}
          .eseo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .eseo-btn-s:hover{border-color:#1D4ED8;color:#1D4ED8;transform:translateY(-2px)}
          .eseo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(29,78,216,0.08)}
          .eseo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(29,78,216,0.08)}.eseo-stat:last-child{border-right:none}
          .eseo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .eseo-stat-v{font-size:1.6rem;font-weight:900;color:#1D4ED8;letter-spacing:-0.5px}
          .eseo-svc{background:#f8fafd;padding:80px 40px}
          .eseo-svc-in{max-width:1280px;margin:0 auto}
          .eseo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1D4ED8;margin-bottom:10px;display:block}
          .eseo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#1E3A8A 0%,#2563EB 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .eseo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .eseo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .eseo-card{background:linear-gradient(135deg,rgba(239,246,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(224,231,255,0.40) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(29,78,216,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s,border-color 0.22s}
          .eseo-card.visible{opacity:1;transform:translateY(0)}.eseo-card:hover{transform:translateY(-6px);border-color:rgba(29,78,216,0.25);box-shadow:0 16px 48px rgba(29,78,216,0.10)}
          .eseo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#1D4ED8;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .eseo-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .eseo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .eseo-caps{background:linear-gradient(135deg,#1E3A8A 0%,#1D4ED8 100%);padding:60px 40px}
          .eseo-caps-in{max-width:1280px;margin:0 auto;text-align:center}
          .eseo-caps h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .eseo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .eseo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .eseo-proc{background:linear-gradient(135deg,#eff6ff 0%,#f0f9ff 50%,#e0e7ff 100%);padding:80px 40px}
          .eseo-proc-in{max-width:900px;margin:0 auto}
          .eseo-steps{display:flex;flex-direction:column;margin-top:44px}
          .eseo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(29,78,216,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .eseo-step:last-child{border-bottom:none}.eseo-step.visible{opacity:1;transform:translateX(0)}
          .eseo-snum{font-size:3rem;font-weight:900;color:rgba(29,78,216,0.15);line-height:1;letter-spacing:-2px}
          .eseo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .eseo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .eseo-why{background:#fff;padding:80px 40px}
          .eseo-why-in{max-width:1280px;margin:0 auto}
          .eseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .eseo-wcard{background:linear-gradient(135deg,#eff6ff 0%,#fff 60%,#e0e7ff 100%);border:1px solid rgba(29,78,216,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .eseo-wcard.visible{opacity:1;transform:translateY(0)}.eseo-wcard:hover{border-color:rgba(29,78,216,0.22);box-shadow:0 8px 32px rgba(29,78,216,0.07)}
          .eseo-dot{width:8px;height:8px;border-radius:50%;background:#1D4ED8;margin-bottom:16px}
          .eseo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .eseo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .eseo-faq{background:#f8fafd;padding:80px 40px}
          .eseo-faq-in{max-width:860px;margin:0 auto}
          .eseo-fitem{border-bottom:1px solid #e5e7eb}
          .eseo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .eseo-fq:hover{color:#1D4ED8}
          .eseo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .eseo-fitem.open .eseo-ficon{border-color:#1D4ED8;color:#1D4ED8;background:rgba(29,78,216,0.06)}
          .eseo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .eseo-fitem.open .eseo-fa{max-height:500px;padding-bottom:22px}
          .eseo-cta{background:linear-gradient(135deg,rgba(29,78,216,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(30,58,138,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .eseo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(29,78,216,0.10) 0%,transparent 70%);pointer-events:none}
          .eseo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(30,58,138,0.08) 0%,transparent 70%);pointer-events:none}
          .eseo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .eseo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#1E3A8A 0%,#2563EB 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .eseo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .eseo-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.eseo-grid{grid-template-columns:repeat(2,1fr)}.eseo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.eseo-hero,.eseo-svc,.eseo-caps,.eseo-proc,.eseo-why,.eseo-faq,.eseo-cta{padding:60px 24px}.eseo-hero{padding-top:60px;padding-bottom:0}.eseo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.eseo-stat:nth-child(2){border-right:none}.eseo-grid{grid-template-columns:1fr}.eseo-why-grid{grid-template-columns:1fr}.eseo-step{grid-template-columns:56px 1fr}.eseo-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="eseo-page">
        <section className="eseo-hero">
          <div className="eseo-orb1"/><div className="eseo-orb2"/>
          <div className="eseo-inner">
            <nav className="eseo-bc" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span>
              <Link href="/seo-services-company">SEO Services</Link><span>/</span>
              <span style={{color:'#1D4ED8'}}>Enterprise SEO</span>
            </nav>
            <span className="eseo-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#1D4ED8',display:'inline-block'}}/> Large-Scale SEO · Global Delivery</span>
            <h1 className="eseo-h1">Enterprise SEO Services for Complex, Large-Scale Websites</h1>
            <p className="eseo-sub">Technical SEO at scale, international SEO, JavaScript framework audits, crawl budget optimisation, and C-suite reporting — built for sites with 100K to 10M+ pages.</p>
            <div className="eseo-btns">
              <Link href="/contact" className="eseo-btn-p">Request Enterprise SEO Proposal <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-audit-services" className="eseo-btn-s">Get an Enterprise SEO Audit</Link>
            </div>
            <div className="eseo-stats">{STATS.map(s => <div key={s.label} className="eseo-stat"><div className="eseo-stat-l">{s.label}</div><div className="eseo-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>

        <section className="eseo-svc">
          <div className="eseo-svc-in">
            <span className="eseo-ey2">What We Deliver</span>
            <h2 className="eseo-ttl">Enterprise SEO Services</h2>
            <p className="eseo-desc">End-to-end SEO capability built for the complexity, scale, and stakeholder demands of enterprise organisations.</p>
            <div className="eseo-grid" ref={cardsRef}>
              {SERVICES.map((s,i) => <div key={s.n} className={`eseo-card${visibleCards.includes(i)?' visible':''}`}><div className="eseo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}
            </div>
          </div>
        </section>

        <section className="eseo-caps">
          <div className="eseo-caps-in">
            <h2>Platform &amp; Technology Capabilities</h2>
            <div className="eseo-pills">{CAPABILITIES.map(c => <span key={c} className="eseo-pill">{c}</span>)}</div>
          </div>
        </section>

        <section className="eseo-proc">
          <div className="eseo-proc-in">
            <span className="eseo-ey2">How We Work</span>
            <h2 className="eseo-ttl">Our Enterprise SEO Process</h2>
            <p className="eseo-desc">From audit to ongoing optimisation — a structured engagement model that integrates with your engineering, content, and reporting workflows.</p>
            <div className="eseo-steps">
              {PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`eseo-step${visibleSteps.includes(i)?' visible':''}`}><div className="eseo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}
            </div>
          </div>
        </section>

        <section className="eseo-why">
          <div className="eseo-why-in">
            <span className="eseo-ey2">Why 1Solutions</span>
            <h2 className="eseo-ttl">The Enterprise SEO Partner Built for Scale</h2>
            <p className="eseo-desc">Senior-led delivery, engineering-grade technical capability, and reporting that connects SEO to business outcomes — not just keyword counts.</p>
            <div className="eseo-why-grid" ref={whyRef}>
              {WHY.map((w,i) => <div key={w.title} className={`eseo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="eseo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}
            </div>
          </div>
        </section>

        <section className="eseo-faq">
          <div className="eseo-faq-in">
            <span className="eseo-ey2">Got Questions?</span>
            <h2 className="eseo-ttl">Enterprise SEO FAQs</h2>
            <p className="eseo-desc">Common questions from enterprise marketing and technical teams before engaging an enterprise SEO partner.</p>
            <div style={{marginTop:44}}>
              {FAQS.map((f,i) => <div key={i} className={`eseo-fitem${openFaq===i?' open':''}`}><button className="eseo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="eseo-ficon">{openFaq===i?'−':'+'}</span></button><div className="eseo-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}
            </div>
          </div>
        </section>

        <section className="eseo-cta">
          <div className="eseo-cta-o1"/><div className="eseo-cta-o2"/>
          <div className="eseo-cta-in">
            <span className="eseo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Scale Your Organic Growth?</span>
            <h2 className="eseo-cta-t">Request Your Enterprise SEO Proposal</h2>
            <p className="eseo-cta-s">Tell us your site scale, platforms, and growth objectives — we&rsquo;ll build a scoped proposal with clear deliverables and fixed monthly pricing.</p>
            <div className="eseo-cta-btns">
              <Link href="/contact" className="eseo-btn-p">Request Enterprise SEO Proposal <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-audit-services" className="eseo-btn-s">Start with an SEO Audit</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
