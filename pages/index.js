import Head from 'next/head'
import Layout from '../components/Layout'
import HeroWidget from '../components/home/HeroWidget'
import IntroWidget from '../components/home/IntroWidget'
import GalleryIntroWidget from '../components/home/GalleryIntroWidget'
import AwardsWidget from '../components/home/AwardsWidget'
import StoryWidget from '../components/home/StoryWidget'
import ExperiencesWidget from '../components/home/ExperiencesWidget'
import CafeWidget from '../components/home/CafeWidget'
import PhilosophyWidget from '../components/home/PhilosophyWidget'
import RoomsWidget from '../components/home/RoomsWidget'
import CommunityWidget from '../components/home/CommunityWidget'
import JourneyWidget from '../components/home/JourneyWidget'
import ActivitiesWidget from '../components/home/ActivitiesWidget'
import MapWidget from '../components/home/MapWidget'
import useHomeReveal from '../components/home/useHomeReveal'
import Services from '../components/Services'
import OfferPopup from '../components/home/OfferPopup'

export default function Home() {
  useHomeReveal()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Villa Hillcrest",
    "image": "https://villahillcrest.com/images/logo.png",
    "description": "Villa Hillcrest is a luxury boutique villa in Sri Lanka, offering panoramic views, elegant rooms, and a tranquil escape surrounded by nature.",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://villahillcrest.com/"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Southern Province",
      "addressCountry": "LK"
    },
    "url": "https://villahillcrest.com/"
  }

  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Luxury Boutique Villa in Sri Lanka</title>
        <meta name="description" content="Villa Hillcrest is a luxury boutique villa in Sri Lanka with panoramic views, elegant rooms, wellness activities, and curated dining. Book your stay for an unforgettable tropical escape." />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Montserrat:wght@300;400;500&family=Cormorant+Garamond:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <main className="hc-home">
        <OfferPopup />
        <HeroWidget />
        {/* <IntroWidget /> */}
        <Services/>
        <GalleryIntroWidget />
        {/* <AwardsWidget /> */}
        <StoryWidget />
        <ExperiencesWidget />
        <CafeWidget />
        <PhilosophyWidget />
        <RoomsWidget />
        <CommunityWidget />
        <JourneyWidget />
        <ActivitiesWidget />
        <MapWidget />
      </main>
    </Layout>
  )
}
