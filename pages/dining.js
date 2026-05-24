import Head from 'next/head'
import Layout from '../components/Layout'

const diningGallery = [
  {
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop',
    alt: 'Fresh tropical drink on a wooden table'
  },
  {
    src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop',
    alt: 'Terrace dining view with coastal scenery'
  },
  {
    src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1200&auto=format&fit=crop',
    alt: 'Coffee cup beside woven decor'
  },
  {
    src: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200&auto=format&fit=crop',
    alt: 'Colorful healthy bowl'
  },
  {
    src: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop',
    alt: 'Crispy bites on a plate under sunlight'
  },
  {
    src: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=1200&auto=format&fit=crop',
    alt: 'Fresh salad bowl served at table'
  },
  {
    src: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1200&auto=format&fit=crop',
    alt: 'Plated toast and garnish'
  },
  {
    src: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?q=80&w=1200&auto=format&fit=crop',
    alt: 'Shared table with cocktails and dishes'
  },
  {
    src: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200&auto=format&fit=crop',
    alt: 'Guests enjoying lunch together'
  },
  {
    src: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?q=80&w=1200&auto=format&fit=crop',
    alt: 'Open sandwich plate'
  },
  {
    src: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
    alt: 'Burger and fries meal'
  },
  {
    src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
    alt: 'Healthy vegetable bowl'
  }
]

export default function DiningPage() {
  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Dining</title>
        <meta
          name="description"
          content="Discover all-day kitchen, coffee, and curated island dining at Villa Hillcrest."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/dining" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph tags */}
        <meta property="og:title" content="Villa Hillcrest | Dining" />
        <meta property="og:description" content="Discover all-day kitchen, coffee, and curated island dining at Villa Hillcrest." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villahillcrest.com/dining" />
        <meta property="og:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Hillcrest | Dining" />
        <meta name="twitter:description" content="Discover all-day kitchen, coffee, and curated island dining at Villa Hillcrest." />
        <meta name="twitter:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "name": "Dining at Villa Hillcrest",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://villahillcrest.com/dining"
          },
          "url": "https://villahillcrest.com/dining"
        }) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Montserrat:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="dining-page">
        <section className="dining-hero" aria-label="Dining hero">
          <div className="dining-hero-overlay">
            <h1>Our Cafe in Weligama</h1>
          </div>
        </section>

        <section className="intro dining-intro" aria-labelledby="dining-heading">
          <div className="container">
            <h2 id="dining-heading">All day kitchen, coffee and cocktails</h2>
            <p>
              Villa Hillcrest dining celebrates fresh local produce, wholesome
              breakfast plates, and coastal-inspired flavors served all day.
              Whether you are after a post-surf coffee or a relaxed sunset meal,
              our kitchen is open to everyone.
            </p>
            <p>
              Our menus are built around Sri Lankan ingredients with modern,
              colorful presentation. Guests can enjoy nourishing bowls, signature
              mains, and handcrafted drinks with warm, attentive service.
            </p>
          </div>
        </section>

        <section className="dining-gallery-wrap" aria-label="Dining gallery">
          <div className="container">
            <div className="dining-gallery">
              {diningGallery.map((item, index) => (
                <figure key={`${item.src}-${index}`} className="dining-tile">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
