import Head from 'next/head';
import Link from 'next/link';

const UPDATED = 'June 13, 2025';

const SECTIONS = [
  {
    id: 'intro',
    title: '1. Who We Are',
    body: `1Solutions ("we", "us", or "our") is a web development and digital marketing company headquartered in New Delhi, India. We operate the website at https://www.1solutions.biz.

This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our Site or engage our services. It applies to all personal data processed by 1Solutions, including data from visitors in the European Economic Area (EEA), United Kingdom, United States, Canada, and Australia.

If you have questions about this policy, please contact us at info@1solutions.biz.`,
  },
  {
    id: 'collect',
    title: '2. Information We Collect',
    subsections: [
      {
        title: 'Information You Provide Directly',
        body: `When you interact with us, you may provide:
• Contact form: name, email address, phone number, company name, message
• Job application form: name, email, phone, resume/portfolio URL, work history, salary expectations
• Service enquiries: project details, budget range, timeline
• Communications: emails, calls, or messages you send us`,
      },
      {
        title: 'Information Collected Automatically',
        body: `When you visit our Site, we automatically collect:
• Log data: IP address, browser type and version, pages visited, time and date of visit, referring URL
• Device information: device type, operating system, screen resolution
• Usage data: clickstream data, time spent on pages, search terms
• Cookie data: see our Cookie Policy at /cookie-policy/ for full details`,
      },
    ],
  },
  {
    id: 'use',
    title: '3. How We Use Your Information',
    body: `We use the information we collect to:

• Respond to your enquiries and provide requested services
• Process and evaluate job applications
• Send service-related communications (proposals, project updates, invoices)
• Improve and optimise our website and user experience
• Analyse website traffic and usage patterns
• Send marketing communications where you have given consent (you may opt out at any time)
• Comply with legal obligations
• Protect against fraud and ensure the security of our Site
• Enforce our Terms of Use and other legal rights

We will never sell your personal information to third parties.`,
  },
  {
    id: 'legal-basis',
    title: '4. Legal Basis for Processing (GDPR)',
    body: `For individuals in the EEA or UK, we process your personal data on the following legal bases under Article 6 of the GDPR:

• Contractual necessity: to perform a contract with you or take pre-contractual steps at your request (e.g., providing a project proposal)
• Legitimate interests: to operate and improve our Site, prevent fraud, and communicate about our services — where these interests are not overridden by your rights
• Consent: for marketing emails and optional cookies — you may withdraw consent at any time
• Legal obligation: to comply with applicable law, court orders, or regulatory requirements

For processing of sensitive data (where applicable), we rely on your explicit consent or another permitted ground under Article 9 GDPR.`,
  },
  {
    id: 'sharing',
    title: '5. Information Sharing & Disclosure',
    body: `We do not sell, trade, or rent your personal information. We may share your data with:

Service providers: trusted third-party vendors who assist us in operating our Site and delivering services (e.g., email delivery, analytics, cloud hosting). These providers are bound by confidentiality agreements and may only use your data for the purposes we specify.

Professional advisers: lawyers, accountants, and insurers who require access as part of professional services rendered to us.

Legal compliance: when required by law, court order, or governmental authority, or to protect the rights, property, or safety of 1Solutions, our clients, or the public.

Business transfers: in the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you before your data is transferred and becomes subject to a different privacy policy.

We do not transfer your data to third parties for their own marketing purposes.`,
  },
  {
    id: 'international',
    title: '6. International Data Transfers',
    body: `1Solutions is headquartered in India. If you are located outside India — including in the US, Canada, Australia, or the EEA — your data may be transferred to and processed in India.

For transfers from the EEA/UK, we rely on appropriate safeguards including Standard Contractual Clauses (SCCs) approved by the European Commission, or other lawful transfer mechanisms.

By using our Site or engaging our services, you consent to this transfer, storage, and processing.`,
  },
  {
    id: 'retention',
    title: '7. Data Retention',
    body: `We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.

Typical retention periods:
• Enquiry/contact form data: 3 years from last contact
• Client project data: 7 years (for financial and legal compliance)
• Job application data (unsuccessful candidates): 6–12 months
• Website analytics data: 26 months (Google Analytics default)
• Marketing consent records: until consent is withdrawn + 3 years

When your data is no longer needed, we securely delete or anonymise it.`,
  },
  {
    id: 'rights',
    title: '8. Your Rights',
    body: `Depending on your location, you may have the following rights regarding your personal data:

• Right to access: request a copy of the personal data we hold about you
• Right to rectification: request correction of inaccurate or incomplete data
• Right to erasure ("right to be forgotten"): request deletion of your data in certain circumstances
• Right to restriction: request that we limit the processing of your data
• Right to data portability: receive your data in a structured, machine-readable format
• Right to object: object to processing based on legitimate interests or for direct marketing
• Right to withdraw consent: withdraw consent at any time where processing is based on consent
• Right not to be subject to automated decision-making: request human review of automated decisions

CCPA (California residents): you have the right to know what personal data we collect, to request deletion, to opt out of sale (we do not sell data), and to non-discrimination for exercising these rights.

Australian residents: you have rights under the Privacy Act 1988 (Cth) and the Australian Privacy Principles.

To exercise any of these rights, please contact us at info@1solutions.biz. We will respond within 30 days. We may need to verify your identity before processing your request.`,
  },
  {
    id: 'security',
    title: '9. Security',
    body: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include:

• SSL/TLS encryption for all data transmitted to and from the Site
• Access controls limiting who can access personal data
• Regular security reviews and updates
• Secure, reputable cloud hosting providers

However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to protect your personal data, we cannot guarantee its absolute security. You provide data at your own risk.`,
  },
  {
    id: 'cookies',
    title: '10. Cookies',
    body: `We use cookies and similar tracking technologies on our Site. For detailed information about the types of cookies we use, why we use them, and how you can control them, please refer to our Cookie Policy at https://www.1solutions.biz/cookie-policy/.`,
  },
  {
    id: 'children',
    title: '11. Children\'s Privacy',
    body: `Our Site is not directed at children under the age of 16. We do not knowingly collect personal data from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at info@1solutions.biz and we will promptly delete it.`,
  },
  {
    id: 'third-party',
    title: '12. Third-Party Websites',
    body: `Our Site may contain links to third-party websites. We have no control over the content or privacy practices of those sites and are not responsible for their privacy policies. We encourage you to read the privacy policy of every website you visit.`,
  },
  {
    id: 'changes',
    title: '13. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. When we make material changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this Policy periodically.

Your continued use of the Site after the posting of changes constitutes your acceptance of those changes.`,
  },
  {
    id: 'contact',
    title: '14. Contact & Complaints',
    body: `contact`,
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | 1Solutions</title>
        <meta name="description" content="1Solutions Privacy Policy — how we collect, use, and protect your personal data. GDPR, CCPA, and Australian Privacy Act compliant." />
        <link rel="canonical" href="https://www.1solutions.biz/privacy-policy/" />
        <style>{`
          .pp-page { font-family:'Inter',sans-serif; color:#1a1a2e; background:#f8fafc; }
          .pp-hero { background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 30%,#e0f2fe 60%,#fef3c7 100%); padding:80px 24px 60px; position:relative; overflow:hidden; }
          .pp-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
          .pp-orb-1 { width:500px; height:500px; background:rgba(17,65,113,0.07); top:-120px; right:-100px; }
          .pp-orb-2 { width:350px; height:350px; background:rgba(124,58,237,0.09); bottom:-60px; left:-60px; }
          .pp-hero-inner { max-width:820px; margin:0 auto; position:relative; z-index:1; }
          .pp-breadcrumb { display:flex; align-items:center; gap:6px; font-size:.82rem; color:#6b7280; margin-bottom:20px; flex-wrap:wrap; }
          .pp-breadcrumb a { color:#114171; text-decoration:none; font-weight:500; }
          .pp-breadcrumb a:hover { text-decoration:underline; }
          .pp-hero h1 { font-size:clamp(2rem,4vw,3rem); font-weight:800; line-height:1.14; letter-spacing:-.025em; color:#0F1F40; margin:0 0 14px; }
          .pp-hero-meta { font-size:.88rem; color:#6b7280; display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
          .pp-hero-meta span { display:flex; align-items:center; gap:6px; }
          .pp-body { max-width:820px; margin:0 auto; padding:56px 24px 80px; display:grid; grid-template-columns:220px 1fr; gap:48px; align-items:start; }
          .pp-toc { position:sticky; top:100px; }
          .pp-toc-title { font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#9ca3af; margin-bottom:14px; }
          .pp-toc-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:2px; }
          .pp-toc-list a { display:block; font-size:.82rem; color:#4b5563; text-decoration:none; padding:6px 10px; border-radius:8px; transition:background .15s,color .15s; line-height:1.4; }
          .pp-toc-list a:hover { background:rgba(17,65,113,0.07); color:#114171; }
          .pp-related { margin-top:28px; border-top:1px solid #e5e7eb; padding-top:20px; }
          .pp-related-title { font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#9ca3af; margin-bottom:10px; }
          .pp-related-link { display:flex; align-items:center; gap:6px; font-size:.82rem; color:#114171; text-decoration:none; padding:6px 10px; border-radius:8px; font-weight:500; transition:background .15s; margin-bottom:4px; }
          .pp-related-link:hover { background:rgba(17,65,113,0.07); }
          .pp-content { min-width:0; }
          .pp-intro { background:rgba(17,65,113,0.05); border-left:3px solid #114171; border-radius:0 10px 10px 0; padding:16px 20px; margin-bottom:40px; font-size:.92rem; line-height:1.68; color:#374151; }
          .pp-section { margin-bottom:44px; }
          .pp-section:last-child { margin-bottom:0; }
          .pp-section-title { font-size:1.12rem; font-weight:700; color:#0F1F40; margin:0 0 14px; padding-bottom:10px; border-bottom:1.5px solid #e5e7eb; letter-spacing:-.01em; }
          .pp-body-text { font-size:.93rem; line-height:1.78; color:#374151; white-space:pre-line; }
          .pp-sub { margin-bottom:20px; }
          .pp-sub-title { font-size:.88rem; font-weight:700; color:#0F1F40; margin-bottom:8px; }
          .pp-sub-body { font-size:.9rem; line-height:1.7; color:#374151; white-space:pre-line; }
          .pp-contact-card { background:linear-gradient(135deg,rgba(17,65,113,0.06),rgba(124,58,237,0.06)); border:1px solid rgba(17,65,113,0.12); border-radius:14px; padding:20px 22px; margin-top:8px; }
          .pp-contact-card p { font-size:.9rem; line-height:1.7; color:#374151; margin:0 0 14px; white-space:pre-line; }
          .pp-contact-card p:last-child { margin-bottom:0; }
          .pp-contact-card a { color:#114171; font-weight:600; text-decoration:none; }
          .pp-contact-card a:hover { text-decoration:underline; }
          .pp-contact-actions { display:flex; gap:10px; flex-wrap:wrap; margin-top:16px; }
          .pp-btn { display:inline-flex; align-items:center; gap:6px; padding:10px 20px; border-radius:100px; font-size:.88rem; font-weight:700; text-decoration:none; transition:all .2s; }
          .pp-btn-primary { background:#114171; color:#fff; }
          .pp-btn-primary:hover { background:#0d3260; }
          .pp-btn-outline { background:transparent; color:#114171; border:1.5px solid rgba(17,65,113,0.25); }
          .pp-btn-outline:hover { background:rgba(17,65,113,0.06); }
          @media(max-width:768px){
            .pp-body { grid-template-columns:1fr; padding:40px 20px 60px; gap:0; }
            .pp-toc { position:static; margin-bottom:32px; }
            .pp-hero { padding:60px 20px 44px; }
          }
        `}</style>
      </Head>
      <div className="pp-page">
        <div className="pp-hero">
          <div className="pp-orb pp-orb-1" /><div className="pp-orb pp-orb-2" />
          <div className="pp-hero-inner">
            <nav className="pp-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span style={{color:'#d1d5db'}}>›</span><span>Privacy Policy</span>
            </nav>
            <h1>Privacy Policy</h1>
            <div className="pp-hero-meta">
              <span><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 13H11v-6h1.5v6zm0-8H11V5h1.5v2z"/></svg>Last updated: {UPDATED}</span>
              <span><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>1Solutions, New Delhi, India</span>
            </div>
          </div>
        </div>
        <div className="pp-body">
          <nav className="pp-toc" aria-label="Page contents">
            <div className="pp-toc-title">Contents</div>
            <ul className="pp-toc-list">{SECTIONS.map(s=><li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}</ul>
            <div className="pp-related">
              <div className="pp-related-title">Related Policies</div>
              <Link href="/cookie-policy/" className="pp-related-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
                Cookie Policy
              </Link>
              <Link href="/refund-policy/" className="pp-related-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
                Refund Policy
              </Link>
              <Link href="/terms-of-use/" className="pp-related-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
                Terms of Use
              </Link>
            </div>
          </nav>
          <main className="pp-content">
            <div className="pp-intro">
              This Privacy Policy describes how <strong>1Solutions</strong> collects, uses, and protects your personal data.
              It is GDPR, CCPA, and Australian Privacy Act compliant. We take your privacy seriously and
              will never sell your data to third parties.
            </div>
            {SECTIONS.map(s => (
              <section key={s.id} id={s.id} className="pp-section">
                <h2 className="pp-section-title">{s.title}</h2>
                {s.subsections ? (
                  s.subsections.map(sub => (
                    <div key={sub.title} className="pp-sub">
                      <div className="pp-sub-title">{sub.title}</div>
                      <p className="pp-sub-body">{sub.body}</p>
                    </div>
                  ))
                ) : s.body === 'contact' ? (
                  <div className="pp-contact-card">
                    <p>For privacy enquiries, to exercise your rights, or to lodge a complaint, please contact our Data Privacy team:</p>
                    <p>Email: <a href="mailto:info@1solutions.biz">info@1solutions.biz</a></p>
                    <p>We will acknowledge your request within 5 business days and respond fully within 30 days. If you are unsatisfied with our response, you have the right to lodge a complaint with your local data protection authority (e.g., ICO for UK, CNIL for France, OAIC for Australia).</p>
                    <div className="pp-contact-actions">
                      <Link href="/contact/" className="pp-btn pp-btn-primary">Contact Us</Link>
                      <Link href="/cookie-policy/" className="pp-btn pp-btn-outline">Cookie Policy</Link>
                    </div>
                  </div>
                ) : (
                  <p className="pp-body-text">{s.body}</p>
                )}
              </section>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}
