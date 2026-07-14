import { useState } from 'react'

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '2:00 PM',  '3:00 PM',
  '4:00 PM',  '5:00 PM',
]

export default function ScheduleViewing({ propertyTitle }) {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '' })
  const [sent, setSent]   = useState(false)
  const [loading, setLoading] = useState(false)

  // Min date = today
  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call — TODO: connect to backend
    await new Promise(r => setTimeout(r, 800))
    setSent(true)
    setLoading(false)
  }

  if (sent) return (
    <div className="text-center py-8">
      <div className="text-5xl mb-3">✅</div>
      <h4 className="font-bold text-lg mb-1" style={{ color: '#0B1F3A' }}>Viewing Scheduled!</h4>
      <p className="text-gray-500 text-sm mb-1">
        <strong>{form.date}</strong> at <strong>{form.time}</strong>
      </p>
      <p className="text-gray-400 text-xs mb-4">Our agent will call you at <strong>{form.phone}</strong> to confirm.</p>
      <button
        onClick={() => { setSent(false); setForm({ name: '', phone: '', date: '', time: '' }) }}
        className="text-sm font-medium"
        style={{ color: '#D4AF37' }}
      >
        Schedule another
      </button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Your Name</label>
        <input
          type="text" required
          placeholder="Full name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': '#D4AF37' }}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Phone Number</label>
        <input
          type="tel" required
          placeholder="+251 9XX XXX XXX"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Preferred Date</label>
        <input
          type="date" required
          min={today}
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">Preferred Time</label>
        <div className="grid grid-cols-4 gap-1.5">
          {timeSlots.map(slot => (
            <button
              key={slot}
              type="button"
              onClick={() => setForm({ ...form, time: slot })}
              className="py-1.5 rounded-lg text-xs font-medium border transition-all"
              style={{
                backgroundColor: form.time === slot ? '#0B1F3A' : 'white',
                color:           form.time === slot ? '#D4AF37' : '#374151',
                borderColor:     form.time === slot ? '#0B1F3A' : '#e5e7eb',
              }}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
      <button
        type="submit"
        disabled={loading || !form.time}
        className="py-3 rounded-xl font-bold text-sm mt-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}
      >
        {loading ? 'Booking...' : '📅 Schedule Viewing'}
      </button>
    </form>
  )
}
