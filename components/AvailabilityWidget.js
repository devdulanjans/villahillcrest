export default function AvailabilityWidget() {
  const availability = [
    {
      range: 'May 24 – May 31, 2026',
      details: 'Swim Club/Deluxe private rooms: 3, Private rooms: 2, Female dormitory: 4, Mixed dormitory: 3'
    },
    {
      range: 'August 30 – September 6, 2026',
      details: 'Swim Club/Deluxe private rooms: 2, Private rooms: 3, Female dormitory: 5, Mixed dormitory: 5'
    },
    {
      range: 'September 6 – September 13, 2026',
      details: 'Swim Club/Deluxe private rooms: 3, Private rooms: 2, Female dormitory: 5, Mixed dormitory: 4'
    },
    {
      range: 'September 13 – September 20, 2026',
      details: 'Swim Club/Deluxe private rooms: 2, Private rooms: 3, Female dormitory: 5, Mixed dormitory: 5'
    },
    {
      range: 'September 20 – September 27, 2026',
      details: 'Swim Club/Deluxe private rooms: 3, Private rooms: 2, Female dormitory: 6, Mixed dormitory: 5'
    }
  ]

  return (
    <section className="availability-widget fade-in" aria-labelledby="availability-widget-heading">
      <div className="container availability-widget-card">
        <p className="availability-widget-meta">Last updated: 17 May, 2026</p>
        <h2 id="availability-widget-heading">Availability for 2026</h2>
        <div className="availability-widget-list">
          {availability.map(item => (
            <div key={item.range} className="availability-widget-item">
              <strong>{item.range}</strong>
              <span>{item.details}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
