import { useState } from 'react'

export default function ContactWidget() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState('idle')

  const contactFormEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || ''

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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.024143187852!2d80.4297093!3d5.9914122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae16b18fd149cf5%3A0x51e8715a6bd36414!2sVilla%20Hillcrest!5e0!3m2!1sen!2slk!4v1779045768360!5m2!1sen!2slk"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="contact-card-row">
            <div className="contact-card">
              <h3>Address</h3>
              <p>Villa Hillcrest</p>
              <p>Galkaduwahena, Palalla,</p>
              <p>Weligama 81700</p>
              <p>Sri Lanka</p>
            </div>
            <div className="contact-card">
              <h3>Phone</h3>
              <p>+94 77 796 5733</p>
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
