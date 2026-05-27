import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-slider">
        <div className="slide active" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop')" }}></div>
        <div className="slide" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1600&auto=format&fit=crop')" }}></div>
        <div className="slide" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop')" }}></div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">Villa Hillcrest</h1>
        <p className="hero-subtitle">Experience luxury, comfort, and breathtaking views at Villa Hillcrest in the heart of Sri Lanka.</p>
        <Link href="/booking" className="hero-btn">Book Your Stay</Link>
      </div>
    </section>
  )
}
