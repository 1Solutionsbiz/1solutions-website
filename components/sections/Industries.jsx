'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import AuroraText from '../ui/AuroraText'

const industries = [
  { name: 'Education', href: '/elearning-software-development-services', img: '/images/industry-education.jpg', items: ['Student Information Management System','E-Learning Portal System','Custom LMS Development','Campus Administration & Operations System'] },
  { name: 'Real Estate', href: '/real-estate-software-development', img: '/images/industry-real-estate.jpg', items: ['Property Management System','Virtual Tour Solutions','CRM for Real Estate','Real Estate Analytics Platform'] },
  { name: 'Manufacturing', href: '/manufacturing-software-development-services', img: '/images/industry-manufacturing.jpg', items: ['Production Management System','Supply Chain Optimization','IoT Integration Solutions','Quality Control Systems'] },
  { name: 'Travel', href: '/travel-and-tourism-software-solutions', img: '/images/industry-travel.jpg', items: ['Booking & Reservation System','Travel Portal Development','Itinerary Management','Customer Experience Platform'] },
  { name: 'Social Media', href: '/social-media-app-development-company', img: '/images/industry-social-media.jpg', items: ['Social Platform Development','Content Management Tools','Community Building Solutions','Analytics & Engagement Tracking'] },
  { name: 'Wellness', href: '/wellness-software-development', img: '/images/industry-wellness.jpg', items: ['Health Tracking Applications','Fitness Management System','Telemedicine Platform','Wellness Analytics'] },
  { name: 'Agriculture', href: '/agriculture-software-development', img: '/images/industry-agriculture.jpg', items: ['Farm Management System','Crop Monitoring Solutions','AgriTech Platform','Harvest Optimization Tools'] },
  { name: 'Automotive', href: '/automotive-software-solutions', img: '/images/industry-automotive.jpg', items: ['Dealer Management System','Fleet Management Solutions','Vehicle Tracking & Telematics','Connected Car Platforms'] },
]

export default function Industries() {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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

  const blurFade = (delay) => ({
    opacity:    inView ? 1 : 0,
    filter:     inView ? 'blur(0px)' : 'blur(12px)',
    transform:  inView ? 'translateY(0px)' : 'translateY(20px)',
    transition: 'opacity 0.6s ease, filter 0.6s ease, transform 0.6s ease',
    transitionDelay: `${delay}s`,
  })

  return (
    <>
    <style>{`
      .ind-section { padding: 80px 40px; }
      .ind-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
      @media (max-width: 900px) {
        .ind-section { padding: 56px 24px; }
        .ind-grid { grid-template-columns: repeat(2,1fr); }
      }
      @media (max-width: 480px) {
        .ind-section { padding: 48px 16px; }
        .ind-grid { grid-template-columns: repeat(2,1fr); gap: 14px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .ind-blur-fade { transition: none !important; opacity: 1 !important; filter: none !important; transform: none !important; }
      }
    `}</style>
    <section ref={sectionRef} id="industries" className="ind-section" style={{ background: '#fff' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

        <h2 className="ind-blur-fade" style={{ ...blurFade(0), fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 900, textAlign: 'center', marginBottom: '16px', letterSpacing: '-0.5px' }}>
          <span style={{ color: '#111827' }}>Providing Expertise </span><AuroraText>Across a Range of Industries</AuroraText>
        </h2>

        <p className="ind-blur-fade" style={{
          ...blurFade(0.15),
          textAlign: 'center', color: '#6b7280', fontSize: '16px', lineHeight: 1.8,
          maxWidth: '640px', margin: '0 auto 48px',
        }}>
          From healthcare to fintech, we deliver tailored digital solutions that drive growth and efficiency across every sector.
        </p>

        <div className="ind-grid">
          {industries.map((ind, i) => (
            /* Outer wrapper owns the blur-fade transition */
            <div key={ind.name} className="ind-blur-fade" style={blurFade(0.28 + i * 0.09)}>
              {/* Inner card owns hover transitions */}
              <div
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
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
