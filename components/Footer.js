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
import { usePathname } from 'next/navigation'

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/villahillcrestweligama/',
    Icon: SiFacebook
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/villahillcrest/',
    Icon: SiInstagram
  },
  {
    label: 'TikTok',
    href: '#',
    Icon: SiTiktok
  },
  {
    label: 'YouTube',
    href: '#',
    Icon: SiYoutube
  },
  {
    label: 'Booking.com',
    href: '#',
    Icon: SiBookingdotcom
  },
  {
    label: 'Airbnb',
    href: '#',
    Icon: SiAirbnb
  },
  {
    label: 'Agoda',
    href: '#',
    Icon: FaHotel
  },
  {
    label: 'Tripadvisor',
    href: '#',
    Icon: SiTripadvisor
  },
  {
    label: 'Viator',
    href: '#',
    Icon: FaRoute
  }
]

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <h2 className="footer-title">
          Villa Hillcrest <br />
          Sri Lanka
        </h2>

        {pathname !== '/booking' &&
        <div className="socials">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon aria-hidden="true" focusable="false" />
            </a>
          ))}
        </div>}

        <div className="footer-links">
          <a href="/#philosophy">Our Philosophy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>

        <p className="copyright">Copyright © 2026 Villa Hillcrest. All rights reserved.</p>
      </div>
    </footer>
  )
}
