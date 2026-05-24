import Head from 'next/head'
import Layout from '../components/Layout'

const offerItems = [
  {
    title: 'Surf & Stay Saver',
    price: 'From USD 329',
    detail: '3 nights stay, daily surf coaching, and breakfast included.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop'
  },
  {
    title: 'Yoga Week Escape',
    price: 'From USD 389',
    detail: '5 nights villa stay with daily yoga classes and wellness meals.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1400&auto=format&fit=crop'
  },
  {
    title: 'Cycling Adventure Deal',
    price: 'From USD 279',
    detail: '2 nights plus guided cycling route, hydration, and recovery meal.',
    image: 'https://images.unsplash.com/photo-1493589976221-c2357c31ad77?q=80&w=1400&auto=format&fit=crop'
  },
  {
    title: 'Family Villa Offer',
    price: 'From USD 459',
    detail: 'Spacious family suite, activity credits, and complimentary kids meal plan.',
    image: 'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=1400&auto=format&fit=crop'
  },
  {
    title: 'Honeymoon Retreat',
    price: 'From USD 499',
    detail: 'Private dinner, sunset transfer, and room decor package included.',
    image: 'https://images.unsplash.com/photo-1517586979036-b7d1e86b3345?q=80&w=1400&auto=format&fit=crop'
  },
  {
    title: 'Long Stay 7+ Nights',
    price: 'Save 20%',
    detail: 'Extended stay discount with weekly laundry and airport transfer support.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop'
  }
]

export default function OffersPage() {
  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Offers</title>
        <meta
          name="description"
          content="Explore all current Villa Hillcrest offers including surf, yoga, cycling, family, and long-stay packages."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/offers" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Villa Hillcrest | Offers" />
        <meta property="og:description" content="Explore all current Villa Hillcrest offers including surf, yoga, cycling, family, and long-stay packages." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villahillcrest.com/offers" />
        <meta property="og:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Hillcrest | Offers" />
        <meta name="twitter:description" content="Explore all current Villa Hillcrest offers including surf, yoga, cycling, family, and long-stay packages." />
        <meta name="twitter:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'OfferCatalog',
              name: 'Offers at Villa Hillcrest',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://villahillcrest.com/offers'
              },
              url: 'https://villahillcrest.com/offers'
            })
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Montserrat:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="offers-page">
        <section className="offers-hero" aria-label="Offers hero" />

        <section className="intro offers-intro" aria-labelledby="offers-heading">
          <div className="container offers-intro-container">
            <h2 id="offers-heading">Exclusive offers at Villa Hillcrest</h2>
            <p>
              Discover our latest seasonal deals and curated stay packages designed to match every type
              of guest, from surfers and wellness travelers to families and long-stay visitors.
            </p>
            <p>
              Each offer combines accommodation with meaningful experiences and value-added benefits,
              giving you more ways to enjoy Weligama while staying within budget.
            </p>
          </div>
        </section>

        <section className="offers-menu" aria-label="All available offers">
          <div className="container">
            <div className="offers-grid">
              {offerItems.map(offer => (
                <article className="offers-card" key={offer.title}>
                  <img src={offer.image} alt={offer.title} loading="lazy" />
                  <div className="offers-card-copy">
                    <h3>{offer.title}</h3>
                    <p className="offers-price">{offer.price}</p>
                    <p>{offer.detail}</p>
                    <a href="/bookings" className="offers-card-btn" aria-label={`Book ${offer.title}`}>
                      Book this offer
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="offers-banner" aria-label="Limited time offers">
          <div className="offers-banner-overlay">
            <h3>Limited-time offers updated weekly</h3>
            <a href="/contact-us" className="offers-banner-btn">Talk to our team</a>
          </div>
        </section>
      </main>
    </Layout>
  )
}
