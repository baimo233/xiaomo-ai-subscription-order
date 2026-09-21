import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import {
  IconCart,
  IconClose,
  IconGlobe,
  IconHistory,
  IconHome,
  IconMenu,
  IconMoon,
  IconSun,
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
  const [menuOpen, setMenuOpen] = useState(false)
  const langRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)
    setLangOpen(false)
  }, [pathname])

  useEffect(() => {
    function onPointerDown(event) {
      if (langRef.current && !langRef.current.contains(event.target)) setLangOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function navClass(active) {
    return `inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] transition ${
      active ? 'bg-brand/10 text-brand' : 'text-muted hover:text-ink'
    }`
  }

  function mobileItemClass(active) {
    return `flex h-11 items-center gap-2 rounded-xl px-3 text-[15px] ${
      active ? 'bg-brand/10 font-medium text-brand' : 'text-ink'
    }`
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-card">
      <div className="relative mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-6">
        <NavLink
          to="/"
          className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-line bg-card px-3 py-1.5 shadow-sm"
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
        </nav>

        <div className="flex shrink-0 items-center gap-0.5">
          <NavLink
            to="/notice"
            className="hidden h-8 items-center rounded-full px-2.5 text-[13px] text-muted hover:text-ink lg:inline-flex"
          >
            {t('buyNotice')}
          </NavLink>
          <NavLink
            to={user ? '/cart' : '/login'}
            state={user ? undefined : { from: '/cart' }}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-ink"
            aria-label={t('cart')}
          >
            <IconCart className="h-4 w-4" />
            {user && count > 0 ? (
              <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            ) : null}
          </NavLink>
          <NavLink
            to={user ? '/account' : '/login'}
            state={user ? undefined : { from: '/account' }}
            className="hidden h-8 items-center gap-1.5 rounded-full px-2.5 text-[13px] text-muted hover:text-ink lg:inline-flex"
          >
            <IconUser className="h-3.5 w-3.5" />
            {user ? user.username : t('account')}
          </NavLink>

          <div className="relative hidden lg:block" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((open) => !open)}
              className="inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[13px] text-muted hover:text-ink"
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
            className="hidden h-9 w-9 items-center justify-center rounded-full text-muted hover:text-ink lg:flex"
            aria-label={t('theme')}
          >
            {theme === 'dark' ? <IconMoon /> : <IconSun />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink lg:hidden"
            aria-label={t('menu')}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-line bg-card px-4 py-4 lg:hidden">
          <nav className="grid gap-1">
            <NavLink to="/" className={mobileItemClass(homeActive)}>
              <IconHome className="h-4 w-4" />
              {t('home')}
            </NavLink>
            <NavLink to="/products" className={mobileItemClass(shopActive)}>
              {t('productsCenter')}
            </NavLink>
            <NavLink to="/orders" className={mobileItemClass(pathname.startsWith('/orders'))}>
              <IconHistory className="h-4 w-4" />
              {t('orderHistory')}
            </NavLink>
            <NavLink to="/notice" className={mobileItemClass(pathname.startsWith('/notice'))}>
              {t('buyNotice')}
            </NavLink>
            <NavLink
              to={user ? '/account' : '/login'}
              state={user ? undefined : { from: '/account' }}
              className={mobileItemClass(pathname.startsWith('/account') || pathname.startsWith('/login'))}
            >
              <IconUser className="h-4 w-4" />
              {user ? user.username : t('account')}
            </NavLink>
          </nav>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <div className="flex gap-2">
              {locales.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setLocale(item.id)}
                  className={`h-8 rounded-full px-3 text-[13px] ${
                    item.id === locale ? 'bg-brand/10 font-medium text-brand' : 'text-muted'
                  }`}
                >
                  {item.short}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted"
              aria-label={t('theme')}
            >
              {theme === 'dark' ? <IconMoon /> : <IconSun />}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
