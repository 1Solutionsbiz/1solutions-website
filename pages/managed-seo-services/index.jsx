import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Dedicated SEO Account Management', desc: 'A single dedicated SEO account manager who understands your business, communicates proactively, and coordinates all SEO activity — no ticket queues, no chasing different specialists.' },
  { n: '02', title: 'Monthly Technical SEO Maintenance', desc: 'Ongoing technical health monitoring — crawl error resolution, Core Web Vitals management, index coverage review, and pre-deployment SEO checks on every site release.' },
  { n: '03', title: 'Keyword Research & Ongoing Targeting', desc: 'Continuous keyword opportunity identification — expanding your target keyword set as rankings improve, capturing seasonal opportunities, and targeting competitor keyword gaps month over month.' },
  { n: '04', title: 'Content Strategy & Creation', desc: 'Monthly content planning and production — blog posts, landing pages, guides, and product copy that targets your keyword universe and builds topical authority over time.' },
  { n: '05', title: 'On-Page Optimisation', desc: 'Regular on-page SEO updates — title tags, meta descriptions, H1s, internal links, and schema markup — systematically improving your highest-priority pages based on performance data.' },
  { n: '06', title: 'Link Building & Digital PR', desc: 'Continuous white-hat link acquisition — editorial outreach, digital PR, guest posting, and resource link building that grows your domain authority month by month.' },
  { n: '07', title: 'Competitor Monitoring', desc: 'Monthly competitor tracking — ranking movements, new content, backlink acquisition, and SERP feature changes — with strategic recommendations to stay ahead of competitors.' },
  { n: '08', title: 'Monthly Reporting & Strategy Review', desc: 'Clear monthly reports — ranking movements, traffic trends, leads attributed to SEO, content performance, and next month\'s priorities — with a standing review call with your account manager.' },
];

const INCLUDES = ['Dedicated Account Manager', 'Technical SEO', 'Content Strategy', 'On-Page Optimisation', 'Link Building', 'Monthly Reporting', 'Competitor Monitoring', 'GSC & GA4 Management'];

const PROCESS = [
  { step: '01', title: 'Discovery & Audit', desc: 'Technical audit, keyword research, competitor analysis, and goal-setting — a complete picture of where you are and where managed SEO will take you.' },
  { step: '02', title: 'Strategy & Roadmap', desc: '90-day SEO roadmap — prioritised by impact and agreed with you before work begins. No vague retainer activity — specific deliverables for each month.' },
  { step: '03', title: 'Month 1–3 Foundation', desc: 'Technical fixes, on-page optimisation, initial content, and link building foundation — the high-impact work that unlocks ranking growth quickly.' },
  { step: '04', title: 'Ongoing Execution', desc: 'Monthly content production, link acquisition, on-page updates, and technical maintenance — compounding improvements that grow traffic month over month.' },
  { step: '05', title: 'Reporting & Optimisation', desc: 'Monthly performance reports, standing review calls, and strategy adjustments based on what the data is showing — agile SEO that responds to results.' },
  { step: '06', title: 'Quarterly Strategic Review', desc: 'Every quarter we review your full SEO performance, update keyword targets, assess competitor movements, and set the next quarter\'s priorities — keeping strategy sharp as your business grows.' },
];

const WHY = [
  { title: 'One Dedicated Manager', desc: 'Your account manager coordinates all SEO specialists — technical, content, and link building — so you get coherent strategy, not fragmented service from a shared team.' },
  { title: 'No Lock-In Commitments', desc: 'We work month-to-month after an initial 3-month onboarding period — because we retain clients by delivering results, not by trapping them in long contracts.' },
  { title: 'Transparent Monthly Reports', desc: 'Every month you receive a clear report — keyword rankings, traffic, leads attributed to SEO, deliverables completed, and next month\'s plan — nothing hidden.' },
  { title: 'Responsive Communication', desc: '24-hour response time on all queries, weekly progress updates, and a standing monthly review call — you are always informed about what your SEO retainer is doing.' },
  { title: 'Full-Service In-House', desc: 'Technical SEO, content writers, outreach specialists, and developers all in-house — coherent execution without the coordination delays of outsourced execution chains.' },
  { title: '15+ Years & 500+ Clients', desc: 'We have managed SEO for startups, SMBs, and enterprise clients across ecommerce, B2B, SaaS, healthcare, and professional services — sector experience that accelerates results.' },
];

const FAQS = [
  { q: 'What is managed SEO?', a: 'Managed SEO (also called retained SEO or monthly SEO services) is an ongoing SEO partnership where an agency handles all aspects of your search engine optimisation on a monthly retainer basis. Unlike one-off audits or project-based work, managed SEO provides continuous execution — technical maintenance, content creation, link building, on-page optimisation, and monthly reporting — all coordinated by a dedicated account manager who understands your business and goals.' },
  { q: 'What does a managed SEO retainer typically include?', a: 'Our managed SEO retainers include: dedicated account management; monthly technical SEO monitoring and fixes; keyword research and ongoing keyword expansion; content strategy and monthly content production; on-page optimisation (title tags, meta, headings, schema, internal links); link building and digital PR; competitor monitoring and SERP tracking; Google Search Console and GA4 management; and monthly reporting with a review call. The specific volume of each activity is agreed based on your budget and goals.' },
  { q: 'How much does managed SEO cost?', a: 'Managed SEO retainers typically range from £500/month for small local businesses with limited content needs to £5,000+/month for ecommerce or enterprise clients requiring significant content production and link acquisition. The budget required depends on: how competitive your industry is (competitive industries require more monthly investment to move rankings); your current SEO baseline (a technically clean site with some existing rankings is cheaper to grow than one starting from zero); and the volume of content and links needed to compete. We offer a free strategy call to assess your situation and recommend the right investment level.' },
  { q: 'How long until I see results from managed SEO?', a: 'SEO results compound over time. Most clients see measurable keyword ranking improvements within 3 to 6 months, significant organic traffic growth within 6 to 12 months, and strong ROI within 12 to 18 months of sustained managed SEO. The timeline depends on domain authority, starting keyword rankings, content production rate, and link building velocity. Technical sites with existing authority can see faster early movements; new sites or sites recovering from penalties take longer. We set realistic expectations during onboarding and provide monthly progress tracking.' },
  { q: 'What is the difference between managed SEO and a one-off SEO project?', a: 'A one-off SEO project (audit, on-page optimisation, content creation) delivers a defined output at a point in time. Managed SEO delivers continuous execution — because SEO is not a one-time fix but an ongoing competitive activity. Search rankings fluctuate with algorithm updates, competitor actions, and content freshness signals. Without ongoing management — regular content, continuous link building, and technical maintenance — rankings achieved through a one-off project will decay as competitors continue their activity. Managed SEO compounds improvements month over month rather than delivering a single output.' },
  { q: 'Do I need to sign a long-term contract for managed SEO?', a: 'We require a minimum 3-month initial commitment to give the technical foundation, content, and link building work time to have an impact — SEO results are not visible overnight, and cancelling before 3 months means you leave before seeing the results of the work done. After the initial 3 months, we operate on a rolling monthly basis. Clients who see strong results stay; clients who do not see results we would expect at that stage can exit. We do not trap clients in 12-month contracts.' },
  { q: 'Will managed SEO work for my industry?', a: 'Managed SEO works across virtually all industries that have search demand for their services — ecommerce, B2B, professional services, healthcare, SaaS, local services, and more. The competitive landscape differs significantly across industries, which affects how much monthly investment is required and how long it takes to achieve competitive rankings. Highly competitive industries (legal, financial services, insurance, healthcare) require longer investment horizons and larger monthly budgets. We assess your specific industry competition during the strategy call before recommending a retainer level.' },
  { q: 'How do you measure managed SEO success?', a: 'We track multiple layers of SEO performance: keyword ranking movements (positions for target keywords tracked weekly); organic traffic (sessions, users, and pageviews from organic search in GA4); organic conversions (enquiries, leads, sales, or revenue attributed to organic search); and SEO visibility (indexed pages, impressions, and click-through rate in GSC). Every monthly report covers all four layers with trend analysis. We also track competitor rankings to contextualise your progress within your competitive environment.' },
];

const STATS = [
  { label: 'Managed SEO Clients', val: '300+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Avg Traffic Growth (12mo)', val: '+240%' },
  { label: 'Retention Rate', val: '94%' },
];

export default function ManagedSeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);

  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);

  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Managed SEO', item: 'https://www.1solutions.biz/managed-seo-services/' }] }, { '@type': 'Service', name: 'Managed SEO Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Managed SEO', url: 'https://www.1solutions.biz/managed-seo-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };

  return (
    <>
      <Head>
        <title>Managed SEO Services | Monthly SEO Retainer Agency | 1Solutions</title>
        <meta name="description" content="Managed SEO services — monthly retainer SEO with a dedicated account manager, technical maintenance, content creation, link building, and transparent reporting. 300+ clients managed." />
        <meta name="keywords" content="managed seo services, monthly seo services, seo retainer agency, managed seo agency, ongoing seo services, seo management company" />
        <link rel="canonical" href="https://www.1solutions.biz/managed-seo-services/" />
        <meta property="og:title" content="Managed SEO Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/managed-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .mnseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .mnseo-page *,.mnseo-page *::before,.mnseo-page *::after{box-sizing:border-box}
          .mnseo-hero{background:linear-gradient(135deg,#f0fdfa 0%,#ccfbf1 25%,#d1fae5 60%,#f0fdf4 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .mnseo-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(15,118,110,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .mnseo-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(19,78,74,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .mnseo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .mnseo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .mnseo-bc a{color:#6b7280;text-decoration:none}.mnseo-bc a:hover{color:#0F766E}.mnseo-bc span{color:#d1d5db}
          .mnseo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(15,118,110,0.08);border:1px solid rgba(15,118,110,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0F766E;margin-bottom:28px}
          .mnseo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#134E4A 0%,#0F766E 50%,#064E3B 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .mnseo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .mnseo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .mnseo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#0F766E;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(15,118,110,0.28)}
          .mnseo-btn-p:hover{background:#134E4A;box-shadow:0 8px 32px rgba(15,118,110,0.38);transform:translateY(-2px)}
          .mnseo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .mnseo-btn-s:hover{border-color:#0F766E;color:#0F766E;transform:translateY(-2px)}
          .mnseo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(15,118,110,0.07)}
          .mnseo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(15,118,110,0.08)}.mnseo-stat:last-child{border-right:none}
          .mnseo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .mnseo-stat-v{font-size:1.6rem;font-weight:900;color:#0F766E;letter-spacing:-0.5px}
          .mnseo-svc{background:#f8fafd;padding:80px 40px}.mnseo-svc-in{max-width:1280px;margin:0 auto}
          .mnseo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0F766E;margin-bottom:10px;display:block}
          .mnseo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#134E4A 0%,#0F766E 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .mnseo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .mnseo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .mnseo-card{background:linear-gradient(135deg,rgba(240,253,250,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(204,251,241,0.30) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,118,110,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .mnseo-card.visible{opacity:1;transform:translateY(0)}.mnseo-card:hover{transform:translateY(-6px);border-color:rgba(15,118,110,0.22);box-shadow:0 16px 48px rgba(15,118,110,0.09)}
          .mnseo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F766E;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .mnseo-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .mnseo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .mnseo-inc{background:linear-gradient(135deg,#134E4A 0%,#0F766E 100%);padding:60px 40px}
          .mnseo-inc-in{max-width:1280px;margin:0 auto;text-align:center}
          .mnseo-inc h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .mnseo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .mnseo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .mnseo-proc{background:linear-gradient(135deg,#f0fdfa 0%,#f0fdf4 50%,#ccfbf1 100%);padding:80px 40px}
          .mnseo-proc-in{max-width:900px;margin:0 auto}
          .mnseo-steps{display:flex;flex-direction:column;margin-top:44px}
          .mnseo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(15,118,110,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .mnseo-step:last-child{border-bottom:none}.mnseo-step.visible{opacity:1;transform:translateX(0)}
          .mnseo-snum{font-size:3rem;font-weight:900;color:rgba(15,118,110,0.15);line-height:1;letter-spacing:-2px}
          .mnseo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .mnseo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .mnseo-why{background:#fff;padding:80px 40px}.mnseo-why-in{max-width:1280px;margin:0 auto}
          .mnseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .mnseo-wcard{background:linear-gradient(135deg,#f0fdfa 0%,#fff 60%,#ccfbf1 100%);border:1px solid rgba(15,118,110,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .mnseo-wcard.visible{opacity:1;transform:translateY(0)}.mnseo-wcard:hover{border-color:rgba(15,118,110,0.20);box-shadow:0 8px 32px rgba(15,118,110,0.07)}
          .mnseo-dot{width:8px;height:8px;border-radius:50%;background:#0F766E;margin-bottom:16px}
          .mnseo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .mnseo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .mnseo-faq{background:#f8fafd;padding:80px 40px}.mnseo-faq-in{max-width:860px;margin:0 auto}
          .mnseo-fitem{border-bottom:1px solid #e5e7eb}
          .mnseo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .mnseo-fq:hover{color:#0F766E}
          .mnseo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .mnseo-fitem.open .mnseo-ficon{border-color:#0F766E;color:#0F766E;background:rgba(15,118,110,0.06)}
          .mnseo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .mnseo-fitem.open .mnseo-fa{max-height:500px;padding-bottom:22px}
          .mnseo-cta{background:linear-gradient(135deg,rgba(15,118,110,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(19,78,74,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .mnseo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(15,118,110,0.10) 0%,transparent 70%);pointer-events:none}
          .mnseo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(19,78,74,0.08) 0%,transparent 70%);pointer-events:none}
          .mnseo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .mnseo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#134E4A 0%,#0F766E 50%,#064E3B 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .mnseo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .mnseo-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.mnseo-grid{grid-template-columns:repeat(2,1fr)}.mnseo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.mnseo-hero,.mnseo-svc,.mnseo-inc,.mnseo-proc,.mnseo-why,.mnseo-faq,.mnseo-cta{padding:60px 24px}.mnseo-hero{padding-top:60px;padding-bottom:0}.mnseo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.mnseo-stat:nth-child(2){border-right:none}.mnseo-grid{grid-template-columns:1fr}.mnseo-why-grid{grid-template-columns:1fr}.mnseo-step{grid-template-columns:56px 1fr}.mnseo-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="mnseo-page">
        <section className="mnseo-hero"><div className="mnseo-o1"/><div className="mnseo-o2"/>
          <div className="mnseo-in">
            <nav className="mnseo-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO Services</Link><span>/</span><span style={{color:'#0F766E'}}>Managed SEO</span></nav>
            <span className="mnseo-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#0F766E',display:'inline-block'}}/> Dedicated Manager · Monthly Retainer · No Lock-In</span>
            <h1 className="mnseo-h1">Managed SEO Services — Dedicated SEO Partnership That Grows Your Traffic</h1>
            <p className="mnseo-sub">Monthly managed SEO with a dedicated account manager — technical maintenance, content, link building, and clear reporting. One retainer, everything covered, no chasing separate agencies.</p>
            <div className="mnseo-btns">
              <Link href="/contact-us" className="mnseo-btn-p">Start Managed SEO <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-audit-services" className="mnseo-btn-s">SEO Audit First</Link>
            </div>
            <div className="mnseo-stats">{STATS.map(s => <div key={s.label} className="mnseo-stat"><div className="mnseo-stat-l">{s.label}</div><div className="mnseo-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="mnseo-svc"><div className="mnseo-svc-in">
          <span className="mnseo-ey2">What&rsquo;s Included</span><h2 className="mnseo-ttl">Managed SEO Services</h2>
          <p className="mnseo-desc">Every component of a full-service SEO programme — coordinated by one dedicated account manager, executed by in-house specialists.</p>
          <div className="mnseo-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`mnseo-card${visibleCards.includes(i)?' visible':''}`}><div className="mnseo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="mnseo-inc"><div className="mnseo-inc-in">
          <h2>Everything Your SEO Needs, In One Retainer</h2>
          <div className="mnseo-pills">{INCLUDES.map(c => <span key={c} className="mnseo-pill">{c}</span>)}</div>
        </div></section>
        <section className="mnseo-proc"><div className="mnseo-proc-in">
          <span className="mnseo-ey2">How We Work</span><h2 className="mnseo-ttl">Our Managed SEO Process</h2>
          <p className="mnseo-desc">Discovery to ongoing execution — a structured managed SEO process that delivers compounding results month after month with full visibility at every stage.</p>
          <div className="mnseo-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`mnseo-step${visibleSteps.includes(i)?' visible':''}`}><div className="mnseo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="mnseo-why"><div className="mnseo-why-in">
          <span className="mnseo-ey2">Why 1Solutions</span><h2 className="mnseo-ttl">The Managed SEO Partner Clients Stay With</h2>
          <p className="mnseo-desc">94% client retention because we deliver measurable results — transparent reporting, no lock-in after onboarding, and one dedicated manager who knows your business.</p>
          <div className="mnseo-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`mnseo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="mnseo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="mnseo-faq"><div className="mnseo-faq-in">
          <span className="mnseo-ey2">Got Questions?</span><h2 className="mnseo-ttl">Managed SEO FAQs</h2>
          <p className="mnseo-desc">Answers to the most common questions about managed SEO and monthly retainer partnerships.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`mnseo-fitem${openFaq===i?' open':''}`}><button className="mnseo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="mnseo-ficon">{openFaq===i?'−':'+'}</span></button><div className="mnseo-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="mnseo-cta"><div className="mnseo-cta-o1"/><div className="mnseo-cta-o2"/>
          <div className="mnseo-cta-in">
            <span className="mnseo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready for SEO That Compounds Month After Month?</span>
            <h2 className="mnseo-cta-t">Start Your Managed SEO Partnership</h2>
            <p className="mnseo-cta-s">Free strategy call — we&rsquo;ll review your current SEO, assess your competition, and recommend the right retainer level for your goals.</p>
            <div className="mnseo-cta-btns">
              <Link href="/contact-us" className="mnseo-btn-p">Book a Strategy Call <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-services-company" className="mnseo-btn-s">SEO Services Overview</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
