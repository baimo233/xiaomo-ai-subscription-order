export const products = [
  {
    id: 'chatgpt-go',
    shortName: 'ChatGPT Go',
    category: 'ChatGPT',
    price: 60,
    currency: 'CNY',
    i18n: {
      'zh-CN': {
        name: 'ChatGPT Go 会员',
        region: '官方会员',
        duration: '1 个月',
        description: '一个月 ChatGPT Go 会员。下单后自动发货，质保订阅，不质保封号。',
        notice: '下单后自动发货。请使用未开通会员的账号充值。',
        features: ['Go 会员额度', '质保订阅', '适合轻度使用', '自动发货'],
      },
      'zh-TW': {
        name: 'ChatGPT Go 會員',
        region: '官方會員',
        duration: '1 個月',
        description: '一個月 ChatGPT Go 會員。下單後自動發貨，質保訂閱，不質保封號。',
        notice: '下單後自動發貨。請使用未開通會員的帳號充值。',
        features: ['Go 會員額度', '質保訂閱', '適合輕度使用', '自動發貨'],
      },
      en: {
        name: 'ChatGPT Go Membership',
        region: 'Official',
        duration: '1 month',
        description: 'One-month ChatGPT Go membership. Auto-delivered after order. Plan is guaranteed; account bans are not.',
        notice: 'Auto-delivered after order. Use an account without an active membership.',
        features: ['Go quota', 'Guaranteed plan', 'Light usage', 'Auto delivery'],
      },
    },
  },
  {
    id: 'chatgpt-plus',
    shortName: 'ChatGPT Plus',
    category: 'ChatGPT',
    price: 137,
    currency: 'CNY',
    i18n: {
      'zh-CN': {
        name: 'ChatGPT Plus 会员',
        region: '官方会员',
        duration: '1 个月',
        description: '一个月 ChatGPT Plus 会员。下单后自动发货，质保订阅，不质保封号。',
        notice: '下单后自动发货。请使用未开通会员的账号充值。',
        features: ['GPT 优先通道', '高质量图像', '更长上下文', '自动发货'],
      },
      'zh-TW': {
        name: 'ChatGPT Plus 會員',
        region: '官方會員',
        duration: '1 個月',
        description: '一個月 ChatGPT Plus 會員。下單後自動發貨，質保訂閱，不質保封號。',
        notice: '下單後自動發貨。請使用未開通會員的帳號充值。',
        features: ['GPT 優先通道', '高品質圖像', '更長上下文', '自動發貨'],
      },
      en: {
        name: 'ChatGPT Plus Membership',
        region: 'Official',
        duration: '1 month',
        description: 'One-month ChatGPT Plus membership. Auto-delivered after order. Plan is guaranteed; account bans are not.',
        notice: 'Auto-delivered after order. Use an account without an active membership.',
        features: ['Priority GPT access', 'Higher-quality images', 'Longer context', 'Auto delivery'],
      },
    },
  },
  {
    id: 'chatgpt-pro-5x',
    shortName: 'ChatGPT Pro 5x',
    category: 'ChatGPT',
    price: 685,
    currency: 'CNY',
    i18n: {
      'zh-CN': {
        name: 'ChatGPT Pro 5x 会员',
        region: '官方会员',
        duration: '1 个月',
        description: '一个月 ChatGPT Pro 5x 会员。下单后自动发货，质保订阅，不质保封号。',
        notice: '下单后自动发货。请使用未开通会员的账号充值。',
        features: ['Pro 额度 5x', '优先推理', '适合重度使用', '自动发货'],
      },
      'zh-TW': {
        name: 'ChatGPT Pro 5x 會員',
        region: '官方會員',
        duration: '1 個月',
        description: '一個月 ChatGPT Pro 5x 會員。下單後自動發貨，質保訂閱，不質保封號。',
        notice: '下單後自動發貨。請使用未開通會員的帳號充值。',
        features: ['Pro 額度 5x', '優先推理', '適合重度使用', '自動發貨'],
      },
      en: {
        name: 'ChatGPT Pro 5x Membership',
        region: 'Official',
        duration: '1 month',
        description: 'One-month ChatGPT Pro 5x membership. Auto-delivered after order. Plan is guaranteed; account bans are not.',
        notice: 'Auto-delivered after order. Use an account without an active membership.',
        features: ['Pro quota 5x', 'Priority reasoning', 'Heavy usage', 'Auto delivery'],
      },
    },
  },
  {
    id: 'chatgpt-pro-20x',
    shortName: 'ChatGPT Pro 20x',
    category: 'ChatGPT',
    price: 1200,
    currency: 'CNY',
    renewalOnly: true,
    i18n: {
      'zh-CN': {
        name: 'ChatGPT Pro 20x 会员',
        region: '仅续费',
        duration: '1 个月',
        description: '一个月 ChatGPT Pro 20x 会员，只能续费，需账号已有 Pro 订阅。下单后自动发货，质保订阅，不质保封号。',
        notice: '本商品只能续费，需账号已开通 ChatGPT Pro。新号无法使用。下单后自动发货。',
        features: ['Pro 额度 20x', '只能续费', '适合超重度使用', '自动发货'],
      },
      'zh-TW': {
        name: 'ChatGPT Pro 20x 會員',
        region: '僅續費',
        duration: '1 個月',
        description: '一個月 ChatGPT Pro 20x 會員，只能續費，需帳號已有 Pro 訂閱。下單後自動發貨，質保訂閱，不質保封號。',
        notice: '本商品只能續費，需帳號已開通 ChatGPT Pro。新號無法使用。下單後自動發貨。',
        features: ['Pro 額度 20x', '只能續費', '適合超重度使用', '自動發貨'],
      },
      en: {
        name: 'ChatGPT Pro 20x Membership',
        region: 'Renewal only',
        duration: '1 month',
        description: 'One-month ChatGPT Pro 20x membership. Renewal only — an existing Pro plan is required. Auto-delivered after order. Plan is guaranteed; account bans are not.',
        notice: 'This plan is renewal only. Your account must already have ChatGPT Pro. New accounts cannot use it. Auto-delivered after order.',
        features: ['Pro quota 20x', 'Renewal only', 'Very heavy usage', 'Auto delivery'],
      },
    },
  },
{
  "id": "claude-pro",
  "shortName": "Claude Pro",
  "category": "Claude",
  "price": null,
  "currency": "CNY",
  "status": "coming-soon",
  "i18n": {
    "zh-CN": {
      "name": "Claude Pro 会员",
      "region": "会员订阅",
      "duration": "1 个月",
      "description": "Claude Pro 月度订阅，为日常工作、学习与创作提供更多可能。售价及交付方式确认后开放购买。",
      "notice": "售价及交付方式待确认，暂未开放购买。权益、额度和地区资格以服务商实际规则为准。",
      "features": [
        "写作与分析",
        "代码协作",
        "项目工作区",
        "月度订阅"
      ]
    },
    "zh-TW": {
      "name": "Claude Pro 會員",
      "region": "會員訂閱",
      "duration": "1 個月",
      "description": "Claude Pro 月度訂閱，為日常工作、學習與創作提供更多可能。售價及交付方式確認後開放購買。",
      "notice": "售價及交付方式待確認，暫未開放購買。權益、額度和地區資格以服務商實際規則為準。",
      "features": [
        "寫作與分析",
        "程式碼協作",
        "專案工作區",
        "月度訂閱"
      ]
    },
    "en": {
      "name": "Claude Pro Membership",
      "region": "Membership",
      "duration": "1 month",
      "description": "Claude Pro monthly membership for work, learning and creation. Orders open once pricing and delivery are confirmed.",
      "notice": "Pricing and delivery are pending. Benefits, limits and regional eligibility follow the provider’s current terms.",
      "features": [
        "Writing & analysis",
        "Coding collaboration",
        "Project workspace",
        "Monthly subscription"
      ]
    }
  }
},
{
  "id": "gemini-pro",
  "shortName": "Gemini · Google AI Pro",
  "category": "Gemini",
  "price": null,
  "currency": "CNY",
  "status": "coming-soon",
  "i18n": {
    "zh-CN": {
      "name": "Gemini · Google AI Pro 会员",
      "region": "会员订阅",
      "duration": "1 个月",
      "description": "Gemini · Google AI Pro 月度订阅，为日常工作、学习与创作提供更多可能。售价及交付方式确认后开放购买。",
      "notice": "售价及交付方式待确认，暂未开放购买。权益、额度和地区资格以服务商实际规则为准。",
      "features": [
        "多模态创作",
        "深度研究",
        "Google AI 体验",
        "月度订阅"
      ]
    },
    "zh-TW": {
      "name": "Gemini · Google AI Pro 會員",
      "region": "會員訂閱",
      "duration": "1 個月",
      "description": "Gemini · Google AI Pro 月度訂閱，為日常工作、學習與創作提供更多可能。售價及交付方式確認後開放購買。",
      "notice": "售價及交付方式待確認，暫未開放購買。權益、額度和地區資格以服務商實際規則為準。",
      "features": [
        "多模態創作",
        "深度研究",
        "Google AI 體驗",
        "月度訂閱"
      ]
    },
    "en": {
      "name": "Gemini · Google AI Pro Membership",
      "region": "Membership",
      "duration": "1 month",
      "description": "Gemini · Google AI Pro monthly membership for work, learning and creation. Orders open once pricing and delivery are confirmed.",
      "notice": "Pricing and delivery are pending. Benefits, limits and regional eligibility follow the provider’s current terms.",
      "features": [
        "Multimodal creation",
        "Deep research",
        "Google AI experience",
        "Monthly subscription"
      ]
    }
  }
}
]

export function getProduct(id) {
  return products.find((item) => item.id === id)
}

export function localizeProduct(product, locale) {
  if (!product) return null
  const copy = product.i18n[locale] || product.i18n['zh-CN']
  return { ...product, ...copy }
}

export function formatPrice(value) {
  return Number(value).toFixed(2)
}

export function isPurchasable(product) {
  return Boolean(product && product.status !== 'coming-soon' && Number.isFinite(product.price) && product.price > 0)
}
