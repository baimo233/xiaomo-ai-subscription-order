import BrandMark from './BrandMark.jsx'
import { useSettings } from '../context/SettingsContext.jsx'

const CATEGORIES = [
  { id: 'all', labelKey: 'allProducts' },
  { id: 'ChatGPT', label: 'ChatGPT' },
  { id: 'Claude', label: 'Claude' },
  { id: 'Gemini', label: 'Gemini' },
]

export default function CategorySidebar({ query, onQueryChange, category, onCategoryChange }) {
  const { t } = useSettings()

  return (
    <aside className="category-sidebar h-fit w-full shrink-0 rounded-2xl bg-card p-4 shadow-sm lg:sticky lg:top-24 lg:w-[240px]">
      <p className="category-label mb-2 text-[12px] text-muted">{t('search')}</p>
      <input
        aria-label={t('search')}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={t('searchPlaceholder')}
        className="mb-5 h-10 w-full rounded-xl border border-line bg-card px-3 text-[13px] outline-none placeholder:text-muted/70 focus:border-brand"
      />
      <p className="category-label mb-2 flex items-center gap-2 text-[12px] font-medium">
        <span className="h-3 w-0.5 rounded-full bg-brand" />
        {t('category')}
      </p>
      <div className="category-options flex flex-col gap-1.5">
        {CATEGORIES.map((item) => {
          const active = item.id === category
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => onCategoryChange(item.id)}
              className={`category-option flex h-10 items-center gap-2 rounded-xl px-3 text-left text-[13px] font-medium transition ${
                active ? 'bg-brand text-white' : 'text-ink hover:bg-canvas'
              }`}
            >
              {item.id !== 'all' ? (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white">
                  <BrandMark brand={item.id} className="h-4 w-4" />
                </span>
              ) : null}
              {item.labelKey ? t(item.labelKey) : item.label}
            </button>
          )
        })}
      </div>
    </aside>
  )
}
