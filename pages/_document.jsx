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
        {/* reCAPTCHA v3 */}
        <script src="https://www.google.com/recaptcha/api.js?render=6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs" async />
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/images/1solutions-favicon.png" />
        <link rel="icon" type="image/webp" href="/images/1solutions-favicon.webp" />
        <link rel="apple-touch-icon" href="/images/1solutions-favicon.png" />
        {/* Theme color */}
        <meta name="theme-color" content="#114171" />
        <meta property="og:site_name" content="1Solutions" />
        <meta property="og:locale" content="en_US" />
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
