import { useEffect, useState } from 'react'
import styles from '../../styles/LandingImageSliderWidget.module.css'

const DEFAULT_SLIDES = []

export default function LandingImageSliderWidget({ autoMs = 5000, altPrefix = 'Landing image' }) {
  const [slides, setSlides] = useState(DEFAULT_SLIDES)
  const [activeIndex, setActiveIndex] = useState(0)
  const [transitionKey, setTransitionKey] = useState(0)

  useEffect(() => {
    fetch('/api/sliders')
      .then((res) => res.json())
      .then((data) => {
        if (data.sliders && data.sliders.length > 0) {
          setSlides(
            data.sliders.map((s) => ({
              image: s.imageUrl,
              title: s.wording,
              subtitle: ''
            }))
          )
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined
    }

    const intervalId = setInterval(() => {
      setTransitionKey((prev) => prev + 1)
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length)
      }, 220)
    }, autoMs)

    return () => clearInterval(intervalId)
  }, [slides.length, autoMs])

  if (!slides.length) {
    return null
  }

  const activeSlide = slides[activeIndex]

  return (
    <section className={styles.landingSlider}>
      <div className={styles.viewport}>
        {slides.map((slide, index) => (
          <div
            key={`${slide.image}-${index}`}
            className={`${styles.slide} ${index === activeIndex ? styles.slideActive : ''}`.trim()}
          >
            <img src={slide.image} alt={`${altPrefix} ${index + 1}`} />
          </div>
        ))}

        <div className={styles.textOverlay} key={`text-${transitionKey}`}>
          <div className={styles.textInner}>
            {activeSlide.subtitle && <p className={styles.subtitle}>{activeSlide.subtitle}</p>}
            <h2>{activeSlide.title}</h2>
          </div>
        </div>

        {slides.length > 1 && (
          <div className={styles.dots}>
            {slides.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`.trim()}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
