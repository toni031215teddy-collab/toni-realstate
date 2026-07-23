import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

const ethiopianCities = [
  'Addis Ababa', 'Dire Dawa', 'Mekelle', 'Gondar', 'Hawassa',
  'Bahir Dar', 'Adama', 'Jimma', 'Dessie', 'Jijiga',
]

export default function AddProperty() {
  const { user } = useAuth()
  const navigate  = useNavigate()

  const [form, setForm] = useState({
    title: '', description: '', price: '',
    location: '', city: 'Addis Ababa', country: 'Ethiopia',
    type: 'sale', bedrooms: '', bathrooms: '', area: '',
    images: '',
  })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  if (!user) {
    return (
      <div className="text-center py-24">
        <p className="text-5xl mb-4">🔒</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Login Required</h2>
        <p className="text-gray-500 mb-4">You need to be logged in to list a property.</p>
        <a href="/login" className="text-primary-600 hover:underline font-medium">Go to Login</a>
      </div>
    )
  }

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = {
        ...form,
        price:     parseFloat(form.price),
        bedrooms:  parseInt(form.bedrooms),
        bathrooms: parseInt(form.bathrooms),
        area:      parseInt(form.area),
        images:    form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : [],
      }
      await api.post('/properties', payload)
      navigate('/properties')
    } catch (err) {
      const errors = err.response?.data?.errors
      if (errors) {
        const first = Object.values(errors)[0]
        setError(Array.isArray(first) ? first[0] : first)
      } else {
        setError(err.response?.data?.message || 'Failed to create property.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">List a Property</h1>
      <p className="text-gray-500 mb-8">Fill in the details to list your property on Get As Real Estate.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 flex flex-col gap-5">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Title *</label>
          <input
            type="text" name="title" value={form.title} onChange={handleChange} required
            placeholder="e.g. Modern 3-Bedroom Apartment in Bole"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description" value={form.description} onChange={handleChange}
            rows={4} placeholder="Describe the property..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none"
          />
        </div>

        {/* Price & Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (ETB) *</label>
            <input
              type="number" name="price" value={form.price} onChange={handleChange} required min="0"
              placeholder="e.g. 2500000"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type *</label>
            <select
              name="type" value={form.type} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            >
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>
        </div>

        {/* Location & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specific Location *</label>
            <input
              type="text" name="location" value={form.location} onChange={handleChange} required
              placeholder="e.g. Bole, around Edna Mall"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <select
              name="city" value={form.city} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            >
              {ethiopianCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bedrooms, Bathrooms, Area */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms *</label>
            <input
              type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} required min="0"
              placeholder="3"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms *</label>
            <input
              type="number" name="bathrooms" value={form.bathrooms} onChange={handleChange} required min="0"
              placeholder="2"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Area (m²) *</label>
            <input
              type="number" name="area" value={form.area} onChange={handleChange} required min="0"
              placeholder="120"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs</label>
          <input
            type="text" name="images" value={form.images} onChange={handleChange}
            placeholder="https://..., https://... (comma separated)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">Separate multiple image URLs with commas.</p>
        </div>

        <button
          type="submit" disabled={loading}
          className="bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'List Property'}
        </button>
      </form>
    </div>
  )
}
