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
    <section className="pt-4 md:pt-12">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">{t('featured')}</h1>
          <p className="mt-2 text-sm text-muted">{t('featuredDesc')}</p>
        </div>
        <Link
          to="/products"
          className="shrink-0 self-start text-sm font-semibold text-muted transition-colors hover:text-ink sm:self-auto"
        >
          {t('viewAll')}
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} delay={index * 60} />
        ))}
      </div>
    </section>
  )
}
