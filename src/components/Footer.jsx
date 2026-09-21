import { Link } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext.jsx'
import { site } from '../data/site.js'
import { IconArrowUp, IconGrid, IconHome, IconWeChat } from './Icons.jsx'

export default function Footer() {
  const { t } = useSettings()

  function toTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-8 bg-card">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center">
            <span className="text-[16px] font-semibold tracking-tight">{site.name}</span>
          </div>
          <p className="mt-3 max-w-xs text-[13px] leading-6 text-muted">{t('footerTagline')}</p>
        </div>

        <div>
          <h2 className="mb-4 text-[14px] font-semibold">{t('quickLinks')}</h2>
          <div className="space-y-3 text-[14px] text-muted">
            <Link to="/" className="flex items-center gap-2 hover:text-ink">
              <IconHome className="h-3.5 w-3.5" />
              {t('home')}
            </Link>
            <Link to="/products" className="flex items-center gap-2 hover:text-ink">
              <IconGrid className="h-3.5 w-3.5" />
              {t('productsCenter')}
            </Link>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-[14px] font-semibold">{t('contactUs')}</h2>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-xl bg-canvas px-3 py-2 text-[13px] text-ink">
              <IconWeChat className="h-[18px] w-[18px] text-[#07C160]" />
              {t('wechat')} {site.wechat}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line/80">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-3 px-4 py-5 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {site.year} {site.name}. {t('rights')}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-ink">
              {t('privacy')}
            </Link>
            <Link to="/terms" className="hover:text-ink">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={toTop}
        className="fixed right-5 bottom-5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] ring-1 ring-line hover:text-ink"
        aria-label={t('backToTop')}
      >
        <IconArrowUp />
      </button>
    </footer>
  )
}
