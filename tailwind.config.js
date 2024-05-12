/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        ss: "320px",
        sx: "380px",
      },
      boxShadow: {
        // Small shadow
        "around-sm":
          "0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.1)",
        // Default shadow
        around:
          "0 2px 4px 0 rgba(0, 0, 0, 0.05), 0 2px 6px 2px rgba(0, 0, 0, 0.1)",
        // Medium shadow
        "around-md":
          "0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 4px 10px 3px rgba(0, 0, 0, 0.1)",
        // Large shadow
        "around-lg":
          "0 6px 12px 0 rgba(0, 0, 0, 0.05), 0 6px 14px 4px rgba(0, 0, 0, 0.1)",
        // Extra-large shadow
        "around-xl":
          "0 8px 16px 0 rgba(0, 0, 0, 0.05), 0 8px 18px 5px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        text: "#000000",
        background: "#ffffff",
        primary: "#D6A3E4",
        "primary-100": "#f6ebf9",
        "primary-200": "#e5c4ee",
        "primary-300": "#d39ce2",
        "primary-400": "#c175d6",
        "primary-500": "#b04ecb",
        "primary-600": "#9634b1",
        "primary-700": "#75298a",
        "primary-800": "#541d63",
        "primary-900": "#32113b",
        "primary-1000": "#180618",
        secondary: "#ebf1ff",
        accent: "#ff4093",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
