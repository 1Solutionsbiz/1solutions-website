import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#2d1600';
const SERVICES = [
  { icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', title: 'Brand Monitoring (Real-Time Alerts)', desc: 'Real-time monitoring of your brand name, executive names, and key products across Google, social media, news sites, review platforms, and forums — with instant alerts for new mentions.' },
  { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title: 'Review Acquisition & Management', desc: 'Systematic review generation campaigns across Google, Trustpilot, G2, and industry-specific platforms — with response templates and escalation protocols for every star rating.' },
  { icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', title: 'Negative Review Response Strategy', desc: 'Crafted, on-brand responses to negative reviews that demonstrate accountability, show prospective customers your values, and where possible resolve the reviewer concern to improve the rating.' },
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Google SERP Reputation Management', desc: 'Strategic content creation and SEO to push positive, neutral, and owned content into Google page 1 for brand name searches — gradually displacing negative results from the top positions.' },
  { icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636', title: 'Negative Content Suppression', desc: 'White-hat suppression using authoritative content, digital PR, social profile optimisation, and positive media placement to push negative content down the search results page.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Crisis PR & Response Planning', desc: 'Pre-built crisis response playbooks for common reputation scenarios — data breach, public complaint, media investigation, social media pile-on — so you respond in hours, not days.' },
  { icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14', title: 'Social Mention Monitoring', desc: 'Tracking and categorisation of all social mentions across Facebook, Instagram, LinkedIn, X, TikTok, and Reddit — with sentiment scoring and trend analysis by platform.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Reputation Reporting & Sentiment Scoring', desc: 'Monthly reputation report — overall sentiment score, rating trends by platform, mention volume, SERP position for brand terms, and reputation improvement milestones tracked over time.' },
];
const RESULTS = [
  { metric: '4.6★', label: 'Average Google rating rebuilt', sub: 'US restaurant chain — 12 months', color: '#e0a060' },
  { metric: '3', label: 'Negative news articles suppressed from page 1', sub: 'AU professional services', color: '#d4844a' },
  { metric: '89%', label: 'Positive sentiment score', sub: 'Canadian retail brand', color: '#c8703a' },
];
const PROCESS = [
  { n: '01', title: 'Reputation Audit', desc: 'We audit your current online reputation — Google search results for your brand name, review platform scores, social sentiment, and any existing negative content or press — establishing a baseline.' },
  { n: '02', title: 'Monitoring Setup', desc: 'Real-time monitoring tools deployed across search, news, social, and review platforms — with custom alert thresholds so you are notified of significant mentions before they become crises.' },
  { n: '03', title: 'Review Strategy', desc: 'Review acquisition campaign launched — customer outreach sequences, QR code flows, and email follow-ups designed to generate a steady stream of verified positive reviews.' },
  { n: '04', title: 'Content & SEO Response', desc: 'Positive content strategy executed — owned content, digital PR placements, social profile optimisation, and authoritative third-party features designed to push positive signals to page 1.' },
  { n: '05', title: 'Crisis Protocol', desc: 'Crisis response playbook documented and tested — contact escalation tree, pre-approved response templates, spokesperson briefings, and platform-specific response protocols ready before a crisis occurs.' },
  { n: '06', title: 'Monthly Reporting', desc: 'Monthly reputation report — sentiment score, review volume and rating by platform, SERP analysis for brand terms, and progress against suppression or rating improvement targets.' },
];
const WHY = [
  { title: 'Real-Time Monitoring', desc: 'We detect negative mentions, reviews, and press coverage the moment they appear — giving you hours to respond rather than discovering a problem days later.' },
  { title: 'Multi-Platform Coverage', desc: 'Google, Facebook, Trustpilot, G2, Glassdoor, Reddit, X, Instagram, TikTok, and industry-specific review sites — all monitored from a single programme.' },
  { title: 'White-Hat Suppression', desc: 'All suppression work uses legitimate SEO and content methods — no fake reviews, no paid removal schemes, no tactics that create additional legal or reputational risk.' },
  { title: 'Crisis Response Plan', desc: 'A documented, tested crisis playbook means your team responds decisively and consistently when things go wrong — not improvising under pressure.' },
  { title: 'Transparent Reporting', desc: 'Monthly reports show sentiment score trends, review rating progress, SERP position changes for brand terms, and every action taken — no black-box reputation management.' },
  { title: 'Confidential Engagement', desc: 'Reputation management often involves sensitive matters. We operate with full confidentiality — NDAs available, and our work is never disclosed to third parties.' },
];
const FAQS = [
  { q: 'Can you remove negative Google reviews?', a: 'Google only removes reviews that violate its policies — fake reviews, spam, off-topic content, or reviews containing personal information. We identify policy-violating reviews and submit removal requests with documented evidence. For legitimate negative reviews that comply with policy, removal is not possible — our strategy focuses on generating new positive reviews to improve your overall rating.' },
  { q: 'How quickly can you respond to a reputation crisis?', a: 'For clients on an active reputation management retainer, we can deploy a crisis response within 2 to 4 hours of a significant event — including statement drafting, social media monitoring escalation, and media inquiry routing. For new clients experiencing an active crisis, we offer an emergency engagement with a 48-hour onboarding timeline.' },
  { q: 'What methods do you use to suppress negative content?', a: 'We use only white-hat methods — creating high-authority owned content (press releases, interview features, company pages), securing digital PR placements on authoritative news sites, optimising social profiles for search visibility, and building Wikipedia or industry directory entries where appropriate. These methods push positive content up, displacing negative results over time.' },
  { q: 'Can you manage a crisis involving mainstream media coverage?', a: 'Yes. We have experience coordinating reputation response alongside PR agencies and legal counsel during media investigations and public controversies. Our role is typically digital reputation management — SERP monitoring, social media response, and content strategy — working in parallel with your PR and legal teams rather than replacing them.' },
  { q: 'How long does reputation improvement take?', a: 'Review rating improvement through a systematic acquisition campaign typically shows measurable results within 60 to 90 days. Google SERP suppression — pushing negative content off page 1 — typically takes 4 to 12 months depending on the authority of the negative content and your existing online footprint. We set realistic timelines during the initial audit.' },
  { q: 'Is reputation management confidential?', a: 'Yes. We treat all reputation management engagements as strictly confidential. We sign NDAs on request, do not disclose client relationships publicly, and do not reference your engagement in any marketing or case study materials without explicit written consent. Our team operates on a need-to-know basis internally.' },
];

export default function ReputationManagementServices() {
  const [openFaq, setOpenFaq] = useState(null);
  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Reputation Management Services', item: 'https://www.1solutions.biz/reputation-management-services/' },
      ]},
      { '@type': 'Service', name: 'Reputation Management Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Reputation management by 1Solutions — brand monitoring, review acquisition, negative content suppression, and crisis response for businesses in US, Canada and Australia.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '54', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <>
      <Head>
        <title>Reputation Management Services | Brand Protection & Review Management | 1Solutions</title>
        <meta name="description" content="Reputation management by 1Solutions — brand monitoring, review acquisition, negative content suppression, and crisis response for businesses in US, Canada & Australia." />
        <link rel="canonical" href="https://www.1solutions.biz/reputation-management-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box}
          .repm-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(45,22,0,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(224,160,96,0.07) 100%)}
          .repm-o1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(45,22,0,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px)}
          .repm-o2{position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(224,160,96,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px)}
          .repm-in{max-width:1200px;margin:0 auto;position:relative;z-index:1}
          .repm-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(45,22,0,0.10);border:1px solid rgba(45,22,0,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:24px}
          .repm-h1{font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#100800 0%,${ACCENT} 45%,#c87030 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .repm-p{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px}
          .repm-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
          .repm-bp{display:inline-flex;align-items:center;gap:8px;background:${ACCENT};color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(45,22,0,.25)}
          .repm-bp:hover{background:#100800;transform:translateY(-2px)}
          .repm-bs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.7);color:${ACCENT};padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;border:1.5px solid rgba(45,22,0,.18);transition:all .25s;backdrop-filter:blur(8px)}
          .repm-bs:hover{background:#fff;transform:translateY(-2px)}
          .repm-tr{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px}
          .repm-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500}
          .repm-sbar{display:flex;border:1px solid rgba(45,22,0,.10);border-radius:16px;background:rgba(255,255,255,.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px}
          .repm-si{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(45,22,0,.08)}
          .repm-si:last-child{border-right:none}
          .repm-sn{font-size:1.9rem;font-weight:900;color:${ACCENT};line-height:1;letter-spacing:-1px}
          .repm-sl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px}
          .repm-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px}
          .repm-bci{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280}
          .repm-bci a{color:#6b7280;text-decoration:none}.repm-bci a:hover{color:${ACCENT}}
          .repm-sep{color:#d1d5db}.repm-cur{color:${ACCENT};font-weight:500}
          .repm-sec{padding:80px 40px}.repm-bg{background:#f8fafd}
          .repm-si2{max-width:1200px;margin:0 auto}
          .repm-tag{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:12px}
          .repm-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;color:#0A1628;margin:0 0 16px}
          .repm-h2 span{background:linear-gradient(90deg,${ACCENT},#c87030);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .repm-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px}
          .repm-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .repm-card{background:linear-gradient(135deg,rgba(45,22,0,.06) 0%,rgba(255,255,255,.88) 60%,rgba(224,160,96,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(45,22,0,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s}
          .repm-card:hover{transform:translateY(-6px);border-color:rgba(45,22,0,.25);box-shadow:0 16px 48px rgba(45,22,0,.12)}
          .repm-icon{width:48px;height:48px;border-radius:14px;background:rgba(45,22,0,.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
          .repm-icon svg{width:22px;height:22px;color:${ACCENT}}
          .repm-ch{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3}
          .repm-cp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .repm-rb{background:linear-gradient(135deg,#080300 0%,${ACCENT} 100%);padding:64px 40px}
          .repm-ri{max-width:1200px;margin:0 auto}
          .repm-rt{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(224,160,96,.8);margin-bottom:12px;text-align:center}
          .repm-rh{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2}
          .repm-rg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .repm-rc{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:36px 28px;text-align:center}
          .repm-rm{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px}
          .repm-rl{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
          .repm-rs{font-size:12.5px;color:rgba(255,255,255,.50)}
          .repm-wc{background:linear-gradient(135deg,rgba(45,22,0,.06) 0%,rgba(255,255,255,.88) 60%,rgba(224,160,96,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(45,22,0,.07)}
          .repm-wck{width:36px;height:36px;border-radius:10px;background:rgba(45,22,0,.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .repm-wck svg{width:18px;height:18px;color:${ACCENT}}
          .repm-wh{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px}
          .repm-wp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .repm-pn{font-size:3.5rem;font-weight:900;color:rgba(45,22,0,.07);line-height:1;margin-bottom:8px;letter-spacing:-2px}
          .repm-pl{width:40px;height:3px;background:linear-gradient(90deg,${ACCENT},rgba(45,22,0,.3));border-radius:2px;margin-bottom:16px}
          .repm-ph{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px}
          .repm-pp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .repm-fl{display:flex;flex-direction:column;gap:10px}
          .repm-fi{background:linear-gradient(135deg,rgba(45,22,0,.06) 0%,rgba(255,255,255,.88) 60%,rgba(224,160,96,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(45,22,0,.06)}
          .repm-fi.open{border-color:rgba(45,22,0,.35)}
          .repm-fb{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit}
          .repm-fq{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4}
          .repm-fic{width:28px;height:28px;border-radius:50%;background:rgba(45,22,0,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .2s}
          .repm-fi.open .repm-fic{background:rgba(45,22,0,.15);transform:rotate(45deg)}
          .repm-fic svg{width:14px;height:14px;color:${ACCENT}}
          .repm-fa{padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8}
          .repm-cta{background:linear-gradient(135deg,rgba(45,22,0,.10) 0%,rgba(255,255,255,.70) 40%,rgba(224,160,96,.08) 100%);padding:90px 40px;text-align:center}
          .repm-cth{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;margin:0 0 18px;background:linear-gradient(90deg,#100800 0%,${ACCENT} 50%,#c87030 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .repm-ctp{font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px}
          @media(max-width:900px){.repm-g3,.repm-rg{grid-template-columns:1fr 1fr}}
          @media(max-width:600px){.repm-hero,.repm-sec,.repm-rb,.repm-cta{padding-left:20px;padding-right:20px}.repm-hero{padding-top:60px;padding-bottom:50px}.repm-g3,.repm-rg{grid-template-columns:1fr}.repm-bc{padding:12px 20px}}
        `}</style>
      </Head>
      <nav className="repm-bc"><div className="repm-bci"><Link href="/">Home</Link><span className="repm-sep">›</span><Link href="/seo-services-company/">Digital Marketing</Link><span className="repm-sep">›</span><span className="repm-cur">Reputation Management Services</span></div></nav>
      <section className="repm-hero"><div className="repm-o1"/><div className="repm-o2"/>
        <div className="repm-in">
          <span className="repm-ey">Reputation Management — Brand Monitoring · Review Management · Suppression · Crisis Response</span>
          <h1 className="repm-h1">Reputation Management That Protects and Builds Your Brand Online</h1>
          <p className="repm-p">1Solutions manages your online reputation across every platform — monitoring brand mentions in real time, building positive review volume, suppressing negative content from search results, and deploying crisis responses that protect your business when it matters most.</p>
          <div className="repm-btns">
            <Link href="/contact-us" className="repm-bp">Get a Free Reputation Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/contact-us" className="repm-bs">Discuss Your Reputation</Link>
          </div>
          <div className="repm-tr">{['Real-time monitoring','White-hat methods only','Confidential engagement','Crisis protocol included'].map(t=><span key={t} className="repm-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>)}</div>
          <div className="repm-sbar">{[{num:'4.6★',lbl:'Rating Rebuilt'},{num:'89%',lbl:'Positive Sentiment'},{num:'3',lbl:'Page-1 Suppressions'},{num:'15+',lbl:'Years Experience'}].map(s=><div key={s.lbl} className="repm-si"><span className="repm-sn">{s.num}</span><span className="repm-sl">{s.lbl}</span></div>)}</div>
        </div>
      </section>
      <section className="repm-sec repm-bg"><div className="repm-si2">
        <span className="repm-tag">What We Manage</span>
        <h2 className="repm-h2">Complete <span>Reputation Management Services</span></h2>
        <p className="repm-lead">From real-time brand monitoring to crisis response — every service needed to protect, repair, and build your online reputation.</p>
        <div className="repm-g3">{SERVICES.map(s=><div key={s.title} className="repm-card"><div className="repm-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div><h3 className="repm-ch">{s.title}</h3><p className="repm-cp">{s.desc}</p></div>)}</div>
      </div></section>
      <section className="repm-rb"><div className="repm-ri">
        <span className="repm-rt">Client Results</span>
        <h2 className="repm-rh">Reputation Management Results That Restore Trust</h2>
        <div className="repm-rg">{RESULTS.map(r=><div key={r.label} className="repm-rc"><div className="repm-rm" style={{color:r.color}}>{r.metric}</div><div className="repm-rl">{r.label}</div><div className="repm-rs">{r.sub}</div></div>)}</div>
      </div></section>
      <section className="repm-sec"><div className="repm-si2">
        <span className="repm-tag">Why 1Solutions</span>
        <h2 className="repm-h2">The Reputation Partner <span>That Acts Before Problems Escalate</span></h2>
        <p className="repm-lead">We protect your reputation proactively — not reactively. Real-time monitoring, pre-built crisis protocols, and systematic review building keep your brand strong before problems appear.</p>
        <div className="repm-g3">{WHY.map(w=><div key={w.title} className="repm-wc"><div className="repm-wck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="repm-wh">{w.title}</h3><p className="repm-wp">{w.desc}</p></div>)}</div>
      </div></section>
      <section className="repm-sec repm-bg"><div className="repm-si2">
        <span className="repm-tag">How We Work</span>
        <h2 className="repm-h2">Our <span>6-Step Reputation Management Process</span></h2>
        <p className="repm-lead">From reputation audit to continuous protection — a structured approach that builds brand trust and protects it long-term.</p>
        <div className="repm-g3">{PROCESS.map(p=><div key={p.n}><div className="repm-pn">{p.n}</div><div className="repm-pl"/><h3 className="repm-ph">{p.title}</h3><p className="repm-pp">{p.desc}</p></div>)}</div>
      </div></section>
      <section className="repm-sec"><div className="repm-si2">
        <span className="repm-tag">Got Questions?</span>
        <h2 className="repm-h2">Reputation Management <span>FAQs</span></h2>
        <div className="repm-fl">{FAQS.map((f,i)=><div key={i} className={'repm-fi'+(openFaq===i?' open':'')}><button className="repm-fb" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="repm-fq">{f.q}</span><span className="repm-fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>{openFaq===i&&<div className="repm-fa">{f.a}</div>}</div>)}</div>
      </div></section>
      <section className="repm-cta"><div className="repm-si2">
        <span className="repm-tag" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Protect and Build Your Online Reputation?</span>
        <h2 className="repm-cth">Get a Free Reputation Audit</h2>
        <p className="repm-ctp">We will review your current online reputation — Google search results, review platform scores, and social sentiment — and share a clear strategy for protection and improvement.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/contact-us" className="repm-bp">Request Free Reputation Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
          <Link href="/contact-us" className="repm-bs">Talk to a Reputation Specialist</Link>
        </div>
      </div></section>
    </>
  );
}
