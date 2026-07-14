import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'
import api from '../api/axios'
import PropertyCard from '../components/PropertyCard'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { favorites }    = useFavorites()
  const navigate         = useNavigate()
  const [activeTab, setActiveTab]   = useState('overview')
  const [myProperties, setMyProperties] = useState([])
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    api.get('/my-properties')
      .then(res => setMyProperties(res.data.data ?? res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user, navigate])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property?')) return
    await api.delete(`/properties/${id}`)
    setMyProperties(prev => prev.filter(p => p.id !== id))
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (!user) return null

  const tabs = [
    { id: 'overview',    label: '📊 Overview' },
    { id: 'listings',    label: '🏠 My Listings' },
    { id: 'favorites',   label: '❤️ Saved' },
    { id: 'profile',     label: '👤 Profile' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F2' }}>

      {/* Header */}
      <div className="text-white py-10 px-4" style={{ backgroundColor: '#0B1F3A' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user.name.split(' ')[0]}!</h1>
              <p style={{ color: '#a0a0a0' }} className="text-sm">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/add-property"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm"
              style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
              + List Property
            </Link>
            <button onClick={handleLogout}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm border"
              style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeTab === tab.id ? '#0B1F3A' : 'white',
                color:           activeTab === tab.id ? '#D4AF37' : '#6b7280',
                boxShadow:       activeTab === tab.id ? '0 4px 12px rgba(11,31,58,0.2)' : 'none',
                border:          activeTab !== tab.id ? '1px solid #e5e7eb' : 'none',
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Overview Tab ── */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'My Listings',    value: myProperties.length, icon: '🏠', color: '#0B1F3A' },
                { label: 'Saved Properties', value: favorites.length, icon: '❤️', color: '#e11d48' },
                { label: 'Active Listings', value: myProperties.filter(p => p.status === 'available').length, icon: '✅', color: '#16a34a' },
                { label: 'Member Since',   value: new Date(user.created_at || Date.now()).getFullYear(), icon: '📅', color: '#D4AF37' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-md">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
              <h2 className="font-bold text-lg mb-4" style={{ color: '#0B1F3A' }}>Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Add Property', icon: '➕', to: '/add-property' },
                  { label: 'Browse', icon: '🔍', to: '/properties' },
                  { label: 'Saved', icon: '❤️', to: '/favorites' },
                  { label: 'Contact', icon: '📞', to: '/contact' },
                ].map(action => (
                  <Link key={action.label} to={action.to}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:shadow-md text-center"
                    style={{ borderColor: '#e5e7eb' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#D4AF37'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                  >
                    <span className="text-3xl">{action.icon}</span>
                    <span className="text-sm font-medium text-gray-600">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent listings */}
            {myProperties.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg" style={{ color: '#0B1F3A' }}>Recent Listings</h2>
                  <button onClick={() => setActiveTab('listings')} className="text-sm font-medium" style={{ color: '#D4AF37' }}>
                    View all →
                  </button>
                </div>
                <div className="space-y-3">
                  {myProperties.slice(0, 3).map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-yellow-200 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                          style={{ backgroundColor: '#F8F7F2' }}>🏠</div>
                        <div>
                          <p className="font-medium text-sm text-gray-800 truncate max-w-xs">{p.title}</p>
                          <p className="text-xs text-gray-400">{p.city} · {Number(p.price).toLocaleString()} ETB</p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ backgroundColor: p.status === 'available' ? '#dcfce7' : '#fee2e2', color: p.status === 'available' ? '#16a34a' : '#dc2626' }}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── My Listings Tab ── */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-xl" style={{ color: '#0B1F3A' }}>My Listings</h2>
              <Link to="/add-property"
                className="px-5 py-2.5 rounded-xl font-semibold text-sm"
                style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
                + Add New
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin mx-auto"
                  style={{ borderColor: '#D4AF37', borderTopColor: 'transparent' }} />
              </div>
            ) : myProperties.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                <p className="text-6xl mb-4">🏚</p>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0B1F3A' }}>No listings yet</h3>
                <p className="text-gray-500 mb-6">Start by adding your first property listing</p>
                <Link to="/add-property" className="btn-primary">+ Add Property</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myProperties.map(p => (
                  <div key={p.id} className="bg-white rounded-2xl p-5 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200'}
                          alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">{p.title}</h3>
                        <p className="text-sm text-gray-500">📍 {p.location} · {p.bedrooms > 0 ? `${p.bedrooms} beds · ` : ''}{p.area}m²</p>
                        <p className="font-bold text-sm mt-1" style={{ color: '#D4AF37' }}>
                          {Number(p.price).toLocaleString()} ETB
                          {p.type === 'rent' ? '/mo' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ backgroundColor: p.status === 'available' ? '#dcfce7' : '#fee2e2', color: p.status === 'available' ? '#16a34a' : '#dc2626' }}>
                        {p.status}
                      </span>
                      <Link to={`/properties/${p.id}`}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
                        style={{ borderColor: '#0B1F3A', color: '#0B1F3A' }}>
                        View
                      </Link>
                      <button onClick={() => handleDelete(p.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors border-red-200 text-red-500 hover:bg-red-50">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Favorites Tab ── */}
        {activeTab === 'favorites' && (
          <div>
            <h2 className="font-bold text-xl mb-6" style={{ color: '#0B1F3A' }}>Saved Properties</h2>
            {favorites.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                <p className="text-6xl mb-4">🤍</p>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0B1F3A' }}>No saved properties</h3>
                <p className="text-gray-500 mb-6">Click the ❤️ on any property to save it</p>
                <Link to="/properties"
                  className="px-6 py-2.5 rounded-xl font-semibold text-sm inline-block"
                  style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
                  Browse Properties
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map(p => (
                  <PropertyCard key={p.id} property={{ ...p, type: p.type === 'sale' || p.type === 'Sale' ? 'Sale' : 'Rent' }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Profile Tab ── */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-md p-8 max-w-lg">
            <h2 className="font-bold text-xl mb-6" style={{ color: '#0B1F3A' }}>My Profile</h2>
            <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl" style={{ backgroundColor: '#F8F7F2' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold"
                style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-lg" style={{ color: '#0B1F3A' }}>{user.name}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Full Name</p>
                <p className="font-medium text-gray-800">{user.name}</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Email Address</p>
                <p className="font-medium text-gray-800">{user.email}</p>
              </div>
              <div className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Total Listings</p>
                <p className="font-medium" style={{ color: '#D4AF37' }}>{myProperties.length} properties</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
