import { useState } from 'react'

const WHATSAPP_NUMBER = '251911000000'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call — swap with real endpoint when ready
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  const contactItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Our Office',
      value: 'Bole, Addis Ababa, Ethiopia',
      href: null,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: '+251 911 000 000',
      href: 'tel:+251911000000',
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      label: 'WhatsApp',
      value: '+251 911 000 000',
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20have%20an%20inquiry%20about%20a%20property.`,
      green: true,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'info@habeshhomes.com',
      href: 'mailto:info@habeshhomes.com',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Working Hours',
      value: 'Mon – Fri: 9am – 6pm EAT',
      href: null,
    },
  ]

  return (
    <div style={{ backgroundColor: '#F8F7F2' }}>

      {/* Hero */}
      <section
        className="relative text-white py-24 px-4 text-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(11,31,58,0.75)' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ backgroundColor: '#D4AF3730', color: '#D4AF37', border: '1px solid #D4AF3760' }}>
            Contact Us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Let's Start a Conversation</h1>
          <p className="text-gray-300 text-lg">Have questions about a property or want to list your home? Our team is here and ready to help.</p>
        </div>
      </section>

      {/* Contact Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* ── Left: Info + Map ── */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#0B1F3A' }}>Our Office</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Visit us at our Bole office or reach out via any of the channels below — we respond quickly.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-3">
            {contactItems.map(item => (
              <div key={item.label} className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: item.green ? '#dcfce7' : '#EEF1F8', color: item.green ? '#16a34a' : '#0B1F3A' }}>
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{item.label}</p>
                  {item.href ? (
                    <a href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="font-semibold text-sm truncate block transition-colors hover:underline"
                      style={{ color: item.green ? '#16a34a' : '#0B1F3A' }}>
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-sm" style={{ color: '#0B1F3A' }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Google Maps embed — Bole, Addis Ababa */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
            <iframe
              title="Habesha Homes Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15762.340855597!2d38.78!3d9.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sBole%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="220"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-md p-8">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: '#dcfce7' }}>
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#0B1F3A' }}>Message Sent!</h3>
                <p className="text-gray-500 mb-6">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
                  style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-6" style={{ color: '#0B1F3A' }}>Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Abebe Girma"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                        style={{ backgroundColor: '#fafafa' }}
                        onFocus={e => e.target.style.borderColor = '#D4AF37'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                        style={{ backgroundColor: '#fafafa' }}
                        onFocus={e => e.target.style.borderColor = '#D4AF37'}
                        onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="Property inquiry, listing, general question..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                      style={{ backgroundColor: '#fafafa' }}
                      onFocus={e => e.target.style.borderColor = '#D4AF37'}
                      onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us what you're looking for..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
                      style={{ backgroundColor: '#fafafa' }}
                      onFocus={e => e.target.style.borderColor = '#D4AF37'}
                      onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#0B1F3A', color: '#D4AF37' }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                          style={{ borderColor: '#D4AF37', borderTopColor: 'transparent' }} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
