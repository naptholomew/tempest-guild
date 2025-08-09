/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#00274C',         // Michigan Blue
        'brand-accent': '#FFCB05' // Michigan Maize
      },
      backgroundColor: {
        skin: {
          base: '#0b0e11',
          elev: '#0f141a'
        }
      },
      textColor: {
        skin: {
          base: '#e6edf3',
          muted: '#94a3b8'
        }
      },
      borderColor: {
        skin: {
          base: '#1f2937'
        }
      },
      maxWidth: {
        content: '1100px'
      }
    }
  },
  plugins: [],
}
