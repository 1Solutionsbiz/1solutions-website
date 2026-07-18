import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const RECAPTCHA_KEY = '6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';

const STATS = [
  { label: 'Sites Audited with AI', val: '500+' },
  { label: 'Avg Organic Traffic Growth', val: '+74%' },
  { label: 'AI Tools Integrated', val: '15+' },
  { label: 'Years SEO Experience', val: '15+' },
];

const SERVICES = [
  { n: '01', title: 'AI-Powered Keyword Research', desc: 'Machine learning keyword clustering, semantic topic mapping, and intent classification at scale — identifying keyword opportunities, gaps, and cannibalisations across thousands of terms in hours, not days.' },
  { n: '02', title: 'AI Content Optimisation', desc: 'NLP-based content scoring using Surfer SEO, Clearscope, and MarketMuse — optimising content for semantic relevance, topical authority, and entity coverage that modern search algorithms reward.' },
  { n: '03', title: 'AI Technical SEO Audits', desc: 'Automated site crawling with AI-driven issue prioritisation — Core Web Vitals, crawl budget analysis, internal link optimisation, and JavaScript rendering issues identified and ranked by ranking impact.' },
  { n: '04', title: 'AI Competitor Intelligence', desc: 'AI-driven gap analysis across competitor keyword portfolios, content strategies, and backlink profiles — identifying the highest-value opportunities to outrank rivals based on difficulty, volume, and business intent.' },
  { n: '05', title: 'Predictive Rank Forecasting', desc: 'Machine learning models that forecast keyword ranking trajectory and traffic growth based on historical patterns, domain authority, and competitive dynamics — giving you a realistic SEO roadmap with measurable milestones.' },
  { n: '06', title: 'AI Content Creation at Scale', desc: 'AI-assisted content production pipelines for blogs, landing pages, and product descriptions — human-edited, SEO-optimised content at the speed and scale that modern content strategies demand.' },
  { n: '07', title: 'AI Link Building Intelligence', desc: 'AI-identified link opportunities from competitor backlink profiles and topical authority gaps — outreach personalisation, prospect scoring, and link velocity analysis to build authority safely and efficiently.' },
  { n: '08', title: 'AI-Powered Analytics & Reporting', desc: 'Automated anomaly detection, trend identification, and attribution modelling — AI dashboards that surface the insights your team needs without hours of manual data processing every month.' },
];

const TOOLS = ['Surfer SEO', 'Clearscope', 'MarketMuse', 'Semrush AI', 'Ahrefs', 'BrightEdge', 'Conductor', 'ChatGPT', 'Claude AI', 'Jasper', 'Screaming Frog', 'Google Search Console', 'GA4', 'DataForSEO'];

const PROCESS = [
  { step: '01', title: 'AI-Driven Site Audit', desc: 'Automated crawl of your entire site using AI-prioritised issue detection — technical health, content quality, and competitive position analysed together to identify the highest-impact optimisation opportunities.' },
  { step: '02', title: 'AI Keyword & Content Gap Analysis', desc: 'Machine learning keyword clustering across your domain and competitors — identifying which topics to own, which content to create, and where existing pages need strengthening for maximum ranking impact.' },
  { step: '03', title: 'Strategy & Roadmap', desc: 'Prioritised 90-day roadmap built from AI analysis — technical fixes, content targets, and link building opportunities ranked by traffic potential and competitive difficulty, with clear owner and timeline.' },
  { step: '04', title: 'AI-Assisted Implementation', desc: 'Content optimisation using NLP scoring tools, technical fixes deployed systematically, and AI-assisted content creation for new pages — all reviewed and approved by human SEO specialists before going live.' },
  { step: '05', title: 'Continuous AI Monitoring', desc: 'Automated rank tracking, Core Web Vitals monitoring, and anomaly alerts — AI surfaces ranking drops, algorithm impact signals, and new opportunities before they become problems or missed revenue.' },
  { step: '06', title: 'Monthly AI Reporting', desc: 'Automated reporting with human commentary — keyword movement, traffic trends, content performance, and link acquisition with AI-generated insights on what changed and why, and next steps.' },
];

const WHY = [
  { title: 'Human Expertise + AI Speed', desc: 'AI tools accelerate analysis, content scoring, and reporting — but every strategy, recommendation, and deliverable is reviewed and interpreted by experienced SEO specialists. We combine AI efficiency with human judgement.' },
  { title: 'Full-Funnel Keyword Coverage', desc: 'AI clustering maps your entire keyword universe — informational, navigational, and commercial — building topic clusters that dominate a subject area rather than chasing individual keywords in isolation.' },
  { title: 'Content That Scores Before It Publishes', desc: 'Every piece of content is scored against NLP benchmarks for semantic relevance and entity coverage before going live. We eliminate guesswork from on-page optimisation — content is built to rank from day one.' },
  { title: 'Faster Technical Issue Resolution', desc: 'AI prioritises which technical SEO issues to fix first by ranking impact — so your team isn\'t spending sprints fixing crawl errors that won\'t move rankings while high-impact issues wait.' },
  { title: 'Scalable to Any Content Volume', desc: 'Whether you need 10 pages or 10,000, AI-assisted workflows scale without proportional cost increases. We can build content strategies that would take traditional agencies years — in months.' },
  { title: 'Transparent, Predictable Results', desc: 'Predictive ranking models give you a realistic traffic growth forecast before campaigns launch — not vanity metrics or vague promises. You see projected outcomes with confidence intervals, not just aspirational targets.' },
];

const FAQS = [
  { q: 'What is AI SEO and how is it different from traditional SEO?', a: 'AI SEO uses artificial intelligence tools — machine learning algorithms, natural language processing (NLP), and large language models — to perform SEO tasks faster, more accurately, and at greater scale than traditional manual methods. Traditional SEO relies on analysts manually reviewing keywords, auditing pages, and interpreting data. AI SEO automates the data-heavy work: keyword clustering across thousands of terms, NLP content scoring, anomaly detection in rank tracking, and predictive modelling — freeing SEO specialists to focus on strategy and creative decisions. The fundamentals of SEO (technical health, content quality, authority) remain the same; AI accelerates how you execute against those fundamentals.' },
  { q: 'Will AI-generated content hurt my rankings?', a: 'Google\'s guidelines evaluate content quality — not how it was produced. AI-generated content that is accurate, helpful, and well-edited performs the same as human-written content of equivalent quality. The risk comes from unedited AI output: factual errors, repetitive phrasing, and lack of genuine expertise signals (E-E-A-T). Our AI content workflow uses AI for structure and drafting, with human SEO editors reviewing every piece for accuracy, expertise, and brand voice before publication. The result is high-quality content at scale — not low-quality content in volume.' },
  { q: 'Which AI SEO tools do you use?', a: 'Our AI SEO stack includes: Surfer SEO and Clearscope for NLP content scoring and optimisation; MarketMuse for topical authority mapping and content gap analysis; Semrush and Ahrefs AI features for keyword research, competitor gap analysis, and link building; Screaming Frog with custom AI-prioritised crawl configurations; Google Search Console and GA4 with AI-assisted anomaly detection; BrightEdge and Conductor for enterprise-level AI reporting; and large language models (ChatGPT, Claude) for content drafting and brief generation. Tool selection is tailored to your industry, budget, and specific SEO goals.' },
  { q: 'How much faster is AI SEO compared to traditional SEO?', a: 'AI dramatically accelerates the research and analysis phases of SEO. Keyword clustering that takes an analyst 3 to 5 days manually can be done in hours. Content audits across hundreds of pages are automated. On-page scoring and optimisation briefs are generated in minutes rather than days. This speed advantage means your SEO strategy moves faster: gaps are identified sooner, content is produced quicker, and technical issues are prioritised automatically. The result is typically faster time-to-ranking for new content and more efficient use of your SEO budget.' },
  { q: 'Can AI predict how long it will take to rank?', a: 'Predictive ranking models can give realistic forecasting ranges based on domain authority, keyword difficulty, historical ranking velocity for your domain, and competitive density. They are probability estimates, not guarantees — ranking timelines depend on algorithm updates, competitor actions, and content quality factors that models approximate rather than perfectly predict. Our predictive reporting sets realistic 3, 6, and 12-month traffic milestones so you know what to expect, and we update the model monthly as actual performance data accumulates.' },
  { q: 'Is AI SEO suitable for small businesses?', a: 'Yes. AI SEO benefits businesses of all sizes — it removes the manual bottleneck that makes SEO expensive and slow for smaller teams. For small businesses, AI tools mean you get comprehensive keyword research, content scoring, and rank tracking that would previously require a large in-house team or expensive agency retainer. We offer AI SEO packages scaled to business size and content volume, from local SMEs to enterprise eCommerce sites with thousands of product pages.' },
  { q: 'Does AI SEO work for eCommerce sites?', a: 'Particularly well. eCommerce sites have large product catalogues that benefit most from AI automation — bulk content scoring across thousands of product pages, automated category page optimisation, AI-prioritised technical crawl issue resolution, and scalable content creation for blog and informational pages. AI also accelerates competitor product keyword gap analysis, surfacing which product terms competitors rank for that you don\'t, across entire category trees simultaneously.' },
  { q: 'How do you ensure AI content passes E-E-A-T requirements?', a: 'E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) requires signals that AI alone cannot provide: real expert authorship, first-hand experience, and demonstrable credentials. Our process addresses this by: assigning AI-drafted content to subject-matter expert editors who add original insights, experiences, and credentials; adding author bios with genuine expertise signals; citing primary sources and original research; building topical authority through consistent expert content over time; and earning third-party mentions and editorial backlinks. AI creates the structure and efficiency; human expertise creates the E-E-A-T signals.' },
];

const RELATED = [
  { href: '/seo-services-company/', label: 'SEO Services Company' },
  { href: '/generative-engine-optimization-services/', label: 'Generative Engine Optimisation' },
  { href: '/technical-seo-optimization/', label: 'Technical SEO' },
  { href: '/content-marketing-services/', label: 'Content Marketing Services' },
  { href: '/ecommerce-seo-services/', label: 'eCommerce SEO Services' },
  { href: '/local-seo-services/', label: 'Local SEO Services' },
  { href: '/link-building-services/', label: 'Link Building Services' },
  { href: '/seo-audit-services/', label: 'SEO Audit Services' },
  { href: '/ppc-management-services/', label: 'PPC Management' },
  { href: '/analytics-cro-services/', label: 'Analytics & CRO' },
];

export default function AiSeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const [formSt, setFormSt] = useState('idle');
  const cardsRef = useRef(null);
  const stepRefs = useRef([]);
  const whyRef = useRef(null);
  const recaptchaLoaded = useRef(false);

  useEffect(() => {
    if (!cardsRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60));
        o.disconnect();
      }
    }, { threshold: 0.05 });
    o.observe(cardsRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const obs = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); }
      }, { threshold: 0.2 });
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!whyRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90));
        o.disconnect();
      }
    }, { threshold: 0.1 });
    o.observe(whyRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const contact = document.getElementById('aiseo-contact');
    if (!contact) return;
    const rcObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !recaptchaLoaded.current) {
        const s = document.createElement('script');
        s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_KEY}`;
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
    const fd = new FormData(e.target);
    const name    = (fd.get('ais-name') || '').trim();
    const email   = (fd.get('ais-email') || '').trim();
    const phone   = (fd.get('ais-phone') || '').trim();
    const company = (fd.get('ais-company') || '').trim();
    const website = (fd.get('ais-website') || '').trim();
    const msg     = (fd.get('ais-msg') || '').trim();
    const consent = document.getElementById('ais-consent')?.checked;
    if (!name || !email || !phone || !company || !msg || !consent) { setFormSt('validation'); return; }
    setFormSt('loading');
    try {
      const token = await new Promise(resolve => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(RECAPTCHA_KEY, { action: 'contact' }).then(resolve);
        });
      });
      const cc = fd.get('ais-cc') || '';
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email,
          phone: (cc ? cc + ' ' : '') + phone,
          company,
          message: `Website: ${website || 'Not provided'}\n\n${msg}`,
          source: 'AI SEO Services Page',
          consent: true,
          recaptchaToken: token,
        }),
      });
      if (res.ok) { setFormSt('success'); e.target.reset(); } else { setFormSt('error'); }
    } catch { setFormSt('error'); }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'AI SEO Services', item: 'https://www.1solutions.biz/ai-seo-services/' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        name: 'AI SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'AI-powered SEO services by 1Solutions — keyword research, content optimisation, technical audits, and predictive analytics using the latest AI and machine learning tools to grow organic traffic faster.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '134', bestRating: '5' },
        url: 'https://www.1solutions.biz/ai-seo-services/',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>AI SEO Services | AI-Powered Search Engine Optimisation | 1Solutions</title>
        <meta name="description" content="AI SEO services by 1Solutions — machine learning keyword research, NLP content optimisation, AI-driven technical audits, and predictive rank forecasting to grow organic traffic faster." />
        <meta name="keywords" content="ai seo services, ai powered seo, machine learning seo, ai keyword research, nlp content optimization, ai seo tools, artificial intelligence seo, ai driven seo" />
        <link rel="canonical" href="https://www.1solutions.biz/ai-seo-services/" />
        <meta property="og:title" content="AI SEO Services | AI-Powered Search Engine Optimisation | 1Solutions" />
        <meta property="og:description" content="AI-powered SEO services — machine learning keyword research, NLP content optimisation, AI technical audits, and predictive rank forecasting." />
        <meta property="og:url" content="https://www.1solutions.biz/ai-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .aiseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .aiseo-page *,.aiseo-page *::before,.aiseo-page *::after{box-sizing:border-box}

          /* ── HERO ── */
          .aiseo-hero{background:linear-gradient(135deg,#eef2ff 0%,#f0f9ff 35%,#e0e7ff 70%,#eef2ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .aiseo-orb1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.13) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .aiseo-orb2{position:absolute;bottom:0;left:-100px;width:480px;height:480px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,0.09) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .aiseo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}.aiseo-bc a:hover{color:#6366f1}.aiseo-bc span{color:#d1d5db}
          .aiseo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.22);border-radius:100px;padding:5px 16px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#4f46e5;margin-bottom:28px}
          .aiseo-pulse{width:7px;height:7px;border-radius:50%;background:#6366f1;display:inline-block;animation:aiseo-pulse 2s ease-in-out infinite}
          @keyframes aiseo-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(0.85)}}
          .aiseo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1.5px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .aiseo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .aiseo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .aiseo-btn-p{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#4f46e5,#6366f1);color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(99,102,241,0.30)}
          .aiseo-btn-p:hover{background:linear-gradient(135deg,#3730a3,#4f46e5);box-shadow:0 8px 32px rgba(99,102,241,0.42);transform:translateY(-2px)}
          .aiseo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(99,102,241,0.22);color:#4f46e5;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .aiseo-btn-s:hover{border-color:#6366f1;background:rgba(255,255,255,0.85);transform:translateY(-2px)}
          .aiseo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.60);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.90);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(99,102,241,0.08)}
          .aiseo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(99,102,241,0.08)}.aiseo-stat:last-child{border-right:none}
          .aiseo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .aiseo-stat-v{font-size:1.6rem;font-weight:900;color:#4f46e5;letter-spacing:-0.5px}

          /* ── SECTION SHARED ── */
          .aiseo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6366f1;margin-bottom:10px;display:block}
          .aiseo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .aiseo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}

          /* ── SERVICES ── */
          .aiseo-svc{background:#f8fafd;padding:80px 40px}.aiseo-svc-in{max-width:1280px;margin:0 auto}
          .aiseo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .aiseo-card{background:linear-gradient(135deg,rgba(238,242,255,0.65) 0%,rgba(255,255,255,0.92) 60%,rgba(224,231,255,0.25) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(99,102,241,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease}
          .aiseo-card.visible{opacity:1;transform:translateY(0)}.aiseo-card:hover{transform:translateY(-6px);border-color:rgba(99,102,241,0.22);box-shadow:0 16px 48px rgba(99,102,241,0.10)}
          .aiseo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#6366f1;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .aiseo-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .aiseo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}

          /* ── TOOLS ── */
          .aiseo-tools{background:linear-gradient(135deg,#1e1b4b 0%,#4f46e5 60%,#0ea5e9 100%);padding:60px 40px}
          .aiseo-tools-in{max-width:1280px;margin:0 auto;text-align:center}
          .aiseo-tools h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .aiseo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .aiseo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);border-radius:100px;padding:8px 20px;font-size:13px;font-weight:600;color:#fff;transition:background 0.2s}
          .aiseo-pill:hover{background:rgba(255,255,255,0.22)}

          /* ── PROCESS ── */
          .aiseo-proc{background:linear-gradient(135deg,#eef2ff 0%,#f8fafd 50%,#e0e7ff 100%);padding:80px 40px}
          .aiseo-proc-in{max-width:900px;margin:0 auto}
          .aiseo-steps{display:flex;flex-direction:column;margin-top:44px}
          .aiseo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(99,102,241,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .aiseo-step:last-child{border-bottom:none}.aiseo-step.visible{opacity:1;transform:translateX(0)}
          .aiseo-snum{font-size:3rem;font-weight:900;color:rgba(99,102,241,0.15);line-height:1;letter-spacing:-2px}
          .aiseo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .aiseo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}

          /* ── WHY ── */
          .aiseo-why{background:#fff;padding:80px 40px}.aiseo-why-in{max-width:1280px;margin:0 auto}
          .aiseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .aiseo-wcard{background:linear-gradient(135deg,rgba(238,242,255,0.60) 0%,rgba(255,255,255,1) 60%,rgba(224,231,255,0.20) 100%);border:1px solid rgba(99,102,241,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .aiseo-wcard.visible{opacity:1;transform:translateY(0)}.aiseo-wcard:hover{border-color:rgba(99,102,241,0.22);box-shadow:0 8px 32px rgba(99,102,241,0.08)}
          .aiseo-dot{width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,#4f46e5,#0ea5e9);margin-bottom:16px}
          .aiseo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .aiseo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}

          /* ── FAQ ── */
          .aiseo-faq{background:#f8fafd;padding:80px 40px}.aiseo-faq-in{max-width:860px;margin:0 auto}
          .aiseo-fitem{border-bottom:1px solid #e5e7eb}
          .aiseo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .aiseo-fq:hover{color:#4f46e5}
          .aiseo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .aiseo-fitem.open .aiseo-ficon{border-color:#6366f1;color:#4f46e5;background:rgba(99,102,241,0.07)}
          .aiseo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .aiseo-fitem.open .aiseo-fa{max-height:600px;padding-bottom:22px}

          /* ── CONTACT FORM ── */
          .aiseo-contact{background:linear-gradient(135deg,rgba(99,102,241,0.06) 0%,rgba(255,255,255,0.90) 50%,rgba(14,165,233,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .aiseo-contact-o1{position:absolute;top:-80px;right:-80px;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.10) 0%,transparent 70%);pointer-events:none}
          .aiseo-contact-o2{position:absolute;bottom:-60px;left:-60px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,0.08) 0%,transparent 70%);pointer-events:none}
          .aiseo-contact-in{max-width:1200px;margin:0 auto;position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
          .aiseo-contact-left h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 16px;line-height:1.15;letter-spacing:-0.5px}
          .aiseo-contact-left p{font-size:1rem;color:#4A6080;line-height:1.75;margin:0 0 32px}
          .aiseo-contact-perks{display:flex;flex-direction:column;gap:12px}
          .aiseo-contact-perk{display:flex;align-items:center;gap:10px;font-size:14px;color:#374151;font-weight:500}
          .aiseo-contact-perk svg{flex-shrink:0;color:#4f46e5}
          .aiseo-form-box{background:rgba(255,255,255,0.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.98);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(99,102,241,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .aiseo-form-box h3{font-size:18px;font-weight:800;color:#0F1F40;margin:0 0 22px;letter-spacing:-0.3px}
          .aiseo-form{display:flex;flex-direction:column;gap:14px}
          .aiseo-row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
          .aiseo-fg{display:flex;flex-direction:column;gap:5px}
          .aiseo-fg label{font-size:12px;font-weight:700;color:#374151;letter-spacing:0.02em;text-transform:uppercase}
          .aiseo-fg input,.aiseo-fg textarea,.aiseo-fg select{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;background:#fff;outline:none;transition:border-color 0.2s,box-shadow 0.2s;width:100%}
          .aiseo-fg input:focus,.aiseo-fg textarea:focus,.aiseo-fg select:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,0.10)}
          .aiseo-fg textarea{resize:vertical;min-height:110px}
          .aiseo-phone-wrap{display:flex;gap:8px}
          .aiseo-phone-wrap select{width:110px;flex-shrink:0}
          .aiseo-phone-wrap input{flex:1}
          .aiseo-consent{display:flex;align-items:flex-start;gap:10px;font-size:12px;color:#6b7280;line-height:1.55}
          .aiseo-consent input[type="checkbox"]{width:16px;height:16px;margin-top:1px;accent-color:#6366f1;flex-shrink:0}
          .aiseo-consent a{color:#6366f1;text-decoration:none}
          .aiseo-submit{padding:14px 28px;background:linear-gradient(135deg,#4f46e5,#6366f1);border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.25s;width:100%;box-shadow:0 6px 24px rgba(99,102,241,0.25)}
          .aiseo-submit:hover:not(:disabled){background:linear-gradient(135deg,#3730a3,#4f46e5);transform:translateY(-2px);box-shadow:0 8px 32px rgba(99,102,241,0.38)}
          .aiseo-submit:disabled{opacity:0.65;cursor:not-allowed}
          .aiseo-val-err{font-size:13px;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px 14px;margin:0}
          .aiseo-success{text-align:center;padding:24px 0}
          .aiseo-success-icon{width:56px;height:56px;background:rgba(99,102,241,0.10);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .aiseo-success-icon svg{width:28px;height:28px;stroke:#4f46e5;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
          .aiseo-success h3{font-size:20px;font-weight:800;color:#0F1F40;margin:0 0 8px}
          .aiseo-success p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}

          /* ── RELATED ── */
          .aiseo-related{background:linear-gradient(135deg,rgba(238,242,255,0.55) 0%,rgba(255,255,255,0.92) 50%,rgba(224,231,255,0.25) 100%);padding:80px 40px;border-top:1px solid rgba(99,102,241,0.09)}
          .aiseo-related-in{max-width:1280px;margin:0 auto;text-align:center}
          .aiseo-related-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6b7280;margin:0 0 14px;display:block}
          .aiseo-related-ttl{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-0.5px;color:#0F1F40;margin:0 0 14px}
          .aiseo-related-sub{font-size:15px;color:#4A6080;line-height:1.7;margin:0 auto 36px;max-width:640px}
          .aiseo-related-divider{border:none;border-top:1px solid rgba(99,102,241,0.12);margin:0 0 32px}
          .aiseo-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .aiseo-rtag{display:inline-flex;align-items:center;padding:10px 20px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;transition:all 0.22s;border:1.5px solid rgba(99,102,241,0.18);background:rgba(99,102,241,0.06);color:#3730a3}
          .aiseo-rtag:hover{background:rgba(99,102,241,0.13);border-color:#6366f1;transform:translateY(-2px);color:#4f46e5}

          /* ── RESPONSIVE ── */
          @media(max-width:1024px){.aiseo-grid{grid-template-columns:repeat(2,1fr)}.aiseo-why-grid{grid-template-columns:repeat(2,1fr)}.aiseo-contact-in{grid-template-columns:1fr}}
          @media(max-width:768px){
            .aiseo-hero,.aiseo-svc,.aiseo-tools,.aiseo-proc,.aiseo-why,.aiseo-faq,.aiseo-contact,.aiseo-related{padding:60px 24px}
            .aiseo-hero{padding-top:60px;padding-bottom:0}
            .aiseo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}
            .aiseo-stat:nth-child(2){border-right:none}
            .aiseo-grid{grid-template-columns:1fr}
            .aiseo-why-grid{grid-template-columns:1fr}
            .aiseo-step{grid-template-columns:56px 1fr}
            .aiseo-btns{flex-direction:column;align-items:center}
            .aiseo-row2{grid-template-columns:1fr}
          }
        
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>

      <div className="aiseo-page">

        {/* ── HERO ── */}
        <section className="aiseo-hero">
          <div className="aiseo-orb1"/><div className="aiseo-orb2"/>
          <div className="aiseo-in">
            <span className="aiseo-ey">
              <span className="aiseo-pulse"/>
              AI-Powered · Machine Learning · NLP · Predictive Analytics
            </span>
            <h1 className="aiseo-h1">AI SEO Services — Smarter SEO, Faster Results</h1>
            <p className="aiseo-sub">Machine learning keyword research, NLP content optimisation, AI-driven technical audits, and predictive rank forecasting — the full power of artificial intelligence applied to search engine optimisation.</p>
            <div className="aiseo-btns">
              <a href="#aiseo-contact" className="aiseo-btn-p">
                Get a Free AI SEO Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <Link href="/seo-services-company" className="aiseo-btn-s">All SEO Services</Link>
            </div>
            <div className="aiseo-stats">
              {STATS.map(s => (
                <div key={s.label} className="aiseo-stat">
                  <div className="aiseo-stat-l">{s.label}</div>
                  <div className="aiseo-stat-v">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="aiseo-svc">
          <div className="aiseo-svc-in">
            <span className="aiseo-ey2">What We Do</span>
            <h2 className="aiseo-ttl">AI SEO Services</h2>
            <p className="aiseo-desc">From keyword clustering to predictive rank forecasting — every phase of SEO accelerated and sharpened by AI and machine learning tools.</p>
            <div className="aiseo-grid" ref={cardsRef}>
              {SERVICES.map((s, i) => (
                <div key={s.n} className={`aiseo-card${visibleCards.includes(i) ? ' visible' : ''}`}>
                  <div className="aiseo-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section className="aiseo-tools">
          <div className="aiseo-tools-in">
            <h2>AI Tools &amp; Platforms We Use</h2>
            <div className="aiseo-pills">
              {TOOLS.map(t => <span key={t} className="aiseo-pill">{t}</span>)}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="aiseo-proc">
          <div className="aiseo-proc-in">
            <span className="aiseo-ey2">How We Work</span>
            <h2 className="aiseo-ttl">Our AI SEO Process</h2>
            <p className="aiseo-desc">Audit to monthly reporting — a structured workflow where AI handles data-heavy analysis and human specialists handle strategy and execution.</p>
            <div className="aiseo-steps">
              {PROCESS.map((p, i) => (
                <div key={p.step} ref={el => { stepRefs.current[i] = el; }} className={`aiseo-step${visibleSteps.includes(i) ? ' visible' : ''}`}>
                  <div className="aiseo-snum">{p.step}</div>
                  <div><h3>{p.title}</h3><p>{p.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="aiseo-why">
          <div className="aiseo-why-in">
            <span className="aiseo-ey2">Why 1Solutions</span>
            <h2 className="aiseo-ttl">AI Speed. Human Strategy. Real Results.</h2>
            <p className="aiseo-desc">AI tools amplify SEO — they don&rsquo;t replace the strategy, creativity, and expertise that actually move rankings. We combine both.</p>
            <div className="aiseo-why-grid" ref={whyRef}>
              {WHY.map((w, i) => (
                <div key={w.title} className={`aiseo-wcard${visibleWhy.includes(i) ? ' visible' : ''}`}>
                  <div className="aiseo-dot"/>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="aiseo-faq">
          <div className="aiseo-faq-in">
            <span className="aiseo-ey2">Got Questions?</span>
            <h2 className="aiseo-ttl">AI SEO FAQs</h2>
            <p className="aiseo-desc" style={{marginBottom:44}}>Everything you need to know about AI-powered SEO before starting a campaign.</p>
            <div>
              {FAQS.map((f, i) => (
                <div key={i} className={`aiseo-fitem${openFaq === i ? ' open' : ''}`}>
                  <button className="aiseo-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {f.q}
                    <span className="aiseo-ficon">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="aiseo-fa" style={openFaq === i ? {maxHeight:600,paddingBottom:22} : {}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section className="aiseo-contact" id="aiseo-contact">
          <div className="aiseo-contact-o1"/><div className="aiseo-contact-o2"/>
          <div className="aiseo-contact-in">
            <div className="aiseo-contact-left">
              <span className="aiseo-ey2">Free AI SEO Audit</span>
              <h2>Start Growing Organic Traffic Faster with AI</h2>
              <p>Share your website and goals — we&rsquo;ll audit your current SEO performance, identify AI-driven quick wins, and show you exactly how our AI SEO approach will accelerate your rankings. No obligation.</p>
              <div className="aiseo-contact-perks">
                {[
                  'AI-powered keyword gap analysis',
                  'Content scoring & NLP audit',
                  'Technical SEO health check',
                  'Competitor intelligence report',
                  'Free, no-obligation findings',
                ].map(perk => (
                  <div key={perk} className="aiseo-contact-perk">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {perk}
                  </div>
                ))}
              </div>
            </div>

            <div className="aiseo-form-box">
              <h3>Request a Free AI SEO Audit</h3>
              {formSt === 'success' ? (
                <div className="aiseo-success">
                  <div className="aiseo-success-icon">
                    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>An AI SEO specialist will review your site and be in touch within 24 hours with initial findings.</p>
                </div>
              ) : (
                <form className="aiseo-form" onSubmit={handleSubmit} noValidate>
                  {formSt === 'validation' && <p className="aiseo-val-err">Please complete all required fields and accept the privacy policy before submitting.</p>}
                  {formSt === 'error' && <p className="aiseo-val-err">Something went wrong. Please try again or email us at info@1solutions.biz</p>}
                  <div className="aiseo-row2">
                    <div className="aiseo-fg">
                      <label htmlFor="ais-name">Full Name *</label>
                      <input id="ais-name" name="ais-name" type="text" placeholder="Jane Smith" required/>
                    </div>
                    <div className="aiseo-fg">
                      <label htmlFor="ais-email">Business Email *</label>
                      <input id="ais-email" name="ais-email" type="email" placeholder="jane@yourcompany.com" required/>
                    </div>
                  </div>
                  <div className="aiseo-row2">
                    <div className="aiseo-fg">
                      <label>Phone Number *</label>
                      <div className="aiseo-phone-wrap">
                        <select name="ais-cc" aria-label="Country code">
                          <option value="+1">+1 US</option>
                          <option value="+1">+1 CA</option>
                          <option value="+61">+61 AU</option>
                          <option value="+44">+44 GB</option>
                          <option value="+91">+91 IN</option>
                        </select>
                        <input name="ais-phone" type="tel" placeholder="Phone number" required aria-label="Phone number"/>
                      </div>
                    </div>
                    <div className="aiseo-fg">
                      <label htmlFor="ais-company">Company Name *</label>
                      <input id="ais-company" name="ais-company" type="text" placeholder="Your company name" required/>
                    </div>
                  </div>
                  <div className="aiseo-fg">
                    <label htmlFor="ais-website">Website URL</label>
                    <input id="ais-website" name="ais-website" type="url" placeholder="https://yourwebsite.com"/>
                  </div>
                  <div className="aiseo-fg">
                    <label htmlFor="ais-msg">Tell Us About Your SEO Goals *</label>
                    <textarea id="ais-msg" name="ais-msg" rows={4} placeholder="Current traffic, target keywords, main competitors, monthly organic traffic goal, industry..." required/>
                  </div>
                  <div className="aiseo-consent">
                    <input type="checkbox" id="ais-consent"/>
                    <label htmlFor="ais-consent">
                      I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions storing my data to respond to this enquiry. *
                    </label>
                  </div>
                  <button type="submit" className="aiseo-submit" disabled={formSt === 'loading'}>
                    {formSt === 'loading' ? 'Sending...' : 'Request My Free AI SEO Audit →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="aiseo-related">
          <div className="aiseo-related-in">
            <span className="aiseo-related-ey">Explore Related Services</span>
            <h2 className="aiseo-related-ttl">Related SEO &amp; Digital Marketing Services</h2>
            <p className="aiseo-related-sub">Pair AI SEO with complementary services to build a complete digital presence that performs across search, content, and paid channels.</p>
            <hr className="aiseo-related-divider"/>
            <div className="aiseo-related-tags">
              {RELATED.map(({ href, label }) => (
                <Link key={href} href={href} className="aiseo-rtag">{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
