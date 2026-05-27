import { useEffect, useMemo, useState } from 'react'

const fallbackPackages = [
    {
      title: 'Sunset Retreat',
      price: 'USD 399',
      description: '3 nights in a luxury villa with private dinner and beach transfer.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      features: [
        'Private beach access',
        'Gourmet dinner included',
        'Sunset views from terrace'
      ]
    },
    {
      title: 'Wellness Escape',
      price: 'USD 549',
      description: '4 days of yoga, spa treatments, and wellness-focused dining.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
      features: [
        'Daily yoga sessions',
        'Full spa access',
        'Healthy meal plans'
      ]
    },
    {
      title: 'Adventure Package',
      price: 'USD 299',
      description: '2 nights with guided hikes, snorkeling, and local exploration.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      features: [
        'Guided hiking tours',
        'Snorkeling equipment',
        'Local experience guide'
      ]
    },
    {
      title: 'Adventure Package',
      price: 'USD 299',
      description: '2 nights with guided hikes, snorkeling, and local exploration.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      features: [
        'Guided hiking tours',
        'Snorkeling equipment',
        'Local experience guide'
      ]
    },
    {
      title: 'Adventure Package',
      price: 'USD 299',
      description: '2 nights with guided hikes, snorkeling, and local exploration.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      features: [
        'Guided hiking tours',
        'Snorkeling equipment',
        'Local experience guide'
      ]
    }
  ]

function formatRoomPrice(room) {
  if (room?.priceUsd) {
    return `USD ${Number(room.priceUsd).toLocaleString()}`
  }

  if (room?.priceLkr) {
    return `LKR ${Number(room.priceLkr).toLocaleString()}`
  }

  return 'On Request'
}

export default function PackageList() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    let active = true

    const loadRooms = async () => {
      try {
        const res = await fetch('/api/rooms')
        const data = await res.json()

        if (!active) {
          return
        }

        if (res.ok && Array.isArray(data.items)) {
          setRooms(data.items)
        }
      } catch {
        // Keep fallback cards on fetch failure.
      }
    }

    loadRooms()

    return () => {
      active = false
    }
  }, [])

  const packages = useMemo(() => {
    if (!Array.isArray(rooms) || rooms.length === 0) {
      return fallbackPackages
    }

    return rooms.map((room) => ({
      title: room.name,
      price: formatRoomPrice(room),
      description: room.shortDescription || room.descriptionText || 'Luxury room at Villa Hillcrest.',
      image: Array.isArray(room.images) && room.images.length > 0
        ? room.images[0]
        : 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      features: [
        `${room.maxGuests || 2} Guests`,
        room.bedSize || 'Standard Bed',
        `${room.roomSizeSqft || 0} sqft`,
        ...(Array.isArray(room.amenities) ? room.amenities.slice(0, 2) : []),
      ].filter(Boolean),
      id: room.id,
    }))
  }, [rooms])

  return (
    <section className="package-list-section fade-in" aria-labelledby="package-list-heading">
      <div className="container">
        <h2 id="package-list-heading">Book Your Room</h2>
        <div className="package-cards">
          {packages.map(pkg => (
            <article key={pkg.id || pkg.title} className="package-card">
              <img src={pkg.image} alt={`${pkg.title} package`} className="package-card-image" />
              <h3 className="package-title">{pkg.title}</h3>
              <p className="package-price">From {pkg.price} / night</p>
              <p>{pkg.description}</p>
              <ul className="package-features">
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <a className="show-details-btn" href="/availability">Show Availability</a>
              <a className="book-now-btn" href="/contact-us">Book This Room</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
