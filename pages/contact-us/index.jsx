'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  'WordPress Development',
  'WooCommerce / E-Commerce',
  'Laravel / PHP Development',
  'Python / Django Development',
  'Drupal Development',
  'React / Next.js Development',
  'Digital Marketing & SEO',
  'UI/UX Design',
  'Cloud & DevOps',
  'Mobile App Development',
  'Other / Not Sure',
];

const BUDGETS = [
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
  'Not sure yet',
];

const INFO_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: 'Email',
    value: 'info@1solutions.biz',
    href: 'mailto:info@1solutions.biz',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91 96543 27900',
    href: 'tel:+919654327900',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    label: 'Office',
    value: 'New Delhi, India',
    href: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
      </svg>
    ),
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
  },
];

const TRUST = [
  { stat: '15+', label: 'Years in Business' },
  { stat: '500+', label: 'Clients Served' },
  { stat: '97%', label: 'Retention Rate' },
];

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  message: '',
  consent: false,
};

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again or email us directly.');
    }
  }

  return (
    <>
      <Head>
        <title>Contact Us | 1Solutions — Web Development & Digital Marketing Agency</title>
        <meta
          name="description"
          content="Get in touch with 1Solutions. Tell us about your project and we'll respond within 24 hours with a tailored plan. Serving clients in the US, Canada, and Australia."
        />
        <link rel="canonical" href="https://www.1solutions.biz/contact-us/" />
        <style>{`
          /* ─── Base ─── */
          .co-page {
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            color: #1a1a2e;
          }

          /* ─── Orbs ─── */
          .co-orb {
            position: fixed;
            border-radius: 50%;
            filter: blur(80px);
            pointer-events: none;
            z-index: 0;
          }
          .co-orb-1 {
            width: 700px; height: 700px;
            background: rgba(17, 65, 113, 0.07);
            top: -200px; right: -200px;
          }
          .co-orb-2 {
            width: 500px; height: 500px;
            background: rgba(254, 151, 0, 0.09);
            bottom: -100px; left: -100px;
          }

          /* ─── Layout ─── */
          .co-wrap {
            position: relative;
            z-index: 1;
            min-height: 100vh;
            display: grid;
            grid-template-columns: 420px 1fr;
            max-width: 1200px;
            margin: 0 auto;
            padding: 80px 32px 80px;
            gap: 64px;
            align-items: start;
          }

          /* ─── Left Panel ─── */
          .co-left {
            position: sticky;
            top: 100px;
          }
          .co-eyebrow {
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #FE9700;
            margin-bottom: 14px;
          }
          .co-heading {
            font-size: clamp(2rem, 3.5vw, 2.8rem);
            font-weight: 800;
            line-height: 1.16;
            letter-spacing: -0.028em;
            color: #0F1F40;
            margin: 0 0 16px;
          }
          .co-gradient-text {
            background: linear-gradient(90deg, #114171 0%, #FE9700 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .co-sub {
            font-size: 1rem;
            line-height: 1.72;
            color: #4b5563;
            margin-bottom: 36px;
          }

          /* Trust stats */
          .co-trust {
            display: flex;
            gap: 0;
            margin-bottom: 36px;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(17, 65, 113, 0.1);
          }
          .co-trust-item {
            flex: 1;
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(10px);
            padding: 18px 14px;
            text-align: center;
            border-right: 1px solid rgba(17, 65, 113, 0.08);
          }
          .co-trust-item:last-child { border-right: none; }
          .co-trust-stat {
            font-size: 1.5rem;
            font-weight: 800;
            color: #114171;
            line-height: 1;
            margin-bottom: 4px;
          }
          .co-trust-label {
            font-size: 0.72rem;
            color: #6b7280;
            font-weight: 600;
          }

          /* Info items */
          .co-info-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
            margin-bottom: 36px;
          }
          .co-info-item {
            display: flex;
            align-items: center;
            gap: 14px;
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(17, 65, 113, 0.08);
            border-radius: 12px;
            padding: 14px 18px;
            text-decoration: none;
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          a.co-info-item:hover {
            border-color: rgba(17, 65, 113, 0.2);
            box-shadow: 0 4px 16px rgba(17, 65, 113, 0.08);
          }
          .co-info-icon {
            width: 38px; height: 38px;
            background: rgba(17, 65, 113, 0.08);
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            color: #114171;
            flex-shrink: 0;
          }
          .co-info-label {
            font-size: 0.72rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #9ca3af;
            margin-bottom: 2px;
          }
          .co-info-value {
            font-size: 0.93rem;
            font-weight: 600;
            color: #0F1F40;
          }

          /* ─── Right Panel (Form) ─── */
          .co-form-card {
            background: rgba(255, 255, 255, 0.82);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.92);
            border-radius: 24px;
            padding: 48px 44px;
            box-shadow: 0 8px 48px rgba(17, 65, 113, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 1);
          }
          .co-form-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0F1F40;
            margin: 0 0 6px;
            letter-spacing: -0.02em;
          }
          .co-form-subtitle {
            font-size: 0.92rem;
            color: #6b7280;
            margin: 0 0 32px;
          }

          /* Form elements */
          .co-form {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }
          .co-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }
          .co-field {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .co-field.co-full { grid-column: 1 / -1; }
          .co-label {
            font-size: 0.82rem;
            font-weight: 600;
            color: #374151;
            letter-spacing: 0.01em;
          }
          .co-label .co-req { color: #FE9700; margin-left: 2px; }
          .co-input,
          .co-select,
          .co-textarea {
            width: 100%;
            padding: 11px 14px;
            border: 1.5px solid rgba(17, 65, 113, 0.15);
            border-radius: 10px;
            font-size: 0.93rem;
            font-family: inherit;
            color: #0F1F40;
            background: rgba(255, 255, 255, 0.6);
            transition: border-color 0.2s, box-shadow 0.2s;
            outline: none;
          }
          .co-input::placeholder,
          .co-textarea::placeholder { color: #9ca3af; }
          .co-input:focus,
          .co-select:focus,
          .co-textarea:focus {
            border-color: #114171;
            box-shadow: 0 0 0 3px rgba(17, 65, 113, 0.1);
            background: #fff;
          }
          .co-select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23374151'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 12px center;
            background-size: 20px;
            padding-right: 40px;
            cursor: pointer;
          }
          .co-textarea {
            resize: vertical;
            min-height: 120px;
            line-height: 1.6;
          }

          /* Phone row */
          .co-phone-wrap {
            display: flex;
            border: 1.5px solid rgba(17, 65, 113, 0.15);
            border-radius: 10px;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.6);
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .co-phone-wrap:focus-within {
            border-color: #114171;
            box-shadow: 0 0 0 3px rgba(17, 65, 113, 0.1);
            background: #fff;
          }
          .co-phone-cc {
            padding: 11px 10px;
            border: none;
            border-right: 1.5px solid rgba(17, 65, 113, 0.1);
            background: transparent;
            font-size: 0.88rem;
            color: #374151;
            font-family: inherit;
            outline: none;
            cursor: pointer;
            flex-shrink: 0;
          }
          .co-phone-num {
            flex: 1;
            padding: 11px 14px;
            border: none;
            background: transparent;
            font-size: 0.93rem;
            font-family: inherit;
            color: #0F1F40;
            outline: none;
          }
          .co-phone-num::placeholder { color: #9ca3af; }

          /* Consent */
          .co-consent {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            padding: 14px 16px;
            background: rgba(17, 65, 113, 0.04);
            border-radius: 10px;
            border: 1px solid rgba(17, 65, 113, 0.08);
          }
          .co-consent input[type="checkbox"] {
            margin-top: 2px;
            width: 16px; height: 16px;
            cursor: pointer;
            flex-shrink: 0;
            accent-color: #114171;
          }
          .co-consent-label {
            font-size: 0.83rem;
            color: #4b5563;
            line-height: 1.5;
          }
          .co-consent-label a {
            color: #114171;
            font-weight: 600;
            text-decoration: none;
          }
          .co-consent-label a:hover { text-decoration: underline; }

          /* Submit button */
          .co-submit {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            padding: 15px 32px;
            background: #114171;
            color: #fff;
            border: none;
            border-radius: 100px;
            font-size: 1rem;
            font-weight: 700;
            font-family: inherit;
            cursor: pointer;
            transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
            letter-spacing: 0.01em;
            margin-top: 4px;
          }
          .co-submit:hover:not(:disabled) {
            background: #0d3260;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(17, 65, 113, 0.28);
          }
          .co-submit:disabled {
            opacity: 0.65;
            cursor: not-allowed;
          }
          .co-spinner {
            width: 18px; height: 18px;
            border: 2.5px solid rgba(255,255,255,0.3);
            border-top-color: #fff;
            border-radius: 50%;
            animation: co-spin 0.7s linear infinite;
            flex-shrink: 0;
          }
          @keyframes co-spin { to { transform: rotate(360deg); } }

          /* Error message */
          .co-error-msg {
            background: #fef2f2;
            border: 1px solid #fca5a5;
            border-radius: 10px;
            padding: 12px 16px;
            font-size: 0.88rem;
            color: #dc2626;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          /* ─── Success State ─── */
          .co-success {
            text-align: center;
            padding: 24px 0;
          }
          .co-success-icon {
            width: 72px; height: 72px;
            background: linear-gradient(135deg, #d1fae5, #a7f3d0);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
          }
          .co-success-icon svg {
            width: 36px; height: 36px;
            color: #059669;
          }
          .co-success-title {
            font-size: 1.6rem;
            font-weight: 800;
            color: #0F1F40;
            margin-bottom: 12px;
            letter-spacing: -0.02em;
          }
          .co-success-sub {
            font-size: 1rem;
            color: #4b5563;
            line-height: 1.65;
            margin-bottom: 28px;
            max-width: 360px;
            margin-left: auto;
            margin-right: auto;
          }
          .co-success-btn {
            display: inline-block;
            padding: 12px 28px;
            background: rgba(17, 65, 113, 0.08);
            color: #114171;
            border-radius: 100px;
            font-weight: 700;
            font-size: 0.9rem;
            text-decoration: none;
            transition: background 0.2s;
          }
          .co-success-btn:hover { background: rgba(17, 65, 113, 0.14); }

          /* ─── Responsive ─── */
          @media (max-width: 960px) {
            .co-wrap {
              grid-template-columns: 1fr;
              padding: 60px 24px;
              gap: 40px;
            }
            .co-left { position: static; }
            .co-form-card { padding: 36px 28px; }
          }
          @media (max-width: 600px) {
            .co-wrap { padding: 48px 16px; }
            .co-row { grid-template-columns: 1fr; }
            .co-form-card { padding: 28px 20px; }
          }
        `}</style>
      </Head>

      <div className="co-page">
        <div className="co-orb co-orb-1" />
        <div className="co-orb co-orb-2" />

        <div className="co-wrap">

          {/* ── Left info panel ── */}
          <aside className="co-left">
            <p className="co-eyebrow">Get In Touch</p>
            <h1 className="co-heading">
              Let&apos;s build something <span className="co-gradient-text">great together.</span>
            </h1>
            <p className="co-sub">
              Tell us about your project and we&apos;ll get back to you within 24 hours with a
              clear plan and honest assessment — no hard sell, no runaround.
            </p>

            <div className="co-trust">
              {TRUST.map((t) => (
                <div key={t.label} className="co-trust-item">
                  <div className="co-trust-stat">{t.stat}</div>
                  <div className="co-trust-label">{t.label}</div>
                </div>
              ))}
            </div>

            <div className="co-info-list">
              {INFO_ITEMS.map((item) =>
                item.href ? (
                  <a key={item.label} href={item.href} className="co-info-item">
                    <div className="co-info-icon">{item.icon}</div>
                    <div>
                      <div className="co-info-label">{item.label}</div>
                      <div className="co-info-value">{item.value}</div>
                    </div>
                  </a>
                ) : (
                  <div key={item.label} className="co-info-item">
                    <div className="co-info-icon">{item.icon}</div>
                    <div>
                      <div className="co-info-label">{item.label}</div>
                      <div className="co-info-value">{item.value}</div>
                    </div>
                  </div>
                )
              )}
            </div>

            <p style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: 1.5 }}>
              We serve clients in the <strong style={{ color: '#6b7280' }}>United States, Canada,
              and Australia</strong>. All meetings are scheduled in your time zone.
            </p>
          </aside>

          {/* ── Right form panel ── */}
          <div className="co-form-card">
            {status === 'success' ? (
              <div className="co-success">
                <div className="co-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="co-success-title">Message Received!</div>
                <p className="co-success-sub">
                  Thank you for reaching out. A member of our team will be in touch within
                  24 hours with a tailored response.
                </p>
                <a href="/" className="co-success-btn">Back to Home</a>
              </div>
            ) : (
              <>
                <div className="co-form-title">Send Us a Message</div>
                <p className="co-form-subtitle">
                  All fields marked <span style={{ color: '#FE9700' }}>*</span> are required.
                </p>

                <form className="co-form" onSubmit={handleSubmit} noValidate>

                  {/* Row 1: Name + Email */}
                  <div className="co-row">
                    <div className="co-field">
                      <label className="co-label" htmlFor="co-name">
                        Full Name <span className="co-req">*</span>
                      </label>
                      <input
                        id="co-name"
                        className="co-input"
                        type="text"
                        name="name"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="co-field">
                      <label className="co-label" htmlFor="co-email">
                        Business Email <span className="co-req">*</span>
                      </label>
                      <input
                        id="co-email"
                        className="co-input"
                        type="email"
                        name="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone + Company */}
                  <div className="co-row">
                    <div className="co-field">
                      <label className="co-label" htmlFor="co-phone">Phone</label>
                      <div className="co-phone-wrap">
                        <select className="co-phone-cc" aria-label="Country code">
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+1ca">🇨🇦 +1</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+91">🇮🇳 +91</option>
                        </select>
                        <input
                          id="co-phone"
                          className="co-phone-num"
                          type="tel"
                          name="phone"
                          placeholder="(555) 000-0000"
                          value={form.phone}
                          onChange={handleChange}
                          autoComplete="tel"
                        />
                      </div>
                    </div>
                    <div className="co-field">
                      <label className="co-label" htmlFor="co-company">Company / Organisation</label>
                      <input
                        id="co-company"
                        className="co-input"
                        type="text"
                        name="company"
                        placeholder="Acme Corp"
                        value={form.company}
                        onChange={handleChange}
                        autoComplete="organization"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service + Budget */}
                  <div className="co-row">
                    <div className="co-field">
                      <label className="co-label" htmlFor="co-service">Service Interested In</label>
                      <select
                        id="co-service"
                        className="co-select"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                      >
                        <option value="">Select a service…</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="co-field">
                      <label className="co-label" htmlFor="co-budget">Project Budget</label>
                      <select
                        id="co-budget"
                        className="co-select"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                      >
                        <option value="">Select a range…</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="co-field co-full">
                    <label className="co-label" htmlFor="co-message">
                      Tell Us About Your Project <span className="co-req">*</span>
                    </label>
                    <textarea
                      id="co-message"
                      className="co-textarea"
                      name="message"
                      placeholder="Briefly describe what you need help with, your timeline, and any other relevant details…"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                    />
                  </div>

                  {/* Consent */}
                  <div className="co-consent">
                    <input
                      type="checkbox"
                      id="co-consent"
                      name="consent"
                      checked={form.consent}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="co-consent" className="co-consent-label">
                      I agree that 1Solutions may contact me about my enquiry. View our{' '}
                      <a href="/privacy-policy/">Privacy Policy</a>.
                      <span className="co-req" style={{ marginLeft: 2 }}>*</span>
                    </label>
                  </div>

                  {/* Error */}
                  {status === 'error' && (
                    <div className="co-error-msg">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style={{ flexShrink: 0 }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                      </svg>
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="co-submit"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="co-spinner" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                      </>
                    )}
                  </button>

                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
