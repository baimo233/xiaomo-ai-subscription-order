import { Link } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext.jsx'
import { site } from '../data/site.js'
import { IconArrowUp } from './Icons.jsx'

export default function Footer() {
  const { t } = useSettings()

  function toTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer relative">
      <div className="footer-frame">
        <div className="footer-top">
          <div className="footer-identity">
            <Link to="/" className="footer-wordmark">{site.name}</Link>
            <p>{t('footerTagline')}</p>
          </div>
          <div className="footer-contact">
            <img src={`${import.meta.env.BASE_URL}brands/qq.png`} alt="" aria-hidden="true" />
            <div><h2>{t('contactUs')} · {t('qqGroup')}</h2><p>{site.qqGroup}</p></div>
          </div>
        </div>
        <div className="footer-bottom">
          <nav aria-label={t('quickLinks')} className="footer-links">
            <Link to="/">{t('home')}</Link>
            <Link to="/products">{t('productsCenter')}</Link>
            <Link to="/notice">{t('buyNotice')}</Link>
          </nav>
          <div className="footer-legal">
            <Link to="/privacy">{t('privacy')}</Link>
            <Link to="/terms">{t('terms')}</Link>
          </div>
        </div>
        <p className="footer-copyright">© {site.year} {site.name}. {t('rights')}</p>
      </div>

      <button
        type="button"
        onClick={toTop}
        className="mobile-backtop fixed right-4 bottom-20 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] ring-1 ring-line hover:text-ink sm:right-5 sm:bottom-5"
        aria-label={t('backToTop')}
      >
        <IconArrowUp />
      </button>
    </footer>
  )
}
