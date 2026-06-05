import styles from '../../styles/NewIndex.module.css'

const highlights = [
    {
    title: 'OUR STORY',
    subtitle: "Every great place has a story. Here's ours.",
    text: 'In 2019, a vision to create exceptional guest experiences inspired the journey of Villa Hillcrest. Through years of dedication and genuine hospitality, that vision has become the retreat you see today.',
    image: '/images/gallery/property-view/1779902296271-45522-9.jpg',
      url: '/about-us',
    buttonLabel: 'DISCOVER THE JOURNEY',
    reverse: true
  },
  {
    title: "EXPERIENCE THE ART OF SLOW LIVING",
    subtitle: 'Ocean Views • Tropical Serenity • Timeless Hospitality',
    text: 'Wake to birdsong, spend peaceful days by the pool, and watch the sun set over the horizon. Here, every moment is an invitation to relax and reconnect with nature.',
    image: '/images/uploads/1779995375402-83907.jpg',
      url: '/explore',
    buttonLabel: 'EXPLORE EXPERIENCES',
    reverse: false
  },
  {
    title: 'PINE YARD RESTAURANT',
    subtitle: 'Where Great Food Meets Great Moments',
    text: "Nestled within Villa Hillcrest, Pine Yard Restaurant celebrates the rich flavors of Sri Lanka alongside carefully curated international cuisine. Whether it's a leisurely breakfast, a sunset dinner, or a special occasion, every meal is served with warmth and attention to detail.",
    image: '/images/uploads/villa-hilcrest-dining.jpg',
      url: '/dining',
    buttonLabel: 'DISCOVER DINING',
    reverse: true
  },
  {
    title: 'TOAST TO UNFORGETTABLE MOMENTS',
    subtitle: 'Craft Cocktails & Forest Views',
    text: "Life's best memories are made together. Enjoy a refreshing drink by the pool, a romantic evening beneath the stars, or laughter-filled conversations with family and friends in the comfort of your private retreat. At Villa Hillcrest, every moment is an invitation to slow down, connect, and create memories that will stay with you forever.",
    image: '/images/uploads/ember-bar.avif',
      url: '/foods',
    buttonLabel: 'EXPERIENCE PINE YARD',
    reverse: false
  },
  {
    title: 'SERENE SPA',
    subtitle: 'Relax Together, Remember Forever',
    text: 'A peaceful treatment, a calm mind, and quality time with someone special. At Serene Spa, every moment is designed to help you reconnect and embrace the Villa Hillcrest experience.',
    image: '/images/uploads/botanical-spa.jpg',
      url: '/yoga',
    buttonLabel: 'EXPLORE WELLNESS',
    reverse: true
  },
  {
    title: "CELEBRATE LIFE'S MILESTONES",
    subtitle: 'Some moments deserve more than a venue.',
    text: 'A birthday with loved ones. An anniversary under the stars. A dream wedding. A family reunion. A successful team gathering. At Villa Hillcrest, every celebration becomes a story worth remembering.',
    image: '/images/uploads/celibration-and-gathering.jpg',
      url: '/offers',
    buttonLabel: 'START PLANNING',
    reverse: false
  }
]

export default function HighlightsWidget() {
  return (
    <section className={styles.highlightsSection}>
      <div className={styles.highlightsHeading}>
        <small>Villa HillCrest Sri Lanka</small>
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
              {item.subtitle && <small className={styles.cardSubtitle}>{item.subtitle}</small>}
              <p>{item.text}</p>
              <a href={item.url || '/explore'}>{item.buttonLabel || 'More Details'}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}