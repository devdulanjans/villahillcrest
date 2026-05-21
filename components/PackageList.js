export default function PackageList() {
  const packages = [
    {
      title: 'Sunset Retreat',
      price: 'USD 399',
      description: '3 nights in a luxury villa with private dinner and beach transfer.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      features: [
        'Private beach access',
        'Gourmet dinner included',
        'Sunset views from terrace'
      ]
    },
    {
      title: 'Wellness Escape',
      price: 'USD 549',
      description: '4 days of yoga, spa treatments, and wellness-focused dining.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
      features: [
        'Daily yoga sessions',
        'Full spa access',
        'Healthy meal plans'
      ]
    },
    {
      title: 'Adventure Package',
      price: 'USD 299',
      description: '2 nights with guided hikes, snorkeling, and local exploration.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      features: [
        'Guided hiking tours',
        'Snorkeling equipment',
        'Local experience guide'
      ]
    },
    {
      title: 'Adventure Package',
      price: 'USD 299',
      description: '2 nights with guided hikes, snorkeling, and local exploration.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      features: [
        'Guided hiking tours',
        'Snorkeling equipment',
        'Local experience guide'
      ]
    },
    {
      title: 'Adventure Package',
      price: 'USD 299',
      description: '2 nights with guided hikes, snorkeling, and local exploration.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      features: [
        'Guided hiking tours',
        'Snorkeling equipment',
        'Local experience guide'
      ]
    }
  ]

  return (
    <section className="package-list-section fade-in" aria-labelledby="package-list-heading">
      <div className="container">
        <h2 id="package-list-heading">Our Packages</h2>
        <div className="package-cards">
          {packages.map(pkg => (
            <article key={pkg.title} className="package-card">
              <img src={pkg.image} alt={`${pkg.title} package`} className="package-card-image" />
              <h3 className="package-title">{pkg.title}</h3>
              <p className="package-price">From {pkg.price} p.p/n</p>
              <ul className="package-features">
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button className="show-details-btn">Show More Details</button>
              <button className="book-now-btn">Book This Package</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
