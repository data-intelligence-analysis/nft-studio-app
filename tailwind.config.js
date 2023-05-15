const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['SFMono-Regular', 'monospace'],
      arial : ['Arial', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      heebo: ['var(--global-gallery-text-font-family)', 'sans-serif']
    },
    keyframes: {
      up: {
        "0%": { transform: "translateY(0rem)" },
        "100%": { transform: "translateY(-.1rem)" },
      },
      down: {
        "0%": { transform: "translateY(0rem)" },
        "100%": { transform: "translateY(.2rem)" },
      },
      studio: {
        "0%": { transform: "translateX(0rem)" },
        "100%": { transform: "translateX(20rem)" },
      },
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
      beat: {
        '0% 100%': { transform: 'scale(1)' },
        '25%': { transform: 'scale(1.2)' }
      },
      zoomin: {
        '0%': { transform: 'scale(1,1)' },
        '25%': { transform: 'scale(1.1,1)' },
        '50%': { transform: 'scale(1.2,1)' },
        '75%': { transform: 'scale(1.3,1)' },
        '100%': { transform: 'scale(1.4,1)' }
      },
      ping: {
        '75% 100%': { transform: 'scale(2)', opacity: '0' }
      }
    },
    animation: {
      up: "up .1s ease-in-out",
      down: "down .3s ease-in-out",
      studio: 'studio 50s linear infinite reverse running',
      wiggle: 'wiggle 1s ease-in-out infinite',
      beat: 'beat 1s ease-in-out infinite',
      zoomin: 'zoomin 15s ease-in-out infinite forwards',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
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
