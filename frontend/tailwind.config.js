/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        editorial: {
          bg: '#0A0A0A',
          bgSec: '#111111',
          card: '#151515',
          textPri: '#F5F3EF',
          textSec: '#9A9A9A',
          amberStart: '#D98A3D',
          amberEnd: '#E8A55C',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
