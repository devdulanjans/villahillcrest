import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const heroImageCache = new Map()

export default function PageHero({ title, imageUrl, className = '', ariaLabel, pageKey }) {
  const router = useRouter()
  const [overrideConfig, setOverrideConfig] = useState({
    imageUrl: '',
    focalX: 50,
    focalY: 50,
  })

  const resolvedPageKey = String(pageKey || router.pathname || '').trim()

  useEffect(() => {
    let isMounted = true

    const loadHeroOverride = async () => {
      if (!resolvedPageKey) {
        setOverrideConfig({ imageUrl: '', focalX: 50, focalY: 50 })
        return
      }

      if (heroImageCache.has(resolvedPageKey)) {
        const cached = heroImageCache.get(resolvedPageKey) || {}
        setOverrideConfig({
          imageUrl: String(cached.imageUrl || ''),
          focalX: Number.isFinite(Number(cached.focalX)) ? Number(cached.focalX) : 50,
          focalY: Number.isFinite(Number(cached.focalY)) ? Number(cached.focalY) : 50,
        })
        return
      }

      try {
        const res = await fetch(`/api/page-hero-images?pageKey=${encodeURIComponent(resolvedPageKey)}`)
        const data = await res.json()

        if (!isMounted || !res.ok) return

        const nextConfig = {
          imageUrl: String(data?.item?.imageUrl || '').trim(),
          focalX: Number.isFinite(Number(data?.item?.focalX)) ? Number(data.item.focalX) : 50,
          focalY: Number.isFinite(Number(data?.item?.focalY)) ? Number(data.item.focalY) : 50,
        }

        heroImageCache.set(resolvedPageKey, nextConfig)
        setOverrideConfig(nextConfig)
      } catch {
        if (!isMounted) return
        setOverrideConfig({ imageUrl: '', focalX: 50, focalY: 50 })
      }
    }

    loadHeroOverride()

    return () => {
      isMounted = false
    }
  }, [resolvedPageKey])

  const finalImageUrl = String(overrideConfig.imageUrl || imageUrl || '').trim()
  const finalFocalX = Number.isFinite(Number(overrideConfig.focalX)) ? Number(overrideConfig.focalX) : 50
  const finalFocalY = Number.isFinite(Number(overrideConfig.focalY)) ? Number(overrideConfig.focalY) : 50

  const heroStyle = finalImageUrl
    ? {
        backgroundImage: `linear-gradient(rgba(24, 30, 36, 0.34), rgba(24, 30, 36, 0.34)), url('${finalImageUrl}')`,
        backgroundPosition: `${finalFocalX}% ${finalFocalY}%`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    : undefined

  return (
    <section className={`page-hero ${className}`.trim()} style={heroStyle} aria-label={ariaLabel || `${title} hero`}>
      <div className="container page-hero-overlay">
        <h1>{title}</h1>
      </div>
    </section>
  )
}
