'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const VALUES = [
  {
    icon: '◈',
    title: 'Craft Over Convenience',
    desc: "We take the harder path when shortcuts produce mediocre results. Every architecture decision, every line of code is made with deliberate intent.",
  },
  {
    icon: '◎',
    title: 'Radical Transparency',
    desc: "No surprise scope creep, no hidden costs, no runaround. You'll always know where your project stands, what it costs, and why.",
  },
  {
    icon: '◉',
    title: 'Long-Term Thinking',
    desc: "We architect for tomorrow's scale, not just today's deadline. The systems we build are meant to outlast technology trends.",
  },
  {
    icon: '⬡',
    title: 'Partnership Over Vendor',
    desc: "We act like stakeholders, not contractors. Your success metrics are our success metrics — from strategy through launch and beyond.",
  },
  {
    icon: '◫',
    title: 'Relentless Curiosity',
    desc: "We stay ahead of the technology curve so our clients don't have to. Continuous learning is embedded in how we operate.",
  },
  {
    icon: '◬',
    title: 'Accountability Without Exception',
    desc: "We own our mistakes and fix them fast. No finger-pointing, no passing the buck — just clear communication and solutions.",
  },
];

const TIMELINE = [
  {
    year: '2008',
    title: 'Founded in New Delhi',
    desc: "Started as a boutique web studio with one clear ambition: deliver Silicon Valley-quality digital development from the heart of India.",
  },
  {
    year: '2010',
    title: 'First International Clients',
    desc: "Landed our first clients in the United States, proving that geography is no barrier to world-class digital work.",
  },
  {
    year: '2013',
    title: 'Full-Stack Team of 25',
    desc: "Grew to a full team of designers, developers, and SEO specialists — enabling end-to-end digital product delivery under one roof.",
  },
  {
    year: '2015',
    title: 'Expanded to Australia & Canada',
    desc: "Established dedicated coverage for Australian and Canadian business hours, building time-zone-aware processes our clients rely on.",
  },
  {
    year: '2018',
    title: '300+ Projects Delivered',
    desc: "Crossed the milestone of 300 completed projects spanning enterprise web apps, e-commerce platforms, and performance marketing campaigns.",
  },
  {
    year: '2020',
    title: 'Modern Stack & Headless CMS',
    desc: "Launched our modern JavaScript and headless CMS practice, staying ahead of the industry shift toward decoupled, API-first architectures.",
  },
  {
    year: '2022',
    title: '500+ Clients Served',
    desc: "Reached the 500-client milestone — a testament to the trust placed in us by businesses ranging from funded startups to publicly listed companies.",
  },
  {
    year: '2024',
    title: '16 Years & Counting',
    desc: "Celebrating 16 years of continuous operation with 1,200+ projects delivered, 50+ team members, and a 97% client retention rate.",
  },
];

const SERVICES = [
  {
    icon: '🌐',
    title: 'Web Development',
    href: '/web-development-services',
    items: ['WordPress', 'Laravel', 'Django & Python', 'React / Next.js', 'Drupal', 'Custom PHP'],
  },
  {
    icon: '🛒',
    title: 'E-Commerce',
    href: '/ecommerce-website-development-services',
    items: ['WooCommerce', 'Shopify', 'Magento', 'OpenCart', 'Custom Storefronts', 'Payment Integration'],
  },
  {
    icon: '📈',
    title: 'Digital Marketing',
    href: '/digital-marketing-services',
    items: ['Technical SEO', 'PPC Management', 'Content Strategy', 'Social Media', 'Email Campaigns', 'Analytics & CRO'],
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    href: '/website-design',
    items: ['Wireframing', 'Prototyping', 'Brand Identity', 'Design Systems', 'User Research', 'Accessibility Audits'],
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    href: '/devops-services-company',
    items: ['AWS', 'Google Cloud', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Server Optimization', 'Security Hardening'],
  },
  {
    icon: '📡',
    title: 'Mobile & APIs',
    href: '/android-application-development-company',
    items: ['React Native', 'Progressive Web Apps', 'REST APIs', 'GraphQL', 'Third-party Integration', 'Headless CMS'],
  },
];

const INDUSTRIES = [
  { name: 'E-Commerce & Retail', icon: '🛍️' },
  { name: 'SaaS & Technology', icon: '💻' },
  { name: 'Healthcare & Wellness', icon: '🏥' },
  { name: 'Finance & Fintech', icon: '💰' },
  { name: 'Education & EdTech', icon: '🎓' },
  { name: 'Media & Publishing', icon: '📰' },
  { name: 'Real Estate & Property', icon: '🏢' },
  { name: 'Professional Services', icon: '⚖️' },
  { name: 'Government & NGO', icon: '🏛️' },
  { name: 'Travel & Hospitality', icon: '✈️' },
];

const CLIENTS = [
  { name: 'Verizon', logo: '/images/Verizon_2015_logo_-vector.svg.png' },
  { name: 'Nuance', logo: '/images/Nuance-Symbol-500x281.png' },
  { name: 'Honor', logo: '/images/Honor_Logo_(2020).svg.png' },
  { name: 'Indian Express', logo: '/images/Indian_Express_Logo_full.png' },
  { name: 'Uniphore', logo: '/images/Uniphore.jpg' },
  { name: 'Zuari Finserv', logo: '/images/Zuari-Finserv-logo-new.png' },
  { name: 'Wilson', logo: '/images/Wilson-logo.svg.png' },
  { name: 'PHDCCI', logo: '/images/PHDCCI-Logo-2024.png' },
];

const WHY = [
  {
    stat: '16+',
    label: 'Years in Operation',
    desc: "We've navigated every major technology shift since 2008 — and guided our clients through each one without disruption.",
  },
  {
    stat: '97%',
    label: 'Client Retention Rate',
    desc: "Our clients don't just return for new projects — they send their colleagues. That's the metric we care about most.",
  },
  {
    stat: '50+',
    label: 'Specialists on Staff',
    desc: "Not generalists. Dedicated specialists in every major technology, design discipline, and marketing channel.",
  },
  {
    stat: '3',
    label: 'Global Markets Served',
    desc: "Built-in time-zone coverage for US, Canada, and Australia — no timezone friction, no communication delays.",
  },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const end = parseFloat(target);
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function AnimatedStat({ label, val, suffix = '', started }) {
  const num = useCountUp(val, 1800, started);
  const display = num >= 1000 ? num.toLocaleString() : num;
  return (
    <div className="au-stat-item">
      <div className="au-stat-number">{display}{suffix}</div>
      <div className="au-stat-label">{label}</div>
    </div>
  );
}

export default function WhoWeAre() {
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleValueCards, setVisibleValueCards] = useState([]);
  const [visibleTimelineItems, setVisibleTimelineItems] = useState([]);
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [storyVisible, setStoryVisible] = useState(false);
  const [globalVisible, setGlobalVisible] = useState(false);

  const statsRef = useRef(null);
  const valueGridRef = useRef(null);
  const timelineRef = useRef(null);
  const whyGridRef = useRef(null);
  const storyRef = useRef(null);
  const globalRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStoryVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (storyRef.current) obs.observe(storyRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGlobalVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (globalRef.current) obs.observe(globalRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          VALUES.forEach((_, i) => setTimeout(() => setVisibleValueCards((p) => [...p, i]), i * 80));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (valueGridRef.current) obs.observe(valueGridRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          TIMELINE.forEach((_, i) => setTimeout(() => setVisibleTimelineItems((p) => [...p, i]), i * 120));
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (timelineRef.current) obs.observe(timelineRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          WHY.forEach((_, i) => setTimeout(() => setVisibleWhyCards((p) => [...p, i]), i * 100));
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (whyGridRef.current) obs.observe(whyGridRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Who We Are | 1Solutions — 16+ Years of Digital Excellence</title>
        <meta
          name="description"
          content="1Solutions is a New Delhi-based web development and digital marketing agency with 16+ years of experience, 500+ global clients, and a 97% retention rate. Trusted by Verizon, Nuance, Indian Express, and more."
        />
        <link rel="canonical" href="https://www.1solutions.biz/who-we-are/" />
        <style>{`
          /* ─── Base ─── */
          .au-page {
            font-family: 'Inter', sans-serif;
            color: #1a1a2e;
            overflow-x: hidden;
          }
          .au-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            pointer-events: none;
          }

          /* ─── Hero ─── */
          .au-hero {
            position: relative;
            min-height: 92vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            overflow: hidden;
            padding: 100px 24px 80px;
          }
          .au-hero-orb1 {
            width: 600px; height: 600px;
            background: rgba(17, 65, 113, 0.08);
            top: -100px; right: -100px;
          }
          .au-hero-orb2 {
            width: 400px; height: 400px;
            background: rgba(254, 151, 0, 0.10);
            bottom: -80px; left: -80px;
          }
          .au-hero-inner {
            max-width: 1100px;
            margin: 0 auto;
            width: 100%;
            position: relative;
            z-index: 1;
            text-align: center;
          }
          .au-hero-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(17, 65, 113, 0.15);
            border-radius: 100px;
            padding: 6px 16px;
            font-size: 13px;
            font-weight: 600;
            color: #114171;
            margin-bottom: 28px;
            letter-spacing: 0.02em;
          }
          .au-hero-eyebrow-dot {
            width: 6px; height: 6px;
            background: #44973D;
            border-radius: 50%;
            display: inline-block;
          }
          .au-hero h1 {
            font-size: clamp(2.4rem, 5.5vw, 4.2rem);
            font-weight: 800;
            line-height: 1.12;
            letter-spacing: -0.03em;
            color: #0F1F40;
            margin: 0 auto 28px;
            max-width: 860px;
          }
          .au-gradient-text {
            background: linear-gradient(90deg, #114171 0%, #FE9700 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .au-hero-sub {
            font-size: 1.18rem;
            line-height: 1.7;
            color: #374151;
            max-width: 620px;
            margin: 0 auto 40px;
          }
          .au-hero-actions {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 48px;
            justify-content: center;
          }
          .au-btn-primary {
            background: #114171;
            color: #fff;
            padding: 15px 32px;
            border-radius: 100px;
            font-weight: 700;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.25s;
            border: 2px solid #114171;
            letter-spacing: 0.01em;
          }
          .au-btn-primary:hover {
            background: #0d3260;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(17, 65, 113, 0.3);
          }
          .au-btn-outline {
            background: rgba(255, 255, 255, 0.7);
            color: #114171;
            padding: 15px 32px;
            border-radius: 100px;
            font-weight: 700;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.25s;
            border: 2px solid rgba(17, 65, 113, 0.3);
            backdrop-filter: blur(8px);
          }
          .au-btn-outline:hover {
            background: rgba(255, 255, 255, 0.95);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
          }
          .au-hero-chips {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }
          .au-hero-chip {
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(17, 65, 113, 0.12);
            border-radius: 14px;
            padding: 12px 20px;
            font-size: 0.85rem;
            color: #374151;
            min-width: 100px;
            text-align: center;
          }
          .au-hero-chip strong {
            color: #114171;
            font-weight: 800;
            font-size: 1.25rem;
            display: block;
            line-height: 1.2;
            margin-bottom: 2px;
          }

          /* ─── Marquee ─── */
          .au-marquee-wrap {
            background: #0F1F40;
            padding: 14px 0;
            overflow: hidden;
            white-space: nowrap;
          }
          .au-marquee-track {
            display: inline-block;
            animation: au-scroll 32s linear infinite;
          }
          .au-marquee-track span {
            font-size: 0.88rem;
            color: rgba(255, 255, 255, 0.65);
            padding: 0 20px;
            font-weight: 500;
            letter-spacing: 0.03em;
          }
          .au-marquee-sep {
            color: #FE9700 !important;
            padding: 0 4px !important;
          }
          @keyframes au-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          /* ─── Shared Section Layout ─── */
          .au-section {
            padding: 96px 24px;
          }
          .au-container {
            max-width: 1100px;
            margin: 0 auto;
          }
          .au-eyebrow {
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #FE9700;
            margin-bottom: 14px;
          }
          .au-heading {
            font-size: clamp(1.9rem, 3.5vw, 2.8rem);
            font-weight: 800;
            line-height: 1.18;
            letter-spacing: -0.025em;
            color: #0F1F40;
            margin: 0 0 20px;
          }
          .au-lead {
            font-size: 1.05rem;
            line-height: 1.75;
            color: #4b5563;
            max-width: 600px;
          }

          /* ─── Story ─── */
          .au-story-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 72px;
            align-items: center;
          }
          .au-story-copy {
            opacity: 0;
            transform: translateX(-28px);
            transition: opacity 0.65s ease, transform 0.65s ease;
          }
          .au-story-copy.au-visible {
            opacity: 1;
            transform: none;
          }
          .au-story-copy p {
            font-size: 1.06rem;
            line-height: 1.78;
            color: #374151;
            margin-bottom: 20px;
          }
          .au-story-copy p:last-child { margin-bottom: 0; }
          .au-stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3px;
          }
          .au-stat-item {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(17, 65, 113, 0.08);
            padding: 32px 24px;
            text-align: center;
          }
          .au-stat-item:nth-child(1) { border-radius: 20px 0 0 0; }
          .au-stat-item:nth-child(2) { border-radius: 0 20px 0 0; }
          .au-stat-item:nth-child(3) { border-radius: 0 0 0 20px; }
          .au-stat-item:nth-child(4) { border-radius: 0 0 20px 0; }
          .au-stat-number {
            font-size: 2.6rem;
            font-weight: 800;
            color: #114171;
            line-height: 1;
            margin-bottom: 8px;
            letter-spacing: -0.02em;
          }
          .au-stat-label {
            font-size: 0.85rem;
            color: #6b7280;
            font-weight: 600;
          }

          /* ─── Office Divider ─── */
          .au-office-wrap {
            position: relative;
            width: 100%;
            aspect-ratio: 21/7;
            max-height: 380px;
            overflow: hidden;
          }
          .au-office-overlay {
            position: absolute;
            inset: 0;
            z-index: 1;
            background: linear-gradient(
              90deg,
              rgba(15, 31, 64, 0.88) 0%,
              rgba(15, 31, 64, 0.45) 55%,
              transparent 100%
            );
          }
          .au-office-text {
            position: absolute;
            inset: 0;
            z-index: 2;
            display: flex;
            align-items: center;
            padding: 0 80px;
          }
          .au-office-quote {
            max-width: 560px;
            color: #fff;
            font-size: clamp(1.3rem, 2.6vw, 2rem);
            font-weight: 700;
            line-height: 1.38;
            letter-spacing: -0.01em;
            margin: 0;
          }
          .au-office-quote cite {
            display: block;
            font-style: normal;
            font-size: 0.88rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.55);
            margin-top: 16px;
            letter-spacing: 0.02em;
          }

          /* ─── Timeline ─── */
          .au-timeline-section {
            background: #f8fafc;
          }
          .au-timeline-head {
            text-align: center;
            max-width: 580px;
            margin: 0 auto 56px;
          }
          .au-timeline {
            position: relative;
            max-width: 720px;
            margin: 0 auto;
            padding-left: 44px;
          }
          .au-timeline::before {
            content: '';
            position: absolute;
            left: 15px;
            top: 8px;
            bottom: 8px;
            width: 2px;
            background: linear-gradient(180deg, #114171, #FE9700);
            border-radius: 2px;
          }
          .au-tl-item {
            position: relative;
            margin-bottom: 44px;
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
          }
          .au-tl-item:last-child { margin-bottom: 0; }
          .au-tl-item.au-tl-in { opacity: 1; transform: none; }
          .au-tl-dot {
            position: absolute;
            left: -36px;
            top: 5px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #114171;
            border: 3px solid #fff;
            box-shadow: 0 0 0 2px #114171;
          }
          .au-tl-year {
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #FE9700;
            margin-bottom: 5px;
          }
          .au-tl-title {
            font-size: 1.1rem;
            font-weight: 700;
            color: #0F1F40;
            margin-bottom: 7px;
          }
          .au-tl-desc {
            font-size: 0.96rem;
            line-height: 1.65;
            color: #4b5563;
          }

          /* ─── Values ─── */
          .au-values-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 22px;
            margin-top: 52px;
          }
          .au-value-card {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(14px);
            border: 1px solid rgba(17, 65, 113, 0.1);
            border-radius: 20px;
            padding: 36px 28px;
            box-shadow: 0 2px 20px rgba(17, 65, 113, 0.06),
                        inset 0 1px 0 rgba(255, 255, 255, 0.95);
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.45s ease, transform 0.45s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          }
          .au-value-card.au-vc-in {
            opacity: 1;
            transform: none;
          }
          .au-value-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 16px 40px rgba(17, 65, 113, 0.12),
                        inset 0 1px 0 rgba(255, 255, 255, 0.95);
            border-color: rgba(17, 65, 113, 0.22);
          }
          .au-value-icon {
            font-size: 1.75rem;
            margin-bottom: 18px;
            color: #114171;
          }
          .au-value-title {
            font-size: 1.02rem;
            font-weight: 700;
            color: #0F1F40;
            margin-bottom: 10px;
          }
          .au-value-desc {
            font-size: 0.93rem;
            line-height: 1.65;
            color: #4b5563;
          }

          /* ─── Services ─── */
          .au-services-section { background: #f8fafc; }
          .au-services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 22px;
            margin-top: 52px;
          }
          .au-service-card {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            padding: 28px 24px;
            transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          }
          .au-service-card:hover {
            border-color: #114171;
            box-shadow: 0 8px 28px rgba(17, 65, 113, 0.1);
            transform: translateY(-3px);
          }
          .au-service-icon { font-size: 1.75rem; margin-bottom: 14px; }
          .au-service-title {
            font-size: 1rem;
            font-weight: 700;
            color: #0F1F40;
            margin-bottom: 14px;
          }
          .au-service-items {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .au-service-items li {
            font-size: 0.88rem;
            color: #6b7280;
            padding: 4px 0;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .au-service-items li::before {
            content: '→';
            color: #FE9700;
            font-size: 0.78rem;
            flex-shrink: 0;
          }

          /* ─── Industries ─── */
          .au-industries-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 14px;
            margin-top: 48px;
          }
          .au-industry-card {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(17, 65, 113, 0.1);
            border-radius: 14px;
            padding: 20px 14px;
            text-align: center;
            transition: background 0.25s, border-color 0.25s;
            cursor: default;
          }
          .au-industry-card:hover {
            background: #114171;
            border-color: #114171;
          }
          .au-industry-card:hover .au-industry-name { color: #fff; }
          .au-industry-icon { font-size: 1.5rem; margin-bottom: 10px; }
          .au-industry-name {
            font-size: 0.8rem;
            font-weight: 600;
            color: #374151;
            line-height: 1.3;
          }

          /* ─── Clients ─── */
          .au-clients-section { background: #f8fafc; }
          .au-clients-head {
            text-align: center;
            max-width: 540px;
            margin: 0 auto;
          }
          .au-clients-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 3px;
            margin-top: 52px;
          }
          .au-client-cell {
            background: #fff;
            padding: 36px 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: box-shadow 0.2s;
            position: relative;
          }
          .au-client-cell:hover {
            box-shadow: inset 0 0 0 2px #114171;
            z-index: 1;
          }
          .au-client-cell:nth-child(1) { border-radius: 20px 0 0 0; }
          .au-client-cell:nth-child(4) { border-radius: 0 20px 0 0; }
          .au-client-cell:nth-child(5) { border-radius: 0 0 0 20px; }
          .au-client-cell:nth-child(8) { border-radius: 0 0 20px 0; }
          .au-client-img-wrap {
            position: relative;
            width: 130px;
            height: 50px;
          }

          /* ─── Why — dark section ─── */
          .au-why-section {
            background: #0F1F40;
          }
          .au-why-section .au-eyebrow { color: #FE9700; }
          .au-why-section .au-heading { color: #fff; }
          .au-why-section .au-lead { color: rgba(255, 255, 255, 0.6); }
          .au-why-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
            margin-top: 52px;
          }
          .au-why-card {
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 36px 24px;
            background: rgba(255, 255, 255, 0.04);
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.5s ease, transform 0.5s ease, background 0.3s, border-color 0.3s;
          }
          .au-why-card.au-wc-in {
            opacity: 1;
            transform: none;
          }
          .au-why-card:hover {
            background: rgba(255, 255, 255, 0.07);
            border-color: rgba(254, 151, 0, 0.4);
          }
          .au-why-num {
            font-size: 3rem;
            font-weight: 800;
            color: #FE9700;
            line-height: 1;
            margin-bottom: 8px;
            letter-spacing: -0.02em;
          }
          .au-why-label {
            font-size: 0.82rem;
            font-weight: 700;
            color: #fff;
            margin-bottom: 14px;
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }
          .au-why-desc {
            font-size: 0.93rem;
            line-height: 1.65;
            color: rgba(255, 255, 255, 0.58);
          }

          /* ─── Global Presence ─── */
          .au-global-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: center;
          }
          .au-global-copy {
            opacity: 0;
            transform: translateX(-24px);
            transition: opacity 0.6s ease, transform 0.6s ease;
          }
          .au-global-copy.au-visible { opacity: 1; transform: none; }
          .au-global-copy p {
            font-size: 1.05rem;
            line-height: 1.78;
            color: #374151;
            margin-bottom: 20px;
          }
          .au-global-copy p:last-child { margin-bottom: 0; }
          .au-location-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }
          .au-location-card {
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(17, 65, 113, 0.1);
            border-radius: 16px;
            padding: 24px 20px;
            transition: box-shadow 0.25s, border-color 0.25s;
          }
          .au-location-card:hover {
            border-color: rgba(17, 65, 113, 0.25);
            box-shadow: 0 8px 24px rgba(17, 65, 113, 0.1);
          }
          .au-location-flag { font-size: 2rem; margin-bottom: 10px; }
          .au-location-city {
            font-weight: 700;
            color: #0F1F40;
            margin-bottom: 4px;
            font-size: 1rem;
          }
          .au-location-role {
            font-size: 0.8rem;
            color: #6b7280;
            margin-bottom: 6px;
            line-height: 1.35;
          }
          .au-location-tz {
            font-size: 0.75rem;
            color: #FE9700;
            font-weight: 600;
            letter-spacing: 0.04em;
          }

          /* ─── CTA ─── */
          .au-cta-section {
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 50%, #fef3c7 100%);
            text-align: center;
            padding: 100px 24px;
          }
          .au-cta-section .au-heading {
            max-width: 700px;
            margin: 0 auto 20px;
          }
          .au-cta-section .au-lead {
            margin: 0 auto 40px;
          }
          .au-cta-actions {
            display: flex;
            gap: 16px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .au-cta-note {
            margin-top: 20px;
            font-size: 0.87rem;
            color: #6b7280;
          }

          /* ─── Responsive ─── */
          @media (max-width: 1024px) {
            .au-values-grid { grid-template-columns: repeat(2, 1fr); }
            .au-services-grid { grid-template-columns: repeat(2, 1fr); }
            .au-industries-grid { grid-template-columns: repeat(4, 1fr); }
            .au-why-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 768px) {
            .au-hero { min-height: 80vh; padding: 80px 20px 60px; }
            .au-section { padding: 64px 20px; }
            .au-story-grid { grid-template-columns: 1fr; gap: 48px; }
            .au-global-grid { grid-template-columns: 1fr; gap: 40px; }
            .au-values-grid { grid-template-columns: 1fr; }
            .au-services-grid { grid-template-columns: 1fr; }
            .au-industries-grid { grid-template-columns: repeat(2, 1fr); }
            .au-clients-grid { grid-template-columns: repeat(2, 1fr); }
            .au-why-grid { grid-template-columns: 1fr; }
            .au-timeline { padding-left: 32px; }
            .au-timeline::before { left: 11px; }
            .au-tl-dot { left: -27px; }
            .au-office-wrap { aspect-ratio: 16/9; max-height: 260px; }
            .au-office-text { padding: 0 28px; }
            .au-office-quote { font-size: 1.15rem; }
          }
        `}</style>
      </Head>

      <div className="au-page">

        {/* ── Hero ── */}
        <section className="au-hero">
          <div className="au-orb au-hero-orb1" />
          <div className="au-orb au-hero-orb2" />
          <div className="au-hero-inner">
            <h1>
              We help ambitious businesses build{' '}
              <span className="au-gradient-text">digital products</span>{' '}
              that compete at the highest level.
            </h1>
            <p className="au-hero-sub">
              1Solutions is a web development and digital marketing agency founded in 2010.
              For 16+ years, we&apos;ve been the trusted technology partner for startups, scale-ups,
              and enterprise teams who need world-class work — at a fraction of what local agencies charge.
            </p>
            <div className="au-hero-actions">
              <Link href="/contact-us/" className="au-btn-primary">Start a Conversation</Link>
              <Link href="#our-story" className="au-btn-outline">Our Story</Link>
            </div>
          </div>
        </section>

        {/* ── Tech Marquee ── */}
        <div className="au-marquee-wrap" aria-hidden="true">
          <div className="au-marquee-track">
            {[
              'WordPress', '·', 'Laravel', '·', 'Django', '·', 'React', '·', 'Next.js', '·',
              'Python', '·', 'Node.js', '·', 'PHP', '·', 'WooCommerce', '·', 'Shopify', '·',
              'Magento', '·', 'Drupal', '·', 'MySQL', '·', 'PostgreSQL', '·', 'AWS', '·',
              'Google Cloud', '·', 'Docker', '·', 'Technical SEO', '·', 'PPC', '·', 'UI/UX Design', '·',
              'WordPress', '·', 'Laravel', '·', 'Django', '·', 'React', '·', 'Next.js', '·',
              'Python', '·', 'Node.js', '·', 'PHP', '·', 'WooCommerce', '·', 'Shopify', '·',
              'Magento', '·', 'Drupal', '·', 'MySQL', '·', 'PostgreSQL', '·', 'AWS', '·',
              'Google Cloud', '·', 'Docker', '·', 'Technical SEO', '·', 'PPC', '·', 'UI/UX Design', '·',
            ].map((t, i) => (
              <span key={i} className={t === '·' ? 'au-marquee-sep' : ''}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── Our Story + Stats ── */}
        <section
          id="our-story"
          className="au-section"
          style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%)' }}
        >
          <div className="au-container">
            <div className="au-story-grid">
              <div
                ref={storyRef}
                className={`au-story-copy${storyVisible ? ' au-visible' : ''}`}
              >
                <p className="au-eyebrow">Our Story</p>
                <h2 className="au-heading">Built on a single principle: great work speaks for itself.</h2>
                <p>
                  Founded in 2008, 1Solutions has grown from a small New Delhi startup into a trusted digital
                  partner for businesses across the US, Canada, and Australia. Over the past 16+ years, we have
                  successfully delivered 500+ projects spanning web development, eCommerce, digital marketing,
                  UI/UX design, and cloud solutions.
                </p>
                <p>
                  Today, our team of 50+ professionals is committed to building high-performing digital experiences
                  that drive measurable business growth. With a 97% client retention rate, we take pride in
                  fostering long-term partnerships through transparency, accountability, and consistent results.
                </p>
              </div>
              <div ref={statsRef}>
                <div className="au-stats-grid">
                  <AnimatedStat label="Years in Business" val={16} suffix="+" started={statsStarted} />
                  <AnimatedStat label="Clients Served" val={500} suffix="+" started={statsStarted} />
                  <AnimatedStat label="Projects Delivered" val={1200} suffix="+" started={statsStarted} />
                  <AnimatedStat label="Retention Rate" val={97} suffix="%" started={statsStarted} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Office Image Divider ── */}
        <div className="au-office-wrap">
          <Image
            src="/images/office.png"
            alt="1Solutions office, New Delhi"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="au-office-overlay" />
          <div className="au-office-text">
            <blockquote className="au-office-quote">
              &ldquo;We don&apos;t just write code. We take ownership of outcomes.&rdquo;
              <cite>1Solutions &mdash; New Delhi, India &bull; Est. 2010</cite>
            </blockquote>
          </div>
        </div>

        {/* ── Timeline ── */}
        <section className="au-section au-timeline-section">
          <div className="au-container">
            <div className="au-timeline-head">
              <p className="au-eyebrow">16 Years in the Making</p>
              <h2 className="au-heading">The milestones that shaped who we are.</h2>
            </div>
            <div className="au-timeline" ref={timelineRef}>
              {TIMELINE.map((item, i) => (
                <div
                  key={i}
                  className={`au-tl-item${visibleTimelineItems.includes(i) ? ' au-tl-in' : ''}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="au-tl-dot" />
                  <div className="au-tl-year">{item.year}</div>
                  <div className="au-tl-title">{item.title}</div>
                  <div className="au-tl-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section
          className="au-section"
          style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%)' }}
        >
          <div className="au-container">
            <div style={{ maxWidth: 560 }}>
              <p className="au-eyebrow">What We Believe</p>
              <h2 className="au-heading">The values that govern how we work.</h2>
              <p className="au-lead">
                These aren&apos;t wall art. They&apos;re the lens through which we evaluate every decision —
                from architecture choices to how we handle a production incident at 2 a.m.
              </p>
            </div>
            <div className="au-values-grid" ref={valueGridRef}>
              {VALUES.map((v, i) => (
                <div
                  key={i}
                  className={`au-value-card${visibleValueCards.includes(i) ? ' au-vc-in' : ''}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="au-value-icon">{v.icon}</div>
                  <div className="au-value-title">{v.title}</div>
                  <div className="au-value-desc">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services Overview ── */}
        <section className="au-section au-services-section">
          <div className="au-container">
            <div style={{ maxWidth: 560 }}>
              <p className="au-eyebrow">What We Do</p>
              <h2 className="au-heading">One agency. Every discipline.</h2>
              <p className="au-lead">
                We deliberately built a full-service team so our clients never have to manage
                multiple vendors for a single digital objective.
              </p>
            </div>
            <div className="au-services-grid">
              {SERVICES.map((s, i) => (
                <Link key={i} href={s.href} className="au-service-card" style={{ textDecoration: 'none' }}>
                  <div className="au-service-icon">{s.icon}</div>
                  <div className="au-service-title">{s.title}</div>
                  <ul className="au-service-items">
                    {s.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why 1Solutions — dark ── */}
        <section className="au-section au-why-section">
          <div className="au-container">
            <div style={{ maxWidth: 560 }}>
              <p className="au-eyebrow">Why 1Solutions</p>
              <h2 className="au-heading">The numbers behind the reputation.</h2>
              <p className="au-lead">
                We let our track record make the case. These are the four numbers we&apos;re
                most proud of — and what each one means for your project.
              </p>
            </div>
            <div className="au-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div
                  key={i}
                  className={`au-why-card${visibleWhyCards.includes(i) ? ' au-wc-in' : ''}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="au-why-num">{w.stat}</div>
                  <div className="au-why-label">{w.label}</div>
                  <div className="au-why-desc">{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="au-cta-section">
          <div className="au-container">
            <p className="au-eyebrow" style={{ textAlign: 'center' }}>Let&apos;s Build Together</p>
            <h2 className="au-heading">
              Ready to work with a team that&apos;s been at this for 16 years?
            </h2>
            <p className="au-lead">
              Every great partnership starts with a conversation. Tell us what you&apos;re building —
              we&apos;ll tell you exactly how we can help, and what it will cost.
            </p>
            <div className="au-cta-actions">
              <Link href="/contact-us/" className="au-btn-primary">Get a Free Consultation</Link>
              <Link href="/wordpress-development-company/" className="au-btn-outline">Explore Our Services</Link>
            </div>
            <p className="au-cta-note">No commitment required &mdash; just a conversation.</p>
          </div>
        </section>

      </div>
    </>
  );
}
