/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        VT220: ['Glass TTY VT220'],
        VT220Pass: ['Glass TTY VT220 Password Hack'],
        orden: ['Orden Web Regular'],
      },
    },
  },
  plugins: [],
};
