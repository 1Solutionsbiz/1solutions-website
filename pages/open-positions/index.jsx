'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const JOBS = [
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    dept: 'Engineering',
    deptColor: '#114171',
    deptBg: 'rgba(17,65,113,0.08)',
    exp: '1–3 Years',
    type: 'Full-time',
    location: 'New Delhi (On-site / Hybrid)',
    tag: 'Open',
    tagColor: '#059669',
    tagBg: '#f0fdf4',
    tagBorder: '#86efac',
    brief:
      "Build web applications for clients across the US, Canada, and Australia — working across frontend and backend on a modern, varied stack.",
    about:
      "We're looking for a talented Full Stack Developer to join our engineering team. You'll work on diverse projects — WordPress-powered business sites, custom Laravel/Python web apps, React frontends, and API integrations — for clients who expect Silicon Valley quality at every level.",
    responsibilities: [
      'Develop responsive, high-performance web applications (frontend + backend)',
      'Work across technologies including React / Next.js, PHP / Laravel, Python / Django, Node.js, MySQL',
      'Translate Figma designs into pixel-perfect, accessible HTML/CSS/JS',
      'Build and consume REST APIs and third-party integrations',
      'Write clean, maintainable, well-tested code and participate in code reviews',
      'Debug, profile, and optimise existing applications for speed and reliability',
    ],
    requirements: [
      '1–3 years of hands-on web development experience',
      'Proficiency in HTML5, CSS3, JavaScript (ES6+)',
      'Experience with at least one backend language (PHP, Python, or Node.js)',
      'Familiarity with React, Vue, or a similar frontend framework',
      'Working knowledge of relational databases (MySQL or PostgreSQL)',
      'Understanding of REST APIs and Git version control',
      'Comfortable communicating in English (all client contact is in English)',
    ],
    niceToHave: [
      'Next.js, Laravel, or Django experience',
      'WordPress theme / plugin development',
      'Docker, AWS, or cloud deployment experience',
    ],
  },
  {
    id: 'social-media-manager',
    title: 'Social Media Manager',
    dept: 'Digital Marketing',
    deptColor: '#7c3aed',
    deptBg: 'rgba(124,58,237,0.08)',
    exp: '2–3 Years',
    type: 'Full-time',
    location: 'New Delhi (On-site)',
    tag: 'Open',
    tagColor: '#059669',
    tagBg: '#f0fdf4',
    tagBorder: '#86efac',
    brief:
      "Own strategy, content, and performance reporting for social accounts across 5–10 client brands on Instagram, LinkedIn, Facebook, and X.",
    about:
      "We manage social media for clients across industries including e-commerce, SaaS, healthcare, and real estate. As Social Media Manager, you'll be the voice behind multiple brands — creating content that drives real engagement and measurable business outcomes, not just vanity metrics.",
    responsibilities: [
      'Manage and grow social media profiles for 5–10 active client accounts',
      'Develop monthly content calendars aligned with each client\'s brand and goals',
      'Write compelling English-language captions; create graphics in Canva or Adobe tools',
      'Plan, launch, and optimise paid social campaigns on Meta Ads and LinkedIn Ads',
      'Track platform metrics and deliver monthly performance reports with clear insights',
      'Monitor trends, hashtags, and competitor activity to keep clients ahead of the curve',
      'Coordinate with the design and content team on creative assets and campaign briefs',
    ],
    requirements: [
      '2–3 years of social media management experience (agency background preferred)',
      'Strong English copywriting skills — you can match any brand voice',
      'Hands-on experience with Meta Ads (Facebook + Instagram campaigns)',
      'Proficiency with scheduling tools such as Buffer, Hootsuite, or Sprout Social',
      'Analytical — comfortable pulling data from Meta Business Suite and LinkedIn Analytics',
      'Highly organised: able to juggle content calendars for multiple clients simultaneously',
    ],
    niceToHave: [
      'LinkedIn Ads campaign management',
      'Video editing for Reels and YouTube Shorts',
      'Google Analytics 4 knowledge',
      'Experience with US, Canadian, or Australian brand accounts',
    ],
  },
  {
    id: 'business-development-manager',
    title: 'Business Development Manager',
    dept: 'Sales & Growth',
    deptColor: '#b45309',
    deptBg: 'rgba(180,83,9,0.08)',
    exp: '3–5 Years',
    type: 'Full-time',
    location: 'New Delhi (On-site)',
    tag: 'Urgent',
    tagColor: '#dc2626',
    tagBg: '#fef2f2',
    tagBorder: '#fca5a5',
    brief:
      "Drive new business from the US, Canada, and Australia — owning the full sales cycle from prospecting to signed contract, with clear revenue targets and strong team support.",
    about:
      "1Solutions has grown to 500+ clients over 15 years almost entirely on referrals and organic search. We're now ready to invest in outbound growth. As our Business Development Manager, you'll build and own the outbound engine — identifying the right prospects, running discovery calls with decision-makers, and closing deals for web development and digital marketing services.",
    responsibilities: [
      'Generate qualified leads via LinkedIn outreach, email campaigns, and industry networking',
      'Conduct discovery calls and deliver tailored service proposals to prospective clients',
      'Manage the full B2B sales cycle from first contact to signed agreement',
      'Meet and exceed monthly and quarterly revenue targets (OKRs set collaboratively)',
      'Maintain deal progress in the CRM (HubSpot) with accurate, up-to-date records',
      'Collaborate with the project and technical teams to scope and price proposals correctly',
      'Identify upsell and cross-sell opportunities within the existing 500+ client base',
    ],
    requirements: [
      '3–5 years of B2B sales experience, preferably in IT services or a digital agency',
      'Proven record of consistently meeting or exceeding revenue targets',
      'Excellent spoken and written English — you\'ll pitch to US, Canadian, and Australian buyers',
      'Strong interpersonal skills and the ability to handle objections with confidence',
      'Experience with CRM tools (HubSpot, Salesforce, or Zoho)',
      'Self-motivated, target-oriented, and comfortable managing your own pipeline',
    ],
    niceToHave: [
      'Prior experience selling web development, SEO, or digital marketing services',
      'Existing client network in English-speaking western markets',
      'Familiarity with LinkedIn Sales Navigator',
    ],
  },
  {
    id: 'digital-marketing-trainee',
    title: 'Digital Marketing Trainee',
    dept: 'Digital Marketing',
    deptColor: '#059669',
    deptBg: 'rgba(5,150,105,0.08)',
    exp: 'Fresher / 0–1 Year',
    type: 'Full-time · Trainee',
    location: 'New Delhi (On-site)',
    tag: 'Fresher',
    tagColor: '#2563eb',
    tagBg: '#eff6ff',
    tagBorder: '#93c5fd',
    brief:
      "An ideal first role for fresh graduates who want to learn SEO, PPC, content, and social media on live client campaigns — guided by a team with 15 years of industry experience.",
    about:
      "This is our structured entry-level programme designed to turn motivated graduates into well-rounded digital marketers in 12 months. You won't be fetching coffee — from week one you'll be working on real campaigns under close mentorship. Fast learners progress to executive-level roles quickly.",
    responsibilities: [
      'Assist the SEO team with keyword research, on-page optimisation audits, and rank tracking',
      'Support PPC campaign setup and monitoring on Google Ads and Meta Ads under senior guidance',
      'Help create, schedule, and report on social media content for client accounts',
      'Conduct competitor research, content gap analysis, and market trend reports',
      'Assist with writing SEO-optimised blog posts, landing page copy, and email briefs',
      'Learn and use tools including Google Analytics 4, Search Console, SEMrush, and Ahrefs',
    ],
    requirements: [
      "Bachelor's degree (completed or final year) in Marketing, Business, Mass Communication, or related",
      'Genuine interest in digital marketing and eagerness to learn quickly',
      'Strong written English — ability to write clear, engaging content',
      'Comfortable with data: able to read a spreadsheet and spot patterns',
      'Proactive, detail-oriented, and receptive to feedback',
    ],
    niceToHave: [
      'Any internship or college project in SEO, social media, or PPC',
      'Google Ads or Google Analytics certification (free student programmes count)',
      'Active personal blog, LinkedIn presence, or social media portfolio',
    ],
  },
];

const STATS = [
  { val: '4', label: 'Open Positions' },
  { val: '15+', label: 'Years in Business' },
  { val: '50+', label: 'Team Members' },
  { val: 'New Delhi', label: 'Our Home Base' },
];

export default function OpenPositions() {
  const [expanded, setExpanded] = useState(null);

  function toggle(id) {
    setExpanded((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <Head>
        <title>Open Positions | We&apos;re Hiring at 1Solutions</title>
        <meta
          name="description"
          content="1Solutions is hiring a Full Stack Developer, Social Media Manager, Business Development Manager, and Digital Marketing Trainee in New Delhi. Apply online today."
        />
        <link rel="canonical" href="https://www.1solutions.biz/open-positions/" />
        <style>{`
          /* ─── Base ─── */
          .op-page {
            font-family: 'Inter', sans-serif;
            color: #1a1a2e;
            overflow-x: hidden;
          }
          .op-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            pointer-events: none;
          }

          /* ─── Hero ─── */
          .op-hero {
            position: relative;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            padding: 100px 24px 80px;
            text-align: center;
            overflow: hidden;
          }
          .op-orb-1 { width: 600px; height: 600px; background: rgba(17,65,113,0.07); top: -150px; right: -100px; }
          .op-orb-2 { width: 450px; height: 450px; background: rgba(254,151,0,0.09); bottom: -80px; left: -80px; }
          .op-hero-inner {
            position: relative;
            z-index: 1;
            max-width: 720px;
            margin: 0 auto;
          }
          .op-hero-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(17,65,113,0.15);
            border-radius: 100px;
            padding: 6px 18px;
            font-size: 12px;
            font-weight: 700;
            color: #114171;
            margin-bottom: 24px;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }
          .op-pill-dot {
            width: 7px; height: 7px;
            background: #44973D;
            border-radius: 50%;
            animation: op-pulse 2s ease-in-out infinite;
          }
          @keyframes op-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(0.85); }
          }
          .op-hero h1 {
            font-size: clamp(2.4rem, 5vw, 3.8rem);
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.03em;
            color: #0F1F40;
            margin: 0 0 20px;
          }
          .op-gradient-text {
            background: linear-gradient(90deg, #114171 0%, #FE9700 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .op-hero-sub {
            font-size: 1.08rem;
            line-height: 1.7;
            color: #374151;
            margin-bottom: 40px;
          }
          .op-stats-row {
            display: flex;
            justify-content: center;
            gap: 2px;
            flex-wrap: wrap;
            max-width: 600px;
            margin: 0 auto;
            border-radius: 18px;
            overflow: hidden;
            border: 1px solid rgba(17,65,113,0.1);
          }
          .op-stat {
            flex: 1;
            min-width: 110px;
            background: rgba(255,255,255,0.7);
            backdrop-filter: blur(10px);
            padding: 18px 14px;
            text-align: center;
          }
          .op-stat-val {
            font-size: 1.5rem;
            font-weight: 800;
            color: #114171;
            line-height: 1;
            margin-bottom: 4px;
          }
          .op-stat-label { font-size: 0.72rem; color: #6b7280; font-weight: 600; }

          /* ─── Jobs section ─── */
          .op-section { padding: 80px 24px; }
          .op-container { max-width: 900px; margin: 0 auto; }
          .op-section-head { margin-bottom: 40px; }
          .op-eyebrow {
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #FE9700;
            margin-bottom: 10px;
          }
          .op-heading {
            font-size: clamp(1.75rem, 3vw, 2.4rem);
            font-weight: 800;
            line-height: 1.18;
            letter-spacing: -0.025em;
            color: #0F1F40;
            margin: 0;
          }

          /* ─── Job Cards ─── */
          .op-jobs-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .op-job-card {
            background: rgba(255,255,255,0.88);
            backdrop-filter: blur(14px);
            border: 1.5px solid rgba(17,65,113,0.1);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 2px 20px rgba(17,65,113,0.06),
                        inset 0 1px 0 rgba(255,255,255,0.95);
            transition: border-color 0.25s, box-shadow 0.25s;
          }
          .op-job-card:hover {
            border-color: rgba(17,65,113,0.22);
            box-shadow: 0 8px 32px rgba(17,65,113,0.1),
                        inset 0 1px 0 rgba(255,255,255,0.95);
          }
          .op-job-card.op-expanded {
            border-color: rgba(17,65,113,0.3);
          }

          /* Card header — always visible */
          .op-card-header {
            padding: 28px 32px;
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 20px;
            align-items: center;
            cursor: pointer;
            user-select: none;
          }
          .op-card-header:focus-visible {
            outline: 2px solid #114171;
            outline-offset: -2px;
            border-radius: 18px;
          }
          .op-dept-badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.07em;
            text-transform: uppercase;
            padding: 4px 10px;
            border-radius: 100px;
            margin-bottom: 10px;
          }
          .op-job-title {
            font-size: 1.35rem;
            font-weight: 800;
            color: #0F1F40;
            letter-spacing: -0.02em;
            margin-bottom: 12px;
            line-height: 1.2;
          }
          .op-meta-row {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            align-items: center;
          }
          .op-meta-chip {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 0.78rem;
            color: #4b5563;
            background: #f3f4f6;
            padding: 4px 10px;
            border-radius: 100px;
            font-weight: 500;
          }
          .op-meta-chip svg { flex-shrink: 0; }
          .op-tag-chip {
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            padding: 3px 10px;
            border-radius: 100px;
            border: 1px solid;
          }
          .op-card-right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 12px;
            flex-shrink: 0;
          }
          .op-toggle-btn {
            width: 40px; height: 40px;
            border-radius: 50%;
            background: rgba(17,65,113,0.07);
            border: none;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer;
            transition: background 0.2s, transform 0.3s;
            color: #114171;
          }
          .op-toggle-btn.op-open { background: #114171; color: #fff; }
          .op-toggle-btn.op-open svg { transform: rotate(180deg); }
          .op-toggle-btn svg { transition: transform 0.3s ease; }

          /* Card brief — visible in collapsed state */
          .op-card-brief {
            padding: 0 32px 24px;
            font-size: 0.95rem;
            line-height: 1.68;
            color: #4b5563;
            border-top: 1px solid rgba(17,65,113,0.06);
            padding-top: 20px;
          }

          /* Expanded body */
          .op-card-body {
            border-top: 1px solid rgba(17,65,113,0.08);
            padding: 28px 32px 32px;
            display: none;
          }
          .op-card-body.op-visible { display: block; }
          .op-about-text {
            font-size: 0.97rem;
            line-height: 1.72;
            color: #374151;
            margin-bottom: 28px;
          }
          .op-detail-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 28px;
          }
          .op-detail-col h4 {
            font-size: 0.78rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #6b7280;
            margin: 0 0 12px;
          }
          .op-detail-list {
            list-style: none;
            padding: 0; margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .op-detail-list li {
            font-size: 0.88rem;
            color: #374151;
            line-height: 1.5;
            display: flex;
            align-items: flex-start;
            gap: 8px;
          }
          .op-detail-list li::before {
            content: '';
            width: 6px; height: 6px;
            border-radius: 50%;
            background: #114171;
            flex-shrink: 0;
            margin-top: 6px;
          }
          .op-nice-wrap {
            background: rgba(17,65,113,0.04);
            border: 1px solid rgba(17,65,113,0.08);
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 28px;
          }
          .op-nice-wrap h4 {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #9ca3af;
            margin: 0 0 10px;
          }
          .op-nice-list {
            list-style: none;
            padding: 0; margin: 0;
            display: flex; flex-wrap: wrap; gap: 8px;
          }
          .op-nice-list li {
            font-size: 0.82rem;
            color: #4b5563;
            background: rgba(255,255,255,0.8);
            border: 1px solid rgba(17,65,113,0.12);
            border-radius: 100px;
            padding: 4px 12px;
            display: flex; align-items: center; gap: 5px;
          }
          .op-nice-list li::before {
            content: '+';
            color: #FE9700;
            font-weight: 800;
            font-size: 0.9rem;
          }
          .op-apply-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap;
            padding-top: 20px;
            border-top: 1px solid rgba(17,65,113,0.08);
          }
          .op-apply-note {
            font-size: 0.83rem;
            color: #6b7280;
            line-height: 1.5;
          }
          .op-apply-note strong { color: #0F1F40; }
          .op-apply-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #114171;
            color: #fff;
            padding: 13px 28px;
            border-radius: 100px;
            font-weight: 700;
            font-size: 0.93rem;
            text-decoration: none;
            transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
            white-space: nowrap;
          }
          .op-apply-btn:hover {
            background: #0d3260;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(17,65,113,0.28);
          }

          /* ─── Bottom CTA ─── */
          .op-cta {
            background: #0F1F40;
            padding: 72px 24px;
            text-align: center;
          }
          .op-cta-eyebrow {
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #FE9700;
            margin-bottom: 14px;
          }
          .op-cta-title {
            font-size: clamp(1.7rem, 3vw, 2.4rem);
            font-weight: 800;
            color: #fff;
            letter-spacing: -0.025em;
            margin-bottom: 16px;
          }
          .op-cta-sub {
            font-size: 1rem;
            color: rgba(255,255,255,0.6);
            line-height: 1.7;
            max-width: 520px;
            margin: 0 auto 36px;
          }
          .op-cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
          .op-cta-btn-primary {
            display: inline-flex; align-items: center; gap: 8px;
            background: #FE9700; color: #0F1F40; padding: 14px 30px;
            border-radius: 100px; font-weight: 700; font-size: 0.95rem;
            text-decoration: none; transition: all 0.25s;
          }
          .op-cta-btn-primary:hover { background: #e88c00; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(254,151,0,0.35); }
          .op-cta-btn-outline {
            display: inline-flex; align-items: center; gap: 8px;
            background: transparent; color: #fff; padding: 14px 30px;
            border-radius: 100px; font-weight: 700; font-size: 0.95rem;
            text-decoration: none; border: 1.5px solid rgba(255,255,255,0.25);
            transition: all 0.25s;
          }
          .op-cta-btn-outline:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.06); }

          /* ─── Responsive ─── */
          @media (max-width: 768px) {
            .op-hero { padding: 80px 20px 60px; }
            .op-section { padding: 56px 20px; }
            .op-card-header { padding: 22px 20px; grid-template-columns: 1fr; }
            .op-card-right { flex-direction: row; align-items: center; }
            .op-card-brief { padding: 0 20px 20px; padding-top: 16px; }
            .op-card-body { padding: 20px 20px 24px; }
            .op-detail-grid { grid-template-columns: 1fr; gap: 20px; }
            .op-stats-row { gap: 0; }
            .op-apply-row { flex-direction: column; align-items: flex-start; }
            .op-apply-btn { width: 100%; justify-content: center; }
          }
          @media (max-width: 480px) {
            .op-hero h1 { font-size: 2rem; }
          }
        `}</style>
      </Head>

      <div className="op-page">

        {/* ── Hero ── */}
        <section className="op-hero">
          <div className="op-orb op-orb-1" />
          <div className="op-orb op-orb-2" />
          <div className="op-hero-inner">
            <div className="op-hero-pill">
              <span className="op-pill-dot" />
              We&apos;re Hiring — 4 Open Positions
            </div>
            <h1>
              Join the team building{' '}
              <span className="op-gradient-text">great digital products</span>{' '}
              for the world.
            </h1>
            <p className="op-hero-sub">
              1Solutions is a 15-year-old web development and digital marketing agency in New Delhi.
              We work on real global projects for clients across the US, Canada, and Australia —
              and we&apos;re growing. Come build something with us.
            </p>
            <div className="op-stats-row">
              {STATS.map((s) => (
                <div key={s.label} className="op-stat">
                  <div className="op-stat-val">{s.val}</div>
                  <div className="op-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Job Listings ── */}
        <section
          className="op-section"
          style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%)' }}
        >
          <div className="op-container">
            <div className="op-section-head">
              <p className="op-eyebrow">Current Openings</p>
              <h2 className="op-heading">4 positions open right now.</h2>
            </div>

            <div className="op-jobs-list">
              {JOBS.map((job) => {
                const isOpen = expanded === job.id;
                return (
                  <div
                    key={job.id}
                    className={`op-job-card${isOpen ? ' op-expanded' : ''}`}
                  >
                    {/* Header */}
                    <div
                      className="op-card-header"
                      onClick={() => toggle(job.id)}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(job.id); } }}
                    >
                      <div>
                        <div
                          className="op-dept-badge"
                          style={{ color: job.deptColor, background: job.deptBg }}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11">
                            <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                          </svg>
                          {job.dept}
                        </div>
                        <div className="op-job-title">{job.title}</div>
                        <div className="op-meta-row">
                          <span className="op-meta-chip">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 13H11v-6h1.5v6zm0-8H11V5h1.5v2z" />
                            </svg>
                            {job.exp} experience
                          </span>
                          <span className="op-meta-chip">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                              <path d="M20 6h-2.18c.07-.44.18-.88.18-1a3 3 0 0 0-6 0 3 3 0 0 0-6 0c0 .12.11.56.18 1H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
                            </svg>
                            {job.type}
                          </span>
                          <span className="op-meta-chip">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                            </svg>
                            {job.location}
                          </span>
                          <span
                            className="op-tag-chip"
                            style={{ color: job.tagColor, background: job.tagBg, borderColor: job.tagBorder }}
                          >
                            {job.tag}
                          </span>
                        </div>
                      </div>
                      <div className="op-card-right">
                        <button
                          className={`op-toggle-btn${isOpen ? ' op-open' : ''}`}
                          aria-label={isOpen ? 'Collapse job details' : 'Expand job details'}
                          tabIndex={-1}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Brief — always shown */}
                    {!isOpen && (
                      <div className="op-card-brief">{job.brief}</div>
                    )}

                    {/* Expanded details */}
                    <div className={`op-card-body${isOpen ? ' op-visible' : ''}`}>
                      <p className="op-about-text">{job.about}</p>

                      <div className="op-detail-grid">
                        <div className="op-detail-col">
                          <h4>Responsibilities</h4>
                          <ul className="op-detail-list">
                            {job.responsibilities.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="op-detail-col">
                          <h4>Requirements</h4>
                          <ul className="op-detail-list">
                            {job.requirements.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="op-nice-wrap">
                        <h4>Nice to Have</h4>
                        <ul className="op-nice-list">
                          {job.niceToHave.map((n, i) => (
                            <li key={i}>{n}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="op-apply-row">
                        <div className="op-apply-note">
                          <strong>To apply:</strong> click the button and select{' '}
                          <strong>&ldquo;{job.title}&rdquo;</strong> from the position dropdown.
                        </div>
                        <Link
                          href={`/apply-online/?position=${encodeURIComponent(job.title)}`}
                          className="op-apply-btn"
                        >
                          Apply for this Role
                          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="op-cta">
          <p className="op-cta-eyebrow">Don&apos;t see the right fit?</p>
          <h2 className="op-cta-title">Send us a general application.</h2>
          <p className="op-cta-sub">
            We keep strong profiles on file and reach out when something opens up. If you&apos;re good,
            we want to hear from you regardless of whether a matching role is listed right now.
          </p>
          <div className="op-cta-actions">
            <Link href="/apply-online/" className="op-cta-btn-primary">
              Submit General Application
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
              </svg>
            </Link>
            <Link href="/who-we-are/" className="op-cta-btn-outline">
              About 1Solutions
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
