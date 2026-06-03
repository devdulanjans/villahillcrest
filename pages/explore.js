import Head from 'next/head'
import Layout from '../components/Layout'
import BeSearchForm from '../components/be-forms/BeSearchForm'
import ExploreTopicWidget from '../components/explore/ExploreTopicWidget'
import PageHero from '../components/PageHero'

const exploreItems = [
  {
    title: 'Surf Echo',
    text: 'Weligama is one of Sri Lanka\'s top destinations for surfers, with warm-water sessions for beginners and guided access to nearby reef and beach breaks.',
    cta: 'Learn to surf in Sri Lanka',
    image: '/images/uploads/surf-camp-weligama-bay-sri-lanka.png',
    href: '/cycling'
  },
  {
    title: 'Whale Watching',
    text: 'Head to Mirissa for unforgettable whale and dolphin watching tours during the season with experienced local crews.',
    cta: 'Plan a whale watching trip',
    image: '/images/uploads/whale-watching.jpg',
    href: '/contact-us'
  },
  {
    title: 'Beach Hopping',
    text: 'Explore palm-lined beaches along the south coast, from lively surfing bays to quiet sunset coves.',
    cta: 'Take me to the beaches',
    image: '/images/uploads/beach-hopping.jpg',
    href: '/contact-us'
  },
  {
    title: 'Galle Fort Walk',
    text: 'Stroll through UNESCO-listed Galle Fort, discover colonial lanes, boutique stores, and oceanfront ramparts.',
    cta: 'Explore Galle Fort',
    image: '/images/uploads/galle-fort-walk.jpg',
    href: '/contact-us'
  },
  {
    title: 'Cooking Class',
    text: 'Learn authentic Sri Lankan recipes, spice balancing, and tropical menu preparation with local chefs.',
    cta: 'Join a cooking class',
    image: '/images/uploads/cooking-class.jpg',
    href: '/foods'
  },
  {
    title: 'Tea Estate Day',
    text: 'Visit scenic tea gardens in Sri Lanka\'s hill country and learn how each processing step shapes flavor.',
    cta: 'Discover the tea highlands',
    image: '/images/uploads/tea-estate-day.jpg',
    href: '/contact-us'
  },
  {
    title: 'Temple Visits',
    text: 'Explore sacred temples and cultural landmarks that reflect Sri Lanka\'s deep spiritual heritage.',
    cta: 'Visit nearby temples',
    image: '/images/uploads/temple-visits.jpg',
    href: '/contact-us'
  },
  {
    title: 'Yala Safari',
    text: 'Take a day trip to Yala National Park and spot leopards, elephants, birds, and rich biodiversity.',
    cta: 'Book a safari day',
    image: '/images/uploads/yala-safari.jpg',
    href: '/contact-us'
  },
  {
    title: 'Snorkeling & Diving',
    text: 'Discover reef life and clear-water snorkeling points with trusted local guides and easy coastal access.',
    cta: 'Take me diving',
    image: '/images/uploads/snorkeling-diving.jpg',
    href: '/contact-us'
  },
  {
    title: 'Scenic Train Ride',
    text: 'Enjoy one of the world\'s most scenic rail journeys through misty hills, tea plantations, and mountain views.',
    cta: 'Plan a train experience',
    image: '/images/uploads/scenic-train-ride.jpg',
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
        <PageHero title="Explore The South Coast" className="explore-hero" ariaLabel="Explore the south coast" />

        <BeSearchForm />

        <section className="explore-list" aria-label="Explore activities and places">
          <div className="container">
            <ExploreTopicWidget />
            
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
