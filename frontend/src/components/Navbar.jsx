import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../context/FavoritesContext'
import { useLang } from '../context/LanguageContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { favorites } = useFavorites()
  const { lang, toggleLang, t } = useLang()
  const navigate = useNavigate()

  const navLinks = [
    { to: '/',           label: t('home') },
    { to: '/properties', label: t('properties') },
    { to: '/projects',   label: t('projects') },
    { to: '/about',      label: t('aboutUs') },
    { to: '/contact',    label: t('contact') },
  ]

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header style={{ backgroundColor: '#0B1F3A' }} className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* Logo — desktop only */}
          <Link to="/" className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl" style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
              T
            </div>
            <div>
              <p className="font-bold text-lg leading-tight" style={{ color: '#F8F7F2' }}>Get As Real Estate</p>
              <p className="text-xs" style={{ color: '#D4AF37' }}>Addis Ababa, Ethiopia</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => isActive
                  ? 'font-semibold text-sm'
                  : 'text-sm transition-colors'
                }
                style={({ isActive }) => ({
                  color: isActive ? '#D4AF37' : '#c8c8c8',
                })}
                onMouseEnter={e => e.target.style.color = '#D4AF37'}
                onMouseLeave={e => {
                  if (!e.target.classList.contains('active')) e.target.style.color = '#c8c8c8'
                }}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">

            {/* Language Toggle */}
            <button onClick={toggleLang}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all"
              style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
              title={lang === 'en' ? 'Switch to Amharic' : 'Switch to English'}>
              {lang === 'en' ? 'አማ' : 'EN'}
            </button>
            {/* Favorites counter */}
            <Link to="/favorites" className="relative p-2 rounded-lg transition-colors"
              style={{ color: '#D4AF37' }}
              title="Saved Properties">
              <svg className="w-6 h-6" fill={favorites.length > 0 ? '#D4AF37' : 'none'}
                stroke="#D4AF37" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{ backgroundColor: '#e11d48', color: 'white' }}>
                  {favorites.length}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/add-property"
                  className="px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                  style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
                  {t('listProperty')}
                </Link>
                <Link to="/dashboard"
                  className="text-sm font-medium transition-colors"
                  style={{ color: '#c8c8c8' }}>
                  Hi, {user.name.split(' ')[0]}
                </Link>
                <button onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-medium text-sm border transition-colors"
                  style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>
                  {t('logout')}
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="font-medium text-sm transition-colors" style={{ color: '#c8c8c8' }}>
                  {t('login')}
                </Link>
                <Link to="/register"
                  className="px-5 py-2 rounded-lg font-semibold text-sm transition-colors"
                  style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
                  {t('register')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button — LEFT side */}
          <button
            className="md:hidden p-2"
            style={{ color: '#D4AF37' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 md:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg" style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
              H
            </div>
            <div>
              <p className="font-bold text-base leading-tight" style={{ color: '#F8F7F2' }}>Get As Real Estate</p>
              <p className="text-xs" style={{ color: '#D4AF37' }}>Addis Ababa, Ethiopia</p>
            </div>
          </Link>

          {/* Mobile right — favorites icon */}
          <Link to="/favorites" className="md:hidden relative p-2" style={{ color: '#D4AF37' }}>
            <svg className="w-6 h-6" fill={favorites.length > 0 ? '#D4AF37' : 'none'}
              stroke="#D4AF37" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center"
                style={{ backgroundColor: '#e11d48', color: 'white', fontSize: '10px' }}>
                {favorites.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t" style={{ borderColor: '#1e3f7a' }}>
            <nav className="flex flex-col gap-1 pt-3">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="px-3 py-2 rounded-md text-sm"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#D4AF37' : 'transparent',
                    color: isActive ? '#0B1F3A' : '#c8c8c8',
                    fontWeight: isActive ? '600' : '400',
                  })}
                  onClick={() => setMenuOpen(false)}
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex gap-3 px-3 pt-3">
                {user ? (
                  <>
                    <Link to="/add-property" className="flex-1 text-center py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }} onClick={() => setMenuOpen(false)}>{t('listProperty')}</Link>
                    <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="flex-1 text-center py-2 rounded-lg text-sm border" style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>{t('logout')}</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex-1 text-center py-2 rounded-lg text-sm border" style={{ borderColor: '#D4AF37', color: '#D4AF37' }} onClick={() => setMenuOpen(false)}>{t('login')}</Link>
                    <Link to="/register" className="flex-1 text-center py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }} onClick={() => setMenuOpen(false)}>{t('register')}</Link>
                  </>
                )}
              </div>
              {/* Language toggle in mobile menu */}
              <div className="px-3 pt-2 pb-1">
                <button onClick={toggleLang}
                  className="w-full py-2 rounded-lg text-sm font-bold border text-center"
                  style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>
                  {lang === 'en' ? '🇪🇹 አማርኛ' : '🇬🇧 English'}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
