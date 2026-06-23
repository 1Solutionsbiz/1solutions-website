'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const TOPICS = [
  'Web Development (WordPress, Next.js, React, Laravel, etc.)',
  'Digital Marketing & SEO',
  'eCommerce (Shopify, WooCommerce, Magento)',
  'Artificial Intelligence & Automation',
  'UI/UX Design & User Experience',
  'Cloud Computing & DevOps',
  'Mobile App Development',
  'Cybersecurity & Data Privacy',
  'SaaS & Product Development',
  'Content Marketing & Copywriting',
  'Business Technology & Startups',
  'Other',
];

const AUDIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const GUIDELINES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    title: 'Original Content Only',
    desc: 'Your article must be completely original and not published anywhere else — including your own blog, Medium, LinkedIn, or any other platform.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    title: 'Minimum 1,500 Words',
    desc: 'We prefer in-depth, well-researched articles of 1,500–3,000 words that go beyond surface-level advice and provide real actionable value.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    title: 'Practical & Actionable',
    desc: 'Content should include concrete examples, step-by-step guidance, code snippets (where relevant), or data-backed insights — not just theory.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    title: 'Credible Sources & References',
    desc: 'Back your claims with links to reputable sources — industry studies, official documentation, or recognised publications in the field.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    title: 'No Promotional Content',
    desc: 'Articles must not be thinly-veiled advertisements. You may include one contextually relevant link to your own site within the body text.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    title: 'Plagiarism-Free',
    desc: 'All submissions are checked using plagiarism tools. Articles with copied or spun content will be immediately rejected without further review.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    title: 'Author Bio Required',
    desc: 'Include a short bio (50–80 words) and a professional headshot. You may include one link to your website or LinkedIn profile in the bio.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    title: 'Royalty-Free Images',
    desc: 'Any images included must be original, properly licensed, or sourced from royalty-free platforms (Unsplash, Pexels, etc.) with proper attribution.',
  },
];


const INITIAL = {
  name: '', email: '', website: '', title: '',
  topic: '', level: '', pitch: '', samples: '', consent: false,
};

export default function WriteForUs() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1solutions.biz';

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/write-for-us', {
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
        <title>Write for Us | Guest Post Guidelines | 1Solutions Blog</title>
        <meta name="description" content="Submit a guest post to 1Solutions. We accept original, expert articles on web development, SEO, digital marketing, AI, eCommerce, and more." />
        <link rel="canonical" href={`${siteUrl}/write-for-us/`} />
        <meta property="og:title" content="Write for Us | 1Solutions Blog" />
        <meta property="og:description" content="Share your expertise with our audience. We publish high-quality guest posts on web development, SEO, digital marketing, AI, and eCommerce." />
        <meta name="robots" content="index, follow" />
        <style>{`
          /* ── Write For Us page — prefix: wfu- ── */
          .wfu-hero {
            background: linear-gradient(135deg, #0a2540 0%, #114171 60%, #1a5fa8 100%);
            padding: 80px 24px 72px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .wfu-hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          }
          .wfu-hero-inner {
            position: relative;
            max-width: 760px;
            margin: 0 auto;
          }
          .wfu-hero-tag {
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
          .wfu-hero h1 {
            font-size: clamp(2rem, 5vw, 3.2rem);
            font-weight: 800;
            color: #fff;
            margin: 0 0 18px;
            line-height: 1.15;
          }
          .wfu-hero p {
            font-size: 1.1rem;
            color: rgba(255,255,255,0.75);
            max-width: 600px;
            margin: 0 auto 32px;
            line-height: 1.7;
          }
          .wfu-hero-cta {
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
          .wfu-hero-cta:hover { background: #e08800; }

          /* Main layout */
          .wfu-page {
            max-width: 1100px;
            margin: 0 auto;
            padding: 64px 24px;
          }
          .wfu-section-title {
            font-size: 1.6rem;
            font-weight: 800;
            color: #0a2540;
            margin: 0 0 8px;
          }
          .wfu-section-sub {
            font-size: 0.97rem;
            color: #6b7280;
            margin: 0 0 36px;
          }

          /* Topics */
          .wfu-topics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 14px;
            margin-bottom: 64px;
          }
          .wfu-topic-chip {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f0f5fb;
            border: 1px solid #d1e0f0;
            border-radius: 10px;
            padding: 14px 18px;
            font-size: 0.88rem;
            font-weight: 600;
            color: #114171;
            transition: background 0.15s, border-color 0.15s;
          }
          .wfu-topic-chip:hover { background: #ddeaf8; border-color: #a8c8e8; }
          .wfu-topic-dot {
            width: 8px;
            height: 8px;
            background: #FE9700;
            border-radius: 50%;
            flex-shrink: 0;
          }

          /* Guidelines */
          .wfu-guidelines-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 64px;
          }
          .wfu-guideline-card {
            background: #fff;
            border: 1px solid #e8ecf0;
            border-radius: 12px;
            padding: 24px;
            transition: box-shadow 0.2s;
          }
          .wfu-guideline-card:hover { box-shadow: 0 4px 20px rgba(17,65,113,0.08); }
          .wfu-guideline-icon {
            width: 42px;
            height: 42px;
            background: #eef5ff;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #114171;
            margin-bottom: 14px;
          }
          .wfu-guideline-card h3 {
            font-size: 0.95rem;
            font-weight: 700;
            color: #0a2540;
            margin: 0 0 8px;
          }
          .wfu-guideline-card p {
            font-size: 0.85rem;
            color: #6b7280;
            line-height: 1.65;
            margin: 0;
          }

          /* What NOT to submit */
          .wfu-no-list {
            background: #fff8f0;
            border: 1px solid #fde0b0;
            border-radius: 12px;
            padding: 28px 32px;
            margin-bottom: 64px;
          }
          .wfu-no-list h3 {
            font-size: 1rem;
            font-weight: 700;
            color: #b45309;
            margin: 0 0 16px;
          }
          .wfu-no-list ul {
            margin: 0;
            padding: 0 0 0 18px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 32px;
          }
          .wfu-no-list li {
            font-size: 0.87rem;
            color: #78350f;
            line-height: 1.55;
          }

          /* Form */
          .wfu-form-wrap {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
            align-items: start;
          }
          .wfu-form-aside {
            position: sticky;
            top: 100px;
          }
          .wfu-form-aside h2 {
            font-size: 1.4rem;
            font-weight: 800;
            color: #0a2540;
            margin: 0 0 12px;
          }
          .wfu-form-aside p {
            font-size: 0.9rem;
            color: #6b7280;
            line-height: 1.7;
            margin: 0 0 24px;
          }
          .wfu-process-steps {
            list-style: none;
            padding: 0;
            margin: 0;
            counter-reset: step;
          }
          .wfu-process-steps li {
            counter-increment: step;
            display: flex;
            gap: 14px;
            margin-bottom: 20px;
            align-items: flex-start;
          }
          .wfu-process-steps li::before {
            content: counter(step);
            width: 28px;
            height: 28px;
            background: #114171;
            color: #fff;
            font-size: 0.75rem;
            font-weight: 700;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-top: 2px;
          }
          .wfu-step-title {
            font-size: 0.9rem;
            font-weight: 700;
            color: #0a2540;
            display: block;
            margin-bottom: 3px;
          }
          .wfu-step-desc {
            font-size: 0.82rem;
            color: #6b7280;
            line-height: 1.55;
          }

          /* Form fields */
          .wfu-form {
            background: #fff;
            border: 1px solid #e8ecf0;
            border-radius: 16px;
            padding: 36px 32px;
            box-shadow: 0 4px 24px rgba(17,65,113,0.06);
          }
          .wfu-form h2 {
            font-size: 1.3rem;
            font-weight: 800;
            color: #0a2540;
            margin: 0 0 24px;
          }
          .wfu-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .wfu-field { margin-bottom: 18px; }
          .wfu-field label {
            display: block;
            font-size: 0.82rem;
            font-weight: 700;
            color: #374151;
            margin-bottom: 6px;
            letter-spacing: 0.02em;
          }
          .wfu-field label span { color: #e53e3e; margin-left: 2px; }
          .wfu-field input,
          .wfu-field select,
          .wfu-field textarea {
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
          .wfu-field input:focus,
          .wfu-field select:focus,
          .wfu-field textarea:focus {
            outline: none;
            border-color: #114171;
            box-shadow: 0 0 0 3px rgba(17,65,113,0.1);
            background: #fff;
          }
          .wfu-field textarea { resize: vertical; min-height: 110px; }
          .wfu-consent {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            margin-bottom: 22px;
          }
          .wfu-consent input[type="checkbox"] {
            width: 16px;
            height: 16px;
            margin-top: 2px;
            flex-shrink: 0;
            accent-color: #114171;
          }
          .wfu-consent label {
            font-size: 0.82rem;
            color: #6b7280;
            line-height: 1.55;
          }
          .wfu-submit-btn {
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
          .wfu-submit-btn:hover:not(:disabled) { background: #0d3560; }
          .wfu-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }
          .wfu-success-box {
            background: #ecfdf5;
            border: 1px solid #6ee7b7;
            border-radius: 12px;
            padding: 28px 24px;
            text-align: center;
          }
          .wfu-success-box h3 {
            font-size: 1.1rem;
            font-weight: 700;
            color: #065f46;
            margin: 0 0 8px;
          }
          .wfu-success-box p {
            font-size: 0.88rem;
            color: #047857;
            margin: 0;
          }
          .wfu-error-msg {
            background: #fef2f2;
            border: 1px solid #fca5a5;
            border-radius: 8px;
            padding: 12px 16px;
            font-size: 0.85rem;
            color: #dc2626;
            margin-bottom: 16px;
          }

          @media (max-width: 900px) {
            .wfu-form-wrap { grid-template-columns: 1fr; gap: 40px; }
            .wfu-form-aside { position: static; }
            .wfu-stats-inner { grid-template-columns: repeat(2, 1fr); }
            .wfu-stat-item:nth-child(2) { border-right: none; }
            .wfu-no-list ul { grid-template-columns: 1fr; }
          }
          @media (max-width: 600px) {
            .wfu-hero { padding: 56px 20px 52px; }
            .wfu-page { padding: 40px 18px; }
            .wfu-row { grid-template-columns: 1fr; gap: 0; }
            .wfu-stats-inner { grid-template-columns: repeat(2, 1fr); }
            .wfu-form { padding: 24px 18px; }
            .wfu-guidelines-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </Head>

      {/* Hero */}
      <section className="wfu-hero">
        <div className="wfu-hero-inner">
          <span className="wfu-hero-tag">Guest Contributions</span>
          <h1>Write for Us</h1>
          <p>Share your expertise with a growing audience of developers, marketers, and business owners. We publish high-quality, original content that drives real value.</p>
          <a href="#submit" className="wfu-hero-cta">Submit Your Pitch →</a>
        </div>
      </section>

      <div className="wfu-page">

        {/* Topics */}
        <h2 className="wfu-section-title">Topics We Accept</h2>
        <p className="wfu-section-sub">We cover the full spectrum of web technology and digital growth. If your article falls into any of these areas, we'd love to hear from you.</p>
        <div className="wfu-topics-grid">
          {TOPICS.map((t) => (
            <div key={t} className="wfu-topic-chip">
              <span className="wfu-topic-dot" />
              {t}
            </div>
          ))}
        </div>

        {/* Guidelines */}
        <h2 className="wfu-section-title">Submission Guidelines</h2>
        <p className="wfu-section-sub">Read these carefully before submitting — articles that don't meet our standards will not be reviewed.</p>
        <div className="wfu-guidelines-grid">
          {GUIDELINES.map((g) => (
            <div key={g.title} className="wfu-guideline-card">
              <div className="wfu-guideline-icon">{g.icon}</div>
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
            </div>
          ))}
        </div>

        {/* What NOT to submit */}
        <div className="wfu-no-list">
          <h3>We Do NOT Accept</h3>
          <ul>
            <li>Keyword-stuffed or AI-generated articles with no human editing</li>
            <li>Press releases or product announcements</li>
            <li>Articles with more than 2 external links in the body</li>
            <li>Content already published or syndicated elsewhere</li>
            <li>Casino, gambling, adult, or pharmaceutical topics</li>
            <li>Articles with no clear audience or practical takeaway</li>
          </ul>
        </div>

        {/* Form + Process */}
        <div className="wfu-form-wrap" id="submit">

          {/* Left: process steps */}
          <div className="wfu-form-aside">
            <h2>How It Works</h2>
            <p>From pitch to publication — here's what to expect after you submit your idea.</p>
            <ol className="wfu-process-steps">
              <li>
                <div>
                  <span className="wfu-step-title">Submit Your Pitch</span>
                  <span className="wfu-step-desc">Fill in the form with your topic idea, a short pitch, and links to your previous work.</span>
                </div>
              </li>
              <li>
                <div>
                  <span className="wfu-step-title">Editorial Review</span>
                  <span className="wfu-step-desc">Our editorial team reviews your pitch within 2–3 business days and responds with feedback or approval.</span>
                </div>
              </li>
              <li>
                <div>
                  <span className="wfu-step-title">Write Your Article</span>
                  <span className="wfu-step-desc">Once approved, write your full article following our guidelines and submit it as a Google Doc or Word file.</span>
                </div>
              </li>
              <li>
                <div>
                  <span className="wfu-step-title">Editing & Feedback</span>
                  <span className="wfu-step-desc">We may request revisions for clarity, depth, or SEO. You'll receive specific, constructive feedback.</span>
                </div>
              </li>
              <li>
                <div>
                  <span className="wfu-step-title">Published & Promoted</span>
                  <span className="wfu-step-desc">Your article goes live with your author bio, headshot, and backlink. We promote it across our social channels.</span>
                </div>
              </li>
            </ol>
          </div>

          {/* Right: form */}
          <div className="wfu-form">
            <h2>Submit Your Pitch</h2>

            {status === 'success' ? (
              <div className="wfu-success-box">
                <h3>Pitch received — thank you!</h3>
                <p>We'll review your submission and get back to you within 2–3 business days at the email you provided.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {status === 'error' && <p className="wfu-error-msg">{errorMsg}</p>}

                <div className="wfu-row">
                  <div className="wfu-field">
                    <label>Full Name <span>*</span></label>
                    <input type="text" value={form.name} onChange={set('name')} placeholder="Jane Smith" required />
                  </div>
                  <div className="wfu-field">
                    <label>Email Address <span>*</span></label>
                    <input type="email" value={form.email} onChange={set('email')} placeholder="jane@example.com" required />
                  </div>
                </div>

                <div className="wfu-row">
                  <div className="wfu-field">
                    <label>Your Website / Blog URL</label>
                    <input type="url" value={form.website} onChange={set('website')} placeholder="https://yourblog.com" />
                  </div>
                  <div className="wfu-field">
                    <label>Proposed Article Title <span>*</span></label>
                    <input type="text" value={form.title} onChange={set('title')} placeholder="e.g. How to Speed Up WordPress in 2025" required />
                  </div>
                </div>

                <div className="wfu-row">
                  <div className="wfu-field">
                    <label>Topic Category <span>*</span></label>
                    <select value={form.topic} onChange={set('topic')} required>
                      <option value="">Select a topic…</option>
                      {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="wfu-field">
                    <label>Target Audience Level <span>*</span></label>
                    <select value={form.level} onChange={set('level')} required>
                      <option value="">Select level…</option>
                      {AUDIENCE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>

                <div className="wfu-field">
                  <label>Article Pitch / Summary <span>*</span></label>
                  <textarea
                    value={form.pitch}
                    onChange={set('pitch')}
                    placeholder="Briefly describe what your article covers, the key points, and why it would be valuable to our readers (100–200 words)."
                    required
                  />
                </div>

                <div className="wfu-field">
                  <label>Links to Previous Articles (optional)</label>
                  <textarea
                    value={form.samples}
                    onChange={set('samples')}
                    placeholder="Paste 1–3 links to published articles that demonstrate your writing style and expertise."
                    style={{ minHeight: '72px' }}
                  />
                </div>

                <div className="wfu-consent">
                  <input type="checkbox" id="wfu-consent" checked={form.consent} onChange={set('consent')} required />
                  <label htmlFor="wfu-consent">
                    I confirm this article is original, unpublished content. I have read and agree to the guest post guidelines above. I understand 1Solutions reserves the right to edit, republish, or decline submissions.
                  </label>
                </div>

                <button type="submit" className="wfu-submit-btn" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Submitting…' : 'Submit Pitch →'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
