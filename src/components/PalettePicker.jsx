import { useEffect, useId, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext.jsx'
import { palettes, paletteLabels } from '../data/appearance.js'
import { IconCheck } from './Icons.jsx'

export default function PalettePicker() {
  const { palette, setPalette, locale } = useSettings()
  const name = useId()
  return <fieldset className="palette-picker">
    <legend>{paletteLabels[locale] || paletteLabels['zh-CN']}</legend>
    <div className="palette-options">
      {palettes.map(item => <label key={item.id} className={`palette-choice ${palette === item.id ? 'selected' : ''}`}>
        <input type="radio" name={name} value={item.id} checked={palette === item.id} onChange={() => setPalette(item.id)} />
        <span className="palette-swatch" aria-hidden="true" style={{ background: item.colors[0], borderColor: item.colors[1] }}><span style={{ background: item.colors[1] }} /></span>
        <span>{item.names[locale] || item.names['zh-CN']}</span>
        {palette === item.id && <IconCheck className="palette-check" />}
      </label>)}
    </div>
  </fieldset>
}

export function DesktopPaletteMenu() {
  const { palette, locale } = useSettings()
  const { pathname } = useLocation()
  const ref = useRef(null)
  const current = palettes.find(item => item.id === palette)
  useEffect(() => { if (ref.current) ref.current.open = false }, [pathname])
  useEffect(() => {
    function dismiss(event) {
      if (event.type === 'keydown' && event.key !== 'Escape') return
      if (ref.current?.open && (event.type === 'keydown' || !ref.current.contains(event.target))) {
        ref.current.open = false
        if (event.type === 'keydown') ref.current.querySelector('summary').focus()
      }
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', dismiss)
    return () => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', dismiss) }
  }, [])
  return <details ref={ref} className="desktop-palette-menu">
    <summary aria-label={paletteLabels[locale] || paletteLabels['zh-CN']}><span className="palette-menu-icon" aria-hidden="true" style={{ background: current.colors[0], borderColor: current.colors[1] }}><span style={{ background: current.colors[1] }} /></span></summary>
    <div className="palette-popover"><PalettePicker /></div>
  </details>
}
