/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neo-Brutalism Color Palette
        brutal: {
          blue: '#0057FF',      // Angkot Blue - Primary Action
          orange: '#FF4800',    // Construction Orange - Secondary Action
          yellow: '#FFEB00',    // Brutalist Yellow - Accent/Hover
          black: '#000000',     // Pure Black - Borders & Text
          white: '#FDFDFD',     // Off-white - Background
          paper: '#F5F5F0',     // Raw paper color
          gray: '#E5E5E5',      // Light gray for containers
          darkgray: '#CCCCCC',  // Darker gray
        },
        // Surface colors
        surface: {
          50: '#FDFDFD',        // Main background
          100: '#F5F5F0',       // Paper texture
          200: '#EBEBEB',       // Slightly darker
          300: '#D4D4D4',       // Borders
        },
      },
      fontFamily: {
        heading: ['Archivo', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['Archivo', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['Space Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-sm': '2px 2px 0px 0px #000000',
        'brutal-lg': '6px 6px 0px 0px #000000',
        'brutal-xl': '8px 8px 0px 0px #000000',
        'brutal-hover': '6px 6px 0px 0px #000000',
        'brutal-blue': '4px 4px 0px 0px #0057FF',
        'brutal-orange': '4px 4px 0px 0px #FF4800',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
      borderRadius: {
        'none': '0px',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
