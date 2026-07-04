import { Html, Head, Main, NextScript } from 'next/document';

const GTM_ID = 'GTM-TGMKTBL';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to external origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        {/* Favicon */}
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" type="image/png" href="/images/1solutions-favicon.png?v=2" />
        <link rel="apple-touch-icon" href="/images/1solutions-favicon.png?v=2" />
        {/* Theme color */}
        <meta name="theme-color" content="#114171" />
        <meta property="og:site_name" content="1Solutions" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
