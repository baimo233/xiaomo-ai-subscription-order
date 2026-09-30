import { useEffect, useRef } from 'react'
export default function Reveal({ children, delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    element.classList.add('reveal-ready')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.classList.add('reveal-visible'); observer.disconnect() }
    }, { threshold: 0.08 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className="reveal" style={{ '--reveal-delay': `${delay}ms` }}>{children}</div>
}
