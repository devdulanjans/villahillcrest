export default function MapWidget() {
  return (
    <section className="hc-map hc-reveal" aria-label="Villa Hillcrest map location">
      <iframe
        title="Villa Hillcrest location"
        src="https://www.google.com/maps?q=Galle%2C%20Sri%20Lanka&z=8&output=embed"
        loading="lazy"
      ></iframe>
    </section>
  )
}
