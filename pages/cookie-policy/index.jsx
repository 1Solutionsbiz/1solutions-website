import Head from 'next/head';
import Link from 'next/link';

const LAST_UPDATED = 'June 13, 2025';

const SECTIONS = [
  {
    id: 'what-are-cookies',
    title: '1. What Are Cookies?',
    content: `Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, to remember your preferences, and to provide information to site owners about how visitors use their site.

Cookies do not contain any personally identifiable information. They cannot run programs or deliver viruses to your computer. They are uniquely assigned to your browser and can only be read by a web server in the domain that issued the cookie.`,
  },
  {
    id: 'how-we-use',
    title: '2. How We Use Cookies',
    content: `1Solutions ("we", "us", or "our") uses cookies on our website https://www.1solutions.biz (the "Site") to:

• Ensure the website functions correctly and securely
• Remember your preferences and settings between visits
• Understand how visitors use our website so we can improve it
• Measure the effectiveness of our marketing campaigns
• Deliver relevant content and advertisements

We do not use cookies to collect personally identifiable information without your consent, and we never sell data collected via cookies to third parties.`,
  },
  {
    id: 'types',
    title: '3. Types of Cookies We Use',
    subsections: [
      {
        title: 'Strictly Necessary Cookies',
        badge: 'Always Active',
        badgeColor: '#059669',
        badgeBg: '#f0fdf4',
        content: `These cookies are essential for the website to function and cannot be disabled. They are usually only set in response to actions you take that amount to a request for services, such as logging in or filling in forms. You can set your browser to block these cookies, but some parts of the site may not work as a result.

Examples: session cookies, CSRF protection tokens, load-balancing cookies.`,
      },
      {
        title: 'Analytics & Performance Cookies',
        badge: 'Optional',
        badgeColor: '#2563eb',
        badgeBg: '#eff6ff',
        content: `These cookies allow us to count visits and understand how visitors move around our website. All information collected is aggregated and therefore anonymous. If you do not allow these cookies, we will not know when you have visited our site.

We use Google Analytics to collect information including: number of visitors, pages visited, time spent on each page, referring website, and device type. Google Analytics data is retained for 26 months.`,
      },
      {
        title: 'Functional Cookies',
        badge: 'Optional',
        badgeColor: '#7c3aed',
        badgeBg: 'rgba(124,58,237,0.08)',
        content: `These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we have added to our pages. If you do not allow these cookies, some or all of these services may not function properly.

Examples: remembering your contact form preferences, language settings, or which FAQ items you have previously expanded.`,
      },
      {
        title: 'Marketing & Targeting Cookies',
        badge: 'Optional',
        badgeColor: '#b45309',
        badgeBg: 'rgba(180,83,9,0.08)',
        content: `These cookies may be set by our advertising partners to build a profile of your interests and show you relevant advertisements on other sites. They uniquely identify your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.

We may use Google Ads, Meta Pixel, or LinkedIn Insight Tag for remarketing purposes. These third parties may combine information from our site with other information they have collected about you.`,
      },
    ],
  },
  {
    id: 'third-party',
    title: '4. Third-Party Cookies',
    content: `In addition to our own cookies, we may use third-party cookies to report website usage statistics and to deliver advertisements. These third parties include:

• Google (Analytics, Ads, Tag Manager) — privacy.google.com
• Meta / Facebook (Pixel, Ads) — facebook.com/privacy/policy
• LinkedIn (Insight Tag) — linkedin.com/legal/privacy-policy

We do not control these third-party cookies. Please refer to each provider's privacy policy for information on how they use data.`,
  },
  {
    id: 'manage',
    title: '5. How to Manage Cookies',
    content: `You have the right to decide whether to accept or reject optional cookies. You can exercise your cookie preferences by:

Browser settings: Most browsers allow you to view, manage, delete, and block cookies via their settings. Note that blocking all cookies may affect the functionality of our website.
  — Chrome: Settings → Privacy and Security → Cookies and other site data
  — Safari: Settings → Privacy → Manage Website Data
  — Firefox: Options → Privacy & Security → Cookies and Site Data
  — Edge: Settings → Site permissions → Cookies and site data

Opt-out tools:
  — Google Analytics: tools.google.com/dlpage/gaoptout
  — Google Ads personalisation: adssettings.google.com
  — Meta Ads preferences: facebook.com/ads/preferences
  — Your Online Choices (EU): youronlinechoices.eu

Please note that deleting cookies or opting out does not prevent all data collection. Some information may still be collected on an aggregate or anonymised basis.`,
  },
  {
    id: 'retention',
    title: '6. Cookie Retention Periods',
    content: `Different cookies are retained for different periods:

• Session cookies: Deleted when you close your browser
• Persistent cookies: Retained for a fixed period (typically 30 days to 2 years) or until you delete them
• Google Analytics cookies: Up to 26 months
• Marketing/remarketing cookies: Typically 30–90 days

We periodically review our cookie list and retention periods to ensure they remain proportionate and necessary.`,
  },
  {
    id: 'updates',
    title: '7. Updates to This Policy',
    content: `We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. The "Last Updated" date at the top of this page indicates when it was most recently revised.

We encourage you to review this page periodically to stay informed about our use of cookies. Continued use of the Site after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    id: 'contact',
    title: '8. Contact Us',
    content: `If you have any questions about our use of cookies, please contact us:

1Solutions
New Delhi, India
Email: info@1solutions.biz
Phone: +91 96543 27900
Website: https://www.1solutions.biz/contact/`,
  },
];

export default function CookiePolicy() {
  return (
    <>
      <Head>
        <title>Cookie Policy | 1Solutions</title>
        <meta
          name="description"
          content="1Solutions Cookie Policy — how we use cookies, what types we use, and how you can manage or disable them on our website."
        />
        <link rel="canonical" href="https://www.1solutions.biz/cookie-policy/" />
        <style>{`
          /* ─── Base ─── */
          .cp-page {
            font-family: 'Inter', sans-serif;
            color: #1a1a2e;
            background: #f8fafc;
          }

          /* ─── Hero ─── */
          .cp-hero {
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 30%, #e0f2fe 60%, #fef3c7 100%);
            padding: 80px 24px 60px;
            position: relative;
            overflow: hidden;
          }
          .cp-hero-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            pointer-events: none;
          }
          .cp-orb-1 { width: 500px; height: 500px; background: rgba(17,65,113,0.07); top: -120px; right: -100px; }
          .cp-orb-2 { width: 350px; height: 350px; background: rgba(254,151,0,0.09); bottom: -60px; left: -60px; }
          .cp-hero-inner {
            max-width: 820px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }
          .cp-breadcrumb {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.82rem;
            color: #6b7280;
            margin-bottom: 20px;
            flex-wrap: wrap;
          }
          .cp-breadcrumb a { color: #114171; text-decoration: none; font-weight: 500; }
          .cp-breadcrumb a:hover { text-decoration: underline; }
          .cp-breadcrumb-sep { color: #d1d5db; }
          .cp-hero h1 {
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 800;
            line-height: 1.14;
            letter-spacing: -0.025em;
            color: #0F1F40;
            margin: 0 0 14px;
          }
          .cp-hero-meta {
            font-size: 0.88rem;
            color: #6b7280;
            display: flex;
            align-items: center;
            gap: 18px;
            flex-wrap: wrap;
          }
          .cp-hero-meta span {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          /* ─── Layout ─── */
          .cp-body {
            max-width: 820px;
            margin: 0 auto;
            padding: 56px 24px 80px;
            display: grid;
            grid-template-columns: 220px 1fr;
            gap: 48px;
            align-items: start;
          }

          /* ─── ToC ─── */
          .cp-toc {
            position: sticky;
            top: 100px;
          }
          .cp-toc-title {
            font-size: 0.72rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #9ca3af;
            margin-bottom: 14px;
          }
          .cp-toc-list {
            list-style: none;
            padding: 0; margin: 0;
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .cp-toc-list a {
            display: block;
            font-size: 0.83rem;
            color: #4b5563;
            text-decoration: none;
            padding: 6px 10px;
            border-radius: 8px;
            transition: background 0.15s, color 0.15s;
            line-height: 1.4;
          }
          .cp-toc-list a:hover {
            background: rgba(17,65,113,0.07);
            color: #114171;
          }

          /* ─── Content ─── */
          .cp-content { min-width: 0; }
          .cp-intro {
            background: rgba(17,65,113,0.05);
            border-left: 3px solid #114171;
            border-radius: 0 10px 10px 0;
            padding: 16px 20px;
            margin-bottom: 40px;
            font-size: 0.92rem;
            line-height: 1.68;
            color: #374151;
          }

          .cp-section { margin-bottom: 44px; }
          .cp-section:last-child { margin-bottom: 0; }
          .cp-section-title {
            font-size: 1.15rem;
            font-weight: 700;
            color: #0F1F40;
            margin: 0 0 14px;
            padding-bottom: 10px;
            border-bottom: 1.5px solid #e5e7eb;
            letter-spacing: -0.01em;
          }
          .cp-section-text {
            font-size: 0.93rem;
            line-height: 1.78;
            color: #374151;
            white-space: pre-line;
          }
          .cp-section-text a { color: #114171; font-weight: 500; }

          /* Cookie type cards */
          .cp-type-cards {
            display: flex;
            flex-direction: column;
            gap: 14px;
            margin-top: 4px;
          }
          .cp-type-card {
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            overflow: hidden;
            background: #fff;
          }
          .cp-type-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 14px 18px;
            background: #fafafa;
            border-bottom: 1px solid #f3f4f6;
          }
          .cp-type-name {
            font-size: 0.93rem;
            font-weight: 700;
            color: #0F1F40;
          }
          .cp-type-badge {
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            padding: 3px 10px;
            border-radius: 100px;
            white-space: nowrap;
          }
          .cp-type-body {
            padding: 14px 18px;
            font-size: 0.88rem;
            line-height: 1.7;
            color: #4b5563;
            white-space: pre-line;
          }

          /* Contact card */
          .cp-contact-card {
            background: linear-gradient(135deg, rgba(17,65,113,0.06), rgba(254,151,0,0.06));
            border: 1px solid rgba(17,65,113,0.12);
            border-radius: 14px;
            padding: 20px 22px;
            margin-top: 8px;
          }
          .cp-contact-card p {
            font-size: 0.9rem;
            line-height: 1.7;
            color: #374151;
            margin: 0 0 14px;
            white-space: pre-line;
          }
          .cp-contact-card p:last-child { margin-bottom: 0; }
          .cp-contact-card a { color: #114171; font-weight: 600; text-decoration: none; }
          .cp-contact-card a:hover { text-decoration: underline; }
          .cp-contact-actions {
            display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px;
          }
          .cp-contact-btn {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 10px 20px; border-radius: 100px;
            font-size: 0.88rem; font-weight: 700; text-decoration: none;
            transition: all 0.2s;
          }
          .cp-contact-btn-primary {
            background: #114171; color: #fff;
          }
          .cp-contact-btn-primary:hover { background: #0d3260; }
          .cp-contact-btn-outline {
            background: transparent; color: #114171;
            border: 1.5px solid rgba(17,65,113,0.25);
          }
          .cp-contact-btn-outline:hover { background: rgba(17,65,113,0.06); }

          /* ─── Responsive ─── */
          @media (max-width: 768px) {
            .cp-body { grid-template-columns: 1fr; padding: 40px 20px 60px; gap: 0; }
            .cp-toc { position: static; margin-bottom: 32px; }
            .cp-hero { padding: 60px 20px 44px; }
          }
        `}</style>
      </Head>

      <div className="cp-page">

        {/* ── Hero ── */}
        <div className="cp-hero">
          <div className="cp-hero-orb cp-orb-1" />
          <div className="cp-hero-orb cp-orb-2" />
          <div className="cp-hero-inner">
            <nav className="cp-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="cp-breadcrumb-sep">›</span>
              <span>Cookie Policy</span>
            </nav>
            <h1>Cookie Policy</h1>
            <div className="cp-hero-meta">
              <span>
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 13H11v-6h1.5v6zm0-8H11V5h1.5v2z" />
                </svg>
                Last updated: {LAST_UPDATED}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
                1Solutions, New Delhi, India
              </span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="cp-body">

          {/* Table of Contents */}
          <nav className="cp-toc" aria-label="Page contents">
            <div className="cp-toc-title">Contents</div>
            <ul className="cp-toc-list">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main content */}
          <main className="cp-content">

            <div className="cp-intro">
              This Cookie Policy explains how <strong>1Solutions</strong> (operating at{' '}
              <strong>www.1solutions.biz</strong>) uses cookies and similar tracking technologies
              when you visit our website. By continuing to use our site, you consent to our use of
              cookies as described in this policy.
            </div>

            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="cp-section">
                <h2 className="cp-section-title">{s.title}</h2>

                {s.subsections ? (
                  <div className="cp-type-cards">
                    {s.subsections.map((sub) => (
                      <div key={sub.title} className="cp-type-card">
                        <div className="cp-type-header">
                          <div className="cp-type-name">{sub.title}</div>
                          <span
                            className="cp-type-badge"
                            style={{ color: sub.badgeColor, background: sub.badgeBg }}
                          >
                            {sub.badge}
                          </span>
                        </div>
                        <div className="cp-type-body">{sub.content}</div>
                      </div>
                    ))}
                  </div>
                ) : s.id === 'contact' ? (
                  <div className="cp-contact-card">
                    <p>
                      If you have any questions about our use of cookies or this policy, please get in touch:
                    </p>
                    <p>
                      <strong>1Solutions</strong>{'\n'}
                      New Delhi, India{'\n'}
                      Email: <a href="mailto:info@1solutions.biz">info@1solutions.biz</a>{'\n'}
                      Phone: <a href="tel:+919654327900">+91 96543 27900</a>
                    </p>
                    <div className="cp-contact-actions">
                      <Link href="/contact/" className="cp-contact-btn cp-contact-btn-primary">
                        Contact Us
                      </Link>
                      <Link href="/privacy-policy/" className="cp-contact-btn cp-contact-btn-outline">
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                ) : (
                  <p className="cp-section-text">{s.content}</p>
                )}
              </section>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}
