import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0B1F3A', color: '#c8c8c8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl" style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>H</div>
              <div>
                <p className="font-bold text-lg leading-tight text-white">Habesha Homes</p>
                <p className="text-xs" style={{ color: '#D4AF37' }}>Addis Ababa, Ethiopia</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#a0a0a0' }}>
              Your trusted real estate partner in Ethiopia — delivering quality homes and commercial spaces for over a decade.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { label: 'Facebook', href: 'https://facebook.com', svg: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/> },
                { label: 'Instagram', href: 'https://instagram.com', svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/> },
                { label: 'Telegram', href: 'https://t.me/habeshhomes', svg: <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: '#1e3f7a' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#D4AF37'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1e3f7a'}
                >
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">{s.svg}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/',           label: 'Home' },
                { to: '/properties', label: 'Properties' },
                { to: '/projects',   label: 'Our Projects' },
                { to: '/about',      label: 'About Us' },
                { to: '/contact',    label: 'Contact' },
                { to: '/add-property', label: 'List a Property' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-white" style={{ color: '#a0a0a0' }}
                    onMouseEnter={e => e.target.style.color = '#D4AF37'}
                    onMouseLeave={e => e.target.style.color = '#a0a0a0'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Properties</h3>
            <ul className="space-y-2 text-sm" style={{ color: '#a0a0a0' }}>
              {['Apartments', 'Villas', 'Office Spaces', 'Commercial', 'For Sale', 'For Rent'].map(item => (
                <li key={item}>
                  <Link to="/properties" className="transition-colors"
                    onMouseEnter={e => e.target.style.color = '#D4AF37'}
                    onMouseLeave={e => e.target.style.color = '#a0a0a0'}
                  >{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm" style={{ color: '#a0a0a0' }}>
              <li className="flex items-start gap-2">
                <span style={{ color: '#D4AF37' }}>📍</span>
                <span>Bole, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: '#D4AF37' }}>📞</span>
                <a href="tel:+251911000000" className="hover:text-white transition-colors">+251 911 000 000</a>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: '#D4AF37' }}>✉️</span>
                <a href="mailto:info@habeshhomes.com" className="hover:text-white transition-colors">info@habeshhomes.com</a>
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: '#D4AF37' }}>🕐</span>
                <span>Mon – Sat: 9am – 6pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm border-t" style={{ borderColor: '#1e3f7a', color: '#666' }}>
          <p>© {new Date().getFullYear()} Habesha Homes. All rights reserved.</p>
          <p>Built with ❤️ in Addis Ababa</p>
        </div>
      </div>
    </footer>
  )
}
