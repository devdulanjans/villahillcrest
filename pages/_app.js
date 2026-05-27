import Head from 'next/head'
import '../styles/globals.css'
import '../styles/be-style.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/images/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
