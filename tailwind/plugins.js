const plugin = require('tailwindcss/plugin')

const canHover = plugin(function ({ addVariant, e }) {
  const variant = 'can-hover'
  addVariant(variant, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      const newClass = e(`${variant}${separator}${className}`)
      return `@media (hover: hover) and (pointer: fine) { .${newClass}:hover }`
    })
  })
})

module.exports = {
  canHover
}
