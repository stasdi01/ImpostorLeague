/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: '#E8620A',
        black: '#1A1A1A',
        'dark-grey': '#2A2A2A',
        grey: '#8A8A8A',
      },
    },
  },
  plugins: [],
};
