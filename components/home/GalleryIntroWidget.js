export default function GalleryIntroWidget() {
  return (
    <section className="hc-gallery-intro hc-reveal" aria-labelledby="welcome-heading">
      <div className="container">
        <h2 id="welcome-heading">Welcome to <span>paradise</span></h2>
        <p>
          Find quiet corners, warm hospitality, and tropical architecture
          inspired by nature. Villa Hillcrest is designed for travelers who
          want comfort without losing the feeling of discovery.
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
