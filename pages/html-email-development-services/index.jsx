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

const ACCENT = '#1e40af';
const SKILLS = [
  'HTML Email Coding (Tables & MSO)', 'Responsive Email Design', 'Gmail & Outlook Compatibility',
  'Dark Mode Email Support', 'Litmus & Email on Acid Testing', 'Transactional Email Templates',
  'Email Campaign Templates', 'Newsletter Templates', 'Klaviyo Template Development',
  'Mailchimp Template Coding', 'HubSpot Email Templates', 'Salesforce Marketing Cloud',
  'AMP for Email', 'Email Accessibility (WCAG)', 'Plain-Text Fallback Versions',
];
const MODELS = [
  { title: 'One-Off Template', desc: 'A single HTML email template designed, coded, and tested across 90+ clients. Perfect for a hero campaign or a transactional trigger.', icon: '✉️' },
  { title: 'Template Suite',   desc: 'A set of 5–20 branded email templates: welcome series, cart abandonment, receipts, newsletters, and more — built to a consistent design system.', icon: '📧' },
  { title: 'Ongoing Retainer', desc: 'Monthly HTML email development support for teams who send regularly — new templates, template edits, A/B variants, and dark-mode updates.', icon: '🔄' },
];
const WHY = [
  { h: 'Outlook-Proof Coding',      b: 'Outlook uses Microsoft Word\'s rendering engine, which breaks modern CSS. We use MSO conditional comments, VML, and table-based layouts that look perfect in Outlook 2007–2023.' },
  { h: 'Dark Mode Ready',            b: '40%+ of users read email in dark mode. We code media query overrides that preserve your brand in dark environments — not just let Outlook invert your colours.' },
  { h: '90+ Client Testing',         b: 'Every template is tested in Litmus or Email on Acid across Gmail, Outlook, Apple Mail, Samsung Mail, and Thunderbird before delivery.' },
  { h: 'Responsive on Every Device', b: 'Fluid-hybrid layouts that adapt from 600px desktop to 320px mobile without breaking your header, hero, or CTA.' },
  { h: 'ESP-Ready Delivery',         b: 'Templates delivered in your ESP\'s format — Klaviyo drag-and-drop blocks, Mailchimp editable regions, HubSpot custom modules, or raw HTML.' },
  { h: 'Accessibility First',        b: 'Semantic HTML, role="presentation" on layout tables, ALT text on all images, and sufficient colour contrast — so your emails work for screen reader users too.' },
];
const PROCESS = [
  { n: '01', h: 'Brief & Design',       b: 'We review your brand guidelines, ESP, and email objectives — then produce a design mockup for approval before any coding begins.' },
  { n: '02', h: 'Code & Build',         b: 'We hand-code the template using table-based HTML, MSO conditionals, and fluid-hybrid responsive techniques — no drag-and-drop shortcuts.' },
  { n: '03', h: 'Cross-Client Testing', b: 'We test the coded template across 90+ email clients in Litmus, verify dark mode behaviour, and check plain-text rendering.' },
  { n: '04', h: 'Deliver & Deploy',     b: "We deliver the template in your ESP's format — with editable regions, content blocks, and a handoff guide — ready to send." },
];
const FAQS = [
  { q: 'Why hand-code HTML emails instead of using a builder?', a: 'Email builders produce bloated, inconsistent code that breaks in Outlook, ignores dark mode, and limits customisation. Hand-coded emails give you precise control over rendering, smaller file sizes (important for deliverability), and templates that actually look like your design.' },
  { q: 'Which email clients do you test in?', a: 'We test in 90+ clients including all Gmail variants (webmail, iOS, Android), Outlook 2007–2023, Outlook.com, Apple Mail (iOS and macOS), Samsung Mail, Yahoo Mail, and Thunderbird. Testing is done via Litmus or Email on Acid.' },
  { q: 'Can you build templates inside Klaviyo, Mailchimp, or HubSpot?', a: 'Yes. We deliver templates as native ESP components — Klaviyo drag-and-drop blocks with editable text and image sections, Mailchimp editable region templates, or HubSpot custom email modules — so your marketing team can send without touching code.' },
  { q: 'Do you support AMP for Email?', a: 'Yes. For Gmail and Mail.app, we can add AMP components — carousels, accordions, real-time content — to make emails interactive. We always include the required HTML fallback for clients that don\'t support AMP.' },
  { q: 'How long does it take to build an HTML email template?', a: 'A single template takes 3–5 business days from brief to tested delivery. A suite of 10–15 templates takes 3–4 weeks. Retainer clients receive templates within 2–3 business days of brief approval.' },
  { q: 'Do you sign NDAs?', a: 'Yes. NDA and IP assignment signed as standard before any access to your brand assets or ESP account.' },
];

export default function HtmlEmailDevelopmentServices() {
  const skR  = useRef(null); const [skV, setSkV] = useState(false);
  const enR  = useRef(null); const [enV, setEnV] = useState(false);
  const whR  = useRef(null); const [whV, setWhV] = useState(false);
  const prR  = useRef(null); const [prV, setPrV] = useState(false);
  const stGr = useRef(null); const [stV, setStV] = useState(false);
  const [c1, s1] = useCountUp(150); const [c2, s2] = useCountUp(50);
  const [c3, s3] = useCountUp(49);  const [c4, s4] = useCountUp(90);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const obs = (ref, setter) => new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); obs.disconnect(); } }, { threshold: 0.15 });
    const o1 = obs(skR, setSkV); if (skR.current) o1.observe(skR.current);
    const o2 = obs(enR, setEnV); if (enR.current) o2.observe(enR.current);
    const o3 = obs(whR, setWhV); if (whR.current) o3.observe(whR.current);
    const o4 = obs(prR, setPrV); if (prR.current) o4.observe(prR.current);
    const o5 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStV(true); s1(150); s2(50); s3(49); s4(90); o5.disconnect(); } }, { threshold: 0.2 });
    if (stGr.current) o5.observe(stGr.current);
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect());
  }, []);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'HTML Email Development Services', item: 'https://www.1solutions.biz/html-email-development-services/' },
      ]},
      { '@type': 'Service', name: 'HTML Email Development Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Professional HTML email development from 1Solutions — pixel-perfect, responsive email templates tested across 90+ clients for Klaviyo, Mailchimp, HubSpot and more.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '88', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>HTML Email Development Services | Responsive Email Templates | 1Solutions</title>
        <meta name="description" content="Professional HTML email development services from 1Solutions. We build pixel-perfect, responsive HTML email templates for campaigns, transactional emails, and newsletters — tested across 90+ clients." />
        <link rel="canonical" href="https://www.1solutions.biz/html-email-development-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hem-hero{background:linear-gradient(135deg,${ACCENT} 0%,#1e3a8a 60%,#1d4ed8 100%);color:#fff;padding:100px 20px 80px;text-align:center}
          .hem-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 18px;line-height:1.15}
          .hem-hero p{font-size:1.15rem;max-width:640px;margin:0 auto 36px;opacity:.88;line-height:1.7}
          .hem-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hem-btn-primary{background:#FE9700;color:#fff;padding:14px 32px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s}
          .hem-btn-primary:hover{opacity:.88}
          .hem-btn-outline{border:2px solid rgba(255,255,255,.7);color:#fff;padding:13px 28px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s}
          .hem-btn-outline:hover{border-color:#fff}
          .hem-sec{padding:70px 20px}.hem-sec-alt{background:#eff6ff}
          .hem-wrap{max-width:1100px;margin:0 auto}
          .hem-sec-title{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hem-sec-sub{text-align:center;color:#555;font-size:1.05rem;max-width:600px;margin:0 auto 48px;line-height:1.7}
          .hem-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hem-skill{background:#fff;border:1.5px solid #93c5fd;border-radius:40px;padding:9px 20px;font-size:.92rem;font-weight:600;color:${ACCENT};opacity:0;transform:translateY(16px);transition:opacity .5s,transform .5s}
          .hem-skill.hem-in{opacity:1;transform:none}
          .hem-models{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px}
          .hem-model{background:#fff;border-radius:14px;padding:32px 28px;border:1.5px solid #93c5fd;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s}
          .hem-model.hem-in{opacity:1;transform:none}
          .hem-model-icon{font-size:2.2rem;margin-bottom:14px}
          .hem-model h3{font-size:1.15rem;font-weight:700;color:#111;margin:0 0 10px}
          .hem-model p{color:#555;line-height:1.7;font-size:.95rem;margin:0}
          .hem-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:22px}
          .hem-why-item{background:#fff;border-radius:12px;padding:26px 24px;border-left:4px solid ${ACCENT};box-shadow:0 2px 10px rgba(0,0,0,.04);opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hem-why-item.hem-in{opacity:1;transform:none}
          .hem-why-item h3{font-size:1.05rem;font-weight:700;color:${ACCENT};margin:0 0 8px}
          .hem-why-item p{color:#555;line-height:1.7;font-size:.93rem;margin:0}
          .hem-process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
          .hem-step{text-align:center;padding:30px 20px;background:#fff;border-radius:12px;border:1.5px solid #93c5fd;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hem-step.hem-in{opacity:1;transform:none}
          .hem-step-n{width:48px;height:48px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .hem-step h3{font-size:1rem;font-weight:700;color:#111;margin:0 0 8px}
          .hem-step p{color:#666;font-size:.9rem;line-height:1.6;margin:0}
          .hem-stats{background:${ACCENT};padding:60px 20px;color:#fff}
          .hem-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hem-stat-val{font-size:2.8rem;font-weight:900;line-height:1}
          .hem-stat-label{font-size:.95rem;opacity:.82;margin-top:6px}
          .hem-faq{max-width:760px;margin:0 auto}
          .hem-faq-item{border-bottom:1px solid #e5e5e5;padding:20px 0}
          .hem-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px}
          .hem-faq-icon{font-size:1.4rem;color:${ACCENT};flex-shrink:0;transition:transform .25s}
          .hem-faq-icon.hem-open{transform:rotate(45deg)}
          .hem-faq-a{margin-top:12px;color:#555;line-height:1.75;font-size:.95rem}
          .hem-cta{background:linear-gradient(135deg,${ACCENT},#1e3a8a);padding:80px 20px;text-align:center;color:#fff}
          .hem-cta h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin:0 0 16px}
          .hem-cta p{font-size:1.08rem;opacity:.88;max-width:560px;margin:0 auto 36px;line-height:1.7}
          @media(max-width:600px){.hem-hero{padding:80px 18px 60px}.hem-stats-grid{grid-template-columns:1fr 1fr}}
        `}</style>
      </Head>
      <section className="hem-hero">
        <h1>HTML Email Development Services<br/>Pixel-Perfect Emails That Render Everywhere</h1>
        <p>We build responsive HTML email templates that render flawlessly across Gmail, Outlook, Apple Mail, and 90+ email clients. From campaign templates to full transactional email suites — hand-coded, tested, and ready to deploy.</p>
        <div className="hem-hero-btns">
          <Link href="/contact-us" className="hem-btn-primary">Get a Free Email Template Quote →</Link>
          <Link href="/portfolio" className="hem-btn-outline">View Portfolio</Link>
        </div>
      </section>
      <section className="hem-sec" ref={skR}>
        <div className="hem-wrap">
          <h2 className="hem-sec-title">Skills &amp; Platforms</h2>
          <p className="hem-sec-sub">We code for every major ESP and test across every major email client — no exceptions.</p>
          <div className="hem-skills">{SKILLS.map((s, i) => <span key={s} className={`hem-skill${skV ? ' hem-in' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>{s}</span>)}</div>
        </div>
      </section>
      <section className="hem-sec hem-sec-alt" ref={enR}>
        <div className="hem-wrap">
          <h2 className="hem-sec-title">Engagement Options</h2>
          <p className="hem-sec-sub">From a single template to a full retainer — we fit around your send schedule.</p>
          <div className="hem-models">{MODELS.map((m, i) => <div key={m.title} className={`hem-model${enV ? ' hem-in' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="hem-model-icon">{m.icon}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div>
      </section>
      <section className="hem-sec" ref={whR}>
        <div className="hem-wrap">
          <h2 className="hem-sec-title">Why Choose 1Solutions for HTML Email Development?</h2>
          <p className="hem-sec-sub">We build emails that survive the inbox — Outlook, dark mode, mobile, and everything in between.</p>
          <div className="hem-why-grid">{WHY.map((w, i) => <div key={w.h} className={`hem-why-item${whV ? ' hem-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><h3>{w.h}</h3><p>{w.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hem-stats" ref={stGr}>
        <div className="hem-stats-grid">
          <div><div className="hem-stat-val">{stV ? c1 : 0}+</div><div className="hem-stat-label">Email Templates Built</div></div>
          <div><div className="hem-stat-val">{stV ? c2 : 0}+</div><div className="hem-stat-label">ESP Platforms Supported</div></div>
          <div><div className="hem-stat-val">4.{stV ? c3 : 0}/5</div><div className="hem-stat-label">Client Satisfaction</div></div>
          <div><div className="hem-stat-val">{stV ? c4 : 0}+</div><div className="hem-stat-label">Email Clients Tested</div></div>
        </div>
      </section>
      <section className="hem-sec hem-sec-alt" ref={prR}>
        <div className="hem-wrap">
          <h2 className="hem-sec-title">Our Email Development Process</h2>
          <p className="hem-sec-sub">Brief to inbox-tested delivery in 4 steps — no shortcuts, no builders, no broken rendering.</p>
          <div className="hem-process">{PROCESS.map((p, i) => <div key={p.n} className={`hem-step${prV ? ' hem-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}><div className="hem-step-n">{p.n}</div><h3>{p.h}</h3><p>{p.b}</p></div>)}</div>
        </div>
      </section>
      <section className="hem-sec">
        <div className="hem-wrap">
          <h2 className="hem-sec-title">Frequently Asked Questions</h2>
          <p className="hem-sec-sub">Common questions about our HTML email development services.</p>
          <div className="hem-faq">{FAQS.map((f, i) => <div key={i} className="hem-faq-item"><div className="hem-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{f.q}</span><span className={`hem-faq-icon${openFaq === i ? ' hem-open' : ''}`}>+</span></div>{openFaq === i && <p className="hem-faq-a">{f.a}</p>}</div>)}</div>
        </div>
      </section>
      <section className="hem-cta">
        <div className="hem-wrap">
          <h2>Ready to Build HTML Emails That Actually Render?</h2>
          <p>Tell us your ESP, send volume, and template needs — we'll quote within 24 hours and deliver your first template in under a week.</p>
          <Link href="/contact-us" className="hem-btn-primary">Get a Free Template Quote →</Link>
        </div>
      </section>
    </>
  );
}
