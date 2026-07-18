import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'AI Tool Audit', desc:'Comprehensive audit of every AI tool and subscription your business currently uses — evaluating utilisation rates, ROI, feature coverage gaps, and overlapping tools that can be consolidated.' },
  { n:'02', title:'Workflow Opportunity Mapping', desc:'Map your business workflows against AI automation opportunities — identifying tasks currently done manually that could be automated, and tasks currently using AI sub-optimally that need better tooling or prompting.' },
  { n:'03', title:'AI Cost Benchmarking', desc:"Compare your AI spend against industry benchmarks and identify where you're over-spending on tools relative to value — most businesses can reduce AI tool costs by 20-40% through consolidation and right-sizing." },
  { n:'04', title:'Team Capability Assessment', desc:'Assess how effectively your team is using AI tools — identifying training gaps, prompting skill deficiencies, and adoption barriers preventing your team from extracting full value from existing AI investments.' },
  { n:'05', title:'AI Roadmap Development', desc:'Deliver a prioritised 12-month AI adoption roadmap — sequenced by ROI potential and implementation complexity — covering new tools to adopt, integrations to build, and workflows to automate.' },
  { n:'06', title:'Implementation Support', desc:'Optional hands-on support to implement the AI Utilization Review recommendations — tool integration, workflow automation builds, team training, and ongoing optimisation reviews.' },
];

const FAQS = [
  { q:'What is an AI Utilization Review?', a:"An AI Utilization Review is a structured audit of how your business currently uses artificial intelligence tools, models, and workflows — evaluating whether you're getting sufficient value from your AI investment and identifying opportunities to do more. The review covers: which AI tools you use and how extensively, which manual workflows could be automated with existing AI tools, where AI tools are being used for the wrong tasks, cost optimisation opportunities through tool consolidation, and team capability gaps that prevent full AI adoption. The output is a prioritised recommendations report and 12-month AI adoption roadmap." },
  { q:'Who is an AI Utilization Review for?', a:"AI Utilization Reviews are most valuable for: businesses that have subscribed to multiple AI tools but aren't sure if they're getting value; marketing and operations teams trying to build an AI adoption strategy; companies that have heard they 'should be using AI more' but don't have a clear starting point; businesses spending $1,000+ per month on AI tools and wanting to validate ROI; and companies preparing for AI-driven growth who want a current-state baseline before investing further. The review works for any size business — from SMEs using a handful of AI tools to enterprises running complex multi-model AI stacks." },
  { q:'What AI tools do you evaluate in an AI Utilization Review?', a:'We evaluate all major AI tool categories: language models and chatbots (ChatGPT, Claude, Gemini, Copilot); AI writing and content tools (Jasper, Copy.ai, Notion AI, Grammarly Business); AI image and video generation (Midjourney, DALL-E, RunwayML, Kling); AI SEO tools (Surfer SEO, MarketMuse, Clearscope, BrightEdge); AI coding assistants (GitHub Copilot, Cursor, Replit AI); AI analytics and BI tools (Tableau AI, Power BI Copilot, Qlik AI); AI customer service tools (Intercom AI, Freshdesk AI, Zendesk AI); AI sales tools (Clay, Apollo AI, Gong); and AI automation platforms (Zapier AI, Make/Integromat AI, n8n AI).' },
  { q:'How long does an AI Utilization Review take?', a:'A standard AI Utilization Review takes 2–3 weeks from kickoff to delivery: 1 week for stakeholder interviews and tool access review, 1 week for analysis and workflow mapping, and 3–5 days for recommendations report and roadmap creation. We deliver a written report with a prioritised recommendations matrix and attend a readout session to walk your team through the findings. An accelerated 1-week review is available for smaller businesses with simpler tool stacks.' },
  { q:'What ROI can I expect from an AI Utilization Review?', a:"Typical findings include: 20–40% potential reduction in AI tool costs through consolidation and right-sizing; 5–15 high-value automation opportunities that could save 10–40+ hours per week of manual work; identification of 2–4 AI capabilities available in tools the business already pays for but hasn't activated. Most businesses recover the cost of the review within the first month of implementing even one major recommendation. The roadmap also prevents costly new AI investments in tools that overlap with existing subscriptions." },
];

const RELATED = [
  { href:'/ai-solutions/', label:'AI Solutions' },
  { href:'/ai-integration-services/', label:'AI Integration Services' },
  { href:'/generative-ai-services/', label:'Generative AI Services' },
  { href:'/ai-automation-services/', label:'AI Automation Services' },
  { href:'/ai-chatbot-development-services/', label:'AI Chatbot Development' },
  { href:'/ai-agent-development-services/', label:'AI Agent Development' },
  { href:'/analytics-cro-services/', label:'Analytics & CRO' },
  { href:'/digital-marketing-services/', label:'Digital Marketing' },
];

const STATS = [
  ['Businesses Reviewed','180+'],
  ['Avg Cost Saving Found','34%'],
  ['AI Tools Evaluated','50+'],
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
    <div className="aiur-stat-col">
      <div className="aiur-stat-val">{started ? n + sfx : val}</div>
      <div className="aiur-stat-lbl">{label}</div>
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
        <title>{`AI Utilization Review | Audit Your AI Tool ROI | 1Solutions`}</title>
        <meta name="description" content={`AI Utilization Review — audit how your business uses AI tools, identify gaps, and build a roadmap to maximise ROI from AI investment. US, Canada & Australia.`} />
        <link rel="canonical" href="https://www.1solutions.biz/ai-utilization-review/" />
        <meta property="og:title" content={`AI Utilization Review | Audit Your AI Tool ROI | 1Solutions`} />
        <meta property="og:description" content={`AI Utilization Review — audit how your business uses AI tools, identify gaps, and build a roadmap to maximise ROI from AI investment. US, Canada & Australia.`} />
        <meta property="og:url" content="https://www.1solutions.biz/ai-utilization-review/" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org',
          '@type':'ProfessionalService',
          name:'1Solutions — AI Utilization Review',
          url:'https://www.1solutions.biz/ai-utilization-review/',
          telephone:'+91-9654327900',
          areaServed:['US','CA','AU','GB'],
          aggregateRating:{'@type':'AggregateRating',ratingValue:'4.9',reviewCount:'150',bestRating:'5'},
          mainEntity:FAQS.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}})),
        }) }} />
        <style>{`
          .aiur-hero{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 40%,#0F3460 100%);padding:80px 40px 0;position:relative;overflow:hidden}
          .aiur-hero-orb{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.18) 0%,transparent 65%);top:-180px;right:-100px;pointer-events:none;filter:blur(40px)}
          .aiur-hero-inner{max-width:1280px;margin:0 auto;padding-bottom:60px}
          .aiur-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.85);margin-bottom:24px}
          .aiur-h1{font-size:clamp(2rem,4vw,3.2rem);font-weight:900;line-height:1.1;letter-spacing:-1px;color:#fff;margin:0 0 18px}
          .aiur-h1 span{background:linear-gradient(90deg,#FCD34D,#F97316);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .aiur-sub{font-size:1.05rem;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 34px;max-width:600px}
          .aiur-btns{display:flex;gap:14px;flex-wrap:wrap}
          .aiur-btn-p{display:inline-flex;align-items:center;gap:8px;background:#D97706;color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(217,119,6,0.35)}
          .aiur-btn-p:hover{background:#B45309;transform:translateY(-2px)}
          .aiur-btn-g{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.10);backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,0.25);color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s}
          .aiur-btn-g:hover{background:rgba(255,255,255,0.18);transform:translateY(-2px)}
          .aiur-stats{background:rgba(255,255,255,0.06);border-top:1px solid rgba(255,255,255,0.10);padding:20px 40px}
          .aiur-stats-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr)}
          .aiur-stat-col{text-align:center;padding:16px;border-right:1px solid rgba(255,255,255,0.10)}
          .aiur-stat-col:last-child{border-right:none}
          .aiur-stat-val{font-size:1.9rem;font-weight:900;color:#fff;letter-spacing:-1px}
          .aiur-stat-lbl{font-size:11px;color:rgba(255,255,255,0.50);font-weight:500;text-transform:uppercase;letter-spacing:1px;margin-top:4px}
          .aiur-svc{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px}
          .aiur-svc-inner{max-width:1280px;margin:0 auto}
          .aiur-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .aiur-sec-h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 12px}
          .aiur-sec-p{font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 0 44px}
          .aiur-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
          .aiur-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.05);transition:transform .25s,box-shadow .25s,border-color .25s}
          .aiur-card:hover{transform:translateY(-5px);border-color:rgba(217,119,6,0.30);box-shadow:0 14px 42px rgba(15,52,96,0.10)}
          .aiur-card-n{position:absolute;top:6px;right:12px;font-size:64px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;pointer-events:none}
          .aiur-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin:0 0 8px;position:relative;z-index:1}
          .aiur-card p{font-size:13px;color:#4A6080;line-height:1.6;margin:0;position:relative;z-index:1}
          .aiur-faq{background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:80px 40px}
          .aiur-faq-inner{max-width:860px;margin:0 auto}
          .aiur-faq-item{border-bottom:1px solid rgba(15,52,96,0.08)}
          .aiur-faq-q{width:100%;background:none;border:none;text-align:left;padding:20px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .aiur-faq-q:hover{color:#D97706}
          .aiur-faq-icon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all .2s;margin-top:2px}
          .aiur-faq-item.open .aiur-faq-icon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06)}
          .aiur-faq-a{font-size:0.91rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height .35s ease,padding-bottom .35s ease}
          .aiur-faq-item.open .aiur-faq-a{max-height:600px;padding-bottom:20px}
          .aiur-cta{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 100%);padding:70px 40px;text-align:center}
          .aiur-cta h2{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#fff;margin:0 0 12px;line-height:1.2}
          .aiur-cta p{font-size:15px;color:rgba(255,255,255,0.75);margin:0 0 28px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7}
          .aiur-related{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:60px 40px}
          .aiur-rel-inner{max-width:1280px;margin:0 auto}
          .aiur-rel-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .aiur-rel-tag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,0.12);color:#0F3460;transition:all .2s}
          .aiur-rel-tag:hover{border-color:#D97706;color:#D97706;background:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(15,52,96,0.08)}
          @media(max-width:1024px){.aiur-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){
            .aiur-hero,.aiur-svc,.aiur-faq,.aiur-cta,.aiur-related{padding:60px 20px}
            .aiur-stats,.aiur-stats-inner{padding:16px 20px}
            .aiur-stats-inner{grid-template-columns:repeat(2,1fr)}
            .aiur-grid{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <section className="aiur-hero">
        <div className="aiur-hero-orb" />
        <div className="aiur-hero-inner">
          <span className="aiur-eyebrow">
            <span style={{width:6,height:6,borderRadius:'50%',background:'#D97706',display:'inline-block'}} />
            1Solutions AI Practice
          </span>
          <h1 className="aiur-h1">AI Utilization Review<br /><span>Get More From Your AI Investment</span></h1>
          <p className="aiur-sub">Most businesses are paying for AI tools they underuse, using AI for the wrong tasks, or missing high-value automation opportunities entirely. Our AI Utilization Review shows you exactly where you stand — and what to do next.</p>
          <div className="aiur-btns">
            <Link href="#contact" className="aiur-btn-p">Get a Free Consultation →</Link>
            <Link href="#services" className="aiur-btn-g">View Services</Link>
          </div>
        </div>
        <div className="aiur-stats" ref={statsRef}>
          <div className="aiur-stats-inner">
            {STATS.map(([lbl, val]) => <Stat key={lbl} label={lbl} val={val} started={started} />)}
          </div>
        </div>
      </section>

      <section className="aiur-svc" id="services">
        <div className="aiur-svc-inner">
          <span className="aiur-sec-ey">What We Do</span>
          <h2 className="aiur-sec-h2">AI Utilization Review We Offer</h2>
          <p className="aiur-sec-p">Expert ai utilization review for businesses in the US, Canada, and Australia — from strategy through implementation and ongoing optimization.</p>
          <div className="aiur-grid">
            {SERVICES.map(s => (
              <div className="aiur-card" key={s.n}>
                <span className="aiur-card-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aiur-faq" id="faq">
        <div className="aiur-faq-inner">
          <span className="aiur-sec-ey">Got Questions?</span>
          <h2 className="aiur-sec-h2">AI Utilization Review — Frequently Asked Questions</h2>
          <div style={{marginTop:32}}>
            {FAQS.map((f,i) => (
              <div className={`aiur-faq-item${openFaq===i?' open':''}`} key={f.q}>
                <button className="aiur-faq-q" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                  {f.q}<span className="aiur-faq-icon">{openFaq===i?'−':'+'}</span>
                </button>
                <div className="aiur-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aiur-cta" id="contact">
        <h2>Ready to Get Started with AI Utilization Review?</h2>
        <p>Speak to our team for a free, no-obligation consultation. We'll assess your current position and recommend the right strategy.</p>
        <Link href="/contact-us/" className="aiur-btn-p">Book a Free Consultation →</Link>
      </section>

      <section className="aiur-related">
        <div className="aiur-rel-inner">
          <span className="aiur-sec-ey">Related Services</span>
          <h2 className="aiur-sec-h2" style={{fontSize:'1.5rem',margin:'0'}}>Explore Related Offerings</h2>
          <div className="aiur-rel-tags">
            {RELATED.map(r => <Link key={r.href} href={r.href} className="aiur-rel-tag">{r.label}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
