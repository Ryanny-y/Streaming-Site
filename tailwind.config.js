/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        default: '100%',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '160px',
      },
    },
    extend: {
      colors: {
        "light-red": 'rgb(211, 119, 119)'
      },
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
