import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function MortgageCalculator() {
  const [price,       setPrice]       = useState(3000000)
  const [downPct,     setDownPct]     = useState(20)
  const [rate,        setRate]        = useState(9.5)
  const [years,       setYears]       = useState(20)
  const [result,      setResult]      = useState(null)

  useEffect(() => {
    const down        = (price * downPct) / 100
    const principal   = price - down
    const monthlyRate = rate / 100 / 12
    const n           = years * 12

    if (monthlyRate === 0) {
      setResult({ monthly: principal / n, principal, down, total: principal, interest: 0 })
      return
    }

    const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) /
                    (Math.pow(1 + monthlyRate, n) - 1)
    const total    = monthly * n
    const interest = total - principal

    setResult({ monthly, principal, down, total, interest })
  }, [price, downPct, rate, years])

  const fmt = (n) => Math.round(n).toLocaleString()

  // Pie chart percentages
  const principalPct = result ? Math.round((result.principal / result.total) * 100) : 0
  const interestPct  = 100 - principalPct

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F2' }}>

      {/* Header */}
      <div className="relative text-white py-16 px-4"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/65" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">Mortgage Calculator</h1>
          <p className="text-gray-200 text-lg">Estimate your monthly payments for any property in Ethiopia</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── Inputs ── */}
          <div className="bg-white rounded-2xl shadow-md p-7">
            <h2 className="font-bold text-xl mb-6" style={{ color: '#0B1F3A' }}>Loan Details</h2>

            {/* Property Price */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-600">Property Price</label>
                <span className="font-bold text-lg" style={{ color: '#D4AF37' }}>{fmt(price)} ETB</span>
              </div>
              <input type="range" min="500000" max="30000000" step="100000"
                value={price} onChange={e => setPrice(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: '#D4AF37' }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>500K ETB</span><span>30M ETB</span>
              </div>
            </div>

            {/* Down Payment */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-600">Down Payment</label>
                <span className="font-bold text-lg" style={{ color: '#D4AF37' }}>{downPct}% — {result ? fmt(result.down) : 0} ETB</span>
              </div>
              <input type="range" min="5" max="50" step="5"
                value={downPct} onChange={e => setDownPct(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: '#D4AF37' }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>5%</span><span>50%</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-600">Annual Interest Rate</label>
                <span className="font-bold text-lg" style={{ color: '#D4AF37' }}>{rate}%</span>
              </div>
              <input type="range" min="5" max="20" step="0.5"
                value={rate} onChange={e => setRate(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: '#D4AF37' }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>5%</span><span>20%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-600">Loan Term</label>
                <span className="font-bold text-lg" style={{ color: '#D4AF37' }}>{years} years</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20, 25, 30].map(y => (
                  <button key={y} onClick={() => setYears(y)}
                    className="py-2 rounded-xl text-sm font-bold border-2 transition-all"
                    style={{
                      backgroundColor: years === y ? '#0B1F3A' : 'white',
                      color:           years === y ? '#D4AF37' : '#6b7280',
                      borderColor:     years === y ? '#0B1F3A' : '#e5e7eb',
                    }}>
                    {y}yr
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="flex flex-col gap-6">

            {/* Monthly Payment — Hero */}
            <div className="rounded-2xl p-8 text-center text-white shadow-xl"
              style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1e3f7a 100%)' }}>
              <p className="text-gray-300 text-sm mb-2 uppercase tracking-widest font-semibold">Monthly Payment</p>
              <p className="text-5xl font-bold mb-1" style={{ color: '#D4AF37' }}>
                {result ? fmt(result.monthly) : '—'}
              </p>
              <p className="text-gray-400 text-sm">ETB / month</p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-gray-400 text-xs mb-1">Loan Amount</p>
                  <p className="text-white font-bold text-sm">{result ? fmt(result.principal) : '—'} ETB</p>
                </div>
                <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-gray-400 text-xs mb-1">Down Payment</p>
                  <p className="text-white font-bold text-sm">{result ? fmt(result.down) : '—'} ETB</p>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold mb-4" style={{ color: '#0B1F3A' }}>Payment Breakdown</h3>

              {/* Visual bar */}
              <div className="flex rounded-full overflow-hidden h-5 mb-4">
                <div className="transition-all duration-500"
                  style={{ width: `${principalPct}%`, backgroundColor: '#0B1F3A' }} />
                <div className="transition-all duration-500"
                  style={{ width: `${interestPct}%`, backgroundColor: '#D4AF37' }} />
              </div>
              <div className="flex gap-4 text-xs mb-5">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: '#0B1F3A' }}></span>
                  Principal ({principalPct}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ backgroundColor: '#D4AF37' }}></span>
                  Interest ({interestPct}%)
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Total Principal',    value: result?.principal, color: '#0B1F3A' },
                  { label: 'Total Interest',      value: result?.interest,  color: '#D4AF37' },
                  { label: 'Total Amount Paid',   value: result?.total,     color: '#e11d48' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className="font-bold text-sm" style={{ color: item.color }}>
                      {item.value ? fmt(item.value) : '—'} ETB
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl p-5 text-center" style={{ backgroundColor: '#D4AF37' }}>
              <p className="font-bold mb-1" style={{ color: '#0B1F3A' }}>Ready to find your home?</p>
              <p className="text-sm mb-3" style={{ color: '#5c430b' }}>Browse properties within your budget</p>
              <Link to="/properties"
                className="inline-block px-6 py-2.5 rounded-xl font-bold text-sm transition-all"
                style={{ backgroundColor: '#0B1F3A', color: '#D4AF37' }}>
                Browse Properties
              </Link>
            </div>
          </div>
        </div>

        {/* Info note */}
        <p className="text-center text-xs text-gray-400 mt-8">
          * This calculator provides estimates only. Actual loan terms may vary based on your bank and credit profile.
          Contact your bank or financial advisor for accurate figures.
        </p>
      </div>
    </div>
  )
}
