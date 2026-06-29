import Head from 'next/head';
import Link from 'next/link';

function getOverviewP2(project) {
  const catMap = {
    'Web Development': `Our team managed the full engagement — discovery, wireframing, custom development, QA, and launch — delivering a website that performs as well as it looks in the competitive ${project.industry} space.`,
    'eCommerce': `From store architecture and theme development to product pages and checkout optimisation, we handled the full eCommerce build — ensuring every interaction moves shoppers closer to purchase in the ${project.industry} market.`,
    'Digital Marketing': `We developed and executed a data-driven strategy across the highest-impact channels for ${project.industry} — continuously measuring results and doubling down on what works to compound growth over time.`,
    'Mobile App': `We delivered a performant, cross-platform solution for ${project.industry} — with clean UX, snappy load times, and the kind of polish that earns repeat engagement.`,
    'UI/UX Design': `We approached the ${project.industry} project design-first — mapping user journeys, building interactive prototypes, and iterating until every interaction felt natural and intentional.`,
  };
  return catMap[project.category] || `Our team delivered this ${project.industry} project with a focus on quality, performance, and long-term value — on time and to specification.`;
}

function getPlatform(tech) {
  if (tech.includes('Shopify')) return 'Shopify';
  if (tech.includes('WooCommerce')) return 'WooCommerce';
  if (tech.includes('WordPress')) return 'WordPress';
  if (tech.includes('Next.js')) return 'Next.js';
  if (tech.includes('Laravel CRM') || tech.includes('Custom Development') || tech.includes('Custom Build')) return 'Custom Build';
  if (tech.includes('React Native')) return 'React Native';
  return tech[0] || 'Custom';
}

const FEAT = {
  'WordPress Development':   { icon: '🎨', bg: '#EDE9FE', title: 'Custom WordPress Theme',    desc: 'Built from scratch with a bespoke theme — no page builders or generic templates. Every element crafted to reflect the brand.' },
  'WordPress':               { icon: '🎨', bg: '#EDE9FE', title: 'Custom WordPress Theme',    desc: 'Built from scratch with a bespoke theme — no page builders or generic templates. Every element crafted to reflect the brand.' },
  'Custom PHP Theme':        { icon: '🎨', bg: '#EDE9FE', title: 'Custom WordPress Theme',    desc: 'Built from scratch with a bespoke theme — no page builders or generic templates. Every element crafted to reflect the brand.' },
  'Custom Theme':            { icon: '🎨', bg: '#EDE9FE', title: 'Custom Theme Design',       desc: 'A bespoke theme built to the project brief — not adapted from an existing template.' },
  'Shopify':                 { icon: '🛒', bg: '#ECFDF5', title: 'Shopify Store',             desc: 'Full Shopify setup with custom Liquid theme, product pages, collections, and a high-converting checkout.' },
  'Liquid':                  { icon: '🛒', bg: '#ECFDF5', title: 'Liquid Theming',            desc: 'Custom Shopify Liquid for pixel-perfect product presentation and a brand-aligned store experience.' },
  'WooCommerce':             { icon: '🛍️', bg: '#FFF7ED', title: 'WooCommerce Store',        desc: 'End-to-end WooCommerce with payment gateways, product management, and order workflows.' },
  'UI/UX Design':            { icon: '📐', bg: '#EFF6FF', title: 'UI/UX Design',             desc: 'User-centred design with intuitive navigation, clear CTAs, and a visual identity that builds trust from the first visit.' },
  'Custom Development':      { icon: '⚙️', bg: '#F0FDF4', title: 'Custom Development',       desc: 'Bespoke engineering tailored to exact requirements — scalable, secure, and built to last.' },
  'Custom Build':            { icon: '⚙️', bg: '#F0FDF4', title: 'Custom Development',       desc: 'Bespoke engineering tailored to exact requirements — scalable, secure, and built to last.' },
  'Next.js':                 { icon: '⚡', bg: '#EDE9FE', title: 'Next.js Development',      desc: 'High-performance site built with Next.js — fast page loads, SEO-optimised, and fully responsive.' },
  'Laravel CRM':             { icon: '🔧', bg: '#F0FDF4', title: 'Laravel CRM & Portal',     desc: 'Custom Laravel backend with a purpose-built CRM, role management, and automated data workflows.' },
  'Portal Design':           { icon: '🗂️', bg: '#EFF6FF', title: 'Portal Design',           desc: 'Structured portal for complex user flows — multi-role access, dashboards, and data management.' },
  'LinkedIn Marketing':      { icon: '📣', bg: '#FFF7ED', title: 'LinkedIn Marketing',       desc: 'Strategic content, profile management, and audience growth to build authority and reach decision-makers.' },
  'Email Marketing':         { icon: '📧', bg: '#FFF7ED', title: 'Email Marketing',          desc: 'Targeted campaigns with subscriber management, automation flows, and performance tracking.' },
  'Conversion Optimisation': { icon: '📈', bg: '#ECFDF5', title: 'Conversion Optimisation', desc: 'Data-driven improvements to product pages, CTAs, and checkout to maximise store revenue.' },
  'eCommerce':               { icon: '🛒', bg: '#EFF6FF', title: 'eCommerce Development',    desc: 'Full eCommerce setup including catalogue, payment integration, and order management.' },
  'React Native':            { icon: '📱', bg: '#EDE9FE', title: 'React Native App',         desc: 'Cross-platform mobile app with native performance on both iOS and Android.' },
  'SEO':                     { icon: '🔍', bg: '#ECFDF5', title: 'SEO Strategy',            desc: 'On-page and technical SEO from the ground up — keyword mapping, schema markup, and site speed.' },
};

function getFeatures(project) {
  const seen = new Set();
  const cards = [];
  for (const t of project.tech) {
    const spec = FEAT[t];
    if (spec && !seen.has(spec.title)) {
      seen.add(spec.title);
      cards.push(spec);
    }
  }
  if (cards.length < 3 && !seen.has('Responsive Design')) {
    cards.push({ icon: '📱', bg: '#ECFDF5', title: 'Responsive Design', desc: 'Pixel-perfect across all screen sizes — desktop, tablet, and mobile — with zero layout breaks.' });
    seen.add('Responsive Design');
  }
  if (cards.length < 3 && !seen.has('SEO Foundation')) {
    cards.push({ icon: '🔍', bg: '#F0FDF4', title: 'SEO Foundation', desc: 'Built with SEO best practices — clean markup, fast load times, and correct meta structure.' });
  }
  return cards.slice(0, 4);
}

function getTagStyle(tag) {
  const map = {
    'WordPress Development': { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
    'WordPress':             { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
    'Custom Theme':          { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE' },
    'Custom Development':    { bg: '#F0FDF4', color: '#15803D', border: '#A7F3D0' },
    'Custom Build':          { bg: '#F0FDF4', color: '#15803D', border: '#A7F3D0' },
    'UI/UX Design':          { bg: '#EDE9FE', color: '#6D28D9', border: '#DDD6FE' },
    'Shopify':               { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' },
    'Liquid':                { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' },
    'WooCommerce':           { bg: '#FFF7ED', color: '#C2410C', border: '#FED7AA' },
    'LinkedIn Marketing':    { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
    'Email Marketing':       { bg: '#FFF7ED', color: '#C2410C', border: '#FED7AA' },
    'Laravel CRM':           { bg: '#F0FDF4', color: '#15803D', border: '#A7F3D0' },
    'Next.js':               { bg: '#F5F3FF', color: '#6D28D9', border: '#DDD6FE' },
    'Portal Design':         { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
    'eCommerce':             { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' },
    'Conversion Optimisation': { bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' },
    'React Native':          { bg: '#EDE9FE', color: '#6D28D9', border: '#DDD6FE' },
  };
  return map[tag] || { bg: '#F3F4F6', color: '#374151', border: '#E5E7EB' };
}

export default function CaseStudyPage({ project, prev, next }) {
  const features = getFeatures(project);

  return (
    <>
      <Head>
        <title>{project.title} — {project.industry} Case Study | 1Solutions</title>
        <meta name="description" content={`See how 1Solutions delivered a ${project.category.toLowerCase()} solution for ${project.title} in the ${project.industry} sector. ${project.desc}`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.1solutions.biz/case-studies/${project.id}`} />
        <style>{`
          * { box-sizing: border-box; }

          /* ── Hero ── */
          .ct-hero {
            position: relative;
            background: #0A1628;
            overflow: hidden;
          }
          .ct-hero-img {
            width: 100%;
            max-height: 620px;
            object-fit: cover;
            object-position: center top;
            display: block;
          }
          .ct-hero-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(10,22,40,0.2) 0%, rgba(10,22,40,0.65) 100%);
          }
          .ct-breadcrumb {
            position: absolute;
            top: 28px;
            left: 0; right: 0;
            max-width: 1160px;
            margin: 0 auto;
            padding: 0 40px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            color: rgba(255,255,255,0.75);
            z-index: 2;
          }
          .ct-breadcrumb a { color: rgba(255,255,255,0.75); text-decoration: none; }
          .ct-breadcrumb a:hover { color: #fff; }
          .ct-breadcrumb-sep { color: rgba(255,255,255,0.4); }

          /* ── Meta strip ── */
          .ct-meta-strip {
            background: #fff;
            border-bottom: 1px solid #f0f0f0;
          }
          .ct-meta-inner {
            max-width: 1160px;
            margin: 0 auto;
            padding: 0 40px;
            display: flex;
            align-items: stretch;
            flex-wrap: wrap;
          }
          .ct-meta-item {
            padding: 28px 40px 28px 0;
            margin-right: 40px;
            border-right: 1px solid #f0f0f0;
            flex-shrink: 0;
          }
          .ct-meta-item:last-child { border-right: none; margin-right: 0; flex: 1; }
          .ct-meta-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: #9ca3af;
            margin-bottom: 6px;
          }
          .ct-meta-value {
            font-size: 14px;
            font-weight: 600;
            color: #111827;
            line-height: 1.4;
          }
          .ct-meta-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            padding: 20px 0;
          }
          .ct-meta-tag {
            font-size: 12px;
            font-weight: 600;
            padding: 4px 12px;
            border-radius: 20px;
            border: 1px solid;
          }

          /* ── Body ── */
          .ct-body {
            max-width: 1160px;
            margin: 0 auto;
            padding: 72px 40px 80px;
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 80px;
            align-items: start;
          }

          /* ── Content (left) ── */
          .ct-content h2 {
            font-size: clamp(1.5rem, 2.5vw, 2rem);
            font-weight: 800;
            color: #0a1628;
            margin: 0 0 16px;
            line-height: 1.25;
          }
          .ct-content p {
            font-size: 16px;
            color: #4b5563;
            line-height: 1.8;
            margin: 0 0 20px;
          }
          .ct-content p:last-child { margin-bottom: 0; }
          .ct-section { margin-bottom: 60px; }
          .ct-section:last-child { margin-bottom: 0; }
          .ct-eyebrow {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: #D97706;
            margin-bottom: 12px;
          }

          /* Feature grid */
          .ct-feature-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 24px;
          }
          .ct-feature-card {
            background: #f9fafb;
            border: 1px solid #f0f0f0;
            border-radius: 12px;
            padding: 22px;
          }
          .ct-feature-icon {
            width: 40px; height: 40px;
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 14px;
          }
          .ct-feature-card h3 {
            font-size: 14px;
            font-weight: 700;
            color: #111827;
            margin: 0 0 8px;
          }
          .ct-feature-card p {
            font-size: 13px;
            color: #6b7280;
            line-height: 1.6;
            margin: 0;
          }

          /* Tech stack */
          .ct-tech-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;
          }
          .ct-tech-pill {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 8px 16px;
            font-size: 13px;
            font-weight: 600;
            color: #374151;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          /* Live site link */
          .ct-live-link {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #0A1628;
            color: #fff;
            padding: 14px 28px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            margin-top: 24px;
            transition: opacity .2s;
          }
          .ct-live-link:hover { opacity: 0.85; }

          /* ── Sidebar ── */
          /* ── Sidebar ── */
          .ct-sidebar {
            position: sticky;
            top: 100px;
            display: flex;
            flex-direction: column;
            gap: 14px;
          }

          /* Snapshot card */
          .ct-snap {
            background: #0A1628;
            border-radius: 18px;
            padding: 22px;
          }
          .ct-snap-kicker {
            font-size: 10px; font-weight: 700;
            text-transform: uppercase; letter-spacing: .16em;
            color: #FE9700; margin-bottom: 16px;
          }
          .ct-snap-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .ct-snap-item {
            background: rgba(255,255,255,.07);
            border-radius: 11px;
            padding: 13px 13px 11px;
          }
          .ct-snap-icon {
            width: 28px; height: 28px;
            background: rgba(254,151,0,.18);
            border-radius: 7px;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 9px;
          }
          .ct-snap-label {
            font-size: 9px; font-weight: 700;
            text-transform: uppercase; letter-spacing: .1em;
            color: rgba(255,255,255,.38); margin-bottom: 3px;
          }
          .ct-snap-val {
            font-size: 12px; font-weight: 700;
            color: #fff; line-height: 1.35;
          }

          /* Tech stack card */
          .ct-tech {
            background: #fff;
            border: 1px solid #f0f0f0;
            border-radius: 18px;
            padding: 20px;
          }
          .ct-tech-hdr {
            font-size: 10px; font-weight: 700;
            text-transform: uppercase; letter-spacing: .14em;
            color: #9ca3af; margin-bottom: 13px;
          }
          .ct-tech-pills { display: flex; flex-wrap: wrap; gap: 6px; }
          .ct-sb-pill {
            font-size: 11px; font-weight: 600;
            padding: 4px 11px;
            border-radius: 50px; border: 1.5px solid;
          }

          /* Live site card */
          .ct-live {
            background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
            border-radius: 18px; padding: 20px;
            text-decoration: none; display: block;
            transition: transform .2s, opacity .2s;
          }
          .ct-live:hover { transform: translateY(-2px); opacity: .92; }
          .ct-live-lbl {
            font-size: 10px; font-weight: 700;
            text-transform: uppercase; letter-spacing: .15em;
            color: rgba(255,255,255,.5); margin-bottom: 6px;
          }
          .ct-live-title {
            font-size: 15px; font-weight: 800;
            color: #fff; margin-bottom: 14px; line-height: 1.3;
          }
          .ct-live-btn {
            display: inline-flex; align-items: center; gap: 7px;
            background: rgba(255,255,255,.15); color: #fff;
            border-radius: 7px; padding: 8px 15px;
            font-size: 12px; font-weight: 700;
          }

          /* CTA card */
          .ct-cta-card {
            background: linear-gradient(135deg, #0F3460 0%, #1a4a7a 100%);
            border-radius: 18px; padding: 22px;
            position: relative; overflow: hidden;
          }
          .ct-cta-card-orb {
            position: absolute; border-radius: 50%; pointer-events: none;
            top: -40px; right: -40px;
            width: 120px; height: 120px;
            background: radial-gradient(circle, rgba(254,151,0,.18) 0%, transparent 70%);
          }
          .ct-cta-card h3 {
            font-size: 16px; font-weight: 800;
            color: #fff; line-height: 1.3;
            margin: 0 0 7px; position: relative;
          }
          .ct-cta-card p {
            font-size: 12px; color: rgba(255,255,255,.6);
            line-height: 1.65; margin: 0 0 16px; position: relative;
          }
          .ct-cta-card-btn {
            display: flex; align-items: center; justify-content: center; gap: 8px;
            background: #FE9700; color: #fff;
            border-radius: 8px; padding: 11px 18px;
            font-size: 13px; font-weight: 700;
            text-decoration: none; position: relative;
            transition: background .2s;
          }
          .ct-cta-card-btn:hover { background: #e08600; }

          /* Prev / Next nav */
          .ct-nav { display: flex; flex-direction: column; gap: 8px; }
          .ct-nav-card {
            display: block; padding: 13px 16px;
            border-radius: 12px; text-decoration: none;
            transition: transform .18s, opacity .18s;
          }
          .ct-nav-card:hover { transform: translateY(-1px); opacity: .9; }
          .ct-nav-card.prev { background: #f5f5f5; border: 1px solid #e8e8e8; }
          .ct-nav-card.next { background: linear-gradient(135deg, #0F3460 0%, #1a4a7a 100%); }
          .ct-nav-lbl { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; margin-bottom: 4px; }
          .ct-nav-card.prev .ct-nav-lbl { color: #aaa; }
          .ct-nav-card.next .ct-nav-lbl { color: rgba(255,255,255,.45); }
          .ct-nav-ttl { font-size: 12px; font-weight: 700; line-height: 1.4; }
          .ct-nav-card.prev .ct-nav-ttl { color: #111; }
          .ct-nav-card.next .ct-nav-ttl { color: #fff; }

          /* Back link */
          .ct-back {
            display: flex; align-items: center; gap: 6px;
            font-size: 12px; font-weight: 600; color: #aaa;
            text-decoration: none; padding: 4px 0; transition: color .18s;
          }
          .ct-back:hover { color: #111; }

          /* ── CTA ── */
          .ct-cta {
            background: #0A1628;
            padding: 96px 64px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .ct-cta-grid {
            position: absolute; inset: 0; pointer-events: none;
            background-image:
              linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
            background-size: 60px 60px;
          }
          .ct-cta-inner { max-width: 620px; margin: 0 auto; position: relative; z-index: 1; }
          .ct-cta-kicker {
            font-size: 11px; font-weight: 700; letter-spacing: .2em;
            text-transform: uppercase; color: #FE9700; margin-bottom: 18px;
          }
          .ct-cta h2 {
            font-size: clamp(1.8rem, 3vw, 2.6rem);
            font-weight: 800; color: #fff;
            margin: 0 0 16px; line-height: 1.2;
          }
          .ct-cta p {
            font-size: 16px; color: rgba(255,255,255,0.5);
            margin: 0 auto 36px; line-height: 1.75; max-width: 440px;
          }
          .ct-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
          .ct-cta-b1 {
            display: inline-flex; align-items: center; gap: 10px;
            background: #FE9700; color: #fff;
            padding: 14px 28px; border-radius: 6px;
            font-size: 14px; font-weight: 700; text-decoration: none;
            transition: background .2s;
          }
          .ct-cta-b1:hover { background: #e08600; }
          .ct-cta-b2 {
            display: inline-flex; align-items: center; gap: 10px;
            color: rgba(255,255,255,0.65);
            padding: 14px 28px; border-radius: 6px;
            font-size: 14px; font-weight: 700; text-decoration: none;
            border: 1.5px solid rgba(255,255,255,.14);
            transition: border-color .2s, color .2s;
          }
          .ct-cta-b2:hover { border-color: rgba(255,255,255,.4); color: #fff; }

          /* ── Responsive ── */
          @media (max-width: 960px) {
            .ct-body { grid-template-columns: 1fr; gap: 48px; padding: 48px 24px 64px; }
            .ct-sidebar { position: static; }
            .ct-meta-inner { padding: 0 24px; }
            .ct-meta-item { padding: 20px 24px 20px 0; margin-right: 24px; }
            .ct-breadcrumb { padding: 0 24px; }
            .ct-feature-grid { grid-template-columns: 1fr; }
          }
          @media (max-width: 600px) {
            .ct-meta-inner { padding: 0 16px; }
            .ct-meta-item { padding: 16px 16px 16px 0; margin-right: 16px; border-right: none; width: 50%; }
            .ct-body { padding: 36px 16px 48px; }
            .ct-cta { padding: 64px 24px; }
            .ct-breadcrumb { padding: 0 16px; }
          }
        `}</style>
      </Head>

      {/* ── HERO ── */}
      <section className="ct-hero">
        <img
          src={project.image}
          alt={`${project.title} — Case Study | 1Solutions`}
          className="ct-hero-img"
        />
        <div className="ct-hero-overlay" />
        <nav className="ct-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="ct-breadcrumb-sep">›</span>
          <Link href="/case-studies">Case Studies</Link>
          <span className="ct-breadcrumb-sep">›</span>
          <span style={{ color: '#fff' }}>{project.title}</span>
        </nav>
      </section>

      {/* ── META STRIP ── */}
      <div className="ct-meta-strip">
        <div className="ct-meta-inner">
          <div className="ct-meta-item">
            <div className="ct-meta-label">Client</div>
            <div className="ct-meta-value">{project.title}</div>
          </div>
          <div className="ct-meta-item">
            <div className="ct-meta-label">Industry</div>
            <div className="ct-meta-value">{project.industry}</div>
          </div>
          <div className="ct-meta-item">
            <div className="ct-meta-label">Category</div>
            <div className="ct-meta-value">{project.category}</div>
          </div>
          <div className="ct-meta-item">
            <div className="ct-meta-tags">
              {project.tech.map(t => {
                const s = getTagStyle(t);
                return (
                  <span key={t} className="ct-meta-tag" style={{ background: s.bg, color: s.color, borderColor: s.border }}>
                    {t}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="ct-body">

        {/* ── LEFT: Content ── */}
        <div className="ct-content">

          {/* Overview */}
          <div className="ct-section">
            <p className="ct-eyebrow">Project Overview</p>
            <h2>About This Project</h2>
            <p>{project.desc}</p>
            <p>{getOverviewP2(project)}</p>
          </div>

          {/* What We Delivered */}
          <div className="ct-section">
            <p className="ct-eyebrow">Our Approach</p>
            <h2>What We Built</h2>
            <p>
              Every project at 1Solutions starts with listening — understanding your business, your audience, and your goals before writing a single line of code or designing a single screen.
              Here&rsquo;s what we delivered for {project.title}:
            </p>
            <div className="ct-feature-grid">
              {features.map(f => (
                <div key={f.title} className="ct-feature-card">
                  <div className="ct-feature-icon" style={{ background: f.bg }}>
                    <span style={{ fontSize: '20px' }}>{f.icon}</span>
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className="ct-section">
            <p className="ct-eyebrow">Technology &amp; Tools</p>
            <h2>What We Built With</h2>
            <p>Our technology choices are deliberate — we pick the right tool for the job, not the most fashionable one.</p>
            <div className="ct-tech-list">
              {project.tech.map(t => (
                <span key={t} className="ct-tech-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Live site link if available */}
          {project.liveUrl && (
            <div className="ct-section">
              <p className="ct-eyebrow">Live Project</p>
              <h2>See It in the Wild</h2>
              <p>The project is live and serving real users. Visit the site to see the finished product.</p>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="ct-live-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Visit Live Website
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          )}

        </div>

        {/* ── RIGHT: Sidebar ── */}
        <aside className="ct-sidebar">

          {/* Project Snapshot — dark navy card */}
          <div className="ct-snap">
            <div className="ct-snap-kicker">Project Snapshot</div>
            <div className="ct-snap-grid">
              {[
                {
                  label: 'Industry', value: project.industry,
                  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FE9700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/></svg>
                },
                {
                  label: 'Category', value: project.category,
                  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FE9700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                },
                {
                  label: 'Platform', value: getPlatform(project.tech),
                  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FE9700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                },
                {
                  label: 'Year', value: '2024',
                  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FE9700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                },
              ].map(s => (
                <div key={s.label} className="ct-snap-item">
                  <div className="ct-snap-icon">{s.icon}</div>
                  <div className="ct-snap-label">{s.label}</div>
                  <div className="ct-snap-val">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack — coloured pills */}
          <div className="ct-tech">
            <div className="ct-tech-hdr">Built With</div>
            <div className="ct-tech-pills">
              {project.tech.map(t => {
                const ts = getTagStyle(t);
                return (
                  <span key={t} className="ct-sb-pill" style={{ background: ts.bg, color: ts.color, borderColor: ts.border }}>
                    {t}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Live Site — green gradient card */}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="ct-live">
              <div className="ct-live-lbl">Live Website</div>
              <div className="ct-live-title">See it in action ↗</div>
              <div className="ct-live-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Open Live Site
              </div>
            </a>
          )}

          {/* CTA — deep blue gradient card */}
          <div className="ct-cta-card">
            <div className="ct-cta-card-orb" />
            <h3>Got a project in mind?</h3>
            <p>Tell us what you need — we'll bring strategy, design, and engineering to make it happen.</p>
            <Link href="/contact-us" className="ct-cta-card-btn">
              Start Your Project
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Prev / Next navigation */}
          {(prev || next) && (
            <div className="ct-nav">
              {prev && (
                <Link href={`/case-studies/${prev.id}`} className="ct-nav-card prev">
                  <div className="ct-nav-lbl">← Previous</div>
                  <div className="ct-nav-ttl">{prev.title}</div>
                </Link>
              )}
              {next && (
                <Link href={`/case-studies/${next.id}`} className="ct-nav-card next">
                  <div className="ct-nav-lbl">Next →</div>
                  <div className="ct-nav-ttl">{next.title}</div>
                </Link>
              )}
            </div>
          )}

          {/* Back link */}
          <Link href="/case-studies" className="ct-back">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            All Case Studies
          </Link>

        </aside>
      </div>

      {/* ── CTA ── */}
      <section className="ct-cta">
        <div className="ct-cta-grid" />
        <div className="ct-cta-inner">
          <p className="ct-cta-kicker">Work With Us</p>
          <h2>Ready to Start Your Project?</h2>
          <p>
            Tell us about your goals. Our team will bring strategy, design, and engineering together to deliver real results.
          </p>
          <div className="ct-cta-btns">
            <Link href="/contact-us" className="ct-cta-b1">
              Start a Project
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/case-studies" className="ct-cta-b2">
              More Case Studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const { PROJECTS } = require('../../lib/case-studies');
  return {
    paths: PROJECTS.filter(p => p.id !== 'comtradesol').map(p => ({ params: { slug: p.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { PROJECTS } = require('../../lib/case-studies');
  const project = PROJECTS.find(p => p.id === params.slug) ?? null;
  if (!project) return { notFound: true };
  const idx = PROJECTS.indexOf(project);
  const prev = idx > 0 ? { id: PROJECTS[idx - 1].id, title: PROJECTS[idx - 1].title } : null;
  const next = idx < PROJECTS.length - 1 ? { id: PROJECTS[idx + 1].id, title: PROJECTS[idx + 1].title } : null;
  return { props: { project, prev, next } };
}
