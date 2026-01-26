/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Rebrand palette
        brand: '#024731',          // deep green
        'brand-accent': '#e9c694', // highlight sand
      },
      backgroundColor: {
        skin: {
          // dark-green near-black base + elevated surface
          base: '#00100b',
          elev: '#011b13',
        },
      },
      textColor: {
        skin: {
          // fog neutral + green-gray muted
          base: '#c8c8c8',
          muted: '#839b93',
        },
      },
      borderColor: {
        skin: {
          base: '#152c25',
        },
      },
      maxWidth: {
        content: '1100px',
      },
    },
  },
  plugins: [],
};
