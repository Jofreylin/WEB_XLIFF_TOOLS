/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Space Mono"', 'monospace'],
        heading: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}
