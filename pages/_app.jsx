import { Inter } from 'next/font/google';
import BlogHeader from '../components/blog/BlogHeader';
import BlogFooter from '../components/blog/BlogFooter';
import '../styles/blog.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function App({ Component, pageProps }) {
  // Pages can define getLayout to opt out of the default shell
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  return (
    <>
      <BlogHeader />
      <main className={inter.className} style={{ minHeight: '70vh' }}>
        <Component {...pageProps} />
      </main>
      <BlogFooter />
    </>
  );
}
