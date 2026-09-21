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
