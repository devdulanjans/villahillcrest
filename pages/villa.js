import Head from 'next/head'
import Layout from '../components/Layout'

const villaRooms = [
  {
    title: 'Ocean View Suite',
    price: 'From $295 per night',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop',
    features: ['King-size bed', 'Private balcony', 'Rain shower bathroom']
  },
  {
    title: 'Garden Studio',
    price: 'From $210 per night',
    image: 'https://images.unsplash.com/photo-1616594039964-3f6cb60a9f7d?q=80&w=1200&auto=format&fit=crop',
    features: ['Queen-size bed', 'Garden-facing terrace', 'Work & lounge corner']
  },
  {
    title: 'Family Loft',
    price: 'From $340 per night',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200&auto=format&fit=crop',
    features: ['Two bedrooms', 'Shared lounge area', 'Ideal for 4 guests']
  },
  {
    title: 'Poolside Villa Room',
    price: 'From $260 per night',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop',
    features: ['Direct pool access', 'Indoor-outdoor shower', 'Private sit-out']
  },
  {
    title: 'Hillside Retreat',
    price: 'From $280 per night',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop',
    features: ['Panoramic valley views', 'Sunrise deck', 'Quiet corner location']
  },
  {
    title: 'Signature Pavilion',
    price: 'From $390 per night',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    features: ['Premium king room', 'Outdoor lounge', 'Curated welcome set']
  }
]

export default function VillaPage() {
  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Villa</title>
        <meta
          name="description"
          content="Browse Villa Hillcrest room categories, amenities, and rates to plan your stay."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/villa" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph tags */}
        <meta property="og:title" content="Villa Hillcrest | Villa" />
        <meta property="og:description" content="Browse Villa Hillcrest room categories, amenities, and rates to plan your stay." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villahillcrest.com/villa" />
        <meta property="og:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Hillcrest | Villa" />
        <meta name="twitter:description" content="Browse Villa Hillcrest room categories, amenities, and rates to plan your stay." />
        <meta name="twitter:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Accommodation",
          "name": "Villa Hillcrest Rooms",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://villahillcrest.com/villa"
          },
          "url": "https://villahillcrest.com/villa"
        }) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Montserrat:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="villa-page">
        <section className="villa-hero" aria-label="Villa collection hero">
          {/* Internal links for SEO and navigation */}
          <nav aria-label="Related links" style={{ margin: '32px 0', textAlign: 'center' }}>
            <span style={{ fontWeight: 600, marginRight: 8 }}>Explore more:</span>
            <a href="/dining" aria-label="Dining experiences" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Dining</a>
            <a href="/yoga" aria-label="Yoga retreats" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Yoga</a>
            <a href="/foods" aria-label="Foods and menu" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Foods</a>
            <a href="/explore" aria-label="Explore local experiences" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Explore</a>
            <a href="/bookings" aria-label="Book your stay" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Bookings</a>
            <a href="/contact-us" aria-label="Contact us" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Contact Us</a>
          </nav>
          <div className="villa-hero-overlay">
            <p>Rooms at Villa Hillcrest</p>
          </div>
        </section>

        <section className="intro" aria-labelledby="villa-intro-heading">
          <div className="container">
            <h2 id="villa-intro-heading">All rooms at a glance</h2>
            <p>
              Discover room categories inspired by island living. Each stay blends
              thoughtful comfort, natural textures, and modern essentials for a
              peaceful tropical escape.
            </p>
          </div>
        </section>

        <section className="villa-rooms" aria-labelledby="villa-rooms-heading">
          <div className="container">
            <h2 id="villa-rooms-heading" className="villa-heading">Villa room collection</h2>
            <p className="villa-copy">
              Choose the space that fits your journey, from intimate suites to
              family-friendly layouts. Every room includes curated amenities and
              daily host support.
            </p>

            <div className="villa-room-grid">
              {villaRooms.map(room => (
                <article key={room.title} className="villa-room-card">
                  <img src={room.image} alt={room.title} loading="lazy" />
                  <div className="villa-room-body">
                    <h3>{room.title}</h3>
                    <p className="villa-price">{room.price}</p>
                    <ul>
                      {room.features.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <a href="/contact-us" className="villa-book-btn">Book this room</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
