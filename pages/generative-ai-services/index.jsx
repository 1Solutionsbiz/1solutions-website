import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'AI Content Generation Systems', desc:'Design and build scalable AI content pipelines — blog posts, product descriptions, email campaigns, social content, and SEO articles generated at scale with human editorial oversight and brand voice consistency.' },
  { n:'02', title:'AI Image & Creative Generation', desc:'Midjourney, DALL-E, Stable Diffusion, and Flux integration for automated product imagery, creative assets, social graphics, and design variations — reducing creative production costs while increasing output volume.' },
  { n:'03', title:'RAG Application Development', desc:'Retrieval-augmented generation systems that connect LLMs to your proprietary data — customer databases, product knowledge bases, documentation, and internal systems — for accurate, grounded AI responses.' },
  { n:'04', title:'Custom LLM Fine-Tuning', desc:'Fine-tune open-source language models (Llama, Mistral, Falcon) on your specific domain data — creating specialised AI models that understand your industry terminology, brand voice, and use-case nuances.' },
  { n:'05', title:'AI-Powered Customer Experiences', desc:'Generative AI for customer-facing applications — personalised product recommendations, dynamic content generation, AI-generated email personalisation, and intelligent FAQ systems that adapt to individual users.' },
  { n:'06', title:'Multimodal AI Applications', desc:'Build applications that process and generate text, images, audio, and video together — product analysis from uploaded images, video transcription and summarisation, and voice interface AI that goes beyond text-only interactions.' },
];

const FAQS = [
  { q:'What are Generative AI Services?', a:'Generative AI Services refer to the design, development, and deployment of applications and workflows powered by generative artificial intelligence models — AI that creates new content (text, images, audio, video, code) rather than only classifying or analysing existing content. Examples include: AI writing tools that generate blog posts and product descriptions; image generation systems that create product photography or design variations; chatbots that generate personalised responses rather than selecting from pre-written answers; and AI applications that summarise, translate, or transform existing content. Generative AI Services cover both the strategic design of what to build and the technical implementation of building it.' },
  { q:'Which generative AI models do you build with?', a:'We build with all major generative AI models: OpenAI GPT-4o and GPT-4.1 for text generation; DALL-E 3 and GPT-4V for image generation and vision; Anthropic Claude Sonnet and Opus for long-context text generation; Google Gemini Pro and Ultra for multimodal applications; Meta Llama 3 and 3.1 for on-premise or custom-deployment text generation; Stability AI Stable Diffusion and SDXL for image generation; Midjourney via API for high-quality creative imagery; ElevenLabs and Udio for audio and music generation; and RunwayML, Kling, and Sora (when available) for video generation.' },
  { q:'What is a RAG application and do I need one?', a:'RAG (Retrieval-Augmented Generation) is an AI architecture where an LLM is connected to an external knowledge base — your documents, database, product catalogue, or internal wiki — that it retrieves relevant information from before generating a response. This solves the key limitation of base LLMs: they only know what they were trained on. With RAG, an AI assistant can answer questions about your specific products, policies, or internal data accurately, rather than hallucinating or giving generic answers. You need RAG if you want AI that knows your business specifically — customer-facing chatbots, internal knowledge assistants, support agents, and product advisors all benefit from RAG architecture.' },
  { q:'How do you handle AI content quality and accuracy?', a:'We build quality controls into every AI content system: human editorial review workflows for high-stakes content (medical, legal, financial, brand-critical); fact-checking layers that verify generated content against source material; brand voice guidelines embedded in system prompts; toxicity and bias filtering; output validation against required format and length specifications; and A/B testing frameworks that measure generated content performance against human-written benchmarks. AI content without quality controls produces volume without value — our systems are designed to produce both.' },
  { q:'What industries benefit most from Generative AI Services?', a:'eCommerce (product description generation, AI product photography, personalised recommendations), media and publishing (AI-assisted content creation at scale, content repurposing), marketing agencies (campaign asset generation, copy variation, creative production), SaaS companies (in-product AI features, customer onboarding automation), legal and financial services (document drafting, contract analysis, report generation), healthcare (medical content generation, patient communication), and education (personalised learning content, AI tutoring tools). Virtually every industry has high-value generative AI use cases — the opportunity varies by content volume and content value, not by sector.' },
];

const RELATED = [
  { href:'/ai-solutions/', label:'AI Solutions' },
  { href:'/ai-integration-services/', label:'AI Integration Services' },
  { href:'/ai-automation-services/', label:'AI Automation Services' },
  { href:'/ai-chatbot-development-services/', label:'AI Chatbot Development' },
  { href:'/ai-agent-development-services/', label:'AI Agent Development' },
  { href:'/ai-utilization-review/', label:'AI Utilization Review' },
  { href:'/generative-engine-optimization-services/', label:'GEO Services' },
  { href:'/content-marketing-services/', label:'Content Marketing' },
];

const STATS = [
  ['GenAI Projects Delivered','120+'],
  ['AI Models Worked With','20+'],
  ['Years Tech Experience','15+'],
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
    <div className="genas-stat-col">
      <div className="genas-stat-val">{started ? n + sfx : val}</div>
      <div className="genas-stat-lbl">{label}</div>
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
        <title>{`Generative AI Services | Custom GenAI Solutions | 1Solutions`}</title>
        <meta name="description" content={`Generative AI services — custom GenAI applications, AI content systems, image generation, RAG pipelines, and AI workflow automation for US, Canada & Australia businesses.`} />
        <link rel="canonical" href="https://www.1solutions.biz/generative-ai-services/" />
        <meta property="og:title" content={`Generative AI Services | Custom GenAI Solutions | 1Solutions`} />
        <meta property="og:description" content={`Generative AI services — custom GenAI applications, AI content systems, image generation, RAG pipelines, and AI workflow automation for US, Canada & Australia businesses.`} />
        <meta property="og:url" content="https://www.1solutions.biz/generative-ai-services/" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org',
          '@type':'ProfessionalService',
          name:'1Solutions — Generative AI Services',
          url:'https://www.1solutions.biz/generative-ai-services/',
          telephone:'+91-9654327900',
          areaServed:['US','CA','AU','GB'],
          aggregateRating:{'@type':'AggregateRating',ratingValue:'4.9',reviewCount:'150',bestRating:'5'},
          mainEntity:FAQS.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}})),
        }) }} />
        <style>{`
          .genas-hero{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 40%,#0F3460 100%);padding:80px 40px 0;position:relative;overflow:hidden}
          .genas-hero-orb{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.18) 0%,transparent 65%);top:-180px;right:-100px;pointer-events:none;filter:blur(40px)}
          .genas-hero-inner{max-width:1280px;margin:0 auto;padding-bottom:60px}
          .genas-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.85);margin-bottom:24px}
          .genas-h1{font-size:clamp(2rem,4vw,3.2rem);font-weight:900;line-height:1.1;letter-spacing:-1px;color:#fff;margin:0 0 18px}
          .genas-h1 span{background:linear-gradient(90deg,#FCD34D,#F97316);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .genas-sub{font-size:1.05rem;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 34px;max-width:600px}
          .genas-btns{display:flex;gap:14px;flex-wrap:wrap}
          .genas-btn-p{display:inline-flex;align-items:center;gap:8px;background:#D97706;color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(217,119,6,0.35)}
          .genas-btn-p:hover{background:#B45309;transform:translateY(-2px)}
          .genas-btn-g{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.10);backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,0.25);color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s}
          .genas-btn-g:hover{background:rgba(255,255,255,0.18);transform:translateY(-2px)}
          .genas-stats{background:rgba(255,255,255,0.06);border-top:1px solid rgba(255,255,255,0.10);padding:20px 40px}
          .genas-stats-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr)}
          .genas-stat-col{text-align:center;padding:16px;border-right:1px solid rgba(255,255,255,0.10)}
          .genas-stat-col:last-child{border-right:none}
          .genas-stat-val{font-size:1.9rem;font-weight:900;color:#fff;letter-spacing:-1px}
          .genas-stat-lbl{font-size:11px;color:rgba(255,255,255,0.50);font-weight:500;text-transform:uppercase;letter-spacing:1px;margin-top:4px}
          .genas-svc{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px}
          .genas-svc-inner{max-width:1280px;margin:0 auto}
          .genas-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .genas-sec-h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 12px}
          .genas-sec-p{font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 0 44px}
          .genas-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
          .genas-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.05);transition:transform .25s,box-shadow .25s,border-color .25s}
          .genas-card:hover{transform:translateY(-5px);border-color:rgba(217,119,6,0.30);box-shadow:0 14px 42px rgba(15,52,96,0.10)}
          .genas-card-n{position:absolute;top:6px;right:12px;font-size:64px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;pointer-events:none}
          .genas-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin:0 0 8px;position:relative;z-index:1}
          .genas-card p{font-size:13px;color:#4A6080;line-height:1.6;margin:0;position:relative;z-index:1}
          .genas-faq{background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:80px 40px}
          .genas-faq-inner{max-width:860px;margin:0 auto}
          .genas-faq-item{border-bottom:1px solid rgba(15,52,96,0.08)}
          .genas-faq-q{width:100%;background:none;border:none;text-align:left;padding:20px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .genas-faq-q:hover{color:#D97706}
          .genas-faq-icon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all .2s;margin-top:2px}
          .genas-faq-item.open .genas-faq-icon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06)}
          .genas-faq-a{font-size:0.91rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height .35s ease,padding-bottom .35s ease}
          .genas-faq-item.open .genas-faq-a{max-height:600px;padding-bottom:20px}
          .genas-cta{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 100%);padding:70px 40px;text-align:center}
          .genas-cta h2{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#fff;margin:0 0 12px;line-height:1.2}
          .genas-cta p{font-size:15px;color:rgba(255,255,255,0.75);margin:0 0 28px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7}
          .genas-related{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:60px 40px}
          .genas-rel-inner{max-width:1280px;margin:0 auto}
          .genas-rel-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .genas-rel-tag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,0.12);color:#0F3460;transition:all .2s}
          .genas-rel-tag:hover{border-color:#D97706;color:#D97706;background:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(15,52,96,0.08)}
          @media(max-width:1024px){.genas-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){
            .genas-hero,.genas-svc,.genas-faq,.genas-cta,.genas-related{padding:60px 20px}
            .genas-stats,.genas-stats-inner{padding:16px 20px}
            .genas-stats-inner{grid-template-columns:repeat(2,1fr)}
            .genas-grid{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <section className="genas-hero">
        <div className="genas-hero-orb" />
        <div className="genas-hero-inner">
          <span className="genas-eyebrow">
            <span style={{width:6,height:6,borderRadius:'50%',background:'#D97706',display:'inline-block'}} />
            1Solutions AI Practice
          </span>
          <h1 className="genas-h1">Generative AI Services<br /><span>Build with Generative AI</span></h1>
          <p className="genas-sub">From AI content pipelines to image generation workflows, RAG applications, and multi-modal AI products — we design, build, and deploy generative AI solutions that create real business value.</p>
          <div className="genas-btns">
            <Link href="#contact" className="genas-btn-p">Get a Free Consultation →</Link>
            <Link href="#services" className="genas-btn-g">View Services</Link>
          </div>
        </div>
        <div className="genas-stats" ref={statsRef}>
          <div className="genas-stats-inner">
            {STATS.map(([lbl, val]) => <Stat key={lbl} label={lbl} val={val} started={started} />)}
          </div>
        </div>
      </section>

      <section className="genas-svc" id="services">
        <div className="genas-svc-inner">
          <span className="genas-sec-ey">What We Do</span>
          <h2 className="genas-sec-h2">Generative AI Services We Offer</h2>
          <p className="genas-sec-p">Expert generative ai services for businesses in the US, Canada, and Australia — from strategy through implementation and ongoing optimization.</p>
          <div className="genas-grid">
            {SERVICES.map(s => (
              <div className="genas-card" key={s.n}>
                <span className="genas-card-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="genas-faq" id="faq">
        <div className="genas-faq-inner">
          <span className="genas-sec-ey">Got Questions?</span>
          <h2 className="genas-sec-h2">Generative AI Services — Frequently Asked Questions</h2>
          <div style={{marginTop:32}}>
            {FAQS.map((f,i) => (
              <div className={`genas-faq-item${openFaq===i?' open':''}`} key={f.q}>
                <button className="genas-faq-q" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                  {f.q}<span className="genas-faq-icon">{openFaq===i?'−':'+'}</span>
                </button>
                <div className="genas-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="genas-cta" id="contact">
        <h2>Ready to Get Started with Generative AI Services?</h2>
        <p>Speak to our team for a free, no-obligation consultation. We'll assess your current position and recommend the right strategy.</p>
        <Link href="/contact-us/" className="genas-btn-p">Book a Free Consultation →</Link>
      </section>

      <section className="genas-related">
        <div className="genas-rel-inner">
          <span className="genas-sec-ey">Related Services</span>
          <h2 className="genas-sec-h2" style={{fontSize:'1.5rem',margin:'0'}}>Explore Related Offerings</h2>
          <div className="genas-rel-tags">
            {RELATED.map(r => <Link key={r.href} href={r.href} className="genas-rel-tag">{r.label}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
