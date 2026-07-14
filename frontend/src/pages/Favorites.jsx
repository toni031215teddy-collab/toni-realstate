import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import PropertyCard from '../components/PropertyCard'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F2' }}>

      {/* Header */}
      <div className="relative text-white py-16 px-4"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
            ❤️ Saved Properties
          </h1>
          <p className="text-gray-200">
            {favorites.length > 0
              ? `You have ${favorites.length} saved propert${favorites.length === 1 ? 'y' : 'ies'}`
              : 'Properties you save will appear here'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {favorites.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-8xl mb-6">🤍</div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: '#0B1F3A' }}>No saved properties yet</h2>
            <p className="text-gray-500 mb-8">
              Click the ❤️ heart on any property to save it here for later.
            </p>
            <Link to="/properties"
              className="inline-block px-8 py-3 rounded-xl font-bold transition-all"
              style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
              Browse Properties
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500 text-sm">
                <span className="font-semibold" style={{ color: '#0B1F3A' }}>{favorites.length}</span> saved
              </p>
              <Link to="/properties" className="text-sm font-medium" style={{ color: '#D4AF37' }}>
                + Browse more
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map(p => (
                <PropertyCard key={p.id} property={{
                  ...p,
                  type: p.type === 'sale' || p.type === 'Sale' ? 'Sale' : 'Rent',
                }} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
