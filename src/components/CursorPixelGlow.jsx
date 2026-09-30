import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const WIDTH = 144
const HEIGHT = 30

export default function CursorPixelGlow() {
  const anchorRef = useRef(null)
  const canvasRef = useRef(null)
  useEffect(() => {
    const anchor = anchorRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return
    const enabled = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
    canvas.width = Math.round(WIDTH * ratio)
    canvas.height = Math.round(HEIGHT * ratio)
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    const pixels = []
    for (let column = 0; column < 35; column++) {
      for (let row = 0; row < 5; row++) {
        if (Math.random() > .9 - row * .12) continue
        pixels.push({ x: 3 + column * 4, y: HEIGHT - 4 - row * 5,
          size: Math.random() < .15 ? 2.5 : 1.4,
          phase: Math.random() * Math.PI * 2, speed: .8 + Math.random() * 1.8,
          tint: Math.random() < .65 ? 1 : 0, row })
      }
    }
    let colors = [], frame = 0, lastTime = 0, initialized = false
    let x = 0, y = 0, targetX = 0, targetY = 0

    function updateColors() {
      const style = getComputedStyle(document.documentElement)
      colors = ['--aura-primary', '--aura-secondary'].map(name => style.getPropertyValue(name).trim())
    }
    function paint(time) {
      context.clearRect(0, 0, WIDTH, HEIGHT)
      const glow = context.createRadialGradient(WIDTH * .55, HEIGHT + 6, 0, WIDTH * .55, HEIGHT + 6, 74)
      glow.addColorStop(0, colors[1] + '68')
      glow.addColorStop(.4, colors[1] + '28')
      glow.addColorStop(.7, colors[0] + '10')
      glow.addColorStop(1, colors[0] + '00')
      context.fillStyle = glow
      context.fillRect(0, 0, WIDTH, HEIGHT)
      for (const pixel of pixels) {
        const pulse = (.5 + Math.sin(time * pixel.speed + pixel.phase) * .5) ** 3
        const edgeFade = Math.sin(Math.PI * pixel.x / WIDTH) ** 1.2
        const opacity = edgeFade * (1 - pixel.row * .14)
        context.globalAlpha = (.15 + pulse * .6) * opacity
        context.fillStyle = colors[pixel.tint]
        context.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
        if (pulse > .65) {
          context.globalAlpha = pulse * .16 * opacity
          context.fillRect(pixel.x - 1.5, pixel.y - 1.5, pixel.size + 3, pixel.size + 3)
          context.globalAlpha = pulse * .9 * opacity
          context.fillStyle = '#fff'
          context.fillRect(pixel.x + .3, pixel.y + .3, 1, 1)
        }
      }
      context.globalAlpha = 1
    }
    function animate(now) {
      if (now - lastTime >= 32) {
        const delta = Math.min(now - lastTime, 80)
        lastTime = now
        const ease = 1 - Math.exp(-delta / 45)
        x += (targetX - x) * ease
        y += (targetY - y) * ease
        anchor.style.transform = `translate3d(${x}px,${y}px,0)`
        paint(now / 1000)
      }
      frame = requestAnimationFrame(animate)
    }
    function move(event) {
      if (!enabled.matches || event.pointerType !== 'mouse') return
      // Keep the pixel light beneath the pointer and within the viewport.
      targetX = Math.max(WIDTH / 2, Math.min(window.innerWidth - WIDTH / 2, event.clientX))
      targetY = Math.min(window.innerHeight - HEIGHT - 12, event.clientY)
      if (!initialized) { x = targetX; y = targetY; initialized = true }
      anchor.classList.add('is-visible')
      if (!frame) { lastTime = performance.now(); frame = requestAnimationFrame(animate) }
    }
    function hide() {
      anchor.classList.remove('is-visible')
      initialized = false
      cancelAnimationFrame(frame)
      frame = 0
    }
    function leave(event) { if (!event.relatedTarget) hide() }
    function visibility() { if (document.hidden) hide() }
    const observer = new MutationObserver(updateColors)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-palette', 'class'] })
    updateColors()
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerout', leave, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('resize', hide)
    window.addEventListener('blur', hide)
    enabled.addEventListener('change', hide)
    return () => {
      hide()
      observer.disconnect()
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerout', leave)
      document.removeEventListener('visibilitychange', visibility)
      window.removeEventListener('resize', hide)
      window.removeEventListener('blur', hide)
      enabled.removeEventListener('change', hide)
    }
  }, [])
  return createPortal(<div ref={anchorRef} className="cursor-pixel-glow" aria-hidden="true"><canvas ref={canvasRef} /></div>, document.body)
}
