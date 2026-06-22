import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import {
  getPostBySlug, getAllPostSlugs, getRelatedPosts,
  getCategoryWithPosts, getAllCategorySlugs, getCategories,
  formatDate, stripHtml, getCategoryColor, getReadingTime
} from '../lib/graphql';
import BlogCard from '../components/blog/BlogCard';
import Pagination from '../components/blog/Pagination';

// Author social links mapping (update here)
const AUTHOR_LINKEDIN = {
  'atul@1solutions.biz': 'https://www.linkedin.com/in/atulchaudhary01/',
  'Atul Chaudhary': 'https://www.linkedin.com/in/atulchaudhary01/',
  'ritika@1solutions.biz': 'https://www.linkedin.com/company/1solutions',
  'Ritika': 'https://www.linkedin.com/company/1solutions',
};

const AUTHOR_EMAIL = {
  'atul@1solutions.biz': 'atul@1solutions.biz',
  'Atul Chaudhary': 'atul@1solutions.biz',
  'ritika@1solutions.biz': 'ritika@1solutions.biz',
  'Ritika': 'ritika@1solutions.biz',
};

const AUTHOR_WEBSITE = {
  'atul@1solutions.biz': 'https://www.1solutions.biz',
  'Atul Chaudhary': 'https://www.1solutions.biz',
  'ritika@1solutions.biz': 'https://www.1solutions.biz',
  'Ritika': 'https://www.1solutions.biz',
};

// ── CATEGORY PAGE COMPONENT ──────────────────────────────────────────────────
function CategoryPage({ category, posts, pageInfo, allCategories, currentAfter }) {
  const color   = getCategoryColor(category.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1solutions.biz';

  return (
    <>
      <Head>
        <title>{category.name} Articles | 1Solutions Blog</title>
        <meta name="description" content={category.description || `Browse all ${category.name} articles from 1Solutions — ${category.count} posts.`} />
        <link rel="canonical" href={`${siteUrl}/${category.slug}`} />
      </Head>

      {/* Category Hero */}
      <section className="archive-hero category-hero">
        <div className="archive-hero-container">
          <div className={`archive-hero-badge ${color}`}>Category</div>
          <h1>{category.name}</h1>
          {category.description && <p>{category.description}</p>}
          <div className="archive-hero-meta">
            <span className="archive-count">{category.count} Articles</span>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <div className="archive-filters-bar">
        <div className="archive-filters-inner">
          <span className="filters-label">Related Topics:</span>
          <div className="filters">
            <Link href="/blog" className="filter-btn">All</Link>
            {allCategories
              .filter((c) => c.slug !== category.slug)
              .slice(0, 8)
              .map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="filter-btn">
                  {c.name}
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
            <Pagination
              pageInfo={pageInfo}
              baseUrl={`/${category.slug}`}
              currentCursor={currentAfter}
            />
          </>
        ) : (
          <div className="no-posts">
            <h2>No articles in this category yet.</h2>
            <Link href="/blog" className="read-more-btn">← All Articles</Link>
          </div>
        )}
      </div>
    </>
  );
}

// ── SINGLE POST COMPONENT ────────────────────────────────────────────────────
function SinglePost({ post, relatedPosts }) {
  const tocRef     = useRef(null);
  const contentRef = useRef(null);

  const cat      = post.categories?.nodes?.[0];
  const catColor = cat ? getCategoryColor(cat.slug) : 'cat-orange';
  const siteUrl  = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1solutions.biz';
  const postUrl  = `${siteUrl}/${post.slug}`;

  // Auto-generate TOC from h2/h3 in article content
  useEffect(() => {
    const toc     = tocRef.current;
    const content = contentRef.current;
    if (!toc || !content) return;

    const headings = content.querySelectorAll('h2, h3');
    toc.innerHTML  = '';

    headings.forEach((h, i) => {
      if (!h.id) h.id = `heading-${i}-${h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

      const a       = document.createElement('a');
      a.href        = `#${h.id}`;
      a.textContent = h.textContent;
      a.className   = h.tagName === 'H3' ? 'toc-h3' : 'toc-h2';

      a.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      toc.appendChild(a);
    });

    // Active TOC item on scroll
    const links = toc.querySelectorAll('a');
    const onScroll = () => {
      const scrollPos = window.scrollY + 120;
      let active = null;
      headings.forEach((h, i) => { if (h.offsetTop <= scrollPos) active = links[i]; });
      links.forEach((l) => l.classList.toggle('toc-active', l === active));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [post.slug]);

  // Mobile TOC toggle
  const handleTocToggle = () => {
    const sidebar = document.getElementById('post-sidebar');
    const btn     = document.getElementById('toc-toggle');
    if (!sidebar || !btn) return;
    const open = sidebar.classList.toggle('active');
    btn.textContent = open ? '✕ Close' : '☰ Table of Contents';
  };

  // Copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl).catch(() => {});
  };

  const seoTitle       = post.seo?.title       || `${post.title} | 1Solutions`;
  const seoDescription = post.seo?.metaDesc    || stripHtml(post.excerpt).slice(0, 160);
  const seoImage       = post.seo?.opengraphImage?.sourceUrl || post.featuredImage?.node?.sourceUrl;

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={post.seo?.canonical || postUrl} />
        {/* Open Graph */}
        <meta property="og:title"       content={post.seo?.opengraphTitle || seoTitle} />
        <meta property="og:description" content={post.seo?.opengraphDescription || seoDescription} />
        <meta property="og:url"         content={postUrl} />
        <meta property="og:type"        content="article" />
        {seoImage && <meta property="og:image" content={seoImage} />}
        {/* Article meta */}
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time"  content={post.modified} />
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context':         'https://schema.org',
            '@type':            'Article',
            headline:           post.title,
            description:        seoDescription,
            datePublished:      post.date,
            dateModified:       post.modified,
            author:             { '@type': 'Person', name: post.author?.node?.name },
            publisher:          { '@type': 'Organization', name: '1Solutions', logo: { '@type': 'ImageObject', url: `${siteUrl}/images/logo.png` } },
            mainEntityOfPage:   { '@type': 'WebPage', '@id': postUrl },
            ...(seoImage ? { image: { '@type': 'ImageObject', url: seoImage } } : {}),
          }) }}
        />
      </Head>

      <div className="single-post-wrapper">
        <div className="single-post-layout">

          {/* ── ARTICLE ── */}
          <main className="post-article" id="main-content">

            <button className="toc-toggle" id="toc-toggle" onClick={handleTocToggle} aria-expanded="false">
              ☰ Table of Contents
            </button>

            {/* Breadcrumb */}
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blog">Blog</Link>
              {cat && (<><span>/</span><Link href={`/${cat.slug}`}>{cat.name}</Link></>)}
              <span>/</span>
              <span className="breadcrumb-current">{post.title}</span>
            </nav>

            {/* Header */}
            <header className="article-header">
              <h1 className="article-title">{post.title}</h1>
              <div className="article-meta">
                {cat && (
                  <Link href={`/${cat.slug}`} className={`article-category-badge ${catColor}`}>
                    {cat.name}
                  </Link>
                )}
                <div className="article-author-meta">
                  {post.author?.node?.avatar?.url && (
                    <Image
                      src={post.author.node.avatar.url}
                      alt={post.author.node.name}
                      width={36} height={36}
                      className="author-avatar-sm"
                      style={{ borderRadius: '50%' }}
                    />
                  )}
                  {post.author?.node?.slug ? (
                    <Link href={`/author/${post.author.node.slug}`} className="author-meta-name">{post.author.node.name}</Link>
                  ) : (
                    <span className="author-meta-name">{post.author?.node?.name}</span>
                  )}
                </div>
                <time className="meta-date" dateTime={post.date}>{formatDate(post.date)}</time>
                {post.readingTime && <span className="meta-read-time">⏱ {post.readingTime}</span>}
                <div className="article-share" aria-label="Share">
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`} className="share-btn share-linkedin" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.043-8.811 0-9.726h3.554v1.375c.427-.659 1.191-1.597 2.898-1.597 2.117 0 3.704 1.384 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.748-1.915-1.686 0-.955.768-1.686 1.959-1.686 1.19 0 1.916.73 1.916 1.686 0 .938-.726 1.686-1.96 1.686zm1.6 11.019H3.738V9.726h3.199v10.726zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/></svg>
                  </a>
                  <a href={`https://x.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`} className="share-btn share-x" target="_blank" rel="noopener noreferrer" aria-label="Share on X">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.694l-5.248-6.856-6.027 6.856H2.421l7.782-8.917L2.959 2.25h6.863l4.744 6.278 5.578-6.278z"/></svg>
                  </a>
                  <button className="share-btn share-copy" onClick={handleCopyLink} aria-label="Copy link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  </button>
                </div>
              </div>
            </header>

            {/* AI Summary */}
            <div className="ai-summary-bar">
              <span className="ai-summary-label">AI Summary</span>
              <div className="ai-summary-links">
                <a href={`https://chatgpt.com/?q=${encodeURIComponent('Summarize this article: ' + postUrl)}`} target="_blank" rel="noopener noreferrer" className="ai-summary-btn" aria-label="Summarise with ChatGPT">
                  <svg width="18" height="18" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.131-3.386 10.078 10.078 0 0 0-10.051 4.93 9.964 9.964 0 0 0-6.664 4.834 10.078 10.078 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.131 3.386 10.079 10.079 0 0 0 10.056-4.93 9.965 9.965 0 0 0 6.664-4.834 10.079 10.079 0 0 0-1.243-11.818zm-15.217 21.244a7.474 7.474 0 0 1-4.801-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.487 7.725zM4.27 34.268a7.474 7.474 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103L14.377 37.0a7.505 7.505 0 0 1-10.107-2.732zM3.357 13.763a7.474 7.474 0 0 1 3.908-3.285c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L6.044 23.86a7.505 7.505 0 0 1-2.687-10.097zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.084-4.669a7.498 7.498 0 0 1 11.1 7.787zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.498v4.996l-4.331 2.5-4.331-2.5V18.143z" fill="currentColor"/></svg>
                  ChatGPT
                </a>
                <a href={`https://claude.ai/new?q=${encodeURIComponent('Summarize this article: ' + postUrl)}`} target="_blank" rel="noopener noreferrer" className="ai-summary-btn" aria-label="Summarise with Claude">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M11.997 0C5.378 0 0 5.373 0 11.997 0 18.62 5.378 24 11.997 24 18.62 24 24 18.62 24 11.997 24 5.373 18.62 0 11.997 0zm3.71 17.323c-.192.049-.373.073-.544.073-.476 0-.826-.147-1.053-.44-.163-.213-.227-.47-.193-.77l.032-.245-.109.1c-.882.836-1.864 1.254-2.947 1.254-1.016 0-1.85-.336-2.504-1.006-.653-.67-.98-1.546-.98-2.628 0-1.194.41-2.165 1.228-2.91.818-.745 1.896-1.118 3.232-1.118.38 0 .755.034 1.123.103l.278.055V9.8c0-.614-.13-1.038-.388-1.275-.256-.236-.713-.355-1.37-.355a6.62 6.62 0 0 0-1.148.104 8.394 8.394 0 0 0-1.128.308l-.19.068-.185-.944.147-.056a9.84 9.84 0 0 1 1.336-.356 7.36 7.36 0 0 1 1.384-.13c1.046 0 1.82.236 2.32.706.5.472.753 1.193.753 2.164v4.232c0 .458.069.765.207.922.138.157.387.236.748.236.135 0 .283-.018.446-.053l.21-.047.068 1.023-.173.048zm-4.046-1.176c.938 0 1.835-.432 2.69-1.296l.068-.07V13.04l-.254-.052a6.6 6.6 0 0 0-1.215-.118c-.915 0-1.625.22-2.13.66-.505.44-.758 1.05-.758 1.83 0 .736.194 1.31.58 1.72.386.41.906.617 1.56.617l-.54-.55z" fill="currentColor"/></svg>
                  Claude
                </a>
                <a href={`https://x.com/i/grok?text=${encodeURIComponent('Summarize this article: ' + postUrl)}`} target="_blank" rel="noopener noreferrer" className="ai-summary-btn" aria-label="Summarise with Grok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z"/></svg>
                  Grok
                </a>
                <a href={`https://www.perplexity.ai/?q=${encodeURIComponent('Summarize this article: ' + postUrl)}`} target="_blank" rel="noopener noreferrer" className="ai-summary-btn" aria-label="Summarise with Perplexity">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M22 4.01c0-.006 0-.012-.003-.017a.042.042 0 0 0-.015-.031L16.5.068a.082.082 0 0 0-.084 0l-4.257 2.456-4.26-2.456a.082.082 0 0 0-.083 0L2.316 3.962a.042.042 0 0 0-.015.031A.046.046 0 0 0 2.3 4.01v9.141c0 .029.014.055.038.07l5.3 3.059v4.624l-2.39-1.379a.081.081 0 0 0-.082 0 .078.078 0 0 0-.041.07v4.193c0 .029.015.055.038.07l4.259 2.457a.081.081 0 0 0 .082 0l2.495-1.44 2.496 1.44a.082.082 0 0 0 .082 0L18.837 24a.078.078 0 0 0 .038-.07v-4.193a.078.078 0 0 0-.04-.07.082.082 0 0 0-.083 0l-2.391 1.38v-4.625l5.3-3.059a.079.079 0 0 0 .04-.07V4.01zM16.416.324l5.091 2.937-4.45 2.568-4.45-2.568L16.416.324zm-8.832 0L12.075 3.26l-4.45 2.568-4.45-2.568L7.584.324zm-5.2 12.674V4.597L7.015 7.44v5.808L2.384 13.0zm9.741 6.463-2.29-1.32v-4.054l-4.25-2.454-4.452 2.57V9.14l4.367-2.52 4.252 2.453V5.265l4.452-2.569V8.74l-4.117 2.378v3.547l2.29 1.32-.252 3.478zm3.535 3.857-3.986-2.3.234-3.22 3.752 2.166v3.354zm1.34-7.32-4.167-2.407v-3.546L8.667 9.14V4.012l4.452 2.568v4.625l4.116 2.377v4.917l-4.452-2.57v-3.547l4.116-2.377V4.012l4.452-2.568V9.14l-4.167 2.407.234 3.22 4.316-2.49v5.065l-4.452 2.57v-3.948zm0 4.503v-3.355l3.751-2.165.234 3.22-3.985 2.3z"/></svg>
                  Perplexity
                </a>
              </div>
            </div>

            {/* Featured image */}
            {post.featuredImage?.node && (
              <div className="article-featured-image">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  width={1200} height={630}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  priority
                />
              </div>
            )}

            {/* Article body */}
            <div
              className="article-content"
              ref={contentRef}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags?.nodes?.length > 0 && (
              <div className="article-tags">
                <span className="tags-label">Tags:</span>
                {post.tags.nodes.map((tag) => (
                  <Link key={tag.slug} href={`/tag/${tag.slug}`} className="article-tag-link">
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Author box */}
            {post.author?.node && (
              <div className="author-box">
                <div className="author-box-avatar">
                  {post.author.node.avatar?.url && (
                    <Image
                      src={post.author.node.avatar.url}
                      alt={post.author.node.name}
                      width={80} height={80}
                      className="author-avatar-lg"
                      style={{ borderRadius: '50%' }}
                    />
                  )}
                </div>
                <div className="author-box-content">
                  <h4>
                    {post.author.node.slug ? (
                      <Link href={`/author/${post.author.node.slug}`}>{post.author.node.name}</Link>
                    ) : post.author.node.name}
                  </h4>
                  {post.author.node.description && (
                    <p className="author-bio">{post.author.node.description}</p>
                  )}
                  {(AUTHOR_WEBSITE[post.author.node.name] || AUTHOR_EMAIL[post.author.node.name] || AUTHOR_LINKEDIN[post.author.node.name]) && (
                    <div className="author-social-links">
                      {AUTHOR_WEBSITE[post.author.node.name] && (
                        <a href={AUTHOR_WEBSITE[post.author.node.name]} className="author-social-link" target="_blank" rel="noopener noreferrer" aria-label="Website">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        </a>
                      )}
                      {AUTHOR_EMAIL[post.author.node.name] && (
                        <a href={`mailto:${AUTHOR_EMAIL[post.author.node.name]}`} className="author-social-link" aria-label="Email">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </a>
                      )}
                      {AUTHOR_LINKEDIN[post.author.node.name] && (
                        <a href={AUTHOR_LINKEDIN[post.author.node.name]} className="author-social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.043-8.811 0-9.726h3.554v1.375c.427-.659 1.191-1.597 2.898-1.597 2.117 0 3.704 1.384 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.748-1.915-1.686 0-.955.768-1.686 1.959-1.686 1.19 0 1.916.73 1.916 1.686 0 .938-.726 1.686-1.96 1.686zm1.6 11.019H3.738V9.726h3.199v10.726zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/></svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Related articles */}
            {relatedPosts?.length > 0 && (
              <section className="related-articles" aria-label="Related articles">
                <h3 className="related-title">Related Articles</h3>
                <div className="related-grid">
                  {relatedPosts.map((rp) => {
                    const rpCat  = rp.categories?.nodes?.[0];
                    const rpColor = rpCat ? getCategoryColor(rpCat.slug) : 'cat-blue';
                    return (
                      <article key={rp.slug} className="related-card">
                        {rp.featuredImage?.node && (
                          <Link href={`/${rp.slug}`} className="related-card-img-wrap">
                            <Image
                              src={rp.featuredImage.node.sourceUrl}
                              alt={rp.featuredImage.node.altText || rp.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="related-card-img"
                            />
                          </Link>
                        )}
                        <div className="related-card-body">
                        <h4><Link href={`/${rp.slug}`}>{rp.title}</Link></h4>
                        {rp.excerpt && (
                          <p className="related-card-excerpt">
                            {stripHtml(rp.excerpt).slice(0, 90).trim()}{stripHtml(rp.excerpt).length > 90 ? '…' : ''}
                          </p>
                        )}
                        <div className="related-card-footer">
                          {rp.author?.node && (
                            <div className="related-card-author">
                              {rp.author.node.avatar?.url && (
                                <Image
                                  src={rp.author.node.avatar.url}
                                  alt={rp.author.node.name}
                                  width={20}
                                  height={20}
                                  className="related-author-avatar"
                                />
                              )}
                              <span className="related-author-name">{rp.author.node.name}</span>
                            </div>
                          )}
                          <div className="related-card-meta">
                            {formatDate(rp.date)}{rp.readingTime ? ` · ${rp.readingTime}` : ''}
                          </div>
                        </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

          </main>

          {/* ── SIDEBAR ── */}
          <aside className="post-sidebar" id="post-sidebar">

            {/* TOC */}
            <div className="toc-widget">
              <div className="toc-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                TABLE OF CONTENTS
              </div>
              <nav className="toc-list" ref={tocRef} aria-label="Table of contents" />
            </div>

            {/* Newsletter */}
            <div className="sidebar-newsletter">
              <div className="newsletter-header">
                <div className="newsletter-icon">✉</div>
                <h4>Weekly Insights</h4>
              </div>
              <p>Get the latest in web development, SEO, and digital marketing — every Tuesday.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="newsletter-btn">Subscribe →</button>
              </form>
            </div>

            {/* CTA */}
            <div className="sidebar-cta">
              <div className="sidebar-cta-badge">1Solutions</div>
              <h4>Ready to Grow Your Business Online?</h4>
              <p>16+ years building digital products and driving measurable growth worldwide.</p>
              <ul className="sidebar-cta-features">
                <li>✓ Web Development</li>
                <li>✓ SEO &amp; Digital Marketing</li>
                <li>✓ Dedicated Resource Teams</li>
              </ul>
              <Link href="/#contact" className="sidebar-cta-btn">Book Free Consultation →</Link>
            </div>

          </aside>

        </div>
      </div>
    </>
  );
}

// ── UNIFIED PAGE COMPONENT ───────────────────────────────────────────────────
export default function SlugPage(props) {
  if (props.pageType === 'category') {
    return <CategoryPage {...props} />;
  }
  return <SinglePost {...props} />;
}

// ── getStaticPaths ───────────────────────────────────────────────────────────
export async function getStaticPaths() {
  try {
    const [postSlugs, categorySlugs] = await Promise.all([
      getAllPostSlugs(),
      getAllCategorySlugs(),
    ]);

    // Merge; posts take priority — deduplicate by keeping post slugs
    const postSet = new Set(postSlugs);
    const allSlugs = [
      ...postSlugs,
      ...categorySlugs.filter((s) => !postSet.has(s)),
    ];

    return {
      paths:    allSlugs.map((slug) => ({ params: { slug } })),
      fallback: 'blocking',
    };
  } catch (err) {
    console.error('getStaticPaths [slug] error:', err);
    return { paths: [], fallback: 'blocking' };
  }
}

// ── getStaticProps ───────────────────────────────────────────────────────────
export async function getStaticProps({ params }) {
  try {
    // Try as a blog post first
    const post = await getPostBySlug(params.slug);

    if (post) {
      post.readingTime = getReadingTime(post.content);

      const primaryCatSlug = post.categories?.nodes?.[0]?.slug;
      const relatedRaw = primaryCatSlug
        ? await getRelatedPosts(primaryCatSlug, params.slug, 3)
        : [];
      const related = relatedRaw.map((rp) => {
        const { content, ...rest } = rp;
        return { ...rest, readingTime: content ? getReadingTime(content) : null };
      });

      return {
        props:      { pageType: 'post', post, relatedPosts: related },
        revalidate: 3600,
      };
    }

    // Try as a category
    const [category, allCategories] = await Promise.all([
      getCategoryWithPosts(params.slug, { first: 9 }),
      getCategories({ first: 12 }),
    ]);

    if (!category) return { notFound: true };

    return {
      props: {
        pageType:     'category',
        category,
        posts:        category.posts?.nodes || [],
        pageInfo:     category.posts?.pageInfo || null,
        allCategories,
        currentAfter: null,
      },
      revalidate: 3600,
    };
  } catch (err) {
    console.error('SlugPage error:', err);
    return { notFound: true };
  }
}
