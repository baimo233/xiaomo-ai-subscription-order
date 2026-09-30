import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function BottomParticleGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const context = canvas.getContext('2d')
    if (!context) return
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const height = 36
    let width = 0, pixels = [], colors = [], frame = 0, lastTime = 0
    let targetX = window.innerWidth / 2, x = targetX, targetStrength = 0, strength = 0

    function updateColors() {
      const style = getComputedStyle(document.documentElement)
      colors = ['--aura-primary', '--aura-secondary'].map(name => style.getPropertyValue(name).trim())
      if (!motion.matches) draw(0)
    }
    function resize() {
      width = window.innerWidth
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const columns = Math.min(200, Math.ceil(width / 7))
      const step = width / columns
      pixels = []
      for (let column = 0; column < columns; column++) {
        for (let row = 0; row < 5; row++) {
          if (Math.random() > .88 - row * .13) continue
          pixels.push({ x: (column + .5) * step, y: height - 3 - row * 6,
            size: Math.random() < .18 ? 3 : 1.5 + Math.random() * .8,
            phase: Math.random() * Math.PI * 2, speed: .65 + Math.random() * 1.1,
            tint: Math.random() < .6 ? 1 : 0, row })
        }
      }
      x = Math.min(x, width)
      targetX = Math.min(targetX, width)
      draw(0)
    }
    function draw(time) {
      context.clearRect(0, 0, width, height)
      const band = context.createLinearGradient(0, 0, 0, height)
      band.addColorStop(0, colors[1] + '00')
      band.addColorStop(.55, colors[1] + '08')
      band.addColorStop(1, colors[1] + '30')
      context.fillStyle = band
      context.fillRect(0, 0, width, height)
      // A low horizontal bloom lights the pixels from underneath.
      const radius = Math.min(190, Math.max(100, width * .25))
      const glow = context.createRadialGradient(x, height + 12, 0, x, height + 12, radius)
      glow.addColorStop(0, colors[1] + '70')
      glow.addColorStop(.45, colors[0] + '32')
      glow.addColorStop(1, colors[0] + '00')
      context.globalAlpha = .2 + strength * .65
      context.fillStyle = glow
      context.fillRect(0, 0, width, height)
      for (const pixel of pixels) {
        const twinkle = (.5 + Math.sin(time * pixel.speed + pixel.phase) * .5) ** 3
        const nearby = Math.exp(-(((pixel.x - x) / (radius * .6)) ** 2)) * strength
        const fade = 1 - pixel.row * .16
        context.globalAlpha = Math.min(.9, (.08 + twinkle * .48 + nearby * .4) * fade)
        context.fillStyle = colors[pixel.tint]
        context.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
        if (twinkle > .8 || nearby > .65) {
          context.globalAlpha = (.12 + nearby * .3) * fade
          context.fillStyle = colors[pixel.tint]
          context.fillRect(pixel.x - 2, pixel.y - 2, pixel.size + 4, pixel.size + 4)
          context.globalAlpha = Math.min(.95, (twinkle * .75 + nearby * .45) * fade)
          context.fillStyle = '#fff'
          context.fillRect(pixel.x + .5, pixel.y + .5, Math.max(1, pixel.size - 1), Math.max(1, pixel.size - 1))
        }
      }
      context.globalAlpha = 1
    }
    function animate(now) {
      if (now - lastTime >= 32) {
        const delta = Math.min((now - lastTime) / 1000, .1)
        lastTime = now
        const ease = 1 - Math.exp(-delta / .12)
        x += (targetX - x) * ease
        strength += (targetStrength - strength) * ease
        draw(now / 1000)
      }
      frame = requestAnimationFrame(animate)
    }
    function syncAnimation() {
      cancelAnimationFrame(frame)
      frame = 0
      if (document.hidden) return
      if (motion.matches) { lastTime = performance.now(); frame = requestAnimationFrame(animate) }
      else { targetStrength = 0; strength = 0; draw(0) }
    }
    function move(event) {
      if (!motion.matches || !pointer.matches || event.pointerType !== 'mouse') return
      targetX = event.clientX
      targetStrength = .45 + .55 * Math.max(0, 1 - (window.innerHeight - event.clientY) / 180)
    }
    function leave(event) { if (!event.relatedTarget) targetStrength = 0 }
    function blur() { targetStrength = 0 }
    const observer = new MutationObserver(updateColors)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-palette', 'class'] })
    updateColors()
    resize()
    syncAnimation()
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerout', leave, { passive: true })
    document.addEventListener('visibilitychange', syncAnimation)
    window.addEventListener('resize', resize)
    window.addEventListener('blur', blur)
    motion.addEventListener('change', syncAnimation)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerout', leave)
      document.removeEventListener('visibilitychange', syncAnimation)
      window.removeEventListener('resize', resize)
      window.removeEventListener('blur', blur)
      motion.removeEventListener('change', syncAnimation)
    }
  }, [])
  return createPortal(<canvas ref={ref} className="bottom-particle-glow" aria-hidden="true" />, document.body)
}
