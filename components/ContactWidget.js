export default function ContactWidget() {
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
          <form className="contact-form">
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
            <button type="submit" className="contact-submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
}
