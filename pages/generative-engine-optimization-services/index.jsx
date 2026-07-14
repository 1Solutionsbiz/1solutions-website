'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const RC_KEY = '6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';

/* ── Aurora text — distinctive for GEO headings ── */
function AuroraText({ children }) {
  return (
    <span style={{background:'linear-gradient(135deg,#f43f5e,#a855f7,#3b82f6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',backgroundSize:'200% auto',animation:'geo-aurora 4s linear infinite'}}>{children}</span>
  );
}

const STATS = [
  { label: 'AI Platforms Monitored', val: '8+'  },
  { label: 'GEO Clients',            val: '80+' },
  { label: 'AI Citations Tracked',   val: '5K+' },
  { label: 'Years SEO Experience',   val: '15+' },
];

const SERVICES = [
  { n:'01', icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'GEO Content Restructuring', desc:'Restructure existing content for AI citation — clear entity definitions, authoritative source statements, factual density, and structured claim formats that LLMs prefer to cite.' },
  { n:'02', icon:'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title:'Structured Data for AI', desc:'Schema markup (FAQ, HowTo, Article, Speakable) that signals content structure to AI engines. Properly marked-up content gets parsed and cited more reliably by generative models.' },
  { n:'03', icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'E-E-A-T Authority Building', desc:'Build the expertise, experience, authoritativeness, and trustworthiness signals that both Google AI Overviews and third-party LLMs (ChatGPT, Claude, Perplexity) use to evaluate source credibility.' },
  { n:'04', icon:'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title:'AI Visibility Auditing', desc:'Test how your brand and content appears across ChatGPT, Perplexity, Google AI Overviews, Gemini, and Bing Copilot — with a gap analysis identifying where competitors are cited instead of you.' },
  { n:'05', icon:'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7', title:'Topical Authority Mapping', desc:'Build comprehensive topic coverage that positions your site as the authoritative source on your subject area — the depth and breadth of coverage LLMs favour when selecting citation sources.' },
  { n:'06', icon:'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', title:'Cited Source Strategy', desc:'Identify the content formats, claim types, and authority signals that make sources most likely to be cited in AI-generated answers — and build content optimised specifically for citation.' },
  { n:'07', icon:'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', title:'Brand Mention Monitoring', desc:"Track your brand's appearance in AI-generated responses across ChatGPT, Perplexity, Google SGE, and Gemini — monitoring citation frequency, sentiment, and accuracy." },
  { n:'08', icon:'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'GEO Reporting & Analytics', desc:'Monthly reporting on AI visibility metrics — citation appearances, AI Overview presence, brand mention sentiment, and Perplexity citation frequency alongside traditional search metrics.' },
];

const PLATFORMS = ['Google AI Overviews','ChatGPT Search','Perplexity AI','Gemini','Bing Copilot','Claude AI','Llama','Grok'];

const PROCESS = [
  { n:'01', icon:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', title:'AI Visibility Audit', desc:'Test your brand and content across major AI engines. Identify where you appear, where competitors appear instead, and what content types are being cited in your niche.' },
  { n:'02', icon:'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title:'Content Gap Analysis', desc:'Map your content against the questions and topics where AI engines are citing competitors — identify the highest-value gaps to address first by business impact.' },
  { n:'03', icon:'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title:'Content Optimisation', desc:'Restructure existing content for citation-friendliness — clearer claims, better entity definitions, authoritative sourcing, and E-E-A-T signals that AI models reward.' },
  { n:'04', icon:'M12 6v6m0 0v6m0-6h6m-6 0H6', title:'New Content Creation', desc:'Create comprehensive, citation-worthy content on your most important topics — written for both human readers and AI engine consumption at depth that earns citations.' },
  { n:'05', icon:'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title:'Authority & Link Building', desc:'Build the third-party credibility signals that AI engines use to evaluate source authority — editorial coverage, expert citations, and domain authority improvements.' },
  { n:'06', icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Monitor & Report', desc:'Monthly AI visibility reporting — citation frequency across platforms, brand mention tracking, and AI presence compared to traditional SEO metrics.' },
];

const WHY = [
  { icon:'M13 10V3L4 14h7v7l9-11h-7z', title:'Early Mover Expertise', desc:'We have been studying and testing GEO since Google AI Overviews launched. Our clients are building citation presence while competitors are still ignoring the shift.' },
  { icon:'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', title:'Multi-Platform Approach', desc:'GEO is not just Google. We optimise for citation across ChatGPT, Perplexity, Gemini, Bing Copilot, and emerging AI search engines simultaneously.' },
  { icon:'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title:'SEO + GEO Combined', desc:'GEO works best alongside traditional SEO — not instead of it. We integrate both strategies so your content performs across keyword searches and AI-generated answers.' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Measurable Metrics', desc:'We track concrete AI visibility metrics — citation appearances, AI Overview presence, Perplexity source frequency — so progress is measurable, not theoretical.' },
  { icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'Content-First Execution', desc:'GEO requires high-quality, authoritative content — not technical tricks. Our content specialists write citation-worthy material that earns AI mentions through genuine expertise.' },
  { icon:'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title:'Transparent Reporting', desc:"Monthly reports covering AI visibility alongside traditional SEO metrics — giving a complete picture of your brand's presence across both search paradigms." },
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
  { href:'/ai-seo-services/',                          label:'AI SEO Services'              },
  { href:'/seo-services-company/',                     label:'SEO Services'                 },
  { href:'/content-marketing-services/',               label:'Content Marketing'            },
  { href:'/link-building-services/',                   label:'Link Building Services'       },
  { href:'/seo-audit-services/',                       label:'SEO Audit Services'           },
  { href:'/local-seo-services/',                       label:'Local SEO Services'           },
  { href:'/technical-seo-optimization/',               label:'Technical SEO'                },
  { href:'/answer-engine-optimization-services/',      label:'Answer Engine Optimisation'   },
  { href:'/ppc-management-services/',                  label:'PPC Management'               },
  { href:'/reputation-management-services/',           label:'Reputation Management'        },
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
  const [openFaq, setOpenFaq]     = useState(0);
  const [formSt, setFormSt]       = useState('idle');
  const recaptchaLoaded           = useRef(false);

  useEffect(() => {
    const els = document.querySelectorAll('.geo-reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('geo-vis'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const contact = document.getElementById('geo-contact');
    if (!contact) return;
    const rcObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !recaptchaLoaded.current) {
        const s = document.createElement('script');
        s.src = `https://www.google.com/recaptcha/api.js?render=${RC_KEY}`;
        s.async = true;
        document.head.appendChild(s);
        recaptchaLoaded.current = true;
        rcObs.disconnect();
      }
    }, { rootMargin: '300px' });
    rcObs.observe(contact);
    return () => rcObs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd      = new FormData(e.target);
    const name    = (fd.get('geo-name') || '').trim();
    const email   = (fd.get('geo-email') || '').trim();
    const phone   = (fd.get('geo-phone') || '').trim();
    const company = (fd.get('geo-company') || '').trim();
    const website = (fd.get('geo-website') || '').trim();
    const msg     = (fd.get('geo-msg') || '').trim();
    const consent = document.getElementById('geo-consent')?.checked;
    if (!name || !email || !phone || !company || !msg || !consent) { setFormSt('validation'); return; }
    setFormSt('loading');
    try {
      const token = await new Promise(resolve => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(RC_KEY, { action: 'geo_contact' }).then(resolve);
        });
      });
      const cc  = fd.get('geo-cc') || '';
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email,
          phone: (cc ? cc + ' ' : '') + phone,
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
        <meta name="description" content="GEO services that get your content cited in Google AI Overviews, ChatGPT Search, Perplexity & Gemini. E-E-A-T, structured data, topical authority. 80+ GEO clients, 15+ years SEO experience." />
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
          .geo-reveal{opacity:0;transform:translateY(24px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
          .geo-reveal.geo-vis{opacity:1;transform:translateY(0)}

          /* ── HERO ── */
          .geo-hero{background:linear-gradient(135deg,#f0f9ff 0%,#e0e7ff 30%,#ede9fe 65%,#f0f9ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .geo-orb1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .geo-orb2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(15,52,96,0.08) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .geo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2}
          .geo-hero-inner{text-align:center;position:relative;z-index:2}
          .geo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .geo-bc a{color:#6b7280;text-decoration:none}.geo-bc a:hover{color:#D97706}.geo-bc span{color:#d1d5db}
          .geo-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(15,52,96,0.07);border:1px solid rgba(15,52,96,0.14);border-radius:100px;padding:5px 16px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#114171;margin-bottom:28px}
          .geo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1.5px;color:#0F1F40;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .geo-hero-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .geo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .geo-btn-p{display:inline-flex;align-items:center;gap:8px;background:rgba(15,52,96,0.88);color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(15,52,96,0.25)}
          .geo-btn-p:hover{background:#0F3460;box-shadow:0 8px 32px rgba(15,52,96,0.35);transform:translateY(-2px)}
          .geo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .geo-btn-s:hover{border-color:#D97706;color:#D97706;transform:translateY(-2px)}
          .geo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.90);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(15,52,96,0.08)}
          .geo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(15,52,96,0.08)}.geo-stat:last-child{border-right:none}
          .geo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .geo-stat-v{font-size:1.6rem;font-weight:900;color:#D97706;letter-spacing:-0.5px}

          /* ── SHARED SECTION STYLES ── */
          .geo-sec{padding:80px 40px}
          .geo-white{background:#fff}
          .geo-light{background:#f8fafd}
          .geo-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .geo-h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:12px}
          .geo-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}

          /* ── SERVICE / PROCESS / WHY CARDS ── */
          .geo-g4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
          .geo-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .geo-glass{background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.30) 100%);border:1px solid rgba(255,255,255,0.88);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform .22s,box-shadow .22s,border-color .22s}
          .geo-glass:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(15,52,96,0.12);border-color:rgba(217,119,6,0.25)}
          .geo-nbadge{width:38px;height:38px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:14px;box-shadow:0 4px 12px rgba(15,52,96,0.22);flex-shrink:0}
          .geo-step-num{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#9ca3af;margin-bottom:10px}
          .geo-card-h{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .geo-card-p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}

          /* ── AI PLATFORMS ── */
          .geo-plat-sec{background:linear-gradient(135deg,#0F1F40 0%,#1a3a6b 100%);padding:56px 40px;text-align:center}
          .geo-plat-h{font-size:clamp(1.3rem,2.5vw,1.8rem);font-weight:800;color:#fff;margin-bottom:28px}
          .geo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .geo-pill{background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.22);border-radius:100px;padding:8px 20px;font-size:13px;font-weight:600;color:#fff}

          /* ── COMPARISON TABLE ── */
          .geo-tbl{width:100%;border-collapse:collapse;margin-top:32px}
          .geo-tbl th{padding:12px 16px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#4A6080;text-align:left;border-bottom:2px solid rgba(15,52,96,0.12)}
          .geo-tbl td{padding:14px 16px;font-size:14px;color:#374151;border-bottom:1px solid rgba(15,52,96,0.06);vertical-align:top;line-height:1.55}
          .geo-tbl tr:last-child td{border-bottom:none}
          .geo-tbl tr:hover td{background:rgba(219,234,254,0.30)}
          .geo-tbl td:first-child{font-weight:700;color:#0F1F40}
          .geo-tbl td:nth-child(3){color:#D97706;font-weight:600}

          /* ── FAQ ── */
          .geo-flist{display:flex;flex-direction:column;gap:8px;margin-top:36px}
          .geo-fitem{background:linear-gradient(135deg,rgba(219,234,254,0.45) 0%,rgba(255,255,255,0.85) 60%,rgba(237,233,254,0.25) 100%);border:1px solid rgba(255,255,255,0.88);border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(15,52,96,0.05);transition:border-color .2s}
          .geo-fitem.geo-open{border-color:rgba(217,119,6,0.30)}
          .geo-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .geo-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,0.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .geo-fitem.geo-open .geo-fq-badge{background:#D97706;color:#fff}
          .geo-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .geo-fitem.geo-open .geo-fq-text{color:#92400E}
          .geo-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .geo-fitem.geo-open .geo-fchev{transform:rotate(180deg);color:#D97706}
          .geo-fanswer-wrap{overflow:hidden;max-height:0;transition:max-height .35s ease}
          .geo-fitem.geo-open .geo-fanswer-wrap{max-height:600px}
          .geo-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}

          /* ── CONTACT FORM ── */
          .geo-contact{background:linear-gradient(135deg,rgba(15,52,96,0.05) 0%,rgba(255,255,255,0.92) 50%,rgba(254,243,199,0.18) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .geo-contact-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(15,52,96,0.08) 0%,transparent 70%);pointer-events:none}
          .geo-contact-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.07) 0%,transparent 70%);pointer-events:none}
          .geo-contact-grid{max-width:1200px;margin:0 auto;position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
          .geo-contact-left h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;color:#0F1F40;margin:0 0 16px;line-height:1.15;letter-spacing:-0.5px}
          .geo-contact-left p{font-size:1rem;color:#4A6080;line-height:1.75;margin:0 0 32px}
          .geo-perks{display:flex;flex-direction:column;gap:12px}
          .geo-perk{display:flex;align-items:center;gap:10px;font-size:14px;color:#374151;font-weight:500}
          .geo-perk svg{flex-shrink:0;color:#D97706}
          .geo-form-box{background:rgba(255,255,255,0.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.98);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .geo-form-box h3{font-size:18px;font-weight:800;color:#0F1F40;margin:0 0 22px;letter-spacing:-0.3px}
          .geo-form{display:flex;flex-direction:column;gap:14px}
          .geo-row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
          .geo-fg{display:flex;flex-direction:column;gap:5px}
          .geo-fg label{font-size:12px;font-weight:700;color:#374151;letter-spacing:0.02em;text-transform:uppercase}
          .geo-fg input,.geo-fg textarea,.geo-fg select{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;background:#fff;outline:none;transition:border-color .2s,box-shadow .2s;width:100%}
          .geo-fg input:focus,.geo-fg textarea:focus,.geo-fg select:focus{border-color:#D97706;box-shadow:0 0 0 3px rgba(217,119,6,0.10)}
          .geo-fg textarea{resize:vertical;min-height:110px}
          .geo-phone-wrap{display:flex;gap:8px}
          .geo-phone-wrap select{width:110px;flex-shrink:0}
          .geo-phone-wrap input{flex:1}
          .geo-consent{display:flex;align-items:flex-start;gap:10px;font-size:12px;color:#6b7280;line-height:1.55}
          .geo-consent input[type="checkbox"]{width:16px;height:16px;margin-top:1px;accent-color:#D97706;flex-shrink:0}
          .geo-consent a{color:#D97706;text-decoration:none}
          .geo-submit{padding:14px 28px;background:rgba(15,52,96,0.88);border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.22)}
          .geo-submit:hover:not(:disabled){background:#0F3460;transform:translateY(-2px);box-shadow:0 8px 32px rgba(15,52,96,0.30)}
          .geo-submit:disabled{opacity:.65;cursor:not-allowed}
          .geo-val-err{font-size:13px;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px 14px;margin:0}
          .geo-success{text-align:center;padding:24px 0}
          .geo-success-icon{width:56px;height:56px;background:rgba(217,119,6,0.10);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .geo-success-icon svg{width:28px;height:28px;stroke:#D97706;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
          .geo-success h3{font-size:20px;font-weight:800;color:#0F1F40;margin:0 0 8px}
          .geo-success p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}

          /* ── RELATED SERVICES ── */
          .geo-related{background:linear-gradient(135deg,rgba(219,234,254,0.40) 0%,rgba(255,255,255,0.92) 50%,rgba(254,243,199,0.18) 100%);padding:80px 40px;border-top:1px solid rgba(15,52,96,0.08)}
          .geo-related-in{max-width:1280px;margin:0 auto;text-align:center}
          .geo-related-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6b7280;margin:0 0 14px;display:block}
          .geo-related-ttl{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-0.5px;color:#0F1F40;margin:0 0 14px}
          .geo-related-sub{font-size:15px;color:#4A6080;line-height:1.7;margin:0 auto 36px;max-width:640px}
          .geo-related-divider{border:none;border-top:1px solid rgba(15,52,96,0.10);margin:0 0 32px}
          .geo-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .geo-rtag{display:inline-flex;align-items:center;padding:10px 20px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;transition:all .22s;border:1.5px solid rgba(15,52,96,0.15);background:rgba(15,52,96,0.05);color:#0F3460}
          .geo-rtag:hover{background:rgba(15,52,96,0.12);border-color:#0F3460;transform:translateY(-2px)}

          /* ── RESPONSIVE ── */
          @media(max-width:1024px){.geo-g4{grid-template-columns:repeat(2,1fr)}.geo-g3{grid-template-columns:repeat(2,1fr)}.geo-contact-grid{grid-template-columns:1fr}}
          @media(max-width:768px){
            .geo-hero,.geo-sec,.geo-plat-sec,.geo-contact,.geo-related{padding:60px 24px}
            .geo-hero{padding-top:60px;padding-bottom:0}
            .geo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}
            .geo-stat:nth-child(2){border-right:none}
            .geo-g4,.geo-g3{grid-template-columns:1fr}
            .geo-btns{flex-direction:column;align-items:center}
            .geo-row2{grid-template-columns:1fr}
            .geo-fq{padding:18px 18px 18px 52px}
            .geo-fanswer{padding:0 18px 18px 52px}
            .geo-fq-badge{left:12px}
          }
        `}</style>
      </Head>

      <div className="geo-page">

        {/* ── HERO ── */}
        <section className="geo-hero">
          <div className="geo-orb1"/><div className="geo-orb2"/>
          <div className="geo-in">
            <div className="geo-hero-inner">
              <nav className="geo-bc">
                <Link href="/">Home</Link><span>/</span>
                <Link href="/seo-services-company/">SEO Services</Link><span>/</span>
                <span style={{color:'#D97706'}}>Generative Engine Optimisation</span>
              </nav>
              <span className="geo-eyebrow">
                <span style={{width:6,height:6,borderRadius:'50%',background:'#D97706',display:'inline-block'}}/>
                GEO · Google AI Overviews · ChatGPT · Perplexity · Gemini
              </span>
              <h1 className="geo-h1">Generative Engine Optimisation —<br/><AuroraText>Get Cited in AI Search Answers</AuroraText></h1>
              <p className="geo-hero-sub">Optimise your content for citation in Google AI Overviews, ChatGPT Search, Perplexity, and Gemini — the new frontier of search visibility where being cited replaces being ranked.</p>
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
                    <div className="geo-stat-v">{s.val}</div>
                    <div className="geo-stat-l">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="geo-sec geo-light" id="services">
          <div className="geo-in">
            <div className="geo-reveal">
              <span className="geo-ey">What We Do</span>
              <h2 className="geo-h2">Generative Engine Optimisation <AuroraText>Services</AuroraText></h2>
              <p className="geo-lead">Content restructuring, E-E-A-T authority building, and AI visibility monitoring — optimising your presence across every major AI search platform.</p>
            </div>
            <div className="geo-g4">
              {SERVICES.map((s, i) => (
                <div key={s.n} className="geo-glass geo-reveal" style={{transitionDelay:`${i*55}ms`}}>
                  <div className="geo-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                  </div>
                  <div className="geo-step-num">{s.n}</div>
                  <div className="geo-card-h">{s.title}</div>
                  <p className="geo-card-p">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI PLATFORMS ── */}
        <section className="geo-plat-sec">
          <div className="geo-in" style={{textAlign:'center'}}>
            <h2 className="geo-plat-h">AI Platforms We Optimise For</h2>
            <div className="geo-pills">{PLATFORMS.map(p => <span key={p} className="geo-pill">{p}</span>)}</div>
          </div>
        </section>

        {/* ── GEO vs SEO ── */}
        <section className="geo-sec geo-white" id="geo-vs-seo">
          <div className="geo-in" style={{maxWidth:860}}>
            <div className="geo-reveal">
              <span className="geo-ey">The Difference</span>
              <h2 className="geo-h2">GEO vs Traditional <AuroraText>SEO</AuroraText></h2>
              <p className="geo-lead">Understanding the distinction helps you invest in the right mix of strategies for your current visibility goals.</p>
            </div>
            <div className="geo-reveal" style={{overflowX:'auto'}}>
              <table className="geo-tbl">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Traditional SEO</th>
                    <th>Generative Engine Optimisation (GEO)</th>
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
        <section className="geo-sec geo-light" id="process">
          <div className="geo-in">
            <div className="geo-reveal">
              <span className="geo-ey">How We Work</span>
              <h2 className="geo-h2">Our <AuroraText>GEO Process</AuroraText></h2>
              <p className="geo-lead">Audit AI visibility, identify citation gaps, optimise content, build authority — and track progress monthly across all major AI search platforms.</p>
            </div>
            <div className="geo-g3">
              {PROCESS.map((p, i) => (
                <div key={p.n} className="geo-glass geo-reveal" style={{transitionDelay:`${i*70}ms`}}>
                  <div className="geo-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon}/></svg>
                  </div>
                  <div className="geo-step-num">{p.n}</div>
                  <div className="geo-card-h">{p.title}</div>
                  <p className="geo-card-p">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY 1SOLUTIONS ── */}
        <section className="geo-sec geo-white" id="why-us">
          <div className="geo-in">
            <div className="geo-reveal">
              <span className="geo-ey">Why 1Solutions</span>
              <h2 className="geo-h2">GEO Experts — <AuroraText>SEO Foundation Included</AuroraText></h2>
              <p className="geo-lead">We integrate GEO with your existing SEO strategy — not as a replacement, but as the natural evolution that keeps your brand visible as search changes.</p>
            </div>
            <div className="geo-g3">
              {WHY.map((w, i) => (
                <div key={w.title} className="geo-glass geo-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="geo-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  </div>
                  <div className="geo-card-h">{w.title}</div>
                  <p className="geo-card-p">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="geo-sec geo-light" id="faq">
          <div className="geo-in" style={{maxWidth:900}}>
            <div className="geo-reveal">
              <span className="geo-ey">Common Questions</span>
              <h2 className="geo-h2">GEO Services <AuroraText>FAQs</AuroraText></h2>
              <p className="geo-lead">Everything you need to know about Generative Engine Optimisation and AI search visibility.</p>
            </div>
            <div className="geo-flist">
              {FAQS.map((f, i) => (
                <div key={i} className={`geo-fitem${openFaq === i ? ' geo-open' : ''}`}>
                  <button className="geo-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="geo-fq-badge">{String(i+1).padStart(2,'0')}</span>
                    <span className="geo-fq-text">{f.q}</span>
                    <svg className="geo-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <div className="geo-fanswer-wrap">
                    <div className="geo-fanswer">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section className="geo-contact" id="geo-contact">
          <div className="geo-contact-o1"/><div className="geo-contact-o2"/>
          <div className="geo-contact-grid">
            <div className="geo-contact-left geo-reveal">
              <span className="geo-ey">Free GEO Audit</span>
              <h2>Start Getting Cited in AI Search Answers</h2>
              <p>Tell us your domain and target topics — we&rsquo;ll run a free AI visibility audit and show you exactly where competitors are being cited instead of you, and what it takes to change that.</p>
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

            <div className="geo-form-box geo-reveal">
              <h3>Request a Free GEO Audit</h3>
              {formSt === 'success' ? (
                <div className="geo-success">
                  <div className="geo-success-icon">
                    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>We&rsquo;ll review your AI visibility and reply with a free assessment within one business day.</p>
                </div>
              ) : (
                <form className="geo-form" onSubmit={handleSubmit} noValidate>
                  {formSt === 'validation' && <p className="geo-val-err">Please complete all required fields and accept the privacy policy before submitting.</p>}
                  {formSt === 'error' && <p className="geo-val-err">Something went wrong. Please try again or email us at info@1solutions.biz</p>}
                  <div className="geo-row2">
                    <div className="geo-fg">
                      <label htmlFor="geo-name">Full Name *</label>
                      <input id="geo-name" name="geo-name" type="text" placeholder="Jane Smith" required/>
                    </div>
                    <div className="geo-fg">
                      <label htmlFor="geo-email">Business Email *</label>
                      <input id="geo-email" name="geo-email" type="email" placeholder="jane@company.com" required/>
                    </div>
                  </div>
                  <div className="geo-row2">
                    <div className="geo-fg">
                      <label>Phone Number *</label>
                      <div className="geo-phone-wrap">
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
                  <div className="geo-consent">
                    <input type="checkbox" id="geo-consent"/>
                    <label htmlFor="geo-consent">
                      I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions storing my data to respond to this enquiry. *
                    </label>
                  </div>
                  <button type="submit" className="geo-submit" disabled={formSt === 'loading'}>
                    {formSt === 'loading' ? 'Sending...' : 'Request My Free GEO Audit →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="geo-related">
          <div className="geo-related-in">
            <span className="geo-related-ey">Explore Related Services</span>
            <h2 className="geo-related-ttl">Related SEO &amp; Visibility Services</h2>
            <p className="geo-related-sub">GEO works best as part of a broader search visibility strategy. These services integrate directly with Generative Engine Optimisation.</p>
            <hr className="geo-related-divider"/>
            <div className="geo-related-tags">
              {RELATED.map(({ href, label }) => (
                <Link key={href} href={href} className="geo-rtag">{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
