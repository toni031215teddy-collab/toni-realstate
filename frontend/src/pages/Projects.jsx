import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

const projects = [
  {
    id: 1,
    name: 'Habesha Heights',
    status: 'completed',
    location: 'Bole, Addis Ababa',
    year: '2022',
    units: 48,
    type: 'Residential Apartments',
    desc: 'A premium 8-floor residential complex featuring 48 luxury apartments with modern finishes, underground parking, rooftop garden, and 24/7 security. Located minutes from Bole International Airport.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    features: ['48 Units', '8 Floors', 'Underground Parking', 'Rooftop Garden', '24/7 Security'],
  },
  {
    id: 2,
    name: 'Nile Business Center',
    status: 'completed',
    location: 'Kazanchis, Addis Ababa',
    year: '2021',
    units: 24,
    type: 'Commercial Complex',
    desc: 'A modern commercial hub in the heart of Kazanchis business district. Features Grade-A office spaces, retail shops, a conference center, and a restaurant on the ground floor.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    features: ['24 Office Units', '5 Floors', 'Conference Center', 'Retail Shops', 'Fiber Internet'],
  },
  {
    id: 3,
    name: 'CMC Family Residences',
    status: 'completed',
    location: 'CMC, Addis Ababa',
    year: '2020',
    units: 32,
    type: 'Family Villas',
    desc: 'A gated community of 32 family villas in the prestigious CMC area. Each villa features a private garden, 4 bedrooms, and modern kitchen. Close to international schools and hospitals.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    features: ['32 Villas', 'Private Gardens', 'Gated Community', '4 Bedrooms Each', 'Backup Power'],
  },
  {
    id: 4,
    name: 'Entoto View Apartments',
    status: 'ongoing',
    location: 'Entoto Road, Addis Ababa',
    year: '2025',
    units: 60,
    type: 'Residential Apartments',
    desc: 'Currently under construction — a stunning 12-floor tower with panoramic views of Entoto Mountain. Features smart home technology, gym, swimming pool, and sky lounge. Expected completion Q4 2025.',
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800',
    features: ['60 Units', '12 Floors', 'Smart Home', 'Swimming Pool', 'Sky Lounge'],
    completion: '75%',
  },
  {
    id: 5,
    name: 'Sarbet Plaza',
    status: 'ongoing',
    location: 'Sarbet, Addis Ababa',
    year: '2026',
    units: 80,
    type: 'Mixed Use',
    desc: 'An ambitious mixed-use development combining luxury residential units with premium retail on the lower floors. Located on Ring Road with maximum visibility and accessibility.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
    features: ['80 Units', 'Mixed Use', 'Ring Road Access', 'Retail Ground Floor', 'Rooftop Terrace'],
    completion: '40%',
  },
  {
    id: 6,
    name: 'Megenagna Towers',
    status: 'upcoming',
    location: 'Megenagna, Addis Ababa',
    year: '2026',
    units: 120,
    type: 'Luxury Towers',
    desc: 'Coming soon — our most ambitious project yet. Twin 20-floor luxury towers at Megenagna roundabout, one of Addis Ababa\'s most iconic locations. Pre-registration now open.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
    features: ['120 Units', '20 Floors', 'Twin Towers', 'Luxury Finishes', 'Pre-Sale Now'],
    completion: '0%',
  },
]


export default function Projects() {
  const [filter, setFilter] = useState('all')
  const { t } = useLang()

  const statusConfig = {
    completed: { label: t('completed'),         bg: '#dcfce7', color: '#16a34a' },
    ongoing:   { label: t('underConstruction'), bg: '#fef9c3', color: '#ca8a04' },
    upcoming:  { label: t('comingSoon'),        bg: '#e0e7ff', color: '#4338ca' },
  }

  const filtered = filter === 'all' ? projects : projects.filter(p => p.status === filter)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F2' }}>

      {/* Header */}
      <div className="relative text-white py-32 px-4"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(11,31,58,0.75)' }} />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ backgroundColor: '#D4AF3730', color: '#D4AF37', border: '1px solid #D4AF3760' }}>
            {t('portfolio')}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{t('ourProjects')}</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto">{t('projectsHero')}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="py-10 px-4" style={{ backgroundColor: '#0B1F3A' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: projects.filter(p => p.status === 'completed').length, label: t('completed') },
            { value: projects.filter(p => p.status === 'ongoing').length,   label: t('underConstruction') },
            { value: projects.filter(p => p.status === 'upcoming').length,  label: t('comingSoon') },
          ].map(s => (
            <div key={s.label}>
              <p className="text-4xl font-bold" style={{ color: '#D4AF37' }}>{s.value}</p>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-10 justify-center flex-wrap">
          {[
            { key: 'all',       label: t('all') },
            { key: 'completed', label: t('completed') },
            { key: 'ongoing',   label: t('underConstruction') },
            { key: 'upcoming',  label: t('comingSoon') },
          ].map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
              style={{
                backgroundColor: filter === f.key ? '#0B1F3A' : 'white',
                color:           filter === f.key ? '#D4AF37' : '#6b7280',
                border:          filter !== f.key ? '1px solid #e5e7eb' : 'none',
                boxShadow:       filter === f.key ? '0 4px 12px rgba(11,31,58,0.2)' : 'none',
              }}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(project => {
            const sc = statusConfig[project.status]
            return (
              <div key={project.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">

                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img src={project.image} alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: sc.bg, color: sc.color }}>{sc.label}</span>
                  {project.completion && (
                    <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                      <div className="flex justify-between text-white text-xs mb-1">
                        <span>Progress</span>
                        <span className="font-bold" style={{ color: '#D4AF37' }}>{project.completion}</span>
                      </div>
                      <div className="h-2 bg-white/30 rounded-full">
                        <div className="h-full rounded-full" style={{ width: project.completion, backgroundColor: '#D4AF37' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#D4AF37' }}>
                    {project.type}
                  </p>
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#0B1F3A' }}>{project.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">📍 {project.location} · {project.year}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{project.desc}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.features.slice(0, 3).map(f => (
                      <span key={f} className="text-xs px-2 py-1 rounded-lg font-medium"
                        style={{ backgroundColor: '#F8F7F2', color: '#0B1F3A' }}>{f}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      <strong style={{ color: '#0B1F3A' }}>{project.units}</strong> units
                    </span>
                    {project.status === 'upcoming' ? (
                      <Link to="/contact"
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                        style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
                        Pre-Register
                      </Link>
                    ) : (
                      <Link to="/contact"
                        className="px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all"
                        style={{ borderColor: '#0B1F3A', color: '#0B1F3A' }}>
                        Learn More
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl p-10 text-center text-white"
          style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1e3f7a 100%)' }}>
          <h2 className="text-3xl font-bold mb-3">Interested in Our Projects?</h2>
          <p className="mb-6" style={{ color: '#a0a0a0' }}>Contact us to learn more or pre-register for upcoming developments.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact"
              className="px-8 py-3 rounded-xl font-bold transition-all"
              style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
              Contact Us
            </Link>
            <Link to="/properties"
              className="px-8 py-3 rounded-xl font-bold border-2 transition-all"
              style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
