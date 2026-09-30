import { useEffect, useState } from 'react'
import { PromotionsContext } from './promotionsStore.js'

export function PromotionsProvider({ children }) {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const refresh = () => setNow(Date.now())
    const timer = setInterval(refresh, 1000)
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      clearInterval(timer)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [])
  return <PromotionsContext.Provider value={now}>{children}</PromotionsContext.Provider>
}
