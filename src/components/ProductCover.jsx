import BrandMark from './BrandMark.jsx'
export default function ProductCover({ product, className = '' }) {
  const brand = product?.category || 'ChatGPT'
  return <div className={`product-cover cover-${brand.toLowerCase()} ${className}`} aria-hidden="true">
    <div className="cover-orbit" /><div className="cover-orbit orbit-two" />
    <span className="cover-label">{brand === 'Gemini' ? 'GOOGLE AI' : brand.toUpperCase()}</span>
    <BrandMark brand={brand} className="cover-mark" />
    <span className="cover-plan">{product?.shortName?.replace(brand, '').trim() || 'MEMBERSHIP'}</span>
    <span className="cover-star">✦</span>
  </div>
}
