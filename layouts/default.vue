<template>
  <main
    class="min-h-screen bg-primary-50 bg-opacity-80 dark:bg-black dark:bg-opacity-[.925] dark:text-white"
    @touchstart="() => {}"
  >
    <Banner />
    <Header />
    <Nuxt :class="{ invisible: !appMounted }" />
    <Footer />

    <Overlays :class="{ hidden: !appMounted }" />

    <div v-if="!appMounted" title="loading" class="initial-loading">
      <div class="ldio-dy3y8kuse0b fade-appear">
        <div v-for="i in 10" :key="i"></div>
      </div>

      <div>LOADING...</div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

import { C4UiLib } from '../utils/framework'
import breakpoints from '../utils/breakpoints'
import registerIcons from '../utils/registerIcons'

import {
  mediaListener,
  nextAnimFrame,
  nextFrame,
  setTouchDevice,
  sleep
} from '~/utils/main'

export default {
  name: 'DefaultLayout',

  beforeRouteLeave(to, from, next) {
    if (!this.appLoading) {
      return next()
    }
  },

  data: () => ({
    ...breakpoints.data,
    selfMounted: false
  }),

  head() {
    const link = [
      {
        hid: 'google-font-preconnect',
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        hid: 'gstatic-preconnect',
        rel: 'preconnect',
        crossorigin: 'true',
        href: 'https://fonts.gstatic.com'
      },
      {
        hid: 'noto-sans-display',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Display:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,600&display=swap',
        rel: 'stylesheet'
      },
      {
        hid: 'barlow-semi-condensed',
        href: 'https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
        rel: 'stylesheet'
      },

      {
        hid: 'important-css-preload',
        rel: 'preload',
        as: 'style',
        href: 'css/important.css'
      },
      {
        hid: 'important-css',
        rel: 'stylesheet',
        href: 'css/important.css'
      }
    ]

    if (this.selfMounted) {
      link.push(
        {
          hid: 'main-css-preload',
          rel: 'preload',
          as: 'style',
          href: 'css/main.css'
        },
        {
          hid: 'main-css',
          rel: 'stylesheet',
          href: 'css/main.css'
        }
      )
    }

    return {
      link,
      htmlAttrs: {
        id: 'prd',
        lang: 'el',
        'data-lock': !this.appMounted ? '' : undefined
      }
    }
  },

  computed: {
    ...breakpoints.computed,
    ...mapState(['appMounted', 'appLoading'])
  },

  watch: {
    '$theme.light'() {
      const light = this.$theme.light

      const currentTheme = light ? 'dark' : 'light'
      const replaceWith = light ? 'light' : 'dark'

      document.documentElement.classList.replace(currentTheme, replaceWith)
    }
  },

  beforeCreate() {
    registerIcons(Vue)
    Vue.prototype.$commit = this.$store.commit
    Vue.prototype.$c4 = Vue.observable(new C4UiLib())
    Vue.prototype.$theme = Vue.prototype.$c4.theme
  },

  created() {
    this.setGreetings()
  },

  beforeMount() {
    this.beforeMount()
    this.selfMounted = true
  },

  mounted() {
    this.mounted()
  },

  methods: {
    ...breakpoints.methods,

    beforeMount() {
      const setPrototype = () => {
        Vue.prototype.$nextFrame = nextFrame.bind(this)

        Vue.prototype.$nextAnimFrame = nextAnimFrame.bind(this)

        Vue.prototype.$sleep = sleep
      }

      setPrototype()

      breakpoints.mounted.call(this)

      setTouchDevice.call(this)

      const setTheme = (val) => {
        this.$theme.is = val
        ;(
          document.documentElement || document.getElementsByTagName('html')[0]
        ).classList.add(this.$theme.light ? 'light' : 'dark')
      }

      const currentTheme = window.matchMedia('(prefers-color-scheme: light)')

      if (currentTheme?.matches) {
        setTheme('light')
      } else setTheme('dark')

      mediaListener({
        media: currentTheme,
        callback: (e) => {
          if (e.matches) {
            setTheme('light')
          } else setTheme('dark')
        }
      })

      window.history.scrollRestoration = 'auto'

      const currency = localStorage.getItem('currency')

      currency &&
        this.$commit('UPDATE', {
          path: 'currency',
          value: JSON.parse(currency)
        })
    },

    async mounted() {
      breakpoints.mounted.call(this)

      await this.$sleep(70)

      this.$commit('UPDATE', {
        path: 'appMounted',
        value: true
      })
    },

    setGreetings() {
      const greeting = () => {
        const hr = new Date().getHours()

        if (hr >= 0 && hr < 12) {
          return 'morning'
        }
        if (hr >= 12 && hr < 17) {
          return 'afternoon'
        }
        return 'evening'
      }

      this.$commit('UPDATE', {
        name: 'greeting',
        value: greeting()
      })
    }
  }
}
</script>

<style></style>
