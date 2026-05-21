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
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop"
            alt="Open tropical walkway with palms"
          />
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
            alt="Natural wood and linen bedroom interior"
          />
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop"
            alt="Classic tuk tuk by the road"
          />
        </div>
      </div>
    </section>
  )
}
