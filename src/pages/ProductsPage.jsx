import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import CategorySidebar from '../components/CategorySidebar.jsx'
import PromotionCarousel from '../components/PromotionCarousel.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { ProductsPageSkeleton } from '../components/Skeletons.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import { catalogProducts as products } from '../data/products.js'
import { useSkeleton } from '../hooks/useSkeleton.js'

export default function ProductsPage() {
  const { query, setQuery } = useOutletContext()
  const { t, locale } = useSettings()
  const [category, setCategory] = useState('all')
  const loading = useSkeleton(760)

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return products.filter((product) => {
      const copy = product.i18n[locale] || product.i18n['zh-CN']
      const matchCategory = category === 'all' || product.category === category
      const matchQuery =
        !keyword ||
        copy.name.toLowerCase().includes(keyword) ||
        product.shortName.toLowerCase().includes(keyword)
      return matchCategory && matchQuery
    })
  }, [category, query, locale])

  if (loading) return <ProductsPageSkeleton />

  return (
    <div>
      <div className="catalog-heading">
        <h1 className="mb-3 text-3xl font-black tracking-tight sm:mb-4 sm:text-4xl md:text-5xl">
          {t('productsCenter')}
        </h1>
        <p className="max-w-2xl text-sm text-muted sm:text-base">
          {t('collectionDescription')}
        </p>
      </div>

      <PromotionCarousel />
      <div className="flex flex-col gap-8 lg:flex-row">
        <CategorySidebar
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
        />
        <div className="min-w-0 flex-1">
          {filtered.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} delay={index * 50} />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl bg-card px-6 py-16 text-center text-muted">
              {t('noProducts')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
