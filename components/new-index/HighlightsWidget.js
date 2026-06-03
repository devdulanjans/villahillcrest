import styles from '../../styles/NewIndex.module.css'

const highlights = [
    {
    title: 'About Us',
    text: 'Villa Hill Crest blends contemporary comfort with nature-inspired living. Every corner is crafted to feel calm, airy, and deeply connected to its landscape.',
    image: '/images/gallery/property-view/1779902296271-45522-9.jpg',
      url: '/about-us',
    reverse: true
  },
  {
    title: "Experience the Beauty of Natural Living",
    text: 'Weligama Bay is a quiet retreat from city life. Framed by lush greenery and warm coastal air, it offers guests a calm place to pause, breathe, and reconnect.',
    image: '/images/uploads/1779995375402-83907.jpg',
      url: '/explore',
    reverse: false
  },
  {
    title: 'Hillcrest Dining Experiences',
    text: 'Our culinary team celebrates Sri Lankan flavors with seasonal ingredients, signature house recipes, and beautifully plated experiences.',
    image: '/images/uploads/villa-hilcrest-dining.jpg',
      url: '/dining',
    reverse: true
  },
  {
    title: 'Ember Bar',
    text: 'From sunset cocktails to late-evening conversations, the bar offers handcrafted drinks and a relaxed atmosphere wrapped in forest views.',
    image: '/images/uploads/ember-bar.avif',
      url: '/foods',
    reverse: false
  },
  {
    title: 'Botanical Spa Experience',
    text: 'Treatments are designed to restore balance using gentle therapies, natural oils, and serene spaces that invite deep relaxation.',
    image: '/images/uploads/botanical-spa.jpg',
      url: '/yoga',
    reverse: true
  },
  {
    title: 'Celebrations & Gatherings',
    text: 'Whether intimate or celebratory, every event is curated with thoughtful service, ambient settings, and memorable dining experiences.',
    image: '/images/uploads/celibration-and-gathering.jpg',
      url: '/offers',
    reverse: false
  }
]

export default function HighlightsWidget() {
  return (
    <section className={styles.highlightsSection}>
      <div className={styles.highlightsHeading}>
        <small>Villa Hill Crest Sri Lanka</small>
        <h2>Scenic Wonders</h2>
      </div>

      <div className={styles.highlightGrid}>
        {highlights.map((item) => (
          <article
            key={item.title}
            className={`${styles.highlightCard} ${item.reverse ? styles.reverse : ''}`.trim()}
          >
            <div className={styles.cardImageWrap}>
              <img src={item.image} alt={item.title} />
            </div>
            <div className={styles.cardBody}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href={item.url || '/explore'}>More Details</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}