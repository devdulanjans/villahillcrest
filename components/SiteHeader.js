import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function SiteHeader() {
  const router = useRouter()
  const [activeItem, setActiveItem] = useState('')
  const [roomLinks, setRoomLinks] = useState([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSurfOpen, setIsMobileSurfOpen] = useState(false)
  const [isMobileRoomsOpen, setIsMobileRoomsOpen] = useState(false)
  const [isMobileOffersOpen, setIsMobileOffersOpen] = useState(false)
  const [isMobileRetreatsOpen, setIsMobileRetreatsOpen] = useState(false)

  useEffect(() => {
    if (router.pathname === '/') {
      setActiveItem('experience')
    } else if (router.pathname === '/about-us') {
      setActiveItem('about')
    } else if (router.pathname === '/packages') {
      setActiveItem('packages')
    } else if (router.pathname === '/availability') {
      setActiveItem('availability')
    } else if (router.pathname === '/villa' || router.pathname === '/rooms/[slug]') {
      setActiveItem('villa')
    } else if (router.pathname === '/dining') {
      setActiveItem('dining')
    } else if (router.pathname === '/yoga') {
      setActiveItem('yoga')
    } else if (router.pathname === '/surfing') {
      setActiveItem('surfing')
    } else if (router.pathname === '/surf-retreat') {
      setActiveItem('surf-retreat')
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
    } else if (router.pathname === '/blogs' || router.pathname === '/blogs/[slug]') {
      setActiveItem('blogs')
    } else if (router.pathname === '/contact-us') {
      setActiveItem('contact-us')
    } else {
      setActiveItem('')
    }
  }, [router.pathname])

  useEffect(() => {
    let isMounted = true

    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/rooms')
        const data = await res.json()
        if (!res.ok || !Array.isArray(data?.items) || !isMounted) {
          return
        }

        const normalized = data.items
          .filter(item => item && item.isEnabled)
          .map(item => ({
            id: item.id,
            name: item.name,
            pageSlug: item.pageSlug,
          }))
          .filter(item => item.name && item.pageSlug)

        setRoomLinks(normalized)
      } catch {
        if (isMounted) {
          setRoomLinks([])
        }
      }
    }

    fetchRooms()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsMobileSurfOpen(false)
    setIsMobileRoomsOpen(false)
    setIsMobileRetreatsOpen(false)
  }, [router.pathname])

  const getLinkClass = (item, base) => `${base}${activeItem === item ? ' active' : ''}`
  const handleMenuClick = item => () => setActiveItem(item)
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsMobileSurfOpen(false)
    setIsMobileRoomsOpen(false)
    setIsMobileOffersOpen(false)
    setIsMobileRetreatsOpen(false)
  }

  return (
    <header>
      <div className="container">
        <nav className="navbar" aria-label="Primary navigation">
          <div className="nav-left">
            <Link href="/" className={getLinkClass('experience', 'nav-link')} onClick={handleMenuClick('experience')}>Home</Link>
            <Link href="/about-us" className={getLinkClass('about', 'nav-link')} onClick={handleMenuClick('about')}>OUT STORY</Link>
            <Link href="/dining" className={getLinkClass('dining', 'nav-link')} onClick={handleMenuClick('dining')}>Dining</Link>
            {/* <Link href="/surfing" className={getLinkClass('surfing', 'nav-link')} onClick={handleMenuClick('surfing')}>SURFING</Link> */}
            <div className="nav-item has-dropdown">
              <span className={`nav-link${activeItem === 'surf-retreat' || activeItem === 'surfing' ? ' active' : ''}`}>Retreats</span>
              <ul className="dropdown" aria-label="Retreats submenu">
                <li><Link href="/surf-retreat" className={getLinkClass('surf-retreat', 'nav-link dropdown-link')} onClick={handleMenuClick('surf-retreat')}>Surf Retreat</Link></li>
                <li><Link href="/packages" className={getLinkClass('packages', 'nav-link dropdown-link')} onClick={handleMenuClick('packages')}>Wellness Retreat</Link></li>
              </ul>
            </div>
            <div className="nav-item has-dropdown">
              <Link href="/offers" className={getLinkClass('offers', 'nav-link')} onClick={handleMenuClick('offers')}>Offers</Link>
              <ul className="dropdown" aria-label="Offers submenu">
                <li><Link href="/offers" className={getLinkClass('offers', 'nav-link dropdown-link')} onClick={handleMenuClick('offers')}>Offers</Link></li>
                <li><Link href="/packages" className={getLinkClass('packages', 'nav-link dropdown-link')} onClick={handleMenuClick('packages')}>Packages</Link></li>
              </ul>
            </div>
            <div className="nav-item has-dropdown">
              <Link href="/villa" className={getLinkClass('villa', 'nav-link')} onClick={handleMenuClick('villa')}>Rooms</Link>
              <ul className="dropdown" aria-label="Rooms submenu">
                {roomLinks.map((room) => (
                  <li key={room.id}>
                    <Link href={`/rooms/${room.pageSlug}`} className={getLinkClass('villa', 'nav-link dropdown-link')} onClick={handleMenuClick('villa')}>
                      {room.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="logo">
            <Link href="/">
              <img src="/images/logo.png" alt="Villa Hillcrest Logo" className="logo-img" />
            </Link>
          </div>

          <div className="nav-right">
            <Link href="/experience" className={getLinkClass('experience', 'nav-link')} onClick={handleMenuClick('experience')}>Experience</Link>
            {/* <div className="nav-item has-dropdown">
              <Link href="/explore" className={getLinkClass('explore', 'nav-link')} onClick={handleMenuClick('explore')}>Experience</Link>
              <ul className="dropdown" aria-label="Surf submenu">
                <li><Link href="/yoga" className={getLinkClass('yoga', 'nav-link dropdown-link')} onClick={handleMenuClick('yoga')}>Yoga</Link></li>
                <li><Link href="/foods" className={getLinkClass('foods', 'nav-link dropdown-link')} onClick={handleMenuClick('foods')}>Food</Link></li>
                <li><Link href="/explore" className={getLinkClass('explore', 'nav-link dropdown-link')} onClick={handleMenuClick('explore')}>Explore</Link></li>
                <li><Link href="/cycling" className={getLinkClass('cycling', 'nav-link dropdown-link')} onClick={handleMenuClick('cycling')}>Cycling</Link></li>
              </ul>
            </div> */}
            <Link href="/gallery" className={getLinkClass('gallery', 'nav-link')} onClick={handleMenuClick('gallery')}>Gallery</Link>
            <Link href="/contact-us" className={getLinkClass('contact-us', 'nav-link')} onClick={handleMenuClick('contact-us')}>Contact Us</Link>
            <Link href="/blogs" className={getLinkClass('blogs', 'nav-link')} onClick={handleMenuClick('blogs')}>Blog</Link>
            <Link href="/booking" className={`${getLinkClass('booking', 'nav-link')} nav-booking-link`} onClick={handleMenuClick('booking')}>Reserve</Link>
          </div>

          <button
            className="menu-btn"
            id="menuBtn"
            aria-label="Open Menu"
            aria-controls="mobileMenu"
            aria-expanded={isMobileMenuOpen}
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`.trim()} id="mobileMenu" aria-label="Mobile navigation">
            <button className="close-mobile-menu" id="closeMobileMenu" aria-label="Close Menu" type="button" onClick={closeMobileMenu}>&times;</button>
            <Link href="/about-us" className={getLinkClass('about', 'mobile-nav-link')} onClick={() => { handleMenuClick('about')(); closeMobileMenu() }}>OUT STORY</Link>
            <Link href="/dining" className={getLinkClass('dining', 'mobile-nav-link')} onClick={() => { handleMenuClick('dining')(); closeMobileMenu() }}>Dining</Link>
            <button className="mobile-nav-link mobile-nav-parent" id="mobileRetreatsToggle" aria-expanded={isMobileRetreatsOpen} type="button" onClick={() => setIsMobileRetreatsOpen(prev => !prev)}>
              <span>Retreats</span>
              <span className="submenu-arrow">▾</span>
            </button>
            <div className={`mobile-submenu ${isMobileRetreatsOpen ? 'active' : ''}`.trim()} id="mobileRetreatsSubmenu" aria-hidden={!isMobileRetreatsOpen}>
              <Link href="/surf-retreat" className={getLinkClass('surf-retreat', 'mobile-nav-link mobile-nav-subitem')} onClick={() => { handleMenuClick('surf-retreat')(); closeMobileMenu() }}>Surf Retreat</Link>
              <Link href="/surfing" className={getLinkClass('surfing', 'mobile-nav-link mobile-nav-subitem')} onClick={() => { handleMenuClick('surfing')(); closeMobileMenu() }}>Surfing</Link>
              <Link href="/packages" className={getLinkClass('packages', 'mobile-nav-link mobile-nav-subitem')} onClick={() => { handleMenuClick('packages')(); closeMobileMenu() }}>Wellness Retreat</Link>
            </div>
            <button className="mobile-nav-link mobile-nav-parent" id="mobileOffersToggle" aria-expanded={isMobileOffersOpen} type="button" onClick={() => setIsMobileOffersOpen(prev => !prev)}>
              <span>Offers</span>
              <span className="submenu-arrow">▾</span>
            </button>
            <div className={`mobile-submenu ${isMobileOffersOpen ? 'active' : ''}`.trim()} id="mobileOffersSubmenu" aria-hidden={!isMobileOffersOpen}>
              <Link href="/offers" className={getLinkClass('offers', 'mobile-nav-link mobile-nav-subitem')} onClick={() => { handleMenuClick('offers')(); closeMobileMenu() }}>Offers</Link>
              <Link href="/packages" className={getLinkClass('packages', 'mobile-nav-link mobile-nav-subitem')} onClick={() => { handleMenuClick('packages')(); closeMobileMenu() }}>Packages</Link>
            </div>
            <button className="mobile-nav-link mobile-nav-parent" id="mobileRoomsToggle" aria-expanded={isMobileRoomsOpen} type="button" onClick={() => setIsMobileRoomsOpen(prev => !prev)}>
              <span>Rooms</span>
              <span className="submenu-arrow">▾</span>
            </button>
            <div className={`mobile-submenu ${isMobileRoomsOpen ? 'active' : ''}`.trim()} id="mobileRoomsSubmenu" aria-hidden={!isMobileRoomsOpen}>
              <Link href="/villa" className={getLinkClass('villa', 'mobile-nav-link mobile-nav-subitem')} onClick={() => { handleMenuClick('villa')(); closeMobileMenu() }}>All Rooms</Link>
              {roomLinks.map(room => (
                <Link
                  key={room.id}
                  href={`/rooms/${room.pageSlug}`}
                  className={getLinkClass('villa', 'mobile-nav-link mobile-nav-subitem')}
                  onClick={() => { handleMenuClick('villa')(); closeMobileMenu() }}
                >
                  {room.name}
                </Link>
              ))}
            </div>
            {/* <button className="mobile-nav-link mobile-nav-parent" id="mobileSurfToggle" aria-expanded={isMobileSurfOpen} type="button" onClick={() => setIsMobileSurfOpen(prev => !prev)}>
              <span>Experience</span>
              <span className="submenu-arrow">▾</span>
            </button>
            <div className={`mobile-submenu ${isMobileSurfOpen ? 'active' : ''}`.trim()} id="mobileSurfSubmenu" aria-hidden={!isMobileSurfOpen}>
              <Link href="/yoga" className={getLinkClass('yoga', 'mobile-nav-link mobile-nav-subitem')} onClick={() => { handleMenuClick('yoga')(); closeMobileMenu() }}>Yoga</Link>
              <Link href="/foods" className={getLinkClass('foods', 'mobile-nav-link mobile-nav-subitem')} onClick={() => { handleMenuClick('foods')(); closeMobileMenu() }}>Food</Link>
              <Link href="/explore" className={getLinkClass('explore', 'mobile-nav-link mobile-nav-subitem')} onClick={() => { handleMenuClick('explore')(); closeMobileMenu() }}>Explore</Link>
              <Link href="/cycling" className={getLinkClass('cycling', 'mobile-nav-link mobile-nav-subitem')} onClick={() => { handleMenuClick('cycling')(); closeMobileMenu() }}>Cycling</Link>
            </div> */}
            
            <Link href="/experience" className={getLinkClass('experience', 'mobile-nav-link')} onClick={() => { handleMenuClick('experience')(); closeMobileMenu() }}>Experience</Link>
            <Link href="/gallery" className={getLinkClass('gallery', 'mobile-nav-link')} onClick={() => { handleMenuClick('gallery')(); closeMobileMenu() }}>Gallery</Link>
            <Link href="/contact-us" className={getLinkClass('contact-us', 'mobile-nav-link')} onClick={() => { handleMenuClick('contact-us')(); closeMobileMenu() }}>Contact Us</Link>
            <Link href="/blogs" className={getLinkClass('blogs', 'mobile-nav-link')} onClick={() => { handleMenuClick('blogs')(); closeMobileMenu() }}>Blog</Link>
            <Link href="/booking" className={`${getLinkClass('booking', 'mobile-nav-link')} mobile-booking-link`} onClick={() => { handleMenuClick('booking')(); closeMobileMenu() }}>Reserve</Link>
          </nav>
        </nav>
      </div>
    </header>
  )
}
