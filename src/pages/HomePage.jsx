import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import PromotionCarousel from '../components/PromotionCarousel.jsx'
import Reveal from '../components/Reveal.jsx'
import { IconArrowRight } from '../components/Icons.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import { products } from '../data/products.js'

const brands = ['ChatGPT', 'Codex', 'Claude', 'Gemini', 'X-Twitter']
export default function HomePage() {
  const { t } = useSettings()
  const [filter, setFilter] = useState('all')
  const visible = products.filter(p => filter === 'all' || p.category === filter)
  return <div className="storefront">
    <h1 className="sr-only">{t('collectionTitle')}</h1>
    <PromotionCarousel />
    <section id="memberships" className="membership-section">
      <Reveal><div className="collection-heading"><div><p className="section-eyebrow">THE MEMBERSHIP COLLECTION</p><h2>{t('collectionTitle')}</h2><p>{t('collectionDescription')}</p></div><Link to="/products" className="collection-all">{t('viewAll')}<IconArrowRight /></Link></div></Reveal>
      <div className="collection-toolbar"><div className="collection-filters" role="group" aria-label={t('category')}>{['all', ...brands].map(brand => <button key={brand} type="button" aria-pressed={filter === brand} onClick={() => setFilter(brand)}>{brand === 'all' ? t('allBrands') : brand}</button>)}</div><span className="collection-count" aria-live="polite">{String(visible.length).padStart(2, '0')} / {String(products.length).padStart(2, '0')}</span></div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map((product, index) => <ProductCard key={product.id} product={product} delay={index % 3 * 70} />)}</div>
    </section>
    <section id="how-it-works" className="how-section"><Reveal><div className="how-title"><p className="section-eyebrow">A LITTLE GUIDE</p><h2>{t('beforeSubscribe')}</h2><Link to="/notice">{t('buyNotice')} ↗</Link></div></Reveal><div className="how-steps">{[['stepChoose','stepChooseDesc'],['stepCheck','stepCheckDesc'],['stepOrder','stepOrderDesc']].map(([title,desc],i) => <Reveal key={title} delay={i*80}><div className="how-step"><span>0{i+1}</span><h3>{t(title)}</h3><p>{t(desc)}</p></div></Reveal>)}</div></section>
  </div>
}
