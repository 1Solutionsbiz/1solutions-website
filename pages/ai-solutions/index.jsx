import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { n:'01', title:'AI Strategy & Roadmap', desc:'Develop a clear, actionable AI strategy for your business — identifying the highest-value automation and intelligence opportunities, recommending the right tools and models, and building a phased roadmap to AI adoption.' },
  { n:'02', title:'Custom AI Development', desc:'Design and build bespoke AI applications, models, and systems tailored to your specific business requirements — from intelligent document processing to predictive analytics and AI-powered decision tools.' },
  { n:'03', title:'AI Automation Solutions', desc:'Automate repetitive, high-volume business processes with AI — data entry, document classification, content generation, customer support routing, lead scoring, and reporting — freeing your team for higher-value work.' },
  { n:'04', title:'AI Analytics & Business Intelligence', desc:'Deploy AI-powered analytics that surface patterns, predict trends, and generate actionable insights from your business data — from sales forecasting to churn prediction and demand planning.' },
  { n:'05', title:'AI for Marketing & Growth', desc:'AI-powered marketing solutions — personalised content delivery, predictive lead scoring, AI-driven ad optimisation, and marketing automation that improves conversion rates at scale.' },
  { n:'06', title:'AI Consulting & Advisory', desc:'Independent AI advisory for businesses evaluating AI investments — vendor assessment, make-vs-buy analysis, AI risk evaluation, and strategic guidance from experienced practitioners without vendor bias.' },
];

const FAQS = [
  { q:'What AI solutions do you offer for small and medium businesses?', a:'For SMEs, we focus on high-impact, cost-effective AI solutions: AI-powered customer support chatbots that handle common queries 24/7; AI content generation for marketing and SEO; AI lead scoring and CRM enrichment; AI-assisted reporting that automates data collection and insight generation; and AI workflow automation using platforms like n8n, Zapier, or Make. SME AI solutions are typically implemented in 4–10 weeks at a fraction of enterprise AI project costs, with measurable ROI visible within the first quarter.' },
  { q:"How do you approach AI strategy for a business that's new to AI?", a:'We start with a discovery workshop that maps your business processes, pain points, and growth goals against AI opportunity areas — identifying where AI will have the highest impact for the least implementation complexity. We then prioritise a 90-day quick-win implementation to demonstrate value fast, followed by a 12-month roadmap of more complex AI integrations. For businesses new to AI, we recommend starting with one high-impact, well-scoped AI use case rather than a broad transformation programme — build confidence and capability before scaling.' },
  { q:'What is the difference between AI solutions and AI integration?', a:"AI Integration specifically refers to connecting existing AI tools, APIs, and models (like OpenAI's API, Anthropic's Claude, or Google's Gemini) to your existing business systems. AI Solutions is a broader term covering the full spectrum: strategy (deciding what to build), integration (connecting existing AI tools), custom development (building new AI capabilities from scratch), and deployment (running AI in production reliably). An AI solution might use pure integration, custom development, or a combination — we recommend the right approach based on your requirements and budget." },
  { q:'How do you ensure AI solutions are secure and compliant?', a:'Security and compliance are built into every AI solution we deliver: data minimisation (only processing data the AI needs), encryption in transit and at rest, role-based access controls for AI systems, compliance review for regulated industries (healthcare HIPAA, finance GDPR, etc.), vendor data handling assessment (ensuring AI providers meet your compliance requirements), audit logging of AI actions and decisions, and human oversight mechanisms for high-stakes AI decisions. We advise on the appropriate compliance architecture for your industry and jurisdiction before implementation begins.' },
  { q:'How do you measure ROI from AI solutions?', a:'ROI metrics depend on the AI use case: for automation solutions, we track hours saved per week and cost per automated task vs manual cost; for AI content solutions, we measure content output volume, quality metrics, and SEO performance; for AI customer support, we track ticket deflection rate and resolution time; for AI analytics, we measure decision quality improvement and planning accuracy; for AI marketing, we track lead quality, conversion rates, and customer acquisition cost. We define ROI measurement frameworks before each project so success metrics are clear from day one.' },
];

const RELATED = [
  { href:'/ai-integration-services/', label:'AI Integration Services' },
  { href:'/generative-ai-services/', label:'Generative AI Services' },
  { href:'/ai-automation-services/', label:'AI Automation Services' },
  { href:'/ai-chatbot-development-services/', label:'AI Chatbot Development' },
  { href:'/ai-agent-development-services/', label:'AI Agent Development' },
  { href:'/ai-utilization-review/', label:'AI Utilization Review' },
  { href:'/ai-seo-services/', label:'AI SEO Services' },
  { href:'/ai-search-services/', label:'AI Search Services' },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Head>
        <title>{`AI Solutions | Custom AI for Business Growth | 1Solutions`}</title>
        <meta name="description" content={`Custom AI solutions — AI strategy, development, integration, and deployment for business automation, intelligence, and growth. Serving US, Canada & Australia since 2008.`} />
        <link rel="canonical" href="https://www.1solutions.biz/ai-solutions/" />
        <meta property="og:title" content={`AI Solutions | Custom AI for Business Growth | 1Solutions`} />
        <meta property="og:description" content={`Custom AI solutions — AI strategy, development, integration, and deployment for business automation, intelligence, and growth. Serving US, Canada & Australia since 2008.`} />
        <meta property="og:url" content="https://www.1solutions.biz/ai-solutions/" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-ai-solutions.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions AI Solutions" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-ai-solutions.jpg" />
        <meta name="twitter:image:alt" content="1Solutions AI Solutions" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org',
          '@type':'ProfessionalService',
          name:'1Solutions — AI Solutions',
          url:'https://www.1solutions.biz/ai-solutions/',
          telephone:'+91-9654327900',
          areaServed:['US','CA','AU','GB'],
          aggregateRating:{'@type':'AggregateRating',ratingValue:'4.9',reviewCount:'150',bestRating:'5'},
          mainEntity:FAQS.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}})),
        }) }} />
        <style>{`
          .aisol-btn-p{display:inline-flex;align-items:center;gap:8px;background:#D97706;color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(217,119,6,0.35)}
          .aisol-btn-p:hover{background:#B45309;transform:translateY(-2px)}
          .aisol-svc{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px}
          .aisol-svc-inner{max-width:1280px;margin:0 auto}
          .aisol-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .aisol-sec-h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 12px}
          .aisol-sec-p{font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 0 44px}
          .aisol-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
          .aisol-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.05);transition:transform .25s,box-shadow .25s,border-color .25s}
          .aisol-card:hover{transform:translateY(-5px);border-color:rgba(217,119,6,0.30);box-shadow:0 14px 42px rgba(15,52,96,0.10)}
          .aisol-card-n{position:absolute;top:6px;right:12px;font-size:64px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;pointer-events:none}
          .aisol-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin:0 0 8px;position:relative;z-index:1}
          .aisol-card p{font-size:13px;color:#4A6080;line-height:1.6;margin:0;position:relative;z-index:1}
          .aisol-faq{background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:80px 40px}
          .aisol-faq-inner{max-width:860px;margin:0 auto}
          .aisol-faq-item{border-bottom:1px solid rgba(15,52,96,0.08)}
          .aisol-faq-q{width:100%;background:none;border:none;text-align:left;padding:20px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .aisol-faq-q:hover{color:#D97706}
          .aisol-faq-icon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all .2s;margin-top:2px}
          .aisol-faq-item.open .aisol-faq-icon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06)}
          .aisol-faq-a{font-size:0.91rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height .35s ease,padding-bottom .35s ease}
          .aisol-faq-item.open .aisol-faq-a{max-height:600px;padding-bottom:20px}
          .aisol-cta{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 100%);padding:70px 40px;text-align:center}
          .aisol-cta h2{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#fff;margin:0 0 12px;line-height:1.2}
          .aisol-cta p{font-size:15px;color:rgba(255,255,255,0.75);margin:0 0 28px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7}
          .aisol-related{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:60px 40px}
          .aisol-rel-inner{max-width:1280px;margin:0 auto}
          .aisol-rel-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .aisol-rel-tag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,0.12);color:#0F3460;transition:all .2s}
          .aisol-rel-tag:hover{border-color:#D97706;color:#D97706;background:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(15,52,96,0.08)}
          @media(max-width:1024px){.aisol-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){
            .aisol-svc,.aisol-faq,.aisol-cta,.aisol-related{padding:60px 20px}
            .aisol-grid{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <ServiceHero
        eyebrow="1Solutions AI Practice"
        title={<>AI Solutions — <AuroraText>AI That Drives Real Business Results</AuroraText></>}
        subtext="From AI strategy and custom model development to enterprise integrations and AI-powered products — we design and build AI solutions that solve real business problems, not just proof-of-concepts."
        primaryCta={{ label: 'Get a Free Consultation →', href: '#contact' }}
        secondaryCta={{ label: 'View Services', href: '#services' }}
        stats={[
          { label: 'AI Solutions Delivered', value: '250', suffix: '+' },
          { label: 'Business Functions Automated', value: '40', suffix: '+' },
          { label: 'Years Tech Experience', value: '15', suffix: '+' },
          { label: 'Client Retention', value: '97', suffix: '%' },
        ]}
      />

      <section className="aisol-svc" id="services">
        <div className="aisol-svc-inner">
          <span className="aisol-sec-ey">What We Do</span>
          <h2 className="aisol-sec-h2">AI Solutions We Offer</h2>
          <p className="aisol-sec-p">Expert ai solutions for businesses in the US, Canada, and Australia — from strategy through implementation and ongoing optimization.</p>
          <div className="aisol-grid">
            {SERVICES.map(s => (
              <div className="aisol-card" key={s.n}>
                <span className="aisol-card-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aisol-faq" id="faq">
        <div className="aisol-faq-inner">
          <span className="aisol-sec-ey">Got Questions?</span>
          <h2 className="aisol-sec-h2">AI Solutions — Frequently Asked Questions</h2>
          <div style={{marginTop:32}}>
            {FAQS.map((f,i) => (
              <div className={`aisol-faq-item${openFaq===i?' open':''}`} key={f.q}>
                <button className="aisol-faq-q" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                  {f.q}<span className="aisol-faq-icon">{openFaq===i?'−':'+'}</span>
                </button>
                <div className="aisol-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aisol-cta" id="contact">
        <h2>Ready to Get Started with AI Solutions?</h2>
        <p>Speak to our team for a free, no-obligation consultation. We'll assess your current position and recommend the right strategy.</p>
        <Link href="/contact-us/" className="aisol-btn-p">Book a Free Consultation →</Link>
      </section>

      <section className="aisol-related">
        <div className="aisol-rel-inner">
          <span className="aisol-sec-ey">Related Services</span>
          <h2 className="aisol-sec-h2" style={{fontSize:'1.5rem',margin:'0'}}>Explore Related Offerings</h2>
          <div className="aisol-rel-tags">
            {RELATED.map(r => <Link key={r.href} href={r.href} className="aisol-rel-tag">{r.label}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
