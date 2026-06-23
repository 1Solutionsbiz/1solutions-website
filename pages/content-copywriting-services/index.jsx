import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Website Copywriting', desc: 'SEO-optimised website copy — homepage, service pages, about pages, and landing pages — written to convert visitors into leads and rank for target keywords without reading like it was written for an algorithm.' },
  { n: '02', title: 'Blog & Article Writing', desc: 'Long-form blog posts and articles — researched, well-structured, and written to demonstrate expertise. Covering pillar content, cluster articles, how-to guides, listicles, thought leadership, and news commentary.' },
  { n: '03', title: 'SEO Content Writing', desc: 'Keyword-targeted content built on search intent analysis — informational content for organic traffic, commercial content for lead generation, and transactional content for product and service pages.' },
  { n: '04', title: 'Email Copywriting', desc: 'Email sequences and campaigns — welcome flows, nurture sequences, promotional campaigns, and re-engagement emails — written to maximise open rates, click-through rates, and conversions.' },
  { n: '05', title: 'Social Media Copywriting', desc: 'Platform-specific social copy for LinkedIn, Facebook, Instagram, X, and TikTok — posts, captions, ad copy, and campaign messaging tailored to each platform\'s audience and content norms.' },
  { n: '06', title: 'Ad Copywriting', desc: 'PPC and paid social ad copy — Google Search ads, Display ads, Facebook and Instagram ads, LinkedIn Sponsored Content — concise, benefit-led copy tested across multiple variants for continuous improvement.' },
  { n: '07', title: 'Product Descriptions', desc: 'Ecommerce product descriptions that balance SEO keyword targeting with persuasive benefit-led copy — at scale across large catalogues, or high-impact copy for hero products and category pages.' },
  { n: '08', title: 'Brand & Sales Copywriting', desc: 'Brand voice development, sales pages, case studies, white papers, and lead magnets — deeper copy projects that require editorial expertise, strategic narrative, and audience-specific positioning.' },
];

const TYPES = ['Website Copy', 'Blog Articles', 'SEO Content', 'Email Sequences', 'Ad Copy', 'Product Descriptions', 'LinkedIn Content', 'Press Releases', 'Case Studies', 'White Papers', 'Social Captions', 'Sales Pages'];

const PROCESS = [
  { step: '01', title: 'Brief & Discovery', desc: 'Understanding your audience, brand voice, key messages, SEO targets, and the specific purpose of each content piece — before a single word is written.' },
  { step: '02', title: 'Research & Keyword Analysis', desc: 'Audience research, competitor content analysis, and keyword research for SEO content — ensuring the content strategy is grounded in what your audience is actually searching for.' },
  { step: '03', title: 'Content Outline', desc: 'Structured outline for longer content — headings, subheadings, key points, and sources — shared for approval before full draft writing begins.' },
  { step: '04', title: 'Draft Writing', desc: 'Full draft written to agreed brief — applying brand voice, SEO requirements, word count, and conversion intent specified in the brief.' },
  { step: '05', title: 'Review & Revisions', desc: '1 to 2 revision rounds per content piece — incorporating your feedback on tone, accuracy, emphasis, and messaging until the content is right.' },
  { step: '06', title: 'Delivery & Optimisation', desc: 'Final content delivered in your preferred format — Google Doc, HTML, CMS-ready — with meta titles, descriptions, and any internal linking recommendations included.' },
];

const WHY = [
  { title: 'Writers With Industry Depth', desc: 'We do not assign a generalist writer to every brief. Complex sectors — SaaS, finance, legal, healthcare, construction — are matched to writers with domain knowledge. The difference shows in the accuracy and authority of the content.' },
  { title: 'SEO and Editorial Combined', desc: 'Great copywriting that does not rank is a wasted investment. Every piece of written content is produced with search intent alignment, keyword targeting, and on-page SEO best practices built in from the brief stage.' },
  { title: 'Brand Voice Consistency', desc: 'Before we write a word for a new client, we map their brand voice — tone, vocabulary, formality level, personality — and apply it consistently across every piece. Content should sound like you, not like a content mill.' },
  { title: 'Conversion-Led Thinking', desc: 'Content has a job to do. Whether it is ranking on Google, converting a landing page visitor, or nurturing a lead through email — we write with the end goal in mind, not just word count.' },
  { title: 'Scalable Content Production', desc: 'Whether you need 2 blog posts per month or 200 product descriptions per week, we scale copy production to your volume requirements — with consistent quality and editorial oversight at every tier.' },
  { title: 'Transparent Delivery & Tracking', desc: 'Every project comes with agreed deadlines, a shared content calendar for ongoing work, and clear revision rounds. No chasing, no missed deadlines, no vague timelines — just reliable content delivery.' },
];

const FAQS = [
  { q: 'What types of content do you write?', a: 'We write: website copy (homepages, service and product pages, about pages, landing pages); blog posts and long-form articles (SEO-focused, thought leadership, how-to, listicles); email copy (welcome sequences, nurture flows, promotional campaigns); ad copy (Google Ads, Facebook and Instagram ads, LinkedIn Sponsored Content); social media copy (post captions, campaign content, LinkedIn articles); product descriptions (ecommerce catalogues, hero products, category pages); and brand and sales copy (sales pages, case studies, white papers, brand guidelines, lead magnets). If you need written words for a commercial purpose, we can probably write them.' },
  { q: 'Do you write SEO content?', a: 'Yes. SEO copywriting is one of our core services. We combine keyword research (search intent, volume, competition) with editorial writing quality — creating content that ranks in Google and keeps readers engaged enough to convert. Our SEO content process starts with a content brief that identifies primary and secondary keywords, the correct search intent (informational, commercial, transactional), the ideal content format and length, and the on-page optimisation requirements. The final content is optimised for both the target keywords and the quality signals that modern Google rewards: depth, expertise, structure, and original analysis.' },
  { q: 'How long does it take to write website copy?', a: 'Timelines depend on the volume and complexity of the copy required: A single web page (500 to 800 words) typically takes 2 to 4 business days from brief sign-off. A 10-page website — homepage, about, 5 service pages, blog, contact, T&Cs — typically takes 2 to 3 weeks. A full ecommerce catalogue (100+ product descriptions) depends on brief completeness and review turnaround — typically 1 to 3 weeks. We agree specific deadlines at the start of each project and meet them. Rush delivery (1 to 2 business day turnaround) is available for time-critical projects.' },
  { q: 'Will the content be original and not AI-generated?', a: 'Yes — all content we deliver is written by human copywriters and editors. We do not use AI content generators as a content delivery mechanism. Generative AI tools are used internally for research assistance, outline brainstorming, and competitive analysis — but every piece of content delivered to a client is written, edited, and quality-assured by an experienced human writer. This matters for brand trust, for E-E-A-T signals in SEO, and for content that actually represents your brand voice accurately.' },
  { q: 'How do you match a writer to my industry?', a: 'During onboarding, we assess your sector, content complexity, required tone, and target audience. For generalist consumer content — retail, hospitality, lifestyle — our copywriting team handles briefs flexibly. For technical, regulated, or specialist sectors — SaaS, fintech, healthcare, legal, engineering, B2B enterprise — we match briefs to writers with verifiable experience in your sector. If your brief requires specific technical depth (medical device documentation, financial services compliance copy, developer-facing content), we confirm writer suitability before the project starts.' },
  { q: 'Can you write content in our brand voice?', a: 'Yes. Brand voice matching is standard practice for any ongoing copywriting engagement. In the onboarding process, we produce a brand voice document from your existing content — identifying tone (formal or conversational), vocabulary preferences, things you always say, things you never say, and the personality you want to project. For new brands without existing content, we build the brand voice from a brief and 1 to 2 example pieces. All subsequent content is written to the agreed voice — and reviewed by our editorial team to ensure consistency before delivery.' },
  { q: 'Do you provide content strategy as well as writing?', a: 'Yes. For clients who need both strategy and execution, we offer a content strategy service alongside copywriting: content audit (reviewing existing content for gaps and improvement opportunities); keyword and topic research (identifying what your audience is searching for); content calendar development (planning what to publish, when, and in what format); content brief creation (structured briefs for each piece, whether written by us or in-house); and performance analysis (reviewing what content is ranking and converting). This full-service approach typically suits businesses scaling from ad hoc content to a systematic content marketing programme.' },
  { q: 'How are copywriting projects priced?', a: 'Copywriting is priced per project or on a monthly retainer, depending on volume and consistency requirements. Per-project pricing is based on word count, research complexity, revision rounds, and turnaround time. Monthly retainer pricing is available for businesses with ongoing content needs — providing a fixed volume of content per month at a reduced per-piece rate compared to ad hoc commissioning. We provide a detailed quote after receiving a brief — so please share your content requirements and we can confirm pricing and timelines.' },
];

const STATS = [
  { label: 'Content Pieces Produced', val: '15,000+' },
  { label: 'Industries Covered', val: '40+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Client Retention', val: '93%' },
];

export default function ContentCopywritingServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/digital-marketing-services/' }, { '@type': 'ListItem', position: 3, name: 'Content & Copywriting', item: 'https://www.1solutions.biz/content-copywriting-services/' }] }, { '@type': 'Service', name: 'Content & Copywriting Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Copywriting', url: 'https://www.1solutions.biz/content-copywriting-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Content & Copywriting Services | SEO Content Writing Agency | 1Solutions</title>
        <meta name="description" content="Content writing and copywriting services — website copy, SEO blog content, email sequences, ad copy, and product descriptions. Human-written content that ranks and converts." />
        <meta name="keywords" content="content writing services, copywriting services, seo content writing, website copywriting, blog writing services, content marketing agency, copywriting agency" />
        <link rel="canonical" href="https://www.1solutions.biz/content-copywriting-services/" />
        <meta property="og:title" content="Content & Copywriting Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/content-copywriting-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .ccw-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .ccw-page *,.ccw-page *::before,.ccw-page *::after{box-sizing:border-box}
          .ccw-hero{background:linear-gradient(135deg,#f8fafc 0%,#e2e8f0 25%,#cbd5e1 60%,#f8fafc 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .ccw-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(51,65,85,0.10) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .ccw-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(30,41,59,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .ccw-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .ccw-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .ccw-bc a{color:#6b7280;text-decoration:none}.ccw-bc a:hover{color:#334155}.ccw-bc span{color:#d1d5db}
          .ccw-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(51,65,85,0.08);border:1px solid rgba(51,65,85,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#334155;margin-bottom:28px}
          .ccw-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#0F172A 0%,#334155 50%,#1E293B 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .ccw-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .ccw-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .ccw-btn-p{display:inline-flex;align-items:center;gap:8px;background:#334155;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(51,65,85,0.28)}
          .ccw-btn-p:hover{background:#1E293B;box-shadow:0 8px 32px rgba(51,65,85,0.38);transform:translateY(-2px)}
          .ccw-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .ccw-btn-s:hover{border-color:#334155;color:#334155;transform:translateY(-2px)}
          .ccw-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(51,65,85,0.07)}
          .ccw-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(51,65,85,0.08)}.ccw-stat:last-child{border-right:none}
          .ccw-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .ccw-stat-v{font-size:1.6rem;font-weight:900;color:#334155;letter-spacing:-0.5px}
          .ccw-svc{background:#f8fafd;padding:80px 40px}.ccw-svc-in{max-width:1280px;margin:0 auto}
          .ccw-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#334155;margin-bottom:10px;display:block}
          .ccw-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F172A 0%,#334155 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .ccw-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .ccw-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .ccw-card{background:linear-gradient(135deg,rgba(248,250,252,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(226,232,240,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(51,65,85,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .ccw-card.visible{opacity:1;transform:translateY(0)}.ccw-card:hover{transform:translateY(-6px);border-color:rgba(51,65,85,0.22);box-shadow:0 16px 48px rgba(51,65,85,0.09)}
          .ccw-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#334155;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .ccw-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .ccw-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .ccw-types{background:linear-gradient(135deg,#0F172A 0%,#334155 100%);padding:60px 40px}
          .ccw-types-in{max-width:1280px;margin:0 auto;text-align:center}
          .ccw-types h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .ccw-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .ccw-pill{background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.18);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .ccw-proc{background:linear-gradient(135deg,#f8fafc 0%,#f8fafc 50%,#e2e8f0 100%);padding:80px 40px}
          .ccw-proc-in{max-width:900px;margin:0 auto}
          .ccw-steps{display:flex;flex-direction:column;margin-top:44px}
          .ccw-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(51,65,85,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .ccw-step:last-child{border-bottom:none}.ccw-step.visible{opacity:1;transform:translateX(0)}
          .ccw-snum{font-size:3rem;font-weight:900;color:rgba(51,65,85,0.15);line-height:1;letter-spacing:-2px}
          .ccw-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .ccw-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .ccw-why{background:#fff;padding:80px 40px}.ccw-why-in{max-width:1280px;margin:0 auto}
          .ccw-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .ccw-wcard{background:linear-gradient(135deg,#f8fafc 0%,#fff 60%,#e2e8f0 100%);border:1px solid rgba(51,65,85,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .ccw-wcard.visible{opacity:1;transform:translateY(0)}.ccw-wcard:hover{border-color:rgba(51,65,85,0.20);box-shadow:0 8px 32px rgba(51,65,85,0.07)}
          .ccw-dot{width:8px;height:8px;border-radius:50%;background:#334155;margin-bottom:16px}
          .ccw-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .ccw-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .ccw-faq{background:#f8fafd;padding:80px 40px}.ccw-faq-in{max-width:860px;margin:0 auto}
          .ccw-fitem{border-bottom:1px solid #e5e7eb}
          .ccw-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .ccw-fq:hover{color:#334155}
          .ccw-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .ccw-fitem.open .ccw-ficon{border-color:#334155;color:#334155;background:rgba(51,65,85,0.06)}
          .ccw-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .ccw-fitem.open .ccw-fa{max-height:500px;padding-bottom:22px}
          .ccw-cta{background:linear-gradient(135deg,rgba(51,65,85,0.05) 0%,rgba(255,255,255,0.80) 40%,rgba(15,23,42,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .ccw-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(51,65,85,0.08) 0%,transparent 70%);pointer-events:none}
          .ccw-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(15,23,42,0.06) 0%,transparent 70%);pointer-events:none}
          .ccw-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .ccw-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#0F172A 0%,#334155 50%,#1E293B 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .ccw-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .ccw-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.ccw-grid{grid-template-columns:repeat(2,1fr)}.ccw-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.ccw-hero,.ccw-svc,.ccw-types,.ccw-proc,.ccw-why,.ccw-faq,.ccw-cta{padding:60px 24px}.ccw-hero{padding-top:60px;padding-bottom:0}.ccw-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.ccw-stat:nth-child(2){border-right:none}.ccw-grid{grid-template-columns:1fr}.ccw-why-grid{grid-template-columns:1fr}.ccw-step{grid-template-columns:56px 1fr}.ccw-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="ccw-page">
        <section className="ccw-hero"><div className="ccw-o1"/><div className="ccw-o2"/>
          <div className="ccw-in">
            <nav className="ccw-bc"><Link href="/">Home</Link><span>/</span><Link href="/digital-marketing-services">Digital Marketing</Link><span>/</span><span style={{color:'#334155'}}>Content &amp; Copywriting</span></nav>
            <span className="ccw-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#334155',display:'inline-block'}}/> Website · Blog · Email · Ads · SEO</span>
            <h1 className="ccw-h1">Content &amp; Copywriting Services — Words That Rank, Engage, and Convert</h1>
            <p className="ccw-sub">Human-written website copy, SEO blog content, email sequences, ad copy, and product descriptions — all produced by specialist copywriters who understand your audience, your sector, and your goals.</p>
            <div className="ccw-btns">
              <Link href="/contact-us" className="ccw-btn-p">Get a Copywriting Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-services-company" className="ccw-btn-s">SEO Services</Link>
            </div>
            <div className="ccw-stats">{STATS.map(s => <div key={s.label} className="ccw-stat"><div className="ccw-stat-l">{s.label}</div><div className="ccw-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="ccw-svc"><div className="ccw-svc-in">
          <span className="ccw-ey2">What We Write</span><h2 className="ccw-ttl">Content &amp; Copywriting Services</h2>
          <p className="ccw-desc">Website copy, SEO content, emails, ads, and product descriptions — all written by specialists with industry depth and editorial expertise.</p>
          <div className="ccw-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`ccw-card${visibleCards.includes(i)?' visible':''}`}><div className="ccw-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="ccw-types"><div className="ccw-types-in">
          <h2>Content Types We Produce</h2>
          <div className="ccw-pills">{TYPES.map(c => <span key={c} className="ccw-pill">{c}</span>)}</div>
        </div></section>
        <section className="ccw-proc"><div className="ccw-proc-in">
          <span className="ccw-ey2">How We Work</span><h2 className="ccw-ttl">Our Copywriting Process</h2>
          <p className="ccw-desc">Brief to delivery — a structured process that ensures every piece of content is strategically grounded, brand-consistent, and meets its brief.</p>
          <div className="ccw-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`ccw-step${visibleSteps.includes(i)?' visible':''}`}><div className="ccw-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="ccw-why"><div className="ccw-why-in">
          <span className="ccw-ey2">Why 1Solutions</span><h2 className="ccw-ttl">Specialist Writers, SEO Strategy, Brand Voice — All Included</h2>
          <p className="ccw-desc">Content quality is the difference between content that ranks and converts and content that sits unread. We bring specialist industry knowledge, SEO expertise, and editorial rigour to every brief.</p>
          <div className="ccw-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`ccw-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="ccw-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="ccw-faq"><div className="ccw-faq-in">
          <span className="ccw-ey2">Got Questions?</span><h2 className="ccw-ttl">Copywriting Services FAQs</h2>
          <p className="ccw-desc">Answers to the most common questions about our content writing and copywriting services.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`ccw-fitem${openFaq===i?' open':''}`}><button className="ccw-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="ccw-ficon">{openFaq===i?'−':'+'}</span></button><div className="ccw-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="ccw-cta"><div className="ccw-cta-o1"/><div className="ccw-cta-o2"/>
          <div className="ccw-cta-in">
            <span className="ccw-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Commission Content That Performs?</span>
            <h2 className="ccw-cta-t">Start Your Content &amp; Copywriting Project</h2>
            <p className="ccw-cta-s">Share your content brief — type of content, audience, goals, and any examples you like — and we&rsquo;ll confirm writer match, timeline, and pricing within one business day.</p>
            <div className="ccw-cta-btns">
              <Link href="/contact-us" className="ccw-btn-p">Get a Copywriting Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/infographics-design" className="ccw-btn-s">Infographics Design</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
