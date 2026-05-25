import { useState } from 'react'
import {
  FiTruck,
  FiMapPin,
  FiNavigation,
  FiMap,
  FiCalendar,
  FiGift
} from 'react-icons/fi'

const services = [
  {
      Icon: FiTruck,
    title: 'Airport Shuttle Service',
    description: "We provide easy airport transfers to and from Villa Hillcrest. Share your arrival time, flight number, guest count (including children), and any surfboards, and we will arrange the right vehicle, including vans or shuttle buses for larger groups."
  },
  {
      Icon: FiMapPin,
    title: 'Local Transportation Service',
    description: 'We provide transport within Weligama and beyond, including tuk-tuks to beaches, supermarkets, and restaurants, plus rides to destinations like Mirissa, Ella, Kandy, and Sigiriya.'
  },
  {
      Icon: FiNavigation,
    title: 'Bike Rentals',
    description: 'Explore Weligama at your own pace by renting a bike from Villa Hillcrest. This convenient service allows you to visit different beaches and local attractions easily.'
  },
  {
      Icon: FiMap,
    title: 'Surf & Adventure',
    description: 'Guided surf lessons, beach excursions, and coastal adventures for every skill level.'
  },
  {
      Icon: FiCalendar,
    title: 'Farm-to-Table Dining',
    description: 'Fresh island produce and chef-led menus that celebrate authentic Sri Lankan flavours.'
  },
  {
      Icon: FiGift,
    title: 'Cycling & Exploration',
    description: 'Scenic cycling routes, cultural village tours, and personalized exploration experiences.'
  }
]

export default function Services() {
  const [activeService, setActiveService] = useState(services[0].title)

  return (
    <section className="services-section hc-reveal" id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="services-header">
          <p className="section-label">Our Services</p>
          <h2 id="services-heading">Designed for unforgettable stays</h2>
          <p className="section-copy">From private villas and wellness programs to curated dining and thrilling adventures, our services are crafted to make every moment exceptional.</p>
        </div>

        <div className="services-grid">
          {services.map(({ Icon, title, description }) => (
            <button
              type="button"
              className={`service-card${activeService === title ? ' is-active' : ''}`}
              key={title}
              onClick={() => setActiveService(title)}
              aria-pressed={activeService === title}
            >
              <div className="service-card-icon">
                <Icon aria-hidden="true" focusable="false" />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
