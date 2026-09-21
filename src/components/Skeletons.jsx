import { useSettings } from '../context/SettingsContext.jsx'

function Bone({ className = '' }) {
  return <div className={`skel ${className}`} />
}

export function ProductCardSkeleton() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-card">
      <Bone className="aspect-[16/10] w-full" />
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <Bone className="mb-2 h-3 w-24 rounded" />
        <Bone className="mb-3 h-5 w-11/12 rounded" />
        <div className="mb-3 hidden gap-2 md:flex">
          <Bone className="h-5 w-16 rounded-md" />
          <Bone className="h-5 w-16 rounded-md" />
          <Bone className="h-5 w-10 rounded-md" />
        </div>
        <Bone className="mb-2 hidden h-3 w-full rounded md:block" />
        <Bone className="mb-4 hidden h-3 w-4/5 rounded md:block" />
        <div className="mt-auto flex items-center justify-between border-t border-line/70 pt-3 md:pt-4">
          <div>
            <Bone className="mb-1 hidden h-2.5 w-8 rounded md:block" />
            <Bone className="h-4 w-20 rounded" />
          </div>
          <Bone className="h-8 w-8 rounded-md md:h-9 md:w-9" />
        </div>
      </div>
    </article>
  )
}

export function HomePageSkeleton() {
  const { t } = useSettings()
  return (
    <section className="pt-4 md:pt-12" aria-busy="true" aria-live="polite">
      <span className="sr-only">{t('loadingFeatured')}</span>
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Bone className="mb-3 h-8 w-32 rounded-xl sm:h-10 sm:w-36 md:h-12 md:w-44" />
          <Bone className="h-4 w-48 rounded sm:w-64" />
        </div>
        <Bone className="h-4 w-20 rounded" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {Array.from({ length: 4 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}

export function ProductsPageSkeleton() {
  const { t } = useSettings()
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">{t('loadingProducts')}</span>
      <div className="mb-8 mt-2 flex flex-col items-center sm:mb-12 sm:mt-4">
        <Bone className="mb-3 h-9 w-36 rounded-xl sm:mb-4 sm:h-12 sm:w-44 md:h-14 md:w-52" />
        <Bone className="h-4 w-40 rounded sm:h-5 sm:w-56" />
        <div className="mt-6 w-full max-w-2xl border-b border-line/80 sm:mt-8" />
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="h-fit w-full rounded-2xl bg-card p-4 shadow-sm lg:sticky lg:top-24 lg:w-[240px]">
          <Bone className="mb-2 h-3 w-10 rounded" />
          <Bone className="mb-5 h-10 w-full rounded-xl" />
          <Bone className="mb-2 h-3 w-10 rounded" />
          <Bone className="mb-1.5 h-10 w-full rounded-xl" />
          <Bone className="h-10 w-full rounded-xl" />
        </aside>
        <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {Array.from({ length: 4 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProductDetailSkeleton() {
  const { t } = useSettings()
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">{t('loadingDetail')}</span>
      <Bone className="mb-6 h-4 w-48 rounded" />
      <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
        <div className="grid md:grid-cols-[280px_minmax(0,1fr)]">
          <Bone className="min-h-[220px] w-full" />
          <div className="p-6 sm:p-8">
            <Bone className="mb-3 h-3 w-24 rounded" />
            <Bone className="mb-4 h-8 w-4/5 rounded" />
            <Bone className="mb-2 h-4 w-full rounded" />
            <Bone className="mb-6 h-4 w-3/4 rounded" />
            <div className="mb-8 flex gap-2">
              <Bone className="h-6 w-16 rounded-full" />
              <Bone className="h-6 w-16 rounded-full" />
            </div>
            <Bone className="mb-6 h-10 w-36 rounded" />
            <div className="flex gap-3">
              <Bone className="h-11 w-28 rounded-xl" />
              <Bone className="h-11 w-28 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
