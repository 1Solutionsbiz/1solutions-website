import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { n:'01', title:'Meta AI Brand Visibility Audit', desc:"Audit your brand's current presence in Meta AI responses across Facebook, Instagram, and WhatsApp — identifying citation gaps, competitor visibility, and the content signals to improve." },
  { n:'02', title:'Social Media Authority Building', desc:'Meta AI draws heavily on social proof signals — page authority, engagement rate, brand mentions, and verified page status. We build the social media authority that makes Meta AI recommend your brand.' },
  { n:'03', title:'Facebook & Instagram Page Optimization', desc:'Optimise your Facebook Business Page and Instagram profile for Meta AI retrieval — complete information, structured service descriptions, category optimisation, and active content that Meta AI can surface.' },
  { n:'04', title:'Brand Entity & Knowledge Graph', desc:"Build your brand entity in Meta's knowledge systems — ensuring accurate brand information, product descriptions, and business details are structured and accessible for Meta AI's recommendation engine." },
  { n:'05', title:'Review & Rating Signals', desc:"Meta AI surfaces businesses based partly on review signals. We build strategies to increase genuine review volume and ratings on Meta platforms — improving your brand's AI recommendation eligibility." },
  { n:'06', title:'WhatsApp Business AI Readiness', desc:'Optimise your WhatsApp Business presence for Meta AI integration — complete business profiles, catalogue setup, and automated messaging that aligns with how Meta AI responds to commerce queries.' },
];

const FAQS = [
  { q:'What is Meta AI and how does it affect my business?', a:"Meta AI is an artificial intelligence assistant built into Facebook, Instagram, WhatsApp, and Messenger. Users can ask Meta AI questions directly within these platforms — product recommendations, local business suggestions, how-to advice, and general knowledge queries. Meta AI draws on a combination of Llama model training data, real-time web search, and Meta's own social graph data to generate answers and recommendations. For businesses, Meta AI represents a new discovery channel — users asking Meta AI about your industry, products, or services on platforms where your brand already has a presence." },
  { q:'How does Meta AI decide which businesses to recommend?', a:"Meta AI's business recommendation signals include: Facebook Business Page completeness and quality, Instagram Business profile optimisation, review volume and rating on Facebook, social engagement and activity signals, brand mentions across Meta platforms, business verification status, and real-time web data retrieved by Meta AI's search integration. Businesses with optimised Meta presence, strong review profiles, and active social content are more likely to be surfaced by Meta AI than those with incomplete profiles or low engagement." },
  { q:'Is Meta AI optimization the same as Facebook SEO?', a:"Meta AI optimization extends traditional Facebook SEO (page completeness, keyword optimisation in page descriptions, review management) by additionally considering: how your brand is described and discussed across the web (Meta AI retrieves external web content), your brand's knowledge graph presence, and the structured data on your website that Meta's crawlers can parse. A comprehensive Meta AI strategy combines on-platform optimization (Facebook, Instagram, WhatsApp Business) with off-platform authority signals that Meta AI retrieves from the broader web." },
  { q:'Which Meta platforms should I prioritise for Meta AI?', a:'Priority depends on your audience and business type. Facebook: still dominant for local businesses, B2C services, and 35+ audiences — Meta AI is deeply integrated in Facebook Messenger. Instagram: dominant for fashion, food, beauty, lifestyle, and younger consumer brands. WhatsApp Business: critical for businesses in international markets and for B2B and service businesses that use WhatsApp for customer communication. We recommend optimising all three platforms simultaneously since Meta AI serves users across all of them.' },
  { q:'Can Meta AI drive real business revenue?', a:"Yes, particularly for local businesses and consumer brands where users ask Meta AI for recommendations within a category ('best Italian restaurant near me', 'recommend a Shopify developer', 'where to buy organic ice cream'). Meta AI recommendations influence purchase decisions for billions of active Meta platform users. Brands optimised for Meta AI visibility benefit from appearing at the point of intent — when users are actively asking for recommendations within Meta's platforms where they're already engaged." },
];

const RELATED = [
  { href:'/ai-search-services/', label:'AI Search Services' },
  { href:'/social-media-marketing-services/', label:'Social Media Marketing' },
  { href:'/chatgpt-seo/', label:'ChatGPT SEO' },
  { href:'/perplexity-ai-seo/', label:'Perplexity AI SEO' },
  { href:'/google-ai-seo/', label:'Google AI SEO' },
  { href:'/ai-seo-services/', label:'AI SEO Services' },
  { href:'/answer-engine-optimization-services/', label:'Answer Engine Optimization' },
  { href:'/seo-services-company/', label:'SEO Services' },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Head>
        <title>{`Meta AI SEO | Facebook, Instagram & WhatsApp AI Visibility | 1Solutions`}</title>
        <meta name="description" content={`Meta AI SEO services — optimise your brand for visibility in Meta AI across Facebook, Instagram, WhatsApp, and Messenger. Expert Meta AI optimization for US & Australia.`} />
        <link rel="canonical" href="https://www.1solutions.biz/meta-ai-seo/" />
        <meta property="og:title" content={`Meta AI SEO | Facebook, Instagram & WhatsApp AI Visibility | 1Solutions`} />
        <meta property="og:description" content={`Meta AI SEO services — optimise your brand for visibility in Meta AI across Facebook, Instagram, WhatsApp, and Messenger. Expert Meta AI optimization for US & Australia.`} />
        <meta property="og:url" content="https://www.1solutions.biz/meta-ai-seo/" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org',
          '@type':'ProfessionalService',
          name:'1Solutions — Meta AI SEO Services',
          url:'https://www.1solutions.biz/meta-ai-seo/',
          telephone:'+91-9654327900',
          areaServed:['US','CA','AU','GB'],
          aggregateRating:{'@type':'AggregateRating',ratingValue:'4.9',reviewCount:'150',bestRating:'5'},
          mainEntity:FAQS.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}})),
        }) }} />
        <style>{`
          .mais-btn-p{display:inline-flex;align-items:center;gap:8px;background:#D97706;color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(217,119,6,0.35)}
          .mais-btn-p:hover{background:#B45309;transform:translateY(-2px)}
          .mais-svc{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px}
          .mais-svc-inner{max-width:1280px;margin:0 auto}
          .mais-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .mais-sec-h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 12px}
          .mais-sec-p{font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 0 44px}
          .mais-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
          .mais-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.05);transition:transform .25s,box-shadow .25s,border-color .25s}
          .mais-card:hover{transform:translateY(-5px);border-color:rgba(217,119,6,0.30);box-shadow:0 14px 42px rgba(15,52,96,0.10)}
          .mais-card-n{position:absolute;top:6px;right:12px;font-size:64px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;pointer-events:none}
          .mais-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin:0 0 8px;position:relative;z-index:1}
          .mais-card p{font-size:13px;color:#4A6080;line-height:1.6;margin:0;position:relative;z-index:1}
          .mais-faq{background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:80px 40px}
          .mais-faq-inner{max-width:860px;margin:0 auto}
          .mais-faq-item{border-bottom:1px solid rgba(15,52,96,0.08)}
          .mais-faq-q{width:100%;background:none;border:none;text-align:left;padding:20px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .mais-faq-q:hover{color:#D97706}
          .mais-faq-icon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all .2s;margin-top:2px}
          .mais-faq-item.open .mais-faq-icon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06)}
          .mais-faq-a{font-size:0.91rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height .35s ease,padding-bottom .35s ease}
          .mais-faq-item.open .mais-faq-a{max-height:600px;padding-bottom:20px}
          .mais-cta{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 100%);padding:70px 40px;text-align:center}
          .mais-cta h2{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#fff;margin:0 0 12px;line-height:1.2}
          .mais-cta p{font-size:15px;color:rgba(255,255,255,0.75);margin:0 0 28px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7}
          .mais-related{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:60px 40px}
          .mais-rel-inner{max-width:1280px;margin:0 auto}
          .mais-rel-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .mais-rel-tag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,0.12);color:#0F3460;transition:all .2s}
          .mais-rel-tag:hover{border-color:#D97706;color:#D97706;background:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(15,52,96,0.08)}
          @media(max-width:1024px){.mais-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){
            .mais-svc,.mais-faq,.mais-cta,.mais-related{padding:60px 20px}
            .mais-grid{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <ServiceHero
        eyebrow="1Solutions AI Practice"
        title={<>Meta AI SEO Services — <AuroraText>Get Found in Meta AI</AuroraText></>}
        subtext="Meta AI is built into Facebook, Instagram, WhatsApp, and Messenger — reaching 3 billion people. When users ask Meta AI about products, services, and brands in your industry, we make sure your brand is part of the answer."
        primaryCta={{ label: 'Get a Free Consultation', href: '#contact' }}
        secondaryCta={{ label: 'View Services', href: '#services' }}
        stats={[
          { label: 'Brands Optimised for Meta AI', value: '80', suffix: '+' },
          { label: 'Meta Platforms Covered', value: '4' },
          { label: 'Years Social SEO Experience', value: '15', suffix: '+' },
          { label: 'Client Retention', value: '97', suffix: '%' },
        ]}
      />

      <section className="mais-svc" id="services">
        <div className="mais-svc-inner">
          <span className="mais-sec-ey">What We Do</span>
          <h2 className="mais-sec-h2">Meta AI SEO Services We Offer</h2>
          <p className="mais-sec-p">Expert meta ai seo services for businesses in the US, Canada, and Australia — from strategy through implementation and ongoing optimization.</p>
          <div className="mais-grid">
            {SERVICES.map(s => (
              <div className="mais-card" key={s.n}>
                <span className="mais-card-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mais-faq" id="faq">
        <div className="mais-faq-inner">
          <span className="mais-sec-ey">Got Questions?</span>
          <h2 className="mais-sec-h2">Meta AI SEO Services — Frequently Asked Questions</h2>
          <div style={{marginTop:32}}>
            {FAQS.map((f,i) => (
              <div className={`mais-faq-item${openFaq===i?' open':''}`} key={f.q}>
                <button className="mais-faq-q" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                  {f.q}<span className="mais-faq-icon">{openFaq===i?'−':'+'}</span>
                </button>
                <div className="mais-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mais-cta" id="contact">
        <h2>Ready to Get Started with Meta AI SEO Services?</h2>
        <p>Speak to our team for a free, no-obligation consultation. We'll assess your current position and recommend the right strategy.</p>
        <Link href="/contact-us/" className="mais-btn-p">Book a Free Consultation →</Link>
      </section>

      <section className="mais-related">
        <div className="mais-rel-inner">
          <span className="mais-sec-ey">Related Services</span>
          <h2 className="mais-sec-h2" style={{fontSize:'1.5rem',margin:'0'}}>Explore Related Offerings</h2>
          <div className="mais-rel-tags">
            {RELATED.map(r => <Link key={r.href} href={r.href} className="mais-rel-tag">{r.label}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
