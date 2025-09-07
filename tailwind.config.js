/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Mars-themed color palette - Brand Red #EA3323
        mars: {
          50: '#fef2f2',
          100: '#fcc2bb',
          200: '#f66849',
          300: '#f04d36',
          400: '#EA3323',
          500: '#EA3323',
          600: '#8b1d1d',
          700: '#611616',
          800: '#3b0e0e',
          900: '#2a0909',
          950: '#1a0404',
        },
        background: {
          DEFAULT: '#0b0b0e',
          panel: '#121218',
          muted: '#1a1a22',
        },
        text: {
          hi: '#ffffff',
          med: '#c9c9d1',
          lo: '#9a9aa3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'twinkle': 'twinkle 8s linear infinite',
        'orbit': 'orbit 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '50%': { opacity: '0.7' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'orbit': 'radial-gradient(120% 120% at 10% 10%, rgba(234,51,35,.25), transparent 60%), radial-gradient(120% 120% at 90% 90%, rgba(246,104,73,.2), transparent 55%), linear-gradient(180deg, #121218 0%, #0b0b0e 100%)',
        'mars': 'conic-gradient(from 220deg at 50% 50%, #EA3323, #f66849, #EA3323, #2a0909 75%, #121218 100%)',
      },
    },
  },
  plugins: [],
}

