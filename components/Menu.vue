<template>
  <div
    v-if="toRender"
    class="absolute top-0 left-0 w-full h-full isolate grid justify-center items-center z-10"
    :class="{ 'pointer-events-auto': menuActive }"
    @click="closeMenu"
    @touchmove="closeMenu"
  >
    <Transition name="scale-transition" mode="out-in" v-on="transitionEvents">
      <div
        v-if="menuActive"
        class="bg-white dark:bg-gray-900 fixed min-h-[128px] min-w-[128px] isolate shadow-2xl before:border-black dark:before:border-white before:border-opacity-10 dark:before:border-opacity-5 focus:outline-none grid items-center fill-before before:border before:w-[calc(100%+1px)] before:h-[calc(100%+1px)] before:top-[-0.5px] before:left-[-0.5px]"
        :class="contentClass"
        :style="styles"
        v-on="contentEvents"
      >
        <Component :is="toRender" />
      </div>
    </Transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ControlledFocus } from '~/utils/controlledFocus'
import { eventKey, hackTabKey } from '~/utils/main'

export default {
  name: 'Menu',

  data: () => ({
    previousActive: null
  }),

  computed: {
    ...mapState(['menu', 'breakpoints']),

    contentClass() {
      return this.menu.contentClass || 'rounded-md'
    },

    menuActive() {
      return this.menu.active
    },
    styles() {
      const { style = {} } = this.menu

      return {
        height: `${parseFloat(style.height)}px`,
        width: `${parseFloat(style.width)}px`,
        top: `${parseFloat(style.top)}px`,
        left: `${parseFloat(style.left)}px`,
        transformOrigin: style.origin
      }
    },

    transitionEvents() {
      return {
        beforeEnter: this.onBeforeEnter,
        afterEnter: this.onAfterEnter,
        leave: this.onLeave,
        afterLeave: this.onAfterLeave
      }
    },

    contentEvents() {
      return {
        click: this.onClick,
        keydown: this.onKeydown,
        touchmove: (e) => e.stopPropagation()
      }
    },

    toRender() {
      return this.menu.component
    }
  },

  watch: {
    'breakpoints.is'() {
      this.closeMenu()
    },
    '$route.path'() {
      this.closeMenu()
    }
  },

  methods: {
    toggle(value) {
      this.$commit('UPDATE', { path: 'active', innerPath: 'menu', value })
    },

    closeMenu() {
      this.toggle(false)
    },

    onBeforeEnter() {
     this.previousActive = document.activeElement
    },

    onAfterEnter(e) {
      e.focus()
      document.documentElement.style.setProperty(
        '--scroll-bar-width',
        `${window.innerWidth - document.documentElement.clientWidth}px`
      )

      document.documentElement.classList.add('menu-active')
    },

    onLeave() {
      this.previousActive && this.previousActive.focus()
    },

    onAfterLeave() {
      if (!this.menuActive) {
        this.$commit('UPDATE', { path: 'menu', value: {} })
        document.documentElement.style.removeProperty('--scroll-bar-width')
        document.documentElement.classList.remove('menu-active')
      }
    },

    onClick(e) {
      e.stopPropagation()
    },

    onKeydown(e) {
      if (!this.menuActive) {
        return
      }

      const key = eventKey(e)

      if (key == 'esc') {
        return this.closeMenu()
      }

      hackTabKey(
        e,
        () => {
          const controlledFocus = new ControlledFocus({
            root: e.currentTarget,
            children: '.menuitem',
            loop: true,
            uid: this._uid
          })

          if (e.shiftKey) {
            controlledFocus.backward()
          } else controlledFocus.forward()
        },
        key
      )
    }
  }
}
</script>

<style></style>
