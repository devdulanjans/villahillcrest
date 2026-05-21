export default function ActivitiesWidget() {
  return (
    <section className="hc-activities hc-reveal" aria-labelledby="activities-heading">
      <div className="container">
        <h2 id="activities-heading">Activities in the south</h2>
        <div className="hc-card-grid hc-three">
          <article className="hc-activity-item">
            <img
              src="https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=1000&auto=format&fit=crop"
              alt="Sea and coastline viewpoint"
            />
            <h3>Beach escapes</h3>
            <p>Hidden coves, golden sands, and sunset picnic experiences.</p>
          </article>
          <article className="hc-activity-item">
            <img
              src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1000&auto=format&fit=crop"
              alt="Temple and palms"
            />
            <h3>Culture trails</h3>
            <p>Guided village visits, artisan workshops, and temple routes.</p>
          </article>
          <article className="hc-activity-item">
            <img
              src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1000&auto=format&fit=crop"
              alt="Ocean horizon at dusk"
            />
            <h3>Water adventures</h3>
            <p>Snorkeling, paddle sessions, and whale watching by season.</p>
          </article>
        </div>
      </div>
    </section>
  )
}
