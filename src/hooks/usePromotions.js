import { useCallback, useContext } from 'react'
import { PromotionsContext } from '../context/promotionsStore.js'
import { campaigns, getPricing, isCampaignActive } from '../data/promotions.js'

export function usePromotions() {
  const now = useContext(PromotionsContext)
  const pricing = useCallback(product => getPricing(product, now), [now])
  return {
    now,
    activeCampaigns: campaigns.filter(campaign => isCampaignActive(campaign, now)),
    pricing,
  }
}
