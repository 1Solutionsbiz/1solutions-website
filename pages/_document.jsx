import { Html, Head, Main, NextScript } from 'next/document';

const GTM_ID = 'GTM-TGMKTBL';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/images/1solutions-favicon.png" />
        <link rel="icon" type="image/webp" href="/images/1solutions-favicon.webp" />
        <link rel="apple-touch-icon" href="/images/1solutions-favicon.png" />
        {/* Theme color */}
        <meta name="theme-color" content="#114171" />
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="252jFsFhtusIQZlJdn2HMUnYv9qz3uOlvXG4iQ9YdgY" />
        {/* Global social meta */}
        <meta name="twitter:site" content="@1solutionsbiz" />
        <meta property="og:site_name" content="1Solutions" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:publisher" content="https://www.facebook.com/1solutions" />
        {/* Global OG image fallback */}
        <meta property="og:image" content="https://1solutions.biz/wp-content/uploads/2025/06/1Solutions.jpg" />
        <meta property="og:image:width" content="520" />
        <meta property="og:image:height" content="270" />
        <meta property="og:image:type" content="image/jpeg" />
      </Head>
      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
