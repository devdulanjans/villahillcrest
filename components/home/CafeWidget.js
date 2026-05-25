export default function CafeWidget() {
  return (
    <section className="hc-cafe hc-reveal" aria-labelledby="cafe-heading">
      <img
        src="https://villahillcrest.com/wp-content/uploads/2024/07/3-2.jpg"
        alt="Colorful dishes on a dark table"
      />
      <div className="hc-cafe-content">
        <h2 id="cafe-heading" className="hc-cafe-heading">Cafe & kitchen</h2>
        <p>
          Seasonal menus, tropical produce, and fresh seafood curated with
          local flavors. Enjoy all-day dining from healthy breakfasts to
          sunset sharing plates.
        </p>
        <a href="/foods" className="hc-btn hc-btn-outline">Reserve a table</a>
      </div>
    </section>
  )
}
