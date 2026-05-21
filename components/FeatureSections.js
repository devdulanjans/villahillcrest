const featureSections = [
  {
    title: 'Sleep',
    text: 'Discover thoughtfully designed tropical rooms inspired by minimalist island architecture and calm natural textures.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
    alt: 'Sleep',
    reverse: false,
    cta: 'Open All'
  },
  {
    title: 'Swim Club',
    text: 'Spend your afternoons around our peaceful tropical pool surrounded by lush greenery and calming architecture.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop',
    alt: 'Swim Club',
    reverse: true,
    cta: 'Find Out More'
  },
  {
    title: 'Surf',
    text: 'Whether you are learning for the first time or refining advanced techniques, our surf experiences are designed for every level.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop',
    alt: 'Surf',
    reverse: false,
    cta: 'Take To Surf Camp'
  },
  {
    title: 'Yoga',
    text: 'Begin your mornings with restorative yoga sessions overlooking the tropical gardens and ocean breeze.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop',
    alt: 'Yoga',
    reverse: true,
    cta: 'View Timetable'
  },
  {
    title: 'Cafe',
    text: 'Enjoy seasonal healthy cuisine, fresh tropical ingredients and slow coffee experiences inspired by island living.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop',
    alt: 'Cafe',
    reverse: false,
    cta: 'Discover More'
  },
  {
    title: 'Explore',
    text: 'Explore hidden beaches, jungle viewpoints, local villages and unforgettable moments around Sri Lanka’s southern coast.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    alt: 'Explore',
    reverse: true,
    cta: 'Explore More'
  }
]

export default function FeatureSections() {
  return (
    <>
      {featureSections.map(section => (
        <section className="feature-section fade-in" key={section.title} style={{ backgroundColor: section.title === 'Sleep' ? '#f5f7f3' : '#ffffff' }}>
          <div className={`container feature-grid${section.reverse ? ' reverse' : ''}`}>
            <div className="feature-image">
              <img src={section.image} alt={section.alt} />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">{section.title}</h3>
              <p className="feature-text">{section.text}</p>
              <a href="#" className="feature-btn">{section.cta}</a>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
