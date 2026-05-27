import Link from 'next/link'

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
              "url('https://villahillcrest.com/wp-content/uploads/2024/06/Tangalle-Sri-Lanka-Aerial.webp')"
          }}
        ></div>
        <div className="hc-hero-content">
          <p className="hc-overline">Coastal Boutique Escape</p>
          <h1 id="hero-heading">Villa Hillcrest Sri Lanka</h1>
          <p>
            Crafted for soulful stays with ocean mornings, tropical gardens,
            and serene island living.
          </p>
          <Link href="/booking" className="hc-btn hc-btn-light">Book Your Stay</Link>
        </div>
      </div>
    </section>
  )
}
