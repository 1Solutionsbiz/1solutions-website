import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'GEO Content Restructuring', desc: 'Restructure existing content for AI citation — clear entity definitions, authoritative source statements, factual density, and structured claim formats that LLMs prefer to cite.' },
  { n: '02', title: 'Structured Data for AI', desc: 'Schema markup (FAQ, HowTo, Article, Speakable) that signals content structure to AI engines. Properly marked-up content gets parsed and cited more reliably by generative models.' },
  { n: '03', title: 'E-E-A-T Authority Building', desc: 'Build the expertise, experience, authoritativeness, and trustworthiness signals that both Google AI Overviews and third-party LLMs (ChatGPT, Claude, Perplexity) use to evaluate source credibility.' },
  { n: '04', title: 'AI Visibility Auditing', desc: 'Test how your brand and content appears across ChatGPT, Perplexity, Google AI Overviews, Gemini, and Bing Copilot — with a gap analysis identifying where competitors are cited instead of you.' },
  { n: '05', title: 'Topical Authority Mapping', desc: 'Build comprehensive topic coverage that positions your site as the authoritative source on your subject area — the depth and breadth of coverage LLMs favour when selecting citation sources.' },
  { n: '06', title: 'Cited Source Strategy', desc: 'Identify the content formats, claim types, and authority signals that make sources most likely to be cited in AI-generated answers — and build content optimised specifically for citation.' },
  { n: '07', title: 'Brand Mention Monitoring', desc: 'Track your brand\'s appearance in AI-generated responses across ChatGPT, Perplexity, Google SGE, and Gemini — monitoring citation frequency, sentiment, and accuracy.' },
  { n: '08', title: 'GEO Reporting & Analytics', desc: 'Monthly reporting on AI visibility metrics — citation appearances, AI Overview presence, brand mention sentiment, and Perplexity citation frequency alongside traditional search metrics.' },
];

const PLATFORMS = ['Google AI Overviews', 'ChatGPT Search', 'Perplexity AI', 'Gemini', 'Bing Copilot', 'Claude AI', 'Llama', 'Grok'];

const PROCESS = [
  { step: '01', title: 'AI Visibility Audit', desc: 'Test your brand and content across major AI engines. Identify where you appear, where competitors appear instead, and what content types are being cited.' },
  { step: '02', title: 'Content Gap Analysis', desc: 'Map your content against the questions and topics where AI engines are citing competitors — and identify the highest-value gaps to address first.' },
  { step: '03', title: 'Content Optimisation', desc: 'Restructure existing content for citation-friendliness — clearer claims, better entity definitions, authoritative sourcing, and E-E-A-T signals.' },
  { step: '04', title: 'New Content Creation', desc: 'Create comprehensive, citation-worthy content on your most important topics — written for both human readers and AI engine consumption.' },
  { step: '05', title: 'Authority & Link Building', desc: 'Build the third-party credibility signals that AI engines use to evaluate source authority — editorial coverage, expert citations, and domain authority.' },
  { step: '06', title: 'Monitor & Report', desc: 'Monthly AI visibility reporting — citation frequency across platforms, brand mention tracking, and AI presence compared to traditional SEO metrics.' },
];

const WHY = [
  { title: 'Early Mover Expertise', desc: 'We have been studying and testing GEO since Google AI Overviews launched. Our clients are building citation presence while competitors are still ignoring the shift.' },
  { title: 'Multi-Platform Approach', desc: 'GEO is not just Google. We optimise for citation across ChatGPT, Perplexity, Gemini, Bing Copilot, and emerging AI search engines simultaneously.' },
  { title: 'SEO + GEO Combined', desc: 'GEO works best alongside traditional SEO — not instead of it. We integrate both strategies so your content performs across keyword searches and AI-generated answers.' },
  { title: 'Measurable Metrics', desc: 'We track concrete AI visibility metrics — citation appearances, AI Overview presence, Perplexity source frequency — so progress is measurable, not theoretical.' },
  { title: 'Content-First Execution', desc: 'GEO requires high-quality, authoritative content — not technical tricks. Our content specialists write citation-worthy material that earns AI mentions through genuine expertise.' },
  { title: 'Transparent Reporting', desc: 'Monthly reports covering AI visibility alongside traditional SEO metrics — giving a complete picture of your brand\'s presence across both search paradigms.' },
];

const FAQS = [
  { q: 'What is Generative Engine Optimisation (GEO)?', a: 'Generative Engine Optimisation (GEO) is the practice of optimising content to appear in AI-generated search responses — Google AI Overviews, ChatGPT Search, Perplexity, Gemini, and similar systems. As AI engines increasingly generate direct answers rather than just listing links, the goal shifts from ranking in position 1 to being cited as a source in AI-generated responses. GEO focuses on content structure, E-E-A-T signals, topical authority, and factual density that make AI models prefer to cite your content.' },
  { q: 'How is GEO different from traditional SEO?', a: 'Traditional SEO optimises for keyword rankings in blue-link search results. GEO optimises for citation in AI-generated answers. The two overlap significantly — high-quality, authoritative content with strong E-E-A-T signals performs well in both — but GEO requires additional focus on: structured information (AI models prefer clearly formatted facts over narrative prose); comprehensive topic coverage (AI engines prefer sources that cover a topic thoroughly); factual accuracy (AI models use credibility signals to select sources); and entity clarity (clear definitions of who you are and what you do help LLMs reference you accurately).' },
  { q: 'Can I measure GEO performance?', a: 'Yes. GEO measurement is still evolving but key metrics include: Google Search Console\'s AI Overview impressions and clicks; manual and automated testing of brand/topic queries across ChatGPT, Perplexity, and Gemini; third-party tools tracking AI citation frequency (Authoritas, BrightEdge AI Visibility); and brand mention monitoring across AI platforms. We provide monthly GEO visibility reports alongside traditional SEO metrics so you can see the combined picture.' },
  { q: 'Does Google AI Overviews affect traditional organic traffic?', a: 'Yes. Google AI Overviews appear above traditional blue-link results and generate their own clicks — some users click source links within the AI Overview rather than scrolling to traditional results. Studies show that appearing as a cited source in AI Overviews can drive incremental clicks even while the presence of AI Overviews reduces clicks to traditional results. Being a cited source is the goal — not just appearing in traditional results below the AI Overview.' },
  { q: 'What types of content are most likely to be cited by AI engines?', a: 'AI engines favour content that is: factually dense (specific claims, statistics, named entities); clearly structured (headers, lists, tables that make information easy to parse); from authoritative sources (strong domain authority, expert authorship, citation by other credible sources); comprehensive (covers a topic from multiple angles rather than superficially); and freshly updated (recency signals matter particularly for rapidly evolving topics). Long-form guides, original research, and definition/explanation content tend to attract more AI citations than product pages or thin promotional content.' },
  { q: 'Should I optimise for Perplexity, ChatGPT, or Google AI Overviews first?', a: 'Google AI Overviews first — they have by far the largest search volume reach and are triggered for a wide range of commercial and informational queries. Perplexity is the fastest-growing AI search engine and particularly relevant for research-oriented industries. ChatGPT Search is growing rapidly and particularly important for brand searches. We optimise for all three simultaneously because the content improvements that earn Google AI Overview citations also improve performance on other AI platforms.' },
  { q: 'Is GEO replacing SEO?', a: 'No. GEO is extending SEO, not replacing it. Traditional keyword rankings remain valuable for transactional and local queries where AI Overviews are rarely shown. E-E-A-T signals, quality content, and authoritative backlinks — the foundations of good SEO — are also the foundations of good GEO. The most effective strategy combines both: maintain strong traditional SEO rankings while building the content depth and authority signals that earn AI citations.' },
  { q: 'How long does it take to see GEO results?', a: 'AI visibility improvements are typically faster to observe than traditional SEO ranking movements. New or restructured content can begin appearing in Google AI Overviews within 2 to 4 weeks of indexation. Perplexity citation frequency improves as content earns more inbound links and social signals. Full GEO impact — consistent citation across multiple AI platforms for priority topics — typically takes 3 to 6 months of sustained content and authority building.' },
];

const STATS = [
  { label: 'AI Platforms Monitored', val: '8+' },
  { label: 'GEO Clients', val: '80+' },
  { label: 'AI Citations Tracked', val: '5K+' },
  { label: 'Years SEO Experience', val: '15+' },
];

export default function GenerativeEngineOptimizationServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);

  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);

  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Generative Engine Optimisation', item: 'https://www.1solutions.biz/generative-engine-optimization-services/' }] }, { '@type': 'Service', name: 'Generative Engine Optimisation Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Generative Engine Optimisation', url: 'https://www.1solutions.biz/generative-engine-optimization-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };

  return (
    <>
      <Head>
        <title>Generative Engine Optimisation (GEO) Services | AI Search Visibility | 1Solutions</title>
        <meta name="description" content="Generative Engine Optimisation (GEO) services — optimise your content for Google AI Overviews, ChatGPT, Perplexity, and Gemini citations. Build AI search visibility alongside traditional SEO." />
        <meta name="keywords" content="generative engine optimization services, GEO services, AI search optimization, google ai overview optimization, ai visibility services, llm seo" />
        <link rel="canonical" href="https://www.1solutions.biz/generative-engine-optimization-services/" />
        <meta property="og:title" content="Generative Engine Optimisation (GEO) Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/generative-engine-optimization-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .geo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .geo-page *,.geo-page *::before,.geo-page *::after{box-sizing:border-box}
          .geo-hero{background:linear-gradient(135deg,#eef2ff 0%,#e0e7ff 25%,#ede9fe 60%,#f5f3ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .geo-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(67,56,202,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .geo-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(30,27,75,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .geo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .geo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .geo-bc a{color:#6b7280;text-decoration:none}.geo-bc a:hover{color:#4338CA}.geo-bc span{color:#d1d5db}
          .geo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(67,56,202,0.08);border:1px solid rgba(67,56,202,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#3730A3;margin-bottom:28px}
          .geo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#1E1B4B 0%,#4338CA 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .geo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .geo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .geo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#4338CA;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(67,56,202,0.28)}
          .geo-btn-p:hover{background:#3730A3;box-shadow:0 8px 32px rgba(67,56,202,0.38);transform:translateY(-2px)}
          .geo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .geo-btn-s:hover{border-color:#4338CA;color:#4338CA;transform:translateY(-2px)}
          .geo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(67,56,202,0.07)}
          .geo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(67,56,202,0.08)}.geo-stat:last-child{border-right:none}
          .geo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .geo-stat-v{font-size:1.6rem;font-weight:900;color:#4338CA;letter-spacing:-0.5px}
          .geo-svc{background:#f8fafd;padding:80px 40px}.geo-svc-in{max-width:1280px;margin:0 auto}
          .geo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#4338CA;margin-bottom:10px;display:block}
          .geo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#1E1B4B 0%,#4338CA 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .geo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .geo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .geo-card{background:linear-gradient(135deg,rgba(238,242,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(224,231,255,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(67,56,202,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .geo-card.visible{opacity:1;transform:translateY(0)}.geo-card:hover{transform:translateY(-6px);border-color:rgba(67,56,202,0.22);box-shadow:0 16px 48px rgba(67,56,202,0.09)}
          .geo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#4338CA;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .geo-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .geo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .geo-plat{background:linear-gradient(135deg,#1E1B4B 0%,#4338CA 100%);padding:60px 40px}
          .geo-plat-in{max-width:1280px;margin:0 auto;text-align:center}
          .geo-plat h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .geo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .geo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .geo-proc{background:linear-gradient(135deg,#eef2ff 0%,#f5f3ff 50%,#e0e7ff 100%);padding:80px 40px}
          .geo-proc-in{max-width:900px;margin:0 auto}
          .geo-steps{display:flex;flex-direction:column;margin-top:44px}
          .geo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(67,56,202,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .geo-step:last-child{border-bottom:none}.geo-step.visible{opacity:1;transform:translateX(0)}
          .geo-snum{font-size:3rem;font-weight:900;color:rgba(67,56,202,0.15);line-height:1;letter-spacing:-2px}
          .geo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .geo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .geo-why{background:#fff;padding:80px 40px}.geo-why-in{max-width:1280px;margin:0 auto}
          .geo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .geo-wcard{background:linear-gradient(135deg,#eef2ff 0%,#fff 60%,#e0e7ff 100%);border:1px solid rgba(67,56,202,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .geo-wcard.visible{opacity:1;transform:translateY(0)}.geo-wcard:hover{border-color:rgba(67,56,202,0.20);box-shadow:0 8px 32px rgba(67,56,202,0.07)}
          .geo-dot{width:8px;height:8px;border-radius:50%;background:#4338CA;margin-bottom:16px}
          .geo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .geo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .geo-faq{background:#f8fafd;padding:80px 40px}.geo-faq-in{max-width:860px;margin:0 auto}
          .geo-fitem{border-bottom:1px solid #e5e7eb}
          .geo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .geo-fq:hover{color:#4338CA}
          .geo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .geo-fitem.open .geo-ficon{border-color:#4338CA;color:#4338CA;background:rgba(67,56,202,0.06)}
          .geo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .geo-fitem.open .geo-fa{max-height:500px;padding-bottom:22px}
          .geo-cta{background:linear-gradient(135deg,rgba(67,56,202,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(30,27,75,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .geo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(67,56,202,0.10) 0%,transparent 70%);pointer-events:none}
          .geo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(30,27,75,0.08) 0%,transparent 70%);pointer-events:none}
          .geo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .geo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#1E1B4B 0%,#4338CA 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .geo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .geo-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.geo-grid{grid-template-columns:repeat(2,1fr)}.geo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.geo-hero,.geo-svc,.geo-plat,.geo-proc,.geo-why,.geo-faq,.geo-cta{padding:60px 24px}.geo-hero{padding-top:60px;padding-bottom:0}.geo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.geo-stat:nth-child(2){border-right:none}.geo-grid{grid-template-columns:1fr}.geo-why-grid{grid-template-columns:1fr}.geo-step{grid-template-columns:56px 1fr}.geo-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="geo-page">
        <section className="geo-hero"><div className="geo-o1"/><div className="geo-o2"/>
          <div className="geo-in">
            <nav className="geo-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO Services</Link><span>/</span><span style={{color:'#4338CA'}}>Generative Engine Optimisation</span></nav>
            <span className="geo-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#4338CA',display:'inline-block'}}/> Google AI Overviews · ChatGPT · Perplexity</span>
            <h1 className="geo-h1">Generative Engine Optimisation — Get Cited in AI Search Answers</h1>
            <p className="geo-sub">Optimise your content for citation in Google AI Overviews, ChatGPT Search, Perplexity, and Gemini — the new frontier of search visibility where being cited replaces being ranked.</p>
            <div className="geo-btns">
              <Link href="/contact" className="geo-btn-p">Start Your GEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/answer-engine-optimization-services" className="geo-btn-s">Answer Engine Optimisation</Link>
            </div>
            <div className="geo-stats">{STATS.map(s => <div key={s.label} className="geo-stat"><div className="geo-stat-l">{s.label}</div><div className="geo-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="geo-svc"><div className="geo-svc-in">
          <span className="geo-ey2">What We Do</span><h2 className="geo-ttl">Generative Engine Optimisation Services</h2>
          <p className="geo-desc">Content restructuring, E-E-A-T authority building, and AI visibility monitoring — optimising your presence across every major AI search platform.</p>
          <div className="geo-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`geo-card${visibleCards.includes(i)?' visible':''}`}><div className="geo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="geo-plat"><div className="geo-plat-in">
          <h2>AI Platforms We Optimise For</h2>
          <div className="geo-pills">{PLATFORMS.map(c => <span key={c} className="geo-pill">{c}</span>)}</div>
        </div></section>
        <section className="geo-proc"><div className="geo-proc-in">
          <span className="geo-ey2">How We Work</span><h2 className="geo-ttl">Our GEO Process</h2>
          <p className="geo-desc">Audit AI visibility, identify citation gaps, optimise content for citation, build authority — and track progress monthly across all major AI search platforms.</p>
          <div className="geo-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`geo-step${visibleSteps.includes(i)?' visible':''}`}><div className="geo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="geo-why"><div className="geo-why-in">
          <span className="geo-ey2">Why 1Solutions</span><h2 className="geo-ttl">GEO Experts — SEO Foundation Included</h2>
          <p className="geo-desc">We integrate GEO with your existing SEO strategy — not as a replacement, but as the natural evolution that keeps your brand visible as search changes.</p>
          <div className="geo-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`geo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="geo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="geo-faq"><div className="geo-faq-in">
          <span className="geo-ey2">Got Questions?</span><h2 className="geo-ttl">GEO FAQs</h2>
          <p className="geo-desc">Everything you need to know about Generative Engine Optimisation and AI search visibility.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`geo-fitem${openFaq===i?' open':''}`}><button className="geo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="geo-ficon">{openFaq===i?'−':'+'}</span></button><div className="geo-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="geo-cta"><div className="geo-cta-o1"/><div className="geo-cta-o2"/>
          <div className="geo-cta-in">
            <span className="geo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Get Cited in AI Search?</span>
            <h2 className="geo-cta-t">Start Your Generative Engine Optimisation Strategy</h2>
            <p className="geo-cta-s">We&rsquo;ll audit your current AI visibility, identify where competitors are cited instead of you, and build a content strategy that earns citations across Google, ChatGPT, and Perplexity.</p>
            <div className="geo-cta-btns">
              <Link href="/contact" className="geo-btn-p">Start GEO Strategy <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-services-company" className="geo-btn-s">SEO Services Overview</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
