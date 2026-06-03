import { useEffect, useState } from 'react'
import sliderStyles from '../styles/HeroFadeSlider.module.css'

const DEFAULT_HERO_SLIDES = [
  '/images/gallery/property-view/1779902296347-99802-10.jpg',
  '/images/gallery/property-view/1779902295978-32443-1.jpg',
  '/images/gallery/property-view/1779902296213-1553-7.jpg',
  '/images/gallery/property-view/1779902296119-24799-4.jpg'
]

export default function HeroFadeSlider({
  slides = DEFAULT_HERO_SLIDES,
  autoMs = 4500,
  altPrefix = 'Slide image',
  className = ''
}) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined
    }

    const intervalId = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, autoMs)

    return () => clearInterval(intervalId)
  }, [slides.length, autoMs])

  useEffect(() => {
    if (activeSlide > slides.length - 1) {
      setActiveSlide(0)
    }
  }, [activeSlide, slides.length])

  if (!slides.length) {
    return null
  }

  return (
    <div className={`${sliderStyles.viewport} ${className}`.trim()}>
      <div className={sliderStyles.track}>
        {slides.map((image, index) => (
          <div
            className={`${sliderStyles.slide} ${activeSlide === index ? sliderStyles.slideActive : ''}`.trim()}
            key={`${image}-${index}`}
          >
            <img src={image} alt={`${altPrefix} ${index + 1}`} />
          </div>
        ))}
      </div>

      {slides.length > 1 ? (
        <div className={sliderStyles.dots}>
          {slides.map((image, index) => (
            <button
              key={`${image}-dot-${index}`}
              type="button"
              className={`${sliderStyles.dot} ${activeSlide === index ? sliderStyles.dotActive : ''}`.trim()}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
