import Head from 'next/head'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import ContactUsIntro from '../components/ContactUsIntro'
import ContactWidget from '../components/ContactWidget'
import Availability from '../components/Availability'

export default function ContactUs() {
  useEffect(() => {
    // SCROLL ANIMATION
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.2 })
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))

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
        <title>Villa Hillcrest | Contact Us</title>
        <meta name="description" content="Contact Villa Hillcrest for bookings, availability, and guest inquiries about your luxury villa stay in Sri Lanka." />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://yourdomain.com/contact-us" />
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Montserrat:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <Hero />
        <ContactUsIntro />
        <ContactWidget />
        <Availability />

        {/* <Services />
        <FeatureSections /> */}
      </main>
    </Layout>
  )
}
