import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Lead Generation Landing Pages', desc: 'High-converting lead capture pages — optimised headline, benefit-driven copy, social proof placement, trust signals, and form design engineered to maximise enquiry and sign-up conversion rate.' },
  { n: '02', title: 'Product & Sales Pages', desc: 'Long-form sales page design — feature-benefit sections, objection handling, FAQ, testimonials, urgency mechanics, and multi-CTA layout that guides prospects from interest to purchase decision.' },
  { n: '03', title: 'PPC & Ad Campaign Landing Pages', desc: 'Landing pages built for paid traffic — message-match with your ad copy, single focused objective, no distracting navigation, and fast load times that protect your Quality Score and conversion rate.' },
  { n: '04', title: 'SaaS & App Landing Pages', desc: 'Software and app landing page design — feature showcases, demo/free trial CTAs, pricing section design, integration logos, and social proof formats specific to software buyer psychology.' },
  { n: '05', title: 'Webinar & Event Registration Pages', desc: 'Event registration page design — speaker credibility sections, date/time urgency elements, agenda preview, social proof from past events, and registration form optimisation to maximise sign-ups.' },
  { n: '06', title: 'A/B Test-Ready Page Variants', desc: 'Landing page variants designed for structured A/B testing — headline tests, hero image tests, CTA copy tests, and form length tests — with analytics instrumentation built in from the start.' },
  { n: '07', title: 'Mobile-First Responsive Design', desc: 'Every landing page designed mobile-first — touch-friendly CTAs, fast mobile load times, readable typography at all sizes, and conversion elements positioned for thumb-zone engagement.' },
  { n: '08', title: 'CRO-Optimised Copy', desc: 'Conversion copywriting integrated with design — benefit-led headlines, proof points, objection handling, and call-to-action copy that works with the visual layout to maximise page performance.' },
];

const TOOLS = ['Figma', 'Adobe XD', 'Unbounce', 'Webflow', 'WordPress', 'Elementor', 'Next.js', 'Google Optimize', 'Hotjar', 'Google Tag Manager', 'GA4'];

const PROCESS = [
  { step: '01', title: 'Conversion Brief', desc: 'Audience, offer, traffic source, and conversion goal — a conversion brief that defines success before design begins, ensuring every element is built around the outcome.' },
  { step: '02', title: 'Wireframe & Structure', desc: 'Content hierarchy wireframe — headline, hero, benefits, proof, CTA flow — mapping the persuasive structure before visual design starts.' },
  { step: '03', title: 'Visual Design', desc: 'Full visual design — typography, colour, imagery, icons, and layout — consistent with your brand and optimised for the conversion goal.' },
  { step: '04', title: 'Copywriting', desc: 'Conversion copy for every section — headlines, subheadlines, benefit bullets, social proof, and CTAs — written to work with the design layout.' },
  { step: '05', title: 'Development & Integration', desc: 'Page built and deployed — with form integration, analytics, conversion tracking, and page speed optimisation before launch.' },
  { step: '06', title: 'Post-Launch Optimisation', desc: 'Heatmap and session recording setup, conversion rate baseline, and first A/B test hypothesis — establishing the data foundation for ongoing improvement.' },
];

const WHY = [
  { title: 'Conversion-First, Design-Second', desc: 'Beautiful pages that do not convert are expensive decorations. We structure landing pages around conversion psychology first and visual design second — every design decision is justified by its impact on conversion.' },
  { title: 'Copy + Design Combined', desc: 'Landing page performance depends on copy and design working together — not separately. Our copywriters and designers collaborate from the brief, not at the end.' },
  { title: 'PPC & Paid Traffic Expertise', desc: 'We understand the message-match principle, Quality Score implications, and conversion tracking requirements of paid traffic landing pages — not just how to make them look good.' },
  { title: 'CRO Integration', desc: 'Every landing page is built for testing from day one — analytics instrumented, heatmaps installed, and first A/B test hypothesis documented before the page goes live.' },
  { title: 'Platform Flexibility', desc: 'We build landing pages on Unbounce, Webflow, WordPress (Elementor or Gutenberg), Next.js, or plain HTML — whichever platform best suits your tech stack and future testing needs.' },
  { title: 'Speed Optimised', desc: 'Every landing page is performance-optimised — compressed images, minimal third-party scripts, and Core Web Vitals compliance. Slow pages kill conversion rates and ad Quality Scores.' },
];

const FAQS = [
  { q: 'What makes a high-converting landing page?', a: 'High-converting landing pages share several characteristics: a single, clear conversion goal (no competing CTAs or navigation links pulling attention away); message match (the headline reflects the ad or source that brought the visitor); a clear value proposition above the fold; social proof relevant to the specific offer (testimonials, case study metrics, logos of recognisable clients); a friction-reduced conversion mechanism (short forms for lead gen, clear pricing for sales pages); and fast load speed (pages loading over 3 seconds see sharp conversion drops). We design all of these elements in coordination — optimising the whole page, not individual elements in isolation.' },
  { q: 'How is a landing page different from a website page?', a: 'A landing page is a standalone page designed for a single conversion objective — capturing a lead, booking a demo, registering for an event, or driving a purchase. Unlike website pages, landing pages remove navigation (preventing visitors from wandering away), focus all content on one offer, and include a single clear call to action. They are often built outside the main website CMS to enable rapid A/B testing without affecting the main site. Website pages serve multiple purposes; landing pages serve exactly one.' },
  { q: 'Should my PPC landing page match my ad?', a: 'Yes — message match is one of the highest-impact factors in paid traffic landing page performance. When a user clicks an ad promising "Free 30-Day Trial — No Credit Card Required", the landing page headline should reflect exactly that promise. Mismatch between ad copy and landing page creates cognitive dissonance that drives users to bounce immediately. Message match also directly affects Google Ads Quality Score — higher message relevance scores mean lower CPCs and better ad placement, making landing page alignment a financial issue as well as a conversion one.' },
  { q: 'How long does landing page design take?', a: 'A single landing page design and build typically takes 7 to 14 days from brief sign-off — wireframe review, visual design, copy, development, and analytics setup. More complex pages (long-form sales pages with custom illustrations, multiple sections, and integrated video) may take 2 to 3 weeks. Full landing page systems (core page plus 2 to 3 test variants, multiple offer variants, or localised versions) take 3 to 4 weeks. We agree the timeline during briefing so expectations are clear from the start.' },
  { q: 'Do you write the landing page copy?', a: 'Yes. Landing page copy — headline, subheadline, benefit bullets, objection handling, social proof copy, and CTA text — is included in our landing page design service. Conversion copywriting is not a bolt-on; it is integrated into the design process because copy and layout must work together from the start. If you have existing copy you want used or adapted, we can work with that too — but our best-performing pages are those where copy and design are developed in tandem.' },
  { q: 'What platform should my landing page be built on?', a: 'The right platform depends on your use case: Unbounce or Instapage are best for paid traffic landing pages that need rapid A/B testing without developer involvement; Webflow is best for design flexibility and custom interactivity; WordPress (with Elementor or Bricks) is best when the page needs to live within an existing WordPress site; Next.js is best for performance-critical pages that need to integrate with a larger React application; and plain HTML is occasionally best for maximum performance with no framework overhead. We build on all of these and recommend the right platform after understanding your setup.' },
  { q: 'How do you measure landing page success?', a: 'Primary metric: conversion rate (the percentage of visitors who complete the goal action — form submission, purchase, registration). Secondary metrics: bounce rate (visitors who leave immediately), time on page (engagement signal), scroll depth (how far visitors read), and heatmap click patterns (what draws attention). For paid traffic pages we also track CPA (cost per acquisition) and ROAS (return on ad spend) as downstream success metrics. We set up GA4 conversion goals, Hotjar heatmaps, and form submission tracking before launch so measurement is in place from day one.' },
  { q: 'Can you design multiple variants for A/B testing?', a: 'Yes. We design and build A/B test variants as part of landing page projects — typically a control (primary design) and one or two challenger variants testing specific hypotheses: headline copy, hero image, CTA button copy and colour, form length, or page structure. Each variant is built to the same quality standard as the control and set up in your testing platform (Google Optimize, Optimizely, VWO, or Unbounce\'s native testing). We document the hypothesis, expected impact, and required sample size for each test before launch.' },
];

const STATS = [
  { label: 'Landing Pages Built', val: '400+' },
  { label: 'Avg Conversion Lift', val: '+35%' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Client Retention', val: '92%' },
];

export default function LandingPageDesignServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Design Services', item: 'https://www.1solutions.biz/app-ui-ux-design/' }, { '@type': 'ListItem', position: 3, name: 'Landing Page Design', item: 'https://www.1solutions.biz/landing-page-design-services/' }] }, { '@type': 'Service', name: 'Landing Page Design Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Landing Page Design', url: 'https://www.1solutions.biz/landing-page-design-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Landing Page Design Services | High-Converting PPC & Lead Gen Pages | 1Solutions</title>
        <meta name="description" content="Landing page design services — PPC landing pages, lead generation, sales pages, and A/B test variants. Conversion-first design + copywriting. 400+ pages built, +35% avg conversion lift." />
        <meta name="keywords" content="landing page design services, ppc landing page design, lead generation landing page, high converting landing page, landing page agency, conversion landing page design" />
        <link rel="canonical" href="https://www.1solutions.biz/landing-page-design-services/" />
        <meta property="og:title" content="Landing Page Design Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/landing-page-design-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .lpd-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .lpd-page *,.lpd-page *::before,.lpd-page *::after{box-sizing:border-box}
          .lpd-hero{background:linear-gradient(135deg,#fff7ed 0%,#fed7aa 25%,#fdba74 60%,#fff7ed 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .lpd-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(194,65,12,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .lpd-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(154,52,18,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .lpd-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .lpd-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .lpd-bc a{color:#6b7280;text-decoration:none}.lpd-bc a:hover{color:#C2410C}.lpd-bc span{color:#d1d5db}
          .lpd-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(194,65,12,0.08);border:1px solid rgba(194,65,12,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#C2410C;margin-bottom:28px}
          .lpd-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#9A3412 0%,#C2410C 50%,#7C2D12 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .lpd-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .lpd-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .lpd-btn-p{display:inline-flex;align-items:center;gap:8px;background:#C2410C;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(194,65,12,0.28)}
          .lpd-btn-p:hover{background:#9A3412;box-shadow:0 8px 32px rgba(194,65,12,0.38);transform:translateY(-2px)}
          .lpd-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .lpd-btn-s:hover{border-color:#C2410C;color:#C2410C;transform:translateY(-2px)}
          .lpd-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(194,65,12,0.07)}
          .lpd-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(194,65,12,0.08)}.lpd-stat:last-child{border-right:none}
          .lpd-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .lpd-stat-v{font-size:1.6rem;font-weight:900;color:#C2410C;letter-spacing:-0.5px}
          .lpd-svc{background:#f8fafd;padding:80px 40px}.lpd-svc-in{max-width:1280px;margin:0 auto}
          .lpd-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#C2410C;margin-bottom:10px;display:block}
          .lpd-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#9A3412 0%,#C2410C 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .lpd-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .lpd-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .lpd-card{background:linear-gradient(135deg,rgba(255,247,237,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(254,215,170,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(194,65,12,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .lpd-card.visible{opacity:1;transform:translateY(0)}.lpd-card:hover{transform:translateY(-6px);border-color:rgba(194,65,12,0.22);box-shadow:0 16px 48px rgba(194,65,12,0.09)}
          .lpd-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#C2410C;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .lpd-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .lpd-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .lpd-tools{background:linear-gradient(135deg,#9A3412 0%,#C2410C 100%);padding:60px 40px}
          .lpd-tools-in{max-width:1280px;margin:0 auto;text-align:center}
          .lpd-tools h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .lpd-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .lpd-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .lpd-proc{background:linear-gradient(135deg,#fff7ed 0%,#fff7ed 50%,#fed7aa 100%);padding:80px 40px}
          .lpd-proc-in{max-width:900px;margin:0 auto}
          .lpd-steps{display:flex;flex-direction:column;margin-top:44px}
          .lpd-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(194,65,12,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .lpd-step:last-child{border-bottom:none}.lpd-step.visible{opacity:1;transform:translateX(0)}
          .lpd-snum{font-size:3rem;font-weight:900;color:rgba(194,65,12,0.15);line-height:1;letter-spacing:-2px}
          .lpd-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .lpd-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .lpd-why{background:#fff;padding:80px 40px}.lpd-why-in{max-width:1280px;margin:0 auto}
          .lpd-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .lpd-wcard{background:linear-gradient(135deg,#fff7ed 0%,#fff 60%,#fed7aa 100%);border:1px solid rgba(194,65,12,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .lpd-wcard.visible{opacity:1;transform:translateY(0)}.lpd-wcard:hover{border-color:rgba(194,65,12,0.20);box-shadow:0 8px 32px rgba(194,65,12,0.07)}
          .lpd-dot{width:8px;height:8px;border-radius:50%;background:#C2410C;margin-bottom:16px}
          .lpd-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .lpd-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .lpd-faq{background:#f8fafd;padding:80px 40px}.lpd-faq-in{max-width:860px;margin:0 auto}
          .lpd-fitem{border-bottom:1px solid #e5e7eb}
          .lpd-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .lpd-fq:hover{color:#C2410C}
          .lpd-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .lpd-fitem.open .lpd-ficon{border-color:#C2410C;color:#C2410C;background:rgba(194,65,12,0.06)}
          .lpd-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .lpd-fitem.open .lpd-fa{max-height:500px;padding-bottom:22px}
          .lpd-cta{background:linear-gradient(135deg,rgba(194,65,12,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(154,52,18,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .lpd-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(194,65,12,0.10) 0%,transparent 70%);pointer-events:none}
          .lpd-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(154,52,18,0.08) 0%,transparent 70%);pointer-events:none}
          .lpd-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .lpd-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#9A3412 0%,#C2410C 50%,#7C2D12 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .lpd-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .lpd-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.lpd-grid{grid-template-columns:repeat(2,1fr)}.lpd-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.lpd-hero,.lpd-svc,.lpd-tools,.lpd-proc,.lpd-why,.lpd-faq,.lpd-cta{padding:60px 24px}.lpd-hero{padding-top:60px;padding-bottom:0}.lpd-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.lpd-stat:nth-child(2){border-right:none}.lpd-grid{grid-template-columns:1fr}.lpd-why-grid{grid-template-columns:1fr}.lpd-step{grid-template-columns:56px 1fr}.lpd-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="lpd-page">
        <section className="lpd-hero"><div className="lpd-o1"/><div className="lpd-o2"/>
          <div className="lpd-in">
            <nav className="lpd-bc"><Link href="/">Home</Link><span>/</span><Link href="/app-ui-ux-design">Design Services</Link><span>/</span><span style={{color:'#C2410C'}}>Landing Page Design</span></nav>
            <span className="lpd-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#C2410C',display:'inline-block'}}/> PPC · Lead Gen · A/B Testing</span>
            <h1 className="lpd-h1">Landing Page Design Services — Pages Built to Convert, Not Just Impress</h1>
            <p className="lpd-sub">Conversion-first landing page design with integrated copywriting — for PPC campaigns, lead generation, sales, and events. 400+ pages built with an average +35% conversion rate lift.</p>
            <div className="lpd-btns">
              <Link href="/contact" className="lpd-btn-p">Get a Landing Page Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/conversion-rate-optimization-services" className="lpd-btn-s">CRO Services</Link>
            </div>
            <div className="lpd-stats">{STATS.map(s => <div key={s.label} className="lpd-stat"><div className="lpd-stat-l">{s.label}</div><div className="lpd-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="lpd-svc"><div className="lpd-svc-in">
          <span className="lpd-ey2">What We Build</span><h2 className="lpd-ttl">Landing Page Design Services</h2>
          <p className="lpd-desc">Every type of landing page — lead gen, sales, PPC, SaaS, events, and A/B variants — designed and built to convert.</p>
          <div className="lpd-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`lpd-card${visibleCards.includes(i)?' visible':''}`}><div className="lpd-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="lpd-tools"><div className="lpd-tools-in">
          <h2>Platforms &amp; Tools</h2>
          <div className="lpd-pills">{TOOLS.map(c => <span key={c} className="lpd-pill">{c}</span>)}</div>
        </div></section>
        <section className="lpd-proc"><div className="lpd-proc-in">
          <span className="lpd-ey2">How We Work</span><h2 className="lpd-ttl">Our Landing Page Design Process</h2>
          <p className="lpd-desc">Conversion brief to post-launch testing — a structured process that delivers high-converting pages efficiently with data tracking from day one.</p>
          <div className="lpd-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`lpd-step${visibleSteps.includes(i)?' visible':''}`}><div className="lpd-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="lpd-why"><div className="lpd-why-in">
          <span className="lpd-ey2">Why 1Solutions</span><h2 className="lpd-ttl">Conversion Psychology Meets Great Design</h2>
          <p className="lpd-desc">We combine copywriting, conversion psychology, and visual design — because all three must work together for a landing page to truly perform.</p>
          <div className="lpd-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`lpd-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="lpd-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="lpd-faq"><div className="lpd-faq-in">
          <span className="lpd-ey2">Got Questions?</span><h2 className="lpd-ttl">Landing Page Design FAQs</h2>
          <p className="lpd-desc">Everything you need to know about our landing page design services.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`lpd-fitem${openFaq===i?' open':''}`}><button className="lpd-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="lpd-ficon">{openFaq===i?'−':'+'}</span></button><div className="lpd-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="lpd-cta"><div className="lpd-cta-o1"/><div className="lpd-cta-o2"/>
          <div className="lpd-cta-in">
            <span className="lpd-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Build a Page That Actually Converts?</span>
            <h2 className="lpd-cta-t">Get Your Landing Page Designed</h2>
            <p className="lpd-cta-s">Tell us about your campaign goal, traffic source, and audience — we&rsquo;ll send you a tailored quote and timeline within 24 hours.</p>
            <div className="lpd-cta-btns">
              <Link href="/contact" className="lpd-btn-p">Get a Landing Page Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/conversion-rate-optimization-services" className="lpd-btn-s">CRO Services</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
