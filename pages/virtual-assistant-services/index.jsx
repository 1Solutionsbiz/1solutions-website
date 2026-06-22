'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const raf = useRef(null);
  const start = (t) => {
    const s = performance.now();
    const step = (now) => {
      const p = Math.min((now - s) / duration, 1);
      setCount(Math.floor(p * t));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return [count, start];
}

const ACCENT = '#065f46';
const SKILLS = [
  'Email & Calendar Management', 'Customer Support (Email & Chat)', 'E-Commerce Order Management',
  'Amazon Seller Central', 'Shopify Store Management', 'Data Entry & CRM Updates',
  'Research & Competitor Analysis', 'Social Media Scheduling', 'Content Formatting & Uploading',
  'Invoice & Accounts Tracking', 'Travel & Meeting Coordination', 'Recruitment Support',
  'Report Preparation', 'WordPress Content Updates', 'Lead Generation & Prospecting',
];
const MODELS = [
  { title: 'Full-Time VA',  desc: 'A dedicated VA working 8 hrs/day, 5 days/week — fully committed to your business, trained on your systems, and managed by a 1Solutions team lead.', icon: '👤' },
  { title: 'Part-Time VA',  desc: 'A half-day VA for 4 hrs/day — ideal for e-commerce operations, admin support, or social media management that doesn\'t yet need a full-time resource.', icon: '⏰' },
  { title: 'Hourly VA',     desc: 'Flexible VA hours for project-based tasks — research sprints, data entry projects, or temporary cover during busy periods.', icon: '🕐' },
];
const WHY = [
  { h: 'Pre-Vetted & Trained',       b: 'Every VA completes a structured onboarding programme covering communication skills, data security, and your specific task categories before their first day.' },
  { h: 'Dedicated — Not Shared',     b: 'Your VA works exclusively for you during their contracted hours — they are not juggling 10 clients simultaneously like most VA agencies.' },
  { h: 'Team Lead Oversight',        b: 'Each VA is supervised by a 1Solutions team lead who reviews work quality, handles performance, and ensures your tasks are completed on time.' },
  { h: 'Replacement Guarantee',      b: 'If your VA is unavailable or underperforms, we replace them within 48 hours — no disruption to your operations.' },
  { h: 'Secure & Confidential',      b: 'All VAs sign NDAs, operate on secure, audited infrastructure, and follow strict data handling protocols — your business information never leaves our secure environment.' },
  { h: 'Profiles in 48 Hours',       b: 'Submit your VA brief and receive 2–3 matched VA profiles with skill assessments and background checks within two business days.' },
];
const PROCESS = [
  { n: '01', h: 'Submit Your Brief',   b: 'Tell us the tasks, tools, hours, time zone, and communication preferences for your ideal VA.' },
  { n: '02', h: 'Receive Profiles',    b: '2–3 matched VA profiles with skill assessments and work samples delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select',  b: 'Interview your preferred candidate — run a short task test if needed. No commitment until you\'re ready.' },
  { n: '04', h: 'Onboard & Start',     b: 'Your VA joins your tools and systems. First day within 7 days of selection. Team lead checks in weekly.' },
];
const FAQS = [
  { q: 'What tasks can a virtual assistant handle?', a: 'Email and calendar management, customer support (email and chat), e-commerce operations (order processing, inventory, listings on Amazon and Shopify), data entry, research, social media scheduling, content uploading, CRM updates, travel booking, and basic bookkeeping support. If it can be done remotely on a computer, a VA can do it.' },
  { q: 'Which time zones do your VAs work in?', a: 'We provide VAs across IST, GMT, EST, CST, MST, and PST time zones. For US and Australian clients, we offer VAs with significant overlap in your business hours. We discuss time zone requirements during the briefing call.' },
  { q: 'How quickly can a VA start?', a: 'You can have a VA working for you within 7 days of selection. We typically deliver matched profiles within 48 hours of receiving your brief, then allow 3–5 days for interviews, selection, and onboarding.' },
  { q: 'Is my business data secure?', a: 'Yes. All VAs operate on secure, monitored devices; sign NDAs before starting; follow strict data handling protocols; and access your systems only via approved methods. We never use shared or personal devices for client work.' },
  { q: 'What if the VA is sick or leaves?', a: 'If your VA is unavailable for more than one day, a trained backup steps in same day. If a VA resigns or is unsuitable, we provide a replacement within 48 hours at no extra charge.' },
  { q: 'Do you sign NDAs?', a: 'Yes. Both 1Solutions and your individual VA sign NDA and confidentiality agreements before any access to your systems or business information.' },
];

export default function VirtualAssistantServices() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(200); const [c2, s2] = useCountUp(500);
  const [c3, s3] = useCountUp(49);  const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(200); s2(500); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Virtual Assistant Services', item: 'https://www.1solutions.biz/virtual-assistant-services/' },
      ]},
      { '@type': 'Service', name: 'Virtual Assistant Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Dedicated virtual assistant services from 1Solutions — pre-vetted VAs for business admin, e-commerce operations, customer support, and social media management.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '118', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Virtual Assistant Services | Dedicated VA for Business &amp; E-Commerce | 1Solutions</title>
        <meta name="description" content="Hire dedicated virtual assistants from 1Solutions. We provide VAs for admin, customer support, e-commerce operations, social media, data entry, and research — trained, managed, and available 8 hrs/day." />
        <link rel="canonical" href="https://www.1solutions.biz/virtual-assistant-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .vas-hero{background:linear-gradient(135deg,${ACCENT} 0%,#022c22 60%,#064e3b 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .vas-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .vas-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .vas-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .vas-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .vas-btn-primary:hover{opacity:.88}
          .vas-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .vas-btn-outline:hover{border-color:#fff}
          .vas-sec{padding:70px 20px}.vas-sec-alt{background:#f0fdf4}
          .vas-wrap{max-width:1100px;margin:0 auto}
          .vas-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .vas-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .vas-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .vas-skill{background:#fff;border:1.5px solid #6ee7b7;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .vas-skill.vas-in{opacity:1;transform:none}
          .vas-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .vas-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #6ee7b7;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .vas-model.vas-in{opacity:1;transform:none}
          .vas-model-icon{font-size:2.2rem;margin-bottom:14px}
          .vas-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .vas-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .vas-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .vas-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .vas-why-item.vas-in{opacity:1;transform:none}
          .vas-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .vas-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .vas-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .vas-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #6ee7b7;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .vas-step.vas-in{opacity:1;transform:none}
          .vas-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .vas-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .vas-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .vas-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .vas-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .vas-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .vas-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .vas-faq{max-width:760px;margin:0 auto}
          .vas-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .vas-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .vas-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .vas-faq-icon.vas-open{transform:rotate(45deg)}
          .vas-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .vas-cta{background:linear-gradient(135deg,${ACCENT},#022c22);padding:80px 20px;text-align:center;color:#fff}
          .vas-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .vas-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.vas-hero{padding:80px 18px 60px}.vas-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="vas-hero">
        <h1>Virtual Assistant Services<br/>Dedicated VAs for Business, E-Commerce &amp; Admin</h1>
        <p>Hire pre-vetted, dedicated virtual assistants trained in business admin, e-commerce operations, customer support, social media, and research. Full-time or part-time, your VA starts within 7 days — saving you 20+ hours a week.</p>
        <div className="vas-hero-btns">
          <Link href="/contact" className="vas-btn-primary">Hire a Virtual Assistant →</Link>
          <Link href="/contact" className="vas-btn-outline">Learn More</Link>
        </div>
      </section>
      <section className="vas-sec" ref={skR}>
        <div className="vas-wrap">
          <h2 className="vas-sec-title">Skills &amp; Task Coverage</h2>
          <p className="vas-sec-sub">Our VAs cover the full range of business and e-commerce operations — from inbox zero to Amazon Seller Central.</p>
          <div className="vas-skills">{SKILLS.map((s, i) => <span key={s} className={`vas-skill${skV ? ' vas-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="vas-sec vas-sec-alt" ref={enR}>
        <div className="vas-wrap">
          <h2 className="vas-sec-title">Flexible Engagement Models</h2>
          <p className="vas-sec-sub">Choose the model that fits your workload — scale up or down as your business grows.</p>
          <div className="vas-models">{MODELS.map((m, i) => <div key={m.title} className={`vas-model${enV ? ' vas-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="vas-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="vas-sec" ref={whR}>
        <div className="vas-wrap">
          <h2 className="vas-sec-title">Why Hire a Virtual Assistant from 1Solutions?</h2>
          <p className="vas-sec-sub">We don't just find you a VA — we manage them, train them, and guarantee their performance.</p>
          <div className="vas-why-grid">{WHY.map((w, i) => <div key={w.h} className={`vas-why-item${whV ? ' vas-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="vas-stats" ref={stGr}>
        <div className="vas-stats-grid">
          <div><div className="vas-stat-val">{stV ? c1 : 0}+</div><div className="vas-stat-label">Virtual Assistants</div></div>
          <div><div className="vas-stat-val">{stV ? c2 : 0}+</div><div className="vas-stat-label">Clients Served</div></div>
          <div><div className="vas-stat-val">4.{stV ? c3 : 0}/5</div><div className="vas-stat-label">Client Satisfaction</div></div>
          <div><div className="vas-stat-val">{stV ? c4 : 0} Days</div><div className="vas-stat-label">Days to Start</div></div>
        </div>
      </section>
      <section className="vas-sec vas-sec-alt" ref={prR}>
        <div className="vas-wrap">
          <h2 className="vas-sec-title">Hire in 4 Simple Steps</h2>
          <p className="vas-sec-sub">From brief to first working day — in under two weeks.</p>
          <div className="vas-process">{PROCESS.map((p, i) => <div key={p.n} className={`vas-step${prV ? ' vas-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="vas-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="vas-sec">
        <div className="vas-wrap">
          <h2 className="vas-sec-title">Frequently Asked Questions</h2>
          <p className="vas-sec-sub">Common questions before hiring a virtual assistant from 1Solutions.</p>
          <div className="vas-faq">{FAQS.map((f, i) => <div key={i} className="vas-faq-item"><div className="vas-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`vas-faq-icon${openFaq === i ? ' vas-open' : ''}`}>+</span></div>{openFaq === i && <p className="vas-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="vas-cta">
        <div className="vas-wrap">
          <h2>Ready to Hire Your Dedicated Virtual Assistant?</h2>
          <p>Submit your brief and receive 2–3 matched VA profiles within 48 hours — full-time, part-time, or hourly. No long-term contracts.</p>
          <Link href="/contact" className="vas-btn-primary">Hire a Virtual Assistant →</Link>
        </div>
      </section>
    </>
  );
}
