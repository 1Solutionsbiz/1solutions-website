import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import BlogHeader from '../components/blog/BlogHeader';
import BlogFooter from '../components/blog/BlogFooter';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const RC_SRC = 'https://www.google.com/recaptcha/api.js?render=6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const events = ['scroll', 'click', 'touchstart', 'keydown'];
    const load = () => {
      events.forEach(e => window.removeEventListener(e, load));
      if (!document.querySelector(`script[src="${RC_SRC}"]`)) {
        const s = document.createElement('script');
        s.src = RC_SRC;
        s.async = true;
        document.head.appendChild(s);
      }
    };
    events.forEach(e => window.addEventListener(e, load, { passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, load));
  }, []);

  if (Component.getLayout) {
    return (
      <>
        <Head>
          <meta name="google-site-verification" content="252jFsFhtusIQZlJdn2HMUnYv9qz3uOlvXG4iQ9YdgY" />
          <meta name="twitter:site" content="@1solutionsbiz" />
          <meta property="article:publisher" content="https://www.facebook.com/1solutions" />
          <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/jpeg" />
        </Head>
        <Script id="gtm-init" strategy="lazyOnload">{`
          setTimeout(function(){
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TGMKTBL');
          }, 5000);
        `}</Script>
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
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
      </Head>
      <Script id="gtm-init-default" strategy="lazyOnload">{`
          setTimeout(function(){
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TGMKTBL');
          }, 5000);
        `}</Script>
      <BlogHeader />
      <main className={inter.className} style={{ minHeight: '70vh', overflowX: 'hidden' }}>
        <Component {...pageProps} />
      </main>
      <BlogFooter />
    </>
  );
}
