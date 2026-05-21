export default function StoryWidget() {
  return (
    <section className="hc-story hc-reveal" aria-labelledby="story-heading">
      <div className="container hc-story-grid">
        <div>
          <h2 id="story-heading">Our story</h2>
          <p>
            Built with local craft and natural textures, Villa Hillcrest
            celebrates coastal Sri Lanka through architecture, hospitality,
            and mindful travel. We partner with local producers, surf guides,
            and artisans to keep each stay personal and grounded.
          </p>
        </div>
        <aside className="hc-story-note">
          <h3>Why guests return</h3>
          <ul>
            <li>Flexible booking with direct host support</li>
            <li>Spaces designed for both families and couples</li>
            <li>Personalized activity planning from arrival to departure</li>
          </ul>
        </aside>
      </div>
    </section>
  )
}
