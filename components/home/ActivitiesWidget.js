export default function ActivitiesWidget() {
  return (
    <section className="hc-activities hc-reveal" aria-labelledby="activities-heading">
      <div className="container">
        <h2 id="activities-heading">Activities in the south</h2>
        <div className="hc-card-grid hc-three">
          <article className="hc-activity-item">
            <img
              src="https://i0.wp.com/waywardwayfarer.com/wp-content/uploads/2024/08/Dikwella-Hiriketiya-sri-lanka-south-coast.jpg?resize=800%2C533&ssl=1"
              alt="Sea and coastline viewpoint"
            />
            <h3>Beach escapes</h3>
            <p>Hidden coves, golden sands, and sunset picnic experiences.</p>
          </article>
          <article className="hc-activity-item">
            <img
              src="https://www.lostearthadventures.co.uk/wp-content/uploads/Adventure-through-Laos-in-South-East-Asia-copy2.jpg"
              alt="Temple and palms"
            />
            <h3>Culture trails</h3>
            <p>Guided village visits, artisan workshops, and temple routes.</p>
          </article>
          <article className="hc-activity-item">
            <img
              src="https://nexttravelsrilanka.com/wp-content/uploads/2021/07/A-foreign-boy-windsurfing-on-the-waves-enjoying-one-of-the-most-exciting-water-sports-in-Sri-Lanka.jpg"
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
