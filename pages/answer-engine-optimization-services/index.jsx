import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'AEO Content Audit', desc: 'Audit your existing content for answer-optimised structure — identifying pages that answer high-value questions but are not structured to be selected as featured snippets or direct answers.' },
  { n: '02', title: 'Question Keyword Research', desc: 'Identify the questions your audience is asking — People Also Ask patterns, zero-click query opportunities, and question-format keywords with featured snippet eligibility across your topic areas.' },
  { n: '03', title: 'Featured Snippet Optimisation', desc: 'Structure content for Google\'s featured snippet selection — paragraph snippets, list snippets, table snippets, and definition boxes — formatted precisely to match the answer format Google is selecting.' },
  { n: '04', title: 'People Also Ask (PAA) Targeting', desc: 'Research and target the People Also Ask questions appearing for your highest-value keywords — creating dedicated answer-optimised content that captures these zero-click visibility opportunities.' },
  { n: '05', title: 'FAQ Schema & Structured Data', desc: 'FAQPage, HowTo, Definition, and Q&A schema implementation — structured data that helps Google parse your answers and serve them directly in search results without requiring a click.' },
  { n: '06', title: 'Knowledge Panel Optimisation', desc: 'Brand and entity optimisation for Google Knowledge Panels — Wikidata, Google Business Profile, and structured data signals that help Google understand and surface your entity information accurately.' },
  { n: '07', title: 'Zero-Click Content Strategy', desc: 'Content strategy built around answering intent — not just driving clicks, but building authority and brand visibility in the zero-click search landscape where being the answer is the win.' },
  { n: '08', title: 'AEO Tracking & Reporting', desc: 'Featured snippet position monitoring, PAA box tracking, impressions and zero-click visibility reporting — measuring your presence in answer-engine results alongside traditional ranking metrics.' },
];

const SURFACES = ['Google Featured Snippets', 'People Also Ask', 'Google Knowledge Panel', 'Google AI Overviews', 'Voice Search Results', 'Bing Answer Boxes', 'Rich Results', 'Definition Boxes'];

const PROCESS = [
  { step: '01', title: 'Answer Opportunity Audit', desc: 'Identify the featured snippet and PAA opportunities where you could be appearing — mapped against your existing content and competitor snippet ownership.' },
  { step: '02', title: 'Question Keyword Mapping', desc: 'Map question-format keywords to your content inventory — identifying gaps where new answer content is needed and existing pages that need restructuring.' },
  { step: '03', title: 'Content Restructuring', desc: 'Restructure existing high-potential pages with direct answer formats — question headings, concise paragraph answers, and appropriately formatted lists or tables.' },
  { step: '04', title: 'New Answer Content Creation', desc: 'Create comprehensive FAQ pages, definition content, and how-to guides for the highest-value question opportunities with no current coverage.' },
  { step: '05', title: 'Schema Implementation', desc: 'FAQPage, HowTo, and Speakable schema deployed on all answer-optimised content — validated and monitored via Google Search Console Rich Results.' },
  { step: '06', title: 'Track & Iterate', desc: 'Monthly featured snippet and PAA tracking — monitoring new snippet wins, lost positions, and new opportunities to continuously expand your answer engine presence.' },
];

const WHY = [
  { title: 'Featured Snippet Track Record', desc: 'We have a systematic, tested process for identifying snippet eligibility, formatting content to match what Google selects, and capturing position zero across competitive industries.' },
  { title: 'Integrated with GEO', desc: 'AEO and GEO (Generative Engine Optimisation) are complementary — the content optimised for Google Featured Snippets is also the content most likely to be cited in AI Overviews and ChatGPT. We combine both.' },
  { title: 'Schema Implementation Expertise', desc: 'FAQPage, HowTo, Speakable, and Q&A schema correctly implemented, validated in Google\'s Rich Results Test, and monitored monthly — not just added and forgotten.' },
  { title: 'People Also Ask Specialists', desc: 'PAA boxes are an underutilised AEO opportunity. We research, map, and create content specifically targeting PAA appearances for your most valuable search queries.' },
  { title: 'Content + Technical Combined', desc: 'AEO requires both great content (direct, concise answers) and technical signals (schema, page speed, E-E-A-T). Our teams cover both under one integrated strategy.' },
  { title: 'Measurable Zero-Click Metrics', desc: 'We track featured snippet presence, PAA appearances, and impressions from rich results — making zero-click visibility measurable and reportable alongside traditional ranking data.' },
];

const FAQS = [
  { q: 'What is Answer Engine Optimisation (AEO)?', a: 'Answer Engine Optimisation (AEO) is the practice of optimising content to be selected as the direct answer in Google search results — featured snippets (position zero), People Also Ask boxes, knowledge panels, definition boxes, and rich results that appear above or alongside traditional blue-link rankings. AEO recognises that Google increasingly behaves as an answer engine — providing direct answers rather than just listing links — and optimises for visibility in those answer formats rather than just page rankings.' },
  { q: 'What is the difference between AEO and SEO?', a: 'Traditional SEO focuses on ranking pages in the blue-link search results. AEO focuses on capturing the answer surfaces above those results — featured snippets, People Also Ask, knowledge panels, and rich results. Both share the same foundation (authoritative content, strong E-E-A-T, technical health) but AEO requires specific content structuring: direct answer format in the opening paragraph, question-format headings, appropriately formatted lists and tables, and schema markup that helps Google parse and surface your answer. AEO and SEO are complementary — pages that rank well are also candidates for featured snippets, and capturing snippets improves overall SERP visibility.' },
  { q: 'What is a featured snippet and how do I get one?', a: 'A featured snippet is a box at the top of Google search results (position zero) that displays a direct answer to a query, extracted from a web page. Featured snippets appear in three formats: paragraph (a block of text answering a question), list (numbered or bulleted steps or items), and table (comparative data). To be selected for a featured snippet your page must: already rank on page 1 for the target query; contain a clear, direct answer to the question, ideally in a concise paragraph immediately following a question-format heading; use the appropriate format (ordered list for "how to" steps, unordered list for items, table for comparisons); and have FAQPage or HowTo schema where appropriate. We audit your current rankings, identify featured snippet opportunities, and restructure page content to match the format Google is selecting.' },
  { q: 'How important are People Also Ask boxes for AEO?', a: 'People Also Ask (PAA) boxes are highly valuable for AEO because they: appear for a very wide range of queries (estimated 40%+ of all Google searches); expand infinitely as users click each answer (generating more PAA questions); and capture visibility for longer-tail question queries that may have low traditional search volume but represent high-intent informational queries. PAA appearances generate brand impressions and clicks even at lower volumes, and PAA content is increasingly being cited in AI Overviews. We research PAA questions for your priority keyword clusters and create specifically targeted answer content.' },
  { q: 'Does AEO reduce my click-through rate?', a: 'Featured snippets and other answer surfaces can reduce CTR for individual keywords — if users get their answer directly from the snippet, they may not click through to your site. However, AEO improves total SERP real estate (you can appear both in the featured snippet AND in traditional results for the same query), increases brand awareness from users who see but do not click, and drives higher quality traffic (users who click from a featured snippet have pre-qualified intent). The net effect on traffic depends on query type — informational queries with simple factual answers may see reduced CTR, while commercial or complex informational queries typically see neutral or positive traffic effects from snippet capture.' },
  { q: 'What types of content are best for AEO?', a: 'Content formats that perform best for AEO are: FAQ pages (question-and-answer format matches how Google selects featured snippets); definition content ("what is X" style content targeting definition boxes); how-to guides (step-by-step numbered lists match list featured snippet format); comparison content (tables comparing options match table snippet format); and listicles (best X for Y format matches list snippet selection). Content depth matters — comprehensive topic coverage signals E-E-A-T and makes your content more likely to be selected as the authoritative answer. Pages with shallow coverage are rarely selected as featured snippets.' },
  { q: 'How does schema markup help with AEO?', a: 'Schema markup helps Google understand and parse your content\'s structure — making it more reliably surfaced as a rich result. For AEO specifically: FAQPage schema tells Google which questions and answers to consider for PAA and rich result FAQ features; HowTo schema marks up step-by-step content for HowTo rich results; Speakable schema identifies the sections most appropriate for voice assistant text-to-speech; and Q&A schema marks up community Q&A format content. Schema does not guarantee rich result selection but significantly increases eligibility. We implement, validate, and monitor all AEO-relevant schema types.' },
  { q: 'How do AEO and GEO (Generative Engine Optimisation) relate?', a: 'AEO and GEO are closely related — both focus on being selected as the answer rather than just ranking in a list. The content improvements that earn Google Featured Snippets (clear structure, direct answers, authoritative sourcing, schema markup) are also the content signals that make AI engines like ChatGPT, Perplexity, and Google AI Overviews more likely to cite your content. Investing in AEO builds the content foundation that simultaneously improves performance in both traditional answer surfaces (featured snippets, PAA) and emerging AI answer surfaces (Google AI Overviews, ChatGPT Search). We integrate AEO and GEO strategy so improvements compound across all answer surfaces.' },
];

const STATS = [
  { label: 'Featured Snippets Won', val: '1,400+' },
  { label: 'PAA Appearances Tracked', val: '8,000+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Client Retention', val: '93%' },
];

export default function AnswerEngineOptimizationServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);

  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);

  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Answer Engine Optimisation', item: 'https://www.1solutions.biz/answer-engine-optimization-services/' }] }, { '@type': 'Service', name: 'Answer Engine Optimisation Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Answer Engine Optimisation', url: 'https://www.1solutions.biz/answer-engine-optimization-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };

  return (
    <>
      <Head>
        <title>Answer Engine Optimisation (AEO) Services | Featured Snippets & PAA | 1Solutions</title>
        <meta name="description" content="Answer Engine Optimisation (AEO) services — featured snippet capture, People Also Ask targeting, FAQ schema, and knowledge panel optimisation. Be the answer, not just a result." />
        <meta name="keywords" content="answer engine optimization services, aeo services, featured snippet optimization, people also ask optimization, position zero seo, aeo agency, zero click seo" />
        <link rel="canonical" href="https://www.1solutions.biz/answer-engine-optimization-services/" />
        <meta property="og:title" content="Answer Engine Optimisation Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/answer-engine-optimization-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .aeo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .aeo-page *,.aeo-page *::before,.aeo-page *::after{box-sizing:border-box}
          .aeo-hero{background:linear-gradient(135deg,#f0fdf4 0%,#bbf7d0 25%,#d1fae5 60%,#f0fdf4 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .aeo-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(22,163,74,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .aeo-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(6,78,59,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .aeo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .aeo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .aeo-bc a{color:#6b7280;text-decoration:none}.aeo-bc a:hover{color:#16A34A}.aeo-bc span{color:#d1d5db}
          .aeo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(22,163,74,0.08);border:1px solid rgba(22,163,74,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#15803D;margin-bottom:28px}
          .aeo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#064E3B 0%,#16A34A 50%,#14532D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .aeo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .aeo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .aeo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#16A34A;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(22,163,74,0.28)}
          .aeo-btn-p:hover{background:#15803D;box-shadow:0 8px 32px rgba(22,163,74,0.38);transform:translateY(-2px)}
          .aeo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .aeo-btn-s:hover{border-color:#16A34A;color:#16A34A;transform:translateY(-2px)}
          .aeo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(22,163,74,0.07)}
          .aeo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(22,163,74,0.08)}.aeo-stat:last-child{border-right:none}
          .aeo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .aeo-stat-v{font-size:1.6rem;font-weight:900;color:#16A34A;letter-spacing:-0.5px}
          .aeo-svc{background:#f8fafd;padding:80px 40px}.aeo-svc-in{max-width:1280px;margin:0 auto}
          .aeo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#16A34A;margin-bottom:10px;display:block}
          .aeo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#064E3B 0%,#16A34A 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .aeo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .aeo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .aeo-card{background:linear-gradient(135deg,rgba(240,253,244,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(187,247,208,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(22,163,74,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .aeo-card.visible{opacity:1;transform:translateY(0)}.aeo-card:hover{transform:translateY(-6px);border-color:rgba(22,163,74,0.22);box-shadow:0 16px 48px rgba(22,163,74,0.09)}
          .aeo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#16A34A;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .aeo-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .aeo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .aeo-surf{background:linear-gradient(135deg,#064E3B 0%,#16A34A 100%);padding:60px 40px}
          .aeo-surf-in{max-width:1280px;margin:0 auto;text-align:center}
          .aeo-surf h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .aeo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .aeo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .aeo-proc{background:linear-gradient(135deg,#f0fdf4 0%,#f0fdf4 50%,#bbf7d0 100%);padding:80px 40px}
          .aeo-proc-in{max-width:900px;margin:0 auto}
          .aeo-steps{display:flex;flex-direction:column;margin-top:44px}
          .aeo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(22,163,74,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .aeo-step:last-child{border-bottom:none}.aeo-step.visible{opacity:1;transform:translateX(0)}
          .aeo-snum{font-size:3rem;font-weight:900;color:rgba(22,163,74,0.15);line-height:1;letter-spacing:-2px}
          .aeo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .aeo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .aeo-why{background:#fff;padding:80px 40px}.aeo-why-in{max-width:1280px;margin:0 auto}
          .aeo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .aeo-wcard{background:linear-gradient(135deg,#f0fdf4 0%,#fff 60%,#bbf7d0 100%);border:1px solid rgba(22,163,74,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .aeo-wcard.visible{opacity:1;transform:translateY(0)}.aeo-wcard:hover{border-color:rgba(22,163,74,0.20);box-shadow:0 8px 32px rgba(22,163,74,0.07)}
          .aeo-dot{width:8px;height:8px;border-radius:50%;background:#16A34A;margin-bottom:16px}
          .aeo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .aeo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .aeo-faq{background:#f8fafd;padding:80px 40px}.aeo-faq-in{max-width:860px;margin:0 auto}
          .aeo-fitem{border-bottom:1px solid #e5e7eb}
          .aeo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .aeo-fq:hover{color:#16A34A}
          .aeo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .aeo-fitem.open .aeo-ficon{border-color:#16A34A;color:#16A34A;background:rgba(22,163,74,0.06)}
          .aeo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .aeo-fitem.open .aeo-fa{max-height:500px;padding-bottom:22px}
          .aeo-cta{background:linear-gradient(135deg,rgba(22,163,74,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(6,78,59,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .aeo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(22,163,74,0.10) 0%,transparent 70%);pointer-events:none}
          .aeo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(6,78,59,0.08) 0%,transparent 70%);pointer-events:none}
          .aeo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .aeo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#064E3B 0%,#16A34A 50%,#14532D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .aeo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .aeo-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.aeo-grid{grid-template-columns:repeat(2,1fr)}.aeo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.aeo-hero,.aeo-svc,.aeo-surf,.aeo-proc,.aeo-why,.aeo-faq,.aeo-cta{padding:60px 24px}.aeo-hero{padding-top:60px;padding-bottom:0}.aeo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.aeo-stat:nth-child(2){border-right:none}.aeo-grid{grid-template-columns:1fr}.aeo-why-grid{grid-template-columns:1fr}.aeo-step{grid-template-columns:56px 1fr}.aeo-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="aeo-page">
        <section className="aeo-hero"><div className="aeo-o1"/><div className="aeo-o2"/>
          <div className="aeo-in">
            <nav className="aeo-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO Services</Link><span>/</span><span style={{color:'#16A34A'}}>Answer Engine Optimisation</span></nav>
            <span className="aeo-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#16A34A',display:'inline-block'}}/> Featured Snippets · People Also Ask · Position Zero</span>
            <h1 className="aeo-h1">Answer Engine Optimisation — Be the Answer, Not Just a Result</h1>
            <p className="aeo-sub">Featured snippet capture, People Also Ask targeting, FAQ schema, and knowledge panel optimisation — building your presence across the answer surfaces that appear above traditional search results.</p>
            <div className="aeo-btns">
              <Link href="/contact" className="aeo-btn-p">Start AEO Strategy <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/generative-engine-optimization-services" className="aeo-btn-s">Generative Engine Optimisation</Link>
            </div>
            <div className="aeo-stats">{STATS.map(s => <div key={s.label} className="aeo-stat"><div className="aeo-stat-l">{s.label}</div><div className="aeo-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="aeo-svc"><div className="aeo-svc-in">
          <span className="aeo-ey2">What We Do</span><h2 className="aeo-ttl">Answer Engine Optimisation Services</h2>
          <p className="aeo-desc">Featured snippet optimisation, PAA targeting, schema markup, and content restructuring — capturing every answer surface where your audience is looking for information.</p>
          <div className="aeo-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`aeo-card${visibleCards.includes(i)?' visible':''}`}><div className="aeo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="aeo-surf"><div className="aeo-surf-in">
          <h2>Answer Surfaces We Optimise For</h2>
          <div className="aeo-pills">{SURFACES.map(c => <span key={c} className="aeo-pill">{c}</span>)}</div>
        </div></section>
        <section className="aeo-proc"><div className="aeo-proc-in">
          <span className="aeo-ey2">How We Work</span><h2 className="aeo-ttl">Our AEO Process</h2>
          <p className="aeo-desc">Answer opportunity audit to schema implementation — a systematic process that captures position zero and People Also Ask appearances for your highest-value questions.</p>
          <div className="aeo-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`aeo-step${visibleSteps.includes(i)?' visible':''}`}><div className="aeo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="aeo-why"><div className="aeo-why-in">
          <span className="aeo-ey2">Why 1Solutions</span><h2 className="aeo-ttl">AEO Specialists with GEO Integration</h2>
          <p className="aeo-desc">Featured snippet expertise plus AI engine optimisation — the same content improvements that win position zero also earn citations in Google AI Overviews and ChatGPT.</p>
          <div className="aeo-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`aeo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="aeo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="aeo-faq"><div className="aeo-faq-in">
          <span className="aeo-ey2">Got Questions?</span><h2 className="aeo-ttl">Answer Engine Optimisation FAQs</h2>
          <p className="aeo-desc">Everything you need to know about AEO, featured snippets, and People Also Ask optimisation.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`aeo-fitem${openFaq===i?' open':''}`}><button className="aeo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="aeo-ficon">{openFaq===i?'−':'+'}</span></button><div className="aeo-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="aeo-cta"><div className="aeo-cta-o1"/><div className="aeo-cta-o2"/>
          <div className="aeo-cta-in">
            <span className="aeo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Capture Position Zero?</span>
            <h2 className="aeo-cta-t">Start Your Answer Engine Optimisation Strategy</h2>
            <p className="aeo-cta-s">We&rsquo;ll identify your featured snippet and PAA opportunities, restructure your content for answer selection, and implement the schema markup that earns rich results.</p>
            <div className="aeo-cta-btns">
              <Link href="/contact" className="aeo-btn-p">Start AEO Strategy <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-services-company" className="aeo-btn-s">SEO Services Overview</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
