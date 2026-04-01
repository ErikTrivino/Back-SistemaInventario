/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "blue-gray": {
          50: "#eceff1",
          100: "#cfd8dc",
          200: "#b0bec5",
          300: "#90a4ae",
          400: "#78909c",
          500: "#607d8b",
          600: "#546e7a",
          700: "#455a64",
          800: "#37474f",
          900: "#263238",
        },
      },
      backgroundImage: {
        "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "blue-500/20": "0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(59, 130, 246, 0.06)",
        "blue-500/40": "0 10px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.05)",
        "pink-500/40": "0 10px 15px -3px rgba(232, 62, 140, 0.4), 0 4px 6px -2px rgba(232, 62, 140, 0.05)",
        "green-500/40": "0 10px 15px -3px rgba(40, 167, 69, 0.4), 0 4px 6px -2px rgba(40, 167, 69, 0.05)",
        "orange-500/40": "0 10px 15px -3px rgba(253, 126, 20, 0.4), 0 4px 6px -2px rgba(253, 126, 20, 0.05)",
      },
    },
  },
  plugins: [],
};
