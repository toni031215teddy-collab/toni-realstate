import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fix broken default marker icons in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Gold custom marker
const goldIcon = new L.DivIcon({
  className: '',
  html: `
    <div style="
      width:36px;height:36px;
      background:#D4AF37;
      border:3px solid #0B1F3A;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      box-shadow:0 4px 12px rgba(0,0,0,0.3);
    "></div>
  `,
  iconSize:   [36, 36],
  iconAnchor: [18, 36],
  popupAnchor:[0, -38],
})

// Component to re-center map when coords change
function RecenterMap({ coords }) {
  const map = useMap()
  useEffect(() => {
    map.setView(coords, 16)
  }, [coords, map])
  return null
}

export default function PropertyMap({ location, city, title }) {
  const [coords, setCoords]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  useEffect(() => {
    if (!location) return

    // Build a precise search query
    const query = encodeURIComponent(
      `${location}, ${city || 'Addis Ababa'}, Ethiopia`
    )

    fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1&countrycodes=et`,
      { headers: { 'Accept-Language': 'en' } }
    )
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)])
        } else {
          // Fallback: search just the city
          const fallbackQuery = encodeURIComponent(`${city || 'Addis Ababa'}, Ethiopia`)
          return fetch(
            `https://nominatim.openstreetmap.org/search?q=${fallbackQuery}&format=json&limit=1&countrycodes=et`,
            { headers: { 'Accept-Language': 'en' } }
          )
            .then(r => r.json())
            .then(d => {
              if (d && d.length > 0) {
                setCoords([parseFloat(d[0].lat), parseFloat(d[0].lon)])
              } else {
                // Final fallback: Addis Ababa center
                setCoords([9.0250, 38.7469])
              }
            })
        }
      })
      .catch(() => {
        setCoords([9.0250, 38.7469])
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [location, city])

  if (loading) return (
    <div className="rounded-2xl flex items-center justify-center bg-gray-100" style={{ height: 320 }}>
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-2"
          style={{ borderColor: '#D4AF37', borderTopColor: 'transparent' }} />
        <p className="text-gray-400 text-sm">Loading map...</p>
      </div>
    </div>
  )

  if (!coords) return null

  return (
    <div>
      <div className="rounded-2xl overflow-hidden shadow-md" style={{ height: 320, zIndex: 0 }}>
        <MapContainer
          center={coords}
          zoom={16}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <RecenterMap coords={coords} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coords} icon={goldIcon}>
            <Popup>
              <div style={{ minWidth: 160 }}>
                <strong style={{ color: '#0B1F3A' }}>{title}</strong>
                <br />
                <span style={{ color: '#666', fontSize: 12 }}>📍 {location}</span>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      {error && (
        <p className="text-xs text-amber-500 mt-2">⚠️ Could not find exact location — showing approximate area.</p>
      )}
    </div>
  )
}
