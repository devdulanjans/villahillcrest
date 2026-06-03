import { useEffect, useState } from 'react'

function getSafeIndex(index, length) {
  if (!length) return -1
  return (index + length) % length
}

export default function ImageShowWidget({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const hasActiveSlide = activeIndex >= 0 && images.length > 0

  const closeViewer = () => setActiveIndex(-1)
  const showPrevious = () => setActiveIndex(index => getSafeIndex(index - 1, images.length))
  const showNext = () => setActiveIndex(index => getSafeIndex(index + 1, images.length))

  useEffect(() => {
    if (!hasActiveSlide) return undefined

    const onKeyDown = event => {
      if (event.key === 'Escape') closeViewer()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [hasActiveSlide, images.length])

  return (
    <>
      <div className="image-show-grid" aria-label="Image gallery">
        {images.map((item, index) => (
          <figure key={`${item.src}-${index}`} className="image-show-tile">
            <button
              type="button"
              className="image-show-open-btn"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open image ${index + 1} of ${images.length}: ${item.alt}`}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
            </button>
          </figure>
        ))}
      </div>

      {hasActiveSlide && (
        <div className="image-show-modal" role="dialog" aria-modal="true" aria-label="Image viewer">
          <button type="button" className="image-show-backdrop" aria-label="Close image viewer" onClick={closeViewer} />

          <div className="image-show-modal-content">
            <button type="button" className="image-show-close" aria-label="Close" onClick={closeViewer}>
              ×
            </button>

            <button type="button" className="image-show-nav image-show-nav-prev" aria-label="Previous image" onClick={showPrevious}>
              ‹
            </button>

            <figure className="image-show-active-figure">
              <img src={images[activeIndex].src} alt={images[activeIndex].alt} className="image-show-active-image" />
              <figcaption className="image-show-caption">{images[activeIndex].alt}</figcaption>
            </figure>

            <button type="button" className="image-show-nav image-show-nav-next" aria-label="Next image" onClick={showNext}>
              ›
            </button>
          </div>
        </div>
      )}
    </>
  )
}