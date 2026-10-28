import { useSettings } from '../context/SettingsContext.jsx'
import { claudeMaxTerms } from '../data/claudeMaxTerms.js'

export default function ClaudeMaxTerms({ className = '' }) {
  const { locale } = useSettings()
  const copy = claudeMaxTerms[locale] || claudeMaxTerms['zh-CN']
  const paragraph = 'text-sm leading-7 text-ink'

  return (
    <section aria-label={copy.title} className={`glass-panel overflow-hidden rounded-2xl bg-card ${className}`}>
      <header className="border-b border-line px-5 py-5 sm:px-8 sm:py-6">
        <h2 className="text-xl font-semibold text-ink">{copy.title}</h2>
        <div className="mt-5 space-y-3">
          <div className="rounded-xl border border-warn/30 bg-warn/10 p-4">
            <h3 className="text-base leading-7 font-semibold text-warn">{copy.banTitle}</h3>
            <p className="mt-2 text-sm leading-7 text-ink">{copy.banText}</p>
          </div>
          <div className="rounded-xl border border-brand/25 bg-brand/5 p-4">
            <h3 className="text-base leading-7 font-semibold text-ink">{copy.kycTitle}</h3>
            <p className={`mt-2 ${paragraph}`}>{copy.kycText}</p>
          </div>
        </div>
      </header>

      <div className="divide-y divide-line px-5 sm:px-8">
        <section className="space-y-3 py-6">
          <h3 className="text-base leading-7 font-semibold text-ink">{copy.overviewTitle}</h3>
          <p className={paragraph}>{copy.overviewText}</p>
          <p className="text-sm leading-7 font-medium text-warn">{copy.channelNote}</p>
        </section>

        <section className="space-y-4 py-6">
          <h3 className="text-base font-semibold text-ink">{copy.purchaseTitle}</h3>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-ink">
            {copy.steps.map(step => <li key={step} className="pl-1">{step}</li>)}
          </ol>
          <p className="rounded-xl border border-line bg-canvas p-4 text-sm leading-7 text-muted">{copy.entryNote}</p>
          <p className="text-sm leading-7 font-medium text-warn">{copy.credentialNote}</p>
          <p className={paragraph}>{copy.retryNote}</p>
        </section>

        <section className="space-y-4 py-6">
          <h3 className="text-base font-semibold text-ink">{copy.warrantyTitle}</h3>
          <p className={paragraph}>{copy.warrantyText}</p>
          <div className="rounded-xl border border-brand/25 bg-brand/5 p-4 sm:p-5">
            <p className="text-xs font-semibold text-muted">{copy.formulaLabel}</p>
            <p className="mt-2 text-base leading-8 font-semibold break-words text-ink">{copy.formula}</p>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-ink">
            {copy.warrantyRules.map(rule => <li key={rule}>{rule}</li>)}
          </ul>
          <p className="text-sm leading-7 font-medium text-warn">{copy.banNote}</p>
        </section>

        <section className="py-6">
          <h3 className="text-base font-semibold text-ink">{copy.usageTitle}</h3>
          <ul className="mt-4 space-y-3">
            {copy.usage.map(item => (
              <li key={item.title} className="rounded-xl border border-line bg-canvas p-4">
                <h4 className="text-sm leading-7 font-semibold text-ink">{item.title}</h4>
                <p className={`mt-2 ${paragraph}`}>{item.text}</p>
                {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-brand underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-brand">ping0.cc ↗</a>}
                {item.note && <p className="mt-2 text-xs leading-6 text-muted">{item.note}</p>}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-6 text-muted">{copy.usageNote}</p>
        </section>

        <section className="space-y-3 py-6">
          <h3 className="text-base font-semibold text-ink">{copy.supportTitle}</h3>
          <p className={paragraph}>{copy.supportText}</p>
          <p className="text-sm leading-7 font-semibold text-warn">{copy.finalWarning}</p>
          <p className="text-xs leading-6 text-muted">{copy.rightsNote}</p>
        </section>
      </div>
    </section>
  )
}
