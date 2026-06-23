import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const STATS = [
  { label: 'Links Built',    val: '50,000+' },
  { label: 'Avg DR',        val: 'DR50+'   },
  { label: 'Years',         val: '15+'     },
  { label: 'Retention',     val: '92%'     },
];

const SERVICES = [
  {
    icon: '✍️',
    title: 'Guest Post Placements',
    body: 'Original content written in your niche, published on real DR40+ websites with contextual links back to your target pages. Full editorial control, niche-relevant anchor text, live links indexed within weeks.',
  },
  {
    icon: '🔗',
    title: 'Niche Edits (Link Insertions)',
    body: 'Your link placed within already-indexed, high-authority content on relevant websites. Faster indexing than new posts, strong topical relevance, and immediate authority transfer.',
  },
  {
    icon: '📰',
    title: 'Digital PR & Premium Placements',
    body: 'Coverage and links from online publications, industry media, and news sites. High-DR60+ domains, powerful for competitive industries and brand authority. Available on the Authority plan.',
  },
];

const PROCESS = [
  {
    num: '01',
    title: 'Backlink Gap Analysis',
    body: 'We audit your current link profile and your top 5 competitors to identify exactly which sites link to them but not you — your highest-priority acquisition targets.',
  },
  {
    num: '02',
    title: 'Prospect Research & Vetting',
    body: 'We identify prospective link sites using DR, organic traffic, topical relevance, and editorial standards. No link farms, no PBNs — every site is manually reviewed.',
  },
  {
    num: '03',
    title: 'Outreach & Placement',
    body: 'Our outreach team contacts editors, site owners, and publications with personalised pitches. We write all content or supply anchor text briefs based on your strategy.',
  },
  {
    num: '04',
    title: 'Reporting & Live Tracker',
    body: 'Every link placed is logged: live URL, anchor text, DR of linking domain, organic traffic of the linking page, target page. Full transparency on a Google Sheets live tracker or dashboard.',
  },
];

const WHY = [
  {
    title: 'White-Hat Only',
    body: 'We never buy links from link farms, use PBNs, or run automated outreach tools. Every link is a real editorial placement from a real website.',
  },
  {
    title: '15+ Years of Outreach Relationships',
    body: "We've built relationships with thousands of editors and site owners across verticals — meaning faster placements and access to sites competitors can't reach through cold outreach.",
  },
  {
    title: 'Minimum DR40+ Guarantee',
    body: 'We set and enforce minimum Domain Rating thresholds per plan (DR40+, DR50+, DR60+) to ensure you only receive links from genuinely authoritative sites.',
  },
  {
    title: 'Niche Relevance First',
    body: 'Authority matters, but so does context. Every link we build comes from a site topically related to your industry — which sends the right signals to Google.',
  },
  {
    title: 'Full Transparency, No Black Boxes',
    body: 'Your live link tracker is updated the moment a link goes live. You see every link, every domain, every metric — nothing is hidden in a summary report.',
  },
  {
    title: 'Works With Any SEO Strategy',
    body: 'Whether you have an in-house SEO team, a separate on-page agency, or just need link velocity, our standalone packages slot in without disruption.',
  },
];

const FAQS = [
  {
    q: 'How is link building services different from link building packages?',
    a: 'Link Building Services describes the methodology and deliverables — what we actually do to acquire your links (manual outreach, guest posts, niche edits, digital PR). Link Building Packages is the pricing and plan structure — how many links per month, at what DR, and at what monthly or yearly price. If you are comparing what we do versus what it costs, start here; then visit the packages page to choose your plan.',
  },
  {
    q: 'What DR (Domain Rating) links do you build?',
    a: 'Our packages specify minimum DR thresholds: Starter (DR40+), Growth (DR50+), Authority (DR60+). In practice, many links we place exceed the floor — it is a minimum, not an average. We use DR alongside organic traffic and topical relevance to evaluate each prospective site before outreach begins.',
  },
  {
    q: 'How long before I see ranking improvements?',
    a: 'New backlinks are typically indexed within 2 to 6 weeks. Domain authority improvements become visible in 2 to 4 months. Ranking improvements for target keywords are usually observable between 3 and 6 months. Significant organic traffic growth follows 6 to 9 months into a consistent monthly programme. Link building compounds — month 12 results are exponentially better than month 3.',
  },
  {
    q: 'Do you build links for ecommerce and SaaS sites?',
    a: 'Yes. We build links for ecommerce stores (Shopify, WooCommerce, Magento), SaaS platforms, B2B service businesses, professional services, and content sites. ecommerce and SaaS often require specific placement types — product category page links, integration pages, feature comparison content — which our team is experienced with. For highly competitive niches like finance, legal, or insurance, we recommend Growth or Authority plans.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',         item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Link Building Services', item: 'https://www.1solutions.biz/link-building-services/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Link Building Services',
      provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
      serviceType: 'Link Building',
      url: 'https://www.1solutions.biz/link-building-services/',
      description: 'Manual outreach link building services from 1Solutions — guest posts, niche edits, and digital PR from DR40+ to DR60+ websites. 50,000+ links built. 15+ years experience.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

export default function LinkBuildingServices() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Head>
        <title>Link Building Services | White-Hat Backlink Building Agency | 1Solutions</title>
        <meta name="description" content="Manual outreach link building services from 1Solutions — guest posts, niche edits, and digital PR from DR40+ to DR60+ websites. 50,000+ links built. 15+ years experience." />
        <meta name="keywords" content="link building services, backlink building, guest post service, niche edits, digital PR, white-hat link building, manual outreach link building" />
        <link rel="canonical" href="https://www.1solutions.biz/link-building-services/" />
        <meta property="og:title" content="Link Building Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/link-building-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .lbs-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .lbs-page *,.lbs-page *::before,.lbs-page *::after{box-sizing:border-box}

          /* Hero */
          .lbs-hero{background:linear-gradient(135deg,#faf5ff 0%,#ede9fe 30%,#ddd6fe 65%,#faf5ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .lbs-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .lbs-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(91,33,182,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .lbs-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .lbs-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .lbs-bc a{color:#6b7280;text-decoration:none}.lbs-bc a:hover{color:#7C3AED}.lbs-bc span{color:#d1d5db}
          .lbs-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#7C3AED;margin-bottom:28px}
          .lbs-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 50%,#5B21B6 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .lbs-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:640px;margin:0 auto 36px}
          .lbs-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .lbs-btn-p{display:inline-flex;align-items:center;gap:8px;background:#7C3AED;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(124,58,237,0.28)}
          .lbs-btn-p:hover{background:#4C1D95;box-shadow:0 8px 32px rgba(124,58,237,0.38);transform:translateY(-2px)}
          .lbs-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .lbs-btn-s:hover{border-color:#7C3AED;color:#7C3AED;transform:translateY(-2px)}
          .lbs-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(124,58,237,0.07)}
          .lbs-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(124,58,237,0.08)}.lbs-stat:last-child{border-right:none}
          .lbs-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .lbs-stat-v{font-size:1.6rem;font-weight:900;color:#7C3AED;letter-spacing:-0.5px}

          /* Shared section */
          .lbs-sec{padding:80px 40px}
          .lbs-sec-alt{background:#f8fafd}
          .lbs-sec-in{max-width:1200px;margin:0 auto}
          .lbs-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7C3AED;margin-bottom:10px;display:block}
          .lbs-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .lbs-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:600px;margin-bottom:44px}

          /* Service cards */
          .lbs-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .lbs-card{background:#fff;border:1.5px solid #e5e9f0;border-radius:20px;padding:32px 28px;transition:box-shadow 0.22s,transform 0.22s}
          .lbs-card:hover{box-shadow:0 12px 40px rgba(124,58,237,0.08);transform:translateY(-3px)}
          .lbs-card-icon{font-size:2rem;margin-bottom:16px}
          .lbs-card-title{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .lbs-card-body{font-size:14px;color:#4A6080;line-height:1.7}

          /* Process */
          .lbs-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative}
          .lbs-steps::before{content:'';position:absolute;top:28px;left:calc(12.5% + 16px);right:calc(12.5% + 16px);height:2px;background:linear-gradient(90deg,#7C3AED,#5B21B6);opacity:0.2;pointer-events:none}
          .lbs-step{padding:0 16px;text-align:center;position:relative}
          .lbs-step-num{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#7C3AED,#4C1D95);color:#fff;font-size:1rem;font-weight:900;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 4px 16px rgba(124,58,237,0.28);position:relative;z-index:1}
          .lbs-step-title{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:8px}
          .lbs-step-body{font-size:13px;color:#4A6080;line-height:1.65}

          /* Why grid */
          .lbs-why-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
          .lbs-why-item{background:#fff;border:1.5px solid #e5e9f0;border-radius:16px;padding:24px 28px}
          .lbs-why-title{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:8px;display:flex;align-items:center;gap:8px}
          .lbs-why-title::before{content:'';width:8px;height:8px;border-radius:50%;background:#7C3AED;flex-shrink:0}
          .lbs-why-body{font-size:14px;color:#4A6080;line-height:1.65}

          /* FAQ */
          .lbs-faq-in{max-width:860px;margin:0 auto}
          .lbs-fitem{border-bottom:1px solid #e5e7eb}
          .lbs-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .lbs-fq:hover{color:#7C3AED}
          .lbs-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .lbs-fitem.open .lbs-ficon{border-color:#7C3AED;color:#7C3AED;background:rgba(124,58,237,0.06)}
          .lbs-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .lbs-fitem.open .lbs-fa{max-height:400px;padding-bottom:22px}

          /* CTA */
          .lbs-cta{background:linear-gradient(135deg,rgba(124,58,237,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(76,29,149,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .lbs-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.10) 0%,transparent 70%);pointer-events:none}
          .lbs-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(76,29,149,0.08) 0%,transparent 70%);pointer-events:none}
          .lbs-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .lbs-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .lbs-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}

          /* Responsive */
          @media(max-width:1024px){.lbs-cards{grid-template-columns:1fr 1fr}.lbs-steps{grid-template-columns:1fr 1fr;gap:32px}.lbs-steps::before{display:none}}
          @media(max-width:768px){
            .lbs-hero,.lbs-sec,.lbs-cta{padding:60px 24px}
            .lbs-hero{padding-top:60px;padding-bottom:0}
            .lbs-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}
            .lbs-stat:nth-child(2){border-right:none}
            .lbs-btns{flex-direction:column;align-items:center}
            .lbs-cards{grid-template-columns:1fr}
            .lbs-steps{grid-template-columns:1fr}
            .lbs-why-grid{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <div className="lbs-page">

        {/* Hero */}
        <section className="lbs-hero">
          <div className="lbs-o1"/><div className="lbs-o2"/>
          <div className="lbs-in">
            <nav className="lbs-bc">
              <Link href="/">Home</Link><span>/</span>
              <Link href="/seo-services-company">SEO Services</Link><span>/</span>
              <span style={{color:'#7C3AED'}}>Link Building Services</span>
            </nav>
            <span className="lbs-badge">
              <span style={{width:6,height:6,borderRadius:'50%',background:'#7C3AED',display:'inline-block'}}/>
              Manual Outreach · White-Hat Only · DR40–DR60+
            </span>
            <h1 className="lbs-h1">Link Building Services — Earn Backlinks That Move Rankings</h1>
            <p className="lbs-sub">We build high-authority backlinks through 100% manual outreach — guest posts on niche-relevant DR40+ sites, niche edits in existing indexed content, and digital PR placements. Every link is reported, every placement tracked live.</p>
            <div className="lbs-btns">
              <Link href="/link-building-packages" className="lbs-btn-p">
                View Pricing &amp; Packages <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/contact-us" className="lbs-btn-s">Talk to a Specialist</Link>
            </div>
            <div className="lbs-stats">
              {STATS.map(s => (
                <div key={s.label} className="lbs-stat">
                  <div className="lbs-stat-l">{s.label}</div>
                  <div className="lbs-stat-v">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="lbs-sec lbs-sec-alt">
          <div className="lbs-sec-in">
            <span className="lbs-eyebrow">What We Build</span>
            <h2 className="lbs-ttl">Three Types of High-Authority Backlinks</h2>
            <p className="lbs-desc">Every link we build is a genuine editorial placement — no shortcuts, no automation, no link farms.</p>
            <div className="lbs-cards">
              {SERVICES.map(s => (
                <div key={s.title} className="lbs-card">
                  <div className="lbs-card-icon">{s.icon}</div>
                  <div className="lbs-card-title">{s.title}</div>
                  <p className="lbs-card-body">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="lbs-sec">
          <div className="lbs-sec-in">
            <span className="lbs-eyebrow">Our Process</span>
            <h2 className="lbs-ttl">How We Build Your Backlinks</h2>
            <p className="lbs-desc">A repeatable, four-stage process that delivers high-quality links at scale — with full visibility at every step.</p>
            <div className="lbs-steps">
              {PROCESS.map(p => (
                <div key={p.num} className="lbs-step">
                  <div className="lbs-step-num">{p.num}</div>
                  <div className="lbs-step-title">{p.title}</div>
                  <p className="lbs-step-body">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why 1Solutions */}
        <section className="lbs-sec lbs-sec-alt">
          <div className="lbs-sec-in">
            <span className="lbs-eyebrow">Why 1Solutions</span>
            <h2 className="lbs-ttl">What Makes Our Link Building Different</h2>
            <p className="lbs-desc">Fifteen years of outreach relationships, strict quality standards, and zero tolerance for tactics that risk your site.</p>
            <div className="lbs-why-grid">
              {WHY.map(w => (
                <div key={w.title} className="lbs-why-item">
                  <div className="lbs-why-title">{w.title}</div>
                  <p className="lbs-why-body">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="lbs-sec">
          <div className="lbs-faq-in">
            <span className="lbs-eyebrow">Common Questions</span>
            <h2 className="lbs-ttl">Link Building Services FAQs</h2>
            <p className="lbs-desc" style={{marginBottom:44}}>Answers to the most common questions before getting started with our link building service.</p>
            <div>
              {FAQS.map((f, i) => (
                <div key={i} className={`lbs-fitem${openFaq === i ? ' open' : ''}`}>
                  <button className="lbs-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {f.q}
                    <span className="lbs-ficon">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="lbs-fa" style={openFaq === i ? {maxHeight:400,paddingBottom:22} : {}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="lbs-cta">
          <div className="lbs-cta-o1"/><div className="lbs-cta-o2"/>
          <div className="lbs-cta-in">
            <span className="lbs-eyebrow" style={{textAlign:'center',display:'block',marginBottom:16}}>Free Backlink Gap Analysis</span>
            <h2 className="lbs-cta-t">Ready to Build Backlinks That Matter?</h2>
            <p className="lbs-cta-s">Share your domain and target keywords — we&rsquo;ll run a free backlink gap analysis and recommend the right plan and monthly volume for your site.</p>
            <div className="lbs-btns">
              <Link href="/link-building-packages" className="lbs-btn-p">
                View Pricing &amp; Packages <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/contact-us" className="lbs-btn-s">Talk to a Specialist</Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
