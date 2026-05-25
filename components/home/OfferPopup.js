import { useEffect, useState } from 'react'

export default function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [offer, setOffer] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadRandomOffer = async () => {
      try {
        const res = await fetch('/api/offers/random')
        const data = await res.json()

        if (!isMounted) return
        if (res.ok && data?.item) {
          setOffer(data.item)
        }
      } catch {
        // Keep popup fallback content if endpoint fails.
      }
    }

    loadRandomOffer()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsOpen(true)
    }, 5000)

    return () => clearTimeout(timerId)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = event => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="hc-offer-overlay" role="dialog" aria-modal="true" aria-labelledby="offer-title">
      <div className="hc-offer-modal">
        <button
          type="button"
          className="hc-offer-close"
          aria-label="Close offer popup"
          onClick={() => setIsOpen(false)}
        >
          ×
        </button>

        <div className="hc-offer-media" aria-hidden="true">
          <img
            src={offer?.imageUrl || 'https://villahillcrest.com/wp-content/uploads/2024/08/Airbnb_OphelieJammaers-21-scaled.jpg'}
            alt=""
          />
        </div>

        <div className="hc-offer-content">
          <h2 id="offer-title">{offer?.title || 'Save EUR 100 every week this May'}</h2>
          {offer?.descriptionHtml ? (
            <div dangerouslySetInnerHTML={{ __html: offer.descriptionHtml }} />
          ) : (
            <>
              <p>
                Stay with us between <strong>24 May - 31 May 2026</strong> and enjoy
                <strong> EUR 100 off per week</strong> on any package.
              </p>
              <p><strong>Limited-time offer with limited spots available.</strong></p>
              <p>
                All listed package rates are <strong>before discount</strong>. Your reduced
                rate will be applied at the time of booking.
              </p>
              <p><strong>Offer valid only for stays within these dates.</strong></p>
            </>
          )}

          <a href="/availability" className="hc-offer-btn">View Packages</a>
        </div>
      </div>
    </div>
  )
}
