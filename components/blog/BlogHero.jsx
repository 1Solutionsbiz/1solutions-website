import { useState } from 'react';
import { useRouter } from 'next/router';

export default function BlogHero({ totalPosts = 0 }) {
  const [q, setQ] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <section className="blog-hero">
      <div className="blog-hero-container">
        <h1>Insights &amp; Resources</h1>
        <p>Expert articles on web development, digital marketing, SEO, and emerging technology — helping your business stay ahead.</p>
        <form onSubmit={handleSearch} className="blog-hero-search" role="search">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={totalPosts > 0 ? `Search ${totalPosts.toLocaleString()}+ articles…` : 'Search articles…'}
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
  );
}
