import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/Layout'
import BeSearchForm from '../components/be-forms/BeSearchForm'
import PageHero from '../components/PageHero'

// ── Icons ──────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PinIcon = () => (
  <svg width="18" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" fill="white" />
  </svg>
)

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const MoonSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const WavesSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5s2.5 2 5 2 2.5-2 5-2" />
    <path d="M2 12c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2" />
    <path d="M2 18c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2" />
  </svg>
)

const PeopleSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="9" cy="7" r="4" />
    <path d="M3 20v-1a6 6 0 0 1 6-6v0a6 6 0 0 1 6 6v1" />
    <circle cx="18" cy="8" r="3" />
    <path d="M21 20v-1a4 4 0 0 0-3-3.87" />
  </svg>
)

const CarSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2" />
    <circle cx="8.5" cy="17" r="2.5" />
    <circle cx="17.5" cy="17" r="2.5" />
  </svg>
)

const VideoSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
)

const CameraSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

const YogaSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="12" cy="4.5" r="1.5" />
    <path d="M12 6v5" />
    <path d="M7.5 12l4.5 2.5 4.5-2.5" />
    <path d="M7.5 12L5 16" />
    <path d="M16.5 12L19 16" />
    <path d="M10 22l2-5 2 5" />
  </svg>
)

const LeafSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M17 8C8 10 5.9 16.17 3.82 19.5a2 2 0 0 0 3.06 2.46C7.88 20.32 10.3 18 12 17c2-1 5-2 7-4" />
    <path d="M12 22l.5-5" />
    <path d="M17 8c1-3.93.5-6 .5-6S12 3 9 6" />
  </svg>
)

const ForkSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <line x1="9" y1="2" x2="9" y2="22" />
    <path d="M6 2v6.5a2.5 2.5 0 0 0 5 0V2" />
    <path d="M19 2v4a2 2 0 0 1-2 2h-1v14" />
  </svg>
)

// ── Static data ─────────────────────────────────────────────────────────────

const COACHING_FEATURES = [
  'Dedicated Surf Instructor',
  'Personalized Progress Plan',
  'Private Surf Sessions',
  'Wave Selection Guidance',
  'Video Analysis & Feedback',
  'Professional Surf Photography Available',
  'Surf Theory & Ocean Knowledge',
]

const BOARD_TYPES = [
  { label: 'Long', src: 'https://zeus-surf.com/cdn/shop/articles/choisir-planche-surf-longboard.jpg?v=1710775825&width=1500' },
  { label: 'Short', src: 'https://lmbksurfhouse.com/wp-content/uploads/2023/07/shortboard-vs-longboarding-indonesia-lombok-5.webp' },
  { label: 'Fun', src: 'https://cdn.shopify.com/s/files/1/0770/1364/7695/files/1-funboard.jpg' },
  { label: 'Fish', src: 'https://www.degree33surfboards.com/cdn/shop/articles/09-D33-Email-Banner-021424.jpg?v=1707942718' },
  { label: 'Hybrid', src: 'https://awakeboards.com/cdn/shop/files/AwakeefoilVINGApeformancebundle-1x1-1.jpg?v=1746783076' },
  { label: 'Mini Malibu', src: 'https://images.squarespace-cdn.com/content/v1/5907116ccd0f68a2402bbfc4/1587895209517-6FH8SFPUUIRRXYLRBSCG/Mini+Mal+2.JPG?format=1000w' },
]

const LOCATION_PINS = [
  { name: 'Weligama', desc: 'Beginner Friendly — long sandy beach, gentle rolling waves' },
  { name: 'Midigama', desc: 'Intermediate & Advanced — multiple reef breaks including Coconuts & Ram\'s' },
  { name: 'Ahangama', desc: 'Reef Breaks — Kabalana, Marshmallows and challenging point breaks' },
  { name: 'Mirissa', desc: 'Scenic Surf Sessions — beautiful setting with beach and point options' },
]

const SKILL_LEVELS = [
  {
    label: 'Beginner',
    img: 'https://lapoint.b-cdn.net/image/55GD5qWkwhQVCfU29CaaKp/60d44beee5c0d592d1d111945f575191/Surf-level-1-beginner-surf-course-page.jpg?fm=jpg&fl=progressive&w=1920&q=75',
  },
  {
    label: 'Intermediate',
    img: 'https://overatours.com/wp-content/uploads/2021/10/Surfing-in-Waligama-for-Blog.jpg',
  },
  {
    label: 'Advanced',
    img: 'https://cdn.shopify.com/s/files/1/0585/0209/files/srilanka4.jpg?v=1558724305',
  },
]

const PROCESS_STEPS = [
  { num: 1, label: 'Assessment' },
  { num: 2, label: 'Coaching' },
  { num: 3, label: 'Practice' },
  { num: 4, label: 'Video Review' },
  { num: 5, label: 'Repeat' },
  { num: 6, label: 'Progress' },
]

const VIDEO_POINTS = [
  'Identify mistakes',
  'Understand wave positioning',
  'Improve technique',
  'Track your progress',
  'Build confidence',
]

const PACKAGES = [
  {
    level: 'Beginner',
    subtitle: 'Learn The Right Way From Day One',
    desc: 'Perfect for guests who have never surfed before or are still mastering the basics.',
    features: [
      'Ocean & Water Safety',
      'Reading Waves',
      'Correct Pop-Up Technique',
      'Balance & Board Control',
      'Paddling Techniques',
      'Surf Etiquette',
      'Catching Your First Green Wave',
    ],
    img: 'https://s3.ca-central-1.amazonaws.com/oc-bodhisurfyoga.com/wp-content/uploads/2010/10/27133435/learning-to-surf-on-your-own-hero-image-scaled.jpg',
    accent: '#2d7a3e',
    bg: '#eef5f0',
  },
  {
    level: 'Intermediate',
    subtitle: 'Take Your Surfing To The Next Level',
    desc: 'Designed for surfers who can already catch and ride waves independently.',
    features: [
      'Speed Generation',
      'Frontside & Backside Riding',
      'Wave Selection',
      'Improved Positioning',
      'Bottom Turns',
      'Top Turns',
      'Building Consistency',
    ],
    img: 'https://images.squarespace-cdn.com/content/v1/65666546dcec1232ffb9fd29/34a30ad5-9384-48ee-8fb7-fcf11d530c22/surf-synergy-sup-class-in-costa-rica-ocean.jpg',
    accent: '#1a4a7a',
    bg: '#eef3f8',
  },
  {
    level: 'Advanced',
    subtitle: 'Refine Every Detail',
    desc: 'For experienced surfers looking to improve performance and confidence.',
    features: [
      'Advanced Wave Reading',
      'Powerful Turns',
      'Barrel Positioning',
      'Timing & Flow',
      'Performance Analysis',
      'Reef Break Navigation',
      'Surf Strategy',
    ],
    img: 'https://stokedsurfadventures.com/wp-content/smush-webp/2025/06/villa-onu-mentawai-island-surf-trip-mentawai-surf-resort-stoked-surf-adventures-luxury-surf-trip-2-700x500.jpg.webp',
    accent: '#7a4a1a',
    bg: '#f8f2e8',
  },
]

const BUILD_ICON_ITEMS = [
  { label: 'Number of Nights', svg: <MoonSvg /> },
  { label: 'Surf Level', svg: <WavesSvg /> },
  { label: 'Private or Group Coaching', svg: <PeopleSvg /> },
  { label: 'Airport Transfers', svg: <CarSvg /> },
  { label: 'Video Analysis Sessions', svg: <VideoSvg /> },
  { label: 'Photography Package', svg: <CameraSvg /> },
  { label: 'Yoga Add-On', svg: <YogaSvg /> },
  { label: 'Wellness Add-On', svg: <LeafSvg /> },
  { label: 'Meal Plan', svg: <ForkSvg /> },
]

const STATS = [
  {
    title: 'Expert Local Coaches',
    desc: 'Certified & experienced surf instructors',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    title: 'Best Surf Spots',
    desc: 'Handpicked spots for every level, every day',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Progress Faster',
    desc: 'Personalized coaching, video analysis & feedback',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    title: 'More Than Surfing',
    desc: 'Wellness, good food & relaxation included',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Unforgettable Experience',
    desc: 'Create memories that last a lifetime',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

const BLANK_INQUIRY = {
  fullName: '', country: '', email: '', whatsapp: '',
  arrivalDate: '', departureDate: '', surfLevel: '',
  numGuests: '', duration: '', lessonType: '', notes: '',
}

// ── Page component ──────────────────────────────────────────────────────────

export default function SurfRetreatPage({ surfBreaks }) {
  const [inquiry, setInquiry] = useState(BLANK_INQUIRY)
  const [formStatus, setFormStatus] = useState('idle')

  const setField = (e) => {
    const { name, value } = e.target
    setInquiry(prev => ({ ...prev, [name]: value }))
  }

  const handleInquiry = async (e) => {
    e.preventDefault()
    if (!inquiry.fullName || !inquiry.email) return
    setFormStatus('busy')
    try {
      const res = await fetch('/api/surf-retreat-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry),
      })
      if (!res.ok) throw new Error()
      setFormStatus('success')
      setInquiry(BLANK_INQUIRY)
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <Layout>
      <Head>
        <title>Villa Hillcrest | Surf Retreat</title>
        <meta
          name="description"
          content="Book a personalised surf retreat at Villa Hillcrest, Sri Lanka. Private 1-on-1 coaching, the best surf breaks, custom packages and board rentals all included."
        />
        <meta name="theme-color" content="#2d7a3e" />
        <link rel="canonical" href="https://villahillcrest.com/surf-retreat" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Villa Hillcrest | Surf Retreat" />
        <meta property="og:description" content="Book a personalised surf retreat at Villa Hillcrest, Sri Lanka. Private coaching, curated surf breaks and customisable packages." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villahillcrest.com/surf-retreat" />
        <meta property="og:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <meta property="og:site_name" content="Villa Hillcrest" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Hillcrest | Surf Retreat" />
        <meta name="twitter:description" content="Book a personalised surf retreat at Villa Hillcrest, Sri Lanka." />
        <meta name="twitter:image" content="https://villahillcrest.com/images/logo/logo-og.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Surf Retreat at Villa Hillcrest Sri Lanka',
              mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://villahillcrest.com/surf-retreat' },
              url: 'https://villahillcrest.com/surf-retreat',
            }),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&family=Montserrat:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="surf-retreat-page">
        <PageHero title="Surf Retreat" className="surf-retreat-hero" ariaLabel="Surf retreat hero" />

        <BeSearchForm />

        <nav aria-label="Related links" className="villa-related-nav">
          <span>Explore more:</span>
          <a href="/surfing" aria-label="Surfing in Sri Lanka">Surfing</a>
          <a href="/yoga" aria-label="Yoga retreats">Yoga</a>
          <a href="/villa" aria-label="Villa rooms and amenities">Villa</a>
          <a href="/dining" aria-label="Dining experiences">Dining</a>
          <a href="/packages" aria-label="Packages">Packages</a>
          <a href="/contact-us" aria-label="Contact us">Contact Us</a>
        </nav>

        {/* ── Intro Banner ── */}
        <section className="srt-intro-banner" aria-label="Surf retreat overview">
          <div className="srt-intro-content">
            <p className="srt-eyebrow">Surf Retreat</p>
            <h2>
              Learn.<br />
              Progress.<br />
              Master.
            </h2>
            <p>
              Whether you&apos;re standing on a surfboard for the first time or working to break through a
              performance plateau, our retreat is designed around you. Private coaching, curated surf
              spots, and a schedule built around your goals.
            </p>
            <a href="/booking" className="srt-coaching-btn" aria-label="Book your customised surf retreat">
              <CalendarIcon />
              Book Your Customized Surf Retreat
            </a>
          </div>
          <div className="srt-intro-image">
            <img
              src="https://images.ctfassets.net/xhzuh2up4xai/569n0IwU2T1tWnhlSlp9LX/30eb406352eabb3e775bf549a4382f5c/surfing_sri_lanka_wave.png"
              alt="Surfer riding a wave on Sri Lanka's south coast"
              loading="eager"
            />
          </div>
        </section>

        {/* ── Location Section ── */}
        <section className="srt-location-section" aria-labelledby="srt-location-heading">
          <div className="container srt-location-inner">
            <div className="srt-location-text">
              <p className="srt-eyebrow">Location Matters</p>
              <h2 id="srt-location-heading">
                Perfectly Positioned Between Sri Lanka&apos;s Best Waves
              </h2>
              <ul className="srt-location-pins">
                {LOCATION_PINS.map((pin) => (
                  <li key={pin.name}>
                    <span className="srt-pin-icon" aria-hidden="true">
                      <PinIcon />
                    </span>
                    <div>
                      <strong>{pin.name}</strong>
                      <span>{pin.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <a href="#srt-breaks-section" className="srt-outline-btn">View Surf Breaks</a>
            </div>
            <div className="srt-location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63406.5!2d80.4294!3d5.9751!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae13887b6c91f6b%3A0xd4b5b39e48daa2b4!2sWeligama!5e1!3m2!1sen!2slk!4v1732123456789"
                width="100%"
                height="420"
                style={{ border: 0, borderRadius: '4px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sri Lanka south coast surf spots — Weligama, Midigama, Ahangama, Mirissa"
              />
            </div>
          </div>
        </section>

        {/* ── Skill Levels ── */}
        <section className="srt-skill-levels" aria-labelledby="srt-levels-heading">
          <div className="container">
            <div className="srt-section-header">
              <p className="srt-eyebrow">Find Your Surf Level</p>
              <h2 id="srt-levels-heading">Every Surfer Starts Somewhere</h2>
            </div>
            <div className="srt-level-cards">
              {SKILL_LEVELS.map((level) => (
                <div key={level.label} className="srt-level-card">
                  <img src={level.img} alt={`${level.label} surfing at Villa Hillcrest`} loading="lazy" />
                  <div className="srt-level-overlay">
                    <span>{level.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="srt-level-cta">
              <a href="/booking" className="srt-coaching-btn" aria-label="Book a surf retreat">
                <CalendarIcon />
                Book Now
              </a>
            </div>
          </div>
        </section>

        {/* ── Coaching Process + Video Analysis ── */}
        <section className="srt-process-section" aria-label="Coaching process and video analysis">
          <div className="srt-process-left">
            <div className="srt-process-left-inner">
              <p className="srt-eyebrow-light">How We Coach</p>
              <h2>Progress Through Understanding</h2>
              <div className="srt-steps-grid">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.num} className="srt-step-item">
                    <div className="srt-step-num" aria-hidden="true">{step.num}</div>
                    <span>{step.label}</span>
                  </div>
                ))}
              </div>
              <a href="/booking" className="srt-outline-btn-light" aria-label="Book a coaching session">
                Book A Coaching Session
              </a>
            </div>
          </div>
          <div className="srt-process-right">
            <div className="srt-process-right-inner">
              <p className="srt-eyebrow">Surfing Masters</p>
              <h2>See What Others Miss</h2>
              <div className="srt-video-img">
                <img
                  src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&q=80&auto=format&fit=crop"
                  alt="Surf coach reviewing video analysis with a student"
                  loading="lazy"
                />
              </div>
              <ul className="srt-video-points">
                {VIDEO_POINTS.map((pt) => (
                  <li key={pt}>
                    <CheckIcon />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <a href="/booking" className="srt-coaching-btn" aria-label="Book now">
                <CalendarIcon />
                Book Now
              </a>
            </div>
          </div>
        </section>

        {/* ── Retreat Packages ── */}
        <section className="srt-packages-section" aria-labelledby="srt-packages-heading">
          <div className="container">
            <div className="srt-section-header">
              <p className="srt-eyebrow">Surf Retreat Packages</p>
              <h2 id="srt-packages-heading">Choose Your Retreat</h2>
            </div>
            <div className="srt-packages-grid">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.level}
                  className="srt-package-card"
                  style={{ '--pkg-accent': pkg.accent, '--pkg-bg': pkg.bg }}
                >
                  <div className="srt-pkg-header">
                    <h3>{pkg.level} Surf Retreat</h3>
                    <p className="srt-pkg-subtitle">{pkg.subtitle}</p>
                  </div>
                  <p className="srt-pkg-desc">{pkg.desc}</p>
                  <ul className="srt-pkg-features">
                    {pkg.features.map((f) => (
                      <li key={f}>
                        <CheckIcon />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="srt-pkg-img">
                    <img src={pkg.img} alt={`${pkg.level} surf retreat at Villa Hillcrest Sri Lanka`} loading="lazy" />
                  </div>
                  <p className="srt-pkg-caption">Action photos included</p>
                  <a href="/booking" className="srt-pkg-cta" aria-label={`Customize your ${pkg.level} surf retreat`}>
                    Customize Your Retreat
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Surf Break Guide (DB-driven) ── */}
        <section id="srt-breaks-section" className="srt-breaks" aria-labelledby="srt-breaks-heading">
          <div className="container">
            <header className="srt-breaks-header">
              <p className="srt-eyebrow">Surf Break Guide</p>
              <h2 id="srt-breaks-heading">Discover Sri Lanka&apos;s Best Waves</h2>
              <p>
                From beginner-friendly beach breaks to advanced reef breaks, our team will guide you
                to the perfect wave based on your experience level and daily conditions.
              </p>
            </header>

            {surfBreaks.map((loc) => (
              <div key={loc.name} className="srt-location-block">
                <div className="srt-location-info">
                  <div className="srt-location-label">
                    <span className="srt-location-pin" aria-hidden="true"><PinIcon /></span>
                    <span className="srt-location-name">{loc.name}</span>
                  </div>
                  <p className="srt-location-tagline">{loc.tagline}</p>
                  <ul className="srt-break-list" aria-label={`${loc.name} surf breaks`}>
                    {loc.breaks.map((b) => (
                      <li key={b.name}>
                        <strong>{b.name}</strong>
                        {' '}
                        <span className="srt-break-level">— {b.level}</span>
                        {b.note && <><br /><span className="srt-break-note">{b.note}</span></>}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="srt-location-photos">
                  <div className="srt-photos-grid">
                    {loc.photos.map((photo) => (
                      <div key={photo.label} className="srt-photo-item">
                        <img src={photo.src} alt={photo.alt} loading="lazy" />
                        <p>{photo.label}</p>
                        <span>{photo.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Surfboard Rentals ── */}
        <section className="srt-rentals" aria-labelledby="srt-rentals-heading">
          <div className="container srt-rentals-inner">
            <div className="srt-rentals-boards-img">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80&auto=format&fit=crop"
                alt="Collection of surfboards available for rental at Villa Hillcrest"
                loading="lazy"
              />
            </div>
            <div className="srt-rentals-features">
              <h3 id="srt-rentals-heading">Surf Board Rentals</h3>
              <ul aria-label="Rental features">
                {['Regular / All-day types', 'Branded Surf Boards', 'Surf Board Insurance'].map((item) => (
                  <li key={item} className="srt-rentals-feature-item">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="srt-rentals-types">
              <p className="srt-eyebrow srt-board-types-label">Surf Board Types</p>
              <div className="srt-board-types-grid">
                {BOARD_TYPES.map((board) => (
                  <div key={board.label} className="srt-board-type">
                    <img src={board.src} alt={`${board.label} surfboard`} loading="lazy" />
                    <p>{board.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Build Your Own — icon grid ── */}
        <section className="srt-build-icons-section" aria-labelledby="srt-build-icons-heading">
          <div className="container srt-build-icons-inner">
            <p className="srt-eyebrow">Build Your Own Surf Retreat</p>
            <h2 id="srt-build-icons-heading">Tailored To Your Goals</h2>
            <div className="srt-icons-grid">
              {BUILD_ICON_ITEMS.map((item) => (
                <div key={item.label} className="srt-icon-item">
                  <div className="srt-icon-circle" aria-hidden="true">{item.svg}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
            <div className="srt-build-icons-cta">
              <a href="#srt-booking" className="srt-coaching-btn" aria-label="Build your own surf retreat">
                <CalendarIcon />
                Start Building Your Retreat
              </a>
            </div>
          </div>
        </section>

        {/* ── Booking Inquiry Form ── */}
        <section id="srt-booking" className="srt-booking-section" aria-labelledby="srt-booking-heading">
          <div className="srt-booking-left">
            <p className="srt-eyebrow-gold">Ready To Start?</p>
            <h2 id="srt-booking-heading">
              Let&apos;s Create Your Perfect Surf Retreat
            </h2>
            <p>
              Tell us about your goals and we&apos;ll put together a personalized retreat package
              just for you. We respond within 24 hours.
            </p>
            <a href="/contact-us" className="srt-outline-btn-light" aria-label="Go to contact page">
              Contact Us Directly
            </a>
          </div>
          <div className="srt-booking-right">
            <p className="srt-eyebrow">Book Your Customized Surf Retreat</p>
            {formStatus === 'success' ? (
              <div className="srt-form-success">
                <h3>Thank You!</h3>
                <p>
                  We&apos;ve received your inquiry and will be in touch shortly to create your
                  personalized retreat plan.
                </p>
                <button onClick={() => setFormStatus('idle')}>Send Another Inquiry</button>
              </div>
            ) : (
              <form className="srt-inquiry-form" onSubmit={handleInquiry}>
                <div className="srt-form-grid">
                  <div>
                    <label htmlFor="srt-fullName">Full Name *</label>
                    <input
                      id="srt-fullName"
                      name="fullName"
                      placeholder="Full Name"
                      value={inquiry.fullName}
                      onChange={setField}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="srt-country">Country</label>
                    <input
                      id="srt-country"
                      name="country"
                      placeholder="Country"
                      value={inquiry.country}
                      onChange={setField}
                    />
                  </div>
                  <div>
                    <label htmlFor="srt-email">Email Address *</label>
                    <input
                      id="srt-email"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={inquiry.email}
                      onChange={setField}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="srt-whatsapp">WhatsApp Number</label>
                    <input
                      id="srt-whatsapp"
                      name="whatsapp"
                      placeholder="WhatsApp Number"
                      value={inquiry.whatsapp}
                      onChange={setField}
                    />
                  </div>
                  <div>
                    <label htmlFor="srt-arrival">Arrival Date</label>
                    <input
                      id="srt-arrival"
                      type="date"
                      name="arrivalDate"
                      value={inquiry.arrivalDate}
                      onChange={setField}
                    />
                  </div>
                  <div>
                    <label htmlFor="srt-departure">Departure Date</label>
                    <input
                      id="srt-departure"
                      type="date"
                      name="departureDate"
                      value={inquiry.departureDate}
                      onChange={setField}
                    />
                  </div>
                  <div>
                    <label htmlFor="srt-surfLevel">Surf Level</label>
                    <select id="srt-surfLevel" name="surfLevel" value={inquiry.surfLevel} onChange={setField}>
                      <option value="">Select Surf Level</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="srt-numGuests">Number of Guests</label>
                    <select id="srt-numGuests" name="numGuests" value={inquiry.numGuests} onChange={setField}>
                      <option value="">Select Guests</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3–4</option>
                      <option>5+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="srt-duration">Retreat Duration</label>
                    <select id="srt-duration" name="duration" value={inquiry.duration} onChange={setField}>
                      <option value="">Select Duration</option>
                      <option>3 Nights</option>
                      <option>5 Nights</option>
                      <option>7 Nights</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="srt-lessonType">Private or Group Lessons</label>
                    <select id="srt-lessonType" name="lessonType" value={inquiry.lessonType} onChange={setField}>
                      <option value="">Select Lesson Type</option>
                      <option>Private (1-on-1)</option>
                      <option>Small Group</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                </div>
                <div className="srt-form-notes">
                  <label htmlFor="srt-notes">Additional Notes (Optional)</label>
                  <textarea
                    id="srt-notes"
                    name="notes"
                    placeholder="Tell us anything else about your goals, experience or questions..."
                    rows={4}
                    value={inquiry.notes}
                    onChange={setField}
                  />
                </div>
                {formStatus === 'error' && (
                  <p className="srt-form-error">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  className="srt-form-submit"
                  disabled={formStatus === 'busy'}
                >
                  {formStatus === 'busy' ? 'Sending…' : 'Submit & Get A Personalized Quote'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <div className="srt-stats-bar" role="region" aria-label="Why choose Villa Hillcrest surf retreat">
          <div className="container srt-stats-inner">
            {STATS.map((stat) => (
              <div key={stat.title} className="srt-stat-item">
                <div className="srt-stat-icon">{stat.icon}</div>
                <div className="srt-stat-text">
                  <h4>{stat.title}</h4>
                  <p>{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps() {
  try {
    const { listEnabledSurfBreaks } = await import('../lib/mysql')
    const surfBreaks = await listEnabledSurfBreaks()
    return {
      props: { surfBreaks: JSON.parse(JSON.stringify(surfBreaks)) },
      revalidate: 60,
    }
  } catch {
    return {
      props: { surfBreaks: [] },
      revalidate: 60,
    }
  }
}
