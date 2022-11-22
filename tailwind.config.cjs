const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Urbanist", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        2.5: "0.625rem",
      },
    },
  },
  plugins: [],
};
