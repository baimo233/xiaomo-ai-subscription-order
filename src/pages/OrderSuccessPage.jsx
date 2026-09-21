import { Link, useLocation, useParams } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext.jsx'
import { formatPrice } from '../data/products.js'

function readOrder(orderId) {
  try {
    const list = JSON.parse(localStorage.getItem('xiaomo-lab-orders') || '[]')
    return list.find((item) => item.id === orderId) || null
  } catch {
    return null
  }
}

export default function OrderSuccessPage() {
  const { orderId } = useParams()
  const location = useLocation()
  const { t } = useSettings()
  const order = location.state?.order || readOrder(orderId)

  if (!order) {
    return (
      <div className="rounded-2xl bg-card px-6 py-16 text-center">
        <p className="text-muted">{t('orderMissing')}</p>
        <Link to="/products" className="mt-4 inline-flex text-brand">
          {t('backToProducts')}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-card p-8 text-center">
      <p className="text-[13px] text-ok">{t('orderCreated')}</p>
      <h1 className="mt-2 text-[32px] font-semibold tracking-tight">{t('waitPay')}</h1>
      <p className="mt-2 text-[14px] text-muted">{t('demoOrder')}</p>
      <dl className="mt-8 space-y-3 text-left text-[14px]">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">{t('orderId')}</dt>
          <dd className="font-medium">{order.id}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">{t('product')}</dt>
          <dd className="max-w-[240px] text-right">{order.name}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">{t('qty')}</dt>
          <dd>{order.qty}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">{t('payment')}</dt>
          <dd>{order.payment === 'alipay' ? t('alipay') : t('wechat')}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">{t('contact')}</dt>
          <dd className="text-right">
            {order.contactType === 'qq' ? 'QQ' : t('wechat')} {order.contact}
          </dd>
        </div>
      </dl>
      <Link
        to="/products"
        className="mt-8 inline-flex h-11 items-center rounded-xl bg-brand px-5 text-[14px] font-medium text-white hover:bg-brand-hover"
      >
        {t('keepBrowsing')}
      </Link>
    </div>
  )
}
