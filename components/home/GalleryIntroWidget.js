export default function GalleryIntroWidget() {
  return (
    <section className="hc-gallery-intro hc-reveal" aria-labelledby="welcome-heading">
      <div className="container">
        <h2 id="welcome-heading">Experience the Art of Island Living</h2>
        <p style={{ textAlign: 'center' }}>
          Wake to birdsong, spend lazy afternoons beside the infinity pool, and watch the sun disappear into the Indian Ocean. Villa Hillcrest invites you to embrace a slower, more meaningful way of travel.
        </p>
        <div className="hc-strip-grid">
          <img
            src="/images/uploads/villa-hilcrest-beach-view.jpg"
            alt="Open tropical walkway with palms"
          />
          <img
            src="/images/uploads/natural-linen-bedroom.jpg"
            alt="Natural wood and linen bedroom interior"
          />
          <img
            src="/images/uploads/clasic-view.jpg"
            alt="Classic View of the beach with palms and ocean"
          />
        </div>
      </div>
    </section>
  )
}
