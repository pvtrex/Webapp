/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ebf5ff',
          100: '#e1f0ff',
          200: '#c7e2ff',
          300: '#a4cfff',
          400: '#76b6ff',
          500: '#3b94fb',
          600: '#2174f0',
          700: '#1a5cd9',
          800: '#1a4cb1',
          900: '#1c418a',
        },
        secondary: {
          50: '#effcf6',
          100: '#dafeef',
          200: '#b8f8df',
          300: '#84f0cc',
          400: '#48e0b4',
          500: '#1fc89d',
          600: '#12a587',
          700: '#12846f',
          800: '#136859',
          900: '#125649',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffeed3',
          200: '#fed6a8',
          300: '#fdba72',
          400: '#fb9937',
          500: '#fb8a14',
          600: '#f97316',
          700: '#c45310',
          800: '#9a420e',
          900: '#7c380e',
        },
        background: '#F0F0F0',
        secondary: '#EFEFEF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};