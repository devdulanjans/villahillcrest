import { useEffect, useState } from 'react'

const fallbackRooms = [
  {
    title: 'Garden Studio',
    price: 'USD 120 / night',
    image:
      'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1000&auto=format&fit=crop',
    beRoomType: ''
  },
  {
    title: 'Pool View Suite',
    price: 'USD 150 / night',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop',
    beRoomType: ''
  },
  {
    title: 'Palm Loft',
    price: 'USD 170 / night',
    image:
      'https://images.unsplash.com/photo-1616594039964-3f1cb33f5fd6?q=80&w=1000&auto=format&fit=crop',
    beRoomType: ''
  },
  {
    title: 'Ocean Terrace',
    price: 'USD 190 / night',
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1000&auto=format&fit=crop',
    beRoomType: ''
  },
  {
    title: 'Family Garden Room',
    price: 'USD 210 / night',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop',
    beRoomType: ''
  },
  {
    title: 'Hillcrest Signature',
    price: 'USD 240 / night',
    image:
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1000&auto=format&fit=crop',
    beRoomType: ''
  },
  {
    title: 'Bamboo Hideaway',
    price: 'USD 130 / night',
    image:
      'https://images.unsplash.com/photo-1615529162924-f86053884642?q=80&w=1000&auto=format&fit=crop',
    beRoomType: ''
  },
  {
    title: 'Sunset Balcony Room',
    price: 'USD 165 / night',
    image:
      'https://images.unsplash.com/photo-1631049552240-59c37f38802b?q=80&w=1000&auto=format&fit=crop',
    beRoomType: ''
  }
]

function formatPrice(room) {
  if (room?.priceUsd) {
    return `USD ${Number(room.priceUsd).toLocaleString()} / night`
  }

  if (room?.priceLkr) {
    return `LKR ${Number(room.priceLkr).toLocaleString()} / night`
  }

  return 'Contact us for rate'
}

export default function RoomsWidget() {
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
        // Keep fallback cards when API fails.
      }
    }

    loadRooms()

    return () => {
      active = false
    }
  }, [])

  const displayRooms = rooms.length > 0
    ? rooms.map((room) => ({
      title: room.name,
      price: formatPrice(room),
      image: Array.isArray(room.images) && room.images.length > 0 ? room.images[0] : '',
      key: room.id,
      meta: `${room.maxGuests || 0} guests • ${room.bedSize || 'Standard bed'}`,
    }))
    : fallbackRooms.map((room) => ({
      ...room,
      key: room.title,
      meta: '',
    }))

  return (
    <section className="hc-rooms hc-reveal" aria-labelledby="rooms-heading">
      <div className="container">
        <div className="hc-section-head">
          <h2 id="rooms-heading">Book your room</h2>
          <a href="/availability">See all availability</a>
        </div>
        <div className="hc-card-grid hc-four">
          {displayRooms.map(room => (
            <article className="hc-room-card" key={room.key}>
              <img src={room.image} alt={`${room.title} at Villa Hillcrest`} />
              <div className="hc-room-content">
                <h3>{room.title}</h3>
                <p>{room.price}</p>
                <a href={`/booking?room-type=${room.beRoomType}`}>Book now</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
