import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  getPosts, getFeaturedPost, getTotalPostCount, getCursorAtOffset,
  formatDate, stripHtml, getCategoryColor,
} from '../../../lib/graphql';
import BlogCard from '../../../components/blog/BlogCard';
import Pagination from '../../../components/blog/Pagination';

const PER_PAGE = 9;

export default function BlogPage({ posts, currentPage, totalPages }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1solutions.biz';

  return (
    <>
      <Head>
        <title>{`Blog — Page ${currentPage} | 1Solutions`}</title>
        <meta name="description" content={`Expert articles on web development, digital marketing, SEO, and AI. Page ${currentPage} of ${totalPages}.`} />
        <link rel="canonical" href={`${siteUrl}/blog/page/${currentPage}`} />
        {currentPage > 1 && <link rel="prev" href={currentPage === 2 ? `${siteUrl}/blog` : `${siteUrl}/blog/page/${currentPage - 1}`} />}
        {currentPage < totalPages && <link rel="next" href={`${siteUrl}/blog/page/${currentPage + 1}`} />}
      </Head>

      {/* ── BLOG HERO ── */}
      <section className="blog-hero">
        <div className="blog-hero-container">
          <h1>Insights &amp; Resources</h1>
          <p>Expert articles on web development, digital marketing, SEO, and emerging technology.</p>
        </div>
      </section>

      <div className="blog-container">
        {posts.length > 0 ? (
          <>
            <div className="blog-grid">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/blog" />
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
  try {
    const total      = await getTotalPostCount();
    const totalPages = Math.ceil(total / PER_PAGE);

    // Pre-build first 5 pages; rest generate on demand
    const paths = [];
    for (let p = 2; p <= Math.min(totalPages, 5); p++) {
      paths.push({ params: { page: String(p) } });
    }

    return { paths, fallback: 'blocking' };
  } catch (err) {
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  const page = parseInt(params.page, 10);

  if (isNaN(page) || page < 2) {
    return { redirect: { destination: '/blog', permanent: true } };
  }

  try {
    const total      = await getTotalPostCount();
    const totalPages = Math.ceil(total / PER_PAGE);

    if (page > totalPages) return { notFound: true };

    // Get the cursor marking the end of the previous page
    const offset = (page - 1) * PER_PAGE;
    const after  = await getCursorAtOffset(offset);

    const postsData = await getPosts({ first: PER_PAGE, after });

    return {
      props: {
        posts:       postsData.nodes || [],
        currentPage: page,
        totalPages,
      },
      revalidate: 3600,
    };
  } catch (err) {
    console.error('BlogPage error:', err);
    return { notFound: true };
  }
}
