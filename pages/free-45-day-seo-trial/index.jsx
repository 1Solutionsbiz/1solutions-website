import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const INCLUDED = [
  { n: '01', title: 'Full SEO Audit (Worth $499)', desc: 'A comprehensive technical, on-page, and backlink audit of your website — identifying every ranking blocker, crawl issue, content gap, and competitor advantage. Delivered in a detailed PDF report within 5 business days.' },
  { n: '02', title: 'Keyword Research & Opportunity Map', desc: 'In-depth keyword research for your business and industry — identifying the specific search terms your customers use, ranked by volume, difficulty, and commercial intent. A prioritised keyword map for your SEO strategy.' },
  { n: '03', title: 'Competitor Analysis', desc: 'Benchmarking your site against your top 3 organic search competitors — analysing their keyword rankings, backlink profiles, content strategy, and technical advantages to identify exactly where you need to close the gap.' },
  { n: '04', title: '5 Priority On-Page Optimisations', desc: 'We implement the top 5 on-page fixes identified in your audit — title tags, meta descriptions, header structure, internal linking corrections, and canonical tag fixes — real changes to your live site, not just recommendations.' },
  { n: '05', title: 'Google Search Console & Analytics Setup', desc: 'Verifying your Google Search Console setup, confirming sitemaps, resolving any coverage errors, and ensuring your Google Analytics 4 property is correctly configured to track organic traffic and conversions.' },
  { n: '06', title: 'Initial Ranking Baseline Report', desc: 'Your Day 1 keyword ranking positions across 20 target keywords — the baseline against which your 45-day progress is measured. Delivered with your audit so you know your exact starting point.' },
];

const HOW = [
  { step: '01', title: 'Apply for the Free Trial', desc: 'Submit your domain, your target keywords, and your main competitors through our application form. We review every application to confirm we can genuinely move the needle for your site in 45 days.' },
  { step: '02', title: 'Audit & Strategy (Days 1–7)', desc: 'Full SEO audit, keyword research, competitor analysis, and ranking baseline delivered within the first 7 days. We present the strategy and confirm the priority work with you before implementation begins.' },
  { step: '03', title: 'Implementation (Days 8–45)', desc: 'On-page optimisations implemented on your site — plus GSC setup, technical fixes, and content improvements. You have full visibility of everything changed, with before/after comparisons.' },
  { step: '04', title: '45-Day Results Review', desc: 'At Day 45, we compare ranking positions against baseline, report organic traffic changes, and share what has moved — and why. Honest results, win or no win.' },
  { step: '05', title: 'Decision — No Pressure', desc: 'At Day 45, you decide. If the trial demonstrated value, we discuss a paid SEO programme built on what we started. If not, you keep everything we delivered — the audit, the research, and the implemented changes.' },
];

const ELIGIBLE = [
  'Business websites with Google Search Console access',
  'Sites with a minimum 6 months of domain history',
  'Businesses in English-language markets (UK, US, India, Australia)',
  'Sites not affected by active Google manual actions',
  'One application per domain',
  'No adult, gambling, or restricted sector sites',
];

const FAQS = [
  { q: 'What is the 1Solutions free 45-day SEO trial?', a: 'Our free 45-day SEO trial is a no-payment, no-commitment period in which we perform a full SEO audit, keyword research, competitor analysis, and implement 5 priority on-page optimisations on your website — all at no cost. At the end of 45 days, we show you the ranking and traffic changes achieved. If the results demonstrate value and you want to continue with a full paid SEO programme, we discuss that. If not, there is no obligation and you keep everything we delivered. The trial is our way of demonstrating real SEO value before asking for a long-term commitment.' },
  { q: 'Is this really free? What is the catch?', a: 'It is genuinely free. There is no hidden fee, no credit card required, and no automatic billing. The "catch," if you can call it one, is that the trial is limited in scope — 5 on-page fixes plus research deliverables, not a full multi-month SEO programme. It is enough to demonstrate meaningful progress on specific keywords and show what a full programme would achieve. We offer the trial because our conversion rate from trial to paid client is high enough to justify the investment. If we do the work and deliver results, many clients choose to continue. But there is no pressure, no automatic continuation, and no payment obligation at any point during or after the trial.' },
  { q: 'Who is eligible for the free 45-day SEO trial?', a: 'Eligibility requirements: your site must have been live for at least 6 months (new domains have insufficient history for meaningful 45-day results); you must be able to grant us Google Search Console access; your site must not have an active Google manual action; your business must operate in an English-language market (UK, US, India, Australia, Canada); your sector must not be in our restricted list (adult content, online gambling, crypto/NFT trading platforms, pharmaceutical prescription, regulated financial products). We review every application individually to confirm we can realistically deliver meaningful results within the trial period. Applications we do not believe we can make measurable progress on are declined with an explanation — we do not accept every application.' },
  { q: 'What results can I expect in 45 days?', a: 'Realistic expectations for 45 days: meaningful improvement in on-page keyword signals for the 5 priority pages we optimise; technical issue resolution that removes crawl and indexation blockers (which often produces ranking improvement within 2 to 4 weeks); initial ranking movement for low-competition target keywords, particularly long-tail terms; and in some cases, meaningful ranking improvement for mid-competition terms if the site has reasonable domain authority and the keyword is within range. What 45 days cannot achieve: significant ranking improvement for highly competitive, high-volume keywords; results on very new domains; or recovery from algorithmic penalties. We set honest expectations at the start based on your specific site assessment.' },
  { q: 'Will you need access to my website and Google accounts?', a: 'Yes — but only the access necessary to do the work. We need: Google Search Console access (view and full access) to diagnose indexation issues and submit sitemaps; Google Analytics 4 read access to understand current traffic patterns; website admin access (WordPress, Wix, Shopify, or equivalent) to implement the 5 on-page changes. We document every change made to your site in a change log with before/after screenshots. You can revoke access at any time. All access is handled under our standard confidentiality agreement, shared at the start of the trial.' },
  { q: 'What happens after the 45-day trial?', a: 'At Day 45, we present the results report and have an honest conversation. If the trial delivered ranking improvements and you want to build on them, we recommend a paid SEO programme tailored to your goals, budget, and competitive position. If results were minimal (which we try to prevent by vetting applications honestly), we explain why and whether a paid programme would change the outcome with more resource and time. There is no automatic continuation, no invoice, and no pressure. The trial is designed to let the results make the case — if they do not, we do not expect you to pay for more.' },
  { q: 'How many free trials do you accept per month?', a: 'We accept a limited number of free trial applications per month — typically 5 to 8, depending on current team capacity. This ensures every trial client gets genuine attention and quality work rather than token deliverables. Applications are reviewed in order of receipt and assessed for fit. If your application is declined or waitlisted due to capacity, we will tell you clearly and give you a realistic timeline. We do not take more trials than we can deliver well.' },
  { q: 'Can I apply for a trial if I have had bad SEO experiences before?', a: 'Yes — in fact, businesses that have been burned by poor SEO work in the past are exactly who this trial is designed for. Previous bad SEO experiences often leave sites with technical debt, thin content, or backlink profiles that need cleaning up before new work can produce results. We audit all of this in the first week and give you an honest assessment of what state your site is in. If previous SEO work has left issues that need fixing before meaningful progress is possible, we tell you — and explain what that remediation involves as part of a full paid programme. The trial gives you a risk-free way to evaluate our quality and approach before committing to any spend.' },
];

const STATS = [
  { label: 'Trials Run', val: '400+' },
  { label: 'Trial-to-Client Rate', val: '72%' },
  { label: 'Avg Ranking Improvement', val: '+28 pos' },
  { label: 'NPS Score', val: '94' },
];

export default function Free45DaySeoTrial() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { INCLUDED.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Free 45-Day SEO Trial', item: 'https://www.1solutions.biz/free-45-day-seo-trial/' }] }, { '@type': 'Offer', name: 'Free 45-Day SEO Trial', price: '0', priceCurrency: 'USD', description: 'Free 45-day SEO trial including full audit, keyword research, competitor analysis, and 5 on-page optimisations — no payment required.', url: 'https://www.1solutions.biz/free-45-day-seo-trial/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Free 45-Day SEO Trial | No Payment, No Commitment | 1Solutions</title>
        <meta name="description" content="Free 45-day SEO trial — full audit, keyword research, competitor analysis, and 5 on-page optimisations implemented on your site at no cost. No payment, no commitment. Results first." />
        <meta name="keywords" content="free seo trial, 45 day seo trial, free seo audit, free seo services trial, try seo free, seo free trial, no commitment seo" />
        <link rel="canonical" href="https://www.1solutions.biz/free-45-day-seo-trial/" />
        <meta property="og:title" content="Free 45-Day SEO Trial | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/free-45-day-seo-trial/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .f45-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .f45-page *,.f45-page *::before,.f45-page *::after{box-sizing:border-box}
          .f45-hero{background:linear-gradient(135deg,#0F1F40 0%,#1E3A8A 40%,#1D4ED8 80%,#0F1F40 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .f45-o1{position:absolute;top:-100px;right:-100px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(29,78,216,0.35) 0%,transparent 65%);pointer-events:none;filter:blur(40px)}
          .f45-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(30,58,138,0.25) 0%,transparent 65%);pointer-events:none;filter:blur(40px)}
          .f45-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .f45-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:24px;font-weight:500}
          .f45-bc a{color:rgba(255,255,255,0.5);text-decoration:none}.f45-bc a:hover{color:#fff}.f45-bc span{color:rgba(255,255,255,0.25)}
          .f45-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(29,78,216,0.3);border:1px solid rgba(99,179,237,0.30);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#93C5FD;margin-bottom:28px}
          .f45-h1{font-size:clamp(2.4rem,5vw,4rem);font-weight:900;line-height:1.05;letter-spacing:-1.5px;color:#fff;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .f45-h1 span{background:linear-gradient(90deg,#60A5FA 0%,#93C5FD 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .f45-sub{font-size:1.1rem;color:rgba(255,255,255,0.75);line-height:1.75;max-width:660px;margin:0 auto 36px}
          .f45-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .f45-btn-p{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#1E3A8A;padding:16px 36px;border-radius:50px;font-weight:800;font-size:1rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 24px rgba(0,0,0,0.30)}
          .f45-btn-p:hover{background:#EFF6FF;box-shadow:0 8px 40px rgba(0,0,0,0.40);transform:translateY(-2px)}
          .f45-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.10);border:1.5px solid rgba(255,255,255,0.25);color:#fff;padding:16px 30px;border-radius:50px;font-weight:700;font-size:1rem;text-decoration:none;transition:all 0.25s}
          .f45-btn-s:hover{border-color:rgba(255,255,255,0.50);background:rgba(255,255,255,0.18);transform:translateY(-2px)}
          .f45-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.06);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.12);border-radius:20px 20px 0 0}
          .f45-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(255,255,255,0.08)}.f45-stat:last-child{border-right:none}
          .f45-stat-l{font-size:11px;color:rgba(255,255,255,0.5);font-weight:500;margin-bottom:4px}
          .f45-stat-v{font-size:1.6rem;font-weight:900;color:#93C5FD;letter-spacing:-0.5px}
          .f45-inc{background:#f8fafd;padding:80px 40px}.f45-inc-in{max-width:1280px;margin:0 auto}
          .f45-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1D4ED8;margin-bottom:10px;display:block}
          .f45-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#1E3A8A 0%,#1D4ED8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .f45-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .f45-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
          .f45-card{background:linear-gradient(135deg,rgba(239,246,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(219,234,254,0.25) 100%);border:1px solid rgba(29,78,216,0.08);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(29,78,216,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease}
          .f45-card.visible{opacity:1;transform:translateY(0)}.f45-card:hover{transform:translateY(-6px);border-color:rgba(29,78,216,0.20);box-shadow:0 16px 48px rgba(29,78,216,0.09)}
          .f45-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#1D4ED8;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .f45-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .f45-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .f45-proc{background:linear-gradient(135deg,#fff 0%,#eff6ff 50%,#fff 100%);padding:80px 40px}
          .f45-proc-in{max-width:900px;margin:0 auto}
          .f45-steps{display:flex;flex-direction:column;margin-top:44px}
          .f45-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(29,78,216,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .f45-step:last-child{border-bottom:none}.f45-step.visible{opacity:1;transform:translateX(0)}
          .f45-snum{font-size:3rem;font-weight:900;color:rgba(29,78,216,0.15);line-height:1;letter-spacing:-2px}
          .f45-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .f45-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .f45-elig{background:#0F1F40;padding:60px 40px}
          .f45-elig-in{max-width:860px;margin:0 auto;text-align:center}
          .f45-elig h2{font-size:clamp(1.6rem,3vw,2.2rem);font-weight:900;color:#fff;margin-bottom:32px}
          .f45-elist{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(2,1fr);gap:12px;text-align:left}
          .f45-elist li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:rgba(255,255,255,0.75);line-height:1.5}
          .f45-elist li::before{content:'✓';color:#60A5FA;font-weight:800;font-size:16px;flex-shrink:0;margin-top:-1px}
          .f45-faq{background:#f8fafd;padding:80px 40px}.f45-faq-in{max-width:860px;margin:0 auto}
          .f45-fitem{border-bottom:1px solid #e5e7eb}
          .f45-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .f45-fq:hover{color:#1D4ED8}
          .f45-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .f45-fitem.open .f45-ficon{border-color:#1D4ED8;color:#1D4ED8;background:rgba(29,78,216,0.06)}
          .f45-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .f45-fitem.open .f45-fa{max-height:600px;padding-bottom:22px}
          .f45-cta{background:linear-gradient(135deg,#0F1F40 0%,#1E3A8A 50%,#1D4ED8 100%);padding:100px 40px;position:relative;overflow:hidden;text-align:center}
          .f45-cta-o{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(29,78,216,0.40) 0%,transparent 60%);pointer-events:none}
          .f45-cta-in{position:relative;z-index:1;max-width:700px;margin:0 auto}
          .f45-cta-t{font-size:clamp(2rem,4vw,3.2rem);font-weight:900;color:#fff;line-height:1.1;margin-bottom:16px}
          .f45-cta-s{font-size:1.05rem;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 auto 36px;max-width:520px}
          @media(max-width:1024px){.f45-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.f45-hero,.f45-inc,.f45-proc,.f45-elig,.f45-faq,.f45-cta{padding:60px 24px}.f45-hero{padding-top:60px;padding-bottom:0}.f45-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.f45-stat:nth-child(2){border-right:none}.f45-grid{grid-template-columns:1fr}.f45-step{grid-template-columns:56px 1fr}.f45-elist{grid-template-columns:1fr}.f45-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="f45-page">
        <section className="f45-hero"><div className="f45-o1"/><div className="f45-o2"/>
          <div className="f45-in">
            <nav className="f45-bc"><Link href="/">Home</Link><span>/</span><span>Free 45-Day SEO Trial</span></nav>
            <span className="f45-badge"><span style={{width:6,height:6,borderRadius:'50%',background:'#60A5FA',display:'inline-block'}}/> Zero Payment · Zero Commitment · Real Results</span>
            <h1 className="f45-h1">Try Our SEO — <span>45 Days Free.</span><br/>Results First, Then Decide.</h1>
            <p className="f45-sub">A full SEO audit, keyword research, competitor analysis, and 5 on-page optimisations implemented on your live site — completely free for 45 days. No payment, no contract, no catch.</p>
            <div className="f45-btns">
              <Link href="/contact-us" className="f45-btn-p">Apply for the Free Trial <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-services-company" className="f45-btn-s">See Full SEO Services</Link>
            </div>
            <div className="f45-stats">{STATS.map(s => <div key={s.label} className="f45-stat"><div className="f45-stat-l">{s.label}</div><div className="f45-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="f45-inc"><div className="f45-inc-in">
          <span className="f45-ey2">What You Get — Free</span><h2 className="f45-ttl">Everything Included in Your Free 45-Day Trial</h2>
          <p className="f45-desc">Not a demo. Not a surface-level audit. Real deliverables, real implementation, real tracking — delivered free for 45 days.</p>
          <div className="f45-grid" ref={cardsRef}>{INCLUDED.map((s,i) => <div key={s.n} className={`f45-card${visibleCards.includes(i)?' visible':''}`}><div className="f45-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="f45-proc"><div className="f45-proc-in">
          <span className="f45-ey2">How It Works</span><h2 className="f45-ttl">The 45-Day Trial Process</h2>
          <p className="f45-desc">Application to results review — a structured 45-day process with full transparency at every stage.</p>
          <div className="f45-steps">{HOW.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`f45-step${visibleSteps.includes(i)?' visible':''}`}><div className="f45-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="f45-elig"><div className="f45-elig-in">
          <h2>Who Is Eligible for the Free Trial?</h2>
          <ul className="f45-elist">{ELIGIBLE.map(e => <li key={e}>{e}</li>)}</ul>
        </div></section>
        <section className="f45-faq"><div className="f45-faq-in">
          <span className="f45-ey2">Got Questions?</span><h2 className="f45-ttl">Free SEO Trial FAQs</h2>
          <p className="f45-desc" style={{marginBottom:44}}>Everything you need to know about our free 45-day SEO trial.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`f45-fitem${openFaq===i?' open':''}`}><button className="f45-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="f45-ficon">{openFaq===i?'−':'+'}</span></button><div className="f45-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="f45-cta"><div className="f45-cta-o"/>
          <div className="f45-cta-in">
            <h2 className="f45-cta-t">Ready to see what SEO can do for your site?</h2>
            <p className="f45-cta-s">Apply for the free 45-day trial. We review every application and respond within 48 hours. Limited to 5–8 new trials per month.</p>
            <div className="f45-btns">
              <Link href="/contact-us" className="f45-btn-p">Apply for Your Free Trial Now <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/affordable-seo-packages" className="f45-btn-s">View SEO Packages</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
