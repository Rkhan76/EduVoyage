/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#5424c4',
        'custom-black-high': '#2c2f30',
        'custom-black-low': '#2c2f30',
      },
    },
  },
  plugins: [],
}
