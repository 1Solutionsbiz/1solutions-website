import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#00374a';
const SERVICES = [
  { icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z', title: 'Sponsored Content', desc: 'Native single-image, carousel, and video ads that appear in the LinkedIn feed — reaching decision-makers while they consume professional content.' },
  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Message Ads & InMail', desc: 'Personalised InMail delivered directly to target inboxes — high open rates for event invitations, gated content, and demo requests.' },
  { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title: 'Lead Gen Forms', desc: 'Pre-filled LinkedIn Lead Gen Forms that capture name, email, company, and job title without leaving the platform — reducing friction and boosting conversion rates.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Account-Based Marketing (ABM)', desc: 'Target a defined list of companies by name — serving ads exclusively to decision-makers at your most valuable prospect accounts.' },
  { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: 'LinkedIn Retargeting', desc: 'Re-engage website visitors, video viewers, Lead Gen Form openers, and company page visitors with targeted follow-up ads across the LinkedIn network.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Text & Dynamic Ads', desc: 'Cost-efficient sidebar text ads and dynamic ads that auto-personalise with the viewer\'s LinkedIn profile photo and name for higher click-through rates.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'LinkedIn Sales Navigator Integration', desc: 'Sync Sales Navigator audiences with Campaign Manager for outbound and inbound alignment — bridging paid ads with your SDR prospecting sequences.' },
  { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'LinkedIn Insight Tag & Conversion Tracking', desc: 'Insight Tag implementation, website conversion events, and CRM conversion import — so every demo request and form submission is attributed back to the exact campaign.' },
];
const RESULTS = [
  { metric: '58%', label: 'Lower cost per MQL', sub: 'US SaaS company — 5 months', color: '#00b4d8' },
  { metric: '3.4×', label: 'Pipeline growth', sub: 'AU B2B tech company', color: '#90e0ef' },
  { metric: '2.1×', label: 'Demo request volume', sub: 'Canadian enterprise software', color: '#ade8f4' },
];
const PROCESS = [
  { n: '01', title: 'ICP & Audience Build', desc: 'We define your ideal customer profile by job title, seniority, industry, company size, and geography — then build matched audiences in LinkedIn Campaign Manager.' },
  { n: '02', title: 'Campaign Structure & Creative', desc: 'Campaign hierarchy, ad formats, copy, and creative assets — built before launch with A/B variants for message testing from day one.' },
  { n: '03', title: 'Lead Form Optimisation', desc: 'Custom Lead Gen Form questions, thank-you page strategy, and CRM field mapping to ensure every captured lead is complete and qualified.' },
  { n: '04', title: 'CRM Integration', desc: 'Lead Gen Form data connected to your CRM (HubSpot, Salesforce, or other) via native integration or Zapier — leads flow directly to your sales team.' },
  { n: '05', title: 'Weekly Optimisation', desc: 'Bid adjustments, audience refinement, creative rotation, frequency management, and budget reallocation — every week, based on cost-per-MQL data.' },
  { n: '06', title: 'Monthly Reporting', desc: 'Pipeline contribution report showing impressions, leads, MQLs, cost per MQL, and pipeline value attributed to LinkedIn — in plain English.' },
];
const WHY = [
  { title: 'B2B Audience Precision', desc: 'LinkedIn is the only platform that lets you target by job title, company name, seniority, and industry simultaneously — we build audiences that match your exact ICP.' },
  { title: 'ABM Capabilities', desc: 'We run account-based campaigns targeting named companies — serving ads only to decision-makers at your highest-value prospects.' },
  { title: 'Lead Gen Forms', desc: 'Pre-filled forms dramatically reduce friction. We write, structure, and optimise Lead Gen Forms to capture the data your sales team actually needs.' },
  { title: 'CRM Integration', desc: 'LinkedIn leads connect directly to HubSpot, Salesforce, or your CRM of choice — no CSV downloads, no manual entry, no lost leads.' },
  { title: 'Flat Fee', desc: 'We charge a fixed monthly fee — not a percentage of spend. Your ad budget goes into campaigns, not management markups.' },
  { title: 'Transparent Access', desc: 'You own your LinkedIn Campaign Manager account and all campaigns. We work inside it — full visibility and control always stays with you.' },
];
const FAQS = [
  { q: 'How much does LinkedIn advertising cost?', a: 'LinkedIn CPCs typically range from $5 to $15 depending on audience size, competition, and ad format. We recommend a minimum of $2,000/month in ad spend to generate enough data for optimisation. Lead Gen Forms often deliver lower cost per lead than website traffic campaigns.' },
  { q: 'Who can I target with LinkedIn Ads?', a: 'LinkedIn targeting options include job title, job function, seniority level, company name, company size, industry, geography, skills, and LinkedIn Groups. You can also upload contact lists or CRM audiences for matched targeting, and build lookalike audiences from converters.' },
  { q: 'Are Lead Gen Forms better than sending traffic to my website?', a: 'For most B2B campaigns, Lead Gen Forms outperform website landing pages on cost per lead because they are pre-filled with LinkedIn profile data and require zero navigation. However, website traffic campaigns are better for warm retargeting and when your landing page has strong conversion rates already.' },
  { q: 'What budget should I start with on LinkedIn?', a: 'We recommend starting with $2,500 to $5,000/month in ad spend for LinkedIn. This gives enough data across two to three campaigns to identify what converts. LinkedIn ads have higher CPCs than Google or Meta, but the audience quality for B2B is significantly higher.' },
  { q: 'How long before I see results from LinkedIn Ads?', a: 'Lead Gen Form campaigns typically generate leads within the first two weeks. However, the first four to six weeks are used to refine audiences, test creative, and identify the lowest-cost audiences. Stable cost-per-MQL benchmarks are usually established by month two.' },
  { q: 'Is LinkedIn better than Google Ads for B2B?', a: 'They serve different roles. LinkedIn Ads reach buyers proactively by targeting their professional profile — ideal for creating demand and filling your pipeline. Google Ads capture buyers who are actively searching for a solution. The most effective B2B programs run both in parallel, with LinkedIn generating awareness and Google capturing the demand it creates.' },
];

export default function LinkedinAdsManagement() {
  const [openFaq, setOpenFaq] = useState(null);
  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'LinkedIn Ads Management', item: 'https://www.1solutions.biz/linkedin-ads-management/' },
      ]},
      { '@type': 'Service', name: 'LinkedIn Ads Management', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'LinkedIn advertising management by 1Solutions — Sponsored Content, Message Ads, Lead Gen Forms, and account-based targeting for B2B businesses.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '74', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <>
      <Head>
        <title>LinkedIn Ads Management | B2B Lead Generation Specialists | 1Solutions</title>
        <meta name="description" content="LinkedIn advertising management by 1Solutions — Sponsored Content, Message Ads, Lead Gen Forms, and account-based targeting for B2B businesses." />
        <link rel="canonical" href="https://www.1solutions.biz/linkedin-ads-management/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box}
          .lkdn-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(0,55,74,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(0,180,216,0.07) 100%)}
          .lkdn-o1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(0,55,74,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px)}
          .lkdn-o2{position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(0,180,216,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px)}
          .lkdn-in{max-width:1200px;margin:0 auto;position:relative;z-index:1}
          .lkdn-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(0,55,74,0.10);border:1px solid rgba(0,55,74,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:24px}
          .lkdn-h1{font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#002233 0%,${ACCENT} 45%,#00b4d8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .lkdn-p{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px}
          .lkdn-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
          .lkdn-bp{display:inline-flex;align-items:center;gap:8px;background:${ACCENT};color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(0,55,74,.25)}
          .lkdn-bp:hover{background:#002233;transform:translateY(-2px)}
          .lkdn-bs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.7);color:${ACCENT};padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;border:1.5px solid rgba(0,55,74,.18);transition:all .25s;backdrop-filter:blur(8px)}
          .lkdn-bs:hover{background:#fff;transform:translateY(-2px)}
          .lkdn-tr{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px}
          .lkdn-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500}
          .lkdn-sbar{display:flex;border:1px solid rgba(0,55,74,.10);border-radius:16px;background:rgba(255,255,255,.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px}
          .lkdn-si{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(0,55,74,.08)}
          .lkdn-si:last-child{border-right:none}
          .lkdn-sn{font-size:1.9rem;font-weight:900;color:${ACCENT};line-height:1;letter-spacing:-1px}
          .lkdn-sl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px}
          .lkdn-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px}
          .lkdn-bci{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280}
          .lkdn-bci a{color:#6b7280;text-decoration:none}.lkdn-bci a:hover{color:${ACCENT}}
          .lkdn-sep{color:#d1d5db}.lkdn-cur{color:${ACCENT};font-weight:500}
          .lkdn-sec{padding:80px 40px}.lkdn-bg{background:#f8fafd}
          .lkdn-si2{max-width:1200px;margin:0 auto}
          .lkdn-tag{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:12px}
          .lkdn-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;color:#0A1628;margin:0 0 16px}
          .lkdn-h2 span{background:linear-gradient(90deg,${ACCENT},#00b4d8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .lkdn-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px}
          .lkdn-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .lkdn-card{background:linear-gradient(135deg,rgba(0,55,74,.06) 0%,rgba(255,255,255,.88) 60%,rgba(0,180,216,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(0,55,74,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s}
          .lkdn-card:hover{transform:translateY(-6px);border-color:rgba(0,55,74,.25);box-shadow:0 16px 48px rgba(0,55,74,.12)}
          .lkdn-icon{width:48px;height:48px;border-radius:14px;background:rgba(0,55,74,.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
          .lkdn-icon svg{width:22px;height:22px;color:${ACCENT}}
          .lkdn-ch{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3}
          .lkdn-cp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .lkdn-rb{background:linear-gradient(135deg,#001824 0%,${ACCENT} 100%);padding:64px 40px}
          .lkdn-ri{max-width:1200px;margin:0 auto}
          .lkdn-rt{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(0,180,216,.8);margin-bottom:12px;text-align:center}
          .lkdn-rh{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2}
          .lkdn-rg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .lkdn-rc{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:36px 28px;text-align:center}
          .lkdn-rm{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px}
          .lkdn-rl{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
          .lkdn-rs{font-size:12.5px;color:rgba(255,255,255,.50)}
          .lkdn-wc{background:linear-gradient(135deg,rgba(0,55,74,.06) 0%,rgba(255,255,255,.88) 60%,rgba(0,180,216,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(0,55,74,.07)}
          .lkdn-wck{width:36px;height:36px;border-radius:10px;background:rgba(0,55,74,.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .lkdn-wck svg{width:18px;height:18px;color:${ACCENT}}
          .lkdn-wh{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px}
          .lkdn-wp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .lkdn-pn{font-size:3.5rem;font-weight:900;color:rgba(0,55,74,.07);line-height:1;margin-bottom:8px;letter-spacing:-2px}
          .lkdn-pl{width:40px;height:3px;background:linear-gradient(90deg,${ACCENT},rgba(0,55,74,.3));border-radius:2px;margin-bottom:16px}
          .lkdn-ph{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px}
          .lkdn-pp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .lkdn-fl{display:flex;flex-direction:column;gap:10px}
          .lkdn-fi{background:linear-gradient(135deg,rgba(0,55,74,.06) 0%,rgba(255,255,255,.88) 60%,rgba(0,180,216,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,55,74,.06)}
          .lkdn-fi.open{border-color:rgba(0,55,74,.35)}
          .lkdn-fb{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit}
          .lkdn-fq{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4}
          .lkdn-fic{width:28px;height:28px;border-radius:50%;background:rgba(0,55,74,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .2s}
          .lkdn-fi.open .lkdn-fic{background:rgba(0,55,74,.15);transform:rotate(45deg)}
          .lkdn-fic svg{width:14px;height:14px;color:${ACCENT}}
          .lkdn-fa{padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8}
          .lkdn-cta{background:linear-gradient(135deg,rgba(0,55,74,.10) 0%,rgba(255,255,255,.70) 40%,rgba(0,180,216,.08) 100%);padding:90px 40px;text-align:center}
          .lkdn-cth{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;margin:0 0 18px;background:linear-gradient(90deg,#002233 0%,${ACCENT} 50%,#00b4d8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .lkdn-ctp{font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px}
          @media(max-width:900px){.lkdn-g3,.lkdn-rg{grid-template-columns:1fr 1fr}}
          @media(max-width:600px){.lkdn-hero,.lkdn-sec,.lkdn-rb,.lkdn-cta{padding-left:20px;padding-right:20px}.lkdn-hero{padding-top:60px;padding-bottom:50px}.lkdn-g3,.lkdn-rg{grid-template-columns:1fr}.lkdn-bc{padding:12px 20px}}
        `}</style>
      </Head>
      <nav className="lkdn-bc"><div className="lkdn-bci"><Link href="/">Home</Link><span className="lkdn-sep">›</span><Link href="/seo-services-company/">Digital Marketing</Link><span className="lkdn-sep">›</span><span className="lkdn-cur">LinkedIn Ads Management</span></div></nav>
      <section className="lkdn-hero"><div className="lkdn-o1"/><div className="lkdn-o2"/>
        <div className="lkdn-in">
          <span className="lkdn-ey">B2B Advertising — Sponsored Content · InMail · Lead Gen Forms · ABM</span>
          <h1 className="lkdn-h1">LinkedIn Ads That Fill Your B2B Pipeline</h1>
          <p className="lkdn-p">1Solutions manages LinkedIn advertising campaigns that reach the exact decision-makers your sales team wants to talk to — by job title, company, seniority, and industry — and convert them into qualified leads.</p>
          <div className="lkdn-btns">
            <Link href="/contact" className="lkdn-bp">Get a Free LinkedIn Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/contact" className="lkdn-bs">Discuss Your B2B Campaigns</Link>
          </div>
          <div className="lkdn-tr">{['Flat management fee','You own your account','CRM integration included','Weekly optimisation'].map(t=><span key={t} className="lkdn-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>)}</div>
          <div className="lkdn-sbar">{[{num:'200+',lbl:'B2B Clients'},{num:'15+',lbl:'Years Experience'},{num:'58%',lbl:'Lower CPL'},{num:'3.4×',lbl:'Pipeline Growth'}].map(s=><div key={s.lbl} className="lkdn-si"><span className="lkdn-sn">{s.num}</span><span className="lkdn-sl">{s.lbl}</span></div>)}</div>
        </div>
      </section>
      <section className="lkdn-sec lkdn-bg"><div className="lkdn-si2">
        <span className="lkdn-tag">What We Manage</span>
        <h2 className="lkdn-h2">Full-Funnel <span>LinkedIn Advertising Services</span></h2>
        <p className="lkdn-lead">Every LinkedIn ad format — built, launched, and optimised by B2B specialists who understand pipeline metrics, not just click rates.</p>
        <div className="lkdn-g3">{SERVICES.map(s=><div key={s.title} className="lkdn-card"><div className="lkdn-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div><h3 className="lkdn-ch">{s.title}</h3><p className="lkdn-cp">{s.desc}</p></div>)}</div>
      </div></section>
      <section className="lkdn-rb"><div className="lkdn-ri">
        <span className="lkdn-rt">Client Results</span>
        <h2 className="lkdn-rh">LinkedIn Ads Results That Move the Pipeline</h2>
        <div className="lkdn-rg">{RESULTS.map(r=><div key={r.label} className="lkdn-rc"><div className="lkdn-rm" style={{color:r.color}}>{r.metric}</div><div className="lkdn-rl">{r.label}</div><div className="lkdn-rs">{r.sub}</div></div>)}</div>
      </div></section>
      <section className="lkdn-sec"><div className="lkdn-si2">
        <span className="lkdn-tag">Why 1Solutions</span>
        <h2 className="lkdn-h2">The LinkedIn Ads Partner <span>That Thinks in Pipeline, Not Clicks</span></h2>
        <p className="lkdn-lead">We measure success in qualified leads and pipeline value — not impressions, followers, or click-through rates.</p>
        <div className="lkdn-g3">{WHY.map(w=><div key={w.title} className="lkdn-wc"><div className="lkdn-wck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="lkdn-wh">{w.title}</h3><p className="lkdn-wp">{w.desc}</p></div>)}</div>
      </div></section>
      <section className="lkdn-sec lkdn-bg"><div className="lkdn-si2">
        <span className="lkdn-tag">How We Work</span>
        <h2 className="lkdn-h2">Our <span>6-Step LinkedIn Ads Process</span></h2>
        <p className="lkdn-lead">From ICP definition to CRM-connected pipeline — a structured approach built for B2B revenue, not vanity metrics.</p>
        <div className="lkdn-g3">{PROCESS.map(p=><div key={p.n}><div className="lkdn-pn">{p.n}</div><div className="lkdn-pl"/><h3 className="lkdn-ph">{p.title}</h3><p className="lkdn-pp">{p.desc}</p></div>)}</div>
      </div></section>
      <section className="lkdn-sec"><div className="lkdn-si2">
        <span className="lkdn-tag">Got Questions?</span>
        <h2 className="lkdn-h2">LinkedIn Ads <span>FAQs</span></h2>
        <div className="lkdn-fl">{FAQS.map((f,i)=><div key={i} className={'lkdn-fi'+(openFaq===i?' open':'')}><button className="lkdn-fb" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="lkdn-fq">{f.q}</span><span className="lkdn-fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>{openFaq===i&&<div className="lkdn-fa">{f.a}</div>}</div>)}</div>
      </div></section>
      <section className="lkdn-cta"><div className="lkdn-si2">
        <span className="lkdn-tag" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Fill Your B2B Pipeline?</span>
        <h2 className="lkdn-cth">Get a Free LinkedIn Ads Audit</h2>
        <p className="lkdn-ctp">We will review your LinkedIn campaigns (or help you build from scratch), identify audience and creative gaps, and share a clear plan for reducing cost per MQL — completely free.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/contact" className="lkdn-bp">Request Free LinkedIn Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
          <Link href="/contact" className="lkdn-bs">Talk to a LinkedIn Specialist</Link>
        </div>
      </div></section>
    </>
  );
}
