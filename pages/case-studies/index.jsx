import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const CASE_STUDIES = [
  {
    num: '01',
    category: 'Financial Advisory',
    stack: 'WordPress · LinkedIn · India',
    title: 'Comtradesol Advisory Services',
    desc: 'Built a corporate identity and web presence for a financial advisory firm specialising in Trade Financing, Debt Advisory, and Credit Rating — then grew their professional reach through a targeted LinkedIn brand programme.',
    tags: ['WordPress Development', 'UI/UX Design', 'LinkedIn Marketing'],
    outcomes: [
      { value: '3×', label: 'Organic Traffic' },
      { value: '60%', label: 'More Enquiries' },
      { value: '4 wks', label: 'Delivery' },
    ],
    image: '/images/portfolio/comtradesol-showcase.jpg',
    url: '/case-studies/comtradesol',
    internal: true,
  },
  {
    num: '02',
    category: 'Media & Journalism',
    stack: 'Laravel · WordPress · India',
    title: 'Ramnath Goenka Excellence in Journalism Awards',
    desc: 'Custom awards portal and bespoke Laravel CRM for India\'s most prestigious journalism honours — run by the Indian Express Group with EY as knowledge partner across 14 award categories.',
    tags: ['Custom Development', 'Laravel CRM', 'Portal Design'],
    outcomes: [
      { value: '14', label: 'Award Categories' },
      { value: '100%', label: 'Process Digitalised' },
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
  { id: '305aero', title: '305 Aero Supplies', category: 'eCommerce', industry: 'Electronics & IT', tech: ['Shopify', 'Liquid', 'eCommerce'], desc: 'Complete IT solutions store offering hardware and software products for end-to-end technology needs.', image: '/images/portfolio/305aerosupplies.jpg', url: 'https://305aerosupplies.com/' },
  { id: 'yaahdy', title: 'Yaahdy Store', category: 'eCommerce', industry: 'Lifestyle & Gifts', tech: ['Shopify', 'Liquid', 'Conversion Optimisation'], desc: 'Vibrant Shopify eCommerce store optimised for fast load times and high-converting product pages.', image: '/images/portfolio/yaahdy.jpg', url: 'https://yaahdy.com/' },
  { id: 'foreverring', title: 'Forever Ring', category: 'eCommerce', industry: 'Fashion & Jewellery', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Sophisticated Shopify store for a Canadian fine jewellery brand — clean product presentation and seamless checkout.', image: '/images/portfolio/foreverring.jpg', url: 'https://www.foreverring.ca/' },
  { id: 'parfumfrance', title: 'Parfum France', category: 'eCommerce', industry: 'Beauty & Fragrance', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Premium Shopify fragrance boutique bringing French parfumerie to a global audience with rich product storytelling.', image: '/images/portfolio/parfumfrance.jpg', url: 'https://parfumfrance.com/' },
  { id: 'asiandispatch', title: 'Asian Dispatch', category: 'Web Development', industry: 'Media & Journalism', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Digital news network for investigative journalism across 13 Asian countries with a 21-member contributor network.', image: '/images/portfolio/asiandispatch.webp', url: 'https://www.asiandispatch.net' },
  { id: 'vns', title: 'VNS Group of Institutions', category: 'Web Development', industry: 'Education', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Multi-faculty institution website covering Engineering, Pharmacy, Management, Nursing, and Education.', image: '/images/portfolio/vns.webp', url: 'https://vns.ac.in/' },
  { id: 'rngfoundation', title: 'RNG Foundation Awards', category: 'Web Development', industry: 'Media & Journalism', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Award portal for India's most prestigious journalism honours — 14 categories, Indian Express Group.", image: '/images/portfolio/rngfoundation.webp', url: 'https://rngfoundation.com/awards/' },
  { id: 'copalcollective', title: 'Copal Collective', category: 'eCommerce', industry: 'Home & Lifestyle', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Artisan Shopify store for handmade throws and textiles with a focus on craftsmanship and natural materials.', image: '/images/portfolio/copalcollective.webp' },
  { id: 'explorehonor', title: 'Explore HONOR', category: 'eCommerce', industry: 'Consumer Electronics', tech: ['Shopify', 'Liquid', 'UI/UX Design'], desc: 'Official Shopify store for HONOR India — smartphones, accessories, audio, wearables, and laptops.', image: '/images/portfolio/explorehonor.webp' },
  { id: 'creativeinterior', title: 'Creative Interior & Decor', category: 'Web Development', industry: 'Interior Design', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Interior design firm website featuring 3D visualisations, transparent pricing, and a satisfaction guarantee.', image: '/images/portfolio/creativeinterior.jpeg' },
  { id: 'expetize', title: 'Expetize', category: 'Web Development', industry: 'SaaS & MarTech', tech: ['Custom Build', 'UI/UX Design'], desc: 'Bulk email verification platform with 10+ validation layers — used by teams at Salesforce, HubSpot, and Apollo.', image: '/images/portfolio/expetize.png' },
  { id: 'astropraveen', title: 'AstroPraveen', category: 'Web Development', industry: 'Wellness & Spirituality', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Personal brand website for an Asia Book of Records holder offering horoscope reading and corporate astrology.', image: '/images/portfolio/astropraveen.png' },
  { id: 'defencenewsupdates', title: 'Defence News Updates', category: 'Web Development', industry: 'Defence & Media', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Defence and security news portal covering Army, Navy, Air Force, and DRDO programmes across India.', image: '/images/portfolio/defencenewsupdates.png' },
  { id: 'empor', title: 'Empor Marcom', category: 'Web Development', industry: 'B2B Marketing', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Pan-India B2B marketing firm delivering lead generation, virtual events, and content syndication for enterprises.', image: '/images/portfolio/empor.png' },
  { id: 'novanttum', title: 'Novanttum', category: 'Web Development', industry: 'Alternative Investments', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'SEBI-registered AIF platform offering private credit, equity, and structured finance solutions.', image: '/images/portfolio/novanttum.png' },
  { id: 'truckinsurancefl', title: 'TruckInsuranceFL', category: 'Web Development', industry: 'Insurance', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Florida's commercial truck insurance specialists — same-day coverage and FMCSA-compliant policies.", image: '/images/portfolio/truckinsurancefl.png' },
  { id: 'aiinnovationsummit', title: 'AI Innovation Summit 2026', category: 'Web Development', industry: 'Technology & Events', tech: ['Next.js', 'UI/UX Design'], desc: 'Event website for a technology conference bringing together industry leaders, researchers, and innovators.', image: '/images/portfolio/aiinnovationsummit.png' },
  { id: 'febestbanksawards', title: 'FE Best Banks Awards', category: 'Web Development', industry: 'Banking & Finance', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Award portal for the Financial Express Best Banks Awards — banking excellence recognition with EY.", image: '/images/portfolio/febestbanksawards.png' },
  { id: 'intellismart', title: 'IntelliSmart Infra', category: 'Web Development', industry: 'Infrastructure', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Smart infrastructure corporate website delivering sustainability-focused solutions across India.', image: '/images/portfolio/intellismart.png' },
  { id: 'runaya', title: 'Runaya', category: 'Web Development', industry: 'Manufacturing', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "India's first zero-waste, zero-discharge aluminium processing facility — 16,000 MT recovered annually.", image: '/images/portfolio/runaya.png' },
  { id: 'freyrenergy', title: 'Freyr Energy', category: 'Web Development', industry: 'Renewable Energy', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Rooftop solar solutions website for an MNRE-empanelled installer serving 18,000+ customers since 2014.', image: '/images/portfolio/freyrenergy.png' },
  { id: 'xcelaccounting', title: 'Xcel Accounting', category: 'Web Development', industry: 'Accounting & Finance', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Xero Gold Partner website in Dubai — fractional CFO, outsourced accounting, and VAT services across the UAE.', image: '/images/portfolio/xcelaccounting.png' },
  { id: 'youngmonk', title: 'Young Monk', category: 'Web Development', industry: 'Public Relations', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'PR and communications agency website specialising in Sports, Entertainment, and Change Agents.', image: '/images/portfolio/youngmonk.png' },
  { id: 'greycellpr', title: 'Grey Cell PR', category: 'Web Development', industry: 'Public Relations', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Branding and communications consultancy delivering strategic media relations and corporate brand management.', image: '/images/portfolio/greycellpr.png' },
  { id: 'zincfootball', title: 'Zinc Football', category: 'Web Development', industry: 'Sports & Education', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "India's first technology-driven grassroots football initiative backed by Hindustan Zinc.", image: '/images/portfolio/zincfootball.png' },
  { id: 'playaorthodontics', title: 'Playa Orthodontics', category: 'Web Development', industry: 'Healthcare', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Los Angeles orthodontic clinic website — Invisalign, braces, and online consultation booking.', image: '/images/portfolio/playaorthodontics.png' },
  { id: 'adiuvo', title: 'Adiuvo Trustees', category: 'Web Development', industry: 'Corporate Services', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Fiduciary services website in Cyprus — company formation, trust structures, and immigration for 700+ clients.', image: '/images/portfolio/adiuvo.png' },
  { id: 'phdcci', title: 'PHDCCI', category: 'Web Development', industry: 'Trade & Industry', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "India's apex industry body — 121+ years of legacy in trade promotion and policy advocacy.", image: '/images/portfolio/phdcci.png' },
  { id: 'defenceaviationpost', title: 'Defence Aviation Post', category: 'Web Development', industry: 'Defence & Media', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "Defence and military news portal covering aerospace, missile systems, and global security.", image: '/images/portfolio/defenceaviationpost.png' },
  { id: 'throneportapotties', title: 'Throne Porta Potties', category: 'Web Development', industry: 'Sanitation & Events', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Porta potty rental website for construction sites, events, and outdoor projects.', image: '/images/portfolio/throneportapotties.png' },
  { id: 'recreator', title: 'Recreator', category: 'eCommerce', industry: 'Sustainable Fashion', tech: ['WooCommerce', 'WordPress', 'UI/UX Design'], desc: "Eco-conscious WooCommerce store for a US hemp clothing brand — sustainable apparel and accessories.", image: '/images/portfolio/recreator.png' },
  { id: 'skinlasercentre', title: 'Skin Laser Centre', category: 'Web Development', industry: 'Healthcare', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: "23-year-old Delhi dermatology practice — vitiligo, acne, hair transplants, and laser treatments.", image: '/images/portfolio/skinlasercentre.png', url: 'https://skinlasercentre.com/' },
  { id: 'smefutures', title: 'SME Futures', category: 'Web Development', industry: 'Business & Finance', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Editorial platform for SMEs covering business news, growth strategies, funding, and insights.', image: '/images/portfolio/smefutures.png', url: 'https://smefutures.com/' },
  { id: 'mountsystems', title: 'Mount Systems', category: 'Web Development', industry: 'IT & Security', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'End-to-end IT and security solutions provider corporate website.', image: '/images/portfolio/mountsystems.png', url: 'https://www.mount-systems.com.ki/' },
  { id: 'charlespuma', title: 'Charles Puma', category: 'Web Development', industry: 'Art & Culture', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Contemporary pop art gallery across Toronto, Miami, Berlin, and Florence — original artworks and prints.', image: '/images/portfolio/charlespuma.webp', url: 'https://www.charlespuma.com/' },
  { id: 'comtradesol', title: 'Comtradesol', category: 'Web Development', industry: 'Financial Services', tech: ['WordPress', 'Custom Theme', 'UI/UX Design'], desc: 'Trade finance, debt syndication, equity advisory, and credit rating corporate website.', image: '/images/portfolio/comtradesol.webp', url: '/case-studies/comtradesol', internal: true },
];

const STATS = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '15+',  label: 'Years in Business'  },
  { value: '375+', label: 'Clients Served'      },
  { value: '40+',  label: 'Countries Reached'   },
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

/* ═══════════════════════════════════════════ HERO (original, untouched) ══ */
.cs-hero {
  background: linear-gradient(135deg,rgba(254,243,199,.55) 0%,rgba(219,234,254,.35) 100%);
  position:relative; overflow:hidden;
  padding:100px 0 80px; min-height:400px; display:flex; align-items:center;
}
.cs-hero-orb1{position:absolute;top:-80px;right:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(254,151,0,.13) 0%,transparent 70%);pointer-events:none;}
.cs-hero-orb2{position:absolute;bottom:-60px;left:-60px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,.08) 0%,transparent 70%);pointer-events:none;}
.cs-hero-inner{max-width:1200px;margin:0 auto;padding:0 40px;position:relative;z-index:1;}
.cs-eyebrow{color:#D97706;font-size:.82rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:20px;}
.cs-hero-title{font-size:clamp(2rem,4vw,3.25rem);font-weight:800;line-height:1.2;max-width:720px;margin-bottom:24px;background:linear-gradient(90deg,#0F3460 0%,#F59E0B 45%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.cs-hero-sub{color:#4b5563;font-size:1.05rem;max-width:540px;margin-bottom:40px;line-height:1.75;}
.cs-hero-cta{display:inline-flex;align-items:center;gap:14px;background:rgba(15,52,96,.07);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,.18);border-radius:50px;padding:12px 24px 12px 14px;color:#0F3460;text-decoration:none;font-size:.95rem;font-weight:600;}
.cs-hero-avatars{display:flex;align-items:center;}
.cs-avatar{width:32px;height:32px;border-radius:50%;border:2.5px solid #fff;display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:800;color:#fff;flex-shrink:0;}

/* ═══════════════════════════════════════════ METRICS BAR ══ */
.cs-metrics {
  display: grid; grid-template-columns: repeat(4,1fr);
  border-top: 1px solid #e8eaed; border-bottom: 1px solid #e8eaed;
  background: #fff;
}
.cs-metric {
  padding: 28px 40px;
  border-right: 1px solid #e8eaed;
  display: flex; align-items: center; gap: 16px;
}
.cs-metric:last-child { border-right: none; }
.cs-metric-val {
  font-size: 2rem; font-weight: 800; color: #0A1628;
  letter-spacing: -0.04em; line-height: 1; white-space: nowrap;
}
.cs-metric-lbl {
  font-size: 12px; font-weight: 600; color: #9ca3af;
  letter-spacing: 0.06em; text-transform: uppercase; line-height: 1.4;
}
.cs-metric-sep {
  width: 3px; height: 36px; border-radius: 2px;
  background: linear-gradient(180deg,#FE9700,#0F3460);
  flex-shrink: 0;
}

/* ═══════════════════════════════════════════ FEATURED ══ */
.cs-featured { background: #fff; padding-bottom: 16px; }

.cs-featured-intro {
  max-width: 1200px; margin: 0 auto;
  padding: 72px 48px 0;
  display: flex; align-items: flex-end; justify-content: space-between; gap: 24px;
}
.cs-fi-kicker {
  font-size: 11px; font-weight: 700; letter-spacing: .2em;
  text-transform: uppercase; color: #FE9700; margin-bottom: 10px;
}
.cs-fi-title {
  font-size: clamp(1.5rem,2vw,1.9rem); font-weight: 800;
  color: #0A1628; letter-spacing: -.02em;
}
.cs-fi-sub { font-size: 14px; color: #6b7280; margin-top: 8px; max-width: 380px; line-height: 1.6; }
.cs-fi-count {
  font-size: 4.5rem; font-weight: 900; color: #f3f4f6;
  letter-spacing: -.04em; line-height: 1; flex-shrink: 0;
  user-select: none;
}

/* Each case study block */
.cs-block {
  max-width: 1200px; margin: 0 auto;
  padding: 64px 48px 72px;
  border-top: 1px solid #f0f1f3;
}
.cs-block-top {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 6px; gap: 24px;
}
.cs-block-label {
  display: flex; align-items: center; gap: 12px;
}
.cs-block-num {
  font-size: 10px; font-weight: 800; letter-spacing: .16em;
  background: #0A1628; color: #fff;
  padding: 5px 10px; border-radius: 4px;
}
.cs-block-cat {
  font-size: 11px; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; color: #6b7280;
}
.cs-block-stack {
  font-size: 11px; font-weight: 600; color: #c4c9d4;
  letter-spacing: 0.06em;
}
.cs-block-rule {
  height: 2px; background: #f0f1f3; margin: 16px 0 32px;
  position: relative;
}
.cs-block-rule::before {
  content: ''; position: absolute; left: 0; top: 0;
  height: 2px; width: 60px; background: #FE9700;
}
.cs-block-body {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 80px; align-items: start; margin-bottom: 36px;
}
.cs-block-title {
  font-size: clamp(1.6rem,2.4vw,2.2rem); font-weight: 800;
  color: #0A1628; letter-spacing: -.025em; line-height: 1.2;
  margin-bottom: 16px;
}
.cs-block-desc {
  font-size: 15px; color: #4b5563; line-height: 1.85; margin-bottom: 0;
}
.cs-block-right {}
.cs-block-outcomes {
  display: flex; gap: 0; margin-bottom: 24px;
  border: 1px solid #e8eaed; border-radius: 8px; overflow: hidden;
}
.cs-block-outcome {
  flex: 1; padding: 20px 22px;
  border-right: 1px solid #e8eaed;
}
.cs-block-outcome:last-child { border-right: none; }
.cs-block-outcome-val {
  font-size: 1.9rem; font-weight: 800; color: #0A1628;
  letter-spacing: -.04em; line-height: 1; margin-bottom: 5px;
}
.cs-block-outcome-lbl {
  font-size: 10px; font-weight: 700; color: #9ca3af;
  letter-spacing: .1em; text-transform: uppercase;
}
.cs-block-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px; }
.cs-block-tag {
  font-size: 11px; font-weight: 600; padding: 5px 12px;
  border-radius: 4px; background: #f7f8fa; color: #374151;
  border: 1px solid #e5e7eb;
}
.cs-block-link {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 700; color: #0A1628;
  text-decoration: none; border-bottom: 2px solid #FE9700;
  padding-bottom: 2px; width: fit-content; transition: color .2s;
}
.cs-block-link:hover { color: #FE9700; }

/* Cinematic image */
.cs-block-image {
  border-radius: 10px; overflow: hidden;
  box-shadow: 0 0 0 1px rgba(0,0,0,.06), 0 24px 64px rgba(0,0,0,.1);
}
.cs-block-image img {
  width: 100%; display: block;
  aspect-ratio: 21/9; object-fit: cover;
}

/* ═══════════════════════════════════════════ PROJECTS ══ */
.cs-projects { background: #F4F5F7; padding: 80px 0 96px; }
.cs-projects-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; }
.cs-projects-head { margin-bottom: 36px; }
.cs-pk { font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#FE9700;margin-bottom:10px; }
.cs-ph { font-size:clamp(1.5rem,2vw,1.9rem);font-weight:800;color:#0A1628;letter-spacing:-.02em; }
.cs-ps { font-size:14px;color:#6b7280;margin-top:8px;line-height:1.6; }

.cs-tabs {
  display: flex; border-bottom: 1px solid #dde0e5;
  overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
  margin-bottom: 8px;
}
.cs-tabs::-webkit-scrollbar { display: none; }
.cs-tab {
  padding: 12px 22px; font-size: 13px; font-weight: 600;
  color: #6b7280; background: none; border: none;
  border-bottom: 2px solid transparent; cursor: pointer;
  white-space: nowrap; margin-bottom: -1px;
  transition: color .18s, border-color .18s;
}
.cs-tab:hover { color: #0A1628; }
.cs-tab.on { color: #0A1628; border-bottom-color: #FE9700; }
.cs-count { font-size: 12px; color: #9ca3af; margin: 18px 0 24px; }
.cs-count strong { color: #374151; }

.cs-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.cs-card {
  background: #fff; border-radius: 8px; border: 1px solid #e2e4e8;
  overflow: hidden; display: flex; flex-direction: column;
  transition: box-shadow .2s, transform .2s;
}
.cs-card:hover {
  box-shadow: 0 12px 40px rgba(10,22,40,.1), 0 0 0 1px rgba(10,22,40,.06);
  transform: translateY(-2px);
}
.cs-card-thumb {
  position: relative; aspect-ratio: 16/9;
  overflow: hidden; background: #eef0f3;
}
.cs-card-thumb img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .4s ease;
}
.cs-card:hover .cs-card-thumb img { transform: scale(1.04); }
.cs-card-badge {
  position: absolute; bottom: 10px; left: 10px;
  background: rgba(10,22,40,.78); backdrop-filter: blur(4px);
  color: #fff; font-size: 10px; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase;
  padding: 4px 10px; border-radius: 4px;
}
.cs-card-feat {
  position: absolute; top: 10px; right: 10px;
  background: #FE9700; color: #fff;
  font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 4px;
}
.cs-card-body { padding: 18px 20px 20px; flex:1; display:flex; flex-direction:column; }
.cs-card-industry {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: .12em; color: #9ca3af; margin-bottom: 5px;
}
.cs-card-title {
  font-size: 14px; font-weight: 700; color: #0A1628;
  line-height: 1.35; margin-bottom: 8px;
}
.cs-card-desc {
  font-size: 12.5px; color: #6b7280; line-height: 1.65;
  margin-bottom: 12px; flex: 1;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.cs-card-tags { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:12px; }
.cs-card-tag {
  font-size: 10px; font-weight: 600; padding: 3px 8px;
  background: #f4f5f7; color: #6b7280;
  border: 1px solid #e2e4e8; border-radius: 3px;
}
.cs-card-link {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 12px; font-weight: 700; color: #0A1628;
  text-decoration: none; margin-top: auto; transition: color .18s;
}
.cs-card-link:hover { color: #FE9700; }

/* ═══════════════════════════════════════════ CTA ══ */
.cs-cta {
  background: #0A1628; padding: 96px 48px;
  position: relative; overflow: hidden;
}
.cs-cta-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);
  background-size: 60px 60px;
}
.cs-cta-inner {
  max-width: 680px; margin: 0 auto; text-align: center;
  position: relative; z-index: 1;
}
.cs-cta-k { font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#FE9700;margin-bottom:18px; }
.cs-cta-h {
  font-size: clamp(2rem,3.2vw,2.8rem); font-weight:800;
  color:#fff; letter-spacing:-.025em; line-height:1.15; margin-bottom:18px;
}
.cs-cta-s {
  font-size:16px; color:rgba(255,255,255,.45);
  line-height:1.8; margin:0 auto 40px; max-width:440px;
}
.cs-cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.cs-cta-b1 {
  display:inline-flex; align-items:center; gap:10px;
  background:#FE9700; color:#fff; padding:14px 28px; border-radius:6px;
  font-size:14px; font-weight:700; text-decoration:none;
  transition:background .2s;
}
.cs-cta-b1:hover { background:#e08600; }
.cs-cta-b2 {
  display:inline-flex; align-items:center; gap:10px;
  color:rgba(255,255,255,.65); padding:14px 28px; border-radius:6px;
  font-size:14px; font-weight:700; text-decoration:none;
  border:1.5px solid rgba(255,255,255,.14);
  transition:border-color .2s, color .2s;
}
.cs-cta-b2:hover { border-color:rgba(255,255,255,.4); color:#fff; }

/* ═══════════════════════════════════════════ RESPONSIVE ══ */
@media(max-width:1024px){
  .cs-grid { grid-template-columns:repeat(2,1fr); }
  .cs-metrics { grid-template-columns:repeat(2,1fr); }
  .cs-metric:nth-child(2){ border-right:none; }
  .cs-metric:nth-child(3){ border-top:1px solid #e8eaed; }
  .cs-metric:nth-child(4){ border-top:1px solid #e8eaed; border-right:none; }
}
@media(max-width:860px){
  .cs-hero-inner,.cs-featured-intro,.cs-block,.cs-projects-inner,.cs-cta { padding-left:24px; padding-right:24px; }
  .cs-block-body { grid-template-columns:1fr; gap:40px; }
  .cs-block-image img { aspect-ratio:16/9; }
  .cs-fi-count { display:none; }
}
@media(max-width:640px){
  .cs-grid { grid-template-columns:1fr; }
  .cs-projects { padding:56px 0 64px; }
  .cs-block-outcomes { flex-wrap:wrap; }
  .cs-block-outcome { flex:1 1 calc(50% - 1px); }
  .cs-metric { padding:20px 24px; }
  .cs-metric-val { font-size:1.5rem; }
  .cs-cta { padding:64px 24px; }
}
        `}</style>
      </Head>

      {/* ── HERO — original, untouched ── */}
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

      {/* ── METRICS BAR ── */}
      <div className="cs-metrics">
        {STATS.map(s => (
          <div key={s.label} className="cs-metric">
            <div className="cs-metric-sep" />
            <div>
              <div className="cs-metric-val">{s.value}</div>
              <div className="cs-metric-lbl">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── FEATURED CASE STUDIES ── */}
      <div className="cs-featured">
        <div className="cs-featured-intro">
          <div>
            <p className="cs-fi-kicker">Featured Case Studies</p>
            <h2 className="cs-fi-title">Where strategy met execution</h2>
            <p className="cs-fi-sub">In-depth engagements that moved the needle for our clients.</p>
          </div>
          <div className="cs-fi-count">02</div>
        </div>

        {CASE_STUDIES.map((cs, i) => (
          <div key={cs.num} className="cs-block">
            {/* Header row */}
            <div className="cs-block-top">
              <div className="cs-block-label">
                <span className="cs-block-num">CASE STUDY · {cs.num}</span>
                <span className="cs-block-cat">{cs.category}</span>
              </div>
              <span className="cs-block-stack">{cs.stack}</span>
            </div>

            {/* Gold accent rule */}
            <div className="cs-block-rule" />

            {/* Two-column: title+desc left | outcomes+tags+link right */}
            <div className="cs-block-body">
              <div>
                <h2 className="cs-block-title">{cs.title}</h2>
                <p className="cs-block-desc">{cs.desc}</p>
              </div>
              <div className="cs-block-right">
                <div className="cs-block-outcomes">
                  {cs.outcomes.map(o => (
                    <div key={o.label} className="cs-block-outcome">
                      <div className="cs-block-outcome-val">{o.value}</div>
                      <div className="cs-block-outcome-lbl">{o.label}</div>
                    </div>
                  ))}
                </div>
                <div className="cs-block-tags">
                  {cs.tags.map(tag => (
                    <span key={tag} className="cs-block-tag">{tag}</span>
                  ))}
                </div>
                {cs.url && (
                  cs.internal ? (
                    <Link href={cs.url} className="cs-block-link">
                      Read Full Case Study
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </Link>
                  ) : (
                    <a href={cs.url} target="_blank" rel="noopener noreferrer" className="cs-block-link">
                      View Project
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Full-width cinematic image */}
            <div className="cs-block-image">
              <img src={cs.image} alt={cs.title} loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
          </div>
        ))}
      </div>

      {/* ── ALL PROJECTS ── */}
      <div className="cs-projects">
        <div className="cs-projects-inner">
          <div className="cs-projects-head">
            <p className="cs-pk">Our Portfolio</p>
            <h2 className="cs-ph">All Projects</h2>
            <p className="cs-ps">A selection of work spanning web development, eCommerce, and digital marketing.</p>
          </div>

          <div className="cs-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cs-tab${activeFilter === cat ? ' on' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="cs-count">
            Showing <strong>{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
            {activeFilter !== 'All' ? ` · ${activeFilter}` : ''}
          </p>

          <div className="cs-grid">
            {filtered.map((p, i) => (
              <div key={p.id} className="cs-card">
                <div className="cs-card-thumb">
                  <img src={p.image} alt={p.title} loading={i < 6 ? 'eager' : 'lazy'} />
                  {p.featured && <span className="cs-card-feat">Featured</span>}
                  <span className="cs-card-badge">{p.category}</span>
                </div>
                <div className="cs-card-body">
                  <div className="cs-card-industry">{p.industry}</div>
                  <h3 className="cs-card-title">{p.title}</h3>
                  <p className="cs-card-desc">{p.desc}</p>
                  <div className="cs-card-tags">
                    {p.tech.map(t => (
                      <span key={t} className="cs-card-tag">{t}</span>
                    ))}
                  </div>
                  {p.url && (
                    p.internal ? (
                      <Link href={p.url} className="cs-card-link">
                        Read Case Study
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                    ) : (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="cs-card-link">
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
          <p className="cs-cta-k">Let&rsquo;s Work Together</p>
          <h2 className="cs-cta-h">Ready to build your success story?</h2>
          <p className="cs-cta-s">
            Tell us about your project. We&rsquo;ll bring strategy, design, and engineering to make it happen.
          </p>
          <div className="cs-cta-btns">
            <Link href="/contact-us" className="cs-cta-b1">
              Start a Project
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/portfolio" className="cs-cta-b2">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
