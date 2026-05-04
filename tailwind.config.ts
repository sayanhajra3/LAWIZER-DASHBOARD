import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0f172a',
          800: '#172554',
          700: '#1e3a8a',
          600: '#2563eb',
          500: '#3b82f6'
        },
        accent: '#f97316',
        surface: '#f8fafc'
      },
      boxShadow: {
        panel: '0 20px 60px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
