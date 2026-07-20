import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'

export default function Login() {
  const { login } = useAuth()
  const { t } = useLang()
  const navigate   = useNavigate()
  const [form, setForm]   = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      const msg = err.response?.data?.message
        || err.response?.data?.errors?.email?.[0]
        || 'Login failed. Please check your credentials.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ backgroundColor: '#F8F7F2' }}>

      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#0B1F3A' }}>
        <div className="absolute inset-0"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18 }} />
        <div className="relative z-10 text-center px-12 max-w-md">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-3xl mx-auto mb-6"
            style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>H</div>
          <h2 className="text-3xl font-bold text-white mb-3">Habesha Homes</h2>
          <p style={{ color: '#9ca3af' }} className="text-sm leading-relaxed">
            Your trusted real estate partner in Addis Ababa. Find your dream home in Bole, CMC, Old Airport, Kazanchis, and beyond.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 text-center">
            {[['500+', 'Happy Families'], ['50+', 'Projects'], ['10+', 'Years'], ['98%', 'Satisfaction']].map(([val, lbl]) => (
              <div key={lbl} className="rounded-2xl p-4" style={{ backgroundColor: '#0e2047', border: '1px solid #1e3f7a' }}>
                <p className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{val}</p>
                <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>{lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl"
              style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>H</div>
            <div>
              <p className="font-bold text-base leading-tight" style={{ color: '#0B1F3A' }}>Habesha Homes</p>
              <p className="text-xs text-gray-400">Addis Ababa, Ethiopia</p>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-1" style={{ color: '#0B1F3A' }}>{t('welcomeBack')}</h1>
          <p className="text-gray-500 text-sm mb-8">{t('signInToContinue')}</p>

          {error && (
            <div className="rounded-xl px-4 py-3 text-sm mb-5 flex items-start gap-2"
              style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t('emailAddr')}</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                style={{ backgroundColor: 'white' }}
                onFocus={e => e.target.style.borderColor = '#D4AF37'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">{t('password')}</label>
                <a href="#" className="text-xs font-medium" style={{ color: '#D4AF37' }}>{t('forgotPassword')}</a>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none transition-colors"
                  style={{ backgroundColor: 'white' }}
                  onFocus={e => e.target.style.borderColor = '#D4AF37'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: '#0B1F3A', color: '#D4AF37' }}
            >
              {loading ? (<><div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#D4AF37', borderTopColor: 'transparent' }} />{t('signingIn')}</>) : t('signIn')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            {t('noAccount')}{' '}
            <Link to="/register" className="font-semibold hover:underline" style={{ color: '#D4AF37' }}>
              {t('createFree')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
