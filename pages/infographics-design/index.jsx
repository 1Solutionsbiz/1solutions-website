import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Statistical Infographics', desc: 'Data visualisation infographics — turning complex statistics, survey results, research findings, and numeric data into clear, visually compelling stories that audiences actually engage with.' },
  { n: '02', title: 'Process & How-To Infographics', desc: 'Step-by-step process visualisations — complex workflows, onboarding steps, tutorial sequences, and how-to guides broken into digestible visual stages.' },
  { n: '03', title: 'Timeline Infographics', desc: 'Historical timelines, product roadmap visuals, company history graphics, and event chronologies — presenting time-based narratives in a scannable, shareable format.' },
  { n: '04', title: 'Comparison Infographics', desc: 'Side-by-side comparison graphics — product vs product, before vs after, your approach vs the competition — visual formats that make decision-making easy for your audience.' },
  { n: '05', title: 'Geographic & Map Infographics', desc: 'Geographic data visualisations — regional statistics, location-based data, distribution maps, and market presence graphics that make spatial information immediately understandable.' },
  { n: '06', title: 'Promotional Social Infographics', desc: 'Social media-optimised infographic formats — square, portrait, and carousel formats for Instagram, LinkedIn, Facebook, and Twitter/X — designed for maximum engagement and sharing.' },
  { n: '07', title: 'Content Marketing Infographics', desc: 'Long-form vertical infographics designed for blog embeds, link building campaigns, and content distribution — comprehensive topic graphics that earn backlinks and social shares.' },
  { n: '08', title: 'Corporate & Report Graphics', desc: 'Annual report visualisations, investor presentation graphics, industry report illustrations, and internal data dashboards — corporate infographics that communicate authority and clarity.' },
];

const FORMATS = ['Social Media Square', 'Long-Form Vertical', 'LinkedIn Carousel', 'Instagram Stories', 'Blog Embed', 'Presentation Slide', 'PDF Report', 'Interactive HTML'];

const PROCESS = [
  { step: '01', title: 'Content Brief', desc: 'Clarifying the data, narrative, and audience — what you want to communicate, who will see it, and where it will be published. The brief that determines structure before design starts.' },
  { step: '02', title: 'Data Organisation', desc: 'Reviewing and organising your source data or content — identifying the key messages, hierarchy of information, and most compelling data points to lead with.' },
  { step: '03', title: 'Structure & Wireframe', desc: 'Wireframing the information hierarchy — the visual flow, section structure, and narrative arc — before any colour or visual style is applied.' },
  { step: '04', title: 'Visual Design', desc: 'Full visual design — brand-consistent colour palette, typography, icons, illustrations, and chart styles — bringing the wireframe to life.' },
  { step: '05', title: 'Revision Round', desc: '1 to 2 rounds of revisions — adjusting copy, data labels, visual hierarchy, and colour based on your feedback.' },
  { step: '06', title: 'Final Export', desc: 'Delivery in all required formats — web-optimised PNG/JPG, print-ready PDF, editable source file (Figma/Illustrator), and platform-specific variants.' },
];

const WHY = [
  { title: 'Data Storytelling Expertise', desc: 'An infographic that presents data without a narrative is a chart. We structure data into a story — with a lead insight, supporting evidence, and a conclusion that resonates with your audience.' },
  { title: 'Brand-Consistent Design', desc: 'Every infographic is designed to match your brand system — colours, typography, icon style, and visual language — so your content is immediately recognisable as yours across every platform.' },
  { title: 'SEO & Link Building Value', desc: 'We design infographics built for content marketing — with embed code, proper attribution, and visual impact that makes other sites want to republish and link back to your original.' },
  { title: 'Multiple Format Delivery', desc: 'Every infographic is delivered in multiple formats — long-form web, social square, Instagram carousel, LinkedIn document, and print PDF — so one piece of content works everywhere.' },
  { title: 'Content Marketing Integration', desc: 'We align infographic topics with your SEO content strategy — targeting keywords and topics where visual content will earn backlinks, social shares, and organic traffic.' },
  { title: 'Fast Turnaround', desc: 'Standard infographic projects completed in 3 to 5 business days from brief sign-off — without sacrificing the visual quality that makes infographics worth sharing.' },
];

const FAQS = [
  { q: 'What types of infographics do you design?', a: 'We design all major infographic types: statistical (data and chart-based); process and how-to (step-by-step workflows); timeline (chronological narratives); comparison (side-by-side feature comparisons); geographic (map-based data visualisations); list and roundup (top 10, key facts format); and promotional social infographics (optimised for Instagram, LinkedIn, Facebook). We also create interactive HTML infographics for web embeds and animated infographics for social media. The right format depends on your content type, audience, and distribution channel — we recommend the best approach during briefing.' },
  { q: 'How long does infographic design take?', a: 'A standard single infographic (one topic, one format) typically takes 3 to 5 business days from brief and content sign-off to final delivery. Complex infographics with custom illustration, original research data, or multiple platform variants take 5 to 7 business days. Rush delivery within 24 to 48 hours is available for simpler projects. Timeline begins when we have the content and data — not from enquiry. If you need content strategy and data research first, add 2 to 3 days for that phase.' },
  { q: 'What do I need to provide for infographic design?', a: 'For us to design your infographic we need: the data or content you want to visualise (statistics, survey results, process steps, timeline events, comparison points); the intended use (blog post, social media, link building campaign, presentation, report); target audience (consumer vs B2B vs investor vs internal); your brand assets (logo, colour palette, fonts, brand guidelines); and any reference infographics you like the style of. If you have raw data but no narrative structure, we can help organise it — but the underlying content needs to come from you.' },
  { q: 'Do infographics help with SEO and link building?', a: 'Yes — high-quality infographics are one of the most effective content formats for earning backlinks. When an infographic presents genuinely useful, original data in a visually compelling format, other websites republish it with a link back to the original source. This earns natural editorial backlinks — the most valuable type for SEO. For link building campaigns, we design infographics specifically optimised for outreach: covering trending topics, presenting original research, using visual styles that editorial teams trust, and including clean embed code that makes republication frictionless. Many of our clients\' most-linked pieces of content are infographics.' },
  { q: 'Can you design infographics for social media?', a: 'Yes. Social media infographic formats differ from long-form web infographics. For Instagram, we create square (1:1) and portrait (4:5 or 9:16 Stories) formats — often as carousel sequences where each slide presents one data point. For LinkedIn, we create document carousel posts (PDF infographic slide decks) and square or portrait feed graphics. For Twitter/X, we design landscape or square formats that are readable as thumbnails. For Pinterest, we use tall portrait formats (2:3 or 3:4 aspect ratio) that perform best on the platform. We deliver each infographic in the correct dimensions and file specifications for every platform you need.' },
  { q: 'What file formats are infographics delivered in?', a: 'Standard delivery includes: PNG (web-optimised, transparent background option); JPG (smaller file size for web embeds); PDF (print-ready, vector-based); SVG (for web embeds requiring scalability); and the source file (Figma or Adobe Illustrator) so you can make future edits. Social media variants are delivered in platform-specific dimensions and file sizes. For print use (reports, brochures, exhibition graphics) we deliver CMYK PDF files at 300 DPI. All deliverables are included in the project fee — no extra charges for format variations.' },
  { q: 'Do you research and create the infographic content, or just design?', a: 'We offer both. Design-only: you provide the data, statistics, and content — we handle structure and visual design. Design + content strategy: we research the topic, identify the most compelling publicly available statistics, develop the narrative structure, and write the copy — then design the full infographic. Research-led infographics based on original survey data (your commissioned surveys) or proprietary data analysis are also available with longer lead times. The content-first approach typically produces higher-quality link bait because we target topics with proven demand and available data.' },
  { q: 'Can infographics be animated or interactive?', a: 'Yes. Animated infographics (typically MP4 or GIF format) work well for social media — motion draws attention in feeds and increases stop-scroll rates. Interactive HTML infographics allow users to hover for data details, filter by category, or scroll through animated data reveals — ideal for high-traffic blog posts and resource pages. Both formats require longer production time and are priced separately from static infographics. We recommend static infographics for most link building and social media use cases, with animation reserved for hero content pieces where the production investment is justified by the distribution strategy.' },
];

const STATS = [
  { label: 'Infographics Designed', val: '1,000+' },
  { label: 'Average Shares per Piece', val: '280+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Client Satisfaction', val: '97%' },
];

export default function InfographicsDesign() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Design Services', item: 'https://www.1solutions.biz/app-ui-ux-design/' }, { '@type': 'ListItem', position: 3, name: 'Infographics Design', item: 'https://www.1solutions.biz/infographics-design/' }] }, { '@type': 'Service', name: 'Infographics Design Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Infographics Design', url: 'https://www.1solutions.biz/infographics-design/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Infographics Design Services | Data Visualisation & Content Marketing Graphics | 1Solutions</title>
        <meta name="description" content="Professional infographics design — statistical, process, timeline, comparison, and social media infographics. Built for engagement, sharing, and link building. 1,000+ infographics designed." />
        <meta name="keywords" content="infographics design services, infographic design agency, data visualization infographic, content marketing infographic, social media infographic design" />
        <link rel="canonical" href="https://www.1solutions.biz/infographics-design/" />
        <meta property="og:title" content="Infographics Design Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/infographics-design/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .infog-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .infog-page *,.infog-page *::before,.infog-page *::after{box-sizing:border-box}
          .infog-hero{background:linear-gradient(135deg,#fdf4ff 0%,#f5d0fe 25%,#e879f9 40%,#fdf4ff 100%);background:linear-gradient(135deg,#fdf4ff 0%,#fae8ff 30%,#f0abfc 60%,#fdf4ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .infog-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(190,24,93,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .infog-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(157,23,77,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .infog-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .infog-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .infog-bc a{color:#6b7280;text-decoration:none}.infog-bc a:hover{color:#BE185D}.infog-bc span{color:#d1d5db}
          .infog-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(190,24,93,0.08);border:1px solid rgba(190,24,93,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#BE185D;margin-bottom:28px}
          .infog-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#9D174D 0%,#BE185D 50%,#831843 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .infog-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .infog-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .infog-btn-p{display:inline-flex;align-items:center;gap:8px;background:#BE185D;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(190,24,93,0.28)}
          .infog-btn-p:hover{background:#9D174D;box-shadow:0 8px 32px rgba(190,24,93,0.38);transform:translateY(-2px)}
          .infog-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .infog-btn-s:hover{border-color:#BE185D;color:#BE185D;transform:translateY(-2px)}
          .infog-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(190,24,93,0.07)}
          .infog-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(190,24,93,0.08)}.infog-stat:last-child{border-right:none}
          .infog-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .infog-stat-v{font-size:1.6rem;font-weight:900;color:#BE185D;letter-spacing:-0.5px}
          .infog-svc{background:#f8fafd;padding:80px 40px}.infog-svc-in{max-width:1280px;margin:0 auto}
          .infog-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#BE185D;margin-bottom:10px;display:block}
          .infog-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#9D174D 0%,#BE185D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .infog-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .infog-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .infog-card{background:linear-gradient(135deg,rgba(253,244,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(245,208,254,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(190,24,93,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .infog-card.visible{opacity:1;transform:translateY(0)}.infog-card:hover{transform:translateY(-6px);border-color:rgba(190,24,93,0.22);box-shadow:0 16px 48px rgba(190,24,93,0.09)}
          .infog-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#BE185D;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .infog-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .infog-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .infog-fmt{background:linear-gradient(135deg,#9D174D 0%,#BE185D 100%);padding:60px 40px}
          .infog-fmt-in{max-width:1280px;margin:0 auto;text-align:center}
          .infog-fmt h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .infog-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .infog-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .infog-proc{background:linear-gradient(135deg,#fdf4ff 0%,#fdf4ff 50%,#fae8ff 100%);padding:80px 40px}
          .infog-proc-in{max-width:900px;margin:0 auto}
          .infog-steps{display:flex;flex-direction:column;margin-top:44px}
          .infog-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(190,24,93,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .infog-step:last-child{border-bottom:none}.infog-step.visible{opacity:1;transform:translateX(0)}
          .infog-snum{font-size:3rem;font-weight:900;color:rgba(190,24,93,0.15);line-height:1;letter-spacing:-2px}
          .infog-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .infog-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .infog-why{background:#fff;padding:80px 40px}.infog-why-in{max-width:1280px;margin:0 auto}
          .infog-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .infog-wcard{background:linear-gradient(135deg,#fdf4ff 0%,#fff 60%,#fae8ff 100%);border:1px solid rgba(190,24,93,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .infog-wcard.visible{opacity:1;transform:translateY(0)}.infog-wcard:hover{border-color:rgba(190,24,93,0.20);box-shadow:0 8px 32px rgba(190,24,93,0.07)}
          .infog-dot{width:8px;height:8px;border-radius:50%;background:#BE185D;margin-bottom:16px}
          .infog-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .infog-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .infog-faq{background:#f8fafd;padding:80px 40px}.infog-faq-in{max-width:860px;margin:0 auto}
          .infog-fitem{border-bottom:1px solid #e5e7eb}
          .infog-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .infog-fq:hover{color:#BE185D}
          .infog-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .infog-fitem.open .infog-ficon{border-color:#BE185D;color:#BE185D;background:rgba(190,24,93,0.06)}
          .infog-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .infog-fitem.open .infog-fa{max-height:500px;padding-bottom:22px}
          .infog-cta{background:linear-gradient(135deg,rgba(190,24,93,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(157,23,77,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .infog-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(190,24,93,0.10) 0%,transparent 70%);pointer-events:none}
          .infog-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(157,23,77,0.08) 0%,transparent 70%);pointer-events:none}
          .infog-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .infog-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#9D174D 0%,#BE185D 50%,#831843 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .infog-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .infog-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.infog-grid{grid-template-columns:repeat(2,1fr)}.infog-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.infog-hero,.infog-svc,.infog-fmt,.infog-proc,.infog-why,.infog-faq,.infog-cta{padding:60px 24px}.infog-hero{padding-top:60px;padding-bottom:0}.infog-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.infog-stat:nth-child(2){border-right:none}.infog-grid{grid-template-columns:1fr}.infog-why-grid{grid-template-columns:1fr}.infog-step{grid-template-columns:56px 1fr}.infog-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="infog-page">
        <section className="infog-hero"><div className="infog-o1"/><div className="infog-o2"/>
          <div className="infog-in">
            <nav className="infog-bc"><Link href="/">Home</Link><span>/</span><Link href="/app-ui-ux-design">Design Services</Link><span>/</span><span style={{color:'#BE185D'}}>Infographics Design</span></nav>
            <span className="infog-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#BE185D',display:'inline-block'}}/> Data Visualisation · Social · Link Building</span>
            <h1 className="infog-h1">Infographics Design Services — Data That Gets Shared</h1>
            <p className="infog-sub">Professional infographic design for content marketing, link building, social media, and corporate communications — 1,000+ infographics designed that earn shares, backlinks, and attention.</p>
            <div className="infog-btns">
              <Link href="/contact" className="infog-btn-p">Get an Infographic Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/content-copywriting-services" className="infog-btn-s">Content &amp; Copywriting</Link>
            </div>
            <div className="infog-stats">{STATS.map(s => <div key={s.label} className="infog-stat"><div className="infog-stat-l">{s.label}</div><div className="infog-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="infog-svc"><div className="infog-svc-in">
          <span className="infog-ey2">What We Design</span><h2 className="infog-ttl">Infographics Design Services</h2>
          <p className="infog-desc">Statistical, process, timeline, comparison, geographic, and social infographics — designed for every platform and purpose.</p>
          <div className="infog-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`infog-card${visibleCards.includes(i)?' visible':''}`}><div className="infog-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="infog-fmt"><div className="infog-fmt-in">
          <h2>Formats &amp; Deliverables</h2>
          <div className="infog-pills">{FORMATS.map(c => <span key={c} className="infog-pill">{c}</span>)}</div>
        </div></section>
        <section className="infog-proc"><div className="infog-proc-in">
          <span className="infog-ey2">How We Work</span><h2 className="infog-ttl">Our Infographic Design Process</h2>
          <p className="infog-desc">Brief to final export in 3 to 5 days — structured to produce visually compelling, shareable infographics efficiently.</p>
          <div className="infog-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`infog-step${visibleSteps.includes(i)?' visible':''}`}><div className="infog-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="infog-why"><div className="infog-why-in">
          <span className="infog-ey2">Why 1Solutions</span><h2 className="infog-ttl">Data Storytelling That Earns Attention</h2>
          <p className="infog-desc">We design infographics built for a purpose — not just to look good, but to earn shares, backlinks, and genuine engagement from your target audience.</p>
          <div className="infog-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`infog-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="infog-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="infog-faq"><div className="infog-faq-in">
          <span className="infog-ey2">Got Questions?</span><h2 className="infog-ttl">Infographics Design FAQs</h2>
          <p className="infog-desc">Everything you need to know about our infographic design services.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`infog-fitem${openFaq===i?' open':''}`}><button className="infog-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="infog-ficon">{openFaq===i?'−':'+'}</span></button><div className="infog-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="infog-cta"><div className="infog-cta-o1"/><div className="infog-cta-o2"/>
          <div className="infog-cta-in">
            <span className="infog-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Turn Your Data into Shareable Content?</span>
            <h2 className="infog-cta-t">Get Your Infographic Designed</h2>
            <p className="infog-cta-s">Tell us what data or topic you want to visualise — we&rsquo;ll send you a quote and timeline within 24 hours.</p>
            <div className="infog-cta-btns">
              <Link href="/contact" className="infog-btn-p">Get an Infographic Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/content-copywriting-services" className="infog-btn-s">Content &amp; Copywriting</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
