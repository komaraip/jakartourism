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
        // Vibrant Tropical Color Palette
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#EC4899', // Tropical Pink - Main Primary
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        secondary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06B6D4', // Ocean Cyan - Main Secondary
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#FBBF24', // Sunny Yellow - Main Accent
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        tropical: {
          green: '#10B981',   // Lush Green
          orange: '#F97316',  // Tropical Orange
          purple: '#8B5CF6',  // Paradise Purple
          blue: '#3B82F6',    // Ocean Blue
        },
        surface: {
          50: '#FFFFFF',      // Pure White
          100: '#F8FAFC',     // Light Surface
          200: '#F1F5F9',     // Soft Gray
          300: '#E2E8F0',
        },
        // Dark mode surfaces
        dark: {
          50: '#1E293B',
          100: '#0F172A',
          200: '#0B1120',
          300: '#060A14',
        },
        charcoal: {
          DEFAULT: '#1E293B', // Deep Text
          light: '#334155',
          dark: '#0F172A',
        },
        warmgray: {
          DEFAULT: '#64748B', // Text Secondary
          light: '#94A3B8',
          dark: '#475569',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(236, 72, 153, 0.1), 0 10px 20px -2px rgba(6, 182, 212, 0.05)',
        'soft-lg': '0 10px 40px -10px rgba(236, 72, 153, 0.15), 0 20px 25px -5px rgba(6, 182, 212, 0.08)',
        'soft-xl': '0 25px 50px -12px rgba(236, 72, 153, 0.2)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.3)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.3)',
        // Dark mode shadows
        'dark-soft': '0 2px 15px -3px rgba(0, 0, 0, 0.3), 0 10px 20px -2px rgba(0, 0, 0, 0.2)',
        'dark-soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.4), 0 20px 25px -5px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'tropical-gradient': 'linear-gradient(135deg, #EC4899 0%, #06B6D4 50%, #10B981 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #F97316 0%, #EC4899 50%, #8B5CF6 100%)',
        'ocean-gradient': 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
      },
    },
  },
  plugins: [],
}
