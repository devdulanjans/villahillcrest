import Head from 'next/head'
import HeroFadeSlider from '../components/HeroFadeSlider'
import LandingImageSliderWidget from '../components/new-index/LandingImageSliderWidget'
import IntroSectionWidget from '../components/new-index/IntroSectionWidget'
import HighlightsWidget from '../components/new-index/HighlightsWidget'
import styles from '../styles/NewIndex.module.css'

const highlights = [
  {
    title: 'Reconnect with Nature and Rediscover Yourself',
    text: 'Weligama Bay is a quiet retreat from city life. Framed by lush greenery and warm coastal air, it offers guests a calm place to pause, breathe, and reconnect.',
    image: '/images/gallery/property-view/1779902295926-68064-0.jpg',
    reverse: false
  },
  {
    title: 'The Hill House Dining',
    text: 'Our culinary team celebrates Sri Lankan flavors with seasonal ingredients, signature house recipes, and beautifully plated experiences.',
    image: '/images/uploads/villa-lunch-table.jpeg',
    reverse: true
  },
  {
    title: 'The Bar',
    text: 'From sunset cocktails to late-evening conversations, the bar offers handcrafted drinks and a relaxed atmosphere wrapped in forest views.',
    image: '/images/uploads/1779762694500-19031.jpg',
    reverse: false
  },
  {
    title: 'Wellness and Spa',
    text: 'Treatments are designed to restore balance using gentle therapies, natural oils, and serene spaces that invite deep relaxation.',
    image: '/images/uploads/1779763020763-84697.jpg',
    reverse: true
  },
  {
    title: 'Weddings and Events',
    text: 'Whether intimate or celebratory, every event is curated with thoughtful service, ambient settings, and memorable dining experiences.',
    image: '/images/uploads/1779906858116-73110.jpg',
    reverse: false
  },
  {
    title: 'About Us',
    text: 'Villa HillCrest blends contemporary comfort with nature-inspired living. Every corner is crafted to feel calm, airy, and deeply connected to its landscape.',
    image: '/images/gallery/property-view/1779902296271-45522-9.jpg',
    reverse: true
  }
]

export default function NewIndexPage() {
  return (
    <>
      <Head>
        <title>Villa HillCrest | New Index</title>
        <meta name="description" content="A refined landing page inspired by Malabar Hill style with elegant typography, immersive imagery, and alternating highlight sections." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.newIndexPage}>
        <header className={styles.topHeader}>
          <div className={styles.brand}>VILLA HILLCREST</div>
          <nav className={styles.navLinks}>
            <a href="/about-us">About</a>
            <a href="/villa">Villa</a>
            <a href="/dining">Dining</a>
            <a href="/explore">Experience</a>
            <a href="/offers">Offers</a>
            <a href="/gallery">Gallery</a>
          </nav>
          <a className={styles.contactBtn} href="/contact-us">Contact Us</a>
        </header>

        {/* <section className={styles.bookingBar}>
          <span>Book Online</span>
          <div className={styles.bookingPills}>
            <span>Check in</span>
            <span>29 May 2026</span>
            <span>Check out</span>
            <span>31 May 2026</span>
            <span>I have a promocode</span>
          </div>
          <button type="button">Check Availability</button>
        </section> */}

        <section className={styles.heroSection}>
          <HeroFadeSlider
            autoMs={4500}
            altPrefix="Villa Hillcrest scenic view"
          />
        </section>

        <LandingImageSliderWidget />

        <IntroSectionWidget />

        <section className={styles.quoteStrip}>
          <p>
            Using architectural details from tropical modernism,
            Villa Hillcrest creates an evocative retreat at the forest edge.
          </p>
        </section>

        <HighlightsWidget />
      </main>
    </>
  )
}
