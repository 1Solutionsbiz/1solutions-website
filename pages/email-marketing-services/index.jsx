import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#6b0023';
const SERVICES = [
  { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title: 'Email Strategy & Audit', desc: 'Current email program audit, revenue attribution analysis, deliverability health check, list quality assessment, and a 90-day roadmap for automation and list growth.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Welcome & Onboarding Sequences', desc: 'Automated welcome series that introduces new subscribers to your brand, builds trust, and guides them toward their first purchase or conversion — typically 3 to 7 emails over 2 weeks.' },
  { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: 'Drip & Nurture Campaigns', desc: 'Behaviour-triggered email sequences that nurture leads based on their actions — content downloads, page visits, form fills — delivering the right message at each stage of the buyer journey.' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'Cart Abandonment Recovery', desc: 'Multi-step cart abandonment sequences — timed at 1 hour, 24 hours, and 72 hours — with dynamic product pulls, social proof, and personalised subject lines that recover lost revenue.' },
  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Broadcast & Newsletter Campaigns', desc: 'Monthly or weekly email broadcasts — promotions, product launches, newsletters, and seasonal campaigns — written, designed, and segmented for maximum open rate and click-through.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Segmentation & Personalisation', desc: 'List segmentation by purchase history, browse behaviour, engagement level, location, and LTV — so each subscriber receives emails relevant to their interests and stage in the customer lifecycle.' },
  { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Email Template Design', desc: 'Mobile-optimised, on-brand email templates for every campaign type — promotional, transactional, newsletter, and automation flows — designed and tested across major email clients.' },
  { icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Platform Migration & Setup', desc: 'Migration, integration, and full platform setup for Klaviyo, Mailchimp, HubSpot, and ActiveCampaign — including flows, templates, segments, and integrations with your eCommerce or CRM platform.' },
];
const RESULTS = [
  { metric: '28%', label: 'Of revenue from email', sub: 'AU eCommerce — Klaviyo automation', color: '#f48fb1' },
  { metric: '3.9×', label: 'Cart recovery rate', sub: 'US DTC brand', color: '#f06292' },
  { metric: '52%', label: 'Open rate on welcome series', sub: 'Canadian SaaS onboarding', color: '#ec407a' },
];
const PROCESS = [
  { n: '01', title: 'Platform Audit', desc: 'We review your existing email platform, active flows, list health, deliverability reputation, segmentation setup, and revenue attribution to identify what to fix and what to build.' },
  { n: '02', title: 'List Segmentation', desc: 'Subscriber list cleaned, validated, and segmented by engagement, purchase history, lifecycle stage, and behavioural data — the foundation of personalised email performance.' },
  { n: '03', title: 'Flow Strategy', desc: 'We map every automation flow needed for your business — welcome, browse abandonment, cart abandonment, post-purchase, win-back, and sunset — prioritised by revenue impact.' },
  { n: '04', title: 'Template Design', desc: 'Mobile-first email templates designed in your brand style — for automations, broadcasts, and transactional emails — built and tested across Gmail, Outlook, Apple Mail, and mobile.' },
  { n: '05', title: 'Copy & Build', desc: 'Subject lines, preview text, body copy, and CTAs written for each email in the sequence — then built inside your platform and tested for rendering, links, and tracking.' },
  { n: '06', title: 'Launch & Optimise', desc: 'Flows go live. We monitor open rates, click rates, revenue per email, unsubscribe rates, and deliverability weekly — A/B testing subject lines and content to improve performance continuously.' },
];
const WHY = [
  { title: 'Revenue-Attributed Reporting', desc: 'Every email campaign and automation is attributed to actual revenue — not just opens and clicks. You see exactly what your email program contributes to monthly revenue.' },
  { title: 'Platform Agnostic', desc: 'We work across Klaviyo, Mailchimp, HubSpot, ActiveCampaign, and other major platforms — recommending the right tool for your business, not the one we prefer.' },
  { title: 'List Health Management', desc: 'Regular list cleaning, re-engagement campaigns, and sunset flows keep your list healthy — protecting deliverability and reducing unsubscribe rates over time.' },
  { title: 'Deliverability Expertise', desc: 'Domain authentication (SPF, DKIM, DMARC), IP warming for new senders, and inbox placement monitoring — we protect your sender reputation as a core part of email management.' },
  { title: 'GDPR Compliant', desc: 'Consent management, preference centres, unsubscribe handling, and data retention policies built into every email program — fully compliant with GDPR, CAN-SPAM, and CASL.' },
  { title: 'Integrated with CRM', desc: 'Email automation connected to your CRM — HubSpot, Salesforce, or custom — so lead scoring, sales notifications, and customer data stay in sync across every platform.' },
];
const FAQS = [
  { q: 'Which email platform should I use?', a: 'Platform choice depends on your business type and existing tech stack. For eCommerce, Klaviyo is the industry standard — deep Shopify integration and powerful predictive analytics. For B2B, HubSpot or ActiveCampaign offer better CRM integration and lead scoring. For small businesses with simple needs, Mailchimp is cost-effective. We recommend the right platform based on your goals and budget, not our preference.' },
  { q: 'How large does my list need to be before email marketing is worth it?', a: 'Email marketing is worth investing in from the moment you have 500 active subscribers. Even a small, engaged list with strong automation (welcome, cart abandonment, post-purchase) can generate significant revenue. The return on email marketing compounds as your list grows — we recommend starting the foundational flows early rather than waiting for a large list.' },
  { q: 'What open rates should I expect?', a: 'Industry benchmarks vary significantly by sector. eCommerce averages 20 to 30% open rates. B2B newsletters average 25 to 40%. Welcome emails typically achieve 45 to 60% open rates. These are averages — strong subject lines, list hygiene, and sender reputation all influence your specific rates. We target above-industry-average performance through segmentation and continuous testing.' },
  { q: 'What is the difference between automation and broadcast emails?', a: 'Automation emails are triggered by subscriber behaviour — joining a list, abandoning a cart, making a purchase — and run automatically without manual intervention. Broadcast emails are sent manually to a segment of your list at a specific time — promotions, newsletters, and announcements. A healthy email program uses both: automations run continuously generating revenue, while broadcasts drive campaign-specific results.' },
  { q: 'How do you improve email deliverability?', a: 'Deliverability starts with domain authentication (SPF, DKIM, DMARC records), a clean list (removing bounces, inactive subscribers), consistent sending volume (no sudden spikes), and content that avoids spam triggers. We also monitor your sender reputation, inbox placement rates across major email clients, and adjust sending patterns to maintain deliverability above 95%.' },
  { q: 'Are you GDPR compliant?', a: 'Yes. We implement double opt-in for new subscribers, manage preference centres, handle unsubscribe requests within 10 business days, and structure data retention and deletion policies in line with GDPR. For Canadian clients, we ensure CASL compliance. For US clients, CAN-SPAM compliance is built into every campaign setup.' },
];

export default function EmailMarketingServices() {
  const [openFaq, setOpenFaq] = useState(null);
  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Email Marketing Services', item: 'https://www.1solutions.biz/email-marketing-services/' },
      ]},
      { '@type': 'Service', name: 'Email Marketing Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Email marketing by 1Solutions — automated drip campaigns, welcome sequences, cart abandonment, and broadcast emails that drive revenue for eCommerce and B2B.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '72', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <>
      <Head>
        <title>Email Marketing Services | Drip Campaigns & Automation | 1Solutions</title>
        <meta name="description" content="Email marketing by 1Solutions — automated drip campaigns, welcome sequences, cart abandonment, and broadcast emails that drive revenue for eCommerce and B2B." />
        <link rel="canonical" href="https://www.1solutions.biz/email-marketing-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box}
          .emkt-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(107,0,35,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(244,143,177,0.07) 100%)}
          .emkt-o1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(107,0,35,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px)}
          .emkt-o2{position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(244,143,177,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px)}
          .emkt-in{max-width:1200px;margin:0 auto;position:relative;z-index:1}
          .emkt-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(107,0,35,0.10);border:1px solid rgba(107,0,35,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:24px}
          .emkt-h1{font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#3a0010 0%,${ACCENT} 45%,#ec407a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .emkt-p{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px}
          .emkt-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
          .emkt-bp{display:inline-flex;align-items:center;gap:8px;background:${ACCENT};color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(107,0,35,.25)}
          .emkt-bp:hover{background:#3a0010;transform:translateY(-2px)}
          .emkt-bs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.7);color:${ACCENT};padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;border:1.5px solid rgba(107,0,35,.18);transition:all .25s;backdrop-filter:blur(8px)}
          .emkt-bs:hover{background:#fff;transform:translateY(-2px)}
          .emkt-tr{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px}
          .emkt-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500}
          .emkt-sbar{display:flex;border:1px solid rgba(107,0,35,.10);border-radius:16px;background:rgba(255,255,255,.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px}
          .emkt-si{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(107,0,35,.08)}
          .emkt-si:last-child{border-right:none}
          .emkt-sn{font-size:1.9rem;font-weight:900;color:${ACCENT};line-height:1;letter-spacing:-1px}
          .emkt-sl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px}
          .emkt-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px}
          .emkt-bci{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280}
          .emkt-bci a{color:#6b7280;text-decoration:none}.emkt-bci a:hover{color:${ACCENT}}
          .emkt-sep{color:#d1d5db}.emkt-cur{color:${ACCENT};font-weight:500}
          .emkt-sec{padding:80px 40px}.emkt-bg{background:#f8fafd}
          .emkt-si2{max-width:1200px;margin:0 auto}
          .emkt-tag{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:12px}
          .emkt-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;color:#0A1628;margin:0 0 16px}
          .emkt-h2 span{background:linear-gradient(90deg,${ACCENT},#ec407a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .emkt-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px}
          .emkt-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .emkt-card{background:linear-gradient(135deg,rgba(107,0,35,.06) 0%,rgba(255,255,255,.88) 60%,rgba(244,143,177,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(107,0,35,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s}
          .emkt-card:hover{transform:translateY(-6px);border-color:rgba(107,0,35,.25);box-shadow:0 16px 48px rgba(107,0,35,.12)}
          .emkt-icon{width:48px;height:48px;border-radius:14px;background:rgba(107,0,35,.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
          .emkt-icon svg{width:22px;height:22px;color:${ACCENT}}
          .emkt-ch{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3}
          .emkt-cp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .emkt-rb{background:linear-gradient(135deg,#1a0008 0%,${ACCENT} 100%);padding:64px 40px}
          .emkt-ri{max-width:1200px;margin:0 auto}
          .emkt-rt{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(244,143,177,.8);margin-bottom:12px;text-align:center}
          .emkt-rh{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2}
          .emkt-rg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .emkt-rc{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:36px 28px;text-align:center}
          .emkt-rm{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px}
          .emkt-rl{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
          .emkt-rs{font-size:12.5px;color:rgba(255,255,255,.50)}
          .emkt-wc{background:linear-gradient(135deg,rgba(107,0,35,.06) 0%,rgba(255,255,255,.88) 60%,rgba(244,143,177,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(107,0,35,.07)}
          .emkt-wck{width:36px;height:36px;border-radius:10px;background:rgba(107,0,35,.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .emkt-wck svg{width:18px;height:18px;color:${ACCENT}}
          .emkt-wh{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px}
          .emkt-wp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .emkt-pn{font-size:3.5rem;font-weight:900;color:rgba(107,0,35,.07);line-height:1;margin-bottom:8px;letter-spacing:-2px}
          .emkt-pl{width:40px;height:3px;background:linear-gradient(90deg,${ACCENT},rgba(107,0,35,.3));border-radius:2px;margin-bottom:16px}
          .emkt-ph{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px}
          .emkt-pp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .emkt-fl{display:flex;flex-direction:column;gap:10px}
          .emkt-fi{background:linear-gradient(135deg,rgba(107,0,35,.06) 0%,rgba(255,255,255,.88) 60%,rgba(244,143,177,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(107,0,35,.06)}
          .emkt-fi.open{border-color:rgba(107,0,35,.35)}
          .emkt-fb{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit}
          .emkt-fq{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4}
          .emkt-fic{width:28px;height:28px;border-radius:50%;background:rgba(107,0,35,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .2s}
          .emkt-fi.open .emkt-fic{background:rgba(107,0,35,.15);transform:rotate(45deg)}
          .emkt-fic svg{width:14px;height:14px;color:${ACCENT}}
          .emkt-fa{padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8}
          .emkt-cta{background:linear-gradient(135deg,rgba(107,0,35,.10) 0%,rgba(255,255,255,.70) 40%,rgba(244,143,177,.08) 100%);padding:90px 40px;text-align:center}
          .emkt-cth{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;margin:0 0 18px;background:linear-gradient(90deg,#3a0010 0%,${ACCENT} 50%,#ec407a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .emkt-ctp{font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px}
          @media(max-width:900px){.emkt-g3,.emkt-rg{grid-template-columns:1fr 1fr}}
          @media(max-width:600px){.emkt-hero,.emkt-sec,.emkt-rb,.emkt-cta{padding-left:20px;padding-right:20px}.emkt-hero{padding-top:60px;padding-bottom:50px}.emkt-g3,.emkt-rg{grid-template-columns:1fr}.emkt-bc{padding:12px 20px}}
        `}</style>
      </Head>
      <nav className="emkt-bc"><div className="emkt-bci"><Link href="/">Home</Link><span className="emkt-sep">›</span><Link href="/seo-services-company/">Digital Marketing</Link><span className="emkt-sep">›</span><span className="emkt-cur">Email Marketing Services</span></div></nav>
      <section className="emkt-hero"><div className="emkt-o1"/><div className="emkt-o2"/>
        <div className="emkt-in">
          <span className="emkt-ey">Email Marketing — Klaviyo · Mailchimp · HubSpot · ActiveCampaign · Automation</span>
          <h1 className="emkt-h1">Email Marketing That Nurtures Leads and Drives Repeat Revenue</h1>
          <p className="emkt-p">1Solutions builds email marketing programs that work while you sleep — automated welcome sequences, cart recovery flows, and nurture campaigns that turn subscribers into customers and customers into loyal advocates.</p>
          <div className="emkt-btns">
            <Link href="/contact" className="emkt-bp">Get a Free Email Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/contact" className="emkt-bs">Discuss Your Email Program</Link>
          </div>
          <div className="emkt-tr">{['Revenue-attributed reporting','GDPR compliant','Platform agnostic','Deliverability managed'].map(t=><span key={t} className="emkt-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>)}</div>
          <div className="emkt-sbar">{[{num:'28%',lbl:'Revenue from Email'},{num:'52%',lbl:'Welcome Open Rate'},{num:'3.9×',lbl:'Cart Recovery'},{num:'15+',lbl:'Years Experience'}].map(s=><div key={s.lbl} className="emkt-si"><span className="emkt-sn">{s.num}</span><span className="emkt-sl">{s.lbl}</span></div>)}</div>
        </div>
      </section>
      <section className="emkt-sec emkt-bg"><div className="emkt-si2">
        <span className="emkt-tag">What We Deliver</span>
        <h2 className="emkt-h2">Complete <span>Email Marketing Services</span></h2>
        <p className="emkt-lead">From strategy and automation to design and deliverability — every component of a revenue-generating email program built and managed for you.</p>
        <div className="emkt-g3">{SERVICES.map(s=><div key={s.title} className="emkt-card"><div className="emkt-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div><h3 className="emkt-ch">{s.title}</h3><p className="emkt-cp">{s.desc}</p></div>)}</div>
      </div></section>
      <section className="emkt-rb"><div className="emkt-ri">
        <span className="emkt-rt">Client Results</span>
        <h2 className="emkt-rh">Email Marketing Results That Drive Real Revenue</h2>
        <div className="emkt-rg">{RESULTS.map(r=><div key={r.label} className="emkt-rc"><div className="emkt-rm" style={{color:r.color}}>{r.metric}</div><div className="emkt-rl">{r.label}</div><div className="emkt-rs">{r.sub}</div></div>)}</div>
      </div></section>
      <section className="emkt-sec"><div className="emkt-si2">
        <span className="emkt-tag">Why 1Solutions</span>
        <h2 className="emkt-h2">The Email Partner <span>That Measures Revenue, Not Just Opens</span></h2>
        <p className="emkt-lead">We build email programs that generate measurable revenue — not just campaigns that get opened and forgotten.</p>
        <div className="emkt-g3">{WHY.map(w=><div key={w.title} className="emkt-wc"><div className="emkt-wck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="emkt-wh">{w.title}</h3><p className="emkt-wp">{w.desc}</p></div>)}</div>
      </div></section>
      <section className="emkt-sec emkt-bg"><div className="emkt-si2">
        <span className="emkt-tag">How We Work</span>
        <h2 className="emkt-h2">Our <span>6-Step Email Marketing Process</span></h2>
        <p className="emkt-lead">From platform audit to revenue-generating automations — a structured approach to email that compounds over time.</p>
        <div className="emkt-g3">{PROCESS.map(p=><div key={p.n}><div className="emkt-pn">{p.n}</div><div className="emkt-pl"/><h3 className="emkt-ph">{p.title}</h3><p className="emkt-pp">{p.desc}</p></div>)}</div>
      </div></section>
      <section className="emkt-sec"><div className="emkt-si2">
        <span className="emkt-tag">Got Questions?</span>
        <h2 className="emkt-h2">Email Marketing <span>FAQs</span></h2>
        <div className="emkt-fl">{FAQS.map((f,i)=><div key={i} className={'emkt-fi'+(openFaq===i?' open':'')}><button className="emkt-fb" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="emkt-fq">{f.q}</span><span className="emkt-fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>{openFaq===i&&<div className="emkt-fa">{f.a}</div>}</div>)}</div>
      </div></section>
      <section className="emkt-cta"><div className="emkt-si2">
        <span className="emkt-tag" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Turn Your Email List Into Revenue?</span>
        <h2 className="emkt-cth">Get a Free Email Marketing Audit</h2>
        <p className="emkt-ctp">We will review your current email program, deliverability health, automation flows, and list segmentation — and share a revenue roadmap for your email channel.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/contact" className="emkt-bp">Request Free Email Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
          <Link href="/contact" className="emkt-bs">Talk to an Email Specialist</Link>
        </div>
      </div></section>
    </>
  );
}
