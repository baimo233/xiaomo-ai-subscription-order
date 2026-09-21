import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useSettings } from '../context/SettingsContext.jsx'

export default function LoginPage() {
  const { user, login, register } = useAuth()
  const { t } = useSettings()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from && location.state.from !== '/login' ? location.state.from : '/'
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  if (user) return <Navigate to={from} replace />

  function submit(event) {
    event.preventDefault()
    setError('')
    if (mode === 'register' && password !== confirm) {
      setError(t('passwordMismatch'))
      return
    }
    const result = mode === 'login' ? login(username, password) : register(username, password)
    if (!result.ok) {
      setError(t(result.error))
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="mx-auto max-w-md pt-8">
      <h1 className="mb-2 text-center text-4xl font-black tracking-tight">
        {mode === 'login' ? t('login') : t('register')}
      </h1>
      <p className="mb-8 text-center text-sm text-muted">{t('loginHint')}</p>

      <form onSubmit={submit} className="rounded-2xl bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-canvas p-1">
          <button
            type="button"
            onClick={() => {
              setMode('login')
              setError('')
            }}
            className={`h-10 rounded-lg text-[14px] font-medium ${
              mode === 'login' ? 'bg-card text-ink shadow-sm' : 'text-muted'
            }`}
          >
            {t('login')}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register')
              setError('')
            }}
            className={`h-10 rounded-lg text-[14px] font-medium ${
              mode === 'register' ? 'bg-card text-ink shadow-sm' : 'text-muted'
            }`}
          >
            {t('register')}
          </button>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-[13px] text-muted">{t('username')}</span>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="h-11 w-full rounded-xl border border-line bg-card px-3.5 outline-none focus:border-brand"
            autoComplete="username"
            required
          />
        </label>
        <label className="mt-4 block">
          <span className="mb-1.5 block text-[13px] text-muted">{t('password')}</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 w-full rounded-xl border border-line bg-card px-3.5 outline-none focus:border-brand"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required
          />
        </label>
        {mode === 'register' ? (
          <label className="mt-4 block">
            <span className="mb-1.5 block text-[13px] text-muted">{t('passwordConfirm')}</span>
            <input
              type="password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              className="h-11 w-full rounded-xl border border-line bg-card px-3.5 outline-none focus:border-brand"
              autoComplete="new-password"
              required
            />
          </label>
        ) : null}

        {error ? <p className="mt-4 text-[13px] text-warn">{error}</p> : null}

        <button
          type="submit"
          className="mt-6 h-11 w-full rounded-xl bg-brand text-[14px] font-medium text-white hover:bg-brand-hover"
        >
          {mode === 'login' ? t('login') : t('register')}
        </button>
        <p className="mt-4 text-center text-[12px] leading-5 text-muted">{t('loginRequired')}</p>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        <Link to="/products" className="text-brand">
          {t('backToProducts')}
        </Link>
      </p>
    </div>
  )
}
