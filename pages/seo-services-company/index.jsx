import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const SEO_SERVICES = [
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'SEO Audit & Strategy',
    desc: 'Comprehensive analysis of your site\'s technical health, content gaps, backlink profile, and competitor landscape. We deliver a prioritized roadmap to maximize ranking potential.',
  },
  {
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    title: 'Technical SEO',
    desc: 'We fix Core Web Vitals, crawlability issues, site speed, structured data, canonical tags, hreflang, and mobile-first indexing — the technical foundations Google rewards.',
  },
  {
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    title: 'Keyword Research',
    desc: 'Intent-driven keyword mapping using SEMrush, Ahrefs, and Google Search Console. We target buyer-intent and informational keywords that drive both traffic and conversions.',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'On-Page SEO',
    desc: 'Title tags, meta descriptions, H-tag hierarchy, schema markup, content optimization, internal linking, and image alt text — every on-page signal tuned to rank.',
  },
  {
    icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
    title: 'Link Building & Off-Page SEO',
    desc: 'White-hat link acquisition from high-DA domains, digital PR, guest posting, and brand mentions. We build authority that moves the needle and stands Google algorithm updates.',
  },
  {
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    title: 'Local SEO',
    desc: 'Google Business Profile optimization, local citations, review management, and geo-targeted content. Dominate the local pack for searches in your service area.',
  },
  {
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    title: 'Content Marketing & SEO Writing',
    desc: 'E-E-A-T optimized blog posts, landing pages, and pillar content that ranks, earns links, and converts visitors into leads — written by industry-trained SEO writers.',
  },
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'eCommerce SEO',
    desc: 'Category page optimization, product schema, faceted navigation fixes, and conversion-focused SEO for Shopify, WooCommerce, Magento, and custom stores.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'SEO Reporting & Analytics',
    desc: 'Monthly ranking reports, traffic analysis, conversion tracking, and competitor benchmarking via GA4 and Search Console. Full transparency, no vanity metrics.',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Audit', desc: 'Deep-dive technical audit, competitor analysis, and business goal alignment to build your custom SEO roadmap.' },
  { num: '02', title: 'Keyword Strategy', desc: 'Map keywords to buyer journey stages — awareness, consideration, and decision — across your target markets.' },
  { num: '03', title: 'On-Page & Technical Fixes', desc: 'Implement critical technical fixes, optimize existing pages, and build content architecture that Google loves.' },
  { num: '04', title: 'Content & Link Building', desc: 'Publish optimized content and build authoritative backlinks to accelerate domain authority growth.' },
  { num: '05', title: 'Monitor & Optimize', desc: 'Track rankings, analyze user behavior, and iterate continuously — SEO is a compounding strategy, not a one-time fix.' },
  { num: '06', title: 'Report & Scale', desc: 'Monthly reporting with actionable insights, then scale what\'s working into new markets, pages, and keywords.' },
];

const STATS = [
  { value: '15+', label: 'Years of SEO Experience' },
  { value: '500+', label: 'Websites Ranked on Page 1' },
  { value: '200%', label: 'Avg. Organic Traffic Growth' },
  { value: '98%', label: 'Client Retention Rate' },
];

const TOOLS = [
  'Google Search Console', 'Google Analytics 4', 'SEMrush', 'Ahrefs',
  'Screaming Frog', 'Moz Pro', 'GTmetrix', 'PageSpeed Insights',
  'Surfer SEO', 'Google Tag Manager', 'Yoast SEO', 'Majestic',
];

const INDUSTRIES = [
  { icon: '🛒', name: 'eCommerce & Retail' },
  { icon: '🏥', name: 'Healthcare' },
  { icon: '🏠', name: 'Real Estate' },
  { icon: '⚖️', name: 'Legal & Law Firms' },
  { icon: '💰', name: 'Finance & Banking' },
  { icon: '🎓', name: 'Education & EdTech' },
  { icon: '🏨', name: 'Travel & Hospitality' },
  { icon: '🏗️', name: 'Construction & Home Services' },
];

const RESULTS = [
  {
    client: 'US-Based Vein Treatment Center',
    market: 'USA',
    results: [
      { metric: '118%', label: 'Increase in Online Leads' },
      { metric: '60%', label: 'Boost in Organic Traffic' },
      { metric: '80%', label: 'Improved Search Visibility' },
      { metric: '24%', label: 'Reduced Bounce Rate' },
    ],
    tags: ['Healthcare SEO', 'Local SEO'],
  },
  {
    client: 'eCommerce Store – Australia',
    market: 'Australia',
    results: [
      { metric: '205%', label: 'Increase in Sales' },
      { metric: '195%', label: 'Visibility Increase' },
      { metric: '265%', label: 'Traffic Improvement' },
      { metric: '2,100+', label: 'Keywords in Top 100' },
    ],
    tags: ['eCommerce SEO', 'Technical SEO'],
  },
  {
    client: 'B2B Consulting Firm – Canada',
    market: 'Canada',
    results: [
      { metric: '80%', label: 'Visibility Increased' },
      { metric: '70%', label: 'Traffic Improved' },
      { metric: '40%', label: 'Lead Value Improved' },
      { metric: '35%', label: 'Sign-Ups Increased' },
    ],
    tags: ['B2B SEO', 'Content Strategy'],
  },
];

const FAQS = [
  {
    q: 'How long does SEO take to show results?',
    a: 'Most clients see meaningful ranking improvements within 3–6 months. However, SEO is a compounding strategy — results accelerate over time. Competitive industries or new domains may take 6–12 months to reach significant page-1 positions. We provide monthly reports so you can track progress from day one.',
  },
  {
    q: 'What SEO services does 1Solutions offer?',
    a: '1Solutions offers a full suite of SEO services including technical SEO audits, keyword research, on-page optimization, link building, local SEO, eCommerce SEO, content marketing, and monthly SEO reporting. We create custom strategies tailored to your business goals and target market.',
  },
  {
    q: 'Do you provide SEO services for businesses in the US, Canada, and Australia?',
    a: 'Yes. Over 70% of our SEO clients are based in the US, Canada, and Australia. We have deep expertise in English-language SEO and understand the competitive landscape, user search behavior, and local signals for these markets specifically.',
  },
  {
    q: 'How is your SEO pricing structured?',
    a: 'We offer monthly retainer-based SEO packages starting from $499/month, as well as project-based engagements for audits and one-time optimizations. Custom enterprise plans are available. Contact us for a free proposal tailored to your website and goals.',
  },
  {
    q: 'Do you follow Google\'s SEO guidelines?',
    a: 'Absolutely. We only use white-hat, Google-compliant SEO techniques — no PBNs, no keyword stuffing, no link schemes. Our strategies are built to deliver sustainable rankings that survive algorithm updates, not shortcuts that risk penalties.',
  },
  {
    q: 'Will you provide a dedicated SEO manager?',
    a: 'Yes. Every 1Solutions SEO client gets a dedicated account manager and SEO strategist who provides monthly reports, attends strategy calls, and is reachable via email throughout the engagement.',
  },
  {
    q: 'Can you help with both local SEO and national SEO?',
    a: 'Yes. We handle local SEO (Google Business Profile, local citations, neighborhood-level targeting) as well as national and international SEO campaigns for businesses targeting broader audiences across multiple geographies.',
  },
  {
    q: 'What makes 1Solutions different from other SEO companies?',
    a: '15+ years of experience, a proven track record of 500+ websites ranked on page 1, and a transparent reporting process. We focus on business outcomes — leads, revenue, and ROI — not just ranking vanity metrics. Our US/Canada/Australia focus means we understand your market better than offshore-generic SEO agencies.',
  },
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function SEOServices() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'SEO Services',
    provider: {
      '@type': 'Organization',
      name: '1Solutions',
      url: 'https://www.1solutions.biz',
      address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
      foundingDate: '2008',
    },
    description: 'ROI-driven SEO services for businesses in the US, Canada, and Australia — technical SEO, link building, content marketing, and local SEO.',
    areaServed: ['US', 'CA', 'AU'],
  };

  return (
    <>
      <Head>
        <title>SEO Services Company | Rank #1 on Google – 1Solutions</title>
        <meta name="description" content="1Solutions is a 15+ year old SEO company offering technical SEO, link building, local SEO, eCommerce SEO, and content strategy for businesses in the US, Canada & Australia. Get a free SEO audit." />
        <meta name="keywords" content="SEO services, SEO company India, SEO company New Delhi, technical SEO, local SEO, eCommerce SEO, link building, SEO agency US, SEO agency Canada, SEO agency Australia" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/seo-services-company" />
        {/* Open Graph */}
        <meta property="og:title" content="SEO Services Company | Rank #1 on Google – 1Solutions" />
        <meta property="og:description" content="ROI-driven SEO services. 500+ websites ranked page 1. 15+ years experience. Free audit for US, Canada & Australia businesses." />
        <meta property="og:url" content="https://www.1solutions.biz/seo-services-company" />
        <meta property="og:type" content="website" />
        {/* Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      </Head>

      {/* ── HERO ── */}
      <section
        aria-label="SEO Services Hero"
        style={{
          background: 'linear-gradient(135deg, rgba(254,243,199,0.55) 0%, rgba(219,234,254,0.35) 100%)',
          position: 'relative',
          overflow: 'hidden',
          padding: '100px 0 80px',
        }}
      >
        <div style={{ position:'absolute', top:-80, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(254,151,0,0.13) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
            <ol style={{ display:'flex', gap:8, alignItems:'center', listStyle:'none', padding:0, margin:0, fontSize:'0.82rem', color:'#6b7280' }}>
              <li><Link href="/" style={{ color:'#0F3460', textDecoration:'none' }}>Home</Link></li>
              <li style={{ color:'#d1d5db' }}>›</li>
              <li><Link href="/digital-marketing" style={{ color:'#0F3460', textDecoration:'none' }}>Digital Marketing</Link></li>
              <li style={{ color:'#d1d5db' }}>›</li>
              <li style={{ color:'#6b7280' }}>SEO Services</li>
            </ol>
          </nav>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:60, alignItems:'center' }}>
            <div>
              <p style={{ color:'#D97706', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:16 }}>
                #1 Ranked SEO Company — New Delhi, India
              </p>
              <h1 style={{
                fontSize:'clamp(2rem,4vw,3rem)',
                fontWeight:800,
                lineHeight:1.2,
                marginBottom:20,
                background:'linear-gradient(90deg,#0F3460 0%,#F59E0B 50%,#7C3AED 100%)',
                WebkitBackgroundClip:'text',
                WebkitTextFillColor:'transparent',
                backgroundClip:'text',
              }}>
                SEO Services That Drive Real Rankings, Traffic & Revenue
              </h1>
              <p style={{ color:'#4b5563', fontSize:'1.05rem', lineHeight:1.8, marginBottom:28, maxWidth:580 }}>
                1Solutions is a 15+ year old SEO company trusted by 500+ businesses across the US, Canada, and Australia. We deliver ROI-driven SEO — not vanity rankings, but real organic growth that compounds over time.
              </p>
              {/* Trust badges */}
              <div style={{ display:'flex', gap:24, marginBottom:32, flexWrap:'wrap' }}>
                {['Google Partner', '15+ Years', '500+ Clients', 'White-Hat Only'].map(b => (
                  <span key={b} style={{
                    display:'flex', alignItems:'center', gap:6,
                    fontSize:'0.82rem', fontWeight:600, color:'#374151',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
                    {b}
                  </span>
                ))}
              </div>
              <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
                <Link href="/contact" style={{
                  background:'#0F3460', color:'#fff',
                  padding:'14px 28px', borderRadius:50,
                  fontWeight:700, textDecoration:'none', fontSize:'0.97rem',
                  display:'inline-flex', alignItems:'center', gap:8,
                }}>
                  Get Free SEO Audit
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link href="/portfolio" style={{
                  background:'rgba(15,52,96,0.07)', color:'#0F3460',
                  padding:'14px 28px', borderRadius:50,
                  fontWeight:700, textDecoration:'none', fontSize:'0.97rem',
                  border:'1.5px solid rgba(15,52,96,0.18)',
                  display:'inline-flex', alignItems:'center', gap:8,
                }}>
                  View SEO Results
                </Link>
              </div>
            </div>

            {/* Stats card */}
            <div style={{
              background:'linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(255,255,255,0.70) 100%)',
              backdropFilter:'blur(20px)',
              border:'1px solid rgba(255,255,255,0.60)',
              borderRadius:20,
              padding:'36px 32px',
              boxShadow:'0 8px 40px rgba(15,52,96,0.10)',
            }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
                {STATS.map(s => (
                  <div key={s.label} style={{ textAlign:'center' }}>
                    <div style={{
                      fontSize:'2.2rem', fontWeight:800,
                      background:'linear-gradient(135deg,#0F3460,#F59E0B)',
                      WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                      lineHeight:1.1, marginBottom:6,
                    }}>{s.value}</div>
                    <div style={{ fontSize:'0.78rem', color:'#6b7280', fontWeight:500, lineHeight:1.4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:28, paddingTop:24, borderTop:'1px solid rgba(15,52,96,0.10)' }}>
                <p style={{ fontSize:'0.82rem', color:'#6b7280', textAlign:'center', marginBottom:14 }}>Trusted by businesses in</p>
                <div style={{ display:'flex', justifyContent:'center', gap:16 }}>
                  {['🇺🇸 USA', '🇨🇦 Canada', '🇦🇺 Australia'].map(c => (
                    <span key={c} style={{ fontSize:'0.82rem', fontWeight:600, color:'#374151' }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ background:'#fff', padding:'72px 40px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontSize:'clamp(1.5rem,2.5vw,2.1rem)', fontWeight:800, color:'#0A1628', marginBottom:20 }}>
            Why 1Solutions Is the Right SEO Company for Your Business
          </h2>
          <p style={{ color:'#4b5563', fontSize:'1.05rem', lineHeight:1.85 }}>
            As an <strong>SEO company based in New Delhi with 15+ years of experience</strong>, we've helped businesses across the US, Canada, and Australia grow their organic search presence. Unlike large agencies where your project gets handed to a junior, every 1Solutions client gets a senior SEO strategist, transparent monthly reporting, and strategies built around your actual business goals — not keyword rankings for their own sake.
          </p>
          <p style={{ color:'#4b5563', fontSize:'1.05rem', lineHeight:1.85, marginTop:16 }}>
            We combine deep technical expertise with content strategy and authority-building to deliver results that compound. Our clients see an average <strong>200% increase in organic traffic</strong> within 12 months.
          </p>
        </div>
      </section>

      {/* ── SEO SERVICES GRID ── */}
      <section style={{ background:'#f9fafb', padding:'80px 40px' }} aria-labelledby="services-heading">
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <p style={{ color:'#D97706', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12 }}>What We Do</p>
            <h2 id="services-heading" style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:800, color:'#0A1628', marginBottom:16 }}>
              Our SEO Services
            </h2>
            <p style={{ color:'#6b7280', fontSize:'1.02rem', maxWidth:560, margin:'0 auto', lineHeight:1.75 }}>
              A complete SEO service suite — from initial audit to ongoing authority building — all under one roof.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:28 }}>
            {SEO_SERVICES.map((svc, i) => (
              <article key={i} style={{
                background:'#fff',
                borderRadius:16,
                padding:'28px 26px',
                border:'1px solid #f3f4f6',
                transition:'all 0.2s',
                cursor:'default',
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor='#FE9700'; e.currentTarget.style.boxShadow='0 8px 32px rgba(254,151,0,0.12)'; e.currentTarget.style.transform='translateY(-3px)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor='#f3f4f6'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; }}
              >
                <div style={{
                  width:48, height:48, borderRadius:12,
                  background:'linear-gradient(135deg,rgba(254,151,0,0.12),rgba(15,52,96,0.08))',
                  display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18,
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F3460" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={svc.icon}/>
                  </svg>
                </div>
                <h3 style={{ fontSize:'1.05rem', fontWeight:700, color:'#0A1628', marginBottom:10 }}>{svc.title}</h3>
                <p style={{ color:'#6b7280', fontSize:'0.92rem', lineHeight:1.75 }}>{svc.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS / CASE STUDIES ── */}
      <section style={{ background:'#fff', padding:'80px 40px' }} aria-labelledby="results-heading">
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <p style={{ color:'#D97706', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12 }}>Proven Results</p>
            <h2 id="results-heading" style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:800, color:'#0A1628', marginBottom:16 }}>
              Real SEO Results for Real Businesses
            </h2>
            <p style={{ color:'#6b7280', fontSize:'1.02rem', maxWidth:540, margin:'0 auto', lineHeight:1.75 }}>
              Numbers don't lie. Here's what our SEO clients achieved within 12 months of working with us.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:28 }}>
            {RESULTS.map((r, i) => (
              <div key={i} style={{
                background:'linear-gradient(135deg,#0A1628 0%,#0F3460 100%)',
                borderRadius:20,
                padding:'32px 28px',
                color:'#fff',
              }}>
                <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
                  {r.tags.map(t => (
                    <span key={t} style={{
                      background:'rgba(254,151,0,0.18)', color:'#FE9700',
                      borderRadius:50, padding:'4px 12px', fontSize:'0.75rem', fontWeight:600,
                    }}>{t}</span>
                  ))}
                </div>
                <h3 style={{ fontSize:'1.05rem', fontWeight:700, color:'#fff', marginBottom:6 }}>{r.client}</h3>
                <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.50)', marginBottom:24 }}>Market: {r.market}</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                  {r.results.map((m, j) => (
                    <div key={j}>
                      <div style={{ fontSize:'1.8rem', fontWeight:800, color:'#FE9700', lineHeight:1.1 }}>{m.metric}</div>
                      <div style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.60)', lineHeight:1.4, marginTop:4 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign:'center', marginTop:40 }}>
            <Link href="/case-studies" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              border:'1.5px solid #0A1628', borderRadius:50,
              padding:'12px 28px', color:'#0A1628',
              textDecoration:'none', fontWeight:600, fontSize:'0.95rem',
            }}>
              View All Case Studies
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background:'#f9fafb', padding:'80px 40px' }} aria-labelledby="process-heading">
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <p style={{ color:'#D97706', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12 }}>How We Work</p>
            <h2 id="process-heading" style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:800, color:'#0A1628', marginBottom:16 }}>
              Our 6-Step SEO Process
            </h2>
            <p style={{ color:'#6b7280', fontSize:'1.02rem', maxWidth:520, margin:'0 auto', lineHeight:1.75 }}>
              A structured, repeatable process that delivers consistent results — no guesswork, no shortcuts.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:28 }}>
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} style={{
                background:'#fff', borderRadius:16, padding:'28px 26px',
                border:'1px solid #f3f4f6', position:'relative',
              }}>
                <div style={{
                  fontSize:'3rem', fontWeight:800,
                  color:'rgba(254,151,0,0.15)',
                  lineHeight:1, marginBottom:12,
                }}>{step.num}</div>
                <h3 style={{ fontSize:'1.05rem', fontWeight:700, color:'#0A1628', marginBottom:10 }}>{step.title}</h3>
                <p style={{ color:'#6b7280', fontSize:'0.92rem', lineHeight:1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ background:'#fff', padding:'80px 40px' }} aria-labelledby="why-heading">
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
            <div>
              <p style={{ color:'#D97706', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:16 }}>Why 1Solutions</p>
              <h2 id="why-heading" style={{ fontSize:'clamp(1.5rem,2.8vw,2.2rem)', fontWeight:800, color:'#0A1628', marginBottom:20, lineHeight:1.25 }}>
                What Sets Our SEO Services Apart
              </h2>
              <p style={{ color:'#4b5563', lineHeight:1.85, marginBottom:32 }}>
                There are thousands of SEO companies. Here's why businesses in the US, Canada, and Australia trust 1Solutions with their most important digital channel.
              </p>

              {[
                { title: 'No Lock-In Contracts', desc: 'Month-to-month engagements. We earn your business every month through results.' },
                { title: 'Dedicated Senior Strategist', desc: 'Your account is managed by a senior SEO professional — not a junior or an AI bot.' },
                { title: 'Full Transparency', desc: 'Monthly reports with real data — rankings, traffic, conversions, and what we did to get there.' },
                { title: "US/Canada/Australia Market Expertise", desc: "We understand English-language search behavior, Google's local algorithms, and your competitive landscape." },
                { title: 'White-Hat Only', desc: 'Zero tolerance for black-hat tactics. Our strategies are built to last through algorithm updates.' },
                { title: '15+ Years of Proven Experience', desc: 'We\'ve been doing SEO since 2008 — before Google Penguin, Panda, and Core Web Vitals existed.' },
              ].map((item, i) => (
                <div key={i} style={{ display:'flex', gap:14, marginBottom:20 }}>
                  <div style={{
                    width:32, height:32, borderRadius:8, flexShrink:0, marginTop:2,
                    background:'linear-gradient(135deg,rgba(254,151,0,0.15),rgba(15,52,96,0.10))',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F3460" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight:700, color:'#0A1628', fontSize:'0.97rem', marginBottom:4 }}>{item.title}</div>
                    <div style={{ color:'#6b7280', fontSize:'0.9rem', lineHeight:1.7 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tools panel */}
            <div>
              <div style={{
                background:'linear-gradient(135deg,rgba(254,243,199,0.55) 0%,rgba(219,234,254,0.35) 100%)',
                borderRadius:20, padding:'36px 32px',
              }}>
                <h3 style={{ fontSize:'1.1rem', fontWeight:800, color:'#0A1628', marginBottom:24 }}>SEO Tools We Use</h3>
                <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
                  {TOOLS.map(t => (
                    <span key={t} style={{
                      background:'#fff', border:'1px solid #e5e7eb',
                      borderRadius:8, padding:'8px 14px',
                      fontSize:'0.82rem', fontWeight:600, color:'#374151',
                      boxShadow:'0 1px 4px rgba(0,0,0,0.06)',
                    }}>{t}</span>
                  ))}
                </div>

                <div style={{ marginTop:32, paddingTop:28, borderTop:'1px solid rgba(15,52,96,0.10)' }}>
                  <h3 style={{ fontSize:'1.1rem', fontWeight:800, color:'#0A1628', marginBottom:20 }}>Industries We Serve</h3>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    {INDUSTRIES.map(ind => (
                      <div key={ind.name} style={{ display:'flex', alignItems:'center', gap:10, fontSize:'0.87rem', fontWeight:500, color:'#374151' }}>
                        <span style={{ fontSize:'1.1rem' }}>{ind.icon}</span>
                        {ind.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background:'#f9fafb', padding:'80px 40px' }} aria-labelledby="faq-heading">
        <div style={{ maxWidth:860, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <p style={{ color:'#D97706', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12 }}>FAQ</p>
            <h2 id="faq-heading" style={{ fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:800, color:'#0A1628', marginBottom:16 }}>
              Frequently Asked Questions About Our SEO Services
            </h2>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{
                background:'#fff', borderRadius:14,
                border: openFaq === i ? '1.5px solid #FE9700' : '1px solid #e5e7eb',
                overflow:'hidden', transition:'border-color 0.2s',
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  style={{
                    width:'100%', textAlign:'left', padding:'20px 24px',
                    background:'none', border:'none', cursor:'pointer',
                    display:'flex', justifyContent:'space-between', alignItems:'center', gap:16,
                  }}
                >
                  <span style={{ fontWeight:700, color:'#0A1628', fontSize:'0.97rem', lineHeight:1.4 }}>{faq.q}</span>
                  <svg
                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ flexShrink:0, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }}
                    aria-hidden="true"
                  >
                    <path d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div style={{ padding:'0 24px 20px', color:'#4b5563', fontSize:'0.95rem', lineHeight:1.8 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background:'linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%)',
          padding:'90px 40px',
          position:'relative',
          overflow:'hidden',
        }}
        aria-labelledby="cta-heading"
      >
        <div style={{ position:'absolute', top:-80, right:-80, width:320, height:320, borderRadius:'50%', background:'radial-gradient(circle,rgba(254,151,0,0.12) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle,rgba(15,52,96,0.07) 0%,transparent 70%)', pointerEvents:'none' }} />

        <div style={{ maxWidth:820, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <p style={{ color:'#D97706', fontSize:'0.82rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:16 }}>Free SEO Audit</p>
          <h2 id="cta-heading" style={{
            fontSize:'clamp(1.8rem,3.5vw,2.8rem)',
            fontWeight:800,
            background:'linear-gradient(90deg,#0F3460 0%,#F59E0B 50%,#7C3AED 100%)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text',
            marginBottom:18, lineHeight:1.25,
          }}>
            Ready to Rank Higher and Grow Faster?
          </h2>
          <p style={{ color:'#4b5563', fontSize:'1.05rem', lineHeight:1.75, marginBottom:36, maxWidth:520, margin:'0 auto 36px' }}>
            Get a <strong>free SEO audit</strong> of your website — covering technical health, keyword opportunities, and a priority action plan. No commitment, no fluff.
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/contact" style={{
              background:'#0F3460', color:'#fff',
              padding:'15px 32px', borderRadius:50,
              fontWeight:700, textDecoration:'none', fontSize:'0.97rem',
              display:'inline-flex', alignItems:'center', gap:8,
            }}>
              Get My Free SEO Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/affordable-seo-packages" style={{
              background:'rgba(15,52,96,0.07)', color:'#0F3460',
              padding:'15px 32px', borderRadius:50,
              fontWeight:700, textDecoration:'none', fontSize:'0.97rem',
              border:'1.5px solid rgba(15,52,96,0.18)',
              display:'inline-flex', alignItems:'center', gap:8,
            }}>
              View SEO Packages
            </Link>
          </div>
          <p style={{ marginTop:24, fontSize:'0.82rem', color:'#9ca3af' }}>
            📞 Or call us directly: <a href="tel:+919654327900" style={{ color:'#0F3460', fontWeight:600, textDecoration:'none' }}>+91 9654327900</a> &nbsp;·&nbsp; <a href="mailto:info@1solutions.biz" style={{ color:'#0F3460', fontWeight:600, textDecoration:'none' }}>info@1solutions.biz</a>
          </p>
        </div>
      </section>
    </>
  );
}
