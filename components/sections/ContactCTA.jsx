export default function ContactCTA() {
  return (
    <section id="contact" style={{ padding: '70px 40px', background: '#fff' }}>
      <div style={{
        maxWidth: '1440px', margin: '0 auto',
        background: 'linear-gradient(135deg, #FFFBF7 0%, #FFF5ED 50%, #FFEDE0 100%)',
        borderRadius: '16px', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '1fr 1.15fr',
        alignItems: 'stretch',
      }}>

        {/* Left */}
        <div style={{ padding: '40px 30px 40px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{
            fontSize: 'clamp(28px,3vw,48px)', fontWeight: 900, lineHeight: 1.2, margin: 0,
            background: 'linear-gradient(90deg, #0F3460 0%, #F59E0B 45%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', color: 'transparent',
          }}>
            Let&apos;s Build Something<br />Great Together
          </h2>

          <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
            Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored plan.
          </p>

          {/* Merged box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.85) 100%)',
            border: '1px solid rgba(255,255,255,0.6)',
            borderRadius: '14px', padding: '24px',
            backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', gap: '20px',
          }}>
            {/* Benefits */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { path: 'M3 11h18v11a2 2 0 01-2 2H5a2 2 0 01-2-2V11zM7 11V7a5 5 0 0110 0v4', text: 'Your project details are confidential. We respect your privacy.' },
                { path: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z', text: 'A real expert reviews your requirements — not automated responses.' },
                { path: 'M12 2a10 10 0 100 20A10 10 0 0012 2zM12 6v6l4 2', text: 'Quick response within 24 business hours.' },
                { path: 'M20 6L9 17l-5-5', text: 'No obligation to proceed. Let\'s just talk.' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" style={{ flexShrink: 0, marginTop: '1px' }}>
                    <path d={b.path} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>{b.text}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{ paddingTop: '20px', borderTop: '2px solid rgba(15, 52, 96, 0.12)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                {[
                  { n: '500+', l: 'Projects Delivered' },
                  { n: '16+', l: 'Years Experience' },
                  { n: '97%', l: 'Client Retention' },
                ].map(stat => (
                  <div key={stat.l}>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: '#F59E0B', lineHeight: 1, marginBottom: '4px' }}>{stat.n}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>{stat.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div style={{ padding: '40px', display: 'flex', alignItems: 'center' }}>
          <div style={{
            background: '#fff', border: '1px solid #e5e7eb',
            borderRadius: '12px', padding: '36px', width: '100%',
          }}>
            <h3 style={{ fontSize: '26px', fontWeight: 700, margin: '0 0 28px', color: '#111827', letterSpacing: '-0.5px' }}>
              Contact Us
            </h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Full Name*</label>
                  <input type="text" placeholder="Full Name*" required style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Business Email Address*</label>
                  <input type="email" placeholder="Business Email Address*" required style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Phone Number*</label>
                  <div style={{ display: 'flex', border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
                    <select style={{ padding: '10px 8px', border: 'none', background: '#f9fafb', fontSize: '13px', color: '#374151', cursor: 'pointer', outline: 'none', borderRight: '1px solid #e5e7eb' }}>
                      <option value="+91">&#127470;&#127475; +91</option>
                      <option value="+1">&#127482;&#127480; +1</option>
                      <option value="+44">&#127468;&#127463; +44</option>
                      <option value="+61">&#127462;&#127482; +61</option>
                    </select>
                    <input type="tel" placeholder="Phone Number*" required style={{ flex: 1, padding: '10px 14px', border: 'none', fontSize: '13px', color: '#374151', outline: 'none', background: '#fff' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle}>Organization / Institution*</label>
                  <input type="text" placeholder="Organization / Institution*" required style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={labelStyle}>Message*</label>
                <textarea placeholder="Message*" rows={5} required style={{ ...inputStyle, resize: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <input type="checkbox" id="consent" required style={{ marginTop: '2px', flexShrink: 0, accentColor: '#0F3460' }} />
                <label htmlFor="consent" style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, cursor: 'pointer' }}>
                  I consent that my personal data will be processed according to{' '}
                  <a href="/privacy-policy" style={{ color: '#0F3460', fontWeight: 600 }}>1Solutions privacy policy</a>
                </label>
              </div>

              <button type="submit" style={{
                background: '#0F3460', color: '#fff', padding: '14px 32px',
                borderRadius: '8px', border: 'none', fontSize: '15px', fontWeight: 700,
                cursor: 'pointer', transition: 'background 0.2s', letterSpacing: '0.2px',
              }}>
                Submit
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}

const inputStyle = {
  padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: '6px',
  fontSize: '13px', color: '#374151', fontFamily: 'inherit',
  transition: 'border-color 0.2s', outline: 'none', background: '#fff', width: '100%',
  boxSizing: 'border-box',
}

const labelStyle = {
  fontSize: '12px', fontWeight: 500, color: '#374151',
}
