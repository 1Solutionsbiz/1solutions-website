export default function ContactCTA() {
  return (
    <section id="contact" style={{ padding: '0', background: '#f9fafb' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '600px' }}>

        {/* Left */}
        <div style={{ background: '#0F3460', padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px,3vw,40px)', fontWeight: 900, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>
            Let&apos;s Build Something<br />Great Together
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '40px', fontSize: '15px', lineHeight: 1.7 }}>
            Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored plan.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: '🔒', text: 'Your project details are confidential. We respect your privacy.' },
              { icon: '👥', text: 'Dedicated project manager from day one.' },
              { icon: '⚡', text: 'Response within 24 hours, guaranteed.' },
              { icon: '✅', text: 'Free consultation, no commitment required.' },
            ].map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{b.icon}</span>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.6 }}>{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div style={{ background: '#fff', padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0F3460', marginBottom: '32px' }}>Get a Free Consultation</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input placeholder="First Name" style={inputStyle} />
              <input placeholder="Last Name" style={inputStyle} />
            </div>
            <input type="email" placeholder="Work Email" style={inputStyle} />
            <input placeholder="Company Name" style={inputStyle} />
            <input placeholder="Phone Number" style={inputStyle} />
            <select style={inputStyle}>
              <option value="">Select Service</option>
              <option>Web Development</option>
              <option>Mobile App Development</option>
              <option>Digital Marketing / SEO</option>
              <option>eCommerce Development</option>
              <option>Cloud & DevOps</option>
              <option>Hire Dedicated Resources</option>
              <option>AI Solutions</option>
              <option>Other</option>
            </select>
            <textarea placeholder="Tell us about your project..." rows={4} style={{ ...inputStyle, resize: 'none' }} />
            <button type="submit" style={{
              background: '#0F3460', color: '#fff', padding: '14px 32px',
              borderRadius: '8px', border: 'none', fontSize: '15px', fontWeight: 700,
              cursor: 'pointer', transition: 'background 0.2s',
            }}>
              Send Message →
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}

const inputStyle = {
  padding: '12px 16px', borderRadius: '8px', border: '1px solid #e5e7eb',
  fontSize: '14px', color: '#374151', background: '#f9fafb', outline: 'none',
  width: '100%',
}
