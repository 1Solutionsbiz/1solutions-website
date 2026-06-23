import Head from 'next/head';
import Link from 'next/link';

const UPDATED = 'June 13, 2025';

const SECTIONS = [
  {
    id: 'overview',
    title: '1. Overview',
    body: `This Refund Policy ("Policy") sets out the terms under which 1Solutions ("we", "us", "our") issues refunds for web development, digital marketing, and related services.

We are committed to delivering high-quality work and standing behind it. This Policy is designed to be fair to both parties and to reflect the realities of custom digital services, where significant labour and expertise are invested before deliverables are complete.

By engaging 1Solutions and making a payment, you agree to the terms of this Policy. This Policy forms part of our service agreement with you.`,
  },
  {
    id: 'deposits',
    title: '2. Project Deposits',
    body: `Most projects require a non-refundable deposit before work begins. The deposit amount is stated in your project proposal and typically ranges from 30% to 50% of the total project value.

The deposit covers:
• Discovery and scoping sessions with our team
• Project planning and resource allocation
• Initial design concepts and wireframes
• Licensing and setup costs incurred on your behalf

Once work has commenced based on an approved scope, the deposit is non-refundable regardless of whether the project proceeds to completion.`,
  },
  {
    id: 'milestones',
    title: '3. Milestone-Based Payments',
    body: `For larger projects, payments are structured around agreed milestones (e.g., design approval, development completion, testing, go-live). Each milestone payment is due upon delivery and approval of that milestone's deliverables.

Payments made for completed and approved milestones are non-refundable. If you cancel a project after a milestone has been approved and paid, only work completed beyond the last approved milestone is eligible for consideration under our cancellation clause below.`,
  },
  {
    id: 'when-refunds-apply',
    title: '4. When Refunds May Apply',
    body: `Refunds or partial refunds may be considered in the following circumstances:

A) Failure to Deliver
If 1Solutions fails to deliver the agreed project scope within the agreed timeline (or a mutually revised timeline), and we are unable to remedy the failure within 14 days of written notice, you may be eligible for a partial or full refund of payments made for undelivered work.

B) Project Cancellation by 1Solutions
If 1Solutions initiates project cancellation for reasons not related to client conduct or force majeure, we will refund any payments made for work not yet started or deliverables not yet provided.

C) Duplicate or Erroneous Payment
If you are charged more than once for the same invoice or charged an incorrect amount, the overcharge will be refunded in full within 5 business days of confirmation.

D) Service Not Commenced
If you cancel within 48 hours of project kickoff and no work has begun (no calls held, no files received, no design work started), a full refund of payments made — excluding the non-refundable deposit — may be issued at our discretion.`,
  },
  {
    id: 'no-refund',
    title: '5. When Refunds Do Not Apply',
    body: `Refunds will not be issued in the following circumstances:

• Work already completed and approved by you at any milestone stage
• Non-refundable project deposits as described in Section 2
• Digital products delivered (design files, code repositories, written content) and accepted
• Hosting, domain, or third-party licence fees paid on your behalf
• Ongoing service subscriptions (SEO, maintenance, PPC) once the billing period has commenced
• Delays caused by your failure to provide required materials, feedback, or approvals on time
• Dissatisfaction with a completed project that was delivered in accordance with the agreed specifications
• Change-of-mind cancellations after work has commenced
• Projects cancelled due to your breach of our Terms of Use or service agreement`,
  },
  {
    id: 'cancellation',
    title: '6. Project Cancellation by Client',
    body: `If you cancel a project that is in progress, the following applies:

• All work completed up to the point of cancellation must be paid in full at the agreed per-milestone or hourly rate
• Work in progress (started but not yet at a milestone) will be billed at a prorated amount based on time invested, at our standard hourly rate
• Any third-party costs already committed (software licences, stock imagery, hosting setup) are non-refundable and will be invoiced separately
• Cancellation must be submitted in writing to info@1solutions.biz

We will provide a final invoice within 10 business days of receiving written cancellation, itemising completed work and any outstanding amounts.`,
  },
  {
    id: 'digital-marketing',
    title: '7. Digital Marketing & Ongoing Services',
    body: `For ongoing digital marketing services (SEO, PPC, social media management, content marketing):

• Monthly retainer fees are non-refundable once a billing period has commenced
• You may cancel with 30 days' written notice; the notice period will be your final billing period
• Ad spend managed on your behalf (Google Ads, Meta Ads budgets) is governed by each platform's terms and is not refundable by 1Solutions
• Setup fees for ongoing campaigns are non-refundable after campaign launch

We will provide an end-of-engagement report within 10 business days of your final billing period.`,
  },
  {
    id: 'process',
    title: '8. How to Request a Refund',
    body: `To request a refund, please follow these steps:

1. Email info@1solutions.biz with the subject line "Refund Request — [Your Company Name] — [Invoice Number]"
2. Include a description of the reason for your refund request and supporting documentation
3. We will acknowledge your request within 3 business days
4. We will investigate and provide a written decision within 14 business days
5. If approved, refunds will be processed within 7–10 business days via the original payment method

We are committed to resolving disputes fairly and promptly. Most issues can be resolved through open communication before a formal refund request is necessary.`,
  },
  {
    id: 'disputes',
    title: '9. Dispute Resolution',
    body: `We always prefer to resolve disputes amicably. Before initiating any formal proceedings, we ask that you contact us directly at info@1solutions.biz to discuss your concerns.

If a dispute cannot be resolved through good-faith negotiation within 30 days, it shall be subject to binding arbitration in New Delhi, India, in accordance with the Arbitration and Conciliation Act, 1996.

Nothing in this clause prevents either party from seeking urgent injunctive relief in a court of competent jurisdiction.`,
  },
  {
    id: 'changes',
    title: '10. Changes to This Policy',
    body: `We may update this Refund Policy from time to time. The policy in effect at the time of your payment governs your refund eligibility. We will provide 14 days' notice of material changes via email to active clients.`,
  },
  {
    id: 'contact',
    title: '11. Contact',
    body: `contact`,
  },
];

export default function RefundPolicy() {
  return (
    <>
      <Head>
        <title>Refund Policy | 1Solutions</title>
        <meta name="description" content="1Solutions Refund Policy — when refunds apply, how to request one, and what to expect from cancelled or disputed projects." />
        <link rel="canonical" href="https://www.1solutions.biz/refund-policy/" />
        <style>{`
          .rp-page { font-family:'Inter',sans-serif; color:#1a1a2e; background:#f8fafc; }
          .rp-hero { background:linear-gradient(135deg,#fef3c7 0%,#fce7f3 30%,#dbeafe 60%,#ede9fe 100%); padding:80px 24px 60px; position:relative; overflow:hidden; }
          .rp-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
          .rp-orb-1 { width:500px; height:500px; background:rgba(254,151,0,0.08); top:-120px; right:-100px; }
          .rp-orb-2 { width:350px; height:350px; background:rgba(17,65,113,0.08); bottom:-60px; left:-60px; }
          .rp-hero-inner { max-width:1100px; margin:0 auto; position:relative; z-index:1; }
          .rp-breadcrumb { display:flex; align-items:center; gap:6px; font-size:.82rem; color:#6b7280; margin-bottom:20px; flex-wrap:wrap; }
          .rp-breadcrumb a { color:#114171; text-decoration:none; font-weight:500; }
          .rp-breadcrumb a:hover { text-decoration:underline; }
          .rp-hero h1 { font-size:clamp(2rem,4vw,3rem); font-weight:800; line-height:1.14; letter-spacing:-.025em; color:#0F1F40; margin:0 0 14px; }
          .rp-hero-meta { font-size:.88rem; color:#6b7280; display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
          .rp-hero-meta span { display:flex; align-items:center; gap:6px; }
          .rp-body { max-width:1100px; margin:0 auto; padding:56px 24px 80px; display:grid; grid-template-columns:220px 1fr; gap:48px; align-items:start; }
          .rp-toc { position:sticky; top:100px; }
          .rp-toc-title { font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#9ca3af; margin-bottom:14px; }
          .rp-toc-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:2px; }
          .rp-toc-list a { display:block; font-size:.82rem; color:#4b5563; text-decoration:none; padding:6px 10px; border-radius:8px; transition:background .15s,color .15s; line-height:1.4; }
          .rp-toc-list a:hover { background:rgba(17,65,113,0.07); color:#114171; }
          .rp-related { margin-top:28px; border-top:1px solid #e5e7eb; padding-top:20px; }
          .rp-related-title { font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#9ca3af; margin-bottom:10px; }
          .rp-related-link { display:flex; align-items:center; gap:6px; font-size:.82rem; color:#114171; text-decoration:none; padding:6px 10px; border-radius:8px; font-weight:500; transition:background .15s; margin-bottom:4px; }
          .rp-related-link:hover { background:rgba(17,65,113,0.07); }
          .rp-content { min-width:0; }
          .rp-intro { background:rgba(180,83,9,0.06); border-left:3px solid #FE9700; border-radius:0 10px 10px 0; padding:16px 20px; margin-bottom:40px; font-size:.92rem; line-height:1.68; color:#374151; }
          .rp-section { margin-bottom:44px; }
          .rp-section:last-child { margin-bottom:0; }
          .rp-section-title { font-size:1.12rem; font-weight:700; color:#0F1F40; margin:0 0 14px; padding-bottom:10px; border-bottom:1.5px solid #e5e7eb; letter-spacing:-.01em; }
          .rp-body-text { font-size:.93rem; line-height:1.78; color:#374151; white-space:pre-line; }
          .rp-contact-card { background:linear-gradient(135deg,rgba(254,151,0,0.07),rgba(17,65,113,0.06)); border:1px solid rgba(254,151,0,0.2); border-radius:14px; padding:20px 22px; margin-top:8px; }
          .rp-contact-card p { font-size:.9rem; line-height:1.7; color:#374151; margin:0 0 14px; }
          .rp-contact-card p:last-child { margin-bottom:0; }
          .rp-contact-card a { color:#114171; font-weight:600; text-decoration:none; }
          .rp-contact-card a:hover { text-decoration:underline; }
          .rp-contact-actions { display:flex; gap:10px; flex-wrap:wrap; margin-top:16px; }
          .rp-btn { display:inline-flex; align-items:center; gap:6px; padding:10px 20px; border-radius:100px; font-size:.88rem; font-weight:700; text-decoration:none; transition:all .2s; }
          .rp-btn-primary { background:#114171; color:#fff; }
          .rp-btn-primary:hover { background:#0d3260; }
          .rp-btn-outline { background:transparent; color:#114171; border:1.5px solid rgba(17,65,113,0.25); }
          .rp-btn-outline:hover { background:rgba(17,65,113,0.06); }
          @media(max-width:768px){
            .rp-body { grid-template-columns:1fr; padding:40px 20px 60px; gap:0; }
            .rp-toc { position:static; margin-bottom:32px; }
            .rp-hero { padding:60px 20px 44px; }
          }
        `}</style>
      </Head>
      <div className="rp-page">
        <div className="rp-hero">
          <div className="rp-orb rp-orb-1" /><div className="rp-orb rp-orb-2" />
          <div className="rp-hero-inner">
            <nav className="rp-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span style={{color:'#d1d5db'}}>›</span>
              <span>Refund Policy</span>
            </nav>
            <h1>Refund Policy</h1>
            <div className="rp-hero-meta">
              <span><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 13H11v-6h1.5v6zm0-8H11V5h1.5v2z"/></svg>Last updated: {UPDATED}</span>
              <span><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>1Solutions, New Delhi, India</span>
            </div>
          </div>
        </div>
        <div className="rp-body">
          <nav className="rp-toc" aria-label="Page contents">
            <div className="rp-toc-title">Contents</div>
            <ul className="rp-toc-list">{SECTIONS.map(s=><li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}</ul>
            <div className="rp-related">
              <div className="rp-related-title">Related Policies</div>
              <Link href="/privacy-policy/" className="rp-related-link"><svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>Privacy Policy</Link>
              <Link href="/terms-of-use/" className="rp-related-link"><svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>Terms of Use</Link>
              <Link href="/cookie-policy/" className="rp-related-link"><svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>Cookie Policy</Link>
            </div>
          </nav>
          <main className="rp-content">
            <div className="rp-intro">
              This Refund Policy applies to all services provided by <strong>1Solutions</strong>. We build lasting client relationships — if something is not right, we want to know and will work to resolve it fairly.
            </div>
            {SECTIONS.map(s => (
              <section key={s.id} id={s.id} className="rp-section">
                <h2 className="rp-section-title">{s.title}</h2>
                {s.body === 'contact' ? (
                  <div className="rp-contact-card">
                    <p>To submit a refund request or discuss a billing concern, please contact us:</p>
                    <p>Email: <a href="mailto:info@1solutions.biz">info@1solutions.biz</a> (Subject: "Refund Request — [Your Company] — [Invoice No]")</p>
                    <p>Phone: <a href="tel:+919654327900">+91 96543 27900</a></p>
                    <p>We acknowledge all requests within 3 business days and aim to resolve most issues within 14 business days.</p>
                    <div className="rp-contact-actions">
                      <Link href="/contact/" className="rp-btn rp-btn-primary">Contact Us</Link>
                      <Link href="/privacy-policy/" className="rp-btn rp-btn-outline">Privacy Policy</Link>
                    </div>
                  </div>
                ) : (
                  <p className="rp-body-text">{s.body}</p>
                )}
              </section>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}
