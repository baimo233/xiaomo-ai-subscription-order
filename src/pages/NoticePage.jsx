import NoticeDetail from '../components/NoticeDetail.jsx'
import { useSettings } from '../context/SettingsContext.jsx'

export default function NoticePage() {
  const { t } = useSettings()
  return (
    <div className="pt-2 sm:pt-6">
      <h1 className="mb-4 text-center text-3xl font-black tracking-tight sm:mb-6 sm:text-4xl">
        {t('buyNotice')}
      </h1>
      <NoticeDetail />
    </div>
  )
}
