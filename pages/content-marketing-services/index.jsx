import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#003333';
const SERVICES = [
  { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title: 'Content Strategy & Editorial Calendar', desc: 'Keyword-driven content roadmap with monthly editorial calendar — topics prioritised by search volume, competition, and business value, not just what sounds interesting.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'SEO Blog Writing', desc: 'Long-form blog content targeting high-intent keywords — structured for featured snippets, optimised for E-E-A-T, and written by subject-matter-literate writers who understand your industry.' },
  { icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', title: 'Pillar Pages & Topic Clusters', desc: 'Comprehensive pillar page strategy that clusters related content around core topics — establishing topical authority and building internal link equity that lifts every page in the cluster.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Case Studies & White Papers', desc: 'Client success stories and research-backed white papers that build credibility with B2B buyers — structured for lead generation and bottom-of-funnel conversion.' },
  { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', title: 'Landing Page Copy', desc: 'Conversion-focused landing page copy that matches ad message, builds trust, and guides visitors toward a clear call to action — tested against your existing pages for performance uplift.' },
  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Email Newsletter Content', desc: 'Monthly or weekly newsletter content — value-led, not promotional — that keeps your audience engaged, drives traffic back to your content, and nurtures leads through the funnel.' },
  { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: 'Content Repurposing', desc: 'Transform existing content into new formats — blog to LinkedIn post, webinar to blog series, research to infographic — maximising the return on every piece of original content produced.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Content Performance Audit', desc: 'Analysis of existing content performance — identifying pages to optimise, merge, expand, or retire based on rankings, traffic, and engagement data — with a prioritised action plan.' },
];
const RESULTS = [
  { metric: '380%', label: 'Organic traffic growth', sub: 'US SaaS — 10 months', color: '#4db6ac' },
  { metric: '62', label: 'Top-3 rankings from content', sub: 'AU professional services', color: '#80cbc4' },
  { metric: '4.1×', label: 'Lead volume from blog', sub: 'Canadian B2B software', color: '#a7d9d5' },
];
const PROCESS = [
  { n: '01', title: 'Audience & Keyword Research', desc: 'We research your target audience, buying journey, competitor content gaps, and keyword opportunities — prioritised by search intent, volume, and business value.' },
  { n: '02', title: 'Content Strategy', desc: 'Topic clusters, pillar page map, editorial calendar, and content format mix — a 3 to 6 month roadmap that builds topical authority systematically.' },
  { n: '03', title: 'Brief Creation', desc: 'Detailed content briefs for every piece — target keyword, intent, outline, recommended headings, word count, internal links, and E-E-A-T requirements — so writers produce content that ranks.' },
  { n: '04', title: 'Writing & Review', desc: 'Content written by subject-matter-literate writers, reviewed by an SEO editor, and approved by you before publication — no AI-generated filler content.' },
  { n: '05', title: 'Publish & Optimise', desc: 'Content published with proper on-page SEO — meta tags, schema, internal linking, image optimisation, and page speed checks — then indexed and monitored from day one.' },
  { n: '06', title: 'Measure & Iterate', desc: 'Monthly content performance review — rankings, traffic, time on page, and lead attribution — with recommendations for refreshes, expansions, and new topic opportunities.' },
];
const WHY = [
  { title: 'SEO-First Writing', desc: 'Every piece of content is built around keyword research and search intent — not just topics that sound good. We write to rank, then to convert.' },
  { title: 'E-E-A-T Expertise', desc: 'Experience, Expertise, Authoritativeness, and Trustworthiness are built into every content brief — author bios, data sourcing, expert quotes, and first-hand experience signals.' },
  { title: 'Subject Matter Depth', desc: 'We work with writers who understand your industry — not generalists who produce generic content. B2B SaaS, professional services, finance, health, and eCommerce covered.' },
  { title: 'Content Audit Included', desc: 'We audit your existing content before producing new pieces — so we are not creating duplicate topics and are building on what already has traction.' },
  { title: 'Human Writers Only', desc: 'No AI-generated content. Every piece is written by human writers, edited by SEO specialists, and fact-checked before delivery.' },
  { title: 'Integrated with Link Building', desc: 'Content strategy is aligned with link building — pillar pages and research assets are designed to attract editorial backlinks and support off-page authority growth.' },
];
const FAQS = [
  { q: 'How often should I publish new content?', a: 'For most B2B businesses, publishing 4 to 8 high-quality pieces per month outperforms publishing 20 thin pieces. Consistency and quality matter more than volume. We recommend a publishing cadence based on your existing content baseline, competitor output, and resource availability.' },
  { q: 'What word count is best for SEO?', a: 'Word count should match what is needed to thoroughly address the search intent — not a target number. Informational content typically performs best at 1,500 to 3,000 words. Pillar pages covering broad topics can be 3,000 to 6,000 words. We research the top-ranking pages for each keyword and match or exceed the depth required to rank.' },
  { q: 'Do you use AI to write content?', a: 'No. All content is written by human writers. We believe AI-generated content currently lacks the depth, originality, and experience signals that Google rewards — particularly after the Helpful Content Update. Our writers use research tools, but all output is human-written and editor-reviewed.' },
  { q: 'Can content marketing work for both B2B and B2C?', a: 'Yes. B2B content typically focuses on educational content, thought leadership, case studies, and long-form guides targeting low-to-mid funnel buyers with longer consideration cycles. B2C content is often shorter, more product-focused, and designed for higher-volume informational and transactional queries. We tailor the strategy to your buyer journey.' },
  { q: 'How long before content starts ranking?', a: 'New content on a new domain can take 3 to 6 months to rank. On an established domain with existing authority, content often enters the top 10 within 4 to 12 weeks. Competitive keywords take longer. We target a mix of quick-win opportunities and longer-term authority topics to balance short-term traffic with sustainable growth.' },
  { q: 'How do I measure content marketing ROI?', a: 'We track organic traffic, keyword rankings, time on page, conversion rate by content piece, and lead attribution from blog traffic. For eCommerce, we track assisted conversions. For B2B, we track form submissions and demo requests attributed to organic content. Monthly reporting shows the direct business impact of every piece published.' },
];

export default function ContentMarketingServices() {
  const [openFaq, setOpenFaq] = useState(null);
  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Content Marketing Services', item: 'https://www.1solutions.biz/content-marketing-services/' },
      ]},
      { '@type': 'Service', name: 'Content Marketing Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Content marketing by 1Solutions — SEO blog content, pillar pages, case studies, and content strategy that builds organic traffic and converts readers into leads.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '79', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <>
      <Head>
        <title>Content Marketing Services | SEO Content That Ranks & Converts | 1Solutions</title>
        <meta name="description" content="Content marketing by 1Solutions — SEO blog content, pillar pages, case studies, and content strategy that builds organic traffic and converts readers into leads." />
        <link rel="canonical" href="https://www.1solutions.biz/content-marketing-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box}
          .cmkt-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(0,51,51,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(77,182,172,0.07) 100%)}
          .cmkt-o1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(0,51,51,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px)}
          .cmkt-o2{position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(77,182,172,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px)}
          .cmkt-in{max-width:1200px;margin:0 auto;position:relative;z-index:1}
          .cmkt-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(0,51,51,0.10);border:1px solid rgba(0,51,51,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:24px}
          .cmkt-h1{font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#001a1a 0%,${ACCENT} 45%,#4db6ac 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .cmkt-p{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px}
          .cmkt-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
          .cmkt-bp{display:inline-flex;align-items:center;gap:8px;background:${ACCENT};color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(0,51,51,.25)}
          .cmkt-bp:hover{background:#001a1a;transform:translateY(-2px)}
          .cmkt-bs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.7);color:${ACCENT};padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;border:1.5px solid rgba(0,51,51,.18);transition:all .25s;backdrop-filter:blur(8px)}
          .cmkt-bs:hover{background:#fff;transform:translateY(-2px)}
          .cmkt-tr{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px}
          .cmkt-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500}
          .cmkt-sbar{display:flex;border:1px solid rgba(0,51,51,.10);border-radius:16px;background:rgba(255,255,255,.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px}
          .cmkt-si{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(0,51,51,.08)}
          .cmkt-si:last-child{border-right:none}
          .cmkt-sn{font-size:1.9rem;font-weight:900;color:${ACCENT};line-height:1;letter-spacing:-1px}
          .cmkt-sl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px}
          .cmkt-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px}
          .cmkt-bci{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280}
          .cmkt-bci a{color:#6b7280;text-decoration:none}.cmkt-bci a:hover{color:${ACCENT}}
          .cmkt-sep{color:#d1d5db}.cmkt-cur{color:${ACCENT};font-weight:500}
          .cmkt-sec{padding:80px 40px}.cmkt-bg{background:#f8fafd}
          .cmkt-si2{max-width:1200px;margin:0 auto}
          .cmkt-tag{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:12px}
          .cmkt-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;color:#0A1628;margin:0 0 16px}
          .cmkt-h2 span{background:linear-gradient(90deg,${ACCENT},#4db6ac);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .cmkt-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px}
          .cmkt-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .cmkt-card{background:linear-gradient(135deg,rgba(0,51,51,.06) 0%,rgba(255,255,255,.88) 60%,rgba(77,182,172,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(0,51,51,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s}
          .cmkt-card:hover{transform:translateY(-6px);border-color:rgba(0,51,51,.25);box-shadow:0 16px 48px rgba(0,51,51,.12)}
          .cmkt-icon{width:48px;height:48px;border-radius:14px;background:rgba(0,51,51,.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
          .cmkt-icon svg{width:22px;height:22px;color:${ACCENT}}
          .cmkt-ch{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3}
          .cmkt-cp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .cmkt-rb{background:linear-gradient(135deg,#001111 0%,${ACCENT} 100%);padding:64px 40px}
          .cmkt-ri{max-width:1200px;margin:0 auto}
          .cmkt-rt{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(77,182,172,.8);margin-bottom:12px;text-align:center}
          .cmkt-rh{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2}
          .cmkt-rg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .cmkt-rc{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:36px 28px;text-align:center}
          .cmkt-rm{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px}
          .cmkt-rl{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
          .cmkt-rs{font-size:12.5px;color:rgba(255,255,255,.50)}
          .cmkt-wc{background:linear-gradient(135deg,rgba(0,51,51,.06) 0%,rgba(255,255,255,.88) 60%,rgba(77,182,172,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(0,51,51,.07)}
          .cmkt-wck{width:36px;height:36px;border-radius:10px;background:rgba(0,51,51,.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .cmkt-wck svg{width:18px;height:18px;color:${ACCENT}}
          .cmkt-wh{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px}
          .cmkt-wp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .cmkt-pn{font-size:3.5rem;font-weight:900;color:rgba(0,51,51,.07);line-height:1;margin-bottom:8px;letter-spacing:-2px}
          .cmkt-pl{width:40px;height:3px;background:linear-gradient(90deg,${ACCENT},rgba(0,51,51,.3));border-radius:2px;margin-bottom:16px}
          .cmkt-ph{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px}
          .cmkt-pp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .cmkt-fl{display:flex;flex-direction:column;gap:10px}
          .cmkt-fi{background:linear-gradient(135deg,rgba(0,51,51,.06) 0%,rgba(255,255,255,.88) 60%,rgba(77,182,172,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,51,51,.06)}
          .cmkt-fi.open{border-color:rgba(0,51,51,.35)}
          .cmkt-fb{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit}
          .cmkt-fq{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4}
          .cmkt-fic{width:28px;height:28px;border-radius:50%;background:rgba(0,51,51,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .2s}
          .cmkt-fi.open .cmkt-fic{background:rgba(0,51,51,.15);transform:rotate(45deg)}
          .cmkt-fic svg{width:14px;height:14px;color:${ACCENT}}
          .cmkt-fa{padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8}
          .cmkt-cta{background:linear-gradient(135deg,rgba(0,51,51,.10) 0%,rgba(255,255,255,.70) 40%,rgba(77,182,172,.08) 100%);padding:90px 40px;text-align:center}
          .cmkt-cth{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;margin:0 0 18px;background:linear-gradient(90deg,#001a1a 0%,${ACCENT} 50%,#4db6ac 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .cmkt-ctp{font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px}
          @media(max-width:900px){.cmkt-g3,.cmkt-rg{grid-template-columns:1fr 1fr}}
          @media(max-width:600px){.cmkt-hero,.cmkt-sec,.cmkt-rb,.cmkt-cta{padding-left:20px;padding-right:20px}.cmkt-hero{padding-top:60px;padding-bottom:50px}.cmkt-g3,.cmkt-rg{grid-template-columns:1fr}.cmkt-bc{padding:12px 20px}}
        `}</style>
      </Head>
      <nav className="cmkt-bc"><div className="cmkt-bci"><Link href="/">Home</Link><span className="cmkt-sep">›</span><Link href="/seo-services-company/">Digital Marketing</Link><span className="cmkt-sep">›</span><span className="cmkt-cur">Content Marketing Services</span></div></nav>
      <section className="cmkt-hero"><div className="cmkt-o1"/><div className="cmkt-o2"/>
        <div className="cmkt-in">
          <span className="cmkt-ey">Content Marketing — SEO Blog Writing · Pillar Pages · Case Studies · Strategy</span>
          <h1 className="cmkt-h1">Content Marketing That Ranks on Google and Converts Readers Into Leads</h1>
          <p className="cmkt-p">1Solutions produces SEO-first content that builds topical authority, drives sustainable organic traffic, and converts readers into leads — written by human specialists who understand your industry.</p>
          <div className="cmkt-btns">
            <Link href="/contact-us" className="cmkt-bp">Get a Free Content Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/contact-us" className="cmkt-bs">Discuss Your Content Strategy</Link>
          </div>
          <div className="cmkt-tr">{['Human writers only','SEO-first approach','Content audit included','No AI-generated filler'].map(t=><span key={t} className="cmkt-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>)}</div>
          <div className="cmkt-sbar">{[{num:'380%',lbl:'Avg Traffic Growth'},{num:'15+',lbl:'Years Experience'},{num:'62',lbl:'Top-3 Rankings'},{num:'4.1×',lbl:'Lead Growth'}].map(s=><div key={s.lbl} className="cmkt-si"><span className="cmkt-sn">{s.num}</span><span className="cmkt-sl">{s.lbl}</span></div>)}</div>
        </div>
      </section>
      <section className="cmkt-sec cmkt-bg"><div className="cmkt-si2">
        <span className="cmkt-tag">What We Deliver</span>
        <h2 className="cmkt-h2">Full-Funnel <span>Content Marketing Services</span></h2>
        <p className="cmkt-lead">From strategy to publication — every content type your business needs to build authority, rank on Google, and convert organic visitors into revenue.</p>
        <div className="cmkt-g3">{SERVICES.map(s=><div key={s.title} className="cmkt-card"><div className="cmkt-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div><h3 className="cmkt-ch">{s.title}</h3><p className="cmkt-cp">{s.desc}</p></div>)}</div>
      </div></section>
      <section className="cmkt-rb"><div className="cmkt-ri">
        <span className="cmkt-rt">Client Results</span>
        <h2 className="cmkt-rh">Content Marketing Results That Compound Over Time</h2>
        <div className="cmkt-rg">{RESULTS.map(r=><div key={r.label} className="cmkt-rc"><div className="cmkt-rm" style={{color:r.color}}>{r.metric}</div><div className="cmkt-rl">{r.label}</div><div className="cmkt-rs">{r.sub}</div></div>)}</div>
      </div></section>
      <section className="cmkt-sec"><div className="cmkt-si2">
        <span className="cmkt-tag">Why 1Solutions</span>
        <h2 className="cmkt-h2">The Content Partner <span>That Writes to Rank and Convert</span></h2>
        <p className="cmkt-lead">We produce content that earns organic traffic and generates leads — not content that just fills an editorial calendar.</p>
        <div className="cmkt-g3">{WHY.map(w=><div key={w.title} className="cmkt-wc"><div className="cmkt-wck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="cmkt-wh">{w.title}</h3><p className="cmkt-wp">{w.desc}</p></div>)}</div>
      </div></section>
      <section className="cmkt-sec cmkt-bg"><div className="cmkt-si2">
        <span className="cmkt-tag">How We Work</span>
        <h2 className="cmkt-h2">Our <span>6-Step Content Marketing Process</span></h2>
        <p className="cmkt-lead">From keyword research to published, optimised content — a structured approach that builds compounding organic growth.</p>
        <div className="cmkt-g3">{PROCESS.map(p=><div key={p.n}><div className="cmkt-pn">{p.n}</div><div className="cmkt-pl"/><h3 className="cmkt-ph">{p.title}</h3><p className="cmkt-pp">{p.desc}</p></div>)}</div>
      </div></section>
      <section className="cmkt-sec"><div className="cmkt-si2">
        <span className="cmkt-tag">Got Questions?</span>
        <h2 className="cmkt-h2">Content Marketing <span>FAQs</span></h2>
        <div className="cmkt-fl">{FAQS.map((f,i)=><div key={i} className={'cmkt-fi'+(openFaq===i?' open':'')}><button className="cmkt-fb" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="cmkt-fq">{f.q}</span><span className="cmkt-fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>{openFaq===i&&<div className="cmkt-fa">{f.a}</div>}</div>)}</div>
      </div></section>
      <section className="cmkt-cta"><div className="cmkt-si2">
        <span className="cmkt-tag" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Build Organic Traffic That Converts?</span>
        <h2 className="cmkt-cth">Get a Free Content Audit</h2>
        <p className="cmkt-ctp">We will review your existing content, identify keyword gaps and optimisation opportunities, and share a content strategy roadmap — completely free.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/contact-us" className="cmkt-bp">Request Free Content Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
          <Link href="/contact-us" className="cmkt-bs">Talk to a Content Strategist</Link>
        </div>
      </div></section>
    </>
  );
}
