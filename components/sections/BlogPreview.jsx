import Link from 'next/link'

const staticPosts = [
  { mins: '9',  title: 'How Much Does It Cost to Build a Custom Real Estate App?' },
  { mins: '10', title: 'What Is Narrow AI? The Complete Guide to Artificial Narrow Intelligence' },
  { mins: '9',  title: 'Blockchain in Healthcare: Revolutionizing Data Security & Patient Care' },
  { mins: '13', title: 'Knowledge Representation in AI: Types, Approaches, Cycles & Future Trends' },
  { mins: '12', title: 'Cloud Computing Security: Best Practices for Protecting Your Business Data' },
  { mins: '11', title: 'Mobile App Development Trends 2026: What to Expect and Implement' },
]

export default function BlogPreview({ posts }) {
  const gridPosts = posts?.length
    ? posts.slice(0, 6).map(p => ({
        mins: '8',
        title: p.title?.rendered?.replace(/<[^>]+>/g, '') || p.title,
        href: `/${p.slug}`,
      }))
    : staticPosts.map(p => ({ ...p, href: '/blog' }))

  return (
    <>
    <style>{`
      .blog-prev-section { padding: 80px 40px; }
      .blog-prev-outer { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
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
    `}</style>
    <section id="insights" className="blog-prev-section" style={{ background: '#fafafa' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

        <h2 style={{
          fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 900,
          textAlign: 'center', marginBottom: '16px', letterSpacing: '-0.5px',
          background: 'linear-gradient(90deg, #0F3460 0%, #F59E0B 45%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text', color: 'transparent',
        }}>
          Latest Insights
        </h2>
        <p style={{
          textAlign: 'center', color: '#6b7280', fontSize: '16px',
          maxWidth: '580px', margin: '0 auto 48px', lineHeight: 1.8,
        }}>
          Stay informed with our latest blogs — valuable knowledge and trends to empower your business decisions.
        </p>

        <div className="blog-prev-outer">

          {/* Featured post */}
          <div style={{
            borderRadius: '20px', overflow: 'hidden',
            background: '#fff',
            border: '1px solid rgba(229,231,235,0.8)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ position: 'relative', height: '260px', flexShrink: 0 }}>
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&h=400&fit=crop"
                alt="GreenTech Software"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
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
                11 min read
              </span>
            </div>
            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}>
              <h3 style={{
                fontSize: '20px', fontWeight: 800, color: '#111827',
                margin: 0, lineHeight: 1.45, flexGrow: 1,
              }}>
                GreenTech Software Development: The Complete Guide to Building Sustainable Digital Solutions
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
                Explore how sustainable software practices are reshaping the tech industry and what your business can do to lead the charge.
              </p>
              <Link href="/blog" style={{
                color: '#FE9700', fontWeight: 700, fontSize: '14px',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
              }}>
                Read more →
              </Link>
            </div>
          </div>

          {/* Article grid */}
          <div className="blog-prev-inner">
            {gridPosts.map((post, i) => (
              <div key={i} style={{
                borderRadius: '14px',
                border: '1px solid rgba(229,231,235,0.8)',
                padding: '20px',
                background: '#fff',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
                <span style={{
                  fontSize: '11px', fontWeight: 700, color: '#FE9700',
                  background: 'rgba(254,151,0,0.1)',
                  padding: '3px 10px', borderRadius: '20px',
                  display: 'inline-block', width: 'fit-content',
                }}>
                  {post.mins} min read
                </span>
                <h3 style={{
                  fontSize: '13px', fontWeight: 700, color: '#111827',
                  margin: 0, lineHeight: 1.55, flexGrow: 1,
                }}>
                  {post.title}
                </h3>
                <Link href={post.href} style={{
                  color: '#0F3460', fontWeight: 600, fontSize: '12px',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px',
                }}>
                  Read more →
                </Link>
              </div>
            ))}
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
