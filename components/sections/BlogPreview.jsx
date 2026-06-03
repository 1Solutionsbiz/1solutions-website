import Link from 'next/link'

const staticPosts = [
  { mins: '9', title: 'How Much Does It Cost to Build a Custom Real Estate App?' },
  { mins: '10', title: 'What Is Narrow AI? The Complete Guide to Artificial Narrow Intelligence' },
  { mins: '9', title: 'Blockchain in Healthcare: Revolutionizing Data Security & Patient Care' },
  { mins: '13', title: 'Knowledge Representation in AI: Types, Approaches, Cycles & Future Trends' },
  { mins: '12', title: 'Cloud Computing Security: Best Practices for Protecting Your Business Data' },
  { mins: '11', title: 'Mobile App Development Trends 2026: What to Expect and Implement' },
]

export default function BlogPreview({ posts }) {
  // Use WordPress posts if available, fall back to static
  const gridPosts = posts?.length ? posts.slice(0, 6).map(p => ({
    mins: '8',
    title: p.title?.rendered?.replace(/<[^>]+>/g, '') || p.title,
    href: `/blog/${p.slug}`,
  })) : staticPosts.map(p => ({ ...p, href: '/blog' }))

  return (
    <section id="insights" style={{ padding: '80px 40px', background: '#fff' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 900, color: '#0F3460', textAlign: 'center', marginBottom: '12px' }}>
          Latest Insights
        </h2>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '48px', fontSize: '16px', maxWidth: '600px', margin: '0 auto 48px' }}>
          Stay informed with our latest blogs, offering valuable knowledge and trends to empower your business decisions.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Featured */}
          <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', background: '#f9fafb' }}>
            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=280&fit=crop" alt="Featured"
              style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
            <div style={{ padding: '24px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', background: '#e5e7eb', padding: '3px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '12px' }}>11 mins read</span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F3460', marginBottom: '16px', lineHeight: 1.4 }}>
                GreenTech Software Development: The Complete Guide to Building Sustainable Digital Solutions
              </h3>
              <Link href="/blog" style={{ color: '#FE9700', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>Read more →</Link>
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {gridPosts.map((post, i) => (
              <div key={i} style={{ borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', background: '#f9fafb' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280', background: '#e5e7eb', padding: '2px 8px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>{post.mins} mins read</span>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0F3460', marginBottom: '12px', lineHeight: 1.5 }}>{post.title}</h3>
                <Link href={post.href} style={{ color: '#FE9700', fontWeight: 600, fontSize: '12px', textDecoration: 'none' }}>Read more →</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
