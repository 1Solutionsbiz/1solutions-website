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

const ACCENT = '#7c3aed';
const SKILLS = [
  'Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Figma (Visual Design)',
  'Brand Identity Design', 'Logo Design', 'Brand Style Guide Creation', 'Social Media Graphics',
  'Marketing Collateral', 'Print Design (Brochures, Flyers, Posters)', 'Packaging Design',
  'Infographic Design', 'Presentation Design (PowerPoint, Keynote)', 'Email Template Design',
  'Display Ad & Banner Design',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time graphic designer embedded in your marketing or product team — 8 hrs/day, 5 days/week, exclusively yours.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for ongoing social media graphics, campaign assets, or brand maintenance work.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for one-off projects: a logo, a pitch deck, a brochure, or a set of display ads.', icon: '🕐' },
];
const WHY = [
  { h: 'Brand-First Designers', b: 'Our designers understand brand strategy, not just tools. They create visuals that communicate your value proposition and build recognition across every touchpoint.' },
  { h: 'Adobe Suite & Figma Experts', b: 'Proficient across the full Adobe Creative Suite (Illustrator, Photoshop, InDesign) and Figma — they work in whatever tools your team already uses.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your design brief and receive 2-3 matched graphic designer profiles with portfolio links within two business days.' },
  { h: 'Print & Digital Covered', b: 'From business cards and trade show banners to social media templates and digital ad sets — our designers handle the full range, not just one medium.' },
  { h: 'Revision-Friendly Process', b: 'Every engagement includes structured review rounds so you get exactly what you need — no surprise extra charges for changes.' },
  { h: 'NDA & IP Protection', b: 'NDA and IP assignment signed before any access to your brand assets, brief, or design files.' },
];
const PROCESS = [
  { n: '01', h: 'Share Your Brief', b: 'Tell us the design categories, brand guidelines, tools, and seniority level you need.' },
  { n: '02', h: 'Receive Portfolios', b: '2-3 matched graphic designer profiles with relevant portfolio samples delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Review portfolios, request a short concept exercise if needed, and choose your designer.' },
  { n: '04', h: 'Onboard & Create', b: 'Designer joins your tools and brand assets. First deliverables within 7 days.' },
];
const FAQS = [
  { q: 'What types of graphic design work can your designers handle?', a: 'Brand identity (logos, style guides, brand books), marketing collateral (brochures, flyers, posters, banners), social media graphics (static and animated), packaging design, presentation design (PowerPoint, Keynote, Google Slides), email template design, and display advertising. If it is a visual design deliverable, our designers can produce it.' },
  { q: 'Which software do your designers use?', a: 'Adobe Illustrator for vector and logo work, Adobe Photoshop for photo-based design and compositing, Adobe InDesign for print and multi-page documents, and Figma for digital and UI-adjacent design. We match designers to your existing toolset.' },
  { q: 'Can they follow existing brand guidelines?', a: 'Yes. Our designers are experienced in working within existing brand systems — following colour palettes, typography hierarchies, and usage rules from your brand book. They can also extend or refresh your guidelines if needed.' },
  { q: 'Can they create print-ready files?', a: 'Yes. Our designers produce print-ready files with correct colour profiles (CMYK), bleed settings, and resolution (300 dpi) — ready to send directly to your printer or print-on-demand supplier.' },
  { q: 'Can they create animated graphics for social media?', a: 'Yes. Our designers can produce short animated graphics and GIFs in After Effects or Figma for social media, email, and display advertising.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HireDedicatedGraphicDesigner() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(50); const [c2, s2] = useCountUp(400);
  const [c3, s3] = useCountUp(49); const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(50); s2(400); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire Dedicated Graphic Designer', item: 'https://www.1solutions.biz/hire-dedicated-graphic-designer/' },
      ]},
      { '@type': 'Service', name: 'Hire Dedicated Graphic Designer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated graphic designers from 1Solutions — brand identity, print design, social media graphics, and marketing collateral. Pre-vetted profiles in 48 hours.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '88', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire Dedicated Graphic Designer | Brand, Print &amp; Digital Design Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated graphic designers from 1Solutions. Brand identity, print design, social media graphics, packaging, and marketing collateral — pre-vetted creatives. Profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-dedicated-graphic-designer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hgd-hero{background:linear-gradient(135deg,${ACCENT} 0%,#3b1a7a 60%,#4c1d95 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hgd-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hgd-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hgd-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hgd-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hgd-btn-primary:hover{opacity:.88}
          .hgd-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hgd-btn-outline:hover{border-color:#fff}
          .hgd-sec{padding:70px 20px}.hgd-sec-alt{background:#faf5ff}
          .hgd-wrap{max-width:1100px;margin:0 auto}
          .hgd-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hgd-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hgd-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hgd-skill{background:#fff;border:1.5px solid #c4b5fd;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hgd-skill.hgd-in{opacity:1;transform:none}
          .hgd-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hgd-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #c4b5fd;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hgd-model.hgd-in{opacity:1;transform:none}
          .hgd-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hgd-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hgd-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hgd-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hgd-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hgd-why-item.hgd-in{opacity:1;transform:none}
          .hgd-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hgd-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hgd-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hgd-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #c4b5fd;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hgd-step.hgd-in{opacity:1;transform:none}
          .hgd-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hgd-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hgd-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hgd-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hgd-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hgd-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hgd-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hgd-faq{max-width:760px;margin:0 auto}
          .hgd-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hgd-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hgd-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hgd-faq-icon.hgd-open{transform:rotate(45deg)}
          .hgd-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hgd-cta{background:linear-gradient(135deg,${ACCENT},#3b1a7a);padding:80px 20px;text-align:center;color:#fff}
          .hgd-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hgd-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hgd-hero{padding:80px 18px 60px}.hgd-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="hgd-hero">
        <h1>Hire Dedicated Graphic Designers<br/>Brand, Print &amp; Digital Design Experts</h1>
        <p>Pre-vetted graphic designers who create compelling brand identities, marketing collateral, social media graphics, packaging, and print materials. Not freelancers — dedicated professionals who become part of your team. Profiles in 48 hours.</p>
        <div className="hgd-hero-btns">
          <Link href="/contact-us" className="hgd-btn-primary">Hire a Graphic Designer →</Link>
          <Link href="/portfolio" className="hgd-btn-outline">View Portfolio</Link>
        </div>
      </section>
      <section className="hgd-sec" ref={skR}>
        <div className="hgd-wrap">
          <h2 className="hgd-sec-title">Design Skills &amp; Tools</h2>
          <p className="hgd-sec-sub">Our graphic designers cover the full creative spectrum — from brand identity to print production to digital campaigns.</p>
          <div className="hgd-skills">{SKILLS.map((s, i) => <span key={s} className={`hgd-skill${skV ? ' hgd-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="hgd-sec hgd-sec-alt" ref={enR}>
        <div className="hgd-wrap">
          <h2 className="hgd-sec-title">Flexible Engagement Models</h2>
          <p className="hgd-sec-sub">Embed a designer into your team or hire for a focused project — whatever your workload demands.</p>
          <div className="hgd-models">{MODELS.map((m, i) => <div key={m.title} className={`hgd-model${enV ? ' hgd-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="hgd-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="hgd-sec" ref={whR}>
        <div className="hgd-wrap">
          <h2 className="hgd-sec-title">Why Hire Graphic Designers from 1Solutions?</h2>
          <p className="hgd-sec-sub">We place designers who treat visual communication as a business discipline — not just aesthetics.</p>
          <div className="hgd-why-grid">{WHY.map((w, i) => <div key={w.h} className={`hgd-why-item${whV ? ' hgd-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hgd-stats" ref={stGr}>
        <div className="hgd-stats-grid">
          <div><div className="hgd-stat-val">{stV ? c1 : 0}+</div><div className="hgd-stat-label">Graphic Designers</div></div>
          <div><div className="hgd-stat-val">{stV ? c2 : 0}+</div><div className="hgd-stat-label">Design Projects Delivered</div></div>
          <div><div className="hgd-stat-val">4.{stV ? c3 : 0}/5</div><div className="hgd-stat-label">Client Satisfaction</div></div>
          <div><div className="hgd-stat-val">{stV ? c4 : 0} Days</div><div className="hgd-stat-label">Days to First Deliverable</div></div>
        </div>
      </section>
      <section className="hgd-sec hgd-sec-alt" ref={prR}>
        <div className="hgd-wrap">
          <h2 className="hgd-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hgd-sec-sub">From design brief to first deliverables — in under two weeks.</p>
          <div className="hgd-process">{PROCESS.map((p, i) => <div key={p.n} className={`hgd-step${prV ? ' hgd-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="hgd-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hgd-sec">
        <div className="hgd-wrap">
          <h2 className="hgd-sec-title">Frequently Asked Questions</h2>
          <p className="hgd-sec-sub">Common questions before hiring a graphic designer from 1Solutions.</p>
          <div className="hgd-faq">{FAQS.map((f, i) => <div key={i} className="hgd-faq-item"><div className="hgd-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`hgd-faq-icon${openFaq === i ? ' hgd-open' : ''}`}>+</span></div>{openFaq === i && <p className="hgd-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="hgd-cta">
        <div className="hgd-wrap">
          <h2>Ready to Hire Your Dedicated Graphic Designer?</h2>
          <p>Share your design brief and receive matched graphic designer profiles with portfolios within 48 hours — no commitment required.</p>
          <Link href="/contact-us" className="hgd-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
