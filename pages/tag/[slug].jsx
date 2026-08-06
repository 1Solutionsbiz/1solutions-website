import Head from 'next/head';
import Link from 'next/link';
import { getTagWithPosts, getCategories, getTotalPostCount } from '../../lib/graphql';
import BlogCard from '../../components/blog/BlogCard';
import BlogHero from '../../components/blog/BlogHero';
import Pagination from '../../components/blog/Pagination';

export default function TagArchive({ tag, posts, pageInfo, categories, totalPosts }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1solutions.biz';

  return (
    <>
      <Head>
        <title>{tag.name} - Blog | 1Solutions</title>
        <meta name="description" content={`Articles tagged with ${tag.name} from 1Solutions - ${tag.count} posts.`} />
        <link rel="canonical" href={`${siteUrl}/tag/${tag.slug}`} />
      </Head>

      <BlogHero totalPosts={totalPosts} />

      {/* Tag context strip */}
      <div className="archive-filters-bar">
        <div className="archive-filters-inner">
          <span className="filters-label">
            Tag: <strong>#{tag.name}</strong>
            {tag.count > 0 && <span style={{ marginLeft: 8, fontWeight: 400, color: 'var(--text-light)' }}>- {tag.count} article{tag.count !== 1 ? 's' : ''}</span>}
          </span>
          <div className="filters">
            <Link href="/blog" className="filter-btn">All Posts</Link>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`} className="filter-btn">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="blog-container">
        {posts.length > 0 ? (
          <>
            <div className="blog-grid">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <Pagination pageInfo={pageInfo} baseUrl={`/tag/${tag.slug}`} />
          </>
        ) : (
          <div className="no-posts">
            <h2>No articles found.</h2>
            <Link href="/blog" className="read-more-btn">← Back to Blog</Link>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    const [tag, categories, total] = await Promise.all([
      getTagWithPosts(params.slug, { first: 24 }),
      getCategories({ first: 10 }),
      getTotalPostCount(),
    ]);

    if (!tag) return { notFound: true };

    return {
      props: {
        tag,
        posts:      tag.posts?.nodes || [],
        pageInfo:   tag.posts?.pageInfo || null,
        categories: categories || [],
        totalPosts: total || 0,
      },
      revalidate: 3600,
    };
  } catch (err) {
    console.error('Tag archive error:', err);
    return { notFound: true };
  }
}
