import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const PARTICLE_LIMIT = 80

export default function PointerAura() {
  const ref = useRef(null)
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const canvas = ref.current
    const context = canvas.getContext('2d')
    if (!context) return
    let particles = [], frame = 0, lastTime = 0, previous = null
    let width = 0, height = 0, colors = []

    function updateColors() {
      const style = getComputedStyle(document.documentElement)
      colors = ['--aura-primary', '--aura-secondary'].map(name => style.getPropertyValue(name).trim())
    }
    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    function emit(x, y, burst = false) {
      const angle = Math.random() * Math.PI * 2
      const speed = burst ? 24 + Math.random() * 42 : 8 + Math.random() * 18
      particles.push({
        x: x + (Math.random() - .5) * 12, y: y + (Math.random() - .5) * 12,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 10,
        radius: 1.1 + Math.random() * 1.7, age: 0, life: .65 + Math.random() * .6,
        color: colors[Math.random() < .55 ? 0 : 1], phase: Math.random() * Math.PI * 2,
      })
      if (particles.length > PARTICLE_LIMIT) particles.shift()
    }
    function draw(now) {
      const delta = Math.min((now - lastTime) / 1000, .04)
      lastTime = now
      context.clearRect(0, 0, width, height)
      particles = particles.filter(particle => particle.age < particle.life)
      for (const particle of particles) {
        particle.age += delta
        particle.x += particle.vx * delta
        particle.y += particle.vy * delta
        const progress = Math.min(particle.age / particle.life, 1)
        const fade = (1 - progress) ** 1.5
        const radius = particle.radius * (1 - progress * .55)
        // A white pinprick inside a colored bloom reads as light rather than a flat dot.
        const bloom = context.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, radius * 5)
        bloom.addColorStop(0, particle.color)
        bloom.addColorStop(.25, particle.color + '80')
        bloom.addColorStop(1, particle.color + '00')
        context.globalAlpha = fade * (.75 + Math.sin(particle.age * 14 + particle.phase) * .2)
        context.fillStyle = bloom
        context.beginPath()
        context.arc(particle.x, particle.y, radius * 5, 0, Math.PI * 2)
        context.fill()
        context.fillStyle = particle.color
        context.beginPath()
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2)
        context.fill()
        context.fillStyle = '#fff'
        context.beginPath()
        context.arc(particle.x - radius * .15, particle.y - radius * .15, radius * .5, 0, Math.PI * 2)
        context.fill()
      }
      context.globalAlpha = 1
      frame = particles.length ? requestAnimationFrame(draw) : 0
    }
    function start() {
      if (!frame) { lastTime = performance.now(); frame = requestAnimationFrame(draw) }
    }
    function move(event) {
      if (!media.matches || event.pointerType !== 'mouse') return
      const x = event.clientX, y = event.clientY
      const distance = previous ? Math.hypot(x - previous.x, y - previous.y) : 0
      // Interpolate continuous paths, but skip teleports into the viewport.
      const count = Math.min(20, Math.max(1, Math.floor(distance / 5)))
      for (let index = 1; index <= count; index++) {
        const t = index / count
        emit(previous && distance < 180 ? previous.x + (x - previous.x) * t : x,
          previous && distance < 180 ? previous.y + (y - previous.y) * t : y)
      }
      previous = { x, y }
      start()
    }
    function down(event) {
      if (!media.matches || event.pointerType !== 'mouse') return
      for (let index = 0; index < 14; index++) emit(event.clientX, event.clientY, true)
      start()
    }
    function reset() {
      cancelAnimationFrame(frame)
      frame = 0
      particles = []
      previous = null
      context.clearRect(0, 0, width, height)
    }
    function out(event) { if (!event.relatedTarget) previous = null }
    function visibility() { if (document.hidden) reset() }
    const observer = new MutationObserver(updateColors)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-palette', 'class'] })
    updateColors()
    resize()
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerdown', down, { passive: true })
    document.addEventListener('pointerout', out, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('resize', resize)
    window.addEventListener('blur', reset)
    media.addEventListener('change', reset)
    return () => {
      reset()
      observer.disconnect()
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerdown', down)
      document.removeEventListener('pointerout', out)
      document.removeEventListener('visibilitychange', visibility)
      window.removeEventListener('resize', resize)
      window.removeEventListener('blur', reset)
      media.removeEventListener('change', reset)
    }
  }, [])
  return createPortal(<canvas ref={ref} className="pointer-particles" aria-hidden="true" />, document.body)
}
