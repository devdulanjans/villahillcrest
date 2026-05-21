export default function HeroWidget() {
  return (
    <section className="hc-hero hc-reveal" id="hero" aria-labelledby="hero-heading">
      <div className="hc-hero-grid">
        <div
          className="hc-hero-image"
          role="img"
          aria-label="Aerial view of the beach and ocean"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop')"
          }}
        ></div>
        <div className="hc-hero-content">
          <p className="hc-overline">Coastal Boutique Escape</p>
          <h1 id="hero-heading">Villa Hillcrest Sri Lanka</h1>
          <p>
            Crafted for soulful stays with ocean mornings, tropical gardens,
            and serene island living.
          </p>
          <a href="/bookings" className="hc-btn hc-btn-light">Book Your Stay</a>
        </div>
      </div>
    </section>
  )
}
