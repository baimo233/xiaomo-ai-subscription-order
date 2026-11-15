import { useSettings } from '../context/SettingsContext.jsx'
import { geminiUltraDetails } from '../data/geminiUltraDetails.js'
import { IconLock } from './Icons.jsx'

const panel = 'rounded-2xl border p-4 sm:p-6'
const heading = 'text-lg font-semibold tracking-tight'
const body = 'text-sm leading-7 text-ink'
const link = 'font-medium text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand'
const orderAccent = 'text-amber-900 [html.dark_&]:text-amber-200'
const warrantyAccent = 'text-rose-800 [html.dark_&]:text-rose-200'

export default function GeminiUltraDetails({ verificationNotice }) {
  const { locale, t } = useSettings()
  const copy = geminiUltraDetails[locale] ?? geminiUltraDetails['zh-CN']

  return (
    <section aria-labelledby="gemini-intro-title" className="mt-5 space-y-4">
      <header className={`${panel} border-brand/25 bg-brand/5`}>
        <p className="text-xs font-semibold tracking-[0.16em] text-brand">{copy.eyebrow}</p>
        <h2 id="gemini-intro-title" className="mt-2 text-xl leading-snug font-semibold tracking-tight sm:text-[26px]">{copy.title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">{copy.channel}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-2">
            {copy.badges.map(badge => <li key={badge} className="rounded-md border border-brand/20 bg-card/70 px-2.5 py-1 text-xs font-medium text-brand">{badge}</li>)}
          </ul>
          <a href="https://one.google.com/about/google-ai-plans/" target="_blank" rel="noreferrer" className={`${link} text-xs`}>{t('officialPlan')} ↗</a>
        </div>
      </header>

      <section className={`${panel} border-amber-300 bg-amber-50 [html.dark_&]:border-amber-800 [html.dark_&]:bg-amber-950/70`}>
        <h3 className={`${heading} ${orderAccent}`}>{copy.orderTitle}</h3>
        <p className={`mt-2 ${body}`}><strong>{copy.orderText}</strong> {copy.customOrderText}</p>
        <p className={`mt-2 text-sm leading-7 font-semibold ${orderAccent}`}>{verificationNotice}</p>
      </section>

      <section className={`${panel} glass-panel border-line bg-card`}>
        <h3 className={heading}>{copy.deliveryTitle}</h3>
        <p className={`mt-2 ${body}`}>{copy.deliveryText}</p>
        <p className="mt-3 rounded-lg bg-canvas px-3 py-2.5 text-sm leading-7 text-ink">
          <code className="font-mono text-[13px] break-words">{copy.credentialFields.join(' —— ')}</code>
        </p>
        <p className={`mt-3 ${body}`}>
          {copy.twoFaLabel}{' '}
          <a href="https://2fa.run/" target="_blank" rel="noreferrer" className={link}>{copy.twoFaLinkLabel} ↗</a>
        </p>
        <p className="mt-2 text-xs leading-6 text-muted">{copy.credentialNote}</p>
      </section>

      <section className={`${panel} glass-panel border-line bg-card`}>
        <h3 className={`${heading} flex items-center gap-2`}><IconLock className="h-4 w-4" />{copy.usageTitle}</h3>
        <ul className={`mt-3 list-disc space-y-1 pl-5 ${body}`}>
          {copy.usageTips.map(tip => <li key={tip}>{tip}</li>)}
        </ul>
      </section>

      <section className={`${panel} border-rose-200 bg-rose-50 [html.dark_&]:border-rose-900 [html.dark_&]:bg-rose-950/70`}>
        <h3 className={`${heading} ${warrantyAccent}`}>{copy.warrantyTitle}</h3>
        <p className={`mt-2 text-base leading-7 font-semibold ${warrantyAccent}`}>{copy.warrantyLead}</p>
        <p className={`mt-3 ${body}`}>{copy.warrantySupport}</p>
        <p className={`mt-2 ${body}`}>{copy.warrantyScope}</p>
        <p className={`mt-2 text-sm leading-7 font-semibold ${warrantyAccent}`}>{copy.warrantyCustom}</p>
      </section>
    </section>
  )
}
