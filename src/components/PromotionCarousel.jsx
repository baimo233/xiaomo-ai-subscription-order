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
    const timer = setInterval(() => setIndex(i => i + 1), 5000)
    return () => clearInterval(timer)
  }, [paused, interacting, reduced, signature, activeCampaigns.length, index])
  if (!activeCampaigns.length) return null
  const current = index % activeCampaigns.length
  const stopped = paused || interacting || reduced
  return <section className="campaign-board" aria-label={t('promotions')} aria-roledescription={t('carousel')} onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={e => { if (e.target.matches(':focus-visible')) setInteracting(true) }} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false) }}>
    <div className="campaign-track" style={{ transform: `translateX(-${current * 100}%)` }}>
      {activeCampaigns.map((campaign, i) => {
        const copy = campaign.i18n[locale] || campaign.i18n['zh-CN']
        const campaignWindow = getCampaignWindow(campaign, now)
        const hasDiscount = Object.values(campaign.salePrices || {}).some(price => Number.isFinite(price) && price > 0)
        const remaining = Number.isFinite(campaignWindow.end) && hasDiscount ? Math.max(0, Math.floor((campaignWindow.end - now) / 1000)) : null
        const countdown = remaining === null ? null : `${Math.floor(remaining / 86400)}${t('days')} ${String(Math.floor(remaining / 3600) % 24).padStart(2, '0')}:${String(Math.floor(remaining / 60) % 60).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`
        return <div key={campaign.id} className={`campaign-panel campaign-${campaign.tone}`} inert={i !== current} aria-hidden={i !== current} role="group" aria-label={`${i + 1} / ${activeCampaigns.length}`} aria-roledescription={t('slide')}>
          <div className="campaign-copy">
            <p className="campaign-tag"><span className="campaign-status-dot" />{copy.tag}</p>
            <h2>{copy.title}</h2>
            <p className="campaign-description">{copy.description}</p>
            <div className="campaign-action-row"><Link to={campaign.href} className="campaign-cta">{copy.action}<span aria-hidden="true">↗</span></Link>{campaign.tone === 'holiday' && <span className="campaign-dates">10.01 — 10.07</span>}</div>
            {countdown && <p className="campaign-countdown">{t('offerEnds')} <time dateTime={new Date(campaignWindow.end).toISOString()}>{countdown}</time></p>}
          </div>
          <div className="campaign-art" aria-hidden="true">
            <div className="campaign-orbit orbit-one" /><div className="campaign-orbit orbit-two" />
            {campaign.tone === 'pro' ? <div className="pro-deck">{[100,200,500].map((quota, tier) => <div className={`pro-pass pass-${tier}`} key={quota}><div className="pass-top"><span>GPT PRO</span><BrandMark brand="ChatGPT" /></div><strong>{quota}<small>{locale === 'en' ? 'QUOTA' : '额度'}</small></strong><div className="pass-bottom"><span>¥{formatPrice(pricing(getProduct(`chatgpt-pro-${quota}`)).price)}</span><span>↗</span></div></div>)}</div> : <div className="holiday-deck"><div className="brand-pass brand-pass-back"><BrandMark brand="Claude" /><span>Claude</span></div><div className="brand-pass brand-pass-front"><div className="pass-top"><span>XIAOMO LAB</span><BrandMark brand="ChatGPT" /></div><strong>Holiday<em>with AI.</em></strong><div className="holiday-pass-bottom"><span>OCT 01 — 07</span><BrandMark brand="Gemini" /></div></div><span className="deck-caption">ChatGPT · Claude · Gemini</span></div>}
          </div>
        </div>
      })}
    </div>
    {activeCampaigns.length > 1 && <div className="campaign-controls">
      <div className="campaign-indicators">{activeCampaigns.map((item,i) => <button key={item.id} type="button" aria-label={`${t('showPromotion')} ${i + 1}`} aria-pressed={i===current} onClick={() => setIndex(i)}><span className="indicator-track">{i === current && <span key={index} className="indicator-progress" style={{ animationPlayState: stopped ? 'paused' : 'running' }} />}</span></button>)}</div>
      <div className="campaign-arrows"><span className="campaign-position">{String(current + 1).padStart(2,'0')}<span> / {String(activeCampaigns.length).padStart(2,'0')}</span></span><button type="button" onClick={() => setPaused(p => !p)} aria-label={t(paused || reduced ? 'playPromotions' : 'pausePromotions')} disabled={reduced}><svg viewBox="0 0 24 24" aria-hidden="true">{paused || reduced ? <path d="m9 5 10 7-10 7z" fill="currentColor" /> : <path d="M8 6v12M16 6v12" fill="none" stroke="currentColor" strokeWidth="2" />}</svg></button><button type="button" onClick={() => setIndex(current + activeCampaigns.length - 1)} aria-label={t('previousPromotion')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m14 6-6 6 6 6" /></svg></button><button type="button" onClick={() => setIndex(current + 1)} aria-label={t('nextPromotion')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m10 6 6 6-6 6" /></svg></button></div>
    </div>}
  </section>
}
