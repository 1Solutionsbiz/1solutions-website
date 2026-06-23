import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#006d2c';
const SERVICES = [
  { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title: 'Product Feed Optimisation', desc: 'Title restructuring, attribute enrichment, category mapping, and custom label strategy — the foundation of every high-performing Shopping campaign.' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'Standard Shopping Campaigns', desc: 'Structured Shopping campaigns with granular ad group segmentation, negative keyword sculpting, and bid-by-product-performance logic.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Performance Max', desc: 'Performance Max campaigns with structured asset groups, strong audience signals, and search theme exclusions to prevent budget waste on irrelevant queries.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Feed Title & Attribute Optimisation', desc: 'Keyword-rich product titles, optimised descriptions, accurate GTINs, and complete attribute sets that improve impressions, CTR, and Quality Score.' },
  { icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636', title: 'Negative Keyword Sculpting', desc: 'Systematic search term analysis and negative keyword exclusion at campaign and ad group level — eliminating irrelevant traffic that destroys ROAS.' },
  { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'ROAS Bidding Strategy', desc: 'Target ROAS, Maximise Conversion Value, and manual CPC strategies selected by campaign maturity and conversion volume — with regular bid reviews.' },
  { icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', title: 'Google Merchant Center', desc: 'Merchant Center setup, feed submission, policy compliance, and suspension resolution — plus feed health monitoring to maintain active product listings.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Competitor Price Monitoring', desc: 'Price competitiveness reporting using Merchant Center benchmarks — identifying where pricing gaps are costing you impressions and clicks on Shopping results.' },
];
const RESULTS = [
  { metric: '4.6×', label: 'ROAS achieved', sub: 'AU fashion eCommerce — 6 months', color: '#52b788' },
  { metric: '38%', label: 'Lower CPC', sub: 'US home goods store', color: '#95d5b2' },
  { metric: '310%', label: 'Increase in Shopping revenue', sub: 'Canadian retail brand', color: '#b7e4c7' },
];
const PROCESS = [
  { n: '01', title: 'Feed Audit', desc: 'We review your existing product feed for title quality, missing attributes, GTIN accuracy, category mismatches, and policy violations that limit impressions.' },
  { n: '02', title: 'Merchant Center Setup', desc: 'Account configuration, feed submission, shipping and tax settings, product review eligibility, and policy compliance review before any spend is allocated.' },
  { n: '03', title: 'Campaign Structure', desc: 'Campaign hierarchy design — brand vs non-brand, product category segmentation, and custom label strategy to control bids by margin and performance.' },
  { n: '04', title: 'Launch & Test', desc: 'Campaigns go live with manual CPC bidding to gather clean data on which products, categories, and search queries drive the best ROAS before switching to automated strategies.' },
  { n: '05', title: 'Optimise', desc: 'Weekly search term pruning, negative keyword additions, bid adjustments by product performance, and feed title tests — compounding improvement every week.' },
  { n: '06', title: 'Scale', desc: 'Once target ROAS is stable, we expand to higher-volume audiences, introduce Performance Max, and identify new product categories worth promoting.' },
];
const WHY = [
  { title: 'Feed-First Approach', desc: 'We know that Shopping performance starts with the feed, not the bids. Our first priority is always feed quality — titles, attributes, GTINs, and categories.' },
  { title: 'Performance Max Expertise', desc: 'We build Performance Max campaigns properly — with asset groups, audience signals, and search term exclusions that prevent bleed into irrelevant placements.' },
  { title: 'No % of Spend', desc: 'Flat monthly fee — our incentive is ROAS improvement, not budget inflation. Your spend increases stay in your campaigns.' },
  { title: 'You Own Everything', desc: 'Your Merchant Center, your Google Ads account, your product feed. We work inside your owned assets and hand everything back if we ever part ways.' },
  { title: 'eCommerce Specialists', desc: 'We work exclusively with online retailers — fashion, home goods, health, sports, electronics — and understand the seasonal, margin, and inventory dynamics of each.' },
  { title: 'Integrated with SEO', desc: 'Shopping search term data informs organic keyword strategy. We share insights across teams so your paid and organic presence reinforce each other.' },
];
const FAQS = [
  { q: 'What is the difference between Google Shopping and Google Search Ads?', a: 'Google Search Ads are text-based and triggered by keywords you bid on. Google Shopping Ads show your product image, price, and store name based on your product feed — Google matches them to search queries automatically. Shopping ads typically have higher conversion rates because buyers can see the product and price before clicking.' },
  { q: 'What feed requirements does Google Shopping have?', a: 'Google requires a product feed submitted via Merchant Center with fields including title, description, image link, price, availability, GTIN (for branded products), brand, and product category. Feed quality — especially title structure and attribute completeness — directly determines how often your products appear and at what cost.' },
  { q: 'Should I run Performance Max or Standard Shopping?', a: 'Both. Standard Shopping gives you granular control over keywords, negatives, and bids — ideal when you have existing data and want tight control. Performance Max uses AI to serve across all Google channels and is best once you have conversion history. We typically run Standard Shopping to gather data first, then layer in Performance Max.' },
  { q: 'What budget do I need for Google Shopping?', a: 'For most eCommerce stores, we recommend a minimum of $2,000/month in ad spend to generate enough product and query data for optimisation. Higher SKU count and more competitive categories require larger budgets. We provide a budget recommendation based on your product catalog and target ROAS.' },
  { q: 'How long does it take to see ROAS improvements?', a: 'Initial Shopping campaigns need 4 to 6 weeks of data collection before automated bidding strategies perform reliably. Feed optimisation improvements often show results within 2 weeks as impressions and CTR improve. Most accounts reach target ROAS within 8 to 12 weeks of restructuring.' },
  { q: 'What happens if my Merchant Center account gets suspended?', a: 'Merchant Center suspensions are typically caused by policy violations — misrepresentation, price discrepancies, or landing page issues. We diagnose the root cause, fix the violations, and submit a reinstatement request. Most account-level suspensions are resolved within 2 to 4 weeks.' },
];

export default function GoogleShoppingManagement() {
  const [openFaq, setOpenFaq] = useState(null);
  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Google Shopping Management', item: 'https://www.1solutions.biz/google-shopping-management/' },
      ]},
      { '@type': 'Service', name: 'Google Shopping Management', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Google Shopping campaign management by 1Solutions. Product feed optimisation, Performance Max, and ROAS-focused bidding for eCommerce stores.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '83', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <>
      <Head>
        <title>Google Shopping Management | Product Feed & ROAS Optimisation | 1Solutions</title>
        <meta name="description" content="Google Shopping campaign management by 1Solutions. Product feed optimisation, Performance Max, and ROAS-focused bidding for eCommerce stores." />
        <link rel="canonical" href="https://www.1solutions.biz/google-shopping-management/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box}
          .gsho-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(0,109,44,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(82,183,136,0.07) 100%)}
          .gsho-o1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(0,109,44,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px)}
          .gsho-o2{position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(82,183,136,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px)}
          .gsho-in{max-width:1200px;margin:0 auto;position:relative;z-index:1}
          .gsho-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(0,109,44,0.10);border:1px solid rgba(0,109,44,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:24px}
          .gsho-h1{font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#003319 0%,${ACCENT} 45%,#52b788 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .gsho-p{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px}
          .gsho-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
          .gsho-bp{display:inline-flex;align-items:center;gap:8px;background:${ACCENT};color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(0,109,44,.25)}
          .gsho-bp:hover{background:#004d1a;transform:translateY(-2px)}
          .gsho-bs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.7);color:${ACCENT};padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;border:1.5px solid rgba(0,109,44,.18);transition:all .25s;backdrop-filter:blur(8px)}
          .gsho-bs:hover{background:#fff;transform:translateY(-2px)}
          .gsho-tr{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px}
          .gsho-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500}
          .gsho-sbar{display:flex;border:1px solid rgba(0,109,44,.10);border-radius:16px;background:rgba(255,255,255,.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px}
          .gsho-si{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(0,109,44,.08)}
          .gsho-si:last-child{border-right:none}
          .gsho-sn{font-size:1.9rem;font-weight:900;color:${ACCENT};line-height:1;letter-spacing:-1px}
          .gsho-sl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px}
          .gsho-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px}
          .gsho-bci{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280}
          .gsho-bci a{color:#6b7280;text-decoration:none}.gsho-bci a:hover{color:${ACCENT}}
          .gsho-sep{color:#d1d5db}.gsho-cur{color:${ACCENT};font-weight:500}
          .gsho-sec{padding:80px 40px}.gsho-bg{background:#f8fafd}
          .gsho-si2{max-width:1200px;margin:0 auto}
          .gsho-tag{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:12px}
          .gsho-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;color:#0A1628;margin:0 0 16px}
          .gsho-h2 span{background:linear-gradient(90deg,${ACCENT},#52b788);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .gsho-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px}
          .gsho-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .gsho-card{background:linear-gradient(135deg,rgba(0,109,44,.06) 0%,rgba(255,255,255,.88) 60%,rgba(82,183,136,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(0,109,44,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s}
          .gsho-card:hover{transform:translateY(-6px);border-color:rgba(0,109,44,.25);box-shadow:0 16px 48px rgba(0,109,44,.12)}
          .gsho-icon{width:48px;height:48px;border-radius:14px;background:rgba(0,109,44,.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
          .gsho-icon svg{width:22px;height:22px;color:${ACCENT}}
          .gsho-ch{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3}
          .gsho-cp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .gsho-rb{background:linear-gradient(135deg,#001a0d 0%,${ACCENT} 100%);padding:64px 40px}
          .gsho-ri{max-width:1200px;margin:0 auto}
          .gsho-rt{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(82,183,136,.8);margin-bottom:12px;text-align:center}
          .gsho-rh{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2}
          .gsho-rg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .gsho-rc{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:36px 28px;text-align:center}
          .gsho-rm{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px}
          .gsho-rl{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
          .gsho-rs{font-size:12.5px;color:rgba(255,255,255,.50)}
          .gsho-wc{background:linear-gradient(135deg,rgba(0,109,44,.06) 0%,rgba(255,255,255,.88) 60%,rgba(82,183,136,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(0,109,44,.07)}
          .gsho-wck{width:36px;height:36px;border-radius:10px;background:rgba(0,109,44,.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .gsho-wck svg{width:18px;height:18px;color:${ACCENT}}
          .gsho-wh{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px}
          .gsho-wp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .gsho-pn{font-size:3.5rem;font-weight:900;color:rgba(0,109,44,.07);line-height:1;margin-bottom:8px;letter-spacing:-2px}
          .gsho-pl{width:40px;height:3px;background:linear-gradient(90deg,${ACCENT},rgba(0,109,44,.3));border-radius:2px;margin-bottom:16px}
          .gsho-ph{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px}
          .gsho-pp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .gsho-fl{display:flex;flex-direction:column;gap:10px}
          .gsho-fi{background:linear-gradient(135deg,rgba(0,109,44,.06) 0%,rgba(255,255,255,.88) 60%,rgba(82,183,136,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,109,44,.06)}
          .gsho-fi.open{border-color:rgba(0,109,44,.35)}
          .gsho-fb{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit}
          .gsho-fq{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4}
          .gsho-fic{width:28px;height:28px;border-radius:50%;background:rgba(0,109,44,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .2s}
          .gsho-fi.open .gsho-fic{background:rgba(0,109,44,.15);transform:rotate(45deg)}
          .gsho-fic svg{width:14px;height:14px;color:${ACCENT}}
          .gsho-fa{padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8}
          .gsho-cta{background:linear-gradient(135deg,rgba(0,109,44,.10) 0%,rgba(255,255,255,.70) 40%,rgba(82,183,136,.08) 100%);padding:90px 40px;text-align:center}
          .gsho-cth{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;margin:0 0 18px;background:linear-gradient(90deg,#003319 0%,${ACCENT} 50%,#52b788 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .gsho-ctp{font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px}
          @media(max-width:900px){.gsho-g3,.gsho-rg{grid-template-columns:1fr 1fr}}
          @media(max-width:600px){.gsho-hero,.gsho-sec,.gsho-rb,.gsho-cta{padding-left:20px;padding-right:20px}.gsho-hero{padding-top:60px;padding-bottom:50px}.gsho-g3,.gsho-rg{grid-template-columns:1fr}.gsho-bc{padding:12px 20px}}
        `}</style>
      </Head>
      <nav className="gsho-bc"><div className="gsho-bci"><Link href="/">Home</Link><span className="gsho-sep">›</span><Link href="/seo-services-company/">Digital Marketing</Link><span className="gsho-sep">›</span><span className="gsho-cur">Google Shopping Management</span></div></nav>
      <section className="gsho-hero"><div className="gsho-o1"/><div className="gsho-o2"/>
        <div className="gsho-in">
          <span className="gsho-ey">eCommerce Advertising — Feed Optimisation · Shopping · Performance Max · ROAS</span>
          <h1 className="gsho-h1">Google Shopping Ads That Put Your Products in Front of Ready-to-Buy Customers</h1>
          <p className="gsho-p">1Solutions manages Google Shopping campaigns that drive eCommerce revenue — with feed-first optimisation, granular campaign structures, and ROAS-focused bidding that converts browsers into buyers.</p>
          <div className="gsho-btns">
            <Link href="/contact-us" className="gsho-bp">Get a Free Feed Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/contact-us" className="gsho-bs">Discuss Your Shopping Campaigns</Link>
          </div>
          <div className="gsho-tr">{['Feed-first optimisation','Flat management fee','You own your account','ROAS-focused bidding'].map(t=><span key={t} className="gsho-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>)}</div>
          <div className="gsho-sbar">{[{num:'300+',lbl:'eCommerce Clients'},{num:'15+',lbl:'Years Experience'},{num:'4.6×',lbl:'Avg ROAS'},{num:'96%',lbl:'Retention Rate'}].map(s=><div key={s.lbl} className="gsho-si"><span className="gsho-sn">{s.num}</span><span className="gsho-sl">{s.lbl}</span></div>)}</div>
        </div>
      </section>
      <section className="gsho-sec gsho-bg"><div className="gsho-si2">
        <span className="gsho-tag">What We Manage</span>
        <h2 className="gsho-h2">Complete <span>Google Shopping Services</span></h2>
        <p className="gsho-lead">From Merchant Center setup to Performance Max — every component of Google Shopping managed by eCommerce specialists.</p>
        <div className="gsho-g3">{SERVICES.map(s=><div key={s.title} className="gsho-card"><div className="gsho-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div><h3 className="gsho-ch">{s.title}</h3><p className="gsho-cp">{s.desc}</p></div>)}</div>
      </div></section>
      <section className="gsho-rb"><div className="gsho-ri">
        <span className="gsho-rt">Client Results</span>
        <h2 className="gsho-rh">Google Shopping Results That Justify the Investment</h2>
        <div className="gsho-rg">{RESULTS.map(r=><div key={r.label} className="gsho-rc"><div className="gsho-rm" style={{color:r.color}}>{r.metric}</div><div className="gsho-rl">{r.label}</div><div className="gsho-rs">{r.sub}</div></div>)}</div>
      </div></section>
      <section className="gsho-sec"><div className="gsho-si2">
        <span className="gsho-tag">Why 1Solutions</span>
        <h2 className="gsho-h2">The Shopping Ads Partner <span>That Starts With Your Feed</span></h2>
        <p className="gsho-lead">We optimise the thing most agencies ignore — your product feed — because that is where Shopping performance is actually won or lost.</p>
        <div className="gsho-g3">{WHY.map(w=><div key={w.title} className="gsho-wc"><div className="gsho-wck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="gsho-wh">{w.title}</h3><p className="gsho-wp">{w.desc}</p></div>)}</div>
      </div></section>
      <section className="gsho-sec gsho-bg"><div className="gsho-si2">
        <span className="gsho-tag">How We Work</span>
        <h2 className="gsho-h2">Our <span>6-Step Shopping Process</span></h2>
        <p className="gsho-lead">From feed audit to profitable scale — a structured approach built for eCommerce revenue growth.</p>
        <div className="gsho-g3">{PROCESS.map(p=><div key={p.n}><div className="gsho-pn">{p.n}</div><div className="gsho-pl"/><h3 className="gsho-ph">{p.title}</h3><p className="gsho-pp">{p.desc}</p></div>)}</div>
      </div></section>
      <section className="gsho-sec"><div className="gsho-si2">
        <span className="gsho-tag">Got Questions?</span>
        <h2 className="gsho-h2">Google Shopping <span>FAQs</span></h2>
        <div className="gsho-fl">{FAQS.map((f,i)=><div key={i} className={'gsho-fi'+(openFaq===i?' open':'')}><button className="gsho-fb" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="gsho-fq">{f.q}</span><span className="gsho-fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>{openFaq===i&&<div className="gsho-fa">{f.a}</div>}</div>)}</div>
      </div></section>
      <section className="gsho-cta"><div className="gsho-si2">
        <span className="gsho-tag" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Grow Your eCommerce Revenue?</span>
        <h2 className="gsho-cth">Get a Free Google Shopping Feed Audit</h2>
        <p className="gsho-ctp">We will review your product feed, Merchant Center account, and existing Shopping campaigns — identifying where ROAS is being lost and what to fix first.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/contact-us" className="gsho-bp">Request Free Shopping Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
          <Link href="/contact-us" className="gsho-bs">Talk to a Shopping Specialist</Link>
        </div>
      </div></section>
    </>
  );
}
