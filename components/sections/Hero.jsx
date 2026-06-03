import Link from 'next/link'
import Image from 'next/image'

const metrics = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '16+', label: 'Years Experience' },
  { value: '97%', label: 'Client Retention' },
  { value: '25+', label: 'Countries Served' },
]

const clientLogos = [
  { src: '/logo/Indian_Express_Logo_full.png', alt: 'Indian Express' },
  { src: '/logo/PHDCCI-Logo-2024.png', alt: 'PHDCCI' },
  { src: '/logo/Zuari-Finserv-logo-new.png', alt: 'Zuari Finserv' },
  { src: '/logo/Wilson-logo.svg.png', alt: 'Wilson' },
  { src: '/logo/Verizon_2015_logo_-vector.svg.png', alt: 'Verizon' },
  { src: '/logo/ICCoLogo.png', alt: 'ICC' },
  { src: '/logo/Honor_Logo_(2020).svg.png', alt: 'Honor' },
  { src: '/logo/Uniphore.jpg', alt: 'Uniphore' },
  { src: '/logo/Nuance-Symbol-500x281.png', alt: 'Nuance' },
  { src: '/logo/amarujala-print-logo_60e03f7d5b4a8.webp', alt: 'Amar Ujala' },
]

export default function Hero() {
  return (
    <section style={{
      background: 'linear-gradient(135deg, rgba(254,243,199,0.5) 0%, rgba(233,212,255,0.3) 100%)',
      padding: '100px 40px 80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(40px, 5.5vw, 64px)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: '20px',
          letterSpacing: '-1px',
          background: 'linear-gradient(90deg, #0F3460 0%, #F59E0B 45%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          We build Brands That Scale &amp; Generate Revenue.
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: '16px', color: '#6b7280', marginBottom: '32px',
          maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.8,
        }}>
          Tired of juggling multiple agencies? We combine strategy, design, development, and marketing into one powerful system.
          Result: faster launches, lower costs, measurable growth.
        </p>

        {/* Metrics */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '40px',
          marginTop: '40px', marginBottom: '40px', padding: '40px 0',
          borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb',
        }}>
          {metrics.map((m) => (
            <div key={m.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#114171', marginBottom: '8px' }}>{m.value}</div>
              <div style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500, lineHeight: 1.5 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
          <Link href="/contact" style={{
            background: '#0F3460', color: '#fff', padding: '14px 32px',
            fontSize: '15px', fontWeight: 500, borderRadius: '20px',
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            boxShadow: '0 4px 15px rgba(15,52,96,0.2)', textDecoration: 'none',
          }}>
            Book Free Strategy Call
          </Link>
          <Link href="/case-studies" style={{
            background: 'white', color: '#0F3460', padding: '12px 30px',
            fontSize: '15px', fontWeight: 600, borderRadius: '20px',
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(white,white), linear-gradient(90deg,#FE9700 0%,#114171 100%)',
            backgroundOrigin: 'padding-box, border-box',
            backgroundClip: 'padding-box, border-box',
            textDecoration: 'none',
          }}>
            View Our Work
          </Link>
        </div>

      </div>

      {/* Client Logos Strip */}
      <div style={{ width: '100%', marginTop: '0' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{
            textAlign: 'center', fontSize: '13px', fontWeight: 600,
            textTransform: 'uppercase', color: '#6b7280', letterSpacing: '0.5px', marginBottom: '32px',
          }}>
            Trusted by industry leaders
          </div>
          <div style={{
            display: 'flex', gap: '24px', alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', overflow: 'hidden',
          }}>
            {clientLogos.map((logo) => (
              <div key={logo.alt} style={{
                height: '50px', width: '120px', padding: '8px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <img
                  src={logo.src} alt={logo.alt}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.6 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
