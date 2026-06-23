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

const ACCENT = '#0a0a3d';
const SKILLS = [
  'Unity 3D (VR/AR)', 'Unreal Engine 5 (XR)', 'Meta Quest / OpenXR', 'Apple Vision Pro (visionOS)',
  'WebXR & A-Frame', 'HTC Vive & SteamVR', 'C# & C++ for XR', 'Spatial Audio (Steam Audio, Resonance)',
  'Hand Tracking & Gesture Recognition', '3D Modeling (Blender, Maya)', 'Shader Programming (HLSL/GLSL)',
  'Oculus Interaction SDK', 'Mixed Reality Toolkit (MRTK)', 'Physics & Collision Simulation', 'VR Performance Optimisation',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time VR/AR developer committed to your XR product — 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for VR module development, scene optimisation, or platform porting.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for performance profiling, hand-tracking integration, or visionOS prototypes.', icon: '🕐' },
];
const WHY = [
  { h: 'Multi-Platform XR Expertise', b: 'Our developers deploy across Meta Quest, Apple Vision Pro, HTC Vive, and WebXR — one team, all major headsets.' },
  { h: 'Unity & Unreal Specialists', b: 'Deep experience in both engines: Unity (C# scripts, URP/HDRP, XR Interaction Toolkit) and Unreal Engine 5 (Blueprints, XR plugins, Nanite).' },
  { h: 'Profiles in 48 Hours', b: 'Submit your XR brief and receive 2-3 matched VR developer profiles within two business days.' },
  { h: 'Comfort & Performance Focus', b: 'We engineer for 90fps+ frame rates, minimal motion sickness, correct IPD handling, and accessible interaction models.' },
  { h: 'Enterprise XR Track Record', b: 'We have built training simulators, virtual showrooms, remote collaboration tools, and surgical procedure visualisations for enterprise clients.' },
  { h: 'NDA & IP Security', b: 'Full NDA and IP assignment signed before any access to your scene files, 3D assets, or proprietary interaction models.' },
];
const PROCESS = [
  { n: '01', h: 'Describe Your XR Vision', b: 'Tell us the target headset(s), use case (training, retail, entertainment, enterprise), and the engine preference.' },
  { n: '02', h: 'Receive Profiles', b: '2-3 matched VR developer CVs with demo links delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Run your technical round — Unity scene review, performance discussion, or live interaction prototype.' },
  { n: '04', h: 'Onboard & Build', b: 'Developer joins your project. First scene prototype ships within 7 days.' },
];
const FAQS = [
  { q: 'Do you develop for Meta Quest, Apple Vision Pro, and PC VR?', a: 'Yes. We develop for Meta Quest 2/3/Pro (standalone and PC-link), Apple Vision Pro (visionOS with RealityKit/SwiftUI), HTC Vive/Cosmos, Valve Index, and browser-based WebXR. We also handle multi-platform builds from a single Unity or Unreal codebase.' },
  { q: 'Which engine do you recommend — Unity or Unreal?', a: 'Unity for mobile VR (Meta Quest standalone), multiplayer apps, and rapid iteration. Unreal Engine 5 for photorealistic visuals, large open-world environments, and high-fidelity training simulators where visual fidelity is paramount.' },
  { q: 'Can you build enterprise VR training applications?', a: 'Yes. We have delivered safety training, surgical procedure simulations, equipment maintenance guides, and soft-skills training applications for enterprise clients in manufacturing, healthcare, and aviation.' },
  { q: 'How do you handle VR performance and motion sickness prevention?', a: 'We target 90fps+ with fixed foveated rendering, aggressive draw-call batching, LOD management, and physics offloading. We follow Oculus and Apple comfort guidelines — no artificial locomotion without tunnelling, proper IPD and IPD rendering.' },
  { q: 'Can you add hand tracking to an existing VR app?', a: 'Yes. We integrate Meta Hand Tracking SDK, Apple ARKit hand anchors, and Ultraleap for PC VR. We redesign interactions as necessary to work without controllers.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HireVrDeveloper() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(28); const [c2, s2] = useCountUp(95);
  const [c3, s3] = useCountUp(49); const [c4, s4] = useCountUp(7);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(28); s2(95); s3(49); s4(7); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire VR Developer', item: 'https://www.1solutions.biz/hire-vr-developer/' },
      ]},
      { '@type': 'Service', name: 'Hire VR Developer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated VR/AR developers from 1Solutions — Unity, Unreal Engine, Meta Quest, and Apple Vision Pro specialists.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '58', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire VR Developer | Unity, Unreal & Meta Quest Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated VR/AR developers from 1Solutions. Unity, Unreal Engine 5, Meta Quest, Apple Vision Pro, and WebXR specialists. Pre-vetted profiles in 48 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-vr-developer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hvrd-hero{background:linear-gradient(135deg,${ACCENT} 0%,#050520 60%,#080830 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hvrd-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hvrd-hero p{font-size:1.15rem;max-width:620px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hvrd-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hvrd-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hvrd-btn-primary:hover{opacity:.88}
          .hvrd-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hvrd-btn-outline:hover{border-color:#fff}
          .hvrd-sec{padding:70px 20px}.hvrd-sec-alt{background:#f0f0f8}
          .hvrd-wrap{max-width:1100px;margin:0 auto}
          .hvrd-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hvrd-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hvrd-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hvrd-skill{background:#fff;border:1.5px solid #a0a0cc;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hvrd-skill.hvrd-in{opacity:1;transform:none}
          .hvrd-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hvrd-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #a0a0cc;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hvrd-model.hvrd-in{opacity:1;transform:none}
          .hvrd-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hvrd-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hvrd-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hvrd-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hvrd-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hvrd-why-item.hvrd-in{opacity:1;transform:none}
          .hvrd-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hvrd-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hvrd-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hvrd-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #a0a0cc;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hvrd-step.hvrd-in{opacity:1;transform:none}
          .hvrd-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hvrd-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hvrd-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hvrd-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hvrd-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hvrd-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hvrd-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hvrd-faq{max-width:760px;margin:0 auto}
          .hvrd-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hvrd-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hvrd-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hvrd-faq-icon.hvrd-open{transform:rotate(45deg)}
          .hvrd-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hvrd-cta{background:linear-gradient(135deg,${ACCENT},#050520);padding:80px 20px;text-align:center;color:#fff}
          .hvrd-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hvrd-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hvrd-hero{padding:80px 18px 60px}.hvrd-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="hvrd-hero">
        <h1>Hire VR Developers<br/>Unity, Unreal &amp; Meta Quest Specialists</h1>
        <p>Pre-vetted XR engineers who build immersive VR/AR experiences for Meta Quest, Apple Vision Pro, HTC Vive, and WebXR — with 90fps performance as standard. Profiles in 48 hours.</p>
        <div className="hvrd-hero-btns">
          <Link href="/contact-us" className="hvrd-btn-primary">Hire a VR Developer →</Link>
          <Link href="/portfolio" className="hvrd-btn-outline">View Portfolio</Link>
        </div>
      </section>
      <section className="hvrd-sec" ref={skR}>
        <div className="hvrd-wrap">
          <h2 className="hvrd-sec-title">Skills &amp; XR Tech Stack</h2>
          <p className="hvrd-sec-sub">Our VR developers cover all major headsets, engines, and XR interaction frameworks.</p>
          <div className="hvrd-skills">{SKILLS.map((s, i) => <span key={s} className={`hvrd-skill${skV ? ' hvrd-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="hvrd-sec hvrd-sec-alt" ref={enR}>
        <div className="hvrd-wrap">
          <h2 className="hvrd-sec-title">Flexible Engagement Models</h2>
          <p className="hvrd-sec-sub">From full XR product builds to targeted integration sprints — we fit your timeline.</p>
          <div className="hvrd-models">{MODELS.map((m, i) => <div key={m.title} className={`hvrd-model${enV ? ' hvrd-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="hvrd-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="hvrd-sec" ref={whR}>
        <div className="hvrd-wrap">
          <h2 className="hvrd-sec-title">Why Hire VR Developers from 1Solutions?</h2>
          <p className="hvrd-sec-sub">We place XR engineers who have shipped real applications — not just VR demos.</p>
          <div className="hvrd-why-grid">{WHY.map((w, i) => <div key={w.h} className={`hvrd-why-item${whV ? ' hvrd-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hvrd-stats" ref={stGr}>
        <div className="hvrd-stats-grid">
          <div><div className="hvrd-stat-val">{stV ? c1 : 0}+</div><div className="hvrd-stat-label">VR/AR Developers</div></div>
          <div><div className="hvrd-stat-val">{stV ? c2 : 0}+</div><div className="hvrd-stat-label">XR Projects Delivered</div></div>
          <div><div className="hvrd-stat-val">4.{stV ? c3 : 0}/5</div><div className="hvrd-stat-label">Client Satisfaction</div></div>
          <div><div className="hvrd-stat-val">{stV ? c4 : 0} Days</div><div className="hvrd-stat-label">Avg Onboarding</div></div>
        </div>
      </section>
      <section className="hvrd-sec hvrd-sec-alt" ref={prR}>
        <div className="hvrd-wrap">
          <h2 className="hvrd-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hvrd-sec-sub">From XR brief to first interactive scene prototype — in under two weeks.</p>
          <div className="hvrd-process">{PROCESS.map((p, i) => <div key={p.n} className={`hvrd-step${prV ? ' hvrd-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="hvrd-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hvrd-sec">
        <div className="hvrd-wrap">
          <h2 className="hvrd-sec-title">Frequently Asked Questions</h2>
          <p className="hvrd-sec-sub">Common questions before hiring a VR developer from 1Solutions.</p>
          <div className="hvrd-faq">{FAQS.map((f, i) => <div key={i} className="hvrd-faq-item"><div className="hvrd-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`hvrd-faq-icon${openFaq === i ? ' hvrd-open' : ''}`}>+</span></div>{openFaq === i && <p className="hvrd-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="hvrd-cta">
        <div className="hvrd-wrap">
          <h2>Ready to Hire Your VR Developer?</h2>
          <p>Share your XR vision and receive matched VR developer profiles with demo links within 48 hours — no commitment required.</p>
          <Link href="/contact-us" className="hvrd-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
