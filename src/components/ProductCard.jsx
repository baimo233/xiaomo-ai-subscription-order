import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import { formatPrice, localizeProduct, isPurchasable } from '../data/products.js'
import { IconArrowRight, IconCart } from './Icons.jsx'
import ProductCover from './ProductCover.jsx'
import Reveal from './Reveal.jsx'
export default function ProductCard({ product, delay = 0 }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addItem } = useCart()
  const { t, locale } = useSettings()
  const copy = localizeProduct(product, locale)
  const available = isPurchasable(product)
  function buy() {
    if (!available) return
    if (!user) return navigate('/login', { state: { from: `/checkout/${product.id}` } })
    addItem(product.id, 1)
    navigate(`/checkout/${product.id}`, { state: { qty: 1 } })
  }
  return <Reveal delay={delay}><article className="shop-card group">
    <Link to={`/products/${product.id}`} className="product-image-link" aria-label={copy.name}>
      <ProductCover product={product} className="aspect-[16/9]" />
      <span className="card-image-arrow"><IconArrowRight /></span>
    </Link>
    <div className="flex flex-1 flex-col p-5">
      <div className="mb-3 flex items-center justify-between gap-2 text-xs text-muted"><span>{product.category} / {copy.duration}</span><span className={`plan-badge ${available ? '' : 'pending'}`}>{!available ? t('comingSoon') : product.renewalOnly ? t('renewalOnly') : t('inStock')}</span></div>
      <h3 className="text-lg font-semibold"><Link to={`/products/${product.id}`} className="hover:text-brand">{copy.name}</Link></h3>
      <p className="mt-2 mb-5 line-clamp-2 text-sm leading-6 text-muted">{copy.description}</p>
      <div className="mt-auto flex items-end justify-between gap-2 border-t border-line/60 pt-4">
        <div><span className="block text-[11px] text-muted">{t('price')}</span><span className="card-price">{available ? `¥${formatPrice(product.price)}` : t('pricePending')}</span>{available && <span className="ml-1 text-xs text-muted">CNY</span>}</div>
        {available ? <button onClick={buy} type="button" className="card-buy" aria-label={`${t('quickBuy')} ${copy.name}`}><IconCart /></button> : <Link className="card-buy" to={`/products/${product.id}`} aria-label={`${t('planInfo')} ${copy.name}`}><IconArrowRight /></Link>}
      </div>
    </div>
  </article></Reveal>
}
