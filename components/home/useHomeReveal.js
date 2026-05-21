import { useEffect } from 'react'

export default function useHomeReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.2 }
    )

    const revealTargets = document.querySelectorAll('.hc-reveal')
    revealTargets.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
