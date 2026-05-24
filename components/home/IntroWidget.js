export default function IntroWidget() {
  return (
    <section className="hc-intro hc-reveal" aria-labelledby="intro-heading">
      <div className="container">
        <h2 id="intro-heading">Escape in style</h2>
        <p>
          Villa Hillcrest blends tropical modern design with curated island
          experiences. From private wellness to surf-ready adventures,
          every detail is composed for a slower, richer way of traveling.
        </p>
        <div className="hc-icon-row" role="list" aria-label="Property amenities">
          <span role="listitem">24/7 Host Service</span>
          <span role="listitem">Daily Breakfast</span>
          <span role="listitem">Ocean Transfer</span>
          <span role="listitem">Yoga Sessions</span>
          <span role="listitem">Pool & Gardens</span>
          <span role="listitem">Island Dining</span>
        </div>
      </div>
    </section>
  )
}
