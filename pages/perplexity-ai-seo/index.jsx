import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const RECAPTCHA_KEY = '6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';

const STATS = [
  { label: 'Brands Cited in Perplexity', val: '200+' },
  { label: 'Avg Citation Rate Increase', val: '+65%' },
  { label: 'AI Search Optimisation Experience', val: '3+ Yrs' },
  { label: 'Pages Optimised for AI Sources', val: '1,000+' },
];

const SERVICES = [
  { n: '01', title: 'Perplexity Source Optimisation', desc: 'Restructuring your existing content to match Perplexity\'s source selection criteria — clear factual claims, authoritative structure, and the semantic signals that make pages the go-to citation for AI-generated answers in your niche.' },
  { n: '02', title: 'AI-Ready Content Creation', desc: 'Creating new pages specifically designed to be cited: concise, factually dense, well-sourced content formatted the way Perplexity\'s retrieval system prefers — direct answers first, supporting evidence immediately following, no filler.' },
  { n: '03', title: 'Authority Signal Building', desc: 'Building the external authority signals that make Perplexity trust your site as a reliable source — editorial backlinks, brand mentions, citation signals, and third-party validation that influence AI source ranking.' },
  { n: '04', title: 'Structured Data & Schema Markup', desc: 'Implementing Schema.org markup that makes your content machine-readable: Article, FAQPage, HowTo, Organization, and specialized schema types that help Perplexity parse and attribute your content correctly in AI-generated summaries.' },
  { n: '05', title: 'Source Credibility Audits', desc: 'Comprehensive audit of your current Perplexity citation performance — which pages are being cited, for which queries, how often, and compared to competitors. Establishes baseline and identifies highest-priority optimisation targets.' },
  { n: '06', title: 'E-E-A-T Signal Strengthening', desc: 'Building the Experience, Expertise, Authoritativeness, and Trustworthiness signals that AI systems use to evaluate source credibility — expert author profiles, credentials, primary research, and demonstrable first-hand knowledge signals.' },
  { n: '07', title: 'AI Citation Monitoring', desc: 'Ongoing tracking of your brand and domain citations across Perplexity queries in your target topic clusters — measuring citation frequency, query coverage, and competitor citation share to identify growth and protection opportunities.' },
  { n: '08', title: 'Competitor Source Analysis', desc: 'Deep analysis of which competitor pages Perplexity is citing and why — reverse-engineering their content structure, authority signals, and topical coverage to identify the gaps you can close to capture their citation share.' },
];

const TOOLS = [
  'Perplexity AI', 'Semrush', 'Ahrefs', 'Google Search Console',
  'Schema Markup Validator', 'BrightEdge', 'Screaming Frog', 'Clearscope',
  'Surfer SEO', 'ChatGPT', 'Claude AI', 'GA4', 'DataForSEO', 'Moz',
];

const PROCESS = [
  { step: '01', title: 'Perplexity Visibility Audit', desc: 'Systematic testing of your target queries in Perplexity to map current citation performance — which pages are being cited, which competitors dominate the source panel, and where your brand is absent in AI-generated answers.' },
  { step: '02', title: 'Source Gap Analysis', desc: 'Identifying the content, authority, and structural gaps between your site and the pages Perplexity currently cites for your target queries — building a precise prioritised list of what needs to change and why.' },
  { step: '03', title: 'Content & Authority Strategy', desc: 'A targeted 90-day roadmap: which pages to optimise, which new content to create, which authority signals to build, and which Schema markup to implement — each item ranked by citation impact and effort required.' },
  { step: '04', title: 'Optimisation & Implementation', desc: 'Executing the strategy: restructuring existing pages, creating new AI-optimised content, implementing structured data, and building authority signals — all reviewed by Perplexity SEO specialists before publishing.' },
  { step: '05', title: 'Citation Tracking & Monitoring', desc: 'Ongoing monitoring of citation frequency and query coverage across your target topic clusters — measuring progress, alerting on competitor citation gains, and surfacing new query opportunities as Perplexity expands.' },
  { step: '06', title: 'Monthly Reporting & Iteration', desc: 'Monthly reports on citation performance, query coverage, and competitive position — with strategic recommendations for the next cycle based on what the data shows is working and where new opportunities have emerged.' },
];

const INDUSTRIES = [
  'Technology & SaaS', 'Healthcare & Medical', 'Finance & FinTech',
  'eCommerce & Retail', 'Legal & Professional Services', 'Real Estate',
  'Education & eLearning', 'Travel & Hospitality',
];

const WHY = [
  { title: 'Perplexity-Specialist Expertise', desc: 'We study how Perplexity selects, ranks, and attributes sources — not just apply generic SEO theory. Our team tracks Perplexity algorithm behaviour, tests source selection patterns, and builds strategies around what actually drives citation in AI search.' },
  { title: 'Citation Rate as the Primary KPI', desc: 'We measure success by citation frequency and query coverage — not just traffic or rankings. Every deliverable is evaluated against one question: will this make Perplexity more likely to cite your content in the queries that matter to your business?' },
  { title: 'E-E-A-T-First Content Strategy', desc: 'Perplexity favours authoritative, expert-backed sources. Every piece of content we create or optimise is built around demonstrable expertise, first-hand experience, and verifiable credibility signals — not keyword density.' },
  { title: 'Structured Data Architecture', desc: 'Schema markup is not an afterthought in our process — it\'s foundational. We implement the right structured data types for your content category so Perplexity can parse, attribute, and cite your content correctly at scale.' },
  { title: 'Competitor Citation Intelligence', desc: 'We continuously monitor which competitor pages Perplexity is citing and why — giving you actionable intelligence on what\'s working for others in your space and exactly what you need to do to capture their citation share.' },
  { title: 'Transparent Citation Reporting', desc: 'Monthly reports show you exactly where you\'re being cited, for which queries, and how that\'s changed over time. No vanity metrics — clear citation frequency and coverage data that connects AI source visibility to business outcomes.' },
];

const TESTIMONIALS = [
  {
    text: 'After three months, Perplexity is citing our legal content in roughly 30% of the queries we track. The structured approach to content restructuring and E-E-A-T signals made a measurable difference.',
    author: 'Sarah Mendes',
    role: 'Marketing Director, Legal Services',
    rating: 5,
  },
  {
    text: "1Solutions built our Perplexity citation strategy from scratch. Now we're appearing as a source in competitive finance queries where we had zero visibility before. The ROI is already tracking ahead of projections.",
    author: 'James Okonkwo',
    role: 'Head of Digital, FinTech Startup',
    rating: 5,
  },
  {
    text: 'The citation monitoring alone is worth it — we now know exactly when and where Perplexity cites us, which competitors are appearing instead, and what to do about it. Clarity we didn\'t have before.',
    author: 'Priya Nair',
    role: 'SEO Lead, SaaS Platform',
    rating: 5,
  },
];

const FAQS = [
  {
    q: 'What is Perplexity AI SEO?',
    a: 'Perplexity AI SEO is the practice of optimising your website content and authority signals to increase the likelihood that Perplexity\'s AI-generated answers cite your pages as sources. When a user asks Perplexity a question in your niche, the AI pulls from a ranked selection of web sources to construct its answer — Perplexity AI SEO focuses on making your content one of those cited sources. It involves content restructuring, structured data implementation, E-E-A-T signal building, and authority development specifically tuned to how Perplexity\'s source retrieval system selects and ranks references.',
  },
  {
    q: 'How does Perplexity choose which sources to cite?',
    a: 'Perplexity uses a retrieval-augmented generation (RAG) system that retrieves relevant web pages and uses them to construct answers. Source selection is influenced by several factors: domain authority and trustworthiness signals, content relevance and specificity to the query, structured data that makes content machine-readable, E-E-A-T signals (expertise, experience, authoritativeness, trustworthiness), content freshness and accuracy, and how directly the page answers the specific query intent. Perplexity tends to favour pages that are factually dense, clearly structured, well-cited by other authoritative sources, and attributed to genuine subject-matter experts.',
  },
  {
    q: 'How long does it take to appear in Perplexity answers?',
    a: 'Results timelines vary based on your starting domain authority, how competitive your target queries are, and how much content optimisation is required. For lower-competition queries where you already have relevant content, citation improvements can appear in 4–8 weeks after optimisation. For competitive queries where you\'re starting from low authority, building to consistent citation typically takes 3–6 months of sustained content and authority development. We set realistic expectations at the start of every engagement based on a baseline visibility audit — you\'ll know what to expect before we begin.',
  },
  {
    q: 'Is Perplexity SEO different from traditional Google SEO?',
    a: 'Yes — the signals overlap but the emphasis shifts significantly. Google SEO focuses heavily on keyword placement, page experience, Core Web Vitals, and a broad technical baseline. Perplexity SEO prioritises source credibility, factual density, direct answer structure, and E-E-A-T signals that make your content trustworthy to AI systems. Traditional SEO rankings are not required to appear in Perplexity citations — a page with strong authority and the right content structure can be cited even if it doesn\'t rank in the top 10 on Google. However, high domain authority (which correlates with strong Google rankings) does support Perplexity source selection, so the two strategies are complementary.',
  },
  {
    q: 'Can any website appear in Perplexity AI answers?',
    a: 'Yes, but competitiveness depends on your domain authority and topic expertise. Sites with high existing authority in their niche have the greatest advantage — their content is already considered a credible source by search systems. Newer or lower-authority sites can still appear in Perplexity citations for niche, lower-competition queries where established authorities have thin content. Our baseline audit identifies which queries represent realistic near-term citation opportunities for your domain versus longer-term targets that require authority building first.',
  },
  {
    q: 'What content works best for Perplexity citations?',
    a: 'Perplexity favours content that directly answers questions with factual specificity — clear, expert-written pages that give Perplexity\'s AI a high-confidence source for a specific claim. The most citeable content types include: comprehensive guides on specific topics from demonstrated experts; research-backed articles with verifiable statistics and primary sources; FAQ pages with precise, detailed answers; "best of" and comparison pages with specific, actionable recommendations; and technical documentation with step-by-step specificity. Vague, general, or thin content — regardless of keyword optimisation — is unlikely to be selected as a Perplexity citation source.',
  },
  {
    q: 'How do you measure Perplexity SEO success?',
    a: 'We track citation frequency (how often Perplexity cites your domain for target queries), citation coverage (what percentage of your target query set includes a citation to your domain), citation share (your domain\'s citations versus competitor domains across the same query set), and query expansion (growth in the number of query topics where you appear as a source). We also track downstream business metrics: referral traffic from Perplexity, brand search volume growth (as AI citations build brand awareness), and leads attributed to AI search channels. Monthly reports present all metrics with trend analysis and strategic interpretation.',
  },
  {
    q: 'Do you offer ongoing Perplexity monitoring as a standalone service?',
    a: 'Yes. If you have an in-house SEO team and want to add Perplexity citation monitoring to your existing stack, we offer citation monitoring as a standalone service. It includes monthly query testing across your target topic clusters, citation frequency and competitor share tracking, new citation opportunity alerts, and a monthly briefing on what\'s changing in Perplexity\'s source behaviour in your niche. This is separate from our full Perplexity optimisation service — contact us to discuss which option fits your team\'s needs.',
  },
];

const RELATED = [
  { href: '/ai-seo-services/', label: 'AI SEO Services' },
  { href: '/answer-engine-optimization-services/', label: 'Answer Engine Optimization' },
  { href: '/generative-engine-optimization-services/', label: 'Generative Engine Optimization' },
  { href: '/chatgpt-seo/', label: 'ChatGPT SEO' },
  { href: '/google-ai-seo/', label: 'Google AI SEO' },
  { href: '/searchgpt-seo/', label: 'SearchGPT SEO' },
  { href: '/ai-search-services/', label: 'AI Search Services' },
  { href: '/seo-services-company/', label: 'SEO Services Company' },
  { href: '/content-marketing-services/', label: 'Content Marketing' },
  { href: '/link-building-services/', label: 'Link Building Services' },
];

const ENGAGE_ROWS = [
  { feature: 'Ideal Project Type', fp: 'Defined scope', tm: 'Evolving scope', ded: 'Long-term growth', off: 'Budget-focused' },
  { feature: 'Pricing Model', fp: 'Fixed monthly', tm: 'Hourly / T&M', ded: 'Monthly retainer', off: 'Cost-efficient' },
  { feature: 'Team Structure', fp: 'Shared team', tm: 'Shared team', ded: 'Dedicated to you', off: 'Offshore team' },
  { feature: 'Flexibility', fp: 'Low', tm: 'High', ded: 'Very High', off: 'Medium' },
  { feature: 'Citation Monitoring', fp: '✓', tm: '✓', ded: '✓', off: '✓' },
  { feature: 'Monthly Reporting', fp: '✓', tm: '✓', ded: '✓', off: '✓' },
  { feature: 'Dedicated Strategist', fp: '✗', tm: '✗', ded: '✓', off: '✗' },
  { feature: 'Custom Schema Build', fp: '✗', tm: '✓', ded: '✓', off: '✓' },
  { feature: 'Priority Response', fp: '48h', tm: '24h', ded: 'Same day', off: '48h' },
];

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#D97706" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

export default function PerplexityAiSeo() {
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
    const contact = document.getElementById('plx-contact');
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
    const name    = (fd.get('plx-name') || '').trim();
    const email   = (fd.get('plx-email') || '').trim();
    const phone   = (fd.get('plx-phone') || '').trim();
    const company = (fd.get('plx-company') || '').trim();
    const website = (fd.get('plx-website') || '').trim();
    const msg     = (fd.get('plx-msg') || '').trim();
    const consent = document.getElementById('plx-consent')?.checked;
    if (!name || !email || !phone || !company || !msg || !consent) { setFormSt('validation'); return; }
    setFormSt('loading');
    try {
      const token = await new Promise(resolve => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(RECAPTCHA_KEY, { action: 'contact' }).then(resolve);
        });
      });
      const cc = fd.get('plx-cc') || '';
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email,
          phone: (cc ? cc + ' ' : '') + phone,
          company,
          message: `Website: ${website || 'Not provided'}\n\n${msg}`,
          source: 'Perplexity AI SEO Services',
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
          { '@type': 'ListItem', position: 2, name: 'AI SEO Services', item: 'https://www.1solutions.biz/ai-seo-services/' },
          { '@type': 'ListItem', position: 3, name: 'Perplexity AI SEO', item: 'https://www.1solutions.biz/perplexity-ai-seo/' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        name: 'Perplexity AI SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Perplexity AI SEO services by 1Solutions — content optimisation, structured data, E-E-A-T signal building, and citation monitoring to make your brand a trusted source in Perplexity AI-generated answers.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '87', bestRating: '5' },
        url: 'https://www.1solutions.biz/perplexity-ai-seo/',
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
        <title>Perplexity AI SEO Services | Get Cited as a Source in Perplexity | 1Solutions</title>
        <meta name="description" content="Perplexity AI SEO services by 1Solutions — content optimisation, E-E-A-T signals, structured data, and citation monitoring to make your brand appear as a trusted source in Perplexity AI answers." />
        <meta name="keywords" content="perplexity ai seo, perplexity seo services, perplexity source optimisation, ai citation seo, perplexity ai search, answer engine optimization, ai search visibility" />
        <link rel="canonical" href="https://www.1solutions.biz/perplexity-ai-seo/" />
        <meta property="og:title" content="Perplexity AI SEO Services | Get Cited in Perplexity AI Answers | 1Solutions" />
        <meta property="og:description" content="Perplexity AI SEO — content optimisation, structured data, E-E-A-T signal building, and citation monitoring to make your brand a trusted Perplexity source." />
        <meta property="og:url" content="https://www.1solutions.biz/perplexity-ai-seo/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .plx-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .plx-page *,.plx-page *::before,.plx-page *::after{box-sizing:border-box}

          /* ── HERO ── */
          .plx-hero{background:linear-gradient(135deg,#eef6ff 0%,#f0faf8 35%,#e8f4fd 70%,#eef6ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .plx-orb1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(15,52,96,0.10) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .plx-orb2{position:absolute;bottom:0;left:-100px;width:480px;height:480px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .plx-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .plx-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(15,52,96,0.07);border:1px solid rgba(15,52,96,0.15);border-radius:100px;padding:5px 16px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0F3460;margin-bottom:28px}
          .plx-pulse{width:7px;height:7px;border-radius:50%;background:#D97706;display:inline-block;animation:plx-pulse 2s ease-in-out infinite}
          @keyframes plx-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(0.85)}}
          .plx-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1.5px;background:linear-gradient(135deg,#0F3460 0%,#1a5276 40%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .plx-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .plx-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .plx-btn-p{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#0F3460,#1a5276);color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(15,52,96,0.30)}
          .plx-btn-p:hover{background:linear-gradient(135deg,#0a2444,#0F3460);box-shadow:0 8px 32px rgba(15,52,96,0.42);transform:translateY(-2px)}
          .plx-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.20);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .plx-btn-s:hover{border-color:#0F3460;background:rgba(255,255,255,0.85);transform:translateY(-2px)}
          .plx-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.65);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.90);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(15,52,96,0.08)}
          .plx-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(15,52,96,0.08)}.plx-stat:last-child{border-right:none}
          .plx-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .plx-stat-v{font-size:1.6rem;font-weight:900;color:#0F3460;letter-spacing:-0.5px}

          /* ── SECTION SHARED ── */
          .plx-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .plx-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#0F3460 0%,#1a5276 50%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .plx-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}

          /* ── SERVICES ── */
          .plx-svc{background:#f8fafd;padding:80px 40px}.plx-svc-in{max-width:1280px;margin:0 auto}
          .plx-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .plx-card{background:linear-gradient(135deg,rgba(238,246,255,0.65) 0%,rgba(255,255,255,0.92) 60%,rgba(224,240,255,0.25) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease}
          .plx-card.visible{opacity:1;transform:translateY(0)}.plx-card:hover{transform:translateY(-6px);border-color:rgba(15,52,96,0.18);box-shadow:0 16px 48px rgba(15,52,96,0.10)}
          .plx-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;letter-spacing:-4px;pointer-events:none;user-select:none}
          .plx-card h3{font-size:15px;font-weight:700;color:#0F3460;margin-bottom:8px;position:relative;z-index:1}
          .plx-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}

          /* ── TOOLS ── */
          .plx-tools{background:linear-gradient(135deg,#0F3460 0%,#1a5276 60%,#0a2444 100%);padding:60px 40px}
          .plx-tools-in{max-width:1280px;margin:0 auto;text-align:center}
          .plx-tools h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .plx-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .plx-pill{background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 20px;font-size:13px;font-weight:600;color:#fff;transition:background 0.2s}
          .plx-pill:hover{background:rgba(255,255,255,0.20)}

          /* ── PROCESS ── */
          .plx-proc{background:linear-gradient(135deg,#eef6ff 0%,#f8fafd 50%,#e8f4fd 100%);padding:80px 40px}
          .plx-proc-in{max-width:900px;margin:0 auto}
          .plx-steps{display:flex;flex-direction:column;margin-top:44px}
          .plx-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(15,52,96,0.08);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .plx-step:last-child{border-bottom:none}.plx-step.visible{opacity:1;transform:translateX(0)}
          .plx-snum{font-size:3rem;font-weight:900;color:rgba(217,119,6,0.18);line-height:1;letter-spacing:-2px}
          .plx-step h3{font-size:1.1rem;font-weight:800;color:#0F3460;margin-bottom:6px}
          .plx-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}

          /* ── INDUSTRIES ── */
          .plx-ind{background:#fff;padding:60px 40px}
          .plx-ind-in{max-width:1280px;margin:0 auto;text-align:center}
          .plx-ind-grid{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:32px}
          .plx-ind-tag{background:linear-gradient(135deg,rgba(15,52,96,0.06) 0%,rgba(15,52,96,0.03) 100%);border:1px solid rgba(15,52,96,0.12);border-radius:50px;padding:10px 22px;font-size:13px;font-weight:600;color:#0F3460;transition:all 0.22s}
          .plx-ind-tag:hover{background:rgba(15,52,96,0.10);border-color:rgba(15,52,96,0.25);transform:translateY(-2px)}

          /* ── WHY ── */
          .plx-why{background:#f8fafd;padding:80px 40px}.plx-why-in{max-width:1280px;margin:0 auto}
          .plx-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .plx-wcard{background:linear-gradient(135deg,rgba(238,246,255,0.60) 0%,rgba(255,255,255,1) 60%,rgba(224,240,255,0.20) 100%);border:1px solid rgba(15,52,96,0.08);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .plx-wcard.visible{opacity:1;transform:translateY(0)}.plx-wcard:hover{border-color:rgba(15,52,96,0.18);box-shadow:0 8px 32px rgba(15,52,96,0.07)}
          .plx-dot{width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,#0F3460,#D97706);margin-bottom:16px}
          .plx-wcard h3{font-size:1rem;font-weight:800;color:#0F3460;margin-bottom:10px}
          .plx-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}

          /* ── TESTIMONIALS ── */
          .plx-testi{background:linear-gradient(135deg,#0F3460 0%,#1a5276 50%,#0a2444 100%);padding:80px 40px}
          .plx-testi-in{max-width:1280px;margin:0 auto}
          .plx-testi-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(217,119,6,0.85);margin-bottom:10px;display:block;text-align:center}
          .plx-testi-ttl{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin-bottom:44px;letter-spacing:-0.5px}
          .plx-testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .plx-tcard{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:16px}
          .plx-tcard-stars{display:flex;gap:3px}
          .plx-tcard-text{font-size:0.92rem;color:rgba(255,255,255,0.88);line-height:1.75;flex:1;font-style:italic}
          .plx-tcard-author{font-size:14px;font-weight:700;color:#fff}
          .plx-tcard-role{font-size:12px;color:rgba(255,255,255,0.55);margin-top:2px}

          /* ── ENGAGEMENT TABLE ── */
          .plx-engage-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1}
          .plx-engage-inner{max-width:1280px;margin:0 auto}
          .plx-engage-header{text-align:center;margin-bottom:52px}
          .plx-engage-title{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#0F3460 0%,#1a5276 50%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 14px}
          .plx-engage-desc{font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 auto}
          .plx-table-wrap{background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,0.95);overflow-x:auto}
          .plx-cmp-table{width:100%;border-collapse:collapse;min-width:680px}
          .plx-cmp-table thead tr{border-bottom:2px solid rgba(15,52,96,0.10)}
          .plx-cmp-th{padding:30px 20px 26px;text-align:center;vertical-align:top}
          .plx-cmp-th:first-child{text-align:left;padding-left:32px;min-width:180px}
          .plx-cmp-th.plx-th-feat{background:linear-gradient(180deg,rgba(254,243,199,0.55) 0%,rgba(255,255,255,0.20) 100%);border-left:1px solid rgba(217,119,6,0.20);border-right:1px solid rgba(217,119,6,0.20)}
          .plx-popular-badge{display:inline-block;font-size:9px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;background:#D97706;color:#fff;padding:3px 10px;border-radius:20px;margin-bottom:10px}
          .plx-plan-badge{display:inline-block;font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:3px 10px;border-radius:20px;margin-bottom:10px;background:rgba(15,52,96,0.08);color:#4A6080}
          .plx-cmp-plan-name{display:block;font-size:15px;font-weight:800;color:#0F3460;margin-bottom:4px;line-height:1.3}
          .plx-cmp-th.plx-th-feat .plx-cmp-plan-name{color:#D97706}
          .plx-cmp-plan-price{display:block;font-size:12px;color:#6B7280;font-weight:500}
          .plx-cmp-table tbody tr{border-bottom:1px solid rgba(15,52,96,0.06);transition:background 0.15s}
          .plx-cmp-table tbody tr:last-child{border-bottom:none}
          .plx-cmp-table tbody tr:nth-child(odd){background:rgba(15,52,96,0.018)}
          .plx-cmp-table tbody tr:hover{background:rgba(15,52,96,0.04)}
          .plx-cmp-td{padding:15px 20px;text-align:center;vertical-align:middle;font-size:13px;color:#4A6080}
          .plx-cmp-td:first-child{text-align:left;padding-left:32px;font-size:13px;font-weight:600;color:#1e293b}
          .plx-cmp-td.plx-th-feat{background:rgba(254,243,199,0.22);border-left:1px solid rgba(217,119,6,0.15);border-right:1px solid rgba(217,119,6,0.15)}
          .plx-tick{color:#16a34a;font-size:17px;line-height:1}
          .plx-cross{color:#d1d5db;font-size:16px;line-height:1}
          .plx-td-text{font-size:12px;color:#4A6080;white-space:nowrap}
          .plx-td-text.hi{color:#0F3460;font-weight:600}

          /* ── FAQ ── */
          .plx-faq{background:#fff;padding:80px 40px}.plx-faq-in{max-width:860px;margin:0 auto}
          .plx-fitem{border-bottom:1px solid #e5e7eb}
          .plx-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F3460;line-height:1.4}
          .plx-fq:hover{color:#D97706}
          .plx-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .plx-fitem.open .plx-ficon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.07)}
          .plx-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .plx-fitem.open .plx-fa{max-height:600px;padding-bottom:22px}

          /* ── CONTACT FORM ── */
          .plx-contact{background:linear-gradient(135deg,rgba(15,52,96,0.05) 0%,rgba(255,255,255,0.90) 50%,rgba(217,119,6,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .plx-contact-o1{position:absolute;top:-80px;right:-80px;width:380px;height:380px;border-radius:50%;background:radial-gradient(circle,rgba(15,52,96,0.09) 0%,transparent 70%);pointer-events:none}
          .plx-contact-o2{position:absolute;bottom:-60px;left:-60px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.07) 0%,transparent 70%);pointer-events:none}
          .plx-contact-in{max-width:1200px;margin:0 auto;position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
          .plx-contact-left h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;background:linear-gradient(135deg,#0F3460,#1a5276,#D97706);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 16px;line-height:1.15;letter-spacing:-0.5px}
          .plx-contact-left p{font-size:1rem;color:#4A6080;line-height:1.75;margin:0 0 32px}
          .plx-contact-perks{display:flex;flex-direction:column;gap:12px}
          .plx-contact-perk{display:flex;align-items:center;gap:10px;font-size:14px;color:#374151;font-weight:500}
          .plx-contact-perk svg{flex-shrink:0;color:#0F3460}
          .plx-form-box{background:rgba(255,255,255,0.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.98);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .plx-form-box h3{font-size:18px;font-weight:800;color:#0F3460;margin:0 0 22px;letter-spacing:-0.3px}
          .plx-form{display:flex;flex-direction:column;gap:14px}
          .plx-row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
          .plx-fg{display:flex;flex-direction:column;gap:5px}
          .plx-fg label{font-size:12px;font-weight:700;color:#374151;letter-spacing:0.02em;text-transform:uppercase}
          .plx-fg input,.plx-fg textarea,.plx-fg select{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;background:#fff;outline:none;transition:border-color 0.2s,box-shadow 0.2s;width:100%}
          .plx-fg input:focus,.plx-fg textarea:focus,.plx-fg select:focus{border-color:#0F3460;box-shadow:0 0 0 3px rgba(15,52,96,0.10)}
          .plx-fg textarea{resize:vertical;min-height:110px}
          .plx-phone-wrap{display:flex;gap:8px}
          .plx-phone-wrap select{width:110px;flex-shrink:0}
          .plx-phone-wrap input{flex:1}
          .plx-consent{display:flex;align-items:flex-start;gap:10px;font-size:12px;color:#6b7280;line-height:1.55}
          .plx-consent input[type="checkbox"]{width:16px;height:16px;margin-top:1px;accent-color:#0F3460;flex-shrink:0}
          .plx-consent a{color:#0F3460;text-decoration:none}
          .plx-submit{padding:14px 28px;background:linear-gradient(135deg,#0F3460,#1a5276);border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.25s;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25)}
          .plx-submit:hover:not(:disabled){background:linear-gradient(135deg,#0a2444,#0F3460);transform:translateY(-2px);box-shadow:0 8px 32px rgba(15,52,96,0.38)}
          .plx-submit:disabled{opacity:0.65;cursor:not-allowed}
          .plx-val-err{font-size:13px;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px 14px;margin:0}
          .plx-success{text-align:center;padding:24px 0}
          .plx-success-icon{width:56px;height:56px;background:rgba(15,52,96,0.08);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .plx-success-icon svg{width:28px;height:28px;stroke:#0F3460;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
          .plx-success h3{font-size:20px;font-weight:800;color:#0F3460;margin:0 0 8px}
          .plx-success p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}

          /* ── RELATED ── */
          .plx-related{background:linear-gradient(135deg,rgba(238,246,255,0.55) 0%,rgba(255,255,255,0.92) 50%,rgba(224,240,255,0.25) 100%);padding:80px 40px;border-top:1px solid rgba(15,52,96,0.08)}
          .plx-related-in{max-width:1280px;margin:0 auto;text-align:center}
          .plx-related-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6b7280;margin:0 0 14px;display:block}
          .plx-related-ttl{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-0.5px;color:#0F3460;margin:0 0 14px}
          .plx-related-sub{font-size:15px;color:#4A6080;line-height:1.7;margin:0 auto 36px;max-width:640px}
          .plx-related-divider{border:none;border-top:1px solid rgba(15,52,96,0.10);margin:0 0 32px}
          .plx-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .plx-rtag{display:inline-flex;align-items:center;padding:10px 20px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;transition:all 0.22s;border:1.5px solid rgba(15,52,96,0.16);background:rgba(15,52,96,0.05);color:#0F3460}
          .plx-rtag:hover{background:rgba(15,52,96,0.12);border-color:#0F3460;transform:translateY(-2px);color:#0a2444}

          /* ── RESPONSIVE ── */
          @media(max-width:1024px){.plx-grid{grid-template-columns:repeat(2,1fr)}.plx-why-grid{grid-template-columns:repeat(2,1fr)}.plx-testi-grid{grid-template-columns:1fr}.plx-contact-in{grid-template-columns:1fr}}
          @media(max-width:768px){
            .plx-hero,.plx-svc,.plx-tools,.plx-proc,.plx-ind,.plx-why,.plx-testi,.plx-engage-section,.plx-faq,.plx-contact,.plx-related{padding:60px 24px}
            .plx-hero{padding-top:60px;padding-bottom:0}
            .plx-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}
            .plx-stat:nth-child(2){border-right:none}
            .plx-grid{grid-template-columns:1fr}
            .plx-why-grid{grid-template-columns:1fr}
            .plx-step{grid-template-columns:56px 1fr}
            .plx-btns{flex-direction:column;align-items:center}
            .plx-row2{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <div className="plx-page">

        {/* ── HERO ── */}
        <section className="plx-hero">
          <div className="plx-orb1"/><div className="plx-orb2"/>
          <div className="plx-in">
            <span className="plx-eyebrow">
              <span className="plx-pulse"/>
              AI Source Visibility &middot; Citation Optimisation &middot; E-E-A-T &middot; Answer Engine SEO
            </span>
            <h1 className="plx-h1">Perplexity AI SEO — Become a Cited Source in AI-Generated Answers</h1>
            <p className="plx-sub">Specialist Perplexity AI SEO services — content optimisation, E-E-A-T signal building, structured data, and citation monitoring to make your brand the trusted source Perplexity chooses when it answers questions in your niche.</p>
            <div className="plx-btns">
              <a href="#plx-contact" className="plx-btn-p">
                Get a Free Perplexity Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <Link href="/ai-seo-services/" className="plx-btn-s">All AI SEO Services</Link>
            </div>
            <div className="plx-stats">
              {STATS.map(s => (
                <div key={s.label} className="plx-stat">
                  <div className="plx-stat-l">{s.label}</div>
                  <div className="plx-stat-v">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="plx-svc">
          <div className="plx-svc-in">
            <span className="plx-ey2">What We Do</span>
            <h2 className="plx-ttl">Perplexity AI SEO Services</h2>
            <p className="plx-desc">Every service is designed around one goal — making Perplexity choose your content as a trusted citation source when users ask questions in your industry.</p>
            <div className="plx-grid" ref={cardsRef}>
              {SERVICES.map((s, i) => (
                <div key={s.n} className={`plx-card${visibleCards.includes(i) ? ' visible' : ''}`}>
                  <div className="plx-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section className="plx-tools">
          <div className="plx-tools-in">
            <h2>Tools &amp; Platforms We Use</h2>
            <div className="plx-pills">
              {TOOLS.map(t => <span key={t} className="plx-pill">{t}</span>)}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="plx-proc">
          <div className="plx-proc-in">
            <span className="plx-ey2">How We Work</span>
            <h2 className="plx-ttl">Our Perplexity SEO Process</h2>
            <p className="plx-desc">From baseline audit to ongoing citation monitoring — a structured approach to building the source credibility Perplexity rewards.</p>
            <div className="plx-steps">
              {PROCESS.map((p, i) => (
                <div key={p.step} ref={el => { stepRefs.current[i] = el; }} className={`plx-step${visibleSteps.includes(i) ? ' visible' : ''}`}>
                  <div className="plx-snum">{p.step}</div>
                  <div><h3>{p.title}</h3><p>{p.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="plx-ind">
          <div className="plx-ind-in">
            <span className="plx-ey2">Industries We Serve</span>
            <h2 className="plx-ttl">Perplexity SEO Across Every Sector</h2>
            <p className="plx-desc" style={{margin:'0 auto 0',maxWidth:640}}>We build Perplexity citation strategies for businesses across verticals — wherever your customers are asking AI questions, we help your brand be the answer.</p>
            <div className="plx-ind-grid">
              {INDUSTRIES.map(ind => <span key={ind} className="plx-ind-tag">{ind}</span>)}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="plx-why">
          <div className="plx-why-in">
            <span className="plx-ey2">Why 1Solutions</span>
            <h2 className="plx-ttl">Citation Expertise. Real Results. Transparent Reporting.</h2>
            <p className="plx-desc">We build Perplexity source credibility through expertise and evidence — not shortcuts or vanity metrics.</p>
            <div className="plx-why-grid" ref={whyRef}>
              {WHY.map((w, i) => (
                <div key={w.title} className={`plx-wcard${visibleWhy.includes(i) ? ' visible' : ''}`}>
                  <div className="plx-dot"/>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="plx-testi">
          <div className="plx-testi-in">
            <span className="plx-testi-ey">Client Results</span>
            <h2 className="plx-testi-ttl">What Our Clients Say</h2>
            <div className="plx-testi-grid">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="plx-tcard">
                  <div className="plx-tcard-stars">{Array.from({length: t.rating}).map((_, j) => <StarIcon key={j}/>)}</div>
                  <p className="plx-tcard-text">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <div className="plx-tcard-author">{t.author}</div>
                    <div className="plx-tcard-role">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT TABLE ── */}
        <section className="plx-engage-section">
          <div className="plx-engage-inner">
            <div className="plx-engage-header">
              <span className="plx-ey2">Engagement Models</span>
              <h2 className="plx-engage-title">Choose the Right Model for Your Business</h2>
              <p className="plx-engage-desc">From fixed-scope projects to fully dedicated Perplexity SEO teams — we adapt to how you work and what your goals require.</p>
            </div>
            <div className="plx-table-wrap">
              <table className="plx-cmp-table">
                <thead>
                  <tr>
                    <th className="plx-cmp-th"></th>
                    <th className="plx-cmp-th">
                      <span className="plx-plan-badge">Fixed Price</span>
                      <span className="plx-cmp-plan-name">Fixed-Price Project</span>
                      <span className="plx-cmp-plan-price">Defined scope &amp; budget</span>
                    </th>
                    <th className="plx-cmp-th">
                      <span className="plx-plan-badge">T&amp;M</span>
                      <span className="plx-cmp-plan-name">Time &amp; Materials</span>
                      <span className="plx-cmp-plan-price">Hourly, flexible scope</span>
                    </th>
                    <th className="plx-cmp-th plx-th-feat">
                      <span className="plx-popular-badge">Most Popular</span>
                      <span className="plx-cmp-plan-name">Dedicated Team</span>
                      <span className="plx-cmp-plan-price">Exclusive monthly retainer</span>
                    </th>
                    <th className="plx-cmp-th">
                      <span className="plx-plan-badge">Offshore</span>
                      <span className="plx-cmp-plan-name">Offshore SEO</span>
                      <span className="plx-cmp-plan-price">Cost-effective delivery</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ENGAGE_ROWS.map(row => (
                    <tr key={row.feature}>
                      <td className="plx-cmp-td">{row.feature}</td>
                      <td className="plx-cmp-td">
                        {row.fp === '✓' ? <span className="plx-tick">✓</span> : row.fp === '✗' ? <span className="plx-cross">✗</span> : <span className={`plx-td-text${row.fp === row.ded ? ' hi' : ''}`}>{row.fp}</span>}
                      </td>
                      <td className="plx-cmp-td">
                        {row.tm === '✓' ? <span className="plx-tick">✓</span> : row.tm === '✗' ? <span className="plx-cross">✗</span> : <span className="plx-td-text">{row.tm}</span>}
                      </td>
                      <td className="plx-cmp-td plx-th-feat">
                        {row.ded === '✓' ? <span className="plx-tick">✓</span> : row.ded === '✗' ? <span className="plx-cross">✗</span> : <span className="plx-td-text hi">{row.ded}</span>}
                      </td>
                      <td className="plx-cmp-td">
                        {row.off === '✓' ? <span className="plx-tick">✓</span> : row.off === '✗' ? <span className="plx-cross">✗</span> : <span className="plx-td-text">{row.off}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="plx-faq">
          <div className="plx-faq-in">
            <span className="plx-ey2">Got Questions?</span>
            <h2 className="plx-ttl">Perplexity AI SEO FAQs</h2>
            <p className="plx-desc" style={{marginBottom:44}}>Everything you need to know about getting your brand cited in Perplexity AI-generated answers.</p>
            <div>
              {FAQS.map((f, i) => (
                <div key={i} className={`plx-fitem${openFaq === i ? ' open' : ''}`}>
                  <button className="plx-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {f.q}
                    <span className="plx-ficon">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="plx-fa" style={openFaq === i ? {maxHeight:600,paddingBottom:22} : {}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section className="plx-contact" id="plx-contact">
          <div className="plx-contact-o1"/><div className="plx-contact-o2"/>
          <div className="plx-contact-in">
            <div className="plx-contact-left">
              <span className="plx-ey2">Free Perplexity Audit</span>
              <h2>Start Getting Cited in Perplexity AI Answers</h2>
              <p>Share your website and tell us which queries matter most to your business — we&rsquo;ll audit your current Perplexity citation performance, identify quick-win optimisation targets, and show you exactly what it will take to become a trusted source. No obligation.</p>
              <div className="plx-contact-perks">
                {[
                  'Perplexity citation baseline audit',
                  'Competitor citation share analysis',
                  'Content & E-E-A-T gap assessment',
                  'Structured data review',
                  'Free, no-obligation findings',
                ].map(perk => (
                  <div key={perk} className="plx-contact-perk">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {perk}
                  </div>
                ))}
              </div>
            </div>

            <div className="plx-form-box">
              <h3>Request a Free Perplexity SEO Audit</h3>
              {formSt === 'success' ? (
                <div className="plx-success">
                  <div className="plx-success-icon">
                    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>A Perplexity AI SEO specialist will review your site and be in touch within 24 hours with initial findings.</p>
                </div>
              ) : (
                <form className="plx-form" onSubmit={handleSubmit} noValidate>
                  {formSt === 'validation' && <p className="plx-val-err">Please complete all required fields and accept the privacy policy before submitting.</p>}
                  {formSt === 'error' && <p className="plx-val-err">Something went wrong. Please try again or email us at info@1solutions.biz</p>}
                  <div className="plx-row2">
                    <div className="plx-fg">
                      <label htmlFor="plx-name">Full Name *</label>
                      <input id="plx-name" name="plx-name" type="text" placeholder="Jane Smith" required/>
                    </div>
                    <div className="plx-fg">
                      <label htmlFor="plx-email">Business Email *</label>
                      <input id="plx-email" name="plx-email" type="email" placeholder="jane@yourcompany.com" required/>
                    </div>
                  </div>
                  <div className="plx-row2">
                    <div className="plx-fg">
                      <label>Phone Number *</label>
                      <div className="plx-phone-wrap">
                        <select name="plx-cc" aria-label="Country code">
                          <option value="+1">+1 US</option>
                          <option value="+1">+1 CA</option>
                          <option value="+61">+61 AU</option>
                          <option value="+44">+44 GB</option>
                          <option value="+91">+91 IN</option>
                        </select>
                        <input name="plx-phone" type="tel" placeholder="Phone number" required aria-label="Phone number"/>
                      </div>
                    </div>
                    <div className="plx-fg">
                      <label htmlFor="plx-company">Company Name *</label>
                      <input id="plx-company" name="plx-company" type="text" placeholder="Your company name" required/>
                    </div>
                  </div>
                  <div className="plx-fg">
                    <label htmlFor="plx-website">Website URL</label>
                    <input id="plx-website" name="plx-website" type="url" placeholder="https://yourwebsite.com"/>
                  </div>
                  <div className="plx-fg">
                    <label htmlFor="plx-msg">Target Queries &amp; SEO Goals *</label>
                    <textarea id="plx-msg" name="plx-msg" rows={4} placeholder="Which queries do you want Perplexity to cite you for? What industry are you in? What are your AI search goals?" required/>
                  </div>
                  <div className="plx-consent">
                    <input type="checkbox" id="plx-consent"/>
                    <label htmlFor="plx-consent">
                      I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions storing my data to respond to this enquiry. *
                    </label>
                  </div>
                  <button type="submit" className="plx-submit" disabled={formSt === 'loading'}>
                    {formSt === 'loading' ? 'Sending...' : 'Request My Free Perplexity Audit →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="plx-related">
          <div className="plx-related-in">
            <span className="plx-related-ey">Explore Related Services</span>
            <h2 className="plx-related-ttl">Related AI SEO &amp; Digital Marketing Services</h2>
            <p className="plx-related-sub">Pair Perplexity AI SEO with complementary services to build complete visibility across every AI search engine — from ChatGPT to Google AI Overviews.</p>
            <hr className="plx-related-divider"/>
            <div className="plx-related-tags">
              {RELATED.map(({ href, label }) => (
                <Link key={href} href={href} className="plx-rtag">{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
