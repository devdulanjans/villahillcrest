import Head from 'next/head'
import Script from 'next/script'
import '../styles/globals.css'
import '../styles/be-style.css'
import WhatsAppButton from '../components/WhatsAppButton'

const SITE_FONT_QUERY = 'Comfortaa:wght@300..700'
const SITE_FONT_FAMILY = "'Comfortaa', sans-serif"

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href={`https://fonts.googleapis.com/css2?family=${SITE_FONT_QUERY}&display=swap`} rel="stylesheet" />
        <style>{`:root { --site-font-family: ${SITE_FONT_FAMILY}; }`}</style>
      </Head>
      <Component {...pageProps} />
      <WhatsAppButton />
      <Script
        id="tawk-to"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/6a1ff21a9a52f51c31762168/1jq6cjepn';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />
    </>
  )
}
