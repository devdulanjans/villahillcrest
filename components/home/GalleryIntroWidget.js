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
            src="https://villahillcrest.com/wp-content/uploads/2024/08/Airbnb_OphelieJammaers-14-scaled.jpg"
            alt="Open tropical walkway with palms"
          />
          <img
            src="https://villahillcrest.com/wp-content/uploads/2024/08/Airbnb_OphelieJammaers-17-scaled.jpg"
            alt="Natural wood and linen bedroom interior"
          />
          <img
            src="https://villahillcrest.com/wp-content/uploads/2024/08/Airbnb_OphelieJammaers-20-scaled.jpg"
            alt="Classic tuk tuk by the road"
          />
        </div>
      </div>
    </section>
  )
}
