export default function CafeWidget() {
  return (
    <section className="hc-cafe hc-reveal" aria-labelledby="cafe-heading">
      <img
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1800&auto=format&fit=crop"
        alt="Colorful dishes on a dark table"
      />
      <div className="hc-cafe-content">
        <h2 id="cafe-heading">Cafe & kitchen</h2>
        <p>
          Seasonal menus, tropical produce, and fresh seafood curated with
          local flavors. Enjoy all-day dining from healthy breakfasts to
          sunset sharing plates.
        </p>
        <a href="/contact-us" className="hc-btn hc-btn-outline">Reserve a table</a>
      </div>
    </section>
  )
}
