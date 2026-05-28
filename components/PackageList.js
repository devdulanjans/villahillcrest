import { useEffect, useMemo, useState } from 'react'
import Link from "next/link";

const fallbackPackages = [
  {
    title: 'Garden Studio',
    price: '120',
    description: 'Comfortable garden-facing room ideal for couples and solo travelers.',
    image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=800&q=80',
    features: ['2 Guests', 'Queen Bed', '280 sqft'],
  },
  {
    title: 'Pool View Suite',
    price: '150',
    description: 'Spacious suite with a private balcony and tropical pool views.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    features: ['3 Guests', 'King Bed', '360 sqft'],
  },
  {
    title: 'Ocean Terrace',
    price: '190',
    description: 'Premium terrace room designed for sunset views and serene stays.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    features: ['4 Guests', 'King Bed', '420 sqft'],
  },
]

function formatRoomPrice(room) {
  const usd = Number(room?.priceUsd)
  if (Number.isFinite(usd) && usd > 0) {
    return usd.toLocaleString()
  }

  const lkr = Number(room?.priceLkr)
  if (Number.isFinite(lkr) && lkr > 0) {
    return `LKR ${lkr.toLocaleString()}`
  }

  return 'Contact us'
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
        <h2 id="package-list-heading">Our Packages</h2>
        <div className="package-cards">
          {packages.map(pkg => (
            <article key={pkg.title} className="package-card">
              <img src={pkg.image} alt={`${pkg.title} package`} className="package-card-image" />
              <h3 className="package-title">{pkg.title}</h3>
              <p className="package-price">From {pkg.price} p.p/n</p>
              <ul className="package-features">
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button className="show-details-btn">Show More Details</button>
              <Link href="/booking" className="book-now-btn">Book This Package</Link>
              {/*<button className="book-now-btn">Book This Package</button>*/}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
