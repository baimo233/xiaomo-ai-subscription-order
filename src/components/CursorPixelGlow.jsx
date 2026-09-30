import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const WIDTH = 104
const HEIGHT = 104
const SPRITE_SIZE = 24
const PIXEL_SIZES = [2, 3, 4]

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
    function createPixel(randomAge = false, now = performance.now()) {
      const angle = Math.random() * Math.PI * 2
      // Bias positions toward the pointer; the outer sparks remain sparse.
      const radius = 4 + Math.random() ** 1.65 * 34
      const life = 850 + Math.random() * 1500
      return {
        x: WIDTH / 2 + Math.cos(angle) * radius,
        y: HEIGHT / 2 + Math.sin(angle) * radius,
        sizeIndex: Math.floor(Math.random() * PIXEL_SIZES.length),
        tint: Math.random() < .6 ? 1 : 0,
        life, born: now - (randomAge ? Math.random() * life : 0),
      }
    }
    const pixels = Array.from({ length: 48 }, () => createPixel(true))
    let sprites = [], frame = 0, lastPaint = 0, visible = false, positionDirty = false
    let targetX = 0, targetY = 0

    function updateColors() {
      const style = getComputedStyle(document.documentElement)
      const colors = ['--aura-primary', '--aura-secondary'].map(name => style.getPropertyValue(name).trim())
      // Bake the expensive glow once per palette, rather than blurring every particle every frame.
      sprites = colors.map(color => PIXEL_SIZES.map(size => {
        const sprite = document.createElement('canvas')
        sprite.width = Math.round(SPRITE_SIZE * ratio)
        sprite.height = Math.round(SPRITE_SIZE * ratio)
        const brush = sprite.getContext('2d')
        brush.setTransform(ratio, 0, 0, ratio, 0, 0)
        const corner = (SPRITE_SIZE - size) / 2
        brush.shadowColor = color
        brush.shadowBlur = 6
        brush.fillStyle = color
        brush.fillRect(corner, corner, size, size)
        brush.shadowBlur = 0
        brush.fillStyle = '#fff'
        brush.fillRect(corner + size * .25, corner + size * .25, size * .5, size * .5)
        return sprite
      }))
    }
    function paint(now) {
      context.clearRect(0, 0, WIDTH, HEIGHT)
      for (let index = 0; index < pixels.length; index++) {
        let pixel = pixels[index]
        if (now - pixel.born >= pixel.life) { pixel = createPixel(false, now); pixels[index] = pixel }
        const opacity = Math.sin(Math.PI * (now - pixel.born) / pixel.life) ** 1.6
        if (opacity < .02) continue
        context.globalAlpha = opacity * .85
        context.drawImage(sprites[pixel.tint][pixel.sizeIndex], pixel.x - SPRITE_SIZE / 2,
          pixel.y - SPRITE_SIZE / 2, SPRITE_SIZE, SPRITE_SIZE)
      }
      context.globalAlpha = 1
    }
    function animate(now) {
      // Follow every display frame with the latest pointer position, without a trailing interpolation.
      if (positionDirty) {
        anchor.style.transform = `translate3d(${targetX}px,${targetY}px,0)`
        positionDirty = false
      }
      // Twinkling can stay at 30 fps independently of smooth 60/120 Hz movement.
      if (now - lastPaint >= 30) {
        lastPaint = now
        paint(now)
      }
      frame = requestAnimationFrame(animate)
    }
    function move(event) {
      if (!enabled.matches || event.pointerType !== 'mouse') return
      targetX = event.clientX
      targetY = event.clientY
      positionDirty = true
      if (!visible) { anchor.classList.add('is-visible'); visible = true }
      if (!frame) { lastPaint = 0; frame = requestAnimationFrame(animate) }
    }
    function hide() {
      anchor.classList.remove('is-visible')
      visible = false
      positionDirty = false
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
