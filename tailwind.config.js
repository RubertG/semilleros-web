/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "text-50": "#000000",
        "bg-50": "#ffffff",
        "text-300": "#5c5c5c",
        "bg-100": "#f8f8f8",
        "border-50": "#f6f6f6",
        "text-100": "#242424",
        "btn-success": "#eeeeee",
        "bg-nav": "#d9d9d9",
        "primary-100": "#0077c2",
        "primary-200": "#59a5f5",
        "primary-300": "#c8ffff",
        "accent-100": "#00bfff",
        "accent-200": "#00619a",
        "text-200": "#5c5c5c",
        "bg-200": "#f5f5f5",
        "bg-300": "#cccccc",
        "decoracion": "#0077c2",
        "bg-blur": "#dfdfdf"
      }
    }
  },
  plugins: [],
}

