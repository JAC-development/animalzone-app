/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'primary-y': '#F5CB5B',
        'primary-g': '#E7FFAC',
        dark: '#333532',
        'secondary-g': '#EFFFC6',
        'secondary-gy': '#A9A9A9',
        'secondary-dy': '#BD9E4A',
        'informative-g': '#D0E8D6',
        'informative-p': '#FFA0A0',
        'informative-y': '#FFF9C5',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.3xl') },
        h2: { fontSize: theme('fontSize.2xl') },
        h3: { fontSize: theme('fontSize.lg') },
      });
    }),
  ],
};
