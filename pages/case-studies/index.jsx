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

        {/* ── 01 ── Large: text left, image right */}
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
              RetailMax India
            </h2>
            <p style={{ color: '#6b7280', lineHeight: 1.8, marginBottom: 32, fontSize: '0.94rem' }}>
              Devising a seamless, powerful eCommerce experience that unified online and in-store journeys, boosting conversion rate by 3.2× and reducing cart abandonment by 40%.
            </p>
            <CsButton href="/case-studies/retailmax" />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80"
              alt="RetailMax eCommerce platform"
              style={{ width: '100%', borderRadius: 16, display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
            />
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <PillTag label="eCommerce" />
              <PillTag label="Digital Transformation" />
            </div>
          </div>
        </section>

        <Divider />

        {/* ── 02 ── Large: title+desc left | "View Details" top-right | two images full-width below */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40, marginBottom: 32 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#e5e7eb', lineHeight: 1, marginBottom: 4 }}>02</div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)', fontWeight: 800, color: '#0A1628', marginBottom: 16, lineHeight: 1.2 }}>
                HealthFirst Portal
              </h2>
              <p style={{ color: '#6b7280', lineHeight: 1.8, fontSize: '0.94rem', maxWidth: 520 }}>
                Building a HIPAA-compliant patient engagement portal with telehealth, appointment scheduling, and real-time health records — accessible on any device.
              </p>
            </div>
            <div style={{ flexShrink: 0, paddingTop: 56 }}>
              <CsButton href="/case-studies/healthfirst" />
            </div>
          </div>
          {/* Two images side-by-side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80"
              alt="HealthFirst web portal"
              style={{ width: '100%', borderRadius: 14, display: 'block', aspectRatio: '4/3', objectFit: 'cover' }}
            />
            <img
              src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=700&q=80"
              alt="HealthFirst mobile app"
              style={{ width: '100%', borderRadius: 14, display: 'block', aspectRatio: '4/3', objectFit: 'cover' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <PillTag label="Web App" />
            <PillTag label="Mobile App" />
          </div>
        </section>

        <Divider />

        {/* ── 03 / 04 / 05 ── 3-column smaller grid */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px 100px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 }}>
            {[
              {
                num: '03', title: 'EduPath LMS', tags: ['EdTech', 'SaaS'], href: '/case-studies/edupath',
                img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80', imgAlt: 'EduPath LMS',
              },
              {
                num: '04', title: 'WellnessOne App', tags: ['Healthcare', 'Mobile'], href: '/case-studies/wellnessone',
                img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', imgAlt: 'WellnessOne App',
              },
              {
                num: '05', title: 'FleetTrack Pro', tags: ['Logistics', 'IoT'], href: '/case-studies/fleettrack',
                img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80', imgAlt: 'FleetTrack Pro',
              },
            ].map(item => (
              <div key={item.num}>
                <img
                  src={item.img}
                  alt={item.imgAlt}
                  style={{ width: '100%', borderRadius: 14, display: 'block', aspectRatio: '4/3', objectFit: 'cover', marginBottom: 18 }}
                />
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#e5e7eb' }}>{item.num}</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A1628', margin: 0 }}>{item.title}</h3>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                  {item.tags.map(t => <PillTag key={t} label={t} />)}
                </div>
                <SmCsButton href={item.href} />
              </div>
            ))}
          </div>
        </section>
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
