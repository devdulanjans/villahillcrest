import Link from 'next/link'

export default function Availability() {
  return (
    <section className="availability-section fade-in" id="availability" aria-labelledby="availability-heading">
      <div className="container availability-card">
        <h2 id="availability-heading">Availability for your dates</h2>
        <p>Check current villa availability and reserve your preferred stay with flexible booking options across Sri Lanka’s southern coast.</p>
        <Link href="/booking" className="feature-btn">Book Now</Link>
      </div>
    </section>
  )
}
