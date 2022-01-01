const { canHover } = require('./tailwind/plugins')
const theme = require('./tailwind/theme')

module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: 'class',
  theme,
  variants: {
    extend: {
      textOpacity: ['dark'],
      backgroundOpacity: ['dark'],
      borderOpacity: ['dark'],
      ringOpacity: ['dark']
    }
  },
  plugins: [require('@tailwindcss/aspect-ratio'), canHover],
  important: true
}
