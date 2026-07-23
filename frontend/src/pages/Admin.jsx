import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

// Admin emails — extend this list or replace with a backend role check
const ADMIN_EMAILS = ['admin@habeshhomes.com', 'demo@habeshhomes.com']

export default function Admin() {
  const { user, loading: authLoading } = useAuth()
  const navigate  = useNavigate()
  const [activeTab, setActiveTab]   = useState('overview')
  const [properties, setProperties] = useState([])
  const [loading, setLoading]       = useState(true)

  const isAdmin = user && ADMIN_EMAILS.includes(user.email)

  useEffect(() => {
    if (authLoading) return
    if (!user) { navigate('/login'); return }
    if (!isAdmin) { navigate('/'); return }
    // Load all properties
    api.get('/properties?per_page=100')
      .then(res => setProperties(res.data.data ?? res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user, authLoading, isAdmin, navigate])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property?')) return
    try {
      await api.delete(`/properties/${id}`)
      setProperties(prev => prev.filter(p => p.id !== id))
    } catch {
      alert('Could not delete — you can only delete your own properties.')
    }
  }

  const tabs = [
    { id: 'overview',    label: '📊 Overview',    count: null },
    { id: 'properties',  label: '🏠 Properties',  count: properties.length },
  ]

  // Show auth loading state
  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: '#D4AF37', borderTopColor: 'transparent' }} />
    </div>
  )

  // Access denied screen
  if (!user || !isAdmin) return null

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F2' }}>

      {/* Header */}
      <div className="text-white px-4 py-8" style={{ backgroundColor: '#0B1F3A' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>⚙️</div>
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p style={{ color: '#a0a0a0' }} className="text-sm">Get As Real Estate Management</p>
            </div>
          </div>
          <Link to="/" className="px-4 py-2 rounded-xl text-sm font-medium border"
            style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>
            ← Back to Site
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeTab === tab.id ? '#0B1F3A' : 'white',
                color:           activeTab === tab.id ? '#D4AF37' : '#6b7280',
                border:          activeTab !== tab.id ? '1px solid #e5e7eb' : 'none',
              }}>
              {tab.label}
              {tab.count !== null && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: activeTab === tab.id ? '#D4AF37' : '#f3f4f6', color: activeTab === tab.id ? '#0B1F3A' : '#6b7280' }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Overview ── */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Properties', value: properties.length,                                          icon: '🏠', color: '#0B1F3A' },
                { label: 'For Sale',         value: properties.filter(p => p.type === 'sale').length,           icon: '🏷️', color: '#D4AF37' },
                { label: 'For Rent',         value: properties.filter(p => p.type === 'rent').length,           icon: '🔑', color: '#1e3f7a' },
                { label: 'Available',        value: properties.filter(p => p.status === 'available').length,    icon: '✅', color: '#16a34a' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-md">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Properties */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-lg" style={{ color: '#0B1F3A' }}>Recent Listings</h2>
                <button onClick={() => setActiveTab('properties')} className="text-sm font-medium" style={{ color: '#D4AF37' }}>
                  View all →
                </button>
              </div>
              <div className="space-y-3">
                {properties.slice(0, 5).map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100'}
                          alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{p.title}</p>
                        <p className="text-xs text-gray-400">{p.city} · {Number(p.price).toLocaleString()} ETB</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full font-medium capitalize"
                        style={{ backgroundColor: p.type === 'sale' ? '#fef3c7' : '#e0e7ff', color: p.type === 'sale' ? '#92400e' : '#3730a3' }}>
                        {p.type}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Properties Management ── */}
        {activeTab === 'properties' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-xl" style={{ color: '#0B1F3A' }}>All Properties</h2>
              <Link to="/add-property"
                className="px-5 py-2.5 rounded-xl font-semibold text-sm"
                style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
                + Add Property
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin mx-auto"
                  style={{ borderColor: '#D4AF37', borderTopColor: 'transparent' }} />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr style={{ backgroundColor: '#0B1F3A' }}>
                        {['Property', 'Location', 'Price', 'Type', 'Status', 'Actions'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                            style={{ color: '#D4AF37' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((p, i) => (
                        <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                          style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100'}
                                  alt="" className="w-full h-full object-cover" />
                              </div>
                              <p className="font-medium text-sm text-gray-800 max-w-xs truncate">{p.title}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{p.city}</td>
                          <td className="px-4 py-3 text-sm font-bold" style={{ color: '#D4AF37' }}>
                            {Number(p.price).toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs px-2 py-1 rounded-full font-medium capitalize"
                              style={{ backgroundColor: p.type === 'sale' ? '#fef3c7' : '#e0e7ff', color: p.type === 'sale' ? '#92400e' : '#3730a3' }}>
                              {p.type}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs px-2 py-1 rounded-full font-medium"
                              style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
                              {p.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Link to={`/properties/${p.id}`}
                                className="px-3 py-1 rounded-lg text-xs font-medium border transition-colors"
                                style={{ borderColor: '#0B1F3A', color: '#0B1F3A' }}>
                                View
                              </Link>
                              <button onClick={() => handleDelete(p.id)}
                                className="px-3 py-1 rounded-lg text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
