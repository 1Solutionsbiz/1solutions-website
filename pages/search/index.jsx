import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import BlogCard from '../../components/blog/BlogCard';

export default function SearchPage() {
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const res  = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      setResults(data.posts || []);
    } catch (err) {
      console.error('Search error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Search | 1Solutions Blog</title>
        <meta name="description" content="Search 460+ articles on web development, SEO, digital marketing, and more." />
        <meta name="robots" content="noindex" />
      </Head>

      <section className="archive-hero" style={{ background: 'linear-gradient(135deg, rgba(17,65,113,0.05) 0%, rgba(254,151,0,0.05) 100%)' }}>
        <div className="archive-hero-container">
          <div className="archive-hero-badge cat-blue">Search</div>
          <h1>Search Articles</h1>
          <p>Browse 460+ expert articles on web development, SEO, digital marketing, and more.</p>

          <form onSubmit={handleSearch} className="search-form" role="search">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="search-input"
              aria-label="Search articles"
              autoFocus
            />
            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? 'Searching…' : 'Search →'}
            </button>
          </form>
        </div>
      </section>

      <div className="blog-container">
        {searched && !loading && (
          <p className="search-results-count">
            {results.length > 0
              ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
              : `No results for "${query}"`}
          </p>
        )}

        {results.length > 0 && (
          <div className="blog-grid">
            {results.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {searched && !loading && results.length === 0 && (
          <div className="no-posts">
            <h2>No articles found.</h2>
            <p>Try a different keyword, or browse by topic below.</p>
            <Link href="/blog" className="read-more-btn">← All Articles</Link>
          </div>
        )}
      </div>

      <style jsx>{`
        .search-form {
          display: flex;
          gap: 12px;
          margin-top: 32px;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }
        .search-input {
          flex: 1;
          padding: 14px 20px;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 16px;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .search-input:focus { border-color: var(--primary); }
        .search-btn {
          padding: 14px 28px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .search-btn:hover:not(:disabled) { background: var(--navy); }
        .search-btn:disabled { opacity: 0.6; cursor: wait; }
        .search-results-count {
          font-size: 15px;
          color: var(--text-light);
          margin-bottom: 40px;
          font-weight: 500;
        }
      `}</style>
    </>
  );
}
