/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      fontFamily:{
        sans: 'Roboto, sans-serif'
      },
      colors:{
        gray: {
          300: '#efefef',
          500: '#ebebeb',
          700: '#E0E0E0',
        },
        brown: {
          100: '#C9A37E',
          300: '#90663C',
          500: '#6c4c2d',
          700: '#563D24',
        },
        black: {
          300: '#474747',
          500: '#292929',
          700: '#070707',
        },
        gold: {
          300: '#FFB347',
          500: '#ff9f1c',
          700: '#E08300',
        },
        green: {
          300: '#06C6B9',
          500: '#048A81',
          700: '#04776F',
          900: '#024F4A',
        }
      }
    },
  },
  plugins: [],
}
