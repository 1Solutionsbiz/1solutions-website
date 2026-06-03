const testimonials = [
  { text: '"1Solutions didn\'t just build our platform—they understood our vision and scaled it to handle 10x growth. The team\'s execution was flawless."', name: 'Akshay Kumar', title: 'Founder, TechStart Ventures' },
  { text: '"Security and compliance were non-negotiable. 1Solutions delivered a platform that\'s not just secure but also intuitive for our users."', name: 'Priya Sharma', title: 'CTO, FinanceHub India' },
  { text: '"The personalisation features they built increased our conversion by 280%. That\'s the kind of impact that matters to our business."', name: 'Rajesh Joshi', title: 'VP Operations, RetailGrowth Co.' },
]

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: '80px 40px', background: '#f9fafb' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, color: '#0F3460', textAlign: 'center', marginBottom: '12px' }}>
          What Our Clients Say
        </h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '48px', fontSize: '16px' }}>
          Real feedback from teams we've partnered with. See why leading companies trust 1Solutions.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: '16px', padding: '32px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #e5e7eb',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.8, marginBottom: '24px', fontStyle: 'italic' }}>{t.text}</p>
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
                <div style={{ fontWeight: 700, color: '#0F3460', fontSize: '14px' }}>{t.name}</div>
                <div style={{ color: '#6b7280', fontSize: '13px' }}>{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
