import { useState, useRef, useEffect } from 'react'

// ── Knowledge Base ──────────────────────────────────────────────
const KB = {
  company: {
    name: 'Get As Real Estate',
    founded: '2014',
    mission: 'Making quality housing accessible to every Ethiopian family.',
    office: 'Bole, Addis Ababa, Ethiopia',
    phone: '+251 911 000 000',
    whatsapp: 'https://wa.me/251911000000',
    email: 'info@habeshhomes.com',
    hours: 'Monday – Friday, 9am – 6pm EAT',
  },
  projects: [
    { name: 'Habesha Heights', location: 'Bole', type: 'Residential Apartments', units: 48, status: 'Completed', floors: 8 },
    { name: 'Nile Business Center', location: 'Kazanchis', type: 'Commercial Offices', units: 24, status: 'Completed', floors: 5 },
    { name: 'CMC Family Residences', location: 'CMC', type: 'Family Villas', units: 32, status: 'Completed', floors: null },
    { name: 'Bole Luxury Suites', location: 'Bole', type: 'Luxury Apartments', units: 60, status: 'Under Construction', floors: 12 },
    { name: 'Ring Road Mixed Use', location: 'Ring Road', type: 'Mixed Use', units: 80, status: 'Under Construction', floors: null },
    { name: 'Megenagna Towers', location: 'Megenagna', type: 'Luxury Towers', units: 120, status: 'Coming Soon', floors: 20 },
  ],
  apartments: ['Studio (1 room)', '1-bedroom', '2-bedroom', '3-bedroom', '4-bedroom', 'Penthouse'],
  amenities: ['24/7 Security', 'Underground Parking', 'Backup Power', 'Elevator', 'Rooftop Garden', 'Fiber Internet', 'CCTV'],
  locations: ['Bole', 'CMC', 'Kazanchis', 'Old Airport', 'Megenagna', 'Ring Road', 'Ayat', 'Gerji', 'Summit'],
  buyProcess: [
    '1. Contact our sales team or fill out an inquiry form',
    '2. Schedule a site visit to see the property',
    '3. Reserve your unit with a booking deposit',
    '4. Sign the sales agreement',
    '5. Complete payment per the agreed plan',
    '6. Receive your keys and title deed',
  ],
}

// ── Intent Matching ─────────────────────────────────────────────
function getResponse(input, leadInfo, setLeadInfo, setAwaitingName, setAwaitingPhone, lang) {
  const msg = input.toLowerCase().trim()
  const isAm = lang === 'am'

  // Greetings
  if (/^(hi|hello|hey|selam|ሰላም|እንደምን|good|start|begin)/.test(msg)) {
    return isAm
      ? `ሰላም! ወደ **ጌት አስ ሪል እስቴት** እንኳን ደህና መጡ። 🏠\n\nስለ ፕሮጀክቶቻችን፣ ቦታዎች፣ አፓርትመንት ዓይነቶች፣ ወይም ቢሮ አድራሻ ጥያቄ ካለዎት ደስ ይለኛል።\n\nምን ልረዳዎ?`
      : `Hello! Welcome to **Get As Real Estate**. 🏠\n\nI can help you with information about our projects, locations, apartment types, buying process, and how to reach our team.\n\nWhat would you like to know?`
  }

  // About company
  if (/about|company|who are|history|since|ስለ|ታሪክ|መቼ/.test(msg)) {
    return isAm
      ? `**ጌት አስ ሪል እስቴት** በ${KB.company.founded} ዓ.ም. ተቋቋመ። ዓላማችን ለእያንዳንዱ ኢትዮጵያዊ ቤተሰብ ጥራት ያለው ቤት ተደራሽ ማድረግ ነው።\n\nበአዲስ አበባ ውስጥ 500+ ቤቶችን አቅርበናል።`
      : `**Get As Real Estate** was founded in ${KB.company.founded} with one mission: "${KB.company.mission}"\n\nOver the past decade we have delivered 500+ residential and commercial properties across Addis Ababa.`
  }

  // Projects
  if (/project|develop|build|ፕሮጀክት|ግንባታ/.test(msg)) {
    const list = KB.projects.map(p => `• **${p.name}** — ${p.location} (${p.status})`).join('\n')
    return isAm
      ? `ፕሮጀክቶቻችን:\n\n${list}\n\nየትኛውን ፕሮጀክት በዝርዝር ማወቅ ይፈልጋሉ?`
      : `Here are our current projects:\n\n${list}\n\nWould you like details about a specific project?`
  }

  // Locations
  if (/location|where|area|neighborhood|ቦታ|አካባቢ|የት/.test(msg)) {
    return isAm
      ? `ፕሮጀክቶቻችን በሚከተሉት አካባቢዎች ይገኛሉ:\n${KB.locations.map(l => `• ${l}`).join('\n')}\n\nየትኛው አካባቢ ይስባዎታል?`
      : `Our projects are located across key areas of Addis Ababa:\n${KB.locations.map(l => `• ${l}`).join('\n')}\n\nWhich area interests you most?`
  }

  // Apartment types
  if (/bedroom|apartment|unit|type|studio|penthouse|ቤት|አፓርትመን|መኝታ/.test(msg)) {
    return isAm
      ? `የምናቀርባቸው የቤት ዓይነቶች:\n${KB.apartments.map(a => `• ${a}`).join('\n')}\n\nምን ዓይነት ቤት ይፈልጋሉ?`
      : `We offer the following apartment types:\n${KB.apartments.map(a => `• ${a}`).join('\n')}\n\nWhat size are you looking for?`
  }

  // Amenities / features
  if (/amenit|feature|facilit|parking|security|power|elevator|ጸጥታ|ፓርኪንግ/.test(msg)) {
    return isAm
      ? `ፕሮጀክቶቻችን የሚከተሉትን አገልግሎቶች ያካትታሉ:\n${KB.amenities.map(a => `• ${a}`).join('\n')}`
      : `Our buildings include premium amenities:\n${KB.amenities.map(a => `• ${a}`).join('\n')}`
  }

  // Price / cost
  if (/price|cost|how much|expensive|birr|etb|ዋጋ|ብር|ስንት/.test(msg)) {
    return isAm
      ? `ዋጋዎቹ በፕሮጀክቱ ዓይነት፣ ወለል፣ እና ክፍሎች ቁጥር ይለያያሉ። ትክክለኛ ዋጋ ለማወቅ የሽያጭ ቡድናችን ያናግሩ።\n\nስምዎ እና ስልክ ቁጥርዎ ቢሰጡን ወዲያው ይደውሉልዎታል። 📞`
      : `Prices vary by project, floor, and unit size. Our sales team can give you the most current pricing and available payment plans.\n\nCan I take your **name and phone number** so they can contact you directly? 📞`
  }

  // Payment plan
  if (/payment|install|plan|deposit|mortgage|ክፍያ|ዕቅድ|ቅድሚያ/.test(msg)) {
    return isAm
      ? `የክፍያ ዕቅዶቻችን ተለዋዋጭ ናቸው — ቅድሚያ ክፍያ እና ወርሃዊ ክፍያ ያካትታሉ። ዝርዝር ለማወቅ ቡድናችን ያናግሩ።\n\nስምዎ ቢሰጡን ያናግሩዎታል!`
      : `We offer flexible payment plans including down payment and installment options. Our sales team will walk you through the latest plans available.\n\nShare your **name and number** and we'll have someone call you!`
  }

  // Visit / viewing
  if (/visit|tour|view|see|appoint|schedule|ጉብኝት|ይጎብኙ|ቀጠሮ/.test(msg)) {
    return isAm
      ? `ጉብኝት ለማቀናበር ደስ ይለኛል! ስምዎ እና ስልክ ቁጥርዎ ቢሰጡን ቡድናችን ያናግሩዎታል።`
      : `I'd love to help you schedule a site visit! Please share your **name and phone number** and our team will arrange it for you.`
  }

  // Buy process / how to buy
  if (/how.*(buy|purchase|get|own)|process|step|ሂደት|እንዴት|ገዛ/.test(msg)) {
    return isAm
      ? `የመግዣ ሂደት:\n${KB.buyProcess.join('\n')}\n\nለዝርዝር ቡድናችን ያናግሩ።`
      : `Here's our buying process:\n${KB.buyProcess.join('\n')}\n\nFor details, our sales team is happy to guide you step by step.`
  }

  // Contact / office
  if (/contact|office|address|phone|call|email|reach|አድራሻ|ቢሮ|ስልክ/.test(msg)) {
    return isAm
      ? `📍 **ቢሮ:** ${KB.company.office}\n📞 **ስልክ:** ${KB.company.phone}\n✉️ **ኢሜይል:** ${KB.company.email}\n🕐 **ሰዓት:** ${KB.company.hours}`
      : `📍 **Office:** ${KB.company.office}\n📞 **Phone:** ${KB.company.phone}\n✉️ **Email:** ${KB.company.email}\n🕐 **Hours:** ${KB.company.hours}`
  }

  // Thank you
  if (/thank|thanks| አመሰግናለሁ|ስለዚህ/.test(msg)) {
    return isAm
      ? `እንኳን ደህና ሁኑ! ሌላ ጥያቄ ካለ ሁልጊዜ እዚህ ነኝ። 🏠`
      : `You're welcome! Feel free to ask anything else. We're here 24/7 to help. 🏠`
  }

  // Lead capture — name
  if (leadInfo.awaitingName) {
    setLeadInfo(prev => ({ ...prev, name: input, awaitingName: false, awaitingPhone: true }))
    setAwaitingName(false)
    setAwaitingPhone(true)
    return isAm
      ? `ስለዚህ ${input}! ስልክ ቁጥርዎን ቢሰጡን?`
      : `Nice to meet you, **${input}**! What's your phone number?`
  }

  // Lead capture — phone
  if (leadInfo.awaitingPhone) {
    setLeadInfo(prev => ({ ...prev, phone: input, awaitingPhone: false }))
    setAwaitingPhone(false)
    return isAm
      ? `አመሰግናለሁ! ቡድናችን በቅርቡ ያናግሩዎታል። ሌላ ጥያቄ ካለ ይጠይቁ! ✅`
      : `Thank you! Our sales team will contact you soon. Is there anything else I can help you with? ✅`
  }

  // Fallback
  return isAm
    ? `ጥሩ ጥያቄ! ስለ ፕሮጀክቶቻችን፣ ቦታዎች፣ ቤት ዓይነቶች፣ ወይም ቢሮ ያናግሩ። ወይም ስምዎ እና ስልክ ቁጥርዎ ቢሰጡን ቡድናችን ያናግሩዎታል!`
    : `I can help with information about our **projects, locations, apartment types, buying process**, or **contact details**.\n\nOr share your name and I'll have our team reach out to you! 😊`
}

// ── Component ───────────────────────────────────────────────────
export default function AIAssistant() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput]     = useState('')
  const [typing, setTyping]   = useState(false)
  const [lang, setLang]       = useState(() => localStorage.getItem('lang') || 'en')
  const [leadInfo, setLeadInfo] = useState({ name: '', phone: '', awaitingName: false, awaitingPhone: false })
  const [awaitingName, setAwaitingName]   = useState(false)
  const [awaitingPhone, setAwaitingPhone] = useState(false)
  const bottomRef = useRef(null)

  const isAm = lang === 'am'

  // Opening greeting
  useEffect(() => {
    if (open && messages.length === 0) {
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setMessages([{
          role: 'ai',
          text: isAm
            ? `ሰላም! እኔ **ጌት አስ ሪል እስቴት AI ረዳት** ነኝ። 🏠\n\nስለ ፕሮጀክቶቻችን፣ ቦታዎች፣ አፓርትመንት ዓይነቶች ወይም ቢሮ አድራሻ ጥያቄ ካለዎት ጠይቁ!\n\nምን ልረዳዎ?`
            : `Hi! I'm the **Get As Real Estate AI Assistant**. 🏠\n\nAsk me about our projects, locations, apartment types, buying process, or how to contact our team.\n\nHow can I help you today?`
        }])
      }, 600)
    }
  }, [open])

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setTyping(true)

    setTimeout(() => {
      const response = getResponse(
        userMsg,
        { ...leadInfo, awaitingName, awaitingPhone },
        setLeadInfo, setAwaitingName, setAwaitingPhone,
        lang
      )
      setTyping(false)
      setMessages(prev => [...prev, { role: 'ai', text: response }])

      // Trigger lead collection if response mentions name/phone
      if (!awaitingName && !awaitingPhone && !leadInfo.name &&
        /name|number|phone|contact|ስም|ስልክ/.test(response.toLowerCase())) {
        setTimeout(() => {
          setAwaitingName(true)
          setMessages(prev => [...prev, {
            role: 'ai',
            text: isAm ? `ስምዎ ምንድን ነው?` : `What's your name?`
          }])
        }, 800)
      }
    }, 800 + Math.random() * 400)
  }

  const handleKey = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  // Format text — bold and line breaks
  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g)
      return (
        <span key={i}>
          {parts.map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      )
    })
  }

  return (
    <>
      {/* Floating Button — LEFT side */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 left-5 z-50 w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ backgroundColor: '#0B1F3A' }}
        aria-label="AI Assistant"
        title="Ask our AI Assistant"
      >
        {open ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="#D4AF37" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .3 2.7-1.1 2.7H3.9c-1.4 0-2.1-1.7-1.1-2.7L4.2 15.3" />
          </svg>
        )}

        {/* Pulse ring */}
        {!open && (
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full animate-ping"
            style={{ backgroundColor: '#D4AF37', opacity: 0.75 }} />
        )}
      </button>

      {/* Chat Window — LEFT side */}
      {open && (
        <div className="fixed bottom-44 left-4 z-50 w-[340px] sm:w-[380px] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          style={{ maxHeight: '520px', border: '1px solid #e5e7eb' }}>

          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between flex-shrink-0"
            style={{ backgroundColor: '#0B1F3A' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#D4AF37', color: '#0B1F3A' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .3 2.7-1.1 2.7H3.9c-1.4 0-2.1-1.7-1.1-2.7L4.2 15.3" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">Get As Real Estate AI</p>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-xs" style={{ color: '#a0a0a0' }}>{isAm ? 'ዝግጁ ነኝ' : 'Online now'}</p>
                </div>
              </div>
            </div>
            {/* Lang toggle */}
            <button onClick={() => { const n = lang === 'en' ? 'am' : 'en'; setLang(n); localStorage.setItem('lang', n) }}
              className="text-xs font-bold px-2 py-1 rounded-lg border"
              style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>
              {lang === 'en' ? 'አማ' : 'EN'}
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ backgroundColor: '#F8F7F2' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'ai' && (
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center mr-2 flex-shrink-0 mt-1"
                    style={{ backgroundColor: '#0B1F3A' }}>
                    <svg className="w-4 h-4" fill="none" stroke="#D4AF37" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .3 2.7-1.1 2.7H3.9c-1.4 0-2.1-1.7-1.1-2.7L4.2 15.3" />
                    </svg>
                  </div>
                )}
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'text-white rounded-br-sm'
                    : 'text-gray-800 rounded-bl-sm'
                  }`}
                  style={{
                    backgroundColor: msg.role === 'user' ? '#0B1F3A' : 'white',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
                  }}>
                  {formatText(msg.text)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#0B1F3A' }}>
                  <svg className="w-4 h-4" fill="none" stroke="#D4AF37" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .3 2.7-1.1 2.7H3.9c-1.4 0-2.1-1.7-1.1-2.7L4.2 15.3" />
                  </svg>
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1.5 items-center">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-2 h-2 rounded-full animate-bounce"
                      style={{ backgroundColor: '#D4AF37', animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          {messages.length <= 1 && !typing && (
            <div className="px-4 pb-2 flex gap-2 flex-wrap bg-white border-t border-gray-100 pt-2">
              {(isAm
                ? ['ፕሮጀክቶች', 'ቦታዎች', 'አፓርትመንት', 'ቢሮ አድራሻ']
                : ['Our Projects', 'Locations', 'Apartment Types', 'Office & Hours']
              ).map(s => (
                <button key={s} onClick={() => { setInput(s); setTimeout(sendMessage, 50) }}
                  className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all"
                  style={{ borderColor: '#D4AF37', color: '#0B1F3A' }}
                  onMouseEnter={e => { e.target.style.backgroundColor = '#D4AF37' }}
                  onMouseLeave={e => { e.target.style.backgroundColor = 'transparent' }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 bg-white border-t border-gray-100 flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={isAm ? 'ጥያቄ ይጻፉ...' : 'Ask a question...'}
              className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none transition-colors"
              style={{ backgroundColor: '#fafafa' }}
              onFocus={e => e.target.style.borderColor = '#D4AF37'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
            <button onClick={sendMessage} disabled={!input.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
              style={{ backgroundColor: '#D4AF37' }}>
              <svg className="w-4 h-4" style={{ color: '#0B1F3A' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center py-1.5 text-xs bg-white" style={{ color: '#a0a0a0' }}>
            Get As Real Estate AI Assistant
          </div>
        </div>
      )}
    </>
  )
}
