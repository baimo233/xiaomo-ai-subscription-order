import NoticeDetail from '../components/NoticeDetail.jsx'
import { useSettings } from '../context/SettingsContext.jsx'

export default function NoticePage() {
  const { t } = useSettings()
  return (
    <div className="pt-6">
      <h1 className="mb-6 text-center text-4xl font-black tracking-tight">{t('buyNotice')}</h1>
      <NoticeDetail />
    </div>
  )
}
