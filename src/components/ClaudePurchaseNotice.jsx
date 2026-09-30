import { useSettings } from '../context/SettingsContext.jsx'
import { claudeNoticeImages, claudeNotices } from '../data/claudeNotices.js'

function ExampleImage({ image, caption, linkLabel, width, height }) {
  const src = `${import.meta.env.BASE_URL}${image}`

  return (
    <figure className="mt-4 max-w-[720px]">
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        aria-label={`${caption} · ${linkLabel}`}
        className="block overflow-hidden rounded-xl border border-line focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
      >
        <img src={src} alt={caption} width={width} height={height} loading="lazy" decoding="async" className="h-auto w-full" />
      </a>
      <figcaption className="mt-2 text-[12px] leading-5 text-muted">{caption} · {linkLabel}</figcaption>
    </figure>
  )
}

export default function ClaudePurchaseNotice({ className = '' }) {
  const { locale } = useSettings()
  const copy = claudeNotices[locale] || claudeNotices['zh-CN']

  return (
    <section aria-label={copy.title} className={`glass-panel overflow-hidden rounded-2xl bg-card ${className}`}>
      <header className="border-b border-line px-5 py-5 sm:px-8 sm:py-6">
        <h2 className="flex items-center gap-2 text-[19px] font-semibold tracking-tight text-ink sm:text-[22px]">
          <span aria-hidden="true">⚠️</span>
          {copy.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink">{copy.intro}</p>
        <p className="mt-3 rounded-xl border border-warn/20 bg-warn/10 px-4 py-3 text-sm leading-6 font-semibold text-warn">
          {copy.warning}
        </p>
      </header>

      <div className="divide-y divide-line px-5 sm:px-8">
        <section className="py-6">
          <h3 className="text-base leading-7 font-semibold text-ink"><span aria-hidden="true">❌ </span>{copy.subscriptionTitle}</h3>
          <p className="mt-3 text-sm leading-7 text-ink">{copy.subscriptionText}</p>
          <p className="mt-1 text-sm leading-7 font-semibold text-warn">{copy.subscriptionCheck}</p>
          <ExampleImage image={claudeNoticeImages.subscription} caption={copy.subscriptionCaption} linkLabel={copy.viewImage} width={2082} height={1176} />
        </section>

        <section className="py-6">
          <h3 className="text-base leading-7 font-semibold text-ink"><span aria-hidden="true">❌ </span>{copy.billingTitle}</h3>
          <p className="mt-3 text-sm leading-7 font-medium text-warn">{copy.billingText}</p>
        </section>

        <section className="py-6">
          <h3 className="text-base leading-7 font-semibold text-ink"><span aria-hidden="true">❌ </span>{copy.bannedTitle}</h3>
          <p className="mt-3 text-sm leading-7 text-ink">{copy.bannedText}</p>
          <h4 className="mt-6 text-base leading-7 font-semibold text-ink"><span aria-hidden="true">🔎 </span>{copy.checkTitle}</h4>
          <ol className="mt-4 space-y-6">
            <li className="border-l-2 border-brand/30 pl-4 sm:pl-5">
              <h5 className="text-sm leading-7 font-semibold text-ink">{copy.chatTitle}</h5>
              <p className="mt-2 text-sm leading-7 text-ink">{copy.chatText}</p>
              <p className="mt-2 text-sm leading-7 font-semibold text-warn">{copy.chatWarning}</p>
              <ExampleImage image={claudeNoticeImages.chat} caption={copy.chatCaption} linkLabel={copy.viewImage} width={2672} height={1466} />
            </li>
            <li className="border-l-2 border-brand/30 pl-4 sm:pl-5">
              <h5 className="text-sm leading-7 font-semibold text-ink">{copy.upgradeTitle}</h5>
              <p className="mt-2 text-sm leading-7 text-ink">{copy.upgradeText}</p>
              <p className="mt-2 text-sm leading-7 font-semibold text-warn">{copy.upgradeWarning}</p>
              <ExampleImage image={claudeNoticeImages.upgrade} caption={copy.upgradeCaption} linkLabel={copy.viewImage} width={1798} height={608} />
            </li>
          </ol>
        </section>
      </div>

      <footer className="border-t border-line bg-warn/10 px-5 py-4 sm:px-8">
        <p className="text-sm leading-7 font-semibold text-warn"><span aria-hidden="true">❗ </span>{copy.finalWarning}</p>
      </footer>
    </section>
  )
}
