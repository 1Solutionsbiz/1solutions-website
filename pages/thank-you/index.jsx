import Head from 'next/head';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Thank You | We'll Be In Touch | 1Solutions</title>
        <meta name="description" content="Thank you for contacting 1Solutions. We've received your message and will respond within 24 hours." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.1solutions.biz/thank-you/" />
        <style>{`
          .ty-page { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #0F1F40; min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 60px 24px; background: linear-gradient(135deg, #f0f6ff 0%, #ffffff 50%, #f0f6ff 100%); }
          .ty-wrap { max-width: 600px; width: 100%; text-align: center; }
          .ty-icon { width: 80px; height: 80px; background: linear-gradient(135deg, #114171, #1a5fa8); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 32px; box-shadow: 0 8px 32px rgba(17,65,113,0.25); }
          .ty-icon svg { width: 40px; height: 40px; }
          .ty-tag { display: inline-block; background: rgba(17,65,113,0.08); color: #114171; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 20px; }
          .ty-h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 900; line-height: 1.15; letter-spacing: -0.5px; color: #0F1F40; margin-bottom: 16px; }
          .ty-sub { font-size: 1.05rem; color: #4A6080; line-height: 1.75; margin-bottom: 40px; }
          .ty-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 40px; text-align: left; }
          .ty-step { background: #fff; border: 1px solid #e5e9f0; border-radius: 12px; padding: 20px 18px; }
          .ty-step-n { font-size: 11px; font-weight: 700; color: #114171; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
          .ty-step-t { font-size: 0.9rem; font-weight: 700; color: #0F1F40; margin-bottom: 4px; }
          .ty-step-d { font-size: 0.82rem; color: #6b7280; line-height: 1.5; margin: 0; }
          .ty-links { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
          .ty-btn-p { display: inline-flex; align-items: center; gap: 8px; background: #114171; color: #fff; padding: 13px 28px; border-radius: 50px; font-weight: 700; font-size: 0.9rem; text-decoration: none; transition: background 0.2s, transform 0.2s; box-shadow: 0 4px 16px rgba(17,65,113,0.25); }
          .ty-btn-p:hover { background: #0d3560; transform: translateY(-2px); }
          .ty-btn-s { display: inline-flex; align-items: center; gap: 8px; border: 1.5px solid #d1d9e6; color: #4A6080; padding: 13px 28px; border-radius: 50px; font-weight: 600; font-size: 0.9rem; text-decoration: none; transition: border-color 0.2s, color 0.2s; }
          .ty-btn-s:hover { border-color: #114171; color: #114171; }
          @media (max-width: 600px) { .ty-steps { grid-template-columns: 1fr; } .ty-links { flex-direction: column; align-items: center; } }
        `}</style>
      </Head>

      <div className="ty-page">
        <div className="ty-wrap">
          <div className="ty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <span className="ty-tag">Message Received</span>
          <h1 className="ty-h1">Thank You — We'll Be In Touch</h1>
          <p className="ty-sub">
            Your message is with us. A member of our team will review your requirements
            and respond within <strong>24 hours</strong> with a tailored plan.
          </p>

          <div className="ty-steps">
            <div className="ty-step">
              <div className="ty-step-n">Step 01</div>
              <div className="ty-step-t">Review</div>
              <p className="ty-step-d">We read your brief and identify the right specialist for your project.</p>
            </div>
            <div className="ty-step">
              <div className="ty-step-n">Step 02</div>
              <div className="ty-step-t">Discovery Call</div>
              <p className="ty-step-d">A 30-minute call to understand your goals, timeline, and budget.</p>
            </div>
            <div className="ty-step">
              <div className="ty-step-n">Step 03</div>
              <div className="ty-step-t">Proposal</div>
              <p className="ty-step-d">A detailed proposal with scope, timeline, and fixed pricing.</p>
            </div>
          </div>

          <div className="ty-links">
            <Link href="/case-studies" className="ty-btn-p">
              View Our Case Studies
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/" className="ty-btn-s">Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  );
}
