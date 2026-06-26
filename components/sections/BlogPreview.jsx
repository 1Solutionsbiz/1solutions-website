import Link from 'next/link'
import AuroraText from '../ui/AuroraText'

const staticPosts = [
  { title: 'How Much Does It Cost to Build a Custom Real Estate App?',                category: 'Development',    date: 'Jun 10, 2025', image: null },
  { title: 'What Is Narrow AI? The Complete Guide to Artificial Narrow Intelligence', category: 'AI & Tech',      date: 'May 28, 2025', image: null },
  { title: 'Blockchain in Healthcare: Revolutionizing Data Security & Patient Care',  category: 'Healthcare Tech', date: 'May 15, 2025', image: null },
]

const CAT_COLORS = {
  'Development':    { bg: 'rgba(59,130,246,0.18)',   color: '#93c5fd' },
  'AI & Tech':      { bg: 'rgba(139,92,246,0.18)',   color: '#c4b5fd' },
  'Healthcare Tech':{ bg: 'rgba(16,185,129,0.18)',   color: '#6ee7b7' },
  'Insights':       { bg: 'rgba(254,151,0,0.18)',    color: '#FE9700' },
  'default':        { bg: 'rgba(254,151,0,0.18)',    color: '#FE9700' },
}

function cleanHtml(str) { return (str || '').replace(/<[^>]+>/g, '').trim() }
function formatDate(str) {
  if (!str) return ''
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const PLACEHOLDERS = [
  'linear-gradient(135deg,#1e3a6e 0%,#0f2148 100%)',
  'linear-gradient(135deg,#2d1b5e 0%,#12093a 100%)',
  'linear-gradient(135deg,#0f3d2e 0%,#071e17 100%)',
]

export default function BlogPreview({ posts }) {
  const displayPosts = posts?.length >= 3
    ? posts.slice(0, 3).map(p => ({
        title:    cleanHtml(p.title?.rendered),
        href:     `/${p.slug}`,
        category: p._embedded?.['wp:term']?.[0]?.[0]?.name || 'Insights',
        date:     formatDate(p.date),
        image:    p._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      }))
    : staticPosts.map(p => ({ ...p, href: '/blog' }))

  return (
    <>
      <style>{`
        .bp-section { background: linear-gradient(150deg,#07102a 0%,#0c1c44 50%,#0f1e3e 100%); padding: 80px 40px; overflow: hidden; }
        .bp-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .bp-card { background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08); border-radius: 18px; overflow: hidden; text-decoration: none; color: inherit; display: flex; flex-direction: column; transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; }
        .bp-card:hover { transform: translateY(-7px); border-color: rgba(254,151,0,.35); box-shadow: 0 24px 56px rgba(0,0,0,.45), 0 0 24px rgba(254,151,0,.1); }
        .bp-img { aspect-ratio: 16/9; overflow: hidden; flex-shrink: 0; }
        .bp-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .45s ease; }
        .bp-card:hover .bp-img img { transform: scale(1.06); }
        .bp-img-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .bp-body { padding: 20px 22px 22px; display: flex; flex-direction: column; flex: 1; gap: 12px; }
        .bp-cat { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; width: fit-content; }
        .bp-title { font-size: 16px; font-weight: 700; color: #fff; line-height: 1.55; margin: 0; flex: 1; }
        .bp-card:hover .bp-title { color: #FE9700; transition: color .2s; }
        .bp-meta { display: flex; align-items: center; justify-content: space-between; padding-top: 8px; border-top: 1px solid rgba(255,255,255,.08); }
        .bp-date { font-size: 12px; color: rgba(255,255,255,.38); }
        .bp-read { font-size: 12px; font-weight: 700; color: rgba(254,151,0,.85); letter-spacing: .3px; }
        .bp-card:hover .bp-read { color: #FE9700; }
        .bp-cta-wrap { text-align: center; margin-top: 48px; }
        @media (max-width:900px) { .bp-grid { grid-template-columns:1fr 1fr; } .bp-section { padding:56px 24px; } }
        @media (max-width:580px) { .bp-grid { grid-template-columns:1fr; } .bp-section { padding:48px 16px; } }
      `}</style>

      <section id="insights" className="bp-section">
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

          <h2 style={{ fontSize: 'clamp(30px,3.5vw,48px)', fontWeight: 900, textAlign: 'center', marginBottom: '14px', letterSpacing: '-0.5px', color: '#fff' }}>
            <span style={{ color: 'rgba(255,255,255,0.92)' }}>Latest </span><AuroraText>Insights</AuroraText>
          </h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,.55)', fontSize: '16px', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 48px' }}>
            Stay ahead with our latest thinking on web development, AI, and digital growth.
          </p>

          <div className="bp-grid">
            {displayPosts.map((post, i) => {
              const cat = CAT_COLORS[post.category] || CAT_COLORS.default
              return (
                <Link key={i} href={post.href} className="bp-card">
                  <div className="bp-img">
                    {post.image
                      ? <img src={post.image} alt={post.title} />
                      : <div className="bp-img-placeholder" style={{ background: PLACEHOLDERS[i % PLACEHOLDERS.length] }}>
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                          </svg>
                        </div>
                    }
                  </div>
                  <div className="bp-body">
                    <span className="bp-cat" style={{ background: cat.bg, color: cat.color }}>{post.category}</span>
                    <h3 className="bp-title">{post.title}</h3>
                    <div className="bp-meta">
                      <span className="bp-date">{post.date}</span>
                      <span className="bp-read">Read More →</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="bp-cta-wrap">
            <Link href="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 36px', borderRadius: '8px', fontSize: '15px', fontWeight: 700,
              textDecoration: 'none', color: '#0F1F40',
              background: '#fff',
              transition: 'all .25s',
              letterSpacing: '.1px',
            }}>
              View All Insights →
            </Link>
          </div>

        </div>
      </section>
    </>
  )
}
