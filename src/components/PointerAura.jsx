import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function PointerAura() {
  const ref = useRef(null)
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const node = ref.current
    let frame = 0
    let x = 0, y = 0, targetX = 0, targetY = 0, initialized = false

    function draw() {
      x += (targetX - x) * .28
      y += (targetY - y) * .28
      node.style.transform = `translate3d(${x}px,${y}px,0)`
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .2) frame = requestAnimationFrame(draw)
      else frame = 0
    }
    function move(event) {
      if (!media.matches || event.pointerType !== 'mouse') return
      targetX = event.clientX
      targetY = event.clientY
      if (!initialized) { x = targetX; y = targetY; initialized = true }
      node.classList.add('is-visible')
      node.classList.toggle('is-interactive', Boolean(event.target.closest('a,button,summary,label,input,select,textarea,.shop-card')))
      if (!frame) frame = requestAnimationFrame(draw)
    }
    function hide() {
      node.classList.remove('is-visible', 'is-pressed')
      initialized = false
      cancelAnimationFrame(frame)
      frame = 0
    }
    function out(event) { if (!event.relatedTarget) hide() }
    function down() { if (media.matches) node.classList.add('is-pressed') }
    function up() { node.classList.remove('is-pressed') }
    function visibility() { if (document.hidden) hide() }
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerout', out, { passive: true })
    document.addEventListener('pointerdown', down, { passive: true })
    document.addEventListener('pointerup', up, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('blur', hide)
    media.addEventListener('change', hide)
    return () => {
      hide()
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerout', out)
      document.removeEventListener('pointerdown', down)
      document.removeEventListener('pointerup', up)
      document.removeEventListener('visibilitychange', visibility)
      window.removeEventListener('blur', hide)
      media.removeEventListener('change', hide)
    }
  }, [])
  return createPortal(<div ref={ref} className="pointer-aura" aria-hidden="true"><span className="pointer-aura-ring" /></div>, document.body)
}
