import Head from 'next/head';
import Link from 'next/link';

const UPDATED = 'June 13, 2025';

const SECTIONS = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    body: `By accessing or using the website located at https://www.1solutions.biz (the "Site"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use the Site.

These Terms apply to all visitors, users, and others who access or use the Site. 1Solutions reserves the right to modify these Terms at any time. We will notify you of changes by updating the "Last Updated" date. Your continued use of the Site after any modification constitutes your acceptance of the revised Terms.`,
  },
  {
    id: 'services',
    title: '2. Description of Services',
    body: `1Solutions provides web development, digital marketing, UI/UX design, and related technology services to businesses and individuals. The Site serves as a marketing and information platform for those services.

We reserve the right to modify, suspend, or discontinue any aspect of the Site or our services at any time without prior notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of services.`,
  },
  {
    id: 'use',
    title: '3. Permitted and Prohibited Use',
    body: `You may use this Site for lawful purposes only. You agree NOT to:

• Copy, reproduce, modify, or distribute any content from the Site without prior written permission
• Use the Site to transmit unsolicited commercial communications (spam)
• Attempt to gain unauthorised access to any portion of the Site or its related systems
• Use any automated tools (scrapers, bots, crawlers) to extract data from the Site
• Impersonate any person or entity or misrepresent your affiliation with any person or entity
• Upload or transmit viruses, malware, or any other malicious code
• Interfere with or disrupt the integrity or performance of the Site
• Use the Site in any manner that could damage our reputation or that of our clients

We reserve the right to terminate your access to the Site immediately if you violate any of these conditions.`,
  },
  {
    id: 'ip',
    title: '4. Intellectual Property',
    body: `All content on this Site — including but not limited to text, graphics, logos, icons, images, audio clips, and software — is the property of 1Solutions or its content suppliers and is protected by applicable copyright, trademark, and other intellectual property laws.

You may view and print pages from the Site for your own personal, non-commercial use, provided that you retain all copyright and other proprietary notices. You may not republish, reproduce, duplicate, copy, sell, or otherwise exploit any material from the Site without our express written permission.

The 1Solutions name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of 1Solutions. You must not use such marks without our prior written permission.`,
  },
  {
    id: 'submissions',
    title: '5. User Submissions',
    body: `Any material, information, or feedback you submit through the Site — including via our contact form or job application form — is provided voluntarily. By submitting such content, you grant 1Solutions a non-exclusive, royalty-free, perpetual right to use, reproduce, modify, and display that content for the purpose of responding to your enquiry or processing your application.

You represent that any submission you make is accurate, complete, and does not infringe the intellectual property rights of any third party.`,
  },
  {
    id: 'third-party',
    title: '6. Third-Party Links',
    body: `The Site may contain links to third-party websites or services that are not owned or controlled by 1Solutions. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.

We strongly advise you to read the terms and conditions and privacy policies of any third-party website you visit. Inclusion of any link does not imply endorsement by 1Solutions.`,
  },
  {
    id: 'disclaimer',
    title: '7. Disclaimer of Warranties',
    body: `THE SITE AND ALL CONTENT, PRODUCTS, AND SERVICES AVAILABLE THROUGH THE SITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.

1SOLUTIONS EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
• Implied warranties of merchantability and fitness for a particular purpose
• Warranties of title or non-infringement
• Warranties that the Site will be uninterrupted, error-free, or secure
• Warranties regarding the accuracy or completeness of any information on the Site

Some jurisdictions do not allow the exclusion of implied warranties, so the above exclusion may not apply to you.`,
  },
  {
    id: 'liability',
    title: '8. Limitation of Liability',
    body: `TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL 1SOLUTIONS, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF, OR INABILITY TO USE, THE SITE OR ITS CONTENT.

1SOLUTIONS' TOTAL CUMULATIVE LIABILITY TO YOU FOR ANY AND ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR YOUR USE OF THE SITE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US IN THE SIX MONTHS PRECEDING THE CLAIM OR (B) USD $100.

The limitations above shall apply regardless of the form of action, whether in contract, tort (including negligence), strict liability, or otherwise, and regardless of whether 1Solutions has been advised of the possibility of such damage.`,
  },
  {
    id: 'indemnification',
    title: '9. Indemnification',
    body: `You agree to defend, indemnify, and hold harmless 1Solutions, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Site.`,
  },
  {
    id: 'governing-law',
    title: '10. Governing Law & Dispute Resolution',
    body: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.

Any dispute arising under these Terms shall first be attempted to be resolved through good-faith negotiation. If negotiation fails within 30 days, disputes shall be submitted to binding arbitration in New Delhi, India, in accordance with the Arbitration and Conciliation Act, 1996.

Nothing in this clause prevents either party from seeking injunctive or other equitable relief in any court of competent jurisdiction for protection of intellectual property rights or confidential information.`,
  },
  {
    id: 'privacy',
    title: '11. Privacy',
    body: `Your use of the Site is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy at https://www.1solutions.biz/privacy-policy/ to understand our practices.`,
  },
  {
    id: 'changes',
    title: '12. Changes to These Terms',
    body: `We reserve the right to update or modify these Terms at any time without prior notice. The most current version of these Terms will always be posted on this page with the updated "Last Updated" date.

We encourage you to review these Terms periodically. Your continued use of the Site following the posting of any changes constitutes your acceptance of such changes.`,
  },
  {
    id: 'contact',
    title: '13. Contact',
    body: `If you have any questions about these Terms of Use, please contact us:\n\n1Solutions\nNew Delhi, India\nEmail: info@1solutions.biz\nPhone: +91 96543 27900\nWebsite: https://www.1solutions.biz/contact/`,
  },
];

export default function TermsOfUse() {
  return (
    <>
      <Head>
        <title>Terms of Use | 1Solutions</title>
        <meta name="description" content="Terms of Use for 1Solutions (www.1solutions.biz) — the rules governing your use of our website and services." />
        <link rel="canonical" href="https://www.1solutions.biz/terms-of-use/" />
        <style>{`
          .tu-page { font-family:'Inter',sans-serif; color:#1a1a2e; background:#f8fafc; }
          .tu-hero { background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 30%,#e0f2fe 60%,#fef3c7 100%); padding:80px 24px 60px; position:relative; overflow:hidden; }
          .tu-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
          .tu-orb-1 { width:500px; height:500px; background:rgba(17,65,113,0.07); top:-120px; right:-100px; }
          .tu-orb-2 { width:350px; height:350px; background:rgba(254,151,0,0.09); bottom:-60px; left:-60px; }
          .tu-hero-inner { max-width:820px; margin:0 auto; position:relative; z-index:1; }
          .tu-breadcrumb { display:flex; align-items:center; gap:6px; font-size:.82rem; color:#6b7280; margin-bottom:20px; flex-wrap:wrap; }
          .tu-breadcrumb a { color:#114171; text-decoration:none; font-weight:500; }
          .tu-breadcrumb a:hover { text-decoration:underline; }
          .tu-hero h1 { font-size:clamp(2rem,4vw,3rem); font-weight:800; line-height:1.14; letter-spacing:-.025em; color:#0F1F40; margin:0 0 14px; }
          .tu-hero-meta { font-size:.88rem; color:#6b7280; display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
          .tu-hero-meta span { display:flex; align-items:center; gap:6px; }
          .tu-body { max-width:820px; margin:0 auto; padding:56px 24px 80px; display:grid; grid-template-columns:220px 1fr; gap:48px; align-items:start; }
          .tu-toc { position:sticky; top:100px; }
          .tu-toc-title { font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#9ca3af; margin-bottom:14px; }
          .tu-toc-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:2px; }
          .tu-toc-list a { display:block; font-size:.82rem; color:#4b5563; text-decoration:none; padding:6px 10px; border-radius:8px; transition:background .15s,color .15s; line-height:1.4; }
          .tu-toc-list a:hover { background:rgba(17,65,113,0.07); color:#114171; }
          .tu-content { min-width:0; }
          .tu-intro { background:rgba(17,65,113,0.05); border-left:3px solid #114171; border-radius:0 10px 10px 0; padding:16px 20px; margin-bottom:40px; font-size:.92rem; line-height:1.68; color:#374151; }
          .tu-section { margin-bottom:44px; }
          .tu-section:last-child { margin-bottom:0; }
          .tu-section-title { font-size:1.12rem; font-weight:700; color:#0F1F40; margin:0 0 14px; padding-bottom:10px; border-bottom:1.5px solid #e5e7eb; letter-spacing:-.01em; }
          .tu-body-text { font-size:.93rem; line-height:1.78; color:#374151; white-space:pre-line; }
          .tu-contact-card { background:linear-gradient(135deg,rgba(17,65,113,0.06),rgba(254,151,0,0.06)); border:1px solid rgba(17,65,113,0.12); border-radius:14px; padding:20px 22px; margin-top:8px; }
          .tu-contact-card p { font-size:.9rem; line-height:1.7; color:#374151; margin:0 0 14px; white-space:pre-line; }
          .tu-contact-card p:last-child { margin-bottom:0; }
          .tu-contact-card a { color:#114171; font-weight:600; text-decoration:none; }
          .tu-contact-card a:hover { text-decoration:underline; }
          .tu-contact-actions { display:flex; gap:10px; flex-wrap:wrap; margin-top:16px; }
          .tu-btn { display:inline-flex; align-items:center; gap:6px; padding:10px 20px; border-radius:100px; font-size:.88rem; font-weight:700; text-decoration:none; transition:all .2s; }
          .tu-btn-primary { background:#114171; color:#fff; }
          .tu-btn-primary:hover { background:#0d3260; }
          .tu-btn-outline { background:transparent; color:#114171; border:1.5px solid rgba(17,65,113,0.25); }
          .tu-btn-outline:hover { background:rgba(17,65,113,0.06); }
          @media(max-width:768px){
            .tu-body { grid-template-columns:1fr; padding:40px 20px 60px; gap:0; }
            .tu-toc { position:static; margin-bottom:32px; }
            .tu-hero { padding:60px 20px 44px; }
          }
        `}</style>
      </Head>
      <div className="tu-page">
        <div className="tu-hero">
          <div className="tu-orb tu-orb-1" /><div className="tu-orb tu-orb-2" />
          <div className="tu-hero-inner">
            <nav className="tu-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span style={{color:'#d1d5db'}}>›</span><span>Terms of Use</span>
            </nav>
            <h1>Terms of Use</h1>
            <div className="tu-hero-meta">
              <span><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 13H11v-6h1.5v6zm0-8H11V5h1.5v2z"/></svg>Last updated: {UPDATED}</span>
              <span><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>1Solutions, New Delhi, India</span>
            </div>
          </div>
        </div>
        <div className="tu-body">
          <nav className="tu-toc" aria-label="Page contents">
            <div className="tu-toc-title">Contents</div>
            <ul className="tu-toc-list">{SECTIONS.map(s=><li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}</ul>
          </nav>
          <main className="tu-content">
            <div className="tu-intro">
              These Terms of Use govern your access to and use of the <strong>1Solutions</strong> website
              at <strong>www.1solutions.biz</strong>. Please read them carefully before using our site.
              By accessing the Site you agree to these Terms.
            </div>
            {SECTIONS.map(s => (
              <section key={s.id} id={s.id} className="tu-section">
                <h2 className="tu-section-title">{s.title}</h2>
                {s.id === 'contact' ? (
                  <div className="tu-contact-card">
                    <p>For any questions about these Terms, please contact our legal team:</p>
                    <p>{'1Solutions\nNew Delhi, India'}</p>
                    <p>Email: <a href="mailto:info@1solutions.biz">info@1solutions.biz</a> &nbsp;·&nbsp; Phone: <a href="tel:+919654327900">+91 96543 27900</a></p>
                    <div className="tu-contact-actions">
                      <Link href="/contact/" className="tu-btn tu-btn-primary">Contact Us</Link>
                      <Link href="/privacy-policy/" className="tu-btn tu-btn-outline">Privacy Policy</Link>
                    </div>
                  </div>
                ) : (
                  <p className="tu-body-text">{s.body}</p>
                )}
              </section>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}
