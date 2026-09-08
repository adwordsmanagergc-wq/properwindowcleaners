import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef4fb', 100: '#d8e6f6', 200: '#b4cdec', 300: '#83addf',
          400: '#4f88cf', 500: '#2c6ab9', 600: '#1d4e8f', 700: '#1a4278',
          800: '#183964', 900: '#173154', 950: '#0f2038',
        },
        sky: {
          50: '#f0f8ff', 100: '#e0f0fe', 200: '#b9e2fe', 300: '#7ccdfd',
          400: '#36b4f9', 500: '#0c9bea', 600: '#007bc8', 700: '#0162a2',
          800: '#065386', 900: '#0b456f', 950: '#072b4a',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: { content: '1180px' },
    },
  },
  plugins: [],
};
export default config;
