module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "100" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
