import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function PointerAura() {
  const ref = useRef(null)
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const node = ref.current
    let frame = 0, lastTime = 0
    let x = 0, y = 0, targetX = 0, targetY = 0, initialized = false

    function draw(now) {
      const delta = Math.min(now - lastTime, 64)
      const ease = 1 - Math.exp(-delta / 45)
      lastTime = now
      x += (targetX - x) * ease
      y += (targetY - y) * ease
      const moving = Math.abs(targetX - x) + Math.abs(targetY - y) > .15
      if (!moving) { x = targetX; y = targetY }
      node.style.transform = `translate3d(${x}px,${y}px,0)`
      frame = moving ? requestAnimationFrame(draw) : 0
    }
    function move(event) {
      if (!media.matches || event.pointerType !== 'mouse') return
      targetX = event.clientX
      targetY = event.clientY
      if (!initialized) { x = targetX; y = targetY; initialized = true }
      node.classList.add('is-visible')
      node.classList.toggle('is-interactive', Boolean(event.target.closest('a,button,summary,label,input,select,textarea')))
      if (!frame) { lastTime = performance.now(); frame = requestAnimationFrame(draw) }
    }
    function hide() {
      node.classList.remove('is-visible', 'is-pressed', 'is-interactive')
      initialized = false
      cancelAnimationFrame(frame)
      frame = 0
    }
    function out(event) { if (!event.relatedTarget) hide() }
    function down(event) { if (media.matches && event.pointerType === 'mouse') node.classList.add('is-pressed') }
    function up() { node.classList.remove('is-pressed') }
    function visibility() { if (document.hidden) hide() }
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerout', out, { passive: true })
    document.addEventListener('pointerdown', down, { passive: true })
    document.addEventListener('pointerup', up, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('blur', hide)
    window.addEventListener('resize', hide)
    media.addEventListener('change', hide)
    return () => {
      hide()
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerout', out)
      document.removeEventListener('pointerdown', down)
      document.removeEventListener('pointerup', up)
      document.removeEventListener('visibilitychange', visibility)
      window.removeEventListener('blur', hide)
      window.removeEventListener('resize', hide)
      media.removeEventListener('change', hide)
    }
  }, [])
  return createPortal(<div ref={ref} className="pointer-glow" aria-hidden="true" />, document.body)
}
