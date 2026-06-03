import { useEffect, useState } from 'react';
import Link from 'next/link'

const defaultSlides = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    wording: 'Villa Hillcrest',
    heading: 'Villa Hillcrest Sri Lanka',
    description:
      'Crafted for soulful stays with ocean mornings, tropical gardens, and serene island living.',
    ctaLabel: 'Book Your Stay',
    ctaHref: '/booking',
  },
];

function normalizeSlide(slide) {
  return {
    imageUrl: slide?.imageUrl || slide?.image || defaultSlides[0].imageUrl,
    wording: slide?.wording || slide?.title || defaultSlides[0].wording,
    heading: slide?.heading || defaultSlides[0].heading,
    description: slide?.description || defaultSlides[0].description,
    ctaLabel: slide?.ctaLabel || defaultSlides[0].ctaLabel,
    ctaHref: slide?.ctaHref || defaultSlides[0].ctaHref,
  };
}

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
          setSliders(incomingSlides.map(normalizeSlide));
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

  const slider = normalizeSlide(sliders[current]);
  const shouldSwapLayout = sliders.length > 1 && current % 2 === 1;

  return (
    <section className="hc-hero hc-reveal" id="hero" aria-labelledby="hero-heading">
      <div className={`hc-hero-grid ${shouldSwapLayout ? 'is-swapped' : ''}`.trim()}>
        <div
          className="hc-hero-image"
          role="img"
          aria-label={slider.wording}
        >
          <div className="hc-hero-media" aria-hidden="true">
            {sliders.map((item, index) => {
              const mapped = normalizeSlide(item);
              return (
                <div
                  key={`${mapped.imageUrl}-${index}`}
                  className={`hc-hero-slide ${current === index ? 'is-active' : ''}`.trim()}
                  style={{ backgroundImage: `url('${mapped.imageUrl}')` }}
                ></div>
              );
            })}
          </div>
        </div>
        <div className="hc-hero-content">
          <div key={`${slider.imageUrl}-${current}`} className="hc-hero-textswap">
            <p className="hc-overline">{slider.wording}</p>
            <h1 id="hero-heading">{slider.heading}</h1>
            <p>{slider.description}</p>
            <Link href={slider.ctaHref} className="hc-btn hc-btn-light">{slider.ctaLabel}</Link>
          </div>
        </div>
      </div>
      {sliders.length > 1 && (
        <div className="hc-hero-dots" role="tablist" aria-label="Hero slides">
          {sliders.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`hc-hero-dot ${i === current ? 'is-active' : ''}`.trim()}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-current={i === current}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
