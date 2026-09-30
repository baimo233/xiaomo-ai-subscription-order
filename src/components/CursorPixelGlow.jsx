import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const WIDTH = 104
const HEIGHT = 104

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
    function createPixel(randomAge = false) {
      const angle = Math.random() * Math.PI * 2
      const radius = 8 + Math.random() * 30
      const life = .85 + Math.random() * 1.5
      return {
        x: WIDTH / 2 + Math.cos(angle) * radius,
        y: HEIGHT / 2 + Math.sin(angle) * radius,
        size: 1.3 + Math.random() * 1.8,
        tint: Math.random() < .6 ? 1 : 0,
        life, age: randomAge ? Math.random() * life : 0,
      }
    }
    const pixels = Array.from({ length: 30 }, () => createPixel(true))
    let colors = [], frame = 0, lastTime = 0, initialized = false
    let x = 0, y = 0, targetX = 0, targetY = 0

    function updateColors() {
      const style = getComputedStyle(document.documentElement)
      colors = ['--aura-primary', '--aura-secondary'].map(name => style.getPropertyValue(name).trim())
    }
    function paint(delta) {
      context.clearRect(0, 0, WIDTH, HEIGHT)
      for (let index = 0; index < pixels.length; index++) {
        let pixel = pixels[index]
        pixel.age += delta / 1000
        if (pixel.age >= pixel.life) { pixel = createPixel(); pixels[index] = pixel }
        const opacity = Math.sin(Math.PI * pixel.age / pixel.life) ** 1.6
        context.globalAlpha = opacity * .85
        context.fillStyle = colors[pixel.tint]
        context.shadowColor = colors[pixel.tint]
        context.shadowBlur = 6
        context.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
        context.shadowBlur = 0
        if (opacity > .65) {
          context.globalAlpha = opacity * .9
          context.fillStyle = '#fff'
          context.fillRect(pixel.x + pixel.size * .25, pixel.y + pixel.size * .25, pixel.size * .5, pixel.size * .5)
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
        paint(delta)
      }
      frame = requestAnimationFrame(animate)
    }
    function move(event) {
      if (!enabled.matches || event.pointerType !== 'mouse') return
      targetX = event.clientX
      targetY = event.clientY
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
