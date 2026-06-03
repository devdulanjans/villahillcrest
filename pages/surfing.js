import Head from 'next/head'
import Layout from '../components/Layout'
import BeSearchForm from '../components/be-forms/BeSearchForm'
import ImageShowWidget from '../components/ImageShowWidget'
import PageHero from '../components/PageHero'

const surfingGallery = [
  {
    src: '/images/uploads/surf-camp-weligama-bay-sri-lanka.png',
    alt: 'Surf camp session in Weligama Bay, Sri Lanka'
  },
  {
    src: '/images/uploads/beach-hopping.jpg',
    alt: 'South coast beach day near popular Sri Lanka surf breaks'
  },
  {
    src: '/images/uploads/villa-hilcrest-beach-view.jpg',
    alt: 'Beach view close to Weligama surf area in Sri Lanka'
  },
  {
    src: '/images/uploads/snorkeling-diving.jpg',
    alt: 'Indian Ocean water activities on the Sri Lanka south coast'
  },
  {
    src: '/images/uploads/villa-hilcrest-experience-beauty.jpg',
    alt: 'Tropical coastline atmosphere around Sri Lanka surf towns'
  },
  {
    src: '/images/uploads/swiming-club-villa-hilcrest.jpg',
    alt: 'Relaxed post-surf lifestyle at Villa Hillcrest, Sri Lanka'
  }
]

export default function SurfingPage() {
  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Surfing</title>
        <meta
          name="description"
          content="Discover Sri Lanka surfing experiences from Villa Hillcrest, with beginner-friendly breaks, expert coaching, and surf getaway packages."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/surfing" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Villa Hillcrest | Surfing" />
        <meta
          property="og:description"
          content="Discover Sri Lanka surfing experiences from Villa Hillcrest, with beginner-friendly breaks, expert coaching, and surf getaway packages."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villahillcrest.com/surfing" />
        <meta property="og:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Hillcrest | Surfing" />
        <meta
          name="twitter:description"
          content="Discover Sri Lanka surfing experiences from Villa Hillcrest, with beginner-friendly breaks, expert coaching, and surf getaway packages."
        />
        <meta name="twitter:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Surfing in Sri Lanka at Villa Hillcrest',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://villahillcrest.com/surfing'
              },
              url: 'https://villahillcrest.com/surfing'
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

      <main className="surfing-page">
        <PageHero title="Sri Lanka Surfing" className="surfing-hero" ariaLabel="Sri Lanka surfing hero" />

        <BeSearchForm />

        <nav aria-label="Related links" className="villa-related-nav">
          <span>Explore more:</span>
          <a href="/villa" aria-label="Villa rooms and amenities">Villa</a>
          <a href="/dining" aria-label="Dining experiences">Dining</a>
          <a href="/yoga" aria-label="Yoga retreats">Yoga</a>
          <a href="/foods" aria-label="Foods and menu">Foods</a>
          <a href="/explore" aria-label="Explore local experiences">Explore</a>
          <a href="/packages" aria-label="Packages">Packages</a>
          <a href="/contact-us" aria-label="Contact us">Contact Us</a>
        </nav>

        <section className="intro surfing-intro" aria-labelledby="surfing-heading">
          <div className="container surfing-intro-container">
            <h2 id="surfing-heading">Surfing in Sri Lanka</h2>
            <p>
              Sri Lanka is one of the best year-round surf destinations in Asia, with warm tropical water,
              long sandy points, and mellow reef breaks ideal for both first-timers and experienced surfers.
              From Villa Hillcrest, you can easily reach famous south coast surf zones like Weligama,
              Midigama, and Ahangama.
            </p>
            <p>
              Our surf days are built around your level. Beginners can start on soft beach breaks with friendly
              coaching, while intermediate riders can progress on point and reef waves with video feedback and
              focused technique sessions.
            </p>
            <p>
              The south coast season usually runs from November to April, while Sri Lanka's east coast lights up
              from May to September, making it possible to chase clean conditions for most of the year. After each
              session, return to calm hilltop views, nourishing meals, and a recovery-friendly atmosphere.
            </p>
          </div>
        </section>

        <section className="surfing-gallery-wrap" aria-label="Surfing gallery">
          <div className="container">
            <ImageShowWidget images={surfingGallery} />
          </div>
        </section>

        <section className="surfing-package" aria-label="Sri Lanka surfing package">
          <div className="surfing-package-overlay">
            <h3>Sri Lanka surf escapes from €349</h3>
            <a href="/packages" className="surfing-package-btn">Take me to surf camp</a>
          </div>
        </section>
      </main>
    </Layout>
  )
}