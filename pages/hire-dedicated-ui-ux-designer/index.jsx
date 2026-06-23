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

const ACCENT = '#5e0050';
const SKILLS = [
  'Figma (Components, Auto Layout, Variables)', 'Adobe XD & Illustrator', 'User Research & Persona Creation',
  'Information Architecture', 'Wireframing & Rapid Prototyping', 'Interaction Design & Micro-Animations',
  'Design Systems & Tokens', 'Accessibility (WCAG 2.1 AA)', 'Usability Testing & A/B Testing',
  'Conversion Rate Optimisation (CRO)', 'Mobile-First & Responsive Design', 'Motion Design (Principle, Lottie)',
  'User Journey Mapping', 'Heatmap & Analytics Analysis', 'Handoff (Zeplin, Storybook, Dev Mode)',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time UI/UX designer embedded in your product team — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for design system maintenance, feature design, or usability testing cycles.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for UX audits, accessibility reviews, or one-off component design sprints.', icon: '🕐' },
];
const WHY = [
  { h: 'Research-Led Design', b: 'Our designers start with user interviews, heatmap analysis, and journey mapping before opening Figma — not after.' },
  { h: 'Figma-Native Teams', b: 'Auto Layout, component properties, variables, and Dev Mode — our designers deliver production-ready handoff specs, not static mockups.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your design brief and receive 2-3 matched UI/UX designer profiles with portfolio links within two business days.' },
  { h: 'Design System Fluency', b: 'We build scalable design systems with tokens, typography scales, and color grids that developers can consume directly via code.' },
  { h: 'Conversion Focus', b: 'Our designers tie every design decision to business outcomes — click-through rate, form completion, retention — not just aesthetics.' },
  { h: 'NDA & IP Protection', b: 'NDA and IP assignment signed before any access to your Figma files, user research, or product roadmap.' },
];
const PROCESS = [
  { n: '01', h: 'Share Your Design Brief', b: 'Describe the product, your users, pain points, and the design outcomes you want to achieve.' },
  { n: '02', h: 'Receive Portfolios', b: '2-3 matched designer profiles with relevant case studies delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Review portfolios, run a design critique session, or assign a short discovery task.' },
  { n: '04', h: 'Onboard & Design', b: 'Designer joins your Figma workspace and ships first wireframes within 7 days.' },
];
const FAQS = [
  { q: 'Do your designers do user research or just visual design?', a: 'Both. Our designers are trained in UX research methods — user interviews, card sorting, tree testing, usability sessions — and can run the full double-diamond process, not just deliver mockups.' },
  { q: 'Which tools do they use?', a: 'Primarily Figma for UI design, prototyping, and design systems. Also Adobe XD, Illustrator, Principle for motion, and Lottie for developer-ready animations. Accessibility validation via axe and NVDA/VoiceOver.' },
  { q: 'Can they build or maintain a design system?', a: 'Yes. We create and maintain scalable design systems in Figma — component libraries, token sets, typography and color grids — with developer handoff via Dev Mode, Zeplin, or Storybook integration.' },
  { q: 'Do they deliver accessible designs?', a: 'Yes. Our designers validate against WCAG 2.1 AA as standard — colour contrast ratios, focus states, touch target sizes, ARIA annotations in handoff specs, and screen reader testing.' },
  { q: 'Can they work with our existing brand or style guide?', a: 'Yes. Our designers extend and adhere to existing brand guidelines while improving usability. If no style guide exists, they can create one as part of the engagement.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HireDedicatedUiUxDesigner() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(40); const [c2, s2] = useCountUp(220);
  const [c3, s3] = useCountUp(49); const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(40); s2(220); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire Dedicated UI/UX Designer', item: 'https://www.1solutions.biz/hire-dedicated-ui-ux-designer/' },
      ]},
      { '@type': 'Service', name: 'Hire Dedicated UI/UX Designer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated UI/UX designers from 1Solutions — Figma experts in user research, design systems, and accessible product design.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '96', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire Dedicated UI/UX Designer | Figma &amp; User Research Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated UI/UX designers from 1Solutions. Figma-native designers skilled in user research, design systems, accessibility, and conversion-focused product design. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-dedicated-ui-ux-designer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .huiux-hero{background:linear-gradient(135deg,${ACCENT} 0%,#2e0028 60%,#420038 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .huiux-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .huiux-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .huiux-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .huiux-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .huiux-btn-primary:hover{opacity:.88}
          .huiux-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .huiux-btn-outline:hover{border-color:#fff}
          .huiux-sec{padding:70px 20px}.huiux-sec-alt{background:#faf0f8}
          .huiux-wrap{max-width:1100px;margin:0 auto}
          .huiux-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .huiux-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .huiux-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .huiux-skill{background:#fff;border:1.5px solid #d0a0c8;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .huiux-skill.huiux-in{opacity:1;transform:none}
          .huiux-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .huiux-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #d0a0c8;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .huiux-model.huiux-in{opacity:1;transform:none}
          .huiux-model-icon{font-size:2.2rem;margin-bottom:14px}
          .huiux-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .huiux-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .huiux-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .huiux-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .huiux-why-item.huiux-in{opacity:1;transform:none}
          .huiux-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .huiux-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .huiux-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .huiux-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #d0a0c8;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .huiux-step.huiux-in{opacity:1;transform:none}
          .huiux-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .huiux-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .huiux-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .huiux-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .huiux-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .huiux-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .huiux-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .huiux-faq{max-width:760px;margin:0 auto}
          .huiux-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .huiux-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .huiux-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .huiux-faq-icon.huiux-open{transform:rotate(45deg)}
          .huiux-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .huiux-cta{background:linear-gradient(135deg,${ACCENT},#2e0028);padding:80px 20px;text-align:center;color:#fff}
          .huiux-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .huiux-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.huiux-hero{padding:80px 18px 60px}.huiux-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="huiux-hero">
        <h1>Hire Dedicated UI/UX Designers<br/>Figma &amp; User Research Specialists</h1>
        <p>Pre-vetted designers who combine rigorous user research with conversion-focused visual design — building products people actually enjoy using. Profiles in 48 hours.</p>
        <div className="huiux-hero-btns">
          <Link href="/contact-us" className="huiux-btn-primary">Hire a UI/UX Designer →</Link>
          <Link href="/portfolio" className="huiux-btn-outline">View Portfolio</Link>
        </div>
      </section>
      <section className="huiux-sec" ref={skR}>
        <div className="huiux-wrap">
          <h2 className="huiux-sec-title">Design Skills &amp; Tools</h2>
          <p className="huiux-sec-sub">Our designers cover the full UX spectrum — from research to production-ready Figma handoff.</p>
          <div className="huiux-skills">{SKILLS.map((s, i) => <span key={s} className={`huiux-skill${skV ? ' huiux-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="huiux-sec huiux-sec-alt" ref={enR}>
        <div className="huiux-wrap">
          <h2 className="huiux-sec-title">Flexible Engagement Models</h2>
          <p className="huiux-sec-sub">Embed a designer into your product team or engage for a focused sprint.</p>
          <div className="huiux-models">{MODELS.map((m, i) => <div key={m.title} className={`huiux-model${enV ? ' huiux-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="huiux-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="huiux-sec" ref={whR}>
        <div className="huiux-wrap">
          <h2 className="huiux-sec-title">Why Hire UI/UX Designers from 1Solutions?</h2>
          <p className="huiux-sec-sub">We place designers who treat UX as a business discipline, not a decoration layer.</p>
          <div className="huiux-why-grid">{WHY.map((w, i) => <div key={w.h} className={`huiux-why-item${whV ? ' huiux-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="huiux-stats" ref={stGr}>
        <div className="huiux-stats-grid">
          <div><div className="huiux-stat-val">{stV ? c1 : 0}+</div><div className="huiux-stat-label">UI/UX Designers</div></div>
          <div><div className="huiux-stat-val">{stV ? c2 : 0}+</div><div className="huiux-stat-label">Products Designed</div></div>
          <div><div className="huiux-stat-val">4.{stV ? c3 : 0}/5</div><div className="huiux-stat-label">Client Satisfaction</div></div>
          <div><div className="huiux-stat-val">{stV ? c4 : 0} Days</div><div className="huiux-stat-label">Avg Onboarding</div></div>
        </div>
      </section>
      <section className="huiux-sec huiux-sec-alt" ref={prR}>
        <div className="huiux-wrap">
          <h2 className="huiux-sec-title">Hire in 4 Simple Steps</h2>
          <p className="huiux-sec-sub">From design brief to first wireframes — in under two weeks.</p>
          <div className="huiux-process">{PROCESS.map((p, i) => <div key={p.n} className={`huiux-step${prV ? ' huiux-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="huiux-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="huiux-sec">
        <div className="huiux-wrap">
          <h2 className="huiux-sec-title">Frequently Asked Questions</h2>
          <p className="huiux-sec-sub">Common questions before hiring a UI/UX designer from 1Solutions.</p>
          <div className="huiux-faq">{FAQS.map((f, i) => <div key={i} className="huiux-faq-item"><div className="huiux-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`huiux-faq-icon${openFaq === i ? ' huiux-open' : ''}`}>+</span></div>{openFaq === i && <p className="huiux-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="huiux-cta">
        <div className="huiux-wrap">
          <h2>Ready to Hire Your Dedicated UI/UX Designer?</h2>
          <p>Share your product goals and receive matched designer profiles with portfolios within 48 hours — no commitment required.</p>
          <Link href="/contact-us" className="huiux-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
