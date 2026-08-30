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
        background: {
          DEFAULT: '#030303',
          secondary: '#0a0a0a',
          tertiary: '#111111',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.03)',
          hover: 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.12)',
        },
        text: {
          primary: '#fafafa',
          secondary: '#a3a3a3',
          muted: '#737373',
        },
        accent: {
          DEFAULT: '#ffffff',
          glow: 'rgba(255, 255, 255, 0.15)',
          strong: 'rgba(255, 255, 255, 0.25)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 8vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'heading-1': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'heading-2': ['clamp(1.5rem, 3.5vw, 2.5rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'heading-3': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'space-4xs': '0.125rem',
        'space-3xs': '0.25rem',
        'space-2xs': '0.375rem',
        'space-xs': '0.5rem',
        'space-sm': '0.75rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2rem',
        'space-2xl': '3rem',
        'space-3xl': '4rem',
        'space-4xl': '6rem',
        'space-5xl': '8rem',
      },
      borderRadius: {
        'radius-sm': '0.375rem',
        'radius-md': '0.5rem',
        'radius-lg': '0.75rem',
        'radius-xl': '1rem',
        'radius-2xl': '1.5rem',
      },
      boxShadow: {
        'glass': '0 4px 32px -8px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'glass-hover': '0 8px 48px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glow': '0 0 24px rgba(255, 255, 255, 0.08), 0 0 48px rgba(255, 255, 255, 0.04)',
        'glow-strong': '0 0 32px rgba(255, 255, 255, 0.12), 0 0 64px rgba(255, 255, 255, 0.06)',
        'magnetic': '0 12px 48px -16px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.12)',
      },
      backdropBlur: {
        'glass': '16px',
        'glass-strong': '24px',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '400ms',
        'slower': '600ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'blur-in': 'blurIn 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(20px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 24px rgba(255, 255, 255, 0.08), 0 0 48px rgba(255, 255, 255, 0.04)' },
          '50%': { boxShadow: '0 0 32px rgba(255, 255, 255, 0.12), 0 0 64px rgba(255, 255, 255, 0.06)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}