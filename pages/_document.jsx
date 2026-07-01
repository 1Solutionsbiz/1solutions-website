import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Viewport — critical for mobile rendering */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Favicon */}
        <link rel="icon" href="/images/1solutions-favicon.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/images/1solutions-favicon.webp" />
        {/* Theme color */}
        <meta name="theme-color" content="#114171" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
