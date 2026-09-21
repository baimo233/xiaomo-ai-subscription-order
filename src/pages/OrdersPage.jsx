import { useSettings } from '../context/SettingsContext.jsx'
import SimplePage from './SimplePage.jsx'

export default function OrdersPage() {
  const { t } = useSettings()
  return (
    <SimplePage title={t('orderHistory')}>
      <p>{t('noOrders')}</p>
    </SimplePage>
  )
}
