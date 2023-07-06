/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{html,js,jsx,ts,tsx,css}",
    "./src/**/*.{html,js,jsx,ts,tsx,css}",
    "./src/**/**/*.{html,js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

