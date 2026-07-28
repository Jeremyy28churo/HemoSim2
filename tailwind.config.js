/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Lienzo hueso cálido
        bone: {
          50: '#FBF8F3',
          100: '#F7F3EC',
          200: '#EFE8DC',
          300: '#E4D9C6',
          400: '#D3C4AC',
        },
        // Tinta profunda
        ink: {
          DEFAULT: '#211B15',
          soft: '#3A322B',
          muted: '#6B5F52',
          faint: '#9A8E7E',
        },
        // Sangre / hematíes (rojo arterial -> granate venoso)
        blood: {
          300: '#D65A4A',
          400: '#C0392B',
          500: '#A02B22',
          600: '#7B1E1E',
          700: '#5E1717',
        },
        // Oxígeno (teal profundo)
        oxy: {
          300: '#4FB3BD',
          400: '#2A97A2',
          500: '#0E7C86',
          600: '#0A6A73',
          700: '#0A5A62',
        },
        // Adaptación / altitud (ocre andino)
        gold: {
          300: '#DDB05A',
          400: '#C99A3B',
          500: '#B7791F',
          600: '#8C5E17',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(33,27,21,0.04), 0 8px 24px -12px rgba(33,27,21,0.18)',
        lift: '0 2px 4px rgba(33,27,21,0.06), 0 18px 40px -18px rgba(33,27,21,0.28)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        riseIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out both',
        'rise-in': 'riseIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
