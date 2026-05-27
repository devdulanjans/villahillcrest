import { useRef, useState } from 'react'

const experiences = [
  {
    title: 'Sleep',
    image: '/images/uploads/sleep-villa-hilcrest.jpg',
    alt: 'Tranquil beach morning',
    detail: 'Calm rooms with natural light, linen textures, and handcrafted details.'
  },
  {
    title: 'Swim Club',
    image: '/images/uploads/swiming-club-villa-hilcrest.jpg',
    alt: 'Resort pool in tropical setting',
    detail: 'Refresh in our poolside lounge framed by gardens and shaded palms.'
  },
  {
    title: 'Surf',
    image: 'https://www.lovesrilanka.org/wp-content/uploads/2020/06/LSL_B2_Blog_1920x700.jpg',
    alt: 'Surfer riding a wave',
    detail: 'Guided sessions for all levels with access to the best southern breaks.'
  },
  {
    title: 'Yoga',
    image: 'https://static.wixstatic.com/media/65f045_7db1a922a19a44d9a909b92104daaf64~mv2.jpg/v1/fill/w_640,h_402,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/65f045_7db1a922a19a44d9a909b92104daaf64~mv2.jpg',
    alt: 'Yoga session at sunrise',
    detail: 'Find your inner peace with our guided yoga sessions.'
  },
  {
    title: 'Dining',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop',
    alt: 'Fine dining setup',
    detail: 'Experience exquisite dining with locally sourced ingredients.'
  }
]

export default function ExperiencesWidget() {
  const visibleSlides = 3
  const maxIndex = Math.max(experiences.length - visibleSlides, 0)
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef(null)

  const goNext = () => setActiveIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  const goPrev = () => setActiveIndex(prev => (prev <= 0 ? maxIndex : prev - 1))

  const handleTouchStart = event => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = event => {
    if (touchStartX.current === null) return

    const deltaX = event.changedTouches[0].clientX - touchStartX.current
    const threshold = 40

    if (deltaX < -threshold) goNext()
    if (deltaX > threshold) goPrev()

    touchStartX.current = null
  }

  return (
    <section className="hc-experiences hc-reveal" aria-labelledby="experiences-heading">
      <div className="container">
        <h2 id="experiences-heading">Experience Villa Hillcrest</h2>

        <div className="hc-exp-slider" aria-roledescription="carousel" aria-label="Experiences slider">
          <button type="button" className="hc-exp-nav hc-exp-prev" onClick={goPrev} aria-label="Previous experience">
            ‹
          </button>

          <div className="hc-exp-viewport" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div
              className="hc-exp-track"
              style={{
                transform: `translateX(-${activeIndex * (100 / visibleSlides)}%)`,
                transition: 'transform 0.5s ease-in-out',
                width: `${(experiences.length / visibleSlides) * 100}%`
              }}
            >
              {experiences.map(item => (
                <article className="hc-exp-slide" key={item.title}>
                  <article className="hc-exp-card">
                    <img src={item.image} alt={item.alt} />
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </article>
                </article>
              ))}
            </div>
          </div>

          <button type="button" className="hc-exp-nav hc-exp-next" onClick={goNext} aria-label="Next experience">
            ›
          </button>
        </div>

        <div className="hc-exp-dots" role="tablist" aria-label="Experience slides">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={`group-${index}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show slide group ${index + 1}`}
              className={`hc-exp-dot${index === activeIndex ? ' is-active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
