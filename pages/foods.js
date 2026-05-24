import Head from 'next/head'
import Layout from '../components/Layout'

const menuSections = [
  {
    title: 'Breakfast',
    items: [
      {
        name: 'Tropical Fruit Bowl',
        desc: 'Seasonal fruits, coconut yogurt, toasted seeds.',
        image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Cinnamon French Toast',
        desc: 'Brioche, palm syrup, banana, roasted cashews.',
        image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Island Omelette',
        desc: 'Local herbs, tomato chutney, toasted sourdough.',
        image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Avocado Sourdough',
        desc: 'Smashed avocado, lime, chili flakes, poached egg.',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Coconut Pancakes',
        desc: 'Fluffy stacks with coconut cream and tropical compote.',
        image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Morning Granola Jar',
        desc: 'House granola, yogurt, honey, mango and passionfruit.',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    title: 'Lunch & Dinner',
    items: [
      {
        name: 'Weligama Prawn Curry',
        desc: 'Tiger prawns, coconut gravy, steamed rice.',
        image: 'https://images.unsplash.com/photo-1604908176997-431221a4f0b0?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Grilled Reef Fish',
        desc: 'Charred vegetables, citrus butter, herb salad.',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Jackfruit Rice Bowl',
        desc: 'Spiced jackfruit, greens, pickled onion, sambol.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Lemongrass Chicken',
        desc: 'Chargrilled chicken, herb rice, sambal aioli.',
        image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Tuna Poke Plate',
        desc: 'Seared tuna, pickled vegetables, sesame soy glaze.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Garden Pasta',
        desc: 'Roasted tomato, basil, garlic oil, parmesan.',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  },
  {
    title: 'Drinks',
    items: [
      {
        name: 'Slow Brew Coffee',
        desc: 'Single-origin Sri Lankan roast, pour-over style.',
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Coconut Cooler',
        desc: 'Fresh king coconut, lime, mint, sea salt.',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Sunset Ginger Fizz',
        desc: 'Ginger syrup, citrus, sparkling tonic.',
        image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Iced Coconut Latte',
        desc: 'Cold brew espresso, coconut milk, palm sugar.',
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Tropical Smoothie',
        desc: 'Mango, pineapple, yogurt, chia and lime zest.',
        image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=1200&auto=format&fit=crop'
      },
      {
        name: 'Herbal Sunset Tea',
        desc: 'Lemongrass, ginger, cinnamon, wild honey.',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  }
]

export default function FoodsPage() {
  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Foods</title>
        <meta
          name="description"
          content="Browse Villa Hillcrest food menu items including breakfast, mains, and drinks."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/foods" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph tags */}
        <meta property="og:title" content="Villa Hillcrest | Foods" />
        <meta property="og:description" content="Browse Villa Hillcrest food menu items including breakfast, mains, and drinks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villahillcrest.com/foods" />
        <meta property="og:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Hillcrest | Foods" />
        <meta name="twitter:description" content="Browse Villa Hillcrest food menu items including breakfast, mains, and drinks." />
        <meta name="twitter:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Menu",
          "name": "Foods at Villa Hillcrest",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://villahillcrest.com/foods"
          },
          "url": "https://villahillcrest.com/foods"
        }) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Montserrat:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="foods-page">
        <section className="foods-hero" aria-label="Foods hero">
          <div className="foods-hero-overlay">
            <h1>Our food menu</h1>
          </div>
        </section>

        <section className="intro foods-intro" aria-labelledby="foods-heading">
          <div className="container">
            <h2 id="foods-heading">Fresh island flavors, all day</h2>
            <p>
              Our kitchen menu is built around locally sourced ingredients,
              balanced nutrition, and vibrant tropical taste. From nourishing
              breakfasts to relaxed evening plates, each dish is crafted to pair
              naturally with your villa experience.
            </p>
            <p>
              Browse signature favorites, daily specials, and handcrafted drinks
              created with Sri Lankan produce and global inspiration.
            </p>
          </div>
        </section>

        <section className="foods-menu-wrap" aria-label="Food menu items">
          <div className="container">
            <div className="foods-menu-grid">
              {menuSections.map(section => (
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
      </main>
    </Layout>
  )
}
