import { Link } from 'react-router-dom'

const stats = [
  { value: '10+',  label: 'Years Experience' },
  { value: '500+', label: 'Properties Delivered' },
  { value: '500+', label: 'Happy Families' },
  { value: '100%', label: 'Client Satisfaction' },
]

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Trust & Integrity',
    desc: 'We build long-term relationships with our clients based on complete honesty and transparency.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Quality First',
    desc: 'Every property we deliver meets the highest standards of construction and design.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: 'Ethiopian Pride',
    desc: 'Rooted in Ethiopian culture, we are committed to building communities that thrive.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Investment Value',
    desc: 'We ensure our properties are strategically located for maximum long-term value.',
  },
]

const team = [
  { name: 'Temer Bekele',  role: 'CEO & Founder',    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'Tigist Haile',  role: 'Head of Sales',    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80' },
  { name: 'Abebe Girma',   role: 'Lead Architect',   img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80' },
]

export default function About() {
  return (
    <div style={{ backgroundColor: '#F8F7F2' }}>

      {/* Hero */}
      <section
        className="relative text-white py-24 px-4 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(11,31,58,0.75)' }} />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ backgroundColor: '#D4AF3730', color: '#D4AF37', border: '1px solid #D4AF3760' }}>
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">About Habesha Homes</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-8">
            A leading real estate developer in Addis Ababa, Ethiopia — helping families and businesses find quality properties for over a decade.
          </p>
          <Link to="/properties"
            className="inline-block px-8 py-3 rounded-xl font-bold text-sm shadow-lg transition-all"
            style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
            Browse Properties
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4" style={{ backgroundColor: '#0B1F3A' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <p className="text-4xl font-bold" style={{ color: '#D4AF37' }}>{s.value}</p>
              <p className="text-sm mt-1" style={{ color: '#a0a0a0' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#0B1F3A' }}>Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Habesha Homes was founded with one simple mission — to make quality housing accessible to every Ethiopian family. Starting in the heart of Addis Ababa, we have grown into one of the city's most trusted real estate developers.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Over the past decade, we have delivered over 500 residential and commercial properties across prime locations including Bole, CMC, Old Airport, Kazanchis, and Megenagna.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe that a home is more than just a building — it is a foundation for a better life. That's why every project we take on is built with care, quality, and our clients' futures in mind.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg h-80">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
              alt="Habesha Homes Office"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F8F7F2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#0B1F3A' }}>Our Values</h2>
            <p className="text-gray-500">What drives us every day</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: '#EEF1F8', color: '#0B1F3A' }}>
                  {v.icon}
                </div>
                <h3 className="font-bold mb-2" style={{ color: '#0B1F3A' }}>{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ color: '#0B1F3A' }}>Meet Our Team</h2>
          <p className="text-gray-500 mb-12">The experts behind Habesha Homes</p>
          <div className="flex flex-wrap justify-center gap-10">
            {team.map(member => (
              <div key={member.name} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-28 h-28 rounded-full mx-auto mb-4 object-cover shadow-lg"
                  style={{ border: '4px solid #D4AF37' }}
                />
                <p className="font-bold text-lg" style={{ color: '#0B1F3A' }}>{member.name}</p>
                <p className="text-sm font-medium" style={{ color: '#D4AF37' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: '#0B1F3A' }}>
        <h2 className="text-3xl font-bold mb-3 text-white">Ready to Find Your Home?</h2>
        <p className="mb-8" style={{ color: '#a0a0a0' }}>Browse our verified listings or get in touch with our team today.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/properties"
            className="px-8 py-3 rounded-xl font-bold text-sm transition-all"
            style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
            Browse Properties
          </Link>
          <Link to="/contact"
            className="px-8 py-3 rounded-xl font-bold text-sm border-2 transition-all"
            style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>
            Contact Us
          </Link>
        </div>
      </section>

    </div>
  )
}
