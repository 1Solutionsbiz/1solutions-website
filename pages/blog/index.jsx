import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts, getFeaturedPost, getCategories, formatDate, stripHtml, getCategoryColor } from '../../lib/graphql';
import BlogCard from '../../components/blog/BlogCard';
import Pagination from '../../components/blog/Pagination';

export default function BlogIndex({ featuredPost, posts, pageInfo, categories, currentAfter }) {
  const feat     = featuredPost;
  const featCat  = feat?.categories?.nodes?.[0];
  const featColor = featCat ? getCategoryColor(featCat.slug) : 'cat-orange';

  return (
    <>
      <Head>
        <title>Blog & Resources | 1Solutions — Web Development & Digital Marketing</title>
        <meta name="description" content="Expert articles on web development, digital marketing, SEO, AI, and e-commerce. 460+ articles from 1Solutions." />
        <meta property="og:title" content="Blog | 1Solutions" />
        <meta property="og:description" content="Expert insights on web development, SEO, and digital marketing." />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/blog`} />
      </Head>

      {/* ── BLOG HERO ── */}
      <section className="blog-hero">
        <div className="blog-hero-container">
          <h1>Insights &amp; Resources</h1>
          <p>Expert articles on web development, digital marketing, SEO, and emerging technology — helping your business stay ahead.</p>
        </div>
      </section>

      <div className="blog-container">

        {/* ── FEATURED POST ── */}
        {feat && !currentAfter && (
          <article className="featured-article">
            <div className="featured-image">
              {feat.featuredImage?.node ? (
                <Image
                  src={feat.featuredImage.node.sourceUrl}
                  alt={feat.featuredImage.node.altText || feat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              ) : (
                <span className="img-placeholder">📝</span>
              )}
            </div>

            <div className="featured-content">
              {featCat && (
                <Link href={`/blog/category/${featCat.slug}`} className={`featured-badge ${featColor}`}>
                  {featCat.name}
                </Link>
              )}
              <h2><Link href={`/blog/${feat.slug}`}>{feat.title}</Link></h2>
              <div className="featured-meta">
                <span>{formatDate(feat.date)}</span>
                {feat.readingTime && <span>{feat.readingTime}</span>}
              </div>
              <p className="featured-description">
                {stripHtml(feat.excerpt).slice(0, 180)}…
              </p>
              <Link href={`/blog/${feat.slug}`} className="read-more-btn">
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
            <Pagination
              pageInfo={pageInfo}
              baseUrl="/blog"
              currentCursor={currentAfter}
            />
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

export async function getStaticProps({ params }) {
  try {
    const [featured, postsData, categories] = await Promise.all([
      getFeaturedPost(),
      getPosts({ first: 9 }),
      getCategories({ first: 10 }),
    ]);

    // Remove featured post from the grid on page 1
    const allNodes = postsData.nodes || [];
    const gridPosts = featured
      ? allNodes.filter((p) => p.slug !== featured.slug)
      : allNodes;

    return {
      props: {
        featuredPost:  featured || null,
        posts:         gridPosts,
        pageInfo:      postsData.pageInfo || null,
        categories:    categories || [],
        currentAfter:  null,
      },
      revalidate: 3600, // ISR — regenerate every hour
    };
  } catch (err) {
    console.error('Blog index error:', err);
    return { props: { featuredPost: null, posts: [], pageInfo: null, categories: [], currentAfter: null }, revalidate: 60 };
  }
}
