import Link from 'next/link'
import AuroraText from '../ui/AuroraText'

const staticPosts = [
  { title: 'How Much Does It Cost to Build a Custom Real Estate App?',               category: 'Development',    date: 'Jun 10, 2025' },
  { title: 'What Is Narrow AI? The Complete Guide to Artificial Narrow Intelligence', category: 'AI & Tech',      date: 'May 28, 2025' },
  { title: 'Blockchain in Healthcare: Revolutionizing Data Security & Patient Care',  category: 'Healthcare Tech', date: 'May 15, 2025' },
  { title: 'Knowledge Representation in AI: Types, Approaches, Cycles & Future Trends', category: 'AI & Tech',   date: 'May 2, 2025'  },
]

function cleanHtml(str) {
  return (str || '').replace(/<[^>]+>/g, '').trim()
}

function formatDate(str) {
  if (!str) return ''
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function BlogPreview({ posts }) {
  const fp = posts?.[0] || null
  const featuredTitle    = fp ? cleanHtml(fp.title?.rendered)  : 'How Much Does It Cost to Build a Custom Real Estate App?'
  const featuredImage    = fp?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
  const featuredHref     = fp ? `/${fp.slug}` : '/blog'
  const featuredCategory = fp?._embedded?.['wp:term']?.[0]?.[0]?.name || 'Insights'
  const featuredDate     = fp ? formatDate(fp.date) : 'Jun 10, 2025'

  const gridPosts = posts?.length > 1
    ? posts.slice(1, 5).map(p => ({
        title:    cleanHtml(p.title?.rendered),
        href:     `/${p.slug}`,
        category: p._embedded?.['wp:term']?.[0]?.[0]?.name || 'Insights',
        date:     formatDate(p.date),
      }))
    : staticPosts.map(p => ({ ...p, href: '/blog' }))

  return (
    <>
    <style>{`
      .blog-prev-section { padding: 80px 40px; }
      .blog-prev-outer   { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
      .blog-list-item    { padding: 24px 0; border-bottom: 1px solid #e5e7eb; display: block; text-decoration: none; color: inherit; }
      .blog-list-item:first-child { border-top: 1px solid #e5e7eb; }
      .blog-list-item:hover .blog-list-title { color: #114171; }
      .blog-list-title   { transition: color 0.2s ease; }
      .blog-feat-img     { border-radius: 14px; overflow: hidden; background: #e5e7eb; position: relative; aspect-ratio: 16/9; margin-bottom: 20px; }
      .blog-feat-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
      @media (max-width: 900px) {
        .blog-prev-section { padding: 56px 24px; }
        .blog-prev-outer   { grid-template-columns: 1fr; gap: 40px; }
      }
      @media (max-width: 480px) {
        .blog-prev-section { padding: 48px 16px; }
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

          {/* ── Left — featured post ── */}
          <Link href={featuredHref} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className="blog-feat-img">
              {featuredImage
                ? <img src={featuredImage} alt={featuredTitle} />
                : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#e0e7ff 0%,#dbeafe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: 600 }}>1Solutions Insights</span>
                  </div>
              }
              <span style={{
                position: 'absolute', top: '14px', left: '14px',
                background: '#fff', color: '#374151',
                padding: '4px 12px', borderRadius: '20px',
                fontSize: '11px', fontWeight: 600,
              }}>
                {featuredCategory}
              </span>
            </div>
            <h3 style={{
              fontSize: 'clamp(22px,2.2vw,30px)', fontWeight: 800,
              color: '#111827', margin: '0 0 12px', lineHeight: 1.3,
              letterSpacing: '-0.3px',
            }}>
              {featuredTitle}
            </h3>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>{featuredDate}</span>
          </Link>

          {/* ── Right — 4 list items ── */}
          <div>
            {gridPosts.map((post, i) => (
              <Link key={i} href={post.href} className="blog-list-item">
                <span style={{
                  fontSize: '10px', fontWeight: 700, color: '#9ca3af',
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  display: 'block', marginBottom: '10px',
                }}>
                  {post.category}
                </span>
                <h3 className="blog-list-title" style={{
                  fontSize: '16px', fontWeight: 700,
                  color: '#111827', margin: '0 0 10px', lineHeight: 1.5,
                }}>
                  {post.title}
                </h3>
                <span style={{ fontSize: '13px', color: '#9ca3af' }}>{post.date}</span>
              </Link>
            ))}
          </div>

        </div>

        {/* View all CTA */}
        <div style={{ textAlign: 'center', marginTop: '52px' }}>
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
