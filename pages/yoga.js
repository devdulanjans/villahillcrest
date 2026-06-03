import Head from 'next/head'
import Layout from '../components/Layout'
import BeSearchForm from "../components/be-forms/BeSearchForm";
import PageHero from '../components/PageHero'

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
        <PageHero title="Yoga Retreat" className="yoga-hero" ariaLabel="Yoga retreat hero" />

        <BeSearchForm />

          {/* Internal links for SEO and navigation */}
          <nav aria-label="Related links" className="villa-related-nav">
            <span>Explore more:</span>
            <a href="/villa" aria-label="Villa rooms and amenities">Villa</a>
            <a href="/dining" aria-label="Dining experiences">Dining</a>
            <a href="/foods" aria-label="Foods and menu">Foods</a>
            <a href="/explore" aria-label="Explore local experiences">Explore</a>
            <a href="/packages" aria-label="Packages">Packages</a>
            <a href="/contact-us" aria-label="Contact us">Contact Us</a>
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
            <a href="/packages" className="yoga-package-btn">Take me to surf camp</a>
          </div>
        </section>
      </main>
    </Layout>
  )
}
