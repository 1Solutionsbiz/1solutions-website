'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const ACCENT = '#3d4a00';
const SKILLS = [
  'Figma & Adobe XD', 'HTML5 & CSS3 (Advanced)', 'Responsive & Mobile-First Design', 'CSS Grid & Flexbox',
  'CSS Animations & Transitions', 'Adobe Photoshop & Illustrator', 'Typography & Color Theory',
  'Conversion Rate Optimisation (CRO)', 'Landing Page Design', 'WordPress Theme Design',
  'Shopify & eCommerce Storefront Design', 'Accessibility (WCAG 2.1)', 'Design Tokens & Style Guides',
  'Prototyping & Interactive Mockups', 'Webflow & Visual Builders',
];
const MODELS = [
  { title: 'Dedicated Hire', desc: 'A full-time web designer embedded in your team - 8 hrs/day, 5 days/week.', icon: '👤' },
  { title: 'Part-Time Hire', desc: 'Half-day engagement for landing page design, redesign projects, or design system maintenance.', icon: '⏰' },
  { title: 'Hourly Hire',    desc: 'Flexible billing for one-off page designs, visual audits, or conversion-focused redesigns.', icon: '🕐' },
];
const WHY = [
  { h: 'Conversion-Focused Design', b: 'Our designers do not just make pages look good - they engineer them to convert. Every layout decision is tied to CTA visibility, scan patterns, and trust signals.' },
  { h: 'Brand-Coherent Visual Language', b: 'We build consistent visual systems - typography scales, color palettes, spacing grids - that work across every page of your site, not just the homepage.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your design brief and receive 2-3 matched web designer profiles with portfolio links within two business days.' },
  { h: 'Pixel-Perfect Developer Handoff', b: 'Our designers deliver production-ready specs via Figma Dev Mode, Zeplin, or annotated HTML/CSS prototypes - so your developers can build exactly what was designed.' },
  { h: 'SEO & Performance Awareness', b: 'Our designers understand Core Web Vitals - they design with image optimisation, font loading, and layout stability in mind, not just aesthetics.' },
  { h: 'NDA & IP Protection', b: 'NDA and IP assignment signed before access to your brand assets, Figma files, or website analytics.' },
];
const PROCESS = [
  { n: '01', h: 'Share Your Design Brief', b: 'Tell us your brand guidelines, target audience, pages needed, and the design outcome you want.' },
  { n: '02', h: 'Receive Portfolios', b: '2-3 matched web designer profiles with relevant case studies delivered within 48 hours.' },
  { n: '03', h: 'Interview & Select', b: 'Review portfolios, request a moodboard or style exploration, or discuss your redesign goals directly.' },
  { n: '04', h: 'Onboard & Design', b: 'Designer joins your workspace and delivers first wireframes or mockups within 7 days.' },
];
const FAQS = [
  { q: 'Do your web designers also write HTML and CSS?', a: 'Yes. Many of our web designers are hybrid designer-developers who can translate Figma designs into clean, semantic HTML and CSS - bridging the gap between design and development.' },
  { q: 'Can they design for WordPress or Shopify?', a: 'Yes. We design for both platforms - custom WordPress theme designs with ACF-compatible layouts, and Shopify storefront designs optimised for conversion, including product pages and checkout flows.' },
  { q: 'Do they do UX research or just visual design?', a: 'Our web designers focus primarily on visual and interaction design. For full UX research (user interviews, usability testing, journey mapping), we recommend pairing with a dedicated UX researcher or hiring a combined UI/UX designer.' },
  { q: 'Can they redesign an existing website without rebuilding from scratch?', a: 'Yes. We do visual redesigns - updating the look, layout, and conversion elements while preserving your existing CMS structure and content. We deliver Figma specs that developers can apply to the existing site.' },
  { q: 'Do they design for mobile?', a: 'Yes. All our web designers work mobile-first - designing for 320px to 1440px viewports, testing touch targets, and ensuring layouts adapt correctly across breakpoints.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment agreements are signed as standard before any engagement begins.' },
];

export default function HireWebDesigner() {
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
        { '@type': 'ListItem', position: 2, name: 'Hire Web Designer', item: 'https://www.1solutions.biz/hire-web-designer/' },
      ]},
      { '@type': 'ProfessionalService', name: 'Hire Web Designer', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Hire dedicated web designers from 1Solutions - conversion-focused, brand-coherent website designers with Figma expertise.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '112', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Hire Web Designer | 1Solutions</title>
        <meta name="description" content="Hire dedicated web designers from 1Solutions. Figma, HTML/CSS, WordPress & Shopify design specialists focused on conversion and brand consistency." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-web-designer/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hwdes-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hwdes-btn-primary:hover{opacity:.88}
          .hwdes-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hwdes-btn-outline:hover{border-color:#fff}
          .hwdes-sec{padding:70px 20px}.hwdes-sec-alt{background:#f5f6ee}
          .hwdes-wrap{max-width:1100px;margin:0 auto}
          .hwdes-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hwdes-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hwdes-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hwdes-skill{background:#fff;border:1.5px solid #b8c070;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hwdes-skill.hwdes-in{opacity:1;transform:none}
          .hwdes-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hwdes-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #b8c070;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hwdes-model.hwdes-in{opacity:1;transform:none}
          .hwdes-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hwdes-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hwdes-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hwdes-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hwdes-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hwdes-why-item.hwdes-in{opacity:1;transform:none}
          .hwdes-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hwdes-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hwdes-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hwdes-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #b8c070;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hwdes-step.hwdes-in{opacity:1;transform:none}
          .hwdes-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hwdes-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hwdes-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hwdes-faq{max-width:760px;margin:0 auto}
          .hwdes-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hwdes-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hwdes-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hwdes-faq-icon.hwdes-open{transform:rotate(45deg)}
          .hwdes-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hwdes-cta{background:linear-gradient(135deg,${ACCENT},#1e2600);padding:80px 20px;text-align:center;color:#fff}
          .hwdes-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hwdes-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
        `}</style>
      </Head>

      <ServiceHero
        eyebrow="Hire Web Designer · Conversion-Focused &amp; Brand-Coherent"
        title={<>Hire Web Designers <AuroraText>Conversion-Focused &amp; Brand-Coherent</AuroraText></>}
        subtext="Pre-vetted web designers who build beautiful, high-converting websites - from Figma wireframes to pixel-perfect developer handoff. Profiles in 48 hours."
        primaryCta={{ label: 'Hire a Web Designer', href: '/contact-us/' }}
        secondaryCta={{ label: 'View Portfolio', href: '/portfolio/' }}
        stats={[
          { label: 'Web Designers', value: '55', suffix: '+' },
          { label: 'Websites Designed', value: '280', suffix: '+' },
          { label: 'Client Satisfaction', value: '49', prefix: '4.', suffix: '/5' },
          { label: 'Avg Onboarding', value: '7', suffix: ' Days' },
        ]}
      />

      <section className="hwdes-sec" ref={skR}>
        <div className="hwdes-wrap">
          <h2 className="hwdes-sec-title">Design Skills &amp; Tools</h2>
          <p className="hwdes-sec-sub">Our web designers combine visual craft with conversion strategy across all major platforms.</p>
          <div className="hwdes-skills">{SKILLS.map((s, i) => <span key={s} className={`hwdes-skill${skV ? ' hwdes-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="hwdes-sec hwdes-sec-alt" ref={enR}>
        <div className="hwdes-wrap">
          <h2 className="hwdes-sec-title">Flexible Engagement Models</h2>
          <p className="hwdes-sec-sub">From full-site redesigns to targeted landing page sprints - we fit your design timeline.</p>
          <div className="hwdes-models">{MODELS.map((m, i) => <div key={m.title} className={`hwdes-model${enV ? ' hwdes-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="hwdes-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="hwdes-sec" ref={whR}>
        <div className="hwdes-wrap">
          <h2 className="hwdes-sec-title">Why Hire Web Designers from 1Solutions?</h2>
          <p className="hwdes-sec-sub">We place designers who understand that a great website earns business results, not just design awards.</p>
          <div className="hwdes-why-grid">{WHY.map((w, i) => <div key={w.h} className={`hwdes-why-item${whV ? ' hwdes-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hwdes-sec hwdes-sec-alt" ref={prR}>
        <div className="hwdes-wrap">
          <h2 className="hwdes-sec-title">Hire in 4 Simple Steps</h2>
          <p className="hwdes-sec-sub">From brief to first design mockups - in under two weeks.</p>
          <div className="hwdes-process">{PROCESS.map((p, i) => <div key={p.n} className={`hwdes-step${prV ? ' hwdes-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="hwdes-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hwdes-sec">
        <div className="hwdes-wrap">
          <h2 className="hwdes-sec-title">Frequently Asked Questions</h2>
          <p className="hwdes-sec-sub">Common questions before hiring a web designer from 1Solutions.</p>
          <div className="hwdes-faq">{FAQS.map((f, i) => <div key={i} className="hwdes-faq-item"><div className="hwdes-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`hwdes-faq-icon${openFaq === i ? ' hwdes-open' : ''}`}>+</span></div>{openFaq === i && <p className="hwdes-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="hwdes-cta">
        <div className="hwdes-wrap">
          <h2>Ready to Hire Your Web Designer?</h2>
          <p>Share your brand and goals - receive matched web designer profiles with portfolios within 48 hours. No commitment required.</p>
          <Link href="/contact-us/" className="hwdes-btn-primary">Get Started Today →</Link>
        </div>
      </section>
    </>
  );
}
