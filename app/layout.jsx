import '../styles/globals.css'
import '../styles/blog.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  metadataBase: new URL('https://www.1solutions.biz'),
  title: {
    default: '1Solutions – Web Development & Digital Marketing Agency',
    template: '%s | 1Solutions',
  },
  description: 'Award-winning web development and digital marketing agency. 15+ years, 1200+ projects delivered across US, Canada & Australia. Build. Grow. Scale.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.1solutions.biz',
    siteName: '1Solutions',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="pt-[68px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
