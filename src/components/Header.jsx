import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import {
  IconCart,
  IconGlobe,
  IconHistory,
  IconHome,
  IconMoon,
  IconSun,
  IconTicket,
  IconUser,
} from './Icons.jsx'

export default function Header() {
  const { count } = useCart()
  const { user } = useAuth()
  const { t, locale, setLocale, locales, theme, toggleTheme } = useSettings()
  const { pathname } = useLocation()
  const homeActive = pathname === '/'
  const shopActive =
    pathname.startsWith('/products') ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/cart') ||
    pathname.startsWith('/order/')
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)

  useEffect(() => {
    function onPointerDown(event) {
      if (langRef.current && !langRef.current.contains(event.target)) setLangOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  function navClass(active) {
    return `inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] transition ${
      active ? 'bg-brand/10 text-brand' : 'text-muted hover:text-ink'
    }`
  }

  function sideClass(active = false) {
    return `inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[13px] transition ${
      active ? 'text-ink' : 'text-muted hover:text-ink'
    }`
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-card">
      <div className="relative mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <NavLink
          to="/"
          className="inline-flex items-center rounded-full border border-line bg-card px-3 py-1.5 shadow-sm"
          aria-label="小墨Lab"
        >
          <span className="text-[14px] font-semibold tracking-tight">小墨Lab</span>
        </NavLink>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex">
          <NavLink to="/" className={navClass(homeActive)}>
            <IconHome className="h-3.5 w-3.5" />
            {t('home')}
          </NavLink>
          <NavLink to="/products" className={navClass(shopActive)}>
            {t('productsCenter')}
          </NavLink>
          <NavLink to="/orders" className={navClass(pathname.startsWith('/orders'))}>
            <IconHistory className="h-3.5 w-3.5" />
            {t('orderHistory')}
          </NavLink>
          <NavLink to="/redeem" className={navClass(pathname.startsWith('/redeem'))}>
            <IconTicket className="h-3.5 w-3.5" />
            {t('redeemHistory')}
          </NavLink>
        </nav>

        <div className="flex items-center">
          <NavLink to="/notice" className={`${sideClass()} hidden md:inline-flex`}>
            {t('buyNotice')}
          </NavLink>
          <NavLink
            to={user ? '/cart' : '/login'}
            state={user ? undefined : { from: '/cart' }}
            className={`${sideClass()} relative`}
          >
            <IconCart className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t('cart')}</span>
            {user && count > 0 ? (
              <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white sm:right-1">
                {count}
              </span>
            ) : null}
          </NavLink>
          <NavLink
            to={user ? '/account' : '/login'}
            state={user ? undefined : { from: '/account' }}
            className={`${sideClass(Boolean(user))} hidden md:inline-flex`}
          >
            <IconUser className="h-3.5 w-3.5" />
            {user ? user.username : t('account')}
          </NavLink>

          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((open) => !open)}
              className={sideClass(langOpen)}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <IconGlobe className="h-3.5 w-3.5" />
              {locale.startsWith('zh') ? '中文' : 'EN'}
            </button>
            {langOpen ? (
              <div className="absolute top-10 right-0 z-50 w-44 rounded-2xl border border-line bg-card py-3 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.35)]">
                <p className="px-4 pb-2 text-[13px] text-muted">{t('language')}</p>
                {locales.map((item) => {
                  const active = item.id === locale
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setLocale(item.id)
                        setLangOpen(false)
                      }}
                      className={`flex h-10 w-full items-center justify-between px-4 text-[14px] ${
                        active ? 'font-medium text-brand' : 'text-ink hover:bg-canvas'
                      }`}
                    >
                      {item.name}
                      {active ? <span className="h-1.5 w-1.5 rounded-full bg-brand" /> : null}
                    </button>
                  )
                })}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-ink"
            aria-label={t('theme')}
          >
            {theme === 'dark' ? <IconMoon /> : <IconSun />}
          </button>
        </div>
      </div>
    </header>
  )
}
