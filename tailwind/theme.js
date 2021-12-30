const colors = require('tailwindcss/colors')

module.exports = {
  screens: {
    xxs: '0',
    xs: '249px',
    sm: '599px',
    md: '959px',
    lg: '1279px',
    xl: '1919px'
  },
  colors: {
    primary: colors.red,
    gray: colors.warmGray,
    blue: colors.blue,
    'true-gray': colors.trueGray,
    white: colors.white,
    black: colors.black,
    green: colors.green,
    amber: colors.amber,
    yellow: colors.yellow
  },
  extend: {
    gridTemplateRows: {
      '[auto,auto,1fr]': 'auto auto 1fr'
    },
    spacing: {
      128: '32rem',
      144: '36rem'
    },
    borderRadius: {
      xs: '1.5px',
      sm: '3px',
      md: '6px',
      lg: '12px'
    }
  }
}
