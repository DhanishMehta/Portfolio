import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base backgrounds
        'bg-base': '#060D1F',
        'bg-surface': '#0C1528',
        'bg-border': '#1A2744',
        'bg-border-hover': '#243356',
        // Text
        'text-primary': '#F0F4FF',
        'text-secondary': '#7A8CAE',
        'text-muted': '#3D5070',
        // Accent
        'accent': '#F5A420',
        'accent-hover': '#FFB83D',
        // Human section warm
        'warm-base': '#1A1008',
        'warm-accent': '#E07820',
        // Gemini chat
        'chat-surface': '#1A2744',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'Fira Code', 'monospace'],
      },
      animation: {
        'drift-slow': 'drift 12s ease-in-out infinite alternate',
        'drift-medium': 'drift 9s ease-in-out infinite alternate-reverse',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scroll-hint': 'scrollHint 2s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translate(0%, 0%) scale(1)' },
          '100%': { transform: 'translate(3%, 5%) scale(1.05)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scrollHint: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.4' },
        },
      },
      transitionTimingFunction: {
        'portfolio': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
