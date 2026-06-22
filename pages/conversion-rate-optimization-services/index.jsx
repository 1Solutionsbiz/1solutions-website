import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'CRO Audit & Heuristic Analysis', desc: 'Expert-led CRO audit — reviewing page layout, navigation, CTAs, form design, trust signals, and user journey friction points against established conversion optimisation principles.' },
  { n: '02', title: 'User Behaviour Analysis', desc: 'Heatmap, scroll map, click map, and session recording analysis via Hotjar, Microsoft Clarity, or FullStory — revealing exactly where users drop off, skip, or get confused.' },
  { n: '03', title: 'A/B & Multivariate Testing', desc: 'Hypothesis-driven A/B testing and multivariate experiments — statistically significant test design, implementation via Optimizely, VWO, or Google Optimize, and performance-preserving test execution.' },
  { n: '04', title: 'Landing Page Optimisation', desc: 'Landing page redesign and copy optimisation — headline testing, hero section structure, benefit hierarchy, social proof placement, CTA design, and above-the-fold content strategy.' },
  { n: '05', title: 'Checkout & Form Optimisation', desc: 'Checkout flow simplification, form field reduction, abandoned cart recovery, progress indicator implementation, and checkout trust signal optimisation for ecommerce and lead generation.' },
  { n: '06', title: 'CTA & Copy Testing', desc: 'Button copy, placement, colour, and design testing — combined with headline, subheadline, and value proposition copy optimisation to increase click-through and completion rates.' },
  { n: '07', title: 'UX & Design Improvements', desc: 'User experience improvements informed by data — navigation restructuring, mobile UX fixes, page layout changes, and accessibility improvements that remove conversion blockers at scale.' },
  { n: '08', title: 'Conversion Analytics & Reporting', desc: 'GA4 conversion goal setup, funnel analysis, micro-conversion tracking, and monthly CRO performance reports — with actionable next test recommendations based on current data.' },
];

const TOOLS = ['Google Analytics 4', 'Hotjar', 'Microsoft Clarity', 'Optimizely', 'VWO', 'Google Tag Manager', 'FullStory', 'Unbounce', 'Crazy Egg', 'Lucky Orange', 'Heap Analytics'];

const PROCESS = [
  { step: '01', title: 'Data Collection', desc: 'Quantitative data (GA4 funnels, conversion rates, exit pages) and qualitative data (heatmaps, session recordings, user surveys) to build a complete picture of your conversion barriers.' },
  { step: '02', title: 'Hypothesis Generation', desc: 'From data to testable hypotheses — specific, measurable changes with a predicted outcome and the supporting evidence from step 1.' },
  { step: '03', title: 'Test Prioritisation', desc: 'Hypotheses ranked by potential impact, ease of implementation, and statistical feasibility — ensuring tests are run in the highest-value order.' },
  { step: '04', title: 'Test Design & Launch', desc: 'Test built and launched — with traffic split, sample size calculation, and analytics instrumented correctly before launch.' },
  { step: '05', title: 'Analysis & Decision', desc: 'Statistical significance reached — winner declared, loser archived, learnings documented. No decisions made before significance thresholds are met.' },
  { step: '06', title: 'Iterate & Scale', desc: 'Winning variant becomes the control. New hypothesis generated. The CRO cycle repeats — compounding conversion improvements month after month.' },
];

const WHY = [
  { title: 'Data-First Approach', desc: 'We do not make recommendations based on opinion or aesthetic preference — every hypothesis is grounded in quantitative funnel data and qualitative user behaviour analysis.' },
  { title: 'Statistical Rigour', desc: 'We run tests to statistical significance before declaring winners — 95% confidence threshold as standard. No "test for a week and call it" shortcuts that produce false conclusions.' },
  { title: 'Ecommerce & Lead Gen Expertise', desc: 'CRO strategy differs significantly between ecommerce checkout optimisation and B2B lead generation forms. We bring specific expertise across both contexts.' },
  { title: 'SEO-Aware CRO', desc: 'CRO changes can inadvertently damage SEO — removing content, changing URL structures, or altering structured data. Our CRO work is always reviewed for SEO impact before deployment.' },
  { title: 'Full Funnel Focus', desc: 'Conversion optimisation covers the full funnel — ad landing page, website journey, and checkout or lead form — not just individual page elements in isolation.' },
  { title: 'Transparent Reporting', desc: 'Every month: what we tested, what the results were, what we learned, and what we\'re testing next. Full transparency on test outcomes — including failed tests that still generate learning.' },
];

const FAQS = [
  { q: 'What is conversion rate optimisation (CRO)?', a: 'Conversion rate optimisation (CRO) is the systematic practice of increasing the percentage of website visitors who complete a desired action — a purchase, enquiry form submission, phone call, email sign-up, or other goal. CRO uses data analysis (quantitative analytics + qualitative user research), hypothesis generation, and controlled A/B or multivariate testing to make evidence-based improvements to pages, funnels, and user journeys — improving conversion rate without necessarily increasing traffic.' },
  { q: 'How is CRO different from UX design?', a: 'CRO and UX overlap significantly but differ in approach. UX design is typically a creative and strategic discipline focused on the entire user experience — often without controlled testing to validate individual changes. CRO is a scientific discipline focused specifically on conversion metrics — hypothesising that a specific change will increase conversion rate and testing that hypothesis in a controlled experiment. Good CRO uses UX principles to generate hypotheses and A/B testing to validate them with statistical confidence. We combine both — UX-informed ideation and rigorous A/B test validation.' },
  { q: 'What conversion rate is "good"?', a: 'Conversion rates vary enormously by industry, traffic source, and conversion type. Ecommerce conversion rates typically range from 1% to 4% for direct purchases; lead generation forms for B2B can range from 2% to 10% depending on the ask. Averages matter less than your own baseline — our goal is to improve YOUR conversion rate relative to your current performance. A 25% relative improvement to a 1% conversion rate (to 1.25%) is meaningful regardless of what the industry average is.' },
  { q: 'How long does CRO take to show results?', a: 'CRO test results depend on traffic volume and the size of the conversion rate difference being detected. Low-traffic sites need to run tests for longer to reach statistical significance — sometimes 4 to 8 weeks per test. High-traffic sites can reach significance in 1 to 2 weeks. The minimum traffic requirement for reliable A/B test results is approximately 1,000 conversions per variant — so a page receiving 10,000 sessions with a 5% conversion rate (500 conversions) needs at minimum 2 test cycles before reaching significance. We calculate required sample sizes before starting tests so you know the timeline upfront.' },
  { q: 'What pages should be prioritised for CRO?', a: 'Prioritise pages by: traffic volume × conversion impact potential. The highest-value CRO targets are typically: checkout pages (high traffic, direct revenue impact); primary landing pages from paid traffic (high spend at risk); lead generation forms (direct pipeline impact); product pages for your top-selling products; and homepage or key category pages with high exit rates. We use GA4 funnel analysis to identify where the largest conversion gaps exist in your specific user journey.' },
  { q: 'Do I need CRO or do I need better traffic?', a: 'Both matter, but CRO improves the return on ALL your traffic channels simultaneously. Doubling your traffic costs twice as much. Doubling your conversion rate from 1% to 2% doubles your revenue from the same traffic spend. CRO is typically the higher ROI investment once you have meaningful traffic volume (at least 10,000 sessions/month to test effectively). If you are still building traffic, focus on SEO and paid channels first — CRO has diminishing value below the traffic threshold needed for statistically reliable testing.' },
  { q: 'Can CRO damage SEO?', a: 'Poorly executed CRO can inadvertently damage SEO — for example, removing content that contains target keywords, changing URL structures, or altering structured data incorrectly. Well-executed CRO avoids these risks. Our CRO team works alongside our SEO team — all significant page changes are reviewed for SEO impact before deployment. Specifically, we ensure: content changes maintain keyword relevance; A/B test JavaScript does not interfere with Googlebot rendering; winning variants replace the original cleanly without creating duplicate content; and meta data is preserved across test variants.' },
  { q: 'What is the minimum traffic needed for CRO testing?', a: 'Effective A/B testing requires sufficient statistical power. As a general guide: you need at least 1,000 conversions per variant to detect a 20% relative improvement with 95% confidence. This means: if your landing page converts at 3%, you need approximately 33,000 sessions to run a valid test detecting a 20% lift. Lower traffic sites are not excluded from CRO — but testing cycles are longer, and some test types (multivariate with many combinations) are not statistically feasible. For lower-traffic sites we focus on high-impact single-variable tests and qualitative CRO (heuristic audits, user testing) rather than statistical A/B testing.' },
];

const STATS = [
  { label: 'Avg Conversion Rate Lift', val: '+38%' },
  { label: 'CRO Clients Served', val: '150+' },
  { label: 'A/B Tests Run', val: '600+' },
  { label: 'Client Retention', val: '91%' },
];

export default function ConversionRateOptimizationServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);

  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);

  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/digital-marketing-services/' }, { '@type': 'ListItem', position: 3, name: 'Conversion Rate Optimisation', item: 'https://www.1solutions.biz/conversion-rate-optimization-services/' }] }, { '@type': 'Service', name: 'Conversion Rate Optimisation Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Conversion Rate Optimisation', url: 'https://www.1solutions.biz/conversion-rate-optimization-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };

  return (
    <>
      <Head>
        <title>Conversion Rate Optimisation (CRO) Services | A/B Testing Agency | 1Solutions</title>
        <meta name="description" content="Conversion rate optimisation services — A/B testing, heatmap analysis, landing page optimisation, and checkout CRO. Data-driven CRO that grows revenue from existing traffic." />
        <meta name="keywords" content="conversion rate optimization services, cro services, a/b testing agency, cro agency, landing page optimization, checkout optimization, cro audit" />
        <link rel="canonical" href="https://www.1solutions.biz/conversion-rate-optimization-services/" />
        <meta property="og:title" content="Conversion Rate Optimisation Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/conversion-rate-optimization-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .cro-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .cro-page *,.cro-page *::before,.cro-page *::after{box-sizing:border-box}
          .cro-hero{background:linear-gradient(135deg,#fff1f2 0%,#fecdd3 25%,#ffe4e6 60%,#fff5f6 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .cro-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(225,29,72,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .cro-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(136,19,55,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .cro-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .cro-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .cro-bc a{color:#6b7280;text-decoration:none}.cro-bc a:hover{color:#E11D48}.cro-bc span{color:#d1d5db}
          .cro-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(225,29,72,0.08);border:1px solid rgba(225,29,72,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#BE123C;margin-bottom:28px}
          .cro-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#881337 0%,#E11D48 50%,#9F1239 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .cro-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .cro-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .cro-btn-p{display:inline-flex;align-items:center;gap:8px;background:#E11D48;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(225,29,72,0.28)}
          .cro-btn-p:hover{background:#BE123C;box-shadow:0 8px 32px rgba(225,29,72,0.38);transform:translateY(-2px)}
          .cro-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .cro-btn-s:hover{border-color:#E11D48;color:#E11D48;transform:translateY(-2px)}
          .cro-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(225,29,72,0.07)}
          .cro-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(225,29,72,0.08)}.cro-stat:last-child{border-right:none}
          .cro-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .cro-stat-v{font-size:1.6rem;font-weight:900;color:#E11D48;letter-spacing:-0.5px}
          .cro-svc{background:#f8fafd;padding:80px 40px}.cro-svc-in{max-width:1280px;margin:0 auto}
          .cro-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#E11D48;margin-bottom:10px;display:block}
          .cro-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#881337 0%,#E11D48 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .cro-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .cro-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .cro-card{background:linear-gradient(135deg,rgba(255,241,242,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(254,205,211,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(225,29,72,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .cro-card.visible{opacity:1;transform:translateY(0)}.cro-card:hover{transform:translateY(-6px);border-color:rgba(225,29,72,0.22);box-shadow:0 16px 48px rgba(225,29,72,0.09)}
          .cro-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#E11D48;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .cro-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .cro-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .cro-tools{background:linear-gradient(135deg,#881337 0%,#E11D48 100%);padding:60px 40px}
          .cro-tools-in{max-width:1280px;margin:0 auto;text-align:center}
          .cro-tools h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .cro-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .cro-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .cro-proc{background:linear-gradient(135deg,#fff1f2 0%,#fff5f6 50%,#fecdd3 100%);padding:80px 40px}
          .cro-proc-in{max-width:900px;margin:0 auto}
          .cro-steps{display:flex;flex-direction:column;margin-top:44px}
          .cro-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(225,29,72,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .cro-step:last-child{border-bottom:none}.cro-step.visible{opacity:1;transform:translateX(0)}
          .cro-snum{font-size:3rem;font-weight:900;color:rgba(225,29,72,0.15);line-height:1;letter-spacing:-2px}
          .cro-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .cro-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .cro-why{background:#fff;padding:80px 40px}.cro-why-in{max-width:1280px;margin:0 auto}
          .cro-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .cro-wcard{background:linear-gradient(135deg,#fff1f2 0%,#fff 60%,#fecdd3 100%);border:1px solid rgba(225,29,72,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .cro-wcard.visible{opacity:1;transform:translateY(0)}.cro-wcard:hover{border-color:rgba(225,29,72,0.20);box-shadow:0 8px 32px rgba(225,29,72,0.07)}
          .cro-dot{width:8px;height:8px;border-radius:50%;background:#E11D48;margin-bottom:16px}
          .cro-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .cro-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .cro-faq{background:#f8fafd;padding:80px 40px}.cro-faq-in{max-width:860px;margin:0 auto}
          .cro-fitem{border-bottom:1px solid #e5e7eb}
          .cro-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .cro-fq:hover{color:#E11D48}
          .cro-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .cro-fitem.open .cro-ficon{border-color:#E11D48;color:#E11D48;background:rgba(225,29,72,0.06)}
          .cro-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .cro-fitem.open .cro-fa{max-height:500px;padding-bottom:22px}
          .cro-cta{background:linear-gradient(135deg,rgba(225,29,72,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(136,19,55,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .cro-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(225,29,72,0.10) 0%,transparent 70%);pointer-events:none}
          .cro-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(136,19,55,0.08) 0%,transparent 70%);pointer-events:none}
          .cro-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .cro-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#881337 0%,#E11D48 50%,#9F1239 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .cro-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .cro-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.cro-grid{grid-template-columns:repeat(2,1fr)}.cro-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.cro-hero,.cro-svc,.cro-tools,.cro-proc,.cro-why,.cro-faq,.cro-cta{padding:60px 24px}.cro-hero{padding-top:60px;padding-bottom:0}.cro-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.cro-stat:nth-child(2){border-right:none}.cro-grid{grid-template-columns:1fr}.cro-why-grid{grid-template-columns:1fr}.cro-step{grid-template-columns:56px 1fr}.cro-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="cro-page">
        <section className="cro-hero"><div className="cro-o1"/><div className="cro-o2"/>
          <div className="cro-in">
            <nav className="cro-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO &amp; Marketing</Link><span>/</span><span style={{color:'#E11D48'}}>Conversion Rate Optimisation</span></nav>
            <span className="cro-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#E11D48',display:'inline-block'}}/> A/B Testing · Heatmaps · Landing Pages</span>
            <h1 className="cro-h1">Conversion Rate Optimisation Services — More Revenue from Your Existing Traffic</h1>
            <p className="cro-sub">Data-driven CRO — A/B testing, user behaviour analysis, landing page optimisation, and checkout improvement — that increases conversion rate without increasing ad spend.</p>
            <div className="cro-btns">
              <Link href="/contact" className="cro-btn-p">Get a CRO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-audit-services" className="cro-btn-s">SEO Audit</Link>
            </div>
            <div className="cro-stats">{STATS.map(s => <div key={s.label} className="cro-stat"><div className="cro-stat-l">{s.label}</div><div className="cro-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="cro-svc"><div className="cro-svc-in">
          <span className="cro-ey2">What We Do</span><h2 className="cro-ttl">Conversion Rate Optimisation Services</h2>
          <p className="cro-desc">CRO audit to A/B testing to checkout optimisation — a systematic, data-first process that turns more visitors into customers.</p>
          <div className="cro-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`cro-card${visibleCards.includes(i)?' visible':''}`}><div className="cro-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="cro-tools"><div className="cro-tools-in">
          <h2>Tools &amp; Technology Stack</h2>
          <div className="cro-pills">{TOOLS.map(c => <span key={c} className="cro-pill">{c}</span>)}</div>
        </div></section>
        <section className="cro-proc"><div className="cro-proc-in">
          <span className="cro-ey2">How We Work</span><h2 className="cro-ttl">Our CRO Process</h2>
          <p className="cro-desc">Data to hypothesis to test to statistical decision — a rigorous cycle that compounds conversion improvements month after month with evidence, not opinion.</p>
          <div className="cro-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`cro-step${visibleSteps.includes(i)?' visible':''}`}><div className="cro-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="cro-why"><div className="cro-why-in">
          <span className="cro-ey2">Why 1Solutions</span><h2 className="cro-ttl">Data-Driven CRO, Not Gut-Feel Redesigns</h2>
          <p className="cro-desc">We test before we declare winners, run to statistical significance, and report transparently — including failed tests that still generate learning.</p>
          <div className="cro-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`cro-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="cro-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="cro-faq"><div className="cro-faq-in">
          <span className="cro-ey2">Got Questions?</span><h2 className="cro-ttl">CRO FAQs</h2>
          <p className="cro-desc">Answers to the most common questions about conversion rate optimisation and A/B testing.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`cro-fitem${openFaq===i?' open':''}`}><button className="cro-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="cro-ficon">{openFaq===i?'−':'+'}</span></button><div className="cro-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="cro-cta"><div className="cro-cta-o1"/><div className="cro-cta-o2"/>
          <div className="cro-cta-in">
            <span className="cro-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Convert More of Your Existing Traffic?</span>
            <h2 className="cro-cta-t">Get Your CRO Audit</h2>
            <p className="cro-cta-s">We&rsquo;ll review your conversion funnel, identify your biggest drop-off points, and prioritise the tests most likely to move your conversion rate — starting with a free CRO audit.</p>
            <div className="cro-cta-btns">
              <Link href="/contact" className="cro-btn-p">Get Free CRO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-services-company" className="cro-btn-s">SEO Services Overview</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
