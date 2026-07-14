import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'

const heroImages = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
]

const featuredProperties = [
  { id: 1, title: 'Luxury 3-Bedroom Apartment in Bole', price: 4500000, location: 'Bole, near Edna Mall', city: 'Addis Ababa', bedrooms: 3, bathrooms: 2, area: 150, type: 'Sale', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600' },
  { id: 2, title: 'Prime Office Space in Kazanchis', price: 120000, location: 'Kazanchis Business District', city: 'Addis Ababa', bedrooms: 0, bathrooms: 3, area: 250, type: 'Rent', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' },
  { id: 3, title: 'Modern Villa with Garden in Old Airport', price: 12500000, location: 'Old Airport', city: 'Addis Ababa', bedrooms: 5, bathrooms: 4, area: 380, type: 'Sale', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600' },
]

const whyChooseUs = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Industry Leader',
    desc: 'Over 10 years of excellence in Ethiopian real estate development.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Trusted Partner',
    desc: '500+ happy families and satisfied customers across Addis Ababa.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Quality Assurance',
    desc: 'Every property meets our strict standards for construction and location.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Investment Value',
    desc: 'Strategic locations with high appreciation potential and ROI.',
  },
]

const testimonials = [
  { name: 'Aster M.', location: 'Bole', text: 'We found our 3-bedroom home in Bole within two weeks. The team was professional, transparent about pricing, and walked us through every step of the process.' },
  { name: 'Dawit T.', location: 'CMC', text: 'Listed my CMC villa and had serious buyers within 10 days. Habesha Homes handled everything — the paperwork, the viewings, the negotiation. Excellent service.' },
  { name: 'Sara K.', location: 'Old Airport', text: 'Invested in a property near Old Airport three years ago on their recommendation. The value has grown over 40%. Best financial decision I ever made.' },
]

export default function Home() {
  const [currentImg, setCurrentImg] = useState(0)
  const [search, setSearch]   = useState('')
  const [type, setType]       = useState('')
  const navigate = undefined // will use Link redirect

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg(prev => (prev + 1) % heroImages.length)
    }, 10000)
    return () => clearInterval(timer)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (type)   params.set('type', type)
    window.location.href = `/properties?${params.toString()}`
  }

  return (
    <div>

      {/* Hero Section */}
      <section className="relative h-[620px] flex items-center justify-center overflow-hidden">

        {/* Background Images */}
        {heroImages.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${img})`, opacity: i === currentImg ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-black/60" />

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImg(i)}
              className="w-3 h-3 rounded-full transition-all"
              style={{ backgroundColor: i === currentImg ? '#D4AF37' : 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-white text-center px-4 max-w-5xl mx-auto w-full">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-3 drop-shadow-lg">
            Discover Premium Properties<br />Across Addis Ababa
          </h1>
          <p className="text-gray-200 text-lg mb-10 max-w-2xl mx-auto drop-shadow">
            Habesha Homes — your trusted real estate partner in Ethiopia for over a decade.
          </p>

          {/* ⭐ SEARCH BAR */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-3 flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto shadow-2xl">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">📍</span>
              <input
                type="text"
                placeholder="Search by location, e.g. Bole, CMC..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl text-gray-800 text-sm focus:outline-none"
                style={{ backgroundColor: '#f9f9f9' }}
              />
            </div>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="px-4 py-3 rounded-xl text-gray-700 text-sm focus:outline-none border border-gray-200"
            >
              <option value="">All Types</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl font-bold text-sm transition-colors flex-shrink-0"
              style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}
            >
              🔍 Search
            </button>
          </form>
        </div>
      </section>

      {/* Stats Bar — FIXED */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '10+',  label: 'Years Experience' },
            { value: '50+',  label: 'Projects Completed' },
            { value: '500+', label: 'Happy Families' },
            { value: '98%',  label: 'Client Satisfaction' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-4xl font-bold" style={{ color: '#D4AF37' }}>{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Properties</h2>
          <p className="section-sub text-center mb-10">Explore residential and commercial opportunities across Addis Ababa</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Residential */}
            <Link to="/properties?type=sale" className="group relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800" alt="Residential" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-3xl font-bold mb-2">Residential</h3>
                <p className="text-gray-200 mb-4">Villas, apartments, and homes designed for modern Ethiopian living</p>
                <span style={{ color: '#D4AF37' }} className="font-semibold">Explore →</span>
              </div>
            </Link>

            {/* Commercial */}
            <Link to="/properties?type=rent" className="group relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800" alt="Commercial" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-white text-3xl font-bold mb-2">Commercial</h3>
                <p className="text-gray-200 mb-4">Prime office and retail spaces in high-traffic business districts</p>
                <span style={{ color: '#D4AF37' }} className="font-semibold">Explore →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="section-title">Featured Properties</h2>
              <p className="text-gray-500">Hand-picked properties available now</p>
            </div>
            <Link to="/properties" className="btn-outline hidden md:inline-block">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link to="/properties" className="btn-outline">View All Properties</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4" style={{ backgroundColor: '#0B1F3A' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Why Choose Habesha Homes</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Your trusted real estate partner in Addis Ababa</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map(item => (
              <div key={item.title}
                className="rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{ backgroundColor: '#0e2047', border: '1px solid #1e3f7a' }}
              >
                {/* Icon Box */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: '#D4AF3720', color: '#D4AF37' }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4" style={{ backgroundColor: '#F8F7F2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#0B1F3A' }}>What Our Clients Say</h2>
            <p className="section-sub">Real feedback from real families across Addis Ababa</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 relative overflow-hidden"
                style={{
                  borderTop: '4px solid #D4AF37',
                  boxShadow: '0 10px 40px rgba(11,31,58,0.12)',
                }}>
                {/* Big decorative quote */}
                <div className="absolute top-4 right-6 text-8xl font-serif leading-none select-none"
                  style={{ color: '#D4AF37', opacity: 0.15 }}>"</div>

                {/* Stars — Gold */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} className="w-5 h-5" style={{ fill: '#D4AF37' }} viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 leading-relaxed mb-7 text-sm"
                  style={{ fontStyle: 'italic' }}>"{t.text}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0"
                    style={{ backgroundColor: '#0B1F3A', color: '#D4AF37' }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: '#0B1F3A' }}>{t.name}</p>
                    <p className="text-xs text-gray-400">Verified Client</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 text-white" style={{ backgroundColor: '#0B1F3A' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
          <p className="mb-6" style={{ color: '#a0a0a0' }}>Get exclusive news on new projects, market trends, and investment opportunities.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
              style={{ backgroundColor: '#F8F7F2' }}
            />
            <button type="submit" className="px-8 py-3 rounded-lg font-semibold transition-colors" style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  )
}
