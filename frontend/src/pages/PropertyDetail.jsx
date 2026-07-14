import { useState, useEffect, lazy, Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'
import ScheduleViewing from '../components/ScheduleViewing'

// Lazy load map to avoid SSR issues
const PropertyMap = lazy(() => import('../components/PropertyMap'))

export default function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [activeTab, setActiveTab] = useState('inquiry') // 'inquiry' | 'viewing'

  useEffect(() => {
    api.get(`/properties/${id}`)
      .then(res => setProperty(res.data))
      .catch(() => setProperty(null))
      .finally(() => setLoading(false))
  }, [id])

  const [form, setForm]   = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent]   = useState(false)

  const handleInquiry = e => {
    e.preventDefault()
    setSent(true)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
          style={{ borderColor: '#D4AF37', borderTopColor: 'transparent' }}></div>
        <p className="text-gray-500">Loading property...</p>
      </div>
    </div>
  )

  if (!property) return (
    <div className="text-center py-24 px-4">
      <p className="text-6xl mb-4">🏚</p>
      <h2 className="text-2xl font-bold mb-2" style={{ color: '#0B1F3A' }}>Property Not Found</h2>
      <p className="text-gray-500 mb-6">This property may have been removed or is no longer available.</p>
      <Link to="/properties" className="btn-primary">← Browse Properties</Link>
    </div>
  )

  const isRent = property.type === 'rent'
  const imgSrc = property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F2' }}>

      {/* Image Hero */}
      <div className="relative h-80 md:h-[480px] w-full overflow-hidden">
        <img src={imgSrc} alt={property.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <span className="text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase mr-3"
              style={{ backgroundColor: isRent ? '#1e3f7a' : '#D4AF37', color: isRent ? '#fff' : '#0B1F3A' }}>
              {isRent ? 'For Rent' : 'For Sale'}
            </span>
          </div>
          {/* Quick action buttons */}
          <div className="flex gap-2">
            <a href="https://wa.me/251911000000" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-xl"
              style={{ backgroundColor: '#25D366' }}>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a href="tel:+251911000000"
              className="text-white text-sm font-semibold px-4 py-2 rounded-xl border-2"
              style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>
              📞 Call
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link to="/properties" className="text-sm font-medium mb-6 inline-flex items-center gap-1"
          style={{ color: '#D4AF37' }}>
          ← Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">

          {/* ── Left Column ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title & Price */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#0B1F3A' }}>{property.title}</h1>
              <p className="text-gray-500 text-sm mb-4">📍 {property.location}{property.city ? `, ${property.city}` : ''}</p>
              <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>
                {Number(property.price).toLocaleString()}
                <span className="text-base font-normal text-gray-400"> ETB{isRent ? '/month' : ''}</span>
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {property.bedrooms > 0 && (
                <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                  <p className="text-3xl mb-1">🛏</p>
                  <p className="text-2xl font-bold" style={{ color: '#0B1F3A' }}>{property.bedrooms}</p>
                  <p className="text-gray-500 text-xs">Bedrooms</p>
                </div>
              )}
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <p className="text-3xl mb-1">🚿</p>
                <p className="text-2xl font-bold" style={{ color: '#0B1F3A' }}>{property.bathrooms}</p>
                <p className="text-gray-500 text-xs">Bathrooms</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                <p className="text-3xl mb-1">📐</p>
                <p className="text-2xl font-bold" style={{ color: '#0B1F3A' }}>{property.area}</p>
                <p className="text-gray-500 text-xs">m² Area</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-3" style={{ color: '#0B1F3A' }}>About This Property</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{property.description}</p>
            </div>

            {/* ⭐ MAP */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-4" style={{ color: '#0B1F3A' }}>📍 Location on Map</h2>
              <Suspense fallback={
                <div className="h-80 rounded-xl flex items-center justify-center bg-gray-100">
                  <p className="text-gray-400">Loading map...</p>
                </div>
              }>
                <PropertyMap location={property.location} city={property.city} title={property.title} />
              </Suspense>
              <p className="text-xs text-gray-400 mt-2">📌 Map shows approximate location in {property.city || 'Addis Ababa'}</p>
            </div>

          </div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md sticky top-24 overflow-hidden">

              {/* Tab Header */}
              <div className="grid grid-cols-2">
                <button
                  onClick={() => setActiveTab('inquiry')}
                  className="py-4 text-sm font-bold transition-all border-b-2"
                  style={{
                    borderColor:     activeTab === 'inquiry' ? '#D4AF37' : 'transparent',
                    color:           activeTab === 'inquiry' ? '#0B1F3A' : '#9ca3af',
                    backgroundColor: activeTab === 'inquiry' ? '#fffdf5' : 'white',
                  }}
                >
                  💬 Send Inquiry
                </button>
                <button
                  onClick={() => setActiveTab('viewing')}
                  className="py-4 text-sm font-bold transition-all border-b-2"
                  style={{
                    borderColor:     activeTab === 'viewing' ? '#D4AF37' : 'transparent',
                    color:           activeTab === 'viewing' ? '#0B1F3A' : '#9ca3af',
                    backgroundColor: activeTab === 'viewing' ? '#fffdf5' : 'white',
                  }}
                >
                  📅 Book Viewing
                </button>
              </div>

              <div className="p-5">
                {/* Inquiry Tab */}
                {activeTab === 'inquiry' && (
                  sent ? (
                    <div className="text-center py-8">
                      <p className="text-5xl mb-3">✅</p>
                      <h4 className="font-bold mb-1" style={{ color: '#0B1F3A' }}>Message Sent!</h4>
                      <p className="text-gray-500 text-sm mb-4">We'll get back to you within 24 hours.</p>
                      <button onClick={() => setSent(false)} className="text-sm" style={{ color: '#D4AF37' }}>Send another</button>
                    </div>
                  ) : (
                    <form onSubmit={handleInquiry} className="flex flex-col gap-3">
                      <p className="text-sm text-gray-500 mb-1">Interested in <strong className="text-gray-700">{property.title}</strong>?</p>
                      <input type="text" placeholder="Your name" required value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none" />
                      <input type="email" placeholder="Email address" required value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none" />
                      <input type="tel" placeholder="Phone number" value={form.phone}
                        onChange={e => setForm({...form, phone: e.target.value})}
                        className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none" />
                      <textarea rows={3} placeholder="Your message..." required value={form.message}
                        onChange={e => setForm({...form, message: e.target.value})}
                        className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none" />
                      <button type="submit" className="py-3 rounded-xl font-bold text-sm transition-all"
                        style={{ backgroundColor: '#0B1F3A', color: '#D4AF37' }}>
                        Send Inquiry
                      </button>
                    </form>
                  )
                )}

                {/* Viewing Tab */}
                {activeTab === 'viewing' && (
                  <ScheduleViewing propertyTitle={property.title} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
