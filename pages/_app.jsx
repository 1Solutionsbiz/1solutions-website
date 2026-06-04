import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../styles/layout.css';
import '../styles/blog.css';

/**
 * Pages Router _app — wraps all blog/search pages.
 * App Router (app/) handles the homepage separately via app/layout.jsx.
 */
export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
