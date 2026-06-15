import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#2d3a8c';
const SERVICES = [
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Facebook Ads', desc: 'Feed, Story, Reels, and Messenger placements — audience targeting via interest, behaviour, lookalike, and custom audiences built from your CRM and website data.' },
  { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Instagram Ads', desc: 'Photo, carousel, video, and Stories ads on Instagram — designed to stop the scroll and drive product discovery, lead generation, and direct conversions.' },
  { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', title: 'Video & Reels Ads', desc: 'Short-form video creative strategy and media buying across Facebook and Instagram Reels — the highest-reach, lowest-CPM format in the Meta ecosystem.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Lead Generation Campaigns', desc: 'Meta Instant Lead Forms with CRM integration — capturing qualified leads without users leaving the app, at CPLs typically 30–50% lower than website campaigns.' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'Meta Catalogue & Shopping Ads', desc: 'Dynamic product ads using your catalogue feed — showing the right products to users who viewed them or similar items, recovering abandoned sessions and driving repeat purchases.' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Audience & Pixel Strategy', desc: 'Meta Pixel and Conversions API (CAPI) implementation, custom event tracking, audience segmentation, and lookalike audience modelling to reduce CPL and increase ROAS.' },
];
const RESULTS = [
  { metric: '4.2×', label: 'ROAS on Meta catalogue ads', sub: 'AU fashion eCommerce — 6 months', color: '#FE9700' },
  { metric: '61%', label: 'Lower cost per lead', sub: 'US B2C service business — Instant Forms', color: '#7C3AED' },
  { metric: '3.1×', label: 'Revenue from retargeting', sub: 'Canadian DTC brand — dynamic ads', color: ACCENT },
];
const PROCESS = [
  { n: '01', title: 'Account & Pixel Audit', desc: 'We review your current campaigns, pixel events, audience quality, and creative performance — identifying what is wasting budget and what to double down on.' },
  { n: '02', title: 'Audience & Funnel Strategy', desc: 'We map your funnel — awareness (cold audiences), consideration (video viewers, page engagers), and conversion (retargeting, lookalikes) — with budget allocation for each stage.' },
  { n: '03', title: 'Creative Strategy', desc: 'We develop ad creative briefs (or produce creative directly) — hooks, formats, and copy angles proven to perform in your market and vertical.' },
  { n: '04', title: 'Launch & Test', desc: 'Campaigns launch with structured A/B tests on audience, creative, and landing page — generating clean data to optimise from.' },
  { n: '05', title: 'Optimise Weekly', desc: 'Budget reallocation, creative rotation, audience exclusions, and bid adjustments — every week, based on performance data, not hunches.' },
  { n: '06', title: 'Report', desc: 'Weekly dashboards and monthly insight reports with CPM, CTR, CPC, CPL, ROAS, and revenue attribution — tied to your actual business outcomes.' },
];
const WHY = [
  { title: 'Creative-First Approach', desc: 'On Meta, creative is targeting. We invest in understanding your audience\'s scroll behaviour and build ad creative that earns attention before asking for conversion.' },
  { title: 'Full-Funnel Coverage', desc: 'We run awareness, consideration, and conversion campaigns simultaneously — building audiences at the top to fuel lower-funnel performance.' },
  { title: 'CAPI Implementation', desc: 'Meta Conversions API (server-side tracking) ensures accurate conversion data even with iOS privacy changes — essential for reliable optimisation signals.' },
  { title: 'Flat Management Fee', desc: 'We charge a fixed monthly fee — not a percentage of your ad spend. Our incentive is campaign performance, not inflating your budget.' },
  { title: 'You Own Everything', desc: 'Your Meta Business Manager, ad account, pixel, and audiences are yours. We operate with manager access — everything stays with you if we ever part ways.' },
  { title: 'Integrated with Organic Social', desc: 'We align paid creative with your organic content calendar — maximising social proof on high-performing organic posts through paid amplification.' },
];
const FAQS = [
  { q: 'How much should I spend on Meta Ads?', a: 'We recommend a minimum of $1,000–$2,000/month in ad spend for meaningful data. DTC eCommerce brands often scale to $5,000–$20,000+/month. We provide a budget recommendation based on your industry CPMs, target CPL, and funnel stage.' },
  { q: 'Has Meta Ads performance been affected by iOS privacy changes?', a: 'Yes, but we have adapted. We implement Meta Conversions API (CAPI) for server-side event tracking, use aggregated event measurement correctly, and focus on broad audience strategies that perform well in a less-tracked environment.' },
  { q: 'Do you create the ad creative or just manage campaigns?', a: 'Both options are available. We can provide creative strategy briefs for your design team, or we can produce static image, carousel, and video ad creative directly as part of the engagement.' },
  { q: 'Can Meta Ads work for B2B businesses?', a: 'Yes, particularly for B2B businesses targeting SMBs, founders, or specific job-title audiences via interest and demographic targeting. For senior enterprise decision-makers, LinkedIn Ads often performs better alongside Meta.' },
  { q: 'How long before Meta Ads show reliable results?', a: 'The Meta algorithm needs a learning phase — typically 50 conversions per ad set within a 7-day window. For most campaigns, this means 4 to 6 weeks before reliable optimisation data is available and stable CPL/ROAS emerges.' },
  { q: 'Do you manage WhatsApp Ads as well?', a: 'Yes. Click-to-WhatsApp ads are increasingly effective for markets in AU, India, and Latin America where WhatsApp is the primary messaging channel. We can set up lead flows that route directly into WhatsApp for high-intent conversations.' },
];

export default function MetaAdsManagement() {
  const [openFaq, setOpenFaq] = useState(null);
  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Meta Ads Management', item: 'https://www.1solutions.biz/meta-ads-management/' },
      ]},
      { '@type': 'Service', name: 'Meta Ads Management', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Facebook and Instagram advertising management. Audience strategy, creative, lead generation, and dynamic catalogue ads — optimised for ROAS and CPL.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '78', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <>
      <Head>
        <title>Meta Ads Management | Facebook & Instagram Advertising | 1Solutions</title>
        <meta name="description" content="Facebook and Instagram advertising management by 1Solutions. Audience strategy, creative, lead generation, and catalogue ads optimised for ROAS and CPL. US, Canada & Australia." />
        <link rel="canonical" href="https://www.1solutions.biz/meta-ads-management/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box}
          .meta-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(224,231,255,0.55) 0%,rgba(255,255,255,0.70) 50%,rgba(237,233,254,0.45) 100%)}
          .meta-o1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(45,58,140,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px)}
          .meta-o2{position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px)}
          .meta-in{max-width:1200px;margin:0 auto;position:relative;z-index:1}
          .meta-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(45,58,140,0.10);border:1px solid rgba(45,58,140,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:24px}
          .meta-h1{font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#1a1f6e 0%,${ACCENT} 45%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .meta-p{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px}
          .meta-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
          .meta-bp{display:inline-flex;align-items:center;gap:8px;background:${ACCENT};color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(45,58,140,.25)}
          .meta-bp:hover{background:#1e2870;transform:translateY(-2px)}
          .meta-bs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.7);color:${ACCENT};padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;border:1.5px solid rgba(45,58,140,.18);transition:all .25s}
          .meta-bs:hover{background:#fff;transform:translateY(-2px)}
          .meta-tr{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px}
          .meta-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500}
          .meta-sbar{display:flex;border:1px solid rgba(45,58,140,.10);border-radius:16px;background:rgba(255,255,255,.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px}
          .meta-si{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(45,58,140,.08)}
          .meta-si:last-child{border-right:none}
          .meta-sn{font-size:1.9rem;font-weight:900;color:${ACCENT};line-height:1;letter-spacing:-1px}
          .meta-sl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px}
          .meta-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px}
          .meta-bci{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280}
          .meta-bci a{color:#6b7280;text-decoration:none}.meta-bci a:hover{color:${ACCENT}}
          .meta-sep{color:#d1d5db}.meta-cur{color:${ACCENT};font-weight:500}
          .meta-sec{padding:80px 40px}.meta-bg{background:#f8fafd}
          .meta-si2{max-width:1200px;margin:0 auto}
          .meta-tag{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:12px}
          .meta-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;color:#0A1628;margin:0 0 16px}
          .meta-h2 span{background:linear-gradient(90deg,${ACCENT},#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .meta-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px}
          .meta-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .meta-card{background:linear-gradient(135deg,rgba(224,231,255,.45) 0%,rgba(255,255,255,.85) 60%,rgba(237,233,254,.35) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(45,58,140,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s}
          .meta-card:hover{transform:translateY(-6px);border-color:rgba(45,58,140,.25);box-shadow:0 16px 48px rgba(45,58,140,.12)}
          .meta-icon{width:48px;height:48px;border-radius:14px;background:rgba(45,58,140,.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
          .meta-icon svg{width:22px;height:22px;color:${ACCENT}}
          .meta-ch{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3}
          .meta-cp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .meta-rb{background:linear-gradient(135deg,#0d1140 0%,${ACCENT} 100%);padding:64px 40px}
          .meta-ri{max-width:1200px;margin:0 auto}
          .meta-rt{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(165,180,252,.8);margin-bottom:12px;text-align:center}
          .meta-rh{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2}
          .meta-rg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .meta-rc{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:36px 28px;text-align:center}
          .meta-rm{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px}
          .meta-rl{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
          .meta-rs{font-size:12.5px;color:rgba(255,255,255,.50)}
          .meta-wc{background:linear-gradient(135deg,rgba(224,231,255,.45) 0%,rgba(255,255,255,.85) 60%,rgba(237,233,254,.35) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(45,58,140,.07)}
          .meta-wck{width:36px;height:36px;border-radius:10px;background:rgba(45,58,140,.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .meta-wck svg{width:18px;height:18px;color:${ACCENT}}
          .meta-wh{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px}
          .meta-wp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .meta-pn{font-size:3.5rem;font-weight:900;color:rgba(45,58,140,.07);line-height:1;margin-bottom:8px;letter-spacing:-2px}
          .meta-pl{width:40px;height:3px;background:linear-gradient(90deg,${ACCENT},rgba(45,58,140,.3));border-radius:2px;margin-bottom:16px}
          .meta-ph{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px}
          .meta-pp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .meta-fl{display:flex;flex-direction:column;gap:10px}
          .meta-fi{background:linear-gradient(135deg,rgba(224,231,255,.45) 0%,rgba(255,255,255,.85) 60%,rgba(237,233,254,.35) 100%);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(45,58,140,.06)}
          .meta-fi.open{border-color:rgba(45,58,140,.35)}
          .meta-fb{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit}
          .meta-fq{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4}
          .meta-fic{width:28px;height:28px;border-radius:50%;background:rgba(45,58,140,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .2s}
          .meta-fi.open .meta-fic{background:rgba(45,58,140,.15);transform:rotate(45deg)}
          .meta-fic svg{width:14px;height:14px;color:${ACCENT}}
          .meta-fa{padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8}
          .meta-cta{background:linear-gradient(135deg,rgba(224,231,255,.70) 0%,rgba(255,255,255,.60) 40%,rgba(237,233,254,.65) 100%);padding:90px 40px;text-align:center}
          .meta-cth{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;margin:0 0 18px;background:linear-gradient(90deg,#1a1f6e 0%,${ACCENT} 50%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .meta-ctp{font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px}
          @media(max-width:900px){.meta-g3,.meta-rg{grid-template-columns:1fr 1fr}}
          @media(max-width:600px){.meta-hero,.meta-sec,.meta-rb,.meta-cta{padding-left:20px;padding-right:20px}.meta-hero{padding-top:60px;padding-bottom:50px}.meta-g3,.meta-rg{grid-template-columns:1fr}.meta-bc{padding:12px 20px}}
        `}</style>
      </Head>
      <nav className="meta-bc"><div className="meta-bci"><Link href="/">Home</Link><span className="meta-sep">›</span><Link href="/seo-services-company/">Digital Marketing</Link><span className="meta-sep">›</span><span className="meta-cur">Meta Ads</span></div></nav>
      <section className="meta-hero"><div className="meta-o1"/><div className="meta-o2"/>
        <div className="meta-in">
          <span className="meta-ey">Meta Business Partner — Facebook · Instagram · WhatsApp</span>
          <h1 className="meta-h1">Meta Ads That Build Audiences<br/>and Drive Profitable Conversions</h1>
          <p className="meta-p">1Solutions manages Facebook and Instagram advertising campaigns that move buyers through your funnel — from brand awareness to purchase — using precise audience targeting, high-performing creative, and weekly optimisation.</p>
          <div className="meta-btns">
            <Link href="/contact" className="meta-bp">Get a Free Meta Ads Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/contact" className="meta-bs">Discuss Your Campaigns</Link>
          </div>
          <div className="meta-tr">{['CAPI implementation','Creative strategy included','Flat management fee','You own your account'].map(t=><span key={t} className="meta-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>)}</div>
          <div className="meta-sbar">{[{num:'350+',lbl:'Meta Ad Clients'},{num:'15+',lbl:'Years Experience'},{num:'4.2×',lbl:'Avg ROAS'},{num:'97%',lbl:'Retention Rate'}].map(s=><div key={s.lbl} className="meta-si"><span className="meta-sn">{s.num}</span><span className="meta-sl">{s.lbl}</span></div>)}</div>
        </div>
      </section>
      <section className="meta-sec meta-bg"><div className="meta-si2"><span className="meta-tag">What We Manage</span><h2 className="meta-h2">Full-Funnel <span>Meta Advertising Services</span></h2><p className="meta-lead">Every Meta ad format and objective — built, tested, and optimised for your audience and conversion goals.</p><div className="meta-g3">{SERVICES.map(s=><div key={s.title} className="meta-card"><div className="meta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div><h3 className="meta-ch">{s.title}</h3><p className="meta-cp">{s.desc}</p></div>)}</div></div></section>
      <section className="meta-rb"><div className="meta-ri"><span className="meta-rt">Client Results</span><h2 className="meta-rh">Meta Ads Results That Compound Over Time</h2><div className="meta-rg">{RESULTS.map(r=><div key={r.label} className="meta-rc"><div className="meta-rm" style={{color:r.color}}>{r.metric}</div><div className="meta-rl">{r.label}</div><div className="meta-rs">{r.sub}</div></div>)}</div></div></section>
      <section className="meta-sec"><div className="meta-si2"><span className="meta-tag">Why 1Solutions</span><h2 className="meta-h2">The Meta Ads Agency <span>That Invests in Creative</span></h2><p className="meta-lead">We know that on Meta, the creative is the targeting. Every campaign starts with a scroll-stopping hook.</p><div className="meta-g3">{WHY.map(w=><div key={w.title} className="meta-wc"><div className="meta-wck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="meta-wh">{w.title}</h3><p className="meta-wp">{w.desc}</p></div>)}</div></div></section>
      <section className="meta-sec meta-bg"><div className="meta-si2"><span className="meta-tag">How We Work</span><h2 className="meta-h2">Our <span>6-Step Meta Ads Process</span></h2><p className="meta-lead">From pixel audit to profitable scale — structured to minimise wasted spend in the learning phase.</p><div className="meta-g3">{PROCESS.map(p=><div key={p.n}><div className="meta-pn">{p.n}</div><div className="meta-pl"/><h3 className="meta-ph">{p.title}</h3><p className="meta-pp">{p.desc}</p></div>)}</div></div></section>
      <section className="meta-sec"><div className="meta-si2"><span className="meta-tag">Got Questions?</span><h2 className="meta-h2">Meta Ads <span>FAQs</span></h2><div className="meta-fl">{FAQS.map((f,i)=><div key={i} className={'meta-fi'+(openFaq===i?' open':'')}><button className="meta-fb" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="meta-fq">{f.q}</span><span className="meta-fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>{openFaq===i&&<div className="meta-fa">{f.a}</div>}</div>)}</div></div></section>
      <section className="meta-cta"><div className="meta-si2"><span className="meta-tag" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Improve Your Meta Ads?</span><h2 className="meta-cth">Get a Free Meta Ads Audit</h2><p className="meta-ctp">We will review your Facebook and Instagram campaigns, pixel setup, audience strategy, and creative performance — and share a clear improvement plan, completely free.</p><div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}><Link href="/contact" className="meta-bp">Request Free Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link><Link href="/contact" className="meta-bs">Talk to a Meta Ads Specialist</Link></div></div></section>
    </>
  );
}
