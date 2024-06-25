/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xs': '360px',
        ...defaultTheme.screens,
      },
      fontSize:{
        'xxs': '0.5rem',
        ...defaultTheme.fontSize,
      }
    },
  },
  plugins: [],
}