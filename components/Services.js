const services = [
  {
    icon: '🏝️',
    title: 'Private Villa Retreats',
    description: 'Luxurious villa accommodations with panoramic views, private terraces, and bespoke comfort.'
  },
  {
    icon: '☕',
    title: 'Island Dining',
    description: 'Seasonal Sri Lankan cuisine, fresh seafood, and slow coffee served in a tranquil, garden setting.'
  },
  {
    icon: '🧘',
    title: 'Yoga & Wellness',
    description: 'Daily yoga sessions, meditation spaces, and restorative wellness experiences for body and mind.'
  },
  {
    icon: '🌊',
    title: 'Surf & Adventure',
    description: 'Guided surf lessons, beach excursions, and coastal adventures for every skill level.'
  },
  {
    icon: '🍽️',
    title: 'Farm-to-Table Dining',
    description: 'Fresh island produce and chef-led menus that celebrate authentic Sri Lankan flavours.'
  },
  {
    icon: '🚴',
    title: 'Cycling & Exploration',
    description: 'Scenic cycling routes, cultural village tours, and personalized exploration experiences.'
  }
]

export default function Services() {
  return (
    <section className="services-section hc-reveal" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="services-header">
          <p className="section-label">Our Services</p>
          <h2 id="services-heading">Designed for unforgettable stays</h2>
          <p className="section-copy">From private villas and wellness programs to curated dining and thrilling adventures, our services are crafted to make every moment exceptional.</p>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <article className="service-card" key={service.title}>
              <div className="service-card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
