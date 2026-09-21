import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import { formatPrice, localizeProduct } from '../data/products.js'
import { IconArrowRight, IconCart, IconLock, IconRefresh, IconZap } from './Icons.jsx'
import ProductCover from './ProductCover.jsx'

export default function ProductCard({ product, delay = 0 }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addItem } = useCart()
  const { t, locale } = useSettings()
  const copy = localizeProduct(product, locale)

  function requireLogin(from) {
    navigate('/login', { state: { from } })
  }

  function open() {
    navigate(`/products/${product.id}`)
  }

  function buy(event) {
    event.stopPropagation()
    if (!user) {
      requireLogin(`/checkout/${product.id}`)
      return
    }
    addItem(product.id, 1)
    navigate(`/checkout/${product.id}`, { state: { qty: 1 } })
  }

  return (
    <article
      onClick={open}
      style={{ animationDelay: `${delay}ms` }}
      className="theme-slide-up group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line/80 bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-soft">
        <div className="absolute inset-0 z-10 bg-black/10 transition-colors duration-300 group-hover:bg-black/5" />
        <ProductCover className="h-full w-full" />
        {product.renewalOnly ? (
          <span className="absolute top-3 left-3 z-20 inline-flex items-center gap-1 rounded-md bg-warn px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
            <IconRefresh />
            {t('renewalOnly')}
          </span>
        ) : null}
      </div>
      <div className="relative z-20 flex flex-1 flex-col p-4 md:p-5">
        <div className="mb-1 truncate text-[11px] tracking-wider text-muted uppercase md:mb-2">
          {t('categoryOf')} · {product.category}
        </div>
        <h3 className="mb-1 line-clamp-1 text-sm font-bold md:mb-2 md:text-lg">{copy.name}</h3>
        <div className="mb-2 flex flex-wrap items-center gap-1 md:mb-3 md:gap-2">
          {product.renewalOnly ? (
            <span className="inline-flex items-center gap-1 rounded-md border border-warn/30 bg-warn/10 px-1.5 py-0.5 text-[10px] font-semibold text-warn">
              <IconRefresh />
              {t('renewalOnly')}
            </span>
          ) : (
            <span className="hidden items-center gap-1 rounded-md border border-success/30 bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold text-success md:inline-flex">
              <IconLock />
              {t('membersOnly')}
            </span>
          )}
          <span className="hidden items-center gap-1 rounded-md border border-info/30 bg-info/10 px-1.5 py-0.5 text-[10px] font-semibold text-info md:inline-flex">
            <IconZap />
            {t('autoFulfill')}
          </span>
          <span className="hidden items-center rounded-md border border-success/30 bg-success/10 px-1.5 py-0.5 text-[10px] font-semibold text-success md:inline-flex">
            {t('inStock')}
          </span>
          {!product.renewalOnly ? (
            <span className="inline-flex items-center rounded-md border border-info/30 bg-info/10 px-1.5 py-0.5 text-[10px] font-semibold text-info md:hidden">
              {t('autoFulfill')}
            </span>
          ) : null}
        </div>
        <p className="mb-6 hidden line-clamp-2 text-sm text-muted md:block">{copy.description}</p>
        <div className="mt-auto flex items-center justify-between border-t border-line/70 pt-2 md:pt-4">
          <div className="flex flex-col">
            <span className="hidden text-[11px] tracking-wider text-muted uppercase md:block">{t('price')}</span>
            <span className="text-[15px] font-semibold">{formatPrice(product.price)} CNY</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={t('quickBuy')}
              onClick={buy}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-card shadow-sm hover:bg-canvas md:h-9 md:w-9"
            >
              <IconCart />
            </button>
            <span className="hidden items-center text-muted group-hover:text-ink md:flex">
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
