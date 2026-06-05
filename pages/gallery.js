import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'
import BeSearchForm from '../components/be-forms/BeSearchForm'
import PageHero from '../components/PageHero'

export default function GalleryPage() {
  const [galleryAlbums, setGalleryAlbums] = useState([])
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [loadingAlbums, setLoadingAlbums] = useState(true)
  const [albumsError, setAlbumsError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadAlbums = async () => {
      setLoadingAlbums(true)
      setAlbumsError('')

      try {
        const res = await fetch('/api/gallery')
        const data = await res.json()

        if (!isMounted) return

        if (!res.ok) {
          setAlbumsError(data.message || 'Failed to load gallery images')
          setGalleryAlbums([])
          return
        }

        setGalleryAlbums(Array.isArray(data.albums) ? data.albums : [])
      } catch {
        if (!isMounted) return
        setAlbumsError('Failed to load gallery images')
        setGalleryAlbums([])
      } finally {
        if (isMounted) {
          setLoadingAlbums(false)
        }
      }
    }

    loadAlbums()

    return () => {
      isMounted = false
    }
  }, [])

  const allImages = useMemo(
    () => galleryAlbums.flatMap(album => album.images),
    [galleryAlbums]
  )

  const hasLightboxOpen = lightboxIndex !== null

  const closeLightbox = () => setLightboxIndex(null)

  const showNextImage = () => {
    if (lightboxIndex === null) return
    setLightboxIndex(prev => (prev + 1) % allImages.length)
  }

  const showPrevImage = () => {
    if (lightboxIndex === null) return
    setLightboxIndex(prev => (prev - 1 + allImages.length) % allImages.length)
  }

  useEffect(() => {
    if (!hasLightboxOpen) return

    const handleKeyDown = event => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowRight') showNextImage()
      if (event.key === 'ArrowLeft') showPrevImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasLightboxOpen, lightboxIndex, allImages])

  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Gallery</title>
        <meta
          name="description"
          content="Browse Villa Hillcrest gallery albums. Open any album to view all related images."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/gallery" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Villa Hillcrest | Gallery" />
        <meta property="og:description" content="Browse Villa Hillcrest gallery albums. Open any album to view all related images." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villahillcrest.com/gallery" />
        <meta property="og:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Hillcrest | Gallery" />
        <meta name="twitter:description" content="Browse Villa Hillcrest gallery albums. Open any album to view all related images." />
        <meta name="twitter:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Gallery - Villa Hillcrest',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://villahillcrest.com/gallery'
              },
              url: 'https://villahillcrest.com/gallery'
            })
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Montserrat:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="gallery-page">
        <PageHero title="Gallery" className="gallery-hero" ariaLabel="Gallery hero" />

        <BeSearchForm />

        <section className="intro gallery-intro" aria-labelledby="gallery-heading">
          <div className="container">
            <h2 id="gallery-heading">Gallery</h2>
            <p>
              Explore our full collection of photos from Villa Hillcrest — from villa stays and
              dining to cycling rides and local adventures.
            </p>
          </div>
        </section>

        <section className="gallery-images" aria-labelledby="gallery-images-heading">
          <div className="container">
            <h2 id="gallery-images-heading" className="sr-only">All Photos</h2>
            {loadingAlbums && <p>Loading images...</p>}
            {!loadingAlbums && albumsError && <p>{albumsError}</p>}
            {!loadingAlbums && !albumsError && allImages.length === 0 && <p>No gallery images available right now.</p>}
            <div className="gallery-images-grid">
              {allImages.map((image, index) => (
                <figure className="gallery-image-card" key={index}>
                  <button
                    type="button"
                    className="gallery-image-open-btn"
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`Open image ${index + 1}`}
                  >
                    <img src={image} alt={`Villa Hillcrest image ${index + 1}`} loading="lazy" />
                  </button>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {hasLightboxOpen && (
          <section className="gallery-lightbox" aria-label="Enlarged gallery image viewer">
            <button
              type="button"
              className="gallery-lightbox-backdrop"
              onClick={closeLightbox}
              aria-label="Close image viewer"
            />

            <div className="gallery-lightbox-content" role="dialog" aria-modal="true" aria-label="Gallery slider">
              <button
                type="button"
                className="gallery-lightbox-close"
                onClick={closeLightbox}
                aria-label="Close image viewer"
              >
                ×
              </button>

              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-prev"
                onClick={showPrevImage}
                aria-label="Show previous image"
              >
                ‹
              </button>

              <figure className="gallery-lightbox-figure">
                <img
                  src={allImages[lightboxIndex]}
                  alt={`Villa Hillcrest enlarged image ${lightboxIndex + 1}`}
                />
                <figcaption>
                  {lightboxIndex + 1} / {allImages.length}
                </figcaption>
              </figure>

              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-next"
                onClick={showNextImage}
                aria-label="Show next image"
              >
                ›
              </button>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}
