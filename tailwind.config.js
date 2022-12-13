/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: "class",
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    //'./pages/**/*.{js,ts,jsx,tsx}',
    //'./components/**/*.{js,ts,jsx,tsx}',

    ],
    theme: {
      extend: {
        /*colors: {
          'blue': '#1fb6ff',
          'pink': '#ff49db',
          'orange': '#ff7849',
          'green': '#13ce66',
          'gray-dark': '#273444',
          'gray': '#8492a6',
          'gray-light': '#d3dce6',
          'metateds-purple': '#4e44ce',
          'metateds-orange': '#EAA640'
        },*/
        gridTemplateColumns: {
          2: "repeat(2, minmax(0, 1fr))",
          13: "repeat(13, minmax(0, 1fr))",
          16: "repeat(16, minmax(0, 1fr))",
        },
      },
    },
    plugins: [
      //require("@tailwindcss/forms"),
      //require("@tailwindcss/line-clamp"),
      //require("@tailwindcss/typography"),
    ],
}