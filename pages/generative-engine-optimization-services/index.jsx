'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const RC_KEY = '6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';

function AuroraText({ children }) {
  return (
    <span style={{background:'linear-gradient(135deg,#4f46e5,#a855f7,#3b82f6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',backgroundSize:'200% auto',animation:'geo-aurora 4s linear infinite'}}>{children}</span>
  );
}

const STATS = [
  { label: 'AI Platforms Monitored', val: '8+'  },
  { label: 'GEO Clients Served',     val: '80+' },
  { label: 'AI Citations Tracked',   val: '5K+' },
  { label: 'Years SEO Experience',   val: '15+' },
];

const SERVICES = [
  { n:'01', title:'GEO Content Restructuring',  desc:'Restructure existing content for AI citation — clear entity definitions, authoritative source statements, factual density, and structured claim formats that LLMs prefer to cite.' },
  { n:'02', title:'Structured Data for AI',      desc:'Schema markup (FAQ, HowTo, Article, Speakable) that signals content structure to AI engines. Properly marked-up content gets parsed and cited more reliably by generative models.' },
  { n:'03', title:'E-E-A-T Authority Building',  desc:'Build expertise, experience, authoritativeness, and trustworthiness signals that Google AI Overviews and third-party LLMs (ChatGPT, Claude, Perplexity) use to evaluate source credibility.' },
  { n:'04', title:'AI Visibility Auditing',      desc:'Test how your brand and content appears across ChatGPT, Perplexity, Google AI Overviews, Gemini, and Bing Copilot — with a gap analysis identifying where competitors are cited instead of you.' },
  { n:'05', title:'Topical Authority Mapping',   desc:'Build comprehensive topic coverage that positions your site as the authoritative source on your subject area — the depth and breadth of coverage LLMs favour when selecting citation sources.' },
  { n:'06', title:'Cited Source Strategy',       desc:'Identify the content formats, claim types, and authority signals that make sources most likely to be cited in AI-generated answers — and build content optimised specifically for citation.' },
  { n:'07', title:'Brand Mention Monitoring',    desc:"Track your brand's appearance in AI-generated responses across ChatGPT, Perplexity, Google SGE, and Gemini — monitoring citation frequency, sentiment, and accuracy." },
  { n:'08', title:'GEO Reporting & Analytics',   desc:'Monthly reporting on AI visibility metrics — citation appearances, AI Overview presence, brand mention sentiment, and Perplexity citation frequency alongside traditional search metrics.' },
];

const PLATFORMS = ['Google AI Overviews','ChatGPT Search','Perplexity AI','Gemini','Bing Copilot','Claude AI','Llama','Grok'];

const PROCESS = [
  { step:'01', title:'AI Visibility Audit',       desc:'Test your brand and content across major AI engines. Identify where you appear, where competitors appear instead, and what content types are being cited in your niche.' },
  { step:'02', title:'Content Gap Analysis',       desc:'Map your content against the questions and topics where AI engines are citing competitors — identify the highest-value gaps to address first by business impact.' },
  { step:'03', title:'Content Optimisation',       desc:'Restructure existing content for citation-friendliness — clearer claims, better entity definitions, authoritative sourcing, and E-E-A-T signals that AI models reward.' },
  { step:'04', title:'New Content Creation',        desc:'Create comprehensive, citation-worthy content on your most important topics — written for both human readers and AI engine consumption at depth that earns citations.' },
  { step:'05', title:'Authority & Link Building',  desc:'Build the third-party credibility signals that AI engines use to evaluate source authority — editorial coverage, expert citations, and domain authority improvements.' },
  { step:'06', title:'Monitor & Report',            desc:'Monthly AI visibility reporting — citation frequency across platforms, brand mention tracking, and AI presence compared to traditional SEO metrics.' },
];

const WHY = [
  { title:'Early Mover Expertise',    desc:'We have been studying and testing GEO since Google AI Overviews launched. Our clients are building citation presence while competitors are still ignoring the shift.' },
  { title:'Multi-Platform Approach',  desc:'GEO is not just Google. We optimise for citation across ChatGPT, Perplexity, Gemini, Bing Copilot, and emerging AI search engines simultaneously.' },
  { title:'SEO + GEO Combined',       desc:'GEO works best alongside traditional SEO — not instead of it. We integrate both strategies so your content performs across keyword searches and AI-generated answers.' },
  { title:'Measurable Metrics',       desc:'We track concrete AI visibility metrics — citation appearances, AI Overview presence, Perplexity source frequency — so progress is measurable, not theoretical.' },
  { title:'Content-First Execution',  desc:'GEO requires high-quality, authoritative content — not technical tricks. Our content specialists write citation-worthy material that earns AI mentions through genuine expertise.' },
  { title:'Transparent Reporting',    desc:"Monthly reports covering AI visibility alongside traditional SEO metrics — giving a complete picture of your brand's presence across both search paradigms." },
];

const COMPARE = [
  { feature:'Goal',              seo:'Page 1 keyword rankings',           geo:'Cited in AI-generated answers'           },
  { feature:'Primary signal',    seo:'Backlinks + keyword relevance',     geo:'E-E-A-T + content structure + entities'  },
  { feature:'Result type',       seo:'Blue link on search results page',  geo:'AI Overview, ChatGPT answer, Perplexity' },
  { feature:'Measurement',       seo:'Keyword position, organic CTR',     geo:'Citation frequency, AI brand presence'   },
  { feature:'Content focus',     seo:'Keyword density, on-page signals',  geo:'Factual depth, entity clarity, authority' },
  { feature:'Works standalone?', seo:'Yes',                               geo:'Best combined with traditional SEO'       },
];

const FAQS = [
  { q:'What is Generative Engine Optimisation (GEO)?', a:'Generative Engine Optimisation (GEO) is the practice of optimising content to appear in AI-generated search responses — Google AI Overviews, ChatGPT Search, Perplexity, Gemini, and similar systems. As AI engines increasingly generate direct answers rather than just listing links, the goal shifts from ranking in position 1 to being cited as a source in AI-generated responses. GEO focuses on content structure, E-E-A-T signals, topical authority, and factual density that make AI models prefer to cite your content.' },
  { q:'How is GEO different from traditional SEO?', a:'Traditional SEO optimises for keyword rankings in blue-link search results. GEO optimises for citation in AI-generated answers. The two overlap significantly — high-quality, authoritative content with strong E-E-A-T signals performs well in both — but GEO requires additional focus on structured information (AI models prefer clearly formatted facts); comprehensive topic coverage (AI engines prefer sources that cover a topic thoroughly); factual accuracy (AI models use credibility signals to select sources); and entity clarity (clear definitions of who you are and what you do).' },
  { q:'Can I measure GEO performance?', a:'Yes. GEO measurement is still evolving but key metrics include: Google Search Console AI Overview impressions and clicks; manual and automated testing of brand/topic queries across ChatGPT, Perplexity, and Gemini; third-party tools tracking AI citation frequency (Authoritas, BrightEdge AI Visibility); and brand mention monitoring across AI platforms. We provide monthly GEO visibility reports alongside traditional SEO metrics.' },
  { q:'Does Google AI Overviews affect traditional organic traffic?', a:'Yes. Google AI Overviews appear above traditional blue-link results and generate their own clicks — some users click source links within the AI Overview rather than scrolling to traditional results. Studies show that appearing as a cited source in AI Overviews can drive incremental clicks even while the presence of AI Overviews reduces clicks to traditional results. Being a cited source is the goal — not just appearing in traditional results below the AI Overview.' },
  { q:'What types of content are most likely to be cited by AI engines?', a:'AI engines favour content that is: factually dense (specific claims, statistics, named entities); clearly structured (headers, lists, tables that make information easy to parse); from authoritative sources (strong domain authority, expert authorship, citation by other credible sources); comprehensive (covers a topic from multiple angles); and freshly updated (recency matters for rapidly evolving topics). Long-form guides, original research, and definition/explanation content attract more AI citations than product pages or thin promotional content.' },
  { q:'Should I optimise for Perplexity, ChatGPT, or Google AI Overviews first?', a:'Google AI Overviews first — they have by far the largest search volume reach and are triggered for a wide range of commercial and informational queries. Perplexity is the fastest-growing AI search engine and particularly relevant for research-oriented industries. ChatGPT Search is growing rapidly and important for brand searches. We optimise for all three simultaneously because the content improvements that earn Google AI Overview citations also improve performance on other AI platforms.' },
  { q:'Is GEO replacing SEO?', a:'No. GEO is extending SEO, not replacing it. Traditional keyword rankings remain valuable for transactional and local queries where AI Overviews are rarely shown. E-E-A-T signals, quality content, and authoritative backlinks — the foundations of good SEO — are also the foundations of good GEO. The most effective strategy combines both: maintain strong traditional SEO rankings while building the content depth and authority signals that earn AI citations.' },
  { q:'How long does it take to see GEO results?', a:'AI visibility improvements are typically faster to observe than traditional SEO ranking movements. New or restructured content can begin appearing in Google AI Overviews within 2 to 4 weeks of indexation. Perplexity citation frequency improves as content earns more inbound links and social signals. Full GEO impact — consistent citation across multiple AI platforms for priority topics — typically takes 3 to 6 months of sustained content and authority building.' },
];

const RELATED = [
  { href:'/ai-seo-services/',                     label:'AI SEO Services',              cls:'geo-rtag-indigo'  },
  { href:'/seo-services-company/',                label:'SEO Services',                 cls:'geo-rtag-blue'    },
  { href:'/content-marketing-services/',          label:'Content Marketing',            cls:'geo-rtag-violet'  },
  { href:'/link-building-services/',              label:'Link Building Services',        cls:'geo-rtag-teal'    },
  { href:'/seo-audit-services/',                  label:'SEO Audit Services',            cls:'geo-rtag-amber'   },
  { href:'/local-seo-services/',                  label:'Local SEO Services',            cls:'geo-rtag-green'   },
  { href:'/technical-seo-optimization/',          label:'Technical SEO',                 cls:'geo-rtag-rose'    },
  { href:'/answer-engine-optimization-services/', label:'Answer Engine Optimisation',    cls:'geo-rtag-indigo'  },
  { href:'/ppc-management-services/',             label:'PPC Management',                cls:'geo-rtag-blue'    },
  { href:'/reputation-management-services/',      label:'Reputation Management',         cls:'geo-rtag-violet'  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'Home',         item:'https://www.1solutions.biz/'                                                    },
        { '@type':'ListItem', position:2, name:'SEO Services', item:'https://www.1solutions.biz/seo-services-company/'                               },
        { '@type':'ListItem', position:3, name:'Generative Engine Optimisation', item:'https://www.1solutions.biz/generative-engine-optimization-services/' },
      ],
    },
    {
      '@type': 'ProfessionalService',
      name: 'Generative Engine Optimisation Services',
      url: 'https://www.1solutions.biz/generative-engine-optimization-services/',
      description: 'Optimise content for citation in Google AI Overviews, ChatGPT Search, Perplexity, and Gemini. 8 AI platforms monitored, 80+ GEO clients, 5,000+ citations tracked.',
      provider: { '@type':'Organization', name:'1Solutions', url:'https://www.1solutions.biz' },
      aggregateRating: { '@type':'AggregateRating', ratingValue:'4.9', reviewCount:'127', bestRating:'5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text:f.a } })),
    },
    {
      '@type': 'HowTo',
      name: 'How Generative Engine Optimisation Works',
      step: PROCESS.map((p, i) => ({ '@type':'HowToStep', position:i+1, name:p.title, text:p.desc })),
    },
  ],
};

export default function GenerativeEngineOptimizationServices() {
  const [openFaq, setOpenFaq]   = useState(0);
  const [visCards, setVisCards] = useState([]);
  const [visSteps, setVisSteps] = useState([]);
  const [visWhy, setVisWhy]     = useState([]);
  const [formSt, setFormSt]     = useState('idle');
  const cardsRef  = useRef(null);
  const stepRefs  = useRef([]);
  const whyRef    = useRef(null);
  const rcLoaded  = useRef(false);

  useEffect(() => {
    if (!cardsRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { SERVICES.forEach((_,i) => setTimeout(() => setVisCards(p => p.includes(i) ? p : [...p,i]), i*60)); o.disconnect(); }
    }, { threshold: 0.05 });
    o.observe(cardsRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const obs = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setTimeout(() => setVisSteps(p => p.includes(i) ? p : [...p,i]), i*120); o.disconnect(); }
      }, { threshold: 0.2 });
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!whyRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { WHY.forEach((_,i) => setTimeout(() => setVisWhy(p => p.includes(i) ? p : [...p,i]), i*90)); o.disconnect(); }
    }, { threshold: 0.1 });
    o.observe(whyRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const contact = document.getElementById('geo-contact');
    if (!contact) return;
    const rcObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !rcLoaded.current) {
        const s = document.createElement('script');
        s.src = `https://www.google.com/recaptcha/api.js?render=${RC_KEY}`;
        s.async = true;
        document.head.appendChild(s);
        rcLoaded.current = true;
        rcObs.disconnect();
      }
    }, { rootMargin: '300px' });
    rcObs.observe(contact);
    return () => rcObs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd      = new FormData(e.target);
    const name    = (fd.get('geo-name')    || '').trim();
    const email   = (fd.get('geo-email')   || '').trim();
    const phone   = (fd.get('geo-phone')   || '').trim();
    const company = (fd.get('geo-company') || '').trim();
    const website = (fd.get('geo-website') || '').trim();
    const msg     = (fd.get('geo-msg')     || '').trim();
    const consent = document.getElementById('geo-consent')?.checked;
    if (!name || !email || !phone || !company || !msg || !consent) { setFormSt('validation'); return; }
    setFormSt('loading');
    try {
      const token = await new Promise(resolve => {
        window.grecaptcha.ready(() => { window.grecaptcha.execute(RC_KEY, { action:'geo_contact' }).then(resolve); });
      });
      const cc = fd.get('geo-cc') || '';
      const res = await fetch('/api/contact', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          name, email,
          phone: (cc ? cc+' ' : '') + phone,
          company,
          message: `Website: ${website || 'Not provided'}\n\n${msg}`,
          service: 'Generative Engine Optimisation',
          source:  'GEO Services Page',
          consent: true,
          recaptchaToken: token,
        }),
      });
      if (res.ok) { setFormSt('success'); e.target.reset(); } else { setFormSt('error'); }
    } catch { setFormSt('error'); }
  };

  return (
    <>
      <Head>
        <title>Generative Engine Optimisation (GEO) Services | Get Cited in AI Search | 1Solutions</title>
        <meta name="description" content="GEO services that get your content cited in Google AI Overviews, ChatGPT Search, Perplexity & Gemini. E-E-A-T, structured data, topical authority. 80+ GEO clients, 15+ years experience." />
        <link rel="canonical" href="https://www.1solutions.biz/generative-engine-optimization-services/" />
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content="Generative Engine Optimisation (GEO) Services | 1Solutions" />
        <meta property="og:description" content="Get cited in Google AI Overviews, ChatGPT, Perplexity & Gemini. E-E-A-T, structured data, topical authority. 80+ clients, 5K+ citations tracked." />
        <meta property="og:url"         content="https://www.1solutions.biz/generative-engine-optimization-services/" />
        <meta property="og:image"       content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <meta name="twitter:card"       content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          @keyframes geo-aurora{0%{background-position:0% center}100%{background-position:200% center}}
          .geo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .geo-page *,.geo-page *::before,.geo-page *::after{box-sizing:border-box}

          /* ── HERO ── */
          .geo-hero{background:linear-gradient(135deg,#eef2ff 0%,#e8e4ff 30%,#e0e7ff 65%,#eef2ff 100%);position:relative;overflow:hidden;padding:60px 40px 0}
          .geo-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .geo-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(79,70,229,0.08) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .geo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .geo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(79,70,229,0.08);border:1px solid rgba(79,70,229,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#4f46e5;margin-bottom:20px}
          .geo-h1{font-size:clamp(2rem,4.5vw,3.4rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;color:#0F1F40;margin-bottom:16px;max-width:820px;margin-left:auto;margin-right:auto}
          .geo-sub{font-size:1rem;color:#4A6080;line-height:1.7;max-width:580px;margin:0 auto 28px}
          .geo-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:44px}
          .geo-btn-p{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(79,70,229,0.28)}
          .geo-btn-p:hover{background:linear-gradient(135deg,#3730a3,#4f46e5);box-shadow:0 8px 32px rgba(79,70,229,0.38);transform:translateY(-2px)}
          .geo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all .25s}
          .geo-btn-s:hover{border-color:#4f46e5;color:#4f46e5;transform:translateY(-2px)}
          .geo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:860px;margin:0 auto;background:rgba(255,255,255,0.60);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.88);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(79,70,229,0.08)}
          .geo-stat{padding:18px 20px;text-align:center;border-right:1px solid rgba(79,70,229,0.10)}.geo-stat:last-child{border-right:none}
          .geo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .geo-stat-v{font-size:1.5rem;font-weight:900;color:#4f46e5;letter-spacing:-0.5px}

          /* ── SECTION SCAFFOLDING ── */
          .geo-white{background:#fff;padding:80px 40px}
          .geo-light{background:#f8fafd;padding:80px 40px}
          .geo-indigo{background:linear-gradient(135deg,#eef2ff 0%,#e8eeff 50%,#eef2ff 100%);padding:80px 40px}
          .geo-sec-in{max-width:1280px;margin:0 auto}
          .geo-sec-in-sm{max-width:900px;margin:0 auto}
          .geo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#4f46e5;margin-bottom:10px;display:block}
          .geo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .geo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}

          /* ── SERVICE CARDS ── */
          .geo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .geo-card{background:linear-gradient(135deg,rgba(238,242,255,0.70) 0%,rgba(255,255,255,0.90) 60%,rgba(224,231,255,0.30) 100%);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(79,70,229,0.06);opacity:0;transform:translateY(20px);transition:opacity .4s ease,transform .4s ease}
          .geo-card.vis{opacity:1;transform:translateY(0)}.geo-card:hover{transform:translateY(-6px);border-color:rgba(79,70,229,0.20);box-shadow:0 16px 48px rgba(79,70,229,0.09)}
          .geo-card-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#4f46e5;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .geo-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .geo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}

          /* ── AI PLATFORMS ── */
          .geo-plat{background:linear-gradient(135deg,#3730a3 0%,#4f46e5 100%);padding:60px 40px}
          .geo-plat-in{max-width:1280px;margin:0 auto;text-align:center}
          .geo-plat h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .geo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .geo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}

          /* ── COMPARISON TABLE ── */
          .geo-tbl-wrap{overflow-x:auto;margin-top:32px}
          .geo-tbl{width:100%;border-collapse:collapse;min-width:600px}
          .geo-tbl th{padding:12px 16px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#4A6080;text-align:left;border-bottom:2px solid rgba(79,70,229,0.12)}
          .geo-tbl td{padding:14px 16px;font-size:14px;color:#374151;border-bottom:1px solid rgba(79,70,229,0.06);vertical-align:top;line-height:1.55}
          .geo-tbl tr:last-child td{border-bottom:none}
          .geo-tbl tr:hover td{background:rgba(238,242,255,0.60)}
          .geo-tbl td:first-child{font-weight:700;color:#0F1F40}
          .geo-tbl td:nth-child(3){color:#4f46e5;font-weight:600}

          /* ── PROCESS ── */
          .geo-steps{display:flex;flex-direction:column;margin-top:44px}
          .geo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(79,70,229,0.10);opacity:0;transform:translateX(-20px);transition:opacity .45s ease,transform .45s ease}
          .geo-step:last-child{border-bottom:none}.geo-step.vis{opacity:1;transform:translateX(0)}
          .geo-snum{font-size:3rem;font-weight:900;color:rgba(79,70,229,0.15);line-height:1;letter-spacing:-2px}
          .geo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .geo-step p{font-size:.9rem;color:#4A6080;line-height:1.7;margin:0}

          /* ── WHY ── */
          .geo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .geo-wcard{background:linear-gradient(135deg,#eef2ff 0%,#fff 60%,#e0e7ff 100%);border:1px solid rgba(79,70,229,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity .4s ease,transform .4s ease}
          .geo-wcard.vis{opacity:1;transform:translateY(0)}.geo-wcard:hover{border-color:rgba(79,70,229,0.22);box-shadow:0 8px 32px rgba(79,70,229,0.07)}
          .geo-dot{width:8px;height:8px;border-radius:50%;background:#4f46e5;margin-bottom:16px}
          .geo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .geo-wcard p{font-size:.88rem;color:#4A6080;line-height:1.7;margin:0}

          /* ── FAQ ── */
          .geo-fitem{border-bottom:1px solid #e5e7eb}
          .geo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .geo-fq:hover{color:#4f46e5}
          .geo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all .2s;margin-top:2px}
          .geo-fitem.open .geo-ficon{border-color:#4f46e5;color:#4f46e5;background:rgba(79,70,229,0.06)}
          .geo-fa{font-size:.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height .35s ease,padding-bottom .35s ease}
          .geo-fitem.open .geo-fa{max-height:600px;padding-bottom:22px}

          /* ── CONTACT FORM ── */
          .geo-contact{background:linear-gradient(135deg,rgba(79,70,229,0.05) 0%,rgba(255,255,255,0.92) 50%,rgba(238,242,255,0.40) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .geo-co1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(79,70,229,0.10) 0%,transparent 70%);pointer-events:none}
          .geo-co2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%);pointer-events:none}
          .geo-cg{max-width:1200px;margin:0 auto;position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
          .geo-cl h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 16px;line-height:1.15;letter-spacing:-0.5px}
          .geo-cl p{font-size:1rem;color:#4A6080;line-height:1.75;margin:0 0 32px}
          .geo-perks{display:flex;flex-direction:column;gap:12px}
          .geo-perk{display:flex;align-items:center;gap:10px;font-size:14px;color:#374151;font-weight:500}
          .geo-perk svg{flex-shrink:0;color:#4f46e5}
          .geo-form-box{background:rgba(255,255,255,0.90);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.96);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(79,70,229,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .geo-form-box h3{font-size:18px;font-weight:800;color:#0F1F40;margin:0 0 22px;letter-spacing:-0.3px}
          .geo-form{display:flex;flex-direction:column;gap:14px}
          .geo-r2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
          .geo-fg{display:flex;flex-direction:column;gap:5px}
          .geo-fg label{font-size:12px;font-weight:700;color:#374151;letter-spacing:.02em;text-transform:uppercase}
          .geo-fg input,.geo-fg textarea,.geo-fg select{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;background:#fff;outline:none;transition:border-color .2s,box-shadow .2s;width:100%}
          .geo-fg input:focus,.geo-fg textarea:focus,.geo-fg select:focus{border-color:#4f46e5;box-shadow:0 0 0 3px rgba(79,70,229,0.10)}
          .geo-fg textarea{resize:vertical;min-height:110px}
          .geo-pw{display:flex;gap:8px}
          .geo-pw select{width:110px;flex-shrink:0}
          .geo-pw input{flex:1}
          .geo-ck{display:flex;align-items:flex-start;gap:10px;font-size:12px;color:#6b7280;line-height:1.55}
          .geo-ck input[type="checkbox"]{width:16px;height:16px;margin-top:1px;accent-color:#4f46e5;flex-shrink:0}
          .geo-ck a{color:#4f46e5;text-decoration:none}
          .geo-sub{padding:14px 28px;background:linear-gradient(135deg,#4f46e5,#6366f1);border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;width:100%;box-shadow:0 6px 24px rgba(79,70,229,0.25)}
          .geo-sub:hover:not(:disabled){background:linear-gradient(135deg,#3730a3,#4f46e5);transform:translateY(-2px);box-shadow:0 8px 32px rgba(79,70,229,0.35)}
          .geo-sub:disabled{opacity:.65;cursor:not-allowed}
          .geo-err{font-size:13px;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px 14px;margin:0}
          .geo-ok{text-align:center;padding:24px 0}
          .geo-ok-ic{width:56px;height:56px;background:rgba(79,70,229,0.10);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .geo-ok-ic svg{width:28px;height:28px;stroke:#4f46e5;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
          .geo-ok h3{font-size:20px;font-weight:800;color:#0F1F40;margin:0 0 8px}
          .geo-ok p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}

          /* ── RELATED SERVICES ── */
          .geo-related{background:linear-gradient(135deg,rgba(238,242,255,0.60) 0%,rgba(255,255,255,0.90) 50%,rgba(224,231,255,0.30) 100%);padding:80px 40px;border-top:1px solid rgba(79,70,229,0.10)}
          .geo-ri{max-width:1280px;margin:0 auto;text-align:center}
          .geo-ri .geo-ey2{color:#6b7280}
          .geo-related-ttl{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-0.5px;color:#0F1F40;margin:0 0 14px}
          .geo-related-sub{font-size:15px;color:#4A6080;line-height:1.7;margin:0 auto 36px;max-width:640px}
          .geo-divider{border:none;border-top:1px solid rgba(79,70,229,0.12);margin:0 0 32px}
          .geo-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .geo-rtag{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;transition:all .22s;border:1.5px solid}
          .geo-rtag-indigo{background:rgba(79,70,229,0.07);border-color:rgba(79,70,229,0.20);color:#3730a3}.geo-rtag-indigo:hover{background:rgba(79,70,229,0.14);border-color:#4f46e5;transform:translateY(-2px)}
          .geo-rtag-blue{background:rgba(59,130,246,0.07);border-color:rgba(59,130,246,0.20);color:#1d4ed8}.geo-rtag-blue:hover{background:rgba(59,130,246,0.14);border-color:#3b82f6;transform:translateY(-2px)}
          .geo-rtag-violet{background:rgba(139,92,246,0.07);border-color:rgba(139,92,246,0.20);color:#5b21b6}.geo-rtag-violet:hover{background:rgba(139,92,246,0.14);border-color:#8b5cf6;transform:translateY(-2px)}
          .geo-rtag-teal{background:rgba(20,184,166,0.07);border-color:rgba(20,184,166,0.20);color:#0f766e}.geo-rtag-teal:hover{background:rgba(20,184,166,0.14);border-color:#14b8a6;transform:translateY(-2px)}
          .geo-rtag-amber{background:rgba(217,119,6,0.07);border-color:rgba(217,119,6,0.20);color:#92400e}.geo-rtag-amber:hover{background:rgba(217,119,6,0.14);border-color:#d97706;transform:translateY(-2px)}
          .geo-rtag-green{background:rgba(34,197,94,0.07);border-color:rgba(34,197,94,0.20);color:#166534}.geo-rtag-green:hover{background:rgba(34,197,94,0.14);border-color:#22c55e;transform:translateY(-2px)}
          .geo-rtag-rose{background:rgba(244,63,94,0.07);border-color:rgba(244,63,94,0.20);color:#be123c}.geo-rtag-rose:hover{background:rgba(244,63,94,0.14);border-color:#f43f5e;transform:translateY(-2px)}

          /* ── RESPONSIVE ── */
          @media(max-width:1024px){
            .geo-grid{grid-template-columns:repeat(2,1fr)}
            .geo-why-grid{grid-template-columns:repeat(2,1fr)}
            .geo-cg{grid-template-columns:1fr}
          }
          @media(max-width:768px){
            .geo-hero,.geo-white,.geo-light,.geo-indigo,.geo-plat,.geo-contact,.geo-related{padding:60px 24px}
            .geo-hero{padding-top:60px;padding-bottom:0}
            .geo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}
            .geo-stat:nth-child(2){border-right:none}
            .geo-grid,.geo-why-grid{grid-template-columns:1fr}
            .geo-step{grid-template-columns:56px 1fr}
            .geo-btns{flex-direction:column;align-items:center}
            .geo-r2{grid-template-columns:1fr}
          }
        
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>

      <div className="geo-page">

        {/* ── HERO ── */}
        <section className="geo-hero">
          <div className="geo-o1"/><div className="geo-o2"/>
          <div className="geo-in">
            <span className="geo-ey">
              <span style={{width:6,height:6,borderRadius:'50%',background:'#4f46e5',display:'inline-block'}}/>
              Generative Engine Optimisation Services
            </span>
            <h1 className="geo-h1"><AuroraText>Get Cited in AI Search Answers</AuroraText><br/>with Expert GEO Services</h1>
            <p className="geo-sub">Optimise your content to appear in Google AI Overviews, ChatGPT Search, Perplexity, and Gemini &mdash; where being cited replaces being ranked.</p>
            <div className="geo-btns">
              <a href="#geo-contact" className="geo-btn-p">
                Start Your Free GEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <Link href="/ai-seo-services/" className="geo-btn-s">AI SEO Services</Link>
            </div>
            <div className="geo-stats">
              {STATS.map(s => (
                <div key={s.label} className="geo-stat">
                  <div className="geo-stat-l">{s.label}</div>
                  <div className="geo-stat-v">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="geo-light">
          <div className="geo-sec-in">
            <span className="geo-ey2">What We Do</span>
            <h2 className="geo-ttl">Generative Engine Optimisation Services</h2>
            <p className="geo-desc">Content restructuring, E-E-A-T authority building, and AI visibility monitoring &mdash; optimising your presence across every major AI search platform.</p>
            <div className="geo-grid" ref={cardsRef}>
              {SERVICES.map((s,i) => (
                <div key={s.n} className={`geo-card${visCards.includes(i) ? ' vis' : ''}`}>
                  <div className="geo-card-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI PLATFORMS ── */}
        <section className="geo-plat">
          <div className="geo-plat-in">
            <h2>AI Platforms We Optimise For</h2>
            <div className="geo-pills">{PLATFORMS.map(p => <span key={p} className="geo-pill">{p}</span>)}</div>
          </div>
        </section>

        {/* ── GEO vs SEO ── */}
        <section className="geo-white">
          <div className="geo-sec-in-sm">
            <span className="geo-ey2">The Difference</span>
            <h2 className="geo-ttl">GEO vs Traditional SEO</h2>
            <p className="geo-desc">Understanding the distinction helps you invest in the right mix of strategies for your current visibility goals.</p>
            <div className="geo-tbl-wrap">
              <table className="geo-tbl">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Traditional SEO</th>
                    <th>Generative Engine Optimisation</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(row => (
                    <tr key={row.feature}>
                      <td>{row.feature}</td>
                      <td>{row.seo}</td>
                      <td>{row.geo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="geo-indigo">
          <div className="geo-sec-in-sm">
            <span className="geo-ey2">How We Work</span>
            <h2 className="geo-ttl">Our GEO Process</h2>
            <p className="geo-desc">Audit AI visibility, identify citation gaps, optimise content, build authority &mdash; and track progress monthly across all major AI search platforms.</p>
            <div className="geo-steps">
              {PROCESS.map((p,i) => (
                <div key={p.step} ref={el => { stepRefs.current[i] = el; }} className={`geo-step${visSteps.includes(i) ? ' vis' : ''}`}>
                  <div className="geo-snum">{p.step}</div>
                  <div><h3>{p.title}</h3><p>{p.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="geo-white">
          <div className="geo-sec-in">
            <span className="geo-ey2">Why 1Solutions</span>
            <h2 className="geo-ttl">GEO Experts &mdash; SEO Foundation Included</h2>
            <p className="geo-desc">We integrate GEO with your existing SEO strategy &mdash; not as a replacement, but as the natural evolution that keeps your brand visible as search changes.</p>
            <div className="geo-why-grid" ref={whyRef}>
              {WHY.map((w,i) => (
                <div key={w.title} className={`geo-wcard${visWhy.includes(i) ? ' vis' : ''}`}>
                  <div className="geo-dot"/>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="geo-light">
          <div className="geo-sec-in-sm">
            <span className="geo-ey2">Got Questions?</span>
            <h2 className="geo-ttl">GEO Services FAQs</h2>
            <p className="geo-desc" style={{marginBottom:44}}>Everything you need to know about Generative Engine Optimisation and AI search visibility.</p>
            <div>
              {FAQS.map((f,i) => (
                <div key={i} className={`geo-fitem${openFaq === i ? ' open' : ''}`}>
                  <button className="geo-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {f.q}
                    <span className="geo-ficon">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="geo-fa" style={openFaq === i ? {maxHeight:600,paddingBottom:22} : {}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section className="geo-contact" id="geo-contact">
          <div className="geo-co1"/><div className="geo-co2"/>
          <div className="geo-cg">
            <div className="geo-cl">
              <span className="geo-ey2">Free GEO Audit</span>
              <h2>Start Getting Cited in AI Search Answers</h2>
              <p>Tell us your domain and target topics &mdash; we&rsquo;ll run a free AI visibility audit and show you exactly where competitors are being cited instead of you, and what it takes to change that.</p>
              <div className="geo-perks">
                {[
                  'AI visibility audit across 8 platforms',
                  'Competitor citation gap analysis',
                  'E-E-A-T readiness assessment',
                  'Content restructuring recommendations',
                  'Free, no-obligation report',
                ].map(perk => (
                  <div key={perk} className="geo-perk">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {perk}
                  </div>
                ))}
              </div>
            </div>

            <div className="geo-form-box">
              <h3>Request a Free GEO Audit</h3>
              {formSt === 'success' ? (
                <div className="geo-ok">
                  <div className="geo-ok-ic">
                    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>We&rsquo;ll review your AI visibility and reply with a free assessment within one business day.</p>
                </div>
              ) : (
                <form className="geo-form" onSubmit={handleSubmit} noValidate>
                  {formSt === 'validation' && <p className="geo-err">Please complete all required fields and accept the privacy policy before submitting.</p>}
                  {formSt === 'error' && <p className="geo-err">Something went wrong. Please try again or email us at info@1solutions.biz</p>}
                  <div className="geo-r2">
                    <div className="geo-fg">
                      <label htmlFor="geo-name">Full Name *</label>
                      <input id="geo-name" name="geo-name" type="text" placeholder="Jane Smith" required/>
                    </div>
                    <div className="geo-fg">
                      <label htmlFor="geo-email">Business Email *</label>
                      <input id="geo-email" name="geo-email" type="email" placeholder="jane@company.com" required/>
                    </div>
                  </div>
                  <div className="geo-r2">
                    <div className="geo-fg">
                      <label>Phone Number *</label>
                      <div className="geo-pw">
                        <select name="geo-cc" aria-label="Country code">
                          <option value="+1">+1 US</option>
                          <option value="+1">+1 CA</option>
                          <option value="+61">+61 AU</option>
                          <option value="+44">+44 GB</option>
                          <option value="+91">+91 IN</option>
                        </select>
                        <input name="geo-phone" type="tel" placeholder="Phone number" required aria-label="Phone number"/>
                      </div>
                    </div>
                    <div className="geo-fg">
                      <label htmlFor="geo-company">Company Name *</label>
                      <input id="geo-company" name="geo-company" type="text" placeholder="Your company name" required/>
                    </div>
                  </div>
                  <div className="geo-fg">
                    <label htmlFor="geo-website">Website URL</label>
                    <input id="geo-website" name="geo-website" type="url" placeholder="https://yoursite.com"/>
                  </div>
                  <div className="geo-fg">
                    <label htmlFor="geo-msg">What would you like help with? *</label>
                    <textarea id="geo-msg" name="geo-msg" rows={4} placeholder="Current AI visibility concerns, target topics, AI Overviews you want to appear in, competitors you want to outrank..." required/>
                  </div>
                  <div className="geo-ck">
                    <input type="checkbox" id="geo-consent"/>
                    <label htmlFor="geo-consent">
                      I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions storing my data to respond to this enquiry. *
                    </label>
                  </div>
                  <button type="submit" className="geo-sub" disabled={formSt === 'loading'}>
                    {formSt === 'loading' ? 'Sending...' : 'Request My Free GEO Audit →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="geo-related">
          <div className="geo-ri">
            <span className="geo-ey2">Explore Related Services</span>
            <h2 className="geo-related-ttl">Related SEO &amp; Visibility Services</h2>
            <p className="geo-related-sub">GEO works best as part of a broader search visibility strategy. These services integrate directly with Generative Engine Optimisation.</p>
            <hr className="geo-divider"/>
            <div className="geo-tags">
              {RELATED.map(({ href, label, cls }) => (
                <Link key={href} href={href} className={`geo-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
