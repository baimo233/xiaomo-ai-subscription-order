import SimplePage from './SimplePage.jsx'
import { useSettings } from '../context/SettingsContext.jsx'

export default function PrivacyPage() {
  const { t } = useSettings()
  return (
    <SimplePage title={t('privacy')}>
      <p>{t('privacyBody')}</p>
    </SimplePage>
  )
}
