/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}" , "./src/tailadmin/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B30000",
        "primary-glow": "#E60000",
        "text-color": "#262626",
        "text-color-light": "#FFFFFF",
        secondary: "#E6E6E6",
        "secondary-glow": "#F9FAFB",
        "error-primary": "#FFE9E9",
        "error-text": "#991B1B",
        "error-text-secondary": "#ED4E4E",
        "error-desc": "#9B1C1C",
        "text-secondary": "#6C6C6C",
      },
    },
  },
  plugins: [],
};
