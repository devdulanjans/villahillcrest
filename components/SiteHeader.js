import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function SiteHeader() {
  const router = useRouter()
  const [activeItem, setActiveItem] = useState('')

  useEffect(() => {
    if (router.pathname === '/about-us') {
      setActiveItem('about')
    }
  }, [router.pathname])

  const getLinkClass = (item, base) => `${base}${activeItem === item ? ' active' : ''}`
  const handleMenuClick = item => () => setActiveItem(item)

  return (
    <header>
      <div className="container">
        <nav className="navbar" aria-label="Primary navigation">
          <div className="nav-left">
            <Link href="/" className={getLinkClass('experience', 'nav-link')} onClick={handleMenuClick('experience')}>Home</Link>
            <Link href="/about-us" className={getLinkClass('about', 'nav-link')} onClick={handleMenuClick('about')}>About</Link>
            <Link href="/bookings" className={getLinkClass('bookings', 'nav-link')} onClick={handleMenuClick('bookings')}>Booking</Link>
            <Link href="/availability" className={getLinkClass('availability', 'nav-link')} onClick={handleMenuClick('availability')}>Availability</Link>
          </div>

          <div className="logo">
            <Link href="/">
              <img src="/images/logo.png" alt="Villa Hillcrest Logo" className="logo-img" />
            </Link>
          </div>

          <div className="nav-right">
            <div className="nav-item has-dropdown">
              <a href="#" className="nav-link">Surf</a>
              <ul className="dropdown" aria-label="Surf submenu">
                <li><a href="#" className="nav-link dropdown-link">Villa</a></li>
                <li><a href="#" className="nav-link dropdown-link">Dining</a></li>
                <li><a href="#" className="nav-link dropdown-link">Yoga</a></li>
                <li><a href="#" className="nav-link dropdown-link">Food</a></li>
                <li><a href="#" className="nav-link dropdown-link">Explore</a></li>
                <li><a href="#" className="nav-link dropdown-link">Cycling</a></li>
              </ul>
            </div>
            <a href="#" className="nav-link">Gallery</a>
            <a href="#" className="nav-link">Offers</a>
            <a href="/contact-us" className="nav-link">Contact Us</a>
          </div>

          <button className="menu-btn" id="menuBtn" aria-label="Open Menu" aria-controls="mobileMenu" aria-expanded="false" type="button">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className="mobile-menu" id="mobileMenu" aria-label="Mobile navigation">
            <button className="close-mobile-menu" id="closeMobileMenu" aria-label="Close Menu">&times;</button>
            <Link href="/about-us" className={getLinkClass('about', 'mobile-nav-link')} onClick={handleMenuClick('about')}>About</Link>
            <a href="#hero" className={getLinkClass('booking', 'mobile-nav-link')} onClick={handleMenuClick('booking')}>Booking</a>
            <a href="#availability" className={getLinkClass('availability', 'mobile-nav-link')} onClick={handleMenuClick('availability')}>Availability</a>
            <a href="#services" className={getLinkClass('experience', 'mobile-nav-link')} onClick={handleMenuClick('experience')}>Experience</a>
            <button className="mobile-nav-link mobile-nav-parent" id="mobileSurfToggle" aria-expanded="false" type="button">
              <span>Surf</span>
              <span className="submenu-arrow">▾</span>
            </button>
            <div className="mobile-submenu" id="mobileSurfSubmenu" aria-hidden="true">
              <a href="#" className="mobile-nav-link mobile-nav-subitem">Villa</a>
              <a href="#" className="mobile-nav-link mobile-nav-subitem">Dining</a>
              <a href="#" className="mobile-nav-link mobile-nav-subitem">Yoga</a>
              <a href="#" className="mobile-nav-link mobile-nav-subitem">Food</a>
              <a href="#" className="mobile-nav-link mobile-nav-subitem">Explore</a>
              <a href="#" className="mobile-nav-link mobile-nav-subitem">Cycling</a>
            </div>
            <a href="#" className="mobile-nav-link">Event</a>
            <a href="#" className="mobile-nav-link">Offers</a>
            <a href="#" className="mobile-nav-link">Gallery</a>
            <a href="#" className="mobile-nav-link">Media</a>
          </nav>
        </nav>
      </div>
    </header>
  )
}
