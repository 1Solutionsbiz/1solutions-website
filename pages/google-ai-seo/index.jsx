import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Google AI Overview Optimization', desc:'Audit, restructure, and optimise your content to be cited in Google AI Overviews — the AI-generated answer boxes that appear above organic results for informational, comparison, and how-to queries.' },
  { n:'02', title:'Gemini Visibility Optimization', desc:"Optimise for Google Gemini's recommendations across Google Search, Google Workspace, and Android — building the entity authority and content signals that Gemini surfaces in its AI-assisted answers." },
  { n:'03', title:'E-E-A-T & Source Authority', desc:"Google AI Overviews preferentially cite pages with strong E-E-A-T signals — we build expert authorship, original research, credentials, and third-party trust signals that make Google's AI choose your content." },
  { n:'04', title:'Featured Snippet Consolidation', desc:'Google AI Overviews often pull from featured snippet-eligible content — we capture both traditional featured snippets AND AI Overview citations with the same structured content strategy.' },
  { n:'05', title:'AI Overview Schema Implementation', desc:"Deploy FAQPage, HowTo, Article, and Speakable schema that helps Google's AI parse and understand your content structure — improving eligibility for AI Overview citation and voice search." },
  { n:'06', title:'AI Overview Citation Monitoring', desc:'Track which of your pages are cited in Google AI Overviews for your priority queries — with monthly reporting on citation frequency, query coverage, and competitor citation comparison.' },
];

const FAQS = [
  { q:'What are Google AI Overviews and how do they affect my traffic?', a:"Google AI Overviews (formerly Search Generative Experience/SGE) are AI-generated answer summaries that appear at the top of Google search results for many informational and commercial queries. They synthesise information from multiple web sources and cite some of those sources inline. Traffic impact depends on query type: for simple informational queries, AI Overviews may reduce clicks since users get their answer without clicking through. For commercial, complex, or nuanced queries, AI Overview citations can drive high-quality traffic from users who click through to the cited source for more detail. Brands cited in AI Overviews also benefit from the implicit authority signal of being selected by Google's AI." },
  { q:'How does Google decide which sources to cite in AI Overviews?', a:"Google's AI Overview citation algorithm considers: content relevance and semantic match to the query, E-E-A-T signals (expertise, authoritativeness, trustworthiness of the source and author), page quality signals (technical health, Core Web Vitals, structured data), existing ranking position (pages already ranking on page 1 are more likely to be cited), content structure (clear headings, direct answers, appropriate use of lists and tables), and schema markup that helps the AI understand content structure. Being an established, authoritative source in your industry is the strongest predictor of AI Overview citation." },
  { q:'Is Google AI SEO different from traditional Google SEO?', a:'They share the same foundation but the emphasis differs. Traditional SEO focuses on ranking signals: backlinks, keyword relevance, page authority. Google AI SEO emphasises: content structure for AI parsing (clear Q&A format, direct answers), E-E-A-T depth (expert authorship, credentials, original research), topical authority (comprehensive coverage of a subject, not just individual pages), and schema markup that improves AI comprehension. The best approach improves both simultaneously — content optimised for AI Overview citation tends to rank better in traditional results too.' },
  { q:'Will Google AI Overviews replace traditional search results?', a:"Google is unlikely to fully replace traditional blue-link results — many queries (navigational, branded, transactional) don't trigger AI Overviews. However, AI Overviews are expanding to cover more query types, and Google is gradually increasing AI's role in search. The appropriate response is not to optimise exclusively for AI Overviews but to build the content authority and E-E-A-T signals that perform well across both traditional rankings and AI citation surfaces simultaneously." },
  { q:'How do I know if my pages are being cited in Google AI Overviews?', a:"Google Search Console shows AI Overview impressions and clicks for your cited pages under the 'Search type' filter (look for 'AI overview' as a filter option as Google expands this reporting). You can also manually query your priority keywords in Google and observe whether AI Overviews appear and which sources they cite. We provide monthly AI Overview citation tracking as part of our Google AI SEO service — querying your priority keywords systematically and reporting on citation frequency, context, and competitor citation patterns." },
];

const RELATED = [
  { href:'/ai-search-services/', label:'AI Search Services' },
  { href:'/ai-seo-services/', label:'AI SEO Services' },
  { href:'/answer-engine-optimization-services/', label:'Answer Engine Optimization' },
  { href:'/generative-engine-optimization-services/', label:'GEO Services' },
  { href:'/seo-services-company/', label:'SEO Services' },
  { href:'/chatgpt-seo/', label:'ChatGPT SEO' },
  { href:'/perplexity-ai-seo/', label:'Perplexity AI SEO' },
  { href:'/seo-audit-services/', label:'SEO Audit' },
];

const STATS = [
  ['AI Overview Citations Won','800+'],
  ['Avg Impression Increase','62%'],
  ['Years Google SEO Experience','15+'],
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
    <div className="gais-stat-col">
      <div className="gais-stat-val">{started ? n + sfx : val}</div>
      <div className="gais-stat-lbl">{label}</div>
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
        <title>{`Google AI SEO | AI Overviews & Gemini Optimization | 1Solutions`}</title>
        <meta name="description" content={`Google AI SEO services — optimise for Google AI Overviews, Gemini, and AI-powered search features. Get cited in Google's AI-generated answers. US, Canada & Australia.`} />
        <link rel="canonical" href="https://www.1solutions.biz/google-ai-seo/" />
        <meta property="og:title" content={`Google AI SEO | AI Overviews & Gemini Optimization | 1Solutions`} />
        <meta property="og:description" content={`Google AI SEO services — optimise for Google AI Overviews, Gemini, and AI-powered search features. Get cited in Google's AI-generated answers. US, Canada & Australia.`} />
        <meta property="og:url" content="https://www.1solutions.biz/google-ai-seo/" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org',
          '@type':'ProfessionalService',
          name:'1Solutions — Google AI SEO Services',
          url:'https://www.1solutions.biz/google-ai-seo/',
          telephone:'+91-9654327900',
          areaServed:['US','CA','AU','GB'],
          aggregateRating:{'@type':'AggregateRating',ratingValue:'4.9',reviewCount:'150',bestRating:'5'},
          mainEntity:FAQS.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}})),
        }) }} />
        <style>{`
          .gais-hero{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 40%,#0F3460 100%);padding:80px 40px 0;position:relative;overflow:hidden}
          .gais-hero-orb{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.18) 0%,transparent 65%);top:-180px;right:-100px;pointer-events:none;filter:blur(40px)}
          .gais-hero-inner{max-width:1280px;margin:0 auto;padding-bottom:60px}
          .gais-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.85);margin-bottom:24px}
          .gais-h1{font-size:clamp(2rem,4vw,3.2rem);font-weight:900;line-height:1.1;letter-spacing:-1px;color:#fff;margin:0 0 18px}
          .gais-h1 span{background:linear-gradient(90deg,#FCD34D,#F97316);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .gais-sub{font-size:1.05rem;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 34px;max-width:600px}
          .gais-btns{display:flex;gap:14px;flex-wrap:wrap}
          .gais-btn-p{display:inline-flex;align-items:center;gap:8px;background:#D97706;color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(217,119,6,0.35)}
          .gais-btn-p:hover{background:#B45309;transform:translateY(-2px)}
          .gais-btn-g{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.10);backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,0.25);color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s}
          .gais-btn-g:hover{background:rgba(255,255,255,0.18);transform:translateY(-2px)}
          .gais-stats{background:rgba(255,255,255,0.06);border-top:1px solid rgba(255,255,255,0.10);padding:20px 40px}
          .gais-stats-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr)}
          .gais-stat-col{text-align:center;padding:16px;border-right:1px solid rgba(255,255,255,0.10)}
          .gais-stat-col:last-child{border-right:none}
          .gais-stat-val{font-size:1.9rem;font-weight:900;color:#fff;letter-spacing:-1px}
          .gais-stat-lbl{font-size:11px;color:rgba(255,255,255,0.50);font-weight:500;text-transform:uppercase;letter-spacing:1px;margin-top:4px}
          .gais-svc{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px}
          .gais-svc-inner{max-width:1280px;margin:0 auto}
          .gais-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .gais-sec-h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 12px}
          .gais-sec-p{font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 0 44px}
          .gais-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
          .gais-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.05);transition:transform .25s,box-shadow .25s,border-color .25s}
          .gais-card:hover{transform:translateY(-5px);border-color:rgba(217,119,6,0.30);box-shadow:0 14px 42px rgba(15,52,96,0.10)}
          .gais-card-n{position:absolute;top:6px;right:12px;font-size:64px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;pointer-events:none}
          .gais-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin:0 0 8px;position:relative;z-index:1}
          .gais-card p{font-size:13px;color:#4A6080;line-height:1.6;margin:0;position:relative;z-index:1}
          .gais-faq{background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:80px 40px}
          .gais-faq-inner{max-width:860px;margin:0 auto}
          .gais-faq-item{border-bottom:1px solid rgba(15,52,96,0.08)}
          .gais-faq-q{width:100%;background:none;border:none;text-align:left;padding:20px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .gais-faq-q:hover{color:#D97706}
          .gais-faq-icon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all .2s;margin-top:2px}
          .gais-faq-item.open .gais-faq-icon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06)}
          .gais-faq-a{font-size:0.91rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height .35s ease,padding-bottom .35s ease}
          .gais-faq-item.open .gais-faq-a{max-height:600px;padding-bottom:20px}
          .gais-cta{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 100%);padding:70px 40px;text-align:center}
          .gais-cta h2{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#fff;margin:0 0 12px;line-height:1.2}
          .gais-cta p{font-size:15px;color:rgba(255,255,255,0.75);margin:0 0 28px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7}
          .gais-related{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:60px 40px}
          .gais-rel-inner{max-width:1280px;margin:0 auto}
          .gais-rel-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .gais-rel-tag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,0.12);color:#0F3460;transition:all .2s}
          .gais-rel-tag:hover{border-color:#D97706;color:#D97706;background:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(15,52,96,0.08)}
          @media(max-width:1024px){.gais-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){
            .gais-hero,.gais-svc,.gais-faq,.gais-cta,.gais-related{padding:60px 20px}
            .gais-stats,.gais-stats-inner{padding:16px 20px}
            .gais-stats-inner{grid-template-columns:repeat(2,1fr)}
            .gais-grid{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <section className="gais-hero">
        <div className="gais-hero-orb" />
        <div className="gais-hero-inner">
          <span className="gais-eyebrow">
            <span style={{width:6,height:6,borderRadius:'50%',background:'#D97706',display:'inline-block'}} />
            1Solutions AI Practice
          </span>
          <h1 className="gais-h1">Google AI SEO Services<br /><span>Dominate Google AI Overviews</span></h1>
          <p className="gais-sub">Google AI Overviews now appear at the top of search results for millions of queries — above every traditional ranking. We optimise your content to be cited in Google's AI-generated answers, not buried below them.</p>
          <div className="gais-btns">
            <Link href="#contact" className="gais-btn-p">Get a Free Consultation →</Link>
            <Link href="#services" className="gais-btn-g">View Services</Link>
          </div>
        </div>
        <div className="gais-stats" ref={statsRef}>
          <div className="gais-stats-inner">
            {STATS.map(([lbl, val]) => <Stat key={lbl} label={lbl} val={val} started={started} />)}
          </div>
        </div>
      </section>

      <section className="gais-svc" id="services">
        <div className="gais-svc-inner">
          <span className="gais-sec-ey">What We Do</span>
          <h2 className="gais-sec-h2">Google AI SEO Services We Offer</h2>
          <p className="gais-sec-p">Expert google ai seo services for businesses in the US, Canada, and Australia — from strategy through implementation and ongoing optimization.</p>
          <div className="gais-grid">
            {SERVICES.map(s => (
              <div className="gais-card" key={s.n}>
                <span className="gais-card-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gais-faq" id="faq">
        <div className="gais-faq-inner">
          <span className="gais-sec-ey">Got Questions?</span>
          <h2 className="gais-sec-h2">Google AI SEO Services — Frequently Asked Questions</h2>
          <div style={{marginTop:32}}>
            {FAQS.map((f,i) => (
              <div className={`gais-faq-item${openFaq===i?' open':''}`} key={f.q}>
                <button className="gais-faq-q" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                  {f.q}<span className="gais-faq-icon">{openFaq===i?'−':'+'}</span>
                </button>
                <div className="gais-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gais-cta" id="contact">
        <h2>Ready to Get Started with Google AI SEO Services?</h2>
        <p>Speak to our team for a free, no-obligation consultation. We'll assess your current position and recommend the right strategy.</p>
        <Link href="/contact-us/" className="gais-btn-p">Book a Free Consultation →</Link>
      </section>

      <section className="gais-related">
        <div className="gais-rel-inner">
          <span className="gais-sec-ey">Related Services</span>
          <h2 className="gais-sec-h2" style={{fontSize:'1.5rem',margin:'0'}}>Explore Related Offerings</h2>
          <div className="gais-rel-tags">
            {RELATED.map(r => <Link key={r.href} href={r.href} className="gais-rel-tag">{r.label}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
