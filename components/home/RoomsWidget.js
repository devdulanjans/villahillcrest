const rooms = [
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

export default function RoomsWidget() {
  return (
    <section className="hc-rooms hc-reveal" aria-labelledby="rooms-heading">
      <div className="container">
        <div className="hc-section-head">
          <h2 id="rooms-heading">Book your room</h2>
          <a href="/availability">See all availability</a>
        </div>
        <div className="hc-card-grid hc-four">
          {rooms.map(room => (
            <article className="hc-room-card" key={room.title}>
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
