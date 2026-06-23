import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#3d2800';
const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Google Ads Audit', desc: 'Account structure, campaign settings, keyword match types, Quality Scores, ad copy, bid strategies, audience targeting, and conversion tracking — reviewed against 100-point criteria.' },
  { icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14', title: 'Meta Ads Audit', desc: 'Campaign objectives, audience targeting, creative performance, pixel health, ROAS by ad set, budget allocation, and attribution model — full account analysis with actionable findings.' },
  { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Conversion Tracking Audit', desc: 'Every conversion action verified — Google Ads tags, GA4 goals, Meta Pixel events, and enhanced conversions — so you know whether your reported data is accurate.' },
  { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', title: 'Landing Page Assessment', desc: 'Landing page relevance, message match, load speed, CTA clarity, and trust signals — evaluated for how well they support ad performance and Quality Score.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Audience & Targeting Review', desc: 'Keyword targeting, match type distribution, audience lists, demographic bid adjustments, device performance, and geographic targeting — gaps and waste identified.' },
  { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Bid Strategy Evaluation', desc: 'Current bidding strategy assessed for campaign maturity and conversion volume — with recommendations for whether automated or manual strategies are appropriate.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Ad Copy & Creative Review', desc: 'Responsive search ad asset combinations, ad copy relevance, CTR benchmarks, creative fatigue signals, and split-test opportunities identified across every active campaign.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Competitor Ad Intelligence', desc: 'Auction insights, competitor ad copy analysis, Google Ads transparency data, and market-level CPC benchmarks — so you understand how your account compares to the competitive landscape.' },
];
const RESULTS = [
  { metric: '41%', label: 'Immediate spend reduction', sub: 'US eCommerce after audit', color: '#c8842a' },
  { metric: '2.9×', label: 'ROAS improvement', sub: 'AU B2B — post-audit restructure', color: '#e0a84a' },
  { metric: '$28k', label: 'Monthly wasted spend identified', sub: 'Canadian retail brand', color: '#f0c870' },
];
const PROCESS = [
  { n: '01', title: 'Access Collection', desc: 'We request read-only access to your Google Ads account, Meta Ads Manager, GA4, and Google Merchant Center (if applicable) — no changes made during the audit phase.' },
  { n: '02', title: 'Data Analysis', desc: 'We pull 90 days of account data — performance by campaign, ad group, keyword, audience, device, and placement — and run it through our 100-point audit framework.' },
  { n: '03', title: 'Campaign Deep-Dive', desc: 'Every active campaign reviewed manually — structure, settings, targeting, bidding, ad copy, landing pages, and conversion tracking — with issues flagged and prioritised.' },
  { n: '04', title: 'Report Writing', desc: 'A structured audit report is produced: executive summary, critical issues (fix immediately), high-priority improvements, and quick wins — each with specific action steps.' },
  { n: '05', title: 'Presentation Call', desc: 'A 60-minute video call to walk through every finding, answer questions, and prioritise implementation so you leave with a clear action plan — not just a document.' },
  { n: '06', title: 'Implementation Support', desc: 'If you proceed to management, we implement every audit recommendation in the first month. If not, the report is yours to implement in-house or with another agency.' },
];
const WHY = [
  { title: 'Platform-Agnostic View', desc: 'We audit both Google Ads and Meta Ads in the same engagement — giving you a unified view of cross-platform waste and opportunity, not just one channel in isolation.' },
  { title: 'Senior Analyst', desc: 'Every audit is performed by a senior PPC specialist — not a junior analyst or an automated tool. You get expert-level findings with clear recommendations.' },
  { title: 'No Obligation', desc: 'The audit is a standalone deliverable. You are not obligated to engage us for management — take the report and implement it however you choose.' },
  { title: 'Quick Turnaround', desc: 'Audit report delivered within 5 business days of receiving account access. Presentation call scheduled within 7 days of delivery.' },
  { title: 'Developer-Ready Fixes', desc: 'Where fixes require development — tracking implementation, landing page changes, feed updates — we provide technical specifications your team can act on immediately.' },
  { title: 'Implementation Option', desc: 'If you want us to implement the audit findings, we offer a managed implementation engagement — restructuring campaigns, fixing tracking, and relaunching with best practices.' },
];
const FAQS = [
  { q: 'What is included in a PPC audit?', a: 'Our PPC audit covers 100 checkpoints across account structure, campaign settings, keyword strategy, Quality Score, audience targeting, bid strategies, ad copy, landing pages, conversion tracking accuracy, and competitor positioning. Each finding is categorised by urgency and includes a specific recommended action.' },
  { q: 'How long does the PPC audit take?', a: 'We deliver the written audit report within 5 business days of receiving account access. The presentation call is then scheduled within 7 days. For large accounts with significant historical data or multiple platforms, delivery may extend to 7 business days — we confirm timelines upfront.' },
  { q: 'What account access do you need?', a: 'We need read-only access to your Google Ads account, Meta Business Manager, GA4 property, and Google Merchant Center (if you run Shopping). Read-only access means we can view everything without making any changes — your campaigns are safe throughout the audit process.' },
  { q: 'Which platforms does the audit cover?', a: 'Our standard audit covers Google Ads (Search, Display, Shopping, YouTube, Performance Max) and Meta Ads (Facebook and Instagram). We can extend the audit to include LinkedIn Ads, Microsoft Ads, or TikTok Ads for an additional fee. Conversion tracking audits cover all connected platforms.' },
  { q: 'Is there a free PPC audit available?', a: 'We offer a complimentary high-level account review — covering campaign structure, Quality Scores, and obvious waste — as part of an initial consultation. This is a 30-minute assessment, not a full audit. The comprehensive 100-point audit is a paid engagement, priced based on account complexity and number of platforms reviewed.' },
  { q: 'What happens after the audit?', a: 'After the presentation call, you receive the full report and all supporting data. You can implement the findings yourself, share them with your current agency, or engage us to implement them directly. Most clients see meaningful ROAS improvements within the first 4 to 8 weeks after acting on the audit recommendations.' },
];

export default function PpcAuditServices() {
  const [openFaq, setOpenFaq] = useState(null);
  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'PPC Audit Services', item: 'https://www.1solutions.biz/ppc-audit-services/' },
      ]},
      { '@type': 'Service', name: 'PPC Audit Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'PPC audit by 1Solutions — 100-point Google Ads and Meta Ads review covering wasted spend, Quality Score, audience gaps, and conversion tracking. Delivered in 5 days.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '58', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <>
      <Head>
        <title>PPC Audit Services | Google Ads & Meta Ads Account Audit | 1Solutions</title>
        <meta name="description" content="PPC audit by 1Solutions — 100-point Google Ads and Meta Ads review covering wasted spend, Quality Score, audience gaps, and conversion tracking. Delivered in 5 days." />
        <link rel="canonical" href="https://www.1solutions.biz/ppc-audit-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box}
          .ppca-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(61,40,0,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(200,132,42,0.07) 100%)}
          .ppca-o1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(61,40,0,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px)}
          .ppca-o2{position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(200,132,42,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px)}
          .ppca-in{max-width:1200px;margin:0 auto;position:relative;z-index:1}
          .ppca-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(61,40,0,0.10);border:1px solid rgba(61,40,0,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:24px}
          .ppca-h1{font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#1a1000 0%,${ACCENT} 45%,#c8842a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .ppca-p{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px}
          .ppca-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
          .ppca-bp{display:inline-flex;align-items:center;gap:8px;background:${ACCENT};color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(61,40,0,.25)}
          .ppca-bp:hover{background:#1a1000;transform:translateY(-2px)}
          .ppca-bs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.7);color:${ACCENT};padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;border:1.5px solid rgba(61,40,0,.18);transition:all .25s;backdrop-filter:blur(8px)}
          .ppca-bs:hover{background:#fff;transform:translateY(-2px)}
          .ppca-tr{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px}
          .ppca-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500}
          .ppca-sbar{display:flex;border:1px solid rgba(61,40,0,.10);border-radius:16px;background:rgba(255,255,255,.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px}
          .ppca-si{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(61,40,0,.08)}
          .ppca-si:last-child{border-right:none}
          .ppca-sn{font-size:1.9rem;font-weight:900;color:${ACCENT};line-height:1;letter-spacing:-1px}
          .ppca-sl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px}
          .ppca-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px}
          .ppca-bci{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280}
          .ppca-bci a{color:#6b7280;text-decoration:none}.ppca-bci a:hover{color:${ACCENT}}
          .ppca-sep{color:#d1d5db}.ppca-cur{color:${ACCENT};font-weight:500}
          .ppca-sec{padding:80px 40px}.ppca-bg{background:#f8fafd}
          .ppca-si2{max-width:1200px;margin:0 auto}
          .ppca-tag{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:12px}
          .ppca-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;color:#0A1628;margin:0 0 16px}
          .ppca-h2 span{background:linear-gradient(90deg,${ACCENT},#c8842a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .ppca-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px}
          .ppca-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .ppca-card{background:linear-gradient(135deg,rgba(61,40,0,.06) 0%,rgba(255,255,255,.88) 60%,rgba(200,132,42,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(61,40,0,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s}
          .ppca-card:hover{transform:translateY(-6px);border-color:rgba(61,40,0,.25);box-shadow:0 16px 48px rgba(61,40,0,.12)}
          .ppca-icon{width:48px;height:48px;border-radius:14px;background:rgba(61,40,0,.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
          .ppca-icon svg{width:22px;height:22px;color:${ACCENT}}
          .ppca-ch{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3}
          .ppca-cp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .ppca-rb{background:linear-gradient(135deg,#0d0800 0%,${ACCENT} 100%);padding:64px 40px}
          .ppca-ri{max-width:1200px;margin:0 auto}
          .ppca-rt{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(200,132,42,.8);margin-bottom:12px;text-align:center}
          .ppca-rh{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2}
          .ppca-rg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .ppca-rc{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:36px 28px;text-align:center}
          .ppca-rm{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px}
          .ppca-rl{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
          .ppca-rs{font-size:12.5px;color:rgba(255,255,255,.50)}
          .ppca-wc{background:linear-gradient(135deg,rgba(61,40,0,.06) 0%,rgba(255,255,255,.88) 60%,rgba(200,132,42,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(61,40,0,.07)}
          .ppca-wck{width:36px;height:36px;border-radius:10px;background:rgba(61,40,0,.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .ppca-wck svg{width:18px;height:18px;color:${ACCENT}}
          .ppca-wh{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px}
          .ppca-wp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .ppca-pn{font-size:3.5rem;font-weight:900;color:rgba(61,40,0,.07);line-height:1;margin-bottom:8px;letter-spacing:-2px}
          .ppca-pl{width:40px;height:3px;background:linear-gradient(90deg,${ACCENT},rgba(61,40,0,.3));border-radius:2px;margin-bottom:16px}
          .ppca-ph{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px}
          .ppca-pp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .ppca-fl{display:flex;flex-direction:column;gap:10px}
          .ppca-fi{background:linear-gradient(135deg,rgba(61,40,0,.06) 0%,rgba(255,255,255,.88) 60%,rgba(200,132,42,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(61,40,0,.06)}
          .ppca-fi.open{border-color:rgba(61,40,0,.35)}
          .ppca-fb{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit}
          .ppca-fq{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4}
          .ppca-fic{width:28px;height:28px;border-radius:50%;background:rgba(61,40,0,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .2s}
          .ppca-fi.open .ppca-fic{background:rgba(61,40,0,.15);transform:rotate(45deg)}
          .ppca-fic svg{width:14px;height:14px;color:${ACCENT}}
          .ppca-fa{padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8}
          .ppca-cta{background:linear-gradient(135deg,rgba(61,40,0,.10) 0%,rgba(255,255,255,.70) 40%,rgba(200,132,42,.08) 100%);padding:90px 40px;text-align:center}
          .ppca-cth{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;margin:0 0 18px;background:linear-gradient(90deg,#1a1000 0%,${ACCENT} 50%,#c8842a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .ppca-ctp{font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px}
          @media(max-width:900px){.ppca-g3,.ppca-rg{grid-template-columns:1fr 1fr}}
          @media(max-width:600px){.ppca-hero,.ppca-sec,.ppca-rb,.ppca-cta{padding-left:20px;padding-right:20px}.ppca-hero{padding-top:60px;padding-bottom:50px}.ppca-g3,.ppca-rg{grid-template-columns:1fr}.ppca-bc{padding:12px 20px}}
        `}</style>
      </Head>
      <nav className="ppca-bc"><div className="ppca-bci"><Link href="/">Home</Link><span className="ppca-sep">›</span><Link href="/seo-services-company/">Digital Marketing</Link><span className="ppca-sep">›</span><span className="ppca-cur">PPC Audit Services</span></div></nav>
      <section className="ppca-hero"><div className="ppca-o1"/><div className="ppca-o2"/>
        <div className="ppca-in">
          <span className="ppca-ey">100-Point PPC Audit — Google Ads · Meta Ads · Conversion Tracking · Delivered in 5 Days</span>
          <h1 className="ppca-h1">PPC Audit That Finds Where Your Ad Budget Is Being Wasted</h1>
          <p className="ppca-p">1Solutions delivers a comprehensive 100-point PPC audit covering Google Ads and Meta Ads — identifying wasted spend, tracking errors, audience gaps, and structural issues that are costing you ROAS right now.</p>
          <div className="ppca-btns">
            <Link href="/contact-us" className="ppca-bp">Request a PPC Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/contact-us" className="ppca-bs">Ask About the Audit</Link>
          </div>
          <div className="ppca-tr">{['100-point framework','Delivered in 5 days','Read-only access only','No obligation to proceed'].map(t=><span key={t} className="ppca-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>)}</div>
          <div className="ppca-sbar">{[{num:'500+',lbl:'Accounts Audited'},{num:'15+',lbl:'Years Experience'},{num:'41%',lbl:'Avg Waste Found'},{num:'5',lbl:'Day Delivery'}].map(s=><div key={s.lbl} className="ppca-si"><span className="ppca-sn">{s.num}</span><span className="ppca-sl">{s.lbl}</span></div>)}</div>
        </div>
      </section>
      <section className="ppca-sec ppca-bg"><div className="ppca-si2">
        <span className="ppca-tag">What We Audit</span>
        <h2 className="ppca-h2">100-Point <span>PPC Audit Coverage</span></h2>
        <p className="ppca-lead">Every component of your paid advertising reviewed against best-practice criteria — from account structure to conversion tracking accuracy.</p>
        <div className="ppca-g3">{SERVICES.map(s=><div key={s.title} className="ppca-card"><div className="ppca-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div><h3 className="ppca-ch">{s.title}</h3><p className="ppca-cp">{s.desc}</p></div>)}</div>
      </div></section>
      <section className="ppca-rb"><div className="ppca-ri">
        <span className="ppca-rt">Audit Outcomes</span>
        <h2 className="ppca-rh">What Our PPC Audits Uncover</h2>
        <div className="ppca-rg">{RESULTS.map(r=><div key={r.label} className="ppca-rc"><div className="ppca-rm" style={{color:r.color}}>{r.metric}</div><div className="ppca-rl">{r.label}</div><div className="ppca-rs">{r.sub}</div></div>)}</div>
      </div></section>
      <section className="ppca-sec"><div className="ppca-si2">
        <span className="ppca-tag">Why 1Solutions</span>
        <h2 className="ppca-h2">The PPC Audit Partner <span>That Delivers Actionable Findings</span></h2>
        <p className="ppca-lead">Not a report you file away — a clear action plan with prioritised fixes and specific steps your team can implement immediately.</p>
        <div className="ppca-g3">{WHY.map(w=><div key={w.title} className="ppca-wc"><div className="ppca-wck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="ppca-wh">{w.title}</h3><p className="ppca-wp">{w.desc}</p></div>)}</div>
      </div></section>
      <section className="ppca-sec ppca-bg"><div className="ppca-si2">
        <span className="ppca-tag">How We Work</span>
        <h2 className="ppca-h2">Our <span>6-Step PPC Audit Process</span></h2>
        <p className="ppca-lead">From read-only access to a prioritised action plan — a structured audit process completed in 5 business days.</p>
        <div className="ppca-g3">{PROCESS.map(p=><div key={p.n}><div className="ppca-pn">{p.n}</div><div className="ppca-pl"/><h3 className="ppca-ph">{p.title}</h3><p className="ppca-pp">{p.desc}</p></div>)}</div>
      </div></section>
      <section className="ppca-sec"><div className="ppca-si2">
        <span className="ppca-tag">Got Questions?</span>
        <h2 className="ppca-h2">PPC Audit <span>FAQs</span></h2>
        <div className="ppca-fl">{FAQS.map((f,i)=><div key={i} className={'ppca-fi'+(openFaq===i?' open':'')}><button className="ppca-fb" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="ppca-fq">{f.q}</span><span className="ppca-fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>{openFaq===i&&<div className="ppca-fa">{f.a}</div>}</div>)}</div>
      </div></section>
      <section className="ppca-cta"><div className="ppca-si2">
        <span className="ppca-tag" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Find Your Wasted Ad Spend?</span>
        <h2 className="ppca-cth">Request a PPC Audit — Delivered in 5 Days</h2>
        <p className="ppca-ctp">We will review your Google Ads and Meta Ads accounts across 100 checkpoints — and deliver a prioritised action plan with specific fixes your team can implement immediately.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/contact-us" className="ppca-bp">Request PPC Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
          <Link href="/contact-us" className="ppca-bs">Talk to a PPC Specialist</Link>
        </div>
      </div></section>
    </>
  );
}
