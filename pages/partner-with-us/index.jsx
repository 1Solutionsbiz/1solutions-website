'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const PARTNER_TYPES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M9.5 6.5v3h-3v-3h3M11 5H5v6h6V5zm-1.5 9.5v3h-3v-3h3M11 13H5v6h6v-6zm6.5-6.5v3h-3v-3h3M19 5h-6v6h6V5zm-6 8h1.5v1.5H13V13zm1.5 1.5H16V16h-1.5v-1.5zM16 13h1.5v1.5H16V13zm-3 3h1.5v1.5H13V16zm1.5 1.5H16V19h-1.5v-1.5zM16 16h1.5v1.5H16V16zm1.5-1.5H19V16h-1.5v-1.5zm0 3H19V19h-1.5v-1.5zM22 7h-2V4h-3V2h5v5zm0 15v-5h-2v3h-3v2h5zM2 22h5v-2H4v-3H2v5zM2 2v5h2V4h3V2H2z"/>
      </svg>
    ),
    title: 'Technology Partners',
    desc: 'SaaS platforms, API providers, and tool vendors looking to integrate with our client projects or co-build solutions.',
    benefits: ['Joint product integrations', 'Co-branded case studies', 'Technical co-development', 'Shared client referrals'],
    accent: '#114171',
    bg: '#f0f5fb',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
    ),
    title: 'Referral Partners',
    desc: 'Consultants, business coaches, and freelancers who recommend our services to their network and earn a commission on every closed deal.',
    benefits: ['Up to 10% referral commission', 'Dedicated partner dashboard', 'Co-branded proposals', 'Fast deal closing support'],
    accent: '#44973D',
    bg: '#f0faf0',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.53 15.51 1 13.5 1c-1.32 0-2.5.88-3.5 2.14C9 1.88 7.82 1 6.5 1 4.49 1 2 2.53 2 4.64c0 .48.11.92.18 1.36H0v14h24V6h-4zm-7.5-3c.83 0 1.5.67 1.5 1.5S13.33 6 12.5 6 11 5.33 11 4.5 11.67 3 12.5 3zM6.5 3C7.33 3 8 3.67 8 4.5S7.33 6 6.5 6 5 5.33 5 4.5 5.67 3 6.5 3zM2 18V8h8v10H2zm10 0V8h10v10H12z"/>
      </svg>
    ),
    title: 'Agency & White-Label Partners',
    desc: 'Marketing agencies and design studios that need a reliable development team to deliver projects under their own brand.',
    benefits: ['White-label development', 'NDA-protected delivery', 'Dedicated project managers', 'Priority capacity allocation'],
    accent: '#FE9700',
    bg: '#fff8f0',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
      </svg>
    ),
    title: 'Enterprise & Corporate Partners',
    desc: 'Large organisations, system integrators, and enterprises seeking a long-term technology delivery partner for ongoing projects.',
    benefits: ['Preferred vendor agreements', 'SLA-backed delivery', 'Dedicated account manager', 'Volume-based pricing'],
    accent: '#7C3AED',
    bg: '#f5f0ff',
  },
];

const WHY_PARTNER = [
  { title: '15+ Years of Delivery', desc: 'Over a decade and a half of on-time, on-budget project delivery across 500+ clients worldwide.' },
  { title: 'Full-Service Capability', desc: 'Web, mobile, cloud, SEO, and design — everything under one roof so your client never needs a third vendor.' },
  { title: 'Transparent Collaboration', desc: 'Real-time project updates, shared dashboards, and a single point of contact for every engagement.' },
  { title: 'NDA-First Approach', desc: 'Your client relationships stay yours. We operate fully under your brand with strict confidentiality agreements.' },
  { title: 'Flexible Engagement', desc: 'Fixed price, time & materials, or retainer — we adapt to your workflow, not the other way around.' },
  { title: 'ISO 9001:2015 Certified', desc: 'Our quality management processes meet international standards, giving you and your clients peace of mind.' },
];

const PARTNERSHIP_TYPES_FORM = [
  'Technology Partner',
  'Referral Partner',
  'Agency / White-Label Partner',
  'Enterprise / Corporate Partner',
  'NGO / Non-Profit',
  'Other',
];

const INITIAL = { name: '', company: '', email: '', phone: '', type: '', message: '', consent: false };

export default function PartnerWithUs() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1solutions.biz';

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/partner-with-us', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.message || 'Something went wrong.'); setStatus('error'); return; }
      setStatus('success');
      setForm(INITIAL);
    } catch {
      setErrorMsg('Network error. Please try again or email us directly.');
      setStatus('error');
    }
  };

  return (
    <>
      <Head>
        <title>Partner with Us | 1Solutions — Technology & Referral Partnerships</title>
        <meta name="description" content="Explore technology, referral, white-label, and enterprise partnership opportunities with 1Solutions. Let's grow together." />
        <link rel="canonical" href={`${siteUrl}/partner-with-us/`} />
        <meta property="og:title" content="Partner with Us | 1Solutions" />
        <meta property="og:description" content="Technology, referral, white-label, and enterprise partnerships. Join 1Solutions' growing partner network." />
        <meta name="robots" content="index, follow" />
        <style>{`
          /* ── Partner with Us — prefix: pwu- ── */
          .pwu-hero {
            background: linear-gradient(135deg, #0a2540 0%, #114171 55%, #1a5fa8 100%);
            padding: 80px 24px 72px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .pwu-hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse at 30% 60%, rgba(254,151,0,0.12) 0%, transparent 55%);
          }
          .pwu-hero-inner {
            position: relative;
            max-width: 760px;
            margin: 0 auto;
          }
          .pwu-tag {
            display: inline-block;
            background: rgba(254,151,0,0.18);
            color: #FE9700;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 6px 16px;
            border-radius: 50px;
            border: 1px solid rgba(254,151,0,0.35);
            margin-bottom: 20px;
          }
          .pwu-hero h1 {
            font-size: clamp(2rem, 5vw, 3.2rem);
            font-weight: 800;
            color: #fff;
            margin: 0 0 18px;
            line-height: 1.15;
          }
          .pwu-hero p {
            font-size: 1.1rem;
            color: rgba(255,255,255,0.75);
            max-width: 600px;
            margin: 0 auto 32px;
            line-height: 1.7;
          }
          .pwu-hero-cta {
            display: inline-block;
            background: #FE9700;
            color: #fff;
            font-weight: 700;
            font-size: 0.95rem;
            padding: 14px 32px;
            border-radius: 8px;
            text-decoration: none;
            transition: background 0.2s;
          }
          .pwu-hero-cta:hover { background: #e08800; }

          /* Page */
          .pwu-page {
            max-width: 1100px;
            margin: 0 auto;
            padding: 64px 24px;
          }
          .pwu-section-title {
            font-size: 1.6rem;
            font-weight: 800;
            color: #0a2540;
            margin: 0 0 8px;
          }
          .pwu-section-sub {
            font-size: 0.97rem;
            color: #6b7280;
            margin: 0 0 40px;
          }

          /* Partner type cards */
          .pwu-types-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            margin-bottom: 72px;
          }
          .pwu-type-card {
            border-radius: 16px;
            border: 1px solid;
            padding: 32px;
            transition: box-shadow 0.2s;
          }
          .pwu-type-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.08); }
          .pwu-type-icon {
            width: 52px;
            height: 52px;
            border-radius: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
          }
          .pwu-type-card h3 {
            font-size: 1.05rem;
            font-weight: 700;
            color: #0a2540;
            margin: 0 0 10px;
          }
          .pwu-type-card > p {
            font-size: 0.88rem;
            color: #4b5563;
            line-height: 1.65;
            margin: 0 0 18px;
          }
          .pwu-type-benefits {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px 16px;
          }
          .pwu-type-benefits li {
            font-size: 0.82rem;
            color: #374151;
            font-weight: 500;
            padding-left: 14px;
            position: relative;
          }
          .pwu-type-benefits li::before {
            content: '→';
            position: absolute;
            left: 0;
            font-size: 0.75rem;
          }

          /* Why partner */
          .pwu-why {
            background: #f8fafc;
            border-radius: 16px;
            padding: 48px 40px;
            margin-bottom: 72px;
          }
          .pwu-why h2 {
            font-size: 1.5rem;
            font-weight: 800;
            color: #0a2540;
            margin: 0 0 8px;
          }
          .pwu-why > p {
            font-size: 0.95rem;
            color: #6b7280;
            margin: 0 0 36px;
          }
          .pwu-why-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
          .pwu-why-item {
            background: #fff;
            border: 1px solid #e8ecf0;
            border-radius: 10px;
            padding: 22px;
          }
          .pwu-why-item h4 {
            font-size: 0.9rem;
            font-weight: 700;
            color: #114171;
            margin: 0 0 8px;
          }
          .pwu-why-item p {
            font-size: 0.83rem;
            color: #6b7280;
            line-height: 1.6;
            margin: 0;
          }

          /* Form section */
          .pwu-form-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
            align-items: start;
          }
          .pwu-form-aside h2 {
            font-size: 1.4rem;
            font-weight: 800;
            color: #0a2540;
            margin: 0 0 12px;
          }
          .pwu-form-aside p {
            font-size: 0.9rem;
            color: #6b7280;
            line-height: 1.7;
            margin: 0 0 24px;
          }
          .pwu-aside-contact {
            background: #f0f5fb;
            border-radius: 12px;
            padding: 24px;
          }
          .pwu-aside-contact h3 {
            font-size: 0.9rem;
            font-weight: 700;
            color: #114171;
            margin: 0 0 16px;
          }
          .pwu-contact-row {
            display: flex;
            gap: 10px;
            align-items: center;
            margin-bottom: 12px;
            font-size: 0.87rem;
            color: #374151;
          }
          .pwu-contact-row:last-child { margin-bottom: 0; }
          .pwu-contact-row a { color: #114171; text-decoration: none; font-weight: 600; }
          .pwu-contact-row a:hover { text-decoration: underline; }

          /* Form */
          .pwu-form {
            background: #fff;
            border: 1px solid #e8ecf0;
            border-radius: 16px;
            padding: 36px 32px;
            box-shadow: 0 4px 24px rgba(17,65,113,0.06);
          }
          .pwu-form h2 {
            font-size: 1.3rem;
            font-weight: 800;
            color: #0a2540;
            margin: 0 0 24px;
          }
          .pwu-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .pwu-field { margin-bottom: 18px; }
          .pwu-field label {
            display: block;
            font-size: 0.82rem;
            font-weight: 700;
            color: #374151;
            margin-bottom: 6px;
            letter-spacing: 0.02em;
          }
          .pwu-field label span { color: #e53e3e; margin-left: 2px; }
          .pwu-field input,
          .pwu-field select,
          .pwu-field textarea {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 0.9rem;
            color: #1a1a2e;
            background: #fafafa;
            transition: border-color 0.15s, box-shadow 0.15s;
            box-sizing: border-box;
            font-family: inherit;
          }
          .pwu-field input:focus,
          .pwu-field select:focus,
          .pwu-field textarea:focus {
            outline: none;
            border-color: #114171;
            box-shadow: 0 0 0 3px rgba(17,65,113,0.1);
            background: #fff;
          }
          .pwu-field textarea { resize: vertical; min-height: 110px; }
          .pwu-consent {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            margin-bottom: 22px;
          }
          .pwu-consent input[type="checkbox"] {
            width: 16px;
            height: 16px;
            margin-top: 2px;
            flex-shrink: 0;
            accent-color: #114171;
          }
          .pwu-consent label {
            font-size: 0.82rem;
            color: #6b7280;
            line-height: 1.55;
          }
          .pwu-submit-btn {
            width: 100%;
            background: #114171;
            color: #fff;
            font-weight: 700;
            font-size: 0.95rem;
            padding: 14px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s;
          }
          .pwu-submit-btn:hover:not(:disabled) { background: #0d3560; }
          .pwu-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
          .pwu-success-box {
            background: #ecfdf5;
            border: 1px solid #6ee7b7;
            border-radius: 12px;
            padding: 28px 24px;
            text-align: center;
          }
          .pwu-success-box h3 {
            font-size: 1.1rem;
            font-weight: 700;
            color: #065f46;
            margin: 0 0 8px;
          }
          .pwu-success-box p {
            font-size: 0.88rem;
            color: #047857;
            margin: 0;
          }
          .pwu-error-msg {
            background: #fef2f2;
            border: 1px solid #fca5a5;
            border-radius: 8px;
            padding: 12px 16px;
            font-size: 0.85rem;
            color: #dc2626;
            margin-bottom: 16px;
          }

          @media (max-width: 900px) {
            .pwu-types-grid { grid-template-columns: 1fr; }
            .pwu-why-grid { grid-template-columns: 1fr 1fr; }
            .pwu-form-section { grid-template-columns: 1fr; gap: 40px; }
            .pwu-why { padding: 32px 24px; }
          }
          @media (max-width: 600px) {
            .pwu-hero { padding: 56px 20px 52px; }
            .pwu-page { padding: 40px 18px; }
            .pwu-type-card { padding: 24px 20px; }
            .pwu-type-benefits { grid-template-columns: 1fr; }
            .pwu-why-grid { grid-template-columns: 1fr; }
            .pwu-form { padding: 24px 18px; }
            .pwu-row { grid-template-columns: 1fr; gap: 0; }
          }
        `}</style>
      </Head>

      {/* Hero */}
      <section className="pwu-hero">
        <div className="pwu-hero-inner">
          <span className="pwu-tag">Partnerships</span>
          <h1>Grow Together with 1Solutions</h1>
          <p>Whether you're an agency, consultant, technology vendor, or enterprise — there's a partnership model built for you. Let's create more value, together.</p>
          <a href="#apply" className="pwu-hero-cta">Apply to Partner →</a>
        </div>
      </section>

      <div className="pwu-page">

        {/* Partnership types */}
        <h2 className="pwu-section-title">Partnership Models</h2>
        <p className="pwu-section-sub">Choose the model that fits your business. All partnerships are built on transparency, fair terms, and mutual growth.</p>
        <div className="pwu-types-grid">
          {PARTNER_TYPES.map((pt) => (
            <div
              key={pt.title}
              className="pwu-type-card"
              style={{ background: pt.bg, borderColor: `${pt.accent}30` }}
            >
              <div className="pwu-type-icon" style={{ background: `${pt.accent}18`, color: pt.accent }}>
                {pt.icon}
              </div>
              <h3>{pt.title}</h3>
              <p>{pt.desc}</p>
              <ul className="pwu-type-benefits">
                {pt.benefits.map((b) => (
                  <li key={b} style={{ '--arrow-color': pt.accent }}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Why partner */}
        <div className="pwu-why">
          <h2>Why Partner with 1Solutions?</h2>
          <p>Here's what every partner gets from day one.</p>
          <div className="pwu-why-grid">
            {WHY_PARTNER.map((w) => (
              <div key={w.title} className="pwu-why-item">
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form + Contact */}
        <div className="pwu-form-section" id="apply">
          <div className="pwu-form-aside">
            <h2>Let's Start a Conversation</h2>
            <p>Tell us about your business and the type of partnership you're looking for. Our partnerships team will get back to you within 1–2 business days.</p>
            <div className="pwu-aside-contact">
              <h3>Prefer to reach us directly?</h3>
              <div className="pwu-contact-row">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{color:'#114171',flexShrink:0}}>
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href="mailto:info@1solutions.biz">info@1solutions.biz</a>
              </div>
              <div className="pwu-contact-row">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{color:'#114171',flexShrink:0}}>
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a href="tel:+919654327900">+91 96543 27900</a>
              </div>
              <div className="pwu-contact-row">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{color:'#114171',flexShrink:0}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                <span>Response within <strong>1–2 business days</strong></span>
              </div>
            </div>
          </div>

          <div className="pwu-form">
            <h2>Partnership Enquiry</h2>

            {status === 'success' ? (
              <div className="pwu-success-box">
                <h3>Enquiry received — thank you!</h3>
                <p>Our partnerships team will review your application and be in touch within 1–2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {status === 'error' && <p className="pwu-error-msg">{errorMsg}</p>}

                <div className="pwu-row">
                  <div className="pwu-field">
                    <label>Full Name <span>*</span></label>
                    <input type="text" value={form.name} onChange={set('name')} placeholder="John Smith" required />
                  </div>
                  <div className="pwu-field">
                    <label>Company / Organisation <span>*</span></label>
                    <input type="text" value={form.company} onChange={set('company')} placeholder="Acme Ltd." required />
                  </div>
                </div>

                <div className="pwu-row">
                  <div className="pwu-field">
                    <label>Email Address <span>*</span></label>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="john@acme.com" required />
                  </div>
                  <div className="pwu-field">
                    <label>Phone Number</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 555 000 0000" />
                  </div>
                </div>

                <div className="pwu-field">
                  <label>Partnership Type <span>*</span></label>
                  <select value={form.type} onChange={set('type')} required>
                    <option value="">Select partnership type…</option>
                    {PARTNERSHIP_TYPES_FORM.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="pwu-field">
                  <label>Tell Us About Your Business & Goals <span>*</span></label>
                  <textarea
                    value={form.message}
                    onChange={set('message')}
                    placeholder="Describe your business, what you're looking for in a partnership, and any specific goals or requirements."
                    required
                  />
                </div>

                <div className="pwu-consent">
                  <input type="checkbox" id="pwu-consent" checked={form.consent} onChange={set('consent')} required />
                  <label htmlFor="pwu-consent">
                    I consent to 1Solutions storing and processing my information to respond to this partnership enquiry. I understand my data will not be shared with third parties.
                  </label>
                </div>

                <button type="submit" className="pwu-submit-btn" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Submitting…' : 'Submit Enquiry →'}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
