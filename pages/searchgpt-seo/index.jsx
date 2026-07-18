import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'SearchGPT Citation Audit', desc:'Analyse your current citation presence in SearchGPT and ChatGPT Search — identifying which queries your brand appears in, where competitors are cited instead, and the content gaps to close.' },
  { n:'02', title:'Real-Time Content Optimization', desc:'SearchGPT retrieves real-time web content — we ensure your content is fresh, crawlable, fast-loading, and structured for real-time AI retrieval for your priority query types.' },
  { n:'03', title:'Brand Authority Building', desc:'Build the domain authority, editorial backlinks, and third-party brand mentions that SearchGPT uses to evaluate source credibility — the same signals that determine which brands it recommends.' },
  { n:'04', title:'Structured Answer Content', desc:'Create comprehensive, well-structured content in the formats SearchGPT prefers to retrieve: authoritative guides, comparison analysis, original data, expert commentary, and direct Q&A content.' },
  { n:'05', title:'OpenAI Operator Optimization', desc:'As OpenAI expands its Operator and agent features, ensure your business information, products, and services are structured and accessible for AI agent retrieval — future-proofing your AI search presence.' },
  { n:'06', title:'Cross-Platform AI Citation Strategy', desc:'Coordinate SearchGPT optimization with ChatGPT, Perplexity, and Google AI — building a unified AI citation strategy that compounds across all major AI search surfaces simultaneously.' },
];

const FAQS = [
  { q:'What is SearchGPT and how is it different from ChatGPT?', a:"SearchGPT is OpenAI's AI-powered search engine, integrated into ChatGPT and available as a standalone search product. Unlike the standard ChatGPT which primarily draws on training data, SearchGPT actively crawls and retrieves real-time web content — providing cited, sourced answers with clickable source links. This makes SearchGPT more like Perplexity and Google AI Overviews in behaviour — and means that real-time content optimization has a direct impact on citation frequency, unlike base ChatGPT where training data recency is more limiting." },
  { q:'How does SearchGPT choose which websites to cite?', a:"SearchGPT's citation algorithm considers: real-time crawl data (fresh, accessible content is prioritised), domain authority and trustworthiness, content relevance and semantic match to the query, source credibility signals (E-E-A-T), and content structure clarity. SearchGPT tends to favour sources that are already well-indexed by Bing (which powers OpenAI's web search feature), so Bing SEO is also relevant — not just Google SEO. We optimise for both simultaneously." },
  { q:'Should I optimise for both SearchGPT and ChatGPT?', a:'Yes. ChatGPT (base model) and SearchGPT use different information retrieval mechanisms, but the optimisation signals largely overlap: authoritative content, E-E-A-T, strong brand presence, structured data, and domain authority benefit both. SearchGPT additionally benefits from real-time crawlability and Bing indexing. We treat ChatGPT and SearchGPT as a unified OpenAI ecosystem and optimise for both together, ensuring your brand is cited regardless of which OpenAI product a user is using.' },
  { q:'Is Bing important for SearchGPT optimization?', a:"Yes — more so than for traditional SEO. SearchGPT's real-time web search is powered by Bing's index. Pages that are well-indexed and well-performing in Bing are more likely to be retrieved by SearchGPT. We include Bing webmaster tools setup, Bing SEO optimisation, and IndexNow submission as part of our SearchGPT optimization approach — ensuring your content is fully indexed and authoritative in the Bing ecosystem that powers OpenAI's search." },
  { q:'What content types does SearchGPT prefer?', a:'SearchGPT, like other AI search engines, favours: current and frequently updated content, in-depth authoritative guides on specific topics, clear and well-structured pages with direct answers to questions, content with verifiable citations and original data, and pages from brands with established domain authority. Pages optimised for featured snippets — concise paragraph answers, numbered steps, comparison tables — also tend to perform well in SearchGPT citation.' },
];

const RELATED = [
  { href:'/chatgpt-seo/', label:'ChatGPT SEO' },
  { href:'/ai-search-services/', label:'AI Search Services' },
  { href:'/perplexity-ai-seo/', label:'Perplexity AI SEO' },
  { href:'/google-ai-seo/', label:'Google AI SEO' },
  { href:'/answer-engine-optimization-services/', label:'Answer Engine Optimization' },
  { href:'/ai-seo-services/', label:'AI SEO Services' },
  { href:'/generative-engine-optimization-services/', label:'GEO Services' },
  { href:'/seo-services-company/', label:'SEO Services' },
];

const STATS = [
  ['Brands Optimised for SearchGPT','100+'],
  ['Avg Citation Uplift','2.5x'],
  ['Years SEO Experience','15+'],
  ['Client Retention','97%'],
];

function useCountUp(target, dur=1800, start=false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const n = parseInt(target.replace(/\D/g,''), 10);
    if (!n) return;
    let t0 = null;
    const step = ts => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setCount(Math.floor((1 - Math.pow(1-p,3)) * n));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, dur]);
  return count;
}

function Stat({ label, val, started }) {
  const n = useCountUp(val, 1800, started);
  const sfx = val.replace(/[\d,]/g,'');
  return (
    <div className="sgpt-stat-col">
      <div className="sgpt-stat-val">{started ? n + sfx : val}</div>
      <div className="sgpt-stat-lbl">{label}</div>
    </div>
  );
}

export default function Page() {
  const [openFaq, setOpenFaq] = useState(0);
  const [started, setStarted] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold:0.5 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>{`SearchGPT SEO | OpenAI Search Visibility Optimization | 1Solutions`}</title>
        <meta name="description" content={`SearchGPT SEO services — optimise your brand for OpenAI's SearchGPT and ChatGPT search features. Get cited in AI-powered search results. US, Canada & Australia.`} />
        <link rel="canonical" href="https://www.1solutions.biz/searchgpt-seo/" />
        <meta property="og:title" content={`SearchGPT SEO | OpenAI Search Visibility Optimization | 1Solutions`} />
        <meta property="og:description" content={`SearchGPT SEO services — optimise your brand for OpenAI's SearchGPT and ChatGPT search features. Get cited in AI-powered search results. US, Canada & Australia.`} />
        <meta property="og:url" content="https://www.1solutions.biz/searchgpt-seo/" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org',
          '@type':'ProfessionalService',
          name:'1Solutions — SearchGPT SEO Services',
          url:'https://www.1solutions.biz/searchgpt-seo/',
          telephone:'+91-9654327900',
          areaServed:['US','CA','AU','GB'],
          aggregateRating:{'@type':'AggregateRating',ratingValue:'4.9',reviewCount:'150',bestRating:'5'},
          mainEntity:FAQS.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}})),
        }) }} />
        <style>{`
          .sgpt-hero{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 40%,#0F3460 100%);padding:80px 40px 0;position:relative;overflow:hidden}
          .sgpt-hero-orb{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.18) 0%,transparent 65%);top:-180px;right:-100px;pointer-events:none;filter:blur(40px)}
          .sgpt-hero-inner{max-width:1280px;margin:0 auto;padding-bottom:60px}
          .sgpt-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.85);margin-bottom:24px}
          .sgpt-h1{font-size:clamp(2rem,4vw,3.2rem);font-weight:900;line-height:1.1;letter-spacing:-1px;color:#fff;margin:0 0 18px}
          .sgpt-h1 span{background:linear-gradient(90deg,#FCD34D,#F97316);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .sgpt-sub{font-size:1.05rem;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 34px;max-width:600px}
          .sgpt-btns{display:flex;gap:14px;flex-wrap:wrap}
          .sgpt-btn-p{display:inline-flex;align-items:center;gap:8px;background:#D97706;color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(217,119,6,0.35)}
          .sgpt-btn-p:hover{background:#B45309;transform:translateY(-2px)}
          .sgpt-btn-g{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.10);backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,0.25);color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s}
          .sgpt-btn-g:hover{background:rgba(255,255,255,0.18);transform:translateY(-2px)}
          .sgpt-stats{background:rgba(255,255,255,0.06);border-top:1px solid rgba(255,255,255,0.10);padding:20px 40px}
          .sgpt-stats-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr)}
          .sgpt-stat-col{text-align:center;padding:16px;border-right:1px solid rgba(255,255,255,0.10)}
          .sgpt-stat-col:last-child{border-right:none}
          .sgpt-stat-val{font-size:1.9rem;font-weight:900;color:#fff;letter-spacing:-1px}
          .sgpt-stat-lbl{font-size:11px;color:rgba(255,255,255,0.50);font-weight:500;text-transform:uppercase;letter-spacing:1px;margin-top:4px}
          .sgpt-svc{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px}
          .sgpt-svc-inner{max-width:1280px;margin:0 auto}
          .sgpt-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .sgpt-sec-h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 12px}
          .sgpt-sec-p{font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 0 44px}
          .sgpt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
          .sgpt-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.05);transition:transform .25s,box-shadow .25s,border-color .25s}
          .sgpt-card:hover{transform:translateY(-5px);border-color:rgba(217,119,6,0.30);box-shadow:0 14px 42px rgba(15,52,96,0.10)}
          .sgpt-card-n{position:absolute;top:6px;right:12px;font-size:64px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;pointer-events:none}
          .sgpt-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin:0 0 8px;position:relative;z-index:1}
          .sgpt-card p{font-size:13px;color:#4A6080;line-height:1.6;margin:0;position:relative;z-index:1}
          .sgpt-faq{background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:80px 40px}
          .sgpt-faq-inner{max-width:860px;margin:0 auto}
          .sgpt-faq-item{border-bottom:1px solid rgba(15,52,96,0.08)}
          .sgpt-faq-q{width:100%;background:none;border:none;text-align:left;padding:20px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .sgpt-faq-q:hover{color:#D97706}
          .sgpt-faq-icon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all .2s;margin-top:2px}
          .sgpt-faq-item.open .sgpt-faq-icon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06)}
          .sgpt-faq-a{font-size:0.91rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height .35s ease,padding-bottom .35s ease}
          .sgpt-faq-item.open .sgpt-faq-a{max-height:600px;padding-bottom:20px}
          .sgpt-cta{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 100%);padding:70px 40px;text-align:center}
          .sgpt-cta h2{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#fff;margin:0 0 12px;line-height:1.2}
          .sgpt-cta p{font-size:15px;color:rgba(255,255,255,0.75);margin:0 0 28px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7}
          .sgpt-related{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:60px 40px}
          .sgpt-rel-inner{max-width:1280px;margin:0 auto}
          .sgpt-rel-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .sgpt-rel-tag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,0.12);color:#0F3460;transition:all .2s}
          .sgpt-rel-tag:hover{border-color:#D97706;color:#D97706;background:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(15,52,96,0.08)}
          @media(max-width:1024px){.sgpt-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){
            .sgpt-hero,.sgpt-svc,.sgpt-faq,.sgpt-cta,.sgpt-related{padding:60px 20px}
            .sgpt-stats,.sgpt-stats-inner{padding:16px 20px}
            .sgpt-stats-inner{grid-template-columns:repeat(2,1fr)}
            .sgpt-grid{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <section className="sgpt-hero">
        <div className="sgpt-hero-orb" />
        <div className="sgpt-hero-inner">
          <span className="sgpt-eyebrow">
            <span style={{width:6,height:6,borderRadius:'50%',background:'#D97706',display:'inline-block'}} />
            1Solutions AI Practice
          </span>
          <h1 className="sgpt-h1">SearchGPT SEO Services<br /><span>Rank in OpenAI's Search Engine</span></h1>
          <p className="sgpt-sub">SearchGPT brings OpenAI's AI to real-time web search — used by millions of ChatGPT users who choose AI-powered results over traditional search. We help your brand get found and cited in SearchGPT answers.</p>
          <div className="sgpt-btns">
            <Link href="#contact" className="sgpt-btn-p">Get a Free Consultation →</Link>
            <Link href="#services" className="sgpt-btn-g">View Services</Link>
          </div>
        </div>
        <div className="sgpt-stats" ref={statsRef}>
          <div className="sgpt-stats-inner">
            {STATS.map(([lbl, val]) => <Stat key={lbl} label={lbl} val={val} started={started} />)}
          </div>
        </div>
      </section>

      <section className="sgpt-svc" id="services">
        <div className="sgpt-svc-inner">
          <span className="sgpt-sec-ey">What We Do</span>
          <h2 className="sgpt-sec-h2">SearchGPT SEO Services We Offer</h2>
          <p className="sgpt-sec-p">Expert searchgpt seo services for businesses in the US, Canada, and Australia — from strategy through implementation and ongoing optimization.</p>
          <div className="sgpt-grid">
            {SERVICES.map(s => (
              <div className="sgpt-card" key={s.n}>
                <span className="sgpt-card-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sgpt-faq" id="faq">
        <div className="sgpt-faq-inner">
          <span className="sgpt-sec-ey">Got Questions?</span>
          <h2 className="sgpt-sec-h2">SearchGPT SEO Services — Frequently Asked Questions</h2>
          <div style={{marginTop:32}}>
            {FAQS.map((f,i) => (
              <div className={`sgpt-faq-item${openFaq===i?' open':''}`} key={f.q}>
                <button className="sgpt-faq-q" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                  {f.q}<span className="sgpt-faq-icon">{openFaq===i?'−':'+'}</span>
                </button>
                <div className="sgpt-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sgpt-cta" id="contact">
        <h2>Ready to Get Started with SearchGPT SEO Services?</h2>
        <p>Speak to our team for a free, no-obligation consultation. We'll assess your current position and recommend the right strategy.</p>
        <Link href="/contact-us/" className="sgpt-btn-p">Book a Free Consultation →</Link>
      </section>

      <section className="sgpt-related">
        <div className="sgpt-rel-inner">
          <span className="sgpt-sec-ey">Related Services</span>
          <h2 className="sgpt-sec-h2" style={{fontSize:'1.5rem',margin:'0'}}>Explore Related Offerings</h2>
          <div className="sgpt-rel-tags">
            {RELATED.map(r => <Link key={r.href} href={r.href} className="sgpt-rel-tag">{r.label}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
