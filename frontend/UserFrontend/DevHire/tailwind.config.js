/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[class~="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          400: '#5A72EE',
          500: '#4361ee',
          600: '#3b4fd8',
          700: '#3341c2',
          900: '#1e2875',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          400: '#8B5CF6',
          500: '#7209b7',
          600: '#6406a3',
          700: '#55058f',
          900: '#3d0464',
        },
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          500: '#4cc9f0',
          600: '#0ea5e9',
          700: '#0284c7',
        },
        dark: {
          bg: '#0d1117',
          surface: '#161b22',
          border: '#21262d',
        },
        light: {
          bg: '#f8f9fa',
          surface: '#ffffff',
          border: '#e1e5e9',
        }
      },
      animation: {
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'neo': '8px 8px 0px 0px #000',
        'neo-hover': '12px 12px 0px 0px #000',
      },
    },
  },
  plugins: [],
  // Add custom variant for black and white theme
  variants: {
    extend: {
      backgroundColor: ['blackwhite'],
      textColor: ['blackwhite'],
      borderColor: ['blackwhite'],
    },
  },
  // Custom selector for black and white theme
  safelist: [
    {
      pattern: /blackwhite:.*/,
    },
  ],
};