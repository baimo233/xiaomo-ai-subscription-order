// All timestamps include the China time zone. End times are exclusive.
// Keep unconfirmed discounts disabled; set exact sale prices before enabling.
export const campaigns = [
  {
    id: 'pro-launch', enabled: true, tone: 'pro', href: '/products/chatgpt-pro-100',
    i18n: {
      'zh-CN': { tag: 'PRO 系列 · 新方案', title: '更高额度，更多可能。', description: '100 / 200 / 500 额度现已上线，按工作强度选择你的 Pro。', action: '查看 Pro 方案' },
      'zh-TW': { tag: 'PRO 系列 · 新方案', title: '更高額度，更多可能。', description: '100 / 200 / 500 額度現已上線，按工作強度選擇你的 Pro。', action: '查看 Pro 方案' },
      en: { tag: 'PRO COLLECTION · NEW', title: 'More room for your ideas.', description: '100 / 200 / 500 quota plans are here. Choose your Pro.', action: 'Explore Pro plans' },
    },
  },
  {
    id: 'claude-membership', enabled: true, tone: 'claude', brand: 'Claude', productId: 'claude-pro', href: '/products/claude-pro',
    i18n: {
      'zh-CN': { tag: 'CLAUDE PRO · 月度会员', title: '从好想法，到好作品。', description: '写作、分析与代码协作，让 Claude 成为你的日常工作搭档。', action: '查看 Claude Pro' },
      'zh-TW': { tag: 'CLAUDE PRO · 月度會員', title: '從好想法，到好作品。', description: '寫作、分析與程式碼協作，讓 Claude 成為你的日常工作夥伴。', action: '查看 Claude Pro' },
      en: { tag: 'CLAUDE PRO · MONTHLY', title: 'Good ideas. Better work.', description: 'Writing, analysis and coding. Meet your everyday collaborator with Claude Pro.', action: 'Explore Claude Pro' },
    },
  },
  {
    id: 'gemini-membership', enabled: true, tone: 'gemini', brand: 'Gemini', productId: 'gemini-pro', href: '/products/gemini-pro',
    i18n: {
      'zh-CN': { tag: 'GEMINI · GOOGLE AI PRO', title: '让好奇，走得更远。', description: '探索多模态创作与研究。Google AI Pro 月度方案，售价待定。', action: '查看 Gemini 方案' },
      'zh-TW': { tag: 'GEMINI · GOOGLE AI PRO', title: '讓好奇，走得更遠。', description: '探索多模態創作與研究。Google AI Pro 月度方案，售價待定。', action: '查看 Gemini 方案' },
      en: { tag: 'GEMINI · GOOGLE AI PRO', title: 'Take curiosity further.', description: 'Explore multimodal creation and research. Monthly Google AI Pro plan; pricing pending.', action: 'Explore Gemini' },
    },
  },
  {
    id: 'national-day-preview', enabled: true, tone: 'holiday', href: '/products',
    annual: { start: '09-30', end: '10-08' },
    i18n: {
      'zh-CN': { tag: '国庆活动 · 预告', title: '国庆，让灵感尽兴。', description: '国庆优惠准备中，活动每年 10 月 1 日至 7 日，具体优惠确认后公布。', action: '浏览会员商品' },
      'zh-TW': { tag: '國慶活動 · 預告', title: '國慶，讓靈感盡興。', description: '國慶優惠準備中，活動每年 10 月 1 日至 7 日，具體優惠確認後公布。', action: '瀏覽會員商品' },
      en: { tag: 'NATIONAL DAY · PREVIEW', title: 'A little break. A new idea.', description: 'Holiday offers are being prepared. Runs October 1–7 each year. Sale prices will be announced once confirmed.', action: 'Browse memberships' },
    },
  },
  {
    id: 'national-day-sale', enabled: false, tone: 'holiday', href: '/products',
    annual: { start: '10-01', end: '10-08' },
    // Example shape: 'chatgpt-plus': 125. Use only confirmed prices.
    salePrices: {},
    i18n: {
      'zh-CN': { tag: '国庆活动 · 限时优惠', title: '假期好价，灵感不停。', description: '参与活动的套餐已标注优惠价，截止时间内下单享活动价格。', action: '查看活动商品' },
      'zh-TW': { tag: '國慶活動 · 限時優惠', title: '假期好價，靈感不停。', description: '參與活動的方案已標註優惠價，截止時間內下單享活動價格。', action: '查看活動商品' },
      en: { tag: 'NATIONAL DAY · LIMITED OFFER', title: 'Holiday prices. Fresh ideas.', description: 'Participating plans show their sale prices. Order before the offer ends.', action: 'Shop the offers' },
    },
  },
]

export function getCampaignWindow(campaign, now = Date.now()) {
  if (campaign.annual) {
    let year = new Date(now + 8 * 3600_000).getUTCFullYear()
    const { start, end } = campaign.annual
    const crossesYear = end <= start
    if (crossesYear && now < Date.parse(`${year}-${start}T00:00:00+08:00`)) year -= 1
    return {
      start: Date.parse(`${year}-${start}T00:00:00+08:00`),
      end: Date.parse(`${year + (crossesYear ? 1 : 0)}-${end}T00:00:00+08:00`),
    }
  }
  return {
    start: campaign.startsAt ? Date.parse(campaign.startsAt) : -Infinity,
    end: campaign.endsAt ? Date.parse(campaign.endsAt) : Infinity,
  }
}

export function isCampaignActive(campaign, now = Date.now()) {
  if (!campaign.enabled) return false
  const { start, end } = getCampaignWindow(campaign, now)
  return now >= start && now < end
}

export function getPricing(product, now = Date.now(), source = campaigns) {
  const originalPrice = product?.price ?? null
  let price = originalPrice
  let campaign = null
  if (Number.isFinite(price) && price > 0 && product.status !== 'coming-soon') {
    for (const offer of source) {
      const sale = offer.salePrices?.[product.id]
      const rounded = Math.round(sale * 100) / 100
      if (isCampaignActive(offer, now) && Number.isFinite(sale) && rounded > 0 && rounded < price) {
        price = rounded
        campaign = offer
      }
    }
  }
  return { price, originalPrice, campaign, saving: campaign ? Math.round((originalPrice - price) * 100) / 100 : 0 }
}
