import Head from 'next/head';
import Link from 'next/link';

const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M17 8C8 10 5.9 16.17 3.82 19.49 3.3 20.27 4.34 21.05 4.9 20.32 6.05 18.8 7.5 17.6 9.5 17c2-.6 3.5 0 5 1.5 3-3 4-7 2.5-10.5zM7.5 18C6 16.5 5 14 5 12c0-5.5 4.5-10 10-10s10 4.5 10 10c0 2-.5 3.8-1.5 5.3C21 15.5 19 14 17 14c-2 0-3.5.8-4.5 2-.5.6-.9 1.3-1.2 2H7.5z"/>
      </svg>
    ),
    title: 'Environmental Responsibility',
    color: '#44973D',
    bg: '#f0faf0',
    border: '#b8e4b5',
    points: [
      'Paperless-first operations — all documentation, contracts, and reporting are fully digital',
      'Remote-first work culture that significantly reduces commute-related carbon emissions',
      'Energy-efficient server infrastructure and preference for green-certified cloud providers',
      'Internal policy encouraging responsible e-waste disposal through certified recyclers',
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    title: 'Community Empowerment',
    color: '#114171',
    bg: '#f0f5fb',
    border: '#c0d8f0',
    points: [
      'Free digital literacy workshops for students and small business owners in underserved communities',
      'Pro-bono web development and SEO services for registered non-profits and NGOs',
      'Internship and mentorship programme for engineering students across India',
      'Annual scholarship contribution supporting underprivileged students pursuing technology education',
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
      </svg>
    ),
    title: 'Education & Skill Development',
    color: '#FE9700',
    bg: '#fff8f0',
    border: '#fde0b0',
    points: [
      'Regular knowledge-sharing sessions, tech talks, and internal certifications for all team members',
      'Dedicated learning budget per employee for online courses, conferences, and industry certifications',
      'Contribution to open-source projects to advance the broader developer community',
      'Published tutorials, blog articles, and case studies freely available to the public',
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5zm-1 5v2h2v-2h-2zm0 4v2h2v-2h-2z"/>
      </svg>
    ),
    title: 'Ethical Business Practices',
    color: '#7C3AED',
    bg: '#f5f0ff',
    border: '#d8c8f8',
    points: [
      'Transparent pricing, honest timelines, and no hidden fees — ever',
      'MSME registered and ISO 9001:2015 certified, upholding global quality management standards',
      'Strict data privacy policies aligned with GDPR principles for all client data handling',
      'Fair wages, inclusive hiring, and zero tolerance for discrimination in our workplace',
    ],
  },
];

const IMPACT_STATS = [
  { stat: '500+', label: 'Students mentored since 2015' },
  { stat: '30+', label: 'NGOs supported pro-bono' },
  { stat: '100%', label: 'Paperless operations' },
  { stat: '15+', label: 'Years of ethical practice' },
];

const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System', href: '/who-we-are' },
  { name: 'MSME Registered', desc: 'Ministry of MSME, Govt. of India', href: '/who-we-are' },
  { name: 'DMCA Protected', desc: 'Content & IP protection', href: 'https://www.dmca.com' },
];

export default function CorporateResponsibility() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1solutions.biz';

  return (
    <>
      <Head>
        <title>Corporate Responsibility | 1Solutions</title>
        <meta name="description" content="Learn how 1Solutions gives back to the community through environmental initiatives, free digital literacy programmes, ethical business practices, and skill development." />
        <link rel="canonical" href={`${siteUrl}/corporate-responsibility/`} />
        <meta property="og:title" content="Corporate Responsibility | 1Solutions" />
        <meta property="og:description" content="Our commitment to environment, community, education, and ethical business — because technology should create value for everyone." />
        <meta name="robots" content="index, follow" />
        <style>{`
          /* ── Corporate Responsibility — prefix: csr- ── */
          .csr-hero {
            background: linear-gradient(135deg, #dbeafe 0%, #d1fae5 30%, #e0f2fe 60%, #fef3c7 100%);
            padding: 80px 24px 72px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .csr-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
          .csr-orb-1 { width: 500px; height: 500px; background: rgba(68,151,61,0.08); top: -120px; right: -100px; }
          .csr-orb-2 { width: 350px; height: 350px; background: rgba(17,65,113,0.07); bottom: -60px; left: -60px; }
          .csr-hero-inner {
            position: relative;
            z-index: 1;
            max-width: 760px;
            margin: 0 auto;
          }
          .csr-tag {
            display: inline-block;
            background: rgba(68,151,61,0.10);
            color: #166534;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 6px 16px;
            border-radius: 50px;
            border: 1px solid rgba(68,151,61,0.20);
            margin-bottom: 20px;
          }
          .csr-hero h1 {
            font-size: clamp(2rem, 5vw, 3.2rem);
            font-weight: 900;
            background: linear-gradient(90deg, #0F3460 0%, #16a34a 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 0 0 18px;
            line-height: 1.15;
          }
          .csr-hero p {
            font-size: 1.1rem;
            color: #3A507A;
            max-width: 620px;
            margin: 0 auto;
            line-height: 1.7;
          }

          /* Impact stats bar */
          .csr-stats {
            background: #fff;
            border-bottom: 1px solid #e8ecf0;
          }
          .csr-stats-inner {
            max-width: 960px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
          }
          .csr-stat {
            padding: 28px 20px;
            text-align: center;
            border-right: 1px solid #e8ecf0;
          }
          .csr-stat:last-child { border-right: none; }
          .csr-stat-num {
            font-size: 1.8rem;
            font-weight: 800;
            color: #114171;
            display: block;
            line-height: 1;
            margin-bottom: 6px;
          }
          .csr-stat-label {
            font-size: 0.8rem;
            color: #6b7280;
            font-weight: 500;
          }

          /* Page layout */
          .csr-page {
            max-width: 1100px;
            margin: 0 auto;
            padding: 64px 24px;
          }

          /* Mission block */
          .csr-mission {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
            align-items: center;
            margin-bottom: 72px;
          }
          .csr-mission-text h2 {
            font-size: 1.8rem;
            font-weight: 800;
            color: #0a2540;
            margin: 0 0 16px;
            line-height: 1.25;
          }
          .csr-mission-text p {
            font-size: 0.97rem;
            color: #4b5563;
            line-height: 1.75;
            margin: 0 0 16px;
          }
          .csr-mission-text p:last-child { margin: 0; }
          .csr-mission-visual {
            background: linear-gradient(135deg, #f0f5fb, #e8f4e8);
            border-radius: 16px;
            padding: 40px 32px;
            text-align: center;
          }
          .csr-mission-quote {
            font-size: 1.15rem;
            font-style: italic;
            color: #114171;
            font-weight: 600;
            line-height: 1.6;
            margin: 0 0 16px;
          }
          .csr-mission-attr {
            font-size: 0.82rem;
            color: #6b7280;
            font-weight: 600;
          }

          /* Pillars */
          .csr-section-title {
            font-size: 1.6rem;
            font-weight: 800;
            color: #0a2540;
            margin: 0 0 8px;
          }
          .csr-section-sub {
            font-size: 0.97rem;
            color: #6b7280;
            margin: 0 0 40px;
          }
          .csr-pillars { margin-bottom: 72px; }
          .csr-pillar {
            border-radius: 16px;
            border: 1px solid;
            padding: 36px;
            margin-bottom: 24px;
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 28px;
            align-items: start;
          }
          .csr-pillar-icon {
            width: 56px;
            height: 56px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .csr-pillar-content h3 {
            font-size: 1.1rem;
            font-weight: 700;
            color: #0a2540;
            margin: 0 0 16px;
          }
          .csr-pillar-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 32px;
          }
          .csr-pillar-list li {
            font-size: 0.88rem;
            color: #4b5563;
            line-height: 1.55;
            padding-left: 16px;
            position: relative;
          }
          .csr-pillar-list li::before {
            content: '✓';
            position: absolute;
            left: 0;
            font-weight: 700;
            font-size: 0.8rem;
          }

          /* Certifications */
          .csr-certs {
            background: #f8fafc;
            border: 1px solid #e8ecf0;
            border-radius: 16px;
            padding: 40px;
            margin-bottom: 64px;
          }
          .csr-certs h2 {
            font-size: 1.2rem;
            font-weight: 800;
            color: #0a2540;
            margin: 0 0 24px;
          }
          .csr-certs-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          .csr-cert-card {
            background: #fff;
            border: 1px solid #e8ecf0;
            border-radius: 10px;
            padding: 20px 24px;
            text-decoration: none;
            transition: box-shadow 0.2s;
          }
          .csr-cert-card:hover { box-shadow: 0 4px 16px rgba(17,65,113,0.08); }
          .csr-cert-name {
            font-size: 0.95rem;
            font-weight: 800;
            color: #114171;
            display: block;
            margin-bottom: 4px;
          }
          .csr-cert-desc {
            font-size: 0.82rem;
            color: #6b7280;
          }

          /* CTA */
          .csr-cta {
            background: linear-gradient(135deg, #114171, #1a5fa8);
            border-radius: 16px;
            padding: 48px 40px;
            text-align: center;
            color: #fff;
          }
          .csr-cta h2 {
            font-size: 1.6rem;
            font-weight: 800;
            margin: 0 0 12px;
          }
          .csr-cta p {
            font-size: 0.97rem;
            color: rgba(255,255,255,0.75);
            margin: 0 0 28px;
            max-width: 520px;
            margin-left: auto;
            margin-right: auto;
          }
          .csr-cta-btns {
            display: flex;
            gap: 14px;
            justify-content: center;
            flex-wrap: wrap;
          }
          .csr-btn-primary {
            background: #FE9700;
            color: #fff;
            font-weight: 700;
            font-size: 0.9rem;
            padding: 13px 28px;
            border-radius: 8px;
            text-decoration: none;
            transition: background 0.2s;
          }
          .csr-btn-primary:hover { background: #e08800; }
          .csr-btn-outline {
            background: rgba(255,255,255,0.12);
            border: 1px solid rgba(255,255,255,0.35);
            color: #fff;
            font-weight: 600;
            font-size: 0.9rem;
            padding: 13px 28px;
            border-radius: 8px;
            text-decoration: none;
            transition: background 0.2s;
          }
          .csr-btn-outline:hover { background: rgba(255,255,255,0.2); }

          @media (max-width: 900px) {
            .csr-mission { grid-template-columns: 1fr; gap: 32px; }
            .csr-stats-inner { grid-template-columns: repeat(2, 1fr); }
            .csr-stat:nth-child(2) { border-right: none; }
            .csr-certs-grid { grid-template-columns: 1fr; }
            .csr-pillar { grid-template-columns: 1fr; gap: 16px; }
          }
          @media (max-width: 600px) {
            .csr-hero { padding: 56px 20px 52px; }
            .csr-page { padding: 40px 18px; }
            .csr-pillar { padding: 24px 20px; }
            .csr-pillar-list { grid-template-columns: 1fr; }
            .csr-cta { padding: 36px 24px; }
            .csr-certs { padding: 28px 20px; }
          }
        `}</style>
      </Head>

      {/* Hero */}
      <section className="csr-hero">
        <div className="csr-orb csr-orb-1" />
        <div className="csr-orb csr-orb-2" />
        <div className="csr-hero-inner">
          <span className="csr-tag">Corporate Responsibility</span>
          <h1>Technology with a Purpose</h1>
          <p>We believe businesses have a responsibility that extends beyond their clients. Here's how 1Solutions gives back to the community, the environment, and the next generation of tech talent.</p>
        </div>
      </section>

      {/* Impact stats */}
      <div className="csr-stats">
        <div className="csr-stats-inner">
          {IMPACT_STATS.map(({ stat, label }) => (
            <div key={label} className="csr-stat">
              <span className="csr-stat-num">{stat}</span>
              <span className="csr-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="csr-page">

        {/* Mission */}
        <div className="csr-mission">
          <div className="csr-mission-text">
            <h2>Our Commitment to Responsible Business</h2>
            <p>Since 2009, 1Solutions has grown from a small web development studio into a full-service digital agency. Along the way, we've stayed rooted in a belief that long-term business success and positive social impact are not competing priorities — they're complementary.</p>
            <p>Our CSR commitments aren't a marketing exercise. They are embedded in how we hire, how we operate, how we spend our profits, and how we measure success.</p>
            <p>We hold ourselves to the same standards we'd recommend to any of our clients: transparent, accountable, and always improving.</p>
          </div>
          <div className="csr-mission-visual">
            <p className="csr-mission-quote">"We build digital solutions for businesses, but our bigger mission is to build a more digitally empowered society — one community at a time."</p>
            <span className="csr-mission-attr">— 1Solutions Leadership Team</span>
          </div>
        </div>

        {/* Four pillars */}
        <div className="csr-pillars">
          <h2 className="csr-section-title">Our Four CSR Pillars</h2>
          <p className="csr-section-sub">Every initiative we run falls under one of these four commitments.</p>

          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="csr-pillar"
              style={{ background: p.bg, borderColor: p.border }}
            >
              <div className="csr-pillar-icon" style={{ background: `${p.color}18`, color: p.color }}>
                {p.icon}
              </div>
              <div className="csr-pillar-content">
                <h3 style={{ color: p.color }}>{p.title}</h3>
                <ul className="csr-pillar-list">
                  {p.points.map((pt) => (
                    <li key={pt} style={{ '--check-color': p.color }}>
                      <style>{`.csr-pillar-list li[data-pillar="${p.title}"]::before { color: ${p.color}; }`}</style>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="csr-certs">
          <h2>Recognised Certifications & Registrations</h2>
          <div className="csr-certs-grid">
            {CERTIFICATIONS.map((c) => (
              <a key={c.name} href={c.href} className="csr-cert-card" target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                <span className="csr-cert-name">{c.name}</span>
                <span className="csr-cert-desc">{c.desc}</span>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="csr-cta">
          <h2>Partner with Us for Good</h2>
          <p>If you're an NGO, educational institution, or community organisation looking for digital support, we'd love to hear from you.</p>
          <div className="csr-cta-btns">
            <Link href="/partner-with-us" className="csr-btn-primary">Explore Partnerships</Link>
            <Link href="/contact-us" className="csr-btn-outline">Get in Touch</Link>
          </div>
        </div>

      </div>
    </>
  );
}
