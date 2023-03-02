/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['SFMono-Regular', 'monospace']
    },
    extend: {
      gridTemplateColumns: {
        2: "repeat(2, minmax(0, 1fr))",
        13: "repeat(13, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
      },
    },
  },
  plugins: [
    
  ],
}
