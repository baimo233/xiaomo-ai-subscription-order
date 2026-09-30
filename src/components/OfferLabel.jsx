import { usePromotions } from '../hooks/usePromotions.js'
import { useSettings } from '../context/SettingsContext.jsx'
import { formatPrice } from '../data/products.js'

export default function OfferLabel({ product }) {
  const { pricing } = usePromotions()
  const { t } = useSettings()
  const offer = pricing(product)
  if (!offer.campaign) return null
  return <span className="offer-label"><span>{t('limitedOffer')}</span><del>¥{formatPrice(offer.originalPrice)}</del><span>{t('saveAmount')} ¥{formatPrice(offer.saving)}</span></span>
}
