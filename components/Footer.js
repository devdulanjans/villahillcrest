import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiYoutube,
  SiBookingdotcom,
  SiAirbnb,
  SiTripadvisor
} from 'react-icons/si'
import { FaHotel, FaRoute } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const iconMap = {
  facebook: SiFacebook,
  instagram: SiInstagram,
  tiktok: SiTiktok,
  youtube: SiYoutube,
  booking: SiBookingdotcom,
  airbnb: SiAirbnb,
  agoda: FaHotel,
  tripadvisor: SiTripadvisor,
  viator: FaRoute
}

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState([])

  useEffect(() => {
    let isMounted = true

    const loadSocialLinks = async () => {
      try {
        const res = await fetch('/api/social-links')
        const data = await res.json()

        if (!isMounted) return
        if (!res.ok) return

        setSocialLinks(Array.isArray(data.items) ? data.items : [])
      } catch {
        // Keep footer without social links if endpoint fails.
      }
    }

    loadSocialLinks()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <h2 className="footer-title">
          Villa Hillcrest <br />
          Sri Lanka
        </h2>

        <div className="socials">
          {socialLinks.map(({ id, label, url, iconKey }) => {
            const Icon = iconMap[String(iconKey || '').toLowerCase()] || SiFacebook

            return (
              <a
                key={id || label}
                href={url}
                aria-label={label}
                title={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon aria-hidden="true" focusable="false" />
              </a>
            )
          })}
        </div>

        <div className="footer-links">
          <a href="/#philosophy">Our Philosophy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>

        <p className="copyright">Copyright © 2026 Villa Hillcrest. All rights reserved. </p>
        <p>Design and Developed By <a href="https://orangehil.com/" target="_blank" rel="noopener noreferrer"><span style={{ fontWeight: 'bold', color: '#f38d21' }}>OrangeHill</span></a></p>
      </div>
    </footer>
  )
}
