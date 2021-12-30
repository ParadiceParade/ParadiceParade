export default function state() {
  return {
    pageVisible: false,

    user: null,

    greeting: '',

    appMounted: false,

    drawer: false,

    dialog: {},

    menu: {},

    currency: {
      code: 'usd',
      sign: '$'
    },

    breakpoints: {},

    productsList: {
      gridView: true,
      sortBy: {},
      filters: {}
    }
  }
}
