'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ServiceHero from '../../components/sections/ServiceHero';

function AuroraText({ children }) {
  return (
    <span style={{background:'linear-gradient(135deg,#f43f5e,#ec4899,#a855f7,#8b5cf6,#3b82f6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',backgroundSize:'200% auto',animation:'wls-aurora 4s linear infinite'}}>{children}</span>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────── */
const SERVICES = [
  { n:'01', icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'On-Page SEO', desc:'Title tags, meta descriptions, header hierarchy, schema markup, internal linking, and content optimisation — all executed in your client\'s brand name, reported under yours.' },
  { n:'02', icon:'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', title:'Technical SEO', desc:'Core Web Vitals, crawlability, site architecture, canonicalisation, structured data, log file analysis, and index coverage — the foundations that make everything else work.' },
  { n:'03', icon:'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title:'Link Building', desc:'Editorial outreach, niche edits, digital PR, and guest posting on relevant, vetted domains. Anchor text is planned at campaign level — no spam, no footprint, no short-cuts.' },
  { n:'04', icon:'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title:'SEO Content Creation', desc:'Keyword-researched blog posts, landing pages, topic clusters, and FAQ content — written to rank and to convert. All content is delivered under your brand\'s byline.' },
  { n:'05', icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title:'Local SEO', desc:'Google Business Profile optimisation, citation building, review strategy, and local pack ranking — delivered white-label for your agency\'s local clients across any city.' },
  { n:'06', icon:'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', title:'eCommerce SEO', desc:'Category optimisation, product schema, faceted navigation fixes, internal linking at scale, and marketplace SEO — for Shopify, WooCommerce, Magento, and custom stores.' },
  { n:'07', icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Branded Reporting', desc:'Monthly reports in your agency\'s colours, logo, and domain — with clear ranking movement, traffic data, link acquisition, and next-month actions. Your clients see your brand, not ours.' },
  { n:'08', icon:'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title:'SEO Audits', desc:'Comprehensive technical, on-page, and off-page audits delivered in your brand\'s PDF template — ready to present to your client as part of your agency\'s discovery process.' },
];

const HOW_IT_WORKS = [
  { n:'01', icon:'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', title:'Partner Onboarding', desc:'Sign a mutual NDA, set up your branded reporting portal, and share your service scope. Takes one business day. No retainer required to get started.' },
  { n:'02', icon:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title:'Brief Us on Your Client', desc:'Share the client\'s website, target keywords, competitors, and goals. Our strategist builds a 90-day roadmap aligned to your scope and the client\'s business objectives.' },
  { n:'03', icon:'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title:'We Execute, You Communicate', desc:'Our team works silently in the background — technical fixes, content, outreach, reporting. You remain the single point of contact for your client. We never reach out to them directly.' },
  { n:'04', icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'Branded Reports Delivered', desc:'White-labelled monthly reports — your logo, your colours, your domain — delivered 3–5 business days before month-end so you always have time to review before sending to clients.' },
];

const WHY = [
  { icon:'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title:'Strict Non-Poaching Policy', desc:'We will never contact your clients directly, solicit them for our own services, or acknowledge that we exist. Your client relationship is entirely yours — contractually guaranteed.' },
  { icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title:'Dedicated Account Manager', desc:'One point of contact who knows your clients, your communication preferences, and your service scope. No ticket queues or rotating support staff — direct Slack or email access.' },
  { icon:'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', title:'Fully Branded Deliverables', desc:'Reports, audit PDFs, content briefs, and strategy documents all carry your agency name and logo. We can match your brand colours, fonts, and template style exactly.' },
  { icon:'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', title:'Proven Results at Scale', desc:'15+ years of SEO across 120+ agency partner accounts. We understand how to rank competitive keywords in the UK, US, Australia, and India — not just report on activity.' },
  { icon:'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title:'Scalable From 1 to 50+ Clients', desc:'Start with a single client on a trial basis. Scale to 50+ accounts without hiring — we expand with you, maintaining delivery quality regardless of portfolio size.' },
  { icon:'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', title:'NDA-First by Default', desc:'Every partner engagement starts with a mutual NDA before any client data is shared. We treat confidentiality as a prerequisite, not a favour.' },
];

const WHO_FOR = [
  { icon:'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title:'Digital Marketing Agencies', desc:'Offer SEO as a core service without building a full in-house SEO team. Retain 100% of the margin difference between your sell price and our wholesale rate.' },
  { icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1', title:'Web Design & Dev Studios', desc:'Your clients need SEO after their site launches. White-label services let you capture that ongoing retainer revenue without pivoting your team away from design and development.' },
  { icon:'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', title:'Freelance SEO Consultants', desc:'Win bigger accounts than you can handle alone. We operate as your invisible delivery team while you maintain the client relationship and the consulting fee.' },
  { icon:'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z', title:'PR & Comms Agencies', desc:'Add organic search to your digital PR offering. We build the links and create the SEO content; you present it within a broader earned media strategy for your clients.' },
];

const DELIVERABLES = [
  'Monthly white-labelled PDF report (your branding)',
  'Google Search Console & Analytics access notes',
  'Keyword ranking tracker (branded export)',
  'Technical audit findings & fix log',
  'Link acquisition report with domain metrics',
  'Content calendar and published content log',
  'Next-month strategy summary',
  'Slack / email access to your account manager',
];

const FAQS = [
  { q:'Will 1Solutions ever contact my clients directly?', a:'Never. Our non-poaching policy is contractually enforced in the partner agreement. We do not contact your clients by email, phone, LinkedIn, or any other channel. Your client relationship is 100% yours. In the rare event a client asks who did the work, we advise partners to simply say "our in-house SEO team." We never contradict this.' },
  { q:'How does billing work for white-label SEO?', a:'You pay us a wholesale rate per client per month. You charge your client whatever rate you choose — the margin is entirely yours. We invoice you, not your client. Invoices are sent under our company name but with no reference to "1Solutions" in any client-facing documents unless you choose to disclose the relationship.' },
  { q:'Can I see sample white-label reports before signing up?', a:'Yes. We can share sanitised sample reports — monthly SEO reports, audit PDFs, and content briefs — all in our default white-label template. If you want them matched to your agency brand before onboarding, we can do that during the onboarding call.' },
  { q:'What is the minimum commitment to get started?', a:'There is no minimum contract length. We work month-to-month, though most agency partners settle into quarterly or annual arrangements because of the planning stability. There is also no minimum number of clients — you can start with a single client account and scale from there.' },
  { q:'How do you handle communication with my team vs. my clients?', a:'All delivery communication goes through you. We brief you; you brief your client. We never attend client calls unless you explicitly invite us as "a member of your team." Reports are sent to you — you forward them (or we send them from a white-labelled email alias if you set one up). Clients only ever see your agency name.' },
  { q:'What SEO tools do you use and will my clients need to pay for them?', a:'We use Semrush, Ahrefs, Screaming Frog, Google Search Console, and Google Analytics 4 as our core stack. You do not need to provide tool access — we absorb tool costs into our wholesale rate. If you have existing agency tool seats you want us to use instead, we can accommodate that.' },
  { q:'How quickly can you onboard a new client?', a:'A standard SEO retainer client can be onboarded within 3–5 business days of receiving the brief. This includes keyword research validation, a baseline technical audit, and a 90-day roadmap. Urgent onboarding (within 48 hours) is available for existing partner accounts with a clear brief already prepared.' },
  { q:'Do you offer white-label SEO for a specific niche or industry?', a:'Yes. We have active white-label programmes for agencies specialising in legal, healthcare, eCommerce, SaaS, real estate, and home services. Niche experience means your clients\' content and link strategy reflects category-specific best practices — not generic SEO templating.' },
];

const RELATED = [
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'White-Label PPC Services', href:'/white-label-ppc-services/', desc:'Resell paid search management under your brand. Google Ads, Meta Ads, and Shopping campaigns — all delivered with your logo on the reports.' },
  { icon:'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', title:'SEO Services', href:'/seo-services-company/', desc:'Our full-service SEO offering — for clients who want to engage 1Solutions directly rather than through a reseller partner.' },
  { icon:'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title:'Link Building Services', href:'/link-building-services/', desc:'Editorial outreach, niche edits, and digital PR — available as a standalone white-label link building programme for agency partners.' },
  { icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'Content Marketing Services', href:'/content-marketing-services/', desc:'White-labelled blog content, landing page copy, and topic clusters — written to rank and delivered under your agency\'s brand.' },
  { icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title:'Local SEO Services', href:'/local-seo-services/', desc:'Google Business Profile, citation building, and local pack ranking — available white-label for agency clients targeting specific geographies.' },
  { icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', title:'IT Staff Augmentation', href:'/it-staff-augmentation-services/', desc:'Need developers instead of SEO? Our staff augmentation service lets you add skilled tech talent to client projects under your agency umbrella.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'Home',         item:'https://www.1solutions.biz/'                                    },
        { '@type':'ListItem', position:2, name:'SEO Services', item:'https://www.1solutions.biz/seo-services-company/'               },
        { '@type':'ListItem', position:3, name:'White-Label SEO Services', item:'https://www.1solutions.biz/white-label-seo-services/' },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.1solutions.biz/white-label-seo-services/',
      url: 'https://www.1solutions.biz/white-label-seo-services/',
      name: 'White-Label SEO Services for Agencies | 1Solutions',
      description: 'White-label SEO services for digital agencies, web studios, and consultants. Branded reports, dedicated account manager, strict non-poaching policy. 120+ agency partners.',
      inLanguage: 'en',
      speakable: { '@type':'SpeakableSpecification', cssSelector:['h1','h2'] },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.1solutions.biz/#organization',
      name: '1Solutions',
      url: 'https://www.1solutions.biz',
      logo: { '@type':'ImageObject', url:'https://www.1solutions.biz/images/1solutions-logo.png' },
      foundingDate: '2010',
      aggregateRating: { '@type':'AggregateRating', ratingValue:'4.9', reviewCount:'84', bestRating:'5' },
    },
    {
      '@type': 'ProfessionalService',
      name: 'White-Label SEO Services',
      serviceType: 'White-Label SEO',
      url: 'https://www.1solutions.biz/white-label-seo-services/',
      description: 'Full-service white-label SEO for agencies — on-page, technical, link building, content, local, and eCommerce SEO. Branded reports, dedicated account manager, NDA-first.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type':'ImageObject', url:'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2010',
        areaServed: ['US','GB','AU','CA','IN'],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text:f.a } })),
    },
    {
      '@type': 'HowTo',
      name: 'How Our White-Label SEO Partnership Works',
      step: HOW_IT_WORKS.map((h, i) => ({ '@type':'HowToStep', position:i + 1, name:h.title, text:h.desc })),
    },
  ],
};

const RC_KEY = '6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';

export default function WhiteLabelSEOServices() {
  const [openFaq, setOpenFaq]     = useState(0);
  const [form, setForm]           = useState({ name:'', email:'', agency:'', clients:'', message:'' });
  const [formState, setFormState] = useState('idle');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const els = document.querySelectorAll('.wls-reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('wls-vis'); obs.unobserve(e.target); } });
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
        window.grecaptcha.ready(() => window.grecaptcha.execute(RC_KEY, { action:'wls_contact' }).then(resolve))
      );
      const res = await fetch('/api/contact', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name:form.name, email:form.email, company:form.agency, service:'White-Label SEO Services', message:`Agency: ${form.agency}\nEstimated Clients: ${form.clients}\n\n${form.message}`, consent:true, source:'White-Label SEO Page', recaptchaToken }),
      });
      if (!res.ok) { const d = await res.json().catch(()=>({})); throw new Error(d.message||'Submission failed.'); }
      setFormState('success');
    } catch(err) { setFormState('error'); setFormError(err.message); }
  }

  return (
    <>
      <Head>
        <title>White-Label SEO Services for Agencies | Resell SEO Under Your Brand | 1Solutions</title>
        <meta name="description" content="White-label SEO services for digital agencies, web studios & consultants. Branded reports, dedicated account manager, strict non-poaching NDA. Scale your SEO offering without hiring. 120+ agency partners." />
        <link rel="canonical" href="https://www.1solutions.biz/white-label-seo-services/" />
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content="White-Label SEO Services for Agencies | 1Solutions" />
        <meta property="og:description" content="Resell SEO under your brand. Branded reports, dedicated account manager, strict non-poaching policy. 120+ agency partners." />
        <meta property="og:url"         content="https://www.1solutions.biz/white-label-seo-services/" />
        <meta key="og-image" property="og:image"       content="https://www.1solutions.biz/images/og-white-label-seo-services.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type"  content="image/jpeg" />
        <meta property="og:image:alt"   content="1Solutions White-Label SEO Services — resell SEO under your brand" />
        <meta name="twitter:card"       content="summary_large_image" />
        <meta name="twitter:image"      content="https://www.1solutions.biz/images/og-white-label-seo-services.jpg" />
        <meta name="twitter:image:alt"  content="1Solutions White-Label SEO Services — resell SEO under your brand" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          @keyframes wls-aurora{0%{background-position:0% center}100%{background-position:200% center}}
          .wls-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);background-attachment:scroll;color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .wls-page *,.wls-page *::before,.wls-page *::after{box-sizing:border-box}
          .wls-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .wls-orb1{width:900px;height:900px;background:radial-gradient(circle,rgba(99,130,255,.35) 0%,rgba(139,92,246,.15) 40%,transparent 70%);top:-300px;right:-300px}
          .wls-orb2{width:800px;height:800px;background:radial-gradient(circle,rgba(251,146,60,.30) 0%,rgba(245,158,11,.15) 40%,transparent 70%);bottom:0;left:-250px}
          .wls-orb3{width:600px;height:600px;background:radial-gradient(circle,rgba(20,184,166,.20) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%)}
          .wls-reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .wls-reveal.wls-vis{opacity:1;transform:translateY(0)}.wls-bc a:hover{color:#D97706}.wls-bc-sep{color:#d1d5db}
          .wls-btns{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:32px}
          .wls-btn-p{position:relative;display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);border-radius:50px;color:#fff;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,0.25)}
          .wls-btn-p:hover{background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,0.30)}
          .wls-btn-s{display:inline-flex;align-items:center;padding:14px 32px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .wls-btn-s:hover{background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);transform:translateY(-2px)}
          .wls-sec{padding:80px 40px;position:relative;z-index:1}
          .wls-white{background:#fff}
          .wls-in{max-width:1280px;margin:0 auto}
          .wls-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .wls-h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:12px}
          .wls-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}
          .wls-glass{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s,border-color .22s}
          .wls-glass:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(15,52,96,.12);border-color:rgba(217,119,6,.30)}
          .wls-g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
          .wls-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .wls-g2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
          .wls-nbadge{width:40px;height:40px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:16px;box-shadow:0 4px 12px rgba(15,52,96,0.25);flex-shrink:0}
          .wls-card-h{font-size:16px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .wls-card-p{font-size:13px;color:#4A6080;line-height:1.65}
          .wls-step-num{font-family:'Courier New',ui-monospace,monospace;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#6b7280;margin-bottom:12px}
          /* Trust strip */
          .wls-trust-sec{background:linear-gradient(135deg,#0F1F40 0%,#1a3a6b 100%);padding:48px 40px;position:relative;z-index:1}
          .wls-trust-inner{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:28px;text-align:center}
          .wls-trust-item{display:flex;flex-direction:column;align-items:center;gap:10px}
          .wls-trust-icon{width:44px;height:44px;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.20);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff}
          .wls-trust-h{font-size:15px;font-weight:700;color:#fff}
          .wls-trust-p{font-size:13px;color:rgba(255,255,255,.65);line-height:1.55}
          /* Deliverables */
          .wls-del-list{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:32px}
          .wls-del-item{display:flex;align-items:flex-start;gap:12px;background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:14px 18px;box-shadow:0 2px 12px rgba(15,52,96,.06)}
          .wls-del-check{width:22px;height:22px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
          .wls-del-text{font-size:14px;color:#0F1F40;font-weight:500;line-height:1.4}
          /* Who it's for */
          .wls-who-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-top:8px;max-width:900px;margin-left:auto;margin-right:auto}
          /* FAQ */
          .wls-flist{display:flex;flex-direction:column;gap:10px;margin-top:40px}
          .wls-fitem{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06),inset 0 1px 0 rgba(255,255,255,.95);transition:border-color .2s}
          .wls-fitem.wls-open{border-color:rgba(217,119,6,.35)}
          .wls-fitem.wls-open::before{content:'';display:block;height:3px;background:#D97706;border-radius:3px 3px 0 0}
          .wls-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .wls-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .wls-fitem.wls-open .wls-fq-badge{background:#D97706;color:#fff}
          .wls-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .wls-fitem.wls-open .wls-fq-text{color:#B45309}
          .wls-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .wls-fitem.wls-open .wls-fchev{transform:rotate(180deg);color:#D97706}
          .wls-fanswer-wrap{overflow:hidden;max-height:0;transition:max-height .35s ease}
          .wls-fitem.wls-open .wls-fanswer-wrap{max-height:600px}
          .wls-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          /* Related */
          .wls-rel-card{display:block;text-decoration:none}.wls-rel-card .wls-glass{height:100%}
          .wls-rel-card:hover .wls-card-h{color:#D97706}
          /* Form */
          .wls-form-sec{padding:80px 40px;position:relative;z-index:1}
          .wls-form-card{background:rgba(255,255,255,0.70);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.90);border-radius:28px;padding:52px 48px;box-shadow:0 8px 48px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1);max-width:740px;margin:0 auto}
          .wls-field{display:flex;flex-direction:column;gap:7px;margin-bottom:20px}
          .wls-label{font-size:13px;font-weight:600;color:#374151}
          .wls-input{padding:12px 16px;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,.15);border-radius:12px;font-size:14px;color:#0F1F40;font-family:inherit;transition:border-color .2s,box-shadow .2s;outline:none}
          .wls-input:focus{border-color:#D97706;box-shadow:0 0 0 3px rgba(217,119,6,.12)}
          .wls-textarea{padding:12px 16px;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,.15);border-radius:12px;font-size:14px;color:#0F1F40;font-family:inherit;resize:vertical;min-height:120px;transition:border-color .2s,box-shadow .2s;outline:none}
          .wls-textarea:focus{border-color:#D97706;box-shadow:0 0 0 3px rgba(217,119,6,.12)}
          .wls-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
          .wls-submit{width:100%;margin-top:8px;padding:15px 32px;background:rgba(15,52,96,0.88);color:#fff;border:none;border-radius:50px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,.22);display:flex;align-items:center;justify-content:center;gap:8px}
          .wls-submit:hover:not(:disabled){background:rgba(15,52,96,1);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,.28)}
          .wls-submit:disabled{opacity:.65;cursor:not-allowed}
          .wls-success{display:flex;flex-direction:column;align-items:center;gap:16px;padding:24px;text-align:center}
          .wls-success-icon{width:60px;height:60px;background:rgba(34,197,94,.12);border-radius:50%;display:flex;align-items:center;justify-content:center}
          .wls-cta-sec{padding:80px 40px;background:linear-gradient(135deg,rgba(254,243,199,.70) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1;text-align:center}
          .wls-cta-h{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:14px}
          .wls-cta-p{font-size:15px;color:#4A6080;line-height:1.7;max-width:580px;margin:0 auto 32px}
          @media(max-width:1024px){.wls-g4{grid-template-columns:repeat(2,1fr)}.wls-g3{grid-template-columns:repeat(2,1fr)}.wls-trust-inner{grid-template-columns:1fr 1fr}.wls-del-list{grid-template-columns:1fr}}
          @media(max-width:768px){
            .wls-sec,.wls-form-sec,.wls-cta-sec,.wls-trust-sec{padding:52px 20px}
            .wls-glass,.wls-fitem,.wls-form-card{backdrop-filter:none;-webkit-backdrop-filter:none}
            .wls-g4,.wls-g3,.wls-g2,.wls-who-grid,.wls-del-list{grid-template-columns:1fr}
            .wls-trust-inner{grid-template-columns:1fr}
            .wls-fq{padding:18px 18px 18px 52px}
            .wls-fanswer{padding:0 18px 18px 52px}
            .wls-fq-badge{left:12px}
            .wls-form-card{padding:32px 24px}
            .wls-form-row{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <div className="wls-page">
        <div className="wls-orb wls-orb1"/><div className="wls-orb wls-orb2"/><div className="wls-orb wls-orb3"/>

        {/* ── HERO ── */}
        <ServiceHero
          eyebrow="For Agencies · Web Studios · Consultants · Resellers"
          title={<>White-Label SEO Services — <AuroraText>Your Brand. Our Execution.</AuroraText></>}
          subtext="Offer full-service SEO to your clients without building an in-house team. We deliver — technical SEO, content, link building, and reporting — all under your agency brand. Your clients see your logo. They never see ours."
          primaryCta={{ label: 'Become a Partner', href: '#partner-form' }}
          secondaryCta={{ label: 'See How It Works', href: '#how-it-works' }}
          stats={[
            { label: 'Agency Partners', value: '120', suffix: '+' },
            { label: 'White-Label Reports', value: '5,000', suffix: '+' },
            { label: 'Countries Served', value: '18', suffix: '+' },
            { label: 'Years SEO Experience', value: '15', suffix: '+' },
          ]}
        />

        {/* ── TRUST STRIP ── */}
        <section className="wls-trust-sec">
          <div className="wls-trust-inner">
            <div className="wls-trust-item">
              <div className="wls-trust-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <div className="wls-trust-h">NDA-First Policy</div>
              <p className="wls-trust-p">Mutual NDA signed before any client data is shared. Confidentiality is contractual, not optional.</p>
            </div>
            <div className="wls-trust-item">
              <div className="wls-trust-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
              </div>
              <div className="wls-trust-h">Strict Non-Poaching</div>
              <p className="wls-trust-p">We never contact your clients directly. No outreach, no pitching, no acknowledgement that we exist.</p>
            </div>
            <div className="wls-trust-item">
              <div className="wls-trust-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
              </div>
              <div className="wls-trust-h">Fully Branded Reports</div>
              <p className="wls-trust-p">Every deliverable — reports, audits, content — carries your agency name, logo, and colour palette.</p>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="wls-sec" id="services">
          <div className="wls-in">
            <div className="wls-reveal">
              <span className="wls-ey">What We Deliver</span>
              <h2 className="wls-h2">White-Label SEO Services <AuroraText>Across Every Channel</AuroraText></h2>
              <p className="wls-lead">From technical foundations to content and links — a complete SEO programme delivered under your brand name.</p>
            </div>
            <div className="wls-g4">
              {SERVICES.map((s, i) => (
                <div key={s.n} className="wls-glass wls-reveal" style={{transitionDelay:`${i*55}ms`}}>
                  <div className="wls-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                  </div>
                  <div className="wls-step-num">{s.n}</div>
                  <div className="wls-card-h">{s.title}</div>
                  <p className="wls-card-p">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="wls-sec wls-white" id="how-it-works">
          <div className="wls-in" style={{maxWidth:960}}>
            <div className="wls-reveal">
              <span className="wls-ey">The Partnership Model</span>
              <h2 className="wls-h2">How Our <AuroraText>White-Label SEO Partnership Works</AuroraText></h2>
              <p className="wls-lead">Four steps from signed NDA to branded monthly reports in your clients&rsquo; inboxes.</p>
            </div>
            <div className="wls-g2" style={{maxWidth:880,margin:'0 auto'}}>
              {HOW_IT_WORKS.map((h, i) => (
                <div key={h.n} className="wls-glass wls-reveal" style={{transitionDelay:`${i*80}ms`,display:'flex',gap:20,alignItems:'flex-start'}}>
                  <div className="wls-nbadge" style={{marginBottom:0,flexShrink:0}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={h.icon}/></svg>
                  </div>
                  <div>
                    <div className="wls-step-num">{h.n}</div>
                    <div className="wls-card-h">{h.title}</div>
                    <p className="wls-card-p">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY 1SOLUTIONS ── */}
        <section className="wls-sec" id="why-us">
          <div className="wls-in">
            <div className="wls-reveal">
              <span className="wls-ey">Why 1Solutions</span>
              <h2 className="wls-h2">What Makes Us the <AuroraText>Right White-Label Partner</AuroraText></h2>
              <p className="wls-lead">120+ agency partners choose us for our confidentiality-first model, delivery quality, and a 15-year track record of results.</p>
            </div>
            <div className="wls-g3">
              {WHY.map((w, i) => (
                <div key={w.title} className="wls-glass wls-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="wls-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  </div>
                  <div className="wls-card-h">{w.title}</div>
                  <p className="wls-card-p">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO IT'S FOR ── */}
        <section className="wls-sec wls-white" id="who-for">
          <div className="wls-in">
            <div className="wls-reveal" style={{textAlign:'center',maxWidth:720,margin:'0 auto 40px'}}>
              <span className="wls-ey">Who It&rsquo;s For</span>
              <h2 className="wls-h2">Built for <AuroraText>Agencies, Studios & Consultants</AuroraText></h2>
              <p className="wls-lead" style={{margin:'0 auto'}}>If you have clients who need SEO and you don&rsquo;t want to build the full capability in-house, this model is for you.</p>
            </div>
            <div className="wls-who-grid">
              {WHO_FOR.map((w, i) => (
                <div key={w.title} className="wls-glass wls-reveal" style={{transitionDelay:`${i*70}ms`,display:'flex',gap:18,alignItems:'flex-start'}}>
                  <div className="wls-nbadge" style={{marginBottom:0,flexShrink:0}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  </div>
                  <div>
                    <div className="wls-card-h">{w.title}</div>
                    <p className="wls-card-p">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DELIVERABLES ── */}
        <section className="wls-sec" id="deliverables">
          <div className="wls-in" style={{maxWidth:960}}>
            <div className="wls-reveal">
              <span className="wls-ey">What You Receive</span>
              <h2 className="wls-h2">Every Month, <AuroraText>Ready to Forward to Your Clients</AuroraText></h2>
              <p className="wls-lead">A complete set of branded, client-ready deliverables — so you look professional at every touchpoint without creating them yourself.</p>
            </div>
            <div className="wls-del-list wls-reveal">
              {DELIVERABLES.map((d, i) => (
                <div key={i} className="wls-del-item">
                  <div className="wls-del-check">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <span className="wls-del-text">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="wls-sec wls-white" id="faq">
          <div className="wls-in" style={{maxWidth:900}}>
            <div className="wls-reveal">
              <span className="wls-ey">Common Questions</span>
              <h2 className="wls-h2">White-Label SEO <AuroraText>Partnership FAQs</AuroraText></h2>
              <p className="wls-lead">What agencies ask us before signing the NDA.</p>
            </div>
            <div className="wls-flist">
              {FAQS.map((f, i) => (
                <div key={i} className={`wls-fitem${openFaq === i ? ' wls-open' : ''}`}>
                  <button className="wls-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="wls-fq-badge">{String(i + 1).padStart(2, '0')}</span>
                    <span className="wls-fq-text">{f.q}</span>
                    <svg className="wls-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <div className="wls-fanswer-wrap">
                    <div className="wls-fanswer">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="wls-sec" id="related">
          <div className="wls-in">
            <div className="wls-reveal">
              <span className="wls-ey">Related Services</span>
              <h2 className="wls-h2">Expand Your <AuroraText>Agency Offering</AuroraText></h2>
              <p className="wls-lead">Pair white-label SEO with these services to build a full-service digital agency without the full-service headcount.</p>
            </div>
            <div className="wls-g3">
              {RELATED.map((r, i) => (
                <Link key={r.href} href={r.href} className="wls-rel-card wls-reveal" style={{transitionDelay:`${i*70}ms`}}>
                  <div className="wls-glass">
                    <div className="wls-nbadge">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={r.icon}/></svg>
                    </div>
                    <div className="wls-card-h">{r.title}</div>
                    <p className="wls-card-p">{r.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARTNER FORM ── */}
        <section className="wls-form-sec" id="partner-form">
          <div className="wls-in">
            <div className="wls-reveal" style={{textAlign:'center',maxWidth:640,margin:'0 auto 40px'}}>
              <span className="wls-ey">Start the Conversation</span>
              <h2 className="wls-h2">Apply to Become a <AuroraText>White-Label SEO Partner</AuroraText></h2>
              <p className="wls-lead" style={{marginBottom:0}}>Tell us about your agency, how many clients you&rsquo;re looking to support, and what you need from an SEO partner. We&rsquo;ll reply within one business day with an NDA and a scoping call invite.</p>
            </div>
            <div className="wls-form-card wls-reveal">
              {formState === 'success' ? (
                <div className="wls-success">
                  <div className="wls-success-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 style={{fontSize:20,fontWeight:800,color:'#0F1F40',margin:0}}>Application received — thank you!</h3>
                  <p style={{fontSize:14,color:'#4A6080',margin:0,maxWidth:420}}>We&rsquo;ll review your details and reach out with an NDA and a scoping call invite within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="wls-form-row">
                    <div className="wls-field">
                      <label className="wls-label" htmlFor="wls-name">Your Name *</label>
                      <input id="wls-name" className="wls-input" type="text" required placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} />
                    </div>
                    <div className="wls-field">
                      <label className="wls-label" htmlFor="wls-email">Work Email *</label>
                      <input id="wls-email" className="wls-input" type="email" required placeholder="jane@youragency.com" value={form.email} onChange={e => setForm(f => ({...f, email:e.target.value}))} />
                    </div>
                  </div>
                  <div className="wls-form-row">
                    <div className="wls-field">
                      <label className="wls-label" htmlFor="wls-agency">Agency Name / Website</label>
                      <input id="wls-agency" className="wls-input" type="text" placeholder="Acme Agency or https://youragency.com" value={form.agency} onChange={e => setForm(f => ({...f, agency:e.target.value}))} />
                    </div>
                    <div className="wls-field">
                      <label className="wls-label" htmlFor="wls-clients">Est. Number of SEO Clients</label>
                      <input id="wls-clients" className="wls-input" type="text" placeholder="e.g. 5, or 10–20" value={form.clients} onChange={e => setForm(f => ({...f, clients:e.target.value}))} />
                    </div>
                  </div>
                  <div className="wls-field">
                    <label className="wls-label" htmlFor="wls-message">What do you need from a white-label SEO partner? *</label>
                    <textarea id="wls-message" className="wls-textarea" required placeholder="Tell us about your agency, the types of clients you work with, and what SEO services you want to resell..." value={form.message} onChange={e => setForm(f => ({...f, message:e.target.value}))} />
                  </div>
                  {formState === 'error' && <p style={{fontSize:13,color:'#dc2626',marginBottom:12}}>{formError||'Something went wrong. Please try again.'}</p>}
                  <button type="submit" className="wls-submit" disabled={formState === 'sending'}>
                    {formState === 'sending' ? 'Sending…' : (
                      <>Send Partner Application <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                    )}
                  </button>
                  <p style={{fontSize:12,color:'#9ca3af',textAlign:'center',marginTop:14}}>We reply within one business day. Mutual NDA sent on request before any client data is shared.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── CTA BOTTOM ── */}
        <section className="wls-cta-sec">
          <div className="wls-in">
            <div className="wls-reveal">
              <span className="wls-ey" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Scale?</span>
              <h2 className="wls-cta-h">Grow Your Agency&rsquo;s SEO Revenue <AuroraText>Without Growing Your Headcount</AuroraText></h2>
              <p className="wls-cta-p">120+ agencies trust us to deliver SEO under their brand. Start with one client, scale to fifty — delivery quality stays the same throughout.</p>
              <div className="wls-btns">
                <a href="#partner-form" className="wls-btn-p">
                  Apply to Partner
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <Link href="/white-label-ppc-services/" className="wls-btn-s">White-Label PPC &rarr;</Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
