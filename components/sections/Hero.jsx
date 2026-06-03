import Link from 'next/link'

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '1,200+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Retention' },
  { value: '25+', label: 'Countries Served' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      style={{ background: 'linear-gradient(180deg, #050D1F 0%, #030810 100%)' }}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position:'absolute', top:'20%', right:'10%', width:'600px', height:'600px',
          borderRadius:'50%', background:'radial-gradient(circle, rgba(17,65,113,0.15) 0%, transparent 70%)',
        }}/>
        <div style={{
          position:'absolute', bottom:'10%', left:'5%', width:'400px', height:'400px',
          borderRadius:'50%', background:'radial-gradient(circle, rgba(254,151,0,0.06) 0%, transparent 70%)',
        }}/>
      </div>

      <div className="container relative z-10 py-24">
        <div style={{ maxWidth: '760px' }}>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
            style={{ background:'rgba(17,65,113,0.25)', border:'1px solid rgba(35,105,184,0.3)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FE9700]" style={{ animation:'pulse 2s infinite' }}/>
            <span style={{ fontSize:'13px', fontWeight:600, color:'#4a87cc', letterSpacing:'0.1em', textTransform:'uppercase' }}>
              Web Development &amp; Digital Marketing
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize:'clamp(48px,6vw,80px)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.02em', color:'#fff', marginBottom:'24px' }}>
            <span style={{ display:'block' }}>We</span>
            <span style={{ display:'block', color:'#114171' }}>Build.</span>
            <span style={{ display:'block', color:'#44973D' }}>Grow.</span>
            <span style={{ display:'block', background:'linear-gradient(90deg,#FE9700,#feac33)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Scale.</span>
            <span style={{ display:'block', color:'#fff' }}>Your Business.</span>
          </h1>

          {/* Subheadline */}
          <p style={{ fontSize:'18px', lineHeight:1.7, color:'rgba(255,255,255,0.6)', maxWidth:'560px', marginBottom:'40px' }}>
            A 15-year-old digital agency trusted by 1,200+ businesses across the US, Canada &amp; Australia.
            We build exceptional websites, drive organic growth, and scale your team with dedicated experts.
          </p>

          {/* CTAs */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'16px', marginBottom:'64px' }}>
            <Link href="/contact" style={{
              display:'inline-block', padding:'16px 32px', borderRadius:'8px',
              background:'#FE9700', color:'#050D1F', fontWeight:700, fontSize:'15px',
              boxShadow:'0 4px 20px rgba(254,151,0,0.35)', transition:'transform 0.2s',
            }}>
              Get a Free Consultation
            </Link>
            <Link href="/case-studies" style={{
              display:'inline-block', padding:'16px 32px', borderRadius:'8px',
              border:'1.5px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.8)',
              fontWeight:600, fontSize:'15px', transition:'background 0.2s',
            }}>
              View Our Work →
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'24px' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize:'30px', fontWeight:900, color:'#fff', marginBottom:'4px' }}>{s.value}</div>
                <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.45)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
