import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import BeSearchForm from '../components/be-forms/BeSearchForm'

const villaRooms = [
]

function normalizeVillaRoom(room) {
  const firstImage = Array.isArray(room?.images) && room.images.length > 0
    ? room.images.find((item) => String(item || '').trim().length > 0)
    : ''

  const image = firstImage
    ? (/^https?:\/\//i.test(firstImage) || String(firstImage).startsWith('/')
      ? firstImage
      : `/images/rooms/${firstImage}`)
    : 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop'

  let price = 'Contact us for rates'
  if (Number(room?.priceUsd) > 0) {
    price = `From USD ${Number(room.priceUsd).toLocaleString()} per night`
  } else if (Number(room?.priceLkr) > 0) {
    price = `From LKR ${Number(room.priceLkr).toLocaleString()} per night`
  }

  return {
    id: room?.id,
    title: room?.name || 'Villa Room',
    price,
    image,
    features: [
      room?.bedSize || 'Comfort bed',
      `${Number(room?.maxGuests || 2)} guests`,
      Number(room?.roomSizeSqft) > 0 ? `${Number(room.roomSizeSqft)} sqft` : 'Ensuite bathroom',
    ].filter(Boolean),
    beRoomType: room?.beRoomType || room?.name || '',
  }
}

export default function VillaPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/rooms');
        const data = await res.json();
        if (res.ok && Array.isArray(data?.items)) {
          setRooms(data.items.map(normalizeVillaRoom));
        }
      } catch {
        // Fallback list will be used if API is unavailable.
      }
    };
    fetchRooms();
  }, []);

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
            <a href="/packages" aria-label="Packages" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Packages</a>
            <a href="/contact-us" aria-label="Contact us" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Contact Us</a>
          </nav>
          <div className="villa-hero-overlay">
            <p>Rooms at Villa Hillcrest</p>
          </div>
        </section>

        <BeSearchForm />

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
              {(rooms.length > 0 ? rooms : villaRooms).map(room => (
                <article key={room.id || room.title} className="villa-room-card">
                  <img src={room.image} alt={room.title} loading="lazy" />
                  <div className="villa-room-body">
                    <h3>{room.title}</h3>
                    <p className="villa-price">{room.price}</p>
                    <ul>
                      {(Array.isArray(room.features) ? room.features : []).map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <a href={`/booking?room-type=${room.beRoomType}`} className="villa-book-btn">Book this room</a>
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
