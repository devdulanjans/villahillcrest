import Head from 'next/head'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Availability from '../components/Availability'
import Services from '../components/Services'
import FeatureSections from '../components/FeatureSections'
import BeSearchForm from '../components/be-forms/BeSearchForm'

export default function AboutUs() {
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

        {/* Internal links for SEO and navigation */}
        <nav aria-label="Related links" style={{ margin: '32px 0', textAlign: 'center' }}>
          <span style={{ fontWeight: 600, marginRight: 8 }}>Explore more:</span>
          <a href="/villa" aria-label="Villa rooms and amenities" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Villa</a>
          <a href="/dining" aria-label="Dining experiences" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Dining</a>
          <a href="/yoga" aria-label="Yoga retreats" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Yoga</a>
          <a href="/foods" aria-label="Foods and menu" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Foods</a>
          <a href="/explore" aria-label="Explore local experiences" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Explore</a>
          <a href="/packages" aria-label="Packages" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Packages</a>
          <a href="/contact-us" aria-label="Contact us" style={{ margin: '0 10px', color: '#2d7a3e', textDecoration: 'underline' }}>Contact Us</a>
        </nav>
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
        <title>Villa Hillcrest | About Us</title>
        <meta name="description" content="Learn about Villa Hillcrest, our luxury boutique villa in Sri Lanka and the experiences we offer for an unforgettable tropical escape." />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/about-us" />
        <meta name="robots" content="index, follow" />
        {/* Open Graph tags */}
        <meta property="og:title" content="Villa Hillcrest | About Us" />
        <meta property="og:description" content="Learn about Villa Hillcrest, our luxury boutique villa in Sri Lanka and the experiences we offer for an unforgettable tropical escape." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villahillcrest.com/about-us" />
        <meta property="og:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Hillcrest | About Us" />
        <meta name="twitter:description" content="Learn about Villa Hillcrest, our luxury boutique villa in Sri Lanka and the experiences we offer for an unforgettable tropical escape." />
        <meta name="twitter:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Villa Hillcrest",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://villahillcrest.com/about-us"
          },
          "url": "https://villahillcrest.com/about-us"
        }) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Montserrat:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <Hero />
        <BeSearchForm />
        <Intro />
        {/* <Availability />
        <Services />
        <FeatureSections /> */}
      </main>
    </Layout>
  )
}
