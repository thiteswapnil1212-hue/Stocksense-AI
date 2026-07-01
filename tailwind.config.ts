import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#38bdf8',
        bgMain: '#050816',
        surface: '#0b1225',
        surfaceAccent: '#111a33',
        textPrimary: '#ffffff',
        textSecondary: '#94a3b8',
        glowBlue: '#3fb1ff',
      },
      boxShadow: {
        premium: '0 8px 40px rgba(0,0,0,0.35)',
      },
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'navy-radial': 'radial-gradient(circle at top, rgba(56,189,248,0.16), transparent 24%), radial-gradient(circle at 80% 10%, rgba(56,189,248,0.08), transparent 18%)',
      },
    },
  },
  plugins: [],
};

export default config;
