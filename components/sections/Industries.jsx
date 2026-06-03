import Link from 'next/link'

const industries = [
  { name: 'Education', img: 'https://picsum.photos/400/300?random=10', items: ['Student Information Management System','E-Learning Portal System','Custom LMS Development','Campus Administration & Operations System'] },
  { name: 'Real Estate', img: 'https://picsum.photos/400/300?random=11', items: ['Property Management System','Virtual Tour Solutions','CRM for Real Estate','Real Estate Analytics Platform'] },
  { name: 'Manufacturing', img: 'https://picsum.photos/400/300?random=12', items: ['Production Management System','Supply Chain Optimization','IoT Integration Solutions','Quality Control Systems'] },
  { name: 'Travel', img: 'https://picsum.photos/400/300?random=13', items: ['Booking & Reservation System','Travel Portal Development','Itinerary Management','Customer Experience Platform'] },
  { name: 'Social Media', img: 'https://picsum.photos/400/300?random=14', items: ['Social Platform Development','Content Management Tools','Community Building Solutions','Analytics & Engagement Tracking'] },
  { name: 'Wellness', img: 'https://picsum.photos/400/300?random=15', items: ['Health Tracking Applications','Fitness Management System','Telemedicine Platform','Wellness Analytics'] },
  { name: 'Agriculture', img: 'https://picsum.photos/400/300?random=16', items: ['Farm Management System','Crop Monitoring Solutions','AgriTech Platform','Harvest Optimization Tools'] },
  { name: 'Automotive', img: 'https://picsum.photos/400/300?random=17', items: ['Dealer Management System','Fleet Management Solutions','Vehicle Tracking & Telematics','Connected Car Platforms'] },
]

export default function Industries() {
  return (
    <section id="industries" style={{ padding: '80px 40px', background: '#f9fafb' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, color: '#0F3460', textAlign: 'center', marginBottom: '48px' }}>
          Providing Expertise Across a Range of Industries
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
          {industries.map((ind) => (
            <div key={ind.name} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', height: '240px' }}
              className="industry-card-wrap">
              <img src={ind.img} alt={ind.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {/* Title bar */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(15,52,96,0.85))',
                padding: '32px 16px 16px',
                color: '#fff', fontWeight: 700, fontSize: '16px',
              }}>
                {ind.name}
              </div>
              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0, background: 'rgba(15,52,96,0.92)',
                padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                opacity: 0, transition: 'opacity 0.25s',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                <h3 style={{ color: '#fff', fontWeight: 800, marginBottom: '12px', fontSize: '16px' }}>{ind.name}</h3>
                <ul style={{ paddingLeft: '16px', marginBottom: '16px' }}>
                  {ind.items.map(item => (
                    <li key={item} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', marginBottom: '6px', lineHeight: 1.4 }}>{item}</li>
                  ))}
                </ul>
                <Link href={`/industries/${ind.name.toLowerCase().replace(' ','-')}`}
                  style={{ color: '#FE9700', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
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
