import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  getPosts, getFeaturedPost, getTotalPostCount,
  formatDate, stripHtml, getCategoryColor,
} from '../../lib/graphql';
import BlogCard from '../../components/blog/BlogCard';
import Pagination from '../../components/blog/Pagination';

const PER_PAGE = 9;

export default function BlogIndex({ featuredPost, posts, totalPages }) {
  const feat      = featuredPost;
  const featCat   = feat?.categories?.nodes?.[0];
  const featColor = featCat ? getCategoryColor(featCat.slug) : 'cat-orange';
  const siteUrl   = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1solutions.biz';
  const [searchQ, setSearchQ] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQ.trim()) router.push(`/search?q=${encodeURIComponent(searchQ.trim())}`);
  };

  return (
    <>
      <Head>
        <title>Blog &amp; Resources | 1Solutions — Web Development &amp; Digital Marketing</title>
        <meta name="description" content="Expert articles on web development, digital marketing, SEO, AI, and e-commerce. 460+ articles from 1Solutions." />
        <meta property="og:title" content="Blog | 1Solutions" />
        <meta property="og:description" content="Expert insights on web development, SEO, and digital marketing." />
        <link rel="canonical" href={`${siteUrl}/blog`} />
        {totalPages > 1 && <link rel="next" href={`${siteUrl}/blog/page/2`} />}
      </Head>

      {/* ── BLOG HERO ── */}
      <section className="blog-hero">
        <div className="blog-hero-container">
          <h1>Insights &amp; Resources</h1>
          <p>Expert articles on web development, digital marketing, SEO, and emerging technology — helping your business stay ahead.</p>
          <form onSubmit={handleSearch} className="blog-hero-search" role="search">
            <input
              type="search"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search 2,400+ articles…"
              aria-label="Search articles"
              className="blog-hero-search-input"
            />
            <button type="submit" className="blog-hero-search-btn" aria-label="Search">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </form>
        </div>
      </section>

      <div className="blog-container">

        {/* ── FEATURED POST ── */}
        {feat && (
          <article className="featured-article">
            <div className="featured-image">
              {feat.featuredImage?.node ? (
                <Image
                  src={feat.featuredImage.node.sourceUrl}
                  alt={feat.featuredImage.node.altText || feat.title}
                  width={800}
                  height={600}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  priority
                />
              ) : (
                <span className="img-placeholder">📝</span>
              )}
            </div>

            <div className="featured-content">
              {featCat && (
                <Link href={`/${featCat.slug}`} className={`featured-badge ${featColor}`}>
                  {featCat.name}
                </Link>
              )}
              <h2><Link href={`/${feat.slug}`}>{feat.title}</Link></h2>
              <div className="featured-meta">
                <span>{formatDate(feat.date)}</span>
                {feat.readingTime && <span>{feat.readingTime}</span>}
              </div>
              <p className="featured-description">
                {stripHtml(feat.excerpt).slice(0, 180)}…
              </p>
              <Link href={`/${feat.slug}`} className="read-more-btn">
                Read Article →
              </Link>
            </div>
          </article>
        )}

        {/* ── BLOG GRID ── */}
        {posts.length > 0 ? (
          <>
            <div className="blog-grid">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <Pagination currentPage={1} totalPages={totalPages} baseUrl="/blog" />
          </>
        ) : (
          <div className="no-posts">
            <h2>No articles found.</h2>
            <Link href="/" className="read-more-btn">← Back to Home</Link>
          </div>
        )}

      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const [featured, postsData, total] = await Promise.all([
      getFeaturedPost(),
      getPosts({ first: PER_PAGE }),
      getTotalPostCount(),
    ]);

    // Remove featured post from the grid so it doesn't duplicate
    const allNodes  = postsData.nodes || [];
    const gridPosts = featured
      ? allNodes.filter((p) => p.slug !== featured.slug)
      : allNodes;

    const totalPages = Math.ceil((total || allNodes.length) / PER_PAGE);

    return {
      props: {
        featuredPost: featured || null,
        posts:        gridPosts,
        totalPages:   totalPages || 1,
      },
      revalidate: 3600,
    };
  } catch (err) {
    console.error('Blog index error:', err);
    return {
      props: { featuredPost: null, posts: [], totalPages: 1 },
      revalidate: 60,
    };
  }
}
