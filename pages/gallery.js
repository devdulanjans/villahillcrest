import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'

export default function GalleryPage() {
  const [galleryAlbums, setGalleryAlbums] = useState([])
  const [selectedAlbumId, setSelectedAlbumId] = useState(null)
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
          setAlbumsError(data.message || 'Failed to load gallery albums')
          setGalleryAlbums([])
          return
        }

        const nextAlbums = Array.isArray(data.albums) ? data.albums : []
        setGalleryAlbums(nextAlbums)

        setSelectedAlbumId(prev => {
          if (!prev) return prev
          const stillExists = nextAlbums.some(album => album.id === prev)
          if (!stillExists) {
            setLightboxIndex(null)
            return null
          }
          return prev
        })
      } catch {
        if (!isMounted) return
        setAlbumsError('Failed to load gallery albums')
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

  const selectedAlbum = useMemo(
    () => galleryAlbums.find(album => album.id === selectedAlbumId) || null,
    [selectedAlbumId]
  )

  const hasLightboxOpen = selectedAlbum && lightboxIndex !== null

  const closeLightbox = () => setLightboxIndex(null)

  const showNextImage = () => {
    if (!selectedAlbum || lightboxIndex === null) return
    setLightboxIndex(prev => (prev + 1) % selectedAlbum.images.length)
  }

  const showPrevImage = () => {
    if (!selectedAlbum || lightboxIndex === null) return
    setLightboxIndex(prev => (prev - 1 + selectedAlbum.images.length) % selectedAlbum.images.length)
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
  }, [hasLightboxOpen, lightboxIndex, selectedAlbum])

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
        <section className="gallery-hero" aria-label="Gallery hero">
          <div className="gallery-hero-overlay">
            <h1>Gallery</h1>
          </div>
        </section>

        <section className="intro gallery-intro" aria-labelledby="gallery-heading">
          <div className="container">
            <h2 id="gallery-heading">Albums from Villa Hillcrest</h2>
            <p>
              Start with our album collection and open any specific album to view all related photos.
              From cycling rides and villa stays to dining and local adventures, each album captures
              a different part of the experience.
            </p>
          </div>
        </section>

        <section className="gallery-albums" aria-labelledby="albums-heading">
          <div className="container">
            <h2 id="albums-heading">Albums</h2>
            {loadingAlbums && <p>Loading albums...</p>}
            {!loadingAlbums && albumsError && <p>{albumsError}</p>}
            {!loadingAlbums && !albumsError && galleryAlbums.length === 0 && <p>No gallery albums available right now.</p>}
            <div className="gallery-albums-grid">
              {galleryAlbums.map(album => (
                <button
                  type="button"
                  className={`gallery-album-card${selectedAlbumId === album.id ? ' is-active' : ''}`}
                  key={album.id}
                  onClick={() => setSelectedAlbumId(album.id)}
                  aria-label={`Open ${album.title} album`}
                >
                  <img src={album.cover} alt={`${album.title} cover`} loading="lazy" />
                  <div className="gallery-album-copy">
                    <h3>{album.title}</h3>
                    <p>{album.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {selectedAlbum && (
          <section className="gallery-images" aria-labelledby="selected-album-heading">
            <div className="container">
              <div className="gallery-images-head">
                <h2 id="selected-album-heading">{selectedAlbum.title}</h2>
                <button
                  type="button"
                  className="gallery-back-btn"
                  onClick={() => {
                    setSelectedAlbumId(null)
                    closeLightbox()
                  }}
                  aria-label="Back to albums"
                >
                  Back to Albums
                </button>
              </div>
              <div className="gallery-images-grid">
                {selectedAlbum.images.map((image, index) => (
                  <figure className="gallery-image-card" key={`${selectedAlbum.id}-${index}`}>
                    <button
                      type="button"
                      className="gallery-image-open-btn"
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`Open image ${index + 1} from ${selectedAlbum.title}`}
                    >
                      <img src={image} alt={`${selectedAlbum.title} image ${index + 1}`} loading="lazy" />
                    </button>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

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
                  src={selectedAlbum.images[lightboxIndex]}
                  alt={`${selectedAlbum.title} enlarged image ${lightboxIndex + 1}`}
                />
                <figcaption>
                  {selectedAlbum.title} | {lightboxIndex + 1} / {selectedAlbum.images.length}
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
