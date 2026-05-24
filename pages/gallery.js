import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'

const galleryAlbums = [
  {
    id: 'cycling-routes',
    title: 'Cycling Routes',
    subtitle: 'Coastal roads, tea trails, and sunrise rides',
    cover: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=1400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1493589976221-c2357c31ad77?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517654443271-10d4f2f6f6f0?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517940310602-26535839fe84?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514481538271-cf9f99627ab4?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533560904424-a0c61f41a52f?q=80&w=1400&auto=format&fit=crop'
    ]
  },
  {
    id: 'villa-stays',
    title: 'Villa Stays',
    subtitle: 'Rooms, poolside moments, and design details',
    cover: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1400&auto=format&fit=crop'
    ]
  },
  {
    id: 'dining-food',
    title: 'Dining & Food',
    subtitle: 'Island flavors, colorful plates, and cafe vibes',
    cover: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=1400&auto=format&fit=crop'
    ]
  },
  {
    id: 'explore-south-coast',
    title: 'Explore South Coast',
    subtitle: 'Temples, beaches, villages, and local culture',
    cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530878902700-5ad4f9e4c318?q=80&w=1400&auto=format&fit=crop'
    ]
  }
]

export default function GalleryPage() {
  const [selectedAlbumId, setSelectedAlbumId] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)

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
