/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // bootstrap colors
        primary: "#3B71CA",
        secondary: "#9FA6B2",
        success: "#14A44D",
        danger: "#DC4C64",
        warning: "#E4A11B",
        info: "#54B4D3",
        light: "#FBFBFB",
        dark: "#332D2D",

        // brand color
        "ocean-blue": "#2695FF",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out forwards",
        "fade-out": "fadeOuts 0.3s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        fadeOut: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
