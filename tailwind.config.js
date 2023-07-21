const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", defaultTheme.fontFamily.sans],
        typewriter: "Kiwi Maru",
      },
      backgroundImage: (theme) => ({
        backgroundImage: "url('../assets/backgroundImage.png')",
      }),
      colors: {
        white: { 100: "#F1F1F1" },
        gray: {
          100: "#818181",
          200: "#282828",
        },
        navbar: "#a5c9d2",
        teal: {
          100: "#ace9fc",
          200: "#78B1CA",
        },
      },
    },
  },
  plugins: [],
};
