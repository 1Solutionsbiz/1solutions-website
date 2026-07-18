import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Perplexity Source Authority Audit', desc:'Audit your current Perplexity citation presence — identifying which queries your brand appears in, which competitors are cited instead, and the content and authority gaps to close.' },
  { n:'02', title:'Source Credibility Building', desc:'Perplexity weights source credibility heavily. We build the signals it evaluates: domain authority, editorial link profile, third-party brand coverage, Wikipedia/Wikidata presence, and E-E-A-T content depth.' },
  { n:'03', title:'Structured Answer Content', desc:'Create the clear, well-structured, factual content that Perplexity retrieves and cites — comprehensive guides, comparative analysis, original data, and authoritative definitions on your priority topics.' },
  { n:'04', title:'Real-Time Indexing Optimization', desc:'Perplexity retrieves real-time web content — we ensure your content is crawlable, fast-loading, and structured for real-time AI retrieval, not just traditional search indexing.' },
  { n:'05', title:'Perplexity Pro Visibility', desc:"Optimise for Perplexity Pro users — the platform's highest-intent audience — who use advanced query modes, deeper research features, and follow-up questions that surface highly specific brand content." },
  { n:'06', title:'Citation Monitoring & Reporting', desc:"Monthly tracking of your brand's Perplexity citation frequency, sentiment, and context across priority queries — with competitor citation comparison and gap analysis." },
];

const FAQS = [
  { q:'What is Perplexity AI and why does it matter for SEO?', a:"Perplexity AI is an AI-powered search engine that generates direct answers to queries, citing its sources inline — similar to a research assistant with real-time web access. Unlike ChatGPT which primarily draws on training data, Perplexity actively crawls and retrieves current web content, making real-time content optimisation more impactful. Perplexity has grown rapidly, particularly among professional and academic users who value source transparency. For brands, being cited in Perplexity answers provides high-visibility placement to an engaged, research-oriented audience that traditional Google results increasingly can't reach." },
  { q:'How does Perplexity choose which sources to cite?', a:"Perplexity's citation algorithm considers: source domain authority and trustworthiness, content relevance and freshness, crawlability and page speed, the clarity and directness of the content's answer to the query, and third-party signals of brand authority (backlinks, brand mentions, press coverage). Perplexity is known to favour sources that directly answer questions with factual, well-structured information over thin or overly promotional content. Pages that rank well in traditional search are more likely to be retrieved by Perplexity, but ranking alone does not guarantee citation." },
  { q:'Is Perplexity SEO different from Google SEO?', a:'Perplexity SEO shares the same foundational signals as Google SEO — authority, content quality, E-E-A-T — but the optimisation emphasis differs. Perplexity places higher weight on: source transparency (clear authorship, citations, and factual accuracy), content freshness (real-time retrieval means recent content is favoured for time-sensitive topics), and direct answer formatting (content that clearly answers a specific question scores higher than broad topic pages). The good news is that Perplexity SEO improvements reinforce Google SEO and vice versa — they share the same foundational content quality signals.' },
  { q:'How quickly can I start appearing in Perplexity answers?', a:'Because Perplexity retrieves real-time web content (not only training data), content improvements can be reflected in Perplexity citations faster than in ChatGPT — sometimes within days for new content on authoritative domains. However, building the brand authority and content depth that makes Perplexity consistently choose your brand over competitors typically takes 2–4 months. We track citation frequency monthly across your priority query set and report on measurable citation improvements.' },
  { q:'Which content types does Perplexity cite most often?', a:'Perplexity cites: in-depth explanatory content (what is X, how does X work), recent news and research (freshness matters significantly), comparative content (X vs Y analysis), original data and statistics (cited with source attribution), and authoritative brand information (product specs, pricing, company information). Perplexity particularly favours content from recognised editorial sources, academic institutions, and established industry publications — making earned media and editorial link building important signals for Perplexity citation.' },
];

const RELATED = [
  { href:'/ai-search-services/', label:'AI Search Services' },
  { href:'/chatgpt-seo/', label:'ChatGPT SEO' },
  { href:'/answer-engine-optimization-services/', label:'Answer Engine Optimization' },
  { href:'/generative-engine-optimization-services/', label:'GEO Services' },
  { href:'/ai-seo-services/', label:'AI SEO Services' },
  { href:'/google-ai-seo/', label:'Google AI SEO' },
  { href:'/searchgpt-seo/', label:'SearchGPT SEO' },
  { href:'/seo-services-company/', label:'SEO Services' },
];

const STATS = [
  ['Brands Optimised for Perplexity','120+'],
  ['Avg Source Citation Rate','2.8x'],
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
    <div className="plx-stat-col">
      <div className="plx-stat-val">{started ? n + sfx : val}</div>
      <div className="plx-stat-lbl">{label}</div>
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
        <title>{`Perplexity AI SEO | Get Cited in Perplexity Answers | 1Solutions`}</title>
        <meta name="description" content={`Perplexity AI SEO services — optimise your brand to appear as a cited source in Perplexity AI answers. Expert AI visibility optimization for US, Canada & Australia.`} />
        <link rel="canonical" href="https://www.1solutions.biz/perplexity-ai-seo/" />
        <meta property="og:title" content={`Perplexity AI SEO | Get Cited in Perplexity Answers | 1Solutions`} />
        <meta property="og:description" content={`Perplexity AI SEO services — optimise your brand to appear as a cited source in Perplexity AI answers. Expert AI visibility optimization for US, Canada & Australia.`} />
        <meta property="og:url" content="https://www.1solutions.biz/perplexity-ai-seo/" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org',
          '@type':'ProfessionalService',
          name:'1Solutions — Perplexity AI SEO Services',
          url:'https://www.1solutions.biz/perplexity-ai-seo/',
          telephone:'+91-9654327900',
          areaServed:['US','CA','AU','GB'],
          aggregateRating:{'@type':'AggregateRating',ratingValue:'4.9',reviewCount:'150',bestRating:'5'},
          mainEntity:FAQS.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}})),
        }) }} />
        <style>{`
          .plx-hero{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 40%,#0F3460 100%);padding:80px 40px 0;position:relative;overflow:hidden}
          .plx-hero-orb{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.18) 0%,transparent 65%);top:-180px;right:-100px;pointer-events:none;filter:blur(40px)}
          .plx-hero-inner{max-width:1280px;margin:0 auto;padding-bottom:60px}
          .plx-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.85);margin-bottom:24px}
          .plx-h1{font-size:clamp(2rem,4vw,3.2rem);font-weight:900;line-height:1.1;letter-spacing:-1px;color:#fff;margin:0 0 18px}
          .plx-h1 span{background:linear-gradient(90deg,#FCD34D,#F97316);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .plx-sub{font-size:1.05rem;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 34px;max-width:600px}
          .plx-btns{display:flex;gap:14px;flex-wrap:wrap}
          .plx-btn-p{display:inline-flex;align-items:center;gap:8px;background:#D97706;color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(217,119,6,0.35)}
          .plx-btn-p:hover{background:#B45309;transform:translateY(-2px)}
          .plx-btn-g{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.10);backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,0.25);color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s}
          .plx-btn-g:hover{background:rgba(255,255,255,0.18);transform:translateY(-2px)}
          .plx-stats{background:rgba(255,255,255,0.06);border-top:1px solid rgba(255,255,255,0.10);padding:20px 40px}
          .plx-stats-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr)}
          .plx-stat-col{text-align:center;padding:16px;border-right:1px solid rgba(255,255,255,0.10)}
          .plx-stat-col:last-child{border-right:none}
          .plx-stat-val{font-size:1.9rem;font-weight:900;color:#fff;letter-spacing:-1px}
          .plx-stat-lbl{font-size:11px;color:rgba(255,255,255,0.50);font-weight:500;text-transform:uppercase;letter-spacing:1px;margin-top:4px}
          .plx-svc{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px}
          .plx-svc-inner{max-width:1280px;margin:0 auto}
          .plx-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .plx-sec-h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 12px}
          .plx-sec-p{font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 0 44px}
          .plx-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
          .plx-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.05);transition:transform .25s,box-shadow .25s,border-color .25s}
          .plx-card:hover{transform:translateY(-5px);border-color:rgba(217,119,6,0.30);box-shadow:0 14px 42px rgba(15,52,96,0.10)}
          .plx-card-n{position:absolute;top:6px;right:12px;font-size:64px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;pointer-events:none}
          .plx-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin:0 0 8px;position:relative;z-index:1}
          .plx-card p{font-size:13px;color:#4A6080;line-height:1.6;margin:0;position:relative;z-index:1}
          .plx-faq{background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:80px 40px}
          .plx-faq-inner{max-width:860px;margin:0 auto}
          .plx-faq-item{border-bottom:1px solid rgba(15,52,96,0.08)}
          .plx-faq-q{width:100%;background:none;border:none;text-align:left;padding:20px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .plx-faq-q:hover{color:#D97706}
          .plx-faq-icon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all .2s;margin-top:2px}
          .plx-faq-item.open .plx-faq-icon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06)}
          .plx-faq-a{font-size:0.91rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height .35s ease,padding-bottom .35s ease}
          .plx-faq-item.open .plx-faq-a{max-height:600px;padding-bottom:20px}
          .plx-cta{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 100%);padding:70px 40px;text-align:center}
          .plx-cta h2{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#fff;margin:0 0 12px;line-height:1.2}
          .plx-cta p{font-size:15px;color:rgba(255,255,255,0.75);margin:0 0 28px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7}
          .plx-related{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:60px 40px}
          .plx-rel-inner{max-width:1280px;margin:0 auto}
          .plx-rel-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .plx-rel-tag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,0.12);color:#0F3460;transition:all .2s}
          .plx-rel-tag:hover{border-color:#D97706;color:#D97706;background:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(15,52,96,0.08)}
          @media(max-width:1024px){.plx-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){
            .plx-hero,.plx-svc,.plx-faq,.plx-cta,.plx-related{padding:60px 20px}
            .plx-stats,.plx-stats-inner{padding:16px 20px}
            .plx-stats-inner{grid-template-columns:repeat(2,1fr)}
            .plx-grid{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <section className="plx-hero">
        <div className="plx-hero-orb" />
        <div className="plx-hero-inner">
          <span className="plx-eyebrow">
            <span style={{width:6,height:6,borderRadius:'50%',background:'#D97706',display:'inline-block'}} />
            1Solutions AI Practice
          </span>
          <h1 className="plx-h1">Perplexity AI SEO Services<br /><span>Get Cited in Perplexity AI Answers</span></h1>
          <p className="plx-sub">Perplexity AI is the fastest-growing AI search engine — used by millions of researchers, professionals, and buyers who expect cited, sourced answers. We optimise your brand to be one of those sources.</p>
          <div className="plx-btns">
            <Link href="#contact" className="plx-btn-p">Get a Free Consultation →</Link>
            <Link href="#services" className="plx-btn-g">View Services</Link>
          </div>
        </div>
        <div className="plx-stats" ref={statsRef}>
          <div className="plx-stats-inner">
            {STATS.map(([lbl, val]) => <Stat key={lbl} label={lbl} val={val} started={started} />)}
          </div>
        </div>
      </section>

      <section className="plx-svc" id="services">
        <div className="plx-svc-inner">
          <span className="plx-sec-ey">What We Do</span>
          <h2 className="plx-sec-h2">Perplexity AI SEO Services We Offer</h2>
          <p className="plx-sec-p">Expert perplexity ai seo services for businesses in the US, Canada, and Australia — from strategy through implementation and ongoing optimization.</p>
          <div className="plx-grid">
            {SERVICES.map(s => (
              <div className="plx-card" key={s.n}>
                <span className="plx-card-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="plx-faq" id="faq">
        <div className="plx-faq-inner">
          <span className="plx-sec-ey">Got Questions?</span>
          <h2 className="plx-sec-h2">Perplexity AI SEO Services — Frequently Asked Questions</h2>
          <div style={{marginTop:32}}>
            {FAQS.map((f,i) => (
              <div className={`plx-faq-item${openFaq===i?' open':''}`} key={f.q}>
                <button className="plx-faq-q" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                  {f.q}<span className="plx-faq-icon">{openFaq===i?'−':'+'}</span>
                </button>
                <div className="plx-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="plx-cta" id="contact">
        <h2>Ready to Get Started with Perplexity AI SEO Services?</h2>
        <p>Speak to our team for a free, no-obligation consultation. We'll assess your current position and recommend the right strategy.</p>
        <Link href="/contact-us/" className="plx-btn-p">Book a Free Consultation →</Link>
      </section>

      <section className="plx-related">
        <div className="plx-rel-inner">
          <span className="plx-sec-ey">Related Services</span>
          <h2 className="plx-sec-h2" style={{fontSize:'1.5rem',margin:'0'}}>Explore Related Offerings</h2>
          <div className="plx-rel-tags">
            {RELATED.map(r => <Link key={r.href} href={r.href} className="plx-rel-tag">{r.label}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
