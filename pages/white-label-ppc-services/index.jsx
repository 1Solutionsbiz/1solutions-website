'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

function AuroraText({ children }) {
  return (
    <span style={{background:'linear-gradient(135deg,#f43f5e,#ec4899,#a855f7,#8b5cf6,#3b82f6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',backgroundSize:'200% auto',animation:'wlp-aurora 4s linear infinite'}}>{children}</span>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────── */
const STATS = [
  { label:'Agency Partners',       val:'90+'      },
  { label:'Monthly Ad Spend Mgd',  val:'$2M+'     },
  { label:'Avg Client ROAS Lift',  val:'38%'      },
  { label:'Certified Specialists', val:'Google · Meta' },
];

const SERVICES = [
  { n:'01', icon:'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title:'Google Search Ads', desc:'Keyword strategy, ad copy, bid management, Quality Score optimisation, and negative keyword hygiene — managed to your client\'s CPA or ROAS target, reported under your brand.' },
  { n:'02', icon:'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', title:'Google Shopping & PMax', desc:'Product feed optimisation, Performance Max campaign architecture, bidding strategy, and audience signals for eCommerce clients — with branded performance reports each month.' },
  { n:'03', icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1', title:'Meta Ads (Facebook & Instagram)', desc:'Prospecting and retargeting campaigns across Facebook and Instagram. Creative strategy, audience segmentation, funnel structure, and spend efficiency — all white-labelled.' },
  { n:'04', icon:'M15 10l4.553-2.069A1 1 0 0121 8.876V15.12a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', title:'YouTube & Display Ads', desc:'Video ad campaign management across YouTube — TrueView, bumper, and discovery formats. Display network campaigns for brand awareness, remarketing, and competitor targeting.' },
  { n:'05', icon:'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title:'LinkedIn Ads', desc:'Sponsored content, lead gen forms, and message ads for B2B clients. Audience targeting by job title, company size, and industry — with full white-label reporting for your agency.' },
  { n:'06', icon:'M13 10V3L4 14h7v7l9-11h-7z', title:'Remarketing & Retargeting', desc:'Cross-platform retargeting across Google Display, Meta, and YouTube — re-engaging visitors who didn\'t convert on first touch and nudging them back through the funnel.' },
  { n:'07', icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Branded PPC Reporting', desc:'Monthly reports in your agency\'s colours and logo — covering impressions, clicks, CTR, CPC, CPA, ROAS, spend pacing, and next-month recommendations. Your clients see your brand.' },
  { n:'08', icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'PPC Audits', desc:'Comprehensive audits of existing Google Ads, Meta Ads, or Microsoft Ads accounts — identifying wasted spend, Quality Score issues, and structural problems. Delivered in your brand template.' },
];

const HOW_IT_WORKS = [
  { n:'01', icon:'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', title:'Partner Onboarding', desc:'Sign a mutual NDA, grant us read/write access to your client\'s ad accounts (no billing access required), and share the client goals. Onboarding takes one business day.' },
  { n:'02', icon:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title:'Strategy & Campaign Build', desc:'We audit the existing account (or build from scratch), define the campaign architecture, and present the strategy to you — which you then approve and, if desired, present to your client.' },
  { n:'03', icon:'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title:'We Manage, You Own the Relationship', desc:'We run campaigns daily — adjustments, bid optimisation, A/B testing, and spend pacing. You\'re the account owner your clients communicate with. We operate entirely in the background.' },
  { n:'04', icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'White-Label Reports Delivered', desc:'Branded monthly performance reports arrive 3–5 business days before month-end. You review, customise if needed, and send to your client — under your name, not ours.' },
];

const WHY = [
  { icon:'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title:'Strict Non-Poaching Policy', desc:'We never contact your clients directly. No outreach, no pitching, no acknowledgement that we exist. Your client relationship and billing arrangement remain entirely yours.' },
  { icon:'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', title:'Google & Meta Certified', desc:'Our PPC team holds Google Ads and Meta Blueprint certifications. Your clients get certified expertise behind their campaigns — presented under your agency brand.' },
  { icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title:'Dedicated Account Manager', desc:'One point of contact for all your client accounts. Direct Slack or email access — no ticket queues, no rotating staff. They know your clients, your preferences, and your escalation process.' },
  { icon:'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', title:'Performance-First Approach', desc:'We manage to the KPIs that matter to your clients — CPA, ROAS, or lead volume — not just impressions and click rates. Monthly reporting leads with business outcomes, not vanity metrics.' },
  { icon:'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title:'Multi-Platform Expertise', desc:'Google Search, Shopping, Performance Max, Meta, YouTube, LinkedIn, and Microsoft Ads — managed under one partner account. No need to find separate specialists per platform.' },
  { icon:'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', title:'Fully Branded Deliverables', desc:'All strategy decks, audit PDFs, monthly reports, and ad copy documents carry your agency name and logo. We can match your exact brand colours, fonts, and report template style.' },
];

const WHO_FOR = [
  { icon:'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title:'Digital Marketing Agencies', desc:'Offer Google and Meta Ads management as a core service without a full in-house paid media team. Keep 100% of the margin between your sell rate and our wholesale rate.' },
  { icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1', title:'SEO-Focused Agencies', desc:'Your clients ask for PPC alongside SEO. White-label paid media management lets you retain those budgets without hiring a separate paid media team or referring clients elsewhere.' },
  { icon:'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', title:'Freelance PPC Consultants', desc:'Win larger accounts or manage overflow. We handle execution while you maintain strategy ownership and client billing — scaling your personal capacity without the employment overhead.' },
  { icon:'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z', title:'Web Design & Dev Studios', desc:'Clients who come to you for a website often need traffic immediately after launch. Offer PPC as a packaged add-on and retain the ongoing retainer without building a paid media practice.' },
];

const DELIVERABLES = [
  'Monthly white-labelled PDF performance report (your branding)',
  'Spend pacing tracker with budget vs actual',
  'Keyword and search term performance breakdown',
  'Ad copy A/B test results and current winners',
  'Conversion tracking audit and notes',
  'Campaign and ad group structure change log',
  'Next-month optimisation plan and budget recommendation',
  'Dedicated account manager — direct Slack or email access',
];

const PLATFORMS = ['Google Search Ads','Google Shopping','Performance Max','Meta (Facebook & Instagram)','YouTube Ads','Display Network','Microsoft / Bing Ads','LinkedIn Ads','Remarketing (cross-platform)'];

const FAQS = [
  { q:'Will 1Solutions ever approach my clients directly?', a:'No — and this is contractually enforced in the partner agreement. We do not contact your clients by any channel. We do not pitch them, follow them on LinkedIn, or acknowledge that we manage their campaigns. If a client ever asks who runs their ads, we advise partners to simply say "our in-house paid media team." We never contradict that.' },
  { q:'How does billing work — do my clients pay you directly?', a:'No. You pay us a wholesale management fee per client account per month. You invoice your client at whatever rate you choose. There is no billing relationship between us and your clients. Our invoices carry our company name but nothing that would appear in any client-facing communication unless you choose to disclose the relationship.' },
  { q:'Do you need admin access to my client\'s Google Ads or Meta accounts?', a:'We need standard manager access (Google Ads MCC link, Meta Business Manager partner access). We do not require billing access — your clients keep their billing details on their own accounts. We manage campaigns; they retain ownership of the account and billing. If a client prefers we use a separate ad account linked to their billing, we can accommodate that too.' },
  { q:'What is the minimum spend you manage, and is there a minimum contract?', a:'We manage accounts from $1,000/month ad spend upwards. There is no minimum contract — we work month-to-month. That said, PPC benefits from continuity (learning periods, seasonality optimisation), so most partner relationships run on rolling quarterly or annual schedules once the initial results are visible. No lock-in means you can start with one test client and scale at your own pace.' },
  { q:'What certifications do your PPC managers hold?', a:'Our team holds Google Ads certifications (Search, Shopping, Display, Video, and Performance Max) and Meta Blueprint certifications. We maintain these certifications actively — not just at onboarding. For Microsoft Ads clients, we also hold Microsoft Advertising credentials. Certification details are available on request for partners who want to include them in their agency credentials.' },
  { q:'How quickly can you launch a new PPC client?', a:'A standard Google Search or Meta Ads campaign for an existing partner can be live within 5–7 business days of receiving the client brief and account access. This includes keyword research, campaign structure, ad copy, conversion tracking verification, and a strategy sign-off. Larger accounts (Shopping, Performance Max, multi-platform) typically take 7–10 business days for a thorough build.' },
  { q:'Can you manage campaigns for specific industries or niches?', a:'Yes. We have active white-label PPC partnerships across eCommerce, SaaS, legal, healthcare, home services, real estate, and education. Industry experience matters for ad copy tone, landing page recommendations, and compliance with platform advertising policies — particularly for regulated industries like healthcare and financial services where ad content has restrictions.' },
  { q:'What happens if a campaign underperforms — how do you handle it?', a:'We flag performance issues proactively rather than waiting for a monthly report. If a campaign misses CPA or ROAS targets for two consecutive weeks, your account manager notifies you with an analysis and a proposed fix before the monthly report cycle. We present solutions — not just problems. All recommendations go through you before implementation, so you remain in control of client communications.' },
];

const RELATED = [
  { icon:'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', title:'White-Label SEO Services', href:'/white-label-seo-services', desc:'Pair paid search with organic SEO — both delivered under your brand. The most common combination in our agency partner programme.' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'PPC Management Services', href:'/ppc-management-services', desc:'Our direct PPC management offering — for clients who want to engage 1Solutions directly rather than through a reseller.' },
  { icon:'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', title:'Performance Marketing', href:'/performance-marketing-agency', desc:'Full-funnel paid performance marketing — PPC, paid social, programmatic, and CRO — delivered as a direct service or white-labelled for agency partners.' },
  { icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'Google Shopping Management', href:'/google-shopping-management', desc:'Dedicated Shopping campaign management — feed optimisation, Merchant Centre troubleshooting, and Shopping + PMax hybrid strategies.' },
  { icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1', title:'Meta Ads Management', href:'/meta-ads-management', desc:'Facebook and Instagram advertising — prospecting, retargeting, creative strategy, and ROAS optimisation for eCommerce and lead gen clients.' },
  { icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', title:'IT Staff Augmentation', href:'/it-staff-augmentation-services', desc:'Need to expand technical capacity rather than marketing? Add skilled developers or analysts to client projects under your agency umbrella.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'Home',         item:'https://www.1solutions.biz/'                                    },
        { '@type':'ListItem', position:2, name:'PPC Services', item:'https://www.1solutions.biz/ppc-management-services/'            },
        { '@type':'ListItem', position:3, name:'White-Label PPC Services', item:'https://www.1solutions.biz/white-label-ppc-services/' },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.1solutions.biz/white-label-ppc-services/',
      url: 'https://www.1solutions.biz/white-label-ppc-services/',
      name: 'White-Label PPC Services for Agencies | 1Solutions',
      description: 'White-label PPC management for digital agencies. Google Ads, Meta, Shopping, YouTube, LinkedIn — branded reports, dedicated account manager, strict non-poaching policy. 90+ agency partners.',
      inLanguage: 'en',
      speakable: { '@type':'SpeakableSpecification', cssSelector:['h1','h2'] },
    },
    {
      '@type': 'Service',
      name: 'White-Label PPC Services',
      serviceType: 'White-Label PPC Management',
      url: 'https://www.1solutions.biz/white-label-ppc-services/',
      description: 'White-label paid search management for agencies — Google Ads, Meta, Shopping, Performance Max, YouTube, LinkedIn. Branded reports, dedicated account manager, NDA-first, non-poaching.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type':'ImageObject', url:'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US','GB','AU','CA','IN'],
      },
      aggregateRating: { '@type':'AggregateRating', ratingValue:'4.9', reviewCount:'71', bestRating:'5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text:f.a } })),
    },
    {
      '@type': 'HowTo',
      name: 'How Our White-Label PPC Partnership Works',
      step: HOW_IT_WORKS.map((h, i) => ({ '@type':'HowToStep', position:i + 1, name:h.title, text:h.desc })),
    },
  ],
};

const RC_KEY = '6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';

export default function WhiteLabelPPCServices() {
  const [openFaq, setOpenFaq]     = useState(0);
  const [form, setForm]           = useState({ name:'', email:'', agency:'', spend:'', message:'' });
  const [formState, setFormState] = useState('idle');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const els = document.querySelectorAll('.wlp-reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('wlp-vis'); obs.unobserve(e.target); } });
    }, { threshold: 0.10 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setFormState('sending'); setFormError('');
    try {
      const recaptchaToken = await new Promise(resolve =>
        window.grecaptcha.ready(() => window.grecaptcha.execute(RC_KEY, { action:'wlp_contact' }).then(resolve))
      );
      const res = await fetch('/api/contact', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name:form.name, email:form.email, company:form.agency, service:'White-Label PPC Services', message:`Agency: ${form.agency}\nMonthly Ad Spend Under Management: ${form.spend}\n\n${form.message}`, consent:true, source:'White-Label PPC Page', recaptchaToken }),
      });
      if (!res.ok) { const d = await res.json().catch(()=>({})); throw new Error(d.message||'Submission failed.'); }
      setFormState('success');
    } catch(err) { setFormState('error'); setFormError(err.message); }
  }

  return (
    <>
      <Head>
        <title>White-Label PPC Services for Agencies | Resell Google & Meta Ads | 1Solutions</title>
        <meta name="description" content="White-label PPC management for agencies. Google Ads, Meta, Shopping, Performance Max, YouTube & LinkedIn — all under your brand. Branded reports, non-poaching NDA. 90+ agency partners." />
        <link rel="canonical" href="https://www.1solutions.biz/white-label-ppc-services/" />
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content="White-Label PPC Services for Agencies | 1Solutions" />
        <meta property="og:description" content="Resell Google Ads, Meta & Shopping under your brand. Branded reports, non-poaching NDA, dedicated account manager. 90+ agency partners." />
        <meta property="og:url"         content="https://www.1solutions.biz/white-label-ppc-services/" />
        <meta property="og:image"       content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <meta name="twitter:card"       content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          @keyframes wlp-aurora{0%{background-position:0% center}100%{background-position:200% center}}
          .wlp-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);background-attachment:scroll;color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .wlp-page *,.wlp-page *::before,.wlp-page *::after{box-sizing:border-box}
          .wlp-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .wlp-orb1{width:900px;height:900px;background:radial-gradient(circle,rgba(99,130,255,.35) 0%,rgba(139,92,246,.15) 40%,transparent 70%);top:-300px;right:-300px}
          .wlp-orb2{width:800px;height:800px;background:radial-gradient(circle,rgba(251,146,60,.30) 0%,rgba(245,158,11,.15) 40%,transparent 70%);bottom:0;left:-250px}
          .wlp-orb3{width:600px;height:600px;background:radial-gradient(circle,rgba(20,184,166,.20) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%)}
          .wlp-reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .wlp-reveal.wlp-vis{opacity:1;transform:translateY(0)}
          .wlp-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;padding:16px 40px 0;max-width:1280px;margin:0 auto;position:relative;z-index:2;font-weight:500}
          .wlp-bc a{color:#6b7280;text-decoration:none}.wlp-bc a:hover{color:#D97706}.wlp-bc-sep{color:#d1d5db}
          .wlp-hero{position:relative;z-index:1;padding:72px 40px 0}
          .wlp-hero-inner{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto}
          .wlp-eyebrow{font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;display:block;margin-bottom:18px}
          .wlp-h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:18px;color:#0F1F40}
          .wlp-hero-sub{font-size:16px;color:#3A507A;line-height:1.65;max-width:720px;margin:0 auto 28px}
          .wlp-btns{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:32px}
          .wlp-btn-p{position:relative;display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);border-radius:50px;color:#fff;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,0.25)}
          .wlp-btn-p:hover{background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,0.30)}
          .wlp-btn-s{display:inline-flex;align-items:center;padding:14px 32px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .wlp-btn-s:hover{background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);transform:translateY(-2px)}
          .wlp-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:1000px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95)}
          .wlp-stat{padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}.wlp-stat:last-child{border-right:none}
          .wlp-stat-v{font-size:22px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1;margin-bottom:6px}
          .wlp-stat-l{font-size:12px;color:#4A6080;font-weight:500}
          .wlp-sec{padding:80px 40px;position:relative;z-index:1}
          .wlp-white{background:#fff}
          .wlp-in{max-width:1280px;margin:0 auto}
          .wlp-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .wlp-h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:12px}
          .wlp-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}
          .wlp-glass{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s,border-color .22s}
          .wlp-glass:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(15,52,96,.12);border-color:rgba(217,119,6,.30)}
          .wlp-g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
          .wlp-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .wlp-g2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
          .wlp-nbadge{width:40px;height:40px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:16px;box-shadow:0 4px 12px rgba(15,52,96,0.25);flex-shrink:0}
          .wlp-card-h{font-size:16px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .wlp-card-p{font-size:13px;color:#4A6080;line-height:1.65}
          .wlp-step-num{font-family:'Courier New',ui-monospace,monospace;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#6b7280;margin-bottom:12px}
          /* Trust strip */
          .wlp-trust-sec{background:linear-gradient(135deg,#0F1F40 0%,#1a3a6b 100%);padding:48px 40px;position:relative;z-index:1}
          .wlp-trust-inner{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:28px;text-align:center}
          .wlp-trust-item{display:flex;flex-direction:column;align-items:center;gap:10px}
          .wlp-trust-icon{width:44px;height:44px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.20);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff}
          .wlp-trust-h{font-size:15px;font-weight:700;color:#fff}
          .wlp-trust-p{font-size:13px;color:rgba(255,255,255,.65);line-height:1.55}
          /* Platforms strip */
          .wlp-plat-sec{padding:44px 40px;background:rgba(255,255,255,0.55);border-top:1px solid rgba(255,255,255,.80);border-bottom:1px solid rgba(255,255,255,.80);position:relative;z-index:1;text-align:center}
          .wlp-plat-h{font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px}
          .wlp-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .wlp-pill{background:linear-gradient(135deg,rgba(219,234,254,.70) 0%,rgba(255,255,255,.90) 100%);border:1px solid rgba(15,52,96,.15);border-radius:100px;padding:8px 20px;font-size:13px;font-weight:600;color:#0F3460}
          /* Deliverables */
          .wlp-del-list{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:32px}
          .wlp-del-item{display:flex;align-items:flex-start;gap:12px;background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:14px 18px;box-shadow:0 2px 12px rgba(15,52,96,.06)}
          .wlp-del-check{width:22px;height:22px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
          .wlp-del-text{font-size:14px;color:#0F1F40;font-weight:500;line-height:1.4}
          /* Who for */
          .wlp-who-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:8px;max-width:900px;margin-left:auto;margin-right:auto}
          /* FAQ */
          .wlp-flist{display:flex;flex-direction:column;gap:10px;margin-top:40px}
          .wlp-fitem{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06),inset 0 1px 0 rgba(255,255,255,.95);transition:border-color .2s}
          .wlp-fitem.wlp-open{border-color:rgba(217,119,6,.35)}
          .wlp-fitem.wlp-open::before{content:'';display:block;height:3px;background:#D97706;border-radius:3px 3px 0 0}
          .wlp-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .wlp-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .wlp-fitem.wlp-open .wlp-fq-badge{background:#D97706;color:#fff}
          .wlp-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .wlp-fitem.wlp-open .wlp-fq-text{color:#B45309}
          .wlp-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .wlp-fitem.wlp-open .wlp-fchev{transform:rotate(180deg);color:#D97706}
          .wlp-fanswer-wrap{overflow:hidden;max-height:0;transition:max-height .35s ease}
          .wlp-fitem.wlp-open .wlp-fanswer-wrap{max-height:600px}
          .wlp-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          /* Related */
          .wlp-rel-card{display:block;text-decoration:none}.wlp-rel-card .wlp-glass{height:100%}
          .wlp-rel-card:hover .wlp-card-h{color:#D97706}
          /* Form */
          .wlp-form-sec{padding:80px 40px;position:relative;z-index:1}
          .wlp-form-card{background:rgba(255,255,255,0.70);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.90);border-radius:28px;padding:52px 48px;box-shadow:0 8px 48px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1);max-width:740px;margin:0 auto}
          .wlp-field{display:flex;flex-direction:column;gap:7px;margin-bottom:20px}
          .wlp-label{font-size:13px;font-weight:600;color:#374151}
          .wlp-input{padding:12px 16px;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,.15);border-radius:12px;font-size:14px;color:#0F1F40;font-family:inherit;transition:border-color .2s,box-shadow .2s;outline:none}
          .wlp-input:focus{border-color:#D97706;box-shadow:0 0 0 3px rgba(217,119,6,.12)}
          .wlp-textarea{padding:12px 16px;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,.15);border-radius:12px;font-size:14px;color:#0F1F40;font-family:inherit;resize:vertical;min-height:120px;transition:border-color .2s,box-shadow .2s;outline:none}
          .wlp-textarea:focus{border-color:#D97706;box-shadow:0 0 0 3px rgba(217,119,6,.12)}
          .wlp-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
          .wlp-submit{width:100%;margin-top:8px;padding:15px 32px;background:rgba(15,52,96,0.88);color:#fff;border:none;border-radius:50px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,.22);display:flex;align-items:center;justify-content:center;gap:8px}
          .wlp-submit:hover:not(:disabled){background:rgba(15,52,96,1);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,.28)}
          .wlp-submit:disabled{opacity:.65;cursor:not-allowed}
          .wlp-success{display:flex;flex-direction:column;align-items:center;gap:16px;padding:24px;text-align:center}
          .wlp-success-icon{width:60px;height:60px;background:rgba(34,197,94,.12);border-radius:50%;display:flex;align-items:center;justify-content:center}
          .wlp-cta-sec{padding:80px 40px;background:linear-gradient(135deg,rgba(254,243,199,.70) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1;text-align:center}
          .wlp-cta-h{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:14px}
          .wlp-cta-p{font-size:15px;color:#4A6080;line-height:1.7;max-width:580px;margin:0 auto 32px}
          @media(max-width:1024px){.wlp-g4{grid-template-columns:repeat(2,1fr)}.wlp-g3{grid-template-columns:repeat(2,1fr)}.wlp-trust-inner{grid-template-columns:1fr 1fr}.wlp-del-list{grid-template-columns:1fr}}
          @media(max-width:768px){
            .wlp-bc{padding:12px 20px 0}
            .wlp-hero{padding:56px 24px 0}
            .wlp-sec,.wlp-form-sec,.wlp-cta-sec,.wlp-trust-sec,.wlp-plat-sec{padding:52px 20px}
            .wlp-stats{grid-template-columns:repeat(2,1fr)}
            .wlp-stat:nth-child(2){border-right:none}
            .wlp-stat:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}
            .wlp-stat:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}
            .wlp-glass,.wlp-fitem,.wlp-form-card{backdrop-filter:none;-webkit-backdrop-filter:none}
            .wlp-g4,.wlp-g3,.wlp-g2,.wlp-who-grid,.wlp-del-list{grid-template-columns:1fr}
            .wlp-trust-inner{grid-template-columns:1fr}
            .wlp-fq{padding:18px 18px 18px 52px}
            .wlp-fanswer{padding:0 18px 18px 52px}
            .wlp-fq-badge{left:12px}
            .wlp-form-card{padding:32px 24px}
            .wlp-form-row{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <div className="wlp-page">
        <div className="wlp-orb wlp-orb1"/><div className="wlp-orb wlp-orb2"/><div className="wlp-orb wlp-orb3"/>

        {/* ── BREADCRUMB ── */}
        <nav className="wlp-bc" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="wlp-bc-sep">/</span>
          <Link href="/ppc-management-services/">PPC Services</Link><span className="wlp-bc-sep">/</span>
          <span style={{color:'#D97706'}}>White-Label PPC Services</span>
        </nav>

        {/* ── HERO ── */}
        <section className="wlp-hero">
          <div className="wlp-hero-inner">
            <span className="wlp-eyebrow">Google Ads · Meta · Shopping · YouTube · LinkedIn · Your Brand</span>
            <h1 className="wlp-h1">White-Label PPC Services<br/><AuroraText>Your Brand. Our Campaigns.</AuroraText></h1>
            <p className="wlp-hero-sub">Resell Google Ads, Meta, Shopping, and LinkedIn management under your agency brand. We run the campaigns, optimise the spend, and deliver branded reports — your clients see your logo, not ours.</p>
            <div className="wlp-btns">
              <a href="#partner-form" className="wlp-btn-p">
                Become a Partner
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#how-it-works" className="wlp-btn-s">See How It Works</a>
            </div>
            <div className="wlp-stats">
              {STATS.map(s => (
                <div key={s.label} className="wlp-stat">
                  <div className="wlp-stat-v">{s.val}</div>
                  <div className="wlp-stat-l">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <section className="wlp-trust-sec">
          <div className="wlp-trust-inner">
            <div className="wlp-trust-item">
              <div className="wlp-trust-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <div className="wlp-trust-h">NDA-First Policy</div>
              <p className="wlp-trust-p">Mutual NDA signed before any account or client data is shared. Confidentiality is contractual from day one.</p>
            </div>
            <div className="wlp-trust-item">
              <div className="wlp-trust-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
              </div>
              <div className="wlp-trust-h">Google & Meta Certified</div>
              <p className="wlp-trust-p">Certified specialists across Google Ads, Meta Blueprint, and Microsoft Advertising — active certifications, not just onboarding badges.</p>
            </div>
            <div className="wlp-trust-item">
              <div className="wlp-trust-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
              </div>
              <div className="wlp-trust-h">Zero Client Poaching</div>
              <p className="wlp-trust-p">We never contact your clients. Your billing relationship, your client relationship — we're invisible by design.</p>
            </div>
          </div>
        </section>

        {/* ── PLATFORMS ── */}
        <section className="wlp-plat-sec">
          <p className="wlp-plat-h">Platforms We Manage Under Your Brand</p>
          <div className="wlp-pills">{PLATFORMS.map(p => <span key={p} className="wlp-pill">{p}</span>)}</div>
        </section>

        {/* ── SERVICES ── */}
        <section className="wlp-sec" id="services">
          <div className="wlp-in">
            <div className="wlp-reveal">
              <span className="wlp-ey">What We Deliver</span>
              <h2 className="wlp-h2">White-Label PPC Services <AuroraText>Across Every Platform</AuroraText></h2>
              <p className="wlp-lead">Every major paid media channel — managed by certified specialists and delivered under your agency brand.</p>
            </div>
            <div className="wlp-g4">
              {SERVICES.map((s, i) => (
                <div key={s.n} className="wlp-glass wlp-reveal" style={{transitionDelay:`${i*55}ms`}}>
                  <div className="wlp-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                  </div>
                  <div className="wlp-step-num">{s.n}</div>
                  <div className="wlp-card-h">{s.title}</div>
                  <p className="wlp-card-p">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="wlp-sec wlp-white" id="how-it-works">
          <div className="wlp-in" style={{maxWidth:960}}>
            <div className="wlp-reveal">
              <span className="wlp-ey">The Partnership Model</span>
              <h2 className="wlp-h2">How Our <AuroraText>White-Label PPC Partnership Works</AuroraText></h2>
              <p className="wlp-lead">From NDA to live campaigns in under a week — here&rsquo;s the four-step model that keeps your agency name front and centre.</p>
            </div>
            <div className="wlp-g2" style={{maxWidth:880,margin:'0 auto'}}>
              {HOW_IT_WORKS.map((h, i) => (
                <div key={h.n} className="wlp-glass wlp-reveal" style={{transitionDelay:`${i*80}ms`,display:'flex',gap:20,alignItems:'flex-start'}}>
                  <div className="wlp-nbadge" style={{marginBottom:0,flexShrink:0}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={h.icon}/></svg>
                  </div>
                  <div>
                    <div className="wlp-step-num">{h.n}</div>
                    <div className="wlp-card-h">{h.title}</div>
                    <p className="wlp-card-p">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY 1SOLUTIONS ── */}
        <section className="wlp-sec" id="why-us">
          <div className="wlp-in">
            <div className="wlp-reveal">
              <span className="wlp-ey">Why 1Solutions</span>
              <h2 className="wlp-h2">What Makes Us the <AuroraText>Right White-Label PPC Partner</AuroraText></h2>
              <p className="wlp-lead">90+ agency partners trust us to manage $2M+ in monthly ad spend under their brand. Here is what that trust is built on.</p>
            </div>
            <div className="wlp-g3">
              {WHY.map((w, i) => (
                <div key={w.title} className="wlp-glass wlp-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="wlp-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  </div>
                  <div className="wlp-card-h">{w.title}</div>
                  <p className="wlp-card-p">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO IT'S FOR ── */}
        <section className="wlp-sec wlp-white" id="who-for">
          <div className="wlp-in">
            <div className="wlp-reveal" style={{textAlign:'center',maxWidth:720,margin:'0 auto 40px'}}>
              <span className="wlp-ey">Who It&rsquo;s For</span>
              <h2 className="wlp-h2">Built for <AuroraText>Agencies, Studios & Consultants</AuroraText></h2>
              <p className="wlp-lead" style={{margin:'0 auto'}}>If your clients need paid media and you&rsquo;d rather not build a PPC team in-house, this programme is for you.</p>
            </div>
            <div className="wlp-who-grid">
              {WHO_FOR.map((w, i) => (
                <div key={w.title} className="wlp-glass wlp-reveal" style={{transitionDelay:`${i*70}ms`,display:'flex',gap:18,alignItems:'flex-start'}}>
                  <div className="wlp-nbadge" style={{marginBottom:0,flexShrink:0}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  </div>
                  <div>
                    <div className="wlp-card-h">{w.title}</div>
                    <p className="wlp-card-p">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DELIVERABLES ── */}
        <section className="wlp-sec" id="deliverables">
          <div className="wlp-in" style={{maxWidth:960}}>
            <div className="wlp-reveal">
              <span className="wlp-ey">What You Receive Monthly</span>
              <h2 className="wlp-h2">Branded, Client-Ready <AuroraText>Deliverables Every Month</AuroraText></h2>
              <p className="wlp-lead">Everything your clients expect from a professional paid media agency — delivered under your name, ready to forward.</p>
            </div>
            <div className="wlp-del-list wlp-reveal">
              {DELIVERABLES.map((d, i) => (
                <div key={i} className="wlp-del-item">
                  <div className="wlp-del-check">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <span className="wlp-del-text">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="wlp-sec wlp-white" id="faq">
          <div className="wlp-in" style={{maxWidth:900}}>
            <div className="wlp-reveal">
              <span className="wlp-ey">Common Questions</span>
              <h2 className="wlp-h2">White-Label PPC <AuroraText>Partnership FAQs</AuroraText></h2>
              <p className="wlp-lead">What agencies ask before signing the NDA.</p>
            </div>
            <div className="wlp-flist">
              {FAQS.map((f, i) => (
                <div key={i} className={`wlp-fitem${openFaq === i ? ' wlp-open' : ''}`}>
                  <button className="wlp-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="wlp-fq-badge">{String(i + 1).padStart(2, '0')}</span>
                    <span className="wlp-fq-text">{f.q}</span>
                    <svg className="wlp-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <div className="wlp-fanswer-wrap">
                    <div className="wlp-fanswer">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="wlp-sec" id="related">
          <div className="wlp-in">
            <div className="wlp-reveal">
              <span className="wlp-ey">Related Services</span>
              <h2 className="wlp-h2">Complete Your <AuroraText>Agency Service Stack</AuroraText></h2>
              <p className="wlp-lead">Pair white-label PPC with these services to offer a complete performance marketing programme under your brand.</p>
            </div>
            <div className="wlp-g3">
              {RELATED.map((r, i) => (
                <Link key={r.href} href={r.href} className="wlp-rel-card wlp-reveal" style={{transitionDelay:`${i*70}ms`}}>
                  <div className="wlp-glass">
                    <div className="wlp-nbadge">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={r.icon}/></svg>
                    </div>
                    <div className="wlp-card-h">{r.title}</div>
                    <p className="wlp-card-p">{r.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARTNER FORM ── */}
        <section className="wlp-form-sec" id="partner-form">
          <div className="wlp-in">
            <div className="wlp-reveal" style={{textAlign:'center',maxWidth:640,margin:'0 auto 40px'}}>
              <span className="wlp-ey">Start the Conversation</span>
              <h2 className="wlp-h2">Apply to Become a <AuroraText>White-Label PPC Partner</AuroraText></h2>
              <p className="wlp-lead" style={{marginBottom:0}}>Tell us about your agency, the platforms you need covered, and the monthly ad spend you&rsquo;d like us to manage. We&rsquo;ll reply within one business day with an NDA and a scoping call invite.</p>
            </div>
            <div className="wlp-form-card wlp-reveal">
              {formState === 'success' ? (
                <div className="wlp-success">
                  <div className="wlp-success-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 style={{fontSize:20,fontWeight:800,color:'#0F1F40',margin:0}}>Application received — thank you!</h3>
                  <p style={{fontSize:14,color:'#4A6080',margin:0,maxWidth:420}}>We&rsquo;ll review your details and reach out with an NDA and a scoping call invite within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="wlp-form-row">
                    <div className="wlp-field">
                      <label className="wlp-label" htmlFor="wlp-name">Your Name *</label>
                      <input id="wlp-name" className="wlp-input" type="text" required placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} />
                    </div>
                    <div className="wlp-field">
                      <label className="wlp-label" htmlFor="wlp-email">Work Email *</label>
                      <input id="wlp-email" className="wlp-input" type="email" required placeholder="jane@youragency.com" value={form.email} onChange={e => setForm(f => ({...f, email:e.target.value}))} />
                    </div>
                  </div>
                  <div className="wlp-form-row">
                    <div className="wlp-field">
                      <label className="wlp-label" htmlFor="wlp-agency">Agency Name / Website</label>
                      <input id="wlp-agency" className="wlp-input" type="text" placeholder="Acme Agency or https://youragency.com" value={form.agency} onChange={e => setForm(f => ({...f, agency:e.target.value}))} />
                    </div>
                    <div className="wlp-field">
                      <label className="wlp-label" htmlFor="wlp-spend">Est. Monthly Ad Spend</label>
                      <input id="wlp-spend" className="wlp-input" type="text" placeholder="e.g. $5,000/mo or $10k–$50k" value={form.spend} onChange={e => setForm(f => ({...f, spend:e.target.value}))} />
                    </div>
                  </div>
                  <div className="wlp-field">
                    <label className="wlp-label" htmlFor="wlp-message">What do you need from a white-label PPC partner? *</label>
                    <textarea id="wlp-message" className="wlp-textarea" required placeholder="Tell us about your agency, the platforms you need managed (Google, Meta, etc.), the types of clients you work with, and what you're looking for in a white-label partner..." value={form.message} onChange={e => setForm(f => ({...f, message:e.target.value}))} />
                  </div>
                  {formState === 'error' && <p style={{fontSize:13,color:'#dc2626',marginBottom:12}}>{formError||'Something went wrong. Please try again.'}</p>}
                  <button type="submit" className="wlp-submit" disabled={formState === 'sending'}>
                    {formState === 'sending' ? 'Sending…' : (
                      <>Send Partner Application <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                    )}
                  </button>
                  <p style={{fontSize:12,color:'#9ca3af',textAlign:'center',marginTop:14}}>We reply within one business day. Mutual NDA sent before any account data is shared.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── CTA BOTTOM ── */}
        <section className="wlp-cta-sec">
          <div className="wlp-in">
            <div className="wlp-reveal">
              <span className="wlp-ey" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Scale?</span>
              <h2 className="wlp-cta-h">Offer Paid Media to Every Client <AuroraText>Without Building a PPC Team</AuroraText></h2>
              <p className="wlp-cta-p">90+ agencies trust us to manage their clients&rsquo; ad budgets under their brand. Start with one account, scale to your entire portfolio — delivery quality stays constant throughout.</p>
              <div className="wlp-btns">
                <a href="#partner-form" className="wlp-btn-p">
                  Apply to Partner
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <Link href="/white-label-seo-services/" className="wlp-btn-s">White-Label SEO &rarr;</Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
