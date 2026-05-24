import Head from 'next/head'
import Layout from '../components/Layout'

const cyclingFuelSections = [
  {
    title: 'Pre-Ride Breakfast',
    items: [
      {
        name: 'Banana Oat Power Bowl',
        desc: 'Rolled oats, coconut milk, banana, chia, and toasted nuts for steady energy.',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Egg & Avocado Toast',
        desc: 'Sourdough, smashed avocado, poached eggs, chili flakes, and lime.',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Tropical Smoothie Jar',
        desc: 'Mango, pineapple, yogurt, and local honey blended for quick fuel.',
        image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    title: 'Mid-Ride Snacks',
    items: [
      {
        name: 'Date & Cashew Energy Bites',
        desc: 'House-made bites packed with natural sugars and healthy fats.',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Salted Coconut Water',
        desc: 'Fresh king coconut with a sea-salt pinch for hydration and electrolytes.',
        image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Peanut Butter Wrap',
        desc: 'Wholegrain wrap with peanut butter, banana, and cinnamon.',
        image: 'https://images.unsplash.com/photo-1517654443271-10d4f2f6f6f0?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    title: 'Post-Ride Recovery',
    items: [
      {
        name: 'Grilled Chicken Rice Bowl',
        desc: 'Lean protein, herbed rice, roasted vegetables, and yogurt dressing.',
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Tuna Poke Recovery Plate',
        desc: 'Seared tuna, greens, sesame rice, and citrus soy glaze.',
        image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Hydration Fruit Platter',
        desc: 'Watermelon, pineapple, papaya, and mint to cool down after rides.',
        image: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  }
]

const cyclingPackages = [
  {
    title: 'Sunrise Coastal Ride',
    price: 'USD 95',
    duration: 'Half day',
    distance: '25-35 km',
    image: 'https://images.unsplash.com/photo-1493589976221-c2357c31ad77?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Guided sunrise route through palm-lined roads',
      'Bike rental, helmet, and hydration support',
      'Pre-ride breakfast + recovery bowl included'
    ]
  },
  {
    title: 'Village & Tea Trail',
    price: 'USD 145',
    duration: 'Full day',
    distance: '45-60 km',
    image: 'https://images.unsplash.com/photo-1520975922284-9f8829f6f6d4?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Mixed-surface guided route with local guide',
      'Tea estate stop and cultural village break',
      'Snack packs, hydration, and lunch included'
    ]
  },
  {
    title: 'Endurance Weekend Camp',
    price: 'USD 320',
    duration: '2 days',
    distance: '100+ km total',
    image: 'https://images.unsplash.com/photo-1595433562696-a82b0f4764c9?q=80&w=1200&auto=format&fit=crop',
    features: [
      'Back-to-back coached rides with pace groups',
      'Mechanic support, route briefing, and safety car',
      'All cycling meals and recovery sessions included'
    ]
  }
]

export default function CyclingPage() {
  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Cycling</title>
        <meta
          name="description"
          content="Cycling adventures at Villa Hillcrest with guided routes, fuel menu items, and complete ride packages."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/cycling" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Villa Hillcrest | Cycling" />
        <meta property="og:description" content="Cycling adventures at Villa Hillcrest with guided routes, fuel menu items, and complete ride packages." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villahillcrest.com/cycling" />
        <meta property="og:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Hillcrest | Cycling" />
        <meta name="twitter:description" content="Cycling adventures at Villa Hillcrest with guided routes, fuel menu items, and complete ride packages." />
        <meta name="twitter:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SportsActivityLocation',
              name: 'Cycling at Villa Hillcrest',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://villahillcrest.com/cycling'
              },
              url: 'https://villahillcrest.com/cycling'
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

      <main className="cycling-page">
        <section className="cycling-hero" aria-label="Cycling hero">
          <div className="cycling-hero-overlay">
            <h1>Cycling in Weligama</h1>
          </div>
        </section>

        <section className="intro cycling-intro" aria-labelledby="cycling-heading">
          <div className="container">
            <h2 id="cycling-heading">Ride, refuel, and recover with us</h2>
            <p>
              Discover scenic coastal roads, village trails, and tropical climbs with curated cycling
              experiences designed for beginners to advanced riders. Our cycling team supports every
              ride with route planning, safety guidance, and on-road assistance.
            </p>
            <p>
              Each ride is paired with cyclist-focused menu items and recovery meals, so your energy,
              hydration, and performance stay on point from start to finish.
            </p>
          </div>
        </section>

        <section className="cycling-highlights" aria-label="Cycling details">
          <div className="container">
            <div className="cycling-highlights-grid">
              <article className="cycling-highlight-card">
                <h3>Bike Options</h3>
                <p>Road, gravel, and hybrid bike rental options with multiple frame sizes.</p>
              </article>
              <article className="cycling-highlight-card">
                <h3>Support & Safety</h3>
                <p>Helmet, hydration stops, first-aid kit, and local guide support on selected routes.</p>
              </article>
              <article className="cycling-highlight-card">
                <h3>Route Styles</h3>
                <p>Flat coastal spins, rolling countryside loops, and endurance challenge routes.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="foods-menu-wrap" aria-label="Cycling fuel menu items">
          <div className="container">
            <div className="foods-menu-grid">
              {cyclingFuelSections.map(section => (
                <article className="foods-menu-card" key={section.title}>
                  <h3>{section.title}</h3>
                  <div className="foods-items-grid">
                    {section.items.map(item => (
                      <article className="foods-food-card" key={item.name}>
                        <img src={item.image} alt={item.name} loading="lazy" />
                        <div className="foods-food-copy">
                          <strong>{item.name}</strong>
                          <p>{item.desc}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cycling-packages" aria-labelledby="cycling-packages-heading">
          <div className="container">
            <h2 id="cycling-packages-heading">Cycling Packages</h2>
            <div className="cycling-packages-grid">
              {cyclingPackages.map(pkg => (
                <article className="cycling-package-card" key={pkg.title}>
                  <img src={pkg.image} alt={pkg.title} loading="lazy" />
                  <div className="cycling-package-copy">
                    <h3>{pkg.title}</h3>
                    <p className="cycling-package-meta">{pkg.duration} | {pkg.distance}</p>
                    <p className="cycling-package-price">From {pkg.price}</p>
                    <ul>
                      {pkg.features.map(feature => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
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
