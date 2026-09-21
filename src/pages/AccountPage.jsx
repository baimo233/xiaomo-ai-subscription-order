import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useSettings } from '../context/SettingsContext.jsx'

export default function AccountPage() {
  const { user, logout } = useAuth()
  const { t } = useSettings()

  if (!user) {
    return (
      <div className="mx-auto max-w-md pt-8 text-center">
        <h1 className="mb-4 text-4xl font-black tracking-tight">{t('account')}</h1>
        <div className="rounded-2xl bg-card p-8 shadow-sm">
          <p className="text-[14px] leading-7 text-muted">{t('loginRequired')}</p>
          <Link
            to="/login"
            state={{ from: '/account' }}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-brand px-5 text-[14px] font-medium text-white hover:bg-brand-hover"
          >
            {t('goLogin')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md pt-8">
      <h1 className="mb-6 text-center text-4xl font-black tracking-tight">{t('account')}</h1>
      <div className="rounded-2xl bg-card p-8 shadow-sm">
        <p className="text-[13px] text-muted">{t('loggedInAs')}</p>
        <p className="mt-1 text-[22px] font-semibold">{user.username}</p>
        <p className="mt-4 text-[14px] leading-7 text-muted">{t('accountBody')}</p>
        <button
          type="button"
          onClick={logout}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-canvas px-5 text-[14px] font-medium text-ink hover:bg-soft"
        >
          {t('logout')}
        </button>
      </div>
    </div>
  )
}
