import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Layout from '../../components/Layout'
import BeSearchForm from '../../components/be-forms/BeSearchForm'
import { listEnabledRooms } from '../../lib/mysql'
import { getRoomSlug } from '../../lib/room-slug'
import PageHero from '../../components/PageHero'

function normalizeImagePath(imageValue) {
  const raw = String(imageValue || '').trim()
  if (!raw) {
    return ''
  }

  if (/^https?:\/\//i.test(raw) || raw.startsWith('/')) {
    return raw
  }

  return `/images/rooms/${raw}`
}

function getYoutubeEmbedId(url) {
  if (!url) return null
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]+)/)
  return match?.[1] || null
}

function normalizeRoom(room) {
  const parsedImages = Array.isArray(room?.images)
    ? room.images.map(normalizeImagePath).filter((item) => item.length > 0)
    : []

  const firstImage = parsedImages[0] || ''

  const image = firstImage
    ? firstImage
    : 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop'

  const title = room?.name || 'Villa Room'
  const pageSlug = getRoomSlug(room?.pageSlug, title, room?.id ? `room-${room.id}` : 'room')

  let price = 'Contact us for rates'
  if (Number(room?.priceUsd) > 0) {
    price = `From USD ${Number(room.priceUsd).toLocaleString()} per night`
  } else if (Number(room?.priceLkr) > 0) {
    price = `From LKR ${Number(room.priceLkr).toLocaleString()} per night`
  }

  return {
    id: room?.id,
    title,
    pageSlug,
    image,
    images: parsedImages.length > 0 ? parsedImages : [image],
    category: room?.category || 'Room',
    shortDescription: room?.shortDescription || '',
    descriptionText: room?.descriptionText || '',
    price,
    maxGuests: Number(room?.maxGuests || 2),
    bedSize: room?.bedSize || 'Comfort bed',
    bathrooms: room?.bathrooms || '1',
    roomSizeSqft: Number(room?.roomSizeSqft || 0),
    amenities: Array.isArray(room?.amenities) ? room.amenities : [],
    videoUrl: room?.videoUrl || null,
    bookingUrl: room?.bookingUrl || null,
    beRoomType: room?.beRoomType || title,
  }
}

export async function getServerSideProps(context) {
  const slug = String(context.params?.slug || '').trim().toLowerCase()
  if (!slug) {
    return { notFound: true }
  }

  try {
    const rows = await listEnabledRooms()
    const normalized = rows.map(normalizeRoom)
    const room = normalized.find((item) => item.pageSlug === slug)

    if (!room) {
      return { notFound: true }
    }

    return {
      props: {
        room,
        relatedRooms: normalized
          .filter((item) => item.pageSlug !== slug)
          .slice(0, 6),
      },
    }
  } catch {
    return { notFound: true }
  }
}

export default function RoomDetailsPage({ room, relatedRooms }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const galleryImages = Array.isArray(room.images) ? room.images : []
  const heroImage = galleryImages[0] || room.image
  const thumbImages = galleryImages.slice(1, 5)
  const extraImages = galleryImages.slice(5)
  const stayCards = galleryImages.slice(0, 2)
  const bookingHref = room.bookingUrl || `/booking?room-type=${room.beRoomType}`
  const isYoutubeVideo = Boolean(room.videoUrl && /(youtu\.be\/|youtube\.com\/watch|youtube\.com\/embed)/i.test(room.videoUrl))
  const videoEmbedId = isYoutubeVideo ? getYoutubeEmbedId(room.videoUrl) : null
  const hasLightboxOpen = lightboxIndex !== null

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const showPrevImage = () => {
    if (lightboxIndex === null || extraImages.length === 0) return
    setLightboxIndex(lightboxIndex === 0 ? extraImages.length - 1 : lightboxIndex - 1)
  }
  const showNextImage = () => {
    if (lightboxIndex === null || extraImages.length === 0) return
    setLightboxIndex(lightboxIndex === extraImages.length - 1 ? 0 : lightboxIndex + 1)
  }

  return (
    <Layout>
      <Head>
        <title>{`Villa Hillcrest | ${room.title}`}</title>
        <meta
          name="description"
          content={room.shortDescription || `Explore ${room.title} at Villa Hillcrest, including amenities, room details, and booking options.`}
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href={`https://villahillcrest.com/rooms/${room.pageSlug}`} />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="room-details-page">
        <PageHero title={room.title} imageUrl={heroImage} className="room-header-hero" ariaLabel={`${room.title} header image`} />

        <BeSearchForm />
        <section className="room-details-top" aria-label={`${room.title} gallery and summary`}>
          <div className="container">
            <h2 className="room-main-title">Gallery</h2>

            <div className="room-gallery-grid">
              <div className="room-gallery-main">
                <img src={heroImage} alt={room.title} loading="eager" />
              </div>
              <div className="room-gallery-thumbs">
                {thumbImages.map((img, index) => (
                  <div className="room-gallery-thumb" key={`${img}-${index}`}>
                    <img src={img} alt={`${room.title} view ${index + 2}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            <div className="room-summary-card">
              <div>
                <p className="room-location">Weligama, Sri Lanka</p>
                <h2>{room.title}</h2>
                <p className="room-meta-line">
                  {room.maxGuests} Guests • {room.bedSize} • {room.bathrooms} Bath
                  {room.roomSizeSqft > 0 ? ` • ${room.roomSizeSqft} sqft` : ''}
                </p>
                <p className="room-price-line">{room.price}</p>
              </div>

              <div className="room-rating-box">
                <p className="room-rating-label">Guest Favourite</p>
                <p className="room-rating-value">4.9</p>
                <p className="room-rating-note">Based on recent stays</p>
              </div>
            </div>

            <div className="room-description-block">
              <h3>Comfortable and fully equipped stay</h3>
              <p>{room.shortDescription}</p>
              {room.descriptionText && <p>{room.descriptionText}</p>}
            </div>
          </div>
        </section>

        {room.videoUrl && (
          <>
            <section className="room-video-section" aria-labelledby="room-video-heading">
              <div className="container">
                <h2 id="room-video-heading">Room video</h2>
                <div className="room-video-wrapper">
                  {isYoutubeVideo && videoEmbedId ? (
                    <iframe
                      width="100%"
                      height="500"
                      src={`https://www.youtube.com/embed/${videoEmbedId}`}
                      title="Room video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video controls width="100%" className="room-video-player">
                      <source src={room.videoUrl} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </div>
            </section>

            {extraImages.length > 0 && (
              <section className="room-extra-images-section" aria-labelledby="room-extra-images-heading">
                <div className="container">
                  <h2 id="room-extra-images-heading">More room photos</h2>
                  <div className="gallery-images-grid">
                    {extraImages.map((img, index) => (
                      <figure className="gallery-image-card" key={`${img}-${index}`}>
                        <button
                          type="button"
                          className="gallery-image-open-btn"
                          onClick={() => openLightbox(index)}
                          aria-label={`Open image ${index + 1} of ${extraImages.length}`}
                        >
                          <img src={img} alt={`${room.title} photo ${index + 6}`} loading="lazy" />
                        </button>
                      </figure>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {hasLightboxOpen && (
              <section className="gallery-lightbox" aria-label="Enlarged room image viewer">
                <button
                  type="button"
                  className="gallery-lightbox-backdrop"
                  onClick={closeLightbox}
                  aria-label="Close image viewer"
                />

                <div className="gallery-lightbox-content" role="dialog" aria-modal="true" aria-label="Room gallery slider">
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
                      src={extraImages[lightboxIndex]}
                      alt={`${room.title} enlarged photo ${lightboxIndex + 1}`}
                    />
                    <figcaption>
                      {room.title} | {lightboxIndex + 1} / {extraImages.length}
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
          </>
        )}

        <section className="room-stay-section" aria-labelledby="room-stay-heading">
          <div className="container">
            <h2 id="room-stay-heading">Where you'll stay</h2>
            <div className="room-stay-grid">
              {stayCards.map((img, index) => (
                <article className="room-stay-card" key={`${img}-${index}`}>
                  <img src={img} alt={`${room.title} interior ${index + 1}`} loading="lazy" />
                  <div className="room-stay-body">
                    <h3>{room.title}</h3>
                    <p>{room.bedSize}</p>
                    <p>{room.roomSizeSqft > 0 ? `${room.roomSizeSqft} sqft` : room.category}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="room-amenities-section" aria-labelledby="room-amenities-heading">
          <div className="container">
            <h2 id="room-amenities-heading">Room details and amenities</h2>
            <div className="room-amenities-grid">
              <article className="room-amenities-card">
                <h3>Apartment</h3>
                <ul>
                  <li>{room.category}</li>
                  <li>{room.maxGuests} guests</li>
                  <li>{room.bedSize}</li>
                  <li>{room.bathrooms} bath</li>
                  {room.roomSizeSqft > 0 && <li>{room.roomSizeSqft} sqft</li>}
                </ul>
              </article>

              <article className="room-amenities-card">
                <h3>Included in your stay</h3>
                <ul>
                  {room.amenities.length > 0 ? room.amenities.map((amenity) => (
                    <li key={amenity}>{amenity}</li>
                  )) : (
                    <li>Daily host support</li>
                  )}
                </ul>
              </article>

              <article className="room-amenities-card room-booking-card">
                <h3>Reserve now</h3>
                <p>{room.price}</p>
                <a href={bookingHref} className="villa-book-btn">Book this room</a>
              </article>
            </div>
          </div>
        </section>

        {relatedRooms.length > 0 && (
          <section className="room-related-section" aria-labelledby="more-rooms-heading">
            <div className="container">
              <h2 id="more-rooms-heading">More rooms you may like</h2>
              <div className="villa-room-grid">
                {relatedRooms.map((item) => (
                  <article className="villa-room-card" key={item.id || item.pageSlug}>
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <div className="villa-room-body">
                      <h3>{item.title}</h3>
                      <p className="villa-price">{item.price}</p>
                      <ul>
                        <li>{item.category}</li>
                        <li>{`${item.maxGuests} guests`}</li>
                        <li>{item.bedSize}</li>
                      </ul>
                      <Link href={`/rooms/${item.pageSlug}`} className="villa-book-btn">View room</Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  )
}
