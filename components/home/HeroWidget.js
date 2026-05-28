import { useEffect, useState } from 'react';
import Link from 'next/link'

const defaultSlides = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    wording: 'Villa Hillcrest',
  },
];

export default function HeroWidget() {
  const [sliders, setSliders] = useState(defaultSlides);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const response = await fetch('/api/sliders');
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        const incomingSlides = Array.isArray(data?.sliders)
          ? data.sliders
          : Array.isArray(data?.items)
            ? data.items
            : [];

        if (incomingSlides.length > 0) {
          setSliders(incomingSlides);
          setCurrent(0);
        }
      } catch {
        // Keep default slide when API is unavailable.
      }
    };

    loadSlides();
  }, []);

  useEffect(() => {
    if (sliders.length < 2) return;
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % sliders.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliders]);

  const slider = sliders[current] || defaultSlides[0];

  return (
    <section className="hc-hero hc-reveal" id="hero" aria-labelledby="hero-heading">
      <div className="hc-hero-grid">
        <div
          className="hc-hero-image"
          role="img"
          aria-label={slider.wording}
          style={{
            backgroundImage: `url('${slider.imageUrl}')`,
            transition: 'background-image 0.5s',
          }}
        ></div>
        <div className="hc-hero-content">
          <p className="hc-overline">{slider.wording}</p>
          <h1 id="hero-heading">Villa Hillcrest Sri Lanka</h1>
          <p>
            Crafted for soulful stays with ocean mornings, tropical gardens,
            and serene island living.
          </p>
          <Link href="/booking" className="hc-btn hc-btn-light">Book Your Stay</Link>
        </div>
      </div>
      {sliders.length > 1 && (
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          {sliders.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                margin: 2,
                background: i === current ? '#333' : '#ccc',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-block',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
