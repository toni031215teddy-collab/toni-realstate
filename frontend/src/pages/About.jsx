import { Link } from 'react-router-dom'

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Properties Delivered' },
  { value: '500+', label: 'Happy Families' },
  { value: '100%', label: 'Client Satisfaction' },
]

const values = [
  { icon: '🤝', title: 'Trust & Integrity', desc: 'We build long-term relationships with our clients based on complete honesty and transparency.' },
  { icon: '💎', title: 'Quality First', desc: 'Every property we deliver meets the highest standards of construction and design.' },
  { icon: '🌍', title: 'Ethiopian Pride', desc: 'Rooted in Ethiopian culture, we are committed to building communities that thrive.' },
  { icon: '📈', title: 'Investment Value', desc: 'We ensure our properties are strategically located for maximum long-term value.' },
]

const team = [
  { name: 'Temer Bekele', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200' },
  { name: 'Tigist Haile', role: 'Head of Sales', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200' },
  { name: 'Abebe Girma', role: 'Lead Architect', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
]

export default function About() {
  return (
    <div>

      {/* Hero */}
      <section
        className="relative text-white py-24 px-4 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">About Habesha Homes</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-8">
            A leading real estate developer in Addis Ababa, Ethiopia — helping families and businesses find quality properties for over a decade.
          </p>
          <Link to="/properties" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block shadow-lg">
            Browse Properties
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <p className="text-4xl font-bold">{s.value}</p>
              <p className="text-primary-100 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">Our Story</h2>
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
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">Our Values</h2>
          <p className="section-sub text-center mb-12">What drives us every day</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow text-center">
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-sub mb-12">The experts behind Habesha Homes</p>
          <div className="flex flex-wrap justify-center gap-10">
            {team.map(member => (
              <div key={member.name} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-28 h-28 rounded-full mx-auto mb-4 object-cover shadow-lg ring-4 ring-primary-100"
                />
                <p className="font-bold text-gray-800 text-lg">{member.name}</p>
                <p className="text-primary-600 text-sm font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-3">Ready to Find Your Home?</h2>
        <p className="text-primary-100 mb-6">Browse our verified listings or get in touch with our team today.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/properties" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
            Browse Properties
          </Link>
          <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>

    </div>
  )
}
