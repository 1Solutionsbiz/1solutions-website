import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#800040';
const SERVICES = [
  { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Google Display Remarketing', desc: 'Audience-based display campaigns across 3M+ websites in the Google Display Network — targeting past visitors with relevant ads based on pages viewed and actions taken.' },
  { icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14', title: 'Meta Pixel Retargeting', desc: 'Facebook and Instagram retargeting using Meta Pixel audiences — segmented by page visits, time on site, video views, and catalogue interactions.' },
  { icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', title: 'Dynamic Product Retargeting', desc: 'Auto-generated ads showing the exact products or services a visitor viewed — dynamically populated from your catalogue for maximum relevance and conversion rate.' },
  { icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z', title: 'LinkedIn Retargeting', desc: 'Re-engage B2B website visitors and LinkedIn content engagers with follow-up Sponsored Content and InMail — keeping your brand visible throughout long B2B buying cycles.' },
  { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', title: 'YouTube Remarketing', desc: 'In-stream and bumper ads served to past website visitors on YouTube — cost-efficient brand reinforcement with high completion rates among warm audiences.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Customer List Targeting', desc: 'Upload existing customer and lead lists to Google, Meta, and LinkedIn to run win-back campaigns, upsell sequences, and lookalike audience expansion.' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'Abandoned Cart Campaigns', desc: 'High-priority remarketing sequences targeting cart abandoners across Google, Meta, and email — with time-based urgency messaging and dynamic product ads.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Audience Segmentation & Sequencing', desc: 'Funnel-stage audience segmentation — top, mid, and bottom — with sequential ad creative that tells a story and guides prospects toward conversion.' },
];
const RESULTS = [
  { metric: '5.2×', label: 'ROAS from cart abandoners', sub: 'US eCommerce brand', color: '#e07cac' },
  { metric: '44%', label: 'Lower CPA vs cold traffic', sub: 'AU service business', color: '#c9607a' },
  { metric: '3.8×', label: 'Conversion rate vs prospecting', sub: 'Canadian SaaS', color: '#f0a0c0' },
];
const PROCESS = [
  { n: '01', title: 'Audience Mapping', desc: 'We map your full funnel — identifying every audience segment worth retargeting, from homepage visitors to cart abandoners to past purchasers — and assign priority and budget logic to each.' },
  { n: '02', title: 'Pixel & Tracking Setup', desc: 'Google Tag Manager setup, Meta Pixel installation, LinkedIn Insight Tag, and all conversion events — verified and tested before any campaigns go live.' },
  { n: '03', title: 'Segment Strategy', desc: 'Audience list creation for every segment: page visited, time on site, scroll depth, product viewed, cart added, checkout started — and exclusions to avoid wasting spend on converters.' },
  { n: '04', title: 'Creative by Funnel Stage', desc: 'Ad creative designed for the intent level of each audience — soft brand reminders for early visitors, product-specific ads for category browsers, urgency-led messaging for cart abandoners.' },
  { n: '05', title: 'Launch & Optimise', desc: 'Campaigns launch across chosen platforms. We monitor frequency caps, audience overlap, and CPA by segment — adjusting bids and creative weekly.' },
  { n: '06', title: 'Report', desc: 'Monthly report showing ROAS and CPA by audience segment, platform, and creative — with clear attribution and next-month recommendations.' },
];
const WHY = [
  { title: 'Cross-Channel Coverage', desc: 'We run remarketing across Google Display, Meta, LinkedIn, and YouTube simultaneously — so your prospects see you everywhere they spend time online.' },
  { title: 'Dynamic Creative', desc: 'Dynamic product ads automatically show the exact products or services each visitor viewed — no static one-size-fits-all banners.' },
  { title: 'Audience Sequencing', desc: 'We build sequential ad journeys that guide prospects through the funnel — from awareness to consideration to conversion — with messaging matched to each stage.' },
  { title: 'Lower CPAs', desc: 'Remarketing audiences convert at 2 to 5 times the rate of cold traffic. We allocate budget where it delivers the lowest cost per conversion.' },
  { title: 'Privacy-Compliant', desc: 'First-party data strategy, consent management, and server-side tracking implementation — remarketing built to work in a cookieless future.' },
  { title: 'No % of Spend', desc: 'Flat monthly management fee regardless of budget size. Your spend goes into campaigns, not agency markups.' },
];
const FAQS = [
  { q: 'What is the difference between remarketing and retargeting?', a: 'The terms are used interchangeably in practice. "Retargeting" originally referred specifically to cookie-based display ad targeting of past website visitors. "Remarketing" is Google\'s term for the same concept, and also includes email re-engagement. Today both terms describe any advertising directed at people who have already interacted with your brand.' },
  { q: 'Does remarketing still work with GDPR and iOS privacy changes?', a: 'Yes, with the right setup. We implement consent management platforms, first-party data strategies, server-side tracking, and Conversions API (Meta) to maintain audience data accuracy. Remarketing has become more complex but remains one of the highest-ROAS tactics available when implemented correctly.' },
  { q: 'How large does my audience need to be for remarketing to work?', a: 'Google requires a minimum of 100 active users for Display remarketing and 1,000 for Search remarketing. Meta requires 100 people for custom audiences. In practice, we recommend at least 500 to 1,000 monthly website visitors before remarketing delivers meaningful scale. Smaller audiences can work for high-value B2B offers.' },
  { q: 'How do you prevent ad fatigue from seeing the same ads too often?', a: 'Frequency caps limit how many times each user sees an ad per day or week. We also rotate creative regularly, use sequential messaging to show different ads over time, and exclude users who have already converted to keep the experience fresh and relevant.' },
  { q: 'How does cross-device remarketing work?', a: 'Google and Meta use identity matching (logged-in users) and probabilistic modelling to connect the same person across devices. This means a visitor who browses on mobile can see your remarketing ad on desktop and vice versa — maintaining reach throughout the buying journey.' },
  { q: 'How long should I remarket to visitors?', a: 'Remarketing window length depends on your sales cycle. For eCommerce, 7 to 14 days captures most cart recovery opportunities. For B2B and high-consideration purchases, 30 to 90 days is typical. We set custom windows by audience segment — shorter for high-intent signals, longer for general visitors.' },
];

export default function RemarketingServices() {
  const [openFaq, setOpenFaq] = useState(null);
  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Remarketing Services', item: 'https://www.1solutions.biz/remarketing-services/' },
      ]},
      { '@type': 'Service', name: 'Remarketing & Retargeting Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Remarketing and retargeting services by 1Solutions — Google Display, Meta, LinkedIn, and dynamic product remarketing to convert lost visitors.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '67', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <>
      <Head>
        <title>Remarketing Services | Retargeting Campaigns That Convert | 1Solutions</title>
        <meta name="description" content="Remarketing and retargeting services by 1Solutions — Google Display, Meta, LinkedIn, and dynamic product remarketing to convert lost visitors." />
        <link rel="canonical" href="https://www.1solutions.biz/remarketing-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box}
          .remk-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(128,0,64,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(200,80,120,0.07) 100%)}
          .remk-o1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(128,0,64,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px)}
          .remk-o2{position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(200,80,120,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px)}
          .remk-in{max-width:1200px;margin:0 auto;position:relative;z-index:1}
          .remk-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(128,0,64,0.10);border:1px solid rgba(128,0,64,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:24px}
          .remk-h1{font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#400020 0%,${ACCENT} 45%,#c85078 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .remk-p{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px}
          .remk-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
          .remk-bp{display:inline-flex;align-items:center;gap:8px;background:${ACCENT};color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(128,0,64,.25)}
          .remk-bp:hover{background:#5a0030;transform:translateY(-2px)}
          .remk-bs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.7);color:${ACCENT};padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;border:1.5px solid rgba(128,0,64,.18);transition:all .25s;backdrop-filter:blur(8px)}
          .remk-bs:hover{background:#fff;transform:translateY(-2px)}
          .remk-tr{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px}
          .remk-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500}
          .remk-sbar{display:flex;border:1px solid rgba(128,0,64,.10);border-radius:16px;background:rgba(255,255,255,.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px}
          .remk-si{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(128,0,64,.08)}
          .remk-si:last-child{border-right:none}
          .remk-sn{font-size:1.9rem;font-weight:900;color:${ACCENT};line-height:1;letter-spacing:-1px}
          .remk-sl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px}
          .remk-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px}
          .remk-bci{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280}
          .remk-bci a{color:#6b7280;text-decoration:none}.remk-bci a:hover{color:${ACCENT}}
          .remk-sep{color:#d1d5db}.remk-cur{color:${ACCENT};font-weight:500}
          .remk-sec{padding:80px 40px}.remk-bg{background:#f8fafd}
          .remk-si2{max-width:1200px;margin:0 auto}
          .remk-tag{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:12px}
          .remk-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;color:#0A1628;margin:0 0 16px}
          .remk-h2 span{background:linear-gradient(90deg,${ACCENT},#c85078);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .remk-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px}
          .remk-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .remk-card{background:linear-gradient(135deg,rgba(128,0,64,.06) 0%,rgba(255,255,255,.88) 60%,rgba(200,80,120,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(128,0,64,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s}
          .remk-card:hover{transform:translateY(-6px);border-color:rgba(128,0,64,.25);box-shadow:0 16px 48px rgba(128,0,64,.12)}
          .remk-icon{width:48px;height:48px;border-radius:14px;background:rgba(128,0,64,.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
          .remk-icon svg{width:22px;height:22px;color:${ACCENT}}
          .remk-ch{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3}
          .remk-cp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .remk-rb{background:linear-gradient(135deg,#200010 0%,${ACCENT} 100%);padding:64px 40px}
          .remk-ri{max-width:1200px;margin:0 auto}
          .remk-rt{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(224,124,172,.8);margin-bottom:12px;text-align:center}
          .remk-rh{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2}
          .remk-rg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .remk-rc{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:36px 28px;text-align:center}
          .remk-rm{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px}
          .remk-rl{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
          .remk-rs{font-size:12.5px;color:rgba(255,255,255,.50)}
          .remk-wc{background:linear-gradient(135deg,rgba(128,0,64,.06) 0%,rgba(255,255,255,.88) 60%,rgba(200,80,120,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(128,0,64,.07)}
          .remk-wck{width:36px;height:36px;border-radius:10px;background:rgba(128,0,64,.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .remk-wck svg{width:18px;height:18px;color:${ACCENT}}
          .remk-wh{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px}
          .remk-wp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .remk-pn{font-size:3.5rem;font-weight:900;color:rgba(128,0,64,.07);line-height:1;margin-bottom:8px;letter-spacing:-2px}
          .remk-pl{width:40px;height:3px;background:linear-gradient(90deg,${ACCENT},rgba(128,0,64,.3));border-radius:2px;margin-bottom:16px}
          .remk-ph{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px}
          .remk-pp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .remk-fl{display:flex;flex-direction:column;gap:10px}
          .remk-fi{background:linear-gradient(135deg,rgba(128,0,64,.06) 0%,rgba(255,255,255,.88) 60%,rgba(200,80,120,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(128,0,64,.06)}
          .remk-fi.open{border-color:rgba(128,0,64,.35)}
          .remk-fb{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit}
          .remk-fq{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4}
          .remk-fic{width:28px;height:28px;border-radius:50%;background:rgba(128,0,64,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .2s}
          .remk-fi.open .remk-fic{background:rgba(128,0,64,.15);transform:rotate(45deg)}
          .remk-fic svg{width:14px;height:14px;color:${ACCENT}}
          .remk-fa{padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8}
          .remk-cta{background:linear-gradient(135deg,rgba(128,0,64,.10) 0%,rgba(255,255,255,.70) 40%,rgba(200,80,120,.08) 100%);padding:90px 40px;text-align:center}
          .remk-cth{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;margin:0 0 18px;background:linear-gradient(90deg,#400020 0%,${ACCENT} 50%,#c85078 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .remk-ctp{font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px}
          @media(max-width:900px){.remk-g3,.remk-rg{grid-template-columns:1fr 1fr}}
          @media(max-width:600px){.remk-hero,.remk-sec,.remk-rb,.remk-cta{padding-left:20px;padding-right:20px}.remk-hero{padding-top:60px;padding-bottom:50px}.remk-g3,.remk-rg{grid-template-columns:1fr}.remk-bc{padding:12px 20px}}
        `}</style>
      </Head>
      <nav className="remk-bc"><div className="remk-bci"><Link href="/">Home</Link><span className="remk-sep">›</span><Link href="/seo-services-company/">Digital Marketing</Link><span className="remk-sep">›</span><span className="remk-cur">Remarketing Services</span></div></nav>
      <section className="remk-hero"><div className="remk-o1"/><div className="remk-o2"/>
        <div className="remk-in">
          <span className="remk-ey">Retargeting — Google · Meta · LinkedIn · YouTube · Dynamic Product Ads</span>
          <h1 className="remk-h1">Remarketing Campaigns That Turn Lost Visitors Into Customers</h1>
          <p className="remk-p">1Solutions manages cross-channel remarketing campaigns that re-engage the 97% of visitors who leave without converting — with audience-specific creative, dynamic product ads, and funnel-stage sequencing.</p>
          <div className="remk-btns">
            <Link href="/contact" className="remk-bp">Get a Free Remarketing Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/contact" className="remk-bs">Discuss Your Retargeting Strategy</Link>
          </div>
          <div className="remk-tr">{['Cross-channel coverage','Dynamic product ads','Privacy-compliant setup','Flat management fee'].map(t=><span key={t} className="remk-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>)}</div>
          <div className="remk-sbar">{[{num:'5.2×',lbl:'Cart Recovery ROAS'},{num:'44%',lbl:'Lower CPA'},{num:'4',lbl:'Channels Covered'},{num:'97%',lbl:'Visitor Recovery Focus'}].map(s=><div key={s.lbl} className="remk-si"><span className="remk-sn">{s.num}</span><span className="remk-sl">{s.lbl}</span></div>)}</div>
        </div>
      </section>
      <section className="remk-sec remk-bg"><div className="remk-si2">
        <span className="remk-tag">What We Manage</span>
        <h2 className="remk-h2">Complete Cross-Channel <span>Remarketing Services</span></h2>
        <p className="remk-lead">Every remarketing format across every platform — built, segmented, and optimised to recover lost visitors at the lowest possible CPA.</p>
        <div className="remk-g3">{SERVICES.map(s=><div key={s.title} className="remk-card"><div className="remk-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div><h3 className="remk-ch">{s.title}</h3><p className="remk-cp">{s.desc}</p></div>)}</div>
      </div></section>
      <section className="remk-rb"><div className="remk-ri">
        <span className="remk-rt">Client Results</span>
        <h2 className="remk-rh">Remarketing Results That Recover Lost Revenue</h2>
        <div className="remk-rg">{RESULTS.map(r=><div key={r.label} className="remk-rc"><div className="remk-rm" style={{color:r.color}}>{r.metric}</div><div className="remk-rl">{r.label}</div><div className="remk-rs">{r.sub}</div></div>)}</div>
      </div></section>
      <section className="remk-sec"><div className="remk-si2">
        <span className="remk-tag">Why 1Solutions</span>
        <h2 className="remk-h2">The Remarketing Partner <span>That Converts Warm Audiences</span></h2>
        <p className="remk-lead">We build remarketing programs that match the right message to the right audience at the right time — across every channel your prospects visit.</p>
        <div className="remk-g3">{WHY.map(w=><div key={w.title} className="remk-wc"><div className="remk-wck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="remk-wh">{w.title}</h3><p className="remk-wp">{w.desc}</p></div>)}</div>
      </div></section>
      <section className="remk-sec remk-bg"><div className="remk-si2">
        <span className="remk-tag">How We Work</span>
        <h2 className="remk-h2">Our <span>6-Step Remarketing Process</span></h2>
        <p className="remk-lead">From audience mapping to cross-channel launch — a structured approach that turns lost visitors into revenue.</p>
        <div className="remk-g3">{PROCESS.map(p=><div key={p.n}><div className="remk-pn">{p.n}</div><div className="remk-pl"/><h3 className="remk-ph">{p.title}</h3><p className="remk-pp">{p.desc}</p></div>)}</div>
      </div></section>
      <section className="remk-sec"><div className="remk-si2">
        <span className="remk-tag">Got Questions?</span>
        <h2 className="remk-h2">Remarketing <span>FAQs</span></h2>
        <div className="remk-fl">{FAQS.map((f,i)=><div key={i} className={'remk-fi'+(openFaq===i?' open':'')}><button className="remk-fb" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="remk-fq">{f.q}</span><span className="remk-fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>{openFaq===i&&<div className="remk-fa">{f.a}</div>}</div>)}</div>
      </div></section>
      <section className="remk-cta"><div className="remk-si2">
        <span className="remk-tag" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Recover Lost Visitors?</span>
        <h2 className="remk-cth">Get a Free Remarketing Audit</h2>
        <p className="remk-ctp">We will review your current remarketing setup, identify missed audience segments, and share a cross-channel strategy for converting more of the traffic you are already paying for.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/contact" className="remk-bp">Request Free Remarketing Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
          <Link href="/contact" className="remk-bs">Talk to a Retargeting Specialist</Link>
        </div>
      </div></section>
    </>
  );
}
