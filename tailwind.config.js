module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".7",
          },
        },
      },
      animation: {
        pulse: "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
      },
    },
  },
  plugins: [],
};
