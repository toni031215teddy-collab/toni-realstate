/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#f0f4fa',
          100: '#d9e2f0',
          200: '#b3c5e1',
          300: '#7a9bc8',
          400: '#4a72ae',
          500: '#2d5494',
          600: '#1e3f7a',
          700: '#142d5e',
          800: '#0e2047',
          900: '#0B1F3A',
        },
        gold: {
          100: '#fdf3d0',
          200: '#fae89a',
          300: '#f5d655',
          400: '#efc52a',
          500: '#D4AF37',
          600: '#b8941e',
          700: '#9a7815',
          800: '#7d5f10',
          900: '#5c430b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
