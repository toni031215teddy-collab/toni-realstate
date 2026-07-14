import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function PropertyCard({ property }) {
  const { id, title, price, location, city, bedrooms, bathrooms, area, image, images, type } = property
  const { toggle, isFavorite } = useFavorites()
  const liked = isFavorite(id)

  const imgSrc = image || images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600'
  const isRent = type?.toLowerCase() === 'rent'

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Sale/Rent badge */}
        <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
          style={{ backgroundColor: isRent ? '#1e3f7a' : '#D4AF37', color: isRent ? '#fff' : '#0B1F3A' }}>
          {isRent ? 'For Rent' : 'For Sale'}
        </span>

        {/* ❤️ Favorite button */}
        <button
          onClick={e => { e.preventDefault(); toggle(property) }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ backgroundColor: liked ? '#e11d48' : 'rgba(255,255,255,0.9)' }}
          aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className="w-5 h-5 transition-all duration-200"
            style={{ fill: liked ? 'white' : 'none', stroke: liked ? 'white' : '#e11d48', strokeWidth: 2 }}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold truncate mb-1" style={{ color: '#0B1F3A' }}>{title}</h3>
        <p className="text-gray-500 text-sm flex items-center gap-1 mb-3">
          <span>📍</span> {city || location}
        </p>

        <p className="font-bold text-2xl mb-3" style={{ color: '#D4AF37' }}>
          {Number(price).toLocaleString()} <span className="text-base font-normal text-gray-400">ETB{isRent ? '/mo' : ''}</span>
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-gray-500 border-t pt-3 mb-4">
          {bedrooms > 0 && <span className="flex items-center gap-1">🛏 {bedrooms}</span>}
          <span className="flex items-center gap-1">🚿 {bathrooms}</span>
          <span className="flex items-center gap-1">📐 {area}m²</span>
        </div>

        <Link
          to={`/properties/${id}`}
          className="block text-center py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
          style={{ backgroundColor: '#0B1F3A', color: '#D4AF37' }}
          onMouseEnter={e => { e.target.style.backgroundColor = '#D4AF37'; e.target.style.color = '#0B1F3A' }}
          onMouseLeave={e => { e.target.style.backgroundColor = '#0B1F3A'; e.target.style.color = '#D4AF37' }}
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
