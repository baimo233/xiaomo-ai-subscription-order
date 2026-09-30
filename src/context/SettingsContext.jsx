import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { locales, messages } from '../i18n/messages.js'
import { validPalette } from '../data/appearance.js'

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const [locale, setLocaleState] = useState(() => localStorage.getItem('xiaomo-lab-locale') || 'zh-CN')
  const [theme, setThemeState] = useState(() => localStorage.getItem('xiaomo-lab-theme') || 'light')
  const [palette, setPaletteState] = useState(() => validPalette(localStorage.getItem('xiaomo-lab-palette')))

  useEffect(() => {
    localStorage.setItem('xiaomo-lab-palette', palette)
    document.documentElement.dataset.palette = palette
  }, [palette])

  useEffect(() => {
    localStorage.setItem('xiaomo-lab-locale', locale)
    document.documentElement.lang = locale === 'en' ? 'en' : locale
  }, [locale])

  useEffect(() => {
    localStorage.setItem('xiaomo-lab-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const value = useMemo(
    () => ({
      locale,
      theme,
      palette,
      setPalette(next) { setPaletteState(validPalette(next)) },
      locales,
      setLocale(next) {
        setLocaleState(next)
      },
      setTheme(next) {
        setThemeState(next)
      },
      toggleTheme() {
        setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
      },
      t(key) {
        return messages[locale]?.[key] ?? messages['zh-CN'][key] ?? key
      },
    }),
    [locale, theme, palette],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const value = useContext(SettingsContext)
  if (!value) throw new Error('useSettings must be used within SettingsProvider')
  return value
}
