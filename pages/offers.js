import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'

export default function OffersPage() {
  const [offers, setOffers] = useState([])
  const [offersLoading, setOffersLoading] = useState(true)
  const [offersError, setOffersError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadOffers = async () => {
      setOffersLoading(true)
      setOffersError('')

      try {
        const res = await fetch('/api/offers')
        const data = await res.json()

        if (!isMounted) return

        if (!res.ok) {
          setOffersError(data.message || 'Failed to load offers')
          setOffers([])
          return
        }

        setOffers(Array.isArray(data.items) ? data.items : [])
      } catch {
        if (!isMounted) return
        setOffersError('Failed to load offers')
        setOffers([])
      } finally {
        if (isMounted) {
          setOffersLoading(false)
        }
      }
    }

    loadOffers()

    return () => {
      isMounted = false
    }
  }, [])

  const offerItems = useMemo(
    () =>
      offers.map(offer => ({
        id: offer.id,
        title: offer.title,
        image: offer.imageUrl,
        detailHtml: offer.descriptionHtml
      })),
    [offers]
  )

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
            {offersLoading && <p>Loading offers...</p>}
            {!offersLoading && offersError && <p>{offersError}</p>}
            {!offersLoading && !offersError && offerItems.length === 0 && <p>No offers available right now.</p>}
            <div className="offers-grid">
              {offerItems.map(offer => (
                <article className="offers-card" key={offer.id || offer.title}>
                  <img src={offer.image} alt={offer.title} loading="lazy" />
                  <div className="offers-card-copy">
                    <h3>{offer.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: offer.detailHtml }} />
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
