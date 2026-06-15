import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#002d3d';
const SERVICES = [
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'GA4 Implementation & Audit', desc: 'Full GA4 setup with custom event tracking, conversion goals, audience configuration, and cross-domain tracking — or a forensic audit of your existing GA4 property to fix missing data and incorrect attribution.' },
  { icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', title: 'Conversion Funnel Analysis', desc: 'Step-by-step funnel visualisation identifying where visitors drop off between awareness and conversion — with session data, heatmaps, and scroll depth correlated to each drop-off point.' },
  { icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title: 'Heatmap & Session Recording', desc: 'Click heatmaps, scroll depth maps, and session recordings using tools like Hotjar or Microsoft Clarity — revealing exactly how users interact with your pages and where they get stuck.' },
  { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: 'A/B & Multivariate Testing', desc: 'Structured A/B tests and multivariate experiments built around data-backed hypotheses — not guesses — with statistical significance monitoring and winning variant implementation.' },
  { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', title: 'Landing Page CRO', desc: 'Landing page analysis covering headline clarity, value proposition, trust signals, CTA placement, form friction, and page speed — with prioritised recommendations and A/B test designs.' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'Checkout Optimisation', desc: 'eCommerce checkout funnel analysis — cart-to-payment drop-off identification, payment option audit, form field reduction, trust signal placement, and mobile checkout experience improvements.' },
  { icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'GTM (Google Tag Manager) Setup', desc: 'Complete GTM container setup, tag migration, trigger configuration, and variable management — enabling reliable tracking across GA4, Meta Pixel, LinkedIn Insight Tag, and ad platform conversion tags.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'CRO Reporting & Insights', desc: 'Monthly CRO report — conversion rate by page, test results, funnel performance, revenue impact of optimisations completed, and next-quarter test roadmap — in plain English.' },
];
const RESULTS = [
  { metric: '74%', label: 'Improvement in checkout completion', sub: 'US eCommerce brand', color: '#38b2c8' },
  { metric: '2.4×', label: 'Lead form submissions', sub: 'AU professional services — CRO', color: '#63cfe0' },
  { metric: '41%', label: 'Lower bounce rate', sub: 'Canadian SaaS landing page', color: '#90e4f0' },
];
const PROCESS = [
  { n: '01', title: 'Analytics Audit', desc: 'We audit your GA4 setup, conversion tracking, data accuracy, and existing reporting — identifying missing events, duplicate tracking, attribution errors, and data gaps before any testing begins.' },
  { n: '02', title: 'Data Collection Setup', desc: 'GTM implementation, GA4 events, enhanced eCommerce tracking, heatmap tool installation, and session recording configuration — all verified and tested.' },
  { n: '03', title: 'Funnel Analysis', desc: 'Step-by-step funnel analysis combining quantitative data (GA4, heatmaps) with qualitative data (session recordings, surveys) to identify the highest-impact conversion opportunities.' },
  { n: '04', title: 'Hypothesis Generation', desc: 'Prioritised test roadmap based on funnel data — each hypothesis scored by potential impact, confidence level, and ease of implementation, so testing effort is focused where it matters most.' },
  { n: '05', title: 'A/B Test Build', desc: 'Tests designed, built, and QA-tested across devices and browsers — with minimum sample size calculated before launch to ensure statistical validity and reliable results.' },
  { n: '06', title: 'Measure & Scale', desc: 'Results analysed for statistical significance, winning variants implemented, learnings documented, and the next test prioritised — a continuous improvement cycle that compounds over time.' },
];
const WHY = [
  { title: 'GA4 Specialists', desc: 'We implement, audit, and configure GA4 accounts properly — custom events, enhanced measurement, conversion goals, audience segments, and Looker Studio dashboards built to your reporting needs.' },
  { title: 'Testing-First Culture', desc: 'We do not guess what will improve conversion rates. Every change is hypothesised from data, tested rigorously, and implemented only when the numbers are statistically significant.' },
  { title: 'Data You Can Trust', desc: 'Accurate tracking is the foundation of good decisions. We fix tracking issues before drawing conclusions — no CRO work is built on corrupted or incomplete data.' },
  { title: 'Qualitative + Quantitative', desc: 'We combine GA4 funnel data with heatmaps, session recordings, and user surveys — because numbers tell you what is happening, and qualitative data tells you why.' },
  { title: 'No Vanity Metrics', desc: 'We measure what matters — conversion rate, revenue per visitor, cost per acquisition, and checkout completion — not sessions, bounce rate, and other metrics that do not drive business outcomes.' },
  { title: 'Integrated with SEO & Ads', desc: 'CRO improvements benefit every traffic source simultaneously. We align landing page optimisation with SEO and paid media teams so improvements compound across all channels.' },
];
const FAQS = [
  { q: 'What is the difference between GA4 and Universal Analytics?', a: 'Universal Analytics (UA) used a session-based data model and was sunset by Google in July 2023. GA4 uses an event-based data model that tracks every user interaction as an event — giving far more flexibility for custom tracking. GA4 also includes cross-device reporting, machine learning insights, and native BigQuery integration. If you are still relying on UA data, you need a proper GA4 setup.' },
  { q: 'How much traffic do I need before A/B testing works?', a: 'Reliable A/B tests require enough traffic to reach statistical significance — typically 500 to 1,000 conversions per variant over 2 to 4 weeks. For low-traffic pages, we use alternative methods — user testing, session recordings, expert reviews, and multivariate testing with smaller samples. We calculate required sample sizes before launching any test.' },
  { q: 'Should I focus on CRO or PPC to grow revenue?', a: 'CRO improves the return on every traffic source simultaneously — including paid, organic, email, and social. A 20% improvement in conversion rate is equivalent to a 20% reduction in cost per acquisition across all channels. We recommend CRO as a priority investment because the benefits compound and are permanent, whereas stopping PPC stops the results.' },
  { q: 'What is Google Tag Manager and do I need it?', a: 'Google Tag Manager (GTM) is a tag management system that lets you deploy and manage tracking codes (Google Ads, GA4, Meta Pixel, LinkedIn, etc.) without editing your website code for each change. GTM is not strictly required — tracking can be hardcoded — but it is strongly recommended because it gives your marketing team the ability to deploy and update tags quickly without relying on developers.' },
  { q: 'How long before CRO testing shows results?', a: 'Individual A/B tests require 2 to 6 weeks to reach statistical significance depending on traffic volume and conversion rate. Over 3 to 6 months of continuous testing, most programs deliver 20 to 40% improvement in conversion rate from compounding wins. CRO is a continuous process — not a one-time fix.' },
  { q: 'What tools do you use for CRO?', a: 'We use GA4 and Looker Studio for quantitative analysis, Hotjar or Microsoft Clarity for heatmaps and session recordings, VWO or Google Optimize-compatible tools for A/B testing, and Google Tag Manager for tracking implementation. Tool selection is always tailored to your existing tech stack and budget — we do not force proprietary tools.' },
];

export default function AnalyticsCroServices() {
  const [openFaq, setOpenFaq] = useState(null);
  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Analytics & CRO Services', item: 'https://www.1solutions.biz/analytics-cro-services/' },
      ]},
      { '@type': 'Service', name: 'Analytics & CRO Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Analytics and CRO services by 1Solutions — GA4 setup, funnel analysis, A/B testing, and data-driven conversion rate optimisation for websites and landing pages.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '61', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <>
      <Head>
        <title>Analytics & CRO Services | GA4, Conversion Optimisation | 1Solutions</title>
        <meta name="description" content="Analytics and CRO services by 1Solutions — GA4 setup, funnel analysis, A/B testing, and data-driven conversion rate optimisation for websites and landing pages." />
        <link rel="canonical" href="https://www.1solutions.biz/analytics-cro-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box}
          .acro-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(0,45,61,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(56,178,200,0.07) 100%)}
          .acro-o1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(0,45,61,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px)}
          .acro-o2{position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(56,178,200,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px)}
          .acro-in{max-width:1200px;margin:0 auto;position:relative;z-index:1}
          .acro-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(0,45,61,0.10);border:1px solid rgba(0,45,61,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:24px}
          .acro-h1{font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#001520 0%,${ACCENT} 45%,#38b2c8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .acro-p{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px}
          .acro-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
          .acro-bp{display:inline-flex;align-items:center;gap:8px;background:${ACCENT};color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(0,45,61,.25)}
          .acro-bp:hover{background:#001520;transform:translateY(-2px)}
          .acro-bs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.7);color:${ACCENT};padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;border:1.5px solid rgba(0,45,61,.18);transition:all .25s;backdrop-filter:blur(8px)}
          .acro-bs:hover{background:#fff;transform:translateY(-2px)}
          .acro-tr{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px}
          .acro-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500}
          .acro-sbar{display:flex;border:1px solid rgba(0,45,61,.10);border-radius:16px;background:rgba(255,255,255,.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px}
          .acro-si{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(0,45,61,.08)}
          .acro-si:last-child{border-right:none}
          .acro-sn{font-size:1.9rem;font-weight:900;color:${ACCENT};line-height:1;letter-spacing:-1px}
          .acro-sl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px}
          .acro-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px}
          .acro-bci{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280}
          .acro-bci a{color:#6b7280;text-decoration:none}.acro-bci a:hover{color:${ACCENT}}
          .acro-sep{color:#d1d5db}.acro-cur{color:${ACCENT};font-weight:500}
          .acro-sec{padding:80px 40px}.acro-bg{background:#f8fafd}
          .acro-si2{max-width:1200px;margin:0 auto}
          .acro-tag{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:12px}
          .acro-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;color:#0A1628;margin:0 0 16px}
          .acro-h2 span{background:linear-gradient(90deg,${ACCENT},#38b2c8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .acro-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px}
          .acro-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .acro-card{background:linear-gradient(135deg,rgba(0,45,61,.06) 0%,rgba(255,255,255,.88) 60%,rgba(56,178,200,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(0,45,61,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s}
          .acro-card:hover{transform:translateY(-6px);border-color:rgba(0,45,61,.25);box-shadow:0 16px 48px rgba(0,45,61,.12)}
          .acro-icon{width:48px;height:48px;border-radius:14px;background:rgba(0,45,61,.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
          .acro-icon svg{width:22px;height:22px;color:${ACCENT}}
          .acro-ch{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3}
          .acro-cp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .acro-rb{background:linear-gradient(135deg,#000d14 0%,${ACCENT} 100%);padding:64px 40px}
          .acro-ri{max-width:1200px;margin:0 auto}
          .acro-rt{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(56,178,200,.8);margin-bottom:12px;text-align:center}
          .acro-rh{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2}
          .acro-rg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .acro-rc{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:36px 28px;text-align:center}
          .acro-rm{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px}
          .acro-rl{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
          .acro-rs{font-size:12.5px;color:rgba(255,255,255,.50)}
          .acro-wc{background:linear-gradient(135deg,rgba(0,45,61,.06) 0%,rgba(255,255,255,.88) 60%,rgba(56,178,200,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(0,45,61,.07)}
          .acro-wck{width:36px;height:36px;border-radius:10px;background:rgba(0,45,61,.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .acro-wck svg{width:18px;height:18px;color:${ACCENT}}
          .acro-wh{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px}
          .acro-wp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .acro-pn{font-size:3.5rem;font-weight:900;color:rgba(0,45,61,.07);line-height:1;margin-bottom:8px;letter-spacing:-2px}
          .acro-pl{width:40px;height:3px;background:linear-gradient(90deg,${ACCENT},rgba(0,45,61,.3));border-radius:2px;margin-bottom:16px}
          .acro-ph{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px}
          .acro-pp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .acro-fl{display:flex;flex-direction:column;gap:10px}
          .acro-fi{background:linear-gradient(135deg,rgba(0,45,61,.06) 0%,rgba(255,255,255,.88) 60%,rgba(56,178,200,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,45,61,.06)}
          .acro-fi.open{border-color:rgba(0,45,61,.35)}
          .acro-fb{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit}
          .acro-fq{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4}
          .acro-fic{width:28px;height:28px;border-radius:50%;background:rgba(0,45,61,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .2s}
          .acro-fi.open .acro-fic{background:rgba(0,45,61,.15);transform:rotate(45deg)}
          .acro-fic svg{width:14px;height:14px;color:${ACCENT}}
          .acro-fa{padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8}
          .acro-cta{background:linear-gradient(135deg,rgba(0,45,61,.10) 0%,rgba(255,255,255,.70) 40%,rgba(56,178,200,.08) 100%);padding:90px 40px;text-align:center}
          .acro-cth{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;margin:0 0 18px;background:linear-gradient(90deg,#001520 0%,${ACCENT} 50%,#38b2c8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .acro-ctp{font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px}
          @media(max-width:900px){.acro-g3,.acro-rg{grid-template-columns:1fr 1fr}}
          @media(max-width:600px){.acro-hero,.acro-sec,.acro-rb,.acro-cta{padding-left:20px;padding-right:20px}.acro-hero{padding-top:60px;padding-bottom:50px}.acro-g3,.acro-rg{grid-template-columns:1fr}.acro-bc{padding:12px 20px}}
        `}</style>
      </Head>
      <nav className="acro-bc"><div className="acro-bci"><Link href="/">Home</Link><span className="acro-sep">›</span><Link href="/seo-services-company/">Digital Marketing</Link><span className="acro-sep">›</span><span className="acro-cur">Analytics & CRO Services</span></div></nav>
      <section className="acro-hero"><div className="acro-o1"/><div className="acro-o2"/>
        <div className="acro-in">
          <span className="acro-ey">Analytics & CRO — GA4 · GTM · A/B Testing · Funnel Analysis · Heatmaps</span>
          <h1 className="acro-h1">Analytics & CRO That Turns More of Your Existing Traffic Into Revenue</h1>
          <p className="acro-p">1Solutions implements accurate analytics, identifies conversion bottlenecks, and runs data-driven A/B tests that systematically improve your conversion rate — so every traffic source delivers more revenue without more spend.</p>
          <div className="acro-btns">
            <Link href="/contact" className="acro-bp">Get a Free Analytics Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/contact" className="acro-bs">Discuss Your CRO Strategy</Link>
          </div>
          <div className="acro-tr">{['GA4 specialists','Testing-first culture','No vanity metrics','Integrated with all channels'].map(t=><span key={t} className="acro-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>)}</div>
          <div className="acro-sbar">{[{num:'74%',lbl:'Checkout Uplift'},{num:'2.4×',lbl:'Lead Form Growth'},{num:'41%',lbl:'Bounce Rate Reduction'},{num:'15+',lbl:'Years Experience'}].map(s=><div key={s.lbl} className="acro-si"><span className="acro-sn">{s.num}</span><span className="acro-sl">{s.lbl}</span></div>)}</div>
        </div>
      </section>
      <section className="acro-sec acro-bg"><div className="acro-si2">
        <span className="acro-tag">What We Deliver</span>
        <h2 className="acro-h2">Complete <span>Analytics & CRO Services</span></h2>
        <p className="acro-lead">From accurate tracking implementation to continuous A/B testing — every service needed to understand your funnel and optimise it for revenue.</p>
        <div className="acro-g3">{SERVICES.map(s=><div key={s.title} className="acro-card"><div className="acro-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div><h3 className="acro-ch">{s.title}</h3><p className="acro-cp">{s.desc}</p></div>)}</div>
      </div></section>
      <section className="acro-rb"><div className="acro-ri">
        <span className="acro-rt">Client Results</span>
        <h2 className="acro-rh">CRO Results That Improve Every Traffic Source Simultaneously</h2>
        <div className="acro-rg">{RESULTS.map(r=><div key={r.label} className="acro-rc"><div className="acro-rm" style={{color:r.color}}>{r.metric}</div><div className="acro-rl">{r.label}</div><div className="acro-rs">{r.sub}</div></div>)}</div>
      </div></section>
      <section className="acro-sec"><div className="acro-si2">
        <span className="acro-tag">Why 1Solutions</span>
        <h2 className="acro-h2">The Analytics Partner <span>That Tests Before It Recommends</span></h2>
        <p className="acro-lead">We do not guess what will improve your conversion rate. We measure, hypothesise, test, and implement — with statistical rigour that separates genuine wins from random noise.</p>
        <div className="acro-g3">{WHY.map(w=><div key={w.title} className="acro-wc"><div className="acro-wck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="acro-wh">{w.title}</h3><p className="acro-wp">{w.desc}</p></div>)}</div>
      </div></section>
      <section className="acro-sec acro-bg"><div className="acro-si2">
        <span className="acro-tag">How We Work</span>
        <h2 className="acro-h2">Our <span>6-Step Analytics & CRO Process</span></h2>
        <p className="acro-lead">From tracking audit to continuous testing — a structured process that compounds conversion improvements every quarter.</p>
        <div className="acro-g3">{PROCESS.map(p=><div key={p.n}><div className="acro-pn">{p.n}</div><div className="acro-pl"/><h3 className="acro-ph">{p.title}</h3><p className="acro-pp">{p.desc}</p></div>)}</div>
      </div></section>
      <section className="acro-sec"><div className="acro-si2">
        <span className="acro-tag">Got Questions?</span>
        <h2 className="acro-h2">Analytics & CRO <span>FAQs</span></h2>
        <div className="acro-fl">{FAQS.map((f,i)=><div key={i} className={'acro-fi'+(openFaq===i?' open':'')}><button className="acro-fb" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="acro-fq">{f.q}</span><span className="acro-fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>{openFaq===i&&<div className="acro-fa">{f.a}</div>}</div>)}</div>
      </div></section>
      <section className="acro-cta"><div className="acro-si2">
        <span className="acro-tag" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Convert More of the Traffic You Already Have?</span>
        <h2 className="acro-cth">Get a Free Analytics & CRO Audit</h2>
        <p className="acro-ctp">We will review your GA4 setup, identify tracking gaps, analyse your conversion funnel, and share the highest-impact CRO opportunities for your website — completely free.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/contact" className="acro-bp">Request Free CRO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
          <Link href="/contact" className="acro-bs">Talk to a CRO Specialist</Link>
        </div>
      </div></section>
    </>
  );
}
