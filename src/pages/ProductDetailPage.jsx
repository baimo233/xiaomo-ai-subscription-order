import { usePromotions } from '../hooks/usePromotions.js'
import OfferLabel from '../components/OfferLabel.jsx'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IconCheck, IconChevron, IconHome } from '../components/Icons.jsx'
import NoticeDetail from '../components/NoticeDetail.jsx'
import ClaudePurchaseNotice from '../components/ClaudePurchaseNotice.jsx'
import ProductCover from '../components/ProductCover.jsx'
import { ProductDetailSkeleton } from '../components/Skeletons.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import { formatPrice, getProduct, localizeProduct, isPurchasable } from '../data/products.js'
import { useSkeleton } from '../hooks/useSkeleton.js'

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = getProduct(id)
  const { addItem } = useCart()
  const { user } = useAuth()
  const { t, locale } = useSettings()
  const { pricing } = usePromotions()
  const copy = localizeProduct(product, locale)
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const loading = useSkeleton(520, id)

  if (loading) return <ProductDetailSkeleton />

  if (!product) {
    return (
      <div className="glass-panel rounded-2xl bg-card px-6 py-16 text-center">
        <p className="text-muted">{t('notFound')}</p>
        <Link to="/products" className="mt-4 inline-flex text-brand">
          {t('backToProducts')}
        </Link>
      </div>
    )
  }

  const available = Boolean(product.variantIds) || isPurchasable(product)

  function buyNow() {
    if (!available) return
    if (!user) {
      navigate('/login', { state: { from: `/checkout/${product.id}` } })
      return
    }
    navigate(`/checkout/${product.id}`, { state: { qty } })
  }

  function addToCart() {
    if (!available) return
    if (!user) {
      navigate('/login', { state: { from: `/products/${product.id}` } })
      return
    }
    if (product.variantIds) { buyNow(); return }
    addItem(product.id, qty)
  }

  return (
    <div>
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-muted">
        <IconHome className="h-3.5 w-3.5" />
        <Link to="/">{t('home')}</Link>
        <IconChevron />
        <Link to="/products">{t('product')}</Link>
        <IconChevron />
        <span className="text-ink">{product.shortName}</span>
      </nav>

      <div className="glass-panel overflow-hidden rounded-2xl bg-card shadow-[0_8px_24px_-18px_rgba(0,0,0,0.28)]">
        <div className="grid md:grid-cols-[280px_minmax(0,1fr)]">
          <ProductCover product={product} className="min-h-[240px]" />
          <div className="p-6 sm:p-8">
            <p className="text-[12px] text-muted">
              {t('categoryOf')} · {product.category}
            </p>
            <h1 className="mt-2 text-[28px] leading-tight font-semibold tracking-tight">{copy.name}</h1>
            <p className="mt-3 text-[15px] leading-7 text-muted">{copy.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-canvas px-2.5 py-1 text-[12px] text-muted">{copy.region}</span>
              <span className="rounded-full bg-canvas px-2.5 py-1 text-[12px] text-muted">{copy.duration}</span>
              {product.renewalOnly ? (
                <span className="rounded-full bg-warn/10 px-2.5 py-1 text-[12px] font-medium text-warn">
                  {t('renewalOnly')}
                </span>
              ) : null}
              <span className="rounded-full bg-success/10 px-2.5 py-1 text-[12px] text-ok">{available ? t('inStock') : t('comingSoon')}</span>
            </div>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <OfferLabel product={product} /><p className="text-[12px] text-muted">{t('currentPrice')}</p>
                <p className="flex items-baseline gap-2">
                  <span className="text-[36px] font-semibold tracking-tight">{available ? formatPrice(pricing(product).price) : t('pricePending')}</span>
                  {product.variantIds && <span className="text-muted">{t('priceFrom')}</span>}{available && <span className="text-muted">CNY</span>}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-[13px] text-muted" htmlFor="qty">
                  {t('qty')}
                </label>
                <input
                  id="qty"
                  type="number"
                  min="1"
                  max="9"
                  value={qty}
                  onChange={(event) => setQty(Math.max(1, Number(event.target.value) || 1))}
                  className="h-10 w-16 rounded-xl border border-line bg-card px-3 text-center outline-none focus:border-brand"
                />
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-muted">{copy.notice}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled={!available}
                onClick={buyNow}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand px-5 text-[14px] font-medium text-white hover:bg-brand-hover sm:w-auto"
              >
                {available ? t('buyNow') : t('comingSoon')}
              </button>
              <button
                type="button"
                disabled={!available}
                onClick={addToCart}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-canvas px-5 text-[14px] font-medium text-ink hover:bg-soft sm:w-auto"
              >
                {t(product.variantIds ? 'chooseCredits' : 'addToCart')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="glass-panel mt-5 rounded-2xl bg-card p-6">
          <h2 className="text-[16px] font-semibold">{t('planInfo')}</h2>
          <ul className="mt-4 space-y-3">
            {copy.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-[14px] text-muted">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-ok">
                  <IconCheck />
                </span>
                {feature}
              </li>
            ))}
          </ul>
      </section>

      {product.category === 'Claude' && <ClaudePurchaseNotice className="mt-5" />}

      {product.category === 'ChatGPT' && available ? <NoticeDetail className="mt-5" /> : <section className="glass-panel mt-5 rounded-2xl bg-card p-6"><h2 className="font-semibold">{t('buyNotice')}</h2><p className="my-3 text-sm leading-7 text-muted">{copy.notice}</p><a href={product.category === 'ChatGPT' ? 'https://chatgpt.com/pricing' : product.category === 'Codex' ? 'https://openai.com/codex/' : product.category === 'Claude' ? 'https://www.anthropic.com/pricing' : product.category === 'X-Twitter' ? 'https://help.x.com/en/using-x/x-premium' : 'https://one.google.com/about/google-ai-plans/'} target="_blank" rel="noreferrer" className="text-sm text-brand">{product.category} · {t('officialPlan')} ↗</a></section>}
    </div>
  )
}
