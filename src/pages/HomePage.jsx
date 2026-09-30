import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import PromotionCarousel from '../components/PromotionCarousel.jsx'
import BrandMark from '../components/BrandMark.jsx'
import Reveal from '../components/Reveal.jsx'
import { IconArrowRight } from '../components/Icons.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import { products } from '../data/products.js'

const brands = ['ChatGPT', 'Claude', 'Gemini']
const featuredIds = { ChatGPT: 'chatgpt-plus', Claude: 'claude-pro', Gemini: 'gemini-pro' }
export default function HomePage() {
  const { t } = useSettings()
  const [active, setActive] = useState('Claude')
  const [filter, setFilter] = useState('all')
  const visible = products.filter(p => filter === 'all' || p.category === filter)
  const selectedProduct = products.find(p => p.id === featuredIds[active])
  function moveLight(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${(event.clientX - box.left) / box.width * 100}%`)
    event.currentTarget.style.setProperty('--pointer-y', `${(event.clientY - box.top) / box.height * 100}%`)
  }
  return <div className="storefront">
    <PromotionCarousel />
    <section className="hero-shell" onPointerMove={moveLight}>
      <div className="hero-copy">
        <p className="hero-eyebrow"><span /> XIAOMO LAB / AI MEMBERSHIPS</p>
        <h1>{t('heroTitle')}</h1>
        <p className="hero-subtitle">{t('heroSubtitle')}</p>
        <p className="hero-description">{t('heroDescription')}</p>
        <div className="hero-actions"><a className="primary-action" href="#memberships">{t('explorePlans')}<IconArrowRight /></a><a className="secondary-action" href="#how-it-works">{t('howItWorks')}<span>↗</span></a></div>
        <div className="hero-brand-row">{brands.map(brand => <span key={brand}><BrandMark brand={brand} className="h-4 w-4" />{brand}</span>)}</div>
      </div>
      <div className={`hero-stage stage-${active.toLowerCase()}`}>
        <div className="stage-grid" aria-hidden="true" />
        <div className="stage-topline"><span>{t('heroStageTitle')}</span><span className="stage-dot" /></div>
        <div className="stage-ring ring-one" aria-hidden="true" /><div className="stage-ring ring-two" aria-hidden="true" />
        <span className="stage-spark spark-one" aria-hidden="true">✦</span><span className="stage-spark spark-two" aria-hidden="true">✧</span>
        <div className="floating-membership" key={active}>
          <div className="membership-top"><span>XIAOMO SELECT</span><span>↗</span></div>
          <BrandMark brand={active} className="membership-mark" />
          <h2>{active}</h2><p>{t(`use${active}`)}</p>
          <Link to={`/products/${selectedProduct.id}`} className="membership-link">{selectedProduct.shortName}<IconArrowRight /></Link>
        </div>
        <div className="brand-switcher" role="group" aria-label={t('heroStageHint')}>{brands.map(brand => <button type="button" key={brand} aria-pressed={active === brand} onClick={() => setActive(brand)}><BrandMark brand={brand} className="h-4 w-4" />{brand}</button>)}</div>
        <p className="stage-caption">{t('heroStageHint')}</p>
      </div>
    </section>
    <div className="editorial-strip"><span>THINK. CREATE. EXPLORE.</span><span>{t('heroMeta')}</span><span className="hidden sm:block">ChatGPT / Claude / Gemini</span></div>
    <section id="memberships" className="membership-section">
      <Reveal><div className="collection-heading"><div><p className="section-eyebrow">THE MEMBERSHIP COLLECTION</p><h2>{t('collectionTitle')}</h2><p>{t('collectionDescription')}</p></div><Link to="/products" className="collection-all">{t('viewAll')}<IconArrowRight /></Link></div></Reveal>
      <div className="collection-toolbar"><div className="collection-filters" role="group" aria-label={t('category')}>{['all', ...brands].map(brand => <button key={brand} type="button" aria-pressed={filter === brand} onClick={() => setFilter(brand)}>{brand === 'all' ? t('allBrands') : brand}</button>)}</div><span className="collection-count" aria-live="polite">{String(visible.length).padStart(2, '0')} / {String(products.length).padStart(2, '0')}</span></div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible.map((product, index) => <ProductCard key={product.id} product={product} delay={index % 3 * 70} />)}</div>
    </section>
    <section id="how-it-works" className="how-section"><Reveal><div className="how-title"><p className="section-eyebrow">A LITTLE GUIDE</p><h2>{t('beforeSubscribe')}</h2><Link to="/notice">{t('buyNotice')} ↗</Link></div></Reveal><div className="how-steps">{[['stepChoose','stepChooseDesc'],['stepCheck','stepCheckDesc'],['stepOrder','stepOrderDesc']].map(([title,desc],i) => <Reveal key={title} delay={i*80}><div className="how-step"><span>0{i+1}</span><h3>{t(title)}</h3><p>{t(desc)}</p></div></Reveal>)}</div></section>
  </div>
}
