import { Link } from 'react-router-dom'
import ProductCover from '../components/ProductCover.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import { formatPrice, getProduct, localizeProduct } from '../data/products.js'

export default function CartPage() {
  const { items, total, setQty, removeItem, clear } = useCart()
  const { t, locale } = useSettings()
  const rows = items
    .map((item) => ({ ...item, product: localizeProduct(getProduct(item.id), locale) }))
    .filter((item) => item.product)

  return (
    <div>
      <h1 className="mb-6 text-[32px] font-semibold tracking-tight">{t('cart')}</h1>
      {rows.length === 0 ? (
        <div className="rounded-2xl bg-card px-6 py-16 text-center">
          <p className="text-muted">{t('cartEmpty')}</p>
          <Link to="/products" className="mt-4 inline-flex text-brand">
            {t('goShop')}
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-4">
            {rows.map(({ product, qty }) => (
              <article key={product.id} className="overflow-hidden rounded-2xl bg-card">
                <div className="grid sm:grid-cols-[140px_minmax(0,1fr)]">
                  <ProductCover className="min-h-[120px]" />
                  <div className="flex flex-col gap-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[12px] text-muted">{product.category}</p>
                        <h2 className="mt-1 text-[16px] font-semibold">{product.name}</h2>
                        {product.renewalOnly ? (
                          <p className="mt-1 text-[12px] font-medium text-warn">{t('renewalOnly')}</p>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="text-[13px] text-muted hover:text-ink"
                      >
                        {t('remove')}
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <p className="text-[18px] font-semibold">
                        {formatPrice(product.price)}
                        <span className="ml-1 text-[12px] font-normal text-muted">CNY</span>
                      </p>
                      <input
                        type="number"
                        min="1"
                        max="9"
                        value={qty}
                        onChange={(event) =>
                          setQty(product.id, Math.max(1, Number(event.target.value) || 1))
                        }
                        className="h-9 w-16 rounded-xl border border-line bg-card px-2 text-center outline-none focus:border-brand"
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <aside className="h-fit rounded-2xl bg-card p-6">
            <p className="text-[13px] text-muted">{t('total')}</p>
            <p className="mt-1 text-[28px] font-semibold">{formatPrice(total)} CNY</p>
            <Link
              to={`/checkout/${rows[0].product.id}`}
              state={{ qty: rows[0].qty }}
              className="mt-5 flex h-11 items-center justify-center rounded-xl bg-brand text-[14px] font-medium text-white hover:bg-brand-hover"
            >
              {t('checkoutFirst')}
            </Link>
            <button
              type="button"
              onClick={clear}
              className="mt-3 w-full text-center text-[13px] text-muted hover:text-ink"
            >
              {t('clearCart')}
            </button>
          </aside>
        </div>
      )}
    </div>
  )
}
