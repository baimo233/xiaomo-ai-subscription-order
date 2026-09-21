import { useSettings } from '../context/SettingsContext.jsx'
import SimplePage from './SimplePage.jsx'

export default function RedeemPage() {
  const { t } = useSettings()
  return (
    <SimplePage title={t('redeemHistory')}>
      <p>{t('noRedeem')}</p>
    </SimplePage>
  )
}
