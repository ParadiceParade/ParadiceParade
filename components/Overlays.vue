<template>
  <div
    class="fixed z-50 pointer-events-none h-full w-full left-0 top-0 isolate overflow-hidden"
  >
    <Dialog />
    <Menu />

    <div
      v-if="appLoading"
      title="loading, please wait"
      tabindex="1"
      class="fixed w-full h-full flex items-center justify-center bg-black bg-opacity-70 dark:bg-opacity-70 fade-appear z-50 outline-none pointer-events-auto"
      v-on="events"
    >
      <Loader />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { eventKey } from '~/utils/main'
export default {
  name: 'Overlays',

  computed: {
    ...mapState(['appLoading']),

    canRender() {
      return !!(this.menu.component || this.dialog.component || this.appLoading)
    },

    events() {
      const preventDefault = (e) => {
        e.preventDefault()
      }
      return {
        ttouchstart: preventDefault,
        wheel: preventDefault,
        keydown: (e) => {
          const key = eventKey(e)

          if (/arrow/.test(key)) {
            preventDefault(e)
          }
        },
        animationend: (e) => e.currentTarget.focus()
      }
    }
  }
}
</script>
