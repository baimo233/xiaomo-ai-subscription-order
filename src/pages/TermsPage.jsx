import SimplePage from './SimplePage.jsx'
import { useSettings } from '../context/SettingsContext.jsx'

export default function TermsPage() {
  const { t } = useSettings()
  return (
    <SimplePage title={t('terms')}>
      <p>{t('termsBody')}</p>
    </SimplePage>
  )
}
