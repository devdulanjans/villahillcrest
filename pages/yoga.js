import Head from 'next/head'
import Layout from '../components/Layout'

export default function YogaPage() {
  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Yoga</title>
        <meta
          name="description"
          content="Explore yoga retreats and surf-yoga packages at Villa Hillcrest in Sri Lanka."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/yoga" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph tags */}
        <meta property="og:title" content="Villa Hillcrest | Yoga" />
        <meta property="og:description" content="Explore yoga retreats and surf-yoga packages at Villa Hillcrest in Sri Lanka." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villahillcrest.com/yoga" />
        <meta property="og:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Hillcrest | Yoga" />
        <meta name="twitter:description" content="Explore yoga retreats and surf-yoga packages at Villa Hillcrest in Sri Lanka." />
        <meta name="twitter:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Yoga at Villa Hillcrest",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://villahillcrest.com/yoga"
          },
          "url": "https://villahillcrest.com/yoga"
        }) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Montserrat:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="yoga-page">
        <section className="yoga-hero" aria-label="Yoga retreat hero" />
          {/* Internal links for SEO and navigation */}
          <nav aria-label="Related links" style={{ margin: '32px 0', textAlign: 'center' }}>
            <span style={{ fontWeight: 600, marginRight: 8 }}>Explore more:</span>
            <a href="/villa" aria-label="Villa rooms and amenities" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Villa</a>
            <a href="/dining" aria-label="Dining experiences" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Dining</a>
            <a href="/foods" aria-label="Foods and menu" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Foods</a>
            <a href="/explore" aria-label="Explore local experiences" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Explore</a>
            <a href="/bookings" aria-label="Book your stay" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Bookings</a>
            <a href="/contact-us" aria-label="Contact us" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Contact Us</a>
          </nav>

        <section className="intro yoga-intro" aria-labelledby="yoga-heading">
          <div className="container yoga-intro-container">
            <h2 id="yoga-heading">Yoga retreat in Sri Lanka</h2>
            <p>
              We love surfing and we noticed that we feel better, move with more
              ease, and recover faster when we include yoga in our weekly rhythm.
              Yoga increases flexibility, balance, and strength while helping you
              feel grounded both in and out of the water.
            </p>
            <p>
              For that reason, yoga is included in selected surf packages. We offer
              daily classes designed for beginners through advanced practitioners,
              with dedicated spaces and calming views that support mindful practice.
            </p>
            <p>
              From energizing morning flows to slower evening sessions, our classes
              are crafted to complement your day and leave you centered. Mats and
              props are available, so you can simply arrive and enjoy the practice.
            </p>
          </div>
        </section>

        <section className="yoga-package" aria-label="Surf and yoga package">
          <div className="yoga-package-overlay">
            <h3>Surf & yoga packages starting from €349</h3>
            <a href="/bookings" className="yoga-package-btn">Take me to surf camp</a>
          </div>
        </section>
      </main>
    </Layout>
  )
}
