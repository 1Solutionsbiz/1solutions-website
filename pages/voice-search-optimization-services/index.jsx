import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Voice Search Keyword Research', desc: 'Conversational, long-tail, and question-based keyword research — who, what, where, when, why, and how queries that match how people speak to Alexa, Siri, Google Assistant, and Cortana.' },
  { n: '02', title: 'Featured Snippet Optimisation', desc: 'Position zero capture strategy — structuring content answers for featured snippets (paragraph, list, table) that voice assistants read aloud as the direct answer to a query.' },
  { n: '03', title: 'FAQ & Conversational Content', desc: 'FAQ-structured content optimised for voice — direct question-and-answer format matching spoken query patterns, implemented with FAQPage schema for voice assistant compatibility.' },
  { n: '04', title: 'Local Voice Search Optimisation', desc: '"Near me" and local intent voice query optimisation — Google Business Profile, local citations, and hyperlocal content targeting the voice queries driving foot traffic and calls.' },
  { n: '05', title: 'Schema Markup for Voice', desc: 'Speakable schema, FAQPage, HowTo, and LocalBusiness markup — structured data that makes your content machine-readable for voice assistants and helps it appear as a direct spoken answer.' },
  { n: '06', title: 'Page Speed for Voice SEO', desc: 'Pages chosen for voice search results load fast. Core Web Vitals optimisation and page speed improvements that ensure your content meets the performance threshold voice assistants prefer.' },
  { n: '07', title: 'Long-Tail Content Strategy', desc: 'Content mapped to natural language query patterns — full questions as headings, conversational content structure, and paragraph-length answers that match how voice results are delivered.' },
  { n: '08', title: 'Voice SEO Tracking & Reporting', desc: 'Featured snippet position tracking, question keyword ranking monitoring, and local voice search visibility reporting — with monthly performance reviews and content optimisation recommendations.' },
];

const ASSISTANTS = ['Google Assistant', 'Amazon Alexa', 'Apple Siri', 'Microsoft Cortana', 'Google Nest', 'Amazon Echo', 'Samsung Bixby', 'Google Home'];

const PROCESS = [
  { step: '01', title: 'Voice Query Audit', desc: 'Identify the conversational queries your audience is asking — question patterns, long-tail spoken queries, and local voice search triggers relevant to your industry.' },
  { step: '02', title: 'Content & SERP Analysis', desc: 'Analyse current featured snippet ownership for your target queries — mapping which content formats Google is selecting and where your competitors are appearing.' },
  { step: '03', title: 'Content Strategy', desc: 'Develop FAQ content, conversational landing pages, and featured snippet targets — structured to capture the spoken query result positions.' },
  { step: '04', title: 'Content Optimisation', desc: 'Restructure existing content with direct answer formats, question headings, and schema markup — optimising for featured snippet selection.' },
  { step: '05', title: 'Local Voice Optimisation', desc: 'GBP optimisation, local citation building, and hyperlocal content for location-based voice queries — the fastest-growing voice search category.' },
  { step: '06', title: 'Track & Improve', desc: 'Monthly featured snippet tracking, question keyword ranking reports, and content iteration based on voice search performance data.' },
];

const WHY = [
  { title: 'Conversational SEO Expertise', desc: 'Voice search requires a fundamentally different content approach — conversational, question-focused, and snippet-optimised. We have built this expertise as voice search has grown from niche to mainstream.' },
  { title: 'Local Voice Specialisation', desc: 'Local voice queries — "nearest", "open now", "best X near me" — are the highest-converting voice search category. Our local SEO team optimises your presence for exactly these searches.' },
  { title: 'Featured Snippet Track Record', desc: 'Featured snippets are the voice search result. We have a proven process for identifying snippet opportunities, structuring winning content, and capturing position zero at scale.' },
  { title: 'Schema Implementation', desc: 'Speakable, FAQ, HowTo, and LocalBusiness schema — correctly implemented, validated, and monitored to ensure your content is machine-readable for voice assistants.' },
  { title: 'Integrated with Core SEO', desc: 'Voice SEO is not a separate channel — it is an extension of excellent SEO. We integrate voice optimisation into your broader SEO strategy rather than treating it as an isolated silo.' },
  { title: 'Content & Technical Combined', desc: 'Voice search success requires both content (conversational, question-structured) and technical (schema, page speed, structured data) excellence. Our team covers both under one strategy.' },
];

const FAQS = [
  { q: 'What is voice search optimisation?', a: 'Voice search optimisation is the practice of making your website\'s content discoverable when users search using spoken voice queries through Google Assistant, Amazon Alexa, Apple Siri, or Microsoft Cortana. Voice searches differ from typed searches — they are longer, more conversational ("What is the best way to..."), often phrased as full questions, and frequently local in intent. Voice SEO involves optimising for these conversational query patterns, targeting featured snippets (the direct answers voice assistants read aloud), and ensuring structured data helps voice assistants understand and cite your content.' },
  { q: 'How is voice search different from regular SEO?', a: 'Voice search and traditional SEO share the same foundation — high-quality content, fast pages, and strong authority — but differ in three key areas. Query format: voice searches are conversational full sentences rather than short keyword fragments ("what time does the pharmacy close near me" vs "pharmacy hours"). Result format: voice results are spoken aloud from a single source (usually the featured snippet) rather than a list of blue links — so being the featured snippet is everything. Intent: voice searches are more often local or informational — "near me" queries and direct questions — less commonly transactional. Voice SEO therefore focuses on question-format content, featured snippet capture, and local optimisation.' },
  { q: 'How do I rank for voice search?', a: 'The key factors for voice search ranking are: Featured snippet presence — voice assistants typically read the featured snippet (position zero) as the voice result, so capturing featured snippets for your target queries is the primary voice SEO objective. Question-format content — content written as direct answers to specific questions, with the question as a heading and a clear, concise answer in the following paragraph. Schema markup — FAQPage, HowTo, Speakable, and LocalBusiness schema help voice assistants parse and use your content. Page speed — Google favours fast-loading pages for voice results, with pages under 4.6 seconds scoring disproportionately. Domain authority — voice results tend to come from authoritative domains, so overall SEO authority matters.' },
  { q: 'What types of queries are most common in voice search?', a: 'The most common voice search query types are: Question queries (Who, What, Where, When, Why, How) — "How long does it take to..."; Local queries — "best Italian restaurant near me", "pharmacy open now"; Action queries — "call", "navigate to", "set a reminder"; Comparison queries — "which is better X or Y"; and Brand-specific queries — "what are [Brand]\'s opening hours". Informational and local queries dominate voice search. Commercial and transactional queries are less common in voice search compared to typed search.' },
  { q: 'Does voice search SEO help with smart speakers like Amazon Echo?', a: 'Yes, but smart speaker optimisation has specific requirements. Smart speakers (Amazon Echo, Google Nest, Apple HomePod) deliver voice results differently: Amazon Alexa primarily uses Bing search results and featured snippets; Google Nest uses Google Search and Google Assistant; Apple HomePod uses Siri, which draws from a range of sources. For smart speaker visibility: optimising for Bing as well as Google is important for Alexa-powered devices; local business information should be complete across all platforms; and content should be genuinely conversational rather than optimised for reading.' },
  { q: 'Is voice search growing? Should I invest in it now?', a: 'Voice search has grown steadily and now accounts for a significant portion of searches — studies suggest 20-25% of mobile searches are voice-based, with even higher rates for local searches. Voice search is most prominent for: local queries (where to find, nearest, opening hours); on-the-go mobile searches; home device queries via smart speakers; and accessibility-driven searches. The investment case for voice SEO is strongest for: local businesses with high local search relevance; content-heavy sites with strong informational query potential; and brands looking to claim featured snippet positions before competitors do.' },
  { q: 'How do featured snippets relate to voice search?', a: 'Featured snippets are the primary mechanism through which voice search delivers results. When a user asks Google Assistant or Google Nest a question, the answer is almost always read directly from the featured snippet for that query. This makes featured snippet capture the single most valuable outcome of a voice SEO strategy. Featured snippets appear in three formats: paragraph (direct answer text — most common in voice); list (numbered or bulleted steps); and table (comparative data). Each format has different content requirements. We identify which format Google is selecting for your target queries and optimise your content to match that format precisely.' },
  { q: 'What is Speakable schema and do I need it?', a: 'Speakable schema (schema.org/SpeakableSpecification) is a structured data type that tells Google which sections of a web page are most appropriate for text-to-speech playback — i.e., which parts should be read aloud by voice assistants. It was primarily designed for news publishers but has broader application for any content-heavy site. Implementing Speakable schema signals to Google Assistant exactly which sections of your content are the most relevant spoken-answer portions. It is particularly valuable for: news and media sites; how-to and instructional content; and FAQ pages. While not required for basic voice SEO, it is a useful signal that complements FAQPage and HowTo schema.' },
];

const STATS = [
  { label: 'Featured Snippets Captured', val: '1,200+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Voice Query Types Covered', val: '8+' },
  { label: 'Client Retention', val: '92%' },
];

export default function VoiceSearchOptimizationServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);

  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);

  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Voice Search Optimisation', item: 'https://www.1solutions.biz/voice-search-optimization-services/' }] }, { '@type': 'Service', name: 'Voice Search Optimisation Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Voice Search Optimisation', url: 'https://www.1solutions.biz/voice-search-optimization-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };

  return (
    <>
      <Head>
        <title>Voice Search Optimisation Services | Siri, Alexa & Google Assistant SEO | 1Solutions</title>
        <meta name="description" content="Voice search optimisation services — featured snippet capture, conversational content, FAQ schema, and local voice SEO for Google Assistant, Alexa, and Siri. Rank for spoken queries." />
        <meta name="keywords" content="voice search optimization services, voice seo, voice search seo, featured snippet optimization, alexa seo, google assistant optimization, voice search ranking" />
        <link rel="canonical" href="https://www.1solutions.biz/voice-search-optimization-services/" />
        <meta property="og:title" content="Voice Search Optimisation Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/voice-search-optimization-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .vseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .vseo-page *,.vseo-page *::before,.vseo-page *::after{box-sizing:border-box}
          .vseo-hero{background:linear-gradient(135deg,#f0f9ff 0%,#bae6fd 25%,#e0f2fe 60%,#f0f9ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .vseo-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(2,132,199,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .vseo-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(7,89,133,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .vseo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .vseo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .vseo-bc a{color:#6b7280;text-decoration:none}.vseo-bc a:hover{color:#0284C7}.vseo-bc span{color:#d1d5db}
          .vseo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(2,132,199,0.08);border:1px solid rgba(2,132,199,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0284C7;margin-bottom:28px}
          .vseo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#0C4A6E 0%,#0284C7 50%,#075985 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .vseo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .vseo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .vseo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#0284C7;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(2,132,199,0.28)}
          .vseo-btn-p:hover{background:#0369A1;box-shadow:0 8px 32px rgba(2,132,199,0.38);transform:translateY(-2px)}
          .vseo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .vseo-btn-s:hover{border-color:#0284C7;color:#0284C7;transform:translateY(-2px)}
          .vseo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(2,132,199,0.07)}
          .vseo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(2,132,199,0.08)}.vseo-stat:last-child{border-right:none}
          .vseo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .vseo-stat-v{font-size:1.6rem;font-weight:900;color:#0284C7;letter-spacing:-0.5px}
          .vseo-svc{background:#f8fafd;padding:80px 40px}.vseo-svc-in{max-width:1280px;margin:0 auto}
          .vseo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0284C7;margin-bottom:10px;display:block}
          .vseo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0C4A6E 0%,#0284C7 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .vseo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .vseo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .vseo-card{background:linear-gradient(135deg,rgba(240,249,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(186,230,253,0.30) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(2,132,199,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .vseo-card.visible{opacity:1;transform:translateY(0)}.vseo-card:hover{transform:translateY(-6px);border-color:rgba(2,132,199,0.22);box-shadow:0 16px 48px rgba(2,132,199,0.09)}
          .vseo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0284C7;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .vseo-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .vseo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .vseo-asst{background:linear-gradient(135deg,#0C4A6E 0%,#0284C7 100%);padding:60px 40px}
          .vseo-asst-in{max-width:1280px;margin:0 auto;text-align:center}
          .vseo-asst h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .vseo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .vseo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .vseo-proc{background:linear-gradient(135deg,#f0f9ff 0%,#f0f9ff 50%,#bae6fd 100%);padding:80px 40px}
          .vseo-proc-in{max-width:900px;margin:0 auto}
          .vseo-steps{display:flex;flex-direction:column;margin-top:44px}
          .vseo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(2,132,199,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .vseo-step:last-child{border-bottom:none}.vseo-step.visible{opacity:1;transform:translateX(0)}
          .vseo-snum{font-size:3rem;font-weight:900;color:rgba(2,132,199,0.15);line-height:1;letter-spacing:-2px}
          .vseo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .vseo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .vseo-why{background:#fff;padding:80px 40px}.vseo-why-in{max-width:1280px;margin:0 auto}
          .vseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .vseo-wcard{background:linear-gradient(135deg,#f0f9ff 0%,#fff 60%,#bae6fd 100%);border:1px solid rgba(2,132,199,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .vseo-wcard.visible{opacity:1;transform:translateY(0)}.vseo-wcard:hover{border-color:rgba(2,132,199,0.20);box-shadow:0 8px 32px rgba(2,132,199,0.07)}
          .vseo-dot{width:8px;height:8px;border-radius:50%;background:#0284C7;margin-bottom:16px}
          .vseo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .vseo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .vseo-faq{background:#f8fafd;padding:80px 40px}.vseo-faq-in{max-width:860px;margin:0 auto}
          .vseo-fitem{border-bottom:1px solid #e5e7eb}
          .vseo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .vseo-fq:hover{color:#0284C7}
          .vseo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .vseo-fitem.open .vseo-ficon{border-color:#0284C7;color:#0284C7;background:rgba(2,132,199,0.06)}
          .vseo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .vseo-fitem.open .vseo-fa{max-height:500px;padding-bottom:22px}
          .vseo-cta{background:linear-gradient(135deg,rgba(2,132,199,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(12,74,110,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .vseo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(2,132,199,0.10) 0%,transparent 70%);pointer-events:none}
          .vseo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(12,74,110,0.08) 0%,transparent 70%);pointer-events:none}
          .vseo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .vseo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#0C4A6E 0%,#0284C7 50%,#075985 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .vseo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .vseo-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.vseo-grid{grid-template-columns:repeat(2,1fr)}.vseo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.vseo-hero,.vseo-svc,.vseo-asst,.vseo-proc,.vseo-why,.vseo-faq,.vseo-cta{padding:60px 24px}.vseo-hero{padding-top:60px;padding-bottom:0}.vseo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.vseo-stat:nth-child(2){border-right:none}.vseo-grid{grid-template-columns:1fr}.vseo-why-grid{grid-template-columns:1fr}.vseo-step{grid-template-columns:56px 1fr}.vseo-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="vseo-page">
        <section className="vseo-hero"><div className="vseo-o1"/><div className="vseo-o2"/>
          <div className="vseo-in">
            <nav className="vseo-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO Services</Link><span>/</span><span style={{color:'#0284C7'}}>Voice Search Optimisation</span></nav>
            <span className="vseo-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#0284C7',display:'inline-block'}}/> Featured Snippets · Conversational SEO · Local Voice</span>
            <h1 className="vseo-h1">Voice Search Optimisation Services — Rank for What People Say, Not Just Type</h1>
            <p className="vseo-sub">Featured snippet capture, conversational content, FAQ schema, and local voice SEO — optimising your presence for Google Assistant, Alexa, Siri, and Cortana voice queries.</p>
            <div className="vseo-btns">
              <Link href="/contact-us" className="vseo-btn-p">Start Voice SEO <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/local-seo-services" className="vseo-btn-s">Local SEO Services</Link>
            </div>
            <div className="vseo-stats">{STATS.map(s => <div key={s.label} className="vseo-stat"><div className="vseo-stat-l">{s.label}</div><div className="vseo-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="vseo-svc"><div className="vseo-svc-in">
          <span className="vseo-ey2">What We Do</span><h2 className="vseo-ttl">Voice Search Optimisation Services</h2>
          <p className="vseo-desc">Question keyword research, conversational content, featured snippet targeting, and schema markup — everything needed to appear in spoken search results.</p>
          <div className="vseo-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`vseo-card${visibleCards.includes(i)?' visible':''}`}><div className="vseo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="vseo-asst"><div className="vseo-asst-in">
          <h2>Voice Assistants We Optimise For</h2>
          <div className="vseo-pills">{ASSISTANTS.map(c => <span key={c} className="vseo-pill">{c}</span>)}</div>
        </div></section>
        <section className="vseo-proc"><div className="vseo-proc-in">
          <span className="vseo-ey2">How We Work</span><h2 className="vseo-ttl">Our Voice Search SEO Process</h2>
          <p className="vseo-desc">Voice query audit to featured snippet capture — a structured process that positions your content as the spoken answer for your most valuable queries.</p>
          <div className="vseo-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`vseo-step${visibleSteps.includes(i)?' visible':''}`}><div className="vseo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="vseo-why"><div className="vseo-why-in">
          <span className="vseo-ey2">Why 1Solutions</span><h2 className="vseo-ttl">Voice SEO Experts, Local & Content Combined</h2>
          <p className="vseo-desc">Voice search success needs both conversational content expertise and local SEO strength — we bring both under one integrated strategy.</p>
          <div className="vseo-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`vseo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="vseo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="vseo-faq"><div className="vseo-faq-in">
          <span className="vseo-ey2">Got Questions?</span><h2 className="vseo-ttl">Voice Search SEO FAQs</h2>
          <p className="vseo-desc">Answers to the most common questions about voice search optimisation and featured snippet capture.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`vseo-fitem${openFaq===i?' open':''}`}><button className="vseo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="vseo-ficon">{openFaq===i?'−':'+'}</span></button><div className="vseo-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="vseo-cta"><div className="vseo-cta-o1"/><div className="vseo-cta-o2"/>
          <div className="vseo-cta-in">
            <span className="vseo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Rank in Voice Search Results?</span>
            <h2 className="vseo-cta-t">Start Your Voice Search SEO Strategy</h2>
            <p className="vseo-cta-s">We&rsquo;ll identify your most valuable voice search opportunities, map featured snippet targets, and build the conversational content strategy that earns spoken search visibility.</p>
            <div className="vseo-cta-btns">
              <Link href="/contact-us" className="vseo-btn-p">Start Voice SEO Strategy <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-services-company" className="vseo-btn-s">SEO Services Overview</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
