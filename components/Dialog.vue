<template>
  <div
    v-if="toRender"
    class="absolute top-0 left-0 w-full h-full isolate grid justify-center items-center z-10"
    :class="{ 'pointer-events-auto': dialogActive }"
  >
    <Transition name="fade-transition" mode="out-in">
      <div
        v-if="dialogActive"
        class="bg-gray-900 dark:bg-black dark:bg-opacity-60 bg-opacity-60 absolute w-full h-full top-0 left-0"
        :class="{ 'pointer-events-auto': dialogActive }"
        @click="closeDialog"
      />
    </Transition>

    <Transition :name="transitionName" mode="out-in" v-on="transitionEvents">
      <div
        v-if="dialogActive"
        :tabindex="dialogActive ? '1' : '-1'"
        class="bg-white dark:bg-gray-900 absolute min-h-[128px] min-w-[128px] z-10 isolate shadow-xl focus:outline-none"
        :class="[
          { 'pointer-events-auto': dialogActive },
          dialog.contentClass || ''
        ]"
        style="--fade: 1"
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
  name: 'Dialog',

  data: () => ({
    previousActive: null
  }),

  computed: {
    ...mapState(['dialog', 'breakpoints']),
    dialogActive() {
      return this.dialog.active
    },

    transitionName() {
      if (
        /xxs|xs/.test(this.breakpoints.is) &&
        /ProductListFilter|Cart/.test(this.toRender)
      ) {
        return 'slide-y'
      }
      return this.dialog.transition || 'scale-transition'
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
        keydown: this.onKeydown
      }
    },

    toRender() {
      return this.dialog.component
    }
  },

  watch: {
    '$route.path'() {
      this.closeDialog()
    }
  },

  methods: {
    toggle(value) {
      this.$commit('UPDATE', { path: 'active', innerPath: 'dialog', value })
    },

    closeDialog() {
      this.toggle(false)
    },

    onBeforeEnter() {
      this.previousActive = document.activeElement
    },

    onAfterEnter(e) {
      e.focus({ preventScroll: true })

      document.documentElement.style.setProperty(
        '--scroll-bar-width',
        `${window.innerWidth - document.documentElement.clientWidth}`
      )
      document.documentElement.classList.add('dialog-active')
    },

    onLeave() {
      this.previousActive && this.previousActive.focus()
    },

    onAfterLeave() {
      if (!this.dialogActive) {
        this.$commit('UPDATE', { path: 'dialog', value: {} })
        document.documentElement.style.removeProperty('--scroll-bar-width')
        document.documentElement.classList.remove('dialog-active')
      }
    },

    onClick(e) {
      e.stopPropagation()
    },

    onKeydown(e) {
      if (!this.dialogActive) {
        return
      }

      const key = eventKey(e)

      if (key == 'esc') {
        return this.closeDialog()
      }

      hackTabKey(
        e,
        () => {
          const controlledFocus = new ControlledFocus({
            root: e.currentTarget,
            children: '*',
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
