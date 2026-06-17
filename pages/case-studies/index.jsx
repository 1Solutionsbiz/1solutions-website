import Head from 'next/head';
import Link from 'next/link';

export default function CaseStudies() {
  return (
    <>
      <Head>
        <title>Case Studies | 1Solutions – Real Results for Real Businesses</title>
        <meta name="description" content="Explore how 1Solutions has helped brands across US, Canada & Australia evolve through web development and digital marketing." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/case-studies" />
      </Head>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(254,243,199,0.55) 0%, rgba(219,234,254,0.35) 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 0 80px',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Decorative orbs */}
        <div style={{ position:'absolute', top:-80, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(254,151,0,0.13) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
          <p style={{ color: '#D97706', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
            Our Work
          </p>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            maxWidth: 720,
            marginBottom: 24,
            background: 'linear-gradient(90deg, #0F3460 0%, #F59E0B 45%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            See how we've helped brands evolve and thrive in this ever-changing world
          </h1>
          <p style={{ color: '#4b5563', fontSize: '1.05rem', maxWidth: 540, marginBottom: 40, lineHeight: 1.75 }}>
            15+ years of delivering measurable results for clients across US, Canada, Australia and beyond.
          </p>

          {/* Pill CTA with avatar cluster */}
          <a href="/contact" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            background: 'rgba(15,52,96,0.07)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(15,52,96,0.18)',
            borderRadius: 50,
            padding: '12px 24px 12px 14px',
            color: '#0F3460',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
          }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              {[
                { initials: 'AT', bg: '#FE9700' },
                { initials: 'RK', bg: '#0F3460' },
                { initials: 'PS', bg: '#7C3AED' },
                { initials: 'MJ', bg: '#10B981' },
              ].map((av, i) => (
                <span key={i} style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: av.bg,
                  border: '2.5px solid #fff',
                  marginLeft: i === 0 ? 0 : -10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', fontWeight: 800, color: '#fff',
                  flexShrink: 0,
                }}>
                  {av.initials}
                </span>
              ))}
            </span>
            Connect with Experts
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* ── CASE STUDY ITEMS ── */}
      <div style={{ background: '#fff' }}>

        {/* ── 01 ── Comtradesol: text left, image right */}
        <section style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '80px 40px 0',
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: 60,
          alignItems: 'flex-start',
        }}>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#e5e7eb', lineHeight: 1, marginBottom: 4 }}>01</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', fontWeight: 800, color: '#0A1628', marginBottom: 16, lineHeight: 1.2 }}>
              Comtradesol Advisory Services
            </h2>
            <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: 24, fontSize: '0.94rem' }}>
              Built a professional corporate website on custom WordPress for a Gurgaon-based financial advisory firm, covering Trade Financing, Debt Advisory, Equity Advisory, and Credit Rating. We also set up and actively managed their LinkedIn company profile to build brand authority and reach.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
              {['Custom WordPress Development', 'LinkedIn Profile Management', 'UI/UX Design'].map(s => (
                <div key={s} style={{ fontSize: '0.86rem', color: '#374151' }}>— {s}</div>
              ))}
            </div>
          </div>
          <div>
            <img
              src="/images/portfolio/comtradesol.webp"
              alt="Comtradesol Advisory Services website"
              style={{ width: '100%', borderRadius: 16, display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
            />
            <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
              <PillTag label="WordPress Development" />
              <PillTag label="LinkedIn Marketing" />
              <PillTag label="Financial Services" />
            </div>
          </div>
        </section>

        <Divider />

        {/* ── 02 ── RNG Foundation: title+desc+button top, big image below */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40, marginBottom: 32 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#e5e7eb', lineHeight: 1, marginBottom: 4 }}>02</div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', fontWeight: 800, color: '#0A1628', marginBottom: 16, lineHeight: 1.2 }}>
                Ramnath Goenka Excellence in Journalism Awards
              </h2>
              <p style={{ color: '#6b7280', lineHeight: 1.8, fontSize: '0.94rem', maxWidth: 620 }}>
                Delivered a fully custom-built awards portal for the Indian Express Group's most prestigious journalism honours — including a bespoke CRM in Laravel to manage nominations, jury evaluations, and winner announcements across 14 categories, with EY as knowledge partner.
              </p>
            </div>
            <div style={{ flexShrink: 0, paddingTop: 56 }}>
              <a href="https://rngfoundation.com/awards/" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1.5px solid #0A1628', borderRadius: 50,
                padding: '10px 22px', color: '#0A1628', textDecoration: 'none',
                fontWeight: 600, fontSize: '0.92rem',
              }}>
                Visit Website
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
          <img
            src="/images/portfolio/rngfoundation.webp"
            alt="Ramnath Goenka Excellence in Journalism Awards website"
            style={{ width: '100%', borderRadius: 16, display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
            <PillTag label="Custom Development" />
            <PillTag label="Laravel CRM" />
            <PillTag label="Media & Journalism" />
          </div>
        </section>

        <Divider />

        {/* ── spacer for future case studies ── */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px 100px' }} />

      </div>

      {/* ── CTA ── */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(254,243,199,0.70) 0%, rgba(255,255,255,0.60) 40%, rgba(219,234,254,0.65) 100%)',
        padding: '90px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', top:-80, right:-80, width:320, height:320, borderRadius:'50%', background:'radial-gradient(circle, rgba(254,151,0,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle, rgba(15,52,96,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{ color: '#FE9700', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Start Your Project</p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            background: 'linear-gradient(90deg, #0F3460 0%, #F59E0B 50%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 18,
            lineHeight: 1.25,
          }}>
            Ready to Build Your Success Story?
          </h2>
          <p style={{ color: '#4b5563', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 36, maxWidth: 520, margin: '0 auto 36px' }}>
            Let's discuss your project and craft a strategy that delivers real, measurable results for your business.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              background: '#0F3460',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: 50,
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.97rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}>
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="/portfolio" style={{
              background: 'rgba(15,52,96,0.07)',
              color: '#0F3460',
              padding: '14px 32px',
              borderRadius: 50,
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.97rem',
              border: '1.5px solid rgba(15,52,96,0.18)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}>
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}

/* ── Shared sub-components ── */
function CsButton({ href }) {
  return (
    <a href={href} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      border: '1.5px solid #0A1628', borderRadius: 50,
      padding: '10px 22px', color: '#0A1628', textDecoration: 'none',
      fontWeight: 600, fontSize: '0.92rem',
    }}>
      View Details
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  );
}

function SmCsButton({ href }) {
  return (
    <a href={href} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      border: '1.5px solid #0A1628', borderRadius: 50,
      padding: '8px 18px', color: '#0A1628', textDecoration: 'none',
      fontWeight: 600, fontSize: '0.85rem',
    }}>
      View Details
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
  );
}

function PillTag({ label }) {
  return (
    <span style={{
      border: '1.5px solid #d1d5db', borderRadius: 50,
      padding: '4px 14px', fontSize: '0.8rem', color: '#374151', fontWeight: 500,
    }}>{label}</span>
  );
}

function Divider() {
  return (
    <div style={{ maxWidth: 1200, margin: '80px auto 0', padding: '0 40px' }}>
      <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: 0 }} />
    </div>
  );
}
