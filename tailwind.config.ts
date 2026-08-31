import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,jsx,mdx,ts,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem', fontWeight: 200 }],
      sm: ['0.875rem', { lineHeight: '1.5rem', fontWeight: 200 }],
      base: ['1rem', { lineHeight: '1.75rem', fontWeight: 200 }],
      lg: ['1.125rem', { lineHeight: '1.75rem', fontWeight: 200 }],
      xl: ['1.25rem', { lineHeight: '2rem', fontWeight: 200 }],
      '2xl': ['1.5rem', { lineHeight: '2.25rem', fontWeight: 200 }],
      '3xl': ['1.75rem', { lineHeight: '2.25rem', fontWeight: 200 }],
      '4xl': ['2rem', { lineHeight: '2.5rem', fontWeight: 200 }],
      '5xl': ['2.5rem', { lineHeight: '3rem', fontWeight: 200 }],
      '6xl': ['3rem', { lineHeight: '3.5rem', fontWeight: 200 }],
      '7xl': ['4rem', { lineHeight: '4.5rem', fontWeight: 200 }],
    },
    extend: {
      colors: {
        paper: '#f4f1e8',
        ink: '#17151a',
        purple: '#5c21e6',
        acid: '#dfff3f',
        yellow: '#ffc91c',
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
      fontFamily: {
        sans: ['Inter'],
        display: [['Inter'], { fontVariationSettings: '"wdth" 125' }],
      },
    },
  },
  plugins: [],
} satisfies Config
