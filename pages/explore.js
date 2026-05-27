import Head from 'next/head'
import Layout from '../components/Layout'
import BeSearchForm from '../components/be-forms/BeSearchForm'

const exploreItems = [
  {
    title: 'Surf',
    text: 'Weligama is one of Sri Lanka\'s top destinations for surfers. We offer warm-water sessions for all levels and guided access to nearby reef and beach breaks.',
    cta: 'Learn to surf in Sri Lanka',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    href: '/villa'
  },
  {
    title: 'Yoga',
    text: 'Energize body and mind with daily yoga classes for beginners and intermediate practitioners in a peaceful tropical setting.',
    cta: 'Yoga classes in Weligama',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop',
    href: '/yoga'
  },
  {
    title: 'Beaches',
    text: 'From quiet palm-lined coves to lively sunset spots, the southern coastline offers a beach for every mood and pace.',
    cta: 'Take me to the beaches',
    image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1600&auto=format&fit=crop',
    href: '/contact-us'
  },
  {
    title: 'Batik Workshop',
    text: 'Create your own hand-dyed textile and discover the local craft tradition with artists from nearby villages.',
    cta: 'Book workshop',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop',
    href: '/contact-us'
  },
  {
    title: 'Cooking Class',
    text: 'Learn authentic Sri Lankan recipes, spice balancing, and tropical menu preparation with our kitchen team.',
    cta: 'Sri Lanka cooking class',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1600&auto=format&fit=crop',
    href: '/foods'
  },
  {
    title: 'Tea Estate Day',
    text: 'Visit scenic tea gardens in the highlands and learn how leaf processing shapes the flavor in your final cup.',
    cta: 'Discover hills',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    href: '/contact-us'
  },
  {
    title: 'Temples',
    text: 'Explore cultural landmarks and sacred sites that reflect the deep spiritual heritage of southern Sri Lanka.',
    cta: 'Temples in Weligama',
    image: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=1600&auto=format&fit=crop',
    href: '/contact-us'
  },
  {
    title: 'Safaris',
    text: 'Take day trips to national parks and witness elephants, birds, and rich biodiversity in their natural habitat.',
    cta: 'Discover more',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1600&auto=format&fit=crop',
    href: '/contact-us'
  },
  {
    title: 'Snorkeling & Diving',
    text: 'Discover reef life and clear-water snorkeling points with trusted local guides and easy coastal access.',
    cta: 'Take me diving',
    image: 'https://images.unsplash.com/photo-1682685797226-15b048f16f95?q=80&w=1600&auto=format&fit=crop',
    href: '/contact-us'
  }
]

export default function ExplorePage() {
  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Explore</title>
        <meta
          name="description"
          content="Explore surf, yoga, beaches, culture, wildlife, and local experiences around Villa Hillcrest."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/explore" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph tags */}
        <meta property="og:title" content="Villa Hillcrest | Explore" />
        <meta property="og:description" content="Explore surf, yoga, beaches, culture, wildlife, and local experiences around Villa Hillcrest." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villahillcrest.com/explore" />
        <meta property="og:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Hillcrest | Explore" />
        <meta name="twitter:description" content="Explore surf, yoga, beaches, culture, wildlife, and local experiences around Villa Hillcrest." />
        <meta name="twitter:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Explore - Villa Hillcrest",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://villahillcrest.com/explore"
          },
          "url": "https://villahillcrest.com/explore"
        }) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Montserrat:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="explore-page">
        <section className="explore-hero" aria-label="Explore the south coast">
          <div className="explore-hero-overlay">
            <h1>Explore the south coast</h1>
            <p>
              Discover the perfect blend of ocean, culture, and tropical nature.
              From surf and wellness to temples and wildlife, every day offers a
              different journey around Villa Hillcrest.
            </p>
            <a href="/contact-us" className="explore-hero-btn" aria-label="Read our blog about exploring the south coast">Take me to the blog</a>
          </div>
        </section>

        <BeSearchForm />

        <section className="explore-list" aria-label="Explore activities and places">
          <div className="container">
            {exploreItems.map((item, index) => (
              <article
                className={`explore-row ${index % 2 === 1 ? 'is-reverse' : ''}`}
                key={item.title}
                aria-label={`Explore: ${item.title}`}
              >
                <img src={item.image} alt={item.title + ' - ' + item.text} loading="lazy" />
                <div className="explore-copy">
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                  <a href={item.href} aria-label={item.cta + ' - ' + item.title}>{item.cta}</a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}
                {/* Internal links for SEO and navigation */}
                <nav aria-label="Related links" style={{ margin: '32px 0', textAlign: 'center' }}>
                  <span style={{ fontWeight: 600, marginRight: 8 }}>Explore more:</span>
                  <a href="/villa" aria-label="Villa rooms and amenities" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Villa</a>
                  <a href="/dining" aria-label="Dining experiences" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Dining</a>
                  <a href="/yoga" aria-label="Yoga retreats" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Yoga</a>
                  <a href="/foods" aria-label="Foods and menu" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Foods</a>
                  <a href="/packages" aria-label="Packages" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Packages</a>
                  <a href="/contact-us" aria-label="Contact us" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Contact Us</a>
                </nav>
