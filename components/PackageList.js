import { useEffect, useMemo, useState } from 'react'

const fallbackPackages = []

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
  const [didLoadRooms, setDidLoadRooms] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    let active = true

    const loadRooms = async () => {
      try {
        const res = await fetch('/api/rooms')
        const data = await res.json()

        if (!active) {
          return
        }

        if (res.ok) {
          const items = Array.isArray(data?.items)
            ? data.items
            : Array.isArray(data)
              ? data
              : []

          setRooms(items)
          setLoadFailed(false)
          return
        }

        setLoadFailed(true)
      } catch {
        if (!active) {
          return
        }

        setLoadFailed(true)
      } finally {
        if (active) {
          setDidLoadRooms(true)
        }
      }
    }

    loadRooms()

    return () => {
      active = false
    }
  }, [])

  const packages = useMemo(() => {
    if (Array.isArray(rooms) && rooms.length > 0) {
      return rooms.map((room) => {
        const primaryImage = Array.isArray(room.images)
          ? room.images.find((item) => String(item || '').trim().length > 0)
          : ''

        const image = primaryImage
          ? (/^https?:\/\//i.test(primaryImage) || primaryImage.startsWith('/')
            ? primaryImage
            : `/images/rooms/${primaryImage}`)
          : 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'

        return {
          title: room.name,
          price: formatRoomPrice(room),
          description: room.shortDescription || room.descriptionText || 'Luxury room at Villa Hillcrest.',
          image,
          features: [
            `${room.maxGuests || 2} Guests`,
            room.bedSize || 'Standard Bed',
            `${room.roomSizeSqft || 0} sqft`,
            ...(Array.isArray(room.amenities) ? room.amenities.slice(0, 2) : []),
          ].filter(Boolean),
          id: room.id,
        }
      })
    }

    if (loadFailed || !didLoadRooms) {
      return fallbackPackages
    }

    return []
  }, [didLoadRooms, loadFailed, rooms])

  return (
    <section className="package-list-section fade-in" aria-labelledby="package-list-heading">
      <div className="container">
        <h2 id="package-list-heading">Book Your Room</h2>
        {packages.length === 0 ? (
          <p className="package-empty">No rooms are available right now. Please check again soon.</p>
        ) : (
          <div className="package-cards">
            {packages.map(pkg => (
              <article key={pkg.id || pkg.title} className="package-card">
                <img src={pkg.image} alt={`${pkg.title} package`} className="package-card-image" />
                <div className="package-card-content">
                  <h3 className="package-title">{pkg.title}</h3>
                  <p className="package-price">From {pkg.price} / night</p>
                  <p>{pkg.description}</p>
                  <ul className="package-features">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="package-card-actions">
                  <a className="show-details-btn" href="/availability">Show Availability</a>
                  <a className="book-now-btn" href="/contact-us">Book This Room</a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
