'use client'
import Link from 'next/link'

const industries = [
  { name: 'Education', href: '/elearning-software-development-services', img: 'https://picsum.photos/400/300?random=10', items: ['Student Information Management System','E-Learning Portal System','Custom LMS Development','Campus Administration & Operations System'] },
  { name: 'Real Estate', href: '/real-estate-software-development', img: 'https://picsum.photos/400/300?random=11', items: ['Property Management System','Virtual Tour Solutions','CRM for Real Estate','Real Estate Analytics Platform'] },
  { name: 'Manufacturing', href: '/manufacturing-software-development-services', img: 'https://picsum.photos/400/300?random=12', items: ['Production Management System','Supply Chain Optimization','IoT Integration Solutions','Quality Control Systems'] },
  { name: 'Travel', href: '/travel-and-tourism-software-solutions', img: 'https://picsum.photos/400/300?random=13', items: ['Booking & Reservation System','Travel Portal Development','Itinerary Management','Customer Experience Platform'] },
  { name: 'Social Media', href: '/social-media-app-development-company', img: 'https://picsum.photos/400/300?random=14', items: ['Social Platform Development','Content Management Tools','Community Building Solutions','Analytics & Engagement Tracking'] },
  { name: 'Wellness', href: '/wellness-software-development', img: 'https://picsum.photos/400/300?random=15', items: ['Health Tracking Applications','Fitness Management System','Telemedicine Platform','Wellness Analytics'] },
  { name: 'Agriculture', href: '/agriculture-software-development', img: 'https://picsum.photos/400/300?random=16', items: ['Farm Management System','Crop Monitoring Solutions','AgriTech Platform','Harvest Optimization Tools'] },
  { name: 'Automotive', href: '/automotive-software-solutions', img: 'https://picsum.photos/400/300?random=17', items: ['Dealer Management System','Fleet Management Solutions','Vehicle Tracking & Telematics','Connected Car Platforms'] },
]

export default function Industries() {
  const handleEnter = (e) => {
    const overlay = e.currentTarget.querySelector('[data-overlay]')
    if (overlay) overlay.style.opacity = '1'
    e.currentTarget.style.transform = 'translateY(-4px)'
    e.currentTarget.style.boxShadow = '0 20px 48px rgba(15,52,96,0.22)'
  }
  const handleLeave = (e) => {
    const overlay = e.currentTarget.querySelector('[data-overlay]')
    if (overlay) overlay.style.opacity = '0'
    e.currentTarget.style.transform = 'translateY(0)'
    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
  }

  return (
    <section id="industries" style={{ padding: '80px 40px', background: '#fff' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

        <h2 style={{
          fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 900,
          textAlign: 'center', marginBottom: '16px', letterSpacing: '-0.5px',
          background: 'linear-gradient(90deg, #0F3460 0%, #F59E0B 45%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', color: 'transparent',
        }}>
          Providing Expertise Across a Range of Industries
        </h2>
        <p style={{
          textAlign: 'center', color: '#6b7280', fontSize: '16px', lineHeight: 1.8,
          maxWidth: '640px', margin: '0 auto 48px',
        }}>
          From healthcare to fintech, we deliver tailored digital solutions that drive growth and efficiency across every sector.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
          {industries.map((ind) => (
            <div
              key={ind.name}
              style={{
                position: 'relative', borderRadius: '16px', overflow: 'hidden',
                cursor: 'pointer', height: '280px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <img src={ind.img} alt={ind.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

              {/* Always-visible title bar */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(15,52,96,0.88))',
                padding: '48px 18px 18px',
                color: '#fff', fontWeight: 700, fontSize: '16px',
              }}>
                {ind.name}
              </div>

              {/* Hover overlay */}
              <div
                data-overlay="true"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(15,52,96,0.95) 0%, rgba(20,70,130,0.92) 100%)',
                  padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px',
                  opacity: 0, transition: 'opacity 0.3s ease',
                }}
              >
                <h3 style={{ color: '#FE9700', fontWeight: 800, margin: 0, fontSize: '17px', letterSpacing: '-0.3px' }}>
                  {ind.name}
                </h3>
                <ul style={{ paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {ind.items.map(item => (
                    <li key={item} style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px', lineHeight: 1.5 }}>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={ind.href}
                  style={{
                    color: '#FE9700', fontSize: '13px', fontWeight: 700,
                    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px',
                    marginTop: '4px',
                  }}
                >
                  Explore More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
