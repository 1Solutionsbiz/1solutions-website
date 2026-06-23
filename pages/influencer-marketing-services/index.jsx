import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Influencer Strategy & Campaign Planning', desc: 'Data-backed campaign blueprints aligned to your brand goals, target audience, and budget — built before a single creator is approached.' },
  { n: '02', title: 'Influencer Discovery & Vetting', desc: 'We identify and vet creators by niche, engagement rate, audience demographics, and brand-safety scores — not just follower count.' },
  { n: '03', title: 'Campaign Execution & Management', desc: 'End-to-end campaign management including outreach, negotiations, contracts, briefing, approval workflows, and post-tracking.' },
  { n: '04', title: 'Content Brief & Creative Direction', desc: 'Clear, brand-aligned briefs that give creators the direction they need while preserving their authentic voice — the key to content that converts.' },
  { n: '05', title: 'Micro-Influencer Programs', desc: 'High-trust micro-influencer campaigns (10K–100K followers) that deliver 3–5× higher engagement and significantly lower cost-per-click.' },
  { n: '06', title: 'TikTok & Instagram Reels Campaigns', desc: 'Short-form video influencer campaigns built for maximum reach, virality, and product discovery on the platforms your customers use most.' },
  { n: '07', title: 'Brand Ambassador Programs', desc: 'Long-term ambassador relationships that build authentic brand affinity, repeat content, and community loyalty around your ecommerce brand.' },
  { n: '08', title: 'Performance Analytics & Reporting', desc: 'Detailed campaign reports covering reach, impressions, engagement, link clicks, conversions, and attributed revenue — no vanity metrics.' },
];

const PLATFORMS = [
  { name: 'Instagram', color: '#E1306C', icon: 'IG' },
  { name: 'TikTok', color: '#010101', icon: 'TK' },
  { name: 'YouTube', color: '#FF0000', icon: 'YT' },
  { name: 'Pinterest', color: '#E60023', icon: 'PI' },
  { name: 'LinkedIn', color: '#0077B5', icon: 'LI' },
  { name: 'X / Twitter', color: '#14171A', icon: 'X' },
];

const PROCESS = [
  { step: '01', title: 'Discovery & Brand Audit', desc: 'We learn your brand, goals, target customer, competitors, and past campaign history to set a precise strategy baseline.' },
  { step: '02', title: 'Influencer Research & Shortlisting', desc: 'Using data tools and manual vetting, we build a curated shortlist of creators whose audiences genuinely match your customer profile.' },
  { step: '03', title: 'Outreach, Negotiation & Contracting', desc: 'We handle all creator communications, rate negotiations, deliverable agreements, and contract signing — so you don\'t have to.' },
  { step: '04', title: 'Campaign Execution & Live Monitoring', desc: 'We brief creators, review content before posting, schedule for peak times, and monitor live performance in real time.' },
  { step: '05', title: 'Reporting, Learning & Optimisation', desc: 'After every campaign, you get a full performance report with insights and recommendations to make the next campaign even better.' },
];

const WHY = [
  { title: 'Vetted Creator Network', desc: 'Access to 50,000+ pre-vetted creators across niches. Every influencer in our network has passed our audience authenticity and brand-safety screening.' },
  { title: 'Ecommerce-Specific Expertise', desc: 'We specialise in ecommerce brands — we know what drives product discovery, clicks to product pages, and add-to-cart conversions from social content.' },
  { title: 'Dedicated Campaign Manager', desc: 'Every client gets a dedicated manager who owns the campaign end-to-end. No handoffs, no ticket queues — one person who knows your brand.' },
  { title: 'Transparent Pricing, No Markups', desc: 'We charge a flat management fee. Influencer fees go directly to creators. You always know exactly what your budget is buying.' },
  { title: 'Cross-Platform Mastery', desc: 'From TikTok Shop integrations to YouTube review campaigns to Pinterest idea pins — we run campaigns natively on each platform, not copy-pasted.' },
  { title: 'ROI-First Approach', desc: 'We tie every campaign to measurable outcomes: traffic, conversions, and attributed revenue. If it doesn\'t move the needle, we iterate until it does.' },
];

const FAQS = [
  {
    q: 'What is influencer marketing and how does it work for ecommerce?',
    a: 'Influencer marketing is a form of social media marketing where brands collaborate with creators who have established audiences to promote products or services. For ecommerce, it works by placing your products in front of a creator\'s engaged, trust-based audience — driving product discovery, website traffic, and purchases. Unlike paid ads, the content feels organic because it comes through a voice the audience already follows and trusts. We manage the entire process: strategy, creator selection, campaign execution, and performance reporting.',
  },
  {
    q: 'How much does influencer marketing cost?',
    a: 'Influencer marketing costs vary widely depending on platform, creator tier, and deliverable type. Nano-influencers (under 10K followers) may accept product gifting or charge $50–$500 per post. Micro-influencers (10K–100K) typically charge $500–$5,000. Mid-tier creators (100K–500K) range from $5,000–$20,000, and macro influencers charge $20,000+. Our management fees are separate and transparent. Most ecommerce brands starting out see strong ROI with a $2,000–$10,000/month budget spread across 5–15 micro-influencers. We\'ll recommend the right tier mix for your specific goals.',
  },
  {
    q: 'What\'s the difference between macro-influencers and micro-influencers?',
    a: 'Macro-influencers (500K+ followers) offer massive reach but often lower engagement rates (1–2%) and higher costs. Micro-influencers (10K–100K followers) have smaller audiences but significantly higher engagement rates (3–8%), more niche-specific followers, and greater perceived authenticity — which typically translates to better conversion rates for ecommerce. Most ecommerce brands get better ROI from running 10 micro-influencer campaigns than one macro campaign at the same total cost. We help you find the right balance for your objectives.',
  },
  {
    q: 'How do you find the right influencers for my ecommerce brand?',
    a: 'We use a multi-layer vetting process. First, we filter by niche, platform, and follower size relevant to your product category. Then we analyse audience demographics (age, location, gender) to match your customer profile. We check engagement rate authenticity (filtering fake followers using third-party tools), review past brand collaborations for brand-safety, and assess content quality and aesthetic fit. Only creators who pass all criteria are shortlisted. You review and approve the final list before we reach out.',
  },
  {
    q: 'How long before I see results from an influencer marketing campaign?',
    a: 'Initial campaign results — reach, impressions, engagement, and direct link clicks — are visible within 24–72 hours of content going live. Sales attribution, depending on your product\'s consideration cycle, typically builds over 2–4 weeks as audiences see multiple touchpoints. For brand awareness campaigns, meaningful lift in branded search and direct traffic is usually visible within 30–60 days. We recommend a 3-month minimum commitment to properly measure and optimise influencer marketing performance.',
  },
  {
    q: 'Do you run influencer marketing campaigns for brands in the US, Canada, and Australia?',
    a: 'Yes — this is our primary focus. We\'ve been working with ecommerce brands across the US, Canada, and Australia since 2008. Our creator networks include US, Canadian, and Australian influencers who genuinely speak to those markets. We handle all time-zone coordination, schedule posts during each market\'s peak engagement windows, and understand the cultural nuances that make content resonate locally. We operate fully remotely and are available during your business hours.',
  },
  {
    q: 'How do you measure influencer marketing ROI?',
    a: 'We track ROI through multiple layers: reach and impressions (brand awareness), engagement rate (content effectiveness), link clicks and UTM-tagged traffic (direct response), promo code redemptions (trackable sales), and attributed revenue (via pixel or coupon tracking). We provide monthly reports with all metrics, plus our own assessment of what\'s working, what isn\'t, and what we\'re changing. For brands using Shopify or WooCommerce, we can integrate directly with your analytics for cleaner attribution.',
  },
  {
    q: 'What types of ecommerce products work best with influencer marketing?',
    a: 'Visually driven product categories see the strongest results: fashion and apparel, beauty and skincare, health and wellness, home décor, food and beverage, fitness equipment, baby and parenting products, and pet care. Products with clear visual transformation (before/after) or strong lifestyle association perform especially well on Instagram and TikTok. That said, even B2B and tech products can succeed on YouTube and LinkedIn with the right creator type. During our discovery call, we\'ll assess your product\'s fit and recommend the optimal platform mix.',
  },
];

const STATS = [
  { label: 'Creators in Network', val: '50,000+' },
  { label: 'Campaigns Delivered', val: '300+' },
  { label: 'Average Engagement Rate', val: '4.8%' },
  { label: 'Client Retention', val: '94%' },
];

export default function InfluencerMarketing() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const [visibleServices, setVisibleServices] = useState([]);
  const stepRefs = useRef([]);
  const whyRef = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    const obs = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120);
          o.disconnect();
        }
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
    if (!servicesRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        SERVICES.forEach((_, i) => setTimeout(() => setVisibleServices(p => p.includes(i) ? p : [...p, i]), i * 60));
        o.disconnect();
      }
    }, { threshold: 0.05 });
    o.observe(servicesRef.current);
    return () => o.disconnect();
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Influencer Marketing Services',
        description: 'End-to-end influencer marketing for ecommerce brands. Strategy, creator vetting, campaign execution, and ROI reporting across Instagram, TikTok, YouTube, and more.',
        provider: {
          '@type': 'Organization',
          name: '1Solutions',
          url: 'https://www.1solutions.biz',
          areaServed: ['US', 'CA', 'AU'],
        },
        serviceType: 'Influencer Marketing',
        url: 'https://www.1solutions.biz/influencer-marketing-services/',
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

  return (
    <>
      <Head>
        <title>Influencer Marketing Services | Ecommerce Influencer Agency | 1Solutions</title>
        <meta name="description" content="Result-driven influencer marketing services for ecommerce brands. Expert creator vetting, campaign management & ROI tracking across Instagram, TikTok & YouTube. Serving US, Canada & Australia." />
        <meta name="keywords" content="influencer marketing services, influencer marketing agency, ecommerce influencer marketing, instagram influencer marketing, tiktok influencer marketing, micro influencer marketing" />
        <link rel="canonical" href="https://www.1solutions.biz/influencer-marketing-services/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Influencer Marketing Services for Ecommerce | 1Solutions" />
        <meta property="og:description" content="End-to-end influencer marketing campaigns that drive real ecommerce growth. Strategy, creator discovery, execution & transparent ROI reporting." />
        <meta property="og:url" content="https://www.1solutions.biz/influencer-marketing-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Influencer Marketing Services | 1Solutions" />
        <meta name="twitter:description" content="Ecommerce influencer marketing — strategy to ROI. Instagram, TikTok, YouTube. US, Canada & Australia." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style>{`
          .im-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #0F1F40;
            line-height: 1.6;
            overflow-x: hidden;
          }
          .im-page *, .im-page *::before, .im-page *::after { box-sizing: border-box; }

          /* ── Hero ── */
          .im-hero {
            background: linear-gradient(135deg, #fdf2f8 0%, #ede9fe 30%, #e0f2fe 60%, #fef3c7 100%);
            position: relative;
            overflow: hidden;
            padding: 80px 40px 0;
          }
          .im-hero-orb1 {
            position: absolute; top: -120px; right: -120px;
            width: 600px; height: 600px; border-radius: 50%;
            background: radial-gradient(circle, rgba(190,24,93,0.12) 0%, transparent 65%);
            pointer-events: none; filter: blur(30px);
          }
          .im-hero-orb2 {
            position: absolute; bottom: 0; left: -100px;
            width: 500px; height: 500px; border-radius: 50%;
            background: radial-gradient(circle, rgba(109,40,217,0.10) 0%, transparent 65%);
            pointer-events: none; filter: blur(30px);
          }
          .im-hero-inner {
            max-width: 1280px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            text-align: center;
          }
          .im-breadcrumb {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 24px;
            font-weight: 500;
          }
          .im-breadcrumb a { color: #6b7280; text-decoration: none; }
          .im-breadcrumb a:hover { color: #BE185D; }
          .im-breadcrumb span { color: #d1d5db; }
          .im-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(190,24,93,0.08);
            border: 1px solid rgba(190,24,93,0.18);
            border-radius: 100px;
            padding: 5px 14px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: #BE185D;
            margin-bottom: 28px;
          }
          .im-hero-h1 {
            font-size: clamp(2.2rem, 5vw, 3.6rem);
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: -1px;
            background: linear-gradient(90deg, #0F3460 0%, #BE185D 45%, #7C3AED 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 20px;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
          }
          .im-hero-sub {
            font-size: 1.08rem;
            color: #4A6080;
            line-height: 1.75;
            max-width: 640px;
            margin: 0 auto 36px;
          }
          .im-hero-btns {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 56px;
          }
          .im-btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #0F3460;
            color: #fff;
            padding: 14px 30px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.25s;
            box-shadow: 0 4px 20px rgba(15,52,96,0.25);
          }
          .im-btn-primary:hover {
            background: #BE185D;
            box-shadow: 0 8px 32px rgba(190,24,93,0.30);
            transform: translateY(-2px);
          }
          .im-btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.65);
            backdrop-filter: blur(12px);
            border: 1.5px solid rgba(15,52,96,0.18);
            color: #0F3460;
            padding: 14px 30px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.25s;
          }
          .im-btn-secondary:hover {
            border-color: #BE185D;
            color: #BE185D;
            transform: translateY(-2px);
          }

          /* Stats bar */
          .im-stats-bar {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            max-width: 900px;
            margin: 0 auto;
            background: rgba(255,255,255,0.50);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.85);
            border-radius: 20px 20px 0 0;
            box-shadow: 0 4px 24px rgba(15,52,96,0.08);
          }
          .im-stat {
            padding: 20px 24px;
            text-align: center;
            border-right: 1px solid rgba(15,52,96,0.08);
          }
          .im-stat:last-child { border-right: none; }
          .im-stat-label { font-size: 11px; color: #6b7280; font-weight: 500; margin-bottom: 4px; }
          .im-stat-val { font-size: 1.6rem; font-weight: 900; color: #BE185D; letter-spacing: -0.5px; }

          /* ── Services ── */
          .im-services-section {
            background: #f8fafd;
            padding: 80px 40px;
            box-shadow: 0 -20px 60px rgba(15,52,96,0.10);
          }
          .im-services-inner { max-width: 1280px; margin: 0 auto; }
          .im-section-eyebrow {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #BE185D;
            margin-bottom: 10px;
            display: block;
          }
          .im-section-title {
            font-size: clamp(1.8rem, 4vw, 3rem);
            font-weight: 900;
            line-height: 1.15;
            letter-spacing: -1px;
            background: linear-gradient(90deg, #0F3460 0%, #BE185D 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
          }
          .im-section-desc {
            font-size: 15px;
            color: #4A6080;
            line-height: 1.7;
            max-width: 620px;
            margin-bottom: 44px;
          }
          .im-services-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 14px;
          }
          .im-service-card {
            background: linear-gradient(135deg, rgba(253,242,248,0.60) 0%, rgba(255,255,255,0.85) 60%, rgba(237,233,254,0.40) 100%);
            border: 1px solid rgba(255,255,255,0.85);
            border-radius: 20px;
            padding: 26px 22px 22px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(15,52,96,0.06);
            transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
            opacity: 0;
            transform: translateY(20px);
          }
          .im-service-card.visible {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.22s, border-color 0.22s;
          }
          .im-service-card:hover {
            transform: translateY(-6px);
            border-color: rgba(190,24,93,0.35);
            box-shadow: 0 16px 48px rgba(15,52,96,0.12);
          }
          .im-card-num {
            position: absolute;
            top: 8px; right: 14px;
            font-size: 72px;
            font-weight: 900;
            line-height: 1;
            color: #BE185D;
            opacity: 0.05;
            letter-spacing: -4px;
            pointer-events: none;
            user-select: none;
          }
          .im-service-card h3 {
            font-size: 15px;
            font-weight: 700;
            color: #0F1F40;
            line-height: 1.3;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
          }
          .im-service-card p {
            font-size: 13px;
            color: #4A6080;
            line-height: 1.6;
            position: relative;
            z-index: 1;
            margin: 0;
          }

          /* ── Platforms ── */
          .im-platforms-section {
            background: #fff;
            padding: 70px 40px;
          }
          .im-platforms-inner { max-width: 1280px; margin: 0 auto; }
          .im-platforms-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin-top: 36px;
          }
          .im-platform-pill {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f9fafb;
            border: 1.5px solid #e5e7eb;
            border-radius: 50px;
            padding: 10px 20px 10px 12px;
            font-size: 14px;
            font-weight: 600;
            color: #0F1F40;
            transition: all 0.2s;
          }
          .im-platform-pill:hover {
            border-color: #BE185D;
            background: #fdf2f8;
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(190,24,93,0.12);
          }
          .im-platform-icon {
            width: 32px; height: 32px;
            border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            font-size: 10px; font-weight: 900; color: #fff;
            flex-shrink: 0;
          }

          /* ── Process ── */
          .im-process-section {
            background: linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 50%, #eff6ff 100%);
            padding: 80px 40px;
          }
          .im-process-inner { max-width: 900px; margin: 0 auto; }
          .im-process-steps { display: flex; flex-direction: column; gap: 0; margin-top: 44px; }
          .im-process-step {
            display: grid;
            grid-template-columns: 80px 1fr;
            gap: 24px;
            align-items: flex-start;
            padding: 28px 0;
            border-bottom: 1px solid rgba(190,24,93,0.10);
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.45s ease, transform 0.45s ease;
          }
          .im-process-step:last-child { border-bottom: none; }
          .im-process-step.visible { opacity: 1; transform: translateX(0); }
          .im-step-num {
            font-size: 3rem;
            font-weight: 900;
            color: rgba(190,24,93,0.15);
            line-height: 1;
            letter-spacing: -2px;
          }
          .im-step-body h3 {
            font-size: 1.1rem;
            font-weight: 800;
            color: #0F1F40;
            margin-bottom: 6px;
          }
          .im-step-body p {
            font-size: 0.9rem;
            color: #4A6080;
            line-height: 1.7;
            margin: 0;
          }

          /* ── Why Us ── */
          .im-why-section {
            background: #fff;
            padding: 80px 40px;
          }
          .im-why-inner { max-width: 1280px; margin: 0 auto; }
          .im-why-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 44px;
          }
          .im-why-card {
            background: linear-gradient(135deg, #fdf2f8 0%, #fff 60%, #f5f3ff 100%);
            border: 1px solid rgba(190,24,93,0.10);
            border-radius: 16px;
            padding: 28px;
            opacity: 0;
            transform: translateY(16px);
            transition: opacity 0.4s ease, transform 0.4s ease;
          }
          .im-why-card.visible {
            opacity: 1;
            transform: translateY(0);
          }
          .im-why-card:hover {
            border-color: rgba(190,24,93,0.25);
            box-shadow: 0 8px 32px rgba(190,24,93,0.08);
          }
          .im-why-dot {
            width: 8px; height: 8px;
            border-radius: 50%;
            background: #BE185D;
            margin-bottom: 16px;
          }
          .im-why-card h3 {
            font-size: 1rem;
            font-weight: 800;
            color: #0F1F40;
            margin-bottom: 10px;
          }
          .im-why-card p {
            font-size: 0.88rem;
            color: #4A6080;
            line-height: 1.7;
            margin: 0;
          }

          /* ── FAQs ── */
          .im-faq-section {
            background: #f8fafd;
            padding: 80px 40px;
          }
          .im-faq-inner { max-width: 860px; margin: 0 auto; }
          .im-faq-list { margin-top: 44px; }
          .im-faq-item {
            border-bottom: 1px solid #e5e7eb;
          }
          .im-faq-q {
            width: 100%;
            background: none;
            border: none;
            text-align: left;
            padding: 22px 0;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
            cursor: pointer;
            font-family: inherit;
            font-size: 1rem;
            font-weight: 700;
            color: #0F1F40;
            line-height: 1.4;
          }
          .im-faq-q:hover { color: #BE185D; }
          .im-faq-icon {
            width: 22px; height: 22px;
            border: 2px solid #e5e7eb;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
            font-size: 14px;
            color: #9ca3af;
            transition: all 0.2s;
            margin-top: 2px;
          }
          .im-faq-item.open .im-faq-icon {
            border-color: #BE185D;
            color: #BE185D;
            background: rgba(190,24,93,0.06);
          }
          .im-faq-a {
            font-size: 0.92rem;
            color: #4A6080;
            line-height: 1.8;
            padding-bottom: 22px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.35s ease, padding-bottom 0.35s ease;
          }
          .im-faq-item.open .im-faq-a {
            max-height: 400px;
            padding-bottom: 22px;
          }

          /* ── CTA ── */
          .im-cta-section {
            background: linear-gradient(135deg, rgba(190,24,93,0.06) 0%, rgba(255,255,255,0.80) 40%, rgba(109,40,217,0.05) 100%);
            padding: 90px 40px;
            position: relative;
            overflow: hidden;
          }
          .im-cta-orb1 {
            position: absolute; top: -80px; right: -80px;
            width: 360px; height: 360px; border-radius: 50%;
            background: radial-gradient(circle, rgba(190,24,93,0.10) 0%, transparent 70%);
            pointer-events: none;
          }
          .im-cta-orb2 {
            position: absolute; bottom: -60px; left: -60px;
            width: 280px; height: 280px; border-radius: 50%;
            background: radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 70%);
            pointer-events: none;
          }
          .im-cta-inner {
            max-width: 760px;
            margin: 0 auto;
            text-align: center;
            position: relative;
            z-index: 1;
          }
          .im-cta-title {
            font-size: clamp(1.8rem, 3.5vw, 2.8rem);
            font-weight: 900;
            background: linear-gradient(90deg, #0F3460 0%, #BE185D 50%, #7C3AED 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 16px;
            line-height: 1.2;
          }
          .im-cta-sub {
            font-size: 1.05rem;
            color: #4A6080;
            line-height: 1.75;
            margin: 0 auto 36px;
            max-width: 520px;
          }
          .im-cta-btns {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
          }

          /* ── Responsive ── */
          @media (max-width: 1024px) {
            .im-services-grid { grid-template-columns: repeat(2, 1fr); }
            .im-why-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 768px) {
            .im-hero { padding: 60px 24px 0; }
            .im-services-section, .im-platforms-section, .im-process-section,
            .im-why-section, .im-faq-section, .im-cta-section { padding: 60px 24px; }
            .im-stats-bar { grid-template-columns: repeat(2, 1fr); border-radius: 16px 16px 0 0; }
            .im-stat:nth-child(2) { border-right: none; }
            .im-services-grid { grid-template-columns: 1fr; }
            .im-why-grid { grid-template-columns: 1fr; }
            .im-process-step { grid-template-columns: 56px 1fr; }
            .im-hero-btns { flex-direction: column; align-items: center; }
          }
        `}</style>
      </Head>

      <div className="im-page">

        {/* ── HERO ── */}
        <section className="im-hero">
          <div className="im-hero-orb1" />
          <div className="im-hero-orb2" />
          <div className="im-hero-inner">
            <nav className="im-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span>Ecommerce Solutions</span>
              <span>/</span>
              <span>Ecommerce Marketing</span>
              <span>/</span>
              <span style={{ color: '#BE185D' }}>Influencer Marketing</span>
            </nav>
            <span className="im-eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#BE185D', display: 'inline-block' }} />
              Ecommerce Marketing
            </span>
            <h1 className="im-hero-h1">
              Influencer Marketing Services That Drive Real Ecommerce Growth
            </h1>
            <p className="im-hero-sub">
              We connect ecommerce brands with the right creators — not just the biggest ones. Data-backed influencer campaigns on Instagram, TikTok, YouTube, and more, built for measurable ROI.
            </p>
            <div className="im-hero-btns">
              <Link href="/contact-us" className="im-btn-primary">
                Get a Free Strategy Call
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/case-studies" className="im-btn-secondary">
                View Our Work
              </Link>
            </div>

            {/* Stats bar */}
            <div className="im-stats-bar">
              {STATS.map(s => (
                <div key={s.label} className="im-stat">
                  <div className="im-stat-label">{s.label}</div>
                  <div className="im-stat-val">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="im-services-section">
          <div className="im-services-inner">
            <span className="im-section-eyebrow">What We Do</span>
            <h2 className="im-section-title">Influencer Marketing Services</h2>
            <p className="im-section-desc">
              From strategy and creator discovery to campaign execution and performance reporting — we handle everything so your team doesn&rsquo;t have to.
            </p>
            <div className="im-services-grid" ref={servicesRef}>
              {SERVICES.map((s, i) => (
                <div
                  key={s.n}
                  className={`im-service-card${visibleServices.includes(i) ? ' visible' : ''}`}
                >
                  <div className="im-card-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLATFORMS ── */}
        <section className="im-platforms-section">
          <div className="im-platforms-inner">
            <span className="im-section-eyebrow">Where We Operate</span>
            <h2 className="im-section-title">Platforms We Work With</h2>
            <p className="im-section-desc">
              We run campaigns natively on each platform — not copy-pasted content. Each channel has different content formats, algorithms, and audience behaviours that we optimise for individually.
            </p>
            <div className="im-platforms-grid">
              {PLATFORMS.map(p => (
                <div key={p.name} className="im-platform-pill">
                  <div className="im-platform-icon" style={{ background: p.color }}>
                    {p.icon}
                  </div>
                  {p.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="im-process-section">
          <div className="im-process-inner">
            <span className="im-section-eyebrow">How It Works</span>
            <h2 className="im-section-title">Our Proven Campaign Process</h2>
            <p className="im-section-desc">
              A structured, transparent 5-step process that takes your campaign from brief to measurable results — with zero guesswork.
            </p>
            <div className="im-process-steps">
              {PROCESS.map((p, i) => (
                <div
                  key={p.step}
                  ref={el => { stepRefs.current[i] = el; }}
                  className={`im-process-step${visibleSteps.includes(i) ? ' visible' : ''}`}
                >
                  <div className="im-step-num">{p.step}</div>
                  <div className="im-step-body">
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="im-why-section">
          <div className="im-why-inner">
            <span className="im-section-eyebrow">Why 1Solutions</span>
            <h2 className="im-section-title">Why Ecommerce Brands Choose Us</h2>
            <p className="im-section-desc">
              We&rsquo;re not an influencer marketplace. We&rsquo;re a full-service agency that treats your campaign budget as carefully as our own.
            </p>
            <div className="im-why-grid" ref={whyRef}>
              {WHY.map((w, i) => (
                <div
                  key={w.title}
                  className={`im-why-card${visibleWhy.includes(i) ? ' visible' : ''}`}
                >
                  <div className="im-why-dot" />
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className="im-faq-section">
          <div className="im-faq-inner">
            <span className="im-section-eyebrow">Got Questions?</span>
            <h2 className="im-section-title">Influencer Marketing FAQs</h2>
            <p className="im-section-desc">
              Everything you need to know before starting your first — or next — influencer campaign.
            </p>
            <div className="im-faq-list">
              {FAQS.map((f, i) => (
                <div
                  key={i}
                  className={`im-faq-item${openFaq === i ? ' open' : ''}`}
                >
                  <button
                    className="im-faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    aria-expanded={openFaq === i}
                  >
                    {f.q}
                    <span className="im-faq-icon" aria-hidden="true">
                      {openFaq === i ? '−' : '+'}
                    </span>
                  </button>
                  <div className="im-faq-a" style={openFaq === i ? { maxHeight: 500, paddingBottom: 22 } : {}}>
                    {f.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="im-cta-section">
          <div className="im-cta-orb1" />
          <div className="im-cta-orb2" />
          <div className="im-cta-inner">
            <span className="im-section-eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: 16 }}>
              Start Your Campaign
            </span>
            <h2 className="im-cta-title">
              Ready to Build an Influencer Campaign That Converts?
            </h2>
            <p className="im-cta-sub">
              Book a free 30-minute strategy call. We&rsquo;ll review your brand, recommend the right creator tier and platform mix, and give you a no-obligation campaign outline.
            </p>
            <div className="im-cta-btns">
              <Link href="/contact-us" className="im-btn-primary">
                Book a Free Strategy Call
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/social-media-marketing-services" className="im-btn-secondary">
                Explore Social Media Services
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
