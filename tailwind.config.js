module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        ink: {
          900: "#08080c",
          800: "#0a0a0f",
          700: "#0d0d14",
          600: "#12121c",
        },
        brand: {
          violet: "#7c3aed",
          teal: "#22d3ee",
          pink: "#ec4899",
        },
      },
    },
  },
  plugins: [],
}
