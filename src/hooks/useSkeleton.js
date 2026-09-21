import { useEffect, useState } from 'react'

export function useSkeleton(duration = 720, resetKey = 'default') {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setLoading(false), reduced ? 120 : duration)
    return () => window.clearTimeout(timer)
  }, [duration, resetKey])

  return loading
}
