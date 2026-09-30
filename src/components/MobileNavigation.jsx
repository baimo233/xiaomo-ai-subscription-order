import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import { IconHome, IconGrid, IconHistory, IconUser, IconMenu, IconClose, IconMoon, IconSun, IconChevron } from './Icons.jsx'
import PalettePicker from './PalettePicker.jsx'

export default function MobileNavigation() {
  const { user } = useAuth()
  const { t, locale, locales, setLocale, theme, toggleTheme } = useSettings()
  const { pathname } = useLocation()
  const dialog = useRef(null)
  const previousOverflow = useRef('')
  const trigger = useRef(null)

  function close() { dialog.current?.close() }
  function restore() {
    document.body.style.overflow = previousOverflow.current
    trigger.current?.focus()
  }
  function open() {
    previousOverflow.current = document.body.style.overflow
    dialog.current.showModal()
    document.body.style.overflow = 'hidden'
  }
  useEffect(() => { if (dialog.current?.open) dialog.current.close() }, [pathname])
  useEffect(() => {
    const panel = dialog.current
    const desktop = window.matchMedia('(min-width: 1024px)')
    function onResize() { if (desktop.matches && dialog.current?.open) dialog.current.close() }
    desktop.addEventListener('change', onResize)
    return () => {
      desktop.removeEventListener('change', onResize)
      if (panel?.open) document.body.style.overflow = previousOverflow.current
    }
  }, [])

  const items = [
    { to: '/', label: 'home', Icon: IconHome, active: pathname === '/' },
    { to: '/products', label: 'product', Icon: IconGrid, active: pathname.startsWith('/products') || pathname.startsWith('/checkout') || pathname.startsWith('/cart') },
    { to: '/orders', label: 'mobileOrders', Icon: IconHistory, active: pathname.startsWith('/orders') || pathname.startsWith('/order/') },
    { to: user ? '/account' : '/login', label: 'mobileAccount', Icon: IconUser, active: pathname.startsWith('/account') || pathname.startsWith('/login') },
  ]

  return <>
    <button ref={trigger} type="button" onClick={open} className="mobile-settings-trigger lg:hidden" aria-label={t('mobileSettings')} aria-haspopup="dialog" aria-controls="mobile-settings"><IconMenu /></button>
    {createPortal(<>
      <nav className="mobile-tabbar" aria-label={t('mobileNavigation')}>
        {items.map(({ to, label, Icon, active }) => <NavLink key={label} to={to} state={label === 'mobileAccount' && !user ? { from: '/account' } : undefined} aria-current={active ? 'page' : undefined} className={`mobile-tab ${active ? 'is-active' : ''}`}><span className="mobile-tab-icon"><Icon className="h-5 w-5" /></span><span>{t(label)}</span></NavLink>)}
      </nav>
      <dialog ref={dialog} id="mobile-settings" className="mobile-settings-sheet" aria-labelledby="mobile-settings-title" onClose={restore} onClick={event => { if (event.target === event.currentTarget) close() }}>
        <div className="sheet-content">
          <div className="sheet-handle" aria-hidden="true" />
          <div className="sheet-heading"><div><p>XIAOMO LAB</p><h2 id="mobile-settings-title">{t('mobileSettings')}</h2></div><button type="button" onClick={close} className="sheet-close" aria-label={t('closePanel')} autoFocus><IconClose /></button></div>
          <div className="sheet-section"><h3>{t('language')}</h3><div className="sheet-languages">{locales.map(item => <button key={item.id} type="button" aria-pressed={item.id === locale} onClick={() => setLocale(item.id)}>{item.name}</button>)}</div></div>
          <div className="sheet-section"><h3>{t('theme')}</h3><button type="button" className="sheet-theme" onClick={toggleTheme} aria-pressed={theme === 'dark'}><span>{theme === 'dark' ? <IconMoon /> : <IconSun />}{t(theme === 'dark' ? 'darkAppearance' : 'lightAppearance')}</span><span className="theme-switch" aria-hidden="true"><span /></span></button></div>
          <div className="sheet-section"><PalettePicker /></div>
          <div className="sheet-links">{[['/notice','buyNotice'],['/privacy','privacy'],['/terms','terms']].map(([to,label]) => <Link to={to} key={to} onClick={close}>{t(label)}<IconChevron /></Link>)}</div>
        </div>
      </dialog>
    </>, document.body)}
  </>
}
