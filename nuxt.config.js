const description = 'Shop PRD'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Paradice Parade',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Discover your favourite recipes!',
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'twitter-app-country',
        property: 'twitter:app:country',
        content: 'NG',
      },
      {
        hid: 'twitter-site',
        property: 'twitter:site',
        content: '@c4benn',
      },
      {
        hid: 'twitter-image',
        property: 'twitter:image',
        content: '~static/icon.png',
      },
      {
        hid: 'twitter-card',
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter-title',
        property: 'twitter:title',
        content: description,
      },
      {
        hid: 'twitter-desc',
        property: 'twitter:description',
        content: description,
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/icon.png',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{ path: '~/components', extensions: ['vue'] }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcssz
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'portal-vue/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: '/api/v1',
    prefix: '',
    retry: true,
    credentials: true,
    debug: true,
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
    baseURL: process.env.BASE_URL,
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
    apiSecret: process.env.API_SECRET,
  },

  cloudinary: {
    useComponent: true,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  }, // other configs
}
