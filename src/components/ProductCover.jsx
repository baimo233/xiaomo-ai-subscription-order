import { ChatGPTLogo } from './ChatGPTLogo.jsx'

export default function ProductCover({ className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-soft ${className}`} aria-hidden="true">
      <div className="flex h-full min-h-full items-center justify-center">
        <ChatGPTLogo className="h-[46%] w-[46%] max-h-28 max-w-28 text-ink/80" />
      </div>
    </div>
  )
}
