import { useState, useEffect } from 'react'
import PropertyCard from '../components/PropertyCard'
import api from '../api/axios'
import { useLang } from '../context/LanguageContext'

const cities = ['All Cities', 'Addis Ababa', 'Dire Dawa', 'Hawassa', 'Bahir Dar', 'Adama']

const priceRanges = [
  { label: 'Any Price', min: '', max: '' },
  { label: 'Under 500K ETB',  min: '',        max: '500000' },
  { label: '500K – 2M ETB',   min: '500000',  max: '2000000' },
  { label: '2M – 5M ETB',     min: '2000000', max: '5000000' },
  { label: '5M – 10M ETB',    min: '5000000', max: '10000000' },
  { label: 'Above 10M ETB',   min: '10000000',max: '' },
]

// Fallback properties shown when backend is unavailable
const FALLBACK_PROPERTIES = [
  { id: 1,  title: 'Luxury 3-Bedroom Apartment in Bole', price: 4500000, location: 'Bole, near Edna Mall', city: 'Addis Ababa', bedrooms: 3, bathrooms: 2, area: 150, type: 'Sale', status: 'available', images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600'] },
  { id: 2,  title: 'Prime Office Space in Kazanchis', price: 120000, location: 'Kazanchis Business District', city: 'Addis Ababa', bedrooms: 0, bathrooms: 2, area: 250, type: 'Rent', status: 'available', images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'] },
  { id: 3,  title: 'Modern Villa with Garden in Old Airport', price: 12500000, location: 'Old Airport', city: 'Addis Ababa', bedrooms: 5, bathrooms: 4, area: 380, type: 'Sale', status: 'available', images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600'] },
  { id: 4,  title: 'Cozy 2-Bedroom Apartment in CMC', price: 2800000, location: 'CMC, Addis Ababa', city: 'Addis Ababa', bedrooms: 2, bathrooms: 1, area: 95, type: 'Sale', status: 'available', images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600'] },
  { id: 5,  title: 'Spacious Family Home in Megenagna', price: 85000, location: 'Megenagna, Addis Ababa', city: 'Addis Ababa', bedrooms: 4, bathrooms: 3, area: 280, type: 'Rent', status: 'available', images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600'] },
  { id: 6,  title: 'Studio Apartment in Piassa', price: 35000, location: 'Piassa, Addis Ababa', city: 'Addis Ababa', bedrooms: 1, bathrooms: 1, area: 45, type: 'Rent', status: 'available', images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600'] },
  { id: 7,  title: '4-Bedroom Villa in Ayat', price: 8900000, location: 'Ayat, Addis Ababa', city: 'Addis Ababa', bedrooms: 4, bathrooms: 3, area: 320, type: 'Sale', status: 'available', images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600'] },
  { id: 8,  title: 'Commercial Space in Bole Atlas', price: 95000, location: 'Bole Atlas, Addis Ababa', city: 'Addis Ababa', bedrooms: 0, bathrooms: 2, area: 180, type: 'Rent', status: 'available', images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600'] },
  { id: 9,  title: 'New 3-Bedroom Condo in Summit', price: 5200000, location: 'Summit, Addis Ababa', city: 'Addis Ababa', bedrooms: 3, bathrooms: 2, area: 160, type: 'Sale', status: 'available', images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600'] },
  { id: 10, title: 'Penthouse in Bole Medhanealem', price: 18000000, location: 'Bole Medhanealem', city: 'Addis Ababa', bedrooms: 4, bathrooms: 3, area: 420, type: 'Sale', status: 'available', images: ['https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600'] },
  { id: 11, title: 'Affordable Apartment in Gerji', price: 1900000, location: 'Gerji, Addis Ababa', city: 'Addis Ababa', bedrooms: 2, bathrooms: 1, area: 80, type: 'Sale', status: 'available', images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600'] },
  { id: 12, title: 'Office Building in Friendship Area', price: 250000, location: 'Friendship, Addis Ababa', city: 'Addis Ababa', bedrooms: 0, bathrooms: 4, area: 500, type: 'Rent', status: 'available', images: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600'] },
]

export default function Properties() {
  const [properties, setProperties] = useState(FALLBACK_PROPERTIES)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')
  const [search, setSearch]     = useState('')
  const [type, setType]         = useState('')
  const [minBeds, setMinBeds]   = useState('')
  const [city, setCity]         = useState('')
  const [priceRange, setPriceRange] = useState(priceRanges[0])
  const [showFilters, setShowFilters] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true)
      setError('')
      try {
        const params = {}
        if (search)  params.search    = search
        if (type)    params.type      = type
        if (minBeds) params.bedrooms  = minBeds
        if (city && city !== 'All Cities') params.city = city
        if (priceRange.min) params.min_price = priceRange.min
        if (priceRange.max) params.max_price = priceRange.max

        const res = await api.get('/properties', { params })
        const items = res.data.data ?? res.data
        if (Array.isArray(items) && items.length > 0) {
          setProperties(items)
        } else {
          setProperties(FALLBACK_PROPERTIES)
        }
      } catch {
        // Backend unavailable — use fallback data
        setProperties(FALLBACK_PROPERTIES)
      } finally {
        setLoading(false)
      }
    }
    const timer = setTimeout(fetchProperties, 400)
    return () => clearTimeout(timer)
  }, [search, type, minBeds, city, priceRange])

  const normalized = properties.map(p => ({
    ...p,
    type: p.type === 'sale' ? 'Sale' : 'Rent',
  }))

  const activeFiltersCount = [
    type, minBeds,
    city && city !== 'All Cities' ? city : '',
    priceRange.min || priceRange.max ? '1' : '',
  ].filter(Boolean).length

  const clearFilters = () => {
    setSearch('')
    setType('')
    setMinBeds('')
    setCity('')
    setPriceRange(priceRanges[0])
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F2' }}>

      {/* Page Header */}
      <div className="relative text-white py-32 px-4"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(11,31,58,0.75)' }} />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ backgroundColor: '#D4AF3730', color: '#D4AF37', border: '1px solid #D4AF3760' }}>
            {t('properties')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">{t('ourProperties')}</h1>
          <p className="text-gray-200 text-lg">{t('browseVerified')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Search + Filter Toggle */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search by title or location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#D4AF37' }}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-medium text-sm transition-all"
              style={{
                borderColor: showFilters ? '#D4AF37' : '#e5e7eb',
                backgroundColor: showFilters ? '#D4AF37' : 'white',
                color: showFilters ? '#0B1F3A' : '#374151',
              }}
            >
              ⚙️ Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: '#e11d48', color: 'white' }}>
                  {activeFiltersCount}
                </span>
              )}
            </button>
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors">
                ✕ Clear
              </button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Type */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Property Type</label>
                <select value={type} onChange={e => setType(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none">
                  <option value="">All Types</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">City</label>
                <select value={city} onChange={e => setCity(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none">
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Bedrooms</label>
                <select value={minBeds} onChange={e => setMinBeds(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none">
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Price Range</label>
                <select
                  value={priceRange.label}
                  onChange={e => setPriceRange(priceRanges.find(p => p.label === e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none">
                  {priceRanges.map(p => <option key={p.label} value={p.label}>{p.label}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Active filter tags */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {type && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: '#0B1F3A', color: '#D4AF37' }}>
                {type === 'sale' ? 'For Sale' : 'For Rent'}
                <button onClick={() => setType('')} className="ml-1 opacity-70 hover:opacity-100">✕</button>
              </span>
            )}
            {city && city !== 'All Cities' && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: '#0B1F3A', color: '#D4AF37' }}>
                📍 {city}
                <button onClick={() => setCity('')} className="ml-1 opacity-70 hover:opacity-100">✕</button>
              </span>
            )}
            {minBeds && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: '#0B1F3A', color: '#D4AF37' }}>
                🛏 {minBeds}+ Beds
                <button onClick={() => setMinBeds('')} className="ml-1 opacity-70 hover:opacity-100">✕</button>
              </span>
            )}
            {(priceRange.min || priceRange.max) && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: '#0B1F3A', color: '#D4AF37' }}>
                💰 {priceRange.label}
                <button onClick={() => setPriceRange(priceRanges[0])} className="ml-1 opacity-70 hover:opacity-100">✕</button>
              </span>
            )}
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                <div className="h-52 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : normalized.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🏚</p>
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#0B1F3A' }}>No properties found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters</p>
            <button onClick={clearFilters}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm"
              style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-6">
              Showing <span className="font-semibold" style={{ color: '#0B1F3A' }}>{normalized.length}</span> properties
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {normalized.map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
