import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#1557a0';
const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Google Search Ads', desc: 'Keyword research, match-type strategy, responsive search ads, Quality Score optimisation, and bid management — campaigns engineered to capture high-intent buyers.' },
  { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Google Display Ads', desc: 'Audience targeting, remarketing lists, responsive display ads, and placement optimisation across 3M+ websites in the Google Display Network.' },
  { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', title: 'YouTube & Video Ads', desc: 'TrueView in-stream, bumper ads, and Video Action campaigns targeting custom intent and affinity audiences on YouTube.' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'Google Shopping Campaigns', desc: 'Product feed optimisation, Smart Shopping and Performance Max campaign management, and negative keyword sculpting to maximise ROAS for eCommerce stores.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Performance Max Campaigns', desc: 'AI-driven campaigns across all Google channels — Search, Display, YouTube, Maps, Gmail, and Discover — with asset group strategy and audience signal optimisation.' },
  { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Conversion Tracking & Attribution', desc: 'GA4 and Google Ads conversion tracking setup, enhanced conversions, and attribution model analysis to ensure every lead and sale is correctly credited.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Bid Strategy Optimisation', desc: 'Target CPA, Target ROAS, Maximise Conversions, and manual CPC strategies — chosen and adjusted based on campaign maturity, data volume, and business goals.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'PPC Reporting & Insights', desc: 'Weekly performance dashboards, monthly insight reports, and quarterly strategy reviews — with every metric tied to cost per lead, ROAS, and revenue impact.' },
];
const RESULTS = [
  { metric: '3.8×', label: 'ROAS achieved', sub: 'US eCommerce client — Google Shopping', color: '#FE9700' },
  { metric: '52%', label: 'Reduction in cost per lead', sub: 'AU B2B SaaS client — 4 months', color: '#7C3AED' },
  { metric: '290%', label: 'Increase in conversion volume', sub: 'Canadian services business', color: ACCENT },
];
const PROCESS = [
  { n: '01', title: 'Account Audit & Strategy', desc: 'We audit your existing campaigns (or start fresh), analyse competitor ad activity, and build a channel and budget strategy aligned to your CPA or ROAS targets.' },
  { n: '02', title: 'Campaign Build', desc: 'Keyword research, audience targeting, ad copy creation, landing page recommendations, conversion tracking setup, and campaign structure — built before a single dollar is spent.' },
  { n: '03', title: 'Launch & Learn', desc: 'Campaigns go live. We monitor quality scores, impression share, search term reports, and conversion data daily in the first two weeks.' },
  { n: '04', title: 'Optimise', desc: 'Negative keyword additions, bid adjustments, ad copy testing, audience refinement, and Quality Score improvements — ongoing every week.' },
  { n: '05', title: 'Scale', desc: 'Once CPA or ROAS targets are met consistently, we identify budget expansion opportunities, new campaign types, and geographic expansion.' },
  { n: '06', title: 'Report', desc: 'Weekly dashboards and monthly insight reports — cost, clicks, conversions, CPA, ROAS, and competitive metrics — in plain English.' },
];
const WHY = [
  { title: 'Google Partner Certified', desc: 'Our team holds active Google Ads certifications — Search, Display, Shopping, and Video — with real campaign experience across every format.' },
  { title: 'No Percentage-of-Spend Fees', desc: 'We charge a flat management fee, not a percentage of your ad budget. Your budget increases stay in the campaigns, not in our pocket.' },
  { title: 'Landing Page Collaboration', desc: 'A great ad to a poor landing page wastes money. We review and provide specific recommendations on your landing pages as part of every campaign build.' },
  { title: 'Transparent Access', desc: 'You own your Google Ads account. We work inside it — you always have full visibility and control, and you keep everything if we ever part ways.' },
  { title: 'US, Canada & Australia Focus', desc: 'We understand the search landscapes, seasonal patterns, and competitive dynamics in each English-speaking market where your customers are searching.' },
  { title: 'Integrated with SEO', desc: 'We share keyword data between paid and organic to improve both channels — PPC search term data informs SEO content, and organic rankings reduce branded CPCs.' },
];
const FAQS = [
  { q: 'How much should I budget for Google Ads?', a: 'Minimum budgets depend on your industry and CPC landscape. For most service businesses, we recommend starting at $1,500–$3,000/month in ad spend. eCommerce typically starts higher. We provide a budget recommendation based on your target CPA and competitive CPC data before you commit.' },
  { q: 'How quickly will I see results from Google Ads?', a: 'Search campaigns typically show conversion data within the first 2 to 4 weeks. However, the first 4 to 6 weeks are a learning phase where Google\'s algorithm optimises delivery. Most accounts reach stable CPA/ROAS targets by month 2 to 3.' },
  { q: 'Do you take a percentage of ad spend?', a: 'No. We charge a fixed monthly management fee regardless of your ad budget. This means our incentive is campaign performance, not inflating your spend.' },
  { q: 'Will I own my Google Ads account?', a: 'Yes. You own the account, all campaigns, all historical data, and all conversion tracking. We are granted manager access — if you ever stop working with us, everything stays with you.' },
  { q: 'Do you manage Performance Max campaigns?', a: 'Yes. We build Performance Max campaigns with structured asset groups, strong audience signals, and exclusion lists to prevent wasted spend on irrelevant placements. We also monitor search term insights and adjust regularly.' },
  { q: 'Can you take over an existing underperforming account?', a: 'Yes. We specialise in account audits and turnarounds — identifying wasted spend, poor account structure, Quality Score issues, and missed opportunities, then restructuring campaigns for better performance.' },
  { q: 'Do you handle conversion tracking setup?', a: 'Yes. Proper conversion tracking is non-negotiable. We set up Google Ads conversion actions, GA4 goals, and enhanced conversions — and verify every tracking trigger before launching any campaign.' },
];

export default function PpcManagementServices() {
  const [openFaq, setOpenFaq] = useState(null);
  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Google Ads Management', item: 'https://www.1solutions.biz/ppc-management-services/' },
      ]},
      { '@type': 'Service', name: 'Google Ads PPC Management', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Google Ads PPC management services — Search, Display, Shopping, YouTube, and Performance Max campaigns for US, Canada, and Australia.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '91', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <>
      <Head>
        <title>Google Ads PPC Management | Search, Shopping & Performance Max | 1Solutions</title>
        <meta name="description" content="Google Ads management by 1Solutions. Search, Display, Shopping, YouTube, and Performance Max campaigns engineered for ROAS and lead generation. US, Canada & Australia." />
        <link rel="canonical" href="https://www.1solutions.biz/ppc-management-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box}
          .gppc-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.70) 50%,rgba(224,231,255,0.45) 100%)}
          .gppc-o1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(21,87,160,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px)}
          .gppc-o2{position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px)}
          .gppc-in{max-width:1200px;margin:0 auto;position:relative;z-index:1}
          .gppc-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(21,87,160,0.10);border:1px solid rgba(21,87,160,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:24px}
          .gppc-h1{font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#0c2d6b 0%,${ACCENT} 45%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .gppc-p{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px}
          .gppc-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
          .gppc-bp{display:inline-flex;align-items:center;gap:8px;background:${ACCENT};color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(21,87,160,.25)}
          .gppc-bp:hover{background:#0d4a8a;transform:translateY(-2px)}
          .gppc-bs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.7);color:${ACCENT};padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;border:1.5px solid rgba(21,87,160,.18);transition:all .25s;backdrop-filter:blur(8px)}
          .gppc-bs:hover{background:#fff;transform:translateY(-2px)}
          .gppc-tr{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px}
          .gppc-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500}
          .gppc-sbar{display:flex;border:1px solid rgba(21,87,160,.10);border-radius:16px;background:rgba(255,255,255,.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px}
          .gppc-si{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(21,87,160,.08)}
          .gppc-si:last-child{border-right:none}
          .gppc-sn{font-size:1.9rem;font-weight:900;color:${ACCENT};line-height:1;letter-spacing:-1px}
          .gppc-sl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px}
          .gppc-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px}
          .gppc-bci{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280}
          .gppc-bci a{color:#6b7280;text-decoration:none}.gppc-bci a:hover{color:${ACCENT}}
          .gppc-sep{color:#d1d5db}.gppc-cur{color:${ACCENT};font-weight:500}
          .gppc-sec{padding:80px 40px}.gppc-bg{background:#f8fafd}
          .gppc-si2{max-width:1200px;margin:0 auto}
          .gppc-tag{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:12px}
          .gppc-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;color:#0A1628;margin:0 0 16px}
          .gppc-h2 span{background:linear-gradient(90deg,${ACCENT},#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .gppc-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px}
          .gppc-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .gppc-card{background:linear-gradient(135deg,rgba(219,234,254,.45) 0%,rgba(255,255,255,.85) 60%,rgba(224,231,255,.35) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(21,87,160,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s}
          .gppc-card:hover{transform:translateY(-6px);border-color:rgba(21,87,160,.25);box-shadow:0 16px 48px rgba(21,87,160,.12)}
          .gppc-icon{width:48px;height:48px;border-radius:14px;background:rgba(21,87,160,.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
          .gppc-icon svg{width:22px;height:22px;color:${ACCENT}}
          .gppc-ch{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3}
          .gppc-cp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .gppc-rb{background:linear-gradient(135deg,#0a1f4e 0%,${ACCENT} 100%);padding:64px 40px}
          .gppc-ri{max-width:1200px;margin:0 auto}
          .gppc-rt{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(147,197,253,.8);margin-bottom:12px;text-align:center}
          .gppc-rh{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2}
          .gppc-rg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .gppc-rc{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:36px 28px;text-align:center}
          .gppc-rm{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px}
          .gppc-rl{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
          .gppc-rs{font-size:12.5px;color:rgba(255,255,255,.50)}
          .gppc-wc{background:linear-gradient(135deg,rgba(219,234,254,.45) 0%,rgba(255,255,255,.85) 60%,rgba(224,231,255,.35) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(21,87,160,.07)}
          .gppc-wck{width:36px;height:36px;border-radius:10px;background:rgba(21,87,160,.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .gppc-wck svg{width:18px;height:18px;color:${ACCENT}}
          .gppc-wh{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px}
          .gppc-wp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .gppc-pn{font-size:3.5rem;font-weight:900;color:rgba(21,87,160,.07);line-height:1;margin-bottom:8px;letter-spacing:-2px}
          .gppc-pl{width:40px;height:3px;background:linear-gradient(90deg,${ACCENT},rgba(21,87,160,.3));border-radius:2px;margin-bottom:16px}
          .gppc-ph{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px}
          .gppc-pp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .gppc-fl{display:flex;flex-direction:column;gap:10px}
          .gppc-fi{background:linear-gradient(135deg,rgba(219,234,254,.45) 0%,rgba(255,255,255,.85) 60%,rgba(224,231,255,.35) 100%);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(21,87,160,.06)}
          .gppc-fi.open{border-color:rgba(21,87,160,.35)}
          .gppc-fb{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit}
          .gppc-fq{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4}
          .gppc-fic{width:28px;height:28px;border-radius:50%;background:rgba(21,87,160,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .2s}
          .gppc-fi.open .gppc-fic{background:rgba(21,87,160,.15);transform:rotate(45deg)}
          .gppc-fic svg{width:14px;height:14px;color:${ACCENT}}
          .gppc-fa{padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8}
          .gppc-cta{background:linear-gradient(135deg,rgba(219,234,254,.70) 0%,rgba(255,255,255,.60) 40%,rgba(224,231,255,.65) 100%);padding:90px 40px;text-align:center}
          .gppc-cth{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;margin:0 0 18px;background:linear-gradient(90deg,#0c2d6b 0%,${ACCENT} 50%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .gppc-ctp{font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px}
          @media(max-width:900px){.gppc-g3,.gppc-rg{grid-template-columns:1fr 1fr}}
          @media(max-width:600px){.gppc-hero,.gppc-sec,.gppc-rb,.gppc-cta{padding-left:20px;padding-right:20px}.gppc-hero{padding-top:60px;padding-bottom:50px}.gppc-g3,.gppc-rg{grid-template-columns:1fr}.gppc-bc{padding:12px 20px}}
        `}</style>
      </Head>
      <nav className="gppc-bc"><div className="gppc-bci"><Link href="/">Home</Link><span className="gppc-sep">›</span><Link href="/seo-services-company/">Digital Marketing</Link><span className="gppc-sep">›</span><span className="gppc-cur">Google Ads (PPC)</span></div></nav>
      <section className="gppc-hero"><div className="gppc-o1"/><div className="gppc-o2"/>
        <div className="gppc-in">
          <span className="gppc-ey">Google Partner — Search · Display · Shopping · YouTube</span>
          <h1 className="gppc-h1">Google Ads Management That<br/>Turns Budget Into Revenue</h1>
          <p className="gppc-p">1Solutions manages Google Ads campaigns that drive qualified leads and sales — not just clicks. Search, Shopping, Display, YouTube, and Performance Max, all optimised weekly for your CPA and ROAS targets.</p>
          <div className="gppc-btns">
            <Link href="/contact-us" className="gppc-bp">Get a Free PPC Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/contact-us" className="gppc-bs">Discuss Your Campaigns</Link>
          </div>
          <div className="gppc-tr">{['Flat management fee','You own your account','No long-term lock-in','Weekly optimisation'].map(t=><span key={t} className="gppc-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>)}</div>
          <div className="gppc-sbar">{[{num:'400+',lbl:'PPC Clients'},{num:'15+',lbl:'Years Experience'},{num:'3.8×',lbl:'Avg ROAS'},{num:'97%',lbl:'Retention Rate'}].map(s=><div key={s.lbl} className="gppc-si"><span className="gppc-sn">{s.num}</span><span className="gppc-sl">{s.lbl}</span></div>)}</div>
        </div>
      </section>
      <section className="gppc-sec gppc-bg"><div className="gppc-si2">
        <span className="gppc-tag">What We Manage</span>
        <h2 className="gppc-h2">Full-Funnel <span>Google Ads Services</span></h2>
        <p className="gppc-lead">Every Google Ads campaign type — built, launched, and optimised by certified specialists.</p>
        <div className="gppc-g3">{SERVICES.map(s=><div key={s.title} className="gppc-card"><div className="gppc-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div><h3 className="gppc-ch">{s.title}</h3><p className="gppc-cp">{s.desc}</p></div>)}</div>
      </div></section>
      <section className="gppc-rb"><div className="gppc-ri">
        <span className="gppc-rt">Client Results</span>
        <h2 className="gppc-rh">PPC Results That Justify the Budget</h2>
        <div className="gppc-rg">{RESULTS.map(r=><div key={r.label} className="gppc-rc"><div className="gppc-rm" style={{color:r.color}}>{r.metric}</div><div className="gppc-rl">{r.label}</div><div className="gppc-rs">{r.sub}</div></div>)}</div>
      </div></section>
      <section className="gppc-sec"><div className="gppc-si2">
        <span className="gppc-tag">Why 1Solutions</span>
        <h2 className="gppc-h2">The Google Ads Partner <span>That Cares About Your Margins</span></h2>
        <p className="gppc-lead">We manage ads for the outcome — leads, sales, and ROAS — not impressions and click volume.</p>
        <div className="gppc-g3">{WHY.map(w=><div key={w.title} className="gppc-wc"><div className="gppc-wck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="gppc-wh">{w.title}</h3><p className="gppc-wp">{w.desc}</p></div>)}</div>
      </div></section>
      <section className="gppc-sec gppc-bg"><div className="gppc-si2">
        <span className="gppc-tag">How We Work</span>
        <h2 className="gppc-h2">Our <span>6-Step PPC Process</span></h2>
        <p className="gppc-lead">From account audit to profitable scale — a structured approach that eliminates wasted spend.</p>
        <div className="gppc-g3">{PROCESS.map(p=><div key={p.n}><div className="gppc-pn">{p.n}</div><div className="gppc-pl"/><h3 className="gppc-ph">{p.title}</h3><p className="gppc-pp">{p.desc}</p></div>)}</div>
      </div></section>
      <section className="gppc-sec"><div className="gppc-si2">
        <span className="gppc-tag">Got Questions?</span>
        <h2 className="gppc-h2">Google Ads <span>FAQs</span></h2>
        <div className="gppc-fl">{FAQS.map((f,i)=><div key={i} className={'gppc-fi'+(openFaq===i?' open':'')}><button className="gppc-fb" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="gppc-fq">{f.q}</span><span className="gppc-fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>{openFaq===i&&<div className="gppc-fa">{f.a}</div>}</div>)}</div>
      </div></section>
      <section className="gppc-cta"><div className="gppc-si2">
        <span className="gppc-tag" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Improve Your Google Ads?</span>
        <h2 className="gppc-cth">Get a Free Google Ads Audit</h2>
        <p className="gppc-ctp">We will review your campaigns, identify wasted spend, and share a clear plan for improving ROAS and reducing CPA — completely free.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/contact-us" className="gppc-bp">Request Free PPC Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
          <Link href="/contact-us" className="gppc-bs">Talk to a PPC Specialist</Link>
        </div>
      </div></section>
    </>
  );
}
