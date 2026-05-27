import Head from 'next/head'
import Layout from '../components/Layout'
import BeBookingForm from '../components/be-forms/BeBookingForm'
import {useEffect} from "react";

export default function BookingPage() {
    useEffect(() => {
        // MOBILE MENU TOGGLE
        const menuBtn = document.getElementById('menuBtn')
        const mobileMenu = document.getElementById('mobileMenu')
        const closeMobileMenu = document.getElementById('closeMobileMenu')
        const mobileSurfToggle = document.getElementById('mobileSurfToggle')
        const mobileSurfSubmenu = document.getElementById('mobileSurfSubmenu')

        const openMenu = () => {
            mobileMenu && mobileMenu.classList.add('active')
            document.body.style.overflow = 'hidden'
            menuBtn && menuBtn.setAttribute('aria-expanded', 'true')
        }
        const closeMenu = () => {
            mobileMenu && mobileMenu.classList.remove('active')
            document.body.style.overflow = ''
            menuBtn && menuBtn.setAttribute('aria-expanded', 'false')
        }

        menuBtn && menuBtn.addEventListener('click', openMenu)
        closeMobileMenu && closeMobileMenu.addEventListener('click', closeMenu)

        mobileSurfToggle && mobileSurfToggle.addEventListener('click', () => {
            const isExpanded = mobileSurfToggle.getAttribute('aria-expanded') === 'true'
            mobileSurfToggle.setAttribute('aria-expanded', String(!isExpanded))
            mobileSurfSubmenu && mobileSurfSubmenu.classList.toggle('active')
            mobileSurfSubmenu && mobileSurfSubmenu.setAttribute('aria-hidden', String(isExpanded))
        })

        document.querySelectorAll('.mobile-nav-link:not(.mobile-nav-parent)').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu && mobileMenu.classList.remove('active')
                document.body.style.overflow = ''
                menuBtn && menuBtn.setAttribute('aria-expanded', 'false')
                mobileSurfToggle && mobileSurfToggle.setAttribute('aria-expanded', 'false')
                mobileSurfSubmenu && mobileSurfSubmenu.classList.remove('active')
                mobileSurfSubmenu && mobileSurfSubmenu.setAttribute('aria-hidden', 'true')
            })
        })

        return () => {
            menuBtn && menuBtn.removeEventListener('click', openMenu)
            closeMobileMenu && closeMobileMenu.removeEventListener('click', closeMenu)
        }
    }, [])

  return (
    <Layout>
      <Head>
        <title>Villa Hill Crest, Weligama - Official Website | Booking</title>
        <meta name="description" content="Book your stay at Villa Hillcrest, Sri Lanka. Secure your luxury villa experience now." />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/booking" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph tags */}
        <meta property="og:title" content="Villa Hillcrest | Booking" />
        <meta property="og:description" content="Book your stay at Villa Hillcrest, Sri Lanka. Secure your luxury villa experience now." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villahillcrest.com/booking" />
        <meta property="og:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Hillcrest | Booking" />
        <meta name="twitter:description" content="Book your stay at Villa Hillcrest, Sri Lanka. Secure your luxury villa experience now." />
        <meta name="twitter:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Booking - Villa Hillcrest",
              "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://villahillcrest.com/booking"
              },
              "url": "https://villahillcrest.com/booking"
          }) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Montserrat:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="booking-page">
        <section className="booking-hero" aria-label="Booking hero" />

        <section className="intro booking-intro" aria-labelledby="booking-heading">
          <div className="container">
            <h2 id="booking-heading">Booking</h2>
            <BeBookingForm />
          </div>
        </section>
      </main>
    </Layout>
  )
}
