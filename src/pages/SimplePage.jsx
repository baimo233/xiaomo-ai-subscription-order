import { Link } from 'react-router-dom'
import { useSettings } from '../context/SettingsContext.jsx'

export default function SimplePage({ title, children }) {
  const { t } = useSettings()

  return (
    <div className="mx-auto max-w-2xl pt-8">
      <h1 className="mb-4 text-center text-4xl font-black tracking-tight">{title}</h1>
      <div className="rounded-2xl bg-card p-8 text-[14px] leading-7 text-muted shadow-sm">
        {children}
        <Link to="/products" className="mt-6 inline-flex text-brand">
          {t('backHome')}
        </Link>
      </div>
    </div>
  )
}
