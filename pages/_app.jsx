import Head from 'next/head';
import { Inter } from 'next/font/google';
import BlogHeader from '../components/blog/BlogHeader';
import BlogFooter from '../components/blog/BlogFooter';
import '../styles/blog.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function App({ Component, pageProps }) {
  // Pages can define getLayout to opt out of the default shell
  if (Component.getLayout) {
    return (
      <>
        <Head>
          <meta name="google-site-verification" content="252jFsFhtusIQZlJdn2HMUnYv9qz3uOlvXG4iQ9YdgY" />
          <meta name="twitter:site" content="@1solutionsbiz" />
          <meta property="article:publisher" content="https://www.facebook.com/1solutions" />
          <meta property="og:image" content="https://1solutions.biz/wp-content/uploads/2025/06/1Solutions.jpg" />
          <meta property="og:image:width" content="520" />
          <meta property="og:image:height" content="270" />
          <meta property="og:image:type" content="image/jpeg" />
        </Head>
        {Component.getLayout(<Component {...pageProps} />)}
      </>
    );
  }

  return (
    <>
      <Head>
        <meta name="google-site-verification" content="252jFsFhtusIQZlJdn2HMUnYv9qz3uOlvXG4iQ9YdgY" />
        <meta name="twitter:site" content="@1solutionsbiz" />
        <meta property="article:publisher" content="https://www.facebook.com/1solutions" />
        <meta property="og:image" content="https://1solutions.biz/wp-content/uploads/2025/06/1Solutions.jpg" />
        <meta property="og:image:width" content="520" />
        <meta property="og:image:height" content="270" />
        <meta property="og:image:type" content="image/jpeg" />
      </Head>
      <BlogHeader />
      <main className={inter.className} style={{ minHeight: '70vh' }}>
        <Component {...pageProps} />
      </main>
      <BlogFooter />
    </>
  );
}
