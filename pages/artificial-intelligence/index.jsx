import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Custom AI Model Development', desc: 'Building, training, and deploying custom machine learning models for your specific use case — classification, regression, recommendation, anomaly detection, forecasting, and ranking models trained on your data.', href: '/contact-us' },
  { n: '02', title: 'Natural Language Processing (NLP)', desc: 'Text classification, sentiment analysis, entity recognition, document parsing, chatbots, and language models — NLP solutions that extract value from unstructured text data at scale.', href: '/contact-us' },
  { n: '03', title: 'Computer Vision', desc: 'Image and video analysis solutions — object detection, image classification, OCR, defect detection, and visual inspection — for manufacturing quality control, retail, security, and healthcare applications.', href: '/contact-us' },
  { n: '04', title: 'Generative AI Integration', desc: 'Integrating large language models (GPT-4, Claude, Gemini) and image generation APIs into products and workflows — AI content generation, document summarisation, code generation, and intelligent assistants built on foundation models.', href: '/contact-us' },
  { n: '05', title: 'AI-Powered Automation', desc: 'Automating complex decision-making processes that previously required human judgement — document processing, approval workflows, fraud detection, customer support routing, and intelligent data extraction.', href: '/contact-us' },
  { n: '06', title: 'Predictive Analytics', desc: 'Forecasting models for demand prediction, churn prediction, pricing optimisation, inventory management, and financial modelling — turning historical data into forward-looking intelligence that improves operational decisions.', href: '/contact-us' },
  { n: '07', title: 'Recommendation Systems', desc: 'Personalisation engines for ecommerce, content platforms, and SaaS products — collaborative filtering, content-based filtering, and hybrid recommendation models that increase engagement and revenue per user.', href: '/contact-us' },
  { n: '08', title: 'AI Strategy & Consulting', desc: 'Identifying the highest-value AI opportunities in your business, assessing data readiness, selecting the right approaches, and building a phased AI roadmap — for organisations that want to invest in AI strategically rather than ad hoc.', href: '/contact-us' },
];

const PROCESS = [
  { step: '01', title: 'Use Case Discovery', desc: 'Identifying specific, high-value AI opportunities in your business — where AI can reduce cost, increase revenue, or improve quality — and prioritising by impact and feasibility given your data and constraints.' },
  { step: '02', title: 'Data Assessment', desc: 'Evaluating your available data — volume, quality, labelling, and structure — and identifying what data preparation, collection, or labelling is required before model development can begin.' },
  { step: '03', title: 'Proof of Concept', desc: 'Building a lightweight proof of concept to validate the core AI hypothesis before full investment — demonstrating that the approach works on your data before committing to production development.' },
  { step: '04', title: 'Model Development & Training', desc: 'Full model development, feature engineering, training, validation, and iteration — with clear performance metrics agreed before development begins and transparent reporting on model performance throughout.' },
  { step: '05', title: 'Integration & Deployment', desc: 'Integrating the AI model into your product or workflow — API development, real-time or batch inference infrastructure, monitoring, and logging — deployed to cloud infrastructure that scales with usage.' },
  { step: '06', title: 'Monitoring & Improvement', desc: 'Post-deployment model monitoring for performance drift, data distribution shifts, and edge cases — with scheduled retraining cycles to maintain model accuracy as your data evolves.' },
];

const WHY = [
  { title: 'Engineering-First Approach', desc: 'We build AI solutions that work in production — reliable, scalable, and maintainable — not impressive demos that fail under real-world conditions. Every model we build is designed for deployment, monitoring, and long-term operation from day one.' },
  { title: 'Data-Realistic', desc: 'We are honest about what AI can and cannot do with your data. If your data volume or quality is not sufficient for the approach you are considering, we tell you — and recommend what data investments would enable the AI capability you want.' },
  { title: 'Business-Outcome Focus', desc: 'We measure AI projects against business outcomes — cost saved, revenue generated, time reduced, accuracy improved — not against academic performance metrics that do not connect to your goals.' },
  { title: 'Full-Stack AI Delivery', desc: 'From use case discovery and data preparation through model development, API integration, and deployment infrastructure — we deliver complete AI solutions, not just models that need a separate engineering team to deploy.' },
  { title: 'Responsible AI Practices', desc: 'We build AI solutions with fairness, transparency, and reliability in mind — including bias evaluation, explainability where required, and robust testing across edge cases and demographic groups.' },
];

const FAQS = [
  { q: 'What types of AI solutions do you build?', a: 'We build a wide range of AI solutions depending on business needs: machine learning models for prediction and classification, NLP solutions for text analysis and document processing, computer vision for image and video analysis, generative AI integrations using large language models, recommendation systems for personalisation, and AI automation for complex decision-making workflows. We work across both product AI (embedded in software products) and operational AI (automating internal business processes).' },
  { q: 'Do I need a lot of data to use AI?', a: 'It depends on the approach. Traditional machine learning models typically require thousands to hundreds of thousands of labelled examples. Deep learning models require significantly more. However, fine-tuning foundation models (GPT, Claude) or using retrieval-augmented generation can deliver powerful AI capabilities with much smaller datasets. We assess your data situation early and recommend approaches that are appropriate for what you have — or advise on data collection strategies to enable the AI capability you want.' },
  { q: 'How long does an AI project take?', a: 'A proof of concept for a focused use case typically takes 4 to 8 weeks. A production AI model with integration and deployment takes 3 to 6 months depending on complexity and data readiness. Enterprise AI platforms or multi-model systems take 6 to 18+ months. We scope projects after the discovery and data assessment phase — timeline estimates before that point are not reliable.' },
  { q: 'What is the difference between AI and automation?', a: 'Traditional automation (RPA, workflow tools) follows explicit rules — if X then Y. It handles structured, predictable processes well. AI adds the ability to handle unstructured data, make probabilistic judgements, learn from data, and adapt to variation — the things that rule-based systems cannot handle. In practice, the most effective solutions combine both: AI for the judgement layer, automation for the execution layer.' },
  { q: 'Can you integrate AI into our existing systems?', a: 'Yes. Most of our AI projects involve integrating models into existing products, CRMs, ERPs, or workflows via APIs. We design AI integrations that work with your current architecture — adding intelligent capabilities to what you have rather than requiring a complete rebuild. Common integrations include Salesforce, HubSpot, Shopify, WooCommerce, custom web applications, and enterprise software via REST APIs.' },
  { q: 'How do you ensure AI model accuracy and reliability?', a: 'We start by agreeing performance targets before development begins — precision, recall, accuracy, and business-level metrics specific to the use case. We use hold-out test sets and cross-validation to evaluate model performance on unseen data. After deployment, we monitor model performance in production, track data distribution shifts, and schedule retraining cycles. We also implement confidence thresholds and human-in-the-loop fallbacks for high-stakes decisions.' },
];

const STATS = [
  { label: 'AI Projects', val: '50+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Industries', val: '40+' },
  { label: 'Client Retention', val: '97%' },
];

export default function ArtificialIntelligence() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'AI Solutions', item: 'https://www.1solutions.biz/artificial-intelligence/' }] }, { '@type': 'Service', name: 'AI Solutions & Development Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Artificial Intelligence', url: 'https://www.1solutions.biz/artificial-intelligence/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>AI Solutions & Development Services | Machine Learning & Automation | 1Solutions</title>
        <meta name="description" content="AI development services — machine learning models, NLP, computer vision, AI automation, and custom AI integrations. Build intelligent products and automate complex processes with AI." />
        <meta name="keywords" content="ai solutions, machine learning development, nlp services, computer vision, generative ai integration, artificial intelligence company india" />
        <link rel="canonical" href="https://www.1solutions.biz/artificial-intelligence/" />
        <meta property="og:title" content="AI Solutions & Development Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/artificial-intelligence/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .aisol-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .aisol-page *,.aisol-page *::before,.aisol-page *::after{box-sizing:border-box}
          .aisol-hero{background:linear-gradient(135deg,#0F1F40 0%,#0c2340 40%,#0e3a5c 80%,#0F1F40 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .aisol-o1{position:absolute;top:-100px;right:-100px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,0.20) 0%,transparent 65%);pointer-events:none;filter:blur(40px)}
          .aisol-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(254,151,0,0.08) 0%,transparent 65%);pointer-events:none;filter:blur(40px)}
          .aisol-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .aisol-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:24px;font-weight:500}
          .aisol-bc a{color:rgba(255,255,255,0.5);text-decoration:none}.aisol-bc a:hover{color:#FE9700}.aisol-bc span{color:rgba(255,255,255,0.25)}
          .aisol-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(14,165,233,0.15);border:1px solid rgba(14,165,233,0.35);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#7dd3fc;margin-bottom:28px}
          .aisol-h1{font-size:clamp(2.4rem,5vw,4rem);font-weight:900;line-height:1.05;letter-spacing:-1.5px;color:#fff;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .aisol-h1 span{background:linear-gradient(90deg,#FE9700 0%,#FFC14D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .aisol-sub{font-size:1.08rem;color:rgba(255,255,255,0.70);line-height:1.75;max-width:660px;margin:0 auto 36px}
          .aisol-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .aisol-btn-p{display:inline-flex;align-items:center;gap:8px;background:#FE9700;color:#fff;padding:15px 32px;border-radius:50px;font-weight:800;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(254,151,0,0.35)}
          .aisol-btn-p:hover{background:#e08700;box-shadow:0 8px 36px rgba(254,151,0,0.50);transform:translateY(-2px)}
          .aisol-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.22);color:#fff;padding:15px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .aisol-btn-s:hover{border-color:rgba(254,151,0,0.60);background:rgba(254,151,0,0.10);transform:translateY(-2px)}
          .aisol-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.06);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.10);border-radius:20px 20px 0 0}
          .aisol-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(255,255,255,0.07)}.aisol-stat:last-child{border-right:none}
          .aisol-stat-l{font-size:11px;color:rgba(255,255,255,0.45);font-weight:500;margin-bottom:4px}
          .aisol-stat-v{font-size:1.6rem;font-weight:900;color:#FE9700;letter-spacing:-0.5px}
          .aisol-svc{background:#f8fafd;padding:80px 40px}.aisol-svc-in{max-width:1280px;margin:0 auto}
          .aisol-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0EA5E9;margin-bottom:10px;display:block}
          .aisol-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F1F40 0%,#114171 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .aisol-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .aisol-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .aisol-card{background:linear-gradient(135deg,rgba(240,249,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(240,249,255,0.25) 100%);border:1px solid rgba(14,165,233,0.10);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(14,165,233,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease;text-decoration:none;display:block}
          .aisol-card.visible{opacity:1;transform:translateY(0)}.aisol-card:hover{transform:translateY(-6px);border-color:rgba(14,165,233,0.25);box-shadow:0 16px 48px rgba(14,165,233,0.10)}
          .aisol-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0EA5E9;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .aisol-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .aisol-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .aisol-proc{background:linear-gradient(135deg,#fff 0%,#f0f9ff 50%,#fff 100%);padding:80px 40px}
          .aisol-proc-in{max-width:900px;margin:0 auto}
          .aisol-steps{display:flex;flex-direction:column;margin-top:44px}
          .aisol-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(14,165,233,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .aisol-step:last-child{border-bottom:none}.aisol-step.visible{opacity:1;transform:translateX(0)}
          .aisol-snum{font-size:3rem;font-weight:900;color:rgba(14,165,233,0.18);line-height:1;letter-spacing:-2px}
          .aisol-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .aisol-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .aisol-why{background:#fff;padding:80px 40px}.aisol-why-in{max-width:1280px;margin:0 auto}
          .aisol-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .aisol-wcard{background:linear-gradient(135deg,#f0f9ff 0%,#fff 60%,#f0f9ff 100%);border:1px solid rgba(14,165,233,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .aisol-wcard.visible{opacity:1;transform:translateY(0)}.aisol-wcard:hover{border-color:rgba(14,165,233,0.22);box-shadow:0 8px 32px rgba(14,165,233,0.07)}
          .aisol-dot{width:8px;height:8px;border-radius:50%;background:#0EA5E9;margin-bottom:16px}
          .aisol-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .aisol-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .aisol-faq{background:#f8fafd;padding:80px 40px}.aisol-faq-in{max-width:860px;margin:0 auto}
          .aisol-fitem{border-bottom:1px solid #e5e7eb}
          .aisol-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .aisol-fq:hover{color:#0EA5E9}
          .aisol-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .aisol-fitem.open .aisol-ficon{border-color:#0EA5E9;color:#0EA5E9;background:rgba(14,165,233,0.06)}
          .aisol-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .aisol-fitem.open .aisol-fa{max-height:600px;padding-bottom:22px}
          .aisol-cta{background:linear-gradient(135deg,#0F1F40 0%,#0c2e4a 50%,#0e3a5c 100%);padding:100px 40px;position:relative;overflow:hidden;text-align:center}
          .aisol-cta-o{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,0.12) 0%,transparent 65%);pointer-events:none}
          .aisol-cta-in{position:relative;z-index:1;max-width:700px;margin:0 auto}
          .aisol-cta-t{font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#fff;line-height:1.1;margin-bottom:16px}
          .aisol-cta-s{font-size:1.05rem;color:rgba(255,255,255,0.70);line-height:1.75;margin:0 auto 36px;max-width:520px}
          @media(max-width:1024px){.aisol-grid{grid-template-columns:repeat(2,1fr)}.aisol-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.aisol-hero,.aisol-svc,.aisol-proc,.aisol-why,.aisol-faq,.aisol-cta{padding:60px 24px}.aisol-hero{padding-top:60px;padding-bottom:0}.aisol-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.aisol-stat:nth-child(2){border-right:none}.aisol-grid{grid-template-columns:1fr}.aisol-why-grid{grid-template-columns:1fr}.aisol-step{grid-template-columns:56px 1fr}.aisol-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="aisol-page">
        <section className="aisol-hero"><div className="aisol-o1"/><div className="aisol-o2"/>
          <div className="aisol-in">
            <nav className="aisol-bc"><Link href="/">Home</Link><span>/</span><span style={{color:'#FE9700'}}>AI Solutions</span></nav>
            <span className="aisol-badge"><span style={{width:6,height:6,borderRadius:'50%',background:'#7dd3fc',display:'inline-block'}}/> ARTIFICIAL INTELLIGENCE</span>
            <h1 className="aisol-h1">Build Smarter Products with <span>AI Solutions</span></h1>
            <p className="aisol-sub">From machine learning models and NLP to computer vision and AI automation — we help businesses integrate artificial intelligence into products, workflows, and decisions that drive measurable outcomes.</p>
            <div className="aisol-btns">
              <Link href="/contact-us" className="aisol-btn-p">Explore AI Solutions <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/case-studies" className="aisol-btn-s">View Our Work</Link>
            </div>
            <div className="aisol-stats">{STATS.map(s => <div key={s.label} className="aisol-stat"><div className="aisol-stat-l">{s.label}</div><div className="aisol-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="aisol-svc"><div className="aisol-svc-in">
          <span className="aisol-ey2">Our Services</span><h2 className="aisol-ttl">AI Development Services</h2>
          <p className="aisol-desc">Custom ML models, NLP, computer vision, generative AI integrations, predictive analytics, and AI automation — end-to-end AI delivery from use case discovery to production deployment.</p>
          <div className="aisol-grid" ref={cardsRef}>{SERVICES.map((s,i) => <Link key={s.n} href={s.href} className={`aisol-card${visibleCards.includes(i)?' visible':''}`}><div className="aisol-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></Link>)}</div>
        </div></section>
        <section className="aisol-proc"><div className="aisol-proc-in">
          <span className="aisol-ey2">How We Work</span><h2 className="aisol-ttl">Our AI Development Process</h2>
          <p className="aisol-desc">Discovery to proof of concept to production — a structured approach that validates AI assumptions before full investment and ensures models perform in the real world.</p>
          <div className="aisol-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`aisol-step${visibleSteps.includes(i)?' visible':''}`}><div className="aisol-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="aisol-why"><div className="aisol-why-in">
          <span className="aisol-ey2">Why 1Solutions</span><h2 className="aisol-ttl">AI That Works in Production — Not Just in Demos</h2>
          <p className="aisol-desc">Engineering-first AI delivery with a focus on business outcomes, data realism, and long-term reliability.</p>
          <div className="aisol-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`aisol-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="aisol-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="aisol-faq"><div className="aisol-faq-in">
          <span className="aisol-ey2">Got Questions?</span><h2 className="aisol-ttl">AI Solutions FAQs</h2>
          <p className="aisol-desc" style={{marginBottom:44}}>Common questions about AI development, data requirements, timelines, and integration.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`aisol-fitem${openFaq===i?' open':''}`}><button className="aisol-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="aisol-ficon">{openFaq===i?'−':'+'}</span></button><div className="aisol-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="aisol-cta"><div className="aisol-cta-o"/>
          <div className="aisol-cta-in">
            <h2 className="aisol-cta-t">Ready to Build with AI?</h2>
            <p className="aisol-cta-s">Tell us your use case, your data situation, and your goals — we&rsquo;ll assess feasibility, recommend the right approach, and scope a proof of concept that validates the AI before full investment.</p>
            <div className="aisol-btns">
              <Link href="/contact-us" className="aisol-btn-p">Explore AI Solutions <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/case-studies" className="aisol-btn-s">View Our Work</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
