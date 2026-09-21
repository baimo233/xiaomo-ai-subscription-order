import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { HomePageSkeleton } from '../components/Skeletons.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import { products } from '../data/products.js'
import { useSkeleton } from '../hooks/useSkeleton.js'

export default function HomePage() {
  const loading = useSkeleton(720)
  const { t } = useSettings()

  if (loading) return <HomePageSkeleton />

  return (
    <section className="pt-8 md:pt-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">{t('featured')}</h1>
          <p className="mt-2 text-sm text-muted">{t('featuredDesc')}</p>
        </div>
        <Link
          to="/products"
          className="shrink-0 text-sm font-semibold text-muted transition-colors hover:text-ink"
        >
          {t('viewAll')}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} delay={index * 60} />
        ))}
      </div>
    </section>
  )
}
