import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function SiteHeader() {
  const router = useRouter()
  const [activeItem, setActiveItem] = useState('')

  useEffect(() => {
    if (router.pathname === '/') {
      setActiveItem('experience')
    } else if (router.pathname === '/about-us') {
      setActiveItem('about')
    } else if (router.pathname === '/packages') {
      setActiveItem('packages')
    } else if (router.pathname === '/availability') {
      setActiveItem('availability')
    } else if (router.pathname === '/villa') {
      setActiveItem('villa')
    } else if (router.pathname === '/dining') {
      setActiveItem('dining')
    } else if (router.pathname === '/yoga') {
      setActiveItem('yoga')
    } else if (router.pathname === '/foods') {
      setActiveItem('foods')
    } else if (router.pathname === '/explore') {
      setActiveItem('explore')
    } else if (router.pathname === '/cycling') {
      setActiveItem('cycling')
    } else if (router.pathname === '/gallery') {
      setActiveItem('gallery')
    } else if (router.pathname === '/offers') {
      setActiveItem('offers')
    } else if (router.pathname === '/contact-us') {
      setActiveItem('contact-us')
    } else {
      setActiveItem('')
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
            <Link href="/packages" className={getLinkClass('packages', 'nav-link')} onClick={handleMenuClick('packages')}>Packages</Link>
            <Link href="/availability" className={getLinkClass('availability', 'nav-link')} onClick={handleMenuClick('availability')}>Availability</Link>
            <Link href="/offers" className={getLinkClass('offers', 'nav-link')} onClick={handleMenuClick('offers')}>Offers</Link>
          </div>

          <div className="logo">
            <Link href="/">
              <img src="/images/logo.png" alt="Villa Hillcrest Logo" className="logo-img" />
            </Link>
          </div>

          <div className="nav-right">
            <div className="nav-item has-dropdown">
              <Link href="/villa" className={getLinkClass('villa', 'nav-link')} onClick={handleMenuClick('villa')}>Surf</Link>
              <ul className="dropdown" aria-label="Surf submenu">
                <li><Link href="/villa" className={getLinkClass('villa', 'nav-link dropdown-link')} onClick={handleMenuClick('villa')}>Villa</Link></li>
                <li><Link href="/dining" className={getLinkClass('dining', 'nav-link dropdown-link')} onClick={handleMenuClick('dining')}>Dining</Link></li>
                <li><Link href="/yoga" className={getLinkClass('yoga', 'nav-link dropdown-link')} onClick={handleMenuClick('yoga')}>Yoga</Link></li>
                <li><Link href="/foods" className={getLinkClass('foods', 'nav-link dropdown-link')} onClick={handleMenuClick('foods')}>Food</Link></li>
                <li><Link href="/explore" className={getLinkClass('explore', 'nav-link dropdown-link')} onClick={handleMenuClick('explore')}>Explore</Link></li>
                <li><Link href="/cycling" className={getLinkClass('cycling', 'nav-link dropdown-link')} onClick={handleMenuClick('cycling')}>Cycling</Link></li>
              </ul>
            </div>
            <Link href="/gallery" className={getLinkClass('gallery', 'nav-link')} onClick={handleMenuClick('gallery')}>Gallery</Link>
            <Link href="/contact-us" className={getLinkClass('contact-us', 'nav-link')} onClick={handleMenuClick('contact-us')}>Contact Us</Link>
            <Link href="/booking" className={getLinkClass('booking', 'nav-link')} onClick={handleMenuClick('booking')}>Booking</Link>
          </div>

          <button className="menu-btn" id="menuBtn" aria-label="Open Menu" aria-controls="mobileMenu" aria-expanded="false" type="button">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className="mobile-menu" id="mobileMenu" aria-label="Mobile navigation">
            <button className="close-mobile-menu" id="closeMobileMenu" aria-label="Close Menu">&times;</button>
            <Link href="/about-us" className={getLinkClass('about', 'mobile-nav-link')} onClick={handleMenuClick('about')}>About</Link>
            <a href="/packages" className={getLinkClass('packages', 'mobile-nav-link')} onClick={handleMenuClick('packages')}>Packages</a>
            <a href="#availability" className={getLinkClass('availability', 'mobile-nav-link')} onClick={handleMenuClick('availability')}>Availability</a>
            <a href="#services" className={getLinkClass('experience', 'mobile-nav-link')} onClick={handleMenuClick('experience')}>Experience</a>
            <button className="mobile-nav-link mobile-nav-parent" id="mobileSurfToggle" aria-expanded="false" type="button">
              <span>Surf</span>
              <span className="submenu-arrow">▾</span>
            </button>
            <div className="mobile-submenu" id="mobileSurfSubmenu" aria-hidden="true">
              <Link href="/villa" className={getLinkClass('villa', 'mobile-nav-link mobile-nav-subitem')} onClick={handleMenuClick('villa')}>Villa</Link>
              <Link href="/dining" className={getLinkClass('dining', 'mobile-nav-link mobile-nav-subitem')} onClick={handleMenuClick('dining')}>Dining</Link>
              <Link href="/yoga" className={getLinkClass('yoga', 'mobile-nav-link mobile-nav-subitem')} onClick={handleMenuClick('yoga')}>Yoga</Link>
              <Link href="/foods" className={getLinkClass('foods', 'mobile-nav-link mobile-nav-subitem')} onClick={handleMenuClick('foods')}>Food</Link>
              <Link href="/explore" className={getLinkClass('explore', 'mobile-nav-link mobile-nav-subitem')} onClick={handleMenuClick('explore')}>Explore</Link>
              <Link href="/cycling" className={getLinkClass('cycling', 'mobile-nav-link mobile-nav-subitem')} onClick={handleMenuClick('cycling')}>Cycling</Link>
            </div>
            <a href="#" className="mobile-nav-link">Event</a>
            <Link href="/offers" className={getLinkClass('offers', 'mobile-nav-link')} onClick={handleMenuClick('offers')}>Offers</Link>
            <Link href="/gallery" className={getLinkClass('gallery', 'mobile-nav-link')} onClick={handleMenuClick('gallery')}>Gallery</Link>
            <Link href="/booking" className={getLinkClass('booking', 'mobile-nav-link')} onClick={handleMenuClick('booking')}>Booking</Link>
            <a href="#" className="mobile-nav-link">Media</a>
          </nav>
        </nav>
      </div>
    </header>
  )
}
