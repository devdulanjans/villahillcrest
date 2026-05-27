import { useEffect, useMemo, useState } from 'react'
import { defaultContactDetails, normalizeContactDetails } from '../lib/contact-defaults'

function extractMapSrc(value) {
  const raw = String(value || '').trim()
  if (!raw) return ''

  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw
  }

  const srcMatch = raw.match(/src=["']([^"']+)["']/i)
  return srcMatch ? srcMatch[1] : ''
}

function toWhatsAppHref(number) {
  const digits = String(number || '').replace(/[^\d]/g, '')
  return digits ? `https://wa.me/${digits}` : '#'
}

export default function ContactWidget() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [contactDetails, setContactDetails] = useState(defaultContactDetails)

  const contactFormEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || ''
  const mapSrc = useMemo(() => extractMapSrc(contactDetails.mapIframeHtml), [contactDetails.mapIframeHtml])

  useEffect(() => {
    let isMounted = true

    const loadContactDetails = async () => {
      try {
        const response = await fetch('/api/contact-details')
        const data = await response.json()

        if (!isMounted || !response.ok || !data?.item) {
          return
        }

        const item = data.item
        setContactDetails(normalizeContactDetails(item))
      } catch {
        // Keep default details if API fails.
      }
    }

    loadContactDetails()

    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    setSubmitMessage('')

    if (!contactFormEndpoint) {
      setSubmitStatus('error')
      setSubmitMessage('Form is not configured yet. Please set NEXT_PUBLIC_CONTACT_FORM_ENDPOINT and rebuild.')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const isFormSubmit = /formsubmit\.co/i.test(contactFormEndpoint)

    try {
      setIsSubmitting(true)

      const payload = Object.fromEntries(formData.entries())
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        }
      }

      if (isFormSubmit) {
        requestOptions.headers['Content-Type'] = 'application/json'
        requestOptions.body = JSON.stringify({
          ...payload,
          name: `${payload.firstName || ''} ${payload.lastName || ''}`.trim(),
          _subject: 'New Contact Form Submission - Villa Hillcrest',
          _template: 'table',
          _captcha: 'false'
        })
      } else {
        requestOptions.body = formData
      }

      const response = await fetch(contactFormEndpoint, requestOptions)

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      form.reset()
      setSubmitStatus('success')
      setSubmitMessage('Thank you. Your message has been sent successfully.')
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Sorry, we could not send your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact-widget fade-in" aria-labelledby="contact-widget-heading">
      <div className="container contact-widget-grid">
        <div className="contact-widget-map">
          <iframe
            title="Villa Hillcrest location"
            src={mapSrc}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="contact-card-row">
            <div className="contact-card">
              <h3>Address</h3>
              {String(contactDetails.addressText || '')
                .split('\n')
                .filter(line => line.trim().length > 0)
                .map((line, index) => <p key={index}>{line}</p>)}
            </div>
            <div className="contact-card">
              <h3>Phone</h3>
              {contactDetails.phoneNumbers.map((phone, index) => (
                <p key={index}>{phone}</p>
              ))}
              <p>
                <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
              </p>
              <p>
                <a href={toWhatsAppHref(contactDetails.whatsappNumber)} target="_blank" rel="noreferrer">
                  WhatsApp: {contactDetails.whatsappNumber}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="contact-widget-form">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-row">
              <label>
                First Name (required)
                <input type="text" name="firstName" required />
              </label>
              <label>
                Last Name (required)
                <input type="text" name="lastName" required />
              </label>
            </div>
            <label>
              Email (required)
              <input type="email" name="email" required />
            </label>
            <label>
              Phone Number (required)
              <input type="tel" name="phone" placeholder="e.g. 004912345678910" required />
              <span className="contact-hint">Preferably WhatsApp or iMessage. Only numbers and country code.</span>
            </label>
            <label>
              I have a question about... (required)
              <select name="subject" required>
                <option value="">Select an option</option>
                <option value="booking">Booking</option>
                <option value="rooms">Rooms</option>
                <option value="rates">Rates</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>
              Message (required)
              <textarea name="message" rows="6" required></textarea>
            </label>
            <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
            {submitMessage && (
              <p
                className={`contact-submit-feedback ${submitStatus === 'success' ? 'is-success' : 'is-error'}`}
                role="status"
                aria-live="polite"
              >
                {submitMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
