import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

const AGENT_PHONE = '251911000000'

export default function PropertyCard({ property }) {
  const { id, title, price, location, city, bedrooms, bathrooms, area, image, images, type } = property
  const { toggle, isFavorite } = useFavorites()
  const liked = isFavorite(id)
  const [copied, setCopied] = useState(false)

  const imgSrc = image || images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600'
  const isRent = type?.toLowerCase() === 'rent'
  const priceUSD = Math.round(Number(price) / 57)

  const waMessage = encodeURIComponent(
    `Hello! I'm interested in this property:\n*${title}*\nLocation: ${city || location}\nPrice: ${Number(price).toLocaleString()} ETB\n\nPlease send more details.`
  )
  const waLink = `https://wa.me/${AGENT_PHONE}?text=${waMessage}`
  const propertyUrl = `${window.location.origin}/properties/${id}`

  const handleShare = async (e) => {
    e.preventDefault()
    if (navigator.share) {
      try {
        await navigator.share({ title, text: `Check out this property: ${title}`, url: propertyUrl })
      } catch {}
    } else {
      navigator.clipboard.writeText(propertyUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">

      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <Link to={`/properties/${id}`}>
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Sale/Rent badge */}
        <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
          style={{ backgroundColor: isRent ? '#1e3f7a' : '#D4AF37', color: isRent ? '#fff' : '#0B1F3A' }}>
          {isRent ? 'For Rent' : 'For Sale'}
        </span>

        {/* Top right actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {/* Favorite */}
          <button
            onClick={e => { e.preventDefault(); toggle(property) }}
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
            style={{ backgroundColor: liked ? '#e11d48' : 'rgba(255,255,255,0.92)' }}
            aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="w-4 h-4"
              style={{ fill: liked ? 'white' : 'none', stroke: liked ? 'white' : '#e11d48', strokeWidth: 2 }}
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
            style={{ backgroundColor: copied ? '#16a34a' : 'rgba(255,255,255,0.92)' }}
            aria-label="Share property"
            title={copied ? 'Link copied!' : 'Share'}
          >
            {copied ? (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" style={{ color: '#0B1F3A' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/properties/${id}`}>
          <h3 className="text-base font-bold truncate mb-1 hover:underline" style={{ color: '#0B1F3A' }}>{title}</h3>
        </Link>
        <p className="text-gray-500 text-sm flex items-center gap-1 mb-2">
          <span>📍</span> {city || location}
        </p>

        {/* Price */}
        <div className="mb-3">
          <p className="font-bold text-xl leading-tight" style={{ color: '#D4AF37' }}>
            {Number(price).toLocaleString()}
            <span className="text-sm font-normal text-gray-400"> ETB{isRent ? '/mo' : ''}</span>
          </p>
          <p className="text-xs text-gray-400">≈ ${priceUSD.toLocaleString()} USD</p>
        </div>

        {/* Features */}
        <div className="flex items-center gap-3 text-xs text-gray-500 border-t pt-3 mb-4">
          {bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {bedrooms} bed
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {bathrooms} bath
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {area}m²
          </span>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-3 gap-2 mt-auto">
          {/* View Details */}
          <Link
            to={`/properties/${id}`}
            className="col-span-1 text-center py-2.5 rounded-xl font-semibold text-xs transition-all"
            style={{ backgroundColor: '#0B1F3A', color: '#D4AF37' }}
          >
            Details
          </Link>

          {/* WhatsApp */}
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="col-span-1 flex items-center justify-center gap-1 py-2.5 rounded-xl font-semibold text-xs text-white transition-all"
            style={{ backgroundColor: '#25D366' }}
            title="Chat on WhatsApp"
          >
            <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="hidden sm:inline">Chat</span>
          </a>

          {/* Call */}
          <a
            href={`tel:+${AGENT_PHONE}`}
            className="col-span-1 flex items-center justify-center gap-1 py-2.5 rounded-xl font-semibold text-xs transition-all"
            style={{ backgroundColor: '#EEF1F8', color: '#0B1F3A' }}
            title="Call agent"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="hidden sm:inline">Call</span>
          </a>
        </div>
      </div>
    </div>
  )
}
