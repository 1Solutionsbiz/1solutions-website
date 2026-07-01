import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Cloud Migration & Modernisation', desc: 'Moving legacy on-premise systems to AWS, Azure, or GCP — infrastructure assessment, migration planning, data migration, cutover, and post-migration optimisation. Reduce infrastructure costs, improve reliability, and unlock cloud-native capabilities.', href: '/devops-services-company' },
  { n: '02', title: 'Process Automation & RPA', desc: 'Identifying and automating repetitive manual processes using robotic process automation (RPA) and workflow automation tools — AP processing, data entry, report generation, customer onboarding, and compliance workflows.', href: '/contact-us' },
  { n: '03', title: 'Legacy System Overhaul', desc: 'Replacing or re-architecting outdated ERP, CRM, and custom systems — API-first architecture, microservices, and modern tech stacks that are maintainable, scalable, and integrate with current tools.', href: '/contact-us' },
  { n: '04', title: 'Data & Analytics Platforms', desc: 'Building data warehouses, BI dashboards, and analytics infrastructure — centralising data from disparate systems into a single source of truth that drives data-backed business decisions.', href: '/contact-us' },
  { n: '05', title: 'Customer Experience Transformation', desc: 'Redesigning customer-facing digital touchpoints — web, mobile, and self-service portals — from legacy monoliths to fast, personalised, omnichannel experiences that increase satisfaction and retention.', href: '/contact-us' },
  { n: '06', title: 'Digital Workplace & Collaboration', desc: 'Implementing modern workplace tools — Microsoft 365, SharePoint, Teams, and document management systems — that replace paper-based processes and disconnected communication.', href: '/contact-us' },
  { n: '07', title: 'API Integration & Connected Systems', desc: 'Connecting siloed business systems through API layers and integration platforms — so your CRM, ERP, ecommerce, and marketing tools share data in real time without manual exports.', href: '/contact-us' },
  { n: '08', title: 'Change Management & Adoption', desc: 'Digital transformation fails without adoption. We embed change management into every project — training programmes, internal communications, and user onboarding that ensure your team actually uses the new systems.', href: '/contact-us' },
];

const PROCESS = [
  { step: '01', title: 'Digital Maturity Assessment', desc: 'Auditing your current systems, processes, and infrastructure against your business goals — identifying the highest-impact transformation opportunities, the risks, and the realistic roadmap.' },
  { step: '02', title: 'Transformation Roadmap', desc: 'A phased, prioritised plan with clear business outcomes for each phase — sequenced to deliver early wins while building toward the full transformation vision.' },
  { step: '03', title: 'Architecture & Design', desc: 'Designing the target state architecture — cloud infrastructure, data flows, integration patterns, and application landscape — before a single line of code is written.' },
  { step: '04', title: 'Iterative Implementation', desc: 'Building and migrating in phases with working deliverables at each milestone — not a two-year big-bang project that risks everything on a single go-live.' },
  { step: '05', title: 'Testing & Cutover', desc: 'Rigorous testing in parallel environments, cutover planning, rollback procedures, and hypercare support during the critical first weeks of live operation.' },
  { step: '06', title: 'Continuous Optimisation', desc: 'Post-transformation monitoring, performance optimisation, and iterative improvement — digital transformation is not a project with an end date, it is an ongoing capability.' },
];

const WHY = [
  { title: 'Business-Led, Not Technology-Led', desc: 'We start with business outcomes — cost reduction, revenue growth, operational efficiency — and work backwards to the right technology choices. We do not recommend tools and platforms because they are fashionable; we recommend what solves your specific problem.' },
  { title: 'End-to-End Delivery', desc: 'From strategy and architecture through development, migration, testing, and change management — we deliver complete transformations, not just assessments or roadmaps that you hand to a different team to implement.' },
  { title: 'Proven Track Record', desc: '150+ digital transformation projects across manufacturing, retail, professional services, healthcare, and finance — including complex legacy migrations, multi-system integrations, and full digital overhauls.' },
  { title: 'Pragmatic Approach', desc: 'We distinguish between transformation that creates genuine business value and technology change for its own sake. Not every business needs microservices or AI. We recommend what is right for your scale, team, and goals.' },
  { title: 'Risk-Managed Delivery', desc: 'Phased delivery, parallel running, rollback planning, and rigorous testing — we manage transformation risk from day one, not as an afterthought.' },
];

const FAQS = [
  { q: 'What is digital transformation?', a: 'Digital transformation is the process of using digital technology to fundamentally change how a business operates and delivers value to customers. It goes beyond simply digitising existing processes — it involves rethinking business models, operations, and customer experiences around digital capabilities. Common elements include cloud migration, process automation, data analytics, legacy system replacement, and customer experience redesign. Successful digital transformation is driven by business goals — cost reduction, revenue growth, competitive positioning — not by technology for its own sake.' },
  { q: 'How long does digital transformation take?', a: 'It depends entirely on scope. A focused process automation project can deliver results in 6 to 12 weeks. A full cloud migration for a mid-size business takes 6 to 18 months. A complete ERP replacement or enterprise-wide transformation can take 2 to 4 years in phases. We do not recommend big-bang transformation — we design phased roadmaps that deliver business value at each milestone while building toward the full transformation vision. This means you see ROI throughout the journey, not only at the end.' },
  { q: 'What is the biggest risk in digital transformation?', a: 'The most common failure mode is not technical — it is adoption. Businesses invest in new systems that their teams do not use, revert to old processes, or work around the new tools. This is why change management is not an add-on for us — it is embedded in every project. The second most common failure is scope creep in big-bang projects. Our phased approach mitigates this by delivering in bounded increments with clear outcomes at each milestone.' },
  { q: 'How much does digital transformation cost?', a: 'Costs vary enormously by scope. Process automation for a specific workflow: $15,000 to $50,000. Cloud migration for a mid-size business: $50,000 to $300,000. Full legacy system replacement or enterprise transformation: $200,000 to $2M+. We provide a detailed cost estimate after the discovery and assessment phase — we do not quote without understanding your specific systems, complexity, and goals.' },
  { q: 'Do you work with businesses that have limited technical teams?', a: 'Yes. Many of our clients have limited or no in-house technical capacity. We act as a full transformation partner — providing strategy, architecture, development, and post-delivery support. We also build internal capability alongside the project through knowledge transfer, documentation, and training so that your team is not permanently dependent on an external partner for day-to-day operations.' },
  { q: 'What industries do you specialise in for digital transformation?', a: 'We have delivered digital transformation projects across manufacturing, retail and ecommerce, professional services (legal, accounting, consulting), healthcare, logistics, financial services, and education. While the business contexts differ, the underlying transformation patterns — cloud migration, process automation, integration, data platforms — are consistent across industries, and we apply that experience to your sector.' },
];

const STATS = [
  { label: 'Transformations', val: '150+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Industries', val: '40+' },
  { label: 'Client Retention', val: '97%' },
];

export default function DigitalTransformation() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Digital Transformation', item: 'https://www.1solutions.biz/digital-transformation/' }] }, { '@type': 'Service', name: 'Digital Transformation Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Digital Transformation', url: 'https://www.1solutions.biz/digital-transformation/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Digital Transformation Services | Modernize Your Business | 1Solutions</title>
        <meta name="description" content="Digital transformation services that modernize legacy systems, automate processes, and build cloud-native infrastructure. 15+ years helping businesses transform digitally." />
        <meta name="keywords" content="digital transformation services, cloud migration, process automation, legacy system modernisation, digital transformation company india" />
        <link rel="canonical" href="https://www.1solutions.biz/digital-transformation/" />
        <meta property="og:title" content="Digital Transformation Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/digital-transformation/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .dtrans-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .dtrans-page *,.dtrans-page *::before,.dtrans-page *::after{box-sizing:border-box}
          .dtrans-hero{background:linear-gradient(135deg,#0F1F40 0%,#1a2e5a 40%,#114171 80%,#0F1F40 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .dtrans-o1{position:absolute;top:-100px;right:-100px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.25) 0%,transparent 65%);pointer-events:none;filter:blur(40px)}
          .dtrans-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(254,151,0,0.08) 0%,transparent 65%);pointer-events:none;filter:blur(40px)}
          .dtrans-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .dtrans-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:24px;font-weight:500}
          .dtrans-bc a{color:rgba(255,255,255,0.5);text-decoration:none}.dtrans-bc a:hover{color:#FE9700}.dtrans-bc span{color:rgba(255,255,255,0.25)}
          .dtrans-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.35);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#a5b4fc;margin-bottom:28px}
          .dtrans-h1{font-size:clamp(2.4rem,5vw,4rem);font-weight:900;line-height:1.05;letter-spacing:-1.5px;color:#fff;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .dtrans-h1 span{background:linear-gradient(90deg,#FE9700 0%,#FFC14D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .dtrans-sub{font-size:1.08rem;color:rgba(255,255,255,0.70);line-height:1.75;max-width:660px;margin:0 auto 36px}
          .dtrans-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .dtrans-btn-p{display:inline-flex;align-items:center;gap:8px;background:#FE9700;color:#fff;padding:15px 32px;border-radius:50px;font-weight:800;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(254,151,0,0.35)}
          .dtrans-btn-p:hover{background:#e08700;box-shadow:0 8px 36px rgba(254,151,0,0.50);transform:translateY(-2px)}
          .dtrans-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.22);color:#fff;padding:15px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .dtrans-btn-s:hover{border-color:rgba(254,151,0,0.60);background:rgba(254,151,0,0.10);transform:translateY(-2px)}
          .dtrans-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.06);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.10);border-radius:20px 20px 0 0}
          .dtrans-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(255,255,255,0.07)}.dtrans-stat:last-child{border-right:none}
          .dtrans-stat-l{font-size:11px;color:rgba(255,255,255,0.45);font-weight:500;margin-bottom:4px}
          .dtrans-stat-v{font-size:1.6rem;font-weight:900;color:#FE9700;letter-spacing:-0.5px}
          .dtrans-svc{background:#f8fafd;padding:80px 40px}.dtrans-svc-in{max-width:1280px;margin:0 auto}
          .dtrans-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6366F1;margin-bottom:10px;display:block}
          .dtrans-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F1F40 0%,#114171 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .dtrans-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .dtrans-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .dtrans-card{background:linear-gradient(135deg,rgba(240,246,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(240,246,255,0.25) 100%);border:1px solid rgba(17,65,113,0.08);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(17,65,113,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease;text-decoration:none;display:block}
          .dtrans-card.visible{opacity:1;transform:translateY(0)}.dtrans-card:hover{transform:translateY(-6px);border-color:rgba(99,102,241,0.25);box-shadow:0 16px 48px rgba(99,102,241,0.10)}
          .dtrans-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#6366F1;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .dtrans-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .dtrans-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .dtrans-proc{background:linear-gradient(135deg,#fff 0%,#f0f6ff 50%,#fff 100%);padding:80px 40px}
          .dtrans-proc-in{max-width:900px;margin:0 auto}
          .dtrans-steps{display:flex;flex-direction:column;margin-top:44px}
          .dtrans-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(17,65,113,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .dtrans-step:last-child{border-bottom:none}.dtrans-step.visible{opacity:1;transform:translateX(0)}
          .dtrans-snum{font-size:3rem;font-weight:900;color:rgba(99,102,241,0.18);line-height:1;letter-spacing:-2px}
          .dtrans-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .dtrans-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .dtrans-why{background:#fff;padding:80px 40px}.dtrans-why-in{max-width:1280px;margin:0 auto}
          .dtrans-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .dtrans-wcard{background:linear-gradient(135deg,#f0f6ff 0%,#fff 60%,#f0f6ff 100%);border:1px solid rgba(99,102,241,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .dtrans-wcard.visible{opacity:1;transform:translateY(0)}.dtrans-wcard:hover{border-color:rgba(99,102,241,0.22);box-shadow:0 8px 32px rgba(99,102,241,0.07)}
          .dtrans-dot{width:8px;height:8px;border-radius:50%;background:#6366F1;margin-bottom:16px}
          .dtrans-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .dtrans-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .dtrans-faq{background:#f8fafd;padding:80px 40px}.dtrans-faq-in{max-width:860px;margin:0 auto}
          .dtrans-fitem{border-bottom:1px solid #e5e7eb}
          .dtrans-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .dtrans-fq:hover{color:#6366F1}
          .dtrans-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .dtrans-fitem.open .dtrans-ficon{border-color:#6366F1;color:#6366F1;background:rgba(99,102,241,0.06)}
          .dtrans-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .dtrans-fitem.open .dtrans-fa{max-height:600px;padding-bottom:22px}
          .dtrans-cta{background:linear-gradient(135deg,#0F1F40 0%,#114171 50%,#1a3a6e 100%);padding:100px 40px;position:relative;overflow:hidden;text-align:center}
          .dtrans-cta-o{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.15) 0%,transparent 65%);pointer-events:none}
          .dtrans-cta-in{position:relative;z-index:1;max-width:700px;margin:0 auto}
          .dtrans-cta-t{font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#fff;line-height:1.1;margin-bottom:16px}
          .dtrans-cta-s{font-size:1.05rem;color:rgba(255,255,255,0.70);line-height:1.75;margin:0 auto 36px;max-width:520px}
          @media(max-width:1024px){.dtrans-grid{grid-template-columns:repeat(2,1fr)}.dtrans-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.dtrans-hero,.dtrans-svc,.dtrans-proc,.dtrans-why,.dtrans-faq,.dtrans-cta{padding:60px 24px}.dtrans-hero{padding-top:60px;padding-bottom:0}.dtrans-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.dtrans-stat:nth-child(2){border-right:none}.dtrans-grid{grid-template-columns:1fr}.dtrans-why-grid{grid-template-columns:1fr}.dtrans-step{grid-template-columns:56px 1fr}.dtrans-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="dtrans-page">
        <section className="dtrans-hero"><div className="dtrans-o1"/><div className="dtrans-o2"/>
          <div className="dtrans-in">
            <nav className="dtrans-bc"><Link href="/">Home</Link><span>/</span><span style={{color:'#FE9700'}}>Digital Transformation</span></nav>
            <span className="dtrans-badge"><span style={{width:6,height:6,borderRadius:'50%',background:'#a5b4fc',display:'inline-block'}}/> DIGITAL TRANSFORMATION</span>
            <h1 className="dtrans-h1">Modernize Your Business for the <span>Digital Age</span></h1>
            <p className="dtrans-sub">Legacy systems, manual processes, and disconnected tools are holding your business back. We help you transform — from strategy and architecture through implementation and adoption.</p>
            <div className="dtrans-btns">
              <Link href="/contact-us" className="dtrans-btn-p">Start Your Transformation <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/case-studies" className="dtrans-btn-s">View Case Studies</Link>
            </div>
            <div className="dtrans-stats">{STATS.map(s => <div key={s.label} className="dtrans-stat"><div className="dtrans-stat-l">{s.label}</div><div className="dtrans-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="dtrans-svc"><div className="dtrans-svc-in">
          <span className="dtrans-ey2">Our Services</span><h2 className="dtrans-ttl">Digital Transformation Services</h2>
          <p className="dtrans-desc">From cloud migration and process automation to legacy overhauls and API integrations — end-to-end transformation delivered in phases that deliver business value at every milestone.</p>
          <div className="dtrans-grid" ref={cardsRef}>{SERVICES.map((s,i) => <Link key={s.n} href={s.href} className={`dtrans-card${visibleCards.includes(i)?' visible':''}`}><div className="dtrans-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></Link>)}</div>
        </div></section>
        <section className="dtrans-proc"><div className="dtrans-proc-in">
          <span className="dtrans-ey2">How We Work</span><h2 className="dtrans-ttl">Our Transformation Process</h2>
          <p className="dtrans-desc">Assessment to roadmap to iterative delivery — a structured approach that manages risk and delivers business value at every phase.</p>
          <div className="dtrans-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`dtrans-step${visibleSteps.includes(i)?' visible':''}`}><div className="dtrans-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="dtrans-why"><div className="dtrans-why-in">
          <span className="dtrans-ey2">Why 1Solutions</span><h2 className="dtrans-ttl">Business-Led Transformation — Start to Finish</h2>
          <p className="dtrans-desc">Pragmatic, outcome-focused transformation delivered by a team that has done it 150+ times across 40+ industries.</p>
          <div className="dtrans-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`dtrans-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="dtrans-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="dtrans-faq"><div className="dtrans-faq-in">
          <span className="dtrans-ey2">Got Questions?</span><h2 className="dtrans-ttl">Digital Transformation FAQs</h2>
          <p className="dtrans-desc" style={{marginBottom:44}}>Common questions about digital transformation strategy, timelines, and costs.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`dtrans-fitem${openFaq===i?' open':''}`}><button className="dtrans-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="dtrans-ficon">{openFaq===i?'−':'+'}</span></button><div className="dtrans-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="dtrans-cta"><div className="dtrans-cta-o"/>
          <div className="dtrans-cta-in">
            <h2 className="dtrans-cta-t">Ready to Modernize Your Business?</h2>
            <p className="dtrans-cta-s">Tell us about your current systems, your goals, and your constraints — we&rsquo;ll assess where you are and build a transformation roadmap that delivers early wins while building toward your target state.</p>
            <div className="dtrans-btns">
              <Link href="/contact-us" className="dtrans-btn-p">Start Your Transformation <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/case-studies" className="dtrans-btn-s">View Case Studies</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
