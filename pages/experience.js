import Head from 'next/head'
import Layout from '../components/Layout'
import BeSearchForm from '../components/be-forms/BeSearchForm'
import ExploreTopicWidget from '../components/explore/ExploreTopicWidget'
import PageHero from '../components/PageHero'

const experienceItems = [
  {
    title: 'Snorkeling Adventures',
    text: 'Crystal-clear waters along Sri Lanka\'s south coast reveal vibrant coral gardens, tropical fish, and peaceful marine life just below the surface. Perfect for all ages and experience levels, with guided sessions departing from Weligama Bay.',
    cta: 'Book a snorkeling trip',
    image: 'https://cdn.getyourguide.com/img/tour/2934f148d58a4e0f70cedfe1ff6a286c91030dfa6663e13578e19f96fbeeba5a.jpeg/68.jpg',
    href: '/contact-us',
  },
  {
    title: 'Scuba Diving',
    text: 'Explore the underwater world with certified local dive masters. From colourful reef dives teeming with marine life to historic shipwrecks scattered along the south coast, every dive reveals a new side of Sri Lanka\'s ocean.',
    cta: 'Explore the depths',
    image: 'https://img.getmyboat.com/images/645dc86e8209f/-processed.jpg',
    href: '/contact-us',
  },
  {
    title: 'Whale Watching',
    text: 'Head out from Mirissa during peak season to witness blue whales, sperm whales, and playful spinner dolphins in the open Indian Ocean. One of the world\'s best whale watching destinations is just a short drive from Villa Hillcrest.',
    cta: 'Plan a whale watching day',
    image: '/images/uploads/whale-watching.jpg',
    href: '/contact-us',
  },
  {
    title: 'Sea Turtle Encounters',
    text: 'Meet nesting and swimming sea turtles along the south coast. Guided ethical encounters let you observe these incredible ancient creatures in their natural habitat — a truly unforgettable experience for families and nature lovers.',
    cta: 'Meet the sea turtles',
    image: 'https://bostontribetravels.com/wp-content/uploads/2024/11/sea-turtle-and-fish-in-sea-26570913-scaled.jpg',
    href: '/contact-us',
  },
  {
    title: 'Sri Lankan Cooking Experience',
    text: 'Learn to cook authentic Sri Lankan dishes with fresh local ingredients and aromatic spices. Hands-on sessions with experienced local chefs teach you the techniques and traditions behind curries, sambols, and tropical desserts.',
    cta: 'Join a cooking class',
    image: '/images/uploads/cooking-class.jpg',
    href: '/contact-us',
  },
  {
    title: 'Tea Tasting Experience',
    text: 'Sri Lanka produces some of the world\'s finest teas. Journey into lush highland estates to walk through rows of tea bushes, learn the full production process, and savour the distinct flavours of fresh-picked Ceylon tea with expert guidance.',
    cta: 'Discover Sri Lankan tea',
    image: '/images/uploads/tea-estate-day.jpg',
    href: '/contact-us',
  },
  {
    title: 'Village Discovery Tour',
    text: 'Step into the authentic rhythm of daily Sri Lankan life. Visit local villages, meet warm communities, explore traditional markets, and see how everyday life unfolds in the rural south — a genuine off-the-beaten-path experience.',
    cta: 'Explore village life',
    image: 'https://cdn.lakpura.com/images/LK94009475-01-E.JPG',
    href: '/contact-us',
  },
  {
    title: 'Cinnamon Experience',
    text: 'Sri Lanka is the birthplace of true cinnamon. Visit a working cinnamon estate to see how the bark is hand-harvested and rolled into quills, taste the difference between real Ceylon cinnamon and imitations, and take some home with you.',
    cta: 'Visit a cinnamon estate',
    image: 'https://edwardscollection.com/media/pages/cinnamon-experience/cinnmon-tapping.jpg?width=1350&height=450&rmode=crop&format=webp&token=2cVVh7Xzuor4NzzBjcf2gWtBXQ5ap71fZFxxMyt66k0%3D',
    href: '/contact-us',
  },
]

export default function ExperiencePage() {
  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Experiences</title>
        <meta
          name="description"
          content="Discover unforgettable experiences around Villa Hillcrest — snorkeling, scuba diving, whale watching, sea turtles, cooking classes, tea tasting, village tours and more."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/experience" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Villa Hillcrest | Experiences" />
        <meta property="og:description" content="Discover unforgettable experiences around Villa Hillcrest — snorkeling, scuba diving, whale watching, sea turtles, cooking classes, tea tasting and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villahillcrest.com/experience" />
        <meta property="og:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Hillcrest | Experiences" />
        <meta name="twitter:description" content="Discover unforgettable experiences around Villa Hillcrest — snorkeling, diving, whale watching and more." />
        <meta name="twitter:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': 'Experiences - Villa Hillcrest',
          'mainEntityOfPage': { '@type': 'WebPage', '@id': 'https://villahillcrest.com/experience' },
          'url': 'https://villahillcrest.com/experience',
        }) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Montserrat:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="explore-page">
        <PageHero
          title="Unforgettable Experiences"
          className="experience-hero"
          ariaLabel="Experiences hero"
        />

        <BeSearchForm />

        <section className="explore-list" aria-label="Experiences and activities">
          <div className="container">
            <ExploreTopicWidget
              title="Experiences Around Villa Hillcrest"
              description="From ocean adventures to cultural encounters, discover a curated collection of unforgettable experiences on Sri Lanka's beautiful south coast."
            />

            {experienceItems.map((item, index) => (
              <article
                className={`explore-row ${index % 2 === 1 ? 'is-reverse' : ''}`}
                key={item.title}
                aria-label={`Experience: ${item.title}`}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="explore-copy">
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                  <a href={item.href} aria-label={item.cta}>{item.cta}</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <nav aria-label="Related links" className="villa-related-nav">
          <span>Explore more:</span>
          <a href="/explore" aria-label="Explore the south coast">Explore</a>
          <a href="/surf-retreat" aria-label="Surf retreat">Surf Retreat</a>
          <a href="/yoga" aria-label="Yoga retreats">Yoga</a>
          <a href="/dining" aria-label="Dining experiences">Dining</a>
          <a href="/packages" aria-label="Packages">Packages</a>
          <a href="/contact-us" aria-label="Contact us">Contact Us</a>
        </nav>
      </main>
    </Layout>
  )
}
