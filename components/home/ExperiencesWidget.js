export default function ExperiencesWidget() {
  return (
    <section className="hc-experiences hc-reveal" aria-labelledby="experiences-heading">
      <div className="container">
        <h2 id="experiences-heading">Experience Villa Hillcrest</h2>
        <div className="hc-card-grid hc-three">
          <article className="hc-exp-card">
            <img
              src="https://images.unsplash.com/photo-1473116763249-2faaef81ccda?q=80&w=1200&auto=format&fit=crop"
              alt="Tranquil beach morning"
            />
            <h3>Sleep</h3>
            <p>Calm rooms with natural light, linen textures, and handcrafted details.</p>
          </article>
          <article className="hc-exp-card">
            <img
              src="https://images.unsplash.com/photo-1572331165267-854da2b09ccc?q=80&w=1200&auto=format&fit=crop"
              alt="Resort pool in tropical setting"
            />
            <h3>Swim Club</h3>
            <p>Refresh in our poolside lounge framed by gardens and shaded palms.</p>
          </article>
          <article className="hc-exp-card">
            <img
              src="https://images.unsplash.com/photo-1530878902700-5ad4f9e4c318?q=80&w=1200&auto=format&fit=crop"
              alt="Surfer riding a wave"
            />
            <h3>Surf</h3>
            <p>Guided sessions for all levels with access to the best southern breaks.</p>
          </article>
        </div>
      </div>
    </section>
  )
}
