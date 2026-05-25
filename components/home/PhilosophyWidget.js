const iconProps = {
  className: 'hc-philo-svg',
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2.8',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true'
}

const iconMap = {
  leaf: (
    <svg {...iconProps}>
      <path d="M50 14C33 14 20 23 16 39c-2 8 3 13 11 11 16-4 25-17 25-34z" />
      <path d="M20 44c8-10 16-16 24-20" />
    </svg>
  ),
  hands: (
    <svg {...iconProps}>
      <path d="M12 34l9-7 8 8-9 8-8-9z" />
      <path d="M52 34l-9-7-8 8 9 8 8-9z" />
      <path d="M21 30l6-6M43 30l-6-6" />
    </svg>
  ),
  bowl: (
    <svg {...iconProps}>
      <path d="M12 34h40c0 10-8 18-20 18s-20-8-20-18z" />
      <path d="M32 18v10M24 20l5 8M40 20l-5 8" />
    </svg>
  ),
  home: (
    <svg {...iconProps}>
      <path d="M12 30l20-16 20 16" />
      <path d="M18 28v22h28V28" />
      <path d="M28 50V38h8v12" />
    </svg>
  ),
  compass: (
    <svg {...iconProps}>
      <circle cx="32" cy="32" r="22" />
      <path d="M23 41l8-18 10 10-18 8z" />
    </svg>
  ),
  lotus: (
    <svg {...iconProps}>
      <path d="M12 40c6-1 10-5 12-11 2 6 6 10 12 11" />
      <path d="M22 40c2-6 2-12 0-18M42 40c-2-6-2-12 0-18" />
      <path d="M20 46h24" />
    </svg>
  ),
  people: (
    <svg {...iconProps}>
      <circle cx="22" cy="24" r="5" />
      <circle cx="42" cy="24" r="5" />
      <path d="M13 44c2-7 7-11 9-11s7 4 9 11" />
      <path d="M33 44c2-7 7-11 9-11s7 4 9 11" />
    </svg>
  ),
  bell: (
    <svg {...iconProps}>
      <path d="M20 45h24l-3-6V29c0-6-4-11-9-12v-3h-2v3c-5 1-9 6-9 12v10l-1 6z" />
      <path d="M28 50c1 2 2 3 4 3s3-1 4-3" />
    </svg>
  )
}

export default function PhilosophyWidget() {
  const philosophyItems = [
    { icon: 'leaf', title: 'Nature first design', detail: 'Spaces shaped by the tropical landscape.' },
    { icon: 'hands', title: 'Conscious hospitality', detail: 'Warm, thoughtful service with local heart.' },
    { icon: 'bowl', title: 'Local food sourcing', detail: 'Seasonal ingredients from nearby producers.' },
    { icon: 'home', title: 'Slow living spaces', detail: 'Calm corners to rest, breathe, and reset.' },
    { icon: 'compass', title: 'Meaningful adventures', detail: 'Curated experiences with authentic stories.' },
    { icon: 'lotus', title: 'Wellness at your pace', detail: 'Yoga, movement, and stillness when you need it.' },
    { icon: 'people', title: 'Community partnerships', detail: 'Built together with local makers and hosts.' },
    { icon: 'bell', title: 'Personalized stays', detail: 'Every stay tailored around your travel style.' }
  ]

  return (
    <section className="hc-philosophy hc-reveal" id="philosophy" aria-labelledby="philosophy-heading">
      <div className="container">
        <h2 id="philosophy-heading">Our philosophy</h2>
        <div className="hc-philosophy-grid" role="list">
          {philosophyItems.map(item => (
            <article className="hc-philo-card" role="listitem" tabIndex={0} key={item.title}>
              <div className="hc-philo-card-inner">
                <div className="hc-philo-face hc-philo-front">
                  <span className="hc-philo-icon" aria-hidden="true">{iconMap[item.icon]}</span>
                  <h3>{item.title}</h3>
                </div>
                <div className="hc-philo-face hc-philo-back">
                  <span className="hc-philo-icon hc-philo-icon-back" aria-hidden="true">{iconMap[item.icon]}</span>
                  <p>{item.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
