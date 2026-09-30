const assets = { ChatGPT: 'chatgpt.svg', Claude: 'claude.svg', Gemini: 'gemini.png' }

export default function BrandMark({ brand = 'ChatGPT', className = '' }) {
  return <img src={`${import.meta.env.BASE_URL}brands/${assets[brand] || assets.ChatGPT}`} alt="" aria-hidden="true" className={`brand-mark ${className}`} draggable="false" />
}
