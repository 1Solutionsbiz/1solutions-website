import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const CASE_STUDIES = [
  {
    num: '01',
    label: 'Financial Advisory · WordPress · India',
    title: 'Comtradesol Advisory Services',
    desc: 'Built a professional corporate website for a financial advisory firm specialising in Trade Financing, Debt Advisory, Equity Advisory, and Credit Rating. Paired with a LinkedIn growth programme that expanded brand reach to decision-makers across India\'s financial sector.',
    tags: ['WordPress Development', 'UI/UX Design', 'LinkedIn Marketing'],
    outcomes: [
      { value: '3×', label: 'Organic Traffic Growth' },
      { value: '60%', label: 'Increase in Enquiries' },
      { value: '4 wks', label: 'Delivery Timeline' },
    ],
    image: '/images/portfolio/comtradesol-showcase.jpg',
    url: '/case-studies/comtradesol',
    internal: true,
  },
  {
    num: '02',
    label: 'Media & Journalism · Laravel · India',
    title: 'Ramnath Goenka Excellence in Journalism Awards',
    desc: 'Custom awards portal for India\'s most prestigious journalism honours — run by the Indian Express Group with EY as knowledge partner. Includes a bespoke Laravel CRM managing nominations, jury evaluations, and winner announcements across 14 award categories.',
    tags: ['Custom Development', 'Laravel CRM', 'Portal Design'],
    outcomes: [
      { value: '14', label: 'Award Categories Managed' },
      { value: '100%', label: 'Jury Process Digitalised' },
      { value: '8 wks', label: 'Build & Launch' },
    ],
    image: '/images/portfolio/rngfoundation.webp',
    url: 'https://rngfoundation.com/awards/',
  },
];

const CATEGORIES = ['All', 'Web Development', 'eCommerce', 'Digital Marketing', 'Mobile App', 'UI/UX Design'];

const PROJECTS = [
  { id: 'aiplusstore', title: 'AI+ Store', category: 'eCommerce', industry: 'Consumer Electronics', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Full-featured Shopify store for AI+ SmartPhones — a consumer electronics brand selling Nova series 5G smartphones, NovaPods, and NovaWatches across India.', image: '/images/portfolio/aiplusstore.jpg', url: 'https://aiplusstore.com/', featured: true },
  { id: 'keiyura', title: 'Keiyura', category: 'eCommerce', industry: 'Fashion & Jewellery', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Elegant Shopify store for a handcrafted jewellery brand — featuring lookbooks, curated collections, and a storytelling-led shopping experience.', image: '/images/portfolio/keiyura.jpg', url: 'https://keiyura.com/' },
  { id: 'shopsamsin', title: 'Samsin', category: 'eCommerce', industry: 'Fashion & Apparel', tech: ['Shopify', 'Liquid', 'Email Marketing'], desc: 'Minimalist Shopify store for a streetwear label selling tops, bottoms, and headwear — with VIP subscriber access and flash-sale promotions.', image: '/images/portfolio/shopsamsin.jpg', url: 'https://shopsamsin.com/' },
  { id: '305aero', title: '305 Aero Supplies', category: 'eCommerce', industry: 'Electronics & IT', tech: ['Shopify', 'Liquid', 'eCommerce'], desc: 'Complete IT solutions store offering hardware and software products — a one-stop electronics shop serving clients with end-to-end technology needs.', image: '/images/portfolio/305aerosupplies.jpg', url: 'https://305aerosupplies.com/' },
  { id: 'yaahdy', title: 'Yaahdy Store', category: 'eCommerce', industry: 'Lifestyle & Gifts', tech: ['Shopify', 'Liquid', 'Conversion Optimisation'], desc: 'Vibrant Shopify eCommerce store with a focus on lifestyle products — optimised for fast load times and high-converting product pages.', image: '/images/portfolio/yaahdy.jpg', url: 'https://yaahdy.com/' },
  { id: 'foreverring', title: 'Forever Ring', category: 'eCommerce', industry: 'Fashion & Jewellery', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Sophisticated Shopify store for a Canadian fine jewellery brand — clean product presentation, trust-building pages, and a seamless checkout flow.', image: '/images/portfolio/foreverring.jpg', url: 'https://www.foreverring.ca/' },
  { id: 'parfumfrance', title: 'Parfum France', category: 'eCommerce', industry: 'Beauty & Fragrance', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Premium Shopify fragrance boutique bringing French parfumerie to a global audience — immersive design with rich product storytelling.', image: '/images/portfolio/parfumfrance.jpg', url: 'https://parfumfrance.com/' },
  { id: 'asiandispatch', title: 'Asian Dispatch', category: 'Web Development', industry: 'Media & Journalism', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Digital news network for investigative journalism across 13 Asian countries — covering AI & Tech, Climate, Health, Politics, and Human Rights.', image: '/images/portfolio/asiandispatch.webp', url: 'https://www.asiandispatch.net' },
  { id: 'vns', title: 'VNS Group of Institutions', category: 'Web Development', industry: 'Education', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Comprehensive website for a multi-faculty institution in Bhopal covering Engineering, Pharmacy, Management, Nursing, and Education.', image: '/images/portfolio/vns.webp', url: 'https://vns.ac.in/' },
  { id: 'rngfoundation', title: 'RNG Foundation Awards', category: 'Web Development', industry: 'Media & Journalism', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Award portal for India's most prestigious journalism honours — the Ramnath Goenka Excellence in Journalism Awards, Indian Express Group.", image: '/images/portfolio/rngfoundation.webp', url: 'https://rngfoundation.com/awards/' },
  { id: 'copalcollective', title: 'Copal Collective', category: 'eCommerce', industry: 'Home & Lifestyle', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Artisan Shopify store for handmade throws and textiles — a curated collection of handcrafted home décor pieces with a focus on craftsmanship.', image: '/images/portfolio/copalcollective.webp' },
  { id: 'explorehonor', title: 'Explore HONOR', category: 'eCommerce', industry: 'Consumer Electronics', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Official Shopify eCommerce store for HONOR India — showcasing the full lineup of smartphones, accessories, audio and wearables, and laptops.', image: '/images/portfolio/explorehonor.webp' },
  { id: 'creativeinterior', title: 'Creative Interior & Decor', category: 'Web Development', industry: 'Interior Design', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Business website for a Delhi-based interior design firm — featuring 3D visualisations, transparent pricing, and a 100% satisfaction guarantee.', image: '/images/portfolio/creativeinterior.jpeg' },
  { id: 'expetize', title: 'Expetize', category: 'Web Development', industry: 'SaaS & MarTech', tech: ['Custom Build', 'UI/UX Design'], desc: 'Bulk email verification platform with 10+ validation layers — detecting disposable addresses, catch-all domains, and blacklisted emails.', image: '/images/portfolio/expetize.png' },
  { id: 'astropraveen', title: 'AstroPraveen', category: 'Web Development', industry: 'Wellness & Spirituality', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Personal brand website for Dr. Praveen Chauhan — an Asia Book of Records holder offering horoscope reading, corporate astrology, and palmistry.', image: '/images/portfolio/astropraveen.png' },
  { id: 'defencenewsupdates', title: 'Defence News Updates', category: 'Web Development', industry: 'Defence & Media', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Indian defence and security news portal with dedicated coverage of Army, Navy, Air Force, DRDO programmes, and global military developments.', image: '/images/portfolio/defencenewsupdates.png' },
  { id: 'empor', title: 'Empor Marcom', category: 'Web Development', industry: 'B2B Marketing', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Agency website for a pan-India B2B marketing firm — delivering lead generation, telemarketing, virtual events, and content syndication.', image: '/images/portfolio/empor.png' },
  { id: 'novanttum', title: 'Novanttum', category: 'Web Development', industry: 'Alternative Investments', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Investment platform for Novanttum Alternatives — a SEBI-registered AIF offering private credit, equity, and structured finance.', image: '/images/portfolio/novanttum.png' },
  { id: 'truckinsurancefl', title: 'TruckInsuranceFL', category: 'Web Development', industry: 'Insurance', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Florida's trusted commercial truck insurance specialists — serving owner-operators and fleets with same-day coverage and FMCSA-compliant policies.", image: '/images/portfolio/truckinsurancefl.png' },
  { id: 'aiinnovationsummit', title: 'AI Innovation Summit 2026', category: 'Web Development', industry: 'Technology & Events', tech: ['Next.js', 'UI/UX Design'], desc: 'Event website for the AI Innovation Summit 2026 — a technology conference bringing together industry leaders, researchers, and innovators.', image: '/images/portfolio/aiinnovationsummit.png' },
  { id: 'febestbanksawards', title: 'FE Best Banks Awards', category: 'Web Development', industry: 'Banking & Finance', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Award portal for the Financial Express Best Banks Awards — India's highest honour in banking excellence, with EY as knowledge partner.", image: '/images/portfolio/febestbanksawards.png' },
  { id: 'intellismart', title: 'IntelliSmart Infra', category: 'Web Development', industry: 'Infrastructure', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Corporate website for IntelliSmart Infrastructure — a sustainability-focused company delivering smart infrastructure solutions across India.', image: '/images/portfolio/intellismart.png' },
  { id: 'runaya', title: 'Runaya', category: 'Web Development', industry: 'Manufacturing', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Website for Runaya, India's first zero-waste, zero-discharge aluminium processing facility — recovering 16,000 MT of green aluminium annually.", image: '/images/portfolio/runaya.png' },
  { id: 'freyrenergy', title: 'Freyr Energy', category: 'Web Development', industry: 'Renewable Energy', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Solar solutions website for Freyr Energy — an MNRE-empanelled rooftop solar installer serving 18,000+ customers across India since 2014.', image: '/images/portfolio/freyrenergy.png' },
  { id: 'xcelaccounting', title: 'Xcel Accounting', category: 'Web Development', industry: 'Accounting & Finance', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Professional services website for Xcel Accounting, Dubai — a Xero Gold Partner offering fractional CFO, outsourced accounting, and VAT services.', image: '/images/portfolio/xcelaccounting.png' },
  { id: 'youngmonk', title: 'Young Monk', category: 'Web Development', industry: 'Public Relations', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Agency website for Young Monk — a New Delhi PR and communications firm specialising in Sports, Entertainment, and Change Agents.', image: '/images/portfolio/youngmonk.png' },
  { id: 'greycellpr', title: 'Grey Cell PR', category: 'Web Development', industry: 'Public Relations', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Corporate website for Grey Cell PR — a Delhi-based branding and communications consultancy delivering strategic media relations.', image: '/images/portfolio/greycellpr.png' },
  { id: 'zincfootball', title: 'Zinc Football', category: 'Web Development', industry: 'Sports & Education', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "India's first technology-driven grassroots football initiative — backed by Hindustan Zinc, training 350+ children across Rajasthan.", image: '/images/portfolio/zincfootball.png' },
  { id: 'playaorthodontics', title: 'Playa Orthodontics', category: 'Web Development', industry: 'Healthcare', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Orthodontic clinic website for a Los Angeles practice — showcasing Invisalign, braces, and treatments for all ages with online consultation booking.', image: '/images/portfolio/playaorthodontics.png' },
  { id: 'adiuvo', title: 'Adiuvo Trustees', category: 'Web Development', industry: 'Corporate Services', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Boutique fiduciary services website for Adiuvo Trustees, Cyprus — offering company formation, trust structures, and immigration services to 700+ clients.', image: '/images/portfolio/adiuvo.png' },
  { id: 'phdcci', title: 'PHDCCI', category: 'Web Development', industry: 'Trade & Industry', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Website for PHD Chamber of Commerce and Industry — India's apex industry body with 121+ years of legacy, driving trade promotion and policy advocacy.", image: '/images/portfolio/phdcci.png' },
  { id: 'defenceaviationpost', title: 'Defence Aviation Post', category: 'Web Development', industry: 'Defence & Media', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Defence and military news portal covering Indian Armed Forces, aerospace, missile systems, and global security developments.", image: '/images/portfolio/defenceaviationpost.png' },
  { id: 'throneportapotties', title: 'Throne Porta Potties', category: 'Web Development', industry: 'Sanitation & Events', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Service website for a porta potty rental company — showcasing sanitation solutions for construction sites, events, and outdoor projects.', image: '/images/portfolio/throneportapotties.png' },
  { id: 'recreator', title: 'Recreator', category: 'eCommerce', industry: 'Sustainable Fashion', tech: ['WooCommerce', 'WordPress', 'UI/UX Design'], desc: "Eco-conscious WooCommerce store for a US hemp clothing brand — selling men's and women's sustainable apparel and accessories.", image: '/images/portfolio/recreator.png' },
  { id: 'skinlasercentre', title: 'Skin Laser Centre', category: 'Web Development', industry: 'Healthcare', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Clinical website for Dr. Paul's Skin Laser Centre, Delhi — a 23-year-old dermatology practice specialising in vitiligo, acne, and laser treatments.", image: '/images/portfolio/skinlasercentre.png', url: 'https://skinlasercentre.com/' },
  { id: 'smefutures', title: 'SME Futures', category: 'Web Development', industry: 'Business & Finance', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Editorial and resource platform for small and medium enterprises — covering business news, growth strategies, funding, and industry insights.', image: '/images/portfolio/smefutures.png', url: 'https://smefutures.com/' },
  { id: 'mountsystems', title: 'Mount Systems', category: 'Web Development', industry: 'IT & Security', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Corporate website for Mount Systems — a complete IT and security solutions provider offering end-to-end technology services to businesses.', image: '/images/portfolio/mountsystems.png', url: 'https://www.mount-systems.com.ki/' },
  { id: 'charlespuma', title: 'Charles Puma', category: 'Web Development', industry: 'Art & Culture', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Contemporary pop art gallery website with presence across Toronto, Miami, Berlin, and Florence — showcasing original artworks and limited edition prints.', image: '/images/portfolio/charlespuma.webp', url: 'https://www.charlespuma.com/' },
  { id: 'comtradesol', title: 'Comtradesol', category: 'Web Development', industry: 'Financial Services', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Corporate website for Comtradesol Advisory Services — a Gurgaon-based firm offering trade finance, debt syndication, equity advisory, and credit rating solutions.', image: '/images/portfolio/comtradesol.webp', url: '/case-studies/comtradesol', internal: true },
];

const STATS = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '15+',  label: 'Years in Business' },
  { value: '375+', label: 'Clients Served' },
  { value: '40+',  label: 'Countries Reached' },
];

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <>
      <Head>
        <title>Case Studies | 1Solutions – Real Results for Real Businesses</title>
        <meta name="description" content="Explore how 1Solutions has helped brands across US, Canada & Australia evolve through web development and digital marketing." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/case-studies" />
        <style>{`
          /* ══════════════════════════════════ HERO (original) ══ */
          .cs-hero {
            background: linear-gradient(135deg, rgba(254,243,199,0.55) 0%, rgba(219,234,254,0.35) 100%);
            position: relative; overflow: hidden;
            padding: 100px 0 80px; min-height: 400px; display: flex; align-items: center;
          }
          .cs-hero-orb1 {
            position: absolute; top: -80px; right: -80px; width: 400px; height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(254,151,0,0.13) 0%, transparent 70%);
            pointer-events: none;
          }
          .cs-hero-orb2 {
            position: absolute; bottom: -60px; left: -60px; width: 300px; height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
            pointer-events: none;
          }
          .cs-hero-inner { max-width: 1200px; margin: 0 auto; padding: 0 40px; position: relative; z-index: 1; }
          .cs-eyebrow {
            color: #D97706; font-size: 0.82rem; font-weight: 700;
            letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 20px;
          }
          .cs-hero-title {
            font-size: clamp(2rem, 4vw, 3.25rem); font-weight: 800;
            line-height: 1.2; max-width: 720px; margin-bottom: 24px;
            background: linear-gradient(90deg, #0F3460 0%, #F59E0B 45%, #7C3AED 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          }
          .cs-hero-sub {
            color: #4b5563; font-size: 1.05rem; max-width: 540px;
            margin-bottom: 40px; line-height: 1.75;
          }
          .cs-hero-cta {
            display: inline-flex; align-items: center; gap: 14px;
            background: rgba(15,52,96,0.07); backdrop-filter: blur(12px);
            border: 1.5px solid rgba(15,52,96,0.18); border-radius: 50px;
            padding: 12px 24px 12px 14px; color: #0F3460;
            text-decoration: none; font-size: 0.95rem; font-weight: 600;
            transition: background 0.2s;
          }
          .cs-hero-cta:hover { background: rgba(15,52,96,0.12); }
          .cs-hero-avatars { display: flex; align-items: center; }
          .cs-avatar {
            width: 32px; height: 32px; border-radius: 50%; border: 2.5px solid #fff;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.65rem; font-weight: 800; color: #fff; flex-shrink: 0;
          }

          /* ══════════════════════════════════ STATS STRIP ══ */
          .cs-stats-strip {
            background: #0A1628;
            display: grid; grid-template-columns: repeat(4, 1fr);
          }
          .cs-stat-item {
            padding: 32px 48px;
            border-right: 1px solid rgba(255,255,255,0.07);
          }
          .cs-stat-item:last-child { border-right: none; }
          .cs-stat-value {
            font-size: clamp(1.8rem, 2.2vw, 2.4rem); font-weight: 800;
            color: #fff; letter-spacing: -0.03em; line-height: 1; margin-bottom: 6px;
          }
          .cs-stat-label {
            font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
            text-transform: uppercase; color: rgba(255,255,255,0.4);
          }

          /* ══════════════════════════════════ FEATURED ══ */
          .cs-featured { background: #fff; }
          .cs-featured-header {
            max-width: 1200px; margin: 0 auto; padding: 72px 48px 0;
          }
          .cs-section-kicker {
            font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
            text-transform: uppercase; color: #FE9700; margin-bottom: 10px;
          }
          .cs-section-heading {
            font-size: clamp(1.5rem, 2vw, 1.9rem); font-weight: 800;
            color: #0A1628; letter-spacing: -0.02em; margin-bottom: 8px;
          }
          .cs-section-sub { font-size: 14px; color: #6b7280; max-width: 440px; line-height: 1.6; }

          .cs-case-item {
            max-width: 1200px; margin: 0 auto;
            padding: 72px 48px;
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 80px; align-items: center;
            border-bottom: 1px solid #f0f1f3;
          }
          .cs-case-item:last-child { border-bottom: none; }
          .cs-case-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
          .cs-case-num {
            width: 34px; height: 34px; border-radius: 6px;
            background: #0A1628; color: #fff;
            display: flex; align-items: center; justify-content: center;
            font-size: 11px; font-weight: 800; letter-spacing: 0.04em; flex-shrink: 0;
          }
          .cs-case-meta-label {
            font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
            text-transform: uppercase; color: #9ca3af;
          }
          .cs-case-title {
            font-size: clamp(1.4rem, 2vw, 1.9rem); font-weight: 800;
            color: #0A1628; line-height: 1.2; margin-bottom: 14px;
            letter-spacing: -0.02em;
          }
          .cs-case-desc {
            font-size: 15px; color: #4b5563; line-height: 1.8; margin-bottom: 24px;
          }
          .cs-case-outcomes {
            display: flex; gap: 28px; padding: 20px 0;
            border-top: 1px solid #f0f1f3; border-bottom: 1px solid #f0f1f3;
            margin-bottom: 24px;
          }
          .cs-case-outcome-val {
            font-size: 1.65rem; font-weight: 800; color: #0A1628;
            letter-spacing: -0.03em; line-height: 1; margin-bottom: 4px;
          }
          .cs-case-outcome-lbl {
            font-size: 10px; font-weight: 700; color: #9ca3af;
            letter-spacing: 0.08em; text-transform: uppercase;
          }
          .cs-case-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 26px; }
          .cs-case-tag {
            font-size: 11px; font-weight: 600; padding: 5px 12px;
            border-radius: 4px; background: #f3f4f6; color: #374151;
            border: 1px solid #e5e7eb;
          }
          .cs-case-link {
            display: inline-flex; align-items: center; gap: 8px;
            font-size: 13px; font-weight: 700; color: #0A1628;
            text-decoration: none; border-bottom: 2px solid #FE9700;
            padding-bottom: 2px; width: fit-content;
            transition: color 0.2s;
          }
          .cs-case-link:hover { color: #FE9700; }
          .cs-case-visual {
            border-radius: 10px; overflow: hidden;
            box-shadow:
              0 0 0 1px rgba(0,0,0,0.06),
              0 24px 64px rgba(0,0,0,0.1),
              0 4px 16px rgba(0,0,0,0.05);
          }
          .cs-case-visual img {
            width: 100%; display: block; aspect-ratio: 16/9; object-fit: cover;
          }
          .cs-case-item.rev .cs-case-text { order: 2; }
          .cs-case-item.rev .cs-case-visual { order: 1; }

          /* ══════════════════════════════════ PROJECTS ══ */
          .cs-projects { background: #F7F8FA; padding: 80px 0 96px; }
          .cs-projects-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
          .cs-projects-header { margin-bottom: 32px; }

          .cs-filter-tabs {
            display: flex; border-bottom: 1px solid #e5e7eb;
            overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
          }
          .cs-filter-tabs::-webkit-scrollbar { display: none; }
          .cs-filter-tab {
            padding: 12px 22px; font-size: 13px; font-weight: 600;
            color: #6b7280; background: none; border: none;
            border-bottom: 2px solid transparent; cursor: pointer;
            white-space: nowrap; margin-bottom: -1px;
            transition: color 0.18s, border-color 0.18s;
          }
          .cs-filter-tab:hover { color: #0A1628; }
          .cs-filter-tab.active { color: #0A1628; border-bottom-color: #FE9700; }

          .cs-proj-meta { margin: 24px 0; }
          .cs-proj-count { font-size: 13px; color: #9ca3af; }
          .cs-proj-count strong { color: #374151; font-weight: 700; }

          .cs-proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .cs-proj-card {
            background: #fff; border-radius: 8px; border: 1px solid #e5e7eb;
            overflow: hidden; display: flex; flex-direction: column;
            transition: box-shadow 0.2s, transform 0.2s;
          }
          .cs-proj-card:hover {
            box-shadow: 0 8px 32px rgba(10,22,40,0.1), 0 0 0 1px rgba(10,22,40,0.06);
            transform: translateY(-2px);
          }
          .cs-proj-thumb {
            position: relative; aspect-ratio: 16/9;
            overflow: hidden; background: #f3f4f6;
          }
          .cs-proj-thumb img {
            width: 100%; height: 100%; object-fit: cover; display: block;
            transition: transform 0.4s ease;
          }
          .cs-proj-card:hover .cs-proj-thumb img { transform: scale(1.04); }
          .cs-proj-cat-badge {
            position: absolute; bottom: 10px; left: 10px;
            background: #0A1628; color: #fff;
            font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
            text-transform: uppercase; padding: 4px 10px; border-radius: 4px;
          }
          .cs-proj-featured-badge {
            position: absolute; top: 10px; right: 10px;
            background: #FE9700; color: #fff;
            font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
            text-transform: uppercase; padding: 3px 9px; border-radius: 4px;
          }
          .cs-proj-body { padding: 20px 22px 22px; flex: 1; display: flex; flex-direction: column; }
          .cs-proj-industry {
            font-size: 10px; font-weight: 700; text-transform: uppercase;
            letter-spacing: 0.12em; color: #9ca3af; margin-bottom: 6px;
          }
          .cs-proj-name {
            font-size: 15px; font-weight: 700; color: #0A1628;
            line-height: 1.3; margin-bottom: 8px;
          }
          .cs-proj-desc {
            font-size: 13px; color: #6b7280; line-height: 1.65;
            margin-bottom: 14px; flex: 1;
            display: -webkit-box; -webkit-line-clamp: 2;
            -webkit-box-orient: vertical; overflow: hidden;
          }
          .cs-proj-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 14px; }
          .cs-proj-tag {
            font-size: 11px; font-weight: 600; padding: 3px 9px;
            background: #f3f4f6; color: #6b7280;
            border: 1px solid #e5e7eb; border-radius: 4px;
          }
          .cs-proj-link {
            display: inline-flex; align-items: center; gap: 5px;
            font-size: 12px; font-weight: 700; color: #0A1628;
            text-decoration: none; margin-top: auto;
            transition: color 0.18s;
          }
          .cs-proj-link:hover { color: #FE9700; }

          /* ══════════════════════════════════ CTA ══ */
          .cs-cta {
            background: #0A1628; padding: 96px 48px;
            position: relative; overflow: hidden;
          }
          .cs-cta-grid {
            position: absolute; inset: 0; pointer-events: none;
            background-image:
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
            background-size: 60px 60px;
          }
          .cs-cta-inner {
            max-width: 680px; margin: 0 auto; text-align: center;
            position: relative; z-index: 1;
          }
          .cs-cta-kicker {
            font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
            text-transform: uppercase; color: #FE9700; margin-bottom: 18px;
          }
          .cs-cta-title {
            font-size: clamp(2rem, 3.2vw, 2.8rem); font-weight: 800;
            color: #fff; letter-spacing: -0.025em; line-height: 1.15;
            margin-bottom: 18px;
          }
          .cs-cta-sub {
            font-size: 16px; color: rgba(255,255,255,0.48);
            line-height: 1.8; margin: 0 auto 40px; max-width: 460px;
          }
          .cs-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
          .cs-cta-btn-primary {
            display: inline-flex; align-items: center; gap: 10px;
            background: #FE9700; color: #fff; padding: 14px 28px; border-radius: 6px;
            font-size: 14px; font-weight: 700; text-decoration: none;
            transition: background 0.2s;
          }
          .cs-cta-btn-primary:hover { background: #e08600; }
          .cs-cta-btn-secondary {
            display: inline-flex; align-items: center; gap: 10px;
            color: rgba(255,255,255,0.65); padding: 14px 28px; border-radius: 6px;
            font-size: 14px; font-weight: 700; text-decoration: none;
            border: 1.5px solid rgba(255,255,255,0.14);
            transition: border-color 0.2s, color 0.2s;
          }
          .cs-cta-btn-secondary:hover { border-color: rgba(255,255,255,0.4); color: #fff; }

          /* ══════════════════════════════════ RESPONSIVE ══ */
          @media (max-width: 1024px) {
            .cs-proj-grid { grid-template-columns: repeat(2, 1fr); }
            .cs-stats-strip { grid-template-columns: repeat(2, 1fr); }
            .cs-stat-item:nth-child(2) { border-right: none; }
            .cs-stat-item:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.07); }
            .cs-stat-item:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.07); border-right: none; }
          }
          @media (max-width: 860px) {
            .cs-hero-inner, .cs-featured-header, .cs-projects-inner { padding-left: 24px; padding-right: 24px; }
            .cs-case-item { grid-template-columns: 1fr; gap: 36px; padding: 56px 24px; }
            .cs-case-item.rev .cs-case-text { order: 0; }
            .cs-case-item.rev .cs-case-visual { order: 0; }
            .cs-cta { padding: 72px 24px; }
            .cs-stat-item { padding: 24px 32px; }
          }
          @media (max-width: 600px) {
            .cs-proj-grid { grid-template-columns: 1fr; }
            .cs-projects { padding: 56px 0 64px; }
            .cs-case-outcomes { flex-wrap: wrap; gap: 20px; }
            .cs-stats-strip { grid-template-columns: 1fr 1fr; }
          }
        `}</style>
      </Head>

      {/* ── HERO (original light gradient) ── */}
      <section className="cs-hero">
        <div className="cs-hero-orb1" />
        <div className="cs-hero-orb2" />
        <div className="cs-hero-inner">
          <p className="cs-eyebrow">Our Work</p>
          <h1 className="cs-hero-title">
            See how we&rsquo;ve helped brands evolve and thrive in this ever-changing world
          </h1>
          <p className="cs-hero-sub">
            15+ years of delivering measurable results for clients across US, Canada, Australia and beyond.
          </p>
          <a href="/contact-us" className="cs-hero-cta">
            <span className="cs-hero-avatars">
              {[
                { initials: 'AT', bg: '#FE9700' },
                { initials: 'RK', bg: '#0F3460' },
                { initials: 'PS', bg: '#7C3AED' },
                { initials: 'MJ', bg: '#10B981' },
              ].map((av, i) => (
                <span key={i} className="cs-avatar" style={{ background: av.bg, marginLeft: i === 0 ? 0 : -10 }}>
                  {av.initials}
                </span>
              ))}
            </span>
            Connect with Experts
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="cs-stats-strip">
        {STATS.map(s => (
          <div key={s.label} className="cs-stat-item">
            <div className="cs-stat-value">{s.value}</div>
            <div className="cs-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURED CASE STUDIES ── */}
      <div className="cs-featured">
        <div className="cs-featured-header">
          <p className="cs-section-kicker">Featured Case Studies</p>
          <h2 className="cs-section-heading">Deep dives into complex challenges</h2>
          <p className="cs-section-sub">Selected engagements where strategy, design, and engineering converged to move the needle.</p>
        </div>

        {CASE_STUDIES.map((cs, i) => (
          <div key={cs.num} className={`cs-case-item${i % 2 === 1 ? ' rev' : ''}`}>
            <div className="cs-case-text">
              <div className="cs-case-meta">
                <div className="cs-case-num">{cs.num}</div>
                <div className="cs-case-meta-label">{cs.label}</div>
              </div>
              <h2 className="cs-case-title">{cs.title}</h2>
              <p className="cs-case-desc">{cs.desc}</p>
              <div className="cs-case-outcomes">
                {cs.outcomes.map(o => (
                  <div key={o.label}>
                    <div className="cs-case-outcome-val">{o.value}</div>
                    <div className="cs-case-outcome-lbl">{o.label}</div>
                  </div>
                ))}
              </div>
              <div className="cs-case-tags">
                {cs.tags.map(tag => (
                  <span key={tag} className="cs-case-tag">{tag}</span>
                ))}
              </div>
              {cs.url && (
                cs.internal ? (
                  <Link href={cs.url} className="cs-case-link">
                    Read Full Case Study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                ) : (
                  <a href={cs.url} target="_blank" rel="noopener noreferrer" className="cs-case-link">
                    View Project
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                  </a>
                )
              )}
            </div>
            <div className="cs-case-visual">
              <img src={cs.image} alt={cs.title} loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
          </div>
        ))}
      </div>

      {/* ── ALL PROJECTS ── */}
      <div className="cs-projects">
        <div className="cs-projects-inner">
          <div className="cs-projects-header">
            <p className="cs-section-kicker">Our Portfolio</p>
            <h2 className="cs-section-heading">All Projects</h2>
            <p className="cs-section-sub" style={{ marginTop: 8 }}>A selection of work spanning web development, eCommerce, and digital marketing.</p>
          </div>

          <div className="cs-filter-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cs-filter-tab${activeFilter === cat ? ' active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="cs-proj-meta">
            <p className="cs-proj-count">
              Showing <strong>{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
              {activeFilter !== 'All' ? ` · ${activeFilter}` : ''}
            </p>
          </div>

          <div className="cs-proj-grid">
            {filtered.map((p, i) => (
              <div key={p.id} className="cs-proj-card">
                <div className="cs-proj-thumb">
                  <img src={p.image} alt={p.title} loading={i < 6 ? 'eager' : 'lazy'} />
                  {p.featured && <span className="cs-proj-featured-badge">Featured</span>}
                  <span className="cs-proj-cat-badge">{p.category}</span>
                </div>
                <div className="cs-proj-body">
                  <div className="cs-proj-industry">{p.industry}</div>
                  <h3 className="cs-proj-name">{p.title}</h3>
                  <p className="cs-proj-desc">{p.desc}</p>
                  <div className="cs-proj-tags">
                    {p.tech.map(t => (
                      <span key={t} className="cs-proj-tag">{t}</span>
                    ))}
                  </div>
                  {p.url && (
                    p.internal ? (
                      <Link href={p.url} className="cs-proj-link">
                        Read Case Study
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                    ) : (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="cs-proj-link">
                        View Live Site
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                      </a>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="cs-cta">
        <div className="cs-cta-grid" />
        <div className="cs-cta-inner">
          <p className="cs-cta-kicker">Let&rsquo;s Work Together</p>
          <h2 className="cs-cta-title">Ready to build your success story?</h2>
          <p className="cs-cta-sub">
            Tell us about your project. We&rsquo;ll bring strategy, design, and engineering to make it happen.
          </p>
          <div className="cs-cta-btns">
            <Link href="/contact-us" className="cs-cta-btn-primary">
              Start a Project
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/portfolio" className="cs-cta-btn-secondary">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
