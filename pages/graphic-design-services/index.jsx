'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const ACCENT = '#7c3aed';
const SKILLS = [
  'Logo Design', 'Brand Identity & Style Guides', 'Business Card & Stationery Design',
  'Brochure & Flyer Design', 'Poster & Banner Design', 'Packaging Design',
  'Social Media Graphics', 'Infographic Design', 'Presentation Design (PowerPoint, Keynote)',
  'Email Template Design', 'Display Ad & Banner Design', 'Trade Show & Exhibition Graphics',
  'Vehicle Wrap Design', 'Annual Report Design', 'Adobe Illustrator, Photoshop & InDesign',
];
const MODELS = [
  { title: 'One-Off Project',    desc: 'A single deliverable - a logo, a brochure, a set of social media templates, or a pitch deck - scoped, priced, and delivered to a fixed deadline.', icon: '🎨' },
  { title: 'Brand Package',      desc: 'Complete brand identity: logo, colour palette, typography, brand guidelines, and a core set of collateral (business cards, letterhead, social media kit).', icon: '📦' },
  { title: 'Design Retainer',    desc: 'Monthly design support - a set number of design hours per month for ongoing social media graphics, campaign assets, and brand maintenance.', icon: '🔄' },
];
const WHY = [
  { h: 'Strategy Before Aesthetics',    b: 'We research your market, competitors, and target audience before opening Illustrator. Great design communicates your positioning - it is not just decoration.' },
  { h: 'Brand System Thinking',         b: 'We design logos that work in one colour, on dark backgrounds, at 16px and at 3 metres wide. Every element is built for real-world use, not just a portfolio mockup.' },
  { h: 'Print-Ready & Digital-Ready',   b: 'All files delivered print-ready (CMYK, 300 dpi, bleed and trim marks) and digital-ready (RGB, optimised file sizes, web formats) as standard.' },
  { h: 'Fast Turnaround',               b: 'Most logo projects are completed in 5–7 business days. Social media graphics in 24–48 hours. We work to your campaign calendar, not ours.' },
  { h: 'Unlimited Revisions',           b: 'Within the agreed revision rounds, we refine until you are completely satisfied - no nickel-and-diming for minor changes.' },
  { h: 'NDA & IP Protection',           b: 'All original artwork and source files belong to you on final payment. NDA signed before any access to your brand assets or brief.' },
];
const PROCESS = [
  { n: '01', h: 'Brief & Research', b: 'We learn your brand, audience, competitors, and design preferences - then research the visual landscape before proposing any concepts.' },
  { n: '02', h: 'Concepts',         b: 'We present 2–3 distinct design directions with rationale. You choose a direction and we refine from there.' },
  { n: '03', h: 'Refine',           b: 'Structured revision rounds until the design is exactly right. No open-ended changes - clear scope, clear timeline.' },
  { n: '04', h: 'Deliver',          b: 'Final files in every format you need - AI, EPS, PDF, SVG, PNG, JPG - with a handoff guide explaining how to use each file.' },
];
const FAQS = [
  { q: 'What graphic design services do you offer?', a: 'Logo and brand identity design, business stationery (cards, letterhead, envelopes), marketing collateral (brochures, flyers, posters, banners), packaging design, social media graphics (static and animated), presentation design (PowerPoint, Keynote, Google Slides), email template design, display advertising, trade show graphics, and annual reports.' },
  { q: 'How much does a logo design cost?', a: 'A professional logo design starts from $400 for a single logo mark with three colour variants. A complete brand identity package (logo, colour palette, typography, brand guidelines, and stationery set) starts from $1,200. We provide a fixed-price quote after reviewing your brief - no hourly billing.' },
  { q: 'How long does logo design take?', a: 'A standard logo project takes 5–7 business days from brief to final delivery. A full brand identity package takes 2–3 weeks. Rush timelines are available for an additional fee.' },
  { q: 'Do I own the final designs?', a: 'Yes. On receipt of final payment, all copyright and IP transfers fully to you. You receive source files in every relevant format (AI, EPS, PDF, SVG, PNG, JPG) - not just flattened exports.' },
  { q: 'Can you match our existing brand guidelines?', a: 'Yes. We work within existing brand systems regularly - applying your colour palette, typography, and usage rules to new collateral while ensuring everything looks consistent across channels.' },
  { q: 'Do you create animated graphics for social media?', a: 'Yes. We produce short animated graphics and GIFs in After Effects or Figma for social media, email campaigns, and digital advertising.' },
];

export default function GraphicDesignServices() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    return () => [o1, o2, o3, o4].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Graphic Design Services', item: 'https://www.1solutions.biz/graphic-design-services/' },
      ]},
      { '@type': 'ProfessionalService', name: 'Graphic Design Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Professional graphic design from 1Solutions - brand identity, logo design, print collateral, social media graphics, and packaging design.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '88', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Graphic Design Services | 1Solutions</title>
        <meta name="description" content="Professional graphic design services from 1Solutions. Brand identity, logo design, marketing collateral, packaging, social media graphics, and presentation" />
        <link rel="canonical" href="https://www.1solutions.biz/graphic-design-services/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Graphic Design Services | 1Solutions" />
        <meta property="og:description" content="Professional graphic design services from 1Solutions. Brand identity, logo design, marketing collateral, packaging, social media graphics, and presentation" />
        <meta property="og:url" content="https://www.1solutions.biz/graphic-design-services/" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-graphic-design-services.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions Graphic Design Services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-graphic-design-services.jpg" />
        <meta name="twitter:image:alt" content="1Solutions Graphic Design Services" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .gds-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .gds-btn-primary:hover{opacity:.88}
          .gds-sec{padding:70px 20px}.gds-sec-alt{background:#faf5ff}
          .gds-wrap{max-width:1100px;margin:0 auto}
          .gds-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .gds-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .gds-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .gds-skill{background:#fff;border:1.5px solid #c4b5fd;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .gds-skill.gds-in{opacity:1;transform:none}
          .gds-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .gds-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #c4b5fd;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .gds-model.gds-in{opacity:1;transform:none}
          .gds-model-icon{font-size:2.2rem;margin-bottom:14px}
          .gds-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .gds-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .gds-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .gds-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .gds-why-item.gds-in{opacity:1;transform:none}
          .gds-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .gds-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .gds-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .gds-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #c4b5fd;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .gds-step.gds-in{opacity:1;transform:none}
          .gds-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .gds-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .gds-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .gds-faq{max-width:760px;margin:0 auto}
          .gds-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .gds-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .gds-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .gds-faq-icon.gds-open{transform:rotate(45deg)}
          .gds-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .gds-cta{background:linear-gradient(135deg,${ACCENT},#3b1a7a);padding:80px 20px;text-align:center;color:#fff}
          .gds-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .gds-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
        `}</style>
      </Head>
      <ServiceHero
        eyebrow="Graphic Design Services · Brand Identity Specialists"
        title={<>Graphic Design Services - <AuroraText>Brand Identity, Print &amp; Digital Design</AuroraText></>}
        subtext="We create compelling visual identities, marketing collateral, social media graphics, packaging, and print materials that make your brand memorable. From a single logo to a full brand system - design that works across every touchpoint."
        primaryCta={{ label: 'Get a Free Design Quote', href: '/contact-us/' }}
        secondaryCta={{ label: 'View Portfolio', href: '/portfolio/' }}
        stats={[
          { label: 'Design Projects Delivered', value: '500', suffix: '+' },
          { label: 'Years Experience', value: '15', suffix: '+' },
          { label: 'Client Satisfaction', value: '9', prefix: '4.', suffix: '/5' },
          { label: 'Social Graphics Turnaround', value: '48', suffix: 'hr' },
        ]}
      />
      <section className="gds-sec" ref={skR}>
        <div className="gds-wrap">
          <h2 className="gds-sec-title">Design Skills &amp; Services</h2>
          <p className="gds-sec-sub">From logo marks to full brand systems - we cover every visual design discipline your business needs.</p>
          <div className="gds-skills">{SKILLS.map((s, i) => <span key={s} className={`gds-skill${skV ? ' gds-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="gds-sec gds-sec-alt" ref={enR}>
        <div className="gds-wrap">
          <h2 className="gds-sec-title">Engagement Options</h2>
          <p className="gds-sec-sub">A single deliverable, a complete brand package, or ongoing monthly design support - we have the right model.</p>
          <div className="gds-models">{MODELS.map((m, i) => <div key={m.title} className={`gds-model${enV ? ' gds-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="gds-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="gds-sec" ref={whR}>
        <div className="gds-wrap">
          <h2 className="gds-sec-title">Why Choose 1Solutions for Graphic Design?</h2>
          <p className="gds-sec-sub">We treat design as a business tool, not a decoration exercise.</p>
          <div className="gds-why-grid">{WHY.map((w, i) => <div key={w.h} className={`gds-why-item${whV ? ' gds-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="gds-sec gds-sec-alt" ref={prR}>
        <div className="gds-wrap">
          <h2 className="gds-sec-title">Our Design Process</h2>
          <p className="gds-sec-sub">Research-led, revision-friendly, and delivered on time every time.</p>
          <div className="gds-process">{PROCESS.map((p, i) => <div key={p.n} className={`gds-step${prV ? ' gds-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="gds-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="gds-sec">
        <div className="gds-wrap">
          <h2 className="gds-sec-title">Frequently Asked Questions</h2>
          <p className="gds-sec-sub">Common questions about our graphic design services.</p>
          <div className="gds-faq">{FAQS.map((f, i) => <div key={i} className="gds-faq-item"><div className="gds-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`gds-faq-icon${openFaq === i ? ' gds-open' : ''}`}>+</span></div>{openFaq === i && <p className="gds-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="gds-cta">
        <div className="gds-wrap">
          <h2>Ready to Elevate Your Brand with Professional Design?</h2>
          <p>Share your design brief and we'll quote within 24 hours - fixed price, no hourly surprises.</p>
          <Link href="/contact-us/" className="gds-btn-primary">Get a Free Design Quote →</Link>
        </div>
      </section>
    </>
  );
}
