import Link from 'next/link'
import AuroraText from '../ui/AuroraText'

const staticPosts = [
  { title: 'How Much Does It Cost to Build a Custom Real Estate App?',                 category: 'Development',     date: 'Jun 10, 2025', image: null },
  { title: 'What Is Narrow AI? The Complete Guide to Artificial Narrow Intelligence',  category: 'AI & Tech',       date: 'May 28, 2025', image: null },
  { title: 'Blockchain in Healthcare: Revolutionizing Data Security & Patient Care',   category: 'Healthcare Tech',  date: 'May 15, 2025', image: null },
]

const CAT_STYLE = {
  'Development':     { color: '#2563eb', dot: '#2563eb', bg: '#eff6ff' },
  'AI & Tech':       { color: '#7c3aed', dot: '#7c3aed', bg: '#f5f3ff' },
  'Healthcare Tech': { color: '#059669', dot: '#059669', bg: '#ecfdf5' },
  'Insights':        { color: '#d97706', dot: '#d97706', bg: '#fffbeb' },
  'default':         { color: '#d97706', dot: '#d97706', bg: '#fffbeb' },
}

const IMG_PLACEHOLDER = [
  { from: '#e0eaff', to: '#c7d9ff' },
  { from: '#ede9fe', to: '#ddd6fe' },
  { from: '#d1fae5', to: '#a7f3d0' },
]

function cleanHtml(str) { return (str || '').replace(/<[^>]+>/g, '').trim() }
function formatDate(str) {
  if (!str) return ''
  return new Date(str).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

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
        .bp-section { padding: 88px 40px; background: #fff; }

        .bp-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 48px; }
        .bp-view-all { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 700; color: #0F3460; text-decoration: none; white-space: nowrap; padding-bottom: 2px; border-bottom: 2px solid rgba(254,151,0,.5); transition: color .2s, border-color .2s; flex-shrink: 0; }
        .bp-view-all:hover { color: #FE9700; border-color: #FE9700; }

        .bp-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }

        .bp-card { background: #fff; border-radius: 16px; overflow: hidden; text-decoration: none; color: inherit; display: flex; flex-direction: column; border: 1px solid #e5e7eb; transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s cubic-bezier(.22,1,.36,1), border-color .3s; }
        .bp-card:hover { transform: translateY(-8px); box-shadow: 0 20px 52px rgba(15,52,96,.12); border-color: rgba(15,52,96,.15); }

        .bp-img { aspect-ratio: 16/10; overflow: hidden; position: relative; flex-shrink: 0; }
        .bp-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s cubic-bezier(.22,1,.36,1); }
        .bp-card:hover .bp-img img { transform: scale(1.06); }

        .bp-body { padding: 24px 24px 22px; display: flex; flex-direction: column; flex: 1; gap: 10px; }

        .bp-cat-pill { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; padding: 4px 10px 4px 8px; border-radius: 20px; width: fit-content; }
        .bp-cat-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

        .bp-title { font-size: 17px; font-weight: 700; color: #111827; line-height: 1.55; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; transition: color .2s; }
        .bp-card:hover .bp-title { color: #0F3460; }

        .bp-meta { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 14px; border-top: 1px solid #f3f4f6; }
        .bp-date { font-size: 12px; color: #9ca3af; font-weight: 500; }
        .bp-read-arrow { font-size: 13px; font-weight: 800; color: #d1d5db; display: inline-block; transition: color .2s, transform .2s; }
        .bp-card:hover .bp-read-arrow { color: #FE9700; transform: translateX(4px); }

        @media (max-width: 1024px) { .bp-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 900px)  { .bp-section { padding: 64px 24px; } .bp-header { flex-direction: column; align-items: flex-start; } }
        @media (max-width: 600px)  { .bp-grid { grid-template-columns: 1fr; } .bp-section { padding: 56px 16px; } }
      `}</style>

      <section id="insights" className="bp-section">
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

          {/* Header row */}
          <div className="bp-header">
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#9ca3af', margin: '0 0 12px' }}>FROM THE BLOG</p>
              <h2 style={{ fontSize: 'clamp(28px,3.2vw,46px)', fontWeight: 900, margin: 0, letterSpacing: '-0.5px', lineHeight: 1.15 }}>
                <span style={{ color: '#111827' }}>Latest </span><AuroraText>Insights</AuroraText>
              </h2>
            </div>
            <Link href="/blog" className="bp-view-all">View All Insights →</Link>
          </div>

          {/* Cards */}
          <div className="bp-grid">
            {displayPosts.map((post, i) => {
              const cat = CAT_STYLE[post.category] || CAT_STYLE.default
              const ph = IMG_PLACEHOLDER[i % IMG_PLACEHOLDER.length]
              return (
                <Link key={i} href={post.href} className="bp-card">
                  {/* Image */}
                  <div className="bp-img">
                    {post.image
                      ? <img src={post.image} alt={post.title} />
                      : <div style={{
                          width: '100%', height: '100%',
                          background: `linear-gradient(135deg, ${ph.from} 0%, ${ph.to} 100%)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                          </svg>
                        </div>
                    }
                  </div>

                  {/* Body */}
                  <div className="bp-body">
                    <span className="bp-cat-pill" style={{ background: cat.bg, color: cat.color }}>
                      <span className="bp-cat-dot" style={{ background: cat.dot }} />
                      {post.category}
                    </span>
                    <h3 className="bp-title">{post.title}</h3>
                    <div className="bp-meta">
                      <span className="bp-date">{post.date}</span>
                      <span className="bp-read-arrow">→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

        </div>
      </section>
    </>
  )
}
