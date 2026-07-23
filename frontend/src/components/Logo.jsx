export default function Logo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Get As Real Estate Logo"
    >
      {/* Red background block */}
      <rect x="0" y="0" width="100" height="90" rx="4" fill="#E02020" />

      {/* G */}
      <text x="2" y="44" fontFamily="Arial Black, Arial" fontWeight="900"
        fontSize="42" fill="white" letterSpacing="-2">G</text>

      {/* E */}
      <text x="34" y="44" fontFamily="Arial Black, Arial" fontWeight="900"
        fontSize="42" fill="white" letterSpacing="-2">E</text>

      {/* T — styled as building with notch */}
      <text x="64" y="44" fontFamily="Arial Black, Arial" fontWeight="900"
        fontSize="42" fill="white" letterSpacing="-2">T</text>

      {/* A */}
      <text x="2" y="84" fontFamily="Arial Black, Arial" fontWeight="900"
        fontSize="42" fill="white" letterSpacing="-2">A</text>

      {/* S */}
      <text x="44" y="84" fontFamily="Arial Black, Arial" fontWeight="900"
        fontSize="42" fill="white" letterSpacing="-2">S</text>

      {/* REAL ESTATE text below */}
      <text x="50" y="106" fontFamily="Arial Black, Arial" fontWeight="900"
        fontSize="11" fill="#1a1a1a" textAnchor="middle" letterSpacing="1">
        REAL ESTATE
      </text>
    </svg>
  )
}
