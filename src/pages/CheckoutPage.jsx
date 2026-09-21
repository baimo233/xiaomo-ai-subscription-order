import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { IconChevron, IconHome } from '../components/Icons.jsx'
import ProductCover from '../components/ProductCover.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import { formatPrice, getProduct, localizeProduct } from '../data/products.js'

function createOrderId() {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `XM${stamp}${rand}`
}

export default function CheckoutPage() {
  const { id } = useParams()
  const product = getProduct(id)
  const { t, locale } = useSettings()
  const copy = localizeProduct(product, locale)
  const location = useLocation()
  const navigate = useNavigate()
  const initialQty = Math.max(1, Number(location.state?.qty) || 1)
  const [qty, setQty] = useState(initialQty)
  const [contactType, setContactType] = useState('wechat')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [payment, setPayment] = useState('wechat')
  const [error, setError] = useState('')
  const payments = [
    { id: 'wechat', label: t('wechat') },
    { id: 'alipay', label: t('alipay') },
  ]

  const total = useMemo(() => (product ? product.price * qty : 0), [product, qty])

  if (!product) {
    return (
      <div className="rounded-2xl bg-card px-6 py-16 text-center">
        <p className="text-muted">{t('notFound')}</p>
        <Link to="/products" className="mt-4 inline-flex text-brand">
          {t('backToProducts')}
        </Link>
      </div>
    )
  }

  function submit(event) {
    event.preventDefault()
    if (!contact.trim() || !email.trim()) {
      setError(t('fillRequired'))
      return
    }
    const order = {
      id: createOrderId(),
      productId: product.id,
      name: copy.name,
      qty,
      total,
      payment,
      contactType,
      contact: contact.trim(),
      email: email.trim(),
      createdAt: new Date().toISOString(),
      status: '待支付',
    }
    const existing = JSON.parse(localStorage.getItem('xiaomo-lab-orders') || '[]')
    localStorage.setItem('xiaomo-lab-orders', JSON.stringify([order, ...existing]))
    navigate(`/order/${order.id}`, { state: { order } })
  }

  return (
    <div>
      <nav className="mb-6 flex items-center gap-2 text-[13px] text-muted">
        <IconHome className="h-3.5 w-3.5" />
        <Link to="/">{t('home')}</Link>
        <IconChevron />
        <span className="text-ink">{t('confirmOrder')}</span>
      </nav>

      <h1 className="mb-6 text-[32px] font-semibold tracking-tight">{t('confirmOrder')}</h1>

      <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <section className="overflow-hidden rounded-2xl bg-card">
            <div className="grid sm:grid-cols-[160px_minmax(0,1fr)]">
              <ProductCover className="min-h-[140px]" />
              <div className="p-5">
                <p className="text-[12px] text-muted">{product.category}</p>
                <h2 className="mt-1 text-[16px] font-semibold">{copy.name}</h2>
                {product.renewalOnly ? (
                  <p className="mt-2 text-[13px] font-medium text-warn">{t('renewalOnly')}</p>
                ) : null}
                <p className="mt-4 text-[22px] font-semibold">
                  {formatPrice(product.price)}
                  <span className="ml-1 text-[13px] font-normal text-muted">CNY</span>
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-card p-5 sm:p-6">
            <h2 className="text-[16px] font-semibold">{t('shippingInfo')}</h2>
            <div className="mt-4 grid gap-4">
              <label className="block">
                <span className="mb-1.5 block text-[13px] text-muted">{t('contact')}</span>
                <div className="mb-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setContactType('wechat')}
                    className={`h-10 rounded-xl border text-[13px] ${
                      contactType === 'wechat' ? 'border-brand bg-brand/10 text-brand' : 'border-line text-ink'
                    }`}
                  >
                    {t('wechat')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactType('qq')}
                    className={`h-10 rounded-xl border text-[13px] ${
                      contactType === 'qq' ? 'border-brand bg-brand/10 text-brand' : 'border-line text-ink'
                    }`}
                  >
                    QQ
                  </button>
                </div>
                <input
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  placeholder={contactType === 'wechat' ? t('wechatPlaceholder') : t('qqPlaceholder')}
                  className="h-11 w-full rounded-xl border border-line bg-card px-3.5 outline-none focus:border-brand"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[13px] text-muted">{t('email')}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="h-11 w-full rounded-xl border border-line bg-card px-3.5 outline-none focus:border-brand"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[13px] text-muted">{t('qty')}</span>
                <input
                  type="number"
                  min="1"
                  max="9"
                  value={qty}
                  onChange={(event) => setQty(Math.max(1, Number(event.target.value) || 1))}
                  className="h-11 w-24 rounded-xl border border-line bg-card px-3.5 outline-none focus:border-brand"
                />
              </label>
            </div>
            {error ? <p className="mt-3 text-[13px] text-warn">{error}</p> : null}
          </section>
        </div>

        <aside className="h-fit rounded-2xl bg-card p-5 sm:p-6">
          <h2 className="text-[16px] font-semibold">{t('payment')}</h2>
          <div className="mt-4 grid gap-2">
            {payments.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPayment(item.id)}
                className={`h-11 rounded-xl border px-4 text-left text-[14px] ${
                  payment === item.id ? 'border-brand bg-brand/10 text-brand' : 'border-line text-ink'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-baseline justify-between">
            <span className="text-[13px] text-muted">{t('payable')}</span>
            <span className="text-[24px] font-semibold">{formatPrice(total)} CNY</span>
          </div>
          <button
            type="submit"
            className="mt-5 h-11 w-full rounded-xl bg-brand text-[14px] font-medium text-white hover:bg-brand-hover"
          >
            {t('submitOrder')}
          </button>
          <p className="mt-3 text-[12px] leading-5 text-muted">{t('checkoutHint')}</p>
          <p className="mt-2 text-[12px] leading-5 text-warn">{t('paymentOnly')}</p>
        </aside>
      </form>
    </div>
  )
}
