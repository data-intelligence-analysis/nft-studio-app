const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    //'./pages/**/*.{js,ts,jsx,tsx}',
    //'./components/**/*.{js,ts,jsx,tsx}',

    ],
    theme: {
      /*screens: {
        'sm': {'min': '640px', 'max': '767px'},
        // => @media (min-width: 640px and max-width: 767px) { ... }

        'md': {'min': '768px', 'max': '1023px'},
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        'lg': {'min': '1024px', 'max': '1279px'},
        // => @media (min-width: 1024px and max-width: 1279px) { ... }

        'xl': {'min': '1280px', 'max': '1535px'},
        // => @media (min-width: 1280px and max-width: 1535px) { ... }

        '2xl': {'min': '1536px'},
        // => @media (min-width: 1536px) { ... }
      },*/
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
        13: "repeat(13, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
      },
      extend: {
      },
    },
    
    plugins: [
      
    ],
}