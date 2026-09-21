import { useSettings } from '../context/SettingsContext.jsx'
import { notices } from '../data/notices.js'

export default function NoticeDetail({ className = '' }) {
  const { t, locale } = useSettings()
  const copy = notices[locale] || notices['zh-CN']

  return (
    <section className={`overflow-hidden rounded-2xl bg-card shadow-sm ${className}`}>
      <div className="flex items-center gap-2 border-b border-line px-6 py-4 sm:px-8">
        <span className="h-4 w-1 rounded-full bg-brand" />
        <h2 className="text-[15px] font-semibold">{t('detailInfo')}</h2>
      </div>

      <div className="space-y-5 px-6 py-6 sm:px-8">
        <h3 className="text-[22px] leading-8 font-black tracking-tight text-ink md:text-[26px]">
          <span className="mr-2" aria-hidden="true">
            📢
          </span>
          {copy.lead}
        </h3>

        <p className="text-[14px] leading-7 text-ink">{copy.intro}</p>

        <div>
          <p className="mb-2 text-[14px] font-semibold text-ink">
            <span className="mr-1" aria-hidden="true">
              ⚠️
            </span>
            {t('warrantyScope')}：
          </p>
          <ul className="space-y-2 text-[14px] leading-7 text-ink">
            {copy.warranty.map((item) => (
              <li key={item}>
                --{' '}
                {item.includes('不质保封号') || item.includes('不質保封號') ? (
                  <>
                    {item.split(/(不质保封号|不質保封號)/).map((part, index) =>
                      part === '不质保封号' || part === '不質保封號' ? (
                        <span key={index} className="font-semibold text-warn">
                          {part}
                        </span>
                      ) : (
                        <span key={index}>{part}</span>
                      ),
                    )}
                  </>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 text-[14px] font-semibold text-ink">
            <span className="mr-1" aria-hidden="true">
              ⚠️
            </span>
            {t('attention')}：
          </p>
          <ul className="space-y-2 text-[14px] leading-7 text-ink">
            {copy.notes.map((item) => (
              <li key={item}>-- {item}</li>
            ))}
            <li>
              -- {copy.ipBefore}，
              <a
                href={copy.ipCheckUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brand underline underline-offset-2"
              >
                {copy.ipCheckLabel}：{copy.ipCheckUrl}
              </a>
              ，{copy.ipAfter}
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
