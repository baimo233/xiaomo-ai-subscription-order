import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePromotions } from '../hooks/usePromotions.js'
import { useSettings } from '../context/SettingsContext.jsx'
import BrandMark from './BrandMark.jsx'
import { getProduct, formatPrice } from '../data/products.js'
import { getCampaignWindow } from '../data/promotions.js'

export default function PromotionCarousel() {
  const { activeCampaigns, now, pricing } = usePromotions()
  const { locale, t } = useSettings()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const signature = activeCampaigns.map(c => c.id).join(',')
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (paused || interacting || reduced || activeCampaigns.length < 2) return
    const timer = setInterval(() => setIndex(i => i + 1), 6000)
    return () => clearInterval(timer)
  }, [paused, interacting, reduced, signature, activeCampaigns.length])
  if (!activeCampaigns.length) return null
  const current = index % activeCampaigns.length
  const campaign = activeCampaigns[current]
  const copy = campaign.i18n[locale] || campaign.i18n['zh-CN']
  const hasDiscount = Object.values(campaign.salePrices || {}).some(price => Number.isFinite(price) && price > 0)
  const campaignWindow = getCampaignWindow(campaign, now)
  const remaining = Number.isFinite(campaignWindow.end) && hasDiscount ? Math.max(0, Math.floor((campaignWindow.end - now) / 1000)) : null
  const countdown = remaining === null ? null : `${Math.floor(remaining / 86400)}${t('days')} ${String(Math.floor(remaining / 3600) % 24).padStart(2, '0')}:${String(Math.floor(remaining / 60) % 60).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`
  return <section className="promotion-carousel" aria-label={t('promotions')} aria-roledescription={t('carousel')} onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false) }}>
    <div key={campaign.id} className={`promotion-slide promotion-${campaign.tone}`} role="group" aria-label={`${current + 1} / ${activeCampaigns.length}`} aria-roledescription={t('slide')}>
      <div className="promotion-copy">
        <p className="promotion-tag"><span />{copy.tag}</p>
        <h2>{copy.title}</h2>
        <p className="promotion-description">{copy.description}</p>
        <Link to={campaign.href} className="promotion-cta">{copy.action}<span aria-hidden="true">↗</span></Link>
        {campaign.annual?.start === '10-01' && <p className="promotion-schedule">{t('nationalDaySchedule')}</p>}
        {countdown && <p className="promotion-countdown">{t('offerEnds')} <time dateTime={new Date(campaignWindow.end).toISOString()}>{countdown}</time></p>}
      </div>
      <div className="promotion-art" aria-hidden="true">
        {campaign.tone === 'pro' ? <><div className="promotion-brand"><BrandMark brand="ChatGPT" /></div><p className="promotion-art-title">PRO</p><div className="quota-tickets">{[100,200,500].map(quota => <div key={quota}><strong>{quota}</strong><span>¥{formatPrice(pricing(getProduct(`chatgpt-pro-${quota}`)).price)}</span></div>)}</div></> : <><span className="holiday-caption">NATIONAL DAY</span><div className="holiday-date">10<span> / </span>01</div><div className="holiday-brands">{['ChatGPT','Claude','Gemini'].map(brand => <span key={brand}><BrandMark brand={brand} /></span>)}</div></>}
      </div>
    </div>
    {activeCampaigns.length > 1 && <div className="promotion-controls">
      <div className="promotion-dots">{activeCampaigns.map((item,i) => <button key={item.id} type="button" aria-label={`${t('showPromotion')} ${i + 1}`} aria-pressed={i===current} onClick={() => setIndex(i)}><span /></button>)}</div>
      <div className="promotion-arrows"><span className="promotion-position">{String(current + 1).padStart(2,'0')} / {String(activeCampaigns.length).padStart(2,'0')}</span><button type="button" onClick={() => setPaused(p => !p)} aria-label={t(paused || reduced ? 'playPromotions' : 'pausePromotions')} disabled={reduced}>{paused || reduced ? '▶' : 'Ⅱ'}</button><button type="button" onClick={() => setIndex(current + activeCampaigns.length - 1)} aria-label={t('previousPromotion')}>←</button><button type="button" onClick={() => setIndex(current + 1)} aria-label={t('nextPromotion')}>→</button></div>
    </div>}
  </section>
}

