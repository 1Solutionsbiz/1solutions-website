import Link from 'next/link'
import AuroraText from '../ui/AuroraText'

const staticPosts = [
  { mins: '9',  title: 'How Much Does It Cost to Build a Custom Real Estate App?' },
  { mins: '10', title: 'What Is Narrow AI? The Complete Guide to Artificial Narrow Intelligence' },
  { mins: '9',  title: 'Blockchain in Healthcare: Revolutionizing Data Security & Patient Care' },
  { mins: '13', title: 'Knowledge Representation in AI: Types, Approaches, Cycles & Future Trends' },
  { mins: '12', title: 'Cloud Computing Security: Best Practices for Protecting Your Business Data' },
  { mins: '11', title: 'Mobile App Development Trends 2026: What to Expect and Implement' },
]

function cleanHtml(str) {
  return (str || '').replace(/<[^>]+>/g, '').trim()
}

// Neon gradient card wrapper — rotating conic-gradient border + glow
function NeonCard({ children, borderSize = 2.5, borderRadius = 20, firstColor = '#6366F1', secondColor = '#FE9700', speed = 4, innerStyle = {} }) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: `${borderRadius + borderSize}px`,
      padding: `${borderSize}px`,
      overflow: 'hidden',
      boxShadow: `0 0 18px ${firstColor}33, 0 0 32px ${secondColor}22`,
      height: '100%',
    }}>
      {/* Spinning conic-gradient — creates the animated border */}
      <div style={{
        position: 'absolute',
        width: '300%', height: '300%',
        top: '-100%', left: '-100%',
        background: `conic-gradient(from 0deg, ${firstColor}, ${secondColor}, ${firstColor})`,
        animation: `neonSpin ${speed}s linear infinite`,
        zIndex: 0,
      }} />
      {/* Inner card surface */}
      <div style={{
        position: 'relative', zIndex: 1,
        borderRadius: `${borderRadius}px`,
        overflow: 'hidden',
        background: '#fff',
        height: '100%',
        ...innerStyle,
      }}>
        {children}
      </div>
    </div>
  )
}

export default function BlogPreview({ posts }) {
  const fp = posts?.[0] || null
  const featuredTitle    = fp ? cleanHtml(fp.title?.rendered) : staticPosts[0].title
  const featuredImage    = fp?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
  const featuredExcerpt  = fp
    ? cleanHtml(fp.excerpt?.rendered).slice(0, 160).trimEnd() + '…'
    : 'A comprehensive breakdown of what it takes to build modern, high-performance digital solutions for today\'s businesses.'
  const featuredHref     = fp ? `/${fp.slug}` : '/blog'
  const featuredCategory = fp?._embedded?.['wp:term']?.[0]?.[0]?.name || 'Blog'

  const gridPosts = posts?.length > 1
    ? posts.slice(1, 7).map(p => ({
        mins: '8',
        title: cleanHtml(p.title?.rendered),
        href: `/${p.slug}`,
      }))
    : staticPosts.map(p => ({ ...p, href: '/blog' }))

  // Neon color pairs — cycle through grid cards
  const neonPairs = [
    { first: '#6366F1', second: '#FE9700' },
    { first: '#8B5CF6', second: '#06B6D4' },
    { first: '#0EA5E9', second: '#6366F1' },
    { first: '#FE9700', second: '#8B5CF6' },
    { first: '#06B6D4', second: '#6366F1' },
    { first: '#6366F1', second: '#0EA5E9' },
  ]

  return (
    <>
    <style>{`
      @keyframes neonSpin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .blog-prev-section { padding: 80px 40px; }
      .blog-prev-outer { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start; }
      .blog-prev-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      @media (max-width: 900px) {
        .blog-prev-section { padding: 56px 24px; }
        .blog-prev-outer { grid-template-columns: 1fr; }
        .blog-prev-inner { grid-template-columns: repeat(3,1fr); }
      }
      @media (max-width: 600px) {
        .blog-prev-section { padding: 48px 16px; }
        .blog-prev-inner { grid-template-columns: repeat(2,1fr); }
      }
      @media (max-width: 400px) {
        .blog-prev-inner { grid-template-columns: 1fr; }
      }
      @media (prefers-reduced-motion: reduce) {
        .blog-prev-section div[style*="neonSpin"] { animation: none !important; }
      }
    `}</style>
    <section id="insights" className="blog-prev-section" style={{ background: '#fafafa' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

        <h2 style={{ fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 900, textAlign: 'center', marginBottom: '16px', letterSpacing: '-0.5px' }}>
          <AuroraText>Latest Insights</AuroraText>
        </h2>
        <p style={{
          textAlign: 'center', color: '#6b7280', fontSize: '16px',
          maxWidth: '580px', margin: '0 auto 48px', lineHeight: 1.8,
        }}>
          Stay informed with our latest blogs — valuable knowledge and trends to empower your business decisions.
        </p>

        <div className="blog-prev-outer">

          {/* ── Featured post — neon border, larger glow ── */}
          <Link href={featuredHref} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <NeonCard
              borderSize={3}
              borderRadius={18}
              firstColor="#6366F1"
              secondColor="#FE9700"
              speed={5}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '260px', flexShrink: 0, background: '#e5e7eb' }}>
                  {featuredImage && (
                    <img
                      src={featuredImage}
                      alt={featuredTitle}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  )}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(transparent 40%, rgba(15,52,96,0.65) 100%)',
                  }} />
                  <span style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: '#FE9700', color: '#fff',
                    padding: '4px 14px', borderRadius: '20px',
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.3px',
                  }}>
                    {featuredCategory}
                  </span>
                </div>
                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0, lineHeight: 1.45 }}>
                    {featuredTitle}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
                    {featuredExcerpt}
                  </p>
                  <span style={{ color: '#FE9700', fontWeight: 700, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    Read more →
                  </span>
                </div>
              </div>
            </NeonCard>
          </Link>

          {/* ── Article grid — each card with its own neon color pair ── */}
          <div className="blog-prev-inner">
            {gridPosts.map((post, i) => {
              const { first, second } = neonPairs[i % neonPairs.length]
              return (
                <Link key={i} href={post.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                  <NeonCard
                    borderSize={2}
                    borderRadius={13}
                    firstColor={first}
                    secondColor={second}
                    speed={3 + (i % 3) * 0.5}
                  >
                    <div style={{
                      padding: '20px',
                      display: 'flex', flexDirection: 'column', gap: '10px',
                      height: '100%', boxSizing: 'border-box',
                    }}>
                      <span style={{
                        fontSize: '11px', fontWeight: 700, color: '#FE9700',
                        background: 'rgba(254,151,0,0.1)',
                        padding: '3px 10px', borderRadius: '20px',
                        display: 'inline-block', width: 'fit-content',
                      }}>
                        {post.mins} min read
                      </span>
                      <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.55, flexGrow: 1 }}>
                        {post.title}
                      </h3>
                      <span style={{ color: '#0F3460', fontWeight: 600, fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        Read more →
                      </span>
                    </div>
                  </NeonCard>
                </Link>
              )
            })}
          </div>
        </div>

        {/* View all CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 36px', borderRadius: '24px', fontSize: '15px', fontWeight: 600,
            textDecoration: 'none', color: '#0F3460',
            background: 'linear-gradient(white,white) padding-box, linear-gradient(90deg,#FE9700 0%,#114171 100%) border-box',
            border: '2px solid transparent',
          }}>
            View All Insights →
          </Link>
        </div>
      </div>
    </section>
    </>
  )
}
