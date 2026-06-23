import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Brand Logo Design', desc: 'Custom logo design from scratch — wordmarks, lettermarks, pictorial marks, abstract marks, mascots, and combination marks — crafted to communicate your brand personality and values.' },
  { n: '02', title: 'Logo Redesign & Refresh', desc: 'Modernise your existing logo without losing brand equity — updating typography, refining proportions, or evolving the icon while retaining the recognition your audience already has.' },
  { n: '03', title: 'Brand Identity System', desc: 'Complete visual identity — logo suite, colour palette (primary, secondary, neutral), typography system, iconography style, and pattern/texture assets for consistent brand expression.' },
  { n: '04', title: 'Industry-Specific Logo Design', desc: 'Sector expertise across technology, healthcare, finance, retail, hospitality, legal, and professional services — design that resonates with your specific audience and industry conventions.' },
  { n: '05', title: 'Logo Variations & Formats', desc: 'Full logo suite delivery — primary, horizontal, stacked, icon-only, dark background, light background, monochrome, and embossed variants in SVG, PNG, PDF, EPS, and AI formats.' },
  { n: '06', title: 'Brand Guidelines Document', desc: 'Professional brand guidelines document — logo usage rules, clear space requirements, colour specifications (CMYK, RGB, HEX, Pantone), typography hierarchy, and do/don\'t examples.' },
  { n: '07', title: 'Business Card & Stationery Design', desc: 'Branded stationery suite — business cards, letterhead, email signatures, and presentation templates — applying your new identity consistently across all professional materials.' },
  { n: '08', title: 'Social Media Profile Kit', desc: 'Optimised logo versions for social media — profile pictures, cover photos, and favicon — correctly sized and formatted for Facebook, Instagram, LinkedIn, Twitter/X, and YouTube.' },
];

const DELIVERABLES = ['SVG Vector Files', 'PNG (Transparent)', 'PDF & EPS', 'AI Source Files', 'Brand Guidelines PDF', 'Dark & Light Variants', 'Icon-Only Version', 'Social Media Kit'];

const PROCESS = [
  { step: '01', title: 'Discovery Brief', desc: 'Understanding your business, target audience, brand personality, competitors, and design preferences — a structured brief that ensures the design direction is right before any concepts are created.' },
  { step: '02', title: 'Research & Concepts', desc: 'Market and competitor research, moodboard creation, and initial concept sketching — exploring multiple directions before committing to full digital development.' },
  { step: '03', title: 'Initial Concepts', desc: '3 distinct logo concepts presented with rationale — different approaches to your brief, allowing you to choose or combine elements from the direction that resonates most.' },
  { step: '04', title: 'Refinement Rounds', desc: '2 full rounds of revisions on your chosen concept — refining typography, proportion, colour, and icon detail based on your feedback until the design is exactly right.' },
  { step: '05', title: 'Colour & Typography', desc: 'Develop the full colour palette and typography system to accompany the final logo — delivering a cohesive visual identity, not just an isolated mark.' },
  { step: '06', title: 'Final Delivery', desc: 'Complete file package — all formats, all variants, brand guidelines PDF — delivered with full ownership transfer and source files so you are never dependent on us for future use.' },
];

const WHY = [
  { title: '15+ Years Brand Design', desc: 'Over 500 logos designed across every sector — from funded startups to established businesses rebranding for new growth. The breadth of experience shows in every brief we take on.' },
  { title: 'Strategy Before Aesthetics', desc: 'A logo that looks good but does not communicate the right thing is a failed brief. We start with brand strategy — audience, positioning, values — before opening any design software.' },
  { title: 'Full Ownership Included', desc: 'All source files and intellectual property transfer to you on final payment. No stock icons, no template bases, no licensing restrictions. Everything created is exclusively yours.' },
  { title: 'Vector-First Design', desc: 'Every logo is designed in vector format from day one — infinitely scalable, print-ready at any size, and compatible with every professional production workflow.' },
  { title: 'Transparent Revision Process', desc: '2 structured revision rounds on your chosen concept — not unlimited back-and-forth that produces indecision. Clear milestones that keep the project moving toward a great result.' },
  { title: 'Beyond the Logo', desc: 'A logo is the start of a brand identity, not the end. We offer the full visual identity system — guidelines, stationery, digital assets — so your brand looks consistent everywhere it appears.' },
];

const FAQS = [
  { q: 'How much does a professional logo design cost?', a: 'Professional logo design costs vary significantly based on complexity and scope. At 1Solutions, logo packages start from a focused wordmark or simple icon mark and scale up to full brand identity systems with guidelines, stationery, and digital asset kits. The investment depends on: the complexity of the mark (a clean wordmark vs a detailed illustrated mascot); the scope of deliverables (logo only vs full identity system); and the number of revision rounds included. We provide transparent pricing after reviewing your brief — contact us for a specific quote based on your requirements.' },
  { q: 'What is the difference between a logo and a brand identity?', a: 'A logo is a single mark — a symbol, wordmark, or combination — that identifies your business. A brand identity is the complete visual language that extends from the logo: colour palette (primary, secondary, tonal ranges), typography system (heading font, body font, hierarchy), iconography style, photographic style, pattern and texture assets, and usage guidelines. Many businesses start with a logo and grow into a full brand identity as they mature. We design both — standalone logos and complete identity systems.' },
  { q: 'How long does logo design take?', a: 'A standard logo design project with 3 initial concepts and 2 revision rounds typically takes 2 to 3 weeks from brief sign-off to final delivery. Full brand identity systems (logo plus colour, typography, guidelines, and stationery) typically take 4 to 6 weeks. Timeline depends on: client feedback turnaround speed; complexity of the mark; and the number of deliverables in scope. We agree a timeline during briefing so both parties have clear expectations from the start.' },
  { q: 'Will I own the logo once it is designed?', a: 'Yes — on final payment, full intellectual property ownership transfers to you. This includes: the right to use the logo in perpetuity with no licensing fees; the source files (Adobe Illustrator .ai, vector .eps, .svg) to make future modifications yourself or with another designer; no restrictions on commercial use; and no hidden royalty obligations. We do not use stock icon libraries or template bases — every logo is created from scratch, ensuring 100% original ownership.' },
  { q: 'What file formats will I receive?', a: 'Your final logo package includes: SVG (scalable vector — web standard); AI (Adobe Illustrator source file); EPS (universal vector for print production); PDF (vector PDF for print); PNG with transparent background (multiple sizes); JPEG (for contexts requiring white background); and optionally, a Sketch or Figma file if requested. You receive all colour variants (full colour, black, white, monochrome) and all layout variants (primary, horizontal, stacked, icon only) in each format.' },
  { q: 'Can you redesign my existing logo?', a: 'Yes. Logo redesign and brand refresh projects are a significant part of our work. The approach depends on what needs to change: a full redesign (new concept from scratch, retaining only the brand name); a brand refresh (evolving the existing mark — modernising typography, refining proportions, updating colours — while retaining core recognition); or a technical redraw (recreating an existing logo in proper vector format from a low-quality source file, without changing the design). We recommend the right approach after reviewing your current mark and understanding your goals.' },
  { q: 'Do you design logos for specific industries?', a: 'Yes. Our logo design portfolio spans technology and SaaS, healthcare and medical, finance and fintech, retail and ecommerce, hospitality and restaurants, legal and professional services, education, construction, and more. Industry context significantly shapes logo design — the conventions, colour psychology, and audience expectations of a healthcare logo differ entirely from a technology startup or a restaurant. We research your specific sector competitive landscape before developing concepts to ensure the design positions you effectively.' },
  { q: 'What information do you need to start a logo design project?', a: 'To start a logo design project we need: your business name (and any preferred abbreviations); a clear description of what you do and who your customers are; your brand personality (3 to 5 adjectives describing how you want to be perceived); competitor logos to reference (for differentiation); any design preferences — styles you like, colours you want to include or avoid, fonts that feel right or wrong; and intended use cases (digital only, print heavy, embroidery, signage). The more detail you provide in the brief, the more precisely the initial concepts will match your vision.' },
];

const STATS = [
  { label: 'Logos Designed', val: '500+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Industries Served', val: '20+' },
  { label: 'Client Satisfaction', val: '98%' },
];

export default function LogoDesignServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Design Services', item: 'https://www.1solutions.biz/app-ui-ux-design/' }, { '@type': 'ListItem', position: 3, name: 'Logo Design', item: 'https://www.1solutions.biz/logo-design-services/' }] }, { '@type': 'Service', name: 'Logo Design Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Logo Design', url: 'https://www.1solutions.biz/logo-design-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Logo Design Services | Professional Brand Logo Design Agency | 1Solutions</title>
        <meta name="description" content="Professional logo design services — custom brand logos, identity systems, and brand guidelines. 500+ logos designed across all industries. Full IP ownership included." />
        <meta name="keywords" content="logo design services, professional logo design, brand logo design, custom logo design, logo design agency, brand identity design" />
        <link rel="canonical" href="https://www.1solutions.biz/logo-design-services/" />
        <meta property="og:title" content="Logo Design Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/logo-design-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .logo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .logo-page *,.logo-page *::before,.logo-page *::after{box-sizing:border-box}
          .logo-hero{background:linear-gradient(135deg,#fffbeb 0%,#fef3c7 25%,#fde68a 60%,#fffbeb 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .logo-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(180,83,9,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .logo-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(120,53,15,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .logo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .logo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .logo-bc a{color:#6b7280;text-decoration:none}.logo-bc a:hover{color:#B45309}.logo-bc span{color:#d1d5db}
          .logo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(180,83,9,0.08);border:1px solid rgba(180,83,9,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#B45309;margin-bottom:28px}
          .logo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#78350F 0%,#B45309 50%,#92400E 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .logo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .logo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .logo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#B45309;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(180,83,9,0.28)}
          .logo-btn-p:hover{background:#92400E;box-shadow:0 8px 32px rgba(180,83,9,0.38);transform:translateY(-2px)}
          .logo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .logo-btn-s:hover{border-color:#B45309;color:#B45309;transform:translateY(-2px)}
          .logo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(180,83,9,0.07)}
          .logo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(180,83,9,0.08)}.logo-stat:last-child{border-right:none}
          .logo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .logo-stat-v{font-size:1.6rem;font-weight:900;color:#B45309;letter-spacing:-0.5px}
          .logo-svc{background:#f8fafd;padding:80px 40px}.logo-svc-in{max-width:1280px;margin:0 auto}
          .logo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#B45309;margin-bottom:10px;display:block}
          .logo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#78350F 0%,#B45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .logo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .logo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .logo-card{background:linear-gradient(135deg,rgba(255,251,235,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(253,230,138,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(180,83,9,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .logo-card.visible{opacity:1;transform:translateY(0)}.logo-card:hover{transform:translateY(-6px);border-color:rgba(180,83,9,0.22);box-shadow:0 16px 48px rgba(180,83,9,0.09)}
          .logo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#B45309;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .logo-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .logo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .logo-dlv{background:linear-gradient(135deg,#78350F 0%,#B45309 100%);padding:60px 40px}
          .logo-dlv-in{max-width:1280px;margin:0 auto;text-align:center}
          .logo-dlv h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .logo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .logo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .logo-proc{background:linear-gradient(135deg,#fffbeb 0%,#fffbeb 50%,#fef3c7 100%);padding:80px 40px}
          .logo-proc-in{max-width:900px;margin:0 auto}
          .logo-steps{display:flex;flex-direction:column;margin-top:44px}
          .logo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(180,83,9,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .logo-step:last-child{border-bottom:none}.logo-step.visible{opacity:1;transform:translateX(0)}
          .logo-snum{font-size:3rem;font-weight:900;color:rgba(180,83,9,0.15);line-height:1;letter-spacing:-2px}
          .logo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .logo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .logo-why{background:#fff;padding:80px 40px}.logo-why-in{max-width:1280px;margin:0 auto}
          .logo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .logo-wcard{background:linear-gradient(135deg,#fffbeb 0%,#fff 60%,#fef3c7 100%);border:1px solid rgba(180,83,9,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .logo-wcard.visible{opacity:1;transform:translateY(0)}.logo-wcard:hover{border-color:rgba(180,83,9,0.20);box-shadow:0 8px 32px rgba(180,83,9,0.07)}
          .logo-dot{width:8px;height:8px;border-radius:50%;background:#B45309;margin-bottom:16px}
          .logo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .logo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .logo-faq{background:#f8fafd;padding:80px 40px}.logo-faq-in{max-width:860px;margin:0 auto}
          .logo-fitem{border-bottom:1px solid #e5e7eb}
          .logo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .logo-fq:hover{color:#B45309}
          .logo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .logo-fitem.open .logo-ficon{border-color:#B45309;color:#B45309;background:rgba(180,83,9,0.06)}
          .logo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .logo-fitem.open .logo-fa{max-height:500px;padding-bottom:22px}
          .logo-cta{background:linear-gradient(135deg,rgba(180,83,9,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(120,53,15,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .logo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(180,83,9,0.10) 0%,transparent 70%);pointer-events:none}
          .logo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(120,53,15,0.08) 0%,transparent 70%);pointer-events:none}
          .logo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .logo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#78350F 0%,#B45309 50%,#92400E 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .logo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .logo-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.logo-grid{grid-template-columns:repeat(2,1fr)}.logo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.logo-hero,.logo-svc,.logo-dlv,.logo-proc,.logo-why,.logo-faq,.logo-cta{padding:60px 24px}.logo-hero{padding-top:60px;padding-bottom:0}.logo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.logo-stat:nth-child(2){border-right:none}.logo-grid{grid-template-columns:1fr}.logo-why-grid{grid-template-columns:1fr}.logo-step{grid-template-columns:56px 1fr}.logo-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="logo-page">
        <section className="logo-hero"><div className="logo-o1"/><div className="logo-o2"/>
          <div className="logo-in">
            <nav className="logo-bc"><Link href="/">Home</Link><span>/</span><Link href="/app-ui-ux-design">Design Services</Link><span>/</span><span style={{color:'#B45309'}}>Logo Design</span></nav>
            <span className="logo-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#B45309',display:'inline-block'}}/> Custom Design · Full Ownership · Vector Files</span>
            <h1 className="logo-h1">Professional Logo Design Services — Brands That Get Remembered</h1>
            <p className="logo-sub">Custom logo design built on brand strategy — not templates. 500+ logos designed across all industries, with full IP ownership and every format you need delivered on completion.</p>
            <div className="logo-btns">
              <Link href="/contact-us" className="logo-btn-p">Start Your Logo Project <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/app-ui-ux-design" className="logo-btn-s">UI/UX Design Services</Link>
            </div>
            <div className="logo-stats">{STATS.map(s => <div key={s.label} className="logo-stat"><div className="logo-stat-l">{s.label}</div><div className="logo-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="logo-svc"><div className="logo-svc-in">
          <span className="logo-ey2">What We Offer</span><h2 className="logo-ttl">Logo Design Services</h2>
          <p className="logo-desc">From startup wordmarks to full brand identity systems — every logo design service you need under one roof.</p>
          <div className="logo-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`logo-card${visibleCards.includes(i)?' visible':''}`}><div className="logo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="logo-dlv"><div className="logo-dlv-in">
          <h2>Everything Included in Your Delivery Package</h2>
          <div className="logo-pills">{DELIVERABLES.map(c => <span key={c} className="logo-pill">{c}</span>)}</div>
        </div></section>
        <section className="logo-proc"><div className="logo-proc-in">
          <span className="logo-ey2">How We Work</span><h2 className="logo-ttl">Our Logo Design Process</h2>
          <p className="logo-desc">Brief to final delivery in 2 to 3 weeks — a structured process that produces great work efficiently without endless revision loops.</p>
          <div className="logo-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`logo-step${visibleSteps.includes(i)?' visible':''}`}><div className="logo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="logo-why"><div className="logo-why-in">
          <span className="logo-ey2">Why 1Solutions</span><h2 className="logo-ttl">Strategy-Led Design, Not Template Work</h2>
          <p className="logo-desc">Every logo is original, built on a brand brief, and delivered with full ownership — no stock, no templates, no restrictions.</p>
          <div className="logo-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`logo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="logo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="logo-faq"><div className="logo-faq-in">
          <span className="logo-ey2">Got Questions?</span><h2 className="logo-ttl">Logo Design FAQs</h2>
          <p className="logo-desc">Answers to the most common questions about our logo design services.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`logo-fitem${openFaq===i?' open':''}`}><button className="logo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="logo-ficon">{openFaq===i?'−':'+'}</span></button><div className="logo-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="logo-cta"><div className="logo-cta-o1"/><div className="logo-cta-o2"/>
          <div className="logo-cta-in">
            <span className="logo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Build a Brand That Gets Noticed?</span>
            <h2 className="logo-cta-t">Start Your Logo Design Project</h2>
            <p className="logo-cta-s">Tell us about your business and brand goals — we&rsquo;ll send you a tailored quote and timeline within 24 hours.</p>
            <div className="logo-cta-btns">
              <Link href="/contact-us" className="logo-btn-p">Get a Logo Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/app-ui-ux-design" className="logo-btn-s">UI/UX Design Services</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
