import BlogHeader from '../components/blog/BlogHeader';
import BlogFooter from '../components/blog/BlogFooter';
import '../styles/blog.css';

/**
 * Pages Router _app — wraps all blog/search pages.
 * Uses dedicated BlogHeader/BlogFooter — fully self-contained,
 * no Tailwind CSS conflicts with the App Router homepage.
 */
export default function App({ Component, pageProps }) {
  return (
    <>
      <BlogHeader />
      <main style={{ minHeight: '70vh' }}>
        <Component {...pageProps} />
      </main>
      <BlogFooter />
    </>
  );
}
